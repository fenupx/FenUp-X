// Explicit synthetic production test; never reads or edits a real student's record.
import {createRequire} from 'node:module';
import {randomUUID,randomBytes} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {initializeApp,deleteApp} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {FirestoreRest} from '../worker/firestore-rest.mjs';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),cli=require('firebase-tools/lib/auth.js');
const {chromium}=createRequire(new URL('../../package.json',import.meta.url))('@playwright/test');
const account=cli.getGlobalDefaultAccount();const token=await cli.getAccessToken(account.tokens.refresh_token,['https://www.googleapis.com/auth/cloud-platform']);
const app=initializeApp({projectId:'fenup-x',credential:{getAccessToken:async()=>({access_token:token.access_token,expires_in:3600})}});
const auth=getAuth(app),db=new FirestoreRest({projectId:'fenup-x',token:async()=>token.access_token});
const uid='fenupx-score-test-'+randomUUID(),email=uid+'@example.invalid',password=randomBytes(24).toString('base64url');
let browser;const read=path=>db.runTransaction(tx=>tx.get(db.doc(path)));
try{
 await auth.createUser({uid,email,password,emailVerified:true});
 await db.runTransaction(async tx=>tx.create(db.doc('users/'+uid),{name:'Synthetic',surname:'Test',nickname:'FenUp X Test',role:'student',sinif:'5',isBanned:false,totalScore:120}));
 browser=await chromium.launch();const context=await browser.newContext();const page=await context.newPage();
 page.on('response',async r=>{if(r.url().includes('workers.dev')&&r.status()>=400)console.error('worker-error',r.status(),(await r.text()).slice(0,500));});
 page.on('dialog',d=>{console.log('test-dialog',d.message());d.accept();});page.on('pageerror',e=>console.error('test-page-error',e.message));
 await page.addInitScript(()=>localStorage.setItem('fenupx_cookie_consent','accepted'));
 await page.route('**/competition-config.js*',route=>route.fulfill({contentType:'text/javascript',body:readFileSync(new URL('../../competition-config.js',import.meta.url),'utf8').replace('COMPETITION_BACKEND_READY = false','COMPETITION_BACKEND_READY = true').replace("COMPETITION_API_URL = ''","COMPETITION_API_URL = 'https://fenupx-score.mistralx-rk.workers.dev'")}));
 await page.route('**/script.js*',route=>{
  let source=readFileSync(new URL('../../script.js',import.meta.url),'utf8');
  source=source.replace('const db = getFirestore(app);',`const db = getFirestore(app);await signInWithEmailAndPassword(auth,${JSON.stringify(email)},${JSON.stringify(password)});`);
  source+=`\nwindow.__scoreLive={start:async()=>{selectedGrade='5';selectedUnit='1';activeMode='bireysel';currentActivePlayerName='FenUp X Test';await startIndividual();},get:()=>quizState.ranked?.state,ready:()=>loadedProfile?.role==='student'&&auth.currentUser?.emailVerified,call:competitionCall,load:()=>loadGlobalLeaderboard('alltime')};`;
  return route.fulfill({contentType:'text/javascript',body:source});
 });
 await page.route('**/competition-run.js*',route=>route.fulfill({contentType:'text/javascript',body:readFileSync(new URL('../../competition-run.js',import.meta.url),'utf8')}));
 await page.goto('https://fenupx.com/');await page.waitForFunction(()=>window.__scoreLive?.ready());
 await page.evaluate(()=>window.__scoreLive.start());let state=await page.evaluate(()=>window.__scoreLive.get());assert.ok(state?.attemptId);
 const attemptPath=`competitionProfiles/${uid}/attempts/${state.attemptId}`;
 const attempt=(await read(attemptPath)).data();const correct=attempt.questions[0].options.find(o=>o.correct).id;
 await page.locator(`.answer-btn[data-option-id="${correct}"]`).click();await page.waitForFunction(()=>window.__scoreLive.get()?.index===1&&!!window.__scoreLive.get()?.question);
 const second=(await read(attemptPath)).data();const wrong=second.questions[1].options.find(o=>!o.correct).id;
 await page.locator(`.answer-btn[data-option-id="${wrong}"]`).click();await page.waitForFunction(()=>window.__scoreLive.get()?.settlement?.accepted);
 state=await page.evaluate(()=>window.__scoreLive.get());assert.ok(state.score>0&&state.score<=300);
 const entryPath=`leaderboards/${attempt.schoolYear}/grades/5/entries/${uid}`;
 assert.equal((await read('users/'+uid)).data().totalScore,120+state.score);assert.equal((await read(entryPath)).data().score,state.score);
 assert.equal((await read(`leaderboards/${attempt.schoolYear}/grades/6/entries/${uid}`)).exists,false);
 const repeat=await page.evaluate(id=>window.__scoreLive.call('submitCompetitionResult',{attemptId:id}),state.attemptId);assert.equal(repeat.delta,0);
 const forged=await page.evaluate(async()=>{try{await window.__scoreLive.call('submitCompetitionResult',{attemptId:'synthetic-forgery-001',score:99999});return false;}catch{return true;}});assert.equal(forged,true);
 await page.evaluate(()=>window.__scoreLive.load());await page.waitForFunction(()=>[...document.querySelectorAll('.global-lb-row')].some(r=>r.textContent.includes('FenUp X Test')));
 await db.runTransaction(async tx=>tx.update(db.doc('users/'+uid),{nickname:'Updated Live Test',isBanned:true}));
 await page.evaluate(()=>window.__scoreLive.call('syncCompetitionDisplay',{}));
 assert.equal((await read(entryPath)).data().isBanned,true);
 assert.equal((await read(entryPath)).data().nickname,'Updated Live Test');
 const cleanup=await page.evaluate(()=>window.__scoreLive.call('deleteCompetitionData',{}));assert.equal(cleanup.done,true);
 assert.equal((await read(entryPath)).exists,false);
 console.log(JSON.stringify({production:true,syntheticAccountOnly:true,priorScorePreserved:120,serverScore:state.score,grade:'5',schoolYear:attempt.schoolYear,leaderboardVisible:true,idempotentReplay:true,forgedScoreRejected:true,displayAndBanSynced:true,competitionDataCleanup:true,worker:'https://fenupx-score.mistralx-rk.workers.dev'}));
}finally{
 if(browser)await browser.close();
 const paths=[`users/${uid}`,`competitionProfiles/${uid}`];
 for(const collection of ['attempts','receipts','limits']){
  const raw=await db.api(`${db.database}/documents/competitionProfiles/${uid}/${collection}?pageSize=100`,'GET');
  for(const doc of raw.documents||[])paths.push(doc.name.split('/documents/')[1]);
 }
 const year=new Date().getFullYear();for(const grade of ['5','6'])paths.push(`leaderboards/${year}/grades/${grade}/entries/${uid}`);
 await db.api(`${db.database}/documents:commit`,'POST',{writes:paths.map(path=>({delete:db.doc(path).name}))});
 try{await auth.deleteUser(uid);}catch(e){if(e.code!=='auth/user-not-found')throw e;}
 await deleteApp(app);console.log('Synthetic production test data cleaned.');
}
