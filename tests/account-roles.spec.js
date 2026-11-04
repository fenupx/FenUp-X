import { test, expect } from '@playwright/test';

// In-memory Firebase boundary: these tests never write to production accounts.
async function mockFirebase(page) {
    await page.addInitScript(() => { localStorage.setItem('fenupx_cookie_consent', 'accepted'); window.__records = {}; window.__writes = []; });
    await page.route('https://www.gstatic.com/firebasejs/**', async route => {
        const url = route.request().url();
        let body = '';
        if (url.includes('firebase-app')) body = 'export const initializeApp = () => ({});';
        if (url.includes('firebase-auth')) body = `
            const auth = { currentUser: null }; export const getAuth = () => auth;
            export const onAuthStateChanged = (_, cb) => { window.__login = async (uid) => { auth.currentUser = uid ? { uid, emailVerified: true, providerData: [] } : null; await cb(auth.currentUser); }; setTimeout(() => cb(null), 0); };
            export const signOut = () => window.__login(null);
            export class GoogleAuthProvider {};
            export const EmailAuthProvider = {};
            ${['createUserWithEmailAndPassword','signInWithEmailAndPassword','signInWithPopup','deleteUser','reauthenticateWithCredential','reauthenticateWithPopup','sendEmailVerification','sendPasswordResetEmail'].map(n => `export const ${n} = async () => ({});`).join('\n')}`;
        if (url.includes('firebase-firestore')) body = `
            export const getFirestore = () => ({});
            export const doc = (_, collection, uid) => ({ collection, uid });
            export const getDoc = async ref => { const data = window.__records[ref.uid]; if (window.__delay) await new Promise(r => setTimeout(r, window.__delay)); return { exists: () => !!data, data: () => data }; };
            export const updateDoc = async (ref, data) => { if (window.__fail) throw Error('test failure'); await new Promise(r => setTimeout(r, 50)); window.__writes.push({uid: ref.uid, data}); Object.assign(window.__records[ref.uid], data); };
            export const collection = (_, name) => name;
            export const getDocs = async () => ({ forEach: fn => Object.entries(window.__records).forEach(([id, data]) => fn({ id, data: () => data })) });
            ${['setDoc','deleteDoc','query','orderBy','limit','addDoc'].map(n => `export const ${n} = () => ({});`).join('\n')}`;
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
    await expect(page.locator('#btn-admin-panel')).not.toHaveClass(/is-hidden/);
    await page.evaluate(() => window.__login('t'));
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
    expect(await page.evaluate(() => window.__writes)).toEqual([{uid:'s',data:{sinif:'8'}}]);
    await page.evaluate(async () => {await window.__login(null); await window.changeUserGrade('s','5');});
    expect(await page.evaluate(() => window.__writes.length)).toBe(1);
});

test('promotion remains inert for missing baseline, dates, repeated sessions and terminal grade', async ({page}) => {
    await mockFirebase(page);
    expect(await page.evaluate(() => ['5','6','7','8','',9].map(sinif => {const data={sinif,lastPromotionYear:2025}; const a=window.checkAnnualPromotion(data); const b=window.checkAnnualPromotion(data); return [a,b,data.sinif];}))).toEqual([['5','5','5'],['6','6','6'],['7','7','7'],['8','8','8'],['','',''],['','',9]]);
    expect(await page.evaluate(() => window.__writes)).toEqual([]);
});

test('class native styles and drawing access at phone, landscape, tablet and board sizes', async ({page}) => {
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
});
