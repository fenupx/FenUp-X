import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.join(__dirname, '..', 'data', 'exam', 'grade-5', '1d1y');

test.describe('FenUp X — 5. Sınıf 1. Dönem 1. Yazılı Modülü (V1.0) & Yönetim Paneli Sayım Doğrulaması (V8.9.23)', () => {
    test('1. Paket bütünlüğü (SHA256SUMS.txt), manifest.json, OUTCOME_ORDER ve içerik sayıları doğrulanır', async () => {
        const sumsText = fs.readFileSync(path.join(PKG_DIR, 'SHA256SUMS.txt'), 'utf8').trim();
        const lines = sumsText.split(/\r?\n/).filter(Boolean);
        expect(lines.length).toBe(51);

        for (const line of lines) {
            const [expectedHash, relFile] = line.trim().split(/\s+/);
            const filePath = path.join(PKG_DIR, relFile);
            expect(fs.existsSync(filePath), `Eksik dosya: ${relFile}`).toBe(true);
            const actualHash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
            expect(actualHash, `SHA-256 uyuşmazlığı: ${relFile}`).toBe(expectedHash);
        }

        const ek = JSON.parse(fs.readFileSync(path.join(PKG_DIR, 'ek_icerik.json'), 'utf8'));
        const sen = JSON.parse(fs.readFileSync(path.join(PKG_DIR, 'senaryo_kayitlari.json'), 'utf8'));

        expect(ek.outcomes.length).toBe(5);
        expect(ek.outcomes.map(o => o.id)).toEqual(['FB.5.1.1', 'FB.5.1.2', 'FB.5.1.3', 'FB.5.1.4', 'FB.5.2.1']);
        expect(Object.keys(ek.cards).length).toBe(37);
        expect(Object.keys(ek.questions).length).toBe(54);
        expect(sen.scenarios.length).toBe(4);

        const expectedQCounts = {
            'FB.5.1.1': 6,
            'FB.5.1.2': 12,
            'FB.5.1.3': 12,
            'FB.5.1.4': 12,
            'FB.5.2.1': 12
        };
        const questions = Object.values(ek.questions);
        for (const [oid, count] of Object.entries(expectedQCounts)) {
            expect(questions.filter(q => q.outcome_id === oid).length).toBe(count);
        }

        // Soru köklerinde puan etiketi veya kazanım kodu sızıntısı olmamalı
        for (const q of questions) {
            expect(q.stem).not.toMatch(/\(\s*\d+\s*puan\s*\)/i);
            expect(q.stem).not.toMatch(/FB\.5\.\d+\.\d+/i);
        }
    });

    test('2. Tüm 47 görsel varlığı tarayıcıda 200 OK ve naturalWidth > 0 ile yüklenir (0 kırık görsel)', async ({ page }) => {
        const assetFiles = fs.readdirSync(path.join(PKG_DIR, 'assets')).filter(f => /\.(svg|png)$/i.test(f)).sort();
        expect(assetFiles.length).toBe(47);

        await page.goto('/index.html');

        for (const file of assetFiles) {
            const url = `/data/exam/grade-5/1d1y/assets/${file}`;
            const response = await page.request.get(url);
            expect(response.status(), `HTTP status hatası: ${url}`).toBe(200);
        }

        const brokenAssets = await page.evaluate(async (files) => {
            const broken = [];
            for (const f of files) {
                const src = `data/exam/grade-5/1d1y/assets/${f}`;
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

    test('3. 5. Sınıf S1–S4 senaryolarında (N=7,7,6,6) örnek sınav üretimi, 100 puan dağılımı ve FB.5.1.1 dahil Bilgi İstasyonu erişilebilirliği doğrulanır', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');
        await expect(page.locator('#exam-view-scope')).toBeVisible();

        // 5. Sınıf seçimi
        await page.selectOption('#exam-select-grade', '5');

        // Senaryo seçenekleri S1-S4 olmalı
        const scenarioOptions = await page.locator('#exam-select-scenario option').evaluateAll(opts => opts.map(o => o.value));
        expect(scenarioOptions).toEqual(['1', '2', '3', '4']);

        const expectedScenarios = {
            1: { total: 7, dist: { 'FB.5.1.2': 2, 'FB.5.1.3': 2, 'FB.5.1.4': 2, 'FB.5.2.1': 1 } },
            2: { total: 7, dist: { 'FB.5.1.2': 2, 'FB.5.1.3': 3, 'FB.5.1.4': 2 } },
            3: { total: 6, dist: { 'FB.5.1.2': 2, 'FB.5.1.3': 1, 'FB.5.1.4': 1, 'FB.5.2.1': 2 } },
            4: { total: 6, dist: { 'FB.5.1.2': 2, 'FB.5.1.4': 2, 'FB.5.2.1': 2 } }
        };

        const verification = await page.evaluate(async () => {
            await window.FenUpExam.setGrade('5');
            const allCards = window.FenUpExam.getCards();
            const allQuestions = window.FenUpExam.getAllQuestions();
            const results = {};

            for (const scNum of [1, 2, 3, 4]) {
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
                        hasFB511: qs.some(q => q.outcome_id === 'FB.5.1.1')
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
                fb511Cards: allCards.filter(c => c.outcome_id === 'FB.5.1.1').length,
                fb511Questions: allQuestions.filter(q => q.outcome_id === 'FB.5.1.1').length,
                results
            };
        });

        expect(verification.cardCount).toBe(37);
        expect(verification.questionCount).toBe(54);
        expect(verification.fb511Cards).toBe(7);
        expect(verification.fb511Questions).toBe(6);

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
                expect(run.hasFB511).toBe(false);
            }
        }

        // Bilgi İstasyonu'nda 5 öğrenme çıktısının tamamı (FB.5.1.1 dahil) ve 37 çalışma kartı erişilebilir olmalı
        await page.selectOption('#exam-select-scenario', '1');
        await page.click('#btn-scope-continue');
        await expect(page.locator('#exam-view-choice')).toBeVisible();
        await expect(page.locator('.exam-choice-scope-pill')).toContainText('5. Sınıf · 1. Dönem 1. Yazılı · Senaryo 1');
        await expect(page.locator('#choice-study-count')).toContainText('5 konu · 37 bilgi kartı');

        await page.click('#btn-choice-go-study');
        await expect(page.locator('#exam-view-study')).toBeVisible();
        const studyOutcomes = await page.locator('#exam-outcome-select option').evaluateAll(opts => opts.map(o => o.value));
        expect(studyOutcomes).toEqual([
            'FB.5.1.1', 'FB.5.1.2', 'FB.5.1.3', 'FB.5.1.4', 'FB.5.2.1'
        ]);
    });

    test('4. Yanlış/eksik cevap sonrası return_card_ids bağlantıları 5. sınıf konu kartlarına doğru yönlendirir', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');
        await page.selectOption('#exam-select-grade', '5');
        await page.selectOption('#exam-select-scenario', '3'); // S3: 6 soru
        await page.click('#btn-scope-continue');
        await page.click('#btn-choice-go-practice');
        await page.click('#exam-start-practice');

        await expect(page.locator('#practice-active-box')).toBeVisible();
        for (let i = 0; i < 5; i++) {
            await page.click('#btn-practice-next-q');
        }
        await page.click('#btn-practice-finish');
        await expect(page.locator('#exam-view-eval')).toBeVisible();

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

        const firstBtnCardId = returnedCardIds[0];
        await returnButtons.first().click();
        await expect(page.locator('#exam-view-study')).toBeVisible();
        const activeCardId = await page.evaluate(() => {
            const st = window.FenUpExam.getState();
            return window.FenUpExam.getCards()[st.studyCardIdx]?.id;
        });
        expect(activeCardId).toBe(firstBtnCardId);
    });

    test('5. Yönetim Paneli → Yazılı Soru Havuzu sayım ve filtreleme doğrulaması (Tümü: 216, 5. Sınıf: 54, 6. Sınıf: 84, 7. Sınıf: 78)', async ({ page }) => {
        await page.goto('/index.html');

        // Admin panelini #btn-admin-panel üzerinden aç (showModal + refreshAdminQuestionCount tetikler)
        await page.evaluate(() => {
            const btn = document.getElementById('btn-admin-panel');
            if (btn) btn.click();
        });

        const tabBtn = page.locator('#btn-admin-tab-questions');
        await expect(tabBtn).toContainText('Yazılı Soru Havuzu (216 Soru)');

        // Yazılı Soru Havuzu sekmesine tıkla (varsayılan filtre: Tümü)
        await tabBtn.click();
        await expect(page.locator('#admin-panel-questions')).toBeVisible();
        await expect(page.locator('#admin-questions-desc')).toContainText('Toplam havuz: 216 soru');
        await expect(page.locator('#admin-filter-outcome')).toContainText('Tüm Kazanımlar (216 Soru)');
        await expect(page.locator('#admin-question-filter-count')).toHaveText('Filtre sonucu: 216 soru');
        expect(await page.locator('#admin-bank-select option').count()).toBe(216);

        // 5. Sınıf filtresi (54 soru)
        await page.locator('#admin-grade-filters [data-grade="5"]').click();
        await expect(tabBtn).toContainText('Yazılı Soru Havuzu (54 Soru)');
        await expect(page.locator('#admin-questions-desc')).toContainText('Toplam havuz: 54 soru');
        await expect(page.locator('#admin-filter-outcome')).toContainText('Tüm Kazanımlar (54 Soru)');
        await expect(page.locator('#admin-question-filter-count')).toHaveText('Filtre sonucu: 54 soru');
        expect(await page.locator('#admin-bank-select option').count()).toBe(54);

        // 6. Sınıf filtresi (84 soru)
        await page.locator('#admin-grade-filters [data-grade="6"]').click();
        await expect(tabBtn).toContainText('Yazılı Soru Havuzu (84 Soru)');
        await expect(page.locator('#admin-questions-desc')).toContainText('Toplam havuz: 84 soru');
        await expect(page.locator('#admin-filter-outcome')).toContainText('Tüm Kazanımlar (84 Soru)');
        await expect(page.locator('#admin-question-filter-count')).toHaveText('Filtre sonucu: 84 soru');
        expect(await page.locator('#admin-bank-select option').count()).toBe(84);

        // 7. Sınıf filtresi (78 soru)
        await page.locator('#admin-grade-filters [data-grade="7"]').click();
        await expect(tabBtn).toContainText('Yazılı Soru Havuzu (78 Soru)');
        await expect(page.locator('#admin-questions-desc')).toContainText('Toplam havuz: 78 soru');
        await expect(page.locator('#admin-filter-outcome')).toContainText('Tüm Kazanımlar (78 Soru)');
        await expect(page.locator('#admin-question-filter-count')).toHaveText('Filtre sonucu: 78 soru');
        expect(await page.locator('#admin-bank-select option').count()).toBe(78);

        // Tümü filtresine geri dönüş (216 soru)
        await page.locator('#admin-grade-filters [data-grade="all"]').click();
        await expect(tabBtn).toContainText('Yazılı Soru Havuzu (216 Soru)');
        await expect(page.locator('#admin-questions-desc')).toContainText('Toplam havuz: 216 soru');
        await expect(page.locator('#admin-filter-outcome')).toContainText('Tüm Kazanımlar (216 Soru)');
        await expect(page.locator('#admin-question-filter-count')).toHaveText('Filtre sonucu: 216 soru');
        expect(await page.locator('#admin-bank-select option').count()).toBe(216);
    });
});
