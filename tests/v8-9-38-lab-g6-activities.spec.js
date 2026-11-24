import { test, expect } from '@playwright/test';

async function openLabExp(page, expId) {
  await page.evaluate((id) => {
    window.FenUpLab.openLabView();
    window.FenUpLab.openExperimentWorkspace(id);
  }, expId);
  await expect(page.locator('#lab-canvas')).toBeVisible();
  await page.waitForTimeout(160);
}

test.describe('FenUp X — V8.9.38 6. Sınıf 2. Kitap Etkinlikleri (6.8, 6.5, 6.12)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined' && typeof window.FenUpLab.openExperimentWorkspace === 'function');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Katalog sayıları 6. Sınıf (12) ve Toplam (34) olarak güncellenmiştir', async ({ page }) => {
    const counts = await page.evaluate(() => {
      const db = window.FenUpLab.EXPERIMENTS_DATABASE;
      return {
        total: db.length,
        g5: db.filter(e => e.grade === 5).length,
        g6: db.filter(e => e.grade === 6).length,
        g7: db.filter(e => e.grade === 7).length,
        has612: db.some(e => e.id === '6.12')
      };
    });
    expect(counts).toEqual({ total: 34, g5: 12, g6: 12, g7: 10, has612: true });
  });

  test('2. Deney 6.8 Gazlarda Genleşme ve Büzülme (Şişe ve Balon) + Gravzant korunumu', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await openLabExp(page, '6.8');
    await expect(page.locator('#btn-68-mode-solid')).toHaveClass(/active/);

    await page.locator('#btn-68-mode-gas').click();
    await page.waitForTimeout(120);
    await expect(page.locator('#group-68-gas-ctrl')).toBeVisible();

    await page.locator('#btn-68-gas-start').click();
    await page.waitForTimeout(450);

    const gasState = await page.evaluate(() => ({
      mode: window.FenUpLab.labState.expansion.mode,
      placed: window.FenUpLab.labState.expansion.gasPlaced,
      hotTemp: window.FenUpLab.labState.expansion.gasHotTemp,
      coldTemp: window.FenUpLab.labState.expansion.gasColdTemp,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 2
    }));
    expect(gasState.mode).toBe('gas');
    expect(gasState.placed).toBe(true);
    expect(gasState.hotTemp).toBeGreaterThan(25);
    expect(gasState.coldTemp).toBeLessThan(18);
    expect(gasState.overflow).toBe(false);

    await page.locator('#btn-record-data-6-8').click();
    expect(await page.locator('#lab-table-body tr').count()).toBe(1);
    expect(errors).toEqual([]);
  });

  test('3. Deney 6.5 Kütle–Hacim–Yoğunluk Ölçüm Tezgâhı + Yoğunluk Kulesi korunumu', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await openLabExp(page, '6.5');
    await expect(page.locator('#btn-65-mode-tower')).toHaveClass(/active/);

    await page.locator('#btn-65-mode-bench').click();
    await page.waitForTimeout(120);
    await expect(page.locator('#group-65-bench-ctrl')).toBeVisible();

    await page.locator('#btn-65-mat-iron').click();
    await page.locator('#btn-65-bench-drop').click();
    await page.waitForTimeout(350);

    const benchState = await page.evaluate(() => ({
      mode: window.FenUpLab.labState.densityTower.mode,
      sample: window.FenUpLab.labState.densityTower.benchSample,
      dropped: window.FenUpLab.labState.densityTower.benchDropped,
      waterLevel: window.FenUpLab.labState.densityTower.benchWaterLevel,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 2
    }));
    expect(benchState.mode).toBe('bench');
    expect(benchState.sample).toBe('iron');
    expect(benchState.dropped).toBe(true);
    expect(benchState.waterLevel).toBeGreaterThan(55);
    expect(benchState.overflow).toBe(false);

    await page.locator('#btn-record-data-6-5').click();
    const rowText = await page.locator('#lab-table-body tr').first().textContent();
    expect(rowText).toContain('Demir Cıvata');
    expect(rowText).toContain('7.8 g/cm³');
    expect(errors).toEqual([]);
  });

  test('4. Yeni Deney 6.12 Saf Maddelerin Hâl Değişim Noktaları (Buz, Stearik Asit, Su, Etil Alkol)', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await openLabExp(page, '6.12');
    await expect(page.locator('#quick-controls-6-12')).toBeVisible();
    await expect(page.locator('#group-612-substances .lab-toggle-btn')).toHaveCount(4);

    // Stearik Asit (69°C Benmari) seç ve ısıt
    await page.locator('#btn-612-sub-stearic').click();
    await page.waitForTimeout(100);
    await expect(page.locator('#metric-612-point')).toContainText('69 °C');

    await page.locator('#btn-612-heater').click();
    await page.waitForTimeout(500);
    const stearicState = await page.evaluate(() => ({
      elapsed: window.FenUpLab.labState.phaseChange.elapsedMin,
      temp: window.FenUpLab.labState.phaseChange.temp,
      histLen: window.FenUpLab.labState.phaseChange.history.length,
      overflow: document.documentElement.scrollWidth > window.innerWidth + 2
    }));
    expect(stearicState.elapsed).toBeGreaterThan(0);
    expect(stearicState.temp).toBeGreaterThan(40);
    expect(stearicState.histLen).toBeGreaterThan(1);
    expect(stearicState.overflow).toBe(false);

    await page.locator('#btn-record-data-6-12').click();

    // Etil Alkol (78°C) seç ve kaydet
    await page.locator('#btn-612-sub-alcohol').click();
    await expect(page.locator('#metric-612-point')).toContainText('78 °C');
    await page.locator('#btn-record-data-6-12').click();

    expect(await page.locator('#lab-table-body tr').count()).toBe(2);
    expect(errors).toEqual([]);
  });
});
