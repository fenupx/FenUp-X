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
        active: true, // 🏆 PİLOT DENEY AKTİF!
        desc: "Farklı optik yoğunluktaki ortamlarda ışığın hızını, kırılma açısını, normale yaklaşma/uzaklaşma durumunu ve tam yansımayı keşfedin."
    },
    {
        id: "7.4", grade: 7, unit: 4, unitName: "Işığın Kırılması ve Mercekler",
        title: "İnce ve Kalın Kenarlı Merceklerde Işığın Odaklanması",
        code: "FB.7.4.2 - FB.7.4.3", bookRef: "2. Kitap, s. 30–41",
        active: false,
        desc: "Yakınsak ve ıraksak merceklere paralel ışınlar göndererek odak noktası (F) ve görüntü oluşum mekanizmasını inceleyin."
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
    air: {
        name: "Hava",
        n: 1.00,
        speed: 300000,
        bgColor: "rgba(10, 20, 45, 0.45)",
        highlightColor: "#60a5fa",
        label: "Hava (Az Yoğun)"
    },
    water: {
        name: "Su",
        n: 1.33,
        speed: 225564,
        bgColor: "rgba(0, 95, 160, 0.45)",
        highlightColor: "#38bdf8",
        label: "Su (Çok Yoğun)"
    },
    glass: {
        name: "Cam",
        n: 1.50,
        speed: 200000,
        bgColor: "rgba(60, 50, 140, 0.5)",
        highlightColor: "#c084fc",
        label: "Cam (Çok Yoğun)"
    },
    diamond: {
        name: "Elmas",
        n: 2.42,
        speed: 123967,
        bgColor: "rgba(15, 140, 170, 0.55)",
        highlightColor: "#2dd4bf",
        label: "Elmas (Aşırı Yoğun)"
    }
};

// --- 3. SANAL LABORATUVAR DURUM YÖNETİMİ (STATE) ---
export const labState = {
    currentGrade: 7, // Varsayılan olarak pilot deneyin olduğu 7. sınıf
    currentUnitFilter: "all",
    activeExperimentId: null,

    // Deney 7.3 Fizik Durumu
    optics: {
        medium1: "air",
        medium2: "water",
        incidentAngle: 30, // Derece (0 - 85)
        refractedAngle: null,
        isTotalInternalReflection: false,
        criticalAngle: null,
        isDraggingLaser: false,
        measurements: []
    }
};

// Canvas & Animasyon Değişkenleri
let canvas = null;
let ctx = null;
let animFrameId = null;

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
    const grid = document.getElementById('lab-cards-grid');
    const pillsContainer = document.getElementById('lab-unit-pills');
    if (!grid || !pillsContainer) return;

    // 1. Ünite Filtre Rozetlerini Doldur
    const gradeExps = EXPERIMENTS_DATABASE.filter(e => e.grade === labState.currentGrade);
    const unitsMap = new Map();
    gradeExps.forEach(e => {
        if (!unitsMap.has(e.unit)) {
            unitsMap.set(e.unit, e.unitName);
        }
    });

    let pillsHTML = `<button class="lab-pill-btn ${labState.currentUnitFilter === 'all' ? 'active' : ''}" data-unit="all">Tüm Üniteler (${gradeExps.length})</button>`;
    unitsMap.forEach((name, unitNum) => {
        const count = gradeExps.filter(e => e.unit === unitNum).length;
        const isActive = labState.currentUnitFilter === String(unitNum);
        pillsHTML += `<button class="lab-pill-btn ${isActive ? 'active' : ''}" data-unit="${unitNum}">${unitNum}. Ünite: ${name} (${count})</button>`;
    });
    pillsContainer.innerHTML = pillsHTML;

    // Rozet Tıklama Olayları
    pillsContainer.querySelectorAll('.lab-pill-btn').forEach(pill => {
        pill.addEventListener('click', () => {
            labState.currentUnitFilter = pill.dataset.unit;
            renderCatalog();
        });
    });

    // 2. Deney Kartlarını Doldur
    let filteredExps = gradeExps;
    if (labState.currentUnitFilter !== "all") {
        filteredExps = gradeExps.filter(e => e.unit === parseInt(labState.currentUnitFilter, 10));
    }

    if (filteredExps.length === 0) {
        grid.innerHTML = `<div class="lab-empty-catalog"><i class="fas fa-flask"></i><p>Bu ünitede kayıtlı deney simülasyonu bulunmamaktadır.</p></div>`;
        return;
    }

    let cardsHTML = "";
    filteredExps.forEach(exp => {
        const isPilot = exp.active;
        cardsHTML += `
            <div class="lab-card ${isPilot ? 'pilot-active' : 'upcoming'}">
                <div class="lab-card-header">
                    <span class="lab-card-grade-badge">${exp.grade}. Sınıf / ${exp.unit}. Ünite</span>
                    ${isPilot 
                        ? '<span class="lab-card-status-badge pilot"><i class="fas fa-check-circle"></i> Canlı Pilot Deney</span>' 
                        : '<span class="lab-card-status-badge upcoming"><i class="fas fa-tools"></i> Hazırlanıyor</span>'}
                </div>
                <h3 class="lab-card-title">${exp.title}</h3>
                <div class="lab-card-meta">
                    <span><i class="fas fa-book"></i> ${exp.bookRef}</span>
                    <span><i class="fas fa-bullseye"></i> ${exp.code}</span>
                </div>
                <p class="lab-card-desc">${exp.desc}</p>
                <div class="lab-card-footer">
                    ${isPilot 
                        ? `<button class="action-btn lab-launch-btn" data-exp-id="${exp.id}"><i class="fas fa-play"></i> Laboratuvara Başla</button>` 
                        : `<button class="action-btn secondary lab-upcoming-btn" data-exp-id="${exp.id}"><i class="fas fa-lock"></i> Faz 2 Kapsamında</button>`}
                </div>
            </div>
        `;
    });
    grid.innerHTML = cardsHTML;

    // Kart Butonları Olay Dinleyicileri
    grid.querySelectorAll('.lab-launch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const expId = btn.dataset.expId;
            openExperimentWorkspace(expId);
        });
    });

    grid.querySelectorAll('.lab-upcoming-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showLabToast("🔬 Bu deney Maarif Modeli Faz 2 kapsamında geliştirilmektedir. Aktif olan 'Deney 7.3: Işığın Kırılması' pilot simülasyonunu şimdi inceleyebilirsiniz!");
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
    // 1. Laboratuvara Dön Butonu
    const btnBackCatalog = document.getElementById('btn-lab-back-catalog');
    if (btnBackCatalog) {
        btnBackCatalog.addEventListener('click', closeExperimentWorkspace);
    }

    // 2. Sıfırla Butonu
    const btnReset = document.getElementById('btn-lab-reset');
    if (btnReset) {
        btnReset.addEventListener('click', resetCurrentExperiment);
    }

    // 3. Tam Ekran Butonu
    const btnFullscreen = document.getElementById('btn-lab-fullscreen');
    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', toggleLabFullscreen);
    }

    // 4. Mobil Tab Seçicileri
    document.querySelectorAll('.lab-tab-btn').forEach(tabBtn => {
        tabBtn.addEventListener('click', () => {
            const tabKey = tabBtn.dataset.tab;
            document.querySelectorAll('.lab-tab-btn').forEach(b => b.classList.remove('active'));
            tabBtn.classList.add('active');

            document.querySelectorAll('.lab-tab-pane').forEach(pane => {
                pane.classList.add('is-hidden');
            });
            const targetPane = document.getElementById(`pane-${tabKey}`);
            if (targetPane) targetPane.classList.remove('is-hidden');
        });
    });

    // 5. Deney 7.3 Ortam Seçicileri
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

    // Ortamları Değiş-Tokuş Et Butonu
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

    // 6. Açı Kontrolleri (Slider & Hassas Adım Butonları)
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
        if (btn) {
            btn.addEventListener('click', () => {
                setIncidentAngle(labState.optics.incidentAngle + delta);
            });
        }
    });

    // 7. Gözlemi Kaydet & Temizle Butonları
    const btnRecord = document.getElementById('btn-record-data');
    if (btnRecord) {
        btnRecord.addEventListener('click', recordMeasurement);
    }

    const btnClearTable = document.getElementById('btn-clear-table');
    if (btnClearTable) {
        btnClearTable.addEventListener('click', clearMeasurementTable);
    }

    // 8. Canvas Pointer (Mouse & Touch) Etkileşimi
    setupCanvasPointerEvents();
}

export function openLabView() {
    renderCatalog();
    const catalogView = document.getElementById('lab-catalog-view');
    const workspaceView = document.getElementById('lab-workspace-view');
    if (catalogView) catalogView.classList.remove('is-hidden');
    if (workspaceView) workspaceView.classList.add('is-hidden');
}

export function openExperimentWorkspace(expId) {
    const exp = EXPERIMENTS_DATABASE.find(e => e.id === expId);
    if (!exp) return;

    labState.activeExperimentId = expId;

    const catalogView = document.getElementById('lab-catalog-view');
    const workspaceView = document.getElementById('lab-workspace-view');
    if (catalogView) catalogView.classList.add('is-hidden');
    if (workspaceView) workspaceView.classList.remove('is-hidden');

    // Başlık ve Rozetleri Güncelle
    const expBadge = document.getElementById('lab-exp-badge');
    const expTitle = document.getElementById('lab-exp-title');
    const expRef = document.getElementById('lab-exp-ref');
    if (expBadge) expBadge.textContent = `${exp.grade}. Sınıf / ${exp.unit}. Ünite · ${exp.code}`;
    if (expTitle) expTitle.textContent = `${exp.id}: ${exp.title}`;
    if (expRef) expRef.textContent = exp.bookRef;

    // Pilot Deney Fizik Motorunu Başlat
    if (expId === "7.3") {
        initOpticsCanvas();
    }
}

export function closeExperimentWorkspace() {
    if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
    }
    labState.activeExperimentId = null;

    const catalogView = document.getElementById('lab-catalog-view');
    const workspaceView = document.getElementById('lab-workspace-view');
    if (catalogView) catalogView.classList.remove('is-hidden');
    if (workspaceView) workspaceView.classList.add('is-hidden');
    renderCatalog();
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

// --- 6. PİLOT DENEY FİZİK VE GRAFİK MOTORU (DENEY 7.3: IŞIĞIN KIRILMASI) ---
function initOpticsCanvas() {
    canvas = document.getElementById('lab-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    // Canvas çözünürlüğünü retina/HD ekranlara uyarla
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    calculateOpticsPhysics();
    startOpticsRenderLoop();
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
        // Tam Yansıma!
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

    // HUD Değerleri
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

    // Sağ Panel Metrikleri
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

// Gözlem Defteri Kayıt Fonksiyonu
function recordMeasurement() {
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
        pair: `${med1.name} ➔ ${med2.name}`,
        incident: `${incidentAngle}°`,
        refract: refractStr,
        speedChange: `${(med1.speed / 1000).toFixed(0)}k ➔ ${(med2.speed / 1000).toFixed(0)}k km/s`,
        behavior: behaviorStr
    };

    labState.optics.measurements.push(row);
    renderMeasurementTable();
    showLabToast(`Gözlem #${row.id} deftere kaydedildi!`);
}

function renderMeasurementTable() {
    const tbody = document.getElementById('lab-table-body');
    const emptyMsg = document.getElementById('lab-table-empty');
    if (!tbody || !emptyMsg) return;

    if (labState.optics.measurements.length === 0) {
        tbody.innerHTML = "";
        emptyMsg.classList.remove('is-hidden');
        return;
    }

    emptyMsg.classList.add('is-hidden');
    let html = "";
    labState.optics.measurements.forEach(m => {
        html += `
            <tr>
                <td><strong>${m.id}</strong></td>
                <td><span class="lab-table-tag">${m.pair}</span></td>
                <td><span class="lab-table-val inc">${m.incident}</span></td>
                <td><span class="lab-table-val ref">${m.refract}</span></td>
                <td><small>${m.speedChange}</small></td>
                <td><strong>${m.behavior}</strong></td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

function clearMeasurementTable() {
    labState.optics.measurements = [];
    renderMeasurementTable();
    showLabToast("Gözlem defteri temizlendi");
}

// --- 7. DOKUNMATİK VE FARE POINTER ETKİLEŞİMİ ---
function setupCanvasPointerEvents() {
    const cvs = document.getElementById('lab-canvas');
    if (!cvs) return;

    const handlePointerAction = (e) => {
        const rect = cvs.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Koordinatları 800x500 sanal Canvas ölçeğine oranla
        const scaleX = 800 / rect.width;
        const scaleY = 500 / rect.height;
        const canvasX = x * scaleX;
        const canvasY = y * scaleY;

        const originX = 400;
        const originY = 250;

        // Yalnızca üst yarıda (Gelen ışın bölgesi) açı hesabı yap
        if (canvasY < originY) {
            const dx = originX - canvasX;
            const dy = originY - canvasY;
            if (dy > 4) {
                let angleRad = Math.atan2(dx, dy);
                let angleDeg = angleRad * (180 / Math.PI);
                // 0 ile 85 derece aralığına sınırla
                if (angleDeg < 0) angleDeg = 0;
                if (angleDeg > 85) angleDeg = 85;
                setIncidentAngle(angleDeg);
            }
        }
    };

    cvs.addEventListener('pointerdown', (e) => {
        cvs.setPointerCapture(e.pointerId);
        labState.optics.isDraggingLaser = true;
        handlePointerAction(e);
    });

    cvs.addEventListener('pointermove', (e) => {
        if (labState.optics.isDraggingLaser) {
            handlePointerAction(e);
        }
    });

    const stopDragging = (e) => {
        if (labState.optics.isDraggingLaser) {
            labState.optics.isDraggingLaser = false;
            try { cvs.releasePointerCapture(e.pointerId); } catch (_) {}
        }
    };

    cvs.addEventListener('pointerup', stopDragging);
    cvs.addEventListener('pointercancel', stopDragging);
}

// --- 8. CANVASI 60 FPS RENDER ETME ÇİKLUSU ---
function startOpticsRenderLoop() {
    if (animFrameId) cancelAnimationFrame(animFrameId);

    const render = () => {
        if (labState.activeExperimentId === "7.3" && ctx && canvas) {
            drawOpticsSimulation();
            animFrameId = requestAnimationFrame(render);
        }
    };
    animFrameId = requestAnimationFrame(render);
}

function drawOpticsSimulation() {
    const { medium1, medium2, incidentAngle, refractedAngle, isTotalInternalReflection } = labState.optics;
    const med1 = MEDIA_PROPERTIES[medium1];
    const med2 = MEDIA_PROPERTIES[medium2];

    const W = canvas.width;
    const H = canvas.height;
    const scale = W / 800; // 800x500 referans ölçeği

    ctx.save();
    ctx.clearRect(0, 0, W, H);

    const originX = 400 * scale;
    const originY = 250 * scale;
    const radius = 190 * scale;

    // 1. ÜST ORTAM (1. Ortam)
    ctx.fillStyle = med1.bgColor;
    ctx.fillRect(0, 0, W, originY);

    // 2. ALT ORTAM (2. Ortam)
    ctx.fillStyle = med2.bgColor;
    ctx.fillRect(0, originY, W, H - originY);

    // 3. Ortam Etiketleri
    ctx.font = `bold ${Math.max(13, 15 * scale)}px 'Nunito', sans-serif`;
    ctx.fillStyle = med1.highlightColor;
    ctx.fillText(`1. Ortam: ${med1.name} (n = ${med1.n.toFixed(2)}) · ${med1.speed.toLocaleString('tr-TR')} km/s`, 20 * scale, 35 * scale);

    ctx.fillStyle = med2.highlightColor;
    ctx.fillText(`2. Ortam: ${med2.name} (n = ${med2.n.toFixed(2)}) · ${med2.speed.toLocaleString('tr-TR')} km/s`, 20 * scale, originY + (35 * scale));

    // 4. Açıölçer / Gönye Çizimi
    drawProtractor(ctx, originX, originY, radius, scale);

    // 5. Ayırıcı Yüzey Çizgisi
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

    // 6. Yüzey Normali (N)
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

    // 7. Lazer Pozisyonu ve Gelen Işın
    const rad1 = (incidentAngle * Math.PI) / 180;
    const laserX = originX - Math.sin(rad1) * radius;
    const laserY = originY - Math.cos(rad1) * radius;

    // Açı Yayı (Gelme Açısı θ₁)
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

    // Gelen Işın
    drawLaserBeam(ctx, laserX, laserY, originX, originY, "#ff1744", 3.5 * scale, 1.0);

    // Lazer Feneri Çizimi
    drawLaserDevice(ctx, laserX, laserY, originX, originY, scale);

    // 8. Yansıyan Işın (Kısmi veya Tam Yansıma)
    const reflectX = originX + Math.sin(rad1) * radius;
    const reflectY = originY - Math.cos(rad1) * radius;

    if (isTotalInternalReflection) {
        // %100 Tam Yansıma Işını
        drawLaserBeam(ctx, originX, originY, reflectX, reflectY, "#ff0055", 4 * scale, 1.0);

        // Tam Yansıma Parlama Rozeti
        ctx.font = `bold ${Math.max(14, 16 * scale)}px 'Nunito', sans-serif`;
        ctx.fillStyle = "#ff0055";
        ctx.textAlign = "center";
        ctx.fillText("⚡ TAM YANSIMA GERÇEKLEŞTİ", originX + (120 * scale), originY - (110 * scale));
    } else if (incidentAngle > 0) {
        // Kısmi zayıf yansıma (Fresnel yansıması)
        drawLaserBeam(ctx, originX, originY, reflectX, reflectY, "rgba(255, 60, 100, 0.35)", 2 * scale, 0.4);
    }

    // 9. Kırılan Işın (Eğer Tam Yansıma Yoksa)
    if (!isTotalInternalReflection && refractedAngle !== null) {
        const rad2 = (refractedAngle * Math.PI) / 180;
        const refractX = originX + Math.sin(rad2) * radius;
        const refractY = originY + Math.cos(rad2) * radius;

        // Açı Yayı (Kırılma Açısı θ₂)
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

        // Kırılan Işın Çizimi
        drawLaserBeam(ctx, originX, originY, refractX, refractY, "#00e5ff", 3.5 * scale, 0.95);
    }

    ctx.restore();
}

// Açıölçer Yardımcı Çizimi
function drawProtractor(ctx, cx, cy, r, scale) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1 * scale;
    ctx.stroke();

    // 10 Derecelik Çentikler ve Derece Sayıları
    for (let deg = 0; deg <= 90; deg += 10) {
        const rad = (deg * Math.PI) / 180;

        // Üst Sol Bölge (Gelen Bölgesi)
        const x1 = cx - Math.sin(rad) * r;
        const y1 = cy - Math.cos(rad) * r;
        const x2 = cx - Math.sin(rad) * (r - (deg % 30 === 0 ? 14 * scale : 8 * scale));
        const y2 = cy - Math.cos(rad) * (r - (deg % 30 === 0 ? 14 * scale : 8 * scale));

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();

        // Üst Sağ Bölge (Yansıma Bölgesi)
        const rx1 = cx + Math.sin(rad) * r;
        const ry1 = cy - Math.cos(rad) * r;
        const rx2 = cx + Math.sin(rad) * (r - (deg % 30 === 0 ? 14 * scale : 8 * scale));
        const ry2 = cy - Math.cos(rad) * (r - (deg % 30 === 0 ? 14 * scale : 8 * scale));
        ctx.beginPath();
        ctx.moveTo(rx1, ry1);
        ctx.lineTo(rx2, ry2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();

        // Alt Sağ Bölge (Kırılma Bölgesi)
        const bx1 = cx + Math.sin(rad) * r;
        const by1 = cy + Math.cos(rad) * r;
        const bx2 = cx + Math.sin(rad) * (r - (deg % 30 === 0 ? 14 * scale : 8 * scale));
        const by2 = cy + Math.cos(rad) * (r - (deg % 30 === 0 ? 14 * scale : 8 * scale));
        ctx.beginPath();
        ctx.moveTo(bx1, by1);
        ctx.lineTo(bx2, by2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.stroke();

        // Derece Numaraları
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

// Lazer Işını Çizimi (Neon Glow)
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

    // Çekirdek Beyaz Hat
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(1, width * 0.35);
    ctx.shadowBlur = 0;
    ctx.stroke();

    // Ok Başı (Işın Yönü)
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

// Lazer Cihazı Gövdesi
function drawLaserDevice(ctx, x, y, targetX, targetY, scale) {
    ctx.save();
    const angle = Math.atan2(targetY - y, targetX - x);

    ctx.translate(x, y);
    ctx.rotate(angle);

    // Lazer Feneri Metalik Gövdesi
    ctx.fillStyle = "#1e293b";
    ctx.strokeStyle = "#00d2ff";
    ctx.lineWidth = 2 * scale;

    ctx.beginPath();
    ctx.roundRect(-40 * scale, -12 * scale, 40 * scale, 24 * scale, 5 * scale);
    ctx.fill();
    ctx.stroke();

    // Lens Kısmı
    ctx.fillStyle = "#ff1744";
    ctx.beginPath();
    ctx.arc(0, 0, 5 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Tutma / Döndürme Halkası (Handle)
    ctx.beginPath();
    ctx.arc(-20 * scale, 0, 18 * scale, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0, 210, 255, 0.4)";
    ctx.lineWidth = 1.5 * scale;
    ctx.stroke();

    ctx.restore();
}

// Global Tarayıcı Erişimi için Nesne
if (typeof window !== "undefined") {
    window.FenUpLab = {
        initLabModule,
        openLabView,
        openExperimentWorkspace,
        closeExperimentWorkspace,
        resetCurrentExperiment,
        toggleLabFullscreen,
        setIncidentAngle,
        EXPERIMENTS_DATABASE,
        labState
    };

    // DOM hazır olduğunda başlat
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initLabModule);
    } else {
        initLabModule();
    }
}
