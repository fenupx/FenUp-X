import {test,before,after} from 'node:test';
import assert from 'node:assert/strict';
import {initializeApp,deleteApp} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import {ensureCohort,settleAttempt} from '../functions/service.mjs';
import {startAttempt,actOnAttempt} from '../functions/attempts.mjs';
const app=initializeApp({projectId:'demo-fenupx'},'attempt-tests'),db=getFirestore(app);
const now=new Date('2026-11-04T09:00:00Z');
before(async()=>{await db.doc('users/player').set({role:'student',sinif:'5',isBanned:false,nickname:'Synthetic',totalScore:100});await ensureCohort(db,'player',now);});
after(()=>deleteApp(app));
const privateAttempt=id=>db.doc(`competitionProfiles/player/attempts/${id}`).get().then(s=>s.data());
const correctChoice=async r=>(await privateAttempt(r.attemptId)).questions[r.index].options.find(o=>o.correct).id;
const action=(r,kind,extra={},date=now)=>actOnAttempt(db,'player',{attemptId:r.attemptId,action:kind,index:r.index,token:r.question?.token,...extra},date);
test('server calculates complete game, does not expose answer keys, settles once under concurrency',async()=>{
 let r=await startAttempt(db,'player',{grade:'5',unit:1,startId:'complete-test-00001'},now);
 assert.ok(r.question.answerOptions.every(o=>!('correct'in o)&&!('isCorrect'in o)));
 assert.ok(r.question.answerOptions.every(o=>/^[0-9a-f-]{36}$/.test(o.id)));
 assert.equal(new Set(r.question.answerOptions.map(o=>o.id)).size,4);
 for(let index=0;index<10;index++){
  if(!r.question)r=await action(r,'open');
  const request={attemptId:r.attemptId,action:'answer',index:r.index,token:r.question.token,optionId:await correctChoice(r)};
  const first=await actOnAttempt(db,'player',request,now);
  const replay=await actOnAttempt(db,'player',request,now);
  assert.equal(first.score,replay.score);r=first;
 }
 assert.equal(r.score,4400);assert.equal(r.done,true);
 const results=await Promise.all([settleAttempt(db,'player',{attemptId:r.attemptId},now),settleAttempt(db,'player',{attemptId:r.attemptId},now)]);
 assert.equal(results.reduce((sum,x)=>sum+x.delta,0),4400);
 assert.equal((await db.doc('users/player').get()).data().totalScore,4500);
 assert.equal((await db.doc('leaderboards/2026/grades/5/entries/player').get()).data().score,4400);
 assert.equal((await db.doc('leaderboards/2026/grades/6/entries/player').get()).exists,false);
});
test('forged numeric score, question, class/year fields and uncompleted settlement are rejected',async()=>{
 const r=await startAttempt(db,'player',{grade:'5',unit:1,startId:'attack-test-000001'},now);
 for(const payload of [{score:99999},{grade:'6'},{schoolYear:2099},{role:'admin'}])await assert.rejects(action(r,'answer',{optionId:'0',...payload}),/unexpected-input/);
 await assert.rejects(action(r,'answer',{token:'made-up-token',optionId:'0'}),/question-not-open/);
 await assert.rejects(settleAttempt(db,'player',{attemptId:r.attemptId},now),/completed-attempt-required/);
});
test('server time defeats client timer manipulation; reopening does not reset deadline',async()=>{
 const r=await startAttempt(db,'player',{grade:'5',unit:1,startId:'clock-test-0000001'},now);
 const later=new Date(now.getTime()+45000);
 const reopened=await action(r,'open',{},later);assert.equal(reopened.seconds,0);
 const ended=await action(r,'answer',{optionId:await correctChoice(r)},later);
 assert.equal(ended.score,0);assert.equal(ended.reason,'timeout');
});
test('pass/hint/fifty are once-only, old question tokens cannot award after pass',async()=>{
 let r=await startAttempt(db,'player',{grade:'5',unit:1,startId:'joker-test-0000001'},now);
 const hint=await action(r,'hint');assert.equal(typeof hint.hint,'string');await assert.rejects(action(r,'hint'),/joker-used/);
 const fifty=await action(r,'fifty');assert.equal(fifty.hiddenOptionIds.length,2);await assert.rejects(action(r,'fifty'),/joker-used/);
 const old=r;r=await action(r,'pass');assert.notEqual(r.question.token,old.question.token);
 await assert.rejects(action(old,'answer',{optionId:'0'}),/question-not-open/);
 await assert.rejects(action(r,'pass'),/joker-used/);
});
test('only highest three results count; no old score is overwritten or moved',async()=>{
 const before=(await db.doc('leaderboards/2026/grades/5/entries/player').get()).data().score;
 for(let i=0;i<4;i++){
  let r=await startAttempt(db,'player',{grade:'5',unit:1,startId:`daily-cap-test-000${i}`},now);
  r=await action(r,'answer',{optionId:await correctChoice(r)});
  r=await action(r,'finish');await settleAttempt(db,'player',{attemptId:r.attemptId},now);
 }
 // Complete game (4400) plus two highest short games (300 each).
 assert.equal((await db.doc('leaderboards/2026/grades/5/entries/player').get()).data().score,before+600);
});

test('nested pause reasons preserve the authoritative timer and retries do not reuse a joker',async()=>{
 let r=await startAttempt(db,'player',{grade:'5',unit:1,startId:'pause-test-0000001'},now);
 for(let i=0;i<4;i++){if(!r.question)r=await action(r,'open');r=await action(r,'answer',{optionId:await correctChoice(r)});}
 r=await action(r,'open');
 const pause={attemptId:r.attemptId,action:'pause',index:r.index,token:r.question.token,joker:true,actionId:'pause-retry-0000001'};
 await actOnAttempt(db,'player',pause,new Date(+now+5000));
 await actOnAttempt(db,'player',pause,new Date(+now+6000));
 r=await action(r,'pause',{},new Date(+now+15000));
 r=await action(r,'resume',{},new Date(+now+45000));assert.equal(r.paused,true);
 r=await action(r,'resume',{joker:true},new Date(+now+125000));assert.equal(r.seconds,45);
 r=await action(r,'answer',{optionId:await correctChoice(r)},new Date(+now+127000));assert.equal(r.score,1615);
});
test('expired attempt retains server-proven earned score for an idempotent settlement',async()=>{
 let r=await startAttempt(db,'player',{grade:'5',unit:1,startId:'expiry-test-000001'},now);
 r=await action(r,'answer',{optionId:await correctChoice(r)});
 r=await action(r,'state',{},new Date(+now+3*60*60*1000));assert.equal(r.done,true);assert.equal(r.score,300);
 const first=await settleAttempt(db,'player',{attemptId:r.attemptId},new Date(+now+3*60*60*1000));
 const second=await settleAttempt(db,'player',{attemptId:r.attemptId},new Date(+now+3*60*60*1000));assert.equal(second.delta,0);assert.equal(first.accepted,true);
});
