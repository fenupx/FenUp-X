import {test,expect} from '@playwright/test';
import fs from 'node:fs';

test('render actual question paper and answer key containing both revised questions',async({page})=>{
    test.setTimeout(120000);
    page.on('dialog',d=>d.accept());
    await page.addInitScript(()=>localStorage.setItem('fenupx_cookie_consent','accepted'));
    await page.goto('/');await page.locator('#btn-yazili-modulu').click();await page.locator('#btn-scope-continue').click();
    await page.evaluate(()=>window.FenUpExam.setScenario(1));
    await page.locator('#btn-choice-go-practice').click();await page.locator('#exam-start-practice').click();
    const ids=await page.evaluate(()=>{
        const e=window.FenUpExam,a=e.getState().attempt;
        let qs;
        for(let n=0;n<200;n++) {const set=e.selectQuestions('dengeli',{},0).questions;if(set.some(q=>q.id==='FB714-V7-H01')&&set.some(q=>q.id==='FB722-V7-E05')) {qs=set;break;}}
        if(!qs) throw Error('Revised question set unavailable');
        a.ids=qs.map(q=>q.id);a.questionPoints=e.calculateQuestionPoints(qs,100);a.criteriaMap={};e.ensureAttemptCriteriaMap(a);e.saveProgress();e.openPrintPreview();return a.ids;
    });
    expect(ids).toHaveLength(9);
    await expect(page.locator('#exam-print-sheet')).not.toContainText('Joule / J');
    fs.mkdirSync('tests/artifacts',{recursive:true});
    for(const mode of ['blank','answers']) {
        await page.locator(`#btn-print-mode-${mode}`).click();
        const download=page.waitForEvent('download');
        await page.locator('#btn-print-preview-download-pdf').click();
        await (await download).saveAs(`tests/artifacts/release-893-${mode}.pdf`);
    }
    await page.locator('#btn-print-preview-close').click();
    await page.evaluate(()=>window.FenUpExam.goToStep('study'));
    await page.locator('#btn-study-fullscreen').click();
    await page.screenshot({path:'tests/artifacts/release-893-fullscreen.png',animations:'disabled'});
});
