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
        code: "FB.7.2.1", bookRef: "1. Kitap, s. 46–59",
        active: false,
        desc: "Kuvvetin büyüklüğü, yönü ve yer değiştirme doğrultusunu kontrol ederek fen anlamında iş yapılıp yapılmadığını test edin."
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
        title: "Çözünme Hızını Etkileyen Faktörler",
        code: "FB.7.5.4", bookRef: "2. Kitap, s. 68–79",
        active: false,
        desc: "Sıcaklık, temas yüzeyi (pudra/toz/küp şeker) ve karıştırmanın çözünme süresine etkisini bağımsız değişkenlerle ölçün."
    },
    {
        id: "7.6", grade: 7, unit: 5, unitName: "Maddenin Doğasına Yolculuk",
        title: "Karışımların Ayrılması (Ayırma Hunisi ve Buharlaştırma)",
        code: "FB.7.5.5", bookRef: "2. Kitap, s. 80–93",
        active: false,
        desc: "Zeytinyağı-su gibi heterojen ve tuzlu su gibi homojen karışımları yoğunluk ve kaynama noktası farkıyla saflaştırın."
    },
    {
        id: "7.7", grade: 7, unit: 6, unitName: "Elektriklenme",
        title: "Sürtünme ve Dokunma ile Elektriklenme Laboratuvarı",
        code: "FB.7.6.2", bookRef: "2. Kitap, s. 112–121",
        active: false,
        desc: "Ebonit çubuğu yün kumaşa, cam çubuğu ipek kumaşa sürterek elektron transferini ve yük cinslerini modelleyin."
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

    // 6. DENEY 7.2 KONTROLLERİ (MEKANİK ENERJİ DÖNÜŞÜMÜ)
    setupEnergyControlsDOM();

    // 7. DENEY 7.4 KONTROLLERİ (MERCEKLER VE ODAKLAMA)
    setupLensControlsDOM();

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
    const is72 = (expId === "7.2");
    const is73 = (expId === "7.3");
    const is74 = (expId === "7.4");

    // HUD Paneli (Sadece Deney 7.3)
    const hud73 = document.getElementById('hud-exp-7-3');
    if (hud73) hud73.classList.toggle('is-hidden', !is73);

    // Hızlı Kontroller (Canvas Altı)
    const qc72 = document.getElementById('quick-controls-7-2');
    const qc73 = document.getElementById('quick-controls-7-3');
    const qc74 = document.getElementById('quick-controls-7-4');
    if (qc72) qc72.classList.toggle('is-hidden', !is72);
    if (qc73) qc73.classList.toggle('is-hidden', !is73);
    if (qc74) qc74.classList.toggle('is-hidden', !is74);

    // Değişkenler Panelleri
    const vars72 = document.getElementById('vars-container-7-2');
    const vars73 = document.getElementById('vars-container-7-3');
    const vars74 = document.getElementById('vars-container-7-4');
    if (vars72) vars72.classList.toggle('is-hidden', !is72);
    if (vars73) vars73.classList.toggle('is-hidden', !is73);
    if (vars74) vars74.classList.toggle('is-hidden', !is74);

    // Rehber Panelleri
    const guide72 = document.getElementById('guide-container-7-2');
    const guide73 = document.getElementById('guide-container-7-3');
    const guide74 = document.getElementById('guide-container-7-4');
    if (guide72) guide72.classList.toggle('is-hidden', !is72);
    if (guide73) guide73.classList.toggle('is-hidden', !is73);
    if (guide74) guide74.classList.toggle('is-hidden', !is74);

    if (is72) {
        initEnergyState();
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
    if (labState.activeExperimentId === "7.2") {
        resetEnergyExperiment();
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

    if (labState.activeExperimentId === "7.2") {
        initEnergyState();
    } else if (labState.activeExperimentId === "7.3") {
        calculateOpticsPhysics();
    } else if (labState.activeExperimentId === "7.4") {
        calculateLensPhysics();
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
            if (labState.activeExperimentId === "7.2") {
                updateEnergyPhysics();
                drawEnergySimulation();
            } else if (labState.activeExperimentId === "7.3") {
                drawOpticsSimulation();
            } else if (labState.activeExperimentId === "7.4") {
                drawLensSimulation();
            }
        }
        if (labState.activeExperimentId) {
            animFrameId = requestAnimationFrame(render);
        }
    };
    animFrameId = requestAnimationFrame(render);
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
        const v = Math.abs(radius * omega);
        const Ek = 0.5 * m * (v * v);
        const Emek = Ep + Ek;

        energy.totalEnergy = E_initial;
        energy.heatEnergy = Math.max(0, Math.min(E_initial, E_initial - Emek));

        energy.currentHeight = hCur;
        energy.currentSpeed = v;
        energy.potentialEnergy = Ep;
        energy.kineticEnergy = Ek;
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

    if (energy.mode === "pendulum") {
        const p = energy.pendulum;
        const L = p.length;

        for (let i = 0; i < subSteps; i++) {
            const alpha = -(g / L) * Math.sin(p.angle) - damping * p.omega;
            p.omega += alpha * subDt;
            p.angle += p.omega * subDt;

            if (energy.frictionEnabled) {
                if (Math.abs(p.angle) < 0.004 && Math.abs(p.omega) < 0.004) {
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

            if (energy.frictionEnabled) {
                if (Math.abs(r.angle) < 0.004 && Math.abs(r.omega) < 0.004) {
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

    // Snell Kanunu: n1 * sin(theta1) = n2 * sin(theta2)
    const rad1 = (incidentAngle * Math.PI) / 180;
    const sinTheta2 = (n1 / n2) * Math.sin(rad1);

    if (sinTheta2 > 1.000001) {
        labState.optics.isTotalInternalReflection = true;
        labState.optics.refractedAngle = null;
    } else {
        labState.optics.isTotalInternalReflection = false;
        const rad2 = Math.asin(Math.min(1, sinTheta2));
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
        behaviorText = "Yüzeye Dik (Doğrultu Değişmez)";
        behaviorColor = "#f59e0b";
        if (hudRef) hudRef.textContent = `0°`;
    } else if (isTotalInternalReflection) {
        behaviorText = "⚡ TAM YANSIMA (Kırılma Yok!)";
        behaviorColor = "#ef4444";
        if (hudRef) hudRef.textContent = `Yok (Yansıdı)`;
    } else if (criticalAngle && Math.abs(incidentAngle - criticalAngle) < 0.5) {
        behaviorText = "Sınır Açısı (Yüzeyi Yalar - 90°)";
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
        drawLaserBeam(ctx, originX, originY, reflectX, reflectY, "#ff0055", 4 * scale, 1.0);
        ctx.font = `bold ${Math.max(14, 16 * scale)}px 'Nunito', sans-serif`;
        ctx.fillStyle = "#ff0055";
        ctx.textAlign = "center";
        ctx.fillText("⚡ TAM YANSIMA GERÇEKLEŞTİ", originX + (120 * scale), originY - (110 * scale));
    } else if (incidentAngle > 0) {
        drawLaserBeam(ctx, originX, originY, reflectX, reflectY, "rgba(255, 60, 100, 0.35)", 2 * scale, 0.4);
    }

    // Kırılan Işın
    if (!isTotalInternalReflection && refractedAngle !== null) {
        const rad2 = (refractedAngle * Math.PI) / 180;
        const refractX = originX + Math.sin(rad2) * radius;
        const refractY = originY + Math.cos(rad2) * radius;

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
        const delta = objectDistance - fVal;
        if (isConvex && Math.abs(delta) < 4) {
            di = null;
            mag = null;
            hi = null;
            statusText = "Görüntü Sonsuzda (Işınlar Paralel, Oluşmaz)";
            statusColor = "#94a3b8";
        } else {
            di = (fVal * objectDistance) / delta;
            mag = -di / objectDistance;
            hi = mag * objectHeight;

            const isReal = di > 0;
            const isErect = mag > 0;
            const sizeDesc = Math.abs(mag) > 1.05 ? "Büyük" : Math.abs(mag) < 0.95 ? "Küçük" : "Eşit Boyda";

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
                    pedText.textContent = 'Cisim tam odak noktasına (do = f) yerleştirildiğinde kırılan ışınlar birbirine paralel gider ve kesişmez; net görüntü oluşmaz.';
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
    const objX = cx - doVal;
    const objY = cy - ho;

    // 1. Cisim Mumun Çizimi
    drawCandle(ctx, objX, cy, ho, true, 1.0, scale, "Cisim (Mum)");

    // 2. Işın Çizimi (Işın 1: Paralel Gelen ➔ Odaktan Kırılan)
    drawLaserBeam(ctx, objX, objY, cx, objY, "#ff3366", 2.2 * scale, 0.92);

    if (isConvex) {
        // İnce Mercekte Işın 1 F2'den Geçer
        if (diVal !== null) {
            const imgX = cx + diVal;
            const imgY = cy - hiVal;

            if (diVal > 0) {
                // Gerçek Görüntü: Işın F2'den geçip görüntü tepesine ulaşır
                drawLaserBeam(ctx, cx, objY, imgX, imgY, "#38bdf8", 2.2 * scale, 0.92);
            } else {
                // Sanal Görüntü: Işın sağa doğru kırılır, geriye doğru sanal uzantı kesişir
                const slope = (cy - objY) / f;
                const endX = cx + (250 * scale);
                const endY = cy + slope * (endX - (cx + f));
                drawLaserBeam(ctx, cx, objY, endX, endY, "#38bdf8", 2.2 * scale, 0.92);

                // Geriye Sanal Kesikli Çizgi
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([4 * scale, 4 * scale]);
                ctx.moveTo(cx, objY);
                ctx.lineTo(imgX, imgY);
                ctx.strokeStyle = "rgba(56, 189, 248, 0.75)";
                ctx.lineWidth = 1.6 * scale;
                ctx.stroke();
                ctx.restore();
            }

            // Işın 2 (Optik Merkezden Geçen Işın: Kırılmaz)
            if (diVal > 0) {
                drawLaserBeam(ctx, objX, objY, imgX, imgY, "#10b981", 2.2 * scale, 0.92);
            } else {
                const endX = cx + (250 * scale);
                const slope2 = (cy - objY) / doVal;
                const endY = cy + slope2 * (endX - cx);
                drawLaserBeam(ctx, objX, objY, endX, endY, "#10b981", 2.2 * scale, 0.92);

                // Geriye Sanal Kesikli Çizgi
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([4 * scale, 4 * scale]);
                ctx.moveTo(objX, objY);
                ctx.lineTo(imgX, imgY);
                ctx.strokeStyle = "rgba(16, 185, 129, 0.75)";
                ctx.lineWidth = 1.6 * scale;
                ctx.stroke();
                ctx.restore();
            }

            // Görüntü Mumunun Çizimi
            const isReal = diVal > 0;
            drawCandle(ctx, imgX, cy, Math.abs(hiVal), isReal ? hiVal < 0 : true, isReal ? 0.95 : 0.65, scale, isReal ? "Gerçek Görüntü (Ters)" : "Sanal Görüntü (Büyüteç)", isReal);
        }
    } else {
        // Kalın Mercekte: Işın 1 geriye F1'e uzanarak dağılır
        if (diVal !== null) {
            const imgX = cx + diVal;
            const imgY = cy - hiVal;

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
            drawCandle(ctx, imgX, cy, Math.abs(hiVal), true, 0.7, scale, "Sanal Görüntü (Küçük)", false);
        }
    }
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

// --- 9. POINTER VE TOUCH ETKİLEŞİMİ (AKILLI TAHTA & MOBİL) ---
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

        // Deney 7.2: Sarkaç Açısı veya Rampa Konumu Ayarı
        if (labState.activeExperimentId === "7.2") {
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
    };

    cvs.addEventListener('pointerdown', (e) => {
        cvs.setPointerCapture(e.pointerId);
        if (labState.activeExperimentId === "7.2") {
            labState.energy.pendulum.isDragging = true;
            labState.energy.ramp.isDragging = true;
        }
        labState.optics.isDraggingLaser = true;
        labState.lens.isDraggingObject = true;
        handlePointerAction(e);
    });

    cvs.addEventListener('pointermove', (e) => {
        const isDragging72 = (labState.activeExperimentId === "7.2" && (labState.energy.pendulum.isDragging || labState.energy.ramp.isDragging));
        if (isDragging72 || labState.optics.isDraggingLaser || labState.lens.isDraggingObject) {
            handlePointerAction(e);
        }
    });

    const stopDragging = (e) => {
        if (labState.energy) {
            labState.energy.pendulum.isDragging = false;
            labState.energy.ramp.isDragging = false;
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

    if (expId === "7.2") {
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
    }
}

function recordMeasurement() {
    const expId = labState.activeExperimentId;

    if (expId === "7.2") {
        const energy = labState.energy;
        const modeLabel = energy.mode === "pendulum" ? "🔄 Sarkaç" : "🛹 U-Rampa";
        const row = {
            id: energy.measurements.length + 1,
            col1: modeLabel,
            col2: `${energy.mass.toFixed(1)} kg`,
            col3: `h = ${energy.currentHeight.toFixed(2)} m · v = ${energy.currentSpeed.toFixed(2)} m/s`,
            col4: `Ep: ${energy.potentialEnergy.toFixed(1)} J · Ek: ${energy.kineticEnergy.toFixed(1)} J`,
            col5: `Etop: ${energy.totalEnergy.toFixed(1)} J (Eısı: ${energy.heatEnergy.toFixed(1)} J)`
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
            refractStr = "0° (Doğrultu sabit)";
            behaviorStr = med1.n === med2.n ? "Aynı Ortam" : "Hız Değişti, Doğrultu Sabit";
        } else if (isTotalInternalReflection) {
            refractStr = "Kırılma Yok";
            behaviorStr = `Tam Yansıma (${incidentAngle}° ile yansıdı)`;
        } else if (criticalAngle && Math.abs(incidentAngle - criticalAngle) < 0.5) {
            refractStr = "90.0° (Sınır Açısı)";
            behaviorStr = "Yüzeyi Yalar";
        } else if (med1.n < med2.n) {
            refractStr = `${refractedAngle.toFixed(1)}°`;
            behaviorStr = "Normale Yaklaşır (Hız Azalır)";
        } else {
            refractStr = `${refractedAngle.toFixed(1)}°`;
            behaviorStr = "Normalden Uzaklaşır (Hız Artar)";
        }

        const row = {
            id: labState.optics.measurements.length + 1,
            col1: `${med1.name} ➔ ${med2.name}`,
            col2: `${incidentAngle}°`,
            col3: refractStr,
            col4: `${(med1.speed / 1000).toFixed(0)}k ➔ ${(med2.speed / 1000).toFixed(0)}k km/s`,
            col5: behaviorStr
        };

        labState.optics.measurements.push(row);
        showLabToast(`Gözlem #${row.id} deftere kaydedildi!`);
    } else if (expId === "7.4") {
        const { type, mode, focalLength, objectDistance, imageDistance, magnification } = labState.lens;
        const isConvex = (type === "convex");

        let modeDesc = mode === "parallel" ? "Paralel Işın" : "Mum (Cisim)";
        let doDesc = mode === "parallel" ? "Sonsuz" : `${objectDistance} mm`;
        let diDesc = "";

        if (mode === "parallel") {
            diDesc = isConvex ? `Odakta Toplanır (f = ${focalLength} mm)` : `Odaktan Dağılır (f = -${focalLength} mm)`;
        } else {
            if (imageDistance === null) {
                diDesc = "Sonsuzda (Görüntü Oluşmaz)";
            } else {
                const isReal = imageDistance > 0;
                const sizeText = Math.abs(magnification) > 1.05 ? "Büyük" : Math.abs(magnification) < 0.95 ? "Küçük" : "Eşit";
                diDesc = `${Math.round(Math.abs(imageDistance))} mm (${isReal ? 'Gerçek/Ters' : 'Sanal/Düz'}, ${sizeText})`;
            }
        }

        const row = {
            id: labState.lens.measurements.length + 1,
            col1: isConvex ? "İnce Kenarlı" : "Kalın Kenarlı",
            col2: modeDesc,
            col3: doDesc,
            col4: `${focalLength} mm`,
            col5: diDesc
        };

        labState.lens.measurements.push(row);
        showLabToast(`Mercek Gözlemi #${row.id} deftere kaydedildi!`);
    }

    renderMeasurementTable();
}

function renderMeasurementTable() {
    const tbody = document.getElementById('lab-table-body');
    const emptyMsg = document.getElementById('lab-table-empty');
    if (!tbody || !emptyMsg) return;

    const expId = labState.activeExperimentId;
    let measurements = [];
    if (expId === "7.2") {
        measurements = labState.energy.measurements;
    } else if (expId === "7.4") {
        measurements = labState.lens.measurements;
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
    if (expId === "7.2") {
        labState.energy.measurements = [];
    } else if (expId === "7.4") {
        labState.lens.measurements = [];
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

        if (deg % 30 === 0 && deg > 0) {
            ctx.font = `${Math.max(9, 10 * scale)}px sans-serif`;
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.textAlign = "center";
            ctx.fillText(`${deg}°`, cx - Math.sin(rad) * (r - 24 * scale), cy - Math.cos(rad) * (r - 24 * scale) + 4 * scale);
            ctx.fillText(`${deg}°`, cx + Math.sin(rad) * (r - 24 * scale), cy + Math.cos(rad) * (r - 24 * scale) + 4 * scale);
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
