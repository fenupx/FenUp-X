import { test, expect } from '@playwright/test';

test.describe('SPA Sahne Yaşam Döngüsü (Scene Lifecycle) ve İzolasyon Testleri', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Modül kapatıldığında body kilitleri temizlenmeli ve ana sayfaya güvenle dönülmeli', async ({ page }) => {
    await page.goto('/');

    // 1. Yazılı Provasını aç
    await page.locator('#btn-yazili-modulu').click();
    await expect(page.locator('#scene-yazili')).toBeVisible();

    // 2. "Ana Sayfaya Dön" butonuna tıkla (#btn-exam-back-home)
    const btnClose = page.locator('#btn-exam-step-back');
    await expect(btnClose).toBeVisible();
    await btnClose.click();

    // 3. Yazılı sahnesi tamamen gizlenmeli (is-hidden)
    await expect(page.locator('#scene-yazili')).not.toBeVisible();
    await expect(page.locator('#scene-yazili')).toHaveClass(/is-hidden/);

    // 4. Body üzerindeki kilit sınıfları temizlenmiş olmalı
    const bodyClass = await page.evaluate(() => document.body.className);
    expect(bodyClass).not.toContain('exam-fullscreen-open');
    expect(bodyClass).not.toContain('exam-modal-open');

    // 5. Ana sayfa görünür ve aktif olmalı
    await expect(page.locator('#scene-home')).toBeVisible();
  });

  test('Laboratuvar ve Yarışma kontrolleri Yazılı Provası içine sızmamalı', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-yazili-modulu').click();

    // Yazılı provası aktifken
    await expect(page.locator('#scene-yazili')).toBeVisible();

    // Sanal laboratuvar tuvali ve kontrolleri gizli olmalı
    const labView = page.locator('#lab-view');
    if (await labView.count() > 0) {
      await expect(labView).not.toBeVisible();
    }

    // Şampiyonlar ligi / yarışma kontrolleri gizli olmalı
    const quizScene = page.locator('#scene-quiz');
    if (await quizScene.count() > 0) {
      await expect(quizScene).not.toBeVisible();
    }
  });
});
