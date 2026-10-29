import {test,expect} from '@playwright/test';
for(const revision of ['1','2.0.0'])test(`Eski ${revision} içerik, cevap ve rubrik kaydı korunur`,async({page})=>{
 const base=revision==='1'?'/data/exam/':'/data/exam/content-v2/';
 const data=await(await page.request.get(base+'pilot_7_senaryo2.json')).json();
 const ids=data.questions.slice(0,7).map(q=>q.id);
 const criteriaMap=Object.fromEntries(ids.map(id=>[id,[{id:id+'-saved',text:'Korunan eski ölçüt',points:10,rubricRevision:revision}]]));
 await page.addInitScript(({revision,ids,criteriaMap})=>{if(!sessionStorage.getItem('legacy-seeded')){localStorage.setItem('fenupx_cookie_consent','accepted');localStorage.setItem('fenupx_exam_pilot_v1',JSON.stringify({history:{},hasSelectedScope:true,currentStep:'practice',attempt:{contentRevision:revision,rubricRevision:revision,ids,questionPoints:Object.fromEntries(ids.map((id,i)=>[id,i===0?10:15])),criteriaMap,scoringVersion:2,evaluationVersion:2,answers:{[ids[0]]:'Eski kayıt cevabı'},activeQuestionIndex:0,routeKey:'legacy-saved'}}));sessionStorage.setItem('legacy-seeded','1');}}, {revision,ids,criteriaMap});
 await page.goto('/');await page.locator('#btn-yazili-modulu').click();await page.locator('#btn-resume-saved-attempt').click();
 await expect(page.locator('#practice-text-ans')).toHaveValue('Eski kayıt cevabı');
 await expect(page.locator('#practice-active-box')).toContainText(data.questions[0].stem);
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);
 expect(before.criteriaMap).toEqual(criteriaMap);expect(before.contentRevision).toBe(revision);
 await page.reload();await expect(page.locator('#practice-text-ans')).toHaveValue('Eski kayıt cevabı');
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.criteriaMap)).toEqual(criteriaMap);
 await page.locator('#btn-exam-step-back').click();await page.locator('#btn-choice-go-study').click();
 for(let i=0;i<data.cards.length;i++){await page.evaluate(i=>window.FenUpExam.renderStudy(i),i);await expect(page.locator('.exam-card-title')).toHaveText(data.cards[i].title);}
 await page.locator('#btn-exam-step-back').click();await page.locator('#btn-choice-go-practice').click();await page.locator('#exam-start-practice').click();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.contentRevision)).toBe('3.0.0');
});
