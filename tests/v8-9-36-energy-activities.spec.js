import { test, expect } from '@playwright/test';

async function openExp72(page) {
  await page.evaluate(() => {
    window.FenUpLab.openLabView();
    window.FenUpLab.openExperimentWorkspace('7.2');
  });
  await expect(page.locator('#lab-canvas')).toBeVisible();
  await expect(page.locator('#quick-controls-7-2')).toBeVisible();
  await page.waitForTimeout(160);
}

test.describe('FenUp X — V8.9.36 Deney 7.2 MEB 7. Sınıf Etkinlik Noktası-5 Uyumu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined' && typeof window.FenUpLab.openExperimentWorkspace === 'function');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Yalnızca 4 MEB kitap etkinliği bulunur, eski U-Rampa kaldırılmıştır ve sürtünme varsayılan kapalıdır', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));

    await openExp72(page);

    // Eski 2. düzenek (U-Rampa) tamamen kaldırılmış olmalı
    await expect(page.locator('#btn-mode-ramp')).toHaveCount(0);

    // 4 kitap etkinliği görünür ve seçilebilir olmalı
    await expect(page.locator('#btn-mode-pendulum')).toBeVisible();
    await expect(page.locator('#btn-mode-basketball')).toBeVisible();
    await expect(page.locator('#btn-mode-spring')).toBeVisible();
    await expect(page.locator('#btn-mode-incline')).toBeVisible();
    await expect(page.locator('#group-modes-7-2 .lab-toggle-btn')).toHaveCount(4);

    // Sürtünme varsayılan kapalı ("Sürtünme kuvvetini ihmal ediniz.")
    await expect(page.locator('#label-energy-friction')).toHaveText('Kapalı');
    const frictionDefault = await page.evaluate(() => window.FenUpLab.labState.energy.frictionEnabled);
    expect(frictionDefault).toBe(false);

    // Formülsüz 7. sınıf TYMM doğrulaması
    const text72 = await page.evaluate(() => {
      const els = [
        document.getElementById('quick-controls-7-2'),
        document.getElementById('metrics-bar-7-2'),
        document.getElementById('vars-container-7-2'),
        document.getElementById('guide-container-7-2')
      ];
      return els.map(e => (e ? e.textContent : '')).join(' ');
    });
    expect(text72).not.toMatch(/\bmgh\b/i);
    expect(text72).not.toMatch(/1\/2\s*mv/i);
    expect(text72).not.toContain('U-Rampa');

    expect(errors).toEqual([]);
  });

  test('2. Her 4 etkinlikte konum durakları, enerji korunumu ve Veri Defteri kaydı hatasız çalışır', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await openExp72(page);

    const activities = [
      {
        btn: '#btn-mode-pendulum',
        mode: 'pendulum',
        expectedName: 'Sarkaç',
        maxEpStop: 0,
        maxEkStop: 1
      },
      {
        btn: '#btn-mode-basketball',
        mode: 'basketball',
        expectedName: 'Basketbol Topu',
        maxEpStop: 0,
        maxEkStop: 2
      },
      {
        btn: '#btn-mode-spring',
        mode: 'spring',
        expectedName: 'Sarmal Yay ve Araba',
        maxEpStop: 0,
        maxEkStop: 2
      },
      {
        btn: '#btn-mode-incline',
        mode: 'incline',
        expectedName: 'Eğik Düzlem ve Araba',
        maxEpStop: 0,
        maxEkStop: 2
      }
    ];

    for (const act of activities) {
      await page.locator(act.btn).click();
      await page.waitForTimeout(140);

      const curMode = await page.evaluate(() => window.FenUpLab.labState.energy.mode);
      expect(curMode).toBe(act.mode);
      await expect(page.locator('#mbar-72-activity')).toHaveText(act.expectedName);

      // En yüksek potansiyel enerji durağı
      await page.locator(`#btn-energy-stop-${act.maxEpStop}`).click();
      await page.waitForTimeout(80);
      const epState = await page.evaluate(() => {
        const e = window.FenUpLab.labState.energy;
        return {
          ep: e.potentialEnergy,
          ek: e.kineticEnergy,
          total: e.totalEnergy,
          isPlaying: e.isPlaying
        };
      });
      expect(epState.isPlaying).toBe(false);
      expect(epState.ep).toBeGreaterThan(epState.total * 0.9);
      expect(epState.ek).toBeLessThan(epState.total * 0.1);
      expect(Math.abs((epState.ep + epState.ek) - epState.total)).toBeLessThan(0.25);

      // En yüksek kinetik enerji durağı
      await page.locator(`#btn-energy-stop-${act.maxEkStop}`).click();
      await page.waitForTimeout(80);
      const ekState = await page.evaluate(() => {
        const e = window.FenUpLab.labState.energy;
        return {
          ep: e.potentialEnergy,
          ek: e.kineticEnergy,
          total: e.totalEnergy,
          overflow: document.documentElement.scrollWidth > window.innerWidth + 2
        };
      });
      expect(ekState.ek).toBeGreaterThan(ekState.total * 0.9);
      expect(ekState.ep).toBeLessThan(ekState.total * 0.1);
      expect(Math.abs((ekState.ep + ekState.ek) - ekState.total)).toBeLessThan(0.25);
      expect(ekState.overflow, `${act.mode} horizontal overflow`).toBe(false);

      // Veri Defterine kaydet
      await page.locator('#btn-record-data-7-2').click();
      await page.waitForTimeout(80);
    }

    // Veri Defteri 4 kayıt içeriyor ve tablo başlıkları doğru olmalı
    const tableInfo = await page.evaluate(() => {
      const headers = Array.from(document.querySelectorAll('#lab-table-thead th')).map(th => th.textContent.trim());
      const rows = Array.from(document.querySelectorAll('#lab-table-body tr')).map(tr => tr.textContent.trim());
      return { headers, rowCount: rows.length, rows };
    });

    expect(tableInfo.headers).toEqual(['#', 'Etkinlik', 'Konum', 'Potansiyel Enerji', 'Kinetik Enerji', 'Toplam Enerji']);
    expect(tableInfo.rowCount).toBe(4);
    expect(tableInfo.rows[0]).toContain('Sarkaç');
    expect(tableInfo.rows[1]).toContain('Basketbol Topu');
    expect(tableInfo.rows[2]).toContain('Sarmal Yay ve Araba');
    expect(tableInfo.rows[3]).toContain('Eğik Düzlem ve Araba');

    expect(errors).toEqual([]);
  });
});
