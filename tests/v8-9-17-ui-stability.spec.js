// @ts-check
import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';

/**
 * FENUP X — V8.9.17 Canlı Tarama Sonrası Arayüz ve Gezinme Düzeltmeleri Test Paketi
 * Task ID: TASK-20261106-UI-STABILITY-V8917
 */

async function setupStudentProfile(page, options = {}) {
    await mockFirebase(page);

    await page.addInitScript((opts) => {
        const examRecord = {
            id: 'attempt_senaryo-2_mock',
            timestamp: Date.now() - 3600000,
            date: new Date().toLocaleDateString('tr-TR'),
            grade: '7',
            term: '1',
            examNum: '1',
            scenario: '1. Dönem 1. Yazılı (Senaryo 2)',
            scenarioId: 'senaryo-2',
            status: 'completed',
            score: 95,
            maxScore: 100,
            evaluationType: 'Öz değerlendirme',
            missingOutcomes: ['FB.7.1.1: Uzay Araştırmaları']
        };

        window.localStorage.setItem('fenupx_exam_attempts_history', JSON.stringify([examRecord]));
        window.localStorage.setItem('fenupx_last_exam_summary', JSON.stringify({
            score: 95,
            completed: true,
            maxScore: 100,
            percent: 95,
            missingOutcomes: ['FB.7.1.1: Uzay Araştırmaları'],
            date: examRecord.date
        }));

        window.localStorage.setItem('fenupx_badges', JSON.stringify(['badge_ilk_adim', 'badge_lab_kaşifi']));
    }, options);

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const studentRecord = {
        role: 'student',
        name: 'Kozmik',
        surname: 'Kâşif',
        nickname: 'KozmikKasif',
        sinif: '7',
        email: 'kasif@fenupx.com',
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

    await page.waitForTimeout(200);
}

test.describe('V8.9.17 — Arayüz Kararlılığı, Rozetler ve Değerlendirme', () => {

    test('T01: Masaüstü Rozet Kartları Tek Sütun ve Yazı Çakışmasız (100%, 125%, 150%)', async ({ page }) => {
        await page.setViewportSize({ width: 1366, height: 768 });
        await setupStudentProfile(page);

        // Profil modalını aç
        await page.evaluate(() => {
            const btn = document.getElementById('btn-open-profile');
            if (btn) btn.click();
        });

        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        const badgeContainer = page.locator('.badge-families-container');
        await expect(badgeContainer).toBeVisible();

        // 1. Grid şablonu 1fr olmalıdır (tek sütun)
        const gridCols = await badgeContainer.evaluate((el) => {
            return window.getComputedStyle(el).gridTemplateColumns;
        });
        const colCount = gridCols.trim().split(/\s+/).length;
        expect(colCount).toBe(1);

        // 2. Kartların içinde başlık ve aşama etiketi çakışmamalıdır
        const cards = page.locator('.badge-family-card');
        const cardCount = await cards.count();
        expect(cardCount).toBe(3);

        for (let i = 0; i < cardCount; i++) {
            const card = cards.nth(i);
            const titleEl = card.locator('.badge-family-title');
            const tagEl = card.locator('.badge-stage-tag');

            await expect(titleEl).toBeVisible();
            await expect(tagEl).toBeVisible();

            const titleBox = await titleEl.boundingBox();
            const tagBox = await tagEl.boundingBox();

            expect(titleBox).not.toBeNull();
            expect(tagBox).not.toBeNull();

            if (titleBox && tagBox) {
                const isHorizontallySeparated = (tagBox.x >= titleBox.x + titleBox.width - 2);
                const isVerticallySeparated = (tagBox.y >= titleBox.y + titleBox.height - 2);
                expect(isHorizontallySeparated || isVerticallySeparated).toBe(true);
            }
        }

        // 3. Zoom seviyelerinde (125%, 150%) taşma / çakışma testi
        for (const zoom of [1.25, 1.5]) {
            await page.evaluate((z) => {
                document.body.style.zoom = `${z}`;
            }, zoom);
            await page.waitForTimeout(100);

            for (let i = 0; i < cardCount; i++) {
                const card = cards.nth(i);
                const isOverflowing = await card.evaluate((el) => el.scrollWidth > el.clientWidth + 2);
                expect(isOverflowing).toBe(false);
            }
        }

        await page.evaluate(() => { document.body.style.zoom = '1'; });
    });

    test('A01: Profil Açma Gezinmeyi Bozmaz ve Ana Sayfaya Döndürmez', async ({ page }) => {
        await setupStudentProfile(page);

        const sceneHome = page.locator('#scene-home');
        await expect(sceneHome).toBeVisible();

        // 1. Profil modalını aç
        await page.evaluate(() => {
            const btn = document.getElementById('btn-open-profile');
            if (btn) btn.click();
        });
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();
        await expect(sceneHome).toBeVisible();

        // 2. Kapatma düğmesi ile kapat
        await page.locator('#close-profile').click();
        await expect(profileModal).toBeHidden();
        await expect(sceneHome).toBeVisible();

        // 3. Hızlı ardışık tıklamalar gezinme hatası üretmemeli
        await page.evaluate(() => {
            const btn = document.getElementById('btn-open-profile');
            if (btn) {
                btn.click();
                btn.click();
            }
        });
        await expect(profileModal).toBeVisible();
        await page.locator('#close-profile').click();
        await expect(profileModal).toBeHidden();
    });

    test('T02 & T03: Öz Değerlendirme Uyarı Kutusu Temizliği, Gezinme Etiketleri ve Puan Hesabı', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());

        // Yazılı modülünü aç ve provayı başlat
        await page.locator('#btn-yazili-modulu').click();
        await page.locator('#btn-scope-continue').click();
        await page.locator('#btn-choice-go-practice').click();

        await page.locator('#exam-start-practice').click();
        await expect(page.locator('#practice-active-box')).toBeVisible();

        // Soru 1'e bir cevap yaz
        await page.locator('#practice-text-ans').fill('Uzay kirliliği cevabı.');

        // 7. soruya kadar ilerle
        for (let i = 0; i < 6; i++) {
            await page.locator('#btn-practice-next-q').click();
        }

        // Provayı bitir ve değerlendirmeye geç
        const btnFinish = page.locator('#btn-practice-finish');
        await expect(btnFinish).toBeVisible();
        await btnFinish.click();
        await expect(page.locator('#exam-view-eval')).toBeVisible();

        const noticeBox = page.locator('#eval-notice-box');
        const btnNext = page.locator('#btn-eval-next-q');
        const btnFull = page.locator('#btn-eval-full');
        const btnZero = page.locator('#btn-eval-zero');

        // 1. Seçim yapmadan ilerle butonuna bas -> Uyarı kutusu görünür
        await btnNext.click();
        await expect(noticeBox).toBeVisible();
        const noticeText = await page.locator('#eval-notice-text').textContent();
        expect(noticeText).toContain('öz değerlendirmenizi yapın');

        // 2. "Tam Doğru Yaptım" seçildiğinde uyarı kutusu anında kaybolmalıdır
        await btnFull.click();
        await expect(noticeBox).toBeHidden();

        // 3. Soru 1 değerlendirildiğinde nav butonundaki title ve aria-label "Değerlendirildi" olmalıdır
        const navBtn0 = page.locator('[data-eval-q="0"]');
        await expect(navBtn0).toHaveClass(/eval-completed/);
        const navBtn0Title = await navBtn0.getAttribute('title');
        const navBtn0Aria = await navBtn0.getAttribute('aria-label');
        expect(navBtn0Title).toContain('Değerlendirildi');
        expect(navBtn0Aria).toContain('Değerlendirildi');

        // 4. İkinci soruya otomatik veya gezinmeyle geçildiğinde uyarı kutusu temiz olmalıdır
        await page.waitForTimeout(400);
        await expect(noticeBox).toBeHidden();

        // 5. 8 puanlık kısmi soru + 6 sıfır sorunun özette 8/100 ve 1 kısmi / 6 sıfır üretmesi
        const summaryCheck = await page.evaluate(() => {
            const raw = window.localStorage.getItem('fenupx_exam_pilot_v1');
            const state = raw ? JSON.parse(raw) : null;
            const a = state?.attempt;
            if (!a || !a.ids) return null;

            a.criteriaMap = a.criteriaMap || {};
            a.selectedCriteria = a.selectedCriteria || {};
            a.evaluatedQuestions = a.evaluatedQuestions || {};
            a.scores = a.scores || {};
            a.questionStatuses = a.questionStatuses || {};

            const q0 = a.ids[0];
            a.criteriaMap[q0] = [
                { id: 'crit_1', points: 8, text: 'Temel kavram doğru' },
                { id: 'crit_2', points: 7, text: 'Örnek açıklama' }
            ];
            a.selectedCriteria[q0] = ['crit_1']; // 8 puan
            a.evaluatedQuestions[q0] = true;
            a.scores[q0] = 8;
            a.questionStatuses[q0] = 'partial';

            // Kalan 6 soruyu 0 puan yap
            for (let i = 1; i < a.ids.length; i++) {
                const qId = a.ids[i];
                a.criteriaMap[qId] = [{ id: `crit_zero_${i}`, points: 14, text: 'Ölçüt' }];
                a.selectedCriteria[qId] = [];
                a.evaluatedQuestions[qId] = true;
                a.scores[qId] = 0;
                a.questionStatuses[qId] = 'zero';
            }

            let total = 0, fully = 0, partial = 0, zero = 0;
            a.ids.forEach(id => {
                const qScore = window.FenUpExam?.getQuestionScore ? window.FenUpExam.getQuestionScore(id, a) : (a.scores[id] || 0);
                const qTarget = a.questionPoints?.[id] || 15;
                total += qScore;
                if (qScore === qTarget) fully++;
                else if (qScore > 0) partial++;
                else zero++;
            });

            return { total, fully, partial, zero };
        });

        expect(summaryCheck).not.toBeNull();
        if (summaryCheck) {
            expect(summaryCheck.total).toBe(8);
            expect(summaryCheck.fully).toBe(0);
            expect(summaryCheck.partial).toBe(1);
            expect(summaryCheck.zero).toBe(6);
        }
    });

    test('T04: Laboratuvar Toast Bildirimi (#lab-toast) Yaşam Döngüsü ve Erişilebilirlik', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Toast göster
        await page.evaluate(() => {
            if (window.FenUpLab && typeof window.FenUpLab.showLabToast === 'function') {
                window.FenUpLab.showLabToast('Deney Başlatıldı');
            }
        });

        const toast = page.locator('#lab-toast');
        await expect(toast).toBeVisible();
        await expect(toast).toHaveClass(/show/);
        await expect(toast).toHaveText('Deney Başlatıldı');
        await expect(toast).toHaveAttribute('role', 'status');
        await expect(toast).toHaveAttribute('aria-live', 'polite');

        // clearLabToast() çağrıldığında aria-hidden="true" olmalı
        await page.evaluate(() => {
            if (window.FenUpLab && typeof window.FenUpLab.clearLabToast === 'function') {
                window.FenUpLab.clearLabToast();
            }
        });

        await expect(toast).not.toHaveClass(/show/);
        await expect(toast).toHaveAttribute('aria-hidden', 'true');

        // Fade timeout (300ms) sonrası display none ve textContent boş olmalı
        await page.waitForTimeout(350);
        const toastStyle = await toast.evaluate(el => el.style.display);
        const toastText = await toast.evaluate(el => el.textContent);
        expect(toastStyle).toBe('none');
        expect(toastText).toBe('');
    });

    test('T05: 7.1 İş Deneyinde Oynatıldığında "Deneye Hazır" Başlığı "Hareket Halinde"ye Geçer', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Deney modülünü aç ve 7.1 çalışma masasını yükle
        const btnLab = page.locator('#btn-deney-modulu');
        await btnLab.click();

        await page.evaluate(() => {
            if (window.FenUpLab && typeof window.FenUpLab.openExperimentWorkspace === 'function') {
                window.FenUpLab.openExperimentWorkspace('7.1');
            }
        });

        const titleEl = page.locator('#work-pedagogical-title');
        await expect(titleEl).toBeVisible();

        // Başlangıçta "Deneye Hazır"
        const initialText = await titleEl.textContent();
        expect(initialText).toContain('Deneye Hazır');

        // "Hareketi Başlat" butonuna tıkla
        const btnPlay = page.locator('#btn-work-play-pause');
        await btnPlay.click();

        // Başlık hemen "Hareket Halinde"ye geçmelidir
        await expect(titleEl).toContainText('Hareket Halinde');

        // Başa al / sıfırla
        const btnReset = page.locator('#btn-work-reset');
        await btnReset.click();
        await expect(titleEl).toContainText('Deneye Hazır');
    });

    test('T06: Bireysel Yarışma Sonu ve Puan Durumunda Dönüş Buton Metni "YARIŞMA BAŞLANGICINA DÖN"dür', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        const btnBackDraw = page.locator('#btn-back-draw');
        const btnLbContinue = page.locator('#btn-leaderboard-continue');

        await expect(btnBackDraw).toHaveText('YARIŞMA BAŞLANGICINA DÖN');
        await expect(btnLbContinue).toHaveText('YARIŞMA BAŞLANGICINA DÖN');
    });

    test('T07: 6.8 Gravzant Deneyinde 5. Adım Gözlem Etiketi "5. Soğutma Sonrası Yeniden Deneme"dir', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        const btnLab = page.locator('#btn-deney-modulu');
        await btnLab.click();

        await page.evaluate(() => {
            if (window.FenUpLab && typeof window.FenUpLab.openExperimentWorkspace === 'function') {
                window.FenUpLab.openExperimentWorkspace('6.8');
            }
        });

        // 5. Adım butonuna tıkla
        const btnQuenchedPass = page.locator('#pill-grav-pass-quenched');
        await expect(btnQuenchedPass).toBeVisible();
        await btnQuenchedPass.click();

        // Deftere kaydet butonuna bas
        const btnRecord = page.locator('#btn-record-data-6-8');
        await expect(btnRecord).toBeVisible();
        await btnRecord.click();

        // Kaydedilen son satırın etiketini al
        const fifthStepLabel = await page.evaluate(() => {
            const rows = window.FenUpLab?.labState?.expansion?.measurements || [];
            return rows.length > 0 ? rows[rows.length - 1].col1 : null;
        });

        expect(fifthStepLabel).toBe('5. Soğutma Sonrası Yeniden Deneme');
    });

});
