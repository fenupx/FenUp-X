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
    const btnBack = page.locator('#btn-exam-step-back');
    await expect(btnBack).toBeVisible();
    await btnBack.click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
  });

  test('Sonuç ekranında sayfa kaydırılırken .top-header opak kalmalı, içerikle örtüşmemeli ve yinelenen Ana Sayfa butonu gizli olmalı', async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());

    // Yazılı modülünü aç ve provaya başla
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    // 7. soruya kadar ilerle ve bitir
    for (let i = 0; i < 6; i++) {
      await page.locator('#btn-practice-next-q').click();
    }
    await page.locator('#btn-practice-finish').click();
    await expect(page.locator('#exam-view-eval')).toBeVisible();

    // Değerlendirmeyi tamamla ve özete geç
    for (let i = 0; i < 6; i++) {
      await page.locator('.exam-criterion-item').first().click();
      await page.locator('#btn-eval-next-q').click();
    }
    await page.locator('.exam-criterion-item').first().click();
    await page.locator('#btn-eval-to-summary').click();

    // Sonuç ekranındayız
    await expect(page.locator('#exam-view-summary')).toBeVisible();

    // 1. Yinelenen Ana Sayfa butonunun ve modül başlık çubuğunun gizli olduğunu doğrula
    await expect(page.locator('#exam-view-summary #btn-exam-back-home')).toBeHidden();
    await expect(page.locator('#scene-yazili .exam-header-bar')).toBeHidden();

    // 2. Ana sitedeki tek .top-header Ana Sayfa butonu görünür ve tıklanabilir olmalı
    const topHomeBtn = page.locator('.top-header .header-home-btn');
    if (page.viewportSize().width <= 820) await page.locator('#btn-mobile-menu').click();
    await expect(topHomeBtn).toBeVisible();

    // 3. Başlık opak yüzey kontrolü
    const header = page.locator('.top-header');
    const headerBox = await header.boundingBox();
    expect(headerBox.y).toBe(0);

    const headerStyles = await header.evaluate(el => {
      const s = window.getComputedStyle(el);
      return {
        bg: s.backgroundColor,
        position: s.position,
        borderBottom: s.borderBottomWidth,
        backdropFilter: s.backdropFilter || s.webkitBackdropFilter
      };
    });
    expect(headerStyles.position).toBe('fixed');
    expect(headerStyles.bg).toMatch(/rgba?\(10,\s*15,\s*30/);

    // 4. Sayfayı aşağı kaydır
    await page.evaluate(() => window.scrollTo(0, 350));
    await page.waitForTimeout(200);

    // Başlık hala y=0'da sabit kalmalı
    const headerBoxAfterScroll = await header.boundingBox();
    expect(headerBoxAfterScroll.y).toBe(0);

    // Başlık Ana Sayfa butonuna kaydırılmış durumdayken tıklanabilmeli
    await topHomeBtn.click();
    // Ana sayfaya dönülmeli
    await expect(page.locator('#scene-home')).toBeVisible();
  });
});

