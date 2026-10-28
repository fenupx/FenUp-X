/**
 * ============================================================================
 * FENUP X — YAZILIYA HAZIRLIK / 7. SINIF SENARYO 2 PİLOT MOTORU (exam-engine.js)
 * Bağımsız SPA Modül Motoru, Pardus ETAP Dokunmatik Zırhı ve Yaşam Döngüsü
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
    profileRuns: {}
};

let currentCard = 0;
let currentProfile = 'dengeli';
let currentTab = 'cards';
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

// LocalStorage Güvenli Yükleme
if (typeof localStorage !== 'undefined') {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed.history === 'object') {
                state = parsed;
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
async function loadData() {
    if (DATA) return true;
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
}

// --- GÖRÜNÜM GEÇİŞLERİ (Konu Kartları, 7 Soruluk Prova, Soru İnceleme) ---
function switchExamView(tabName) {
    stopAnimation();
    currentTab = tabName;

    const views = {
        cards: $('exam-cards-view'),
        practice: $('exam-practice-view'),
        review: $('exam-review-view')
    };

    const tabs = {
        cards: $('tab-exam-cards'),
        practice: $('tab-exam-practice'),
        review: $('tab-exam-review')
    };

    Object.keys(views).forEach(key => {
        if (views[key]) {
            views[key].style.display = (key === tabName) ? 'block' : 'none';
        }
        if (tabs[key]) {
            tabs[key].setAttribute('aria-pressed', String(key === tabName));
            tabs[key].classList.toggle('active', key === tabName);
        }
    });

    if (tabName === 'cards') renderCard(currentCard);
    if (tabName === 'practice') renderAttempt();
    if (tabName === 'review') renderReview();
}

// --- 1. KONU KARTLARI GÖRÜNÜMÜ ---
function renderCard(i) {
    stopAnimation();
    if (!CARDS || !CARDS[i]) return;
    currentCard = i;
    const c = CARDS[i];

    const cardnav = $('exam-cardnav');
    if (cardnav && DATA.outcomes) {
        cardnav.innerHTML = `
            <label class="exam-cardnav-label" for="exam-outcome-select">Çalışılacak Konu</label>
            <select id="exam-outcome-select" class="exam-select">
                ${DATA.outcomes.map(o => `<option value="${esc(o.id)}" ${o.id === c.outcome_id ? 'selected' : ''}>${esc(o.short_title)}</option>`).join('')}
            </select>
            ${CARDS.map((x, j) => {
                if (x.outcome_id !== c.outcome_id) return '';
                const num = String(Number(x.id.split('-K')[1] || 1)).padStart(2, '0');
                const isCurrent = j === i;
                return `<button class="exam-cardnav-btn ${isCurrent ? 'active' : ''}" data-card-idx="${j}" aria-pressed="${isCurrent}"><b>${num}</b><span>${esc(x.title)}</span></button>`;
            }).join('')}
        `;

        const outcomeSelect = $('exam-outcome-select');
        if (outcomeSelect) {
            outcomeSelect.onchange = e => {
                const targetIdx = CARDS.findIndex(card => card.outcome_id === e.target.value);
                if (targetIdx !== -1) renderCard(targetIdx);
            };
        }

        cardnav.querySelectorAll('[data-card-idx]').forEach(btn => {
            btn.onclick = () => renderCard(Number(btn.dataset.cardIdx));
        });
    }

    const cardPanel = $('exam-card-article');
    if (cardPanel) {
        const visualAssetPath = c.visual?.asset ? (ASSET_BASE + c.visual.asset) : '';
        const isLastCard = (i === CARDS.length - 1);

        cardPanel.innerHTML = `
            <div class="exam-card-eyebrow">${esc(c.eyebrow || 'Konu Kartı')}</div>
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
                <button id="exam-card-prev" ${i === 0 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i> Önceki Kart</button>
                <button id="exam-card-next" class="exam-btn-primary">${isLastCard ? 'Provaya Geç <i class="fas fa-arrow-right"></i>' : 'Sonraki Kart <i class="fas fa-chevron-right"></i>'}</button>
            </div>
            <div class="exam-sources">Kaynak dayanağı: ${sourcesHtml(c.source_refs)}</div>
        `;

        const prevBtn = $('exam-card-prev');
        const nextBtn = $('exam-card-next');
        if (prevBtn) prevBtn.onclick = () => renderCard(i - 1);
        if (nextBtn) {
            nextBtn.onclick = () => {
                if (isLastCard) switchExamView('practice');
                else renderCard(i + 1);
            };
        }

        // İnteraktif bileşenler
        const interId = c.visual?.interactive_id;
        if (interId === 'lift-hold-carry') setupMotion();
        if (interId === 'force-compare' || interId === 'distance-compare') setupCompare(interId);
        if (['mission-tools', 'debris-strategies', 'cosmic-levels'].includes(interId)) setupLearning(interId);
    }
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

// --- 2. YEDİ SORULUK PROVA VE ÖZ DEĞERLENDİRME ---
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

function qHtml(q, index, prefix, show = false) {
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

    const rubric = (q.rubric || []).map((r, i) => `
        <div class="exam-criterion-row">
            <label for="${prefix}-${q.id}-r${i}">${esc(r.text)} <strong>(${r.points} puan)</strong></label>
            <select id="${prefix}-${q.id}-r${i}" class="exam-criterion-select" data-rubric="${q.id}|${i}">
                <option value="">Değerlendir…</option>
                <option value="0">Yok · 0 puan</option>
                <option value="${r.points / 2}">Kısmen · ${r.points / 2} puan</option>
                <option value="${r.points}">Tam · ${r.points} puan</option>
            </select>
        </div>
    `).join('');

    return `
        <article class="exam-question-item" id="${prefix}-${q.id}">
            <div class="exam-qmeta">${prefix === 'review' ? esc(q.id) : 'SORU ' + (index + 1)} · ${esc(q.outcome_id)} · ${names[q.difficulty] || ''} · 10 PUAN</div>
            <h3 class="exam-qtitle">${esc(q.title)}</h3>
            <div class="exam-qgrid ${visual ? '' : 'noimage'}">
                <div>
                    <p class="exam-body-p">${esc(q.stem)}</p>
                    ${table}
                </div>
                ${visual}
            </div>
            <details style="margin: 12px 0;">
                <summary style="cursor:pointer; color:#38bdf8; font-weight:700;"><i class="fas fa-lightbulb" style="margin-right:6px;"></i> İpucu</summary>
                <p class="exam-body-p" style="padding-top:8px; color:#cbd5e1;">${esc(q.hint)}</p>
            </details>
            <label class="exam-answer-label" for="${prefix}-${q.id}-answer">
                Cevabın ve gerekçen <span style="font-size:0.85rem; color:#94a3b8; font-weight:normal;">(Kâğıda da çözebilirsin.)</span>
            </label>
            <textarea id="${prefix}-${q.id}-answer" class="exam-textarea" data-answer="${q.id}" placeholder="Sonucunu ve fen gerekçeni buraya yaz..."></textarea>
            <div class="exam-controls" style="margin-top:14px;">
                <button data-reveal="${q.id}"><i class="fas fa-check-circle"></i> Cevap ölçütlerini aç</button>
            </div>
            <section class="exam-solution-box ${show ? '' : 'is-hidden'}" id="${prefix}-${q.id}-solution" style="${show ? '' : 'display:none;'}">
                <h4>Örnek Bilimsel Açıklama</h4>
                <p class="exam-body-p" style="color:#f1f5f9;">${esc(q.sample_answer)}</p>
                <p class="exam-caption" style="text-align:left; color:#fef3c7; background:rgba(245,158,11,0.1); padding:8px 12px; border-radius:8px;">
                    <strong>Bilimsel Eşdeğerlik:</strong> ${esc(q.accepted_alternatives)} Kısmen seçilirse ölçüt puanının yarısı verilir. Bu bir öz değerlendirmedir.
                </p>
                ${rubric}
                <div class="exam-sources">Kaynak dayanağı: ${sourcesHtml(q.source_refs)}</div>
            </section>
        </article>
    `;
}

function bindQuestions(container, prefix) {
    if (!container) return;

    // Çözüm aç/kapa
    container.querySelectorAll('[data-reveal]').forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.reveal;
            const solEl = $(prefix + '-' + id + '-solution');
            if (!solEl) return;
            const isOpen = solEl.style.display !== 'none';
            solEl.style.display = isOpen ? 'none' : 'block';
            solEl.classList.toggle('is-hidden', isOpen);
            btn.innerHTML = isOpen
                ? '<i class="fas fa-check-circle"></i> Cevap ölçütlerini aç'
                : '<i class="fas fa-times-circle"></i> Cevap ölçütlerini kapat';

            if (prefix === 'attempt' && state.attempt) {
                state.attempt.revealed[id] = !isOpen;
                saveState();
            }
        };
    });

    if (prefix === 'attempt' && state.attempt) {
        // Cevap metinleri
        container.querySelectorAll('[data-answer]').forEach(textarea => {
            const id = textarea.dataset.answer;
            textarea.value = state.attempt.answers[id] || '';
            textarea.oninput = () => {
                state.attempt.answers[id] = textarea.value;
                saveState();
            };
        });

        // Rubrik skorları
        container.querySelectorAll('[data-rubric]').forEach(select => {
            const key = select.dataset.rubric;
            select.value = state.attempt.scores[key] ?? '';
            select.onchange = () => {
                state.attempt.scores[key] = select.value;
                state.attempt.finished = false;
                const resEl = $('exam-result');
                if (resEl) resEl.innerHTML = '';
                saveState();
            };
        });
    }
}

function renderAttempt() {
    const a = state.attempt;
    const attemptDiv = $('exam-attempt');
    const noteEl = $('exam-history-note');

    if (!a) {
        if (attemptDiv) attemptDiv.innerHTML = '';
        if (noteEl) noteEl.textContent = 'Havuz: Her çıktı için 6 kolay, 4 orta, 2 zor; toplam 48 ana soru. Her provada 7 soru seçilir.';
        return;
    }

    const qs = a.ids.map(id => QUESTIONS.find(q => q.id === id));
    if (qs.some(q => !q)) {
        if (attemptDiv) {
            attemptDiv.innerHTML = '<p class="exam-error">Kayıtlı prova paketiyle uyumsuz. Lütfen çalışma verilerini silerek yeniden başlatın.</p>';
        }
        return;
    }

    if (noteEl) {
        noteEl.textContent = a.repeats
            ? `Bu çalışmada ${a.repeats} soru daha önce görülmüş. İstenen düzeyde yeni soru tükendiğinde en az ve en eski görülmüş sorular ortak geçmiş üzerinden yeniden seçilir.`
            : 'Bu provadaki yedi soru bu cihazda ilk kez seçildi.';
    }

    if (attemptDiv) {
        attemptDiv.innerHTML = qs.map((q, i) => qHtml(q, i, 'attempt', !!a.revealed[q.id])).join('') + `
            <div class="exam-controls" style="margin-top:30px;">
                <button class="exam-btn-primary" id="exam-finish-btn" style="padding:14px 28px; font-size:1.1rem;">
                    <i class="fas fa-clipboard-check"></i> Öz Değerlendirmeyi Tamamla
                </button>
            </div>
            <p id="exam-assessment-error" class="exam-error" role="status"></p>
            <div id="exam-result" aria-live="polite"></div>
        `;

        bindQuestions(attemptDiv, 'attempt');

        const finishBtn = $('exam-finish-btn');
        if (finishBtn) finishBtn.onclick = finishAttempt;

        if (a.finished) finishAttempt();
    }
}

function finishAttempt() {
    const a = state.attempt;
    if (!a) return;

    const qs = a.ids.map(id => QUESTIONS.find(q => q.id === id));
    let total = 0;
    const missing = [];
    const returnCardIds = new Set();

    for (const q of qs) {
        (q.rubric || []).forEach((r, idx) => {
            const v = a.scores[`${q.id}|${idx}`];
            if (v === undefined || v === '') {
                missing.push(q.id);
                return;
            }
            const pts = Number(v);
            total += pts;
            if (pts < r.points && Array.isArray(r.return_card_ids)) {
                r.return_card_ids.forEach(cid => returnCardIds.add(cid));
            }
        });
    }

    const errEl = $('exam-assessment-error');
    if (missing.length > 0) {
        if (errEl) {
            errEl.textContent = 'Bütün soruların cevap ölçütlerini açıp her ölçütü değerlendir. Eksik soru: ' + [...new Set(missing)].join(', ');
        }
        return;
    }

    if (errEl) errEl.textContent = '';
    a.finished = true;
    saveState();

    const resultDiv = $('exam-result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <section class="exam-result-card">
                <h3><i class="fas fa-award" style="color:#2dd4bf;"></i> Öz Değerlendirmen: ${total} / 70</h3>
                <p>Sonuç kendi işaretlemelerine dayanır; otomatik cevap analizi veya gerçek yazılı notu değildir.</p>
                ${returnCardIds.size ? '<p><strong>Öz değerlendirmene göre tekrar çalışman önerilen konu kartları:</strong></p>' : '<p style="color:#2dd4bf; font-weight:700;">Tebrikler! Bütün ölçütleri tam işaretledin. Bilgini farklı sorularda dene.</p>'}
                <div class="exam-return-links">
                    ${[...returnCardIds].map(id => {
                        const card = CARDS.find(c => c.id === id);
                        return card ? `<button class="exam-return-btn" data-return-card="${id}"><i class="fas fa-book-open"></i> ${esc(card.title)}</button>` : '';
                    }).join('')}
                </div>
                <p style="margin-top:20px; font-size:0.95rem; color:#94a3b8;">Yeni bir çalışma başlatmak için yukarıdaki düzey profilini seçip “Çalışmayı Oluştur” düğmesine basabilirsin.</p>
            </section>
        `;

        resultDiv.querySelectorAll('[data-return-card]').forEach(btn => {
            btn.onclick = () => {
                const targetIdx = CARDS.findIndex(c => c.id === btn.dataset.returnCard);
                if (targetIdx !== -1) {
                    currentCard = targetIdx;
                    switchExamView('cards');
                    const article = $('exam-card-article');
                    if (article) article.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            };
        });
    }
}

// --- 3. ÖĞRETMEN İNCELEMESİ (Soru Bankası) ---
function renderReview() {
    const bankSelect = $('exam-bank-select');
    if (bankSelect && QUESTIONS.length > 0 && bankSelect.children.length === 0) {
        bankSelect.innerHTML = QUESTIONS.map(q => `
            <option value="${esc(q.id)}">${esc(q.id)} · ${names[q.difficulty] || ''} · ${esc(q.title)}</option>
        `).join('');

        bankSelect.onchange = () => {
            const q = QUESTIONS.find(item => item.id === bankSelect.value);
            const reviewContainer = $('exam-review-container');
            if (reviewContainer && q) {
                reviewContainer.innerHTML = qHtml(q, 0, 'review', true);
                bindQuestions(reviewContainer, 'review');
            }
        };
    }

    if (bankSelect && bankSelect.value) {
        const q = QUESTIONS.find(item => item.id === bankSelect.value) || QUESTIONS[0];
        const reviewContainer = $('exam-review-container');
        if (reviewContainer && q) {
            reviewContainer.innerHTML = qHtml(q, 0, 'review', true);
            bindQuestions(reviewContainer, 'review');
        }
    }
}

// --- BAŞLATMA VE OLAY BAĞLANTILARI ---
function initExamEvents() {
    if (isInitialized) return;
    isInitialized = true;

    // Sekmeler
    const tabCards = $('tab-exam-cards');
    const tabPractice = $('tab-exam-practice');
    const tabReview = $('tab-exam-review');
    if (tabCards) tabCards.onclick = () => switchExamView('cards');
    if (tabPractice) tabPractice.onclick = () => switchExamView('practice');
    if (tabReview) tabReview.onclick = () => switchExamView('review');

    // Profil butonları
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

    // Prova Başlat
    const startBtn = $('exam-start-practice');
    if (startBtn) {
        startBtn.onclick = () => {
            if (state.attempt && !state.attempt.finished) {
                const noteEl = $('exam-history-note');
                if (noteEl) noteEl.textContent = 'Mevcut çalışma henüz tamamlanmadı. Lütfen önce değerlendirmeyi bitirin veya çalışma verilerini silin.';
                return;
            }

            try {
                state.profileRuns = state.profileRuns || {};
                const run = state.profileRuns[currentProfile] || 0;
                const chosen = selectQuestions(currentProfile, state.history, run);
                state.profileRuns[currentProfile] = run + 1;
                state.attempt = {
                    ids: chosen.questions.map(q => q.id),
                    profile: currentProfile,
                    repeats: chosen.repeats,
                    answers: {},
                    scores: {},
                    revealed: {},
                    finished: false
                };
                saveState();
                renderAttempt();
            } catch (err) {
                const noteEl = $('exam-history-note');
                if (noteEl) noteEl.textContent = err.message;
            }
        };
    }

    // Geçmişi Temizle
    const clearBtn = $('exam-clear-history');
    if (clearBtn) {
        clearBtn.onclick = () => {
            state = { history: {}, attempt: null, profileRuns: {} };
            saveState();
            renderAttempt();
            const noteEl = $('exam-history-note');
            if (noteEl) noteEl.textContent = 'Bu cihazdaki cevaplar ve soru geçmişi sıfırlandı.';
        };
    }

    // Sekme görünürlüğü
    if (typeof document !== 'undefined') {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) stopAnimation();
        });
    }
}

// Dışa Açık Arayüz (Lifecycle API)
export async function openExamView() {
    const ok = await loadData();
    if (!ok) return;

    initExamEvents();
    saveState();
    switchExamView(currentTab || 'cards');
    if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
    }
}

export function closeExamView() {
    stopAnimation();
}

// Window global erişimi
if (typeof window !== 'undefined') {
    window.FenUpExam = {
        openExamView,
        closeExamView,
        renderCard,
        switchExamView
    };
}
