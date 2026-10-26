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
        active: false,
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

    // 6. DENEY 7.4 KONTROLLERİ (MERCEKLER VE ODAKLAMA)
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
    const is73 = (expId === "7.3");
    const is74 = (expId === "7.4");

    // HUD Panelleri
    const hud73 = document.getElementById('hud-exp-7-3');
    const hud74 = document.getElementById('hud-exp-7-4');
    if (hud73) hud73.classList.toggle('is-hidden', !is73);
    if (hud74) hud74.classList.toggle('is-hidden', !is74);

    // Hızlı Kontroller (Canvas Altı)
    const qc73 = document.getElementById('quick-controls-7-3');
    const qc74 = document.getElementById('quick-controls-7-4');
    if (qc73) qc73.classList.toggle('is-hidden', !is73);
    if (qc74) qc74.classList.toggle('is-hidden', !is74);

    // Değişkenler Panelleri
    const vars73 = document.getElementById('vars-container-7-3');
    const vars74 = document.getElementById('vars-container-7-4');
    if (vars73) vars73.classList.toggle('is-hidden', !is73);
    if (vars74) vars74.classList.toggle('is-hidden', !is74);

    // Rehber Panelleri
    const guide73 = document.getElementById('guide-container-7-3');
    const guide74 = document.getElementById('guide-container-7-4');
    if (guide73) guide73.classList.toggle('is-hidden', !is73);
    if (guide74) guide74.classList.toggle('is-hidden', !is74);

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
    if (labState.activeExperimentId === "7.3") {
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

    if (labState.activeExperimentId === "7.3") {
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
            if (labState.activeExperimentId === "7.3") {
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

    // HUD ve Metrikleri Güncelle
    const hudType = document.getElementById('hud-lens-type');
    const hudFocal = document.getElementById('hud-lens-focal');
    const hudStatus = document.getElementById('hud-lens-status');

    if (hudType) hudType.textContent = isConvex ? "İnce Kenarlı (Yakınsak)" : "Kalın Kenarlı (Iraksak)";
    if (hudFocal) hudFocal.textContent = `${focalLength} mm`;
    if (hudStatus) {
        hudStatus.textContent = statusText;
        hudStatus.style.borderColor = statusColor;
    }

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
    ctx.moveTo(30 * scale, cy);
    ctx.lineTo(W - (30 * scale), cy);
    ctx.strokeStyle = "rgba(0, 210, 255, 0.4)";
    ctx.lineWidth = 2 * scale;
    ctx.stroke();

    ctx.font = `${Math.max(11, 12 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "rgba(0, 210, 255, 0.7)";
    ctx.textAlign = "right";
    ctx.fillText("Asal Eksen ➔", W - (35 * scale), cy - (8 * scale));

    // 2. Odak ve Merkez Noktaları (F1, 2F1, F2, 2F2, O)
    drawFocalPoint(ctx, cx - f, cy, "F₁", scale);
    drawFocalPoint(ctx, cx - (2 * f), cy, "2F₁", scale);
    drawFocalPoint(ctx, cx + f, cy, "F₂", scale);
    drawFocalPoint(ctx, cx + (2 * f), cy, "2F₂", scale);

    // Optik Merkez (O)
    ctx.beginPath();
    ctx.arc(cx, cy, 3 * scale, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.font = `bold ${Math.max(11, 12 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.textAlign = "center";
    ctx.fillText("O", cx, cy + (18 * scale));

    // 3. Merceğin Çizimi (Cam Gövde & Sembolik Oklar)
    drawLensElement(ctx, cx, cy, isConvex, scale);

    // 4. MODA GÖRE IŞINLARIN VE CİSMİN ÇİZİMİ
    if (mode === "parallel") {
        drawParallelRaysMode(ctx, cx, cy, f, isConvex, scale);
    } else {
        drawCandleObjectMode(ctx, cx, cy, f, isConvex, objectDistance * scale, objectHeight * scale, imageDistance !== null ? imageDistance * scale : null, imageHeight !== null ? imageHeight * scale : null, scale);
    }

    ctx.restore();
}

function drawFocalPoint(ctx, x, y, label, scale) {
    ctx.beginPath();
    ctx.arc(x, y, 4 * scale, 0, Math.PI * 2);
    ctx.fillStyle = "var(--neon-blue)";
    ctx.fill();

    // Dikey küçük çentik
    ctx.beginPath();
    ctx.moveTo(x, y - (8 * scale));
    ctx.lineTo(x, y + (8 * scale));
    ctx.strokeStyle = "rgba(0, 210, 255, 0.6)";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    ctx.font = `bold ${Math.max(11, 13 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "#93c5fd";
    ctx.textAlign = "center";
    ctx.fillText(label, x, y + (22 * scale));
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

        ctx.font = `bold ${Math.max(12, 14 * scale)}px 'Nunito', sans-serif`;
        ctx.fillStyle = "#38bdf8";
        ctx.textAlign = "center";
        ctx.fillText("İnce Kenarlı (Yakınsak) Mercek", cx, cy - lensH - (14 * scale));
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

        ctx.font = `bold ${Math.max(12, 14 * scale)}px 'Nunito', sans-serif`;
        ctx.fillStyle = "#c084fc";
        ctx.textAlign = "center";
        ctx.fillText("Kalın Kenarlı (Iraksak) Mercek", cx, cy - lensH - (14 * scale));
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
    const offsets = [-70, -35, 0, 35, 70].map(v => v * scale);

    offsets.forEach(dy => {
        const rayY = cy + dy;

        // Soldan merceğe gelen paralel ışın
        drawLaserBeam(ctx, 40 * scale, rayY, cx, rayY, "#ff3366", 3 * scale, 1.0);

        if (dy === 0) {
            // Asal eksen üzerindeki ışın kırılmadan dümdüz devam eder
            drawLaserBeam(ctx, cx, cy, W - (40 * scale), cy, isConvex ? "#38bdf8" : "#c084fc", 3 * scale, 1.0);
            return;
        }

        if (isConvex) {
            // İNCE KENARLI: Işın F2 noktasından geçerek kırılır ve sağ kenara gider
            const slope = -dy / f; // m = (cy - rayY) / f
            const endX = W - (40 * scale);
            const endY = cy + slope * (endX - (cx + f));

            drawLaserBeam(ctx, cx, rayY, cx + f, cy, "#38bdf8", 3 * scale, 0.95);
            drawLaserBeam(ctx, cx + f, cy, endX, endY, "#38bdf8", 2.5 * scale, 0.85);
        } else {
            // KALIN KENARLI: Işın uzantısı F1'den geçecek şekilde dağılır
            const slope = dy / f;
            const endX = W - (40 * scale);
            const endY = rayY + slope * (endX - cx);

            // Gerçek dağılan ışın
            drawLaserBeam(ctx, cx, rayY, endX, endY, "#c084fc", 3 * scale, 0.95);

            // Geriye doğru sanal odak uzantısı (Kesikli Çizgi)
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([5 * scale, 5 * scale]);
            ctx.moveTo(cx, rayY);
            ctx.lineTo(cx - f, cy);
            ctx.strokeStyle = "rgba(192, 132, 252, 0.55)";
            ctx.lineWidth = 2 * scale;
            ctx.stroke();
            ctx.restore();
        }
    });

    // İnce mercekte Odakta Parlama / Ateş Efekti (Orman Yangını Vurgusu)
    if (isConvex) {
        drawFireHeatEffect(ctx, cx + f, cy, scale);
    }
}

function drawFireHeatEffect(ctx, x, y, scale) {
    ctx.save();
    const pulse = Math.sin(animTime * 3) * (5 * scale);
    const radius = (18 * scale) + pulse;

    // Işık / Isı Parıltı Çemberi
    const grad = ctx.createRadialGradient(x, y, 2 * scale, x, y, radius);
    grad.addColorStop(0, "rgba(255, 255, 255, 1)");
    grad.addColorStop(0.3, "rgba(251, 191, 36, 0.9)");
    grad.addColorStop(0.7, "rgba(239, 68, 68, 0.6)");
    grad.addColorStop(1, "rgba(239, 68, 68, 0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Kıvılcım parçacıkları
    for (let i = 0; i < 6; i++) {
        const sparkAngle = animTime * 2 + (i * (Math.PI / 3));
        const sparkDist = (22 * scale) + Math.cos(animTime * 4 + i) * (8 * scale);
        const sx = x + Math.cos(sparkAngle) * sparkDist;
        const sy = y + Math.sin(sparkAngle) * sparkDist;
        ctx.beginPath();
        ctx.arc(sx, sy, 2 * scale, 0, Math.PI * 2);
        ctx.fillStyle = "#fef08a";
        ctx.fill();
    }

    // Eğitim Uyarısı Etiketi
    ctx.font = `bold ${Math.max(11, 13 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "#f59e0b";
    ctx.textAlign = "center";
    ctx.fillText("🔥 IŞIĞI TOPLAR (Odak Noktası)", x, y - (30 * scale));
    ctx.font = `${Math.max(10, 11 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = "#fca5a5";
    ctx.fillText("Güneş ışığını toplayarak orman yangınlarına yol açabilir!", x, y - (16 * scale));

    ctx.restore();
}

function drawCandleObjectMode(ctx, cx, cy, f, isConvex, doVal, ho, diVal, hiVal, scale) {
    const objX = cx - doVal;
    const objY = cy - ho;

    // 1. Cisim Mumun Çizimi
    drawCandle(ctx, objX, cy, ho, true, 1.0, scale, "Cisim (Mum)");

    // 2. Işın Çizimi (Işın 1: Paralel Gelen ➔ Odaktan Kırılan)
    drawLaserBeam(ctx, objX, objY, cx, objY, "#ff3366", 2.5 * scale, 0.9);

    if (isConvex) {
        // İnce Mercekte Işın 1 F2'den Geçer
        if (diVal !== null) {
            const imgX = cx + diVal;
            const imgY = cy - hiVal;

            if (diVal > 0) {
                // Gerçek Görüntü: Işın F2'den geçip görüntü tepesine ulaşır
                drawLaserBeam(ctx, cx, objY, imgX, imgY, "#38bdf8", 2.5 * scale, 0.9);
            } else {
                // Sanal Görüntü: Işın sağa doğru kırılır, geriye doğru sanal uzantı kesişir
                const slope = (cy - objY) / f;
                const endX = cx + (250 * scale);
                const endY = cy + slope * (endX - (cx + f));
                drawLaserBeam(ctx, cx, objY, endX, endY, "#38bdf8", 2.5 * scale, 0.9);

                // Geriye Sanal Kesikli Çizgi
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([5 * scale, 5 * scale]);
                ctx.moveTo(cx, objY);
                ctx.lineTo(imgX, imgY);
                ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
                ctx.lineWidth = 2 * scale;
                ctx.stroke();
                ctx.restore();
            }

            // Işın 2 (Optik Merkezden Geçen Işın: Kırılmaz)
            if (diVal > 0) {
                drawLaserBeam(ctx, objX, objY, imgX, imgY, "#10b981", 2.5 * scale, 0.9);
            } else {
                const endX = cx + (250 * scale);
                const slope2 = (cy - objY) / doVal;
                const endY = cy + slope2 * (endX - cx);
                drawLaserBeam(ctx, objX, objY, endX, endY, "#10b981", 2.5 * scale, 0.9);

                // Geriye Sanal Kesikli Çizgi
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([5 * scale, 5 * scale]);
                ctx.moveTo(objX, objY);
                ctx.lineTo(imgX, imgY);
                ctx.strokeStyle = "rgba(16, 185, 129, 0.6)";
                ctx.lineWidth = 2 * scale;
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
            drawLaserBeam(ctx, cx, objY, endX, endY, "#c084fc", 2.5 * scale, 0.9);

            // Geriye Sanal Kesikli Çizgi
            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([5 * scale, 5 * scale]);
            ctx.moveTo(cx, objY);
            ctx.lineTo(cx - f, cy);
            ctx.strokeStyle = "rgba(192, 132, 252, 0.6)";
            ctx.lineWidth = 2 * scale;
            ctx.stroke();
            ctx.restore();

            // Işın 2 (Optik Merkezden Geçen)
            const slope2 = (cy - objY) / doVal;
            const end2X = cx + (250 * scale);
            const end2Y = cy + slope2 * (end2X - cx);
            drawLaserBeam(ctx, objX, objY, end2X, end2Y, "#10b981", 2.5 * scale, 0.9);

            // Görüntü Mumunun Çizimi (Daima Sanal, Düz, Küçük)
            drawCandle(ctx, imgX, cy, Math.abs(hiVal), true, 0.7, scale, "Sanal Görüntü (Küçük)", false);
        }
    }
}

function drawCandle(ctx, x, baseY, height, isUpright, alpha, scale, label, isReal = false) {
    ctx.save();
    ctx.globalAlpha = alpha;

    const candleW = 14 * scale;
    const flameH = 20 * scale;
    const dir = isUpright ? 1 : -1;

    // Mum Gövdesi
    const bodyH = Math.max(15 * scale, height - flameH);
    const bodyTopY = baseY - (dir * bodyH);

    ctx.fillStyle = isReal ? "#38bdf8" : "#fbbf24";
    ctx.strokeStyle = isReal ? "#0284c7" : "#d97706";
    ctx.lineWidth = 1.5 * scale;

    ctx.beginPath();
    ctx.roundRect(x - (candleW / 2), Math.min(baseY, bodyTopY), candleW, bodyH, 3 * scale);
    ctx.fill();
    ctx.stroke();

    // Mum Fitili
    const wickTopY = bodyTopY - (dir * (4 * scale));
    ctx.beginPath();
    ctx.moveTo(x, bodyTopY);
    ctx.lineTo(x, wickTopY);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    // Mum Alevi (Titreşen Animasyon)
    const flicker = Math.sin(animTime * 10 + x) * (2 * scale);
    const flameTipY = wickTopY - (dir * (flameH + flicker));

    const flameGrad = ctx.createRadialGradient(x, wickTopY - (dir * (flameH / 2)), 2 * scale, x, wickTopY - (dir * (flameH / 2)), flameH);
    flameGrad.addColorStop(0, "#ffffff");
    flameGrad.addColorStop(0.3, "#fef08a");
    flameGrad.addColorStop(0.7, "#f97316");
    flameGrad.addColorStop(1, "rgba(239, 68, 68, 0)");

    ctx.fillStyle = flameGrad;
    ctx.beginPath();
    ctx.moveTo(x - (6 * scale), wickTopY);
    ctx.quadraticCurveTo(x - (8 * scale), wickTopY - (dir * (flameH * 0.6)), x, flameTipY);
    ctx.quadraticCurveTo(x + (8 * scale), wickTopY - (dir * (flameH * 0.6)), x + (6 * scale), wickTopY);
    ctx.closePath();
    ctx.fill();

    // Etiket
    ctx.font = `bold ${Math.max(10, 12 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = isReal ? "#38bdf8" : "#fef08a";
    ctx.textAlign = "center";
    const labelY = isUpright ? flameTipY - (10 * scale) : flameTipY + (18 * scale);
    ctx.fillText(label, x, labelY);

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

        // Deney 7.3: Lazer Açısı Ayarı
        if (labState.activeExperimentId === "7.3") {
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
        labState.optics.isDraggingLaser = true;
        labState.lens.isDraggingObject = true;
        handlePointerAction(e);
    });

    cvs.addEventListener('pointermove', (e) => {
        if (labState.optics.isDraggingLaser || labState.lens.isDraggingObject) {
            handlePointerAction(e);
        }
    });

    const stopDragging = (e) => {
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

    if (expId === "7.3") {
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

    if (expId === "7.3") {
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
    const measurements = (expId === "7.4") ? labState.lens.measurements : labState.optics.measurements;

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
    if (expId === "7.4") {
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
    ctx.shadowBlur = 12;
    ctx.stroke();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(1, width * 0.35);
    ctx.shadowBlur = 0;
    ctx.stroke();

    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowLen = 12 * (width / 3.5);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    ctx.beginPath();
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX - arrowLen * Math.cos(angle - Math.PI / 6), midY - arrowLen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(midX, midY);
    ctx.lineTo(midX - arrowLen * Math.cos(angle + Math.PI / 6), midY - arrowLen * Math.sin(angle + Math.PI / 6));
    ctx.strokeStyle = color;
    ctx.lineWidth = width * 0.7;
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
