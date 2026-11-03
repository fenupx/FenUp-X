/**
 * FenUp X — V8.5: Kırmızı El Yazılı Cevap Anahtarı PDF ve Adil Puanlamalı Çocuk Dostu Değerlendirme
 * Mod 1: "Kuvvetin İşe Etkisi (Yol Sabit)" - Bağımsız Değişken: Uygulanan Kuvvet, Kontrol Değişkeni: Alınan Yol ve Kütle
 * Mod 2: "Alınan Yolun İşe Etkisi (Kuvvet Sabit)" - Bağımsız Değişken: Alınan Yol, Kontrol Değişkeni: Uygulanan Kuvvet ve Kütle
 * Bağımlı Değişken: Yapılan Fiziksel İş
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, orderBy, limit, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCJlQQH64tsze59akzcnBMPRbH2HY7rCho",
    authDomain: "fenup-x.firebaseapp.com",
    projectId: "fenup-x",
    storageBucket: "fenup-x.firebasestorage.app",
    messagingSenderId: "969661960952",
    appId: "1:969661960952:web:8c091e35e8cca27f84e10d",
    measurementId: "G-HW3RN9415Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// --- 0. DİNAMİK STİL ENJEKSİYONU ---
const styleEnjektor = document.createElement('style');
styleEnjektor.innerHTML = `
    .fenupx-prompt-overlay {
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(10px);
        display: flex; justify-content: center; align-items: center; z-index: 100000;
    }
    .fenupx-prompt-card {
        background: linear-gradient(145deg, #0a0a1a, #050510);
        border: 2px solid #00d2ff; padding: 40px; border-radius: 30px;
        text-align: center; box-shadow: 0 0 40px rgba(0, 210, 255, 0.3);
        max-width: 420px; width: 90%; animation: promptGiris 0.4s ease-out;
    }
    @keyframes promptGiris { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .fenupx-prompt-card h2 { color: #fff; font-size: 2rem; margin-bottom: 10px; text-shadow: 0 0 10px #00d2ff; }
    .fenupx-prompt-card p { color: #aaa; margin-bottom: 25px; font-size: 1.1rem; }
    .fenupx-input {
        width: 100%; padding: 15px; background: rgba(255,255,255,0.05);
        border: 1px solid #333; border-radius: 15px; color: #fff;
        font-size: 1.1rem; outline: none; transition: 0.3s; text-align: left; margin-bottom: 15px;
    }
    .fenupx-input:focus { border-color: #00d2ff; background: rgba(0,210,255,0.05); }
    .fenupx-btn-grup { display: flex; flex-direction: column; gap: 12px; }
    .f-btn { padding: 15px; border: none; border-radius: 15px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: 0.3s; }
    .f-btn-ana { background: #00d2ff; color: #000; }
    .f-btn-ikinci { background: rgba(255,255,255,0.1); color: #fff; }
    .f-btn:hover { transform: translateY(-3px); filter: brightness(1.2); }
    
    .user-profile-container { position: relative; display: inline-block; }
    .dropdown-menu {
        position: absolute; top: 60px; right: 0; width: 220px;
        background: rgba(10, 10, 30, 0.95); border: 1px solid var(--neon-blue);
        border-radius: 15px; backdrop-filter: blur(10px); z-index: 500;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5); overflow: hidden;
    }
    .dropdown-header { padding: 15px; background: rgba(0, 210, 255, 0.1); border-bottom: 1px solid rgba(255,255,255,0.1); text-align:left; }
    .dropdown-header span { display: block; color: #fff; font-weight: bold; font-size: 1.1rem; }
    .dropdown-header small { color: var(--neon-blue); font-size: 0.85rem; }
    .dropdown-item {
        width: 100%; padding: 12px 15px; border: none; background: transparent;
        color: #ccc; text-align: left; cursor: pointer; transition: 0.3s;
        display: flex; align-items: center; gap: 10px; font-size: 0.95rem;
    }
    .dropdown-item:hover { background: rgba(255,255,255,0.05); color: var(--neon-blue); }
    .logout-red:hover { color: #ff4d4d; background: rgba(255, 77, 77, 0.1); }
    .dropdown-divider { height: 1px; background: rgba(255,255,255,0.1); margin: 5px 0; }

    .avatar-grid { 
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; 
        margin: 15px 0; max-height: 300px; overflow-y: auto; padding: 10px;
    }
    .avatar-grid::-webkit-scrollbar { width: 8px; }
    .avatar-grid::-webkit-scrollbar-thumb { background: rgba(0, 210, 255, 0.5); border-radius: 10px; }
    
    .avatar-item { width: 75px; height: 75px; border-radius: 50%; border: 3px solid transparent; cursor: pointer; transition: 0.3s; padding: 5px; background: rgba(255,255,255,0.05); box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
    .avatar-item:hover { transform: scale(1.1); background: rgba(255,255,255,0.1); }
    .avatar-item.selected { border-color: #00d2ff; background: rgba(0,210,255,0.2); box-shadow: 0 0 20px rgba(0, 210, 255, 0.6); transform: scale(1.1); }
    .avatar-tabs { display: flex; gap: 6px; margin: 10px 0 5px 0; overflow-x: auto; padding-bottom: 6px; scrollbar-width: thin; }
    .avatar-tabs::-webkit-scrollbar { height: 4px; }
    .avatar-tabs::-webkit-scrollbar-thumb { background: rgba(0, 210, 255, 0.4); border-radius: 4px; }
    .avatar-tab-btn {
        padding: 6px 12px; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 20px; color: #cbd5e1; font-size: 0.82rem; font-weight: 600; cursor: pointer;
        white-space: nowrap; transition: all 0.2s; touch-action: manipulation;
    }
    .avatar-tab-btn:hover { background: rgba(0, 210, 255, 0.2); border-color: #00d2ff; color: #fff; }
    .avatar-tab-btn.active { background: linear-gradient(135deg, #00d2ff, #0284c7); border-color: #00d2ff; color: #0f172a; font-weight: 700; box-shadow: 0 0 12px rgba(0, 210, 255, 0.4); }

    .profile-img-header { width: 35px; height: 35px; border-radius: 50%; vertical-align: middle; margin-right: 8px; border: 1px solid #00d2ff; }
    .btn-danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; margin-top: 15px; }
    .btn-danger:hover { background: #ef4444; color: #fff; }
    
    .info-container { position: relative; display: flex; align-items: center; width: 100%; margin-bottom: 15px; }
    .info-icon { position: absolute; right: 15px; color: #f59e0b; font-size: 1.2rem; cursor: help; z-index: 5; }
    .tooltiptext {
        visibility: hidden; width: 250px; background-color: rgba(0,0,0,0.95); color: #f59e0b; text-align: left;
        border-radius: 10px; padding: 12px; position: absolute; z-index: 500; bottom: 120%; right: 0;
        font-size: 0.9rem; border: 1px solid #f59e0b; box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
        opacity: 0; transition: opacity 0.3s; pointer-events: none;
    }
    .info-icon:hover ~ .tooltiptext { visibility: visible; opacity: 1; }
    .tooltiptext.active { visibility: visible !important; opacity: 1 !important; pointer-events: auto; }

    .password-container { position: relative; width: 100%; margin-bottom: 15px; }
    .password-container input { margin-bottom: 0 !important; width: 100%; padding-right: 45px; }
    .toggle-pass-icon { position: absolute; right: 15px; top: 16px; color: #aaa; cursor: pointer; font-size: 1.2rem; transition: 0.3s; z-index: 5; touch-action: manipulation; user-select: none; -webkit-user-select: none;}
    .toggle-pass-icon:hover { color: #00d2ff; }
    
    .btn-edit-nick { background: rgba(0, 210, 255, 0.2); color: #00d2ff; border: 1px solid #00d2ff; padding: 8px 15px; border-radius: 10px; cursor: pointer; transition: 0.3s; font-weight: bold; }
    .btn-edit-nick:hover { background: #00d2ff; color: #000; box-shadow: 0 0 15px #00d2ff; }
    
    .btn-report-bug { position: relative; margin-top: 25px; display: inline-flex; justify-content: center; align-items: center; gap: 8px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.5); color: #ef4444; padding: 8px 20px; border-radius: 20px; font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: 0.3s; z-index: 40; margin-bottom: 10px; }
    .btn-report-bug:hover { background: #ef4444; color: #fff; box-shadow: 0 0 15px rgba(239, 68, 68, 0.6); transform: translateY(-3px);}
    
    .report-options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; text-align: left; }
    .report-radio-label { display: flex; align-items: center; gap: 10px; color: #ddd; cursor: pointer; font-size: 1.1rem; padding: 10px; background: rgba(0,0,0,0.5); border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); transition: 0.2s;}
    .report-radio-label:hover { background: rgba(255,255,255,0.1); }
    .report-radio-label input[type="radio"] { accent-color: #ef4444; width: 18px; height: 18px; cursor: pointer;}

    .season-champ { color: #f59e0b !important; text-shadow: 0 0 20px #f59e0b, 0 0 40px #f59e0b; font-weight: 900; animation: pulseGlow 2s infinite; }
    @keyframes pulseGlow { 0% { text-shadow: 0 0 20px #f59e0b; } 50% { text-shadow: 0 0 40px #f59e0b, 0 0 10px #fff; } 100% { text-shadow: 0 0 20px #f59e0b; } }
    .badge-icon { margin-right: 5px; font-size: 1.2em; vertical-align: middle; filter: drop-shadow(0 0 5px rgba(255,255,255,0.3)); }
`;
document.head.appendChild(styleEnjektor);

function makeSvgAvatar(id, bgGrad, innerSvg) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
<defs>
<linearGradient id="g_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" stop-color="${bgGrad[0]}"/>
<stop offset="100%" stop-color="${bgGrad[1]}"/>
</linearGradient>
</defs>
<circle cx="50" cy="50" r="48" fill="url(#g_${id})" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
${innerSvg}
</svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

const kozmikAvatarlar = [
    // --- 👦👧 ÖĞRENCİLER (8) ---
    {
        id: 'av_ogrenci_1',
        name: 'Karizmatik Dalgalı Saçlı Öğrenci',
        category: 'ogrenciler',
        url: makeSvgAvatar('av_ogrenci_1', ['#1e1b4b', '#2563eb'], `
            <circle cx="50" cy="46" r="19" fill="#fed7aa"/>
            <path d="M30 40 Q50 20 70 38 Q66 22 50 22 Q34 22 30 40 Z" fill="#78350f"/>
            <path d="M28 38 Q32 30 40 32 Q32 38 34 46 Z" fill="#92400e"/>
            <path d="M72 38 Q68 30 60 32 Q68 38 66 46 Z" fill="#92400e"/>
            <circle cx="43" cy="45" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="45" r="2.2" fill="#0f172a"/>
            <path d="M46 54 Q50 58 54 54" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M30 78 L40 65 L60 65 L70 78 Z" fill="#1e293b"/>
            <path d="M46 65 L46 73 M54 65 L54 73" stroke="#e2e8f0" stroke-width="1.5"/>
        `)
    },
    {
        id: 'av_ogrenci_2',
        name: 'Gözlüklü Araştırmacı Öğrenci',
        category: 'ogrenciler',
        url: makeSvgAvatar('av_ogrenci_2', ['#064e3b', '#10b981'], `
            <circle cx="50" cy="46" r="19" fill="#fed7aa"/>
            <path d="M32 38 Q50 24 68 38 Q60 26 50 26 Q38 26 32 38 Z" fill="#1e293b"/>
            <circle cx="42" cy="45" r="6" fill="none" stroke="#0284c7" stroke-width="2"/>
            <circle cx="58" cy="45" r="6" fill="none" stroke="#0284c7" stroke-width="2"/>
            <line x1="48" y1="45" x2="52" y2="45" stroke="#0284c7" stroke-width="2"/>
            <circle cx="42" cy="45" r="2" fill="#0f172a"/>
            <circle cx="58" cy="45" r="2" fill="#0f172a"/>
            <path d="M46 55 Q50 59 54 55" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 65 L58 65 L68 78 Z" fill="#047857"/>
            <polygon points="46,65 54,65 50,71" fill="#f8fafc"/>
        `)
    },
    {
        id: 'av_ogrenci_3',
        name: 'Kulaklıklı Kodlamacı Genç',
        category: 'ogrenciler',
        url: makeSvgAvatar('av_ogrenci_3', ['#311042', '#a855f7'], `
            <circle cx="50" cy="46" r="19" fill="#fcd34d"/>
            <path d="M30 38 L36 28 L44 32 L50 26 L56 32 L64 28 L70 38 Z" fill="#334155"/>
            <circle cx="43" cy="45" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="45" r="2.2" fill="#0f172a"/>
            <path d="M46 54 Q50 57 54 54" stroke="#b45309" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M28 46 A22 22 0 0 1 72 46" fill="none" stroke="#06b6d4" stroke-width="3"/>
            <rect x="25" y="40" width="6" height="12" rx="3" fill="#0891b2"/>
            <rect x="69" y="40" width="6" height="12" rx="3" fill="#0891b2"/>
            <path d="M32 78 L42 65 L58 65 L68 78 Z" fill="#6b21a8"/>
            <text x="50" y="74" fill="#38bdf8" font-size="7" font-weight="bold" text-anchor="middle">&lt;/&gt;</text>
        `)
    },
    {
        id: 'av_ogrenci_4',
        name: 'Sarışın Enerjik Fen Kâşifi',
        category: 'ogrenciler',
        url: makeSvgAvatar('av_ogrenci_4', ['#78350f', '#f59e0b'], `
            <circle cx="50" cy="46" r="19" fill="#fed7aa"/>
            <path d="M28 40 Q40 22 72 34 Q64 22 48 24 Q34 26 28 40 Z" fill="#fde047"/>
            <path d="M30 36 Q38 32 46 36" stroke="#eab308" stroke-width="2" fill="none"/>
            <circle cx="43" cy="46" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="46" r="2.2" fill="#0f172a"/>
            <path d="M45 54 Q50 60 55 54" stroke="#c2410c" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L40 65 L60 65 L68 78 Z" fill="#ea580c"/>
            <polygon points="50,67 52,71 56,71 53,74 54,78 50,75 46,78 47,74 44,71 48,71" fill="#facc15"/>
        `)
    },
    {
        id: 'av_ogrenci_5',
        name: 'At Kuyruklu Dinamik Kız',
        category: 'ogrenciler',
        url: makeSvgAvatar('av_ogrenci_5', ['#831843', '#ec4899'], `
            <path d="M64 36 Q80 32 76 54 Q70 48 64 44 Z" fill="#451a03"/>
            <circle cx="66" cy="38" r="4" fill="#38bdf8"/>
            <circle cx="50" cy="47" r="19" fill="#fcd34d"/>
            <path d="M31 44 Q50 30 69 44 Q60 28 50 28 Q36 28 31 44 Z" fill="#451a03"/>
            <circle cx="43" cy="46" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="46" r="2.2" fill="#0f172a"/>
            <path d="M46 55 Q50 59 54 55" stroke="#b45309" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 66 L58 66 L68 78 Z" fill="#0d9488"/>
            <line x1="50" y1="66" x2="50" y2="78" stroke="#facc15" stroke-width="1.5"/>
        `)
    },
    {
        id: 'av_ogrenci_6',
        name: 'Örgülü Araştırmacı Kız',
        category: 'ogrenciler',
        url: makeSvgAvatar('av_ogrenci_6', ['#1e3a5f', '#0ea5e9'], `
            <circle cx="50" cy="47" r="19" fill="#fed7aa"/>
            <path d="M32 46 Q26 56 28 68 Q32 68 34 58 Z" fill="#7c2d12"/>
            <path d="M68 46 Q74 56 72 68 Q68 68 66 58 Z" fill="#7c2d12"/>
            <circle cx="28" cy="67" r="2" fill="#facc15"/>
            <circle cx="72" cy="67" r="2" fill="#facc15"/>
            <path d="M31 42 Q50 28 69 42 Q60 27 50 27 Q37 27 31 42 Z" fill="#7c2d12"/>
            <circle cx="43" cy="46" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="46" r="2.2" fill="#0f172a"/>
            <circle cx="41" cy="51" r="1" fill="#ea580c"/>
            <circle cx="59" cy="51" r="1" fill="#ea580c"/>
            <path d="M46 55 Q50 59 54 55" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 66 L58 66 L68 78 Z" fill="#0284c7"/>
            <rect x="44" y="66" width="12" height="12" fill="#facc15"/>
        `)
    },
    {
        id: 'av_ogrenci_7',
        name: 'Önlüklü Fen Meraklısı Kız',
        category: 'ogrenciler',
        url: makeSvgAvatar('av_ogrenci_7', ['#0f172a', '#14b8a6'], `
            <circle cx="50" cy="48" r="19" fill="#fed7aa"/>
            <path d="M30 46 Q50 26 70 46 Q64 26 50 26 Q36 26 30 46 Z" fill="#3b1e08"/>
            <rect x="36" y="30" width="12" height="8" rx="3" fill="none" stroke="#38bdf8" stroke-width="2"/>
            <rect x="52" y="30" width="12" height="8" rx="3" fill="none" stroke="#38bdf8" stroke-width="2"/>
            <line x1="48" y1="34" x2="52" y2="34" stroke="#38bdf8" stroke-width="2"/>
            <circle cx="43" cy="48" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="48" r="2.2" fill="#0f172a"/>
            <path d="M46 56 Q50 60 54 56" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L40 67 L60 67 L68 78 Z" fill="#f8fafc"/>
            <polygon points="46,67 54,67 50,74" fill="#0d9488"/>
            <line x1="62" y1="71" x2="62" y2="76" stroke="#ef4444" stroke-width="1.5"/>
        `)
    },
    {
        id: 'av_ogrenci_8',
        name: 'Gözlüklü Çalışkan Kız',
        category: 'ogrenciler',
        url: makeSvgAvatar('av_ogrenci_8', ['#4c1d95', '#8b5cf6'], `
            <circle cx="50" cy="46" r="19" fill="#fcd34d"/>
            <path d="M30 44 Q50 25 70 44 Q60 25 50 25 Q35 25 30 44 Z" fill="#1c1917"/>
            <path d="M32 38 Q50 29 68 38" fill="none" stroke="#f43f5e" stroke-width="3"/>
            <circle cx="42" cy="45" r="5.5" fill="none" stroke="#ef4444" stroke-width="2"/>
            <circle cx="58" cy="45" r="5.5" fill="none" stroke="#ef4444" stroke-width="2"/>
            <line x1="47.5" y1="45" x2="52.5" y2="45" stroke="#ef4444" stroke-width="2"/>
            <circle cx="42" cy="45" r="2" fill="#0f172a"/>
            <circle cx="58" cy="45" r="2" fill="#0f172a"/>
            <path d="M45 54 Q50 59 55 54" stroke="#b45309" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 65 L58 65 L68 78 Z" fill="#7c3aed"/>
            <polygon points="47,65 53,65 50,70" fill="#fed7aa"/>
        `)
    },

    // --- 🔬 BİLİM İNSANLARI (8) ---
    {
        id: 'av_bilim_einstein',
        name: 'Albert Einstein',
        category: 'bilim',
        url: makeSvgAvatar('av_bilim_einstein', ['#0f172a', '#475569'], `
            <path d="M24 44 Q22 28 34 26 Q36 18 48 20 Q60 18 64 26 Q78 28 76 44 Q80 54 74 62 Q72 48 68 44 Q32 48 26 62 Q20 54 24 44 Z" fill="#e2e8f0"/>
            <circle cx="50" cy="47" r="18" fill="#fed7aa"/>
            <circle cx="43" cy="44" r="2" fill="#0f172a"/>
            <circle cx="57" cy="44" r="2" fill="#0f172a"/>
            <path d="M38 54 Q50 50 62 54 Q56 60 50 56 Q44 60 38 54 Z" fill="#f8fafc"/>
            <path d="M32 78 L42 65 L58 65 L68 78 Z" fill="#573a24"/>
            <polygon points="47,65 53,65 50,72" fill="#cbd5e1"/>
        `)
    },
    {
        id: 'av_bilim_curie',
        name: 'Marie Curie',
        category: 'bilim',
        url: makeSvgAvatar('av_bilim_curie', ['#064e3b', '#059669'], `
            <ellipse cx="50" cy="26" rx="10" ry="7" fill="#422006"/>
            <circle cx="50" cy="46" r="18" fill="#fed7aa"/>
            <path d="M32 40 Q50 28 68 40 Q60 26 50 26 Q36 26 32 40 Z" fill="#422006"/>
            <circle cx="43" cy="44" r="2" fill="#0f172a"/>
            <circle cx="57" cy="44" r="2" fill="#0f172a"/>
            <path d="M46 54 Q50 57 54 54" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 64 L58 64 L68 78 Z" fill="#1f2937"/>
            <rect x="64" y="60" width="6" height="14" rx="3" fill="#10b981" stroke="#a7f3d0" stroke-width="1"/>
            <circle cx="67" cy="56" r="1.5" fill="#34d399"/>
        `)
    },
    {
        id: 'av_bilim_newton',
        name: 'Isaac Newton',
        category: 'bilim',
        url: makeSvgAvatar('av_bilim_newton', ['#1e1b4b', '#4338ca'], `
            <path d="M26 42 Q28 22 50 22 Q72 22 74 42 Q78 58 72 68 Q66 52 66 42 Q34 52 28 68 Q22 58 26 42 Z" fill="#cbd5e1"/>
            <circle cx="50" cy="45" r="17" fill="#fed7aa"/>
            <circle cx="44" cy="43" r="2" fill="#0f172a"/>
            <circle cx="56" cy="43" r="2" fill="#0f172a"/>
            <path d="M46 52 Q50 55 54 52" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 63 L58 63 L68 78 Z" fill="#1e293b"/>
            <polygon points="46,63 54,63 50,69" fill="#f8fafc"/>
            <circle cx="36" cy="71" r="4" fill="#ef4444"/>
            <path d="M36 67 Q38 65 39 67" stroke="#22c55e" stroke-width="1.5" fill="none"/>
        `)
    },
    {
        id: 'av_bilim_sancar',
        name: 'Aziz Sancar',
        category: 'bilim',
        url: makeSvgAvatar('av_bilim_sancar', ['#881337', '#e11d48'], `
            <circle cx="50" cy="46" r="18" fill="#fed7aa"/>
            <path d="M32 38 Q50 24 68 38 Q60 26 50 26 Q38 26 32 38 Z" fill="#94a3b8"/>
            <circle cx="43" cy="44" r="5" fill="none" stroke="#475569" stroke-width="1.8"/>
            <circle cx="57" cy="44" r="5" fill="none" stroke="#475569" stroke-width="1.8"/>
            <line x1="48" y1="44" x2="52" y2="44" stroke="#475569" stroke-width="1.8"/>
            <circle cx="43" cy="44" r="1.8" fill="#0f172a"/>
            <circle cx="57" cy="44" r="1.8" fill="#0f172a"/>
            <path d="M46 54 Q50 57 54 54" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 64 L58 64 L68 78 Z" fill="#0f172a"/>
            <polygon points="48,64 52,64 51,74 49,74" fill="#e11d48"/>
            <circle cx="38" cy="70" r="3" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
        `)
    },
    {
        id: 'av_bilim_tesla',
        name: 'Nikola Tesla',
        category: 'bilim',
        url: makeSvgAvatar('av_bilim_tesla', ['#022c22', '#06b6d4'], `
            <circle cx="50" cy="46" r="18" fill="#fed7aa"/>
            <path d="M32 38 Q50 24 68 38 Q64 26 50 24 Q36 26 32 38 Z" fill="#09090b"/>
            <circle cx="43" cy="44" r="2" fill="#0f172a"/>
            <circle cx="57" cy="44" r="2" fill="#0f172a"/>
            <path d="M42 53 Q50 51 58 53 Q54 56 50 54 Q46 56 42 53 Z" fill="#09090b"/>
            <path d="M32 78 L42 64 L58 64 L68 78 Z" fill="#18181b"/>
            <polygon points="48,64 52,64 50,71" fill="#f8fafc"/>
            <polygon points="68,62 65,68 68,68 66,74 72,67 69,67" fill="#facc15"/>
        `)
    },
    {
        id: 'av_bilim_galileo',
        name: 'Galileo Galilei',
        category: 'bilim',
        url: makeSvgAvatar('av_bilim_galileo', ['#1e293b', '#0284c7'], `
            <circle cx="50" cy="45" r="18" fill="#fed7aa"/>
            <path d="M30 40 Q50 24 70 40 Q62 26 50 26 Q36 26 30 40 Z" fill="#cbd5e1"/>
            <path d="M36 50 Q50 64 64 50 Q66 64 50 68 Q34 64 36 50 Z" fill="#cbd5e1"/>
            <circle cx="43" cy="43" r="2" fill="#0f172a"/>
            <circle cx="57" cy="43" r="2" fill="#0f172a"/>
            <path d="M32 78 L42 64 L58 64 L68 78 Z" fill="#334155"/>
            <line x1="64" y1="74" x2="72" y2="64" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
        `)
    },
    {
        id: 'av_bilim_heysem',
        name: 'İbni Heysem',
        category: 'bilim',
        url: makeSvgAvatar('av_bilim_heysem', ['#451a03', '#d97706'], `
            <ellipse cx="50" cy="30" rx="20" ry="12" fill="#fef3c7" stroke="#b45309" stroke-width="1.5"/>
            <circle cx="50" cy="22" r="3" fill="#f59e0b"/>
            <circle cx="50" cy="48" r="17" fill="#fed7aa"/>
            <path d="M38 54 Q50 66 62 54 Q64 64 50 68 Q36 64 38 54 Z" fill="#475569"/>
            <circle cx="44" cy="45" r="2" fill="#0f172a"/>
            <circle cx="56" cy="45" r="2" fill="#0f172a"/>
            <path d="M32 78 L42 65 L58 65 L68 78 Z" fill="#78350f"/>
            <circle cx="50" cy="72" r="4" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
            <line x1="44" y1="72" x2="56" y2="72" stroke="#fde047" stroke-width="1"/>
        `)
    },
    {
        id: 'av_bilim_genetik',
        name: 'Modern Genetikçi',
        category: 'bilim',
        url: makeSvgAvatar('av_bilim_genetik', ['#083344', '#06b6d4'], `
            <circle cx="50" cy="47" r="18" fill="#fed7aa"/>
            <path d="M32 38 Q50 24 68 38 Q62 26 50 26 Q38 26 32 38 Z" fill="#292524"/>
            <circle cx="43" cy="45" r="2" fill="#0f172a"/>
            <circle cx="57" cy="45" r="2" fill="#0f172a"/>
            <path d="M46 55 Q50 58 54 55" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 65 L58 65 L68 78 Z" fill="#0284c7"/>
            <path d="M48 68 Q52 71 48 74 T48 78" stroke="#38bdf8" stroke-width="1.5" fill="none"/>
            <path d="M52 68 Q48 71 52 74 T52 78" stroke="#a855f7" stroke-width="1.5" fill="none"/>
        `)
    },

    // --- 🚀 KÂŞİFLER (8) ---
    {
        id: 'av_kasif_astronot',
        name: 'Genç Astronot',
        category: 'kasifler',
        url: makeSvgAvatar('av_kasif_astronot', ['#090d16', '#2563eb'], `
            <circle cx="50" cy="46" r="24" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
            <rect x="32" y="32" width="36" height="26" rx="13" fill="#0f172a"/>
            <circle cx="50" cy="45" r="11" fill="#fed7aa"/>
            <circle cx="46" cy="43" r="1.8" fill="#0f172a"/>
            <circle cx="54" cy="43" r="1.8" fill="#0f172a"/>
            <path d="M48 49 Q50 52 52 49" stroke="#c2410c" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <line x1="50" y1="22" x2="50" y2="16" stroke="#94a3b8" stroke-width="2"/>
            <circle cx="50" cy="15" r="3" fill="#38bdf8"/>
            <path d="M32 78 L40 68 L60 68 L68 78 Z" fill="#f1f5f9"/>
            <rect x="46" y="70" width="8" height="6" fill="#0284c7"/>
        `)
    },
    {
        id: 'av_kasif_safari',
        name: 'Safari Doğa Kâşifi',
        category: 'kasifler',
        url: makeSvgAvatar('av_kasif_safari', ['#14532d', '#65a30d'], `
            <circle cx="50" cy="48" r="18" fill="#fed7aa"/>
            <ellipse cx="50" cy="34" rx="24" ry="7" fill="#ca8a04"/>
            <path d="M36 34 Q50 18 64 34 Z" fill="#a16207"/>
            <circle cx="43" cy="47" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="47" r="2.2" fill="#0f172a"/>
            <path d="M46 56 Q50 60 54 56" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <circle cx="45" cy="67" r="3" fill="#334155"/>
            <circle cx="55" cy="67" r="3" fill="#334155"/>
            <line x1="48" y1="67" x2="52" y2="67" stroke="#334155" stroke-width="2"/>
            <path d="M32 78 L42 67 L58 67 L68 78 Z" fill="#854d0e"/>
        `)
    },
    {
        id: 'av_kasif_dalgic',
        name: 'Okyanus Dalgıcı',
        category: 'kasifler',
        url: makeSvgAvatar('av_kasif_dalgic', ['#082f49', '#0284c7'], `
            <circle cx="50" cy="46" r="20" fill="#0f172a"/>
            <circle cx="50" cy="48" r="14" fill="#fed7aa"/>
            <rect x="36" y="42" width="28" height="12" rx="6" fill="rgba(56, 189, 248, 0.4)" stroke="#facc15" stroke-width="2"/>
            <circle cx="44" cy="47" r="2" fill="#0f172a"/>
            <circle cx="56" cy="47" r="2" fill="#0f172a"/>
            <path d="M66 52 L70 52 L70 28" stroke="#facc15" stroke-width="3" fill="none" stroke-linecap="round"/>
            <circle cx="70" cy="27" r="2.5" fill="#ef4444"/>
            <path d="M32 78 L42 66 L58 66 L68 78 Z" fill="#1e293b"/>
            <polygon points="48,66 52,66 50,78" fill="#facc15"/>
        `)
    },
    {
        id: 'av_kasif_kutup',
        name: 'Kutup Araştırmacısı',
        category: 'kasifler',
        url: makeSvgAvatar('av_kasif_kutup', ['#0f2942', '#38bdf8'], `
            <circle cx="50" cy="45" r="24" fill="#f1f5f9"/>
            <circle cx="50" cy="46" r="16" fill="#fed7aa"/>
            <circle cx="44" cy="43" r="2" fill="#0f172a"/>
            <circle cx="56" cy="43" r="2" fill="#0f172a"/>
            <circle cx="41" cy="47" r="2.5" fill="rgba(239, 68, 68, 0.4)"/>
            <circle cx="59" cy="47" r="2.5" fill="rgba(239, 68, 68, 0.4)"/>
            <path d="M38 52 Q50 56 62 52 L64 64 Q50 67 36 64 Z" fill="#ef4444"/>
            <path d="M32 78 L40 64 L60 64 L68 78 Z" fill="#ea580c"/>
        `)
    },
    {
        id: 'av_kasif_arkeolog',
        name: 'Arkeolog Yer Bilimci',
        category: 'kasifler',
        url: makeSvgAvatar('av_kasif_arkeolog', ['#451a03', '#b45309'], `
            <circle cx="50" cy="48" r="18" fill="#fed7aa"/>
            <ellipse cx="50" cy="36" rx="25" ry="6" fill="#78350f"/>
            <path d="M38 36 L40 24 Q50 22 60 24 L62 36 Z" fill="#92400e"/>
            <rect x="40" y="33" width="20" height="3" fill="#18181b"/>
            <circle cx="43" cy="47" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="47" r="2.2" fill="#0f172a"/>
            <path d="M46 56 Q50 59 54 56" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 66 L58 66 L68 78 Z" fill="#a16207"/>
            <line x1="50" y1="66" x2="50" y2="78" stroke="#fde047" stroke-width="1.5"/>
        `)
    },
    {
        id: 'av_kasif_volkan',
        name: 'Yanardağ Gözlemcisi',
        category: 'kasifler',
        url: makeSvgAvatar('av_kasif_volkan', ['#450a0a', '#dc2626'], `
            <circle cx="50" cy="48" r="18" fill="#fed7aa"/>
            <path d="M32 38 Q50 18 68 38 Z" fill="#ef4444"/>
            <ellipse cx="50" cy="38" rx="20" ry="4" fill="#cbd5e1"/>
            <circle cx="43" cy="47" r="2" fill="#0f172a"/>
            <circle cx="57" cy="47" r="2" fill="#0f172a"/>
            <path d="M46 56 Q50 59 54 56" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 66 L58 66 L68 78 Z" fill="#94a3b8"/>
            <polygon points="50,69 54,76 46,76" fill="#facc15"/>
        `)
    },
    {
        id: 'av_kasif_teleskop',
        name: 'Gece Teleskop Gözlemcisi',
        category: 'kasifler',
        url: makeSvgAvatar('av_kasif_teleskop', ['#1e1b4b', '#6366f1'], `
            <circle cx="50" cy="48" r="18" fill="#fed7aa"/>
            <path d="M32 40 Q50 20 68 40 Z" fill="#312e81"/>
            <rect x="30" y="38" width="40" height="6" rx="3" fill="#4338ca"/>
            <circle cx="46" cy="30" r="1.5" fill="#fde047"/>
            <circle cx="54" cy="27" r="1" fill="#fde047"/>
            <circle cx="43" cy="48" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="48" r="2.2" fill="#0f172a"/>
            <path d="M46 56 Q50 60 54 56" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 66 L58 66 L68 78 Z" fill="#1e293b"/>
            <line x1="62" y1="74" x2="72" y2="62" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
        `)
    },
    {
        id: 'av_kasif_drone',
        name: 'Siber Kâşif Drone Pilotu',
        category: 'kasifler',
        url: makeSvgAvatar('av_kasif_drone', ['#022c22', '#10b981'], `
            <circle cx="50" cy="46" r="18" fill="#fed7aa"/>
            <path d="M32 38 Q50 24 68 38 Q60 26 50 26 Q38 26 32 38 Z" fill="#0f172a"/>
            <rect x="34" y="40" width="32" height="9" rx="3" fill="#06b6d4" stroke="#22c55e" stroke-width="1.5"/>
            <line x1="36" y1="44" x2="48" y2="44" stroke="#fff" stroke-width="1"/>
            <path d="M46 55 Q50 58 54 55" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 65 L58 65 L68 78 Z" fill="#0f172a"/>
            <circle cx="50" cy="72" r="3" fill="#22c55e"/>
            <line x1="44" y1="70" x2="56" y2="74" stroke="#38bdf8" stroke-width="1"/>
            <line x1="44" y1="74" x2="56" y2="70" stroke="#38bdf8" stroke-width="1"/>
        `)
    },

    // --- 👨‍🏫 ÖĞRETMENLER & YÖNETİCİLER (8) ---
    {
        id: 'av_ogretmen_genc_kadin',
        name: 'Genç Kadın Fen Öğretmeni',
        category: 'ogretmenler',
        url: makeSvgAvatar('av_ogretmen_genc_kadin', ['#701a75', '#d946ef'], `
            <circle cx="50" cy="46" r="18" fill="#fed7aa"/>
            <path d="M30 44 Q50 24 70 44 Q62 25 50 25 Q36 25 30 44 Z" fill="#3b1e08"/>
            <circle cx="43" cy="44" r="5" fill="none" stroke="#0284c7" stroke-width="1.8"/>
            <circle cx="57" cy="44" r="5" fill="none" stroke="#0284c7" stroke-width="1.8"/>
            <line x1="48" y1="44" x2="52" y2="44" stroke="#0284c7" stroke-width="1.8"/>
            <circle cx="43" cy="44" r="1.8" fill="#0f172a"/>
            <circle cx="57" cy="44" r="1.8" fill="#0f172a"/>
            <path d="M45 54 Q50 58 55 54" stroke="#c2410c" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 64 L58 64 L68 78 Z" fill="#0e7490"/>
            <polygon points="47,64 53,64 50,70" fill="#f8fafc"/>
        `)
    },
    {
        id: 'av_ogretmen_genc_erkek',
        name: 'Genç Erkek Fen Öğretmeni',
        category: 'ogretmenler',
        url: makeSvgAvatar('av_ogretmen_genc_erkek', ['#0f172a', '#0284c7'], `
            <circle cx="50" cy="46" r="18" fill="#fed7aa"/>
            <path d="M32 38 Q50 24 68 38 Q60 25 50 25 Q38 25 32 38 Z" fill="#1c1917"/>
            <circle cx="43" cy="44" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="44" r="2.2" fill="#0f172a"/>
            <path d="M45 54 Q50 58 55 54" stroke="#c2410c" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 64 L58 64 L68 78 Z" fill="#0284c7"/>
            <polygon points="46,64 54,64 50,71" fill="#f8fafc"/>
            <polygon points="49,70 51,70 52,78 48,78" fill="#facc15"/>
        `)
    },
    {
        id: 'av_ogretmen_kidemli_kadin',
        name: 'Kıdemli Kadın Öğretmen',
        category: 'ogretmenler',
        url: makeSvgAvatar('av_ogretmen_kidemli_kadin', ['#312e81', '#6366f1'], `
            <ellipse cx="50" cy="24" rx="9" ry="6" fill="#94a3b8"/>
            <circle cx="50" cy="46" r="18" fill="#fed7aa"/>
            <path d="M32 40 Q50 26 68 40 Q60 26 50 26 Q36 26 32 40 Z" fill="#94a3b8"/>
            <circle cx="43" cy="44" r="4.5" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
            <circle cx="57" cy="44" r="4.5" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>
            <line x1="47.5" y1="44" x2="52.5" y2="44" stroke="#e2e8f0" stroke-width="1.5"/>
            <circle cx="43" cy="44" r="1.8" fill="#0f172a"/>
            <circle cx="57" cy="44" r="1.8" fill="#0f172a"/>
            <path d="M46 54 Q50 57 54 54" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 64 L58 64 L68 78 Z" fill="#064e3b"/>
            <circle cx="50" cy="68" r="2.5" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
        `)
    },
    {
        id: 'av_ogretmen_kidemli_erkek',
        name: 'Kıdemli Erkek Fen Hocası',
        category: 'ogretmenler',
        url: makeSvgAvatar('av_ogretmen_kidemli_erkek', ['#1e293b', '#475569'], `
            <circle cx="50" cy="46" r="18" fill="#fed7aa"/>
            <path d="M32 38 Q50 24 68 38 Q60 25 50 25 Q38 25 32 38 Z" fill="#94a3b8"/>
            <circle cx="43" cy="44" r="5" fill="none" stroke="#64748b" stroke-width="1.8"/>
            <circle cx="57" cy="44" r="5" fill="none" stroke="#64748b" stroke-width="1.8"/>
            <line x1="48" y1="44" x2="52" y2="44" stroke="#64748b" stroke-width="1.8"/>
            <circle cx="43" cy="44" r="1.8" fill="#0f172a"/>
            <circle cx="57" cy="44" r="1.8" fill="#0f172a"/>
            <path d="M42 53 Q50 51 58 53 Q54 56 50 54 Q46 56 42 53 Z" fill="#94a3b8"/>
            <path d="M32 78 L42 64 L58 64 L68 78 Z" fill="#78350f"/>
            <polygon points="47,64 53,64 50,71" fill="#f8fafc"/>
        `)
    },
    {
        id: 'av_ogretmen_mentor',
        name: 'Okul Mentörü & Koç',
        category: 'ogretmenler',
        url: makeSvgAvatar('av_ogretmen_mentor', ['#064e3b', '#10b981'], `
            <circle cx="50" cy="46" r="18" fill="#fed7aa"/>
            <path d="M32 38 Q50 24 68 38 Q60 25 50 25 Q38 25 32 38 Z" fill="#292524"/>
            <circle cx="43" cy="44" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="44" r="2.2" fill="#0f172a"/>
            <path d="M45 54 Q50 58 55 54" stroke="#c2410c" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 64 L58 64 L68 78 Z" fill="#047857"/>
            <line x1="46" y1="64" x2="49" y2="72" stroke="#f59e0b" stroke-width="1.5"/>
            <line x1="54" y1="64" x2="51" y2="72" stroke="#f59e0b" stroke-width="1.5"/>
            <rect x="47" y="72" width="6" height="6" fill="#f8fafc" stroke="#38bdf8" stroke-width="1"/>
        `)
    },
    {
        id: 'av_ogretmen_mudur',
        name: 'Bilge Okul Yöneticisi',
        category: 'ogretmenler',
        url: makeSvgAvatar('av_ogretmen_mudur', ['#18181b', '#3f3f46'], `
            <circle cx="50" cy="46" r="18" fill="#fed7aa"/>
            <path d="M32 38 Q50 24 68 38 Q60 25 50 25 Q38 25 32 38 Z" fill="#52525b"/>
            <circle cx="43" cy="44" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="44" r="2.2" fill="#0f172a"/>
            <path d="M46 54 Q50 57 54 54" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 64 L58 64 L68 78 Z" fill="#18181b"/>
            <polygon points="46,64 54,64 50,71" fill="#f8fafc"/>
            <polygon points="38,68 40,65 42,68 40,71" fill="#facc15"/>
        `)
    },
    {
        id: 'av_ogretmen_doga',
        name: 'Doğa Bilimleri Eğitmeni',
        category: 'ogretmenler',
        url: makeSvgAvatar('av_ogretmen_doga', ['#14532d', '#15803d'], `
            <circle cx="50" cy="48" r="18" fill="#fed7aa"/>
            <ellipse cx="50" cy="36" rx="24" ry="6" fill="#78350f"/>
            <path d="M38 36 L40 24 Q50 22 60 24 L62 36 Z" fill="#92400e"/>
            <circle cx="43" cy="47" r="2.2" fill="#0f172a"/>
            <circle cx="57" cy="47" r="2.2" fill="#0f172a"/>
            <path d="M46 56 Q50 59 54 56" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L42 66 L58 66 L68 78 Z" fill="#365314"/>
            <circle cx="64" cy="70" r="4" fill="none" stroke="#facc15" stroke-width="1.5"/>
            <line x1="67" y1="73" x2="72" y2="77" stroke="#ca8a04" stroke-width="2"/>
        `)
    },
    {
        id: 'av_ogretmen_direktor',
        name: 'Laboratuvar Direktörü Eğitmen',
        category: 'ogretmenler',
        url: makeSvgAvatar('av_ogretmen_direktor', ['#0c4a6e', '#0369a1'], `
            <circle cx="50" cy="47" r="18" fill="#fed7aa"/>
            <path d="M30 44 Q50 24 70 44 Q62 25 50 25 Q36 25 30 44 Z" fill="#18181b"/>
            <rect x="36" y="41" width="12" height="7" rx="2" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
            <rect x="52" y="41" width="12" height="7" rx="2" fill="none" stroke="#38bdf8" stroke-width="1.8"/>
            <line x1="48" y1="44" x2="52" y2="44" stroke="#38bdf8" stroke-width="1.8"/>
            <circle cx="42" cy="44" r="1.8" fill="#0f172a"/>
            <circle cx="58" cy="44" r="1.8" fill="#0f172a"/>
            <path d="M45 55 Q50 59 55 55" stroke="#c2410c" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M32 78 L40 66 L60 66 L68 78 Z" fill="#f8fafc"/>
            <polygon points="46,66 54,66 50,72" fill="#0284c7"/>
        `)
    }
];

function isimSor(prefill, callback) {
    const overlay = document.createElement('div');
    overlay.className = "fenupx-prompt-overlay";
    overlay.innerHTML = `
        <div class="fenupx-prompt-card">
            <h2>KAPTANIN ADI?</h2>
            <p>Yarışmaya başlamak için ismini yaz.</p>
            <input type="text" id="f-ad-input" class="fenupx-input" placeholder="İsmini buraya yaz..." maxlength="20" value="${prefill}">
            <div class="fenupx-btn-grup">
                <button id="f-baslat" class="f-btn f-btn-ana">MACERAYI BAŞLAT</button>
                <button id="f-misafir" class="f-btn f-btn-ikinci">MİSAFİR OLARAK GİR</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    const input = document.getElementById('f-ad-input');
    if(input) input.focus();
    
    const btnBaslat = document.getElementById('f-baslat');
    if(btnBaslat) {
        btnBaslat.onclick = () => {
            const val = input ? input.value.trim() : "Kaptan";
            document.body.removeChild(overlay);
            callback(val !== "" ? val : "Misafir Yarışmacı");
        };
    }
    
    const btnMisafir = document.getElementById('f-misafir');
    if(btnMisafir) {
        btnMisafir.onclick = () => {
            document.body.removeChild(overlay);
            callback("Misafir Yarışmacı");
        };
    }
    
    if(input) {
        input.onkeydown = (e) => { if(e.key === "Enter" && btnBaslat) btnBaslat.click(); };
    }
}

// --- DİNAMİK PUAN FORMATLAYICI (SADECE LİDERLİK TABLOSUNDA ÇALIŞIR) ---
function formatScore(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    return num.toString();
}

// --- ZAMAN KONTROLLERİ VE 1 EYLÜL SIFIRLAMASI ---
function getWeekId(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return `${d.getFullYear()}-W${weekNo}`;
}

function getMonthId(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
}

function getSeasonId(date) {
    const year = date.getFullYear();
    const month = date.getMonth(); 
    if (month >= 8) {
        return `${year}-${year + 1}`;
    } else {
        return `${year - 1}-${year}`;
    }
}

// --- 1. SES MOTORU ---
const sfx = {
    correct: new Audio('sesler/dogru.mp3'),
    wrong: new Audio('sesler/yanlis.mp3'),
    drum: new Audio('sesler/heyecan.mp3'),
    cheer: new Audio('sesler/sampiyon.mp3'),
    bgm: new Audio('sesler/arkaplan.mp3'),
    tick: new Audio('sesler/sure.mp3') 
};
sfx.bgm.loop = true; 

const topControls = document.querySelector('.top-controls');
const volumeSlider = document.getElementById('volume-slider');
const muteBtn = document.getElementById('mute-btn');
let isMuted = false; 
let globalVolume = 0.7;

let audioUnlocked = false;
const unlockAudio = () => {
    if (!audioUnlocked) {
        for (let key in sfx) { sfx[key].load(); }
        audioUnlocked = true;
        document.body.removeEventListener('click', unlockAudio);
        document.body.removeEventListener('touchstart', unlockAudio);
    }
};

document.body.addEventListener('click', unlockAudio, { once: true });
document.body.addEventListener('touchstart', unlockAudio, { once: true });

if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        globalVolume = e.target.value / 100;
        if (muteBtn) muteBtn.className = globalVolume === 0 ? "fas fa-volume-mute" : "fas fa-volume-up";
        updateVolumes();
    });
}

if (muteBtn) {
    muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        muteBtn.className = isMuted ? "fas fa-volume-mute" : "fas fa-volume-up";
        updateVolumes();
    });
}

function updateVolumes() {
    for (let key in sfx) {
        sfx[key].muted = isMuted;
        if (key === 'bgm') { sfx[key].volume = isMuted ? 0 : (globalVolume * 0.5); } 
        else { sfx[key].volume = isMuted ? 0 : globalVolume; }
    }
}

// --- EVRENSEL TAM EKRAN (FULLSCREEN API) VE İKON SENKRONİZASYONU (KURAL 7.3) ---
function toggleGlobalFullscreen() {
    const elem = document.documentElement;
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    if (!isFull) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

function updateFullscreenIcons() {
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    const btns = [
        document.getElementById('btn-global-fullscreen'),
        document.getElementById('fullscreen-btn'),
        document.getElementById('btn-lab-fullscreen'),
        document.getElementById('btn-study-fullscreen')
    ];
    btns.forEach(btn => {
        if (!btn) return;
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = isFull ? 'fas fa-compress' : 'fas fa-expand';
        }
        btn.setAttribute('aria-pressed', isFull ? 'true' : 'false');
        btn.setAttribute('title', isFull ? 'Tam Ekrandan Çık' : 'Tam Ekran');
        btn.setAttribute('aria-label', isFull ? 'Tam Ekrandan Çık' : 'Tam Ekran');
    });
}

['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
    document.addEventListener(evt, updateFullscreenIcons);
});

const globalFsBtn = document.getElementById('btn-global-fullscreen') || document.getElementById('fullscreen-btn');
if (globalFsBtn) {
    globalFsBtn.onclick = toggleGlobalFullscreen;
}

function playSound(obj) { 
    if(!obj) return;
    if (obj === sfx.bgm && !obj.paused) { updateVolumes(); return; }
    try { obj.currentTime = 0; } catch(e){}
    updateVolumes(); 
    let playPromise = obj.play();
    if (playPromise !== undefined) playPromise.catch(()=>{});
}

function stopSound(obj) { 
    if(!obj) return;
    try { obj.pause(); obj.currentTime = 0; } catch(e){} 
}

// --- 2. YILDIZLI ARKA PLAN ---
const canvas = document.getElementById("starfield");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let stars = [];
    function resize() {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        stars = Array.from({length: 90}, () => ({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            r: Math.random() * 1.5, vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15,
            tw: Math.random() * Math.PI * 2, twSpeed: 0.02, base: 0.5
        }));
    }
    window.addEventListener('resize', resize); resize();
    function tick() {
        ctx.fillStyle = "#050505"; ctx.fillRect(0,0,canvas.width,canvas.height);
        stars.forEach(s => {
            s.x += s.vx; s.y += s.vy; s.tw += s.twSpeed;
            if(s.x<0) s.x=canvas.width; if(s.x>canvas.width) s.x=0;
            if(s.y<0) s.y=canvas.height; if(s.y>canvas.height) s.y=0;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
            ctx.fillStyle=`rgba(255,255,255,${s.base + Math.sin(s.tw)*0.3})`; ctx.fill();
        });
        requestAnimationFrame(tick);
    }
    tick();
}

// --- 3. SAHNE YÖNETİMİ ---
const scenes = {};
document.querySelectorAll('.scene').forEach(s => {
    let key = s.id.replace('scene-', '');
    key = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
    scenes[key] = s;
});

const btnHakkimizda = document.getElementById('btn-hakkimizda');
const btnIletisim = document.getElementById('btn-iletisim');
const mainFooter = document.getElementById('main-footer');
const userProfileArea = document.getElementById('user-profile-area');

// Tek DOM: hesap ve navigasyon kontrolleri masaüstüyle paylaşılır.
const mobileMenuButton = document.getElementById('btn-mobile-menu');
const headerNavigation = document.getElementById('header-navigation');
const mobileHeaderQuery = window.matchMedia('(max-width: 820px)');
function closeMobileMenu(restoreFocus = false) {
    if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'false');
    if (headerNavigation && mobileHeaderQuery.matches) headerNavigation.classList.add('is-hidden');
    const dropdown = document.getElementById('profile-dropdown');
    if (dropdown) dropdown.classList.add('is-hidden');
    if (restoreFocus && mobileMenuButton) mobileMenuButton.focus();
}
function syncMobileHeader() {
    closeMobileMenu();
    if (mobileMenuButton) mobileMenuButton.classList.toggle('is-hidden', !mobileHeaderQuery.matches);
    if (headerNavigation) headerNavigation.classList.toggle('is-hidden', mobileHeaderQuery.matches);
}
if (mobileMenuButton && headerNavigation) {
    mobileMenuButton.addEventListener('click', () => {
        const open = mobileMenuButton.getAttribute('aria-expanded') !== 'true';
        if (!open) { closeMobileMenu(); return; }
        mobileMenuButton.setAttribute('aria-expanded', 'true');
        headerNavigation.classList.remove('is-hidden');
    });
    headerNavigation.addEventListener('click', e => {
        const action = e.target.closest('button, a');
        // Oturum açıkken hesap düğmesi mevcut alt panelini açar.
        if (action && !(action.id === 'btn-uyelik' && action.querySelector('.profile-img-header'))) closeMobileMenu();
    }, true);
    document.addEventListener('click', e => {
        if (!e.target.closest('.top-header')) closeMobileMenu();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenuButton.getAttribute('aria-expanded') === 'true') closeMobileMenu(true);
    });
    mobileHeaderQuery.addEventListener('change', syncMobileHeader);
    syncMobileHeader();
}

// Ortak sahne katmanının History API bağlantısı; cevaplar yalnız sınav kaydındadır.
const navigation = (() => {
    let replaying = false;
    const safeIndex = value => Number.isSafeInteger(value) && value >= 0 ? value : 0;
    let index = safeIndex(history.state?.fenupx?.index);
    const entries = new Map();
    const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const snapshot = () => {
        const scene = document.querySelector('.scene:not(.is-hidden)')?.id || 'scene-home';
        return scene === 'scene-yazili' ? { scene, ...(window.FenUpExam?.getRoute() || { step: 'scope' }) } : { scene };
    };
    const url = route => '#' + [route.scene, route.step, route.mode].filter(Boolean).join('/');
    const readURL = () => {
        const [scene, step, mode] = location.hash.slice(1).split('/');
        return scene ? { scene, ...(step ? { step } : {}), ...(mode ? { mode } : {}) } : { scene: 'scene-home' };
    };
    function record(replace = false) {
        if (replaying) return;
        const route = snapshot();
        if (same(history.state?.fenupx?.route, route)) return;
        if (!replace) {
            index++;
            for (const k of entries.keys()) {
                if (k > index) entries.delete(k);
            }
        }
        entries.set(index, route);
        history[replace ? 'replaceState' : 'pushState']({ fenupx: { v: 1, index, route } }, '', url(route));
    }
    function cleanLayers() {
        closeMobileMenu();
        document.querySelectorAll('.modal-overlay.is-open, .modal-overlay.active').forEach(el => {
            el.classList.add('is-hidden'); el.classList.remove('is-open', 'active');
            el.style.display = 'none'; el.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
    }
    async function apply(route) {
        replaying = true;
        window.FenUpExam?.saveProgress();
        cleanLayers();
        try {
            const target = document.getElementById(route?.scene);
            if (!target?.classList.contains('scene')) route = { scene: 'scene-home' };
            if (route.scene === 'scene-home') returnToHome();
            else {
                showScene(route.scene);
                if (route.scene === 'scene-yazili') await window.FenUpExam?.openExamView({ route, intent: route.intent || 'popstate' });
                if (route.scene === 'lab-view') window.FenUpLab?.openLabView();
            }
        } finally {
            replaying = false;
            record(true);
            entries.set(index, snapshot());
            window.scrollTo(0, 0);
        }
    }
    function backTo(route) {
        if (replaying) return false;
        window.FenUpExam?.saveProgress();
        const candidates = [...entries].filter(([i, r]) => i < index && r.scene === route.scene && (!route.step || r.step === route.step));
        if (candidates.length) history.go(candidates.at(-1)[0] - index);
        else apply(route);
        return true;
    }
    window.addEventListener('popstate', e => {
        const saved = e.state?.fenupx;
        index = saved?.v === 1 ? safeIndex(saved.index) : 0;
        const route = saved?.v === 1 ? saved.route : readURL();
        if (route && route.scene === 'scene-yazili') {
            route.intent = 'popstate';
        }
        apply(route);
    });
    window.addEventListener('hashchange', () => {
        if (location.hash !== url(history.state?.fenupx?.route || {})) apply(readURL());
    });
    window.addEventListener('load', () => {
        history.scrollRestoration = 'manual';
        const saved = history.state?.fenupx;
        let route = saved?.v === 1 ? saved.route : readURL();
        if (route?.scene === 'scene-yazili') {
            // Soğuk açılış / yenileme: Modül sözleşmesi gereği daima scope ekranından başla
            route = { scene: 'scene-yazili', step: 'scope', intent: 'reload' };
        }
        entries.set(index, route);
        apply(route);
    }, { once: true });
    window.addEventListener('pageshow', e => {
        if (e.persisted) {
            cleanLayers();
        }
    });
    return { record, backTo, get replaying() { return replaying; } };
})();
window.FenUpNavigation = navigation;

function switchScene(from, to) {
    closeMobileMenu();
    if(!from || !to) return;
    if (from.id === 'scene-yazili' && to.id !== 'scene-yazili' && window.FenUpExam && typeof window.FenUpExam.closeExamView === "function") {
        window.FenUpExam.closeExamView();
    }
    from.classList.add('is-hidden');
    to.classList.remove('is-hidden');
    window.scrollTo(0, 0);
    
    const isHome = (to.id === "scene-home");
    document.querySelector('.top-header')?.classList.toggle('module-active', !isHome);
    const btnHeaderHome = document.getElementById('btn-header-home');
    if (btnHeaderHome) {
        btnHeaderHome.style.display = isHome ? "none" : "inline-flex";
    }
    if (isHome) {
        document.title = "FenUp X | Fen Bilimleri Platformu";
    } else if (to.id === "scene-yazili") {
        document.title = "Yazılıya Hazırlık | FenUp X";
    } else if (to.id === "lab-view") {
        document.title = "Sanal Laboratuvar | FenUp X";
    } else if (to.id === "scene-quiz" || to.id === "scene-tournament-quiz" || to.id === "scene-crossroads") {
        document.title = "Şampiyonlar Ligi | FenUp X";
    }
    if (btnHakkimizda && btnIletisim) {
        btnHakkimizda.style.display = isHome ? "block" : "none";
        btnIletisim.style.display = isHome ? "block" : "none";
    }
    if(userProfileArea) {
        userProfileArea.style.display = isHome ? "inline-block" : "none";
    }
    if (mainFooter) mainFooter.classList.remove('hidden-footer');

    const isQuiz = (to.id === "scene-quiz" || to.id === "scene-tournament-quiz");
    if (topControls) {
        if (isQuiz) {
            topControls.classList.remove('is-hidden');
            topControls.classList.add('is-visible');
            topControls.style.display = "flex";
        } else {
            topControls.classList.remove('is-visible');
            topControls.classList.add('is-hidden');
            topControls.style.display = "none";
            stopSound(sfx.bgm); 
        }
    }

    if (from && from.id === "scene-yazili" && to.id !== "scene-yazili") {
        if (window.FenUpExam && typeof window.FenUpExam.closeExamView === "function") {
            window.FenUpExam.closeExamView();
        }
    }

    if (!navigation.replaying) navigation.record();
    if (to.id === "scene-unit") {
        if (selectedGrade && typeof updateUnitCards === "function") updateUnitCards(selectedGrade);
        const lbSide = document.getElementById('unit-leaderboard-side');
        if (activeMode === "bireysel") {
            if(lbSide) lbSide.classList.remove('is-hidden');
            loadGlobalLeaderboard('weekly');
        } else {
            if(lbSide) lbSide.classList.add('is-hidden');
        }
    }
}

function showScene(sceneId) {
    const targetScene = (typeof sceneId === "string") ? (document.getElementById(sceneId) || scenes[sceneId]) : sceneId;
    if (!targetScene) return;
    const currentScene = document.querySelector('.scene:not(.is-hidden)');
    if (currentScene && currentScene !== targetScene) {
        switchScene(currentScene, targetScene);
    } else {
        targetScene.classList.remove('is-hidden');
        switchScene(targetScene, targetScene);
    }
}
window.switchScene = switchScene;
window.showScene = showScene;
window.scenes = scenes;
if (topControls) {
    topControls.classList.remove('is-visible');
    topControls.classList.add('is-hidden');
    topControls.style.display = "none";
} 

// --- 4. MASTER PAUSE ---
let isGlobalPaused = false;

const pauseOverlay = document.createElement('div');
pauseOverlay.id = "master-pause-overlay";
pauseOverlay.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.95); z-index:2000; display:flex; justify-content:center; align-items:center; flex-direction:column; backdrop-filter:blur(10px);";
pauseOverlay.innerHTML = `
    <i class="fas fa-pause-circle" style="font-size:7rem; color:#00d2ff; margin-bottom:20px;"></i>
    <h1 style="color:#fff; font-size:4.5rem; text-shadow:0 0 20px #00d2ff; margin:0; text-align:center;">YARIŞMA DURDURULDU</h1>
    <p style="color:#aaa; font-size:1.5rem; margin-top:10px; margin-bottom:30px;">Soru ve süre şu an kilitli durumda.</p>
    <button id="btn-master-resume" style="padding:15px 40px; font-size:2rem; font-weight:bold; border-radius:30px; background:#22c55e; color:#fff; border:none; cursor:pointer; box-shadow:0 0 25px rgba(34,197,94,0.6); display:flex; align-items:center; gap:10px; transition:0.3s;">
        <i class="fas fa-play"></i> KALDIĞI YERDEN DEVAM ET
    </button>
`;
pauseOverlay.classList.add('is-hidden');
document.body.appendChild(pauseOverlay);

const masterPauseBtn = document.createElement('button');
masterPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
masterPauseBtn.style.cssText = "background:transparent; border:none; color:#fff; font-size:1.5rem; cursor:pointer; margin-right:15px; transition:0.3s;";
masterPauseBtn.title = "Sistemi Duraklat";

if(topControls) topControls.prepend(masterPauseBtn);

function toggleMasterPause() {
    isGlobalPaused = !isGlobalPaused;
    masterPauseBtn.innerHTML = isGlobalPaused ? '<i class="fas fa-play" style="color:#22c55e;"></i>' :'<i class="fas fa-pause"></i>';
    pauseOverlay.classList.toggle('is-hidden', !isGlobalPaused);
    
    if(isGlobalPaused) {
        if(!sfx.bgm.paused) sfx.bgm.pause();
    } else {
        if(activeMode === "bireysel") {
            const bhOverlay = document.getElementById('blackhole-overlay');
            const isBlackholeHidden = bhOverlay && bhOverlay.classList.contains('is-hidden');
            if (!isTimerPaused && isBlackholeHidden && !quizState.locked) playSound(sfx.bgm);
        } else if (activeMode === "turnuva") {
            if(!tState.isEvaluating && !tState.isDuelFinished) playSound(sfx.bgm);
        }
    }
}

if(masterPauseBtn) masterPauseBtn.onclick = toggleMasterPause;
const btnMasterResume = document.getElementById('btn-master-resume');
if(btnMasterResume) btnMasterResume.onclick = toggleMasterPause;

// --- 5. MENÜ YÖNLENDİRMELERİ ---
let activeMode = "", selectedGrade = null, selectedUnit = null;
let usedQuestions = []; 

function returnToHome() {
    if (window.FenUpExam && typeof window.FenUpExam.closeExamView === "function") {
        window.FenUpExam.closeExamView();
    }
    if (navigation.backTo({ scene: 'scene-home' })) return;
    closeMobileMenu();
    document.querySelector('.top-header')?.classList.remove('module-active');
    if (window.FenUpLab && typeof window.FenUpLab.closeLabView === "function") {
        window.FenUpLab.closeLabView();
    }
    document.querySelectorAll('.scene').forEach(s => {
        if (s !== scenes.home) {
            s.classList.add('is-hidden');
        }
    });
    if (scenes.home) {
        scenes.home.classList.remove('is-hidden');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "FenUp X | Fen Bilimleri Platformu";
    
    const btnHeaderHome = document.getElementById('btn-header-home');
    if (btnHeaderHome) btnHeaderHome.style.display = "none";
    
    if (btnHakkimizda && btnIletisim) {
        btnHakkimizda.style.display = "block";
        btnIletisim.style.display = "block";
    }
    if (userProfileArea) {
        userProfileArea.style.display = "inline-block";
    }
    if (mainFooter) mainFooter.classList.remove('hidden-footer');
    if (topControls) {
        topControls.classList.remove('is-visible');
        topControls.classList.add('is-hidden');
        topControls.style.display = "none";
        stopSound(sfx.bgm);
    }
}
window.returnToHome = returnToHome;

// Marka ve Ana Sayfa için tek gezinme dinleyicisi.
document.addEventListener('click', (e) => {
    const brandTarget = e.target.closest('#site-logo-link, .site-brand-link');
    if (brandTarget) {
        e.preventDefault();
        returnToHome();
        return;
    }
    const homeTarget = e.target.closest('#btn-header-home');
    if (homeTarget) {
        e.preventDefault();
        returnToHome();
        return;
    }
});

if(btnHakkimizda) btnHakkimizda.onclick = () => showScene('scene-hakkimizda');
if(btnIletisim) btnIletisim.onclick = () => showScene('scene-iletisim');

const btnOyunModulu = document.getElementById('btn-oyun-modulu');
if(btnOyunModulu) btnOyunModulu.onclick = () => switchScene(scenes.home, scenes.crossroads);

const btnDeneyModulu = document.getElementById('btn-deney-modulu');
if(btnDeneyModulu) btnDeneyModulu.onclick = () => {
    const labView = document.getElementById('lab-view');
    if (labView) {
        switchScene(scenes.home, labView);
        if (window.FenUpLab && typeof window.FenUpLab.openLabView === "function") {
            window.FenUpLab.openLabView();
        }
    }
};

const btnYaziliModulu = document.getElementById('btn-yazili-modulu');
if(btnYaziliModulu) btnYaziliModulu.onclick = () => {
    const sceneYazili = document.getElementById('scene-yazili');
    if (sceneYazili) {
        if (window.FenUpExam && typeof window.FenUpExam.prepareModuleEntry === "function") {
            window.FenUpExam.prepareModuleEntry();
        }
        switchScene(scenes.home, sceneYazili);
        if (window.FenUpExam && typeof window.FenUpExam.openExamView === "function") {
            window.FenUpExam.openExamView({ entry: true });
        }
    }
};

const btnModeBireysel = document.getElementById('btn-mode-bireysel');
if(btnModeBireysel) btnModeBireysel.onclick = () => {
    activeMode = "bireysel";
    const ldb = document.getElementById('lobby-draw-box');
    if (ldb) ldb.classList.add('is-hidden');
    switchScene(scenes.crossroads, scenes.lobby);
};

const btnModeTurnuva = document.getElementById('btn-mode-turnuva');
if(btnModeTurnuva) btnModeTurnuva.onclick = () => { activeMode = "turnuva"; initTournamentLobby(); switchScene(scenes.crossroads, scenes.tournamentLobby); };

document.querySelectorAll('.btn-back-home:not(#btn-exam-step-back)').forEach(btn => {
    btn.addEventListener('click', e => {
        if (e.target.closest('#btn-exam-step-back')) return;
        e.stopImmediatePropagation();
        returnToHome();
    }, true);
});
document.querySelectorAll('.btn-back-cross').forEach(btn => btn.onclick = () => navigation.backTo({ scene: scenes.crossroads.id }));

const btnBackClass = document.getElementById('btn-back-class');
if(btnBackClass) btnBackClass.onclick = () => navigation.backTo({ scene: scenes.class.id });

const btnBackRules = document.getElementById('btn-back-rules');
if(btnBackRules) btnBackRules.onclick = () => navigation.backTo({ scene: scenes.unit.id });

let drawBag = []; let currentDrawSize = 0; let currentActivePlayerName = "Misafir"; let individualLeaderboard = [];

const btnKuraBaslat = document.getElementById('btn-kura-baslat');
if(btnKuraBaslat) {
    btnKuraBaslat.onclick = async () => {
        const lobbySizeEl = document.getElementById('lobby-size');
        const size = lobbySizeEl ? parseInt(lobbySizeEl.value) : 0;
        if(!size) return alert("Lütfen sınıf mevcudu giriniz.");
        if(size !== currentDrawSize || drawBag.length === 0) { drawBag = Array.from({length: size}, (_, i) => i + 1); currentDrawSize = size; }
        
        const user = auth.currentUser;
        const playerInput = document.getElementById('player-name-input');
        if (user) {
            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists() && userSnap.data().nickname && playerInput) {
                    playerInput.value = userSnap.data().nickname;
                } else if(playerInput) {
                    playerInput.value = "";
                }
            } catch(e) { if(playerInput) playerInput.value = ""; }
        } else if(playerInput) {
            playerInput.value = "";
        }
        
        switchScene(scenes.lobby, scenes.draw);
        let count = 0, interval = setInterval(() => {
            const drawCounter = document.getElementById('draw-counter');
            if(drawCounter) drawCounter.textContent = Math.floor(Math.random() * size) + 1;
            if(++count > 20) { 
                clearInterval(interval); playSound(sfx.correct); 
                const picked = drawBag.splice(Math.floor(Math.random() * drawBag.length), 1)[0];
                if(drawCounter) drawCounter.textContent = picked; 
                const drawRem = document.getElementById('draw-remaining');
                if(drawRem) drawRem.textContent = `Torbadaki Kalan Kişi Sayısı: ${drawBag.length}`; 
                const drawActions = document.getElementById('draw-actions');
                if(drawActions) drawActions.classList.remove('is-hidden'); 
            }
        }, 50);
    };
}

const btnNewDraw = document.getElementById('btn-new-draw');
if(btnNewDraw) {
    btnNewDraw.onclick = () => { 
        if(drawBag.length === 0) { alert("Torbada kimse kalmadı! Torba sıfırlanıyor..."); drawBag = Array.from({length: currentDrawSize}, (_, i) => i + 1); } 
        const drawActions = document.getElementById('draw-actions');
        if(drawActions) drawActions.classList.add('is-hidden'); 
        if(btnKuraBaslat) btnKuraBaslat.click(); 
    };
}

const btnGoClass = document.getElementById('btn-go-class');
if(btnGoClass) {
    btnGoClass.onclick = () => { 
        const pInput = document.getElementById('player-name-input');
        const dCounter = document.getElementById('draw-counter');
        let rawName = (pInput && pInput.value.trim()) || `${dCounter ? dCounter.textContent : '1'} Numara`;
        if(!uygunIsimMi(rawName) && !rawName.includes("Numara")) {
            alert("Girilen yarışmacı adı kurallara aykırı!");
            return;
        }
        currentActivePlayerName = rawName; 
        switchScene(scenes.draw, scenes.class); 
    };
}

const handleSkipDraw = async () => {
    const pNickEl = document.getElementById('p-nickname');
    const cachedNick = pNickEl ? pNickEl.value.trim() : "";
    currentActivePlayerName = cachedNick || "Misafir Yarışmacı";
    switchScene(scenes.lobby, scenes.class);

    const user = auth.currentUser;
    if (user && !cachedNick) {
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const uData = userSnap.data();
                const resolvedName = (uData.nickname && uData.nickname.trim()) || (uData.name && uData.name.trim());
                if (resolvedName && uygunIsimMi(resolvedName)) {
                    currentActivePlayerName = resolvedName;
                }
            }
        } catch (e) {}
    }
};

const btnSkipDraw = document.getElementById('btn-skip-draw');
if (btnSkipDraw) {
    btnSkipDraw.onclick = handleSkipDraw;
}

const btnDoDraw = document.getElementById('btn-do-draw');
if (btnDoDraw) {
    btnDoDraw.onclick = () => {
        const ldb = document.getElementById('lobby-draw-box');
        const lobbySizeEl = document.getElementById('lobby-size');
        if (ldb && ldb.classList.contains('is-hidden')) {
            ldb.classList.remove('is-hidden');
            if (lobbySizeEl) lobbySizeEl.focus();
        } else if (lobbySizeEl && parseInt(lobbySizeEl.value, 10) > 0 && btnKuraBaslat) {
            btnKuraBaslat.click();
        } else if (lobbySizeEl) {
            lobbySizeEl.focus();
        }
    };
}

const lobbySizeInput = document.getElementById('lobby-size');
if (lobbySizeInput) {
    lobbySizeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && btnKuraBaslat) {
            e.preventDefault();
            btnKuraBaslat.click();
        }
    });
}

const unitNamesByGrade = {
    "5": {
        "1": "Gökyüzündeki Komşularımız ve Biz",
        "2": "Kuvveti Tanıyalım",
        "3": "Canlıların Yapısına Yolculuk",
        "4": "Işığın Dünyası",
        "5": "Maddenin Doğası",
        "6": "Yaşamımızda Elektrik",
        "7": "Sürdürülebilir Yaşam ve Geri Dönüşüm"
    },
    "6": {
        "1": "Güneş Sistemi ve Tutulmalar",
        "2": "Kuvvetin Etkisinde Hareket",
        "3": "Canlılarda Sistemler",
        "4": "Işığın Yansıması ve Renkler",
        "5": "Maddenin Ayırt Edici Özellikleri",
        "6": "Elektriğin İletimi ve Direnç",
        "7": "Sürdürülebilir Yaşam ve Etkileşim"
    },
    "7": {
        "1": "Uzay Çağı",
        "2": "Kuvvet ve Enerjiyi Keşfedelim",
        "3": "Vücudumuzdaki Sistemler",
        "4": "Işığın Kırılması ve Mercekler",
        "5": "Maddenin Doğasına Yolculuk",
        "6": "Elektriklenme",
        "7": "Sürdürülebilir Yaşam ve Enerji"
    }
};

function updateUnitCards(grade) {
    const names = unitNamesByGrade[String(grade)] || {};
    document.querySelectorAll('.unit-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        const u = card.dataset.unit;
        const title = names[u] || "";
        card.innerHTML = title 
            ? `<div class="unit-card-num">${u}. Ünite</div><div class="unit-card-title">${title}</div>`
            : `<div class="unit-card-num">${u}. Ünite</div>`;
    });
}

document.querySelectorAll('.class-card').forEach(c => {
    c.setAttribute('tabindex', '0');
    c.setAttribute('role', 'button');
    c.onclick = function() { 
        if(this.classList.contains('disabled')) return; 
        selectedGrade = this.dataset.grade; 
        prefetchGradeQuestions(selectedGrade);
        updateUnitCards(selectedGrade);
        switchScene(scenes.class, scenes.unit); 
    };
    c.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
            e.preventDefault();
            this.click();
        }
    });
});

document.querySelectorAll('.unit-card').forEach(u => {
    u.setAttribute('tabindex', '0');
    u.setAttribute('role', 'button');
    u.onclick = function() {
        selectedUnit = this.dataset.unit;
        showRulesScreen();
    };
    u.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
            e.preventDefault();
            this.click();
        }
    });
});

function showRulesScreen() {
    switchScene(scenes.unit, scenes.rules);
    const summaryBar = document.getElementById('rules-summary-bar');
    const content = document.getElementById('rules-content');
    if(!content) return;
    
    if (activeMode === "bireysel") {
        if (summaryBar) {
            summaryBar.innerHTML = `
                <div class="rules-summary-item"><i class="fas fa-list-ol"></i> <span>10 Soru</span></div>
                <div class="rules-summary-item"><i class="fas fa-magic"></i> <span>3 Başlangıç Jokeri</span></div>
                <div class="rules-summary-item"><i class="fas fa-bolt"></i> <span>Yanlış Cevapta Biter</span></div>
                <div class="rules-summary-item rules-summary-danger"><i class="fas fa-circle-notch"></i> <span>Kara Delik Tehlikesi</span></div>
            `;
        }
        content.innerHTML = `
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 15px;"><i class="fas fa-bullseye" style="color:#22c55e; margin-right:10px; width: 25px;"></i> <b>Puanlama ve Süre:</b> Toplam 10 soru seni bekliyor. İlk 4 soru 100 puan (40 sn), 5-8. sorular 200 puan (50 sn), finaldeki son 2 soru ise 400 puan (60 sn) değerindedir.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-stopwatch" style="color:#00d2ff; margin-right:10px; width: 25px;"></i> <b>Hız Eşittir Puan:</b> Sadece doğru bilmek yetmez! Liderlik tablosuna girmek için soruları olabildiğince <b>hızlı</b> cevaplamalısın. Kalan her saniye ekstra 5 puan olarak hanene yazılır! Misafir veya üye fark etmeksizin herkes bu kurala tabidir.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-calendar-check" style="color:#f472b6; margin-right:10px; width: 25px;"></i> <b>Günlük Kota Sistemi:</b> Aynı üniteden gün içinde elde ettiğin yalnızca <b>en yüksek 3 skor</b> hanene yazılır. Daha fazla puan kazanmak için farklı üniteleri de tamamlaman gerekir!</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-heart-crack" style="color:#ef4444; margin-right:10px; width: 25px;"></i> <b>Hata Affetmez:</b> Jokerlerin dışında, herhangi bir soruya yanlış cevap verdiğin veya süreyi geçirdiğin anda yarışmaya veda edersin.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-magic" style="color:#9d50bb; margin-right:10px; width: 25px;"></i> <b>Kurtarıcı Jokerler:</b> 50:50, İpucu ve Pas haklarını iyi değerlendir. 4. soruyu geçersen çok özel 'Zamanı Durdur' jokeri de aktifleşir.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-meteor" style="color:#f59e0b; margin-right:10px; width: 25px;"></i> <b>Kara Delik (9. ve 10. Sorular):</b> 8. soruyu başarıyla geçtikten sonra Kara Delik bölgesi başlar! Son iki zorlu soruda istersen o ana kadar topladığın puanı kasaya kilitleyip yarışmadan çekilebilirsin. "Riski alıyorum" deyip devam edersen ve yanlış yaparsan, Kara Delik puanının <b>yarısını</b> yutar ve elenirsin!</li>
            </ul>`;
    } else {
        if (summaryBar) {
            summaryBar.innerHTML = `
                <div class="rules-summary-item"><i class="fas fa-users"></i> <span>Sınıf İçi Karşılaşma</span></div>
                <div class="rules-summary-item"><i class="fas fa-sync-alt"></i> <span>Tur Usulü / Sırayla Yarışma</span></div>
                <div class="rules-summary-item"><i class="fas fa-chart-line"></i> <span>En Yüksek Skor Kazanır</span></div>
                <div class="rules-summary-item rules-summary-danger"><i class="fas fa-trophy"></i> <span>Kupa & Şampiyonluk</span></div>
            `;
        }
        content.innerHTML = `
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 15px;"><i class="fas fa-chart-line" style="color:#22c55e; margin-right:10px; width: 25px;"></i> <b>Puanlama:</b> Takımlar 10 soruluk bir maratona çıkar. Soruların değeri giderek artar: İlk 4 soru 100 puan, 5-8. sorular 200 puan, 9. ve 10. sorular ise tam 400 puan değerindedir. (Tüm sorular için süre 45 saniyedir).</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-exclamation-triangle" style="color:#ef4444; margin-right:10px; width: 25px;"></i> <b>Ceza Sistemi:</b> Yanlış cevap vermenin veya boş bırakmanın ağır bir cezası vardır! Hatalı durumlarda o sorunun değerinin <b>yarısı</b> silinir. (1-4. Sorularda: <b>-50 Puan</b>, 5-8. Sorularda: <b>-100 Puan</b>, 9-10. Sorularda: <b>-200 Puan</b>). Puanınız eksiye bile düşebilir!</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-stopwatch" style="color:#00d2ff; margin-right:10px; width: 25px;"></i> <b>Süreyi Erken Bitirme:</b> Süre bitmeden soruyu çözen takımlar, <b>takım sözcüsü</b> aracılığıyla el kaldırarak veya kalem bırakarak bitirdiğini belli eder. Tüm takımlar süreden önce bitirirse öğretmen süreyi erken sonlandırabilir.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-fire" style="color:#f59e0b; margin-right:10px; width: 25px;"></i> <b>Alev Modu (Combo):</b> Üst üste 4 soruyu doğru cevaplayan takım "Alev Alır"! Seri bozulana kadar takımın bildiği her soruda kasasına normal puana ek olarak <b>+50 Bonus Puan</b> eklenir.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-user-secret" style="color:#9ca3af; margin-right:10px; width: 25px;"></i> <b>Gizemli Tablo:</b> Rakiplerin puanlarını yarışma esnasında göremezsiniz. Puan tablosu yalnızca 4. sorudan, 8. sorudan ve 10. sorudan sonra büyük bir yüzleşme ile ekrana gelir.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-bolt" style="color:#9d50bb; margin-right:10px; width: 25px;"></i> <b>Düello Modu:</b> 10 soru sonunda puanı eşit olan lider takımlar varsa başlar! Her takımdan <b>sadece bir temsilci</b> akıllı tahtanın önüne gelir. Tahtadaki doğru şıkka <b>ilk dokunan temsilci, takımını şampiyon yapar!</b> Yanlış şıkka dokunan takım anında elenir.</li>
            </ul>`;
    }
}

const btnStartRules = document.getElementById('btn-start-from-rules');
if(btnStartRules) {
    btnStartRules.onclick = function() {
        const btn = this;
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.innerHTML = "Hazırlanıyor...";
        
        playSound(sfx.bgm);

        if (activeMode === "bireysel") {
            startIndividual().then(() => { 
                btn.disabled = false; 
                btn.style.opacity = "1";
                btn.innerHTML = "OKUDUM, YARIŞMAYI BAŞLAT!"; 
            });
        } else if (activeMode === "turnuva") {
            startTournament().then(() => { 
                btn.disabled = false; 
                btn.style.opacity = "1";
                btn.innerHTML = "OKUDUM, YARIŞMAYI BAŞLAT!"; 
            });
        }
    };
}

// --- SORU HAVUZU ÖNBELLEK VE KARIŞTIRMA MOTORU ---
const questionPoolCache = {};

async function loadGradePool(grade) {
    const gKey = String(grade);
    if (questionPoolCache[gKey]) {
        return questionPoolCache[gKey];
    }
    try {
        const res = await fetch(`${gKey}_sinif_sorular.json`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = data && Array.isArray(data.questions) ? data.questions : (Array.isArray(data) ? data : []);
        questionPoolCache[gKey] = list;
        return list;
    } catch (err) {
        console.error(`Soru havuzu yükleme hatası (${gKey}. sınıf):`, err);
        return [];
    }
}

function prefetchGradeQuestions(grade) {
    if (!grade) return;
    const gKey = String(grade);
    if (!questionPoolCache[gKey]) {
        loadGradePool(gKey).catch(err => console.warn("Ön yükleme uyarısı:", err));
    }
}

function cloneAndShuffleQuestion(rawQ) {
    if (!rawQ) return null;
    const clonedOptions = Array.isArray(rawQ.answerOptions)
        ? rawQ.answerOptions.map(opt => ({ ...opt }))
        : [];
    
    // Fisher-Yates karıştırma algoritması
    for (let i = clonedOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = clonedOptions[i];
        clonedOptions[i] = clonedOptions[j];
        clonedOptions[j] = temp;
    }

    return {
        ...rawQ,
        answerOptions: clonedOptions
    };
}

async function fetchQuestions(grade, unit) {
    try {
        const poolData = await loadGradePool(grade);
        const allPool = poolData.filter(q => String(q.grade) === String(grade) && String(q.unit) === String(unit));
        
        quizState.fullPool = allPool; 

        if(allPool.length === 0) { alert(`Soru bulunamadı.`); return []; }
        
        let availablePool = allPool.filter(q => !usedQuestions.some(uq => uq.question === q.question));
        
        let e = availablePool.filter(q => String(q.difficulty) === "1").length;
        let m = availablePool.filter(q => String(q.difficulty) === "2").length;
        let h = availablePool.filter(q => String(q.difficulty) === "3").length;

        if (e < 4 || m < 4 || h < 2) {
            usedQuestions = []; 
            availablePool = allPool; 
        }

        const easy = availablePool.filter(q => String(q.difficulty) === "1").sort(() => Math.random() - 0.5);
        const mid = availablePool.filter(q => String(q.difficulty) === "2").sort(() => Math.random() - 0.5);
        const hard = availablePool.filter(q => String(q.difficulty) === "3").sort(() => Math.random() - 0.5);
        
        let rawSelected = [].concat(easy.slice(0, 4), mid.slice(0, 4), hard.slice(0, 2));
        
        if(rawSelected.length < 10) { 
            const remaining = availablePool.filter(q => !rawSelected.includes(q)).sort(() => Math.random() - 0.5); 
            rawSelected = rawSelected.concat(remaining.slice(0, 10 - rawSelected.length)); 
        }

        // Deep clone & Fisher-Yates karıştırma garantisi
        const finalSet = rawSelected.map(cloneAndShuffleQuestion);

        usedQuestions.push(...rawSelected);
        return finalSet;
    } catch(e) { 
        console.error("fetchQuestions hatası:", e);
        return []; 
    }
}

const quizState = { set: [], index: 0, score: 0, locked: false, timerInterval: null, totalTimeSpent: 0, riskAcceptedForCurrent: false, fullPool: [], currentTimeLeft: 0 };
let isTimerPaused = false;
let sessionMistakes = [];

function escapeReviewHtml(str) {
    return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function recordSessionMistake(chosenAnswerText) {
    const currentQ = quizState.set[quizState.index];
    if (!currentQ) return;
    const opts = Array.isArray(currentQ.answerOptions) ? currentQ.answerOptions : [];
    const correctIdx = opts.findIndex(o => o && o.isCorrect);
    const correctLetter = ["A", "B", "C", "D"][correctIdx] || "";
    const correctOpt = correctIdx >= 0 ? opts[correctIdx] : null;
    const correctFormatted = correctOpt
        ? (correctLetter ? `${correctLetter}) ${correctOpt.text}` : correctOpt.text)
        : "";
    sessionMistakes.push({
        question: currentQ.question || "",
        chosenAnswer: chosenAnswerText || "Belirtilmedi",
        correctAnswer: correctFormatted,
        hint: currentQ.hint || "Bu soru için çözüm ipucu bulunmuyor."
    });
}

function buildQuestionReviewHTML() {
    if (sessionMistakes.length === 0) {
        return `
            <div class="question-review-card review-perfect-card">
                <div class="review-module-header">
                    <span class="review-module-badge"><i class="fas fa-microscope"></i> Soru Çözüm Analizi</span>
                </div>
                <p class="review-perfect-text">🌟 Harika! Tüm soruları doğru tamamladın.</p>
            </div>
        `;
    }
    const itemsHtml = sessionMistakes.map(m => `
        <div class="review-mistake-item">
            <p class="review-question-text">${escapeReviewHtml(m.question)}</p>
            <div class="review-options-grid">
                <div class="review-wrong-opt">
                    <span class="review-opt-label">❌ İşaretlenen Yanlış Şık:</span>
                    <span class="review-opt-val">${escapeReviewHtml(m.chosenAnswer)}</span>
                </div>
                <div class="review-correct-opt">
                    <span class="review-opt-label">✅ Doğru Şık:</span>
                    <span class="review-opt-val">${escapeReviewHtml(m.correctAnswer)}</span>
                </div>
            </div>
            <div class="review-hint-box">
                <div class="review-hint-title"><i class="fas fa-lightbulb"></i> Ders Kitabı İpucu / Çözüm Notu</div>
                <p class="review-hint-text">${escapeReviewHtml(m.hint)}</p>
            </div>
        </div>
    `).join("");

    return `
        <details class="question-review-card" open>
            <summary class="review-accordion-summary">
                <span class="review-summary-title">📖 Yanlış Yaptığın Soru ve Çözüm Notu</span>
                <span class="review-module-badge"><i class="fas fa-microscope"></i> Soru Çözüm Analizi</span>
            </summary>
            <div class="review-accordion-body">
                ${itemsHtml}
            </div>
        </details>
    `;
}

function getSettings(idx) { return idx < 4 ? { time: 40, points: 100 } : idx < 8 ? { time: 50, points: 200 } : { time: 60, points: 400 }; }

async function startIndividual() {
    quizState.set = await fetchQuestions(selectedGrade, selectedUnit); if(quizState.set.length === 0) return;
    sessionMistakes = [];
    const qeRev = document.getElementById('quiz-end-review-container');
    if (qeRev) { qeRev.innerHTML = ""; qeRev.classList.add('is-hidden'); }
    quizState.index = 0; quizState.score = 0; quizState.totalTimeSpent = 0; quizState.currentTimeLeft = 0; quizState.riskAcceptedForCurrent = false; isTimerPaused = false;
    document.querySelectorAll('.joker-area button').forEach(btn => { btn.classList.remove('is-used', 'joker-spawn-anim'); btn.style.opacity = "1"; btn.style.pointerEvents = "auto"; btn.style.background = ""; });
    const jPause = document.getElementById('joker-pause');
    if(jPause) { jPause.classList.add('is-hidden'); jPause.innerHTML = "Zamanı Durdur"; }
    const qHint = document.getElementById('quiz-hint');
    if(qHint) qHint.classList.add('is-hidden');
    switchScene(scenes.rules, scenes.quiz); renderIndividual();
}

function renderIndividual() {
    if(document.activeElement) document.activeElement.blur(); 

    if (quizState.index >= 8 && !quizState.riskAcceptedForCurrent) { showBlackHoleWarning(); return; }
    const q = quizState.set[quizState.index]; const settings = getSettings(quizState.index);
    quizState.locked = false; isTimerPaused = false; 
    
    const timerDisplay = document.getElementById('quiz-timer-display');
    if(timerDisplay) { timerDisplay.style.color = "#00d2ff"; timerDisplay.style.textShadow = "none"; }
    
    playSound(sfx.bgm);
    
    const qProg = document.getElementById('quiz-progress');
    if(qProg) qProg.textContent = `Soru ${quizState.index + 1}/10 (${settings.points} Puan)`;
    
    const qScore = document.getElementById('quiz-score');
    if(qScore) qScore.textContent = quizState.score; 
    
    const qQuestion = document.getElementById('quiz-question');
    if(qQuestion) qQuestion.textContent = q.question;
    
    const pauseBtn = document.getElementById('joker-pause');
    if(pauseBtn) {
        if (pauseBtn.classList.contains('is-used')) { pauseBtn.innerHTML = "Kullanıldı"; pauseBtn.style.background = ""; pauseBtn.style.opacity = "0.5"; pauseBtn.style.pointerEvents = "none"; } else if (quizState.index >= 4) { if (pauseBtn.classList.contains('is-hidden')) { pauseBtn.classList.remove('is-hidden'); pauseBtn.classList.add('joker-spawn-anim'); } }
    }
    
    const qHint2 = document.getElementById('quiz-hint');
    if(qHint2) qHint2.classList.add('is-hidden');
    
    document.querySelectorAll('.answer-btn').forEach((btn, i) => { 
        btn.blur(); 
        btn.classList.remove('is-correct', 'is-wrong', 'is-pending', 'is-hidden'); 
        const ansText = btn.querySelector('.answer-text');
        if(ansText && q.answerOptions[i]) ansText.textContent = q.answerOptions[i].text; 
        if(q.answerOptions[i]) btn.dataset.correct = q.answerOptions[i].isCorrect; 
    });
    startIndividualTimer(settings.time);
}

function showBlackHoleWarning() {
    stopSound(sfx.bgm);
    const curScore = document.getElementById('bh-current-score');
    if(curScore) curScore.textContent = quizState.score; 
    const riskScore = document.getElementById('bh-risk-score');
    if(riskScore) riskScore.textContent = Math.floor(quizState.score / 2);
    const bhOverlay = document.getElementById('blackhole-overlay');
    if(bhOverlay) bhOverlay.classList.remove('is-hidden');
}

const btnBhWithdraw = document.getElementById('btn-bh-withdraw');
if(btnBhWithdraw) btnBhWithdraw.onclick = () => { const o = document.getElementById('blackhole-overlay'); if(o) o.classList.add('is-hidden'); finishIndividual("YARIŞMADAN ÇEKİLDİN!"); };

const btnBhContinue = document.getElementById('btn-bh-continue');
if(btnBhContinue) btnBhContinue.onclick = () => { const o = document.getElementById('blackhole-overlay'); if(o) o.classList.add('is-hidden'); quizState.riskAcceptedForCurrent = true; renderIndividual(); };

function startIndividualTimer(time) {
    let timeLeft = time; 
    quizState.currentTimeLeft = timeLeft;
    const tDisplay = document.getElementById('quiz-timer-display');
    if(tDisplay) tDisplay.textContent = timeLeft;
    clearInterval(quizState.timerInterval);
    quizState.timerInterval = setInterval(() => {
        if(quizState.locked || isTimerPaused || isGlobalPaused) return; 
        quizState.totalTimeSpent++; timeLeft--; 
        quizState.currentTimeLeft = timeLeft;
        if(tDisplay) tDisplay.textContent = timeLeft;
        if(timeLeft <= 10 && timeLeft > 0 && tDisplay) { tDisplay.style.color = "#ef4444"; tDisplay.style.textShadow = "0 0 15px #ef4444"; }
        if(timeLeft <= 0) { 
            clearInterval(quizState.timerInterval); playSound(sfx.wrong); quizState.locked = true;
            recordSessionMistake("Süre Doldu (Boş Bırakıldı)");
            if (quizState.index >= 8) { quizState.score = Math.floor(quizState.score / 2); setTimeout(() => finishIndividual("KARA DELİĞE YUTULDUN!"), 2000); } else { setTimeout(() => finishIndividual("SÜRE BİTTİ, ELENDİN!"), 2000); } 
        }
    }, 1000);
}

document.querySelectorAll('.answer-btn').forEach(btn => btn.onclick = function() {
    if(quizState.locked || isGlobalPaused) return;
    this.blur(); 
    
    quizState.locked = true; clearInterval(quizState.timerInterval); stopSound(sfx.bgm);
    const isCorrect = this.dataset.correct === "true"; this.classList.add('is-pending'); playSound(sfx.drum);
    
    setTimeout(() => { 
        stopSound(sfx.drum);
        if(isCorrect) { 
            this.classList.replace('is-pending', 'is-correct'); playSound(sfx.correct); 
            
            const basePoints = getSettings(quizState.index).points;
            const timeBonus = quizState.currentTimeLeft > 0 ? (quizState.currentTimeLeft * 5) : 0;
            quizState.score += (basePoints + timeBonus); 
            const scDisplay = document.getElementById('quiz-score');
            if(scDisplay) scDisplay.textContent = quizState.score;

            setTimeout(() => { 
                quizState.index++; quizState.riskAcceptedForCurrent = false; 
                if(quizState.index < 10) renderIndividual(); else finishIndividual("TEBRİKLER ŞAMPİYON!"); 
            }, 2500); 
        } else { 
            this.classList.replace('is-pending', 'is-wrong'); playSound(sfx.wrong); 
            document.querySelectorAll('.answer-btn').forEach(b => { if(b.dataset.correct === "true") b.classList.add('is-correct'); }); 
            const ansSpan = this.querySelector('.answer-text');
            const ansRaw = ansSpan ? ansSpan.textContent.trim() : this.textContent.trim();
            const chosenFormatted = this.dataset.choice ? `${this.dataset.choice}) ${ansRaw}` : ansRaw;
            recordSessionMistake(chosenFormatted);
            setTimeout(() => { 
                if (quizState.index >= 8) { quizState.score = Math.floor(quizState.score / 2); finishIndividual("KARA DELİĞE YUTULDUN!"); } else { finishIndividual("YANLIŞ CEVAP, ELENDİN!"); } 
            }, 3000); 
        }
    }, 3500); 
});

async function finishIndividual(msg) {
    if(document.activeElement) document.activeElement.blur();
    
    individualLeaderboard.push({ name: currentActivePlayerName, score: quizState.score, time: quizState.totalTimeSpent });
    
    const user = auth.currentUser;
    if (user && quizState.score > 0) {
        const hasGoogleProv = (user.providerData || []).some(p => p.providerId === 'google.com');
        if (!user.emailVerified && !hasGoogleProv) {
            try { await user.reload(); } catch(e) {}
        }
        const currentUserAfterReload = auth.currentUser || user;
        const isVerifiedNow = currentUserAfterReload.emailVerified === true || (currentUserAfterReload.providerData || []).some(p => p.providerId === 'google.com');
        if (!isVerifiedNow) {
            alert("Yarışmayı tamamladın! Puanının Şampiyonlar Ligi liderlik tablosuna kaydedilmesi için e-posta adresini doğrulaman gerekiyor. Profil menüsünden doğrulama bağlantısını tekrar gönderebilirsin.");
        } else {
        try {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const userData = userSnap.data();
                const now = new Date();
                const currentWeek = getWeekId(now);
                const currentMonth = getMonthId(now);
                const currentSeason = getSeasonId(now);
                
                const gradeSuffix = `_${selectedGrade}`;

                // --- GÜNLÜK ÜNİTE BAZLI LİMİT SİSTEMİ ---
                const todayStr = now.getFullYear() + "-" + (now.getMonth() + 1).toString().padStart(2, '0') + "-" + now.getDate().toString().padStart(2, '0');
                const unitKey = `${selectedGrade}_${selectedUnit}`;

                let dailyTracker = userData.dailyTracker || { date: todayStr, units: {} };
                if (dailyTracker.date !== todayStr) {
                    dailyTracker = { date: todayStr, units: {} };
                }
                if (!dailyTracker.units) dailyTracker.units = {};
                if (!dailyTracker.units[unitKey]) dailyTracker.units[unitKey] = [];

                let scoresArray = dailyTracker.units[unitKey];
                let scoreDiff = 0;

                if (scoresArray.length < 3) {
                    scoresArray.push(quizState.score);
                    scoreDiff = quizState.score;
                } else {
                    scoresArray.sort((a, b) => a - b);
                    if (quizState.score > scoresArray[0]) {
                        scoreDiff = quizState.score - scoresArray[0];
                        scoresArray[0] = quizState.score;
                    }
                }

                let updates = { dailyTracker: dailyTracker };

                if (scoreDiff > 0) {
                    updates.totalScore = (userData.totalScore || 0) + scoreDiff;
                    updates[`totalScore${gradeSuffix}`] = (userData[`totalScore${gradeSuffix}`] || 0) + scoreDiff;

                    if (userData[`lastWeekId${gradeSuffix}`] === currentWeek) {
                        updates[`weeklyScore${gradeSuffix}`] = (userData[`weeklyScore${gradeSuffix}`] || 0) + scoreDiff;
                    } else {
                        updates[`weeklyScore${gradeSuffix}`] = scoreDiff;
                        updates[`lastWeekId${gradeSuffix}`] = currentWeek;
                    }

                    if (userData[`lastMonthId${gradeSuffix}`] === currentMonth) {
                        updates[`monthlyScore${gradeSuffix}`] = (userData[`monthlyScore${gradeSuffix}`] || 0) + scoreDiff;
                    } else {
                        updates[`monthlyScore${gradeSuffix}`] = scoreDiff;
                        updates[`lastMonthId${gradeSuffix}`] = currentMonth;
                    }

                    if (userData[`lastSeasonId${gradeSuffix}`] === currentSeason) {
                        updates[`seasonScore${gradeSuffix}`] = (userData[`seasonScore${gradeSuffix}`] || 0) + scoreDiff;
                    } else {
                        updates[`seasonScore${gradeSuffix}`] = scoreDiff;
                        updates[`lastSeasonId${gradeSuffix}`] = currentSeason;
                    }
                }

                await updateDoc(userRef, updates);
            }
        } catch (e) { console.error("Puan kaydedilemedi:", e); }
        }
    }

    const quizEndEl = document.getElementById('quiz-end'); 
    const sceneQuiz = document.getElementById('scene-quiz');
    if(sceneQuiz && quizEndEl) {
        sceneQuiz.appendChild(quizEndEl); 
        quizEndEl.classList.remove('is-hidden');
    }
    
    const btnShowLb = document.getElementById('btn-show-leaderboard');
    if(btnShowLb) btnShowLb.style.display = "block"; 
    const qeTitle = document.getElementById('quiz-end-title');
    if(qeTitle) qeTitle.textContent = msg; 
    const qeScore = document.getElementById('quiz-end-score');
    if(qeScore) qeScore.textContent = `Final Puanın: ${quizState.score}`; 

    const reviewHtml = buildQuestionReviewHTML();
    const qeRev = document.getElementById('quiz-end-review-container');
    if (qeRev) {
        qeRev.innerHTML = reviewHtml;
        qeRev.classList.remove('is-hidden');
    }
    
    if(msg.includes("ŞAMPİYON") || msg.includes("ÇEKİLDİN")) playSound(sfx.cheer); else playSound(sfx.wrong);
}

const btnBackDraw = document.getElementById('btn-back-draw');
if(btnBackDraw) {
    btnBackDraw.onclick = () => { 
        stopSound(sfx.cheer); stopSound(sfx.wrong); 
        const quizEndEl = document.getElementById('quiz-end'); if(quizEndEl) quizEndEl.classList.add('is-hidden'); 
        const sq = document.getElementById('scene-quiz');
        if(sq && quizEndEl) sq.appendChild(quizEndEl); 
        if (activeMode === "bireysel") { const p = document.getElementById('player-name-input'); if(p) p.value = ""; switchScene(scenes.quiz, scenes.lobby); } else { switchScene(scenes.tournamentQuiz, scenes.tournamentLobby); } 
    };
}

const btnShowLb = document.getElementById('btn-show-leaderboard');
if(btnShowLb) {
    btnShowLb.onclick = () => { 
        stopSound(sfx.cheer); stopSound(sfx.wrong); const qe = document.getElementById('quiz-end'); if(qe) qe.classList.add('is-hidden'); 
        individualLeaderboard.sort((a, b) => b.score - a.score); 
        const list = document.getElementById('leaderboard-list'); if(list) { list.innerHTML = ''; 
            individualLeaderboard.forEach((p, i) => { 
                let rankColor = i === 0 ? "#f59e0b" : i === 1 ? "#9ca3af" : i === 2 ? "#b45309" : "rgba(255,255,255,0.1)"; 
                let badge = i === 0 ? "🥇 Galaksi Fatihi" : i === 1 ? "🥈 Yıldız Kaşifi" : i === 2 ? "🥉 Cesur Astronot" : "☄️ Uzay Yolcusu"; 
                list.innerHTML += `<div style="display: flex; justify-content: space-between; font-size: 1.6rem; margin: 10px 0; padding: 15px 25px; background: ${rankColor}; border-radius:15px; font-weight: bold; align-items: center;"><div style="display:flex; flex-direction:column;"><span>${i+1}. ${p.name}</span><span style="font-size: 1rem; color: ${i<3 ? '#000' : '#00d2ff'};">${badge}</span></div><div style="text-align: right; font-size: 1.6rem;"><span style="color: ${i<3 ? '#000' : '#fff'};">${p.score} Puan</span></div></div>`; 
            }); 
        }
        switchScene(scenes.quiz, scenes.leaderboard); 
    };
}

const btnLbContinue = document.getElementById('btn-leaderboard-continue');
if(btnLbContinue) btnLbContinue.onclick = () => { switchScene(scenes.leaderboard, scenes.lobby); };

const jokerHint = document.getElementById('joker-hint');
if(jokerHint) {
    jokerHint.onclick = function() { if(quizState.locked || isGlobalPaused || this.classList.contains('is-used')) return; this.blur(); this.classList.add('is-used'); this.style.opacity = "0.5"; this.style.pointerEvents = "none"; const qh = document.getElementById('quiz-hint'); if(qh) { qh.classList.remove('is-hidden'); qh.textContent = `💡 İpucu: ${quizState.set[quizState.index].hint}`; } };
}

const jokerFifty = document.getElementById('joker-fifty');
if(jokerFifty) {
    jokerFifty.onclick = function() { if(quizState.locked || isGlobalPaused || this.classList.contains('is-used')) return; this.blur(); this.classList.add('is-used'); this.style.opacity = "0.5"; this.style.pointerEvents = "none"; let hidden = 0; document.querySelectorAll('.answer-btn').forEach(btn => { if(btn.dataset.correct === "false" && hidden < 2) { btn.classList.add('is-hidden'); hidden++; } }); };
}

const jokerPause = document.getElementById('joker-pause');
if(jokerPause) {
    jokerPause.onclick = function() { if(quizState.locked || isGlobalPaused) return; this.blur(); if(!isTimerPaused) { isTimerPaused = true; this.innerHTML = "Süreyi Başlat ▶"; this.style.background = "#22c55e"; this.classList.add('is-used'); this.classList.remove('joker-spawn-anim'); stopSound(sfx.bgm); } else { isTimerPaused = false; this.innerHTML = "Kullanıldı"; this.style.background = ""; this.style.opacity = "0.5"; this.style.pointerEvents = "none"; playSound(sfx.bgm); } };
}

const jokerPass = document.getElementById('joker-pass');
if(jokerPass) {
    jokerPass.onclick = function() { 
        if(quizState.locked || isGlobalPaused || this.classList.contains('is-used')) return; 
        this.blur();
        const currentQ = quizState.set[quizState.index]; 
        const diff = String(currentQ.difficulty); 

        let availableSameDiff = quizState.fullPool.filter(q => 
            String(q.difficulty) === diff && 
            !quizState.set.some(sq => sq.question === q.question) && 
            !usedQuestions.some(uq => uq.question === q.question)
        ); 

        if(availableSameDiff.length === 0) {
            availableSameDiff = quizState.fullPool.filter(q => 
                String(q.difficulty) === diff && 
                !quizState.set.some(sq => sq.question === q.question)
            );
        }

        if (availableSameDiff.length > 0) { 
            const rawNewQ = availableSameDiff[Math.floor(Math.random() * availableSameDiff.length)]; 
            const newQ = cloneAndShuffleQuestion(rawNewQ);
            quizState.set[quizState.index] = newQ; 
            usedQuestions.push(rawNewQ);
            
            this.classList.add('is-used'); 
            this.style.opacity = "0.5"; 
            this.style.pointerEvents = "none";
            renderIndividual(); 
        } else {
            alert("Havuzda değiştirilebilecek başka soru kalmadı!");
        }
    };
}

// --- 7. TURNUVA MODU ---
const presetNames = ["Protonlar", "Atom Karıncalar", "Foton Fırtınası", "DNA Şifresi", "Kuantum Gücü", "Elementler", "Dinamolar", "Süpernovalar", "Hücre Muhafızları", "Galaksi Kaşifleri"];
let tTeams = [];
const tState = { questions: [], index: 0, locked: false, skipTimer: false, timerInterval: null, isEvaluating: false, isDuel: false, isDuelFinished: false, tiedTeams: [] };

function initTournamentLobby() {
    const countSelect = document.getElementById('group-count');
    const container = document.getElementById('group-names-container');
    const presetContainer = document.getElementById('preset-names');
    if(presetContainer) presetContainer.innerHTML = '';
    presetNames.forEach(name => {
        const btn = document.createElement('button'); btn.className = 'preset-btn'; btn.textContent = name;
        btn.onclick = () => { if(container) { const inputs = container.querySelectorAll('input'); for(let inp of inputs) { if(inp.value.trim() === '') { inp.value = name; break; } } } };
        if(presetContainer) presetContainer.appendChild(btn);
    });
    function renderInputs() {
        let count = countSelect ? parseInt(countSelect.value) : 4; if(container) container.innerHTML = '';
        for(let i=1; i<=count; i++) if(container) container.innerHTML += `<input type="text" id="t-name-${i}" placeholder="${i}. Grup İsmi" class="t-team-input">`;
    }
    if(countSelect) countSelect.onchange = renderInputs; renderInputs();
}

const btnStartTour = document.getElementById('btn-start-tournament');
if(btnStartTour) {
    btnStartTour.onclick = () => {
        const gc = document.getElementById('group-count');
        const count = gc ? parseInt(gc.value) : 4; tTeams = [];
        for(let i=1; i<=count; i++) { 
            const ti = document.getElementById(`t-name-${i}`);
            let name = ti ? ti.value.trim() : ''; if(!name) name = `${i}. Grup`; 
            if(!uygunIsimMi(name) && !name.includes(". Grup")) {
                alert(`${i}. Grup ismi topluluk kurallarına aykırı! Lütfen düzeltin.`);
                return;
            }
            tTeams.push({ id: i, name: name, score: 0, answer: null, isEliminated: false, consecutive: 0, isOnFire: false }); 
        }
        switchScene(scenes.tournamentLobby, scenes.class);
    };
}

async function startTournament() {
    const pool = await fetchQuestions(selectedGrade, selectedUnit); if(pool.length === 0) return;
    tState.questions = pool; tState.index = 0; tState.isDuel = false; tState.isDuelFinished = false; tState.tiedTeams = [];
    tTeams.forEach(t => { t.score = 0; t.isEliminated = false; t.answer = null; t.consecutive = 0; t.isOnFire = false; });
    const stq = document.getElementById('scene-tournament-quiz');
    if(stq) stq.classList.remove('duel-mode-active');
    switchScene(scenes.rules, scenes.tournamentQuiz); renderTournamentQuestion();
}

function renderTournamentQuestion() {
    if(document.activeElement) document.activeElement.blur(); 

    const q = tState.questions[tState.index];
    const currentPoints = tState.index < 4 ? 100 : tState.index < 8 ? 200 : 400;
    
    tState.locked = true; 
    tState.isEvaluating = false;
    tState.skipTimer = false;
    playSound(sfx.bgm);

    const el1 = document.getElementById('cards-overlay'); if(el1) el1.classList.add('is-hidden'); 
    const el2 = document.getElementById('t-teams-container'); if(el2) { el2.classList.add('is-hidden'); el2.innerHTML = ''; }
    const el3 = document.getElementById('btn-t-reveal'); if(el3) el3.classList.add('is-hidden');
    const el4 = document.getElementById('btn-t-next'); if(el4) el4.classList.add('is-hidden');
    const el5 = document.getElementById('btn-t-duel-start'); if(el5) el5.classList.add('is-hidden');
    const el6 = document.getElementById('t-status-text'); if(el6) el6.classList.add('is-hidden');
    const el7 = document.getElementById('t-timer-label'); if(el7) el7.classList.remove('is-hidden');
    const el8 = document.getElementById('t-timer-display'); if(el8) el8.classList.remove('is-hidden');

    document.querySelectorAll('.t-main-opt').forEach(opt => opt.classList.remove('highlight-correct'));
    
    const tqn = document.getElementById('t-question-number'); if(tqn) { tqn.textContent = `${tState.index + 1}/10`; tqn.style.color = "var(--neon-purple)"; }
    const tqp = document.getElementById('t-question-points'); if(tqp) tqp.textContent = `(${currentPoints} Puan)`; 
    const tqt = document.getElementById('t-question-text'); if(tqt) tqt.textContent = q.question;
    
    const skipBtn = document.getElementById('btn-t-skip-timer');
    if(skipBtn) { skipBtn.classList.remove('is-hidden'); skipBtn.onclick = () => { tState.skipTimer = true; }; }
    
    const optsDiv = document.getElementById('t-options-display');
    if(optsDiv) {
        optsDiv.style.display = "grid";
        const oa = document.getElementById('t-opt-A'); if(oa && q.answerOptions[0]) oa.innerHTML = `A) <span>${q.answerOptions[0].text}</span>`;
        const ob = document.getElementById('t-opt-B'); if(ob && q.answerOptions[1]) ob.innerHTML = `B) <span>${q.answerOptions[1].text}</span>`;
        const oc = document.getElementById('t-opt-C'); if(oc && q.answerOptions[2]) oc.innerHTML = `C) <span>${q.answerOptions[2].text}</span>`;
        const od = document.getElementById('t-opt-D'); if(od && q.answerOptions[3]) od.innerHTML = `D) <span>${q.answerOptions[3].text}</span>`;
    }

    startTournamentTimer(45);
}

const btnCardsSeen = document.getElementById('btn-cards-seen');
if(btnCardsSeen) {
    btnCardsSeen.onclick = () => {
        const co = document.getElementById('cards-overlay'); if(co) co.classList.add('is-hidden');
        revealTeamsForVoting();
    }
}

function revealTeamsForVoting() {
    const container = document.getElementById('t-teams-container');
    if(container) {
        container.innerHTML = '';
        container.classList.remove('is-hidden'); 
        
        tTeams.forEach(t => {
            if (tState.isDuel && t.isEliminated) return; 
            t.answer = null; 
            
            const card = document.createElement('div');
            card.className = `t-team-card tournament-group-card ${t.isEliminated ? 'eliminated' : ''} ${t.isOnFire ? 'on-fire' : ''}`;
            card.id = `t-card-${t.id}`;
            card.innerHTML = `
                <h3>${t.name}</h3>
                <div class="t-score" id="t-score-${t.id}"></div>
                <div class="t-answers active tournament-answers-group" id="t-ans-group-${t.id}">
                    <button class="t-ans-btn" data-tid="${t.id}" data-opt="A">A</button>
                    <button class="t-ans-btn" data-tid="${t.id}" data-opt="B">B</button>
                    <button class="t-ans-btn" data-tid="${t.id}" data-opt="C">C</button>
                    <button class="t-ans-btn" data-tid="${t.id}" data-opt="D">D</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    document.querySelectorAll('.t-ans-btn').forEach(btn => {
        let lastTap = 0;
        const handleAns = function(e) {
            const now = Date.now();
            if (now - lastTap < 250) return;
            lastTap = now;
            if (e.type === 'touchstart' && e.cancelable) { e.preventDefault(); }
            if (tState.locked) return; 
            this.blur(); 
            const tid = parseInt(this.dataset.tid);
            const team = tTeams.find(x => x.id === tid);
            if (team && team.isEliminated) return;

            if(team) team.answer = this.dataset.opt;
            const parent = this.parentElement;
            if(parent) parent.querySelectorAll('.t-ans-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');

            if(tState.isDuel && !tState.isDuelFinished) {
                evaluateDuel(team, this.dataset.opt, this);
            }
        };
        btn.addEventListener('pointerdown', handleAns);
        btn.onclick = handleAns;
    });

    const btr = document.getElementById('btn-t-reveal');
    if(btr) btr.classList.remove('is-hidden');
}

function startTournamentTimer(time) {
    let timeLeft = time;
    const display = document.getElementById('t-timer-display');
    if(display) { display.textContent = timeLeft; display.style.color = "#00d2ff"; }
    
    clearInterval(tState.timerInterval);
    tState.timerInterval = setInterval(() => {
        if(isGlobalPaused) return; 
        if(tState.skipTimer) timeLeft = 0; 
        else timeLeft--; 
        
        if(display) {
            display.textContent = timeLeft;
            if(timeLeft <= 10 && timeLeft > 0) display.style.color = "#ef4444";
        }
        
        if(timeLeft <= 0) { 
            clearInterval(tState.timerInterval); 
            stopSound(sfx.bgm); playSound(sfx.tick);
            
            const bst = document.getElementById('btn-t-skip-timer'); if(bst) bst.classList.add('is-hidden');
            tState.locked = false; 
            
            const co = document.getElementById('cards-overlay'); if(co) co.classList.remove('is-hidden'); 
        }
    }, 1000);
}

const btnTRev = document.getElementById('btn-t-reveal');
if(btnTRev) {
    btnTRev.onclick = () => {
        btnTRev.classList.add('is-hidden');
        tState.locked = true; 
        tState.isEvaluating = true;
        playSound(sfx.drum);

        setTimeout(() => {
            stopSound(sfx.drum);
            evaluateTournamentAnswers();
        }, 2000);
    };
}

function showFloatingPoint(parentCard, text, color) {
    if(!parentCard) return;
    const el = document.createElement('div');
    el.className = "floating-point";
    el.textContent = text;
    el.style.color = color;
    parentCard.appendChild(el);
    setTimeout(() => el.remove(), 2000);
}

function evaluateTournamentAnswers() {
    const q = tState.questions[tState.index];
    const basePoints = tState.index < 4 ? 100 : tState.index < 8 ? 200 : 400; 
    const penaltyPoints = basePoints / 2; 
    
    const correctOptIndex = q.answerOptions.findIndex(o => o.isCorrect);
    const correctLetter = ["A", "B", "C", "D"][correctOptIndex];
    
    const topt = document.getElementById(`t-opt-${correctLetter}`);
    if(topt) topt.classList.add('highlight-correct');
    
    let anyoneCorrect = false;

    tTeams.forEach(t => {
        const card = document.getElementById(`t-card-${t.id}`);
        const btnGroup = document.getElementById(`t-ans-group-${t.id}`);
        if(!card || !btnGroup) return;
        
        if (t.answer === correctLetter) {
            anyoneCorrect = true;
            let earnedPoints = basePoints;
            if (t.isOnFire) earnedPoints += 50; 
            t.score += earnedPoints;
            t.consecutive++;
            if (t.consecutive >= 4) t.isOnFire = true; 
            
            showFloatingPoint(card, `+${earnedPoints}`, "#22c55e");
            card.classList.add('correct-glow');
            const ab = btnGroup.querySelector(`[data-opt="${t.answer}"]`); if(ab) ab.classList.add('correct');
            
        } else if (!t.answer) {
            t.score -= penaltyPoints;
            t.consecutive = 0; t.isOnFire = false; 
            showFloatingPoint(card, `-${penaltyPoints}`, "#ef4444");
            card.classList.add('wrong-glow');
            btnGroup.innerHTML = `<div class="t-no-answer">CEVAP YOK<br></div>`;
        } else {
            t.score -= penaltyPoints;
            t.consecutive = 0; t.isOnFire = false; 
            showFloatingPoint(card, `-${penaltyPoints}`, "#ef4444");
            card.classList.add('wrong-glow');
            const ab1 = btnGroup.querySelector(`[data-opt="${t.answer}"]`); if(ab1) ab1.classList.add('wrong');
            const ab2 = btnGroup.querySelector(`[data-opt="${correctLetter}"]`); if(ab2) ab2.classList.add('correct');
        }
    });

    if (anyoneCorrect) playSound(sfx.correct); else playSound(sfx.wrong);

    setTimeout(() => {
        if (tState.index === 3 || tState.index === 7 || tState.index === 9) {
            showIntermediateLeaderboard();
        } else if (tState.index < 9) {
            tState.index++;
            const bn = document.getElementById('btn-t-next'); if(bn) bn.classList.remove('is-hidden');
        }
    }, 3500); 
}

function showIntermediateLeaderboard() {
    switchScene(scenes.tournamentQuiz, document.getElementById('scene-intermediate-leaderboard'));
    const list = document.getElementById('inter-leaderboard-list');
    if(!list) return;
    list.innerHTML = '';
    
    const sortedTeams = [...tTeams].sort((a, b) => b.score - a.score);
    
    sortedTeams.forEach((t, index) => {
        let rankColor = index === 0 ? "#f59e0b" : index === 1 ? "#9ca3af" : index === 2 ? "#b45309" : "rgba(255,255,255,0.1)";
        list.innerHTML += `
            <div class="slide-up-anim" style="display: flex; justify-content: space-between; font-size: 1.8rem; margin: 10px 0; padding: 20px 30px; background: ${rankColor}; border-radius:15px; font-weight: bold; align-items: center; border-left: 10px solid var(--neon-blue);">
                <span>${index + 1}. ${t.name} ${t.isOnFire ? '🔥' : ''}</span>
                <span style="color: ${index < 3 ? '#000' : 'var(--neon-blue)'};">${t.score} PUAN</span>
            </div>
        `;
    });

    const bic = document.getElementById('btn-inter-continue');
    if(bic) {
        if (tState.index === 9) bic.textContent = "ŞAMPİYONU BELİRLE!";
        else bic.textContent = "YARIŞMAYA DEVAM ET";
    }
}

const btnInterCont = document.getElementById('btn-inter-continue');
if(btnInterCont) {
    btnInterCont.onclick = () => {
        if (tState.index === 9) {
            switchScene(document.getElementById('scene-intermediate-leaderboard'), scenes.tournamentQuiz);
            let maxScore = Math.max(...tTeams.map(t => t.score));
            tState.tiedTeams = tTeams.filter(t => t.score === maxScore);

            if (tState.tiedTeams.length === 1) {
                endTournament(`${tState.tiedTeams[0].name} ŞAMPİYON OLDU!`, tState.tiedTeams[0].score);
            } else if (tState.tiedTeams.length > 1) {
                const tqn = document.getElementById('t-question-number'); if(tqn) { tqn.textContent = "ŞAMPİYONLUK DÜELLOSU"; tqn.style.color = "#f59e0b"; }
                const tqp = document.getElementById('t-question-points'); if(tqp) tqp.textContent = "";
                const tqt = document.getElementById('t-question-text'); if(tqt) tqt.textContent = "Puanlar Eşit! Şampiyonu belirlemek için Düello Modu'nu başlatın.";
                
                const to = document.getElementById('t-options-display'); if(to) to.style.display = "none";
                const ttc = document.getElementById('t-teams-container'); if(ttc) ttc.classList.add('is-hidden');
                
                const bs = document.getElementById('btn-t-skip-timer'); if(bs) bs.classList.add('is-hidden');
                const tl = document.getElementById('t-timer-label'); if(tl) tl.classList.add('is-hidden');
                const td = document.getElementById('t-timer-display'); if(td) td.classList.add('is-hidden');
                const ts = document.getElementById('t-status-text'); if(ts) ts.classList.add('is-hidden');
                
                const bd = document.getElementById('btn-t-duel-start'); if(bd) bd.classList.remove('is-hidden');
            }
        } else {
            tState.index++;
            switchScene(document.getElementById('scene-intermediate-leaderboard'), scenes.tournamentQuiz);
            renderTournamentQuestion();
        }
    };
}

const btnTNext = document.getElementById('btn-t-next');
if(btnTNext) btnTNext.onclick = () => { renderTournamentQuestion(); };

// --- BÜYÜK DÜELLO MANTIĞI ---
const btnTDuel = document.getElementById('btn-t-duel-start');
if(btnTDuel) {
    btnTDuel.onclick = async () => {
        tState.isDuel = true;
        const sq = document.getElementById('scene-tournament-quiz'); if(sq) sq.classList.add('duel-mode-active');
        
        const poolData = await loadGradePool(selectedGrade);
        let hardPool = poolData.filter(q => String(q.grade) === String(selectedGrade) && String(q.unit) === String(selectedUnit) && String(q.difficulty) === "3" && !usedQuestions.some(uq => uq.question === q.question));
        
        if(hardPool.length === 0) {
            hardPool = poolData.filter(q => String(q.grade) === String(selectedGrade) && String(q.unit) === String(selectedUnit) && String(q.difficulty) === "3");
            const lastQ = tState.questions[tState.index]; 
            hardPool = hardPool.filter(q => q.question !== lastQ.question); 
        }
        
        const rawDuelQ = hardPool.length > 0 ? hardPool[Math.floor(Math.random() * hardPool.length)] : tState.questions[0]; 
        const duelQ = cloneAndShuffleQuestion(rawDuelQ);
        
        usedQuestions.push(rawDuelQ); 
        
        tState.questions = [duelQ]; 
        tState.index = 0;
        
        renderDuelQuestion();
    };
}

function renderDuelQuestion() {
    if(document.activeElement) document.activeElement.blur(); 

    const q = tState.questions[0];
    tState.locked = false; 
    tState.isDuelFinished = false;
    
    const tqn = document.getElementById('t-question-number'); if(tqn) { tqn.textContent = "DÜELLO MODU"; tqn.style.color = "#f59e0b"; }
    const tqp = document.getElementById('t-question-points'); if(tqp) tqp.textContent = "";
    const tqt = document.getElementById('t-question-text'); if(tqt) tqt.textContent = q.question;
    
    const bs = document.getElementById('btn-t-skip-timer'); if(bs) bs.classList.add('is-hidden'); 
    const tl = document.getElementById('t-timer-label'); if(tl) tl.classList.add('is-hidden');
    const td = document.getElementById('t-timer-display'); if(td) td.classList.add('is-hidden');
    const ts = document.getElementById('t-status-text'); if(ts) ts.classList.remove('is-hidden');
    
    const br = document.getElementById('btn-t-reveal'); if(br) br.classList.add('is-hidden');
    const btd = document.getElementById('btn-t-duel-start'); if(btd) btd.classList.add('is-hidden');
    const co = document.getElementById('cards-overlay'); if(co) co.classList.add('is-hidden');

    const optsDiv = document.getElementById('t-options-display');
    if(optsDiv) {
        optsDiv.style.display = "grid";
        const oa = document.getElementById('t-opt-A'); if(oa && q.answerOptions[0]) oa.innerHTML = `A) <span>${q.answerOptions[0].text}</span>`;
        const ob = document.getElementById('t-opt-B'); if(ob && q.answerOptions[1]) ob.innerHTML = `B) <span>${q.answerOptions[1].text}</span>`;
        const oc = document.getElementById('t-opt-C'); if(oc && q.answerOptions[2]) oc.innerHTML = `C) <span>${q.answerOptions[2].text}</span>`;
        const od = document.getElementById('t-opt-D'); if(od && q.answerOptions[3]) od.innerHTML = `D) <span>${q.answerOptions[3].text}</span>`;
    }
    document.querySelectorAll('.t-main-opt').forEach(opt => opt.classList.remove('highlight-correct'));

    const container = document.getElementById('t-teams-container');
    if(container) {
        container.classList.remove('is-hidden');
        container.innerHTML = '';
        
        tState.tiedTeams.forEach(t => {
            t.isEliminated = false; 
            const card = document.createElement('div');
            card.className = "t-team-card tournament-group-card"; card.id = `t-card-${t.id}`;
            card.innerHTML = `
                <h3>${t.name}</h3>
                <div class="t-answers active tournament-answers-group" id="t-ans-group-${t.id}">
                    <button class="t-ans-btn" data-tid="${t.id}" data-opt="A">A</button>
                    <button class="t-ans-btn" data-tid="${t.id}" data-opt="B">B</button>
                    <button class="t-ans-btn" data-tid="${t.id}" data-opt="C">C</button>
                    <button class="t-ans-btn" data-tid="${t.id}" data-opt="D">D</button>
                </div>
            `;
            container.appendChild(card);
        });
    }

    document.querySelectorAll('.t-ans-btn').forEach(btn => {
        let lastTap = 0;
        const handleDuelAns = function(e) {
            const now = Date.now();
            if (now - lastTap < 250) return;
            lastTap = now;
            if (e.type === 'touchstart' && e.cancelable) { e.preventDefault(); }
            if (tState.locked || isGlobalPaused) return; 
            this.blur(); 
            const tid = parseInt(this.dataset.tid);
            const team = tState.tiedTeams.find(x => x.id === tid);
            if(team) evaluateDuel(team, this.dataset.opt, this);
        };
        btn.addEventListener('pointerdown', handleDuelAns);
        btn.onclick = handleDuelAns;
    });
}

function evaluateDuel(team, selectedOpt, btnElement) {
    tState.locked = true; 
    playSound(sfx.drum);
    
    btnElement.classList.add('selected');

    const q = tState.questions[0];
    const correctOptIndex = q.answerOptions.findIndex(o => o.isCorrect);
    const correctLetter = ["A", "B", "C", "D"][correctOptIndex];
    
    setTimeout(() => {
        stopSound(sfx.drum);
        const card = document.getElementById(`t-card-${team.id}`);

        if (selectedOpt === correctLetter) {
            const co = document.getElementById(`t-opt-${correctLetter}`); if(co) co.classList.add('highlight-correct');
            tState.isDuelFinished = true;
            btnElement.classList.add('correct');
            if(card) card.classList.add('correct-glow');
            setTimeout(() => endTournament(`${team.name} DÜELLOYU KAZANDI!`, team.score), 2500);
        } else {
            btnElement.classList.add('wrong');
            if(card) card.classList.add('wrong-glow');
            team.isEliminated = true; 
            playSound(sfx.wrong);
            
            setTimeout(() => {
                if(card) { card.style.opacity = "0.3"; card.style.pointerEvents = "none"; }
                
                const activeTeams = tState.tiedTeams.filter(t => !t.isEliminated);
                if (activeTeams.length === 1) {
                    const co = document.getElementById(`t-opt-${correctLetter}`); if(co) co.classList.add('highlight-correct');
                    tState.isDuelFinished = true;
                    endTournament(`${activeTeams[0].name} AYAKTA KALDI VE ŞAMPİYON OLDU!`, activeTeams[0].score);
                } else if (activeTeams.length === 0) {
                    const co = document.getElementById(`t-opt-${correctLetter}`); if(co) co.classList.add('highlight-correct');
                    tState.isDuelFinished = true;
                    endTournament(`KİMSE KAZANAMADI!`, 0);
                } else {
                    tState.locked = false;
                }
            }, 2000);
        }
    }, 2000);
}

function endTournament(msg, scoreStr) {
    if(document.activeElement) document.activeElement.blur();
    stopSound(sfx.bgm); 
    if(msg.includes("KAZAN") || msg.includes("ŞAMPİYON") || msg.includes("AYAKTA")) playSound(sfx.cheer); else playSound(sfx.wrong);
    
    const sq = document.getElementById('scene-tournament-quiz'); if(sq) sq.classList.remove('duel-mode-active');
    const quizEndEl = document.getElementById('quiz-end');
    if(sq && quizEndEl) sq.appendChild(quizEndEl);
    
    if(quizEndEl) quizEndEl.classList.remove('is-hidden');
    const qt = document.getElementById('quiz-end-title'); if(qt) qt.textContent = msg;
    
    const qs = document.getElementById('quiz-end-score');
    if (qs) {
        if (scoreStr !== undefined) qs.textContent = `Şampiyonluk Puanı: ${scoreStr}`;
        else qs.textContent = "";
    }
    
    const bl = document.getElementById('btn-show-leaderboard'); if(bl) bl.style.display = "none"; 
    const qeRev = document.getElementById('quiz-end-review-container');
    if (qeRev) { qeRev.innerHTML = ""; qeRev.classList.add('is-hidden'); }
}

// --- 8. YASAL ZORUNLULUKLAR VE ÇEREZ YÖNETİMİ ---
const cookieBanner = document.getElementById('cookie-consent');
const btnAcceptCookies = document.getElementById('btn-accept-cookies');

if (!localStorage.getItem('fenupx_cookie_consent')) {
    setTimeout(() => {
        if(cookieBanner) cookieBanner.classList.remove('is-hidden');
    }, 1500);
}

if(btnAcceptCookies) {
    btnAcceptCookies.onclick = () => {
        localStorage.setItem('fenupx_cookie_consent', 'accepted');
        if(cookieBanner) {
            cookieBanner.style.opacity = '0';
            setTimeout(() => { cookieBanner.classList.add('is-hidden'); }, 500);
        }
    };
}

function showModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-hidden');
    modal.classList.add('is-open', 'active');
    modal.style.display = 'flex';
}

function hideModal(modal) {
    if (!modal) return;
    modal.classList.add('is-hidden');
    modal.classList.remove('is-open', 'active');
    modal.style.display = 'none';
}

const policyModal = document.getElementById('policy-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const btnCloseModal = document.getElementById('btn-close-modal');

const policies = {
    kvkk: {
        title: "Gizlilik Politikası ve KVKK Aydınlatma Metni",
        content: `<p>FenUp X Ekibi olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve evrensel veri koruma ilkeleri doğrultusunda ziyaretçilerimizin ve öğrencilerimizin kişisel verilerinin güvenliğine en üst düzeyde önem veriyoruz.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">1. Öğrenci ve Çocuk Mahremiyeti</h3>
        <p>Platformumuz 18 yaş altı ortaokul öğrencilerinin kullanımı için tasarlandığından çocuk mahremiyeti temel kırmızı çizgimizdir. Platformumuz <strong>minimum veri toplama</strong> prensibini benimser:</p>
        <ul style="margin-left: 20px;">
            <li style="margin-bottom: 8px;">Platformu kullanırken T.C. kimlik numarası, telefon numarası veya açık adres gibi hassas veriler KESİNLİKLE talep edilmez.</li>
            <li style="margin-bottom: 8px;">Yazılı sınav provasında çözülen sorular, verilen cevaplar ve puan ilerlemeleri yalnızca öğrencinin kendi tarayıcısında (yerel depolama - <code>localStorage</code>) saklanır; merkezi bir sunucuya veya dış ortama aktarılmaz.</li>
        </ul>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">2. Veri Paylaşımı ve Ticari Yasak</h3>
        <p>Öğrencilere, velilere veya öğretmenlere ait hiçbir bilgi; reklam, tanıtım, pazarlama veya ticari amaçla üçüncü kişi, kurum veya kuruluşlarla ASLA paylaşılmaz, satılmaz veya devredilmez.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">3. Veri Güvenliği ve Kalıcı Sıfırlama Hakkı</h3>
        <p>Sitemiz tüm veri iletimini modern SSL/TLS şifreleme protokolleri ile güvence altına alır. Kullanıcılarımız diledikleri an "Kaydı Kaldır" veya "İlerlemeyi Sıfırla" butonuyla tarayıcılarında saklanan tüm sınav verilerini tek tıkla kalıcı olarak silebilirler.</p>`
    },
    terms: {
        title: "Kullanım Koşulları ve Eğitsel Standartlar",
        content: `<p>FenUp X eğitim platformuna hoş geldiniz. Sitemizi kullanarak aşağıda belirtilen kullanım koşullarını kabul etmiş sayılırsınız:</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">1. Eğitsel ve Adil Kullanım</h3>
        <p>FenUp X platformunda yer alan özgün açık uçlu sorular, analitik değerlendirme rubrikleri, kavram şemaları, konu özet kartları ve sanal laboratuvar bileşenleri; öğrencilerin bireysel hazırlıklarında ve öğretmenlerin sınıf içi eğitsel faaliyetlerinde tamamen <strong>ücretsiz ve serbestçe</strong> kullanılabilir.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">2. Fikri Mülkiyet ve Telif Hakları</h3>
        <p>Platformun yazılım mimarisi, özgün grafik ve SVG şemaları, vektörel çizimleri, soru bankası içeriği ve FenUp X marka unsurları FenUp X Ekibi'ne aittir. İçeriklerin ticari bir ürün haline getirilmesi, izinsiz satılması veya kâr amaçlı çoğaltılması yasaktır.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">3. Sorumluluk Reddi ve Resmî Sınav Açıklaması</h3>
        <p>FenUp X'te sunulan sorular, MEB ders kitaplarına, kazanımlara ve il zümre konu-soru dağılım tablolarına titizlikle uygun olarak üretilmiş hazırlık ve prova materyalleridir. Millî Eğitim Bakanlığı'nın doğrudan resmî sınav soruları değildir ve sınavda birebir aynı soruların çıkacağı taahhüt edilmez.</p>`
    },
    cookies: {
        title: "Çerez (Cookie) Politikası",
        content: `<p>FenUp X, web sitemizin kesintisiz, hızlı ve güvenli çalışabilmesi, eğitsel tercihlerin hatırlanması ve platform performansının anonim olarak ölçülebilmesi amacıyla sınırlı çerezler kullanmaktadır.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">1. Kullanılan Çerez Türleri ve Amaçları</h3>
        <ul style="margin-left: 20px;">
            <li style="margin-bottom: 8px;"><strong>Zorunlu ve İşlevsel Çerezler:</strong> Yazılı provasında kaldığınız soruyu hatırlamak, konu kartlarındaki çalışma ilerlemenizi kaydetmek ve tercih ettiğiniz görünüm ayarlarını korumak için kullanılır (tarayıcı yerel depolaması - <code>localStorage</code>). Bu çerezler olmadan eğitim süreçleri kesintiye uğrar.</li>
            <li style="margin-bottom: 8px;"><strong>Analitik Çerezler (Google Analytics 4):</strong> Platformun hangi bölümlerinin daha çok kullanıldığını, senaryolar arası dağılımı ve teknik sayfa performansını anonim olarak ölçümlemek amacıyla Google Analytics 4 (<code>G-HW3RN9415Z</code>) kullanılır. Bu çerezler kimlik tespiti yapmaz, IP adreslerini anonimleştirir ve kişisel veri içermez.</li>
        </ul>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">2. Çerez Yönetimi ve Devre Dışı Bırakma</h3>
        <p>Kullanıcılar tarayıcı ayarlarından (Chrome, Firefox, Safari, Edge vb.) çerezleri diledikleri zaman silebilir, engelleyebilir veya sınırlandırabilirler. Çerezlerin tamamen devre dışı bırakılması durumunda sınavda kaldığınız soru gibi bazı işlevsel kolaylıklar her sayfa yenilemesinde baştan başlayabilir.</p>`
    }
};

export function openModal(policyKey) {
    const sq = document.getElementById('scene-quiz');
    const stq = document.getElementById('scene-tournament-quiz');
    if (isGlobalPaused === false && ((sq && !sq.classList.contains('is-hidden')) || (stq && !stq.classList.contains('is-hidden')))) {
        toggleMasterPause(); 
    }
    
    if (policyKey === 'about' || policyKey === 'hakkimizda') {
        showScene('scene-hakkimizda');
        return;
    }

    const keyMap = {
        privacy: 'kvkk',
        kvkk: 'kvkk',
        terms: 'terms',
        kosullar: 'terms',
        cookies: 'cookies',
        cerez: 'cookies'
    };
    const resolvedKey = keyMap[policyKey] || policyKey;

    if (modalTitle && policies[resolvedKey]) modalTitle.textContent = policies[resolvedKey].title;
    if (modalBody && policies[resolvedKey]) modalBody.innerHTML = policies[resolvedKey].content;
    showModal(policyModal);
}

export function openLegalModal(tabKey = 'about') {
    openModal(tabKey);
}

export function closeLegalModal() {
    hideModal(policyModal);
}

export function switchLegalTab(tabKey) {
    openModal(tabKey);
}

if (typeof window !== 'undefined') {
    window.openModal = openModal;
    window.openLegalModal = openLegalModal;
    window.closeLegalModal = closeLegalModal;
    window.switchLegalTab = switchLegalTab;
}

if (btnCloseModal) {
    btnCloseModal.onclick = () => { hideModal(policyModal); };
}

if (policyModal) {
    policyModal.onclick = (e) => { 
        if (e.target === policyModal) hideModal(policyModal); 
    };
}

const btnFooterInfo = document.getElementById('btn-footer-info');
const footerInfoDropdown = document.getElementById('footer-info-dropdown');

function closeFooterInfoDropdown() {
    if (footerInfoDropdown && footerInfoDropdown.classList.contains('is-open')) {
        footerInfoDropdown.classList.remove('is-open');
        btnFooterInfo?.setAttribute('aria-expanded', 'false');
    }
}

if (btnFooterInfo && footerInfoDropdown) {
    btnFooterInfo.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = footerInfoDropdown.classList.toggle('is-open');
        btnFooterInfo.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
        if (!footerInfoDropdown.contains(e.target) && e.target !== btnFooterInfo) {
            closeFooterInfoDropdown();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeFooterInfoDropdown();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (policyModal && !policyModal.classList.contains('is-hidden')) {
            hideModal(policyModal);
        }
    }
});

// Footer ve genel kurumsal bağlantılar
document.querySelectorAll('.btn-kvkk-open').forEach(btn => btn.onclick = (e) => {
    if (e) e.stopPropagation();
    if (profileDropdown) profileDropdown.classList.add('is-hidden');
    closeFooterInfoDropdown();
    openModal('kvkk');
});
document.querySelectorAll('.btn-terms-open').forEach(btn => btn.onclick = (e) => {
    if (e) e.stopPropagation();
    if (profileDropdown) profileDropdown.classList.add('is-hidden');
    closeFooterInfoDropdown();
    openModal('terms');
});
document.querySelectorAll('.btn-cookies-open').forEach(btn => btn.onclick = (e) => {
    if (e) e.stopPropagation();
    if (profileDropdown) profileDropdown.classList.add('is-hidden');
    closeFooterInfoDropdown();
    openModal('cookies');
});

const cookiePolicyLink = document.getElementById('cookie-policy-link');
if (cookiePolicyLink) {
    cookiePolicyLink.onclick = (e) => { 
        e.preventDefault(); 
        openModal('cookies'); 
    };
}

// --- 9. ÜYELİK SİSTEMİ VE FIREBASE BACKEND ---
const btnUyelik = document.getElementById('btn-uyelik');
const profileDropdown = document.getElementById('profile-dropdown');
const userDisplayName = document.getElementById('user-display-name');
const userDisplayRole = document.getElementById('user-display-role');
const authModal = document.getElementById('auth-modal');
const btnCloseAuth = document.getElementById('btn-close-auth');

if(btnUyelik) {
    btnUyelik.onclick = () => { 
        const sq = document.getElementById('scene-quiz');
        const stq = document.getElementById('scene-tournament-quiz');
        if(isGlobalPaused === false && ((sq && !sq.classList.contains('is-hidden')) || (stq && !stq.classList.contains('is-hidden')))) { toggleMasterPause(); }
        showModal(authModal); 
    };
}

function uygunIsimMi(metin) {
    if(!metin || metin.length < 2) return false;

    let normalizedText = metin.toLowerCase();
    normalizedText = normalizedText.replace(/[1!|]/g, 'i').replace(/[ıİ]/g, 'i')
                 .replace(/[0]/g, 'o').replace(/[öÖ]/g, 'o')
                 .replace(/[3]/g, 'e').replace(/[4@]/g, 'a')
                 .replace(/[5\$]/g, 's').replace(/[şŞ]/g, 's')
                 .replace(/[7]/g, 't').replace(/[çÇ]/g, 'c')
                 .replace(/[ğĞ]/g, 'g').replace(/[üÜ]/g, 'u')
                 .replace(/q/g, 'k').replace(/x/g, 'ks').replace(/w/g, 'v');

    const kelimeler = normalizedText.split(/[\s\.\-_,\*!@#\$%\^&\(\)\[\]\{\}\\\/]+/);
    
    const kokYasaklilar = /^(sik|sok|yarra|yara|amc|amk|amq|aq|o[cç]|pi[cç]|pij|g[oö]t|kahp|ibn|yavs|pezev|godo|whore|slut|pussy|cock|fuck|bitch|cunt|dick)/;
    
    const tamYasaklilar = /^(am|mk|sg|it|mal|oc)$/;

    for(let k of kelimeler) {
        if(!k) continue;
        let squeezedWord = k.replace(/(.)\1+/g, '$1'); 
        
        const istisnalar = ["sikke", "siklamen", "sokak", "soket"];
        
        if(kokYasaklilar.test(squeezedWord) && !istisnalar.includes(squeezedWord)) return false;
        if(tamYasaklilar.test(squeezedWord)) return false;
        
        if(kokYasaklilar.test(k) && !istisnalar.includes(k)) return false; 
        if(tamYasaklilar.test(k)) return false;
    }

    let bitisik = normalizedText.replace(/[^a-z0-9]/gi, '');
    let squeezedBitisik = bitisik.replace(/(.)\1+/g, '$1');

    const kesinYasaklilar = /siktir|sikik|sikici|sikolog|sikcem|siker|sokuk|sokacam|orosp|orosb|yarrak|gavat|kahpe|ibne|yavsak|amcik|pezevenk|gerizekal|ahmak|aptal|nigg|whore|slut|pussy|cock|fuck|bitch|asshole|cunt|dick|piclik|serefsiz/i;

    if (kesinYasaklilar.test(bitisik) || kesinYasaklilar.test(squeezedBitisik)) {
        return false;
    }
    
    const bitisikTamYasak = /^(amk|amq|aq|oc|pic|pij|sg|mk)$/;
    if(bitisikTamYasak.test(squeezedBitisik)) return false;

    return true;
}

function getAuthErrorMessage(errCode) {
    switch (errCode) {
        case 'auth/email-already-in-use': return 'Bu e-posta adresi zaten kullanımda. Lütfen "Giriş Yap" sekmesini deneyin.';
        case 'auth/invalid-email': return 'Geçersiz bir e-posta adresi girdiniz.';
        case 'auth/weak-password': return 'Şifreniz çok zayıf. Lütfen en az 6 karakterli daha güçlü bir şifre belirleyin.';
        case 'auth/user-not-found': return 'Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.';
        case 'auth/wrong-password': return 'Hatalı şifre girdiniz, lütfen tekrar deneyin.';
        case 'auth/invalid-credential': return 'E-posta adresiniz veya şifreniz hatalı.';
        default: return 'Bir hata oluştu: ' + errCode;
    }
}

document.addEventListener('pointerdown', (e) => {
    const isTooltipIcon = e.target.classList && e.target.classList.contains('info-icon');
    document.querySelectorAll('.tooltiptext').forEach(t => {
        if (isTooltipIcon && e.target.nextElementSibling === t) {
            t.classList.toggle('active');
        } else {
            t.classList.remove('active');
        }
    });
});

const studentPane = document.getElementById('student-auth');
if (studentPane) {
    studentPane.innerHTML = `
        <h3 id="student-auth-title" style="color: #fff; margin-bottom: 8px; font-weight: 300;">Öğrenci Girişi</h3>
        <p class="auth-subtitle">Puanlarını kaydet, Şampiyonlar Ligi'nde yerini al!</p>
        
        <div id="register-fields" class="is-hidden" style="display:none; flex-direction:column; width:100%;">
            <div class="auth-name-row">
                <div class="auth-field-group" style="width:50%; margin-bottom:0;">
                    <label for="student-first-name" class="auth-label">Adın</label>
                    <input type="text" id="student-first-name" class="fenupx-input auth-input" placeholder="Adınız">
                </div>
                <div class="auth-field-group" style="width:50%; margin-bottom:0;">
                    <label for="student-last-name" class="auth-label">Soyadın</label>
                    <input type="text" id="student-last-name" class="fenupx-input auth-input" placeholder="Soyadınız">
                </div>
            </div>
            <div class="auth-field-group">
                <label for="student-reg-nickname" class="auth-label">Yarışmacı Adın</label>
                <div class="info-container" style="margin-bottom:0;">
                    <input type="text" id="student-reg-nickname" class="fenupx-input auth-input" placeholder="Yarışmacı Adın (Örn: Cesur Proton)" style="margin-bottom:0; width:100%; padding-right:45px;">
                    <i class="fas fa-info-circle info-icon"></i>
                    <span class="tooltiptext"><i class="fas fa-exclamation-triangle" style="margin-right:5px;"></i> Lütfen gerçek adınızı veya bilim temalı bir unvan seçin. Kırıcı veya argo isim kullanan hesaplar tablodan kalıcı olarak silinir.</span>
                </div>
                <small class="auth-field-hint">Şampiyonlar Ligi liderlik tablosunda görünecek yarışmacı adın (Örn: Cesur Proton).</small>
            </div>
        </div>
        
        <div class="auth-field-group">
            <label for="student-email" class="auth-label">E-Posta Adresi</label>
            <input type="email" id="student-email" class="fenupx-input auth-input" placeholder="E-Posta Adresi">
        </div>
        <div class="auth-field-group">
            <label for="student-pass" class="auth-label">Şifre</label>
            <div class="password-container" style="margin-bottom:0;">
                <input type="password" id="student-pass" class="fenupx-input auth-input" placeholder="Şifre">
                <i class="fas fa-eye toggle-pass-icon" id="toggle-pass"></i>
            </div>
        </div>
        <div id="forgot-password-row" class="auth-forgot-row">
            <a href="#" id="link-forgot-password" class="auth-forgot-link">Şifremi Unuttum?</a>
        </div>
        
        <div class="auth-field-group is-hidden" id="confirm-pass-container" style="display:none;">
            <label for="student-pass-confirm" class="auth-label">Şifreyi Tekrar Gir</label>
            <div class="password-container" style="margin-bottom:0;">
                <input type="password" id="student-pass-confirm" class="fenupx-input auth-input" placeholder="Şifreyi Tekrar Gir">
                <i class="fas fa-eye toggle-pass-icon" id="toggle-pass-confirm"></i>
            </div>
        </div>
        
        <button id="btn-student-submit" class="f-btn f-btn-ana" style="width:100%; margin-top:5px;">GİRİŞ YAP</button>
        <p class="auth-security-note">🔒 E-postan diğer oyunculara gösterilmez. Liderlik tablosunda yarışmacı adın görünür.</p>
        <p class="auth-toggle-row" style="color: #aaa; margin-top: 15px; font-size: 0.9rem;">
            <span id="student-toggle-text">Hesabın yok mu?</span> 
            <a href="#" id="student-toggle-link" style="color: var(--neon-blue); text-decoration: none;">Hemen Üye Ol</a>
        </p>
    `;
}

const togglePassBtn = document.getElementById('toggle-pass');
if (togglePassBtn) {
    let lastTogglePass = 0;
    const handleToggle = (e) => {
        if (e.cancelable) e.preventDefault();
        const now = Date.now();
        if (now - lastTogglePass < 250) return;
        lastTogglePass = now;
        const passInput = document.getElementById('student-pass');
        if(passInput) {
            if(passInput.type === "password") {
                passInput.type = "text";
                togglePassBtn.classList.replace('fa-eye', 'fa-eye-slash');
                togglePassBtn.style.color = '#00d2ff';
            } else {
                passInput.type = "password";
                togglePassBtn.classList.replace('fa-eye-slash', 'fa-eye');
                togglePassBtn.style.color = '#aaa';
            }
        }
    };
    togglePassBtn.addEventListener('pointerdown', handleToggle);
    togglePassBtn.addEventListener('click', handleToggle);
}

const togglePassConfirmBtn = document.getElementById('toggle-pass-confirm');
if (togglePassConfirmBtn) {
    let lastToggleConfirm = 0;
    const handleToggleConfirm = (e) => {
        if (e.cancelable) e.preventDefault();
        const now = Date.now();
        if (now - lastToggleConfirm < 250) return;
        lastToggleConfirm = now;
        const passConfirmInput = document.getElementById('student-pass-confirm');
        if(passConfirmInput) {
            if(passConfirmInput.type === "password") {
                passConfirmInput.type = "text";
                togglePassConfirmBtn.classList.replace('fa-eye', 'fa-eye-slash');
                togglePassConfirmBtn.style.color = '#00d2ff';
            } else {
                passConfirmInput.type = "password";
                togglePassConfirmBtn.classList.replace('fa-eye-slash', 'fa-eye');
                togglePassConfirmBtn.style.color = '#aaa';
            }
        }
    };
    togglePassConfirmBtn.addEventListener('pointerdown', handleToggleConfirm);
    togglePassConfirmBtn.addEventListener('click', handleToggleConfirm);
}

const profileModal = document.createElement('div');
profileModal.id = "profile-modal";
profileModal.className = "modal-overlay is-hidden";
profileModal.innerHTML = `
    <div class="modal-content glass-panel" style="max-width:450px; padding: 30px;">
        <button id="close-profile" class="close-btn"><i class="fas fa-times"></i></button>
        
        <div id="p-avatar-display" style="margin-bottom:15px; display:flex; flex-direction:column; align-items:center;">
            <img id="p-current-avatar" src="${kozmikAvatarlar[0].url}" style="width:100px; height:100px; border-radius:50%; border:3px solid #00d2ff; padding:5px; margin-bottom:10px; background: rgba(255,255,255,0.1);">
            <button id="btn-open-avatar-selector" class="f-btn f-btn-ikinci" style="font-size:0.9rem; padding:8px 15px;">Avatarımı Değiştir</button>
        </div>
        
        <div id="avatar-selector-container" class="is-hidden" style="border: 1px solid rgba(0, 210, 255, 0.3); border-radius:15px; background: rgba(0,0,0,0.5); margin-bottom:20px; padding: 10px;">
            <div class="avatar-tabs" id="avatar-category-tabs">
                <button type="button" class="avatar-tab-btn active" data-category="all">Tümü (32)</button>
                <button type="button" class="avatar-tab-btn" data-category="ogrenciler">👦👧 Öğrenciler (8)</button>
                <button type="button" class="avatar-tab-btn" data-category="bilim">🔬 Bilim İnsanları (8)</button>
                <button type="button" class="avatar-tab-btn" data-category="kasifler">🚀 Kâşifler (8)</button>
                <button type="button" class="avatar-tab-btn" data-category="ogretmenler">👨‍🏫 Öğretmenler (8)</button>
            </div>
            <div class="avatar-grid" id="avatar-selector"></div>
        </div>

        <div id="email-verify-box" class="email-verify-box is-hidden">
            <p class="email-verify-text">E-posta adresiniz henüz doğrulanmadı. Puanlarınızın liderlik tablosuna kaydedilmesi için e-postanızı doğrulayın.</p>
            <p id="email-verify-feedback" class="email-verify-feedback is-hidden"></p>
            <div class="email-verify-actions">
                <button type="button" id="btn-resend-verification" class="f-btn f-btn-ikinci">Doğrulama E-postası Gönder</button>
                <button type="button" id="btn-check-verification" class="f-btn f-btn-ana">Doğruladım, Kontrol Et</button>
            </div>
        </div>

        <div class="auth-name-row">
            <div class="auth-field-group" style="width:50%; margin-bottom:0;">
                <label for="p-name" class="auth-label">Adın</label>
                <input type="text" id="p-name" class="fenupx-input" placeholder="Ad" style="margin-bottom:0; width:100%;">
            </div>
            <div class="auth-field-group" style="width:50%; margin-bottom:0;">
                <label for="p-surname" class="auth-label">Soyadın</label>
                <input type="text" id="p-surname" class="fenupx-input" placeholder="Soyad" style="margin-bottom:0; width:100%;">
            </div>
        </div>
        <div class="auth-field-group">
            <label for="p-nickname" class="auth-label">Yarışmacı Adın</label>
            <div class="info-container" style="margin-bottom:0;">
                <input type="text" id="p-nickname" class="fenupx-input" placeholder="Yarışmacı Adın" style="width:100%; margin-bottom:0; padding-right:45px;">
                <i class="fas fa-info-circle info-icon"></i>
                <span class="tooltiptext"><i class="fas fa-exclamation-triangle" style="margin-right:5px;"></i> Kırıcı veya argo isim kullanan hesaplar tablodan kalıcı olarak silinir.</span>
            </div>
        </div>
        
        <button id="btn-save-profile" class="f-btn f-btn-ana" style="width:100%; margin-top:5px;">GÜNCELLE</button>
        <button id="btn-delete-account" class="f-btn btn-danger" style="width:100%; margin-top:15px; padding: 12px; font-size:1rem;">Hesabımı Kalıcı Olarak Sil</button>
        <div id="delete-account-confirm-box" class="delete-confirm-box is-hidden">
            <p class="delete-confirm-warning">Dikkat: Hesabınızı sildiğinizde yarışmacı profiliniz, tüm sınıf/sezon puanlarınız ve Şampiyonlar Ligi liderlik tablosu kayıtlarınız kalıcı olarak silinecektir. Bu işlem geri alınamaz.</p>
            <div id="delete-password-group" class="delete-reauth-group is-hidden">
                <label for="delete-confirm-password" class="delete-confirm-label">İşlemi onaylamak için şifreniz</label>
                <input type="password" id="delete-confirm-password" class="fenupx-input auth-input" placeholder="Şifrenizi girin">
            </div>
            <p id="delete-google-note" class="delete-google-info is-hidden">Devam ettiğinizde güvenlik için Google hesabınızla yeniden doğrulama yapılacaktır.</p>
            <p id="delete-error-msg" class="delete-error-text is-hidden"></p>
            <div class="delete-confirm-actions">
                <button type="button" id="btn-cancel-delete" class="f-btn f-btn-ikinci">Vazgeç</button>
                <button type="button" id="btn-confirm-delete-final" class="f-btn btn-danger-solid">Hesabımı Kalıcı Olarak Sil</button>
            </div>
        </div>
    </div>
`;
document.body.appendChild(profileModal);

const btnOpenAvatar = document.getElementById('btn-open-avatar-selector');
if(btnOpenAvatar) {
    btnOpenAvatar.onclick = () => {
        const asc = document.getElementById('avatar-selector-container');
        if(asc) asc.classList.toggle('is-hidden');
    };
}

const avatarContainer = document.getElementById('avatar-selector');
if(avatarContainer) {
    avatarContainer.innerHTML = '';
    kozmikAvatarlar.forEach(av => {
        const img = document.createElement('img');
        img.src = av.url; 
        img.className = "avatar-item"; 
        img.dataset.url = av.url;
        img.dataset.category = av.category;
        img.alt = av.name || "Karakter Avatarı";
        img.title = `${av.name}`;
        img.onclick = () => {
            document.querySelectorAll('.avatar-item').forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
            const pca = document.getElementById('p-current-avatar'); 
            if(pca) pca.src = av.url;
            const asc = document.getElementById('avatar-selector-container'); 
            if(asc) asc.classList.add('is-hidden'); 

            // V8.6: Sağ üstteki kullanıcı profil avatarı anında güncellensin ve localStorage'a kaydedilsin
            try {
                localStorage.setItem('fenupx_user_avatar', av.url);
            } catch (_) {}

            const headerAvatar = document.querySelector('.profile-img-header');
            if (headerAvatar) {
                headerAvatar.src = av.url;
            }

            if (auth && auth.currentUser) {
                try {
                    updateDoc(doc(db, "users", auth.currentUser.uid), { avatar: av.url }).catch(() => {});
                } catch (_) {}
            }
        };
        avatarContainer.appendChild(img);
    });

    // V8.6: Kategori Sekmeleri tab filtreleme dinleyicileri
    const avatarTabs = document.querySelectorAll('.avatar-tab-btn');
    avatarTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();
            avatarTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const targetCat = tab.dataset.category;
            const items = avatarContainer.querySelectorAll('.avatar-item');
            items.forEach(item => {
                if (targetCat === 'all' || item.dataset.category === targetCat) {
                    item.style.display = 'inline-block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Sayfa açıldığında önbellekte kayıtlı avatar varsa yükle
    try {
        const cachedAv = localStorage.getItem('fenupx_user_avatar');
        if (cachedAv) {
            const pca = document.getElementById('p-current-avatar');
            if (pca) pca.src = cachedAv;
            const matchItem = avatarContainer.querySelector(`.avatar-item[data-url="${cachedAv}"]`);
            if (matchItem) matchItem.classList.add('selected');
        }
    } catch (_) {}
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const userAvatar = userData.avatar || localStorage.getItem("fenupx_user_avatar") || kozmikAvatarlar[0].url;
            const fullAd = `${userData.name} ${userData.surname}`;
            
            if(btnUyelik) {
                btnUyelik.innerHTML = `<img src="${userAvatar}" class="profile-img-header"> ${userData.name}`;
                btnUyelik.onclick = (e) => {
                    e.stopPropagation(); 
                    if(profileDropdown) profileDropdown.classList.toggle('is-hidden');
                };
            }
            if(userDisplayName) userDisplayName.textContent = fullAd;
            if(userDisplayRole) userDisplayRole.textContent = userData.role === 'admin' ? 'Sistem Yöneticisi' : 'Öğrenci';
            
            const btnAP = document.getElementById('btn-admin-panel');
            if(userData.role === 'admin' && btnAP) {
                btnAP.classList.remove('is-hidden');
            }

            const pName = document.getElementById('p-name'); if(pName) pName.value = userData.name;
            const pSurname = document.getElementById('p-surname'); if(pSurname) pSurname.value = userData.surname;
            const pNick = document.getElementById('p-nickname'); if(pNick) pNick.value = userData.nickname || '';
            const pca = document.getElementById('p-current-avatar'); if(pca) pca.src = userAvatar;
            document.querySelectorAll('.avatar-item').forEach(i => i.classList.remove('selected'));
            const aItem = document.querySelector(`.avatar-item[data-url="${userAvatar}"]`);
            if(aItem) aItem.classList.add('selected');

            const lbg = document.getElementById('lb-guest-promo'); if(lbg) lbg.classList.add('is-hidden');
            const lbu = document.getElementById('lb-user-rank'); if(lbu) lbu.classList.remove('is-hidden');
            updateEmailVerifyBox(user);

        } else {
            if (sessionStorage.getItem('google_auth_in_progress') === 'true') {
                return;
            } else {
                try { await user.delete(); } catch(e) { await signOut(auth); }
                if(btnUyelik) {
                    btnUyelik.innerHTML = `Giriş Yap / Üye Ol`;
                    btnUyelik.onclick = () => { 
                        const sq = document.getElementById('scene-quiz');
                        const stq = document.getElementById('scene-tournament-quiz');
                        if(isGlobalPaused === false && ((sq && !sq.classList.contains('is-hidden')) || (stq && !stq.classList.contains('is-hidden')))) { toggleMasterPause(); }
                        showModal(authModal); 
                    };
                }
            }
        }
    } else {
        if(btnUyelik) {
            btnUyelik.innerHTML = `Giriş Yap / Üye Ol`;
            btnUyelik.onclick = () => { 
                const sq = document.getElementById('scene-quiz');
                const stq = document.getElementById('scene-tournament-quiz');
                if(isGlobalPaused === false && ((sq && !sq.classList.contains('is-hidden')) || (stq && !stq.classList.contains('is-hidden')))) { toggleMasterPause(); }
                showModal(authModal); 
            };
        }
        if(profileDropdown) profileDropdown.classList.add('is-hidden');
        const btnAP = document.getElementById('btn-admin-panel'); if(btnAP) btnAP.classList.add('is-hidden');
        
        const lbg = document.getElementById('lb-guest-promo'); if(lbg) lbg.classList.remove('is-hidden');
        const lbu = document.getElementById('lb-user-rank'); if(lbu) lbu.classList.add('is-hidden');
        updateEmailVerifyBox(null);
    }
});

document.addEventListener('click', (e) => {
    if(profileDropdown && !profileDropdown.classList.contains('is-hidden')) {
        if(btnUyelik && (e.target === btnUyelik || btnUyelik.contains(e.target))) return;
        if(profileDropdown.contains(e.target)) return;
        profileDropdown.classList.add('is-hidden');
    }
});
if(profileDropdown) {
    profileDropdown.onclick = (e) => e.stopPropagation();
}

const btnLogout = document.getElementById('btn-logout');
if(btnLogout) {
    btnLogout.onclick = (e) => {
        e.stopPropagation();
        if(profileDropdown) profileDropdown.classList.add('is-hidden');
        signOut(auth).then(() => {
            location.reload();
        }).catch(err => {
            console.error("Logout error:", err);
            location.reload();
        });
    };
}

if(btnCloseAuth) {
    btnCloseAuth.onclick = () => { hideModal(authModal); };
}

if(authModal) {
    authModal.onclick = (e) => { 
        if (e.target === authModal) hideModal(authModal); 
    };
}

let isStudentLoginMode = true; 
const studentTog = document.getElementById('student-toggle-link');
if(studentTog) {
    studentTog.onclick = (e) => {
        e.preventDefault();
        isStudentLoginMode = !isStudentLoginMode;
        const sTitle = document.getElementById('student-auth-title'); if(sTitle) sTitle.textContent = isStudentLoginMode ? "Öğrenci Girişi" : "Öğrenci Kaydı";
        const btnSub = document.getElementById('btn-student-submit'); if(btnSub) btnSub.textContent = isStudentLoginMode ? "GİRİŞ YAP" : "KAYIT OL";
        const stText = document.getElementById('student-toggle-text'); if(stText) stText.textContent = isStudentLoginMode ? "Hesabın yok mu?" : "Zaten hesabın var mı?";
        if(studentTog) studentTog.textContent = isStudentLoginMode ? "Hemen Üye Ol" : "Giriş Yap";
        
        const regFields = document.getElementById('register-fields');
        const confirmPassContainer = document.getElementById('confirm-pass-container');
        const forgotPassRow = document.getElementById('forgot-password-row');
        if (regFields) {
            if (isStudentLoginMode) {
                regFields.classList.add('is-hidden');
                regFields.style.display = 'none';
                if(confirmPassContainer) {
                    confirmPassContainer.classList.add('is-hidden');
                    confirmPassContainer.style.display = 'none';
                }
                if(forgotPassRow) {
                    forgotPassRow.classList.remove('is-hidden');
                }
            } else {
                regFields.classList.remove('is-hidden');
                regFields.style.display = 'flex';
                if(confirmPassContainer) {
                    confirmPassContainer.classList.remove('is-hidden');
                    confirmPassContainer.style.display = 'flex';
                }
                if(forgotPassRow) {
                    forgotPassRow.classList.add('is-hidden');
                }
            }
        }
    };
}

const linkForgotPass = document.getElementById('link-forgot-password');
if (linkForgotPass) {
    linkForgotPass.onclick = async (e) => {
        e.preventDefault();
        const se = document.getElementById('student-email');
        const email = se ? se.value.trim() : '';
        if (!email) {
            alert("Şifre sıfırlama bağlantısı gönderebilmemiz için lütfen E-Posta Adresi alanına e-postanızı girin.");
            if (se) se.focus();
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu ve spam klasörünü kontrol edin.");
        } catch (err) {
            if (err.code === 'auth/too-many-requests') {
                alert("Kısa sürede çok fazla istek gönderildi. Lütfen birkaç dakika bekleyip tekrar deneyin.");
            } else {
                alert("İşlem Hatası: " + getAuthErrorMessage(err.code));
            }
        }
    };
}

const linkPlayGuest = document.getElementById('link-play-guest');
if (linkPlayGuest) {
    linkPlayGuest.onclick = (e) => {
        e.preventDefault();
        hideModal(authModal);
    };
}

const emailVerifyBox = document.getElementById('email-verify-box');
const emailVerifyFeedback = document.getElementById('email-verify-feedback');
const btnResendVerif = document.getElementById('btn-resend-verification');
const btnCheckVerif = document.getElementById('btn-check-verification');

function isUserEmailVerified(user) {
    if (!user) return false;
    if (user.emailVerified === true) return true;
    const providers = (user.providerData || []).map(p => p.providerId);
    return providers.includes('google.com');
}

function showEmailVerifyFeedback(msg, isSuccess = false) {
    if (emailVerifyFeedback) {
        emailVerifyFeedback.textContent = msg;
        emailVerifyFeedback.style.color = isSuccess ? '#4ade80' : '#fde047';
        emailVerifyFeedback.classList.remove('is-hidden');
    } else {
        alert(msg);
    }
}

function updateEmailVerifyBox(user) {
    if (!emailVerifyBox) return;
    if (emailVerifyFeedback) {
        emailVerifyFeedback.textContent = '';
        emailVerifyFeedback.classList.add('is-hidden');
    }
    if (user && !isUserEmailVerified(user)) {
        emailVerifyBox.classList.remove('is-hidden');
    } else {
        emailVerifyBox.classList.add('is-hidden');
    }
}

if (btnResendVerif) {
    btnResendVerif.onclick = async () => {
        const user = auth.currentUser;
        if (!user) return;
        btnResendVerif.disabled = true;
        try {
            await sendEmailVerification(user);
            showEmailVerifyFeedback("Doğrulama bağlantısı e-posta adresinize tekrar gönderildi. Lütfen gelen kutunuzu ve spam klasörünü kontrol edin.", true);
        } catch (err) {
            if (err.code === 'auth/too-many-requests') {
                showEmailVerifyFeedback("Kısa sürede çok fazla istek gönderildi. Lütfen birkaç dakika bekleyip tekrar deneyin.");
            } else {
                showEmailVerifyFeedback("Doğrulama e-postası gönderilemedi. Lütfen tekrar deneyin.");
            }
        } finally {
            btnResendVerif.disabled = false;
        }
    };
}

if (btnCheckVerif) {
    btnCheckVerif.onclick = async () => {
        const user = auth.currentUser;
        if (!user) return;
        btnCheckVerif.disabled = true;
        try {
            await user.reload();
            const refreshed = auth.currentUser || user;
            if (isUserEmailVerified(refreshed)) {
                if (emailVerifyBox) emailVerifyBox.classList.add('is-hidden');
                alert("E-posta adresiniz doğrulandı!");
            } else {
                showEmailVerifyFeedback("E-posta doğrulaması henüz tamamlanmamış görünüyor. E-postanızdaki bağlantıya tıkladıktan sonra tekrar deneyin.");
            }
        } catch (err) {
            showEmailVerifyFeedback("Doğrulama durumu kontrol edilirken bir sorun oluştu.");
        } finally {
            btnCheckVerif.disabled = false;
        }
    };
}

const delConfirmBox = document.getElementById('delete-account-confirm-box');
const delPassGroup = document.getElementById('delete-password-group');
const delPassInput = document.getElementById('delete-confirm-password');
const delGoogleNote = document.getElementById('delete-google-note');
const delErrorMsg = document.getElementById('delete-error-msg');
const btnCancelDel = document.getElementById('btn-cancel-delete');
const btnConfirmDelFinal = document.getElementById('btn-confirm-delete-final');

function resetDeleteAccountBox() {
    const btnDel = document.getElementById('btn-delete-account');
    if (btnDel) btnDel.classList.remove('is-hidden');
    if (delConfirmBox) delConfirmBox.classList.add('is-hidden');
    if (delPassGroup) delPassGroup.classList.add('is-hidden');
    if (delGoogleNote) delGoogleNote.classList.add('is-hidden');
    if (delPassInput) delPassInput.value = '';
    if (delErrorMsg) {
        delErrorMsg.textContent = '';
        delErrorMsg.classList.add('is-hidden');
    }
    if (btnConfirmDelFinal) {
        btnConfirmDelFinal.disabled = false;
        btnConfirmDelFinal.textContent = 'Hesabımı Kalıcı Olarak Sil';
    }
}

function showDeleteError(msg) {
    if (delErrorMsg) {
        delErrorMsg.textContent = msg;
        delErrorMsg.classList.remove('is-hidden');
    } else {
        alert(msg);
    }
}

const btnOpenProfile = document.getElementById('btn-open-profile');
if (btnOpenProfile) {
    btnOpenProfile.onclick = (e) => {
        e.stopPropagation();
        resetDeleteAccountBox();
        updateEmailVerifyBox(auth.currentUser);
        if(profileDropdown) profileDropdown.classList.add('is-hidden');
        showModal(profileModal);
    };
}

document.querySelectorAll('.dropdown-item').forEach(item => {
    if (item.textContent.includes("Profilim") && item !== btnOpenProfile) {
        item.onclick = (e) => {
            e.stopPropagation();
            resetDeleteAccountBox();
            updateEmailVerifyBox(auth.currentUser);
            if(profileDropdown) profileDropdown.classList.add('is-hidden');
            showModal(profileModal);
        };
    }
});

const clProfile = document.getElementById('close-profile');
if(clProfile) clProfile.onclick = () => {
    resetDeleteAccountBox();
    hideModal(profileModal);
};

if(profileModal) {
    profileModal.onclick = (e) => {
        if(e.target === profileModal) {
            resetDeleteAccountBox();
            hideModal(profileModal);
        }
    };
}

const btnSaveProf = document.getElementById('btn-save-profile');
if(btnSaveProf) {
    btnSaveProf.onclick = async () => {
        const user = auth.currentUser;
        const pName = document.getElementById('p-name');
        const pSur = document.getElementById('p-surname');
        const pNick = document.getElementById('p-nickname');
        const pca = document.getElementById('p-current-avatar');
        
        const name = pName ? pName.value.trim() : '';
        const surname = pSur ? pSur.value.trim() : '';
        const nickname = pNick ? pNick.value.trim() : '';
        const avatar = pca ? pca.src : '';

        if(!name || !surname || !nickname) return alert("Ad, soyad ve yarışmacı adı alanları boş bırakılamaz.");
        
        if(!uygunIsimMi(name) || !uygunIsimMi(surname) || !uygunIsimMi(nickname)) {
            try {
                await updateDoc(doc(db, "users", user.uid), { isBanned: true });
                alert("Kullanıcı adınız veya profil bilgileriniz topluluk kurallarına aykırı tespit edildi. Sistem tarafından otomatik olarak ENGELLENDİNİZ! Uygun bir kullanıcı adı seçmeden engeliniz kaldırılmaz.");
                location.reload();
            } catch(e) {
                alert("Topluluk kurallarına aykırı kelime kullanımı tespit edildi!");
            }
            return;
        }
        
        try {
            await updateDoc(doc(db, "users", user.uid), { name, surname, nickname, avatar });
            alert("Profilin başarıyla güncellendi kaptan!");
            location.reload();
        } catch(err) {
            alert("Hata: " + err.message);
        }
    };
}

const btnDelAcc = document.getElementById('btn-delete-account');
if(btnDelAcc) {
    btnDelAcc.onclick = () => {
        const user = auth.currentUser;
        if (!user) return;
        const providers = (user.providerData || []).map(p => p.providerId);
        const hasPasswordProvider = providers.includes('password');
        const hasGoogleProvider = providers.includes('google.com');

        btnDelAcc.classList.add('is-hidden');
        if (delErrorMsg) {
            delErrorMsg.textContent = '';
            delErrorMsg.classList.add('is-hidden');
        }
        if (delConfirmBox) {
            delConfirmBox.classList.remove('is-hidden');
        }
        if (hasPasswordProvider) {
            if (delPassGroup) delPassGroup.classList.remove('is-hidden');
            if (delGoogleNote) delGoogleNote.classList.add('is-hidden');
            if (delPassInput) {
                delPassInput.value = '';
                setTimeout(() => delPassInput.focus(), 50);
            }
        } else if (hasGoogleProvider) {
            if (delPassGroup) delPassGroup.classList.add('is-hidden');
            if (delGoogleNote) delGoogleNote.classList.remove('is-hidden');
        }
        if (delConfirmBox) {
            setTimeout(() => delConfirmBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 60);
        }
    };
}

if (btnCancelDel) {
    btnCancelDel.onclick = () => {
        resetDeleteAccountBox();
    };
}

if (btnConfirmDelFinal) {
    btnConfirmDelFinal.onclick = async () => {
        const user = auth.currentUser;
        if (!user) return;
        if (delErrorMsg) {
            delErrorMsg.textContent = '';
            delErrorMsg.classList.add('is-hidden');
        }

        const providers = (user.providerData || []).map(p => p.providerId);
        const hasPasswordProvider = providers.includes('password');
        const hasGoogleProvider = providers.includes('google.com');

        if (hasPasswordProvider) {
            const password = delPassInput ? delPassInput.value : '';
            if (!password) {
                showDeleteError("Lütfen işlemi onaylamak için şifrenizi girin.");
                if (delPassInput) delPassInput.focus();
                return;
            }
            btnConfirmDelFinal.disabled = true;
            btnConfirmDelFinal.textContent = 'Doğrulanıyor...';
            try {
                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential);
            } catch (authErr) {
                btnConfirmDelFinal.disabled = false;
                btnConfirmDelFinal.textContent = 'Hesabımı Kalıcı Olarak Sil';
                if (authErr.code === 'auth/wrong-password' || authErr.code === 'auth/invalid-credential') {
                    showDeleteError("Girdiğiniz şifre hatalı. Hesabınız silinmedi.");
                } else if (authErr.code === 'auth/too-many-requests') {
                    showDeleteError("Çok fazla başarısız deneme yapıldı. Lütfen biraz bekleyip tekrar deneyin.");
                } else {
                    showDeleteError("Kimlik doğrulaması başarısız oldu. Hesabınız silinmedi.");
                }
                return;
            }
        } else if (hasGoogleProvider) {
            btnConfirmDelFinal.disabled = true;
            btnConfirmDelFinal.textContent = 'Doğrulanıyor...';
            try {
                await reauthenticateWithPopup(user, googleProvider);
            } catch (googleErr) {
                btnConfirmDelFinal.disabled = false;
                btnConfirmDelFinal.textContent = 'Hesabımı Kalıcı Olarak Sil';
                if (googleErr.code === 'auth/popup-closed-by-user' || googleErr.code === 'auth/cancelled-popup-request') {
                    showDeleteError("Google doğrulaması iptal edildi. Hesabınız silinmedi.");
                } else if (googleErr.code === 'auth/user-mismatch') {
                    showDeleteError("Seçilen Google hesabı mevcut oturumla eşleşmiyor. Hesabınız silinmedi.");
                } else {
                    showDeleteError("Google doğrulaması tamamlanamadı. Hesabınız silinmedi.");
                }
                return;
            }
        }

        try {
            btnConfirmDelFinal.textContent = 'Siliniyor...';
            await deleteDoc(doc(db, "users", user.uid));
            await deleteUser(user);
            hideModal(profileModal);
            alert("Hesabınız, yarışmacı profiliniz ve tüm puan kayıtlarınız kalıcı olarak silindi.");
            location.reload();
        } catch (err) {
            btnConfirmDelFinal.disabled = false;
            btnConfirmDelFinal.textContent = 'Hesabımı Kalıcı Olarak Sil';
            showDeleteError("Hesap silinirken bir hata oluştu: " + err.message);
        }
    };
}

const btnStuSub = document.getElementById('btn-student-submit');
if(btnStuSub) {
    btnStuSub.onclick = async () => {
        const se = document.getElementById('student-email');
        const sp = document.getElementById('student-pass');
        const email = se ? se.value : '';
        const pass = sp ? sp.value : '';
        
        if(!email || !pass) return alert("Lütfen gerekli alanları doldurun.");

        try {
            if(isStudentLoginMode) {
                await signInWithEmailAndPassword(auth, email, pass);
                hideModal(authModal);
            } else {
                const fn = document.getElementById('student-first-name');
                const ln = document.getElementById('student-last-name');
                const rn = document.getElementById('student-reg-nickname');
                const spc = document.getElementById('student-pass-confirm');
                const fName = fn ? fn.value.trim() : '';
                const lName = ln ? ln.value.trim() : '';
                const nick = rn ? rn.value.trim() : '';
                const passConfirm = spc ? spc.value : '';
                
                if(!fName || !lName || !nick || !passConfirm) return alert("Lütfen Ad, Soyad, Yarışmacı Adın ve Şifre Tekrarı alanlarını doldurun.");
                if(pass !== passConfirm) return alert("Şifreler eşleşmiyor! Lütfen kontrol edin.");
                if(!uygunIsimMi(fName) || !uygunIsimMi(lName) || !uygunIsimMi(nick)) return alert("Uygunsuz kelime kullanımı tespit edildi. Sistem kuralları gereği üyeliğiniz reddedildi. Lütfen küfür veya argo içermeyen isimler kullanın.");
                
                const cred = await createUserWithEmailAndPassword(auth, email, pass);
                try {
                    await sendEmailVerification(cred.user);
                } catch (verifyErr) {
                    console.warn("Doğrulama e-postası gönderilemedi:", verifyErr);
                }
                await setDoc(doc(db, "users", cred.user.uid), {
                    name: fName, surname: lName, nickname: nick, email: email, role: "student", totalScore: 0, isBanned: false, avatar: kozmikAvatarlar[0].url, createdAt: new Date()
                });
                updateEmailVerifyBox(cred.user);
                hideModal(authModal);
                alert("Hesabınız oluşturuldu! E-posta adresinize bir doğrulama bağlantısı gönderdik. Hemen yarışmaya başlayabilirsiniz; puanlarınızın Şampiyonlar Ligi liderlik tablosuna kaydedilmesi için e-postanızı doğrulamanız yeterlidir.");
            }
        } catch(err) { 
            alert("İşlem Hatası: " + getAuthErrorMessage(err.code)); 
        }
    };
}

const btnGoogleLog = document.getElementById('btn-google-login');
if(btnGoogleLog) {
    btnGoogleLog.onclick = async () => {
        sessionStorage.setItem('google_auth_in_progress', 'true');
        
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userRef = doc(db, "users", result.user.uid);
            const userSnap = await getDoc(userRef);
            
            if (!userSnap.exists()) {
                hideModal(authModal);
                
                const gName = result.user.displayName || "Kozmik Astronot";
                const nameParts = gName.split(' ');
                const firstName = nameParts[0];
                const lastName = nameParts.slice(1).join(' ') || "X";
                
                await setDoc(doc(db, "users", result.user.uid), {
                    name: firstName, surname: lastName, nickname: gName, email: result.user.email, role: "student", totalScore: 0, isBanned: false, avatar: kozmikAvatarlar[0].url, createdAt: new Date()
                });
                
                sessionStorage.removeItem('google_auth_in_progress');
                location.reload();
            } else {
                sessionStorage.removeItem('google_auth_in_progress');
                hideModal(authModal);
            }
        } catch(err) { 
            sessionStorage.removeItem('google_auth_in_progress'); 
            alert("Google Hatası: Pencereyi erken kapattınız veya bir sorun oluştu."); 
        }
    };
}

const btnAdminPanel = document.getElementById('btn-admin-panel');
const adminModal = document.getElementById('admin-modal');
const btnCloseAdmin = document.getElementById('btn-close-admin');
const adminUserList = document.getElementById('admin-user-list');
const adminSearchInput = document.getElementById('admin-search-input');
let allAdminUsers = [];

const btnAdminTabUsers = document.getElementById('btn-admin-tab-users');
const btnAdminTabQuestions = document.getElementById('btn-admin-tab-questions');
const adminPanelUsers = document.getElementById('admin-panel-users');
const adminPanelQuestions = document.getElementById('admin-panel-questions');

function switchAdminTab(tab) {
    if (tab === 'users') {
        if (adminPanelUsers) adminPanelUsers.style.display = 'flex';
        if (adminPanelQuestions) adminPanelQuestions.style.display = 'none';
        if (btnAdminTabUsers) {
            btnAdminTabUsers.style.background = 'rgba(245,158,11,0.2)';
            btnAdminTabUsers.style.color = '#f59e0b';
            btnAdminTabUsers.style.borderColor = 'rgba(255,255,255,0.2)';
        }
        if (btnAdminTabQuestions) {
            btnAdminTabQuestions.style.background = 'rgba(30,41,59,0.8)';
            btnAdminTabQuestions.style.color = '#cbd5e1';
            btnAdminTabQuestions.style.borderColor = 'rgba(255,255,255,0.1)';
        }
    } else {
        if (adminPanelUsers) adminPanelUsers.style.display = 'none';
        if (adminPanelQuestions) adminPanelQuestions.style.display = 'flex';
        if (btnAdminTabQuestions) {
            btnAdminTabQuestions.style.background = 'rgba(245,158,11,0.2)';
            btnAdminTabQuestions.style.color = '#f59e0b';
            btnAdminTabQuestions.style.borderColor = 'rgba(255,255,255,0.2)';
        }
        if (btnAdminTabUsers) {
            btnAdminTabUsers.style.background = 'rgba(30,41,59,0.8)';
            btnAdminTabUsers.style.color = '#cbd5e1';
            btnAdminTabUsers.style.borderColor = 'rgba(255,255,255,0.1)';
        }
        if (window.FenUpExam && typeof window.FenUpExam.renderAdminQuestionReview === 'function') {
            window.FenUpExam.renderAdminQuestionReview();
        }
    }
}

if (btnAdminTabUsers) btnAdminTabUsers.onclick = () => switchAdminTab('users');
if (btnAdminTabQuestions) btnAdminTabQuestions.onclick = () => switchAdminTab('questions');

if(btnAdminPanel) {
    btnAdminPanel.onclick = (e) => {
        e.stopPropagation();
        if(profileDropdown) profileDropdown.classList.add('is-hidden');
        switchAdminTab('users');
        showModal(adminModal);
        loadAdminUsers();
    };
}

if(btnCloseAdmin) btnCloseAdmin.onclick = () => { hideModal(adminModal); };
if(adminModal) adminModal.onclick = (e) => { if (e.target === adminModal) hideModal(adminModal); };

if(adminSearchInput) adminSearchInput.oninput = (e) => { renderAdminUsers(e.target.value); };

function updateAdminUserMetrics() {
    const totalUsers = allAdminUsers.length;
    let students = 0;
    let teachers = 0;
    let onlineCount = 0;
    const now = Date.now();
    const fifteenMins = 15 * 60 * 1000;

    allAdminUsers.forEach(u => {
        const isTeacher = u.role === 'teacher' || u.role === 'ogretmen';
        if (isTeacher) teachers++;
        else students++;

        let lastTime = 0;
        if (u.lastActive && typeof u.lastActive.toMillis === 'function') lastTime = u.lastActive.toMillis();
        else if (u.lastActive && typeof u.lastActive === 'number') lastTime = u.lastActive;
        else if (u.lastSeen && typeof u.lastSeen.toMillis === 'function') lastTime = u.lastSeen.toMillis();
        else if (u.lastSeen && typeof u.lastSeen === 'number') lastTime = u.lastSeen;
        else if (u.updatedAt && typeof u.updatedAt.toMillis === 'function') lastTime = u.updatedAt.toMillis();
        else if (u.createdAt && typeof u.createdAt.toMillis === 'function') lastTime = u.createdAt.toMillis();
        else if (u.createdAt instanceof Date) lastTime = u.createdAt.getTime();

        if (lastTime > 0 && (now - lastTime) <= fifteenMins) {
            u._isOnline = true;
            onlineCount++;
        } else {
            u._isOnline = false;
        }
    });

    const elTotal = document.getElementById('admin-stat-total-users');
    const elRoles = document.getElementById('admin-stat-roles');
    const elOnline = document.getElementById('admin-stat-online');
    if (elTotal) elTotal.textContent = totalUsers;
    if (elRoles) elRoles.textContent = `${students} Öğrenci · ${teachers} Öğretmen`;
    if (elOnline) elOnline.textContent = `${onlineCount} Çevrimiçi`;
}

async function loadAdminUsers() {
    if(adminUserList) adminUserList.innerHTML = '<p style="text-align:center; color:#aaa; margin-top:20px;">Kullanıcılar yükleniyor...</p>';
    try {
        const q = collection(db, "users");
        const snap = await getDocs(q);
        allAdminUsers = [];
        snap.forEach(docSnap => {
            const data = docSnap.data();
            if (data.role !== 'admin') {
                allAdminUsers.push({ id: docSnap.id, ...data });
            }
        });
        
        allAdminUsers.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
        updateAdminUserMetrics();
        renderAdminUsers();
    } catch(e) {
        if(adminUserList) adminUserList.innerHTML = '<p style="color:#ef4444; text-align:center;">Kullanıcılar yüklenirken bir hata oluştu.</p>';
    }
}

function renderAdminUsers(filterText = '') {
    if(!adminUserList) return;
    adminUserList.innerHTML = '';
    const lowerFilter = filterText.toLowerCase();
    const filtered = allAdminUsers.filter(u => 
        (u.name && u.name.toLowerCase().includes(lowerFilter)) || 
        (u.nickname && u.nickname.toLowerCase().includes(lowerFilter)) ||
        (u.email && u.email.toLowerCase().includes(lowerFilter))
    );

    if(filtered.length === 0) {
        adminUserList.innerHTML = '<p style="color:#aaa; text-align:center; margin-top:20px;">Kullanıcı bulunamadı.</p>';
        return;
    }

    filtered.forEach(u => {
        const isBanned = u.isBanned === true;
        const isOnline = u._isOnline === true;
        const onlineBadge = isOnline 
            ? `<span class="admin-online-badge"><span style="color:#10b981; font-size:0.6rem;">●</span> Çevrimiçi</span>` 
            : '';
        const row = document.createElement('div');
        row.className = `admin-user-row ${isBanned ? 'banned' : ''}`;
        row.innerHTML = `
            <div class="admin-user-info">
                <img src="${u.avatar || kozmikAvatarlar[0].url}" class="admin-user-avatar" alt="${u.nickname || 'Avatar'}">
                <div class="admin-user-details">
                    <h4>${u.nickname || 'İsimsiz Kaptan'}${onlineBadge}</h4>
                    <p>${u.name || ''} ${u.surname || ''} | ${u.email || ''}</p>
                </div>
            </div>
            <div class="admin-user-stats">
                <i class="fas fa-star" style="color:#f59e0b;"></i> ${formatScore(u.totalScore || 0)} Puan
            </div>
            <div class="admin-actions">
                <button class="btn-edit-nick" data-uid="${u.id}" data-nick="${u.nickname || ''}"><i class="fas fa-edit"></i> İsim Değiştir</button>
                ${isBanned 
                    ? `<button class="btn-unban" data-uid="${u.id}"><i class="fas fa-check-circle"></i> Engeli Kaldır</button>`
                    : `<button class="btn-ban" data-uid="${u.id}"><i class="fas fa-ban"></i> Blokla</button>`
                }
            </div>
        `;
        adminUserList.appendChild(row);
    });

    document.querySelectorAll('.btn-edit-nick').forEach(btn => {
        btn.onclick = () => {
            const newNick = prompt("Kullanıcı için yeni bir nickname belirleyin:", btn.dataset.nick);
            if(newNick && newNick.trim() !== "" && newNick !== btn.dataset.nick) {
                if(!uygunIsimMi(newNick.trim())) {
                    alert("Uyarı: Admin olsanız bile bu isim filtreye takıldı. Lütfen daha uygun bir isim belirleyin.");
                    return;
                }
                changeUserNickname(btn.dataset.uid, newNick.trim());
            }
        };
    });
    
    document.querySelectorAll('.btn-ban').forEach(btn => {
        btn.onclick = () => toggleBanStatus(btn.dataset.uid, true);
    });
    document.querySelectorAll('.btn-unban').forEach(btn => {
        btn.onclick = () => toggleBanStatus(btn.dataset.uid, false);
    });
}

async function changeUserNickname(uid, newNick) {
    try {
        await updateDoc(doc(db, "users", uid), { nickname: newNick });
        const userIndex = allAdminUsers.findIndex(u => u.id === uid);
        if(userIndex > -1) allAdminUsers[userIndex].nickname = newNick;
        const asi = document.getElementById('admin-search-input');
        renderAdminUsers(asi ? asi.value : '');
        alert("Kullanıcı adı başarıyla değiştirildi.");
    } catch(e) {
        alert("İsim değiştirilemedi: " + e.message);
    }
}

async function toggleBanStatus(uid, banStatus) {
    const mesaj = banStatus ? "Bu kullanıcıyı tablolardan bloklamak istediğinize emin misiniz?" : "Bu kullanıcının engelini kaldırmak istediğinize emin misiniz?";
    if(!confirm(mesaj)) return;
    
    try {
        await updateDoc(doc(db, "users", uid), { isBanned: banStatus });
        const userIndex = allAdminUsers.findIndex(u => u.id === uid);
        if(userIndex > -1) {
            allAdminUsers[userIndex].isBanned = banStatus;
        }
        const asi = document.getElementById('admin-search-input');
        renderAdminUsers(asi ? asi.value : ''); 
    } catch(e) {
        alert("Hata oluştu: " + e.message);
    }
}

const lbListEl = document.getElementById('global-lb-list');
const lbTabBtns = document.querySelectorAll('.lb-tab-btn');
const lbGuestPromo = document.getElementById('btn-lb-signup');

lbTabBtns.forEach(btn => {
    btn.onclick = () => {
        lbTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const seasonNote = document.getElementById('season-reset-note');
        if (seasonNote) {
            seasonNote.innerHTML = "* Puanlar 1 Eylül'de yeni eğitim yılıyla otomatik sıfırlanır.";
            if (btn.dataset.tab === 'alltime') seasonNote.classList.remove('is-hidden');
            else seasonNote.classList.add('is-hidden');
        }
        
        loadGlobalLeaderboard(btn.dataset.tab);
    };
});

if(lbGuestPromo) lbGuestPromo.onclick = () => { showModal(authModal); };

async function loadGlobalLeaderboard(type = 'weekly') {
    if(!lbListEl) return;
    lbListEl.innerHTML = '<p style="text-align:center; color:#aaa; margin-top:20px;">Liderler yükleniyor...</p>';
    
    const lbTitle = document.querySelector('#unit-leaderboard-side h2');
    if(lbTitle && selectedGrade) lbTitle.innerHTML = `<i class="fas fa-trophy"></i> ${selectedGrade}. Sınıf Şampiyonlar Ligi`;

    const gradeSuffix = `_${selectedGrade}`;
    let field = `totalScore${gradeSuffix}`;
    const now = new Date();
    
    if (type === 'weekly') field = `weeklyScore${gradeSuffix}`;
    else if (type === 'monthly') field = `monthlyScore${gradeSuffix}`;
    else if (type === 'alltime') field = `seasonScore${gradeSuffix}`;

    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy(field, "desc"), limit(50));
        const snap = await getDocs(q);
        
        const users = [];
        const currentWeekId = getWeekId(now);
        const currentMonthId = getMonthId(now);
        const currentSeasonId = getSeasonId(now);

        snap.forEach(docSnap => {
            const data = docSnap.data();
            
            if (data.role === 'student' && data.isBanned === false) {
                let score = 0;
                
                if (type === 'weekly' && data[`lastWeekId${gradeSuffix}`] === currentWeekId) score = data[`weeklyScore${gradeSuffix}`] || 0;
                else if (type === 'monthly' && data[`lastMonthId${gradeSuffix}`] === currentMonthId) score = data[`monthlyScore${gradeSuffix}`] || 0;
                else if (type === 'alltime') {
                    if (data[`lastSeasonId${gradeSuffix}`] === currentSeasonId) score = data[`seasonScore${gradeSuffix}`] || 0;
                }

                if (score > 0) {
                    users.push({ ...data, displayScore: score });
                }
            }
        });

        renderGlobalLeaderboard(users, type);
        updateUserGlobalRank(field, type);

    } catch (e) {
        console.error("Tablo yükleme hatası:", e);
        lbListEl.innerHTML = '<p style="color:#ef4444; text-align:center;">Henüz bu sınıfa ait veri yok.</p>';
    }
}

function renderGlobalLeaderboard(users, type) {
    if(!lbListEl) return;
    lbListEl.innerHTML = '';
    
    if (users.length === 0) {
        lbListEl.innerHTML = '<p style="color:#aaa; text-align:center; margin-top:20px;">Henüz bu kategoride yarışmacı yok.</p>';
        return;
    }

    users.sort((a, b) => b.displayScore - a.displayScore);
    const topUsers = users.slice(0, 10);

    topUsers.forEach((u, i) => {
        let badgeStr = "";
        let nameClass = "";
        
        if (type === 'alltime' && i === 0) {
            badgeStr = '<span class="badge-icon">🏆</span>';
            nameClass = 'season-champ';
        } else if (i === 0) {
            badgeStr = '<span class="badge-icon">🥇</span>';
        } else if (i === 1) {
            badgeStr = '<span class="badge-icon">🥈</span>';
        } else if (i === 2) {
            badgeStr = '<span class="badge-icon">🥉</span>';
        }

        const row = document.createElement('div');
        row.className = `global-lb-row rank-${i+1}`;
        row.innerHTML = `
            <div class="global-lb-rank">${i+1}</div>
            <img src="${u.avatar || kozmikAvatarlar[0].url}" class="global-lb-avatar">
            <div class="global-lb-info">
                <h4 class="${nameClass}">${badgeStr}${u.nickname || 'Kozmik Kaptan'}</h4>
                <p>Öğrenci</p>
            </div>
            <div class="global-lb-score">${formatScore(u.displayScore)}</div>
        `;
        lbListEl.appendChild(row);
    });
}

async function updateUserGlobalRank(field, type) {
    const user = auth.currentUser;
    const rankArea = document.getElementById('lb-user-rank');
    const rankText = document.getElementById('lb-user-rank-text');

    if (!user) {
        if(rankArea) rankArea.classList.add('is-hidden');
        return;
    }

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) return;
        const userData = userSnap.data();
        
        let myScore = 0;
        const now = new Date();
        const currentSeasonId = getSeasonId(now);
        const gradeSuffix = `_${selectedGrade}`;
        
        if (type === 'weekly' && userData[`lastWeekId${gradeSuffix}`] === getWeekId(now)) myScore = userData[`weeklyScore${gradeSuffix}`] || 0;
        else if (type === 'monthly' && userData[`lastMonthId${gradeSuffix}`] === getMonthId(now)) myScore = userData[`monthlyScore${gradeSuffix}`] || 0;
        else if (type === 'alltime') {
            if (userData[`lastSeasonId${gradeSuffix}`] === currentSeasonId) myScore = userData[`seasonScore${gradeSuffix}`] || 0;
        }

        const q = query(collection(db, "users"), orderBy(field, "desc"));
        const snap = await getDocs(q);
        
        let rank = 1;
        snap.forEach(docSnap => {
            const d = docSnap.data();
            if (d.role === 'student' && d.isBanned === false) {
                let s = 0;
                if (type === 'weekly' && d[`lastWeekId${gradeSuffix}`] === getWeekId(now)) s = d[`weeklyScore${gradeSuffix}`] || 0;
                else if (type === 'monthly' && d[`lastMonthId${gradeSuffix}`] === getMonthId(now)) s = d[`monthlyScore${gradeSuffix}`] || 0;
                else if (type === 'alltime') {
                    if (d[`lastSeasonId${gradeSuffix}`] === currentSeasonId) s = d[`seasonScore${gradeSuffix}`] || 0;
                }
                
                if (s > myScore) rank++;
            }
        });

        if(rankText) rankText.innerHTML = `<i class="fas fa-medal"></i> ${selectedGrade}. Sınıf Sıran: ${rank}. | Puanın: ${formatScore(myScore)}`;
        if(rankArea) rankArea.classList.remove('is-hidden');
    } catch (e) {
        if(rankText) rankText.textContent = "Sıra hesaplanamadı.";
    }
}

// --- 10. HATA BİLDİRİM SİSTEMİ ---

// Hata Bildirim Butonlarını Ekle (Bireysel ve Turnuva Ekranlarına)
const sq = document.getElementById('scene-quiz');
if(sq) {
    const btnIndReport = document.createElement('button');
    btnIndReport.className = 'btn-report-bug';
    btnIndReport.innerHTML = '<i class="fas fa-bug"></i> Soruyu Bildir';
    btnIndReport.onclick = () => openReportModal(quizState.set[quizState.index]);
    
    const optionsGrid = document.getElementById('options-grid');
    if(optionsGrid) {
        optionsGrid.insertAdjacentElement('afterend', btnIndReport);
    } else {
        sq.appendChild(btnIndReport);
    }
}

const stq = document.getElementById('scene-tournament-quiz');
if(stq) {
    const btnTourReport = document.createElement('button');
    btnTourReport.className = 'btn-report-bug';
    btnTourReport.innerHTML = '<i class="fas fa-bug"></i> Soruyu Bildir';
    btnTourReport.onclick = () => openReportModal(tState.questions[tState.index] || tState.questions[0]);
    
    const tControls = document.querySelector('.t-controls');
    if(tControls) {
        tControls.insertAdjacentElement('afterend', btnTourReport);
    } else {
        stq.appendChild(btnTourReport);
    }
}

// Hata Bildirim Modalını Oluştur
const reportModal = document.createElement('div');
reportModal.id = "report-modal";
reportModal.className = "modal-overlay is-hidden";
reportModal.innerHTML = `
    <div class="modal-content glass-panel" style="max-width:500px; padding: 30px;">
        <button id="close-report" class="close-btn"><i class="fas fa-times"></i></button>
        <h2 style="color: #ef4444; font-size: 2rem; margin-bottom: 20px;"><i class="fas fa-exclamation-triangle"></i> Soru Bildirimi</h2>
        <p style="color: #aaa; margin-bottom: 20px; font-size: 1rem; text-align: left;">Bu soruda ne gibi bir hata olduğunu düşünüyorsunuz? Bildiriminiz doğrudan yöneticilere iletilecektir.</p>
        
        <div class="report-options">
            <label class="report-radio-label">
                <input type="radio" name="reportType" value="hatali_soru" checked> Hatalı Soru Kökü
            </label>
            <label class="report-radio-label">
                <input type="radio" name="reportType" value="yanlis_sik"> Yanlış Şıklar / Cevap Anahtarı
            </label>
            <label class="report-radio-label">
                <input type="radio" name="reportType" value="yazim_hatasi"> Yazım / İmla Hatası
            </label>
            <label class="report-radio-label">
                <input type="radio" name="reportType" value="mufredat_disi"> Müfredat Dışı Konu
            </label>
            <label class="report-radio-label">
                <input type="radio" name="reportType" value="diger"> Diğer
            </label>
        </div>
        
        <textarea id="report-desc" class="fenupx-input" placeholder="Eklemek istediğiniz bir detay var mı? (Opsiyonel)" rows="3" style="resize: none;"></textarea>
        
        <button id="btn-submit-report" class="f-btn" style="background: linear-gradient(45deg, #ef4444, #b91c1c); color: #fff; width: 100%; margin-top: 10px; box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);">BİLDİRİMİ GÖNDER</button>
    </div>
`;
document.body.appendChild(reportModal);

const clReport = document.getElementById('close-report');
if(clReport) {
    clReport.onclick = () => {
        hideModal(reportModal);
        if(isGlobalPaused) toggleMasterPause(); // Bildirim penceresi kapanınca oyunu devam ettir
    };
}

if(reportModal) {
    reportModal.onclick = (e) => {
        if(e.target === reportModal) {
            hideModal(reportModal);
            if(isGlobalPaused) toggleMasterPause();
        }
    };
}

let currentReportedQuestion = null;

function openReportModal(questionData) {
    if(!questionData) return;
    
    // Arka planda oyunu durdur (süre akmasın diye)
    if(!isGlobalPaused) toggleMasterPause();
    
    currentReportedQuestion = questionData;
    showModal(reportModal);
    
    // Modal açıldığında radyo butonunu sıfırla ve metni temizle
    const firstRadio = document.querySelector('input[name="reportType"][value="hatali_soru"]');
    if(firstRadio) firstRadio.checked = true;
    const descInput = document.getElementById('report-desc');
    if(descInput) descInput.value = "";
}

const btnSubmitReport = document.getElementById('btn-submit-report');
if(btnSubmitReport) {
    btnSubmitReport.onclick = async () => {
        if(!currentReportedQuestion) return;
        
        btnSubmitReport.disabled = true;
        btnSubmitReport.textContent = "Gönderiliyor...";
        btnSubmitReport.style.opacity = "0.7";

        const selectedType = document.querySelector('input[name="reportType"]:checked').value;
        const descInput = document.getElementById('report-desc');
        const description = descInput ? descInput.value.trim() : "";
        
        const user = auth.currentUser;
        const reporterId = user ? user.uid : "Misafir";
        const reporterName = currentActivePlayerName || "Bilinmiyor";

        try {
            await addDoc(collection(db, "reported_questions"), {
                questionText: currentReportedQuestion.question,
                grade: selectedGrade || "Bilinmiyor",
                unit: selectedUnit || "Bilinmiyor",
                difficulty: currentReportedQuestion.difficulty || "Bilinmiyor",
                reportType: selectedType,
                description: description,
                reporterId: reporterId,
                reporterName: reporterName,
                reportedAt: new Date(),
                status: "yeni" // Adminin sonradan "incelendi", "duzeltildi" vs. yapabilmesi için
            });
            
            alert("Bildiriminiz başarıyla iletildi. Katkınız için teşekkür ederiz!");
        } catch (e) {
            console.error("Hata bildirimi gönderilemedi:", e);
            alert("Bildirim gönderilirken bir sorun oluştu. Lütfen daha sonra tekrar deneyin.");
        } finally {
            btnSubmitReport.disabled = false;
            btnSubmitReport.textContent = "BİLDİRİMİ GÖNDER";
            btnSubmitReport.style.opacity = "1";
            
            hideModal(reportModal);
            if(isGlobalPaused) toggleMasterPause(); // Bildirim gönderilip modal kapanınca oyunu devam ettir
        }
    };
}