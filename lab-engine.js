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
        id: "6.1", grade: 6, unit: 1, unitName: "Güneş Sistemi ve Tutulmalar",
        title: "Güneş ve Ay Tutulması Geometrisi Simülatörü",
        code: "FB.6.1.1", bookRef: "1. Kitap, s. 16–29",
        active: false,
        desc: "Güneş, Dünya ve Ay'ın yörünge düğüm noktalarını hizalayarak tam ve parçalı tutulmaların oluşumunu simüle edin."
    },
    {
        id: "6.2", grade: 6, unit: 2, unitName: "Kuvvet ve Hareket",
        title: "Bileşke Kuvvet (R) ve Halat Çekme Laboratuvarı",
        code: "FB.6.2.1 - FB.6.2.2", bookRef: "1. Kitap, s. 54–69",
        active: false,
        desc: "Doğu ve batı yönlü kuvvetleri cisme uygulayarak net kuvveti, hareket yönünü ve dengelenmiş kuvvet durumunu ölçün."
    },
    {
        id: "6.3", grade: 6, unit: 2, unitName: "Kuvvet ve Hareket",
        title: "Sabit Süratli Hareket ve Yol-Zaman Grafiği",
        code: "FB.6.2.3", bookRef: "1. Kitap, s. 70–85",
        active: false,
        desc: "Eşit zaman aralıklarında eşit yollar alan hareketlinin hız-zaman ve yol-zaman grafiklerini gerçek zamanlı çizin."
    },
    {
        id: "6.4", grade: 6, unit: 4, unitName: "Işık ve Ses",
        title: "Düzlem Aynada Yansıma Kanunları (i = r)",
        code: "FB.6.4.1", bookRef: "2. Kitap, s. 14–29",
        active: false,
        desc: "Açıölçer üzerinde lazer ışınını aynaya göndererek gelme açısı ile yansıma açısının eşitliğini doğrulayın."
    },
    {
        id: "6.5", grade: 6, unit: 4, unitName: "Işık ve Ses",
        title: "Işığın Soğurulması ve Renklerin Isınma Etkisi",
        code: "FB.6.4.2", bookRef: "2. Kitap, s. 30–43",
        active: false,
        desc: "Siyah, beyaz ve renkli kumaşların ışığı soğurma miktarlarını sıcaklık artışı sensörleriyle eşzamanlı izleyin."
    },
    {
        id: "6.6", grade: 6, unit: 3, unitName: "Madde ve Isı",
        title: "Sıvı ve Katı Maddelerin Yoğunluk Ölçümü (d = m/V)",
        code: "FB.6.3.1", bookRef: "1. Kitap, s. 110–125",
        active: false,
        desc: "Taşma kabı ve dijital teraziyle kütle-hacim değerlerini ölçerek maddelerin ayırt edici yoğunluklarını hesaplayın."
    },
    {
        id: "6.7", grade: 6, unit: 3, unitName: "Madde ve Isı",
        title: "Sıvı Yoğunluk Kulesi ve Yüzme-Batma Simülatörü",
        code: "FB.6.3.2", bookRef: "1. Kitap, s. 126–139",
        active: false,
        desc: "Bal, su ve zeytinyağını aynı kaba dökerek tabakalaşmayı ve içine atılan cisimlerin askıda kalma/batma hallerini inceleyin."
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
        title: "Fiziksel Anlamda İş (W = F · Δx) Laboratuvarı",
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
        title: "Elektroskop ile Cisimlerin Yük Tayini",
        code: "FB.7.6.2", bookRef: "2. Kitap, s. 122–129",
        active: false,
        desc: "Yüklü cisimleri elektroskop topuzuna dokundurarak ve yaklaştırarak yaprakların açılma/kapanma fiziğini test edin."
    },
    {
        id: "7.9", grade: 7, unit: 7, unitName: "Sürdürülebilir Yaşam ve Enerji",
        title: "Besin Piramidinde Enerji Akışı ve Biyolojik Birikim",
        code: "FB.7.7.1", bookRef: "2. Kitap, s. 136–149",
        active: false,
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
    const is71 = (expId === "7.1");
    const is72 = (expId === "7.2");
    const is73 = (expId === "7.3");
    const is74 = (expId === "7.4");
    const is75 = (expId === "7.5");
    const is76 = (expId === "7.6");
    const is77 = (expId === "7.7");

    // HUD Paneli (Sadece Deney 7.3)
    const hud73 = document.getElementById('hud-exp-7-3');
    if (hud73) hud73.classList.toggle('is-hidden', !is73);

    // Hızlı Kontroller (Canvas Altı)
    const qc71 = document.getElementById('quick-controls-7-1');
    const qc72 = document.getElementById('quick-controls-7-2');
    const qc73 = document.getElementById('quick-controls-7-3');
    const qc74 = document.getElementById('quick-controls-7-4');
    const qc75 = document.getElementById('quick-controls-7-5');
    const qc76 = document.getElementById('quick-controls-7-6');
    const qc77 = document.getElementById('quick-controls-7-7');
    if (qc71) qc71.classList.toggle('is-hidden', !is71);
    if (qc72) qc72.classList.toggle('is-hidden', !is72);
    if (qc73) qc73.classList.toggle('is-hidden', !is73);
    if (qc74) qc74.classList.toggle('is-hidden', !is74);
    if (qc75) qc75.classList.toggle('is-hidden', !is75);
    if (qc76) qc76.classList.toggle('is-hidden', !is76);
    if (qc77) qc77.classList.toggle('is-hidden', !is77);

    // Değişkenler Panelleri
    const vars71 = document.getElementById('vars-container-7-1');
    const vars72 = document.getElementById('vars-container-7-2');
    const vars73 = document.getElementById('vars-container-7-3');
    const vars74 = document.getElementById('vars-container-7-4');
    const vars75 = document.getElementById('vars-container-7-5');
    const vars76 = document.getElementById('vars-container-7-6');
    const vars77 = document.getElementById('vars-container-7-7');
    if (vars71) vars71.classList.toggle('is-hidden', !is71);
    if (vars72) vars72.classList.toggle('is-hidden', !is72);
    if (vars73) vars73.classList.toggle('is-hidden', !is73);
    if (vars74) vars74.classList.toggle('is-hidden', !is74);
    if (vars75) vars75.classList.toggle('is-hidden', !is75);
    if (vars76) vars76.classList.toggle('is-hidden', !is76);
    if (vars77) vars77.classList.toggle('is-hidden', !is77);

    // Rehber Panelleri
    const guide71 = document.getElementById('guide-container-7-1');
    const guide72 = document.getElementById('guide-container-7-2');
    const guide73 = document.getElementById('guide-container-7-3');
    const guide74 = document.getElementById('guide-container-7-4');
    const guide75 = document.getElementById('guide-container-7-5');
    const guide76 = document.getElementById('guide-container-7-6');
    const guide77 = document.getElementById('guide-container-7-7');
    if (guide71) guide71.classList.toggle('is-hidden', !is71);
    if (guide72) guide72.classList.toggle('is-hidden', !is72);
    if (guide73) guide73.classList.toggle('is-hidden', !is73);
    if (guide74) guide74.classList.toggle('is-hidden', !is74);
    if (guide75) guide75.classList.toggle('is-hidden', !is75);
    if (guide76) guide76.classList.toggle('is-hidden', !is76);
    if (guide77) guide77.classList.toggle('is-hidden', !is77);

    if (is71) {
        initWorkState();
    } else if (is72) {
        initEnergyState();
    } else if (is75) {
        initDissolveState();
    } else if (is76) {
        initSeparationState();
    } else if (is77) {
        initElectroState();
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
    if (labState.activeExperimentId === "7.1") {
        resetWorkExperiment();
    } else if (labState.activeExperimentId === "7.2") {
        resetEnergyExperiment();
    } else if (labState.activeExperimentId === "7.5") {
        resetDissolveExperiment();
    } else if (labState.activeExperimentId === "7.6") {
        resetSeparationExperiment();
    } else if (labState.activeExperimentId === "7.7") {
        resetElectroExperiment();
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
    const labView = document.getElementById('lab-view');
    if (!document.fullscreenElement) {
        if (labView.requestFullscreen) {
            labView.requestFullscreen();
        } else if (labView.webkitRequestFullscreen) {
            labView.webkitRequestFullscreen();
        }
        showLabToast("Laboratuvar tam ekran moduna alındı");
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
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

    if (labState.activeExperimentId === "7.1") {
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
            if (labState.activeExperimentId === "7.1") {
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
            }
        }
        if (labState.activeExperimentId) {
            animFrameId = requestAnimationFrame(render);
        }
    };
    animFrameId = requestAnimationFrame(render);
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
                if (text) text.textContent = `Uygulanan yatay kuvvet ile sandığın hareket doğrultusu aynıdır (yatay). Sandık uygulanan kuvvet yönünde ${dx.toFixed(1)} m yer değiştirdiği için W = F · Δx = ${work.appliedWork.toFixed(1)} Joule fiziksel iş yapılmıştır.`;
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
            if (text) text.textContent = `Sandık düşey doğrultuda yukarı doğru ${dx.toFixed(1)} m yükseltilmiştir. Kuvvet ile hareket doğrultusu aynıdır (düşey). Yapılan ${work.appliedWork.toFixed(1)} Joule iş, cisimde çekim potansiyel enerjisi (Ep = m · g · h) olarak depolanır!`;
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
}

function updateWorkPhysics() {
    const work = labState.work;
    if (work.isPlaying) {
        if (work.scenario === "wall" || (work.scenario === "horizontal" && work.frictionEnabled && work.force <= 20)) {
            work.progress = 0;
            work.currentDisplacement = 0;
            work.isPlaying = false;
            updateWorkPlayButton(false);
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

    // 2. Minimalist Sol Üst HUD Paneli
    drawWorkHUD(ctx, work);

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
    const isWork = work.isWorkDone;
    const boxW = 160;
    const boxH = 68;
    const boxX = 24;
    const boxY = 20;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = isWork ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'left';
    ctx.fillText("FİZİKSEL İŞ (W)", boxX + 12, boxY + 18);

    ctx.font = 'bold 20px Inter, monospace';
    ctx.fillStyle = isWork ? '#10b981' : '#ef4444';
    const valText = isWork ? `${work.appliedWork.toFixed(1)} J` : '0.0 J';
    ctx.fillText(valText, boxX + 12, boxY + 42);

    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = isWork ? '#6ee7b7' : '#fca5a5';
    ctx.fillText(isWork ? '✅ İş Yapıldı' : '❌ İş Yapılmadı', boxX + 12, boxY + 59);
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
    drawWorkStudent(ctx, charX, groundY, "push", work.isPlaying ? animTime : 0);

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
        `F = ${work.force.toFixed(0)} N ➔`,
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
            `fs = 20 N ⬅`,
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
            `Δx = ${curDist.toFixed(1)} m ➔`,
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
        `F = ${work.force.toFixed(0)} N ⬆`,
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
            `h = ${curH.toFixed(1)} m ⬆`,
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
        `G = 100 N ⬇`,
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
        `F = ${work.force.toFixed(0)} N ⬆ (Düşey)`,
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
            `Δx = ${curDist.toFixed(1)} m ➔ (Yatay)`,
            16
        );
    }

    // DİK AÇI SEMBOLÜ (90° - Sarı kare köşe)
    ctx.save();
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 2;
    const sqSize = 14;
    ctx.beginPath();
    ctx.moveTo(bagHandX, bagHandY - sqSize);
    ctx.lineTo(bagHandX + sqSize, bagHandY - sqSize);
    ctx.lineTo(bagHandX + sqSize, bagHandY);
    ctx.stroke();

    // Küçük nokta
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(bagHandX + sqSize / 2, bagHandY - sqSize / 2, 2, 0, Math.PI * 2);
    ctx.fill();

    // 90° Etiketi
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.fillText("90° (Dik Açı ➔ W = 0 J)", bagHandX + 20, bagHandY - 8);
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
    drawWorkStudent(ctx, charX, groundY, "wall", work.isPlaying ? animTime : 0);

    // Vektör Oku: Duvara Uygulanan Kuvvet (F)
    const arrowLen = 35 + (work.force * 0.8);
    drawWorkVectorArrow(
        ctx,
        charX + 30,
        groundY - 70,
        charX + 30 + arrowLen,
        groundY - 70,
        '#ef4444',
        `F = ${work.force.toFixed(0)} N ➔`,
        -12
    );

    // Hareketsiz Rozeti / Δx = 0
    ctx.save();
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1.5;
    const badgeX = wallX + 20;
    const badgeY = groundY + 28;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, 140, 26, 6);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#fca5a5';
    ctx.textAlign = 'center';
    ctx.fillText("❌ Δx = 0 m (Hareketsiz)", badgeX + 70, badgeY + 17);
    ctx.restore();
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

    // Renk paleti
    const skinColor = '#fed7aa';
    const hairColor = '#1e293b';
    const shirtColor = '#0284c7';
    const pantsColor = '#334155';
    const shoeColor = '#0f172a';

    if (pose === "push") {
        // İtme Pozu (İleri eğik)
        ctx.save();
        ctx.translate(x, y);

        // Bacaklar
        ctx.strokeStyle = pantsColor;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        // Sol bacak (önde bükülü)
        ctx.beginPath();
        ctx.moveTo(-4, -40);
        ctx.lineTo(16, -20);
        ctx.lineTo(20, 0);
        ctx.stroke();
        // Sağ bacak (arkada gergin)
        ctx.beginPath();
        ctx.moveTo(-10, -40);
        ctx.lineTo(-24, -18);
        ctx.lineTo(-28, 0);
        ctx.stroke();

        // Ayakkabılar
        ctx.fillStyle = shoeColor;
        ctx.beginPath();
        ctx.roundRect(14, -5, 16, 5, 2);
        ctx.roundRect(-34, -5, 14, 5, 2);
        ctx.fill();

        // Gövde (ileri eğik)
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.moveTo(-6, -42);
        ctx.lineTo(10, -72);
        ctx.stroke();

        // Kollar (sandığa dayalı)
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(8, -68);
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
        ctx.arc(16, -84, 10, 0, Math.PI * 2);
        ctx.fill();

        // Saç
        ctx.fillStyle = hairColor;
        ctx.beginPath();
        ctx.arc(15, -87, 10, Math.PI * 0.8, Math.PI * 2.1);
        ctx.fill();

        ctx.restore();
    } else if (pose === "lift") {
        // Kaldırma Pozu
        ctx.save();
        ctx.translate(x, y);

        // Bacaklar (omuz genişliğinde dik duruş)
        ctx.strokeStyle = pantsColor;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-12, -45);
        ctx.lineTo(-14, 0);
        ctx.moveTo(12, -45);
        ctx.lineTo(14, 0);
        ctx.stroke();

        // Ayakkabılar
        ctx.fillStyle = shoeColor;
        ctx.beginPath();
        ctx.roundRect(-20, -5, 16, 5, 2);
        ctx.roundRect(8, -5, 16, 5, 2);
        ctx.fill();

        // Gövde
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 16;
        ctx.beginPath();
        ctx.moveTo(0, -45);
        ctx.lineTo(0, -80);
        ctx.stroke();

        // Kollar (yukarı doğru sandığı tutuyor)
        const handY = -80 - extraOffset * 0.65;
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-6, -75);
        ctx.lineTo(-24, handY);
        ctx.moveTo(6, -75);
        ctx.lineTo(24, handY);
        ctx.stroke();

        // Eller
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(-24, handY, 4, 0, Math.PI * 2);
        ctx.arc(24, handY, 4, 0, Math.PI * 2);
        ctx.fill();

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
        // Sabit Duvarı İtme Pozu (Büyük efor)
        ctx.save();
        ctx.translate(x, y);

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

    // Ahşap sandık gövdesi
    const woodGrad = ctx.createLinearGradient(x, y, x, y + h);
    woodGrad.addColorStop(0, '#b45309');
    woodGrad.addColorStop(1, '#78350f');
    ctx.fillStyle = woodGrad;
    ctx.strokeStyle = '#451a03';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 6);
    ctx.fill();
    ctx.stroke();

    // Tahta şerit çizgileri
    ctx.strokeStyle = 'rgba(69, 26, 3, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y + h * 0.33);
    ctx.lineTo(x + w, y + h * 0.33);
    ctx.moveTo(x, y + h * 0.66);
    ctx.lineTo(x + w, y + h * 0.66);
    ctx.stroke();

    // Çapraz destek çıtası
    ctx.strokeStyle = 'rgba(180, 83, 9, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + 4, y + 4);
    ctx.lineTo(x + w - 4, y + h - 4);
    ctx.stroke();

    // Metal köşe perçinleri
    ctx.fillStyle = '#64748b';
    const cSize = 10;
    ctx.fillRect(x, y, cSize, cSize);
    ctx.fillRect(x + w - cSize, y, cSize, cSize);
    ctx.fillRect(x, y + h - cSize, cSize, cSize);
    ctx.fillRect(x + w - cSize, y + h - cSize, cSize, cSize);

    // Kütle Etiketi
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.textAlign = 'center';
    ctx.fillText("📦 10 kg", x + w / 2, y + h / 2 + 4);

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

    // Metal Sabit Duvar Levhası
    const signW = 140;
    const signH = 34;
    const signX = x + (w - signW) / 2;
    const signY = y + 25;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(signX, signY, signW, signH, 6);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillStyle = '#fde68a';
    ctx.textAlign = 'center';
    ctx.fillText("🧱 SABİT DUVAR", signX + signW / 2, signY + 14);
    ctx.font = '9px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText("Yer Değiştirmez (Δx = 0)", signX + signW / 2, signY + 27);

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
            cardText.textContent = "Cisim dönüş anında anlık olarak durur (v = 0, Ek = 0). Mekanik enerjinin tamamı Çekim Potansiyel Enerjisi (Ep = mgh) hâlindedir.";
        } else if (energy.currentHeight < 0.04 || energy.kineticEnergy > energy.totalEnergy * 0.94) {
            cardBox.style.borderColor = "rgba(56, 189, 248, 0.65)";
            cardIcon.style.color = "#38bdf8";
            cardIcon.innerHTML = '<i class="fas fa-bolt"></i>';
            cardTitle.textContent = "🚀 Denge / Dip Konumu (Maksimum Kinetik Enerji):";
            cardText.textContent = "Cisim en alçak noktadan geçerken (h = 0, Ep = 0) sürati ve kinetik enerjisi maksimuma ulaşır (Ek = ½mv²). Potansiyel enerjinin tamamı kinetik enerjiye dönüşmüştür!";
        } else {
            cardBox.style.borderColor = "rgba(250, 204, 21, 0.5)";
            cardIcon.style.color = "#facc15";
            cardIcon.innerHTML = '<i class="fas fa-sync-alt"></i>';
            cardTitle.textContent = "🔄 Enerji Dönüşümü Devam Ediyor:";
            cardText.textContent = "Potansiyel ve kinetik enerji sürekli olarak birbirine dönüşmektedir. Sürtünmesiz ortamda mekanik enerji toplamı (Ep + Ek) daima sabit kalır.";
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

    // 5. Canvas Altı Zarif Etkileşim İpucu (Görsel Ergonomi Kuralı: Asla ortaya veya ışın/yörünge üstüne binmez)
    ctx.save();
    ctx.font = `${Math.max(10, 11 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText("👆 Sarkacı veya kaykaycıyı parmağınızla/fareyle yana çekip bırakabilirsiniz.", 450 * scale, h - (12 * scale));
    ctx.restore();
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

    // 4. Referans Denge / Zemin Seviyesi (h = 0)
    ctx.strokeStyle = "rgba(16, 185, 129, 0.35)";
    ctx.lineWidth = 1 * scale;
    ctx.setLineDash([3 * scale, 3 * scale]);
    ctx.beginPath();
    ctx.moveTo(cx - (160 * scale), lowestY);
    ctx.lineTo(cx + (160 * scale), lowestY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = `${Math.max(9, 10 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "rgba(16, 185, 129, 0.7)";
    ctx.textAlign = "left";
    ctx.fillText("Denge Konumu (h = 0)", cx + (165 * scale), lowestY + (3 * scale));

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

        ctx.font = `bold ${Math.max(9, 10 * scale)}px 'Nunito', sans-serif`;
        ctx.fillStyle = "#38bdf8";
        ctx.textAlign = "center";
        ctx.fillText(`h = ${energy.currentHeight.toFixed(2)} m`, indX + (Math.sin(angle) > 0 ? -30 * scale : 30 * scale), (lowestY + by) / 2 + (4 * scale));
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

    // 7. Sarkaç Küresi (3D Metalik Radial Gradyan)
    const bobR = (14 + energy.mass * 2.5) * scale;

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

    const sphereGrad = ctx.createRadialGradient(
        bx - (bobR * 0.35), by - (bobR * 0.35), bobR * 0.1,
        bx, by, bobR
    );
    sphereGrad.addColorStop(0, "#ffffff");
    sphereGrad.addColorStop(0.2, "#67e8f9");
    sphereGrad.addColorStop(0.7, "#0891b2");
    sphereGrad.addColorStop(1, "#164e63");

    ctx.fillStyle = sphereGrad;
    ctx.shadowColor = "rgba(0, 210, 255, 0.4)";
    ctx.shadowBlur = 10 * scale;
    ctx.beginPath();
    ctx.arc(bx, by, bobR, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = "#cffafe";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    // Kütle Etiketi (Kürenin içinde)
    ctx.font = `bold ${Math.max(8, 10 * scale)}px sans-serif`;
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${energy.mass.toFixed(1)} kg`, bx, by);

    // 8. Hız Vektörü Oku (Teğetsel Sürat)
    if (energy.currentSpeed > 0.15) {
        const velLen = Math.min(65 * scale, energy.currentSpeed * 12 * scale);
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

        ctx.font = `bold ${Math.max(8, 9 * scale)}px sans-serif`;
        ctx.fillText(`v = ${energy.currentSpeed.toFixed(1)} m/s`, vx + (Math.sin(velAngle) * 12 * scale), vy + (Math.cos(velAngle) * 12 * scale));
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

    ctx.font = `${Math.max(9, 10 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "rgba(16, 185, 129, 0.7)";
    ctx.textAlign = "left";
    ctx.fillText("Dip / En Düşük Nokta (h = 0)", cx + (165 * scale), lowestY + (3 * scale));

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

        ctx.font = `bold ${Math.max(9, 10 * scale)}px 'Nunito', sans-serif`;
        ctx.fillStyle = "#38bdf8";
        ctx.textAlign = "center";
        ctx.fillText(`h = ${energy.currentHeight.toFixed(2)} m`, indX + (Math.sin(angle) > 0 ? -30 * scale : 30 * scale), (lowestY + cartY) / 2 + (4 * scale));
    }

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
    const wheelR = 4.5 * scale;
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
    const cartW = 34 * scale;
    const cartH = 6 * scale;
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

        ctx.font = `bold ${Math.max(8, 9 * scale)}px sans-serif`;
        ctx.fillText(`v = ${energy.currentSpeed.toFixed(1)} m/s`, vx + (Math.sin(velAngle) * 12 * scale), vy + (Math.cos(velAngle) * 12 * scale));
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

    // Ortam Etiketleri
    ctx.font = `bold ${Math.max(13, 15 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = med1.highlightColor;
    ctx.fillText(`1. Ortam: ${med1.name} (n = ${med1.n.toFixed(2)}) · ${med1.speed.toLocaleString('tr-TR')} km/s`, 20 * scale, 35 * scale);

    ctx.fillStyle = med2.highlightColor;
    ctx.fillText(`2. Ortam: ${med2.name} (n = ${med2.n.toFixed(2)}) · ${med2.speed.toLocaleString('tr-TR')} km/s`, 20 * scale, originY + (35 * scale));

    // Açıölçer / Gönye
    drawProtractor(ctx, originX, originY, radius, scale);

    // Ayırıcı Yüzey
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(W, originY);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 2 * scale;
    ctx.stroke();

    ctx.font = `${Math.max(11, 12 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.textAlign = "right";
    ctx.fillText("Ayırıcı Yüzey", W - (20 * scale), originY - (8 * scale));

    // Yüzey Normali (N)
    ctx.beginPath();
    ctx.setLineDash([6 * scale, 6 * scale]);
    ctx.moveTo(originX, 30 * scale);
    ctx.lineTo(originX, H - (30 * scale));
    ctx.strokeStyle = "rgba(0, 210, 255, 0.8)";
    ctx.lineWidth = 2 * scale;
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.font = `bold ${Math.max(12, 14 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "var(--neon-blue)";
    ctx.textAlign = "center";
    ctx.fillText("N (Normal)", originX, 22 * scale);
    ctx.fillText("N", originX, H - (12 * scale));

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

    // Asal Eksen etiketi (Sadece sol kenarda, eksenin 18px altında çok silik/minimal)
    ctx.font = `${Math.max(9, 10 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "rgba(148, 163, 184, 0.45)";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Asal Eksen", 28 * scale, cy + (18 * scale));

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
        // İnce Kenarlı Mercek (Ortası Kalın, Kenarları İnce)
        const thickness = 18 * scale;
        ctx.beginPath();
        ctx.moveTo(cx, cy - lensH);
        ctx.quadraticCurveTo(cx + thickness, cy, cx, cy + lensH);
        ctx.quadraticCurveTo(cx - thickness, cy, cx, cy - lensH);
        ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
        ctx.fill();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
        ctx.lineWidth = 2 * scale;
        ctx.stroke();

        // Çift Dışa Ok Sembolü (▲ ve ▼)
        drawArrowHead(ctx, cx, cy - lensH, -Math.PI / 2, 10 * scale, "#38bdf8");
        drawArrowHead(ctx, cx, cy + lensH, Math.PI / 2, 10 * scale, "#38bdf8");
    } else {
        // Kalın Kenarlı Mercek (Ortası İnce, Kenarları Kalın)
        const edgeW = 18 * scale;
        const centerW = 4 * scale;
        ctx.beginPath();
        ctx.moveTo(cx - edgeW, cy - lensH);
        ctx.lineTo(cx + edgeW, cy - lensH);
        ctx.quadraticCurveTo(cx + centerW, cy, cx + edgeW, cy + lensH);
        ctx.lineTo(cx - edgeW, cy + lensH);
        ctx.quadraticCurveTo(cx - centerW, cy, cx - edgeW, cy - lensH);
        ctx.fillStyle = "rgba(192, 132, 252, 0.25)";
        ctx.fill();
        ctx.strokeStyle = "rgba(192, 132, 252, 0.9)";
        ctx.lineWidth = 2 * scale;
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
    ctx.save();
    const fontSize = Math.max(9, 11 * scale);
    ctx.font = `bold ${fontSize}px 'Nunito', sans-serif`;
    const textW = ctx.measureText(text).width;
    const padX = 8 * scale;
    const padY = 4 * scale;
    const boxW = textW + (padX * 2);
    const boxH = fontSize + (padY * 2);

    let boxX = x;
    if (align === "right") {
        boxX = x - boxW;
    } else if (align === "center") {
        boxX = x - (boxW / 2);
    }
    const boxY = cy - (boxH / 2);

    ctx.fillStyle = "rgba(10, 16, 30, 0.92)";
    ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
    ctx.lineWidth = 1.2 * scale;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 6 * scale);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#38bdf8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, boxX + (boxW / 2), cy);
    ctx.restore();
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

    // Etiket (Işınların ve alevin üzerine binmeyen koruyucu şık rozet)
    const lblFontSize = Math.max(9, 11 * scale);
    ctx.font = `bold ${lblFontSize}px 'Nunito', sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lblW = ctx.measureText(label).width;
    const lblPadX = 6 * scale;
    const lblPadY = 3 * scale;
    const lblY = isUpright ? flameTipY - (14 * scale) : flameTipY + (14 * scale);

    ctx.fillStyle = "rgba(7, 12, 27, 0.88)";
    ctx.beginPath();
    ctx.roundRect(x - (lblW / 2) - lblPadX, lblY - (lblFontSize / 2) - lblPadY, lblW + (lblPadX * 2), lblFontSize + (lblPadY * 2), 4 * scale);
    ctx.fill();

    ctx.strokeStyle = isReal ? "rgba(56, 189, 248, 0.6)" : isUpright ? (alpha === 1 ? "rgba(251, 191, 36, 0.6)" : "rgba(56, 189, 248, 0.6)") : "rgba(192, 132, 252, 0.6)";
    ctx.lineWidth = 1 * scale;
    ctx.stroke();

    ctx.fillStyle = isReal ? "#38bdf8" : (alpha === 1 ? "#fef08a" : "#7dd3fc");
    ctx.fillText(label, x, lblY);

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
    ctx.font = '8px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'right';
    ctx.fillText("MANYETİK TABLA", cx + 70, topY + 13);
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

    // Başlık ve Etiket Kutusu
    const boxW = 140;
    const boxH = 46;
    const boxX = cx - boxW / 2;
    const boxY = topY;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = beaker.isDissolved ? 'rgba(52, 211, 153, 0.6)' : 'rgba(71, 85, 105, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();

    // Başlık
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = beaker.id === "A" ? '#38bdf8' : beaker.id === "B" ? '#2dd4bf' : '#fb923c';
    ctx.textAlign = 'left';
    ctx.fillText(beaker.name, boxX + 10, boxY + 16);

    // Parametre özeti (örn: 60°C · Toz · Çalk.)
    const sShort = beaker.sugar === "cube" ? "Küp" : beaker.sugar === "granulated" ? "Toz" : "Pudra";
    const stirShort = beaker.stirring ? "🌀 Karışt." : "Durgun";
    ctx.font = '9px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${beaker.temp}°C · ${sShort} · ${stirShort}`, boxX + 10, boxY + 36);

    // Kronometre
    ctx.font = 'bold 13px Inter, monospace';
    ctx.textAlign = 'right';
    if (beaker.isDissolved) {
        ctx.fillStyle = '#34d399';
        ctx.fillText(`${beaker.targetTime.toFixed(1)}s ✓`, boxX + boxW - 8, boxY + 17);
    } else {
        ctx.fillStyle = '#facc15';
        ctx.fillText(`${beaker.elapsedTime.toFixed(1)}s`, boxX + boxW - 8, boxY + 17);
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
    ctx.save();
    const cx = 440;

    // Zeytinyağı Etiketi (Sol tarafta, sarı)
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#facc15';
    ctx.textAlign = 'right';
    ctx.fillText("Zeytinyağı (d = 0.9 g/cm³)", cx - 68, 120);

    // Su Etiketi (Sol tarafta, mavi)
    ctx.fillStyle = '#38bdf8';
    ctx.fillText("Su (d = 1.0 g/cm³)", cx - 68, 200);

    // Arayüz Gösterge Oku (Sağ tarafta)
    const waterH = (funnel.waterVolume / 100.0) * 75;
    const waterTopY = 255 - waterH;

    if (funnel.waterVolume > 0 && funnel.oilVolume > 0) {
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'left';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText("◀ Faz Sınırı (Arayüz)", cx + 58, waterTopY + 4);
    }

    // Toplama Kabı Etiketi
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText("Toplama Erlenmayeri", cx, 448);

    ctx.restore();
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

    // Soğuk Su Giriş ve Ilık Su Çıkış Etiketleri
    ctx.save();
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText("Soğuk Su Girişi ➔", 475, 345);

    ctx.fillStyle = '#fb923c';
    ctx.fillText("➔ Ilık Su Çıkışı", 310, 175);
    ctx.restore();
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
    ctx.save();

    // Balon Etiketi (Sol)
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = '#c084fc';
    ctx.textAlign = 'center';
    ctx.fillText("Alkol-Su Çözeltisi", 230, 380);

    // Kondenser Etiketi (Orta)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText("Liebig Soğutucu (Kondenser)", 400, 245);

    // Toplama Kabı Etiketi (Sağ)
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText("Saf Etil Alkol (K.N: 78°C)", 560, 450);

    ctx.restore();
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

    // 5. Bilgilendirme İpuçları
    ctx.save();
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText("↔ Kumaşı çubuğa sürterek elektrikleyin", f.cloth.x + f.cloth.w / 2, f.cloth.y - 10);
    ctx.fillText("↕ Çubuğu aşağı sürükleyip kağıtları çekebilirsiniz", f.rod.x + f.rod.w / 2, f.rod.y - 12);
    ctx.fillText("Nötr Kağıt Parçaları (Masada)", 400, 458);
    ctx.restore();
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

    // Çubuk İsim Etiketi
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = isEbonite ? '#cbd5e1' : '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText(isEbonite ? "Ebonit (Plastik) Çubuk" : "Cam Çubuk", rod.x + rod.w / 2, rod.y + rod.h + 16);

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

    // Kumaş İsim Etiketi
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = isEbonite ? '#fef08a' : '#e9d5ff';
    ctx.textAlign = 'center';
    ctx.fillText(isEbonite ? "Yün Kumaş" : "İpek Kumaş", cloth.x + cloth.w / 2, cloth.y + cloth.h + 16);

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

    // 5. Bilgilendirme İpucu
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
    ctx.textAlign = 'center';
    ctx.fillText("↔ Küreleri birbirine dokundurmak için sürükleyin", 400, 100);
    ctx.fillText("Yalıtkan Ayaklar (Masada Sabit İletim Yok)", 400, 458);

    ctx.restore();
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

    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy - r - 16);

    ctx.fillStyle = netColor;
    ctx.font = 'bold 13px Inter, monospace';
    ctx.fillText(netStr, cx, cy - r - 2);

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
    };

    cvs.addEventListener('pointerdown', (e) => {
        cvs.setPointerCapture(e.pointerId);
        if (labState.activeExperimentId === "7.1") {
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

        handlePointerAction(e);
    });

    cvs.addEventListener('pointermove', (e) => {
        const isDragging71 = (labState.activeExperimentId === "7.1" && labState.work.isDragging);
        const isDragging72 = (labState.activeExperimentId === "7.2" && (labState.energy.pendulum.isDragging || labState.energy.ramp.isDragging));
        const isDragging77 = (labState.activeExperimentId === "7.7" && (
            (labState.electro.mode === "friction" && (labState.electro.friction.cloth.isDragging || labState.electro.friction.rod.isDragging)) ||
            (labState.electro.mode === "conduction" && (labState.electro.conduction.sphere1.isDragging || labState.electro.conduction.sphere2.isDragging))
        ));
        if (isDragging71 || isDragging72 || isDragging77 || labState.optics.isDraggingLaser || labState.lens.isDraggingObject) {
            handlePointerAction(e);
        }
    });

    const stopDragging = (e) => {
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

    if (expId === "7.1") {
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
    }
}

function recordMeasurement() {
    const expId = labState.activeExperimentId;
    const fmt = (n, dec = 1) => (typeof n === 'number' && !isNaN(n)) ? n.toFixed(dec) : '—';

    if (expId === "7.1") {
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
    }

    renderMeasurementTable();
}

function renderMeasurementTable() {
    const tbody = document.getElementById('lab-table-body');
    const emptyMsg = document.getElementById('lab-table-empty');
    if (!tbody || !emptyMsg) return;

    const expId = labState.activeExperimentId;
    let measurements = [];
    if (expId === "7.1") {
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

        if (deg % 30 === 0 && deg > 0) {
            ctx.font = `${Math.max(9, 10 * scale)}px sans-serif`;
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.textAlign = "center";
            ctx.fillText(`${deg}°`, cx - Math.sin(rad) * (r - 24 * scale), cy - Math.cos(rad) * (r - 24 * scale) + 4 * scale);
            ctx.fillText(`${deg}°`, cx + Math.sin(rad) * (r - 24 * scale), cy - Math.cos(rad) * (r - 24 * scale) + 4 * scale);
            ctx.fillText(`${deg}°`, cx + Math.sin(rad) * (r - 24 * scale), cy + Math.cos(rad) * (r - 24 * scale) + 4 * scale);
            ctx.fillText(`${deg}°`, cx - Math.sin(rad) * (r - 24 * scale), cy + Math.cos(rad) * (r - 24 * scale) + 4 * scale);
        }
    }
    ctx.restore();
}

function drawLaserBeam(ctx, x1, y1, x2, y2, color, width, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.shadowColor = color;
    ctx.shadowBlur = 8;
    ctx.stroke();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(0.75, width * 0.32);
    ctx.shadowBlur = 0;
    ctx.stroke();

    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowLen = 9 * (width / 3.0);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX - arrowLen * Math.cos(angle - Math.PI / 6), midY - arrowLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX - arrowLen * Math.cos(angle + Math.PI / 6), midY - arrowLen * Math.sin(angle + Math.PI / 6));
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1, width * 0.6);
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
