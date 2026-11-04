import {schoolYear} from '../functions/policy.mjs';
export async function syncCompetitionDisplay(db,actor,input){
 const uid=input?.uid||actor;if(typeof uid!=='string'||!uid||uid.length>128||uid.includes('/')||Object.keys(input||{}).some(k=>k!=='uid'))throw Error('invalid-request');
 return db.runTransaction(async tx=>{
  const [admin,user,cohort]=await Promise.all([tx.get(db.doc(`users/${actor}`)),tx.get(db.doc(`users/${uid}`)),tx.get(db.doc(`competitionProfiles/${uid}`))]);
  if(actor!==uid&&admin.data()?.role!=='admin')throw Error('admin-required');
  if(!user.exists||!['student','ogrenci','öğrenci'].includes(user.data().role))return {updated:0};
  const years=new Set([schoolYear(),cohort.data()?.schoolYear].filter(Number.isInteger));
  const refs=[...years].flatMap(year=>['5','6','7','8'].map(grade=>db.doc(`leaderboards/${year}/grades/${grade}/entries/${uid}`)));
  const entries=await Promise.all(refs.map(ref=>tx.get(ref)));let updated=0;
  entries.forEach((entry,i)=>{if(entry.exists){tx.update(refs[i],{nickname:user.data().nickname||'',avatar:user.data().avatar||'',isBanned:user.data().isBanned===true});updated++;}});
  return {updated};
 });
}
