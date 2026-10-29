import {test,expect} from '@playwright/test';
test.setTimeout(180000);
const open=async page=>{await page.addInitScript(()=>localStorage.setItem('fenupx_cookie_consent','accepted'));await page.goto('/');await page.locator('#btn-yazili-modulu').click();await page.locator('#btn-scope-continue').click();};
test('v3 yapısı, 900 gerçek seçim, tüm kartlar ve görseller',async({page},info)=>{
 await open(page);
 const data=await (await page.request.get('/data/exam/content-v3/pilot_7_senaryo2.json')).json();
 expect(data.cards).toHaveLength(24);expect(data.questions).toHaveLength(48);
 const cards=new Set(data.cards.map(c=>c.id));expect(cards.size).toBe(24);
 for(const o of data.outcomes){for(const [diff,n] of [['easy',6],['medium',4],['hard',2]])expect(data.questions.filter(q=>q.outcome_id===o.id&&q.difficulty===diff)).toHaveLength(n);}
 for(const q of data.questions){for(const r of q.rubric)for(const id of r.return_card_ids)expect(cards.has(id)).toBe(true);}
 const result=await page.evaluate(async()=>{
  const engine=await import(document.querySelector('script[src*="exam-engine.js"]').src);
  const data=await (await fetch('data/exam/content-v3/pilot_7_senaryo2.json')).json();let count=0;
  for(const profile of ['temel','dengeli','zorlayici'])for(let run=0;run<300;run++){
   const set=engine.selectQuestions(profile,{},run).questions;
   if(set.length!==7||new Set(set.map(q=>q.family_id)).size!==7)throw Error('count/family');for(const q of set){const p=window.FenUpExam.calculateQuestionPoints(set)[q.id];const criteria=window.FenUpExam.distributeCriteriaPoints(q.rubric,p);if(criteria.some(c=>!Number.isInteger(c.points))||criteria.reduce((s,c)=>s+c.points,0)!==p)throw Error('criteria');}
   const conf=data.selection_policy.scenario_profiles[profile];const quota=conf.cycles?conf.cycles[run%conf.cycles.length]:conf.allocation;
   for(const [oid,diffs]of Object.entries(quota))for(const [diff,n]of Object.entries(diffs))if(set.filter(q=>q.outcome_id===oid&&q.difficulty===diff).length!==n)throw Error('quota');
   for(const a of set)for(const b of set)if(a.id!==b.id&&(a.incompatible_with||[]).includes(b.id))throw Error('pair');
   const points=window.FenUpExam.calculateQuestionPoints(set);if(Object.values(points).reduce((a,b)=>a+b,0)!==100)throw Error('score');count++;
  }return count;
 });expect(result).toBe(900);
 await page.locator('#btn-choice-go-study').click();await page.addStyleTag({content:'.exam-cards-layout{transition:none!important}'});
 const measurements=[];
 for(let i=0;i<data.cards.length;i++){
  await page.evaluate(i=>window.FenUpExam.renderStudy(i),i);
  const image=page.locator('#exam-visual img');if(data.cards[i].visual){await expect(image).toBeVisible();await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);}else{await expect(image).toHaveCount(0);if(data.cards[i].table)await expect(page.locator('#exam-visual table')).toContainText(data.cards[i].table.caption);}
  await expect(page.locator('.exam-check')).toHaveCount(0);
  const bounds=await page.locator('.study-card-content-area').evaluate(el=>({scroll:el.scrollHeight,height:el.clientHeight,width:el.clientWidth,scrollWidth:el.scrollWidth}));measurements.push({id:data.cards[i].id,...bounds});expect(bounds.scrollWidth).toBeLessThanOrEqual(bounds.width+1);
  for(const planOpen of [false,true]){await page.evaluate(open=>{const layout=document.querySelector('.exam-cards-layout');if(layout.classList.contains('plan-collapsed')===open)window.FenUpExam.toggleStudyPlan();},planOpen);const m=await page.locator('.study-card-content-area').evaluate(el=>({scroll:el.scrollHeight,height:el.clientHeight,width:el.clientWidth,scrollWidth:el.scrollWidth}));expect(m.scrollWidth).toBeLessThanOrEqual(m.width+1);if(['desktop-1366','desktop-1440','etap-board-1920'].includes(info.project.name)){expect(m.scroll).toBeLessThanOrEqual(m.height+1);const next=await page.locator('#exam-card-next').boundingBox();expect(next.y+next.height).toBeLessThanOrEqual(page.viewportSize().height+1);}measurements.push({id:data.cards[i].id,planOpen,...m});if([0,6,13,17,23].includes(i))await page.screenshot({path:`tests/artifacts/v3-${info.project.name}-plan-${planOpen}-card-${i}.png`,fullPage:true,scale:'css',animations:'disabled'});}
 }
 await page.locator('#btn-study-fullscreen').click();await expect(page.locator('#exam-view-study')).toHaveClass(/fullscreen-study-active/);for(const planOpen of [false,true])for(let i=0;i<data.cards.length;i++){await page.evaluate(open=>{if(document.querySelector('.exam-cards-layout').classList.contains('plan-collapsed')===open)window.FenUpExam.toggleStudyPlan();},planOpen);await page.evaluate(i=>window.FenUpExam.renderStudy(i),i);const w=await page.locator('.study-card-content-area').evaluate(el=>({w:el.clientWidth,sw:el.scrollWidth}));expect(w.sw).toBeLessThanOrEqual(w.w+1);}await page.evaluate(()=>window.FenUpExam.exitStudyFullscreen());
 console.log('CARD_MEASUREMENTS',info.project.name,JSON.stringify(measurements));
 await info.attach('card-measurements',{body:JSON.stringify(measurements),contentType:'application/json'});
 for(const asset of new Set(data.questions.filter(q=>q.visual?.asset).map(q=>q.visual.asset))){
  const response=await page.request.get('/data/exam/content-v3/'+asset);expect(response.status()).toBe(200);
  expect(await page.evaluate(src=>new Promise(resolve=>{const i=new Image();i.onload=()=>resolve(i.naturalWidth>0);i.onerror=()=>resolve(false);i.src=src;}),'data/exam/content-v3/'+asset)).toBe(true);
 }
});
test('v3 snapshot, PDF aynı set ve kayıtlı cevap',async({page},info)=>{
 await open(page);await page.locator('#btn-choice-go-practice').click();await page.locator('#exam-start-practice').click();
 await page.locator('#practice-text-ans').fill('Korunan v3 cevap');
 const a=await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);expect(a.contentRevision).toBe('3.0.0');expect(a.rubricRevision).toBe('3.0.0');for(const criteria of Object.values(a.criteriaMap))for(const c of criteria)expect(c.rubricRevision).toBe('3.0.0');
 await page.locator('#btn-practice-preview-print').click();
 await expect(page.locator('#exam-print-sheet')).toBeVisible();
 const data=await(await page.request.get('/data/exam/content-v3/pilot_7_senaryo2.json')).json();
 const sheet=await page.locator('#exam-print-sheet').innerText();
 let previous=-1;for(const id of a.ids){const q=data.questions.find(q=>q.id===id);const pos=sheet.indexOf(q.stem);expect(pos).toBeGreaterThan(previous);previous=pos;expect(sheet).not.toContain(q.sample_answer);expect(sheet.toLowerCase()).toContain('('+a.questionPoints[id]+' puan)');}
 const download=page.waitForEvent('download');await page.locator('#btn-print-preview-download-pdf').click();const file=await download;await file.saveAs(`tests/artifacts/v3-${info.project.name}.pdf`);
 await page.reload();await expect(page.locator('#practice-text-ans')).toHaveValue('Korunan v3 cevap');

});
test('Tüm soru görselleri gerçek PDF setlerinde ve imkansız seçim güvenli',async({page},info)=>{
 test.skip(info.project.name!=='desktop-1366','PDF görsel kapsamı masaüstü referans koşusunda');
 await open(page);await page.locator('#btn-choice-go-practice').click();await page.locator('#exam-start-practice').click();
 const targets=await page.evaluate(async()=>{
  const engine=await import(document.querySelector('script[src*="exam-engine.js"]').src);const data=await(await fetch('data/exam/content-v3/pilot_7_senaryo2.json')).json();
  return data.questions.filter(q=>q.visual?.asset).map(q=>{for(let i=0;i<2000;i++){const set=engine.selectQuestions('dengeli',{},i).questions;if(set.some(x=>x.id===q.id))return {id:q.id,ids:set.map(x=>x.id),points:window.FenUpExam.calculateQuestionPoints(set)};}throw Error(q.id);});
 });
 for(const target of targets){
  await page.evaluate(t=>{const state=JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1'));state.attempt.ids=t.ids;state.attempt.questionPoints=t.points;state.attempt.criteriaMap=null;state.attempt.answers={};state.attempt.activeQuestionIndex=0;localStorage.setItem('fenupx_exam_pilot_v1',JSON.stringify(state));},target);
  await page.reload();await page.locator('#btn-practice-preview-print').click();
  const download=page.waitForEvent('download');await page.locator('#btn-print-preview-download-pdf').click();await(await download).saveAs(`tests/artifacts/v3-visual-${target.id}.pdf`);
 }
 const before=await page.evaluate(()=>localStorage.getItem('fenupx_exam_pilot_v1'));
 await page.route('**/content-v3/pilot_7_senaryo2.json',async route=>{const data=await(await route.fetch()).json();data.questions.forEach(q=>q.incompatible_with=data.questions.filter(b=>b.id!==q.id).map(b=>b.id));await route.fulfill({json:data});});
 await page.reload();await expect(page.locator('#practice-text-ans')).toBeVisible();await page.locator('#btn-exam-step-back').click();await page.locator('#btn-choice-go-practice').click();
 const preserved=await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);
 const warning=page.waitForEvent('dialog');page.once('dialog',d=>d.accept());await page.locator('#exam-start-practice').click();await warning;
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt)).toEqual(preserved);
 await expect(page.locator('#practice-setup-box')).toBeVisible();
});
test('Yatay telefon ve büyütülmüş metinde erişilebilir kart gezinmesi',async({page},info)=>{
 test.skip(!['mobile-safari-iphone-390','mobile-chrome-android'].includes(info.project.name),'Yatay Chromium/WebKit referans koşusu');
 await page.setViewportSize({width:844,height:430});await open(page);await page.locator('#btn-choice-go-study').click();await page.addStyleTag({content:'.exam-cards-layout{transition:none!important}'});
 const sizes=[];
 for(const width of [844,932])for(const planOpen of [false,true])for(let i=0;i<24;i++){
  await page.setViewportSize({width,height:430});
  await page.evaluate(open=>{if(document.querySelector('.exam-cards-layout').classList.contains('plan-collapsed')===open)window.FenUpExam.toggleStudyPlan();},planOpen);
  await page.evaluate(i=>window.FenUpExam.renderStudy(i),i);
  const image=page.locator('#exam-visual img');if(await image.count())await expect.poll(()=>image.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  if([0,6,18].includes(i))await page.screenshot({path:`tests/artifacts/v3-landscape-${info.project.name}-${width}-${planOpen}-${i}.png`,scale:'css'});
  sizes.push(await page.locator('.study-card-content-area').evaluate(el=>({viewport:innerWidth,planOpen:!document.querySelector('.exam-cards-layout').classList.contains('plan-collapsed'),id:document.querySelector('.exam-card-title')?.textContent,scroll:el.scrollHeight,height:el.clientHeight})));
 }
 console.log('LANDSCAPE',JSON.stringify(sizes));
 await page.screenshot({path:'tests/artifacts/v3-landscape.png',scale:'css',fullPage:true});
 await page.evaluate(()=>document.documentElement.style.fontSize='20px');
 await page.evaluate(()=>window.FenUpExam.renderStudy(0));
 await page.locator('#exam-card-next').click();await expect(page.locator('.study-counter-topic')).toContainText('Kart 2');
});
