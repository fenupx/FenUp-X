// Shared synthetic Firebase boundary; no production account writes.
export async function mockFirebase(page, backendReady = true) {
    page.on('dialog', d => d.accept());
    await page.addInitScript(() => { localStorage.setItem('fenupx_cookie_consent', 'accepted'); window.__records = JSON.parse(sessionStorage.getItem('__records') || '{}'); window.__writes = []; window.__reports = []; });
    await page.route('**/competition-config.js*', route => route.fulfill({contentType:'text/javascript',body:`export const COMPETITION_API_URL="https://score.example.invalid"; export const ANNUAL_PROMOTION_ENABLED=false; export const COMPETITION_BACKEND_READY=${backendReady}; export function competitionYear(now = new Date()) { const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit'}).formatToParts(now).filter(p=>p.type!=='literal').map(p=>[p.type,p.value])); return Number(p.year)-(Number(p.month)<9?1:0); } export function competitionPeriods(now = new Date()) { const p=Object.fromEntries(new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now).filter(p=>p.type!=='literal').map(p=>[p.type,p.value])); const d=new Date(Date.UTC(Number(p.year),Number(p.month)-1,Number(p.day))); d.setUTCDate(d.getUTCDate()+4-(d.getUTCDay()||7)); const week=Math.ceil(((d-new Date(Date.UTC(d.getUTCFullYear(),0,1)))/86400000+1)/7); return {weekId:\`\${d.getUTCFullYear()}-W\${week}\`,monthId:\`\${p.year}-\${p.month}\`}; } export function competitionTimeframeBoundaries(now = new Date()) { const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now).filter(p => p.type !== 'literal').map(p => [p.type, p.value])); const yr = Number(parts.year); const mo = Number(parts.month); const dy = Number(parts.day); const dIso = new Date(Date.UTC(yr, mo - 1, dy)); const dayOfWeek = dIso.getUTCDay(); const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; const mondayDay = dy + diffToMonday; const mondayStartTimestamp = Date.UTC(yr, mo - 1, mondayDay) - (3 * 3600 * 1000); const monthStartTimestamp = Date.UTC(yr, mo - 1, 1) - (3 * 3600 * 1000); const cYear = competitionYear(now); const seasonStartTimestamp = Date.UTC(cYear, 8, 1) - (3 * 3600 * 1000); return { mondayStartTimestamp, monthStartTimestamp, seasonStartTimestamp }; }`}));
    await page.route('https://score.example.invalid/rpc/**', async route => {
        const name=route.request().url().split('/').pop();
        const data=route.request().postDataJSON();
        const result=await page.evaluate(async ({name,data})=>{
            window.__calls=[...(window.__calls||[]),{name,data}];
            if(window.__fail)return {error:'test-failure'};
            if(window.__competitionDelay) await new Promise(r => setTimeout(r, window.__competitionDelay));
            if(name==='correctStudentClass'){
                if(window.__records[sessionStorage.getItem('__uid')]?.role!=='admin')return {error:'admin-required'};
                window.__records[data.uid].sinif=data.grade;
                window.__records[data.uid].gradeCorrectionRequest={requestedGrade:data.grade,status:'approved'};
            }
            if(name==='competitionAction'){
                if(window.__competitionFail)return {error:'competition-failed'};
                window.__competitionAttempts = window.__competitionAttempts || {};
                const act = data.action;
                if(act === 'start') {
                    const attemptId = data.startId || 'att-' + Math.random().toString(36).slice(2);
                    const attempt = {
                        attemptId,
                        index: 0,
                        score: 0,
                        seconds: 40,
                        done: false,
                        reason: '',
                        question: {
                            question: 'Maddenin tanecikli yapısı nasıldır?',
                            answerOptions: [
                                { id: 'opt_a', text: 'Boşluklu ve Hareketli' },
                                { id: 'opt_b', text: 'Hareketsiz ve Sabit' },
                                { id: 'opt_c', text: 'Tek bir atomdan ibaret' },
                                { id: 'opt_d', text: 'Sadece gazlarda vardır' }
                            ],
                            token: 'tok_0'
                        },
                        jokers: { hint: false, fifty: false, pass: false, pause: false }
                    };
                    window.__competitionAttempts[attemptId] = attempt;
                    return { result: attempt };
                }
                const att = window.__competitionAttempts[data.attemptId] || {
                    attemptId: data.attemptId,
                    index: data.index || 0,
                    score: 0,
                    done: false,
                    question: {
                        question: 'Soru metni',
                        answerOptions: [
                            { id: 'opt_a', text: 'Seçenek A' },
                            { id: 'opt_b', text: 'Seçenek B' },
                            { id: 'opt_c', text: 'Seçenek C' },
                            { id: 'opt_d', text: 'Seçenek D' }
                        ],
                        token: 'tok_' + (data.index || 0)
                    }
                };
                if(act === 'open') return { result: att };
                if(act === 'answer') {
                    const isCorrect = data.optionId === 'opt_a';
                    const earned = isCorrect ? 100 : 0;
                    att.score = (att.score || 0) + earned;
                    const evalObj = {
                        correct: isCorrect,
                        correctOptionId: 'opt_a',
                        hint: 'Tanecikler arasında boşluk bulunur.',
                        earned,
                        score: att.score
                    };
                    if(!isCorrect) {
                        att.done = true;
                        att.reason = data.optionId === null ? 'timeout' : 'wrong';
                        att.settlement = { accepted: true, delta: att.score };
                    } else {
                        att.index++;
                        if(att.index >= 10 || data._forceDone) {
                            att.done = true;
                            att.reason = 'complete';
                            att.question = null;
                            att.settlement = { accepted: true, delta: att.score };
                        } else {
                            att.question = {
                                question: `Soru ${att.index + 1} metni`,
                                answerOptions: [
                                    { id: 'opt_a', text: 'Doğru Seçenek A' },
                                    { id: 'opt_b', text: 'Yanlış Seçenek B' },
                                    { id: 'opt_c', text: 'Yanlış Seçenek C' },
                                    { id: 'opt_d', text: 'Yanlış Seçenek D' }
                                ],
                                token: 'tok_' + att.index
                            };
                        }
                    }
                    return { result: { ...att, evaluation: evalObj } };
                }
                if(act === 'finish') {
                    att.done = true;
                    att.settlement = { accepted: true, delta: att.score };
                    return { result: att };
                }
                return { result: att };
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
            export const doc = (_, collection, uid) => ({ collection, uid, _col: collection });
            export const getDoc = async ref => { const data = window.__records[ref.uid]; if (window.__delay) await new Promise(r => setTimeout(r, window.__delay)); return { exists: () => !!data, data: () => data }; };
            export const updateDoc = async (ref, data) => {
                if (window.__fail) throw Error('test failure');
                await new Promise(r => setTimeout(r, 50));
                window.__writes.push({uid: ref.uid, data});
                if (ref.collection === 'reported_questions' || ref._col === 'reported_questions') {
                    const rep = (window.__reports || []).find(r => r.id === ref.uid);
                    if (rep) Object.assign(rep, data);
                    return;
                }
                if (window.__records[ref.uid]) Object.assign(window.__records[ref.uid], data);
                sessionStorage.setItem('__records',JSON.stringify(window.__records));
            };
            export const setDoc = async (ref,data) => {window.__records[ref.uid]=data;sessionStorage.setItem('__records',JSON.stringify(window.__records));};
            export const collection = (_, name) => name;
            export const query = (col) => ({ _col: typeof col === 'string' ? col : col?._col });
            export const orderBy = () => ({});
            export const limit = () => ({});
            export const deleteDoc = () => ({});
            export const addDoc = async (col, data) => {
                if (window.__fail) throw Error('test failure');
                const id = 'rep-' + Math.random().toString(36).substr(2, 9);
                const item = { id, ...data };
                window.__reports = window.__reports || [];
                window.__reports.push(item);
                return { id };
            };
            export const getDocs = async (target) => {
                const colName = typeof target === 'string' ? target : target?._col;
                if (colName === 'reported_questions') {
                    return { forEach: fn => (window.__reports || []).forEach(r => fn({ id: r.id, data: () => r })) };
                }
                return { forEach: fn => Object.entries(window.__records).forEach(([id, data]) => fn({ id, data: () => data })) };
            };`;
        await route.fulfill({ contentType: 'text/javascript', body, headers: {'Access-Control-Allow-Origin':'*'} });
    });
    await page.goto('/');
    await page.waitForFunction(() => window.__login && window.checkAnnualPromotion);
}
