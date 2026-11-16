import { test, expect } from '@playwright/test';

test.describe('FenUp X — V8.9.35 Dalga 2 Doku, Akım, İkon ve 7.10 Taşma Regresyonu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined' && typeof window.FenUpLab.openExperimentWorkspace === 'function');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Deney 7.10 toast bildirimi viewport dışına taşmaz', async ({ page }) => {
    await page.evaluate(() => {
      window.FenUpLab.openLabView();
      window.FenUpLab.openExperimentWorkspace('7.10');
      window.FenUpLab.showLabToast('🏛️ Mimar Sinan Mağlova Su Kemeri Modu');
    });

    const toast = page.locator('#lab-toast');
    await expect(toast).toHaveClass(/show/);
    const box = await toast.boundingBox();
    const vpWidth = page.viewportSize().width;
    expect(box).not.toBeNull();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(vpWidth);
  });

  test('2. Dalga 2 (16 deney) hatasız açılır, tuval çizer ve yatay taşma üretmez', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    const wave2Ids = [
      '5.2', '5.3', '5.4', '5.6', '5.10', '5.12',
      '6.3', '6.5', '6.6', '6.9', '6.10', '6.11',
      '7.7', '7.8', '7.9', '7.10'
    ];

    for (const id of wave2Ids) {
      await page.evaluate((expId) => {
        window.FenUpLab.openLabView();
        window.FenUpLab.openExperimentWorkspace(expId);
      }, id);
      await expect(page.locator('#lab-canvas')).toBeVisible();
      await page.waitForTimeout(130);

      const state = await page.evaluate(() => {
        const c = document.getElementById('lab-canvas');
        return {
          w: c ? c.width : 0,
          h: c ? c.height : 0,
          overflow: document.documentElement.scrollWidth > window.innerWidth + 2
        };
      });
      expect(state.w, `${id} canvas width`).toBeGreaterThan(0);
      expect(state.h, `${id} canvas height`).toBeGreaterThan(0);
      expect(state.overflow, `${id} horizontal overflow`).toBe(false);
    }

    expect(errors).toEqual([]);
  });
});
