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

    test('5. V8.1: GA4 Etiket Entegrasyonu ve Özel Etkinliklerin (trackFenUpEvent) Güvenli Çağrılması', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
        await page.goto('/');

        // GA4 gtag betiği ve global sarmalayıcı mevcut olmalı
        const gaSnippetExists = await page.evaluate(() => {
            const scripts = Array.from(document.querySelectorAll('script'));
            const hasGtagScript = scripts.some(s => s.src && s.src.includes('googletagmanager.com/gtag/js') && s.src.includes('G-HW3RN9415Z'));
            const hasTrackWrapper = typeof window.trackFenUpEvent === 'function';
            return { hasGtagScript, hasTrackWrapper };
        });
        expect(gaSnippetExists.hasGtagScript).toBe(true);
        expect(gaSnippetExists.hasTrackWrapper).toBe(true);

        // Özel etkinliklerin çağrılmasını dinle
        const trackedEvents = [];
        await page.exposeFunction('mockGtagRecorder', (eventName, params) => {
            trackedEvents.push({ eventName, params });
        });
        await page.evaluate(() => {
            window.gtag = (command, eventName, params) => {
                if (command === 'event' && window.mockGtagRecorder) {
                    window.mockGtagRecorder(eventName, params);
                }
            };
        });

        // 1. senaryo_secildi testi
        await page.locator('#btn-yazili-modulu').click();
        await page.locator('#btn-scope-continue').click();
        await expect(page.locator('#exam-view-choice')).toBeVisible();

        const senaryoEvent = trackedEvents.find(e => e.eventName === 'senaryo_secildi');
        expect(senaryoEvent).toBeTruthy();
        expect(senaryoEvent.params.senaryo).toContain('senaryo');
        expect(senaryoEvent.params.total_questions).toBeGreaterThan(0);

        // 2. kart_goruntulendi testi
        await page.locator('#btn-choice-go-study').click();
        await expect(page.locator('#exam-view-study')).toBeVisible();
        const kartEvent = trackedEvents.find(e => e.eventName === 'kart_goruntulendi');
        expect(kartEvent).toBeTruthy();
        expect(kartEvent.params.card_id).toBeTruthy();
    });

    test('6. V8.1: Kurumsal & Yasal Sekmeli Modal (Hakkımızda / Gizlilik / Çerezler / Koşullar)', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
        await page.goto('/');

        const legalModal = page.locator('#legal-modal');
        await expect(legalModal).toBeHidden();

        // Footer'daki "Gizlilik Politikası" butonuna tıkla
        const btnPrivacy = page.locator('.btn-legal-open[data-legal="privacy"]').first();
        await btnPrivacy.click();

        // Modal açılmalı ve "Gizlilik & KVKK" sekmesi aktif olmalı
        await expect(legalModal).toBeVisible();
        await expect(page.locator('#legal-tab-privacy')).toBeVisible();
        await expect(page.locator('#legal-tab-about')).toBeHidden();

        // "Hakkımızda" sekmesine geçiş
        await page.locator('.legal-tab-btn[data-tab="about"]').click();
        await expect(page.locator('#legal-tab-about')).toBeVisible();
        await expect(page.locator('#legal-tab-about')).toContainText('Bilimde Seviye Atlat: FenUp X');
        await expect(page.locator('#legal-tab-privacy')).toBeHidden();

        // "Çerez Politikası" sekmesine geçiş
        await page.locator('.legal-tab-btn[data-tab="cookies"]').click();
        await expect(page.locator('#legal-tab-cookies')).toBeVisible();
        await expect(page.locator('#legal-tab-cookies')).toContainText('G-HW3RN9415Z');

        // "Kullanım Koşulları" sekmesine geçiş
        await page.locator('.legal-tab-btn[data-tab="terms"]').click();
        await expect(page.locator('#legal-tab-terms')).toBeVisible();

        // Kapatma butonu ile kapatma
        await page.locator('#btn-close-legal-modal').click();
        await expect(legalModal).toBeHidden();

        // Tekrar aç ve ESC tuşuyla kapatmayı test et
        await page.evaluate(() => window.openLegalModal('about'));
        await expect(legalModal).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(legalModal).toBeHidden();
    });
});
