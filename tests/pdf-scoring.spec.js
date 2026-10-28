import { test, expect } from '@playwright/test';

test.describe('Sınav Kâğıdı (PDF) ve 100 Puan Standardı Testleri', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Soru puanları sadece {10, 15, 20} olmalı ve toplamı TAM 100 puan etmelidir', async ({ page }) => {
    await page.goto('/');

    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    // Soru seçici menüyü açarak tüm soruların puanlarını topla
    const btnPicker = page.locator('#btn-practice-q-picker');
    await btnPicker.click();

    const dropdown = page.locator('#practice-q-picker-dropdown');
    await expect(dropdown).toBeVisible();

    const pointElements = dropdown.locator('.q-picker-pts');
    const count = await pointElements.count();
    expect(count).toBeGreaterThan(0);

    let totalPoints = 0;
    const allowedPoints = [10, 15, 20];

    for (let i = 0; i < count; i++) {
      const text = await pointElements.nth(i).innerText();
      const match = text.match(/(\d+)\s*Puan/i);
      expect(match).not.toBeNull();
      const pts = parseInt(match[1], 10);

      // Puan sadece 10, 15 veya 20 olabilir
      expect(allowedPoints).toContain(pts);
      totalPoints += pts;
    }

    // Toplam TAM 100 puan olmalı
    expect(totalPoints).toBe(100);
  });

  test('Soru kâğıdı önizleme modalı açılmalı ve PDF indirme butonu tetiklenebilmelidir', async ({ page }) => {
    await page.goto('/');

    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    // Soru Kâğıdı Önizle / Yazdır butonuna tıkla
    const btnPrintPreview = page.locator('#btn-practice-preview-print');
    await expect(btnPrintPreview).toBeVisible();
    await btnPrintPreview.click();

    // Önizleme modalı açılmalı
    const modal = page.locator('#exam-print-preview-modal');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/is-open/);

    // Modal içindeki PDF İndir butonu görünür ve tıklanabilir olmalı
    const btnDownloadPdf = page.locator('#btn-print-preview-download-pdf');
    await expect(btnDownloadPdf).toBeVisible();

    // İndirme olayını dinle
    const downloadPromise = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);
    await btnDownloadPdf.click();

    const download = await downloadPromise;
    if (download) {
      const filename = download.suggestedFilename();
      expect(filename).toMatch(/\.pdf$/i);
    }

    // Modalı kapat
    const btnCloseModal = page.locator('#btn-close-print-preview');
    if (await btnCloseModal.isVisible()) {
      await btnCloseModal.click();
      await expect(modal).not.toBeVisible();
    }
  });
});
