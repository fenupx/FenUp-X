// One bounded cleanup page for the caller's own competition records. The client
// deletes its Firebase Auth identity only after all pages have been acknowledged.
import {schoolYear} from '../functions/policy.mjs';
export async function deleteCompetitionData(db,uid){
 const cohort=db.doc(`competitionProfiles/${uid}`);
 const profile=await db.runTransaction(async tx=>{
  const snap=await tx.get(cohort);if(!snap.exists)return null;
  tx.update(cohort,{deleting:true});return snap.data();
 });
 const writes=[];let more=false;
 for(const kind of ['attempts','receipts','limits']){
  const page=await db.api(`${db.database}/documents/competitionProfiles/${uid}/${kind}?pageSize=100`,'GET');
  for(const document of page.documents||[])writes.push({delete:document.name});
  if(page.nextPageToken)more=true;
 }
 // Every score produced by the deployed free service belongs to the canonical
 // cohort year; corrections can produce entries in several grades in that year.
 const years=new Set([schoolYear(),profile?.schoolYear].filter(Number.isInteger));
 for(const year of years)for(const grade of ['5','6','7','8'])writes.push({delete:db.doc(`leaderboards/${year}/grades/${grade}/entries/${uid}`).name});
 if(writes.length)await db.api(`${db.database}/documents:commit`,'POST',{writes});
 // Keep a private non-PII cohort tombstone so a concurrent start cannot recreate
 // attempts between cleanup and the client's atomic user-profile deletion.
 return {done:!more};
}
