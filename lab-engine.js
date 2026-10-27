/**
 * FenUp X — Sanal Bilim Laboratuvarı & İnteraktif Deney Motoru (lab-engine.js)
 * MEB Türkiye Yüzyılı Maarif Modeli Uyumlu
 * Geliştirici: MistralX-RK / FenUp X Ekibi
 * Sıfır Dış Bağımlılık (Vanilla ES6+ & HTML5 Canvas 2D)
 */

// --- 1. TÜM SINIFLAR İÇİN 26 DENEYLİK RESMİ MAARİF MODELİ KATALOĞU ---
export const EXPERIMENTS_DATABASE = [
    // 5. SINIF (8 DENEY)
    {
        id: "5.1", grade: 5, unit: 1, unitName: "Gökyüzündeki Komşularımız ve Biz",
        title: "Ay'ın Evreleri ve Yörünge Konum Simülatörü",
        code: "FB.5.1.2 - FB.5.1.3", bookRef: "1. Kitap, s. 28–39",
        active: false,
        desc: "Ay'ın Dünya etrafındaki dolanma açısına göre Güneş ışığının aydınlattığı alanı ve Dünya'dan görünen evrelerini inceleyin."
    },
    {
        id: "5.2", grade: 5, unit: 2, unitName: "Kuvveti Tanıyalım",
        title: "Dinamometre ile Yay Esnekliği ve Kuvvet Ölçümü",
        code: "FB.5.2.1 - FB.5.2.2", bookRef: "1. Kitap, s. 60–73",
        active: false,
        desc: "Farklı yay kalınlıklarında uygulanan kuvvete bağlı olarak uzama miktarını ölçün ve yay esneklik sınırını keşfedin."
    },
    {
        id: "5.3", grade: 5, unit: 2, unitName: "Kuvveti Tanıyalım",
        title: "Sürtünme Kuvveti ve Yüzey Türleri Laboratuvarı",
        code: "FB.5.2.3", bookRef: "1. Kitap, s. 74–87",
        active: false,
        desc: "Buz, tahta, zımpara ve çim zeminlerde hareket eden takozun durma mesafesini ve sürtünme ivmesini karşılaştırın."
    },
    {
        id: "5.4", grade: 5, unit: 3, unitName: "Işığın Dünyası",
        title: "Işığın Doğrusal Yayılması Testi",
        code: "FB.5.3.1", bookRef: "1. Kitap, s. 102–111",
        active: false,
        desc: "Delikli karton plakaları aynı eksene getirerek ışığın doğrusal yolla yayıldığını kanıtlayın."
    },
    {
        id: "5.5", grade: 5, unit: 3, unitName: "Işığın Dünyası",
        title: "Tam Gölge Boyutu ve Mesafe Simülatörü",
        code: "FB.5.3.2", bookRef: "1. Kitap, s. 112–125",
        active: false,
        desc: "Işık kaynağı, opak cisim ve perde arasındaki mesafeleri değiştirerek tam gölgenin boyut değişimini gözlemleyin."
    },
    {
        id: "5.6", grade: 5, unit: 4, unitName: "Maddenin Değişimi",
        title: "Sıvılarda Isı Alışverişi ve Denge Sıcaklığı",
        code: "FB.5.4.1", bookRef: "2. Kitap, s. 14–27",
        active: false,
        desc: "Farklı sıcaklık ve kütlelerdeki sıvıları karıştırarak ısının sıcaktan soğuğa akışını ve denge sıcaklığını ölçün."
    },
    {
        id: "5.7", grade: 5, unit: 4, unitName: "Maddenin Değişimi",
        title: "Saf Maddelerde Isınma-Kaynama Hâl Değişimi Grafiği",
        code: "FB.5.4.2", bookRef: "2. Kitap, s. 28–41",
        active: false,
        desc: "Isıtılan saf suyun sıcaklık-zaman grafiğini çizerek kaynama süresince sıcaklığın neden sabit kaldığını inceleyin."
    },
    {
        id: "5.8", grade: 5, unit: 6, unitName: "Yaşamımızda Elektrik",
        title: "Basit Elektrik Devresinde Pil ve Ampul Parlaklığı",
        code: "FB.5.6.1", bookRef: "2. Kitap, s. 100–117",
        active: false,
        desc: "Seri bağlı pil ve ampul sayılarını bağımsız değişken olarak değiştirip devre parlaklığını test edin."
    },

    // 6. SINIF (9 DENEY)
    {
        id: "6.1", grade: 6, unit: 2, unitName: "Kuvvet ve Hareket",
        title: "Sabit Süratli Hareket Simülatörü",
        code: "FB.6.2.1", bookRef: "1. Kitap, s. 70–85",
        active: true, // 🏆 AKTİF!
        desc: "100 metrelik ölçüm pistinde sabit süratle ilerleyen aracın yol-zaman ve sürat-zaman grafiklerini eşzamanlı inceleyin."
    },
    {
        id: "6.2", grade: 6, unit: 2, unitName: "Kuvvet ve Hareket",
        title: "Bileşke Kuvvet ve Halat Çekmece",
        code: "FB.6.2.2", bookRef: "1. Kitap, s. 54–69",
        active: true, // 🏆 AKTİF!
        desc: "Doğu ve batı yönlü kuvvetleri cisme uygulayarak bileşke kuvveti (R), hareket yönünü ve dengelenmiş / dengelenmemiş kuvvet durumlarını test edin."
    },
    {
        id: "6.3", grade: 6, unit: 3, unitName: "Madde ve Isı",
        title: "Sıvıların Yoğunluğu ve Yoğunluk Kulesi",
        code: "FB.6.3.2", bookRef: "1. Kitap, s. 126–139",
        active: true, // 🏆 AKTİF!
        desc: "Bal, gliserin, su ve zeytinyağını aynı silindire dökerek tabakalaşmayı ve içine bırakılan cisimlerin yüzme-batma hallerini gözlemleyin."
    },
    {
        id: "6.4", grade: 6, unit: 3, unitName: "Madde ve Isı",
        title: "Isı İletkenliği ve Yalıtım Simülatörü",
        code: "FB.6.4.1", bookRef: "1. Kitap, s. 140–155",
        active: true, // 🏆 AKTİF!
        desc: "Bakır, alüminyum ve demir çubuklarda ısının iletim hızını balmumuna bağlı bilyelerin düşmesiyle ve binalarda ısı yalıtımını karşılaştırın."
    },
    {
        id: "6.5", grade: 6, unit: 1, unitName: "Güneş Sistemi ve Tutulmalar",
        title: "Güneş ve Ay Tutulması Geometrisi Simülatörü",
        code: "FB.6.1.1", bookRef: "1. Kitap, s. 16–29",
        active: false,
        desc: "Güneş, Dünya ve Ay'ın yörünge düğüm noktalarını hizalayarak tam ve parçalı tutulmaların oluşumunu simüle edin."
    },
    {
        id: "6.6", grade: 6, unit: 4, unitName: "Işık ve Ses",
        title: "Düzlem Aynada Yansıma Kanunları (i = r)",
        code: "FB.6.4.1", bookRef: "2. Kitap, s. 14–29",
        active: false,
        desc: "Açıölçer üzerinde lazer ışınını aynaya göndererek gelme açısı ile yansıma açısının eşitliğini doğrulayın."
    },
    {
        id: "6.7", grade: 6, unit: 4, unitName: "Işık ve Ses",
        title: "Işığın Soğurulması ve Renklerin Isınma Etkisi",
        code: "FB.6.4.2", bookRef: "2. Kitap, s. 30–43",
        active: false,
        desc: "Siyah, beyaz ve renkli kumaşların ışığı soğurma miktarlarını sıcaklık artışı sensörleriyle eşzamanlı izleyin."
    },
    {
        id: "6.8", grade: 6, unit: 6, unitName: "Madde ve Elektrik",
        title: "İletken ve Yalıtkan Maddeleri Test Devresi",
        code: "FB.6.6.1", bookRef: "2. Kitap, s. 92–105",
        active: false,
        desc: "Timsah ağızlı test uçlarına katı ve sıvı maddeler bağlayarak elektrik iletkenliklerini ampul parlaklığıyla test edin."
    },
    {
        id: "6.9", grade: 6, unit: 6, unitName: "Madde ve Elektrik",
        title: "İletkenin Direncini Etkileyen Faktörler (L, S) ve Reosta",
        code: "FB.6.6.2", bookRef: "2. Kitap, s. 106–121",
        active: false,
        desc: "İletken telin boyu, kesit alanı ve cinsini değiştirerek devre direncindeki ve ampul parlaklığındaki değişimi gözlemleyin."
    },

    // 7. SINIF (9 DENEY)
    {
        id: "7.1", grade: 7, unit: 2, unitName: "Kuvvet ve Enerjiyi Keşfedelim",
        title: "Fiziksel Anlamda İş ve Enerji Simülatörü",
        code: "FB.7.2.1", bookRef: "1. Kitap, s. 60–71",
        active: true, // 🏆 AKTİF!
        desc: "Kuvvetin büyüklüğü, yönü ve yer değiştirme doğrultusunu kontrol ederek fen anlamında iş yapılıp yapılmadığını ve 4 temel kavram yanılgısını test edin."
    },
    {
        id: "7.2", grade: 7, unit: 2, unitName: "Kuvvet ve Enerjiyi Keşfedelim",
        title: "Mekanik Enerji Dönüşümü (Sarkaç ve Rampa)",
        code: "FB.7.2.2 - FB.7.2.3", bookRef: "1. Kitap, s. 60–77",
        active: true, // 🏆 AKTİF!
        desc: "Salınan sarkaç veya kaykaycı üzerinde potansiyel ve kinetik enerjinin birbirine dönüşümünü ve sürtünme etkisini inceleyin."
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
        desc: "İnce ve kalın kenarlı merceklerde ışınların toplanma/dağılma fiziğini, odak noktasını (F) ve mum cisminin oluşan görüntüsünü inceleyin."
    },
    {
        id: "7.5", grade: 7, unit: 5, unitName: "Maddenin Doğasına Yolculuk",
        title: "Çözünme Hızını Etkileyen Faktörler Simülatörü",
        code: "FB.7.5.4 - FB.7.5.9", bookRef: "2. Kitap, s. 90–105",
        active: true, // 🏆 AKTİF!
        desc: "Sıcaklık, temas yüzeyi (pudra/toz/küp şeker) ve karıştırmanın çözünme süresine etkisini 3 beherli kontrollü deney düzeneğinde eşzamanlı test edin."
    },
    {
        id: "7.6", grade: 7, unit: 5, unitName: "Maddenin Doğasına Yolculuk",
        title: "Karışımların Ayrılması Simülatörü (Ayırma Hunisi ve Basit Damıtma)",
        code: "FB.7.5.5", bookRef: "2. Kitap, s. 106–125",
        active: true, // 🏆 AKTİF!
        desc: "Zeytinyağı-su heterojen karışımını ayırma hunisinde yoğunluk farkıyla, homojen alkol-su çözeltisini basit damıtmada kaynama noktası farkıyla saflaştırın."
    },
    {
        id: "7.7", grade: 7, unit: 6, unitName: "Elektriklenme",
        title: "Sürtünme ve Dokunma ile Elektriklenme Simülatörü",
        code: "FB.7.6.1 - FB.7.6.2", bookRef: "2. Kitap, s. 106–125",
        active: true, // 🏆 AKTİF!
        desc: "Ebonit çubuğu yün kumaşa, cam çubuğu ipek kumaşa sürterek elektron transferini, kağıt çekimini ve dokunma ile yük paylaşımını deneyimleyin."
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
        title: "Besin Piramidinde Enerji Akışı ve Biyobirikim Simülatörü",
        code: "FB.7.7.1", bookRef: "2. Kitap, s. 136–149",
        active: true, // 🏆 AKTİF!
        desc: "Üreticiden tepe avcıya aktarılan enerjinin azalışını (%10 kuralı) ve tarım ilacı zehirlerinin katlanarak birikimini gözlemleyin."
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

    // DENEY 6.1: SABİT SÜRATLİ HAREKET SİMÜLATÖRÜ (FB.6.2.1)
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

    // DENEY 6.2: BİLEŞKE KUVVET VE HALAT ÇEKMECE (FB.6.2.2)
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

    // DENEY 6.3: SIVILARIN YOĞUNLUĞU VE YOĞUNLUK KULESİ (FB.6.3.2)
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

    // DENEY 6.4: ISI İLETKENLİĞİ VE YALITIM SİMÜLATÖRÜ (FB.6.4.1)
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

    // 4. Mobil Tab Seçicileri
    document.querySelectorAll('.lab-tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            const tabKey = tabBtn.dataset.tab;
            document.querySelectorAll('.lab-tab-btn').forEach(b => b.classList.remove('active'));
            tabBtn.classList.add('active');

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

    // 13. 6. SINIF KONTROLLERİ (DENEY 6.1 - 6.4)
    setupMotionControlsDOM();
    setupTugOfWarControlsDOM();
    setupDensityTowerControlsDOM();
    setupHeatTransferControlsDOM();

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

    // Başlık ve Rozetleri Güncelle
    const expBadge = document.getElementById('lab-exp-badge');
    const expTitle = document.getElementById('lab-exp-title');
    const expRef = document.getElementById('lab-exp-ref');
    if (expBadge) expBadge.textContent = `${exp.grade}. Sınıf / ${exp.unit}. Ünite · ${exp.code}`;
    if (expTitle) expTitle.textContent = `${exp.id}: ${exp.title}`;
    if (expRef) expRef.textContent = exp.bookRef;

    // Deneye Göre Arayüz Panellerini Aç / Kapat
    const is61 = (expId === "6.1");
    const is62 = (expId === "6.2");
    const is63 = (expId === "6.3");
    const is64 = (expId === "6.4");
    const is71 = (expId === "7.1");
    const is72 = (expId === "7.2");
    const is73 = (expId === "7.3");
    const is74 = (expId === "7.4");
    const is75 = (expId === "7.5");
    const is76 = (expId === "7.6");
    const is77 = (expId === "7.7");
    const is78 = (expId === "7.8");
    const is79 = (expId === "7.9");

    // Metrik Şeritleri (Canvas Altı Responsive Barlar)
    const mbar61 = document.getElementById('metrics-bar-6-1');
    const mbar62 = document.getElementById('metrics-bar-6-2');
    const mbar63 = document.getElementById('metrics-bar-6-3');
    const mbar64 = document.getElementById('metrics-bar-6-4');
    const mbar73 = document.getElementById('metrics-bar-7-3');
    const mbar71 = document.getElementById('metrics-bar-7-1');
    if (mbar61) mbar61.classList.toggle('is-hidden', !is61);
    if (mbar62) mbar62.classList.toggle('is-hidden', !is62);
    if (mbar63) mbar63.classList.toggle('is-hidden', !is63);
    if (mbar64) mbar64.classList.toggle('is-hidden', !is64);
    if (mbar73) mbar73.classList.toggle('is-hidden', !is73);
    if (mbar71) mbar71.classList.toggle('is-hidden', !is71);

    // Hızlı Kontroller (Canvas Altı)
    const qc61 = document.getElementById('quick-controls-6-1');
    const qc62 = document.getElementById('quick-controls-6-2');
    const qc63 = document.getElementById('quick-controls-6-3');
    const qc64 = document.getElementById('quick-controls-6-4');
    const qc71 = document.getElementById('quick-controls-7-1');
    const qc72 = document.getElementById('quick-controls-7-2');
    const qc73 = document.getElementById('quick-controls-7-3');
    const qc74 = document.getElementById('quick-controls-7-4');
    const qc75 = document.getElementById('quick-controls-7-5');
    const qc76 = document.getElementById('quick-controls-7-6');
    const qc77 = document.getElementById('quick-controls-7-7');
    const qc78 = document.getElementById('quick-controls-7-8');
    const qc79 = document.getElementById('quick-controls-7-9');
    if (qc61) qc61.classList.toggle('is-hidden', !is61);
    if (qc62) qc62.classList.toggle('is-hidden', !is62);
    if (qc63) qc63.classList.toggle('is-hidden', !is63);
    if (qc64) qc64.classList.toggle('is-hidden', !is64);
    if (qc71) qc71.classList.toggle('is-hidden', !is71);
    if (qc72) qc72.classList.toggle('is-hidden', !is72);
    if (qc73) qc73.classList.toggle('is-hidden', !is73);
    if (qc74) qc74.classList.toggle('is-hidden', !is74);
    if (qc75) qc75.classList.toggle('is-hidden', !is75);
    if (qc76) qc76.classList.toggle('is-hidden', !is76);
    if (qc77) qc77.classList.toggle('is-hidden', !is77);
    if (qc78) qc78.classList.toggle('is-hidden', !is78);
    if (qc79) qc79.classList.toggle('is-hidden', !is79);

    // Değişkenler Panelleri
    const vars61 = document.getElementById('vars-container-6-1');
    const vars62 = document.getElementById('vars-container-6-2');
    const vars63 = document.getElementById('vars-container-6-3');
    const vars64 = document.getElementById('vars-container-6-4');
    const vars71 = document.getElementById('vars-container-7-1');
    const vars72 = document.getElementById('vars-container-7-2');
    const vars73 = document.getElementById('vars-container-7-3');
    const vars74 = document.getElementById('vars-container-7-4');
    const vars75 = document.getElementById('vars-container-7-5');
    const vars76 = document.getElementById('vars-container-7-6');
    const vars77 = document.getElementById('vars-container-7-7');
    const vars78 = document.getElementById('vars-container-7-8');
    const vars79 = document.getElementById('vars-container-7-9');
    if (vars61) vars61.classList.toggle('is-hidden', !is61);
    if (vars62) vars62.classList.toggle('is-hidden', !is62);
    if (vars63) vars63.classList.toggle('is-hidden', !is63);
    if (vars64) vars64.classList.toggle('is-hidden', !is64);
    if (vars71) vars71.classList.toggle('is-hidden', !is71);
    if (vars72) vars72.classList.toggle('is-hidden', !is72);
    if (vars73) vars73.classList.toggle('is-hidden', !is73);
    if (vars74) vars74.classList.toggle('is-hidden', !is74);
    if (vars75) vars75.classList.toggle('is-hidden', !is75);
    if (vars76) vars76.classList.toggle('is-hidden', !is76);
    if (vars77) vars77.classList.toggle('is-hidden', !is77);
    if (vars78) vars78.classList.toggle('is-hidden', !is78);
    if (vars79) vars79.classList.toggle('is-hidden', !is79);

    // Rehber Panelleri
    const guide61 = document.getElementById('guide-container-6-1');
    const guide62 = document.getElementById('guide-container-6-2');
    const guide63 = document.getElementById('guide-container-6-3');
    const guide64 = document.getElementById('guide-container-6-4');
    const guide71 = document.getElementById('guide-container-7-1');
    const guide72 = document.getElementById('guide-container-7-2');
    const guide73 = document.getElementById('guide-container-7-3');
    const guide74 = document.getElementById('guide-container-7-4');
    const guide75 = document.getElementById('guide-container-7-5');
    const guide76 = document.getElementById('guide-container-7-6');
    const guide77 = document.getElementById('guide-container-7-7');
    const guide78 = document.getElementById('guide-container-7-8');
    const guide79 = document.getElementById('guide-container-7-9');
    if (guide61) guide61.classList.toggle('is-hidden', !is61);
    if (guide62) guide62.classList.toggle('is-hidden', !is62);
    if (guide63) guide63.classList.toggle('is-hidden', !is63);
    if (guide64) guide64.classList.toggle('is-hidden', !is64);
    if (guide71) guide71.classList.toggle('is-hidden', !is71);
    if (guide72) guide72.classList.toggle('is-hidden', !is72);
    if (guide73) guide73.classList.toggle('is-hidden', !is73);
    if (guide74) guide74.classList.toggle('is-hidden', !is74);
    if (guide75) guide75.classList.toggle('is-hidden', !is75);
    if (guide76) guide76.classList.toggle('is-hidden', !is76);
    if (guide77) guide77.classList.toggle('is-hidden', !is77);
    if (guide78) guide78.classList.toggle('is-hidden', !is78);
    if (guide79) guide79.classList.toggle('is-hidden', !is79);

    if (is61) {
        initMotionState();
    } else if (is62) {
        initTugOfWarState();
    } else if (is63) {
        initDensityTowerState();
    } else if (is64) {
        initHeatTransferState();
    } else if (is71) {
        initWorkState();
    } else if (is72) {
        initEnergyState();
    } else if (is75) {
        initDissolveState();
    } else if (is76) {
        initSeparationState();
    } else if (is77) {
        initElectroState();
    } else if (is78) {
        initElectroscopeState();
    } else if (is79) {
        initFoodPyramidState();
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
    if (labState.activeExperimentId === "6.1") {
        resetMotionExperiment();
    } else if (labState.activeExperimentId === "6.2") {
        resetTugOfWarExperiment();
    } else if (labState.activeExperimentId === "6.3") {
        resetDensityTowerExperiment();
    } else if (labState.activeExperimentId === "6.4") {
        resetHeatTransferExperiment();
    } else if (labState.activeExperimentId === "7.1") {
        resetWorkExperiment();
    } else if (labState.activeExperimentId === "7.2") {
        resetEnergyExperiment();
    } else if (labState.activeExperimentId === "7.5") {
        resetDissolveExperiment();
    } else if (labState.activeExperimentId === "7.6") {
        resetSeparationExperiment();
    } else if (labState.activeExperimentId === "7.7") {
        resetElectroExperiment();
    } else if (labState.activeExperimentId === "7.8") {
        resetElectroscopeExperiment();
    } else if (labState.activeExperimentId === "7.9") {
        resetFoodPyramidExperiment();
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

    if (labState.activeExperimentId === "6.1") {
        initMotionState();
    } else if (labState.activeExperimentId === "6.2") {
        initTugOfWarState();
    } else if (labState.activeExperimentId === "6.3") {
        initDensityTowerState();
    } else if (labState.activeExperimentId === "6.4") {
        initHeatTransferState();
    } else if (labState.activeExperimentId === "7.1") {
        initWorkState();
    } else if (labState.activeExperimentId === "7.2") {
        initEnergyState();
    } else if (labState.activeExperimentId === "7.3") {
        calculateOpticsPhysics();
    } else if (labState.activeExperimentId === "7.4") {
        calculateLensPhysics();
    } else if (labState.activeExperimentId === "7.5") {
        initDissolveState();
    } else if (labState.activeExperimentId === "7.6") {
        initSeparationState();
    } else if (labState.activeExperimentId === "7.7") {
        initElectroState();
    } else if (labState.activeExperimentId === "7.8") {
        initElectroscopeState();
    } else if (labState.activeExperimentId === "7.9") {
        initFoodPyramidState();
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
            if (labState.activeExperimentId === "6.1") {
                updateMotionPhysics();
                drawMotionSimulation();
            } else if (labState.activeExperimentId === "6.2") {
                updateTugOfWarPhysics();
                drawTugOfWarSimulation();
            } else if (labState.activeExperimentId === "6.3") {
                updateDensityTowerPhysics();
                drawDensityTowerSimulation();
            } else if (labState.activeExperimentId === "6.4") {
                updateHeatTransferPhysics();
                drawHeatTransferSimulation();
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
                updateDissolvePhysics();
                drawDissolveSimulation();
            } else if (labState.activeExperimentId === "7.6") {
                updateSeparationPhysics();
                drawSeparationSimulation();
            } else if (labState.activeExperimentId === "7.7") {
                updateElectroPhysics();
                drawElectroSimulation();
            } else if (labState.activeExperimentId === "7.8") {
                updateElectroscopePhysics();
                drawElectroscopeSimulation();
            } else if (labState.activeExperimentId === "7.9") {
                updateFoodPyramidEcology();
                drawFoodPyramidSimulation();
            }
        }
        if (labState.activeExperimentId) {
            animFrameId = requestAnimationFrame(render);
        }
    };
    animFrameId = requestAnimationFrame(render);
}

// ============================================================================
// --- 6.1. DENEY 6.1: SABİT SÜRATLİ HAREKET SİMÜLATÖRÜ (FB.6.2.1) ---
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

    // Sürat Hızlı Butonları
    [5, 10, 20].forEach(spd => {
        const btn = document.getElementById(`btn-motion-speed-${spd}`);
        if (btn) btn.classList.toggle('active', m.speed === spd);
    });

    // Pist Uzunluğu Butonları
    [50, 100, 150].forEach(len => {
        const pill = document.getElementById(`pill-track-${len}`);
        if (pill) pill.classList.toggle('active', m.trackLength === len);
    });

    // Grafik Butonları
    const pillXt = document.getElementById('pill-graph-xt');
    const pillVt = document.getElementById('pill-graph-vt');
    if (pillXt) pillXt.classList.toggle('active', m.graphMode === "xt");
    if (pillVt) pillVt.classList.toggle('active', m.graphMode === "vt");
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
        const btn = document.getElementById(`btn-motion-speed-${spd}`);
        if (btn) {
            btn.addEventListener('click', () => {
                labState.motion.speed = spd;
                updateMotionDOMControls();
                updateMotionMetricsDOM();
                showLabToast(`Sabit Sürat: ${spd} m/s olarak ayarlandı`);
            });
        }
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
                const btn = document.getElementById(`btn-motion-speed-${spd}`);
                if (btn) btn.classList.toggle('active', val === spd);
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
    const pillXt = document.getElementById('pill-graph-xt');
    const pillVt = document.getElementById('pill-graph-vt');
    if (pillXt) {
        pillXt.addEventListener('click', () => {
            labState.motion.graphMode = "xt";
            updateMotionDOMControls();
            showLabToast("Canlı Grafik: Yol - Zaman (x - t) eğrisi");
        });
    }
    if (pillVt) {
        pillVt.addEventListener('click', () => {
            labState.motion.graphMode = "vt";
            updateMotionDOMControls();
            showLabToast("Canlı Grafik: Sürat - Zaman (v - t) eğrisi");
        });
    }

    // 7. Gözlem Kayıt Butonu
    const btnRecord = document.getElementById('btn-record-data-6-1');
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

    // Canvas Altı Responsive Metrik Şeridi (#metrics-bar-6-1)
    const mbDist = document.getElementById('mbar-61-dist');
    const mbTime = document.getElementById('mbar-61-time');
    const mbSpeed = document.getElementById('mbar-61-speed');
    const mbStatus = document.getElementById('mbar-61-status');

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
    const pTime = document.getElementById('metric-61-time');
    const pDist = document.getElementById('metric-61-dist');
    const pSpeed = document.getElementById('metric-61-speed');
    const pStatus = document.getElementById('metric-61-status');
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
// --- 6.3. DENEY 6.3: SIVILARIN YOĞUNLUĞU VE YOĞUNLUK KULESİ (FB.6.3.2) ---
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
    const btnRecord = document.getElementById('btn-record-data-6-3');
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

    // Canvas Altı Responsive Metrik Şeridi (#metrics-bar-6-3)
    const mbCount = document.getElementById('mbar-63-liquid-count');
    const mbBottom = document.getElementById('mbar-63-bottom-layer');
    const mbTop = document.getElementById('mbar-63-top-layer');
    const mbStatus = document.getElementById('mbar-63-status');

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
    const pCount = document.getElementById('metric-63-count');
    const pBottom = document.getElementById('metric-63-bottom');
    const pTop = document.getElementById('metric-63-top');
    const pObj = document.getElementById('metric-63-object');
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
    ht.mode = "metals";
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
    const btnRecord = document.getElementById('btn-record-data-6-4');
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

    // Canvas Altı Responsive Metrik Şeridi (#metrics-bar-6-4)
    const mbBurner = document.getElementById('mbar-64-burner');
    const mbCopper = document.getElementById('mbar-64-copper');
    const mbAl = document.getElementById('mbar-64-aluminum');
    const mbIron = document.getElementById('mbar-64-iron');

    if (mbBurner) {
        mbBurner.textContent = ht.isHeating ? "🔥 Yanıyor" : "Sönük";
        mbBurner.style.color = ht.isHeating ? "#ef4444" : "#94a3b8";
    }

    const c = ht.rods[0];
    const al = ht.rods[1];
    const fe = ht.rods[2];

    if (mbCopper) {
        mbCopper.textContent = c.ballDropped ? `🥇 Düştü (${fmt(c.dropTime, 1)} s)` : `${fmt(c.temp, 0)}°C`;
    }
    if (mbAl) {
        mbAl.textContent = al.ballDropped ? `🥈 Düştü (${fmt(al.dropTime, 1)} s)` : `${fmt(al.temp, 0)}°C`;
    }
    if (mbIron) {
        mbIron.textContent = fe.ballDropped ? `🥉 Düştü (${fmt(fe.dropTime, 1)} s)` : `${fmt(fe.temp, 0)}°C`;
    }

    // Sağ Panel Metrikleri
    const pCop = document.getElementById('metric-64-copper');
    const pAl = document.getElementById('metric-64-aluminum');
    const pFe = document.getElementById('metric-64-iron');
    const pFlame = document.getElementById('metric-64-flame');

    if (pCop) pCop.textContent = c.ballDropped ? `Düştü (${fmt(c.dropTime, 1)} s)` : `${fmt(c.temp, 0)}°C`;
    if (pAl) pAl.textContent = al.ballDropped ? `Düştü (${fmt(al.dropTime, 1)} s)` : `${fmt(al.temp, 0)}°C`;
    if (pFe) pFe.textContent = fe.ballDropped ? `Düştü (${fmt(fe.dropTime, 1)} s)` : `${fmt(fe.temp, 0)}°C`;
    if (pFlame) pFlame.textContent = ht.isHeating ? "Yanıyor" : "Sönük";
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
    const mDisp = document.getElementById('mbar-work-disp');

    if (mJoule) {
        mJoule.textContent = work.isWorkDone ? `${work.appliedWork.toFixed(1)} J` : '0.0 J';
        mJoule.style.color = work.isWorkDone ? '#10b981' : '#ef4444';
    }
    if (mStatus) {
        if (work.isPlaying) {
            mStatus.textContent = "Hareket Ediyor...";
            mStatus.style.color = "#38bdf8";
        } else if (work.isWorkDone) {
            mStatus.textContent = "✅ İş Yapıldı";
            mStatus.style.color = "#10b981";
        } else {
            mStatus.textContent = "❌ İş Yapılmadı";
            mStatus.style.color = "#ef4444";
        }
    }
    if (mForce) {
        mForce.textContent = `${work.force.toFixed(0)} N`;
    }
    if (mDisp) {
        const curD = work.currentDisplacement !== undefined ? work.currentDisplacement : (work.progress * work.distance);
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

    // Metre cetveli çizimi
    for (let m = 0; m <= 10; m++) {
        const tx = x0 + m * meterScale;
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tx, groundY);
        ctx.lineTo(tx, groundY + 8);
        ctx.stroke();

        if (m % 2 === 0) {
            ctx.font = '10px Inter, sans-serif';
            ctx.fillStyle = '#94a3b8';
            ctx.textAlign = 'center';
            ctx.fillText(`${m}m`, tx, groundY + 22);
        }
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
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(rulerX - 6, ry);
        ctx.lineTo(rulerX, ry);
        ctx.stroke();

        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'right';
        ctx.fillText(`${m}m`, rulerX - 10, ry + 3);
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

    // Metre cetveli çizimi
    for (let m = 0; m <= 10; m++) {
        const tx = x0 + m * meterScale;
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tx, groundY);
        ctx.lineTo(tx, groundY + 8);
        ctx.stroke();

        if (m % 2 === 0) {
            ctx.font = '10px Inter, sans-serif';
            ctx.fillStyle = '#94a3b8';
            ctx.textAlign = 'center';
            ctx.fillText(`${m}m`, tx, groundY + 22);
        }
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

    // Metin etiketi
    if (label) {
        ctx.shadowBlur = 0;
        ctx.font = 'bold 11px Inter, sans-serif';
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2;
        const metrics = ctx.measureText(label);
        const padX = 6;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(
            midX - metrics.width / 2 - padX,
            midY + labelOffset - 11,
            metrics.width + padX * 2,
            16,
            4
        );
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.fillText(label, midX, midY + labelOffset + 1);
    }

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
    const boxW = 124 * scale;
    const boxH = 270 * scale;

    ctx.save();

    // Arka plan paneli
    ctx.fillStyle = "rgba(10, 16, 30, 0.88)";
    ctx.strokeStyle = "rgba(0, 210, 255, 0.25)";
    ctx.lineWidth = 1.5 * scale;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 14 * scale);
    ctx.fill();
    ctx.stroke();

    // Başlık
    ctx.font = `bold ${Math.max(9, 11 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "#38bdf8";
    ctx.textAlign = "center";
    ctx.fillText("⚡ ENERJİ (J)", boxX + (boxW / 2), boxY + (20 * scale));

    // Çubuk Parametreleri
    const maxVal = Math.max(15, energy.initialTotalEnergy * 1.05);
    const barW = 18 * scale;
    const gap = 8 * scale;
    const maxBarH = 160 * scale;
    const startX = boxX + (14 * scale);
    const bottomY = boxY + boxH - (34 * scale);

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

        // Çubuk üstü sayısal değer
        ctx.font = `bold ${Math.max(8, 9 * scale)}px sans-serif`;
        ctx.fillStyle = "#e2e8f0";
        ctx.textAlign = "center";
        const valText = b.val >= 10 ? b.val.toFixed(0) : b.val.toFixed(1);
        ctx.fillText(valText, bx + (barW / 2), Math.min(by - (4 * scale), bottomY - 6 * scale));

        // Çubuk altı etiket
        ctx.font = `bold ${Math.max(9, 10 * scale)}px 'Nunito', sans-serif`;
        ctx.fillStyle = b.color;
        ctx.textAlign = "center";
        ctx.fillText(b.label, bx + (barW / 2), bottomY + (16 * scale));
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

    // Kütle Yazısı
    ctx.font = `bold ${Math.max(8, 9 * scale)}px sans-serif`;
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${energy.mass.toFixed(1)} kg`, 0, blockY + (massBoxH / 2));

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

        ctx.font = `bold ${Math.max(12, 13 * scale)}px 'Nunito', sans-serif`;
        ctx.fillStyle = "#ff6b8b";
        ctx.textAlign = "center";
        const labelRad1 = -Math.PI / 2 - (rad1 / 2);
        ctx.fillText(`i = ${incidentAngle}°`, originX + Math.cos(labelRad1) * (62 * scale), originY + Math.sin(labelRad1) * (62 * scale));
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

            ctx.font = `bold ${Math.max(12, 13 * scale)}px 'Nunito', sans-serif`;
            ctx.fillStyle = "#38bdf8";
            ctx.textAlign = "center";
            const labelRad2 = Math.PI / 2 - (rad2 / 2);
            ctx.fillText(`r = ${refractedAngle.toFixed(1)}°`, originX + Math.cos(labelRad2) * (62 * scale), originY + Math.sin(labelRad2) * (62 * scale));
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

    // Optik Merkez (O)
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.font = `bold ${Math.max(10, 11 * scale)}px 'Nunito', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.fillText("O", cx, cy + (18 * scale));

    ctx.restore();
}

function drawFocalPoint(ctx, x, y, label, scale) {
    ctx.save();
    // 1. Odak Noktası Diski
    ctx.beginPath();
    ctx.arc(x, y, 2.5 * scale, 0, Math.PI * 2);
    ctx.fillStyle = "#00d2ff";
    ctx.fill();

    // 2. Dikey Minimal Çentik
    ctx.beginPath();
    ctx.moveTo(x, y - (4 * scale));
    ctx.lineTo(x, y + (4 * scale));
    ctx.strokeStyle = "rgba(0, 210, 255, 0.5)";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    // 3. Etiket (Eksen çizgisinin net 18px altında)
    ctx.font = `bold ${Math.max(10, 11 * scale)}px 'Nunito', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#93c5fd";
    ctx.fillText(label, x, y + (18 * scale));
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
    const btnRecord = document.getElementById('btn-record-data-7-5');
    if (btnRecord) {
        btnRecord.addEventListener('click', recordMeasurement);
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
        ctx.moveTo(x + w - 18, t.ty);
        ctx.lineTo(x + w, t.ty);
        ctx.stroke();

        ctx.font = '8px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.textAlign = 'right';
        ctx.fillText(t.ml, x + w - 22, t.ty + 3);
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

    // Dijital Başlık Kutusu
    const headW = 44;
    const headH = 26;
    const headX = x - headW / 2;
    const headY = y;

    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(headX, headY, headW, headH, 4);
    ctx.fill();
    ctx.stroke();

    // Sıcaklık Yazısı
    ctx.font = 'bold 11px Inter, monospace';
    ctx.fillStyle = temp >= 60 ? '#fb923c' : temp >= 40 ? '#facc15' : '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText(`${temp}°C`, headX + headW / 2, headY + 17);
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

    // Zarif Kompakt Dijital Kapsül (Pill HUD - Mobilde Asla Beheri Kapatmaz)
    const pillW = 104;
    const pillH = 22;
    const pillX = cx - pillW / 2;
    const pillY = topY + 18;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = beaker.isDissolved ? 'rgba(52, 211, 153, 0.65)' : 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 11);
    ctx.fill();
    ctx.stroke();

    // Beher İsim Rozeti
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillStyle = beaker.id === "A" ? '#38bdf8' : beaker.id === "B" ? '#2dd4bf' : '#fb923c';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(beaker.name, pillX + 10, pillY + pillH / 2);

    // Kronometre
    ctx.font = 'bold 11px Inter, monospace';
    ctx.textAlign = 'right';
    if (beaker.isDissolved) {
        ctx.fillStyle = '#34d399';
        ctx.fillText(`${beaker.targetTime.toFixed(1)}s ✓`, pillX + pillW - 10, pillY + pillH / 2);
    } else {
        ctx.fillStyle = '#facc15';
        ctx.fillText(`${beaker.elapsedTime.toFixed(1)}s`, pillX + pillW - 10, pillY + pillH / 2);
    }

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
    const btnRecord76 = document.getElementById('btn-record-data-7-6');
    if (btnRecord76) btnRecord76.addEventListener('click', recordMeasurement);
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

    // Dijital Sıcaklık Göstergesi Rozeti
    const badgeW = 68;
    const badgeH = 24;
    const badgeX = cx - badgeW / 2;
    const badgeY = 95;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.strokeStyle = distill.isBoiling ? '#38bdf8' : '#fb923c';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = distill.isBoiling ? '#38bdf8' : '#fb923c';
    ctx.font = 'bold 12px Inter, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${distill.temp.toFixed(1)}°C`, cx, badgeY + 16);

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
    // 1. Mod Geçiş Butonları (Sürtünme vs Dokunma)
    const btnFriction = document.getElementById('btn-mode-friction');
    const btnConduction = document.getElementById('btn-mode-conduction');

    if (btnFriction) btnFriction.addEventListener('click', () => setElectroMode("friction"));
    if (btnConduction) btnConduction.addEventListener('click', () => setElectroMode("conduction"));

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

    // 4. Veri Defterine Kaydet
    const btnRecord77 = document.getElementById('btn-record-data-7-7');
    if (btnRecord77) btnRecord77.addEventListener('click', recordMeasurement);
}

function setElectroMode(mode) {
    labState.electro.mode = mode;
    const isFriction = (mode === "friction");

    const btnFriction = document.getElementById('btn-mode-friction');
    const btnConduction = document.getElementById('btn-mode-conduction');
    if (btnFriction) btnFriction.classList.toggle('active', isFriction);
    if (btnConduction) btnConduction.classList.toggle('active', !isFriction);

    const grpFriction = document.getElementById('group-controls-friction');
    const grpConduction = document.getElementById('group-controls-conduction');
    if (grpFriction) grpFriction.classList.toggle('is-hidden', !isFriction);
    if (grpConduction) grpConduction.classList.toggle('is-hidden', isFriction);

    const countersFriction = document.getElementById('counters-grid-friction');
    const countersConduction = document.getElementById('counters-grid-conduction');
    if (countersFriction) countersFriction.classList.toggle('is-hidden', !isFriction);
    if (countersConduction) countersConduction.classList.toggle('is-hidden', isFriction);

    updateElectroMetricsDOM();
    updateElectroPedagogicalBox();
    showLabToast(isFriction ? "⚡ Sürtünme ile Elektriklenme Modu Aktif" : "🤝 Dokunma ile Elektriklenme Modu Aktif");
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

function resetElectroExperiment() {
    if (labState.electro.mode === "friction") {
        neutralizeElectro();
    } else {
        setConductionPreset("pos6_zero");
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
    } else {
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
    } else {
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
    else {
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
    } else {
        drawElectroConductionSetup(ctx, el.conduction);
    }

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

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(symbol, x, y);
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

        // e- simgesi
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText("e⁻", curX, curY - 6);
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

    // Güneş Enerji Etiketi
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("Güneş Enerjisi", sx, sy + r + 15);
    ctx.fillStyle = '#facc15';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(`${(sunlight / 1000).toFixed(0)}k J`, sx, sy + r + 29);

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

    // Basamak İçi Metinler (Zarif ve Sadeleştirilmiş)
    const midY = (yT + yB) / 2;
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(tier.shortName, cx, midY - 7);

    // Mod Bilgisi (Enerji veya Zehir Değeri - Zero-Canvas-Text: Örnekler sağ panele bırakıldı)
    if (fp.mode === "energy") {
        const curE = fp.sunlight * tier.energyFraction;
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`⚡ ${Math.round(curE).toLocaleString('tr-TR')} J`, cx, midY + 11);
    } else {
        const mult = (fp.pesticideDose === "low") ? 0.5 : (fp.pesticideDose === "high") ? 2.5 : 1.0;
        const ppm = (tier.ppmBase * mult).toFixed(2);
        ctx.fillStyle = tier.id === 3 ? '#fca5a5' : '#fef08a';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`☠️ ${ppm} ppm`, cx, midY + 11);
    }

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

    // Kutu İçi Metinler (Zarif ve Sadeleştirilmiş)
    ctx.fillStyle = '#e9d5ff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("🍄 Ayrıştırıcılar", bx + bw / 2, by + 34);

    ctx.fillStyle = '#c084fc';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText("Bakteri & Mantarlar", bx + bw / 2, by + 54);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillText("🔄 Madde Döngüsü", bx + bw / 2, by + 120);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.font = '9px Inter, sans-serif';
    ctx.fillText("Tüm Basamaklara Bağlı", bx + bw / 2, by + 215);

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

        ctx.fillStyle = '#7dd3fc';
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(tr.label, arrowX - 8, (tr.yFrom + tr.yTo) / 2 + 3);
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

    // Dikey Yön Rozeti (Mobilde Asla Piramide veya Sol Kenara Binmez)
    ctx.save();
    ctx.translate(arrX - 12, 250);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#fca5a5';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("▲ Biyobirikim (Zehir) Artar", 0, 0);
    ctx.restore();

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

    // Üstte dar, altta geniş sembolü
    ctx.fillStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(bx + 15, byTop);
    ctx.lineTo(bx + 5, byBottom);
    ctx.lineTo(bx + 25, byBottom);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.stroke();

    // Dikey Metin (Yukarı Çıkıldıkça Azalanlar)
    ctx.save();
    ctx.translate(bx - 12, (byTop + byBottom) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("▲ Biyokütle & Birey Sayısı Azalır", 0, 0);
    ctx.restore();

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

        // Deney 6.1: Araç Konumu Manuel Sürükleme
        if (labState.activeExperimentId === "6.1" && labState.motion.car.isDragging) {
            const m = labState.motion;
            const clampedX = Math.max(90, Math.min(690, canvasX));
            m.distanceTraveled = ((clampedX - 90) / 600) * m.trackLength;
            m.elapsedTime = m.distanceTraveled / m.speed;
            m.car.wheelAngle += 0.2;
            updateMotionMetricsDOM();
            return;
        }

        // Deney 6.2: Halat / Kutu Manuel Sürükleme
        if (labState.activeExperimentId === "6.2" && labState.tugOfWar.isDragging) {
            const tow = labState.tugOfWar;
            tow.boxX = Math.max(200, Math.min(600, canvasX));
            updateTugMetricsDOM();
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
            if (Math.hypot(canvasX - labState.motion.car.x, canvasY - labState.motion.car.y) <= 65) {
                labState.motion.car.isDragging = true;
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
        } else if (labState.activeExperimentId === "6.4") {
            const rect = cvs.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
            const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
            const scaleX = 800 / rect.width;
            const scaleY = 500 / rect.height;
            const canvasX = (clientX - rect.left) * scaleX;
            const canvasY = (clientY - rect.top) * scaleY;
            if (Math.hypot(canvasX - 180, canvasY - 340) <= 45) {
                labState.heatTransfer.isHeating = !labState.heatTransfer.isHeating;
                updateHeatTransferDOMControls();
                updateHeatMetricsDOM();
                showLabToast(labState.heatTransfer.isHeating ? "🔥 İspirto ocağı yakıldı!" : "Ocak söndürüldü.");
            }
        } else if (labState.activeExperimentId === "7.1") {
            labState.work.isDragging = true;
        } else if (labState.activeExperimentId === "7.2") {
            labState.energy.pendulum.isDragging = true;
            labState.energy.ramp.isDragging = true;
        }
        labState.optics.isDraggingLaser = true;
        labState.lens.isDraggingObject = true;

        if (labState.activeExperimentId === "7.6" && labState.separation.mode === "funnel") {
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
        const isDragging61 = (labState.activeExperimentId === "6.1" && labState.motion && labState.motion.car.isDragging);
        const isDragging62 = (labState.activeExperimentId === "6.2" && labState.tugOfWar && labState.tugOfWar.isDragging);
        const isDragging71 = (labState.activeExperimentId === "7.1" && labState.work.isDragging);
        const isDragging72 = (labState.activeExperimentId === "7.2" && (labState.energy.pendulum.isDragging || labState.energy.ramp.isDragging));
        const isDragging77 = (labState.activeExperimentId === "7.7" && (
            (labState.electro.mode === "friction" && (labState.electro.friction.cloth.isDragging || labState.electro.friction.rod.isDragging)) ||
            (labState.electro.mode === "conduction" && (labState.electro.conduction.sphere1.isDragging || labState.electro.conduction.sphere2.isDragging))
        ));
        const isDragging78 = (labState.activeExperimentId === "7.8" && labState.electroscope && labState.electroscope.rod.isDragging);
        if (isDragging61 || isDragging62 || isDragging71 || isDragging72 || isDragging77 || isDragging78 || labState.optics.isDraggingLaser || labState.lens.isDraggingObject) {
            handlePointerAction(e);
        }
    });

    const stopDragging = (e) => {
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
function updateTableHeader(expId) {
    const thead = document.getElementById('lab-table-thead');
    if (!thead) return;

    if (expId === "6.1") {
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
                <th>Eklenen Sıvılar</th>
                <th>Kule Katmanları</th>
                <th>En Yoğun (Dip)</th>
                <th>En Az Yoğun (Üst)</th>
                <th>Bırakılan Cisimler</th>
            </tr>
        `;
    } else if (expId === "6.4") {
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Deney Modu</th>
                <th>Isı Kaynağı</th>
                <th>Bakır (k=385)</th>
                <th>Alüminyum (k=205)</th>
                <th>Demir (k=80)</th>
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
                <th>Beher No</th>
                <th>Sıcaklık (°C)</th>
                <th>Şeker Türü</th>
                <th>Karıştırma</th>
                <th>Çözünme Süresi (t)</th>
            </tr>
        `;
    } else if (expId === "7.6") {
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
    }
}

function recordMeasurement() {
    const expId = labState.activeExperimentId;
    const fmt = (n, dec = 1) => (typeof n === 'number' && !isNaN(n)) ? n.toFixed(dec) : '—';

    if (expId === "6.1") {
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
    } else if (expId === "6.4") {
        const ht = labState.heatTransfer;
        const c = ht.rods[0];
        const al = ht.rods[1];
        const fe = ht.rods[2];
        const row = {
            id: ht.measurements.length + 1,
            col1: ht.mode === "metals" ? "🥇 Metallerde İletim" : "🏠 Binalarda Yalıtım",
            col2: ht.isHeating ? "🔥 Ocak Yanıyor" : "Sönük",
            col3: c.ballDropped ? `Düştü (${fmt(c.dropTime, 1)} s)` : `${fmt(c.temp, 0)}°C (Isınıyor)`,
            col4: al.ballDropped ? `Düştü (${fmt(al.dropTime, 1)} s)` : `${fmt(al.temp, 0)}°C (Isınıyor)`,
            col5: fe.ballDropped ? `Düştü (${fmt(fe.dropTime, 1)} s)` : `${fmt(fe.temp, 0)}°C (Isınıyor)`
        };
        ht.measurements.push(row);
        showLabToast(`Isı İletimi Gözlemi #${row.id} deftere kaydedildi!`);
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
    } else if (expId === "7.6") {
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
        } else {
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
    }

    renderMeasurementTable();
}

function renderMeasurementTable() {
    const tbody = document.getElementById('lab-table-body');
    const emptyMsg = document.getElementById('lab-table-empty');
    if (!tbody || !emptyMsg) return;

    const expId = labState.activeExperimentId;
    let measurements = [];
    if (expId === "6.1") {
        measurements = labState.motion.measurements;
    } else if (expId === "6.2") {
        measurements = labState.tugOfWar.measurements;
    } else if (expId === "6.3") {
        measurements = labState.densityTower.measurements;
    } else if (expId === "6.4") {
        measurements = labState.heatTransfer.measurements;
    } else if (expId === "7.1") {
        measurements = labState.work.measurements;
    } else if (expId === "7.2") {
        measurements = labState.energy.measurements;
    } else if (expId === "7.4") {
        measurements = labState.lens.measurements;
    } else if (expId === "7.5") {
        measurements = labState.dissolve.measurements;
    } else if (expId === "7.6") {
        measurements = labState.separation.measurements;
    } else if (expId === "7.7") {
        measurements = labState.electro.measurements;
    } else if (expId === "7.8") {
        measurements = labState.electroscope.measurements;
    } else if (expId === "7.9") {
        measurements = labState.foodPyramid.measurements;
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
    if (expId === "7.1") {
        labState.work.measurements = [];
    } else if (expId === "7.2") {
        labState.energy.measurements = [];
    } else if (expId === "7.4") {
        labState.lens.measurements = [];
    } else if (expId === "7.5") {
        labState.dissolve.measurements = [];
    } else if (expId === "7.6") {
        labState.separation.measurements = [];
    } else if (expId === "7.7") {
        labState.electro.measurements = [];
    } else if (expId === "7.8") {
        labState.electroscope.measurements = [];
    } else if (expId === "7.9") {
        labState.foodPyramid.measurements = [];
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
