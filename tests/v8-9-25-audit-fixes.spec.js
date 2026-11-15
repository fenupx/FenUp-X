// @ts-check
import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';

test.describe('V8.9.25 — Birleşik Teknik ve Görsel Yerleşim Düzeltmeleri', () => {

    test('1. JS/Mantık Düzeltmeleri: JSON ?v=8.9.25, Liderlik uid anahtarı, Zamanı Durdur + Pas senkronu ve Turnuva/Kura HTML Escape', async ({ page }) => {
        const requestedUrls = [];
        page.on('request', req => {
            if (req.url().includes('_sinif_sorular.json')) {
                requestedUrls.push(req.url());
            }
        });

        await mockFirebase(page, true);

        // 1) Soru JSON Önbellek (?v=8.9.25) kontrolü ve Bireysel Yarışma
        await page.locator('#btn-oyun-modulu').click();
        await page.locator('#btn-mode-bireysel').click();
        await page.locator('#btn-skip-draw').click();
        await page.locator('.class-card[data-grade="7"]').click();

        await expect.poll(() => requestedUrls.some(u => u.includes('7_sinif_sorular.json?v=8.9.25'))).toBe(true);

        // 2) Liderlik Tablosu: Aynı nickname'e sahip 2 farklı uid birbirini ezmemeli + legacy uid/normNick birleştirme
        const lbCheck = await page.evaluate(async () => {
            const now = new Date();
            const { competitionPeriods, competitionYear } = await import('/competition-config.js');
            const periods = competitionPeriods(now);
            const year = competitionYear(now);
            window.__records = {
                u_same_1: {
                    uid: 'u_same_1',
                    role: 'student',
                    sinif: '7',
                    grade: '7',
                    schoolYear: year,
                    weekId: periods.weekId,
                    monthId: periods.monthId,
                    nickname: 'AyniIsimliKaptan',
                    weeklyScore: 450,
                    monthlyScore: 450,
                    score: 450,
                    seasonScore_7: 50
                },
                u_same_2: {
                    uid: 'u_same_2',
                    role: 'student',
                    sinif: '7',
                    grade: '7',
                    schoolYear: year,
                    weekId: periods.weekId,
                    monthId: periods.monthId,
                    nickname: 'AyniIsimliKaptan',
                    weeklyScore: 300,
                    monthlyScore: 300,
                    score: 300,
                    seasonScore_7: 25
                }
            };
            await window.loadGlobalLeaderboard('weekly');
            const rows = Array.from(document.querySelectorAll('#global-lb-list .global-lb-row'));
            return {
                rowCount: rows.length,
                rowsText: rows.map(r => r.textContent.replace(/\s+/g, ' ').trim())
            };
        });
        expect(lbCheck.rowCount).toBe(2);
        expect(lbCheck.rowsText[0]).toContain('AyniIsimliKaptan');
        expect(lbCheck.rowsText[0]).toContain('500'); // 450 cohort + 50 legacy
        expect(lbCheck.rowsText[1]).toContain('AyniIsimliKaptan');
        expect(lbCheck.rowsText[1]).toContain('325'); // 300 cohort + 25 legacy

        // 3) Zamanı Durdur + Pas Joker Senkronizasyonu
        await page.locator('#scene-unit .unit-card').first().click();
        await page.locator('#btn-start-from-rules').click();
        await expect(page.locator('#scene-quiz')).toBeVisible();

        // joker-pause görünür olduğunda Zamanı Durdur + Pas etkileşimini doğrula:
        await page.evaluate(() => {
            const jPause = document.getElementById('joker-pause');
            jPause.classList.remove('is-hidden');
        });
        await page.locator('#joker-pause').click();
        await expect(page.locator('#joker-pause')).toContainText('Süreyi Başlat');
        await expect(page.locator('#joker-pause')).toHaveClass(/is-used/);

        // Süre durdurulmuşken Pas jokerine bas:
        await page.locator('#joker-pass').click();

        const afterPassPauseBtn = await page.evaluate(() => {
            const jPause = document.getElementById('joker-pause');
            return {
                text: jPause.textContent.trim(),
                bg: jPause.style.background,
                opacity: jPause.style.opacity,
                pointerEvents: jPause.style.pointerEvents,
                isUsed: jPause.classList.contains('is-used')
            };
        });
        expect(afterPassPauseBtn.text).toBe('Kullanıldı');
        expect(afterPassPauseBtn.bg).toBe('');
        expect(afterPassPauseBtn.opacity).toBe('0.5');
        expect(afterPassPauseBtn.pointerEvents).toBe('none');
        expect(afterPassPauseBtn.isUsed).toBe(true);

        // 4) Kura ve Turnuva Adlarında HTML Escape kontrolü
        await page.evaluate(() => window.returnToHome());
        await page.locator('#btn-oyun-modulu').click();
        await page.locator('#btn-mode-turnuva').click();
        await page.locator('#t-name-1').fill('Grup <img src=x onerror=window.__xss=1>');
        await page.locator('#btn-start-tournament').click();
        await page.locator('.class-card[data-grade="7"]').click();
        await page.locator('#scene-unit .unit-card').first().click();
        await page.locator('#btn-start-from-rules').click();
        await page.locator('#btn-t-skip-timer').click();
        await page.locator('#btn-cards-seen').click();
        await expect(page.locator('#t-teams-container')).toBeVisible();

        const xssCheck = await page.evaluate(() => {
            const container = document.getElementById('t-teams-container');
            const h3Text = container?.querySelector('h3')?.textContent || '';
            return {
                xssTriggered: !!window.__xss,
                hasImgInContainer: !!container?.querySelector('img'),
                h3Text
            };
        });
        expect(xssCheck.xssTriggered).toBe(false);
        expect(xssCheck.hasImgInContainer).toBe(false);
        expect(xssCheck.h3Text).toContain('Grup <img src=x onerror=window.__xss=1>');
    });

    test('2. 5 Ekran Profilinde Görsel Yerleşim ve Taşma Bulgularının (3.1 - 3.5) Giderilmesi Doğrulaması', async ({ page }) => {
        await mockFirebase(page, true);
        const vw = page.viewportSize().width;

        // Bulgu 3.4: #scene-crossroads mod seçim kartları hover kesişmesi = 0
        await page.locator('#btn-oyun-modulu').click();
        await expect(page.locator('#scene-crossroads')).toBeVisible();
        await page.locator('#btn-mode-bireysel').hover();
        await page.waitForTimeout(350);

        const crossroadsOverlap = await page.evaluate(() => {
            const b1 = document.getElementById('btn-mode-bireysel').getBoundingClientRect();
            const b2 = document.getElementById('btn-mode-turnuva').getBoundingClientRect();
            const xOverlap = Math.max(0, Math.min(b1.right, b2.right) - Math.max(b1.left, b2.left));
            const yOverlap = Math.max(0, Math.min(b1.bottom, b2.bottom) - Math.max(b1.top, b2.top));
            return (xOverlap > 0 && yOverlap > 0) ? Math.round(xOverlap) : 0;
        });
        expect(crossroadsOverlap).toBe(0);

        // Bulgu 3.5: #scene-quiz içinde .answer-btn.is-correct taşması = 0
        await page.locator('#btn-mode-bireysel').click();
        await page.locator('#btn-skip-draw').click();
        await page.locator('.class-card[data-grade="5"]').click();
        await page.locator('#scene-unit .unit-card').first().click();
        await page.locator('#btn-start-from-rules').click();
        await expect(page.locator('#scene-quiz')).toBeVisible();

        const quizOverflow = await page.evaluate(() => {
            const firstAns = document.querySelector('#scene-quiz .answer-btn');
            firstAns.classList.add('is-correct');
            const sc = document.getElementById('scene-quiz');
            return {
                scrollWidth: sc.scrollWidth,
                clientWidth: sc.clientWidth,
                diff: sc.scrollWidth - sc.clientWidth
            };
        });
        expect(quizOverflow.diff).toBeLessThanOrEqual(0);

        // Bulgu 3.1 & 3.2: Sanal Laboratuvar .metrics-pill.status (Deney 7.9, 6.2, 5.1, 5.8) ve Deney 7.1 #btn-work-mode-dist
        await page.evaluate(() => window.returnToHome());
        await page.locator('#btn-deney-modulu').click();
        await expect(page.locator('#lab-catalog-view')).toBeVisible();

        for (const expId of ['5.1', '5.8', '6.2', '7.1', '7.9']) {
            const expCheck = await page.evaluate((id) => {
                window.FenUpLab.openExperimentWorkspace(id);
                const lv = document.getElementById('lab-view');
                const statusPill = lv.querySelector('.metrics-pill.status:not(.is-hidden)');
                const distBtn = document.getElementById('btn-work-mode-dist');
                const pillRect = statusPill ? statusPill.getBoundingClientRect() : null;
                const distRect = (id === '7.1' && distBtn) ? distBtn.getBoundingClientRect() : null;
                return {
                    id,
                    lvScrollWidth: lv.scrollWidth,
                    lvClientWidth: lv.clientWidth,
                    pillLeft: pillRect ? Math.round(pillRect.left) : 0,
                    pillRight: pillRect ? Math.round(pillRect.right) : 0,
                    distRight: distRect ? Math.round(distRect.right) : 0,
                    innerWidth: window.innerWidth
                };
            }, expId);

            expect(expCheck.lvScrollWidth).toBeLessThanOrEqual(expCheck.lvClientWidth + 1);
            expect(expCheck.pillLeft).toBeGreaterThanOrEqual(0);
            expect(expCheck.pillRight).toBeLessThanOrEqual(expCheck.innerWidth);
            if (expId === '7.1') {
                expect(expCheck.distRight).toBeLessThanOrEqual(expCheck.innerWidth);
            }
        }

        // Bulgu 3.3: Yönetim Paneli (#admin-modal .modal-content) dar mobil ekranda (390px dahil) taşmasız
        const adminCheck = await page.evaluate(async () => {
            window.__records = {
                admin_test: { uid: 'admin_test', role: 'admin', name: 'Test', surname: 'Admin', email: 'admin@example.invalid' }
            };
            await window.__login('admin_test');
            await window.loadAdminUsers();
            const m = document.getElementById('admin-modal');
            m.classList.remove('is-hidden');
            m.classList.add('is-open', 'active');
            m.style.display = 'flex';
            if (typeof window.refreshAdminQuestionCount === 'function') {
                await window.refreshAdminQuestionCount();
            }
            const mc = m.querySelector('.modal-content');
            return {
                scrollWidth: mc.scrollWidth,
                clientWidth: mc.clientWidth,
                diff: mc.scrollWidth - mc.clientWidth
            };
        });
        expect(adminCheck.diff).toBeLessThanOrEqual(0);
        expect(vw).toBeGreaterThan(0);
    });
});
