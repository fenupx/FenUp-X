import { test, expect } from '@playwright/test';

test.describe('Gezinme ve Kayıt / Devam Et Akışı Testleri', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Cevap yaz -> Hazırlık -> Devam Et akışında cevap ve soru sırası korunmalı', async ({ page }) => {
    await page.goto('/');

    // 1. Yazılıya Hazırlık modülünü aç
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();

    // Prova Ayarları Ekranında "Başla" tıkla
    await expect(page.locator('#practice-setup-box')).toBeVisible();
    await page.locator('#exam-start-practice').click();

    // Aktif Soru Ekranındayız
    await expect(page.locator('#practice-active-box')).toBeVisible();

    // 1. Soruya özel cevap yaz
    const testAns1 = 'Test Cevabı Soru 1: Işığın kırılması merceklerde gerçekleşir.';
    const textarea = page.locator('#practice-text-ans');
    await textarea.fill(testAns1);

    // "Hazırlık Ekranı" butonuna tıkla (#practice-active-box #btn-practice-back-choice)
    const btnBack = page.locator('#practice-active-box #btn-practice-back-choice');
    await btnBack.click();

    // Tercih ekranındayız (#exam-view-choice)
    await expect(page.locator('#exam-view-choice')).toBeVisible();

    // Kayıtlı çalışma kartı (#choice-saved-attempt-card) ve "Kaldığın Yerden Devam Et" butonu görünür olmalı
    const btnResume = page.locator('#btn-resume-saved-attempt');
    await expect(btnResume).toBeVisible();
    await btnResume.click();

    // Tekrar provaya dönüldüğünde yazılan cevap yerinde durmalı
    await expect(page.locator('#practice-active-box')).toBeVisible();
    await expect(page.locator('#practice-text-ans')).toHaveValue(testAns1);
  });

  test('Mobil açılır soru menüsünde soru seçimi cevabı otomatik kaydetmeli ve soruya geçmeli', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    await expect(page.locator('#practice-active-box')).toBeVisible();

    // Soru 1'e cevap yaz
    const ansQ1 = 'Soru 1 Yanıtı: Teleskop icadı uzay araştırmalarını hızlandırdı.';
    await page.locator('#practice-text-ans').fill(ansQ1);

    // Kompakt Soru Seçici Butonuna Tıkla
    const btnPicker = page.locator('#btn-practice-q-picker');
    await expect(btnPicker).toBeVisible();
    await btnPicker.click();

    // Dropdown açılmalı
    const dropdown = page.locator('#practice-q-picker-dropdown');
    await expect(dropdown).toBeVisible();
    await expect(dropdown).not.toHaveClass(/is-hidden/);

    // Soru 3 öğesine tıkla (data-picker-q="2")
    const itemQ3 = dropdown.locator('[data-picker-q="2"]');
    await expect(itemQ3).toBeVisible();
    await itemQ3.click();

    // Dropdown kapanmalı
    await expect(dropdown).toHaveClass(/is-hidden/);

    // Gösterge "Soru 3 / 7" olmalı
    await expect(page.locator('#practice-current-indicator')).toContainText('Soru 3');

    // Tekrar menüyü aç ve Soru 1'e dön
    await btnPicker.click();
    await expect(dropdown).toBeVisible();

    // Soru 1'in yanında "Yanıtlandı" rozeti olmalı
    const itemQ1 = dropdown.locator('[data-picker-q="0"]');
    await expect(itemQ1.locator('.q-picker-badge.answered')).toBeVisible();

    // Soru 1'e tıkla
    await itemQ1.click();
    await expect(page.locator('#practice-current-indicator')).toContainText('Soru 1');

    // Yazılan cevabın korunduğunu doğrula
    await expect(page.locator('#practice-text-ans')).toHaveValue(ansQ1);
  });

  test('Yeni Prova tıklandığında eski cevaplar temizlenmeli ve temiz prova başlamalı', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    // Cevap yaz
    await page.locator('#practice-text-ans').fill('Eski Deneme Yanıtı');

    // Hazırlık ekranına dön
    await page.locator('#practice-active-box #btn-practice-back-choice').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();

    // "Provaya Başla" butonuna tıkla (Yeni Prova başlatır)
    const btnNewPractice = page.locator('#btn-choice-go-practice');
    await expect(btnNewPractice).toBeVisible();
    await btnNewPractice.click();

    // Kurulum kutusu açılır, "Başla"ya bas
    await expect(page.locator('#practice-setup-box')).toBeVisible();
    await page.locator('#exam-start-practice').click();

    // Soru alanındaki cevabın sıfırlandığını doğrula
    await expect(page.locator('#practice-active-box')).toBeVisible();
    await expect(page.locator('#practice-text-ans')).toHaveValue('');
  });
});
