import {test,expect} from '@playwright/test';
test('Görsel ağı kesilince eksik PDF indirilmez; cevap ve yeniden deneme korunur',async({page},info)=>{
 test.setTimeout(90000);
 await page.addInitScript(()=>localStorage.setItem('fenupx_cookie_consent','accepted'));
 await page.goto('/');await page.locator('#btn-yazili-modulu').click();await page.locator('#btn-scope-continue').click();await page.locator('#btn-choice-go-practice').click();await page.locator('#exam-start-practice').click();
 await expect(page.locator('#practice-text-ans')).toBeVisible();
 // Rastgele seçimin görselsiz denk gelmesi ağ testini etkilemesin.
 await page.evaluate(async()=>{
  const engine=await import(document.querySelector('script[src*="exam-engine.js"]').src);
  for(let run=0;run<100;run++){
   const questions=engine.selectQuestions('dengeli',{},run).questions;
   if(!questions.some(q=>q.visual?.asset))continue;
   const saved=JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1'));
   saved.attempt.ids=questions.map(q=>q.id);saved.attempt.questionPoints=window.FenUpExam.calculateQuestionPoints(questions);saved.attempt.criteriaMap=null;saved.attempt.activeQuestionIndex=0;
   localStorage.setItem('fenupx_exam_pilot_v1',JSON.stringify(saved));return;
  }
  throw Error('Görsel içeren geçerli test seti bulunamadı');
 });
 await page.reload();await page.locator('#practice-text-ans').fill('Ağ hatasında da korunan cevap');
 const data=await(await page.request.get('/data/exam/content-v3/pilot_7_senaryo2.json')).json();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);
 expect(before.ids.some(id=>data.questions.find(q=>q.id===id).visual)).toBe(true);
 await page.route('**/content-v3/assets/*',route=>route.abort());
 await page.reload();await page.locator('#btn-practice-preview-print').click();
 await page.evaluate(()=>{window.__printed=false;window.print=()=>{window.__printed=true;};});
 let downloaded=false;page.on('download',()=>downloaded=true);
 const warning=page.waitForEvent('dialog');page.once('dialog',d=>d.accept());await page.locator('#btn-print-preview-download-pdf').click();await warning;
 await expect(page.locator('#btn-print-preview-download-pdf')).toBeEnabled();
 expect(downloaded).toBe(false);expect(await page.evaluate(()=>window.__printed)).toBe(false);
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);
 expect(after.answers).toEqual(before.answers);expect(after.ids).toEqual(before.ids);expect(after.criteriaMap).toEqual(before.criteriaMap);
 await page.unroute('**/content-v3/assets/*');await page.reload();await page.locator('#btn-practice-preview-print').click();
 const download=page.waitForEvent('download');await page.locator('#btn-print-preview-download-pdf').click();await(await download).saveAs(`tests/artifacts/v3-network-recovered-${info.project.name}.pdf`);
});
