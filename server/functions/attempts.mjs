import { randomUUID } from 'node:crypto';
import { chooseQuestions, unitPool, shuffled, prepareQuestion } from './bank.mjs';
import { requireCompetition, schoolYear } from './policy.mjs';
const validId=id=>typeof id==='string' && /^[a-zA-Z0-9-]{16,80}$/.test(id);
const duration=index=>index<4?40:index<8?50:60;
const points=index=>index<4?100:index<8?200:400;
const millis=value=>value?.toMillis ? value.toMillis() : new Date(value).getTime();
const spent=(a,now)=>Math.max(0,(a.pausedAt?millis(a.pausedAt):now.getTime())-millis(a.openedAt)-(a.pausedMs||0));
const ref=(db,uid,id)=>db.doc(`competitionProfiles/${uid}/attempts/${id}`);
export function publicAttempt(a,now=new Date()) {
 const q=a.questions[a.index];
 return {attemptId:a.id,index:a.index,score:a.score,done:a.done,reason:a.reason || '',needsRisk:!a.done&&a.index>=8&&!a.openedAt,
  paused:!!a.pausedAt,jokers:a.jokers,hint:a.hintToken===a.questionToken?q?.hint||'':null,hiddenOptionIds:a.fiftyToken===a.questionToken?a.hiddenOptions||[]:[],question:a.done||!a.openedAt?null:{question:q.question,answerOptions:q.options.map(o=>({id:o.id,text:o.text})),token:a.questionToken,difficulty:q.difficulty},
  seconds:a.openedAt?Math.max(0,duration(a.index)-Math.floor(spent(a,now)/1000)):duration(a.index)};
}
export async function startAttempt(db,uid,{grade,unit,startId},now=new Date()) {
 if(!validId(startId)||typeof grade!=='string'||!Number.isInteger(unit)||unit<1||unit>10)throw Error('invalid-start');
 // Questions never originate in a request and correct answers never leave the server before evaluation.
 const questions=chooseQuestions(grade,unit);
 return db.runTransaction(async tx=>{
  const ar=ref(db,uid,startId),cr=db.doc(`competitionProfiles/${uid}`),ur=db.doc(`users/${uid}`);
  const quota=db.doc(`competitionProfiles/${uid}/limits/${now.toISOString().slice(0,10)}`);
  const [as,cs,us,qs]=await Promise.all([tx.get(ar),tx.get(cr),tx.get(ur),tx.get(quota)]);
  if(!us.exists||!cs.exists)throw Error('class-required');
  requireCompetition(cs.data(),us.data(),grade,schoolYear(now));
  if(as.exists)return publicAttempt(as.data(),now);
  if((qs.data()?.starts||0)>=60)throw Error('daily-attempt-limit');
  const a={id:startId,uid,grade,unit,schoolYear:schoolYear(now),questions,index:0,score:0,done:false,openedAt:now,startedAt:now,pausedMs:0,pausedAt:null,questionToken:randomUUID(),jokers:{hint:false,fifty:false,pass:false,pause:false},answers:[]};
  tx.create(ar,a);tx.set(quota,{starts:(qs.data()?.starts||0)+1});return publicAttempt(a,now);
 });
}
export async function actOnAttempt(db,uid,input,now=new Date()) {
 const {attemptId,action,index,token,optionId}=input;
 if(!validId(attemptId)||!['state','open','answer','pass','hint','fifty','pause','resume','finish'].includes(action))throw Error('invalid-action');
 if(input.actionId && !validId(input.actionId))throw Error('invalid-action-id');
 if(Object.keys(input).some(k=>!['attemptId','action','index','token','optionId','joker','actionId'].includes(k)))throw Error('unexpected-input');
 return db.runTransaction(async tx=>{
  const ar=ref(db,uid,attemptId);
  const [as,cs,us]=await Promise.all([tx.get(ar),tx.get(db.doc(`competitionProfiles/${uid}`)),tx.get(db.doc(`users/${uid}`))]);
  if(!as.exists||!cs.exists||!us.exists)throw Error('attempt-missing');
  const a=as.data();requireCompetition(cs.data(),us.data(),a.grade,schoolYear(now));
  if(a.schoolYear!==schoolYear(now))throw Error('year-changed');
  const previous=input.actionId && a.responses?.[input.actionId];
  if(previous){if(previous.request!==JSON.stringify(input))throw Error('action-replay-mismatch');return previous.result;}
  if(!a.done&&now.getTime()-millis(a.startedAt)>2*60*60*1000){a.done=true;a.reason='expired';if(a.index>=8&&a.openedAt)a.score=Math.floor(a.score/2);tx.set(ar,a);return publicAttempt(a,now);}
  if(action==='state')return publicAttempt(a,now);
  // An acknowledged answer can be replayed after a lost response, without awarding again.
  if(action==='answer'&&a.answers.some(r=>r.token===token))return {...publicAttempt(a,now),evaluation:a.answers.find(r=>r.token===token)};
  if(a.done)return publicAttempt(a,now);
  if(index!==a.index)throw Error('stale-question');
  let extra={};
  const q=a.questions[a.index];
  if(action==='open') {
   if(!a.openedAt){a.openedAt=now;a.questionToken=randomUUID();a.pausedMs=0;a.pausedAt=null;}
  } else if(action==='finish') {
   a.done=true;a.reason=a.index>=8&&!a.openedAt?'withdraw':'ended';
   if(a.index>=8&&a.openedAt)a.score=Math.floor(a.score/2);
  } else {
   if(!a.openedAt||token!==a.questionToken)throw Error('question-not-open');
   if(action==='pause'||action==='resume') {
    const kind=input.joker?'joker':'global';
    if(action==='pause'&&input.joker){if(a.index<4||a.jokers.pause)throw Error('joker-unavailable');a.jokers.pause=true;}
    a.pauses={...(a.pauses||{}),[kind]:action==='pause'};
    const paused=Object.values(a.pauses).some(Boolean);
    if(paused&&!a.pausedAt)a.pausedAt=now;
    if(!paused&&a.pausedAt){a.pausedMs+=now.getTime()-millis(a.pausedAt);a.pausedAt=null;}
   } else if(action==='answer') {
    if(a.pausedAt)throw Error('attempt-paused');
    if(optionId!==null && !q.options.some(o=>o.id===optionId))throw Error('invalid-option');
    const seconds=Math.floor(spent(a,now)/1000);
    // Client timeout signals cannot award a correct answer; late answers lose.
    const correct=seconds<duration(a.index)&&q.options.some(o=>o.id===optionId&&o.correct);
    const earned=correct?points(a.index)+Math.max(0,duration(a.index)-seconds)*5:0;
    a.score+=earned;
    const evaluation={token,index,correct,correctOptionId:q.options.find(o=>o.correct)?.id,hint:q.hint,earned,score:a.score};
    a.answers.push(evaluation);extra={evaluation};
    if(!correct){if(a.index>=8)a.score=Math.floor(a.score/2);a.done=true;a.reason=seconds>=duration(a.index)?'timeout':'wrong';}
    else {a.index++;a.openedAt=null;a.pausedAt=null;a.pausedMs=0;a.pauses={};if(a.index===10){a.done=true;a.reason='complete';}}
   } else if(action==='pass') {
    if(a.jokers.pass)throw Error('joker-used');
    const replacement=shuffled(unitPool(a.grade,a.unit).filter(p=>p.difficulty==q.difficulty&&!a.questions.some(s=>s.key===p.key)))[0];
    if(!replacement)throw Error('replacement-unavailable');
    a.questions[a.index]=prepareQuestion(replacement);a.jokers.pass=true;a.openedAt=now;a.pausedAt=null;a.pausedMs=0;a.pauses={};a.questionToken=randomUUID();
   } else if(action==='hint') {
    if(a.jokers.hint)throw Error('joker-used');a.jokers.hint=true;a.hintToken=a.questionToken;extra={hint:q.hint};
   } else if(action==='fifty') {
    if(a.jokers.fifty)throw Error('joker-used');a.jokers.fifty=true;a.fiftyToken=a.questionToken;a.hiddenOptions=shuffled(q.options.filter(o=>!o.correct)).slice(0,2).map(o=>o.id);extra={hiddenOptionIds:a.hiddenOptions};
   }
  }
  const result={...publicAttempt(a,now),...extra};
  if(input.actionId){a.responses={...(a.responses||{}),[input.actionId]:{request:JSON.stringify(input),result}};a.responses=Object.fromEntries(Object.entries(a.responses).slice(-80));}
  tx.set(ar,a);return result;
 });
}
