/**
 * FenUp X — Sanal Bilim Laboratuvarı & İnteraktif Deney Motoru (lab-engine.js)
 * MEB Türkiye Yüzyılı Maarif Modeli Uyumlu
 * Geliştirici: MistralX-RK / FenUp X Ekibi
 * Sıfır Dış Bağımlılık (Vanilla ES6+ & HTML5 Canvas 2D)
 */

// --- 1. TÜM SINIFLAR İÇİN 26 DENEYLİK RESMİ MAARİF MODELİ KATALOĞU ---
export const EXPERIMENTS_DATABASE = [
    // 5. SINIF (10 DENEY — TAMAMI AKTİF & MAARİF MÜFREDAT SENKRON)
    {
        id: "5.1", grade: 5, unit: 1, unitName: "Gökyüzündeki Komşularımız ve Biz",
        title: "Ay'ın Evreleri ve Görünümü Simülatörü",
        code: "FB.5.1.3", bookRef: "1. Kitap, s. 36–42",
        active: true, // 🏆 AKTİF!
        desc: "Ay'ın Dünya etrafındaki dolanma açısına göre Güneş ışığının aydınlattığı alanı ve Dünya'dan görünen 4 ana ve 4 ara evresini canlı gözlemleyin."
    },
    {
        id: "5.2", grade: 5, unit: 2, unitName: "Kuvveti Tanıyalım",
        title: "Dinamometre ve Yay Esnekliği Simülatörü",
        code: "FB.5.2.1 - FB.5.2.2", bookRef: "1. Kitap, s. 63–68",
        active: true, // 🏆 AKTİF!
        desc: "İnce, orta ve kalın sarmal yaylara asılan ağırlıklarla kuvvet (N) - uzama (cm) doğru orantısını ve esneklik sınırını test edin."
    },
    {
        id: "5.3", grade: 5, unit: 2, unitName: "Kuvveti Tanıyalım",
        title: "Sürtünme Kuvveti ve Yüzeyler Simülatörü",
        code: "FB.5.2.4", bookRef: "1. Kitap, s. 80–83",
        active: true, // 🏆 AKTİF!
        desc: "Buz, tahta, zımpara ve halı zeminlerde rampadan bırakılan aracın sürtünme ivmesini ve durma mesafesini karşılaştırın."
    },
    {
        id: "5.4", grade: 5, unit: 4, unitName: "Işığın Dünyası",
        title: "Işığın Doğrusal Yayılması Simülatörü",
        code: "FB.5.4.1", bookRef: "2. Kitap, s. 17–23",
        active: true, // 🏆 AKTİF!
        desc: "Delikli levhalar ve düz/kıvrık hortum düzenekleriyle ışığın her yönde ve doğrusal (düz çizgiler halinde) yayıldığını kanıtlayın."
    },
    {
        id: "5.5", grade: 5, unit: 4, unitName: "Işığın Dünyası",
        title: "Tam Gölge ve Boyut Değişkenleri Simülatörü",
        code: "FB.5.4.3", bookRef: "2. Kitap, s. 37–42",
        active: true, // 🏆 AKTİF!
        desc: "Işık kaynağı, opak cisim ve perde mesafelerini değiştirerek perdede oluşan tam gölgenin büyüme ve küçülme dinamiklerini inceleyin."
    },
    {
        id: "5.6", grade: 5, unit: 5, unitName: "Maddenin Doğası",
        title: "Maddenin Halleri ve Sıkıştırılabilirlik Simülatörü",
        code: "FB.5.5.1", bookRef: "2. Kitap, s. 55–57",
        active: true, // 🏆 AKTİF!
        desc: "Katı, sıvı ve gaz maddelerin tanecikler arası boşluklarını şırınga düzeneğinde basınç uygulayarak sıkıştırılabilirlik açısından karşılaştırın."
    },
    {
        id: "5.7", grade: 5, unit: 5, unitName: "Maddenin Doğası",
        title: "Sıvılarda Isı Alışverişi ve Denge Sıcaklığı",
        code: "FB.5.5.3", bookRef: "2. Kitap, s. 70–73",
        active: true, // 🏆 AKTİF!
        desc: "Farklı sıcaklıktaki sıvıları karıştırarak ısının sıcaktan soğuğa akışını ve sıcaklıklar eşitleninceye kadar süren denge sıcaklığını gözlemleyin."
    },
    {
        id: "5.8", grade: 5, unit: 5, unitName: "Maddenin Doğası",
        title: "Suyun Hâl Değişimi ve Sıcaklık Grafiği",
        code: "FB.5.5.4", bookRef: "2. Kitap, s. 77–83",
        active: true, // 🏆 AKTİF!
        desc: "Buzun erimesi ve suyun kaynaması sürecinde sıcaklık-zaman grafiğini çizerek hâl değişimi süresince sıcaklığın neden sabit kaldığını keşfedin."
    },
    {
        id: "5.9", grade: 5, unit: 5, unitName: "Maddenin Doğası",
        title: "Isı İletkenliği ve Yalıtım Simülatörü",
        code: "FB.5.5.5 - FB.5.5.6", bookRef: "2. Kitap, s. 86–94",
        active: true, // 🏆 AKTİF!
        desc: "Farklı metallerin (bakır, alüminyum, demir) ısı iletim hızlarını ve binalarda yalıtım malzemelerinin enerji tasarrufundaki rolünü simüle edin."
    },
    {
        id: "5.10", grade: 5, unit: 6, unitName: "Yaşamımızda Elektrik",
        title: "Devrede Ampul Parlaklığı Değişkenleri Simülatörü",
        code: "FB.5.6.3", bookRef: "2. Kitap, s. 121–127",
        active: true, // 🏆 AKTİF!
        desc: "Basit elektrik devresinde pil sayısı ve ampul sayısını bağımsız değişken olarak değiştirip ampul parlaklığındaki değişimi test edin."
    },

    // 6. SINIF (9 DENEY — İLK 5 DENEY AKTİF)
    {
        id: "6.1", grade: 6, unit: 1, unitName: "Güneş Sistemi ve Tutulmalar",
        title: "Güneş ve Ay Tutulmaları Simülatörü",
        code: "FB.6.1.3 - FB.6.1.4", bookRef: "1. Kitap, s. 30–36",
        active: true, // 🏆 AKTİF!
        desc: "Güneş, Dünya ve Ay'ın yörünge konumlarını kontrol ederek Güneş Tutulması (Ay ortada, Yeniay, gündüz dar alanda tam/yarı gölge) ve Ay Tutulması (Dünya ortada, Dolunay, gece geniş konide kızıl/kanlı Ay) olaylarını canlı inceleyin."
    },
    {
        id: "6.2", grade: 6, unit: 2, unitName: "Kuvvet ve Hareket",
        title: "Bileşke Kuvvet ve Halat Çekmece",
        code: "FB.6.2.1 - FB.6.2.2", bookRef: "1. Kitap, s. 46–61",
        active: true, // 🏆 AKTİF!
        desc: "Doğu ve batı yönlü kuvvetleri cisme uygulayarak bileşke kuvveti (R), hareket yönünü ve dengelenmiş / dengelenmemiş kuvvet durumlarını test edin."
    },
    {
        id: "6.3", grade: 6, unit: 2, unitName: "Kuvvet ve Hareket",
        title: "Sabit Süratli Hareket Simülatörü",
        code: "FB.6.2.3", bookRef: "1. Kitap, s. 63–73",
        active: true, // 🏆 AKTİF!
        desc: "100 metrelik ölçüm pistinde sabit süratle ilerleyen aracın yol-zaman ve sürat-zaman grafiklerini eşzamanlı inceleyin."
    },
    {
        id: "6.4", grade: 6, unit: 4, unitName: "Işığın Yansıması ve Aynalar",
        title: "Yansıma Kanunları ve Aynalar Simülatörü",
        code: "FB.6.4.1 - FB.6.4.3", bookRef: "1. Kitap, s. 136–161",
        active: true, // 🏆 AKTİF!
        desc: "Düzlem aynada gelen ve yansıyan ışın ile yüzey normali arasındaki gelme=yansıma (i=r) kanununu, düzgün/dağınık yansımayı ve çukur/tümsek aynalarda cisim mesafesine göre görüntü özelliklerini simüle edin."
    },
    {
        id: "6.5", grade: 6, unit: 5, unitName: "Maddenin Doğası ve Yoğunluk",
        title: "Sıvıların Yoğunluğu ve Yoğunluk Kulesi",
        code: "FB.6.5.3 - FB.6.5.4", bookRef: "2. Kitap, s. 38–59",
        active: true, // 🏆 AKTİF!
        desc: "Bal, gliserin, su ve zeytinyağını aynı silindire dökerek tabakalaşmayı ve içine bırakılan cisimlerin yüzme-batma hallerini gözlemleyin."
    },
    {
        id: "6.6", grade: 6, unit: 3, unitName: "Canlılarda Sistemler ve Yaşam",
        title: "Tohumun Çimlenmesine Etki Eden Faktörler",
        code: "FB.6.3.3", bookRef: "1. Kitap, s. 94–96",
        active: true, // 🏆 AKTİF!
        desc: "Fasulye tohumlarının çimlenmesi için gerekli çevre şartlarını (su/nem, oksijen, uygun sıcaklık) test edin; karanlık ve aydınlık ortamlarda çimlenmeyi karşılaştırarak ışığın çimlenmeye etki etmediğini gözlemleyin."
    },
    {
        id: "6.7", grade: 6, unit: 4, unitName: "Işığın Yansıması ve Renkler",
        title: "Işığın Soğurulması ve Radyometre",
        code: "FB.6.4.4 - FB.6.4.6", bookRef: "1. Kitap, s. 164–168",
        active: true, // 🏆 AKTİF!
        desc: "Siyah, beyaz ve mavi yüzeylerin güneş ışığını soğurma miktarlarını termometrelerle ölçün; ışık enerjisini hareket enerjisine dönüştüren Crookes radyometresinin kanatçık dönüşünü canlı simüle edin."
    },
    {
        id: "6.8", grade: 6, unit: 5, unitName: "Maddenin Doğası ve Isı",
        title: "Katılarda Genleşme ve Büzülme - Gravzant Halkası",
        code: "FB.6.5.1", bookRef: "2. Kitap, s. 22–24",
        active: true, // 🏆 AKTİF!
        desc: "Gravzant halkası ve metal küre düzeneğinde küreyi ısıtıp genleşmesini (halkadan geçememe) ve soğuk suya daldırarak büzülmesini (halkadan tekrar geçme) gözlemleyin."
    },
    {
        id: "6.9", grade: 6, unit: 6, unitName: "Elektriğin İletimi ve Direnç",
        title: "Maddelerin Elektriksel İletkenliği Test Cihazı",
        code: "FB.6.6.1", bookRef: "2. Kitap, s. 69–72",
        active: true, // 🏆 AKTİF!
        desc: "Test uçları arasına katı (bakır, demir, grafit, tahta, plastik, silgi) ve sıvı (tuzlu su, şekerli su, limonlu su, saf su) maddeleri bağlayarak devrenin iletkenlik durumunu ampul parlaklığıyla test edin."
    },
    {
        id: "6.10", grade: 6, unit: 6, unitName: "Elektriğin İletimi ve Direnç",
        title: "Elektriksel Direnç ve Reosta Simülatörü",
        code: "FB.6.6.2 - FB.6.6.3", bookRef: "2. Kitap, s. 78–89",
        active: true, // 🏆 AKTİF!
        desc: "İletken telin boyu (L), dik kesit alanı (S) ve cinsi (bakır, demir, nikel-krom) değiştikçe devredeki direnci ve ampul parlaklığını inceleyin; reosta sürgüsünü kaydırarak direnci canlı ayarlayın."
    },

    // 7. SINIF (9 DENEY — TAMAMI AKTİF & MAARİF MÜFREDAT SENKRON)
    {
        id: "7.1", grade: 7, unit: 2, unitName: "Kuvvet ve Enerjiyi Keşfedelim",
        title: "Fiziksel Anlamda İş ve Enerji Simülatörü",
        code: "FB.7.2.1", bookRef: "1. Kitap, s. 58–69",
        active: true, // 🏆 AKTİF!
        desc: "Kuvvetin büyüklüğü, doğrultusu ve cismin yer değiştirme yönünü kontrol ederek fen anlamında iş yapılıp yapılmadığını ve 4 temel kavram yanılgısını nitel olarak keşfedin."
    },
    {
        id: "7.2", grade: 7, unit: 2, unitName: "Kuvvet ve Enerjiyi Keşfedelim",
        title: "Mekanik Enerji Dönüşümü ve Korunumu (Sarkaç ve Rampa)",
        code: "FB.7.2.2 - FB.7.2.3", bookRef: "1. Kitap, s. 70–85",
        active: true, // 🏆 AKTİF!
        desc: "Salınan sarkaç veya kaykaycı üzerinde potansiyel ve kinetik enerjinin birbirine dönüşümünü, sürtünmeyle ısıya aktarımını ve enerjinin korunumunu nitel olarak gözlemleyin."
    },
    {
        id: "7.3", grade: 7, unit: 4, unitName: "Işığın Kırılması ve Mercekler",
        title: "Işığın Kırılması ve Sınır Açısı Simülatörü",
        code: "FB.7.4.1", bookRef: "2. Kitap, s. 16–29",
        active: true, // 🏆 AKTİF!
        desc: "Farklı optik yoğunluktaki ortamlarda ışığın hızını, kırılma açısını, normale yaklaşma/uzaklaşma durumunu ve tam yansımayı keşfedin."
    },
    {
        id: "7.4", grade: 7, unit: 4, unitName: "Işığın Kırılması ve Mercekler",
        title: "İnce ve Kalın Kenarlı Mercekler ve Odaklama Simülatörü",
        code: "FB.7.4.2 - FB.7.4.3", bookRef: "2. Kitap, s. 30–41",
        active: true, // 🏆 AKTİF!
        desc: "İnce ve kalın kenarlı merceklerde ışınların toplanma/dağılma fiziğini, odak noktasını (F) ve cismin oluşan görüntüsünü (düz-büyük büyüteç veya ters-küçük) nitel olarak inceleyin."
    },
    {
        id: "7.5", grade: 7, unit: 5, unitName: "Maddenin Doğasına Yolculuk",
        title: "Karışımların Ayrılması Simülatörü (Ayırma Hunisi ve Basit Damıtma)",
        code: "FB.7.5.10", bookRef: "2. Kitap, s. 90–101",
        active: true, // 🏆 AKTİF!
        desc: "Zeytinyağı-su heterojen karışımını ayırma hunisinde yoğunluk farkıyla, homojen alkol-su çözeltisini basit damıtmada kaynama noktası farkıyla saflaştırın."
    },
    {
        id: "7.6", grade: 7, unit: 5, unitName: "Maddenin Doğasına Yolculuk",
        title: "Çözünme Hızını Etkileyen Faktörler Simülatörü",
        code: "FB.7.5.9", bookRef: "2. Kitap, s. 78–89",
        active: true, // 🏆 AKTİF!
        desc: "Sıcaklık, temas yüzeyi (pudra/toz/küp şeker) ve karıştırmanın çözünme süresine etkisini 3 beherli kontrollü deney düzeneğinde eşzamanlı test edin."
    },
    {
        id: "7.7", grade: 7, unit: 6, unitName: "Elektriklenme",
        title: "Sürtünme, Dokunma ve Etki ile Elektriklenme Simülatörü",
        code: "FB.7.6.1 - FB.7.6.2", bookRef: "2. Kitap, s. 106–119",
        active: true, // 🏆 AKTİF!
        desc: "Ebonit çubuğu yün kumaşa, cam çubuğu ipek kumaşa sürterek elektron transferini, iletken kürelerde dokunma ve yaklaştırma (etki/kutuplanma) fiziğini deneyimleyin."
    },
    {
        id: "7.8", grade: 7, unit: 6, unitName: "Elektriklenme",
        title: "Elektroskop ile Yük Tayini ve Topraklama Simülatörü",
        code: "FB.7.6.2 - FB.7.6.3", bookRef: "2. Kitap, s. 120–129",
        active: true, // 🏆 AKTİF!
        desc: "Yüklü cisimleri elektroskop topuzuna yaklaştırarak ve dokundurarak yaprak açılma fiziğini ve topraklamayla nötrlenmeyi deneyimleyin."
    },
    {
        id: "7.9", grade: 7, unit: 7, unitName: "Sürdürülebilir Yaşam ve Enerji",
        title: "Besin Piramidinde Enerji Akışı ve Biyolojik Birikim Simülatörü",
        code: "FB.7.7.1", bookRef: "2. Kitap, s. 136–149",
        active: true, // 🏆 AKTİF!
        desc: "Üreticiden tepe avcıya aktarılan enerjinin azalışını (%10 kuralı) ve tarım ilacı zehirlerinin katlanarak birikimini nitel olarak gözlemleyin."
    },
    {
        id: "7.10", grade: 7, unit: 7, unitName: "Sürdürülebilir Yaşam ve Enerji",
        title: "Su Ayak İzi ve Sürdürülebilir Tasarruf Simülatörü",
        code: "FB.7.7.2", bookRef: "2. Kitap, s. 152–155",
        active: true, // 🏆 AKTİF!
        desc: "Mimar Sinan Mağlova Su Kemeri hidroliği (%0.2 eğim ve sel menfezleri), perlatörlü musluk, basınçlı damla sulama ve Arjen Hoekstra Su Ayak İzi Terazisi simülatörü."
    }
];

// --- 2. OPTİK FİZİK MOTORU SABİTLERİ (DENEY 7.3) ---
const MEDIA_PROPERTIES = {
    air: { name: "Hava", n: 1.00, speed: 300000, bgColor: "rgba(10, 20, 45, 0.45)", highlightColor: "#60a5fa", label: "Hava (Az Yoğun)" },
    water: { name: "Su", n: 1.33, speed: 225564, bgColor: "rgba(0, 95, 160, 0.45)", highlightColor: "#38bdf8", label: "Su (Çok Yoğun)" },
    glass: { name: "Cam", n: 1.50, speed: 200000, bgColor: "rgba(60, 50, 140, 0.5)", highlightColor: "#c084fc", label: "Cam (Çok Yoğun)" },
    diamond: { name: "Elmas", n: 2.42, speed: 123967, bgColor: "rgba(15, 140, 170, 0.55)", highlightColor: "#2dd4bf", label: "Elmas (Aşırı Yoğun)" }
};

// --- 3. SANAL LABORATUVAR DURUM YÖNETİMİ (STATE) ---
export const labState = {
    currentGrade: 7, // Varsayılan 7. sınıf
    currentUnitFilter: "all",
    activeExperimentId: null,

    // Deney 7.1 Fizik Durumu (Fiziksel Anlamda İş: W = F · Δx)
    work: {
        scenario: "horizontal", // "horizontal" | "lift" | "carry" | "wall"
        force: 40,              // 10 - 100 N
        distance: 5.0,          // 1.0 - 10.0 m (veya h)
        frictionEnabled: false, // Sürtünme açık/kapalı
        frictionCoeff: 0.2,     // mu = 0.2
        mass: 10,               // 10 kg
        gravity: 10,            // 10 m/s^2 (G = 100 N)
        frictionForceVal: 20,   // fs = 20 N

        // Animasyon ve Hareket
        isPlaying: false,
        progress: 0,            // 0.0 -> 1.0 (mevcut yer değiştirme oranı)
        animSpeed: 0.012,       // ilerleme hızı
        currentDisplacement: 0, // progress * distance (m)
        isDragging: false,
        dragStartX: 0,

        // Fiziksel Çıktılar
        isWorkDone: true,
        alignment: "same",      // "same", "lift", "perpendicular", "zero"
        appliedWork: 200,       // Joule: F * distance
        frictionForce: 0,       // fs (N)
        netForce: 40,           // F_net (N)
        netWork: 200,           // W_net (J)
        heatWork: 0,            // W_fs (J)

        measurements: []
    },

    // Deney 7.2 Fizik Durumu (Mekanik Enerji: Sarkaç ve Rampa)
    energy: {
        mode: "pendulum", // "pendulum" (Sarkaç) veya "ramp" (U-Rampa)
        isPlaying: true,
        isSlowMo: false,
        frictionEnabled: false,
        mass: 2.0, // 1.0 - 5.0 kg
        releaseAngle: 45, // 15° - 60° (derece)
        gravity: 9.8, // m/s^2

        // Sarkaç bileşenleri
        pendulum: {
            length: 1.5, // metre
            pivotX: 420, // canvas px
            pivotY: 65,  // canvas px
            rodPx: 220,  // px
            angle: 45 * (Math.PI / 180), // radyan
            omega: 0,    // rad/s
            isDragging: false
        },

        // U-Rampa bileşenleri
        ramp: {
            radius: 1.6, // metre
            centerX: 420,
            centerY: 140,
            radiusPx: 200,
            angle: 45 * (Math.PI / 180), // radyan
            omega: 0,
            isDragging: false
        },

        // Anlık Enerji Değerleri
        currentHeight: 0, // metre
        currentSpeed: 0,  // m/s
        potentialEnergy: 0, // J
        kineticEnergy: 0,   // J
        heatEnergy: 0,      // J
        totalEnergy: 0,     // J
        initialTotalEnergy: 0, // J

        measurements: []
    },

    // Deney 7.3 Fizik Durumu (Işığın Kırılması)
    optics: {
        medium1: "air",
        medium2: "water",
        incidentAngle: 30, // 0 - 85
        refractedAngle: null,
        isTotalInternalReflection: false,
        criticalAngle: null,
        isDraggingLaser: false,
        measurements: []
    },

    // Deney 7.4 Fizik Durumu (Mercekler ve Odaklama)
    lens: {
        type: "convex", // "convex" (İnce / Yakınsak) veya "concave" (Kalın / Iraksak)
        mode: "parallel", // "parallel" (Paralel Işın) veya "object" (Mum / Görüntü)
        focalLength: 120, // 80 - 160 mm / px
        objectDistance: 200, // 50 - 320 mm / px
        objectHeight: 70,
        imageDistance: null,
        imageHeight: null,
        magnification: null,
        isDraggingObject: false,
        measurements: []
    },

    // Deney 7.5 Fizik/Kimya Durumu (Çözünme Hızını Etkileyen Faktörler)
    dissolve: {
        preset: "temp", // "temp" | "surface" | "stir" | "custom"
        isPlaying: false,
        isFinished: false,
        timeScale: 3.5, // 1 gerçek saniyede 3.5 saniye ilerler

        // 3 Beher
        beakers: [
            {
                id: "A",
                name: "Beher A",
                temp: 20,
                sugar: "granulated",
                stirring: false,
                waterVolume: 100,
                sugarMass: 10,
                elapsedTime: 0,
                targetTime: 33.0,
                progress: 0,
                isDissolved: false,
                particles: [],
                stirAngle: 0
            },
            {
                id: "B",
                name: "Beher B",
                temp: 40,
                sugar: "granulated",
                stirring: false,
                waterVolume: 100,
                sugarMass: 10,
                elapsedTime: 0,
                targetTime: 21.5,
                progress: 0,
                isDissolved: false,
                particles: [],
                stirAngle: 0
            },
            {
                id: "C",
                name: "Beher C",
                temp: 60,
                sugar: "granulated",
                stirring: false,
                waterVolume: 100,
                sugarMass: 10,
                elapsedTime: 0,
                targetTime: 13.2,
                progress: 0,
                isDissolved: false,
                particles: [],
                stirAngle: 0
            }
        ],

        measurements: []
    },

    // DENEY 7.6: KARIŞIMLARIN AYRILMASI (AYIRMA HUNİSİ & BASİT DAMITMA)
    separation: {
        mode: "funnel", // "funnel" | "distill"
        
        // Mod 1: Ayırma Hunisi (Yoğunluk Farkı - Zeytinyağı & Su)
        funnel: {
            isValveOpen: false,
            valveAngle: 0,        // 0 = yatay/kapalı, Math.PI/2 = dikey/açık
            waterVolume: 100.0,   // mL (huni içinde kalan su)
            oilVolume: 100.0,     // mL (huni içinde kalan zeytinyağı)
            collectedWater: 0.0,  // mL (erlende toplanan su)
            leakedOil: 0.0,       // mL (musluk açık unutulursa erlene sızan yağ)
            efficiency: 100.0,    // %
            drainRate: 0.35,      // mL / frame
            drops: []             // akan damlacıklar
        },

        // Mod 2: Basit Damıtma (Kaynama Noktası Farkı - Alkol & Su)
        distillation: {
            isHeating: false,
            temp: 20.0,           // °C
            alcoholVolume: 100.0, // mL balonda kalan alkol
            waterVolume: 100.0,   // mL balonda kalan su
            distilledAlcohol: 0.0,// mL toplama kabında biriken etil alkol
            isBoiling: false,
            boilingPhase: "warming", // "warming" | "alcohol_boiling" | "alcohol_finished" | "water_boiling"
            bubbles: [],
            condenserDrops: [],
            collectionDrops: []
        },

        measurements: []
    },

    // DENEY 7.7: SÜRTÜNME VE DOKUNMA İLE ELEKTRİKLENME SİMÜLATÖRÜ
    electro: {
        mode: "friction", // "friction" | "conduction"

        // Mod A: Sürtünme ile Elektriklenme
        friction: {
            pair: "ebonite", // "ebonite" (Ebonit+Yün) | "glass" (Cam+İpek)
            rod: {
                x: 240,
                y: 160,
                baseY: 160,
                w: 320,
                h: 36,
                protons: 10,
                electrons: 10,
                isDragging: false
            },
            cloth: {
                x: 90,
                y: 135,
                baseX: 90,
                baseY: 135,
                w: 105,
                h: 85,
                protons: 8,
                electrons: 8,
                isDragging: false
            },
            lastClothX: 90,
            lastClothY: 135,
            frictionDistance: 0,
            sparks: [],
            papers: []
        },

        // Mod B: Dokunma ile Elektriklenme
        conduction: {
            preset: "pos6_zero", // "pos6_zero" | "neg6_zero" | "pos6_neg2"
            sphere1: {
                x: 260,
                baseX: 260,
                y: 230,
                r: 55,
                protons: 12,
                electrons: 6, // Net +6e
                isDragging: false
            },
            sphere2: {
                x: 540,
                baseX: 540,
                y: 230,
                r: 55,
                protons: 10,
                electrons: 10, // Net 0 (Nötr)
                isDragging: false
            },
            hasTouched: false,
            touchSparks: []
        },

        // Mod C: Etki ile Elektriklenme (Kutuplanma - Kural: Pozitif Yükler Sabittir!)
        induction: {
            pair: "ebonite", // "ebonite" (-) | "glass" (+)
            rod: {
                x: 180,
                baseX: 180,
                y: 220,
                w: 160,
                h: 36,
                protons: 8,
                electrons: 14, // (-) Ebonit: net -6e
                isApproached: false
            },
            sphere: {
                x: 500,
                baseX: 500,
                y: 220,
                r: 65,
                protons: 14,
                electrons: 14, // Nötr
                polarizedRatio: 0 // 0.0 (nötr homojen) -> 1.0 (kutuplanmış)
            }
        },

        measurements: []
    },

    // DENEY 7.8: ELEKTROSKOP İLE YÜK TAYİNİ VE TOPRAKLAMA SİMÜLATÖRÜ
    electroscope: {
        rod: {
            type: "glass_pos", // "glass_pos" (+) | "ebonite_neg" (-) | "neutral" (0)
            charge: 6,         // +6, -6, 0
            x: 180,
            y: 110,
            baseX: 180,
            baseY: 110,
            w: 170,
            h: 30,
            action: "remove", // "approach" | "touch" | "remove"
            isDragging: false,
            dragOffsetX: 0,
            dragOffsetY: 0
        },
        scope: {
            initialMode: "neutral", // "neutral" | "positive" | "negative"
            totalNet: 0,       // elektroskobun net yükü
            knobNet: 0,        // topuzdaki yük
            leavesNet: 0,      // yapraklardaki yük
            leafAngle: 0.0,    // mevcut açı (derece)
            targetAngle: 0.0   // hedef açı
        },
        grounding: {
            isActive: false,
            animTimer: 0,
            sparks: []
        },
        sparks: [],
        measurements: []
    },

    // DENEY 7.9: BESİN PİRAMİDİNDE ENERJİ AKIŞI VE BİYOBİRİKİM SİMÜLATÖRÜ
    foodPyramid: {
        mode: "energy",       // "energy" (%10 Kuralı) | "bioaccum" (Biyobirikim)
        sunlight: 100000,     // 50000, 100000, 200000 J
        pesticideDose: "med", // "low" | "med" | "high"
        selectedTier: 0,      // 0: Üretici, 1: 1. Tüketici, 2: 2. Tüketici, 3: Tepe Avcı, 4: Ayrıştırıcı
        isFlowing: true,      // animasyon akışı
        flowParticles: [],    // basamaklar arası enerji fotonları
        heatArrows: [],       // her basamaktan çıkan %90 ısı okları
        poisonParticles: [],  // dokularda biriken zehir tanecikleri
        measurements: []
    },

    // DENEY 7.10: SU AYAK İZİ VE SÜRDÜRÜLEBİLİR TASARRUF SİMÜLATÖRÜ (FB.7.7.2)
    waterFootprint: {
        mode: "aqueduct", // "aqueduct" (Su Kemeri) | "tech" (Tasarruf Teknolojileri) | "footprint" (Hoekstra Terazisi)
        animTime: 0,
        // Mod 1: Su Kemeri (Mimar Sinan Hidroliği)
        aqueduct: {
            slope: 0.2,          // %0.2 ideal Sinan eğimi
            flow: 200,           // 50 - 500 L/s
            flood: false,        // Sel / şiddetli yağış
            waterDelivered: 198, // L/s
            particles: []
        },
        // Mod 2: Tasarruf Teknolojileri
        tech: {
            aerator: false,   // %50 tasarruf sağlayan çift kademeli perlatör
            drip: false,      // %65 tasarruf sağlayan basınçlı damla sulama
            greywater: false, // %30 geri kazanım sağlayan evsel gri su
            particles: []
        },
        // Mod 3: Arjen Hoekstra Su Ayak İzi Terazisi
        footprint: {
            selectedProduct: "shirt",
            products: {
                shirt: { name: "1 Pamuklu Tişört", liters: 2700, green: 54, blue: 33, grey: 13, note: "Pamuk tarımı & boyama" },
                beef: { name: "1 kg Dana Eti", liters: 15400, green: 93, blue: 4, grey: 3, note: "Yem bitkisi & canlı tüketimi" },
                coffee: { name: "1 Fincan Kahve", liters: 140, green: 96, blue: 1, grey: 3, note: "Kahve çekirdeği işleme" },
                apple: { name: "1 Adet Elma", liters: 125, green: 82, blue: 11, grey: 7, note: "Meyve bahçesi sulaması" },
                paper: { name: "1 Adet A4 Kağıt", liters: 10, green: 57, blue: 32, grey: 11, note: "Ağaç hamuru & lif yıkama" }
            },
            scaleAngle: 0
        },
        measurements: []
    },

    // DENEY 6.1: GÜNEŞ VE AY TUTULMALARI SİMÜLATÖRÜ (FB.6.1.3 - FB.6.1.4)
    eclipse: {
        mode: "solar",           // "solar" (Güneş Tutulması) | "lunar" (Ay Tutulması)
        isPlaying: true,
        orbitAngle: 0.0,         // derece (-30° ile +30° arası yörünge eğrisi)
        orbitSpeed: 0.12,        // animasyon hızı
        zoom: 1.0,
        isDragging: false,
        alignmentThreshold: 3.5, // derece içinde tam tutulma
        measurements: []
    },

    // DENEY 6.2: BİLEŞKE KUVVET VE HALAT ÇEKMECE (FB.6.2.1 - FB.6.2.2)
    tugOfWar: {
        isPlaying: false,
        fWest: 20,              // N (0 - 50) Batı (Mavi - Sol)
        fEast: 20,              // N (0 - 50) Doğu (Kırmızı - Sağ)
        netForce: 0,            // N: fEast - fWest
        boxX: 420,              // canvas orta nokta px
        boxBaseX: 420,
        boxSpeed: 0,            // px/s
        isDragging: false,
        winner: null,           // null | "west" | "east"
        cheerParticles: [],
        measurements: []
    },

    // DENEY 6.3: SABİT SÜRATLİ HAREKET SİMÜLATÖRÜ (FB.6.2.3)
    motion: {
        isPlaying: false,
        speed: 10,              // m/s (2 - 25)
        trackLength: 100,       // m (50, 100, 150)
        elapsedTime: 0.0,       // saniye
        distanceTraveled: 0.0,  // metre
        graphMode: "xt",        // "xt" (Yol-Zaman) | "vt" (Sürat-Zaman)
        history: [],            // [{ t, x, v }]
        car: {
            x: 80,              // canvas px
            y: 220,             // canvas px
            w: 110,
            h: 46,
            wheelAngle: 0,
            exhaustParticles: [],
            isDragging: false
        },
        measurements: []
    },

    // DENEY 6.4: YANSIMA KANUNLARI VE AYNALAR SİMÜLATÖRÜ (FB.6.4.1 - FB.6.4.3)
    reflection: {
        mirrorType: "plane",     // "plane" | "concave" | "convex"
        subMode: "smooth",       // "smooth" | "diffuse" (düzlem ayna için)
        sphericalMode: "rays",   // "rays" (Paralel Işınlar) | "candle" (Mum ve Görüntü)
        incidentAngle: 40,       // derece (0 - 75)
        objectDistance: 160,     // mm (50 - 320)
        focalLength: 100,        // mm
        candleHeight: 52,        // px
        isDragging: false,
        measurements: []
    },

    // DENEY 6.5: SIVILARIN YOĞUNLUĞU VE YOĞUNLUK KULESİ (FB.6.5.3 - FB.6.5.4)
    densityTower: {
        activeLiquids: [],       // eklenen sıralı katmanlar
        pouringLiquid: null,     // dökülen sıvı animasyonu
        pourProgress: 0,         // 0 -> 1
        objects: [],             // bırakılan katı cisimler [{ type, density, y, targetY, vy }]
        cylinder: {
            x: 330,
            y: 50,
            w: 160,
            h: 360
        },
        measurements: []
    },

    // DENEY 6.6: TOHUMUN ÇİMLENMESİNE ETKİ EDEN FAKTÖRLER (FB.6.3.3)
    germination: {
        currentDay: 1,           // 1 - 7 gün
        isPlaying: false,
        animProgress: 0.0,
        selectedDish: 1,         // 1, 2, 3, 4
        dishes: [
            { id: 1, name: "1. Kap (İdeal)", water: true, temp: 25, light: false, oxygen: true, sproutProgress: 0.0 },
            { id: 2, name: "2. Kap (Susuz)", water: false, temp: 25, light: false, oxygen: true, sproutProgress: 0.0 },
            { id: 3, name: "3. Kap (0°C Soğuk)", water: true, temp: 0, light: false, oxygen: true, sproutProgress: 0.0 },
            { id: 4, name: "4. Kap (Işıklı)", water: true, temp: 25, light: true, oxygen: true, sproutProgress: 0.0 }
        ],
        measurements: []
    },

    // DENEY 6.7: IŞIĞIN SOĞURULMASI VE RADYOMETRE (FB.6.4.4 - FB.6.4.6)
    absorption: {
        lampOn: true,
        lampPower: 100,          // 0, 25, 50, 100 (%)
        tempBlack: 20.0,
        tempBlue: 20.0,
        tempWhite: 20.0,
        radiometerAngle: 0.0,
        radiometerSpeed: 0.08,
        lightRaysAnim: 0.0,
        measurements: []
    },

    // DENEY 6.8: KATILARDA GENLEŞME VE BÜZÜLME - GRAVZANT HALKASI (FB.6.5.1)
    expansion: {
        step: "cold_pass",       // "cold_pass", "heating", "hot_try", "quenching"
        sphereTemp: 20.0,        // °C (20 - 250)
        sphereRadius: 26.0,      // px (26.0 soğuk -> 32.5 sıcak)
        ringRadius: 29.0,        // px (sabit)
        sphereX: 400,
        sphereY: 150,
        targetY: 150,
        isHeating: false,
        isQuenching: false,
        isPassingThrough: true,  // Soğukken geçer, sıcakken geçemez
        flameParticles: [],
        steamParticles: [],
        measurements: []
    },

    // DENEY 6.9: MADDELERİN ELEKTRİKSEL İLETKENLİĞİ TEST CİHAZI (FB.6.6.1)
    conductivity: {
        selectedMaterial: "copper", // "copper", "iron", "graphite", "wood", "plastic", "eraser", "saltwater", "sugarwater", "lemonwater", "purewater"
        isConductive: true,
        bulbBrightness: 1.0,     // 0.0 to 1.0
        electronParticles: [],
        ionParticles: [],
        measurements: []
    },

    // DENEY 6.10: ELEKTRİKSEL DİRENÇ VE REOSTA SİMÜLATÖRÜ (FB.6.6.2 - FB.6.6.3)
    resistance: {
        mode: "wire",            // "wire" (Tel Faktörleri) | "rheostat" (Reosta)
        wireLength: 10,          // cm (10, 20, 30, 40)
        wireThickness: "thick",  // "thin" (S) | "thick" (2S)
        wireMaterial: "copper",  // "copper" | "iron" | "nichrome"
        rheostatSlider: 20,      // % (0 - 100)
        totalResistanceLevel: "low", // "very_low", "low", "medium", "high", "very_high"
        bulbBrightness: 0.9,     // 0.1 to 1.0
        electronParticles: [],
        isDraggingSlider: false,
        measurements: []
    },

    // DENEY 5.1: AY'IN EVRELERİ VE GÖRÜNÜMÜ SİMÜLATÖRÜ (FB.5.1.3)
    moonPhases: {
        angle: 0.0,              // 0 - 359 derece (0 = Yeni Ay, 90 = İlk Dördün, 180 = Dolunay, 270 = Son Dördün)
        isPlaying: true,
        orbitSpeed: 0.35,        // animasyon hızı
        phaseIndex: 0,           // 0: Yeni Ay, 1: Hilal, 2: İlk Dördün, 3: Şişkin Ay, 4: Dolunay, 5: Şişkin Ay, 6: Son Dördün, 7: Hilal
        phaseName: "Yeni Ay",
        illuminationPercent: 0,
        isDragging: false,
        measurements: []
    },

    // DENEY 5.2: DİNAMOMETRE VE YAY ESNEKLİĞİ (FB.5.2.1 - FB.5.2.2)
    dynamometer: {
        springType: "medium",    // "thin" (max 10N) | "medium" (max 20N) | "thick" (max 40N)
        force: 0,                // 0 - 20 N (asılı ağırlıklar)
        weightsCount: 0,         // her ağırlık 2 N
        currentStretch: 0.0,     // cm cinsinden uzama
        targetStretch: 0.0,
        divisionCount: 0,        // ölçekteki bölme sayısı
        measurements: []
    },

    // DENEY 5.3: SÜRTÜNME KUVVETİ VE YÜZEY TÜRLLERİ (FB.5.2.4)
    friction: {
        surface: "ice",          // "ice" | "wood" | "sand" | "carpet"
        rampHeight: 2,           // 1: Düşük (1 takoz), 2: Orta (2 takoz), 3: Yüksek (3 takoz)
        carState: "ready",       // "ready" | "rolling" | "sliding" | "stopped"
        carX: 130,
        carY: 260,
        carVx: 0,
        distanceTraveled: 0.0,   // metre
        wheelAngle: 0.0,
        skidParticles: [],
        measurements: []
    },

    // DENEY 5.4: IŞIĞIN DOĞRUSAL YAYILMASI (FB.5.4.1)
    lightRect: {
        mode: "cards",           // "cards" (Delikli Levhalar) | "hose" (Boru / Hortum)
        cardsAligned: true,
        middleCardY: 0,          // ofset piksel
        hoseCurved: false,
        lampOn: true,
        beamReachesEnd: true,
        measurements: []
    },

    // DENEY 5.5: TAM GÖLGE VE BOYUT DEĞİŞKENLERİ (FB.5.4.3)
    shadow: {
        sourceDist: 25,          // Fener ile cisim arası mesafe (cm)
        screenDist: 35,          // Cisim ile perde arası mesafe (cm)
        objectRadius: 32,
        shadowDiameter: 14,      // cm
        lampOn: true,
        isDragging: false,
        dragTarget: null,        // "source" | "object" | "screen"
        measurements: []
    },

    // DENEY 5.6: MADDENİN HALLERİ VE SIKIŞTIRILABİLİRLİK (FB.5.5.1)
    compressibility: {
        state: "gas",            // "gas" | "liquid" | "solid"
        forcePercent: 0,         // %0 - %100
        plungerPos: 0.0,         // 0.0 -> 1.0 (sıkışma oranı)
        targetPlungerPos: 0.0,
        particles: [],
        measurements: []
    },

    // DENEY 5.7: SIVILARDA ISI ALIŞVERİŞİ (FB.5.5.3)
    heatExchange: {
        t1: 70,                  // Sıcak su (°C)
        t2: 20,                  // Soğuk su (°C)
        vol1: 100,               // ml
        vol2: 100,               // ml
        isMixed: false,
        mixProgress: 0.0,        // 0.0 -> 1.0
        currentTeq: 45.0,
        heatFlowParticles: [],
        measurements: []
    },

    // DENEY 5.8: SUYUN HÂL DEĞİŞİMİ VE SICAKLIK GRAFİĞİ (FB.5.5.4)
    waterState: {
        isHeating: false,
        speedMultiplier: 1,      // 1 veya 3
        temp: -10.0,             // °C
        elapsedMinutes: 0.0,     // dakika
        phase: "solid",          // "solid" | "melting" | "liquid" | "boiling"
        history: [],             // [{t: dk, temp: °C}]
        flameParticles: [],
        bubbleParticles: [],
        iceMeltRatio: 0.0,       // 0.0 -> 1.0
        measurements: []
    },

    // DENEY 5.10: BASİT DEVREDE AMPUL PARLAKLIĞI (FB.5.6.3)
    circuit: {
        switchClosed: false,
        batteryCount: 1,         // 1 - 3 pil
        bulbCount: 1,            // 1 - 3 ampul
        brightnessLevel: "normal", // "none" | "dim" | "medium" | "bright" | "very_bright"
        electronProgress: 0.0,
        measurements: []
    },

    // REZERVE (5. SINIF 5. ÜNİTE İÇİN SAKLANDI): ISI İLETKENLİĞİ VE YALITIM SİMÜLATÖRÜ
    heatTransfer: {
        mode: "metals",          // "metals" | "insulation"
        isHeating: false,
        burnerIntensity: 1.0,    // Alev gücü
        flameParticles: [],
        rods: [
            { id: "copper", name: "Bakır", k: 385, color: "#f97316", temp: 20, waxMelted: false, ballDropped: false, ballY: 0, dropTime: null },
            { id: "aluminum", name: "Alüminyum", k: 205, color: "#cbd5e1", temp: 20, waxMelted: false, ballDropped: false, ballY: 0, dropTime: null },
            { id: "iron", name: "Demir", k: 80, color: "#94a3b8", temp: 20, waxMelted: false, ballDropped: false, ballY: 0, dropTime: null }
        ],
        elapsedHeatingTime: 0.0,
        insulation: {
            materials: [
                { id: "bare", name: "Sac / Yalıtımsız", rVal: 0.1, tempInside: 20, heatLossRate: 0.45 },
                { id: "wood", name: "Ahşap Kaplama", rVal: 0.5, tempInside: 20, heatLossRate: 0.22 },
                { id: "foam", name: "Taş Yünü / Strafor", rVal: 1.0, tempInside: 20, heatLossRate: 0.07 }
            ]
        },
        measurements: []
    }
};

let canvas = null;
let ctx = null;
let animFrameId = null;
let animTime = 0;

// --- 4. KATALOG VE KABUK YÖNETİCİSİ (CATALOG CONTROLLER) ---
export function initLabModule() {
    setupCatalogDOM();
    setupWorkspaceShellDOM();
    renderCatalog();
}

function setupCatalogDOM() {
    // Sınıf Seçici Butonları
    document.querySelectorAll('.lab-grade-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const grade = parseInt(btn.dataset.grade, 10);
            if (grade === labState.currentGrade) return;

            document.querySelectorAll('.lab-grade-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            labState.currentGrade = grade;
            labState.currentUnitFilter = "all";
            renderCatalog();
        });
    });
}

function renderCatalog() {
    const container = document.getElementById('lab-cards-grid');
    const pillsContainer = document.getElementById('lab-unit-pills');
    if (!container || !pillsContainer) return;

    const gradeExps = EXPERIMENTS_DATABASE.filter(e => e.grade === labState.currentGrade);

    // 1. Üniteler Haritasını Çıkar
    const unitsMap = new Map();
    gradeExps.forEach(e => {
        if (!unitsMap.has(e.unit)) {
            unitsMap.set(e.unit, e.unitName);
        }
    });

    // 2. Üst Filtre Butonları (Tüm Deneyler + Ünite Butonları)
    let pillsHTML = `<button class="lab-pill-btn ${labState.currentUnitFilter === 'all' ? 'active' : ''}" data-unit="all"><i class="fas fa-layer-group"></i> Tüm Deneyler (${gradeExps.length} Deney)</button>`;
    unitsMap.forEach((name, unitNum) => {
        const count = gradeExps.filter(e => e.unit === unitNum).length;
        const isActive = labState.currentUnitFilter === String(unitNum);
        pillsHTML += `<button class="lab-pill-btn ${isActive ? 'active' : ''}" data-unit="${unitNum}">${unitNum}. Ünite (${count})</button>`;
    });
    pillsContainer.innerHTML = pillsHTML;

    // Rozet Tıklama Olayları (Filtreleme & Yumuşak Kaydırma)
    pillsContainer.querySelectorAll('.lab-pill-btn').forEach(pill => {
        pill.addEventListener('click', () => {
            const targetUnit = pill.dataset.unit;
            labState.currentUnitFilter = targetUnit;
            renderCatalog();

            if (targetUnit !== "all") {
                const targetEl = document.getElementById(`unit-section-${targetUnit}`);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            } else {
                const labView = document.getElementById('lab-view');
                if (labView) labView.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    // 3. Deney Kartlarını Ünite Başlık Şeritleri Altında Grupla
    let displayedUnits = Array.from(unitsMap.keys()).sort((a, b) => a - b);
    if (labState.currentUnitFilter !== "all") {
        const selected = parseInt(labState.currentUnitFilter, 10);
        displayedUnits = displayedUnits.filter(u => u === selected);
    }

    if (displayedUnits.length === 0) {
        container.innerHTML = `<div class="lab-empty-catalog"><i class="fas fa-flask"></i><p>Bu filtreye uygun deney bulunamadı.</p></div>`;
        return;
    }

    let fullHTML = "";
    displayedUnits.forEach(unitNum => {
        const unitName = unitsMap.get(unitNum);
        const unitExps = gradeExps.filter(e => e.unit === unitNum);

        let cardsHTML = "";
        unitExps.forEach(exp => {
            const isLive = exp.active;
            cardsHTML += `
                <div class="lab-card ${isLive ? 'pilot-active' : 'upcoming'}">
                    <div class="lab-card-header">
                        <span class="lab-card-grade-badge">${exp.grade}. Sınıf / ${exp.unit}. Ünite</span>
                        ${isLive 
                            ? '<span class="lab-card-status-badge pilot"><i class="fas fa-check-circle"></i> Canlı Simülasyon</span>' 
                            : '<span class="lab-card-status-badge upcoming"><i class="fas fa-tools"></i> Hazırlanıyor</span>'}
                    </div>
                    <h3 class="lab-card-title">${exp.title}</h3>
                    <div class="lab-card-meta">
                        <span><i class="fas fa-book"></i> ${exp.bookRef}</span>
                        <span><i class="fas fa-bullseye"></i> ${exp.code}</span>
                    </div>
                    <p class="lab-card-desc">${exp.desc}</p>
                    <div class="lab-card-footer">
                        ${isLive 
                            ? `<button class="action-btn lab-launch-btn" data-exp-id="${exp.id}"><i class="fas fa-play"></i> Laboratuvara Başla</button>` 
                            : `<button class="action-btn secondary lab-upcoming-btn" data-exp-id="${exp.id}"><i class="fas fa-lock"></i> Faz 2 Kapsamında</button>`}
                    </div>
                </div>
            `;
        });

        fullHTML += `
            <div class="lab-unit-section" id="unit-section-${unitNum}">
                <div class="lab-unit-section-header">
                    <div class="lab-unit-header-left">
                        <span class="lab-unit-num-badge">📌 ${unitNum}. ÜNİTE</span>
                        <h3 class="lab-unit-heading">${unitName}</h3>
                    </div>
                    <span class="lab-unit-count-tag">${unitExps.length} Deney Simülasyonu</span>
                </div>
                <div class="lab-cards-grid">
                    ${cardsHTML}
                </div>
            </div>
        `;
    });

    container.innerHTML = fullHTML;

    // Kart Butonları Olay Dinleyicileri
    container.querySelectorAll('.lab-launch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            openExperimentWorkspace(btn.dataset.expId);
        });
    });

    container.querySelectorAll('.lab-upcoming-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showLabToast("🔬 Bu deney Maarif Modeli Faz 2 kapsamında geliştirilmektedir. Aktif olan Deney 7.3 veya Deney 7.4 simülatörlerini şimdi deneyebilirsiniz!");
        });
    });
}

// Toast Bildirimi
export function showLabToast(message) {
    let toast = document.getElementById('lab-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'lab-toast';
        toast.className = 'lab-toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// --- 5. ÇALIŞMA MASASI VE KABUK BAĞLANTILARI (WORKSPACE CONTROLLER) ---
function setupWorkspaceShellDOM() {
    // 1. Geri Dön Butonları
    const btnBackCatalog = document.getElementById('btn-lab-back-catalog');
    if (btnBackCatalog) btnBackCatalog.addEventListener('click', closeExperimentWorkspace);

    const btnLabBackHome = document.getElementById('btn-lab-back-home');
    if (btnLabBackHome) btnLabBackHome.addEventListener('click', closeLabView);

    // 2. Sıfırla Butonu
    const btnReset = document.getElementById('btn-lab-reset');
    if (btnReset) btnReset.addEventListener('click', resetCurrentExperiment);

    // 3. Tam Ekran Butonu
    const btnFullscreen = document.getElementById('btn-lab-fullscreen');
    if (btnFullscreen) btnFullscreen.addEventListener('click', toggleLabFullscreen);

    // 4. Panel ve Mobil Tab Seçicileri (Masaüstü + Mobil Senkronize)
    document.querySelectorAll('.lab-tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            const tabKey = tabBtn.dataset.tab;
            document.querySelectorAll('.lab-tab-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.tab === tabKey);
            });

            document.querySelectorAll('.lab-tab-pane').forEach(pane => pane.classList.add('is-hidden'));
            const targetPane = document.getElementById(`pane-${tabKey}`);
            if (targetPane) targetPane.classList.remove('is-hidden');
        });
    });

    // 5. DENEY 7.3 KONTROLLERİ (IŞIĞIN KIRILMASI)
    const selMed1 = document.getElementById('select-medium-1');
    const selMed2 = document.getElementById('select-medium-2');
    if (selMed1 && selMed2) {
        selMed1.addEventListener('change', (e) => {
            labState.optics.medium1 = e.target.value;
            calculateOpticsPhysics();
        });
        selMed2.addEventListener('change', (e) => {
            labState.optics.medium2 = e.target.value;
            calculateOpticsPhysics();
        });
    }

    const btnSwap = document.getElementById('btn-swap-mediums');
    if (btnSwap && selMed1 && selMed2) {
        btnSwap.addEventListener('click', () => {
            const temp = labState.optics.medium1;
            labState.optics.medium1 = labState.optics.medium2;
            labState.optics.medium2 = temp;
            selMed1.value = labState.optics.medium1;
            selMed2.value = labState.optics.medium2;
            calculateOpticsPhysics();
            showLabToast(`Ortamlar yer değiştirdi: ${MEDIA_PROPERTIES[labState.optics.medium1].name} ➔ ${MEDIA_PROPERTIES[labState.optics.medium2].name}`);
        });
    }

    const angleRange = document.getElementById('lab-angle-range');
    if (angleRange) {
        angleRange.addEventListener('input', (e) => {
            setIncidentAngle(parseInt(e.target.value, 10));
        });
    }

    const stepBindings = [
        { id: 'btn-angle-minus-5', delta: -5 },
        { id: 'btn-angle-minus-1', delta: -1 },
        { id: 'btn-angle-plus-1', delta: 1 },
        { id: 'btn-angle-plus-5', delta: 5 }
    ];
    stepBindings.forEach(({ id, delta }) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => setIncidentAngle(labState.optics.incidentAngle + delta));
    });

    const btnRecord73 = document.getElementById('btn-record-data');
    if (btnRecord73) btnRecord73.addEventListener('click', recordMeasurement);

    // 5. DENEY 7.1 KONTROLLERİ (FİZİKSEL ANLAMDA İŞ)
    setupWorkControlsDOM();

    // 6. DENEY 7.2 KONTROLLERİ (MEKANİK ENERJİ DÖNÜŞÜMÜ)
    setupEnergyControlsDOM();

    // 7. DENEY 7.4 KONTROLLERİ (MERCEKLER VE ODAKLAMA)
    setupLensControlsDOM();

    // 8. DENEY 7.5 KONTROLLERİ (ÇÖZÜNME HIZI)
    setupDissolveControlsDOM();

    // 9. DENEY 7.6 KONTROLLERİ (KARIŞIMLARIN AYRILMASI)
    setupSeparationControlsDOM();

    // 10. DENEY 7.7 KONTROLLERİ (ELEKTRİKLENME)
    setupElectroControlsDOM();

    // 11. DENEY 7.8 KONTROLLERİ (ELEKTROSKOP VE TOPRAKLAMA)
    setupElectroscopeControlsDOM();

    // 12. DENEY 7.9 KONTROLLERİ (BESİN PİRAMİDİ VE BİYOBİRİKİM)
    setupFoodPyramidControlsDOM();

    // 12.1. DENEY 7.10 KONTROLLERİ (SU AYAK İZİ VE SÜRDÜRÜLEBİLİR TASARRUF)
    setupWaterFootprintControlsDOM();

    // 12.5. 5. SINIF KONTROLLERİ (DENEY 5.1 - 5.10)
    setupMoonPhasesControlsDOM();
    setupDynamometerControlsDOM();
    setupFrictionControlsDOM();
    setupLightRectControlsDOM();
    setupShadowControlsDOM();
    setupCompressibilityControlsDOM();
    setupHeatExchangeControlsDOM();
    setupWaterStateControlsDOM();
    setupCircuitControlsDOM();

    // 13. 6. SINIF KONTROLLERİ (DENEY 6.1 - 6.10)
    setupEclipseControlsDOM();
    setupTugOfWarControlsDOM();
    setupMotionControlsDOM();
    setupReflectionControlsDOM();
    setupDensityTowerControlsDOM();
    setupHeatTransferControlsDOM();
    setupGerminationControlsDOM();
    setupAbsorptionControlsDOM();
    setupExpansionControlsDOM();
    setupConductivityControlsDOM();
    setupResistanceControlsDOM();

    // 7. Tablo Temizle
    const btnClearTable = document.getElementById('btn-clear-table');
    if (btnClearTable) btnClearTable.addEventListener('click', clearMeasurementTable);

    // 8. Canvas Pointer (Mouse & Touch) Etkileşimi
    setupCanvasPointerEvents();
}

function setupLensControlsDOM() {
    // Mercek Tipi Butonları (İnce / Kalın)
    const setLensType = (type) => {
        labState.lens.type = type;
        const isConvex = type === "convex";
        
        ['btn-lens-convex', 'pill-lens-convex'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle('active', isConvex);
        });
        ['btn-lens-concave', 'pill-lens-concave'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle('active', !isConvex);
        });

        calculateLensPhysics();
        showLabToast(isConvex ? "🔍 İnce Kenarlı (Yakınsak) Mercek Seçildi" : "👓 Kalın Kenarlı (Iraksak) Mercek Seçildi");
    };

    const bConv = document.getElementById('btn-lens-convex');
    const pConv = document.getElementById('pill-lens-convex');
    if (bConv) bConv.addEventListener('click', () => setLensType("convex"));
    if (pConv) pConv.addEventListener('click', () => setLensType("convex"));

    const bConc = document.getElementById('btn-lens-concave');
    const pConc = document.getElementById('pill-lens-concave');
    if (bConc) bConc.addEventListener('click', () => setLensType("concave"));
    if (pConc) pConc.addEventListener('click', () => setLensType("concave"));

    // Işık / Deney Modu Butonları (Paralel / Mum)
    const setLensMode = (mode) => {
        labState.lens.mode = mode;
        const isParallel = mode === "parallel";

        ['btn-mode-parallel', 'pill-mode-parallel'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle('active', isParallel);
        });
        ['btn-mode-object', 'pill-mode-object'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.toggle('active', !isParallel);
        });

        const wrapObj = document.getElementById('wrap-object-distance');
        if (wrapObj) wrapObj.style.display = isParallel ? "none" : "flex";

        calculateLensPhysics();
        showLabToast(isParallel ? "⚡ Paralel Işın Demeti Modu Aktif" : "🕯️ Mum ve Cisim Görüntüsü Modu Aktif");
    };

    const bPar = document.getElementById('btn-mode-parallel');
    const pPar = document.getElementById('pill-mode-parallel');
    if (bPar) bPar.addEventListener('click', () => setLensMode("parallel"));
    if (pPar) pPar.addEventListener('click', () => setLensMode("parallel"));

    const bObj = document.getElementById('btn-mode-object');
    const pObj = document.getElementById('pill-mode-object');
    if (bObj) bObj.addEventListener('click', () => setLensMode("object"));
    if (pObj) pObj.addEventListener('click', () => setLensMode("object"));

    // Cisim Mesafesi Slider'ı (do)
    const objRange = document.getElementById('lab-object-range');
    const objDisplay = document.getElementById('lab-object-display');
    if (objRange) {
        objRange.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            labState.lens.objectDistance = val;
            if (objDisplay) objDisplay.textContent = `${val} mm`;
            calculateLensPhysics();
        });
    }

    // Odak Uzaklığı Slider'ı (f)
    const focalRange = document.getElementById('lab-focal-range');
    const focalDisplay = document.getElementById('lab-focal-display');
    if (focalRange) {
        focalRange.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            labState.lens.focalLength = val;
            if (focalDisplay) focalDisplay.textContent = `${val} mm`;
            calculateLensPhysics();
        });
    }

    // Deney 7.4 Veri Kaydet Butonu
    const btnRecord74 = document.getElementById('btn-record-data-7-4');
    if (btnRecord74) btnRecord74.addEventListener('click', recordMeasurement);
}

export function openLabView() {
    renderCatalog();
    const catalogView = document.getElementById('lab-catalog-view');
    const workspaceView = document.getElementById('lab-workspace-view');
    const labView = document.getElementById('lab-view');
    if (catalogView) catalogView.classList.remove('is-hidden');
    if (workspaceView) workspaceView.classList.add('is-hidden');
    if (labView) {
        labView.classList.remove('is-hidden');
        labView.scrollTop = 0;
    }
    window.scrollTo(0, 0);
}

export function closeLabView() {
    if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
    }
    labState.activeExperimentId = null;

    const labView = document.getElementById('lab-view');
    const catalogView = document.getElementById('lab-catalog-view');
    const workspaceView = document.getElementById('lab-workspace-view');
    const homeScene = (window.scenes && window.scenes.home) || document.getElementById('scene-home');

    if (catalogView) catalogView.classList.add('is-hidden');
    if (workspaceView) workspaceView.classList.add('is-hidden');

    if (typeof window.switchScene === "function" && labView && homeScene) {
        window.switchScene(labView, homeScene);
    } else {
        if (labView) labView.classList.add('is-hidden');
        if (homeScene) homeScene.classList.remove('is-hidden');
    }
    window.scrollTo(0, 0);
}

export function openExperimentWorkspace(expId) {
    const exp = EXPERIMENTS_DATABASE.find(e => e.id === expId);
    if (!exp) return;

    labState.activeExperimentId = expId;

    const catalogView = document.getElementById('lab-catalog-view');
    const workspaceView = document.getElementById('lab-workspace-view');
    const labView = document.getElementById('lab-view');
    if (catalogView) catalogView.classList.add('is-hidden');
    if (workspaceView) workspaceView.classList.remove('is-hidden');
    if (labView) labView.scrollTop = 0;
    window.scrollTo(0, 0);

    // Sekmeleri Değişkenler (vars) moduna sıfırla
    document.querySelectorAll('.lab-tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === 'vars');
    });
    document.querySelectorAll('.lab-tab-pane').forEach(pane => pane.classList.add('is-hidden'));
    const paneVars = document.getElementById('pane-vars');
    if (paneVars) paneVars.classList.remove('is-hidden');

    // Başlık ve Rozetleri Güncelle
    const expBadge = document.getElementById('lab-exp-badge');
    const expTitle = document.getElementById('lab-exp-title');
    const expRef = document.getElementById('lab-exp-ref');
    if (expBadge) expBadge.textContent = `${exp.grade}. Sınıf / ${exp.unit}. Ünite · ${exp.code}`;
    if (expTitle) expTitle.textContent = `${exp.id}: ${exp.title}`;
    if (expRef) expRef.textContent = exp.bookRef;

    // Deneye Göre Arayüz Panellerini Aç / Kapat
    const is51 = (expId === "5.1");
    const is52 = (expId === "5.2");
    const is53 = (expId === "5.3");
    const is54 = (expId === "5.4");
    const is55 = (expId === "5.5");
    const is56 = (expId === "5.6");
    const is57 = (expId === "5.7");
    const is58 = (expId === "5.8");
    const is59 = (expId === "5.9");
    const is510 = (expId === "5.10");
    const is61 = (expId === "6.1");
    const is62 = (expId === "6.2");
    const is63 = (expId === "6.3");
    const is64 = (expId === "6.4");
    const is65 = (expId === "6.5");
    const is66 = (expId === "6.6");
    const is67 = (expId === "6.7");
    const is68 = (expId === "6.8");
    const is69 = (expId === "6.9");
    const is610 = (expId === "6.10");
    const is71 = (expId === "7.1");
    const is72 = (expId === "7.2");
    const is73 = (expId === "7.3");
    const is74 = (expId === "7.4");
    const is75 = (expId === "7.5");
    const is76 = (expId === "7.6");
    const is77 = (expId === "7.7");
    const is78 = (expId === "7.8");
    const is79 = (expId === "7.9");
    const is710 = (expId === "7.10");

    // Metrik Şeritleri (Canvas Altı Responsive Barlar)
    const mbar51 = document.getElementById('metrics-bar-5-1');
    const mbar52 = document.getElementById('metrics-bar-5-2');
    const mbar53 = document.getElementById('metrics-bar-5-3');
    const mbar54 = document.getElementById('metrics-bar-5-4');
    const mbar55 = document.getElementById('metrics-bar-5-5');
    const mbar56 = document.getElementById('metrics-bar-5-6');
    const mbar57 = document.getElementById('metrics-bar-5-7');
    const mbar58 = document.getElementById('metrics-bar-5-8');
    const mbar59 = document.getElementById('metrics-bar-5-9');
    const mbar510 = document.getElementById('metrics-bar-5-10');
    if (mbar51) mbar51.classList.toggle('is-hidden', !is51);
    if (mbar52) mbar52.classList.toggle('is-hidden', !is52);
    if (mbar53) mbar53.classList.toggle('is-hidden', !is53);
    if (mbar54) mbar54.classList.toggle('is-hidden', !is54);
    if (mbar55) mbar55.classList.toggle('is-hidden', !is55);
    if (mbar56) mbar56.classList.toggle('is-hidden', !is56);
    if (mbar57) mbar57.classList.toggle('is-hidden', !is57);
    if (mbar58) mbar58.classList.toggle('is-hidden', !is58);
    if (mbar59) mbar59.classList.toggle('is-hidden', !is59);
    if (mbar510) mbar510.classList.toggle('is-hidden', !is510);
    const mbar61 = document.getElementById('metrics-bar-6-1');
    const mbar62 = document.getElementById('metrics-bar-6-2');
    const mbar63 = document.getElementById('metrics-bar-6-3');
    const mbar64 = document.getElementById('metrics-bar-6-4');
    const mbar65 = document.getElementById('metrics-bar-6-5');
    const mbar66 = document.getElementById('metrics-bar-6-6');
    const mbar67 = document.getElementById('metrics-bar-6-7');
    const mbar68 = document.getElementById('metrics-bar-6-8');
    const mbar69 = document.getElementById('metrics-bar-6-9');
    const mbar610 = document.getElementById('metrics-bar-6-10');
    const mbar71 = document.getElementById('metrics-bar-7-1');
    const mbar72 = document.getElementById('metrics-bar-7-2');
    const mbar73 = document.getElementById('metrics-bar-7-3');
    const mbar74 = document.getElementById('metrics-bar-7-4');
    const mbar75 = document.getElementById('metrics-bar-7-5');
    const mbar76 = document.getElementById('metrics-bar-7-6');
    const mbar77 = document.getElementById('metrics-bar-7-7');
    const mbar78 = document.getElementById('metrics-bar-7-8');
    const mbar79 = document.getElementById('metrics-bar-7-9');
    const mbar710 = document.getElementById('metrics-bar-7-10');
    if (mbar61) mbar61.classList.toggle('is-hidden', !is61);
    if (mbar62) mbar62.classList.toggle('is-hidden', !is62);
    if (mbar63) mbar63.classList.toggle('is-hidden', !is63);
    if (mbar64) mbar64.classList.toggle('is-hidden', !is64);
    if (mbar65) mbar65.classList.toggle('is-hidden', !is65);
    if (mbar66) mbar66.classList.toggle('is-hidden', !is66);
    if (mbar67) mbar67.classList.toggle('is-hidden', !is67);
    if (mbar68) mbar68.classList.toggle('is-hidden', !is68);
    if (mbar69) mbar69.classList.toggle('is-hidden', !is69);
    if (mbar610) mbar610.classList.toggle('is-hidden', !is610);
    if (mbar71) mbar71.classList.toggle('is-hidden', !is71);
    if (mbar72) mbar72.classList.toggle('is-hidden', !is72);
    if (mbar73) mbar73.classList.toggle('is-hidden', !is73);
    if (mbar74) mbar74.classList.toggle('is-hidden', !is74);
    if (mbar75) mbar75.classList.toggle('is-hidden', !is75);
    if (mbar76) mbar76.classList.toggle('is-hidden', !is76);
    if (mbar77) mbar77.classList.toggle('is-hidden', !is77);
    if (mbar78) mbar78.classList.toggle('is-hidden', !is78);
    if (mbar79) mbar79.classList.toggle('is-hidden', !is79);
    if (mbar710) mbar710.classList.toggle('is-hidden', !is710);

    // Hızlı Kontroller (Canvas Altı)
    const qc51 = document.getElementById('quick-controls-5-1');
    const qc52 = document.getElementById('quick-controls-5-2');
    const qc53 = document.getElementById('quick-controls-5-3');
    const qc54 = document.getElementById('quick-controls-5-4');
    const qc55 = document.getElementById('quick-controls-5-5');
    const qc56 = document.getElementById('quick-controls-5-6');
    const qc57 = document.getElementById('quick-controls-5-7');
    const qc58 = document.getElementById('quick-controls-5-8');
    const qc59 = document.getElementById('quick-controls-5-9');
    const qc510 = document.getElementById('quick-controls-5-10');
    if (qc51) qc51.classList.toggle('is-hidden', !is51);
    if (qc52) qc52.classList.toggle('is-hidden', !is52);
    if (qc53) qc53.classList.toggle('is-hidden', !is53);
    if (qc54) qc54.classList.toggle('is-hidden', !is54);
    if (qc55) qc55.classList.toggle('is-hidden', !is55);
    if (qc56) qc56.classList.toggle('is-hidden', !is56);
    if (qc57) qc57.classList.toggle('is-hidden', !is57);
    if (qc58) qc58.classList.toggle('is-hidden', !is58);
    if (qc59) qc59.classList.toggle('is-hidden', !is59);
    if (qc510) qc510.classList.toggle('is-hidden', !is510);
    const qc61 = document.getElementById('quick-controls-6-1');
    const qc62 = document.getElementById('quick-controls-6-2');
    const qc63 = document.getElementById('quick-controls-6-3');
    const qc64 = document.getElementById('quick-controls-6-4');
    const qc65 = document.getElementById('quick-controls-6-5');
    const qc66 = document.getElementById('quick-controls-6-6');
    const qc67 = document.getElementById('quick-controls-6-7');
    const qc68 = document.getElementById('quick-controls-6-8');
    const qc69 = document.getElementById('quick-controls-6-9');
    const qc610 = document.getElementById('quick-controls-6-10');
    const qc71 = document.getElementById('quick-controls-7-1');
    const qc72 = document.getElementById('quick-controls-7-2');
    const qc73 = document.getElementById('quick-controls-7-3');
    const qc74 = document.getElementById('quick-controls-7-4');
    const qc75 = document.getElementById('quick-controls-7-5');
    const qc76 = document.getElementById('quick-controls-7-6');
    const qc77 = document.getElementById('quick-controls-7-7');
    const qc78 = document.getElementById('quick-controls-7-8');
    const qc79 = document.getElementById('quick-controls-7-9');
    const qc710 = document.getElementById('quick-controls-7-10');
    if (qc61) qc61.classList.toggle('is-hidden', !is61);
    if (qc62) qc62.classList.toggle('is-hidden', !is62);
    if (qc63) qc63.classList.toggle('is-hidden', !is63);
    if (qc64) qc64.classList.toggle('is-hidden', !is64);
    if (qc65) qc65.classList.toggle('is-hidden', !is65);
    if (qc66) qc66.classList.toggle('is-hidden', !is66);
    if (qc67) qc67.classList.toggle('is-hidden', !is67);
    if (qc68) qc68.classList.toggle('is-hidden', !is68);
    if (qc69) qc69.classList.toggle('is-hidden', !is69);
    if (qc610) qc610.classList.toggle('is-hidden', !is610);
    if (qc71) qc71.classList.toggle('is-hidden', !is71);
    if (qc72) qc72.classList.toggle('is-hidden', !is72);
    if (qc73) qc73.classList.toggle('is-hidden', !is73);
    if (qc74) qc74.classList.toggle('is-hidden', !is74);
    if (qc75) qc75.classList.toggle('is-hidden', !is75);
    if (qc76) qc76.classList.toggle('is-hidden', !is76);
    if (qc77) qc77.classList.toggle('is-hidden', !is77);
    if (qc78) qc78.classList.toggle('is-hidden', !is78);
    if (qc79) qc79.classList.toggle('is-hidden', !is79);
    if (qc710) qc710.classList.toggle('is-hidden', !is710);

    // Değişkenler Panelleri
    const vars51 = document.getElementById('vars-container-5-1');
    const vars52 = document.getElementById('vars-container-5-2');
    const vars53 = document.getElementById('vars-container-5-3');
    const vars54 = document.getElementById('vars-container-5-4');
    const vars55 = document.getElementById('vars-container-5-5');
    const vars56 = document.getElementById('vars-container-5-6');
    const vars57 = document.getElementById('vars-container-5-7');
    const vars58 = document.getElementById('vars-container-5-8');
    const vars59 = document.getElementById('vars-container-5-9');
    const vars510 = document.getElementById('vars-container-5-10');
    if (vars51) vars51.classList.toggle('is-hidden', !is51);
    if (vars52) vars52.classList.toggle('is-hidden', !is52);
    if (vars53) vars53.classList.toggle('is-hidden', !is53);
    if (vars54) vars54.classList.toggle('is-hidden', !is54);
    if (vars55) vars55.classList.toggle('is-hidden', !is55);
    if (vars56) vars56.classList.toggle('is-hidden', !is56);
    if (vars57) vars57.classList.toggle('is-hidden', !is57);
    if (vars58) vars58.classList.toggle('is-hidden', !is58);
    if (vars59) vars59.classList.toggle('is-hidden', !is59);
    if (vars510) vars510.classList.toggle('is-hidden', !is510);
    const vars61 = document.getElementById('vars-container-6-1');
    const vars62 = document.getElementById('vars-container-6-2');
    const vars63 = document.getElementById('vars-container-6-3');
    const vars64 = document.getElementById('vars-container-6-4');
    const vars65 = document.getElementById('vars-container-6-5');
    const vars66 = document.getElementById('vars-container-6-6');
    const vars67 = document.getElementById('vars-container-6-7');
    const vars68 = document.getElementById('vars-container-6-8');
    const vars69 = document.getElementById('vars-container-6-9');
    const vars610 = document.getElementById('vars-container-6-10');
    const vars71 = document.getElementById('vars-container-7-1');
    const vars72 = document.getElementById('vars-container-7-2');
    const vars73 = document.getElementById('vars-container-7-3');
    const vars74 = document.getElementById('vars-container-7-4');
    const vars75 = document.getElementById('vars-container-7-5');
    const vars76 = document.getElementById('vars-container-7-6');
    const vars77 = document.getElementById('vars-container-7-7');
    const vars78 = document.getElementById('vars-container-7-8');
    const vars79 = document.getElementById('vars-container-7-9');
    const vars710 = document.getElementById('vars-container-7-10');
    if (vars61) vars61.classList.toggle('is-hidden', !is61);
    if (vars62) vars62.classList.toggle('is-hidden', !is62);
    if (vars63) vars63.classList.toggle('is-hidden', !is63);
    if (vars64) vars64.classList.toggle('is-hidden', !is64);
    if (vars65) vars65.classList.toggle('is-hidden', !is65);
    if (vars66) vars66.classList.toggle('is-hidden', !is66);
    if (vars67) vars67.classList.toggle('is-hidden', !is67);
    if (vars68) vars68.classList.toggle('is-hidden', !is68);
    if (vars69) vars69.classList.toggle('is-hidden', !is69);
    if (vars610) vars610.classList.toggle('is-hidden', !is610);
    if (vars71) vars71.classList.toggle('is-hidden', !is71);
    if (vars72) vars72.classList.toggle('is-hidden', !is72);
    if (vars73) vars73.classList.toggle('is-hidden', !is73);
    if (vars74) vars74.classList.toggle('is-hidden', !is74);
    if (vars75) vars75.classList.toggle('is-hidden', !is75);
    if (vars76) vars76.classList.toggle('is-hidden', !is76);
    if (vars77) vars77.classList.toggle('is-hidden', !is77);
    if (vars78) vars78.classList.toggle('is-hidden', !is78);
    if (vars79) vars79.classList.toggle('is-hidden', !is79);
    if (vars710) vars710.classList.toggle('is-hidden', !is710);

    // Rehber Panelleri
    const guide51 = document.getElementById('guide-container-5-1');
    const guide52 = document.getElementById('guide-container-5-2');
    const guide53 = document.getElementById('guide-container-5-3');
    const guide54 = document.getElementById('guide-container-5-4');
    const guide55 = document.getElementById('guide-container-5-5');
    const guide56 = document.getElementById('guide-container-5-6');
    const guide57 = document.getElementById('guide-container-5-7');
    const guide58 = document.getElementById('guide-container-5-8');
    const guide59 = document.getElementById('guide-container-5-9');
    const guide510 = document.getElementById('guide-container-5-10');
    if (guide51) guide51.classList.toggle('is-hidden', !is51);
    if (guide52) guide52.classList.toggle('is-hidden', !is52);
    if (guide53) guide53.classList.toggle('is-hidden', !is53);
    if (guide54) guide54.classList.toggle('is-hidden', !is54);
    if (guide55) guide55.classList.toggle('is-hidden', !is55);
    if (guide56) guide56.classList.toggle('is-hidden', !is56);
    if (guide57) guide57.classList.toggle('is-hidden', !is57);
    if (guide58) guide58.classList.toggle('is-hidden', !is58);
    if (guide59) guide59.classList.toggle('is-hidden', !is59);
    if (guide510) guide510.classList.toggle('is-hidden', !is510);
    const guide61 = document.getElementById('guide-container-6-1');
    const guide62 = document.getElementById('guide-container-6-2');
    const guide63 = document.getElementById('guide-container-6-3');
    const guide64 = document.getElementById('guide-container-6-4');
    const guide65 = document.getElementById('guide-container-6-5');
    const guide66 = document.getElementById('guide-container-6-6');
    const guide67 = document.getElementById('guide-container-6-7');
    const guide68 = document.getElementById('guide-container-6-8');
    const guide69 = document.getElementById('guide-container-6-9');
    const guide610 = document.getElementById('guide-container-6-10');
    const guide71 = document.getElementById('guide-container-7-1');
    const guide72 = document.getElementById('guide-container-7-2');
    const guide73 = document.getElementById('guide-container-7-3');
    const guide74 = document.getElementById('guide-container-7-4');
    const guide75 = document.getElementById('guide-container-7-5');
    const guide76 = document.getElementById('guide-container-7-6');
    const guide77 = document.getElementById('guide-container-7-7');
    const guide78 = document.getElementById('guide-container-7-8');
    const guide79 = document.getElementById('guide-container-7-9');
    const guide710 = document.getElementById('guide-container-7-10');
    if (guide61) guide61.classList.toggle('is-hidden', !is61);
    if (guide62) guide62.classList.toggle('is-hidden', !is62);
    if (guide63) guide63.classList.toggle('is-hidden', !is63);
    if (guide64) guide64.classList.toggle('is-hidden', !is64);
    if (guide65) guide65.classList.toggle('is-hidden', !is65);
    if (guide66) guide66.classList.toggle('is-hidden', !is66);
    if (guide67) guide67.classList.toggle('is-hidden', !is67);
    if (guide68) guide68.classList.toggle('is-hidden', !is68);
    if (guide69) guide69.classList.toggle('is-hidden', !is69);
    if (guide610) guide610.classList.toggle('is-hidden', !is610);
    if (guide71) guide71.classList.toggle('is-hidden', !is71);
    if (guide72) guide72.classList.toggle('is-hidden', !is72);
    if (guide73) guide73.classList.toggle('is-hidden', !is73);
    if (guide74) guide74.classList.toggle('is-hidden', !is74);
    if (guide75) guide75.classList.toggle('is-hidden', !is75);
    if (guide76) guide76.classList.toggle('is-hidden', !is76);
    if (guide77) guide77.classList.toggle('is-hidden', !is77);
    if (guide78) guide78.classList.toggle('is-hidden', !is78);
    if (guide79) guide79.classList.toggle('is-hidden', !is79);
    if (guide710) guide710.classList.toggle('is-hidden', !is710);

    if (is51) {
        initMoonPhasesState();
    } else if (is52) {
        initDynamometerState();
    } else if (is53) {
        initFrictionState();
    } else if (is54) {
        initLightRectState();
    } else if (is55) {
        initShadowState();
    } else if (is56) {
        initCompressibilityState();
    } else if (is57) {
        initHeatExchangeState();
    } else if (is58) {
        initWaterStateState();
    } else if (is59) {
        initHeatTransferState();
    } else if (is510) {
        initCircuitState();
    } else if (is61) {
        initEclipseState();
    } else if (is62) {
        initTugOfWarState();
    } else if (is63) {
        initMotionState();
    } else if (is64) {
        initReflectionState();
    } else if (is65) {
        initDensityTowerState();
    } else if (is66) {
        initGerminationState();
    } else if (is67) {
        initAbsorptionState();
    } else if (is68) {
        initExpansionState();
    } else if (is69) {
        initConductivityState();
    } else if (is610) {
        initResistanceState();
    } else if (is71) {
        initWorkState();
    } else if (is72) {
        initEnergyState();
    } else if (is75) {
        initSeparationState();
    } else if (is76) {
        initDissolveState();
    } else if (is77) {
        initElectroState();
    } else if (is78) {
        initElectroscopeState();
    } else if (is79) {
        initFoodPyramidState();
    } else if (is710) {
        initWaterFootprintState();
    }

    // Veri Tablosu Başlıklarını Güncelle
    updateTableHeader(expId);
    renderMeasurementTable();

    // Canvas Fizik Motorunu Başlat
    initExperimentCanvas();
}

export function closeExperimentWorkspace() {
    if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
    }
    labState.activeExperimentId = null;

    const catalogView = document.getElementById('lab-catalog-view');
    const workspaceView = document.getElementById('lab-workspace-view');
    const labView = document.getElementById('lab-view');
    if (catalogView) catalogView.classList.remove('is-hidden');
    if (workspaceView) workspaceView.classList.add('is-hidden');
    renderCatalog();
    if (labView) labView.scrollTop = 0;
    window.scrollTo(0, 0);
}

function resetCurrentExperiment() {
    if (labState.activeExperimentId === "5.1") {
        resetMoonPhasesExperiment();
    } else if (labState.activeExperimentId === "5.2") {
        resetDynamometerExperiment();
    } else if (labState.activeExperimentId === "5.3") {
        resetFrictionExperiment();
    } else if (labState.activeExperimentId === "5.4") {
        resetLightRectExperiment();
    } else if (labState.activeExperimentId === "5.5") {
        resetShadowExperiment();
    } else if (labState.activeExperimentId === "5.6") {
        resetCompressibilityExperiment();
    } else if (labState.activeExperimentId === "5.7") {
        resetHeatExchangeExperiment();
    } else if (labState.activeExperimentId === "5.8") {
        resetWaterStateExperiment();
    } else if (labState.activeExperimentId === "5.9") {
        resetHeatTransferExperiment();
    } else if (labState.activeExperimentId === "5.10") {
        resetCircuitExperiment();
    } else if (labState.activeExperimentId === "6.1") {
        resetEclipseExperiment();
    } else if (labState.activeExperimentId === "6.2") {
        resetTugOfWarExperiment();
    } else if (labState.activeExperimentId === "6.3") {
        resetMotionExperiment();
    } else if (labState.activeExperimentId === "6.4") {
        resetReflectionExperiment();
    } else if (labState.activeExperimentId === "6.5") {
        resetDensityTowerExperiment();
    } else if (labState.activeExperimentId === "6.6") {
        resetGerminationExperiment();
    } else if (labState.activeExperimentId === "6.7") {
        resetAbsorptionExperiment();
    } else if (labState.activeExperimentId === "6.8") {
        resetExpansionExperiment();
    } else if (labState.activeExperimentId === "6.9") {
        resetConductivityExperiment();
    } else if (labState.activeExperimentId === "6.10") {
        resetResistanceExperiment();
    } else if (labState.activeExperimentId === "7.1") {
        resetWorkExperiment();
    } else if (labState.activeExperimentId === "7.2") {
        resetEnergyExperiment();
    } else if (labState.activeExperimentId === "7.5") {
        resetSeparationExperiment();
    } else if (labState.activeExperimentId === "7.6") {
        resetDissolveExperiment();
    } else if (labState.activeExperimentId === "7.7") {
        resetElectroExperiment();
    } else if (labState.activeExperimentId === "7.8") {
        resetElectroscopeExperiment();
    } else if (labState.activeExperimentId === "7.9") {
        resetFoodPyramidExperiment();
    } else if (labState.activeExperimentId === "7.10") {
        resetWaterFootprintExperiment();
    } else if (labState.activeExperimentId === "7.3") {
        labState.optics.medium1 = "air";
        labState.optics.medium2 = "water";
        labState.optics.incidentAngle = 30;

        const selMed1 = document.getElementById('select-medium-1');
        const selMed2 = document.getElementById('select-medium-2');
        if (selMed1) selMed1.value = "air";
        if (selMed2) selMed2.value = "water";

        const angleRange = document.getElementById('lab-angle-range');
        if (angleRange) angleRange.value = 30;

        calculateOpticsPhysics();
        showLabToast("Simülasyon başlangıç ayarlarına sıfırlandı (Hava ➔ Su, 30°)");
    } else if (labState.activeExperimentId === "7.4") {
        labState.lens.type = "convex";
        labState.lens.mode = "parallel";
        labState.lens.focalLength = 120;
        labState.lens.objectDistance = 200;

        const objRange = document.getElementById('lab-object-range');
        const focalRange = document.getElementById('lab-focal-range');
        if (objRange) objRange.value = 200;
        if (focalRange) focalRange.value = 120;

        const objDisplay = document.getElementById('lab-object-display');
        const focalDisplay = document.getElementById('lab-focal-display');
        if (objDisplay) objDisplay.textContent = "200 mm";
        if (focalDisplay) focalDisplay.textContent = "120 mm";

        ['btn-lens-convex', 'pill-lens-convex', 'btn-mode-parallel', 'pill-mode-parallel'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('active');
        });
        ['btn-lens-concave', 'pill-lens-concave', 'btn-mode-object', 'pill-mode-object'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove('active');
        });

        const wrapObj = document.getElementById('wrap-object-distance');
        if (wrapObj) wrapObj.style.display = "none";

        calculateLensPhysics();
        showLabToast("Mercek simülatörü sıfırlandı (İnce Kenarlı, Paralel Işın, f = 120 mm)");
    }
}

function toggleLabFullscreen() {
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    if (!isFull) {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
        showLabToast("Laboratuvar tam ekran moduna alındı");
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

// --- 6. CANVAS ÇİZİM VE MOTOR BAŞLATICI ---
function initExperimentCanvas() {
    canvas = document.getElementById('lab-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (labState.activeExperimentId === "5.1") {
        initMoonPhasesState();
    } else if (labState.activeExperimentId === "5.2") {
        initDynamometerState();
    } else if (labState.activeExperimentId === "5.3") {
        initFrictionState();
    } else if (labState.activeExperimentId === "5.4") {
        initLightRectState();
    } else if (labState.activeExperimentId === "5.5") {
        initShadowState();
    } else if (labState.activeExperimentId === "5.6") {
        initCompressibilityState();
    } else if (labState.activeExperimentId === "5.7") {
        initHeatExchangeState();
    } else if (labState.activeExperimentId === "5.8") {
        initWaterStateState();
    } else if (labState.activeExperimentId === "5.9") {
        initHeatTransferState();
    } else if (labState.activeExperimentId === "5.10") {
        initCircuitState();
    } else if (labState.activeExperimentId === "6.1") {
        initEclipseState();
    } else if (labState.activeExperimentId === "6.2") {
        initTugOfWarState();
    } else if (labState.activeExperimentId === "6.3") {
        initMotionState();
    } else if (labState.activeExperimentId === "6.4") {
        initReflectionState();
    } else if (labState.activeExperimentId === "6.5") {
        initDensityTowerState();
    } else if (labState.activeExperimentId === "6.6") {
        initGerminationState();
    } else if (labState.activeExperimentId === "6.7") {
        initAbsorptionState();
    } else if (labState.activeExperimentId === "6.8") {
        initExpansionState();
    } else if (labState.activeExperimentId === "6.9") {
        initConductivityState();
    } else if (labState.activeExperimentId === "6.10") {
        initResistanceState();
    } else if (labState.activeExperimentId === "7.1") {
        initWorkState();
    } else if (labState.activeExperimentId === "7.2") {
        initEnergyState();
    } else if (labState.activeExperimentId === "7.3") {
        calculateOpticsPhysics();
    } else if (labState.activeExperimentId === "7.4") {
        calculateLensPhysics();
    } else if (labState.activeExperimentId === "7.5") {
        initSeparationState();
    } else if (labState.activeExperimentId === "7.6") {
        initDissolveState();
    } else if (labState.activeExperimentId === "7.7") {
        initElectroState();
    } else if (labState.activeExperimentId === "7.8") {
        initElectroscopeState();
    } else if (labState.activeExperimentId === "7.9") {
        initFoodPyramidState();
    } else if (labState.activeExperimentId === "7.10") {
        initWaterFootprintState();
    }

    startRenderLoop();
}

function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round((rect.width * (500 / 800)) * dpr);
    }
}

function startRenderLoop() {
    if (animFrameId) cancelAnimationFrame(animFrameId);

    const render = () => {
        animTime += 0.05;
        if (ctx && canvas) {
            if (labState.activeExperimentId === "5.1") {
                updateMoonPhasesPhysics();
                drawMoonPhasesSimulation();
            } else if (labState.activeExperimentId === "5.2") {
                updateDynamometerPhysics();
                drawDynamometerSimulation();
            } else if (labState.activeExperimentId === "5.3") {
                updateFrictionPhysics();
                drawFrictionSimulation();
            } else if (labState.activeExperimentId === "5.4") {
                updateLightRectPhysics();
                drawLightRectSimulation();
            } else if (labState.activeExperimentId === "5.5") {
                updateShadowPhysics();
                drawShadowSimulation();
            } else if (labState.activeExperimentId === "5.6") {
                updateCompressibilityPhysics();
                drawCompressibilitySimulation();
            } else if (labState.activeExperimentId === "5.7") {
                updateHeatExchangePhysics();
                drawHeatExchangeSimulation();
            } else if (labState.activeExperimentId === "5.8") {
                updateWaterStatePhysics();
                drawWaterStateSimulation();
            } else if (labState.activeExperimentId === "5.9") {
                updateHeatTransferPhysics();
                drawHeatTransferSimulation();
            } else if (labState.activeExperimentId === "5.10") {
                updateCircuitPhysics();
                drawCircuitSimulation();
            } else if (labState.activeExperimentId === "6.1") {
                updateEclipsePhysics();
                drawEclipseSimulation();
            } else if (labState.activeExperimentId === "6.2") {
                updateTugOfWarPhysics();
                drawTugOfWarSimulation();
            } else if (labState.activeExperimentId === "6.3") {
                updateMotionPhysics();
                drawMotionSimulation();
            } else if (labState.activeExperimentId === "6.4") {
                updateReflectionPhysics();
                drawReflectionSimulation();
            } else if (labState.activeExperimentId === "6.5") {
                updateDensityTowerPhysics();
                drawDensityTowerSimulation();
            } else if (labState.activeExperimentId === "6.6") {
                updateGerminationPhysics();
                drawGerminationSimulation();
            } else if (labState.activeExperimentId === "6.7") {
                updateAbsorptionPhysics();
                drawAbsorptionSimulation();
            } else if (labState.activeExperimentId === "6.8") {
                updateExpansionPhysics();
                drawExpansionSimulation();
            } else if (labState.activeExperimentId === "6.9") {
                updateConductivityPhysics();
                drawConductivitySimulation();
            } else if (labState.activeExperimentId === "6.10") {
                updateResistancePhysics();
                drawResistanceSimulation();
            } else if (labState.activeExperimentId === "7.1") {
                updateWorkPhysics();
                drawWorkSimulation();
            } else if (labState.activeExperimentId === "7.2") {
                updateEnergyPhysics();
                drawEnergySimulation();
            } else if (labState.activeExperimentId === "7.3") {
                drawOpticsSimulation();
            } else if (labState.activeExperimentId === "7.4") {
                drawLensSimulation();
            } else if (labState.activeExperimentId === "7.5") {
                updateSeparationPhysics();
                drawSeparationSimulation();
            } else if (labState.activeExperimentId === "7.6") {
                updateDissolvePhysics();
                drawDissolveSimulation();
            } else if (labState.activeExperimentId === "7.7") {
                updateElectroPhysics();
                drawElectroSimulation();
            } else if (labState.activeExperimentId === "7.8") {
                updateElectroscopePhysics();
                drawElectroscopeSimulation();
            } else if (labState.activeExperimentId === "7.9") {
                updateFoodPyramidEcology();
                drawFoodPyramidSimulation();
            } else if (labState.activeExperimentId === "7.10") {
                updateWaterFootprintPhysics();
                drawWaterFootprintSimulation();
            }
        }
        if (labState.activeExperimentId) {
            animFrameId = requestAnimationFrame(render);
        }
    };
    animFrameId = requestAnimationFrame(render);
}

// ============================================================================
// --- 6.1. DENEY 6.1: GÜNEŞ VE AY TUTULMALARI SİMÜLATÖRÜ (FB.6.1.3 - FB.6.1.4) ---
// ============================================================================

function initEclipseState() {
    const ec = labState.eclipse;
    ec.mode = "solar";
    ec.isPlaying = true;
    ec.orbitAngle = 0.0;
    ec.orbitSpeed = 0.12;
    ec.direction = 1;
    ec.isDragging = false;
    ec.alignmentThreshold = 3.5;

    updateEclipseDOMControls();
    updateEclipseMetricsDOM();
}

function resetEclipseExperiment() {
    const ec = labState.eclipse;
    ec.orbitAngle = 0.0;
    ec.isPlaying = false;
    ec.direction = 1;
    ec.isDragging = false;

    const btnPlay = document.getElementById('btn-eclipse-play-pause');
    const labelPlay = document.getElementById('label-eclipse-play');
    if (btnPlay) btnPlay.classList.remove('active');
    if (labelPlay) labelPlay.textContent = "Başlat";

    updateEclipseDOMControls();
    updateEclipseMetricsDOM();
    showLabToast("Yörünge tam tutulma hizasına (0.0°) sıfırlandı!");
}

function updateEclipseDOMControls() {
    const ec = labState.eclipse;
    const isSolar = (ec.mode === "solar");

    // Tutulma Türü Butonları (Hızlı Bar & Sağ Panel)
    const btnSolar = document.getElementById('btn-eclipse-mode-solar');
    const btnLunar = document.getElementById('btn-eclipse-mode-lunar');
    const pillSolar = document.getElementById('pill-eclipse-solar');
    const pillLunar = document.getElementById('pill-eclipse-lunar');
    if (btnSolar) btnSolar.classList.toggle('active', isSolar);
    if (btnLunar) btnLunar.classList.toggle('active', !isSolar);
    if (pillSolar) pillSolar.classList.toggle('active', isSolar);
    if (pillLunar) pillLunar.classList.toggle('active', !isSolar);

    // Kaydırıcı ve Açı Değeri
    const slider = document.getElementById('slider-eclipse-angle');
    const labelVal = document.getElementById('label-eclipse-angle-val');
    if (slider) slider.value = ec.orbitAngle;
    if (labelVal) {
        const isAligned = Math.abs(ec.orbitAngle) <= ec.alignmentThreshold;
        labelVal.textContent = `${ec.orbitAngle.toFixed(1)}° ${isAligned ? "(Tam Hizada)" : ""}`;
        labelVal.style.color = isAligned ? "#10b981" : "var(--neon-blue)";
    }

    // Oynat / Durdur Butonu
    const btnPlay = document.getElementById('btn-eclipse-play-pause');
    const labelPlay = document.getElementById('label-eclipse-play');
    if (btnPlay) btnPlay.classList.toggle('active', ec.isPlaying);
    if (labelPlay) labelPlay.textContent = ec.isPlaying ? "Durdur" : "Başlat";

    // Simülasyon Hızı Butonları
    const spdSlow = document.getElementById('pill-eclipse-speed-slow');
    const spdNorm = document.getElementById('pill-eclipse-speed-normal');
    const spdFast = document.getElementById('pill-eclipse-speed-fast');
    if (spdSlow) spdSlow.classList.toggle('active', Math.abs(ec.orbitSpeed - 0.06) < 0.01);
    if (spdNorm) spdNorm.classList.toggle('active', Math.abs(ec.orbitSpeed - 0.12) < 0.01);
    if (spdFast) spdFast.classList.toggle('active', Math.abs(ec.orbitSpeed - 0.24) < 0.01);
}

function setupEclipseControlsDOM() {
    // 1. Mod Değişimi: Güneş vs Ay Tutulması
    const setEclipseMode = (mode) => {
        labState.eclipse.mode = mode;
        labState.eclipse.orbitAngle = 0.0;
        updateEclipseDOMControls();
        updateEclipseMetricsDOM();
        showLabToast(mode === "solar" ? "☀️ Güneş Tutulması Modu (Ay Ortada, Yeniay Evresi)" : "🌕 Ay Tutulması Modu (Dünya Ortada, Dolunay Evresi)");
    };

    ['btn-eclipse-mode-solar', 'pill-eclipse-solar'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setEclipseMode("solar"));
    });

    ['btn-eclipse-mode-lunar', 'pill-eclipse-lunar'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setEclipseMode("lunar"));
    });

    // 2. Oynat / Durdur
    const btnPlay = document.getElementById('btn-eclipse-play-pause');
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            const ec = labState.eclipse;
            ec.isPlaying = !ec.isPlaying;
            updateEclipseDOMControls();
        });
    }

    // 3. Adım Butonları (◀ / ▶)
    const btnStepBack = document.getElementById('btn-eclipse-step-back');
    const btnStepFwd = document.getElementById('btn-eclipse-step-fwd');
    if (btnStepBack) {
        btnStepBack.addEventListener('click', () => {
            const ec = labState.eclipse;
            ec.isPlaying = false;
            ec.orbitAngle = Math.max(-28, ec.orbitAngle - 2.0);
            updateEclipseDOMControls();
            updateEclipseMetricsDOM();
        });
    }
    if (btnStepFwd) {
        btnStepFwd.addEventListener('click', () => {
            const ec = labState.eclipse;
            ec.isPlaying = false;
            ec.orbitAngle = Math.min(28, ec.orbitAngle + 2.0);
            updateEclipseDOMControls();
            updateEclipseMetricsDOM();
        });
    }

    // 4. Tam Tutulma Hizala
    const btnAlign = document.getElementById('btn-eclipse-align');
    if (btnAlign) {
        btnAlign.addEventListener('click', () => {
            const ec = labState.eclipse;
            ec.orbitAngle = 0.0;
            updateEclipseDOMControls();
            updateEclipseMetricsDOM();
            showLabToast("🎯 Güneş, Dünya ve Ay tam aynı doğrultuya getirildi!");
        });
    }

    // 5. Sıfırla
    const btnReset = document.getElementById('btn-eclipse-reset');
    if (btnReset) btnReset.addEventListener('click', resetEclipseExperiment);

    // 6. Yörünge Açısı Kaydırıcısı
    const slider = document.getElementById('slider-eclipse-angle');
    if (slider) {
        slider.addEventListener('input', (e) => {
            const ec = labState.eclipse;
            ec.orbitAngle = parseFloat(e.target.value);
            ec.isPlaying = false;
            updateEclipseDOMControls();
            updateEclipseMetricsDOM();
        });
    }

    // 7. Simülasyon Hızı Butonları
    const setSpeed = (spd) => {
        labState.eclipse.orbitSpeed = spd;
        updateEclipseDOMControls();
    };
    const sSlow = document.getElementById('pill-eclipse-speed-slow');
    const sNorm = document.getElementById('pill-eclipse-speed-normal');
    const sFast = document.getElementById('pill-eclipse-speed-fast');
    if (sSlow) sSlow.addEventListener('click', () => setSpeed(0.06));
    if (sNorm) sNorm.addEventListener('click', () => setSpeed(0.12));
    if (sFast) sFast.addEventListener('click', () => setSpeed(0.24));

    // 8. Gözlem Kayıt Butonu
    const btnRecord = document.getElementById('btn-record-data-6-1');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateEclipsePhysics() {
    const ec = labState.eclipse;
    if (ec.isPlaying && !ec.isDragging) {
        if (!ec.direction) ec.direction = 1;
        ec.orbitAngle += ec.orbitSpeed * ec.direction;
        if (ec.orbitAngle >= 26) {
            ec.orbitAngle = 26;
            ec.direction = -1;
        } else if (ec.orbitAngle <= -26) {
            ec.orbitAngle = -26;
            ec.direction = 1;
        }
        updateEclipseDOMControls();
    }
    updateEclipseMetricsDOM();
}

function updateEclipseMetricsDOM() {
    const ec = labState.eclipse;
    const isSolar = (ec.mode === "solar");
    const isTotal = Math.abs(ec.orbitAngle) <= ec.alignmentThreshold;
    const isPartial = !isTotal && Math.abs(ec.orbitAngle) <= 15;

    // Canvas Altı Responsive Metrik Şeridi (#metrics-bar-6-1)
    const mbMode = document.getElementById('mbar-61-mode');
    const mbOrder = document.getElementById('mbar-61-order');
    const mbPhase = document.getElementById('mbar-61-phase');
    const mbStatus = document.getElementById('mbar-61-status');

    if (mbMode) mbMode.textContent = isSolar ? "Güneş Tutulması" : "Ay Tutulması";
    if (mbOrder) mbOrder.textContent = isSolar ? "Güneş — Ay — Dünya" : "Güneş — Dünya — Ay";
    if (mbPhase) mbPhase.textContent = isSolar ? "Yeniay Evresi" : "Dolunay Evresi";

    if (mbStatus) {
        if (isTotal) {
            mbStatus.textContent = isSolar ? "☀️ Tam Tutulma (Korona Halkası)" : "🌕 Tam Tutulma (Kızıl / Kanlı Ay)";
            mbStatus.style.borderLeftColor = "#10b981";
        } else if (isPartial) {
            mbStatus.textContent = "🌓 Parçalı Tutulma (Yarı Gölge)";
            mbStatus.style.borderLeftColor = "#f59e0b";
        } else {
            mbStatus.textContent = "✨ Tutulma Yok (Hizalanma Dışında)";
            mbStatus.style.borderLeftColor = "#38bdf8";
        }
    }

    // Sağ Panel Veri Çipleri
    const pOrder = document.getElementById('metric-61-order');
    const pPhase = document.getElementById('metric-61-phase');
    const pTimeRegion = document.getElementById('metric-61-time-region');
    const pShadow = document.getElementById('metric-61-shadow-type');

    if (pOrder) pOrder.textContent = isSolar ? "Güneş-Ay-Dünya" : "Güneş-Dünya-Ay";
    if (pPhase) pPhase.textContent = isSolar ? "Yeniay" : "Dolunay";
    if (pTimeRegion) pTimeRegion.textContent = isSolar ? "Gündüz (Dar Alan)" : "Gece (Geniş Alan)";
    if (pShadow) {
        pShadow.textContent = isTotal ? "Tam Gölge (Umbra)" : (isPartial ? "Yarı Gölge (Penumbra)" : "Aydınlık");
    }

    // Pedagojik Çıkarım Kartı
    const pTitle = document.getElementById('eclipse-pedagogical-title');
    const pText = document.getElementById('eclipse-pedagogical-text');
    const pIcon = document.getElementById('eclipse-pedagogical-icon');

    if (pTitle && pText && pIcon) {
        if (isSolar) {
            pIcon.innerHTML = `<i class="fas fa-sun" style="color:#facc15;"></i>`;
            pTitle.textContent = "☀️ Güneş Tutulması (Yeniay Evresi)";
            if (isTotal) {
                pText.textContent = "Ay, Güneş ile Dünya arasına girerek Güneş'i tamamen örtmüştür. Gündüz vakti Dünya'nın dar bir bölgesinde tam gölge oluşur ve parlak korona tacı belirir.";
            } else if (isPartial) {
                pText.textContent = "Güneş, Ay ve Dünya kısmen hizalanmıştır. Yarı gölgede kalan bölgelerde parçalı Güneş tutulması gözlemlenir.";
            } else {
                pText.textContent = "Ay yörüngesi eğik olduğu için her yeniayda Güneş tutulması gerçekleşmez; üç gök cisminin tam aynı doğrultuya gelmesi gerekir.";
            }
        } else {
            pIcon.innerHTML = `<i class="fas fa-moon" style="color:#cbd5e1;"></i>`;
            pTitle.textContent = "🌕 Ay Tutulması (Dolunay Evresi)";
            if (isTotal) {
                pText.textContent = "Dünya, Güneş ile Ay arasına girmiştir. Ay, Dünya'nın geniş tam gölge konisine girerek Güneş ışığı alamaz ve atmosferik kırılma nedeniyle kızıl (Kanlı Ay) renge bürünür.";
            } else if (isPartial) {
                pText.textContent = "Ay, Dünya'nın gölge konisinin bir kısmından geçmektedir. Ay'ın bir yüzeyi gölgede kalırken diğer kısmı ışık almaya devam eder.";
            } else {
                pText.textContent = "Ay yörüngesi eğik olduğu için her dolunayda Ay tutulması gerçekleşmez; Dünya'nın gölgesine girebilmesi için doğrusal hizalanma şarttır.";
            }
        }
    }
}

function drawEclipseSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    const ec = labState.eclipse;
    const isSolar = (ec.mode === "solar");

    // 1. Kozmik Uzay Arka Planı (Derin Lacivert Gradyan & Yıldız Tozu)
    const spaceGrad = ctx.createRadialGradient(400, 250, 40, 400, 250, 480);
    spaceGrad.addColorStop(0, "#080e1e");
    spaceGrad.addColorStop(0.6, "#040711");
    spaceGrad.addColorStop(1, "#020307");
    ctx.fillStyle = spaceGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Arka Plan Yıldızları (Sabit seed benzeri koordinatlar)
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    const starCoords = [
        [40, 50], [90, 120], [180, 45], [260, 95], [340, 40], [450, 80], [530, 35], [620, 90], [720, 160],
        [60, 420], [150, 460], [240, 410], [310, 470], [490, 430], [580, 465], [670, 420], [750, 450],
        [210, 200], [480, 170], [540, 310], [670, 220], [770, 290]
    ];
    starCoords.forEach(([sx, sy], idx) => {
        const twinkle = 0.5 + 0.5 * Math.sin(animTime * 2 + idx);
        ctx.globalAlpha = twinkle * 0.7;
        ctx.beginPath();
        ctx.arc(sx, sy, (idx % 3 === 0) ? 1.5 : 1.0, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // 2. Yörünge Kılavuz Yayı (Dashed Orbit Guide)
    ctx.save();
    ctx.strokeStyle = "rgba(56, 189, 248, 0.22)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    const orbitCenterX = isSolar ? 620 : 380;
    const orbitR = isSolar ? 260 : 260;
    ctx.arc(orbitCenterX, 250, orbitR, Math.PI * 0.85, Math.PI * 1.15, isSolar);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Geometrik Koordinatlar
    const sunX = 110, sunY = 250, sunR = 48;
    let moonX, moonY, moonR = 15;
    let earthX, earthY, earthR = 36;

    if (isSolar) {
        // Güneş (sol) — Ay (orta) — Dünya (sağ)
        earthX = 620; earthY = 250;
        moonX = 360;
        moonY = 250 + (ec.orbitAngle / 30) * 110;
    } else {
        // Güneş (sol) — Dünya (orta) — Ay (sağ)
        earthX = 380; earthY = 250;
        moonX = 640;
        moonY = 250 + (ec.orbitAngle / 30) * 115;
    }

    // 3. Işık Işınları ve Gölge Konileri (Umbra & Penumbra)
    drawEclipseLightAndShadows(ctx, ec, sunX, sunY, sunR, moonX, moonY, moonR, earthX, earthY, earthR);

    // 4. Güneş Çizimi
    drawEclipseSun(ctx, sunX, sunY, sunR);

    // 5. Dünya Çizimi (Güneş'ten gelen ışığa göre aydınlanma)
    drawEclipseEarth(ctx, earthX, earthY, earthR, true);

    // 6. Ay Çizimi
    const isAligned = Math.abs(ec.orbitAngle) <= ec.alignmentThreshold;
    drawEclipseMoon(ctx, moonX, moonY, moonR, isSolar, isAligned);

    // 7. Gökyüzü İçi Mini Gözlemevi Monitörü ("Dünya'dan Görünüm")
    drawEclipseSkyViewfinder(ctx, ec, isSolar, isAligned);

    ctx.restore();
}

function drawEclipseLightAndShadows(ctx, ec, sunX, sunY, sunR, moonX, moonY, moonR, earthX, earthY, earthR) {
    const isSolar = (ec.mode === "solar");

    ctx.save();

    if (isSolar) {
        // Güneş Tutulması Işık Geometrisi (Güneş -> Ay -> Dünya)
        // A. Yarı Gölge (Penumbra) Geniş Işınları
        ctx.fillStyle = "rgba(250, 204, 21, 0.05)";
        ctx.beginPath();
        ctx.moveTo(sunX, sunY - sunR);
        ctx.lineTo(moonX, moonY + moonR);
        ctx.lineTo(earthX + 80, earthY + 120);
        ctx.lineTo(earthX + 80, earthY - 120);
        ctx.lineTo(moonX, moonY - moonR);
        ctx.lineTo(sunX, sunY + sunR);
        ctx.closePath();
        ctx.fill();

        // B. Ay'ın Penumbra Gölge Alanı (Dünya'ya vuran)
        ctx.fillStyle = "rgba(15, 23, 42, 0.45)";
        ctx.beginPath();
        ctx.moveTo(moonX, moonY - moonR);
        ctx.lineTo(earthX, earthY - 55);
        ctx.lineTo(earthX, earthY + 55);
        ctx.lineTo(moonX, moonY + moonR);
        ctx.closePath();
        ctx.fill();

        // C. Ay'ın Tam Gölge (Umbra) Konisi (Dar, sivri koni)
        // Güneş üst -> Ay üst, Güneş alt -> Ay alt
        const umbraSlopeTop = (moonY - moonR - (sunY - sunR)) / (moonX - sunX);
        const umbraSlopeBtm = (moonY + moonR - (sunY + sunR)) / (moonX - sunX);
        const umbraApexX = moonX + (moonR * 2 * (moonX - sunX)) / ((sunR - moonR) * 2);
        const umbraApexY = moonY;

        ctx.fillStyle = "rgba(5, 8, 16, 0.78)";
        ctx.beginPath();
        ctx.moveTo(moonX, moonY - moonR);
        ctx.lineTo(Math.min(earthX + 20, umbraApexX), (moonY - moonR) + umbraSlopeTop * (Math.min(earthX + 20, umbraApexX) - moonX));
        ctx.lineTo(Math.min(earthX + 20, umbraApexX), (moonY + moonR) + umbraSlopeBtm * (Math.min(earthX + 20, umbraApexX) - moonX));
        ctx.lineTo(moonX, moonY + moonR);
        ctx.closePath();
        ctx.fill();

        // Tam Tutulma Vurma Noktası (Dünya üzerinde odaklanan tam gölge beneği)
        if (Math.abs(ec.orbitAngle) <= ec.alignmentThreshold) {
            ctx.fillStyle = "#020617";
            ctx.shadowColor = "#000000";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.ellipse(earthX - earthR + 3, earthY, 5, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Halka Halesi Vektör İllüstrasyonu
            ctx.strokeStyle = "rgba(250, 204, 21, 0.4)";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    } else {
        // Ay Tutulması Işık Geometrisi (Güneş -> Dünya -> Ay)
        // Dünya'nın Uzaya Ulaşan Geniş Tam Gölge (Umbra) Konisi
        const shadowApexX = earthX + 380;
        const shadowTopY = earthY - 14;
        const shadowBtmY = earthY + 14;

        // Penumbra (Yarı gölge)
        ctx.fillStyle = "rgba(15, 23, 42, 0.38)";
        ctx.beginPath();
        ctx.moveTo(earthX, earthY - earthR);
        ctx.lineTo(760, earthY - 95);
        ctx.lineTo(760, earthY + 95);
        ctx.lineTo(earthX, earthY + earthR);
        ctx.closePath();
        ctx.fill();

        // Umbra (Tam gölge konisi)
        const umbraGrad = ctx.createLinearGradient(earthX, earthY, shadowApexX, earthY);
        umbraGrad.addColorStop(0, "rgba(3, 7, 18, 0.88)");
        umbraGrad.addColorStop(0.7, "rgba(69, 10, 10, 0.55)"); // Atmosferik kızıl kırılma
        umbraGrad.addColorStop(1, "rgba(15, 23, 42, 0.2)");
        ctx.fillStyle = umbraGrad;
        ctx.beginPath();
        ctx.moveTo(earthX, earthY - earthR);
        ctx.lineTo(shadowApexX, shadowTopY);
        ctx.lineTo(shadowApexX, shadowBtmY);
        ctx.lineTo(earthX, earthY + earthR);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
}

function drawEclipseSun(ctx, x, y, r) {
    ctx.save();

    // 1. Dış Plazma Korona ve Işıma Çemberi (Pulsating Corona Aura)
    const pulse = 1.0 + 0.05 * Math.sin(animTime * 3);
    const coronaGrad = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 2.4 * pulse);
    coronaGrad.addColorStop(0, "rgba(255, 230, 100, 0.75)");
    coronaGrad.addColorStop(0.25, "rgba(245, 158, 11, 0.35)");
    coronaGrad.addColorStop(0.6, "rgba(239, 68, 68, 0.12)");
    coronaGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = coronaGrad;
    ctx.beginPath();
    ctx.arc(x, y, r * 2.4 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // 2. Güneş Korona Alev Işınları (Stylized Flare Spikes)
    ctx.strokeStyle = "rgba(253, 224, 71, 0.35)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 16; i++) {
        const ang = (i * Math.PI / 8) + animTime * 0.1;
        const len = r + 14 + 10 * Math.sin(animTime * 2 + i);
        ctx.beginPath();
        ctx.moveTo(x + Math.cos(ang) * (r + 4), y + Math.sin(ang) * (r + 4));
        ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
        ctx.stroke();
    }

    // 3. Akkor Güneş Çekirdeği
    const coreGrad = ctx.createRadialGradient(x - r * 0.25, y - r * 0.25, 4, x, y, r);
    coreGrad.addColorStop(0, "#ffffff");
    coreGrad.addColorStop(0.3, "#fef08a");
    coreGrad.addColorStop(0.7, "#f59e0b");
    coreGrad.addColorStop(1, "#b45309");
    ctx.fillStyle = coreGrad;
    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = 24;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
}

function drawEclipseEarth(ctx, x, y, r, isSunlightFromLeft) {
    ctx.save();

    // 1. Mavi Atmosfer Halesi
    const atmoGrad = ctx.createRadialGradient(x, y, r * 0.95, x, y, r * 1.25);
    atmoGrad.addColorStop(0, "rgba(56, 189, 248, 0.45)");
    atmoGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
    ctx.fillStyle = atmoGrad;
    ctx.beginPath();
    ctx.arc(x, y, r * 1.25, 0, Math.PI * 2);
    ctx.fill();

    // 2. Okyanus Gövdesi
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = "#0284c7";
    ctx.fill();

    // 3. Stilize Kıtalar (Yeşil/Kahve landmass)
    ctx.save();
    ctx.clip(); // Küre içine kırp

    ctx.fillStyle = "#10b981";
    // Kıta 1 (Kuzey Amerika / Avrupa)
    ctx.beginPath();
    ctx.arc(x - 12, y - 10, 14, 0, Math.PI * 2);
    ctx.arc(x - 4, y - 18, 10, 0, Math.PI * 2);
    ctx.fill();

    // Kıta 2 (Afrika / Asya)
    ctx.beginPath();
    ctx.arc(x + 10, y + 6, 15, 0, Math.PI * 2);
    ctx.arc(x + 16, y - 8, 12, 0, Math.PI * 2);
    ctx.fill();

    // Kutup Buzulu
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.arc(x, y - r + 3, 10, 0, Math.PI * 2);
    ctx.fill();

    // 4. Gece/Gündüz Gölgelendirmesi (Terminatör Eğrisi)
    // Güneş soldan geldiği için sağ taraf gölgede
    const termGrad = ctx.createLinearGradient(x - r, y, x + r, y);
    termGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
    termGrad.addColorStop(0.48, "rgba(5, 10, 20, 0.2)");
    termGrad.addColorStop(0.55, "rgba(2, 6, 18, 0.88)");
    termGrad.addColorStop(1, "rgba(2, 4, 12, 0.96)");
    ctx.fillStyle = termGrad;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);

    ctx.restore(); // clip sonu

    // 5. Atmosfer Kenar Çizgisi
    ctx.strokeStyle = "rgba(186, 230, 253, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}

function drawEclipseMoon(ctx, x, y, r, isSolar, isAligned) {
    ctx.save();

    // Sürükleme Tutacağı Halesi
    const ec = labState.eclipse;
    if (ec.isDragging) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, r + 8, 0, Math.PI * 2);
        ctx.stroke();
    }

    if (isSolar) {
        // Güneş Tutulmasında Ay (Yeniay Evresi - Dünya'ya bakan yüzü karanlık)
        // Güneş solunda olduğu için sol ince bir hilal aydınlığı, Dünya'ya bakan sağ yüzeyi karanlık
        ctx.fillStyle = "#0f172a";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // Krater Dokuları (Hafif gri)
        ctx.fillStyle = "rgba(30, 41, 59, 0.6)";
        ctx.beginPath();
        ctx.arc(x - 3, y - 4, 3, 0, Math.PI * 2);
        ctx.arc(x + 4, y + 2, 2.5, 0, Math.PI * 2);
        ctx.arc(x - 2, y + 5, 2, 0, Math.PI * 2);
        ctx.fill();

        // Sol tarafta Güneş'e bakan ince ışık hilali
        ctx.strokeStyle = "rgba(254, 240, 138, 0.55)";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(x, y, r, Math.PI * 0.65, Math.PI * 1.35);
        ctx.stroke();
    } else {
        // Ay Tutulmasında Ay (Dolunay veya Kanlı Ay)
        if (isAligned) {
            // Tam Ay Tutulması: Atmosferden kırılan kızıl ışıkla kızıla bürünen "Kanlı Ay"
            const bloodGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r);
            bloodGrad.addColorStop(0, "#f87171");
            bloodGrad.addColorStop(0.5, "#dc2626");
            bloodGrad.addColorStop(1, "#7f1d1d");
            ctx.fillStyle = bloodGrad;
            ctx.shadowColor = "#ef4444";
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Kızıl Kraterler
            ctx.fillStyle = "rgba(69, 10, 10, 0.7)";
            ctx.beginPath();
            ctx.arc(x - 4, y - 3, 3.5, 0, Math.PI * 2);
            ctx.arc(x + 3, y + 3, 2.8, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Normal Aydınlık Dolunay
            const moonGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 2, x, y, r);
            moonGrad.addColorStop(0, "#f8fafc");
            moonGrad.addColorStop(0.6, "#cbd5e1");
            moonGrad.addColorStop(1, "#94a3b8");
            ctx.fillStyle = moonGrad;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();

            // Krater Havzaları (Maria)
            ctx.fillStyle = "rgba(100, 116, 139, 0.5)";
            ctx.beginPath();
            ctx.arc(x - 4, y - 3, 3.5, 0, Math.PI * 2);
            ctx.arc(x + 4, y + 2, 3, 0, Math.PI * 2);
            ctx.arc(x - 2, y + 5, 2.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}

function drawEclipseSkyViewfinder(ctx, ec, isSolar, isAligned) {
    const vx = 710, vy = 75, vr = 44;

    ctx.save();

    // 1. Dış HUD Çerçevesi (High-Tech Gözlemevi Monitörü)
    ctx.fillStyle = "rgba(10, 15, 30, 0.9)";
    ctx.strokeStyle = isAligned ? "#10b981" : "rgba(56, 189, 248, 0.4)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(vx, vy, vr, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // HUD Köşe Çentikleri
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
        ctx.beginPath();
        ctx.moveTo(vx + Math.cos(a) * (vr - 4), vy + Math.sin(a) * (vr - 4));
        ctx.lineTo(vx + Math.cos(a) * vr, vy + Math.sin(a) * vr);
        ctx.stroke();
    }

    // 2. Kırpma Alanı (Monitörün İçi)
    ctx.save();
    ctx.beginPath();
    ctx.arc(vx, vy, vr - 2, 0, Math.PI * 2);
    ctx.clip();

    if (isSolar) {
        // Güneş Tutulmasında Gündüz Gökyüzü Görünümü
        // Tutulma derecesine göre gökyüzü rengi kararır
        const darkFactor = isAligned ? 0.9 : Math.max(0, 1 - Math.abs(ec.orbitAngle) / 20);
        const skyR = Math.round(14 * (1 - darkFactor) + 2 * darkFactor);
        const skyG = Math.round(116 * (1 - darkFactor) + 6 * darkFactor);
        const skyB = Math.round(144 * (1 - darkFactor) + 18 * darkFactor);
        ctx.fillStyle = `rgb(${skyR}, ${skyG}, ${skyB})`;
        ctx.fillRect(vx - vr, vy - vr, vr * 2, vr * 2);

        // Güneş Diski
        const sunDiskR = 19;
        const sunGrad = ctx.createRadialGradient(vx, vy, 2, vx, vy, sunDiskR);
        sunGrad.addColorStop(0, "#ffffff");
        sunGrad.addColorStop(0.5, "#fef08a");
        sunGrad.addColorStop(1, "#f59e0b");
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(vx, vy, sunDiskR, 0, Math.PI * 2);
        ctx.fill();

        // Ay Diskinin Güneş Önünden Geçişi (Y ekseninde kayma)
        const moonOffsetY = (ec.orbitAngle / 28) * (sunDiskR * 2.2);
        const moonDiskX = vx;
        const moonDiskY = vy + moonOffsetY;
        const moonDiskR = 19.5;

        // Ay Silüeti
        ctx.fillStyle = "#020617";
        ctx.beginPath();
        ctx.arc(moonDiskX, moonDiskY, moonDiskR, 0, Math.PI * 2);
        ctx.fill();

        // TAM TUTULMA ÖZEL EFEKTİ: Parlak Korona Tacı ve Elmas Yüzük Pırıltısı
        if (isAligned) {
            ctx.save();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = 14;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(vx, vy, sunDiskR + 1.5, 0, Math.PI * 2);
            ctx.stroke();

            // Elmas Yüzük (Diamond Ring Effect)
            const ringAngle = -Math.PI / 4;
            const rx = vx + Math.cos(ringAngle) * (sunDiskR + 1);
            const ry = vy + Math.sin(ringAngle) * (sunDiskR + 1);
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = "#ffffff";
            ctx.shadowBlur = 16;
            ctx.beginPath();
            ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    } else {
        // Ay Tutulmasında Gece Gökyüzü Görünümü
        ctx.fillStyle = "#02040a";
        ctx.fillRect(vx - vr, vy - vr, vr * 2, vr * 2);

        // Minik Yıldızlar
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillRect(vx - 25, vy - 20, 1.5, 1.5);
        ctx.fillRect(vx + 20, vy - 25, 1.5, 1.5);
        ctx.fillRect(vx - 18, vy + 24, 1.5, 1.5);
        ctx.fillRect(vx + 24, vy + 18, 1.5, 1.5);

        const moonR = 19;
        if (isAligned) {
            // Kanlı Ay (Blood Moon) Eerie Kızıl Halesi
            const bloodGrad = ctx.createRadialGradient(vx - 4, vy - 4, 3, vx, vy, moonR);
            bloodGrad.addColorStop(0, "#f87171");
            bloodGrad.addColorStop(0.6, "#b91c1c");
            bloodGrad.addColorStop(1, "#450a0a");
            ctx.fillStyle = bloodGrad;
            ctx.shadowColor = "#ef4444";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(vx, vy, moonR, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        } else {
            // Normal Parlak Dolunay
            const fullGrad = ctx.createRadialGradient(vx - 4, vy - 4, 3, vx, vy, moonR);
            fullGrad.addColorStop(0, "#ffffff");
            fullGrad.addColorStop(0.7, "#cbd5e1");
            fullGrad.addColorStop(1, "#64748b");
            ctx.fillStyle = fullGrad;
            ctx.beginPath();
            ctx.arc(vx, vy, moonR, 0, Math.PI * 2);
            ctx.fill();

            // Kısmi Gölge (Dünya Umbrası kenardan kesiyorsa)
            if (Math.abs(ec.orbitAngle) < 16) {
                const shadowShiftY = (ec.orbitAngle / 16) * 35;
                ctx.fillStyle = "rgba(2, 6, 23, 0.85)";
                ctx.beginPath();
                ctx.arc(vx, vy + shadowShiftY, moonR * 1.3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    ctx.restore(); // Kırpma sonu

    // 3. Cam Yansıması Sheen Çizgisi
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(vx, vy, vr - 5, Math.PI * 1.15, Math.PI * 1.6);
    ctx.stroke();

    ctx.restore();
}

// ============================================================================
// --- 6.3. DENEY 6.3: SABİT SÜRATLİ HAREKET SİMÜLATÖRÜ (FB.6.2.3) ---
// ============================================================================

function initMotionState() {
    const m = labState.motion;
    m.isPlaying = false;
    m.speed = 10;
    m.trackLength = 100;
    m.elapsedTime = 0.0;
    m.distanceTraveled = 0.0;
    m.graphMode = "xt";
    m.history = [{ t: 0, x: 0, v: 10 }];
    m.car.x = 80;
    m.car.y = 230;
    m.car.wheelAngle = 0;
    m.car.exhaustParticles = [];
    m.car.isDragging = false;

    updateMotionDOMControls();
    updateMotionMetricsDOM();
}

function resetMotionExperiment() {
    const m = labState.motion;
    m.isPlaying = false;
    m.elapsedTime = 0.0;
    m.distanceTraveled = 0.0;
    m.history = [{ t: 0, x: 0, v: m.speed }];
    m.car.x = 80;
    m.car.wheelAngle = 0;
    m.car.exhaustParticles = [];
    m.car.isDragging = false;

    const btnPlay = document.getElementById('btn-motion-play-pause');
    const labelPlay = document.getElementById('label-motion-play');
    if (btnPlay) btnPlay.classList.remove('active');
    if (labelPlay) labelPlay.textContent = "Başlat";

    updateMotionMetricsDOM();
    showLabToast("Pist ve araç başlangıç çizgisine sıfırlandı!");
}

function updateMotionDOMControls() {
    const m = labState.motion;
    const slider = document.getElementById('slider-motion-speed');
    const labelVal = document.getElementById('label-motion-speed-val');
    if (slider) slider.value = m.speed;
    if (labelVal) labelVal.textContent = `${m.speed} m/s`;

    // Sürat Hızlı Butonları (Hızlı Bar & Sağ Panel)
    [5, 10, 20].forEach(spd => {
        const btn1 = document.getElementById(`btn-motion-speed-${spd}`);
        const btn2 = document.getElementById(`btn-speed-${spd}`);
        if (btn1) btn1.classList.toggle('active', m.speed === spd);
        if (btn2) btn2.classList.toggle('active', m.speed === spd);
    });

    // Pist Uzunluğu Butonları
    [50, 100, 150].forEach(len => {
        const pill = document.getElementById(`pill-track-${len}`);
        if (pill) pill.classList.toggle('active', m.trackLength === len);
    });

    // Grafik Butonları (Hızlı Bar & Sağ Panel)
    const pillXt = document.getElementById('pill-graph-xt');
    const pillVt = document.getElementById('pill-graph-vt');
    const btnXt = document.getElementById('btn-graph-xt');
    const btnVt = document.getElementById('btn-graph-vt');
    if (pillXt) pillXt.classList.toggle('active', m.graphMode === "xt");
    if (pillVt) pillVt.classList.toggle('active', m.graphMode === "vt");
    if (btnXt) btnXt.classList.toggle('active', m.graphMode === "xt");
    if (btnVt) btnVt.classList.toggle('active', m.graphMode === "vt");
}

function setupMotionControlsDOM() {
    // 1. Oynat / Duraklat
    const btnPlay = document.getElementById('btn-motion-play-pause');
    const labelPlay = document.getElementById('label-motion-play');
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            const m = labState.motion;
            if (m.distanceTraveled >= m.trackLength) {
                // Pist bitmişse başa alıp başlat
                m.elapsedTime = 0.0;
                m.distanceTraveled = 0.0;
                m.history = [{ t: 0, x: 0, v: m.speed }];
            }
            m.isPlaying = !m.isPlaying;
            btnPlay.classList.toggle('active', m.isPlaying);
            if (labelPlay) labelPlay.textContent = m.isPlaying ? "Duraklat" : "Başlat";
            updateMotionMetricsDOM();
        });
    }

    // 2. Başa Al
    const btnReset = document.getElementById('btn-motion-reset');
    if (btnReset) btnReset.addEventListener('click', resetMotionExperiment);

    // 3. Hızlı Sürat Butonları (5, 10, 20 m/s)
    [5, 10, 20].forEach(spd => {
        const handler = () => {
            labState.motion.speed = spd;
            updateMotionDOMControls();
            updateMotionMetricsDOM();
            showLabToast(`Sabit Sürat: ${spd} m/s olarak ayarlandı`);
        };
        const btn1 = document.getElementById(`btn-motion-speed-${spd}`);
        const btn2 = document.getElementById(`btn-speed-${spd}`);
        if (btn1) btn1.addEventListener('click', handler);
        if (btn2) btn2.addEventListener('click', handler);
    });

    // 4. Sürat Kaydırıcısı
    const speedSlider = document.getElementById('slider-motion-speed');
    const speedLabel = document.getElementById('label-motion-speed-val');
    if (speedSlider) {
        speedSlider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            labState.motion.speed = val;
            if (speedLabel) speedLabel.textContent = `${val} m/s`;
            [5, 10, 20].forEach(spd => {
                const b1 = document.getElementById(`btn-motion-speed-${spd}`);
                const b2 = document.getElementById(`btn-speed-${spd}`);
                if (b1) b1.classList.toggle('active', val === spd);
                if (b2) b2.classList.toggle('active', val === spd);
            });
            updateMotionMetricsDOM();
        });
    }

    // 5. Pist Uzunluğu Butonları (50, 100, 150 m)
    [50, 100, 150].forEach(len => {
        const pill = document.getElementById(`pill-track-${len}`);
        if (pill) {
            pill.addEventListener('click', () => {
                labState.motion.trackLength = len;
                resetMotionExperiment();
                updateMotionDOMControls();
                showLabToast(`Pist Uzunluğu: ${len} metre`);
            });
        }
    });

    // 6. Grafik Modu Seçicileri (x-t vs v-t)
    const setGraphMode = (mode) => {
        labState.motion.graphMode = mode;
        updateMotionDOMControls();
        showLabToast(mode === "xt" ? "Canlı Grafik: Yol - Zaman (x - t) eğrisi" : "Canlı Grafik: Sürat - Zaman (v - t) eğrisi");
    };
    const pillXt = document.getElementById('pill-graph-xt');
    const pillVt = document.getElementById('pill-graph-vt');
    const btnXt = document.getElementById('btn-graph-xt');
    const btnVt = document.getElementById('btn-graph-vt');
    if (pillXt) pillXt.addEventListener('click', () => setGraphMode("xt"));
    if (btnXt) btnXt.addEventListener('click', () => setGraphMode("xt"));
    if (pillVt) pillVt.addEventListener('click', () => setGraphMode("vt"));
    if (btnVt) btnVt.addEventListener('click', () => setGraphMode("vt"));

    // 7. Gözlem Kayıt Butonu
    const btnRecord = document.getElementById('btn-record-data-6-3');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateMotionPhysics() {
    const m = labState.motion;
    if (m.isPlaying) {
        const dt = 0.05; // 20 FPS simülasyon zaman adımı
        if (m.distanceTraveled < m.trackLength) {
            m.elapsedTime += dt;
            m.distanceTraveled = Math.min(m.trackLength, m.distanceTraveled + m.speed * dt);

            // Tekerlek dönüşü
            m.car.wheelAngle += (m.speed * dt * 0.25);

            // Periyodik grafik veri kaydı (her ~0.2 saniyede bir nokta)
            const lastPoint = m.history[m.history.length - 1];
            if (!lastPoint || m.elapsedTime - lastPoint.t >= 0.2) {
                m.history.push({ t: m.elapsedTime, x: m.distanceTraveled, v: m.speed });
            }

            // Temiz enerji egzoz aurası parçacığı
            if (Math.random() < 0.4) {
                m.car.exhaustParticles.push({
                    x: m.car.x - 15,
                    y: m.car.y + 14 + (Math.random() - 0.5) * 6,
                    vx: -1.5 - Math.random() * 2,
                    vy: (Math.random() - 0.5) * 0.8,
                    life: 1.0,
                    size: 3 + Math.random() * 3
                });
            }

            if (m.distanceTraveled >= m.trackLength) {
                m.isPlaying = false;
                const btnPlay = document.getElementById('btn-motion-play-pause');
                const labelPlay = document.getElementById('label-motion-play');
                if (btnPlay) btnPlay.classList.remove('active');
                if (labelPlay) labelPlay.textContent = "Baştan Başlat";
                showLabToast(`🏁 ${m.trackLength} m pist tamamlandı! Süre: ${m.elapsedTime.toFixed(1)} sn`);
            }
        }
    }

    // Parçacıkları güncelle
    for (let i = m.car.exhaustParticles.length - 1; i >= 0; i--) {
        const p = m.car.exhaustParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life <= 0) m.car.exhaustParticles.splice(i, 1);
    }

    // Araç X koordinatı (Canvas ölçeği: 80px -> 700px arası)
    const trackStartPx = 90;
    const trackEndPx = 690;
    const trackWidthPx = trackEndPx - trackStartPx;
    m.car.x = trackStartPx + (m.distanceTraveled / m.trackLength) * trackWidthPx;

    updateMotionMetricsDOM();
}

function updateMotionMetricsDOM() {
    const m = labState.motion;
    const fmt = (n, d = 1) => Number(n).toFixed(d);

    // Canvas Altı Responsive Metrik Şeridi (#metrics-bar-6-3)
    const mbDist = document.getElementById('mbar-63-dist');
    const mbTime = document.getElementById('mbar-63-time');
    const mbSpeed = document.getElementById('mbar-63-speed');
    const mbStatus = document.getElementById('mbar-63-status');

    if (mbDist) mbDist.textContent = `${fmt(m.distanceTraveled, 1)} m`;
    if (mbTime) mbTime.textContent = `${fmt(m.elapsedTime, 1)} s`;
    if (mbSpeed) mbSpeed.textContent = `${fmt(m.speed, 1)} m/s`;
    if (mbStatus) {
        if (m.distanceTraveled >= m.trackLength) {
            mbStatus.textContent = "🏁 Bitiş Çizgisine Ulaştı";
            mbStatus.style.borderLeftColor = "#f59e0b";
        } else if (m.isPlaying) {
            mbStatus.textContent = "⚡ Sabit Süratle İlerliyor";
            mbStatus.style.borderLeftColor = "#10b981";
        } else {
            mbStatus.textContent = "Hazır (Bekliyor)";
            mbStatus.style.borderLeftColor = "#38bdf8";
        }
    }

    // Sağ Panel Metrikleri
    const pTime = document.getElementById('metric-63-time');
    const pDist = document.getElementById('metric-63-dist');
    const pSpeed = document.getElementById('metric-63-speed');
    const pStatus = document.getElementById('metric-63-status');
    if (pTime) pTime.textContent = `${fmt(m.elapsedTime, 1)} s`;
    if (pDist) pDist.textContent = `${fmt(m.distanceTraveled, 1)} m`;
    if (pSpeed) pSpeed.textContent = `${fmt(m.speed, 1)} m/s`;
    if (pStatus) {
        pStatus.textContent = m.distanceTraveled >= m.trackLength ? "Bitişe Ulaştı" : (m.isPlaying ? "Hareketli" : "Başlangıçta");
    }
}

function drawMotionSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // 1. Zemin ve Gökyüzü Arka Planı
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 240);
    skyGrad.addColorStop(0, "#090d16");
    skyGrad.addColorStop(1, "#111827");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, 800, 240);

    // Arka plan teknolojik laboratuvar çizgileri (grid)
    ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
    ctx.lineWidth = 1;
    for (let x = 40; x < 800; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 240);
        ctx.stroke();
    }

    // 2. Ölçüm Pisti ve Asfalt Yolu
    drawMotionTrack(ctx);

    // 3. Canlı Dinamik Grafik HUD (Zero-Canvas-Text: Sadece net koordinat ve grafik eğrisi)
    drawMotionLiveGraph(ctx);

    // 4. Parçacıklar (Temiz Enerji / İtici Aurası)
    const m = labState.motion;
    m.car.exhaustParticles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.life * 0.7})`;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    // 5. Stilize Modern Deney Arabası
    drawMotionCar(ctx, m.car.x, m.car.y, m.car.wheelAngle);

    ctx.restore();
}

function drawMotionTrack(ctx) {
    const m = labState.motion;

    // Asfalt Tabanı (Y: 240 -> 440)
    const roadGrad = ctx.createLinearGradient(0, 240, 0, 440);
    roadGrad.addColorStop(0, "#1e293b");
    roadGrad.addColorStop(1, "#0f172a");
    ctx.fillStyle = roadGrad;
    ctx.fillRect(0, 240, 800, 200);

    // Yolun Üst Bordür Şeridi
    ctx.fillStyle = "#334155";
    ctx.fillRect(0, 238, 800, 4);

    // Yolun Alt Bordür Şeridi
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 438, 800, 4);

    // Yol Ortası Kesikli Çizgi (Lazer Neon Amber)
    ctx.strokeStyle = "rgba(250, 204, 21, 0.55)";
    ctx.lineWidth = 3;
    ctx.setLineDash([20, 16]);
    ctx.beginPath();
    ctx.moveTo(0, 340);
    ctx.lineTo(800, 340);
    ctx.stroke();
    ctx.setLineDash([]);

    // Başlangıç Sensör Kapısı (X = 90)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(90, 200);
    ctx.lineTo(90, 420);
    ctx.stroke();

    // Başlangıç Sensör Direkleri
    ctx.fillStyle = "#0284c7";
    ctx.fillRect(86, 190, 8, 20);
    ctx.fillRect(86, 410, 8, 20);
    ctx.shadowBlur = 0;

    // Bitiş Sensör Kapısı (X = 690) - Damalı & Neon Aurası
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#f59e0b";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(690, 200);
    ctx.lineTo(690, 420);
    ctx.stroke();

    ctx.fillStyle = "#d97706";
    ctx.fillRect(686, 190, 8, 20);
    ctx.fillRect(686, 410, 8, 20);
    ctx.shadowBlur = 0;

    // Pist Üzeri Mesafe Çentikleri (0%, 25%, 50%, 75%, 100%)
    const trackStart = 90;
    const trackWidth = 600;
    for (let i = 0; i <= 4; i++) {
        const cx = trackStart + (i / 4) * trackWidth;
        ctx.strokeStyle = (i === 0 || i === 4) ? "#facc15" : "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = (i === 0 || i === 4) ? 2.5 : 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, 420);
        ctx.lineTo(cx, 436);
        ctx.stroke();

        // Çentik altı LED nokta
        ctx.fillStyle = (i === 0 || i === 4) ? "#facc15" : "#38bdf8";
        ctx.beginPath();
        ctx.arc(cx, 442, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawMotionCar(ctx, x, y, wheelAngle) {
    ctx.save();
    ctx.translate(x, y);

    // Araba Zemin Gölgesi
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.beginPath();
    ctx.ellipse(0, 40, 56, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // 1. Aerodinamik Gövde (Metalik Camgöbeği & Lacivert Gradyan)
    const bodyGrad = ctx.createLinearGradient(-50, -10, 50, 30);
    bodyGrad.addColorStop(0, "#0284c7");
    bodyGrad.addColorStop(0.5, "#0369a1");
    bodyGrad.addColorStop(1, "#082f49");

    ctx.fillStyle = bodyGrad;
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.8;

    ctx.beginPath();
    ctx.moveTo(-48, 25);
    ctx.lineTo(-48, 8);
    ctx.quadraticCurveTo(-46, -4, -30, -5); // Arka tavan geçişi
    ctx.lineTo(-12, -18);                   // Arka cam eğimi
    ctx.quadraticCurveTo(0, -22, 20, -18);   // Tavan kubbesi
    ctx.lineTo(36, -2);                    // Ön cam eğimi
    ctx.quadraticCurveTo(52, 6, 52, 20);    // Ön burun
    ctx.lineTo(50, 26);
    ctx.quadraticCurveTo(46, 28, 40, 28);
    ctx.arc(28, 26, 14, 0, Math.PI, true); // Ön tekerlek yuvası
    ctx.lineTo(-14, 28);
    ctx.arc(-28, 26, 14, 0, Math.PI, true); // Arka tekerlek yuvası
    ctx.lineTo(-44, 28);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 2. Yarış Şeridi & Gövde Neon Çizgisi
    ctx.strokeStyle = "rgba(56, 189, 248, 0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-45, 14);
    ctx.lineTo(48, 14);
    ctx.stroke();

    // 3. Ön ve Arka Camlar (Siyah Tint & Yansıma)
    ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;

    // Ön Cam
    ctx.beginPath();
    ctx.moveTo(8, -16);
    ctx.lineTo(32, -3);
    ctx.lineTo(30, 8);
    ctx.lineTo(8, 8);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cam Yansıması
    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(14, -14);
    ctx.lineTo(26, -2);
    ctx.stroke();

    // 4. Ön Far ve Lazer Huzmesi
    ctx.fillStyle = "#38bdf8";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.ellipse(50, 16, 3, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Farın Önündeki Işık Konisi
    const coneGrad = ctx.createLinearGradient(54, 16, 130, 26);
    coneGrad.addColorStop(0, "rgba(56, 189, 248, 0.35)");
    coneGrad.addColorStop(1, "rgba(56, 189, 248, 0.0)");
    ctx.fillStyle = coneGrad;
    ctx.beginPath();
    ctx.moveTo(52, 12);
    ctx.lineTo(130, 4);
    ctx.lineTo(130, 40);
    ctx.lineTo(52, 22);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    // 5. Arka Stop Lambası
    ctx.fillStyle = "#ef4444";
    ctx.shadowColor = "#ef4444";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.fillRect(-49, 10, 3, 8);
    ctx.shadowBlur = 0;

    // 6. Tekerlekler (Alaşım Jant ve Dönen Kollar)
    drawCarWheel(ctx, -28, 26, wheelAngle);
    drawCarWheel(ctx, 28, 26, wheelAngle);

    ctx.restore();
}

function drawCarWheel(ctx, cx, cy, angle) {
    ctx.save();
    ctx.translate(cx, cy);

    // Lastik (Kauçuk Siyah Dış Halka)
    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Jant (Gümüş Alaşım)
    ctx.rotate(angle);
    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fill();

    // Jant Kolları (4 Kol)
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(-6, 0); ctx.lineTo(6, 0);
    ctx.moveTo(0, -6); ctx.lineTo(0, 6);
    ctx.stroke();

    // Merkez Göbek
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawMotionLiveGraph(ctx) {
    const m = labState.motion;
    const gx = 520;
    const gy = 25;
    const gw = 245;
    const gh = 135;

    // Cam Kart Arka Planı
    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(gx, gy, gw, gh, 10);
    ctx.fill();
    ctx.stroke();

    // İç Grafik Koordinat Sistemi
    const px = gx + 30;
    const py = gy + 20;
    const pw = gw - 45;
    const ph = gh - 35;

    // Eksen Çizgileri
    ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(px, py + ph);
    ctx.lineTo(px + pw, py + ph);
    ctx.stroke();

    // İnce Kılavuz Çizgileri
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    for (let r = 1; r <= 3; r++) {
        const yLine = py + ph - (r / 3) * ph;
        ctx.beginPath();
        ctx.moveTo(px, yLine);
        ctx.lineTo(px + pw, yLine);
        ctx.stroke();
    }
    for (let c = 1; c <= 3; c++) {
        const xLine = px + (c / 3) * pw;
        ctx.beginPath();
        ctx.moveTo(xLine, py);
        ctx.lineTo(xLine, py + ph);
        ctx.stroke();
    }

    if (m.history.length === 0) return;

    // Maksimum Eksen Değerleri
    const maxT = Math.max(10, m.trackLength / m.speed);
    const maxX = m.trackLength;
    const maxV = 30;

    // Eğri Çizimi
    ctx.beginPath();
    if (m.graphMode === "xt") {
        // YOL - ZAMAN (x - t) Grafiği: Luminous Neon Cyan Doğru
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 8;

        m.history.forEach((pt, idx) => {
            const plotX = px + (pt.t / maxT) * pw;
            const plotY = py + ph - (pt.x / maxX) * ph;
            if (idx === 0) ctx.moveTo(plotX, plotY);
            else ctx.lineTo(plotX, plotY);
        });
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Anlık Konum Noktası
        const currentPt = m.history[m.history.length - 1];
        if (currentPt) {
            const curPlotX = px + (currentPt.t / maxT) * pw;
            const curPlotY = py + ph - (currentPt.x / maxX) * ph;
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(curPlotX, curPlotY, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        // SÜRAT - ZAMAN (v - t) Grafiği: Luminous Amber Yatay Doğru
        ctx.strokeStyle = "#fbbf24";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#fbbf24";
        ctx.shadowBlur = 8;

        const fixedV = m.speed;
        const plotY = py + ph - (fixedV / maxV) * ph;
        const endPlotX = px + (m.elapsedTime / maxT) * pw;

        ctx.moveTo(px, plotY);
        ctx.lineTo(Math.min(px + pw, endPlotX), plotY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Eğri altı taralı alan (Alınan Yol = Sürat x Zaman görselleştirmesi)
        ctx.fillStyle = "rgba(251, 191, 36, 0.15)";
        ctx.beginPath();
        ctx.moveTo(px, py + ph);
        ctx.lineTo(px, plotY);
        ctx.lineTo(Math.min(px + pw, endPlotX), plotY);
        ctx.lineTo(Math.min(px + pw, endPlotX), py + ph);
        ctx.closePath();
        ctx.fill();
    }
}

// ============================================================================
// --- 6.2. DENEY 6.2: BİLEŞKE KUVVET VE HALAT ÇEKMECE (FB.6.2.2) ---
// ============================================================================

function initTugOfWarState() {
    const tow = labState.tugOfWar;
    tow.isPlaying = false;
    tow.fWest = 20;
    tow.fEast = 20;
    tow.netForce = 0;
    tow.boxX = 400;
    tow.boxBaseX = 400;
    tow.boxSpeed = 0;
    tow.isDragging = false;
    tow.winner = null;
    tow.cheerParticles = [];

    updateTugDOMControls();
    updateTugMetricsDOM();
}

function resetTugOfWarExperiment() {
    const tow = labState.tugOfWar;
    tow.isPlaying = false;
    tow.boxX = 400;
    tow.boxSpeed = 0;
    tow.winner = null;
    tow.cheerParticles = [];

    const btnPlay = document.getElementById('btn-tug-play-pause');
    const labelPlay = document.getElementById('label-tug-play');
    if (btnPlay) btnPlay.classList.remove('active');
    if (labelPlay) labelPlay.textContent = "Çek";

    updateTugMetricsDOM();
    showLabToast("Kutu ve halat merkez çizgisine (0 m) sıfırlandı!");
}

function updateTugDOMControls() {
    const tow = labState.tugOfWar;
    const sWest = document.getElementById('slider-tug-west');
    const sEast = document.getElementById('slider-tug-east');
    const lWest = document.getElementById('label-tug-west-val');
    const lEast = document.getElementById('label-tug-east-val');

    if (sWest) sWest.value = tow.fWest;
    if (sEast) sEast.value = tow.fEast;
    if (lWest) lWest.textContent = `${tow.fWest} N`;
    if (lEast) lEast.textContent = `${tow.fEast} N`;

    // Senaryo buton durumları
    const isBalanced = (tow.fWest === 20 && tow.fEast === 20);
    const isEastDom = (tow.fWest === 10 && tow.fEast === 30);
    const isWestDom = (tow.fWest === 30 && tow.fEast === 10);

    const btnBal = document.getElementById('btn-tug-preset-balanced');
    const btnEast = document.getElementById('btn-tug-preset-east');
    const btnWest = document.getElementById('btn-tug-preset-west');
    if (btnBal) btnBal.classList.toggle('active', isBalanced);
    if (btnEast) btnEast.classList.toggle('active', isEastDom);
    if (btnWest) btnWest.classList.toggle('active', isWestDom);

    const pillBal = document.getElementById('pill-tug-bal');
    const pillEast = document.getElementById('pill-tug-east');
    const pillWest = document.getElementById('pill-tug-west');
    if (pillBal) pillBal.classList.toggle('active', isBalanced);
    if (pillEast) pillEast.classList.toggle('active', isEastDom);
    if (pillWest) pillWest.classList.toggle('active', isWestDom);
}

function setupTugOfWarControlsDOM() {
    // 1. Oynat / Duraklat
    const btnPlay = document.getElementById('btn-tug-play-pause');
    const labelPlay = document.getElementById('label-tug-play');
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            const tow = labState.tugOfWar;
            tow.isPlaying = !tow.isPlaying;
            btnPlay.classList.toggle('active', tow.isPlaying);
            if (labelPlay) labelPlay.textContent = tow.isPlaying ? "Durdur" : "Çek";
            updateTugMetricsDOM();
        });
    }

    // 2. Sıfırla
    const btnReset = document.getElementById('btn-tug-reset');
    if (btnReset) btnReset.addEventListener('click', resetTugOfWarExperiment);

    // 3. Hazır Senaryolar (Denge, Doğu Üstün, Batı Üstün)
    const setScenario = (west, east) => {
        const tow = labState.tugOfWar;
        tow.fWest = west;
        tow.fEast = east;
        tow.netForce = east - west;
        updateTugDOMControls();
        updateTugMetricsDOM();
        showLabToast(`Kuvvetler: Batı ${west} N vs Doğu ${east} N (Bileşke: ${Math.abs(tow.netForce)} N)`);
    };

    ['btn-tug-preset-balanced', 'pill-tug-bal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setScenario(20, 20));
    });

    ['btn-tug-preset-east', 'pill-tug-east'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setScenario(10, 30));
    });

    ['btn-tug-preset-west', 'pill-tug-west'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setScenario(30, 10));
    });

    // 4. Kuvvet Kaydırıcıları
    const sWest = document.getElementById('slider-tug-west');
    const sEast = document.getElementById('slider-tug-east');
    if (sWest) {
        sWest.addEventListener('input', (e) => {
            labState.tugOfWar.fWest = parseInt(e.target.value, 10);
            labState.tugOfWar.netForce = labState.tugOfWar.fEast - labState.tugOfWar.fWest;
            updateTugDOMControls();
            updateTugMetricsDOM();
        });
    }
    if (sEast) {
        sEast.addEventListener('input', (e) => {
            labState.tugOfWar.fEast = parseInt(e.target.value, 10);
            labState.tugOfWar.netForce = labState.tugOfWar.fEast - labState.tugOfWar.fWest;
            updateTugDOMControls();
            updateTugMetricsDOM();
        });
    }

    // 5. Gözlem Kayıt Butonu
    const btnRecord = document.getElementById('btn-record-data-6-2');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateTugOfWarPhysics() {
    const tow = labState.tugOfWar;
    tow.netForce = tow.fEast - tow.fWest;

    if (tow.isPlaying) {
        // İvme hesabı (a = R / m), sürtünme sönümlemesi
        const mass = 15; // kg
        const accel = (tow.netForce / mass) * 0.8;
        tow.boxSpeed += accel * 0.05;
        tow.boxSpeed *= 0.94; // Sürtünme sönümlenmesi
        tow.boxX += tow.boxSpeed * 8;

        // Pisti Aşma ve Kazanan Kontrolü
        if (tow.boxX >= 590 && !tow.winner) {
            tow.winner = "east";
            tow.isPlaying = false;
            triggerTugCheerParticles(tow.boxX, 280, "#ef4444");
            showLabToast("🚩 DOĞU TAKIMI KAZANDI! (Dengelenmemiş kuvvetler yönünde hızlandı)");
        } else if (tow.boxX <= 210 && !tow.winner) {
            tow.winner = "west";
            tow.isPlaying = false;
            triggerTugCheerParticles(tow.boxX, 280, "#38bdf8");
            showLabToast("🚩 BATI TAKIMI KAZANDI! (Dengelenmemiş kuvvetler yönünde hızlandı)");
        }
    }

    // Kutlama parçacıkları güncelle
    for (let i = tow.cheerParticles.length - 1; i >= 0; i--) {
        const p = tow.cheerParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // yerçekimi
        p.life -= 0.03;
        if (p.life <= 0) tow.cheerParticles.splice(i, 1);
    }

    updateTugMetricsDOM();
}

function triggerTugCheerParticles(x, y, color) {
    const tow = labState.tugOfWar;
    for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 3 + Math.random() * 6;
        tow.cheerParticles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd - 3,
            color: color,
            life: 1.0,
            size: 3 + Math.random() * 4
        });
    }
}

function updateTugMetricsDOM() {
    const tow = labState.tugOfWar;
    const mbWest = document.getElementById('mbar-62-west');
    const mbEast = document.getElementById('mbar-62-east');
    const mbNet = document.getElementById('mbar-62-net');
    const mbStatus = document.getElementById('mbar-62-status');

    if (mbWest) mbWest.textContent = `${tow.fWest} N`;
    if (mbEast) mbEast.textContent = `${tow.fEast} N`;
    if (mbNet) mbNet.textContent = `${Math.abs(tow.netForce)} N`;

    if (mbStatus) {
        if (tow.netForce === 0) {
            mbStatus.textContent = "⚖️ Dengelenmiş Kuvvetler (R = 0 N)";
            mbStatus.style.borderLeftColor = "#10b981";
        } else if (tow.netForce > 0) {
            mbStatus.textContent = `⚡ Doğuya Dengelenmemiş (R = ${tow.netForce} N)`;
            mbStatus.style.borderLeftColor = "#ef4444";
        } else {
            mbStatus.textContent = `⚡ Batıya Dengelenmemiş (R = ${Math.abs(tow.netForce)} N)`;
            mbStatus.style.borderLeftColor = "#38bdf8";
        }
    }

    // Sağ Panel Metrikleri
    const pWest = document.getElementById('metric-62-west');
    const pEast = document.getElementById('metric-62-east');
    const pNet = document.getElementById('metric-62-net');
    const pType = document.getElementById('metric-62-type');
    if (pWest) pWest.textContent = `${tow.fWest} N`;
    if (pEast) pEast.textContent = `${tow.fEast} N`;
    if (pNet) pNet.textContent = `${Math.abs(tow.netForce)} N`;
    if (pType) pType.textContent = (tow.netForce === 0) ? "Dengelenmiş" : "Dengelenmemiş";

    // Dinamik Pedagojik Çıkarım Kartı
    const pTitle = document.getElementById('tug-pedagogical-title');
    const pText = document.getElementById('tug-pedagogical-text');
    const pIcon = document.getElementById('tug-pedagogical-icon');
    if (pTitle && pText) {
        if (tow.netForce === 0) {
            pTitle.textContent = "⚖️ Dengelenmiş Kuvvetler (R = 0 N)";
            pText.textContent = "Zıt yönlü kuvvetlerin büyüklükleri eşittir (F_batı = F_doğu). Net kuvvet sıfır olduğu için cisim duruyorsa durmaya devam eder.";
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-balance-scale" style="color: #10b981;"></i>';
        } else if (tow.netForce > 0) {
            pTitle.textContent = `⚡ Dengelenmemiş Kuvvetler (R = ${tow.netForce} N Doğu)`;
            pText.textContent = `Doğu yönündeki kuvvet (${tow.fEast} N), Batı yönündeki kuvvetten (${tow.fWest} N) büyüktür. Halat ve kutu net kuvvet yönünde (Doğu) hızlanan hareket yapar.`;
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-arrow-right" style="color: #ef4444;"></i>';
        } else {
            const netW = Math.abs(tow.netForce);
            pTitle.textContent = `⚡ Dengelenmemiş Kuvvetler (R = ${netW} N Batı)`;
            pText.textContent = `Batı yönündeki kuvvet (${tow.fWest} N), Doğu yönündeki kuvvetten (${tow.fEast} N) büyüktür. Halat ve kutu net kuvvet yönünde (Batı) hızlanan hareket yapar.`;
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-arrow-left" style="color: #38bdf8;"></i>';
        }
    }
}

function drawTugOfWarSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // 1. Zemin (Spor Salonu Parke / Laboratuvar Zemini)
    const floorGrad = ctx.createLinearGradient(0, 0, 0, 500);
    floorGrad.addColorStop(0, "#0f172a");
    floorGrad.addColorStop(0.55, "#1e293b");
    floorGrad.addColorStop(1, "#0b0f19");
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Çizgili Parke Tahtası Çizgileri
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let y = 300; y < 500; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(800, y);
        ctx.stroke();
    }

    // Orta Eksen ve Mesafe Çizgisi (0 m Merkezi, -5m Batı, +5m Doğu)
    ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 390);
    ctx.lineTo(700, 390);
    ctx.stroke();

    // Merkez 0 Çizgisi
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(400, 240);
    ctx.lineTo(400, 420);
    ctx.stroke();

    // 2. Halat
    drawTugRope(ctx);

    // 3. Ortadaki Kutu & Zafer Bayrağı
    drawTugBoxAndFlag(ctx);

    // 4. Batı Takımı (Mavi / Sol - 2 Sporcu)
    drawTugAthletes(ctx, "west");

    // 5. Doğu Takımı (Kırmızı / Sağ - 2 Sporcu)
    drawTugAthletes(ctx, "east");

    // 6. Kuvvet Vektör Okları
    drawTugForceVectors(ctx);

    // 7. Kutlama Parçacıkları
    const tow = labState.tugOfWar;
    tow.cheerParticles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
    });

    ctx.restore();
}

function drawTugRope(ctx) {
    const tow = labState.tugOfWar;
    const ropeY = 320;

    ctx.save();
    ctx.strokeStyle = "#d97706"; // Kenevir sarısı
    ctx.lineWidth = 9;
    ctx.lineCap = "round";

    // Halat örgüsü gölgesi
    ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(120, ropeY);
    ctx.lineTo(680, ropeY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Halat kıvrım detay çizgisi
    ctx.strokeStyle = "#b45309";
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(120, ropeY);
    ctx.lineTo(680, ropeY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();
}

function drawTugBoxAndFlag(ctx) {
    const tow = labState.tugOfWar;
    const bx = tow.boxX;
    const by = 300;

    ctx.save();

    // Kutu Zemin Gölgesi
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.beginPath();
    ctx.ellipse(bx, 385, 36, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ahşap Sandık
    const crateGrad = ctx.createLinearGradient(bx - 30, by, bx + 30, by + 65);
    crateGrad.addColorStop(0, "#d97706");
    crateGrad.addColorStop(1, "#92400e");
    ctx.fillStyle = crateGrad;
    ctx.strokeStyle = "#451a03";
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.roundRect(bx - 30, by, 60, 65, 6);
    ctx.fill();
    ctx.stroke();

    // Sandık Çapraz Takviye Çıtaları
    ctx.strokeStyle = "rgba(69, 26, 3, 0.6)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx - 26, by + 6);
    ctx.lineTo(bx + 26, by + 59);
    ctx.moveTo(bx + 26, by + 6);
    ctx.lineTo(bx - 26, by + 59);
    ctx.stroke();

    // Metal Köşe Destekleri
    ctx.fillStyle = "#94a3b8";
    [[-30, by], [22, by], [-30, by + 57], [22, by + 57]].forEach(([cx, cy]) => {
        ctx.fillRect(cx, cy, 8, 8);
    });

    // Tekerlekler (Ağır Yük Rulmanı)
    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.arc(bx - 20, 375, 7, 0, Math.PI * 2);
    ctx.arc(bx + 20, 375, 7, 0, Math.PI * 2);
    ctx.fill();

    // Kırmızı Merkez Zafer Bayrağı
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(bx, by - 45);
    ctx.stroke();

    ctx.fillStyle = "#ef4444";
    ctx.shadowColor = "#ef4444";
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(bx, by - 45);
    ctx.lineTo(bx + 26, by - 33);
    ctx.lineTo(bx, by - 21);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
}

function drawTugAthletes(ctx, team) {
    const tow = labState.tugOfWar;
    const isWest = (team === "west");
    const force = isWest ? tow.fWest : tow.fEast;

    // Kuvvet miktarına göre sporcuların geriye yatma açısı (Lean angle)
    const leanAngle = (force / 50) * 0.35 * (isWest ? -1 : 1);
    const teamColor = isWest ? "#38bdf8" : "#f87171";
    const teamDark = isWest ? "#0284c7" : "#dc2626";

    // İki sporcunun pozisyonları
    const positions = isWest ? [170, 250] : [550, 630];

    positions.forEach((px, idx) => {
        ctx.save();
        ctx.translate(px, 370);
        ctx.rotate(leanAngle);

        // Ayak Zemin Teması ve Spor Ayakkabı
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(isWest ? -18 : 6, 0, 20, 8);

        // Bükülen Bacaklar
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 7;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(isWest ? -12 : 12, -26);
        ctx.lineTo(0, -48);
        ctx.stroke();

        // Gövde (Forma)
        const jerseyGrad = ctx.createLinearGradient(-15, -48, 15, -85);
        jerseyGrad.addColorStop(0, teamDark);
        jerseyGrad.addColorStop(1, teamColor);
        ctx.fillStyle = jerseyGrad;
        ctx.beginPath();
        ctx.roundRect(-12, -85, 24, 38, 4);
        ctx.fill();

        // Çeken Kollar ve Halatı Kavrayan Eller
        ctx.strokeStyle = "#fed7aa"; // Ten rengi
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, -78);
        ctx.lineTo(isWest ? 14 : -14, -58);
        ctx.lineTo(isWest ? 24 : -24, -50);
        ctx.stroke();

        // Kafa ve Sporcu Saç/Bandana
        ctx.fillStyle = "#fed7aa";
        ctx.beginPath();
        ctx.arc(0, -96, 11, 0, Math.PI * 2);
        ctx.fill();

        // Saç / Bandana
        ctx.fillStyle = teamColor;
        ctx.beginPath();
        ctx.arc(0, -99, 11, Math.PI, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    });
}

function drawTugForceVectors(ctx) {
    const tow = labState.tugOfWar;
    const bx = tow.boxX;
    const arrowY = 220;

    // Batı Kuvvet Vektörü (Mavi Ok - Sola)
    if (tow.fWest > 0) {
        const lenW = (tow.fWest / 50) * 120;
        drawNeonArrow(ctx, bx - 35, arrowY, bx - 35 - lenW, arrowY, "#38bdf8", 4);
    }

    // Doğu Kuvvet Vektörü (Kırmızı Ok - Sağa)
    if (tow.fEast > 0) {
        const lenE = (tow.fEast / 50) * 120;
        drawNeonArrow(ctx, bx + 35, arrowY, bx + 35 + lenE, arrowY, "#f87171", 4);
    }

    // Net Bileşke Kuvvet Vektörü (Altın Neon Ok)
    if (Math.abs(tow.netForce) > 0) {
        const isEast = (tow.netForce > 0);
        const lenNet = (Math.abs(tow.netForce) / 50) * 140;
        const netStartX = bx;
        const netEndX = isEast ? bx + lenNet : bx - lenNet;
        drawNeonArrow(ctx, netStartX, arrowY - 40, netEndX, arrowY - 40, "#facc15", 5);
    } else {
        // Denge Sembolü (Terazi / Halka)
        ctx.save();
        ctx.fillStyle = "#10b981";
        ctx.shadowColor = "#10b981";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(bx, arrowY - 40, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
    }
}

function drawNeonArrow(ctx, x1, y1, x2, y2, color, width) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Ok Başı
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headLen = 14;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headLen * Math.cos(angle - Math.PI / 6), y2 - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - headLen * Math.cos(angle + Math.PI / 6), y2 - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

// ============================================================================
// --- 6.4. DENEY 6.4: YANSIMA KANUNLARI VE AYNALAR SİMÜLATÖRÜ (FB.6.4.1 - FB.6.4.3) ---
// ============================================================================

function initReflectionState() {
    const r = labState.reflection;
    r.mirrorType = "plane";
    r.subMode = "smooth";
    r.incidentAngle = 40;
    r.objectDistance = 160;
    r.focalLength = 100;
    r.candleHeight = 52;
    r.isDragging = false;

    updateReflectionDOMControls();
    updateReflectionMetricsDOM();
}

function resetReflectionExperiment() {
    const r = labState.reflection;
    r.mirrorType = "plane";
    r.subMode = "smooth";
    r.incidentAngle = 40;
    r.objectDistance = 160;
    r.isDragging = false;

    updateReflectionDOMControls();
    updateReflectionMetricsDOM();
    showLabToast("Optik düzenek düzlem ayna ve 40° gelme açısına sıfırlandı!");
}

function updateReflectionDOMControls() {
    const r = labState.reflection;
    const isPlane = (r.mirrorType === "plane");
    const isConcave = (r.mirrorType === "concave");
    const isConvex = (r.mirrorType === "convex");

    // Ayna Seçim Butonları (Hızlı Bar & Sağ Panel)
    const btnPlane = document.getElementById('btn-mirror-plane');
    const btnConcave = document.getElementById('btn-mirror-concave');
    const btnConvex = document.getElementById('btn-mirror-convex');
    const pillPlane = document.getElementById('pill-mirror-plane');
    const pillConcave = document.getElementById('pill-mirror-concave');
    const pillConvex = document.getElementById('pill-mirror-convex');

    if (btnPlane) btnPlane.classList.toggle('active', isPlane);
    if (btnConcave) btnConcave.classList.toggle('active', isConcave);
    if (btnConvex) btnConvex.classList.toggle('active', isConvex);
    if (pillPlane) pillPlane.classList.toggle('active', isPlane);
    if (pillConcave) pillConcave.classList.toggle('active', isConcave);
    if (pillConvex) pillConvex.classList.toggle('active', isConvex);

    // Düzlem Ayna Alt Modu (Düzgün vs Dağınık)
    const isSmooth = (r.subMode === "smooth");
    const btnSmooth = document.getElementById('btn-refl-smooth');
    const btnDiffuse = document.getElementById('btn-refl-diffuse');
    const pillSmooth = document.getElementById('pill-refl-smooth');
    const pillDiffuse = document.getElementById('pill-refl-diffuse');
    if (btnSmooth) btnSmooth.classList.toggle('active', isSmooth);
    if (btnDiffuse) btnDiffuse.classList.toggle('active', !isSmooth);
    if (pillSmooth) pillSmooth.classList.toggle('active', isSmooth);
    if (pillDiffuse) pillDiffuse.classList.toggle('active', !isSmooth);

    // Kontrol Grupları Görünürlüğü (Açı vs Mesafe)
    const wrapAngle = document.getElementById('wrap-refl-angle');
    const wrapDist = document.getElementById('wrap-refl-dist');
    const wrapSurface = document.getElementById('wrap-refl-surface');
    const groupSubmodes = document.getElementById('group-refl-submodes');
    const btnMinus5 = document.getElementById('btn-refl-minus-5');
    const btnPlus5 = document.getElementById('btn-refl-plus-5');

    if (wrapAngle) wrapAngle.style.display = isPlane ? '' : 'none';
    if (wrapDist) wrapDist.style.display = isPlane ? 'none' : '';
    if (wrapSurface) wrapSurface.style.display = isPlane ? '' : 'none';
    if (groupSubmodes) groupSubmodes.style.display = isPlane ? '' : 'none';
    if (btnMinus5) btnMinus5.style.display = isPlane ? '' : 'none';
    if (btnPlus5) btnPlus5.style.display = isPlane ? '' : 'none';

    // Açı Kaydırıcısı & Etiketi
    const sliderAngle = document.getElementById('slider-refl-angle');
    const labelAngle = document.getElementById('label-refl-angle-val');
    if (sliderAngle) sliderAngle.value = r.incidentAngle;
    if (labelAngle) labelAngle.textContent = `${r.incidentAngle}°`;

    // Mesafe Kaydırıcısı & Etiketi
    const sliderDist = document.getElementById('slider-refl-dist');
    const labelDist = document.getElementById('label-refl-dist-val');
    if (sliderDist) sliderDist.value = r.objectDistance;
    if (labelDist) labelDist.textContent = `${r.objectDistance} mm`;
}

function setupReflectionControlsDOM() {
    // 1. Ayna Türü Seçimi
    const setMirrorType = (type) => {
        labState.reflection.mirrorType = type;
        updateReflectionDOMControls();
        updateReflectionMetricsDOM();
        if (type === "plane") {
            showLabToast("🪞 Düzlem Ayna Seçildi (Gelme Açısı = Yansıma Açısı, Düzgün Görüntü)");
        } else if (type === "concave") {
            showLabToast("🔍 Çukur (İçbükey) Ayna Seçildi (Işığı Odakta Toplar, Yakınsak)");
        } else {
            showLabToast("🚗 Tümsek (Dışbükey) Ayna Seçildi (Işığı Dağıtır, Geniş Görüş Alanı)");
        }
    };

    ['btn-mirror-plane', 'pill-mirror-plane'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setMirrorType("plane"));
    });

    ['btn-mirror-concave', 'pill-mirror-concave'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setMirrorType("concave"));
    });

    ['btn-mirror-convex', 'pill-mirror-convex'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setMirrorType("convex"));
    });

    // 2. Yansıma Yüzeyi Türü (Düzgün vs Dağınık)
    const setSubMode = (mode) => {
        labState.reflection.subMode = mode;
        updateReflectionDOMControls();
        updateReflectionMetricsDOM();
        showLabToast(mode === "smooth" ? "✨ Düzgün Yansıma: Paralel ışınlar birbirine paralel yansır" : "〰️ Dağınık Yansıma: Pürüzlü yüzeyde ışınlar farklı yönlere saçılır");
    };

    ['btn-refl-smooth', 'pill-refl-smooth'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setSubMode("smooth"));
    });

    ['btn-refl-diffuse', 'pill-refl-diffuse'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setSubMode("diffuse"));
    });

    // 3. Açı Butonları (-5° / +5°)
    const btnMinus5 = document.getElementById('btn-refl-minus-5');
    const btnPlus5 = document.getElementById('btn-refl-plus-5');
    if (btnMinus5) {
        btnMinus5.addEventListener('click', () => {
            const r = labState.reflection;
            r.incidentAngle = Math.max(0, r.incidentAngle - 5);
            updateReflectionDOMControls();
            updateReflectionMetricsDOM();
        });
    }
    if (btnPlus5) {
        btnPlus5.addEventListener('click', () => {
            const r = labState.reflection;
            r.incidentAngle = Math.min(75, r.incidentAngle + 5);
            updateReflectionDOMControls();
            updateReflectionMetricsDOM();
        });
    }

    // 4. Açı Kaydırıcısı
    const sliderAngle = document.getElementById('slider-refl-angle');
    if (sliderAngle) {
        sliderAngle.addEventListener('input', (e) => {
            labState.reflection.incidentAngle = parseInt(e.target.value, 10);
            updateReflectionDOMControls();
            updateReflectionMetricsDOM();
        });
    }

    // 5. Mesafe Kaydırıcısı
    const sliderDist = document.getElementById('slider-refl-dist');
    if (sliderDist) {
        sliderDist.addEventListener('input', (e) => {
            labState.reflection.objectDistance = parseInt(e.target.value, 10);
            updateReflectionDOMControls();
            updateReflectionMetricsDOM();
        });
    }

    // 6. Sıfırla
    const btnReset = document.getElementById('btn-refl-reset');
    if (btnReset) btnReset.addEventListener('click', resetReflectionExperiment);

    // 7. Gözlem Kayıt Butonu
    const btnRecord = document.getElementById('btn-record-data-6-4');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateReflectionPhysics() {
    updateReflectionMetricsDOM();
}

function updateReflectionMetricsDOM() {
    const r = labState.reflection;
    const isPlane = (r.mirrorType === "plane");
    const isConcave = (r.mirrorType === "concave");
    const isConvex = (r.mirrorType === "convex");

    // Canvas Altı Responsive Metrik Şeridi (#metrics-bar-6-4)
    const mbMirror = document.getElementById('mbar-64-mirror');
    const mbInci = document.getElementById('mbar-64-inci');
    const mbRefl = document.getElementById('mbar-64-refl');
    const mbType = document.getElementById('mbar-64-type');
    const mbStatus = document.getElementById('mbar-64-status');

    let mirrorName = "Düzlem Ayna";
    let imageStatus = "Düz ve Eşit Boyut";
    let reflType = "Düzgün Yansıma";

    if (isPlane) {
        mirrorName = "Düzlem Ayna";
        reflType = (r.subMode === "smooth") ? "Düzgün Yansıma" : "Dağınık Yansıma";
        imageStatus = (r.subMode === "smooth") ? "Düz, Eşit Boyut, Simetrik" : "Görüntü Net Değil (Saçılma)";
    } else if (isConcave) {
        mirrorName = "Çukur (İçbükey) Ayna";
        reflType = "Işığı Toplar (Yakınsak)";
        const d = r.objectDistance;
        const f = r.focalLength;
        if (d < f) imageStatus = "Düz ve Dev Büyüklükte (Dişçi)";
        else if (d === f) imageStatus = "Odak Noktası (Işınlar Paralel)";
        else if (d < 2 * f) imageStatus = "Ters ve Büyük Görüntü";
        else if (d === 2 * f) imageStatus = "Ters ve Eşit Boyut (Merkez)";
        else imageStatus = "Ters ve Küçük Görüntü (Kaşık İçi)";
    } else {
        mirrorName = "Tümsek (Dışbükey) Ayna";
        reflType = "Işığı Dağıtır (Iraksak)";
        imageStatus = "Daima Düz, Küçük ve Geniş Görüş";
    }

    const pillRay = document.getElementById('mbar-64-ray-pill');
    if (pillRay) {
        if (isPlane) {
            pillRay.innerHTML = `<i class="fas fa-compass"></i> i: <strong id="mbar-64-inci">${r.incidentAngle}°</strong> · r: <strong id="mbar-64-refl">${r.incidentAngle}°</strong> <span class="pill-sub">(i = r)</span>`;
        } else if (isConcave) {
            pillRay.innerHTML = `<i class="fas fa-arrows-alt-h"></i> Cisim (do): <strong id="mbar-64-inci">${r.objectDistance} mm</strong> · Odak (f): <strong id="mbar-64-refl">${r.focalLength} mm</strong>`;
        } else {
            pillRay.innerHTML = `<i class="fas fa-arrows-alt-h"></i> Cisim (do): <strong id="mbar-64-inci">${r.objectDistance} mm</strong> · Odak (f): <strong id="mbar-64-refl">-${r.focalLength} mm</strong>`;
        }
    } else {
        if (isPlane) {
            if (mbInci) mbInci.textContent = `${r.incidentAngle}°`;
            if (mbRefl) mbRefl.textContent = `${r.incidentAngle}°`;
        } else if (isConcave) {
            if (mbInci) mbInci.textContent = `${r.objectDistance} mm`;
            if (mbRefl) mbRefl.textContent = `${r.focalLength} mm`;
        } else {
            if (mbInci) mbInci.textContent = `${r.objectDistance} mm`;
            if (mbRefl) mbRefl.textContent = `-${r.focalLength} mm`;
        }
    }

    if (mbMirror) mbMirror.textContent = mirrorName;
    if (mbType) mbType.textContent = reflType;
    if (mbStatus) {
        mbStatus.textContent = imageStatus;
        mbStatus.style.borderLeftColor = isPlane ? "#38bdf8" : (isConcave ? "#f59e0b" : "#10b981");
    }

    // Sağ Panel Veri Çipleri
    const pInci = document.getElementById('metric-64-inci');
    const pRefl = document.getElementById('metric-64-refl');
    const pMirror = document.getElementById('metric-64-mirror');
    const pImage = document.getElementById('metric-64-image');

    if (pInci) {
        pInci.textContent = isPlane ? `${r.incidentAngle}°` : `${r.objectDistance} mm`;
        const lbl = pInci.previousElementSibling;
        if (lbl) lbl.textContent = isPlane ? "Gelme Açısı (i)" : "Cisim Mesafesi (do)";
    }
    if (pRefl) {
        pRefl.textContent = isPlane ? `${r.incidentAngle}°` : (isConcave ? `${r.focalLength} mm` : `-${r.focalLength} mm`);
        const lbl = pRefl.previousElementSibling;
        if (lbl) lbl.textContent = isPlane ? "Yansıma Açısı (r)" : "Odak Uzaklığı (f)";
    }
    if (pMirror) pMirror.textContent = mirrorName;
    if (pImage) pImage.textContent = imageStatus;

    // Dinamik Pedagojik Çıkarım Kartı
    const pTitle = document.getElementById('refl-pedagogical-title');
    const pText = document.getElementById('refl-pedagogical-text');
    const pIcon = document.getElementById('refl-pedagogical-icon');

    if (pTitle && pText && pIcon) {
        if (isPlane) {
            pIcon.innerHTML = `<i class="fas fa-clone" style="color:#38bdf8;"></i>`;
            pTitle.textContent = "📐 1. Yansıma Kanunu (i = r)";
            if (r.subMode === "smooth") {
                pText.textContent = `Gelme açısı (${r.incidentAngle}°), yansıma açısına (${r.incidentAngle}°) daima eşittir. Pürüzsüz düzlem aynada paralel gelen ışınlar birbirine paralel olarak yansır. Görüntü cisimle aynı büyüklükte, düz ve simetriktir.`;
            } else {
                pText.textContent = `Pürüzlü yüzeylerde her bir ışın için yansıma kanunu (i = r) geçerli olsa da yüzey normalleri farklı yönlere baktığı için ışınlar farklı açılarla saçılır (Dağınık yansıma). Bu nedenle net bir görüntü oluşmaz.`;
            }
        } else if (isConcave) {
            pIcon.innerHTML = `<i class="fas fa-circle-notch" style="color:#f59e0b;"></i>`;
            pTitle.textContent = "🔍 Çukur Ayna (Işığı Toplar)";
            if (r.objectDistance < r.focalLength) {
                pText.textContent = `Cisim odak noktası ile ayna arasındayken (d = ${r.objectDistance} mm < f), aynada DÜZ ve DEV BÜYÜKLÜKTE görüntü oluşur. Bu ilke diş hekimi aynalarında, makyaj aynalarında ve mikroskoplarda kullanılır.`;
            } else {
                pText.textContent = `Cisim odaktan uzaktayken gerçek ve TERS görüntü oluşur. Çukur aynalar ışığı tek bir noktada (odak) topladığı için Güneş fırınlarında, el fenerlerinde ve araba farlarında yansıtıcı çanak olarak kullanılır.`;
            }
        } else {
            pIcon.innerHTML = `<i class="fas fa-circle" style="color:#10b981;"></i>`;
            pTitle.textContent = "🚗 Tümsek Ayna (Işığı Dağıtır)";
            pText.textContent = `Tümsek aynalar üzerine düşen paralel ışınları dışarıya doğru dağıtır. Cismin konumu neresi olursa olsun görüntü DAİMA DÜZ ve KÜÇÜKTÜR. Görüş alanı çok geniştir; araç yan dikiz aynaları, kavşak aynaları ve mağaza güvenlik aynalarında tercih edilir.`;
        }
    }
}

function drawReflectionSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    const r = labState.reflection;

    // 1. Optik Laboratuvarı Arka Planı (Karanlık Masa & Hassas Izgara)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "#080c16");
    bgGrad.addColorStop(1, "#0d1527");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // İnce Optik Izgarası (Grid)
    ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 40; x < 800; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 500);
        ctx.stroke();
    }
    for (let y = 40; y < 500; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(800, y);
        ctx.stroke();
    }

    if (r.mirrorType === "plane") {
        drawPlaneMirrorSimulation(ctx, r);
    } else if (r.mirrorType === "concave") {
        drawConcaveMirrorSimulation(ctx, r);
    } else {
        drawConvexMirrorSimulation(ctx, r);
    }

    ctx.restore();
}

function drawPlaneMirrorSimulation(ctx, r) {
    const mirrorY = 380;
    const mirrorStartX = 160;
    const mirrorEndX = 640;
    const normalX = 400;

    ctx.save();

    // 1. Yüzey Normali (N) - Kesikli Neon Cyan Çizgi
    ctx.strokeStyle = "rgba(56, 189, 248, 0.65)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(normalX, 90);
    ctx.lineTo(normalX, mirrorY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Normal Tepe Gösterge Noktası
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(normalX, 90, 4, 0, Math.PI * 2);
    ctx.fill();

    // 2. İletki Açı Yayları (Protractor Arc)
    const rad = r.incidentAngle * (Math.PI / 180);
    const arcR = 85;

    // Gelme Açısı Yayı (Sol / Normalden Işına)
    ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(normalX, mirrorY, arcR, -Math.PI / 2 - rad, -Math.PI / 2);
    ctx.stroke();

    // Yansıma Açısı Yayı (Sağ / Normalden Işına)
    ctx.strokeStyle = "rgba(74, 222, 128, 0.5)";
    ctx.beginPath();
    ctx.arc(normalX, mirrorY, arcR, -Math.PI / 2, -Math.PI / 2 + rad);
    ctx.stroke();

    // 3. Işınlar: Düzgün vs Dağınık Yansıma
    const isSmooth = (r.subMode === "smooth");
    const rayColorIn = "#38bdf8";
    const rayColorOut = "#4ade80";

    if (isSmooth) {
        // A. Düzgün Yansıma: Merkez Işın ve 2 Yan Paralel Işın
        const beamOffsets = [0, -32, 32];
        beamOffsets.forEach((off, idx) => {
            const hitX = normalX + off;
            const hitY = mirrorY;
            const len = 340;
            const srcX = hitX - len * Math.sin(rad);
            const srcY = hitY - len * Math.cos(rad);
            const outX = hitX + len * Math.sin(rad);
            const outY = hitY - len * Math.cos(rad);

            const isMain = (idx === 0);
            const alpha = isMain ? 1.0 : 0.45;
            const w = isMain ? 3.5 : 2.0;

            // Gelen Işın (Mavi Neon)
            drawLaserBeam(ctx, srcX, srcY, hitX, hitY, rayColorIn, w, alpha);
            // Yansıyan Işın (Yeşil Neon)
            drawLaserBeam(ctx, hitX, hitY, outX, outY, rayColorOut, w, alpha);
        });

        // Merkez Lazer Cihazı
        const mainSrcX = normalX - 310 * Math.sin(rad);
        const mainSrcY = mirrorY - 310 * Math.cos(rad);
        drawLaserDevice(ctx, mainSrcX, mainSrcY, normalX, mirrorY, 1.0);
    } else {
        // B. Dağınık Yansıma: Paralel Gelen Işınlar Farklı Açılarla Saçılır
        const diffuseRays = [
            { off: -36, outDeg: 65 },
            { off: 0, outDeg: 25 },
            { off: 36, outDeg: 55 }
        ];

        diffuseRays.forEach(dr => {
            const hitX = normalX + dr.off;
            const hitY = mirrorY;
            const len = 320;
            const srcX = hitX - len * Math.sin(rad);
            const srcY = hitY - len * Math.cos(rad);

            // Gelen Paralel Işın
            drawLaserBeam(ctx, srcX, srcY, hitX, hitY, rayColorIn, 2.5, 0.85);

            // Farklı Yöne Saçılan Yansıyan Işın
            const outRad = dr.outDeg * (Math.PI / 180);
            const outX = hitX + len * Math.sin(outRad);
            const outY = hitY - len * Math.cos(outRad);
            drawLaserBeam(ctx, hitX, hitY, outX, outY, "#f59e0b", 2.2, 0.85);
        });

        // Lazer Cihazı
        const mainSrcX = normalX - 310 * Math.sin(rad);
        const mainSrcY = mirrorY - 310 * Math.cos(rad);
        drawLaserDevice(ctx, mainSrcX, mainSrcY, normalX, mirrorY, 1.0);
    }

    // 4. Ayna Gövdesi Çizimi (Yatay Çubuk)
    drawPlaneMirrorGlass(ctx, mirrorStartX, mirrorEndX, mirrorY, isSmooth);

    ctx.restore();
}

function drawPlaneMirrorGlass(ctx, startX, endX, y, isSmooth) {
    ctx.save();

    // Arka Sırlı Tabaka (Gümüş & Bakır Kaplama)
    ctx.fillStyle = "#475569";
    ctx.fillRect(startX, y, endX - startX, 16);

    // Sır Taraması (Arka yüzey çapraz çizgileri)
    ctx.strokeStyle = "rgba(15, 23, 42, 0.8)";
    ctx.lineWidth = 1.5;
    for (let x = startX + 6; x < endX; x += 14) {
        ctx.beginPath();
        ctx.moveTo(x, y + 16);
        ctx.lineTo(x + 10, y + 3);
        ctx.stroke();
    }

    if (isSmooth) {
        // Düzgün Cam ve Gümüş Yansıtıcı Şerit
        const mirrorGrad = ctx.createLinearGradient(startX, y - 4, startX, y + 2);
        mirrorGrad.addColorStop(0, "#ffffff");
        mirrorGrad.addColorStop(0.5, "#93c5fd");
        mirrorGrad.addColorStop(1, "#38bdf8");
        ctx.fillStyle = mirrorGrad;
        ctx.fillRect(startX, y - 4, endX - startX, 5);

        // Ayna Yüzey Parlaması
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(startX, y - 4);
        ctx.lineTo(endX, y - 4);
        ctx.stroke();
        ctx.shadowBlur = 0;
    } else {
        // Dağınık Yansıma İçin Pürüzlü / Tırtıklı Yüzey Çizimi
        ctx.fillStyle = "#cbd5e1";
        ctx.beginPath();
        ctx.moveTo(startX, y);
        for (let x = startX; x <= endX; x += 10) {
            const bump = ((x / 10) % 2 === 0) ? -5 : -1;
            ctx.lineTo(x, y + bump);
        }
        ctx.lineTo(endX, y + 6);
        ctx.lineTo(startX, y + 6);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    ctx.restore();
}

function drawConcaveMirrorSimulation(ctx, r) {
    const axisY = 250;
    const mirrorX = 620;
    const f = r.focalLength; // 100 mm
    const focusX = mirrorX - f; // 520
    const centerX = mirrorX - 2 * f; // 420
    const candleX = mirrorX - r.objectDistance;

    ctx.save();

    // 1. Asal Eksen (Horizontal Principal Axis)
    ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(80, axisY);
    ctx.lineTo(720, axisY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Odak Noktası (F) ve Merkez Noktası (M)
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(focusX, axisY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(centerX, axisY, 5, 0, Math.PI * 2);
    ctx.fill();

    // 3. Çukur Ayna Yayı (Concave Arc - İçbükey)
    ctx.save();
    ctx.strokeStyle = "#00d2ff";
    ctx.lineWidth = 6;
    ctx.shadowColor = "#00d2ff";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    // Yay çukur tarafı sola bakar
    ctx.arc(mirrorX + 200, axisY, 230, Math.PI * 0.82, Math.PI * 1.18);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Aynanın Arka Sırlı Taraması
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    for (let a = Math.PI * 0.83; a <= Math.PI * 1.17; a += 0.04) {
        const ax = mirrorX + 200 + Math.cos(a) * 230;
        const ay = axisY + Math.sin(a) * 230;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax + 10, ay + 6);
        ctx.stroke();
    }
    ctx.restore();

    // 4. Cisim: Yanan Mum (Candle Object)
    const candleH = r.candleHeight;
    drawReflectionCandle(ctx, candleX, axisY, candleH, false, 1.0);

    // 5. Işın Çizimleri (Principal Rays)
    const flameTipY = axisY - candleH;
    const hitY1 = flameTipY;
    const hitX1 = mirrorX - 10;

    // Işın 1: Asal Eksene Paralel Gelen -> Odaktan Geçerek Yansır
    drawLaserBeam(ctx, candleX, flameTipY, hitX1, hitY1, "#38bdf8", 2.2, 0.85);
    // Odaktan geçerek uzar
    const slope1 = (axisY - hitY1) / (focusX - hitX1);
    const endX1 = 80;
    const endY1 = hitY1 + slope1 * (endX1 - hitX1);
    drawLaserBeam(ctx, hitX1, hitY1, endX1, endY1, "#4ade80", 2.2, 0.85);

    // Işın 2: Tepe Noktasına Vuran Işın (Aynı Açıyla Yansır)
    const hitX2 = mirrorX - 6;
    const hitY2 = axisY;
    drawLaserBeam(ctx, candleX, flameTipY, hitX2, hitY2, "#38bdf8", 2.0, 0.8);
    const outSlope2 = (axisY - flameTipY) / (hitX2 - candleX);
    const endX2 = 80;
    const endY2 = hitY2 + outSlope2 * (hitX2 - endX2);
    drawLaserBeam(ctx, hitX2, hitY2, endX2, endY2, "#4ade80", 2.0, 0.8);

    // 6. Görüntü Çizimi (Image Formation)
    const d = r.objectDistance;
    if (d < f) {
        // DÜZ ve DEV BÜYÜKLÜKTE (Sanal - Ayna Arkasında)
        const di = Math.abs((d * f) / (d - f));
        const mag = Math.min(2.5, di / d);
        const imageX = mirrorX + Math.min(100, di * 0.4);
        const imageH = candleH * mag;

        // Sanal ışın uzantıları (Dashed)
        ctx.strokeStyle = "rgba(74, 222, 128, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(hitX1, hitY1);
        ctx.lineTo(imageX, axisY - imageH);
        ctx.moveTo(hitX2, hitY2);
        ctx.lineTo(imageX, axisY - imageH);
        ctx.stroke();
        ctx.setLineDash([]);

        // Büyütülmüş Düz Mum Görüntüsü
        drawReflectionCandle(ctx, imageX, axisY, imageH, false, 0.7);
    } else if (d > f) {
        // TERS GÖRÜNTÜ (Gerçek - Ayna Önünde)
        const di = (d * f) / (d - f);
        const mag = Math.min(2.2, Math.max(0.4, di / d));
        const imageX = mirrorX - Math.min(480, di);
        const imageH = candleH * mag;

        if (imageX > 80) {
            drawReflectionCandle(ctx, imageX, axisY, imageH, true, 0.75);
        }
    }

    ctx.restore();
}

function drawConvexMirrorSimulation(ctx, r) {
    const axisY = 250;
    const mirrorX = 560;
    const f = r.focalLength; // 100 mm (Sanal Odak ayna arkasında)
    const virtualFocusX = mirrorX + f; // 660
    const candleX = mirrorX - r.objectDistance;

    ctx.save();

    // 1. Asal Eksen
    ctx.strokeStyle = "rgba(148, 163, 184, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(80, axisY);
    ctx.lineTo(740, axisY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Sanal Odak (Ayna Arkasında)
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(virtualFocusX, axisY, 5, 0, Math.PI * 2);
    ctx.fill();

    // 3. Tümsek Ayna Yayı (Convex Arc - Dışbükey Sola Bakan Şişkinlik)
    ctx.save();
    ctx.strokeStyle = "#10b981";
    ctx.lineWidth = 6;
    ctx.shadowColor = "#10b981";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    // Yay bombeli tarafı sola bakar
    ctx.arc(mirrorX - 200, axisY, 230, -Math.PI * 0.18, Math.PI * 0.18);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Aynanın Arka Taraması (Sağ Taraf)
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    for (let a = -Math.PI * 0.17; a <= Math.PI * 0.17; a += 0.04) {
        const ax = mirrorX - 200 + Math.cos(a) * 230;
        const ay = axisY + Math.sin(a) * 230;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax + 10, ay + 6);
        ctx.stroke();
    }
    ctx.restore();

    // 4. Cisim: Yanan Mum
    const candleH = r.candleHeight;
    drawReflectionCandle(ctx, candleX, axisY, candleH, false, 1.0);

    // 5. Işın Çizimleri
    const flameTipY = axisY - candleH;
    const hitX1 = mirrorX + 8;
    const hitY1 = flameTipY;

    // Asal Eksene Paralel Gelen Işın
    drawLaserBeam(ctx, candleX, flameTipY, hitX1, hitY1, "#38bdf8", 2.2, 0.85);

    // Odaktan çıkıyormuş gibi dağılan yansıyan ışın
    const slope1 = (hitY1 - axisY) / (hitX1 - virtualFocusX);
    const endX1 = 80;
    const endY1 = hitY1 - slope1 * (hitX1 - endX1);
    drawLaserBeam(ctx, hitX1, hitY1, endX1, endY1, "#4ade80", 2.2, 0.85);

    // Ayna Arkasına Sanal Uzantı Çizgisi (Dashed)
    ctx.strokeStyle = "rgba(74, 222, 128, 0.45)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(hitX1, hitY1);
    ctx.lineTo(virtualFocusX, axisY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 6. Görüntü Çizimi (Daima DÜZ ve KÜÇÜK, Sanal)
    const d = r.objectDistance;
    const di = (d * f) / (d + f);
    const mag = di / d;
    const imageX = mirrorX + di * 0.75;
    const imageH = candleH * mag;

    drawReflectionCandle(ctx, imageX, axisY, imageH, false, 0.7);

    ctx.restore();
}

function drawReflectionCandle(ctx, x, baseY, height, isFlipped, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;

    const dir = isFlipped ? -1 : 1;
    const waxW = Math.max(10, height * 0.28);
    const waxH = height * 0.7;

    // Mum Gövdesi (Beyaz / Sarı Parafin)
    const waxGrad = ctx.createLinearGradient(x - waxW / 2, baseY, x + waxW / 2, baseY);
    waxGrad.addColorStop(0, "#fef08a");
    waxGrad.addColorStop(0.5, "#ffffff");
    waxGrad.addColorStop(1, "#cbd5e1");
    ctx.fillStyle = waxGrad;
    ctx.beginPath();
    ctx.roundRect(x - waxW / 2, isFlipped ? baseY : baseY - waxH, waxW, waxH, 3);
    ctx.fill();

    // Mum Fitili
    const wickStartY = isFlipped ? baseY + waxH : baseY - waxH;
    const wickEndY = wickStartY + dir * 6;
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, wickStartY);
    ctx.lineTo(x, wickEndY);
    ctx.stroke();

    // Alev (Flickering Flame)
    const flameH = height * 0.35;
    const flameW = waxW * 0.85;
    const flameTipY = wickEndY + dir * flameH;
    const flicker = Math.sin(animTime * 8 + x) * 1.5;

    // Alev Halesi
    ctx.fillStyle = "rgba(245, 158, 11, 0.35)";
    ctx.beginPath();
    ctx.arc(x + flicker * 0.5, wickEndY + dir * (flameH * 0.5), flameW * 1.1, 0, Math.PI * 2);
    ctx.fill();

    // Alev Damlası (Teardrop shape)
    const flameGrad = ctx.createRadialGradient(x, wickEndY + dir * 4, 1, x, wickEndY + dir * (flameH * 0.5), flameW);
    flameGrad.addColorStop(0, "#ffffff");
    flameGrad.addColorStop(0.3, "#fef08a");
    flameGrad.addColorStop(0.7, "#f59e0b");
    flameGrad.addColorStop(1, "rgba(239, 68, 68, 0.2)");

    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(x - flameW / 2, wickEndY);
    ctx.quadraticCurveTo(x - flameW * 0.6, wickEndY + dir * (flameH * 0.6), x + flicker, flameTipY);
    ctx.quadraticCurveTo(x + flameW * 0.6, wickEndY + dir * (flameH * 0.6), x + flameW / 2, wickEndY);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

// ============================================================================
// --- 6.5. DENEY 6.5: SIVILARIN YOĞUNLUĞU VE YOĞUNLUK KULESİ (FB.6.5.3 - FB.6.5.4) ---
// ============================================================================

const DENSITY_LIQUIDS_DEF = {
    honey: { id: "honey", name: "Bal", density: 1.40, color: "rgba(217, 119, 6, 0.90)", highlight: "#f59e0b", label: "Bal (1.40 g/cm³)" },
    glycerin: { id: "glycerin", name: "Gliserin", density: 1.26, color: "rgba(168, 85, 247, 0.85)", highlight: "#c084fc", label: "Gliserin (1.26 g/cm³)" },
    water: { id: "water", name: "Renkli Su", density: 1.00, color: "rgba(56, 189, 248, 0.75)", highlight: "#38bdf8", label: "Su (1.00 g/cm³)" },
    oil: { id: "oil", name: "Zeytinyağı", density: 0.90, color: "rgba(234, 179, 8, 0.80)", highlight: "#facc15", label: "Zeytinyağı (0.90 g/cm³)" }
};

const DENSITY_OBJECTS_DEF = {
    wood: { id: "wood", name: "Tahta Blok", density: 0.70, color: "#b45309", label: "Tahta (0.70 g/cm³ - Yüzer)" },
    plastic: { id: "plastic", name: "Plastik Kapak", density: 0.95, color: "#ef4444", label: "Plastik (0.95 g/cm³ - Askıda)" },
    iron: { id: "iron", name: "Demir Vida", density: 7.80, color: "#94a3b8", label: "Demir Vida (7.80 g/cm³ - Batar)" }
};

function initDensityTowerState() {
    const dt = labState.densityTower;
    dt.activeLiquids = [];
    dt.pouringLiquid = null;
    dt.pourProgress = 0;
    dt.objects = [];
    dt.cylinder = { x: 320, y: 55, w: 160, h: 360 };

    updateDensityTowerDOMControls();
    updateDensityMetricsDOM();
}

function resetDensityTowerExperiment() {
    const dt = labState.densityTower;
    dt.activeLiquids = [];
    dt.pouringLiquid = null;
    dt.pourProgress = 0;
    dt.objects = [];

    updateDensityTowerDOMControls();
    updateDensityMetricsDOM();
    showLabToast("Dereceli silindir tamamen boşaltıldı ve temizlendi!");
}

function updateDensityTowerDOMControls() {
    const dt = labState.densityTower;
    const addedIds = dt.activeLiquids.map(l => l.id);

    // Dökme butonları aktiflik durumu
    ['honey', 'glycerin', 'water', 'oil'].forEach(id => {
        const btn = document.getElementById(`btn-pour-${id}`);
        const pill = document.getElementById(`pill-add-${id}`);
        const isAdded = addedIds.includes(id);
        if (btn) btn.classList.toggle('active', isAdded);
        if (pill) pill.classList.toggle('active', isAdded);
    });

    // Cisim butonları durumu
    const droppedIds = dt.objects.map(o => o.id);
    ['wood', 'plastic', 'iron'].forEach(id => {
        const btn = document.getElementById(`btn-drop-${id}`);
        const pill = document.getElementById(`pill-drop-${id}`);
        const isDropped = droppedIds.includes(id);
        if (btn) btn.classList.toggle('active', isDropped);
        if (pill) pill.classList.toggle('active', isDropped);
    });
}

function setupDensityTowerControlsDOM() {
    // Sıvı Ekleme Butonları (Hem hızlı bar hem sağ panel)
    ['honey', 'glycerin', 'water', 'oil'].forEach(liquidKey => {
        const btn = document.getElementById(`btn-pour-${liquidKey}`);
        const pill = document.getElementById(`pill-add-${liquidKey}`);
        if (btn) btn.addEventListener('click', () => pourDensityLiquid(liquidKey));
        if (pill) pill.addEventListener('click', () => pourDensityLiquid(liquidKey));
    });

    // Cisim Bırakma Butonları
    ['wood', 'plastic', 'iron'].forEach(objectKey => {
        const btn = document.getElementById(`btn-drop-${objectKey}`);
        const pill = document.getElementById(`pill-drop-${objectKey}`);
        if (btn) btn.addEventListener('click', () => dropDensityObject(objectKey));
        if (pill) pill.addEventListener('click', () => dropDensityObject(objectKey));
    });

    // Silindiri Boşalt
    const btnEmpty1 = document.getElementById('btn-density-reset');
    const btnEmpty2 = document.getElementById('btn-density-empty-all');
    if (btnEmpty1) btnEmpty1.addEventListener('click', resetDensityTowerExperiment);
    if (btnEmpty2) btnEmpty2.addEventListener('click', resetDensityTowerExperiment);

    // Gözlem Kayıt Butonu
    const btnRecord = document.getElementById('btn-record-data-6-5');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function pourDensityLiquid(liquidKey) {
    const dt = labState.densityTower;
    if (dt.pouringLiquid) return; // Zaten dökülüyor

    const def = DENSITY_LIQUIDS_DEF[liquidKey];
    if (!def) return;

    if (dt.activeLiquids.some(l => l.id === liquidKey)) {
        showLabToast(`⚠️ ${def.name} zaten silindire eklendi!`);
        return;
    }

    dt.pouringLiquid = {
        id: liquidKey,
        name: def.name,
        density: def.density,
        color: def.color,
        highlight: def.highlight
    };
    dt.pourProgress = 0;
    showLabToast(`🧪 ${def.name} silindire dökülüyor...`);
}

function dropDensityObject(objectKey) {
    const dt = labState.densityTower;
    const def = DENSITY_OBJECTS_DEF[objectKey];
    if (!def) return;

    if (dt.objects.some(o => o.id === objectKey)) {
        showLabToast(`⚠️ ${def.name} zaten silindir içinde!`);
        return;
    }

    dt.objects.push({
        id: objectKey,
        name: def.name,
        density: def.density,
        color: def.color,
        x: dt.cylinder.x + dt.cylinder.w * 0.5 + (dt.objects.length * 28 - 28),
        y: dt.cylinder.y - 30, // Silindirin üstünden düşmeye başlar
        targetY: 0,
        vy: 0,
        settled: false
    });

    updateDensityTowerDOMControls();
    updateDensityMetricsDOM();
    showLabToast(`📦 ${def.name} silindire bırakıldı!`);
}

function updateDensityTowerPhysics() {
    const dt = labState.densityTower;

    // 1. Sıvı Dökülme Animasyonu
    if (dt.pouringLiquid) {
        dt.pourProgress += 0.035;
        if (dt.pourProgress >= 1.0) {
            // Sıvıyı listeye ekle
            dt.activeLiquids.push(dt.pouringLiquid);
            // Yoğunluğa göre büyükten küçüğe sırala (Ağır olan dibe çöker)
            dt.activeLiquids.sort((a, b) => b.density - a.density);
            dt.pouringLiquid = null;
            dt.pourProgress = 0;
            updateDensityTowerDOMControls();
            showLabToast("💧 Sıvı yoğunluk farkı nedeniyle kendi katmanına yerleşti!");
        }
    }

    // 2. Katı Cisimlerin Yüzme/Batma Denge Konumu Fiziği
    const cyl = dt.cylinder;
    const baseBottomY = cyl.y + cyl.h;
    const totalLiquids = dt.activeLiquids.length;

    dt.objects.forEach(obj => {
        let equilibriumY = baseBottomY - 14; // Sıvı yoksa silindirin dibinde durur

        if (totalLiquids > 0) {
            const layerH = cyl.h / Math.max(4, totalLiquids);
            const surfaceTopY = baseBottomY - totalLiquids * layerH;

            if (obj.density < dt.activeLiquids[dt.activeLiquids.length - 1].density) {
                // En hafif sıvıdan da hafif (Örn: Tahta < Zeytinyağı): Yüzeyde yüzer
                equilibriumY = surfaceTopY - 6;
            } else if (obj.density > dt.activeLiquids[0].density) {
                // En ağır sıvıdan da ağır (Örn: Demir vida): Dibe batar
                equilibriumY = baseBottomY - 14;
            } else {
                // Katmanlar arasında askıda kalır: Yoğunluğunun sıvılar arasındaki ara yüzeyini bul
                for (let i = 0; i < dt.activeLiquids.length - 1; i++) {
                    const lowerLiquid = dt.activeLiquids[i];     // Daha yoğun (altta)
                    const upperLiquid = dt.activeLiquids[i + 1]; // Daha az yoğun (üstte)
                    if (obj.density >= upperLiquid.density && obj.density <= lowerLiquid.density) {
                        const interfaceY = baseBottomY - (i + 1) * layerH;
                        equilibriumY = interfaceY - 7;
                        break;
                    }
                }
            }
        }

        obj.targetY = equilibriumY;

        // Sönümlü harmonik yay hareketi ile denge konumuna inme
        if (!obj.settled) {
            obj.vy += (obj.targetY - obj.y) * 0.12;
            obj.vy *= 0.82; // Sıvı vizkozitesi sürtünmesi
            obj.y += obj.vy;
            if (Math.abs(obj.targetY - obj.y) < 0.5 && Math.abs(obj.vy) < 0.2) {
                obj.y = obj.targetY;
                obj.settled = true;
            }
        } else {
            // Yüzen cisimlere hafif mikroskobik su salınımı
            obj.y = obj.targetY + Math.sin(animTime * 3 + obj.x) * 1.2;
        }
    });

    updateDensityMetricsDOM();
}

function updateDensityMetricsDOM() {
    const dt = labState.densityTower;
    const count = dt.activeLiquids.length;

    // Canvas Altı Responsive Metrik Şeridi (#metrics-bar-6-5)
    const mbCount = document.getElementById('mbar-65-liquid-count');
    const mbBottom = document.getElementById('mbar-65-bottom-layer');
    const mbTop = document.getElementById('mbar-65-top-layer');
    const mbStatus = document.getElementById('mbar-65-status');

    if (mbCount) mbCount.textContent = `${count} / 4`;
    if (mbBottom) {
        mbBottom.textContent = count > 0 ? `${dt.activeLiquids[0].name} (1.40)` : "—";
    }
    if (mbTop) {
        mbTop.textContent = count > 0 ? `${dt.activeLiquids[count - 1].name} (${dt.activeLiquids[count - 1].density})` : "—";
    }
    if (mbStatus) {
        if (count === 4) {
            mbStatus.textContent = "🏆 Kule Tamamlandı (4 Katman)";
            mbStatus.style.borderLeftColor = "#10b981";
        } else if (count > 0) {
            mbStatus.textContent = `🧪 ${count} Katmanlı Sıvı Kulesi`;
            mbStatus.style.borderLeftColor = "#38bdf8";
        } else {
            mbStatus.textContent = "Silindir Boş (Sıvı Ekleyin)";
            mbStatus.style.borderLeftColor = "#f59e0b";
        }
    }

    // Sağ Panel Metrikleri
    const pCount = document.getElementById('metric-65-count');
    const pBottom = document.getElementById('metric-65-bottom');
    const pTop = document.getElementById('metric-65-top');
    const pObj = document.getElementById('metric-65-object');
    if (pCount) pCount.textContent = `${count} / 4`;
    if (pBottom) pBottom.textContent = count > 0 ? dt.activeLiquids[0].name : "—";
    if (pTop) pTop.textContent = count > 0 ? dt.activeLiquids[count - 1].name : "—";
    if (pObj) {
        pObj.textContent = dt.objects.length > 0 ? dt.objects.map(o => o.name).join(', ') : "Yok";
    }
}

function drawDensityTowerSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // 1. Laboratuvar Zemin ve Duvar Arka Planı
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "#090d16");
    bgGrad.addColorStop(0.65, "#0f172a");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Laboratuvar Tezgah Masası (Y: 420 -> 500)
    const benchGrad = ctx.createLinearGradient(0, 420, 0, 500);
    benchGrad.addColorStop(0, "#334155");
    benchGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = benchGrad;
    ctx.fillRect(0, 420, 800, 80);

    ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
    ctx.fillRect(0, 418, 800, 2); // Tezgah LED aydınlatması

    // 2. Silindir İçindeki Sıvı Katmanları
    drawDensityLayers(ctx);

    // 3. Büyük Şeffaf Dereceli Silindir Gövdesi
    drawGraduatedCylinder(ctx);

    // 4. Bırakılan Katı Cisimler
    drawDensityObjects(ctx);

    // 5. Sıvı Dökme Animasyonu (Beher ve Akış Huzmesi)
    drawPouringStream(ctx);

    ctx.restore();
}

function drawDensityLayers(ctx) {
    const dt = labState.densityTower;
    const cyl = dt.cylinder;
    const count = dt.activeLiquids.length;
    if (count === 0) return;

    const baseBottomY = cyl.y + cyl.h;
    const layerH = cyl.h / Math.max(4, count);

    ctx.save();

    // Silindir içi dairesel kırpma (Sıvıların cam sınırları dışına taşmaması için)
    ctx.beginPath();
    ctx.roundRect(cyl.x + 2, cyl.y + 4, cyl.w - 4, cyl.h - 4, [0, 0, 14, 14]);
    ctx.clip();

    // Katmanlar: dt.activeLiquids[0] en yoğun (altta), sonuncu en hafif (üstte)
    for (let i = 0; i < count; i++) {
        const liquid = dt.activeLiquids[i];
        const layerBottomY = baseBottomY - i * layerH;
        const layerTopY = layerBottomY - layerH;

        // Katman Dolgusu
        const liqGrad = ctx.createLinearGradient(cyl.x, layerTopY, cyl.x + cyl.w, layerBottomY);
        liqGrad.addColorStop(0, liquid.color);
        liqGrad.addColorStop(1, liquid.highlight);
        ctx.fillStyle = liqGrad;
        ctx.fillRect(cyl.x, layerTopY, cyl.w, layerH);

        // İç bükey menisküs kavisli yüzey çizgisi
        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.ellipse(cyl.x + cyl.w * 0.5, layerTopY, cyl.w * 0.48, 5, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Sıvı içi mikro baloncuklar
        for (let b = 0; b < 4; b++) {
            const bx = cyl.x + 20 + ((b * 37 + (i * 23)) % (cyl.w - 40));
            const by = layerTopY + 8 + ((b * 19 + animTime * 15) % (layerH - 16));
            ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
            ctx.beginPath();
            ctx.arc(bx, by, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}

function drawGraduatedCylinder(ctx) {
    const dt = labState.densityTower;
    const cyl = dt.cylinder;

    ctx.save();

    // Cam Silindir Tabanı (Geniş Ayak)
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cyl.x + cyl.w * 0.5, cyl.y + cyl.h + 6, cyl.w * 0.65, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Cam Duvarlar
    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(cyl.x, cyl.y, cyl.w, cyl.h, [4, 4, 16, 16]);
    ctx.stroke();

    // Sol Cam Yansıması (Specular Highlight)
    const glassRef = ctx.createLinearGradient(cyl.x, 0, cyl.x + 30, 0);
    glassRef.addColorStop(0, "rgba(255, 255, 255, 0.45)");
    glassRef.addColorStop(1, "rgba(255, 255, 255, 0.0)");
    ctx.fillStyle = glassRef;
    ctx.fillRect(cyl.x + 3, cyl.y + 4, 24, cyl.h - 8);

    // Sağ Cam Yansıması
    const rightRef = ctx.createLinearGradient(cyl.x + cyl.w - 20, 0, cyl.x + cyl.w, 0);
    rightRef.addColorStop(0, "rgba(255, 255, 255, 0.0)");
    rightRef.addColorStop(1, "rgba(255, 255, 255, 0.35)");
    ctx.fillStyle = rightRef;
    ctx.fillRect(cyl.x + cyl.w - 20, cyl.y + 4, 18, cyl.h - 8);

    // Cam Üst Ağız Halkası
    ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(cyl.x + cyl.w * 0.5, cyl.y, cyl.w * 0.5, 7, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Dereceli Ölçek Çizgileri (0 - 500 mL)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    for (let m = 0; m <= 10; m++) {
        const my = cyl.y + cyl.h - (m / 10) * (cyl.h - 20) - 10;
        const tickLen = (m % 2 === 0) ? 14 : 7;
        ctx.lineWidth = (m % 2 === 0) ? 1.8 : 1.0;
        ctx.beginPath();
        ctx.moveTo(cyl.x + 6, my);
        ctx.lineTo(cyl.x + 6 + tickLen, my);
        ctx.stroke();
    }

    ctx.restore();
}

function drawDensityObjects(ctx) {
    const dt = labState.densityTower;
    dt.objects.forEach(obj => {
        ctx.save();
        ctx.translate(obj.x, obj.y);

        if (obj.id === "wood") {
            // Tahta Blok
            ctx.fillStyle = "#b45309";
            ctx.strokeStyle = "#78350f";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.roundRect(-14, -14, 28, 28, 4);
            ctx.fill();
            ctx.stroke();

            // Ahşap Damar Çizgileri
            ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-10, -6); ctx.lineTo(10, -6);
            ctx.moveTo(-8, 4); ctx.lineTo(8, 4);
            ctx.stroke();
        } else if (obj.id === "plastic") {
            // Plastik Şişe Kapağı (Kırmızı Tırtıklı)
            ctx.fillStyle = "#ef4444";
            ctx.strokeStyle = "#991b1b";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(0, 0, 15, 9, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(0, 0, 4, 0, Math.PI * 2);
            ctx.fill();
        } else if (obj.id === "iron") {
            // Demir Vida
            ctx.fillStyle = "#94a3b8";
            ctx.strokeStyle = "#475569";
            ctx.lineWidth = 1.5;

            // Vida Başı
            ctx.beginPath();
            ctx.roundRect(-8, -12, 16, 5, 2);
            ctx.fill();
            ctx.stroke();

            // Vida Gövdesi ve Dişler
            ctx.beginPath();
            ctx.moveTo(-4, -7);
            ctx.lineTo(-4, 10);
            ctx.lineTo(0, 14);
            ctx.lineTo(4, 10);
            ctx.lineTo(4, -7);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Vida Diş Çizgileri
            ctx.strokeStyle = "#334155";
            ctx.lineWidth = 1.2;
            for (let t = -4; t <= 8; t += 3) {
                ctx.beginPath();
                ctx.moveTo(-4, t);
                ctx.lineTo(4, t + 1.5);
                ctx.stroke();
            }
        }

        ctx.restore();
    });
}

function drawPouringStream(ctx) {
    const dt = labState.densityTower;
    if (!dt.pouringLiquid) return;

    const cyl = dt.cylinder;
    const progress = dt.pourProgress;

    ctx.save();

    // Dökülen Beher Pozisyonu (Sağ üstte)
    const beakerX = cyl.x + cyl.w + 40;
    const beakerY = cyl.y - 35;

    // Beher Gövdesi (Eğilmiş)
    ctx.save();
    ctx.translate(beakerX, beakerY);
    ctx.rotate(-0.55); // 30 derece dökme açısı

    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-25, -35, 50, 70, [2, 2, 8, 8]);
    ctx.fill();
    ctx.stroke();

    // Beher İçi Kalan Sıvı
    ctx.fillStyle = dt.pouringLiquid.color;
    ctx.beginPath();
    ctx.moveTo(-23, 10);
    ctx.lineTo(23, -15);
    ctx.lineTo(23, 30);
    ctx.lineTo(-23, 30);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // Kavisli Sıvı Akış Huzmesi (Stream)
    const streamStartX = beakerX - 25;
    const streamStartY = beakerY + 15;
    const targetBottomY = cyl.y + cyl.h - (dt.activeLiquids.length * (cyl.h / 4));

    const currentEndY = streamStartY + progress * (targetBottomY - streamStartY);

    ctx.strokeStyle = dt.pouringLiquid.highlight;
    ctx.lineWidth = 5;
    ctx.shadowColor = dt.pouringLiquid.highlight;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(streamStartX, streamStartY);
    ctx.quadraticCurveTo(cyl.x + cyl.w * 0.5 + 20, cyl.y - 10, cyl.x + cyl.w * 0.5, currentEndY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Sıçrayan damlacıklar
    for (let d = 0; d < 3; d++) {
        const dx = cyl.x + cyl.w * 0.5 + (Math.random() - 0.5) * 16;
        const dy = currentEndY - Math.random() * 8;
        ctx.fillStyle = dt.pouringLiquid.highlight;
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

// ============================================================================
// --- 6.4. DENEY 6.4: ISI İLETKENLİĞİ VE YALITIM SİMÜLATÖRÜ (FB.6.4.1) ---
// ============================================================================

function initHeatTransferState() {
    const ht = labState.heatTransfer;
    if (!ht.mode) ht.mode = "metals"; // Seçili mod korunur
    ht.isHeating = false;
    ht.burnerIntensity = 1.0;
    ht.flameParticles = [];
    ht.elapsedHeatingTime = 0.0;

    ht.rods = [
        { id: "copper", name: "Bakır", k: 385, color: "#f97316", temp: 20, waxMelted: false, ballDropped: false, ballY: 0, ballVy: 0, dropTime: null },
        { id: "aluminum", name: "Alüminyum", k: 205, color: "#cbd5e1", temp: 20, waxMelted: false, ballDropped: false, ballY: 0, ballVy: 0, dropTime: null },
        { id: "iron", name: "Demir", k: 80, color: "#94a3b8", temp: 20, waxMelted: false, ballDropped: false, ballY: 0, ballVy: 0, dropTime: null }
    ];

    ht.insulation = {
        materials: [
            { id: "bare", name: "Sac / Yalıtımsız", rVal: 0.1, tempInside: 20, heatLossRate: 0.45 },
            { id: "wood", name: "Ahşap Kaplama", rVal: 0.5, tempInside: 20, heatLossRate: 0.22 },
            { id: "foam", name: "Taş Yünü / Strafor", rVal: 1.0, tempInside: 20, heatLossRate: 0.07 }
        ]
    };

    updateHeatTransferDOMControls();
    updateHeatMetricsDOM();
}

function resetHeatTransferExperiment() {
    initHeatTransferState();
    showLabToast("Isı düzeneği soğutuldu ve balmumuna bağlı bilyeler yenilendi!");
}

function updateHeatTransferDOMControls() {
    const ht = labState.heatTransfer;
    const isMetals = (ht.mode === "metals");

    // Mod Butonları
    const btnMetals = document.getElementById('btn-heat-mode-metals');
    const btnInsul = document.getElementById('btn-heat-mode-insulation');
    const pillMetals = document.getElementById('pill-heat-mode-metals');
    const pillInsul = document.getElementById('pill-heat-mode-insulation');

    if (btnMetals) btnMetals.classList.toggle('active', isMetals);
    if (btnInsul) btnInsul.classList.toggle('active', !isMetals);
    if (pillMetals) pillMetals.classList.toggle('active', isMetals);
    if (pillInsul) pillInsul.classList.toggle('active', !isMetals);

    // Ocak Butonları
    const btnBurner = document.getElementById('btn-heat-toggle-burner');
    const labelBurner = document.getElementById('label-heat-burner');
    const pillOn = document.getElementById('pill-heat-burner-on');
    const pillOff = document.getElementById('pill-heat-burner-off');

    if (btnBurner) btnBurner.classList.toggle('active', ht.isHeating);
    if (labelBurner) labelBurner.textContent = ht.isHeating ? "Ocağı Söndür" : "Ocağı Yak";
    if (pillOn) pillOn.classList.toggle('active', ht.isHeating);
    if (pillOff) pillOff.classList.toggle('active', !ht.isHeating);
}

function setupHeatTransferControlsDOM() {
    // 1. Mod Değiştirici (Metaller vs Binalarda Yalıtım)
    const setMode = (mode) => {
        labState.heatTransfer.mode = mode;
        initHeatTransferState();
        updateHeatTransferDOMControls();
        showLabToast(mode === "metals" ? "1. Mod: Metallerde Isı İletimi Simülasyonu" : "2. Mod: Binalarda Isı Yalıtımı Testi");
    };

    ['btn-heat-mode-metals', 'pill-heat-mode-metals'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setMode("metals"));
    });

    ['btn-heat-mode-insulation', 'pill-heat-mode-insulation'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setMode("insulation"));
    });

    // 2. Ocak Aç / Kapat
    const toggleBurner = (state) => {
        const ht = labState.heatTransfer;
        ht.isHeating = (state !== undefined) ? state : !ht.isHeating;
        updateHeatTransferDOMControls();
        updateHeatMetricsDOM();
        showLabToast(ht.isHeating ? "🔥 İspirto ocağı yakıldı!" : "Ocak söndürüldü.");
    };

    const btnBurner = document.getElementById('btn-heat-toggle-burner');
    if (btnBurner) btnBurner.addEventListener('click', () => toggleBurner());

    const pillOn = document.getElementById('pill-heat-burner-on');
    const pillOff = document.getElementById('pill-heat-burner-off');
    if (pillOn) pillOn.addEventListener('click', () => toggleBurner(true));
    if (pillOff) pillOff.addEventListener('click', () => toggleBurner(false));

    // 3. Sıfırla
    const btnReset = document.getElementById('btn-heat-reset');
    if (btnReset) btnReset.addEventListener('click', resetHeatTransferExperiment);

    // 4. Gözlem Kayıt Butonu
    const btnRecord = document.getElementById('btn-record-data-5-9');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateHeatTransferPhysics() {
    const ht = labState.heatTransfer;

    if (ht.isHeating) {
        ht.elapsedHeatingTime += 0.05;

        // Alev parçacıkları üret
        for (let i = 0; i < 3; i++) {
            ht.flameParticles.push({
                x: 180 + (Math.random() - 0.5) * 20,
                y: (ht.mode === "metals") ? 320 : 340,
                vx: (Math.random() - 0.5) * 1.5,
                vy: -3 - Math.random() * 3,
                life: 1.0,
                size: 4 + Math.random() * 5
            });
        }

        if (ht.mode === "metals") {
            // Metallerde Isı İletim Fiziği
            // Isı iletim hızları: Bakır (k=385) > Alüminyum (k=205) > Demir (k=80)
            const heatRates = [0.18, 0.095, 0.045]; // Bakır, Alüminyum, Demir ısınma katsayıları

            ht.rods.forEach((rod, idx) => {
                const rate = heatRates[idx];
                rod.temp = Math.min(100, rod.temp + rate);

                // Balmumu erime sıcaklığı = 60°C
                if (rod.temp >= 60 && !rod.waxMelted) {
                    rod.waxMelted = true;
                    rod.ballDropped = true;
                    rod.dropTime = ht.elapsedHeatingTime;
                    rod.ballVy = 0;
                    showLabToast(`🥇 ${rod.name} çubuktaki balmumu eridi ve bilye düştü! (${rod.dropTime.toFixed(1)} sn)`);
                }
            });
        } else {
            // Yalıtım Modu Fiziği: Binalar/Odalar ısınıyor
            ht.insulation.materials.forEach(mat => {
                mat.tempInside = Math.min(80, mat.tempInside + (0.5 * mat.rVal));
            });
        }
    } else {
        // Isıtıcı kapalıysa soğuma
        if (ht.mode === "metals") {
            ht.rods.forEach(rod => {
                rod.temp = Math.max(20, rod.temp - 0.1);
            });
        } else {
            // Yalıtım malzemeleri ısı koruma testi (Soğuma hızları)
            ht.insulation.materials.forEach(mat => {
                mat.tempInside = Math.max(20, mat.tempInside - mat.heatLossRate);
            });
        }
    }

    // Düşen Bilyeler için Yer Çekimi Fiziği
    ht.rods.forEach(rod => {
        if (rod.ballDropped && rod.ballY < 90) {
            rod.ballVy += 0.55; // yer çekimi ivmesi
            rod.ballY += rod.ballVy;
            if (rod.ballY >= 90) {
                rod.ballY = 90;
                rod.ballVy = -rod.ballVy * 0.35; // hafif tepsi sekmesi
            }
        }
    });

    // Alev parçacıkları güncelle
    for (let i = ht.flameParticles.length - 1; i >= 0; i--) {
        const p = ht.flameParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.06;
        if (p.life <= 0) ht.flameParticles.splice(i, 1);
    }

    updateHeatMetricsDOM();
}

function updateHeatMetricsDOM() {
    const ht = labState.heatTransfer;
    const fmt = (n, d = 1) => Number(n).toFixed(d);

    // Canvas Altı Responsive Metrik Şeridi (#metrics-bar-5-9)
    const mbBurner = document.getElementById('mbar-59-burner');
    const mbCopper = document.getElementById('mbar-59-copper');
    const mbAl = document.getElementById('mbar-59-aluminum');
    const mbIron = document.getElementById('mbar-59-iron');
    const mbStatus = document.getElementById('mbar-59-status');

    // Sağ Panel Metrikleri
    const pCop = document.getElementById('metric-59-copper');
    const pAl = document.getElementById('metric-59-aluminum');
    const pFe = document.getElementById('metric-59-iron');
    const pFlame = document.getElementById('metric-59-flame');

    // Dinamik Pedagojik Kart
    const pTitle = document.getElementById('heat-pedagogical-title');
    const pText = document.getElementById('heat-pedagogical-text');
    const pIcon = document.getElementById('heat-pedagogical-icon');

    if (ht.mode === "insulation") {
        const mat0 = ht.insulation.materials[0]; // Sac
        const mat1 = ht.insulation.materials[1]; // Ahşap
        const mat2 = ht.insulation.materials[2]; // Taş yünü / Strafor

        if (mbBurner) {
            mbBurner.textContent = ht.isHeating ? "Isıtıcı: Aktif" : "Isıtıcı: Kapalı";
            mbBurner.style.color = ht.isHeating ? "#ef4444" : "#94a3b8";
        }
        if (mbCopper) mbCopper.textContent = `Sac Ev: ${fmt(mat0.tempInside, 0)}°C`;
        if (mbAl) mbAl.textContent = `Ahşap Ev: ${fmt(mat1.tempInside, 0)}°C`;
        if (mbIron) mbIron.textContent = `Strafor Ev: ${fmt(mat2.tempInside, 0)}°C`;
        if (mbStatus) {
            mbStatus.textContent = "🏠 Yalıtımlı binalar (Taş yünü / Strafor) ısı kaybını önleyerek enerji tasarrufu sağlar";
            mbStatus.style.color = "#34d399";
        }

        if (pCop) {
            pCop.textContent = `${fmt(mat0.tempInside, 0)}°C`;
            const lbl = pCop.previousElementSibling;
            if (lbl) lbl.textContent = "Sac (Yalıtımsız)";
        }
        if (pAl) {
            pAl.textContent = `${fmt(mat1.tempInside, 0)}°C`;
            const lbl = pAl.previousElementSibling;
            if (lbl) lbl.textContent = "Ahşap Kaplama";
        }
        if (pFe) {
            pFe.textContent = `${fmt(mat2.tempInside, 0)}°C`;
            const lbl = pFe.previousElementSibling;
            if (lbl) lbl.textContent = "Taş Yünü / Strafor";
        }
        if (pFlame) {
            pFlame.textContent = ht.isHeating ? "Aktif" : "Kapalı";
            const lbl = pFlame.previousElementSibling;
            if (lbl) lbl.textContent = "İç Isıtıcı";
        }

        if (pTitle && pText && pIcon) {
            pIcon.innerHTML = '<i class="fas fa-home" style="color: #38bdf8;"></i>';
            pTitle.textContent = "🏠 Binalarda Isı Yalıtımı ve Enerji Verimliliği";
            pText.textContent = "Strafor ve taş yünü gibi yalıtım malzemeleri tanecik boşlukları sayesinde ısının binadan kaçmasını engeller. Yalıtımsız sac ev hızla soğurken, yalıtımlı ev iç sıcaklığını uzun süre korur.";
        }
    } else {
        const c = ht.rods[0];
        const al = ht.rods[1];
        const fe = ht.rods[2];

        if (mbBurner) {
            mbBurner.textContent = ht.isHeating ? "🔥 Yanıyor" : "Sönük";
            mbBurner.style.color = ht.isHeating ? "#ef4444" : "#94a3b8";
        }
        if (mbCopper) {
            mbCopper.textContent = c.ballDropped ? `🥇 Düştü (${fmt(c.dropTime, 1)} s)` : `${fmt(c.temp, 0)}°C`;
        }
        if (mbAl) {
            mbAl.textContent = al.ballDropped ? `🥈 Düştü (${fmt(al.dropTime, 1)} s)` : `${fmt(al.temp, 0)}°C`;
        }
        if (mbIron) {
            mbIron.textContent = fe.ballDropped ? `🥉 Düştü (${fmt(fe.dropTime, 1)} s)` : `${fmt(fe.temp, 0)}°C`;
        }
        if (mbStatus) {
            mbStatus.textContent = "🔥 Isı metallerde iletim yoluyla yayılır; iletkenlik sıralaması: Bakır > Alüminyum > Demir";
            mbStatus.style.color = "#facc15";
        }

        if (pCop) {
            pCop.textContent = c.ballDropped ? `Düştü (${fmt(c.dropTime, 1)} s)` : `${fmt(c.temp, 0)}°C`;
            const lbl = pCop.previousElementSibling;
            if (lbl) lbl.textContent = "Bakır Çubuk";
        }
        if (pAl) {
            pAl.textContent = al.ballDropped ? `Düştü (${fmt(al.dropTime, 1)} s)` : `${fmt(al.temp, 0)}°C`;
            const lbl = pAl.previousElementSibling;
            if (lbl) lbl.textContent = "Alüminyum Çubuk";
        }
        if (pFe) {
            pFe.textContent = fe.ballDropped ? `Düştü (${fmt(fe.dropTime, 1)} s)` : `${fmt(fe.temp, 0)}°C`;
            const lbl = pFe.previousElementSibling;
            if (lbl) lbl.textContent = "Demir Çubuk";
        }
        if (pFlame) {
            pFlame.textContent = ht.isHeating ? "Yanıyor" : "Sönük";
            const lbl = pFlame.previousElementSibling;
            if (lbl) lbl.textContent = "İspirto Ocağı";
        }

        if (pTitle && pText && pIcon) {
            pIcon.innerHTML = '<i class="fas fa-fire" style="color: #f97316;"></i>';
            pTitle.textContent = "🔥 Metallerde Isı İletim Hızı";
            pText.textContent = "Tüm metaller ısıyı iletir fakat iletkenlik hızları farklıdır. Bakır en hızlı, demir ise aralarında en yavaş iletendir. Balmumları bu iletkenlik sırasına göre erir.";
        }
    }
}

function drawHeatTransferSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // 1. Zemin Arka Planı
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "#090d16");
    bgGrad.addColorStop(1, "#111827");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Isıya Dayanıklı Seramik Masa Tablası (Y: 380 -> 500)
    const tableGrad = ctx.createLinearGradient(0, 380, 0, 500);
    tableGrad.addColorStop(0, "#1e293b");
    tableGrad.addColorStop(1, "#0f172a");
    ctx.fillStyle = tableGrad;
    ctx.fillRect(0, 380, 800, 120);

    ctx.fillStyle = "#334155";
    ctx.fillRect(0, 378, 800, 2);

    const ht = labState.heatTransfer;

    if (ht.mode === "metals") {
        // Mod 1: 3 Metal Çubuk (Bakır, Alüminyum, Demir)
        drawMetalRodsAndWaxBalls(ctx);
        drawBunsenBurner(ctx, 180, 380, ht.isHeating);
    } else {
        // Mod 2: Binalarda Isı Yalıtımı Testi
        drawBuildingInsulationTest(ctx);
    }

    ctx.restore();
}

function drawMetalRodsAndWaxBalls(ctx) {
    const ht = labState.heatTransfer;
    const rodStartX = 180;
    const rodLen = 420;
    const rodH = 16;
    const startY = 160;
    const gapY = 65;

    ctx.save();

    // Çubukları Tutan Sol ve Sağ Laboratuvar Destek Ayakları (Statif Ayak)
    ctx.fillStyle = "#475569";
    ctx.fillRect(rodStartX - 15, 140, 12, 240);
    ctx.fillRect(rodStartX + rodLen + 10, 140, 12, 240);

    // Bilye Toplama Tepsisi (Y: 360)
    ctx.fillStyle = "#334155";
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(rodStartX + rodLen - 50, 360, 90, 18, 4);
    ctx.fill();
    ctx.stroke();

    ht.rods.forEach((rod, idx) => {
        const ry = startY + idx * gapY;

        // Çubuk Gövdesi ve Isı Yayılım Gradyanı
        // Sıcak uca (sol) doğru alev parlaması, soğuk uca (sağ) doğru metalik renk
        const heatRatio = (rod.temp - 20) / 80; // 0.0 -> 1.0
        const rodGrad = ctx.createLinearGradient(rodStartX, ry, rodStartX + rodLen, ry);

        if (ht.isHeating) {
            rodGrad.addColorStop(0, "#ffffff"); // Akkor beyaz alev ucu
            rodGrad.addColorStop(Math.min(0.8, heatRatio * 0.9), "#ef4444"); // Sıcak kırmızı dalga
            rodGrad.addColorStop(Math.min(1.0, heatRatio * 1.2), rod.color); // Kendi metal rengi
        } else {
            rodGrad.addColorStop(0, rod.color);
            rodGrad.addColorStop(1, rod.color);
        }

        ctx.fillStyle = rodGrad;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(rodStartX, ry, rodLen, rodH, 4);
        ctx.fill();
        ctx.stroke();

        // Üst Işık Yansıması (Metalik Derinlik)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(rodStartX + 4, ry + 3);
        ctx.lineTo(rodStartX + rodLen - 4, ry + 3);
        ctx.stroke();

        // Sağ Uçtaki Balmumu Damlası ve Çelik Bilye
        const ballBaseX = rodStartX + rodLen - 12;
        const ballBaseY = ry + rodH + 4;

        if (!rod.waxMelted) {
            // Erimemiş Balmumu Tutucu (Sarımsı Krem)
            ctx.fillStyle = "#fef08a";
            ctx.beginPath();
            ctx.ellipse(ballBaseX, ry + rodH, 7, 4, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Çelik Bilye (Krom Küre)
        const currentBallY = ballBaseY + rod.ballY;
        drawChromeBall(ctx, ballBaseX, currentBallY, 8);
    });

    ctx.restore();
}

function drawChromeBall(ctx, cx, cy, r) {
    ctx.save();

    // Küre Radyal Metalik Gradyan
    const ballGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
    ballGrad.addColorStop(0, "#ffffff");
    ballGrad.addColorStop(0.4, "#cbd5e1");
    ballGrad.addColorStop(1, "#334155");

    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
}

function drawBunsenBurner(ctx, x, y, isLit) {
    ctx.save();
    ctx.translate(x, y);

    // 1. Ağır Döküm Pirinç Ayak
    ctx.fillStyle = "#78350f";
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-24, -12, 48, 12, [2, 2, 0, 0]);
    ctx.fill();
    ctx.stroke();

    // 2. Dikey Pirinç Ocak Borusu
    ctx.fillStyle = "#b45309";
    ctx.fillRect(-6, -75, 12, 63);

    // Hava Ayar Bileziği
    ctx.fillStyle = "#d97706";
    ctx.fillRect(-8, -35, 16, 10);

    // 3. Alev (Eğer Yanıyorsa)
    if (isLit) {
        // Dış Turuncu Alev
        const flameGrad = ctx.createLinearGradient(0, -75, 0, -145);
        flameGrad.addColorStop(0, "rgba(56, 189, 248, 0.95)"); // Mavi dip
        flameGrad.addColorStop(0.3, "#f97316");                 // Turuncu orta
        flameGrad.addColorStop(1, "rgba(239, 68, 68, 0)");     // Kırmızı sivri uç

        ctx.fillStyle = flameGrad;
        ctx.shadowColor = "#f97316";
        ctx.shadowBlur = 18;

        const flicker = Math.sin(animTime * 14) * 4;
        ctx.beginPath();
        ctx.moveTo(-9, -75);
        ctx.quadraticCurveTo(-14 + flicker, -110, 0, -145 + flicker);
        ctx.quadraticCurveTo(14 - flicker, -110, 9, -75);
        ctx.closePath();
        ctx.fill();

        // İç Yoğun Mavi Alev Konisi
        ctx.fillStyle = "#38bdf8";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(-5, -75);
        ctx.quadraticCurveTo(-7, -95, 0, -110);
        ctx.quadraticCurveTo(7, -95, 5, -75);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    ctx.restore();
}

function drawBuildingInsulationTest(ctx) {
    const ht = labState.heatTransfer;
    const mats = ht.insulation.materials;
    const startX = 140;
    const gapX = 200;
    const baseY = 360;

    ctx.save();

    mats.forEach((mat, idx) => {
        const bx = startX + idx * gapX;

        // Model Ev Gövdesi (Yalıtım Duvarları)
        const houseW = 120;
        const houseH = 110;

        // Duvar Rengi / Malzeme Dokusu
        let wallColor = "#94a3b8"; // Sac
        if (mat.id === "wood") wallColor = "#b45309"; // Ahşap
        if (mat.id === "foam") wallColor = "#10b981"; // Taş Yünü / Strafor

        // Dış Duvar
        ctx.fillStyle = wallColor;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(bx - houseW * 0.5, baseY - houseH, houseW, houseH, 6);
        ctx.fill();
        ctx.stroke();

        // İç Oda Boşluğu (Sıcaklık Gradiyenti: mat.tempInside)
        const innerRatio = (mat.tempInside - 20) / 60;
        const innerGrad = ctx.createRadialGradient(bx, baseY - houseH * 0.5, 5, bx, baseY - houseH * 0.5, 45);
        innerGrad.addColorStop(0, `rgba(239, 68, 68, ${Math.min(0.9, 0.15 + innerRatio * 0.75)})`);
        innerGrad.addColorStop(1, "rgba(15, 23, 42, 0.85)");

        ctx.fillStyle = innerGrad;
        ctx.beginPath();
        ctx.roundRect(bx - houseW * 0.5 + 14, baseY - houseH + 14, houseW - 28, houseH - 28, 4);
        ctx.fill();

        // İç Termometre (Cıvalı Sütun)
        const tHeight = (mat.tempInside / 100) * 45;
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(bx - 3, baseY - 25 - tHeight, 6, tHeight);
        ctx.beginPath();
        ctx.arc(bx, baseY - 22, 6, 0, Math.PI * 2);
        ctx.fill();

        // Isı Kaybı Kaçak Okları (Duvardan çıkan ısı sızıntısı)
        if (mat.tempInside > 25) {
            const arrowColor = mat.id === "bare" ? "#ef4444" : mat.id === "wood" ? "#f59e0b" : "#10b981";
            const arrowLen = mat.id === "bare" ? 22 : mat.id === "wood" ? 14 : 7;
            drawNeonArrow(ctx, bx + houseW * 0.5, baseY - houseH * 0.5, bx + houseW * 0.5 + arrowLen, baseY - houseH * 0.5, arrowColor, 2);
        }
    });

    ctx.restore();
}


// ============================================================================
// --- 6.6. DENEY 6.6: TOHUMUN ÇİMLENMESİNE ETKİ EDEN FAKTÖRLER (FB.6.3.3) ---
// ============================================================================

function initGerminationState() {
    const g = labState.germination;
    g.currentDay = 1;
    g.isPlaying = false;
    g.animProgress = 0.0;
    g.selectedDish = 1;
    g.dishes = [
        { id: 1, name: "1. Kap (İdeal)", water: true, temp: 25, light: false, oxygen: true, sproutProgress: 0.0 },
        { id: 2, name: "2. Kap (Susuz)", water: false, temp: 25, light: false, oxygen: true, sproutProgress: 0.0 },
        { id: 3, name: "3. Kap (0°C Soğuk)", water: true, temp: 0, light: false, oxygen: true, sproutProgress: 0.0 },
        { id: 4, name: "4. Kap (Işıklı)", water: true, temp: 25, light: true, oxygen: true, sproutProgress: 0.0 }
    ];

    updateGerminationDOMControls();
    updateGerminationMetricsDOM();
}

function resetGerminationExperiment() {
    initGerminationState();
    showLabToast("Tohumlar ve kaplar 1. gün başlangıç durumuna sıfırlandı!");
}

function selectGerminationDish(dishId) {
    labState.germination.selectedDish = dishId;
    updateGerminationDOMControls();
    updateGerminationMetricsDOM();
}

function setGerminationWater(dishId, hasWater) {
    const dish = labState.germination.dishes.find(d => d.id === dishId);
    if (!dish) return;
    dish.water = hasWater;
    recalculateGerminationDish(dish);
    updateGerminationDOMControls();
    updateGerminationMetricsDOM();
}

function setGerminationTemp(dishId, temp) {
    const dish = labState.germination.dishes.find(d => d.id === dishId);
    if (!dish) return;
    dish.temp = temp;
    recalculateGerminationDish(dish);
    updateGerminationDOMControls();
    updateGerminationMetricsDOM();
}

function setGerminationLight(dishId, isLight) {
    const dish = labState.germination.dishes.find(d => d.id === dishId);
    if (!dish) return;
    dish.light = isLight;
    recalculateGerminationDish(dish);
    updateGerminationDOMControls();
    updateGerminationMetricsDOM();
}

function stepGerminationDay(delta) {
    const g = labState.germination;
    g.currentDay = Math.max(1, Math.min(7, g.currentDay + delta));
    g.dishes.forEach(recalculateGerminationDish);
    updateGerminationDOMControls();
    updateGerminationMetricsDOM();
    showLabToast(`📅 ${g.currentDay}. Gün Gözlemleniyor`);
}

function recalculateGerminationDish(dish) {
    const g = labState.germination;
    // S.O.S Kuralı: Su (Nem) + Oksijen + Uygun Sıcaklık (20-30°C arası)
    // Işık çimlenmeyi engellemez veya zorunlu kılmaz (Tohum karanlıkta da çimlenir)
    const canSprout = (dish.water === true) && (dish.temp === 25) && (dish.oxygen === true);
    if (canSprout) {
        dish.sproutProgress = Math.min(1.0, (g.currentDay - 1) / 5.0);
    } else {
        dish.sproutProgress = 0.0;
    }
}

function updateGerminationPhysics() {
    const g = labState.germination;
    if (g.isPlaying) {
        g.animProgress += 0.008;
        if (g.animProgress >= 1.0) {
            g.animProgress = 0.0;
            if (g.currentDay < 7) {
                g.currentDay++;
                g.dishes.forEach(recalculateGerminationDish);
                updateGerminationDOMControls();
                updateGerminationMetricsDOM();
            } else {
                g.isPlaying = false;
                const btnPlay = document.getElementById('btn-germ-play-pause');
                const lblPlay = document.getElementById('label-germ-play');
                if (btnPlay) btnPlay.classList.remove('active');
                if (lblPlay) lblPlay.textContent = "Günleri İlerlet";
                showLabToast("7 günlük çimlenme takibi tamamlandı!");
            }
        }
    }
}

function updateGerminationDOMControls() {
    const g = labState.germination;
    const curDish = g.dishes.find(d => d.id === g.selectedDish) || g.dishes[0];

    // Kap Seçim Butonları (Hızlı Bar & Sağ Panel)
    [1, 2, 3, 4].forEach(id => {
        const isSel = (g.selectedDish === id);
        const b = document.getElementById(`btn-germ-dish-${id}`);
        const p = document.getElementById(`pill-germ-dish-${id}`);
        if (b) b.classList.toggle('active', isSel);
        if (p) p.classList.toggle('active', isSel);
    });

    // Su Butonları
    const pWaterYes = document.getElementById('pill-germ-water-yes');
    const pWaterNo = document.getElementById('pill-germ-water-no');
    if (pWaterYes) pWaterYes.classList.toggle('active', curDish.water);
    if (pWaterNo) pWaterNo.classList.toggle('active', !curDish.water);

    // Sıcaklık Butonları
    const pT0 = document.getElementById('pill-germ-temp-0');
    const pT25 = document.getElementById('pill-germ-temp-25');
    const pT50 = document.getElementById('pill-germ-temp-50');
    if (pT0) pT0.classList.toggle('active', curDish.temp === 0);
    if (pT25) pT25.classList.toggle('active', curDish.temp === 25);
    if (pT50) pT50.classList.toggle('active', curDish.temp === 50);

    // Işık Butonları
    const pLDark = document.getElementById('pill-germ-light-dark');
    const pLBright = document.getElementById('pill-germ-light-bright');
    if (pLDark) pLDark.classList.toggle('active', !curDish.light);
    if (pLBright) pLBright.classList.toggle('active', curDish.light);

    // Oynat / Durdur
    const btnPlay = document.getElementById('btn-germ-play-pause');
    const lblPlay = document.getElementById('label-germ-play');
    if (btnPlay) btnPlay.classList.toggle('active', g.isPlaying);
    if (lblPlay) lblPlay.textContent = g.isPlaying ? "Durdur" : "Günleri İlerlet";
}

function updateGerminationMetricsDOM() {
    const g = labState.germination;
    const curDish = g.dishes.find(d => d.id === g.selectedDish) || g.dishes[0];
    const isSprouted = (curDish.sproutProgress >= 0.8);
    const isGrowing = (curDish.sproutProgress > 0 && curDish.sproutProgress < 0.8);

    // Canvas Altı Metrik Şeridi
    const elWater = document.getElementById('mbar-66-water');
    const elTemp = document.getElementById('mbar-66-temp');
    const elLight = document.getElementById('mbar-66-light');
    const elOxygen = document.getElementById('mbar-66-oxygen');
    const elStatus = document.getElementById('mbar-66-status');

    if (elWater) elWater.textContent = curDish.water ? "Islak Pamuk" : "Kuru Pamuk";
    if (elTemp) elTemp.textContent = `${curDish.temp}°C ${curDish.temp === 25 ? '(Uygun)' : '(Uygun Değil)'}`;
    if (elLight) elLight.textContent = curDish.light ? "Aydınlık Ortam" : "Karanlık Dolap";
    if (elOxygen) elOxygen.textContent = "Var (Havadar)";

    if (elStatus) {
        if (isSprouted) {
            elStatus.textContent = `🌱 ${g.currentDay}. Gün: Çimlendi & Filizlendi!`;
            elStatus.style.borderColor = "#10b981";
            elStatus.style.color = "#10b981";
        } else if (isGrowing) {
            elStatus.textContent = `🌱 ${g.currentDay}. Gün: Tohum Çatladı, Kök Çıkıyor`;
            elStatus.style.borderColor = "#38bdf8";
            elStatus.style.color = "#38bdf8";
        } else {
            const canSprout = (curDish.water === true) && (curDish.temp === 25) && (curDish.oxygen === true);
            if (canSprout && g.currentDay === 1) {
                elStatus.textContent = `⏳ 1. Gün: Şartlar Uygun (Su, 25°C, Oksijen). Günleri ilerletin!`;
                elStatus.style.borderColor = "#38bdf8";
                elStatus.style.color = "#38bdf8";
            } else {
                let reason = !curDish.water ? "Su Yok (Kuru)" : (curDish.temp === 0 ? "Çok Soğuk (0°C)" : (curDish.temp >= 40 ? "Çok Sıcak (50°C)" : "Sıcaklık Uygun Değil"));
                elStatus.textContent = `❌ Çimlenme Yok (${reason})`;
                elStatus.style.borderColor = "#ef4444";
                elStatus.style.color = "#ef4444";
            }
        }
    }

    // Sağ Panel Veri Çipleri
    const mDish = document.getElementById('metric-66-dish');
    const mWater = document.getElementById('metric-66-water');
    const mTemp = document.getElementById('metric-66-temp');
    const mSprout = document.getElementById('metric-66-sprout');

    if (mDish) mDish.textContent = `${curDish.id}. Kap (${g.currentDay}. Gün)`;
    if (mWater) mWater.textContent = curDish.water ? "Islak Pamuk" : "Kuru Pamuk";
    if (mTemp) mTemp.textContent = `${curDish.temp}°C`;
    if (mSprout) {
        const canSprout = (curDish.water === true) && (curDish.temp === 25) && (curDish.oxygen === true);
        if (isSprouted) {
            mSprout.textContent = "Filizlendi 🌱";
            mSprout.style.color = "#4ade80";
        } else if (isGrowing) {
            mSprout.textContent = "Kök Çıkıyor";
            mSprout.style.color = "#38bdf8";
        } else if (canSprout && g.currentDay === 1) {
            mSprout.textContent = "Hazır (Bekliyor)";
            mSprout.style.color = "#38bdf8";
        } else {
            mSprout.textContent = "Çimlenmedi ❌";
            mSprout.style.color = "#f87171";
        }
    }

    // Dinamik Pedagojik Kutu
    const pBox = document.getElementById('germ-pedagogical-box');
    const pTitle = document.getElementById('germ-pedagogical-title');
    const pText = document.getElementById('germ-pedagogical-text');
    if (pBox && pTitle && pText) {
        if (curDish.id === 1 || curDish.id === 4) {
            pTitle.textContent = curDish.light ? "☀️ 4. Kap: Işıklı Ortamda Çimlenme" : "🌑 1. Kap: Karanlık Ortamda Çimlenme";
            pText.textContent = "Fasulye tohumları hem karanlıkta (1. Kap) hem de ışıkta (4. Kap) eşit şekilde çimlenir. Bu durum, tohumun çimlenmesi için IŞIĞIN GEREKLİ OLMADIĞINI (çimlenme için S.O.S: Su, Oksijen, Sıcaklık yeterlidir) ispatlar!";
        } else if (curDish.id === 2) {
            pTitle.textContent = "🏜️ 2. Kap: Susuz Ortam Deneyi";
            pText.textContent = "Pamuk kuru bırakıldığında tohum su alıp şişemez ve metabolik faaliyetler başlayamaz. Su (nem) çimlenmenin vazgeçilmez şartıdır!";
        } else if (curDish.id === 3) {
            pTitle.textContent = "❄️ 3. Kap: Soğuk Ortam (0°C) Deneyi";
            pText.textContent = "Su ve oksijen bulunsa bile 0°C'de enzimler çalışamaz ve tohum uyku (dormansi) evresinde kalır. Çimlenme için uygun sıcaklık (20-30°C) zorunludur!";
        }
    }
}

function setupGerminationControlsDOM() {
    [1, 2, 3, 4].forEach(id => {
        const b = document.getElementById(`btn-germ-dish-${id}`);
        const p = document.getElementById(`pill-germ-dish-${id}`);
        if (b) b.addEventListener('click', () => selectGerminationDish(id));
        if (p) p.addEventListener('click', () => selectGerminationDish(id));
    });

    const pWaterYes = document.getElementById('pill-germ-water-yes');
    const pWaterNo = document.getElementById('pill-germ-water-no');
    if (pWaterYes) pWaterYes.addEventListener('click', () => setGerminationWater(labState.germination.selectedDish, true));
    if (pWaterNo) pWaterNo.addEventListener('click', () => setGerminationWater(labState.germination.selectedDish, false));

    const pT0 = document.getElementById('pill-germ-temp-0');
    const pT25 = document.getElementById('pill-germ-temp-25');
    const pT50 = document.getElementById('pill-germ-temp-50');
    if (pT0) pT0.addEventListener('click', () => setGerminationTemp(labState.germination.selectedDish, 0));
    if (pT25) pT25.addEventListener('click', () => setGerminationTemp(labState.germination.selectedDish, 25));
    if (pT50) pT50.addEventListener('click', () => setGerminationTemp(labState.germination.selectedDish, 50));

    const pLDark = document.getElementById('pill-germ-light-dark');
    const pLBright = document.getElementById('pill-germ-light-bright');
    if (pLDark) pLDark.addEventListener('click', () => setGerminationLight(labState.germination.selectedDish, false));
    if (pLBright) pLBright.addEventListener('click', () => setGerminationLight(labState.germination.selectedDish, true));

    const btnPlay = document.getElementById('btn-germ-play-pause');
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            const g = labState.germination;
            g.isPlaying = !g.isPlaying;
            if (g.isPlaying && g.currentDay >= 7) g.currentDay = 1;
            updateGerminationDOMControls();
        });
    }

    const btnNext = document.getElementById('btn-germ-day-next');
    if (btnNext) btnNext.addEventListener('click', () => stepGerminationDay(1));

    const btnReset = document.getElementById('btn-germ-reset');
    if (btnReset) btnReset.addEventListener('click', resetGerminationExperiment);

    const btnRec = document.getElementById('btn-record-data-6-6');
    if (btnRec) btnRec.addEventListener('click', recordMeasurement);
}

// Deney 6.6 Canvas Çizim Motoru (ZERO-CANVAS-TEXT)
function drawGerminationSimulation() {
    if (!ctx || !canvas) return;
    const w = 800;
    const h = 500;
    const g = labState.germination;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // 1. Laboratuvar Tezgahı ve Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, "#0b1329");
    bgGrad.addColorStop(0.65, "#131d38");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Tezgah Ahşap Yüzeyi
    const benchY = 320;
    const tableGrad = ctx.createLinearGradient(0, benchY, 0, h);
    tableGrad.addColorStop(0, "#334155");
    tableGrad.addColorStop(0.08, "#1e293b");
    tableGrad.addColorStop(1, "#0f172a");
    ctx.fillStyle = tableGrad;
    ctx.fillRect(0, benchY, w, h - benchY);

    ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, benchY);
    ctx.lineTo(w, benchY);
    ctx.stroke();

    // 2. 4 Petri Kabının Çizimi (x: 120, 300, 480, 660)
    const dishPositions = [120, 300, 480, 660];

    g.dishes.forEach((dish, idx) => {
        const cx = dishPositions[idx];
        const cy = 300;
        const rx = 68;
        const ry = 22;
        const dishH = 34;
        const isSelected = (dish.id === g.selectedDish);

        ctx.save();

        // Seçim Halesi / Glow
        if (isSelected) {
            ctx.beginPath();
            ctx.ellipse(cx, cy + dishH + 4, rx + 12, ry + 8, 0, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 210, 255, 0.18)";
            ctx.fill();
            ctx.strokeStyle = "#00d2ff";
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Kabın Alt Gölgesi
        ctx.beginPath();
        ctx.ellipse(cx, cy + dishH, rx + 4, ry + 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fill();

        // Ortam Efekti (Işık veya Soğukluk veya Karanlık)
        if (dish.light) {
            // 4. Kap: Güneş Işığı Hüzmesi
            const cone = ctx.createLinearGradient(cx, 40, cx, cy);
            cone.addColorStop(0, "rgba(253, 224, 71, 0.45)");
            cone.addColorStop(1, "rgba(253, 224, 71, 0.02)");
            ctx.fillStyle = cone;
            ctx.beginPath();
            ctx.moveTo(cx - 20, 40);
            ctx.lineTo(cx + 20, 40);
            ctx.lineTo(cx + rx + 15, cy + 10);
            ctx.lineTo(cx - rx - 15, cy + 10);
            ctx.closePath();
            ctx.fill();
        } else if (dish.temp === 0) {
            // 3. Kap: Buz / Soğuk Kristal Efekti
            ctx.fillStyle = "rgba(56, 189, 248, 0.12)";
            ctx.beginPath();
            ctx.arc(cx, cy - 20, 55, 0, Math.PI * 2);
            ctx.fill();
        } else if (!dish.light && dish.id === 1) {
            // 1. Kap: Karanlık Dolap Atmosferi
            ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
            ctx.beginPath();
            ctx.roundRect(cx - rx - 10, cy - 80, (rx + 10) * 2, 140, 8);
            ctx.fill();
        }

        // Cam Petri Kabı - Gövde Silindiri
        ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        ctx.beginPath();
        ctx.ellipse(cx, cy + dishH, rx, ry, 0, 0, Math.PI);
        ctx.lineTo(cx - rx, cy);
        ctx.ellipse(cx, cy, rx, ry, 0, Math.PI, 0, true);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Pamuk Katmanı
        const cottonY = cy + 10;
        ctx.beginPath();
        ctx.ellipse(cx, cottonY, rx - 6, ry - 3, 0, 0, Math.PI * 2);
        if (dish.water) {
            // Islak Pamuk (Mavimsi nemli doku)
            ctx.fillStyle = "#94a3b8";
            ctx.fill();
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 1.2;
            ctx.stroke();
            // Su Parıltıları
            ctx.fillStyle = "rgba(56, 189, 248, 0.6)";
            ctx.beginPath();
            ctx.arc(cx - 25, cottonY - 2, 3, 0, Math.PI * 2);
            ctx.arc(cx + 28, cottonY + 2, 2.5, 0, Math.PI * 2);
            ctx.arc(cx, cottonY + 4, 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Kuru Pamuk (Beyaz kuru lifler)
            ctx.fillStyle = "#f8fafc";
            ctx.fill();
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // 3 Adet Fasulye Tohumu ve Filizleri
        const seeds = [
            { ox: -26, oy: -1, rot: -0.25 },
            { ox: 0, oy: 4, rot: 0.1 },
            { ox: 26, oy: -2, rot: 0.3 }
        ];

        seeds.forEach(s => {
            const sx = cx + s.ox;
            const sy = cottonY + s.oy;
            const p = dish.sproutProgress;

            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(s.rot);

            // Kök (Radikula - p > 0.1 ise aşağı uzanır)
            if (p > 0.15) {
                const rootLen = p * 22;
                ctx.beginPath();
                ctx.moveTo(4, 0);
                ctx.quadraticCurveTo(8, rootLen * 0.5, 2, rootLen);
                ctx.strokeStyle = "#a3e635";
                ctx.lineWidth = 2.4;
                ctx.stroke();
            }

            // Tohum Gövdesi (Fasulye Böbrek Formu)
            ctx.beginPath();
            ctx.ellipse(0, 0, 11, 7, 0, 0, Math.PI * 2);
            ctx.fillStyle = (dish.temp === 0) ? "#a16207" : "#b45309"; // Kahverengi fasulye tohumu
            ctx.fill();
            ctx.strokeStyle = "#78350f";
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Gövde ve Yaprak (Plumula - p > 0.4 ise yukarı uzanır)
            if (p > 0.35) {
                const stemH = (p - 0.35) * 65;
                ctx.beginPath();
                ctx.moveTo(-3, -2);
                ctx.quadraticCurveTo(-6, -stemH * 0.6, -1, -stemH);
                ctx.strokeStyle = "#22c55e";
                ctx.lineWidth = 3.2;
                ctx.stroke();

                // Taze Yapraklar
                if (p > 0.65) {
                    const leafSize = (p - 0.65) * 22;
                    // Sol Yaprak
                    ctx.beginPath();
                    ctx.ellipse(-1 - leafSize * 0.8, -stemH - 4, leafSize, leafSize * 0.55, -0.4, 0, Math.PI * 2);
                    ctx.fillStyle = "#4ade80";
                    ctx.fill();
                    ctx.strokeStyle = "#15803d";
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Sağ Yaprak
                    ctx.beginPath();
                    ctx.ellipse(-1 + leafSize * 0.8, -stemH - 4, leafSize, leafSize * 0.55, 0.4, 0, Math.PI * 2);
                    ctx.fillStyle = "#4ade80";
                    ctx.fill();
                    ctx.strokeStyle = "#15803d";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }

            ctx.restore();
        });

        // Cam Petri Kabı - Üst Kenar Parlaması
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.restore();
    });

    ctx.restore();
}

// ============================================================================
// --- 6.7. DENEY 6.7: IŞIĞIN SOĞURULMASI VE RADYOMETRE (FB.6.4.4 - FB.6.4.6) ---
// ============================================================================

function initAbsorptionState() {
    const ab = labState.absorption;
    ab.lampOn = true;
    ab.lampPower = 100;
    ab.tempBlack = 20.0;
    ab.tempBlue = 20.0;
    ab.tempWhite = 20.0;
    ab.radiometerAngle = 0.0;
    ab.radiometerSpeed = 0.08;
    ab.lightRaysAnim = 0.0;

    updateAbsorptionDOMControls();
    updateAbsorptionMetricsDOM();
}

function resetAbsorptionExperiment() {
    initAbsorptionState();
    showLabToast("Tüm kaplar ve radyometre oda sıcaklığına (20°C) sıfırlandı!");
}

function toggleAbsorptionLamp() {
    const ab = labState.absorption;
    ab.lampOn = !ab.lampOn;
    updateAbsorptionDOMControls();
    updateAbsorptionMetricsDOM();
    showLabToast(ab.lampOn ? "💡 Işık Kaynağı Açıldı" : "🌑 Işık Kaynağı Kapatıldı");
}

function setAbsorptionPower(pwr) {
    const ab = labState.absorption;
    ab.lampPower = pwr;
    ab.lampOn = (pwr > 0);
    updateAbsorptionDOMControls();
    updateAbsorptionMetricsDOM();
}

function updateAbsorptionPhysics() {
    const ab = labState.absorption;
    ab.lightRaysAnim += 0.04;

    if (ab.lampOn) {
        const factor = ab.lampPower / 100;
        // Siyah kap: En çok ışık soğuran -> 45°C'ye kadar hızla ısınır
        const targetBlack = 20.0 + 25.0 * factor;
        // Mavi kap: Orta soğuran -> 32°C'ye kadar ısınır
        const targetBlue = 20.0 + 12.0 * factor;
        // Beyaz kap: En çok yansıtan -> 24°C'ye kadar çok az ısınır
        const targetWhite = 20.0 + 4.0 * factor;

        ab.tempBlack += (targetBlack - ab.tempBlack) * 0.015;
        ab.tempBlue += (targetBlue - ab.tempBlue) * 0.015;
        ab.tempWhite += (targetWhite - ab.tempWhite) * 0.015;

        // Radyometre dönüş hızı
        ab.radiometerSpeed = 0.03 + 0.18 * factor;
    } else {
        // Soğuma (Oda sıcaklığına dönüş)
        ab.tempBlack += (20.0 - ab.tempBlack) * 0.01;
        ab.tempBlue += (20.0 - ab.tempBlue) * 0.01;
        ab.tempWhite += (20.0 - ab.tempWhite) * 0.01;
        ab.radiometerSpeed *= 0.96;
    }

    ab.radiometerAngle += ab.radiometerSpeed;
    updateAbsorptionMetricsDOM();
}

function updateAbsorptionDOMControls() {
    const ab = labState.absorption;

    // Lamba Aç/Kapat Butonu
    const btnLamp = document.getElementById('btn-absorb-lamp-toggle');
    const lblLamp = document.getElementById('label-absorb-lamp');
    if (btnLamp) btnLamp.classList.toggle('active', ab.lampOn);
    if (lblLamp) lblLamp.textContent = ab.lampOn ? `Işık: Açık (%${ab.lampPower})` : "Işık: Kapalı";

    // Güç Butonları (Hızlı Bar)
    const p25 = document.getElementById('btn-absorb-pwr-25');
    const p50 = document.getElementById('btn-absorb-pwr-50');
    const p100 = document.getElementById('btn-absorb-pwr-100');
    if (p25) p25.classList.toggle('active', ab.lampOn && ab.lampPower === 25);
    if (p50) p50.classList.toggle('active', ab.lampOn && ab.lampPower === 50);
    if (p100) p100.classList.toggle('active', ab.lampOn && ab.lampPower === 100);

    // Sağ Panel Butonları
    const pillLow = document.getElementById('pill-absorb-low');
    const pillMed = document.getElementById('pill-absorb-med');
    const pillHigh = document.getElementById('pill-absorb-high');
    if (pillLow) pillLow.classList.toggle('active', ab.lampOn && ab.lampPower === 25);
    if (pillMed) pillMed.classList.toggle('active', ab.lampOn && ab.lampPower === 50);
    if (pillHigh) pillHigh.classList.toggle('active', ab.lampOn && ab.lampPower === 100);

    // Kaydırıcı
    const slider = document.getElementById('slider-absorb-power');
    const lblVal = document.getElementById('label-absorb-power-val');
    if (slider) slider.value = ab.lampOn ? ab.lampPower : 0;
    if (lblVal) lblVal.textContent = ab.lampOn ? `%${ab.lampPower}` : "%0 (Kapalı)";
}

function updateAbsorptionMetricsDOM() {
    const ab = labState.absorption;

    // Metrik Şeridi (Canvas Altı)
    const elLamp = document.getElementById('mbar-67-lamp');
    const elBlack = document.getElementById('mbar-67-black-temp');
    const elBlue = document.getElementById('mbar-67-blue-temp');
    const elWhite = document.getElementById('mbar-67-white-temp');
    const elRpm = document.getElementById('mbar-67-rpm');
    const elStatus = document.getElementById('mbar-67-status');

    if (elLamp) elLamp.textContent = ab.lampOn ? `Açık (%${ab.lampPower})` : "Kapalı";
    if (elBlack) elBlack.textContent = `${ab.tempBlack.toFixed(1)}°C`;
    if (elBlue) elBlue.textContent = `${ab.tempBlue.toFixed(1)}°C`;
    if (elWhite) elWhite.textContent = `${ab.tempWhite.toFixed(1)}°C`;

    let rpmStr = "Durgun";
    if (ab.radiometerSpeed > 0.15) rpmStr = "Çok Hızlı ⚡";
    else if (ab.radiometerSpeed > 0.07) rpmStr = "Orta Hız";
    else if (ab.radiometerSpeed > 0.01) rpmStr = "Yavaş";
    if (elRpm) elRpm.textContent = rpmStr;

    if (elStatus) {
        if (!ab.lampOn) {
            elStatus.textContent = "Işık Kapalı · Soğuma Devam Ediyor";
            elStatus.style.borderColor = "#94a3b8";
        } else if (ab.tempBlack > ab.tempWhite + 8) {
            elStatus.textContent = "☀️ Siyah Kap Belirgin Şekilde Daha Çok Isındı!";
            elStatus.style.borderColor = "#f87171";
            elStatus.style.color = "#f87171";
        } else {
            elStatus.textContent = "Işık Soğurulması Devam Ediyor...";
            elStatus.style.borderColor = "#facc15";
            elStatus.style.color = "#facc15";
        }
    }

    // Sağ Panel Çipleri
    const mBlack = document.getElementById('metric-67-black');
    const mBlue = document.getElementById('metric-67-blue');
    const mWhite = document.getElementById('metric-67-white');
    const mRpm = document.getElementById('metric-67-rpm');
    if (mBlack) mBlack.textContent = `${ab.tempBlack.toFixed(1)}°C`;
    if (mBlue) mBlue.textContent = `${ab.tempBlue.toFixed(1)}°C`;
    if (mWhite) mWhite.textContent = `${ab.tempWhite.toFixed(1)}°C`;
    if (mRpm) mRpm.textContent = rpmStr;
}

function setupAbsorptionControlsDOM() {
    const btnToggle = document.getElementById('btn-absorb-lamp-toggle');
    if (btnToggle) btnToggle.addEventListener('click', toggleAbsorptionLamp);

    const b25 = document.getElementById('btn-absorb-pwr-25');
    const b50 = document.getElementById('btn-absorb-pwr-50');
    const b100 = document.getElementById('btn-absorb-pwr-100');
    if (b25) b25.addEventListener('click', () => setAbsorptionPower(25));
    if (b50) b50.addEventListener('click', () => setAbsorptionPower(50));
    if (b100) b100.addEventListener('click', () => setAbsorptionPower(100));

    const pLow = document.getElementById('pill-absorb-low');
    const pMed = document.getElementById('pill-absorb-med');
    const pHigh = document.getElementById('pill-absorb-high');
    if (pLow) pLow.addEventListener('click', () => setAbsorptionPower(25));
    if (pMed) pMed.addEventListener('click', () => setAbsorptionPower(50));
    if (pHigh) pHigh.addEventListener('click', () => setAbsorptionPower(100));

    const slider = document.getElementById('slider-absorb-power');
    if (slider) {
        slider.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            setAbsorptionPower(val);
        });
    }

    const btnReset = document.getElementById('btn-absorb-reset');
    if (btnReset) btnReset.addEventListener('click', resetAbsorptionExperiment);

    const btnRec = document.getElementById('btn-record-data-6-7');
    if (btnRec) btnRec.addEventListener('click', recordMeasurement);
}

// Deney 6.7 Canvas Çizim Motoru (ZERO-CANVAS-TEXT)
function drawAbsorptionSimulation() {
    if (!ctx || !canvas) return;
    const w = 800;
    const h = 500;
    const ab = labState.absorption;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, "#090d16");
    bgGrad.addColorStop(0.7, "#111827");
    bgGrad.addColorStop(1, "#1f2937");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Zemin Tezgahı
    const benchY = 360;
    ctx.fillStyle = "#374151";
    ctx.fillRect(0, benchY, w, h - benchY);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, benchY);
    ctx.lineTo(w, benchY);
    ctx.stroke();

    // 1. Akkor Lamba / Projektör (x: 270, y: 70)
    const lx = 270;
    const ly = 70;

    // Lamba Işık Demeti (Açıksa)
    if (ab.lampOn) {
        const glowR = 120 * (ab.lampPower / 100);
        const lGlow = ctx.createRadialGradient(lx, ly, 10, lx, ly, glowR);
        lGlow.addColorStop(0, "rgba(254, 240, 138, 0.9)");
        lGlow.addColorStop(0.4, "rgba(250, 204, 21, 0.35)");
        lGlow.addColorStop(1, "rgba(250, 204, 21, 0)");
        ctx.fillStyle = lGlow;
        ctx.beginPath();
        ctx.arc(lx, ly, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Kaplara İnen Işık Işınları
        const beamGrad = ctx.createLinearGradient(lx, ly, lx, benchY);
        beamGrad.addColorStop(0, "rgba(254, 240, 138, 0.35)");
        beamGrad.addColorStop(1, "rgba(254, 240, 138, 0.03)");
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(lx - 25, ly);
        ctx.lineTo(lx + 25, ly);
        ctx.lineTo(470, benchY);
        ctx.lineTo(70, benchY);
        ctx.closePath();
        ctx.fill();

        // Radyometreye Vuran Işık
        const radBeam = ctx.createLinearGradient(lx, ly, 620, 260);
        radBeam.addColorStop(0, "rgba(254, 240, 138, 0.3)");
        radBeam.addColorStop(1, "rgba(254, 240, 138, 0.04)");
        ctx.fillStyle = radBeam;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(620 - 45, 260 - 30);
        ctx.lineTo(620 + 45, 260 + 30);
        ctx.closePath();
        ctx.fill();
    }

    // Lamba Gövdesi & Reflektör
    ctx.fillStyle = "#4b5563";
    ctx.beginPath();
    ctx.moveTo(lx - 35, ly);
    ctx.lineTo(lx + 35, ly);
    ctx.lineTo(lx + 15, ly - 35);
    ctx.lineTo(lx - 15, ly - 35);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ampul Camı
    ctx.beginPath();
    ctx.arc(lx, ly, 16, 0, Math.PI * 2);
    ctx.fillStyle = ab.lampOn ? "#fef08a" : "#6b7280";
    ctx.fill();

    // 2. 3 Adet Renkli Kap ve Termometreler (x: 130, 270, 410)
    const cups = [
        { cx: 130, color: "#0f172a", border: "#334155", temp: ab.tempBlack }, // Siyah Kap
        { cx: 270, color: "#2563eb", border: "#60a5fa", temp: ab.tempBlue },  // Mavi Kap
        { cx: 410, color: "#f8fafc", border: "#cbd5e1", temp: ab.tempWhite }  // Beyaz Kap
    ];

    cups.forEach(cup => {
        const cx = cup.cx;
        const cy = 250;
        const cw = 75;
        const ch = 110;

        // Kap Silindiri
        ctx.fillStyle = cup.color;
        ctx.beginPath();
        ctx.roundRect(cx - cw / 2, cy, cw, ch, [0, 0, 10, 10]);
        ctx.fill();
        ctx.strokeStyle = cup.border;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Termometre (Cam Tüp ve Kırmızı Sıvı)
        const tx = cx;
        const ty = cy - 45;
        const th = 135;

        // Cam Tüp
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.beginPath();
        ctx.roundRect(tx - 4, ty, 8, th, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Termometre Haznesi
        ctx.beginPath();
        ctx.arc(tx, ty + th - 2, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444";
        ctx.fill();

        // Sıvı Sütunu (Sıcaklığa göre 20°C - 50°C arası)
        const liquidH = Math.max(10, Math.min(th - 14, ((cup.temp - 15) / 35) * (th - 14)));
        ctx.beginPath();
        ctx.roundRect(tx - 2.5, ty + th - 4 - liquidH, 5, liquidH, 2.5);
        ctx.fillStyle = "#ef4444";
        ctx.fill();
    });

    // 3. Crookes Radyometresi (x: 620, y: 260)
    const rx = 620;
    const ry = 250;

    // Radyometre Metal Standı
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.roundRect(rx - 30, benchY - 15, 60, 15, 4);
    ctx.fill();
    ctx.fillStyle = "#64748b";
    ctx.fillRect(rx - 3, ry + 60, 6, benchY - (ry + 60) - 15);

    // Cam Fanus Küresi
    const sphereR = 55;
    ctx.beginPath();
    ctx.arc(rx, ry, sphereR, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fanus Cam Yansıma Parıltısı
    ctx.beginPath();
    ctx.arc(rx - 18, ry - 18, 22, Math.PI * 1.1, Math.PI * 1.6);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Dikey İğne Mili
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rx, ry + 40);
    ctx.lineTo(rx, ry - 15);
    ctx.stroke();

    // Dönen 4 Kanatçık
    ctx.save();
    ctx.translate(rx, ry);

    const a = ab.radiometerAngle;
    for (let i = 0; i < 4; i++) {
        const angle = a + i * (Math.PI / 2);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const vaneLen = 30;
        const vx = cos * vaneLen;
        const vy = sin * (vaneLen * 0.35); // 3D perspektif eğimi

        // İğneden kanada tel kol
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(vx, vy);
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Kanatçık Levhası: Bir yüzü siyah, diğer yüzü gümüş
        ctx.save();
        ctx.translate(vx, vy);
        ctx.beginPath();
        ctx.roundRect(-6, -11, 12, 22, 2);
        // Bakış açısına göre siyah mı beyaz mı görünüyor
        ctx.fillStyle = (sin >= 0) ? "#0f172a" : "#f8fafc";
        ctx.fill();
        ctx.strokeStyle = (sin >= 0) ? "#334155" : "#cbd5e1";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();

    ctx.restore();
}

// ============================================================================
// --- 6.8. DENEY 6.8: KATILARDA GENLEŞME VE BÜZÜLME - GRAVZANT (FB.6.5.1) ---
// ============================================================================

function initExpansionState() {
    const ex = labState.expansion;
    ex.step = "cold_pass";
    ex.sphereTemp = 20.0;
    ex.sphereRadius = 25.5; // Soğukken halkanın (29.0) içinden rahat geçer
    ex.ringRadius = 29.0;
    ex.sphereX = 400;
    ex.sphereY = 140;
    ex.targetY = 140;
    ex.isHeating = false;
    ex.isQuenching = false;
    ex.isPassingThrough = true;
    ex.flameParticles = [];
    ex.steamParticles = [];

    updateExpansionDOMControls();
    updateExpansionMetricsDOM();
}

function resetExpansionExperiment() {
    initExpansionState();
    showLabToast("Gravzant düzeneği başlangıç durumuna sıfırlandı!");
}

function setExpansionStep(stepName) {
    const ex = labState.expansion;
    ex.step = stepName;

    if (stepName === "cold_pass") {
        ex.sphereTemp = 20.0;
        ex.sphereRadius = 25.5;
        ex.sphereX = 400;
        ex.sphereY = 140;
        ex.targetY = 320; // Halkanın altından geçer
        ex.isHeating = false;
        ex.isQuenching = false;
        ex.isPassingThrough = true;
        showLabToast("1. Aşama: Soğuk küre halkadan kolayca geçer.");
    } else if (stepName === "heating") {
        ex.sphereX = 180; // İspirto ocağının üstü
        ex.sphereY = 240;
        ex.targetY = 240;
        ex.isHeating = true;
        ex.isQuenching = false;
        showLabToast("2. Aşama: Küre ispirto ocağında ısıtılıyor (Genleşiyor!).");
    } else if (stepName === "hot_try") {
        ex.sphereX = 400;
        ex.sphereY = 140;
        ex.targetY = 208; // Halkanın üstüne küt diye takılır (halka Y: 230)
        ex.isHeating = false;
        ex.isQuenching = false;
        ex.isPassingThrough = false;
        showLabToast("3. Aşama: Sıcak küre genleştiği için halkadan GEÇEMEZ (Takıldı!).");
    } else if (stepName === "quenching") {
        ex.sphereX = 620; // Soğuk su beherinin içi
        ex.sphereY = 260;
        ex.targetY = 260;
        ex.isHeating = false;
        ex.isQuenching = true;
        showLabToast("4. Aşama: Küre soğuk suya daldırıldı (Büzülüyor!).");
    }

    updateExpansionDOMControls();
    updateExpansionMetricsDOM();
}

function updateExpansionPhysics() {
    const ex = labState.expansion;

    // Küre Pozisyon İnterpolasyonu
    ex.sphereY += (ex.targetY - ex.sphereY) * 0.08;

    // Isıtma Fiziği
    if (ex.isHeating) {
        if (ex.sphereTemp < 250.0) {
            ex.sphereTemp += 1.8;
            ex.sphereRadius = 25.5 + ((ex.sphereTemp - 20) / 230) * 7.0; // 25.5 -> 32.5 px
        }
        // Alev Parçacıkları Üret
        if (Math.random() < 0.6) {
            ex.flameParticles.push({
                x: 180 + (Math.random() - 0.5) * 18,
                y: 310,
                vx: (Math.random() - 0.5) * 0.8,
                vy: -2.5 - Math.random() * 2,
                life: 1.0,
                color: Math.random() < 0.5 ? "#f97316" : "#facc15"
            });
        }
    }

    // Suya Daldırıp Soğutma Fiziği
    if (ex.isQuenching) {
        if (ex.sphereTemp > 20.0) {
            ex.sphereTemp -= 4.0;
            if (ex.sphereTemp < 20.0) ex.sphereTemp = 20.0;
            ex.sphereRadius = 25.5 + ((ex.sphereTemp - 20) / 230) * 7.0;
        }
        // Buhar Parçacıkları Üret
        if (ex.sphereTemp > 40 && Math.random() < 0.7) {
            ex.steamParticles.push({
                x: 620 + (Math.random() - 0.5) * 25,
                y: 250,
                vx: (Math.random() - 0.5) * 1.2,
                vy: -2.0 - Math.random() * 1.5,
                size: 4 + Math.random() * 6,
                life: 1.0
            });
        }
    }

    // Alev Parçacıklarını Güncelle
    for (let i = ex.flameParticles.length - 1; i >= 0; i--) {
        const p = ex.flameParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        if (p.life <= 0) ex.flameParticles.splice(i, 1);
    }

    // Buhar Parçacıklarını Güncelle
    for (let i = ex.steamParticles.length - 1; i >= 0; i--) {
        const p = ex.steamParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.size += 0.2;
        p.life -= 0.035;
        if (p.life <= 0) ex.steamParticles.splice(i, 1);
    }

    updateExpansionMetricsDOM();
}

function updateExpansionDOMControls() {
    const ex = labState.expansion;

    const steps = ["cold_pass", "heating", "hot_try", "quenching"];
    const quickIds = {
        cold_pass: "btn-grav-pass-cold",
        heating: "btn-grav-heat",
        hot_try: "btn-grav-pass-hot",
        quenching: "btn-grav-quench"
    };
    const pillIds = {
        cold_pass: "pill-grav-pass-cold",
        heating: "pill-grav-heat",
        hot_try: "pill-grav-pass-hot",
        quenching: "pill-grav-quench"
    };

    steps.forEach(s => {
        const isCur = (ex.step === s);
        const b = document.getElementById(quickIds[s]);
        const p = document.getElementById(pillIds[s]);
        if (b) b.classList.toggle('active', isCur);
        if (p) p.classList.toggle('active', isCur);
    });
}

function updateExpansionMetricsDOM() {
    const ex = labState.expansion;
    const isHot = (ex.sphereTemp > 80);
    const passes = (ex.sphereRadius <= ex.ringRadius);

    // Canvas Altı Metrik Şeridi
    const elState = document.getElementById('mbar-68-state');
    const elTemp = document.getElementById('mbar-68-temp');
    const elVol = document.getElementById('mbar-68-volume');
    const elStatus = document.getElementById('mbar-68-status');

    if (elState) elState.textContent = isHot ? "Akkor Sıcak" : "Oda Sıcaklığı";
    if (elTemp) elTemp.textContent = `${ex.sphereTemp.toFixed(0)}°C`;
    if (elVol) elVol.textContent = isHot ? "Büyük (Genleşti)" : "Normal (Büzüldü)";

    if (elStatus) {
        if (ex.step === "heating") {
            elStatus.textContent = "🔥 İspirto Ocağında Isıtılıyor (Genleşme Gerçekleşiyor)";
            elStatus.style.borderColor = "#f97316";
            elStatus.style.color = "#f97316";
        } else if (ex.step === "hot_try") {
            elStatus.textContent = "⛔ Sıcak Küre Genleştiği İçin Halkaya Takıldı (Geçemez!)";
            elStatus.style.borderColor = "#ef4444";
            elStatus.style.color = "#ef4444";
        } else if (ex.step === "quenching") {
            elStatus.textContent = "❄️ Soğuk Suya Daldırıldı (Büzülüyor)";
            elStatus.style.borderColor = "#38bdf8";
            elStatus.style.color = "#38bdf8";
        } else {
            elStatus.textContent = "✅ Soğuk Küre Halkadan Kolayca Geçti";
            elStatus.style.borderColor = "#10b981";
            elStatus.style.color = "#10b981";
        }
    }

    // Sağ Panel Çipleri
    const mTemp = document.getElementById('metric-68-temp');
    const mVol = document.getElementById('metric-68-volume');
    const mRing = document.getElementById('metric-68-ring');
    const mPass = document.getElementById('metric-68-pass');

    if (mTemp) mTemp.textContent = `${ex.sphereTemp.toFixed(0)}°C`;
    if (mVol) mVol.textContent = isHot ? "Büyük (Genleşti)" : "Normal";
    if (mRing) mRing.textContent = "Sabit Çap";
    if (mPass) {
        mPass.textContent = passes ? "Geçer ✅" : "Takılır ⛔";
        mPass.style.color = passes ? "#4ade80" : "#f87171";
    }
}

function setupExpansionControlsDOM() {
    const bCold = document.getElementById('btn-grav-pass-cold');
    const bHeat = document.getElementById('btn-grav-heat');
    const bHot = document.getElementById('btn-grav-pass-hot');
    const bQuench = document.getElementById('btn-grav-quench');
    if (bCold) bCold.addEventListener('click', () => setExpansionStep("cold_pass"));
    if (bHeat) bHeat.addEventListener('click', () => setExpansionStep("heating"));
    if (bHot) bHot.addEventListener('click', () => setExpansionStep("hot_try"));
    if (bQuench) bQuench.addEventListener('click', () => setExpansionStep("quenching"));

    const pCold = document.getElementById('pill-grav-pass-cold');
    const pHeat = document.getElementById('pill-grav-heat');
    const pHot = document.getElementById('pill-grav-pass-hot');
    const pQuench = document.getElementById('pill-grav-quench');
    if (pCold) pCold.addEventListener('click', () => setExpansionStep("cold_pass"));
    if (pHeat) pHeat.addEventListener('click', () => setExpansionStep("heating"));
    if (pHot) pHot.addEventListener('click', () => setExpansionStep("hot_try"));
    if (pQuench) pQuench.addEventListener('click', () => setExpansionStep("quenching"));

    const btnReset = document.getElementById('btn-grav-reset');
    if (btnReset) btnReset.addEventListener('click', resetExpansionExperiment);

    const btnRec = document.getElementById('btn-record-data-6-8');
    if (btnRec) btnRec.addEventListener('click', recordMeasurement);
}

// Deney 6.8 Canvas Çizim Motoru (ZERO-CANVAS-TEXT)
function drawExpansionSimulation() {
    if (!ctx || !canvas) return;
    const w = 800;
    const h = 500;
    const ex = labState.expansion;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, "#0b1120");
    bgGrad.addColorStop(0.7, "#172554");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Zemin
    const benchY = 370;
    ctx.fillStyle = "#334155";
    ctx.fillRect(0, benchY, w, h - benchY);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, benchY);
    ctx.lineTo(w, benchY);
    ctx.stroke();

    // 1. SOL ALAN: İspirto Ocağı (x: 180)
    const bx = 180;
    const by = benchY - 10;

    // Cam Gövde
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.beginPath();
    ctx.roundRect(bx - 32, by - 45, 64, 45, 8);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // İspirto Sıvısı (Mavi/Mor alev sıvısı)
    ctx.fillStyle = "rgba(147, 51, 234, 0.35)";
    ctx.beginPath();
    ctx.roundRect(bx - 30, by - 32, 60, 30, [0, 0, 6, 6]);
    ctx.fill();

    // Metal Fitil Başlığı
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(bx - 8, by - 55, 16, 10);

    // Alev (Isıtma adımı aktifse)
    if (ex.isHeating) {
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.moveTo(bx - 9, by - 55);
        ctx.quadraticCurveTo(bx - 14, by - 95, bx, by - 110);
        ctx.quadraticCurveTo(bx + 14, by - 95, bx + 9, by - 55);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.moveTo(bx - 5, by - 55);
        ctx.quadraticCurveTo(bx - 8, by - 85, bx, by - 98);
        ctx.quadraticCurveTo(bx + 8, by - 85, bx + 5, by - 55);
        ctx.closePath();
        ctx.fill();

        // Parçacıklar
        ex.flameParticles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3 * p.life, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // 2. ORTA ALAN: Gravzant Düzeneği (Halka x: 400, y: 230)
    const rx = 400;
    const ry = 230;

    // Statif Ayak ve Dikey Çubuk
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(rx - 70, benchY - 14, 40, 14); // Taban
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(rx - 55, 100, 8, benchY - 100); // Dikey sütun

    // Yatay Halka Tutucu Kolu
    ctx.fillRect(rx - 55, ry - 5, 45, 10);

    // Gravzant Halkası (Ortası delik dairesel halka)
    ctx.save();
    ctx.translate(rx, ry);
    // Halkanın dışı
    ctx.beginPath();
    ctx.ellipse(0, 0, 42, 16, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#e2e8f0";
    ctx.fill();
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Halkanın iç deliği (r = 29.0 px)
    ctx.beginPath();
    ctx.ellipse(0, 0, ex.ringRadius, ex.ringRadius * 0.38, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#172554"; // Boşluk
    ctx.fill();
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 3. SAĞ ALAN: Soğuk Su Beheri (x: 620)
    const sx = 620;
    const sy = benchY - 10;

    // Cam Beher
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    ctx.beginPath();
    ctx.roundRect(sx - 42, sy - 90, 84, 90, [0, 0, 8, 8]);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Soğuk Su
    ctx.fillStyle = "rgba(56, 189, 248, 0.45)";
    ctx.beginPath();
    ctx.roundRect(sx - 40, sy - 75, 80, 75, [0, 0, 6, 6]);
    ctx.fill();

    // Su İçinde Buz Küpleri
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.fillRect(sx - 25, sy - 65, 14, 14);
    ctx.fillRect(sx + 10, sy - 50, 16, 16);

    // Buhar Parçacıkları (Suya daldırıldığında)
    ex.steamParticles.forEach(p => {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // 4. METAL KÜRE VE TUTMA ZİNCİRİ (ex.sphereX, ex.sphereY)
    const kx = ex.sphereX;
    const ky = ex.sphereY;
    const kr = ex.sphereRadius;

    // Tutma Zinciri (Tepeden küreye iner)
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(kx, 40);
    ctx.lineTo(kx, ky - kr);
    ctx.stroke();

    // Küre Çizimi
    ctx.save();
    // Sıcaklık kızıllığı / parlama
    if (ex.sphereTemp > 80) {
        const glow = ctx.createRadialGradient(kx, ky, kr * 0.5, kx, ky, kr * 2.2);
        glow.addColorStop(0, "rgba(239, 68, 68, 0.8)");
        glow.addColorStop(0.5, "rgba(249, 115, 22, 0.4)");
        glow.addColorStop(1, "rgba(249, 115, 22, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(kx, ky, kr * 2.2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(kx, ky, kr, 0, Math.PI * 2);
    // Renk (Soğuksa pirinç sarısı, sıcaksa akkor kızıl)
    const sphereGrad = ctx.createRadialGradient(kx - kr * 0.35, ky - kr * 0.35, kr * 0.1, kx, ky, kr);
    if (ex.sphereTemp > 180) {
        sphereGrad.addColorStop(0, "#fef08a"); // Akkor merkez
        sphereGrad.addColorStop(0.4, "#ef4444");
        sphereGrad.addColorStop(1, "#7f1d1d");
    } else if (ex.sphereTemp > 60) {
        sphereGrad.addColorStop(0, "#fed7aa");
        sphereGrad.addColorStop(0.5, "#f97316");
        sphereGrad.addColorStop(1, "#9a3412");
    } else {
        sphereGrad.addColorStop(0, "#fef08a"); // Pirinç bronz küre
        sphereGrad.addColorStop(0.5, "#eab308");
        sphereGrad.addColorStop(1, "#713f12");
    }
    ctx.fillStyle = sphereGrad;
    ctx.fill();
    ctx.strokeStyle = "#451a03";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    ctx.restore();
}

// ============================================================================
// --- 6.9. DENEY 6.9: ELEKTRİKSEL İLETKENLİK TEST CİHAZI (FB.6.6.1) ---
// ============================================================================

const CONDUCTIVITY_MATERIALS = {
    copper:     { name: "Bakır Tel",        type: "Katı İletken",        isConductive: true,  brightness: 1.0,  color: "#f97316", isLiquid: false },
    iron:       { name: "Demir Çivi",       type: "Katı İletken",        isConductive: true,  brightness: 0.9,  color: "#94a3b8", isLiquid: false },
    graphite:   { name: "Grafit Uç",        type: "Katı Ametal İletken", isConductive: true,  brightness: 0.75, color: "#334155", isLiquid: false },
    wood:       { name: "Kuru Tahta",       type: "Katı Yalıtkan",       isConductive: false, brightness: 0.0,  color: "#b45309", isLiquid: false },
    plastic:    { name: "Plastik Cetvel",   type: "Katı Yalıtkan",       isConductive: false, brightness: 0.0,  color: "#3b82f6", isLiquid: false },
    eraser:     { name: "Silgi",            type: "Katı Yalıtkan",       isConductive: false, brightness: 0.0,  color: "#f43f5e", isLiquid: false },
    saltwater:  { name: "Tuzlu Su",         type: "Sıvı İletken Çözelti",isConductive: true,  brightness: 0.85, color: "#38bdf8", isLiquid: true  },
    lemonwater: { name: "Limonlu Su",       type: "Sıvı Asidik Çözelti", isConductive: true,  brightness: 0.8,  color: "#facc15", isLiquid: true  },
    sugarwater: { name: "Şekerli Su",       type: "Sıvı Yalıtkan Çözelti",isConductive: false, brightness: 0.0, color: "#bae6fd", isLiquid: true  },
    purewater:  { name: "Saf Su",           type: "Saf Sıvı (Yalıtkan)", isConductive: false, brightness: 0.0,  color: "#93c5fd", isLiquid: true  }
};

function initConductivityState() {
    const cd = labState.conductivity;
    cd.selectedMaterial = "copper";
    cd.isConductive = true;
    cd.bulbBrightness = 1.0;
    cd.electronParticles = [];
    cd.ionParticles = [];

    // Devre Kablosu Yolunda Başlangıç Elektronları
    for (let i = 0; i < 24; i++) {
        cd.electronParticles.push({
            progress: i / 24,
            speed: 0.006
        });
    }

    updateConductivityDOMControls();
    updateConductivityMetricsDOM();
}

function resetConductivityExperiment() {
    initConductivityState();
    showLabToast("İletkenlik test cihazı başlangıç konumuna alındı!");
}

function selectConductivityMaterial(matKey) {
    const cd = labState.conductivity;
    const info = CONDUCTIVITY_MATERIALS[matKey];
    if (!info) return;

    cd.selectedMaterial = matKey;
    cd.isConductive = info.isConductive;
    cd.bulbBrightness = info.brightness;

    updateConductivityDOMControls();
    updateConductivityMetricsDOM();
    showLabToast(info.isConductive ? `💡 ${info.name} bağlandı: İletken! Ampul yanıyor.` : `❌ ${info.name} bağlandı: Yalıtkan! Ampul yanmıyor.`);
}

function updateConductivityPhysics() {
    const cd = labState.conductivity;
    if (cd.isConductive) {
        cd.electronParticles.forEach(p => {
            p.progress += p.speed;
            if (p.progress > 1.0) p.progress -= 1.0;
        });
    }
}

function updateConductivityDOMControls() {
    const cd = labState.conductivity;
    const sel = cd.selectedMaterial;

    // Hızlı Butonlar
    const btnIds = ["copper", "iron", "graphite", "wood", "plastic", "saltwater", "purewater"];
    btnIds.forEach(id => {
        const b = document.getElementById(`btn-cond-mat-${id}`);
        if (b) b.classList.toggle('active', sel === id);
    });

    // Sağ Panel Butonları
    const pillIds = ["copper", "iron", "graphite", "wood", "plastic", "eraser", "saltwater", "sugarwater", "lemonwater", "purewater"];
    pillIds.forEach(id => {
        const p = document.getElementById(`pill-cond-${id}`);
        if (p) p.classList.toggle('active', sel === id);
    });
}

function updateConductivityMetricsDOM() {
    const cd = labState.conductivity;
    const info = CONDUCTIVITY_MATERIALS[cd.selectedMaterial] || CONDUCTIVITY_MATERIALS.copper;

    // Canvas Altı Metrik Şeridi
    const mMat = document.getElementById('mbar-69-material');
    const mType = document.getElementById('mbar-69-type');
    const mCond = document.getElementById('mbar-69-conduct');
    const mStatus = document.getElementById('mbar-69-status');

    if (mMat) mMat.textContent = info.name;
    if (mType) mType.textContent = info.type;
    if (mCond) {
        mCond.textContent = info.isConductive ? "İletken Madde" : "Yalıtkan Madde";
        mCond.style.color = info.isConductive ? "#10b981" : "#ef4444";
    }

    if (mStatus) {
        if (info.isConductive) {
            mStatus.textContent = `💡 Devre Tamamlandı: ${info.name} Akımı İletir (Ampul Yanıyor)`;
            mStatus.style.borderColor = "#10b981";
            mStatus.style.color = "#10b981";
        } else {
            mStatus.textContent = `❌ Devre Açık Kaldı: ${info.name} Akımı İletmez (Yalıtkan)`;
            mStatus.style.borderColor = "#ef4444";
            mStatus.style.color = "#ef4444";
        }
    }

    // Sağ Panel Çipleri
    const pMat = document.getElementById('metric-69-material');
    const pType = document.getElementById('metric-69-type');
    const pCond = document.getElementById('metric-69-conduct');
    const pBulb = document.getElementById('metric-69-bulb');

    if (pMat) pMat.textContent = info.name;
    if (pType) pType.textContent = info.type;
    if (pCond) {
        pCond.textContent = info.isConductive ? "İletken" : "Yalıtkan";
        pCond.style.color = info.isConductive ? "#10b981" : "#ef4444";
    }
    if (pBulb) {
        pBulb.textContent = info.isConductive ? "Işık Veriyor 💡" : "Sönük (0) ❌";
        pBulb.style.color = info.isConductive ? "#facc15" : "#94a3b8";
    }

    // Dinamik Pedagojik Kutu
    const pTitle = document.getElementById('cond-pedagogical-title');
    const pText = document.getElementById('cond-pedagogical-text');
    if (pTitle && pText) {
        if (info.isLiquid) {
            pTitle.textContent = info.isConductive ? `🧂 ${info.name}: Sıvı İletken Çözelti` : `💧 ${info.name}: Sıvı Yalıtkan Çözelti`;
            pText.textContent = info.isConductive
                ? `${info.name} suda iyonlarına ayrışır (serbest + ve - yüklü iyonlar). Bu serbest iyonlar sayesinde elektrik akımı iletilir ve ampul ışık verir!`
                : `${info.name} suda iyonlarına ayrışmaz, moleküler olarak çözünür. Ortamda serbest yük taşıyıcı iyon bulunmadığı için elektrik akımını iletmez (Yalıtkandır).`;
        } else {
            pTitle.textContent = info.isConductive ? `⚡ ${info.name}: Katı İletken Madde` : `🪵 ${info.name}: Katı Yalıtkan Madde`;
            pText.textContent = info.isConductive
                ? `${info.name} yapısındaki serbest elektronlar sayesinde elektrik akımını iletir. Katı iletkenlerde elektrik enerjisi elektron hareketiyle taşınır!`
                : `${info.name} atomlarında elektronlar sıkı bağlıdır ve serbestçe hareket edemez. Devre uçları arasında akım geçişi sağlanamaz ve ampul yanmaz.`;
        }
    }
}

function setupConductivityControlsDOM() {
    const list = ["copper", "iron", "graphite", "wood", "plastic", "eraser", "saltwater", "sugarwater", "lemonwater", "purewater"];
    list.forEach(id => {
        const b = document.getElementById(`btn-cond-mat-${id}`);
        const p = document.getElementById(`pill-cond-${id}`);
        if (b) b.addEventListener('click', () => selectConductivityMaterial(id));
        if (p) p.addEventListener('click', () => selectConductivityMaterial(id));
    });

    const bReset = document.getElementById('btn-cond-reset');
    if (bReset) bReset.addEventListener('click', resetConductivityExperiment);

    const btnRec = document.getElementById('btn-record-data-6-9');
    if (btnRec) btnRec.addEventListener('click', recordMeasurement);
}

// Deney 6.9 Canvas Çizim Motoru (ZERO-CANVAS-TEXT)
function drawConductivitySimulation() {
    if (!ctx || !canvas) return;
    const w = 800;
    const h = 500;
    const cd = labState.conductivity;
    const info = CONDUCTIVITY_MATERIALS[cd.selectedMaterial] || CONDUCTIVITY_MATERIALS.copper;

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, "#0a0f1d");
    bgGrad.addColorStop(0.7, "#111c35");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Ahşap Deney Masası
    const benchY = 360;
    ctx.fillStyle = "#334155";
    ctx.fillRect(0, benchY, w, h - benchY);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, benchY);
    ctx.lineTo(w, benchY);
    ctx.stroke();

    // 1. Pil Yatağı ve Piller (Sol Üst: x: 180, y: 100)
    const px = 180;
    const py = 100;

    // Pil Yatağı Tabanı
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(px - 60, py - 20, 120, 40, 6);
    ctx.fill();
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.stroke();

    // 2 Adet AA Pil (Mavi/Kırmızı gövde)
    [-1, 1].forEach((dir, i) => {
        const bx = px + dir * 28;
        ctx.fillStyle = "#2563eb";
        ctx.fillRect(bx - 20, py - 14, 40, 28);
        ctx.fillStyle = "#ef4444"; // Artı kutup bandı
        ctx.fillRect(bx + 12, py - 14, 8, 28);
        ctx.fillStyle = "#cbd5e1"; // Artı kutup ucu
        ctx.fillRect(bx + 20, py - 6, 4, 12);
    });

    // 2. Akkor Ampul ve Duy (Sağ Üst: x: 620, y: 100)
    const bx = 620;
    const by = 100;

    // Duy Tabanı
    ctx.fillStyle = "#475569";
    ctx.fillRect(bx - 25, by + 10, 50, 18);
    ctx.fillStyle = "#64748b";
    ctx.fillRect(bx - 18, by + 2, 36, 8); // Vidalı soket

    // Ampul Yanma Halesi (İletken ise)
    if (cd.isConductive) {
        const glowR = 100 * cd.bulbBrightness;
        const bGlow = ctx.createRadialGradient(bx, by - 20, 8, bx, by - 20, glowR);
        bGlow.addColorStop(0, "rgba(254, 240, 138, 0.95)");
        bGlow.addColorStop(0.35, "rgba(250, 204, 21, 0.5)");
        bGlow.addColorStop(1, "rgba(250, 204, 21, 0)");
        ctx.fillStyle = bGlow;
        ctx.beginPath();
        ctx.arc(bx, by - 20, glowR, 0, Math.PI * 2);
        ctx.fill();
    }

    // Cam Ampul Küresi
    ctx.beginPath();
    ctx.arc(bx, by - 20, 26, 0, Math.PI * 2);
    ctx.fillStyle = cd.isConductive ? "rgba(254, 240, 138, 0.85)" : "rgba(255, 255, 255, 0.12)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Akkor Filament
    ctx.strokeStyle = cd.isConductive ? "#f97316" : "#64748b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx - 6, by - 10);
    ctx.lineTo(bx - 3, by - 25);
    ctx.lineTo(bx + 3, by - 25);
    ctx.lineTo(bx + 6, by - 10);
    ctx.stroke();

    // 3. Devre Kabloları (Pil -> Kıskaç 1, Ampul -> Kıskaç 2, Pil -> Ampul)
    // Üst Hat (Pil Artı Kutuuptan Ampule)
    ctx.strokeStyle = "#ef4444"; // Kırmızı kablo
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(px + 60, py);
    ctx.lineTo(bx - 25, py + 18);
    ctx.stroke();

    // Sol Hat (Pil Eksi Kutuptan Sol Kıskaca: x: 300, y: 310)
    const clip1X = 310;
    const clip1Y = 310;
    ctx.strokeStyle = "#3b82f6"; // Mavi kablo
    ctx.beginPath();
    ctx.moveTo(px - 60, py);
    ctx.quadraticCurveTo(px - 80, 260, clip1X - 35, clip1Y);
    ctx.stroke();

    // Sağ Hat (Ampulden Sağ Kıskaca: x: 490, y: 310)
    const clip2X = 490;
    const clip2Y = 310;
    ctx.strokeStyle = "#10b981"; // Yeşil kablo
    ctx.beginPath();
    ctx.moveTo(bx + 25, py + 18);
    ctx.quadraticCurveTo(bx + 60, 260, clip2X + 35, clip2Y);
    ctx.stroke();

    // Elektron Akışı Parçacıkları (İletkense)
    if (cd.isConductive) {
        cd.electronParticles.forEach(p => {
            // Basit döngüsel devre koordinatı
            let ex = 0;
            let ey = 0;
            const prog = p.progress;
            if (prog < 0.35) {
                // Üst hat
                ex = (px + 60) + (prog / 0.35) * (bx - 25 - (px + 60));
                ey = py;
            } else if (prog < 0.65) {
                // Sağ iniş
                const sub = (prog - 0.35) / 0.3;
                ex = (bx + 25) + sub * (clip2X - (bx + 25));
                ey = (py + 18) + sub * (clip2Y - (py + 18));
            } else {
                // Sol dönüş
                const sub = (prog - 0.65) / 0.35;
                ex = clip1X - sub * (clip1X - (px - 60));
                ey = clip1Y - sub * (clip1Y - py);
            }

            ctx.fillStyle = "#38bdf8";
            ctx.beginPath();
            ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // 4. Krokodil Kıskaçlar (Timsah Ağızları: clip1X, clip2X)
    [clip1X, clip2X].forEach((cx, idx) => {
        const isLeft = (idx === 0);
        ctx.save();
        ctx.translate(cx, clip1Y);
        if (!isLeft) ctx.scale(-1, 1);

        ctx.fillStyle = "#94a3b8";
        ctx.beginPath();
        ctx.moveTo(-35, -7);
        ctx.lineTo(-5, -7);
        ctx.lineTo(0, -3);
        ctx.lineTo(0, 3);
        ctx.lineTo(-5, 7);
        ctx.lineTo(-35, 7);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
    });

    // 5. TEST EDİLEN MADDE (Katı veya Sıvı Beher)
    if (info.isLiquid) {
        // Sıvı Beheri (Ortada: x: 400, y: 310)
        const bx = 400;
        const by = 350;

        // Cam Beher
        ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
        ctx.beginPath();
        ctx.roundRect(bx - 45, by - 70, 90, 70, [0, 0, 8, 8]);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Sıvı Çözelti
        ctx.fillStyle = info.color;
        ctx.beginPath();
        ctx.roundRect(bx - 43, by - 55, 86, 55, [0, 0, 6, 6]);
        ctx.fill();

        // Kıskaçlardan Sıvıya Daldırılan İki Elektrot
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(clip1X, clip1Y);
        ctx.lineTo(bx - 20, clip1Y);
        ctx.lineTo(bx - 20, by - 15);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(clip2X, clip1Y);
        ctx.lineTo(bx + 20, clip1Y);
        ctx.lineTo(bx + 20, by - 15);
        ctx.stroke();

        // İyon Parıltıları (İletkense)
        if (info.isConductive) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.beginPath();
            ctx.arc(bx - 12, by - 35, 3, 0, Math.PI * 2);
            ctx.arc(bx + 10, by - 25, 2.5, 0, Math.PI * 2);
            ctx.arc(bx, by - 40, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    } else {
        // Katı Madde (İki krokodil kıskaç arasına kenetlenmiş)
        const sx = clip1X;
        const ex = clip2X;
        const my = clip1Y;

        ctx.save();
        if (cd.selectedMaterial === "copper") {
            // Bakır Tel
            ctx.strokeStyle = "#f97316";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(sx, my);
            ctx.lineTo(ex, my);
            ctx.stroke();
        } else if (cd.selectedMaterial === "iron") {
            // Demir Çivi (Başlıklı sivri çivi)
            ctx.fillStyle = "#94a3b8";
            ctx.beginPath();
            ctx.moveTo(sx + 5, my - 7);
            ctx.lineTo(sx + 5, my + 7);
            ctx.lineTo(sx + 15, my + 3);
            ctx.lineTo(ex - 8, my + 3);
            ctx.lineTo(ex, my);
            ctx.lineTo(ex - 8, my - 3);
            ctx.lineTo(sx + 15, my - 3);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "#cbd5e1";
            ctx.lineWidth = 1;
            ctx.stroke();
        } else if (cd.selectedMaterial === "graphite") {
            // Grafit Kurşun Kalem Ucu
            ctx.fillStyle = "#334155";
            ctx.beginPath();
            ctx.roundRect(sx, my - 4, ex - sx, 8, 3);
            ctx.fill();
            ctx.strokeStyle = "#64748b";
            ctx.lineWidth = 1;
            ctx.stroke();
        } else if (cd.selectedMaterial === "wood") {
            // Ahşap Çubuk
            ctx.fillStyle = "#b45309";
            ctx.beginPath();
            ctx.roundRect(sx, my - 6, ex - sx, 12, 3);
            ctx.fill();
            ctx.strokeStyle = "#78350f";
            ctx.lineWidth = 1.2;
            ctx.stroke();
        } else if (cd.selectedMaterial === "plastic") {
            // Plastik Cetvel
            ctx.fillStyle = "rgba(59, 130, 246, 0.75)";
            ctx.beginPath();
            ctx.roundRect(sx, my - 7, ex - sx, 14, 2);
            ctx.fill();
            ctx.strokeStyle = "#2563eb";
            ctx.lineWidth = 1.2;
            ctx.stroke();
        } else if (cd.selectedMaterial === "eraser") {
            // Silgi
            ctx.fillStyle = "#f43f5e";
            ctx.beginPath();
            ctx.roundRect(sx, my - 9, ex - sx, 18, 4);
            ctx.fill();
            ctx.strokeStyle = "#be123c";
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }
        ctx.restore();
    }

    ctx.restore();
}

// ============================================================================
// --- 6.10. DENEY 6.10: DİRENÇ VE REOSTA SİMÜLATÖRÜ (FB.6.6.2 - FB.6.6.3) ---
// ============================================================================

function initResistanceState() {
    const res = labState.resistance;
    res.mode = "wire";
    res.wireLength = 10;
    res.wireThickness = "thick";
    res.wireMaterial = "copper";
    res.rheostatSlider = 20;
    res.totalResistanceLevel = "low";
    res.bulbBrightness = 0.9;
    res.electronParticles = [];
    res.isDraggingSlider = false;

    for (let i = 0; i < 24; i++) {
        res.electronParticles.push({
            progress: i / 24,
            speed: 0.007
        });
    }

    recalculateResistancePhysics();
    updateResistanceDOMControls();
    updateResistanceMetricsDOM();
}

function resetResistanceExperiment() {
    initResistanceState();
    showLabToast("Direnç ve reosta düzeneği sıfırlandı!");
}

function setResistanceMode(mode) {
    const res = labState.resistance;
    res.mode = mode;
    recalculateResistancePhysics();
    updateResistanceDOMControls();
    updateResistanceMetricsDOM();
    showLabToast(mode === "wire" ? "1. Mod: İletken Telin Faktörleri (Boy, Kesit, Cins)" : "2. Mod: Reosta ile Ayarlı Direnç");
}

function setWireLength(len) {
    const res = labState.resistance;
    res.wireLength = len;
    recalculateResistancePhysics();
    updateResistanceDOMControls();
    updateResistanceMetricsDOM();
}

function setWireThickness(thick) {
    const res = labState.resistance;
    res.wireThickness = thick;
    recalculateResistancePhysics();
    updateResistanceDOMControls();
    updateResistanceMetricsDOM();
}

function setWireMaterial(mat) {
    const res = labState.resistance;
    res.wireMaterial = mat;
    recalculateResistancePhysics();
    updateResistanceDOMControls();
    updateResistanceMetricsDOM();
}

function setRheostatSlider(pct) {
    const res = labState.resistance;
    res.rheostatSlider = Math.max(0, Math.min(100, pct));
    recalculateResistancePhysics();
    updateResistanceDOMControls();
    updateResistanceMetricsDOM();
}

function recalculateResistancePhysics() {
    const res = labState.resistance;

    if (res.mode === "wire") {
        // Nitel Formülsüz Direnç Puanı (1 ile 10 arası)
        // Boy: 10cm (1), 20cm (2), 30cm (3), 40cm (4)
        const lenScore = res.wireLength / 10;
        // Kesit: thin S (2.2), thick 2S (1.0)
        const thickMult = res.wireThickness === "thin" ? 2.2 : 1.0;
        // Cins: Bakır (1.0), Demir (2.0), Nikrom (3.2)
        const matMult = res.wireMaterial === "copper" ? 1.0 : (res.wireMaterial === "iron" ? 2.0 : 3.2);

        const score = lenScore * thickMult * matMult;

        if (score <= 1.5) {
            res.totalResistanceLevel = "very_low";
            res.bulbBrightness = 1.0;
        } else if (score <= 3.5) {
            res.totalResistanceLevel = "low";
            res.bulbBrightness = 0.82;
        } else if (score <= 7.0) {
            res.totalResistanceLevel = "medium";
            res.bulbBrightness = 0.6;
        } else if (score <= 14.0) {
            res.totalResistanceLevel = "high";
            res.bulbBrightness = 0.35;
        } else {
            res.totalResistanceLevel = "very_high";
            res.bulbBrightness = 0.15;
        }
    } else {
        // Reosta Modu (%0 ile %100 arası)
        // Sürgü sola (%0): direnç sıfıra yakın, ampul çok parlak
        // Sürgü sağa (%100): tam bobin direnci devrede, ampul çok sönük
        const pct = res.rheostatSlider;
        if (pct <= 15) {
            res.totalResistanceLevel = "very_low";
            res.bulbBrightness = 1.0;
        } else if (pct <= 35) {
            res.totalResistanceLevel = "low";
            res.bulbBrightness = 0.82;
        } else if (pct <= 65) {
            res.totalResistanceLevel = "medium";
            res.bulbBrightness = 0.58;
        } else if (pct <= 85) {
            res.totalResistanceLevel = "high";
            res.bulbBrightness = 0.35;
        } else {
            res.totalResistanceLevel = "very_high";
            res.bulbBrightness = 0.15;
        }
    }

    // Elektron akış hızını dirençle ters orantılı ayarla
    res.electronParticles.forEach(p => {
        p.speed = 0.002 + 0.009 * res.bulbBrightness;
    });
}

function updateResistancePhysics() {
    const res = labState.resistance;
    res.electronParticles.forEach(p => {
        p.progress += p.speed;
        if (p.progress > 1.0) p.progress -= 1.0;
    });
}

function updateResistanceDOMControls() {
    const res = labState.resistance;
    const isWire = (res.mode === "wire");

    // Mod Butonları (Hızlı Bar & Sağ Panel)
    const btnWire = document.getElementById('btn-res-mode-wire');
    const btnRheo = document.getElementById('btn-res-mode-rheostat');
    const pillWire = document.getElementById('pill-res-mode-wire');
    const pillRheo = document.getElementById('pill-res-mode-rheostat');
    if (btnWire) btnWire.classList.toggle('active', isWire);
    if (btnRheo) btnRheo.classList.toggle('active', !isWire);
    if (pillWire) pillWire.classList.toggle('active', isWire);
    if (pillRheo) pillRheo.classList.toggle('active', !isWire);

    // Sağ Panel Kontrol Kapsayıcıları
    const wrapWire = document.getElementById('wrap-res-wire-controls');
    const wrapRheo = document.getElementById('wrap-res-rheostat-controls');
    const groupPresets = document.getElementById('group-res-wire-presets');
    if (wrapWire) wrapWire.style.display = isWire ? "block" : "none";
    if (wrapRheo) wrapRheo.style.display = isWire ? "none" : "block";
    if (groupPresets) groupPresets.style.display = isWire ? "flex" : "none";

    // Tel Kontrolleri
    const sliderLen = document.getElementById('slider-res-length');
    const lblLen = document.getElementById('label-res-length-val');
    if (sliderLen) sliderLen.value = res.wireLength;
    if (lblLen) lblLen.textContent = `${res.wireLength} cm`;

    const pThin = document.getElementById('pill-res-thick-thin');
    const pThick = document.getElementById('pill-res-thick-thick');
    if (pThin) pThin.classList.toggle('active', res.wireThickness === "thin");
    if (pThick) pThick.classList.toggle('active', res.wireThickness === "thick");

    const pCopper = document.getElementById('pill-res-mat-copper');
    const pIron = document.getElementById('pill-res-mat-iron');
    const pNichrome = document.getElementById('pill-res-mat-nichrome');
    if (pCopper) pCopper.classList.toggle('active', res.wireMaterial === "copper");
    if (pIron) pIron.classList.toggle('active', res.wireMaterial === "iron");
    if (pNichrome) pNichrome.classList.toggle('active', res.wireMaterial === "nichrome");

    // Reosta Kontrolleri
    const sliderRheo = document.getElementById('slider-res-rheostat');
    const lblRheo = document.getElementById('label-res-rheostat-val');
    if (sliderRheo) sliderRheo.value = res.rheostatSlider;
    if (lblRheo) {
        let rheoText = res.rheostatSlider <= 25 ? "(Düşük Direnç)" : (res.rheostatSlider <= 65 ? "(Orta Direnç)" : "(Yüksek Direnç)");
        lblRheo.textContent = `%${res.rheostatSlider} ${rheoText}`;
    }
}

function updateResistanceMetricsDOM() {
    const res = labState.resistance;
    const isWire = (res.mode === "wire");

    // Metrik Şeridi (Canvas Altı)
    const mLen = document.getElementById('mbar-610-length');
    const mArea = document.getElementById('mbar-610-area');
    const mMat = document.getElementById('mbar-610-material');
    const mRes = document.getElementById('mbar-610-resistance');
    const mStatus = document.getElementById('mbar-610-status');

    if (mLen) mLen.textContent = isWire ? `${res.wireLength} cm` : `Etkin Boy: %${res.rheostatSlider}`;
    if (mArea) mArea.textContent = isWire ? (res.wireThickness === "thin" ? "İnce (S)" : "Kalın (2S)") : "Bobin Sargı";
    if (mMat) mMat.textContent = isWire ? (res.wireMaterial === "copper" ? "Bakır" : (res.wireMaterial === "iron" ? "Demir" : "Nikel-Krom")) : "Nikel-Krom";

    let resText = "";
    let brightText = "";
    if (res.totalResistanceLevel === "very_low") {
        resText = "Çok Düşük Direnç";
        brightText = "💡 Çok Parlak";
    } else if (res.totalResistanceLevel === "low") {
        resText = "Düşük Direnç";
        brightText = "💡 Parlak";
    } else if (res.totalResistanceLevel === "medium") {
        resText = "Orta Direnç";
        brightText = "💡 Normal Işık";
    } else if (res.totalResistanceLevel === "high") {
        resText = "Yüksek Direnç";
        brightText = "🕯️ Sönük";
    } else {
        resText = "Çok Yüksek Direnç";
        brightText = "🕯️ Çok Sönük";
    }

    if (mRes) mRes.textContent = resText;
    if (mStatus) {
        mStatus.textContent = `${brightText} (${resText})`;
        mStatus.style.borderColor = res.bulbBrightness > 0.7 ? "#10b981" : (res.bulbBrightness > 0.4 ? "#facc15" : "#f87171");
    }

    // Sağ Panel Çipleri
    const pLen = document.getElementById('metric-610-length');
    const pArea = document.getElementById('metric-610-area');
    const pRes = document.getElementById('metric-610-resistance');
    const pBright = document.getElementById('metric-610-brightness');

    if (pLen) pLen.textContent = isWire ? `${res.wireLength} cm` : `%${res.rheostatSlider}`;
    if (pArea) pArea.textContent = isWire ? (res.wireThickness === "thin" ? "İnce (S)" : "Kalın (2S)") : "Reosta";
    if (pRes) {
        pRes.textContent = resText;
        pRes.style.color = res.bulbBrightness > 0.7 ? "#10b981" : (res.bulbBrightness > 0.4 ? "#facc15" : "#f87171");
    }
    if (pBright) pBright.textContent = brightText;

    // Dinamik Pedagojik Kutu
    const pTitle = document.getElementById('res-pedagogical-title');
    const pText = document.getElementById('res-pedagogical-text');
    if (pTitle && pText) {
        if (isWire) {
            pTitle.textContent = "💡 İletkenin Direncini Etkileyen Faktörler";
            pText.textContent = "Telin boyu uzadıkça elektronların çarpışma sayısı artar ve DİRENÇ ARTAR (ampul sönükleşir). Tel kalınlaştıkça (kesit alanı büyüdükçe) geçiş kolaylaşır ve DİRENÇ AZALIR (ampul parlar). Bakır en az direnç gösteren maddedir.";
        } else {
            pTitle.textContent = "🎛️ Reosta: Ayarlanabilir Direnç";
            pText.textContent = "Reosta, devredeki telin uzunluğunu sürgü yardımıyla değiştirerek devre direncini ayarlayan araçtır. Sürgüyü sola kaydırdığınızda tel kısalır (direnç azalır, lamba parlar); sağa kaydırdığınızda tel uzar (direnç artar, lamba söner).";
        }
    }
}

function setupResistanceControlsDOM() {
    const btnWire = document.getElementById('btn-res-mode-wire');
    const btnRheo = document.getElementById('btn-res-mode-rheostat');
    const pillWire = document.getElementById('pill-res-mode-wire');
    const pillRheo = document.getElementById('pill-res-mode-rheostat');
    if (btnWire) btnWire.addEventListener('click', () => setResistanceMode("wire"));
    if (btnRheo) btnRheo.addEventListener('click', () => setResistanceMode("rheostat"));
    if (pillWire) pillWire.addEventListener('click', () => setResistanceMode("wire"));
    if (pillRheo) pillRheo.addEventListener('click', () => setResistanceMode("rheostat"));

    // Hızlı Preset Butonları
    const bShortThick = document.getElementById('btn-res-wire-short-thick');
    const bLongThin = document.getElementById('btn-res-wire-long-thin');
    if (bShortThick) {
        bShortThick.addEventListener('click', () => {
            setResistanceMode("wire");
            labState.resistance.wireLength = 10;
            labState.resistance.wireThickness = "thick";
            labState.resistance.wireMaterial = "copper";
            recalculateResistancePhysics();
            updateResistanceDOMControls();
            updateResistanceMetricsDOM();
            showLabToast("⚡ En Düşük Direnç Preset: Kısa, Kalın, Bakır Tel (Aşırı Parlak!)");
        });
    }
    if (bLongThin) {
        bLongThin.addEventListener('click', () => {
            setResistanceMode("wire");
            labState.resistance.wireLength = 40;
            labState.resistance.wireThickness = "thin";
            labState.resistance.wireMaterial = "nichrome";
            recalculateResistancePhysics();
            updateResistanceDOMControls();
            updateResistanceMetricsDOM();
            showLabToast("🕯️ En Yüksek Direnç Preset: Uzun, İnce, Nikel-Krom Tel (Çok Sönük!)");
        });
    }

    const sliderLen = document.getElementById('slider-res-length');
    if (sliderLen) {
        sliderLen.addEventListener('input', (e) => {
            setWireLength(parseInt(e.target.value, 10));
        });
    }

    const pThin = document.getElementById('pill-res-thick-thin');
    const pThick = document.getElementById('pill-res-thick-thick');
    if (pThin) pThin.addEventListener('click', () => setWireThickness("thin"));
    if (pThick) pThick.addEventListener('click', () => setWireThickness("thick"));

    const pCopper = document.getElementById('pill-res-mat-copper');
    const pIron = document.getElementById('pill-res-mat-iron');
    const pNichrome = document.getElementById('pill-res-mat-nichrome');
    if (pCopper) pCopper.addEventListener('click', () => setWireMaterial("copper"));
    if (pIron) pIron.addEventListener('click', () => setWireMaterial("iron"));
    if (pNichrome) pNichrome.addEventListener('click', () => setWireMaterial("nichrome"));

    const sliderRheo = document.getElementById('slider-res-rheostat');
    if (sliderRheo) {
        sliderRheo.addEventListener('input', (e) => {
            setRheostatSlider(parseInt(e.target.value, 10));
        });
    }

    const btnReset = document.getElementById('btn-res-reset');
    if (btnReset) btnReset.addEventListener('click', resetResistanceExperiment);

    const btnRec = document.getElementById('btn-record-data-6-10');
    if (btnRec) btnRec.addEventListener('click', recordMeasurement);
}

// Deney 6.10 Canvas Çizim Motoru (ZERO-CANVAS-TEXT)
function drawResistanceSimulation() {
    if (!ctx || !canvas) return;
    const w = 800;
    const h = 500;
    const res = labState.resistance;
    const isWire = (res.mode === "wire");

    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, "#080d1a");
    bgGrad.addColorStop(0.7, "#0f172a");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Zemin
    const benchY = 370;
    ctx.fillStyle = "#334155";
    ctx.fillRect(0, benchY, w, h - benchY);
    ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, benchY);
    ctx.lineTo(w, benchY);
    ctx.stroke();

    // 1. Pil Grubu (Sol Üst: x: 180, y: 100)
    const px = 180;
    const py = 100;

    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.roundRect(px - 55, py - 20, 110, 40, 6);
    ctx.fill();
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Piller
    [-1, 1].forEach((dir) => {
        const bx = px + dir * 26;
        ctx.fillStyle = "#2563eb";
        ctx.fillRect(bx - 18, py - 14, 36, 28);
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(bx + 10, py - 14, 8, 28);
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(bx + 18, py - 6, 4, 12);
    });

    // 2. Akkor Ampul (Sağ Üst: x: 620, y: 100)
    const bx = 620;
    const by = 100;

    // Duy Tabanı
    ctx.fillStyle = "#475569";
    ctx.fillRect(bx - 25, by + 10, 50, 18);
    ctx.fillStyle = "#64748b";
    ctx.fillRect(bx - 18, by + 2, 36, 8);

    // Parlama Halesi (Dirençle ters orantılı)
    const glowR = 110 * res.bulbBrightness;
    const bGlow = ctx.createRadialGradient(bx, by - 20, 8, bx, by - 20, glowR);
    bGlow.addColorStop(0, `rgba(254, 240, 138, ${res.bulbBrightness})`);
    bGlow.addColorStop(0.4, `rgba(250, 204, 21, ${res.bulbBrightness * 0.5})`);
    bGlow.addColorStop(1, "rgba(250, 204, 21, 0)");
    ctx.fillStyle = bGlow;
    ctx.beginPath();
    ctx.arc(bx, by - 20, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Cam Ampul Küresi
    ctx.beginPath();
    ctx.arc(bx, by - 20, 26, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(254, 240, 138, ${0.25 + res.bulbBrightness * 0.7})`;
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Akkor Filament
    ctx.strokeStyle = res.bulbBrightness > 0.4 ? "#f97316" : "#64748b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx - 6, by - 10);
    ctx.lineTo(bx - 3, by - 25);
    ctx.lineTo(bx + 3, by - 25);
    ctx.lineTo(bx + 6, by - 10);
    ctx.stroke();

    // 3. Devre Telleri (Pil -> Cihaz, Ampul -> Cihaz, Pil -> Ampul)
    ctx.strokeStyle = "#ef4444"; // Üst bağlantı teli
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(px + 55, py);
    ctx.lineTo(bx - 25, py + 18);
    ctx.stroke();

    // Elektron Parçacıkları Çizimi
    res.electronParticles.forEach(p => {
        let ex = 0;
        let ey = 0;
        const prog = p.progress;
        if (prog < 0.35) {
            ex = (px + 55) + (prog / 0.35) * (bx - 25 - (px + 55));
            ey = py;
        } else if (prog < 0.65) {
            const sub = (prog - 0.35) / 0.3;
            ex = (bx + 25) + sub * (550 - (bx + 25));
            ey = (py + 18) + sub * (260 - (py + 18));
        } else {
            const sub = (prog - 0.65) / 0.35;
            ex = 250 - sub * (250 - (px - 55));
            ey = 260 - sub * (260 - py);
        }

        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
        ctx.fill();
    });

    // 4. DÜZENEK ÇİZİMİ (Tel Faktörleri vs Reosta)
    if (isWire) {
        // --- MOD 1: TEL FAKTÖRLERİ TEST TABLASI ---
        const tx = 400;
        const ty = 280;
        const tableW = 420;
        const tableH = 80;

        // Ahşap Takoz / Tabla
        ctx.fillStyle = "#78350f";
        ctx.beginPath();
        ctx.roundRect(tx - tableW / 2, ty - 20, tableW, tableH, 8);
        ctx.fill();
        ctx.strokeStyle = "#451a03";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Cetvel Çizgileri (Ahşap üzerinde ölçek)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1;
        for (let cm = 0; cm <= 40; cm += 5) {
            const cx = (tx - tableW / 2 + 30) + (cm / 40) * (tableW - 60);
            const lineH = (cm % 10 === 0) ? 12 : 6;
            ctx.beginPath();
            ctx.moveTo(cx, ty + 38);
            ctx.lineTo(cx, ty + 38 - lineH);
            ctx.stroke();
        }

        // Sol Sabit Klemens (Pirinç klemens: x = tx - tableW/2 + 30 = 220)
        const k1X = tx - tableW / 2 + 30;
        const k1Y = ty;
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(k1X, k1Y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#92400e";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Sağ Hareketli Klemens (Boy ayarına göre: 10, 20, 30, 40 cm)
        const k2X = k1X + (res.wireLength / 40) * (tableW - 60);
        const k2Y = ty;
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(k2X, k2Y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#92400e";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Devre Kablo Bağlantıları
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(px - 55, py);
        ctx.lineTo(k1X - 5, k1Y);
        ctx.stroke();

        ctx.strokeStyle = "#10b981";
        ctx.beginPath();
        ctx.moveTo(bx + 25, py + 18);
        ctx.lineTo(k2X + 5, k2Y);
        ctx.stroke();

        // GERİLMİŞ İLETKEN TEL
        let wireColor = "#f97316"; // Bakır
        if (res.wireMaterial === "iron") wireColor = "#94a3b8"; // Demir
        else if (res.wireMaterial === "nichrome") wireColor = "#64748b"; // Nikel-Krom

        const wireThick = (res.wireThickness === "thin") ? 2.8 : 7.5;

        ctx.strokeStyle = wireColor;
        ctx.lineWidth = wireThick;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(k1X, k1Y);
        ctx.lineTo(k2X, k2Y);
        ctx.stroke();

    } else {
        // --- MOD 2: REOSTA (AYARLI DİRENÇ) SİMÜLASYONU ---
        const rx = 400;
        const ry = 280;
        const rheoW = 320;
        const rheoH = 65;

        // Seramik Silindir Gövde
        ctx.fillStyle = "#cbd5e1";
        ctx.beginPath();
        ctx.roundRect(rx - rheoW / 2, ry - rheoH / 2, rheoW, rheoH, 6);
        ctx.fill();
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Nikel-Krom Tel Bobin Sarımları (Dikey çizgiler)
        ctx.strokeStyle = "#64748b";
        ctx.lineWidth = 2;
        const coilStart = rx - rheoW / 2 + 10;
        const coilEnd = rx + rheoW / 2 - 10;
        for (let x = coilStart; x <= coilEnd; x += 6) {
            ctx.beginPath();
            ctx.moveTo(x, ry - rheoH / 2 + 4);
            ctx.lineTo(x, ry + rheoH / 2 - 4);
            ctx.stroke();
        }

        // Üst Metal Kılavuz Mili (Reosta Sürgüsünün Kaydığı Çubuk)
        const guideY = ry - rheoH / 2 - 16;
        ctx.fillStyle = "#94a3b8";
        ctx.fillRect(rx - rheoW / 2 - 10, guideY - 4, rheoW + 20, 8);
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1;
        ctx.strokeRect(rx - rheoW / 2 - 10, guideY - 4, rheoW + 20, 8);

        // Reosta Sol Sabit Klemensi
        const leftTermX = rx - rheoW / 2 - 10;
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(leftTermX, ry + 15, 8, 0, Math.PI * 2);
        ctx.fill();

        // Reosta Sağ Üst Klemensi (Sürgü miline bağlı)
        const rightTermX = rx + rheoW / 2 + 10;
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(rightTermX, guideY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Devre Kabloları
        ctx.strokeStyle = "#3b82f6";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(px - 55, py);
        ctx.lineTo(leftTermX, ry + 15);
        ctx.stroke();

        ctx.strokeStyle = "#10b981";
        ctx.beginPath();
        ctx.moveTo(bx + 25, py + 18);
        ctx.lineTo(rightTermX, guideY);
        ctx.stroke();

        // REOSTA SÜRGÜSÜ (KAYAR KONTAK)
        const sliderX = coilStart + (res.rheostatSlider / 100) * (coilEnd - coilStart);

        // Akım Geçen Kısım (Vurgu sarısı: coilStart ile sliderX arası)
        ctx.strokeStyle = "rgba(250, 204, 21, 0.75)";
        ctx.lineWidth = 3;
        for (let x = coilStart; x <= sliderX; x += 6) {
            ctx.beginPath();
            ctx.moveTo(x, ry - rheoH / 2 + 6);
            ctx.lineTo(x, ry + rheoH / 2 - 6);
            ctx.stroke();
        }

        // Sürgü Metalik Gövdesi & İletken Kontak Fırçası
        ctx.fillStyle = "#f59e0b";
        ctx.beginPath();
        ctx.roundRect(sliderX - 12, guideY - 14, 24, 46, 5);
        ctx.fill();
        ctx.strokeStyle = "#78350f";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Sürgü Tutma Kolu
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(sliderX, guideY - 18, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#991b1b";
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    ctx.restore();
}

// --- 6.4. DENEY 7.1: FİZİKSEL ANLAMDA İŞ (W = F · Δx) MOTORU ---

function setupWorkControlsDOM() {
    // 1. Senaryo Butonları (Hızlı Bar & Sağ Panel)
    const scenarios = ["horizontal", "lift", "carry", "wall"];
    scenarios.forEach(scen => {
        const btn = document.getElementById(`btn-scenario-${scen}`);
        const pill = document.getElementById(`pill-scenario-${scen}`);
        if (btn) btn.addEventListener('click', () => setWorkScenario(scen));
        if (pill) pill.addEventListener('click', () => setWorkScenario(scen));
    });

    // 2. Oynat / Duraklat Butonu
    const btnPlay = document.getElementById('btn-work-play-pause');
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            const work = labState.work;
            if (work.scenario === "wall") {
                showLabToast("🧱 Sabit duvar yer değiştirmez (Δx = 0 m)!");
                return;
            }
            if (work.scenario === "horizontal" && work.frictionEnabled && work.force <= 20) {
                showLabToast("⚠️ Uygulanan kuvvet sürtünme kuvvetini (20 N) yenemiyor!");
                return;
            }
            work.isPlaying = !work.isPlaying;
            if (work.isPlaying && work.progress >= 1.0) {
                work.progress = 0;
            }
            updateWorkPlayButton(work.isPlaying);
        });
    }

    // 3. Başa Al / Sıfırla Butonu
    const btnReset = document.getElementById('btn-work-reset');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            resetWorkMotion();
            showLabToast("🔄 Konum ve hareket başa alındı");
        });
    }

    // 4. Sürtünme Butonları (Yatay İtme için)
    const setFriction = (enabled) => {
        const work = labState.work;
        work.frictionEnabled = enabled;

        const btnFric = document.getElementById('btn-work-friction');
        const labelFric = document.getElementById('label-work-friction');
        if (btnFric) btnFric.classList.toggle('friction-active', enabled);
        if (labelFric) labelFric.textContent = enabled ? "Açık (20 N)" : "Kapalı";

        const pOff = document.getElementById('pill-work-friction-off');
        const pOn = document.getElementById('pill-work-friction-on');
        if (pOff) pOff.classList.toggle('active', !enabled);
        if (pOn) pOn.classList.toggle('active', enabled);

        calculateWorkPhysics();
        showLabToast(enabled ? "💨 Zemin Sürtünmesi Açık (fs = 20.0 N)" : "🛡️ Sürtünmesiz İdeal Zemin (fs = 0 N)");
    };

    const btnFric = document.getElementById('btn-work-friction');
    if (btnFric) btnFric.addEventListener('click', () => setFriction(!labState.work.frictionEnabled));

    const pOff = document.getElementById('pill-work-friction-off');
    if (pOff) pOff.addEventListener('click', () => setFriction(false));

    const pOn = document.getElementById('pill-work-friction-on');
    if (pOn) pOn.addEventListener('click', () => setFriction(true));

    // 5. Kuvvet Slider'ı (F)
    const forceRange = document.getElementById('lab-work-force-range');
    const forceDisplay = document.getElementById('lab-work-force-display');
    if (forceRange) {
        forceRange.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            labState.work.force = val;
            if (forceDisplay) forceDisplay.textContent = `${val.toFixed(0)} N`;
            calculateWorkPhysics();
        });
    }

    // 6. Yol / Yükseklik Slider'ı (Δx)
    const distRange = document.getElementById('lab-work-distance-range');
    const distDisplay = document.getElementById('lab-work-distance-display');
    if (distRange) {
        distRange.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            labState.work.distance = val;
            if (distDisplay) distDisplay.textContent = `${val.toFixed(1)} m`;
            calculateWorkPhysics();
        });
    }

    // 7. Gözlemi Kaydet Butonu
    const btnRecord = document.getElementById('btn-record-data-7-1');
    if (btnRecord) {
        btnRecord.addEventListener('click', recordMeasurement);
    }
}

function updateWorkPlayButton(isPlaying) {
    const btnPlay = document.getElementById('btn-work-play-pause');
    const labelPlay = document.getElementById('label-work-play');
    if (!btnPlay) return;
    if (isPlaying) {
        btnPlay.innerHTML = '<i class="fas fa-pause"></i> <span id="label-work-play">Duraklat</span>';
        btnPlay.classList.add('active');
        showLabToast("▶️ Canlandırma Başlatıldı");
    } else {
        btnPlay.innerHTML = '<i class="fas fa-play"></i> <span id="label-work-play">Hareketi Başlat</span>';
        btnPlay.classList.remove('active');
    }
}

function setWorkScenario(scenario) {
    const work = labState.work;
    work.scenario = scenario;
    work.isPlaying = false;
    work.progress = 0;
    work.currentDisplacement = 0;
    updateWorkPlayButton(false);

    // Buton aktifliklerini senkronize et
    ["horizontal", "lift", "carry", "wall"].forEach(s => {
        const b = document.getElementById(`btn-scenario-${s}`);
        const p = document.getElementById(`pill-scenario-${s}`);
        if (b) b.classList.toggle('active', s === scenario);
        if (p) p.classList.toggle('active', s === scenario);
    });

    // Slider ve Sürtünme etiketlerini güncelle
    const wrapDist = document.getElementById('wrap-work-distance');
    const labelDistTitle = document.getElementById('label-work-dist-title');
    const groupFriction = document.getElementById('group-friction-pills');
    const btnFric = document.getElementById('btn-work-friction');

    if (scenario === "wall") {
        if (wrapDist) wrapDist.style.display = 'none';
        if (groupFriction) groupFriction.style.display = 'none';
        if (btnFric) btnFric.style.display = 'none';
    } else {
        if (wrapDist) wrapDist.style.display = '';
        if (labelDistTitle) {
            labelDistTitle.textContent = (scenario === "lift") ? "Yükseklik (h)" : "Alınan Yol (Δx)";
        }
        if (scenario === "horizontal") {
            if (groupFriction) groupFriction.style.display = '';
            if (btnFric) btnFric.style.display = '';
        } else {
            if (groupFriction) groupFriction.style.display = 'none';
            if (btnFric) btnFric.style.display = 'none';
        }
    }

    calculateWorkPhysics();

    const titles = {
        horizontal: "📦 Senaryo 1: Kutuyu Yatay İtme",
        lift: "🏋️ Senaryo 2: Yerden Yukarı Kaldırma",
        carry: "🎒 Senaryo 3: Çantayla Yatay Yürüme",
        wall: "🧱 Senaryo 4: Sabit Duvarı İtme"
    };
    showLabToast(titles[scenario] || "Senaryo değiştirildi");
}

function resetWorkMotion() {
    const work = labState.work;
    work.isPlaying = false;
    work.progress = 0;
    work.currentDisplacement = 0;
    updateWorkPlayButton(false);
}

function resetWorkExperiment() {
    const work = labState.work;
    work.scenario = "horizontal";
    work.force = 40;
    work.distance = 5.0;
    work.frictionEnabled = false;
    work.isPlaying = false;
    work.progress = 0;
    work.currentDisplacement = 0;

    const forceRange = document.getElementById('lab-work-force-range');
    const forceDisplay = document.getElementById('lab-work-force-display');
    if (forceRange) forceRange.value = 40;
    if (forceDisplay) forceDisplay.textContent = "40 N";

    const distRange = document.getElementById('lab-work-distance-range');
    const distDisplay = document.getElementById('lab-work-distance-display');
    if (distRange) distRange.value = 5;
    if (distDisplay) distDisplay.textContent = "5.0 m";

    const btnFric = document.getElementById('btn-work-friction');
    const labelFric = document.getElementById('label-work-friction');
    if (btnFric) btnFric.classList.remove('friction-active');
    if (labelFric) labelFric.textContent = "Kapalı";

    setWorkScenario("horizontal");
    showLabToast("İş simülatörü sıfırlandı (Yatay İtme, 40 N, 5.0 m)");
}

function initWorkState() {
    calculateWorkPhysics();
    updateWorkPlayButton(labState.work.isPlaying);
}

function calculateWorkPhysics() {
    const work = labState.work;
    const F = work.force;
    const dx = work.distance;
    const scen = work.scenario;

    const box = document.getElementById('work-pedagogical-box');
    const icon = document.getElementById('work-pedagogical-icon');
    const title = document.getElementById('work-pedagogical-title');
    const text = document.getElementById('work-pedagogical-text');

    const mForce = document.getElementById('metric-work-force');
    const mDist = document.getElementById('metric-work-distance');
    const mAlign = document.getElementById('metric-work-alignment');
    const mNetForce = document.getElementById('metric-work-net-force');
    const mJoule = document.getElementById('metric-work-joule');

    if (mForce) mForce.textContent = `${F.toFixed(1)} N`;
    if (mDist) mDist.textContent = `${dx.toFixed(1)} m`;

    if (scen === "horizontal") {
        work.frictionForce = work.frictionEnabled ? 20.0 : 0.0;
        if (work.frictionEnabled) {
            if (F > work.frictionForce) {
                work.netForce = F - work.frictionForce;
                work.appliedWork = F * dx;
                work.netWork = work.netForce * dx;
                work.heatWork = work.frictionForce * dx;
                work.isWorkDone = true;
                work.alignment = "same";
                if (mNetForce) mNetForce.textContent = `Fnet = ${work.netForce.toFixed(1)} N (fs = 20 N)`;
                if (mAlign) {
                    mAlign.textContent = "Aynı Doğrultu (0°)";
                    mAlign.style.color = "#10b981";
                }
                if (mJoule) {
                    mJoule.textContent = `W = ${work.appliedWork.toFixed(1)} J (Net: ${work.netWork.toFixed(1)} J)`;
                    mJoule.style.color = "#10b981";
                }
                if (box) {
                    box.className = "lab-pedagogical-card is-work";
                    if (icon) icon.innerHTML = '<i class="fas fa-check-circle"></i>';
                    if (title) title.textContent = "✅ Net İş Yapıldı (Sürtünme Direncine Karşı)!";
                    if (text) text.textContent = `Uygulanan ${F.toFixed(1)} N kuvvet, zemin sürtünmesini (20.0 N) yenmiş ve sandığı ${dx.toFixed(1)} m hareket ettirmiştir. Uygulanan kuvvet W = ${work.appliedWork.toFixed(1)} J iş yapmış; net iş Wnet = ${work.netWork.toFixed(1)} J olmuştur.`;
                }
            } else {
                work.netForce = 0;
                work.appliedWork = 0;
                work.netWork = 0;
                work.heatWork = 0;
                work.isWorkDone = false;
                work.alignment = "zero";
                if (mNetForce) mNetForce.textContent = `Fnet = 0.0 N (F ≤ fs, Duruyor)`;
                if (mAlign) {
                    mAlign.textContent = "Hareketsiz (Δx = 0)";
                    mAlign.style.color = "#ef4444";
                }
                if (mJoule) {
                    mJoule.textContent = "W = 0.0 J (İş Yapılmadı)";
                    mJoule.style.color = "#ef4444";
                }
                if (box) {
                    box.className = "lab-pedagogical-card no-work";
                    if (icon) icon.innerHTML = '<i class="fas fa-times-circle"></i>';
                    if (title) title.textContent = "❌ Fiziksel Anlamda İş Yapılmadı (Kuvvet Yetersiz)!";
                    if (text) text.textContent = `Uygulanan ${F.toFixed(1)} N'luk kuvvet, 20.0 N olan statik sürtünme kuvvetini yenemediği için sandık hareket etmemiştir (Δx = 0 m). Cisim yer değiştirmediği için fiziksel anlamda iş yapılmaz (W = 0 Joule).`;
                }
            }
        } else {
            work.netForce = F;
            work.appliedWork = F * dx;
            work.netWork = work.appliedWork;
            work.heatWork = 0;
            work.isWorkDone = true;
            work.alignment = "same";
            if (mNetForce) mNetForce.textContent = `Fnet = ${F.toFixed(1)} N (Sürtünmesiz)`;
            if (mAlign) {
                mAlign.textContent = "Aynı Doğrultu (0°)";
                mAlign.style.color = "#10b981";
            }
            if (mJoule) {
                mJoule.textContent = `W = ${work.appliedWork.toFixed(1)} J (İş Yapıldı)`;
                mJoule.style.color = "#10b981";
            }
            if (box) {
                box.className = "lab-pedagogical-card is-work";
                if (icon) icon.innerHTML = '<i class="fas fa-check-circle"></i>';
                if (title) title.textContent = "✅ Fiziksel Anlamda İş Yapıldı!";
                if (text) text.textContent = `Uygulanan yatay kuvvet ile sandığın hareket doğrultusu aynıdır (yatay). Sandık uygulanan kuvvet yönünde ${dx.toFixed(1)} m yer değiştirdiği için ${work.appliedWork.toFixed(1)} Joule fiziksel iş yapılmıştır.`;
            }
        }
    } else if (scen === "lift") {
        work.frictionForce = 0;
        work.netForce = F;
        work.appliedWork = F * dx;
        work.netWork = work.appliedWork;
        work.heatWork = 0;
        work.isWorkDone = true;
        work.alignment = "lift";
        if (mNetForce) mNetForce.textContent = `F = ${F.toFixed(1)} N (Düşey Yukarı)`;
        if (mAlign) {
            mAlign.textContent = "Düşey Kaldırma (0°)";
            mAlign.style.color = "#10b981";
        }
        if (mJoule) {
            mJoule.textContent = `W = ${work.appliedWork.toFixed(1)} J (Yer Çekimine Karşı)`;
            mJoule.style.color = "#10b981";
        }
        if (box) {
            box.className = "lab-pedagogical-card is-work";
            if (icon) icon.innerHTML = '<i class="fas fa-check-circle"></i>';
            if (title) title.textContent = "✅ Yer Çekimine Karşı İş Yapıldı!";
            if (text) text.textContent = `Sandık düşey doğrultuda yukarı doğru ${dx.toFixed(1)} m yükseltilmiştir. Kuvvet ile hareket doğrultusu aynıdır (düşey). Yapılan ${work.appliedWork.toFixed(1)} Joule iş, cisimde çekim potansiyel enerjisi olarak depolanır!`;
        }
    } else if (scen === "carry") {
        work.frictionForce = 0;
        work.netForce = F;
        work.appliedWork = 0;
        work.netWork = 0;
        work.heatWork = 0;
        work.isWorkDone = false;
        work.alignment = "perpendicular";
        if (mNetForce) mNetForce.textContent = `F = ${F.toFixed(1)} N (Düşey Taşıma)`;
        if (mAlign) {
            mAlign.textContent = "Kuvvet ⟂ Hareket (90° Dik)";
            mAlign.style.color = "#ef4444";
        }
        if (mJoule) {
            mJoule.textContent = "W = 0.0 J (İş Yapılmaz!)";
            mJoule.style.color = "#ef4444";
        }
        if (box) {
            box.className = "lab-pedagogical-card no-work";
            if (icon) icon.innerHTML = '<i class="fas fa-times-circle"></i>';
            if (title) title.textContent = "❌ Fiziksel Anlamda İş Yapılmaz (Kuvvet ⟂ Hareket)!";
            if (text) text.textContent = `Öğrencinin çantayı taşımak için uyguladığı kuvvet DÜŞEY yukarı yönlüdür, ancak hareket YATAYDIR. Kuvvet doğrultusu ile hareket doğrultusu birbirine DİK (90°) olduğu için çanta üzerinde fiziksel anlamda iş yapılmaz (W = 0 Joule).`;
        }
    } else if (scen === "wall") {
        work.frictionForce = 0;
        work.netForce = F;
        work.appliedWork = 0;
        work.netWork = 0;
        work.heatWork = 0;
        work.isWorkDone = false;
        work.alignment = "zero";
        if (mDist) mDist.textContent = "0.0 m (Sabit)";
        if (mNetForce) mNetForce.textContent = `F = ${F.toFixed(1)} N (Sabit Duvar)`;
        if (mAlign) {
            mAlign.textContent = "Hareketsiz (Δx = 0 m)";
            mAlign.style.color = "#ef4444";
        }
        if (mJoule) {
            mJoule.textContent = "W = 0.0 J (İş Yapılmaz!)";
            mJoule.style.color = "#ef4444";
        }
        if (box) {
            box.className = "lab-pedagogical-card no-work";
            if (icon) icon.innerHTML = '<i class="fas fa-times-circle"></i>';
            if (title) title.textContent = "❌ Fiziksel Anlamda İş Yapılmaz (Δx = 0 m)!";
            if (text) text.textContent = `Sabit duvara ne kadar büyük bir kuvvetle (${F.toFixed(1)} N) yüklenilirse yüklenilsin, duvar hareket etmediği (yer değiştirmediği) için fiziksel anlamda iş yapılmış sayılmaz (W = 0 Joule). Yorulmak, fen anlamında iş değildir!`;
        }
    }
    updateWorkMetricsBar();
}

function updateWorkMetricsBar() {
    const work = labState.work;
    const mJoule = document.getElementById('mbar-work-joule');
    const mStatus = document.getElementById('mbar-work-status');
    const mForce = document.getElementById('mbar-work-force');
    const mDisp = document.getElementById('mbar-work-dist');

    const curD = work.currentDisplacement !== undefined ? work.currentDisplacement : (work.progress * work.distance);
    const actualWork = work.isWorkDone ? (work.appliedWork * (work.distance > 0 ? (curD / work.distance) : 0)) : 0.0;

    if (mJoule) {
        if (!work.isWorkDone) {
            mJoule.textContent = "0.0 J (İş Yok)";
            mJoule.style.color = "#ef4444";
        } else if (work.progress >= 1.0) {
            mJoule.textContent = `${work.appliedWork.toFixed(1)} J (Tamamlandı)`;
            mJoule.style.color = "#10b981";
        } else if (work.isPlaying) {
            mJoule.textContent = `${actualWork.toFixed(1)} J (Hedef: ${work.appliedWork.toFixed(0)} J)`;
            mJoule.style.color = "#38bdf8";
        } else {
            mJoule.textContent = `0.0 J (Hedef: ${work.appliedWork.toFixed(0)} J)`;
            mJoule.style.color = "#facc15";
        }
    }
    if (mStatus) {
        const textSpan = document.getElementById('mbar-work-status-text');
        const targetEl = textSpan || mStatus;
        if (work.isPlaying) {
            targetEl.textContent = `⏳ Hareket Ediyor (%${Math.round(work.progress * 100)})`;
            mStatus.style.color = "#38bdf8";
        } else if (!work.isWorkDone) {
            targetEl.textContent = "❌ İş Yapılmadı";
            mStatus.style.color = "#ef4444";
        } else if (work.progress >= 1.0) {
            targetEl.textContent = "✅ İş Yapıldı";
            mStatus.style.color = "#10b981";
        } else {
            targetEl.textContent = "🏁 Başlamaya Hazır (Oynatın)";
            mStatus.style.color = "#38bdf8";
        }
    }
    if (mForce) {
        mForce.textContent = `${work.force.toFixed(0)} N`;
    }
    if (mDisp) {
        mDisp.textContent = `${curD.toFixed(1)} m`;
    }
}

function updateWorkPhysics() {
    const work = labState.work;
    if (work.isPlaying) {
        if (work.scenario === "wall" || (work.scenario === "horizontal" && work.frictionEnabled && work.force <= 20)) {
            work.progress = 0;
            work.currentDisplacement = 0;
            work.isPlaying = false;
            updateWorkPlayButton(false);
            updateWorkMetricsBar();
            return;
        }

        work.progress += work.animSpeed;
        if (work.progress >= 1.0) {
            work.progress = 1.0;
            work.isPlaying = false;
            updateWorkPlayButton(false);
        }
        work.currentDisplacement = work.progress * work.distance;
    } else {
        work.currentDisplacement = work.progress * work.distance;
    }
    updateWorkMetricsBar();
}

// --- DENEY 7.1 CANVAS 2D ÇİZİM MOTORU ---

function drawWorkSimulation() {
    if (!ctx || !canvas) return;
    const work = labState.work;
    const w = canvas.width;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // 1. Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // 2. Sıfır Metin - Zero-Canvas-Text: HUD paneli canvas dışındaki HTML şeridine taşınmıştır

    // 3. Zemin Çizgisi ve Izgara
    const groundY = 390;
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(40, groundY);
    ctx.lineTo(760, groundY);
    ctx.stroke();

    // Zemin altı tarama deseni
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.35)';
    ctx.lineWidth = 1;
    for (let x = 40; x <= 760; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, groundY);
        ctx.lineTo(x - 10, groundY + 12);
        ctx.stroke();
    }

    // 4. Senaryoya Göre Çizim
    if (work.scenario === "horizontal") {
        drawWorkHorizontal(ctx, work, groundY);
    } else if (work.scenario === "lift") {
        drawWorkLift(ctx, work, groundY);
    } else if (work.scenario === "carry") {
        drawWorkCarry(ctx, work, groundY);
    } else if (work.scenario === "wall") {
        drawWorkWall(ctx, work, groundY);
    }

    ctx.restore();
}

function drawWorkHUD(ctx, work) {
    // Zero-Canvas-Text: HUD paneli canvas dışındaki HTML şeridine (#metrics-bar-7-1) taşınmıştır
}

function drawWorkHorizontal(ctx, work, groundY) {
    const x0 = 160;
    const meterScale = 50;

    // Metre cetveli çizimi (Zero-Canvas-Text: Çentik çizgileriyle görsel cetvel, değerler alt barda)
    for (let m = 0; m <= 10; m++) {
        const tx = x0 + m * meterScale;
        ctx.strokeStyle = (m % 2 === 0) ? 'rgba(56, 189, 248, 0.6)' : 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = (m % 2 === 0) ? 2 : 1.2;
        ctx.beginPath();
        ctx.moveTo(tx, groundY);
        ctx.lineTo(tx, groundY + (m % 2 === 0 ? 12 : 6));
        ctx.stroke();
    }

    const curDist = work.currentDisplacement;
    const curX = x0 + curDist * meterScale;
    const crateW = 64;
    const crateH = 64;
    const crateX = curX;
    const crateY = groundY - crateH;

    // Başlangıç hayalet izi
    if (curDist > 0.2) {
        ctx.save();
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(x0, groundY - crateH, crateW, crateH);
        ctx.restore();
    }

    // Karakter (İten Öğrenci)
    const charX = crateX - 44;
    drawWorkStudent(ctx, charX, groundY, "push", work.isPlaying ? animTime : 0, work.force);

    // Sandık
    drawWorkCrate(ctx, crateX, crateY, crateW, crateH);

    // Vektör Oku: Uygulanan Kuvvet (F)
    const arrowLen = 35 + (work.force * 0.8);
    drawWorkVectorArrow(
        ctx,
        crateX + crateW,
        crateY + crateH / 2,
        crateX + crateW + arrowLen,
        crateY + crateH / 2,
        '#ef4444',
        'F ➔',
        -14
    );

    // Vektör Oku: Sürtünme Kuvveti (fs)
    if (work.frictionEnabled) {
        drawWorkVectorArrow(
            ctx,
            crateX,
            groundY - 6,
            crateX - 45,
            groundY - 6,
            '#f59e0b',
            'fs ⬅',
            -12
        );
    }

    // Vektör Oku: Yer Değiştirme (Δx)
    if (curDist > 0.1) {
        drawWorkVectorArrow(
            ctx,
            x0,
            groundY + 36,
            curX,
            groundY + 36,
            '#06b6d4',
            'Δx ➔',
            16
        );
    }
}

function drawWorkLift(ctx, work, groundY) {
    const centerX = 400;
    const meterScale = 22; // 1m = 22px
    const rulerX = 230;

    // Düşey yükseklik cetveli
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rulerX, groundY);
    ctx.lineTo(rulerX, groundY - 240);
    ctx.stroke();

    for (let m = 0; m <= 10; m += 2) {
        const ry = groundY - m * meterScale;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(rulerX - 10, ry);
        ctx.lineTo(rulerX, ry);
        ctx.stroke();
    }

    const curH = work.currentDisplacement;
    const liftPx = curH * meterScale;
    const crateW = 64;
    const crateH = 64;
    const crateX = centerX - crateW / 2;
    const crateY = groundY - crateH - liftPx;

    // Başlangıç hayalet sandık (yerde)
    if (curH > 0.2) {
        ctx.save();
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(crateX, groundY - crateH, crateW, crateH);
        ctx.restore();
    }

    // Karakter (Kaldıran Öğrenci)
    drawWorkStudent(ctx, centerX, groundY, "lift", work.isPlaying ? animTime : 0, liftPx);

    // Sandık
    drawWorkCrate(ctx, crateX, crateY, crateW, crateH);

    // Vektör Oku: Kaldırma Kuvveti (F - Düşey Yukarı)
    const arrowLen = 35 + (work.force * 0.8);
    drawWorkVectorArrow(
        ctx,
        centerX,
        crateY,
        centerX,
        crateY - arrowLen,
        '#ef4444',
        'F ⬆',
        -10
    );

    // Vektör Oku: Yer Değiştirme / Yükseklik (h)
    if (curH > 0.1) {
        drawWorkVectorArrow(
            ctx,
            centerX + 65,
            groundY,
            centerX + 65,
            crateY + crateH,
            '#06b6d4',
            'h ⬆',
            12
        );
    }

    // Ağırlık / Yerçekimi Kuvveti Oku (G = 100 N aşağı)
    drawWorkVectorArrow(
        ctx,
        centerX,
        crateY + crateH,
        centerX,
        crateY + crateH + 40,
        '#64748b',
        'G ⬇',
        12
    );
}

function drawWorkCarry(ctx, work, groundY) {
    const x0 = 160;
    const meterScale = 50;

    // Metre cetveli çizimi (Zero-Canvas-Text: Çentik çizgileriyle görsel cetvel, değerler alt barda)
    for (let m = 0; m <= 10; m++) {
        const tx = x0 + m * meterScale;
        ctx.strokeStyle = (m % 2 === 0) ? 'rgba(56, 189, 248, 0.6)' : 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = (m % 2 === 0) ? 2 : 1.2;
        ctx.beginPath();
        ctx.moveTo(tx, groundY);
        ctx.lineTo(tx, groundY + (m % 2 === 0 ? 12 : 6));
        ctx.stroke();
    }

    const curDist = work.currentDisplacement;
    const curX = x0 + curDist * meterScale;

    // Karakter (Çantayla Yürüyen Öğrenci)
    drawWorkStudent(ctx, curX, groundY, "carry", work.isPlaying ? animTime : 0);

    // Çantanın Askı Noktası
    const bagHandX = curX + 18;
    const bagHandY = groundY - 60;

    // Vektör Oku: Çantayı Taşıma Kuvveti (F - Düşey Yukarı)
    drawWorkVectorArrow(
        ctx,
        bagHandX,
        bagHandY,
        bagHandX,
        bagHandY - 60,
        '#ef4444',
        'F ⬆',
        -10
    );

    // Vektör Oku: Yer Değiştirme (Δx - Yatay Sağa)
    if (curDist > 0.1) {
        drawWorkVectorArrow(
            ctx,
            x0,
            groundY + 36,
            curX,
            groundY + 36,
            '#06b6d4',
            'Δx ➔',
            16
        );
    }

    // DİK AÇI SEMBOLÜ (90° - Parlak neon dik köşe indikatörü)
    ctx.save();
    ctx.strokeStyle = '#facc15';
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 2.5;
    const sqSize = 14;
    ctx.beginPath();
    ctx.moveTo(bagHandX, bagHandY - sqSize);
    ctx.lineTo(bagHandX + sqSize, bagHandY - sqSize);
    ctx.lineTo(bagHandX + sqSize, bagHandY);
    ctx.stroke();

    // Küçük merkez noktası
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(bagHandX + sqSize / 2, bagHandY - sqSize / 2, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawWorkWall(ctx, work, groundY) {
    const wallX = 520;
    const wallW = 180;
    const wallY = 90;
    const wallH = groundY - wallY;

    // Sabit Tuğla Duvar
    drawWorkWallObstacle(ctx, wallX, wallY, wallW, wallH);

    // Karakter (Duvarı İten Öğrenci)
    const charX = wallX - 40;
    drawWorkStudent(ctx, charX, groundY, "wall", work.isPlaying ? animTime : 0, work.force);

    // Vektör Oku: Duvara Uygulanan Kuvvet (F)
    const arrowLen = 35 + (work.force * 0.8);
    drawWorkVectorArrow(
        ctx,
        charX + 30,
        groundY - 70,
        charX + 30 + arrowLen,
        groundY - 70,
        '#ef4444',
        'F ➔',
        -12
    );
}

function drawWorkVectorArrow(ctx, fromX, fromY, toX, toY, color, label, labelOffset = -12) {
    ctx.save();
    const headLen = 10;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 4) {
        ctx.restore();
        return;
    }

    ctx.strokeStyle = color;
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;

    // Ok gövdesi
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Ok başı
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    // Zero-Canvas-Text: Vektör oku yalın ve keskin çizilir; yön ve büyüklük alt metrik şeridinde (#metrics-bar-7-1) gösterilir.
    ctx.restore();
}

function drawWorkStudent(ctx, x, y, pose, anim, extraOffset = 0) {
    ctx.save();

    // Renk paleti (Modern stilize bilim üniforması / laboratuvar önlüğü)
    const skinColor = '#fed7aa';
    const hairColor = '#1e293b';
    const coatColor = '#f8fafc'; // Beyaz laboratuvar önlüğü
    const shirtColor = coatColor;
    const shirtTrim = '#0284c7'; // Cyan yaka/ayrıntı
    const pantsColor = '#1e293b'; // Koyu lacivert pantolon
    const shoeColor = '#0f172a';

    if (pose === "push") {
        // İtme Pozu (Kuvvete göre ölçeklenen eğim ve patinaj tozu)
        ctx.save();
        ctx.translate(x, y);

        const force = (typeof extraOffset === 'number' && extraOffset > 0) ? extraOffset : 50;
        const leanFactor = Math.max(0, Math.min(1, (force - 20) / 80)); // 0 (az eğik) -> 1 (maksimum eforla eğik)
        const leanOffset = leanFactor * 8;

        // Patinaj toz efektleri (hareket halindeyse)
        if (anim > 0) {
            ctx.strokeStyle = 'rgba(203, 213, 225, 0.45)';
            ctx.lineWidth = 1.5;
            for (let d = 0; d < 3; d++) {
                const sx = -30 - d * 7 - ((anim * 18 + d * 5) % 12);
                const sy = -2 - (d % 2) * 3;
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx - 5, sy);
                ctx.stroke();
            }
        }

        // Bacaklar
        ctx.strokeStyle = pantsColor;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        // Sol bacak (önde bükülü)
        ctx.beginPath();
        ctx.moveTo(-4 + leanOffset * 0.4, -40);
        ctx.lineTo(16 + leanOffset * 0.5, -20);
        ctx.lineTo(20, 0);
        ctx.stroke();
        // Sağ bacak (arkada gergin)
        ctx.beginPath();
        ctx.moveTo(-10 + leanOffset * 0.2, -40);
        ctx.lineTo(-24, -18);
        ctx.lineTo(-28 - leanOffset * 0.5, 0);
        ctx.stroke();

        // Ayakkabılar
        ctx.fillStyle = shoeColor;
        ctx.beginPath();
        ctx.roundRect(14, -5, 16, 5, 2);
        ctx.roundRect(-34 - leanOffset * 0.5, -5, 14, 5, 2);
        ctx.fill();

        // Gövde (kuvvete göre dinamik eğik)
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(-6 + leanOffset * 0.3, -42);
        ctx.lineTo(10 + leanOffset, -72);
        ctx.stroke();

        // Kollar (sandığa dayalı)
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(8 + leanOffset, -68);
        ctx.lineTo(36, -58);
        ctx.stroke();
        // Eller
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(38, -58, 4, 0, Math.PI * 2);
        ctx.fill();

        // Baş
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(16 + leanOffset * 1.1, -84, 10, 0, Math.PI * 2);
        ctx.fill();

        // Saç
        ctx.fillStyle = hairColor;
        ctx.beginPath();
        ctx.arc(15 + leanOffset * 1.1, -87, 10, Math.PI * 0.8, Math.PI * 2.1);
        ctx.fill();

        ctx.restore();
    } else if (pose === "lift") {
        // Kaldırma Pozu (Dinamik Çömelmeden Doğrulma Kinematiği)
        ctx.save();
        ctx.translate(x, y);

        const liftPx = Math.max(0, extraOffset);
        // Çömelme faktörü: liftPx = 0 iken 1 (tam çömelmiş), liftPx >= 85 iken 0 (tam ayakta)
        const squatFactor = Math.max(0, Math.min(1, 1 - (liftPx / 85)));
        const squatY = squatFactor * 22; // Aşağı çökme miktarı

        const hipY = -45 + squatY;
        const kneeOut = squatFactor * 10;

        // Bacaklar (çömelirken dizler bükülür, kalkarken düzelir)
        ctx.strokeStyle = pantsColor;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';

        ctx.beginPath();
        if (squatFactor > 0.05) {
            // Çömelmiş dizler
            ctx.moveTo(-10, hipY);
            ctx.lineTo(-18 - kneeOut, hipY + 12);
            ctx.lineTo(-14, 0);

            ctx.moveTo(10, hipY);
            ctx.lineTo(18 + kneeOut, hipY + 12);
            ctx.lineTo(14, 0);
        } else {
            // Dik duruş
            ctx.moveTo(-12, -45);
            ctx.lineTo(-14, 0);
            ctx.moveTo(12, -45);
            ctx.lineTo(14, 0);
        }
        ctx.stroke();

        // Ayakkabılar
        ctx.fillStyle = shoeColor;
        ctx.beginPath();
        ctx.roundRect(-20, -5, 16, 5, 2);
        ctx.roundRect(8, -5, 16, 5, 2);
        ctx.fill();

        // Gövde
        const shoulderY = -80 + squatY * 0.8;
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.moveTo(0, hipY);
        ctx.lineTo(0, shoulderY);
        ctx.stroke();

        // Kollar (sandık yerdeyken altta tutar, yükseldikçe yukarı kaldırır)
        let handY;
        if (liftPx < 50) {
            handY = shoulderY + 22 - (liftPx * 0.4);
        } else {
            handY = -80 - (liftPx - 50) * 0.7;
        }

        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-6, shoulderY + 5);
        ctx.lineTo(-24, handY);
        ctx.moveTo(6, shoulderY + 5);
        ctx.lineTo(24, handY);
        ctx.stroke();

        // Eller
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(-24, handY, 4, 0, Math.PI * 2);
        ctx.arc(24, handY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Baş
        const headY = shoulderY - 14;
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(0, headY, 10, 0, Math.PI * 2);
        ctx.fill();

        // Saç
        ctx.fillStyle = hairColor;
        ctx.beginPath();
        ctx.arc(0, headY - 3, 10, Math.PI * 0.8, Math.PI * 2.2);
        ctx.fill();

        ctx.restore();
    } else if (pose === "carry") {
        // Çantayla Yürüme Pozu
        ctx.save();
        ctx.translate(x, y);

        const legSwing = Math.sin(anim * 8) * 12;

        // Bacaklar (adım atma animasyonu)
        ctx.strokeStyle = pantsColor;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-4, -45);
        ctx.lineTo(-4 + legSwing, 0);
        ctx.moveTo(4, -45);
        ctx.lineTo(4 - legSwing, 0);
        ctx.stroke();

        // Ayakkabılar
        ctx.fillStyle = shoeColor;
        ctx.beginPath();
        ctx.roundRect(-10 + legSwing, -5, 15, 5, 2);
        ctx.roundRect(0 - legSwing, -5, 15, 5, 2);
        ctx.fill();

        // Gövde (dik)
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.moveTo(0, -45);
        ctx.lineTo(0, -80);
        ctx.stroke();

        // Sağ Kol (çantayı tutuyor)
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(6, -75);
        ctx.lineTo(18, -48);
        ctx.stroke();

        // El
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(18, -48, 4, 0, Math.PI * 2);
        ctx.fill();

        // Okul Çantası (Sırt / El çantası)
        ctx.fillStyle = '#7c3aed';
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(10, -45, 24, 30, 4);
        ctx.fill();
        ctx.stroke();

        // Çanta askısı
        ctx.strokeStyle = '#c4b5fd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(14, -45);
        ctx.lineTo(18, -48);
        ctx.lineTo(26, -45);
        ctx.stroke();

        // Çanta logosu/çizgisi
        ctx.fillStyle = '#facc15';
        ctx.fillRect(14, -34, 16, 4);

        // Baş
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(0, -94, 10, 0, Math.PI * 2);
        ctx.fill();

        // Saç
        ctx.fillStyle = hairColor;
        ctx.beginPath();
        ctx.arc(0, -97, 10, Math.PI * 0.8, Math.PI * 2.2);
        ctx.fill();

        ctx.restore();
    } else if (pose === "wall") {
        // Sabit Duvarı İtme Pozu (Büyük efor, hafif titreme animasyonu)
        ctx.save();
        const tremble = (anim > 0) ? Math.sin(anim * 16) * 0.8 : 0;
        ctx.translate(x + tremble, y);

        // Bacaklar (duvara karşı sert dayalı)
        ctx.strokeStyle = pantsColor;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(4, -40);
        ctx.lineTo(18, -20);
        ctx.lineTo(22, 0);
        ctx.moveTo(-6, -40);
        ctx.lineTo(-26, -18);
        ctx.lineTo(-32, 0);
        ctx.stroke();

        // Ayakkabılar
        ctx.fillStyle = shoeColor;
        ctx.beginPath();
        ctx.roundRect(16, -5, 16, 5, 2);
        ctx.roundRect(-38, -5, 15, 5, 2);
        ctx.fill();

        // Gövde (duvara doğru aşırı eğik)
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 15;
        ctx.beginPath();
        ctx.moveTo(-2, -42);
        ctx.lineTo(20, -72);
        ctx.stroke();

        // Kollar (duvara dayalı)
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(18, -68);
        ctx.lineTo(44, -58);
        ctx.stroke();

        // Eller
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(46, -58, 4, 0, Math.PI * 2);
        ctx.fill();

        // Baş
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(26, -84, 10, 0, Math.PI * 2);
        ctx.fill();

        // Saç
        ctx.fillStyle = hairColor;
        ctx.beginPath();
        ctx.arc(25, -87, 10, Math.PI * 0.8, Math.PI * 2.1);
        ctx.fill();

        // Ter damlası animasyonu
        const sweatY = -86 - (Math.sin(anim * 6) * 3);
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(10, sweatY, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    ctx.restore();
}

function drawWorkCrate(ctx, x, y, w, h) {
    ctx.save();

    // 1. Zengin Ahşap Sandık Gövdesi
    const woodGrad = ctx.createLinearGradient(x, y, x, y + h);
    woodGrad.addColorStop(0, '#b45309');
    woodGrad.addColorStop(0.5, '#92400e');
    woodGrad.addColorStop(1, '#78350f');
    ctx.fillStyle = woodGrad;
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 6);
    ctx.fill();
    ctx.stroke();

    // 2. Yatay Ahşap Tahta Şeritleri (Planks)
    ctx.strokeStyle = 'rgba(69, 26, 3, 0.7)';
    ctx.lineWidth = 1.8;
    for (let i = 1; i < 3; i++) {
        const py = y + (h * (i / 3));
        ctx.beginPath();
        ctx.moveTo(x + 2, py);
        ctx.lineTo(x + w - 2, py);
        ctx.stroke();
    }

    // 3. Çapraz Ahşap Destek Kirişi
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.45)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 8);
    ctx.lineTo(x + w - 8, y + h - 8);
    ctx.stroke();

    // 4. Fırçalanmış Çelik Köşe Braketleri (Brackets)
    const bracketSize = 14;
    ctx.fillStyle = '#64748b';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    [
        [x, y],
        [x + w - bracketSize, y],
        [x, y + h - bracketSize],
        [x + w - bracketSize, y + h - bracketSize]
    ].forEach(([bx, by]) => {
        ctx.fillRect(bx, by, bracketSize, bracketSize);
        ctx.strokeRect(bx, by, bracketSize, bracketSize);

        // Perçin vidası (Rivet)
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.arc(bx + bracketSize / 2, by + bracketSize / 2, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#64748b';
    });

    // 5. Yan Metal Taşıma Kulpu (Handle)
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(x + w / 2 - 12, y + h / 2 - 5, 24, 10, 3);
    ctx.stroke();

    // Zero-Canvas-Text: "10 kg" yazısı kaldırıldı, net değer paneldedir.
    ctx.restore();
}

function drawWorkWallObstacle(ctx, x, y, w, h) {
    ctx.save();

    // Beton arka plan
    ctx.fillStyle = '#334155';
    ctx.fillRect(x, y, w, h);

    // Tuğla örgü deseni
    const brickH = 22;
    const brickW = 44;
    const rows = Math.floor(h / brickH);

    for (let r = 0; r < rows; r++) {
        const by = y + r * brickH;
        const offset = (r % 2 === 0) ? 0 : -brickW / 2;
        for (let bx = x + offset; bx < x + w; bx += brickW + 3) {
            const rx = Math.max(x, bx);
            const rw = Math.min(x + w - rx, (bx + brickW) - rx);
            if (rw > 2) {
                ctx.fillStyle = (r % 3 === 0) ? '#991b1b' : (r % 3 === 1) ? '#b91c1c' : '#7f1d1d';
                ctx.fillRect(rx, by + 2, rw, brickH - 3);
            }
        }
    }

    // Sol duvar kenar zırhı
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + h);
    ctx.stroke();

    ctx.restore();
}

// --- 6.5. DENEY 7.2: MEKANİK ENERJİ DÖNÜŞÜMÜ (SARKAÇ VE RAMPA) MOTORU ---

function setupEnergyControlsDOM() {
    // 1. Simülasyon Modu Seçimi (Sarkaç / Rampa)
    const bPend = document.getElementById('btn-mode-pendulum');
    const pPend = document.getElementById('pill-energy-pendulum');
    if (bPend) bPend.addEventListener('click', () => setEnergyMode("pendulum"));
    if (pPend) pPend.addEventListener('click', () => setEnergyMode("pendulum"));

    const bRamp = document.getElementById('btn-mode-ramp');
    const pRamp = document.getElementById('pill-energy-ramp');
    if (bRamp) bRamp.addEventListener('click', () => setEnergyMode("ramp"));
    if (pRamp) pRamp.addEventListener('click', () => setEnergyMode("ramp"));

    // 2. Oynat / Duraklat Butonu
    const btnPlay = document.getElementById('btn-energy-play-pause');
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            const energy = labState.energy;
            energy.isPlaying = !energy.isPlaying;
            if (energy.isPlaying) {
                btnPlay.innerHTML = '<i class="fas fa-pause"></i> <span id="label-energy-play">Duraklat</span>';
                btnPlay.classList.add('active');
                showLabToast("▶️ Simülasyon Devam Ediyor");
            } else {
                btnPlay.innerHTML = '<i class="fas fa-play"></i> <span id="label-energy-play">Oynat</span>';
                btnPlay.classList.remove('active');
                showLabToast("⏸️ Simülasyon Duraklatıldı");
            }
        });
    }

    // 3. Yavaş Çekim (0.5x) Butonu
    const btnSlow = document.getElementById('btn-energy-slowmo');
    if (btnSlow) {
        btnSlow.addEventListener('click', () => {
            const energy = labState.energy;
            energy.isSlowMo = !energy.isSlowMo;
            btnSlow.classList.toggle('slowmo-active', energy.isSlowMo);
            showLabToast(energy.isSlowMo ? "🐢 0.5x Yavaş Çekim Modu Açık" : "⚡ Normal Hız Modu (1.0x)");
        });
    }

    // 4. Sürtünme / Hava Direnci Butonları
    const setFriction = (enabled) => {
        const energy = labState.energy;
        energy.frictionEnabled = enabled;

        const btnFric = document.getElementById('btn-energy-friction');
        const labelFric = document.getElementById('label-energy-friction');
        if (btnFric) btnFric.classList.toggle('friction-active', enabled);
        if (labelFric) labelFric.textContent = enabled ? "Açık" : "Kapalı";

        const pOff = document.getElementById('pill-energy-friction-off');
        const pOn = document.getElementById('pill-energy-friction-on');
        if (pOff) pOff.classList.toggle('active', !enabled);
        if (pOn) pOn.classList.toggle('active', enabled);

        calculateEnergyInstantValues();
        showLabToast(enabled ? "💨 Sürtünme ve Hava Direnci Açık (Isı Kaybı Var)" : "🛡️ Sürtünme Kapatıldı (İdeal Mekanik Korunum)");
    };

    const btnFric = document.getElementById('btn-energy-friction');
    if (btnFric) btnFric.addEventListener('click', () => setFriction(!labState.energy.frictionEnabled));

    const pOff = document.getElementById('pill-energy-friction-off');
    if (pOff) pOff.addEventListener('click', () => setFriction(false));

    const pOn = document.getElementById('pill-energy-friction-on');
    if (pOn) pOn.addEventListener('click', () => setFriction(true));

    // 5. Yeniden Bırak Butonu
    const btnRestart = document.getElementById('btn-energy-restart');
    if (btnRestart) {
        btnRestart.addEventListener('click', () => {
            resetEnergyMotion();
            showLabToast("🔄 Cisim başlangıç yüksekliğine alındı ve serbest bırakıldı");
        });
    }

    // 6. Kütle Slider'ı (m)
    const massRange = document.getElementById('lab-energy-mass-range');
    const massDisplay = document.getElementById('lab-energy-mass-display');
    if (massRange) {
        massRange.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            labState.energy.mass = val;
            if (massDisplay) massDisplay.textContent = `${val.toFixed(1)} kg`;
            calculateEnergyInstantValues();
        });
    }

    // 7. Bırakma Açısı / Yükseklik Slider'ı (θ)
    const angleRange = document.getElementById('lab-energy-angle-range');
    const angleDisplay = document.getElementById('lab-energy-angle-display');
    if (angleRange) {
        angleRange.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            labState.energy.releaseAngle = val;
            if (angleDisplay) angleDisplay.textContent = `${val}°`;
            resetEnergyMotion();
        });
    }

    // 8. Veri Kaydet Butonu (Deney 7.2)
    const btnRecord72 = document.getElementById('btn-record-data-7-2');
    if (btnRecord72) btnRecord72.addEventListener('click', recordMeasurement);
}

function setEnergyMode(mode) {
    const energy = labState.energy;
    energy.mode = mode;
    const isPendulum = (mode === "pendulum");

    ['btn-mode-pendulum', 'pill-energy-pendulum'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', isPendulum);
    });
    ['btn-mode-ramp', 'pill-energy-ramp'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', !isPendulum);
    });

    resetEnergyMotion();
    showLabToast(isPendulum ? "🔄 Sarkaç Modu Seçildi" : "🛹 U-Rampa Modu Seçildi");
}

function resetEnergyMotion() {
    const energy = labState.energy;
    const rad = energy.releaseAngle * (Math.PI / 180);
    energy.pendulum.angle = rad;
    energy.pendulum.omega = 0;
    energy.ramp.angle = rad;
    energy.ramp.omega = 0;
    energy.heatEnergy = 0;
    energy.isPlaying = true;

    const btnPlay = document.getElementById('btn-energy-play-pause');
    if (btnPlay) {
        btnPlay.innerHTML = '<i class="fas fa-pause"></i> <span id="label-energy-play">Duraklat</span>';
        btnPlay.classList.add('active');
    }

    calculateEnergyInstantValues();
}

function initEnergyState() {
    const energy = labState.energy;
    energy.isPlaying = true;
    energy.isSlowMo = false;
    energy.frictionEnabled = false;
    energy.mass = 2.0;
    energy.releaseAngle = 45;
    energy.heatEnergy = 0;

    const rad = 45 * (Math.PI / 180);
    energy.pendulum.angle = rad;
    energy.pendulum.omega = 0;
    energy.ramp.angle = rad;
    energy.ramp.omega = 0;

    // Arayüz Kontrollerini Eşitle
    const massRange = document.getElementById('lab-energy-mass-range');
    const massDisplay = document.getElementById('lab-energy-mass-display');
    if (massRange) massRange.value = 2.0;
    if (massDisplay) massDisplay.textContent = "2.0 kg";

    const angleRange = document.getElementById('lab-energy-angle-range');
    const angleDisplay = document.getElementById('lab-energy-angle-display');
    if (angleRange) angleRange.value = 45;
    if (angleDisplay) angleDisplay.textContent = "45°";

    const btnPlay = document.getElementById('btn-energy-play-pause');
    if (btnPlay) {
        btnPlay.innerHTML = '<i class="fas fa-pause"></i> <span id="label-energy-play">Duraklat</span>';
        btnPlay.classList.add('active');
    }

    const btnSlow = document.getElementById('btn-energy-slowmo');
    if (btnSlow) btnSlow.classList.remove('slowmo-active');

    const btnFric = document.getElementById('btn-energy-friction');
    const labelFric = document.getElementById('label-energy-friction');
    if (btnFric) btnFric.classList.remove('friction-active');
    if (labelFric) labelFric.textContent = "Kapalı";

    const pOff = document.getElementById('pill-energy-friction-off');
    const pOn = document.getElementById('pill-energy-friction-on');
    if (pOff) pOff.classList.add('active');
    if (pOn) pOn.classList.remove('active');

    ['btn-mode-pendulum', 'pill-energy-pendulum'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', energy.mode === "pendulum");
    });
    ['btn-mode-ramp', 'pill-energy-ramp'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', energy.mode === "ramp");
    });

    calculateEnergyInstantValues();
}

function resetEnergyExperiment() {
    initEnergyState();
    showLabToast("Mekanik enerji simülasyonu sıfırlandı (2 kg, 45°)");
}

function calculateEnergyInstantValues() {
    const energy = labState.energy;
    const isPendulum = (energy.mode === "pendulum");

    const radius = isPendulum ? energy.pendulum.length : energy.ramp.radius;
    const curAngle = isPendulum ? energy.pendulum.angle : energy.ramp.angle;
    const omega = isPendulum ? energy.pendulum.omega : energy.ramp.omega;

    const relRad = energy.releaseAngle * (Math.PI / 180);
    const hRel = radius * (1 - Math.cos(relRad));
    const hCur = radius * (1 - Math.cos(curAngle));

    const m = energy.mass;
    const g = energy.gravity;

    const E_initial = m * g * hRel;
    energy.initialTotalEnergy = E_initial;

    const Ep = m * g * Math.max(0, hCur);

    if (!energy.frictionEnabled) {
        energy.totalEnergy = E_initial;
        energy.heatEnergy = 0;
        const Ek = Math.max(0, E_initial - Ep);
        const v = Math.sqrt(Math.max(0, (2 * Ek) / m));

        energy.currentHeight = hCur;
        energy.currentSpeed = v;
        energy.potentialEnergy = Ep;
        energy.kineticEnergy = Ek;
    } else {
        const vRaw = Math.abs(radius * omega);
        const EkRaw = 0.5 * m * (vRaw * vRaw);
        const EmekRaw = Ep + EkRaw;

        // Isı enerjisi geri dönüşsüzdür (Termodinamiğin 2. Yasası uyarınca monoton artar)
        const currentLoss = Math.max(0, E_initial - EmekRaw);
        energy.heatEnergy = Math.max(energy.heatEnergy, Math.min(E_initial, currentLoss));

        const effectiveMek = Math.max(0, E_initial - energy.heatEnergy);
        const effectiveEk = Math.max(0, effectiveMek - Ep);
        const v = Math.sqrt(Math.max(0, (2 * effectiveEk) / m));

        energy.totalEnergy = E_initial;
        energy.currentHeight = hCur;
        energy.currentSpeed = v;
        energy.potentialEnergy = Ep;
        energy.kineticEnergy = effectiveEk;
    }

    updateEnergyMetrics();
}

function updateEnergyPhysics() {
    const energy = labState.energy;
    if (!energy.isPlaying) return;

    const isDragging = (energy.mode === "pendulum" ? energy.pendulum.isDragging : energy.ramp.isDragging);
    if (isDragging) return;

    const baseDt = energy.isSlowMo ? 0.008 : 0.016;
    const subSteps = 4;
    const subDt = baseDt / subSteps;

    const g = energy.gravity;
    const damping = energy.frictionEnabled ? 0.22 : 0;
    const maxRelRad = energy.releaseAngle * (Math.PI / 180);

    if (energy.mode === "pendulum") {
        const p = energy.pendulum;
        const L = p.length;

        for (let i = 0; i < subSteps; i++) {
            const alpha = -(g / L) * Math.sin(p.angle) - damping * p.omega;
            p.omega += alpha * subDt;
            p.angle += p.omega * subDt;

            if (!energy.frictionEnabled) {
                // Sürtünmesiz ortamda tepe noktasını aşamaz
                if (p.angle > maxRelRad) { p.angle = maxRelRad; p.omega = 0; }
                if (p.angle < -maxRelRad) { p.angle = -maxRelRad; p.omega = 0; }
            } else {
                // Sürtünmeli ortamda genlik sönümlenir ve dipte doğal olarak durur
                if (Math.abs(p.angle) < 0.003 && Math.abs(p.omega) < 0.003) {
                    p.angle = 0;
                    p.omega = 0;
                    break;
                }
            }
        }
    } else {
        const r = energy.ramp;
        const R = r.radius;

        for (let i = 0; i < subSteps; i++) {
            const alpha = -(g / R) * Math.sin(r.angle) - (damping * 1.1) * r.omega;
            r.omega += alpha * subDt;
            r.angle += r.omega * subDt;

            if (!energy.frictionEnabled) {
                if (r.angle > maxRelRad) { r.angle = maxRelRad; r.omega = 0; }
                if (r.angle < -maxRelRad) { r.angle = -maxRelRad; r.omega = 0; }
            } else {
                if (Math.abs(r.angle) < 0.003 && Math.abs(r.omega) < 0.003) {
                    r.angle = 0;
                    r.omega = 0;
                    break;
                }
            }
        }
    }

    calculateEnergyInstantValues();
}

function updateEnergyMetrics() {
    const energy = labState.energy;

    const elMass = document.getElementById('metric-energy-mass');
    const elHeight = document.getElementById('metric-energy-height');
    const elSpeed = document.getElementById('metric-energy-speed');
    const elEp = document.getElementById('metric-energy-ep');
    const elEk = document.getElementById('metric-energy-ek');
    const elHeat = document.getElementById('metric-energy-heat');
    const elTotal = document.getElementById('metric-energy-total');

    if (elMass) elMass.textContent = `${energy.mass.toFixed(1)} kg`;
    if (elHeight) elHeight.textContent = `${energy.currentHeight.toFixed(2)} m`;
    if (elSpeed) elSpeed.textContent = `${energy.currentSpeed.toFixed(2)} m/s`;
    if (elEp) elEp.textContent = `${energy.potentialEnergy.toFixed(2)} J`;
    if (elEk) elEk.textContent = `${energy.kineticEnergy.toFixed(2)} J`;
    if (elHeat) elHeat.textContent = `${energy.heatEnergy.toFixed(2)} J`;
    if (elTotal) elTotal.textContent = `${energy.totalEnergy.toFixed(2)} J (Sabit)`;

    // Dinamik Maarif Modeli Pedagojik Kartı
    const cardBox = document.getElementById('energy-pedagogical-box');
    const cardIcon = document.getElementById('energy-pedagogical-icon');
    const cardTitle = document.getElementById('energy-pedagogical-title');
    const cardText = document.getElementById('energy-pedagogical-text');

    if (cardBox && cardIcon && cardTitle && cardText) {
        if (energy.frictionEnabled && energy.heatEnergy > 0.4) {
            cardBox.style.borderColor = "rgba(239, 68, 68, 0.65)";
            cardIcon.style.color = "#ef4444";
            cardIcon.innerHTML = '<i class="fas fa-fire-alt"></i>';
            cardTitle.textContent = "🔥 Sürtünme ve Isıya Dönüşüm:";
            cardText.textContent = `Sürtünme ve hava direnci mekanik enerjinin ${energy.heatEnergy.toFixed(1)} J'lük kısmını ısı enerjisine dönüştürdü. Salınım genliği küçülüyor; fakat evrendeki toplam enerji (Ep + Ek + Eısı) daima korunur!`;
        } else if (energy.currentHeight > energy.initialTotalEnergy / (energy.mass * energy.gravity) * 0.94 || energy.currentSpeed < 0.25) {
            cardBox.style.borderColor = "rgba(16, 185, 129, 0.65)";
            cardIcon.style.color = "#10b981";
            cardIcon.innerHTML = '<i class="fas fa-mountain"></i>';
            cardTitle.textContent = "⚡ Tepe Noktası (Maksimum Potansiyel Enerji):";
            cardText.textContent = "Cisim dönüş anında anlık olarak durur (v = 0). Mekanik enerjinin tamamı Çekim Potansiyel Enerjisi hâlindedir.";
        } else if (energy.currentHeight < 0.04 || energy.kineticEnergy > energy.totalEnergy * 0.94) {
            cardBox.style.borderColor = "rgba(56, 189, 248, 0.65)";
            cardIcon.style.color = "#38bdf8";
            cardIcon.innerHTML = '<i class="fas fa-bolt"></i>';
            cardTitle.textContent = "🚀 Denge / Dip Konumu (Maksimum Kinetik Enerji):";
            cardText.textContent = "Cisim en alçak noktadan geçerken sürati ve kinetik enerjisi maksimuma ulaşır. Potansiyel enerjinin tamamı kinetik enerjiye dönüşmüştür!";
        } else {
            cardBox.style.borderColor = "rgba(250, 204, 21, 0.5)";
            cardIcon.style.color = "#facc15";
            cardIcon.innerHTML = '<i class="fas fa-sync-alt"></i>';
            cardTitle.textContent = "🔄 Enerji Dönüşümü Devam Ediyor:";
            cardText.textContent = "Potansiyel ve kinetik enerji sürekli olarak birbirine dönüşmektedir. Sürtünmesiz ortamda toplam mekanik enerji daima sabit kalır.";
        }
    }

    // Metrik Şeridi (#metrics-bar-7-2) Güncellemesi
    const mbEp = document.getElementById('mbar-72-ep');
    const mbEk = document.getElementById('mbar-72-ek');
    const mbEtot = document.getElementById('mbar-72-etot');
    const mbSpeed = document.getElementById('mbar-72-speed');
    const mbStatus = document.getElementById('mbar-72-status');

    if (mbEp) mbEp.textContent = `${energy.potentialEnergy.toFixed(1)} J`;
    if (mbEk) mbEk.textContent = `${energy.kineticEnergy.toFixed(1)} J`;
    if (mbEtot) mbEtot.textContent = `${energy.totalEnergy.toFixed(1)} J`;
    if (mbSpeed) mbSpeed.textContent = `${energy.currentSpeed.toFixed(1)} m/s`;
    if (mbStatus) {
        if (energy.frictionEnabled && energy.heatEnergy > 0.4) {
            mbStatus.textContent = "🔥 Sürtünmeyle Mekanik Enerji Isıya Dönüşüyor";
            mbStatus.style.color = "#ef4444";
        } else if (energy.currentSpeed < 0.25) {
            mbStatus.textContent = "⚡ Tepe Noktası: Maksimum Potansiyel Enerji (v ≈ 0)";
            mbStatus.style.color = "#10b981";
        } else if (energy.kineticEnergy > energy.totalEnergy * 0.9) {
            mbStatus.textContent = "🚀 Dip Noktası: Maksimum Kinetik Enerji";
            mbStatus.style.color = "#38bdf8";
        } else {
            mbStatus.textContent = "🔄 Ep ⇄ Ek Dönüşümü Gerçekleşiyor (E_top Sabit)";
            mbStatus.style.color = "#facc15";
        }
    }
}

function drawEnergySimulation() {
    if (!ctx || !canvas) return;

    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    // 1. Arka Plan: Derin Bilim Laboratuvarı Gradyanı
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, "#080e1c");
    bgGrad.addColorStop(1, "#0d172a");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. İnce Teknik Çizim Izgarası (Fizik Masası)
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1 * scale;
    const gridSize = 35 * scale;
    for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }
    ctx.restore();

    // 3. Sol Kenara Sabitlenmiş Zarif Canlı Enerji Göstergesi (Bar Chart)
    drawEnergyBarsGauge(ctx, scale);

    // 4. Deney Simülasyonu Çizimi (Sarkaç veya Rampa)
    const energy = labState.energy;
    if (energy.mode === "pendulum") {
        drawPendulumSimulation(ctx, scale);
    } else {
        drawRampSimulation(ctx, scale);
    }
}

function drawEnergyBarsGauge(ctx, scale) {
    const energy = labState.energy;
    const boxX = 20 * scale;
    const boxY = 45 * scale;
    const boxW = 110 * scale;
    const boxH = 180 * scale;

    ctx.save();

    // Arka plan paneli
    ctx.fillStyle = "rgba(10, 16, 30, 0.88)";
    ctx.strokeStyle = "rgba(0, 210, 255, 0.25)";
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 12 * scale);
    ctx.fill();
    ctx.stroke();

    // Çubuk Parametreleri (Zero-Canvas-Text: Seviye çubukları nitel görsel kılavuzdur, sayısal değerler alt metrik şeridindedir)
    const maxVal = Math.max(15, energy.initialTotalEnergy * 1.05);
    const barW = 16 * scale;
    const gap = 7 * scale;
    const maxBarH = 140 * scale;
    const startX = boxX + (12 * scale);
    const bottomY = boxY + boxH - (20 * scale);

    const bars = [
        { label: "Ek", val: energy.kineticEnergy, color: "#38bdf8", glow: "rgba(56, 189, 248, 0.4)" },
        { label: "Ep", val: energy.potentialEnergy, color: "#10b981", glow: "rgba(16, 185, 129, 0.4)" },
        { label: "Eısı", val: energy.heatEnergy, color: "#ef4444", glow: "rgba(239, 68, 68, 0.4)" },
        { label: "Etop", val: energy.totalEnergy, color: "#facc15", glow: "rgba(250, 204, 21, 0.4)" }
    ];

    bars.forEach((b, idx) => {
        const bx = startX + idx * (barW + gap);
        const ratio = Math.max(0, Math.min(1, b.val / maxVal));
        const barH = ratio * maxBarH;
        const by = bottomY - barH;

        // Arka boş sütun
        ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
        ctx.beginPath();
        ctx.roundRect(bx, bottomY - maxBarH, barW, maxBarH, 4 * scale);
        ctx.fill();

        // Dolu çubuk
        if (barH > 1) {
            ctx.fillStyle = b.color;
            ctx.shadowColor = b.glow;
            ctx.shadowBlur = 6 * scale;
            ctx.beginPath();
            ctx.roundRect(bx, by, barW, barH, 4 * scale);
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Çubuk altı renkli gösterge noktası (Zero-Canvas-Text)
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(bx + (barW / 2), bottomY + (10 * scale), 3 * scale, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.restore();
}

function drawPendulumSimulation(ctx, scale) {
    const energy = labState.energy;
    const p = energy.pendulum;
    const cx = p.pivotX * scale;
    const cy = p.pivotY * scale;
    const L = p.rodPx * scale;
    const angle = p.angle;

    const bx = cx + L * Math.sin(angle);
    const by = cy + L * Math.cos(angle);
    const lowestY = cy + L;

    ctx.save();

    // 1. Tavan Montaj Plakası (Çelik Braket)
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.roundRect(cx - (55 * scale), cy - (14 * scale), 110 * scale, 14 * scale, 4 * scale);
    ctx.fill();
    ctx.stroke();

    // Braket vidaları
    ctx.fillStyle = "#94a3b8";
    [-42, -20, 20, 42].forEach(off => {
        ctx.beginPath();
        ctx.arc(cx + (off * scale), cy - (7 * scale), 2.5 * scale, 0, Math.PI * 2);
        ctx.fill();
    });

    // 2. Düşey Denge Çizgisi (Dashed Faint Line)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 1 * scale;
    ctx.setLineDash([4 * scale, 4 * scale]);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, lowestY + (45 * scale));
    ctx.stroke();

    // 3. Salınım Yörünge Yayı (Faint Arc)
    const maxRad = energy.releaseAngle * (Math.PI / 180);
    ctx.beginPath();
    ctx.arc(cx, cy, L, (Math.PI / 2) - maxRad, (Math.PI / 2) + maxRad);
    ctx.strokeStyle = "rgba(0, 210, 255, 0.15)";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Referans Denge / Zemin Seviyesi (h = 0 kesikli çizgisi)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.35)";
    ctx.lineWidth = 1 * scale;
    ctx.setLineDash([3 * scale, 3 * scale]);
    ctx.beginPath();
    ctx.moveTo(cx - (160 * scale), lowestY);
    ctx.lineTo(cx + (160 * scale), lowestY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 5. Yükseklik Farkı Gösterge Çizgisi (h)
    if (lowestY - by > 4 * scale) {
        const indX = cx + (Math.sin(angle) > 0 ? -1 : 1) * (140 * scale);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
        ctx.lineWidth = 1 * scale;
        ctx.setLineDash([2 * scale, 2 * scale]);

        // Yatay hiza çizgisi
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(indX, by);
        ctx.moveTo(cx, lowestY);
        ctx.lineTo(indX, lowestY);
        ctx.stroke();

        // Düşey ok
        ctx.setLineDash([]);
        ctx.strokeStyle = "#38bdf8";
        ctx.beginPath();
        ctx.moveTo(indX, lowestY);
        ctx.lineTo(indX, by);
        ctx.stroke();
    }

    // 6. Sarkaç Kolu (İnce Metal Çubuk / İp)
    ctx.strokeStyle = "rgba(226, 232, 240, 0.85)";
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(bx, by);
    ctx.stroke();

    // Pivot Rulmanı
    ctx.fillStyle = "#00d2ff";
    ctx.beginPath();
    ctx.arc(cx, cy, 6 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5 * scale, 0, Math.PI * 2);
    ctx.fill();

    // 7. Sarkaç Küresi (Metalik Gümüş Çok Katmanlı Radyal Gradyan & Zemin Projeksiyon Gölgesi)
    const bobR = (14 + energy.mass * 2.5) * scale;

    // Zemin projeksiyon gölgesi (Küre yükseldikçe gölge hafifler ve küçülür)
    const shadowDist = Math.max(0, lowestY - by);
    const shadowAlpha = Math.max(0.08, 0.32 - (shadowDist / (L * 0.7)) * 0.22);
    const shadowW = Math.max(bobR * 0.45, bobR * (1 - shadowDist / (L * 1.3)));
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.beginPath();
    ctx.ellipse(bx, lowestY + (12 * scale), shadowW, shadowW * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dokunmatik sürükleme halkası
    if (p.isDragging) {
        ctx.strokeStyle = "rgba(0, 210, 255, 0.6)";
        ctx.lineWidth = 2 * scale;
        ctx.setLineDash([3 * scale, 3 * scale]);
        ctx.beginPath();
        ctx.arc(bx, by, bobR + (8 * scale), 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Yüksek Gerçeklikli Metalik Krom / Gümüş Radyal Gradyan
    const sphereGrad = ctx.createRadialGradient(
        bx - (bobR * 0.35), by - (bobR * 0.35), bobR * 0.05,
        bx, by, bobR
    );
    sphereGrad.addColorStop(0, "#ffffff");
    sphereGrad.addColorStop(0.2, "#f1f5f9");
    sphereGrad.addColorStop(0.45, "#94a3b8");
    sphereGrad.addColorStop(0.75, "#475569");
    sphereGrad.addColorStop(1, "#1e293b");

    ctx.fillStyle = sphereGrad;
    ctx.shadowColor = "rgba(0, 210, 255, 0.35)";
    ctx.shadowBlur = 8 * scale;
    ctx.beginPath();
    ctx.arc(bx, by, bobR, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Speküler Parlama Noktası (Star Flash)
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(bx - (bobR * 0.32), by - (bobR * 0.32), 2.2 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.lineWidth = 1.2 * scale;
    ctx.stroke();

    // 8. Hız Vektörü Oku (Teğetsel Sürat)
    if (energy.currentSpeed > 0.15) {
        const velLen = Math.min(60 * scale, energy.currentSpeed * 12 * scale);
        const dir = (p.omega >= 0) ? 1 : -1;
        const velAngle = angle + (dir * Math.PI / 2);

        const vx = bx + velLen * Math.sin(velAngle);
        const vy = by + velLen * Math.cos(velAngle);

        ctx.strokeStyle = "#38bdf8";
        ctx.fillStyle = "#38bdf8";
        ctx.lineWidth = 2.5 * scale;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(vx, vy);
        ctx.stroke();

        const arrowSize = 6 * scale;
        const arrowAngle = Math.atan2(vy - by, vx - bx);
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(vx - arrowSize * Math.cos(arrowAngle - Math.PI / 6), vy - arrowSize * Math.sin(arrowAngle - Math.PI / 6));
        ctx.lineTo(vx - arrowSize * Math.cos(arrowAngle + Math.PI / 6), vy - arrowSize * Math.sin(arrowAngle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
}

function drawRampSimulation(ctx, scale) {
    const energy = labState.energy;
    const r = energy.ramp;
    const cx = r.centerX * scale;
    const cy = r.centerY * scale;
    const R = r.radiusPx * scale;
    const angle = r.angle;

    const lowestY = cy + R;
    const maxTrackAngle = 55 * (Math.PI / 180);

    ctx.save();

    // 1. Zemin ve Taşıyıcı Çelik Kafes
    const groundY = lowestY + (20 * scale);
    ctx.strokeStyle = "rgba(71, 85, 105, 0.4)";
    ctx.lineWidth = 1 * scale;
    for (let deg = -50; deg <= 50; deg += 15) {
        const rad = deg * (Math.PI / 180);
        const tx = cx + R * Math.sin(rad);
        const ty = cy + R * Math.cos(rad);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx, groundY);
        ctx.stroke();
    }

    ctx.strokeStyle = "rgba(100, 116, 139, 0.6)";
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo(cx - (200 * scale), groundY);
    ctx.lineTo(cx + (200 * scale), groundY);
    ctx.stroke();

    // 2. Çift Ray (U-Rampa Kavisli Raylar)
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 3 * scale;
    ctx.shadowColor = "rgba(56, 189, 248, 0.5)";
    ctx.shadowBlur = 8 * scale;
    ctx.beginPath();
    ctx.arc(cx, cy, R, (Math.PI / 2) - maxTrackAngle, (Math.PI / 2) + maxTrackAngle);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.arc(cx, cy, R + (6 * scale), (Math.PI / 2) - maxTrackAngle, (Math.PI / 2) + maxTrackAngle);
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5 * scale;
    for (let deg = -52; deg <= 52; deg += 4) {
        const rad = deg * (Math.PI / 180);
        const x1 = cx + (R - 2 * scale) * Math.sin(rad);
        const y1 = cy + (R - 2 * scale) * Math.cos(rad);
        const x2 = cx + (R + 6 * scale) * Math.sin(rad);
        const y2 = cy + (R + 6 * scale) * Math.cos(rad);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // 3. Referans Denge Noktası (h = 0)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
    ctx.lineWidth = 1 * scale;
    ctx.setLineDash([3 * scale, 3 * scale]);
    ctx.beginPath();
    ctx.moveTo(cx - (160 * scale), lowestY);
    ctx.lineTo(cx + (160 * scale), lowestY);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Kaykaycı / Araç Konumu
    const cartX = cx + R * Math.sin(angle);
    const cartY = cy + R * Math.cos(angle);

    if (lowestY - cartY > 4 * scale) {
        const indX = cx + (Math.sin(angle) > 0 ? -1 : 1) * (140 * scale);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.5)";
        ctx.lineWidth = 1 * scale;
        ctx.setLineDash([2 * scale, 2 * scale]);

        ctx.beginPath();
        ctx.moveTo(cartX, cartY);
        ctx.lineTo(indX, cartY);
        ctx.moveTo(cx, lowestY);
        ctx.lineTo(indX, lowestY);
        ctx.stroke();

        ctx.setLineDash([]);
        ctx.strokeStyle = "#38bdf8";
        ctx.beginPath();
        ctx.moveTo(indX, lowestY);
        ctx.lineTo(indX, cartY);
        ctx.stroke();
    }

    // 4.5. Hareket İzi (Motion Trail - Hızlı salınımda hafif neon izler)
    if (!r.trail) r.trail = [];
    if (energy.isPlaying && energy.currentSpeed > 0.3) {
        r.trail.push({ x: cartX, y: cartY, angle: angle });
        if (r.trail.length > 6) r.trail.shift();
    } else if (!energy.isPlaying || energy.currentSpeed <= 0.1) {
        r.trail = [];
    }

    const cartW = 34 * scale;
    const cartH = 6 * scale;
    const wheelR = 4.5 * scale;

    r.trail.forEach((t, idx) => {
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(-t.angle);
        const trailAlpha = ((idx + 1) / r.trail.length) * 0.24;
        ctx.fillStyle = `rgba(56, 189, 248, ${trailAlpha})`;
        ctx.beginPath();
        ctx.roundRect(-cartW / 2, -(wheelR * 2 + cartH), cartW, cartH, 2 * scale);
        ctx.fill();
        ctx.restore();
    });

    // 5. Kaykaycı / Deney Arabası Çizimi
    ctx.save();
    ctx.translate(cartX, cartY);
    ctx.rotate(-angle);

    if (r.isDragging) {
        ctx.strokeStyle = "rgba(0, 210, 255, 0.6)";
        ctx.lineWidth = 2 * scale;
        ctx.setLineDash([3 * scale, 3 * scale]);
        ctx.beginPath();
        ctx.arc(0, -12 * scale, 24 * scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Tekerlekler
    ctx.fillStyle = "#00d2ff";
    ctx.shadowColor = "#00d2ff";
    ctx.shadowBlur = 4 * scale;
    [-12 * scale, 12 * scale].forEach(wx => {
        ctx.beginPath();
        ctx.arc(wx, -wheelR, wheelR, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.shadowBlur = 0;

    // Şasi
    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.roundRect(-cartW / 2, -(wheelR * 2 + cartH), cartW, cartH, 2 * scale);
    ctx.fill();
    ctx.stroke();

    // Kütle Bloğu
    const massBoxW = (16 + energy.mass * 2.5) * scale;
    const massBoxH = (12 + energy.mass * 2) * scale;
    const blockY = -(wheelR * 2 + cartH + massBoxH);

    const blockGrad = ctx.createLinearGradient(0, blockY, 0, blockY + massBoxH);
    blockGrad.addColorStop(0, "#38bdf8");
    blockGrad.addColorStop(1, "#0369a1");
    ctx.fillStyle = blockGrad;
    ctx.strokeStyle = "#cffafe";
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.roundRect(-massBoxW / 2, blockY, massBoxW, massBoxH, 3 * scale);
    ctx.fill();
    ctx.stroke();

    // Mekanik Ağırlık Yivi (Zero-Canvas-Text: Kütle sayısal değeri alt barda ve kontrollerdedir)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    ctx.moveTo(-massBoxW / 3, blockY + (massBoxH / 2));
    ctx.lineTo(massBoxW / 3, blockY + (massBoxH / 2));
    ctx.stroke();

    ctx.restore();

    // 6. Hız Vektörü Oku
    if (energy.currentSpeed > 0.15) {
        const velLen = Math.min(65 * scale, energy.currentSpeed * 12 * scale);
        const dir = (r.omega >= 0) ? 1 : -1;
        const velAngle = angle + (dir * Math.PI / 2);

        const vx = cartX + velLen * Math.sin(velAngle);
        const vy = cartY + velLen * Math.cos(velAngle);

        ctx.strokeStyle = "#38bdf8";
        ctx.fillStyle = "#38bdf8";
        ctx.lineWidth = 2.5 * scale;
        ctx.beginPath();
        ctx.moveTo(cartX, cartY);
        ctx.lineTo(vx, vy);
        ctx.stroke();

        const arrowSize = 6 * scale;
        const arrowAngle = Math.atan2(vy - cartY, vx - cartX);
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(vx - arrowSize * Math.cos(arrowAngle - Math.PI / 6), vy - arrowSize * Math.sin(arrowAngle - Math.PI / 6));
        ctx.lineTo(vx - arrowSize * Math.cos(arrowAngle + Math.PI / 6), vy - arrowSize * Math.sin(arrowAngle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
}

// --- 7. DENEY 7.3: IŞIĞIN KIRILMASI VE SINIR AÇISI MOTORU ---
function setIncidentAngle(angle) {
    const clamped = Math.max(0, Math.min(85, Math.round(angle)));
    labState.optics.incidentAngle = clamped;

    const angleRange = document.getElementById('lab-angle-range');
    const angleDisplay = document.getElementById('lab-angle-display');
    if (angleRange) angleRange.value = clamped;
    if (angleDisplay) angleDisplay.textContent = `${clamped}°`;

    calculateOpticsPhysics();
}

function calculateOpticsPhysics() {
    const { medium1, medium2, incidentAngle } = labState.optics;
    const med1 = MEDIA_PROPERTIES[medium1];
    const med2 = MEDIA_PROPERTIES[medium2];

    const n1 = med1.n;
    const n2 = med2.n;

    // Sınır Açısı (Critical Angle) Hesabı
    let criticalAngle = null;
    if (n1 > n2) {
        criticalAngle = Math.asin(n2 / n1) * (180 / Math.PI);
        labState.optics.criticalAngle = criticalAngle;
    } else {
        labState.optics.criticalAngle = null;
    }

    const rad1 = (incidentAngle * Math.PI) / 180;
    const sinTheta2 = (n1 / n2) * Math.sin(rad1);

    if (incidentAngle === 0) {
        // Dik geliş (i = 0°): Doğrultu değişmez, kırılma açısı tam 0.0°
        labState.optics.isTotalInternalReflection = false;
        labState.optics.refractedAngle = 0.0;
    } else if (n1 > n2 && criticalAngle !== null) {
        if (Math.abs(incidentAngle - criticalAngle) < 0.25) {
            // Tam sınır açısı: Kırılan ışın yüzeyi sıyırır (r = 90.0°)
            labState.optics.isTotalInternalReflection = false;
            labState.optics.refractedAngle = 90.0;
        } else if (incidentAngle > criticalAngle) {
            // Sınır açısından büyük: Tam Yansıma (kırılan ışın yok)
            labState.optics.isTotalInternalReflection = true;
            labState.optics.refractedAngle = null;
        } else {
            labState.optics.isTotalInternalReflection = false;
            const rad2 = Math.asin(Math.min(1.0, sinTheta2));
            labState.optics.refractedAngle = rad2 * (180 / Math.PI);
        }
    } else {
        labState.optics.isTotalInternalReflection = false;
        const rad2 = Math.asin(Math.min(1.0, sinTheta2));
        labState.optics.refractedAngle = rad2 * (180 / Math.PI);
    }

    updateOpticsHUDAndMetrics();
}

function updateOpticsHUDAndMetrics() {
    const { medium1, medium2, incidentAngle, refractedAngle, isTotalInternalReflection, criticalAngle } = labState.optics;
    const med1 = MEDIA_PROPERTIES[medium1];
    const med2 = MEDIA_PROPERTIES[medium2];

    const hudInc = document.getElementById('hud-val-incident');
    const hudRef = document.getElementById('hud-val-refract');
    const hudStatus = document.getElementById('lab-hud-status');
    const angleDisplay = document.getElementById('lab-angle-display');

    if (hudInc) hudInc.textContent = `${incidentAngle}°`;
    if (angleDisplay) angleDisplay.textContent = `${incidentAngle}°`;

    let behaviorText = "";
    let behaviorColor = "#00d2ff";

    if (incidentAngle === 0) {
        behaviorText = "Yüzeye Dik (Kırılmaz, Sürat Değişir)";
        behaviorColor = "#f59e0b";
        if (hudRef) hudRef.textContent = `0.0°`;
    } else if (isTotalInternalReflection) {
        behaviorText = "⚡ TAM YANSIMA (Kırılma Yok!)";
        behaviorColor = "#ef4444";
        if (hudRef) hudRef.textContent = `Yok (Yansıdı)`;
    } else if (refractedAngle === 90.0 || (criticalAngle && Math.abs(incidentAngle - criticalAngle) < 0.25)) {
        behaviorText = "Sınır Açısı (Yüzeyi Sıyırır - 90.0°)";
        behaviorColor = "#f59e0b";
        if (hudRef) hudRef.textContent = `90.0°`;
    } else if (med1.n < med2.n) {
        behaviorText = "Normale Yaklaşır (Sürat Azalır)";
        behaviorColor = "#10b981";
        if (hudRef) hudRef.textContent = `${refractedAngle.toFixed(1)}°`;
    } else {
        behaviorText = "Normalden Uzaklaşır (Sürat Artar)";
        behaviorColor = "#38bdf8";
        if (hudRef) hudRef.textContent = `${refractedAngle.toFixed(1)}°`;
    }

    if (hudStatus) {
        hudStatus.textContent = behaviorText;
        hudStatus.style.borderColor = behaviorColor;
    }

    const mMed1Name = document.getElementById('mbar-med1-name');
    const mMed1N = document.getElementById('mbar-med1-n');
    const mMed2Name = document.getElementById('mbar-med2-name');
    const mMed2N = document.getElementById('mbar-med2-n');
    if (mMed1Name) mMed1Name.textContent = med1.name;
    if (mMed1N) mMed1N.textContent = med1.n.toFixed(2);
    if (mMed2Name) mMed2Name.textContent = med2.name;
    if (mMed2N) mMed2N.textContent = med2.n.toFixed(2);

    const speed1El = document.getElementById('metric-speed-1');
    const speed2El = document.getElementById('metric-speed-2');
    const critEl = document.getElementById('metric-critical-angle');
    const behEl = document.getElementById('metric-behavior');

    if (speed1El) speed1El.textContent = `${med1.speed.toLocaleString('tr-TR')} km/s`;
    if (speed2El) speed2El.textContent = `${med2.speed.toLocaleString('tr-TR')} km/s`;
    if (critEl) critEl.textContent = criticalAngle ? `${criticalAngle.toFixed(1)}°` : "Yok (n₁ ≤ n₂)";
    if (behEl) {
        behEl.textContent = behaviorText;
        behEl.style.color = behaviorColor;
    }
}

function drawOpticsSimulation() {
    const { medium1, medium2, incidentAngle, refractedAngle, isTotalInternalReflection } = labState.optics;
    const med1 = MEDIA_PROPERTIES[medium1];
    const med2 = MEDIA_PROPERTIES[medium2];

    const W = canvas.width;
    const H = canvas.height;
    const scale = W / 800;

    ctx.save();
    ctx.clearRect(0, 0, W, H);

    const originX = 400 * scale;
    const originY = 250 * scale;
    const radius = 190 * scale;

    // Üst ve Alt Ortam Arka Planları
    ctx.fillStyle = med1.bgColor;
    ctx.fillRect(0, 0, W, originY);
    ctx.fillStyle = med2.bgColor;
    ctx.fillRect(0, originY, W, H - originY);

    // Açıölçer / Gönye
    drawProtractor(ctx, originX, originY, radius, scale);

    // Ayırıcı Yüzey
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(W, originY);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 2 * scale;
    ctx.stroke();

    // Yüzey Normali (N)
    ctx.beginPath();
    ctx.setLineDash([6 * scale, 6 * scale]);
    ctx.moveTo(originX, 30 * scale);
    ctx.lineTo(originX, H - (30 * scale));
    ctx.strokeStyle = "rgba(0, 210, 255, 0.8)";
    ctx.lineWidth = 2 * scale;
    ctx.stroke();
    ctx.setLineDash([]);

    // Lazer ve Gelen Işın
    const rad1 = (incidentAngle * Math.PI) / 180;
    const laserX = originX - Math.sin(rad1) * radius;
    const laserY = originY - Math.cos(rad1) * radius;

    if (incidentAngle > 2) {
        ctx.beginPath();
        ctx.arc(originX, originY, 45 * scale, -Math.PI / 2 - rad1, -Math.PI / 2, false);
        ctx.strokeStyle = "rgba(255, 50, 100, 0.85)";
        ctx.lineWidth = 3 * scale;
        ctx.stroke();
    }

    drawLaserBeam(ctx, laserX, laserY, originX, originY, "#ff1744", 3.5 * scale, 1.0);
    drawLaserDevice(ctx, laserX, laserY, originX, originY, scale);

    // Yansıyan Işın
    const reflectX = originX + Math.sin(rad1) * radius;
    const reflectY = originY - Math.cos(rad1) * radius;

    if (isTotalInternalReflection) {
        // %100 Yansıyan Işın (Eşit Açıyla, Tam Parlaklık)
        drawLaserBeam(ctx, originX, originY, reflectX, reflectY, "#ff0055", 3.8 * scale, 1.0);
    } else if (incidentAngle > 0) {
        drawLaserBeam(ctx, originX, originY, reflectX, reflectY, "rgba(255, 60, 100, 0.35)", 2 * scale, 0.4);
    }

    // Kırılan Işın
    if (!isTotalInternalReflection && refractedAngle !== null) {
        const rad2 = (refractedAngle * Math.PI) / 180;
        let refractX = originX + Math.sin(rad2) * radius;
        let refractY = originY + Math.cos(rad2) * radius;

        if (refractedAngle === 90.0) {
            // Sınır açısında kırılan ışın ayırıcı yüzeyi milimetrik sıyırır
            refractX = originX + radius;
            refractY = originY;
        }

        if (refractedAngle > 2) {
            ctx.beginPath();
            ctx.arc(originX, originY, 45 * scale, Math.PI / 2 - rad2, Math.PI / 2, false);
            ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
            ctx.lineWidth = 3 * scale;
            ctx.stroke();
        }

        drawLaserBeam(ctx, originX, originY, refractX, refractY, "#00e5ff", 3.5 * scale, 0.95);
    }

    ctx.restore();
}

// --- 8. DENEY 7.4: İNCE VE KALIN KENARLI MERCEKLER MOTORU ---
function calculateLensPhysics() {
    const { type, mode, focalLength, objectDistance, objectHeight } = labState.lens;
    const isConvex = (type === "convex");
    const fVal = isConvex ? focalLength : -focalLength;

    let di = null;
    let hi = null;
    let mag = null;
    let statusText = "";
    let statusColor = "#38bdf8";

    if (mode === "parallel") {
        if (isConvex) {
            statusText = "🔥 Işığı Odakta Toplar (Orman Yangını Riski!)";
            statusColor = "#f59e0b";
        } else {
            statusText = "👓 Işınları Dağıtır (Miyop Gözlüğü İlkesi)";
            statusColor = "#c084fc";
        }
    } else {
        // Mum / Cisim Görüntüsü Fiziği
        const isInfinityZone = isConvex && Math.abs(objectDistance - focalLength) <= 8;
        if (isInfinityZone) {
            di = null;
            mag = null;
            hi = null;
            statusText = "Görüntü Sonsuzda (Işınlar Paralel)";
            statusColor = "#94a3b8";
        } else {
            const delta = objectDistance - fVal;
            di = (fVal * objectDistance) / delta;
            mag = -di / objectDistance;
            hi = mag * objectHeight;

            const isReal = di > 0;
            const sizeDesc = Math.abs(mag) > 1.05 ? "Büyütülmüş" : Math.abs(mag) < 0.95 ? "Küçültülmüş" : "Eşit Boyda";

            if (isConvex) {
                if (isReal) {
                    statusText = `Gerçek, Ters, ${sizeDesc}`;
                    statusColor = "#10b981";
                } else {
                    statusText = `Sanal (Zahiri), Düz, Büyütülmüş (Büyüteç)`;
                    statusColor = "#38bdf8";
                }
            } else {
                statusText = "Sanal (Zahiri), Düz, Küçültülmüş";
                statusColor = "#c084fc";
            }
        }
    }

    labState.lens.imageDistance = di;
    labState.lens.imageHeight = hi;
    labState.lens.magnification = mag;

    // Panel Metriklerini Güncelle
    const mType = document.getElementById('metric-lens-type');
    const mF = document.getElementById('metric-lens-f');
    const mDo = document.getElementById('metric-lens-do');
    const mDi = document.getElementById('metric-lens-di');

    if (mType) {
        mType.textContent = isConvex ? "İnce Kenarlı" : "Kalın Kenarlı";
        mType.style.color = isConvex ? "#38bdf8" : "#c084fc";
    }
    if (mF) mF.textContent = `${focalLength} mm`;
    if (mDo) mDo.textContent = mode === "parallel" ? "Paralel (Sonsuz)" : `${objectDistance} mm`;
    if (mDi) {
        if (mode === "parallel") {
            mDi.textContent = isConvex ? `Odakta Toplanır (F = ${focalLength} mm)` : `Uzantısı Odakta Dağılır`;
            mDi.style.color = statusColor;
        } else {
            mDi.textContent = di !== null ? `${Math.round(Math.abs(di))} mm (${statusText})` : statusText;
            mDi.style.color = statusColor;
        }
    }

    // Pedagojik Uyarı ve Çıkarım Kutusunu Güncelle (Orman Yangını & Maarif Çıkarımı)
    const pedBox = document.getElementById('lens-pedagogical-box');
    const pedIcon = document.getElementById('lens-pedagogical-icon');
    const pedTitle = document.getElementById('lens-pedagogical-title');
    const pedText = document.getElementById('lens-pedagogical-text');

    if (pedBox && pedTitle && pedText && pedIcon) {
        if (mode === "parallel") {
            if (isConvex) {
                pedBox.style.borderColor = "rgba(245, 158, 11, 0.55)";
                pedIcon.innerHTML = '<i class="fas fa-fire-alt" style="color: #f59e0b;"></i>';
                pedTitle.innerHTML = '🔥 Orman Yangını Riski (Işığı Odakta Toplama):';
                pedTitle.style.color = '#fef08a';
                pedText.textContent = 'İnce kenarlı mercek gelen paralel güneş ışınlarını tek bir odakta (F₂) toplayarak yüksek ısı oluşturur. Doğaya atılan cam ve su şişeleri kuru otları tutuşturarak orman yangınlarına yol açabilir!';
            } else {
                pedBox.style.borderColor = "rgba(192, 132, 252, 0.55)";
                pedIcon.innerHTML = '<i class="fas fa-glasses" style="color: #c084fc;"></i>';
                pedTitle.innerHTML = '👓 Işığı Dağıtma & Miyop Gözlüğü İlkesi:';
                pedTitle.style.color = '#e9d5ff';
                pedText.textContent = 'Kalın kenarlı mercek gelen paralel ışınları uzantıları odaktan (F₁) geçecek şekilde dağıtır. Miyop göz kusuru düzeltmesinde, deniz fenerlerinde ve el fenerlerinde ışığı yaymak için kullanılır.';
            }
        } else {
            // Mum / Cisim Modu
            if (isConvex) {
                if (di > 0) {
                    pedBox.style.borderColor = "rgba(16, 185, 129, 0.55)";
                    pedIcon.innerHTML = '<i class="fas fa-camera" style="color: #10b981;"></i>';
                    pedTitle.innerHTML = '🕯️ Gerçek ve Ters Görüntü (Perdeye Düşürülebilir):';
                    pedTitle.style.color = '#a7f3d0';
                    pedText.textContent = 'Cisim odak noktasından uzakta (do > f) olduğunda ışınlar merceğin diğer tarafında kesişir; görüntü gerçek, ters ve bir perde üzerine aktarılabilir (fotoğraf makineleri ve insan gözü merceği).';
                } else if (di < 0) {
                    pedBox.style.borderColor = "rgba(56, 189, 248, 0.55)";
                    pedIcon.innerHTML = '<i class="fas fa-search-plus" style="color: #38bdf8;"></i>';
                    pedTitle.innerHTML = '🔍 Büyüteç İlkesi (Sanal & Düz Görüntü):';
                    pedTitle.style.color = '#bae6fd';
                    pedText.textContent = 'Cisim mercek ile odak noktası arasında (do < f) olduğunda ışınların uzantıları cisim tarafında kesişir; görüntü düz, cisimden büyük ve sanaldır (büyüteç çalışma prensibi).';
                } else {
                    pedBox.style.borderColor = "rgba(148, 163, 184, 0.55)";
                    pedIcon.innerHTML = '<i class="fas fa-arrows-alt-h" style="color: #94a3b8;"></i>';
                    pedTitle.innerHTML = '♾️ Işınlar Paralel (Görüntü Sonsuzda):';
                    pedTitle.style.color = '#cbd5e1';
                    pedText.textContent = 'Cisim odak noktasına (|do - f| ≤ 8 mm) yerleştirildiğinde kırılan ışınlar birbirine paralel yayılır ve kesişmez; görüntü sonsuzda kabul edilir.';
                }
            } else {
                pedBox.style.borderColor = "rgba(192, 132, 252, 0.55)";
                pedIcon.innerHTML = '<i class="fas fa-eye" style="color: #c084fc;"></i>';
                pedTitle.innerHTML = '👓 Daima Düz, Küçük ve Sanal Görüntü:';
                pedTitle.style.color = '#e9d5ff';
                pedText.textContent = 'Kalın kenarlı mercekte cisim nerede olursa olsun görüntü daima odak ile mercek arasında, düz, küçültülmüş ve sanal oluşur (kapı dürbünleri ve miyop gözlükleri).';
            }
        }
    }

    // Metrik Şeridi (#metrics-bar-7-4) Güncellemesi
    const mbType = document.getElementById('mbar-74-type');
    const mbFocus = document.getElementById('mbar-74-focus');
    const mbDo = document.getElementById('mbar-74-do');
    const mbImgProp = document.getElementById('mbar-74-img-prop');
    const mbStatus = document.getElementById('mbar-74-status');

    if (mbType) {
        mbType.textContent = isConvex ? "İnce Kenarlı" : "Kalın Kenarlı";
        mbType.style.color = isConvex ? "#38bdf8" : "#c084fc";
    }
    if (mbFocus) mbFocus.textContent = `${focalLength} mm`;
    if (mbDo) mbDo.textContent = mode === "parallel" ? "Sonsuz (Paralel)" : `${objectDistance} mm`;
    if (mbImgProp) {
        if (mode === "parallel") {
            mbImgProp.textContent = isConvex ? "Odakta Noktasal" : "Uzantısı Odakta";
            mbImgProp.style.color = isConvex ? "#f59e0b" : "#c084fc";
        } else {
            mbImgProp.textContent = statusText;
            mbImgProp.style.color = statusColor;
        }
    }
    if (mbStatus) {
        if (mode === "parallel") {
            mbStatus.textContent = isConvex ? "🔥 Işığı Odakta Toplar (Yangın Riski)" : "👓 Işığı Dağıtır (Iraksak)";
            mbStatus.style.color = isConvex ? "#f59e0b" : "#c084fc";
        } else {
            mbStatus.textContent = isConvex ? (di > 0 ? "🕯️ Gerçek ve Ters Görüntü (Perdede Oluşur)" : "🔍 Büyüteç Modu: Düz ve Dev Görüntü") : "👓 Daima Düz, Küçük ve Sanal";
            mbStatus.style.color = isConvex ? (di > 0 ? "#10b981" : "#38bdf8") : "#c084fc";
        }
    }
}

function drawLensSimulation() {
    const { type, mode, focalLength, objectDistance, objectHeight, imageDistance, imageHeight } = labState.lens;
    const isConvex = (type === "convex");

    const W = canvas.width;
    const H = canvas.height;
    const scale = W / 800;

    ctx.save();
    ctx.clearRect(0, 0, W, H);

    // Koyu Uzay / Optik Masa Arka Planı
    ctx.fillStyle = "#070c1b";
    ctx.fillRect(0, 0, W, H);

    const cx = 400 * scale;
    const cy = 250 * scale;
    const f = focalLength * scale;

    // 1. Asal Eksen
    ctx.beginPath();
    ctx.moveTo(25 * scale, cy);
    ctx.lineTo(W - (25 * scale), cy);
    ctx.strokeStyle = "rgba(0, 210, 255, 0.35)";
    ctx.lineWidth = 1.8 * scale;
    ctx.stroke();

    // Asal eksen sağ uç oku (Minimal eksen yön oku)
    ctx.beginPath();
    ctx.moveTo(W - (25 * scale), cy);
    ctx.lineTo(W - (32 * scale), cy - (4 * scale));
    ctx.moveTo(W - (25 * scale), cy);
    ctx.lineTo(W - (32 * scale), cy + (4 * scale));
    ctx.strokeStyle = "rgba(0, 210, 255, 0.4)";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    // 2. MODA GÖRE IŞINLARIN VE CİSMİN ÇİZİMİ (Işınlar altta akar)
    if (mode === "parallel") {
        drawParallelRaysMode(ctx, cx, cy, f, isConvex, scale);
    } else {
        drawCandleObjectMode(ctx, cx, cy, f, isConvex, objectDistance * scale, objectHeight * scale, imageDistance !== null ? imageDistance * scale : null, imageHeight !== null ? imageHeight * scale : null, scale);
    }

    // 3. Merceğin Çizimi (Cam Gövde & Sembolik Oklar)
    drawLensElement(ctx, cx, cy, isConvex, scale);

    // 4. Odak ve Merkez Noktaları (F1, 2F1, F2, 2F2, O) - Eksen çizgisinin net 18px altında
    drawFocalPoint(ctx, cx - f, cy, "F₁", scale);
    drawFocalPoint(ctx, cx - (2 * f), cy, "2F₁", scale);
    drawFocalPoint(ctx, cx + f, cy, "F₂", scale);
    drawFocalPoint(ctx, cx + (2 * f), cy, "2F₂", scale);

    // Optik Merkez (O) (Zero-Canvas-Text: Pürüzsüz vektör optik merkez diski)
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.restore();
}

function drawFocalPoint(ctx, x, y, label, scale) {
    ctx.save();
    // 1. Odak Noktası Diski
    ctx.beginPath();
    ctx.arc(x, y, 2.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = "#00d2ff";
    ctx.fill();

    // 2. Dikey Minimal Çentik (Zero-Canvas-Text: Odak mesafesi alt barda yer alır)
    ctx.beginPath();
    ctx.moveTo(x, y - (4 * scale));
    ctx.lineTo(x, y + (4 * scale));
    ctx.strokeStyle = "rgba(0, 210, 255, 0.5)";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    ctx.restore();
}

function drawLensElement(ctx, cx, cy, isConvex, scale) {
    const lensH = 130 * scale;
    ctx.save();

    if (isConvex) {
        // İnce Kenarlı Mercek (3D Kavisli Cam Gövdesi & Bevel Yansımaları)
        const thickness = 18 * scale;
        const lensGrad = ctx.createLinearGradient(cx - thickness, cy, cx + thickness, cy);
        lensGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
        lensGrad.addColorStop(0.2, "rgba(56, 189, 248, 0.2)");
        lensGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.65)");
        lensGrad.addColorStop(0.8, "rgba(14, 165, 233, 0.2)");
        lensGrad.addColorStop(1, "rgba(56, 189, 248, 0.4)");

        ctx.beginPath();
        ctx.moveTo(cx, cy - lensH);
        ctx.quadraticCurveTo(cx + thickness, cy, cx, cy + lensH);
        ctx.quadraticCurveTo(cx - thickness, cy, cx, cy - lensH);
        ctx.fillStyle = lensGrad;
        ctx.fill();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.95)";
        ctx.lineWidth = 2 * scale;
        ctx.stroke();

        // Cam Yansıma Çizgisi (Specular highlight)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth = 1.2 * scale;
        ctx.beginPath();
        ctx.moveTo(cx - 3 * scale, cy - lensH * 0.7);
        ctx.quadraticCurveTo(cx - thickness * 0.5, cy, cx - 3 * scale, cy + lensH * 0.7);
        ctx.stroke();

        // Çift Dışa Ok Sembolü (▲ ve ▼)
        drawArrowHead(ctx, cx, cy - lensH, -Math.PI / 2, 10 * scale, "#38bdf8");
        drawArrowHead(ctx, cx, cy + lensH, Math.PI / 2, 10 * scale, "#38bdf8");
    } else {
        // Kalın Kenarlı Mercek (3D İçe Kavisli Cam Gövde)
        const edgeW = 18 * scale;
        const centerW = 4 * scale;

        const lensGrad = ctx.createLinearGradient(cx - edgeW, cy, cx + edgeW, cy);
        lensGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
        lensGrad.addColorStop(0.3, "rgba(192, 132, 252, 0.2)");
        lensGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.6)");
        lensGrad.addColorStop(0.7, "rgba(168, 85, 247, 0.2)");
        lensGrad.addColorStop(1, "rgba(192, 132, 252, 0.4)");

        ctx.beginPath();
        ctx.moveTo(cx - edgeW, cy - lensH);
        ctx.lineTo(cx + edgeW, cy - lensH);
        ctx.quadraticCurveTo(cx + centerW, cy, cx + edgeW, cy + lensH);
        ctx.lineTo(cx - edgeW, cy + lensH);
        ctx.quadraticCurveTo(cx - centerW, cy, cx - edgeW, cy - lensH);
        ctx.fillStyle = lensGrad;
        ctx.fill();
        ctx.strokeStyle = "rgba(192, 132, 252, 0.95)";
        ctx.lineWidth = 2 * scale;
        ctx.stroke();

        // Yansıma ışıltısı
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth = 1.2 * scale;
        ctx.beginPath();
        ctx.moveTo(cx - edgeW + 3 * scale, cy - lensH * 0.8);
        ctx.quadraticCurveTo(cx - centerW * 0.5, cy, cx - edgeW + 3 * scale, cy + lensH * 0.8);
        ctx.stroke();

        // İçe Doğru Ok Sembolleri (▼ ve ▲)
        drawArrowHead(ctx, cx, cy - lensH, Math.PI / 2, 10 * scale, "#c084fc");
        drawArrowHead(ctx, cx, cy + lensH, -Math.PI / 2, 10 * scale, "#c084fc");
    }
    ctx.restore();
}

function drawArrowHead(ctx, x, y, angle, length, color) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - length * Math.cos(angle - Math.PI / 6), y - length * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x, y);
    ctx.lineTo(x - length * Math.cos(angle + Math.PI / 6), y - length * Math.sin(angle + Math.PI / 6));
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();
}

function drawParallelRaysMode(ctx, cx, cy, f, isConvex, scale) {
    const W = canvas.width;
    const offsets = [-65, -32, 0, 32, 65].map(v => v * scale);

    offsets.forEach(dy => {
        const rayY = cy + dy;

        if (dy === 0) {
            // Asal eksen üzerindeki ışın kırılmadan dümdüz devam eder
            drawLaserBeam(ctx, 40 * scale, cy, W - (40 * scale), cy, isConvex ? "#38bdf8" : "#c084fc", 2.2 * scale, 0.9);
            return;
        }

        // Soldan merceğe gelen paralel ışın
        drawLaserBeam(ctx, 40 * scale, rayY, cx, rayY, "#ff3366", 2.2 * scale, 0.95);

        if (isConvex) {
            // İNCE KENARLI: Işın F2 noktasından geçerek kırılır ve sağ kenara gider
            const slope = -dy / f; // m = (cy - rayY) / f
            const endX = W - (40 * scale);
            const endY = cy + slope * (endX - (cx + f));

            drawLaserBeam(ctx, cx, rayY, cx + f, cy, "#38bdf8", 2.2 * scale, 0.95);
            drawLaserBeam(ctx, cx + f, cy, endX, endY, "#38bdf8", 2.0 * scale, 0.85);
        } else {
            // KALIN KENARLI: Işın uzantısı F1'den geçecek şekilde dağılır
            const slope = dy / f;
            const endX = W - (40 * scale);
            const endY = rayY + slope * (endX - cx);

            // Gerçek dağılan ışın
            drawLaserBeam(ctx, cx, rayY, endX, endY, "#c084fc", 2.2 * scale, 0.95);

            // Geriye doğru sanal odak uzantısı (Kesikli Çizgi)
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([4 * scale, 4 * scale]);
            ctx.moveTo(cx, rayY);
            ctx.lineTo(cx - f, cy);
            ctx.strokeStyle = "rgba(192, 132, 252, 0.7)";
            ctx.lineWidth = 1.5 * scale;
            ctx.stroke();
            ctx.restore();
        }
    });

    // İnce mercekte Odakta Zarif / Minimal Parıltı (Işınları örtmez, metinsiz)
    if (isConvex) {
        drawFireHeatEffect(ctx, cx + f, cy, scale);
    }
}

function drawFireHeatEffect(ctx, x, y, scale) {
    ctx.save();
    // Odak noktasında minimal, zarif ışıma (Işınları örtmez, metin kutusu yok)
    const pulse = Math.sin(animTime * 3) * (1.2 * scale);
    const radius = (5 * scale) + pulse;

    // Odak Noktası Sıcaklık Çekirdeği
    const grad = ctx.createRadialGradient(x, y, 0.8 * scale, x, y, radius);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(0.3, "rgba(251, 191, 36, 0.85)");
    grad.addColorStop(0.7, "rgba(245, 158, 11, 0.45)");
    grad.addColorStop(1, "rgba(239, 68, 68, 0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // 2 adet hafif mikro kıvılcım (odak çevresinde minimal parıltı)
    for (let i = 0; i < 2; i++) {
        const angle = animTime * 2.5 + (i * Math.PI);
        const dist = (7 * scale) + Math.cos(animTime * 3 + i) * (2 * scale);
        const sx = x + Math.cos(angle) * dist;
        const sy = y + Math.sin(angle) * dist;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.2 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(254, 240, 138, 0.75)";
        ctx.fill();
    }

    ctx.restore();
}

function drawCandleObjectMode(ctx, cx, cy, f, isConvex, doVal, ho, diVal, hiVal, scale) {
    const W = canvas.width;
    const objX = cx - doVal;
    const objY = cy - ho;

    // 1. Cisim Mumun Çizimi
    drawCandle(ctx, objX, cy, ho, true, 1.0, scale, "Cisim (Mum)");

    // 2. Işın Çizimi (Işın 1: Paralel Gelen ➔ Odaktan Kırılan)
    drawLaserBeam(ctx, objX, objY, cx, objY, "#ff3366", 2.2 * scale, 0.92);

    // Asimptot / Sonsuz Bölgesi Denetimi (|do - f| <= 8 mm)
    const isInfinityZone = isConvex && Math.abs((doVal / scale) - (f / scale)) <= 8;

    if (isInfinityZone) {
        // İnce kenarlı mercekte cisim odakta olduğunda kırılan ışınlar birbirine paralel yayılır
        const slope = ho / f;
        const endX = W - (35 * scale);
        const end1Y = cy + slope * (endX - (cx + f));
        const end2Y = cy + slope * (endX - cx);

        // Kırılan Işın 1 (Odaktan geçen)
        drawLaserBeam(ctx, cx, objY, cx + f, cy, "#38bdf8", 2.2 * scale, 0.92);
        drawLaserBeam(ctx, cx + f, cy, endX, end1Y, "#38bdf8", 2.0 * scale, 0.85);

        // Işın 2 (Optik Merkezden geçen ve Işın 1'e tam paralel giden)
        drawLaserBeam(ctx, objX, objY, cx, cy, "#10b981", 2.2 * scale, 0.92);
        drawLaserBeam(ctx, cx, cy, endX, end2Y, "#10b981", 2.0 * scale, 0.85);

        // Asal Eksen Üzerine Zarif Sonsuzluk Notu
        drawFarImageIndicator(ctx, cx + (150 * scale), cy + (22 * scale), "♾️ Işınlar paralel gider, görüntü sonsuzda oluşur", "center", scale);
        return;
    }

    // Güvenli Tuval Sınırları ve Clamping (Tavan ve tabandan en az 25px emniyet payı)
    const maxSafeHeight = cy - (25 * scale);

    if (isConvex) {
        if (diVal !== null) {
            const isReal = diVal > 0;
            const imgX = cx + diVal;
            const rawHi = Math.abs(hiVal);

            // Büyüteç Modunda (do < f) sanal görüntü boyu en fazla 2.5 * ho ile sınırlandırılır
            const clampedHi = isReal ? Math.min(rawHi, maxSafeHeight) : Math.min(rawHi, Math.min(2.5 * ho, maxSafeHeight));
            const imgY = isReal ? cy + clampedHi : cy - clampedHi;

            if (isReal) {
                // GERÇEK VE TERS GÖRÜNTÜ
                const isOffScreenRight = (imgX > W - (50 * scale));
                const targetX = isOffScreenRight ? W - (30 * scale) : imgX;
                const slope1 = (cy - objY) / f;
                const slope2 = (cy - objY) / doVal;

                if (isOffScreenRight) {
                    // Ekran dışı gerçek görüntü: Işınlar sağ kenara kadar uzanır, kenarda şık gösterge çıkar
                    const target1Y = cy + slope1 * (targetX - (cx + f));
                    const target2Y = cy + slope2 * (targetX - cx);

                    drawLaserBeam(ctx, cx, objY, cx + f, cy, "#38bdf8", 2.2 * scale, 0.92);
                    drawLaserBeam(ctx, cx + f, cy, targetX, target1Y, "#38bdf8", 2.0 * scale, 0.85);
                    drawLaserBeam(ctx, objX, objY, cx, cy, "#10b981", 2.2 * scale, 0.92);
                    drawLaserBeam(ctx, cx, cy, targetX, target2Y, "#10b981", 2.0 * scale, 0.85);

                    drawFarImageIndicator(ctx, W - (20 * scale), cy, `di = ${Math.round(diVal / scale)} mm ➔ Ters/Gerçek`, "right", scale);
                } else {
                    // Ekran içi gerçek görüntü: Işınlar tam odaklanıp kesişir
                    drawLaserBeam(ctx, cx, objY, imgX, imgY, "#38bdf8", 2.2 * scale, 0.92);
                    drawLaserBeam(ctx, objX, objY, imgX, imgY, "#10b981", 2.2 * scale, 0.92);
                    drawCandle(ctx, imgX, cy, clampedHi, false, 0.95, scale, "Gerçek Görüntü (Ters)", true);
                }
            } else {
                // SANAL VE DÜZ GÖRÜNTÜ (BÜYÜTEÇ)
                const isOffScreenLeft = (imgX < 45 * scale);
                const endX = cx + (250 * scale);
                const slope1 = (cy - objY) / f;
                const slope2 = (cy - objY) / doVal;
                const end1Y = cy + slope1 * (endX - (cx + f));
                const end2Y = cy + slope2 * (endX - cx);

                // Sağa giden kırılan ışınlar
                drawLaserBeam(ctx, cx, objY, endX, end1Y, "#38bdf8", 2.2 * scale, 0.92);
                drawLaserBeam(ctx, objX, objY, endX, end2Y, "#10b981", 2.2 * scale, 0.92);

                if (isOffScreenLeft) {
                    // Geriye doğru sanal uzantılar ekranın sol kenarında göstergeye bağlanır
                    ctx.save();
                    ctx.setLineDash([4 * scale, 4 * scale]);
                    ctx.beginPath();
                    ctx.moveTo(cx, objY);
                    ctx.lineTo(25 * scale, cy - (slope1 * (cx - (25 * scale))));
                    ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
                    ctx.lineWidth = 1.6 * scale;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(objX, objY);
                    ctx.lineTo(25 * scale, cy - (slope2 * (cx - (25 * scale))));
                    ctx.strokeStyle = "rgba(16, 185, 129, 0.75)";
                    ctx.lineWidth = 1.6 * scale;
                    ctx.stroke();
                    ctx.restore();

                    drawFarImageIndicator(ctx, 25 * scale, cy, `di = -${Math.round(Math.abs(diVal / scale))} mm ➔ Düz/Sanal`, "left", scale);
                } else {
                    // Geriye Sanal Kesikli Çizgiler ve Sanal Mum
                    ctx.save();
                    ctx.setLineDash([4 * scale, 4 * scale]);
                    ctx.beginPath();
                    ctx.moveTo(cx, objY);
                    ctx.lineTo(imgX, imgY);
                    ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
                    ctx.lineWidth = 1.6 * scale;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(objX, objY);
                    ctx.lineTo(imgX, imgY);
                    ctx.strokeStyle = "rgba(16, 185, 129, 0.75)";
                    ctx.lineWidth = 1.6 * scale;
                    ctx.stroke();
                    ctx.restore();

                    drawCandle(ctx, imgX, cy, clampedHi, true, 0.75, scale, "Sanal Görüntü (Büyüteç)", false);
                }
            }
        }
    } else {
        // Kalın Mercekte: Işın 1 geriye F1'e uzanarak dağılır
        if (diVal !== null) {
            const imgX = cx + diVal;
            const clampedHi = Math.min(Math.abs(hiVal), maxSafeHeight);

            const slope = (objY - cy) / f;
            const endX = cx + (250 * scale);
            const endY = objY + slope * (endX - cx);
            drawLaserBeam(ctx, cx, objY, endX, endY, "#c084fc", 2.2 * scale, 0.92);

            // Geriye Sanal Kesikli Çizgi
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([4 * scale, 4 * scale]);
            ctx.moveTo(cx, objY);
            ctx.lineTo(cx - f, cy);
            ctx.strokeStyle = "rgba(192, 132, 252, 0.75)";
            ctx.lineWidth = 1.6 * scale;
            ctx.stroke();
            ctx.restore();

            // Işın 2 (Optik Merkezden Geçen)
            const slope2 = (cy - objY) / doVal;
            const end2X = cx + (250 * scale);
            const end2Y = cy + slope2 * (end2X - cx);
            drawLaserBeam(ctx, objX, objY, end2X, end2Y, "#10b981", 2.2 * scale, 0.92);

            // Görüntü Mumunun Çizimi (Daima Sanal, Düz, Küçük)
            drawCandle(ctx, imgX, cy, clampedHi, true, 0.75, scale, "Sanal Görüntü (Küçük)", false);
        }
    }
}

function drawFarImageIndicator(ctx, x, cy, text, align, scale) {
    // Zero-Canvas-Text: Sonsuzluk durumu sağ paneldeki pedagojik bilgi kartında bildirilmektedir
}

function drawCandle(ctx, x, baseY, height, isUpright, alpha, scale, label, isReal = false) {
    ctx.save();
    ctx.globalAlpha = alpha;

    const candleW = 12 * scale;
    const flameH = 18 * scale;
    const dir = isUpright ? 1 : -1;

    // Mum Gövdesi
    const bodyH = Math.max(14 * scale, height - flameH);
    const bodyTopY = baseY - (dir * bodyH);

    ctx.fillStyle = isReal ? "#0284c7" : (alpha === 1 ? "#d97706" : "#6366f1");
    ctx.strokeStyle = isReal ? "#38bdf8" : (alpha === 1 ? "#fbbf24" : "#a5b4fc");
    ctx.lineWidth = 1.5 * scale;

    ctx.beginPath();
    ctx.roundRect(x - (candleW / 2), Math.min(baseY, bodyTopY), candleW, bodyH, 3 * scale);
    ctx.fill();
    ctx.stroke();

    // Mum Taban Tutamacı (Eksen üzerinde sürükleme ipucu)
    if (alpha === 1) {
        ctx.beginPath();
        ctx.arc(x, baseY, 3.5 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "#fbbf24";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1 * scale;
        ctx.stroke();
    }

    // Mum Fitili
    const wickTopY = bodyTopY - (dir * (4 * scale));
    ctx.beginPath();
    ctx.moveTo(x, bodyTopY);
    ctx.lineTo(x, wickTopY);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    // Mum Alevi (Titreşen Animasyon)
    const flicker = Math.sin(animTime * 10 + x) * (1.8 * scale);
    const flameTipY = wickTopY - (dir * (flameH + flicker));

    const flameGrad = ctx.createRadialGradient(x, wickTopY - (dir * (flameH / 2)), 1.5 * scale, x, wickTopY - (dir * (flameH / 2)), flameH);
    if (alpha < 1) {
        // Sanal görüntü için holografik mavi/siyan alev tonu
        flameGrad.addColorStop(0, "#ffffff");
        flameGrad.addColorStop(0.3, "#a5f3fc");
        flameGrad.addColorStop(0.7, "#38bdf8");
        flameGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
    } else {
        // Gerçek alev tonu
        flameGrad.addColorStop(0, "#ffffff");
        flameGrad.addColorStop(0.3, "#fef08a");
        flameGrad.addColorStop(0.7, "#f97316");
        flameGrad.addColorStop(1, "rgba(239, 68, 68, 0)");
    }

    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(x - (5 * scale), wickTopY);
    ctx.quadraticCurveTo(x - (7 * scale), wickTopY - (dir * (flameH * 0.6)), x, flameTipY);
    ctx.quadraticCurveTo(x + (7 * scale), wickTopY - (dir * (flameH * 0.6)), x + (5 * scale), wickTopY);
    ctx.closePath();
    ctx.fill();

    // Zero-Canvas-Text: Mum üzerindeki etiket kaldırılmıştır, görsel saflık ve mobil optik netliği korunur.
    ctx.restore();
}

// --- 8.5. DENEY 7.5: ÇÖZÜNME HIZINI ETKİLEYEN FAKTÖRLER MOTORU ---

function setupDissolveControlsDOM() {
    // 1. Şablon Preset Butonları (Hızlı Bar & Sağ Panel)
    const presets = ["temp", "surface", "stir"];
    presets.forEach(p => {
        const btn = document.getElementById(`btn-preset-${p}`);
        const pill = document.getElementById(`pill-preset-${p}`);
        if (btn) btn.addEventListener('click', () => setDissolvePreset(p));
        if (pill) pill.addEventListener('click', () => setDissolvePreset(p));
    });

    // 2. Oynat / Duraklat Butonu
    const btnPlay = document.getElementById('btn-dissolve-play-pause');
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            const dissolve = labState.dissolve;
            if (dissolve.isFinished) {
                resetDissolveProgress();
            }
            dissolve.isPlaying = !dissolve.isPlaying;
            updateDissolvePlayButton(dissolve.isPlaying);
        });
    }

    // 3. Sıfırla / Yeni Deney Butonu
    const btnReset = document.getElementById('btn-dissolve-reset');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            resetDissolveExperiment();
            showLabToast("🔄 Çözeltiler başlangıç durumuna sıfırlandı");
        });
    }

    // 4. 3 Beher Bağımsız Ayar Dinleyicileri (Beher A, B, C)
    ["a", "b", "c"].forEach((bid, idx) => {
        const bUpper = bid.toUpperCase();
        // Sıcaklık Select
        const selTemp = document.getElementById(`select-beaker-${bid}-temp`);
        if (selTemp) {
            selTemp.addEventListener('change', (e) => {
                labState.dissolve.beakers[idx].temp = parseInt(e.target.value, 10);
                resetDissolveProgress();
                calculateDissolveTargets();
                showLabToast(`Beher ${bUpper} sıcaklığı ${e.target.value}°C yapıldı`);
            });
        }

        // Şeker Select
        const selSugar = document.getElementById(`select-beaker-${bid}-sugar`);
        if (selSugar) {
            selSugar.addEventListener('change', (e) => {
                labState.dissolve.beakers[idx].sugar = e.target.value;
                resetDissolveProgress();
                calculateDissolveTargets();
                const sName = e.target.value === "cube" ? "Küp" : e.target.value === "granulated" ? "Toz" : "Pudra";
                showLabToast(`Beher ${bUpper} şekeri ${sName} Şeker yapıldı`);
            });
        }

        // Karıştırıcı Butonu
        const btnStir = document.getElementById(`btn-beaker-${bid}-stir`);
        if (btnStir) {
            btnStir.addEventListener('click', () => {
                const beaker = labState.dissolve.beakers[idx];
                beaker.stirring = !beaker.stirring;
                btnStir.classList.toggle('stir-active', beaker.stirring);
                const span = btnStir.querySelector('span');
                if (span) span.textContent = beaker.stirring ? "Açık" : "Kapalı";
                resetDissolveProgress();
                calculateDissolveTargets();
                showLabToast(`Beher ${bUpper} karıştırıcısı ${beaker.stirring ? 'açıldı' : 'kapatıldı'}`);
            });
        }
    });

    // 5. Gözlemi Kaydet Butonu
    const btnRecord76 = document.getElementById('btn-record-data-7-6');
    if (btnRecord76) {
        btnRecord76.addEventListener('click', recordMeasurement);
    }
}

function updateDissolvePlayButton(isPlaying) {
    const btnPlay = document.getElementById('btn-dissolve-play-pause');
    const labelPlay = document.getElementById('label-dissolve-play');
    if (!btnPlay) return;
    if (isPlaying) {
        btnPlay.innerHTML = '<i class="fas fa-pause"></i> <span id="label-dissolve-play">Duraklat</span>';
        btnPlay.classList.add('active');
        showLabToast("▶️ Çözünme Başlatıldı (Kronometreler Sayıyor)");
    } else {
        btnPlay.innerHTML = '<i class="fas fa-play"></i> <span id="label-dissolve-play">Çözünmeyi Başlat</span>';
        btnPlay.classList.remove('active');
    }
}

function setDissolvePreset(preset) {
    const dissolve = labState.dissolve;
    dissolve.preset = preset;
    dissolve.isPlaying = false;
    updateDissolvePlayButton(false);

    // Preset butonlarını güncelle
    ["temp", "surface", "stir"].forEach(p => {
        const b = document.getElementById(`btn-preset-${p}`);
        const pill = document.getElementById(`pill-preset-${p}`);
        if (b) b.classList.toggle('active', p === preset);
        if (pill) pill.classList.toggle('active', p === preset);
    });

    const b = dissolve.beakers;

    if (preset === "temp") {
        // Bağımsız değişken: Sıcaklık (20°C vs 40°C vs 60°C)
        // Sabit: Toz şeker, Karıştırma kapalı
        b[0].temp = 20; b[0].sugar = "granulated"; b[0].stirring = false;
        b[1].temp = 40; b[1].sugar = "granulated"; b[1].stirring = false;
        b[2].temp = 60; b[2].sugar = "granulated"; b[2].stirring = false;
    } else if (preset === "surface") {
        // Bağımsız değişken: Temas yüzeyi (Küp vs Toz vs Pudra)
        // Sabit: 40°C su, Karıştırma kapalı
        b[0].temp = 40; b[0].sugar = "cube"; b[0].stirring = false;
        b[1].temp = 40; b[1].sugar = "granulated"; b[1].stirring = false;
        b[2].temp = 40; b[2].sugar = "powder"; b[2].stirring = false;
    } else if (preset === "stir") {
        // Bağımsız değişken: Karıştırma (Kapalı vs Açık)
        // Sabit: 40°C, Küp şeker
        b[0].temp = 40; b[0].sugar = "cube"; b[0].stirring = false;
        b[1].temp = 40; b[1].sugar = "cube"; b[1].stirring = true;
        b[2].temp = 40; b[2].sugar = "granulated"; b[2].stirring = true;
    }

    syncDissolveUIInputs();
    resetDissolveProgress();
    calculateDissolveTargets();

    const titles = {
        temp: "🌡️ 1. Sıcaklık Etkisi Testi Aktif (20°C / 40°C / 60°C)",
        surface: "✨ 2. Temas Yüzeyi Testi Aktif (Küp / Toz / Pudra)",
        stir: "🌀 3. Karıştırma Etkisi Testi Aktif (Durgun / Karıştırılan)"
    };
    showLabToast(titles[preset] || "Deney şablonu yüklendi");
}

function syncDissolveUIInputs() {
    const b = labState.dissolve.beakers;
    ["a", "b", "c"].forEach((bid, idx) => {
        const beaker = b[idx];
        const selTemp = document.getElementById(`select-beaker-${bid}-temp`);
        const selSugar = document.getElementById(`select-beaker-${bid}-sugar`);
        const btnStir = document.getElementById(`btn-beaker-${bid}-stir`);

        if (selTemp) selTemp.value = beaker.temp;
        if (selSugar) selSugar.value = beaker.sugar;
        if (btnStir) {
            btnStir.classList.toggle('stir-active', beaker.stirring);
            const span = btnStir.querySelector('span');
            if (span) span.textContent = beaker.stirring ? "Açık" : "Kapalı";
        }
    });
}

function resetDissolveProgress() {
    const dissolve = labState.dissolve;
    dissolve.isPlaying = false;
    dissolve.isFinished = false;
    updateDissolvePlayButton(false);

    dissolve.beakers.forEach(b => {
        b.elapsedTime = 0;
        b.progress = 0;
        b.isDissolved = false;
        b.particles = initBeakerParticles(b);
    });

    updateDissolveStopwatchDOM();
}

function resetDissolveExperiment() {
    setDissolvePreset(labState.dissolve.preset || "temp");
}

function initDissolveState() {
    calculateDissolveTargets();
    resetDissolveProgress();
    syncDissolveUIInputs();
}

function calculateDissolveTargets() {
    const dissolve = labState.dissolve;
    dissolve.beakers.forEach(b => {
        const baseTime = 60.0; // 20°C, küp, durgun için baz süre
        
        let fT = 1.0;
        if (b.temp === 20) fT = 1.0;
        else if (b.temp === 40) fT = 0.65;
        else if (b.temp === 60) fT = 0.40;
        else if (b.temp === 80) fT = 0.25;

        let fS = 1.0;
        if (b.sugar === "cube") fS = 1.0;
        else if (b.sugar === "granulated") fS = 0.55;
        else if (b.sugar === "powder") fS = 0.28;

        let fStir = b.stirring ? 0.45 : 1.0;

        b.targetTime = Math.max(3.0, Math.round(baseTime * fT * fS * fStir * 10) / 10);
    });

    updateDissolvePedagogicalBox();
}

function updateDissolvePedagogicalBox() {
    const dissolve = labState.dissolve;
    const box = document.getElementById('dissolve-pedagogical-box');
    const icon = document.getElementById('dissolve-pedagogical-icon');
    const title = document.getElementById('dissolve-pedagogical-title');
    const text = document.getElementById('dissolve-pedagogical-text');
    if (!box || !title || !text) return;

    const b = dissolve.beakers;

    if (dissolve.isFinished) {
        box.className = "lab-pedagogical-card is-work";
        if (icon) icon.innerHTML = '<i class="fas fa-check-circle"></i>';
        if (title) title.textContent = "🏆 Çözünme Tamamlandı (Bilimsel Sonuç Çıkarımı):";
        
        if (dissolve.preset === "temp") {
            text.textContent = `Sıcaklık 20°C'den 60°C'ye çıktıkça çözünme süresi ${b[0].targetTime.toFixed(1)} sn'den ${b[2].targetTime.toFixed(1)} sn'ye düşmüştür! Sıcaklık arttıkça çözücü su taneciklerinin kinetik enerjisi artar ve çözünme hızlanır.`;
        } else if (dissolve.preset === "surface") {
            text.textContent = `Temas yüzeyi arttıkça (Küp ➔ Toz ➔ Pudra Şekeri) çözünme süresi ${b[0].targetTime.toFixed(1)} sn'den ${b[2].targetTime.toFixed(1)} sn'ye inmiştir! Katı tanecik boyutu küçüldükçe temas yüzeyi genişler ve çözünme hızlanır.`;
        } else if (dissolve.preset === "stir") {
            text.textContent = `Karıştırma işlemi uygulandığında çözünme süresi ${b[0].targetTime.toFixed(1)} sn'den ${b[1].targetTime.toFixed(1)} sn'ye inmiştir! Karıştırma taneciklerin çözücü ile temas sıklığını artırarak çözünmeyi hızlandırır.`;
        } else {
            text.textContent = `En hızlı çözünme ${Math.min(b[0].targetTime, b[1].targetTime, b[2].targetTime).toFixed(1)} sn ile tamamlanmıştır. Sıcaklık, temas yüzeyi ve karıştırma çözünme hızını doğrudan artıran 3 temel faktördür.`;
        }
        return;
    }

    box.className = "lab-pedagogical-card is-work";
    if (icon) icon.innerHTML = '<i class="fas fa-vial"></i>';

    if (dissolve.preset === "temp") {
        title.textContent = "🌡️ Sıcaklık Etkisi Hipotezi (Kontrollü Deney):";
        text.textContent = `Sıcaklık arttıkça su moleküllerinin kinetik enerjisi ve hareket sürati artar. Şeker tanecikleriyle çarpışma şiddetlenerek çözünme süresi kısalır (${b[0].targetTime.toFixed(1)}s ➔ ${b[1].targetTime.toFixed(1)}s ➔ ${b[2].targetTime.toFixed(1)}s).`;
    } else if (dissolve.preset === "surface") {
        title.textContent = "✨ Temas Yüzeyi (Tanecik Boyutu) Hipotezi:";
        text.textContent = `Küp şekerden toz ve pudra şekerine geçildikçe katının temas yüzeyi kat kat genişler. Su ile aynı anda temas eden tanecik sayısı çoğaldığı için çözünme süresi kısalır (Pudra: ${b[2].targetTime.toFixed(1)}s < Toz: ${b[1].targetTime.toFixed(1)}s < Küp: ${b[0].targetTime.toFixed(1)}s).`;
    } else if (dissolve.preset === "stir") {
        title.textContent = "🌀 Karıştırma Etkisi Hipotezi:";
        text.textContent = `Çözelti karıştırıldığında su molekülleri ile şeker taneciklerinin temas sıklığı artar. Karıştırılan beherde çözünme süresi (${b[1].targetTime.toFixed(1)}s), durgun behere (${b[0].targetTime.toFixed(1)}s) göre belirgin biçimde kısalır.`;
    } else {
        title.textContent = "🔬 Çözünme Hızı Araştırması:";
        text.textContent = `3 beherin parametrelerini bağımsız olarak ayarlayıp "Çözünmeyi Başlat" butonuna basarak süreleri karşılaştırın.`;
    }
}

function updateDissolveStopwatchDOM() {
    const b = labState.dissolve.beakers;
    const chips = [
        document.getElementById('stat-beaker-a-time'),
        document.getElementById('stat-beaker-b-time'),
        document.getElementById('stat-beaker-c-time')
    ];
    chips.forEach((c, idx) => {
        if (!c) return;
        const bk = b[idx];
        if (bk.isDissolved) {
            c.textContent = `${bk.targetTime.toFixed(1)} s ✓`;
            c.style.color = '#34d399';
            c.style.borderColor = 'rgba(52, 211, 153, 0.4)';
        } else {
            c.textContent = `${bk.elapsedTime.toFixed(1)} s`;
            c.style.color = '#facc15';
            c.style.borderColor = 'rgba(250, 204, 21, 0.3)';
        }
    });

    // Metrik Şeridi (#metrics-bar-7-6) Güncellemesi
    const mb1 = document.getElementById('mbar-76-b1');
    const mb2 = document.getElementById('mbar-76-b2');
    const mb3 = document.getElementById('mbar-76-b3');
    const mbStatus = document.getElementById('mbar-76-status');

    const sugarNames = { powder: "Pudra", granulated: "Toz", cube: "Küp" };
    if (mb1 && b[0]) {
        const timeStr = b[0].isDissolved ? `${b[0].targetTime.toFixed(1)}s ✓` : `${b[0].elapsedTime.toFixed(1)}s`;
        const tVal = b[0].temp !== undefined ? b[0].temp : b[0].temperature;
        const isStir = b[0].stirring !== undefined ? b[0].stirring : b[0].isStirred;
        mb1.textContent = `${tVal}°C · ${sugarNames[b[0].sugar] || b[0].sugar}${isStir ? ' · 🌀' : ''} (${timeStr})`;
    }
    if (mb2 && b[1]) {
        const timeStr = b[1].isDissolved ? `${b[1].targetTime.toFixed(1)}s ✓` : `${b[1].elapsedTime.toFixed(1)}s`;
        const tVal = b[1].temp !== undefined ? b[1].temp : b[1].temperature;
        const isStir = b[1].stirring !== undefined ? b[1].stirring : b[1].isStirred;
        mb2.textContent = `${tVal}°C · ${sugarNames[b[1].sugar] || b[1].sugar}${isStir ? ' · 🌀' : ''} (${timeStr})`;
    }
    if (mb3 && b[2]) {
        const timeStr = b[2].isDissolved ? `${b[2].targetTime.toFixed(1)}s ✓` : `${b[2].elapsedTime.toFixed(1)}s`;
        const tVal = b[2].temp !== undefined ? b[2].temp : b[2].temperature;
        const isStir = b[2].stirring !== undefined ? b[2].stirring : b[2].isStirred;
        mb3.textContent = `${tVal}°C · ${sugarNames[b[2].sugar] || b[2].sugar}${isStir ? ' · 🌀' : ''} (${timeStr})`;
    }
    if (mbStatus) {
        if (b.every(bk => bk.isDissolved)) {
            mbStatus.textContent = "🏆 Çözünme Tamamlandı: Sıcaklık yüksek, tanecik küçük (pudra) ve karıştırılan beher en hızlı çözündü!";
            mbStatus.style.color = "#34d399";
        } else if (labState.dissolve.isPlaying) {
            mbStatus.textContent = "⏱️ Çözünme Sürüyor: Tanecikler çözücü içine dağılıyor...";
            mbStatus.style.color = "#facc15";
        } else {
            mbStatus.textContent = "🧪 Sıcaklık, Temas Yüzeyi ve Karıştırma Çözünmeyi Hızlandırır";
            mbStatus.style.color = "#38bdf8";
        }
    }
}

function initBeakerParticles(beaker) {
    const particles = [];
    const count = beaker.sugar === "powder" ? 45 : beaker.sugar === "granulated" ? 30 : 18;
    for (let i = 0; i < count; i++) {
        particles.push({
            relX: (Math.random() - 0.5) * 80,
            relY: Math.random() * 80,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -0.2 - Math.random() * 0.6,
            radius: beaker.sugar === "powder" ? 1.5 : beaker.sugar === "granulated" ? 2.5 : 4.0,
            alpha: 1.0,
            seed: Math.random() * Math.PI * 2
        });
    }
    return particles;
}

function updateDissolvePhysics() {
    const dissolve = labState.dissolve;
    if (!dissolve.isPlaying) return;

    const dt = (1 / 60) * dissolve.timeScale;
    let allDone = true;

    dissolve.beakers.forEach(b => {
        if (b.isDissolved) return;

        b.elapsedTime += dt;
        if (b.elapsedTime >= b.targetTime) {
            b.elapsedTime = b.targetTime;
            b.progress = 1.0;
            b.isDissolved = true;
        } else {
            b.progress = b.elapsedTime / b.targetTime;
            allDone = false;
        }

        // Karıştırıcı açısı
        if (b.stirring) {
            b.stirAngle += 0.25;
        }

        // Parçacık simülasyonu
        if (b.particles) {
            b.particles.forEach(p => {
                if (b.stirring) {
                    p.seed += 0.08;
                    p.relX = Math.cos(p.seed) * (35 + Math.sin(p.seed * 2) * 15);
                    p.relY += p.vy * 0.5;
                } else {
                    p.relX += p.vx + (Math.random() - 0.5) * (b.temp / 100);
                    p.relY += p.vy;
                }

                if (p.relY < 0) p.relY = 90;
                p.alpha = Math.max(0, 1.0 - b.progress);
            });
        }
    });

    updateDissolveStopwatchDOM();

    if (allDone && !dissolve.isFinished) {
        dissolve.isFinished = true;
        dissolve.isPlaying = false;
        updateDissolvePlayButton(false);
        updateDissolvePedagogicalBox();
        showLabToast("🏆 3 Beherde de çözünme tamamlandı! Sonuçları inceleyin.");
    }
}

// --- DENEY 7.5 CANVAS 2D ÇİZİM MOTORU ---

function drawDissolveSimulation() {
    if (!ctx || !canvas) return;
    const dissolve = labState.dissolve;
    const w = canvas.width;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // 1. Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // 2. Laboratuvar Tezgahı Zemin Çizgisi
    const benchY = 414;
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(30, benchY);
    ctx.lineTo(770, benchY);
    ctx.stroke();

    // Tezgah altı ızgara taraması
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.3)';
    ctx.lineWidth = 1;
    for (let x = 30; x <= 770; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, benchY);
        ctx.lineTo(x - 8, benchY + 12);
        ctx.stroke();
    }

    // 3. 3 Beher Çizimi (A, B, C)
    const beakerCenters = [160, 400, 640];
    dissolve.beakers.forEach((b, idx) => {
        const cx = beakerCenters[idx];
        drawSingleBeakerAssembly(ctx, b, cx, benchY);
    });

    ctx.restore();
}

function drawSingleBeakerAssembly(ctx, beaker, cx, benchY) {
    const beakerW = 150;
    const beakerH = 180;
    const beakerBottom = benchY - 14;
    const beakerTop = beakerBottom - beakerH;
    const beakerLeft = cx - beakerW / 2;
    const waterTop = beakerTop + 55; // 100 mL seviyesi
    const waterH = beakerBottom - waterTop;

    // 1. Manyetik Karıştırıcı / Isıtıcı Tabla
    drawMagneticHotplate(ctx, cx, beakerBottom, beaker.temp, beaker.stirring);

    // 2. Su Sıvı Kütlesi (Sıcaklığa göre renk gradyanı)
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(beakerLeft + 4, waterTop, beakerW - 8, waterH, [0, 0, 8, 8]);
    ctx.clip();

    let waterGrad = ctx.createLinearGradient(cx, waterTop, cx, beakerBottom);
    if (beaker.temp <= 25) {
        // Soğuk mavi
        waterGrad.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
        waterGrad.addColorStop(1, 'rgba(14, 165, 233, 0.45)');
    } else if (beaker.temp <= 45) {
        // Ilık camgöbeği/turkuaz
        waterGrad.addColorStop(0, 'rgba(45, 212, 191, 0.25)');
        waterGrad.addColorStop(1, 'rgba(20, 184, 166, 0.48)');
    } else {
        // Sıcak amber/turuncu
        waterGrad.addColorStop(0, 'rgba(251, 146, 60, 0.25)');
        waterGrad.addColorStop(1, 'rgba(249, 115, 22, 0.50)');
    }
    ctx.fillStyle = waterGrad;
    ctx.fillRect(beakerLeft, waterTop, beakerW, waterH);

    // Su Menisküs Çizgisi
    ctx.strokeStyle = beaker.temp > 45 ? 'rgba(251, 146, 60, 0.6)' : 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(beakerLeft + 4, waterTop);
    ctx.quadraticCurveTo(cx, waterTop + 4, beakerLeft + beakerW - 4, waterTop);
    ctx.stroke();

    // 3. Karıştırma Girdap Çizgileri
    if (beaker.stirring) {
        drawBeakerVortex(ctx, cx, waterTop, beakerBottom);
    }

    // 4. Parçacık Animasyonu (Çözünen Mikro Tanecikler)
    drawBeakerParticles(ctx, beaker, cx, beakerBottom);

    // 5. Çözünmemiş Katı Şeker (Tabanda)
    drawBeakerSolidSugar(ctx, beaker, cx, beakerBottom);

    // 6. Manyetik Balık (Karıştırma Çubuğu)
    drawMagneticStirBar(ctx, cx, beakerBottom - 8, beaker.stirring, beaker.stirAngle);

    ctx.restore();

    // 7. Dereceli Cam Beher Gövdesi ve Çizgileri
    drawBeakerGlassware(ctx, beakerLeft, beakerTop, beakerW, beakerH, cx, waterTop);

    // 8. Daldırılmış Dijital Termometre
    drawDigitalThermometer(ctx, beakerLeft + 22, beakerTop - 35, beaker.temp);

    // 9. Tepe Dijital Kronometre ve Beher Başlığı
    drawBeakerHeaderAndStopwatch(ctx, beaker, cx, beakerTop - 45);
}

function drawMagneticHotplate(ctx, cx, topY, temp, stirring) {
    const plateW = 164;
    const plateH = 20;
    const plateX = cx - plateW / 2;

    ctx.save();
    // Metal gövde
    const pGrad = ctx.createLinearGradient(cx, topY, cx, topY + plateH);
    pGrad.addColorStop(0, '#334155');
    pGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = pGrad;
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(plateX, topY, plateW, plateH, [4, 4, 8, 8]);
    ctx.fill();
    ctx.stroke();

    // Isıtıcı LED (Kırmızı / Turuncu)
    const heatLedColor = temp >= 40 ? '#ef4444' : '#64748b';
    ctx.fillStyle = heatLedColor;
    ctx.shadowColor = temp >= 40 ? '#ef4444' : 'transparent';
    ctx.shadowBlur = temp >= 40 ? 6 : 0;
    ctx.beginPath();
    ctx.arc(cx - 50, topY + 10, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Karıştırıcı LED (Mavi / Cyan)
    ctx.fillStyle = stirring ? '#38bdf8' : '#64748b';
    ctx.shadowColor = stirring ? '#38bdf8' : 'transparent';
    ctx.shadowBlur = stirring ? 6 : 0;
    ctx.beginPath();
    ctx.arc(cx - 36, topY + 10, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.restore();
}

function drawBeakerGlassware(ctx, x, y, w, h, cx, waterTop) {
    ctx.save();
    // Cam kontur
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    // Sol ağız çıkıntısı (beaker spout)
    ctx.moveTo(x - 5, y);
    ctx.lineTo(x, y + 6);
    // Sol kenar
    ctx.lineTo(x, y + h - 8);
    // Taban kavis
    ctx.quadraticCurveTo(x, y + h, x + 8, y + h);
    ctx.lineTo(x + w - 8, y + h);
    ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - 8);
    // Sağ kenar
    ctx.lineTo(x + w, y);
    ctx.stroke();

    // Cam ışıltısı / Yansıma
    const rGrad = ctx.createLinearGradient(x, y, x + 15, y);
    rGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    rGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = rGrad;
    ctx.fillRect(x + 2, y + 10, 15, h - 20);

    // Hacim Dereceleri (20, 40, 60, 80, 100 mL)
    const ticks = [
        { ml: "100 mL", ty: waterTop },
        { ml: "80 mL", ty: waterTop + 24 },
        { ml: "60 mL", ty: waterTop + 48 },
        { ml: "40 mL", ty: waterTop + 72 },
        { ml: "20 mL", ty: waterTop + 96 }
    ];

    ticks.forEach(t => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + w - 14, t.ty);
        ctx.lineTo(x + w, t.ty);
        ctx.stroke();
    });

    ctx.restore();
}

function drawDigitalThermometer(ctx, x, y, temp) {
    ctx.save();
    // Cam prob borusu (sıvı içine dalar)
    ctx.strokeStyle = 'rgba(203, 213, 225, 0.85)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y + 30);
    ctx.lineTo(x, y + 160);
    ctx.stroke();

    // Prob ucu
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.arc(x, y + 160, 3.5, 0, Math.PI * 2);
    ctx.fill();

    // Dijital Başlık Kutusu ve LED Seviye İndikatörü (Zero-Canvas-Text: Sayısal sıcaklık alt metrik şeridinde ve kontrollerdedir)
    const headW = 44;
    const headH = 26;
    const headX = x - headW / 2;
    const headY = y;

    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = temp >= 60 ? '#fb923c' : temp >= 40 ? '#facc15' : '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(headX, headY, headW, headH, 4);
    ctx.fill();
    ctx.stroke();

    // LED İndikatör Çubuğu
    ctx.fillStyle = temp >= 60 ? '#fb923c' : temp >= 40 ? '#facc15' : '#38bdf8';
    ctx.beginPath();
    ctx.roundRect(headX + 8, headY + 8, headW - 16, headH - 16, 2);
    ctx.fill();

    ctx.restore();
}

function drawBeakerVortex(ctx, cx, waterTop, beakerBottom) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    const midY = (waterTop + beakerBottom) / 2;

    ctx.beginPath();
    ctx.ellipse(cx, midY - 20, 35, 8, 0, 0, Math.PI * 2);
    ctx.ellipse(cx, midY + 15, 22, 6, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Dönen mikro hava kabarcıkları (Vektörel girdap partikülleri)
    for (let i = 0; i < 14; i++) {
        const bPhase = animTime * 4 + i * (Math.PI * 2 / 14);
        const bRad = 10 + (i % 3) * 9;
        const bx = cx + Math.cos(bPhase) * bRad;
        const by = waterTop + 15 + ((animTime * 20 + i * 11) % (beakerBottom - waterTop - 25));
        const bSize = 1.0 + (i % 3) * 0.6;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
        ctx.beginPath();
        ctx.arc(bx, by, bSize, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

function drawBeakerParticles(ctx, beaker, cx, beakerBottom) {
    if (!beaker.particles) return;
    ctx.save();
    const waterBaseY = beakerBottom - 35;

    beaker.particles.forEach(p => {
        if (p.alpha <= 0.02) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(cx + p.relX, waterBaseY - p.relY, p.radius, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();
}

function drawBeakerSolidSugar(ctx, beaker, cx, beakerBottom) {
    if (beaker.isDissolved || beaker.progress >= 0.99) return;
    ctx.save();
    const remain = Math.max(0, 1.0 - beaker.progress);

    if (beaker.sugar === "cube") {
        // Küp Şeker (3D İzometrik Blok)
        const size = 26 * Math.sqrt(remain);
        const y = beakerBottom - 10 - size / 2;

        ctx.translate(cx, y);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
        ctx.strokeStyle = 'rgba(203, 213, 225, 0.8)';
        ctx.lineWidth = 1.5;

        // Küp ön yüz
        ctx.beginPath();
        ctx.rect(-size / 2, -size / 2, size, size);
        ctx.fill();
        ctx.stroke();

        // Üst yüz kapağı
        ctx.fillStyle = 'rgba(241, 245, 249, 0.95)';
        ctx.beginPath();
        ctx.moveTo(-size / 2, -size / 2);
        ctx.lineTo(-size / 2 + size * 0.35, -size / 2 - size * 0.35);
        ctx.lineTo(size / 2 + size * 0.35, -size / 2 - size * 0.35);
        ctx.lineTo(size / 2, -size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    } else if (beaker.sugar === "granulated") {
        // Toz Şeker (Tabanda yığıntı)
        const heapW = 54 * remain;
        const heapH = 14 * remain;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
        ctx.beginPath();
        ctx.ellipse(cx, beakerBottom - 10, heapW / 2, heapH, 0, 0, Math.PI * 2);
        ctx.fill();
    } else if (beaker.sugar === "powder") {
        // Pudra Şekeri (İnce taban bulutu)
        const cloudW = 70 * remain;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.beginPath();
        ctx.ellipse(cx, beakerBottom - 8, cloudW / 2, 6 * remain, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

function drawMagneticStirBar(ctx, cx, y, stirring, angle) {
    ctx.save();
    ctx.translate(cx, y);
    if (stirring) {
        ctx.rotate(angle);
    }
    // Manyetik teflon kaplı beyaz balık
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(-12, -3.5, 24, 7, 3);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawBeakerHeaderAndStopwatch(ctx, beaker, cx, topY) {
    ctx.save();
    // Zero-Canvas-Text: Beher kimliği ve kronometre süresi alt metrik şeridinde (#metrics-bar-7-5) yer alır.
    // Tuval üzerinde sadece minimal renkli durum diski çizilir.
    const discColor = beaker.isDissolved ? '#34d399' : (beaker.id === "A" ? '#38bdf8' : beaker.id === "B" ? '#2dd4bf' : '#fb923c');
    ctx.fillStyle = discColor;
    ctx.beginPath();
    ctx.arc(cx, topY + 22, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

// --- 8.6. DENEY 7.6: KARIŞIMLARIN AYRILMASI (AYIRMA HUNİSİ & BASİT DAMITMA) MOTORU ---

function setupSeparationControlsDOM() {
    // 1. Mod Geçiş Butonları (Ayırma Hunisi vs Basit Damıtma)
    const btnFunnel = document.getElementById('btn-mode-funnel');
    const btnDistill = document.getElementById('btn-mode-distill');

    if (btnFunnel) btnFunnel.addEventListener('click', () => setSeparationMode("funnel"));
    if (btnDistill) btnDistill.addEventListener('click', () => setSeparationMode("distill"));

    // 2. Ayırma Hunisi Kontrolleri
    const btnValve = document.getElementById('btn-funnel-valve');
    const btnRefill = document.getElementById('btn-funnel-refill');

    if (btnValve) btnValve.addEventListener('click', toggleFunnelValve);
    if (btnRefill) btnRefill.addEventListener('click', refillFunnel);

    // 3. Basit Damıtma Kontrolleri
    const btnHeater = document.getElementById('btn-distill-heater');
    const btnResetDistill = document.getElementById('btn-distill-reset');

    if (btnHeater) btnHeater.addEventListener('click', toggleDistillHeater);
    if (btnResetDistill) btnResetDistill.addEventListener('click', resetDistillApparatus);

    // 4. Veri Defterine Kaydet
    const btnRecord75 = document.getElementById('btn-record-data-7-5');
    if (btnRecord75) btnRecord75.addEventListener('click', recordMeasurement);
}

function setSeparationMode(mode) {
    labState.separation.mode = mode;
    const isFunnel = (mode === "funnel");

    // Buton aktiflikleri
    const btnFunnel = document.getElementById('btn-mode-funnel');
    const btnDistill = document.getElementById('btn-mode-distill');
    if (btnFunnel) btnFunnel.classList.toggle('active', isFunnel);
    if (btnDistill) btnDistill.classList.toggle('active', !isFunnel);

    // Hızlı kontrol grupları
    const grpFunnel = document.getElementById('group-controls-funnel');
    const grpDistill = document.getElementById('group-controls-distill');
    if (grpFunnel) grpFunnel.classList.toggle('is-hidden', !isFunnel);
    if (grpDistill) grpDistill.classList.toggle('is-hidden', isFunnel);

    // Metrik panelleri
    const statsFunnel = document.getElementById('stats-grid-funnel');
    const statsDistill = document.getElementById('stats-grid-distill');
    if (statsFunnel) statsFunnel.classList.toggle('is-hidden', !isFunnel);
    if (statsDistill) statsDistill.classList.toggle('is-hidden', isFunnel);

    // Prensip rozeti
    const badge = document.getElementById('sep-principle-badge');
    const pIcon = document.getElementById('sep-principle-icon');
    const pTitle = document.getElementById('sep-principle-title');
    const pDesc = document.getElementById('sep-principle-desc');

    if (badge && pIcon && pTitle && pDesc) {
        if (isFunnel) {
            badge.classList.remove('distill-mode');
            pIcon.innerHTML = '<i class="fas fa-filter"></i>';
            pTitle.textContent = "YOĞUNLUK FARKI (Heterojen Sıvı-Sıvı)";
            pDesc.textContent = "Birbirine karışmayan (emülsiyon) sıvılardan yoğunluğu büyük olan (Su, d=1.0 g/cm³) altta, yoğunluğu küçük olan (Zeytinyağı, d=0.9 g/cm³) üstte toplanır.";
        } else {
            badge.classList.add('distill-mode');
            pIcon.innerHTML = '<i class="fas fa-fire"></i>';
            pTitle.textContent = "KAYNAMA NOKTASI FARKI (Homojen Sıvı-Sıvı)";
            pDesc.textContent = "Birbiri içinde homojen karışan (çözelti) sıvılardan kaynama noktası düşük olan (Etil Alkol, 78°C) önce buharlaşır ve kondenserde yoğuşarak saf olarak ayrılır.";
        }
    }

    updateSeparationPedagogicalBox();
    updateSeparationMetricsDOM();
    showLabToast(isFunnel ? "🧪 Ayırma Hunisi (Yoğunluk Farkı) Modu Aktif" : "🔥 Basit Damıtma (Kaynama Noktası Farkı) Modu Aktif");
}

function toggleFunnelValve() {
    const f = labState.separation.funnel;
    f.isValveOpen = !f.isValveOpen;

    const lblValve = document.getElementById('label-funnel-valve');
    const btnValve = document.getElementById('btn-funnel-valve');
    if (lblValve) lblValve.textContent = f.isValveOpen ? "Musluğu Kapat" : "Musluğu Aç";
    if (btnValve) btnValve.classList.toggle('active', f.isValveOpen);

    updateSeparationPedagogicalBox();
    showLabToast(f.isValveOpen ? "🚰 Ayırma hunisi musluğu açıldı" : "🔒 Musluk kapatıldı");
}

function refillFunnel() {
    const f = labState.separation.funnel;
    f.isValveOpen = false;
    f.waterVolume = 100.0;
    f.oilVolume = 100.0;
    f.collectedWater = 0.0;
    f.leakedOil = 0.0;
    f.efficiency = 100.0;
    f.drops = [];

    const lblValve = document.getElementById('label-funnel-valve');
    const btnValve = document.getElementById('btn-funnel-valve');
    if (lblValve) lblValve.textContent = "Musluğu Aç";
    if (btnValve) btnValve.classList.remove('active');

    updateSeparationPedagogicalBox();
    updateSeparationMetricsDOM();
    showLabToast("🔄 Ayırma hunisi 100 mL su ve 100 mL zeytinyağı ile yeniden dolduruldu");
}

function toggleDistillHeater() {
    const d = labState.separation.distillation;
    d.isHeating = !d.isHeating;

    const lblHeater = document.getElementById('label-distill-heater');
    const btnHeater = document.getElementById('btn-distill-heater');
    if (lblHeater) lblHeater.textContent = d.isHeating ? "Isıtıcıyı Durdur" : "Isıtıcıyı Başlat";
    if (btnHeater) btnHeater.classList.toggle('active', d.isHeating);

    updateSeparationPedagogicalBox();
    showLabToast(d.isHeating ? "🔥 Isıtıcı başlatıldı (Karışım ısınıyor)" : "❄️ Isıtıcı durduruldu");
}

function resetDistillApparatus() {
    const d = labState.separation.distillation;
    d.isHeating = false;
    d.temp = 20.0;
    d.alcoholVolume = 100.0;
    d.waterVolume = 100.0;
    d.distilledAlcohol = 0.0;
    d.isBoiling = false;
    d.boilingPhase = "warming";
    d.bubbles = [];
    d.condenserDrops = [];
    d.collectionDrops = [];

    const lblHeater = document.getElementById('label-distill-heater');
    const btnHeater = document.getElementById('btn-distill-heater');
    if (lblHeater) lblHeater.textContent = "Isıtıcıyı Başlat";
    if (btnHeater) btnHeater.classList.remove('active');

    updateSeparationPedagogicalBox();
    updateSeparationMetricsDOM();
    showLabToast("🔄 Damıtma düzeneği sıfırlandı (20°C, 200 mL karışım)");
}

function resetSeparationExperiment() {
    if (labState.separation.mode === "funnel") {
        refillFunnel();
    } else {
        resetDistillApparatus();
    }
}

function initSeparationState() {
    setSeparationMode(labState.separation.mode || "funnel");
    updateSeparationMetricsDOM();
    updateSeparationPedagogicalBox();
}

function updateSeparationPedagogicalBox() {
    const sep = labState.separation;
    const box = document.getElementById('sep-pedagogical-box');
    const pIcon = document.getElementById('sep-pedagogical-icon');
    const pTitle = document.getElementById('sep-pedagogical-title');
    const pText = document.getElementById('sep-pedagogical-text');
    if (!box || !pIcon || !pTitle || !pText) return;

    if (sep.mode === "funnel") {
        const f = sep.funnel;
        if (f.isValveOpen) {
            if (f.waterVolume > 12) {
                box.className = "lab-pedagogical-card is-work";
                pIcon.innerHTML = '<i class="fas fa-faucet"></i>';
                pTitle.textContent = "🚰 Su Erlenmayere Boşalıyor...";
                pText.textContent = `Yoğunluğu büyük olan su (d = 1.0 g/cm³) altta olduğu için musluktan ilk olarak akar. Arayüz çizgisi musluğa yaklaşırken dikkatli olun! (Kalan Su: ${f.waterVolume.toFixed(1)} mL)`;
            } else if (f.waterVolume > 0) {
                box.className = "lab-pedagogical-card no-work";
                pIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
                pTitle.textContent = "⚠️ DİKKAT: Faz Sınırı Muslukta!";
                pText.textContent = "Su tükenmek üzere! Zeytinyağının (0.9 g/cm³) erlenmayere sızmaması ve saflığın bozulmaması için musluğu HEMEN KAPATIN!";
            } else if (f.leakedOil > 0) {
                box.className = "lab-pedagogical-card no-work";
                pIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
                pTitle.textContent = "❌ Zeytinyağı Sızdı! (Musluk Açık Unutuldu)";
                pText.textContent = `Su bittiği halde musluk kapatılmadığı için zeytinyağı erlene aktı (${f.leakedOil.toFixed(1)} mL). Karışım tekrar bozuldu ve ayırma verimi düştü!`;
            }
        } else {
            if (f.collectedWater >= 95 && f.leakedOil === 0) {
                box.className = "lab-pedagogical-card is-work";
                pIcon.innerHTML = '<i class="fas fa-award"></i>';
                pTitle.textContent = "🏆 Mükemmel Ayırma Başarısı (%100 Verim)!";
                pText.textContent = "Musluğu tam zamanında kapattınız! Su erlenmayerde, zeytinyağı ise ayırma hunisinde %100 saflıkla ayrıldı. Yoğunluk farkıyla ayırma kusursuz tamamlandı.";
            } else if (f.collectedWater > 0 && f.leakedOil === 0) {
                box.className = "lab-pedagogical-card is-work";
                pIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
                pTitle.textContent = "ℹ️ Kısmi Ayırma (Musluk Erken Kapatıldı)";
                pText.textContent = `Musluk biraz erken kapatıldığı için hunide ${f.waterVolume.toFixed(1)} mL su kaldı. Musluğu tekrar açarak suyu tamamlayabilirsiniz.`;
            } else if (f.leakedOil > 0) {
                box.className = "lab-pedagogical-card no-work";
                pIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
                pTitle.textContent = `⚠️ Eksik Saflık (Verim: %${f.efficiency.toFixed(0)})`;
                pText.textContent = `Erlene ${f.leakedOil.toFixed(1)} mL zeytinyağı sızdı. Huniyi tekrar doldurarak musluğu tam zamanında kapatmayı deneyin.`;
            } else {
                box.className = "lab-pedagogical-card is-work";
                pIcon.innerHTML = '<i class="fas fa-filter"></i>';
                pTitle.textContent = "🔬 Ayırma Hunisi (Yoğunluk Farkı)";
                pText.textContent = "Zeytinyağı (0.9 g/cm³) üstte, su (1.0 g/cm³) alttadır. Musluğu açarak deneyi başlatın ve faz sınırı musluğa ulaştığında kapatın.";
            }
        }
    } else {
        const d = sep.distillation;
        if (d.isHeating) {
            if (d.temp < 78.0) {
                box.className = "lab-pedagogical-card is-work";
                pIcon.innerHTML = '<i class="fas fa-temperature-high"></i>';
                pTitle.textContent = `🔥 Karışım Isınıyor (${d.temp.toFixed(1)}°C)`;
                pText.textContent = "Etil alkolün kaynama noktası 78°C, suyunki 100°C'dir. Sıcaklık 78°C'ye ulaşana kadar buharlaşma başlamaz.";
            } else if (d.alcoholVolume > 0) {
                box.className = "lab-pedagogical-card is-work";
                pIcon.innerHTML = '<i class="fas fa-vial"></i>';
                pTitle.textContent = "🧪 Hal Değişimi: Sıcaklık 78°C'de Sabit!";
                pText.textContent = `Kaynama noktası düşük olan etil alkol önce kaynar ve kondenserde soğuyarak toplama kabına damlar. Tüm alkol bitene kadar sıcaklık 78.0°C'de SABİT KALIR! (Damıtılan: ${d.distilledAlcohol.toFixed(1)} mL)`;
            } else {
                box.className = "lab-pedagogical-card no-work";
                pIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
                pTitle.textContent = "⚡ Alkol Bitti! Sıcaklık Yükseliyor";
                pText.textContent = `Balondaki tüm alkol buharlaşıp toplandı (100 mL). Sıcaklık suyun kaynama noktasına (100°C) tırmanıyor. Saf suyun buharlaşmasını önlemek için ısıtıcıyı kapatın!`;
            }
        } else {
            if (d.distilledAlcohol >= 95.0) {
                box.className = "lab-pedagogical-card is-work";
                pIcon.innerHTML = '<i class="fas fa-award"></i>';
                pTitle.textContent = "🏆 Damıtma Başarıyla Tamamlandı!";
                pText.textContent = "Etil alkol toplama kabında, saf su ise damıtma balonunda kalarak kaynama noktası farkıyla başarıyla saflaştırıldı.";
            } else {
                box.className = "lab-pedagogical-card is-work";
                pIcon.innerHTML = '<i class="fas fa-fire-alt"></i>';
                pTitle.textContent = "🔥 Basit Damıtma (Kaynama Noktası Farkı)";
                pText.textContent = "Homojen alkol-su karışımında etil alkol (78°C) sudan (100°C) önce buharlaşır. Isıtıcıyı başlatarak damıtmayı başlatın.";
            }
        }
    }
}

function updateSeparationMetricsDOM() {
    const sep = labState.separation;
    if (sep.mode === "funnel") {
        const f = sep.funnel;
        const mFunnelWater = document.getElementById('metric-funnel-water');
        const mErlenWater = document.getElementById('metric-erlen-water');
        const mFunnelOil = document.getElementById('metric-funnel-oil');
        const mFunnelEff = document.getElementById('metric-funnel-efficiency');

        if (mFunnelWater) mFunnelWater.textContent = `${f.waterVolume.toFixed(1)} mL`;
        if (mErlenWater) mErlenWater.textContent = `${f.collectedWater.toFixed(1)} mL`;
        if (mFunnelOil) mFunnelOil.textContent = `${f.oilVolume.toFixed(1)} mL`;
        if (mFunnelEff) {
            if (f.leakedOil > 0.5) {
                mFunnelEff.textContent = `%${f.efficiency.toFixed(0)} (Yağ Sızdı)`;
                mFunnelEff.style.color = "#ef4444";
            } else if (f.collectedWater >= 95) {
                mFunnelEff.textContent = `%100 (Kusursuz)`;
                mFunnelEff.style.color = "#34d399";
            } else {
                mFunnelEff.textContent = `%${f.efficiency.toFixed(0)} (Kısmi)`;
                mFunnelEff.style.color = "#facc15";
            }
        }
    } else {
        const d = sep.distillation;
        const mTemp = document.getElementById('metric-distill-temp');
        const mBoiling = document.getElementById('metric-distill-boiling');
        const mAlcohol = document.getElementById('metric-distill-alcohol');
        const mFlaskLiquid = document.getElementById('metric-distill-flask-liquid');

        if (mTemp) mTemp.textContent = `${d.temp.toFixed(1)} °C`;
        if (mBoiling) {
            if (d.isBoiling) {
                mBoiling.textContent = "Etil Alkol (Kaynıyor)";
                mBoiling.style.color = "#38bdf8";
            } else if (d.boilingPhase === "alcohol_finished") {
                mBoiling.textContent = "Alkol Bitti";
                mBoiling.style.color = "#facc15";
            } else if (d.temp >= 99.5) {
                mBoiling.textContent = "Su Kaynıyor (100°C)";
                mBoiling.style.color = "#ef4444";
            } else if (d.isHeating) {
                mBoiling.textContent = "Isınıyor (Buhar Yok)";
                mBoiling.style.color = "#fb923c";
            } else {
                mBoiling.textContent = "Yok (Durgun)";
                mBoiling.style.color = "#94a3b8";
            }
        }
        if (mAlcohol) mAlcohol.textContent = `${d.distilledAlcohol.toFixed(1)} mL`;
        if (mFlaskLiquid) mFlaskLiquid.textContent = `${(d.alcoholVolume + d.waterVolume).toFixed(1)} mL`;
    }

    // Metrik Şeridi (#metrics-bar-7-5) Güncellemesi
    const mbMethod = document.getElementById('mbar-75-method');
    const mbSubstances = document.getElementById('mbar-75-substances');
    const mbPhase = document.getElementById('mbar-75-phase');
    const mbStatus = document.getElementById('mbar-75-status');

    if (sep.mode === "funnel") {
        const f = sep.funnel;
        if (mbMethod) mbMethod.textContent = "Ayırma Hunisi (Yoğunluk Farkı)";
        if (mbSubstances) mbSubstances.textContent = "Zeytinyağı (d=0.9) + Su (d=1.0)";
        if (mbPhase) mbPhase.textContent = f.isValveOpen ? `Musluk Açık (Su: ${f.collectedWater.toFixed(1)} mL)` : (f.collectedWater >= 95 ? "Ayrım Tamamlandı" : "Musluk Kapalı");
        if (mbStatus) {
            if (f.leakedOil > 0.5) {
                mbStatus.textContent = "⚠️ Yağ erlene sızdı! Musluğu zamanında kapatmalısınız.";
                mbStatus.style.color = "#ef4444";
            } else if (f.collectedWater >= 95) {
                mbStatus.textContent = "🏆 Başarılı: Yoğunluğu büyük olan su alttan tamamen ayrıldı!";
                mbStatus.style.color = "#34d399";
            } else if (f.isValveOpen) {
                mbStatus.textContent = "💧 Su erlene akıyor, faz sınır çizgisine dikkat edin!";
                mbStatus.style.color = "#38bdf8";
            } else {
                mbStatus.textContent = "🧪 Yoğunluk farkıyla birbirine karışmayan heterojen sıvılar ayrılır";
                mbStatus.style.color = "#facc15";
            }
        }
    } else {
        const d = sep.distillation;
        if (mbMethod) mbMethod.textContent = "Basit Damıtma (K.N. Farkı)";
        if (mbSubstances) mbSubstances.textContent = `Karışım: ${d.temp.toFixed(1)}°C (Ref: Etanol 78°C / Su 100°C)`;
        if (mbPhase) mbPhase.textContent = d.isBoiling ? "Alkol Kaynıyor (78°C)" : (d.distilledAlcohol >= 95 ? "Alkol Saflaştırıldı" : (d.isHeating ? "Isınıyor" : "Durgun"));
        if (mbStatus) {
            if (d.distilledAlcohol >= 95) {
                mbStatus.textContent = "🏆 Başarılı: Etil alkol kaynama noktası farkıyla toplandı!";
                mbStatus.style.color = "#34d399";
            } else if (d.isBoiling) {
                mbStatus.textContent = "🔥 78°C: Alkol buharlaşıp soğutucuda yoğuşarak ayrılıyor";
                mbStatus.style.color = "#38bdf8";
            } else if (d.isHeating) {
                mbStatus.textContent = "⏳ Sıcaklık 78°C'ye yaklaşıyor, kaynama başlayacak";
                mbStatus.style.color = "#fb923c";
            } else {
                mbStatus.textContent = "💧 Kaynama noktaları farklı homojen sıvılar damıtmayla ayrılır";
                mbStatus.style.color = "#facc15";
            }
        }
    }
}

function updateSeparationPhysics() {
    const sep = labState.separation;

    // --- MOD 1: AYIRMA HUNİSİ FİZİĞİ ---
    if (sep.mode === "funnel") {
        const f = sep.funnel;

        // Musluk açısı yumuşak geçişi
        const targetAngle = f.isValveOpen ? Math.PI / 2 : 0;
        f.valveAngle += (targetAngle - f.valveAngle) * 0.25;

        if (f.isValveOpen) {
            if (f.waterVolume > 0) {
                f.waterVolume = Math.max(0, f.waterVolume - f.drainRate);
                f.collectedWater = Math.min(100.0, 100.0 - f.waterVolume);

                // Su damlaları üret
                if (Math.random() < 0.6) {
                    f.drops.push({
                        x: 440 + (Math.random() - 0.5) * 2,
                        y: 330,
                        vy: 3 + Math.random() * 2,
                        color: 'rgba(56, 189, 248, 0.85)',
                        size: 3.5
                    });
                }
            } else {
                // Su bitti, yağ sızıyor
                f.leakedOil += f.drainRate * 0.7;
                f.oilVolume = Math.max(0, 100.0 - f.leakedOil);
                f.efficiency = Math.max(0, 100.0 - f.leakedOil * 1.8);

                // Yağ damlaları üret
                if (Math.random() < 0.6) {
                    f.drops.push({
                        x: 440 + (Math.random() - 0.5) * 2,
                        y: 330,
                        vy: 2.8 + Math.random() * 1.8,
                        color: 'rgba(250, 204, 21, 0.9)',
                        size: 3.8
                    });
                }
            }
        }

        // Damlaları güncelle
        const groundErlenY = 430 - (f.collectedWater + f.leakedOil) * 0.45;
        for (let i = f.drops.length - 1; i >= 0; i--) {
            const drop = f.drops[i];
            drop.y += drop.vy;
            drop.vy += 0.25;
            if (drop.y >= groundErlenY) {
                f.drops.splice(i, 1);
            }
        }

        // Verim hesabı (musluk kapalıyken)
        if (!f.isValveOpen) {
            if (f.leakedOil > 0.5) {
                f.efficiency = Math.max(0, 100.0 - f.leakedOil * 2.0);
            } else if (f.waterVolume <= 0.5) {
                f.efficiency = 100.0;
            } else {
                f.efficiency = (f.collectedWater / 100.0) * 100.0;
            }
        }

        updateSeparationMetricsDOM();
        updateSeparationPedagogicalBox();
    }
    // --- MOD 2: BASİT DAMITMA FİZİĞİ ---
    else {
        const d = sep.distillation;

        if (d.isHeating) {
            if (d.temp < 78.0) {
                d.temp = Math.min(78.0, d.temp + 0.35);
                d.isBoiling = false;
                d.boilingPhase = "warming";
            } else if (d.alcoholVolume > 0) {
                // SABİT SICAKLIK 78.0°C!
                d.temp = 78.0;
                d.isBoiling = true;
                d.boilingPhase = "alcohol_boiling";

                const rate = 0.12;
                d.alcoholVolume = Math.max(0, d.alcoholVolume - rate);
                d.distilledAlcohol = Math.min(100.0, 100.0 - d.alcoholVolume);

                // Balon kabarcıkları üret
                if (Math.random() < 0.4) {
                    d.bubbles.push({
                        x: 230 + (Math.random() - 0.5) * 50,
                        y: 320 + Math.random() * 10,
                        r: 2 + Math.random() * 3,
                        vy: 1.5 + Math.random() * 2,
                        alpha: 0.8
                    });
                }

                // Kondenser içi yoğuşma damlaları
                if (Math.random() < 0.3) {
                    d.condenserDrops.push({
                        progress: 0,
                        speed: 0.015 + Math.random() * 0.01
                    });
                }

                // Toplama kabına damlayan damla
                if (Math.random() < 0.25) {
                    d.collectionDrops.push({
                        x: 560 + (Math.random() - 0.5) * 2,
                        y: 350,
                        vy: 3,
                        size: 3.2
                    });
                }
            } else {
                // Alkol bitti, sıcaklık 100°C'ye doğru yükseliyor
                d.alcoholVolume = 0;
                d.distilledAlcohol = 100.0;
                d.isBoiling = false;
                d.boilingPhase = "alcohol_finished";

                d.temp = Math.min(100.0, d.temp + 0.25);
                if (d.temp >= 100.0) {
                    d.boilingPhase = "water_boiling";
                    if (Math.random() < 0.3) {
                        d.bubbles.push({
                            x: 230 + (Math.random() - 0.5) * 40,
                            y: 320,
                            r: 2 + Math.random() * 2,
                            vy: 2,
                            alpha: 0.7
                        });
                    }
                }
            }
        } else {
            d.isBoiling = false;
            d.temp = Math.max(20.0, d.temp - 0.2);
        }

        // Kabarcıkları güncelle
        for (let i = d.bubbles.length - 1; i >= 0; i--) {
            const b = d.bubbles[i];
            b.y -= b.vy;
            b.alpha -= 0.015;
            if (b.y <= 270 || b.alpha <= 0) {
                d.bubbles.splice(i, 1);
            }
        }

        // Kondenser damlalarını güncelle
        for (let i = d.condenserDrops.length - 1; i >= 0; i--) {
            const cd = d.condenserDrops[i];
            cd.progress += cd.speed;
            if (cd.progress >= 1.0) {
                d.condenserDrops.splice(i, 1);
            }
        }

        // Toplama kabı damlalarını güncelle
        const groundCollY = 435 - d.distilledAlcohol * 0.5;
        for (let i = d.collectionDrops.length - 1; i >= 0; i--) {
            const cd = d.collectionDrops[i];
            cd.y += cd.vy;
            cd.vy += 0.25;
            if (cd.y >= groundCollY) {
                d.collectionDrops.splice(i, 1);
            }
        }

        updateSeparationMetricsDOM();
        updateSeparationPedagogicalBox();
    }
}

// --- 8.6.1. SAF CANVAS 2D ÇİZİM MOTORU ---

function drawSeparationSimulation() {
    if (!ctx || !canvas) return;

    const w = 800;
    const h = 500;
    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Zarif Arka Plan & Laboratuvar Zemin Gradyanı
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#0a0f1d');
    bgGrad.addColorStop(0.75, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Laboratuvar Masası Tezgah Yüzeyi (y = 440)
    const tableGrad = ctx.createLinearGradient(0, 440, 0, h);
    tableGrad.addColorStop(0, '#1e293b');
    tableGrad.addColorStop(0.1, '#334155');
    tableGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = tableGrad;
    ctx.fillRect(0, 440, w, 60);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 440);
    ctx.lineTo(w, 440);
    ctx.stroke();

    const sep = labState.separation;
    if (sep.mode === "funnel") {
        drawFunnelApparatus(ctx, sep.funnel);
    } else {
        drawDistillationApparatus(ctx, sep.distillation);
    }

    ctx.restore();
}

// --- MOD 1: AYIRMA HUNİSİ ÇİZİM RUTİNLERİ ---

function drawFunnelApparatus(ctx, funnel) {
    drawFunnelStatif(ctx);
    drawSeparatoryFunnelBody(ctx, funnel);
    drawFunnelStopcock(ctx, funnel);
    drawFunnelStreamAndDrops(ctx, funnel);
    drawCollectionErlenmeyer(ctx, funnel);
    drawFunnelIndicators(ctx, funnel);
}

function drawFunnelStatif(ctx) {
    ctx.save();

    // Taban Plakası (Döküm Demir)
    const baseGrad = ctx.createLinearGradient(230, 435, 230, 452);
    baseGrad.addColorStop(0, '#475569');
    baseGrad.addColorStop(0.5, '#1e293b');
    baseGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = baseGrad;
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(230, 435, 240, 16, 4);
    ctx.fill();
    ctx.stroke();

    // Düşey Krom Statif Çubuğu
    const rodGrad = ctx.createLinearGradient(278, 0, 290, 0);
    rodGrad.addColorStop(0, '#94a3b8');
    rodGrad.addColorStop(0.4, '#f8fafc');
    rodGrad.addColorStop(1, '#475569');
    ctx.fillStyle = rodGrad;
    ctx.fillRect(280, 50, 10, 385);

    // Destek Halkası Klemp Bağlantısı
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.fillRect(274, 138, 22, 18);
    ctx.strokeRect(274, 138, 22, 18);

    // Sıkıştırma Vidası Başlığı
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(270, 147, 5, 0, Math.PI * 2);
    ctx.fill();

    // Halka Kolu (Sağa uzanan çelik kol)
    ctx.fillStyle = rodGrad;
    ctx.fillRect(296, 144, 90, 6);

    // Taşıyıcı Halka (Funnel gövdesini saran çember)
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(440, 147, 56, 14, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}

function drawSeparatoryFunnelBody(ctx, funnel) {
    ctx.save();

    const cx = 440;
    const topY = 60;
    const bellyY = 140;
    const neckY = 245;
    const stopcockY = 265;

    // 1. Cam Tıpa (Üst Kapak)
    ctx.fillStyle = 'rgba(203, 213, 225, 0.5)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx - 14, topY - 14, 28, 14, 3);
    ctx.fill();
    ctx.stroke();

    // 2. Armut Tipi Cam Ayırma Hunisi Yolu (Path)
    const funnelPath = new Path2D();
    // Üst ağız
    funnelPath.moveTo(cx - 20, topY);
    funnelPath.lineTo(cx + 20, topY);
    // Üst boyun
    funnelPath.lineTo(cx + 20, topY + 16);
    // Göbek genişlemesi
    funnelPath.bezierCurveTo(cx + 35, topY + 25, cx + 58, bellyY - 20, cx + 56, bellyY);
    // Armut alt konisi (musluğa doğru daralma)
    funnelPath.bezierCurveTo(cx + 54, bellyY + 35, cx + 18, neckY - 20, cx + 8, neckY);
    funnelPath.lineTo(cx + 8, stopcockY - 10);
    funnelPath.lineTo(cx - 8, stopcockY - 10);
    funnelPath.lineTo(cx - 8, neckY);
    funnelPath.bezierCurveTo(cx - 18, neckY - 20, cx - 54, bellyY + 35, cx - 56, bellyY);
    funnelPath.bezierCurveTo(cx - 58, bellyY - 20, cx - 35, topY + 25, cx - 20, topY + 16);
    funnelPath.closePath();

    // Sıvı Alanını Kırp (Clip)
    ctx.save();
    ctx.clip(funnelPath);

    // Huni tabanı = stopcockY - 10 (255)
    // Su seviyesi yüksekliği: waterVolume (0-100 mL) -> 255'ten yukarı doğru
    // Zeytinyağı seviyesi yüksekliği: oilVolume (0-100 mL) -> su seviyesinden yukarı doğru
    const maxLiquidH = 150; // 200 mL için toplam piksel boyu
    const waterH = (funnel.waterVolume / 100.0) * (maxLiquidH * 0.5);
    const oilH = (funnel.oilVolume / 100.0) * (maxLiquidH * 0.5);

    const waterTopY = 255 - waterH;
    const oilTopY = waterTopY - oilH;

    // Alt Sıvı: SU (Mavi Şeffaf)
    if (funnel.waterVolume > 0) {
        const waterGrad = ctx.createLinearGradient(cx - 60, 0, cx + 60, 0);
        waterGrad.addColorStop(0, 'rgba(14, 165, 233, 0.75)');
        waterGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.85)');
        waterGrad.addColorStop(1, 'rgba(2, 132, 199, 0.75)');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(cx - 65, waterTopY, 130, waterH + 15);
    }

    // Üst Sıvı: ZEYTİNYAĞI (Altın Sarısı Şeffaf)
    if (funnel.oilVolume > 0) {
        const oilGrad = ctx.createLinearGradient(cx - 60, 0, cx + 60, 0);
        oilGrad.addColorStop(0, 'rgba(234, 179, 8, 0.8)');
        oilGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.88)');
        oilGrad.addColorStop(1, 'rgba(202, 138, 4, 0.8)');
        ctx.fillStyle = oilGrad;
        ctx.fillRect(cx - 65, oilTopY, 130, oilH);

        // Yağ üst yüzey menisküsü
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(cx, oilTopY, 48, 6, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Arayüz (Faz Sınırı) Menisküs Çizgisi
    if (funnel.waterVolume > 0 && funnel.oilVolume > 0) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        const interfaceRadius = Math.max(10, Math.min(52, 10 + (255 - waterTopY) * 0.45));
        ctx.ellipse(cx, waterTopY, interfaceRadius, 4.5, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore(); // Clip sonu

    // 3. Cam Çeperi ve Parlama Efekti
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 2.5;
    ctx.stroke(funnelPath);

    // Sol Cam Yansıma Şeridi
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.bezierCurveTo(cx - 44, bellyY - 15, cx - 44, bellyY + 25, cx - 20, neckY - 20);
    ctx.stroke();

    ctx.restore();
}

function drawFunnelStopcock(ctx, funnel) {
    ctx.save();
    const cx = 440;
    const cy = 265;

    // Musluk Cam Gövdesi (Yatay manşon)
    ctx.fillStyle = 'rgba(226, 232, 240, 0.35)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx - 16, cy - 8, 32, 16, 4);
    ctx.fill();
    ctx.stroke();

    // Dönen Musluk Kulpu (Handle)
    ctx.translate(cx, cy);
    ctx.rotate(funnel.valveAngle);

    // Kulp Çubuğu
    const handleGrad = ctx.createLinearGradient(-18, 0, 18, 0);
    if (funnel.isValveOpen) {
        handleGrad.addColorStop(0, '#059669');
        handleGrad.addColorStop(0.5, '#34d399');
        handleGrad.addColorStop(1, '#059669');
    } else {
        handleGrad.addColorStop(0, '#dc2626');
        handleGrad.addColorStop(0.5, '#f87171');
        handleGrad.addColorStop(1, '#dc2626');
    }
    ctx.fillStyle = handleGrad;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-20, -5, 40, 10, 5);
    ctx.fill();
    ctx.stroke();

    // Kulp Tutma Kanatları
    ctx.fillStyle = funnel.isValveOpen ? '#10b981' : '#ef4444';
    ctx.beginPath();
    ctx.arc(-20, 0, 6, 0, Math.PI * 2);
    ctx.arc(20, 0, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Alt Damlalık Borusu (Musluktan erlene inen cam boru)
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy + 8);
    ctx.lineTo(cx - 6, 330);
    ctx.lineTo(cx + 6, 322); // Verev kesik uç
    ctx.lineTo(cx + 6, cy + 8);
    ctx.stroke();
    ctx.restore();
}

function drawFunnelStreamAndDrops(ctx, funnel) {
    ctx.save();
    const cx = 440;

    // Musluk açıkken ince akış şeridi
    if (funnel.isValveOpen && (funnel.waterVolume > 0 || funnel.leakedOil > 0)) {
        const streamColor = (funnel.waterVolume > 0) ? 'rgba(56, 189, 248, 0.85)' : 'rgba(250, 204, 21, 0.9)';
        ctx.strokeStyle = streamColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, 325);
        ctx.lineTo(cx, 355);
        ctx.stroke();
    }

    // Düşen damlacıklar
    funnel.drops.forEach(d => {
        ctx.fillStyle = d.color;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.restore();
}

function drawCollectionErlenmeyer(ctx, funnel) {
    ctx.save();
    const cx = 440;
    const neckTopY = 345;
    const neckBottomY = 370;
    const baseY = 435;
    const baseW = 100;

    // Erlenmayer Yolu (Path)
    const erlenPath = new Path2D();
    erlenPath.moveTo(cx - 18, neckTopY);
    erlenPath.lineTo(cx + 18, neckTopY);
    erlenPath.lineTo(cx + 18, neckBottomY);
    erlenPath.lineTo(cx + (baseW / 2), baseY);
    erlenPath.lineTo(cx - (baseW / 2), baseY);
    erlenPath.lineTo(cx - 18, neckBottomY);
    erlenPath.closePath();

    // Sıvı Dolum Kırpması
    ctx.save();
    ctx.clip(erlenPath);

    const totalLiquid = funnel.collectedWater + funnel.leakedOil;
    const maxH = 65; // Maksimum sıvı derinliği
    const totalH = (totalLiquid / 200.0) * maxH * 1.8;
    const waterH = (funnel.collectedWater / 200.0) * maxH * 1.8;
    const oilH = (funnel.leakedOil / 200.0) * maxH * 1.8;

    // Erlendeki Su (Altta)
    if (funnel.collectedWater > 0) {
        const wGrad = ctx.createLinearGradient(cx - 50, 0, cx + 50, 0);
        wGrad.addColorStop(0, 'rgba(14, 165, 233, 0.8)');
        wGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.9)');
        wGrad.addColorStop(1, 'rgba(2, 132, 199, 0.8)');
        ctx.fillStyle = wGrad;
        ctx.fillRect(cx - 60, baseY - waterH, 120, waterH + 5);
    }

    // Erlendeki Sızan Zeytinyağı (Üste çıkan sarı tabaka)
    if (funnel.leakedOil > 0) {
        const oGrad = ctx.createLinearGradient(cx - 50, 0, cx + 50, 0);
        oGrad.addColorStop(0, 'rgba(234, 179, 8, 0.85)');
        oGrad.addColorStop(0.5, 'rgba(250, 204, 21, 0.92)');
        oGrad.addColorStop(1, 'rgba(202, 138, 4, 0.85)');
        ctx.fillStyle = oGrad;
        ctx.fillRect(cx - 60, baseY - waterH - oilH, 120, oilH);

        // Sızan yağ üst yüzeyi
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.9)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cx, baseY - waterH - oilH, 35, 4, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore(); // Erlen clip sonu

    // Cam Çeperi
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 2;
    ctx.stroke(erlenPath);

    // Erlen Derecelendirme Çizgileri
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    [25, 50, 75, 100].forEach((ml, idx) => {
        const markY = baseY - 12 - idx * 12;
        ctx.beginPath();
        ctx.moveTo(cx + 10, markY);
        ctx.lineTo(cx + 26, markY);
        ctx.stroke();
    });

    ctx.restore();
}

function drawFunnelIndicators(ctx, funnel) {
    // Zero-Canvas-Text Zırhı: Tüm faz ve bileşen bilgileri sağ panelde sunulur, tuval saf cam düzeneğe ayrılır
}

// --- MOD 2: BASİT DAMITMA ÇİZİM RUTİNLERİ ---

function drawDistillationApparatus(ctx, distill) {
    drawDistillationStatifAndTripod(ctx, distill);
    drawDistillationBurnerAndFlame(ctx, distill);
    drawDistillationFlask(ctx, distill);
    drawDistillationThermometer(ctx, distill);
    drawLiebigCondenser(ctx, distill);
    drawDistillationCollectionFlask(ctx, distill);
    drawDistillationIndicators(ctx, distill);
}

function drawDistillationStatifAndTripod(ctx, distill) {
    ctx.save();

    // 1. Sol Statif (Damıtma balonunu tutan metal ayak)
    const rodGrad = ctx.createLinearGradient(138, 0, 146, 0);
    rodGrad.addColorStop(0, '#94a3b8');
    rodGrad.addColorStop(0.5, '#f8fafc');
    rodGrad.addColorStop(1, '#475569');

    // Taban
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(90, 435, 100, 16, 4);
    ctx.fill();
    ctx.stroke();

    // Düşey çubuk
    ctx.fillStyle = rodGrad;
    ctx.fillRect(138, 120, 8, 315);

    // Balon Klemp Kolu
    ctx.fillStyle = '#334155';
    ctx.fillRect(134, 210, 16, 14);
    ctx.fillStyle = rodGrad;
    ctx.fillRect(146, 214, 50, 5);

    // 2. Üçayak (Tripod)
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    // Sol bacak
    ctx.moveTo(185, 435);
    ctx.lineTo(205, 350);
    // Orta bacak
    ctx.lineTo(255, 350);
    ctx.lineTo(275, 435);
    ctx.stroke();

    // Üçayak üst halkası & Seramik Tel Kafes
    ctx.fillStyle = distill.isHeating ? 'rgba(249, 115, 22, 0.4)' : '#334155';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(195, 346, 70, 7, 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

function drawDistillationBurnerAndFlame(ctx, distill) {
    ctx.save();
    const bx = 230;
    const by = 435;

    // İspirto Ocağı Gövdesi (Cam hazne)
    const burnerGrad = ctx.createLinearGradient(bx - 24, 0, bx + 24, 0);
    burnerGrad.addColorStop(0, 'rgba(56, 189, 248, 0.3)');
    burnerGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    burnerGrad.addColorStop(1, 'rgba(56, 189, 248, 0.3)');
    ctx.fillStyle = burnerGrad;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(bx - 24, by - 55, 48, 55, 6);
    ctx.fill();
    ctx.stroke();

    // İspirto Sıvısı (Mavi yakıt)
    ctx.fillStyle = 'rgba(14, 165, 233, 0.6)';
    ctx.fillRect(bx - 22, by - 40, 44, 38);

    // Fitil Kovanı (Metal Başlık)
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(bx - 6, by - 64, 12, 9);

    // Canlı Alev Animasyonu (Isıtıcı Açıksa)
    if (distill.isHeating) {
        const flick = Math.sin(animTime * 12) * 3;
        const flameH = 30 + flick;

        // Dış Alev (Amber / Sarı)
        const outerFlame = ctx.createRadialGradient(bx, by - 65, 2, bx, by - 65 - flameH * 0.6, flameH);
        outerFlame.addColorStop(0, '#fef08a');
        outerFlame.addColorStop(0.4, '#f59e0b');
        outerFlame.addColorStop(0.8, '#ef4444');
        outerFlame.addColorStop(1, 'rgba(239, 68, 68, 0)');

        ctx.fillStyle = outerFlame;
        ctx.beginPath();
        ctx.moveTo(bx - 9, by - 64);
        ctx.quadraticCurveTo(bx - 14, by - 64 - flameH * 0.5, bx, by - 64 - flameH);
        ctx.quadraticCurveTo(bx + 14, by - 64 - flameH * 0.5, bx + 9, by - 64);
        ctx.closePath();
        ctx.fill();

        // İç Alev Çekirdeği (Mavi Koni)
        ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.beginPath();
        ctx.moveTo(bx - 5, by - 64);
        ctx.quadraticCurveTo(bx - 6, by - 64 - 10, bx, by - 64 - 16);
        ctx.quadraticCurveTo(bx + 6, by - 64 - 10, bx + 5, by - 64);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
}

function drawDistillationFlask(ctx, distill) {
    ctx.save();
    const cx = 230;
    const cy = 295;
    const r = 48;

    // Balon Yolu: Yuvarlak dip + Üst Düşey Boyun + Yan Dirsek Kolu
    const flaskPath = new Path2D();
    flaskPath.arc(cx, cy, r, 0.15 * Math.PI, 0.85 * Math.PI, false); // Yuvarlak taban
    flaskPath.lineTo(cx - 16, cy);
    flaskPath.lineTo(cx - 16, 170); // Sol boyun
    flaskPath.lineTo(cx + 16, 170); // Sağ boyun üstü
    flaskPath.lineTo(cx + 16, 195); // Yan kol başlangıcı
    flaskPath.lineTo(270, 210);    // Yan kol uzantısı (Liebig'e giden)
    flaskPath.lineTo(268, 222);    // Yan kol altı
    flaskPath.lineTo(cx + 16, 212);
    flaskPath.lineTo(cx + 16, cy);
    flaskPath.closePath();

    // Balon İçi Sıvı Kırpması
    ctx.save();
    ctx.clip(flaskPath);

    // Kalan sıvı hacmi (alkol + su) = 0 - 200 mL
    const totalLiquid = distill.alcoholVolume + distill.waterVolume;
    const maxLiquidH = 65;
    const liquidH = (totalLiquid / 200.0) * maxLiquidH;
    const liquidTopY = (cy + r) - liquidH;

    // Homojen Alkol-Su Karışımı (Hafif Morumsu Su)
    const liqGrad = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
    liqGrad.addColorStop(0, 'rgba(96, 165, 250, 0.65)');
    liqGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.65)');
    liqGrad.addColorStop(1, 'rgba(96, 165, 250, 0.65)');
    ctx.fillStyle = liqGrad;
    ctx.fillRect(cx - r, liquidTopY, r * 2, liquidH + 20);

    // Kaynama Kabarcıkları (Bubbles)
    distill.bubbles.forEach(b => {
        ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.restore(); // Balon clip sonu

    // Balon Cam Çeperi
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 2.5;
    ctx.stroke(flaskPath);

    // Balon Ağzındaki Delikli Kauçuk Tıpa
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.fillRect(cx - 14, 160, 28, 12);
    ctx.strokeRect(cx - 14, 160, 28, 12);

    ctx.restore();
}

function drawDistillationThermometer(ctx, distill) {
    ctx.save();
    const cx = 230;

    // Termometre Cam Borusu (Tıpanın içinden yan kol seviyesine inen)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, 120);
    ctx.lineTo(cx, 205);
    ctx.stroke();

    // Termometre Cıva / İspirto Çizgisi (Kırmızı sütun)
    const tempPercent = (distill.temp - 20) / (100 - 20);
    const colH = Math.max(8, tempPercent * 70);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, 205);
    ctx.lineTo(cx, 205 - colH);
    ctx.stroke();

    // Termometre Haznesi (Kırmızı duyarga topu, tam yan kol kavşağında)
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(cx, 205, 4, 0, Math.PI * 2);
    ctx.fill();

    // Dijital Sıcaklık LED Göstergesi (Zero-Canvas-Text: Sayısal sıcaklık alt metrik şeridinde yer alır)
    const badgeW = 36;
    const badgeH = 16;
    const badgeX = cx - badgeW / 2;
    const badgeY = 98;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = distill.isBoiling ? '#38bdf8' : '#fb923c';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 4);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = distill.isBoiling ? '#38bdf8' : '#fb923c';
    ctx.beginPath();
    ctx.roundRect(badgeX + 5, badgeY + 4, badgeW - 10, badgeH - 8, 2);
    ctx.fill();

    ctx.restore();
}

function drawLiebigCondenser(ctx, distill) {
    ctx.save();

    const startX = 270;
    const startY = 210;
    const endX = 520;
    const endY = 310;

    const angle = Math.atan2(endY - startY, endX - startX);
    const len = Math.hypot(endX - startX, endY - startY);

    ctx.translate(startX, startY);
    ctx.rotate(angle);

    // 1. Dış Cam Su Ceketi (Geniş Soğutucu Boru)
    const jacketGrad = ctx.createLinearGradient(0, -18, 0, 18);
    jacketGrad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
    jacketGrad.addColorStop(0.5, 'rgba(186, 230, 253, 0.35)');
    jacketGrad.addColorStop(1, 'rgba(56, 189, 248, 0.2)');
    ctx.fillStyle = jacketGrad;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(25, -16, len - 50, 32, 6);
    ctx.fill();
    ctx.stroke();

    // 2. Soğutma Suyu Giriş / Çıkış Nipelleri
    // Soğuk Su Girişi (Altta, toplama kabına yakın uç)
    ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.fillRect(len - 45, 16, 10, 15);
    ctx.strokeRect(len - 45, 16, 10, 15);

    // Ilık Su Çıkışı (Üstte, balona yakın uç)
    ctx.fillRect(35, -31, 10, 15);
    ctx.strokeRect(35, -31, 10, 15);

    // 3. İç Buhar Borusu (İnce Cam Boru)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(0, -5, len, 10);
    ctx.fill();
    ctx.stroke();

    // 4. İç Boruda Yoğuşan Damlalar (Animasyon)
    distill.condenserDrops.forEach(d => {
        const dropX = 15 + d.progress * (len - 30);
        ctx.fillStyle = 'rgba(125, 211, 252, 0.85)';
        ctx.beginPath();
        ctx.arc(dropX, 3, 2.5, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.restore();
    // Zero-Canvas-Text: Soğuk su giriş ve ılık su çıkış yönleri cam nipellerle sezgisel gösterilir, tuval metinleri kaldırıldı.
}

function drawDistillationCollectionFlask(ctx, distill) {
    ctx.save();

    // Damıtma Dirseği (Bent Adapter)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(520, 310);
    ctx.lineTo(540, 325);
    ctx.lineTo(560, 355);
    ctx.stroke();

    // Damıtma Dirseğinden Toplama Kabına Düşen Damlalar
    distill.collectionDrops.forEach(cd => {
        ctx.fillStyle = 'rgba(125, 211, 252, 0.9)';
        ctx.beginPath();
        ctx.arc(cd.x, cd.y, cd.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Toplama Erlenmayeri
    const cx = 560;
    const neckTopY = 365;
    const neckBottomY = 385;
    const baseY = 435;
    const baseW = 85;

    const collPath = new Path2D();
    collPath.moveTo(cx - 15, neckTopY);
    collPath.lineTo(cx + 15, neckTopY);
    collPath.lineTo(cx + 15, neckBottomY);
    collPath.lineTo(cx + (baseW / 2), baseY);
    collPath.lineTo(cx - (baseW / 2), baseY);
    collPath.lineTo(cx - 15, neckBottomY);
    collPath.closePath();

    // Saf Etil Alkol Sıvı Dolumu
    ctx.save();
    ctx.clip(collPath);

    const alcH = (distill.distilledAlcohol / 100.0) * 45;
    if (distill.distilledAlcohol > 0) {
        const alcGrad = ctx.createLinearGradient(cx - 40, 0, cx + 40, 0);
        alcGrad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
        alcGrad.addColorStop(0.5, 'rgba(125, 211, 252, 0.85)');
        alcGrad.addColorStop(1, 'rgba(56, 189, 248, 0.7)');
        ctx.fillStyle = alcGrad;
        ctx.fillRect(cx - 50, baseY - alcH, 100, alcH + 5);

        // Sıvı Üst Yüzeyi
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(cx, baseY - alcH, 25, 3.5, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore(); // Erlen clip sonu

    // Cam Çeperi
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 2;
    ctx.stroke(collPath);

    ctx.restore();
}

function drawDistillationIndicators(ctx, distill) {
    // Zero-Canvas-Text Zırhı: Tüm damıtma ve yoğunlaşma bilgileri sağ panelde sunulur
}

// --- 8.7. DENEY 7.7: SÜRTÜNME VE DOKUNMA İLE ELEKTRİKLENME MOTORU ---

function setupElectroControlsDOM() {
    // 1. Mod Geçiş Butonları (Sürtünme vs Dokunma vs Etki)
    const btnFriction = document.getElementById('btn-mode-friction');
    const btnConduction = document.getElementById('btn-mode-conduction');
    const btnInduction = document.getElementById('btn-mode-induction');

    if (btnFriction) btnFriction.addEventListener('click', () => setElectroMode("friction"));
    if (btnConduction) btnConduction.addEventListener('click', () => setElectroMode("conduction"));
    if (btnInduction) btnInduction.addEventListener('click', () => setElectroMode("induction"));

    // 2. Sürtünme Çifti Butonları
    const btnEbonite = document.getElementById('btn-pair-ebonite');
    const btnGlass = document.getElementById('btn-pair-glass');
    const btnNeutralize = document.getElementById('btn-electro-neutralize');

    if (btnEbonite) btnEbonite.addEventListener('click', () => setFrictionPair("ebonite"));
    if (btnGlass) btnGlass.addEventListener('click', () => setFrictionPair("glass"));
    if (btnNeutralize) btnNeutralize.addEventListener('click', neutralizeElectro);

    // 3. Dokunma Modu Önayar Butonları
    const btnP1 = document.getElementById('btn-cond-preset-1');
    const btnP2 = document.getElementById('btn-cond-preset-2');
    const btnP3 = document.getElementById('btn-cond-preset-3');
    const btnCondNeut = document.getElementById('btn-cond-neutralize');

    if (btnP1) btnP1.addEventListener('click', () => setConductionPreset("pos6_zero"));
    if (btnP2) btnP2.addEventListener('click', () => setConductionPreset("neg6_zero"));
    if (btnP3) btnP3.addEventListener('click', () => setConductionPreset("pos6_neg2"));
    if (btnCondNeut) btnCondNeut.addEventListener('click', neutralizeConduction);

    // 3.1. Etki ile Elektriklenme (Kutuplanma) Butonları
    const btnIndEb = document.getElementById('btn-ind-ebonite');
    const btnIndGl = document.getElementById('btn-ind-glass');
    const btnIndApp = document.getElementById('btn-ind-approach');
    const btnIndRem = document.getElementById('btn-ind-remove');
    const btnIndNeut = document.getElementById('btn-ind-neutralize');

    if (btnIndEb) btnIndEb.addEventListener('click', () => setInductionPair("ebonite"));
    if (btnIndGl) btnIndGl.addEventListener('click', () => setInductionPair("glass"));
    if (btnIndApp) btnIndApp.addEventListener('click', approachInductionRod);
    if (btnIndRem) btnIndRem.addEventListener('click', removeInductionRod);
    if (btnIndNeut) btnIndNeut.addEventListener('click', neutralizeInduction);

    // 4. Veri Defterine Kaydet
    const btnRecord77 = document.getElementById('btn-record-data-7-7');
    if (btnRecord77) btnRecord77.addEventListener('click', recordMeasurement);
}

function setElectroMode(mode) {
    labState.electro.mode = mode;
    const isFriction = (mode === "friction");
    const isConduction = (mode === "conduction");
    const isInduction = (mode === "induction");

    const btnFriction = document.getElementById('btn-mode-friction');
    const btnConduction = document.getElementById('btn-mode-conduction');
    const btnInduction = document.getElementById('btn-mode-induction');
    if (btnFriction) btnFriction.classList.toggle('active', isFriction);
    if (btnConduction) btnConduction.classList.toggle('active', isConduction);
    if (btnInduction) btnInduction.classList.toggle('active', isInduction);

    const grpFriction = document.getElementById('group-controls-friction');
    const grpConduction = document.getElementById('group-controls-conduction');
    const grpInduction = document.getElementById('group-controls-induction');
    if (grpFriction) grpFriction.classList.toggle('is-hidden', !isFriction);
    if (grpConduction) grpConduction.classList.toggle('is-hidden', !isConduction);
    if (grpInduction) grpInduction.classList.toggle('is-hidden', !isInduction);

    const countersFriction = document.getElementById('counters-grid-friction');
    const countersConduction = document.getElementById('counters-grid-conduction');
    const countersInduction = document.getElementById('counters-grid-induction');
    if (countersFriction) countersFriction.classList.toggle('is-hidden', !isFriction);
    if (countersConduction) countersConduction.classList.toggle('is-hidden', !isConduction);
    if (countersInduction) countersInduction.classList.toggle('is-hidden', !isInduction);

    // Diğer modların eski yüklerini ve artıklarını temizle
    if (isFriction) {
        neutralizeElectro();
    } else if (isConduction) {
        setConductionPreset("pos6_zero");
    } else if (isInduction) {
        neutralizeInduction();
    }

    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
    showLabToast(isFriction ? "⚡ Sürtünme ile Elektriklenme Modu Aktif" : (isConduction ? "🤝 Dokunma ile Elektriklenme Modu Aktif" : "🧲 Etki ile Elektriklenme (Kutuplanma) Modu Aktif"));
}

function setFrictionPair(pair) {
    const f = labState.electro.friction;
    f.pair = pair;
    const isEbonite = (pair === "ebonite");

    const btnEb = document.getElementById('btn-pair-ebonite');
    const btnGl = document.getElementById('btn-pair-glass');
    if (btnEb) btnEb.classList.toggle('active', isEbonite);
    if (btnGl) btnGl.classList.toggle('active', !isEbonite);

    const lblRod = document.getElementById('label-electro-rod');
    const lblCloth = document.getElementById('label-electro-cloth');
    if (lblRod) lblRod.textContent = isEbonite ? "Ebonit (Plastik) Çubuk" : "Cam Çubuk";
    if (lblCloth) lblCloth.textContent = isEbonite ? "Yün Kumaş" : "İpek Kumaş";

    // Nötrle
    f.rod.protons = 10;
    f.rod.electrons = 10;
    f.cloth.protons = 8;
    f.cloth.electrons = 8;
    f.rod.x = 240;
    f.rod.y = 160;
    f.cloth.x = 90;
    f.cloth.y = 135;
    f.sparks = [];

    // Kağıtları masaya bırak
    f.papers.forEach(p => {
        p.isStuck = false;
        p.y = p.baseY;
    });

    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
    showLabToast(isEbonite ? "🧤 Ebonit Çubuk + Yün Kumaş Çifti Seçildi" : "✨ Cam Çubuk + İpek Kumaş Çifti Seçildi");
}

function neutralizeElectro() {
    const f = labState.electro.friction;
    f.rod.electrons = f.rod.protons;
    f.cloth.electrons = f.cloth.protons;
    f.rod.x = 240;
    f.rod.y = 160;
    f.cloth.x = 90;
    f.cloth.y = 135;
    f.sparks = [];

    f.papers.forEach(p => {
        p.isStuck = false;
        p.y = p.baseY;
    });

    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
    showLabToast("🔄 Yükler nötrlendi (Çubuk ve Kumaş Nötr)");
}

function setConductionPreset(presetKey) {
    const c = labState.electro.conduction;
    c.preset = presetKey;
    c.hasTouched = false;
    c.sphere1.x = 260;
    c.sphere2.x = 540;
    c.touchSparks = [];

    ['btn-cond-preset-1', 'btn-cond-preset-2', 'btn-cond-preset-3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });

    if (presetKey === "pos6_zero") {
        const el = document.getElementById('btn-cond-preset-1');
        if (el) el.classList.add('active');
        c.sphere1.protons = 12;
        c.sphere1.electrons = 6;  // Net +6e
        c.sphere2.protons = 10;
        c.sphere2.electrons = 10; // Net 0
    } else if (presetKey === "neg6_zero") {
        const el = document.getElementById('btn-cond-preset-2');
        if (el) el.classList.add('active');
        c.sphere1.protons = 10;
        c.sphere1.electrons = 16; // Net -6e
        c.sphere2.protons = 10;
        c.sphere2.electrons = 10; // Net 0
    } else if (presetKey === "pos6_neg2") {
        const el = document.getElementById('btn-cond-preset-3');
        if (el) el.classList.add('active');
        c.sphere1.protons = 14;
        c.sphere1.electrons = 8;  // Net +6e
        c.sphere2.protons = 10;
        c.sphere2.electrons = 12; // Net -2e
    }

    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
    showLabToast("⚡ Kürelerin başlangıç yükleri ayarlandı");
}

function neutralizeConduction() {
    const c = labState.electro.conduction;
    c.sphere1.electrons = c.sphere1.protons;
    c.sphere2.electrons = c.sphere2.protons;
    c.sphere1.x = 260;
    c.sphere2.x = 540;
    c.hasTouched = false;
    c.touchSparks = [];

    ['btn-cond-preset-1', 'btn-cond-preset-2', 'btn-cond-preset-3'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });

    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
    showLabToast("🔄 Her iki iletken küre nötrlendi");
}

function setInductionPair(pair) {
    const ind = labState.electro.induction;
    ind.pair = pair;
    const isEb = (pair === "ebonite");
    const btnEb = document.getElementById('btn-ind-ebonite');
    const btnGl = document.getElementById('btn-ind-glass');
    if (btnEb) btnEb.classList.toggle('active', isEb);
    if (btnGl) btnGl.classList.toggle('active', !isEb);

    const lblRod = document.getElementById('label-electro-ind-rod');
    const badgeRod = document.getElementById('badge-ind-rod');
    if (lblRod) lblRod.textContent = isEb ? "(-) Ebonit Çubuk" : "(+) Cam Çubuk";
    if (badgeRod) {
        badgeRod.textContent = isEb ? "-6e" : "+6e";
        badgeRod.className = `electro-charge-badge ${isEb ? 'negative' : 'positive'}`;
    }

    if (isEb) {
        ind.rod.protons = 8;
        ind.rod.electrons = 14; // -6
    } else {
        ind.rod.protons = 14;
        ind.rod.electrons = 8;  // +6
    }
    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
    showLabToast(isEb ? "🧤 (-) Yüklü Ebonit Çubuk Seçildi" : "✨ (+) Yüklü Cam Çubuk Seçildi");
}

function approachInductionRod() {
    const ind = labState.electro.induction;
    ind.rod.isApproached = true;
    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
    showLabToast("🧲 Yüklü çubuk nötr iletken küreye yaklaştırıldı!");
}

function removeInductionRod() {
    const ind = labState.electro.induction;
    ind.rod.isApproached = false;
    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
    showLabToast("↔️ Çubuk uzaklaştırıldı. Elektronlar tekrar homojen dağıldı (Nötr).");
}

function neutralizeInduction() {
    const ind = labState.electro.induction;
    ind.rod.isApproached = false;
    ind.rod.x = ind.rod.baseX;
    ind.polarization = 0;
    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
    showLabToast("🔄 Sistem sıfırlandı.");
}

function resetElectroExperiment() {
    if (labState.electro.mode === "friction") {
        neutralizeElectro();
    } else if (labState.electro.mode === "conduction") {
        setConductionPreset("pos6_zero");
    } else {
        neutralizeInduction();
    }
}

function initPaperBits() {
    const f = labState.electro.friction;
    f.papers = [];
    const colors = ['#ffffff', '#f1f5f9', '#e2e8f0', '#cbd5e1'];
    for (let i = 0; i < 18; i++) {
        const px = 270 + Math.random() * 260;
        const py = 432 + Math.random() * 4;
        f.papers.push({
            x: px,
            y: py,
            baseY: py,
            w: 9 + Math.random() * 5,
            h: 5 + Math.random() * 3,
            rot: (Math.random() - 0.5) * 0.8,
            color: colors[Math.floor(Math.random() * colors.length)],
            isStuck: false,
            stuckOffsetX: 0,
            vy: 0
        });
    }
}

function initElectroState() {
    initPaperBits();
    setElectroMode(labState.electro.mode || "friction");
    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
}

function updateElectroPedagogicalBox() {
    const el = labState.electro;
    const box = document.getElementById('electro-pedagogical-box');
    const pIcon = document.getElementById('electro-pedagogical-icon');
    const pTitle = document.getElementById('electro-pedagogical-title');
    const pText = document.getElementById('electro-pedagogical-text');
    if (!box || !pIcon || !pTitle || !pText) return;

    if (el.mode === "friction") {
        const f = el.friction;
        const isEbonite = (f.pair === "ebonite");
        const rodNet = f.rod.protons - f.rod.electrons; // negative = surplus electrons
        const clothNet = f.cloth.protons - f.cloth.electrons;
        const stuckCount = f.papers.filter(p => p.isStuck).length;

        box.className = "lab-pedagogical-card is-work";

        if (stuckCount > 0) {
            pIcon.innerHTML = '<i class="fas fa-magnet"></i>';
            pTitle.textContent = `⚡ Elektrostatik Çekim: ${stuckCount} Kağıt Parçası Yapıştı!`;
            pText.textContent = "Elektrik yüklü çubuk masaya yaklaştırıldığında, nötr kağıt parçalarında etki ile yük ayrışması (kutuplanma) oluşur. Çubuk zıt kutupları çekerek yer çekimini yener!";
        } else if (rodNet !== 0) {
            if (isEbonite) {
                pIcon.innerHTML = '<i class="fas fa-bolt"></i>';
                pTitle.textContent = `⚡ Ebonit Çubuk (-) Yüklendi! (Net: -${Math.abs(rodNet)}e)`;
                pText.textContent = "Yün kumaştan ebonit çubuğa elektron (e⁻) aktarıldı. Çubuk e⁻ alarak negatif (-), yün kumaş e⁻ vererek pozitif (+) yüklendi. Pozitif protonlar çekirdekte sabit kaldı!";
            } else {
                pIcon.innerHTML = '<i class="fas fa-sparkles"></i>';
                pTitle.textContent = `✨ Cam Çubuk (+) Yüklendi! (Net: +${rodNet}e)`;
                pText.textContent = "Cam çubuktan ipek kumaşa elektron (e⁻) aktarıldı. Cam çubuk e⁻ kaybederek pozitif (+), ipek kumaş e⁻ kazanarak negatif (-) yüklendi. Sadece elektronlar hareket etti!";
            }
        } else {
            pIcon.innerHTML = '<i class="fas fa-hand-sparkles"></i>';
            pTitle.textContent = "⚡ Kritik Kural: Yalnızca Elektronlar Hareket Eder!";
            pText.textContent = "Maddeler başlangıçta nötrdür (proton ve elektron sayıları eşittir). Kumaşı parmağınızla/fareyle çubuğun üzerine sürterek elektriklenmeyi başlatın!";
        }
    } else if (el.mode === "conduction") {
        const c = el.conduction;
        box.className = "lab-pedagogical-card is-work";

        if (c.hasTouched) {
            const s1Net = c.sphere1.protons - c.sphere1.electrons;
            const s2Net = c.sphere2.protons - c.sphere2.electrons;
            const signText = s1Net > 0 ? `+${s1Net}e (Pozitif)` : s1Net < 0 ? `-${Math.abs(s1Net)}e (Negatif)` : "0 (Nötr)";

            pIcon.innerHTML = '<i class="fas fa-handshake"></i>';
            pTitle.textContent = `🤝 Dokunma Gerçekleşti: Yükler Eşit Paylaşıldı! (${signText})`;
            pText.textContent = "Özdeş iletken küreler dokundurulduğunda fazla elektronlar temas noktasından akarak küreler arasında eşit bölündü. Küreler ayrıldığında her ikisi de AYNI CİNS yükle yüklendi!";
        } else {
            pIcon.innerHTML = '<i class="fas fa-arrows-alt-h"></i>';
            pTitle.textContent = "🤝 Dokunma ile Elektriklenme: Küreleri Dokundurun";
            pText.textContent = "İletken kürelerden birini diğerine doğru sürükleyip temas ettirin. Dokunma anında elektronların nasıl aktarıldığını ve toplam yükün nasıl paylaşıldığını gözlemleyin.";
        }
    } else {
        // induction
        const ind = el.induction;
        const isEb = (ind.pair === "ebonite");
        box.className = "lab-pedagogical-card is-work";
        if (ind.rod.isApproached) {
            pIcon.innerHTML = '<i class="fas fa-arrows-split-up-and-left"></i>';
            pTitle.textContent = isEb ? "🧲 Etki ile Kutuplanma: Elektronlar Zıt Tarafa İtildi!" : "🧲 Etki ile Kutuplanma: Elektronlar Yakın Tarafa Çekildi!";
            pText.textContent = isEb ?
                "(-) Yüklü ebonit çubuk yaklaştığında küredeki serbest elektronları uzak tarafa iter. Kürenin çubuğa yakın tarafında pozitif proton fazlalığı kalır, uzak tarafı negatif yüklenir. Toplam yük DEĞİŞMEZ, küre nötr kalır!" :
                "(+) Yüklü cam çubuk yaklaştığında küredeki serbest elektronları kendine doğru çeker. Çubuğa yakın tarafta elektron fazlalığı oluşur. Pozitif protonlar çekirdekte sabit kalır!";
        } else {
            pIcon.innerHTML = '<i class="fas fa-arrows-alt-h"></i>';
            pTitle.textContent = "🧲 Etki ile Elektriklenme: Yüklü Çubuğu Yaklaştırın";
            pText.textContent = "Çubuğu küreye yaklaştırarak (temas ettirmeden) iletken küre içindeki elektronların nasıl kutuplandığını gözlemleyin. Çubuk uzaklaştırıldığında küre anında eski nötr homojen haline döner!";
        }
    }
}

function updateElectroMetricsDOM() {
    const el = labState.electro;

    if (el.mode === "friction") {
        const f = el.friction;
        const rodNet = f.rod.protons - f.rod.electrons;
        const clothNet = f.cloth.protons - f.cloth.electrons;

        const cRodPos = document.getElementById('cnt-rod-pos');
        const cRodNeg = document.getElementById('cnt-rod-neg');
        const cRodNet = document.getElementById('cnt-rod-net');
        const bRod = document.getElementById('badge-electro-rod');

        if (cRodPos) cRodPos.textContent = f.rod.protons;
        if (cRodNeg) cRodNeg.textContent = f.rod.electrons;
        if (cRodNet) {
            cRodNet.textContent = rodNet === 0 ? "0" : rodNet > 0 ? `+${rodNet}e` : `-${Math.abs(rodNet)}e`;
            cRodNet.style.color = rodNet > 0 ? '#f87171' : rodNet < 0 ? '#38bdf8' : '#94a3b8';
        }
        if (bRod) {
            bRod.className = "electro-charge-badge " + (rodNet > 0 ? "positive" : rodNet < 0 ? "negative" : "neutral");
            bRod.textContent = rodNet > 0 ? `+${rodNet}e (Pozitif)` : rodNet < 0 ? `-${Math.abs(rodNet)}e (Negatif)` : "Nötr";
        }

        const cClothPos = document.getElementById('cnt-cloth-pos');
        const cClothNeg = document.getElementById('cnt-cloth-neg');
        const cClothNet = document.getElementById('cnt-cloth-net');
        const bCloth = document.getElementById('badge-electro-cloth');

        if (cClothPos) cClothPos.textContent = f.cloth.protons;
        if (cClothNeg) cClothNeg.textContent = f.cloth.electrons;
        if (cClothNet) {
            cClothNet.textContent = clothNet === 0 ? "0" : clothNet > 0 ? `+${clothNet}e` : `-${Math.abs(clothNet)}e`;
            cClothNet.style.color = clothNet > 0 ? '#f87171' : clothNet < 0 ? '#38bdf8' : '#94a3b8';
        }
        if (bCloth) {
            bCloth.className = "electro-charge-badge " + (clothNet > 0 ? "positive" : clothNet < 0 ? "negative" : "neutral");
            bCloth.textContent = clothNet > 0 ? `+${clothNet}e (Pozitif)` : clothNet < 0 ? `-${Math.abs(clothNet)}e (Negatif)` : "Nötr";
        }
    } else if (el.mode === "conduction") {
        const c = el.conduction;
        const s1Net = c.sphere1.protons - c.sphere1.electrons;
        const s2Net = c.sphere2.protons - c.sphere2.electrons;

        const cS1Pos = document.getElementById('cnt-sphere1-pos');
        const cS1Neg = document.getElementById('cnt-sphere1-neg');
        const cS1Net = document.getElementById('cnt-sphere1-net');
        const bS1 = document.getElementById('badge-sphere1');

        if (cS1Pos) cS1Pos.textContent = c.sphere1.protons;
        if (cS1Neg) cS1Neg.textContent = c.sphere1.electrons;
        if (cS1Net) {
            cS1Net.textContent = s1Net === 0 ? "0" : s1Net > 0 ? `+${s1Net}e` : `-${Math.abs(s1Net)}e`;
            cS1Net.style.color = s1Net > 0 ? '#f87171' : s1Net < 0 ? '#38bdf8' : '#94a3b8';
        }
        if (bS1) {
            bS1.className = "electro-charge-badge " + (s1Net > 0 ? "positive" : s1Net < 0 ? "negative" : "neutral");
            bS1.textContent = s1Net > 0 ? `+${s1Net}e` : s1Net < 0 ? `-${Math.abs(s1Net)}e` : "Nötr";
        }

        const cS2Pos = document.getElementById('cnt-sphere2-pos');
        const cS2Neg = document.getElementById('cnt-sphere2-neg');
        const cS2Net = document.getElementById('cnt-sphere2-net');
        const bS2 = document.getElementById('badge-sphere2');

        if (cS2Pos) cS2Pos.textContent = c.sphere2.protons;
        if (cS2Neg) cS2Neg.textContent = c.sphere2.electrons;
        if (cS2Net) {
            cS2Net.textContent = s2Net === 0 ? "0" : s2Net > 0 ? `+${s2Net}e` : `-${Math.abs(s2Net)}e`;
            cS2Net.style.color = s2Net > 0 ? '#f87171' : s2Net < 0 ? '#38bdf8' : '#94a3b8';
        }
        if (bS2) {
            bS2.className = "electro-charge-badge " + (s2Net > 0 ? "positive" : s2Net < 0 ? "negative" : "neutral");
            bS2.textContent = s2Net > 0 ? `+${s2Net}e` : s2Net < 0 ? `-${Math.abs(s2Net)}e` : "Nötr";
        }
    } else {
        // induction
        const ind = el.induction;
        const isEb = (ind.pair === "ebonite");
        const cIndRodPos = document.getElementById('cnt-ind-rod-pos');
        const cIndRodNeg = document.getElementById('cnt-ind-rod-neg');
        const cIndRodNet = document.getElementById('cnt-ind-rod-net');
        const bIndRod = document.getElementById('badge-ind-rod');
        const bIndSphere = document.getElementById('badge-ind-sphere');
        const cNear = document.getElementById('cnt-ind-near-side');
        const cFar = document.getElementById('cnt-ind-far-side');
        const cSphereNet = document.getElementById('cnt-ind-sphere-net');

        if (cIndRodPos) cIndRodPos.textContent = ind.rod.protons;
        if (cIndRodNeg) cIndRodNeg.textContent = ind.rod.electrons;
        if (cIndRodNet) {
            cIndRodNet.textContent = isEb ? "-6e" : "+6e";
            cIndRodNet.style.color = isEb ? '#38bdf8' : '#f87171';
        }
        if (bIndRod) {
            bIndRod.className = "electro-charge-badge " + (isEb ? "negative" : "positive");
            bIndRod.textContent = isEb ? "-6e" : "+6e";
        }
        if (bIndSphere) {
            bIndSphere.textContent = ind.rod.isApproached ? "Kutuplanmış" : "Homojen Nötr";
            bIndSphere.className = "electro-charge-badge neutral";
        }
        if (cNear) cNear.textContent = ind.rod.isApproached ? (isEb ? "+ Çekilen" : "- Çekilen") : "Nötr";
        if (cFar) cFar.textContent = ind.rod.isApproached ? (isEb ? "- İtilen" : "+ Kalan") : "Nötr";
        if (cSphereNet) cSphereNet.textContent = "0 (Nötr)";
    }

    // Metrik Şeridi (#metrics-bar-7-7) Güncellemesi
    const mbRod = document.getElementById('mbar-77-rod');
    const mbCloth = document.getElementById('mbar-77-cloth');
    const mbTransfer = document.getElementById('mbar-77-transfer');
    const mbStatus = document.getElementById('mbar-77-status');

    if (mbRod) {
        if (el.mode === "friction") mbRod.textContent = el.friction.pair === "ebonite" ? "Ebonit (-)" : "Cam (+)";
        else if (el.mode === "conduction") mbRod.textContent = "1. Küre";
        else mbRod.textContent = el.induction.pair === "ebonite" ? "Ebonit (-)" : "Cam (+)";
    }
    if (mbCloth) {
        if (el.mode === "friction") mbCloth.textContent = el.friction.pair === "ebonite" ? "Yün (+)" : "İpek (-)";
        else if (el.mode === "conduction") mbCloth.textContent = "2. Küre";
        else mbCloth.textContent = "İletken Küre (Nötr)";
    }
    if (mbTransfer) {
        if (el.mode === "friction") mbTransfer.textContent = "Sürtünme e⁻";
        else if (el.mode === "conduction") mbTransfer.textContent = el.conduction.hasTouched ? "e⁻ Paylaşıldı" : "Dokunma Yok";
        else mbTransfer.textContent = el.induction.rod.isApproached ? "Kutuplanma (e⁻ İtildi/Çekildi)" : "Kutuplanma Yok";
    }
    if (mbStatus) {
        if (el.mode === "friction") {
            const stuckCount = el.friction.papers.filter(p => p.isStuck).length;
            mbStatus.textContent = stuckCount > 0 ? `Çekim: ${stuckCount} Kağıt` : (el.friction.rod.protons !== el.friction.rod.electrons ? "Yüklü Çubuk" : "Nötr");
        } else if (el.mode === "conduction") {
            mbStatus.textContent = el.conduction.hasTouched ? "Yükler Paylaşıldı" : "Temas Bekleniyor";
        } else {
            mbStatus.textContent = el.induction.rod.isApproached ? "Kutuplanmış Küre (Net: 0)" : "Nötr Dağılım";
        }
    }

    if (el.mode === "friction") {
        const f = el.friction;
        const rodNet = f.rod.protons - f.rod.electrons;
        const clothNet = f.cloth.protons - f.cloth.electrons;
        const rodLabel = f.materialPair === "ebonite_wool" ? "Ebonit (Plastik)" : "Cam Çubuk";
        const clothLabel = f.materialPair === "ebonite_wool" ? "Yün Kumaş" : "İpek Kumaş";

        if (mbRod) {
            mbRod.textContent = rodNet === 0 ? `${rodLabel} (Nötr)` : `${rodLabel}: ${rodNet > 0 ? '+' : ''}${rodNet}e (${rodNet > 0 ? 'Pozitif' : 'Negatif'})`;
            mbRod.style.color = rodNet > 0 ? '#f87171' : rodNet < 0 ? '#38bdf8' : '#cbd5e1';
        }
        if (mbCloth) {
            mbCloth.textContent = clothNet === 0 ? `${clothLabel} (Nötr)` : `${clothLabel}: ${clothNet > 0 ? '+' : ''}${clothNet}e (${clothNet > 0 ? 'Pozitif' : 'Negatif'})`;
            mbCloth.style.color = clothNet > 0 ? '#f87171' : clothNet < 0 ? '#38bdf8' : '#cbd5e1';
        }
        if (mbTransfer) {
            if (f.materialPair === "ebonite_wool") {
                mbTransfer.textContent = f.frictionRubCount > 0 ? "Elektronlar: Yün ➔ Ebonit (-)" : "Sürtünme Bekleniyor";
            } else {
                mbTransfer.textContent = f.frictionRubCount > 0 ? "Elektronlar: Cam ➔ İpek (-)" : "Sürtünme Bekleniyor";
            }
        }
        if (mbStatus) {
            if (Math.abs(rodNet) >= 3) {
                mbStatus.textContent = "🧲 Çubuk Elektriklendi: Nötr kağıt parçalarını elektrostatik çekimle çeker!";
                mbStatus.style.color = "#34d399";
            } else if (f.frictionRubCount > 0) {
                mbStatus.textContent = "⚡ Elektron transferi gerçekleşti, zıt elektrik yükü oluştu";
                mbStatus.style.color = "#facc15";
            } else {
                mbStatus.textContent = "🧲 Kumaşı çubuğa sürterek elektron aktarımını başlatın";
                mbStatus.style.color = "#38bdf8";
            }
        }
    } else {
        const c = el.conduction;
        const s1Net = c.sphere1.protons - c.sphere1.electrons;
        const s2Net = c.sphere2.protons - c.sphere2.electrons;

        if (mbRod) {
            mbRod.textContent = `1. Küre: ${s1Net > 0 ? '+' : ''}${s1Net}e`;
            mbRod.style.color = s1Net > 0 ? '#f87171' : s1Net < 0 ? '#38bdf8' : '#cbd5e1';
        }
        if (mbCloth) {
            mbCloth.textContent = `2. Küre: ${s2Net > 0 ? '+' : ''}${s2Net}e`;
            mbCloth.style.color = s2Net > 0 ? '#f87171' : s2Net < 0 ? '#38bdf8' : '#cbd5e1';
        }
        if (mbTransfer) {
            mbTransfer.textContent = c.hasTouched ? "Dokunmayla Yük Paylaşıldı" : "Küreleri Birbirine Yaklaştırın";
        }
        if (mbStatus) {
            if (c.hasTouched) {
                mbStatus.textContent = "🤝 Dokunma ile Elektriklenme: Toplam yük iletken küreler arasında paylaşıldı!";
                mbStatus.style.color = "#34d399";
            } else {
                mbStatus.textContent = "⚡ Küreleri sürükleyip birbirine dokundurun";
                mbStatus.style.color = "#facc15";
            }
        }
    }
}

function updateElectroPhysics() {
    const el = labState.electro;

    // --- MOD A: SÜRTÜNME FİZİĞİ ---
    if (el.mode === "friction") {
        const f = el.friction;

        // Kumaş ile çubuk çakışma (overlap) kontrolü
        const isOverlap = (f.cloth.x + f.cloth.w > f.rod.x) &&
                          (f.cloth.x < f.rod.x + f.rod.w) &&
                          (f.cloth.y + f.cloth.h > f.rod.y - 10) &&
                          (f.cloth.y < f.rod.y + f.rod.h + 10);

        if (isOverlap && f.cloth.isDragging) {
            const moveDelta = Math.hypot(f.cloth.x - f.lastClothX, f.cloth.y - f.lastClothY);
            f.frictionDistance += moveDelta;

            // Her 35px sürtünme hareketinde 1 elektron transferi
            if (f.frictionDistance >= 35) {
                f.frictionDistance = 0;

                if (f.pair === "ebonite") {
                    // Yünden çubuğa elektron aktar (Maks 16 elektron)
                    if (f.cloth.electrons > 2 && f.rod.electrons < 16) {
                        f.cloth.electrons--;
                        f.rod.electrons++;

                        // Kıvılcım (kumaştan çubuğa)
                        f.sparks.push({
                            x: f.cloth.x + f.cloth.w / 2,
                            y: f.cloth.y + f.cloth.h / 2,
                            targetX: f.rod.x + Math.random() * f.rod.w,
                            targetY: f.rod.y + f.rod.h / 2,
                            progress: 0,
                            color: '#38bdf8'
                        });
                        updateElectroMetricsDOM();
                        updateElectroPedagogicalBox();
                    }
                } else {
                    // Camdan ipeğe elektron aktar (Çubukta min 4 elektron)
                    if (f.rod.electrons > 4 && f.cloth.electrons < 14) {
                        f.rod.electrons--;
                        f.cloth.electrons++;

                        // Kıvılcım (çubuktan kumaşa)
                        f.sparks.push({
                            x: f.rod.x + Math.random() * f.rod.w,
                            y: f.rod.y + f.rod.h / 2,
                            targetX: f.cloth.x + f.cloth.w / 2,
                            targetY: f.cloth.y + f.cloth.h / 2,
                            progress: 0,
                            color: '#facc15'
                        });
                        updateElectroMetricsDOM();
                        updateElectroPedagogicalBox();
                    }
                }
            }
        }

        f.lastClothX = f.cloth.x;
        f.lastClothY = f.cloth.y;

        // Kıvılcımları güncelle
        for (let i = f.sparks.length - 1; i >= 0; i--) {
            const s = f.sparks[i];
            s.progress += 0.08;
            if (s.progress >= 1.0) f.sparks.splice(i, 1);
        }

        // Kağıt Parçacıkları Çekim Fiziği
        const rodNet = Math.abs(f.rod.protons - f.rod.electrons);
        const rodBottomY = f.rod.y + f.rod.h;

        f.papers.forEach(p => {
            if (p.isStuck) {
                // Yapışmış kağıt çubukla birlikte hareket eder
                if (rodNet === 0) {
                    p.isStuck = false; // Yük nötrlenince düşer
                } else {
                    p.x = f.rod.x + p.stuckOffsetX;
                    p.y = rodBottomY + 2;
                }
            } else {
                if (rodNet >= 1) {
                    // Çubuk ile kağıt arasındaki mesafe
                    const distY = p.y - rodBottomY;
                    const isUnderRod = (p.x >= f.rod.x - 20 && p.x <= f.rod.x + f.rod.w + 20);

                    if (isUnderRod && distY < 180 && distY > 0) {
                        // Elektrostatik çekim kuvveti yer çekimini yener
                        const force = (180 - distY) * 0.045 * (rodNet * 0.5);
                        p.y -= force;
                        p.rot += 0.08;

                        if (p.y <= rodBottomY + 2) {
                            p.isStuck = true;
                            p.y = rodBottomY + 2;
                            p.stuckOffsetX = Math.max(10, Math.min(f.rod.w - 10, p.x - f.rod.x));
                            updateElectroPedagogicalBox();
                        }
                    } else if (p.y < p.baseY) {
                        // Yer çekimiyle yavaşça geri düşer
                        p.y = Math.min(p.baseY, p.y + 3);
                    }
                } else if (p.y < p.baseY) {
                    p.y = Math.min(p.baseY, p.y + 4);
                }
            }
        });
    }
    // --- MOD B: DOKUNMA FİZİĞİ ---
    else if (el.mode === "conduction") {
        const c = el.conduction;
        const touchDist = c.sphere1.r + c.sphere2.r; // 110 px
        const curDist = c.sphere2.x - c.sphere1.x;

        if (curDist <= touchDist) {
            // Dokunma gerçekleşti! Çakışmayı engelle
            c.sphere1.x = c.sphere2.x - touchDist;

            if (!c.hasTouched) {
                c.hasTouched = true;

                // Toplam elektronu iki özdeş küreye eşit böl
                const totalE = c.sphere1.electrons + c.sphere2.electrons;
                const halfE1 = Math.floor(totalE / 2);
                const halfE2 = totalE - halfE1;

                c.sphere1.electrons = halfE1;
                c.sphere2.electrons = halfE2;

                // Dokunma noktası kıvılcım patlaması
                const touchX = (c.sphere1.x + c.sphere2.x) / 2;
                for (let k = 0; k < 12; k++) {
                    const angle = Math.random() * Math.PI * 2;
                    const speed = 2 + Math.random() * 4;
                    c.touchSparks.push({
                        x: touchX,
                        y: 230,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        alpha: 1.0,
                        color: (c.sphere1.protons > c.sphere1.electrons) ? '#f87171' : '#38bdf8'
                    });
                }

                updateElectroMetricsDOM();
                updateElectroPedagogicalBox();
                showLabToast("🤝 Dokunma Anı! Fazla elektronlar iki iletken arasında eşit paylaşıldı.");
            }
        }

        // Dokunma kıvılcımlarını güncelle
        for (let i = c.touchSparks.length - 1; i >= 0; i--) {
            const sp = c.touchSparks[i];
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.alpha -= 0.04;
            if (sp.alpha <= 0) c.touchSparks.splice(i, 1);
        }
    } else if (el.mode === "induction") {
        const ind = el.induction;
        const targetX = ind.rod.isApproached ? 270 : ind.rod.baseX;
        ind.rod.x += (targetX - ind.rod.x) * 0.12;

        const targetPol = ind.rod.isApproached ? 1.0 : 0.0;
        ind.polarization += (targetPol - ind.polarization) * 0.1;
    }
}

// --- 8.7.1. SAF CANVAS 2D ÇİZİM MOTORU ---

function drawElectroSimulation() {
    if (!ctx || !canvas) return;

    const w = 800;
    const h = 500;
    ctx.save();
    ctx.clearRect(0, 0, w, h);

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#0a0f1d');
    bgGrad.addColorStop(0.75, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Ahşap Laboratuvar Masası Tezgahı (y = 440)
    const tableGrad = ctx.createLinearGradient(0, 440, 0, h);
    tableGrad.addColorStop(0, '#334155');
    tableGrad.addColorStop(0.15, '#1e293b');
    tableGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = tableGrad;
    ctx.fillRect(0, 440, w, 60);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 440);
    ctx.lineTo(w, 440);
    ctx.stroke();

    const el = labState.electro;
    if (el.mode === "friction") {
        drawElectroFrictionSetup(ctx, el.friction);
    } else if (el.mode === "conduction") {
        drawElectroConductionSetup(ctx, el.conduction);
    } else {
        drawElectroInductionSetup(ctx, el.induction);
    }

    ctx.restore();
}

function drawElectroInductionSetup(ctx, ind) {
    ctx.save();

    // 1. İletken Kürenin Yalıtkan Plastik Standı
    const standGrad = ctx.createLinearGradient(480, 0, 520, 0);
    standGrad.addColorStop(0, '#1e293b');
    standGrad.addColorStop(0.5, '#475569');
    standGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = standGrad;
    ctx.fillRect(495, 280, 10, 160);

    ctx.beginPath();
    ctx.roundRect(460, 435, 80, 12, 4);
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 2. Nötr İletken Küre
    const sphereGrad = ctx.createRadialGradient(ind.sphere.x - 20, ind.sphere.y - 20, 10, ind.sphere.x, ind.sphere.y, ind.sphere.r);
    sphereGrad.addColorStop(0, '#f8fafc');
    sphereGrad.addColorStop(0.35, '#cbd5e1');
    sphereGrad.addColorStop(0.75, '#64748b');
    sphereGrad.addColorStop(1, '#334155');
    ctx.fillStyle = sphereGrad;
    ctx.beginPath();
    ctx.arc(ind.sphere.x, ind.sphere.y, ind.sphere.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 3. Küre İçi Yük Dağılımı ve Kutuplanma (Polarization)
    const isEbonite = (ind.pair === "ebonite");
    const shiftX = (isEbonite ? 22 : -22) * ind.polarization;

    // Protonları çiz (sabit + simgeleri)
    ctx.fillStyle = '#ef4444';
    for (let i = 0; i < 7; i++) {
        const ang = (i / 7) * Math.PI * 2;
        const px = ind.sphere.x + Math.cos(ang) * 36;
        const py = ind.sphere.y + Math.sin(ang) * 36;
        drawChargeBadgeSymbol(ctx, px, py, '+');
    }

    // Elektronları çiz (kayan - simgeleri)
    ctx.fillStyle = '#3b82f6';
    for (let i = 0; i < 7; i++) {
        const ang = (i / 7) * Math.PI * 2 + 0.45;
        const ex = ind.sphere.x + Math.cos(ang) * 36 + shiftX;
        const ey = ind.sphere.y + Math.sin(ang) * 36;
        drawChargeBadgeSymbol(ctx, ex, ey, '-');
    }

    // 4. Yaklaştırılan Çubuk
    const isEb = (ind.pair === "ebonite");
    const rodX = ind.rod.x;
    const rodY = ind.rod.y;
    const rodW = ind.rod.w;
    const rodH = ind.rod.h;

    const rodGrad = ctx.createLinearGradient(0, rodY - rodH / 2, 0, rodY + rodH / 2);
    if (isEb) {
        rodGrad.addColorStop(0, '#27272a');
        rodGrad.addColorStop(0.5, '#4b5563');
        rodGrad.addColorStop(1, '#18181b');
    } else {
        rodGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
        rodGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.75)');
        rodGrad.addColorStop(1, 'rgba(56, 189, 248, 0.35)');
    }
    ctx.fillStyle = rodGrad;
    ctx.beginPath();
    ctx.roundRect(rodX - rodW / 2, rodY - rodH / 2, rodW, rodH, 8);
    ctx.fill();
    ctx.strokeStyle = isEb ? '#52525b' : '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Çubuk üzerindeki yükler
    const rodSign = isEb ? '-' : '+';
    ctx.fillStyle = isEb ? '#3b82f6' : '#ef4444';
    for (let c = 0; c < 5; c++) {
        const cx = (rodX - rodW / 2 + 20) + c * 28;
        drawChargeBadgeSymbol(ctx, cx, rodY, rodSign);
    }

    // 5. Etki Kuvvet Çizgileri (Kutuplanma alanı)
    if (ind.polarization > 0.2) {
        ctx.strokeStyle = isEb ? 'rgba(59, 130, 246, 0.45)' : 'rgba(239, 68, 68, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(rodX + rodW / 2 + 5, rodY - 15);
        ctx.lineTo(ind.sphere.x - ind.sphere.r - 5, ind.sphere.y - 15);
        ctx.moveTo(rodX + rodW / 2 + 10, rodY);
        ctx.lineTo(ind.sphere.x - ind.sphere.r - 2, ind.sphere.y);
        ctx.moveTo(rodX + rodW / 2 + 5, rodY + 15);
        ctx.lineTo(ind.sphere.x - ind.sphere.r - 5, ind.sphere.y + 15);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    ctx.restore();
}

function drawChargeBadgeSymbol(ctx, cx, cy, sign) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (sign === '+') {
        ctx.moveTo(cx - 3.5, cy);
        ctx.lineTo(cx + 3.5, cy);
        ctx.moveTo(cx, cy - 3.5);
        ctx.lineTo(cx, cy + 3.5);
    } else {
        ctx.moveTo(cx - 3.5, cy);
        ctx.lineTo(cx + 3.5, cy);
    }
    ctx.stroke();
    ctx.restore();
}

// --- SÜRTÜNME ÇİZİMLERİ ---

function drawElectroFrictionSetup(ctx, f) {
    // 1. Masada Duran Kağıt Parçacıkları
    drawPaperBits(ctx, f.papers);

    // 2. Yüklü Çubuk
    drawElectroRod(ctx, f.rod, f.pair);

    // 3. Kumaş
    drawElectroCloth(ctx, f.cloth, f.pair);

    // 4. Kıvılcım Transfer Parçacıkları
    drawElectroSparks(ctx, f.sparks);
}

function drawElectroRod(ctx, rod, pair) {
    ctx.save();
    const isEbonite = (pair === "ebonite");

    // Çubuk Gövdesi
    const rodGrad = ctx.createLinearGradient(rod.x, rod.y, rod.x, rod.y + rod.h);
    if (isEbonite) {
        // Ebonit: Koyu volkanik siyah / antrasit plastik
        rodGrad.addColorStop(0, '#334155');
        rodGrad.addColorStop(0.3, '#1e293b');
        rodGrad.addColorStop(0.7, '#0f172a');
        rodGrad.addColorStop(1, '#020617');
    } else {
        // Cam: Işıltılı saydam cam / aqua
        rodGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        rodGrad.addColorStop(0.3, 'rgba(186, 230, 253, 0.45)');
        rodGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.35)');
        rodGrad.addColorStop(1, 'rgba(14, 165, 233, 0.5)');
    }

    ctx.fillStyle = rodGrad;
    ctx.strokeStyle = isEbonite ? '#475569' : 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(rod.x, rod.y, rod.w, rod.h, 12);
    ctx.fill();
    ctx.stroke();

    // Üst Parlama Çizgisi
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(rod.x + 14, rod.y + 6);
    ctx.lineTo(rod.x + rod.w - 14, rod.y + 6);
    ctx.stroke();

    // Çubuk İçindeki Yük Simgeleri
    // Sabit Protonlar (+) Üst Sırada (10 adet)
    const protonSpacing = (rod.w - 30) / (rod.protons - 1);
    for (let i = 0; i < rod.protons; i++) {
        const px = rod.x + 15 + i * protonSpacing;
        const py = rod.y + 11;
        drawChargeBadge(ctx, px, py, '+', '#ef4444', '#f87171');
    }

    // Elektronlar (-) Alt Sırada (rod.electrons adet)
    const eCount = rod.electrons;
    const eSpacing = (rod.w - 30) / Math.max(1, eCount - 1);
    for (let i = 0; i < eCount; i++) {
        const ex = rod.x + 15 + i * eSpacing;
        const ey = rod.y + 25;
        drawChargeBadge(ctx, ex, ey, '-', '#0284c7', '#38bdf8');
    }

    // Zero-Canvas-Text: Çubuk türü aktif kontrol düğmelerinde vurgulanır
    ctx.restore();
}

function drawElectroCloth(ctx, cloth, pair) {
    ctx.save();
    const isEbonite = (pair === "ebonite");

    // Kumaş Katmanları ve Gövdesi
    const clothGrad = ctx.createLinearGradient(cloth.x, cloth.y, cloth.x + cloth.w, cloth.y + cloth.h);
    if (isEbonite) {
        // Yün Kumaş: Sıcak krem / bal rengi dokulu kumaş
        clothGrad.addColorStop(0, '#fef3c7');
        clothGrad.addColorStop(0.5, '#fde68a');
        clothGrad.addColorStop(1, '#f59e0b');
    } else {
        // İpek Kumaş: Mor / eflatun parlak ipek dokusu
        clothGrad.addColorStop(0, '#f3e8ff');
        clothGrad.addColorStop(0.5, '#d8b4fe');
        clothGrad.addColorStop(1, '#a855f7');
    }

    ctx.fillStyle = clothGrad;
    ctx.strokeStyle = isEbonite ? '#d97706' : '#7e22ce';
    ctx.lineWidth = 2;

    // Dalgalı kumaş şekli
    ctx.beginPath();
    ctx.roundRect(cloth.x, cloth.y, cloth.w, cloth.h, 10);
    ctx.fill();
    ctx.stroke();

    // Kumaş Dikiş / Kat İzi Çizgileri
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cloth.x + 10, cloth.y + cloth.h * 0.4);
    ctx.lineTo(cloth.x + cloth.w - 10, cloth.y + cloth.h * 0.4);
    ctx.moveTo(cloth.x + 10, cloth.y + cloth.h * 0.7);
    ctx.lineTo(cloth.x + cloth.w - 10, cloth.y + cloth.h * 0.7);
    ctx.stroke();

    // Kumaş İçi Yükler
    // Protonlar (+) (8 adet)
    const pSpacing = (cloth.w - 20) / 3;
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
            const idx = row * 4 + col;
            if (idx < cloth.protons) {
                const px = cloth.x + 12 + col * pSpacing;
                const py = cloth.y + 18 + row * 16;
                drawChargeBadge(ctx, px, py, '+', '#ef4444', '#f87171');
            }
        }
    }

    // Elektronlar (-)
    const eCount = cloth.electrons;
    const eCols = Math.min(4, Math.ceil(eCount / 2));
    const eSpacing = (cloth.w - 20) / Math.max(1, eCols - 1);
    for (let i = 0; i < eCount; i++) {
        const row = Math.floor(i / eCols);
        const col = i % eCols;
        const ex = cloth.x + 12 + col * eSpacing;
        const ey = cloth.y + 52 + row * 15;
        if (ey < cloth.y + cloth.h - 5) {
            drawChargeBadge(ctx, ex, ey, '-', '#0284c7', '#38bdf8');
        }
    }

    // Zero-Canvas-Text: Kumaş türü panelde belirtilir
    ctx.restore();
}

function drawChargeBadge(ctx, x, y, symbol, bg, border) {
    ctx.save();
    ctx.fillStyle = bg;
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Zero-Canvas-Text: Vektör çizgiyle artı (+) ve eksi (-) yük sembolleri
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.moveTo(x - 2.5, y);
    ctx.lineTo(x + 2.5, y);
    if (symbol === '+') {
        ctx.moveTo(x, y - 2.5);
        ctx.lineTo(x, y + 2.5);
    }
    ctx.stroke();
    ctx.restore();
}

function drawPaperBits(ctx, papers) {
    ctx.save();
    papers.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 0.8;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
    });
    ctx.restore();
}

function drawElectroSparks(ctx, sparks) {
    ctx.save();
    sparks.forEach(s => {
        const curX = s.x + (s.targetX - s.x) * s.progress;
        const curY = s.y + (s.targetY - s.y) * s.progress - Math.sin(s.progress * Math.PI) * 20;

        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Parçacık ışıma halkası (Zero-Canvas-Text)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(curX, curY, 5.5, 0, Math.PI * 2);
        ctx.stroke();
    });
    ctx.restore();
}

// --- DOKUNMA ÇİZİMLERİ ---

function drawElectroConductionSetup(ctx, c) {
    // 1. İki Küre Arası Mesafe Çizgisi
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(c.sphere1.x, 230);
    ctx.lineTo(c.sphere2.x, 230);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Küre 1 (Sol)
    drawConductionSphere(ctx, c.sphere1, "1. İletken Küre", '#f87171');

    // 3. Küre 2 (Sağ)
    drawConductionSphere(ctx, c.sphere2, "2. İletken Küre", '#38bdf8');

    // 4. Dokunma Kıvılcımları
    drawTouchSparks(ctx, c.touchSparks);
}

function drawConductionSphere(ctx, sphere, label, netColor) {
    ctx.save();
    const cx = sphere.x;
    const cy = sphere.y;
    const r = sphere.r;

    // Yalıtkan Sap (Pleksiglas / Akrilik Ayak)
    const standGrad = ctx.createLinearGradient(cx - 8, 0, cx + 8, 0);
    standGrad.addColorStop(0, 'rgba(251, 191, 36, 0.3)');
    standGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.6)');
    standGrad.addColorStop(1, 'rgba(251, 191, 36, 0.3)');
    ctx.fillStyle = standGrad;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.fillRect(cx - 7, cy + r - 5, 14, 435 - (cy + r));
    ctx.strokeRect(cx - 7, cy + r - 5, 14, 435 - (cy + r));

    // Yalıtkan Taban Plakası
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#475569';
    ctx.beginPath();
    ctx.roundRect(cx - 35, 435, 70, 10, 3);
    ctx.fill();
    ctx.stroke();

    // İletken Metal Küre (Krom Metalik Radyal Gradyan)
    const sphereGrad = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
    sphereGrad.addColorStop(0, '#ffffff');
    sphereGrad.addColorStop(0.3, '#cbd5e1');
    sphereGrad.addColorStop(0.7, '#64748b');
    sphereGrad.addColorStop(1, '#1e293b');

    ctx.fillStyle = sphereGrad;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Küre Üzerindeki Yük Parçacıkları Dağılımı
    // Protonlar (+)
    const pCount = sphere.protons;
    for (let i = 0; i < pCount; i++) {
        const ang = (i / pCount) * Math.PI * 2 + 0.3;
        const radDist = r * 0.65;
        const qx = cx + Math.cos(ang) * radDist;
        const qy = cy + Math.sin(ang) * radDist;
        drawChargeBadge(ctx, qx, qy, '+', '#ef4444', '#f87171');
    }

    // Elektronlar (-)
    const eCount = sphere.electrons;
    for (let i = 0; i < eCount; i++) {
        const ang = (i / Math.max(1, eCount)) * Math.PI * 2 + 0.8;
        const radDist = r * 0.35;
        const qx = cx + Math.cos(ang) * radDist;
        const qy = cy + Math.sin(ang) * radDist;
        drawChargeBadge(ctx, qx, qy, '-', '#0284c7', '#38bdf8');
    }

    // Küre Alt İsim ve Net Yük Rozeti
    const net = sphere.protons - sphere.electrons;
    const netStr = net === 0 ? "0 (Nötr)" : net > 0 ? `+${net}e` : `-${Math.abs(net)}e`;

    // Zero-Canvas-Text: Küre net yük değerleri ve isimleri sağ panel rozetlerinde canlı gösterilir
    ctx.restore();
}

function drawTouchSparks(ctx, sparks) {
    ctx.save();
    sparks.forEach(s => {
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 3, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();
}

// --- 8.8. DENEY 7.8: ELEKTROSKOP İLE YÜK TAYİNİ VE TOPRAKLAMA MOTORU ---

function setupElectroscopeControlsDOM() {
    // 1. Çubuk Türü Butonları
    const bGlass = document.getElementById('btn-rod-glass');
    const bEbonite = document.getElementById('btn-rod-ebonite');
    const bNeutral = document.getElementById('btn-rod-neutral');

    if (bGlass) bGlass.addEventListener('click', () => setElectroscopeRodType("glass_pos"));
    if (bEbonite) bEbonite.addEventListener('click', () => setElectroscopeRodType("ebonite_neg"));
    if (bNeutral) bNeutral.addEventListener('click', () => setElectroscopeRodType("neutral"));

    // 2. Etkileşim Butonları (Yaklaştır / Dokundur / Uzaklaştır)
    const bApproach = document.getElementById('btn-action-approach');
    const bTouch = document.getElementById('btn-action-touch');
    const bRemove = document.getElementById('btn-action-remove');

    if (bApproach) bApproach.addEventListener('click', () => setElectroscopeAction("approach"));
    if (bTouch) bTouch.addEventListener('click', () => setElectroscopeAction("touch"));
    if (bRemove) bRemove.addEventListener('click', () => setElectroscopeAction("remove"));

    // 3. Topraklama ve Sıfırlama
    const bGround = document.getElementById('btn-electroscope-ground');
    const bReset = document.getElementById('btn-electroscope-reset');

    if (bGround) bGround.addEventListener('click', groundElectroscope);
    if (bReset) bReset.addEventListener('click', resetElectroscopeExperiment);

    // 4. Başlangıç Yükü Seçim Hapları
    const pNeutral = document.getElementById('pill-scope-init-neutral');
    const pPos = document.getElementById('pill-scope-init-pos');
    const pNeg = document.getElementById('pill-scope-init-neg');

    if (pNeutral) pNeutral.addEventListener('click', () => setElectroscopeInitialCharge("neutral"));
    if (pPos) pPos.addEventListener('click', () => setElectroscopeInitialCharge("positive"));
    if (pNeg) pNeg.addEventListener('click', () => setElectroscopeInitialCharge("negative"));

    // 5. Gözlemi Kaydet Butonu
    const btnRecord78 = document.getElementById('btn-record-data-7-8');
    if (btnRecord78) btnRecord78.addEventListener('click', recordMeasurement);
}

function setElectroscopeRodType(type) {
    const es = labState.electroscope;
    es.rod.type = type;
    if (type === "glass_pos") {
        es.rod.charge = 6;
    } else if (type === "ebonite_neg") {
        es.rod.charge = -6;
    } else {
        es.rod.charge = 0;
    }

    ['btn-rod-glass', 'btn-rod-ebonite', 'btn-rod-neutral'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.remove('active');
    });

    const activeMap = { glass_pos: 'btn-rod-glass', ebonite_neg: 'btn-rod-ebonite', neutral: 'btn-rod-neutral' };
    const activeBtn = document.getElementById(activeMap[type]);
    if (activeBtn) activeBtn.classList.add('active');

    // Eğer çubuk zaten dokunma veya yaklaşma modundaysa hemen yeniden hesapla
    if (es.rod.action === "approach" || es.rod.action === "touch") {
        setElectroscopeAction(es.rod.action);
    }
}

function setElectroscopeAction(action) {
    const es = labState.electroscope;
    es.rod.action = action;

    ['btn-action-approach', 'btn-action-touch', 'btn-action-remove'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.remove('active');
    });

    const activeMap = { approach: 'btn-action-approach', touch: 'btn-action-touch', remove: 'btn-action-remove' };
    const activeBtn = document.getElementById(activeMap[action]);
    if (activeBtn) activeBtn.classList.add('active');

    // Milimetrik teğet dokunma ve yaklaşma sınırları (Topuz cx=420, r=24 -> sol teğet=396; Çubuk rw=170)
    if (action === "approach") {
        es.rod.targetX = 192; // 34px net hava aralığı
        es.rod.targetY = 110;
        if (es.rod.x === undefined) es.rod.x = 192;
    } else if (action === "touch") {
        es.rod.targetX = 226; // 226 + 170 = 396 (Sıfır İhlal Teğet Temas!)
        es.rod.targetY = 110;
        if (es.rod.x === undefined) es.rod.x = 226;
        // Dokunma kıvılcımları üret
        spawnElectroscopeTouchSparks(es);
    } else if (action === "remove") {
        es.rod.targetX = 70; // Güvenli uzak konum
        es.rod.targetY = 110;
        if (es.rod.x === undefined) es.rod.x = 70;
    }
}

function setElectroscopeInitialCharge(mode) {
    const es = labState.electroscope;
    es.scope.initialMode = mode;

    ['pill-scope-init-neutral', 'pill-scope-init-pos', 'pill-scope-init-neg'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });

    const activeMap = { neutral: 'pill-scope-init-neutral', positive: 'pill-scope-init-pos', negative: 'pill-scope-init-neg' };
    const activePill = document.getElementById(activeMap[mode]);
    if (activePill) activePill.classList.add('active');

    if (mode === "neutral") {
        es.scope.totalNet = 0;
        es.scope.knobNet = 0;
        es.scope.leavesNet = 0;
        es.scope.leafAngle = 0;
        es.scope.targetAngle = 0;
        showLabToast("Elektroskop Nötr (0) duruma getirildi");
    } else if (mode === "positive") {
        es.scope.totalNet = 4;
        es.scope.knobNet = 2;
        es.scope.leavesNet = 2;
        es.scope.leafAngle = 24;
        es.scope.targetAngle = 24;
        showLabToast("Elektroskop Pozitif (+) yüklendi (Yapraklar açık)");
    } else if (mode === "negative") {
        es.scope.totalNet = -4;
        es.scope.knobNet = -2;
        es.scope.leavesNet = -2;
        es.scope.leafAngle = 24;
        es.scope.targetAngle = 24;
        showLabToast("Elektroskop Negatif (-) yüklendi (Yapraklar açık)");
    }

    // Mevcut etkileşimi güncelle
    setElectroscopeAction(es.rod.action);
}

function groundElectroscope() {
    const es = labState.electroscope;
    es.grounding.isActive = true;
    es.grounding.animTimer = 35; // ~0.6 saniye kıvılcım

    // Kıvılcım oluştur
    for (let i = 0; i < 16; i++) {
        es.grounding.sparks.push({
            x: 420 + (Math.random() - 0.5) * 30,
            y: 110 + (Math.random() - 0.5) * 30,
            vx: (Math.random() - 0.5) * 4 + 2,
            vy: (Math.random() - 0.5) * 4 - 2,
            alpha: 1.0,
            color: '#34d399',
            size: 2.5 + Math.random() * 2.5
        });
    }

    es.scope.totalNet = 0;
    es.scope.knobNet = 0;
    es.scope.leavesNet = 0;
    es.scope.targetAngle = 0;
    es.scope.initialMode = "neutral";

    ['pill-scope-init-neutral', 'pill-scope-init-pos', 'pill-scope-init-neg'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', id === 'pill-scope-init-neutral');
    });

    showLabToast("⚡ Elektroskop topraklandı ve tamamen nötrlendi!");
}

function resetElectroscopeExperiment() {
    const es = labState.electroscope;
    es.rod.type = "glass_pos";
    es.rod.charge = 6;
    es.rod.x = 70;
    es.rod.y = 110;
    es.rod.targetX = 70;
    es.rod.targetY = 110;
    es.rod.action = "remove";
    es.rod.isDragging = false;

    es.scope.initialMode = "neutral";
    es.scope.totalNet = 0;
    es.scope.knobNet = 0;
    es.scope.leavesNet = 0;
    es.scope.leafAngle = 0;
    es.scope.targetAngle = 0;
    es.scope.leafVelocity = 0;

    es.grounding.isActive = false;
    es.grounding.animTimer = 0;
    es.grounding.sparks = [];
    es.sparks = [];

    // Buton aktifliklerini sıfırla
    ['btn-rod-glass', 'btn-action-remove', 'pill-scope-init-neutral'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    });
    ['btn-rod-ebonite', 'btn-rod-neutral', 'btn-action-approach', 'btn-action-touch', 'pill-scope-init-pos', 'pill-scope-init-neg'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });

    updateElectroscopeMetricsDOM();
    showLabToast("Elektroskop düzeneği başlangıç durumuna sıfırlandı");
}

function initElectroscopeState() {
    const es = labState.electroscope;
    es.rod.targetX = (es.rod.action === "approach") ? 192 : (es.rod.action === "touch") ? 226 : 70;
    es.rod.targetY = 110;
    es.rod.x = es.rod.targetX;
    es.rod.y = es.rod.targetY;
    es.scope.leafVelocity = 0;
    es.grounding.isActive = false;
    es.grounding.sparks = [];
    es.sparks = [];
    updateElectroscopeMetricsDOM();
}

function spawnElectroscopeTouchSparks(es) {
    es.sparks = [];
    for (let i = 0; i < 18; i++) {
        es.sparks.push({
            x: 396 + (Math.random() - 0.5) * 6,
            y: 110 + (Math.random() - 0.5) * 12,
            vx: (Math.random() - 0.6) * 3.5,
            vy: (Math.random() - 0.5) * 3.5,
            alpha: 1.0,
            color: es.rod.charge > 0 ? '#f87171' : es.rod.charge < 0 ? '#38bdf8' : '#facc15',
            size: 1.5 + Math.random() * 2.5
        });
    }
}

function updateElectroscopePhysics() {
    const es = labState.electroscope;

    // 0. Çubuk Yumuşak Süzülme Hareketi (Lerp Glide)
    if (!es.rod.isDragging && es.rod.targetX !== undefined) {
        es.rod.x += (es.rod.targetX - es.rod.x) * 0.18;
        es.rod.y += (es.rod.targetY - es.rod.y) * 0.18;
    }

    // 1. Topraklama Parçacıkları Güncelleme
    if (es.grounding.animTimer > 0) {
        es.grounding.animTimer--;
        if (es.grounding.animTimer === 0) {
            es.grounding.isActive = false;
        }
    }
    es.grounding.sparks = es.grounding.sparks.filter(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.04;
        return s.alpha > 0;
    });

    // 2. Dokunma / İletim Kıvılcımları
    es.sparks = es.sparks.filter(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.05;
        return s.alpha > 0;
    });

    // 3. Elektrostatik Yük Durumu Hesaplama
    if (es.grounding.isActive) {
        es.scope.knobNet = 0;
        es.scope.leavesNet = 0;
        es.scope.targetAngle = 0;
    } else if (es.rod.action === "touch") {
        // Dokunma ile yük paylaşımı (Sadece elektron transferi!)
        if (es.rod.charge > 0) {
            // Pozitif çubuk elektroskoptan elektron alır -> elektroskop daha pozitif olur
            es.scope.totalNet = Math.min(6, es.scope.totalNet + 4);
        } else if (es.rod.charge < 0) {
            // Negatif çubuk elektroskoba elektron verir -> elektroskop daha negatif olur
            es.scope.totalNet = Math.max(-6, es.scope.totalNet - 4);
        }
        es.scope.knobNet = Math.round(es.scope.totalNet / 2);
        es.scope.leavesNet = Math.round(es.scope.totalNet / 2);
        es.scope.targetAngle = Math.min(60, Math.abs(es.scope.leavesNet) * 12.0);
    } else if (es.rod.action === "approach") {
        // Etki ile kutuplanma (Yaklaştırma)
        const halfTotal = Math.round(es.scope.totalNet / 2);
        if (es.rod.charge > 0) {
            // (+) Cam çubuk yapraklardaki elektronları topuza çeker:
            // Topuz negatif (-), yapraklar daha pozitif (+)
            es.scope.knobNet = halfTotal - 3;
            es.scope.leavesNet = halfTotal + 3;
        } else if (es.rod.charge < 0) {
            // (-) Ebonit çubuk topuzdaki elektronları yapraklara iter:
            // Topuz pozitif (+), yapraklar daha negatif (-)
            es.scope.knobNet = halfTotal + 3;
            es.scope.leavesNet = halfTotal - 3;
        } else {
            es.scope.knobNet = halfTotal;
            es.scope.leavesNet = halfTotal;
        }
        es.scope.targetAngle = Math.min(60, Math.abs(es.scope.leavesNet) * 12.0);
    } else {
        // Çubuk Uzak (Denge durumu)
        const halfTotal = Math.round(es.scope.totalNet / 2);
        es.scope.knobNet = halfTotal;
        es.scope.leavesNet = halfTotal;
        es.scope.targetAngle = Math.min(60, Math.abs(es.scope.leavesNet) * 12.0);
    }

    // 4. Yaprak Açısı Sönümlü Harmonik Titreşim (Damped Harmonic Oscillation)
    if (es.scope.leafVelocity === undefined) es.scope.leafVelocity = 0;
    const diff = es.scope.targetAngle - es.scope.leafAngle;
    const springK = 0.14;
    const damping = 0.80;
    es.scope.leafVelocity += diff * springK;
    es.scope.leafVelocity *= damping;
    es.scope.leafAngle += es.scope.leafVelocity;
    if (Math.abs(diff) < 0.05 && Math.abs(es.scope.leafVelocity) < 0.05) {
        es.scope.leafAngle = es.scope.targetAngle;
        es.scope.leafVelocity = 0;
    }

    updateElectroscopeMetricsDOM();
}

function updateElectroscopeMetricsDOM() {
    const es = labState.electroscope;

    // Topuz Rozeti
    const bKnob = document.getElementById('badge-scope-knob');
    const vKnob = document.getElementById('val-scope-knob');
    if (bKnob && vKnob) {
        const k = es.scope.knobNet;
        bKnob.className = `electro-charge-badge ${k > 0 ? 'positive' : k < 0 ? 'negative' : 'neutral'}`;
        bKnob.textContent = k > 0 ? `+${k}e` : k < 0 ? `${k}e` : 'Nötr';
        vKnob.textContent = k > 0 ? `+${k}e` : k < 0 ? `${k}e` : '0';
        vKnob.style.color = k > 0 ? '#f87171' : k < 0 ? '#38bdf8' : '#94a3b8';
    }

    // Yapraklar Rozeti
    const bLeaves = document.getElementById('badge-scope-leaves');
    const vLeaves = document.getElementById('val-scope-leaves');
    if (bLeaves && vLeaves) {
        const l = es.scope.leavesNet;
        bLeaves.className = `electro-charge-badge ${l > 0 ? 'positive' : l < 0 ? 'negative' : 'neutral'}`;
        bLeaves.textContent = l > 0 ? `+${l}e` : l < 0 ? `${l}e` : 'Nötr';
        vLeaves.textContent = l > 0 ? `+${l}e` : l < 0 ? `${l}e` : '0';
        vLeaves.style.color = l > 0 ? '#f87171' : l < 0 ? '#38bdf8' : '#94a3b8';
    }

    // Yaprak Açısı Göstergesi
    const vAngle = document.getElementById('val-scope-angle');
    const bAngle = document.getElementById('bar-scope-angle');
    if (vAngle && bAngle) {
        const ang = Math.max(0, es.scope.leafAngle);
        vAngle.textContent = `${ang.toFixed(1)}°`;
        const pct = Math.min(100, (ang / 60) * 100);
        bAngle.style.width = `${pct.toFixed(0)}%`;
    }

    // Dinamik Maarif Pedagojik Kartı
    const pBox = document.getElementById('electroscope-pedagogical-box');
    const pTitle = document.getElementById('electroscope-pedagogical-title');
    const pText = document.getElementById('electroscope-pedagogical-text');
    const pIcon = document.getElementById('electroscope-pedagogical-icon');

    if (pBox && pTitle && pText && pIcon) {
        if (es.grounding.isActive) {
            pBox.className = "lab-pedagogical-card is-work";
            pIcon.innerHTML = '<i class="fas fa-bolt" style="color: #34d399;"></i>';
            pTitle.textContent = "⚡ Topraklama Yapıldı: Elektroskop Nötrlendi!";
            pText.textContent = "Toprak sonsuz bir elektron deposudur. İletken bir yolla toprağa bağlanan elektroskop tüm yük dengesini sağlayarak nötrlenir ve yapraklar tamamen kapanır (α = 0°).";
        } else if (es.rod.action === "touch") {
            pBox.className = "lab-pedagogical-card is-work";
            pIcon.innerHTML = '<i class="fas fa-hand-pointer" style="color: #facc15;"></i>';
            pTitle.textContent = `🤝 Dokunma ile Elektriklenme (${es.scope.totalNet > 0 ? "Pozitif" : es.scope.totalNet < 0 ? "Negatif" : "Nötr"})`;
            pText.textContent = `Dokunma sonucu iletken cisimler arasında doğrudan elektron aktarımı gerçekleşti. Çubuk uzaklaştırılsa dahi elektroskop yüklü kalır ve yapraklar açık kalmaya devam eder!`;
        } else if (es.rod.action === "approach") {
            pBox.className = "lab-pedagogical-card is-work";
            if (es.rod.charge > 0) {
                pIcon.innerHTML = '<i class="fas fa-compress-arrows-alt" style="color: #f87171;"></i>';
                pTitle.textContent = "🧲 Etki ile Elektriklenme: (+) Cam Çubuk Yaklaştırıldı";
                pText.textContent = "Pozitif yüklü cam çubuk, elektroskobun yapraklarındaki serbest elektronları (e⁻) topuza çeker. Topuz negatif (-), yapraklar pozitif (+) kutuplanır. Aynı cins yükler birbirini ittiği için yapraklar açılır!";
            } else if (es.rod.charge < 0) {
                pIcon.innerHTML = '<i class="fas fa-compress-arrows-alt" style="color: #38bdf8;"></i>';
                pTitle.textContent = "🧲 Etki ile Elektriklenme: (-) Ebonit Çubuk Yaklaştırıldı";
                pText.textContent = "Negatif yüklü ebonit çubuk, topuzdaki serbest elektronları (e⁻) yapraklara doğru iter. Topuz pozitif (+), yapraklar negatif (-) kutuplanır. Aynı cins yükler birbirini ittiği için yapraklar açılır!";
            } else {
                pIcon.innerHTML = '<i class="fas fa-balance-scale" style="color: #94a3b8;"></i>';
                pTitle.textContent = "⚖️ Nötr Çubuk Yaklaştırıldı";
                pText.textContent = "Çubuk yüksüz (nötr) olduğu için elektroskopta elektron hareketi oluşmaz. Yapraklar mevcut durumunu korur.";
            }
        } else {
            // Remove / Uzak
            if (es.scope.totalNet !== 0) {
                pBox.className = "lab-pedagogical-card is-work";
                pIcon.innerHTML = '<i class="fas fa-atom" style="color: #f59e0b;"></i>';
                pTitle.textContent = `⚡ Elektroskop Kalıcı Yüklü (${es.scope.totalNet > 0 ? "Pozitif" : "Negatif"})`;
                pText.textContent = `Elektroskop üzerinde net ${es.scope.totalNet > 0 ? "pozitif (+)" : "negatif (-)"} yük birikmiştir. Yapraklar aynı cins yüklerin elektrostatik itmesi nedeniyle açık durmaktadır (α = ${es.scope.leafAngle.toFixed(1)}°).`;
            } else {
                pBox.className = "lab-pedagogical-card";
                pIcon.innerHTML = '<i class="fas fa-balance-scale" style="color: #94a3b8;"></i>';
                pTitle.textContent = "⚖️ Elektroskop Nötr Durumda";
                pText.textContent = "Elektroskop yüksüzdür (nötr). Yapraklarda net yük bulunmadığı için yapraklar tamamen kapalıdır (α = 0°).";
            }
        }
    }

    // Metrik Şeridi (#metrics-bar-7-8) Güncellemesi
    const mbKnob = document.getElementById('mbar-78-knob');
    const mbLeaves = document.getElementById('mbar-78-leaves');
    const mbAngle = document.getElementById('mbar-78-angle');
    const mbStatus = document.getElementById('mbar-78-status');

    const k = es.scope.knobNet;
    const l = es.scope.leavesNet;
    const ang = Math.max(0, es.scope.leafAngle);

    if (mbKnob) {
        mbKnob.textContent = k === 0 ? "Nötr (0)" : (k > 0 ? `+${k}e (Pozitif)` : `${k}e (Negatif)`);
        mbKnob.style.color = k > 0 ? '#f87171' : k < 0 ? '#38bdf8' : '#cbd5e1';
    }
    if (mbLeaves) {
        mbLeaves.textContent = l === 0 ? "Kapalı (Nötr)" : (l > 0 ? `Açık (+${l}e)` : `Açık (${l}e)`);
        mbLeaves.style.color = l > 0 ? '#f87171' : l < 0 ? '#38bdf8' : '#cbd5e1';
    }
    if (mbAngle) {
        mbAngle.textContent = `${ang.toFixed(1)}°`;
    }
    if (mbStatus) {
        if (es.grounding.isActive) {
            mbStatus.textContent = "⚡ Topraklama Yapıldı: Elektroskop tamamen nötrlendi (Yapraklar Kapalı)";
            mbStatus.style.color = "#34d399";
        } else if (es.rod.action === "touch") {
            mbStatus.textContent = `🤝 Dokunma ile Elektriklenme: Elektroskop kalıcı ${es.scope.totalNet > 0 ? 'pozitif' : 'negatif'} yüklendi`;
            mbStatus.style.color = "#facc15";
        } else if (es.rod.action === "approach") {
            mbStatus.textContent = `🧲 Etki ile Kutuplanma: Topuz (${k > 0 ? '+' : '-'}) ve Yapraklar (${l > 0 ? '+' : '-'}) zıt kutuplandı`;
            mbStatus.style.color = "#38bdf8";
        } else if (es.scope.totalNet !== 0) {
            mbStatus.textContent = `⚡ Elektroskop Yüklü: Aynı cins yapraklar birbirini iter (${ang.toFixed(1)}°)`;
            mbStatus.style.color = "#facc15";
        } else {
            mbStatus.textContent = "⚖️ Elektroskop Nötr: Yapraklar Kapalı (0°)";
            mbStatus.style.color = "#94a3b8";
        }
    }
}

// --- DENEY 7.8 CANVAS 2D ÇİZİM MOTORU ---

function drawElectroscopeSimulation() {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const scale = w / 800;
    ctx.save();
    ctx.scale(scale, scale);

    const es = labState.electroscope;
    const cx = 420;
    const cy = 270;

    // 1. Zemin ve Masa Standı
    drawElectroscopeBench(ctx);

    // 2. Cam Fanus
    drawElectroscopeBellJar(ctx, cx, cy);

    // 3. Yalıtkan Tıpa
    drawElectroscopeStopper(ctx, cx, 140);

    // 4. İletken Topuz ve Metal Gövde
    drawElectroscopeKnobAndStem(ctx, cx, es);

    // 5. Altın Yapraklar
    drawElectroscopeLeaves(ctx, cx, 310, es);

    // 6. Yaklaştırılan / Dokundurulan Çubuk
    drawElectroscopeRod(ctx, es);

    // 6.5. Elektrostatik Alan Çizgileri (Hava Aralığı Etkileşimi)
    const tipX = es.rod.x + es.rod.w;
    const airGap = 396 - tipX;
    if (airGap > 6 && airGap < 90 && es.rod.charge !== 0) {
        ctx.save();
        const isPos = es.rod.charge > 0;
        ctx.strokeStyle = isPos ? 'rgba(248, 113, 113, 0.65)' : 'rgba(56, 189, 248, 0.65)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        const animOffset = (animTime * 15) % 6;
        ctx.lineDashOffset = isPos ? -animOffset : animOffset;
        [-10, 0, 10].forEach(dy => {
            ctx.beginPath();
            ctx.moveTo(tipX, 110 + dy);
            ctx.quadraticCurveTo(tipX + airGap / 2, 110 + dy * 1.5, 396, 110 + dy * 0.8);
            ctx.stroke();
        });
        ctx.restore();
    }

    // 7. Topraklama Teli ve Levhası
    drawElectroscopeGroundWire(ctx, es);

    // 8. Kıvılcımlar
    drawElectroscopeSparks(ctx, es);

    ctx.restore();
}

function drawElectroscopeBench(ctx) {
    ctx.save();
    // Masa Gövdesi
    const tableGrad = ctx.createLinearGradient(0, 430, 0, 500);
    tableGrad.addColorStop(0, '#1e293b');
    tableGrad.addColorStop(0.15, '#0f172a');
    tableGrad.addColorStop(1, '#090d16');
    ctx.fillStyle = tableGrad;
    ctx.fillRect(0, 430, 800, 70);

    // Masa Üst Çelik Şerit
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, 428, 800, 3);

    // Masadaki Ahşap / Lab Tezgahı Yansıması
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 40; x < 800; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 430);
        ctx.lineTo(x + 20, 500);
        ctx.stroke();
    }
    ctx.restore();
}

function drawElectroscopeBellJar(ctx, cx, cy) {
    ctx.save();
    // Fanus Taban Kaidesi (Döküm Metal Taban)
    const baseGrad = ctx.createLinearGradient(cx - 130, 0, cx + 130, 0);
    baseGrad.addColorStop(0, '#334155');
    baseGrad.addColorStop(0.5, '#64748b');
    baseGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = baseGrad;
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(cx - 125, 415, 250, 16, 4);
    ctx.fill();
    ctx.stroke();

    // Fanus Şeffaf Cam Kubbesi
    const jarGrad = ctx.createLinearGradient(cx - 110, 0, cx + 110, 0);
    jarGrad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
    jarGrad.addColorStop(0.2, 'rgba(255, 255, 255, 0.12)');
    jarGrad.addColorStop(0.8, 'rgba(56, 189, 248, 0.06)');
    jarGrad.addColorStop(1, 'rgba(30, 58, 138, 0.15)');

    ctx.fillStyle = jarGrad;
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.6)';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    // Cam Fanus Gövdesi: Alt geniş, üstte yarım kubbe
    ctx.moveTo(cx - 110, 415);
    ctx.lineTo(cx - 110, 200);
    ctx.bezierCurveTo(cx - 110, 135, cx - 40, 135, cx - 25, 142);
    ctx.lineTo(cx + 25, 142);
    ctx.bezierCurveTo(cx + 40, 135, cx + 110, 135, cx + 110, 200);
    ctx.lineTo(cx + 110, 415);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cam Yansıma Çizgileri (Specular Highlights)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 95, 400);
    ctx.lineTo(cx - 95, 210);
    ctx.bezierCurveTo(cx - 95, 165, cx - 60, 150, cx - 35, 148);
    ctx.stroke();

    ctx.restore();
}

function drawElectroscopeStopper(ctx, cx, y) {
    ctx.save();
    // Yalıtkan Mantar / Kauçuk Tıpa
    const stopperGrad = ctx.createLinearGradient(cx - 25, 0, cx + 25, 0);
    stopperGrad.addColorStop(0, '#b45309');
    stopperGrad.addColorStop(0.5, '#f59e0b');
    stopperGrad.addColorStop(1, '#78350f');
    ctx.fillStyle = stopperGrad;
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(cx - 24, y + 16);
    ctx.lineTo(cx - 20, y - 10);
    ctx.lineTo(cx + 20, y - 10);
    ctx.lineTo(cx + 24, y + 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
}

function drawElectroscopeKnobAndStem(ctx, cx, es) {
    ctx.save();

    // 1. İletken Metal Şaft (Stem)
    const stemGrad = ctx.createLinearGradient(cx - 4, 0, cx + 4, 0);
    stemGrad.addColorStop(0, '#94a3b8');
    stemGrad.addColorStop(0.5, '#f8fafc');
    stemGrad.addColorStop(1, '#475569');
    ctx.fillStyle = stemGrad;
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;

    ctx.fillRect(cx - 4, 110, 8, 200);
    ctx.strokeRect(cx - 4, 110, 8, 200);

    // 2. İletken Metal Topuz (Knob)
    const knobY = 110;
    const r = 24;

    const knobGrad = ctx.createRadialGradient(cx - 7, knobY - 7, 3, cx, knobY, r);
    knobGrad.addColorStop(0, '#ffffff');
    knobGrad.addColorStop(0.3, '#f1f5f9');
    knobGrad.addColorStop(0.7, '#94a3b8');
    knobGrad.addColorStop(1, '#334155');

    ctx.fillStyle = knobGrad;
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, knobY, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Topuz Üzerindeki Yük Dağılımı Simgeleri
    const k = es.scope.knobNet;
    if (k !== 0) {
        const sign = k > 0 ? '+' : '-';
        const count = Math.min(6, Math.abs(k));
        const color = k > 0 ? '#ef4444' : '#0284c7';
        const border = k > 0 ? '#f87171' : '#38bdf8';

        for (let i = 0; i < count; i++) {
            const ang = (i / count) * Math.PI * 2 + 0.2;
            const qx = cx + Math.cos(ang) * (r * 0.55);
            const qy = knobY + Math.sin(ang) * (r * 0.55);
            drawChargeBadge(ctx, qx, qy, sign, color, border);
        }
    }

    ctx.restore();
}

function drawElectroscopeLeaves(ctx, cx, pivotY, es) {
    ctx.save();
    const angDeg = es.scope.leafAngle;
    const rad = (angDeg * Math.PI) / 180;
    const leafLen = 65;
    const leafWidth = 10;

    // Mafsal Pimi (Pivot Pin)
    ctx.fillStyle = '#facc15';
    ctx.strokeStyle = '#ca8a04';
    ctx.beginPath();
    ctx.arc(cx, pivotY, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Altın Yaprak Gradyanı
    const leafGrad = ctx.createLinearGradient(0, 0, leafWidth, leafLen);
    leafGrad.addColorStop(0, '#fef08a');
    leafGrad.addColorStop(0.5, '#fbbf24');
    leafGrad.addColorStop(1, '#d97706');

    // Sol Yaprak (Hafif kavisli ve merkez omurga çizgili altın varak)
    ctx.save();
    ctx.translate(cx, pivotY);
    ctx.rotate(-rad);
    ctx.fillStyle = leafGrad;
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-leafWidth * 0.7, leafLen * 0.5, -leafWidth / 2, leafLen);
    ctx.lineTo(leafWidth / 2, leafLen);
    ctx.quadraticCurveTo(leafWidth * 0.2, leafLen * 0.5, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Merkez omurga çizgisi
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(0, leafLen - 4);
    ctx.stroke();

    // Sol yapraktaki yük simgeleri
    const l = es.scope.leavesNet;
    if (l !== 0) {
        const sign = l > 0 ? '+' : '-';
        const color = l > 0 ? '#ef4444' : '#0284c7';
        const border = l > 0 ? '#f87171' : '#38bdf8';
        drawChargeBadge(ctx, 0, leafLen * 0.45, sign, color, border);
        drawChargeBadge(ctx, 0, leafLen * 0.8, sign, color, border);
    }
    ctx.restore();

    // Sağ Yaprak
    ctx.save();
    ctx.translate(cx, pivotY);
    ctx.rotate(rad);
    ctx.fillStyle = leafGrad;
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(leafWidth * 0.2, leafLen * 0.5, -leafWidth / 2, leafLen);
    ctx.lineTo(leafWidth / 2, leafLen);
    ctx.quadraticCurveTo(leafWidth * 0.7, leafLen * 0.5, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Merkez omurga çizgisi
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 2);
    ctx.lineTo(0, leafLen - 4);
    ctx.stroke();

    // Sağ yapraktaki yük simgeleri
    if (l !== 0) {
        const sign = l > 0 ? '+' : '-';
        const color = l > 0 ? '#ef4444' : '#0284c7';
        const border = l > 0 ? '#f87171' : '#38bdf8';
        drawChargeBadge(ctx, 0, leafLen * 0.45, sign, color, border);
        drawChargeBadge(ctx, 0, leafLen * 0.8, sign, color, border);
    }
    ctx.restore();

    // Açı Göstergesi Yayı (Angle Arc)
    if (angDeg > 4) {
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.7)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.arc(cx, pivotY, 35, Math.PI / 2 - rad, Math.PI / 2 + rad);
        ctx.stroke();
        ctx.setLineDash([]);
        // Zero-Canvas-Text: alfa derece metni sağ panel rozetine aktarıldı
    }

    ctx.restore();
}

function drawElectroscopeRod(ctx, es) {
    ctx.save();
    const rod = es.rod;
    const rx = rod.x;
    const ry = rod.y;
    const rw = rod.w;
    const rh = rod.h;

    // Çubuk Tutma Sapı (Yalıtkan Sap)
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(rx, ry + 2, 45, rh - 4, 4);
    ctx.fill();
    ctx.stroke();

    // Çubuk Gövdesi
    let rodGrad;
    let rodBorder;

    if (rod.type === "glass_pos") {
        // Cam Çubuk (Şeffaf / Buz Mavisi)
        rodGrad = ctx.createLinearGradient(rx + 45, ry, rx + rw, ry);
        rodGrad.addColorStop(0, 'rgba(192, 132, 252, 0.6)');
        rodGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
        rodGrad.addColorStop(1, 'rgba(192, 132, 252, 0.7)');
        rodBorder = '#c084fc';
    } else if (rod.type === "ebonite_neg") {
        // Ebonit Çubuk (Sert Plastik / Mat Siyah)
        rodGrad = ctx.createLinearGradient(rx + 45, ry, rx + rw, ry);
        rodGrad.addColorStop(0, '#1e1b4b');
        rodGrad.addColorStop(0.5, '#312e81');
        rodGrad.addColorStop(1, '#0f172a');
        rodBorder = '#6366f1';
    } else {
        // Nötr Çubuk
        rodGrad = ctx.createLinearGradient(rx + 45, ry, rx + rw, ry);
        rodGrad.addColorStop(0, '#475569');
        rodGrad.addColorStop(0.5, '#64748b');
        rodGrad.addColorStop(1, '#334155');
        rodBorder = '#94a3b8';
    }

    ctx.fillStyle = rodGrad;
    ctx.strokeStyle = rodBorder;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(rx + 45, ry, rw - 45, rh, [0, 8, 8, 0]);
    ctx.fill();
    ctx.stroke();

    // Çubuk Üzerindeki Yükler
    if (rod.charge !== 0) {
        const sign = rod.charge > 0 ? '+' : '-';
        const color = rod.charge > 0 ? '#ef4444' : '#0284c7';
        const border = rod.charge > 0 ? '#f87171' : '#38bdf8';
        for (let x = rx + 65; x < rx + rw - 15; x += 26) {
            drawChargeBadge(ctx, x, ry + rh / 2, sign, color, border);
        }
    }

    // Zero-Canvas-Text: Çubuk türü etiket düğmesinde parlar, tuval metni kaldırıldı
    ctx.restore();
}

function drawElectroscopeGroundWire(ctx, es) {
    ctx.save();
    const groundX = 640;
    const groundY = 110;
    const isGrounded = es.grounding.isActive;

    // Toprak Levhası ve Sembolü (⏚)
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = isGrounded ? '#34d399' : '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(groundX - 25, groundY - 20, 50, 40, 6);
    ctx.fill();
    ctx.stroke();

    // Toprak Sembolü Çizimi (⏚)
    ctx.strokeStyle = isGrounded ? '#34d399' : '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(groundX, groundY - 10);
    ctx.lineTo(groundX, groundY + 4);
    // 3 yatay basamak
    ctx.moveTo(groundX - 14, groundY + 4);
    ctx.lineTo(groundX + 14, groundY + 4);
    ctx.moveTo(groundX - 9, groundY + 9);
    ctx.lineTo(groundX + 9, groundY + 9);
    ctx.moveTo(groundX - 4, groundY + 14);
    ctx.lineTo(groundX + 4, groundY + 14);
    ctx.stroke();

    // İletken Tel: Topraktan Topuza
    ctx.save();
    ctx.lineWidth = 2.5;
    if (isGrounded) {
        ctx.strokeStyle = '#34d399';
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 10;
    } else {
        ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
    }

    ctx.beginPath();
    ctx.moveTo(groundX - 25, groundY);
    ctx.bezierCurveTo(groundX - 80, groundY + 50, 520, groundY + 40, isGrounded ? 444 : 500, isGrounded ? 110 : groundY + 15);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
}

function drawElectroscopeSparks(ctx, es) {
    ctx.save();
    // Topraklama kıvılcımları
    es.grounding.sparks.forEach(s => {
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // Dokunma kıvılcımları
    es.sparks.forEach(s => {
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();
}

// --- 8.9. DENEY 7.9: BESİN PİRAMİDİNDE ENERJİ AKIŞI VE BİYOBİRİKİM MOTORU ---

const TROPHIC_TIERS = [
    {
        id: 0,
        name: "1. Trofik Basamak: Üreticiler",
        shortName: "Üreticiler (Bitkiler)",
        examples: "Yeşil Bitkiler, Otlar, Fitoplankton",
        role: "Güneş enerjisini fotosentez ile kimyasal bağ enerjisine çevirir.",
        energyFraction: 0.10, // 100.000 J güneşten 10.000 J bağlar
        heatFraction: 0.90,
        ppmBase: 0.05,
        biomass: "En Büyük (~10.000 kg)",
        individualCount: "En Fazla (Milyonlarca)",
        color: "#10b981",
        gradientStart: '#064e3b',
        gradientEnd: '#059669',
        yTop: 320,
        yBottom: 390,
        wTop: 420,
        wBottom: 540
    },
    {
        id: 1,
        name: "2. Trofik Basamak: 1. Tüketiciler (Otçullar)",
        shortName: "1. Tüketiciler (Otçul)",
        examples: "Çekirge, Tavşan, Koyun, Zooplankton",
        role: "Doğrudan üreticilerle beslenir, enerjinin %10'unu depolar.",
        energyFraction: 0.01, // 1.000 J
        heatFraction: 0.90,
        ppmBase: 0.50,
        biomass: "Çok (~1.000 kg)",
        individualCount: "Çok (~10.000)",
        color: "#f59e0b",
        gradientStart: '#78350f',
        gradientEnd: '#d97706',
        yTop: 250,
        yBottom: 320,
        wTop: 300,
        wBottom: 420
    },
    {
        id: 2,
        name: "3. Trofik Basamak: 2. Tüketiciler (Etçiller)",
        shortName: "2. Tüketiciler (Etçil)",
        examples: "Kurbağa, Yılan, Tilki, Küçük Balık",
        role: "Otçulları avlar; enerjinin %90'ı ısı ve metabolizmada harcanır.",
        energyFraction: 0.001, // 100 J
        heatFraction: 0.90,
        ppmBase: 5.0,
        biomass: "Az (~100 kg)",
        individualCount: "Az (~500)",
        color: "#f97316",
        gradientStart: '#7c2d12',
        gradientEnd: '#ea580c',
        yTop: 180,
        yBottom: 250,
        wTop: 180,
        wBottom: 300
    },
    {
        id: 3,
        name: "4. Trofik Basamak: 3. Tüketiciler (Tepe Avcılar)",
        shortName: "3. Tüketiciler (Tepe Avcı)",
        examples: "Kartal, Şahin, Aslan, Balıkçıl Kuş",
        role: "Besin zincirinin en üst basamağı. Enerji en az, zehir en fazladır!",
        energyFraction: 0.0001, // 10 J
        heatFraction: 0.90,
        ppmBase: 50.0,
        biomass: "En Az (~10 kg)",
        individualCount: "En Az (~2-5)",
        color: "#ef4444",
        gradientStart: '#7f1d1d',
        gradientEnd: '#dc2626',
        yTop: 110,
        yBottom: 180,
        wTop: 60,
        wBottom: 180
    },
    {
        id: 4,
        name: "Ayrıştırıcılar (Mantarlar & Bakteriler)",
        shortName: "Ayrıştırıcılar",
        examples: "Küf Mantarı, Şapkalı Mantar, Çürükçül Bakteriler",
        role: "Piramidin TÜM basamaklarına bağlıdır. Organik atıkları inorganik maddelere çevirir.",
        energyFraction: 0,
        heatFraction: 1.0,
        ppmBase: 0.1,
        biomass: "Değişken",
        individualCount: "Milyarlarca",
        color: "#8b5cf6",
        gradientStart: '#4c1d95',
        gradientEnd: '#7c3aed',
        yTop: 140,
        yBottom: 360,
        wTop: 120,
        wBottom: 120
    }
];

function setupFoodPyramidControlsDOM() {
    // 1. Mod Butonları (%10 Enerji vs Biyobirikim)
    const btnEnergy = document.getElementById('btn-pyramid-mode-energy');
    const btnBioaccum = document.getElementById('btn-pyramid-mode-bioaccum');

    if (btnEnergy) btnEnergy.addEventListener('click', () => setFoodPyramidMode("energy"));
    if (btnBioaccum) btnBioaccum.addEventListener('click', () => setFoodPyramidMode("bioaccum"));

    // 2. Güneş Enerjisi Butonları
    const bSun50k = document.getElementById('btn-sun-50k');
    const bSun100k = document.getElementById('btn-sun-100k');
    const bSun200k = document.getElementById('btn-sun-200k');

    if (bSun50k) bSun50k.addEventListener('click', () => setFoodPyramidSunlight(50000));
    if (bSun100k) bSun100k.addEventListener('click', () => setFoodPyramidSunlight(100000));
    if (bSun200k) bSun200k.addEventListener('click', () => setFoodPyramidSunlight(200000));

    // 3. Pestisit / Zehir Dozu Butonları
    const bPestLow = document.getElementById('btn-pest-low');
    const bPestMed = document.getElementById('btn-pest-med');
    const bPestHigh = document.getElementById('btn-pest-high');

    if (bPestLow) bPestLow.addEventListener('click', () => setFoodPyramidPesticide("low"));
    if (bPestMed) bPestMed.addEventListener('click', () => setFoodPyramidPesticide("med"));
    if (bPestHigh) bPestHigh.addEventListener('click', () => setFoodPyramidPesticide("high"));

    // 4. Akışı Duraklat / Başlat & Sıfırla
    const btnFlow = document.getElementById('btn-pyramid-toggle-flow');
    const btnReset = document.getElementById('btn-pyramid-reset');

    if (btnFlow) btnFlow.addEventListener('click', toggleFoodPyramidFlow);
    if (btnReset) btnReset.addEventListener('click', resetFoodPyramidExperiment);

    // 5. Trofik Basamak Seçici Butonları
    const pProd = document.getElementById('pill-tier-producer');
    const pHerb = document.getElementById('pill-tier-herbivore');
    const pCarn = document.getElementById('pill-tier-carnivore');
    const pApex = document.getElementById('pill-tier-apex');
    const pDecomp = document.getElementById('pill-tier-decomposer');

    if (pProd) pProd.addEventListener('click', () => selectFoodPyramidTier(0));
    if (pHerb) pHerb.addEventListener('click', () => selectFoodPyramidTier(1));
    if (pCarn) pCarn.addEventListener('click', () => selectFoodPyramidTier(2));
    if (pApex) pApex.addEventListener('click', () => selectFoodPyramidTier(3));
    if (pDecomp) pDecomp.addEventListener('click', () => selectFoodPyramidTier(4));

    // 6. Gözlemi Kaydet Butonu
    const btnRecord79 = document.getElementById('btn-record-data-7-9');
    if (btnRecord79) btnRecord79.addEventListener('click', recordMeasurement);
}

function setFoodPyramidMode(mode) {
    const fp = labState.foodPyramid;
    fp.mode = mode;

    const bEnergy = document.getElementById('btn-pyramid-mode-energy');
    const bBioaccum = document.getElementById('btn-pyramid-mode-bioaccum');
    const grpSun = document.getElementById('group-sunlight-7-9');
    const grpPest = document.getElementById('group-pesticide-7-9');

    if (bEnergy) bEnergy.classList.toggle('active', mode === "energy");
    if (bBioaccum) bBioaccum.classList.toggle('active', mode === "bioaccum");
    if (grpSun) grpSun.classList.toggle('is-hidden', mode !== "energy");
    if (grpPest) grpPest.classList.toggle('is-hidden', mode !== "bioaccum");

    updateFoodPyramidMetricsDOM();
    showLabToast(mode === "energy" ? "⚡ %10 Enerji Akışı Modu Aktif" : "☠️ Biyolojik Birikim (Zehir) Modu Aktif");
}

function setFoodPyramidSunlight(amount) {
    const fp = labState.foodPyramid;
    fp.sunlight = amount;

    const b50 = document.getElementById('btn-sun-50k');
    const b100 = document.getElementById('btn-sun-100k');
    const b200 = document.getElementById('btn-sun-200k');

    if (b50) b50.classList.toggle('active', amount === 50000);
    if (b100) b100.classList.toggle('active', amount === 100000);
    if (b200) b200.classList.toggle('active', amount === 200000);

    updateFoodPyramidMetricsDOM();
    showLabToast(`Güneş Enerjisi Girişi: ${amount.toLocaleString('tr-TR')} J`);
}

function setFoodPyramidPesticide(dose) {
    const fp = labState.foodPyramid;
    fp.pesticideDose = dose;

    const bLow = document.getElementById('btn-pest-low');
    const bMed = document.getElementById('btn-pest-med');
    const bHigh = document.getElementById('btn-pest-high');

    if (bLow) bLow.classList.toggle('active', dose === "low");
    if (bMed) bMed.classList.toggle('active', dose === "med");
    if (bHigh) bHigh.classList.toggle('active', dose === "high");

    updateFoodPyramidMetricsDOM();
    showLabToast(`Tarım İlacı Dozu: ${dose === "low" ? "Düşük (0.05 ppm)" : dose === "med" ? "Orta (0.5 ppm)" : "Yüksek (2.0 ppm)"}`);
}

function selectFoodPyramidTier(tierIndex) {
    const fp = labState.foodPyramid;
    fp.selectedTier = tierIndex;

    const pillIds = ['pill-tier-producer', 'pill-tier-herbivore', 'pill-tier-carnivore', 'pill-tier-apex', 'pill-tier-decomposer'];
    pillIds.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', idx === tierIndex);
    });

    updateFoodPyramidMetricsDOM();
}

function toggleFoodPyramidFlow() {
    const fp = labState.foodPyramid;
    fp.isFlowing = !fp.isFlowing;

    const label = document.getElementById('label-pyramid-flow');
    const btn = document.getElementById('btn-pyramid-toggle-flow');
    if (label) label.textContent = fp.isFlowing ? "Duraklat" : "Oynat";
    if (btn) {
        btn.innerHTML = fp.isFlowing 
            ? '<i class="fas fa-pause"></i> <span id="label-pyramid-flow">Duraklat</span>' 
            : '<i class="fas fa-play"></i> <span id="label-pyramid-flow">Oynat</span>';
    }
}

function resetFoodPyramidExperiment() {
    const fp = labState.foodPyramid;
    fp.mode = "energy";
    fp.sunlight = 100000;
    fp.pesticideDose = "med";
    fp.selectedTier = 0;
    fp.isFlowing = true;
    fp.flowParticles = [];
    fp.heatArrows = [];
    fp.poisonParticles = [];

    const label = document.getElementById('label-pyramid-flow');
    const btnFlow = document.getElementById('btn-pyramid-toggle-flow');
    if (label) label.textContent = "Duraklat";
    if (btnFlow) btnFlow.innerHTML = '<i class="fas fa-pause"></i> <span id="label-pyramid-flow">Duraklat</span>';

    // Buton aktifliklerini sıfırla
    setFoodPyramidMode("energy");
    setFoodPyramidSunlight(100000);
    setFoodPyramidPesticide("med");
    selectFoodPyramidTier(0);

    showLabToast("Ekoloji piramidi başlangıç ayarlarına sıfırlandı");
}

function initFoodPyramidState() {
    const fp = labState.foodPyramid;
    fp.flowParticles = [];
    fp.heatArrows = [];
    fp.poisonParticles = [];

    // Başlangıç zehir parçacıklarını üret
    initPyramidPoisonParticles(fp);
    updateFoodPyramidMetricsDOM();
}

function initPyramidPoisonParticles(fp) {
    fp.poisonParticles = [];
    const mult = (fp.pesticideDose === "low") ? 0.5 : (fp.pesticideDose === "high") ? 2.5 : 1.0;

    // Basamak 0 (Üretici): Seyrek, küçük noktalar
    const count0 = Math.round(15 * mult);
    for (let i = 0; i < count0; i++) {
        fp.poisonParticles.push({
            tier: 0,
            x: 360 + (Math.random() - 0.5) * 440,
            y: 325 + Math.random() * 55,
            size: 2.5,
            color: '#a3e635'
        });
    }

    // Basamak 1 (Otçul): Orta sıklıkta
    const count1 = Math.round(25 * mult);
    for (let i = 0; i < count1; i++) {
        fp.poisonParticles.push({
            tier: 1,
            x: 360 + (Math.random() - 0.5) * 320,
            y: 255 + Math.random() * 55,
            size: 3.5,
            color: '#facc15'
        });
    }

    // Basamak 2 (Etçil): Yoğun turuncu
    const count2 = Math.round(35 * mult);
    for (let i = 0; i < count2; i++) {
        fp.poisonParticles.push({
            tier: 2,
            x: 360 + (Math.random() - 0.5) * 200,
            y: 185 + Math.random() * 55,
            size: 4.5,
            color: '#fb923c'
        });
    }

    // Basamak 3 (Tepe Avcı): Çok yoğun, parlak kırmızı/toksik
    const count3 = Math.round(45 * mult);
    for (let i = 0; i < count3; i++) {
        fp.poisonParticles.push({
            tier: 3,
            x: 360 + (Math.random() - 0.5) * 90,
            y: 115 + Math.random() * 55,
            size: 5.5,
            color: '#ef4444'
        });
    }
}

function updateFoodPyramidEcology() {
    const fp = labState.foodPyramid;
    if (!fp.isFlowing) return;

    // 1. Enerji Modu Parçacıkları (Yukarı Yükselen Fotonlar)
    if (fp.mode === "energy") {
        if (Math.random() < 0.35) {
            fp.flowParticles.push({
                x: 360 + (Math.random() - 0.5) * 300,
                y: 380,
                targetY: 120,
                vy: 1.8 + Math.random() * 1.5,
                alpha: 1.0,
                color: '#fef08a',
                size: 2.5 + Math.random() * 2
            });
        }

        fp.flowParticles = fp.flowParticles.filter(p => {
            p.y -= p.vy;
            if (p.y <= p.targetY) p.alpha -= 0.05;
            return p.alpha > 0;
        });

        // 2. Isı Kaybı Duman / Parçacıkları (Sağa kaçan kırmızı oklar)
        if (Math.random() < 0.25) {
            const tiers = [0, 1, 2];
            const t = tiers[Math.floor(Math.random() * tiers.length)];
            const curTier = TROPHIC_TIERS[t];
            fp.heatArrows.push({
                x: 360 + curTier.wBottom / 2 - 20,
                y: curTier.yTop + (curTier.yBottom - curTier.yTop) / 2,
                vx: 1.5 + Math.random() * 1.2,
                vy: (Math.random() - 0.5) * 0.8,
                alpha: 1.0,
                color: '#f87171'
            });
        }

        fp.heatArrows = fp.heatArrows.filter(a => {
            a.x += a.vx;
            a.y += a.vy;
            a.alpha -= 0.025;
            return a.alpha > 0 && a.x < 780;
        });
    }
}

function updateFoodPyramidMetricsDOM() {
    const fp = labState.foodPyramid;
    const tier = TROPHIC_TIERS[fp.selectedTier] || TROPHIC_TIERS[0];
    const sun = fp.sunlight;

    // Başlık
    const hHeading = document.getElementById('label-selected-tier-heading');
    if (hHeading) hHeading.textContent = `${tier.shortName} Detay Metrikleri`;

    // Metrikler
    const mEnergy = document.getElementById('metric-tier-energy');
    const mHeat = document.getElementById('metric-tier-heat');
    const mPoison = document.getElementById('metric-tier-poison');
    const mBiomass = document.getElementById('metric-tier-biomass');

    const mult = (fp.pesticideDose === "low") ? 0.5 : (fp.pesticideDose === "high") ? 2.5 : 1.0;
    const curPpm = (tier.ppmBase * mult).toFixed(2);

    if (mEnergy) {
        if (tier.id === 4) {
            mEnergy.textContent = "Madde Döngüsü";
            mEnergy.style.color = '#a78bfa';
        } else {
            const curE = sun * tier.energyFraction;
            mEnergy.textContent = `${Math.round(curE).toLocaleString('tr-TR')} J`;
            mEnergy.style.color = tier.color;
        }
    }

    if (mHeat) {
        if (tier.id === 4) {
            mHeat.textContent = "Tam Çürüme";
            mHeat.style.color = '#c084fc';
        } else {
            const curH = sun * tier.energyFraction * 9;
            mHeat.textContent = `${Math.round(curH).toLocaleString('tr-TR')} J (%90)`;
            mHeat.style.color = '#f87171';
        }
    }

    if (mPoison) {
        mPoison.textContent = `${curPpm} ppm`;
        mPoison.style.color = tier.id === 3 ? '#ef4444' : tier.id === 2 ? '#fb923c' : tier.id === 1 ? '#facc15' : '#38bdf8';
    }

    if (mBiomass) {
        mBiomass.textContent = tier.biomass;
        mBiomass.style.color = '#cbd5e1';
    }

    // Metrik Şeridi (#metrics-bar-7-9) Güncellemesi
    const mbTier = document.getElementById('mbar-79-tier');
    const mbEnergy = document.getElementById('mbar-79-energy');
    const mbBioaccum = document.getElementById('mbar-79-bioaccum');
    const mbBiomass = document.getElementById('mbar-79-biomass');
    const mbStatus = document.getElementById('mbar-79-status');

    if (mbTier) {
        mbTier.textContent = tier.shortName;
        mbTier.style.color = tier.color || '#38bdf8';
    }
    if (mbEnergy) {
        if (tier.id === 4) {
            mbEnergy.textContent = "Madde Döngüsü";
        } else {
            const curE = sun * tier.energyFraction;
            mbEnergy.textContent = `${Math.round(curE).toLocaleString('tr-TR')} J (${(tier.energyFraction * 100).toFixed(1)}%)`;
        }
    }
    if (mbBioaccum) {
        mbBioaccum.textContent = `${curPpm} ppm`;
        mbBioaccum.style.color = tier.id === 3 ? '#ef4444' : tier.id === 2 ? '#fb923c' : tier.id === 1 ? '#facc15' : '#38bdf8';
    }
    if (mbBiomass) {
        mbBiomass.textContent = tier.biomass;
    }
    if (mbStatus) {
        if (fp.mode === "energy") {
            mbStatus.textContent = "⚡ %10 Kuralı: Enerjinin %90'ı ısı olarak kaybolur, sadece %10'u aktarılır";
            mbStatus.style.color = "#facc15";
        } else {
            mbStatus.textContent = "☠️ Biyolojik Birikim: Parçalanamayan toksinler tepe avcıda ölümcül seviyede birikir";
            mbStatus.style.color = "#ef4444";
        }
    }

    // Pedagojik Çıkarım Kartı
    const pBox = document.getElementById('pyramid-pedagogical-box');
    const pTitle = document.getElementById('pyramid-pedagogical-title');
    const pText = document.getElementById('pyramid-pedagogical-text');
    const pIcon = document.getElementById('pyramid-pedagogical-icon');

    if (pBox && pTitle && pText && pIcon) {
        pBox.className = "lab-pedagogical-card is-work";
        if (fp.mode === "energy") {
            if (tier.id === 0) {
                pIcon.innerHTML = '<i class="fas fa-seedling" style="color: #10b981;"></i>';
                pTitle.textContent = "🌱 Üreticiler: Fotosentez ile Enerji Girişi";
                pText.textContent = `Güneşten gelen enerjinin (~${sun.toLocaleString('tr-TR')} J) yaklaşık %10'unu (10.000 J) bağlayarak besin zincirine katan tek gruptur. Toplam biyokütle ve birey sayısı en büyüktür.`;
            } else if (tier.id === 1) {
                pIcon.innerHTML = '<i class="fas fa-bug" style="color: #f59e0b;"></i>';
                pTitle.textContent = "🦗 1. Tüketiciler (Otçullar): %10 Enerji Aktarımı";
                pText.textContent = "Üreticilerdeki 10.000 J enerjinin yalnızca %10'u (1.000 J) otçulun dokularına aktarılır. Kalan %90'lık devasa kısım (9.000 J) yaşamsal faaliyetlerde (solunum, hareket, boşaltım) ISI OLARAK çevreye yayılır!";
            } else if (tier.id === 2) {
                pIcon.innerHTML = '<i class="fas fa-frog" style="color: #f97316;"></i>';
                pTitle.textContent = "🐸 2. Tüketiciler (Etçiller): Enerji Hızla Azalıyor";
                pText.textContent = "Otçuldaki 1.000 J enerjinin yalnızca 100 J'lük kısmı etçile geçer. Piramitte yukarı çıkıldıkça aktarılan enerji hızla azaldığı için etçil birey sayısı da otçullardan azdır.";
            } else if (tier.id === 3) {
                pIcon.innerHTML = '<i class="fas fa-feather-alt" style="color: #ef4444;"></i>';
                pTitle.textContent = "🦅 3. Tüketiciler (Tepe Avcı): En Az Enerji Zirvede!";
                pText.textContent = `Güneşin ${sun.toLocaleString('tr-TR')} J enerjisinden tepe avcının payına yalnızca 10 J kalmıştır! Enerji kaybı çok yüksek olduğu için tepe avcıların sayısı ekosistemde daima en azdır.`;
            } else {
                pIcon.innerHTML = '<i class="fas fa-recycle" style="color: #8b5cf6;"></i>';
                pTitle.textContent = "🍄 Ayrıştırıcılar: Ekosistemin Geri Dönüşüm Fabrikası";
                pText.textContent = "Ayrıştırıcılar (bakteri ve mantarlar) piramidin tek bir basamağında değil, TÜM basamaklarında görev yapar. Ölen canlı atıklarını inorganik minerallere çevirerek toprağa kazandırırlar.";
            }
        } else {
            // Biyobirikim (Zehir) Modu
            if (tier.id === 3) {
                pIcon.innerHTML = '<i class="fas fa-skull-crossbones" style="color: #ef4444;"></i>';
                pTitle.textContent = "☠️ Tepe Avcıda Ölümcül Toksik Birikim (50.0 ppm)!";
                pText.textContent = "DDT ve ağır metaller gibi zehirler canlı vücudunda parçalanamaz ve atılamaz. Besin zincirinde yukarı çıkıldıkça katlanarak birikir ve EN ÜST BASAMAKTAKİ CANLIDA EN YÜKSEK (Ölümcül) seviyeye ulaşır!";
            } else if (tier.id === 0) {
                pIcon.innerHTML = '<i class="fas fa-shield-alt" style="color: #10b981;"></i>';
                pTitle.textContent = "🌿 Üreticilerde Zehir Yoğunluğu En Düşüktür (0.05 ppm)";
                pText.textContent = "Topraktan veya sudan alınan tarım ilacı üreticinin büyük biyokütlesi içine dağıldığı için konsantrasyon (ppm) taban basamakta en azdır.";
            } else {
                pIcon.innerHTML = '<i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i>';
                pTitle.textContent = `⚠️ Biyolojik Birikim Katlanarak Artıyor (${curPpm} ppm)`;
                pText.textContent = "Bir otçul yaşamı boyunca binlerce bitki yer; bir etçil ise yüzlerce otçul tüketir. Parçalanamayan toksinler her basamakta 10 kat yoğunlaşır.";
            }
        }
    }
}

// --- DENEY 7.9 CANVAS 2D ÇİZİM MOTORU ---

function drawFoodPyramidSimulation() {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const scale = w / 800;
    ctx.save();
    ctx.scale(scale, scale);

    const fp = labState.foodPyramid;

    // 1. Arka Plan Güneş
    drawPyramidSun(ctx, fp.sunlight);

    // 2. Sol Biyokütle / Birey Sayısı İndikatör Şeridi
    drawPyramidBiomassBar(ctx);

    // 3. Ekoloji Piramidi 4 Basamağı
    drawPyramidTiers(ctx, fp);

    // 4. Ayrıştırıcılar Kutusu (Sağ Taraf)
    drawPyramidDecomposers(ctx, fp.selectedTier === 4);

    // 5. Mod A: Enerji Akışı & Isı Kaybı Okları
    if (fp.mode === "energy") {
        drawPyramidEnergyFlow(ctx, fp);
    }

    // 6. Mod B: Biyobirikim Zehir Noktaları
    if (fp.mode === "bioaccum") {
        drawPyramidBioaccumulation(ctx, fp);
    }

    ctx.restore();
}

function drawPyramidSun(ctx, sunlight) {
    ctx.save();
    const sx = 85;
    const sy = 85;
    const r = 36;

    // Güneş Işınları Halosu
    const sunGlow = ctx.createRadialGradient(sx, sy, 10, sx, sy, 70);
    sunGlow.addColorStop(0, 'rgba(250, 204, 21, 0.45)');
    sunGlow.addColorStop(0.5, 'rgba(245, 158, 11, 0.2)');
    sunGlow.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sx, sy, 70, 0, Math.PI * 2);
    ctx.fill();

    // Dönen Güneş Işınları
    ctx.strokeStyle = 'rgba(253, 224, 71, 0.6)';
    ctx.lineWidth = 2.5;
    const rayCount = 12;
    for (let i = 0; i < rayCount; i++) {
        const ang = (i / rayCount) * Math.PI * 2 + animTime * 0.1;
        const x1 = sx + Math.cos(ang) * (r + 4);
        const y1 = sy + Math.sin(ang) * (r + 4);
        const x2 = sx + Math.cos(ang) * (r + 14);
        const y2 = sy + Math.sin(ang) * (r + 14);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // Güneş Küresi
    const sunGrad = ctx.createRadialGradient(sx - 8, sy - 8, 4, sx, sy, r);
    sunGrad.addColorStop(0, '#ffffff');
    sunGrad.addColorStop(0.3, '#fef08a');
    sunGrad.addColorStop(0.8, '#f59e0b');
    sunGrad.addColorStop(1, '#b45309');

    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sx, sy, r, 0, Math.PI * 2);
    ctx.fill();

    // Zero-Canvas-Text: Güneş enerjisi alt metrik şeridinde (#metrics-bar-7-9) gösterilir
    ctx.restore();
}

function drawPyramidTiers(ctx, fp) {
    // 4 basamağı alttan üste doğru çiz
    for (let i = 0; i < 4; i++) {
        const tier = TROPHIC_TIERS[i];
        const isSelected = (fp.selectedTier === i);
        drawPyramidTierTrapezoid(ctx, tier, isSelected, fp);
    }
}

function drawPyramidTierTrapezoid(ctx, tier, isSelected, fp) {
    ctx.save();
    const cx = 360;
    const yT = tier.yTop;
    const yB = tier.yBottom;
    const wT = tier.wTop;
    const wB = tier.wBottom;

    const xTL = cx - wT / 2;
    const xTR = cx + wT / 2;
    const xBL = cx - wB / 2;
    const xBR = cx + wB / 2;

    // Basamak Gövdesi (Yamuk)
    const trapGrad = ctx.createLinearGradient(0, yT, 0, yB);
    trapGrad.addColorStop(0, tier.gradientEnd);
    trapGrad.addColorStop(1, tier.gradientStart);

    ctx.fillStyle = trapGrad;
    ctx.strokeStyle = isSelected ? '#facc15' : tier.color;
    ctx.lineWidth = isSelected ? 3.5 : 1.5;

    if (isSelected) {
        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 14;
    }

    ctx.beginPath();
    ctx.moveTo(xTL, yT);
    ctx.lineTo(xTR, yT);
    ctx.lineTo(xBR, yB);
    ctx.lineTo(xBL, yB);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Üst Kenar 3D Işıltı Çizgisi
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(xTL + 4, yT + 1);
    ctx.lineTo(xTR - 4, yT + 1);
    ctx.stroke();

    // Zero-Canvas-Text: Basamak merkezi ışıma diski (İsim ve metrikler alt metrik şeridinde yer alır)
    const midY = (yT + yB) / 2;
    ctx.fillStyle = isSelected ? '#ffffff' : tier.color;
    ctx.shadowColor = tier.color;
    ctx.shadowBlur = isSelected ? 10 : 4;
    ctx.beginPath();
    ctx.arc(cx, midY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.restore();
}

function drawPyramidDecomposers(ctx, isSelected) {
    ctx.save();
    const bx = 640;
    const by = 150;
    const bw = 125;
    const bh = 240;

    // Ayrıştırıcılar Kutusu
    const decompGrad = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
    decompGrad.addColorStop(0, '#3b0764');
    decompGrad.addColorStop(1, '#1e1b4b');

    ctx.fillStyle = decompGrad;
    ctx.strokeStyle = isSelected ? '#facc15' : '#8b5cf6';
    ctx.lineWidth = isSelected ? 3 : 1.5;

    if (isSelected) {
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 12;
    }

    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 8);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;

    // Zero-Canvas-Text: Ayrıştırıcılar odası geri dönüşüm çemberi (Metinler ve açıklamalar alt metrik şeridindedir)
    ctx.strokeStyle = isSelected ? '#facc15' : 'rgba(192, 132, 252, 0.6)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(bx + bw / 2, by + bh / 2, 22, 0, Math.PI * 1.5);
    ctx.stroke();

    // 4 basamaktan ayrıştırıcılara bağlanan mor bağlantı hatları
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.45)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([3, 3]);

    const tierRights = [
        { x: 360 + 270, y: 355 },
        { x: 360 + 210, y: 285 },
        { x: 360 + 150, y: 215 },
        { x: 360 + 90, y: 145 }
    ];

    tierRights.forEach((pt, idx) => {
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.bezierCurveTo(bx - 30, pt.y, bx - 10, by + 50 + idx * 45, bx, by + 50 + idx * 45);
        ctx.stroke();
    });

    ctx.setLineDash([]);
    ctx.restore();
}

function drawPyramidEnergyFlow(ctx, fp) {
    ctx.save();

    // 1. Güneşten Üreticiye Işın Akışı
    const sunX = 85;
    const sunY = 85;
    ctx.strokeStyle = 'rgba(250, 204, 21, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(sunX + 30, sunY + 30);
    ctx.lineTo(200, 320);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Yükselen Enerji Fotonları
    fp.flowParticles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    // 3. Basamaklar Arası %10 Aktarım Okları (Sol Kenar)
    const arrowX = 140;
    const transitions = [
        { yFrom: 355, yTo: 285, label: "%10 Aktarım" },
        { yFrom: 285, yTo: 215, label: "%10 Aktarım" },
        { yFrom: 215, yTo: 145, label: "%10 Aktarım" }
    ];

    transitions.forEach(tr => {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(arrowX, tr.yFrom);
        ctx.lineTo(arrowX, tr.yTo);
        ctx.stroke();

        // Ok Ucu
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(arrowX, tr.yTo - 4);
        ctx.lineTo(arrowX - 4, tr.yTo + 4);
        ctx.lineTo(arrowX + 4, tr.yTo + 4);
        ctx.closePath();
        ctx.fill();
    });

    // 4. Her Basamaktan Çıkan %90 Isı Kaybı Okları ve Dumanı (Sağ Taraf)
    const heatArrows = [
        { y: 355, loss: Math.round(fp.sunlight * 0.1 * 9).toLocaleString('tr-TR') },
        { y: 285, loss: Math.round(fp.sunlight * 0.01 * 9).toLocaleString('tr-TR') },
        { y: 215, loss: Math.round(fp.sunlight * 0.001 * 9).toLocaleString('tr-TR') },
        { y: 145, loss: Math.round(fp.sunlight * 0.0001 * 9).toLocaleString('tr-TR') }
    ];

    heatArrows.forEach((ha, idx) => {
        const startX = 360 + (TROPHIC_TIERS[idx].wBottom / 2) + 6;
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(startX, ha.y);
        ctx.bezierCurveTo(startX + 30, ha.y - 10, startX + 50, ha.y - 25, startX + 65, ha.y - 15);
        ctx.stroke();

        // Ok Ucu
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(startX + 68, ha.y - 13);
        ctx.lineTo(startX + 58, ha.y - 22);
        ctx.lineTo(startX + 60, ha.y - 10);
        ctx.closePath();
        ctx.fill();
        // Zero-Canvas-Text: Isı kaybı okları ve duman parçacıkları yönü gösterir, metinler dışarıdadır
    });

    // Dinamik Isı Duman Parçacıkları
    fp.heatArrows.forEach(a => {
        ctx.fillStyle = a.color;
        ctx.globalAlpha = Math.max(0, a.alpha);
        ctx.beginPath();
        ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.restore();
}

function drawPyramidBioaccumulation(ctx, fp) {
    ctx.save();
    // Zehir Parçacıkları Çizimi
    fp.poisonParticles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = (p.tier === 3) ? 8 : 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.tier === 3) {
            // Tepe avcıda toksik haç işareti
            ctx.strokeStyle = '#7f1d1d';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x - 2, p.y - 2);
            ctx.lineTo(p.x + 2, p.y + 2);
            ctx.moveTo(p.x + 2, p.y - 2);
            ctx.lineTo(p.x - 2, p.y + 2);
            ctx.stroke();
        }
    });

    // Sol tarafta Katlanarak Artan Zehir Göstergesi Oku
    const arrX = 140;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(arrX, 380);
    ctx.lineTo(arrX, 120);
    ctx.stroke();

    // Yukarı Yönlü Kırmızı Ok Ucu
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(arrX, 114);
    ctx.lineTo(arrX - 6, 126);
    ctx.lineTo(arrX + 6, 126);
    ctx.closePath();
    ctx.fill();

    // Zero-Canvas-Text: Yükselen dikey ok biyobirikimin tepeye doğru arttığını nitel olarak gösterir
    ctx.restore();
}

function drawPyramidBiomassBar(ctx) {
    ctx.save();
    const bx = 30;
    const byTop = 130;
    const byBottom = 380;

    // Biyokütle / Birey Sayısı Azalır Oku (Aşağı Doğru Genişleyen Çizgi)
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx + 15, byTop);
    ctx.lineTo(bx + 15, byBottom);
    ctx.stroke();

    // Üstte dar, altta geniş sembolü (Zero-Canvas-Text: Nitel daralan kama)
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(bx + 15, byTop);
    ctx.lineTo(bx + 5, byBottom);
    ctx.lineTo(bx + 25, byBottom);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.stroke();

    ctx.restore();
}




function setupCanvasPointerEvents() {
    const cvs = document.getElementById('lab-canvas');
    if (!cvs) return;

    const handlePointerAction = (e) => {
        const rect = cvs.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const scaleX = 800 / rect.width;
        const scaleY = 500 / rect.height;
        const canvasX = x * scaleX;
        const canvasY = y * scaleY;

        // Deney 5.1: Ay Yörünge Açısı Manuel Sürükleme (Saat yönünün tersi, 0° = Yeni Ay)
        if (labState.activeExperimentId === "5.1" && labState.moonPhases && labState.moonPhases.isDragging) {
            const mp = labState.moonPhases;
            const dx = canvasX - 360;
            const dy = canvasY - 250;
            const deg = Math.round((Math.atan2(dy, -dx) * 180 / Math.PI + 360) % 360);
            mp.angle = deg;
            mp.isPlaying = false;
            updateMoonPhasesDOMControls();
            updateMoonPhasesPhysics();
            return;
        }

        // Deney 5.5: Tam Gölge Cisim / Perde Manuel Sürükleme
        if (labState.activeExperimentId === "5.5" && labState.shadow && labState.shadow.isDragging) {
            const sh = labState.shadow;
            const cisimX = 120 + sh.sourceDist * 6.0;
            if (sh.dragTarget === "source" || canvasX < cisimX - 30) {
                sh.sourceDist = Math.max(10, Math.min(45, Math.round((cisimX - canvasX) / 6.0)));
            } else {
                sh.screenDist = Math.max(10, Math.min(50, Math.round((canvasX - cisimX) / 6.0)));
            }
            updateShadowPhysics();
            return;
        }

        // Deney 5.6: Şırınga Pistonu Manuel İtme / Çekme
        if (labState.activeExperimentId === "5.6" && labState.compressibility && labState.compressibility.isDragging) {
            const cp = labState.compressibility;
            const pct = Math.max(0, Math.min(100, Math.round(((420 + 154) - canvasX) / 1.8)));
            cp.forcePercent = pct;
            updateCompressibilityPhysics();
            return;
        }

        // Deney 6.1: Ay Yörünge Açısı Manuel Sürükleme
        if (labState.activeExperimentId === "6.1" && labState.eclipse && labState.eclipse.isDragging) {
            const ec = labState.eclipse;
            const orbitScale = (ec.mode === "solar") ? 110 : 115;
            const angle = ((canvasY - 250) / orbitScale) * 30;
            ec.orbitAngle = Math.max(-30, Math.min(30, angle));
            ec.isPlaying = false;
            updateEclipseDOMControls();
            updateEclipseMetricsDOM();
            return;
        }

        // Deney 6.2: Halat / Kutu Manuel Sürükleme
        if (labState.activeExperimentId === "6.2" && labState.tugOfWar && labState.tugOfWar.isDragging) {
            const tow = labState.tugOfWar;
            tow.boxX = Math.max(200, Math.min(600, canvasX));
            updateTugMetricsDOM();
            return;
        }

        // Deney 6.3: Araç Konumu Manuel Sürükleme
        if (labState.activeExperimentId === "6.3" && labState.motion && labState.motion.car.isDragging) {
            const m = labState.motion;
            const clampedX = Math.max(90, Math.min(690, canvasX));
            m.distanceTraveled = ((clampedX - 90) / 600) * m.trackLength;
            m.elapsedTime = m.distanceTraveled / m.speed;
            m.car.wheelAngle += 0.2;
            updateMotionMetricsDOM();
            return;
        }

        // Deney 6.4: Yansıma Açısı veya Mum Mesafesi Manuel Sürükleme
        if (labState.activeExperimentId === "6.4" && labState.reflection && labState.reflection.isDragging) {
            const r = labState.reflection;
            if (r.mirrorType === "plane") {
                const dx = 400 - canvasX;
                const dy = 380 - canvasY;
                if (dy > 10) {
                    let deg = Math.round(Math.atan2(dx, dy) * (180 / Math.PI));
                    r.incidentAngle = Math.max(0, Math.min(75, deg));
                    updateReflectionDOMControls();
                    updateReflectionMetricsDOM();
                }
            } else {
                const mirrorX = (r.mirrorType === "concave") ? 620 : 560;
                if (canvasX < mirrorX) {
                    const dist = Math.round(mirrorX - canvasX);
                    r.objectDistance = Math.max(50, Math.min(320, dist));
                    updateReflectionDOMControls();
                    updateReflectionMetricsDOM();
                }
            }
            return;
        }

        // Deney 6.10: Reosta Sürgüsü Manuel Sürükleme
        if (labState.activeExperimentId === "6.10" && labState.resistance && labState.resistance.isDraggingSlider) {
            const res = labState.resistance;
            if (res.mode === "rheostat") {
                const minX = 280;
                const maxX = 560;
                const ratio = Math.max(0, Math.min(1, (canvasX - minX) / (maxX - minX)));
                const pct = Math.round(ratio * 20) * 5;
                res.rheostatSlider = pct;
                updateResistanceDOMControls();
                updateResistanceMetricsDOM();
            }
            return;
        }

        // Deney 7.1: Sandık veya Yük Taşıma Sürükleme
        if (labState.activeExperimentId === "7.1") {
            const work = labState.work;
            if (work.scenario === "wall") return;
            if (work.scenario === "horizontal" || work.scenario === "carry") {
                const startX = 160;
                const meterPx = 50;
                const newDist = (canvasX - startX) / meterPx;
                const clamped = Math.max(1, Math.min(10, Math.round(newDist * 2) / 2));
                work.distance = clamped;
                work.currentDisplacement = clamped;
                work.progress = 1.0;
                const distRange = document.getElementById('lab-work-distance-range');
                const distDisplay = document.getElementById('lab-work-distance-display');
                if (distRange) distRange.value = clamped;
                if (distDisplay) distDisplay.textContent = `${clamped.toFixed(1)} m`;
                calculateWorkPhysics();
            } else if (work.scenario === "lift") {
                const groundY = 390;
                const meterPx = 24;
                const newHeight = (groundY - canvasY) / meterPx;
                const clamped = Math.max(1, Math.min(10, Math.round(newHeight * 2) / 2));
                work.distance = clamped;
                work.currentDisplacement = clamped;
                work.progress = 1.0;
                const distRange = document.getElementById('lab-work-distance-range');
                const distDisplay = document.getElementById('lab-work-distance-display');
                if (distRange) distRange.value = clamped;
                if (distDisplay) distDisplay.textContent = `${clamped.toFixed(1)} m`;
                calculateWorkPhysics();
            }
        }
        // Deney 7.2: Sarkaç Açısı veya Rampa Konumu Ayarı
        else if (labState.activeExperimentId === "7.2") {
            const energy = labState.energy;
            if (energy.mode === "pendulum") {
                const pivotX = 420;
                const pivotY = 65;
                const dx = canvasX - pivotX;
                const dy = canvasY - pivotY;
                if (dy > 30) {
                    let angle = Math.atan2(dx, dy);
                    const maxRad = 60 * (Math.PI / 180);
                    angle = Math.max(-maxRad, Math.min(maxRad, angle));
                    energy.pendulum.angle = angle;
                    energy.pendulum.omega = 0;
                    energy.heatEnergy = 0;
                    const angleDeg = Math.round(Math.abs(angle * (180 / Math.PI)));
                    energy.releaseAngle = Math.max(15, Math.min(60, angleDeg));
                    const angleRange = document.getElementById('lab-energy-angle-range');
                    const angleDisplay = document.getElementById('lab-energy-angle-display');
                    if (angleRange) angleRange.value = energy.releaseAngle;
                    if (angleDisplay) angleDisplay.textContent = `${energy.releaseAngle}°`;
                    calculateEnergyInstantValues();
                }
            } else if (energy.mode === "ramp") {
                const centerX = 420;
                const centerY = 140;
                const dx = canvasX - centerX;
                const dy = canvasY - centerY;
                if (dy > 20) {
                    let angle = Math.atan2(dx, dy);
                    const maxRad = 55 * (Math.PI / 180);
                    angle = Math.max(-maxRad, Math.min(maxRad, angle));
                    energy.ramp.angle = angle;
                    energy.ramp.omega = 0;
                    energy.heatEnergy = 0;
                    const angleDeg = Math.round(Math.abs(angle * (180 / Math.PI)));
                    energy.releaseAngle = Math.max(15, Math.min(60, angleDeg));
                    const angleRange = document.getElementById('lab-energy-angle-range');
                    const angleDisplay = document.getElementById('lab-energy-angle-display');
                    if (angleRange) angleRange.value = energy.releaseAngle;
                    if (angleDisplay) angleDisplay.textContent = `${energy.releaseAngle}°`;
                    calculateEnergyInstantValues();
                }
            }
        }
        // Deney 7.3: Lazer Açısı Ayarı
        else if (labState.activeExperimentId === "7.3") {
            const originX = 400;
            const originY = 250;
            if (canvasY < originY) {
                const dx = originX - canvasX;
                const dy = originY - canvasY;
                if (dy > 4) {
                    let angleDeg = Math.atan2(dx, dy) * (180 / Math.PI);
                    if (angleDeg < 0) angleDeg = 0;
                    if (angleDeg > 85) angleDeg = 85;
                    setIncidentAngle(angleDeg);
                }
            }
        }
        // Deney 7.4: Mum / Cisim Pozisyonu Ayarı
        else if (labState.activeExperimentId === "7.4" && labState.lens.mode === "object") {
            const originX = 400;
            if (canvasX < originX) {
                const dist = Math.round(originX - canvasX);
                const clamped = Math.max(50, Math.min(320, dist));
                labState.lens.objectDistance = clamped;

                const objRange = document.getElementById('lab-object-range');
                const objDisplay = document.getElementById('lab-object-display');
                if (objRange) objRange.value = clamped;
                if (objDisplay) objDisplay.textContent = `${clamped} mm`;

                calculateLensPhysics();
            }
        }
        // Deney 7.7: Kumaş, Çubuk veya Küre Sürükleme
        else if (labState.activeExperimentId === "7.7") {
            const el = labState.electro;
            if (el.mode === "friction") {
                const f = el.friction;
                if (f.cloth.isDragging) {
                    const newX = canvasX - (f.cloth.dragOffsetX || (f.cloth.w / 2));
                    const newY = canvasY - (f.cloth.dragOffsetY || (f.cloth.h / 2));
                    f.cloth.x = Math.max(20, Math.min(680, newX));
                    f.cloth.y = Math.max(50, Math.min(380, newY));
                }
                if (f.rod.isDragging) {
                    const newX = canvasX - (f.rod.dragOffsetX || (f.rod.w / 2));
                    const newY = canvasY - (f.rod.dragOffsetY || (f.rod.h / 2));
                    f.rod.x = Math.max(100, Math.min(380, newX));
                    f.rod.y = Math.max(80, Math.min(370, newY));
                }
            } else {
                const c = el.conduction;
                if (c.sphere1.isDragging) {
                    const newX = canvasX - (c.sphere1.dragOffsetX || 0);
                    c.sphere1.x = Math.max(80, Math.min(c.sphere2.x - 10, newX));
                }
                if (c.sphere2.isDragging) {
                    const newX = canvasX - (c.sphere2.dragOffsetX || 0);
                    c.sphere2.x = Math.max(c.sphere1.x + 10, Math.min(720, newX));
                }
            }
        }

        // Deney 7.8: Elektroskop Çubuk Sürükleme
        if (labState.activeExperimentId === "7.8") {
            const es = labState.electroscope;
            if (es.rod.isDragging) {
                const newX = canvasX - (es.rod.dragOffsetX || (es.rod.w / 2));
                const newY = canvasY - (es.rod.dragOffsetY || (es.rod.h / 2));
                // Sıfır İhlal Zırhı: Çubuk ucu asla topuz yüzeyini (396) aşamaz (226 + 170 = 396)
                es.rod.x = Math.max(20, Math.min(226, newX));
                es.rod.y = Math.max(40, Math.min(220, newY));
                es.rod.targetX = es.rod.x;
                es.rod.targetY = es.rod.y;

                const tipX = es.rod.x + es.rod.w;
                if (tipX >= 394) {
                    setElectroscopeAction("touch");
                } else if (tipX >= 300) {
                    setElectroscopeAction("approach");
                } else {
                    setElectroscopeAction("remove");
                }
            }
        }
    };

    cvs.addEventListener('pointerdown', (e) => {
        cvs.setPointerCapture(e.pointerId);

        if (labState.activeExperimentId === "6.1") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            const ec = labState.eclipse;
            const moonX = (ec.mode === "solar") ? 360 : 640;
            const moonY = 250 + (ec.orbitAngle / 30) * (ec.mode === "solar" ? 110 : 115);
            if (Math.hypot(canvasX - moonX, canvasY - moonY) <= 35) {
                ec.isDragging = true;
                ec.isPlaying = false;
            }
        } else if (labState.activeExperimentId === "6.2") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            if (Math.abs(canvasX - labState.tugOfWar.boxX) <= 50 && Math.abs(canvasY - 330) <= 55) {
                labState.tugOfWar.isDragging = true;
            }
        } else if (labState.activeExperimentId === "6.3") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            if (Math.hypot(canvasX - labState.motion.car.x, canvasY - labState.motion.car.y) <= 65) {
                labState.motion.car.isDragging = true;
            }
        } else if (labState.activeExperimentId === "6.4") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            const r = labState.reflection;
            if (r.mirrorType === "plane") {
                const rad = r.incidentAngle * (Math.PI / 180);
                const srcX = 400 - 300 * Math.sin(rad);
                const srcY = 380 - 300 * Math.cos(rad);
                if (Math.hypot(canvasX - srcX, canvasY - srcY) <= 55 || Math.hypot(canvasX - 400, canvasY - 380) <= 55) {
                    r.isDragging = true;
                }
            } else {
                const mirrorX = (r.mirrorType === "concave") ? 620 : 560;
                const candleX = mirrorX - r.objectDistance;
                if (Math.hypot(canvasX - candleX, canvasY - 250) <= 50) {
                    r.isDragging = true;
                }
            }
        } else if (labState.activeExperimentId === "7.1") {
            labState.work.isDragging = true;
        } else if (labState.activeExperimentId === "7.2") {
            labState.energy.pendulum.isDragging = true;
            labState.energy.ramp.isDragging = true;
        }
        labState.optics.isDraggingLaser = true;
        labState.lens.isDraggingObject = true;

        if (labState.activeExperimentId === "7.5" && labState.separation.mode === "funnel") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            if (Math.hypot(canvasX - 440, canvasY - 265) <= 35) {
                toggleFunnelValve();
            }
        }

        if (labState.activeExperimentId === "7.7") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;

            const el = labState.electro;
            if (el.mode === "friction") {
                const f = el.friction;
                if (canvasX >= f.cloth.x - 15 && canvasX <= f.cloth.x + f.cloth.w + 15 &&
                    canvasY >= f.cloth.y - 15 && canvasY <= f.cloth.y + f.cloth.h + 15) {
                    f.cloth.isDragging = true;
                    f.cloth.dragOffsetX = canvasX - f.cloth.x;
                    f.cloth.dragOffsetY = canvasY - f.cloth.y;
                } else if (canvasX >= f.rod.x - 15 && canvasX <= f.rod.x + f.rod.w + 15 &&
                           canvasY >= f.rod.y - 15 && canvasY <= f.rod.y + f.rod.h + 15) {
                    f.rod.isDragging = true;
                    f.rod.dragOffsetX = canvasX - f.rod.x;
                    f.rod.dragOffsetY = canvasY - f.rod.y;
                }
            } else {
                const c = el.conduction;
                if (Math.hypot(canvasX - c.sphere1.x, canvasY - c.sphere1.y) <= c.sphere1.r + 15) {
                    c.sphere1.isDragging = true;
                    c.sphere1.dragOffsetX = canvasX - c.sphere1.x;
                } else if (Math.hypot(canvasX - c.sphere2.x, canvasY - c.sphere2.y) <= c.sphere2.r + 15) {
                    c.sphere2.isDragging = true;
                    c.sphere2.dragOffsetX = canvasX - c.sphere2.x;
                }
            }
        }

        if (labState.activeExperimentId === "7.8") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;

            const es = labState.electroscope;
            if (canvasX >= es.rod.x - 15 && canvasX <= es.rod.x + es.rod.w + 15 &&
                canvasY >= es.rod.y - 15 && canvasY <= es.rod.y + es.rod.h + 15) {
                es.rod.isDragging = true;
                es.rod.dragOffsetX = canvasX - es.rod.x;
                es.rod.dragOffsetY = canvasY - es.rod.y;
            } else if (canvasX >= 615 && canvasX <= 665 && canvasY >= 90 && canvasY <= 150) {
                groundElectroscope();
            }
        }

        if (labState.activeExperimentId === "6.6") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            if (canvasY >= 200 && canvasY <= 380) {
                if (Math.abs(canvasX - 120) <= 75) selectGerminationDish(1);
                else if (Math.abs(canvasX - 300) <= 75) selectGerminationDish(2);
                else if (Math.abs(canvasX - 480) <= 75) selectGerminationDish(3);
                else if (Math.abs(canvasX - 660) <= 75) selectGerminationDish(4);
            }
        }

        if (labState.activeExperimentId === "6.7") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            if (Math.hypot(canvasX - 270, canvasY - 70) <= 45) {
                toggleAbsorptionLamp();
            }
        }

        if (labState.activeExperimentId === "5.1" && labState.moonPhases) {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            const distFromEarth = Math.hypot(canvasX - 360, canvasY - 250);
            if (distFromEarth >= 70 && distFromEarth <= 190) {
                labState.moonPhases.isDragging = true;
                labState.moonPhases.isPlaying = false;
            }
        }

        if (labState.activeExperimentId === "5.5" && labState.shadow) {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            const sh = labState.shadow;
            const cisimX = 120 + sh.sourceDist * 6.0;
            const perdeX = cisimX + sh.screenDist * 6.0;

            if (Math.abs(canvasX - 120) <= 40) {
                sh.isDragging = true;
                sh.dragTarget = "source";
            } else if (Math.abs(canvasX - cisimX) <= 40) {
                sh.isDragging = true;
                sh.dragTarget = "object";
            } else if (Math.abs(canvasX - perdeX) <= 40) {
                sh.isDragging = true;
                sh.dragTarget = "screen";
            }
        }

        if (labState.activeExperimentId === "5.6" && labState.compressibility) {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            const cp = labState.compressibility;
            const plungerX = 420 - cp.plungerPos * 180;
            if (Math.abs(canvasX - (plungerX + 154)) <= 50 && Math.abs(canvasY - 240) <= 70) {
                cp.isDragging = true;
            }
        }

        if (labState.activeExperimentId === "6.10" && labState.resistance) {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            const res = labState.resistance;
            if (res.mode === "rheostat") {
                const sliderX = 280 + (res.rheostatSlider / 100) * 280;
                if (Math.abs(canvasX - sliderX) <= 35 && Math.abs(canvasY - 250) <= 45) {
                    res.isDraggingSlider = true;
                }
            }
        }

        if (labState.activeExperimentId === "7.9") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;

            if (Math.hypot(canvasX - 85, canvasY - 85) <= 50) {
                const nextSun = (labState.foodPyramid.sunlight === 50000) ? 100000 : (labState.foodPyramid.sunlight === 100000) ? 200000 : 50000;
                setFoodPyramidSunlight(nextSun);
            } else if (canvasX >= 640 && canvasX <= 765 && canvasY >= 140 && canvasY <= 380) {
                selectFoodPyramidTier(4);
            } else if (canvasY >= 110 && canvasY < 180 && Math.abs(canvasX - 360) <= 90) {
                selectFoodPyramidTier(3);
            } else if (canvasY >= 180 && canvasY < 250 && Math.abs(canvasX - 360) <= 150) {
                selectFoodPyramidTier(2);
            } else if (canvasY >= 250 && canvasY < 320 && Math.abs(canvasX - 360) <= 210) {
                selectFoodPyramidTier(1);
            } else if (canvasY >= 320 && canvasY <= 390 && Math.abs(canvasX - 360) <= 270) {
                selectFoodPyramidTier(0);
            }
        }

        handlePointerAction(e);
    });

    cvs.addEventListener('pointermove', (e) => {
        const isDragging51 = (labState.activeExperimentId === "5.1" && labState.moonPhases && labState.moonPhases.isDragging);
        const isDragging55 = (labState.activeExperimentId === "5.5" && labState.shadow && labState.shadow.isDragging);
        const isDragging56 = (labState.activeExperimentId === "5.6" && labState.compressibility && labState.compressibility.isDragging);
        const isDragging61 = (labState.activeExperimentId === "6.1" && labState.eclipse && labState.eclipse.isDragging);
        const isDragging62 = (labState.activeExperimentId === "6.2" && labState.tugOfWar && labState.tugOfWar.isDragging);
        const isDragging63 = (labState.activeExperimentId === "6.3" && labState.motion && labState.motion.car.isDragging);
        const isDragging64 = (labState.activeExperimentId === "6.4" && labState.reflection && labState.reflection.isDragging);
        const isDragging71 = (labState.activeExperimentId === "7.1" && labState.work.isDragging);
        const isDragging72 = (labState.activeExperimentId === "7.2" && (labState.energy.pendulum.isDragging || labState.energy.ramp.isDragging));
        const isDragging77 = (labState.activeExperimentId === "7.7" && (
            (labState.electro.mode === "friction" && (labState.electro.friction.cloth.isDragging || labState.electro.friction.rod.isDragging)) ||
            (labState.electro.mode === "conduction" && (labState.electro.conduction.sphere1.isDragging || labState.electro.conduction.sphere2.isDragging))
        ));
        const isDragging78 = (labState.activeExperimentId === "7.8" && labState.electroscope && labState.electroscope.rod.isDragging);
        const isDragging610 = (labState.activeExperimentId === "6.10" && labState.resistance && labState.resistance.isDraggingSlider);
        if (isDragging51 || isDragging55 || isDragging56 || isDragging61 || isDragging62 || isDragging63 || isDragging64 || isDragging71 || isDragging72 || isDragging77 || isDragging78 || isDragging610 || labState.optics.isDraggingLaser || labState.lens.isDraggingObject) {
            handlePointerAction(e);
        }
    });

    const stopDragging = (e) => {
        if (labState.moonPhases) {
            labState.moonPhases.isDragging = false;
        }
        if (labState.shadow) {
            labState.shadow.isDragging = false;
        }
        if (labState.compressibility) {
            labState.compressibility.isDragging = false;
        }
        if (labState.resistance) {
            labState.resistance.isDraggingSlider = false;
        }
        if (labState.eclipse) {
            labState.eclipse.isDragging = false;
        }
        if (labState.reflection) {
            labState.reflection.isDragging = false;
        }
        if (labState.motion) {
            labState.motion.car.isDragging = false;
        }
        if (labState.tugOfWar) {
            labState.tugOfWar.isDragging = false;
        }
        if (labState.work) {
            labState.work.isDragging = false;
        }
        if (labState.energy) {
            labState.energy.pendulum.isDragging = false;
            labState.energy.ramp.isDragging = false;
        }
        if (labState.electro) {
            labState.electro.friction.cloth.isDragging = false;
            labState.electro.friction.rod.isDragging = false;
            labState.electro.conduction.sphere1.isDragging = false;
            labState.electro.conduction.sphere2.isDragging = false;
        }
        if (labState.electroscope) {
            labState.electroscope.rod.isDragging = false;
        }
        labState.optics.isDraggingLaser = false;
        labState.lens.isDraggingObject = false;
        try { cvs.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    cvs.addEventListener('pointerup', stopDragging);
    cvs.addEventListener('pointercancel', stopDragging);
}

// --- 10. GÖZLEM VE VERİ DEFTERİ YÖNETİMİ ---

// ============================================================================
// --- 5.1. DENEY 5.1: AY'IN EVRELERİ VE GÖRÜNÜMÜ SİMÜLATÖRÜ (FB.5.1.3) ---
// ============================================================================

function initMoonPhasesState() {
    const mp = labState.moonPhases;
    mp.angle = 0.0;
    mp.isPlaying = true;
    mp.orbitSpeed = 0.35;
    mp.isDragging = false;
    updateMoonPhasesDOMControls();
    updateMoonPhasesPhysics();
}

function resetMoonPhasesExperiment() {
    initMoonPhasesState();
    showLabToast("Ay yörünge başlangıç konumuna (Yeni Ay) alındı!");
}

function updateMoonPhasesDOMControls() {
    const mp = labState.moonPhases;
    const btnPlay = document.getElementById('btn-51-toggle-play');
    if (btnPlay) {
        btnPlay.innerHTML = mp.isPlaying ? '<i class="fas fa-pause"></i> Duraklat' : '<i class="fas fa-play"></i> Oynat';
        btnPlay.classList.toggle('active', mp.isPlaying);
    }
}

function setupMoonPhasesControlsDOM() {
    const mp = labState.moonPhases;

    // Faz Butonları
    const phaseAngles = {
        'btn-51-phase-new': 0,
        'btn-51-phase-firstq': 90,
        'btn-51-phase-full': 180,
        'btn-51-phase-lastq': 270,
        'pill-51-new': 0,
        'pill-51-crescent1': 45,
        'pill-51-firstq': 90,
        'pill-51-gibbous1': 135,
        'pill-51-full': 180,
        'pill-51-gibbous2': 225,
        'pill-51-lastq': 270,
        'pill-51-crescent2': 315
    };

    Object.entries(phaseAngles).forEach(([id, ang]) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', () => {
                mp.angle = ang;
                mp.isPlaying = false;
                updateMoonPhasesDOMControls();
                updateMoonPhasesPhysics();
                showLabToast(`Evre seçildi: ${mp.phaseName} (${ang}°)`);
            });
        }
    });

    const btnPlay = document.getElementById('btn-51-toggle-play');
    if (btnPlay) {
        btnPlay.addEventListener('click', () => {
            mp.isPlaying = !mp.isPlaying;
            updateMoonPhasesDOMControls();
            showLabToast(mp.isPlaying ? "Yörünge hareketi başlatıldı." : "Yörünge hareketi duraklatıldı.");
        });
    }

    const btnPrev = document.getElementById('btn-51-step-prev');
    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            mp.angle = (mp.angle - 45 + 360) % 360;
            mp.isPlaying = false;
            updateMoonPhasesDOMControls();
            updateMoonPhasesPhysics();
        });
    }

    const btnNext = document.getElementById('btn-51-step-next');
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            mp.angle = (mp.angle + 45) % 360;
            mp.isPlaying = false;
            updateMoonPhasesDOMControls();
            updateMoonPhasesPhysics();
        });
    }

    const slider = document.getElementById('slider-51-angle');
    if (slider) {
        slider.addEventListener('input', (e) => {
            mp.angle = parseFloat(e.target.value);
            mp.isPlaying = false;
            updateMoonPhasesDOMControls();
            updateMoonPhasesPhysics();
        });
    }

    const btnRecord = document.getElementById('btn-record-data-5-1');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateMoonPhasesPhysics() {
    const mp = labState.moonPhases;

    if (mp.isPlaying) {
        mp.angle = (mp.angle + mp.orbitSpeed) % 360;
    }

    const a = (mp.angle % 360 + 360) % 360;
    let name = "Yeni Ay";
    let illum = Math.round(((1 - Math.cos(a * Math.PI / 180)) / 2) * 100);
    let statusText = "🌑 Yeni Ay: Ay, Güneş ile Dünya arasındadır; Dünya'dan bakıldığında görünmez (0. Gün)";

    if (a >= 337.5 || a < 22.5) {
        name = "Yeni Ay";
        illum = 0;
        statusText = "🌑 Yeni Ay: Ay, Güneş ile Dünya'nın tam arasındadır; Dünya'dan bakıldığında ışık alan yüzü görünmez (0% aydınlık, 0. Gün)";
    } else if (a >= 22.5 && a < 67.5) {
        name = "Hilal (Büyüyen)";
        statusText = "🌒 Hilal: Dünya'dan bakıldığında batı ufkunda sağ tarafı aydınlık ince hilal (ters C) görülür (~3. Gün)";
    } else if (a >= 67.5 && a < 112.5) {
        name = "İlk Dördün";
        illum = 50;
        statusText = "🌓 İlk Dördün: Dünya'dan bakıldığında sağ tarafı aydınlık 'D' harfi şeklinde yarım daire görünür (7. Gün)";
    } else if (a >= 112.5 && a < 157.5) {
        name = "Şişkin Ay (Büyüyen)";
        statusText = "🌔 Şişkin Ay: Aydınlık alan yarım daireden büyük; Dolunay'a doğru büyümektedir (~10. Gün)";
    } else if (a >= 157.5 && a < 202.5) {
        name = "Dolunay";
        illum = 100;
        statusText = "🌕 Dolunay: Dünya, Güneş ile Ay'ın arasındadır; Ay'ın Dünya'ya bakan tüm yüzü aydınlıktır (14. Gün)";
    } else if (a >= 202.5 && a < 247.5) {
        name = "Şişkin Ay (Küçülen)";
        statusText = "🌖 Şişkin Ay: Dolunay'dan sonra aydınlık alan küçülmeye başlar (~18. Gün)";
    } else if (a >= 247.5 && a < 292.5) {
        name = "Son Dördün";
        illum = 50;
        statusText = "🌗 Son Dördün: Dünya'dan bakıldığında sol tarafı aydınlık 'ters D' şeklinde yarım daire görünür (21. Gün)";
    } else {
        name = "Hilal (Küçülen)";
        statusText = "🌘 Hilal: Sabah Güneş doğmadan önce doğu ufkunda 'C' harfi şeklinde ince aydınlık görülür (~25. Gün)";
    }

    mp.phaseName = name;
    mp.illuminationPercent = illum;

    // DOM Güncelle
    const mbPhase = document.getElementById('mbar-51-phase');
    const mbIllum = document.getElementById('mbar-51-illum');
    const mbAngle = document.getElementById('mbar-51-angle');
    const mbStatus = document.getElementById('mbar-51-status');
    const slider = document.getElementById('slider-51-angle');
    const valAngle = document.getElementById('val-51-angle');

    if (mbPhase) mbPhase.textContent = name;
    if (mbIllum) mbIllum.textContent = `%${illum}`;
    if (mbAngle) mbAngle.textContent = `${Math.round(a)}°`;
    if (mbStatus) mbStatus.textContent = statusText;
    if (slider && !mp.isDragging) slider.value = Math.round(a);
    if (valAngle) valAngle.textContent = `${Math.round(a)}°`;

    const pTitle = document.getElementById('moon-pedagogical-title');
    const pText = document.getElementById('moon-pedagogical-text');
    if (pTitle) pTitle.textContent = `${name} Evresi`;
    if (pText) pText.textContent = statusText;

    const mPhase = document.getElementById('metric-51-phase');
    const mIllum = document.getElementById('metric-51-illum');
    if (mPhase) mPhase.textContent = name;
    if (mIllum) mIllum.textContent = `%${illum}`;
}

function drawMoonPhasesSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // 1. Uzay Arka Planı (Derin Gece ve Yıldızlar)
    const spaceGrad = ctx.createLinearGradient(0, 0, 800, 500);
    spaceGrad.addColorStop(0, "#030712");
    spaceGrad.addColorStop(1, "#0b1528");
    ctx.fillStyle = spaceGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Yıldızlar
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    for (let i = 0; i < 45; i++) {
        const sx = (i * 127 + 23) % 780;
        const sy = (i * 83 + 47) % 480;
        const sr = (i % 3 === 0) ? 1.5 : 1.0;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
    }

    // 2. Güneş Işınları (Soldan Sağa Paralel Işık Hüzmeleri)
    const sunGrad = ctx.createLinearGradient(0, 0, 260, 0);
    sunGrad.addColorStop(0, "rgba(250, 204, 21, 0.45)");
    sunGrad.addColorStop(0.5, "rgba(250, 204, 21, 0.15)");
    sunGrad.addColorStop(1, "rgba(250, 204, 21, 0.0)");
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 80, 260, 340);

    // Güneş Işık Çizgileri ve Okları
    ctx.strokeStyle = "rgba(250, 204, 21, 0.4)";
    ctx.lineWidth = 1.5;
    for (let y = 110; y <= 390; y += 45) {
        ctx.beginPath();
        ctx.moveTo(10, y);
        ctx.lineTo(200, y);
        ctx.stroke();

        ctx.fillStyle = "rgba(250, 204, 21, 0.6)";
        ctx.beginPath();
        ctx.moveTo(200, y);
        ctx.lineTo(190, y - 4);
        ctx.lineTo(190, y + 4);
        ctx.closePath();
        ctx.fill();
    }

    // 3. Dünya (Merkez: x=360, y=250)
    const earthX = 360;
    const earthY = 250;
    const earthR = 34;

    // Atmosfer Işıması
    const atmoGrad = ctx.createRadialGradient(earthX, earthY, earthR, earthX, earthY, earthR + 12);
    atmoGrad.addColorStop(0, "rgba(56, 189, 248, 0.45)");
    atmoGrad.addColorStop(1, "rgba(56, 189, 248, 0.0)");
    ctx.fillStyle = atmoGrad;
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthR + 12, 0, Math.PI * 2);
    ctx.fill();

    // Dünya Küresi (Gündüz/Gece Ayrımı)
    // Sol yarısı Güneş ışığıyla aydınlık (mavi/yeşil), sağ yarısı gece (koyu lacivert)
    ctx.save();
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
    ctx.clip();

    // Gece tarafı (Sağ yarı)
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(earthX - earthR, earthY - earthR, earthR * 2, earthR * 2);

    // Gündüz tarafı (Sol yarı - Güneş'e bakan taraf)
    ctx.fillStyle = "#0284c7";
    ctx.fillRect(earthX - earthR, earthY - earthR, earthR, earthR * 2);

    // Kıtalar (Yeşil kıta lekeleri)
    ctx.fillStyle = "#15803d";
    ctx.beginPath();
    ctx.arc(earthX - 12, earthY - 8, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(earthX - 18, earthY + 12, 10, 0, Math.PI * 2);
    ctx.fill();

    // Bulutlar
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.beginPath();
    ctx.arc(earthX - 8, earthY - 14, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Dünya Çember Sınırı
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Ay Yörüngesi (Yarıçap = 135)
    const orbitR = 135;
    ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(earthX, earthY, orbitR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Yörünge Yönü Okları (Saat Yönünün Tersi - CCW)
    // 1. Ok: Alt noktada (6 o'clock: x=earthX, y=earthY+orbitR), hareket Sağa (+X)
    ctx.fillStyle = "rgba(56, 189, 248, 0.7)";
    ctx.beginPath();
    ctx.moveTo(earthX + 8, earthY + orbitR);
    ctx.lineTo(earthX - 4, earthY + orbitR - 5);
    ctx.lineTo(earthX - 4, earthY + orbitR + 5);
    ctx.closePath();
    ctx.fill();

    // 2. Ok: Üst noktada (12 o'clock: x=earthX, y=earthY-orbitR), hareket Sola (-X)
    ctx.beginPath();
    ctx.moveTo(earthX - 8, earthY - orbitR);
    ctx.lineTo(earthX + 4, earthY - orbitR - 5);
    ctx.lineTo(earthX + 4, earthY - orbitR + 5);
    ctx.closePath();
    ctx.fill();

    // 5. Yörüngedeki Ay
    // Saat Yönünün Tersi Astronomik Eksen:
    // a=0°: Güneş ile Dünya arasında (Sol: x = earthX - orbitR, y = earthY) -> YENİ AY
    // a=90°: Alt noktada (x = earthX, y = earthY + orbitR) -> İLK DÖRDÜN
    // a=180°: Dünya'nın arkasında (Sağ: x = earthX + orbitR, y = earthY) -> DOLUNAY
    // a=270°: Üst noktada (x = earthX, y = earthY - orbitR) -> SON DÖRDÜN
    const mp = labState.moonPhases;
    const rad = (mp.angle * Math.PI) / 180;
    const moonX = earthX - orbitR * Math.cos(rad);
    const moonY = earthY + orbitR * Math.sin(rad);
    const moonR = 16;

    // Görüş Doğrultusu Çizgisi (Dünya'dan Ay'a)
    ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(earthX, earthY);
    ctx.lineTo(moonX, moonY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Yörüngedeki Ay Çizimi:
    // Güneş solda olduğu için Ay'ın DAİMA SOL YARISI AYDINLIK, SAĞ YARISI KARANLIKTIR!
    ctx.save();
    ctx.translate(moonX, moonY);

    // Koyu yüz (sağ)
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(0, 0, moonR, -Math.PI * 0.5, Math.PI * 0.5);
    ctx.fill();

    // Aydınlık yüz (sol - Güneş'e bakan taraf)
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.arc(0, 0, moonR, Math.PI * 0.5, -Math.PI * 0.5);
    ctx.fill();

    // Krater gölgeleri
    ctx.fillStyle = "rgba(148, 163, 184, 0.3)";
    ctx.beginPath();
    ctx.arc(-6, -4, 3, 0, Math.PI * 2);
    ctx.arc(-8, 5, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, moonR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // 6. Sağ Taraf: "Dünya'dan Görünüm" Teleskop Vizörü
    const viewX = 665;
    const viewY = 250;
    const viewR = 75;

    // Vizör Dış Çerçevesi (Pirinç/Neon Çember)
    const bezelGrad = ctx.createLinearGradient(viewX - viewR, viewY - viewR, viewX + viewR, viewY + viewR);
    bezelGrad.addColorStop(0, "#facc15");
    bezelGrad.addColorStop(0.5, "#d97706");
    bezelGrad.addColorStop(1, "#78350f");
    ctx.strokeStyle = bezelGrad;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(viewX, viewY, viewR + 6, 0, Math.PI * 2);
    ctx.stroke();

    // Vizör İç Arka Planı
    ctx.save();
    ctx.beginPath();
    ctx.arc(viewX, viewY, viewR, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = "#020617";
    ctx.fillRect(viewX - viewR, viewY - viewR, viewR * 2, viewR * 2);

    // Kılavuz Artı İşareti (Teleskop Nişangahı)
    ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(viewX - viewR, viewY);
    ctx.lineTo(viewX + viewR, viewY);
    ctx.moveTo(viewX, viewY - viewR);
    ctx.lineTo(viewX, viewY + viewR);
    ctx.stroke();

    // Dünya'dan Görünen Ay Diski
    const diskR = 50;

    // Taban (Karanlık Ay Diski)
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(viewX, viewY, diskR, 0, Math.PI * 2);
    ctx.fill();

    // Aydınlık Kısım Çizimi (Matematiksel Evre Geometrisi)
    const curAngle = (mp.angle % 360 + 360) % 360;
    const curRad = curAngle * (Math.PI / 180);
    const cosA = Math.cos(curRad);

    ctx.fillStyle = "#f8fafc";

    if (curAngle > 0.5 && curAngle < 179.5) {
        // 0° < a < 180°: Büyüyen Evreler (Dünya'dan bakıldığında SAĞ taraf aydınlık)
        if (curAngle < 90) {
            // Hilal (0 < a < 90): Sağda ince hilal (ters C)
            ctx.beginPath();
            ctx.arc(viewX, viewY, diskR, -Math.PI * 0.5, Math.PI * 0.5, false);
            ctx.ellipse(viewX, viewY, Math.max(0.5, cosA * diskR), diskR, 0, Math.PI * 0.5, -Math.PI * 0.5, true);
            ctx.closePath();
            ctx.fill();
        } else {
            // İlk Dördün ve Şişkin Ay (90 <= a < 180): Sağ yarım daire + sola taşan elips ('D' harfi)
            ctx.beginPath();
            ctx.arc(viewX, viewY, diskR, -Math.PI * 0.5, Math.PI * 0.5, false);
            ctx.ellipse(viewX, viewY, Math.max(0.5, Math.abs(cosA) * diskR), diskR, 0, Math.PI * 0.5, -Math.PI * 0.5, false);
            ctx.closePath();
            ctx.fill();
        }
    } else if (curAngle >= 179.5 && curAngle <= 180.5) {
        // Dolunay (a = 180°): Tam aydınlık beyaz daire (100%)
        ctx.beginPath();
        ctx.arc(viewX, viewY, diskR, 0, Math.PI * 2);
        ctx.fill();
    } else if (curAngle > 180.5 && curAngle < 359.5) {
        // 180° < a < 360°: Küçülen Evreler (Dünya'dan bakıldığında SOL taraf aydınlık)
        if (curAngle < 270) {
            // Şişkin Ay (180 < a < 270): Sol yarım daire + sağa taşan elips
            ctx.beginPath();
            ctx.arc(viewX, viewY, diskR, Math.PI * 0.5, -Math.PI * 0.5, false);
            ctx.ellipse(viewX, viewY, Math.max(0.5, Math.abs(cosA) * diskR), diskR, 0, -Math.PI * 0.5, Math.PI * 0.5, false);
            ctx.closePath();
            ctx.fill();
        } else {
            // Son Dördün ve Hilal (270 <= a < 360): Solda yarım daire ('ters D') veya ince hilal ('C' harfi)
            ctx.beginPath();
            ctx.arc(viewX, viewY, diskR, Math.PI * 0.5, -Math.PI * 0.5, false);
            ctx.ellipse(viewX, viewY, Math.max(0.5, Math.abs(cosA) * diskR), diskR, 0, -Math.PI * 0.5, Math.PI * 0.5, true);
            ctx.closePath();
            ctx.fill();
        }
    }
    // a <= 0.5 veya a >= 359.5: Yeni Ay (Ay tamamen karanlık taban diskinde kalır)

    // Ay Kraterleri / Yüzey Gölgeleri
    if (mp.illuminationPercent > 20) {
        ctx.fillStyle = "rgba(148, 163, 184, 0.25)";
        ctx.beginPath();
        ctx.arc(viewX - 10, viewY - 12, 10, 0, Math.PI * 2);
        ctx.arc(viewX + 8, viewY + 6, 12, 0, Math.PI * 2);
        ctx.arc(viewX - 6, viewY + 16, 7, 0, Math.PI * 2);
        ctx.fill();
    }

    // Ay Dış Çember
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(viewX, viewY, diskR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    ctx.restore();
}

// ============================================================================
// --- 5.2. DENEY 5.2: DİNAMOMETRE VE YAY ESNEKLİĞİ (FB.5.2.1 - FB.5.2.2) ---
// ============================================================================

function initDynamometerState() {
    const dm = labState.dynamometer;
    dm.springType = "medium";
    dm.force = 0;
    dm.weightsCount = 0;
    dm.currentStretch = 0.0;
    dm.targetStretch = 0.0;
    dm.divisionCount = 0;
    updateDynamometerDOMControls();
    updateDynamometerPhysics();
}

function resetDynamometerExperiment() {
    initDynamometerState();
    showLabToast("Dinamometre yayındaki ağırlıklar boşaltıldı!");
}

function updateDynamometerDOMControls() {
    const dm = labState.dynamometer;
    ['btn-52-spring-thin', 'pill-52-thin'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', dm.springType === 'thin');
    });
    ['btn-52-spring-medium', 'pill-52-medium'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', dm.springType === 'medium');
    });
    ['btn-52-spring-thick', 'pill-52-thick'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', dm.springType === 'thick');
    });
}

function setupDynamometerControlsDOM() {
    const dm = labState.dynamometer;

    const setSpring = (type) => {
        dm.springType = type;
        updateDynamometerDOMControls();
        updateDynamometerPhysics();
        const names = { thin: "İnce Yay (Hassas)", medium: "Orta Yay (Standart)", thick: "Kalın Yay (Kuvvetli)" };
        showLabToast(`Yay türü değiştirildi: ${names[type]}`);
    };

    const map = {
        'btn-52-spring-thin': 'thin', 'pill-52-thin': 'thin',
        'btn-52-spring-medium': 'medium', 'pill-52-medium': 'medium',
        'btn-52-spring-thick': 'thick', 'pill-52-thick': 'thick'
    };
    Object.entries(map).forEach(([id, type]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setSpring(type));
    });

    const btnPlus = document.getElementById('btn-52-weight-plus');
    if (btnPlus) {
        btnPlus.addEventListener('click', () => {
            if (dm.weightsCount < 10) {
                dm.weightsCount++;
                dm.force = dm.weightsCount * 2;
                updateDynamometerPhysics();
                showLabToast(`1 Ağırlık asıldı (+2 N). Toplam: ${dm.force} N`);
            }
        });
    }

    const btnMinus = document.getElementById('btn-52-weight-minus');
    if (btnMinus) {
        btnMinus.addEventListener('click', () => {
            if (dm.weightsCount > 0) {
                dm.weightsCount--;
                dm.force = dm.weightsCount * 2;
                updateDynamometerPhysics();
                showLabToast(`1 Ağırlık çıkarıldı (-2 N). Kalan: ${dm.force} N`);
            }
        });
    }

    const btnReset = document.getElementById('btn-52-reset');
    if (btnReset) btnReset.addEventListener('click', resetDynamometerExperiment);

    const slider = document.getElementById('slider-52-force');
    if (slider) {
        slider.addEventListener('input', (e) => {
            dm.force = parseInt(e.target.value, 10);
            dm.weightsCount = Math.round(dm.force / 2);
            updateDynamometerPhysics();
        });
    }

    const btnRecord = document.getElementById('btn-record-data-5-2');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateDynamometerPhysics() {
    const dm = labState.dynamometer;
    const kMap = { thin: 1.5, medium: 0.8, thick: 0.4 };
    const k = kMap[dm.springType] || 0.8;

    dm.targetStretch = dm.force * k;
    dm.currentStretch += (dm.targetStretch - dm.currentStretch) * 0.18;
    dm.divisionCount = (dm.currentStretch / 1.6).toFixed(1);

    const typeLabels = { thin: "İnce Yay", medium: "Orta Yay", thick: "Kalın Yay" };
    let statusText = `⚖️ ${dm.force} N kuvvet etkisiyle yay ${dm.currentStretch.toFixed(1)} cm uzadı`;

    if (dm.springType === 'thin' && dm.force > 12) {
        statusText = "⚠️ Dikkat: İnce yayın esneklik sınırı aşıldı! Yay kalıcı bozulabilir.";
    }

    const mbSpring = document.getElementById('mbar-52-spring');
    const mbForce = document.getElementById('mbar-52-force');
    const mbStretch = document.getElementById('mbar-52-stretch');
    const mbStatus = document.getElementById('mbar-52-status');
    const valForce = document.getElementById('val-52-force');
    const slider = document.getElementById('slider-52-force');

    if (mbSpring) mbSpring.textContent = typeLabels[dm.springType];
    if (mbForce) mbForce.textContent = `${dm.force} N (${dm.weightsCount} Ağırlık)`;
    if (mbStretch) mbStretch.textContent = `${dm.currentStretch.toFixed(1)} cm`;
    if (mbStatus) mbStatus.textContent = statusText;
    if (valForce) valForce.textContent = `${dm.force} N`;
    if (slider) slider.value = dm.force;

    const mForce = document.getElementById('metric-52-force');
    const mStretch = document.getElementById('metric-52-stretch');
    const mDivs = document.getElementById('metric-52-divs');
    if (mForce) mForce.textContent = `${dm.force} N`;
    if (mStretch) mStretch.textContent = `${dm.currentStretch.toFixed(1)} cm`;
    if (mDivs) mDivs.textContent = `${dm.divisionCount} Bölme`;
}

function drawDynamometerSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "#0b1329");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // 1. Laboratuvar Standı (Statif Ayak)
    // Taban (Ağır Döküm Çelik Tabla)
    ctx.fillStyle = "#334155";
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(160, 445, 480, 20, 5);
    ctx.fill();
    ctx.stroke();

    // Dikey Metalik Destek Mili (Yukarı taşınmış tavan bağlantısı)
    const rodX = 250;
    const rodGrad = ctx.createLinearGradient(rodX - 6, 0, rodX + 6, 0);
    rodGrad.addColorStop(0, "#cbd5e1");
    rodGrad.addColorStop(0.5, "#ffffff");
    rodGrad.addColorStop(1, "#64748b");
    ctx.fillStyle = rodGrad;
    ctx.fillRect(rodX - 6, 32, 12, 413);

    // Üst Yatay Askı Kolu ve Kelepçe (Y: 34-45px)
    ctx.fillStyle = "#475569";
    ctx.fillRect(rodX - 10, 34, 20, 16); // kelepçe
    ctx.fillRect(rodX, 39, 150, 6);       // kol

    // Dinamometre Askı Halkası
    const dynX = 400;
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(dynX, 51, 6, 0, Math.PI * 2);
    ctx.stroke();

    // 2. Dinamometre Şeffaf Silindirik Gövdesi (Y: 58 -> 196, H: 138, W: 46)
    const dynY = 58;
    const dynW = 46;
    const dynH = 138;

    // Üst ve Alt Metal Başlıklar
    ctx.fillStyle = "#475569";
    ctx.fillRect(dynX - dynW * 0.5 - 2, dynY, dynW + 4, 10);
    ctx.fillRect(dynX - dynW * 0.5 - 2, dynY + dynH - 10, dynW + 4, 10);

    // Şeffaf Akrilik Tüp Gövdesi
    ctx.fillStyle = "rgba(56, 189, 248, 0.08)";
    ctx.fillRect(dynX - dynW * 0.5, dynY + 10, dynW, dynH - 20);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(dynX - dynW * 0.5, dynY + 10, dynW, dynH - 20);

    // 10 Eşit Bölmeli Dinamometre Ölçek Çizgileri (0 ctx.fillText)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    const scaleTopY = dynY + 18;
    const scaleHeight = dynH - 36;
    for (let i = 0; i <= 10; i++) {
        const ty = scaleTopY + (i / 10) * scaleHeight;
        const isMajor = (i % 2 === 0);
        ctx.lineWidth = isMajor ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(dynX - dynW * 0.5 + 3, ty);
        ctx.lineTo(dynX - dynW * 0.5 + (isMajor ? 13 : 8), ty);
        ctx.stroke();
    }

    // 3. Helezonik Sarmal Yay ve Uzama Hesaplaması
    const dm = labState.dynamometer;
    const springStartY = dynY + 14;

    // Uzama piksel hesabı: skala boyutu ile orantılı
    const maxTravelPx = scaleHeight;
    const maxReferenceStretch = 30.0;
    const stretchRatio = Math.min(1.0, Math.max(0, dm.currentStretch / maxReferenceStretch));
    const stretchPx = stretchRatio * maxTravelPx;
    const springEndY = springStartY + 24 + stretchPx;

    const springWireWidth = { thin: 2.0, medium: 3.2, thick: 4.8 }[dm.springType] || 3.2;
    const springColor = { thin: "#38bdf8", medium: "#facc15", thick: "#ef4444" }[dm.springType] || "#facc15";

    ctx.save();
    ctx.strokeStyle = springColor;
    ctx.lineWidth = springWireWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(dynX, springStartY);

    const coils = 11;
    const coilH = (springEndY - springStartY) / coils;
    for (let c = 0; c < coils; c++) {
        const cy = springStartY + c * coilH;
        const dir = (c % 2 === 0) ? 1 : -1;
        ctx.bezierCurveTo(
            dynX + 13 * dir, cy + coilH * 0.25,
            dynX + 13 * dir, cy + coilH * 0.75,
            dynX, cy + coilH
        );
    }
    ctx.stroke();
    ctx.restore();

    // 4. Kırmızı İbre Oku (Ölçek hizasında)
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(dynX - dynW * 0.5 + 12, springEndY);
    ctx.lineTo(dynX - dynW * 0.5 + 2, springEndY - 4);
    ctx.lineTo(dynX - dynW * 0.5 + 2, springEndY + 4);
    ctx.closePath();
    ctx.fill();

    // 5. Alt Kanca ve Ağırlık Bounding Box Clamping (Kesin Tuval Emniyeti)
    const weightH = 12;
    const weightGap = 3;
    const totalWeights = Math.max(0, dm.weightsCount);
    const totalWeightHeight = totalWeights * (weightH + weightGap);

    // Tuval altından kesinlikle en az 45px yukarıda durdurma garantisi (500 - 45 = 455)
    const maxBottomY = 445;
    const maxHookY = maxBottomY - 16 - totalWeightHeight;
    const desiredHookY = dynY + dynH + 8 + stretchPx * 0.65;
    const hookY = Math.min(desiredHookY, maxHookY);

    // Göstergeden Kancaya İnen Metal Mil
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(dynX, springEndY);
    ctx.lineTo(dynX, hookY);
    ctx.stroke();

    // Alt Kanca Çengeli
    ctx.beginPath();
    ctx.arc(dynX, hookY + 6, 6, Math.PI * 1.5, Math.PI * 0.8, false);
    ctx.stroke();

    // 6. Asılı Ağırlık Diskleri (Her biri 2 N)
    const weightW = 40;
    const startWeightY = hookY + 16;

    for (let w = 0; w < totalWeights; w++) {
        const wy = startWeightY + w * (weightH + weightGap);

        // Ağırlık Kütlesi (Metalik Disk)
        const wGrad = ctx.createLinearGradient(dynX - weightW * 0.5, 0, dynX + weightW * 0.5, 0);
        wGrad.addColorStop(0, "#94a3b8");
        wGrad.addColorStop(0.5, "#f8fafc");
        wGrad.addColorStop(1, "#475569");
        ctx.fillStyle = wGrad;
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.roundRect(dynX - weightW * 0.5, wy, weightW, weightH, 3);
        ctx.fill();
        ctx.stroke();

        // Ağırlık Askı Çengeli
        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(dynX, wy);
        ctx.lineTo(dynX, wy - 3);
        ctx.stroke();
    }

    ctx.restore();
}

// ============================================================================
// --- 5.3. DENEY 5.3: SÜRTÜNME KUVVETİ VE YÜZEY TÜRLLERİ (FB.5.2.4) ---
// ============================================================================

function initFrictionState() {
    const fr = labState.friction;
    if (!fr.surface) fr.surface = "ice";
    if (!fr.rampHeight) fr.rampHeight = 2;
    fr.carState = "ready";
    fr.carVx = 0;
    fr.distanceTraveled = 0.0;
    fr.wheelAngle = 0.0;
    fr.skidParticles = [];

    // Başlangıç araba konumu: Seçili kitap yüksekliğine göre rampanın üstü
    const rampTopX = 85;
    const rampTopY = 380 - fr.rampHeight * 42;
    fr.carX = rampTopX + 22;
    fr.carY = rampTopY + 12;

    updateFrictionDOMControls();
    updateFrictionPhysics();
}

function resetFrictionExperiment() {
    initFrictionState();
    showLabToast("🚗 Oyuncak araba kitap rampasının tepesine yerleştirildi!");
}

function updateFrictionDOMControls() {
    const fr = labState.friction;
    ['btn-53-surf-ice', 'pill-53-ice', 'btn-surface-glass', 'btn-surface-ice'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', fr.surface === 'ice');
    });
    ['btn-53-surf-wood', 'pill-53-wood', 'btn-surface-wood'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', fr.surface === 'wood');
    });
    ['btn-53-surf-sand', 'pill-53-sand', 'btn-surface-sandpaper', 'btn-surface-sand'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', fr.surface === 'sand');
    });
    ['btn-53-surf-carpet', 'pill-53-carpet', 'btn-surface-carpet'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', fr.surface === 'carpet');
    });
    const valEl = document.getElementById('val-53-height');
    const labels = { 1: "1 Kitap (Düşük Eğim)", 2: "2 Kitap (Orta Eğim)", 3: "3 Kitap (Yüksek Eğim)", 4: "4 Kitap (Dik Eğim)" };
    if (valEl && labels[fr.rampHeight]) valEl.textContent = labels[fr.rampHeight];
}

function setupFrictionControlsDOM() {
    const fr = labState.friction;

    const setSurface = (s) => {
        fr.surface = s;
        initFrictionState();
        updateFrictionDOMControls();
        const names = { ice: "Cam / Buz Levhası (Pürüzsüz)", wood: "Cilalı Ahşap Masa (Orta)", sand: "Zımpara Kağıdı (Pürüzlü)", carpet: "Kumaş / Halı Şilte (Çok Pürüzlü)" };
        showLabToast(`Yüzey türü seçildi: ${names[s] || s}`);
    };

    const map = {
        'btn-53-surf-ice': 'ice', 'pill-53-ice': 'ice', 'btn-surface-glass': 'ice', 'btn-surface-ice': 'ice',
        'btn-53-surf-wood': 'wood', 'pill-53-wood': 'wood', 'btn-surface-wood': 'wood',
        'btn-53-surf-sand': 'sand', 'pill-53-sand': 'sand', 'btn-surface-sandpaper': 'sand', 'btn-surface-sand': 'sand',
        'btn-53-surf-carpet': 'carpet', 'pill-53-carpet': 'carpet', 'btn-surface-carpet': 'carpet'
    };
    Object.entries(map).forEach(([id, s]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setSurface(s));
    });

    const btnLaunch = document.getElementById('btn-53-launch');
    if (btnLaunch) {
        btnLaunch.addEventListener('click', () => {
            if (fr.carState === 'ready' || fr.carState === 'stopped') {
                fr.carState = 'rolling';
                fr.carVx = 0;
                fr.distanceTraveled = 0;
                showLabToast("🚀 Oyuncak araba serbest bırakıldı!");
            }
        });
    }

    const btnReset = document.getElementById('btn-53-reset');
    if (btnReset) btnReset.addEventListener('click', resetFrictionExperiment);

    const sliderHeight = document.getElementById('slider-53-height');
    if (sliderHeight) {
        sliderHeight.addEventListener('input', (e) => {
            fr.rampHeight = parseInt(e.target.value, 10);
            initFrictionState();
        });
    }

    const btnRecord = document.getElementById('btn-record-data-5-3');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateFrictionPhysics() {
    const fr = labState.friction;

    // Sürtünme katsayıları: Cam/Buz çok az, ahşap orta, zımpara yüksek, halı çok yüksek
    const muMap = { ice: 0.025, wood: 0.09, sand: 0.28, carpet: 0.45 };
    const mu = muMap[fr.surface] || 0.09;

    const rampTopX = 85;
    const rampTopY = 380 - fr.rampHeight * 42;
    const rampBottomX = 240;
    const rampBottomY = 380;
    const dx = rampBottomX - rampTopX;
    const dy = rampBottomY - rampTopY;
    const rampAngle = Math.atan2(dy, dx);

    if (fr.carState === 'rolling') {
        // Rampadan hızlanarak iniyor
        const accel = 0.38 * fr.rampHeight;
        fr.carVx += accel;
        const speed = fr.carVx;
        fr.carX += speed * Math.cos(rampAngle);
        fr.carY += speed * Math.sin(rampAngle);
        fr.wheelAngle += speed * 0.15;

        if (fr.carX >= rampBottomX) {
            fr.carState = 'sliding';
            fr.carX = rampBottomX;
            fr.carY = 380 - 15; // Yatay piste oturur
        }
    } else if (fr.carState === 'sliding') {
        // Yatay düzlemde ilerliyor ve sürtünmeyle yavaşlıyor
        const decel = mu * 1.75;
        fr.carVx = Math.max(0, fr.carVx - decel);
        fr.carX += fr.carVx;
        fr.carY = 380 - 15;
        fr.wheelAngle += fr.carVx * 0.12;

        // Sürtünme parçacıkları üret (Zımpara veya Halıda toz/kıvılcım)
        if (fr.carVx > 0.8 && (fr.surface === 'sand' || fr.surface === 'carpet')) {
            fr.skidParticles.push({
                x: fr.carX + 5,
                y: 380,
                vx: -fr.carVx * 0.25 + (Math.random() - 0.5),
                vy: -Math.random() * 2,
                life: 1.0,
                color: fr.surface === 'sand' ? '#f59e0b' : '#34d399'
            });
        }

        // 10 metre ölçeği (240px -> 720px = 480px / 48px = 10m)
        fr.distanceTraveled = Math.min(10.0, Math.max(0, (fr.carX - rampBottomX) / 48));

        if (fr.carVx <= 0 || fr.carX >= 720) {
            fr.carState = 'stopped';
            fr.carVx = 0;
        }
    } else if (fr.carState === 'ready') {
        fr.carX = rampTopX + 22;
        fr.carY = rampTopY + 12;
    }

    // Parçacıkları güncelle
    for (let i = fr.skidParticles.length - 1; i >= 0; i--) {
        const p = fr.skidParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.08;
        if (p.life <= 0) fr.skidParticles.splice(i, 1);
    }

    const surfNames = { ice: "Cam / Buz Levhası", wood: "Cilalı Ahşap", sand: "Zımpara Kağıdı", carpet: "Kumaş / Halı Şilte" };
    const fLevels = { ice: "Çok Düşük (Pürüzsüz)", wood: "Düşük (Az Pürüzlü)", sand: "Yüksek (Pürüzlü)", carpet: "Çok Yüksek (Aşırı Pürüzlü)" };

    const mbSurf = document.getElementById('mbar-53-surface');
    const mbFric = document.getElementById('mbar-53-friction');
    const mbDist = document.getElementById('mbar-53-distance');
    const mbStatus = document.getElementById('mbar-53-status');

    if (mbSurf) mbSurf.textContent = surfNames[fr.surface];
    if (mbFric) mbFric.textContent = fLevels[fr.surface];
    if (mbDist) mbDist.textContent = `${fr.distanceTraveled.toFixed(1)} m`;
    if (mbStatus) {
        if (fr.carState === 'ready') mbStatus.textContent = "🚗 Araba kitap rampasının tepesinde serbest bırakılmayı bekliyor";
        else if (fr.carState === 'rolling') mbStatus.textContent = "⚡ Araba mukavva rampadan hızlanarak iniyor...";
        else if (fr.carState === 'sliding') mbStatus.textContent = "🚗 Yüzey pürüzlülüğü aracı yavaşlatıyor...";
        else mbStatus.textContent = `🏁 Araç durdu! Durma mesafesi: ${fr.distanceTraveled.toFixed(1)} m`;
    }

    const mFric = document.getElementById('metric-53-friction');
    const mDist = document.getElementById('metric-53-distance');
    const mState = document.getElementById('metric-53-status');
    if (mFric) mFric.textContent = fLevels[fr.surface];
    if (mDist) mDist.textContent = `${fr.distanceTraveled.toFixed(1)} m`;
    if (mState) {
        if (fr.carState === 'stopped') mState.textContent = `Durdu (${fr.distanceTraveled.toFixed(1)} m)`;
        else if (fr.carState === 'rolling') mState.textContent = "Rampadan İniyor";
        else if (fr.carState === 'sliding') mState.textContent = "Pistte İlerliyor";
        else mState.textContent = "Hazır (Rampa Başında)";
    }

    // Dinamik Pedagojik Çıkarım Kartı
    const pTitle = document.getElementById('friction-pedagogical-title');
    const pText = document.getElementById('friction-pedagogical-text');
    const pIcon = document.getElementById('friction-pedagogical-icon');
    if (pTitle && pText) {
        if (fr.surface === 'ice') {
            pTitle.textContent = "🧊 Pürüzsüz Zemin (Buz Pisti / Cam)";
            pText.textContent = `Pürüzsüz ve son derece kaygan yüzeylerde sürtünme kuvveti çok azdır. Araç neredeyse direnç görmez${fr.carState === 'stopped' ? ` ve en uzun mesafeyi (${fr.distanceTraveled.toFixed(1)} m) katetti.` : ' ve en uzun mesafeyi kateder.'}`;
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-snowflake" style="color: #38bdf8;"></i>';
        } else if (fr.surface === 'wood') {
            pTitle.textContent = "🪵 Az Pürüzlü Zemin (Cilalı Ahşap)";
            pText.textContent = `Cilalı ahşap yüzeyde orta düzeyde sürtünme direnci oluşur. Araç dengeli şekilde yavaşlar${fr.carState === 'stopped' ? ` ve ${fr.distanceTraveled.toFixed(1)} m mesafede durdu.` : '.'}`;
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-tree" style="color: #fbbf24;"></i>';
        } else if (fr.surface === 'sand') {
            pTitle.textContent = "📜 Pürüzlü Zemin (Zımpara Kağıdı)";
            pText.textContent = `Zımparanın pütürlü dokusu tekerleklere yüksek sürtünme kuvveti uygular. Araç hızla yavaşlar${fr.carState === 'stopped' ? ` ve ${fr.distanceTraveled.toFixed(1)} m mesafede durdu.` : '.'}`;
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-scroll" style="color: #f97316;"></i>';
        } else if (fr.surface === 'carpet') {
            pTitle.textContent = "🧶 Aşırı Pürüzlü Zemin (Kumaş / Halı)";
            pText.textContent = `Kumaş ve halı lifleri tekerleğe güçlü bir karşı koyma direnci uygular. Sürtünme kuvveti çok yüksektir${fr.carState === 'stopped' ? ` ve araç kısa sürede (${fr.distanceTraveled.toFixed(1)} m) durdu.` : '.'}`;
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-rug" style="color: #ec4899;"></i>';
        }
    }
}

// MEB 1. Kitap s. 80 Birebir Düzenek: Üst üste ders kitapları, mukavva rampa, gerçekçi kaplamalar ve model araba
function drawFrictionSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // 1. Arka Plan (Laboratuvar / Fen Sınıfı Işığı)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "#080d1a");
    bgGrad.addColorStop(0.6, "#0f172a");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    const fr = labState.friction;

    // 2. Deney Masası Tablası (Y: 380 -> 500)
    const tableGrad = ctx.createLinearGradient(0, 380, 0, 500);
    tableGrad.addColorStop(0, "#1e293b");
    tableGrad.addColorStop(1, "#0f172a");
    ctx.fillStyle = tableGrad;
    ctx.fillRect(0, 380, 800, 120);

    ctx.fillStyle = "#334155";
    ctx.fillRect(0, 378, 800, 3);
    ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
    ctx.fillRect(0, 377, 800, 1);

    // 3. MEB Ders Kitapları Desteği (x: 35, y: 380)
    const bookX = 35;
    const bookW = 95;
    const bookH = 40;
    const count = fr.rampHeight;

    const bookColors = [
        { cover: "#1e3a8a", trim: "#facc15", spine: "#172554" }, // 1. Kitap (Lacivert / Altın)
        { cover: "#991b1b", trim: "#fbbf24", spine: "#7f1d1d" }, // 2. Kitap (Bordo / Sarı)
        { cover: "#065f46", trim: "#a7f3d0", spine: "#064e3b" }, // 3. Kitap (Zümrüt Yeşil)
        { cover: "#78350f", trim: "#fde68a", spine: "#451a03" }  // 4. Kitap (Kehribar Kahve)
    ];

    for (let b = 0; b < count; b++) {
        const by = 380 - (b + 1) * bookH + 2;
        const col = bookColors[b % bookColors.length];

        // Kitap Alt Gölgesi
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        ctx.fillRect(bookX, by + bookH - 2, bookW, 4);

        // Kitap Sayfaları (Beyaz / Krem Kağıt Katmanı)
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(bookX + 12, by + 4, bookW - 14, bookH - 8);
        ctx.fillStyle = "#e2e8f0";
        for (let l = by + 7; l < by + bookH - 6; l += 5) {
            ctx.fillRect(bookX + 12, l, bookW - 14, 1);
        }

        // Kitap Sırtı ve Kapak (Kalın Cilt)
        ctx.fillStyle = col.cover;
        ctx.beginPath();
        ctx.roundRect(bookX, by, 16, bookH - 2, [4, 0, 0, 4]);
        ctx.fill();

        // Üst ve Alt Kapak Çıkıntıları
        ctx.fillStyle = col.spine;
        ctx.fillRect(bookX - 1, by, bookW + 2, 3);
        ctx.fillRect(bookX - 1, by + bookH - 4, bookW + 2, 3);

        // Altın Varak Sırt Çizgileri
        ctx.fillStyle = col.trim;
        ctx.fillRect(bookX + 3, by + 6, 8, 2);
        ctx.fillRect(bookX + 3, by + bookH - 9, 8, 2);
    }

    // 4. Eğimli Mukavva Rampa Levhası (Oluklu Karton)
    const rampTopX = 85;
    const rampTopY = 380 - fr.rampHeight * 42;
    const rampBottomX = 240;
    const rampBottomY = 380;
    const rampAngle = Math.atan2(rampBottomY - rampTopY, rampBottomX - rampTopX);

    ctx.save();
    // Mukavva Alt Kalınlık Gölgesi
    ctx.fillStyle = "#78350f";
    ctx.beginPath();
    ctx.moveTo(rampTopX, rampTopY);
    ctx.lineTo(rampBottomX, rampBottomY);
    ctx.lineTo(rampBottomX, rampBottomY + 14);
    ctx.lineTo(rampTopX, rampTopY + 14);
    ctx.closePath();
    ctx.fill();

    // Mukavva Ana Yüzeyi (Karton Sarı/Kahve)
    const cardGrad = ctx.createLinearGradient(rampTopX, rampTopY, rampBottomX, rampBottomY);
    cardGrad.addColorStop(0, "#d97706");
    cardGrad.addColorStop(0.5, "#b45309");
    cardGrad.addColorStop(1, "#92400e");
    ctx.fillStyle = cardGrad;
    ctx.beginPath();
    ctx.moveTo(rampTopX, rampTopY);
    ctx.lineTo(rampBottomX, rampBottomY);
    ctx.lineTo(rampBottomX, rampBottomY + 6);
    ctx.lineTo(rampTopX, rampTopY + 6);
    ctx.closePath();
    ctx.fill();

    // Rampa Üstü Mukavva Oluklu Çizgileri
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1.2;
    const rLen = Math.sqrt(Math.pow(rampBottomX - rampTopX, 2) + Math.pow(rampBottomY - rampTopY, 2));
    for (let d = 20; d < rLen - 15; d += 18) {
        const ox = rampTopX + Math.cos(rampAngle) * d;
        const oy = rampTopY + Math.sin(rampAngle) * d;
        ctx.beginPath();
        ctx.moveTo(ox, oy - 2);
        ctx.lineTo(ox, oy + 8);
        ctx.stroke();
    }
    ctx.restore();

    // 5. Zemin Kaplama Şiltesi (Masa Üzerine Serilen Yüzey)
    const trackX = 236;
    const trackW = 530;
    const trackH = 26;

    if (fr.surface === 'ice') {
        // Cam / Buz Levhası: Ayna Yansımalı Açık Mavi & Pürüzsüz
        const glassGrad = ctx.createLinearGradient(trackX, 380, trackX, 380 + trackH);
        glassGrad.addColorStop(0, "#e0f2fe");
        glassGrad.addColorStop(0.3, "#38bdf8");
        glassGrad.addColorStop(1, "#0284c7");
        ctx.fillStyle = glassGrad;
        ctx.fillRect(trackX, 380, trackW, trackH);

        // Cam Yansıma Işıkları
        ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
        ctx.lineWidth = 2;
        for (let gx = trackX + 30; gx < trackX + trackW - 40; gx += 70) {
            ctx.beginPath();
            ctx.moveTo(gx, 384);
            ctx.lineTo(gx + 35, 384);
            ctx.stroke();
        }
        // Cam Pah Kenarı
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(trackX, 380, trackW, trackH);

    } else if (fr.surface === 'wood') {
        // Cilalı Ahşap Masa: Parke Damarları ve Ahşap Dokusu
        const woodGrad = ctx.createLinearGradient(trackX, 380, trackX, 380 + trackH);
        woodGrad.addColorStop(0, "#d97706");
        woodGrad.addColorStop(1, "#78350f");
        ctx.fillStyle = woodGrad;
        ctx.fillRect(trackX, 380, trackW, trackH);

        ctx.strokeStyle = "rgba(120, 53, 15, 0.6)";
        ctx.lineWidth = 1.5;
        for (let wy = 385; wy < 380 + trackH; wy += 7) {
            ctx.beginPath();
            ctx.moveTo(trackX, wy);
            ctx.lineTo(trackX + trackW, wy);
            ctx.stroke();
        }

    } else if (fr.surface === 'sand') {
        // Zımpara Kağıdı: Pütürlü Koyu Kehribar Zemin ve Kum Tanecikleri
        ctx.fillStyle = "#78350f";
        ctx.fillRect(trackX, 380, trackW, trackH);

        ctx.fillStyle = "#fde68a";
        for (let i = 0; i < 110; i++) {
            const px = trackX + ((i * 47) % trackW);
            const py = 383 + ((i * 23) % (trackH - 6));
            ctx.fillRect(px, py, 2, 2);
        }
        ctx.strokeStyle = "#b45309";
        ctx.lineWidth = 2;
        ctx.strokeRect(trackX, 380, trackW, trackH);

    } else if (fr.surface === 'carpet') {
        // Kumaş / Halı / Havlu Şiltesi: Tekstil Dokusu ve Hav Lifleri
        ctx.fillStyle = "#064e3b";
        ctx.fillRect(trackX, 380, trackW, trackH);

        // Kumaş dikey hav lifleri
        ctx.strokeStyle = "#10b981";
        ctx.lineWidth = 1.2;
        for (let cx = trackX + 4; cx < trackX + trackW; cx += 6) {
            ctx.beginPath();
            ctx.moveTo(cx, 380);
            ctx.lineTo(cx + 2, 386);
            ctx.stroke();
        }
        ctx.strokeStyle = "#047857";
        ctx.lineWidth = 2;
        ctx.strokeRect(trackX, 380, trackW, trackH);
    }

    // 6. Metre Cetveli (Pist Üzeri Çentikler 0m - 10m)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(trackX, 380);
    ctx.lineTo(trackX + trackW, 380);
    ctx.stroke();

    for (let m = 0; m <= 10; m++) {
        const mx = trackX + m * 48;
        const tickH = (m % 2 === 0) ? 14 : 7;
        ctx.strokeStyle = (m % 2 === 0) ? "#facc15" : "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = (m % 2 === 0) ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(mx, 380);
        ctx.lineTo(mx, 380 + tickH);
        ctx.stroke();
    }

    // 7. Sürtünme Parçacıkları (Skid / Toz)
    fr.skidParticles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    });

    // 8. MEB Ders Kitabı Uyumlu Stylized Oyuncak Model Araba
    ctx.save();
    ctx.translate(fr.carX, fr.carY);

    if (fr.carState === 'rolling') {
        ctx.rotate(rampAngle);
    }

    // Araba Alt Zemin Gölgesi
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.beginPath();
    ctx.ellipse(0, 10, 26, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Ön Far Işık Huzmesi (Aydınlatma Konisi)
    const beamGrad = ctx.createLinearGradient(15, -4, 55, -4);
    beamGrad.addColorStop(0, "rgba(254, 240, 138, 0.7)");
    beamGrad.addColorStop(1, "rgba(254, 240, 138, 0)");
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(25, -4);
    ctx.lineTo(60, -12);
    ctx.lineTo(60, 4);
    ctx.closePath();
    ctx.fill();

    // Aerodinamik Gövde (Metalik Kırmızı Spor Kasa)
    const carBodyGrad = ctx.createLinearGradient(-26, -18, 26, -2);
    carBodyGrad.addColorStop(0, "#ef4444");
    carBodyGrad.addColorStop(0.5, "#dc2626");
    carBodyGrad.addColorStop(1, "#991b1b");
    ctx.fillStyle = carBodyGrad;
    ctx.strokeStyle = "#7f1d1d";
    ctx.lineWidth = 1.8;

    // Gövde Profili (Ön kaput, çamurluklar, tavan)
    ctx.beginPath();
    ctx.moveTo(-24, -4);
    ctx.lineTo(-24, -14); // Arka tampon
    ctx.lineTo(-14, -15);
    ctx.lineTo(-6, -24);  // Arka cam eğimi
    ctx.lineTo(8, -24);   // Tavan
    ctx.lineTo(17, -13);  // Ön cam eğimi
    ctx.lineTo(26, -11);  // Ön burun
    ctx.lineTo(26, -4);   // Ön tampon
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Arka Spoyler (Yarış Arabası Kanadı)
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(-26, -20, 6, 6);
    ctx.fillRect(-28, -22, 10, 3);

    // Ön ve Yan Camlar (Kavisli Gökyüzü Mavisi)
    ctx.fillStyle = "#38bdf8";
    ctx.strokeStyle = "#0284c7";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-5, -22);
    ctx.lineTo(7, -22);
    ctx.lineTo(15, -14);
    ctx.lineTo(-5, -14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Ön Far (Akkor LED Sarı)
    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(24, -7, 3, 0, Math.PI * 2);
    ctx.fill();

    // Tekerlekler (Alaşım Jantlı Çift Lastik)
    const drawWheel = (wx, wy) => {
        ctx.save();
        ctx.translate(wx, wy);
        ctx.rotate(fr.wheelAngle);

        // Kauçuk Lastik
        ctx.fillStyle = "#0f172a";
        ctx.strokeStyle = "#334155";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Krom / Alaşım Jant Göbeği
        ctx.fillStyle = "#e2e8f0";
        ctx.beginPath();
        ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Jant Kolları
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-4, 0); ctx.lineTo(4, 0);
        ctx.moveTo(0, -4); ctx.lineTo(0, 4);
        ctx.stroke();

        ctx.restore();
    };

    drawWheel(-15, 0);
    drawWheel(15, 0);

    ctx.restore(); // Araba restore

    ctx.restore(); // Genel canvas restore
}

// --- 5.4. DENEY 5.4: IŞIĞIN DOĞRUSAL YAYILMASI (FB.5.4.1) ---
// ============================================================================

function initLightRectState() {
    const lr = labState.lightRect;
    lr.mode = "cards";
    lr.cardsAligned = true;
    lr.middleCardY = 0;
    lr.hoseCurved = false;
    lr.lampOn = true;
    lr.beamReachesEnd = true;
    updateLightRectDOMControls();
    updateLightRectPhysics();
}

function resetLightRectExperiment() {
    initLightRectState();
    showLabToast("Işık yayılma düzeneği başlangıç durumuna getirildi!");
}

function updateLightRectDOMControls() {
    const lr = labState.lightRect;
    const isCards = (lr.mode === "cards");

    ['btn-54-mode-cards', 'pill-54-cards'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', isCards);
    });
    ['btn-54-mode-hose', 'pill-54-hose'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', !isCards);
    });

    const gCards = document.getElementById('group-54-cards-ctrl');
    const gHose = document.getElementById('group-54-hose-ctrl');
    if (gCards) gCards.classList.toggle('is-hidden', !isCards);
    if (gHose) gHose.classList.toggle('is-hidden', isCards);
}

function setupLightRectControlsDOM() {
    const lr = labState.lightRect;

    const setMode = (m) => {
        lr.mode = m;
        updateLightRectDOMControls();
        updateLightRectPhysics();
        showLabToast(m === "cards" ? "1. Düzenek: Delikli Karton Levhalar" : "2. Düzenek: Düz / Kıvrık Hortum");
    };

    ['btn-54-mode-cards', 'pill-54-cards'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setMode("cards"));
    });
    ['btn-54-mode-hose', 'pill-54-hose'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setMode("hose"));
    });

    const btnAlign = document.getElementById('btn-54-align-cards');
    if (btnAlign) {
        btnAlign.addEventListener('click', () => {
            lr.cardsAligned = true;
            lr.middleCardY = 0;
            updateLightRectPhysics();
            showLabToast("🎯 Delikler aynı doğrultuya getirildi! Işık geçiyor.");
        });
    }

    const btnShift = document.getElementById('btn-54-shift-card');
    if (btnShift) {
        btnShift.addEventListener('click', () => {
            lr.cardsAligned = false;
            lr.middleCardY = 35;
            updateLightRectPhysics();
            showLabToast("↔️ 2. Levha kaydırıldı! Işık doğrusal olduğu için engellendi.");
        });
    }

    const btnStraight = document.getElementById('btn-54-hose-straight');
    if (btnStraight) {
        btnStraight.addEventListener('click', () => {
            lr.hoseCurved = false;
            updateLightRectPhysics();
            showLabToast("➖ Düz hortum: Işık doğrusal yolla karşıya ulaşıyor.");
        });
    }

    const btnCurved = document.getElementById('btn-54-hose-curved');
    if (btnCurved) {
        btnCurved.addEventListener('click', () => {
            lr.hoseCurved = true;
            updateLightRectPhysics();
            showLabToast("〰️ Kıvrık hortum: Işık bükülemez, virajı dönemez!");
        });
    }

    const btnRecord = document.getElementById('btn-record-data-5-4');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateLightRectPhysics() {
    const lr = labState.lightRect;
    lr.beamReachesEnd = (lr.mode === "cards") ? lr.cardsAligned : (!lr.hoseCurved);

    const modeLabels = { cards: "Delikli Levhalar", hose: "Boru / Hortum" };
    let alignText = lr.mode === "cards" 
        ? (lr.cardsAligned ? "Delikler Hizalı (Aynı Doğrultu)" : "Doğrultu Bozuk (Levha Kayık)")
        : (lr.hoseCurved ? "Kıvrık Hortum (Bükülmüş)" : "Düz Hortum (Aynı Eksen)");

    let beamText = lr.beamReachesEnd ? "Işık Geçiyor (Görünür)" : "Engellendi (Geçemez)";
    let statusText = lr.beamReachesEnd
        ? "💡 Işık her yönde ve doğrusal bir yol izler; karşıya ulaştı"
        : "⛔ Işık doğrusal yayıldığı için engeli aşamaz, bükülemez!";

    const mbMode = document.getElementById('mbar-54-mode');
    const mbAlign = document.getElementById('mbar-54-align');
    const mbBeam = document.getElementById('mbar-54-beam');
    const mbStatus = document.getElementById('mbar-54-status');

    if (mbMode) mbMode.textContent = modeLabels[lr.mode];
    if (mbAlign) mbAlign.textContent = alignText;
    if (mbBeam) mbBeam.textContent = beamText;
    if (mbStatus) mbStatus.textContent = statusText;

    const mAlign = document.getElementById('metric-54-align');
    const mState = document.getElementById('metric-54-state');
    if (mAlign) {
        mAlign.textContent = (lr.mode === "cards") 
            ? (lr.cardsAligned ? "Aynı Doğrultuda" : "Hizasız") 
            : (!lr.hoseCurved ? "Düz / Doğrusal" : "Kıvrık / Bükük");
    }
    if (mState) mState.textContent = beamText;
}

function drawLightRectSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // Arka Plan (Laboratuvar Karanlık Odası)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "#050914");
    bgGrad.addColorStop(1, "#0f172a");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Optik Masa Tablası (Y: 380 -> 500)
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 380, 800, 120);
    ctx.fillStyle = "#334155";
    ctx.fillRect(0, 378, 800, 2);

    const lr = labState.lightRect;

    if (lr.mode === "cards") {
        // --- 1. MOD: DELİKLİ KARTON LEVHALAR ---
        const srcX = 120;
        const srcY = 250;

        // Işık Kaynağı (Mum ve Alev)
        // Mum Tabanı / Şamdan
        ctx.fillStyle = "#d97706";
        ctx.fillRect(srcX - 18, srcY + 40, 36, 15);
        ctx.fillRect(srcX - 8, srcY, 16, 40);

        // Alev (Dinamik Titreşen Organik Alev)
        const flameH = 22 + Math.sin(animTime * 12) * 3;
        const flameGrad = ctx.createRadialGradient(srcX, srcY - 5, 2, srcX, srcY - 5, 18);
        flameGrad.addColorStop(0, "#ffffff");
        flameGrad.addColorStop(0.3, "#facc15");
        flameGrad.addColorStop(0.8, "#f97316");
        flameGrad.addColorStop(1, "rgba(239, 68, 68, 0.0)");

        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.ellipse(srcX, srcY - 8, 9, flameH, 0, 0, Math.PI * 2);
        ctx.fill();

        // 3 Ayaklı Karton Levha (Card 1: 280, Card 2: 440, Card 3: 600)
        const cardX = [280, 440, 600];
        const cardW = 16;
        const cardH = 160;
        const baseHoleY = 250;

        // Kart 2 dikey kayma ofseti
        const holeY = [baseHoleY, baseHoleY + lr.middleCardY, baseHoleY];

        // Kartları Çiz
        for (let i = 0; i < 3; i++) {
            const cx = cardX[i];
            const hy = holeY[i];

            // Ahşap Statif Ayak
            ctx.fillStyle = "#475569";
            ctx.fillRect(cx - 16, 360, 32, 20);

            // Karton Levha Gövdesi (Üst ve alt yarı, ortada 14px dairesel delik)
            ctx.fillStyle = "#b45309";
            ctx.strokeStyle = "#78350f";
            ctx.lineWidth = 1.5;

            // Üst parça
            ctx.fillRect(cx - cardW * 0.5, hy - 80, cardW, 73);
            ctx.strokeRect(cx - cardW * 0.5, hy - 80, cardW, 73);

            // Alt parça
            ctx.fillRect(cx - cardW * 0.5, hy + 7, cardW, 73);
            ctx.strokeRect(cx - cardW * 0.5, hy + 7, cardW, 73);

            // Delik Kenar Çerçevesi
            ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(cx, hy, 7, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Sağ Taraf: Hedef Ekran / Gözlemci Perdesi (x: 720)
        ctx.fillStyle = "#f1f5f9";
        ctx.fillRect(716, 170, 8, 160);
        ctx.fillStyle = "#475569";
        ctx.fillRect(706, 360, 28, 20); // ayak

        // IŞININ DOĞRUSAL YOLU:
        ctx.save();
        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 3;
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 12;

        if (lr.cardsAligned) {
            // Hizalı: Işın mumdan ekrana kadar kesintisiz doğrusal gider
            ctx.beginPath();
            ctx.moveTo(srcX + 10, srcY - 5);
            ctx.lineTo(716, baseHoleY);
            ctx.stroke();

            // Ekrandaki Aydınlık Spot
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(716, baseHoleY, 8, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Hizasız: Işın 1. karttan geçer, 2. kartın gövdesine çarpar ve DURUR
            ctx.beginPath();
            ctx.moveTo(srcX + 10, srcY - 5);
            ctx.lineTo(cardX[1] - cardW * 0.5, baseHoleY);
            ctx.stroke();

            // 2. Kart Üzerinde Çarpma Işıması (Işık geçemez)
            ctx.fillStyle = "#facc15";
            ctx.beginPath();
            ctx.arc(cardX[1] - cardW * 0.5, baseHoleY, 6, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    } else {
        // --- 2. MOD: BORU / HORTUM ---
        const hStartX = 180;
        const hEndX = 620;
        const hY = 250;

        // Mum Işığı
        ctx.fillStyle = "#d97706";
        ctx.fillRect(100, 290, 36, 15);
        ctx.fillRect(110, 250, 16, 40);

        ctx.fillStyle = "#facc15";
        ctx.beginPath();
        ctx.ellipse(118, 240, 8, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        if (!lr.hoseCurved) {
            // Düz Hortum: Silindirik Boru
            ctx.fillStyle = "#334155";
            ctx.strokeStyle = "#64748b";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(hStartX, hY - 18, hEndX - hStartX, 36, 6);
            ctx.fill();
            ctx.stroke();

            // Boru İçi Boşluk
            ctx.fillStyle = "#0f172a";
            ctx.fillRect(hStartX + 4, hY - 10, hEndX - hStartX - 8, 20);

            // Doğrusal Işın
            ctx.strokeStyle = "#facc15";
            ctx.lineWidth = 4;
            ctx.shadowColor = "#facc15";
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.moveTo(126, 240);
            ctx.lineTo(720, 240);
            ctx.stroke();
            ctx.shadowBlur = 0;
        } else {
            // Kıvrık Hortum: Bükülmüş S-Eğrisi
            ctx.save();
            ctx.strokeStyle = "#334155";
            ctx.lineWidth = 36;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(hStartX, hY);
            ctx.bezierCurveTo(320, hY - 90, 480, hY + 90, hEndX, hY);
            ctx.stroke();

            ctx.strokeStyle = "#0f172a";
            ctx.lineWidth = 20;
            ctx.beginPath();
            ctx.moveTo(hStartX, hY);
            ctx.bezierCurveTo(320, hY - 90, 480, hY + 90, hEndX, hY);
            ctx.stroke();
            ctx.restore();

            // Işın Doğrusal İlerler ve İlk Kıvrıma Çarparak Söner
            ctx.strokeStyle = "#facc15";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(126, 240);
            ctx.lineTo(260, 240);
            ctx.stroke();

            // Çarpma Parlaması
            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            ctx.arc(260, 240, 6, 0, Math.PI * 2);
            ctx.fill();
        }

        // Gözlemci Sembolü (Sağda Perde)
        ctx.fillStyle = "#f1f5f9";
        ctx.fillRect(720, 180, 8, 140);
    }

    ctx.restore();
}

// ============================================================================
// --- 5.5. DENEY 5.5: TAM GÖLGE VE BOYUT DEĞİŞKENLERİ (FB.5.4.3) ---
// ============================================================================

function initShadowState() {
    const sh = labState.shadow;
    sh.sourceDist = 25;
    sh.screenDist = 35;
    sh.objectRadius = 32;
    sh.shadowDiameter = 14;
    sh.lampOn = true;
    updateShadowDOMControls();
    updateShadowPhysics();
}

function resetShadowExperiment() {
    initShadowState();
    showLabToast("Gölge deney mesafeleri sıfırlandı!");
}

function updateShadowDOMControls() {
    const sh = labState.shadow;
    const btnLight = document.getElementById('btn-55-toggle-light');
    if (btnLight) {
        btnLight.innerHTML = sh.lampOn ? '<i class="fas fa-lightbulb"></i> Fener Açık' : '<i class="far fa-lightbulb"></i> Fener Kapalı';
        btnLight.classList.toggle('active', sh.lampOn);
    }
}

function setupShadowControlsDOM() {
    const sh = labState.shadow;

    const btnLight = document.getElementById('btn-55-toggle-light');
    if (btnLight) {
        btnLight.addEventListener('click', () => {
            sh.lampOn = !sh.lampOn;
            updateShadowDOMControls();
            updateShadowPhysics();
            showLabToast(sh.lampOn ? "Fener açıldı." : "Fener kapatıldı.");
        });
    }

    const setDistances = (srcD, scrD) => {
        sh.sourceDist = srcD;
        sh.screenDist = scrD;
        updateShadowPhysics();
    };

    const btnCloseSrc = document.getElementById('btn-55-preset-close-src');
    if (btnCloseSrc) btnCloseSrc.addEventListener('click', () => setDistances(15, 45));

    const btnMid = document.getElementById('btn-55-preset-mid');
    if (btnMid) btnMid.addEventListener('click', () => setDistances(25, 35));

    const btnCloseScr = document.getElementById('btn-55-preset-close-scr');
    if (btnCloseScr) btnCloseScr.addEventListener('click', () => setDistances(40, 20));

    const btnReset = document.getElementById('btn-55-reset');
    if (btnReset) btnReset.addEventListener('click', resetShadowExperiment);

    const sliderSrc = document.getElementById('slider-55-source');
    if (sliderSrc) {
        sliderSrc.addEventListener('input', (e) => {
            sh.sourceDist = parseInt(e.target.value, 10);
            updateShadowPhysics();
        });
    }

    const sliderScr = document.getElementById('slider-55-screen');
    if (sliderScr) {
        sliderScr.addEventListener('input', (e) => {
            sh.screenDist = parseInt(e.target.value, 10);
            updateShadowPhysics();
        });
    }

    const btnRecord = document.getElementById('btn-record-data-5-5');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateShadowPhysics() {
    const sh = labState.shadow;

    // Gölge Boyutu Geometrisi: d_golge = d_cisim * (d1 + d2) / d1
    const d1 = Math.max(10, sh.sourceDist);
    const d2 = Math.max(10, sh.screenDist);
    const ratio = (d1 + d2) / d1;
    sh.shadowDiameter = Math.round(8 * ratio);

    let statusText = `🌑 Tam Gölge Çapı: ${sh.shadowDiameter} cm`;
    if (!sh.lampOn) {
        statusText = "💡 Işık kaynağı kapalı; perdede gölge oluşmaz";
    } else if (ratio >= 3.0) {
        statusText = "🌑 Cisim fenere çok yakın! Perdede dev bir tam gölge oluştu.";
    } else if (ratio <= 1.5) {
        statusText = "🌑 Cisim perdeye çok yakın! Tam gölge küçüldü ve netleşti.";
    }

    const mbSrc = document.getElementById('mbar-55-dist-src');
    const mbScr = document.getElementById('mbar-55-dist-scr');
    const mbSize = document.getElementById('mbar-55-size');
    const mbStatus = document.getElementById('mbar-55-status');
    const valSrc = document.getElementById('val-55-source');
    const valScr = document.getElementById('val-55-screen');
    const sliderSrc = document.getElementById('slider-55-source');
    const sliderScr = document.getElementById('slider-55-screen');

    if (mbSrc) mbSrc.textContent = `${sh.sourceDist} cm`;
    if (mbScr) mbScr.textContent = `${sh.screenDist} cm`;
    if (mbSize) mbSize.textContent = sh.lampOn ? `${sh.shadowDiameter} cm (Tam Gölge)` : "Gölge Yok";
    if (mbStatus) mbStatus.textContent = statusText;
    if (valSrc) valSrc.textContent = `${sh.sourceDist} cm`;
    if (valScr) valScr.textContent = `${sh.screenDist} cm`;
    if (sliderSrc) sliderSrc.value = sh.sourceDist;
    if (sliderScr) sliderScr.value = sh.screenDist;

    const mSize = document.getElementById('metric-55-size');
    const mType = document.getElementById('metric-55-type');
    const mTrend = document.getElementById('metric-55-trend');
    if (mSize) mSize.textContent = sh.lampOn ? `${sh.shadowDiameter} cm` : "0 cm (Yok)";
    if (mType) mType.textContent = sh.lampOn ? "Tam Gölge" : "Işık Kapalı / Gölge Yok";
    if (mTrend) mTrend.textContent = sh.lampOn ? (ratio >= 2.5 ? "Büyük Boy" : (ratio <= 1.6 ? "Küçük Boy" : "Orta Boy")) : "Oluşmaz";

    // Dinamik Pedagojik Çıkarım Kartı
    const pTitle = document.getElementById('shadow-pedagogical-title');
    const pText = document.getElementById('shadow-pedagogical-text');
    const pIcon = document.getElementById('shadow-pedagogical-icon');
    if (pTitle && pText) {
        if (!sh.lampOn) {
            pTitle.textContent = "💡 Işık Kaynağı Kapalı";
            pText.textContent = "Işık kaynağı olmadan opak cisimlerin arkasında gölge oluşamaz. Işığın doğrusal yayılması sonucu opak engelin arkasında gölge oluşur.";
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-lightbulb" style="color: #64748b;"></i>';
        } else {
            pTitle.textContent = `🌑 Tam Gölgenin Boyutu (${sh.shadowDiameter} cm)`;
            pText.textContent = "Işık kaynağı cisme yaklaştıkça perdedeki tam gölgenin alanı büyür. Cisim perdeye yaklaştıkça veya ışıktan uzaklaştıkça tam gölge küçülür.";
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-circle" style="color: #38bdf8;"></i>';
        }
    }
}

function drawShadowSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "#030712");
    bgGrad.addColorStop(1, "#0f172a");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Optik Ray Tezgahı (Y: 380 -> 480)
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(60, 380, 680, 30);
    ctx.fillStyle = "#334155";
    ctx.fillRect(60, 378, 680, 2);

    const sh = labState.shadow;

    // Pozisyonlar:
    // Fener: sabit x=120, y=250
    // Cisim: x = 120 + sourceDist * 6.0
    // Perde: x = cisimX + screenDist * 6.0 (Tuval sınırına clamp)
    const fenerX = 120;
    const fenerY = 250;
    const cisimX = Math.min(480, fenerX + sh.sourceDist * 6.0);
    const cisimY = 250;
    const perdeX = Math.min(730, cisimX + sh.screenDist * 6.0);
    const perdeY = 250;
    const objR = sh.objectRadius;

    // 1. Işık Kaynağı (El Feneri)
    ctx.fillStyle = "#475569";
    ctx.fillRect(fenerX - 50, fenerY - 14, 45, 28); // gövde
    ctx.fillStyle = "#334155";
    ctx.beginPath();
    ctx.moveTo(fenerX - 5, fenerY - 22);
    ctx.lineTo(fenerX + 15, fenerY - 26);
    ctx.lineTo(fenerX + 15, fenerY + 26);
    ctx.lineTo(fenerX - 5, fenerY + 22);
    ctx.closePath();
    ctx.fill();

    // Fener Ayağı
    ctx.fillStyle = "#64748b";
    ctx.fillRect(fenerX - 35, fenerY + 14, 8, 120);

    if (sh.lampOn) {
        // Işık Konisi ve Teğet Işınlar (Sınır Güvenceli Trigonometri)
        const dx = Math.max(objR + 15, cisimX - fenerX);
        const sinVal = Math.min(0.92, objR / dx);
        const tanAngle = Math.tan(Math.asin(sinVal));
        const upperPerdeY = Math.max(105, fenerY - tanAngle * (perdeX - fenerX));
        const lowerPerdeY = Math.min(375, fenerY + tanAngle * (perdeX - fenerX));

        // Işık Hüzmesi Gradyanı
        const beamGrad = ctx.createLinearGradient(fenerX, fenerY, perdeX, fenerY);
        beamGrad.addColorStop(0, "rgba(250, 204, 21, 0.45)");
        beamGrad.addColorStop(1, "rgba(250, 204, 21, 0.08)");

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(fenerX + 15, fenerY);
        ctx.lineTo(perdeX, upperPerdeY - 30);
        ctx.lineTo(perdeX, lowerPerdeY + 30);
        ctx.closePath();
        ctx.fill();

        // Teğet Işın Çizgileri (Sarı Kesikli Çizgiler)
        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(fenerX + 15, fenerY);
        ctx.lineTo(perdeX, upperPerdeY);
        ctx.moveTo(fenerX + 15, fenerY);
        ctx.lineTo(perdeX, lowerPerdeY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Karanlık Gölge Konisi (Cismin arkasından perdeye)
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.beginPath();
        ctx.moveTo(cisimX, cisimY - objR);
        ctx.lineTo(perdeX, upperPerdeY);
        ctx.lineTo(perdeX, lowerPerdeY);
        ctx.lineTo(cisimX, cisimY + objR);
        ctx.closePath();
        ctx.fill();
    }

    // 2. Opak Cisim (Siyah Ahşap Küre)
    // Destek Çubuğu
    ctx.fillStyle = "#64748b";
    ctx.fillRect(cisimX - 3, cisimY + objR, 6, 380 - (cisimY + objR));

    // Küre Radyal Gradyanı
    const sphereGrad = ctx.createRadialGradient(cisimX - objR * 0.4, cisimY - objR * 0.4, objR * 0.1, cisimX, cisimY, objR);
    sphereGrad.addColorStop(0, "#475569");
    sphereGrad.addColorStop(0.5, "#1e293b");
    sphereGrad.addColorStop(1, "#020617");

    ctx.fillStyle = sphereGrad;
    ctx.beginPath();
    ctx.arc(cisimX, cisimY, objR, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 3. Projeksiyon Perdesi (Beyaz Dikey Ekran)
    ctx.fillStyle = "#f8fafc";
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(perdeX - 4, 100, 8, 280, 2);
    ctx.fill();
    ctx.stroke();

    // Perde Ayağı
    ctx.fillStyle = "#475569";
    ctx.fillRect(perdeX - 16, 370, 32, 12);

    // 4. Perdede Oluşan Tam Gölgenin Önden Görünümü (Sağ Üst İnset Daire)
    const insetX = 690;
    const insetY = 160;
    const insetR = 55;

    ctx.save();
    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(insetX, insetY, insetR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (sh.lampOn) {
        // Beyaz Perde Yüzeyi
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(insetX, insetY, insetR - 4, 0, Math.PI * 2);
        ctx.fill();

        // Merkezdeki Tam Gölge Diski
        const shadowR = Math.min(insetR - 6, (sh.shadowDiameter / 2) * 2.8);
        ctx.fillStyle = "#020617";
        ctx.beginPath();
        ctx.arc(insetX, insetY, shadowR, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();

    ctx.restore();
}

// ============================================================================
// --- 5.6. DENEY 5.6: MADDENİN HALLERİ VE SIKIŞTIRILABİLİRLİK (FB.5.5.1) ---
// ============================================================================

function initCompressibilityState() {
    const cp = labState.compressibility;
    cp.state = "gas";
    cp.forcePercent = 0;
    cp.plungerPos = 0.0;
    cp.targetPlungerPos = 0.0;

    // 35 parçacık üret (140 -> 440 aralığına uygun)
    cp.particles = [];
    for (let i = 0; i < 35; i++) {
        cp.particles.push({
            x: 160 + Math.random() * 180,
            y: 195 + Math.random() * 85,
            vx: (Math.random() - 0.5) * 2.5,
            vy: (Math.random() - 0.5) * 2.5,
            r: 4
        });
    }

    updateCompressibilityDOMControls();
    updateCompressibilityPhysics();
}

function resetCompressibilityExperiment() {
    initCompressibilityState();
    showLabToast("Şırınga pistonu serbest bırakıldı!");
}

function updateCompressibilityDOMControls() {
    const cp = labState.compressibility;
    ['btn-56-state-gas', 'pill-56-gas'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', cp.state === 'gas');
    });
    ['btn-56-state-liquid', 'pill-56-liquid'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', cp.state === 'liquid');
    });
    ['btn-56-state-solid', 'pill-56-solid'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('active', cp.state === 'solid');
    });
}

function setupCompressibilityControlsDOM() {
    const cp = labState.compressibility;

    const setState = (st) => {
        cp.state = st;
        cp.forcePercent = 0;
        cp.plungerPos = 0;
        updateCompressibilityDOMControls();
        updateCompressibilityPhysics();
        const names = { gas: "Hava (Gaz Hâli)", liquid: "Su (Sıvı Hâli)", solid: "Tahta Takoz (Katı Hâli)" };
        showLabToast(`Madde seçildi: ${names[st]}`);
    };

    const map = {
        'btn-56-state-gas': 'gas', 'pill-56-gas': 'gas',
        'btn-56-state-liquid': 'liquid', 'pill-56-liquid': 'liquid',
        'btn-56-state-solid': 'solid', 'pill-56-solid': 'solid'
    };
    Object.entries(map).forEach(([id, st]) => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => setState(st));
    });

    const btnPress = document.getElementById('btn-56-press');
    if (btnPress) {
        btnPress.addEventListener('click', () => {
            cp.forcePercent = 100;
            updateCompressibilityPhysics();
            showLabToast("👇 Pistona kuvvet uygulandı!");
        });
    }

    const btnRelease = document.getElementById('btn-56-release');
    if (btnRelease) {
        btnRelease.addEventListener('click', () => {
            cp.forcePercent = 0;
            updateCompressibilityPhysics();
            showLabToast("✋ Piston serbest bırakıldı.");
        });
    }

    const slider = document.getElementById('slider-56-force');
    if (slider) {
        slider.addEventListener('input', (e) => {
            cp.forcePercent = parseInt(e.target.value, 10);
            updateCompressibilityPhysics();
        });
    }

    const btnRecord = document.getElementById('btn-record-data-5-6');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateCompressibilityPhysics() {
    const cp = labState.compressibility;

    // Sıkışma oranı hedefi:
    // Gaz: %100 kuvvette %55 sıkışır
    // Sıvı: %100 kuvvette %2 sıkışır (ihmal edilebilir)
    // Katı: %0 sıkışır (sert blok durdurur)
    let maxRatio = 0.55;
    if (cp.state === 'liquid') maxRatio = 0.02;
    if (cp.state === 'solid') maxRatio = 0.0;

    cp.targetPlungerPos = (cp.forcePercent / 100) * maxRatio;
    cp.plungerPos += (cp.targetPlungerPos - cp.plungerPos) * 0.15;

    // Parçacık Hareketi
    const barrelLeft = 148;
    const barrelRight = 420 - cp.plungerPos * 180 - 10;
    const barrelTop = 192;
    const barrelBottom = 288;

    cp.particles.forEach(p => {
        if (cp.state === 'gas') {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x <= barrelLeft || p.x >= barrelRight) p.vx *= -1;
            if (p.y <= barrelTop || p.y >= barrelBottom) p.vy *= -1;
            p.x = Math.max(barrelLeft, Math.min(barrelRight, p.x));
            p.y = Math.max(barrelTop, Math.min(barrelBottom, p.y));
        } else if (cp.state === 'liquid') {
            p.x += (Math.random() - 0.5) * 0.6;
            p.y += (Math.random() - 0.5) * 0.6;
        }
    });

    const stateLabels = { gas: "Hava (Gaz)", liquid: "Su (Sıvı)", solid: "Tahta (Katı)" };
    const gapLabels = { gas: "Çok Fazla (Geniş Boşluk)", liquid: "Çok Az (Yakın)", solid: "Yok Denecek Kadar Az" };
    const compLabels = { gas: "Kolayca Sıkışır", liquid: "Sıkıştırılamaz Kabul Edilir", solid: "Kesinlikle Sıkışmaz" };

    const mbState = document.getElementById('mbar-56-state');
    const mbGap = document.getElementById('mbar-56-gap');
    const mbComp = document.getElementById('mbar-56-compress');
    const mbStatus = document.getElementById('mbar-56-status');
    const valForce = document.getElementById('val-56-force');
    const slider = document.getElementById('slider-56-force');

    if (mbState) mbState.textContent = stateLabels[cp.state];
    if (mbGap) mbGap.textContent = gapLabels[cp.state];
    if (mbComp) mbComp.textContent = compLabels[cp.state];
    if (mbStatus) {
        if (cp.state === 'gas') mbStatus.textContent = "💨 Gazlar tanecikler arasındaki geniş boşluklar sebebiyle kolayca sıkışır (Hacim azaldı)";
        else if (cp.state === 'liquid') mbStatus.textContent = "💧 Sıvı tanecikleri birbiriyle temas halindedir; sıvı sıkıştırılamaz";
        else mbStatus.textContent = "🪵 Katı tanecikleri çok sıkı dizilmiştir; katı maddeler sıkıştırılamaz";
    }
    if (valForce) valForce.textContent = `%${cp.forcePercent}`;
    if (slider) slider.value = cp.forcePercent;

    const mVol = document.getElementById('metric-56-vol');
    const mGap = document.getElementById('metric-56-gap');
    const mComp = document.getElementById('metric-56-compress');
    if (mVol) mVol.textContent = `%${Math.round(cp.plungerPos * 100)}`;
    if (mGap) mGap.textContent = (cp.state === 'gas') ? "Çok Fazla" : (cp.state === 'liquid' ? "Çok Az" : "Yok Denecek Kadar Az");
    if (mComp) mComp.textContent = (cp.state === 'gas') ? "Sıkıştırılabilir" : "Sıkıştırılamaz";

    // Dinamik Pedagojik Çıkarım Kartı
    const pTitle = document.getElementById('compress-pedagogical-title');
    const pText = document.getElementById('compress-pedagogical-text');
    const pIcon = document.getElementById('compress-pedagogical-icon');
    if (pTitle && pText) {
        if (cp.state === 'gas') {
            pTitle.textContent = "💨 Gazların Tanecikli Yapısı";
            pText.textContent = "Gaz tanecikleri arasındaki boşluk çok fazladır; bu nedenle gazlar dış kuvvet etkisiyle kolayca sıkıştırılabilir ve hacmi küçülür.";
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-wind" style="color: #38bdf8;"></i>';
        } else if (cp.state === 'liquid') {
            pTitle.textContent = "💧 Sıvıların Sıkıştırılamazlığı";
            pText.textContent = "Sıvı tanecikleri birbiriyle sürekli temas hâlindedir ve aralarında kayda değer boşluk yoktur. Bu yüzden sıvılar sıkıştırılamaz kabul edilir.";
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-tint" style="color: #06b6d4;"></i>';
        } else {
            pTitle.textContent = "🪵 Katıların Düzenli ve Sıkı Yapısı";
            pText.textContent = "Katı tanecikleri belirli bir düzen içinde ve birbirine son derece yakın dizilmiştir; aralarında boşluk yoktur. Katılar kesinlikle sıkıştırılamaz.";
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-cube" style="color: #fbbf24;"></i>';
        }
    }
}

function drawCompressibilitySimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "#0b1329");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    const cp = labState.compressibility;

    // Şırınga Boyutları (Tuval İçinde Emniyetli Konumlandırma):
    // Nozul: x=105 -> 140, y=230 -> 250
    // Gövde: x=140 -> 440, y=185 -> 295 (W: 300, H: 110)
    const barrelX = 140;
    const barrelY = 185;
    const barrelW = 300;
    const barrelH = 110;

    // Piston Pozisyonu (X: 420 -> 320)
    const plungerX = 420 - cp.plungerPos * 180;

    // 1. Şırınga İçi Madde Doldurma
    ctx.save();
    ctx.beginPath();
    ctx.rect(barrelX, barrelY + 2, plungerX - barrelX, barrelH - 4);
    ctx.clip();

    if (cp.state === 'gas') {
        // Gaz (Açık Mavi Eterik Dolgu)
        ctx.fillStyle = "rgba(56, 189, 248, 0.12)";
        ctx.fillRect(barrelX, barrelY, barrelW, barrelH);

        // Uçuşan Gaz Tanecikleri
        ctx.fillStyle = "#38bdf8";
        cp.particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
    } else if (cp.state === 'liquid') {
        // Sıvı (Su Dolgusu)
        ctx.fillStyle = "rgba(2, 132, 199, 0.65)";
        ctx.fillRect(barrelX, barrelY, barrelW, barrelH);

        // Sıvı içi düzenli yakın tanecikler
        ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 13; col++) {
                const px = barrelX + 16 + col * 21;
                const py = barrelY + 16 + row * 20;
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    } else if (cp.state === 'solid') {
        // Katı (Sert Ahşap Blok)
        ctx.fillStyle = "#b45309";
        ctx.fillRect(barrelX, barrelY, barrelW, barrelH);

        // Kristalize Sıkı Kafes Tanecikleri
        ctx.fillStyle = "#fde68a";
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 15; col++) {
                const px = barrelX + 12 + col * 19;
                const py = barrelY + 12 + row * 17;
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    ctx.restore();

    // 2. Şırınga Cam Gövdesi
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 3;
    ctx.strokeRect(barrelX, barrelY, barrelW, barrelH);

    // Nozul Ucu ve Kapalı Tıpa / Parmak
    ctx.fillStyle = "#334155";
    ctx.fillRect(105, 230, 35, 20); // nozul
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(90, 225, 15, 30);  // kırmızı sızdırmaz tıkaç

    // Dereceli Hacim Çizgileri (0 ctx.fillText)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    for (let t = 1; t <= 9; t++) {
        const tx = barrelX + t * 28;
        const tH = (t % 2 === 0) ? 16 : 9;
        ctx.lineWidth = (t % 2 === 0) ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(tx, barrelY);
        ctx.lineTo(tx, barrelY + tH);
        ctx.stroke();
    }

    // 3. Piston ve İtici Kol
    // Siyah Kauçuk Conta Başı
    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(plungerX - 16, barrelY + 4, 20, barrelH - 8, 4);
    ctx.fill();
    ctx.stroke();

    // Piston Mili (150px boyunda, dışarı taşmaz)
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(plungerX + 4, barrelY + barrelH * 0.5 - 9, 150, 18);

    // Başparmak Basma Tablası
    ctx.fillStyle = "#64748b";
    ctx.fillRect(plungerX + 154, barrelY + 10, 14, barrelH - 20);

    // İtme Kuvveti Oku (Maksimum X: ~655px <= 800px Tuval Sınırı)
    if (cp.forcePercent > 0) {
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.moveTo(plungerX + 172, barrelY + barrelH * 0.5);
        ctx.lineTo(plungerX + 205, barrelY + barrelH * 0.5 - 12);
        ctx.lineTo(plungerX + 205, barrelY + barrelH * 0.5 - 5);
        ctx.lineTo(plungerX + 235, barrelY + barrelH * 0.5 - 5);
        ctx.lineTo(plungerX + 235, barrelY + barrelH * 0.5 + 5);
        ctx.lineTo(plungerX + 205, barrelY + barrelH * 0.5 + 5);
        ctx.lineTo(plungerX + 205, barrelY + barrelH * 0.5 + 12);
        ctx.closePath();
        ctx.fill();
    }

    ctx.restore();
}

// ============================================================================
// --- 5.7. DENEY 5.7: SIVILARDA ISI ALIŞVERİŞİ (FB.5.5.3) ---
// ============================================================================

function initHeatExchangeState() {
    const he = labState.heatExchange;
    he.t1 = 70;
    he.t2 = 20;
    he.vol1 = 100;
    he.vol2 = 100;
    he.isMixed = false;
    he.mixProgress = 0.0;
    he.currentTeq = 45.0;
    he.heatFlowParticles = [];
    updateHeatExchangeDOMControls();
    updateHeatExchangePhysics();
}

function resetHeatExchangeExperiment() {
    initHeatExchangeState();
    showLabToast("Sıvılar ayrı kaplara geri alındı!");
}

function updateHeatExchangeDOMControls() {
    //
}

function setupHeatExchangeControlsDOM() {
    const he = labState.heatExchange;

    const setVolumes = (v1, v2) => {
        he.vol1 = v1;
        he.vol2 = v2;
        he.isMixed = false;
        he.mixProgress = 0;
        updateHeatExchangePhysics();
    };

    const btnEq = document.getElementById('btn-57-preset-equal');
    if (btnEq) btnEq.addEventListener('click', () => setVolumes(100, 100));

    const btnHot = document.getElementById('btn-57-preset-hot-more');
    if (btnHot) btnHot.addEventListener('click', () => setVolumes(200, 100));

    const btnCold = document.getElementById('btn-57-preset-cold-more');
    if (btnCold) btnCold.addEventListener('click', () => setVolumes(100, 200));

    const btnMix = document.getElementById('btn-57-mix');
    if (btnMix) {
        btnMix.addEventListener('click', () => {
            he.isMixed = true;
            he.mixProgress = 0.0;
            updateHeatExchangePhysics();
            showLabToast("🧪 Sıvılar karıştırıldı! Isı sıcaktan soğuğa akıyor.");
        });
    }

    const btnReset = document.getElementById('btn-57-reset');
    if (btnReset) btnReset.addEventListener('click', resetHeatExchangeExperiment);

    const sliderT1 = document.getElementById('slider-57-t1');
    if (sliderT1) {
        sliderT1.addEventListener('input', (e) => {
            he.t1 = parseInt(e.target.value, 10);
            he.isMixed = false;
            updateHeatExchangePhysics();
        });
    }

    const sliderT2 = document.getElementById('slider-57-t2');
    if (sliderT2) {
        sliderT2.addEventListener('input', (e) => {
            he.t2 = parseInt(e.target.value, 10);
            he.isMixed = false;
            updateHeatExchangePhysics();
        });
    }

    const btnRecord = document.getElementById('btn-record-data-5-7');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateHeatExchangePhysics() {
    const he = labState.heatExchange;
    const targetTeq = (he.t1 * he.vol1 + he.t2 * he.vol2) / (he.vol1 + he.vol2);

    if (he.isMixed) {
        he.mixProgress = Math.min(1.0, he.mixProgress + 0.03);
        he.currentTeq += (targetTeq - he.currentTeq) * 0.12;

        // Isı akış parçacıkları üret
        if (he.mixProgress < 0.9) {
            he.heatFlowParticles.push({
                x: 230 + Math.random() * 60,
                y: 260,
                vx: 3 + Math.random() * 3,
                vy: (Math.random() - 0.5) * 2,
                life: 1.0
            });
        }
    } else {
        he.currentTeq = targetTeq;
    }

    for (let i = he.heatFlowParticles.length - 1; i >= 0; i--) {
        const p = he.heatFlowParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        if (p.life <= 0) he.heatFlowParticles.splice(i, 1);
    }

    let statusText = "🌡️ Farklı sıcaklıktaki sıvılar karıştırıldığında ısı sıcaktan soğuğa akar";
    if (he.isMixed) {
        statusText = `⚖️ Isı alışverişi tamamlandı! Denge Sıcaklığı: ${he.currentTeq.toFixed(1)}°C`;
    }

    const mbT1 = document.getElementById('mbar-57-t1');
    const mbT2 = document.getElementById('mbar-57-t2');
    const mbTeq = document.getElementById('mbar-57-teq');
    const mbStatus = document.getElementById('mbar-57-status');
    const valT1 = document.getElementById('val-57-t1');
    const valT2 = document.getElementById('val-57-t2');

    if (mbT1) mbT1.textContent = `${he.t1}°C (${he.vol1} ml)`;
    if (mbT2) mbT2.textContent = `${he.t2}°C (${he.vol2} ml)`;
    if (mbTeq) mbTeq.textContent = he.isMixed ? `${he.currentTeq.toFixed(1)}°C` : "Bekliyor";
    if (mbStatus) mbStatus.textContent = statusText;
    if (valT1) valT1.textContent = `${he.t1}°C`;
    if (valT2) valT2.textContent = `${he.t2}°C`;

    const mT1 = document.getElementById('metric-57-t1');
    const mT2 = document.getElementById('metric-57-t2');
    const mTeq = document.getElementById('metric-57-teq');
    if (mT1) mT1.textContent = `${he.t1}°C (${he.vol1} ml)`;
    if (mT2) mT2.textContent = `${he.t2}°C (${he.vol2} ml)`;
    if (mTeq) mTeq.textContent = `${he.currentTeq.toFixed(1)}°C`;
}

function drawHeatExchangeSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "#080e1a");
    bgGrad.addColorStop(1, "#172554");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    // Masa Tablası
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(60, 380, 680, 100);
    ctx.fillStyle = "#334155";
    ctx.fillRect(60, 378, 680, 2);

    const he = labState.heatExchange;

    const drawBeaker = (bx, by, bw, bh, liquidColor, tempVal, isHot) => {
        // Cam Beher
        ctx.fillStyle = liquidColor;
        ctx.fillRect(bx + 3, by + 20, bw - 6, bh - 23);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, [0, 0, 8, 8]);
        ctx.stroke();

        // Termometre
        const tx = bx + bw * 0.5;
        ctx.fillStyle = "#e2e8f0";
        ctx.fillRect(tx - 3, by - 40, 6, bh + 10);

        // Kırmızı cıva sütunu
        const mercH = (tempVal / 100) * (bh - 10);
        ctx.fillStyle = isHot ? "#ef4444" : "#38bdf8";
        ctx.fillRect(tx - 2, by + bh - mercH - 10, 4, mercH);

        // Termometre Haznesi
        ctx.beginPath();
        ctx.arc(tx, by + bh - 5, 6, 0, Math.PI * 2);
        ctx.fill();
    };

    if (!he.isMixed) {
        // Ayrı Kaplar: Sol Sıcak (Kırmızı), Sağ Soğuk (Mavi)
        drawBeaker(180, 220, 110, 160, "rgba(239, 68, 68, 0.65)", he.t1, true);
        drawBeaker(510, 220, 110, 160, "rgba(56, 189, 248, 0.65)", he.t2, false);

        // Sıcak Kaptan Çıkan Buhar Kıvrımları
        ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1.5;
        for (let s = 0; s < 3; s++) {
            const sx = 205 + s * 30;
            ctx.beginPath();
            ctx.moveTo(sx, 210);
            ctx.bezierCurveTo(sx - 8, 180, sx + 8, 160, sx, 130);
            ctx.stroke();
        }
    } else {
        // Karıştırılmış Büyük Kap (Merkez: x=340, y=180, W: 140, H: 200)
        const mx = 330;
        const my = 180;
        const mw = 140;
        const mh = 200;

        // Karışım Rengi: Sıcaklıktan dolayı kırmızı/mavi karışımı ılık kehribar/mor
        const mixColor = "rgba(217, 119, 6, 0.75)";
        drawBeaker(mx, my, mw, mh, mixColor, he.currentTeq, true);

        // Isı Akışı Parçacıkları (Kırmızı ve Mavi Fotonlar)
        he.heatFlowParticles.forEach(p => {
            ctx.fillStyle = "#facc15";
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x + 100, p.y - 40, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        });
    }

    ctx.restore();
}

// ============================================================================
// --- 5.8. DENEY 5.8: SUYUN HÂL DEĞİŞİMİ VE SICAKLIK GRAFİĞİ (FB.5.5.4) ---
// ============================================================================

function initWaterStateState() {
    const ws = labState.waterState;
    ws.isHeating = false;
    ws.speedMultiplier = 1;
    ws.temp = -10.0;
    ws.elapsedMinutes = 0.0;
    ws.phase = "solid";
    ws.history = [{ t: 0, temp: -10.0 }];
    ws.flameParticles = [];
    ws.bubbleParticles = [];
    ws.iceMeltRatio = 0.0;
    updateWaterStateDOMControls();
    updateWaterStatePhysics();
}

function resetWaterStateExperiment() {
    initWaterStateState();
    showLabToast("Hâl değişimi deneyi baştan (-10°C Buz) başlatıldı!");
}

function updateWaterStateDOMControls() {
    const ws = labState.waterState;
    const labelBurner = document.getElementById('label-58-burner');
    const btnBurner = document.getElementById('btn-58-toggle-burner');
    if (labelBurner) labelBurner.textContent = ws.isHeating ? "Ocağı Söndür" : "Ocağı Yak";
    if (btnBurner) btnBurner.classList.toggle('active', ws.isHeating);
}

function setupWaterStateControlsDOM() {
    const ws = labState.waterState;

    const btnBurner = document.getElementById('btn-58-toggle-burner');
    if (btnBurner) {
        btnBurner.addEventListener('click', () => {
            ws.isHeating = !ws.isHeating;
            updateWaterStateDOMControls();
            showLabToast(ws.isHeating ? "🔥 İspirto ocağı yakıldı, ısıtma başladı!" : "Ocak söndürüldü.");
        });
    }

    const btnNorm = document.getElementById('btn-58-speed-normal');
    if (btnNorm) {
        btnNorm.addEventListener('click', () => {
            ws.speedMultiplier = 1;
            btnNorm.classList.add('active');
            const btnFast = document.getElementById('btn-58-speed-fast');
            if (btnFast) btnFast.classList.remove('active');
        });
    }

    const btnFast = document.getElementById('btn-58-speed-fast');
    if (btnFast) {
        btnFast.addEventListener('click', () => {
            ws.speedMultiplier = 3;
            btnFast.classList.add('active');
            if (btnNorm) btnNorm.classList.remove('active');
            showLabToast("⚡ 3x Hızlı zaman akışı devrede!");
        });
    }

    const btnIce = document.getElementById('btn-58-preset-ice');
    if (btnIce) {
        btnIce.addEventListener('click', () => {
            ws.temp = -10.0;
            ws.phase = "solid";
            ws.iceMeltRatio = 0.0;
            ws.elapsedMinutes = 0.0;
            ws.history = [{ t: 0, temp: -10.0 }];
            ws.isHeating = false;
            updateWaterStatePhysics();
            showLabToast("🧊 -10°C Katı Buz başlangıç durumuna getirildi.");
        });
    }

    const btnWater = document.getElementById('btn-58-preset-water');
    if (btnWater) {
        btnWater.addEventListener('click', () => {
            ws.temp = 20.0;
            ws.phase = "liquid";
            ws.iceMeltRatio = 1.0;
            ws.elapsedMinutes = 0.0;
            ws.history = [{ t: 0, temp: 20.0 }];
            ws.isHeating = false;
            updateWaterStatePhysics();
            showLabToast("💧 20°C Sıvı Su başlangıç durumuna getirildi.");
        });
    }

    const btnReset = document.getElementById('btn-58-reset');
    if (btnReset) btnReset.addEventListener('click', resetWaterStateExperiment);

    const btnRecord = document.getElementById('btn-record-data-5-8');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateWaterStatePhysics() {
    const ws = labState.waterState;

    if (ws.isHeating && ws.temp < 105) {
        ws.elapsedMinutes += 0.03 * ws.speedMultiplier;

        // Isınma ve Hâl Değişim Eğrisi
        if (ws.temp < 0.0) {
            // Buz ısınıyor (-10°C -> 0°C)
            ws.temp += 0.45 * ws.speedMultiplier;
            ws.phase = "solid";
            if (ws.temp >= 0) ws.temp = 0.0;
        } else if (ws.temp === 0.0 && ws.iceMeltRatio < 1.0) {
            // ERİME PLATOSU: Sıcaklık 0°C'de SABİT kalır!
            ws.phase = "melting";
            ws.iceMeltRatio += 0.015 * ws.speedMultiplier;
            if (ws.iceMeltRatio >= 1.0) {
                ws.temp = 0.5; // Erime bitti, sıvı ısınmaya başlar
            }
        } else if (ws.temp >= 0.0 && ws.temp < 100.0) {
            // Sıvı Su ısınıyor (0°C -> 100°C)
            ws.temp += 0.65 * ws.speedMultiplier;
            ws.phase = "liquid";
            if (ws.temp >= 100.0) ws.temp = 100.0;
        } else if (ws.temp >= 100.0) {
            // KAYNAMA PLATOSU: Sıcaklık 100°C'de SABİT kalır!
            ws.phase = "boiling";
            ws.temp = 100.0;

            // Kabarcıklar üret
            ws.bubbleParticles.push({
                x: 160 + Math.random() * 80,
                y: 330,
                vy: -2 - Math.random() * 2,
                r: 2 + Math.random() * 3,
                life: 1.0
            });
        }

        // Grafik noktası ekle
        if (ws.history.length === 0 || ws.elapsedMinutes - ws.history[ws.history.length - 1].t >= 0.25) {
            ws.history.push({ t: ws.elapsedMinutes, temp: ws.temp });
        }

        // Alev parçacıkları
        for (let i = 0; i < 2; i++) {
            ws.flameParticles.push({
                x: 195 + (Math.random() - 0.5) * 16,
                y: 375,
                vx: (Math.random() - 0.5) * 1.5,
                vy: -2.5 - Math.random() * 2,
                life: 1.0
            });
        }
    }

    // Parçacıkları temizle
    for (let i = ws.flameParticles.length - 1; i >= 0; i--) {
        const p = ws.flameParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.08;
        if (p.life <= 0) ws.flameParticles.splice(i, 1);
    }

    for (let i = ws.bubbleParticles.length - 1; i >= 0; i--) {
        const b = ws.bubbleParticles[i];
        b.y += b.vy;
        b.life -= 0.05;
        if (b.life <= 0 || b.y <= 270) ws.bubbleParticles.splice(i, 1);
    }

    if (!ws.isHeating) {
        if (ws.temp < 0) ws.phase = "solid";
        else if (ws.temp === 0 && ws.iceMeltRatio < 1.0) ws.phase = "melting";
        else if (ws.temp >= 100) ws.phase = "boiling";
        else ws.phase = "liquid";
    }

    const phaseNames = {
        solid: "Katı (Buz)",
        melting: "Erime Hâli (Buz + Su)",
        liquid: "Sıvı (Su)",
        boiling: "Kaynama Hâli (Su + Buhar)"
    };

    let statusText = "🧊 Saf maddeler hâl değiştirirken (erirken/kaynarken) sıcaklıkları sabit kalır";
    if (ws.phase === "melting") statusText = "🧊 0°C Erime Platosu: Buz erirken sıcaklık SABİT kalır";
    else if (ws.phase === "boiling") statusText = "♨️ 100°C Kaynama Platosu: Su kaynarken sıcaklık SABİT kalır";

    const mbTemp = document.getElementById('mbar-58-temp');
    const mbPhase = document.getElementById('mbar-58-phase');
    const mbTime = document.getElementById('mbar-58-time');
    const mbStatus = document.getElementById('mbar-58-status');

    if (mbTemp) mbTemp.textContent = `${ws.temp.toFixed(1)}°C`;
    if (mbPhase) mbPhase.textContent = phaseNames[ws.phase];
    if (mbTime) mbTime.textContent = `${ws.elapsedMinutes.toFixed(1)} dk`;
    if (mbStatus) mbStatus.textContent = statusText;

    const mTemp = document.getElementById('metric-58-temp');
    const mState = document.getElementById('metric-58-state');
    const mTime = document.getElementById('metric-58-time');
    if (mTemp) mTemp.textContent = `${ws.temp.toFixed(1)}°C`;
    if (mState) mState.textContent = phaseNames[ws.phase];
    if (mTime) mTime.textContent = `${ws.elapsedMinutes.toFixed(1)} dk`;

    // Dinamik Pedagojik Çıkarım Kartı
    const pTitle = document.getElementById('waterstate-pedagogical-title');
    const pText = document.getElementById('waterstate-pedagogical-text');
    const pIcon = document.getElementById('waterstate-pedagogical-icon');
    if (pTitle && pText) {
        if (ws.phase === "solid") {
            pTitle.textContent = "🧊 Katı Hâli (-10°C -> 0°C Buz Isınıyor)";
            pText.textContent = "Buz ısıtıldıkça sıcaklığı yükselir. Taneciklerin titreşim enerjisi artar ve erime noktası olan 0°C'ye ulaşır.";
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-snowflake" style="color: #38bdf8;"></i>';
        } else if (ws.phase === "melting") {
            pTitle.textContent = "🧊 Erime Hâli (0°C Sabit Sıcaklık Platosu)";
            pText.textContent = "Saf maddeler erirken sıcaklıkları sabit kalır. Alınan ısı enerjisi sıcaklığı artırmak yerine buz tanecikleri arasındaki bağları zayıflatmak için kullanılır.";
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-icicles" style="color: #06b6d4;"></i>';
        } else if (ws.phase === "liquid") {
            pTitle.textContent = `💧 Sıvı Hâli (${ws.temp.toFixed(1)}°C Su Isınıyor)`;
            pText.textContent = "Buzun tamamı eridikten sonra suyun sıcaklığı 0°C'den 100°C kaynama noktasına doğru hızla yükselir.";
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-tint" style="color: #3b82f6;"></i>';
        } else if (ws.phase === "boiling") {
            pTitle.textContent = "♨️ Kaynama Hâli (100°C Sabit Sıcaklık Platosu)";
            pText.textContent = "Su 100°C'ye ulaştığında kaynamaya başlar ve hâl değişimi boyunca sıcaklık 100°C'de sabit kalır. Sıvı hızla buharlaşır.";
            if (pIcon) pIcon.innerHTML = '<i class="fas fa-fire" style="color: #f97316;"></i>';
        }
    }
}

function drawWaterStateSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 500);
    bgGrad.addColorStop(0, "#080e1a");
    bgGrad.addColorStop(1, "#172554");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    const ws = labState.waterState;

    // --- SOL: İSPİRTO OCAĞI VE BEHERGLAS (x: 100 -> 320) ---
    // Masa Tablası
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(60, 420, 280, 60);

    // İspirto Ocağı
    ctx.fillStyle = "#d97706";
    ctx.fillRect(170, 400, 60, 20); // ocak gövdesi
    ctx.fillStyle = "#78350f";
    ctx.fillRect(193, 385, 14, 15); // fitil yuvası

    // Sacayak (Tripod)
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(135, 420); ctx.lineTo(150, 350);
    ctx.moveTo(265, 420); ctx.lineTo(250, 350);
    ctx.stroke();

    // Seramik Tel Kafes
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(145, 348, 110, 4);

    // Alev Parçacıkları
    if (ws.isHeating) {
        ws.flameParticles.forEach(p => {
            ctx.fillStyle = "#facc15";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Beherglas (x: 155, y: 240, W: 90, H: 108)
    const bx = 155;
    const by = 240;
    const bw = 90;
    const bh = 108;

    // Beher İçi Sıvı/Buz
    if (ws.temp < 0 || ws.phase === "melting") {
        // Buz Parçaları (Fasetli Kristaller)
        ctx.fillStyle = "rgba(224, 242, 254, 0.75)";
        ctx.beginPath();
        ctx.roundRect(bx + 15, by + 50, 26, 26, 4);
        ctx.roundRect(bx + 45, by + 60, 24, 24, 4);
        ctx.roundRect(bx + 30, by + 30, 22, 22, 4);
        ctx.fill();
    }

    if (ws.temp >= 0) {
        // Sıvı Su Tabakası
        const waterH = Math.min(bh - 14, 40 + (ws.temp / 100) * 35);
        ctx.fillStyle = "rgba(56, 189, 248, 0.55)";
        ctx.fillRect(bx + 3, by + bh - waterH, bw - 6, waterH);

        // Kaynama Kabarcıkları
        ws.bubbleParticles.forEach(b => {
            ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Cam Duvarlar
    ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, [0, 0, 8, 8]);
    ctx.stroke();

    // Termometre
    ctx.fillStyle = "#e2e8f0";
    ctx.fillRect(bx + 40, by - 40, 6, bh + 15);
    const mercH = Math.max(8, ((ws.temp + 20) / 140) * (bh + 5));
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(bx + 41, by + bh - mercH - 10, 4, mercH);

    // --- SAĞ: SICAKLIK-ZAMAN GRAFİĞİ (x: 420 -> 760, y: 80 -> 420) ---
    const gx = 420;
    const gy = 80;
    const gw = 340;
    const gh = 320;

    // Grafik Zemin Izgarası
    ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
    ctx.fillRect(gx, gy, gw, gh);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(gx, gy, gw, gh);

    // Yatay Kılavuz Çizgileri:
    // T = 100°C (y = gy + 45)
    // T = 0°C (y = gy + 225)
    const y100 = gy + 45;
    const y0 = gy + 225;

    ctx.strokeStyle = "rgba(239, 68, 68, 0.35)"; // 100°C çizgisi
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(gx, y100); ctx.lineTo(gx + gw, y100);
    ctx.stroke();

    ctx.strokeStyle = "rgba(56, 189, 248, 0.35)"; // 0°C çizgisi
    ctx.beginPath();
    ctx.moveTo(gx, y0); ctx.lineTo(gx + gw, y0);
    ctx.stroke();
    ctx.setLineDash([]);

    // Grafik Eğrisi Çizimi (Neon Çizgi - Sınır Taşma Korumalı)
    if (ws.history.length > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(gx, gy, gw, gh);
        ctx.clip();

        ctx.strokeStyle = "#facc15";
        ctx.lineWidth = 3;
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 8;
        ctx.beginPath();

        ws.history.forEach((pt, idx) => {
            // t: 0 -> 12 dk (gx -> gx + gw)
            // temp: -20°C -> 120°C (gy + gh -> gy)
            const px = Math.min(gx + gw, Math.max(gx, gx + (pt.t / 12) * gw));
            const py = Math.min(gy + gh, Math.max(gy, y0 - (pt.temp / 100) * (y0 - y100)));
            if (idx === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.restore();
    }

    ctx.restore();
}

// ============================================================================
// --- 5.10. DENEY 5.10: BASİT DEVREDE AMPUL PARLAKLIĞI (FB.5.6.3) ---
// ============================================================================

function initCircuitState() {
    const cc = labState.circuit;
    cc.switchClosed = false;
    cc.batteryCount = 1;
    cc.bulbCount = 1;
    cc.brightnessLevel = "normal";
    cc.electronProgress = 0.0;
    updateCircuitDOMControls();
    updateCircuitPhysics();
}

function resetCircuitExperiment() {
    initCircuitState();
    showLabToast("Elektrik devresi başlangıç durumuna (1 Pil, 1 Ampul) sıfırlandı!");
}

function updateCircuitDOMControls() {
    const cc = labState.circuit;
    const labelSwitch = document.getElementById('label-510-switch');
    const btnSwitch = document.getElementById('btn-510-toggle-switch');
    if (labelSwitch) labelSwitch.textContent = cc.switchClosed ? "Anahtarı Aç" : "Anahtarı Kapat";
    if (btnSwitch) btnSwitch.classList.toggle('active', cc.switchClosed);
}

function setupCircuitControlsDOM() {
    const cc = labState.circuit;

    const btnSwitch = document.getElementById('btn-510-toggle-switch');
    if (btnSwitch) {
        btnSwitch.addEventListener('click', () => {
            cc.switchClosed = !cc.switchClosed;
            updateCircuitDOMControls();
            updateCircuitPhysics();
            showLabToast(cc.switchClosed ? "⚡ Anahtar kapatıldı; devreden akım geçiyor!" : "Anahtar açıldı; devre kesildi.");
        });
    }

    const btnBatPlus = document.getElementById('btn-510-batt-plus');
    if (btnBatPlus) {
        btnBatPlus.addEventListener('click', () => {
            if (cc.batteryCount < 3) {
                cc.batteryCount++;
                updateCircuitPhysics();
                showLabToast(`Pil sayısı artırıldı: ${cc.batteryCount} Pil (Parlaklık artar)`);
            }
        });
    }

    const btnBatMinus = document.getElementById('btn-510-batt-minus');
    if (btnBatMinus) {
        btnBatMinus.addEventListener('click', () => {
            if (cc.batteryCount > 1) {
                cc.batteryCount--;
                updateCircuitPhysics();
                showLabToast(`Pil sayısı azaltıldı: ${cc.batteryCount} Pil`);
            }
        });
    }

    const btnBulbPlus = document.getElementById('btn-510-bulb-plus');
    if (btnBulbPlus) {
        btnBulbPlus.addEventListener('click', () => {
            if (cc.bulbCount < 3) {
                cc.bulbCount++;
                updateCircuitPhysics();
                showLabToast(`Ampul sayısı artırıldı: ${cc.bulbCount} Ampul (Parlaklık azalır)`);
            }
        });
    }

    const btnBulbMinus = document.getElementById('btn-510-bulb-minus');
    if (btnBulbMinus) {
        btnBulbMinus.addEventListener('click', () => {
            if (cc.bulbCount > 1) {
                cc.bulbCount--;
                updateCircuitPhysics();
                showLabToast(`Ampul sayısı azaltıldı: ${cc.bulbCount} Ampul`);
            }
        });
    }

    const btnReset = document.getElementById('btn-510-reset');
    if (btnReset) btnReset.addEventListener('click', resetCircuitExperiment);

    const btnRecord = document.getElementById('btn-record-data-5-10');
    if (btnRecord) btnRecord.addEventListener('click', recordMeasurement);
}

function updateCircuitPhysics() {
    const cc = labState.circuit;

    // Parlaklık Oranı = Pil Sayısı / Ampul Sayısı
    const ratio = cc.switchClosed ? (cc.batteryCount / cc.bulbCount) : 0;

    let bLevel = "Sönük (Işık Yok)";
    if (cc.switchClosed) {
        if (ratio >= 2.5) bLevel = "Aşırı Parlak 💡💡💡";
        else if (ratio >= 1.5) bLevel = "Çok Parlak 💡💡";
        else if (ratio >= 0.9) bLevel = "Normal Parlak 💡";
        else bLevel = "Sönük Işık 🕯️";
    }

    cc.brightnessLevel = bLevel;

    if (cc.switchClosed) {
        cc.electronProgress = (cc.electronProgress + 0.04 * ratio) % 1.0;
    }

    let statusText = "⚡ Pil sayısı arttıkça parlaklık artar; ampul sayısı arttıkça parlaklık azalır";
    if (cc.switchClosed) {
        statusText = `💡 Devre kapalı: ${cc.batteryCount} Pil, ${cc.bulbCount} Ampul ile parlaklık: ${bLevel}`;
    }

    const mbSwitch = document.getElementById('mbar-510-switch');
    const mbBatts = document.getElementById('mbar-510-batteries');
    const mbBulbs = document.getElementById('mbar-510-bulbs');
    const mbBright = document.getElementById('mbar-510-brightness');
    const mbStatus = document.getElementById('mbar-510-status');

    if (mbSwitch) mbSwitch.textContent = cc.switchClosed ? "Kapalı (Akım Var)" : "Açık (Akım Yok)";
    if (mbBatts) mbBatts.textContent = `${cc.batteryCount} Adet`;
    if (mbBulbs) mbBulbs.textContent = `${cc.bulbCount} Adet`;
    if (mbBright) mbBright.textContent = bLevel;
    if (mbStatus) mbStatus.textContent = statusText;

    const mBatt = document.getElementById('metric-510-batt');
    const mBulbs = document.getElementById('metric-510-bulbs');
    const mGlow = document.getElementById('metric-510-glow');
    if (mBatt) mBatt.textContent = `${cc.batteryCount} Adet`;
    if (mBulbs) mBulbs.textContent = `${cc.bulbCount} Adet`;
    if (mGlow) mGlow.textContent = bLevel;
}

function drawCircuitSimulation() {
    const w = canvas.width;
    const h = canvas.height;
    const scale = w / 800;

    ctx.save();
    ctx.scale(scale, scale);

    // Arka Plan (Laboratuvar Devre Tahtası)
    const bgGrad = ctx.createLinearGradient(0, 0, 800, 500);
    bgGrad.addColorStop(0, "#0f172a");
    bgGrad.addColorStop(1, "#1e293b");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 500);

    const cc = labState.circuit;

    // Dikdörtgen Devre Döngüsü:
    // Sol Üst: (160, 120) -> Sağ Üst: (640, 120)
    // Sağ Alt: (640, 380) -> Sol Alt: (160, 380)
    ctx.strokeStyle = "#f59e0b"; // Bakır İletken Tel
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(160, 120);
    ctx.lineTo(640, 120);
    ctx.lineTo(640, 380);
    ctx.lineTo(160, 380);
    ctx.closePath();
    ctx.stroke();

    // 1. ÜST RAY: PİLLER (x: 320 -> 480)
    const batW = 55;
    const batH = 28;
    const startBatX = 400 - (cc.batteryCount * batW) * 0.5;

    for (let b = 0; b < cc.batteryCount; b++) {
        const bx = startBatX + b * (batW + 4);

        // Pil Gövdesi (Mavi/Altın Ceket)
        const bGrad = ctx.createLinearGradient(bx, 106, bx, 134);
        bGrad.addColorStop(0, "#1d4ed8");
        bGrad.addColorStop(0.5, "#3b82f6");
        bGrad.addColorStop(1, "#1e40af");
        ctx.fillStyle = bGrad;
        ctx.fillRect(bx, 106, batW, batH);

        // Pozitif Başlık (Artı Kutup Çıkıntısı)
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(bx + batW, 114, 6, 12);

        // Negatif Uç
        ctx.fillStyle = "#64748b";
        ctx.fillRect(bx - 3, 110, 3, 20);
    }

    // 2. SOL RAY: BIÇAKLI ŞALTER ANAHTAR (x: 160, y: 230 -> 270)
    ctx.fillStyle = "#78350f";
    ctx.fillRect(150, 220, 20, 60); // taban

    ctx.fillStyle = "#facc15";
    ctx.beginPath();
    ctx.arc(160, 230, 5, 0, Math.PI * 2); // menteşe
    ctx.arc(160, 270, 5, 0, Math.PI * 2); // kontak
    ctx.fill();

    // Bıçak Kolu
    ctx.strokeStyle = "#fbbf24";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(160, 230);
    if (cc.switchClosed) {
        ctx.lineTo(160, 270); // kapalı
    } else {
        ctx.lineTo(185, 245); // açık (35 derece havada)
    }
    ctx.stroke();

    // 3. ALT RAY: AMPULLER (y: 380)
    const startBulbX = 400 - (cc.bulbCount * 90) * 0.5 + 45;
    const ratio = cc.switchClosed ? (cc.batteryCount / cc.bulbCount) : 0;

    for (let i = 0; i < cc.bulbCount; i++) {
        const lx = startBulbX + i * 90;
        const ly = 380;

        // Duy Tabanı
        ctx.fillStyle = "#64748b";
        ctx.fillRect(lx - 14, ly - 8, 28, 16);

        // Ampul Cam Fanusu (Yarıçap 20)
        ctx.save();
        if (cc.switchClosed && ratio > 0) {
            // Işık Halesi (Glow Halo)
            const glowR = 25 + ratio * 20;
            const glowGrad = ctx.createRadialGradient(lx, ly - 28, 4, lx, ly - 28, glowR);
            glowGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
            glowGrad.addColorStop(0.3, "rgba(250, 204, 21, 0.75)");
            glowGrad.addColorStop(1, "rgba(250, 204, 21, 0.0)");
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(lx, ly - 28, glowR, 0, Math.PI * 2);
            ctx.fill();
        }

        // Cam Küre
        ctx.fillStyle = cc.switchClosed ? "rgba(254, 240, 138, 0.65)" : "rgba(255, 255, 255, 0.2)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(lx, ly - 28, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Akkor Flaman Teli
        ctx.strokeStyle = cc.switchClosed ? "#ffffff" : "#94a3b8";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(lx - 6, ly - 18);
        ctx.lineTo(lx, ly - 32);
        ctx.lineTo(lx + 6, ly - 18);
        ctx.stroke();

        ctx.restore();
    }

    // 4. Elektron Akış Noktaları (Sarı Fotonlar)
    if (cc.switchClosed) {
        ctx.fillStyle = "#facc15";
        const perimeter = (640 - 160) * 2 + (380 - 120) * 2; // 480*2 + 260*2 = 1480 px

        for (let e = 0; e < 18; e++) {
            const pos = ((cc.electronProgress + e / 18) % 1.0) * perimeter;
            let ex = 160, ey = 120;

            if (pos < 480) {
                ex = 160 + pos; ey = 120; // üst
            } else if (pos < 480 + 260) {
                ex = 640; ey = 120 + (pos - 480); // sağ
            } else if (pos < 480 + 260 + 480) {
                ex = 640 - (pos - 740); ey = 380; // alt
            } else {
                ex = 160; ey = 380 - (pos - 1220); // sol
            }

            ctx.beginPath();
            ctx.arc(ex, ey, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}

function updateTableHeader(expId) {
    const thead = document.getElementById('lab-table-thead');
    if (!thead) return;

    if (expId === "5.1") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Görünen Evre</th>
                <th>Yörünge Açısı</th>
                <th>Aydınlık Oranı</th>
                <th>Dünya'dan Görünüm</th>
                <th>Döngü Zamanı</th>
            </tr>
        `;
    } else if (expId === "5.2") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Yay Kalınlığı</th>
                <th>Asılan Ağırlık / Kuvvet</th>
                <th>Uzama Miktarı (cm)</th>
                <th>Ölçek Bölme Sayısı</th>
                <th>Fiziksel Çıkarım</th>
            </tr>
        `;
    } else if (expId === "5.3") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Zemin Türü</th>
                <th>Sürtünme Seviyesi</th>
                <th>Rampa Yüksekliği</th>
                <th>Durma Mesafesi (m)</th>
                <th>Sürtünme Çıkarımı</th>
            </tr>
        `;
    } else if (expId === "5.4") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Deney Düzeneği</th>
                <th>Doğrultu Hizası</th>
                <th>Işık İletimi</th>
                <th>Gözlemci Görüntüsü</th>
                <th>Bilimsel Yasa</th>
            </tr>
        `;
    } else if (expId === "5.5") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Fener-Cisim (cm)</th>
                <th>Cisim-Perde (cm)</th>
                <th>Tam Gölge Çapı</th>
                <th>Gölge Boyutu</th>
                <th>Pedagojik Çıkarım</th>
            </tr>
        `;
    } else if (expId === "5.6") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Şırıngadaki Madde</th>
                <th>Maddenin Hâli</th>
                <th>Tanecik Boşluğu</th>
                <th>Uygulanan Kuvvet</th>
                <th>Sıkıştırılabilirlik</th>
            </tr>
        `;
    } else if (expId === "5.7") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>1. Sıvı (Sıcak)</th>
                <th>2. Sıvı (Soğuk)</th>
                <th>Sıvı Miktarları</th>
                <th>Denge Sıcaklığı</th>
                <th>Isı Akış Yönü</th>
            </tr>
        `;
    } else if (expId === "5.8") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Geçen Süre (dk)</th>
                <th>Ölçülen Sıcaklık</th>
                <th>Maddenin Hâli</th>
                <th>Hâl Değişim Durumu</th>
                <th>Termal Çıkarım</th>
            </tr>
        `;
    } else if (expId === "5.9") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Deney Modu</th>
                <th>Bakır Durumu</th>
                <th>Alüminyum Durumu</th>
                <th>Demir Durumu</th>
                <th>İletkenlik Sıralaması</th>
            </tr>
        `;
    } else if (expId === "5.10") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Pil Sayısı</th>
                <th>Ampul Sayısı</th>
                <th>Anahtar Durumu</th>
                <th>Parlaklık Seviyesi</th>
                <th>Değişken Hipotezi</th>
            </tr>
        `;
    } else if (expId === "6.1") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Tutulma Türü</th>
                <th>Gezegen Sıralaması</th>
                <th>Ay Evresi</th>
                <th>Gözlem Zamanı / Bölgesi</th>
                <th>Gölge Tipi & Görsel Efekt</th>
            </tr>
        `;
    } else if (expId === "6.2") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>F_batı (Batı)</th>
                <th>F_doğu (Doğu)</th>
                <th>Bileşke Kuvvet (R)</th>
                <th>Kuvvet Durumu</th>
                <th>Cismin Hareketi</th>
            </tr>
        `;
    } else if (expId === "6.3") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Pist Uzunluğu</th>
                <th>Geçen Süre (t)</th>
                <th>Alınan Yol (x)</th>
                <th>Sabit Sürat (v)</th>
                <th>Hareket Durumu</th>
            </tr>
        `;
    } else if (expId === "6.4") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Ayna Türü</th>
                <th>Gelme Açısı (i)</th>
                <th>Yansıma Açısı (r)</th>
                <th>Yansıma Türü</th>
                <th>Görüntü Özellikleri</th>
            </tr>
        `;
    } else if (expId === "6.5") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Eklenen Sıvılar</th>
                <th>Kule Katmanları</th>
                <th>En Yoğun (Dip)</th>
                <th>En Az Yoğun (Üst)</th>
                <th>Bırakılan Cisimler</th>
            </tr>
        `;
    } else if (expId === "6.6") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Deney Kabı</th>
                <th>Nem / Su Durumu</th>
                <th>Sıcaklık (°C)</th>
                <th>Işık Durumu</th>
                <th>Çimlenme Sonucu</th>
            </tr>
        `;
    } else if (expId === "6.7") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Işık Gücü</th>
                <th>Siyah Kap (°C)</th>
                <th>Mavi Kap (°C)</th>
                <th>Beyaz Kap (°C)</th>
                <th>Radyometre Hızı & Çıkarım</th>
            </tr>
        `;
    } else if (expId === "6.8") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Deney Aşaması</th>
                <th>Küre Sıcaklığı</th>
                <th>Küre Hacmi</th>
                <th>Halkadan Geçiş Durumu</th>
                <th>Fiziksel Nitel Çıkarım</th>
            </tr>
        `;
    } else if (expId === "6.9") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Test Maddesi</th>
                <th>Fiziksel Hali / Türü</th>
                <th>İletkenlik Durumu</th>
                <th>Ampul Parlaklığı</th>
                <th>Yük Taşıyıcı / Nitel Açıklama</th>
            </tr>
        `;
    } else if (expId === "6.10") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Deney Modu</th>
                <th>Tel Uzunluğu (L)</th>
                <th>Kesit Alanı (S) & Cinsi</th>
                <th>Devre Direnci Seviyesi</th>
                <th>Ampul Parlaklığı & Çıkarım</th>
            </tr>
        `;
    } else if (expId === "7.1") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Senaryo</th>
                <th>Kuvvet (F)</th>
                <th>Yer Değiştirme (Δx)</th>
                <th>Doğrultu Uyumu</th>
                <th>Yapılan İş (W)</th>
            </tr>
        `;
    } else if (expId === "7.2") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Deney Modu</th>
                <th>Cisim Kütlesi (m)</th>
                <th>Yükseklik & Sürat</th>
                <th>Enerji Dağılımı (Ek / Ep)</th>
                <th>Toplam Mekanik / Isı</th>
            </tr>
        `;
    } else if (expId === "7.3") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Ortamlar</th>
                <th>Gelme (i)</th>
                <th>Kırılma (r)</th>
                <th>Sürat Değişimi</th>
                <th>Işının Durumu</th>
            </tr>
        `;
    } else if (expId === "7.4") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Mercek Türü</th>
                <th>Deney Modu</th>
                <th>Cisim (do)</th>
                <th>Odak (f)</th>
                <th>Görüntü (di) / Özellikleri</th>
            </tr>
        `;
    } else if (expId === "7.5") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Yöntem</th>
                <th>Karışım Türü</th>
                <th>Fiziksel Özellik Farkı</th>
                <th>Ayrılan Bileşenler</th>
                <th>Sonuç / Verim</th>
            </tr>
        `;
    } else if (expId === "7.6") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Beher No</th>
                <th>Sıcaklık (°C)</th>
                <th>Şeker Türü</th>
                <th>Karıştırma</th>
                <th>Çözünme Süresi (t)</th>
            </tr>
        `;
    } else if (expId === "7.7") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Deney Modu</th>
                <th>Kullanılan Cisimler</th>
                <th>Başlangıç Yükleri</th>
                <th>Elektron Akış Yönü</th>
                <th>Son Yük Durumları</th>
            </tr>
        `;
    } else if (expId === "7.8") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>İşlem Türü</th>
                <th>Kullanılan Cisim</th>
                <th>Topuz Yükü</th>
                <th>Yapraklar Yükü</th>
                <th>Yaprak Açısı (α) & Durumu</th>
            </tr>
        `;
    } else if (expId === "7.9") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Trofik Basamak</th>
                <th>Canlı Örnekleri</th>
                <th>Mevcut Enerji (J)</th>
                <th>Isı Kaybı (%90)</th>
                <th>Biyolojik Birikim (Zehir)</th>
            </tr>
        `;
    } else if (expId === "7.10") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>İncelenen Mod / Sistem</th>
                <th>Seçilen Değişken / Ürün</th>
                <th>Tüketim / İletim (L)</th>
                <th>Tasarruf / Verim Oranı</th>
                <th>Su Ayak İzi / Çıkarım</th>
            </tr>
        `;
    }
}

function recordMeasurement() {
    const expId = labState.activeExperimentId;
    const fmt = (n, dec = 1) => (typeof n === 'number' && !isNaN(n)) ? n.toFixed(dec) : '—';

    if (expId === "5.1") {
        const mp = labState.moonPhases;
        const row = {
            id: mp.measurements.length + 1,
            col1: mp.phaseName,
            col2: `${Math.round(mp.angle)}°`,
            col3: `%${mp.illuminationPercent}`,
            col4: mp.phaseName.includes("Dördün") ? "Yarım Daire" : (mp.phaseName === "Dolunay" ? "Tam Daire" : (mp.phaseName === "Yeni Ay" ? "Karanlık (Görülmez)" : (mp.phaseName.includes("Hilal") ? "Hilal (İnce Yay)" : "Şişkin Daire"))),
            col5: `~${Math.round((mp.angle / 360) * 29.5)} Gün`
        };
        mp.measurements.push(row);
        showLabToast(`Ay Evresi Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "5.2") {
        const dm = labState.dynamometer;
        const typeLabels = { thin: "İnce Yay", medium: "Orta Yay", thick: "Kalın Yay" };
        const row = {
            id: dm.measurements.length + 1,
            col1: typeLabels[dm.springType],
            col2: `${dm.force} N (${dm.weightsCount} Ağırlık)`,
            col3: `${dm.currentStretch.toFixed(1)} cm`,
            col4: `${dm.divisionCount} Bölme`,
            col5: "Kuvvet ile uzama doğru orantılıdır"
        };
        dm.measurements.push(row);
        showLabToast(`Dinamometre Ölçümü #${row.id} deftere kaydedildi!`);
    } else if (expId === "5.3") {
        const fr = labState.friction;
        const surfNames = { ice: "Buz Pisti", wood: "Cilalı Tahta", sand: "Zımpara Kağıdı", carpet: "Halı Zemin" };
        const fLevels = { ice: "Çok Düşük", wood: "Düşük", sand: "Yüksek", carpet: "Çok Yüksek" };
        const row = {
            id: fr.measurements.length + 1,
            col1: surfNames[fr.surface],
            col2: fLevels[fr.surface],
            col3: `${fr.rampHeight} Takoz`,
            col4: `${fr.distanceTraveled.toFixed(1)} m`,
            col5: fr.distanceTraveled > 6 ? "Kaygan yüzeyde az sürtünme, çok yol" : "Pürüzlü yüzeyde çok sürtünme, az yol"
        };
        fr.measurements.push(row);
        showLabToast(`Sürtünme Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "5.4") {
        const lr = labState.lightRect;
        const row = {
            id: lr.measurements.length + 1,
            col1: lr.mode === "cards" ? "Delikli Kartonlar" : "Hortum / Boru",
            col2: lr.mode === "cards" ? (lr.cardsAligned ? "Hizalı" : "Hizasız") : (lr.hoseCurved ? "Kıvrık" : "Düz"),
            col3: lr.beamReachesEnd ? "Işık Geçiyor" : "Işık Engellendi",
            col4: lr.beamReachesEnd ? "Parlak Işık Noktası" : "Karanlık (Görülmez)",
            col5: "Işık her yönde doğrusal yayılır"
        };
        lr.measurements.push(row);
        showLabToast(`Işık Yayılma Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "5.5") {
        const sh = labState.shadow;
        const row = {
            id: sh.measurements.length + 1,
            col1: `${sh.sourceDist} cm`,
            col2: `${sh.screenDist} cm`,
            col3: `${sh.shadowDiameter} cm`,
            col4: sh.shadowDiameter > 16 ? "Büyük Boy Gölge" : "Küçük Boy Gölge",
            col5: "Cisim ışığa yaklaştıkça gölge büyür"
        };
        sh.measurements.push(row);
        showLabToast(`Tam Gölge Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "5.6") {
        const cp = labState.compressibility;
        const names = { gas: "Hava", liquid: "Su", solid: "Tahta" };
        const states = { gas: "Gaz", liquid: "Sıvı", solid: "Katı" };
        const row = {
            id: cp.measurements.length + 1,
            col1: names[cp.state],
            col2: states[cp.state],
            col3: cp.state === "gas" ? "Geniş Boşluk" : "Çok Az / Bitişik",
            col4: `%${cp.forcePercent} Kuvvet`,
            col5: cp.state === "gas" ? "Kolayca Sıkışır" : "Sıkıştırılamaz"
        };
        cp.measurements.push(row);
        showLabToast(`Sıkıştırılabilirlik Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "5.7") {
        const he = labState.heatExchange;
        const row = {
            id: he.measurements.length + 1,
            col1: `${he.t1}°C (${he.vol1} ml)`,
            col2: `${he.t2}°C (${he.vol2} ml)`,
            col3: `${he.vol1 + he.vol2} ml Karışım`,
            col4: `${he.currentTeq.toFixed(1)}°C`,
            col5: "Isı sıcaktan soğuğa akar"
        };
        he.measurements.push(row);
        showLabToast(`Isı Alışverişi Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "5.8") {
        const ws = labState.waterState;
        const phaseNames = { solid: "Buz (Katı)", melting: "Erime (0°C Plato)", liquid: "Su (Sıvı)", boiling: "Kaynama (100°C Plato)" };
        const row = {
            id: ws.measurements.length + 1,
            col1: `${ws.elapsedMinutes.toFixed(1)} dk`,
            col2: `${ws.temp.toFixed(1)}°C`,
            col3: phaseNames[ws.phase],
            col4: (ws.temp === 0 || ws.temp === 100) ? "Sıcaklık SABİT (Hâl Değişimi)" : "Sıcaklık Artıyor",
            col5: "Saf maddeler hâl değiştirirken sıcaklıkları sabit kalır"
        };
        ws.measurements.push(row);
        showLabToast(`Hâl Değişimi Ölçümü #${row.id} deftere kaydedildi!`);
    } else if (expId === "5.9") {
        const ht = labState.heatTransfer;
        const row = {
            id: ht.measurements.length + 1,
            col1: ht.mode === "metals" ? "Metallerde İletim" : "Binalarda Yalıtım",
            col2: ht.rods[0].ballDropped ? `Bakır Düştü (${ht.rods[0].dropTime.toFixed(1)}s)` : `${ht.rods[0].temp.toFixed(0)}°C`,
            col3: ht.rods[1].ballDropped ? `Alüminyum Düştü (${ht.rods[1].dropTime.toFixed(1)}s)` : `${ht.rods[1].temp.toFixed(0)}°C`,
            col4: ht.rods[2].ballDropped ? `Demir Düştü (${ht.rods[2].dropTime.toFixed(1)}s)` : `${ht.rods[2].temp.toFixed(0)}°C`,
            col5: "İletkenlik: Bakır > Alüminyum > Demir"
        };
        ht.measurements.push(row);
        showLabToast(`Isı İletimi Ölçümü #${row.id} deftere kaydedildi!`);
    } else if (expId === "5.10") {
        const cc = labState.circuit;
        const row = {
            id: cc.measurements.length + 1,
            col1: `${cc.batteryCount} Pil`,
            col2: `${cc.bulbCount} Ampul`,
            col3: cc.switchClosed ? "Kapalı (Akım Var)" : "Açık (Akım Yok)",
            col4: cc.brightnessLevel,
            col5: cc.batteryCount > cc.bulbCount ? "Pil çok: Parlak" : "Ampul çok: Sönük"
        };
        cc.measurements.push(row);
        showLabToast(`Devre Parlaklığı Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "6.1") {
        const ec = labState.eclipse;
        const isSolar = ec.mode === "solar";
        const row = {
            id: ec.measurements.length + 1,
            col1: isSolar ? "☀️ Güneş Tutulması" : "🌕 Ay Tutulması",
            col2: isSolar ? "Güneş — Ay — Dünya" : "Güneş — Dünya — Ay",
            col3: isSolar ? "Yeniay Evresi" : "Dolunay Evresi",
            col4: isSolar ? "Gündüz (Dar Bölge)" : "Gece (Karanlık Yarı Küre)",
            col5: isSolar 
                ? (Math.abs(ec.orbitAngle) <= 1.2 ? "Tam Tutulma (Korona Halkası)" : "Parçalı Tutulma")
                : (Math.abs(ec.orbitAngle) <= 1.5 ? "Tam Tutulma (Kızıl / Kanlı Ay)" : "Parçalı Tutulma")
        };
        ec.measurements.push(row);
        showLabToast(`Tutulma Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "6.2") {
        const tow = labState.tugOfWar;
        const netDir = tow.netForce > 0 ? "Doğu" : (tow.netForce < 0 ? "Batı" : "Sıfır");
        const row = {
            id: tow.measurements.length + 1,
            col1: `${tow.fWest} N (Batı)`,
            col2: `${tow.fEast} N (Doğu)`,
            col3: `${Math.abs(tow.netForce)} N (${netDir})`,
            col4: tow.netForce === 0 ? "⚖️ Dengelenmiş" : "⚡ Dengelenmemiş",
            col5: tow.netForce === 0 ? "Durgun (a = 0)" : (tow.netForce > 0 ? "Doğuya Hızlanan" : "Batıya Hızlanan")
        };
        tow.measurements.push(row);
        showLabToast(`Kuvvet Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "6.3") {
        const m = labState.motion;
        const row = {
            id: m.measurements.length + 1,
            col1: `${m.trackLength} m Pist`,
            col2: `${fmt(m.elapsedTime, 1)} s`,
            col3: `${fmt(m.distanceTraveled, 1)} m`,
            col4: `${fmt(m.speed, 1)} m/s`,
            col5: m.distanceTraveled >= m.trackLength ? "🏁 Pisti Tamamladı" : (m.isPlaying ? "⚡ Sabit Süratli Hareket" : "Bekliyor")
        };
        m.measurements.push(row);
        showLabToast(`Sabit Sürat Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "6.4") {
        const r = labState.reflection;
        let mirrorName = "Düzlem Ayna";
        let imageProp = "Düz, Eşit Boyut";
        if (r.mirrorType === "concave") {
            mirrorName = "Çukur (İçbükey) Ayna";
            if (r.objectDistance < r.focalLength) imageProp = "Düz, Dev Büyüklükte (Dişçi)";
            else imageProp = "Ters, Gerçek Görüntü";
        } else if (r.mirrorType === "convex") {
            mirrorName = "Tümsek (Dışbükey) Ayna";
            imageProp = "Düz, Küçük, Geniş Görüş";
        }
        const row = {
            id: r.measurements.length + 1,
            col1: mirrorName,
            col2: `${r.incidentAngle}°`,
            col3: `${r.incidentAngle}°`,
            col4: r.subMode === "smooth" ? "Düzgün Yansıma" : "Dağınık Yansıma",
            col5: imageProp
        };
        r.measurements.push(row);
        showLabToast(`Yansıma Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "6.5") {
        const dt = labState.densityTower;
        const names = dt.activeLiquids.map(l => l.name);
        const objNames = dt.objects.map(o => o.name);
        const row = {
            id: dt.measurements.length + 1,
            col1: `${dt.activeLiquids.length} / 4 Sıvı`,
            col2: names.length > 0 ? names.join(' > ') : "Silindir Boş",
            col3: dt.activeLiquids[0] ? `${dt.activeLiquids[0].name} (d=${dt.activeLiquids[0].density})` : "—",
            col4: dt.activeLiquids.length > 0 ? `${dt.activeLiquids[dt.activeLiquids.length - 1].name} (d=${dt.activeLiquids[dt.activeLiquids.length - 1].density})` : "—",
            col5: objNames.length > 0 ? objNames.join(', ') : "Cisim Bırakılmadı"
        };
        dt.measurements.push(row);
        showLabToast(`Yoğunluk Kulesi Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "6.6") {
        const g = labState.germination;
        const d = g.dishes.find(x => x.id === g.selectedDish) || g.dishes[0];
        const sproutText = d.sproutProgress >= 0.8 ? "🌱 Çimlendi (Filiz Çıktı)" : "❌ Çimlenmedi (Tohum Sabit)";
        const row = {
            id: g.measurements.length + 1,
            col1: d.name,
            col2: d.water ? "💧 Islak Pamuk (Nem Var)" : "🏜️ Kuru Pamuk (Su Yok)",
            col3: `${d.temp}°C ${d.temp === 25 ? '(Uygun)' : '(Uygun Değil)'}`,
            col4: d.light ? "☀️ Aydınlık" : "🌑 Karanlık Dolap",
            col5: sproutText
        };
        g.measurements.push(row);
        showLabToast(`Tohum Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "6.7") {
        const ab = labState.absorption;
        let rpmText = "Durgun (0 RPM)";
        if (ab.lampOn) {
            if (ab.lampPower === 100) rpmText = "Çok Hızlı (240 RPM)";
            else if (ab.lampPower >= 50) rpmText = "Orta Hız (120 RPM)";
            else rpmText = "Yavaş (60 RPM)";
        }
        const row = {
            id: ab.measurements.length + 1,
            col1: ab.lampOn ? `%${ab.lampPower} Güç` : "Kapalı",
            col2: `${ab.tempBlack.toFixed(1)}°C (En Çok Isınan)`,
            col3: `${ab.tempBlue.toFixed(1)}°C (Orta)`,
            col4: `${ab.tempWhite.toFixed(1)}°C (En Az Isınan)`,
            col5: rpmText
        };
        ab.measurements.push(row);
        showLabToast(`Soğrulma Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "6.8") {
        const ex = labState.expansion;
        const stepLabels = {
            cold_pass: "1. Soğukken Geçirme",
            heating: "2. Alevde Isıtma",
            hot_try: "3. Sıcakken Deneme",
            quenching: "4. Soğuk Suda Soğutma"
        };
        const passText = ex.isPassingThrough ? "✅ Halkadan Geçti" : "⛔ Takıldı, Geçemedi!";
        const inference = ex.isPassingThrough 
            ? "Büzüldü / Hacim Küçüldü (r_küre < r_halka)" 
            : "Genleşti / Hacim Büyüdü (r_küre > r_halka)";
        const row = {
            id: ex.measurements.length + 1,
            col1: stepLabels[ex.step] || "Gözlem",
            col2: `${ex.sphereTemp.toFixed(0)}°C`,
            col3: ex.sphereRadius > 28 ? "Büyük (Genleşmiş)" : "Normal (Büzülmüş)",
            col4: passText,
            col5: inference
        };
        ex.measurements.push(row);
        showLabToast(`Gravzant Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "6.9") {
        const cd = labState.conductivity;
        const matNames = {
            copper: { name: "Bakır Tel", type: "Katı İletken", cond: "İletken", carrier: "Serbest Elektronlar" },
            iron: { name: "Demir Çivi", type: "Katı İletken", cond: "İletken", carrier: "Serbest Elektronlar" },
            graphite: { name: "Grafit (Kurşun Kalem)", type: "Katı Ametal İletken", cond: "İletken", carrier: "Serbest Elektronlar" },
            wood: { name: "Kuru Tahta", type: "Katı Yalıtkan", cond: "Yalıtkan", carrier: "Serbest Taşıyıcı Yok" },
            plastic: { name: "Plastik Cetvel", type: "Katı Yalıtkan", cond: "Yalıtkan", carrier: "Serbest Taşıyıcı Yok" },
            eraser: { name: "Silgi", type: "Katı Yalıtkan", cond: "Yalıtkan", carrier: "Serbest Taşıyıcı Yok" },
            saltwater: { name: "Tuzlu Su", type: "Sıvı Çözelti", cond: "İletken", carrier: "Serbest İyonlar (Na+, Cl-)" },
            lemonwater: { name: "Limonlu Su", type: "Sıvı Asit Çözeltisi", cond: "İletken", carrier: "Serbest İyonlar (H+)" },
            sugarwater: { name: "Şekerli Su", type: "Sıvı Çözelti", cond: "Yalıtkan", carrier: "Moleküler Dağılır (İyonsuz)" },
            purewater: { name: "Saf Su", type: "Saf Sıvı", cond: "Yalıtkan", carrier: "İyonsuz Nötr Moleküller" }
        };
        const info = matNames[cd.selectedMaterial] || matNames.copper;
        const row = {
            id: cd.measurements.length + 1,
            col1: info.name,
            col2: info.type,
            col3: info.cond,
            col4: cd.isConductive ? "💡 Yanıyor (Parlak)" : "❌ Yanmıyor (Sönük)",
            col5: info.carrier
        };
        cd.measurements.push(row);
        showLabToast(`İletkenlik Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "6.10") {
        const res = labState.resistance;
        const matNames = { copper: "Bakır", iron: "Demir", nichrome: "Nikel-Krom" };
        const thickNames = { thin: "İnce (S)", thick: "Kalın (2S)" };
        let modeLabel = res.mode === "wire" ? "Tel Faktörleri" : `Reosta (%${res.rheostatSlider})`;
        let lenStr = res.mode === "wire" ? `${res.wireLength} cm` : `Etkin Boy: %${res.rheostatSlider}`;
        let resLevelStr = "";
        let brightStr = "";
        if (res.totalResistanceLevel === "very_low") {
            resLevelStr = "Çok Düşük Direnç";
            brightStr = "💡 Çok Parlak";
        } else if (res.totalResistanceLevel === "low") {
            resLevelStr = "Düşük Direnç";
            brightStr = "💡 Parlak";
        } else if (res.totalResistanceLevel === "medium") {
            resLevelStr = "Orta Direnç";
            brightStr = "💡 Normal Işık";
        } else if (res.totalResistanceLevel === "high") {
            resLevelStr = "Yüksek Direnç";
            brightStr = "🕯️ Sönük";
        } else {
            resLevelStr = "Çok Yüksek Direnç";
            brightStr = "🕯️ Çok Sönük";
        }
        const row = {
            id: res.measurements.length + 1,
            col1: modeLabel,
            col2: lenStr,
            col3: res.mode === "wire" ? `${thickNames[res.wireThickness]} · ${matNames[res.wireMaterial]}` : "Nikel-Krom Sargı",
            col4: resLevelStr,
            col5: brightStr
        };
        res.measurements.push(row);
        showLabToast(`Direnç Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "7.1") {
        const work = labState.work;
        let scenarioName = "";
        let alignStr = "";
        if (work.scenario === "horizontal") {
            scenarioName = "📦 Yatay İtme" + (work.frictionEnabled ? " (Sürtünmeli)" : "");
            alignStr = "Aynı Doğrultu (0°)";
        } else if (work.scenario === "lift") {
            scenarioName = "🏋️ Yukarı Kaldırma";
            alignStr = "Düşey Kaldırma (0°)";
        } else if (work.scenario === "carry") {
            scenarioName = "🎒 Çantayla Yürüme";
            alignStr = "Kuvvet ⟂ Hareket (90°)";
        } else if (work.scenario === "wall") {
            scenarioName = "🧱 Duvarı İtme";
            alignStr = "Hareketsiz (Δx = 0)";
        }

        const workStr = work.isWorkDone 
            ? `${fmt(work.appliedWork, 1)} J (İş Var)` 
            : `0.0 J (İş Yok)`;

        const row = {
            id: work.measurements.length + 1,
            col1: scenarioName,
            col2: `${fmt(work.force, 1)} N`,
            col3: `${fmt(work.distance, 1)} m`,
            col4: alignStr,
            col5: workStr
        };

        work.measurements.push(row);
        showLabToast(`İş Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "7.2") {
        const energy = labState.energy;
        const modeLabel = energy.mode === "pendulum" ? "🔄 Sarkaç" : "🛹 U-Rampa";
        const row = {
            id: energy.measurements.length + 1,
            col1: modeLabel,
            col2: `${fmt(energy.mass, 1)} kg`,
            col3: `h = ${fmt(energy.currentHeight, 2)} m · v = ${fmt(energy.currentSpeed, 1)} m/s`,
            col4: `Ep: ${fmt(energy.potentialEnergy, 1)} J · Ek: ${fmt(energy.kineticEnergy, 1)} J`,
            col5: `Etop: ${fmt(energy.totalEnergy, 1)} J (Eısı: ${fmt(energy.heatEnergy, 1)} J)`
        };

        energy.measurements.push(row);
        showLabToast(`Enerji Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "7.3") {
        const { medium1, medium2, incidentAngle, refractedAngle, isTotalInternalReflection, criticalAngle } = labState.optics;
        const med1 = MEDIA_PROPERTIES[medium1];
        const med2 = MEDIA_PROPERTIES[medium2];

        let refractStr = "";
        let behaviorStr = "";

        if (incidentAngle === 0) {
            refractStr = "0.0° (Kırılmaz)";
            behaviorStr = med1.n === med2.n ? "Aynı Ortam" : "Hız Değişti, Doğrultu Sabit";
        } else if (isTotalInternalReflection) {
            refractStr = "Kırılma Yok";
            behaviorStr = `Tam Yansıma (${fmt(incidentAngle, 0)}° ile yansıdı)`;
        } else if (refractedAngle === 90.0 || (criticalAngle && Math.abs(incidentAngle - criticalAngle) < 0.25)) {
            refractStr = "90.0° (Sınır Açısı)";
            behaviorStr = "Yüzeyi Sıyırır (90°)";
        } else if (med1.n < med2.n) {
            refractStr = `${fmt(refractedAngle, 1)}°`;
            behaviorStr = "Normale Yaklaşır (Sürat Azalır)";
        } else {
            refractStr = `${fmt(refractedAngle, 1)}°`;
            behaviorStr = "Normalden Uzaklaşır (Sürat Artar)";
        }

        const row = {
            id: labState.optics.measurements.length + 1,
            col1: `${med1.name} ➔ ${med2.name}`,
            col2: `${fmt(incidentAngle, 0)}°`,
            col3: refractStr,
            col4: `${Math.round(med1.speed / 1000)}k ➔ ${Math.round(med2.speed / 1000)}k km/s`,
            col5: behaviorStr
        };

        labState.optics.measurements.push(row);
        showLabToast(`Gözlem #${row.id} deftere kaydedildi!`);
    } else if (expId === "7.4") {
        const { type, mode, focalLength, objectDistance, imageDistance, magnification } = labState.lens;
        const isConvex = (type === "convex");
        const isInfinityZone = isConvex && mode === "object" && Math.abs(objectDistance - focalLength) <= 8;

        let modeDesc = mode === "parallel" ? "Paralel Işın" : "Mum (Cisim)";
        let doDesc = mode === "parallel" ? "Sonsuz" : `${fmt(objectDistance, 0)} mm`;
        let diDesc = "";

        if (mode === "parallel") {
            diDesc = isConvex ? `Odakta Toplanır (f = ${fmt(focalLength, 0)} mm)` : `Odaktan Dağılır (f = -${fmt(focalLength, 0)} mm)`;
        } else if (isInfinityZone || imageDistance === null) {
            diDesc = "Sonsuzda (Görüntü Oluşmaz)";
        } else {
            const isReal = imageDistance > 0;
            const sizeText = Math.abs(magnification) > 1.05 ? "Büyütülmüş" : Math.abs(magnification) < 0.95 ? "Küçültülmüş" : "Eşit";
            diDesc = `${Math.abs(Number(imageDistance)).toFixed(0)} mm (${isReal ? 'Gerçek/Ters' : 'Sanal/Düz'}, ${sizeText})`;
        }

        const row = {
            id: labState.lens.measurements.length + 1,
            col1: isConvex ? "İnce Kenarlı" : "Kalın Kenarlı",
            col2: modeDesc,
            col3: doDesc,
            col4: `${fmt(focalLength, 0)} mm`,
            col5: diDesc
        };

        labState.lens.measurements.push(row);
        showLabToast(`Mercek Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "7.5") {
        const sep = labState.separation;
        if (sep.mode === "funnel") {
            const f = sep.funnel;
            let resultStr = "";
            if (f.leakedOil > 0.5) {
                resultStr = `Verim: %${fmt(f.efficiency, 0)} (Yağ Sızdı: ${fmt(f.leakedOil)} mL)`;
            } else if (f.waterVolume <= 0.5) {
                resultStr = `Verim: %100 (Kusursuz Ayrım)`;
            } else {
                resultStr = `Verim: %${fmt(f.efficiency, 0)} (Kısmi: ${fmt(f.waterVolume)} mL su kaldı)`;
            }

            const row = {
                id: sep.measurements.length + 1,
                col1: "🧪 Ayırma Hunisi",
                col2: "Zeytinyağı + Su (Heterojen)",
                col3: "Yoğunluk Farkı (d_su > d_yağ)",
                col4: `Su: ${fmt(f.collectedWater)} mL · Yağ: ${fmt(f.oilVolume)} mL`,
                col5: resultStr
            };
            sep.measurements.push(row);
            showLabToast(`Ayırma Hunisi Gözlemi #${row.id} deftere kaydedildi!`);
        } else {
            const d = sep.distillation;
            let resultStr = "";
            if (d.distilledAlcohol >= 98.0) {
                resultStr = `Tam Saflaşma (100 mL Etil Alkol)`;
            } else if (d.distilledAlcohol > 0) {
                resultStr = `Damıtma Sürüyor (${fmt(d.distilledAlcohol)} mL Alkol)`;
            } else {
                resultStr = `Isınma Aşaması (${fmt(d.temp)}°C)`;
            }

            const row = {
                id: sep.measurements.length + 1,
                col1: "🔥 Basit Damıtma",
                col2: "Etil Alkol + Su (Homojen)",
                col3: "Kaynama Noktası (78°C vs 100°C)",
                col4: `Damıtılan Alkol: ${fmt(d.distilledAlcohol)} mL`,
                col5: `${fmt(d.temp)}°C · ${resultStr}`
            };
            sep.measurements.push(row);
            showLabToast(`Damıtma Gözlemi #${row.id} deftere kaydedildi!`);
        }
    } else if (expId === "7.6") {
        const dissolve = labState.dissolve;
        const sugarNames = { cube: "Küp Şeker", granulated: "Toz Şeker", powder: "Pudra Şekeri" };
        dissolve.beakers.forEach(b => {
            const timeText = b.isDissolved ? `${fmt(b.elapsedTime, 1)} sn (Çözündü)` : `${fmt(b.elapsedTime, 1)} sn (Devam Ediyor)`;
            const row = {
                id: dissolve.measurements.length + 1,
                col1: `${b.name}`,
                col2: `${b.temp}°C`,
                col3: `${sugarNames[b.sugar] || b.sugar} (10g)`,
                col4: b.stirring ? "Açık (Karıştırılıyor)" : "Kapalı (Durgun)",
                col5: timeText
            };
            dissolve.measurements.push(row);
        });
        showLabToast("3 Beherin ölçüm sonuçları deftere kaydedildi!");
    } else if (expId === "7.7") {
        const el = labState.electro;
        if (el.mode === "friction") {
            const f = el.friction;
            const isEbonite = (f.pair === "ebonite");
            const rodName = isEbonite ? "Ebonit Çubuk" : "Cam Çubuk";
            const clothName = isEbonite ? "Yün Kumaş" : "İpek Kumaş";
            const rodNet = f.rod.protons - f.rod.electrons; // positive if protons > electrons
            const clothNet = f.cloth.protons - f.cloth.electrons;

            let flowStr = isEbonite ? "Yün ➔ Çubuğa (e⁻ Geçişi)" : "Cam ➔ İpeğe (e⁻ Geçişi)";
            const rodSign = rodNet < 0 ? `(-${Math.abs(rodNet)}e Negatif)` : rodNet > 0 ? `(+${rodNet}e Pozitif)` : "Nötr (0)";
            const clothSign = clothNet < 0 ? `(-${Math.abs(clothNet)}e Negatif)` : clothNet > 0 ? `(+${clothNet}e Pozitif)` : "Nötr (0)";

            const row = {
                id: el.measurements.length + 1,
                col1: "⚡ Sürtünme",
                col2: `${rodName} + ${clothName}`,
                col3: "Başlangıç: Her İkisi Nötr (0)",
                col4: flowStr,
                col5: `${rodName}: ${rodSign} · ${clothName}: ${clothSign}`
            };
            el.measurements.push(row);
            showLabToast(`Sürtünme Gözlemi #${row.id} deftere kaydedildi!`);
        } else if (el.mode === "conduction") {
            const c = el.conduction;
            const s1Net = c.sphere1.protons - c.sphere1.electrons;
            const s2Net = c.sphere2.protons - c.sphere2.electrons;
            const s1Sign = s1Net < 0 ? `-${Math.abs(s1Net)}e` : s1Net > 0 ? `+${s1Net}e` : "0 (Nötr)";
            const s2Sign = s2Net < 0 ? `-${Math.abs(s2Net)}e` : s2Net > 0 ? `+${s2Net}e` : "0 (Nötr)";

            const row = {
                id: el.measurements.length + 1,
                col1: "🤝 Dokunma",
                col2: "2 Özdeş İletken Metal Küre",
                col3: c.hasTouched ? "Dokunma Gerçekleşti" : "Dokunma Öncesi",
                col4: "e⁻ Dağılımı (Sadece e⁻ Akışı)",
                col5: `Küre 1: ${s1Sign} · Küre 2: ${s2Sign}`
            };
            el.measurements.push(row);
            showLabToast(`Dokunma Gözlemi #${row.id} deftere kaydedildi!`);
        } else {
            // induction (etki ile kutuplanma)
            const ind = el.induction;
            const isEbonite = (ind.pair === "ebonite");
            const rodLabel = isEbonite ? "(-) Ebonit Çubuk" : "(+) Cam Çubuk";
            const row = {
                id: el.measurements.length + 1,
                col1: "🧲 Etki (Kutuplanma)",
                col2: `${rodLabel} + Nötr İletken Küre`,
                col3: ind.rod.isApproached ? "Çubuk Yaklaştırıldı" : "Çubuk Uzakta",
                col4: isEbonite ? "e⁻ İtildi (Sağa Toplandı)" : "e⁻ Çekildi (Sola Toplandı)",
                col5: ind.rod.isApproached ? "Küre Kutuplandı (Net Yük: 0 Nötr)" : "Homojen Nötr Dağılım"
            };
            el.measurements.push(row);
            showLabToast(`Etki ile Elektriklenme Gözlemi #${row.id} deftere kaydedildi!`);
        }
    } else if (expId === "7.8") {
        const es = labState.electroscope;
        const rodNames = { glass_pos: "(+) Cam Çubuk", ebonite_neg: "(-) Ebonit Çubuk", neutral: "Nötr Çubuk" };
        const actionNames = { approach: "Etki ile Yaklaştırma", touch: "Dokunma ile İletim", remove: "Uzaklaştırma (Denge)" };
        const actStr = es.grounding.isActive ? "⚡ Topraklama (Nötrleme)" : actionNames[es.rod.action] || "Yaklaştırma";

        const knobStr = es.scope.knobNet === 0 ? "0 (Nötr)" : es.scope.knobNet > 0 ? `+${es.scope.knobNet}e` : `${es.scope.knobNet}e`;
        const leavesStr = es.scope.leavesNet === 0 ? "0 (Nötr)" : es.scope.leavesNet > 0 ? `+${es.scope.leavesNet}e` : `${es.scope.leavesNet}e`;
        const stateStr = es.scope.leafAngle <= 1.0 ? "Kapalı (α = 0°)" : `Açık (α = ${fmt(es.scope.leafAngle, 1)}°)`;

        const row = {
            id: es.measurements.length + 1,
            col1: actStr,
            col2: rodNames[es.rod.type] || "Çubuk",
            col3: knobStr,
            col4: leavesStr,
            col5: stateStr
        };
        es.measurements.push(row);
        showLabToast(`Elektroskop Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "7.9") {
        const fp = labState.foodPyramid;
        const tier = TROPHIC_TIERS[fp.selectedTier] || TROPHIC_TIERS[0];
        const sun = fp.sunlight;
        const energyJ = (fp.selectedTier === 4) ? "Madde Döngüsü" : `${fmt(sun * tier.energyFraction, 0)} J`;
        const heatJ = (fp.selectedTier === 4) ? "Tam Ayrışma" : `${fmt(sun * tier.energyFraction * 9, 0)} J`;
        const mult = (fp.pesticideDose === "low") ? 0.5 : (fp.pesticideDose === "high") ? 2.5 : 1.0;
        const ppmVal = (tier.ppmBase * mult).toFixed(2);
        const bioaccumStr = `${ppmVal} ppm ${fp.selectedTier === 3 ? "(ÖLÜMCÜL!)" : ""}`;

        const row = {
            id: fp.measurements.length + 1,
            col1: tier.shortName,
            col2: tier.examples,
            col3: energyJ,
            col4: heatJ,
            col5: bioaccumStr
        };
        fp.measurements.push(row);
        showLabToast(`Ekoloji Gözlemi #${row.id} deftere kaydedildi!`);
    } else if (expId === "7.10") {
        const wf = labState.waterFootprint;
        let col1 = "", col2 = "", col3 = "", col4 = "", col5 = "";
        if (wf.mode === "aqueduct") {
            const aq = wf.aqueduct;
            col1 = "🏛️ Mağlova Su Kemeri";
            col2 = `Eğim: %${fmt(aq.slope, 1)} · Debi: ${aq.flow} L/s`;
            col3 = `${aq.waterDelivered} L/s İletim`;
            col4 = aq.flood ? "Sel Tahliyesi (%99 Başarılı)" : "Sıfır Enerji / Yerçekimi";
            col5 = aq.slope === 0.2 ? "Mimar Sinan İdeal Akışı" : "Hassas Eğim Ayarı";
        } else if (wf.mode === "tech") {
            const tc = wf.tech;
            let saving = 0;
            if (tc.aerator) saving += 50;
            if (tc.drip) saving += 65;
            if (tc.greywater) saving += 30;
            col1 = "💧 Tasarruf Teknolojileri";
            col2 = `P:${tc.aerator ? 'Açık' : 'Kapalı'} · D:${tc.drip ? 'Açık' : 'Kapalı'} · G:${tc.greywater ? 'Açık' : 'Kapalı'}`;
            col3 = `${Math.round(150 * (1 - Math.min(0.8, saving / 100)))} L/gün Birey`;
            col4 = `%${Math.min(80, saving)} Tasarruf / Kazanım`;
            col5 = saving >= 50 ? "Yüksek Sürdürülebilirlik" : "Geliştirilebilir";
        } else {
            const fp = wf.footprint;
            const p = fp.products[fp.selectedProduct] || fp.products.shirt;
            col1 = "⚖️ Arjen Hoekstra Terazisi";
            col2 = p.name;
            col3 = `${p.liters.toLocaleString('tr-TR')} Litre Sanal Su`;
            col4 = `Yeşil: %${p.green} · Mavi: %${p.blue} · Gri: %${p.grey}`;
            col5 = p.note;
        }
        const row = {
            id: wf.measurements.length + 1,
            col1, col2, col3, col4, col5
        };
        wf.measurements.push(row);
        showLabToast(`Su Ayak İzi Gözlemi #${row.id} deftere kaydedildi!`);
    }

    renderMeasurementTable();
}

function renderMeasurementTable() {
    const tbody = document.getElementById('lab-table-body');
    const emptyMsg = document.getElementById('lab-table-empty');
    if (!tbody || !emptyMsg) return;

    const expId = labState.activeExperimentId;
    let measurements = [];
    if (expId === "5.1") {
        measurements = labState.moonPhases.measurements;
    } else if (expId === "5.2") {
        measurements = labState.dynamometer.measurements;
    } else if (expId === "5.3") {
        measurements = labState.friction.measurements;
    } else if (expId === "5.4") {
        measurements = labState.lightRect.measurements;
    } else if (expId === "5.5") {
        measurements = labState.shadow.measurements;
    } else if (expId === "5.6") {
        measurements = labState.compressibility.measurements;
    } else if (expId === "5.7") {
        measurements = labState.heatExchange.measurements;
    } else if (expId === "5.8") {
        measurements = labState.waterState.measurements;
    } else if (expId === "5.9") {
        measurements = labState.heatTransfer.measurements;
    } else if (expId === "5.10") {
        measurements = labState.circuit.measurements;
    } else if (expId === "6.1") {
        measurements = labState.eclipse.measurements;
    } else if (expId === "6.2") {
        measurements = labState.tugOfWar.measurements;
    } else if (expId === "6.3") {
        measurements = labState.motion.measurements;
    } else if (expId === "6.4") {
        measurements = labState.reflection.measurements;
    } else if (expId === "6.5") {
        measurements = labState.densityTower.measurements;
    } else if (expId === "6.6") {
        measurements = labState.germination.measurements;
    } else if (expId === "6.7") {
        measurements = labState.absorption.measurements;
    } else if (expId === "6.8") {
        measurements = labState.expansion.measurements;
    } else if (expId === "6.9") {
        measurements = labState.conductivity.measurements;
    } else if (expId === "6.10") {
        measurements = labState.resistance.measurements;
    } else if (expId === "7.1") {
        measurements = labState.work.measurements;
    } else if (expId === "7.2") {
        measurements = labState.energy.measurements;
    } else if (expId === "7.3") {
        measurements = labState.optics.measurements;
    } else if (expId === "7.4") {
        measurements = labState.lens.measurements;
    } else if (expId === "7.5") {
        measurements = labState.separation.measurements;
    } else if (expId === "7.6") {
        measurements = labState.dissolve.measurements;
    } else if (expId === "7.7") {
        measurements = labState.electro.measurements;
    } else if (expId === "7.8") {
        measurements = labState.electroscope.measurements;
    } else if (expId === "7.9") {
        measurements = labState.foodPyramid.measurements;
    } else if (expId === "7.10") {
        measurements = labState.waterFootprint.measurements;
    } else {
        measurements = labState.optics.measurements;
    }

    if (measurements.length === 0) {
        tbody.innerHTML = "";
        emptyMsg.classList.remove('is-hidden');
        return;
    }

    emptyMsg.classList.add('is-hidden');
    let html = "";
    measurements.forEach(m => {
        html += `
            <tr>
                <td><strong>${m.id}</strong></td>
                <td><span class="lab-table-tag">${m.col1}</span></td>
                <td><span class="lab-table-val inc">${m.col2}</span></td>
                <td><span class="lab-table-val ref">${m.col3}</span></td>
                <td><small>${m.col4}</small></td>
                <td><strong>${m.col5}</strong></td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function clearMeasurementTable() {
    const expId = labState.activeExperimentId;
    if (expId === "5.1") {
        labState.moonPhases.measurements = [];
    } else if (expId === "5.2") {
        labState.dynamometer.measurements = [];
    } else if (expId === "5.3") {
        labState.friction.measurements = [];
    } else if (expId === "5.4") {
        labState.lightRect.measurements = [];
    } else if (expId === "5.5") {
        labState.shadow.measurements = [];
    } else if (expId === "5.6") {
        labState.compressibility.measurements = [];
    } else if (expId === "5.7") {
        labState.heatExchange.measurements = [];
    } else if (expId === "5.8") {
        labState.waterState.measurements = [];
    } else if (expId === "5.9") {
        labState.heatTransfer.measurements = [];
    } else if (expId === "5.10") {
        labState.circuit.measurements = [];
    } else if (expId === "6.1") {
        labState.eclipse.measurements = [];
    } else if (expId === "6.2") {
        labState.tugOfWar.measurements = [];
    } else if (expId === "6.3") {
        labState.motion.measurements = [];
    } else if (expId === "6.4") {
        labState.reflection.measurements = [];
    } else if (expId === "6.5") {
        labState.densityTower.measurements = [];
    } else if (expId === "6.6") {
        labState.germination.measurements = [];
    } else if (expId === "6.7") {
        labState.absorption.measurements = [];
    } else if (expId === "6.8") {
        labState.expansion.measurements = [];
    } else if (expId === "6.9") {
        labState.conductivity.measurements = [];
    } else if (expId === "6.10") {
        labState.resistance.measurements = [];
    } else if (expId === "7.1") {
        labState.work.measurements = [];
    } else if (expId === "7.2") {
        labState.energy.measurements = [];
    } else if (expId === "7.3") {
        labState.optics.measurements = [];
    } else if (expId === "7.4") {
        labState.lens.measurements = [];
    } else if (expId === "7.5") {
        labState.separation.measurements = [];
    } else if (expId === "7.6") {
        labState.dissolve.measurements = [];
    } else if (expId === "7.7") {
        labState.electro.measurements = [];
    } else if (expId === "7.8") {
        labState.electroscope.measurements = [];
    } else if (expId === "7.9") {
        labState.foodPyramid.measurements = [];
    } else if (expId === "7.10") {
        labState.waterFootprint.measurements = [];
    } else {
        labState.optics.measurements = [];
    }
    renderMeasurementTable();
    showLabToast("Gözlem defteri temizlendi");
}

// Yardımcı Çizimler
function drawProtractor(ctx, cx, cy, r, scale) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1 * scale;
    ctx.stroke();

    for (let deg = 0; deg <= 90; deg += 10) {
        const rad = (deg * Math.PI) / 180;
        const tickLen = deg % 30 === 0 ? 14 * scale : 8 * scale;

        // Üst Sol
        ctx.beginPath();
        ctx.moveTo(cx - Math.sin(rad) * r, cy - Math.cos(rad) * r);
        ctx.lineTo(cx - Math.sin(rad) * (r - tickLen), cy - Math.cos(rad) * (r - tickLen));
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();

        // Üst Sağ
        ctx.beginPath();
        ctx.moveTo(cx + Math.sin(rad) * r, cy - Math.cos(rad) * r);
        ctx.lineTo(cx + Math.sin(rad) * (r - tickLen), cy - Math.cos(rad) * (r - tickLen));
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();

        // Alt Sağ
        ctx.beginPath();
        ctx.moveTo(cx + Math.sin(rad) * r, cy + Math.cos(rad) * r);
        ctx.lineTo(cx + Math.sin(rad) * (r - tickLen), cy + Math.cos(rad) * (r - tickLen));
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();

        // Alt Sol (Denge / Simetri Kadranı)
        ctx.beginPath();
        ctx.moveTo(cx - Math.sin(rad) * r, cy + Math.cos(rad) * r);
        ctx.lineTo(cx - Math.sin(rad) * (r - tickLen), cy + Math.cos(rad) * (r - tickLen));
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();
    }
    ctx.restore();
}

function drawLaserBeam(ctx, x1, y1, x2, y2, color, width, alpha) {
    ctx.save();

    // 1. Dış Yaygın Neon Halesi (Diffuse Bloom)
    ctx.globalAlpha = alpha * 0.45;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width * 2.8;
    ctx.lineCap = "round";
    ctx.shadowColor = color;
    ctx.shadowBlur = 14;
    ctx.stroke();

    // 2. Doygun Neon Işın Gövdesi (Saturated Beam Core)
    ctx.globalAlpha = alpha * 0.9;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = width * 1.25;
    ctx.shadowBlur = 6;
    ctx.stroke();

    // 3. Yoğun Akkor Beyaz Filament Çekirdeği (Hot White Filament Center)
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(0.9, width * 0.38);
    ctx.shadowBlur = 0;
    ctx.stroke();

    // Foton İlerleme Yön Oku (Minimal Directional Photon)
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowLen = 9 * (width / 3.0);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX - arrowLen * Math.cos(angle - Math.PI / 6), midY - arrowLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX - arrowLen * Math.cos(angle + Math.PI / 6), midY - arrowLen * Math.sin(angle + Math.PI / 6));
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(1.2, width * 0.5);
    ctx.stroke();

    ctx.restore();
}

function drawLaserDevice(ctx, x, y, targetX, targetY, scale) {
    ctx.save();
    const angle = Math.atan2(targetY - y, targetX - x);

    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#00d2ff";
    ctx.lineWidth = 2 * scale;

    ctx.beginPath();
    ctx.roundRect(-40 * scale, -12 * scale, 40 * scale, 24 * scale, 5 * scale);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ff1744";
    ctx.beginPath();
    ctx.arc(0, 0, 5 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(-20 * scale, 0, 18 * scale, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0, 210, 255, 0.4)";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    ctx.restore();
}

// ============================================================================
// --- 8.10. DENEY 7.10: SU AYAK İZİ VE SÜRDÜRÜLEBİLİR TASARRUF SİMÜLATÖRÜ ---
// ============================================================================

function initWaterFootprintState() {
    const wf = labState.waterFootprint;
    if (!wf.aqueduct.particles || wf.aqueduct.particles.length === 0) {
        wf.aqueduct.particles = [];
        for (let i = 0; i < 40; i++) {
            wf.aqueduct.particles.push({
                x: Math.random() * 800,
                y: 110 + Math.random() * 20,
                vx: 2 + Math.random() * 3,
                size: 1.5 + Math.random() * 2.5,
                alpha: 0.4 + Math.random() * 0.6
            });
        }
    }
    if (!wf.tech.particles || wf.tech.particles.length === 0) {
        wf.tech.particles = [];
        for (let i = 0; i < 25; i++) {
            wf.tech.particles.push({
                x: 180 + (Math.random() - 0.5) * 16,
                y: 220 + Math.random() * 120,
                vy: 3 + Math.random() * 4,
                size: 1.5 + Math.random() * 2,
                isBubble: Math.random() > 0.4
            });
        }
    }
    setWaterFootprintMode(wf.mode || "aqueduct");
    updateWaterFootprintDOM();
}

function resetWaterFootprintExperiment() {
    const wf = labState.waterFootprint;
    wf.aqueduct.slope = 0.2;
    wf.aqueduct.flow = 200;
    wf.aqueduct.flood = false;
    wf.tech.aerator = false;
    wf.tech.drip = false;
    wf.tech.greywater = false;
    wf.footprint.selectedProduct = "shirt";

    const sSlope = document.getElementById('slider-aqueduct-slope');
    const sFlow = document.getElementById('slider-aqueduct-flow');
    if (sSlope) sSlope.value = 2;
    if (sFlow) sFlow.value = 200;

    const btnFlood = document.getElementById('btn-aqueduct-flood');
    if (btnFlood) {
        btnFlood.classList.remove('active');
        const sp = btnFlood.querySelector('span');
        if (sp) sp.textContent = "Kapalı";
    }

    ['btn-toggle-aerator', 'btn-toggle-drip', 'btn-toggle-greywater'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.remove('active');
    });

    updateWaterFootprintDOM();
    showLabToast("💧 Su ve Sürdürülebilirlik simülatörü sıfırlandı.");
}

function setupWaterFootprintControlsDOM() {
    // 1. Mod Seçici Butonları
    const btnAqua = document.getElementById('btn-mode-aqueduct');
    const btnTech = document.getElementById('btn-mode-saving-tech');
    const btnFoot = document.getElementById('btn-mode-footprint');

    if (btnAqua) btnAqua.addEventListener('click', () => setWaterFootprintMode("aqueduct"));
    if (btnTech) btnTech.addEventListener('click', () => setWaterFootprintMode("tech"));
    if (btnFoot) btnFoot.addEventListener('click', () => setWaterFootprintMode("footprint"));

    // 2. Mod 1 Kontrolleri: Su Kemeri (Sinan Hidroliği)
    const slSlope = document.getElementById('slider-aqueduct-slope');
    const slFlow = document.getElementById('slider-aqueduct-flow');
    const btnFlood = document.getElementById('btn-aqueduct-flood');

    if (slSlope) {
        slSlope.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10) / 10.0;
            setAqueductSlope(val);
        });
    }
    if (slFlow) {
        slFlow.addEventListener('input', (e) => {
            const val = parseInt(e.target.value, 10);
            setAqueductFlow(val);
        });
    }
    if (btnFlood) {
        btnFlood.addEventListener('click', toggleAqueductFlood);
    }

    // 3. Mod 2 Kontrolleri: Tasarruf Teknolojileri
    const btnAerator = document.getElementById('btn-toggle-aerator');
    const btnDrip = document.getElementById('btn-toggle-drip');
    const btnGrey = document.getElementById('btn-toggle-greywater');

    if (btnAerator) btnAerator.addEventListener('click', toggleAerator);
    if (btnDrip) btnDrip.addEventListener('click', toggleDrip);
    if (btnGrey) btnGrey.addEventListener('click', toggleGreywater);

    // 4. Mod 3 Kontrolleri: Arjen Hoekstra Terazisi Ürün Butonları
    const prods = ['shirt', 'beef', 'coffee', 'apple', 'paper'];
    prods.forEach(p => {
        const pill = document.getElementById(`pill-prod-${p}`);
        if (pill) pill.addEventListener('click', () => selectFootprintProduct(p));
    });

    // 4.1. Quick Controls (Tuval Altı Hızlı Kontroller) 7 Buton Dinleyicisi
    const btnGatesToggle = document.getElementById('btn-water-gates-toggle');
    if (btnGatesToggle) btnGatesToggle.addEventListener('click', toggleAqueductFlood);

    const btnAeratorToggle = document.getElementById('btn-water-aerator-toggle');
    if (btnAeratorToggle) btnAeratorToggle.addEventListener('click', toggleAerator);

    const btnIrrigationToggle = document.getElementById('btn-water-irrigation-toggle');
    if (btnIrrigationToggle) btnIrrigationToggle.addEventListener('click', toggleDrip);

    const quickProdMap = {
        'btn-footprint-tshirt': 'shirt',
        'btn-footprint-beef': 'beef',
        'btn-footprint-coffee': 'coffee',
        'btn-footprint-apple': 'apple'
    };
    Object.entries(quickProdMap).forEach(([btnId, prodKey]) => {
        const b = document.getElementById(btnId);
        if (b) b.addEventListener('click', () => selectFootprintProduct(prodKey));
    });

    // 5. Gözlemi Kaydet Butonu
    const btnRecord710 = document.getElementById('btn-record-data-7-10');
    if (btnRecord710) btnRecord710.addEventListener('click', recordMeasurement);
}

function setWaterFootprintMode(mode) {
    const wf = labState.waterFootprint;
    wf.mode = mode;

    const isAqua = (mode === "aqueduct");
    const isTech = (mode === "tech");
    const isFoot = (mode === "footprint");

    const btnAqua = document.getElementById('btn-mode-aqueduct');
    const btnTech = document.getElementById('btn-mode-saving-tech');
    const btnFoot = document.getElementById('btn-mode-footprint');
    if (btnAqua) btnAqua.classList.toggle('active', isAqua);
    if (btnTech) btnTech.classList.toggle('active', isTech);
    if (btnFoot) btnFoot.classList.toggle('active', isFoot);

    const boxAqua = document.getElementById('box-aqueduct-params');
    const boxTech = document.getElementById('box-tech-params');
    const boxFoot = document.getElementById('box-footprint-params');
    if (boxAqua) boxAqua.classList.toggle('is-hidden', !isAqua);
    if (boxTech) boxTech.classList.toggle('is-hidden', !isTech);
    if (boxFoot) boxFoot.classList.toggle('is-hidden', !isFoot);

    // Hızlı Kontrol Barındaki Alt Grupları Moduna Göre Aç/Kapat
    const grpAqua = document.getElementById('group-water-sub-aqueduct');
    const grpTech = document.getElementById('group-water-sub-tech');
    const grpFoot = document.getElementById('group-water-sub-footprint');
    if (grpAqua) grpAqua.classList.toggle('is-hidden', !isAqua);
    if (grpTech) grpTech.classList.toggle('is-hidden', !isTech);
    if (grpFoot) grpFoot.classList.toggle('is-hidden', !isFoot);

    updateWaterFootprintDOM();
    showLabToast(isAqua ? "🏛️ Mimar Sinan Mağlova Su Kemeri Modu" : (isTech ? "💧 Tasarruf Teknolojileri Modu" : "⚖️ Arjen Hoekstra Su Ayak İzi Terazisi"));
}

function setAqueductSlope(val) {
    const aq = labState.waterFootprint.aqueduct;
    aq.slope = val;
    aq.waterDelivered = Math.round(aq.flow * (val >= 0.1 && val <= 0.4 ? 0.99 : Math.max(0.7, 1.0 - (val - 0.2) * 0.15)));
    const disp = document.getElementById('val-aqueduct-slope');
    if (disp) {
        disp.textContent = `%${val.toFixed(1)} ${val === 0.2 ? '(İdeal Sinan Eğimi)' : (val > 0.4 ? '(Aşırı Eğim / Erozyon)' : '(Durgun Akış)')}`;
    }
    updateWaterFootprintDOM();
}

function setAqueductFlow(val) {
    const aq = labState.waterFootprint.aqueduct;
    aq.flow = val;
    aq.waterDelivered = Math.round(val * (aq.slope >= 0.1 && aq.slope <= 0.4 ? 0.99 : 0.85));
    const disp = document.getElementById('val-aqueduct-flow');
    if (disp) disp.textContent = `${val} L/s`;
    updateWaterFootprintDOM();
}

function toggleAqueductFlood() {
    const aq = labState.waterFootprint.aqueduct;
    aq.flood = !aq.flood;
    const btn = document.getElementById('btn-aqueduct-flood');
    if (btn) {
        btn.classList.toggle('active', aq.flood);
        const sp = btn.querySelector('span');
        if (sp) sp.textContent = aq.flood ? "Açık (Sel Dehlizleri Devrede)" : "Kapalı";
    }
    updateWaterFootprintDOM();
    showLabToast(aq.flood ? "⛈️ Aşırı sel debisi! Kemer ayaklarındaki tahliye pencereleri suyu boşaltıyor." : "☀️ Normal su akışına dönüldü.");
}

function toggleAerator() {
    const tc = labState.waterFootprint.tech;
    tc.aerator = !tc.aerator;
    const btn = document.getElementById('btn-toggle-aerator');
    if (btn) {
        btn.classList.toggle('active', tc.aerator);
        const sp = btn.querySelector('span');
        if (sp) {
            sp.textContent = tc.aerator ? "Açık (%50 Tasarruf)" : "Kapalı (%0)";
            sp.style.color = tc.aerator ? '#34d399' : '#38bdf8';
        }
    }
    updateWaterFootprintDOM();
    showLabToast(tc.aerator ? "🚰 Çift kademeli perlatör devreye alındı! Suya hava katılarak akış debisi yarıya indi." : "Standart musluk moduna dönüldü.");
}

function toggleDrip() {
    const tc = labState.waterFootprint.tech;
    tc.drip = !tc.drip;
    const btn = document.getElementById('btn-toggle-drip');
    if (btn) {
        btn.classList.toggle('active', tc.drip);
        const sp = btn.querySelector('span');
        if (sp) {
            sp.textContent = tc.drip ? "Açık (Damla Sulama - %65)" : "Kapalı (Salma Sulama)";
            sp.style.color = tc.drip ? '#34d399' : '#10b981';
        }
    }
    updateWaterFootprintDOM();
    showLabToast(tc.drip ? "🌱 Basınçlı damla sulama devrede! Su doğrudan köklere damlatılıyor, buharlaşma önlendi." : "Vahşi (salma) sulama moduna dönüldü.");
}

function toggleGreywater() {
    const tc = labState.waterFootprint.tech;
    tc.greywater = !tc.greywater;
    const btn = document.getElementById('btn-toggle-greywater');
    if (btn) {
        btn.classList.toggle('active', tc.greywater);
        const sp = btn.querySelector('span');
        if (sp) {
            sp.textContent = tc.greywater ? "Açık (%30 Geri Kazanım)" : "Kapalı";
            sp.style.color = tc.greywater ? '#34d399' : '#a78bfa';
        }
    }
    updateWaterFootprintDOM();
    showLabToast(tc.greywater ? "♻️ Evsel gri su arıtımı devrede! Lavabo ve duş suları bahçede değerlendiriliyor." : "Gri su arıtımı kapatıldı.");
}

function selectFootprintProduct(prodKey) {
    const fp = labState.waterFootprint.footprint;
    fp.selectedProduct = prodKey;

    const prods = ['shirt', 'beef', 'coffee', 'apple', 'paper'];
    prods.forEach(p => {
        const pill = document.getElementById(`pill-prod-${p}`);
        if (pill) pill.classList.toggle('active', p === prodKey);
    });

    updateWaterFootprintDOM();
    const pData = fp.products[prodKey];
    showLabToast(`⚖️ ${pData.name} seçildi (Su Ayak İzi: ${pData.liters.toLocaleString('tr-TR')} Litre)`);
}

function updateWaterFootprintDOM() {
    const wf = labState.waterFootprint;
    const pBox = document.getElementById('water-pedagogical-box');
    const pIcon = document.getElementById('water-pedagogical-icon');
    const pTitle = document.getElementById('water-pedagogical-title');
    const pText = document.getElementById('water-pedagogical-text');

    const lbl1 = document.getElementById('label-stat-water-1');
    const val1 = document.getElementById('metric-water-val-1');
    const lbl2 = document.getElementById('label-stat-water-2');
    const val2 = document.getElementById('metric-water-val-2');
    const lbl3 = document.getElementById('label-stat-water-3');
    const val3 = document.getElementById('metric-water-val-3');
    const lbl4 = document.getElementById('label-stat-water-4');
    const val4 = document.getElementById('metric-water-val-4');

    const mbMode = document.getElementById('mbar-710-mode');
    const mbFlow = document.getElementById('mbar-710-flow');
    const mbSaving = document.getElementById('mbar-710-saving');
    const mbType = document.getElementById('mbar-710-type');

    if (wf.mode === "aqueduct") {
        const aq = wf.aqueduct;
        if (mbMode) mbMode.textContent = "Su Kemeri (Sinan)";
        if (mbFlow) mbFlow.textContent = `${aq.waterDelivered} L/s İletim`;
        if (mbSaving) mbSaving.textContent = aq.slope === 0.2 ? "%0.2 Kusursuz Eğim" : `%${aq.slope.toFixed(1)} Eğim`;
        if (mbType) mbType.textContent = aq.flood ? "Sel Tahliyesi Açık" : "Mavi Su (Kaynak)";

        if (lbl1) lbl1.textContent = "Kaynak Debi Girişi";
        if (val1) val1.textContent = `${aq.flow} L/s`;
        if (lbl2) lbl2.textContent = "İstanbul'a Ulaşan Su";
        if (val2) val2.textContent = `${aq.waterDelivered} L/s`;
        if (lbl3) lbl3.textContent = "Kanal Eğim Açısı";
        if (val3) val3.textContent = `%${aq.slope.toFixed(1)}`;
        if (lbl4) lbl4.textContent = "Yapı Güvenliği & Sel";
        if (val4) val4.textContent = aq.flood ? "Tahliye Menfezleri Açık" : "Optimum Dayanım";

        if (pBox && pIcon && pTitle && pText) {
            pIcon.innerHTML = '<i class="fas fa-archway"></i>';
            if (aq.slope === 0.2) {
                pTitle.textContent = "🏛️ Mimar Sinan ve Mağlova Kemeri Dehası (%0.2 Eğim)";
                pText.textContent = "Mimar Sinan, motor ve elektrik gücü olmadan suyu Belgrad Ormanları'ndan İstanbul'a taşırken kanala tam %0.2 (binde iki) eğim vermiştir. Aşırı eğim kanal duvarlarını yıpratır, düşük eğim suyu durdurur!";
            } else if (aq.slope > 0.4) {
                pTitle.textContent = "⚠️ Aşırı Kanal Eğimi: Aşınma ve Taşma Riski!";
                pText.textContent = "Eğim %0.4'ü aştığında su kanalda aşırı hızlanır, sürtünme ve erozyonla kemer taşlarına zarar verir. Mimar Sinan'ın binde 2'lik altın oranına dönün.";
            } else {
                pTitle.textContent = "🏛️ Kırkçeşme Su Yolu Yerçekimi İletimi";
                pText.textContent = "Kemer ayaklarındaki piramidal mahmuzlar ve tahliye pencereleri asırlık sellere meydan okumuştur.";
            }
        }
    } else if (wf.mode === "tech") {
        const tc = wf.tech;
        let totalSaving = 0;
        if (tc.aerator) totalSaving += 50;
        if (tc.drip) totalSaving += 65;
        if (tc.greywater) totalSaving += 30;

        const effectiveSaving = Math.min(85, totalSaving);
        const baseUsage = 150; // L/gün
        const currentUsage = Math.round(baseUsage * (1 - effectiveSaving / 100));

        if (mbMode) mbMode.textContent = "Tasarruf Teknolojileri";
        if (mbFlow) mbFlow.textContent = `${currentUsage} L/gün Tüketim`;
        if (mbSaving) mbSaving.textContent = `Toplam %${effectiveSaving} Tasarruf`;
        if (mbType) mbType.textContent = tc.greywater ? "Gri Su Geri Kazanıldı" : "Şebeke Suyu";

        if (lbl1) lbl1.textContent = "Kişi Başı Günlük Su";
        if (val1) val1.textContent = `${currentUsage} Litre`;
        if (lbl2) lbl2.textContent = "Net Tasarruf Oranı";
        if (val2) val2.textContent = `%${effectiveSaving}`;
        if (lbl3) lbl3.textContent = "Tasarruf Yöntemi";
        if (val3) val3.textContent = tc.aerator && tc.drip ? "Perlatör + Damla Sulama" : (tc.aerator ? "Perlatörlü Musluk" : (tc.drip ? "Damla Sulama" : "Geleneksel Tüketim"));
        if (lbl4) lbl4.textContent = "Sürdürülebilirlik Puanı";
        if (val4) val4.textContent = effectiveSaving >= 50 ? "A+ (Mükemmel Tasarruf)" : (effectiveSaving > 0 ? "B (İyi Seviye)" : "D (Aşırı İsraf)");

        if (pBox && pIcon && pTitle && pText) {
            pIcon.innerHTML = '<i class="fas fa-faucet-drip"></i>';
            if (effectiveSaving >= 50) {
                pTitle.textContent = "🌱 Harika Tasarruf! Su Kaynakları Güvence Altında";
                pText.textContent = "Perlatör musluk debisini %50 azaltırken basınç hissini korur. Damla sulama ise suyu buharlaşmadan doğrudan köke vererek %65 su tasarrufu sağlar.";
            } else {
                pTitle.textContent = "🚰 Geleneksel Kullanım: Su Ayak İzinizi Küçültün!";
                pText.textContent = "Perlatör takarak ve vahşi salma sulama yerine damla sulama sistemine geçerek su tüketiminizi %60'ın üzerinde düşürebilirsiniz.";
            }
        }
    } else {
        const fp = wf.footprint;
        const p = fp.products[fp.selectedProduct] || fp.products.shirt;

        if (mbMode) mbMode.textContent = "Hoekstra Terazisi";
        if (mbFlow) mbFlow.textContent = `${p.liters.toLocaleString('tr-TR')} L Su`;
        if (mbSaving) mbSaving.textContent = p.name;
        if (mbType) mbType.textContent = `Yeşil:%${p.green} · Mavi:%${p.blue} · Gri:%${p.grey}`;

        if (lbl1) lbl1.textContent = "Seçilen Sanayi/Tarım Ürünü";
        if (val1) val1.textContent = p.name;
        if (lbl2) lbl2.textContent = "Sanal (Gizli) Su Ayak İzi";
        if (val2) val2.textContent = `${p.liters.toLocaleString('tr-TR')} Litre`;
        if (lbl3) lbl3.textContent = "En Büyük Bileşen";
        if (val3) val3.textContent = p.green >= p.blue ? `Yeşil Su (%${p.green})` : `Mavi Su (%${p.blue})`;
        if (lbl4) lbl4.textContent = "Üretim Açıklaması";
        if (val4) val4.textContent = p.note;

        if (pBox && pIcon && pTitle && pText) {
            pIcon.innerHTML = '<i class="fas fa-balance-scale"></i>';
            pTitle.textContent = `📦 ${p.name}: ${p.liters.toLocaleString('tr-TR')} Litre Gizli Su!`;
            pText.textContent = `Prof. Arjen Hoekstra modeline göre 1 adet ${p.name} soframıza/gardırobumuza gelene kadar doğrudan ve dolaylı olarak ${p.liters.toLocaleString('tr-TR')} litre tatlı su tüketilir. İsrafı önlemek devasa su tasarrufu sağlar!`;
        }
    }

    // Quick Controls Bar Senkronizasyonu
    const bGates = document.getElementById('btn-water-gates-toggle');
    const lblGates = document.getElementById('label-water-gates');
    if (bGates && wf.aqueduct) {
        bGates.classList.toggle('active', !!wf.aqueduct.flood);
        if (lblGates) lblGates.textContent = wf.aqueduct.flood ? "Sel Gözleri: Açık" : "Sel Gözleri: Kapalı";
    }

    const bAer = document.getElementById('btn-water-aerator-toggle');
    const lblAer = document.getElementById('label-water-aerator');
    if (bAer && wf.tech) {
        bAer.classList.toggle('active', !!wf.tech.aerator);
        if (lblAer) lblAer.textContent = wf.tech.aerator ? "Perlatör: Açık (%50)" : "Perlatör: Kapalı";
    }

    const bIrr = document.getElementById('btn-water-irrigation-toggle');
    const lblIrr = document.getElementById('label-water-irrigation');
    if (bIrr && wf.tech) {
        bIrr.classList.toggle('active', !!wf.tech.drip);
        if (lblIrr) lblIrr.textContent = wf.tech.drip ? "Damla Sulama (%65)" : "Salma Sulama (Vahşi)";
    }

    const fpProd = wf.footprint ? wf.footprint.selectedProduct : 'shirt';
    const qProds = {
        'btn-footprint-tshirt': 'shirt',
        'btn-footprint-beef': 'beef',
        'btn-footprint-coffee': 'coffee',
        'btn-footprint-apple': 'apple'
    };
    Object.entries(qProds).forEach(([bid, pKey]) => {
        const el = document.getElementById(bid);
        if (el) el.classList.toggle('active', fpProd === pKey);
    });
}

function updateWaterFootprintPhysics() {
    const wf = labState.waterFootprint;
    wf.animTime += 0.05;

    if (wf.mode === "aqueduct") {
        const aq = wf.aqueduct;
        const speed = (aq.flow / 100.0) * (aq.slope * 4.0);
        aq.particles.forEach(pt => {
            pt.x += speed * (pt.vx / 3.0);
            pt.y += (aq.slope * 0.4);
            if (pt.x > 800) {
                pt.x = 0;
                pt.y = 110 + Math.random() * 18;
            }
        });
    } else if (wf.mode === "tech") {
        const tc = wf.tech;
        tc.particles.forEach(pt => {
            pt.y += pt.vy;
            if (pt.y > 340) {
                pt.y = 220;
                pt.x = 180 + (Math.random() - 0.5) * 16;
            }
        });
    }
}

// Zero-Canvas-Text Zırhı: Tuval üzerinde TEK BİR ctx.fillText YOKTUR!
function drawWaterFootprintSimulation() {
    if (!ctx || !canvas) return;

    const w = 800;
    const h = 500;
    ctx.save();
    ctx.clearRect(0, 0, w, h);

    const wf = labState.waterFootprint;
    if (wf.mode === "aqueduct") {
        drawAqueductSimulation(ctx, wf.aqueduct, wf.animTime);
    } else if (wf.mode === "tech") {
        drawSavingTechSimulation(ctx, wf.tech, wf.animTime);
    } else {
        drawFootprintScaleSimulation(ctx, wf.footprint, wf.animTime);
    }

    ctx.restore();
}

function drawAqueductSimulation(ctx, aq, t) {
    const w = 800;
    const h = 500;

    // Gökyüzü / Vadi Arka Planı
    const skyGrad = ctx.createLinearGradient(0, 0, 0, 360);
    skyGrad.addColorStop(0, '#0c1a30');
    skyGrad.addColorStop(0.6, '#1e293b');
    skyGrad.addColorStop(1, '#0f172a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Vadi Tabanı / Nehir Yatağı (y = 400 - 500)
    const valleyGrad = ctx.createLinearGradient(0, 400, 0, h);
    valleyGrad.addColorStop(0, '#1c1917');
    valleyGrad.addColorStop(0.4, '#0f172a');
    valleyGrad.addColorStop(1, '#020617');
    ctx.fillStyle = valleyGrad;
    ctx.fillRect(0, 400, w, 100);

    // Kırkçeşme / Vadi Dibi Durgun / Coşkun Akarsuyu
    const riverColor = aq.flood ? 'rgba(56, 189, 248, 0.7)' : 'rgba(14, 116, 144, 0.5)';
    ctx.fillStyle = riverColor;
    ctx.beginPath();
    ctx.moveTo(0, 430);
    for (let x = 0; x <= w; x += 40) {
        const wave = Math.sin(x * 0.02 + t * (aq.flood ? 4 : 1.5)) * (aq.flood ? 8 : 4);
        ctx.lineTo(x, 430 + wave);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // 🏛️ MAĞLOVA KEMERİ TAŞ MİMARİSİ (2 Katlı Kemer + Mahmuzlar + Sel Dehlizleri)
    const stoneGrad = ctx.createLinearGradient(0, 100, 0, 400);
    stoneGrad.addColorStop(0, '#d6d3d1');
    stoneGrad.addColorStop(0.3, '#a8a29e');
    stoneGrad.addColorStop(0.7, '#78716c');
    stoneGrad.addColorStop(1, '#57534e');
    ctx.fillStyle = stoneGrad;

    // 1. Kat (Alt Kat) 4 Taşıyıcı Ayak (Piers)
    const pierWidth = 55;
    const pierPositions = [120, 300, 480, 660];

    pierPositions.forEach(px => {
        // Alt ayak gövdesi
        ctx.fillStyle = stoneGrad;
        ctx.fillRect(px, 240, pierWidth, 170);

        // Sinan'ın Piramidal Sel Mahmuzları (Vadi akıntısını yaran üçgen mahmuzlar)
        ctx.fillStyle = '#44403c';
        ctx.beginPath();
        ctx.moveTo(px + pierWidth / 2, 430);
        ctx.lineTo(px - 14, 380);
        ctx.lineTo(px + pierWidth + 14, 380);
        ctx.closePath();
        ctx.fill();

        // 🌊 SEL DEHLİZİ (Tahliye Penceresi): Ayak ortasındaki delik
        ctx.fillStyle = aq.flood ? 'rgba(56, 189, 248, 0.85)' : '#0c0a09';
        ctx.beginPath();
        ctx.arc(px + pierWidth / 2, 320, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#292524';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Sel taşması durumunda sel dehlizinden fışkıran su jeti
        if (aq.flood) {
            ctx.fillStyle = 'rgba(125, 211, 252, 0.75)';
            ctx.beginPath();
            ctx.ellipse(px + pierWidth / 2, 345, 12, 25, 0, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Alt Kat Kemer Boşlukları (Kemerli Açıklıklar)
    ctx.fillStyle = '#0f172a';
    for (let i = 0; i < pierPositions.length - 1; i++) {
        const x1 = pierPositions[i] + pierWidth;
        const x2 = pierPositions[i + 1];
        const archCenter = (x1 + x2) / 2;
        const archR = (x2 - x1) / 2;

        ctx.beginPath();
        ctx.arc(archCenter, 290, archR, Math.PI, 0, false);
        ctx.lineTo(x2, 410);
        ctx.lineTo(x1, 410);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#a8a29e';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    // 2. Kat (Üst Kat) Kemerleri ve Taşıyıcı Döşemesi
    ctx.fillStyle = stoneGrad;
    ctx.fillRect(80, 220, 640, 22);

    for (let bx = 100; bx < 680; bx += 70) {
        // Üst kat minyatür kemer ayakları
        ctx.fillRect(bx, 130, 22, 90);

        // Üst kat kemer pencereleri
        ctx.fillStyle = '#0c1a30';
        ctx.beginPath();
        ctx.arc(bx + 35, 160, 18, Math.PI, 0, false);
        ctx.lineTo(bx + 53, 220);
        ctx.lineTo(bx + 17, 220);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = stoneGrad;
    }

    // En Üst Su Kanalı Tabliyesi (y = 110 - 130)
    ctx.fillStyle = '#57534e';
    ctx.fillRect(40, 126, 720, 10);

    // KANAL İÇİNDEKİ SU AKIŞI (Mimar Sinan %0.2 Hassas Yerçekimi Akışı)
    const slopeOffset = aq.slope * 15;
    const waterLevelY = 116;

    const waterGrad = ctx.createLinearGradient(0, 100, 0, 130);
    waterGrad.addColorStop(0, '#38bdf8');
    waterGrad.addColorStop(0.6, '#0284c7');
    waterGrad.addColorStop(1, '#0369a1');
    ctx.fillStyle = waterGrad;

    ctx.beginPath();
    ctx.moveTo(40, waterLevelY);
    for (let x = 40; x <= 760; x += 30) {
        const fall = ((x - 40) / 720) * slopeOffset;
        const wave = Math.sin(x * 0.04 + t * (2 + aq.slope * 5)) * (1.5 + aq.slope * 1.5);
        ctx.lineTo(x, waterLevelY + fall + wave);
    }
    ctx.lineTo(760, 128);
    ctx.lineTo(40, 128);
    ctx.closePath();
    ctx.fill();

    // Su parçacıkları / köpükleri
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    aq.particles.forEach(pt => {
        if (pt.x >= 45 && pt.x <= 755) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y + ((pt.x - 40) / 720) * slopeOffset, pt.size, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Taş Korkuluk Duvarı
    ctx.strokeStyle = '#78716c';
    ctx.lineWidth = 3;
    ctx.strokeRect(40, 112, 720, 16);
}

function drawSavingTechSimulation(ctx, tc, t) {
    const w = 800;
    const h = 500;

    // Arka Plan (Laboratuvar / Konut & Tarla Ayrımı)
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, w, h);

    // Dikey Ayırıcı İnce Neon Çizgi (Sol: Evsel Musluk, Sağ: Tarımsal Sulama)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(400, 30);
    ctx.lineTo(400, 460);
    ctx.stroke();
    ctx.setLineDash([]);

    // --- SOL BÖLÜM: EVSEL PERLATÖRLÜ MUSLUK VE LAVABO ---
    const faucetX = 180;
    const faucetY = 160;

    // Tezgah (y = 340)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(30, 340, 340, 120);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(30, 340, 340, 120);

    // Lavabo Çanağı
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.ellipse(faucetX, 345, 90, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.stroke();

    // Musluk Gövdesi (Krom Batarya)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(faucetX - 50, 320);
    ctx.lineTo(faucetX - 50, faucetY);
    ctx.arc(faucetX - 20, faucetY, 30, Math.PI, 0, false);
    ctx.lineTo(faucetX + 10, faucetY + 25);
    ctx.stroke();

    // Musluk Ucu (Perlatör Aparatı)
    ctx.fillStyle = tc.aerator ? '#34d399' : '#94a3b8';
    ctx.beginPath();
    ctx.roundRect(faucetX + 2, faucetY + 25, 16, 12, 3);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Musluktan Dökülen Su Sütunu
    const streamW = tc.aerator ? 12 : 6;
    const streamGrad = ctx.createLinearGradient(faucetX + 10 - streamW / 2, 0, faucetX + 10 + streamW / 2, 0);
    if (tc.aerator) {
        streamGrad.addColorStop(0, 'rgba(52, 211, 153, 0.6)');
        streamGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
        streamGrad.addColorStop(1, 'rgba(56, 189, 248, 0.6)');
    } else {
        streamGrad.addColorStop(0, 'rgba(56, 189, 248, 0.7)');
        streamGrad.addColorStop(0.5, 'rgba(186, 230, 253, 0.9)');
        streamGrad.addColorStop(1, 'rgba(56, 189, 248, 0.7)');
    }
    ctx.fillStyle = streamGrad;
    ctx.beginPath();
    ctx.roundRect(faucetX + 10 - streamW / 2, faucetY + 37, streamW, 160, 4);
    ctx.fill();

    // Perlatör Mikro Hava Kabarcıkları (Suyu dolgunlaştıran hava karışımı)
    if (tc.aerator) {
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 16; i++) {
            const bx = faucetX + 10 + (Math.sin(i * 1.5 + t * 4) * (streamW / 2 - 2));
            const by = faucetY + 45 + ((i * 10 + t * 40) % 150);
            ctx.beginPath();
            ctx.arc(bx, by, 1.8, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // --- SAĞ BÖLÜM: TARIMSAL DAMLA SULAMA VE BİTKİLER ---
    const fieldLeft = 430;
    const fieldTop = 320;

    // Toprak Zemini
    const soilGrad = ctx.createLinearGradient(0, fieldTop, 0, h);
    soilGrad.addColorStop(0, '#78350f');
    soilGrad.addColorStop(0.3, '#451a03');
    soilGrad.addColorStop(1, '#1c1917');
    ctx.fillStyle = soilGrad;
    ctx.fillRect(fieldLeft, fieldTop, 340, 140);

    // Damla Sulama Borusu (Siyah Polietilen Boru)
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(fieldLeft, fieldTop + 15);
    ctx.lineTo(fieldLeft + 340, fieldTop + 15);
    ctx.stroke();

    // 3 Bitki ve Damlatıcılar
    const plantPositions = [fieldLeft + 60, fieldLeft + 160, fieldLeft + 260];
    plantPositions.forEach(plX => {
        // Damlatıcı Nozul (Emitter)
        ctx.fillStyle = tc.drip ? '#10b981' : '#64748b';
        ctx.beginPath();
        ctx.arc(plX, fieldTop + 15, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Damlayan Su
        if (tc.drip) {
            const dropY = fieldTop + 24 + ((t * 35 + plX) % 35);
            ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
            ctx.beginPath();
            ctx.arc(plX, dropY, 3.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Bitki Sapı ve Yaprakları (Canlı Yeşil)
        ctx.strokeStyle = tc.drip ? '#22c55e' : '#84cc16';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(plX, fieldTop);
        ctx.quadraticCurveTo(plX - 8, fieldTop - 40, plX, fieldTop - 85);
        ctx.stroke();

        // Yapraklar
        ctx.fillStyle = tc.drip ? '#16a34a' : '#65a30d';
        ctx.beginPath();
        ctx.ellipse(plX - 16, fieldTop - 50, 16, 7, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(plX + 16, fieldTop - 65, 16, 7, 0.4, 0, Math.PI * 2);
        ctx.fill();

        // Kök Bölgesi (Toprak altında nem yayılımı)
        ctx.fillStyle = tc.drip ? 'rgba(56, 189, 248, 0.25)' : 'rgba(120, 53, 15, 0.4)';
        ctx.beginPath();
        ctx.arc(plX, fieldTop + 55, tc.drip ? 24 : 14, 0, Math.PI * 2);
        ctx.fill();
    });

    // --- ALT BÖLÜM: GRİ SU ARITIM ÜNİTESİ (Küçük Geri Kazanım Tankı) ---
    if (tc.greywater) {
        ctx.save();
        ctx.fillStyle = 'rgba(167, 139, 250, 0.2)';
        ctx.beginPath();
        ctx.roundRect(140, 390, 120, 60, 8);
        ctx.fill();
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Filtre Katmanları
        ctx.fillStyle = '#64748b';
        ctx.fillRect(145, 410, 110, 6);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(145, 425, 110, 18);
        ctx.restore();
    }
}

function drawFootprintScaleSimulation(ctx, fp, t) {
    const w = 800;
    const h = 500;

    // Arka Plan
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#0a0f1d');
    bgGrad.addColorStop(0.8, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    const prod = fp.products[fp.selectedProduct] || fp.products.shirt;

    // Terazi Parametreleri
    const pivotX = 400;
    const pivotY = 160;
    const armLen = 175;

    // Terazi Eğim Açısı: Su ağırlığına göre hafif salınım
    const targetAngle = -0.05 + Math.sin(t * 1.5) * 0.02;
    fp.scaleAngle += (targetAngle - fp.scaleAngle) * 0.08;

    // 1. TERAZİ ANA GÖVDESİ & TABANI (Pirinç/Krom Görünüm)
    const baseGrad = ctx.createLinearGradient(350, 0, 450, 0);
    baseGrad.addColorStop(0, '#475569');
    baseGrad.addColorStop(0.5, '#cbd5e1');
    baseGrad.addColorStop(1, '#334155');
    ctx.fillStyle = baseGrad;

    // Dikey Direk
    ctx.fillRect(pivotX - 8, pivotY, 16, 240);

    // Taban Tablası
    ctx.beginPath();
    ctx.roundRect(pivotX - 90, 395, 180, 18, 6);
    ctx.fill();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Pivot Başlığı
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // 2. TERAZİ DENGE KOLU (Rotasyonlu)
    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(fp.scaleAngle);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-armLen, 0);
    ctx.lineTo(armLen, 0);
    ctx.stroke();

    // Kefe Bağlantı Noktaları
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(-armLen, 0, 6, 0, Math.PI * 2);
    ctx.arc(armLen, 0, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // 3. SOL KEFE (Tüketilen Ürün)
    const leftX = pivotX - Math.cos(fp.scaleAngle) * armLen;
    const leftY = pivotY - Math.sin(fp.scaleAngle) * armLen;
    const panHangerLen = 95;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(leftX, leftY);
    ctx.lineTo(leftX - 45, leftY + panHangerLen);
    ctx.moveTo(leftX, leftY);
    ctx.lineTo(leftX + 45, leftY + panHangerLen);
    ctx.stroke();

    // Sol Kefe Tabağı
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.ellipse(leftX, leftY + panHangerLen, 55, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ürün Çizimi (Minimalist Şık İkonografi)
    drawProductIcon(ctx, leftX, leftY + panHangerLen - 28, fp.selectedProduct);

    // 4. SAĞ KEFE (Hoekstra Sanal Su Ayak İzi Kütlesi)
    const rightX = pivotX + Math.cos(fp.scaleAngle) * armLen;
    const rightY = pivotY + Math.sin(fp.scaleAngle) * armLen;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(rightX, rightY);
    ctx.lineTo(rightX - 45, rightY + panHangerLen);
    ctx.moveTo(rightX, rightY);
    ctx.lineTo(rightX + 45, rightY + panHangerLen);
    ctx.stroke();

    // Sağ Kefe Tabağı
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.ellipse(rightX, rightY + panHangerLen, 55, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Devasa Sanal Su Damlası (Su Hacmine Göre Ölçekli)
    const scaleFactor = Math.min(1.4, Math.max(0.6, Math.log10(prod.liters) / 3.0));
    drawHugeWaterDrop(ctx, rightX, rightY + panHangerLen - 40, scaleFactor, t);

    // 5. EN ALT: YEŞİL / MAVİ / GRİ SU BİLEŞENİ ORAN ÇUBUĞU (Zero-Canvas-Text)
    const barW = 320;
    const barH = 14;
    const barX = pivotX - barW / 2;
    const barY = 445;

    const gW = (prod.green / 100.0) * barW;
    const bW = (prod.blue / 100.0) * barW;
    const grW = barW - gW - bW;

    // Yeşil Su (Yağmur)
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(barX, barY, gW, barH);
    // Mavi Su (Yeraltı / Nehir)
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(barX + gW, barY, bW, barH);
    // Gri Su (Kirlilik Arıtma)
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(barX + gW + bW, barY, grW, barH);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(barX, barY, barW, barH);
}

function drawHugeWaterDrop(ctx, x, y, scale, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    const dropGrad = ctx.createRadialGradient(-6, -6, 4, 0, 8, 38);
    dropGrad.addColorStop(0, '#e0f2fe');
    dropGrad.addColorStop(0.3, '#38bdf8');
    dropGrad.addColorStop(0.8, '#0284c7');
    dropGrad.addColorStop(1, '#0369a1');
    ctx.fillStyle = dropGrad;

    ctx.beginPath();
    ctx.moveTo(0, -32);
    ctx.bezierCurveTo(22, -10, 32, 12, 32, 24);
    ctx.bezierCurveTo(32, 42, 18, 52, 0, 52);
    ctx.bezierCurveTo(-18, 52, -32, 42, -32, 24);
    ctx.bezierCurveTo(-32, 12, -22, -10, 0, -32);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Işık Yansıması
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.beginPath();
    ctx.ellipse(-10, 10, 5, 12, -0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawProductIcon(ctx, x, y, prodKey) {
    ctx.save();
    ctx.translate(x, y);

    if (prodKey === 'shirt') {
        // Pamuklu Tişört
        ctx.fillStyle = '#f87171';
        ctx.beginPath();
        ctx.moveTo(-18, -25);
        ctx.lineTo(-32, -10);
        ctx.lineTo(-24, 0);
        ctx.lineTo(-14, -6);
        ctx.lineTo(-14, 25);
        ctx.lineTo(14, 25);
        ctx.lineTo(14, -6);
        ctx.lineTo(24, 0);
        ctx.lineTo(32, -10);
        ctx.lineTo(18, -25);
        ctx.quadraticCurveTo(0, -18, -18, -25);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    } else if (prodKey === 'beef') {
        // 1 kg Dana Eti (Biftek / But silüeti)
        ctx.fillStyle = '#dc2626';
        ctx.beginPath();
        ctx.ellipse(0, 0, 26, 18, 0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fee2e2';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-8, -2, 6, 0, Math.PI * 2);
        ctx.fill();
    } else if (prodKey === 'coffee') {
        // Fincan Kahve
        ctx.fillStyle = '#f1f5f9';
        ctx.beginPath();
        ctx.arc(0, 5, 18, 0, Math.PI, false);
        ctx.lineTo(18, -8);
        ctx.lineTo(-18, -8);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Kulp
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(19, 4, 7, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();

        // Sıcak Buhar
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-6, -12);
        ctx.quadraticCurveTo(-10, -22, -6, -28);
        ctx.moveTo(4, -12);
        ctx.quadraticCurveTo(0, -22, 4, -28);
        ctx.stroke();
    } else if (prodKey === 'apple') {
        // Elma
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(-8, 2, 14, 0, Math.PI * 2);
        ctx.arc(8, 2, 14, 0, Math.PI * 2);
        ctx.fill();

        // Sap ve Yaprak
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(3, -20);
        ctx.stroke();

        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.ellipse(9, -16, 7, 3, -0.6, 0, Math.PI * 2);
        ctx.fill();
    } else {
        // A4 Kağıt
        ctx.fillStyle = '#f8fafc';
        ctx.beginPath();
        ctx.roundRect(-16, -24, 32, 46, 3);
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Çizgiler
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.5;
        for (let yl = -12; yl <= 12; yl += 6) {
            ctx.beginPath();
            ctx.moveTo(-10, yl);
            ctx.lineTo(10, yl);
            ctx.stroke();
        }
    }

    ctx.restore();
}


// Global Tarayıcı Erişimi
if (typeof window !== "undefined") {
    window.FenUpLab = {
        initLabModule,
        openLabView,
        closeLabView,
        openExperimentWorkspace,
        closeExperimentWorkspace,
        resetCurrentExperiment,
        toggleLabFullscreen,
        setIncidentAngle,
        EXPERIMENTS_DATABASE,
        labState
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLabModule);
    } else {
        initLabModule();
    }
}
