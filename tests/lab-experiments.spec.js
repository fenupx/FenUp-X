import { test, expect } from '@playwright/test';

test.describe('FenUp X — A Grubu Laboratuvar Kitap Eşleşmesi ve Davranış Doğrulama Paketi', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined' && typeof window.FenUpLab.openExperimentWorkspace === 'function');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Deney 6.8 Gravzant: 5 Aşamalı Tam Döngü, Başlangıç Hazır Durumu ve Hızlı Tıklama Dayanıklılığı', async ({ page }) => {
    const btnLab = page.locator('#btn-deney-modulu');
    await btnLab.click();

    // 6.8 Gravzant laboratuvarını aç
    await page.evaluate(() => {
      window.FenUpLab.openExperimentWorkspace('6.8');
    });

    const statusEl = page.locator('#mbar-68-status');
    const passMetric = page.locator('#metric-68-pass');

    // Başlangıç: Henüz denenmedi / Hazır
    await expect(statusEl).toContainText('Hazır');
    await expect(passMetric).toContainText('Henüz Denenmedi');

    // 5 adet kontrol butonunun varlığını doğrula
    const btnCold = page.locator('#btn-grav-pass-cold');
    const btnHeat = page.locator('#btn-grav-heat');
    const btnHot = page.locator('#btn-grav-pass-hot');
    const btnQuench = page.locator('#btn-grav-quench');
    const btnQuenchedPass = page.locator('#btn-grav-pass-quenched');

    await expect(btnCold).toBeVisible();
    await expect(btnHeat).toBeVisible();
    await expect(btnHot).toBeVisible();
    await expect(btnQuench).toBeVisible();
    await expect(btnQuenchedPass).toBeVisible();

    // Adım 1: Soğukken Geçir
    await btnCold.click();
    await expect(statusEl).toContainText('Geçti');
    await expect(passMetric).toContainText('Geçer');

    // Adım 2: Alevde Isıt
    await btnHeat.click();
    await expect(statusEl).toContainText('Isıtılıyor');

    // Kürenin genleşerek halkanın çapını aşması için bekle
    await page.waitForFunction(() => {
      const ex = window.FenUpLab?.labState?.expansion;
      return ex ? ex.sphereRadius > ex.ringRadius : false;
    });

    // Adım 3: Sıcakken Dene -> Takılmalı
    await btnHot.click();
    await expect(statusEl).toContainText('Takıldı');
    await expect(passMetric).toContainText('Takılır');

    // Adım 4: Suya Daldır (Soğut)
    await btnQuench.click();
    await expect(statusEl).toContainText('Büzülüyor');

    // Kürenin büzülerek halka çapının altına inmesi için bekle
    await page.waitForFunction(() => {
      const ex = window.FenUpLab?.labState?.expansion;
      return ex ? ex.sphereRadius <= ex.ringRadius : false;
    });

    // Adım 5: Soğutulmuş Küreyi Yeniden Dene -> Tekrar Geçmeli!
    await btnQuenchedPass.click();
    await expect(statusEl).toContainText('Tekrar Geçti');
    await expect(passMetric).toContainText('Geçer');

    // Hızlı tıklama dayanıklılığı testi: Hızlıca Isıt -> Yeniden Dene
    await btnHeat.click();
    await btnHot.click();
    // Durumlar birbiriyle çelişmemeli, fizik motoru küre çapına göre tutarlı davranmalı
    const currentPass = await page.evaluate(() => {
      const ex = window.FenUpLab?.labState?.expansion;
      return ex ? (ex.sphereRadius <= ex.ringRadius) : true;
    });
    if (currentPass) {
      await expect(passMetric).toContainText('Geçer');
    } else {
      await expect(passMetric).toContainText('Takılır');
    }
  });

  test('2. Deney 6.9 Elektriksel İletkenlik: Öğrenci Kontrollü Anahtar, Açık Devre Metni ve 10 Madde Uyumu', async ({ page }) => {
    const btnLab = page.locator('#btn-deney-modulu');
    await btnLab.click();

    await page.evaluate(() => {
      window.FenUpLab.openExperimentWorkspace('6.9');
    });

    const statusEl = page.locator('#mbar-69-status');
    const bulbMetric = page.locator('#metric-69-bulb');
    const pedTitle = page.locator('#cond-pedagogical-title');
    const pedText = page.locator('#cond-pedagogical-text');

    // Başlangıç: Anahtar AÇIK ve test uçları BOŞ
    await expect(statusEl).toContainText('Anahtarı Açık');
    await expect(bulbMetric).toContainText('Sönük');
    await expect(pedTitle).toContainText('Açık Devre');

    // Açık devre asla "katı yalıtkan madde" veya "atomlarında elektronlar sıkı bağlıdır" olarak açıklanmamalı
    await expect(pedText).not.toContainText('Katı Yalıtkan Madde');
    await expect(pedText).not.toContainText('atomlarında elektronlar sıkı bağlıdır');
    await expect(pedText).toContainText('iletken bir köprü veya bağlantı bulunmadığı için');

    // Anahtar aç / kapat butonu
    const btnSwitch = page.locator('#btn-cond-toggle-switch');
    await expect(btnSwitch).toBeVisible();

    // Anahtarı kapat (Uçlar hâlâ boşken)
    await btnSwitch.click();
    await expect(statusEl).toContainText('Açık Devre');
    await expect(bulbMetric).toContainText('Sönük');

    // Bakır Tel bağla (Anahtar kapalıyken) -> Ampul Yanmalı
    const btnCopper = page.locator('#btn-cond-mat-copper');
    await btnCopper.click();
    await expect(statusEl).toContainText('akımı iletir');
    await expect(bulbMetric).toContainText('Işık Veriyor');

    // Anahtarı aç -> Bakır takılı olsa bile ampul sönmeli!
    await btnSwitch.click();
    await expect(statusEl).toContainText('Anahtarı Açık');
    await expect(bulbMetric).toContainText('Sönük');

    // Anahtarı tekrar kapat
    await btnSwitch.click();
    await expect(bulbMetric).toContainText('Işık Veriyor');

    // Kuru Tahta bağla -> Ampul Sönmeli (Yalıtkan)
    const btnWood = page.locator('#btn-cond-mat-wood');
    await btnWood.click();
    await expect(statusEl).toContainText('akımı iletmez');
    await expect(bulbMetric).toContainText('Sönük');

    // Tuzlu Su bağla -> Ampul Yanmalı (Sıvı İletken)
    const btnSalt = page.locator('#btn-cond-mat-saltwater');
    await btnSalt.click();
    await expect(statusEl).toContainText('akımı iletir');
    await expect(bulbMetric).toContainText('Işık Veriyor');

    // Şekerli Su bağla -> Ampul Sönmeli (Sıvı Yalıtkan)
    const btnSugar = page.locator('#btn-cond-mat-sugarwater');
    await btnSugar.click();
    await expect(statusEl).toContainText('akımı iletmez');
    await expect(bulbMetric).toContainText('Sönük');
  });

  test('3. Deney 5.9 Isı İletkenliği: Malzeme Kimliği Uyumu, Metal/Tahta/Plastik Sınıflaması', async ({ page }) => {
    const btnLab = page.locator('#btn-deney-modulu');
    await btnLab.click();

    await page.evaluate(() => {
      window.FenUpLab.openExperimentWorkspace('5.9');
    });

    // Alt metrik şeridindeki etiketleri kontrol et
    const metricsBar = page.locator('#metrics-bar-5-9');
    await expect(metricsBar).toContainText('Metal Kaşık');
    await expect(metricsBar).toContainText('Tahta Kaşık');
    await expect(metricsBar).toContainText('Plastik Kaşık');

    // Asla "Alüminyum yalıtkan" veya "Demir yalıtkan" yazmamalı
    const textContent = await metricsBar.innerText();
    expect(textContent).not.toContain('Alüminyum: Erimedi');
    expect(textContent).not.toContain('Demir: Erimedi');
    expect(textContent).not.toContain('Alüminyum yalıtkan');
    expect(textContent).not.toContain('Demir yalıtkan');

    // Sağ panel değişken kartlarını kontrol et
    const varsBox = page.locator('#vars-container-5-9');
    await expect(varsBox).toContainText('Metal Kaşık');
    await expect(varsBox).toContainText('Tahta Kaşık');
    await expect(varsBox).toContainText('Plastik Kaşık');
  });

  test('4. Deney 6.1 Tutulmalar: Tam Hiza İnceleme Modu ve Geometrik Örtüşme', async ({ page }) => {
    const btnLab = page.locator('#btn-deney-modulu');
    await btnLab.click();

    await page.evaluate(() => {
      window.FenUpLab.openExperimentWorkspace('6.1');
    });

    const btnAlign = page.locator('#btn-eclipse-align');
    await expect(btnAlign).toBeVisible();

    // Tam Tutulma butonuna tıkla
    await btnAlign.click();

    // Animasyon inceleme için duraklatılmış olmalı ve açı 0.0° kalmalı
    const isPlaying = await page.evaluate(() => window.FenUpLab?.labState?.eclipse?.isPlaying);
    const orbitAngle = await page.evaluate(() => window.FenUpLab?.labState?.eclipse?.orbitAngle);
    expect(isPlaying).toBe(false);
    expect(orbitAngle).toBe(0);

    const statusEl = page.locator('#mbar-61-status');
    await expect(statusEl).toContainText('Tam Güneş Tutulması');
  });

  test('5. Deney 7.8 Elektroskop: Yakında Yüklü Çubuk Varken Topraklama Davranışı', async ({ page }) => {
    const btnLab = page.locator('#btn-deney-modulu');
    await btnLab.click();

    await page.evaluate(() => {
      window.FenUpLab.openExperimentWorkspace('7.8');
    });

    // Pozitif cam çubuğu yaklaştır
    await page.locator('#btn-action-approach').click();
    await page.waitForTimeout(200);

    // Çubuk yakındayken topraklama yap
    await page.locator('#btn-electroscope-ground').click();
    await page.waitForTimeout(200);

    // Topraklama yapıldığında yapraklar kapanmış olmalı (0°) fakat topuz negatif yük tutmalı
    const knobNet = await page.evaluate(() => window.FenUpLab?.labState?.electroscope?.scope?.knobNet);
    const leavesNet = await page.evaluate(() => window.FenUpLab?.labState?.electroscope?.scope?.leavesNet);
    expect(knobNet).toBeLessThan(0); // Topuzda negatif yük tutulur
    expect(leavesNet).toBe(0); // Yapraklar nötrlenir
  });
});
