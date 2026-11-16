import { test, expect } from '@playwright/test';

test.describe('FenUp X — V8.9.32 Deney 6.4 Çukur ve Tümsek Ayna Eğriliği ve Işın Teması', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined' && typeof window.FenUpLab.openExperimentWorkspace === 'function');
    await page.evaluate(() => localStorage.clear());
  });

  test('Deney 6.4 Düzlem, Çukur ve Tümsek Ayna modları hatasız geçiş yapar ve doğru eğrilikle çizilir', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.evaluate(() => {
      window.FenUpLab.openLabView();
      window.FenUpLab.openExperimentWorkspace('6.4');
    });
    await expect(page.locator('#lab-canvas')).toBeVisible();

    // 1. Çukur Ayna modu
    await page.locator('#btn-mirror-concave').click();
    await expect(page.locator('#btn-mirror-concave')).toHaveClass(/active/);
    await page.waitForTimeout(150);

    const concaveCheck = await page.evaluate(() => {
      const c = document.getElementById('lab-canvas');
      const ctx = c.getContext('2d');
      const scaleX = c.width / 800;
      const scaleY = c.height / 500;
      // Çukur ayna tepe noktası mirrorX + 30 = 650 (sola göre içbükey ")")
      const pxAt650 = ctx.getImageData(Math.round(650 * scaleX), Math.round(250 * scaleY), 1, 1).data;
      // Tümsek ayna tepe noktası olan 590'da (mirrorX - 30) ayna gövdesi olmamalı
      const pxAt590 = ctx.getImageData(Math.round(590 * scaleX), Math.round(160 * scaleY), 1, 1).data;
      return {
        mirrorType: window.FenUpLab.labState.reflection.mirrorType,
        concaveVertexBright: pxAt650[1] + pxAt650[2],
        offArcDark: pxAt590[0] + pxAt590[1] + pxAt590[2]
      };
    });
    expect(concaveCheck.mirrorType).toBe('concave');
    expect(concaveCheck.concaveVertexBright).toBeGreaterThan(200);
    expect(concaveCheck.offArcDark).toBeLessThan(120);

    // 2. Tümsek Ayna modu
    await page.locator('#btn-mirror-convex').click();
    await expect(page.locator('#btn-mirror-convex')).toHaveClass(/active/);
    await page.waitForTimeout(150);

    const convexCheck = await page.evaluate(() => {
      const c = document.getElementById('lab-canvas');
      const ctx = c.getContext('2d');
      const scaleX = c.width / 800;
      const scaleY = c.height / 500;
      // Tümsek ayna tepe noktası mirrorX - 30 = 530 (sola göre dışbükey "(")
      const pxAt530 = ctx.getImageData(Math.round(530 * scaleX), Math.round(250 * scaleY), 1, 1).data;
      return {
        mirrorType: window.FenUpLab.labState.reflection.mirrorType,
        convexVertexBright: pxAt530[1] + pxAt530[2]
      };
    });
    expect(convexCheck.mirrorType).toBe('convex');
    expect(convexCheck.convexVertexBright).toBeGreaterThan(180);

    expect(errors).toEqual([]);
  });
});
