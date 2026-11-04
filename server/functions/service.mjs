import { schoolYear, validGrade, promote, requireCompetition, periodIds } from './policy.mjs';
const student = u => ['student','ogrenci','öğrenci'].includes(u?.role);
const profileRef = (db, uid) => db.doc(`competitionProfiles/${uid}`);
export async function ensureCohort(db, uid, now = new Date()) {
    return db.runTransaction(async tx => {
        const ur=db.doc(`users/${uid}`), cr=profileRef(db,uid);
        const [us,cs]=await Promise.all([tx.get(ur),tx.get(cr)]);
        const u=us.data(); if (!us.exists || !student(u) || !validGrade(String(u.sinif))) throw Error('class-required');
        if (cs.exists) return cs.data();
        const cohort={grade:String(u.sinif),schoolYear:schoolYear(now),graduated:false,initializedAt:now};
        tx.create(cr,cohort); return cohort;
    });
}
export async function correctClass(db, actor, uid, grade, now = new Date()) {
    if (!validGrade(grade)) throw Error('invalid-grade');
    return db.runTransaction(async tx => {
        const ur=db.doc(`users/${uid}`), cr=profileRef(db,uid), ar=db.doc(`users/${actor}`);
        const [as,us,cs]=await Promise.all([tx.get(ar),tx.get(ur),tx.get(cr)]);
        if (as.data()?.role !== 'admin') throw Error('admin-required');
        if (!us.exists || !student(us.data())) throw Error('student-required');
        const year=schoolYear(now);
        if (cs.data()?.graduated) throw Error('graduated-account');
        if (cs.exists && cs.data().schoolYear > year) throw Error('future-cohort');
        tx.update(ur,{sinif:grade,gradeCorrectionRequest:{requestedGrade:grade,status:'approved'}});
        tx.set(cr,{grade,schoolYear:year,graduated:false,correctedAt:now},{merge:true});
        tx.create(db.collection('competitionAudit').doc(),{actor,uid,action:'class-correction',previousGrade:cs.data()?.grade || us.data().sinif || '',grade,schoolYear:year,at:now});
        return {grade,schoolYear:year,oldScoresTransferred:false};
    });
}
export async function promoteOne(db, uid, now = new Date()) {
    const year=schoolYear(now);
    return db.runTransaction(async tx => {
        const cr=profileRef(db,uid), ur=db.doc(`users/${uid}`);
        const [cs,us]=await Promise.all([tx.get(cr),tx.get(ur)]);
        if (!cs.exists || !us.exists || !student(us.data())) return false;
        const next=promote(cs.data(),year); if (!next) return false;
        tx.update(cr,{...next,promotedAt:now});
        // Keep the last valid class on graduated profiles; no grade 9.
        tx.update(ur,{sinif:next.grade,middleSchoolGraduated:next.graduated});
        tx.create(db.collection('competitionAudit').doc(),{uid,action:'annual-promotion',from:cs.data(),to:next,at:now});
        return true;
    });
}
export async function submitScore(db, uid, input, now = new Date()) {
    const {grade,unit,score,submissionId}=input || {};
    if (!validGrade(grade) || !Number.isInteger(unit) || unit < 1 || unit > 10 || !Number.isInteger(score) || score < 0 || score > 4400 || !/^[a-zA-Z0-9-]{16,80}$/.test(submissionId || '')) throw Error('invalid-result');
    const year=schoolYear(now);
    return db.runTransaction(async tx => {
        const ur=db.doc(`users/${uid}`), cr=profileRef(db,uid);
        const receipt=db.doc(`competitionProfiles/${uid}/receipts/${submissionId}`);
        const er=db.doc(`leaderboards/${year}/grades/${grade}/entries/${uid}`);
        const [us,cs,rs,es]=await Promise.all([tx.get(ur),tx.get(cr),tx.get(receipt),tx.get(er)]);
        if (!us.exists || !cs.exists) throw Error('class-required');
        requireCompetition(cs.data(),us.data(),grade,year);
        if(rs.exists) return {accepted:true,delta:0,duplicate:true};
        const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Istanbul',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
        const tracker=es.data()?.daily || {date:day,units:{}};
        const daily=tracker.date===day ? tracker : {date:day,units:{}};
        const scores=[...(daily.units[unit] || []),score].sort((a,b)=>b-a).slice(0,3);
        const old=(daily.units[unit] || []).reduce((a,b)=>a+b,0);
        const delta=scores.reduce((a,b)=>a+b,0)-old;
        daily.units[unit]=scores;
        const {weekId,monthId}=periodIds(now);
        const previous=es.data() || {};
        tx.set(er,{weeklyScore:(previous.weekId===weekId ? previous.weeklyScore || 0 : 0)+delta,monthlyScore:(previous.monthId===monthId ? previous.monthlyScore || 0 : 0)+delta,weekId,monthId,isBanned:false,uid,grade,schoolYear:year,nickname:us.data().nickname || '',avatar:us.data().avatar || '',score:(es.data()?.score || 0)+delta,daily,updatedAt:now},{merge:true});
        tx.create(receipt,{grade,schoolYear:year,unit,score,delta,at:now});
        return {accepted:true,delta,grade,schoolYear:year};
    });
}
