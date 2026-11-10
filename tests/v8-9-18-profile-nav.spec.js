// @ts-check
import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';

/**
 * FENUP X — V8.9.18 Profil Açılış ve Navigasyon Stabilitesi Test Paketi (A01)
 * Task ID: TASK-20261110-PROFILE-NAV-STABILITY-V8918
 */

async function setupLoggedInStudent(page) {
    await mockFirebase(page);

    await page.addInitScript(() => {
        window.localStorage.setItem('fenupx_cookie_consent', 'accepted');
        window.localStorage.setItem('fenupx_badges', JSON.stringify(['badge_ilk_adim']));
    });

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const studentRecord = {
        role: 'student',
        name: 'Galileo',
        surname: 'Kâşif',
        nickname: 'GalileoKasif',
        sinif: '7',
        email: 'galileo@fenupx.com',
        avatar: 'fenupx-v2-galileo',
        totalScore_7: 420,
        seasonScore_7: 210,
        dailyStreak: 4
    };

    await page.evaluate(async (rec) => {
        window.__records = { s: rec };
        if (typeof window.__login === 'function') {
            await window.__login('s');
        }
    }, studentRecord);

    await page.waitForFunction(() => {
        const btn = document.getElementById('btn-uyelik');
        return btn && (btn.dataset.loggedIn === 'true' || !!btn.querySelector('.profile-img-header'));
    });
}

async function openProfileViaUI(page) {
    const mobileMenuBtn = page.locator('#btn-mobile-menu');
    const isMobileMenuVisible = await mobileMenuBtn.isVisible();
    if (isMobileMenuVisible) {
        await mobileMenuBtn.click();
        await expect(page.locator('#header-navigation')).toBeVisible();
    }

    const btnUyelik = page.locator('#btn-uyelik');
    await expect(btnUyelik).toBeVisible();
    await btnUyelik.click();

    const dropdown = page.locator('#profile-dropdown');
    await expect(dropdown).toBeVisible();

    const btnOpenProfile = page.locator('#btn-open-profile');
    await expect(btnOpenProfile).toBeVisible();
    await btnOpenProfile.click();

    await expect(page.locator('#profile-modal')).toBeVisible();
    if (isMobileMenuVisible) {
        await expect(mobileMenuBtn).toHaveAttribute('aria-expanded', 'false');
    }
}

test.describe('V8.9.18 — A01 Profil Açılış ve Navigasyon Stabilitesi', () => {

    test('1. Ana Sayfada gerçek UI tıklamasıyla profil açma/kapama sahneyi bozmaz ve type="button" korumalıdır', async ({ page }) => {
        await setupLoggedInStudent(page);

        await expect(page.locator('#scene-home')).toBeVisible();

        // Tetikleyici butonların type="button" olduğunu doğrula
        await expect(page.locator('#btn-uyelik')).toHaveAttribute('type', 'button');
        await expect(page.locator('#btn-open-profile')).toHaveAttribute('type', 'button');

        await openProfileViaUI(page);

        await expect(page.locator('#profile-modal')).toBeVisible();
        await expect(page.locator('#scene-home')).toBeVisible();
        expect(await page.evaluate(() => location.hash)).toBe('#scene-home');

        // Kapatma düğmesiyle kapat
        await page.locator('#close-profile').click();
        await expect(page.locator('#profile-modal')).toBeHidden();
        await expect(page.locator('#scene-home')).toBeVisible();
    });

    test('2. #scene-unit (Şampiyonlar Ligi) ekranındayken ilk tıklamada profil modalı mevcut ekran üzerinde açılır, #scene-home\'a dönmez', async ({ page }) => {
        await setupLoggedInStudent(page);

        // Bireysel yarışma -> Sınıf 7 -> #scene-unit ekranına git
        await page.locator('#btn-oyun-modulu').click();
        await expect(page.locator('#scene-crossroads')).toBeVisible();
        await page.locator('#btn-mode-bireysel').click();
        await expect(page.locator('#scene-lobby')).toBeVisible();
        await page.locator('#btn-skip-draw').click();
        await expect(page.locator('#scene-class')).toBeVisible();
        await page.locator('.class-card[data-grade="7"]').click();

        const sceneUnit = page.locator('#scene-unit');
        const sceneHome = page.locator('#scene-home');
        await expect(sceneUnit).toBeVisible();
        await expect(sceneHome).toBeHidden();
        expect(await page.evaluate(() => location.hash)).toBe('#scene-unit');

        // İlk tıklamada gerçek UI üzerinden profili aç
        await openProfileViaUI(page);

        // Modal açıkken arka planda #scene-unit korunmalı, #scene-home'a atmamalı
        await expect(page.locator('#profile-modal')).toBeVisible();
        await expect(sceneUnit).toBeVisible();
        await expect(sceneHome).toBeHidden();
        expect(await page.evaluate(() => location.hash)).toBe('#scene-unit');

        // Kapatıldığında hâlâ #scene-unit üzerinde kalmalı
        await page.locator('#close-profile').click();
        await expect(page.locator('#profile-modal')).toBeHidden();
        await expect(sceneUnit).toBeVisible();
        await expect(sceneHome).toBeHidden();
        expect(await page.evaluate(() => location.hash)).toBe('#scene-unit');
    });

    test('3. Yazılıya Hazırlık (#scene-yazili) ve Sanal Laboratuvar (#lab-view) sahnelerinde profil açılışı aktif sahneyi korur', async ({ page }) => {
        await setupLoggedInStudent(page);

        // A) Yazılıya Hazırlık sahnesine geç
        await page.locator('#btn-yazili-modulu').click();
        await expect(page.locator('#scene-yazili')).toBeVisible();
        await page.locator('#btn-scope-continue').click();
        await expect(page.locator('#exam-view-choice')).toBeVisible();

        await openProfileViaUI(page);
        await expect(page.locator('#profile-modal')).toBeVisible();
        await expect(page.locator('#scene-yazili')).toBeVisible();
        await expect(page.locator('#exam-view-choice')).toBeVisible();
        await expect(page.locator('#scene-home')).toBeHidden();

        await page.locator('#close-profile').click();
        await expect(page.locator('#profile-modal')).toBeHidden();
        await expect(page.locator('#scene-yazili')).toBeVisible();
        await expect(page.locator('#exam-view-choice')).toBeVisible();

        // Ana sayfaya dön ve Laboratuvara geç
        const mobileMenuBtn = page.locator('#btn-mobile-menu');
        if (await mobileMenuBtn.isVisible()) {
            await mobileMenuBtn.click();
        }
        await page.locator('#btn-header-home').click();
        await expect(page.locator('#scene-home')).toBeVisible();

        // B) Sanal Laboratuvar sahnesine geç
        await page.locator('#btn-deney-modulu').click();
        await expect(page.locator('#lab-view')).toBeVisible();

        await openProfileViaUI(page);
        await expect(page.locator('#profile-modal')).toBeVisible();
        await expect(page.locator('#lab-view')).toBeVisible();
        await expect(page.locator('#scene-home')).toBeHidden();

        // Escape tuşuyla kapatıldığında da #lab-view korunmalı
        await page.keyboard.press('Escape');
        await expect(page.locator('#profile-modal')).toBeHidden();
        await expect(page.locator('#lab-view')).toBeVisible();
        await expect(page.locator('#scene-home')).toBeHidden();
    });

    test('4. Backdrop dış tıklama izolasyonu: arkadaki #site-logo-link veya .unit-card butonlarına tıklama sızmaz', async ({ page }) => {
        await setupLoggedInStudent(page);

        await page.locator('#btn-oyun-modulu').click();
        await page.locator('#btn-mode-bireysel').click();
        await page.locator('#btn-skip-draw').click();
        await page.locator('.class-card[data-grade="7"]').click();

        await expect(page.locator('#scene-unit')).toBeVisible();

        await openProfileViaUI(page);
        const profileModal = page.locator('#profile-modal');
        const modalContent = profileModal.locator('.modal-content');
        await expect(profileModal).toBeVisible();

        // İçerikten başlayıp backdrop'ta biten sürükleme modalı kapatmamalı
        const contentBox = await modalContent.boundingBox();
        expect(contentBox).not.toBeNull();
        if (contentBox) {
            await page.mouse.move(contentBox.x + 20, contentBox.y + 40);
            await page.mouse.down();
            await page.mouse.move(5, 5);
            await page.mouse.up();
            await expect(profileModal).toBeVisible();
        }

        // Doğrudan sol üst backdrop noktasına (#site-logo-link hizası!) tıkla
        await page.mouse.click(8, 8);
        await expect(profileModal).toBeHidden();

        // Arkadaki #site-logo-link veya #btn-back-class veya .unit-card tetiklenmemiş olmalı
        await expect(page.locator('#scene-unit')).toBeVisible();
        await expect(page.locator('#scene-home')).toBeHidden();
        await expect(page.locator('#scene-rules')).toBeHidden();
    });

    test('5. Hash/Router koruması ve Avatar Seçici Escape katmanı izolasyonu', async ({ page }) => {
        await setupLoggedInStudent(page);

        await page.locator('#btn-oyun-modulu').click();
        await page.locator('#btn-mode-bireysel').click();
        await page.locator('#btn-skip-draw').click();
        await page.locator('.class-card[data-grade="7"]').click();
        await expect(page.locator('#scene-unit')).toBeVisible();

        // Geçersiz / profil kaynaklı hash değişimleri aktif sahneyi #scene-home'a düşürmemeli
        await page.evaluate(() => {
            window.location.hash = '#profile';
        });
        await page.waitForTimeout(100);
        await expect(page.locator('#scene-unit')).toBeVisible();
        await expect(page.locator('#scene-home')).toBeHidden();
        expect(await page.evaluate(() => location.hash)).toBe('#scene-unit');

        // Profil aç -> Avatar seçici aç -> İlk Escape sadece Avatar Seçici'yi kapatmalı
        await openProfileViaUI(page);
        await page.locator('#btn-open-avatar-selector').click();
        const avatarDialog = page.locator('#avatar-selector-container');
        await expect(avatarDialog).toBeVisible();

        await page.keyboard.press('Escape');
        await expect(avatarDialog).toBeHidden();
        await expect(page.locator('#profile-modal')).toBeVisible();
        await expect(page.locator('#scene-unit')).toBeVisible();

        // İkinci Escape #profile-modal'ı kapatmalı ama sahneyi değiştirmemeli
        await page.keyboard.press('Escape');
        await expect(page.locator('#profile-modal')).toBeHidden();
        await expect(page.locator('#scene-unit')).toBeVisible();
        await expect(page.locator('#scene-home')).toBeHidden();
    });

});
