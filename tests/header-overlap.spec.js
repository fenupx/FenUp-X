import { test, expect } from '@playwright/test';

test.describe('Üst Başlık ve Ana Sayfa Butonu Örtüşme & Tıklanabilirlik Zırhı', () => {
  test('Mobilde .top-header alttaki sınav üst araç çubuğunu ve prova kontrollerini örtmemeli', async ({ page }) => {
    await page.goto('/');

    // Yazılı modülünü aç
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-study').click();

    // Ders ekranındayız
    await expect(page.locator('#exam-view-study')).toBeVisible();

    // 1. Ölçümler: .top-header ve üstteki çalışma araçları
    const headerBox = await page.locator('.top-header').boundingBox();
    const studyToolbar = page.locator('.study-top-bar, .study-toolbar-left').first();
    const toolbarBox = await studyToolbar.boundingBox();

    // Ders araçları top-header'ın kesinlikle altında kalmalı (y >= header.bottom)
    if (headerBox && toolbarBox) {
      const headerBottom = headerBox.y + headerBox.height;
      expect(toolbarBox.y).toBeGreaterThanOrEqual(headerBottom - 5);
    }

    // Ders araç çubuğundaki "Planı Gizle / Göster" butonuna doğrudan tıklanabilmeli
    const togglePlanBtn = page.locator('#btn-toggle-study-plan');
    if (await togglePlanBtn.isVisible()) {
      await togglePlanBtn.click();
      await expect(page.locator('.exam-cards-layout')).toHaveClass(/plan-collapsed/);
      await togglePlanBtn.click();
      await expect(page.locator('.exam-cards-layout')).not.toHaveClass(/plan-collapsed/);
    }

    // 2. Şimdi Prova Ekranına Geç
    await page.locator('#btn-study-jump-practice').click();
    await page.locator('#exam-start-practice').click();
    await expect(page.locator('#practice-active-box')).toBeVisible();

    // Prova ekranı üst gezinme çubuğu
    const practiceTopBar = page.locator('.practice-top-bar');
    const practiceTopBox = await practiceTopBar.boundingBox();

    if (headerBox && practiceTopBox) {
      const headerBottom = headerBox.y + headerBox.height;
      expect(practiceTopBox.y).toBeGreaterThanOrEqual(headerBottom - 5);
    }

    // Üstteki "Hazırlık Ekranı" butonuna gerçekten tıklanabilmeli (hit testing)
    const btnBack = page.locator('#practice-active-box #btn-practice-back-choice');
    await expect(btnBack).toBeVisible();
    await btnBack.click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
  });
});

