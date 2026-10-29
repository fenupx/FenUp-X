import { test, expect } from '@playwright/test';

const openChoice = async page => {
  await page.goto('/');
  await page.locator('#btn-yazili-modulu').click();
  await page.locator('#btn-scope-continue').click();
};

test('Belge yüksekliği ve footer ölçümleri', async ({ page }, info) => {
  await page.addInitScript(() => { Math.random = () => 0.5; localStorage.setItem('fenupx_cookie_consent', 'accepted'); });
  await page.goto('/');
  const results = [];
  let backOrigin = null;
  const measure = async name => {
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    results.push(await page.evaluate(name => {
      const scene = document.querySelector('.scene:not(.is-hidden)');
      const footer = document.getElementById('main-footer');
      const leaves = [...scene.querySelectorAll('*')].filter(el => !el.children.length && el.getClientRects().length && el.checkVisibility() && getComputedStyle(el).position !== 'absolute');
      const end = Math.max(...leaves.map(el => el.getBoundingClientRect().bottom + scrollY));
      const box = scene.getBoundingClientRect();
      const last = [...scene.children].filter(el => el.getClientRects().length && el.checkVisibility()).at(-1);
      const blockEnd = last ? last.getBoundingClientRect().bottom + scrollY : end;
      const f = footer.getBoundingClientRect();
      return { name, height: document.documentElement.scrollHeight, sceneBottom: box.bottom + scrollY, contentEnd: end, blockEnd, blockGap: box.bottom + scrollY - blockEnd, tail: box.bottom + scrollY - end, footerTop: f.height ? f.top + scrollY : null, footerHeight: f.height, viewportHeight: innerHeight };
    }, name));
    const measurement = results.at(-1);
    if (name !== 'home') {
      await page.evaluate(() => scrollTo(0, 0));
      const back = await page.locator('#btn-exam-step-back').boundingBox();
      const scene = await page.locator('#scene-yazili').boundingBox();
      const header = await page.locator('.top-header').boundingBox();
      expect(back.x - scene.x).toBeLessThanOrEqual(40);
      expect(back.y).toBeGreaterThanOrEqual(header.y + header.height);
      if (backOrigin) {
        expect(Math.abs(back.x - backOrigin.x)).toBeLessThanOrEqual(4);
        expect(Math.abs(back.y - backOrigin.y)).toBeLessThanOrEqual(4);
      } else backOrigin = back;
    }
    expect(measurement.footerTop).toBeGreaterThanOrEqual(measurement.sceneBottom - 1);
    // Kısa sayfada footer'ı alta taşıyan boşluk, içerik sonrası fazlalık değildir.
    const shortPageSpace = Math.max(0, measurement.viewportHeight - measurement.sceneBottom - measurement.footerHeight);
    expect(measurement.footerTop - measurement.blockEnd).toBeLessThanOrEqual(100 + shortPageSpace);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(100);
    await page.screenshot({ scale: 'css', animations: 'disabled', path: `tests/artifacts/${info.project.name}-${name}-top.png` });
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(100);
    await page.screenshot({ scale: 'css', animations: 'disabled', path: `tests/artifacts/${info.project.name}-${name}-bottom.png` });
    await page.evaluate(() => scrollTo(0, 0));
  };
  await measure('home');
  await page.screenshot({ scale: 'css', animations: 'disabled', path: `tests/artifacts/${info.project.name}-height-top.png` });
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight / 2));
  await page.screenshot({ scale: 'css', animations: 'disabled', path: `tests/artifacts/${info.project.name}-height-middle.png` });
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
  await page.screenshot({ scale: 'css', animations: 'disabled', path: `tests/artifacts/${info.project.name}-height-bottom.png` });
  await page.locator('#site-logo-link').click();
  await page.locator('#btn-yazili-modulu').click(); await measure('scope');
  await page.locator('#btn-scope-continue').click(); await measure('choice');
  await page.locator('#btn-choice-go-practice').click(); await measure('setup');
  await page.locator('#exam-start-practice').click(); await measure('active');
  await info.attach('height-measurements', { body: JSON.stringify(results, null, 2), contentType: 'application/json' });
  console.log('HEIGHTS', info.project.name, JSON.stringify(results));
});

test('Tarayıcı geri/ileri cevapları ve soru setini korur', async ({ page }) => {
  await openChoice(page);
  await page.locator('#btn-choice-go-practice').click();
  await page.locator('#exam-start-practice').click();
  const length = await page.evaluate(() => history.length);
  await page.locator('#practice-text-ans').fill('Korunacak bilimsel cevap');
  expect(await page.evaluate(() => history.length)).toBe(length);
  const before = await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.ids);
  await page.goBack();
  await expect(page.locator('#exam-view-choice')).toBeVisible();
  await page.goForward();
  await expect(page.locator('#practice-text-ans')).toHaveValue('Korunacak bilimsel cevap');
  await page.goBack();
  await page.locator('#btn-resume-saved-work, #btn-resume-saved-attempt').first().click();
  await expect(page.locator('#practice-text-ans')).toHaveValue('Korunacak bilimsel cevap');
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.ids)).toEqual(before);
});

const finish = async page => {
  for (let i = 0; i < 6; i++) await page.locator('#btn-practice-next-q').click();
  await page.locator('#btn-practice-finish').click();
};

test('Mantıksal geri hedefleri ve seçim geçmişi', async ({ page }) => {
  await page.goto('/');
  await page.locator('#btn-yazili-modulu').click();
  await page.locator('#btn-scope-continue').click();
  await page.goBack();
  await expect(page.locator('#exam-view-scope')).toBeVisible();
  await page.goForward();
  await expect(page.locator('#exam-view-choice')).toBeVisible();
  await page.locator('#btn-choice-go-practice').click();
  await page.locator('#btn-exam-step-back').click();
  await expect(page.locator('#exam-view-choice')).toBeVisible();
  await page.goForward();
  await expect(page.locator('#practice-setup-box')).toBeVisible();
  await page.locator('#exam-start-practice').click();
  await page.locator('#btn-exam-step-back').click();
  await expect(page.locator('#exam-view-choice')).toBeVisible();
  await page.locator('#btn-choice-go-study').click();
  const backStudy = page.locator('#btn-study-back-choice');
  await expect(backStudy).toBeVisible();
  await backStudy.click();
  await expect(page.locator('#exam-view-choice')).toBeVisible();
  await page.locator('#btn-exam-step-back').click();
  await expect(page.locator('#exam-view-scope')).toBeVisible();
  await page.locator('#btn-exam-step-back').click();
  await expect(page.locator('#scene-home')).toBeVisible();
});

test('Ölçütler, özet ve tekrar kartları geri/ileri korunur', async ({ page }) => {
  page.on('dialog', d => d.accept());
  await openChoice(page);
  await page.locator('#btn-choice-go-practice').click();
  await page.locator('#exam-start-practice').click();
  await finish(page);
  const length = await page.evaluate(() => history.length);
  await page.locator('.exam-criterion-item').first().click();
  const selected = await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.selectedCriteria);
  expect(await page.evaluate(() => history.length)).toBe(length);
  await page.goBack();
  await expect(page.locator('#exam-view-choice')).toBeVisible();
  await page.goForward();
  await expect(page.locator('.exam-criterion-checkbox').first()).toBeChecked();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.selectedCriteria)).toEqual(selected);
  for (let i = 0; i < 6; i++) await page.locator('#btn-eval-next-q').click();
  await page.locator('#btn-eval-to-summary').click();
  const result = await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);
  await page.locator('#btn-summary-study-missed').click();
  const returnSummaryBtn = page.locator('#btn-study-back-choice');
  await expect(returnSummaryBtn).toBeVisible();
  await page.goBack();
  await expect(page.locator('#exam-view-summary')).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.score)).toBe(result.score);
  await page.goForward();
  await expect(page.locator('#exam-view-study')).toBeVisible();
  await returnSummaryBtn.click();
  await expect(page.locator('#exam-view-summary')).toBeVisible();
  await page.goBack();
  await expect(page.locator('#exam-view-eval')).toBeVisible();
  await expect(page.locator('.exam-criterion-checkbox').first()).toBeDisabled();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.finished)).toBe(true);
  await page.goForward();
  await expect(page.locator('#exam-view-summary')).toBeVisible();
  await page.locator('#btn-summary-new-practice').click();
  await page.locator('#exam-start-practice').click();
  await finish(page);
  await expect(page.locator('.exam-criterion-checkbox').first()).toBeEnabled();
});

test('Yeni prova eski geçmişten veri almaz ve yenileme yeni set üretmez', async ({ page }) => {
  await openChoice(page);
  await page.locator('#btn-choice-go-practice').click();
  await page.locator('#exam-start-practice').click();
  await page.locator('#practice-text-ans').fill('Eski cevap');
  const old = await page.evaluate(() => history.state.fenupx.route);
  await page.goBack();
  await page.locator('#btn-choice-go-practice').click();
  await page.locator('#exam-start-practice').click();
  await page.locator('#practice-text-ans').fill('Yeni cevap');
  const fresh = await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);
  await page.goBack();
  await expect(page.locator('#exam-view-choice')).toBeVisible();
  await page.goForward();
  await expect(page.locator('#practice-text-ans')).toHaveValue('Yeni cevap');
  await page.reload();
  await expect(page.locator('#exam-view-scope')).toBeVisible();
  await page.locator('#btn-scope-continue').click();
  await expect(page.locator('#exam-view-choice')).toBeVisible();
  await page.locator('#btn-resume-saved-work, #btn-resume-saved-attempt').first().click();
  await expect(page.locator('#practice-text-ans')).toHaveValue('Yeni cevap');
  await page.evaluate(old => {
    history.pushState({ fenupx: { v: 1, index: 99, route: old } }, '', '#scene-yazili/practice/free');
    dispatchEvent(new PopStateEvent('popstate', { state: history.state }));
  }, old);
  await expect(page.locator('#exam-view-choice')).toBeVisible();
  const after = await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt);
  expect(after.routeKey).toBe(fresh.routeKey);
  expect(after.ids).toEqual(fresh.ids);
  expect(after.answers).toEqual(fresh.answers);
  expect(JSON.stringify(await page.evaluate(() => history.state))).not.toContain('Yeni cevap');
});

test('Doğrudan, eksik ve bozuk rota güvenli; kökten gerçek önceki sayfaya çıkılabilir', async ({ page }) => {
  await page.route('**/history-before.html', r => r.fulfill({ contentType: 'text/html', body: '<meta charset="utf-8"><h1>Önceki Sayfa</h1>' }));
  await page.goto('/history-before.html');
  await page.goto('/');
  await page.locator('#btn-yazili-modulu').click();
  await page.goBack();
  await expect(page.locator('#scene-home')).toBeVisible();
  await page.goBack();
  await expect(page.locator('h1')).toHaveText('Önceki Sayfa');
  await page.goto('/#scene-yazili/practice');
  await expect(page.locator('#exam-view-scope')).toBeVisible();
  await page.reload();
  await expect(page.locator('#exam-view-scope')).toBeVisible();
  await page.goto('/#scene-yazili/bozuk');
  await expect(page.locator('#exam-view-scope')).toBeVisible();
  await page.goto('/#olmayan-sahne');
  await expect(page.locator('#scene-home')).toBeVisible();
});

test('Geçmiş gezinmesi açık panel ve modal katmanlarını temizler', async ({ page }) => {
  await openChoice(page);
  if (page.viewportSize().width <= 820) {
    await page.locator('#btn-mobile-menu').click();
    await page.goBack();
    await expect(page.locator('#btn-mobile-menu')).toHaveAttribute('aria-expanded', 'false');
    await page.goForward();
  }
  await page.locator('#btn-choice-go-practice').click();
  await page.locator('#exam-start-practice').click();
  await page.locator('#btn-practice-preview-print').click();
  await expect(page.locator('#exam-print-preview-modal')).toBeVisible();
  await page.goBack();
  await expect(page.locator('#exam-view-choice')).toBeVisible();
  await expect(page.locator('#exam-print-preview-modal')).toBeHidden();
  expect(await page.evaluate(() => getComputedStyle(document.body).overflowY)).not.toBe('hidden');
});

test('Ortak sahneler ve laboratuvar geri/ileri gezinmesinde izole kalır', async ({ page }) => {
  await page.goto('/');
  await page.locator('#btn-deney-modulu').click();
  await expect(page.locator('#lab-catalog-view')).toBeVisible();
  await page.locator('#btn-lab-back-home').click();
  await expect(page.locator('#scene-home')).toBeVisible();
  await page.goForward();
  await expect(page.locator('#lab-catalog-view')).toBeVisible();
  await page.goBack();
  await expect(page.locator('#scene-home')).toBeVisible();
  await page.locator('#btn-oyun-modulu').click();
  await expect(page.locator('#scene-crossroads')).toBeVisible();
  await page.goBack();
  await expect(page.locator('#scene-home')).toBeVisible();
  await page.goForward();
  await expect(page.locator('#scene-crossroads')).toBeVisible();
  await page.goBack();
  await page.locator('#btn-yazili-modulu').click();
  await expect(page.locator('#scene-yazili')).toBeVisible();
  await expect(page.locator('.top-controls')).toBeHidden();
  await expect(page.locator('#lab-view')).toBeHidden();
});
