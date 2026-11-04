import { test, expect } from '@playwright/test';
import fs from 'node:fs';
test.setTimeout(120000);

test.beforeEach(async ({page}) => {
    page.on('dialog', d => d.accept());
    await page.addInitScript(() => localStorage.setItem('fenupx_cookie_consent','accepted'));
    await page.goto('/');
    await page.waitForFunction(() => window.FenUpExam && window.FenUpLab);
});
const choice = async page => {await page.locator('#btn-yazili-modulu').click(); await page.locator('#btn-scope-continue').click();};

test('five scenarios x three profiles: displayed quota equals selected questions, outcome quotas and 100 points', async ({page}) => {
    await choice(page);
    for (const scenario of [1,2,3,4,5]) {
        await page.evaluate(sc => window.FenUpExam.setScenario(sc),scenario);
        await page.evaluate(() => window.FenUpExam.goToStep('practice'));
        for (const profile of ['temel','dengeli','zorlayici']) {
            await page.locator(`[data-exam-profile="${profile}"]`).click();
            const totals = await page.evaluate(({profile}) => {
                const e=window.FenUpExam, sc=e.getActiveScenario();
                const expected=e.getProfileTotals(sc,profile,0);
                for(let run=0;run<6;run++) {
                    const chosen=e.selectQuestions(profile,{},run).questions;
                    const actual={easy:0,medium:0,hard:0}; chosen.forEach(q=>actual[q.difficulty]++);
                    if(JSON.stringify(actual)!==JSON.stringify(e.getProfileTotals(sc,profile,run))) throw Error('difficulty mismatch');
                    for(const a of sc.allocation) if(chosen.filter(q=>q.outcome_id===a.outcome_id).length!==a.count) throw Error('outcome mismatch');
                    if(Object.values(e.calculateQuestionPoints(chosen,100)).reduce((a,b)=>a+b,0)!==100) throw Error('point mismatch');
                }
                return expected;
            },{profile});
            await expect(page.locator(`[data-exam-profile="${profile}"] small`)).toHaveText(`${totals.easy} kolay · ${totals.medium} orta · ${totals.hard} zor`);
            await expect(page.locator('#exam-selected-profile-badge')).toContainText(`${totals.easy} kolay · ${totals.medium} orta · ${totals.hard} zor`);
        }
    }
});

test('study fullscreen fallback is viewport anchored, plan toggle and Escape restore root', async ({page}) => {
    await choice(page); await page.locator('#btn-choice-go-study').click();
    await page.evaluate(() => {const el=document.getElementById('exam-view-study'); el.requestFullscreen=undefined; el.webkitRequestFullscreen=undefined;});
    await page.locator('#btn-study-fullscreen').click();
    for(const open of [true,false,true]) {
        await page.evaluate(open=>{const s=window.FenUpExam.getState();s.studyPlanOpen=open;window.FenUpExam.applyStudyPlanState();},open);
        const view=await page.locator('#exam-view-study').boundingBox();
        expect(Math.abs(view.x)).toBeLessThan(1); expect(Math.abs(view.y)).toBeLessThan(1);
        const size=page.viewportSize(); expect(view.width).toBeLessThanOrEqual(size.width);expect(view.height).toBeLessThanOrEqual(size.height);
        for(const id of ['#btn-study-fullscreen','.exam-next-bar button:last-child']) {
            const target=page.locator('#exam-view-study').locator(id).first();
            const box=await target.boundingBox();expect(box.y+box.height).toBeLessThanOrEqual(size.height+1);
            await target.click({trial:true});
        }
    }
    await page.keyboard.press('Escape');
    await expect(page.locator('#exam-view-study')).not.toHaveClass(/fullscreen-study-active/);
    expect(await page.locator('#exam-view-study').evaluate(el=>!!el.closest('#scene-yazili'))).toBe(true);
});

test('experiment exit cleans dual variables across modes and all thirty workspaces', async ({page}) => {
    await page.locator('#btn-deney-modulu').click();
    for(const mode of ['force','dist']) {
        await page.evaluate(mode=>{window.FenUpLab.openExperimentWorkspace('7.1');window.FenUpLab.setWorkMode(mode);},mode);
        await expect(page.locator('#dual-work-variables-bar')).toBeVisible();
        await page.locator('#btn-lab-back-catalog').click();
        const ids=await page.evaluate(()=>window.FenUpLab.EXPERIMENTS_DATABASE.map(e=>e.id));
        expect(ids).toHaveLength(30);
        for(const id of ids.filter(id=>id!=='7.1')) {
            await page.evaluate(id=>window.FenUpLab.openExperimentWorkspace(id),id);
            await expect(page.locator('#dual-work-variables-bar')).toBeHidden();
            await expect(page.locator('#lab-workspace-view')).toBeVisible();
            await page.evaluate(()=>window.FenUpLab.closeExperimentWorkspace());
        }
    }
});

test('badge threshold 0/5/84/85/100 requires completed evaluation and awards once', async ({page}) => {
    await choice(page); await page.locator('#btn-choice-go-practice').click(); await page.locator('#exam-start-practice').click();
    for(const completed of [false,true]) for(const score of [0,5,84,85,100]) {
        const result=await page.evaluate(({completed,score})=>{
            const e=window.FenUpExam,a=e.getState().attempt;
            localStorage.removeItem('fenupx_badges');localStorage.removeItem('fenupx_last_exam_summary');
            const items=a.ids.flatMap(id=>a.criteriaMap[id].map(c=>({id,c})));
            const sums=new Map([[0,[]]]);
            for(const item of items) for(const [sum,path] of [...sums]) {const next=sum+item.c.points;if(next<=score&&!sums.has(next))sums.set(next,[...path,item]);}
            if(!sums.has(score)) throw Error('threshold cannot be formed');
            a.selectedCriteria={};a.evaluatedQuestions={};
            for(const id of a.ids) {a.selectedCriteria[id]=[];a.evaluatedQuestions[id]=completed;}
            for(const item of sums.get(score))a.selectedCriteria[item.id].push(item.c.id);
            a.finished=completed;a.status=completed?'completed':'in_progress';
            e.goToStep('summary');
            return {score:a.score,earned:window.getEarnedBadges()};
        },{completed,score});
        expect(result.score).toBe(score);
        expect(result.earned.includes('badge_bilim_ustasi')).toBe(completed&&score>=85);
        await page.evaluate(()=>window.FenUpExam.goToStep('summary'));
        const earned=await page.evaluate(()=>window.getEarnedBadges());
        expect(earned.filter(id=>id==='badge_bilim_ustasi').length).toBe(completed&&score>=85?1:0);
    }
});

test('new content patch preserves old revision and updates stem, answer and analytic criteria together', async ({page}) => {
    await choice(page);
    const patched=await page.evaluate(()=>window.FenUpExam.getAllQuestions().filter(q=>['FB714-V7-H01','FB722-V7-E05'].includes(q.id)));
    expect(patched).toHaveLength(2);
    expect(patched.find(q=>q.id==='FB722-V7-E05').stem).not.toContain('Joule / J');
    expect(patched.find(q=>q.id==='FB722-V7-E05').sample_answer).toContain('joule');
    const star=patched.find(q=>q.id==='FB714-V7-H01');expect(star.stem).not.toContain('hacimsel');
    expect(star.rubric.reduce((sum,c)=>sum+c.points,0)).toBe(20);
    const old=JSON.parse(fs.readFileSync('data/exam/content-v6/ek_icerik.json','utf8'));
    expect(JSON.stringify(old)).toContain('Joule / J');
    const all=await page.evaluate(()=>window.FenUpExam.getAllQuestions().length);expect(all).toBe(78);
});

test('Gravzant temperatures, size and labels share physical state and reset', async ({page}) => {
    await page.locator('#btn-deney-modulu').click();
    await page.evaluate(()=>window.FenUpLab.openExperimentWorkspace('6.8'));
    await expect(page.locator('#quick-controls-6-8')).toBeHidden();
    await page.locator('#pill-grav-pass-cold').click();
    await page.locator('#pill-grav-heat').click();
    await page.waitForFunction(()=>window.FenUpLab.labState.expansion.sphereTemp>=180);
    await page.locator('#pill-grav-pass-hot').click();
    await expect(page.locator('#mbar-68-state')).toHaveText('Sıcak');
    await expect(page.locator('#mbar-68-volume')).toContainText('Genleşmiş');
    await page.locator('#pill-grav-quench').click();
    await page.waitForFunction(()=>window.FenUpLab.labState.expansion.sphereTemp<=80);
    await page.locator('#pill-grav-pass-quenched').click();
    const t=await page.evaluate(()=>window.FenUpLab.labState.expansion.sphereTemp);
    if(t>25) await expect(page.locator('#mbar-68-state')).not.toHaveText('Oda Sıcaklığı');
    await page.evaluate(()=>window.FenUpLab.resetCurrentExperiment());
    await expect(page.locator('#mbar-68-temp')).toHaveText('20°C');
    await expect(page.locator('#mbar-68-state')).toHaveText('Oda Sıcaklığı');
    await page.evaluate(()=>window.FenUpLab.openExperimentWorkspace('6.9'));
    await expect(page.locator('#quick-controls-6-9')).toBeHidden();
    await expect(page.locator('#pill-cond-switch')).toBeVisible();
});

test('supported old attempt survives reload with unchanged rubric and question text', async ({page}) => {
    await choice(page);await page.evaluate(()=>window.FenUpExam.setScenario(1));
    await page.locator('#btn-choice-go-practice').click();await page.locator('#exam-start-practice').click();
    const original=await page.evaluate(()=>{
        const e=window.FenUpExam,s=e.getState();s.attempt.contentRevision='6.0.0';s.attempt.rubricRevision='6.0.0';
        const first=s.attempt.ids[0];document.getElementById('practice-text-ans').value='Korunacak test cevabı';s.attempt.answers[first]='Korunacak test cevabı';
        e.saveProgress();return {ids:s.attempt.ids,criteria:s.attempt.criteriaMap};
    });
    await page.reload();await page.waitForFunction(()=>window.FenUpExam?.getState().attempt);
    const restored=await page.evaluate(()=>{const a=window.FenUpExam.getState().attempt;return {ids:a.ids,criteria:a.criteriaMap,revision:a.contentRevision,answer:a.answers[a.ids[0]]};});
    expect(restored.ids).toEqual(original.ids);expect(restored.criteria).toEqual(original.criteria);
    expect(restored.revision).toBe('6.0.0');expect(restored.answer).toBe('Korunacak test cevabı');
    await page.evaluate(()=>window.FenUpExam.goToStep('practice'));
    await page.waitForFunction(()=>window.FenUpExam.getAllQuestions().find(q=>q.id==='FB722-V7-E05')?.stem.includes('Joule / J'));
});

test('native fullscreen tracks browser exit and restores study hierarchy', async ({page,browserName}) => {
    await choice(page);await page.locator('#btn-choice-go-study').click();
    await page.locator('#btn-study-fullscreen').click();
    // Chromium provides native fullscreen in automation; WebKit may use the CSS fallback.
    if(browserName==='chromium') {
        await page.waitForFunction(()=>document.fullscreenElement?.id==='exam-view-study');
        await expect(page.locator('#exam-view-study')).toHaveAttribute('data-fullscreen-mode','native');
        await page.evaluate(()=>document.exitFullscreen());
        await expect(page.locator('#exam-view-study')).not.toHaveClass(/fullscreen-study-active/);
    } else {
        await page.locator('#btn-study-fullscreen').click();
        await expect(page.locator('#exam-view-study')).not.toHaveClass(/fullscreen-study-active/);
    }
});

test('partial save advances once and 5/10 remains 5/100; text blank count differs from zero score',async({page})=>{
    await choice(page);await page.evaluate(()=>window.FenUpExam.setScenario(1));
    await page.locator('#btn-choice-go-practice').click();await page.locator('#exam-start-practice').click();
    await page.evaluate(()=>{
        const e=window.FenUpExam,a=e.getState().attempt;
        let qs;
        for(let n=0;n<200;n++){const set=e.selectQuestions('dengeli',{},0).questions;if(set.some(q=>q.id==='FB722-V7-E05')){qs=set;break;}}
        qs.sort((a,b)=>Number(b.id==='FB722-V7-E05')-Number(a.id==='FB722-V7-E05'));
        a.ids=qs.map(q=>q.id);a.questionPoints=e.calculateQuestionPoints(qs,100);a.criteriaMap={};e.ensureAttemptCriteriaMap(a);
        a.answers={[a.ids[0]]:'Esneklik potansiyel enerjisi; joule.',[a.ids[1]]:'Puan verilmeyecek test yanıtı.'};
        e.goToStep('eval');
    });
    await page.locator('#btn-eval-partial').click();await page.locator('.exam-criterion-item').first().click();
    await expect(page.locator('#partial-calc-score')).toContainText('5 Puan');
    await page.locator('#btn-confirm-partial').click();
    await page.waitForFunction(()=>window.FenUpExam.getState().attempt.evalQuestionIndex===1);
    expect(await page.evaluate(()=>{const e=window.FenUpExam,a=e.getState().attempt;return e.getQuestionScore(a.ids[0],a);})).toBe(5);
    // The scheduled advance and explicit navigation must never advance the same index twice.
    for(let n=1;n<8;n++)await page.locator('#btn-eval-next-q').click();
    await page.locator('#btn-eval-to-summary').click();
    await expect(page.locator('#summary-total-score')).toContainText('5');
    await expect(page.locator('#summary-empty-count')).toHaveText('7');
    await expect(page.locator('#summary-yapamadim-count')).toHaveText('8');
});
