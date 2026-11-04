import {initializeApp,deleteApp} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(new URL('../../package.json',import.meta.url));const engines=require('@playwright/test');const engine=process.env.SCORE_E2E_BROWSER || 'chromium';
const app=initializeApp({projectId:'demo-fenupx'}),auth=getAuth(app),db=getFirestore(app);
const email=`score-e2e-${engine}@example.invalid`;const nickname=`ScoreE2E-${engine}`;
const user=await auth.createUser({email,password:'OnlySynthetic123!',emailVerified:true});
await db.doc(`users/${user.uid}`).set({name:'Synthetic',surname:'Only',nickname,role:'student',sinif:'5',isBanned:false,totalScore:120});
const browser=await engines[engine].launch();
try {
 const context=await browser.newContext({viewport:engine==='webkit'?{width:390,height:844}:{width:1366,height:900},hasTouch:engine==='webkit',isMobile:engine==='webkit'});
 const page=await context.newPage();page.on('dialog',d=>d.accept());page.on('pageerror',e=>console.error('PAGE ERROR',e.message));
 await page.addInitScript(()=>localStorage.setItem('fenupx_cookie_consent','accepted'));
 await page.route('**/competition-config.js*',route=>route.fulfill({contentType:'text/javascript',body:readFileSync(new URL('../../competition-config.js',import.meta.url),'utf8').replace('COMPETITION_BACKEND_READY = false','COMPETITION_BACKEND_READY = true')}));
 await page.route('**/script.js*',route=>{
  let source=readFileSync(new URL('../../script.js',import.meta.url),'utf8');
  source=source.replace('projectId: "fenup-x"','projectId: "demo-fenupx"').replace('apiKey: "AIzaSyCJlQQH64tsze59akzcnBMPRbH2HY7rCho"','apiKey: "demo-fenupx-key"');
  source=source.replace('getAuth, createUserWithEmailAndPassword','connectAuthEmulator, getAuth, createUserWithEmailAndPassword').replace('getFirestore, doc,','connectFirestoreEmulator, getFirestore, doc,');
  source="import {getFunctions,connectFunctionsEmulator} from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-functions.js';\n"+source;
  source=source.replace('const auth = getAuth(app);',"const auth = getAuth(app);connectAuthEmulator(auth,'http://127.0.0.1:9098',{disableWarnings:true});");
  source=source.replace('const db = getFirestore(app);',`const db = getFirestore(app);connectFirestoreEmulator(db,'127.0.0.1',8188);connectFunctionsEmulator(getFunctions(app,'europe-west1'),'127.0.0.1',5008);await signInWithEmailAndPassword(auth,'${email}','OnlySynthetic123!');`);
  // Test-only access to the existing entry point; the app and all Firebase SDK calls are real.
  source+=`\nwindow.__e2eCompetition={start:async()=>{selectedGrade='5';selectedUnit='1';activeMode='bireysel';currentActivePlayerName='ScoreE2E';await startIndividual();},get:()=>quizState.ranked?.state,pause:()=>toggleMasterPause(),end:()=>finishIndividual('TEST BİTİŞİ'),ready:()=>loadedProfile?.role==='student'&&auth.currentUser?.emailVerified,call:competitionCall,load:()=>loadGlobalLeaderboard('alltime')};`;
  return route.fulfill({contentType:'text/javascript',body:source});
 });
 await page.goto('http://127.0.0.1:4173/');
 await page.waitForFunction(()=>window.__e2eCompetition?.ready() && document.getElementById('profile-grade')?.value==='5');
 await page.evaluate(()=>window.__e2eCompetition.start());
 let state=await page.evaluate(()=>window.__e2eCompetition.get());assert.ok(state?.attemptId);
 const attemptPath=`competitionProfiles/${user.uid}/attempts/${state.attemptId}`;
 const stored=(await db.doc(attemptPath).get()).data();
 const correct=stored.questions[0].options.find(o=>o.correct).id;
 let lostResponse=false;
 await page.route('http://127.0.0.1:5008/**/competitionAction',async route=>{
  const request=route.request();
  if(request.method()==='POST'&&!lostResponse&&JSON.parse(request.postData()||'{}').data?.action==='answer'){
   lostResponse=true;await route.fetch();await route.abort();
  } else await route.continue();
 });
 await page.locator(`.answer-btn[data-option-id="${correct}"]`).click();
 await page.getByRole('button',{name:'Yeniden dene',exact:true}).waitFor();
 assert.equal(lostResponse,true);
 await page.getByRole('button',{name:'Yeniden dene',exact:true}).click();
 await page.waitForFunction(()=>window.__e2eCompetition.get()?.index===1);
 state=await page.evaluate(()=>window.__e2eCompetition.get());assert.ok(state.score>0);
 await page.waitForFunction(()=>!!window.__e2eCompetition.get()?.question);
 const next=(await db.doc(attemptPath).get()).data();
 const wrong=next.questions[1].options.find(o=>!o.correct).id;
 await page.locator(`.answer-btn[data-option-id="${wrong}"]`).click();
 await page.waitForFunction(()=>window.__e2eCompetition.get()?.settlement?.accepted===true);
 const result=await page.evaluate(()=>window.__e2eCompetition.get());
 assert.equal(result.done,true);assert.ok(result.score>0);assert.ok(result.score<=300);
 const entryPath=`leaderboards/${stored.schoolYear}/grades/5/entries/${user.uid}`;
 const entry=(await db.doc(entryPath).get()).data();assert.equal(entry.score,result.score);
 assert.equal((await db.doc(`users/${user.uid}`).get()).data().totalScore,120+result.score);
 assert.equal((await db.doc(`leaderboards/${stored.schoolYear}/grades/6/entries/${user.uid}`).get()).exists,false);
 const repeat=await page.evaluate(id=>window.__e2eCompetition.call('submitCompetitionResult',{attemptId:id}),state.attemptId);
 assert.equal(repeat.delta,0);assert.equal((await db.doc(entryPath).get()).data().score,result.score);
 const forged=await page.evaluate(async()=>{try{await window.__e2eCompetition.call('submitCompetitionResult',{attemptId:'forged-attempt-0001',score:99999,grade:'8'});return false;}catch{return true;}});assert.equal(forged,true);
 await page.evaluate(()=>window.__e2eCompetition.load());
 await page.waitForFunction(n=>[...document.querySelectorAll('.global-lb-row')].some(r=>r.textContent.includes(n)),nickname);
 assert.equal(await page.locator('.global-lb-row').filter({hasText:nickname}).count(),1);
 // Resume an unfinished server-timed attempt after a paused tab is reloaded.
 await page.evaluate(()=>window.__e2eCompetition.start());
 const resumable=await page.evaluate(()=>window.__e2eCompetition.get());
 await page.evaluate(()=>window.__e2eCompetition.pause());
 await page.reload();await page.waitForFunction(()=>window.__e2eCompetition?.ready() && document.getElementById('profile-grade')?.value==='5');
 await page.evaluate(()=>window.__e2eCompetition.start());
 const resumed=await page.evaluate(()=>window.__e2eCompetition.get());
 assert.equal(resumed.attemptId,resumable.attemptId);assert.equal(resumed.paused,false);
 await page.evaluate(()=>window.__e2eCompetition.end());
 const pending=await page.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('fenupx_competition_pending_')).map(k=>localStorage.getItem(k)));
 assert.equal(pending.filter(Boolean).length,0);
 assert.equal(await page.locator('.competition-history-toggle').count(),1);
 console.log(JSON.stringify({browser:engine,e2e:'Auth + Functions + Firestore emulators + real browser UI',serverCalculatedScore:result.score,correctGrade:'5',schoolYear:stored.schoolYear,priorScorePreserved:120,idempotentReplay:true,lostAnswerResponseRecovered:true,pausedReloadRecovered:true,forgedScoreRejected:true,leaderboardVisible:true,productionWrites:0}));
}finally{await browser.close();await deleteApp(app);}
