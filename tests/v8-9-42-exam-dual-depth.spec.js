import { test, expect } from '@playwright/test';

async function enterStudy(page, scenarioNum = 1, grade = '7') {
  await page.goto('/index.html', { waitUntil: 'load' });
  await page.waitForSelector('#btn-yazili-modulu', { state: 'visible', timeout: 15000 });
  await page.click('#btn-yazili-modulu');
  await page.waitForSelector('#exam-select-grade', { state: 'visible', timeout: 10000 });
  if (grade !== '7') {
    await page.selectOption('#exam-select-grade', String(grade));
    await page.waitForTimeout(300);
  }
  await page.selectOption('#exam-select-scenario', String(scenarioNum));
  await page.click('#btn-scope-continue');
  await page.waitForSelector('#btn-choice-go-study', { state: 'visible', timeout: 10000 });
  await page.click('#btn-choice-go-study');
  await page.waitForSelector('#exam-view-study:not(.is-hidden)', { state: 'visible', timeout: 10000 });
}

async function selectDeepOutcome(page, outcomeId) {
  const sel = page.locator('#comp-outcome-select');
  if (await sel.isVisible()) {
    await sel.selectOption(outcomeId);
  } else {
    const btn = page.locator(`.comp-outcome-nav-btn[data-comp-outcome="${outcomeId}"]`);
    await btn.click();
  }
  await expect(page.locator(`.comp-outcome-doc[data-outcome-id="${outcomeId}"]`)).toBeVisible();
}

test.describe('V8.9.42 — Çift Derinlikli Bilgi İstasyonu (Hızlı Tekrar | Kapsamlı Hazırlık V3) & Senaryoya Özel PDF', () => {
  test('1. Hızlı Tekrar <-> Kapsamlı Hazırlık geçişi, 0 hata, yatay taşma yok ve erişilebilir dokunma hedefleri', async ({ page }) => {
    const pageErrors = [];
    const consoleErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await enterStudy(page, 1, '7');

    // Başlangıçta Hızlı Tekrar aktif ve mod anahtarı görünür
    await expect(page.locator('#study-depth-switch')).toBeVisible();
    await expect(page.locator('#btn-study-mode-quick')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#btn-study-mode-deep')).toHaveAttribute('aria-selected', 'false');

    // Kapsamlı Hazırlık moduna geç
    await page.click('#btn-study-mode-deep');
    await expect(page.locator('#btn-study-mode-deep')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#exam-view-study')).toHaveClass(/comprehensive-active/);
    await expect(page.locator('.comp-outcome-doc')).toBeVisible();

    // Yatay taşma kontrolü
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1);

    // Etkileşimli düğme boyutları (>= 44px; ETAP >= 1600px ve mobil <= 767px için >= 48px)
    const minExpected = (overflow.innerWidth >= 1600 || overflow.innerWidth <= 767) ? 48 : 44;
    for (const selector of ['#btn-study-mode-quick', '#btn-study-mode-deep', '#btn-study-pdf-download']) {
      const box = await page.locator(selector).boundingBox();
      expect(box, `${selector} boundingBox`).not.toBeNull();
      expect(box.height, `${selector} height >= ${minExpected}`).toBeGreaterThanOrEqual(minExpected - 1);
    }

    // Hızlı Tekrar moduna geri dön
    await page.click('#btn-study-mode-quick');
    await expect(page.locator('#btn-study-mode-quick')).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('#exam-view-study')).not.toHaveClass(/comprehensive-active/);
    await expect(page.locator('.exam-card-title')).toBeVisible();

    expect(pageErrors, 'Sayfa hatası olmamalı').toEqual([]);
    expect(consoleErrors.filter(e => !e.includes('favicon')), 'Konsol hatası olmamalı').toEqual([]);
  });

  test('2. Senaryo filtreleme doğruluğu (S1, S2, S3, S4)', async ({ page }) => {
    // Senaryo 1: tam 5 kazanım
    await enterStudy(page, 1, '7');
    await page.click('#btn-study-mode-deep');
    const s1Ids = await page.evaluate(() => window.FenUpExam.getActiveComprehensiveOutcomes().map(o => o.outcome_id));
    expect(s1Ids).toEqual(['FB.7.1.1', 'FB.7.1.4', 'FB.7.1.5', 'FB.7.2.1', 'FB.7.2.2']);

    // Senaryo 2: tam 4 kazanım
    await enterStudy(page, 2, '7');
    await page.click('#btn-study-mode-deep');
    const s2Ids = await page.evaluate(() => window.FenUpExam.getActiveComprehensiveOutcomes().map(o => o.outcome_id));
    expect(s2Ids).toEqual(['FB.7.1.1', 'FB.7.1.3', 'FB.7.1.5', 'FB.7.2.1']);

    // Senaryo 3: tam 5 kazanım
    await enterStudy(page, 3, '7');
    await page.click('#btn-study-mode-deep');
    const s3Ids = await page.evaluate(() => window.FenUpExam.getActiveComprehensiveOutcomes().map(o => o.outcome_id));
    expect(s3Ids).toEqual(['FB.7.1.1', 'FB.7.1.3', 'FB.7.1.4', 'FB.7.2.1', 'FB.7.2.2']);

    // Senaryo 4: FB.7.1.1 hariç, senaryo dağılımıyla birebir uyumlu
    await enterStudy(page, 4, '7');
    await page.click('#btn-study-mode-deep');
    const s4Check = await page.evaluate(() => {
      const expected = window.FenUpExam.getActiveScenario().allocation.map(a => a.outcome_id);
      const actual = window.FenUpExam.getActiveComprehensiveOutcomes().map(o => o.outcome_id);
      return { expected, actual };
    });
    expect(s4Check.actual).toEqual(s4Check.expected);
    expect(s4Check.actual).not.toContain('FB.7.1.1');
    expect(s4Check.actual).toEqual(expect.arrayContaining(['FB.7.1.4', 'FB.7.1.5', 'FB.7.2.1', 'FB.7.2.2']));
  });

  test('3. Tüm görseller (naturalWidth > 0), 3 özel SVG diyagram (> 120px) ve quick_checks akordeonu', async ({ page }) => {
    // S1 üzerinden FB.7.1.4 (svg-star-lifecycle-dual) ve FB.7.1.5 (svg-cosmic-address) + FB.7.2.2 kontrolü
    await enterStudy(page, 1, '7');
    await page.click('#btn-study-mode-deep');

    for (const oid of ['FB.7.1.1', 'FB.7.1.4', 'FB.7.1.5', 'FB.7.2.1', 'FB.7.2.2']) {
      await selectDeepOutcome(page, oid);
      await page.evaluate(async () => {
        const imgs = [...document.querySelectorAll('.comp-outcome-doc img')];
        imgs.forEach(img => { img.loading = 'eager'; });
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      const imgAudit = await page.evaluate(() => {
        const imgs = [...document.querySelectorAll('.comp-outcome-doc img')];
        return imgs.map(i => ({ src: i.getAttribute('src'), complete: i.complete, w: i.naturalWidth }));
      });
      expect(imgAudit.length, `${oid} görsel içermeli`).toBeGreaterThan(0);
      for (const im of imgAudit) {
        expect(im.complete && im.w > 0, `${oid} kırık görsel: ${im.src}`).toBe(true);
      }

      if (oid === 'FB.7.1.4') {
        const w = await page.locator('[data-svg-id="svg-star-lifecycle-dual"] svg').evaluate(el => el.getBoundingClientRect().width);
        expect(w).toBeGreaterThan(120);
      }
      if (oid === 'FB.7.1.5') {
        const w = await page.locator('[data-svg-id="svg-cosmic-address"] svg').evaluate(el => el.getBoundingClientRect().width);
        expect(w).toBeGreaterThan(120);
      }
    }

    // quick_checks açılıp kapanma kontrolü (FB.7.2.2 üzerinde)
    const firstQc = page.locator('.comp-quick-check').first();
    await expect(firstQc).not.toHaveAttribute('open', '');
    await firstQc.locator('summary').click();
    await expect(firstQc).toHaveAttribute('open', '');
    await firstQc.locator('summary').click();
    await expect(firstQc).not.toHaveAttribute('open', '');

    // S2 üzerinden FB.7.1.3 (svg-space-debris-cycle) ve uzay kirliliği illüstrasyonu kontrolü
    await enterStudy(page, 2, '7');
    await page.click('#btn-study-mode-deep');
    await selectDeepOutcome(page, 'FB.7.1.3');
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('.comp-outcome-doc img')];
      imgs.forEach(img => { img.loading = 'eager'; });
      await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
    });
    const debrisSvgW = await page.locator('[data-svg-id="svg-space-debris-cycle"] svg').evaluate(el => el.getBoundingClientRect().width);
    expect(debrisSvgW).toBeGreaterThan(120);
    const debrisBroken = await page.evaluate(() => [...document.querySelectorAll('.comp-outcome-doc img')].filter(i => !i.complete || i.naturalWidth === 0).length);
    expect(debrisBroken).toBe(0);
  });

  test('4. FB.7.2.1 üzerindeki Deney 7.1 köprüsü Sanal Laboratuvar Deney 7.1 ekranını açar', async ({ page }) => {
    await enterStudy(page, 1, '7');
    await page.click('#btn-study-mode-deep');
    await selectDeepOutcome(page, 'FB.7.2.1');

    const bridgeBtn = page.locator('.comp-lab-bridge-btn[data-lab-exp="7.1"]');
    await expect(bridgeBtn).toBeVisible();
    await bridgeBtn.click();

    await expect(page.locator('#lab-view')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#lab-view')).toContainText(/Fiziksel|İş|7\.1/i, { timeout: 10000 });
  });

  test('5. PDF İndir akışı hem Hızlı Tekrar hem Kapsamlı Hazırlık modunda aktif senaryoya filtrelenmiş beyaz çıktı üretir', async ({ page }) => {
    await enterStudy(page, 2, '7');

    // A) Hızlı Tekrar PDF
    await expect(page.locator('#btn-study-mode-quick')).toHaveAttribute('aria-selected', 'true');
    await page.click('#btn-study-pdf-download');
    await expect(page.locator('#exam-print-preview-modal')).toBeVisible();
    await expect(page.locator('#exam-print-sheet.study-print-mode')).toBeVisible();

    const quickPrint = await page.evaluate(() => {
      const sheet = document.querySelector('#exam-print-sheet');
      const outcomes = [...sheet.querySelectorAll('.study-print-outcome')].map(el => el.dataset.outcomeId);
      return {
        textLen: sheet.innerText.trim().length,
        header: sheet.querySelector('.print-school-title')?.textContent || '',
        outcomes
      };
    });
    expect(quickPrint.textLen).toBeGreaterThan(400);
    expect(quickPrint.header).toContain('Senaryo 2');
    expect(quickPrint.header).toContain('Hızlı Tekrar');
    expect(quickPrint.outcomes).toEqual(['FB.7.1.1', 'FB.7.1.3', 'FB.7.1.5', 'FB.7.2.1']);

    await page.click('#btn-print-preview-close');
    await expect(page.locator('#exam-print-preview-modal')).toBeHidden();

    // B) Kapsamlı Hazırlık PDF
    await page.click('#btn-study-mode-deep');
    await page.click('#btn-study-pdf-download');
    await expect(page.locator('#exam-print-preview-modal')).toBeVisible();

    const deepPrint = await page.evaluate(() => {
      const sheet = document.querySelector('#exam-print-sheet');
      const outcomes = [...sheet.querySelectorAll('.study-print-outcome')].map(el => el.dataset.outcomeId);
      return {
        textLen: sheet.innerText.trim().length,
        header: sheet.querySelector('.print-school-title')?.textContent || '',
        outcomes,
        bg: getComputedStyle(sheet).backgroundColor
      };
    });
    expect(deepPrint.textLen).toBeGreaterThan(1200);
    expect(deepPrint.header).toContain('Senaryo 2');
    expect(deepPrint.header).toContain('Kapsamlı Hazırlık');
    expect(deepPrint.outcomes).toEqual(['FB.7.1.1', 'FB.7.1.3', 'FB.7.1.5', 'FB.7.2.1']);
    expect(deepPrint.bg).toBe('rgb(255, 255, 255)');
  });

  test('6. 5. Sınıf Bilgi İstasyonunda mod anahtarı gizli, Hızlı Tekrar + PDF İndir sorunsuz çalışır', async ({ page }) => {
    await enterStudy(page, 1, '5');
    await expect(page.locator('#study-depth-switch')).toBeHidden();
    await expect(page.locator('#btn-study-pdf-download')).toBeVisible();
    await page.click('#btn-study-pdf-download');
    await expect(page.locator('#exam-print-sheet.study-print-mode')).toBeVisible();
    const text = await page.locator('#exam-print-sheet .print-school-title').textContent();
    expect(text).toContain('5. Sınıf');
    expect(text).toContain('Hızlı Tekrar');
  });
});
