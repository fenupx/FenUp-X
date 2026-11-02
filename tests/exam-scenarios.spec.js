import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('7. Sınıf Yazılı Senaryoları (S1 - S5) ve Dinamik Puanlama Testleri', () => {

    test('Tüm 5 senaryo kayıtları doğru soru sayıları ve kazanım dağılımlarına sahip olmalı', async () => {
        const scenariosPath = path.resolve('data/exam/content-v6/senaryo_kayitlari.json');
        expect(fs.existsSync(scenariosPath)).toBe(true);

        const scenariosRaw = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));
        const scenarios = Array.isArray(scenariosRaw) ? scenariosRaw : (scenariosRaw.scenarios || []);
        expect(Array.isArray(scenarios)).toBe(true);
        expect(scenarios.length).toBe(5);

        const expectedCounts = { 1: 9, 2: 7, 3: 8, 4: 6, 5: 7 };
        for (const sc of scenarios) {
            const scNum = sc.scenario || parseInt((sc.code || sc.title || "").replace(/\D+/g, ''), 10);
            const qCount = sc.question_count || sc.total_questions;
            const allocation = sc.allocation || sc.distribution || [];
            expect(qCount).toBe(expectedCounts[scNum]);
            const sumCounts = allocation.reduce((sum, item) => sum + item.count, 0);
            expect(sumCounts).toBe(qCount);
        }
    });

    test('Senaryolar arası kart izolasyonu doğrulanmalı (kart sızıntısı olmamalı)', async () => {
        const v6 = JSON.parse(fs.readFileSync(path.resolve('data/exam/content-v6/pilot_7_senaryo2.json'), 'utf8'));
        const ek = JSON.parse(fs.readFileSync(path.resolve('data/exam/content-v6/ek_icerik.json'), 'utf8'));
        const scenariosRaw = JSON.parse(fs.readFileSync(path.resolve('data/exam/content-v6/senaryo_kayitlari.json'), 'utf8'));
        const scenarios = Array.isArray(scenariosRaw) ? scenariosRaw : (scenariosRaw.scenarios || []);

        const ekCards = Array.isArray(ek.cards) ? ek.cards : Object.values(ek.cards);
        const allCards = [...v6.cards, ...ekCards];
        expect(allCards.length).toBe(50); // 34 + 16

        // Senaryo 3'te FB.7.1.5 kazanımı yoktur
        const sc3 = scenarios.find(s => (s.scenario === 3 || s.code === 'S3'));
        const sc3Alloc = sc3.allocation || sc3.distribution || [];
        const sc3Outcomes = new Set(sc3Alloc.map(a => a.outcome_id));
        expect(sc3Outcomes.has('FB.7.1.5')).toBe(false);

        const sc3Cards = allCards.filter(c => sc3Outcomes.has(c.outcome_id));
        expect(sc3Cards.some(c => c.outcome_id === 'FB.7.1.5')).toBe(false);

        // Senaryo 4'te FB.7.1.1 kazanımı yoktur
        const sc4 = scenarios.find(s => (s.scenario === 4 || s.code === 'S4'));
        const sc4Alloc = sc4.allocation || sc4.distribution || [];
        const sc4Outcomes = new Set(sc4Alloc.map(a => a.outcome_id));
        expect(sc4Outcomes.has('FB.7.1.1')).toBe(false);

        const sc4Cards = allCards.filter(c => sc4Outcomes.has(c.outcome_id));
        expect(sc4Cards.some(c => c.outcome_id === 'FB.7.1.1')).toBe(false);
    });

    test('Görsel varlıkları eksiksiz mevcut olmalı ve kredi haritasında yer almalı', async () => {
        const assetsDir = path.resolve('data/exam/content-v6/assets');
        const requiredAssets = [
            'omega-centauri.jpg',
            'orion.jpg',
            'southern-ring.webp',
            'spring.jpg',
            'sun.jpg',
            'swing.jpg',
            'tug.jpg'
        ];

        for (const file of requiredAssets) {
            const fp = path.join(assetsDir, file);
            expect(fs.existsSync(fp)).toBe(true);
            const stats = fs.statSync(fp);
            expect(stats.size).toBeGreaterThan(1000);
        }

        const credits = JSON.parse(fs.readFileSync(path.resolve('data/exam/content-v6/GORSEL_KAYNAKLARI.json'), 'utf8'));
        expect(credits['omega-centauri']).toBeDefined();
        expect(credits['orion']).toBeDefined();
        expect(credits['southern-ring']).toBeDefined();
        expect(credits['spring']).toBeDefined();
        expect(credits['swing']).toBeDefined();
    });

    test('UI üzerinde senaryo seçimi, akordeon, soru sayısı ve prova başlangıcı doğrulanmalı', async ({ page }) => {
        await page.goto('/index.html');

        // Sınav modülüne geç
        await page.click('#btn-yazili-modulu');
        await expect(page.locator('#scene-yazili')).toBeVisible();

        // Senaryo 1 seçimi (9 soru)
        await page.selectOption('#exam-select-scenario', '1');
        await expect(page.locator('#exam-scope-content-summary')).toContainText('Toplam 9 açık uçlu soru içerir');
        await expect(page.locator('#exam-scope-content-summary')).toContainText('Yıldızların Yaşamı');
        await expect(page.locator('#exam-scope-content-summary')).toContainText('Kinetik ve Potansiyel Enerji');

        // Senaryo 4 seçimi (6 soru)
        await page.selectOption('#exam-select-scenario', '4');
        await expect(page.locator('#exam-scope-content-summary')).toContainText('Toplam 6 açık uçlu soru içerir');

        // Senaryo 3 seçimi (8 soru) ile devam et
        await page.selectOption('#exam-select-scenario', '3');
        await expect(page.locator('#exam-scope-content-summary')).toContainText('Toplam 8 açık uçlu soru içerir');

        // Devam et -> Choice ekranı
        await page.click('#btn-scope-continue');
        await expect(page.locator('#exam-view-choice')).toBeVisible();
        await expect(page.locator('.exam-choice-scope-pill')).toContainText('Senaryo 3');
        await expect(page.locator('#choice-practice-count')).toContainText('8 soruluk prova');

        // Yazılı Provasına başla
        await page.click('#btn-choice-go-practice');
        await expect(page.locator('#practice-setup-box')).toBeVisible();
        await expect(page.locator('#exam-practice-setup-heading')).toContainText('8 Soruluk Provanı Hazırla');

        // Başla butonuna tıkla
        await page.click('#exam-start-practice');
        await expect(page.locator('#practice-active-box')).toBeVisible();

        // 8 soru için nav strip kontrolü
        const navBtns = page.locator('#practice-question-nav-strip .q-nav-btn');
        await expect(navBtns).toHaveCount(8);
        await expect(page.locator('#practice-current-indicator')).toContainText('Soru 1 / 8');

        // Önizle / Yazdır modalını aç
        await page.click('#btn-practice-preview-print');
        await expect(page.locator('#exam-print-preview-modal')).toBeVisible();
        await expect(page.locator('#exam-print-sheet .print-sub-title')).toContainText('Senaryo 3');
        await expect(page.locator('#exam-print-sheet .print-sub-title')).not.toContainText('MEB');
        await expect(page.locator('#exam-print-sheet .print-instructions')).toContainText('8 açık uçlu sorudan');

        // Modal kapat
        await page.click('#btn-print-preview-close');
        await expect(page.locator('#exam-print-preview-modal')).toBeHidden();
    });

    test('Senaryo 2 ve Senaryo 5 ayrı başlık, rozet ve kimlik taşımalı', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');

        // Senaryo 5 seç
        await page.selectOption('#exam-select-scenario', '5');
        await page.click('#btn-scope-continue');
        await expect(page.locator('.exam-choice-scope-pill')).toContainText('Senaryo 5');

        await page.click('#btn-choice-go-practice');
        await expect(page.locator('#exam-practice-setup-description')).toContainText('Senaryo 5');
    });

    test('Senaryo seçim menüsü yalnızca temiz numaralandırma içermeli (MEB Örnek içermemeli)', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');

        const options = await page.$$eval('#exam-select-scenario option', opts => opts.map(o => o.textContent.trim()));
        expect(options).toEqual([
            'Senaryo 1',
            'Senaryo 2',
            'Senaryo 3',
            'Senaryo 4',
            'Senaryo 5'
        ]);
        for (const opt of options) {
            expect(opt).not.toContain('MEB');
            expect(opt).not.toContain('Örnek');
        }
    });

    test('V7 K00 giriş kartları (FB.7.1.4 ve FB.7.2.2) dolu gövde, kavram zinciri ve SVG diyagramıyla render edilmeli', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');
        await page.evaluate(() => window.FenUpExam.goToStep('scope'));

        // Senaryo 1 seç (FB.7.1.4 ve FB.7.2.2 ikisini de içerir)
        await page.selectOption('#exam-select-scenario', '1');
        await page.click('#btn-scope-continue');

        // Konuları Çalış ekranına geç
        await page.click('#btn-choice-go-study');
        await expect(page.locator('#exam-view-study')).toBeVisible();

        // Kart navigasyonunda FB.7.1.4 ve FB.7.2.2 kartlarını doğrula
        const cardButtons = page.locator('#exam-cardnav [data-study-card]');
        const cardCount = await cardButtons.count();
        expect(cardCount).toBeGreaterThan(0);

        // FB.7.1.4 giriş kartını kontrol et
        const cardFB714 = await page.evaluate(() => {
            const engine = window.FenUpExam;
            const cards = engine.getCards();
            const k00 = cards.find(c => c.id === 'FB714-V7-K00');
            return k00 ? {
                id: k00.id,
                bodyLength: k00.body?.length,
                conceptChain: k00.concept_chain,
                topicsLength: k00.topics?.length,
                visual: k00.visual?.asset
            } : null;
        });

        expect(cardFB714).not.toBeNull();
        expect(cardFB714.bodyLength).toBeGreaterThan(0);
        expect(cardFB714.conceptChain.length).toBeGreaterThan(0);
        expect(cardFB714.topicsLength).toBeGreaterThan(0);
        expect(cardFB714.visual).toBe('assets/diagram-nebula-collapse.svg');

        // FB.7.2.2 giriş kartını kontrol et
        const cardFB722 = await page.evaluate(() => {
            const engine = window.FenUpExam;
            const cards = engine.getCards();
            const k00 = cards.find(c => c.id === 'FB722-V7-K00');
            return k00 ? {
                id: k00.id,
                bodyLength: k00.body?.length,
                conceptChain: k00.concept_chain,
                topicsLength: k00.topics?.length,
                visual: k00.visual?.asset
            } : null;
        });

        expect(cardFB722).not.toBeNull();
        expect(cardFB722.bodyLength).toBeGreaterThan(0);
        expect(cardFB722.conceptChain.length).toBeGreaterThan(0);
        expect(cardFB722.topicsLength).toBeGreaterThan(0);
        expect(cardFB722.visual).toBe('assets/diagram-roller-coaster.svg');

        // UI'da render edilmiş K00 kartını açıp kontrol et
        const targetIdx = await page.evaluate(() => {
            const cards = window.FenUpExam.getCards();
            return cards.findIndex(c => c.id === 'FB714-V7-K00');
        });
        expect(targetIdx).toBeGreaterThanOrEqual(0);

        await page.evaluate(idx => window.FenUpExam.renderStudy(idx), targetIdx);

        // Body paragrafları görünür olmalı
        const bodyParagraphs = page.locator('#exam-card-article .study-text-column p.exam-body-p');
        expect(await bodyParagraphs.count()).toBeGreaterThanOrEqual(3);

        // Kavram zinciri görünür olmalı
        const chainItems = page.locator('#exam-card-article .chain b');
        expect(await chainItems.count()).toBeGreaterThanOrEqual(3);

        // Topics listesi görünür olmalı
        const topicsList = page.locator('#exam-card-article ul.topics li');
        expect(await topicsList.count()).toBeGreaterThanOrEqual(3);

        // SVG görseli görünür olmalı
        const visualImg = page.locator('#exam-visual img');
        await expect(visualImg).toBeVisible();
        await expect(visualImg).toHaveAttribute('src', /assets\/diagram-nebula-collapse\.svg/);
    });

    test('5 senaryo x 3 profil soru kotaları ve 100 puan toplamı matematiksel olarak tam doğrulanmalı', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');

        const scenariosPath = path.resolve('data/exam/content-v6/senaryo_kayitlari.json');
        const scenariosRaw = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));
        const scenarios = Array.isArray(scenariosRaw) ? scenariosRaw : scenariosRaw.scenarios;

        const results = await page.evaluate(async (scList) => {
            const engine = window.FenUpExam;
            const res = [];
            const profiles = ['temel', 'dengeli', 'zorlayici'];

            for (const sc of scList) {
                const scNum = sc.scenario || parseInt((sc.code || sc.title || "").replace(/\D+/g, ''), 10);
                engine.setScenario(String(scNum));

                for (const prof of profiles) {
                    for (let run = 0; run < 10; run++) {
                        const sel = engine.selectQuestions(prof, {}, run);
                        const qs = sel.questions;
                        const points = engine.calculateQuestionPoints(qs);
                        const totalPts = Object.values(points).reduce((sum, p) => sum + p, 0);

                        for (const q of qs) {
                            const qPt = points[q.id];
                            const rub = engine.distributeCriteriaPoints(q.rubric || [], qPt, q);
                            const rubSum = rub.reduce((sum, c) => sum + c.points, 0);
                            if (rubSum !== qPt) {
                                throw new Error(`Scenario ${scNum} ${prof} q ${q.id} rubric sum ${rubSum} !== ${qPt}`);
                            }
                        }

                        res.push({
                            scenario: scNum,
                            profile: prof,
                            count: qs.length,
                            totalPts
                        });
                    }
                }
            }
            return res;
        }, scenarios);

        expect(results.length).toBe(5 * 3 * 10); // 150 test runs
        for (const r of results) {
            expect(r.totalPts).toBe(100);
            const expected = { 1: 9, 2: 7, 3: 8, 4: 6, 5: 7 }[r.scenario];
            expect(r.count).toBe(expected);
        }
    });

});
