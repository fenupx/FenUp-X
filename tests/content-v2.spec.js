import {test,expect} from '@playwright/test';
for(const revision of ['1','2.0.0','3.0.0'])test(`Eski ${revision} içerik, cevap ve rubrik kaydı korunur; yeni çalışmalar V6 kullanır`,async({page})=>{
 const base=revision==='1'?'/data/exam/':(revision==='2.0.0'?'/data/exam/content-v2/':'/data/exam/content-v3/');
 const data=await(await page.request.get(base+'pilot_7_senaryo2.json')).json();
 const v6Data=await(await page.request.get('/data/exam/content-v6/pilot_7_senaryo2.json')).json();
 const ids=data.questions.slice(0,7).map(q=>q.id);
 const criteriaMap=Object.fromEntries(ids.map(id=>[id,[{id:id+'-saved',text:'Korunan eski ölçüt',points:10,rubricRevision:revision}]]));
 await page.addInitScript(({revision,ids,criteriaMap,totalCards})=>{if(!sessionStorage.getItem('legacy-seeded')){localStorage.setItem('fenupx_cookie_consent','accepted');localStorage.setItem('fenupx_exam_pilot_v1',JSON.stringify({history:{},hasSelectedScope:true,currentStep:'practice',studyCardIdx:3,savedStudy:{cardIdx:3,totalCards,contentRevision:revision,visitedCards:['C01','C02','C03','C04'],updatedAt:100},attempt:{contentRevision:revision,rubricRevision:revision,ids,questionPoints:Object.fromEntries(ids.map((id,i)=>[id,i===0?10:15])),criteriaMap,scoringVersion:2,evaluationVersion:2,answers:{[ids[0]]:'Eski kayıt cevabı'},activeQuestionIndex:0,routeKey:'legacy-saved',updatedAt:200}}));sessionStorage.setItem('legacy-seeded','1');}}, {revision,ids,criteriaMap,totalCards:data.cards.length});
 await page.goto('/');await page.locator('#btn-yazili-modulu').click();
 await expect(page.locator('#exam-view-choice')).toBeVisible();
 await expect(page.locator('#choice-study-count')).toContainText('34 bilgi kartı');
 await expect(page.locator('#choice-saved-work-card')).toBeVisible();
 await expect(page.locator('#saved-work-version-note')).toBeVisible();
 await expect(page.locator('#saved-work-version-note')).toContainText(revision);
 await page.locator('#btn-resume-saved-work').click();
 await expect(page.locator('#practice-text-ans')).toHaveValue('Eski kayıt cevabı');
 await expect(page.locator('#practice-active-box')).toContainText(data.questions[0].stem);
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);
 expect(before.criteriaMap).toEqual(criteriaMap);expect(before.contentRevision).toBe(revision);
 await page.reload();await expect(page.locator('#practice-text-ans')).toHaveValue('Eski kayıt cevabı');
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.criteriaMap)).toEqual(criteriaMap);
 // Kayıtlı eski konu çalışmasına Devam Et ile girildiğinde eski içerik ve kart konumu korunur
 await page.locator('#btn-exam-step-back').click();
 await page.evaluate(()=>{const st=JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1'));st.savedStudy.updatedAt=Date.now()+50000;localStorage.setItem('fenupx_exam_pilot_v1',JSON.stringify(st));});
 await page.reload();
 await expect(page.locator('#choice-saved-work-card')).toBeVisible();
 await expect(page.locator('#saved-work-version-note')).toContainText(revision);
 await page.locator('#btn-resume-saved-work').click();
 await expect(page.locator('.exam-card-title')).toHaveText(data.cards[3].title);
 for(let i=0;i<data.cards.length;i++){await page.evaluate(i=>window.FenUpExam.renderStudy(i),i);await expect(page.locator('.exam-card-title')).toHaveText(data.cards[i].title);}
 // Yeni Konu Çalışmaya Başla seçildiğinde aktif V6 içeriği ve 1. kart açılır
 await page.locator('#btn-study-back-choice').click();await page.locator('#btn-choice-go-study').click();
 await expect(page.locator('.exam-card-title')).toHaveText(v6Data.cards[0].title);
 await expect(page.locator('.study-counter-topic')).toContainText('Kart 1 / 17');
 // Yeni Provaya Başla seçildiğinde aktif V6 içeriğiyle yeni set oluşturulur
 await page.locator('#btn-study-back-choice').click();await page.locator('#btn-choice-go-practice').click();await page.locator('#exam-start-practice').click();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.contentRevision)).toBe('6.0.0');
});
