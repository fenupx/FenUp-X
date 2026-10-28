import {test,expect} from '@playwright/test';
test.setTimeout(180000);
const open=async page=>{await page.addInitScript(()=>localStorage.setItem('fenupx_cookie_consent','accepted'));await page.goto('/');await page.locator('#btn-yazili-modulu').click();await page.locator('#btn-scope-continue').click();};
test('v2 yapısı, 900 gerçek seçim, tüm kartlar ve görseller',async({page},info)=>{
 await open(page);
 const data=await (await page.request.get('/data/exam/content-v2/pilot_7_senaryo2.json')).json();
 expect(data.cards).toHaveLength(26);expect(data.questions).toHaveLength(48);
 const cards=new Set(data.cards.map(c=>c.id));expect(cards.size).toBe(26);
 for(const o of data.outcomes){for(const [diff,n] of [['easy',6],['medium',4],['hard',2]])expect(data.questions.filter(q=>q.outcome_id===o.id&&q.difficulty===diff)).toHaveLength(n);}
 for(const q of data.questions){for(const r of q.rubric)for(const id of r.return_card_ids)expect(cards.has(id)).toBe(true);}
 const result=await page.evaluate(async()=>{
  const engine=await import(document.querySelector('script[src*="exam-engine.js"]').src);
  const data=await (await fetch('data/exam/content-v2/pilot_7_senaryo2.json')).json();let count=0;
  for(const profile of ['temel','dengeli','zorlayici'])for(let run=0;run<300;run++){
   const set=engine.selectQuestions(profile,{},run).questions;
   if(set.length!==7)throw Error('count');
   const conf=data.selection_policy.scenario_profiles[profile];const quota=conf.cycles?conf.cycles[run%conf.cycles.length]:conf.allocation;
   for(const [oid,diffs]of Object.entries(quota))for(const [diff,n]of Object.entries(diffs))if(set.filter(q=>q.outcome_id===oid&&q.difficulty===diff).length!==n)throw Error('quota');
   for(const a of set)for(const b of set)if(a.id!==b.id&&(a.incompatible_with||[]).includes(b.id))throw Error('pair');
   const points=window.FenUpExam.calculateQuestionPoints(set);if(Object.values(points).reduce((a,b)=>a+b,0)!==100)throw Error('score');count++;
  }return count;
 });expect(result).toBe(900);
 await page.locator('#btn-choice-go-study').click();
 const measurements=[];
 for(let i=0;i<data.cards.length;i++){
  await page.evaluate(i=>window.FenUpExam.renderStudy(i),i);
  const image=page.locator('#exam-visual img');await expect(image).toBeVisible();await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  await expect(page.locator('.exam-check')).toHaveCount(0);
  const bounds=await page.locator('.study-card-content-area').evaluate(el=>({scroll:el.scrollHeight,height:el.clientHeight,width:el.clientWidth,scrollWidth:el.scrollWidth}));measurements.push({id:data.cards[i].id,...bounds});expect(bounds.scrollWidth).toBeLessThanOrEqual(bounds.width+1);
  await page.screenshot({path:`tests/artifacts/v2-${info.project.name}-card-${i}.png`,fullPage:true,scale:'css',animations:'disabled'});
 }
 console.log('CARD_MEASUREMENTS',info.project.name,JSON.stringify(measurements));
 await info.attach('card-measurements',{body:JSON.stringify(measurements),contentType:'application/json'});
 for(const asset of new Set(data.questions.filter(q=>q.visual?.asset).map(q=>q.visual.asset))){
  const response=await page.request.get('/data/exam/content-v2/'+asset);expect(response.status()).toBe(200);
  expect(await page.evaluate(src=>new Promise(resolve=>{const i=new Image();i.onload=()=>resolve(i.naturalWidth>0);i.onerror=()=>resolve(false);i.src=src;}),'data/exam/content-v2/'+asset)).toBe(true);
 }
});
test('v2 snapshot, PDF aynı set ve eski sürüm kaydı',async({page},info)=>{
 await open(page);await page.locator('#btn-choice-go-practice').click();await page.locator('#exam-start-practice').click();
 await page.locator('#practice-text-ans').fill('Korunan v2 cevap');
 const a=await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);expect(a.contentRevision).toBe('2.0.0');expect(a.rubricRevision).toBe('2.0.0');for(const criteria of Object.values(a.criteriaMap))for(const c of criteria)expect(c.rubricRevision).toBe('2.0.0');
 await page.locator('#btn-practice-preview-print').click();
 await expect(page.locator('#exam-print-sheet')).toBeVisible();
 const data=await(await page.request.get('/data/exam/content-v2/pilot_7_senaryo2.json')).json();
 const sheet=await page.locator('#exam-print-sheet').innerText();
 let previous=-1;for(const id of a.ids){const q=data.questions.find(q=>q.id===id);const pos=sheet.indexOf(q.stem);expect(pos).toBeGreaterThan(previous);previous=pos;expect(sheet).not.toContain(q.sample_answer);expect(sheet.toLowerCase()).toContain('('+a.questionPoints[id]+' puan)');}
 const download=page.waitForEvent('download');await page.locator('#btn-print-preview-download-pdf').click();const file=await download;await file.saveAs(`tests/artifacts/v2-${info.project.name}.pdf`);
 await page.reload();await expect(page.locator('#practice-text-ans')).toHaveValue('Korunan v2 cevap');
 await page.evaluate(()=>{const x=JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1'));delete x.attempt.contentRevision;delete x.attempt.rubricRevision;x.attempt.answers[x.attempt.ids[0]]='Eski cevap';localStorage.setItem('fenupx_exam_pilot_v1',JSON.stringify(x));});
 await page.reload();await expect(page.locator('#practice-text-ans')).toHaveValue('Eski cevap');
 const old=await(await page.request.get('/data/exam/pilot_7_senaryo2.json')).json();await expect(page.locator('#practice-active-box')).toContainText(old.questions.find(q=>q.id===a.ids[0]).stem);
});
test('Tüm soru görselleri gerçek PDF setlerinde ve imkansız seçim güvenli',async({page},info)=>{
 test.skip(info.project.name!=='desktop-1366','PDF görsel kapsamı masaüstü referans koşusunda');
 await open(page);await page.locator('#btn-choice-go-practice').click();await page.locator('#exam-start-practice').click();
 const targets=await page.evaluate(async()=>{
  const engine=await import(document.querySelector('script[src*="exam-engine.js"]').src);const data=await(await fetch('data/exam/content-v2/pilot_7_senaryo2.json')).json();
  return data.questions.filter(q=>q.visual?.asset).map(q=>{for(let i=0;i<2000;i++){const set=engine.selectQuestions('dengeli',{},i).questions;if(set.some(x=>x.id===q.id))return {id:q.id,ids:set.map(x=>x.id),points:window.FenUpExam.calculateQuestionPoints(set)};}throw Error(q.id);});
 });
 for(const target of targets){
  await page.evaluate(t=>{const state=JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1'));state.attempt.ids=t.ids;state.attempt.questionPoints=t.points;state.attempt.criteriaMap=null;state.attempt.answers={};state.attempt.activeQuestionIndex=0;localStorage.setItem('fenupx_exam_pilot_v1',JSON.stringify(state));},target);
  await page.reload();await page.locator('#btn-practice-preview-print').click();
  const download=page.waitForEvent('download');await page.locator('#btn-print-preview-download-pdf').click();await(await download).saveAs(`tests/artifacts/v2-visual-${target.id}.pdf`);
 }
 const before=await page.evaluate(()=>localStorage.getItem('fenupx_exam_pilot_v1'));
 await page.route('**/content-v2/pilot_7_senaryo2.json',async route=>{const data=await(await route.fetch()).json();data.questions.forEach(q=>q.incompatible_with=data.questions.filter(b=>b.id!==q.id).map(b=>b.id));await route.fulfill({json:data});});
 await page.reload();await expect(page.locator('#practice-text-ans')).toBeVisible();await page.locator('#btn-exam-step-back').click();await page.locator('#btn-choice-go-practice').click();
 const preserved=await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);
 const warning=page.waitForEvent('dialog');page.once('dialog',d=>d.accept());await page.locator('#exam-start-practice').click();await warning;
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt)).toEqual(preserved);
 await expect(page.locator('#practice-setup-box')).toBeVisible();
});
test('Yatay telefon ve büyütülmüş metinde erişilebilir kart gezinmesi',async({page},info)=>{
 test.skip(info.project.name!=='mobile-safari-iphone-390','Yatay WebKit referans koşusu');
 await page.setViewportSize({width:844,height:430});await open(page);await page.locator('#btn-choice-go-study').click();
 const sizes=[];
 for(let i=0;i<26;i++){
  await page.evaluate(i=>window.FenUpExam.renderStudy(i),i);
  sizes.push(await page.locator('.study-card-content-area').evaluate(el=>({id:document.querySelector('.study-counter-topic')?.textContent,scroll:el.scrollHeight,height:el.clientHeight})));
 }
 console.log('LANDSCAPE',JSON.stringify(sizes));
 await page.screenshot({path:'tests/artifacts/v2-landscape.png',scale:'css',fullPage:true});
 await page.evaluate(()=>document.documentElement.style.fontSize='20px');
 await page.evaluate(()=>window.FenUpExam.renderStudy(0));
 await page.locator('#exam-card-next').click();await expect(page.locator('.study-counter-topic')).toContainText('Kart 2');
});
