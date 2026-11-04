import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { initializeApp, deleteApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { schoolYear, promote } from '../functions/policy.mjs';
import { startAttempt, actOnAttempt } from '../functions/attempts.mjs';
import { ensureCohort, correctClass, promoteOne, settleAttempt } from '../functions/service.mjs';
const projectId='demo-fenupx'; let env, app, db;
const now=new Date('2026-11-04T10:00:00Z');
const student = grade => ({name:'Test',surname:'Student',nickname:'TestCaptain',role:'student',sinif:grade,totalScore:120,isBanned:false});
before(async()=>{
 env=await initializeTestEnvironment({projectId,firestore:{host:'127.0.0.1',port:8188,rules:readFileSync(new URL('../firestore.rules',import.meta.url),'utf8')}});
 app=initializeApp({projectId},'security-tests'); db=getFirestore(app);
 await db.doc('users/admin').set({role:'admin'});
 await db.doc('users/s').set(student('6')); await db.doc('users/missing').set(student(''));
});
after(async()=>{await env.cleanup();await deleteApp(app);});
test('Istanbul September boundary and graduation policy',()=>{
 assert.equal(schoolYear(new Date('2026-08-31T20:59:59Z')),2025);
 assert.equal(schoolYear(new Date('2026-08-31T21:00:00Z')),2026);
 assert.equal(promote({grade:'6',schoolYear:2026},2026),null);
 assert.equal(promote({grade:'6',schoolYear:2027},2026),null);
 assert.equal(promote({grade:'',schoolYear:2025},2026),null);
 assert.deepEqual(promote({grade:'8',schoolYear:2025},2026),{grade:'8',schoolYear:2026,graduated:true});
});
test('real rules reject role/class/score spoofing and new admin registration',async()=>{
 const client=env.authenticatedContext('s',{role:'admin'}).firestore();
 for (const payload of [{role:'admin'},{sinif:'8'},{totalScore:999},{totalScore_8:999},{schoolYear:2030},{gradeCorrectionRequest:{requestedGrade:'8',status:'approved'}}]) await assertFails(updateDoc(doc(client,'users/s'),payload));
 await assertFails(setDoc(doc(client,'competitionProfiles/s'),{grade:'8',schoolYear:2026}));
 await assertFails(setDoc(doc(client,'leaderboards/2026/grades/8/entries/s'),{score:999}));
 await assertFails(setDoc(doc(env.authenticatedContext('evil').firestore(),'users/evil'),{...student('5'),role:'admin',totalScore:0}));
 await assertFails(updateDoc(doc(env.authenticatedContext('admin').firestore(),'users/s'),{sinif:'9'}));
 await assertSucceeds(updateDoc(doc(client,'users/s'),{nickname:'NewCaptain'}));
});
test('missing class may be chosen once; request never changes recorded class',async()=>{
 const client=env.authenticatedContext('missing').firestore();
 await assertSucceeds(updateDoc(doc(client,'users/missing'),{sinif:'5'}));
 await assertFails(updateDoc(doc(client,'users/missing'),{sinif:'6'}));
 const s=env.authenticatedContext('s').firestore();
 await assertSucceeds(updateDoc(doc(s,'users/s'),{gradeCorrectionRequest:{requestedGrade:'7',status:'pending'}}));
 assert.equal((await getDoc(doc(s,'users/s'))).data().sinif,'6');
 await assertFails(updateDoc(doc(s,'users/s'),{gradeCorrectionRequest:{requestedGrade:'9',status:'pending'}}));
});
test('canonical cohort rejects cross-class, arbitrary score and old-year settlements',async()=>{
 await ensureCohort(db,'s',now);
 await assert.rejects(startAttempt(db,'s',{grade:'8',unit:1,startId:'wrong-grade-start01'},now));
 await assert.rejects(settleAttempt(db,'s',{grade:'6',score:4400,attemptId:'forged-result-0001'},now),/invalid-result/);
 const start=await startAttempt(db,'s',{grade:'6',unit:1,startId:'trusted-attempt-001'},now);
 const privateState=(await db.doc('competitionProfiles/s/attempts/trusted-attempt-001').get()).data();
 await actOnAttempt(db,'s',{attemptId:start.attemptId,action:'answer',index:0,token:start.question.token,optionId:privateState.questions[0].options.find(o=>o.correct).id},now);
 await actOnAttempt(db,'s',{attemptId:start.attemptId,action:'finish',index:1},now);
 assert.equal((await settleAttempt(db,'s',{attemptId:start.attemptId},now)).delta,300);
 assert.equal((await settleAttempt(db,'s',{attemptId:start.attemptId},now)).delta,0);
 assert.equal((await db.doc('leaderboards/2026/grades/8/entries/s').get()).exists,false);
 await assert.rejects(settleAttempt(db,'s',{attemptId:start.attemptId},new Date('2027-09-01T00:00:00Z')),/year-changed/);
});
test('server correction requires stored admin role and preserves all old scores',async()=>{
 await assert.rejects(correctClass(db,'s','s','7',now),/admin-required/);
 const before=(await db.doc('leaderboards/2026/grades/6/entries/s').get()).data();
 const result=await correctClass(db,'admin','s','7',now);
 assert.equal(result.oldScoresTransferred,false);
 assert.deepEqual((await db.doc('leaderboards/2026/grades/6/entries/s').get()).data(),before);
 assert.equal((await db.doc('leaderboards/2026/grades/7/entries/s').get()).exists,false);
 assert.equal((await db.doc('users/s').get()).data().totalScore,420);
 assert.equal((await db.doc('competitionProfiles/s').get()).data().grade,'7');
});
test('annual transaction is concurrent/idempotent, preserves cohort scores, ignores unbaselined profiles',async()=>{
 await db.doc('users/yearly').set(student('7')); await ensureCohort(db,'yearly',new Date('2026-08-31T20:59:59Z'));
 await db.doc('leaderboards/2025/grades/7/entries/yearly').set({score:321});
 const boundary=new Date('2026-08-31T21:00:00Z');
 const results=await Promise.all([promoteOne(db,'yearly',boundary),promoteOne(db,'yearly',boundary)]);
 assert.equal(results.filter(Boolean).length,1);
 assert.equal((await db.doc('users/yearly').get()).data().sinif,'8');
 assert.equal((await db.doc('leaderboards/2025/grades/7/entries/yearly').get()).data().score,321);
 assert.equal((await db.doc('leaderboards/2026/grades/8/entries/yearly').get()).exists,false);
 await db.doc('users/new').set(student('5')); await ensureCohort(db,'new',boundary);
 assert.equal(await promoteOne(db,'new',boundary),false);
 await db.doc('users/old-no-baseline').set(student('6'));
 assert.equal(await promoteOne(db,'old-no-baseline',boundary),false);
 assert.equal(await promoteOne(db,'yearly',new Date('2027-09-01T00:00:00Z')),true);
 assert.equal((await db.doc('competitionProfiles/yearly').get()).data().graduated,true);
 assert.equal((await db.doc('users/yearly').get()).data().sinif,'8');
 await assert.rejects(startAttempt(db,'yearly',{grade:'8',unit:1,startId:'graduated-score-0001'},new Date('2027-09-01T00:00:00Z')));
});

test('legacy numeric class and delete/recreate cannot bypass class lock',async()=>{
 await db.doc('users/numeric').set(student(6));
 const client=env.authenticatedContext('numeric').firestore();
 await assertFails(updateDoc(doc(client,'users/numeric'),{sinif:'8'}));
 const {deleteDoc}=await import('firebase/firestore');
 await assertFails(deleteDoc(doc(client,'users/numeric')));
});

test('staged admin approval is rules-authorized, leaves score fields intact',async()=>{
 await db.doc('users/staged').set(student('6'));
 const admin=env.authenticatedContext('admin').firestore();
 await assertSucceeds(updateDoc(doc(admin,'users/staged'),{sinif:'7',gradeCorrectionRequest:{requestedGrade:'7',status:'approved'}}));
 assert.equal((await db.doc('users/staged').get()).data().totalScore,120);
 await assertFails(updateDoc(doc(admin,'users/staged'),{sinif:'9'}));
 await assertFails(updateDoc(doc(admin,'users/staged'),{totalScore:999}));
});

test('atomic account deletion preserves deletion flow without permitting profile recreation',async()=>{
 const {writeBatch}=await import('firebase/firestore');
 await db.doc('users/deleting').set(student('5'));
 const client=env.authenticatedContext('deleting').firestore();
 const batch=writeBatch(client);batch.set(doc(client,'deletedProfiles/deleting'),{deleted:true});batch.delete(doc(client,'users/deleting'));
 await assertSucceeds(batch.commit());
 await assertFails(setDoc(doc(client,'users/deleting'),{...student('8'),totalScore:0}));
 assert.equal((await db.doc('users/deleting').get()).exists,false);
});

test('guest question reports remain writable without exposing report reads',async()=>{
 const client=env.unauthenticatedContext().firestore();
 await assertSucceeds(setDoc(doc(client,'reported_questions/guest-test'),{questionText:'Synthetic question',reportType:'test'}));
 await assertFails(getDoc(doc(client,'reported_questions/guest-test')));
});

test('service access depends on private registry, never forged claims; revocation is immediate',async()=>{
 const outsider=env.authenticatedContext('s',{scoreService:true,role:'admin'}).firestore();
 await assertFails(setDoc(doc(outsider,'internalServiceIdentities/s'),{enabled:true}));
 await assertFails(getDoc(doc(outsider,'internalServiceIdentities/service-test')));
 await assertFails(getDoc(doc(outsider,'users/admin')));
 await assertFails(getDoc(doc(env.unauthenticatedContext().firestore(),'users/s')));
 const service=env.authenticatedContext('service-test').firestore();
 await assertFails(getDoc(doc(service,'users/s')));
 await db.doc('internalServiceIdentities/service-test').set({enabled:true});
 await assertSucceeds(getDoc(doc(service,'users/s')));
 await assertFails(updateDoc(doc(service,'users/s'),{role:'admin'}));
 await assertFails(updateDoc(doc(service,'users/s'),{totalScore:10000000}));
 await assertFails(setDoc(doc(service,'unknown/document'),{anything:true}));
 await assertSucceeds(updateDoc(doc(service,'users/s'),{totalScore:421}));
 await db.doc('internalServiceIdentities/service-test').update({enabled:false});
 await assertFails(getDoc(doc(service,'users/s')));
 await assertFails(updateDoc(doc(service,'users/s'),{totalScore:422}));
});
