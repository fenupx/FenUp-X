// @ts-check
import { test, expect } from '@playwright/test';
import { competitionPeriods, competitionYear } from '../competition-config.js';
import { isExperimentCompleted } from '../lab-engine.js';
import { mockFirebase } from './helpers/firebase-mock.js';

test.describe('V8.9.11 — Puan Doğruluğu, Gravzant 3 Adımlı Döngü, Bilgi Yolcusu ve Kısmi Veri Koruması', () => {

    test('1. Europe/Istanbul (UTC+3) Zaman Dilimi ve Dönem Sınırları Doğrulaması', () => {
        // Pazar 23:59:59 (W44) vs Pazartesi 00:00:00 (W45)
        const sunNight = new Date("2026-11-01T23:59:59+03:00");
        const monMorning = new Date("2026-11-02T00:00:00+03:00");
        expect(competitionPeriods(sunNight).weekId).toBe("2026-W44");
        expect(competitionPeriods(monMorning).weekId).toBe("2026-W45");

        // 31 Ekim 23:59:59 vs 1 Kasım 00:00:00
        const octEnd = new Date("2026-10-31T23:59:59+03:00");
        const novStart = new Date("2026-11-01T00:00:00+03:00");
        expect(competitionPeriods(octEnd).monthId).toBe("2026-10");
        expect(competitionPeriods(novStart).monthId).toBe("2026-11");

        // 31 Ağustos 23:59:59 (2025-2026 Sezonu) vs 1 Eylül 00:00:00 (2026-2027 Sezonu)
        const augEnd = new Date("2026-08-31T23:59:59+03:00");
        const sepStart = new Date("2026-09-01T00:00:00+03:00");
        expect(competitionYear(augEnd)).toBe(2025);
        expect(competitionYear(sepStart)).toBe(2026);

        // 5 Kasım 2026 tarihi kontrolü: W45 ve 2026-11
        const nov5 = new Date("2026-11-05T19:00:00+03:00");
        expect(competitionPeriods(nov5).weekId).toBe("2026-W45");
        expect(competitionPeriods(nov5).monthId).toBe("2026-11");
        expect(competitionYear(nov5)).toBe(2026);
    });

    test('2. isExperimentCompleted: Gravzant Halkası (6.8) 3 Adımlı Fiziksel Döngü Denetimi', () => {
        // Tek ölçüm: Yetersiz, tamamlanamaz
        expect(isExperimentCompleted("6.8", [
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "✅ Halkadan Geçti", col4: "✅ Halkadan Geçti", col5: "r_küre < r_halka" }
        ])).toBe(false);

        // İki aynı durum (duplicate): Tamamlanamaz
        expect(isExperimentCompleted("6.8", [
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "✅ Halkadan Geçti", col4: "✅ Halkadan Geçti", col5: "r_küre < r_halka" },
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "✅ Halkadan Geçti", col4: "✅ Halkadan Geçti", col5: "r_küre < r_halka" }
        ])).toBe(false);

        // Yalnızca 2 adım (Soğuk Geçti + Sıcak Takıldı): Eksik (3. adım olan soğutunca yeniden geçiş yok!), tamamlanamaz!
        expect(isExperimentCompleted("6.8", [
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "✅ Halkadan Geçti", col4: "✅ Halkadan Geçti", col5: "r_küre < r_halka" },
            { col1: "3. Sıcakken Deneme", col2: "180°C", col3: "⛔ Takıldı, Geçemedi!", col4: "⛔ Takıldı, Geçemedi!", col5: "r_küre > r_halka" }
        ])).toBe(false);

        // Sıralama hatası (Önce Takıldı, sonra Geçti, sonra Takıldı): Doğru döngü sırası değil, tamamlanamaz!
        expect(isExperimentCompleted("6.8", [
            { col1: "3. Sıcakken Deneme", col2: "180°C", col3: "⛔ Takıldı, Geçemedi!", col4: "⛔ Takıldı, Geçemedi!", col5: "r_küre > r_halka" },
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "✅ Halkadan Geçti", col4: "✅ Halkadan Geçti", col5: "r_küre < r_halka" },
            { col1: "3. Sıcakken Deneme", col2: "180°C", col3: "⛔ Takıldı, Geçemedi!", col4: "⛔ Takıldı, Geçemedi!", col5: "r_küre > r_halka" }
        ])).toBe(false);

        // Tam 3 adımlı doğru fiziksel döngü:
        // 1. Soğuk geçiş (Geçti) -> 2. Isıtınca geçmeme (Takıldı) -> 3. Soğutunca yeniden geçiş (Geçti): TAMAMLANDI!
        expect(isExperimentCompleted("6.8", [
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "Normal (Büzülmüş)", col4: "✅ Halkadan Geçti", col5: "Büzüldü / Hacim Küçüldü" },
            { col1: "3. Sıcakken Deneme", col2: "190°C", col3: "Büyük (Genleşmiş)", col4: "⛔ Takıldı, Geçemedi!", col5: "Genleşti / Hacim Büyüdü" },
            { col1: "4. Soğuk Suda Soğutma", col2: "20°C", col3: "Normal (Büzülmüş)", col4: "✅ Halkadan Geçti", col5: "Büzüldü / Hacim Küçüldü" }
        ])).toBe(true);

        // Araya ara aşama (örn: alevde ısıtma) girse bile 1 -> 2 -> 3 sırası korunursa TAMAMLANDI!
        expect(isExperimentCompleted("6.8", [
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "Normal (Büzülmüş)", col4: "✅ Halkadan Geçti", col5: "Büzüldü" },
            { col1: "2. Alevde Isıtma", col2: "120°C", col3: "Normal (Büzülmüş)", col4: "✅ Halkadan Geçti", col5: "Isınıyor" },
            { col1: "3. Sıcakken Deneme", col2: "210°C", col3: "Büyük (Genleşmiş)", col4: "⛔ Takıldı, Geçemedi!", col5: "Genleşti" },
            { col1: "4. Soğuk Suda Soğutma", col2: "22°C", col3: "Normal (Büzülmüş)", col4: "✅ Halkadan Geçti", col5: "Büzüldü" }
        ])).toBe(true);
    });

    test('3. isExperimentCompleted: İletkenlik (6.9) ve Işığın Doğrusal Yayılması (5.4)', () => {
        // 6.9: Sadece iletkenler test edilirse tamamlanamaz
        expect(isExperimentCompleted("6.9", [
            { col1: "Bakır Tel", col2: "Katı İletken", col3: "İletken", col4: "💡 Yanıyor (Parlak)", col5: "" },
            { col1: "Demir Çivi", col2: "Katı İletken", col3: "İletken", col4: "💡 Yanıyor (Parlak)", col5: "" }
        ])).toBe(false);

        // 6.9: Hem iletken hem yalıtkan test edilirse tamamlandı!
        expect(isExperimentCompleted("6.9", [
            { col1: "Bakır Tel", col2: "Katı İletken", col3: "İletken", col4: "💡 Yanıyor (Parlak)", col5: "" },
            { col1: "Plastik Cetvel", col2: "Katı Yalıtkan", col3: "Yalıtkan", col4: "❌ Yanmıyor (Sönük)", col5: "" }
        ])).toBe(true);

        // 5.4: Hem düz/hizalı (geçen) hem kıvrık/hizasız (engellenen) şartı
        expect(isExperimentCompleted("5.4", [
            { col1: "Hortum", col2: "Düz", col3: "Işık Geçiyor", col4: "", col5: "" },
            { col1: "Hortum", col2: "Kıvrık", col3: "Işık Engellendi", col4: "", col5: "" }
        ])).toBe(true);
    });

    test('4. isExperimentCompleted: Fiziksel İş (7.1), Mercekler (7.4) ve Elektroskop (7.8)', () => {
        // 7.1: Hem iş yapılan hem iş yapılmayan durum şartı
        expect(isExperimentCompleted("7.1", [
            { col1: "Koli İtme", col2: "20 N", col3: "2 m", col4: "Paralel", col5: "40.0 J (İş Yapıldı)" },
            { col1: "Duvarı İtme", col2: "50 N", col3: "0 m", col4: "Hareketsiz", col5: "0.0 J (İş Yok)" }
        ])).toBe(true);

        // 7.4: Hem İnce Kenarlı hem Kalın Kenarlı Mercek şartı
        expect(isExperimentCompleted("7.4", [
            { col1: "İnce Kenarlı (Yakınsak)", col2: "Işın Çizimi", col3: "Odak Dışında", col4: "F=12cm", col5: "Ters ve Küçük Görüntü" },
            { col1: "Kalın Kenarlı (Iraksak)", col2: "Işın Çizimi", col3: "Odak Dışında", col4: "F=12cm", col5: "Düz ve Küçük Görüntü" }
        ])).toBe(true);

        // 7.8: Hem yapraklar açık hem kapalı/nötr şartı
        expect(isExperimentCompleted("7.8", [
            { col1: "Dokunma ile İletim", col2: "(-) Ebonit Çubuk", col3: "-4e", col4: "-4e", col5: "Açık (α = 30°)" },
            { col1: "⚡ Topraklama (Nötrleme)", col2: "Nötr Çubuk", col3: "0 (Nötr)", col4: "0 (Nötr)", col5: "Kapalı (α = 0°)" }
        ])).toBe(true);
    });

    test('5. Bilgi Yolcusu: distinctDays >= 5 && distinctUnits >= 4 Şartının Katı Denetimi', async ({ page }) => {
        await mockFirebase(page);
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // Test A: 5 gün / 4 ünite -> Aşama 3 olmalı (GEÇER)
        const resPass = await page.evaluate(() => {
            const history = [
                { date: '2026-11-01', unit: '1' },
                { date: '2026-11-02', unit: '2' },
                { date: '2026-11-03', unit: '3' },
                { date: '2026-11-04', unit: '4' },
                { date: '2026-11-05', unit: '1' }
            ];
            window.localStorage.setItem('fenupx_competition_history', JSON.stringify(history));
            return window.getBadgeFamilyProgress().family_bilgi_yolcusu;
        });
        expect(resPass.distinctDays).toBe(5);
        expect(resPass.distinctUnits).toBe(4);
        expect(resPass.stage).toBe(3);
        expect(resPass.nextHint).toBe('En yüksek aşamaya ulaştın!');

        // Test B: 4 gün / 5 ünite -> Math.min(4,5)=4 olsa bile Aşama 3 GEÇMEMELİ (stage === 2 kalmalı!)
        const resFailDays = await page.evaluate(() => {
            const history = [
                { date: '2026-11-01', unit: '1' },
                { date: '2026-11-01', unit: '2' },
                { date: '2026-11-02', unit: '3' },
                { date: '2026-11-03', unit: '4' },
                { date: '2026-11-04', unit: '5' }
            ];
            window.localStorage.setItem('fenupx_competition_history', JSON.stringify(history));
            return window.getBadgeFamilyProgress().family_bilgi_yolcusu;
        });
        expect(resFailDays.distinctDays).toBe(4);
        expect(resFailDays.distinctUnits).toBe(5);
        expect(resFailDays.stage).toBe(2); // 4 gün < 5 olduğu için Aşama 3'e GEÇEMEZ!
        expect(resFailDays.nextHint).toContain('1 farklı gün daha yarışma tamamla');

        // Test C: 5 gün / 3 ünite -> Gün yeterli olsa bile ünite < 4 olduğu için Aşama 3 GEÇMEMELİ (stage === 2 kalmalı!)
        const resFailUnits = await page.evaluate(() => {
            const history = [
                { date: '2026-11-01', unit: '1' },
                { date: '2026-11-02', unit: '2' },
                { date: '2026-11-03', unit: '3' },
                { date: '2026-11-04', unit: '1' },
                { date: '2026-11-05', unit: '2' }
            ];
            window.localStorage.setItem('fenupx_competition_history', JSON.stringify(history));
            return window.getBadgeFamilyProgress().family_bilgi_yolcusu;
        });
        expect(resFailUnits.distinctDays).toBe(5);
        expect(resFailUnits.distinctUnits).toBe(3);
        expect(resFailUnits.stage).toBe(2); // 3 ünite < 4 olduğu için Aşama 3'e GEÇEMEZ!
        expect(resFailUnits.nextHint).toContain('1 farklı ünitede daha yarışma tamamla');

        // Test D: 2 gün / 2 ünite -> Aşama 1 olmalı
        const resStage1 = await page.evaluate(() => {
            const history = [
                { date: '2026-11-01', unit: '1' },
                { date: '2026-11-02', unit: '2' }
            ];
            window.localStorage.setItem('fenupx_competition_history', JSON.stringify(history));
            return window.getBadgeFamilyProgress().family_bilgi_yolcusu;
        });
        expect(resStage1.distinctDays).toBe(2);
        expect(resStage1.distinctUnits).toBe(2);
        expect(resStage1.stage).toBe(1);

        // Test E: 1 gün / 4 ünite -> Aşama 0 olmalı (gün sayısı yetersiz)
        const resStage0 = await page.evaluate(() => {
            const history = [
                { date: '2026-11-01', unit: '1' },
                { date: '2026-11-01', unit: '2' },
                { date: '2026-11-01', unit: '3' },
                { date: '2026-11-01', unit: '4' }
            ];
            window.localStorage.setItem('fenupx_competition_history', JSON.stringify(history));
            return window.getBadgeFamilyProgress().family_bilgi_yolcusu;
        });
        expect(resStage0.distinctDays).toBe(1);
        expect(resStage0.distinctUnits).toBe(4);
        expect(resStage0.stage).toBe(0);
    });

    test('6. Liderlik Tablosu: Kısmi Veri Getirme Durumunda Eksik Puanın Kesin Sayılmaması', async ({ page }) => {
        await mockFirebase(page);
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');

        // renderGlobalLeaderboard çağrıldığında isPartialSync=true ise uyarı banner'ı eklenmeli
        const partialResult = await page.evaluate(() => {
            const dummyUsers = [
                { uid: 'u1', nickname: 'Ali', displayScore: 120, cohortScore: 0, legacyScore: 120 }
            ];
            window.renderGlobalLeaderboard(dummyUsers, 'weekly', true);
            const lbList = document.getElementById('global-lb-list');
            const hasWarning = !!lbList?.querySelector('.lb-sync-warning');
            const warningText = lbList?.querySelector('.lb-sync-warning')?.textContent || '';
            return { hasWarning, warningText };
        });

        expect(partialResult.hasWarning).toBe(true);
        expect(partialResult.warningText).toContain('Puan kaynaklarından birine ulaşılamadı');
    });

});
