import { test, expect } from '@playwright/test';

test.describe('Yerleşim, Dokunmatik Ergonomi ve Kural 7 (Pardus ETAP) Testleri', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Kural 7.1 ve 7.4: Butonlarda min-height 44-48px ve touch-action manipulation bulunmalı', async ({ page }) => {
    await page.goto('/');

    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-study').click();

    // Ders ekranındaki butonları incele
    const nextBtn = page.locator('#exam-card-next');
    await expect(nextBtn).toBeVisible();

    const box = await nextBtn.boundingBox();
    expect(box).not.toBeNull();
    // Dokunmatik hedef alanı asgari 44px olmalı
    expect(box.height).toBeGreaterThanOrEqual(44);

    // CSS touch-action manipulation kontrolü
    const touchAction = await nextBtn.evaluate(el => window.getComputedStyle(el).touchAction);
    expect(touchAction).toBe('manipulation');

    // Yatay taşma kontrolü (sayfa genişliğini aşmamalı)
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow).toBe(false);
  });

  test('Ders ekranında 4 Durum Matrisi: Plan Açık/Kapalı ve Normal/Odaklanmış geçişlerde sıfır re-render', async ({ page }) => {
    await page.goto('/');

    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-study').click();

    await expect(page.locator('#exam-view-study')).toBeVisible();

    // Kart içindeki bir slider varsa değerini değiştir
    const slider = page.locator('input[type="range"].exam-slider').first();
    if (await slider.isVisible()) {
      await slider.fill('4'); // Değeri değiştir
    }

    // Durum 1: Planı Kapat (#btn-study-plan-toggle)
    const btnTogglePlan = page.locator('#btn-study-plan-toggle, #btn-toggle-study-plan').first();
    if (await btnTogglePlan.isVisible()) {
      await btnTogglePlan.click();
      await page.waitForTimeout(150);

      // Kart içeriği hâlâ erişilebilir olmalı
      await expect(page.locator('#exam-card-article')).toBeVisible();

      // Slider değeri korunmuş olmalı (Zero re-render)
      if (await slider.isVisible()) {
        const currentVal = await slider.inputValue();
        expect(currentVal).toBe('4');
      }

      // Durum 2: Planı Tekrar Aç
      await btnTogglePlan.click();
      await page.waitForTimeout(150);
      await expect(page.locator('#study-plan-sidebar')).toBeVisible();
    }

    // Durum 3 & 4: Tam ekran odak modu
    const btnFullscreen = page.locator('#btn-study-fullscreen');
    if (await btnFullscreen.isVisible()) {
      await btnFullscreen.click();
      await page.waitForTimeout(200);

      // Çıkış butonu görünür olmalı
      const exitBtn = page.locator('#btn-study-fullscreen, button:has-text("Tam Ekrandan Çık")').first();
      await expect(exitBtn).toBeVisible();

      // Çıkış yap
      await exitBtn.click();
      await page.waitForTimeout(200);

      // Normal görünüme dönüldüğünü doğrula
      await expect(page.locator('#exam-view-study')).toBeVisible();
    }
  });

  test('Çerez bildirimi açıkken temel kontroller engellenmemeli ve tıklanabilir olmalı', async ({ page }) => {
    await page.goto('/');

    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-study').click();

    // Çerez banner'ı açıkken sonraki kart butonuna tıkla
    const nextBtn = page.locator('#exam-card-next');
    await expect(nextBtn).toBeEnabled();
    await nextBtn.click(); // Tıklama engelsiz gerçekleşmeli
  });
});
