import { test, expect } from '@playwright/test';

test.describe('Gezinme ve Kayıt / Devam Et Akışı Testleri', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('Cevap yaz -> Hazırlık -> Devam Et akışında cevap ve soru sırası korunmalı', async ({ page }) => {
    await page.goto('/');

    // 1. Yazılıya Hazırlık modülünü aç
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();

    // Prova Ayarları Ekranında "Başla" tıkla
    await expect(page.locator('#practice-setup-box')).toBeVisible();
    await page.locator('#exam-start-practice').click();

    // Aktif Soru Ekranındayız
    await expect(page.locator('#practice-active-box')).toBeVisible();

    // 1. Soruya özel cevap yaz
    const testAns1 = 'Test Cevabı Soru 1: Işığın kırılması merceklerde gerçekleşir.';
    const textarea = page.locator('#practice-text-ans');
    await textarea.fill(testAns1);

    // "Hazırlık Ekranı" butonuna tıkla (#btn-exam-step-back)
    const btnBack = page.locator('#btn-exam-step-back');
    await btnBack.click();

    // Tercih ekranındayız (#exam-view-choice)
    await expect(page.locator('#exam-view-choice')).toBeVisible();

    // Kayıtlı çalışma kartı (#choice-saved-attempt-card) ve "Kaldığın Yerden Devam Et" butonu görünür olmalı
    const btnResume = page.locator('#btn-resume-saved-attempt');
    await expect(btnResume).toBeVisible();
    await btnResume.click();

    // Tekrar provaya dönüldüğünde yazılan cevap yerinde durmalı
    await expect(page.locator('#practice-active-box')).toBeVisible();
    await expect(page.locator('#practice-text-ans')).toHaveValue(testAns1);
  });

  test('Mobil açılır soru menüsünde soru seçimi cevabı otomatik kaydetmeli ve soruya geçmeli', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    await expect(page.locator('#practice-active-box')).toBeVisible();

    // Soru 1'e cevap yaz
    const ansQ1 = 'Soru 1 Yanıtı: Teleskop icadı uzay araştırmalarını hızlandırdı.';
    await page.locator('#practice-text-ans').fill(ansQ1);

    // Kompakt Soru Seçici Butonuna Tıkla
    const btnPicker = page.locator('#btn-practice-q-picker');
    await expect(btnPicker).toBeVisible();
    await btnPicker.click();

    // Dropdown açılmalı
    const dropdown = page.locator('#practice-q-picker-dropdown');
    await expect(dropdown).toBeVisible();
    await expect(dropdown).not.toHaveClass(/is-hidden/);

    // Soru 3 öğesine tıkla (data-picker-q="2")
    const itemQ3 = dropdown.locator('[data-picker-q="2"]');
    await expect(itemQ3).toBeVisible();
    await itemQ3.click();

    // Dropdown kapanmalı
    await expect(dropdown).toHaveClass(/is-hidden/);

    // Gösterge "Soru 3 / 7" olmalı
    await expect(page.locator('#practice-current-indicator')).toContainText('Soru 3');

    // Tekrar menüyü aç ve Soru 1'e dön
    await btnPicker.click();
    await expect(dropdown).toBeVisible();

    // Soru 1'in yanında "Yanıtlandı" rozeti olmalı
    const itemQ1 = dropdown.locator('[data-picker-q="0"]');
    await expect(itemQ1.locator('.q-picker-badge.answered')).toBeVisible();

    // Soru 1'e tıkla
    await itemQ1.click();
    await expect(page.locator('#practice-current-indicator')).toContainText('Soru 1');

    // Yazılan cevabın korunduğunu doğrula
    await expect(page.locator('#practice-text-ans')).toHaveValue(ansQ1);
  });

  test('Yeni Prova tıklandığında eski cevaplar temizlenmeli ve temiz prova başlamalı', async ({ page }) => {
    await page.goto('/');
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    // Cevap yaz
    await page.locator('#practice-text-ans').fill('Eski Deneme Yanıtı');

    // Hazırlık ekranına dön
    await page.locator('#btn-exam-step-back').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();

    // "Provaya Başla" butonuna tıkla (Yeni Prova başlatır)
    const btnNewPractice = page.locator('#btn-choice-go-practice');
    await expect(btnNewPractice).toBeVisible();
    await btnNewPractice.click();

    // Kurulum kutusu açılır, "Başla"ya bas
    await expect(page.locator('#practice-setup-box')).toBeVisible();
    await page.locator('#exam-start-practice').click();

    // Soru alanındaki cevabın sıfırlandığını doğrula
    await expect(page.locator('#practice-active-box')).toBeVisible();
    await expect(page.locator('#practice-text-ans')).toHaveValue('');
  });

  test('Akış (a) ve (b): Yeni konu çalışması -> birkaç kart ilerle -> ana sayfa -> modüle dön -> Yeni Konu 1. kartta, Devam Et önceki kartta', async ({ page }) => {
    const v3Data = await (await page.request.get('/data/exam/content-v3/pilot_7_senaryo2.json')).json();
    await page.evaluate(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
    await page.goto('/');

    // Kayıt yokken Kaldığın Çalışmalar bölümü gizli olmalı
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await expect(page.locator('#choice-saved-works-section')).toBeHidden();

    // (a) Yeni konu çalışmasına başla ve 4. karta (index 3) kadar ilerle
    await page.locator('#btn-choice-go-study').click();
    await expect(page.locator('.exam-card-title')).toHaveText(v3Data.cards[0].title);
    await page.locator('#exam-card-next').click();
    await page.locator('#exam-card-next').click();
    await page.locator('#exam-card-next').click();
    await expect(page.locator('.exam-card-title')).toHaveText(v3Data.cards[3].title);

    // Ana sayfaya çık ve modüle yeniden gir: otomatik olarak eski konu açılmamalı, seçim ekranı açılmalı
    await page.locator('#site-logo-link').click();
    await expect(page.locator('#scene-home')).toBeVisible();
    await page.locator('#btn-yazili-modulu').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await expect(page.locator('#exam-view-study')).toBeHidden();

    // Kaldığın Çalışmalar bölümünde kayıtlı konu çalışması (Kart 4 / 24) görünmeli ve taşmamalı
    const savedSection = page.locator('#choice-saved-works-section');
    await expect(savedSection).toBeVisible();
    await expect(page.locator('#choice-saved-study-card')).toBeVisible();
    await expect(page.locator('#saved-study-badge')).toContainText('Kart 4 / 24');

    const overflow = await savedSection.evaluate(el => ({
      clientWidth: el.clientWidth,
      scrollWidth: el.scrollWidth,
      docOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    expect(overflow.docOverflow).toBe(true);

    // Yeni "Konu Çalışmaya Başla" seçildiğinde senaryonun ilk kartından (Kart 1) başlamalı
    await page.locator('#btn-choice-go-study').click();
    await expect(page.locator('#exam-view-study')).toBeVisible();
    await expect(page.locator('.exam-card-title')).toHaveText(v3Data.cards[0].title);
    await expect(page.locator('.study-counter-topic')).toContainText('Kart 1 / 9');

    // (b) Seçim ekranına dönüp aynı eski çalışmayı "Devam Et" ile açtığımızda önceki kart (Kart 4) korunmalı
    await page.locator('#btn-exam-step-back').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await page.locator('#btn-resume-saved-study').click();
    await expect(page.locator('#exam-view-study')).toBeVisible();
    await expect(page.locator('.exam-card-title')).toHaveText(v3Data.cards[3].title);
  });

  test('Akış (c), (d) ve (e): Prova -> cevap yaz -> başka modül -> geri giriş -> Devam Et korur, Yeni Prova boş ve yeni setle başlar, Geri/İleri korur', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
    await page.goto('/');

    // Prova başlat, 2. soruya geç ve cevap yaz
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    const firstAttemptIds = await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.ids);
    await page.locator('#practice-text-ans').fill('Soru 1 bilimsel yanıtım');
    await page.locator('#btn-practice-next-q').click();
    await expect(page.locator('#practice-current-indicator')).toContainText('Soru 2 / 7');
    await page.locator('#practice-text-ans').fill('Soru 2 bilimsel yanıtım');

    // (e) Aynı çalışmada PDF önizleme açıp kapatma ve tarayıcı geri/ileri veriyi ve soru geçmişini bozmamalı
    const historyBeforePdf = await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).history);
    await page.locator('#btn-practice-preview-print').click();
    await expect(page.locator('#exam-print-preview-modal')).toBeVisible();
    await page.locator('#btn-print-preview-close').click();
    await expect(page.locator('#exam-print-preview-modal')).toBeHidden();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).history)).toEqual(historyBeforePdf);

    await page.goBack();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await page.goForward();
    await expect(page.locator('#exam-view-practice')).toBeVisible();
    await expect(page.locator('#practice-current-indicator')).toContainText('Soru 2 / 7');
    await expect(page.locator('#practice-text-ans')).toHaveValue('Soru 2 bilimsel yanıtım');

    // Başka modüle (Sanal Laboratuvar) geç ve tekrar Yazılıya Hazırlık modülüne dön
    await page.locator('#site-logo-link').click();
    await expect(page.locator('#scene-home')).toBeVisible();
    await page.locator('#btn-deney-modulu').click();
    await expect(page.locator('#lab-view')).toBeVisible();
    await page.locator('#btn-lab-back-home').click();
    await expect(page.locator('#scene-home')).toBeVisible();

    await page.locator('#btn-yazili-modulu').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await expect(page.locator('#exam-view-practice')).toBeHidden();

    // Kurulum ekranını açıp başlatmadan geri dönmek eski kaydı veya soru geçmişini silmemeli
    await page.locator('#btn-choice-go-practice').click();
    await expect(page.locator('#practice-setup-box')).toBeVisible();
    await page.locator('#btn-exam-step-back').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).history)).toEqual(historyBeforePdf);

    // (d) "Devam Et" seçildiğinde eski set, kaldığı soru (Soru 2) ve cevaplar korunmalı
    await page.locator('#btn-resume-saved-attempt').click();
    await expect(page.locator('#practice-active-box')).toBeVisible();
    await expect(page.locator('#practice-current-indicator')).toContainText('Soru 2 / 7');
    await expect(page.locator('#practice-text-ans')).toHaveValue('Soru 2 bilimsel yanıtım');
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).attempt.ids)).toEqual(firstAttemptIds);
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')).history)).toEqual(historyBeforePdf);

    // (c) Tekrar çıkıp gir ve Yeni "Provaya Başla" -> "Başla" seç: yeni soru seti (0 tekrar) ve boş cevaplarla 1. sorudan başlamalı
    await page.locator('#site-logo-link').click();
    await page.locator('#btn-yazili-modulu').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    await expect(page.locator('#practice-active-box')).toBeVisible();
    await expect(page.locator('#practice-current-indicator')).toContainText('Soru 1 / 7');
    await expect(page.locator('#practice-text-ans')).toHaveValue('');

    const secondState = await page.evaluate(() => JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1')));
    const secondAttemptIds = secondState.attempt.ids;
    expect(secondState.attempt.repeats).toBe(0);
    // İlk provadaki 7 sorudan hiçbiri 2. provada tekrarlanmamalı ve geçmişte toplam 14 soru kayıtlı olmalı
    expect(secondAttemptIds.filter(id => firstAttemptIds.includes(id))).toHaveLength(0);
    expect(Object.keys(secondState.history)).toHaveLength(14);
  });

  test('Akış (f), (g) ve (h): Art arda yeni provalarda görülmemiş sorulara öncelik, daralan havuzda kontrollü tekrar ve V2/V3 sentetik profil izolasyonu', async ({ page }) => {
    await page.evaluate(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
    await page.goto('/');

    // (f) & (g) Art arda provalar ve havuz daraldığında kontrollü tekrar, geçerli kota ve toplam 100 puan
    const repetitionMetrics = await page.evaluate(async () => {
      const engine = await import(document.querySelector('script[src*="exam-engine.js"]').src);
      const v3 = await (await fetch('data/exam/content-v3/pilot_7_senaryo2.json')).json();
      const history = {};
      const runs = [];

      for (let run = 0; run < 10; run++) {
        const res = engine.selectQuestions('dengeli', history, run);
        const ids = res.questions.map(q => q.id);
        const points = window.FenUpExam.calculateQuestionPoints(res.questions, 100);
        const totalScore = Object.values(points).reduce((a, b) => a + b, 0);

        // Kota, family_id ve incompatible_with doğrulaması
        const conf = v3.selection_policy.scenario_profiles.dengeli;
        const quota = conf.cycles[run % conf.cycles.length];
        for (const [oid, diffs] of Object.entries(quota)) {
          for (const [diff, n] of Object.entries(diffs)) {
            if (res.questions.filter(q => q.outcome_id === oid && q.difficulty === diff).length !== n) {
              throw new Error(`Kota ihlali: run=${run} ${oid} ${diff}`);
            }
          }
        }
        if (new Set(res.questions.map(q => q.family_id)).size !== 7) throw new Error('family_id ihlali');
        for (const a of res.questions) {
          for (const b of res.questions) {
            if (a.id !== b.id && ((a.incompatible_with || []).includes(b.id) || (b.incompatible_with || []).includes(a.id))) {
              throw new Error('incompatible_with ihlali');
            }
          }
        }
        if (totalScore !== 100) throw new Error('Toplam 100 puan ihlali');

        runs.push({
          run: run + 1,
          repeats: res.repeats,
          uniqueSeenTotal: Object.keys(history).length,
          ids
        });
      }

      // En az görülmüş ve eşitlikte en eski görülmüş (oldest last) önceliği doğrulaması:
      // Tüm V3 sorularını count=2, last=5000 olarak işaretle; yalnız ilk provanın 7 sorusunu count=1, last=1000 yap.
      const tieHistory = {};
      for (const q of v3.questions) {
        tieHistory[q.id] = { count: 2, last: 5000 };
      }
      for (const id of runs[0].ids) {
        tieHistory[id] = { count: 1, last: 1000 };
      }
      const leastSeenPick = engine.selectQuestions('dengeli', tieHistory, 0).questions.map(q => q.id);

      // Eşit count=1 durumunda daha eski last değerine sahip setin seçildiğini doğrula
      const oldestTieHistory = {};
      for (const q of v3.questions) {
        oldestTieHistory[q.id] = { count: 1, last: 9000 };
      }
      for (const id of runs[0].ids) {
        oldestTieHistory[id] = { count: 1, last: 1000 };
      }
      const oldestPick = engine.selectQuestions('dengeli', oldestTieHistory, 0).questions.map(q => q.id);

      return { runs, firstRunIds: runs[0].ids, leastSeenPick, oldestPick };
    });

    // İlk 2 dengeli provada (2 x 7 = 14 soru) hiç soru tekrarı olmamalı (repeats === 0, 14 benzersiz soru)
    expect(repetitionMetrics.runs[0].repeats).toBe(0);
    expect(repetitionMetrics.runs[1].repeats).toBe(0);
    expect(repetitionMetrics.runs[1].uniqueSeenTotal).toBe(14);
    // 3. ve 4. döngülerde FB.7.2.1 uyumluluk kısıtları korunurken yalnız zorunlu minimum tekrar (<= 2) yapılmalı
    expect(repetitionMetrics.runs[2].repeats).toBeLessThanOrEqual(2);
    expect(repetitionMetrics.runs[3].repeats).toBeLessThanOrEqual(2);
    expect(repetitionMetrics.runs[3].uniqueSeenTotal).toBeGreaterThanOrEqual(25);
    // Havuz daraldığında (5., 6. ve 8. provalar) tüm set aynen tekrarlanmamalı, yeni sorular girmeye devam etmeli
    expect(repetitionMetrics.runs[4].repeats).toBeLessThan(7);
    expect(repetitionMetrics.runs[5].repeats).toBeLessThan(7);
    expect(repetitionMetrics.runs[5].uniqueSeenTotal).toBeGreaterThanOrEqual(31);
    expect(repetitionMetrics.runs[7].uniqueSeenTotal).toBeGreaterThanOrEqual(38);
    // En az görülmüş (count=1 < count=2) ve eşitlikte en eski görülmüş (last=1000 < last=9000) tercih edilmeli
    expect([...repetitionMetrics.leastSeenPick].sort()).toEqual([...repetitionMetrics.firstRunIds].sort());
    expect([...repetitionMetrics.oldestPick].sort()).toEqual([...repetitionMetrics.firstRunIds].sort());

    // (h) Sentetik V2 kaydı varken yeni çalışma gerçekten V3 kullanıyor, Devam Et ise V2 kaydını koruyor
    const v2Data = await (await page.request.get('/data/exam/content-v2/pilot_7_senaryo2.json')).json();
    const v3Data = await (await page.request.get('/data/exam/content-v3/pilot_7_senaryo2.json')).json();
    const v2Ids = v2Data.questions.slice(0, 7).map(q => q.id);

    await page.evaluate(({ v2Ids }) => {
      localStorage.setItem('fenupx_exam_pilot_v1', JSON.stringify({
        history: { [v2Ids[0]]: { count: 1, last: 1000 } },
        hasSelectedScope: true,
        currentStep: 'practice',
        studyCardIdx: 4,
        savedStudy: {
          cardIdx: 4,
          totalCards: 26,
          contentRevision: '2.0.0',
          visitedCards: ['C01', 'C02', 'C03', 'C04', 'C05']
        },
        attempt: {
          contentRevision: '2.0.0',
          rubricRevision: '2.0.0',
          routeKey: 'synthetic-v2-attempt',
          ids: v2Ids,
          questionPoints: Object.fromEntries(v2Ids.map((id, i) => [id, i === 0 ? 10 : 15])),
          totalPoints: 100,
          profile: 'dengeli',
          solveMode: 'ekranda',
          activeQuestionIndex: 2,
          answers: { [v2Ids[2]]: 'Sentetik V2 Cevabı' },
          evaluations: {},
          selectedCriteria: {},
          evaluatedQuestions: {},
          status: 'in_progress',
          finished: false
        }
      }));
    }, { v2Ids });

    await page.locator('#btn-yazili-modulu').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await expect(page.locator('#choice-study-count')).toContainText('24 bilgi kartı');
    await expect(page.locator('#saved-study-version-note')).toContainText('V3');
    await expect(page.locator('#saved-attempt-version-note')).toContainText('V3');

    // Kayıt listesinin (hem konu hem prova + V2 sürüm notu görünürken) dikey ve yatay görünümde taşmadığını ve 48x48 dokunma hedefini doğrula
    const checkSavedLayout = async () => {
      const metrics = await page.evaluate(() => {
        const sec = document.getElementById('choice-saved-works-section');
        const studyCard = document.getElementById('choice-saved-study-card');
        const attemptCard = document.getElementById('choice-saved-attempt-card');
        const btn1 = document.getElementById('btn-resume-saved-study').getBoundingClientRect();
        const btn2 = document.getElementById('btn-resume-saved-attempt').getBoundingClientRect();
        return {
          docOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
          secOverflow: sec.scrollWidth <= sec.clientWidth + 1,
          studyOverflow: studyCard.scrollWidth <= studyCard.clientWidth + 1,
          attemptOverflow: attemptCard.scrollWidth <= attemptCard.clientWidth + 1,
          btn1W: Math.round(btn1.width),
          btn1H: Math.round(btn1.height),
          btn2W: Math.round(btn2.width),
          btn2H: Math.round(btn2.height)
        };
      });
      expect(metrics.docOverflow).toBe(true);
      expect(metrics.secOverflow).toBe(true);
      expect(metrics.studyOverflow).toBe(true);
      expect(metrics.attemptOverflow).toBe(true);
      expect(metrics.btn1W).toBeGreaterThanOrEqual(48);
      expect(metrics.btn1H).toBeGreaterThanOrEqual(48);
      expect(metrics.btn2W).toBeGreaterThanOrEqual(48);
      expect(metrics.btn2H).toBeGreaterThanOrEqual(48);
    };
    await checkSavedLayout();

    const vp = page.viewportSize();
    if (vp && vp.width <= 430 && vp.height > vp.width) {
      await page.setViewportSize({ width: vp.height, height: vp.width });
      await checkSavedLayout();
      await page.setViewportSize(vp);
    }

    // Eski V2 prova kaydı korunurken Yeni Konu Çalışması V3 ve 1. kartı açmalı
    await page.locator('#btn-choice-go-study').click();
    await expect(page.locator('#scene-yazili')).toHaveClass(/content-v3/);
    await expect(page.locator('.exam-card-title')).toHaveText(v3Data.cards[0].title);

    // Seçime dönüp V2 provasına Devam Et dediğimizde V2 sorusu ve cevabı (Soru 3) açılmalı
    await page.locator('#btn-exam-step-back').click();
    await page.locator('#btn-resume-saved-attempt').click();
    await expect(page.locator('#practice-current-indicator')).toContainText('Soru 3 / 7');
    await expect(page.locator('#practice-text-ans')).toHaveValue('Sentetik V2 Cevabı');
    await expect(page.locator('#practice-active-box')).toContainText(v2Data.questions[2].stem);
  });
});
