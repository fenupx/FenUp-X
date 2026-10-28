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
    expect(scoreAfterFirst).not.toContain('0 /');

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

    // Sayfa Yenileme (F5) ve Veri Kalıcılığı Testi
    await page.reload();
    await page.locator('#btn-yazili-modulu').click();
    // Kapsam önceden seçilmiş olduğu için tercih ekranına gelir
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    // Kayıtlı tamamlanmış provanın "Devam Et" butonuna tıkla
    await page.locator('#btn-resume-saved-attempt').click();
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

    // Eksikler kutusu ve "Eksiklerimi Çalış" butonu görünür olmalı
    const btnStudyMissed = page.locator('#btn-summary-study-missed');
    await expect(btnStudyMissed).toBeVisible();

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

    // Tercih ekranındayız (#exam-view-choice), kayıtlı çalışma kartından "Devam Et"e tıkla
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await page.locator('#btn-resume-saved-attempt').click();

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

});
