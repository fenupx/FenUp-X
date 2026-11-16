import { test, expect } from '@playwright/test';

async function openLabExperiment(page, expId) {
  await page.evaluate((id) => {
    window.FenUpLab.openLabView();
    window.FenUpLab.openExperimentWorkspace(id);
  }, expId);
  await expect(page.locator('#lab-canvas')).toBeVisible();
  await page.waitForTimeout(180);
}

test.describe('FenUp X — V8.9.31 16 Deney Görsel, Yerleşim ve Kontrollü Deney Regresyonu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined' && typeof window.FenUpLab.openExperimentWorkspace === 'function');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Deney 6.6 Tohum Çimlenmesi varsayılan 2 kap ve 1-4 kap esnek seçimi', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await openLabExperiment(page, '6.6');

    // Varsayılan 2 kap görünür olmalı: [1, 2]
    const initialVisible = await page.evaluate(() => window.FenUpLab.labState.germination.visibleDishes);
    expect(initialVisible).toEqual([1, 2]);
    await expect(page.locator('#btn-germ-vis-1')).toHaveClass(/active/);
    await expect(page.locator('#btn-germ-vis-2')).toHaveClass(/active/);
    await expect(page.locator('#btn-germ-vis-3')).not.toHaveClass(/active/);
    await expect(page.locator('#btn-germ-vis-4')).not.toHaveClass(/active/);

    // 3. ve 4. kabı ekle -> 4 kap
    await page.locator('#btn-germ-vis-3').click();
    await page.locator('#btn-germ-vis-4').click();
    const fourVisible = await page.evaluate(() => window.FenUpLab.labState.germination.visibleDishes);
    expect(fourVisible).toEqual([1, 2, 3, 4]);

    // 2., 3. ve 4. kabı kapat -> tek kap [1] kalmalı
    await page.locator('#btn-germ-vis-2').click();
    await page.locator('#btn-germ-vis-3').click();
    await page.locator('#btn-germ-vis-4').click();
    const oneVisible = await page.evaluate(() => window.FenUpLab.labState.germination.visibleDishes);
    expect(oneVisible).toEqual([1]);

    // Son kalan kabı kapatmaya çalışınca [1] korunmalı
    await page.locator('#btn-germ-vis-1').click();
    const stillOne = await page.evaluate(() => window.FenUpLab.labState.germination.visibleDishes);
    expect(stillOne).toEqual([1]);

    expect(errors).toEqual([]);
  });

  test('2. Güncellenen 16 deney hatasız açılır, çizim yapar ve yatay taşma üretmez', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    const targetIds = [
      '6.6', '5.9', '5.12', '7.1', '7.7',
      '5.3', '5.4', '5.8', '5.10', '6.2', '6.4', '6.5', '6.11', '7.2', '7.4', '7.9'
    ];

    for (const id of targetIds) {
      await openLabExperiment(page, id);

      const state = await page.evaluate(() => {
        const c = document.getElementById('lab-canvas');
        return {
          width: c ? c.width : 0,
          height: c ? c.height : 0,
          overflow: document.documentElement.scrollWidth > window.innerWidth + 2
        };
      });

      expect(state.width, `${id} canvas width`).toBeGreaterThan(0);
      expect(state.height, `${id} canvas height`).toBeGreaterThan(0);
      expect(state.overflow, `${id} horizontal overflow`).toBe(false);
    }

    expect(errors).toEqual([]);
  });
});
