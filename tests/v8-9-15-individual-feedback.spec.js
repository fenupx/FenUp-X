// @ts-check
import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';

/**
 * FENUP X — V8.9.15 Bireysel Yarışma Geri Bildirim Akışı Test Paketi
 * Task ID: TASK-20261105-INDIVIDUAL-FEEDBACK-HOTFIX
 */

async function setupStudentCompetition(page, options = {}) {
    await page.addInitScript(() => {
        window.__audioLog = [];
        const origPlay = window.Audio.prototype.play;
        window.Audio.prototype.play = function() {
            const src = (this.src || '').split('/').pop();
            window.__audioLog.push({ action: 'play', src });
            return Promise.resolve();
        };
        const origPause = window.Audio.prototype.pause;
        window.Audio.prototype.pause = function() {
            const src = (this.src || '').split('/').pop();
            window.__audioLog.push({ action: 'pause', src });
            return origPause.call(this);
        };
    });

    await mockFirebase(page);

    const studentRecord = {
        role: 'student',
        name: 'Ramazan',
        surname: 'Karayel',
        nickname: 'KozmikKâşif',
        sinif: '7',
        email: 'ramazan@fenupx.com',
        avatar: 'fenupx-v2-galileo',
        totalScore_7: 1200,
        seasonScore_7: 1200,
        totalScore: 1200,
        seasonScore: 1200,
        ...(options.userData || {})
    };

    await page.evaluate(async (rec) => {
        window.__records = { s: rec };
        await window.__login('s');
    }, studentRecord);
}

async function startCompetitionViaUI(page) {
    await page.evaluate(async () => {
        if (typeof window.__setCompetitionMode === 'function') {
            window.__setCompetitionMode('7', '1', 'bireysel');
        } else {
            window.selectedGrade = '7';
            window.selectedUnit = '1';
            window.activeMode = 'bireysel';
        }
        window.currentActivePlayerName = 'KozmikKâşif';
        document.querySelectorAll('.scene').forEach(s => {
            if (s.id !== 'scene-quiz') s.classList.add('is-hidden');
        });
        const startFn = window.__startIndividual || window.startIndividual;
        if (typeof startFn === 'function') {
            await startFn();
        }
    });
    await page.locator('#scene-quiz').waitFor({ state: 'visible' });
}

test.describe('FenUp X — V8.9.15 Bireysel Yarışma Geri Bildirim ve Gerilim Akışı', () => {

    test('1. Doğru cevapta gerilim sesi, is-pending kilit, ardından yeşil renk ve geçiş gecikmesi doğrulanır', async ({ page }) => {
        await setupStudentCompetition(page);
        await startCompetitionViaUI(page);

        // Soru 1 görünüyor
        const questionText = page.locator('#quiz-question');
        await expect(questionText).toBeVisible();

        const optA = page.locator('.answer-btn[data-option-id="opt_a"]');
        await expect(optA).toBeVisible();

        // Şıkkı tıkla
        await optA.click();

        // Hemen kilitlenmeli ve pending almalı
        await expect(optA).toHaveClass(/is-pending/);

        // Gerilim sesi (heyecan.mp3) başlamalı
        const audioAtStart = await page.evaluate(() => window.__audioLog);
        const hasDrum = audioAtStart.some(a => a.action === 'play' && a.src.includes('heyecan.mp3'));
        expect(hasDrum).toBe(true);

        // 3.5s gerilim boyunca soru değişmemeli
        await page.waitForTimeout(1000);
        await expect(optA).toHaveClass(/is-pending/);
        await expect(page.locator('#quiz-progress')).toContainText('Soru 1/10');

        // 3.5s tamamlanıp değerlendirme açılınca: optA yeşil (is-correct) olmalı
        await page.waitForTimeout(3000); // toplam ~4s geçti
        await expect(optA).toHaveClass(/is-correct/);
        await expect(optA).not.toHaveClass(/is-pending/);

        // Doğru sesi (dogru.mp3) çalmış olmalı
        const audioAfterAnswer = await page.evaluate(() => window.__audioLog);
        const hasCorrect = audioAfterAnswer.some(a => a.action === 'play' && a.src.includes('dogru.mp3'));
        expect(hasCorrect).toBe(true);

        // 2.5s geri bildirim süresi boyunca Soru 1 görünmeye devam etmeli (hemen geçilmemeli)
        await page.waitForTimeout(1000);
        await expect(page.locator('#quiz-progress')).toContainText('Soru 1/10');

        // 2.5s bitince Soru 2 gelmeli
        await page.waitForTimeout(2000);
        await expect(page.locator('#quiz-progress')).toContainText('Soru 2/10');
    });

    test('2. Yanlış cevapta is-wrong ve doğru şıkkın yeşil açılması, wrong sesi ve 3s sonra sonuç ekranı doğrulanır', async ({ page }) => {
        await setupStudentCompetition(page);
        await startCompetitionViaUI(page);

        const optB = page.locator('.answer-btn[data-option-id="opt_b"]');
        const optA = page.locator('.answer-btn[data-option-id="opt_a"]');
        await expect(optB).toBeVisible();

        // Yanlış şıkkı (opt_b) tıkla
        await optB.click();
        await expect(optB).toHaveClass(/is-pending/);

        // Gerilim süresi sonrasını bekle (~4.0s)
        await page.waitForTimeout(4000);

        // optB is-wrong olmalı, doğru olan optA ise is-correct ile yeşil açılmalı
        await expect(optB).toHaveClass(/is-wrong/);
        await expect(optA).toHaveClass(/is-correct/);

        // Yanlış sesi (yanlis.mp3) çalmış olmalı
        const audioLog = await page.evaluate(() => window.__audioLog);
        const hasWrong = audioLog.some(a => a.action === 'play' && a.src.includes('yanlis.mp3'));
        expect(hasWrong).toBe(true);

        // 3s geri bildirim bitmeden sonuç ekranına geçilmemeli
        await page.waitForTimeout(1000);
        await expect(page.locator('#quiz-end')).toHaveClass(/is-hidden/);

        // 3s dolunca sonuç ekranı açılmalı
        await page.waitForTimeout(2500);
        await expect(page.locator('#quiz-end')).not.toHaveClass(/is-hidden/);
        await expect(page.locator('#quiz-end-title')).toContainText('YANLIŞ CEVAP, ELENDİN!');

        // Sonuç ekranına geçildiğinde yanlis.mp3 ikinci kez çalınmamalı
        const wrongPlays = (await page.evaluate(() => window.__audioLog)).filter(a => a.action === 'play' && a.src.includes('yanlis.mp3'));
        expect(wrongPlays.length).toBe(1);
    });

    test('3. Süre dolması (timeout) durumunda doğru cevap yeşil gösterilir ve 3s sonra sonuç ekranına geçilir', async ({ page }) => {
        await setupStudentCompetition(page);
        await startCompetitionViaUI(page);

        const optA = page.locator('.answer-btn[data-option-id="opt_a"]');
        await expect(optA).toBeVisible();

        // Zaman aşımını tetikle (handleRankedAnswer(null))
        await page.evaluate(async () => {
            const handleFn = window.__handleRankedAnswer || window.handleRankedAnswer;
            if (typeof handleFn === 'function') {
                handleFn(null);
            }
        });

        // Yanlış sesi (yanlis.mp3) hemen çalmış olmalı
        const audioLogInitial = await page.evaluate(() => window.__audioLog);
        const hasWrongInitial = audioLogInitial.some(a => a.action === 'play' && a.src.includes('yanlis.mp3'));
        expect(hasWrongInitial).toBe(true);

        // Doğru şık (opt_a) yeşil (is-correct) açılmalı
        await expect(optA).toHaveClass(/is-correct/);

        // 3s geri bildirim bitmeden sonuç ekranına geçilmemeli
        await page.waitForTimeout(1500);
        await expect(page.locator('#quiz-end')).toHaveClass(/is-hidden/);

        // 3s dolunca sonuç ekranı açılmalı (toplam 3.5s bekleme)
        await page.waitForTimeout(2000);
        await expect(page.locator('#quiz-end')).not.toHaveClass(/is-hidden/);
        await expect(page.locator('#quiz-end-title')).toContainText('SÜRE BİTTİ, ELENDİN!');

        // Sonuç ekranına geçildiğinde yanlis.mp3 ikinci kez çalınmamalı
        const wrongPlays = (await page.evaluate(() => window.__audioLog)).filter(a => a.action === 'play' && a.src.includes('yanlis.mp3'));
        expect(wrongPlays.length).toBe(1);
    });

    test('4. Gerilim ve sonuç sesleri doğru sırada ve tek kez çağrılır', async ({ page }) => {
        await setupStudentCompetition(page);
        await startCompetitionViaUI(page);

        const optA = page.locator('.answer-btn[data-option-id="opt_a"]');
        await optA.click();

        // Gerilim başladı
        await page.waitForTimeout(4000);

        const audioLog = await page.evaluate(() => window.__audioLog);
        const drumIdx = audioLog.findIndex(a => a.action === 'play' && a.src.includes('heyecan.mp3'));
        const correctIdx = audioLog.findIndex(a => a.action === 'play' && a.src.includes('dogru.mp3'));

        expect(drumIdx).toBeGreaterThanOrEqual(0);
        expect(correctIdx).toBeGreaterThan(drumIdx);

        // drum 1 kez, correct 1 kez çalmalı
        const drumPlays = audioLog.filter(a => a.action === 'play' && a.src.includes('heyecan.mp3'));
        const correctPlays = audioLog.filter(a => a.action === 'play' && a.src.includes('dogru.mp3'));
        expect(drumPlays.length).toBe(1);
        expect(correctPlays.length).toBe(1);
    });

    test('5. Çift tıklama tek bir sunucu eylemi üretir; kilitliyken ikinci tıklama engellenir', async ({ page }) => {
        await setupStudentCompetition(page);
        await startCompetitionViaUI(page);

        const optA = page.locator('.answer-btn[data-option-id="opt_a"]');
        const optB = page.locator('.answer-btn[data-option-id="opt_b"]');

        // Hızlıca A ve B'ye tıkla
        await Promise.all([
            optA.click({ force: true }),
            optB.click({ force: true })
        ]);

        const calls = await page.evaluate(() => window.__calls || []);
        const answerCalls = calls.filter(c => c.name === 'competitionAction' && c.data?.action === 'answer');
        expect(answerCalls.length).toBe(1);
    });

    test('6. Rutin teknik mesajlar soru alanını kirletmez (Yarışma puanı sunucuda doğrulanacak vb. yoktur)', async ({ page }) => {
        await setupStudentCompetition(page);
        await startCompetitionViaUI(page);

        const statusNode = page.locator('#competition-save-status');
        if (await statusNode.count() > 0) {
            const text = await statusNode.textContent();
            expect(text || '').not.toContain('Yarışma puanı sunucuda doğrulanacak');
            expect(text || '').not.toContain('Cevabın doğrulanıyor');
            expect(text || '').not.toContain('Cevabın doğrulandı');
        }
    });

    test('7. Çıkış butonuna basıldığında sesler ve bekleyen zamanlayıcılar temizlenir', async ({ page }) => {
        await setupStudentCompetition(page);
        await startCompetitionViaUI(page);

        const optA = page.locator('.answer-btn[data-option-id="opt_a"]');
        await optA.click();
        await expect(optA).toHaveClass(/is-pending/);

        // Gerilim anında ana sayfaya dön
        await page.evaluate(() => {
            const btn = document.getElementById('btn-header-home');
            if (btn) btn.click();
            else if (typeof window.returnToHome === 'function') window.returnToHome();
        });

        // Bekleyen zamanlayıcılar iptal edilmiş olmalı
        const pendingCount = await page.evaluate(() => (window.__quizState?._pendingTimers || []).length);
        expect(pendingCount).toBe(0);

        // Drum sesi durdurulmuş olmalı
        const audioLog = await page.evaluate(() => window.__audioLog);
        const hasDrumPause = audioLog.some(a => a.action === 'pause' && a.src.includes('heyecan.mp3'));
        expect(hasDrumPause).toBe(true);
    });

    test('8. Misafir modunda eski Kozmik Rozet / Işık Hızı bildirimi çıkmaz', async ({ page }) => {
        await page.addInitScript(() => {
            localStorage.setItem('fenupx_cookie_consent', 'accepted');
        });
        await mockFirebase(page, false);

        await page.evaluate(async () => {
            window.selectedGrade = '7';
            window.selectedUnit = '1';
            window.activeMode = 'bireysel';
            window.currentActivePlayerName = 'Misafir';
            window.unlockBadge('badge_hizli_kafa');
        });

        const badgeToast = page.locator('#fenupx-badge-toast');
        if (await badgeToast.count() > 0) {
            await expect(badgeToast).not.toHaveClass(/show/);
        }
    });

});
