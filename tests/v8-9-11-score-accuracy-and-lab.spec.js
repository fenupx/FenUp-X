// @ts-check
import { test, expect } from '@playwright/test';
import { competitionPeriods, competitionYear } from '../competition-config.js';
import { isExperimentCompleted } from '../lab-engine.js';

test.describe('V8.9.11 — Puan Doğruluğu, Dönem Sınırları ve Deney Tamamlama', () => {

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

    test('2. isExperimentCompleted: Gravzant Halkası (6.8) Zıt Koşul Denetimi', () => {
        // Tek ölçüm: Tamamlanamaz
        expect(isExperimentCompleted("6.8", [
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "✅ Halkadan Geçti", col4: "Halkadan Geçti", col5: "" }
        ])).toBe(false);

        // İki aynı durum (yinelenen / duplicate geçiş): Tamamlanamaz!
        expect(isExperimentCompleted("6.8", [
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "✅ Halkadan Geçti", col4: "Halkadan Geçti", col5: "" },
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "✅ Halkadan Geçti", col4: "Halkadan Geçti", col5: "" }
        ])).toBe(false);

        // İki zıt durum: Soğukken geçti VE Sıcakken takıldı: Tamamlandı!
        expect(isExperimentCompleted("6.8", [
            { col1: "1. Soğukken Geçirme", col2: "20°C", col3: "✅ Halkadan Geçti", col4: "✅ Halkadan Geçti", col5: "r_küre < r_halka" },
            { col1: "3. Sıcakken Deneme", col2: "180°C", col3: "⛔ Takıldı, Geçemedi!", col4: "⛔ Takıldı, Geçemedi!", col5: "r_küre > r_halka" }
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

});
