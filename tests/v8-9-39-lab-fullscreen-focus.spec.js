import { test, expect } from '@playwright/test';

test.describe('FenUp X — V8.9.39 Sanal Laboratuvar Tam Ekran Sunum Modu ve Açılır Veri Defteri', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => (
      typeof window.FenUpLab !== 'undefined' &&
      typeof window.FenUpNavigation !== 'undefined'
    ));
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Tam ekranda Veri Defteri varsayılan gizli, tuval geniş ve alt kontroller görünür/tıklanabilir olmalı', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();
    await page.locator('.lab-welcome-card[data-grade="7"]').click();
    await page.locator('.lab-launch-btn[data-exp-id="7.2"]').click();
    await expect(page.locator('#lab-workspace-view')).toBeVisible();
    await page.waitForTimeout(150);

    // Normal modda Veri Defteri butonu gizli, sağ panel görünür olmalı
    await expect(page.locator('#btn-lab-fs-notebook')).toBeHidden();
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
        hasDrawerOpen: !!lab?.classList.contains('is-lab-fs-notebook-open'),
        hasBodyClass: document.body.classList.contains('lab-fullscreen-open'),
        fsPressed: document.getElementById('btn-lab-fullscreen')?.getAttribute('aria-pressed'),
        nbExpanded: document.getElementById('btn-lab-fs-notebook')?.getAttribute('aria-expanded'),
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
      };
    });

    expect(fsState.hasFs).toBe(true);
    expect(fsState.hasDrawerOpen).toBe(false);
    expect(fsState.hasBodyClass).toBe(true);
    expect(fsState.fsPressed).toBe('true');
    expect(fsState.nbExpanded).toBe('false');
    expect(fsState.scrollWidth).toBeLessThanOrEqual(fsState.innerWidth + 2);

    // Sağ panel varsayılan olarak gizli, üst Veri Defteri butonu görünür olmalı
    await expect(page.locator('#lab-sidebar-section')).toBeHidden();
    await expect(page.locator('#btn-lab-fs-notebook')).toBeVisible();

    // Geniş ekranlarda (masaüstü/ETAP) tuval belirgin biçimde genişlemeli
    const fsCanvasBox = await page.locator('#lab-canvas').boundingBox();
    expect(fsCanvasBox).not.toBeNull();
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 1025) {
      expect(fsCanvasBox.width).toBeGreaterThan(normalCanvasBox.width + 80);
    }

    // Alt değişken kontrolleri ve metrik şeridi görünür ve tıklanabilir olmalı
    await expect(page.locator('#metrics-bar-7-2')).toBeVisible();
    await expect(page.locator('#quick-controls-7-2')).toBeVisible();
    const ballModeBtn = page.locator('#quick-controls-7-2 button[data-energy-mode="basketball"]');
    await ballModeBtn.click();
    await expect(ballModeBtn).toHaveClass(/active/);

    // Üst çubuktaki "Veri Defteri" butonuna basınca çekmece açılmalı
    await page.locator('#btn-lab-fs-notebook').click();
    await page.waitForTimeout(150);
    await expect(page.locator('#lab-view')).toHaveClass(/is-lab-fs-notebook-open/);
    await expect(page.locator('#btn-lab-fs-notebook')).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#lab-sidebar-section')).toBeVisible();

    // Çekmece içinden Veri Defteri sekmesine geçildiğinde tablo paneli görünmeli
    await page.locator('#lab-panel-tabs .lab-tab-btn[data-tab="data"]').click();
    await expect(page.locator('#lab-notebook-panel')).toBeVisible();

    // Aynı "Veri Defteri" butonuna tekrar basınca çekmece kapanmalı
    await page.locator('#btn-lab-fs-notebook').click();
    await page.waitForTimeout(150);
    await expect(page.locator('#lab-view')).not.toHaveClass(/is-lab-fs-notebook-open/);
    await expect(page.locator('#btn-lab-fs-notebook')).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#lab-sidebar-section')).toBeHidden();

    // Tekrar açıp çekmece içi Kapat butonuyla kapatılabilmeli
    await page.locator('#btn-lab-fs-notebook').click();
    await expect(page.locator('#lab-sidebar-section')).toBeVisible();
    await page.locator('#btn-lab-fs-notebook-close').click();
    await expect(page.locator('#lab-sidebar-section')).toBeHidden();
    await expect(page.locator('#btn-lab-fs-notebook')).toHaveAttribute('aria-expanded', 'false');

    // Tam ekrandan çıkıldığında tüm sınıflar sıfırlanmalı ve normal düzen geri gelmeli
    await page.locator('#btn-lab-fullscreen').click();
    await page.waitForTimeout(200);
    await expect(page.locator('#lab-view')).not.toHaveClass(/is-lab-fullscreen/);
    await expect(page.locator('#lab-view')).not.toHaveClass(/is-lab-fs-notebook-open/);
    await expect(page.locator('#btn-lab-fs-notebook')).toBeHidden();
    await expect(page.locator('#lab-sidebar-section')).toBeVisible();
  });

  test('2. Tam ekran + Veri Defteri açıkken Deneyler veya popstate çıkışında tam temizlik yapılmalı', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();
    await page.locator('.lab-welcome-card[data-grade="6"]').click();
    await page.locator('.lab-launch-btn[data-exp-id="6.12"]').click();
    await expect(page.locator('#lab-workspace-view')).toBeVisible();

    // Tam ekran + Veri Defteri aç
    await page.locator('#btn-lab-fullscreen').click();
    await page.waitForTimeout(150);
    await page.locator('#btn-lab-fs-notebook').click();
    await expect(page.locator('#lab-view')).toHaveClass(/is-lab-fs-notebook-open/);

    // Tarayıcı Geri (popstate) ile çık
    await page.goBack();
    await page.waitForTimeout(250);

    const afterPop = await page.evaluate(() => {
      const lab = document.getElementById('lab-view');
      return {
        fsEl: document.fullscreenElement || document.webkitFullscreenElement || null,
        hasFs: !!lab?.classList.contains('is-lab-fullscreen'),
        hasDrawerOpen: !!lab?.classList.contains('is-lab-fs-notebook-open'),
        hasBodyClass: document.body.classList.contains('lab-fullscreen-open'),
        nbExpanded: document.getElementById('btn-lab-fs-notebook')?.getAttribute('aria-expanded'),
      };
    });

    expect(afterPop.fsEl).toBeNull();
    expect(afterPop.hasFs).toBe(false);
    expect(afterPop.hasDrawerOpen).toBe(false);
    expect(afterPop.hasBodyClass).toBe(false);
    expect(afterPop.nbExpanded).toBe('false');
  });
});
