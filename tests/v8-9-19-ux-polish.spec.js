// @ts-check
import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';

/**
 * FENUP X — V8.9.19 Teknik Cila ve Kullanıcı Deneyimi Geliştirme Test Paketi
 * Task ID: TASK-20261110-POLISH-AND-UX-V8919
 */

test.describe('FenUp X — V8.9.19 Teknik Cila ve Kullanıcı Deneyimi Doğrulaması', () => {

    test('1. Üst bar ses butonuna (#btn-global-sound-toggle) tıklandığında isMuted değişir, localStorage ve sayfa yenilemede korunur', async ({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem('fenupx_cookie_consent', 'accepted');
        });
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        const soundBtn = page.locator('#btn-global-sound-toggle');
        await expect(soundBtn).toBeVisible();
        await expect(soundBtn).toHaveAttribute('type', 'button');
        await expect(soundBtn).toHaveAttribute('title', 'Sesi Kapat / Aç');
        await expect(soundBtn.locator('i')).toHaveClass(/fa-volume-up/);

        const initialState = await page.evaluate(() => ({
            isMuted: window.isMuted,
            stored: localStorage.getItem('fenupx_sound_muted')
        }));
        expect(initialState.isMuted).toBe(false);

        // Sesi kapat
        await soundBtn.click();
        await expect(soundBtn.locator('i')).toHaveClass(/fa-volume-mute/);

        const mutedState = await page.evaluate(() => ({
            isMuted: window.isMuted,
            stored: localStorage.getItem('fenupx_sound_muted')
        }));
        expect(mutedState.isMuted).toBe(true);
        expect(mutedState.stored).toBe('true');

        // Sayfayı yenilediğimizde localStorage'dan okunup kapalı başlamalı
        await page.reload();
        await page.waitForLoadState('domcontentloaded');
        await expect(soundBtn.locator('i')).toHaveClass(/fa-volume-mute/);
        expect(await page.evaluate(() => window.isMuted)).toBe(true);

        // Tekrar tıklayınca ses açılmalı
        await soundBtn.click();
        await expect(soundBtn.locator('i')).toHaveClass(/fa-volume-up/);
        const unmutedState = await page.evaluate(() => ({
            isMuted: window.isMuted,
            stored: localStorage.getItem('fenupx_sound_muted')
        }));
        expect(unmutedState.isMuted).toBe(false);
        expect(unmutedState.stored).toBe('false');
    });

    test('2. Yazılı provasında 40 dk süre seçildiğinde #exam-countdown DOMa eklenir, geri sayar, renk uyarısı ve süre bitimi modalı çalışır; Kâğıtta Çöz modunda devreye girmez', async ({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem('fenupx_cookie_consent', 'accepted');
        });
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Yazılıya Hazırlık -> Senaryo -> Provaya Başla
        await page.locator('#btn-yazili-modulu').click();
        await page.locator('#btn-scope-continue').click();
        await page.locator('#btn-choice-go-practice').click();

        const timerCheckbox = page.locator('#exam-timer-enabled');
        await expect(timerCheckbox).toBeVisible();
        await expect(timerCheckbox).not.toBeChecked();

        // A) Kâğıtta Çöz seçildiğinde sayaç seçeneği gizlenir ve sayaç devreye girmez
        await timerCheckbox.check();
        await expect(timerCheckbox).toBeChecked();
        await page.locator('#btn-mode-paper').click();
        await expect(page.locator('#exam-timer-option-group')).toBeHidden();
        await page.locator('#exam-start-practice').click();
        await expect(page.locator('#practice-active-box')).toBeVisible();
        await expect(page.locator('#exam-countdown')).toHaveCount(0);

        // Yeni bir Ekranda Çöz + 40 dk süreli prova başlatmak için kurulum ekranına temiz dön
        await page.evaluate(() => {
            window.FenUpExam?.closePrintPreview?.();
            window.FenUpExam?.clearSavedProgress?.();
            window.FenUpExam?.goToStep?.('practice');
        });
        await expect(page.locator('#practice-setup-box')).toBeVisible();
        await page.locator('#btn-mode-screen').click();
        const timerCbAgain = page.locator('#exam-timer-enabled');
        await expect(timerCbAgain).toBeVisible();
        if (!(await timerCbAgain.isChecked())) {
            await timerCbAgain.check();
        }
        await page.locator('#exam-start-practice').click();

        // B) #exam-countdown DOM'da görünür ve 40:00'dan geri sayar
        const countdown = page.locator('#exam-countdown');
        await expect(countdown).toBeVisible();
        await expect(countdown).toContainText('40:00');

        await page.waitForTimeout(1200);
        const afterTickText = await countdown.textContent();
        expect(afterTickText).toMatch(/39:5[89]/);

        // C) 5 dakikanın altına indiğinde turuncu (.timer-warning), 1 dakikanın altında kırmızı (.timer-danger)
        await page.evaluate(() => window.FenUpExam?.setExamTimerRemaining(240));
        await expect(countdown).toHaveClass(/timer-warning/);
        await expect(countdown).toContainText('04:00');

        await page.evaluate(() => window.FenUpExam?.setExamTimerRemaining(45));
        await expect(countdown).toHaveClass(/timer-danger/);
        await expect(countdown).toContainText('00:45');

        // D) Süre bittiğinde (00:00) bildirim modalı açılır ve seçenekler çalışır
        await page.evaluate(() => window.FenUpExam?.setExamTimerRemaining(0));
        await expect(countdown).toContainText('00:00');
        const timeoutModal = page.locator('#exam-timeout-modal');
        await expect(timeoutModal).toBeVisible();
        await expect(timeoutModal).toContainText('Sınav süresi tamamlandı! Provayı tamamlayıp öz değerlendirmeye geçmek ister misin?');
        await expect(timeoutModal.locator('#btn-exam-timeout-eval')).toBeVisible();
        await expect(timeoutModal.locator('#btn-exam-timeout-continue')).toBeVisible();

        // "Soruları İncelemeye Devam Et" modalı kapatır, prova ekranında kalır
        await timeoutModal.locator('#btn-exam-timeout-continue').click();
        await expect(timeoutModal).toHaveCount(0);
        await expect(page.locator('#practice-active-box')).toBeVisible();
    });

    test('3. Bireysel yarışmada eski Kozmik Rozet toast bildirimi çıkmaz ve Şampiyonlar Ligi haftalık/aylık puanlarında weekId/monthId zorunludur', async ({ page }) => {
        await mockFirebase(page);
        await page.addInitScript(() => {
            localStorage.setItem('fenupx_cookie_consent', 'accepted');
        });
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Eski 10'lu rozet tetikleyicisi çağrılsa bile #fenupx-badge-toast DOM'a basılmaz
        await page.evaluate(() => {
            window.unlockBadge?.('badge_hizli_kafa');
            window.unlockBadge?.('badge_kusursuz');
            window.unlockBadge?.('badge_efsane');
        });
        await expect(page.locator('#fenupx-badge-toast')).toHaveCount(0);

        // Görev 5.4: weekId ve monthId olmadan legacyWeeklyRaw < seasonScore olsa bile Haftalık ve Aylık puan kesin olarak 0'dır
        await page.evaluate(async () => {
            window.__records = {
                s: {
                    role: 'student',
                    name: 'Test',
                    surname: 'Ogrenci',
                    nickname: 'TestKasif',
                    sinif: '7',
                    email: 'test@fenupx.com',
                    avatar: 'fenupx-v2-galileo',
                    weeklyScore_7: 450,
                    monthlyScore_7: 2300,
                    seasonScore_7: 11700,
                    totalScore_7: 11700
                    // lastWeekId_7 ve lastMonthId_7 YOK -> gevşek varsayımla 450 / 2.3K basılmamalı, 0 olmalı!
                }
            };
            await window.__login('s');
            window.openProfileModal?.();
        });

        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();
        await profileModal.locator('#tab-btn-lig').click();

        const statBoxes = profileModal.locator('#pane-study-lig .studies-comp-stats-row .comp-stat-box');
        await expect(statBoxes).toHaveCount(3);
        await expect(statBoxes.nth(0).locator('.stat-sub-val')).toHaveText('0');
        await expect(statBoxes.nth(1).locator('.stat-sub-val')).toHaveText('0');
        await expect(statBoxes.nth(2).locator('.stat-sub-val')).toHaveText('11.7K');
    });

    test('4. Sanal Laboratuvar ölçüm defteri (#lab-notebook-panel) 6.8 Gravzant 5 ölçüm kaydıyla masaüstünde yatay taşma yapmadan görüntülenir', async ({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem('fenupx_cookie_consent', 'accepted');
        });
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        await page.locator('#btn-deney-modulu').click();
        await page.evaluate(() => {
            window.FenUpLab?.openExperimentWorkspace('6.8');
        });

        // 6.8 Gravzant deneyinde 5 farklı aşamayı kaydet
        const stepButtons = [
            '#pill-grav-pass-cold',
            '#pill-grav-heat',
            '#pill-grav-pass-hot',
            '#pill-grav-quench',
            '#pill-grav-pass-quenched'
        ];
        const btnRecord = page.locator('#btn-record-data-6-8');
        for (const sel of stepButtons) {
            const btn = page.locator(sel);
            if (await btn.isVisible().catch(() => false)) {
                await btn.click();
                await btnRecord.click();
            }
        }

        // Veri Defteri sekmesini aç (masaüstünde #lab-panel-tabs, mobilde .lab-mobile-tabs görünürdür)
        const desktopDataTab = page.locator('#lab-panel-tabs .lab-tab-btn[data-tab="data"]');
        const mobileDataTab = page.locator('.lab-mobile-tabs .lab-tab-btn[data-tab="data"]');
        if (await desktopDataTab.isVisible().catch(() => false)) {
            await desktopDataTab.click();
        } else {
            await mobileDataTab.click();
        }

        const notebookPanel = page.locator('#lab-notebook-panel');
        await expect(notebookPanel).toBeVisible();

        const rowsCount = await page.locator('#lab-table-body tr').count();
        expect(rowsCount).toBeGreaterThanOrEqual(4);

        const vw = page.viewportSize()?.width || 1366;
        if (vw >= 1024) {
            const metrics = await page.evaluate(() => {
                const wrap = document.querySelector('#lab-notebook-panel .lab-table-wrap');
                const table = document.getElementById('lab-data-table');
                const sidebar = document.getElementById('lab-sidebar-section');
                return {
                    wrapScrollW: wrap ? wrap.scrollWidth : 0,
                    wrapClientW: wrap ? wrap.clientWidth : 0,
                    tableW: table ? table.getBoundingClientRect().width : 0,
                    sidebarHasClass: sidebar ? sidebar.classList.contains('notebook-active') : false
                };
            });
            expect(metrics.sidebarHasClass).toBe(true);
            expect(metrics.wrapScrollW).toBeLessThanOrEqual(metrics.wrapClientW + 1);
        }
    });

});
