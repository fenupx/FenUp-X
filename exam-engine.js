/**
 * ============================================================================
 * FENUP X — YAZILIYA HAZIRLIK / 7. SINIF SENARYO 2 PİLOT MOTORU (exam-engine.js)
 * Bağımsız SPA Modül Motoru, Pardus ETAP Dokunmatik Zırhı ve Öğrenci Akışı:
 * Senaryo Seçimi → Tercih → Konu Çalışma / Prova → Öz Değerlendirme → Özet
 * ============================================================================
 */

'use strict';

const CONTENT_REVISION = '3.0.0';
const CONTENT_PATHS = { '1': 'data/exam/', '2.0.0': 'data/exam/content-v2/', '3.0.0': 'data/exam/content-v3/' };
let ASSET_BASE = 'data/exam/';
let loadedRevision = null;
const dataVersions = new Map();
const STORAGE_KEY = 'fenupx_exam_pilot_v1';

const names = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' };

let DATA = null;
let CARDS = [];
let QUESTIONS = [];
let profiles = {};
let storageOK = true;

let state = {
    history: {},
    attempt: null,
    profileRuns: {},
    currentStep: 'scope', // 'scope' | 'choice' | 'study' | 'practice' | 'eval' | 'summary'
    studyCardIdx: 0,
    studyMode: 'free', // 'free' | 'review'
    reviewCardIds: [],
    returnToSummary: false,
    reviewingEval: false,
    hasSelectedScope: false,
    studyPlanOpen: typeof window !== 'undefined' && window.innerWidth > 820 && window.innerHeight > 520
};

let currentProfile = 'dengeli';
let currentSolveMode = 'ekranda'; // 'ekranda' | 'kagitta'
let setupPracticeNewMode = false;
let activeFrame = null;
let activeAnimationCleanup = null;
let isInitialized = false;

// Güvenli DOM Seçici ve HTML Kaçış Fonksiyonları
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}[c]));

// LocalStorage Güvenli Yükleme ve Sürümlü Veri Adaptasyonu
if (typeof localStorage !== 'undefined') {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed.history === 'object') {
                state.history = parsed.history || {};
                state.profileRuns = parsed.profileRuns || {};
                state.currentStep = parsed.currentStep || 'scope';
                state.studyCardIdx = typeof parsed.studyCardIdx === 'number' ? parsed.studyCardIdx : 0;
                state.studyMode = parsed.studyMode || 'free';
                state.reviewCardIds = Array.isArray(parsed.reviewCardIds) ? parsed.reviewCardIds : [];
                state.returnToSummary = !!parsed.returnToSummary;
                state.reviewingEval = !!parsed.reviewingEval;
                state.hasSelectedScope = !!parsed.hasSelectedScope;
                state.studyPlanOpen = (typeof parsed.studyPlanOpen === 'boolean') ? parsed.studyPlanOpen : (typeof window !== 'undefined' ? window.innerWidth > 820 : true);

                if (parsed.attempt && Array.isArray(parsed.attempt.ids)) {
                    state.attempt = {
                        contentRevision: parsed.attempt.contentRevision || '1',
                        rubricRevision: parsed.attempt.rubricRevision || '1',
                        routeKey: parsed.attempt.routeKey || crypto.randomUUID(),
                        version: parsed.attempt.version || 2,
                        scoringVersion: parsed.attempt.scoringVersion || 2,
                        evaluationVersion: parsed.attempt.evaluationVersion || 1,
                        ids: parsed.attempt.ids,
                        questionPoints: parsed.attempt.questionPoints || {},
                        totalPoints: parsed.attempt.totalPoints || 100,
                        profile: parsed.attempt.profile || 'dengeli',
                        repeats: parsed.attempt.repeats || 0,
                        solveMode: parsed.attempt.solveMode || 'ekranda',
                        activeQuestionIndex: parsed.attempt.activeQuestionIndex || 0,
                        evalQuestionIndex: parsed.attempt.evalQuestionIndex || 0,
                        answers: parsed.attempt.answers || {},
                        evaluations: parsed.attempt.evaluations || {},
                        revealed: parsed.attempt.revealed || {},
                        criteriaMap: parsed.attempt.criteriaMap || null,
                        selectedCriteria: parsed.attempt.selectedCriteria || {},
                        evaluatedQuestions: parsed.attempt.evaluatedQuestions || {},
                        score: typeof parsed.attempt.score === 'number' ? parsed.attempt.score : undefined,
                        finished: !!parsed.attempt.finished,
                        status: parsed.attempt.status || (parsed.attempt.finished ? 'completed' : 'in_progress'),
                        visitedCards: Array.isArray(parsed.attempt.visitedCards) ? parsed.attempt.visitedCards : []
                    };

                    // Eski 'scores' yapısını yeni 3-seçenekli öz değerlendirmeye uyarla
                    if (parsed.attempt.scores && (!parsed.attempt.evaluations || Object.keys(parsed.attempt.evaluations).length === 0)) {
                        state.attempt.ids.forEach(qid => {
                            let totalQScore = 0;
                            let maxQScore = 0;
                            Object.keys(parsed.attempt.scores).forEach(k => {
                                if (k.startsWith(qid + '|')) {
                                    totalQScore += Number(parsed.attempt.scores[k] || 0);
                                    maxQScore += 10;
                                }
                            });
                            if (maxQScore > 0) {
                                if (totalQScore >= 8) state.attempt.evaluations[qid] = 'tam';
                                else if (totalQScore >= 4) state.attempt.evaluations[qid] = 'kismen';
                                else state.attempt.evaluations[qid] = 'yapamadim';
                            }
                        });
                    }
                }
            }
        }
    } catch (e) {
        storageOK = false;
    }
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        storageOK = false;
    }
    const noteEl = $('exam-storage-note');
    if (noteEl) {
        noteEl.textContent = storageOK
            ? 'Cevaplar ve soru geçmişi yalnızca bu cihazda/tarayıcıda saklanır. Silinebilir; başka hesaba aktarılmaz.'
            : 'Bu tarayıcıda kayıt yapılamıyor. Sayfa kapanınca çalışma korunmaz.';
    }
}

function stopAnimation() {
    if (activeFrame !== null) {
        cancelAnimationFrame(activeFrame);
        activeFrame = null;
    }
    if (typeof activeAnimationCleanup === 'function') {
        activeAnimationCleanup();
        activeAnimationCleanup = null;
    }
}

// Görsel SVG Oku Üretici
const defs = `<defs><marker id="teal" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#087f82"/></marker><marker id="amber" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#c7781e"/></marker></defs>`;
function arrow(x, y, x2, y2, color) {
    return `<path d="M${x} ${y}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="5" marker-end="url(#${color === '#087f82' ? 'teal' : 'amber'})"/>`;
}

function sourcesHtml(refs) {
    if (!refs || !DATA || !DATA.sources) return '';
    return refs.map(id => {
        const s = DATA.sources.find(src => src.id === id);
        return s ? `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(id)}</a>` : '';
    }).filter(Boolean).join(' ');
}

function cardTableHtml(table) {
    return `<div class="exam-tablewrap"><table class="exam-table"><caption>${esc(table.caption)}</caption><thead><tr>${table.headers.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row => `<tr>${row.map(cell => `<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

// Tek kaynak kataloğu; fotoğraf ve illüstrasyon ayrımı korunur.
function visualCreditHtml(visual) {
    if (!visual?.asset || !DATA?.visualCredits) return '';
    const credit = DATA.visualCredits[visual.credit_ref] || Object.values(DATA.visualCredits).find(c => visual.asset === 'assets/' + c.asset);
    if (!credit) return '';
    const nature = { photograph: 'Fotoğraf', observational_image: 'Gözlem görüntüsü', ai_generated_educational_illustration: 'Ders illüstrasyonu (ImageGen)' }[credit.nature] || 'Görsel';
    const source = /^https:\/\//.test(credit.source || '') ? `<a href="${esc(credit.source)}" target="_blank" rel="noopener noreferrer">Özgün kaynak</a>` : esc(credit.source);
    return `<details class="exam-visual-credit"><summary>Görsel kaynakları</summary><p>${esc(nature)} · ${esc(credit.credit)}</p><p>${source}</p>${credit.description ? `<p>${esc(credit.description)}</p>` : ''}${credit.use ? `<p>${esc(credit.use)}</p>` : ''}</details>`;
}

// --- 5'İN KATLARIYLA 100 PUAN DAĞITIMI VE ÖLÇÜT TEMELLİ DEĞERLENDİRME YAPILANDIRMASI ---
export const SCORING_POLICY = {
    version: 3,
    evaluationVersion: 2,
    targetTotal: 100,
    allowedPoints: [10, 15, 20],
    partialScoreMap: {
        10: 5,
        15: 10,
        20: 10
    }
};

/**
 * Bir sorunun rubrik ölçütlerine soru hedef puanını (10, 15, 20 vb.) deterministik olarak dağıtır.
 * Kural 1: Mümkün olduğunda (targetPoint >= n * 5 ve targetPoint % 5 === 0) 5'in katları pozitif tamsayılar kullanılır.
 * Kural 2: Diğer durumlarda Hamilton (Largest Remainder) yöntemiyle pozitif tam sayılar (min 1) üretilir.
 * Kural 3: Bütün ölçüt puanları pozitif tamsayıdır ve toplamları TAM targetPoint'e eşittir.
 */
export function distributeCriteriaPoints(rubrics, targetPoint) {
    if (!Array.isArray(rubrics) || rubrics.length === 0) return [];
    const n = rubrics.length;
    const pt = Number(targetPoint);

    // 1. Mümkün olduğunda 5'in katlarıyla dağıtım:
    if (pt % 5 === 0 && pt >= n * 5) {
        const units = pt / 5;
        const weights = rubrics.map((r, i) => ({ id: r.id, weight: r.weight || r.points || 1, origIdx: i }));
        const totalW = weights.reduce((s, w) => s + w.weight, 0);
        let unitAlloc = weights.map(() => 1);
        let remainingUnits = units - n;
        const remainders = weights.map((w, i) => {
            const exact = (w.weight / totalW) * units;
            return { idx: i, frac: exact - Math.floor(exact), id: w.id };
        });
        remainders.sort((a, b) => b.frac - a.frac || a.idx - b.idx);
        for (let i = 0; i < remainingUnits; i++) {
            unitAlloc[remainders[i % n].idx]++;
        }
        return rubrics.map((r, i) => ({
            id: r.id,
            text: r.text,
            return_card_ids: Array.isArray(r.return_card_ids) ? [...r.return_card_ids] : [],
            points: unitAlloc[i] * 5
        }));
    }

    // 2. 5'in katlarıyla dağıtılamıyorsa: Deterministik Hamilton (Largest Remainder) Pozitif Tamsayı Dağıtımı
    const weights = rubrics.map((r, i) => ({ id: r.id, weight: r.weight || r.points || 1, origIdx: i }));
    const totalW = weights.reduce((s, w) => s + w.weight, 0);
    const shares = weights.map((w, i) => {
        const exact = (w.weight / totalW) * pt;
        const base = Math.floor(exact);
        return { idx: i, base: base >= 1 ? base : 1, frac: exact - base, id: w.id };
    });
    const sumBase = shares.reduce((s, x) => s + x.base, 0);
    let diff = pt - sumBase;
    let alloc = shares.map(x => x.base);
    shares.sort((a, b) => b.frac - a.frac || a.idx - b.idx);
    if (diff > 0) {
        for (let i = 0; i < diff; i++) {
            alloc[shares[i % n].idx]++;
        }
    } else if (diff < 0) {
        for (let i = shares.length - 1; i >= 0 && diff < 0; i--) {
            const idx = shares[i].idx;
            if (alloc[idx] > 1) {
                alloc[idx]--;
                diff++;
            }
        }
    }
    return rubrics.map((r, i) => ({
        id: r.id,
        text: r.text,
        return_card_ids: Array.isArray(r.return_card_ids) ? [...r.return_card_ids] : [],
        points: alloc[i]
    }));
}

export function ensureAttemptCriteriaMap(attempt) {
    if (!attempt || !Array.isArray(attempt.ids)) return;
    attempt.criteriaMap = attempt.criteriaMap || {};
    attempt.selectedCriteria = attempt.selectedCriteria || {};
    attempt.evaluatedQuestions = attempt.evaluatedQuestions || {};

    const questions = attempt.ids.map(id => (QUESTIONS || []).find(q => q.id === id)).filter(Boolean);
    questions.forEach(q => {
        if (!attempt.criteriaMap[q.id] || !Array.isArray(attempt.criteriaMap[q.id]) || attempt.criteriaMap[q.id].length === 0) {
            const qPt = attempt.questionPoints?.[q.id] || 15;
            attempt.criteriaMap[q.id] = distributeCriteriaPoints(q.rubric || [], qPt).map(c => ({...c, contentRevision: attempt.contentRevision || '1', rubricRevision: attempt.rubricRevision || '1'}));
        }
    });
}

export function getQuestionScore(qId, attempt) {
    if (!attempt || !attempt.criteriaMap || !attempt.criteriaMap[qId]) return 0;
    const criteria = attempt.criteriaMap[qId] || [];
    const selected = attempt.selectedCriteria?.[qId] || [];
    return criteria.filter(c => selected.includes(c.id)).reduce((sum, c) => sum + (c.points || 0), 0);
}

export function getPartialScore(questionPoint) {
    const pt = Number(questionPoint);
    if (SCORING_POLICY.partialScoreMap.hasOwnProperty(pt)) {
        return SCORING_POLICY.partialScoreMap[pt];
    }
    return Math.round(pt / 2);
}

export function calculateQuestionPoints(questions, targetTotal = 100) {
    if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error('Soru puanı hesabı için en az bir soru bulunmalıdır.');
    }

    const n = questions.length;
    const allowed = SCORING_POLICY.allowedPoints;
    const minAllowed = Math.min(...allowed);
    const maxAllowed = Math.max(...allowed);

    if (minAllowed * n > targetTotal || maxAllowed * n < targetTotal) {
        throw new Error(`Soru sayısı (${n}) ve izin verilen puanlarla [${allowed.join(', ')}] hedef ${targetTotal} puana ulaşılamaz.`);
    }

    const weights = questions.map((q, idx) => {
        let w = Number(q.score_weight);
        if (!Number.isFinite(w) || w <= 0) {
            w = q.difficulty === 'hard' ? 18 : (q.difficulty === 'medium' ? 15 : 12);
        }
        return { origIdx: idx, id: q.id, weight: w };
    });

    const totalWeight = weights.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight <= 0) {
        throw new Error('Toplam soru ağırlığı pozitif bir sayı olmalıdır.');
    }

    // Ağırlıklara göre küçükten büyüğe sırala (kararlı sıra için origIdx tie-breaker)
    const sorted = [...weights].sort((a, b) => a.weight - b.weight || a.origIdx - b.origIdx);
    const sortedIdeal = sorted.map(item => (item.weight * targetTotal) / totalWeight);

    let bestScore = Infinity;
    let bestAssign = null;

    function search(idx, currentSum, prevVal, currentAssign) {
        if (idx === n) {
            if (currentSum === targetTotal) {
                let penalty = 0;
                for (let i = 0; i < n; i++) {
                    const diff = currentAssign[i] - sortedIdeal[i];
                    penalty += diff * diff;
                }
                if (penalty < bestScore) {
                    bestScore = penalty;
                    bestAssign = [...currentAssign];
                }
            }
            return;
        }

        const remaining = n - idx;
        if (currentSum + minAllowed * remaining > targetTotal) return;
        if (currentSum + maxAllowed * remaining < targetTotal) return;

        for (let i = 0; i < allowed.length; i++) {
            const val = allowed[i];
            if (val >= prevVal) { // Monotonluk: ağırlığı büyük olan daha az puan alamaz
                const remMinusOne = remaining - 1;
                const minRemSum = currentSum + val + minAllowed * remMinusOne;
                const maxRemSum = currentSum + val + maxAllowed * remMinusOne;
                if (minRemSum <= targetTotal && targetTotal <= maxRemSum) {
                    currentAssign.push(val);
                    search(idx + 1, currentSum + val, val, currentAssign);
                    currentAssign.pop();
                }
            }
        }
    }

    search(0, 0, minAllowed, []);

    if (!bestAssign) {
        throw new Error(`Soru sayısı (${n}) için [${allowed.join(', ')}] kümesinden uygun puan dağılımı bulunamadı.`);
    }

    // Orijinal soru sırasına geri haritala
    const pointsMap = {};
    for (let i = 0; i < n; i++) {
        pointsMap[sorted[i].id] = bestAssign[i];
    }

    return pointsMap;
}

function formatScore(score) {
    if (typeof score !== 'number' || isNaN(score)) return '0';
    return Number.isInteger(score) ? String(score) : score.toFixed(1);
}

// --- VERİ YÜKLEME ---
async function loadData(revision = state.attempt?.contentRevision || CONTENT_REVISION, showError = true) {
    if (DATA && loadedRevision === revision) return true;
    try {
        const base = CONTENT_PATHS[revision];
        if (!base) throw new Error(`Bilinmeyen içerik sürümü: ${revision}`);
        if (!dataVersions.has(revision)) {
            dataVersions.set(revision, fetch(base + 'pilot_7_senaryo2.json').then(async res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (revision === '3.0.0') {
                    const credits = await fetch(base + 'GORSEL_KAYNAKLARI.json');
                    if (!credits.ok) throw new Error(`Görsel kaynakları HTTP ${credits.status}`);
                    data.visualCredits = await credits.json();
                }
                return data;
            }));
        }
        const incoming = await dataVersions.get(revision);
        DATA = incoming;
        ASSET_BASE = base;
        loadedRevision = revision;
        const contentScene = $('scene-yazili');
        if (contentScene) {
            contentScene.classList.toggle('content-v2', revision !== '1');
            contentScene.classList.toggle('content-v3', revision === '3.0.0');
        }
        CARDS = DATA.cards || [];
        QUESTIONS = DATA.questions || [];
        profiles = DATA.selection_policy?.scenario_profiles || {};

            // Eski kayıtları sürümlü uyarlama: 5'in katı (10, 15, 20) standardına bir kez taşı
            if (state.attempt && (state.attempt.contentRevision || '1') === revision && Array.isArray(state.attempt.ids)) {
                const needsMigration = !state.attempt.finished && (!state.attempt.scoringVersion ||
                    state.attempt.scoringVersion < SCORING_POLICY.version ||
                    !state.attempt.questionPoints ||
                    Object.keys(state.attempt.questionPoints).length === 0 ||
                    Object.values(state.attempt.questionPoints).some(p => !SCORING_POLICY.allowedPoints.includes(p)));

                if (needsMigration) {
                    const qs = state.attempt.ids.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
                    if (qs.length === state.attempt.ids.length) {
                        try {
                            state.attempt.questionPoints = calculateQuestionPoints(qs, SCORING_POLICY.targetTotal);
                            state.attempt.totalPoints = SCORING_POLICY.targetTotal;
                            state.attempt.scoringVersion = SCORING_POLICY.version;
                            saveState();
                        } catch (e) {
                            console.warn('Soru puanı migrasyon uyarısı:', e);
                        }
                    }
                }

                // Ölçüt temelli değerlendirme migrasyonu (Henüz tamamlanmamış aktif çalışmalar için)
                if (!state.attempt.finished && (!state.attempt.evaluationVersion || state.attempt.evaluationVersion < SCORING_POLICY.evaluationVersion)) {
                    ensureAttemptCriteriaMap(state.attempt);
                    state.attempt.evaluationVersion = SCORING_POLICY.evaluationVersion;
                    state.attempt.selectedCriteria = state.attempt.selectedCriteria || {};
                    state.attempt.evaluatedQuestions = state.attempt.evaluatedQuestions || {};
                    saveState();
                }
            }
            return true;
        } catch (err) {
            console.error('Yazılı verisi yüklenemedi:', err);
            dataVersions.delete(revision);
            const container = $('scene-yazili');
            if (container && showError) {
                container.innerHTML = `
                    <div class="exam-header-bar">
                        <button class="back-link btn-back-home" id="btn-exam-err-home"><i class="fas fa-arrow-left"></i> Ana Sayfaya Dön</button>
                        <span class="exam-badge">Yükleme Hatası</span>
                    </div>
                    <div class="exam-panel">
                        <h3 style="color:#f87171;"><i class="fas fa-exclamation-triangle"></i> İçerik Yüklenemedi</h3>
                        <p style="color:#cbd5e1;">Yazılıya Hazırlık verileri alınırken bir ağ veya dosya okuma sorunu oluştu.</p>
                        <button class="exam-btn-primary" onclick="window.FenUpExam.openExamView()"><i class="fas fa-redo"></i> Tekrar Dene</button>
                    </div>
                `;
                const btnHome = $('btn-exam-err-home');
                if (btnHome && window.scenes?.home) {
                    btnHome.onclick = () => window.switchScene(container, window.scenes.home);
                }
            }
            return false;
        }
}

// --- AKIŞ MOTORU (State Machine): Senaryo Seçimi → Tercih → Konu/Prova → Değerlendirme → Özet ---
export function goToStep(step, options = {}) {
    const previousStep = state.currentStep;
    stopAnimation();
    closePrintPreview();
    const picker = $('practice-q-picker-dropdown');
    if (picker) picker.classList.add('is-hidden');
    const pickerButton = $('btn-practice-q-picker');
    if (pickerButton) { pickerButton.setAttribute('aria-expanded', 'false'); pickerButton.classList.remove('active'); }
    if (step !== 'study') {
        exitStudyFullscreen();
    }
    state.currentStep = step;
    saveState();

    const views = {
        scope: $('exam-view-scope'),
        choice: $('exam-view-choice'),
        study: $('exam-view-study'),
        practice: $('exam-view-practice'),
        eval: $('exam-view-eval'),
        summary: $('exam-view-summary')
    };

    Object.keys(views).forEach(key => {
        const v = views[key];
        if (v) {
            const isActive = (key === step);
            v.classList.toggle('is-hidden', !isActive);
            v.setAttribute('aria-hidden', String(!isActive));
            if (isActive) {
                v.style.display = (key === 'study') ? 'flex' : 'block';
                v.removeAttribute('inert');
            } else {
                v.style.display = 'none';
                v.setAttribute('inert', '');
            }
        }
    });

    const scopeBadge = $('exam-scope-badge');
    if (scopeBadge) {
        scopeBadge.style.display = (step === 'scope') ? 'none' : 'inline-block';
    }

    if (step === 'scope') renderScope();
    else if (step === 'choice') renderChoice();
    else if (step === 'study') renderStudy(state.studyCardIdx || 0);
    else if (step === 'practice') renderPractice();
    else if (step === 'eval') renderEval();
    else if (step === 'summary') renderSummary();

    const sceneYazili = $('scene-yazili');
    if (sceneYazili) {
        sceneYazili.classList.toggle('study-active', step === 'study');
        sceneYazili.classList.toggle('practice-active', step === 'practice');
        sceneYazili.classList.toggle('eval-active', step === 'eval');
        sceneYazili.classList.toggle('summary-active', step === 'summary');
        sceneYazili.classList.toggle('choice-active', step === 'choice');
        sceneYazili.classList.toggle('scope-active', step === 'scope');
        sceneYazili.scrollTop = 0;
    }
    if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
    }

    updateBackControls();
    if (!options.restore) window.FenUpNavigation?.record(options.replace || (step === 'eval' && previousStep === 'practice'));

    // Her ekran değişiminde odak noktasını ilgili ekranın başlığına taşı
    const activeViewEl = views[step];
    if (activeViewEl) {
        const heading = activeViewEl.querySelector('h2, h3, .exam-section-heading, .exam-card-title, .exam-card-eyebrow');
        if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus({ preventScroll: true });
        }
    }
}

function saveProgress() {
    const a = state.attempt;
    const answer = $('practice-text-ans');
    if (a && state.currentStep === 'practice' && !setupPracticeNewMode && !a.finished && a.status === 'in_progress' && answer) {
        const id = a.ids[a.activeQuestionIndex || 0];
        if (id) a.answers[id] = answer.value;
    }
    saveState();
}
function getRoute() {
    return {
        step: state.currentStep === 'practice' && (!state.attempt || setupPracticeNewMode) ? 'setup' : state.currentStep,
        mode: state.currentStep === 'study' && state.returnToSummary ? 'review' : 'free',
        ...(state.attempt ? { attempt: state.attempt.routeKey } : {})
    };
}
function backStep(step) {
    saveProgress();
    if (!window.FenUpNavigation?.backTo({ scene: 'scene-yazili', step })) goToStep(step);
}
function updateBackControls() {
    const step = state.currentStep;
    const review = step === 'study' && state.returnToSummary;
    const button = $('btn-exam-step-back');
    if (button) {
        button.textContent = review ? '← Çalışma Özeti' : (['study', 'practice', 'eval'].includes(step) ? '← Çalışma Seçimi' : '← Geri');
        button.onclick = () => {
            if (step === 'scope') window.returnToHome?.();
            else backStep(review ? 'summary' : step === 'choice' ? 'scope' : 'choice');
        };
    }
}
function restoreExamRoute(route) {
    let step = route?.step || 'scope';
    if (!['scope', 'choice', 'study', 'setup', 'practice', 'eval', 'summary'].includes(step)) step = 'scope';
    const a = state.attempt;
    if (route?.attempt && route.attempt !== a?.routeKey) step = 'choice';
    const usableAttempt = a && a.ids.length === 7 && a.ids.every(id => QUESTIONS.some(q => q.id === id));
    if (['practice', 'eval', 'summary'].includes(step) && !usableAttempt) step = 'choice';
    if (!state.hasSelectedScope && step !== 'scope') step = 'scope';
    if (a && step === 'practice' && (a.finished || a.status !== 'in_progress')) step = a.finished ? 'summary' : 'eval';
    if (step === 'eval') state.reviewingEval = !!a?.finished;
    if (step === 'summary' && !a?.finished) step = 'choice';
    setupPracticeNewMode = step === 'setup';
    if (step === 'study') {
        state.returnToSummary = route?.mode === 'review' && !!a?.finished;
        state.studyMode = state.returnToSummary ? 'review' : 'free';
    }
    goToStep(step === 'setup' ? 'practice' : step, { restore: true });
}

function bindScopeContinue() {
    const btnContinue = $('btn-scope-continue');
    if (!btnContinue) return;
    btnContinue.onclick = async (e) => {
        if (e) e.preventDefault();
        try {
            if (!DATA) {
                const origHtml = btnContinue.innerHTML;
                btnContinue.disabled = true;
                btnContinue.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Hazırlanıyor...';
                const ok = await loadData();
                btnContinue.disabled = false;
                btnContinue.innerHTML = origHtml;
                if (!ok) {
                    alert('Yazılı verileri yüklenirken bir sorun oluştu. Lütfen bağlantınızı kontrol edip tekrar deneyin.');
                    return;
                }
            }
            state.hasSelectedScope = true;
            saveState();
            goToStep('choice');
        } catch (err) {
            console.error('Hazırlanmaya başlarken hata:', err);
            state.hasSelectedScope = true;
            saveState();
            goToStep('choice');
        }
    };
}

// 1. AŞAMA: SENARYO VE KAPSAM SEÇİMİ
function renderScope() {
    bindScopeContinue();
}

// 2. AŞAMA: HAZIRLIK TERCİHİ
function renderChoice() {
    const btnBack = $('btn-choice-change-scope');
    if (btnBack) {
        btnBack.onclick = () => {
            state.hasSelectedScope = false;
            saveState();
            backStep('scope');
        };
    }

    const btnStudy = $('btn-choice-go-study');
    if (btnStudy) {
        btnStudy.onclick = () => {
            state.studyMode = 'free';
            state.returnToSummary = false;
            goToStep('study');
        };
    }

    const btnPractice = $('btn-choice-go-practice');
    if (btnPractice) {
        btnPractice.onclick = () => {
            setupPracticeNewMode = true;
            goToStep('practice');
        };
    }

    // Dinamik konu ve soru sayaçları
    const studyCountEl = $('choice-study-count');
    if (studyCountEl && DATA) {
        const topicCount = DATA.outcomes ? DATA.outcomes.length : 4;
        const cardCount = CARDS.length;
        studyCountEl.innerHTML = `<i class="fas fa-clone"></i> ${topicCount} konu · ${cardCount} bilgi kartı`;
    }

    const practiceCountEl = $('choice-practice-count');
    if (practiceCountEl && DATA) {
        practiceCountEl.innerHTML = `<i class="fas fa-pen-alt"></i> 7 soruluk prova`;
    }

    // Varsa Kayıtlı Çalışma Kartını İkincil Olarak Sun (Kullanıcıyı zorla eski ekrana fırlatma)
    const savedCard = $('choice-saved-attempt-card');
    if (savedCard) {
        if (state.attempt && Array.isArray(state.attempt.ids) && state.attempt.ids.length === 7) {
            savedCard.style.display = 'flex';
            const a = state.attempt;
            const titleEl = $('saved-attempt-title');
            const descEl = $('saved-attempt-desc');
            const badgeEl = $('saved-attempt-badge');
            const modeEl = $('saved-attempt-mode');
            const btnResume = $('btn-resume-saved-attempt');
            const resumeLabel = $('btn-resume-saved-label');

            const answeredCount = a.ids.filter(qid => (a.answers[qid] || '').trim().length > 0).length;
            const evalCount = a.ids.filter(qid => !!a.evaluations[qid]).length;
            const profileText = names[a.profile] || (a.profile === 'zorlayici' ? 'Zorlayıcı' : (a.profile === 'temel' ? 'Temel' : 'Dengeli'));
            const modeText = a.solveMode === 'kagitta' ? 'Kâğıtta' : 'Ekranda';

            if (modeEl) {
                modeEl.innerHTML = `<i class="fas fa-sliders-h"></i> ${esc(profileText)} · ${esc(modeText)}`;
            }

            if (a.status === 'completed' || a.finished) {
                if (titleEl) titleEl.textContent = 'Tamamlanmış Prova';
                if (descEl) descEl.textContent = '7 soruluk provan ve öz değerlendirmen hazır. Sonuçlarını ve konu eksiklerini inceleyebilirsin.';
                if (badgeEl) badgeEl.innerHTML = `<i class="fas fa-check-circle" style="color:#10b981;"></i> Değerlendirme Tamamlandı`;
                if (resumeLabel) resumeLabel.textContent = 'Devam Et';
                if (btnResume) btnResume.onclick = () => goToStep('summary');
            } else if (a.status === 'evaluating' || evalCount > 0 || a.evalQuestionIndex > 0) {
                if (titleEl) titleEl.textContent = 'Devam Eden Öz Değerlendirme';
                if (descEl) descEl.textContent = 'Soruları çözdün; öz değerlendirme aşamasındasın.';
                if (badgeEl) badgeEl.innerHTML = `<i class="fas fa-balance-scale"></i> ${evalCount} / 7 Soru Değerlendirildi`;
                if (resumeLabel) resumeLabel.textContent = 'Devam Et';
                if (btnResume) btnResume.onclick = () => goToStep('eval');
            } else {
                if (titleEl) titleEl.textContent = 'Devam Eden Yazılı Prova';
                if (descEl) descEl.textContent = 'Yazılı provan yarıda kaldı. Cevapların ve soru sıran güvenle saklanıyor.';
                if (badgeEl) badgeEl.innerHTML = `<i class="fas fa-tasks"></i> ${answeredCount} / 7 Soru Yanıtlandı`;
                if (resumeLabel) resumeLabel.textContent = 'Devam Et';
                if (btnResume) btnResume.onclick = () => {
                    setupPracticeNewMode = false;
                    goToStep('practice');
                };
            }
        } else {
            savedCard.style.display = 'none';
        }
    }
}

// 3a. AŞAMA: KONU ÇALIŞMA EKRANI (Veri Kartları, Çalışma Planı & İnteraktif Deneyler)
function renderStudy(cardIndex) {
    stopAnimation();
    if (!CARDS || CARDS.length === 0) return;
    if (cardIndex < 0) cardIndex = 0;
    if (cardIndex >= CARDS.length) cardIndex = CARDS.length - 1;

    state.studyCardIdx = cardIndex;
    const c = CARDS[cardIndex];

    // Ziyaret edilen kartı kaydet
    if (state.attempt) {
        state.attempt.visitedCards = state.attempt.visitedCards || [];
        if (!state.attempt.visitedCards.includes(c.id)) {
            state.attempt.visitedCards.push(c.id);
        }
    }
    saveState();

    const isReviewMode = (state.studyMode === 'review' && Array.isArray(state.reviewCardIds) && state.reviewCardIds.length > 0);

    // Üst Araç Çubuğu
    const btnBackChoice = $('btn-study-back-choice');
    if (btnBackChoice) {
        btnBackChoice.onclick = () => {
            state.studyMode = 'free';
            state.returnToSummary = false;
            saveState();
            backStep('choice');
        };
    }

    const btnTogglePlan = $('btn-study-toggle-plan');
    if (btnTogglePlan) {
        btnTogglePlan.onclick = () => toggleStudyPlan();
    }

    const btnJumpPractice = $('btn-study-jump-practice');
    if (btnJumpPractice) btnJumpPractice.onclick = () => goToStep('practice');

    const btnFullscreen = $('btn-study-fullscreen');
    if (btnFullscreen) {
        btnFullscreen.onclick = () => toggleStudyFullscreen();
        const studyView = $('exam-view-study');
        const isFs = studyView?.classList.contains('fullscreen-study-active') || (typeof document !== 'undefined' && (!!document.fullscreenElement || !!document.webkitFullscreenElement));
        btnFullscreen.classList.toggle('active', !!isFs);
        btnFullscreen.setAttribute('aria-pressed', String(!!isFs));
        btnFullscreen.innerHTML = isFs
            ? '<i class="fas fa-compress"></i> <span>Tam Ekrandan Çık</span>'
            : '<i class="fas fa-expand"></i> <span>Tam Ekran Çalış</span>';
    }

    const returnSummaryBox = $('study-return-to-summary-box');
    const btnReturnSummary = $('btn-study-return-summary');
    if (returnSummaryBox && btnReturnSummary) {
        if (state.returnToSummary || isReviewMode) {
            returnSummaryBox.style.display = 'block';
            btnReturnSummary.onclick = () => {
                state.studyMode = 'free';
                state.returnToSummary = false;
                saveState();
                backStep('summary');
            };
        } else {
            returnSummaryBox.style.display = 'none';
        }
    }

    // Sol Panel / Konu Çalışma Planı (Desktop Plan & Mobil Kompakt Seçici)
    const cardnav = $('exam-cardnav');
    if (cardnav && DATA.outcomes) {
        if (isReviewMode) {
            // Eksikleri Çalışma Modu: Sadece önerilen kartlar sırayla gezilir
            cardnav.innerHTML = `
                <div class="study-plan-header review-mode">
                    <h4><i class="fas fa-graduation-cap"></i> Eksikleri Çalış</h4>
                    <span class="study-plan-badge">${state.reviewCardIds.length} Önerilen Kart</span>
                </div>
                <div class="study-plan-review-list">
                    ${state.reviewCardIds.map((cid, rIdx) => {
                        const rCard = CARDS.find(x => x.id === cid);
                        if (!rCard) return '';
                        const cardIdxInAll = CARDS.findIndex(x => x.id === cid);
                        const isCurrent = (cardIdxInAll === cardIndex);
                        const isVisited = state.attempt?.visitedCards?.includes(cid);
                        return `
                            <button type="button" class="exam-cardnav-btn ${isCurrent ? 'active' : ''} ${isVisited ? 'visited' : ''}" data-study-card="${cardIdxInAll}" aria-pressed="${isCurrent}">
                                <b>${rIdx + 1}</b>
                                <span>${esc(rCard.title)}</span>
                                ${isVisited ? '<i class="fas fa-check cardnav-check" title="İncelendi"></i>' : ''}
                            </button>
                        `;
                    }).join('')}
                </div>
            `;
        } else {
            // Genel Konu Çalışma Modu: Senaryonun 4 Öğrenme Çıktısı ("Çalışma Planın")
            cardnav.innerHTML = `
                <div class="study-plan-header">
                    <h4><i class="fas fa-tasks"></i> Çalışma Planın</h4>
                    <span class="study-plan-badge">4 Konu</span>
                </div>

                <div class="study-mobile-outcome-picker">
                    <label class="exam-cardnav-label" for="exam-outcome-select"><i class="fas fa-book-reader"></i> Konu Seç:</label>
                    <select id="exam-outcome-select" class="exam-select">
                        ${DATA.outcomes.map(o => `<option value="${esc(o.id)}" ${o.id === c.outcome_id ? 'selected' : ''}>${esc(o.id)}: ${esc(o.short_title || o.title)}</option>`).join('')}
                    </select>
                </div>

                <div class="study-plan-outcomes-list">
                    ${DATA.outcomes.map(o => {
                        const isOutcomeActive = (o.id === c.outcome_id);
                        const outcomeCards = CARDS.filter(x => x.outcome_id === o.id);
                        return `
                            <div class="study-plan-outcome-item ${isOutcomeActive ? 'active' : ''}">
                                <button type="button" class="study-plan-outcome-head ${isOutcomeActive ? 'active' : ''}" data-outcome-id="${esc(o.id)}" aria-expanded="${isOutcomeActive}">
                                    <div class="study-outcome-meta">
                                        <span class="study-outcome-tag">${esc(o.id)}</span>
                                        <strong class="study-outcome-title">${esc(o.short_title || o.title)}</strong>
                                    </div>
                                    <i class="fas fa-chevron-${isOutcomeActive ? 'down' : 'right'} outcome-arrow"></i>
                                </button>
                                ${isOutcomeActive ? `
                                    <div class="study-plan-cards-sublist">
                                        ${outcomeCards.map((x, jInOutcome) => {
                                            const cardIdxInAll = CARDS.findIndex(card => card.id === x.id);
                                            const isCurrent = (cardIdxInAll === cardIndex);
                                            const isVisited = state.attempt?.visitedCards?.includes(x.id);
                                            return `
                                                <button type="button" class="exam-cardnav-btn ${isCurrent ? 'active' : ''} ${isVisited ? 'visited' : ''}" data-study-card="${cardIdxInAll}" aria-pressed="${isCurrent}">
                                                    <b>${jInOutcome + 1}</b>
                                                    <span>${esc(x.title)}</span>
                                                    ${isVisited ? '<i class="fas fa-check cardnav-check" title="İncelendi"></i>' : ''}
                                                </button>
                                            `;
                                        }).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        `;
                    }).join('')}
                </div>
            `;

            const outcomeSelect = $('exam-outcome-select');
            if (outcomeSelect) {
                outcomeSelect.onchange = e => {
                    const targetIdx = CARDS.findIndex(card => card.outcome_id === e.target.value);
                    if (targetIdx !== -1) renderStudy(targetIdx);
                };
            }

            cardnav.querySelectorAll('[data-outcome-id]').forEach(btn => {
                btn.onclick = () => {
                    const oid = btn.dataset.outcomeId;
                    const targetIdx = CARDS.findIndex(card => card.outcome_id === oid);
                    if (targetIdx !== -1) renderStudy(targetIdx);
                };
            });
        }

        cardnav.querySelectorAll('[data-study-card]').forEach(btn => {
            btn.onclick = () => renderStudy(Number(btn.dataset.studyCard));
        });
    }

    // Sağ Panel (Aktif Konu Kartı - Profesyonel Eğitim Portalı Görünümü)
    const cardPanel = $('exam-card-article');
    if (cardPanel) {
        const visualAssetPath = c.visual?.asset ? (ASSET_BASE + c.visual.asset) : '';
        const outcome = DATA.outcomes ? DATA.outcomes.find(o => o.id === c.outcome_id) : null;
        const outcomeCards = CARDS.filter(x => x.outcome_id === c.outcome_id);
        const idxInOutcome = outcomeCards.findIndex(x => x.id === c.id);
        const cardNumInOutcome = idxInOutcome !== -1 ? (idxInOutcome + 1) : 1;
        const isLastCard = (cardIndex === CARDS.length - 1);

        cardPanel.innerHTML = `
            <div class="study-card-content-area">
                <div class="study-card-top-meta">
                    <div class="study-meta-left">
                        <span class="outcome-pill-code">${esc(c.outcome_id)}</span>
                        <span class="study-counter-topic"><i class="fas fa-clone"></i> Kart ${cardNumInOutcome} / ${outcomeCards.length}</span>
                    </div>
                    ${outcome ? `
                        <details class="study-outcome-expandable">
                            <summary><i class="fas fa-info-circle"></i> MEB Kazanımı: <span>${esc(outcome.short_title || outcome.id)}</span> <span class="study-outcome-expand-hint">(Detay)</span></summary>
                            <p class="study-outcome-full-desc">${esc(outcome.title)}${c.book_section ? `<br>Kitap başlığı: ${esc(c.book_section)}` : ''}</p>
                        </details>
                    ` : ''}
                    ${visualCreditHtml(c.visual)}
                    ${loadedRevision === '2.0.0' ? `<details class="exam-card-notes"><summary>Hatırlatmalar</summary><div class="exam-takeaway"><strong>📌 Aklında Kalsın:</strong> ${esc(c.takeaway)}</div>
                        ${c.misconception ? `<p class="exam-warning"><strong>⚠️ Karıştırma:</strong> ${esc(c.misconception)}</p>` : ''}</details>` : ''}
                </div>

                <h2 class="exam-card-title">${esc(c.title)}</h2>

                <div class="exam-contentgrid ${!c.visual && !c.table ? 'exam-text-only' : ''}">
                    <div class="study-text-column">
                        <p class="exam-lead">${esc(c.lead)}</p>
                        ${(c.body || []).map(p => `<p class="exam-body-p">${esc(p)}</p>`).join('')}
                        ${loadedRevision === '1' ? `<div class="exam-takeaway"><strong>📌 Aklında Kalsın:</strong> ${esc(c.takeaway)}</div>
                        ${c.misconception ? `<p class="exam-warning"><strong>⚠️ Karıştırma:</strong> ${esc(c.misconception)}</p>` : ''}` : ''}
                    </div>
                    <div class="exam-visualbox ${!c.visual && !c.table ? 'is-hidden' : ''}" id="exam-visual">
                        ${visualAssetPath ? `<img src="${esc(visualAssetPath)}" alt="${esc(c.visual?.alt || '')}">` : ''}
                        ${c.table ? cardTableHtml(c.table) : ''}
                        ${c.visual?.caption || loadedRevision !== '3.0.0' ? `<p class="exam-caption">${esc(c.visual?.caption || 'Şematik öğretim modeli; ölçekli değildir.')}</p>` : ''}

                    </div>
                </div>


            </div>

            <div class="exam-next-bar">
                <button id="exam-card-prev" class="exam-btn-secondary" ${cardIndex === 0 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> Önceki Kart</button>
                <button id="exam-card-next" class="exam-btn-primary">
                    ${isReviewMode
                        ? (cardIndex === (state.reviewCardIds?.length ? CARDS.findIndex(x => x.id === state.reviewCardIds[state.reviewCardIds.length - 1]) : CARDS.length - 1)
                            ? 'Çalışma Özetime Dön <i class="fas fa-undo"></i>'
                            : 'Sonraki Kart <i class="fas fa-chevron-right"></i>')
                        : (isLastCard
                            ? 'Yazılı Provasına Geç <i class="fas fa-arrow-right"></i>'
                            : 'Sonraki Kart <i class="fas fa-chevron-right"></i>')}
                </button>
            </div>
        `;

        const prevBtn = $('exam-card-prev');
        const nextBtn = $('exam-card-next');
        if (prevBtn) {
            prevBtn.onclick = () => {
                if (isReviewMode && Array.isArray(state.reviewCardIds)) {
                    const currentRevIdx = state.reviewCardIds.indexOf(c.id);
                    if (currentRevIdx > 0) {
                        const prevCid = state.reviewCardIds[currentRevIdx - 1];
                        const targetIdx = CARDS.findIndex(x => x.id === prevCid);
                        if (targetIdx !== -1) renderStudy(targetIdx);
                    }
                } else {
                    renderStudy(cardIndex - 1);
                }
            };
        }

        if (nextBtn) {
            nextBtn.onclick = () => {
                if (isReviewMode && Array.isArray(state.reviewCardIds)) {
                    const currentRevIdx = state.reviewCardIds.indexOf(c.id);
                    if (currentRevIdx !== -1 && currentRevIdx < state.reviewCardIds.length - 1) {
                        const nextCid = state.reviewCardIds[currentRevIdx + 1];
                        const targetIdx = CARDS.findIndex(x => x.id === nextCid);
                        if (targetIdx !== -1) renderStudy(targetIdx);
                    } else {
                        state.studyMode = 'free';
                        state.returnToSummary = false;
                        saveState();
                        goToStep('summary');
                    }
                } else {
                    if (isLastCard) goToStep('practice');
                    else renderStudy(cardIndex + 1);
                }
            };
        }

        // İnteraktif bileşenler
        const interId = c.visual?.interactive_id;
        if (interId === 'lift-hold-carry') setupMotion();
        if (interId === 'force-compare' || interId === 'distance-compare') setupCompare(interId);
        if (['mission-tools', 'debris-strategies', 'cosmic-levels'].includes(interId)) setupLearning(interId);
    }

    // Çalışma planı açık/kapalı durumunu yansıt
    applyStudyPlanState();
}

// Çalışma Planı Aç / Kapat Yönetimi (Genişleyen Ders Alanı)
export function applyStudyPlanState() {
    const layout = document.querySelector('.exam-cards-layout');
    const toggleBtn = $('btn-study-toggle-plan');
    const cardnav = $('exam-cardnav');
    const isOpen = !!state.studyPlanOpen;

    if (layout) {
        layout.classList.toggle('plan-collapsed', !isOpen);
    }
    if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
        toggleBtn.classList.toggle('active', isOpen);
        toggleBtn.innerHTML = isOpen
            ? '<i class="fas fa-columns"></i> <span>Planı Gizle</span>'
            : '<i class="fas fa-bars"></i> <span>Çalışma Planı</span>';
        toggleBtn.title = isOpen
            ? 'Çalışma planını gizle ve ders kartını tam genişliğe çıkar'
            : 'Çalışma planını göster';
    }
    if (cardnav) {
        cardnav.setAttribute('aria-hidden', String(!isOpen));
        if (!isOpen) {
            if (document.activeElement && cardnav.contains(document.activeElement)) {
                if (toggleBtn) toggleBtn.focus();
            }
        } else {
            const activeNavBtn = cardnav.querySelector('.exam-cardnav-btn.active');
            if (activeNavBtn && typeof activeNavBtn.scrollIntoView === 'function') {
                try {
                    activeNavBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                } catch (_) {}
            }
        }
    }
}

export function toggleStudyPlan() {
    state.studyPlanOpen = !state.studyPlanOpen;
    saveState();
    applyStudyPlanState();
}

// Tam Ekran / Odaklanmış Ders Modu Yönetimi (Native Fullscreen API + Mobil Sayfa İçi Zırh)
export function exitStudyFullscreen() {
    const studyView = $('exam-view-study');
    const btn = $('btn-study-fullscreen');

    if (studyView) {
        studyView.classList.remove('fullscreen-study-active');
    }
    if (typeof document !== 'undefined') {
        document.body.classList.remove('exam-fullscreen-open');
        try {
            if (document.fullscreenElement && typeof document.exitFullscreen === 'function') {
                const p = document.exitFullscreen();
                if (p && typeof p.catch === 'function') p.catch(() => {});
            } else if (document.webkitFullscreenElement && typeof document.webkitExitFullscreen === 'function') {
                document.webkitExitFullscreen();
            }
        } catch (_) {}
    }
    if (btn) {
        btn.innerHTML = '<i class="fas fa-expand"></i> <span>Tam Ekran Çalış</span>';
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    }
    applyStudyPlanState();
}

export function enterStudyFullscreen() {
    const studyView = $('exam-view-study');
    if (!studyView) return;
    const btn = $('btn-study-fullscreen');

    studyView.classList.add('fullscreen-study-active');
    if (typeof document !== 'undefined') {
        document.body.classList.add('exam-fullscreen-open');
        try {
            if (typeof studyView.requestFullscreen === 'function') {
                const p = studyView.requestFullscreen();
                if (p && typeof p.catch === 'function') p.catch(() => {});
            } else if (typeof studyView.webkitRequestFullscreen === 'function') {
                studyView.webkitRequestFullscreen();
            }
        } catch (_) {}
    }

    if (btn) {
        btn.innerHTML = '<i class="fas fa-compress"></i> <span>Tam Ekrandan Çık</span>';
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
    }
    applyStudyPlanState();
}

export function toggleStudyFullscreen() {
    const studyView = $('exam-view-study');
    if (!studyView) return;
    const isCurrentlyFs = studyView.classList.contains('fullscreen-study-active') || (typeof document !== 'undefined' && (!!document.fullscreenElement || !!document.webkitFullscreenElement));

    if (isCurrentlyFs) {
        exitStudyFullscreen();
    } else {
        enterStudyFullscreen();
    }
}

// 3b. AŞAMA: YAZILI PROVASI EKRANI (Kurulum & Tek Soru Akışı)
function renderPractice() {
    const setupBox = $('practice-setup-box');
    const activeBox = $('practice-active-box');

    // Eğer aktif bir sınav oturumu yoksa veya kullanıcı "Yeni Prova" başlatmak istiyorsa kurulumu göster
    if (!state.attempt || setupPracticeNewMode) {
        if (setupBox) setupBox.style.display = 'block';
        if (activeBox) activeBox.style.display = 'none';

        const btnBackChoice = setupBox ? setupBox.querySelector('#btn-practice-setup-back') : $('btn-practice-back-choice');
        if (btnBackChoice) {
            btnBackChoice.onclick = () => {
                setupPracticeNewMode = false;
                backStep('choice');
            };
        }

        // Çözüm Modu Butonları (Ekranda / Kâğıtta)
        const btnModeScreen = $('btn-mode-screen');
        const btnModePaper = $('btn-mode-paper');
        const btnStartLabel = $('exam-start-practice-label');
        const setupSubtext = $('exam-setup-subtext');

        const updateSolveModeUI = (mode) => {
            currentSolveMode = mode;
            if (btnModeScreen) btnModeScreen.classList.toggle('active', mode === 'ekranda');
            if (btnModePaper) btnModePaper.classList.toggle('active', mode === 'kagitta');
            if (btnStartLabel) {
                btnStartLabel.textContent = (mode === 'kagitta') ? 'Soru Kâğıdını Hazırla' : 'Başla';
            }
            if (setupSubtext) {
                setupSubtext.style.display = (mode === 'kagitta') ? 'block' : 'none';
            }
        };

        if (btnModeScreen && btnModePaper) {
            btnModeScreen.onclick = () => updateSolveModeUI('ekranda');
            btnModePaper.onclick = () => updateSolveModeUI('kagitta');
        }
        updateSolveModeUI(currentSolveMode);

        // Seviye Profili Butonları (Radio Benzeri Tekil Seçim & Net Gösterge)
        const profileBadge = $('exam-selected-profile-badge');
        const updateProfileBadge = (p) => {
            if (!profileBadge) return;
            const meta = {
                temel: 'Temel (6 kolay · 1 orta)',
                dengeli: 'Dengeli (4 kolay · 2 orta · 1 zor)',
                zorlayici: 'Zorlayıcı (1 kolay · 3 orta · 3 zor)'
            }[p] || 'Dengeli (4 kolay · 2 orta · 1 zor)';
            const parts = meta.split(' ');
            profileBadge.innerHTML = `Seçilen düzey: <strong>${esc(parts[0])}</strong> ${esc(meta.substring(parts[0].length))}`;
        };
        updateProfileBadge(currentProfile);

        document.querySelectorAll('[data-exam-profile]').forEach(btn => {
            const p = btn.dataset.examProfile;
            const isActive = (p === currentProfile);
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-checked', String(isActive));

            btn.onclick = () => {
                currentProfile = p;
                document.querySelectorAll('[data-exam-profile]').forEach(x => {
                    const isXActive = (x.dataset.examProfile === currentProfile);
                    x.classList.toggle('active', isXActive);
                    x.setAttribute('aria-checked', String(isXActive));
                });
                updateProfileBadge(currentProfile);
            };
        });

        // Başlat Butonu
        const btnStart = $('exam-start-practice');
        if (btnStart) {
            btnStart.onclick = () => startNewPractice();
        }
        return;
    }

    // Aktif sınav oturumu mevcut: Tek Soru Görünümünü Göster
    if (setupBox) setupBox.style.display = 'none';
    if (activeBox) activeBox.style.display = 'block';

    const a = state.attempt;
    const questions = a.ids.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
    if (questions.length !== 7) {
        // Hata durumunda güvenli sıfırlama
        state.attempt = null;
        saveState();
        renderPractice();
        return;
    }

    // Soru puanları haritası yoksa oluştur
    if (!a.questionPoints || Object.keys(a.questionPoints).length === 0) {
        a.questionPoints = calculateQuestionPoints(questions, 100);
        a.totalPoints = 100;
        saveState();
    }

    let activeIdx = typeof a.activeQuestionIndex === 'number' ? a.activeQuestionIndex : 0;
    if (activeIdx < 0) activeIdx = 0;
    if (activeIdx > 6) activeIdx = 6;
    a.activeQuestionIndex = activeIdx;

    // Üst Bar Geri Dön Butonu: Mevcut soru metnini güvenle saklar ve hazırlık tercihine döner
    const btnBackChoicePractice = activeBox.querySelector('#btn-practice-back-choice') || $('btn-practice-back-choice');
    if (btnBackChoicePractice) {
        btnBackChoicePractice.onclick = () => {
            const textarea = $('practice-text-ans');
            if (textarea && questions[activeIdx]) {
                a.answers[questions[activeIdx].id] = textarea.value;
            }
            saveState();
            backStep('choice');
        };
    }

    // Üst Bar Durum Bilgileri
    const currInd = $('practice-current-indicator');
    if (currInd) {
        currInd.textContent = (a.solveMode === 'kagitta') ? 'Kâğıtta Çözüm' : `Soru ${activeIdx + 1} / 7`;
    }

    const modeInd = $('practice-mode-indicator');
    if (modeInd) {
        modeInd.innerHTML = (a.solveMode === 'kagitta')
            ? '<i class="fas fa-print"></i> Kâğıtta Çözüm'
            : '<i class="fas fa-laptop"></i> Ekranda Çözüm';
    }

    // Kompakt Soru Seçici Açılır Paneli (Mobil Tek Satır & Hızlı Soru Listesi)
    const btnQPicker = $('btn-practice-q-picker');
    const dropdownQPicker = $('practice-q-picker-dropdown');

    const closeQPicker = () => {
        if (dropdownQPicker) dropdownQPicker.classList.add('is-hidden');
        if (btnQPicker) {
            btnQPicker.classList.remove('active');
            btnQPicker.setAttribute('aria-expanded', 'false');
        }
    };
    closeQPicker();

    if (btnQPicker && dropdownQPicker) {
        if (a.solveMode === 'kagitta') {
            btnQPicker.onclick = null;
            btnQPicker.style.cursor = 'default';
        } else {
            btnQPicker.style.cursor = 'pointer';
            btnQPicker.onclick = (e) => {
                e.stopPropagation();
                const willOpen = dropdownQPicker.classList.contains('is-hidden');
                if (willOpen) {
                    dropdownQPicker.innerHTML = `
                        <div class="q-picker-list">
                            ${questions.map((qu, i) => {
                                const isCurrent = (i === activeIdx);
                                const ansText = (a.answers[qu.id] || '').trim();
                                const isAnswered = ansText.length > 0;
                                const pts = a.questionPoints?.[qu.id] || qu.score_weight || 15;
                                return `
                                    <div class="q-picker-item ${isCurrent ? 'active' : ''} ${isAnswered ? 'answered' : ''}" data-picker-q="${i}">
                                        <div class="q-picker-item-left">
                                            <b class="q-picker-num">${i + 1}</b>
                                            <span class="q-picker-topic">${esc(qu.title)}</span>
                                        </div>
                                        <div class="q-picker-item-right">
                                            <span class="q-picker-pts">${pts} Puan</span>
                                            ${isCurrent
                                                ? '<span class="q-picker-badge current">Şu Anki</span>'
                                                : (isAnswered
                                                    ? '<span class="q-picker-badge answered"><i class="fas fa-check"></i> Yanıtlandı</span>'
                                                    : '<span class="q-picker-badge empty">Boş</span>')}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        <details class="q-picker-scenario-details">
                            <summary><i class="fas fa-info-circle"></i> Senaryo 2 Dağılımı</summary>
                            <div class="q-picker-scenario-body">
                                <p>Uzay Araştırmaları (2 Soru), Uzay Kirliliği (1 Soru), Evren (1 Soru), Fiziksel İş (3 Soru) — Toplam 100 Puan</p>
                            </div>
                        </details>
                    `;

                    dropdownQPicker.querySelectorAll('[data-picker-q]').forEach(item => {
                        item.onclick = () => {
                            const targetIdx = Number(item.dataset.pickerQ);
                            const textarea = $('practice-text-ans');
                            if (textarea && questions[activeIdx]) {
                                a.answers[questions[activeIdx].id] = textarea.value;
                            }
                            a.activeQuestionIndex = targetIdx;
                            saveState();
                            closeQPicker();
                            renderPractice();
                        };
                    });

                    dropdownQPicker.classList.remove('is-hidden');
                    btnQPicker.classList.add('active');
                    btnQPicker.setAttribute('aria-expanded', 'true');
                } else {
                    closeQPicker();
                }
            };
        }
    }

    // Soru Kâğıdını Önizle / Yazdır Butonu
    const btnPreviewPrint = $('btn-practice-preview-print');
    if (btnPreviewPrint) {
        btnPreviewPrint.onclick = (e) => {
            e.preventDefault();
            openPrintPreview(btnPreviewPrint);
        };
    }

    // 1-7 Soru Gezinme Butonları (Nav Strip)
    const navStrip = $('practice-question-nav-strip');
    const bottomBar = activeBox.querySelector('.practice-bottom-bar');
    const qContainer = $('practice-single-question-container');

    if (a.solveMode === 'kagitta') {
        // Kâğıtta Çözüm Modu: Odaklanmış sade bilgilendirme kartı
        if (navStrip) navStrip.style.display = 'none';
        if (bottomBar) bottomBar.style.display = 'none';

        if (qContainer) {
            qContainer.innerHTML = `
                <div class="paper-mode-active-card">
                    <div class="paper-mode-icon"><i class="fas fa-file-alt"></i></div>
                    <h3>Soru Kâğıdın Hazır!</h3>
                    <p>7 açık uçlu sorudan oluşan provan kâğıt üzerinde çözülmek üzere hazırlandı. Soruları kâğıt üzerinde çözdükten sonra cevaplarını kontrol etmek için aşağıdaki butona tıkla.</p>
                    <div class="paper-mode-actions">
                        <button type="button" class="exam-btn-primary" id="btn-paper-to-eval">
                            <i class="fas fa-check-circle"></i> <span>Çözdüm, Cevaplarımı Kontrol Et</span>
                        </button>
                        <button type="button" class="exam-btn-secondary" id="btn-paper-reopen-print">
                            <i class="fas fa-print"></i> <span>Soru Kâğıdını Tekrar Aç</span>
                        </button>
                    </div>
                </div>
            `;

            const btnPaperEval = $('btn-paper-to-eval');
            if (btnPaperEval) {
                btnPaperEval.onclick = () => {
                    a.status = 'evaluating';
                    a.evalQuestionIndex = 0;
                    saveState();
                    goToStep('eval');
                };
            }

            const btnPaperReopen = $('btn-paper-reopen-print');
            if (btnPaperReopen) {
                btnPaperReopen.onclick = () => openPrintPreview(btnPaperReopen);
            }
        }
        return;
    }

    // Ekranda Çözüm Modu: 1-7 Nav strip ve alt bar aktif
    if (navStrip) {
        navStrip.style.display = 'flex';
        navStrip.innerHTML = questions.map((q, i) => {
            const isAnswered = !!(a.answers[q.id] && a.answers[q.id].trim().length > 0);
            const isCurrent = (i === activeIdx);
            return `
                <button type="button" class="q-nav-btn ${isCurrent ? 'active' : ''} ${isAnswered ? 'answered' : ''}" data-nav-q="${i}" title="Soru ${i + 1}">
                    ${i + 1}
                </button>
            `;
        }).join('');

        navStrip.querySelectorAll('[data-nav-q]').forEach(btn => {
            btn.onclick = () => {
                const textarea = $('practice-text-ans');
                if (textarea && questions[activeIdx]) {
                    a.answers[questions[activeIdx].id] = textarea.value;
                }
                a.activeQuestionIndex = Number(btn.dataset.navQ);
                saveState();
                renderPractice();
            };
        });
    }

    if (bottomBar) bottomBar.style.display = 'flex';

    // Tek Soru Konteyneri: PROVADA RUBRİK, İPUCU VEYA CEVAP KESİNLİKLE GÖSTERİLMEZ!
    const q = questions[activeIdx];
    const qPoints = a.questionPoints?.[q.id] || (q.score_weight || 14);

    if (qContainer && q) {
        const visual = q.visual?.asset ? `
            <div class="exam-qimage-box">
                <img class="exam-qimage" src="${esc(ASSET_BASE + q.visual.asset)}" alt="${esc(q.visual.alt || '')}">
            </div>
        ` : '';

        const t = q.table;
        const table = t ? `
            <div class="exam-tablewrap">
                <table class="exam-table">
                    <caption>${esc(t.caption)}</caption>
                    <thead><tr>${t.headers.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
                    <tbody>${t.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
                </table>
            </div>
        ` : '';

        const existingAnswer = a.answers[q.id] || '';

        qContainer.innerHTML = `
            <article class="exam-question-item practice-card">
                <div class="exam-qmeta">
                    <span>SORU ${activeIdx + 1} / 7</span> · 
                    <span>${esc(q.outcome_id)}</span> · 
                    <span>${names[q.difficulty] || ''}</span>
                    <span class="q-points-badge">${qPoints} Puan</span>
                </div>
                <h3 class="exam-qtitle">${esc(q.title)}</h3>
                <div class="exam-qgrid ${visual ? '' : 'noimage'}">
                    <div>
                        <p class="exam-body-p">${esc(q.stem)}</p>
                        ${table}
                    </div>
                    ${visual}
                </div>

                <label class="exam-answer-label" for="practice-text-ans">Cevabın ve Fen Bilimsel Gerekçen:</label>
                <textarea id="practice-text-ans" class="exam-textarea" placeholder="Gerekçeli bilimsel cevabını buraya yaz...">${esc(existingAnswer)}</textarea>
            </article>
        `;

        const textarea = $('practice-text-ans');
        if (textarea) {
            textarea.oninput = () => {
                a.answers[q.id] = textarea.value;
                saveState();
                updateAnsweredCountText(questions);
                // Nav strip rengini canlı güncelle
                const navBtn = navStrip ? navStrip.querySelector(`[data-nav-q="${activeIdx}"]`) : null;
                if (navBtn) {
                    navBtn.classList.toggle('answered', textarea.value.trim().length > 0);
                }
            };
        }
    }

    // Alt Gezinme Butonları (Önceki Soru / Sonraki Soru / Provayı Bitir)
    const btnPrev = $('btn-practice-prev-q');
    if (btnPrev) {
        btnPrev.disabled = (activeIdx === 0);
        btnPrev.onclick = () => {
            if (activeIdx > 0) {
                const textarea = $('practice-text-ans');
                if (textarea && questions[activeIdx]) {
                    a.answers[questions[activeIdx].id] = textarea.value;
                }
                a.activeQuestionIndex = activeIdx - 1;
                saveState();
                renderPractice();
            }
        };
    }

    const btnNext = $('btn-practice-next-q');
    const btnFinish = $('btn-practice-finish');

    if (btnNext && btnFinish) {
        if (activeIdx < 6) {
            btnNext.style.display = 'inline-flex';
            btnFinish.style.display = 'none';
            btnNext.onclick = () => {
                const textarea = $('practice-text-ans');
                if (textarea && questions[activeIdx]) {
                    a.answers[questions[activeIdx].id] = textarea.value;
                }
                a.activeQuestionIndex = activeIdx + 1;
                saveState();
                renderPractice();
            };
        } else {
            btnNext.style.display = 'none';
            btnFinish.style.display = 'inline-flex';
            btnFinish.onclick = () => {
                const textarea = $('practice-text-ans');
                if (textarea && questions[activeIdx]) {
                    a.answers[questions[activeIdx].id] = textarea.value;
                }

                const emptyIndices = [];
                questions.forEach((qu, i) => {
                    if (!(a.answers[qu.id] || '').trim()) {
                        emptyIndices.push(i + 1);
                    }
                });

                if (emptyIndices.length > 0) {
                    const proceed = confirm(`Henüz yanıtlamadığın soru(lar) bulunuyor: Soru ${emptyIndices.join(', ')}.\n\nYine de provayı bitirip öz değerlendirmeye geçmek istiyor musun?`);
                    if (!proceed) return;
                }

                a.status = 'evaluating';
                a.evalQuestionIndex = 0;
                saveState();
                goToStep('eval');
            };
        }
    }

    updateAnsweredCountText(questions);
}

function updateAnsweredCountText(questions) {
    const answeredCountEl = $('practice-answered-count-text');
    if (answeredCountEl && state.attempt) {
        if (state.attempt.solveMode === 'kagitta') {
            answeredCountEl.textContent = 'Kâğıtta Çözüm İçin Hazır';
        } else {
            const answeredCount = questions.filter(q => (state.attempt.answers[q.id] || '').trim().length > 0).length;
            answeredCountEl.textContent = `${answeredCount} / 7 Yanıtlandı`;
        }
    }
}

let startingPractice = false;
async function startNewPractice() {
    if (startingPractice) return;
    startingPractice = true;
    const previousRevision = loadedRevision;
    try {
        if (!await loadData(CONTENT_REVISION, false)) throw new Error('Yeni içerik yüklenemedi.');
        if (state.currentStep !== 'practice' || (!setupPracticeNewMode && state.attempt) || $('scene-yazili')?.classList.contains('is-hidden')) {
            if (previousRevision) await loadData(previousRevision);
            return;
        }
        const run = state.profileRuns[currentProfile] || 0;
        const nextHistory = structuredClone(state.history || {});
        const chosen = selectQuestions(currentProfile, nextHistory, run);
        setupPracticeNewMode = false;
        state.reviewingEval = false;
        state.studyMode = 'free';
        state.returnToSummary = false;
        state.reviewCardIds = [];
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        const sceneYazili = $('scene-yazili');
        if (sceneYazili) {
            sceneYazili.scrollTop = 0;
        }
        state.history = nextHistory;
        state.profileRuns[currentProfile] = run + 1;

        // 5'in katı (10, 15, 20) standart puan dağıtımı
        const pointsMap = calculateQuestionPoints(chosen.questions, SCORING_POLICY.targetTotal);

        // Her soru için ölçüt snapshot haritasını hesapla
        const criteriaMap = {};
        chosen.questions.forEach(q => {
            const qPt = pointsMap[q.id] || 15;
            criteriaMap[q.id] = distributeCriteriaPoints(q.rubric || [], qPt).map(c => ({...c, contentRevision: CONTENT_REVISION, rubricRevision: CONTENT_REVISION}));
        });

        state.attempt = {
            contentRevision: CONTENT_REVISION,
            rubricRevision: CONTENT_REVISION,
            routeKey: crypto.randomUUID(),
            version: 2,
            scoringVersion: SCORING_POLICY.version,
            evaluationVersion: SCORING_POLICY.evaluationVersion,
            ids: chosen.questions.map(q => q.id),
            questionPoints: pointsMap,
            criteriaMap: criteriaMap,
            selectedCriteria: {},
            evaluatedQuestions: {},
            totalPoints: SCORING_POLICY.targetTotal,
            profile: currentProfile,
            repeats: chosen.repeats,
            solveMode: currentSolveMode,
            activeQuestionIndex: 0,
            evalQuestionIndex: 0,
            answers: {},
            evaluations: {},
            revealed: {},
            status: 'in_progress',
            finished: false,
            visitedCards: []
        };
        saveState();
        renderPractice();
        updateBackControls();
        window.FenUpNavigation?.record(true);

        // Kâğıtta çözüm seçildiyse doğrudan baskı ve PDF modalını aç
        if (currentSolveMode === 'kagitta') {
            openPrintPreview();
        }
    } catch (err) {
        if (previousRevision && loadedRevision !== previousRevision) await loadData(previousRevision);
        alert(err.message);
    } finally { startingPractice = false; }
}

export function reEvaluateWithCriteria() {
    if (!state.attempt || !Array.isArray(state.attempt.ids)) return;
    ensureAttemptCriteriaMap(state.attempt);
    state.attempt.evaluationVersion = SCORING_POLICY.evaluationVersion;
    state.attempt.selectedCriteria = {};
    state.attempt.evaluatedQuestions = {};
    state.attempt.finished = false;
    state.attempt.status = 'evaluating';
    state.attempt.evalQuestionIndex = 0;
    state.reviewingEval = false;
    saveState();
    goToStep('eval');
}

// 4. AŞAMA: ÖLÇÜT TEMELLİ ÖZ DEĞERLENDİRME EKRANI (Tek Soru & Bilimsel Rubrik Kontrol Listesi)
function renderEval() {
    if (!state.attempt) {
        goToStep('practice');
        return;
    }

    const a = state.attempt;
    const questions = a.ids.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
    if (questions.length !== 7) {
        goToStep('practice');
        return;
    }

    // Soru puanları ve ölçüt snapshot haritası yoksa tamamla
    if (!a.questionPoints || Object.keys(a.questionPoints).length === 0) {
        a.questionPoints = calculateQuestionPoints(questions, 100);
        a.totalPoints = 100;
        saveState();
    }
    ensureAttemptCriteriaMap(a);

    let evalIdx = typeof a.evalQuestionIndex === 'number' ? a.evalQuestionIndex : 0;
    if (evalIdx < 0) evalIdx = 0;
    if (evalIdx > 6) evalIdx = 6;
    a.evalQuestionIndex = evalIdx;

    // Hazırlık Ekranına Dön Butonu: İlerlemeyi saklar ve hazırlık tercihine döner
    const btnEvalBackChoice = $('btn-eval-back-choice');
    if (btnEvalBackChoice) {
        btnEvalBackChoice.onclick = () => {
            saveState();
            backStep('choice');
        };
    }

    // Çalışma Özetime Dön Butonu (İnceleme modunda gösterilir)
    const btnReturnSummary = $('btn-eval-return-summary');
    if (btnReturnSummary) {
        if (state.reviewingEval) {
            btnReturnSummary.style.display = 'inline-flex';
            btnReturnSummary.onclick = () => {
                state.reviewingEval = false;
                saveState();
                backStep('summary');
            };
        } else {
            btnReturnSummary.style.display = 'none';
        }
    }

    // 1-7 Soru Gezinme Düğmeleri (Eval Strip)
    const navStrip = $('eval-question-nav-strip');
    if (navStrip) {
        navStrip.innerHTML = questions.map((q, i) => {
            const isEvaluated = !!(a.evaluatedQuestions && a.evaluatedQuestions[q.id]);
            const isCurrent = (i === evalIdx);
            return `
                <button type="button" class="q-nav-btn ${isCurrent ? 'active' : ''} ${isEvaluated ? 'eval-completed' : ''}" data-eval-q="${i}" title="Soru ${i + 1} (${isEvaluated ? 'Değerlendirildi' : 'Bekliyor'})">
                    ${i + 1}
                </button>
            `;
        }).join('');

        navStrip.querySelectorAll('[data-eval-q]').forEach(btn => {
            btn.onclick = () => {
                a.evalQuestionIndex = Number(btn.dataset.evalQ);
                saveState();
                renderEval();
            };
        });
    }

    // Tek Soru Değerlendirme Konteyneri
    const q = questions[evalIdx];
    const qPoints = a.questionPoints?.[q.id] || 15;
    const criteria = a.criteriaMap?.[q.id] || [];
    const selectedIds = a.selectedCriteria?.[q.id] || [];
    const isEvaluated = !!(a.evaluatedQuestions && a.evaluatedQuestions[q.id]);
    const currentQScore = criteria.filter(c => selectedIds.includes(c.id)).reduce((s, c) => s + c.points, 0);
    const qContainer = $('eval-single-question-container');

    if (qContainer && q) {
        const visual = q.visual?.asset ? `
            <div class="exam-qimage-box">
                <img class="exam-qimage" src="${esc(ASSET_BASE + q.visual.asset)}" alt="${esc(q.visual.alt || '')}">
            </div>
        ` : '';

        const t = q.table;
        const table = t ? `
            <div class="exam-tablewrap">
                <table class="exam-table">
                    <caption>${esc(t.caption)}</caption>
                    <thead><tr>${t.headers.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
                    <tbody>${t.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
                </table>
            </div>
        ` : '';

        const studentAns = (a.answers[q.id] || '').trim();

        qContainer.innerHTML = `
            <article class="exam-question-item eval-card">
                <div class="exam-qmeta">
                    <span>SORU ${evalIdx + 1} / 7</span> · 
                    <span>${esc(q.outcome_id)}</span> · 
                    <span>${names[q.difficulty] || ''}</span>
                    <span class="q-points-badge">${qPoints} Puan</span>
                </div>
                <h3 class="exam-qtitle">${esc(q.title)}</h3>
                <div class="exam-qgrid ${visual ? '' : 'noimage'}">
                    <div>
                        <p class="exam-body-p">${esc(q.stem)}</p>
                        ${table}
                    </div>
                    ${visual}
                </div>

                <!-- 1. Öğrencinin Kendi Cevabı -->
                <div class="eval-student-answer-box">
                    <h4><i class="fas fa-pencil-alt"></i> 1. Senin Verdiğin Cevap:</h4>
                    <div class="student-answer-content">
                        ${studentAns
                            ? esc(studentAns)
                            : (a.solveMode === 'kagitta'
                                ? '<div class="eval-paper-hint"><i class="fas fa-file-alt"></i> Bu provayı kâğıt üzerinde çözdün. Kâğıttaki çözümünü aşağıdaki bilimsel ölçütlerle karşılaştırarak kendini değerlendir.</div>'
                                : '<em>(Bu soru için ekrana yazılı cevap girilmedi. Kendi çözümünü aşağıdaki bilimsel ölçütlerle karşılaştırabilirsin.)</em>')}
                    </div>
                </div>

                <!-- 2. Örnek Bilimsel Açıklama ve Eşdeğerlik Notu -->
                <div class="eval-sample-answer-box">
                    <h4><i class="fas fa-check-circle" style="color: #2dd4bf;"></i> 2. Örnek Bilimsel Açıklama:</h4>
                    <p class="sample-answer-text">${esc(q.sample_answer)}</p>
                    <div class="eval-alt-note">
                        <i class="fas fa-info-circle"></i> Aynı bilimsel anlamı veren farklı ifadeler kabul edilir.
                    </div>
                </div>

                <!-- 3. “Cevabında hangileri var?” Ölçüt Listesi -->
                <div class="eval-criteria-section">
                    <div class="eval-criteria-header">
                        <h4><i class="fas fa-tasks" style="color: #38bdf8;"></i> 3. Cevabında hangileri var?</h4>
                        <span class="eval-criteria-sub">Kendi cevabında yer alan bilimsel unsurları işaretle:</span>
                    </div>
                    <div class="eval-criteria-list" role="group" aria-label="Bilimsel başarı ölçütleri">
                        ${criteria.map(c => {
                            const isChecked = selectedIds.includes(c.id);
                            return `
                                <label class="exam-criterion-item ${isChecked ? 'checked' : ''}" for="crit-${esc(c.id)}">
                                    <input type="checkbox" id="crit-${esc(c.id)}" class="exam-criterion-checkbox" data-criterion-id="${esc(c.id)}" ${isChecked ? 'checked' : ''} ${state.reviewingEval ? 'disabled' : ''}>
                                    <div class="criterion-custom-box" aria-hidden="true">
                                        <i class="fas fa-check"></i>
                                    </div>
                                    <div class="criterion-body">
                                        <span class="criterion-text">${esc(c.text)}</span>
                                    </div>
                                    <span class="criterion-point-badge">+${c.points} Puan</span>
                                </label>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- 4. Hesaplanan Soru Puanı ve Durum Göstergesi -->
                <div class="eval-score-live-box">
                    <div class="live-score-info">
                        <span class="live-score-label">Bu Sorudan Alınan Puan:</span>
                        <span class="live-score-val" id="eval-current-q-score">${currentQScore} <small>/ ${qPoints} Puan</small></span>
                    </div>
                    <div class="live-eval-status">
                        ${isEvaluated
                            ? '<span class="status-badge saved"><i class="fas fa-check-circle"></i> Değerlendirme Kaydedildi</span>'
                            : '<span class="status-badge pending"><i class="fas fa-pencil-alt"></i> Kayıt Bekliyor</span>'}
                    </div>
                </div>
            </article>
        `;

        // Checkbox tıklama olayları (İnceleme modunda salt okunur)
        if (!state.reviewingEval) {
            qContainer.querySelectorAll('.exam-criterion-checkbox').forEach(cb => {
                cb.onchange = () => {
                    const cId = cb.dataset.criterionId;
                    const currentSel = a.selectedCriteria[q.id] || [];
                    if (cb.checked) {
                        if (!currentSel.includes(cId)) currentSel.push(cId);
                    } else {
                        const idx = currentSel.indexOf(cId);
                        if (idx !== -1) currentSel.splice(idx, 1);
                    }
                    a.selectedCriteria[q.id] = currentSel;
                    const parentLabel = cb.closest('.exam-criterion-item');
                    if (parentLabel) parentLabel.classList.toggle('checked', cb.checked);

                    const newScore = criteria.filter(c => currentSel.includes(c.id)).reduce((s, c) => s + c.points, 0);
                    const scoreValEl = $('eval-current-q-score');
                    if (scoreValEl) scoreValEl.innerHTML = `${newScore} <small>/ ${qPoints} Puan</small>`;
                    saveState();
                };
            });
        }
    }

    // İlerleme Metni
    const evaluatedCount = questions.filter(qu => !!(a.evaluatedQuestions && a.evaluatedQuestions[qu.id])).length;
    const progressEl = $('eval-progress-text');
    if (progressEl) progressEl.textContent = `${evaluatedCount} / 7 Değerlendirildi`;

    // Alt Gezinme Butonları (Önceki / Değerlendirmeyi Kaydet ve İlerle / Çalışma Özetim)
    const btnPrev = $('btn-eval-prev-q');
    if (btnPrev) {
        btnPrev.disabled = (evalIdx === 0);
        btnPrev.onclick = () => {
            if (evalIdx > 0) {
                a.evalQuestionIndex = evalIdx - 1;
                saveState();
                renderEval();
            }
        };
    }

    const btnNext = $('btn-eval-next-q');
    const btnToSummary = $('btn-eval-to-summary');

    if (btnNext && btnToSummary) {
        if (evalIdx < 6) {
            btnNext.style.display = 'inline-flex';
            btnNext.innerHTML = '<span>Değerlendirmeyi Kaydet ve İlerle</span> <i class="fas fa-arrow-right"></i>';
            btnToSummary.style.display = 'none';

            btnNext.onclick = () => {
                a.evaluatedQuestions = a.evaluatedQuestions || {};
                a.selectedCriteria = a.selectedCriteria || {};
                a.evaluatedQuestions[q.id] = true;
                a.selectedCriteria[q.id] = a.selectedCriteria[q.id] || [];
                a.evalQuestionIndex = evalIdx + 1;
                saveState();
                renderEval();
            };
        } else {
            btnNext.style.display = 'none';
            btnToSummary.style.display = 'inline-flex';
            btnToSummary.innerHTML = '<i class="fas fa-chart-pie"></i> <span>Değerlendirmeyi Kaydet ve Özete Geç</span>';

            btnToSummary.onclick = () => {
                if (state.reviewingEval) {
                    state.reviewingEval = false;
                    saveState();
                    goToStep('summary');
                    return;
                }

                a.evaluatedQuestions = a.evaluatedQuestions || {};
                a.selectedCriteria = a.selectedCriteria || {};
                a.evaluatedQuestions[q.id] = true;
                a.selectedCriteria[q.id] = a.selectedCriteria[q.id] || [];

                const missing = [];
                questions.forEach((qu, i) => {
                    if (!a.evaluatedQuestions[qu.id]) {
                        missing.push(i + 1);
                    }
                });

                if (missing.length > 0) {
                    alert(`Lütfen tüm sorular için öz değerlendirmeni kaydet.\nHenüz değerlendirilmeyen: Soru ${missing.join(', ')}`);
                    a.evalQuestionIndex = missing[0] - 1;
                    saveState();
                    renderEval();
                    return;
                }

                a.status = 'completed';
                a.finished = true;
                state.reviewingEval = false;
                saveState();
                goToStep('summary');
            };
        }
    }
}

// 5. AŞAMA: ÇALIŞMA ÖZETİ EKRANI (100 Puan, Konu Analizi & Hedefli Eksikleri Çalış)
function renderSummary() {
    if (!state.attempt) {
        goToStep('scope');
        return;
    }

    const a = state.attempt;
    const questions = a.ids.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
    if (questions.length !== 7) {
        goToStep('scope');
        return;
    }

    // Değerlendirme Modu Ayrımı: Yeni Ölçüt Temelli vs Eski 3 Seçenekli Kayıt
    const isLegacyEvaluation = (a.evaluationVersion !== 2 && a.evaluations && Object.keys(a.evaluations).length > 0 && (!a.criteriaMap || Object.keys(a.selectedCriteria || {}).length === 0));

    let totalScore = 0;
    let fullyCorrectCount = 0;
    let partialCount = 0;
    let zeroCount = 0;

    if (isLegacyEvaluation) {
        // Eski kayıt uyumluluğu: Eski puanlama motorunu koru
        questions.forEach(q => {
            const ev = a.evaluations[q.id];
            const p = a.questionPoints?.[q.id] || 15;
            if (ev === 'tam') {
                totalScore += p;
                fullyCorrectCount++;
            } else if (ev === 'kismen') {
                totalScore += getPartialScore(p);
                partialCount++;
            } else {
                zeroCount++;
            }
        });
    } else {
        // Yeni Ölçüt Temelli Değerlendirme
        ensureAttemptCriteriaMap(a);
        questions.forEach(q => {
            const qScore = getQuestionScore(q.id, a);
            const qTarget = a.questionPoints?.[q.id] || 15;
            totalScore += qScore;
            if (qScore === qTarget) {
                fullyCorrectCount++;
            } else if (qScore > 0) {
                partialCount++;
            } else {
                zeroCount++;
            }
        });
    }

    a.score = totalScore;
    saveState();

    // Eksik Ölçütler ve Kart Eşleştirmesi (Hedefli Tekrar)
    const missedCardMap = {};
    if (!isLegacyEvaluation) {
        questions.forEach(q => {
            const criteria = a.criteriaMap?.[q.id] || [];
            const selIds = a.selectedCriteria?.[q.id] || [];
            criteria.forEach(c => {
                if (!selIds.includes(c.id)) {
                    (c.return_card_ids || []).forEach(cid => {
                        const card = CARDS.find(cardItem => cardItem.id === cid);
                        if (!card) return;
                        if (!missedCardMap[cid]) {
                            missedCardMap[cid] = {
                                card,
                                criteriaTexts: []
                            };
                        }
                        missedCardMap[cid].criteriaTexts.push(c.text);
                    });
                }
            });
        });
    } else {
        // Eski kayıt uyumluluğu
        questions.filter(q => a.evaluations[q.id] !== 'tam').forEach(q => {
            (q.return_card_ids || []).forEach(cid => {
                const card = CARDS.find(cardItem => cardItem.id === cid);
                if (card && !missedCardMap[cid]) {
                    missedCardMap[cid] = {
                        card,
                        criteriaTexts: []
                    };
                }
            });
        });
    }

    // Müfredat sırasına göre tekilleştirilmiş kart dizisi
    const sortedMissedCards = CARDS.filter(c => !!missedCardMap[c.id]).map(c => missedCardMap[c.id]);
    const returnCardIds = sortedMissedCards.map(item => item.card.id);

    // Hero Skor Alanı
    const scoreValEl = $('summary-total-score');
    if (scoreValEl) {
        scoreValEl.innerHTML = `${totalScore} <span style="font-size: 0.5em; color: #94a3b8; font-weight: 500;">/ 100</span>`;
    }

    const scoreSubEl = $('summary-score-sub');
    if (scoreSubEl) {
        let msg = '7. Sınıf · 1. Dönem 1. Yazılı (MEB Senaryo 2)';
        if (sortedMissedCards.length === 0 || totalScore === 100) {
            msg = 'Tebrikler! Bu provada tüm bilimsel ölçütleri karşıladığını belirttin.';
        } else if (totalScore >= 80) {
            msg = 'Çok iyi ilerledin! Tekrar kartlarıyla eksiklerini tamamlayabilirsin.';
        } else if (totalScore >= 60) {
            msg = 'İyi bir prova! Tekrar kartlarına odaklanarak hazırlığını güçlendirebilirsin.';
        } else {
            msg = 'Provayı tamamladın. Tekrar kartlarıyla eksik olduğun konuları pekiştirebilirsin.';
        }
        scoreSubEl.textContent = msg;
    }

    const tamEl = $('summary-tam-count');
    if (tamEl) tamEl.textContent = fullyCorrectCount;
    const kismenEl = $('summary-kismen-count');
    if (kismenEl) kismenEl.textContent = partialCount;
    const yapamadimEl = $('summary-yapamadim-count');
    if (yapamadimEl) yapamadimEl.textContent = zeroCount;

    // Konu Bazlı Başarı Analizi (Senaryo 2 Kazanımları)
    const goodListEl = $('summary-good-topics-list');
    const needsReviewListEl = $('summary-needs-review-list');

    if (goodListEl && needsReviewListEl && DATA.outcomes) {
        goodListEl.innerHTML = '';
        needsReviewListEl.innerHTML = '';

        DATA.outcomes.forEach(outcome => {
            const outcomeQs = questions.filter(q => q.outcome_id === outcome.id);
            if (outcomeQs.length === 0) return;

            let isOutcomeAllTam = false;
            let oPartialCount = 0;
            let oZeroCount = 0;

            if (isLegacyEvaluation) {
                isOutcomeAllTam = outcomeQs.every(q => a.evaluations[q.id] === 'tam');
                oPartialCount = outcomeQs.filter(q => a.evaluations[q.id] === 'kismen').length;
                oZeroCount = outcomeQs.filter(q => a.evaluations[q.id] === 'yapamadim').length;
            } else {
                isOutcomeAllTam = outcomeQs.every(q => {
                    const qScore = getQuestionScore(q.id, a);
                    const qTarget = a.questionPoints?.[q.id] || 15;
                    return qScore === qTarget;
                });
                outcomeQs.forEach(q => {
                    const qScore = getQuestionScore(q.id, a);
                    const qTarget = a.questionPoints?.[q.id] || 15;
                    if (qScore === 0) oZeroCount++;
                    else if (qScore < qTarget) oPartialCount++;
                });
            }

            if (isOutcomeAllTam) {
                const item = document.createElement('div');
                item.className = 'analysis-item success';
                item.innerHTML = `
                    <div class="analysis-item-head">
                        <span class="outcome-tag">${esc(outcome.id)}</span>
                        <strong>${esc(outcome.short_title)}</strong>
                    </div>
                    <p>${outcomeQs.length > 1 ? outcomeQs.length + ' sorunun tamamında' : 'Bu konudaki soruda'} tüm ölçütleri karşıladığını belirttin.</p>
                `;
                goodListEl.appendChild(item);
            } else {
                const item = document.createElement('div');
                item.className = 'analysis-item warning';
                item.innerHTML = `
                    <div class="analysis-item-head">
                        <span class="outcome-tag">${esc(outcome.id)}</span>
                        <strong>${esc(outcome.short_title)}</strong>
                    </div>
                    <p>
                        ${oZeroCount > 0 ? `<strong>${oZeroCount} soruda ölçüt işaretlenmedi.</strong> ` : ''}
                        ${oPartialCount > 0 ? `<span>${oPartialCount} soruda bazı ölçütler eksik kaldı.</span>` : ''}
                    </p>
                `;
                needsReviewListEl.appendChild(item);
            }
        });

        if (goodListEl.children.length === 0) {
            goodListEl.innerHTML = '<p class="exam-body-note">Bu provada henüz tam başarı sağlanan konu bulunmuyor. Konu kartlarına dönerek çalışmanı pekiştirebilirsin.</p>';
        }
        if (needsReviewListEl.children.length === 0) {
            needsReviewListEl.innerHTML = '<p class="exam-body-note" style="color:#2dd4bf;"><i class="fas fa-star"></i> Tebrikler! Bu provada tüm konularda ölçütleri karşıladığını belirttin.</p>';
        }
    }

    const returnCardsContainer = $('summary-return-cards-container');
    const needsStudyBox = $('summary-needs-study-box');
    const btnStudyMissed = $('btn-summary-study-missed');
    const btnNewPractice = $('btn-summary-new-practice');

    if (returnCardsContainer && needsStudyBox) {
        if (sortedMissedCards.length === 0) {
            needsStudyBox.style.display = 'block';
            returnCardsContainer.innerHTML = `
                <div class="eval-all-perfect-box">
                    <i class="fas fa-trophy"></i>
                    <div>
                        <strong>Tebrikler! Eksiksiz Başarı!</strong>
                        <p>Öz değerlendirmende bu provadaki tüm ölçütleri karşıladığını belirttin. Tekrar etmen önerilen konu kartı bulunmuyor.</p>
                    </div>
                </div>
            `;
            if (btnStudyMissed) btnStudyMissed.style.display = 'none';
            if (btnNewPractice) {
                btnNewPractice.className = 'exam-btn exam-btn-primary';
            }
        } else {
            needsStudyBox.style.display = 'block';
            if (btnStudyMissed) {
                btnStudyMissed.style.display = 'inline-flex';
                btnStudyMissed.className = 'exam-btn exam-btn-primary summary-primary-btn';
                btnStudyMissed.innerHTML = `<i class="fas fa-book-reader"></i> <span>Eksiklerimi Çalış (${sortedMissedCards.length} Kart)</span>`;
            }
            if (btnNewPractice) {
                btnNewPractice.className = 'exam-btn exam-btn-secondary';
            }

            returnCardsContainer.innerHTML = sortedMissedCards.map(item => {
                const card = item.card;
                return `
                    <button type="button" class="return-card-btn" data-return-card="${esc(card.id)}">
                        <div class="return-card-info">
                            <span class="return-card-code">${esc(card.outcome_id)}</span>
                            <strong>${esc(card.title)}</strong>
                            <small>${esc(card.takeaway)}</small>
                        </div>
                        <span class="return-card-action">Karta Git <i class="fas fa-arrow-right"></i></span>
                    </button>
                `;
            }).join('');

            returnCardsContainer.querySelectorAll('[data-return-card]').forEach(btn => {
                btn.onclick = () => {
                    const cid = btn.dataset.returnCard;
                    const targetIdx = CARDS.findIndex(c => c.id === cid);
                    if (targetIdx !== -1) {
                        state.studyMode = 'review';
                        state.reviewCardIds = returnCardIds;
                        state.studyCardIdx = targetIdx;
                        state.returnToSummary = true;
                        saveState();
                        goToStep('study');
                    }
                };
            });
        }
    }

    // Alt Eylem Butonları
    const btnToChoice = $('btn-summary-to-choice');
    if (btnToChoice) {
        btnToChoice.onclick = () => backStep('choice');
    }

    const btnReviewEval = $('btn-summary-review-eval');
    if (btnReviewEval) {
        btnReviewEval.onclick = () => {
            state.reviewingEval = true;
            state.attempt.evalQuestionIndex = 0;
            saveState();
            goToStep('eval');
        };
    }

    if (btnStudyMissed) {
        btnStudyMissed.onclick = () => {
            if (sortedMissedCards.length === 0) {
                alert('Tebrikler! Bu provada tekrar etmen önerilen bir eksik konu bulunmuyor. Senaryodaki tüm konuları Hazırlık Ekranından serbestçe çalışabilirsin.');
                return;
            }
            state.studyMode = 'review';
            state.reviewCardIds = returnCardIds;
            const firstIdx = CARDS.findIndex(c => c.id === returnCardIds[0]);
            state.studyCardIdx = firstIdx !== -1 ? firstIdx : 0;
            state.returnToSummary = true;
            saveState();
            goToStep('study');
        };
    }

    // Eski Kayıtlar İçin "Ölçütlerle Yeniden Değerlendir" Butonu
    let btnReEval = $('btn-summary-re-evaluate');
    if (isLegacyEvaluation) {
        if (!btnReEval) {
            const actionsToolbar = document.querySelector('.summary-actions-toolbar');
            if (actionsToolbar) {
                btnReEval = document.createElement('button');
                btnReEval.type = 'button';
                btnReEval.id = 'btn-summary-re-evaluate';
                btnReEval.className = 'exam-btn-secondary';
                btnReEval.innerHTML = '<i class="fas fa-tasks"></i> <span>Ölçütlerle Yeniden Değerlendir</span>';
                actionsToolbar.insertBefore(btnReEval, actionsToolbar.firstChild);
            }
        }
        if (btnReEval) {
            btnReEval.style.display = 'inline-flex';
            btnReEval.onclick = () => {
                if (confirm('Sorular ve cevapların korunarak yeni ölçüt temelli değerlendirme ekranına geçilecek. Devam etmek istiyor musun?')) {
                    reEvaluateWithCriteria();
                }
            };
        }
    } else {
        if (btnReEval) btnReEval.style.display = 'none';
    }

    if (btnNewPractice) {
        btnNewPractice.onclick = () => {
            setupPracticeNewMode = true;
            goToStep('practice');
        };
    }
}

// --- YAZDIRMA VE KÂĞITTA ÇÖZÜM FORMATI (Print / PDF Sheet Preview & Vector PDF Download) ---
let lastPrintTriggerElement = null;
let pdfMakePromise = null;

function loadPdfMake() {
    if (typeof window !== 'undefined' && window.pdfMake && window.pdfMake.vfs) {
        return Promise.resolve(window.pdfMake);
    }
    if (pdfMakePromise) return pdfMakePromise;
    pdfMakePromise = new Promise((resolve, reject) => {
        const script1 = document.createElement('script');
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/pdfmake.min.js';
        script1.crossOrigin = 'anonymous';
        script1.onload = () => {
            const script2 = document.createElement('script');
            script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.10/vfs_fonts.js';
            script2.crossOrigin = 'anonymous';
            script2.onload = () => {
                if (window.pdfMake && window.pdfMake.vfs) {
                    resolve(window.pdfMake);
                } else {
                    reject(new Error('pdfMake veya vfs_fonts yüklenemedi.'));
                }
            };
            script2.onerror = () => {
                pdfMakePromise = null;
                reject(new Error('vfs_fonts yüklenemedi.'));
            };
            document.head.appendChild(script2);
        };
        script1.onerror = () => {
            pdfMakePromise = null;
            reject(new Error('pdfMake yüklenemedi.'));
        };
        document.head.appendChild(script1);
    });
    return pdfMakePromise;
}

function imageToDataUrl(src, maxWidth = 480, maxHeight = 360) {
    return new Promise((resolve) => {
        if (!src || typeof document === 'undefined') return resolve(null);
        const img = new Image();
        const timeout = setTimeout(() => { img.onload = img.onerror = null; resolve(null); }, 15000);
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            clearTimeout(timeout);
            try {
                let w = img.naturalWidth || 400;
                let h = img.naturalHeight || 300;
                const ratio = Math.min(maxWidth / w, maxHeight / h, 1);
                w = Math.max(1, Math.round(w * ratio));
                h = Math.max(1, Math.round(h * ratio));

                const canvas = document.createElement('canvas');
                canvas.width = w * 2;
                canvas.height = h * 2;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve({ dataUrl: canvas.toDataURL('image/png', 0.95), width: w, height: h });
            } catch (_) {
                resolve(null);
            }
        };
        img.onerror = () => { clearTimeout(timeout); resolve(null); };
        img.src = src;
    });
}

async function generateExamPdfBlob(questions, attempt) {
    const assetBase = ASSET_BASE;
    const pdfMake = await loadPdfMake();
    const pointsMap = attempt.questionPoints || calculateQuestionPoints(questions, SCORING_POLICY.targetTotal);

    let logoObj = null;
    try {
        logoObj = await imageToDataUrl('fenupx-logo.png', 40, 40);
    } catch (_) {}

    const visualPromises = questions.map(async q => {
        if (q.visual?.asset) {
            try {
                return await imageToDataUrl(assetBase + q.visual.asset, 260, 180);
            } catch (_) {
                return null;
            }
        }
        return null;
    });
    const visuals = await Promise.all(visualPromises);
    if (questions.some((q, i) => q.visual?.asset && !visuals[i])) {
        const error = new Error('Soru görseli yüklenemedi; eksik PDF oluşturulmadı.');
        error.code = 'EXAM_IMAGE_LOAD';
        throw error;
    }

    const docContent = [];

    // 1. Üst Bilgi ve Başlık
    const headerCols = [];
    if (logoObj && logoObj.dataUrl) {
        headerCols.push({
            image: logoObj.dataUrl,
            width: 36,
            height: 36,
            margin: [0, 0, 10, 0]
        });
    }
    headerCols.push({
        stack: [
            { text: 'FenUp X — Fen Bilimleri Yazılı Provası', fontSize: 13, bold: true, color: '#0f172a' },
            { text: '7. Sınıf 1. Dönem 1. Yazılı Provası (MEB Senaryo 2)', fontSize: 9.5, color: '#475569', margin: [0, 2, 0, 0] }
        ]
    });

    docContent.push({
        columns: headerCols,
        margin: [0, 0, 0, 8]
    });

    // 2. Öğrenci Künyesi (5 Sütunlu Kompakt Tablo)
    docContent.push({
        table: {
            widths: ['32%', '17%', '17%', '17%', '17%'],
            body: [
                [
                    { text: 'Adı Soyadı: ...................................', fontSize: 8.5, bold: true, color: '#1e293b' },
                    { text: 'Sınıf / Şube: ..........', fontSize: 8.5, bold: true, color: '#1e293b' },
                    { text: 'Okul No: ..........', fontSize: 8.5, bold: true, color: '#1e293b' },
                    { text: 'Tarih: ...../...../202...', fontSize: 8.5, bold: true, color: '#1e293b' },
                    { text: 'Puan: ...... / 100', fontSize: 8.5, bold: true, color: '#0f172a', alignment: 'center' }
                ]
            ]
        },
        layout: {
            hLineWidth: () => 0.75,
            vLineWidth: () => 0.75,
            hLineColor: () => '#cbd5e1',
            vLineColor: () => '#cbd5e1',
            fillColor: () => '#f8fafc',
            paddingLeft: () => 6,
            paddingRight: () => 6,
            paddingTop: () => 4,
            paddingBottom: () => 4
        },
        margin: [0, 0, 0, 6]
    });

    // 3. Kısa Yönerge (Ayrı kapak sayfası olmadan Soru 1 hemen ardından başlar)
    docContent.push({
        text: 'Yönerge: Bu sınav MEB Senaryo 2 kazanım dağılımına uygun 7 açık uçlu sorudan oluşmaktadır. Soru puanları soru köklerinin sonunda parantez içinde belirtilmiş olup sınav toplam 100 puandır. Cevaplarınızı ve fen bilimsel gerekçelerinizi soruların altındaki çizgili alanlara açıkça yazınız. Başarılar dileriz.',
        fontSize: 7.6,
        italics: true,
        color: '#64748b',
        margin: [0, 0, 0, 10]
    });

    // 4. Sorular Akışı (Bölünmeyi engelleyen unbreakable soru blokları)
    questions.forEach((q, i) => {
        const qPoints = pointsMap[q.id] || 15;
        const lineCount = qPoints >= 20 ? 8 : (qPoints >= 15 ? 6 : 4);
        const qStack = [];

        // Soru Başlığı: Sade "Soru 1", "Soru 2" (öğrenci kâğıdında teknik kazanım kodu YER ALMAZ)
        qStack.push({
            text: `Soru ${i + 1}`,
            fontSize: 10.5,
            bold: true,
            color: '#0f172a',
            margin: [0, 0, 0, 3]
        });

        // Soru Metni: Kökün sonunda parantez içinde soru puanı
        qStack.push({
            text: [
                { text: q.stem + ' ', fontSize: 9.2, color: '#1e293b', lineHeight: 1.25 },
                { text: `(${qPoints} puan)`, fontSize: 9.2, bold: true, color: '#0f172a' }
            ],
            margin: [0, 0, 0, 5]
        });

        // Varsa Tablo
        if (q.table) {
            qStack.push({
                table: {
                    headerRows: 1,
                    widths: q.table.headers.map(() => '*'),
                    body: [
                        q.table.headers.map(h => ({ text: h, fontSize: 8.5, bold: true, alignment: 'center', fillColor: '#f1f5f9' })),
                        ...q.table.rows.map(r => r.map(c => ({ text: c, fontSize: 8.5, alignment: 'center' })))
                    ]
                },
                layout: {
                    hLineWidth: () => 0.5,
                    vLineWidth: () => 0.5,
                    hLineColor: () => '#cbd5e1',
                    vLineColor: () => '#cbd5e1',
                    paddingTop: () => 3,
                    paddingBottom: () => 3
                },
                margin: [0, 2, 0, 5]
            });
        }

        // Varsa Görsel
        if (visuals[i] && visuals[i].dataUrl) {
            qStack.push({
                image: visuals[i].dataUrl,
                width: Math.min(visuals[i].width, 240),
                alignment: 'center',
                margin: [0, 3, 0, 5]
            });
        }

        // Çizgili Cevap Alanı
        qStack.push({
            text: 'Cevabınız ve Fen Bilimsel Gerekçeniz:',
            fontSize: 7.8,
            bold: true,
            italics: true,
            color: '#475569',
            margin: [0, 4, 0, 2]
        });

        const ruledLinesBody = Array(lineCount).fill(0).map(() => [
            { text: ' ', height: 16, border: [false, false, false, true], borderColor: ['#fff', '#fff', '#fff', '#94a3b8'] }
        ]);

        qStack.push({
            table: {
                widths: ['*'],
                body: ruledLinesBody
            },
            layout: {
                hLineWidth: () => 0.5,
                vLineWidth: () => 0,
                paddingLeft: () => 0,
                paddingRight: () => 0,
                paddingTop: () => 0,
                paddingBottom: () => 0
            },
            margin: [0, 0, 0, 8]
        });

        // unbreakable: true soru bloğunun sayfa sınırında bölünmesini engeller
        docContent.push({
            stack: qStack,
            unbreakable: true,
            margin: [0, 0, 0, 8]
        });
    });

    const docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [36, 30, 36, 32],
        content: docContent,
        footer: function(currentPage, pageCount) {
            return {
                text: `Sayfa ${currentPage} / ${pageCount} • fenupx.com`,
                alignment: 'center',
                fontSize: 8,
                color: '#64748b',
                margin: [0, 10, 0, 0]
            };
        },
        defaultStyle: {
            font: 'Roboto'
        }
    };

    return new Promise((resolve, reject) => {
        try {
            const pdfDoc = pdfMake.createPdf(docDefinition);
            pdfDoc.getBlob((blob) => {
                if (blob) resolve(blob);
                else reject(new Error('PDF Blob oluşturulamadı.'));
            });
        } catch (err) {
            reject(err);
        }
    });
}

async function downloadExamPdf(btnDownload = null) {
    if (!state.attempt) return;
    const qs = state.attempt.ids.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
    if (qs.length === 0) return;

    const origHtml = btnDownload ? btnDownload.innerHTML : '';
    if (btnDownload) {
        btnDownload.disabled = true;
        btnDownload.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>PDF Hazırlanıyor...</span>';
    }

    try {
        const blob = await generateExamPdfBlob(qs, state.attempt);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'FenUpX_7Sinif_1Donem_1Yazili_Senaryo2.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
        console.warn('PDF oluşturulamadı:', err);
        if (err.code === 'EXAM_IMAGE_LOAD') {
            alert('Bir soru görseli yüklenemediği için eksik PDF indirilmedi. Bağlantını kontrol edip tekrar deneyebilirsin; cevapların korundu.');
            return;
        }
        alert("Doğrudan PDF indirme bu tarayıcıda tamamlanamadı. Açılacak yazdırma penceresinden 'PDF Olarak Kaydet' seçeneğini kullanabilirsiniz.");
        const images = [...document.querySelectorAll('#exam-print-sheet img')];
        if (images.every(img => img.complete && img.naturalWidth > 0)) window.print();
    } finally {
        if (btnDownload) {
            btnDownload.disabled = false;
            btnDownload.innerHTML = origHtml;
        }
    }
}

function openPrintPreview(triggerEl = null) {
    if (!state.attempt) return;
    const qs = state.attempt.ids.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
    const printEl = $('exam-print-sheet');
    const modalEl = $('exam-print-preview-modal');
    if (!printEl || !modalEl) return;

    // Soru puanları haritası yoksa 5'in katları standardıyla tamamla
    if (!state.attempt.questionPoints || Object.keys(state.attempt.questionPoints).length === 0) {
        state.attempt.questionPoints = calculateQuestionPoints(qs, SCORING_POLICY.targetTotal);
        state.attempt.totalPoints = SCORING_POLICY.targetTotal;
        state.attempt.scoringVersion = SCORING_POLICY.version;
        saveState();
    }

    // Tetikleyen düğmeyi sakla (kapatınca odağı geri vermek için)
    lastPrintTriggerElement = triggerEl || (document.activeElement && document.activeElement !== document.body ? document.activeElement : $('btn-practice-preview-print'));

    printEl.innerHTML = `
        <div class="print-header">
            <div class="print-brand-row">
                <img src="fenupx-logo.png" alt="FenUp X Logo" class="print-logo" width="44" height="44">
                <div class="print-title-group">
                    <h1 class="print-school-title">FenUp X — Fen Bilimleri Yazılı Provası</h1>
                    <h2 class="print-sub-title">7. Sınıf 1. Dönem 1. Yazılı Provası (MEB Senaryo 2)</h2>
                </div>
            </div>
            <div class="print-student-info-grid">
                <div class="print-info-item"><strong>Adı Soyadı:</strong> ..............................................................</div>
                <div class="print-info-item"><strong>Sınıfı / Şubesi:</strong> ....................</div>
                <div class="print-info-item"><strong>Okul No:</strong> ....................</div>
                <div class="print-info-item"><strong>Tarih:</strong> ....................</div>
                <div class="print-info-item"><strong>Puan:</strong> ...... / 100</div>
            </div>
        </div>
        <div class="print-instructions">
            <strong>Yönerge:</strong> Bu sınav MEB Senaryo 2 kazanım dağılımına uygun 7 açık uçlu sorudan oluşmaktadır. Soru puanları soru köklerinin sonunda parantez içinde belirtilmiş olup sınav toplam 100 puandır. Cevaplarınızı ve fen bilimsel gerekçelerinizi soruların altındaki çizgili alanlara açıkça yazınız. Başarılar dileriz.
        </div>
        <div class="print-questions-flow">
            ${qs.map((q, i) => {
                const qPoints = state.attempt.questionPoints?.[q.id] || 15;
                const visual = q.visual?.asset ? `
                    <div class="print-qimage">
                        <img src="${esc(ASSET_BASE + q.visual.asset)}" alt="${esc(q.visual?.alt || '')}">
                    </div>
                ` : '';

                const table = q.table ? `
                    <table class="print-table">
                        <caption>${esc(q.table.caption)}</caption>
                        <thead><tr>${q.table.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
                        <tbody>${q.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
                    </table>
                ` : '';

                // 5'in katı soru puanına uygun fiziksel çizgili alan satır sayısı
                const lineCount = qPoints >= 20 ? 8 : (qPoints >= 15 ? 6 : 4);
                const ruledLines = Array(lineCount).fill('<div class="print-line"></div>').join('');

                return `
                    <div class="print-question-block">
                        <div class="print-q-header">
                            <span class="print-q-num">Soru ${i + 1}</span>
                        </div>
                        <div class="print-q-body">
                            <p class="print-q-stem">${esc(q.stem)} <strong>(${qPoints} puan)</strong></p>
                            ${table}
                            ${visual}
                        </div>
                        <div class="print-answer-lines-container">
                            <span class="print-lines-label">Cevabınız ve Fen Bilimsel Gerekçeniz:</span>
                            <div class="print-ruled-lines">
                                ${ruledLines}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="print-sheet-footer">
            <span>fenupx.com • 7. Sınıf Fen Bilimleri Yazılı Provası</span>
        </div>
    `;

    // Ortak modal sözleşmesi: is-hidden kaldır, is-open ve active ekle, display flex yap
    modalEl.classList.remove('is-hidden');
    modalEl.classList.add('is-open', 'active');
    modalEl.style.display = 'flex';
    modalEl.setAttribute('aria-hidden', 'false');

    // Arka plan kaydırma kilidi
    document.body.classList.add('exam-modal-open');

    // PDF İndir butonu
    const btnDownloadPdf = $('btn-print-preview-download-pdf');
    if (btnDownloadPdf) {
        btnDownloadPdf.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            downloadExamPdf(btnDownloadPdf);
        };
    }

    // Yazdır butonu: gerçek window.print() başlatır, veriyi bozmaz
    const btnSubmit = $('btn-print-preview-submit');
    if (btnSubmit) {
        btnSubmit.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.print();
        };
    }

    // Provaya Dön butonu: modalı kapatır, soru ve cevapları korur
    const btnClose = $('btn-print-preview-close');
    if (btnClose) {
        btnClose.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            closePrintPreview();
        };
    }

    // Backdrop tıklandığında kapat
    modalEl.onclick = (e) => {
        if (e.target === modalEl) {
            e.preventDefault();
            closePrintPreview();
        }
    };

    // Açılışta odağı birincil düğmeye (PDF İndir veya Yazdır) taşı
    setTimeout(() => {
        if (btnDownloadPdf) {
            btnDownloadPdf.focus();
        } else if (btnSubmit) {
            btnSubmit.focus();
        } else if (modalEl) {
            modalEl.focus();
        }
    }, 50);
}

function closePrintPreview() {
    const modalEl = $('exam-print-preview-modal');
    if (modalEl) {
        modalEl.classList.remove('is-open', 'active');
        modalEl.classList.add('is-hidden');
        modalEl.style.display = 'none';
        modalEl.setAttribute('aria-hidden', 'true');
    }

    // Arka plan kaydırma kilidini temizle
    document.body.classList.remove('exam-modal-open');

    // Tetikleyen düğmeye odağı geri ver
    if (lastPrintTriggerElement && typeof lastPrintTriggerElement.focus === 'function') {
        try {
            lastPrintTriggerElement.focus();
        } catch (_) {}
    }
}

// --- YÖNETİCİ PANELİ: 48 SORULUK SORU HAVUZU İNCELEME (Admin Only) ---
export function renderAdminQuestionReview() {
    const bankSelect = $('admin-bank-select');
    const container = $('admin-review-container');
    if (!bankSelect || !container) return;

    if (QUESTIONS.length === 0) {
        container.innerHTML = '<p style="color:#aaa;">Soru havuzu yükleniyor veya boş.</p>';
        return;
    }

    if (bankSelect.children.length === 0) {
        bankSelect.innerHTML = QUESTIONS.map((q, idx) => `
            <option value="${esc(q.id)}">${idx + 1}. [${esc(q.outcome_id)}] ${esc(q.id)} · ${names[q.difficulty] || ''} · ${esc(q.title)}</option>
        `).join('');

        bankSelect.onchange = () => {
            const q = QUESTIONS.find(item => item.id === bankSelect.value);
            if (q) displayAdminQuestion(q, container);
        };
    }

    const selectedQ = QUESTIONS.find(item => item.id === bankSelect.value) || QUESTIONS[0];
    if (selectedQ) {
        displayAdminQuestion(selectedQ, container);
    }
}

function displayAdminQuestion(q, container) {
    const visual = q.visual?.asset ? `
        <div style="margin: 12px 0; text-align:center;">
            <img src="${esc(ASSET_BASE + q.visual.asset)}" alt="${esc(q.visual.alt || '')}" style="max-width:100%; max-height:240px; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
        </div>
    ` : '';

    const table = q.table ? `
        <table class="exam-table" style="margin: 12px 0;">
            <caption>${esc(q.table.caption)}</caption>
            <thead><tr>${q.table.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
            <tbody>${q.table.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
    ` : '';

    const rubrics = (q.rubric || []).map((r, i) => `
        <div style="background: rgba(30,41,59,0.7); border:1px solid rgba(148,163,184,0.2); border-radius:8px; padding:10px; margin-bottom:8px;">
            <div style="display:flex; justify-content:space-between; font-weight:bold; color:#f8fafc; font-size:0.95rem;">
                <span>Ölçüt ${i + 1}: ${esc(r.text)}</span>
                <span style="color:#2dd4bf;">${r.points} Puan</span>
            </div>
            ${r.return_card_ids ? `<div style="font-size:0.8rem; color:#94a3b8; margin-top:4px;">Eksiklikte önerilen kart: ${r.return_card_ids.join(', ')}</div>` : ''}
        </div>
    `).join('');

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px;">
            <span style="background:rgba(45,212,191,0.2); color:#2dd4bf; padding:3px 10px; border-radius:6px; font-weight:bold; font-size:0.85rem;">${esc(q.id)}</span>
            <span style="color:#cbd5e1; font-size:0.85rem;">${esc(q.outcome_id)} · ${names[q.difficulty] || ''} · Aile: ${esc(q.family_id)}</span>
            <span style="background:rgba(245,158,11,0.2); color:#f59e0b; padding:3px 10px; border-radius:6px; font-size:0.85rem; font-weight:bold;">10 Puan</span>
        </div>
        <h3 style="color:#fff; font-size:1.2rem; margin:0 0 10px 0;">${esc(q.title)}</h3>
        <p style="color:#cbd5e1; font-size:1rem; line-height:1.6; margin-bottom:10px;">${esc(q.stem)}</p>
        ${table}
        ${visual}
        <div style="background:rgba(56,189,248,0.1); border-left:3px solid #38bdf8; padding:8px 12px; margin:12px 0; border-radius:0 8px 8px 0;">
            <strong style="color:#38bdf8; font-size:0.85rem;"><i class="fas fa-lightbulb"></i> İpucu:</strong>
            <span style="color:#cbd5e1; font-size:0.85rem;"> ${esc(q.hint)}</span>
        </div>
        <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:10px; padding:12px; margin:12px 0;">
            <h4 style="color:#34d399; margin:0 0 6px 0; font-size:0.95rem;"><i class="fas fa-check-circle"></i> Örnek Bilimsel Cevap</h4>
            <p style="color:#f8fafc; margin:0 0 8px 0; font-size:0.95rem;">${esc(q.sample_answer)}</p>
            <p style="color:#fef3c7; background:rgba(245,158,11,0.1); padding:6px 10px; border-radius:6px; font-size:0.8rem; margin:0;">
                <strong>Bilimsel Eşdeğerlik:</strong> ${esc(q.accepted_alternatives)}
            </p>
        </div>
        <div style="margin-top:14px;">
            <h4 style="color:#cbd5e1; font-size:0.95rem; margin-bottom:8px;"><i class="fas fa-list-ol"></i> Rubrik Kriterleri (Öz Değerlendirme Ölçütleri):</h4>
            ${rubrics}
        </div>
    `;
}

// --- İNTERAKTİF FİZİKSEL İŞ MODELİ (Kaldır / Tut / Yatay Taşı) ---
function setupMotion() {
    let mode = 'lift';
    let p = 0;
    let running = false;
    let startTime = 0;
    let startP = 0;

    const visual = $('exam-visual');
    if (!visual) return;

    visual.innerHTML = `
        <div class="exam-controls" aria-label="Hareket durumu">
            <button data-mode="lift" aria-pressed="true">Kaldır</button>
            <button data-mode="hold">Tut</button>
            <button data-mode="carry">Yatay Taşı</button>
        </div>
        <div id="motion-scene" style="width:100%; display:flex; justify-content:center;"></div>
        <label class="exam-range-label" for="motion-progress">
            <span>Hareket adımı</span>
            <output id="motion-number">0%</output>
        </label>
        <input type="range" class="exam-slider" id="motion-progress" min="0" max="100" value="0" step="1" aria-label="Hareket ilerleme kaydırıcısı">
        <div class="exam-controls">
            <button id="motion-play"><i class="fas fa-play"></i> Oynat</button>
            <button id="motion-reset"><i class="fas fa-undo"></i> Başa Al</button>
        </div>
        <div class="exam-status-box" id="motion-status" aria-live="polite"></div>
        <p class="exam-caption">Yalnız elin yukarı kuvveti incelenir. Yatay taşımada yükseklik ve hız sabit, sallanma yok. Hareket süresi temsili; kütle veya ivme hesabı yapılmaz.</p>
    `;

    function draw() {
        const x = mode === 'carry' ? 70 + 280 * p : 150;
        const y = mode === 'lift' ? 210 - 110 * p : mode === 'hold' ? 100 : 175;
        const label = mode === 'hold'
            ? DATA.interactives.motion.hold
            : p === 0
                ? DATA.interactives.motion.start
                : mode === 'lift'
                    ? DATA.interactives.motion.lift
                    : DATA.interactives.motion.carry;

        const movement = p === 0 ? '' : mode === 'lift'
            ? arrow(380, 250, 380, 250 - 150 * p, '#c7781e')
            : mode === 'carry'
                ? arrow(70, 285, 70 + 330 * p, 285, '#c7781e')
                : '';

        const sceneEl = $('motion-scene');
        if (sceneEl) {
            sceneEl.innerHTML = `
                <svg viewBox="0 0 480 340" role="img" aria-label="${label}. Elin kuvveti yukarı." style="width:100%; max-width:480px; height:auto;">
                    ${defs}
                    <rect width="480" height="340" rx="16" fill="#0f172a"/>
                    <text x="20" y="36" fill="#f8fafc" font-size="20" font-weight="700">${label}</text>
                    <path d="M30 270H450" stroke="#334155" stroke-width="2"/>
                    <rect x="${x}" y="${y}" width="60" height="45" rx="6" fill="#d7a66e" stroke="#946e42" stroke-width="2"/>
                    ${arrow(x + 30, y - 4, x + 30, y - 64, '#087f82')}
                    <text x="20" y="322" font-size="18" font-weight="700" fill="#2dd4bf">Kuvvet: yukarı</text>
                    <text x="240" y="322" font-size="18" font-weight="700" fill="#f59e0b">Yer değiştirme</text>
                    ${movement}
                </svg>
            `;
        }

        const progressEl = $('motion-progress');
        const numberEl = $('motion-number');
        const statusEl = $('motion-status');
        if (progressEl) progressEl.value = Math.round(p * 100);
        if (numberEl) numberEl.textContent = Math.round(p * 100) + '%';
        if (statusEl) {
            statusEl.textContent = mode === 'hold'
                ? DATA.interactives.motion.hold_status
                : p === 0
                    ? DATA.interactives.motion.start_status
                    : mode === 'lift'
                        ? DATA.interactives.motion.lift_status
                        : DATA.interactives.motion.carry_status;
        }
    }

    function pause() {
        running = false;
        if (activeFrame !== null) {
            cancelAnimationFrame(activeFrame);
            activeFrame = null;
        }
        const playBtn = $('motion-play');
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i> Oynat';
    }

    visual.querySelectorAll('[data-mode]').forEach(btn => {
        btn.onclick = () => {
            pause();
            mode = btn.dataset.mode;
            p = 0;
            visual.querySelectorAll('[data-mode]').forEach(x => x.setAttribute('aria-pressed', String(x === btn)));
            draw();
        };
    });

    const progressInput = $('motion-progress');
    if (progressInput) {
        progressInput.oninput = e => {
            pause();
            p = Number(e.target.value) / 100;
            draw();
        };
    }

    const resetBtn = $('motion-reset');
    if (resetBtn) {
        resetBtn.onclick = () => {
            pause();
            p = 0;
            draw();
        };
    }

    const playBtn = $('motion-play');
    if (playBtn) {
        playBtn.onclick = () => {
            if (running) {
                pause();
                return;
            }
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                p = (p >= 1) ? 0 : 1;
                draw();
                return;
            }
            if (p >= 1) p = 0;
            running = true;
            startTime = performance.now();
            startP = p;
            playBtn.innerHTML = '<i class="fas fa-pause"></i> Duraklat';

            function step(t) {
                p = Math.min(1, startP + (t - startTime) / 2400);
                draw();
                if (p >= 1) {
                    pause();
                    return;
                }
                activeFrame = requestAnimationFrame(step);
            }
            activeFrame = requestAnimationFrame(step);
        };
    }

    activeAnimationCleanup = pause;
    draw();
}

// --- İNTERAKTİF KARŞILAŞTIRMA (force-compare & distance-compare) ---
function setupCompare(kind) {
    const isForce = (kind === 'force-compare');
    const visual = $('exam-visual');
    if (!visual) return;

    visual.innerHTML = `
        <div id="compare-scene" style="width:100%; display:flex; justify-content:center;"></div>
        <label class="exam-range-label" for="compare-value">
            <span>B denemesi: ${isForce ? 'Kuvvet' : 'Yer Değiştirme'}</span>
            <output id="compare-number"></output>
        </label>
        <input type="range" class="exam-slider" id="compare-value" min="${isForce ? 5 : 1}" max="${isForce ? 30 : 4}" step="${isForce ? 5 : 1}" value="${isForce ? 20 : 3}">
        <div class="exam-status-box" id="compare-status" aria-live="polite"></div>
        <p class="exam-caption">Sabit kuvvetler hareket yönündedir. Süre ve hız modellenmez. Oklar kendi büyüklükleri içinde ortak ölçeklidir.</p>
    `;

    function draw() {
        const valEl = $('compare-value');
        if (!valEl) return;
        const v = Number(valEl.value);
        const fa = 10;
        const fb = isForce ? v : 10;
        const da = isForce ? 2 : 1;
        const db = isForce ? 2 : v;

        const numEl = $('compare-number');
        if (numEl) numEl.textContent = v + (isForce ? ' N' : ' m');

        let rows = '';
        for (const [y, l, f, d] of [[60, 'A', fa, da], [210, 'B', fb, db]]) {
            rows += `
                <text x="20" y="${y}" font-size="22" font-weight="700" fill="#f8fafc">${l} denemesi</text>
                ${arrow(30, y + 40, 30 + f * 11, y + 40, '#087f82')}
                <text x="30" y="${y + 80}" font-size="20" font-weight="700" fill="#2dd4bf">${f} N</text>
                ${arrow(30, y + 112, 30 + d * 95, y + 112, '#c7781e')}
                <text x="355" y="${y + 115}" font-size="20" font-weight="700" fill="#f59e0b">${d} m</text>
            `;
        }

        const sceneEl = $('compare-scene');
        if (sceneEl) {
            sceneEl.innerHTML = `
                <svg viewBox="0 0 480 365" role="img" aria-label="A: ${fa} N ve ${da} m. B: ${fb} N ve ${db} m." style="width:100%; max-width:480px; height:auto;">
                    ${defs}
                    <rect width="480" height="365" rx="16" fill="#0f172a"/>
                    ${rows}
                </svg>
            `;
        }

        const a = fa * da;
        const b = fb * db;
        const statusEl = $('compare-status');
        if (statusEl) {
            statusEl.textContent = (b === a
                ? DATA.interactives.comparison.equal
                : b > a
                    ? DATA.interactives.comparison.b_more
                    : DATA.interactives.comparison.a_more) + ' ' + (isForce
                ? DATA.interactives.comparison.force_hint
                : DATA.interactives.comparison.distance_hint);
        }
    }

    const valInput = $('compare-value');
    if (valInput) valInput.oninput = draw;
    draw();
}

// --- İNTERAKTİF ÖĞRETİM SEKMELERİ (mission-tools, debris-strategies, cosmic-levels) ---
function setupLearning(kind) {
    const groups = DATA.interactives?.study;
    if (!groups) return;
    const items = groups[kind];
    const visual = $('exam-visual');
    if (!visual || !items) return;

    const imgTag = visual.querySelector('img');
    const imageHtml = imgTag ? imgTag.outerHTML : '';

    visual.innerHTML = `
        ${imageHtml}
        <div class="exam-controls" id="learn-controls"></div>
        <div class="exam-status-box" id="learn-status" aria-live="polite"></div>
        <p class="exam-caption">Şematik öğretim gösterimi. Gerçek ölçek veya yörünge dinamiği modeli değildir.</p>
    `;

    const row = $('learn-controls');
    if (row) {
        items.forEach((item, idx) => {
            const b = document.createElement('button');
            b.textContent = item[0];
            b.setAttribute('aria-pressed', String(idx === 0));
            b.onclick = () => {
                row.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
                const st = $('learn-status');
                if (st) st.textContent = item[1];
            };
            row.appendChild(b);
        });
    }

    const statusEl = $('learn-status');
    if (statusEl && items[0]) statusEl.textContent = items[0][1];
}

// --- SENARYO SORU SEÇİMİ VE GEÇMİŞ YÖNETİMİ ---
export function selectQuestions(profileName, history, run = 0) {
    const conf = profiles[profileName];
    if (!conf) throw new Error('Geçersiz profil: ' + profileName);

    const quota = conf.cycles ? conf.cycles[run % conf.cycles.length] : conf.allocation;
    const result = [];
    const updates = [];
    const now = Date.now();
    let repeats = 0;

    const slots = [];
    for (const allocation of DATA.scenario.allocation) {
        for (const diff of ['easy', 'medium', 'hard']) {
            const pool = QUESTIONS.filter(q => q.outcome_id === allocation.outcome_id && q.difficulty === diff)
                .map(q => ({ q, count: history[q.id]?.count || 0, last: history[q.id]?.last || 0, tie: Math.random() }))
                .sort((a,b) => a.count - b.count || a.last - b.last || a.tie - b.tie).map(x => x.q);
            for (let i = 0; i < quota[allocation.outcome_id][diff]; i++) slots.push(pool);
        }
    }
    const compatible = q => result.every(other => other.id !== q.id &&
        (!q.family_id || q.family_id !== other.family_id) &&
        !(q.incompatible_with || []).includes(other.id) && !(other.incompatible_with || []).includes(q.id));
    function choose(index) {
        if (index === slots.length) return result.length === 7;
        for (const q of slots[index]) {
            if (!compatible(q)) continue;
            result.push(q);
            if (choose(index + 1)) return true;
            result.pop();
        }
        return false;
    }
    if (!choose(0)) throw new Error('Yasak çiftler ve senaryo kotalarıyla uyumlu tam set bulunamadı. Mevcut çalışma korundu.');
    for (const q of result) {
        const h = history[q.id] || {count:0,last:0};
        if (h.count) repeats++;
        history[q.id] = {count:h.count+1,last:now};
    }

    // Soruları rastgele sırala (Fisher-Yates)
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return {
        questions: result,
        repeats,
        cycle: conf.cycles ? (run % conf.cycles.length) : null
    };
}

// --- YAŞAM DÖNGÜSÜ (Lifecycle API) ---
export async function openExamView(options = {}) {
    const ok = await loadData();
    if (!ok) return;

    if (!isInitialized) {
        isInitialized = true;
        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) stopAnimation();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const printModal = $('exam-print-preview-modal');
                    if (printModal && printModal.classList.contains('is-open')) {
                        e.preventDefault();
                        closePrintPreview();
                        return;
                    }
                    const studyView = $('exam-view-study');
                    if (studyView && studyView.classList.contains('fullscreen-study-active')) {
                        exitStudyFullscreen();
                    }
                    return;
                }

                // Ders çalışma ekranında klavye ile önceki/sonraki kart geçişi (input/textarea odağı yokken)
                const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
                if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

                if (state.step === 'study') {
                    if (e.key === 'ArrowRight') {
                        const nextBtn = $('exam-card-next');
                        if (nextBtn && !nextBtn.disabled) {
                            e.preventDefault();
                            nextBtn.click();
                        }
                    } else if (e.key === 'ArrowLeft') {
                        const prevBtn = $('exam-card-prev');
                        if (prevBtn && !prevBtn.disabled) {
                            e.preventDefault();
                            prevBtn.click();
                        }
                    }
                }
            });
            ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
                document.addEventListener(evt, () => {
                    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
                    if (!isFs) {
                        exitStudyFullscreen();
                    }
                });
            });

            document.addEventListener('click', (e) => {
                const picker = $('practice-q-picker-dropdown');
                const btn = $('btn-practice-q-picker');
                if (picker && !picker.classList.contains('is-hidden')) {
                    if (!picker.contains(e.target) && (!btn || !btn.contains(e.target))) {
                        picker.classList.add('is-hidden');
                        if (btn) {
                            btn.classList.remove('active');
                            btn.setAttribute('aria-expanded', 'false');
                        }
                    }
                }
            });

            window.addEventListener('orientationchange', () => {
                applyStudyPlanState();
            });
            window.addEventListener('resize', () => {
                applyStudyPlanState();
            });
        }
    }

    saveState();
    // İlk kez gelen veya seçimini sıfırlayan kullanıcı önce kapsamı ('scope') görür.
    // Kapsam seçimini yapmış kullanıcı doğrudan 2 seçenekli Hazırlık Ekranına ('choice') gelir.
    const initialStep = state.hasSelectedScope ? 'choice' : 'scope';
    if (options.route) restoreExamRoute(options.route);
    else goToStep(initialStep, { replace: true });
}

export function closeExamView() {
    saveProgress();
    stopAnimation();
    closePrintPreview();
    exitStudyFullscreen();
}

// Global Window Erişimi
if (typeof window !== 'undefined') {
    window.FenUpExam = {
        openExamView,
        getRoute,
        saveProgress,
        closeExamView,
        goToStep,
        renderStudy,
        renderAdminQuestionReview,
        openPrintPreview,
        closePrintPreview,
        downloadExamPdf,
        calculateQuestionPoints,
        distributeCriteriaPoints,
        ensureAttemptCriteriaMap,
        getQuestionScore,
        reEvaluateWithCriteria,
        getPartialScore,
        SCORING_POLICY,
        toggleStudyPlan,
        applyStudyPlanState,
        toggleStudyFullscreen,
        enterStudyFullscreen,
        exitStudyFullscreen
    };
}

// Sayfa ilk yüklendiğinde kapsam butonunu bağla ve veriyi arka planda önceden getir
if (typeof document !== 'undefined') {
    const initEngine = () => {
        bindScopeContinue();
        loadData();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEngine);
    } else {
        initEngine();
    }
}
