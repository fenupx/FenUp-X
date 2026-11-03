import { test, expect } from '@playwright/test';

test.setTimeout(180000);

const openChoice = async (page) => {
    page.on('dialog', dialog => dialog.accept());
    await page.addInitScript(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
    await page.goto('/');
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
};

test.describe('V8.0 UX ve Akordiyon Entegrasyonu Testleri', () => {

    test('1. Akordiyon Çalışma Planı: Kazanım Grupları ve Tekli Açılma Davranışı', async ({ page }) => {
        await openChoice(page);

        // Konuları Çalış moduna geç
        await page.locator('#btn-choice-go-study').click();
        await expect(page.locator('#exam-view-study')).toBeVisible();

        // Akordiyon grupları mevcut olmalı
        const groups = page.locator('#exam-cardnav .exam-cardnav-group');
        const groupCount = await groups.count();
        expect(groupCount).toBeGreaterThanOrEqual(2);

        // Aktif kartın grubu otomatik açık (expanded) olmalı
        const activeGroup = page.locator('#exam-cardnav .exam-cardnav-group.active');
        await expect(activeGroup).toHaveCount(1);
        await expect(activeGroup.locator('.exam-cardnav-sublist')).toBeVisible();

        // Açık grubun ok göstergesi ▾ olmalı
        await expect(activeGroup.locator('.outcome-arrow')).toContainText('▾');

        // Kapalı olan diğer bir gruba tıklandığında: o açılmalı, önceki kapanmalı (Tekli Akordiyon Mantığı)
        const closedGroupHeader = page.locator('#exam-cardnav .exam-cardnav-group:not(.active) .exam-cardnav-group-header').first();
        await closedGroupHeader.click();

        // Şimdi tıklanan grup active olmalı
        await expect(page.locator('#exam-cardnav .exam-cardnav-group.active')).toHaveCount(1);
    });

    test('2. Değerlendirmede "Boş Bıraktım" ve "Yanlış Yaptım" Seçenekleri & Karne Özeti', async ({ page }) => {
        await openChoice(page);

        // Yazılı provasını başlat
        await page.locator('#btn-choice-go-practice').click();
        await page.locator('#exam-start-practice').click();
        await expect(page.locator('#practice-active-box')).toBeVisible();

        // 7. soruya kadar ilerle ve provayı tamamla
        for (let i = 0; i < 6; i++) {
            await page.locator('#btn-practice-next-q').click();
        }
        await page.locator('#btn-practice-finish').click();
        await expect(page.locator('#exam-view-eval')).toBeVisible();

        // Hızlı durum butonları görünür olmalı
        const btnEmpty = page.locator('.btn-eval-empty');
        const btnIncorrect = page.locator('.btn-eval-incorrect');
        await expect(btnEmpty).toBeVisible();
        await expect(btnIncorrect).toBeVisible();

        // 1. soruda "Boş Bıraktım" seçeneğine tıkla
        await btnEmpty.click();

        // Puan 0 olmalı ve durum empty olarak kaydedilmeli
        const isEvalMarked = await page.evaluate(() => {
            const state = window.FenUpExam.getState();
            const qId = state.attempt.ids[0];
            return state.attempt.questionStatuses?.[qId] === 'empty' && state.attempt.evaluatedQuestions?.[qId] === true;
        });
        expect(isEvalMarked).toBe(true);
    });

    test('3. Lightbox Modal: Görsel Büyütme ve Kapatma Kontrolü', async ({ page }) => {
        await openChoice(page);

        // Konuları Çalış moduna geç
        await page.locator('#btn-choice-go-study').click();
        await expect(page.locator('#exam-view-study')).toBeVisible();

        // Lightbox açma fonksiyonunu test et
        await page.evaluate(() => {
            window.FenUpExam.openLightbox('data/exam/content-v6/assets/diagram-gravity-compare.svg', 'Test Görsel', 'Test Başlık');
        });

        const lightbox = page.locator('#exam-lightbox-modal');
        await expect(lightbox).toBeVisible();
        await expect(lightbox).toHaveClass(/is-open/);

        // Kapatma butonuna tıkla
        await page.locator('#btn-lightbox-close').click();
        await expect(lightbox).toBeHidden();

        // ESC tuşuyla kapatmayı test et
        await page.evaluate(() => {
            window.FenUpExam.openLightbox('data/exam/content-v6/assets/diagram-gravity-compare.svg', 'Test');
        });
        await expect(lightbox).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(lightbox).toBeHidden();
    });

    test('4. Kalıcı Sıfırlama: hasSavedProgress ve clearSavedProgress', async ({ page }) => {
        await openChoice(page);

        // Konu çalışmasına gir ve bir kart ilerle
        await page.locator('#btn-choice-go-study').click();
        await page.evaluate(() => window.FenUpExam.renderStudy(2));

        // İlerleme kontrolü
        const hasSaved = await page.evaluate(() => window.FenUpExam.hasSavedProgress('study'));
        expect(hasSaved).toBe(true);

        // Sıfırla
        await page.evaluate(() => window.FenUpExam.clearSavedProgress('study'));
        const hasSavedAfter = await page.evaluate(() => window.FenUpExam.hasSavedProgress('study'));
        expect(hasSavedAfter).toBe(false);
    });
});
