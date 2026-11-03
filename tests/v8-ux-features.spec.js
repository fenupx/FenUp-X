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

    test('8. V8.3 & V8.6: Yönetim Paneli Sayaçları, Soru Filtresi ve 32 Kategorize Karakter Avatarı', async ({ page }) => {
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

        // 2. 32 Kategorize Karakter Avatarı Entegrasyonunu Doğrula
        const avatarItems = page.locator('#avatar-selector .avatar-item');
        await expect(avatarItems).toHaveCount(32);

        // Profil modalını ve avatar seçiciyi görünür yap
        await page.evaluate(() => {
            const modal = document.getElementById('profile-modal');
            if (modal) {
                modal.classList.remove('is-hidden');
                modal.classList.add('is-open', 'active');
                modal.style.display = 'flex';
            }
            const asc = document.getElementById('avatar-selector-container');
            if (asc) {
                asc.classList.remove('is-hidden');
                asc.style.display = 'block';
            }
        });

        // Kategori sekmelerini kontrol et (V8.8: Robotlar, Hayvan Kâşifler, Öğrenciler, Bilim İnsanları)
        const tabAll = page.locator('.avatar-tab-btn[data-category="all"]');
        const tabRobotlar = page.locator('.avatar-tab-btn[data-category="robotlar"]');
        const tabHayvanlar = page.locator('.avatar-tab-btn[data-category="hayvanlar"]');
        const tabOgrenciler = page.locator('.avatar-tab-btn[data-category="ogrenciler"]');
        const tabBilim = page.locator('.avatar-tab-btn[data-category="bilim"]');
        await expect(tabAll).toBeVisible();
        await expect(tabRobotlar).toBeVisible();
        await expect(tabHayvanlar).toBeVisible();
        await expect(tabOgrenciler).toBeVisible();
        await expect(tabBilim).toBeVisible();

        // Robotlar sekmesine tıklandığında yalnızca 8 robot avatarı görünür olmalı
        await tabRobotlar.click();
        const visibleRobotlar = page.locator('#avatar-selector .avatar-item:visible');
        await expect(visibleRobotlar).toHaveCount(8);

        // Hayvan Kâşifler sekmesine tıklandığında 8 hayvan avatarı görünür olmalı
        await tabHayvanlar.click();
        const visibleHayvanlar = page.locator('#avatar-selector .avatar-item:visible');
        await expect(visibleHayvanlar).toHaveCount(8);

        // Öğrenciler sekmesine tıklandığında yalnızca 8 öğrenci avatarı görünür olmalı
        await tabOgrenciler.click();
        const visibleOgrenciler = page.locator('#avatar-selector .avatar-item:visible');
        await expect(visibleOgrenciler).toHaveCount(8);

        // Bilim İnsanları sekmesine tıklandığında 8 bilim insanı görünür olmalı
        await tabBilim.click();
        const visibleBilim = page.locator('#avatar-selector .avatar-item:visible');
        await expect(visibleBilim).toHaveCount(8);

        // Tümü sekmesine dönüldüğünde 32 avatar görünür olmalı
        await tabAll.click();
        const visibleAll = page.locator('#avatar-selector .avatar-item:visible');
        await expect(visibleAll).toHaveCount(32);

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
        const handwrittenBox = page.locator('.print-ruled-lines .exam-print-handwritten-answer').first();
        await expect(handwrittenBox).toBeVisible();
        await expect(handwrittenBox).toContainText('Örnek Çözüm');
        await expect(handwrittenBox).not.toContainText('Anahtarla kelime eşleşmesi aranmaz');
        await expect(handwrittenBox).not.toContainText('MEB Kabul Edilen');

        // V8.6: El yazısı font ve stil zırhını kontrol et
        const fontStyles = await handwrittenBox.evaluate(el => {
            const cs = window.getComputedStyle(el);
            return {
                fontFamily: cs.fontFamily,
                color: cs.color
            };
        });
        expect(fontStyles.fontFamily.toLowerCase()).toMatch(/caveat|kalam|cursive/);
        expect(fontStyles.color).toBe('rgb(220, 38, 38)');

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

    test('10. V8.9.0: Günlük Seri, 10 Kozmik Rozet Vitrini, Öğrenci Karnesi ve Akıllı Tahta Karalama Tahtası', async ({ page }) => {
        await page.goto('/');

        // 1. Header Günlük Seri Göstergesi
        const headerStreak = page.locator('#header-streak-badge');
        await expect(headerStreak).toBeVisible();
        await expect(page.locator('#header-streak-count')).toContainText(/\d+/);

        // 2. Profil Modalını Aç ve Bileşenleri Doğrula
        await page.evaluate(() => {
            const modal = document.getElementById('profile-modal');
            if (modal) {
                modal.classList.remove('is-hidden');
                modal.classList.add('is-open', 'active');
                modal.style.display = 'flex';
                if (typeof window.evaluateBadges === 'function') window.evaluateBadges();
                if (typeof window.renderBadgesShowcase === 'function') window.renderBadgesShowcase();
                if (typeof window.renderKarneSummary === 'function') window.renderKarneSummary();
            }
        });

        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        // Seviye Halkası ve Avatar
        const levelRing = profileModal.locator('.profile-level-ring');
        await expect(levelRing).toBeVisible();
        await expect(profileModal.locator('#p-current-avatar')).toBeVisible();
        await expect(profileModal.locator('#profile-level-badge')).toBeVisible();

        // 10 Kozmik Başarı Rozeti Vitrini (5x2 Grid)
        const badges = profileModal.locator('#cosmic-badges-grid .cosmic-badge-item');
        await expect(badges).toHaveCount(10);

        // Rozet araç ipuçları ve başlıkları
        const firstBadge = badges.first();
        await expect(firstBadge.locator('.badge-item-title')).toBeVisible();
        await expect(firstBadge.locator('.badge-tooltip')).toBeAttached();

        // 7. Sınıf Eksik Kazanım Karnesi
        const karneSection = profileModal.locator('.profile-karne-section');
        await expect(karneSection).toBeVisible();
        await expect(profileModal.locator('#karne-last-score')).toBeVisible();
        await expect(profileModal.locator('#karne-prog-space')).toBeVisible();

        // Profil modalını kapat
        const closeProfileBtn = profileModal.locator('#close-profile');
        if (await closeProfileBtn.count() > 0) {
            await closeProfileBtn.click();
        } else {
            await page.evaluate(() => {
                const modal = document.getElementById('profile-modal');
                if (modal) {
                    modal.classList.add('is-hidden');
                    modal.classList.remove('is-open', 'active');
                    modal.style.display = 'none';
                }
            });
        }
        await expect(profileModal).toBeHidden();

        // Yazılı provası soru ekranına geç
        await page.locator('#btn-yazili-modulu').click();
        await page.locator('#btn-scope-continue').click();
        await page.locator('#btn-choice-go-practice').click();
        await page.locator('#exam-start-practice').click();
        await expect(page.locator('#practice-active-box')).toBeVisible();

        // 3. Akıllı Tahta (ETAP) Karalama Tahtası Doğrulaması
        const btnToggleScratchpad = page.locator('#btn-toggle-scratchpad');
        await expect(btnToggleScratchpad).toBeVisible();

        const scratchpadContainer = page.locator('#scratchpad-container');
        await expect(scratchpadContainer).toBeAttached();

        // Karalama tahtasını aç (butona tıklayarak)
        await btnToggleScratchpad.click();

        await expect(scratchpadContainer).toBeVisible();
        const canvas = scratchpadContainer.locator('#scratchpad-canvas');
        await expect(canvas).toBeVisible();

        // Renk ve Araç Çubuğu Kontrolleri
        const colorBtns = scratchpadContainer.locator('.scratchpad-color-btn');
        await expect(colorBtns).toHaveCount(4);

        const sizeBtns = scratchpadContainer.locator('.scratchpad-size-btn');
        await expect(sizeBtns).toHaveCount(3);

        const eraserBtn = scratchpadContainer.locator('#scratchpad-btn-eraser');
        await expect(eraserBtn).toBeVisible();
        await eraserBtn.click();
        await expect(eraserBtn).toHaveClass(/active/);

        const clearBtn = scratchpadContainer.locator('#scratchpad-btn-clear');
        await expect(clearBtn).toBeVisible();

        const closeBtn = scratchpadContainer.locator('#scratchpad-btn-close');
        await expect(closeBtn).toBeVisible();
        await closeBtn.click();
        await expect(scratchpadContainer).toBeHidden();

        // 4. Günlük Seri ve Rozet Fonksiyonlarının Doğrulanması
        const streakResult = await page.evaluate(() => {
            const res = window.checkAndUpdateStreak();
            window.unlockBadge('badge_newton');
            return {
                streak: res,
                earned: window.getEarnedBadges(),
                hasNewton: window.getEarnedBadges().includes('badge_newton')
            };
        });

        expect(streakResult.streak.count).toBeGreaterThanOrEqual(1);
        expect(streakResult.hasNewton).toBe(true);
    });

    test('11. V8.9.1: Öğrenci Sınıf Sistemi, 1 Eylül Terfisi, 10 Evrensel Rozet, Yönetici Profili ve Küresel Akıllı Tahta', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
        await page.goto('/');

        // 1. Sınıf Seçimi Alanlarının Doğrulanması (Kayıt Formu ve Profil)
        const regGradeSelect = page.locator('#user-grade');
        await expect(regGradeSelect).toBeAttached();
        const optionsCount = await regGradeSelect.locator('option').count();
        expect(optionsCount).toBeGreaterThanOrEqual(3);

        // 2. 1 Eylül Otomatik Sınıf Terfisi (Auto-Promotion) Doğrulaması
        const promotionResult = await page.evaluate(() => {
            const mock5 = { sinif: "5", lastPromotionYear: 2025 };
            const mock6 = { sinif: "6", lastPromotionYear: 2025 };
            const mock7 = { sinif: "7", lastPromotionYear: 2025 };

            // window.checkAnnualPromotion fonksiyonunu doğrudan çağır
            const p5 = window.checkAnnualPromotion(mock5);
            const p6 = window.checkAnnualPromotion(mock6);
            const p7 = window.checkAnnualPromotion(mock7);

            return { p5, p6, p7 };
        });

        expect(promotionResult.p5).toBe("6");
        expect(promotionResult.p6).toBe("7");
        expect(promotionResult.p7).toBe("8");

        // 3. 10 Evrensel Kozmik Rozet Kataloğu Doğrulaması
        const badgesCheck = await page.evaluate(() => {
            const list = window.KOZMIK_ROZETLER || [];
            const ids = list.map(b => b.id);
            return {
                count: list.length,
                hasBilimUstasi: ids.includes('badge_bilim_ustasi'),
                hasKartKasifi: ids.includes('badge_kart_kasifi'),
                hasHizliKafa: ids.includes('badge_hizli_kafa'),
                hasKusursuz: ids.includes('badge_kusursuz'),
                hasEfsane: ids.includes('badge_efsane')
            };
        });

        expect(badgesCheck.count).toBe(10);
        expect(badgesCheck.hasBilimUstasi).toBe(true);
        expect(badgesCheck.hasKartKasifi).toBe(true);
        expect(badgesCheck.hasHizliKafa).toBe(true);
        expect(badgesCheck.hasKusursuz).toBe(true);
        expect(badgesCheck.hasEfsane).toBe(true);

        // 4. Yönetici (Admin) vs Öğrenci Profil Ayrımı
        await page.evaluate(() => {
            const modal = document.getElementById('profile-modal');
            const adminView = document.getElementById('profile-admin-view');
            const studentSecs = document.getElementById('profile-student-sections');
            if (modal && adminView && studentSecs) {
                // Admin modunu simüle et
                adminView.classList.remove('is-hidden');
                adminView.style.display = 'block';
                studentSecs.style.display = 'none';
                modal.classList.remove('is-hidden');
                modal.classList.add('is-open', 'active');
                modal.style.display = 'flex';
            }
        });

        const adminCard = page.locator('#profile-admin-view');
        await expect(adminCard).toBeVisible();
        await expect(adminCard.locator('#btn-profile-goto-admin')).toBeVisible();
        await expect(page.locator('#profile-student-sections')).toBeHidden();

        // Modalı kapat
        await page.locator('#close-profile').click();

        // 5. Küresel Akıllı Tahta (ETAP) Yüzen Buton ve Modal Kontrolü
        const floatBtn = page.locator('#floating-smartboard-btn');
        await expect(floatBtn).toBeVisible();

        const smartboardModal = page.locator('#smartboard-modal');
        await expect(smartboardModal).toBeAttached();

        // Butona tıkla ve Akıllı Tahtayı Aç
        await floatBtn.click();
        await expect(smartboardModal).toBeVisible();

        const canvas = smartboardModal.locator('#smartboard-canvas');
        await expect(canvas).toBeVisible();

        // Beyaz ve Koyu Tahta Mod Geçişleri
        const btnWhite = smartboardModal.locator('#sb-mode-white');
        const btnDark = smartboardModal.locator('#sb-mode-dark');
        await expect(btnWhite).toBeVisible();
        await expect(btnDark).toBeVisible();

        await btnDark.click();
        await expect(btnDark).toHaveClass(/active/);
        await expect(smartboardModal.locator('.smartboard-canvas-container')).toHaveClass(/mode-dark/);

        await btnWhite.click();
        await expect(btnWhite).toHaveClass(/active/);
        await expect(smartboardModal.locator('.smartboard-canvas-container')).toHaveClass(/mode-white/);

        // Tam Ekran (Fullscreen) Geçişi
        const btnFs = smartboardModal.locator('#sb-btn-fullscreen');
        await expect(btnFs).toBeVisible();
        await btnFs.click();
        await expect(smartboardModal.locator('.smartboard-dialog')).toHaveClass(/is-fullscreen/);
        await btnFs.click();
        await expect(smartboardModal.locator('.smartboard-dialog')).not.toHaveClass(/is-fullscreen/);

        // Kapat Butonu
        const btnCloseSb = smartboardModal.locator('#sb-btn-close');
        await expect(btnCloseSb).toBeVisible();
        await btnCloseSb.click();
        await expect(smartboardModal).toBeHidden();
    });

    test('12. V8.9.2: 8. Sınıf Desteği, Tek Seferlik Sınıf Onboarding Modalı ve Yönetim Paneli Sınıf Düzenleyici', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // 1. Kayıt, Google ve Profil Formlarında 8. Sınıf Seçeneği Kontrolü
        const gradeOptions = await page.evaluate(() => {
            const reg = document.getElementById('user-grade');
            const google = document.getElementById('google-user-grade');
            const prof = document.getElementById('profile-grade');
            return {
                regHas8: reg ? Array.from(reg.options).some(o => o.value === '8') : false,
                googleHas8: google ? Array.from(google.options).some(o => o.value === '8') : false,
                profHas8: prof ? Array.from(prof.options).some(o => o.value === '8') : false,
                validGrades: window.VALID_GRADES || []
            };
        });

        expect(gradeOptions.regHas8).toBe(true);
        expect(gradeOptions.googleHas8).toBe(true);
        expect(gradeOptions.profHas8).toBe(true);
        expect(gradeOptions.validGrades).toContain('8');

        // 2. Tek Seferlik Sınıf Seçim Modalı (#modal-onboarding-grade)
        const obModal = page.locator('#modal-onboarding-grade');
        await expect(obModal).toBeAttached();

        const btn5 = obModal.locator('.btn-onboarding-grade[data-grade="5"]');
        const btn6 = obModal.locator('.btn-onboarding-grade[data-grade="6"]');
        const btn7 = obModal.locator('.btn-onboarding-grade[data-grade="7"]');
        const btn8 = obModal.locator('.btn-onboarding-grade[data-grade="8"]');

        await expect(btn5).toBeAttached();
        await expect(btn6).toBeAttached();
        await expect(btn7).toBeAttached();
        await expect(btn8).toBeAttached();

        // 3. checkMissingGradeOnboarding Tetiklenme Mantığı
        const onboardingResult = await page.evaluate(async () => {
            // Sınıfı olmayan bir öğrenci simülasyonu
            const mockUser = { uid: "test-user-no-grade" };
            const mockData = { name: "Ali", surname: "Kaya", role: "student", sinif: "" };

            window.checkMissingGradeOnboarding(mockUser, mockData);

            const modal = document.getElementById('modal-onboarding-grade');
            const isOpen = modal && !modal.classList.contains('is-hidden') && modal.style.display === 'flex';

            // 8. Sınıf butonuna tıklama simülasyonu
            const btn8El = modal.querySelector('.btn-onboarding-grade[data-grade="8"]');
            if (btn8El) {
                btn8El.click();
            }

            const isClosedAfterClick = modal && modal.classList.contains('is-hidden');
            const savedSinif = mockData.sinif;
            const lsSinif = localStorage.getItem('fenupx_user_sinif');

            return { isOpen, isClosedAfterClick, savedSinif, lsSinif };
        });

        expect(onboardingResult.isOpen).toBe(true);
        expect(onboardingResult.isClosedAfterClick).toBe(true);
        expect(onboardingResult.savedSinif).toBe('8');
        expect(onboardingResult.lsSinif).toBe('8');

        // 4. Yönetim Paneli Sınıf Sütunu ve Tek Tıkla Düzenleme
        const adminGradeColCheck = await page.evaluate(() => {
            // allAdminUsers listesini test verisi ile doldur
            window.allAdminUsers = [
                { id: "stu-1", name: "Ayşe", surname: "Yıldız", nickname: "YıldızGöz", email: "ayse@test.com", role: "student", sinif: "6", totalScore: 120 },
                { id: "stu-2", name: "Can", surname: "Demir", nickname: "DemirKafa", email: "can@test.com", role: "student", sinif: "", totalScore: 80 }
            ];

            if (typeof window.renderAdminUsers === 'function') {
                window.renderAdminUsers();
            }

            const list = document.getElementById('admin-user-list');
            const rows = list ? list.querySelectorAll('.admin-user-row') : [];
            const hasGradeCols = rows.length > 0 && !!rows[0].querySelector('.admin-user-grade-col');
            const firstRowGradeSelect = rows[0]?.querySelector('.admin-grade-select');
            const secondRowGradeBadge = rows[1]?.querySelector('.admin-grade-badge');

            return {
                rowCount: rows.length,
                hasGradeCols,
                firstRowGradeVal: firstRowGradeSelect ? firstRowGradeSelect.value : null,
                secondRowText: secondRowGradeBadge ? secondRowGradeBadge.textContent : ""
            };
        });

        expect(adminGradeColCheck.rowCount).toBe(2);
        expect(adminGradeColCheck.hasGradeCols).toBe(true);
        expect(adminGradeColCheck.firstRowGradeVal).toBe('6');
        expect(adminGradeColCheck.secondRowText).toContain('Belirtilmemiş');
    });
});
