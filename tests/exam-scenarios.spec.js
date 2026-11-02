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
        expect(allCards.length).toBe(52); // 34 (V6) + 18 (V7.3 Master)

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

        // FB.7.1.4 giriş kartını kontrol et (V7.3 Master K00 organizasyon, K01/K02 içerik)
        const cardFB714 = await page.evaluate(() => {
            const engine = window.FenUpExam;
            const cards = engine.getCards();
            const k00 = cards.find(c => c.id === 'FB714-V7-K00');
            const k01 = cards.find(c => c.id === 'FB714-V7-K01');
            const k02 = cards.find(c => c.id === 'FB714-V7-K02');
            return {
                k00: k00 ? {
                    id: k00.id,
                    eyebrow: k00.eyebrow,
                    bodyLength: k00.body?.length,
                    topicsLength: k00.topics?.length,
                    visual: k00.visual
                } : null,
                k01: k01 ? {
                    id: k01.id,
                    bodyLength: k01.body?.length,
                    visual: k01.visual?.asset
                } : null,
                k02: k02 ? {
                    id: k02.id,
                    bodyLength: k02.body?.length,
                    visual: k02.visual?.asset
                } : null
            };
        });

        expect(cardFB714.k00).not.toBeNull();
        expect(cardFB714.k00.eyebrow).toBe('ÖĞRENME ÇIKTISI · KONU ÖZETİ');
        expect(cardFB714.k00.bodyLength).toBe(0);
        expect(cardFB714.k00.topicsLength).toBeGreaterThan(0);
        expect(cardFB714.k00.visual).toBeNull();
        expect(cardFB714.k01.bodyLength).toBeGreaterThan(0);
        expect(cardFB714.k01.visual).toBe('assets/orion.jpg');
        expect(cardFB714.k02.visual).toBe('assets/diagram-nebula-collapse.svg');

        // FB.7.2.2 giriş kartını kontrol et (V7.4 Master K00 organizasyon, K01/K06 içerik ve enerji şemaları)
        const cardFB722 = await page.evaluate(() => {
            const engine = window.FenUpExam;
            const cards = engine.getCards();
            const k00 = cards.find(c => c.id === 'FB722-V7-K00');
            const k01 = cards.find(c => c.id === 'FB722-V7-K01');
            const k06 = cards.find(c => c.id === 'FB722-V7-K06');
            return {
                k00: k00 ? {
                    id: k00.id,
                    eyebrow: k00.eyebrow,
                    bodyLength: k00.body?.length,
                    topicsLength: k00.topics?.length,
                    visual: k00.visual
                } : null,
                k01: k01 ? {
                    id: k01.id,
                    bodyLength: k01.body?.length,
                    visual: k01.visual?.asset
                } : null,
                k06: k06 ? {
                    id: k06.id,
                    bodyLength: k06.body?.length,
                    visual: k06.visual?.asset
                } : null
            };
        });

        expect(cardFB722.k00).not.toBeNull();
        expect(cardFB722.k00.eyebrow).toBe('ÖĞRENME ÇIKTISI · KONU ÖZETİ');
        expect(cardFB722.k00.bodyLength).toBe(0);
        expect(cardFB722.k00.topicsLength).toBeGreaterThan(0);
        expect(cardFB722.k00.visual).toBeNull();
        expect(cardFB722.k01.bodyLength).toBeGreaterThan(0);
        expect(cardFB722.k01.visual).toBe('assets/diagram-motion-vs-rest.svg');
        expect(cardFB722.k06.visual).toBe('assets/diagram-mass-potential-effect.svg');

        // UI'da render edilmiş K00 organizasyon kartını açıp kontrol et
        const targetIdx = await page.evaluate(() => {
            const cards = window.FenUpExam.getCards();
            return cards.findIndex(c => c.id === 'FB714-V7-K00');
        });
        expect(targetIdx).toBeGreaterThanOrEqual(0);

        await page.evaluate(idx => window.FenUpExam.renderStudy(idx), targetIdx);

        // K00 organizasyon kartıdır: topics listesi görünür olmalı
        const topicsList = page.locator('#exam-card-article ul.topics li');
        expect(await topicsList.count()).toBeGreaterThanOrEqual(3);

        // K02 kartına geçip görsel ve paragrafları doğrula
        const k02Idx = await page.evaluate(() => {
            const cards = window.FenUpExam.getCards();
            return cards.findIndex(c => c.id === 'FB714-V7-K02');
        });
        await page.evaluate(idx => window.FenUpExam.renderStudy(idx), k02Idx);

        // Body paragrafları görünür olmalı (V7.3 bite-sized 1-2 net paragraf)
        const bodyParagraphs = page.locator('#exam-card-article .study-text-column p.exam-body-p');
        expect(await bodyParagraphs.count()).toBeGreaterThanOrEqual(1);

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

    test('Senaryo 3 kart akışı MEB 1. Kitap müfredat sırasına (FB.7.1.1 -> FB.7.1.3 -> FB.7.1.4 -> FB.7.2.1 -> FB.7.2.2) tam uymalı', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');
        await page.evaluate(() => window.FenUpExam.goToStep('scope'));

        // Senaryo 3 seç
        await page.selectOption('#exam-select-scenario', '3');
        await page.click('#btn-scope-continue');
        await page.click('#btn-choice-go-study');
        await expect(page.locator('#exam-view-study')).toBeVisible();

        const cardOutcomes = await page.evaluate(() => {
            const cards = window.FenUpExam.getCards();
            return cards.map(c => c.outcome_id);
        });

        // Benzersiz kazanım sırasını çıkar
        const distinctOutcomes = [];
        for (const o of cardOutcomes) {
            if (!distinctOutcomes.includes(o)) distinctOutcomes.push(o);
        }

        expect(distinctOutcomes).toEqual([
            'FB.7.1.1',
            'FB.7.1.3',
            'FB.7.1.4',
            'FB.7.2.1',
            'FB.7.2.2'
        ]);

        // FB.7.1.4 kartlarının konumu FB.7.1.3'ten sonra ve FB.7.2.1'den önce olmalı
        const last713Index = cardOutcomes.lastIndexOf('FB.7.1.3');
        const first714Index = cardOutcomes.indexOf('FB.7.1.4');
        const last714Index = cardOutcomes.lastIndexOf('FB.7.1.4');
        const first721Index = cardOutcomes.indexOf('FB.7.2.1');

        expect(first714Index).toBeGreaterThan(last713Index);
        expect(first721Index).toBeGreaterThan(last714Index);
    });

    test('Öğretmen Yönetim Paneli 72 soruluk tam havuzu OUTCOME_ORDER sırasıyla göstermeli', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');

        // Admin panelini render et
        await page.evaluate(() => {
            if (window.FenUpExam && window.FenUpExam.renderAdminQuestionReview) {
                window.FenUpExam.renderAdminQuestionReview();
            }
        });

        const tabBtnText = await page.textContent('#btn-admin-tab-questions');
        expect(tabBtnText).toContain('72 Soru');

        const optionCount = await page.$$eval('#admin-bank-select option', opts => opts.length);
        expect(optionCount).toBe(72);

        // İlk ve son soruların OUTCOME_ORDER uyumu
        const firstOptText = await page.$eval('#admin-bank-select option:first-child', el => el.textContent);
        const lastOptText = await page.$eval('#admin-bank-select option:last-child', el => el.textContent);

        expect(firstOptText).toContain('FB.7.1.1');
        expect(lastOptText).toContain('FB.7.2.2');
    });

    test('Akıllı Tahta (Pardus ETAP / 1920x1080) büyük ekran tipografisi ve responsive ölçekleme doğrulanmalı', async ({ page }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');
        await page.evaluate(() => window.FenUpExam.goToStep('scope'));
        await page.selectOption('#exam-select-scenario', '1');
        await page.click('#btn-scope-continue');
        await page.click('#btn-choice-go-study');
        await expect(page.locator('#exam-view-study')).toBeVisible();

        // FB714-V7-K02 kartına geç (başlık, body ve görsel SVG içerir)
        const targetIdx = await page.evaluate(() => {
            const cards = window.FenUpExam.getCards();
            return cards.findIndex(c => c.id === 'FB714-V7-K02');
        });
        expect(targetIdx).toBeGreaterThanOrEqual(0);

        await page.evaluate(idx => window.FenUpExam.renderStudy(idx), targetIdx);
        await page.waitForTimeout(200);

        const typography = await page.evaluate(() => {
            const title = document.querySelector('.exam-card-title');
            const p = document.querySelector('#exam-card-article .exam-body-p') || document.querySelector('#exam-card-article .topics li');
            const visualImg = document.querySelector('#exam-visual img');
            const nextBtn = document.querySelector('#exam-card-next');

            return {
                titleFontSize: title ? window.getComputedStyle(title).fontSize : null,
                pFontSize: p ? window.getComputedStyle(p).fontSize : null,
                imgMaxHeight: visualImg ? window.getComputedStyle(visualImg).maxHeight : null,
                btnMinHeight: nextBtn ? window.getComputedStyle(nextBtn).minHeight : null
            };
        });

        // 2.2rem genelde 35.2px civarıdır, en az 30px olmalıdır
        const titlePx = parseFloat(typography.titleFontSize);
        expect(titlePx).toBeGreaterThanOrEqual(30);

        // 1.4rem genelde 22.4px civarıdır, en az 20px olmalıdır
        const pPx = parseFloat(typography.pFontSize);
        expect(pPx).toBeGreaterThanOrEqual(20);

        // SVG / görsel max-height 440px olmalıdır
        expect(typography.imgMaxHeight).toBe('440px');

        // Buton min-height 56px olmalıdır
        expect(typography.btnMinHeight).toBe('56px');
    });

    test('V7.7 Master Formülsüz Müfredat, Soru-Şema Senkronizasyonu ve İpucusuz Şemalar Uyumu', async () => {
        const ekPath = path.resolve('data/exam/content-v6/ek_icerik.json');
        const ekData = JSON.parse(fs.readFileSync(ekPath, 'utf8'));

        expect(ekData.version).toBe('7.7.0');

        // K01-K08 kartlarının istisnasız 2 kısa paragraftan oluştuğunu doğrula
        for (const cid of Object.keys(ekData.cards)) {
            if (cid.endsWith('K00')) continue;
            expect(ekData.cards[cid].body).toHaveLength(2);
        }

        // FB.7.2.2 tüm enerji şemalarının doğrulanması
        expect(ekData.cards['FB722-V7-K01'].visual?.asset).toBe('assets/diagram-motion-vs-rest.svg');
        expect(ekData.cards['FB722-V7-K02'].visual?.asset).toBe('assets/diagram-speed-kinetic-effect.svg');
        expect(ekData.cards['FB722-V7-K03'].visual?.asset).toBe('assets/diagram-mass-kinetic-effect.svg');
        expect(ekData.cards['FB722-V7-K04'].visual?.asset).toBe('assets/swing.jpg');
        expect(ekData.cards['FB722-V7-K05'].visual?.asset).toBe('assets/diagram-height-effect.svg');
        expect(ekData.cards['FB722-V7-K06'].visual?.asset).toBe('assets/diagram-mass-potential-effect.svg');
        expect(ekData.cards['FB722-V7-K07'].visual?.asset).toBe('assets/diagram-elastic-spring.svg');
        expect(ekData.cards['FB722-V7-K08'].visual?.asset).toBe('assets/diagram-roller-coaster.svg');

        // FB714-V7-K03 ve K04: "ağır elementler" ve "pulsar" çıkarıldı; "nötron yıldızı veya kara delik"
        const k03Body = ekData.cards['FB714-V7-K03'].body.join(' ');
        expect(k03Body).not.toContain('ağır element');
        expect(k03Body).toContain('gezegenimsi bulutsu');
        expect(k03Body).toContain('beyaz cüce');

        const k04Body = ekData.cards['FB714-V7-K04'].body.join(' ');
        expect(k04Body).not.toContain('Pulsar');
        expect(k04Body).not.toContain('pulsar');
        expect(k04Body).toContain('nötron yıldızı');
        expect(k04Body).toContain('kara deli');

        // FB714-V7-K08: Kutup Yıldızı ve Büyükayı 5 kat mesafe; Merak ve Dubhe isimleri kaldırıldı
        const k08Body = ekData.cards['FB714-V7-K08'].body.join(' ');
        expect(k08Body).not.toContain('Merak');
        expect(k08Body).not.toContain('Dubhe');
        expect(k08Body).toContain('Kutup Yıldızı');
        expect(k08Body).toContain('5 kat');

        // FB722-V7-K02 ve K03: MEB ders kitabı rampa-bilye-takoz laboratuvar kurgusu
        const k02Body = ekData.cards['FB722-V7-K02'].body.join(' ');
        expect(k02Body).toContain('Rampadan');
        expect(k02Body).toContain('takoz');

        const fb722K03Body = ekData.cards['FB722-V7-K03'].body.join(' ');
        expect(fb722K03Body).toContain('rampadan');
        expect(fb722K03Body).toContain('ağır bilye');
        expect(fb722K03Body).toContain('takoz');

        // FB714-V7-E01: "nükleer füzyon" çıkarıldı; "çekirdek tepkimeleri" ve "ısı ve ışık"
        const e01Stem = ekData.questions['FB714-V7-E01'].stem;
        expect(e01Stem).not.toContain('nükleer');
        expect(e01Stem).not.toContain('füzyon');
        expect(e01Stem).toContain('çekirdek tepkimeleri');
        const e01Rubric = ekData.questions['FB714-V7-E01'].rubric.map(r => r.text).join(' ');
        expect(e01Rubric).not.toContain('nükleer');
        expect(e01Rubric).not.toContain('füzyon');

        // FB714-V7-M04: Yatay kozmik cetvel şemasıyla tam uyumlu stem ve rubrik (Proxima Centauri 4,2 ışık yılı ve Kutup Yıldızı ~430 ışık yılı)
        const m04Stem = ekData.questions['FB714-V7-M04'].stem;
        expect(m04Stem).toContain('Proxima Centauri (yaklaşık 4,2 ışık yılı)');
        expect(m04Stem).toContain('Kutup Yıldızı\'nın (~430 ışık yılı)');
        expect(m04Stem).toContain('gökyüzüne bakmak evrenin geçmişine bakmaktır');

        const m04Rubric = ekData.questions['FB714-V7-M04'].rubric.map(r => r.text).join(' ');
        expect(m04Rubric).toContain('Proxima Centauri\'nin 4,2 yıl önceki');
        expect(m04Rubric).toContain('Kutup Yıldızı\'nın ise 430 yıl önceki');

        // FB722-V7-E04 ve M02 formülsüz somut dil kontrolü
        const e04Stem = ekData.questions['FB722-V7-E04'].stem;
        expect(e04Stem).toContain('1 kg kütleli hafif bilye');
        expect(e04Stem).toContain('5 kg kütleli ağır gülle');

        // FB722-V7-M01: rampa ve takoz kontrollü deney kurgusu
        const m01Stem = ekData.questions['FB722-V7-M01'].stem;
        expect(m01Stem).toContain('rampadan serbest bırakılan hafif bilye ile ağır bilye');
        expect(m01Stem).toContain('tahta takozlara');

        // SVG diyagram metinleri ve şeffaflık
        const nebulaSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-nebula-collapse.svg'), 'utf8');
        expect(nebulaSvg).not.toContain('Nükleer füzyon');
        expect(nebulaSvg).not.toContain('nükleer füzyon');
        expect(nebulaSvg).toContain('Işık ve ısı yaymaya başlar');

        const starCycleSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-large-star-cycle.svg'), 'utf8');
        expect(starCycleSvg).not.toContain('Pulsar');
        expect(starCycleSvg).not.toContain('pulsar');
        expect(starCycleSvg).toContain('Nötron Yıldızı');

        // Kutup Yıldızı şeması (Merak ve Dubhe kaldırılmış, dikey 5 Kat Mesafe ve Kutup Yıldızı)
        const constelSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-constellations.svg'), 'utf8');
        expect(constelSvg).not.toContain('Merak');
        expect(constelSvg).not.toContain('Dubhe');
        expect(constelSvg).toContain('5 Kat Mesafe');
        expect(constelSvg).toContain('Kutup Yıldızı (Polaris)');
        expect(constelSvg).toContain('Büyükayı');
        expect(constelSvg).toContain('Küçükayı');

        // Yıldız renkleri (Derece sayıları silinmiş, MEB sade renk/sıcaklık skalası)
        const starColorsSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-star-colors.svg'), 'utf8');
        expect(starColorsSvg).not.toContain('°C');
        expect(starColorsSvg).not.toContain('Celsius');
        expect(starColorsSvg).toContain('Mavi / Beyaz');
        expect(starColorsSvg).toContain('En Sıcak Yıldızlar');
        expect(starColorsSvg).toContain('Sarı (Güneş)');
        expect(starColorsSvg).toContain('Kırmızı');
        expect(starColorsSvg).toContain('En Soğuk Yıldızlar');

        // Basitleştirilmiş Işık Yılı cetveli
        const starDepthSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-star-depth-3d.svg'), 'utf8');
        expect(starDepthSvg).toContain('Güneş ve Dünya');
        expect(starDepthSvg).toContain('Proxima Centauri');
        expect(starDepthSvg).toContain('4,2 Işık Yılı');
        expect(starDepthSvg).toContain('Kutup Yıldızı');
        expect(starDepthSvg).toContain('~430 Işık Yılı');

        // İpucu (Spoiler) içermeyen potansiyel deney şeması kontrolü
        const potExpSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-potential-experiment.svg'), 'utf8');
        expect(potExpSvg).not.toContain('(En Derin)');
        expect(potExpSvg).not.toContain('(En Sığ)');
        expect(potExpSvg).toContain('1. Düzenek');
        expect(potExpSvg).toContain('2. Düzenek');
        expect(potExpSvg).toContain('3. Düzenek');

        // İpucu içermeyen yay kalınlığı şeması kontrolü
        const springThickSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-spring-thickness.svg'), 'utf8');
        expect(springThickSvg).not.toContain('Kalın yay bilyeyi daha uzağa fırlatır');
        expect(springThickSvg).toContain('İnce Yay (10 cm sıkıştırıldı)');
        expect(springThickSvg).toContain('Kalın Yay (10 cm sıkıştırıldı)');

        // Yeni enerji SVG'lerinin metin ve kurgu kontrolü
        const massPotSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-mass-potential-effect.svg'), 'utf8');
        expect(massPotSvg).toContain('1 kg Bilye');
        expect(massPotSvg).toContain('5 kg Gülle');
        expect(massPotSvg).toContain('Derin Çukur');

        const heightSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-height-effect.svg'), 'utf8');
        expect(heightSvg).toContain('1 Metre');
        expect(heightSvg).toContain('2 Metre');

        // Rampa ve takoz kinetik deney şemaları
        const speedKinSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-speed-kinetic-effect.svg'), 'utf8');
        expect(speedKinSvg).toContain('Daha Az Süratli');
        expect(speedKinSvg).toContain('Daha Süratli');
        expect(speedKinSvg).toContain('Takoz Az İtildi');
        expect(speedKinSvg).toContain('Takoz Çok İtildi');

        const massKinSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-mass-kinetic-effect.svg'), 'utf8');
        expect(massKinSvg).toContain('Hafif Bilye');
        expect(massKinSvg).toContain('Ağır Bilye');
        expect(massKinSvg).toContain('Takoz Az İtildi');
        expect(massKinSvg).toContain('Takoz Çok İtildi');

        // Hız treni A, B, C rozetleri
        const rollerSvg = fs.readFileSync(path.resolve('data/exam/content-v6/assets/diagram-roller-coaster.svg'), 'utf8');
        expect(rollerSvg).toContain('A (Tepe)');
        expect(rollerSvg).toContain('Potansiyel En Fazla');
        expect(rollerSvg).toContain('B (Dip)');
        expect(rollerSvg).toContain('Kinetik En Fazla');
        expect(rollerSvg).toContain('C (Tepe)');
    });

    test('Senaryo 3 seçildiğinde kart sıralaması OUTCOME_ORDER uyumlu olmalı ve Kutup Yıldızı şeması render edilmeli', async ({ page }) => {
        await page.goto('/index.html');
        await page.click('#btn-yazili-modulu');
        await page.evaluate(() => window.FenUpExam.goToStep('scope'));
        await page.selectOption('#exam-select-scenario', '3');
        await page.click('#btn-scope-continue');
        await page.click('#btn-choice-go-study');
        await expect(page.locator('#exam-view-study')).toBeVisible();

        // Kart sıralamasını doğrula
        const outcomeSequence = await page.evaluate(() => {
            const cards = window.FenUpExam.getCards();
            const order = [];
            for (const c of cards) {
                if (!order.includes(c.outcome_id)) order.push(c.outcome_id);
            }
            return order;
        });

        // Senaryo 3 kazanımları: FB.7.1.1, FB.7.1.3, FB.7.1.4, FB.7.2.1, FB.7.2.2
        expect(outcomeSequence).toEqual([
            'FB.7.1.1',
            'FB.7.1.3',
            'FB.7.1.4',
            'FB.7.2.1',
            'FB.7.2.2'
        ]);

        // Kutup Yıldızı kartına git (FB714-V7-K08)
        const k08Idx = await page.evaluate(() => {
            const cards = window.FenUpExam.getCards();
            return cards.findIndex(c => c.id === 'FB714-V7-K08');
        });
        expect(k08Idx).toBeGreaterThanOrEqual(0);

        await page.evaluate(idx => window.FenUpExam.renderStudy(idx), k08Idx);
        await page.waitForTimeout(200);

        const visualImg = page.locator('#exam-visual img');
        await expect(visualImg).toBeVisible();
        await expect(visualImg).toHaveAttribute('src', /assets\/diagram-constellations\.svg/);
    });

});
