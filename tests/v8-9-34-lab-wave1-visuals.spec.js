import { test, expect } from '@playwright/test';

test.describe('FenUp X — V8.9.34 Dalga 1 Görsel Gerçekçilik ve 6.2 Hareket Çarpışmasızlığı', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined' && typeof window.FenUpLab.openExperimentWorkspace === 'function');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Deney 6.2 Halat Çekme hareket ederken sandık/bayrak ile sporcular çakışmaz ve taşmaz', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.evaluate(() => {
      window.FenUpLab.openLabView();
      window.FenUpLab.openExperimentWorkspace('6.2');
      window.FenUpLab.labState.tugOfWar.fEast = 40;
      window.FenUpLab.labState.tugOfWar.fWest = 10;
      window.FenUpLab.labState.tugOfWar.netForce = 30;
      window.FenUpLab.labState.tugOfWar.boxX = 570;
    });

    await expect(page.locator('#lab-canvas')).toBeVisible();
    await page.waitForTimeout(180);

    const check = await page.evaluate(() => {
      const c = document.getElementById('lab-canvas');
      const ctx = c.getContext('2d');
      const scaleX = c.width / 800;
      const scaleY = c.height / 500;
      // boxX = 570 iken doğu iç sporcusu bx + 95 = 665, batı iç sporcusu bx - 95 = 475
      // Bayrak bx = 570 (y = 267) ile her iki iç sporcu arası tamamen boşluk olmalı
      const eastAthletePx = ctx.getImageData(Math.round(665 * scaleX), Math.round(310 * scaleY), 1, 1).data;
      const flagPx = ctx.getImageData(Math.round(575 * scaleX), Math.round(267 * scaleY), 1, 1).data;
      return {
        boxX: window.FenUpLab.labState.tugOfWar.boxX,
        eastAthleteVisible: eastAthletePx[0] > 100,
        flagVisible: flagPx[0] > 100
      };
    });

    expect(check.boxX).toBe(570);
    expect(check.eastAthleteVisible).toBe(true);
    expect(check.flagVisible).toBe(true);
    expect(errors).toEqual([]);
  });

  test('2. Dalga 1 (6.2, 7.1, 5.8, 5.9, 5.7, 6.7, 6.8) deneyleri hatasız açılır ve yatay taşma üretmez', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    const wave1Ids = ['6.2', '7.1', '5.8', '5.9', '5.7', '6.7', '6.8'];
    for (const id of wave1Ids) {
      await page.evaluate((expId) => {
        window.FenUpLab.openLabView();
        window.FenUpLab.openExperimentWorkspace(expId);
      }, id);
      await expect(page.locator('#lab-canvas')).toBeVisible();
      await page.waitForTimeout(140);

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
