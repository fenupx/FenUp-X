import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.join(__dirname, '..', 'data', 'exam', 'grade-6', '1d1y');

test.describe('FenUp X — 6. Sınıf 1. Dönem 1. Yazılı Modülü (V1.0) Entegrasyon Doğrulaması', () => {
    test('1. Paket bütünlüğü (SHA256SUMS.txt), manifest.json ve içerik sayıları doğrulanır', async () => {
        const sumsText = fs.readFileSync(path.join(PKG_DIR, 'SHA256SUMS.txt'), 'utf8').trim();
        const lines = sumsText.split(/\r?\n/).filter(Boolean);
        expect(lines.length).toBe(37);

        for (const line of lines) {
            const [expectedHash, relFile] = line.trim().split(/\s+/);
            const filePath = path.join(PKG_DIR, relFile);
            expect(fs.existsSync(filePath), `Eksik dosya: ${relFile}`).toBe(true);
            const actualHash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
            expect(actualHash, `SHA-256 uyuşmazlığı: ${relFile}`).toBe(expectedHash);
        }

        const ek = JSON.parse(fs.readFileSync(path.join(PKG_DIR, 'ek_icerik.json'), 'utf8'));
        const sen = JSON.parse(fs.readFileSync(path.join(PKG_DIR, 'senaryo_kayitlari.json'), 'utf8'));

        expect(ek.outcomes.length).toBe(8);
        expect(Object.keys(ek.cards).length).toBe(48);
        expect(Object.keys(ek.questions).length).toBe(84);
        expect(sen.scenarios.length).toBe(6);

        const expectedQCounts = {
            'FB.6.1.1': 12,
            'FB.6.1.2': 6,
            'FB.6.1.3': 12,
            'FB.6.1.4': 6,
            'FB.6.2.1': 12,
            'FB.6.2.2': 12,
            'FB.6.2.3': 12,
            'FB.6.3.1': 12
        };
        const questions = Object.values(ek.questions);
        for (const [oid, count] of Object.entries(expectedQCounts)) {
            expect(questions.filter(q => q.outcome_id === oid).length).toBe(count);
        }

        // Soru köklerinde puan etiketi veya kazanım kodu sızıntısı olmamalı
        for (const q of questions) {
            expect(q.stem).not.toMatch(/\(\s*\d+\s*puan\s*\)/i);
            expect(q.stem).not.toMatch(/FB\.6\.\d+\.\d+/i);
        }
    });

    test('2. Tüm 33 görsel varlığı tarayıcıda 200 OK ve naturalWidth > 0 ile yüklenir (0 kırık görsel)', async ({ page }) => {
        const assetFiles = fs.readdirSync(path.join(PKG_DIR, 'assets')).filter(f => /\.(svg|png)$/i.test(f)).sort();
        expect(assetFiles.length).toBe(33);

        await page.goto('/index.html');

        for (const file of assetFiles) {
            const url = `/data/exam/grade-6/1d1y/assets/${file}`;
            const response = await page.request.get(url);
            expect(response.status(), `HTTP status hatası: ${url}`).toBe(200);
        }

        const brokenAssets = await page.evaluate(async (files) => {
            const broken = [];
            for (const f of files) {
                const src = `data/exam/grade-6/1d1y/assets/${f}`;
                const ok = await new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve(img.naturalWidth > 0 && img.naturalHeight > 0);
                    img.onerror = () => resolve(false);
                    img.src = src;
                });
                if (!ok) broken.push(f);
            }
            return broken;
        }, assetFiles);

        expect(brokenAssets).toEqual([]);
    });

    test('3. 6. Sınıf S1–S6 senaryolarında (N=8,8,7,6,7,9) örnek sınav üretimi, 100 puan dağılımı ve Bölüm 7A erişilebilirliği doğrulanır', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');
        await expect(page.locator('#exam-view-scope')).toBeVisible();

        // 6. Sınıf seçimi
        await page.selectOption('#exam-select-grade', '6');

        // Senaryo seçenekleri S1-S6 olmalı
        const scenarioOptions = await page.locator('#exam-select-scenario option').evaluateAll(opts => opts.map(o => o.value));
        expect(scenarioOptions).toEqual(['1', '2', '3', '4', '5', '6']);

        const expectedScenarios = {
            1: { total: 8, dist: { 'FB.6.1.1': 2, 'FB.6.1.3': 1, 'FB.6.2.1': 2, 'FB.6.2.2': 1, 'FB.6.2.3': 1, 'FB.6.3.1': 1 } },
            2: { total: 8, dist: { 'FB.6.1.1': 2, 'FB.6.1.3': 2, 'FB.6.2.1': 1, 'FB.6.2.3': 2, 'FB.6.3.1': 1 } },
            3: { total: 7, dist: { 'FB.6.1.1': 2, 'FB.6.1.3': 1, 'FB.6.2.1': 2, 'FB.6.2.3': 2 } },
            4: { total: 6, dist: { 'FB.6.1.1': 1, 'FB.6.1.3': 1, 'FB.6.2.1': 1, 'FB.6.2.2': 1, 'FB.6.2.3': 2 } },
            5: { total: 7, dist: { 'FB.6.1.1': 1, 'FB.6.1.3': 2, 'FB.6.2.1': 2, 'FB.6.2.2': 2 } },
            6: { total: 9, dist: { 'FB.6.1.1': 2, 'FB.6.1.3': 2, 'FB.6.2.1': 2, 'FB.6.2.2': 2, 'FB.6.2.3': 1 } }
        };

        const verification = await page.evaluate(async (expectedMap) => {
            await window.FenUpExam.setGrade('6');
            const allCards = window.FenUpExam.getCards();
            const allQuestions = window.FenUpExam.getAllQuestions();
            const results = {};

            for (const scNum of [1, 2, 3, 4, 5, 6]) {
                window.FenUpExam.setScenario(String(scNum));
                const sc = window.FenUpExam.getActiveScenario();
                const profilesToTest = ['temel', 'dengeli', 'zorlayici'];
                const profileRuns = {};

                for (const prof of profilesToTest) {
                    const history = {};
                    const chosen = window.FenUpExam.selectQuestions(prof, history, 0);
                    const qs = chosen.questions;
                    const pointsMap = window.FenUpExam.calculateQuestionPoints(qs, 100);
                    const totalPts = Object.values(pointsMap).reduce((s, p) => s + p, 0);
                    const allowedPts = Object.values(pointsMap).every(p => [10, 15, 20].includes(p));

                    const actualDist = {};
                    for (const q of qs) {
                        actualDist[q.outcome_id] = (actualDist[q.outcome_id] || 0) + 1;
                    }

                    // Her sorunun rubrik kriter puanları soru puanına tam eşitlenmeli
                    let rubricSumsMatch = true;
                    for (const q of qs) {
                        const qPt = pointsMap[q.id];
                        const distRubric = window.FenUpExam.distributeCriteriaPoints(q.rubric, qPt, q);
                        const rSum = distRubric.reduce((s, c) => s + c.points, 0);
                        if (rSum !== qPt) rubricSumsMatch = false;
                    }

                    profileRuns[prof] = {
                        count: qs.length,
                        totalPts,
                        allowedPts,
                        rubricSumsMatch,
                        actualDist,
                        hasFB612: qs.some(q => q.outcome_id === 'FB.6.1.2'),
                        hasFB614: qs.some(q => q.outcome_id === 'FB.6.1.4')
                    };
                }
                results[scNum] = {
                    question_count: sc.question_count,
                    profileRuns
                };
            }

            return {
                cardCount: allCards.length,
                questionCount: allQuestions.length,
                fb612Cards: allCards.filter(c => c.outcome_id === 'FB.6.1.2').length,
                fb614Cards: allCards.filter(c => c.outcome_id === 'FB.6.1.4').length,
                fb612Questions: allQuestions.filter(q => q.outcome_id === 'FB.6.1.2').length,
                fb614Questions: allQuestions.filter(q => q.outcome_id === 'FB.6.1.4').length,
                results
            };
        }, expectedScenarios);

        expect(verification.cardCount).toBe(48);
        expect(verification.questionCount).toBe(84);
        expect(verification.fb612Cards).toBe(5);
        expect(verification.fb614Cards).toBe(5);
        expect(verification.fb612Questions).toBe(6);
        expect(verification.fb614Questions).toBe(6);

        for (const [scStr, exp] of Object.entries(expectedScenarios)) {
            const scRes = verification.results[scStr];
            expect(scRes.question_count).toBe(exp.total);
            for (const prof of ['temel', 'dengeli', 'zorlayici']) {
                const run = scRes.profileRuns[prof];
                expect(run.count).toBe(exp.total);
                expect(run.totalPts).toBe(100);
                expect(run.allowedPts).toBe(true);
                expect(run.rubricSumsMatch).toBe(true);
                expect(run.actualDist).toEqual(exp.dist);
                expect(run.hasFB612).toBe(false);
                expect(run.hasFB614).toBe(false);
            }
        }

        // Bilgi İstasyonu'nda 8 öğrenme çıktısının tamamı (FB.6.1.2 ve FB.6.1.4 dahil) erişilebilir olmalı
        await page.selectOption('#exam-select-scenario', '1');
        await page.click('#btn-scope-continue');
        await expect(page.locator('#exam-view-choice')).toBeVisible();
        await expect(page.locator('.exam-choice-scope-pill')).toContainText('6. Sınıf · 1. Dönem 1. Yazılı · Senaryo 1');
        await expect(page.locator('#choice-study-count')).toContainText('8 konu · 48 bilgi kartı');

        await page.click('#btn-choice-go-study');
        await expect(page.locator('#exam-view-study')).toBeVisible();
        const studyOutcomes = await page.locator('#exam-outcome-select option').evaluateAll(opts => opts.map(o => o.value));
        expect(studyOutcomes).toEqual([
            'FB.6.1.1', 'FB.6.1.2', 'FB.6.1.3', 'FB.6.1.4',
            'FB.6.2.1', 'FB.6.2.2', 'FB.6.2.3', 'FB.6.3.1'
        ]);
    });

    test('4. Yanlış/eksik cevap sonrası return_card_ids bağlantıları 6. sınıf konu kartlarına doğru yönlendirir', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');
        await page.selectOption('#exam-select-grade', '6');
        await page.selectOption('#exam-select-scenario', '4'); // S4: 6 soru
        await page.click('#btn-scope-continue');
        await page.click('#btn-choice-go-practice');
        await page.click('#exam-start-practice');

        await expect(page.locator('#practice-active-box')).toBeVisible();
        for (let i = 0; i < 5; i++) {
            await page.click('#btn-practice-next-q');
        }
        await page.click('#btn-practice-finish');
        await expect(page.locator('#exam-view-eval')).toBeVisible();

        // İlk soruda "Yapamadım / Boş Bıraktım" (0 puan), diğer 5 soruda "Tam Doğru Yaptım" seçelim
        const firstQuestionExpectedCards = await page.evaluate(() => {
            const st = window.FenUpExam.getState();
            const qId = st.attempt.ids[0];
            const q = window.FenUpExam.getQuestions().find(x => x.id === qId);
            return q.return_card_ids;
        });
        expect(firstQuestionExpectedCards.length).toBeGreaterThan(0);

        await expect(page.locator('#eval-single-question-container .exam-qmeta')).toContainText('SORU 1 / 6');
        await page.click('#btn-eval-zero');
        for (let i = 1; i < 6; i++) {
            await expect(page.locator('#eval-single-question-container .exam-qmeta')).toContainText(`SORU ${i + 1} / 6`);
            await page.click('#btn-eval-full');
        }
        await page.click('#btn-eval-to-summary');

        await expect(page.locator('#exam-view-summary')).toBeVisible();
        const returnButtons = page.locator('#summary-return-cards-container [data-return-card]');
        const returnedCardIds = await returnButtons.evaluateAll(btns => btns.map(b => b.getAttribute('data-return-card')));
        for (const expectedCid of firstQuestionExpectedCards) {
            expect(returnedCardIds).toContain(expectedCid);
        }

        // İlk önerilen karta tıklayıp 6. sınıf kartına yönlendiğini doğrula
        const firstBtnCardId = returnedCardIds[0];
        await returnButtons.first().click();
        await expect(page.locator('#exam-view-study')).toBeVisible();
        const activeCardId = await page.evaluate(() => {
            const st = window.FenUpExam.getState();
            return window.FenUpExam.getCards()[st.studyCardIdx]?.id;
        });
        expect(activeCardId).toBe(firstBtnCardId);
    });

    test('5. Masaüstü, mobil ve yazdırma (print) önizlemesinde kart ve soru görselleri kontrast ve taşma kuralına uyar', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');
        await page.selectOption('#exam-select-grade', '6');
        await page.selectOption('#exam-select-scenario', '1');
        await page.click('#btn-scope-continue');

        // 1) Bilgi İstasyonu (Koyu tema kart görseli kontrolü: K01 görselli konu kartı)
        await page.click('#btn-choice-go-study');
        await expect(page.locator('#exam-view-study')).toBeVisible();
        await page.click('#exam-card-next');
        await expect(page.locator('#exam-visual')).toBeVisible();
        const cardVisualBoxStyle = await page.locator('#exam-visual').evaluate(el => {
            const cs = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            const img = el.querySelector('img');
            const imgRect = img ? img.getBoundingClientRect() : null;
            return {
                bg: cs.backgroundColor,
                overflowsParent: imgRect ? (imgRect.width > rect.width + 2) : false,
                naturalWidth: img ? img.naturalWidth : 0
            };
        });
        expect(cardVisualBoxStyle.naturalWidth).toBeGreaterThan(0);
        expect(cardVisualBoxStyle.overflowsParent).toBe(false);
        expect(cardVisualBoxStyle.bg).toBe('rgb(15, 23, 42)');

        // 2) Yazılı Provası ve Print Önizleme (print_background: "white" kontrolü)
        await page.click('#btn-study-jump-practice');
        await page.click('#exam-start-practice');
        await expect(page.locator('#practice-active-box')).toBeVisible();

        // Görselli bir soruya geçelim
        const visualQIndex = await page.evaluate(() => {
            const st = window.FenUpExam.getState();
            const qs = st.attempt.ids.map(id => window.FenUpExam.getQuestions().find(q => q.id === id));
            return qs.findIndex(q => q && q.visual && q.visual.asset);
        });
        if (visualQIndex >= 0) {
            await page.locator('#practice-question-nav-strip button').nth(visualQIndex).click();
            const qBox = page.locator('.exam-qimage-box.print-bg-white');
            await expect(qBox).toBeVisible();
            const qBoxBg = await qBox.evaluate(el => window.getComputedStyle(el).backgroundColor);
            expect(qBoxBg).toBe('rgb(255, 255, 255)');
        }

        // Baskı / PDF Önizlemesi
        await page.click('#btn-practice-preview-print');
        await expect(page.locator('#exam-print-preview-modal')).toBeVisible();
        await expect(page.locator('#exam-print-sheet .print-sub-title')).toContainText('6. Sınıf 1. Dönem 1. Yazılı Provası');

        if (visualQIndex >= 0) {
            const printImgBox = page.locator('#exam-print-sheet .print-qimage.print-bg-white').first();
            await expect(printImgBox).toBeVisible();
            const printBg = await printImgBox.evaluate(el => window.getComputedStyle(el).backgroundColor);
            expect(printBg).toBe('rgb(255, 255, 255)');
        }
        await page.click('#btn-print-preview-close');

        // 3) Mobil Görünüm (390x844) Taşma Kontrolü
        await page.setViewportSize({ width: 390, height: 844 });
        const hasHorizontalOverflow = await page.evaluate(() => {
            return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
        });
        expect(hasHorizontalOverflow).toBe(false);
    });
});
