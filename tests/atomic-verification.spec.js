import { test, expect } from '@playwright/test';

test.describe('FenUp X — Cerrahi Onarım ve Eşleşme Doğrulama Paketi', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Masaüstünde (1363x936) Ana Sayfa Footer Görünür Olmalı ve Geri Dönüşlerde Korunmalı', async ({ page }) => {
    await page.setViewportSize({ width: 1363, height: 936 });
    await page.goto('/');

    const footer = page.locator('#main-footer');
    await expect(footer).toBeVisible();
    await expect(footer).not.toHaveCSS('display', 'none');

    // Sanal Laboratuvara gir
    const btnLab = page.locator('#btn-deney-modulu');
    await expect(btnLab).toBeVisible();
    await btnLab.click();

    await expect(page.locator('#lab-view')).toBeVisible();

    // Lab girişinde (katalog görünümünde) footer masaüstünde görünür olmalı
    await expect(footer).toBeVisible();

    // Lab'da geri dön (Ana Sayfa)
    const btnLabHome = page.locator('#btn-lab-back-home');
    await expect(btnLabHome).toBeVisible();
    await btnLabHome.click();

    // Ana sayfada footer tekrar görünür olmalı
    await expect(page.locator('#scene-home')).toBeVisible();
    await expect(footer).toBeVisible();

    // Yazılı modülüne gir
    const btnYazili = page.locator('#btn-yazili-modulu');
    await expect(btnYazili).toBeVisible();
    await btnYazili.click();

    await expect(page.locator('#scene-yazili')).toBeVisible();
    // Kapsam ekranında footer masaüstünde görünür
    await expect(footer).toBeVisible();

    // Yazılıdan geri dön
    const btnExamHome = page.locator('#btn-exam-step-back');
    await expect(btnExamHome).toBeVisible();
    await btnExamHome.click();

    // Ana sayfada footer görünür kalmalı
    await expect(page.locator('#scene-home')).toBeVisible();
    await expect(footer).toBeVisible();
  });

  test('2. Mobilde (< 820px) Footer Gizlenmeli, Menü İçinde 5 Bağlantı Yer Almalı', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    // Footer mobilde kesinlikle gizli
    const footer = page.locator('#main-footer');
    await expect(footer).toHaveCSS('display', 'none');

    // Menü butonu görünür ve tıklanabilir
    const btnMenu = page.locator('#btn-mobile-menu');
    await expect(btnMenu).toBeVisible();
    await btnMenu.click();

    // Menü açılır ve içindeki mobil alt bilgi alanı görünür
    const navFooter = page.locator('.mobile-nav-footer-section');
    await expect(navFooter).toBeVisible();

    // 5 bağlantı/eylem: YouTube, Instagram, Gizlilik Politikası, Kullanım Koşulları, Çerez Politikası
    const ytLink = navFooter.locator('a[href*="youtube.com"]');
    const igLink = navFooter.locator('a[href*="instagram.com"]');
    const kvkkBtn = navFooter.locator('button.btn-kvkk-open');
    const termsBtn = navFooter.locator('button.btn-terms-open');
    const cookiesBtn = navFooter.locator('button.btn-cookies-open');

    await expect(ytLink).toBeVisible();
    await expect(igLink).toBeVisible();
    await expect(kvkkBtn).toBeVisible();
    await expect(termsBtn).toBeVisible();
    await expect(cookiesBtn).toBeVisible();
  });

  test('3. Birleşik Ana Sayfa Butonları Turkuaz Çerçeveli Parlak Standartta Olmalı', async ({ page }) => {
    await page.goto('/');

    // Yazılı Kapsam Girişi butonu
    const btnYazili = page.locator('#btn-yazili-modulu');
    await btnYazili.click();
    const btnExamStepBack = page.locator('#btn-exam-step-back');
    await expect(btnExamStepBack).toHaveClass(/scope-back-home/);
    await expect(btnExamStepBack).toHaveClass(/btn-back-home/);
    await expect(btnExamStepBack).toHaveClass(/btn-lab-nav-home/);

    // Border rengi / neon stili
    const border = await btnExamStepBack.evaluate((el) => window.getComputedStyle(el).borderTopColor);
    expect(border).toContain('210');

    // Ana sayfaya dön
    await btnExamStepBack.click();

    // Sanal Lab ana sayfa butonu
    const btnLab = page.locator('#btn-deney-modulu');
    await btnLab.click();
    const btnLabHome = page.locator('#btn-lab-back-home');
    await expect(btnLabHome).toHaveClass(/btn-lab-nav-home/);
    const labBorder = await btnLabHome.evaluate((el) => window.getComputedStyle(el).borderTopColor);
    expect(labBorder).toContain('210');
  });

  test('4. Deney 7.1 Tekil Kontrol ve Maarif Değişkenleri Doğrulaması', async ({ page }) => {
    await page.goto('/');
    const btnLab = page.locator('#btn-deney-modulu');
    await btnLab.click();

    await page.evaluate(() => {
      window.FenUpLab.openExperimentWorkspace('7.1');
    });

    // Canvas altı hızlı kontroller görünür
    const qc71 = page.locator('#quick-controls-7-1');
    await expect(qc71).toBeVisible();
    await expect(page.locator('#btn-scenario-horizontal')).toBeVisible();
    await expect(page.locator('#btn-scenario-lift')).toBeVisible();
    await expect(page.locator('#btn-scenario-carry')).toBeVisible();
    await expect(page.locator('#btn-scenario-wall')).toBeVisible();
    await expect(page.locator('#btn-work-friction')).toBeVisible();

    // Sağ panelde yinelenen senaryo ve sürtünme butonları kaldırılmış olmalı
    await expect(page.locator('#pill-scenario-horizontal')).toHaveCount(0);
    await expect(page.locator('#pill-work-friction-off')).toHaveCount(0);

    // Maarif değişkenleri ve ölçüm değerleri yerinde olmalı
    await expect(page.locator('#vars-container-7-1')).toBeVisible();
    await expect(page.locator('#metric-work-joule')).toBeVisible();
  });

  test('5. Deney 7.2 Tekil Kontrol Doğrulaması', async ({ page }) => {
    await page.goto('/');
    const btnLab = page.locator('#btn-deney-modulu');
    await btnLab.click();

    await page.evaluate(() => {
      window.FenUpLab.openExperimentWorkspace('7.2');
    });

    // Canvas altı kontroller
    const qc72 = page.locator('#quick-controls-7-2');
    await expect(qc72).toBeVisible();
    await expect(page.locator('#btn-mode-pendulum')).toBeVisible();
    await expect(page.locator('#btn-mode-ramp')).toBeVisible();
    await expect(page.locator('#btn-energy-friction')).toBeVisible();

    // Sağ panelde yinelenen butonlar bulunmamalı
    await expect(page.locator('#pill-energy-pendulum')).toHaveCount(0);
    await expect(page.locator('#pill-energy-friction-off')).toHaveCount(0);
  });

  test('6. Deney 6.1 Tekil Kontrol ve Sıralama Doğrulaması', async ({ page }) => {
    await page.goto('/');
    const btnLab = page.locator('#btn-deney-modulu');
    await btnLab.click();

    await page.evaluate(() => {
      window.FenUpLab.openExperimentWorkspace('6.1');
    });

    // Canvas altı kontroller
    await expect(page.locator('#btn-eclipse-mode-solar')).toBeVisible();
    await expect(page.locator('#btn-eclipse-mode-lunar')).toBeVisible();

    // Sağ panelde yinelenen tutulma türü seçim pill'leri bulunmamalı
    await expect(page.locator('#pill-eclipse-solar')).toHaveCount(0);
    await expect(page.locator('#pill-eclipse-lunar')).toHaveCount(0);

    // Açı slider'ı ve hız seçenekleri korunmalı
    await expect(page.locator('#slider-eclipse-angle')).toBeVisible();
    await expect(page.locator('#pill-eclipse-speed-normal')).toBeVisible();
  });

  test('7. Deney 7.7 Cam-İpek ve Ebonit-Yün Senkronizasyonu ve Çekirdek Proton Koruması', async ({ page }) => {
    await page.goto('/');
    const btnLab = page.locator('#btn-deney-modulu');
    await btnLab.click();

    await page.evaluate(() => {
      window.FenUpLab.openExperimentWorkspace('7.7');
    });

    // Başlangıç çifti Ebonit + Yün
    const btnEb = page.locator('#btn-pair-ebonite');
    const btnGl = page.locator('#btn-pair-glass');
    await expect(btnEb).toHaveClass(/active/);
    await expect(page.locator('#label-electro-rod')).toHaveText(/Ebonit/);
    await expect(page.locator('#label-electro-cloth')).toHaveText(/Yün/);
    await expect(page.locator('#mbar-77-rod')).toHaveText(/Ebonit/);

    // Cam + İpek çiftine geç
    await btnGl.click();
    await expect(btnGl).toHaveClass(/active/);
    await expect(btnEb).not.toHaveClass(/active/);
    await expect(page.locator('#label-electro-rod')).toHaveText(/Cam/);
    await expect(page.locator('#label-electro-cloth')).toHaveText(/İpek/);
    await expect(page.locator('#mbar-77-rod')).toHaveText(/Cam/);
    await expect(page.locator('#mbar-77-cloth')).toHaveText(/İpek/);

    // Pedagojik metin proton korunumunu bilimsel olarak ifade etmeli
    const pText = page.locator('#electro-pedagogical-text');
    await expect(pText).toContainText('protonlar aktarılmaz');
    await expect(pText).toContainText('yalnızca elektronlar');
  });

  test('8. Gizli Sahnelerin Sıfır Boyut ve Sıfır Yer Kaplama Güvencesi', async ({ page }) => {
    await page.goto('/');

    // Ana sayfadayken scene-yazili ve alt adımlarının boyutu ve flex yer kaplaması sıfır olmalı
    const sceneYazili = page.locator('#scene-yazili');
    await expect(sceneYazili).toHaveCSS('display', 'none');

    const studyView = page.locator('#exam-view-study');
    await expect(studyView).toHaveCSS('display', 'none');
    const box = await studyView.boundingBox();
    expect(box).toBeNull();
  });
});
