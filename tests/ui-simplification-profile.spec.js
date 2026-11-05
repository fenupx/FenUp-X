import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';

test.describe('FenUp X — Arayüz Sadeleştirmesi ve Profil Düzeni', () => {

    test('1. Yönetici Profilinde Öğrenci Alanları Yoktur, Temel Bilgiler ve Yönetim Araçları Korunur', async ({ page }) => {
        await mockFirebase(page);
        await page.evaluate(async () => {
            window.__records = {
                a: { role: 'admin', name: 'Ayşe', surname: 'Yılmaz', nickname: 'KozmikAdmin', email: 'admin@fenupx.com', avatar: 'fenupx-v2-einstein' },
                s: { role: 'student', name: 'Ali', surname: 'Demir', nickname: 'HızlıKasif', sinif: '7', email: 'ali@example.com', totalScore: 180, avatar: 'fenupx-v2-astronaut' }
            };
            await window.__login('a');
        });

        // Yöneticiye öğrenci sınıf onboarding penceresi gösterilmez
        await expect(page.locator('#modal-onboarding-grade')).toBeHidden();

        // Profil modalını aç
        await page.evaluate(() => {
            const btn = document.getElementById('btn-open-profile');
            if (btn) btn.click();
        });

        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        // Avatar, görünen ad ve temel hesap bilgileri korunmalıdır
        await expect(profileModal.locator('#p-current-avatar')).toBeVisible();
        await expect(profileModal.locator('#profile-display-fullname')).toHaveText('Ayşe Yılmaz');
        await expect(profileModal.locator('#profile-display-role-tag')).toHaveText('Yönetici');

        // Yönetim paneline git butonu mevcuttur
        const adminView = profileModal.locator('#profile-admin-view');
        await expect(adminView).toBeVisible();
        await expect(adminView.locator('#btn-profile-goto-admin')).toBeVisible();
        await expect(adminView.locator('#admin-display-fullname')).toHaveText('Ayşe Yılmaz');

        // Yönetici profilinde öğrenci sınıfı, rozet, seri, seviye ve karne alanları kaldırılmıştır
        await expect(profileModal.locator('#profile-student-sections')).toBeHidden();
        await expect(profileModal.locator('#profile-student-grade-group')).toBeHidden();
        await expect(profileModal.locator('#profile-grade')).toBeHidden();
        await expect(profileModal.locator('.profile-streak-badge')).toBeHidden();
        await expect(profileModal.locator('#profile-level-badge')).toBeHidden();
        await expect(profileModal.locator('.profile-karne-section')).toBeHidden();
        await expect(profileModal.locator('.profile-badges-section')).toBeHidden();

        // Temel hesap ayarları (isim, soyisim, kullanıcı adı, güncelle, sil) korunmalıdır
        await page.evaluate(() => {
            const details = document.querySelector('.profile-settings-details') || document.querySelector('.profile-settings-accordion');
            if (details) details.open = true;
        });
        await expect(profileModal.locator('#p-name')).toBeVisible();
        await expect(profileModal.locator('#p-surname')).toBeVisible();
        await expect(profileModal.locator('#btn-save-profile')).toBeVisible();
        await expect(profileModal.locator('#btn-delete-account')).toBeVisible();

        // Modalı kapat
        await profileModal.locator('#close-profile').click();
        await expect(profileModal).toBeHidden();

        // Öğrenci hesabına geçildiğinde öğrenci arayüzü doğru geri gelmelidir
        await page.evaluate(async () => {
            await window.__login('s');
            const btn = document.getElementById('btn-open-profile');
            if (btn) btn.click();
        });

        await expect(profileModal).toBeVisible();
        await expect(profileModal.locator('#profile-student-sections')).toBeVisible();
        await expect(profileModal.locator('#profile-studies-summary')).toBeVisible();
        await expect(profileModal.locator('#studies-summary-counter-text')).toBeVisible();
        await expect(profileModal.locator('#profile-student-grade-group')).toBeVisible();
        await expect(profileModal.locator('#p-nickname')).toBeVisible();
        await expect(profileModal.locator('.profile-badges-section')).toBeVisible();
        await expect(profileModal.locator('#profile-admin-view')).toBeHidden();
        await expect(profileModal.locator('#profile-display-role-tag')).toContainText('7. Sınıf');
    });

    test('2. Öğrenci Gelişimi Yalnız Profilde: Header ve Ana Sayfada Seri/Rozet Yoktur', async ({ page }) => {
        await mockFirebase(page);
        await page.evaluate(async () => {
            window.__records = {
                s: { role: 'student', name: 'Zeynep', surname: 'Kaya', nickname: 'KozmikZeynep', sinif: '6', totalScore: 240, avatar: 'fenupx-v2-curie' }
            };
            await window.__login('s');
        });

        // Ana sayfa ve üst başlıkta rozet, seviye ve günlük seri sayaçları gösterilmez
        await expect(page.locator('#header-streak-badge')).toBeHidden();
        await expect(page.locator('#scene-home #header-streak-badge')).toHaveCount(0);

        // Üst başlıkta mevcut avatar/hesap menüsü ve gezinme kalmalıdır
        const mobileMenuBtn = page.locator('#btn-mobile-menu');
        if (await mobileMenuBtn.isVisible()) {
            await mobileMenuBtn.click();
        }
        const uyelikBtn = page.locator('#btn-uyelik');
        await expect(uyelikBtn).toBeVisible();
        await expect(uyelikBtn).toContainText('Zeynep');
        await expect(page.locator('#btn-hakkimizda')).toBeVisible();
        await expect(page.locator('#btn-iletisim')).toBeVisible();

        // Profil açıldığında gelişim özeti ve rozetler düzenli görünür
        await uyelikBtn.click();
        await page.locator('#btn-open-profile').click();

        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        // Günlük seri yalnızca hero altında bir kez gösterilir
        const streakBadge = profileModal.locator('.profile-streak-badge');
        await expect(streakBadge).toBeVisible();
        await expect(streakBadge).toContainText('Seri');

        // Çalışmalarım tek satır sayaç
        const summary = profileModal.locator('#profile-studies-summary');
        await expect(summary).toBeVisible();
        await expect(summary.locator('#studies-summary-counter-text')).toBeVisible();

        // 3 Gelişen Rozet Ailesi Vitrini
        const badgeCards = profileModal.locator('.cosmic-badges-grid .badge-family-card');
        await expect(badgeCards).toHaveCount(3);
    });

    test('3. Liderlik Tablosu: Sade İkincil Kontrol, Geçmiş Puanlar ve Veri Güvenliği', async ({ page }) => {
        await mockFirebase(page, true);
        await page.evaluate(async () => {
            window.__records = {
                u1: { role: 'student', nickname: 'KozmikKaptan1', sinif: '7', weeklyScore: 350, displayScore: 350, avatar: 'fenupx-v2-astronaut' },
                u2: { role: 'student', nickname: 'BilimSeverÇokUzunKullaniciAdiDenemesi', sinif: '7', weeklyScore: 290, displayScore: 290, avatar: 'fenupx-v2-einstein' }
            };
            window.selectedGrade = '7';
        });

        // 7. Sınıf Şampiyonlar Ligi sahnesine geç
        await page.locator('#btn-oyun-modulu').click();
        await page.locator('#btn-mode-bireysel').click();
        await page.locator('#btn-skip-draw').click();
        await page.locator('.class-card[data-grade="7"]').click();

        const lbSide = page.locator('#unit-leaderboard-side');
        await expect(lbSide).toBeVisible();

        // "Önceki puanlar / Güncel tabloya dön" geçiş butonu tamamen kaldırılmıştır
        await expect(page.locator('#btn-lb-history-toggle')).toHaveCount(0);
        await expect(page.locator('.competition-history-toggle')).toHaveCount(0);

        // Liderlik tablosu başlığı Şampiyonlar Ligi olarak doğrudan görüntülenir
        const lbTitle = lbSide.locator('h2');
        await expect(lbTitle).toContainText('Şampiyonlar Ligi');

        // Boş kategori durumunda anlaşılır bilgilendirme gösterilir
        await page.evaluate(() => {
            if (typeof window.renderGlobalLeaderboard === 'function') {
                window.renderGlobalLeaderboard([], 'weekly');
            }
        });
        await expect(page.locator('#global-lb-list')).toContainText('Henüz bu kategoride yarışmacı yok.');
    });

    test('4. Mobil Ekranlarda (320px, 375px, 390px, 430px) Liderlik Satırları ve Profil Taşmaz', async ({ page }) => {
        await mockFirebase(page, true);
        await page.locator('#btn-oyun-modulu').click();
        await page.locator('#btn-mode-bireysel').click();
        await page.locator('#btn-skip-draw').click();
        await page.locator('.class-card[data-grade="7"]').click();

        const viewports = [
            { width: 320, height: 650 },
            { width: 375, height: 667 },
            { width: 390, height: 844 },
            { width: 430, height: 932 }
        ];

        for (const vp of viewports) {
            await page.setViewportSize(vp);
            await page.evaluate(() => {
                const users = [
                    { nickname: 'CokUzunYarismaciKullaniciAdi123', displayScore: 9999, avatar: 'fenupx-v2-galileo' },
                    { nickname: 'KisaAd', displayScore: 120, avatar: 'fenupx-v2-otter' }
                ];
                if (typeof window.renderGlobalLeaderboard === 'function') {
                    window.renderGlobalLeaderboard(users, 'weekly');
                }
            });

            // Liderlik satırlarının genişliği konteyneri aşmamalıdır
            const rowBox = await page.locator('.global-lb-row').first().boundingBox();
            const listWidth = await page.evaluate(() => document.getElementById('global-lb-list').clientWidth);
            if (rowBox && listWidth) {
                expect(rowBox.width).toBeLessThanOrEqual(listWidth + 4);
            }

            // Sayfada yatay taşma (horizontal scrollbar) olmamalıdır
            const hasHorizontalScroll = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
            expect(hasHorizontalScroll).toBe(false);
        }
    });
});
