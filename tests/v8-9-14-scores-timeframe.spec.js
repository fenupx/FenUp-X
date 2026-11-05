// @ts-check
import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';
import { competitionPeriods, competitionTimeframeBoundaries } from '../competition-config.js';

/**
 * FENUP X — V8.9.14 Şampiyonlar Ligi Haftalık / Aylık / Sezonluk / Tüm Zamanlar Puan Mantığı Test Paketi
 * Task ID: TASK-20261105-SCORES-TIMEFRAME-V8914
 */

async function mockStudentEnvironment(page, options = {}) {
    if (options.compHistory !== undefined) {
        await page.addInitScript((opts) => {
            if (opts.compHistory) {
                window.localStorage.setItem('fenupx_competition_history', JSON.stringify(opts.compHistory));
            } else if (opts.compHistory === null) {
                window.localStorage.removeItem('fenupx_competition_history');
            }
        }, options);
    }

    await mockFirebase(page);

    const studentRecord = {
        role: 'student',
        name: 'Ramazan',
        surname: 'Karayel',
        nickname: 'KozmikRamazan',
        sinif: '7',
        email: 'ramazan@fenupx.com',
        avatar: 'fenupx-v2-galileo',
        totalScore_7: 11700,
        seasonScore_7: 11700,
        totalScore: 11700,
        seasonScore: 11700,
        ...(options.userData || {})
    };

    await page.evaluate(async (rec) => {
        window.__records = { s: rec };
        await window.__login('s');
    }, studentRecord);
}

async function openProfileModal(page) {
    await page.evaluate(() => {
        const btn = document.getElementById('btn-open-profile');
        if (btn) btn.click();
    });
}

test.describe('FenUp X — V8.9.14 Şampiyonlar Ligi Zaman Dilimi Puan Doğrulaması', () => {

    test('1. Bu hafta ve bu ay yarışmamış öğrencide Haftalık ve Aylık puanlar 0 basılır (Asla sezonluk basılamaz)', async ({ page }) => {
        await mockStudentEnvironment(page, {
            compHistory: [],
            userData: {
                seasonScore_7: 8500,
                totalScore_7: 8500,
                // Eski dönem kimlikleri
                lastWeekId_7: '2026-W40',
                lastMonthId_7: '2026-09'
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        const statBoxes = ligPane.locator('.studies-comp-stats-row .comp-stat-box');
        await expect(statBoxes).toHaveCount(3);

        // Haftalık Puan: 0 olmalı (sezonluk 8.5K basılamaz)
        await expect(statBoxes.nth(0)).toContainText('Haftalık Puan');
        await expect(statBoxes.nth(0).locator('.stat-sub-val')).toHaveText('0');

        // Aylık Puan: 0 olmalı (sezonluk 8.5K basılamaz)
        await expect(statBoxes.nth(1)).toContainText('Aylık Puan');
        await expect(statBoxes.nth(1).locator('.stat-sub-val')).toHaveText('0');

        // Bu Sezon Puanı: 8.5K olmalı
        await expect(statBoxes.nth(2)).toContainText('Bu Sezon Puanın');
        await expect(statBoxes.nth(2).locator('.stat-sub-val')).toHaveText('8.5K');
    });

    test('2. Eski haftalık/aylık alanında kopyalanmış puan kalmış olsa bile dönem dışıysa Haftalık ve Aylık 0 basılır', async ({ page }) => {
        await mockStudentEnvironment(page, {
            compHistory: [],
            userData: {
                weeklyScore_7: 11700,
                monthlyScore_7: 11700,
                seasonScore_7: 11700,
                lastWeekId_7: '2026-W42', // Eski hafta
                lastMonthId_7: '2026-10'  // Eski ay (Ekim)
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        const statBoxes = ligPane.locator('.studies-comp-stats-row .comp-stat-box');

        // Haftalık: 0
        await expect(statBoxes.nth(0).locator('.stat-sub-val')).toHaveText('0');

        // Aylık: 0
        await expect(statBoxes.nth(1).locator('.stat-sub-val')).toHaveText('0');

        // Sezonluk: 11.7K
        await expect(statBoxes.nth(2).locator('.stat-sub-val')).toHaveText('11.7K');
    });

    test('3. Geçerli haftada ve geçerli ayda yarışmış kullanıcının puanları doğru ayrışır', async ({ page }) => {
        const now = new Date();
        const currentPeriods = competitionPeriods(now);

        await mockStudentEnvironment(page, {
            userData: {
                lastWeekId_7: currentPeriods.weekId,
                weeklyScore_7: 450,
                lastMonthId_7: currentPeriods.monthId,
                monthlyScore_7: 2300,
                seasonScore_7: 11700
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        const statBoxes = ligPane.locator('.studies-comp-stats-row .comp-stat-box');
        await expect(statBoxes.nth(0).locator('.stat-sub-val')).toHaveText('450');
        await expect(statBoxes.nth(1).locator('.stat-sub-val')).toHaveText('2.3K');
        await expect(statBoxes.nth(2).locator('.stat-sub-val')).toHaveText('11.7K');
    });

    test('4. Tüm Zamanlar Puanı geçmiş sezonları (previousSeasonScores) kapsayan doğru kümülatif değeri gösterir', async ({ page }) => {
        await mockStudentEnvironment(page, {
            userData: {
                seasonScore_7: 11700,
                // Önceki sezonlarda toplanmış puanlar (+10K)
                previousSeasonScores: {
                    '2024-2025': 4500,
                    '2025-2026': 5500
                }
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        // 11.7K (Bu Sezon) + 10.0K (Önceki Sezonlar) = 21.7K
        await expect(ligPane).toContainText('Tüm Zamanlar: 21.7K Puan');
    });

    test('5. İlk kez bu sezon yarışan öğrencide Tüm Zamanlar puanı sezon puanına eşittir (puan uydurulmaz)', async ({ page }) => {
        await mockStudentEnvironment(page, {
            userData: {
                seasonScore_7: 11700,
                totalScore_7: 11700
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        await expect(ligPane).toContainText('Tüm Zamanlar: 11.7K Puan');
    });

    test('6. Veri tabanı erişim hatası veya yüklenememe durumunda sahte 0 üretilmez; "—" ve hata durumu gösterilir', async ({ page }) => {
        await mockStudentEnvironment(page, {
            userData: {
                _loadError: true
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        // Erişim hatası rozeti
        await expect(ligPane).toContainText('Veri Yüklenemedi');
        await expect(ligPane).toContainText('Erişim Hatası');

        const statBoxes = ligPane.locator('.studies-comp-stats-row .comp-stat-box');
        await expect(statBoxes.nth(0).locator('.stat-sub-val')).toHaveText('—');
        await expect(statBoxes.nth(1).locator('.stat-sub-val')).toHaveText('—');
        await expect(statBoxes.nth(2).locator('.stat-sub-val')).toHaveText('—');
    });

    test('7. Çift sayım engeli: global totalScore zaten önceki sınıf puanlarını içeriyorsa tekrar eklenmez', async ({ page }) => {
        await mockStudentEnvironment(page, {
            userData: {
                sinif: '7',
                totalScore_6: 5000,
                seasonScore_7: 11700,
                totalScore_7: 11700,
                // Global totalScore zaten 6. sınıf (5000) + 7. sınıf (11700) = 16700'ü içeriyor
                totalScore: 16700
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        // 16.7K olmalı (5000 tekrar eklenip 21.7K yapılamaz)
        await expect(ligPane).toContainText('Tüm Zamanlar: 16.7K Puan');
    });

    test('8. Europe/Istanbul zaman dilimi doğrulaması: Pazartesi ve Ayın 1i sınır damgaları UTC+3 esaslıdır', async () => {
        const testDate = new Date('2026-11-05T12:00:00Z');
        const boundaries = competitionTimeframeBoundaries(testDate);
        const periods = competitionPeriods(testDate);

        // 2026-11-05 için hafta ID: 2026-W45, ay ID: 2026-11
        expect(periods.weekId).toBe('2026-W45');
        expect(periods.monthId).toBe('2026-11');

        // Pazartesi gece yarısı Europe/Istanbul: 2026-11-02 00:00:00 TRT -> 2026-11-01 21:00:00 UTC
        expect(new Date(boundaries.mondayStartTimestamp).toISOString()).toBe('2026-11-01T21:00:00.000Z');

        // Ayın 1'i gece yarısı Europe/Istanbul: 2026-11-01 00:00:00 TRT -> 2026-10-31 21:00:00 UTC
        expect(new Date(boundaries.monthStartTimestamp).toISOString()).toBe('2026-10-31T21:00:00.000Z');
    });
});
