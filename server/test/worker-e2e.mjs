import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {initializeApp,deleteApp} from 'firebase-admin/app';
import {getAuth} from 'firebase-admin/auth';
import {getFirestore} from 'firebase-admin/firestore';
import {createRequire} from 'node:module';
import {readFileSync,writeFileSync,rmSync} from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(new URL('../../package.json',import.meta.url));const engines=require('@playwright/test');const engine=process.env.SCORE_E2E_BROWSER || 'chromium';
const app=initializeApp({projectId:'demo-fenupx'}),auth=getAuth(app),db=getFirestore(app);
const email=`score-e2e-${engine}@example.invalid`;const nickname=`ScoreE2E-${engine}`;
const user=await auth.createUser({email,password:'OnlySynthetic123!',emailVerified:true});
await db.doc(`users/${user.uid}`).set({name:'Synthetic',surname:'Only',nickname,role:'student',sinif:'5',isBanned:false,totalScore:120});
const service=await auth.createUser({email:`service-${engine}@example.invalid`,password:'SyntheticService123!',emailVerified:true});
await db.doc(`internalServiceIdentities/${service.uid}`).set({enabled:true});
const credential=JSON.stringify({email:service.email,password:'SyntheticService123!',uid:service.uid});
const varsFile=new URL('../worker/.dev.vars.local',import.meta.url);
writeFileSync(varsFile,`FIREBASE_SERVICE_CREDENTIAL='${credential}'\n`,{mode:0o600});
const worker=spawn(process.execPath,[fileURLToPath(new URL('../worker/node_modules/wrangler/bin/wrangler.js',import.meta.url)),'dev','--config',fileURLToPath(new URL('../worker/wrangler.jsonc',import.meta.url)),'--env','local','--local','--ip','127.0.0.1','--port','8787'],{stdio:['ignore','pipe','pipe']});
worker.stdout.on('data',d=>{if(/ERROR|rpc|Error/.test(String(d)))process.stderr.write(d);});worker.stderr.on('data',d=>process.stderr.write(d));
for(let i=0;i<100;i++){try{const r=await fetch('http://127.0.0.1:8787/health');if(r.ok)break;}catch{}if(i===99)throw Error('Worker did not start');await new Promise(r=>setTimeout(r,100));}
const browser=await engines[engine].launch();
try {
 const context=await browser.newContext({viewport:engine==='webkit'?{width:390,height:844}:{width:1366,height:900},hasTouch:engine==='webkit',isMobile:engine==='webkit'});
 const page=await context.newPage();page.setDefaultTimeout(15000);page.on('dialog',d=>{console.log('DIALOG',d.message());d.accept();});page.on('response',async r=>{if(r.url().includes('8787')&&r.status()>=400)console.error('WORKER RESPONSE',r.status(),await r.text());});page.on('pageerror',e=>console.error('PAGE ERROR',e.message));
 await page.addInitScript(()=>localStorage.setItem('fenupx_cookie_consent','accepted'));
 await page.route('**/competition-config.js*',route=>route.fulfill({contentType:'text/javascript',body:readFileSync(new URL('../../competition-config.js',import.meta.url),'utf8').replace('COMPETITION_BACKEND_READY = false','COMPETITION_BACKEND_READY = true').replace(/COMPETITION_API_URL = '[^']*'/,"COMPETITION_API_URL = 'http://127.0.0.1:8787'")}));
 await page.route('**/script.js*',route=>{
  let source=readFileSync(new URL('../../script.js',import.meta.url),'utf8');
  source=source.replace('projectId: "fenup-x"','projectId: "demo-fenupx"').replace('apiKey: "AIzaSyCJlQQH64tsze59akzcnBMPRbH2HY7rCho"','apiKey: "demo-fenupx-key"');
  source=source.replace('getAuth, createUserWithEmailAndPassword','connectAuthEmulator, getAuth, createUserWithEmailAndPassword').replace('getFirestore, doc,','connectFirestoreEmulator, getFirestore, doc,');
  source=source.replace('const auth = getAuth(app);',"const auth = getAuth(app);connectAuthEmulator(auth,'http://127.0.0.1:9098',{disableWarnings:true});");
  source=source.replace('const db = getFirestore(app);',`const db = getFirestore(app);connectFirestoreEmulator(db,'127.0.0.1',8188);await signInWithEmailAndPassword(auth,'${email}','OnlySynthetic123!');`);
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
 await page.route('http://127.0.0.1:8787/rpc/competitionAction',async route=>{
  const request=route.request();
  if(request.method()==='POST'&&!lostResponse&&JSON.parse(request.postData()||'{}').action==='answer'){
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
 // Return through the actual result-screen control before starting again.
 await page.locator('#btn-back-draw').click();
 // Resume an unfinished server-timed attempt after a paused tab is reloaded.
 await page.evaluate(()=>window.__e2eCompetition.start());
 const resumable=await page.evaluate(()=>window.__e2eCompetition.get());
 let lostPause=false;
 await page.route('http://127.0.0.1:8787/rpc/competitionAction',async route=>{
  if(route.request().method()==='POST'&&!lostPause&&route.request().postDataJSON().action==='pause'){lostPause=true;await route.fetch();await route.abort();}
  else await route.continue();
 });
 await page.evaluate(()=>window.__e2eCompetition.pause());
 await page.getByRole('button',{name:'Yeniden dene',exact:true}).click();
 await page.waitForFunction(()=>window.__e2eCompetition.get()?.paused===false);
 assert.equal(lostPause,true);
 await page.evaluate(()=>window.__e2eCompetition.pause());
 await page.reload();await page.waitForFunction(()=>window.__e2eCompetition?.ready() && document.getElementById('profile-grade')?.value==='5');
 await page.evaluate(()=>window.__e2eCompetition.start());
 const resumed=await page.evaluate(()=>window.__e2eCompetition.get());
 assert.equal(resumed.attemptId,resumable.attemptId);assert.equal(resumed.paused,false);
 await page.evaluate(()=>window.__e2eCompetition.end());
 const pending=await page.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('fenupx_competition_pending_')).map(k=>localStorage.getItem(k)));
 assert.equal(pending.filter(Boolean).length,0);
 assert.equal(await page.locator('.competition-history-toggle').count(),1);
 await db.doc(`users/${user.uid}`).update({nickname:'UpdatedSynthetic',isBanned:true});
 await page.evaluate(()=>window.__e2eCompetition.call('syncCompetitionDisplay',{}));
 assert.equal((await db.doc(entryPath).get()).data().isBanned,true);
 assert.equal((await db.doc(entryPath).get()).data().nickname,'UpdatedSynthetic');
 const foreign=await page.evaluate(async()=>{try{await window.__e2eCompetition.call('syncCompetitionDisplay',{uid:'another-user'});return false;}catch{return true;}});assert.equal(foreign,true);
 const cleanup=await page.evaluate(()=>window.__e2eCompetition.call('deleteCompetitionData',{}));assert.equal(cleanup.done,true);
 assert.equal((await db.doc(entryPath).get()).exists,false);
 assert.equal((await db.collection(`competitionProfiles/${user.uid}/attempts`).get()).empty,true);
 assert.equal((await db.collection(`competitionProfiles/${user.uid}/receipts`).get()).empty,true);
 assert.equal((await db.doc(`users/${user.uid}`).get()).data().totalScore,120+result.score);
 const blocked=await page.evaluate(async()=>{try{await window.__e2eCompetition.call('competitionAction',{action:'start',grade:'5',unit:1,startId:crypto.randomUUID()});return false;}catch{return true;}});assert.equal(blocked,true);
 console.log(JSON.stringify({browser:engine,e2e:'Auth + Firestore emulators + real Cloudflare Worker runtime + real browser UI',serverCalculatedScore:result.score,correctGrade:'5',schoolYear:stored.schoolYear,priorScorePreserved:120,idempotentReplay:true,lostAnswerResponseRecovered:true,lostPauseResponseRecovered:true,pausedReloadRecovered:true,forgedScoreRejected:true,leaderboardVisible:true,accountCompetitionCleanup:true,productionWrites:0}));
}finally{await browser.close();worker.kill();await once(worker,'exit');rmSync(varsFile,{force:true});await deleteApp(app);}
