import { test, expect } from '@playwright/test';

test.describe('FenUp X — Sanal Laboratuvar UX Yenilemesi, Müfredat Düzeltmeleri ve Yeni Deneyler', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined' && typeof window.FenUpLab.openExperimentWorkspace === 'function');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. 2 Adımlı Sade Karşılama, Dinamik Deney Sayıları, Arama ve Görünüm Modu (Taşmasız)', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();

    const welcome = page.locator('#lab-welcome-screen');
    const gradeCatalog = page.locator('#lab-grade-catalog');
    await expect(welcome).toBeVisible();
    await expect(gradeCatalog).toBeHidden();

    // Dinamik deney sayıları: 5. Sınıf (12), 6. Sınıf (12), 7. Sınıf (10)
    await expect(page.locator('#lab-welcome-meta-5')).toContainText('12 İnteraktif Deney');
    await expect(page.locator('#lab-welcome-meta-6')).toContainText('12 İnteraktif Deney');
    await expect(page.locator('#lab-welcome-meta-7')).toContainText('10 İnteraktif Deney');

    // Yatay taşma kontrolü (karşılama ekranı)
    const welcomeOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    expect(welcomeOverflow).toBe(false);

    // 5. Sınıfa gir
    await page.locator('.lab-welcome-card[data-grade="5"]').click();
    await expect(welcome).toBeHidden();
    await expect(gradeCatalog).toBeVisible();
    await expect(page.locator('#lab-grade-catalog-title')).toContainText('5. Sınıf');

    // Arama testi: "Hücre"
    await page.locator('#lab-search-input').fill('Hücre');
    await expect(page.locator('.lab-card-title')).toContainText(['Mikroskopla Hücre Gözlemi']);

    // Görünüm modu: Tüm Deneyler (flat) vs Üniteye Göre
    await page.locator('#lab-search-input').fill('');
    await page.locator('#btn-lab-view-flat').click();
    await expect(page.locator('.lab-unit-section')).toHaveCount(0);
    await expect(page.locator('.lab-card')).toHaveCount(12);

    await page.locator('#btn-lab-view-unit').click();
    const unitCount = await page.locator('.lab-unit-section').count();
    expect(unitCount).toBeGreaterThanOrEqual(5);

    // Katalog yatay taşma kontrolü
    const catalogOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    expect(catalogOverflow).toBe(false);

    // Sınıflara geri dön
    await page.locator('#btn-lab-back-welcome').click();
    await expect(welcome).toBeVisible();
  });

  test('2. Deney 7.3 TYMM Sınırı: Sınır Açısı ve Tam Yansıma Olmamalı', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();
    await page.evaluate(() => window.FenUpLab.openExperimentWorkspace('7.3'));

    // Cam -> Hava, 40°
    await page.locator('#select-medium-1').selectOption('glass');
    await page.locator('#select-medium-2').selectOption('air');
    await page.evaluate(() => window.FenUpLab.setIncidentAngle(40));

    const hudStatus = await page.locator('#lab-hud-status').innerText();
    const hudRef = await page.locator('#hud-val-refract').innerText();
    expect(hudStatus).toContain('Normalden Uzaklaşır');
    expect(hudStatus).not.toContain('TAM YANSIMA');
    expect(hudStatus).not.toContain('Sınır Açısı');
    expect(hudRef).not.toContain('Yok');
  });

  test('3. Deney 5.9 ve 6.3 Veri Defteri Kayıt Düzeltmeleri', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();

    // 5.9 kaydı Metal/Tahta/Plastik olmalı
    await page.evaluate(() => window.FenUpLab.openExperimentWorkspace('5.9'));
    await page.locator('#btn-record-data-5-9').click();
    const row59 = await page.locator('#lab-table-body').innerText();
    expect(row59).toContain('Metal');
    expect(row59).not.toContain('Bakır > Alüminyum > Demir');

    // 6.3 Gidiş-Dönüş modu kaydı
    await page.evaluate(() => window.FenUpLab.openExperimentWorkspace('6.3'));
    await page.locator('#btn-graph-vt').click();
    await page.locator('#btn-record-data-6-3').click();
    const row63 = await page.locator('#lab-table-body').innerText();
    expect(row63).toContain('Gidiş-Dönüş');
  });

  test('4. Deney 7.5 Buharlaştırma (Tuz-Su) Modu', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();
    await page.evaluate(() => window.FenUpLab.openExperimentWorkspace('7.5'));

    await page.locator('#btn-mode-evap').click();
    await expect(page.locator('#stats-grid-evap')).toBeVisible();
    await page.locator('#btn-evap-heater').click();
    await page.waitForTimeout(250);
    await page.locator('#btn-record-data-7-5').click();
    await expect(page.locator('#lab-table-body')).toContainText('Buharlaştırma');
  });

  test('5. Yeni Ders Kitabı Deneyleri (5.11, 5.12, 6.11) Çalışma Doğrulaması', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();

    // 5.11 Hücre
    await page.evaluate(() => window.FenUpLab.openExperimentWorkspace('5.11'));
    await expect(page.locator('#vars-container-5-11')).toBeVisible();
    await page.locator('#btn-511-animal').click();
    await expect(page.locator('#mbar-511-specimen')).toContainText('Hayvan');
    await page.locator('#btn-record-data-5-11').click();
    await expect(page.locator('#lab-table-body')).toContainText('Epitel');

    // 5.12 Saydam/Yarı Saydam/Opak
    await page.evaluate(() => window.FenUpLab.openExperimentWorkspace('5.12'));
    await expect(page.locator('#vars-container-5-12')).toBeVisible();
    await page.locator('#btn-512-opaque').click();
    await expect(page.locator('#metric-512-class')).toContainText('Opak');
    await page.locator('#btn-record-data-5-12').click();
    await expect(page.locator('#lab-table-body')).toContainText('Tahta Levha');

    // 6.11 Newton Renk Çarkı ve Renkli Işıklar
    await page.evaluate(() => window.FenUpLab.openExperimentWorkspace('6.11'));
    await expect(page.locator('#vars-container-6-11')).toBeVisible();
    await page.locator('#btn-611-speed-max').click();
    await expect(page.locator('#mbar-611-perceived')).toContainText('Beyaz');
    await page.locator('#btn-611-mode-filter').click();
    await page.locator('#btn-611-light-blue').click();
    await page.locator('#pill-611-obj-red').click();
    await expect(page.locator('#mbar-611-perceived')).toContainText('Siyah');
    await page.locator('#btn-record-data-6-11').click();
    await expect(page.locator('#lab-table-body')).toContainText('Siyah');
  });
});
