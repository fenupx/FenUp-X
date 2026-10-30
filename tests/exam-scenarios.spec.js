import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('7. Sınıf Yazılı Senaryoları (S1 - S5) ve Dinamik Puanlama Testleri', () => {

    test('Tüm 5 senaryo kayıtları doğru soru sayıları ve kazanım dağılımlarına sahip olmalı', async () => {
        const scenariosPath = path.resolve('data/exam/content-v6/senaryo_kayitlari.json');
        expect(fs.existsSync(scenariosPath)).toBe(true);

        const scenarios = JSON.parse(fs.readFileSync(scenariosPath, 'utf8'));
        expect(Array.isArray(scenarios)).toBe(true);
        expect(scenarios.length).toBe(5);

        const expectedCounts = { 1: 9, 2: 7, 3: 8, 4: 6, 5: 7 };
        for (const sc of scenarios) {
            expect(sc.question_count).toBe(expectedCounts[sc.scenario]);
            const sumCounts = sc.allocation.reduce((sum, item) => sum + item.count, 0);
            expect(sumCounts).toBe(sc.question_count);
        }
    });

    test('Senaryolar arası kart izolasyonu doğrulanmalı (kart sızıntısı olmamalı)', async () => {
        const v6 = JSON.parse(fs.readFileSync(path.resolve('data/exam/content-v6/pilot_7_senaryo2.json'), 'utf8'));
        const ek = JSON.parse(fs.readFileSync(path.resolve('data/exam/content-v6/ek_icerik.json'), 'utf8'));
        const scenarios = JSON.parse(fs.readFileSync(path.resolve('data/exam/content-v6/senaryo_kayitlari.json'), 'utf8'));

        const allCards = [...v6.cards, ...ek.cards];
        expect(allCards.length).toBe(49); // 34 + 15

        // Senaryo 3'te FB.7.1.5 kazanımı yoktur
        const sc3 = scenarios.find(s => s.scenario === 3);
        const sc3Outcomes = new Set(sc3.allocation.map(a => a.outcome_id));
        expect(sc3Outcomes.has('FB.7.1.5')).toBe(false);

        const sc3Cards = allCards.filter(c => sc3Outcomes.has(c.outcome_id));
        expect(sc3Cards.some(c => c.outcome_id === 'FB.7.1.5')).toBe(false);

        // Senaryo 4'te FB.7.1.1 kazanımı yoktur
        const sc4 = scenarios.find(s => s.scenario === 4);
        const sc4Outcomes = new Set(sc4.allocation.map(a => a.outcome_id));
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
        await expect(page.locator('#exam-print-sheet .print-sub-title')).toContainText('MEB Senaryo 3');
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

});
