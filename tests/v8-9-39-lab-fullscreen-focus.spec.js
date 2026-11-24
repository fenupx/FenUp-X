import { test, expect } from '@playwright/test';

test.describe('FenUp X — V8.9.40 Tam Ekran Sunum Modunda Çekmecesiz Tek Tık Gözlemi Kaydet', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => (
      typeof window.FenUpLab !== 'undefined' &&
      typeof window.FenUpNavigation !== 'undefined'
    ));
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Tam ekranda sağ panel gizli kalmalı, tuval genişlemeli ve Gözlemi Kaydet tuvalin önünü kapatmadan kayıt alıp Veri Defterine aktarmalı', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();
    await page.locator('.lab-welcome-card[data-grade="7"]').click();
    await page.locator('.lab-launch-btn[data-exp-id="7.2"]').click();
    await expect(page.locator('#lab-workspace-view')).toBeVisible();
    await page.waitForTimeout(150);

    // Eski çekmece düğmesi olmamalı; normal modda Gözlemi Kaydet gizli, sağ panel görünür olmalı
    await expect(page.locator('#btn-lab-fs-notebook')).toHaveCount(0);
    await expect(page.locator('#btn-lab-fs-record')).toBeHidden();
    await expect(page.locator('#lab-sidebar-section')).toBeVisible();

    const normalCanvasBox = await page.locator('#lab-canvas').boundingBox();
    expect(normalCanvasBox).not.toBeNull();

    // Tam ekrana geç
    await page.locator('#btn-lab-fullscreen').click();
    await page.waitForTimeout(220);

    const fsState = await page.evaluate(() => {
      const lab = document.getElementById('lab-view');
      return {
        hasFs: !!lab?.classList.contains('is-lab-fullscreen'),
        hasBodyClass: document.body.classList.contains('lab-fullscreen-open'),
        fsPressed: document.getElementById('btn-lab-fullscreen')?.getAttribute('aria-pressed'),
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
      };
    });

    expect(fsState.hasFs).toBe(true);
    expect(fsState.hasBodyClass).toBe(true);
    expect(fsState.fsPressed).toBe('true');
    expect(fsState.scrollWidth).toBeLessThanOrEqual(fsState.innerWidth + 2);

    // Sağ panel gizli, üst Gözlemi Kaydet butonu görünür ve sayaç (0) olmalı
    await expect(page.locator('#lab-sidebar-section')).toBeHidden();
    await expect(page.locator('#btn-lab-fs-record')).toBeVisible();
    await expect(page.locator('#lab-fs-record-count')).toHaveText('(0)');

    // Geniş ekranlarda (masaüstü/ETAP) tuval belirgin biçimde genişlemeli
    const fsCanvasBox = await page.locator('#lab-canvas').boundingBox();
    expect(fsCanvasBox).not.toBeNull();
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 1025) {
      expect(fsCanvasBox.width).toBeGreaterThan(normalCanvasBox.width + 80);
    }

    // 1. gözlemi kaydet (Sarkaç) -> hiçbir çekmece açılmamalı, sayaç (1) olmalı
    await page.locator('#btn-lab-fs-record').click();
    await expect(page.locator('#lab-sidebar-section')).toBeHidden();
    await expect(page.locator('#lab-fs-record-count')).toHaveText('(1)');

    // Alt değişken kontrolleri görünür ve tıklanabilir olmalı: Basketbol Topu moduna geçip 2. gözlemi kaydet
    await expect(page.locator('#metrics-bar-7-2')).toBeVisible();
    await expect(page.locator('#quick-controls-7-2')).toBeVisible();
    const ballModeBtn = page.locator('#quick-controls-7-2 button[data-energy-mode="basketball"]');
    await ballModeBtn.click();
    await expect(ballModeBtn).toHaveClass(/active/);

    await page.locator('#btn-lab-fs-record').click();
    await expect(page.locator('#lab-sidebar-section')).toBeHidden();
    await expect(page.locator('#lab-fs-record-count')).toHaveText('(2)');

    // Tam ekrandan çıkıldığında Gözlemi Kaydet gizlenmeli ve kaydedilen 2 satır Veri Defteri tablosunda görünmeli
    await page.locator('#btn-lab-fullscreen').click();
    await page.waitForTimeout(200);
    await expect(page.locator('#lab-view')).not.toHaveClass(/is-lab-fullscreen/);
    await expect(page.locator('#btn-lab-fs-record')).toBeHidden();
    await expect(page.locator('#lab-sidebar-section')).toBeVisible();

    const dataTabBtn = page.locator('.lab-tab-btn[data-tab="data"]:visible').first();
    await dataTabBtn.click();
    await expect(page.locator('#lab-notebook-panel')).toBeVisible();
    await expect(page.locator('#lab-table-body tr')).toHaveCount(2);
  });

  test('2. Tam ekranda sıfırlama sayacı sıfırlamalı; Deneyler veya popstate çıkışında tam temizlik yapılmalı', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();
    await page.locator('.lab-welcome-card[data-grade="6"]').click();
    await page.locator('.lab-launch-btn[data-exp-id="6.12"]').click();
    await expect(page.locator('#lab-workspace-view')).toBeVisible();

    await page.locator('#btn-lab-fullscreen').click();
    await page.waitForTimeout(150);
    await expect(page.locator('#lab-fs-record-count')).toHaveText('(0)');

    await page.locator('#btn-lab-fs-record').click();
    await expect(page.locator('#lab-fs-record-count')).toHaveText('(1)');

    // Sıfırla butonuna basıldığında sayaç tekrar (0) olmalı
    await page.locator('#btn-lab-reset').click();
    await expect(page.locator('#lab-fs-record-count')).toHaveText('(0)');

    // Tarayıcı Geri (popstate) ile çık
    await page.goBack();
    await page.waitForTimeout(250);

    const afterPop = await page.evaluate(() => {
      const lab = document.getElementById('lab-view');
      return {
        fsEl: document.fullscreenElement || document.webkitFullscreenElement || null,
        hasFs: !!lab?.classList.contains('is-lab-fullscreen'),
        hasBodyClass: document.body.classList.contains('lab-fullscreen-open'),
      };
    });

    expect(afterPop.fsEl).toBeNull();
    expect(afterPop.hasFs).toBe(false);
    expect(afterPop.hasBodyClass).toBe(false);
    await expect(page.locator('#btn-lab-fs-record')).toBeHidden();
  });
});
