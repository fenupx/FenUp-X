// @ts-check
import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';

/**
 * FENUP X — V8.9.13 Profil Şampiyonlar Ligi ve Etkileşim Test Paketi
 * Task ID: TASK-20261105-CHAMPIONS-PROFILE-V8913
 */

async function mockStudentEnvironment(page, options = {}) {
    await mockFirebase(page);

    await page.addInitScript((opts) => {
        if (opts.compHistory) {
            window.localStorage.setItem('fenupx_competition_history', JSON.stringify(opts.compHistory));
        } else if (opts.compHistory === null) {
            window.localStorage.removeItem('fenupx_competition_history');
        }

        if (opts.labProgress) {
            window.localStorage.setItem('fenupx_lab_progress', JSON.stringify(opts.labProgress));
        } else if (opts.labProgress === null) {
            window.localStorage.removeItem('fenupx_lab_progress');
        }
    }, options);

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

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
        weeklyScore_7: 450,
        monthlyScore_7: 2300,
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

test.describe('FenUp X — V8.9.13 Profil Şampiyonlar Ligi ve Etkileşim Düzeltmeleri', () => {

    test('1. "7. Sınıfta Sıralamada" Bozuk İfadesi Yoktur; Sıralama Yokken "Henüz Sıralama Yok" Yazar', async ({ page }) => {
        await mockStudentEnvironment(page, {
            compHistory: [],
            userData: {
                _cachedRank: null,
                rank: null,
                userRank: null
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        // Şampiyonlar Ligi sekmesine geç
        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        // Bozuk "7. Sınıfta Sıralamada" ifadesinin bulunmadığını doğrula
        await expect(ligPane).not.toContainText('7. Sınıfta Sıralamada');
        await expect(ligPane).not.toContainText('Sınıfta Sıralamada');

        // Fallback olarak "Henüz Sıralama Yok" yazmalı
        const rankBar = ligPane.locator('.studies-comp-rank-bar');
        await expect(rankBar).toBeVisible();
        await expect(rankBar).toContainText('Henüz Sıralama Yok');
    });

    test('2. Sayısal Sıralama Mevcut Olduğunda Doğru Şekilde "${userRank}. Sırada" Gösterilir', async ({ page }) => {
        await mockStudentEnvironment(page, {
            userData: {
                _cachedRank: 14,
                seasonScore_7: 11700
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        // "14. Sırada" basıldığını doğrula
        const rankBar = ligPane.locator('.studies-comp-rank-bar');
        await expect(rankBar).toContainText('14. Sırada');
        await expect(ligPane).not.toContainText('7. Sınıfta Sıralamada');
    });

    test('3. Puan Kartları 3 Sütunlu Kompakt Yapıda (Haftalık / Aylık / Sezonluk) Render Edilir, Mükerrer Başlık Yoktur', async ({ page }) => {
        await mockStudentEnvironment(page, {
            userData: {
                weeklyScore_7: 450,
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

        // Üst haptaki mükerrer "Bu Sezon: 11.7K Puan" yerine sezon etiketi gelir
        const scoreTag = ligPane.locator('.studies-card-header .studies-score-tag');
        await expect(scoreTag).toContainText('2026-2027 Sezonu');

        // 3 sütunlu puan kutusu kontrolü
        const statBoxes = ligPane.locator('.studies-comp-stats-row .comp-stat-box');
        await expect(statBoxes).toHaveCount(3);

        await expect(statBoxes.nth(0)).toContainText('Haftalık Puan');
        await expect(statBoxes.nth(0)).toContainText('450');

        await expect(statBoxes.nth(1)).toContainText('Aylık Puan');
        await expect(statBoxes.nth(1)).toContainText('2.3K');

        await expect(statBoxes.nth(2)).toContainText('Bu Sezon Puanın');
        await expect(statBoxes.nth(2)).toContainText('11.7K');

        // Kırık "undefined" bulunmadığını doğrula
        await expect(ligPane.locator('.studies-comp-stats-row')).not.toContainText('undefined');
    });

    test('4. Bilgi Kutusundaki Ölü "Yarışmaya Başla" Butonu Kaldırılmıştır; Yalnızca 2 Eylem Butonu Kalır', async ({ page }) => {
        await mockStudentEnvironment(page, {
            compHistory: []
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        // Bilgi kutusu mevcut ve bilgilendirici metin içeriyor
        const emptyState = ligPane.locator('.studies-empty-state');
        await expect(emptyState).toBeVisible();
        await expect(emptyState).toContainText('Detaylı yarışma geçmişi bu sürümden itibaren izlenmektedir.');

        // Bilgi kutusunun içinde buton YOKTUR
        await expect(emptyState.locator('button')).toHaveCount(0);

        // Şampiyonlar Ligi özet kartında yalnızca 2 net eylem butonu vardır
        const actionButtons = ligPane.locator('.studies-comp-actions-bar button');
        await expect(actionButtons).toHaveCount(2);
        await expect(actionButtons.nth(0)).toContainText('Liderlik Tablosunu Aç');
        await expect(actionButtons.nth(1)).toContainText('Yeni Yarışma');
    });

    test('5. "Liderlik Tablosunu Aç" Butonu Profil Modalını Kapatır ve Şampiyonlar Ligi Ekranını Açar', async ({ page }) => {
        await mockStudentEnvironment(page);

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        // "Liderlik Tablosunu Aç" butonuna tıkla
        await ligPane.locator('.btn-open-lb-from-prof').click();

        // Profil modalı kapanmalıdır
        await expect(profileModal).toBeHidden();

        // Şampiyonlar Ligi (scene-unit / unit-leaderboard-side) görünür olmalıdır
        const unitScene = page.locator('#scene-unit');
        await expect(unitScene).toBeVisible();

        const lbSide = page.locator('#unit-leaderboard-side');
        await expect(lbSide).toBeVisible();
    });

    test('6. Sanal Laboratuvar Boş Durumda Mükerrer Akordiyon/Buton Yoktur, Tek Giriş Noktası Ana Butondur', async ({ page }) => {
        await mockStudentEnvironment(page, {
            labProgress: {}
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        // Laboratuvar sekmesine geç
        await profileModal.locator('#tab-btn-lab').click();
        const labPane = profileModal.locator('#pane-study-lab');
        await expect(labPane).toBeVisible();

        // Üstteki ana mavi buton tek giriş noktası olarak mevcuttur
        const mainCatalogBtn = labPane.locator('.btn-open-full-lab-catalog');
        await expect(mainCatalogBtn).toBeVisible();
        await expect(mainCatalogBtn).toContainText('Tüm Deney Kataloğunu Aç');

        // Boş durum kutusu sadece rehber metin barındırır
        const emptyState = labPane.locator('.studies-empty-state');
        await expect(emptyState).toBeVisible();
        await expect(emptyState).toContainText('Henüz laboratuvar çalışması kaydınız bulunmuyor.');

        // Boş durumda mükerrer "Tüm Deney Listesi" akordiyonu DOM'da yer ALMAZ
        await expect(labPane.locator('.profile-all-labs-details')).toHaveCount(0);
    });
});
