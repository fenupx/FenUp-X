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

async function enterDeepStudy(page, scenarioNum = 1) {
  await enterStudy(page, scenarioNum, '7');
  const chooser = page.locator('#study-mode-chooser');
  if (await chooser.isVisible()) {
    await page.click('#btn-chooser-deep');
  } else {
    await page.click('#btn-study-mode-deep');
  }
  await expect(page.locator('.comp-outcome-doc')).toBeVisible({ timeout: 10000 });
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

function boxesOverlap(a, b) {
  return !(a.x + a.width <= b.x + 1 || b.x + b.width <= a.x + 1 || a.y + a.height <= b.y + 1 || b.y + b.height <= a.y + 1);
}

test.describe('V8.9.44 — Çift Derinlikli Bilgi İstasyonu V5 (Öğrenme Çıktısı Dil Birliği, 6 Yeni İllüstrasyon, Eşit Galeri, SVG & PDF)', () => {
  test('1. Ön Mod Seçim Ekranı (#study-mode-chooser), Öğrenme Çıktısı dil birliği (0 kazanım), mavi parlayan aktif mod ve 0 taşma', async ({ page }) => {
    const pageErrors = [];
    const consoleErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await enterStudy(page, 1, '7');

    // 7. Sınıf 1D1Y ilk girişinde 2 kartlı ön seçim ekranı görünmeli ve 0 "kazanım" içermeli
    await expect(page.locator('#study-mode-chooser')).toBeVisible();
    await expect(page.locator('#btn-chooser-quick')).toBeVisible();
    await expect(page.locator('#btn-chooser-deep')).toBeVisible();
    const chooserText = await page.locator('#study-mode-chooser').innerText();
    expect(chooserText.toLowerCase()).not.toContain('kazanım');
    expect(chooserText).toContain('Öğrenme Çıktısı');

    // Kapsamlı Hazırlık kartına tıklayınca rehber açılır ve aktif mod mavi parlayan çerçeve taşır
    await page.click('#btn-chooser-deep');
    await expect(page.locator('#study-mode-chooser')).toBeHidden();
    await expect(page.locator('#study-depth-switch')).toBeVisible();
    await expect(page.locator('#btn-study-mode-deep')).toHaveClass(/active/);
    await expect(page.locator('#btn-study-mode-deep')).toHaveAttribute('aria-selected', 'true');

    const guideText = await page.locator('#exam-view-study').innerText();
    expect(guideText.toLowerCase()).not.toContain('kazanım');
    expect(guideText).toContain('Öğrenme Çıktısı');

    const activeStyle = await page.locator('#btn-study-mode-deep').evaluate(el => {
      const s = getComputedStyle(el);
      return { borderColor: s.borderTopColor, boxShadow: s.boxShadow };
    });
    expect(activeStyle.borderColor).toBe('rgb(56, 189, 248)');
    expect(activeStyle.boxShadow).not.toBe('none');

    // Yatay taşma kontrolü
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.innerWidth + 1);

    // Üst çubuktan Hızlı Tekrar'a tek tıkla geçiş (ön seçim tekrar çıkmaz)
    await page.click('#btn-study-mode-quick');
    await expect(page.locator('#study-mode-chooser')).toBeHidden();
    await expect(page.locator('#btn-study-mode-quick')).toHaveClass(/active/);
    await expect(page.locator('.exam-card-title')).toBeVisible();

    expect(pageErrors, 'Sayfa hatası olmamalı').toEqual([]);
    expect(consoleErrors.filter(e => !e.includes('favicon')), 'Konsol hatası olmamalı').toEqual([]);
  });

  test('2. Yol Haritası (.comp-roadmap), Görsel Bilgi Kartları (info_cards) ve 3’lü/2’li çakışmasız panel alt yazıları', async ({ page }) => {
    await enterDeepStudy(page, 1);

    // FB.7.2.1: Yol haritası + info_cards + cols-3 (3 panel alt yazısı, çakışma = 0)
    await selectDeepOutcome(page, 'FB.7.2.1');
    await expect(page.locator('.comp-roadmap')).toBeVisible();
    expect(await page.locator('.comp-roadmap-step').count()).toBeGreaterThanOrEqual(3);
    expect(await page.locator('.comp-info-card').count()).toBeGreaterThanOrEqual(4);

    // Yol haritası adımı tıklaması hatasız çalışır
    await page.locator('.comp-roadmap-step').nth(1).click();

    const cols3 = page.locator('.comp-panel-captions.cols-3 .comp-panel-cap');
    await expect(cols3).toHaveCount(3);
    const boxes3 = await cols3.evaluateAll(els => els.map(el => {
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    }));
    for (let i = 0; i < boxes3.length; i++) {
      for (let j = i + 1; j < boxes3.length; j++) {
        expect(boxesOverlap(boxes3[i], boxes3[j]), `cols-3 kutu ${i}-${j} çakışmamalı`).toBe(false);
      }
    }

    // FB.7.2.2: illu-kinetik-faktorler.jpg ve illu-enerji-deneyleri.jpg altındaki cols-2 kutuları (çakışma = 0) + tags şeridi
    await selectDeepOutcome(page, 'FB.7.2.2');
    const cols2Groups = page.locator('.comp-panel-captions.cols-2');
    expect(await cols2Groups.count()).toBeGreaterThanOrEqual(2);
    for (let g = 0; g < await cols2Groups.count(); g++) {
      const caps = cols2Groups.nth(g).locator('.comp-panel-cap');
      await expect(caps).toHaveCount(2);
      const boxes2 = await caps.evaluateAll(els => els.map(el => {
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      }));
      expect(boxes2.length === 2 && !boxesOverlap(boxes2[0], boxes2[1])).toBe(true);
    }
    expect(await page.locator('.comp-caption-tags .comp-caption-tag').count()).toBeGreaterThanOrEqual(3);

    // FB.7.1.5: Güneş / Andromeda / Evren 3'lü fotoğraf galerisi eşit yükseklik (fark <= 2px)
    await selectDeepOutcome(page, 'FB.7.1.5');
    await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll('.comp-gallery-photo img')];
      await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
    });
    const heights = await page.locator('.comp-gallery-photo .comp-img-frame img').evaluateAll(els => els.map(el => el.getBoundingClientRect().height));
    expect(heights.length).toBe(3);
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(2);
  });

  test('3. Senaryo filtreleme doğruluğu (S1, S2, S3, S4)', async ({ page }) => {
    await enterDeepStudy(page, 1);
    const s1Ids = await page.evaluate(() => window.FenUpExam.getActiveComprehensiveOutcomes().map(o => o.outcome_id));
    expect(s1Ids).toEqual(['FB.7.1.1', 'FB.7.1.4', 'FB.7.1.5', 'FB.7.2.1', 'FB.7.2.2']);

    await enterDeepStudy(page, 2);
    const s2Ids = await page.evaluate(() => window.FenUpExam.getActiveComprehensiveOutcomes().map(o => o.outcome_id));
    expect(s2Ids).toEqual(['FB.7.1.1', 'FB.7.1.3', 'FB.7.1.5', 'FB.7.2.1']);

    await enterDeepStudy(page, 3);
    const s3Ids = await page.evaluate(() => window.FenUpExam.getActiveComprehensiveOutcomes().map(o => o.outcome_id));
    expect(s3Ids).toEqual(['FB.7.1.1', 'FB.7.1.3', 'FB.7.1.4', 'FB.7.2.1', 'FB.7.2.2']);

    await enterDeepStudy(page, 4);
    const s4Check = await page.evaluate(() => ({
      expected: window.FenUpExam.getActiveScenario().allocation.map(a => a.outcome_id),
      actual: window.FenUpExam.getActiveComprehensiveOutcomes().map(o => o.outcome_id)
    }));
    expect(s4Check.actual).toEqual(s4Check.expected);
    expect(s4Check.actual).not.toContain('FB.7.1.1');
  });

  test('4. Tüm görseller (naturalWidth > 0), 3 özel SVG (> 120px), quick_checks ve Deney 7.1 köprüsü', async ({ page }) => {
    await enterDeepStudy(page, 1);

    for (const oid of ['FB.7.1.1', 'FB.7.1.4', 'FB.7.1.5', 'FB.7.2.1', 'FB.7.2.2']) {
      await selectDeepOutcome(page, oid);
      await page.evaluate(async () => {
        const imgs = [...document.querySelectorAll('.comp-outcome-doc img')];
        await Promise.all(imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })));
      });
      const broken = await page.evaluate(() => [...document.querySelectorAll('.comp-outcome-doc img')].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src));
      expect(broken, `${oid} kırık görsel olmamalı`).toEqual([]);

      if (oid === 'FB.7.1.4') {
        expect(await page.locator('[data-svg-id="svg-star-lifecycle-dual"] svg').evaluate(el => el.getBoundingClientRect().width)).toBeGreaterThan(120);
        expect(await page.locator('.comp-panel-captions.rows-2 .comp-panel-cap').count()).toBe(2);
      }
      if (oid === 'FB.7.1.5') {
        expect(await page.locator('[data-svg-id="svg-cosmic-address"] svg').evaluate(el => el.getBoundingClientRect().width)).toBeGreaterThan(120);
      }
    }

    // quick_checks akordeonu
    const firstQc = page.locator('.comp-quick-check').first();
    await firstQc.locator('summary').click();
    await expect(firstQc).toHaveAttribute('open', '');
    await firstQc.locator('summary').click();
    await expect(firstQc).not.toHaveAttribute('open', '');

    // Deney 7.1 köprüsü
    await selectDeepOutcome(page, 'FB.7.2.1');
    await page.locator('.comp-lab-bridge-btn[data-lab-exp="7.1"]').click();
    await expect(page.locator('#lab-view')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('#lab-view')).toContainText(/Fiziksel|İş|7\.1/i, { timeout: 10000 });
  });

  test('5. PDF İndir önizlemesi hem Hızlı Tekrar hem Kapsamlı Hazırlıkta senaryo filtreli ve beyaz zeminli çalışır', async ({ page }) => {
    await enterStudy(page, 2, '7');
    await page.click('#btn-chooser-quick');

    // Hızlı Tekrar PDF
    await page.click('#btn-study-pdf-download');
    await expect(page.locator('#exam-print-sheet.study-print-mode')).toBeVisible();
    const quickPrint = await page.evaluate(() => ({
      outcomes: [...document.querySelectorAll('#exam-print-sheet .study-print-outcome')].map(el => el.dataset.outcomeId),
      bg: getComputedStyle(document.querySelector('#exam-print-sheet')).backgroundColor
    }));
    expect(quickPrint.outcomes).toEqual(['FB.7.1.1', 'FB.7.1.3', 'FB.7.1.5', 'FB.7.2.1']);
    expect(quickPrint.bg).toBe('rgb(255, 255, 255)');
    await page.click('#btn-print-preview-close');

    // Kapsamlı Hazırlık PDF (yol haritası + info_cards + panel captions dahil)
    await page.click('#btn-study-mode-deep');
    await page.click('#btn-study-pdf-download');
    await expect(page.locator('#exam-print-sheet.study-print-mode')).toBeVisible();
    const deepPrint = await page.evaluate(() => ({
      outcomes: [...document.querySelectorAll('#exam-print-sheet .study-print-outcome')].map(el => el.dataset.outcomeId),
      roadmaps: document.querySelectorAll('#exam-print-sheet .study-print-roadmap').length,
      infoCards: document.querySelectorAll('#exam-print-sheet .study-print-info-card').length,
      panelCaps: document.querySelectorAll('#exam-print-sheet .study-print-panel-cap').length,
      text: document.querySelector('#exam-print-sheet')?.innerText || '',
      bg: getComputedStyle(document.querySelector('#exam-print-sheet')).backgroundColor
    }));
    expect(deepPrint.outcomes).toEqual(['FB.7.1.1', 'FB.7.1.3', 'FB.7.1.5', 'FB.7.2.1']);
    expect(deepPrint.roadmaps).toBe(4);
    expect(deepPrint.infoCards).toBeGreaterThan(10);
    expect(deepPrint.panelCaps).toBeGreaterThanOrEqual(3);
    expect(deepPrint.text.toLowerCase()).not.toContain('kazanım');
    expect(deepPrint.text).toContain('Öğrenme Çıktısı');
    expect(deepPrint.bg).toBe('rgb(255, 255, 255)');
  });

  test('6. 5. Sınıf Bilgi İstasyonunda ön seçim ekranı atlanır, doğrudan Hızlı Tekrar + PDF İndir açılır', async ({ page }) => {
    await enterStudy(page, 1, '5');
    await expect(page.locator('#study-mode-chooser')).toBeHidden();
    await expect(page.locator('#study-depth-switch')).toBeHidden();
    await expect(page.locator('.exam-card-title')).toBeVisible();
    await expect(page.locator('#btn-study-pdf-download')).toBeVisible();
  });
});
