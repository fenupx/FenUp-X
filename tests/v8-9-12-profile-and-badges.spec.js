// @ts-check
import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';

/**
 * FENUP X — V8.9.12 Öğrenci Profili ve Gelişen Rozetler Test Paketi
 * Task ID: TASK-20261105-PROFILE-BADGES-V8912
 */

async function setupStudentWithExam(page, options = {}) {
    await mockFirebase(page);

    await page.addInitScript((opts) => {
        const examRecord = opts.examRecord || {
            id: 'attempt_senaryo-2_mock',
            timestamp: Date.now() - 3600000,
            date: new Date().toLocaleDateString('tr-TR'),
            grade: '7',
            term: '1',
            examNum: '1',
            scenario: '1. Dönem 1. Yazılı (Senaryo 2)',
            scenarioId: 'senaryo-2',
            status: 'completed',
            score: 98,
            maxScore: 100,
            evaluationType: 'Öz değerlendirme',
            missingOutcomes: ['FB.7.1.1: İki proje'],
            missedCards: [{ id: 'FB711-V6-K03', outcome_id: 'FB.7.1.1', title: 'İki proje' }]
        };

        if (opts.hasExam !== false) {
            window.localStorage.setItem('fenupx_exam_attempts_history', JSON.stringify([examRecord]));
            window.localStorage.setItem('fenupx_last_exam_summary', JSON.stringify({
                score: 98,
                completed: true,
                maxScore: 100,
                percent: 98,
                missingOutcomes: ['FB.7.1.1: İki proje'],
                date: examRecord.date
            }));
        } else {
            window.localStorage.removeItem('fenupx_exam_attempts_history');
            window.localStorage.removeItem('fenupx_last_exam_summary');
        }

        if (opts.viewedCards) {
            window.localStorage.setItem('fenupx_viewed_cards', JSON.stringify(opts.viewedCards));
        } else {
            window.localStorage.removeItem('fenupx_viewed_cards');
        }

        if (opts.badges) {
            window.localStorage.setItem('fenupx_badges', JSON.stringify(opts.badges));
        } else {
            window.localStorage.setItem('fenupx_badges', JSON.stringify(['badge_ilk_adim', 'badge_lab_kaşifi']));
        }
    }, options);

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const studentRecord = {
        role: 'student',
        name: 'Deniz',
        surname: 'Yılmaz',
        nickname: 'KozmikDeniz',
        sinif: '7',
        email: 'deniz@fenupx.com',
        avatar: 'fenupx-v2-galileo',
        totalScore_7: 250,
        seasonScore_7: 120,
        dailyStreak: 3
    };

    await page.evaluate(async (rec) => {
        window.__records = { s: rec };
        if (typeof window.__login === 'function') {
            await window.__login('s');
        }
    }, studentRecord);

    await page.waitForTimeout(150);
}

async function openProfile(page) {
    await page.evaluate(() => {
        const btn = document.getElementById('btn-open-profile');
        if (btn) btn.click();
    });
    const profileModal = page.locator('#profile-modal');
    await expect(profileModal).toBeVisible();
    return profileModal;
}

test.describe('V8.9.12 — Öğrenci Profili, Mobil Taşma ve Rozet İlerlemesi', () => {

    test('1. Mobil Taşma (overflow-x) Yoktur: 375px ve 390px Ekranlarda Sıfır Yatay Kaydırma', async ({ page }) => {
        await setupStudentWithExam(page);
        const profileModal = await openProfile(page);

        for (const width of [375, 390]) {
            await page.setViewportSize({ width, height: 750 });
            await page.waitForTimeout(100);

            // Modal içeriği genişliği viewport'u aşamaz
            const modalBox = await profileModal.locator('.modal-content').boundingBox();
            expect(modalBox).toBeTruthy();
            if (modalBox) {
                expect(modalBox.width).toBeLessThanOrEqual(width);
            }

            // Sayfada ve modal içinde yatay scroll olmamalıdır
            const overflowInfo = await page.evaluate(() => {
                const modal = document.querySelector('#profile-modal .modal-content');
                return {
                    bodyScrollWidth: document.body.scrollWidth,
                    windowInnerWidth: window.innerWidth,
                    modalScrollWidth: modal ? modal.scrollWidth : 0,
                    modalClientWidth: modal ? modal.clientWidth : 0
                };
            });

            expect(overflowInfo.bodyScrollWidth).toBeLessThanOrEqual(overflowInfo.windowInnerWidth + 1);
            expect(overflowInfo.modalScrollWidth).toBeLessThanOrEqual(overflowInfo.modalClientWidth + 1);
        }
    });

    test('2. "Önceki Başarılar" Sütunu Profil UI DOM\'undan Kaldırılmıştır, Veri Korunur', async ({ page }) => {
        await setupStudentWithExam(page, {
            badges: ['badge_ilk_adim', 'badge_lab_kaşifi', 'badge_bilgi_avcisi']
        });
        const profileModal = await openProfile(page);

        // Önceki başarılar dikey detay sütunu DOM'a basılmamalıdır
        const legacyDetails = profileModal.locator('.profile-legacy-badges-details');
        await expect(legacyDetails).toHaveCount(0);

        // Ancak localStorage rozet verisi korunmalıdır
        const storedBadges = await page.evaluate(() => {
            return JSON.parse(window.localStorage.getItem('fenupx_badges') || '[]');
        });
        expect(storedBadges.length).toBe(3);
        expect(storedBadges).toContain('badge_ilk_adim');
    });

    test('3. Üst Profil Kartından "Fen Kâşifi" Sistem Unvanı Kaldırılmıştır', async ({ page }) => {
        await setupStudentWithExam(page);
        const profileModal = await openProfile(page);

        const roleBadge = profileModal.locator('#profile-display-role-tag');
        await expect(roleBadge).toBeVisible();
        const roleText = await roleBadge.textContent();

        // "Fen Kâşifi" veya yıldız içermemelidir
        expect(roleText).not.toContain('Fen Kâşifi');
        expect(roleText).not.toContain('⭐');
        // Yalnızca sınıf bilgisini içermelidir
        expect(roleText).toContain('7. Sınıf');
    });

    test('4. "FB.7.1.1 — İki proje" Hatalı Başlığı "Uzay Araştırmaları" Olarak Düzeltilmiştir', async ({ page }) => {
        await setupStudentWithExam(page);
        const profileModal = await openProfile(page);

        // Yazılı sekmesindeki önerilen konular kutusunu kontrol et
        const recBox = profileModal.locator('.studies-recommendation-box');
        await expect(recBox).toBeVisible();

        // FB.7.1.1 kazanım başlığında "İki proje" bulunmamalı, "Uzay Araştırmaları" bulunmalıdır
        const recList = profileModal.locator('.studies-rec-list');
        await expect(recList).not.toContainText('İki proje');
        await expect(recList).toContainText('FB.7.1.1');
        await expect(recList).toContainText('Uzay Araştırmaları');
    });

    test('5. Mükerrer Rozet Etiketleri Yoktur ("Henüz Başlanmadı" + "Başlangıç" Çelişkisi Giderilmiştir)', async ({ page }) => {
        await setupStudentWithExam(page, { hasExam: false });
        const profileModal = await openProfile(page);

        const badgeCards = profileModal.locator('.cosmic-badges-grid .badge-family-card');
        await expect(badgeCards).toHaveCount(3);

        for (let i = 0; i < 3; i++) {
            const card = badgeCards.nth(i);
            const text = await card.textContent();
            // Aynı kart içinde "Henüz Başlanmadı" ve "Başlangıç" peş peşe bulunmamalıdır
            expect(text).not.toContain('Henüz Başlanmadı');
            expect(text).not.toContain('Başlangıç');
            // Hedef aşama açıkça belirtilmelidir
            expect(text).toContain('1. Aşama Hedefi');
        }
    });

    test('6. Kararlı Kâşif İlerleme Mantığı: 1 Provası Olan Hesapta "1. Adım Tamamlandı" Gösterilir', async ({ page }) => {
        // Öğrenci 1 prova tamamlamış (98 puan), ancak henüz tekrar kartı çalışmamış
        await setupStudentWithExam(page, { hasExam: true, viewedCards: [] });
        const profileModal = await openProfile(page);

        const examBadgeCard = profileModal.locator('.cosmic-badges-grid .badge-family-card').nth(1);
        await expect(examBadgeCard).toContainText('Kararlı Kâşif');

        // Rozet durumu "Henüz Başlanmadı" veya "Başlangıç" kalamaz
        await expect(examBadgeCard).not.toContainText('Henüz Başlanmadı');
        await expect(examBadgeCard).not.toContainText('Başlangıç');

        // 1. adım tamamlandı durumu ve pedagojik döngü hedefi gösterilmelidir
        await expect(examBadgeCard).toContainText('1. Adım Tamamlandı');
        await expect(examBadgeCard).toContainText('🎯 1. Adım Tamamlandı (Yazılı provası yapıldı)');
        const cardText = await examBadgeCard.textContent();
        expect(cardText?.toLowerCase()).not.toContain('deneme');

        // İlerleme çubuğu sıfır kalamaz (> 0)
        const progFill = examBadgeCard.locator('.badge-family-prog-fill');
        const styleAttr = await progFill.getAttribute('style');
        expect(styleAttr).toBeTruthy();
        expect(styleAttr).not.toContain('width: 0%');
    });

    test('7. Kararlı Kâşif Hedef Metninde "deneme" Kelimesi Yoktur, Pedagojik Döngü İfadesi Yer Alır', async ({ page }) => {
        // Sıfır provası olan yeni öğrenci
        await setupStudentWithExam(page, { hasExam: false });
        const profileModal = await openProfile(page);

        const examBadgeCard = profileModal.locator('.cosmic-badges-grid .badge-family-card').nth(1);
        await expect(examBadgeCard).toContainText('Kararlı Kâşif');

        const hintText = await examBadgeCard.locator('.badge-family-next-hint').textContent();
        expect(hintText?.toLowerCase()).not.toContain('deneme');
        expect(hintText).toContain('1 yazılı provasını tamamla, eksik konu kartlarını incele ve yeni bir provayla gelişimini göster');
    });

});
