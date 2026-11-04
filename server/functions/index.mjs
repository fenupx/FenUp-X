import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import { startAttempt, actOnAttempt } from './attempts.mjs';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { ensureCohort, correctClass, promoteOne, settleAttempt } from './service.mjs';
setGlobalOptions({region:'europe-west1',minInstances:0,maxInstances:2,memory:'256MiB',cpu:1,concurrency:40,timeoutSeconds:30});
initializeApp(); const db=getFirestore();
const uid = request => { if (!request.auth) throw new HttpsError('unauthenticated','Giriş yapmalısın.'); return request.auth.uid; };
const handler = fn => async request => { try { return await fn(request); } catch(e) { if(e instanceof HttpsError) throw e; console.error('Competition operation rejected:',e.message); throw new HttpsError('failed-precondition','İşlem sunucu tarafından kabul edilmedi.'); } };
export const initializeCompetition = onCall({region:'europe-west1'},handler(r=>ensureCohort(db,uid(r))));
export const correctStudentClass = onCall({region:'europe-west1'},handler(r=>correctClass(db,uid(r),r.data.uid,r.data.grade)));
const verified = r => {
    const id=uid(r);
    if (!r.auth.token.email_verified && r.auth.token.firebase?.sign_in_provider !== 'google.com') throw new HttpsError('permission-denied','E-posta doğrulaması gerekli.');
    return id;
};
export const competitionAction = onCall(handler(async r=>{
    const id=verified(r),data=r.data || {};
    let result;
    if(data.action==='start') {
        if(Object.keys(data).some(k=>!['action','grade','unit','startId'].includes(k)))throw Error('unexpected-input');
        await ensureCohort(db,id);await promoteOne(db,id);
        result=await startAttempt(db,id,data);
    } else result=await actOnAttempt(db,id,data);
    if(result.done) result.settlement=await settleAttempt(db,id,{attemptId:result.attemptId});
    return result;
}));
export const submitCompetitionResult = onCall(handler(r=>settleAttempt(db,verified(r),r.data)));
export const annualSchoolPromotion = onSchedule({schedule:'0 0 1 9 *',timeZone:'Europe/Istanbul',region:'europe-west1'},async()=>{
    // Stable document-ID pagination; transaction per account is atomic and retry safe.
    let cursor;
    for (;;) {
        let q=db.collection('competitionProfiles').orderBy('__name__').limit(200);
        if (cursor) q=q.startAfter(cursor);
        const page=await q.get(); if(page.empty) break;
        for (const item of page.docs) await promoteOne(db,item.id);
        cursor=page.docs.at(-1);
    }
});

export const deleteCompetitionAccount = onCall({region:'europe-west1'},handler(async r=>{
    const id=uid(r);
    if (!r.auth.token.auth_time || Date.now()/1000-r.auth.token.auth_time > 300) throw new HttpsError('failed-precondition','Hesabını silmek için yeniden giriş yap.');
    const { getAuth } = await import('firebase-admin/auth');
    // Revoke the credential first. A partially completed cleanup can be retried by
    // an operator; never leave a reusable identity able to recreate a class profile.
    await getAuth().deleteUser(id);
    await db.recursiveDelete(db.doc(`competitionProfiles/${id}`));
    const entries=await db.collectionGroup('entries').where('uid','==',id).get();
    const writer=db.bulkWriter();for (const entry of entries.docs) writer.delete(entry.ref);await writer.close();
    await db.doc(`users/${id}`).delete();
    return {deleted:true};
}));

// Keep public ranking identity and moderation in sync without moving scores.
import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
export const syncCompetitionDisplay = onDocumentUpdated({document:'users/{uid}',region:'europe-west1'},async event=>{
    const before=event.data.before.data(),after=event.data.after.data();
    if (before.nickname===after.nickname && before.avatar===after.avatar && before.isBanned===after.isBanned) return;
    const entries=await db.collectionGroup('entries').where('uid','==',event.params.uid).get();
    const writer=db.bulkWriter();
    for (const entry of entries.docs) writer.update(entry.ref,{nickname:after.nickname || '',avatar:after.avatar || '',isBanned:after.isBanned === true});
    await writer.close();
});
