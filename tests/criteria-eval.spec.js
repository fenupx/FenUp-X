import { test, expect } from '@playwright/test';

test.describe('Ölçüt Temelli Öz Değerlendirme ve Hedefli Konu Tekrarı', () => {

  test.beforeEach(async ({ page }) => {
    page.on('dialog', dialog => dialog.accept());
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('1. Veri Modeli ve Puanlama Doğrulaması: 48 soru x (10, 15, 20) dağılım güvencesi', async ({ page }) => {
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();

    const validation = await page.evaluate(async () => {
      const fenUp = window.FenUpExam;
      if (!fenUp || typeof fenUp.distributeCriteriaPoints !== 'function') {
        return { error: 'distributeCriteriaPoints fonksiyonu bulunamadı' };
      }

      const res = await fetch('/data/exam/pilot_7_senaryo2.json');
      const data = await res.json();
      const questions = data.questions || [];
      const cards = data.cards || [];
      const validCardIds = new Set(cards.map(c => c.id));

      const errors = [];
      questions.forEach(q => {
        if (!q.rubric || !Array.isArray(q.rubric) || q.rubric.length === 0) {
          errors.push(`Soru ${q.id}: rubrik bulunamadı.`);
          return;
        }

        // Ölçüt kart eşleşmesi kontrolü
        q.rubric.forEach(r => {
          if (!r.id || !r.text) errors.push(`Soru ${q.id}: eksik r.id veya r.text`);
          if (Array.isArray(r.return_card_ids)) {
            r.return_card_ids.forEach(cid => {
              if (!validCardIds.has(cid)) {
                errors.push(`Soru ${q.id} Ölçüt ${r.id}: Geçersiz kart kimliği: ${cid}`);
              }
            });
          }
        });

        // 10, 15, 20 puan dağıtımı kontrolü
        [10, 15, 20].forEach(tp => {
          const distributed = fenUp.distributeCriteriaPoints(q.rubric, tp);
          const sum = distributed.reduce((s, d) => s + d.points, 0);
          if (sum !== tp) {
            errors.push(`Soru ${q.id} Target ${tp}: Toplam ${sum} != ${tp}`);
          }
          distributed.forEach(d => {
            if (!Number.isInteger(d.points) || d.points <= 0) {
              errors.push(`Soru ${q.id} Target ${tp}: Geçersiz ölçüt puanı: ${d.points}`);
            }
          });
        });
      });

      return {
        questionCount: questions.length,
        errors
      };
    });

    expect(validation.errors).toEqual([]);
    expect(validation.questionCount).toBe(48);
  });

  test('2. Canlı Değerlendirme Akışı: Checkbox seçme, 0 puan mühürleme, soru kaydetme ve özet geçişi', async ({ page }) => {
    // Yazılı modülünü aç
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();

    // Prova başlat
    await page.locator('#exam-start-practice').click();
    await expect(page.locator('#practice-active-box')).toBeVisible();

    // Soru 1'e bir cevap yaz
    await page.locator('#practice-text-ans').fill('Bu soruya detaylı bilimsel cevabımı yazdım.');

    // 7. soruya kadar ilerle
    for (let i = 0; i < 6; i++) {
      await page.locator('#btn-practice-next-q').click();
    }

    // Provayı bitir ve değerlendirmeye geç
    const btnFinish = page.locator('#btn-practice-finish');
    await expect(btnFinish).toBeVisible();
    await btnFinish.click();
    await expect(page.locator('#exam-view-eval')).toBeVisible();

    // Soru 1: Öğrenci cevabı ve örnek cevap görünmeli
    await expect(page.locator('.eval-student-answer-box')).toContainText('Bu soruya detaylı bilimsel cevabımı yazdım.');
    await expect(page.locator('.eval-sample-answer-box')).toContainText('Örnek Bilimsel Açıklama');
    await expect(page.locator('.eval-alt-note')).toContainText('Aynı bilimsel anlamı veren farklı ifadeler kabul edilir.');

    // Soru 1 ölçütleri
    const criterionItems = page.locator('.exam-criterion-item');
    const cbCount = await criterionItems.count();
    expect(cbCount).toBeGreaterThanOrEqual(2);

    // Canlı soru puanı başlangıçta 0 olmalı
    const liveScoreEl = page.locator('#eval-current-q-score');
    await expect(liveScoreEl).toContainText('0');

    // İlk ölçütü işaretle
    await criterionItems.first().click();
    // Puan canlı artmalı (> 0)
    const scoreAfterFirst = await liveScoreEl.innerText();
    expect(scoreAfterFirst.trim()).not.toMatch(/^0\s*\//);
    expect(parseInt(scoreAfterFirst, 10)).toBeGreaterThan(0);

    // Kalan tüm ölçütleri de işaretle (Soru 1 tam puan)
    for (let i = 1; i < cbCount; i++) {
      await criterionItems.nth(i).click();
    }

    // Soru 1'i kaydet ve Soru 2'ye ilerle
    await page.locator('#btn-eval-next-q').click();

    // Şimdi Soru 2'deyiz (1-7 şeridinde 1. buton eval-completed olmalı)
    await expect(page.locator('.q-nav-btn[data-eval-q="0"]')).toHaveClass(/eval-completed/);
    await expect(page.locator('.eval-card .exam-qmeta')).toContainText('SORU 2 / 7');

    // Soru 2: HİÇBİR ÖLÇÜTÜ İŞARETLEME (0 puan kaydetme testi)
    await page.locator('#btn-eval-next-q').click();

    // Şimdi Soru 3'teyiz (2. buton da kaydedildi olarak mühürlenmeli)
    await expect(page.locator('.q-nav-btn[data-eval-q="1"]')).toHaveClass(/eval-completed/);
    await expect(page.locator('.eval-card .exam-qmeta')).toContainText('SORU 3 / 7');

    // Soru 3: Sadece ilk ölçütü işaretle (kısmi puan)
    await page.locator('.exam-criterion-item').first().click();
    await page.locator('#btn-eval-next-q').click();

    // Soru 4, 5, 6'yı da kaydederek geç
    for (let s = 4; s <= 6; s++) {
      await expect(page.locator('.eval-card .exam-qmeta')).toContainText(`SORU ${s} / 7`);
      await page.locator('.exam-criterion-item').first().click();
      await page.locator('#btn-eval-next-q').click();
    }

    // Soru 7'deyiz (Son soru)
    await expect(page.locator('.eval-card .exam-qmeta')).toContainText('SORU 7 / 7');
    await expect(page.locator('#btn-eval-to-summary')).toBeVisible();

    // Son soruda da ilk ölçütü seç ve özete geç
    await page.locator('.exam-criterion-item').first().click();
    await page.locator('#btn-eval-to-summary').click();

    // 5. Aşama: Çalışma Özeti Ekranı Açılmalı
    await expect(page.locator('#exam-view-summary')).toBeVisible();
    await expect(page.locator('#summary-total-score')).toBeVisible();

    // Öz değerlendirme başlığı
    await expect(page.locator('.summary-score-badge .score-label')).toHaveText('Öz Değerlendirme Puanın');

    // Yenileme mevcut özet rotasını ve tamamlanmış sonucu korur.
    await page.reload();
    await expect(page.locator('#exam-view-summary')).toBeVisible();
    await page.locator('#btn-exam-step-back').click();
    // Çalışma seçimine dönerek kayıtlı provaya tekrar devam et
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    // Kayıtlı tamamlanmış provanın özetine dön
    await page.evaluate(() => window.FenUpExam.goToStep('summary'));
    // Doğrudan özet ekranına dönmeli
    await expect(page.locator('#exam-view-summary')).toBeVisible();
    await expect(page.locator('#summary-total-score')).toBeVisible();
  });

  test('3. Hedefli Konu Tekrarı ("Eksiklerimi Çalış") ve Özete Geri Dönüş Akışı', async ({ page }) => {
    // Yazılı modülünü aç ve provaya başla
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    // 7. soruya kadar ilerle
    for (let i = 0; i < 6; i++) {
      await page.locator('#btn-practice-next-q').click();
    }

    // Provayı bitir ve değerlendirmeye geç
    const btnFinish = page.locator('#btn-practice-finish');
    await expect(btnFinish).toBeVisible();
    await btnFinish.click();
    await expect(page.locator('#exam-view-eval')).toBeVisible();

    // 7 soruyu da bilerek eksik ölçütlerle kaydet
    for (let q = 1; q <= 6; q++) {
      await page.locator('.exam-criterion-item').first().click();
      await page.locator('#btn-eval-next-q').click();
    }
    // 7. soru
    await page.locator('.exam-criterion-item').first().click();
    await page.locator('#btn-eval-to-summary').click();

    await expect(page.locator('#exam-view-summary')).toBeVisible();

    // Sonuç bildirim metinleri ve buton hiyerarşisi doğrulaması
    await expect(page.locator('.summary-disclaimer-note')).toContainText('Puanın, kendi cevabında işaretlediğin ölçütlere göre hesaplandı.');
    await expect(page.locator('.needs-study-header p')).toContainText('İşaretlemediğin bilimsel ölçütlerle ilgili tekrar kartların.');

    // Eksikler kutusu ve "Eksiklerimi Çalış" butonu görünür olmalı (birincil buton)
    const btnStudyMissed = page.locator('#btn-summary-study-missed');
    await expect(btnStudyMissed).toBeVisible();
    await expect(btnStudyMissed).toHaveClass(/summary-primary-btn/);
    await expect(page.locator('#btn-summary-new-practice')).toHaveClass(/exam-btn-secondary/);

    // Tekrar kartlarında negatif puan (-X Puan) OLMAMALI
    const returnCardBtns = page.locator('.return-card-btn');
    const returnCount = await returnCardBtns.count();
    expect(returnCount).toBeGreaterThan(0);
    for (let c = 0; c < returnCount; c++) {
      const cardBtn = returnCardBtns.nth(c);
      const text = await cardBtn.innerText();
      expect(text).not.toMatch(/-\d+\s*Puan/i);
      await expect(cardBtn.locator('.return-card-missed-pts')).toBeHidden();
    }

    // "Eksiklerimi Çalış" butonuna tıkla
    await btnStudyMissed.click();

    // Ders ekranı açılmalı (#exam-view-study)
    await expect(page.locator('#exam-view-study')).toBeVisible();

    // Üstte "Çalışma Özetime Dön" butonu yer almalı
    const btnReturnSummary = page.locator('#btn-study-return-summary');
    await expect(btnReturnSummary).toBeVisible();

    // "Çalışma Özetime Dön" butonuna tıkla
    await btnReturnSummary.click();

    // Tekrar aynı özet ekranına dönülmeli
    await expect(page.locator('#exam-view-summary')).toBeVisible();
  });

  test('4. Eski Kayıt Uyumluluğu: Eski 3 seçenekli kayıt korunur ve "Ölçütlerle Yeniden Değerlendir" ile dönüştürülür', async ({ page }) => {
    // LocalStorage içine eski formatta tamamlanmış bir deneme yerleştir
    await page.evaluate(() => {
      const mockState = {
        history: {},
        profileRuns: {},
        currentStep: 'summary',
        hasSelectedScope: true,
        studyPlanOpen: true,
        attempt: {
          version: 2,
          scoringVersion: 3,
          evaluationVersion: 1, // Eski sürüm
          ids: ['FB711-E01', 'FB711-E02', 'FB711-E03', 'FB711-E04', 'FB711-E05', 'FB711-E06', 'FB711-M01'],
          questionPoints: {
            'FB711-E01': 15,
            'FB711-E02': 15,
            'FB711-E03': 15,
            'FB711-E04': 15,
            'FB711-E05': 15,
            'FB711-E06': 15,
            'FB711-M01': 10
          },
          totalPoints: 100,
          profile: 'senaryo2_standart',
          solveMode: 'ekranda',
          answers: {
            'FB711-E01': 'Eski kaydettiğim cevabım.'
          },
          evaluations: {
            'FB711-E01': 'tam',
            'FB711-E02': 'kismen',
            'FB711-E03': 'yapamadim',
            'FB711-E04': 'tam',
            'FB711-E05': 'tam',
            'FB711-E06': 'tam',
            'FB711-M01': 'tam'
          },
          status: 'completed',
          finished: true,
          score: 80
        }
      };
      localStorage.setItem('fenupx_exam_pilot_v1', JSON.stringify(mockState));
    });

    await page.reload();

    // Yazılı modülünü aç
    await page.locator('#btn-yazili-modulu').click();

    // Tercih ekranındayız (#exam-view-choice), kayıtlı çalışma kartından özete geç
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await page.evaluate(() => window.FenUpExam.goToStep('summary'));

    // Özet ekranındayız
    await expect(page.locator('#exam-view-summary')).toBeVisible();

    // Eski puan aynen korunmalı (80 / 100)
    await expect(page.locator('#summary-total-score')).toContainText('80');

    // "Ölçütlerle Yeniden Değerlendir" butonu görünür olmalı
    const btnReEval = page.locator('#btn-summary-re-evaluate');
    await expect(btnReEval).toBeVisible();

    // Butona tıkla
    await btnReEval.click();

    // Değerlendirme ekranına geçmeli (#exam-view-eval)
    await expect(page.locator('#exam-view-eval')).toBeVisible();

    // Öğrencinin eski cevabı korunmuş olmalı
    await expect(page.locator('.eval-student-answer-box')).toContainText('Eski kaydettiğim cevabım.');

    // Ölçüt checkbox'ları yeni yapıda tıklanabilir olmalı
    const firstCriterion = page.locator('.exam-criterion-item').first();
    await expect(firstCriterion).toBeVisible();
    await firstCriterion.click();
    await expect(page.locator('#eval-current-q-score')).not.toContainText('0 /');
  });

  test('5. Ekran Görüntüsü Kaydı: Değerlendirme ve özet ekranları ergonomi doğrulaması', async ({ page }) => {
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    // 7. soruya kadar ilerle
    for (let i = 0; i < 6; i++) {
      await page.locator('#btn-practice-next-q').click();
    }
    await page.locator('#btn-practice-finish').click();

    await expect(page.locator('#exam-view-eval')).toBeVisible();
    await page.screenshot({ path: 'tests/artifacts/eval-screen.png' });

    // 7 soruyu hızla değerlendirip özete geç
    for (let i = 0; i < 6; i++) {
      await page.locator('.exam-criterion-item').first().click();
      await page.locator('#btn-eval-next-q').click();
    }
    await page.locator('.exam-criterion-item').first().click();
    await page.locator('#btn-eval-to-summary').click();

    await expect(page.locator('#exam-view-summary')).toBeVisible();
    await page.screenshot({ path: 'tests/artifacts/summary-screen.png' });
  });

  test('6. Tekrar Kartları Mobil Taşma Koruması, Negatif Puanların Kaldırılması ve Kart Tekilleştirmesi', async ({ page }) => {
    await page.evaluate(() => {
      const qIds = ['FB711-E01', 'FB711-E02', 'FB711-E03', 'FB711-E04', 'FB711-E05', 'FB711-E06', 'FB711-M01'];
      const qPoints = {
        'FB711-E01': 15,
        'FB711-E02': 15,
        'FB711-E03': 15,
        'FB711-E04': 15,
        'FB711-E05': 15,
        'FB711-E06': 15,
        'FB711-M01': 10
      };
      // 81 puan için: 19 puan eksik olmalı (Q1'de c1=5 puan eksik, Q2'de c3=14 puan eksik -> toplam 81)
      const criteriaMap = {
        'FB711-E01': [
          { id: 'c1', text: 'Gök cisimlerini doğru listeler', points: 5, return_card_ids: ['FB711-K01', 'FB711-K02'] },
          { id: 'c2', text: 'Işık kirliliği nedenini açıklar', points: 10, return_card_ids: ['FB711-K03'] }
        ],
        'FB711-E02': [
          { id: 'c3', text: 'Aynaları sınıflandırır', points: 14, return_card_ids: ['FB711-K04'] },
          { id: 'c4', text: 'Kullanım alanlarını açıklar', points: 1, return_card_ids: ['FB711-K04'] }
        ],
        'FB711-E03': [{ id: 'c5', text: 'Hücre kısımlarını açıklar', points: 15, return_card_ids: ['FB711-K05'] }],
        'FB711-E04': [{ id: 'c6', text: 'Mitoz evrelerini sıralar', points: 15, return_card_ids: ['FB711-K06'] }],
        'FB711-E05': [{ id: 'c7', text: 'Mayoz özelliklerini belirtir', points: 15, return_card_ids: ['FB711-K07'] }],
        'FB711-E06': [{ id: 'c8', text: 'Kütle ve ağırlık farkı', points: 15, return_card_ids: ['FB711-K08'] }],
        'FB711-M01': [{ id: 'c9', text: 'Kuvvet ve iş ilişkisi', points: 10, return_card_ids: ['FB711-K09'] }]
      };
      const selectedCriteria = {
        'FB711-E01': ['c2'], // 10 puan (c1 eksik: 5 puan, return_card_ids: ['FB711-K01', 'FB711-K02'])
        'FB711-E02': ['c4'], // 1 puan (c3 eksik: 14 puan)
        'FB711-E03': ['c5'], // 15 puan
        'FB711-E04': ['c6'], // 15 puan
        'FB711-E05': ['c7'], // 15 puan
        'FB711-E06': ['c8'], // 15 puan
        'FB711-M01': ['c9']  // 10 puan
        // Toplam = 10 + 1 + 15 + 15 + 15 + 15 + 10 = 81 puan
      };
      const mockState = {
        history: {},
        profileRuns: {},
        currentStep: 'summary',
        hasSelectedScope: true,
        studyPlanOpen: true,
        attempt: {
          version: 2,
          scoringVersion: 3,
          evaluationVersion: 2,
          ids: qIds,
          questionPoints: qPoints,
          totalPoints: 100,
          profile: 'senaryo2_standart',
          solveMode: 'ekranda',
          answers: { 'FB711-E01': 'Cevap' },
          evaluations: {},
          criteriaMap,
          selectedCriteria,
          status: 'completed',
          finished: true,
          score: 81
        }
      };
      localStorage.setItem('fenupx_exam_pilot_v1', JSON.stringify(mockState));
    });

    await page.reload();
    await page.locator('#btn-yazili-modulu').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await page.evaluate(() => window.FenUpExam.goToStep('summary'));
    await expect(page.locator('#exam-view-summary')).toBeVisible();

    // Puan 81 / 100
    await expect(page.locator('#summary-total-score')).toContainText('81');

    // Tekrar kartları listesi
    const returnCardBtns = page.locator('.return-card-btn');
    const returnCount = await returnCardBtns.count();
    expect(returnCount).toBeGreaterThanOrEqual(2);

    // Kart kimliklerinin tekil olduğunu doğrula (FB711-K01 ve FB711-K02 tekilleştirilmiş)
    const cardIds = await returnCardBtns.evaluateAll(btns => btns.map(b => b.dataset.returnCard));
    const uniqueIds = new Set(cardIds);
    expect(uniqueIds.size).toBe(cardIds.length);

    // Kartlarda kesinlikle "-X Puan" veya benzeri negatif puan etiketi OLMAMALI
    for (let i = 0; i < returnCount; i++) {
      const cardBtn = returnCardBtns.nth(i);
      const btnText = await cardBtn.innerText();
      expect(btnText).not.toMatch(/-\d+\s*Puan/i);
      await expect(cardBtn.locator('.return-card-missed-pts')).toBeHidden();
    }

    // Taşma kontrolü: Karta Git aksiyonu kartın sağ sınırları içinde kalmalı
    const gridBox = await page.locator('.summary-return-cards-grid').boundingBox();
    for (let i = 0; i < returnCount; i++) {
      const cardBtn = returnCardBtns.nth(i);
      const cardBox = await cardBtn.boundingBox();
      const actionBox = await cardBtn.locator('.return-card-action').boundingBox();
      if (cardBox && gridBox && actionBox) {
        // Aksiyon butonu kart sınırları içinde olmalı
        expect(actionBox.x + actionBox.width).toBeLessThanOrEqual(cardBox.x + cardBox.width + 3);
        // Kart ızgarayı aşmamalı
        expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(gridBox.x + gridBox.width + 5);
      }
    }
  });

  test('7. Pedagojik Geri Bildirim ve Buton Hiyerarşisi (100 Tam Puan vs Geliştirilebilir Puan)', async ({ page }) => {
    // 100 Tam Puan Denemesi
    await page.evaluate(() => {
      const qIds = ['FB711-E01', 'FB711-E02', 'FB711-E03', 'FB711-E04', 'FB711-E05', 'FB711-E06', 'FB711-M01'];
      const qPoints = {
        'FB711-E01': 15,
        'FB711-E02': 15,
        'FB711-E03': 15,
        'FB711-E04': 15,
        'FB711-E05': 15,
        'FB711-E06': 15,
        'FB711-M01': 10
      };
      const criteriaMap = {
        'FB711-E01': [{ id: 'c1', text: 'Ölçüt 1', points: 15, return_card_ids: ['FB711-K01'] }],
        'FB711-E02': [{ id: 'c2', text: 'Ölçüt 2', points: 15, return_card_ids: ['FB711-K02'] }],
        'FB711-E03': [{ id: 'c3', text: 'Ölçüt 3', points: 15, return_card_ids: ['FB711-K03'] }],
        'FB711-E04': [{ id: 'c4', text: 'Ölçüt 4', points: 15, return_card_ids: ['FB711-K04'] }],
        'FB711-E05': [{ id: 'c5', text: 'Ölçüt 5', points: 15, return_card_ids: ['FB711-K05'] }],
        'FB711-E06': [{ id: 'c6', text: 'Ölçüt 6', points: 15, return_card_ids: ['FB711-K06'] }],
        'FB711-M01': [{ id: 'c7', text: 'Ölçüt 7', points: 10, return_card_ids: ['FB711-K07'] }]
      };
      const selectedCriteria = {
        'FB711-E01': ['c1'],
        'FB711-E02': ['c2'],
        'FB711-E03': ['c3'],
        'FB711-E04': ['c4'],
        'FB711-E05': ['c5'],
        'FB711-E06': ['c6'],
        'FB711-M01': ['c7']
      };
      const mockState = {
        history: {},
        profileRuns: {},
        currentStep: 'summary',
        hasSelectedScope: true,
        studyPlanOpen: true,
        attempt: {
          version: 2,
          scoringVersion: 3,
          evaluationVersion: 2,
          ids: qIds,
          questionPoints: qPoints,
          totalPoints: 100,
          profile: 'senaryo2_standart',
          solveMode: 'ekranda',
          answers: { 'FB711-E01': 'Cevap' },
          evaluations: {},
          criteriaMap,
          selectedCriteria,
          status: 'completed',
          finished: true,
          score: 100
        }
      };
      localStorage.setItem('fenupx_exam_pilot_v1', JSON.stringify(mockState));
    });

    await page.reload();
    await page.locator('#btn-yazili-modulu').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await page.evaluate(() => window.FenUpExam.goToStep('summary'));
    await expect(page.locator('#exam-view-summary')).toBeVisible();

    // 100 Tam Puanda Pedagojik Mesaj
    await expect(page.locator('#summary-score-sub')).toContainText('Tebrikler! Bu provada tüm bilimsel ölçütleri karşıladığını belirttin.');

    // 100 Tam Puanda "Yeni Prova" birincil buton olmalı, "Eksiklerimi Çalış" butonu gizli olmalı
    await expect(page.locator('#btn-summary-new-practice')).toHaveClass(/exam-btn-primary/);
    await expect(page.locator('#btn-summary-study-missed')).toBeHidden();
    await expect(page.locator('.eval-all-perfect-box')).toBeVisible();
    await expect(page.locator('.eval-all-perfect-box')).toContainText('Tebrikler! Eksiksiz Başarı!');
  });

});
