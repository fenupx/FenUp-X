import { test, expect } from '@playwright/test';

test.describe('FenUp X — V8.9.30 Tam Ekran, Zamanlayıcı, Katman ve Dinleyici Temizliği', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => (
      typeof window.FenUpLab !== 'undefined' &&
      typeof window.FenUpNavigation !== 'undefined'
    ));
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Laboratuvar Tam Ekran: CSS/Native Açılış, Deneyler/Ana Sayfa Çıkışı ve popstate Temizliği', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();
    await page.locator('.lab-welcome-card[data-grade="5"]').click();
    await page.locator('.lab-launch-btn').first().click();
    await expect(page.locator('#lab-workspace-view')).toBeVisible();

    // Tam ekrana geç (native veya WebKit/iOS CSS yedeği aktif olmalı)
    await page.locator('#btn-lab-fullscreen').click();
    await page.waitForTimeout(200);
    const fsActive = await page.evaluate(() => {
      const lab = document.getElementById('lab-view');
      return {
        hasLabClass: !!lab?.classList.contains('is-lab-fullscreen'),
        hasBodyClass: document.body.classList.contains('lab-fullscreen-open'),
        ariaPressed: document.getElementById('btn-lab-fullscreen')?.getAttribute('aria-pressed'),
      };
    });
    expect(fsActive.hasLabClass).toBe(true);
    expect(fsActive.hasBodyClass).toBe(true);
    expect(fsActive.ariaPressed).toBe('true');

    // Deneyler geri butonuna basınca hem native fullscreen hem CSS sınıfları temizlenmeli
    await page.locator('#btn-lab-back-catalog').click();
    await expect(page.locator('#lab-grade-catalog')).toBeVisible();
    await page.waitForTimeout(200);
    const afterBack = await page.evaluate(() => ({
      fsEl: document.fullscreenElement || document.webkitFullscreenElement || null,
      hasLabClass: !!document.getElementById('lab-view')?.classList.contains('is-lab-fullscreen'),
      hasBodyClass: document.body.classList.contains('lab-fullscreen-open'),
    }));
    expect(afterBack.fsEl).toBeNull();
    expect(afterBack.hasLabClass).toBe(false);
    expect(afterBack.hasBodyClass).toBe(false);

    // Deneye tekrar gir, tam ekranı aç, tarayıcı Geri (popstate) ile çık -> yine temizlenmeli
    await page.locator('.lab-launch-btn').first().click();
    await expect(page.locator('#lab-workspace-view')).toBeVisible();
    await page.locator('#btn-lab-fullscreen').click();
    await page.waitForTimeout(200);
    await page.goBack();
    await page.waitForTimeout(250);
    const afterPop = await page.evaluate(() => ({
      fsEl: document.fullscreenElement || document.webkitFullscreenElement || null,
      hasLabClass: !!document.getElementById('lab-view')?.classList.contains('is-lab-fullscreen'),
      hasBodyClass: document.body.classList.contains('lab-fullscreen-open'),
    }));
    expect(afterPop.fsEl).toBeNull();
    expect(afterPop.hasLabClass).toBe(false);
    expect(afterPop.hasBodyClass).toBe(false);
  });

  test('2. Turnuva Modu ve Master Pause Overlay Çıkış / popstate Temizliği', async ({ page }) => {
    await page.locator('#btn-oyun-modulu').click();
    await page.locator('#btn-mode-bireysel').click();
    await page.locator('#btn-skip-draw').click();
    await page.locator('.class-card[data-grade="5"]').click();
    await page.locator('.unit-card').first().click();
    await page.locator('#btn-start-from-rules').click();
    await expect(page.locator('#scene-quiz')).toBeVisible();

    // Master Pause aç
    const pauseBtn = page.locator('.top-controls button[title="Sistemi Duraklat"]');
    if (await pauseBtn.isVisible()) {
      await pauseBtn.click();
    } else {
      await pauseBtn.evaluate(el => el.click());
    }
    await expect(page.locator('#master-pause-overlay')).toBeVisible();

    // Tarayıcı Geri (popstate) yapıldığında pause overlay gizlenmeli
    await page.goBack();
    await page.waitForTimeout(250);
    await expect(page.locator('#master-pause-overlay')).toBeHidden();
  });

  test('3. Akıllı Tahta Modalı Tam Ekran Durumu popstate Sonrası Sıfırlanmalı', async ({ page }) => {
    await page.locator('#btn-oyun-modulu').click();
    await expect(page.locator('#scene-crossroads')).toBeVisible();

    // Akıllı Tahta modalını aç ve tam ekran yap
    const sbBtn = page.locator('#floating-smartboard-btn');
    if (await sbBtn.isVisible()) {
      await sbBtn.click();
    } else {
      await sbBtn.evaluate(el => el.click());
    }
    await expect(page.locator('#smartboard-modal')).toBeVisible();
    await page.locator('#sb-btn-fullscreen').click();
    await expect(page.locator('#smartboard-modal .smartboard-dialog')).toHaveClass(/is-fullscreen/);

    // Tarayıcı Geri (popstate) modalı kapatır ve tam ekranı sıfırlar
    await page.goBack();
    await page.waitForTimeout(250);
    await expect(page.locator('#smartboard-modal')).toBeHidden();
    await expect(page.locator('#smartboard-modal .smartboard-dialog')).not.toHaveClass(/is-fullscreen/);
  });
});
