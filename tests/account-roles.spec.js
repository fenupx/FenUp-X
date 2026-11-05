import { test, expect } from '@playwright/test';

// In-memory Firebase boundary: these tests never write to production accounts.
export async function mockFirebase(page, backendReady = true) {
    page.on('dialog', d => d.accept());
    await page.addInitScript(() => { localStorage.setItem('fenupx_cookie_consent', 'accepted'); window.__records = JSON.parse(sessionStorage.getItem('__records') || '{}'); window.__writes = []; });
    await page.route('**/competition-config.js*', route => route.fulfill({contentType:'text/javascript',body:`export const COMPETITION_API_URL="https://score.example.invalid"; export const ANNUAL_PROMOTION_ENABLED=false; export const COMPETITION_BACKEND_READY=${backendReady}; export const competitionYear=()=>2026; export const competitionPeriods=()=>({weekId:"2026-W45",monthId:"2026-11"});`}));
    await page.route('https://score.example.invalid/rpc/**', async route => {
        const name=route.request().url().split('/').pop();
        const data=route.request().postDataJSON();
        const result=await page.evaluate(({name,data})=>{
            window.__calls=[...(window.__calls||[]),{name,data}];
            if(window.__fail)return {error:'test-failure'};
            if(name==='correctStudentClass'){
                if(window.__records[sessionStorage.getItem('__uid')]?.role!=='admin')return {error:'admin-required'};
                window.__records[data.uid].sinif=data.grade;
                window.__records[data.uid].gradeCorrectionRequest={requestedGrade:data.grade,status:'approved'};
            }
            return {result:{accepted:true,oldScoresTransferred:false,users:Object.values(window.__records).map(u=>({...u,displayScore:u['seasonScore_'+data.grade]||0}))}};
        },{name,data});
        await route.fulfill({status:result.error?400:200,contentType:'application/json',body:JSON.stringify(result),headers:{'Access-Control-Allow-Origin':'*'}});
    });
    await page.route('https://www.gstatic.com/firebasejs/**', async route => {
        const url = route.request().url();
        let body = '';
        if (url.includes('firebase-app')) body = 'export const initializeApp = () => ({});';
        if (url.includes('firebase-auth')) body = `
            const makeUser = uid => uid ? {uid,getIdToken:async()=> 'synthetic-token',emailVerified:true,providerData:[],displayName:'Test Specimen',email:'specimen@example.invalid'} : null;
            const auth = { currentUser: makeUser(sessionStorage.getItem('__uid')) }; export const getAuth = () => auth;
            export const onAuthStateChanged = (_, cb) => { window.__login = async (uid) => { auth.currentUser = makeUser(uid); uid ? sessionStorage.setItem('__uid',uid) : sessionStorage.removeItem('__uid'); sessionStorage.setItem('__records',JSON.stringify(window.__records)); await cb(auth.currentUser); }; setTimeout(() => cb(auth.currentUser), 0); };
            export const signOut = () => window.__login(null);
            export const createUserWithEmailAndPassword = async () => { await window.__login('created'); return {user:auth.currentUser}; };
            export const signInWithPopup = async () => { await window.__login('google-created'); return {user:auth.currentUser}; };
            export class GoogleAuthProvider {};
            export const EmailAuthProvider = {};
            ${['signInWithEmailAndPassword','deleteUser','reauthenticateWithCredential','reauthenticateWithPopup','sendEmailVerification','sendPasswordResetEmail'].map(n => `export const ${n} = async () => ({});`).join('\n')}`;
        if (url.includes('firebase-functions')) body = `
            export const getFunctions = () => ({});
            export const httpsCallable = (_, name) => async data => {
                window.__calls = [...(window.__calls || []), {name,data}];
                if (window.__fail) throw Error('test failure');
                if (name === 'correctStudentClass') {
                    if (window.__records[sessionStorage.getItem('__uid')]?.role !== 'admin') throw Error('admin-required');
                    window.__records[data.uid].sinif=data.grade;
                    window.__records[data.uid].gradeCorrectionRequest={requestedGrade:data.grade,status:'approved'};
                }
                return {data:{accepted:true,oldScoresTransferred:false}};
            };`;
        if (url.includes('firebase-firestore')) body = `
            export const getFirestore = () => ({});
            export const doc = (_, collection, uid) => ({ collection, uid });
            export const getDoc = async ref => { const data = window.__records[ref.uid]; if (window.__delay) await new Promise(r => setTimeout(r, window.__delay)); return { exists: () => !!data, data: () => data }; };
            export const updateDoc = async (ref, data) => { if (window.__fail) throw Error('test failure'); await new Promise(r => setTimeout(r, 50)); window.__writes.push({uid: ref.uid, data}); Object.assign(window.__records[ref.uid], data); sessionStorage.setItem('__records',JSON.stringify(window.__records)); };
            export const setDoc = async (ref,data) => {window.__records[ref.uid]=data;sessionStorage.setItem('__records',JSON.stringify(window.__records));};
            export const collection = (_, name) => name;
            export const getDocs = async () => ({ forEach: fn => Object.entries(window.__records).forEach(([id, data]) => fn({ id, data: () => data })) });
            ${['deleteDoc','query','orderBy','limit','addDoc'].map(n => `export const ${n} = () => ({});`).join('\n')}`;
        await route.fulfill({ contentType: 'text/javascript', body, headers: {'Access-Control-Allow-Origin':'*'} });
    });
    await page.goto('/');
    await page.waitForFunction(() => window.__login && window.checkAnnualPromotion);
}

test('role transitions, delayed profiles, class onboarding retries and persistence', async ({ page }) => {
    await mockFirebase(page);
    await page.evaluate(async () => {
        window.__records = { a: {role:'admin', name:'Test',surname:'Admin'}, s:{role:'student', name:'Test',surname:'Student',sinif:''}, t:{role:'teacher',name:'Test',surname:'Teacher'} };
        await window.__login('a');
    });
    await expect(page.locator('#header-streak-badge')).toBeHidden();
    await expect(page.locator('#admin-display-email')).toHaveText('specimen@example.invalid');
    await expect(page.locator('#admin-display-fullname')).toHaveText('Test Admin');
    await expect(page.locator('#btn-admin-panel')).not.toHaveClass(/is-hidden/);
    await page.evaluate(() => window.__login('t'));
    await expect(page.locator('#profile-display-role-tag')).toHaveText('Öğretmen');
    await expect(page.locator('#profile-grade')).toBeHidden();
    await expect(page.locator('#modal-onboarding-grade')).toBeHidden();
    await expect(page.locator('#btn-admin-panel')).toHaveClass(/is-hidden/);
    await page.evaluate(() => window.__login('s'));
    await expect(page.locator('#modal-onboarding-grade')).toBeVisible();
    await page.evaluate(() => window.__fail = true);
    await page.locator('[data-grade="8"].btn-onboarding-grade').click();
    await expect(page.locator('#modal-onboarding-grade [role=status]')).toContainText('kaydedilemedi');
    expect(await page.evaluate(() => window.__records.s.sinif)).toBe('');
    await page.evaluate(() => window.__fail = false);
    await page.locator('[data-grade="8"].btn-onboarding-grade').click();
    await expect(page.locator('#modal-onboarding-grade')).toBeHidden();
    expect(await page.evaluate(() => window.__writes)).toEqual([{uid:'s',data:{sinif:'8'}}]);
    await page.evaluate(async () => { await window.__login(null); await window.__login('s'); });
    await expect(page.locator('#modal-onboarding-grade')).toBeHidden();
    await page.evaluate(async () => { window.__records.s.sinif=''; window.__delay=100; const old=window.__login('a'); const next=window.__login('s'); await Promise.all([old,next]); });
    await expect(page.locator('#btn-admin-panel')).toHaveClass(/is-hidden/);
    await expect(page.locator('#modal-onboarding-grade')).toBeVisible();
});

test('admin filter and grade write use student schema, preserve fields and reject guest writes', async ({page}) => {
    await mockFirebase(page);
    await page.evaluate(async () => {
        window.__records = { a:{role:'admin',name:'Test',surname:'Admin'}, s:{role:'student',name:'Test',surname:'Student',sinif:6,nickname:'Specimen',totalScore:120}, t:{role:'teacher',name:'Teacher'}, n:{role:'student',name:'No class'} };
        await window.__login('a'); await window.loadAdminUsers();
        const m=document.getElementById('admin-modal'); m.classList.remove('is-hidden'); m.classList.add('is-open','active'); m.style.display='flex';
    });
    await expect(page.locator('.admin-user-row')).toHaveCount(3);
    await expect(page.locator('.admin-grade-select')).toHaveCount(2);
    await page.locator('[data-user-grade-filter="6"]').click();
    await expect(page.locator('.admin-user-row')).toHaveCount(1);
    await page.locator('.admin-grade-select').selectOption('8');
    await expect(page.locator('.admin-user-row')).toHaveCount(0);
    expect(await page.evaluate(() => window.__records.s.totalScore)).toBe(120);
    expect(await page.evaluate(() => window.__calls)).toEqual([{name:'correctStudentClass',data:{uid:'s',grade:'8'}}]);
    await page.evaluate(async () => {await window.__login(null); await window.changeUserGrade('s','5');});
    expect(await page.evaluate(() => window.__calls.length)).toBe(1);
});

test('promotion remains inert for missing baseline, dates, repeated sessions and terminal grade', async ({page}) => {
    await mockFirebase(page);
    expect(await page.evaluate(() => ['5','6','7','8','',9].map(sinif => {const data={sinif,lastPromotionYear:2025}; const a=window.checkAnnualPromotion(data); const b=window.checkAnnualPromotion(data); return [a,b,data.sinif];}))).toEqual([['5','5','5'],['6','6','6'],['7','7','7'],['8','8','8'],['','',''],['','',9]]);
    expect(await page.evaluate(() => window.__writes)).toEqual([]);
});

test('class native styles and drawing access at phone, landscape, tablet and board sizes', async ({page}, info) => {
    await mockFirebase(page);
    for (const [width,height,phone] of [[320,650,true],[375,667,true],[390,844,true],[430,932,true],[844,390,true],[844,430,true],[768,1024,false],[820,1180,false],[1366,768,false],[1920,1080,false]]) {
        await page.setViewportSize({width,height});
        if (phone) await expect(page.locator('#floating-smartboard-btn')).toBeHidden();
        else await expect(page.locator('#floating-smartboard-btn')).toBeVisible();
    }
    const colors = await page.locator('#user-grade').evaluate(select => {
        const s=getComputedStyle(select), o=getComputedStyle(select.options[1]);
        return [s.color,s.backgroundColor,s.colorScheme,o.color,o.backgroundColor];
    });
    expect(colors).toEqual(['rgb(17, 24, 39)','rgb(255, 255, 255)','light','rgb(17, 24, 39)','rgb(255, 255, 255)']);
    await page.locator('#btn-uyelik').count();
    await page.evaluate(() => { const m=document.getElementById('auth-modal'); m.classList.remove('is-hidden'); m.classList.add('is-open'); });
    // Native option painting remains OS-owned; validate DOM semantics and keyboard selection.
    await page.locator('#user-grade').evaluate(select => {select.style.display='block'; select.closest('#register-fields')?.classList.remove('is-hidden'); select.closest('#register-fields')?.style.setProperty('display','flex');});
    for (const grade of ['5','6','7','8']) {
        await page.locator('#user-grade').selectOption(grade);
        await expect(page.locator('#user-grade')).toHaveValue(grade);
    }
    await page.locator('#user-grade').click();
    await page.screenshot({path:`tests/artifacts/release-893-native-select-${info.project.name}.png`,animations:'disabled'});
    await page.keyboard.press('Escape');
});

test('compact admin metrics and scroll remain inside portrait and short landscape panel',async({page})=>{
    await mockFirebase(page);
    await page.evaluate(async()=>{
        window.__records={a:{role:'admin',name:'Test',surname:'Admin'},t:{role:'teacher',name:'Test',surname:'Teacher'}};
        for(let i=0;i<10;i++)window.__records['s'+i]={role:'student',name:'Test',surname:'Student',nickname:'Specimen '+i,email:'specimen@example.invalid',sinif:'6'};
        await window.__login('a');await window.loadAdminUsers();
        const m=document.getElementById('admin-modal');m.classList.remove('is-hidden');m.classList.add('is-open','active');
    });
    for(const [width,height] of [[390,844],[844,390]]) {
        await page.setViewportSize({width,height});
        await page.evaluate(async()=>{ document.getElementById('admin-user-list').getBoundingClientRect(); await document.fonts.ready; await Promise.all(document.getAnimations().filter(a=>Number.isFinite(a.effect?.getComputedTiming().endTime)).map(a=>a.finished.catch(()=>{}))); });
        const metrics=await page.locator('#admin-users-stats').boundingBox();expect(metrics.height).toBeLessThanOrEqual(80);
        const list=await page.locator('#admin-user-list').boundingBox();expect(list.height).toBeGreaterThan(20);expect(list.y+list.height).toBeLessThanOrEqual(height);
        if(width===390) { const row=await page.locator('.admin-user-row').first().boundingBox(); expect(list.height/row.height).toBeGreaterThanOrEqual(4); }
        await page.locator('#admin-user-list').evaluate(el=>el.scrollTop=el.scrollHeight);
        await page.locator('.admin-grade-select').last().click({trial:true});
        await page.screenshot({path:`tests/artifacts/release-893-admin-${width}.png`,animations:'disabled'});
    }
});


async function openSignup(page) {
    const login = page.locator('#btn-uyelik');
    if (!(await login.isVisible())) await page.locator('#btn-mobile-menu').click();
    await login.click();
    await page.getByRole('link',{name:'Hemen Üye Ol',exact:true}).click();
}
for (const grade of ['5','6','7','8']) test(`email signup persists explicitly selected grade ${grade} through profile reload`,async({page})=>{
    await mockFirebase(page);await openSignup(page);
    await page.locator('#student-first-name').fill('Deneme');await page.locator('#student-last-name').fill('Kullanıcı');
    await page.locator('#student-reg-nickname').fill('TestKaptan');
    await page.locator('#user-grade').selectOption(grade);
    await page.locator('#student-email').fill('specimen@example.invalid');
    await page.locator('#student-pass').fill('TestOnly123!');await page.locator('#student-pass-confirm').fill('TestOnly123!');
    await Promise.all([page.waitForEvent('load'),page.locator('#btn-student-submit').click()]);
    await page.waitForFunction(()=>window.__login && document.getElementById('profile-grade')?.value===window.__records.created?.sinif);
    expect(await page.evaluate(()=>window.__records.created.sinif)).toBe(grade);
    await expect(page.locator('#profile-grade')).toHaveValue(grade);
    await expect(page.locator('#modal-onboarding-grade')).toBeHidden();
});

test('first Google login requests an explicit grade and persists onboarding across reload',async({page})=>{
    await mockFirebase(page);
    const login=page.locator('#btn-uyelik');if(!(await login.isVisible()))await page.locator('#btn-mobile-menu').click();await login.click();
    await Promise.all([page.waitForEvent('load'),page.locator('#btn-google-login').click()]);
    await expect(page.locator('#modal-onboarding-grade')).toBeVisible();
    await page.locator('.btn-onboarding-grade[data-grade="8"]').click();
    await expect(page.locator('#modal-onboarding-grade')).toBeHidden();
    await page.reload();await page.waitForFunction(()=>window.__login && window.__records['google-created']?.sinif==='8');
    await expect(page.locator('#modal-onboarding-grade')).toBeHidden();
    await expect(page.locator('#profile-grade')).toHaveValue('8');
});

test('profile keeps class locked, ignores DOM tampering and sends correction request',async({page})=>{
    await mockFirebase(page);
    await page.evaluate(async()=>{window.__records.s={role:'student',name:'Deneme',surname:'Kullanıcı',nickname:'TestKaptan',sinif:'5',totalScore:120};await window.__login('s');});
    await page.evaluate(()=>{const m=document.getElementById('profile-modal');m.classList.remove('is-hidden');m.classList.add('is-open','active');m.style.display='flex';m.querySelectorAll('details').forEach(d=>d.open=true);});
    await expect(page.locator('#profile-grade')).toBeDisabled();
    await page.locator('#grade-correction-choice').selectOption('8');
    await page.locator('#btn-grade-correction').click();
    await expect(page.locator('#grade-correction-status')).toContainText('Kayıtlı sınıfın değişmedi');
    expect(await page.evaluate(()=>window.__records.s.sinif)).toBe('5');
    await page.evaluate(()=>{document.getElementById('profile-grade').disabled=false;document.getElementById('profile-grade').value='8';});
    await Promise.all([page.waitForEvent('load'),page.locator('#btn-save-profile').click()]);
    await page.waitForFunction(()=>window.__login && document.getElementById('profile-grade')?.value==='5');
    expect(await page.evaluate(()=>window.__records.s.totalScore)).toBe(120);
});

test('question count loads on initial admin opening, survives tabs/reopen/reload, separates filters',async({page})=>{
    let injected=false;
    await page.route('**/pilot_7_senaryo2.json',async route=>{
        const response=await route.fetch();const data=await response.json();
        data.questions.push({...data.questions[0],id:'counter-regression-extra'});injected=true;
        await route.fulfill({response,json:data});
    });
    await mockFirebase(page);
    await page.evaluate(async()=>{window.__records.a={role:'admin',name:'Test',surname:'Admin'};await window.__login('a');document.getElementById('btn-admin-panel').click();});
    const tab=page.locator('#btn-admin-tab-questions');
    await expect(tab).toContainText('79 Soru');expect(injected).toBe(true);
    await tab.click();await expect(page.locator('#admin-question-filter-count')).toHaveText('Filtre sonucu: 79 soru');
    await page.locator('#admin-grade-filters [data-grade="5"]').click();
    await expect(page.locator('#admin-question-filter-count')).toHaveText('Filtre sonucu: 0 soru');
    await expect(tab).toContainText('79 Soru');
    await page.locator('#btn-close-admin').click();
    await page.evaluate(()=>document.getElementById('btn-admin-panel').click());await expect(tab).toContainText('79 Soru');
    await page.reload();await page.waitForFunction(()=>window.__login && !document.getElementById('btn-admin-panel').classList.contains('is-hidden'));
    await page.evaluate(()=>document.getElementById('btn-admin-panel').click());await expect(tab).toContainText('79 Soru');
});

test('staged deployment approves correction through narrow Firestore update without transferring points',async({page})=>{
    await mockFirebase(page,false);
    await page.evaluate(async()=>{
        window.__records={a:{role:'admin'},s:{role:'student',sinif:'6',name:'Test',nickname:'Captain',totalScore:120,gradeCorrectionRequest:{requestedGrade:'7',status:'pending'}}};
        await window.__login('a');await window.loadAdminUsers();await window.changeUserGrade('s','7');
    });
    expect(await page.evaluate(()=>window.__records.s.sinif)).toBe('7');
    expect(await page.evaluate(()=>window.__records.s.totalScore)).toBe(120);
    expect(await page.evaluate(()=>window.__writes)).toEqual([{uid:'s',data:{sinif:'7',gradeCorrectionRequest:{requestedGrade:'7',status:'approved'}}}]);
});

test('failed question loading displays no stale count and allows explicit retry',async({page})=>{
    let requests=0;
    await page.route('**/pilot_7_senaryo2.json',route=>{requests++;return route.abort();});
    await mockFirebase(page,false);
    await page.evaluate(async()=>{window.__records.a={role:'admin'};await window.__login('a');document.getElementById('btn-admin-panel').click();});
    await expect(page.locator('#btn-admin-tab-questions')).toContainText('Yüklenemedi');
    await page.locator('#btn-admin-tab-questions').click();
    await expect(page.locator('#admin-review-container')).toContainText('yeniden açarak');
    const stopped=requests;await page.waitForTimeout(200);expect(requests).toBe(stopped);
    await page.unroute('**/pilot_7_senaryo2.json');
    await page.locator('#btn-admin-tab-questions').click();
    await expect(page.locator('#btn-admin-tab-questions')).toContainText('78 Soru');
});

test('untrusted profile text cannot execute markup in administrator rows',async({page})=>{
    await mockFirebase(page,false);
    await page.evaluate(async()=>{
        window.__records={a:{role:'admin'},s:{role:'student',sinif:'6',name:'<img src=x onerror="window.__profileInjection=1">',nickname:'<svg onload="window.__profileInjection=1">'}};
        await window.__login('a');await window.loadAdminUsers();
    });
    await expect(page.locator('.admin-user-details h4')).toContainText('<svg onload=');
    await expect(page.locator('.admin-user-details img, .admin-user-details svg')).toHaveCount(0);
    expect(await page.evaluate(()=>window.__profileInjection)).toBeUndefined();
});
