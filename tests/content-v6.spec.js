import { test, expect } from '@playwright/test';

test.setTimeout(180000);

const openChoice = async (page) => {
    await page.addInitScript(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
    await page.goto('/');
    await page.locator('#btn-yazili-modulu').click();
    await page.locator('#btn-scope-continue').click();
};

test('V6 Veri Modeli ve 900+ Soru Seçimi Denetimi', async ({ page }) => {
    await openChoice(page);
    const data = await (await page.request.get('/data/exam/content-v6/pilot_7_senaryo2.json')).json();
    expect(data.cards).toHaveLength(34);
    expect(data.questions).toHaveLength(48);

    const cards = new Set(data.cards.map(c => c.id));
    expect(cards.size).toBe(34);

    // Her öğrenme çıktısında 12 soru: 6 kolay, 4 orta, 2 zor
    for (const o of data.outcomes) {
        for (const [diff, n] of [['easy', 6], ['medium', 4], ['hard', 2]]) {
            const matched = data.questions.filter(q => q.outcome_id === o.id && q.difficulty === diff);
            expect(matched).toHaveLength(n);
        }
    }

    // Toplam 139 analitik ölçüt ve dönüş kartları doğrulaması
    let totalCriteria = 0;
    for (const q of data.questions) {
        totalCriteria += q.rubric.length;
        for (const r of q.rubric) {
            for (const id of r.return_card_ids) {
                expect(cards.has(id)).toBe(true);
            }
        }
    }
    expect(totalCriteria).toBe(139);

    // 900 gerçek seçim, kotalar, aile çakışması, yasak çiftler ve 100 puan toplamı
    const result = await page.evaluate(async () => {
        const engine = window.FenUpExam;
        const data = await (await fetch('data/exam/content-v6/pilot_7_senaryo2.json')).json();
        let count = 0;
        for (const profile of ['temel', 'dengeli', 'zorlayici']) {
            for (let run = 0; run < 300; run++) {
                const set = engine.selectQuestions(profile, {}, run).questions;
                if (set.length !== 7) throw new Error('set length !== 7');
                if (new Set(set.map(q => q.family_id)).size !== 7) throw new Error('duplicate family_id');

                const points = engine.calculateQuestionPoints(set);
                if (Object.values(points).reduce((a, b) => a + b, 0) !== 100) throw new Error('total points !== 100');

                for (const q of set) {
                    const p = points[q.id];
                    if (![10, 15, 20].includes(p)) throw new Error('invalid question point ' + p);
                    const criteria = engine.distributeCriteriaPoints(q.rubric, p, q);
                    if (criteria.some(c => !Number.isInteger(c.points) || c.points <= 0)) throw new Error('criteria non-integer');
                    if (criteria.reduce((s, c) => s + c.points, 0) !== p) throw new Error('criteria sum !== q point');
                }

                // Senaryo kotası
                const conf = data.selection_policy.scenario_profiles[profile];
                const quota = conf.cycles ? conf.cycles[run % conf.cycles.length] : conf.allocation;
                for (const [oid, diffs] of Object.entries(quota)) {
                    for (const [diff, n] of Object.entries(diffs)) {
                        if (set.filter(q => q.outcome_id === oid && q.difficulty === diff).length !== n) {
                            throw new Error('quota mismatch');
                        }
                    }
                }

                // Yasak çiftler ve çapraz yasaklar kontrolü
                for (const a of set) {
                    for (const b of set) {
                        if (a.id !== b.id && (a.incompatible_with || []).includes(b.id)) {
                            throw new Error('incompatible pair present: ' + a.id + ' <-> ' + b.id);
                        }
                    }
                }
                count++;
            }
        }
        return count;
    });
    expect(result).toBe(900);
});

test('Tüm 34 Konu Kartı, Özel Alanlar (Topics, Facts, Chain, Wide-Table, Dark) ve Plan Aç/Kapat', async ({ page }, info) => {
    await openChoice(page);
    await page.locator('#btn-choice-go-study').click();
    await page.addStyleTag({ content: '.exam-cards-layout { transition: none !important; }' });

    const data = await (await page.request.get('/data/exam/content-v6/pilot_7_senaryo2.json')).json();
    expect(data.cards).toHaveLength(34);

    for (let i = 0; i < data.cards.length; i++) {
        await page.evaluate(i => window.FenUpExam.renderStudy(i), i);
        const card = data.cards[i];

        // Kart başlığı
        await expect(page.locator('.exam-card-title')).toHaveText(card.title);

        // Topics listesi (Overview kartları)
        if (card.topics && card.topics.length > 0) {
            await expect(page.locator('.topics')).toBeVisible();
            await expect(page.locator('.topics li')).toHaveCount(card.topics.length);
        }

        // Facts listesi (Araç kartları)
        if (card.facts && card.facts.length > 0) {
            await expect(page.locator('.facts')).toBeVisible();
            await expect(page.locator('.facts dt')).toHaveCount(card.facts.length);
        }

        // Concept chain (Kozmik adres kartı FB715-V6-K04)
        if (card.concept_chain && card.concept_chain.length > 0) {
            await expect(page.locator('.chain')).toBeVisible();
            await expect(page.locator('.chain b')).toHaveCount(card.concept_chain.length);
        }

        // Wide table (Yapay uydular tablosu FB711-V6-K08)
        if (card.layout === 'wide_table') {
            await expect(page.locator('#exam-card-article')).toHaveClass(/wide-table/);
            await expect(page.locator('#exam-visual table')).toBeVisible();
        }

        // Dark theme (İş şeması kartları FB721-V6-K04, FB721-V6-K05)
        if (card.visual?.theme === 'dark') {
            await expect(page.locator('#exam-visual')).toHaveClass(/theme-dark/);
        }

        // Yatay taşma olmamalı
        const bounds = await page.locator('.study-card-content-area').evaluate(el => ({
            width: el.clientWidth,
            scrollWidth: el.scrollWidth
        }));
        expect(bounds.scrollWidth).toBeLessThanOrEqual(bounds.width + 1);

        // Plan açık / kapalı geçişi
        for (const planOpen of [false, true]) {
            await page.evaluate(open => {
                const layout = document.querySelector('.exam-cards-layout');
                if (layout.classList.contains('plan-collapsed') === open) window.FenUpExam.toggleStudyPlan();
            }, planOpen);

            const m = await page.locator('.study-card-content-area').evaluate(el => ({
                width: el.clientWidth,
                scrollWidth: el.scrollWidth
            }));
            expect(m.scrollWidth).toBeLessThanOrEqual(m.width + 1);

            // Plan kapalıyken tek sütun olmalı ve plan gizlenmeli
            if (!planOpen) {
                const isFlex = await page.locator('.exam-cards-layout').evaluate(el => window.getComputedStyle(el).display === 'flex');
                if (isFlex) {
                    const navDisp = await page.locator('#exam-cardnav').evaluate(el => window.getComputedStyle(el).display);
                    expect(navDisp).toBe('none');
                } else {
                    const cols = await page.locator('.exam-cards-layout').evaluate(el => window.getComputedStyle(el).gridTemplateColumns);
                    expect(cols.split(' ').length).toBe(1);
                }
            }
        }
    }

    // Tam Ekran Modu
    await page.locator('#btn-study-fullscreen').click();
    await expect(page.locator('#exam-view-study')).toHaveClass(/fullscreen-study-active/);
    await page.evaluate(() => window.FenUpExam.exitStudyFullscreen());
    await expect(page.locator('#exam-view-study')).not.toHaveClass(/fullscreen-study-active/);
});

test('4 Galeri Sorusu (2 Gerçek Fotoğraf), PDF ve Soru İnceleme', async ({ page }, info) => {
    await openChoice(page);
    await page.locator('#btn-choice-go-practice').click();
    await page.locator('#exam-start-practice').click();

    const data = await (await page.request.get('/data/exam/content-v6/pilot_7_senaryo2.json')).json();
    const galleryQuestions = data.questions.filter(q => q.visual?.kind === 'gallery');
    expect(galleryQuestions).toHaveLength(4);

    // Her galeri sorusu provada 2 ayrı figür ve etiketlerle gösterilir
    for (const gq of galleryQuestions) {
        await page.evaluate(q => {
            const stateObj = JSON.parse(localStorage.getItem('fenupx_exam_pilot_v1'));
            stateObj.attempt.ids[0] = q.id;
            stateObj.attempt.activeQuestionIndex = 0;
            stateObj.attempt.answers = {};
            localStorage.setItem('fenupx_exam_pilot_v1', JSON.stringify(stateObj));
        }, gq);
        await page.reload();

        const gallery = page.locator('.exam-qgallery');
        await expect(gallery).toBeVisible();
        const imgs = gallery.locator('figure img');
        await expect(imgs).toHaveCount(2);

        // Her iki görsel de decode edilmiş olmalı
        await expect.poll(async () => {
            return imgs.evaluateAll(list => list.every(img => img.complete && img.naturalWidth > 0));
        }).toBe(true);

        const caps = gallery.locator('figure figcaption');
        await expect(caps).toHaveCount(2);
        expect(await caps.nth(0).textContent()).toBe(gq.visual.items[0].label);
        expect(await caps.nth(1).textContent()).toBe(gq.visual.items[1].label);
    }

    // Yazdırma Önizlemesi ve İndirilen PDF
    await page.locator('#btn-practice-preview-print').click();
    await expect(page.locator('#exam-print-sheet')).toBeVisible();

    const printGalleries = page.locator('.print-qgallery');
    const count = await printGalleries.count();
    if (count > 0) {
        await expect(printGalleries.first().locator('figure img')).toHaveCount(2);
    }

    // PDF İndirme ve Eksiksiz Üretim
    const download = page.waitForEvent('download');
    await page.locator('#btn-print-preview-download-pdf').click();
    const file = await download;
    expect(file.suggestedFilename()).toContain('.pdf');

    // Kapatma
    await page.locator('#btn-print-preview-close').click();
    await expect(page.locator('#exam-print-preview-modal')).toBeHidden();
});

test('Akış Sadeleştirmesi: Başlık Yalnız Scope, 2 Temel Tercih, Tek Kompakt Devam Kartı ve Kaydı Kaldır', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('fenupx_cookie_consent', 'accepted'));
    await page.goto('/');
    await page.locator('#btn-yazili-modulu').click();

    // 1. Scope ekranında başlık barı görünür olmalı
    await expect(page.locator('#exam-view-scope')).toBeVisible();
    await expect(page.locator('.exam-header-bar')).toBeVisible();

    // 2. Tercih ekranına geçişte başlık barı gizlenmeli (Scope/Choice Header Clean-up)
    await page.locator('#btn-scope-continue').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();
    await expect(page.locator('.exam-header-bar')).toBeHidden();

    // 3. İki ana seçim kartı: "Konuları Çalış" ve "Yazılı Provası Yap"
    await expect(page.locator('#btn-choice-go-study')).toBeVisible();
    await expect(page.locator('#btn-choice-go-practice')).toBeVisible();
    await expect(page.locator('#choice-study-count')).toContainText('34 bilgi kartı');
    await expect(page.locator('#choice-practice-count')).toContainText('7 soruluk prova');

    // İlk girişte kayıtlı çalışma yoksa Kaldığın Çalışmalar paneli kapalı olmalı
    await expect(page.locator('#choice-saved-works-section')).toBeHidden();

    // 4. Konu çalışmasına başla -> Kart 5'e git -> Tercih ekranına dön
    await page.locator('#btn-choice-go-study').click();
    await expect(page.locator('#exam-view-study')).toBeVisible();
    await page.evaluate(() => window.FenUpExam.renderStudy(4)); // Kart 5
    await page.locator('#btn-study-back-choice').click();
    await expect(page.locator('#exam-view-choice')).toBeVisible();

    // Şimdi Kaldığın Çalışmalar bölümünde TEK kompakt kart (#choice-saved-work-card) görünmeli
    await expect(page.locator('#choice-saved-works-section')).toBeVisible();
    await expect(page.locator('#choice-saved-work-card')).toBeVisible();
    await expect(page.locator('#saved-work-badge')).toContainText('Kart 5 / 34');

    // 5. "Kaydı Kaldır" işlemi testi (confirm onayıyla temizlenir)
    page.once('dialog', dialog => dialog.accept());
    await page.locator('#btn-clear-saved-work').click();

    // Kaldığın Çalışmalar bölümü gizlenmeli
    await expect(page.locator('#choice-saved-works-section')).toBeHidden();

    // Tekrar konu çalışmasına başlandığında Kart 1'den başlamalı
    await page.locator('#btn-choice-go-study').click();
    await expect(page.locator('.study-counter-topic')).toContainText('Kart 1 / 17');
});

test('Tekrar Cezası ve repeat_key ile Soru Çeşitliliği', async ({ page }) => {
    await openChoice(page);

    const testRuns = await page.evaluate(() => {
        const engine = window.FenUpExam;
        const history = {};

        // 1. Prova
        const run1 = engine.selectQuestions('dengeli', history, 0);

        // 2. Prova (aynı geçmişle çalıştırıldığında run1'deki sorular cezalandırılır)
        const run2 = engine.selectQuestions('dengeli', history, 1);

        // Havuzda her çıktı için yeterli soru olduğundan run2'nin tekrarı 0 olmalı
        const run1Ids = new Set(run1.questions.map(q => q.id));
        const overlap = run2.questions.filter(q => run1Ids.has(q.id));

        return {
            run1Repeats: run1.repeats,
            run1Count: run1.questions.length,
            run2Count: run2.questions.length,
            overlapCount: overlap.length,
            historyKeyCount: Object.keys(history).length
        };
    });

    expect(testRuns.run1Repeats).toBe(0);
    expect(testRuns.run1Count).toBe(7);
    expect(testRuns.run2Count).toBe(7);
    expect(testRuns.overlapCount).toBe(0); // İkinci provada farklı sorular seçildi
    expect(testRuns.historyKeyCount).toBe(14); // 14 farklı soru görülmüş olarak kaydedildi
});
