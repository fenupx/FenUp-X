import { test, expect } from '@playwright/test';

test.describe('FenUp X — Modül İçi ve Tarayıcı Geri Navigasyon Testleri', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => (
      typeof window.FenUpLab !== 'undefined' &&
      typeof window.FenUpLab.getRoute === 'function' &&
      typeof window.FenUpNavigation !== 'undefined'
    ));
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Laboratuvar 3 Adımlı UI Geri Butonları (Deney -> Sınıf Kataloğu -> Sınıflar -> Ana Sayfa)', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();
    await expect(page.locator('#lab-welcome-screen')).toBeVisible();
    expect(page.url()).toContain('#lab-view/welcome');

    await page.locator('.lab-welcome-card[data-grade="5"]').click();
    await expect(page.locator('#lab-grade-catalog')).toBeVisible();
    await expect(page.locator('#lab-grade-catalog-title')).toContainText('5. Sınıf');
    expect(page.url()).toContain('#lab-view/grade/5');

    await page.locator('.lab-launch-btn').first().click();
    await expect(page.locator('#lab-workspace-view')).toBeVisible();
    expect(page.url()).toContain('#lab-view/exp/');

    // Deneyden -> 5. Sınıf Kataloğuna dön (en başa atmamalı)
    await page.locator('#btn-lab-back-catalog').click();
    await expect(page.locator('#lab-workspace-view')).toBeHidden();
    await expect(page.locator('#lab-grade-catalog')).toBeVisible();
    await expect(page.locator('#lab-grade-catalog-title')).toContainText('5. Sınıf');
    expect(page.url()).toContain('#lab-view/grade/5');

    // Katalogdan -> Sınıflar (karşılama) ekranına dön
    await page.locator('#btn-lab-back-welcome').click();
    await expect(page.locator('#lab-grade-catalog')).toBeHidden();
    await expect(page.locator('#lab-welcome-screen')).toBeVisible();
    expect(page.url()).toContain('#lab-view/welcome');

    // Sınıflardan -> Ana Sayfaya dön
    await page.locator('#btn-lab-back-home').click();
    await expect(page.locator('#scene-home')).toBeVisible();
    await expect(page.locator('#lab-view')).toBeHidden();
  });

  test('2. Laboratuvar Tarayıcı Geri / İleri (popstate) Geçişleri', async ({ page }) => {
    await page.locator('#btn-deney-modulu').click();
    await expect(page.locator('#lab-welcome-screen')).toBeVisible();

    await page.locator('.lab-welcome-card[data-grade="6"]').click();
    await expect(page.locator('#lab-grade-catalog-title')).toContainText('6. Sınıf');

    await page.locator('.lab-launch-btn').first().click();
    await expect(page.locator('#lab-workspace-view')).toBeVisible();
    const expHash = new URL(page.url()).hash;
    expect(expHash).toMatch(/^#lab-view\/exp\/6\./);

    // 1. Geri: Deney -> 6. Sınıf Kataloğu
    await page.goBack();
    await expect(page.locator('#lab-workspace-view')).toBeHidden();
    await expect(page.locator('#lab-grade-catalog')).toBeVisible();
    await expect(page.locator('#lab-grade-catalog-title')).toContainText('6. Sınıf');
    expect(page.url()).toContain('#lab-view/grade/6');

    // 2. Geri: 6. Sınıf Kataloğu -> Sınıflar
    await page.goBack();
    await expect(page.locator('#lab-grade-catalog')).toBeHidden();
    await expect(page.locator('#lab-welcome-screen')).toBeVisible();
    expect(page.url()).toContain('#lab-view/welcome');

    // 3. Geri: Sınıflar -> Ana Sayfa
    await page.goBack();
    await expect(page.locator('#scene-home')).toBeVisible();
    await expect(page.locator('#lab-view')).toBeHidden();

    // İleri zinciri: Ana Sayfa -> Sınıflar -> 6. Sınıf Kataloğu -> Deney
    await page.goForward();
    await expect(page.locator('#lab-welcome-screen')).toBeVisible();
    await page.goForward();
    await expect(page.locator('#lab-grade-catalog')).toBeVisible();
    await expect(page.locator('#lab-grade-catalog-title')).toContainText('6. Sınıf');
    await page.goForward();
    await expect(page.locator('#lab-workspace-view')).toBeVisible();
  });

  test('3. Şampiyonlar Ligi Sınıf Seçimi (scene-class) Geri Butonu Doğru Lobiye Dönmeli', async ({ page }) => {
    // Bireysel mod: crossroads -> lobby -> class -> geri -> lobby
    await page.locator('#btn-oyun-modulu').click();
    await expect(page.locator('#scene-crossroads')).toBeVisible();

    await page.locator('#btn-mode-bireysel').click();
    await expect(page.locator('#scene-lobby')).toBeVisible();

    await page.locator('#btn-skip-draw').click();
    await expect(page.locator('#scene-class')).toBeVisible();

    await page.locator('#scene-class .btn-back-cross').click();
    await expect(page.locator('#scene-lobby')).toBeVisible();
    await expect(page.locator('#scene-crossroads')).toBeHidden();

    // Turnuva moduna geç: lobby -> crossroads -> tournament-lobby -> class -> geri -> tournament-lobby
    await page.locator('#scene-lobby .btn-back-cross').click();
    await expect(page.locator('#scene-crossroads')).toBeVisible();

    await page.locator('#btn-mode-turnuva').click();
    await expect(page.locator('#scene-tournament-lobby')).toBeVisible();

    await page.locator('#btn-start-tournament').click();
    await expect(page.locator('#scene-class')).toBeVisible();

    await page.locator('#scene-class .btn-back-cross').click();
    await expect(page.locator('#scene-tournament-lobby')).toBeVisible();
    await expect(page.locator('#scene-crossroads')).toBeHidden();
  });
});
