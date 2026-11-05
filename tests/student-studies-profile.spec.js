// @ts-check
import { test, expect } from '@playwright/test';
import { mockFirebase } from './helpers/firebase-mock.js';

/**
 * FENUP X — Bütünleşik "Çalışmalarım" Profili ve Öğrenci Gelişim Takibi Test Paketi
 * V8.9.9
 */

async function mockStudentEnvironment(page, options = {}) {
    await mockFirebase(page);

    await page.addInitScript((opts) => {
        if (opts.examAttempts) {
            window.localStorage.setItem('fenupx_exam_attempts_history', JSON.stringify(opts.examAttempts));
        } else if (opts.examAttempts === null) {
            window.localStorage.removeItem('fenupx_exam_attempts_history');
            window.localStorage.removeItem('fenupx_last_exam_summary');
        }

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

        if (opts.badges) {
            window.localStorage.setItem('fenupx_badges', JSON.stringify(opts.badges));
        }
    }, options);

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const studentRecord = {
        role: 'student',
        name: 'Ali',
        surname: 'Kaya',
        nickname: 'KozmikAli',
        sinif: '7',
        email: 'ogrenci@fenupx.com',
        avatar: 'fenupx-v2-galileo',
        totalScore_7: 350,
        seasonScore_7: 150,
        totalScore: 350,
        seasonScore: 150,
        ...(options.userData || {})
    };

    const adminRecord = {
        role: 'admin',
        name: 'Yönetici',
        surname: 'Hoca',
        nickname: 'KozmikAdmin',
        email: 'admin@fenupx.com',
        avatar: 'fenupx-v2-einstein',
        ...(options.userData || {})
    };

    const isStudent = options.userData?.role !== 'admin';

    await page.evaluate(async ({ isStudent, studentRecord, adminRecord }) => {
        window.__records = {
            s: studentRecord,
            a: adminRecord
        };
        await window.__login(isStudent ? 's' : 'a');
    }, { isStudent, studentRecord, adminRecord });
}

async function openProfileModal(page) {
    await page.evaluate(() => {
        const btn = document.getElementById('btn-open-profile');
        if (btn) btn.click();
    });
}

test.describe('FenUp X — Bütünleşik “Çalışmalarım” Profili ve Öğrenci Gelişim Takibi', () => {

    test('1. Bilgi Düzeni Sıralaması: A) Hero -> B) Çalışmalarım Özeti -> C) Üç Modül Detayları -> D) Rozetler -> E) Hesap Ayarları', async ({ page }) => {
        await mockStudentEnvironment(page);

        // Profil modalını aç
        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        // A) Temel Profil ve Avatar Hero Kartı
        const heroCard = profileModal.locator('.profile-hero-card');
        await expect(heroCard).toBeVisible();
        await expect(heroCard.locator('#profile-display-fullname')).toHaveText('Ali Kaya');
        await expect(heroCard.locator('#profile-display-role-tag')).toContainText('7. Sınıf');

        // B) “Çalışmalarım” Özeti
        const studiesSummary = profileModal.locator('#profile-studies-summary');
        await expect(studiesSummary).toBeVisible();
        await expect(studiesSummary.locator('.studies-summary-title')).toContainText('Çalışmalarım');
        await expect(studiesSummary.locator('#studies-summary-counter-text')).toBeVisible();

        // Modül puanları birleştirilerek sahte "genel başarı puanı" üretilmemelidir
        const summaryText = await studiesSummary.textContent();
        expect(summaryText).not.toContain('Genel Başarı');
        expect(summaryText).not.toContain('Ortalama Puan');

        // C) Üç Modüle Ait Ayrıntılar (Sekmeler)
        const studiesDetails = profileModal.locator('#profile-studies-details');
        await expect(studiesDetails).toBeVisible();
        await expect(profileModal.locator('#tab-btn-yazili')).toBeVisible();
        await expect(profileModal.locator('#tab-btn-lig')).toBeVisible();
        await expect(profileModal.locator('#tab-btn-lab')).toBeVisible();

        // D) Rozetler
        const badgesSection = profileModal.locator('.profile-badges-section');
        await expect(badgesSection).toBeVisible();
        await expect(badgesSection.locator('#profile-badge-counter')).toBeVisible();

        // E) Hesap Ayarları
        const settingsDetails = profileModal.locator('.profile-settings-details');
        await expect(settingsDetails).toBeVisible();

        // DOM sırasını doğrula: hero -> summary -> details -> badges -> settings
        const orderCheck = await page.evaluate(() => {
            const modalContent = document.querySelector('#profile-modal .modal-content');
            if (!modalContent) return false;
            const hero = modalContent.querySelector('.profile-hero-card');
            const summary = modalContent.querySelector('#profile-studies-summary');
            const details = modalContent.querySelector('#profile-studies-details');
            const badges = modalContent.querySelector('.profile-badges-section');
            const settings = modalContent.querySelector('.profile-settings-details');
            
            const posHero = hero ? hero.compareDocumentPosition(summary) : 0;
            const posSummary = summary ? summary.compareDocumentPosition(details) : 0;
            const posDetails = details ? details.compareDocumentPosition(badges) : 0;
            const posBadges = badges ? badges.compareDocumentPosition(settings) : 0;

            // Node.DOCUMENT_POSITION_FOLLOWING is 4
            return (posHero & 4) && (posSummary & 4) && (posDetails & 4) && (posBadges & 4);
        });
        expect(orderCheck).toBeTruthy();
    });

    test('2. Yönetici Profilinin Ayrılması: Çalışmalarım ve Öğrenci Alanları Gösterilmez', async ({ page }) => {
        await mockStudentEnvironment(page, {
            userData: {
                uid: 'admin_test_uid',
                role: 'admin',
                name: 'Yönetici',
                surname: 'Hoca',
                email: 'admin@fenupx.com'
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        // Admin görünümü aktiftir
        const adminView = profileModal.locator('#profile-admin-view');
        await expect(adminView).toBeVisible();
        await expect(adminView.locator('#btn-profile-goto-admin')).toBeVisible();

        // Öğrenci bölümleri ve çalışmaları gizlidir
        await expect(profileModal.locator('#profile-student-sections')).toBeHidden();
        await expect(profileModal.locator('#profile-studies-summary')).toBeHidden();
        await expect(profileModal.locator('#profile-studies-details')).toBeHidden();
        await expect(profileModal.locator('.profile-badges-section')).toBeHidden();
        await expect(profileModal.locator('#profile-student-grade-group')).toBeHidden();
    });

    test('3. Yazılıya Hazırlık Bölümü: Öz Değerlendirme Etiketi, Tekrar Önerileri ve Modül Giriş Sözleşmesi (Kural 11)', async ({ page }) => {
        const mockAttempts = [
            {
                id: 'attempt_mock_1',
                timestamp: Date.now() - 3600000,
                date: '05.11.2026',
                grade: '7',
                term: '1',
                examNum: '1',
                scenario: 'Senaryo 2',
                scenarioId: 'senaryo-2',
                status: 'completed',
                score: 85,
                maxScore: 100,
                evaluationType: 'Öz değerlendirme',
                missingOutcomes: ['FB.7.1.2: Gök Cisimleri'],
                missedCards: [{ id: 'card-g7-u1-c03', title: 'Gök Cisimleri ve Yıldızlar', outcome_id: 'FB.7.1.2' }]
            }
        ];

        await mockStudentEnvironment(page, { examAttempts: mockAttempts });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');

        // Çalışmalarım sayacını kontrol et: 1 prova
        await expect(profileModal.locator('#studies-summary-counter-text')).toContainText('1 prova');

        // Yazılıya Hazırlık sekmesinde puanın "Öz Değerlendirme" olarak etiketlendiğini doğrula
        const examCard = profileModal.locator('.studies-exam-summary-card');
        await expect(examCard).toBeVisible();
        await expect(examCard.locator('.studies-score-tag')).toHaveText('Öz Değerlendirme: 85 / 100');

        // Tekrar önerilen konu ve "Konuyu Çalış" butonu
        const recBox = profileModal.locator('.studies-recommendation-box');
        await expect(recBox).toBeVisible();
        await expect(recBox).toContainText('FB.7.1.2');
        const studyCardBtn = recBox.locator('.btn-study-card').first();
        await expect(studyCardBtn).toBeVisible();

        // "Konuyu Çalış" tıklandığında profil kapanır ve ders çalışma sahnesi açılır
        await studyCardBtn.click();
        await expect(profileModal).toBeHidden();
        const sceneYazili = page.locator('#scene-yazili');
        await expect(sceneYazili).toBeVisible();

        // Kural 11 Sözleşme Kontrolü: Ana sayfadan "#btn-yazili-modulu" tıklandığında DAİMA scope ekranı açılır
        await page.evaluate(() => {
            if (typeof window.returnToHome === 'function') window.returnToHome();
        });
        await expect(sceneYazili).toBeHidden();

        await page.locator('#btn-yazili-modulu').click();
        await expect(sceneYazili).toBeVisible();
        const scopeView = page.locator('#exam-view-scope');
        await expect(scopeView).toBeVisible();
        await expect(page.locator('#exam-view-study')).toBeHidden();
    });

    test('4. Şampiyonlar Ligi Bölümü: Saydam Kayıt Notu, Puanlar ve Maç Geçmişi', async ({ page }) => {
        // Önce boş geçmiş durumunu sına
        await mockStudentEnvironment(page, { compHistory: [] });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');

        // Şampiyonlar Ligi sekmesine geç
        await profileModal.locator('#tab-btn-lig').click();
        const ligPane = profileModal.locator('#pane-study-lig');
        await expect(ligPane).toBeVisible();

        // Boş geçmişte şeffaf bilgilendirme notu
        await expect(ligPane.locator('.studies-empty-state')).toContainText('Detaylı yarışma geçmişi bu sürümden itibaren izlenmektedir. Önceki sezon ve liderlik puanlarınız hesabınızda korunmaktadır.');

        // Kendi sınıfının lig puanları korunmaktadır
        await expect(ligPane.locator('.studies-comp-summary-card')).toContainText('Sezon Puanı: 150');

        // Şimdi maç geçmişi olan durumu sına
        await page.evaluate(() => {
            const matches = [
                {
                    id: 'comp_1',
                    date: '05.11.2026',
                    grade: '7. Sınıf',
                    score: 120,
                    result: 'Şampiyon',
                    serverAccepted: true
                },
                {
                    id: 'comp_2',
                    date: '04.11.2026',
                    grade: '7. Sınıf',
                    score: 60,
                    result: 'Tamamlandı',
                    serverAccepted: false
                }
            ];
            window.localStorage.setItem('fenupx_competition_history', JSON.stringify(matches));
            if (typeof window.renderCalismalarim === 'function') window.renderCalismalarim();
        });

        // Sayacın güncellendiğini kontrol et: 2 yarışma
        await expect(profileModal.locator('#studies-summary-counter-text')).toContainText('2 yarışma');

        // Maç listesi ve onay durumu rozetleri
        const matchList = ligPane.locator('.studies-match-list');
        await expect(matchList).toBeVisible();
        await expect(matchList.locator('.studies-match-item')).toHaveCount(2);
        await expect(matchList.locator('.status-verified-pill')).toHaveText('Onaylı');
        await expect(matchList.locator('.status-unverified-pill')).toHaveText('Antrenman');
    });

    test('5. Sanal Laboratuvar Bölümü: 30 Deney Envanteri, Durum Geçişleri ve "Yeniden Aç" Buton Sözleşmesi', async ({ page }) => {
        await mockStudentEnvironment(page, {
            labProgress: {
                '5.1': { status: 'completed', observationsCount: 2 },
                '5.2': { status: 'in_progress', observationsCount: 0 }
            }
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');

        // Laboratuvar sekmesine geç
        await profileModal.locator('#tab-btn-lab').click();
        const labPane = profileModal.locator('#pane-study-lab');
        await expect(labPane).toBeVisible();

        // 30 Deneyin tam envanteri mevcuttur
        await expect(labPane.locator('.studies-lab-grid .studies-lab-card')).toHaveCount(30);

        // Sayaçlar: 1 Tamamlandı, 1 Devam Ediyor, 28 Başlanmadı
        await expect(labPane.locator('.pill-completed')).toContainText('1 Tamamlandı');
        await expect(labPane.locator('.pill-in-progress')).toContainText('1 Devam Ediyor');
        await expect(labPane.locator('.pill-not-started')).toContainText('28 Başlanmadı');

        // Deney 5.1 (Tamamlandı) durumunu ve butonunu kontrol et: "Yeniden Aç"
        const card51 = labPane.locator('.studies-lab-card[data-exp-id="5.1"]');
        await expect(card51.locator('.study-badge-completed')).toHaveText('Tamamlandı');
        await expect(card51.locator('.lab-obs-tag')).toHaveText('2 Gözlem');
        await expect(card51.locator('.btn-open-experiment')).toHaveText('Yeniden Aç');

        // Deney 5.2 (Devam Ediyor) durumunu ve butonunu kontrol et: "Yeniden Aç" (durum tam geri yüklenemediği için)
        const card52 = labPane.locator('.studies-lab-card[data-exp-id="5.2"]');
        await expect(card52.locator('.study-badge-in-progress')).toHaveText('Devam Ediyor');
        await expect(card52.locator('.btn-open-experiment')).toHaveText('Yeniden Aç');

        // Deney 5.3 (Başlanmadı) butonunu kontrol et: "Deneyi Başlat"
        const card53 = labPane.locator('.studies-lab-card[data-exp-id="5.3"]');
        await expect(card53.locator('.study-badge-not-started')).toHaveText('Başlanmadı');
        await expect(card53.locator('.btn-open-experiment')).toHaveText('Deneyi Başlat');

        // Sınıf filtreleri: 7. sınıf filtresine basıldığında yalnız 10 adet 7. sınıf deneyi görünür
        await labPane.locator('.lab-filter-btn[data-grade="7"]').click();
        await expect(labPane.locator('.studies-lab-grid .studies-lab-card')).toHaveCount(10);
        await expect(labPane.locator('.studies-lab-grid .studies-lab-card').first()).toContainText('7.1');
    });

    test('6. Rozet Denetimi: "Bilim Ustası" Sade Başlığı, Sayfa Yenilemede Dağıtılmama ve 10 Rozet Korunması', async ({ page }) => {
        await mockStudentEnvironment(page, {
            badges: ['badge_ilk_adim']
        });

        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');

        // Rozet vitrininde tam 10 rozet mevcuttur
        const badgeCards = profileModal.locator('.cosmic-badges-grid .cosmic-badge-item');
        await expect(badgeCards).toHaveCount(10);

        // badge_bilim_ustasi rozetinin adı "Bilim Ustası" olmalı; "Fen Dehası" veya "Dâhi" olmamalı
        const bilimUstasiCard = badgeCards.filter({ hasText: 'badge_bilim_ustasi' }).or(badgeCards.filter({ hasText: 'Bilim Ustası' }));
        await expect(bilimUstasiCard).toBeVisible();
        const cardText = await bilimUstasiCard.textContent();
        expect(cardText).toContain('Bilim Ustası');
        expect(cardText).not.toContain('Dehası');
        expect(cardText).not.toContain('Dahi');

        // Sayfa yenileme yapıldığında kazanılmamış rozetler otomatik verilmemelidir
        await page.reload();
        await page.waitForLoadState('domcontentloaded');

        const earnedAfterReload = await page.evaluate(() => {
            try {
                return JSON.parse(window.localStorage.getItem('fenupx_badges') || '[]');
            } catch (_) {
                return [];
            }
        });
        // Sadece önceden kazanılmış olan badge_ilk_adim kalmalı
        expect(earnedAfterReload).toEqual(['badge_ilk_adim']);
    });

    test('7. Mobil Uyumluluk: 320px, 375px ve 390px Ekranlarda Sekmeler ve Kartlar Taşmaz', async ({ page }) => {
        await mockStudentEnvironment(page);
        await openProfileModal(page);
        const profileModal = page.locator('#profile-modal');
        await expect(profileModal).toBeVisible();

        const viewports = [
            { width: 320, height: 600 },
            { width: 375, height: 667 },
            { width: 390, height: 844 }
        ];

        for (const vp of viewports) {
            await page.setViewportSize(vp);

            // Modal içeriğinin genişliği viewport'u aşmamalıdır
            const modalBox = await profileModal.locator('.modal-content').boundingBox();
            expect(modalBox).toBeTruthy();
            if (modalBox) {
                expect(modalBox.width).toBeLessThanOrEqual(vp.width);
            }

            // Sekme butonları görünür ve tıklanabilir kalmalıdır
            const tabBtn = profileModal.locator('#tab-btn-yazili');
            await expect(tabBtn).toBeVisible();

            // Sanal lab sekmesine geçip taşma olmadığını doğrula
            await profileModal.locator('#tab-btn-lab').click();
            const labCard = profileModal.locator('.studies-lab-card').first();
            await expect(labCard).toBeVisible();
            const cardBox = await labCard.boundingBox();
            expect(cardBox).toBeTruthy();
            if (cardBox && modalBox) {
                expect(cardBox.width).toBeLessThanOrEqual(modalBox.width);
            }
        }
    });

});
