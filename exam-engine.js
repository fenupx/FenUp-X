/**
 * ============================================================================
 * FENUP X — YAZILIYA HAZIRLIK / 7. SINIF SENARYO 2 PİLOT MOTORU (exam-engine.js)
 * Bağımsız SPA Modül Motoru, Pardus ETAP Dokunmatik Zırhı ve Öğrenci Akışı:
 * Senaryo Seçimi → Tercih → Konu Çalışma / Prova → Öz Değerlendirme → Özet
 * ============================================================================
 */

'use strict';

const DATA_URL = 'data/exam/pilot_7_senaryo2.json';
const ASSET_BASE = 'data/exam/';
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
    returnToSummary: false
};

let currentProfile = 'dengeli';
let currentSolveMode = 'ekranda'; // 'ekranda' | 'kagitta'
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
                state.returnToSummary = !!parsed.returnToSummary;

                if (parsed.attempt && Array.isArray(parsed.attempt.ids)) {
                    state.attempt = {
                        ids: parsed.attempt.ids,
                        profile: parsed.attempt.profile || 'dengeli',
                        repeats: parsed.attempt.repeats || 0,
                        solveMode: parsed.attempt.solveMode || 'ekranda',
                        activeQuestionIndex: parsed.attempt.activeQuestionIndex || 0,
                        evalQuestionIndex: parsed.attempt.evalQuestionIndex || 0,
                        answers: parsed.attempt.answers || {},
                        evaluations: parsed.attempt.evaluations || {},
                        revealed: parsed.attempt.revealed || {},
                        finished: !!parsed.attempt.finished,
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

// --- VERİ YÜKLEME ---
let dataPromise = null;
async function loadData() {
    if (DATA) return true;
    if (dataPromise) return dataPromise;
    dataPromise = (async () => {
        try {
            const res = await fetch(DATA_URL);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            DATA = await res.json();
            CARDS = DATA.cards || [];
            QUESTIONS = DATA.questions || [];
            profiles = DATA.selection_policy?.scenario_profiles || {};
            return true;
        } catch (err) {
            console.error('Yazılı verisi yüklenemedi:', err);
            dataPromise = null;
            const container = $('scene-yazili');
            if (container) {
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
    })();
    return dataPromise;
}

// --- AKIŞ MOTORU (State Machine): Senaryo Seçimi → Tercih → Konu/Prova → Değerlendirme → Özet ---
export function goToStep(step) {
    stopAnimation();
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
        if (views[key]) {
            views[key].style.display = (key === step) ? 'block' : 'none';
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
        sceneYazili.scrollTop = 0;
    }
    if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function bindScopeContinue() {
    const btnContinue = $('btn-scope-continue');
    if (!btnContinue) return;
    btnContinue.onclick = async () => {
        if (!DATA) {
            const origHtml = btnContinue.innerHTML;
            btnContinue.disabled = true;
            btnContinue.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Hazırlanıyor...';
            const ok = await loadData();
            btnContinue.disabled = false;
            btnContinue.innerHTML = origHtml;
            if (!ok) return;
        }
        goToStep('choice');
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
        btnBack.onclick = () => goToStep('scope');
    }

    const btnStudy = $('btn-choice-go-study');
    if (btnStudy) {
        btnStudy.onclick = () => {
            state.returnToSummary = false;
            goToStep('study');
        };
    }

    const btnPractice = $('btn-choice-go-practice');
    if (btnPractice) {
        btnPractice.onclick = () => goToStep('practice');
    }

    // Dinamik konu ve soru sayaçları
    const studyCountEl = $('choice-study-count');
    if (studyCountEl && DATA) {
        const topicCount = DATA.outcomes ? DATA.outcomes.length : 4;
        const cardCount = CARDS.length || 24;
        studyCountEl.innerHTML = `<i class="fas fa-clone"></i> ${topicCount} konu · ${cardCount} bilgi kartı`;
    }

    const practiceCountEl = $('choice-practice-count');
    if (practiceCountEl && DATA) {
        let qCount = 7;
        const sp = DATA.selection_policy?.scenario_profiles?.temel?.allocation;
        if (sp) {
            qCount = Object.values(sp).reduce((total, diffMap) => {
                return total + (diffMap.easy || 0) + (diffMap.medium || 0) + (diffMap.hard || 0);
            }, 0);
        }
        practiceCountEl.innerHTML = `<i class="fas fa-pen-alt"></i> ${qCount} soruluk prova`;
    }
}

// 3a. AŞAMA: KONU ÇALIŞMA EKRANI (24 Kart & İnteraktif Deneyler)
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

    // Üst Araç Çubuğu
    const btnBackChoice = $('btn-study-back-choice');
    if (btnBackChoice) btnBackChoice.onclick = () => goToStep('choice');

    const btnJumpPractice = $('btn-study-jump-practice');
    if (btnJumpPractice) btnJumpPractice.onclick = () => goToStep('practice');

    const returnSummaryBox = $('study-return-to-summary-box');
    const btnReturnSummary = $('btn-study-return-summary');
    if (returnSummaryBox && btnReturnSummary) {
        if (state.returnToSummary) {
            returnSummaryBox.style.display = 'block';
            btnReturnSummary.onclick = () => {
                state.returnToSummary = false;
                saveState();
                goToStep('summary');
            };
        } else {
            returnSummaryBox.style.display = 'none';
        }
    }

    // Sol Liste (Cardnav)
    const cardnav = $('exam-cardnav');
    if (cardnav && DATA.outcomes) {
        cardnav.innerHTML = `
            <label class="exam-cardnav-label" for="exam-outcome-select">Çalışılacak Konu:</label>
            <select id="exam-outcome-select" class="exam-select">
                ${DATA.outcomes.map(o => `<option value="${esc(o.id)}" ${o.id === c.outcome_id ? 'selected' : ''}>${esc(o.short_title)}</option>`).join('')}
            </select>
            <div class="exam-cardnav-list">
                ${CARDS.map((x, j) => {
                    if (x.outcome_id !== c.outcome_id) return '';
                    const num = String(Number(x.id.split('-K')[1] || 1)).padStart(2, '0');
                    const isCurrent = (j === cardIndex);
                    const isVisited = state.attempt?.visitedCards?.includes(x.id);
                    return `
                        <button class="exam-cardnav-btn ${isCurrent ? 'active' : ''} ${isVisited ? 'visited' : ''}" data-card-idx="${j}" aria-pressed="${isCurrent}">
                            <b>${num}</b>
                            <span>${esc(x.title)}</span>
                            ${isVisited ? '<i class="fas fa-check cardnav-check" title="İncelendi"></i>' : ''}
                        </button>
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

        cardnav.querySelectorAll('[data-card-idx]').forEach(btn => {
            btn.onclick = () => renderStudy(Number(btn.dataset.cardIdx));
        });
    }

    // Sağ Panel (Aktif Konu Kartı)
    const cardPanel = $('exam-card-article');
    if (cardPanel) {
        const visualAssetPath = c.visual?.asset ? (ASSET_BASE + c.visual.asset) : '';
        const isLastCard = (cardIndex === CARDS.length - 1);

        cardPanel.innerHTML = `
            <div class="exam-card-eyebrow">${esc(c.eyebrow || 'Konu Kartı')} · ${cardIndex + 1} / ${CARDS.length}</div>
            <h2 class="exam-card-title">${esc(c.title)}</h2>
            <div class="exam-contentgrid">
                <div>
                    <p class="exam-lead">${esc(c.lead)}</p>
                    ${(c.body || []).map(p => `<p class="exam-body-p">${esc(p)}</p>`).join('')}
                    <div class="exam-takeaway"><strong>📌 Aklında Kalsın:</strong> ${esc(c.takeaway)}</div>
                    <p class="exam-warning"><strong>⚠️ Karıştırma:</strong> ${esc(c.misconception)}</p>
                </div>
                <div class="exam-visualbox" id="exam-visual">
                    ${visualAssetPath ? `<img src="${esc(visualAssetPath)}" alt="${esc(c.visual?.alt || '')}">` : ''}
                    <p class="exam-caption">Şematik öğretim modeli; ölçekli değildir.</p>
                </div>
            </div>
            <div class="exam-check">
                <strong>Kendini kontrol et</strong>
                <p class="exam-body-p">${esc(c.check?.prompt || '')}</p>
                <details>
                    <summary><i class="fas fa-eye" style="margin-right:8px;"></i> Örnek açıklamayı gör</summary>
                    <p class="exam-body-p" style="color:#f1f5f9; padding-top:10px;">${esc(c.check?.answer || '')}</p>
                </details>
            </div>
            <div class="exam-next-bar">
                <button id="exam-card-prev" ${cardIndex === 0 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> Önceki Kart</button>
                <button id="exam-card-next" class="exam-btn-primary">${isLastCard ? 'Yazılı Provasına Geç <i class="fas fa-arrow-right"></i>' : 'Sonraki Kart <i class="fas fa-chevron-right"></i>'}</button>
            </div>
            <div class="exam-sources">Kaynak dayanağı: ${sourcesHtml(c.source_refs)}</div>
        `;

        const prevBtn = $('exam-card-prev');
        const nextBtn = $('exam-card-next');
        if (prevBtn) prevBtn.onclick = () => renderStudy(cardIndex - 1);
        if (nextBtn) {
            nextBtn.onclick = () => {
                if (isLastCard) goToStep('practice');
                else renderStudy(cardIndex + 1);
            };
        }

        // İnteraktif bileşenler
        const interId = c.visual?.interactive_id;
        if (interId === 'lift-hold-carry') setupMotion();
        if (interId === 'force-compare' || interId === 'distance-compare') setupCompare(interId);
        if (['mission-tools', 'debris-strategies', 'cosmic-levels'].includes(interId)) setupLearning(interId);
    }
}

// 3b. AŞAMA: YAZILI PROVASI EKRANI (Kurulum & Tek Soru Akışı)
function renderPractice() {
    const setupBox = $('practice-setup-box');
    const activeBox = $('practice-active-box');

    // Eğer aktif bir sınav oturumu yoksa veya bitmiş bir oturum varsa ve yeni soru seti seçilmemişse kurulumu göster
    if (!state.attempt) {
        if (setupBox) setupBox.style.display = 'block';
        if (activeBox) activeBox.style.display = 'none';

        const btnBackChoice = $('btn-practice-back-choice');
        if (btnBackChoice) btnBackChoice.onclick = () => goToStep('choice');

        // Çözüm Modu Butonları (Ekranda / Kâğıtta)
        const btnModeScreen = $('btn-mode-screen');
        const btnModePaper = $('btn-mode-paper');
        if (btnModeScreen && btnModePaper) {
            btnModeScreen.onclick = () => {
                currentSolveMode = 'ekranda';
                btnModeScreen.classList.add('active');
                btnModePaper.classList.remove('active');
            };
            btnModePaper.onclick = () => {
                currentSolveMode = 'kagitta';
                btnModePaper.classList.add('active');
                btnModeScreen.classList.remove('active');
            };
        }

        // Seviye Profili Butonları
        document.querySelectorAll('[data-exam-profile]').forEach(btn => {
            btn.onclick = () => {
                currentProfile = btn.dataset.examProfile;
                document.querySelectorAll('[data-exam-profile]').forEach(x => {
                    const isActive = (x === btn);
                    x.setAttribute('aria-pressed', String(isActive));
                    x.classList.toggle('active', isActive);
                });
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

    let activeIdx = typeof a.activeQuestionIndex === 'number' ? a.activeQuestionIndex : 0;
    if (activeIdx < 0) activeIdx = 0;
    if (activeIdx > 6) activeIdx = 6;
    a.activeQuestionIndex = activeIdx;

    // Üst Bar Durum Bilgileri
    const currInd = $('practice-current-indicator');
    if (currInd) currInd.textContent = `Soru ${activeIdx + 1} / 7`;

    const modeInd = $('practice-mode-indicator');
    if (modeInd) {
        modeInd.innerHTML = (a.solveMode === 'kagitta')
            ? '<i class="fas fa-print"></i> Kâğıtta Çözüm'
            : '<i class="fas fa-laptop"></i> Ekranda Çözüm';
    }

    // 1-7 Soru Gezinme Butonları (Nav Strip)
    const navStrip = $('practice-question-nav-strip');
    if (navStrip) {
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
                a.activeQuestionIndex = Number(btn.dataset.navQ);
                saveState();
                renderPractice();
            };
        });
    }

    // Yazdır / PDF Butonu
    const btnPrint = $('btn-practice-print-pdf');
    if (btnPrint) {
        btnPrint.onclick = () => printExam();
    }

    // Tek Soru Konteyneri: PROVADA RUBRİK, İPUCU VEYA CEVAP KESİNLİKLE GÖSTERİLMEZ!
    const q = questions[activeIdx];
    const qContainer = $('practice-single-question-container');
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
                </div>
                <h3 class="exam-qtitle">${esc(q.title)}</h3>
                <div class="exam-qgrid ${visual ? '' : 'noimage'}">
                    <div>
                        <p class="exam-body-p">${esc(q.stem)}</p>
                        ${table}
                    </div>
                    ${visual}
                </div>

                ${a.solveMode === 'kagitta' ? `
                    <div class="exam-paper-note">
                        <i class="fas fa-pencil-alt"></i> Bu provayı kâğıt üzerinde çözmeyi seçtin. İstersen aşağıya kısa notlar veya ara işlemler alabilirsin:
                    </div>
                ` : ''}

                <label class="exam-answer-label" for="practice-text-ans">
                    ${a.solveMode === 'kagitta' ? 'Kişisel Notların (İsteğe bağlı):' : 'Cevabın ve Fen Bilimsel Gerekçen:'}
                </label>
                <textarea id="practice-text-ans" class="exam-textarea" placeholder="${a.solveMode === 'kagitta' ? 'İsteğe bağlı ara işlem veya notların...' : 'Gerekçeli bilimsel cevabını buraya yaz...'}">${esc(existingAnswer)}</textarea>
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

    // Alt Gezinme Butonları
    const btnPrev = $('btn-practice-prev-q');
    if (btnPrev) {
        btnPrev.disabled = (activeIdx === 0);
        btnPrev.onclick = () => {
            if (activeIdx > 0) {
                a.activeQuestionIndex = activeIdx - 1;
                saveState();
                renderPractice();
            }
        };
    }

    const btnNext = $('btn-practice-next-q');
    if (btnNext) {
        btnNext.disabled = (activeIdx === 6);
        btnNext.onclick = () => {
            if (activeIdx < 6) {
                a.activeQuestionIndex = activeIdx + 1;
                saveState();
                renderPractice();
            }
        };
    }

    updateAnsweredCountText(questions);

    // Provayı Bitir ve Öz Değerlendirmeye Geç
    const btnFinish = $('btn-practice-finish');
    if (btnFinish) {
        btnFinish.onclick = () => {
            const emptyIndices = [];
            questions.forEach((qu, i) => {
                if (!(a.answers[qu.id] || '').trim()) {
                    emptyIndices.push(i + 1);
                }
            });

            if (emptyIndices.length > 0 && a.solveMode === 'ekranda') {
                const proceed = confirm(`Henüz yanıtlamadığın soru(lar) bulunuyor: Soru ${emptyIndices.join(', ')}.\n\nYine de provayı bitirip öz değerlendirmeye geçmek istiyor musun?`);
                if (!proceed) return;
            }

            a.evalQuestionIndex = 0;
            saveState();
            goToStep('eval');
        };
    }
}

function updateAnsweredCountText(questions) {
    const answeredCountEl = $('practice-answered-count-text');
    if (answeredCountEl && state.attempt) {
        const answeredCount = questions.filter(q => (state.attempt.answers[q.id] || '').trim().length > 0).length;
        answeredCountEl.textContent = `${answeredCount} / 7 Yanıtlandı`;
    }
}

function startNewPractice() {
    try {
        state.profileRuns = state.profileRuns || {};
        const run = state.profileRuns[currentProfile] || 0;
        const chosen = selectQuestions(currentProfile, state.history, run);
        state.profileRuns[currentProfile] = run + 1;
        state.attempt = {
            ids: chosen.questions.map(q => q.id),
            profile: currentProfile,
            repeats: chosen.repeats,
            solveMode: currentSolveMode,
            activeQuestionIndex: 0,
            evalQuestionIndex: 0,
            answers: {},
            evaluations: {},
            revealed: {},
            finished: false,
            visitedCards: []
        };
        saveState();
        renderPractice();
    } catch (err) {
        alert(err.message);
    }
}

// 4. AŞAMA: ÖZ DEĞERLENDİRME EKRANI (Tek Soru & 3 Seçenek: Tam / Kısmen / Yapamadım)
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

    let evalIdx = typeof a.evalQuestionIndex === 'number' ? a.evalQuestionIndex : 0;
    if (evalIdx < 0) evalIdx = 0;
    if (evalIdx > 6) evalIdx = 6;
    a.evalQuestionIndex = evalIdx;

    // 1-7 Soru Gezinme Butonları (Eval Strip)
    const navStrip = $('eval-question-nav-strip');
    if (navStrip) {
        navStrip.innerHTML = questions.map((q, i) => {
            const ev = a.evaluations[q.id];
            const isCurrent = (i === evalIdx);
            return `
                <button type="button" class="q-nav-btn ${isCurrent ? 'active' : ''} ${ev ? 'eval-' + ev : ''}" data-eval-q="${i}" title="Soru ${i + 1}">
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
        const currentEval = a.evaluations[q.id] || '';

        const rubricsList = (q.rubric || []).map((r, i) => `
            <li><strong>Ölçüt ${i + 1}:</strong> ${esc(r.text)}</li>
        `).join('');

        qContainer.innerHTML = `
            <article class="exam-question-item eval-card">
                <div class="exam-qmeta">
                    <span>SORU ${evalIdx + 1} / 7</span> · 
                    <span>${esc(q.outcome_id)}</span> · 
                    <span>${names[q.difficulty] || ''}</span>
                </div>
                <h3 class="exam-qtitle">${esc(q.title)}</h3>
                <div class="exam-qgrid ${visual ? '' : 'noimage'}">
                    <div>
                        <p class="exam-body-p">${esc(q.stem)}</p>
                        ${table}
                    </div>
                    ${visual}
                </div>

                <!-- Öğrencinin Kendi Cevabı -->
                <div class="eval-student-answer-box">
                    <h4><i class="fas fa-pencil-alt"></i> Senin Verdiğin Cevap:</h4>
                    <div class="student-answer-content">
                        ${studentAns ? esc(studentAns) : '<em>(Bu soru için ekrana yazılı cevap girilmedi veya kâğıt üzerinde çözüldü.)</em>'}
                    </div>
                </div>

                <!-- Örnek Bilimsel Açıklama ve Rubrik -->
                <div class="eval-sample-answer-box">
                    <h4><i class="fas fa-check-circle" style="color: #2dd4bf;"></i> Örnek Bilimsel Açıklama:</h4>
                    <p class="sample-answer-text">${esc(q.sample_answer)}</p>
                    <div class="eval-alt-note">
                        <strong>Bilimsel Eşdeğerlik:</strong> ${esc(q.accepted_alternatives)}
                    </div>
                    <div class="eval-rubric-summary">
                        <strong>Başarı Ölçütleri:</strong>
                        <ul>${rubricsList}</ul>
                    </div>
                </div>

                <!-- 3 Net Öz Değerlendirme Seçeneği -->
                <div class="eval-choice-section">
                    <label class="eval-choice-title">Kendi cevabını değerlendir ve sana en uygun olanı seç:</label>
                    <div class="eval-choices-grid">
                        <button type="button" class="eval-choice-btn tam ${currentEval === 'tam' ? 'selected' : ''}" data-eval-opt="tam">
                            <div class="eval-opt-icon"><i class="fas fa-check-circle"></i></div>
                            <div class="eval-opt-body">
                                <strong>Tam Yaptım</strong>
                                <small>Tüm bilimsel ölçütleri ve fen gerekçesini eksiksiz açıkladım.</small>
                            </div>
                        </button>
                        <button type="button" class="eval-choice-btn kismen ${currentEval === 'kismen' ? 'selected' : ''}" data-eval-opt="kismen">
                            <div class="eval-opt-icon"><i class="fas fa-adjust"></i></div>
                            <div class="eval-opt-body">
                                <strong>Kısmen Yaptım</strong>
                                <small>Temel kavramı belirttim fakat bazı gerekçeler veya ölçütler eksik kaldı.</small>
                            </div>
                        </button>
                        <button type="button" class="eval-choice-btn yapamadim ${currentEval === 'yapamadim' ? 'selected' : ''}" data-eval-opt="yapamadim">
                            <div class="eval-opt-icon"><i class="fas fa-times-circle"></i></div>
                            <div class="eval-opt-body">
                                <strong>Yapamadım</strong>
                                <small>Gerekçeyi açıklayamadım, yanlış yaptım veya soruyu boş bıraktım.</small>
                            </div>
                        </button>
                    </div>
                </div>
            </article>
        `;

        // Seçenek tıklama olayları
        qContainer.querySelectorAll('[data-eval-opt]').forEach(btn => {
            btn.onclick = () => {
                const optVal = btn.dataset.evalOpt;
                a.evaluations[q.id] = optVal;
                saveState();
                renderEval();
            };
        });
    }

    // İlerleme Metni
    const evaluatedCount = questions.filter(qu => !!a.evaluations[qu.id]).length;
    const progressEl = $('eval-progress-text');
    if (progressEl) progressEl.textContent = `${evaluatedCount} / 7 Değerlendirildi`;

    // Alt Gezinme Butonları
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
    if (btnNext) {
        btnNext.disabled = (evalIdx === 6);
        btnNext.onclick = () => {
            if (evalIdx < 6) {
                a.evalQuestionIndex = evalIdx + 1;
                saveState();
                renderEval();
            }
        };
    }

    // Çalışma Özetimi Gör Butonu
    const btnToSummary = $('btn-eval-to-summary');
    if (btnToSummary) {
        btnToSummary.onclick = () => {
            const missing = [];
            questions.forEach((qu, i) => {
                if (!a.evaluations[qu.id]) {
                    missing.push(i + 1);
                }
            });

            if (missing.length > 0) {
                alert(`Lütfen tüm sorular için öz değerlendirmeni tamamla.\nHenüz değerlendirilmeyen: Soru ${missing.join(', ')}`);
                return;
            }

            a.finished = true;
            saveState();
            goToStep('summary');
        };
    }
}

// 5. AŞAMA: ÇALIŞMA ÖZETİ EKRANI (Skor, Konu Analizi & Eksiklerimi Çalış)
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

    // Puan ve Başarı Dağılımı Hesaplama (Veri uyumluluğu için a.score hesaplanır)
    let totalScore = 0;
    let tamCount = 0;
    let kismenCount = 0;
    let yapamadimCount = 0;

    questions.forEach(q => {
        const ev = a.evaluations[q.id];
        if (ev === 'tam') {
            totalScore += 10;
            tamCount++;
        } else if (ev === 'kismen') {
            totalScore += 5;
            kismenCount++;
        } else {
            yapamadimCount++;
        }
    });

    a.score = totalScore;
    saveState();

    const tamEl = $('summary-tam-count');
    if (tamEl) tamEl.textContent = tamCount;
    const kismenEl = $('summary-kismen-count');
    if (kismenEl) kismenEl.textContent = kismenCount;
    const yapamadimEl = $('summary-yapamadim-count');
    if (yapamadimEl) yapamadimEl.textContent = yapamadimCount;

    const scoreDisplay = $('summary-score-display');
    if (scoreDisplay) scoreDisplay.textContent = `${totalScore} / 70`;

    // Konu Bazlı Başarı Analizi (Senaryo 2: FB.7.1.1, FB.7.1.3, FB.7.1.5, FB.7.2.1)
    const goodListEl = $('summary-good-topics-list');
    const needsReviewListEl = $('summary-needs-review-list');
    const returnCardIds = [];

    if (goodListEl && needsReviewListEl && DATA.outcomes) {
        goodListEl.innerHTML = '';
        needsReviewListEl.innerHTML = '';

        DATA.outcomes.forEach(outcome => {
            const outcomeQs = questions.filter(q => q.outcome_id === outcome.id);
            if (outcomeQs.length === 0) return;

            const isAllTam = outcomeQs.every(q => a.evaluations[q.id] === 'tam');

            if (isAllTam) {
                const item = document.createElement('div');
                item.className = 'analysis-item success';
                item.innerHTML = `
                    <div class="analysis-item-head">
                        <span class="outcome-tag">${esc(outcome.id)}</span>
                        <strong>${esc(outcome.short_title)}</strong>
                    </div>
                    <p>${outcomeQs.length} sorunun tamamında tüm bilimsel ölçütler eksiksiz sağlandı.</p>
                `;
                goodListEl.appendChild(item);
            } else {
                const partialCount = outcomeQs.filter(q => a.evaluations[q.id] === 'kismen').length;
                const zeroCount = outcomeQs.filter(q => a.evaluations[q.id] === 'yapamadim').length;

                const item = document.createElement('div');
                item.className = 'analysis-item warning';
                item.innerHTML = `
                    <div class="analysis-item-head">
                        <span class="outcome-tag">${esc(outcome.id)}</span>
                        <strong>${esc(outcome.short_title)}</strong>
                    </div>
                    <p>
                        ${zeroCount > 0 ? `<strong>${zeroCount} soru yapılamadı.</strong> ` : ''}
                        ${partialCount > 0 ? `<span>${partialCount} soru kısmen açıklandı.</span>` : ''}
                    </p>
                `;
                needsReviewListEl.appendChild(item);
            }
        });

        if (goodListEl.children.length === 0) {
            goodListEl.innerHTML = '<p class="exam-body-note">Bu provada henüz tam başarı sağlanan konu bulunmuyor. Konu kartlarına dönerek çalışmanı pekiştirebilirsin.</p>';
        }
        if (needsReviewListEl.children.length === 0) {
            needsReviewListEl.innerHTML = '<p class="exam-body-note" style="color:#2dd4bf;"><i class="fas fa-star"></i> Tebrikler! Tüm konulardaki soruları tam başarıyla çözdün.</p>';
        }
    }

    // "Eksiklerimi Çalış": Yapamadım (Öncelikli) ve Kısmen olan soruların return_card_ids listesi
    const missedQuestions = questions.filter(q => a.evaluations[q.id] === 'yapamadim');
    const partialQuestions = questions.filter(q => a.evaluations[q.id] === 'kismen');

    [...missedQuestions, ...partialQuestions].forEach(q => {
        (q.rubric || []).forEach(r => {
            if (Array.isArray(r.return_card_ids)) {
                r.return_card_ids.forEach(cid => {
                    if (!returnCardIds.includes(cid)) {
                        returnCardIds.push(cid);
                    }
                });
            }
        });
    });

    const returnCardsContainer = $('summary-return-cards-container');
    const needsStudyBox = $('summary-needs-study-box');
    if (returnCardsContainer && needsStudyBox) {
        if (returnCardIds.length === 0) {
            needsStudyBox.style.display = 'none';
        } else {
            needsStudyBox.style.display = 'block';
            returnCardsContainer.innerHTML = returnCardIds.map(cid => {
                const card = CARDS.find(c => c.id === cid);
                if (!card) return '';
                return `
                    <button type="button" class="return-card-btn" data-return-card="${cid}">
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
    const btnReviewEval = $('btn-summary-review-eval');
    if (btnReviewEval) {
        btnReviewEval.onclick = () => {
            state.attempt.evalQuestionIndex = 0;
            saveState();
            goToStep('eval');
        };
    }

    const btnNewPractice = $('btn-summary-new-practice');
    if (btnNewPractice) {
        btnNewPractice.onclick = () => {
            const proceed = confirm('Yeni bir yazılı provası başlatmak istiyor musun? Geçmiş sorularınız korunacak ve yeni sorular seçilecektir.');
            if (proceed) {
                state.attempt = null;
                saveState();
                goToStep('practice');
            }
        };
    }

    const btnResetData = $('btn-summary-reset-data');
    if (btnResetData) {
        btnResetData.onclick = () => {
            const proceed = confirm('Bu cihazdaki tüm prova geçmişi ve çalışma verileri sıfırlanacaktır. Emin misin?');
            if (proceed) {
                state = {
                    history: {},
                    attempt: null,
                    profileRuns: {},
                    currentStep: 'scope',
                    studyCardIdx: 0,
                    returnToSummary: false
                };
                saveState();
                goToStep('scope');
            }
        };
    }
}

// --- YAZDIRMA VE KÂĞITTA ÇÖZÜM FORMATI (Print Sheet) ---
function printExam() {
    if (!state.attempt) return;
    const qs = state.attempt.ids.map(id => QUESTIONS.find(q => q.id === id)).filter(Boolean);
    const printEl = $('exam-print-sheet');
    if (!printEl) return;

    printEl.innerHTML = `
        <div class="print-header">
            <div class="print-brand-row">
                <img src="fenupx-logo.png" alt="FenUp X Logo" class="print-logo" width="48" height="48">
                <div class="print-title-group">
                    <h1 class="print-school-title">FenUp X — Fen Bilimleri Ortak Yazılı Sınavı</h1>
                    <h2 class="print-sub-title">7. Sınıf 1. Dönem 1. Yazılı Provası (MEB Senaryo 2)</h2>
                </div>
            </div>
            <div class="print-student-info-grid">
                <div class="print-info-item"><strong>Adı Soyadı:</strong> ..............................................................</div>
                <div class="print-info-item"><strong>Sınıfı / Şubesi:</strong> ....................</div>
                <div class="print-info-item"><strong>Okul No:</strong> ....................</div>
                <div class="print-info-item"><strong>Tarih:</strong> ....................</div>
            </div>
        </div>
        <div class="print-instructions">
            <strong>Yönerge:</strong> Bu sınav MEB Senaryo 2 kazanım dağılımına uygun 7 açık uçlu sorudan oluşmaktadır. Her soru 10 puandır. Toplam süre 40 dakikadır. Cevaplarınızı ve fen bilimsel gerekçelerinizi soruların altındaki çizgili alanlara açıkça yazınız. Başarılar dileriz.
        </div>
        <div class="print-questions-flow">
            ${qs.map((q, i) => {
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

                return `
                    <div class="print-question-block">
                        <div class="print-q-header">
                            <span class="print-q-num">SORU ${i + 1}</span>
                            <span class="print-q-meta">[${esc(q.outcome_id)} · 10 Puan]</span>
                        </div>
                        <div class="print-q-body">
                            <p class="print-q-stem">${esc(q.stem)}</p>
                            ${table}
                            ${visual}
                        </div>
                        <div class="print-answer-lines-container">
                            <span class="print-lines-label">Cevabınız ve Fen Bilimsel Gerekçeniz:</span>
                            <div class="print-ruled-lines">
                                <div class="print-line"></div>
                                <div class="print-line"></div>
                                <div class="print-line"></div>
                                <div class="print-line"></div>
                                <div class="print-line"></div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    window.print();
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
function selectQuestions(profileName, history, run = 0) {
    const conf = profiles[profileName];
    if (!conf) throw new Error('Geçersiz profil: ' + profileName);

    const quota = conf.cycles ? conf.cycles[run % conf.cycles.length] : conf.allocation;
    const result = [];
    const updates = [];
    const now = Date.now();
    let repeats = 0;

    for (const allocation of DATA.scenario.allocation) {
        const oid = allocation.outcome_id;
        for (const diff of ['easy', 'medium', 'hard']) {
            let n = quota[oid][diff];
            const candidates = QUESTIONS
                .filter(q => q.outcome_id === oid && q.difficulty === diff)
                .map(q => ({
                    q,
                    h: history[q.id] || { count: 0, last: 0 },
                    tie: Math.random()
                }))
                .sort((a, b) => a.h.count - b.h.count || a.h.last - b.h.last || a.tie - b.tie);

            for (const c of candidates) {
                if (!n) break;
                // Aynı provada family_id çakışmasını engelle
                if (result.some(q => q.family_id === c.q.family_id)) continue;
                result.push(c.q);
                if (c.h.count) repeats++;
                updates.push([c.q.id, { count: c.h.count + 1, last: now }]);
                n--;
            }
            if (n > 0) {
                throw new Error('Bu çıktının istenen düzeyinde yeterli uygun soru yok: ' + oid);
            }
        }
    }

    for (const [id, h] of updates) history[id] = h;

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
export async function openExamView() {
    const ok = await loadData();
    if (!ok) return;

    if (!isInitialized) {
        isInitialized = true;
        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) stopAnimation();
            });
        }
    }

    saveState();
    goToStep(state.currentStep || 'scope');
}

export function closeExamView() {
    stopAnimation();
}

// Global Window Erişimi
if (typeof window !== 'undefined') {
    window.FenUpExam = {
        openExamView,
        closeExamView,
        goToStep,
        renderStudy,
        renderAdminQuestionReview
    };
}

// Sayfa ilk yüklendiğinde kapsam butonunu bağla ve veriyi arka planda önceden getir
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            bindScopeContinue();
            loadData();
        });
    } else {
        bindScopeContinue();
        loadData();
    }
}
