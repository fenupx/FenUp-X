import { test, expect } from '@playwright/test';

async function openLabExp(page, expId) {
  await page.evaluate((id) => {
    window.FenUpLab.openLabView();
    window.FenUpLab.openExperimentWorkspace(id);
  }, expId);
  await expect(page.locator('#lab-canvas')).toBeVisible();
  await page.waitForTimeout(160);
}

test.describe('FenUp X — V8.9.37 5. ve 7. Sınıf Eksik Ders Kitabı Etkinlikleri (5.2, 5.3, 7.5)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined' && typeof window.FenUpLab.openExperimentWorkspace === 'function');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Deney 5.2 Kütle ve Ağırlık Ölçümü (Dünya vs. Ay) ve eski Dinamometre modu', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await openLabExp(page, '5.2');

    // Varsayılan mod: Dinamometre (mevcut mod korunmalı)
    await expect(page.locator('#btn-52-mode-spring')).toHaveClass(/active/);
    await expect(page.locator('#btn-52-weight-plus')).toBeVisible();

    // 2. Mod: Kütle ve Ağırlık (Terazi vs. Dinamometre)
    await page.locator('#btn-52-mode-massweight').click();
    await page.waitForTimeout(120);
    await expect(page.locator('#group-52-mw-ctrl')).toBeVisible();

    // Dünya ortamında 1000 g seç -> Kütle 1 kg, Ağırlık 10.00 N
    await page.locator('#btn-52-mass-1000').click();
    await page.waitForTimeout(100);
    await expect(page.locator('#metric-52-stretch')).toContainText('1 kg');
    await expect(page.locator('#metric-52-force')).toContainText('10.00 N');
    await page.locator('#btn-record-data-5-2').click();

    // Ay ortamına geç -> Kütle DEĞİŞMEZ (1 kg), Ağırlık 1/6 (1.67 N)
    await page.locator('#btn-52-env-moon').click();
    await page.waitForTimeout(100);
    await expect(page.locator('#metric-52-stretch')).toContainText('1 kg');
    await expect(page.locator('#metric-52-force')).toContainText('1.67 N');
    await page.locator('#btn-record-data-5-2').click();

    // 5. sınıf TYMM: G = m*g formülü gösterilmemeli
    const text52 = await page.locator('#vars-container-5-2').textContent();
    expect(text52).not.toMatch(/G\s*=\s*m/i);

    const rows = await page.locator('#lab-table-body tr').count();
    expect(rows).toBe(2);
    expect(errors).toEqual([]);
  });

  test('2. Deney 5.3 Hava ve Su Direnci (Düz/Buruşturulmuş Kâğıt + Su Silindiri) ve eski Yüzey Sürtünmesi', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await openLabExp(page, '5.3');
    await expect(page.locator('#btn-53-mode-surface')).toHaveClass(/active/);
    await expect(page.locator('#btn-53-surf-ice')).toBeVisible();

    // Hava ve Su Direnci moduna geç
    await page.locator('#btn-53-mode-fluid').click();
    await page.waitForTimeout(120);
    await expect(page.locator('#group-53-fluid-ctrl')).toBeVisible();

    // Hava Direnci başlat ve animasyonu doğrula
    await page.locator('#btn-53-fluid-start').click();
    await page.waitForTimeout(350);
    const airState = await page.evaluate(() => ({
      sub: window.FenUpLab.labState.friction.fluidSubMode,
      fastY: window.FenUpLab.labState.friction.fluidFastY,
      slowY: window.FenUpLab.labState.friction.fluidSlowY
    }));
    expect(airState.sub).toBe('air');
    expect(airState.fastY).toBeGreaterThan(0);
    expect(airState.slowY).toBeGreaterThan(0);
    await page.locator('#btn-record-data-5-3').click();

    // Su Direnci alt moduna geç ve başlat
    await page.locator('#btn-53-fluid-water').click();
    await page.locator('#btn-53-fluid-start').click();
    await page.waitForTimeout(350);
    const waterState = await page.evaluate(() => ({
      sub: window.FenUpLab.labState.friction.fluidSubMode,
      fastY: window.FenUpLab.labState.friction.fluidFastY,
      slowY: window.FenUpLab.labState.friction.fluidSlowY,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 2
    }));
    expect(waterState.sub).toBe('water');
    expect(waterState.fastY).toBeGreaterThan(waterState.slowY);
    expect(waterState.overflow).toBe(false);
    await page.locator('#btn-record-data-5-3').click();

    expect(await page.locator('#lab-table-body tr').count()).toBe(2);
    expect(errors).toEqual([]);
  });

  test('3. Deney 7.5 Süzme (Kum–Su) ve Eleme (Kepekli Un) modları + mevcut 3 modun korunması', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await openLabExp(page, '7.5');

    // 5 yöntem sekmesi görünür olmalı
    await expect(page.locator('#group-modes-7-5 .lab-toggle-btn')).toHaveCount(5);

    // Süzme (Kum-Su)
    await page.locator('#btn-mode-filter').click();
    await page.waitForTimeout(100);
    await expect(page.locator('#stats-grid-filter')).toBeVisible();
    await page.locator('#btn-filter-start').click();
    await page.waitForTimeout(450);
    const filterProg = await page.evaluate(() => window.FenUpLab.labState.separation.filtration.progress);
    expect(filterProg).toBeGreaterThan(0);
    await page.locator('#btn-record-data-7-5').click();

    // Eleme (Kepekli Un)
    await page.locator('#btn-mode-sieve').click();
    await page.waitForTimeout(100);
    await expect(page.locator('#stats-grid-sieve')).toBeVisible();
    await page.locator('#btn-sieve-start').click();
    await page.waitForTimeout(450);
    const sieveState = await page.evaluate(() => ({
      prog: window.FenUpLab.labState.separation.sieving.progress,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 2
    }));
    expect(sieveState.prog).toBeGreaterThan(0);
    expect(sieveState.overflow).toBe(false);
    await page.locator('#btn-record-data-7-5').click();

    const rowTexts = await page.locator('#lab-table-body tr').allTextContents();
    expect(rowTexts.length).toBe(2);
    expect(rowTexts[0]).toContain('Süzme');
    expect(rowTexts[1]).toContain('Eleme');
    expect(errors).toEqual([]);
  });
});
