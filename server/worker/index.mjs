import {syncCompetitionDisplay} from './display.mjs';
import {deleteCompetitionData} from './cleanup.mjs';
import {getClientStore} from './client-store.mjs';
import {verifyFirebaseToken} from './auth.mjs';
import {startAttempt,actOnAttempt} from '../functions/attempts.mjs';
import {ensureCohort,correctClass,settleAttempt} from '../functions/service.mjs';
const validGrade=g=>['5','6','7','8'].includes(g);
const text=v=>typeof v==='string'?v:'';
async function readBody(request){
 const reader=request.body?.getReader();if(!reader)throw Error('invalid-request');let size=0;const chunks=[];
 for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>16384){await reader.cancel();throw Error('request-too-large');}chunks.push(value);}
 const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.length;}
 try{const body=JSON.parse(new TextDecoder().decode(bytes));if(!body||Array.isArray(body)||typeof body!=='object')throw Error();return body;}catch{throw Error('invalid-request');}
}
async function legacyLeaderboard(db,data){
 const {grade,type}=data;if(!validGrade(grade)||!['weekly','monthly','alltime'].includes(type))throw Error('invalid-request');
 const field=(type==='weekly'?'weeklyScore':type==='monthly'?'monthlyScore':'seasonScore')+'_'+grade;
 const rows=await db.api(`${db.database}/documents:runQuery`,'POST',{structuredQuery:{from:[{collectionId:'users'}],orderBy:[{field:{fieldPath:field},direction:'DESCENDING'}],limit:50,select:{fields:['nickname','avatar','role','isBanned',field,`lastWeekId_${grade}`,`lastMonthId_${grade}`,`lastSeasonId_${grade}`].map(fieldPath=>({fieldPath}))}}});
 const {periodIds,schoolYear}=await import('../functions/policy.mjs');const period=periodIds();const year=schoolYear();
 return {users:rows.filter(r=>r.document).map(r=>r.document.fields).filter(f=>f.role?.stringValue==='student'&&f.isBanned?.booleanValue!==true).map(f=>{
  const matching=type==='weekly'?f[`lastWeekId_${grade}`]?.stringValue===period.weekId:type==='monthly'?f[`lastMonthId_${grade}`]?.stringValue===period.monthId:f[`lastSeasonId_${grade}`]?.stringValue===`${year}-${year+1}`;
  return {nickname:text(f.nickname?.stringValue),avatar:text(f.avatar?.stringValue),displayScore:matching?Number(f[field]?.integerValue || f[field]?.doubleValue || 0):0};
 }).filter(u=>u.displayScore>0)};
}
export default {
 async fetch(request,env){
  const url=new URL(request.url),origin=request.headers.get('Origin');
  const allowed=(env.ALLOWED_ORIGINS||'https://fenupx.com,https://www.fenupx.com').split(',');
  const cors={'Access-Control-Allow-Origin':origin&&allowed.includes(origin)?origin:allowed[0],'Access-Control-Allow-Headers':'Authorization, Content-Type','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Max-Age':'600','Vary':'Origin','Cache-Control':'no-store'};
  const reply=(body,status=200)=>Response.json(body,{status,headers:cors});
  if(origin&&!allowed.includes(origin))return reply({error:'origin-not-allowed'},403);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
  if(url.pathname==='/health'&&request.method==='GET')return reply({service:'fenupx-score',transport:'workers-free',annualPromotion:false});
  if(request.method!=='POST')return reply({error:'method-not-allowed'},405);
  const emulator=env.LOCAL_EMULATORS==='true';
  if(emulator&&(env.FIREBASE_PROJECT_ID!=='demo-fenupx'||!['127.0.0.1','localhost'].includes(url.hostname)))return reply({error:'emulator-configuration-rejected'},503);
  try{
   const data=await readBody(request),name=url.pathname.replace(/^\/rpc\//,'');
   const supported=['competitionAction','initializeCompetition','correctStudentClass','submitCompetitionResult','legacyLeaderboard','deleteCompetitionData','syncCompetitionDisplay'];
   if(!supported.includes(name))return reply({error:'unknown-operation'},404);
   const db=await getClientStore(env,emulator);
   if(name==='legacyLeaderboard')return reply({result:await legacyLeaderboard(db,data)});
   const bearer=request.headers.get('Authorization');if(!bearer?.startsWith('Bearer '))throw Error('unauthenticated');
   const claims=await verifyFirebaseToken(bearer.slice(7),env.FIREBASE_PROJECT_ID,{emulator});const uid=claims.sub;
   let result;
   if(name==='syncCompetitionDisplay')result=await syncCompetitionDisplay(db,uid,data);
   else if(name==='deleteCompetitionData'){
    if(Date.now()/1000-claims.auth_time>300)throw Error('recent-login-required');
    result=await deleteCompetitionData(db,uid);
   }else if(name==='initializeCompetition')result=await ensureCohort(db,uid);
   else if(name==='correctStudentClass'){
    if(typeof data.uid!=='string'||!data.uid||data.uid.length>128||data.uid.includes('/'))throw Error('invalid-request');
    result=await correctClass(db,uid,data.uid,data.grade);
   }else{
    if(claims.email_verified!==true&&claims.firebase?.sign_in_provider!=='google.com')throw Error('email-verification-required');
    if(name==='submitCompetitionResult')result=await settleAttempt(db,uid,data);
    else{
     if(data.action==='start'){
      if(Object.keys(data).some(k=>!['action','grade','unit','startId'].includes(k)))throw Error('unexpected-input');
      await ensureCohort(db,uid); // Annual progression deliberately remains disabled.
      result=await startAttempt(db,uid,data);
     }else result=await actOnAttempt(db,uid,data);
     if(result.done)result.settlement=await settleAttempt(db,uid,{attemptId:result.attemptId});
    }
   }
   return reply({result});
  }catch(e){
   console.error('score-operation-rejected',e.code||(/^[A-Za-z_-]+$/.test(e.message)?e.message:'operation-failed'),e.operation||'rpc');
   const reason=typeof e.code==='string'?e.code.split('/').pop():(/^[A-Za-z_-]+$/.test(e.message)?e.message:'operation-failed');
   const quota=['RESOURCE_EXHAUSTED','resource-exhausted','daily-attempt-limit'].includes(reason);
   return reply({error:quota?'quota-exceeded':reason},quota?429:reason==='unauthenticated'?401:['service-not-configured','service-authentication-failed','authentication-unavailable'].includes(reason)?503:400);
  }
 }
};
