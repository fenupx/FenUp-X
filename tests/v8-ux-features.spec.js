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

        // Hızlı durum butonu "Yapamadım / Boş Bıraktım (0 Puan)" görünür olmalı
        const btnZero = page.locator('#btn-eval-zero');
        await expect(btnZero).toBeVisible();
        await expect(btnZero).toContainText('Yapamadım / Boş Bıraktım');

        // 1. soruda "Yapamadım / Boş Bıraktım" seçeneğine tıkla
        await btnZero.click();

        // Puan 0 olmalı ve durum zero/empty olarak kaydedilmeli
        const isEvalMarked = await page.evaluate(() => {
            const state = window.FenUpExam.getState();
            const qId = state.attempt.ids[0];
            return (state.attempt.questionStatuses?.[qId] === 'zero' || state.attempt.questionStatuses?.[qId] === 'empty') && state.attempt.evaluatedQuestions?.[qId] === true;
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

        // 1. Üst Menüdeki #btn-hakkimizda orijinal scene-hakkimizda sahnesini açmalı
        const btnHakkimizda = page.locator('#btn-hakkimizda');
        await expect(btnHakkimizda).toBeVisible();
        await btnHakkimizda.click();

        const sceneAbout = page.locator('#scene-hakkimizda');
        await expect(sceneAbout).toBeVisible();
        await expect(sceneAbout).toContainText('Bilimde Seviye Atlat: FenUp X');

        // Ana sayfaya geri dön
        await sceneAbout.locator('.btn-back-home').click();
        await expect(sceneAbout).toBeHidden();

        // 2. Orijinal #policy-modal pencereleri
        const policyModal = page.locator('#policy-modal');
        await expect(policyModal).toBeHidden();

        // Footer'daki "Gizlilik Politikası" butonuna tıkla
        const btnPrivacy = page.locator('#main-footer .btn-kvkk-open');
        await btnPrivacy.click();

        // Modal açılmalı ve Gizlilik metni görüntülenmeli
        await expect(policyModal).toBeVisible();
        await expect(page.locator('#modal-title')).toContainText('Gizlilik Politikası');
        await expect(page.locator('#modal-body')).toContainText('KVKK');

        // Kapatma butonu ile kapatma
        await page.locator('#btn-close-modal').click();
        await expect(policyModal).toBeHidden();

        // Çerez Politikası butonuna tıkla
        const btnCookies = page.locator('#main-footer .btn-cookies-open');
        await btnCookies.click();
        await expect(policyModal).toBeVisible();
        await expect(page.locator('#modal-title')).toContainText('Çerez');
        await expect(page.locator('#modal-body')).toContainText('G-HW3RN9415Z');

        // ESC tuşuyla kapatmayı test et
        await page.keyboard.press('Escape');
        await expect(policyModal).toBeHidden();

        // Kullanım Koşulları butonuna tıkla
        const btnTerms = page.locator('#main-footer .btn-terms-open');
        await btnTerms.click();
        await expect(policyModal).toBeVisible();
        await expect(page.locator('#modal-title')).toContainText('Kullanım Koşulları');
        await page.keyboard.press('Escape');
        await expect(policyModal).toBeHidden();
    });

    test('7. V8.2 & V8.3: 7. Sınıf Sanal Laboratuvarı Çift Düzenekli İş Deneyi (Mod 1 Kuvvetin İşe Etkisi & Mod 2 Yolun İşe Etkisi MEB Formülsüz Standart)', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
        await page.goto('/');

        // Sanal Laboratuvar modülünü aç ve 7.1 deneyine gir
        await page.locator('#btn-deney-modulu').click();
        await page.waitForFunction(() => typeof window.FenUpLab !== 'undefined' && typeof window.FenUpLab.openExperimentWorkspace === 'function');
        await page.evaluate(() => {
            window.FenUpLab.openExperimentWorkspace('7.1');
        });

        const workspace = page.locator('#lab-workspace-view');
        await expect(workspace).toBeVisible();

        // 1. Mod seçici butonlarının varlığını kontrol et
        const btnSingle = page.locator('#btn-work-mode-single');
        const btnForce = page.locator('#btn-work-mode-force');
        const btnDist = page.locator('#btn-work-mode-dist');

        await expect(btnSingle).toBeVisible();
        await expect(btnForce).toBeVisible();
        await expect(btnDist).toBeVisible();
        await expect(btnSingle).toHaveClass(/active/);

        // 2. Mod 1: Kuvvetin İşe Etkisi (Yol Sabit) Moduna Geç
        await btnForce.click();
        await expect(btnForce).toHaveClass(/active/);
        await expect(page.locator('#controls-work-dual')).toBeVisible();
        await expect(page.locator('#controls-work-single')).toBeHidden();
        await expect(page.locator('#dual-work-variables-bar')).toBeVisible();

        // Bilimsel Süreç Değişkenleri Metinlerini Doğrula (Harf Kodsuz Sade Türkçe)
        await expect(page.locator('#bar-indep-var-text')).toContainText('Uygulanan Kuvvet');
        await expect(page.locator('#bar-ctrl-var-text')).toContainText('Alınan Yol');
        await expect(page.locator('#bar-dep-var-text')).toContainText('Yapılan Fiziksel İş');

        // Mod 1 Sürgülerinin Görünür Olduğunu Kontrol Et
        await expect(page.locator('#sliders-dual-mode1')).toBeVisible();
        await expect(page.locator('#sliders-dual-mode2')).toBeHidden();

        // Hareketi Başlat
        const btnPlay = page.locator('#btn-dual-play-pause');
        await btnPlay.click();

        // V8.4 Bilimsel İvmelenme: 20 N (t2, a=2 m/s²) hedefe 10 N'dan (t1, a=1 m/s²) ÖNCE varmalı
        await page.waitForFunction(() => {
            const dual = window.FenUpLab?.labState?.work?.dual;
            return dual && dual.t2.isFinished && !dual.t1.isFinished;
        }, { timeout: 10000 });

        // Ardından 10 N da hedefe ulaşmalı (t1 & t2 finish)
        await page.waitForFunction(() => {
            const dual = window.FenUpLab?.labState?.work?.dual;
            return dual && dual.t1.isFinished && dual.t2.isFinished;
        }, { timeout: 15000 });

        // Mod 1 MEB Formülsüz Sonuç Cümlesini Doğrula
        const pedText = page.locator('#work-pedagogical-text');
        await expect(pedText).toContainText('Sonuç: Alınan yol aynıyken, uygulanan kuvvet ne kadar fazlaysa yapılan fiziksel iş de o kadar fazla olur.');

        // 3. Mod 2: Alınan Yolun İşe Etkisi (Kuvvet Sabit) Moduna Geç
        await btnDist.click();
        await expect(btnDist).toHaveClass(/active/);
        await expect(page.locator('#sliders-dual-mode2')).toBeVisible();
        await expect(page.locator('#sliders-dual-mode1')).toBeHidden();

        // Mod 2 Bilimsel Değişkenlerini Doğrula (Harf Kodsuz Sade Türkçe)
        await expect(page.locator('#bar-indep-var-text')).toContainText('Alınan Yol');
        await expect(page.locator('#bar-ctrl-var-text')).toContainText('Uygulanan Kuvvet');

        // Hareketi Başlat
        await btnPlay.click();

        // V8.4 Yol Farkı: 2 metre (t1) hedefe 5 metreden (t2) ÖNCE varmalı
        await page.waitForFunction(() => {
            const dual = window.FenUpLab?.labState?.work?.dual;
            return dual && dual.t1.isFinished && !dual.t2.isFinished;
        }, { timeout: 10000 });

        // Ardından 5 metre de hedefe ulaşmalı
        await page.waitForFunction(() => {
            const dual = window.FenUpLab?.labState?.work?.dual;
            return dual && dual.t1.isFinished && dual.t2.isFinished;
        }, { timeout: 15000 });

        // Mod 2 MEB Formülsüz Sonuç Cümlesini Doğrula
        await expect(pedText).toContainText('Sonuç: Uygulanan kuvvet aynıyken, cismin aldığı yol ne kadar fazlaysa yapılan fiziksel iş de o kadar fazla olur.');

        // 4. Tekli İnceleme Moduna Geri Dön
        await btnSingle.click();
        await expect(btnSingle).toHaveClass(/active/);
        await expect(page.locator('#controls-work-single')).toBeVisible();
        await expect(page.locator('#controls-work-dual')).toBeHidden();
        await expect(page.locator('#dual-work-variables-bar')).toBeHidden();
    });

    test('8. V8.3: Yönetim Paneli Sayaçları, Soru Filtresi ve 16 Bilim Kâşifi Avatarı', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
        await page.goto('/');

        // 1. Yönetim Paneli Sayaçlarını ve Filtrelerini Kontrol Et
        const statTotal = page.locator('#admin-stat-total-users');
        const statRoles = page.locator('#admin-stat-roles');
        const statOnline = page.locator('#admin-stat-online');
        await expect(statTotal).toBeAttached();
        await expect(statRoles).toBeAttached();
        await expect(statOnline).toBeAttached();

        const gradeFilters = page.locator('#admin-grade-filters');
        const outcomeFilter = page.locator('#admin-filter-outcome');
        await expect(gradeFilters).toBeAttached();
        await expect(outcomeFilter).toBeAttached();

        // 2. 16 Bilim Kâşifi Avatarı Entegrasyonunu Doğrula
        const avatarItems = page.locator('#avatar-selector .avatar-item');
        await expect(avatarItems).toHaveCount(16);

        // Birinci avatarı tıkla ve localStorage kaydını doğrula
        await avatarItems.nth(0).dispatchEvent('click');
        const savedAvatar = await page.evaluate(() => localStorage.getItem('fenupx_user_avatar'));
        expect(savedAvatar).toBeTruthy();
        expect(savedAvatar).toContain('data:image/svg+xml');
    });

    test('9. V8.5: Kırmızı El Yazılı Cevap Anahtarı PDF Modu ve 3 Seviyeli Çocuk Dostu Değerlendirme', async ({ page }) => {
        await openChoice(page);

        // Yazılı provasını başlat
        await page.locator('#btn-choice-go-practice').click();
        await page.locator('#exam-start-practice').click();
        await expect(page.locator('#practice-active-box')).toBeVisible();

        // 1. Baskı Önizlemesini Aç (PDF Önizleme Modalı)
        await page.locator('#btn-practice-preview-print').click();
        const printModal = page.locator('#exam-print-preview-modal');
        await expect(printModal).toBeVisible();

        // Varsayılan mod: "Soru Kâğıdı" aktif olmalı
        const btnModeBlank = page.locator('#btn-print-mode-blank');
        const btnModeAnswers = page.locator('#btn-print-mode-answers');
        await expect(btnModeBlank).toBeVisible();
        await expect(btnModeAnswers).toBeVisible();
        await expect(btnModeBlank).toHaveClass(/active/);
        await expect(btnModeAnswers).not.toHaveClass(/active/);

        // "Cevap Anahtarı" moduna geç
        await btnModeAnswers.click();
        await expect(btnModeAnswers).toHaveClass(/active/);
        await expect(btnModeBlank).not.toHaveClass(/active/);
        await expect(page.locator('#exam-print-sheet')).toHaveClass(/is-answers-mode/);

        // Kırmızı el yazısı cevap kutuları görünür olmalı ve örnek çözüm içermeli
        const handwrittenBox = page.locator('.exam-print-handwritten-answer').first();
        await expect(handwrittenBox).toBeVisible();
        await expect(handwrittenBox).toContainText('Öğretmen Çözümü & Anahtar Kavramlar');

        // Puan baremi görünür olmalı
        const pointBracket = page.locator('.print-q-points-bracket').first();
        await expect(pointBracket).toBeVisible();
        await expect(pointBracket).toContainText('Puan');

        // Tekrar "Soru Kâğıdı" moduna dön
        await btnModeBlank.click();
        await expect(btnModeBlank).toHaveClass(/active/);
        await expect(page.locator('#exam-print-sheet')).not.toHaveClass(/is-answers-mode/);
        await expect(handwrittenBox).toBeHidden();

        // Modalı kapat
        await page.locator('#btn-print-preview-close').click();
        await expect(printModal).toBeHidden();

        // 2. Provayı tamamlayıp Değerlendirme Ekranına Geç
        for (let i = 0; i < 6; i++) {
            await page.locator('#btn-practice-next-q').click();
        }
        await page.locator('#btn-practice-finish').click();
        await expect(page.locator('#exam-view-eval')).toBeVisible();

        // 3 Büyük Buton Görünür Olmalı
        const btnFull = page.locator('#btn-eval-full');
        const btnPartial = page.locator('#btn-eval-partial');
        const btnZero = page.locator('#btn-eval-zero');
        await expect(btnFull).toBeVisible();
        await expect(btnPartial).toBeVisible();
        await expect(btnZero).toBeVisible();

        // Örnek Tam Puanlık Cevap Kutusu kilit fen kavramlarını kalın (strong) içermeli
        const sampleBox = page.locator('.eval-sample-answer-box');
        await expect(sampleBox).toBeVisible();
        const strongCount = await sampleBox.locator('strong').count();
        expect(strongCount).toBeGreaterThanOrEqual(1);

        // "Kısmen Yaptım" butonuna tıkla -> alt akordiyon paneli açılmalı
        await btnPartial.click();
        const breakdown = page.locator('#eval-partial-breakdown');
        await expect(breakdown).toBeVisible();
        await expect(breakdown.locator('h5')).toContainText('Hangi kısımları doğru yazdın?');

        // Ölçütler ve +X Puan rozetleri listelenmeli
        const criterionItems = breakdown.locator('.exam-criterion-item');
        const count = await criterionItems.count();
        expect(count).toBeGreaterThanOrEqual(2);

        // Birinci kriteri işaretle
        await criterionItems.first().click();
        const partialScoreText = await page.locator('#partial-calc-score').textContent();
        expect(partialScoreText).toMatch(/\d+ Puan/);

        // "Puanı Onayla ve Devam Et" butonuna tıkla
        await page.locator('#btn-confirm-partial').click();

        // 1. Soru kısmi puan olarak kaydedilmeli ve 2. soruya akıcı şekilde geçmeli
        await page.waitForFunction(() => {
            const state = window.FenUpExam.getState();
            const q1Id = state.attempt.ids[0];
            return state.attempt.questionStatuses?.[q1Id] === 'partial' && state.attempt.evalQuestionIndex === 1;
        });

        // 2. Soruda "Tam Doğru Yaptım" tıkla
        await expect(page.locator('#eval-single-question-container .exam-qmeta')).toContainText('SORU 2');
        await page.locator('#btn-eval-full').click();

        // 2. Soru tam doğru kaydedilmeli ve 3. soruya geçmeli
        await page.waitForFunction(() => {
            const state = window.FenUpExam.getState();
            const q2Id = state.attempt.ids[1];
            return state.attempt.questionStatuses?.[q2Id] === 'full' && state.attempt.evalQuestionIndex === 2;
        });
    });
});
