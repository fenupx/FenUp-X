import { test, expect } from '@playwright/test';

test.describe('Öncelikli Görünürlük ve Sızıntı Zırhı Testi (Mobil & Masaüstü)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Ders ekranı provaya veya değerlendirmeye sızmamalı, OYSS başlığı aktifken gizlenmeli', async ({ page }) => {
    await page.goto('/');

    // 1. Ana sayfadaki "Yazılıya Hazırlık" butonuna tıkla
    const btnYazili = page.locator('#btn-yazili-modulu');
    await expect(btnYazili).toBeVisible();
    await btnYazili.click();

    // Scene açılana kadar bekle
    await expect(page.locator('#scene-yazili')).toBeVisible();

    // Adım 1: Kapsam Görünümü (#exam-view-scope)
    await expect(page.locator('#exam-view-scope')).toBeVisible();
    await expect(page.locator('#exam-view-study')).not.toBeVisible();
    await expect(page.locator('#exam-view-study')).toHaveCSS('display', 'none');

    // "Devam Et" butonuna tıkla (#btn-scope-continue)
    const btnScopeContinue = page.locator('#btn-scope-continue');
    await expect(btnScopeContinue).toBeVisible();
    await btnScopeContinue.click();

    // Adım 2: Tercih Görünümü (#exam-view-choice)
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await expect(page.locator('#exam-view-study')).not.toBeVisible();
    await expect(page.locator('#exam-view-study')).toHaveCSS('display', 'none');

    // "Konu Çalışmaya Başla" butonuna tıkla (#btn-choice-go-study)
    const btnGoStudy = page.locator('#btn-choice-go-study');
    await expect(btnGoStudy).toBeVisible();
    await btnGoStudy.click();

    // Adım 3: Ders Ekranı Aktif (#exam-view-study)
    await expect(page.locator('#exam-view-study')).toBeVisible();
    await expect(page.locator('#scene-yazili')).toHaveClass(/study-active/);

    // OYSS Tanıtım Başlığı ders aktifken kesinlikle gizli olmalı
    await expect(page.locator('#scene-yazili .exam-header-bar')).toHaveCSS('display', 'none');

    // Ders ekranında "Yazılı Provasına Geç" butonuna tıkla (#btn-study-jump-practice)
    const btnToPractice = page.locator('#btn-study-jump-practice, button:has-text("Yazılı Provasına Geç")').first();
    await expect(btnToPractice).toBeVisible();
    await btnToPractice.click();

    // Adım 4a: Prova Ayarları Ekranı Aktif (#practice-setup-box)
    await expect(page.locator('#exam-view-practice')).toBeVisible();
    await expect(page.locator('#scene-yazili')).toHaveClass(/practice-active/);

    // KRİTİK GÖRÜNÜRLÜK ZIRHI: Prova ayarlarında da Ders ekranı KESİNLİKLE gizli olmalı!
    await expect(page.locator('#exam-view-study')).not.toBeVisible();
    await expect(page.locator('#exam-view-study')).toHaveCSS('display', 'none');
    await expect(page.locator('#study-plan-sidebar')).not.toBeVisible();
    await expect(page.locator('#btn-study-fullscreen')).not.toBeVisible();
    await expect(page.locator('#scene-yazili .exam-header-bar')).toHaveCSS('display', 'none');

    // "Başla" butonuna tıkla (#exam-start-practice) -> Ekranda Soru Çözümüne Geç
    const btnStartPractice = page.locator('#exam-start-practice');
    await expect(btnStartPractice).toBeVisible();
    await btnStartPractice.click();

    // Adım 4b: Aktif Soru Alanı (#practice-active-box)
    await expect(page.locator('#practice-active-box')).toBeVisible();

    // Soru ekranında da ders ekranı, çalışma planı ve tam ekran butonları KESİNLİKLE gizli olmalı!
    await expect(page.locator('#exam-view-study')).not.toBeVisible();
    await expect(page.locator('#exam-view-study')).toHaveCSS('display', 'none');
    await expect(page.locator('#study-plan-sidebar')).not.toBeVisible();
    await expect(page.locator('#btn-study-fullscreen')).not.toBeVisible();
    await expect(page.locator('#btn-study-jump-practice')).not.toBeVisible();
    await expect(page.locator('#scene-yazili .exam-header-bar')).toHaveCSS('display', 'none');

    // Üstte tek kompakt buton (#btn-practice-q-picker) görünür olmalı
    await expect(page.locator('#btn-practice-q-picker')).toBeVisible();

    // Dialog onaylayıcı (boş soru uyarısı gelirse onayla)
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // Soruya bir cevap yaz
    const textarea = page.locator('#practice-text-ans');
    if (await textarea.isVisible()) {
      await textarea.fill('Işık ortam değiştirirken kırılır ve odak noktasında toplanır.');
    }

    // Soruları geç: 6 kez "Sonraki Soru" butonuna tıkla
    for (let i = 0; i < 6; i++) {
      const btnNextQ = page.locator('#btn-practice-next-q');
      if (await btnNextQ.isVisible()) {
        await btnNextQ.click();
        await page.waitForTimeout(100);
      }
    }

    // Son soruda "Provayı Bitir" (#btn-practice-finish) butonuna tıkla
    const btnFinish = page.locator('#btn-practice-finish');
    await expect(btnFinish).toBeVisible();
    await btnFinish.click();

    // Adım 5: Değerlendirme Ekranı Aktif (#exam-view-eval)
    await expect(page.locator('#exam-view-eval')).toBeVisible();
    await expect(page.locator('#scene-yazili')).toHaveClass(/eval-active/);

    // Ders ekranı değerlendirmede de KESİNLİKLE gizli olmalı
    await expect(page.locator('#exam-view-study')).not.toBeVisible();
    await expect(page.locator('#exam-view-study')).toHaveCSS('display', 'none');
    await expect(page.locator('#study-plan-sidebar')).not.toBeVisible();
    await expect(page.locator('#scene-yazili .exam-header-bar')).toHaveCSS('display', 'none');
  });

  test('Plan aç/kapat ve tam ekrandan çıkış sonrasında da provaya geçişte ders sızıntısı olmamalı', async ({ page }) => {
    await page.goto('/');

    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-study').click();

    // Ders ekranındayız
    await expect(page.locator('#exam-view-study')).toBeVisible();

    // Planı aç/kapat toggle butonunu dene
    const btnTogglePlan = page.locator('#btn-toggle-study-plan');
    if (await btnTogglePlan.isVisible()) {
      await btnTogglePlan.click(); // Kapat
      await page.waitForTimeout(150);
      await btnTogglePlan.click(); // Tekrar Aç
      await page.waitForTimeout(150);
    }

    // Tam ekrana gir ve çık
    const btnFullscreen = page.locator('#btn-study-fullscreen');
    if (await btnFullscreen.isVisible()) {
      await btnFullscreen.click();
      await page.waitForTimeout(200);
      const btnExitFullscreen = page.locator('#btn-study-fullscreen, button:has-text("Tam Ekrandan Çık")').first();
      await btnExitFullscreen.click();
      await page.waitForTimeout(200);
    }

    // Şimdi Prova Ekranına Geç
    const btnToPractice = page.locator('#btn-study-jump-practice, button:has-text("Yazılı Provasına Geç")').first();
    await btnToPractice.click();

    // Prova ayarları aktif, ders gizli olmalı
    await expect(page.locator('#exam-view-practice')).toBeVisible();
    await expect(page.locator('#exam-view-study')).not.toBeVisible();
    await expect(page.locator('#exam-view-study')).toHaveCSS('display', 'none');
    await expect(page.locator('#study-plan-sidebar')).not.toBeVisible();
    await expect(page.locator('#scene-yazili .exam-header-bar')).toHaveCSS('display', 'none');

    // Başlaya tıkla -> aktif soru ekranında da ders sızıntısı olmamalı
    await page.locator('#exam-start-practice').click();
    await expect(page.locator('#practice-active-box')).toBeVisible();
    await expect(page.locator('#exam-view-study')).not.toBeVisible();
    await expect(page.locator('#exam-view-study')).toHaveCSS('display', 'none');
    await expect(page.locator('#study-plan-sidebar')).not.toBeVisible();
  });
});
