import {AVATARS,DEFAULT_AVATAR_ID,avatarUrl} from './avatar-catalog.js?v=8.9.6';
import {createAvatarPicker} from './avatar-picker.js?v=8.9.6';
import { CompetitionRun } from './competition-run.js?v=8.9.5';
import { COMPETITION_BACKEND_READY, COMPETITION_API_URL, competitionYear, competitionPeriods } from './competition-config.js?v=8.9.5';
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
    .avatar-tabs, .avatar-category-nav {
        display: flex !important; flex-wrap: wrap !important; gap: 8px !important; justify-content: center !important; margin-bottom: 16px !important;
    }
    .avatar-tab-btn {
        white-space: nowrap !important; padding: 8px 14px !important; font-size: 0.9rem !important;
        border-radius: 20px !important; border: 1px solid rgba(255,255,255,0.15) !important;
        background: rgba(15,23,42,0.6) !important; color: #94a3b8 !important; cursor: pointer !important;
        transition: all 0.2s !important; touch-action: manipulation;
    }
    .avatar-tab-btn:hover { background: rgba(2, 132, 199, 0.25) !important; border-color: #38bdf8 !important; color: #f8fafc !important; }
    .avatar-tab-btn.active { background: #0284c7 !important; color: #ffffff !important; border-color: #38bdf8 !important; font-weight: 600 !important; box-shadow: 0 0 12px rgba(2, 132, 199, 0.4) !important; }

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
<circle cx="50" cy="50" r="48" fill="url(#g_${id})" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
<circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
${innerSvg}
</svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Chibi helpers
const H = {
    head: (skin = '#fed7aa', blush = 'rgba(244,63,94,0.4)') => `
        <path d="M28 45 C27 59, 36 67, 50 67 C64 67, 73 59, 72 45 C72 31, 63 25, 50 25 C37 25, 28 31, 28 45 Z" fill="${skin}"/>
        <ellipse cx="36" cy="53" rx="4" ry="2.2" fill="${blush}"/>
        <ellipse cx="64" cy="53" rx="4" ry="2.2" fill="${blush}"/>
    `,
    humanHead: (skin = '#fed7aa', blush = 'rgba(244,63,94,0.28)') => `
        <path d="M45 56 L45 66 L55 66 L55 56 Z" fill="${skin}"/>
        <path d="M45 56 C47 60, 53 60, 55 56 Z" fill="rgba(0,0,0,0.08)"/>
        <path d="M31 43 C30 55, 37 64, 50 64 C63 64, 70 55, 69 43 C69 31, 61 24, 50 24 C39 24, 31 31, 31 43 Z" fill="${skin}"/>
        <ellipse cx="37" cy="52" rx="3.5" ry="1.6" fill="${blush}"/>
        <ellipse cx="63" cy="52" rx="3.5" ry="1.6" fill="${blush}"/>
    `,
    eyes: (eyeColor = '#0284c7', eyelashColor = '#0f172a') => `
        <g class="chibi-eyes">
            <path d="M37 43 Q42 39 47 43" stroke="${eyelashColor}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
            <ellipse cx="42.5" cy="46.5" rx="3.8" ry="4.8" fill="#1e293b"/>
            <ellipse cx="42.5" cy="48" rx="3.2" ry="2.8" fill="${eyeColor}" opacity="0.85"/>
            <circle cx="41" cy="44.5" r="1.6" fill="#ffffff"/>
            <circle cx="44" cy="48" r="0.8" fill="#ffffff"/>
            <path d="M53 43 Q58 39 63 43" stroke="${eyelashColor}" stroke-width="2.6" stroke-linecap="round" fill="none"/>
            <ellipse cx="57.5" cy="46.5" rx="3.8" ry="4.8" fill="#1e293b"/>
            <ellipse cx="57.5" cy="48" rx="3.2" ry="2.8" fill="${eyeColor}" opacity="0.85"/>
            <circle cx="56" cy="44.5" r="1.6" fill="#ffffff"/>
            <circle cx="59" cy="48" r="0.8" fill="#ffffff"/>
        </g>
    `,
    smile: (lipColor = '#e11d48') => `
        <path d="M46 56 Q50 60.5 54 56 Q50 58.5 46 56 Z" fill="${lipColor}"/>
        <circle cx="50" cy="52" r="0.8" fill="#ea580c" opacity="0.35"/>
    `,
    happyMouth: () => `
        <path d="M45.5 55 Q50 62 54.5 55 Z" fill="#b91c1c"/>
        <path d="M47 57.5 Q50 61 53 57.5 Z" fill="#fda4af"/>
        <circle cx="50" cy="51.5" r="0.8" fill="#ea580c" opacity="0.35"/>
    `,
    eyebrows: (color = '#451a03') => `
        <path d="M37 39 Q42 37 46 39" stroke="${color}" stroke-width="1.8" stroke-linecap="round" fill="none"/>
        <path d="M54 39 Q58 37 63 39" stroke="${color}" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    `
};

// Retained for compatibility verification of already stored SVG values.
const legacyAvatarCatalog = [
    // --- 🤖 ROBOTLAR & AI DOSTLARI (8) ---
{
        id: 'av_robot_astrobot',
        name: 'Astro-Bot (Dost Robot)',
        category: 'robotlar',
        url: makeSvgAvatar('av_robot_astrobot', ['#0f172a', '#0284c7'], `
            <rect x="25" y="28" width="50" height="42" rx="18" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
            <path d="M30 36 C35 30, 48 30, 52 36" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none"/>
            <rect x="30" y="36" width="40" height="24" rx="10" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
            <ellipse cx="40" cy="48" rx="4" ry="5" fill="#38bdf8"/>
            <circle cx="41.5" cy="46.5" r="1.5" fill="#ffffff"/>
            <ellipse cx="60" cy="48" rx="4" ry="5" fill="#38bdf8"/>
            <circle cx="61.5" cy="46.5" r="1.5" fill="#ffffff"/>
            <path d="M46 54 Q50 57 54 54" stroke="#38bdf8" stroke-width="2" fill="none" stroke-linecap="round"/>
            <line x1="50" y1="28" x2="50" y2="18" stroke="#38bdf8" stroke-width="2.5"/>
            <circle cx="50" cy="17" r="4.5" fill="#ef4444" stroke="#fecaca" stroke-width="1.5"/>
            <rect x="20" y="40" width="6" height="18" rx="3" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
            <rect x="74" y="40" width="6" height="18" rx="3" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
            <rect x="42" y="70" width="16" height="6" fill="#0369a1"/>
            <path d="M28 84 C30 76, 38 74, 50 74 C62 74, 70 76, 72 84 Z" fill="#f8fafc"/>
            <polygon points="50,77 52,81 56,81 53,83 54,87 50,85 46,87 47,83 44,81 48,81" fill="#38bdf8"/>
        `)
    },
    {
        id: 'av_robot_nano',
        name: 'Nano (Deney Robotu)',
        category: 'robotlar',
        url: makeSvgAvatar('av_robot_nano', ['#064e3b', '#10b981'], `
            <path d="M28 72 C26 50, 32 32, 50 32 C68 32, 74 50, 72 72 C71 82, 60 84, 50 84 C40 84, 29 82, 28 72 Z" fill="#22c55e"/>
            <path d="M34 40 C38 34, 46 34, 50 34" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none"/>
            <circle cx="50" cy="52" r="15" fill="#0f172a" stroke="#15803d" stroke-width="2.5"/>
            <circle cx="50" cy="52" r="11" fill="#064e3b"/>
            <circle cx="50" cy="52" r="8" fill="#10b981"/>
            <circle cx="47" cy="49" r="3.2" fill="#ffffff"/>
            <circle cx="53" cy="55" r="1.5" fill="#ffffff"/>
            <path d="M46 72 Q50 76 54 72" stroke="#064e3b" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M44 32 Q40 22 36 20" stroke="#15803d" stroke-width="2" fill="none"/>
            <circle cx="35" cy="20" r="3" fill="#facc15"/>
            <path d="M56 32 Q60 22 64 20" stroke="#15803d" stroke-width="2" fill="none"/>
            <circle cx="65" cy="20" r="3" fill="#facc15"/>
            <rect x="62" y="66" width="6" height="14" rx="3" fill="rgba(255,255,255,0.7)" stroke="#0284c7" stroke-width="1"/>
            <rect x="62" y="73" width="6" height="7" rx="2" fill="#38bdf8"/>
            <circle cx="65" cy="62" r="1.5" fill="#38bdf8" opacity="0.8"/>
        `)
    },
    {
        id: 'av_robot_sparky',
        name: 'Sparky (Elektrik Robotu)',
        category: 'robotlar',
        url: makeSvgAvatar('av_robot_sparky', ['#78350f', '#eab308'], `
            <rect x="26" y="30" width="48" height="42" rx="14" fill="#facc15" stroke="#eab308" stroke-width="2"/>
            <path d="M32 38 C36 34, 44 34, 48 38" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"/>
            <polygon points="26,44 16,36 22,44 14,48 26,54" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
            <polygon points="74,44 84,36 78,44 86,48 74,54" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
            <circle cx="39" cy="48" r="5" fill="#0284c7"/>
            <circle cx="41" cy="46" r="1.8" fill="#ffffff"/>
            <circle cx="61" cy="48" r="5" fill="#0284c7"/>
            <circle cx="63" cy="46" r="1.8" fill="#ffffff"/>
            <circle cx="33" cy="56" r="3" fill="#f43f5e" opacity="0.6"/>
            <circle cx="67" cy="56" r="3" fill="#f43f5e" opacity="0.6"/>
            <path d="M45 56 Q50 63 55 56 Z" fill="#b91c1c"/>
            <path d="M30 84 C32 76, 40 74, 50 74 C60 74, 68 76, 70 84 Z" fill="#1e293b"/>
            <polygon points="51,76 46,81 50,81 49,86 54,80 50,80" fill="#facc15"/>
        `)
    },
    {
        id: 'av_robot_panda',
        name: 'Robo-Panda (Sibernetik Kâşif)',
        category: 'robotlar',
        url: makeSvgAvatar('av_robot_panda', ['#0f172a', '#0d9488'], `
            <circle cx="50" cy="52" r="23" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
            <circle cx="32" cy="34" r="8" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <circle cx="32" cy="34" r="4" fill="#0d9488"/>
            <circle cx="68" cy="34" r="8" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
            <circle cx="68" cy="34" r="4" fill="#0d9488"/>
            <ellipse cx="40" cy="50" rx="7" ry="8" fill="#1e293b" transform="rotate(-12 40 50)"/>
            <ellipse cx="60" cy="50" rx="7" ry="8" fill="#1e293b" transform="rotate(12 60 50)"/>
            <ellipse cx="40" cy="50" rx="3.5" ry="4" fill="#14b8a6"/>
            <circle cx="41.5" cy="48.5" r="1.3" fill="#ffffff"/>
            <ellipse cx="60" cy="50" rx="3.5" ry="4" fill="#14b8a6"/>
            <circle cx="61.5" cy="48.5" r="1.3" fill="#ffffff"/>
            <polygon points="48,57 52,57 50,60" fill="#0f172a"/>
            <path d="M46 62 Q50 65 54 62" stroke="#0f172a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <rect x="66" y="62" width="6" height="18" rx="2" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
            <line x1="66" y1="68" x2="72" y2="68" stroke="#facc15" stroke-width="1"/>
            <line x1="66" y1="74" x2="72" y2="74" stroke="#facc15" stroke-width="1"/>
        `)
    },
    {
        id: 'av_robot_rover',
        name: 'Mars Rover Droid',
        category: 'robotlar',
        url: makeSvgAvatar('av_robot_rover', ['#450a0a', '#c2410c'], `
            <rect x="32" y="44" width="36" height="26" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
            <rect x="36" y="32" width="11" height="12" rx="3" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
            <circle cx="41.5" cy="38" r="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
            <circle cx="43" cy="36.5" r="1.3" fill="#ffffff"/>
            <rect x="53" y="32" width="11" height="12" rx="3" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5"/>
            <circle cx="58.5" cy="38" r="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
            <circle cx="60" cy="36.5" r="1.3" fill="#ffffff"/>
            <line x1="47" y1="38" x2="53" y2="38" stroke="#64748b" stroke-width="2"/>
            <polygon points="28,28 72,28 66,22 34,22" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.2"/>
            <line x1="42" y1="22" x2="38" y2="28" stroke="#93c5fd" stroke-width="1"/>
            <line x1="50" y1="22" x2="50" y2="28" stroke="#93c5fd" stroke-width="1"/>
            <line x1="58" y1="22" x2="62" y2="28" stroke="#93c5fd" stroke-width="1"/>
            <path d="M44 58 Q50 63 56 58" stroke="#10b981" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <rect x="22" y="66" width="12" height="18" rx="4" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
            <rect x="66" y="66" width="12" height="18" rx="4" fill="#334155" stroke="#1e293b" stroke-width="1.5"/>
        `)
    },
    {
        id: 'av_robot_quantum',
        name: 'Quantum Core',
        category: 'robotlar',
        url: makeSvgAvatar('av_robot_quantum', ['#1e1b4b', '#7c3aed'], `
            <circle cx="50" cy="50" r="22" fill="#7c3aed" stroke="#c084fc" stroke-width="2.5"/>
            <circle cx="50" cy="50" r="19" fill="#8b5cf6" opacity="0.6"/>
            <circle cx="44" cy="44" r="5" fill="rgba(255,255,255,0.4)"/>
            <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#38bdf8" stroke-width="1.8" transform="rotate(-30 50 50)"/>
            <circle cx="78" cy="34" r="3" fill="#38bdf8"/>
            <ellipse cx="50" cy="50" rx="38" ry="14" fill="none" stroke="#f43f5e" stroke-width="1.8" transform="rotate(30 50 50)"/>
            <circle cx="22" cy="34" r="3" fill="#f43f5e"/>
            <ellipse cx="50" cy="50" rx="38" ry="12" fill="none" stroke="#facc15" stroke-width="1.5" transform="rotate(90 50 50)"/>
            <circle cx="50" cy="14" r="3" fill="#facc15"/>
            <path d="M40 48 Q44 44 48 48" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M52 48 Q56 44 60 48" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <circle cx="38" cy="54" r="2.5" fill="#f472b6"/>
            <circle cx="62" cy="54" r="2.5" fill="#f472b6"/>
            <path d="M46 54 Q50 59 54 54 Z" fill="#ffffff"/>
        `)
    },
    {
        id: 'av_robot_drone',
        name: 'Aero-Drone',
        category: 'robotlar',
        url: makeSvgAvatar('av_robot_drone', ['#082f49', '#06b6d4'], `
            <ellipse cx="50" cy="54" rx="22" ry="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
            <path d="M34 46 C38 40, 46 40, 50 40" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none"/>
            <rect x="47" y="30" width="6" height="5" fill="#0284c7"/>
            <ellipse cx="50" cy="28" rx="26" ry="3.5" fill="#38bdf8" stroke="#0284c7" stroke-width="1.2"/>
            <circle cx="50" cy="28" r="3" fill="#f8fafc" stroke="#0284c7" stroke-width="1"/>
            <ellipse cx="50" cy="53" rx="16" ry="11" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/>
            <path d="M40 54 Q44 49 48 54" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M52 54 Q56 49 60 54" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M28 56 L18 60 L20 66 L28 62 Z" fill="#0284c7"/>
            <ellipse cx="18" cy="63" rx="2" ry="3" fill="#38bdf8"/>
            <path d="M72 56 L82 60 L80 66 L72 62 Z" fill="#0284c7"/>
            <ellipse cx="82" cy="63" rx="2" ry="3" fill="#38bdf8"/>
        `)
    },
    {
        id: 'av_robot_cyberfox',
        name: 'Cyber-Fox (Neon Kâşif)',
        category: 'robotlar',
        url: makeSvgAvatar('av_robot_cyberfox', ['#3b0764', '#d946ef'], `
            <polygon points="50,76 28,46 34,34 50,44 66,34 72,46" fill="#f97316" stroke="#ea580c" stroke-width="2"/>
            <polygon points="50,76 34,46 44,56 50,52 56,56 66,46" fill="#f8fafc"/>
            <polygon points="28,46 22,22 38,34" fill="#334155" stroke="#f97316" stroke-width="1.5"/>
            <polygon points="28,40 25,26 35,34" fill="#d946ef"/>
            <polygon points="72,46 78,22 62,34" fill="#334155" stroke="#f97316" stroke-width="1.5"/>
            <polygon points="72,40 75,26 65,34" fill="#d946ef"/>
            <path d="M34 46 L66 46 L60 53 L40 53 Z" fill="#06b6d4" stroke="#22d3ee" stroke-width="1"/>
            <circle cx="43" cy="49" r="2.2" fill="#ffffff"/>
            <circle cx="57" cy="49" r="2.2" fill="#ffffff"/>
            <circle cx="50" cy="71" r="2" fill="#0f172a"/>
        `)
    },

    // --- 🐾 SEVİMLİ HAYVAN KÂŞİFLER (8) ---
{
        id: 'av_hayvan_cat',
        name: 'Cosmo-Cat (Uzay Kedisi)',
        category: 'hayvanlar',
        url: makeSvgAvatar('av_hayvan_cat', ['#0f172a', '#6366f1'], `
            <circle cx="50" cy="52" r="21" fill="#f97316"/>
            <path d="M42 56 Q50 63 58 56 Q50 50 42 56 Z" fill="#ffffff"/>
            <polygon points="32,40 28,24 42,34" fill="#f97316"/>
            <polygon points="32,38 30,27 39,34" fill="#f472b6"/>
            <polygon points="68,40 72,24 58,34" fill="#f97316"/>
            <polygon points="68,38 70,27 61,34" fill="#f472b6"/>
            <ellipse cx="42" cy="48" rx="4.5" ry="5.5" fill="#10b981"/>
            <ellipse cx="42" cy="48" rx="2" ry="4" fill="#0f172a"/>
            <circle cx="40.5" cy="45.5" r="1.5" fill="#ffffff"/>
            <circle cx="43.5" cy="50" r="0.8" fill="#ffffff"/>
            <ellipse cx="58" cy="48" rx="4.5" ry="5.5" fill="#10b981"/>
            <ellipse cx="58" cy="48" rx="2" ry="4" fill="#0f172a"/>
            <circle cx="56.5" cy="45.5" r="1.5" fill="#ffffff"/>
            <circle cx="59.5" cy="50" r="0.8" fill="#ffffff"/>
            <polygon points="48,54 52,54 50,56" fill="#f43f5e"/>
            <path d="M46 57 Q50 60 54 57" stroke="#9a3412" stroke-width="1.5" fill="none"/>
            <line x1="33" y1="54" x2="25" y2="52" stroke="#9a3412" stroke-width="1.2"/>
            <line x1="33" y1="57" x2="24" y2="58" stroke="#9a3412" stroke-width="1.2"/>
            <line x1="67" y1="54" x2="75" y2="52" stroke="#9a3412" stroke-width="1.2"/>
            <line x1="67" y1="57" x2="76" y2="58" stroke="#9a3412" stroke-width="1.2"/>
            <circle cx="50" cy="48" r="26" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2.5"/>
            <path d="M34 32 C40 26, 52 26, 60 30" stroke="rgba(255,255,255,0.7)" stroke-width="2" fill="none"/>
            <polygon points="70,36 74,33 74,39" fill="#f97316"/>
            <ellipse cx="68" cy="36" rx="3.5" ry="2.2" fill="#f97316"/>
            <circle cx="66" cy="35" r="0.6" fill="#ffffff"/>
        `)
    },
    {
        id: 'av_hayvan_fox',
        name: 'Kimyager Tilki',
        category: 'hayvanlar',
        url: makeSvgAvatar('av_hayvan_fox', ['#451a03', '#047857'], `
            <polygon points="50,74 26,46 32,32 50,42 68,32 74,46" fill="#ea580c"/>
            <polygon points="50,74 34,48 44,58 50,54 56,58 66,48" fill="#f8fafc"/>
            <polygon points="26,46 20,20 38,32" fill="#ea580c"/>
            <polygon points="20,20 23,28 27,24" fill="#1e293b"/>
            <polygon points="28,40 24,26 34,33" fill="#fed7aa"/>
            <polygon points="74,46 80,20 62,32" fill="#ea580c"/>
            <polygon points="80,20 77,28 73,24" fill="#1e293b"/>
            <polygon points="72,40 76,26 66,33" fill="#fed7aa"/>
            <rect x="33" y="42" width="15" height="11" rx="4" fill="rgba(56,189,248,0.25)" stroke="#0284c7" stroke-width="2"/>
            <rect x="52" y="42" width="15" height="11" rx="4" fill="rgba(56,189,248,0.25)" stroke="#0284c7" stroke-width="2"/>
            <line x1="48" y1="47" x2="52" y2="47" stroke="#0284c7" stroke-width="2"/>
            <line x1="33" y1="46" x2="26" y2="46" stroke="#0284c7" stroke-width="1.8"/>
            <line x1="67" y1="46" x2="74" y2="46" stroke="#0284c7" stroke-width="1.8"/>
            <ellipse cx="40.5" cy="47.5" rx="3.5" ry="4" fill="#78350f"/>
            <circle cx="42" cy="46" r="1.3" fill="#ffffff"/>
            <ellipse cx="59.5" cy="47.5" rx="3.5" ry="4" fill="#78350f"/>
            <circle cx="61" cy="46" r="1.3" fill="#ffffff"/>
            <circle cx="50" cy="68" r="2.2" fill="#0f172a"/>
            <path d="M46 70 Q50 73 54 70" stroke="#78350f" stroke-width="1.5" fill="none"/>
            <polygon points="68,66 74,66 76,78 66,78" fill="#34d399" stroke="#059669" stroke-width="1"/>
            <rect x="69" y="62" width="4" height="4" fill="rgba(255,255,255,0.8)" stroke="#059669" stroke-width="0.8"/>
            <circle cx="71" cy="71" r="1.2" fill="#ffffff"/>
            <circle cx="71" cy="59" r="1" fill="#34d399"/>
        `)
    },
    {
        id: 'av_hayvan_owl',
        name: 'Bilge Baykuş (Astronom)',
        category: 'hayvanlar',
        url: makeSvgAvatar('av_hayvan_owl', ['#090d16', '#312e81'], `
            <ellipse cx="50" cy="54" rx="23" ry="21" fill="#78350f"/>
            <circle cx="39" cy="52" r="11" fill="#fef3c7"/>
            <circle cx="61" cy="52" r="11" fill="#fef3c7"/>
            <circle cx="39" cy="52" r="7.5" fill="#f59e0b"/>
            <circle cx="39" cy="52" r="4.8" fill="#0f172a"/>
            <circle cx="37" cy="50" r="2" fill="#ffffff"/>
            <circle cx="41" cy="54" r="1" fill="#ffffff"/>
            <circle cx="61" cy="52" r="7.5" fill="#f59e0b"/>
            <circle cx="61" cy="52" r="4.8" fill="#0f172a"/>
            <circle cx="59" cy="50" r="2" fill="#ffffff"/>
            <circle cx="63" cy="54" r="1" fill="#ffffff"/>
            <polygon points="47,56 53,56 50,62" fill="#ea580c"/>
            <polygon points="50,22 74,30 50,38 26,30" fill="#1e1b4b" stroke="#312e81" stroke-width="1.5"/>
            <rect x="42" y="34" width="16" height="6" rx="2" fill="#1e1b4b"/>
            <circle cx="50" cy="30" r="2" fill="#facc15"/>
            <path d="M50 30 Q62 34 66 42" stroke="#facc15" stroke-width="1.8" fill="none"/>
            <circle cx="66" cy="43" r="2" fill="#facc15"/>
            <circle cx="28" cy="68" r="5" fill="none" stroke="#facc15" stroke-width="2"/>
            <line x1="25" y1="72" x2="20" y2="78" stroke="#ca8a04" stroke-width="2.5" stroke-linecap="round"/>
        `)
    },
    {
        id: 'av_hayvan_dino',
        name: 'Dino-Kâşif (Jeolog Dinozor)',
        category: 'hayvanlar',
        url: makeSvgAvatar('av_hayvan_dino', ['#292524', '#15803d'], `
            <path d="M30 60 C26 40, 36 28, 52 28 C68 28, 76 40, 72 60 C70 74, 58 76, 50 76 C40 76, 32 72, 30 60 Z" fill="#22c55e"/>
            <ellipse cx="50" cy="68" rx="14" ry="7" fill="#fef08a" opacity="0.8"/>
            <ellipse cx="50" cy="36" rx="26" ry="6.5" fill="#78350f"/>
            <path d="M36 36 C38 22, 62 22, 64 36 Z" fill="#92400e"/>
            <rect x="37" y="33" width="26" height="3" fill="#15803d"/>
            <circle cx="42" cy="48" r="5" fill="#0f172a"/>
            <circle cx="40" cy="46" r="2" fill="#ffffff"/>
            <circle cx="44" cy="50" r="0.9" fill="#ffffff"/>
            <circle cx="58" cy="48" r="5" fill="#0f172a"/>
            <circle cx="56" cy="46" r="2" fill="#ffffff"/>
            <circle cx="60" cy="50" r="0.9" fill="#ffffff"/>
            <ellipse cx="36" cy="55" rx="3" ry="1.8" fill="#f43f5e" opacity="0.4"/>
            <ellipse cx="64" cy="55" rx="3" ry="1.8" fill="#f43f5e" opacity="0.4"/>
            <path d="M46 58 Q50 63 54 58" stroke="#14532d" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <polygon points="47,58 48.5,61 50,58" fill="#ffffff"/>
            <polygon points="50,58 51.5,61 53,58" fill="#ffffff"/>
            <line x1="68" y1="62" x2="76" y2="78" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>
            <rect x="64" y="60" width="10" height="5" rx="1.5" fill="#94a3b8" stroke="#475569" stroke-width="1"/>
        `)
    },
    {
        id: 'av_hayvan_bunny',
        name: 'Uzay Tavşanı',
        category: 'hayvanlar',
        url: makeSvgAvatar('av_hayvan_bunny', ['#1e1b4b', '#f43f5e'], `
            <ellipse cx="38" cy="24" rx="6" ry="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <ellipse cx="38" cy="24" rx="3.5" ry="12" fill="#f472b6"/>
            <ellipse cx="62" cy="24" rx="6" ry="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <ellipse cx="62" cy="24" rx="3.5" ry="12" fill="#f472b6"/>
            <circle cx="50" cy="54" r="20" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <ellipse cx="43" cy="51" rx="4" ry="5" fill="#8b5cf6"/>
            <circle cx="41.5" cy="49" r="1.6" fill="#ffffff"/>
            <circle cx="44.5" cy="53" r="0.8" fill="#ffffff"/>
            <ellipse cx="57" cy="51" rx="4" ry="5" fill="#8b5cf6"/>
            <circle cx="55.5" cy="49" r="1.6" fill="#ffffff"/>
            <circle cx="58.5" cy="53" r="0.8" fill="#ffffff"/>
            <polygon points="48,57 52,57 50,59" fill="#f43f5e"/>
            <path d="M47 60 Q50 63 53 60" stroke="#f43f5e" stroke-width="1.5" fill="none"/>
            <polygon points="72,54 78,74 66,74" fill="#ea580c"/>
            <polygon points="68,54 72,46 76,54" fill="#22c55e"/>
            <polygon points="66,74 72,82 78,74" fill="#facc15"/>
        `)
    },
    {
        id: 'av_hayvan_bear',
        name: 'Kutup Ayısı (İklim Araştırmacısı)',
        category: 'hayvanlar',
        url: makeSvgAvatar('av_hayvan_bear', ['#083344', '#38bdf8'], `
            <circle cx="32" cy="34" r="6.5" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <circle cx="32" cy="34" r="3.5" fill="#fbcfe8"/>
            <circle cx="68" cy="34" r="6.5" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
            <circle cx="68" cy="34" r="3.5" fill="#fbcfe8"/>
            <circle cx="50" cy="50" r="23" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
            <path d="M33 40 C34 26, 66 26, 67 40 Z" fill="#0284c7"/>
            <rect x="31" y="38" width="38" height="5" rx="2" fill="#38bdf8"/>
            <circle cx="50" cy="24" r="4" fill="#f8fafc"/>
            <circle cx="42" cy="48" r="4" fill="#0f172a"/>
            <circle cx="40.5" cy="46.5" r="1.5" fill="#ffffff"/>
            <circle cx="58" cy="48" r="4" fill="#0f172a"/>
            <circle cx="56.5" cy="46.5" r="1.5" fill="#ffffff"/>
            <ellipse cx="50" cy="57" rx="9" ry="6" fill="#e2e8f0"/>
            <ellipse cx="50" cy="55" rx="4" ry="2.8" fill="#0f172a"/>
            <path d="M47 58 Q50 61 53 58" stroke="#0f172a" stroke-width="1.5" fill="none"/>
            <path d="M28 66 Q50 78 72 66 Q50 72 28 66 Z" fill="#ef4444"/>
            <line x1="38" y1="68" x2="41" y2="74" stroke="#ffffff" stroke-width="2.5"/>
            <line x1="48" y1="69" x2="51" y2="75" stroke="#ffffff" stroke-width="2.5"/>
            <line x1="58" y1="68" x2="61" y2="74" stroke="#ffffff" stroke-width="2.5"/>
        `)
    },
    {
        id: 'av_hayvan_otter',
        name: 'Dalgıç Samur (Deniz Biyoloğu)',
        category: 'hayvanlar',
        url: makeSvgAvatar('av_hayvan_otter', ['#022c22', '#06b6d4'], `
            <circle cx="30" cy="44" r="4.5" fill="#451a03"/>
            <circle cx="70" cy="44" r="4.5" fill="#451a03"/>
            <circle cx="50" cy="52" r="22" fill="#78350f" stroke="#451a03" stroke-width="1.5"/>
            <ellipse cx="50" cy="62" rx="14" ry="9" fill="#fef3c7"/>
            <rect x="33" y="42" width="34" height="13" rx="5" fill="rgba(6,182,212,0.3)" stroke="#facc15" stroke-width="2"/>
            <line x1="50" y1="42" x2="50" y2="55" stroke="#facc15" stroke-width="1.5"/>
            <path d="M66 50 Q76 50 76 34 L76 22" fill="none" stroke="#facc15" stroke-width="2.5" stroke-linecap="round"/>
            <ellipse cx="76" cy="22" rx="2" ry="1" fill="#ef4444"/>
            <ellipse cx="42" cy="48" rx="3.5" ry="4" fill="#451a03"/>
            <circle cx="43.5" cy="46.5" r="1.3" fill="#ffffff"/>
            <ellipse cx="58" cy="48" rx="3.5" ry="4" fill="#451a03"/>
            <circle cx="59.5" cy="46.5" r="1.3" fill="#ffffff"/>
            <polygon points="48,60 52,60 50,62" fill="#0f172a"/>
            <path d="M46 64 Q50 67 54 64" stroke="#451a03" stroke-width="1.5" fill="none"/>
            <line x1="38" y1="62" x2="30" y2="60" stroke="#451a03" stroke-width="1"/>
            <line x1="38" y1="65" x2="29" y2="65" stroke="#451a03" stroke-width="1"/>
            <line x1="62" y1="62" x2="70" y2="60" stroke="#451a03" stroke-width="1"/>
            <line x1="62" y1="65" x2="71" y2="65" stroke="#451a03" stroke-width="1"/>
        `)
    },
    {
        id: 'av_hayvan_koala',
        name: 'Botanikçi Koala',
        category: 'hayvanlar',
        url: makeSvgAvatar('av_hayvan_koala', ['#14532d', '#65a30d'], `
            <circle cx="28" cy="38" r="11" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
            <circle cx="28" cy="38" r="7" fill="#f8fafc"/>
            <circle cx="72" cy="38" r="11" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
            <circle cx="72" cy="38" r="7" fill="#f8fafc"/>
            <circle cx="50" cy="52" r="21" fill="#94a3b8" stroke="#64748b" stroke-width="1.5"/>
            <ellipse cx="50" cy="56" rx="6" ry="9" fill="#1e293b"/>
            <ellipse cx="48.5" cy="53" rx="2" ry="3.5" fill="#475569" opacity="0.6"/>
            <ellipse cx="38" cy="48" rx="3.5" ry="4" fill="#0f172a"/>
            <circle cx="37" cy="46.5" r="1.3" fill="#ffffff"/>
            <ellipse cx="62" cy="48" rx="3.5" ry="4" fill="#0f172a"/>
            <circle cx="61" cy="46.5" r="1.3" fill="#ffffff"/>
            <circle cx="34" cy="56" r="3" fill="#f43f5e" opacity="0.35"/>
            <circle cx="66" cy="56" r="3" fill="#f43f5e" opacity="0.35"/>
            <path d="M26 68 Q22 56 34 56 Q36 68 26 68 Z" fill="#22c55e" stroke="#15803d" stroke-width="1"/>
            <circle cx="66" cy="68" r="6" fill="none" stroke="#facc15" stroke-width="2"/>
            <line x1="70" y1="73" x2="76" y2="80" stroke="#ca8a04" stroke-width="2.5" stroke-linecap="round"/>
        `)
    },

    // --- 👦👧 GENÇ KÂŞİFLER & ÖĞRENCİLER (8) ---
    {
        id: "av_ogrenci_genc_kiz",
        name: "Zeynep · Yıldız Kâşifi",
        category: "ogrenciler",
        url: makeSvgAvatar("av_ogrenci_genc_kiz", ["#4a044e", "#c026d3"], `
            <!-- Mint green hoodie -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#10b981"/>
            <path d="M42 64 C44 71, 50 73, 50 73 C50 73, 56 71, 58 64 Z" fill="#059669"/>
            <line x1="46" y1="71" x2="44" y2="79" stroke="#f8fafc" stroke-width="1.6" stroke-linecap="round"/>
            <circle cx="44" cy="79.5" r="1.2" fill="#facc15"/>
            <line x1="54" y1="71" x2="56" y2="79" stroke="#f8fafc" stroke-width="1.6" stroke-linecap="round"/>
            <circle cx="56" cy="79.5" r="1.2" fill="#facc15"/>
            <!-- Voluminous wavy chestnut hair back -->
            <path d="M25 44 C21 56, 23 72, 27 78 C31 78, 33 68, 32 55 C32 34, 38 22, 50 22 C62 22, 68 34, 68 55 C67 68, 69 78, 73 78 C77 72, 79 56, 75 44 Z" fill="#3b1e08"/>
            <path d="M24 52 C26 64, 29 74, 32 76" stroke="#573010" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            <path d="M76 52 C74 64, 71 74, 68 76" stroke="#573010" stroke-width="2.5" stroke-linecap="round" fill="none"/>
            ${H.humanHead("#fed7aa", "rgba(244,63,94,0.3)")}
            ${H.eyebrows("#3b1e08")}
            ${H.eyes("#b45309", "#18181b")}
            ${H.smile("#e11d48")}
            <!-- Wavy front bangs -->
            <path d="M29 40 C32 28, 44 24, 52 26 C62 24, 70 28, 71 40 C66 32, 58 31, 51 34 C44 32, 36 33, 29 40 Z" fill="#573010"/>
            <path d="M38 27 Q50 24 62 27" stroke="rgba(255,255,255,0.25)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <!-- Shining gold star hairpin -->
            <polygon points="66,32 67.5,35 71,35 68,37.5 69.5,41 66,38.5 62.5,41 64,37.5 61,35 64.5,35" fill="#facc15" stroke="#eab308" stroke-width="0.8"/>
            <circle cx="66" cy="36" r="1" fill="#ffffff"/>
        `)
    },
    {
        id: "av_ogrenci_genc_erkek",
        name: "Can · Uzay Gözlemcisi",
        category: "ogrenciler",
        url: makeSvgAvatar("av_ogrenci_genc_erkek", ["#0f172a", "#1d4ed8"], `
            <!-- Navy college varsity jacket -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#1e3a8a"/>
            <polygon points="46,64 54,64 50,72" fill="#ffffff"/>
            <polygon points="42,64 47,64 44,70" fill="#f8fafc"/>
            <polygon points="58,64 53,64 56,70" fill="#f8fafc"/>
            <line x1="50" y1="72" x2="50" y2="84" stroke="#facc15" stroke-width="2"/>
            <circle cx="50" cy="76" r="1.2" fill="#ffffff"/>
            <circle cx="50" cy="81" r="1.2" fill="#ffffff"/>
            <circle cx="34" cy="72" r="3" fill="#38bdf8"/>
            <circle cx="34" cy="72" r="1.5" fill="#ffffff"/>
            <!-- Hair back -->
            <path d="M28 46 C26 32, 34 22, 50 22 C66 22, 74 32, 72 46 Z" fill="#451a03"/>
            ${H.humanHead("#fed7aa")}
            ${H.eyebrows("#451a03")}
            ${H.eyes("#0284c7")}
            ${H.happyMouth()}
            <!-- Modern side-parted layered hair with raised lock -->
            <path d="M28 42 C31 30, 42 22, 56 23 C68 25, 73 33, 73 42 C68 34, 58 32, 49 35 C40 37, 34 36, 28 42 Z" fill="#78350f"/>
            <path d="M42 25 C44 19, 49 20, 52 24" stroke="#92400e" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M34 33 Q44 26 56 28" stroke="rgba(255,255,255,0.22)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
        `)
    },
    {
        id: "av_ogrenci_gozluklu_kiz",
        name: "Elif · Kod & Bilişim Kâşifi",
        category: "ogrenciler",
        url: makeSvgAvatar("av_ogrenci_gozluklu_kiz", ["#042f2e", "#0d9488"], `
            <!-- High ponytail back -->
            <path d="M62 26 C76 18, 86 32, 80 50 C75 52, 70 42, 64 34 Z" fill="#18181b"/>
            <ellipse cx="64" cy="30" rx="4" ry="5" fill="#f59e0b"/>
            <!-- Orange sweatshirt -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#ea580c"/>
            <path d="M44 64 Q50 68 56 64" stroke="#c2410c" stroke-width="2" fill="none"/>
            <text x="50" y="76" fill="#fef08a" font-size="7" font-weight="bold" font-family="monospace" text-anchor="middle">&lt;/&gt;</text>
            <!-- Hair base -->
            <path d="M28 46 C26 32, 34 22, 50 22 C66 22, 74 32, 72 46 Z" fill="#18181b"/>
            ${H.humanHead("#fcd34d")}
            ${H.eyebrows("#18181b")}
            ${H.eyes("#10b981")}
            ${H.smile()}
            <!-- Modern rounded glasses with tint and reflections -->
            <circle cx="41.5" cy="46" r="6.5" fill="rgba(255,255,255,0.15)" stroke="#0f172a" stroke-width="1.8"/>
            <circle cx="58.5" cy="46" r="6.5" fill="rgba(255,255,255,0.15)" stroke="#0f172a" stroke-width="1.8"/>
            <path d="M48 46 Q50 44 52 46" stroke="#0f172a" stroke-width="1.8" fill="none"/>
            <line x1="35" y1="45" x2="31" y2="44" stroke="#0f172a" stroke-width="1.6"/>
            <line x1="65" y1="45" x2="69" y2="44" stroke="#0f172a" stroke-width="1.6"/>
            <line x1="39" y1="43" x2="43" y2="41" stroke="#ffffff" stroke-width="1" stroke-linecap="round"/>
            <line x1="56" y1="43" x2="60" y2="41" stroke="#ffffff" stroke-width="1" stroke-linecap="round"/>
            <!-- Dark glossy bangs -->
            <path d="M30 42 C34 33, 44 28, 50 30 C56 28, 66 33, 70 42 C64 36, 56 35, 50 36 C44 35, 36 36, 30 42 Z" fill="#27272a"/>
        `)
    },
    {
        id: "av_ogrenci_kulaklikli_erkek",
        name: "Barış · Teknoloji Kâşifi",
        category: "ogrenciler",
        url: makeSvgAvatar("av_ogrenci_kulaklikli_erkek", ["#1e1b4b", "#0284c7"], `
            <!-- Charcoal hoodie -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#334155"/>
            <polygon points="45,64 55,64 50,72" fill="#1e293b"/>
            <!-- Neon blue gaming headset resting around neck -->
            <path d="M34 60 C38 67, 62 67, 66 60" fill="none" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
            <rect x="29" y="55" width="8" height="13" rx="3.5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
            <circle cx="33" cy="61.5" r="1.8" fill="#38bdf8"/>
            <rect x="63" y="55" width="8" height="13" rx="3.5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
            <circle cx="67" cy="61.5" r="1.8" fill="#38bdf8"/>
            <!-- Spiky dark hair back -->
            <path d="M28 44 L32 26 L40 22 L50 18 L60 22 L68 26 L72 44 Z" fill="#1c1917"/>
            ${H.humanHead("#fed7aa")}
            ${H.eyebrows("#1c1917")}
            ${H.eyes("#0284c7")}
            ${H.smile()}
            <!-- Modern textured front hair -->
            <polygon points="30,40 35,30 43,36 50,26 57,36 65,30 70,40 64,35 50,33 36,35" fill="#292524"/>
            <path d="M38 29 Q50 25 62 29" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" fill="none"/>
        `)
    },
    {
        id: "av_ogrenci_kivircik_kiz",
        name: "Defne · Doğa Kâşifi",
        category: "ogrenciler",
        url: makeSvgAvatar("av_ogrenci_kivircik_kiz", ["#064e3b", "#10b981"], `
            <!-- Mustard yellow t-shirt -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#eab308"/>
            <path d="M44 64 Q50 68 56 64" stroke="#ca8a04" stroke-width="2" fill="none"/>
            <path d="M50 71 Q53 68 53 73 Q50 75 50 71 Z" fill="#15803d"/>
            <!-- Voluminous curly dark hair cloud -->
            <circle cx="28" cy="40" r="9" fill="#1c1917"/>
            <circle cx="26" cy="50" r="8" fill="#1c1917"/>
            <circle cx="34" cy="28" r="9" fill="#1c1917"/>
            <circle cx="50" cy="22" r="10" fill="#1c1917"/>
            <circle cx="66" cy="28" r="9" fill="#1c1917"/>
            <circle cx="74" cy="40" r="9" fill="#1c1917"/>
            <circle cx="74" cy="50" r="8" fill="#1c1917"/>
            <!-- Yellow headband -->
            <path d="M30 40 Q50 28 70 40" stroke="#facc15" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            ${H.humanHead("#fed7aa", "rgba(244,63,94,0.32)")}
            <!-- Cute freckles -->
            <circle cx="39" cy="52" r="0.8" fill="#c2410c" opacity="0.6"/>
            <circle cx="41" cy="53.5" r="0.7" fill="#c2410c" opacity="0.6"/>
            <circle cx="59" cy="53.5" r="0.7" fill="#c2410c" opacity="0.6"/>
            <circle cx="61" cy="52" r="0.8" fill="#c2410c" opacity="0.6"/>
            ${H.eyebrows("#1c1917")}
            ${H.eyes("#78350f")}
            ${H.happyMouth()}
            <!-- Front curly locks -->
            <circle cx="40" cy="34" r="5" fill="#292524"/>
            <circle cx="50" cy="33" r="5.5" fill="#292524"/>
            <circle cx="60" cy="34" r="5" fill="#292524"/>
        `)
    },
    {
        id: "av_ogrenci_sportif_erkek",
        name: "Mert · Roket & Uzay Tutkunu",
        category: "ogrenciler",
        url: makeSvgAvatar("av_ogrenci_sportif_erkek", ["#7c2d12", "#ea580c"], `
            <!-- Red sports jersey with rocket emblem -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#dc2626"/>
            <polygon points="46,64 54,64 50,71" fill="#f8fafc"/>
            <polygon points="50,73 52,77 48,77" fill="#facc15"/>
            <line x1="50" y1="77" x2="50" y2="80" stroke="#f97316" stroke-width="1.5"/>
            <!-- Hair back -->
            <path d="M28 42 C28 26, 38 18, 50 18 C62 18, 72 26, 72 42 Z" fill="#1e293b"/>
            <!-- White sports headband -->
            <path d="M30 38 Q50 32 70 38" stroke="#ffffff" stroke-width="4.5" fill="none" stroke-linecap="round"/>
            <path d="M30 38 Q50 32 70 38" stroke="#ef4444" stroke-width="1.6" fill="none"/>
            ${H.humanHead("#fed7aa")}
            ${H.eyebrows("#1e293b")}
            ${H.eyes("#0284c7")}
            ${H.happyMouth()}
            <!-- Dynamic short blown hair tufts above headband -->
            <polygon points="38,28 42,16 48,24 53,15 58,24 64,18 64,28" fill="#334155"/>
            <path d="M42 22 C46 16, 52 16, 56 22" stroke="rgba(255,255,255,0.25)" stroke-width="1.8" fill="none"/>
        `)
    },
    {
        id: "av_ogrenci_sanatci_kiz",
        name: "Derya · Çizim & Tasarım Kâşifi",
        category: "ogrenciler",
        url: makeSvgAvatar("av_ogrenci_sanatci_kiz", ["#581c87", "#ec4899"], `
            <!-- Striped artist shirt -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#f8fafc"/>
            <line x1="28" y1="71" x2="72" y2="71" stroke="#312e81" stroke-width="2"/>
            <line x1="26" y1="77" x2="74" y2="77" stroke="#312e81" stroke-width="2"/>
            <line x1="24" y1="83" x2="76" y2="83" stroke="#312e81" stroke-width="2"/>
            <path d="M44 64 Q50 67 56 64" stroke="#e11d48" stroke-width="2" fill="none"/>
            <!-- Chic bob hair back -->
            <path d="M28 46 C27 58, 30 65, 33 65 C33 50, 31 36, 50 36 C69 36, 67 50, 67 65 C70 65, 73 58, 72 46 Z" fill="#291807"/>
            <!-- Elegant burgundy beret tilted -->
            <ellipse cx="52" cy="27" rx="22" ry="9" fill="#881337" transform="rotate(-6 52 27)"/>
            <line x1="51" y1="18" x2="52" y2="15" stroke="#881337" stroke-width="2.5" stroke-linecap="round"/>
            ${H.humanHead("#fed7aa", "rgba(244,63,94,0.32)")}
            ${H.eyebrows("#291807")}
            ${H.eyes("#a855f7")}
            ${H.smile("#e11d48")}
            <!-- Clean modern blunt bangs -->
            <path d="M32 40 C36 37, 44 36, 50 37 C56 36, 64 37, 68 40 Z" fill="#45220a"/>
        `)
    },
    {
        id: "av_ogrenci_astronot_genc",
        name: "Umut · Geleceğin Kâşifi",
        category: "ogrenciler",
        url: makeSvgAvatar("av_ogrenci_astronot_genc", ["#030712", "#1e3a8a"], `
            <!-- Space stars in background -->
            <circle cx="20" cy="24" r="1.2" fill="#ffffff" opacity="0.8"/>
            <circle cx="80" cy="28" r="1.5" fill="#fde047" opacity="0.9"/>
            <circle cx="82" cy="68" r="0.9" fill="#ffffff" opacity="0.7"/>
            <circle cx="18" cy="62" r="1" fill="#ffffff" opacity="0.7"/>
            <!-- White astronaut flight suit with blue trim -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#f8fafc"/>
            <path d="M28 84 L32 68 L37 68 L33 84 Z" fill="#0284c7"/>
            <path d="M72 84 L68 68 L63 68 L67 84 Z" fill="#0284c7"/>
            <!-- Turkish crescent & star mission patch on chest -->
            <circle cx="50" cy="74" r="4.2" fill="#dc2626"/>
            <path d="M50 71.5 A 2 2 0 1 0 52 75.5 A 1.6 1.6 0 1 1 50 71.5" fill="#ffffff"/>
            <polygon points="52.5,73.5 53,74.2 53.8,74.2 53.2,74.7 53.5,75.4 52.5,75 51.5,75.4 51.8,74.7 51.2,74.2 52,74.2" fill="#ffffff"/>
            <!-- Light brown energetic hair back -->
            <path d="M28 44 C28 28, 38 20, 50 20 C62 20, 72 28, 72 44 Z" fill="#78350f"/>
            ${H.humanHead("#fed7aa")}
            ${H.eyebrows("#78350f")}
            ${H.eyes("#0284c7")}
            ${H.happyMouth()}
            <!-- Dynamic parted bangs with shiny highlights -->
            <path d="M30 40 C34 32, 44 26, 52 27 C62 25, 70 31, 71 40 C65 34, 57 32, 50 35 C43 33, 35 34, 30 40 Z" fill="#a16207"/>
            <path d="M38 28 Q48 24 58 28" stroke="rgba(255,255,255,0.25)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        `)
    },

    // --- 🔬 BİLİM İNSANLARI (8) ---
    {
        id: "av_bilim_einstein",
        name: "Albert Einstein",
        category: "bilim",
        url: makeSvgAvatar("av_bilim_einstein", ["#090d16", "#312e81"], `
            <!-- Brown knit sweater and white collar -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#573a24"/>
            <polygon points="46,64 54,64 50,72" fill="#f8fafc"/>
            <!-- Wild cloud of genius white hair -->
            <circle cx="26" cy="38" r="9" fill="#e2e8f0"/>
            <circle cx="22" cy="48" r="8" fill="#e2e8f0"/>
            <circle cx="32" cy="26" r="9" fill="#e2e8f0"/>
            <circle cx="48" cy="20" r="10" fill="#e2e8f0"/>
            <circle cx="64" cy="24" r="9" fill="#e2e8f0"/>
            <circle cx="76" cy="36" r="9" fill="#e2e8f0"/>
            <circle cx="78" cy="48" r="8" fill="#e2e8f0"/>
            <path d="M30 30 C38 22, 60 22, 68 30" stroke="#cbd5e1" stroke-width="2" fill="none"/>
            ${H.humanHead("#fed7aa", "rgba(244,63,94,0.2)")}
            <!-- Wise kindly eyes with smile crinkles -->
            <path d="M36 41 Q42 38 47 41" stroke="#475569" stroke-width="2.2" fill="none"/>
            <ellipse cx="42.5" cy="45.5" rx="3.5" ry="4" fill="#334155"/>
            <circle cx="41.5" cy="44" r="1.4" fill="#ffffff"/>
            <path d="M53 41 Q58 38 64 41" stroke="#475569" stroke-width="2.2" fill="none"/>
            <ellipse cx="57.5" cy="45.5" rx="3.5" ry="4" fill="#334155"/>
            <circle cx="56.5" cy="44" r="1.4" fill="#ffffff"/>
            <!-- Bushy white mustache -->
            <path d="M36 53 C40 49, 48 49, 50 52 C52 49, 60 49, 64 53 C66 58, 56 60, 50 55 C44 60, 34 58, 36 53 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
            <path d="M47 57 Q50 60 53 57" stroke="#b91c1c" stroke-width="1.8" fill="none"/>
        `)
    },
    {
        id: "av_bilim_curie",
        name: "Marie Curie",
        category: "bilim",
        url: makeSvgAvatar("av_bilim_curie", ["#020617", "#1e3a8a"], `
            <!-- Victorian dark high-collar gown -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#0f172a"/>
            <path d="M42 64 C45 68, 55 68, 58 64 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.8"/>
            <!-- Updo hair bun -->
            <ellipse cx="50" cy="22" rx="13" ry="8" fill="#573010"/>
            <path d="M28 46 C26 32, 34 24, 50 24 C66 24, 74 32, 72 46 Z" fill="#78350f"/>
            ${H.humanHead("#fed7aa", "rgba(244,63,94,0.22)")}
            ${H.eyebrows("#573010")}
            ${H.eyes("#0284c7")}
            ${H.smile("#b91c1c")}
            <!-- Swept-up wavy locks -->
            <path d="M30 42 C36 32, 44 30, 50 32 C56 30, 64 32, 70 42 Z" fill="#92400e"/>
            <!-- Glowing test tube with soft radium glow -->
            <circle cx="71" cy="72" r="6" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.6"/>
            <polygon points="68,78 74,78 72,66 70,66" fill="#38bdf8" opacity="0.9" stroke="#7dd3fc" stroke-width="1"/>
            <rect x="69.5" y="63" width="3" height="4" fill="#f8fafc" rx="1"/>
            <circle cx="71" cy="72" r="1.5" fill="#ffffff"/>
        `)
    },
    {
        id: "av_bilim_ali_kuscu",
        name: "Ali Kuşçu",
        category: "bilim",
        url: makeSvgAvatar("av_bilim_ali_kuscu", ["#0f766e", "#d97706"], `
            <!-- Scholar robe with gold sırma trim -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#042f2e"/>
            <polygon points="46,64 54,64 50,76" fill="#f59e0b"/>
            <line x1="50" y1="76" x2="50" y2="84" stroke="#d97706" stroke-width="2"/>
            <!-- Traditional astronomer turban -->
            <ellipse cx="50" cy="27" rx="22" ry="12" fill="#fef3c7" stroke="#d97706" stroke-width="1.8"/>
            <path d="M32 27 C38 19, 62 19, 68 27" stroke="#ca8a04" stroke-width="2" fill="none"/>
            <circle cx="50" cy="19" r="3.5" fill="#dc2626" stroke="#facc15" stroke-width="1.2"/>
            ${H.humanHead("#fed7aa")}
            <!-- Trimmed dignified beard -->
            <path d="M35 50 C35 64, 42 69, 50 69 C58 69, 65 64, 65 50 Z" fill="#334155"/>
            ${H.eyebrows("#1e293b")}
            ${H.eyes("#b45309")}
            <path d="M46 54 Q50 56.5 54 54" stroke="#c2410c" stroke-width="1.8" fill="none"/>
            <!-- Gold astrolabe/celestial ring in hand -->
            <circle cx="70" cy="72" r="5.5" fill="none" stroke="#facc15" stroke-width="1.8"/>
            <line x1="70" y1="66.5" x2="70" y2="77.5" stroke="#facc15" stroke-width="1"/>
            <line x1="64.5" y1="72" x2="75.5" y2="72" stroke="#facc15" stroke-width="1"/>
            <circle cx="70" cy="72" r="1.5" fill="#f59e0b"/>
        `)
    },
    {
        id: "av_bilim_newton",
        name: "Isaac Newton",
        category: "bilim",
        url: makeSvgAvatar("av_bilim_newton", ["#2e1065", "#6b21a8"], `
            <!-- Velvet baroque coat & lace jabot -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#3b0764"/>
            <path d="M46 64 L54 64 L52 75 L48 75 Z" fill="#f8fafc"/>
            <line x1="47" y1="68" x2="53" y2="68" stroke="#cbd5e1" stroke-width="1"/>
            <line x1="48" y1="72" x2="52" y2="72" stroke="#cbd5e1" stroke-width="1"/>
            <!-- Apple brooch -->
            <circle cx="36" cy="71" r="3.5" fill="#ef4444"/>
            <circle cx="35" cy="70" r="1" fill="#ffffff"/>
            <path d="M36 67.5 Q38 65.5 39 67" stroke="#22c55e" stroke-width="1.2" fill="none"/>
            <!-- Wavy ringlet curls down shoulders -->
            <path d="M24 46 C20 30, 32 20, 50 20 C68 20, 80 30, 76 46 C80 62, 73 75, 71 77 C66 58, 63 36, 50 36 C37 36, 34 58, 29 77 C27 75, 20 62, 24 46 Z" fill="#78350f"/>
            <circle cx="26" cy="62" r="4" fill="#92400e"/>
            <circle cx="74" cy="62" r="4" fill="#92400e"/>
            ${H.humanHead("#fed7aa")}
            ${H.eyebrows("#573010")}
            ${H.eyes("#3b82f6")}
            ${H.smile()}
            <path d="M30 40 C36 32, 44 32, 50 34 C56 32, 64 32, 70 40 Z" fill="#92400e"/>
        `)
    },
    {
        id: "av_bilim_galileo",
        name: "Galileo Galilei",
        category: "bilim",
        url: makeSvgAvatar("av_bilim_galileo", ["#0c4a6e", "#0369a1"], `
            <!-- Scholar robe & white Renaissance ruff collar -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#1e293b"/>
            <path d="M36 64 C42 69, 58 69, 64 64 Z" fill="#e2e8f0"/>
            <!-- Grey hair & beard -->
            <path d="M26 46 C24 30, 34 22, 50 22 C66 22, 76 30, 74 46 Z" fill="#94a3b8"/>
            <path d="M34 50 C32 64, 40 70, 50 70 C60 70, 68 64, 66 50 C62 55, 56 57, 50 57 C44 57, 38 55, 34 50 Z" fill="#cbd5e1"/>
            ${H.humanHead("#fed7aa")}
            ${H.eyebrows("#64748b")}
            ${H.eyes("#0284c7")}
            <path d="M46 54 Q50 56.5 54 54" stroke="#c2410c" stroke-width="1.8" fill="none"/>
            <path d="M30 40 C36 30, 44 30, 50 32 C56 30, 64 30, 70 40 Z" fill="#cbd5e1"/>
            <!-- Brass mini telescope pointed skyward -->
            <line x1="66" y1="78" x2="78" y2="62" stroke="#d97706" stroke-width="4.5" stroke-linecap="round"/>
            <line x1="66" y1="78" x2="78" y2="62" stroke="#facc15" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="78" cy="62" r="2.8" fill="#38bdf8"/>
            <circle cx="78" cy="62" r="1.2" fill="#ffffff"/>
        `)
    },
    {
        id: "av_bilim_tesla",
        name: "Nikola Tesla",
        category: "bilim",
        url: makeSvgAvatar("av_bilim_tesla", ["#09090b", "#0284c7"], `
            <!-- Black formal suit, white collar & bowtie -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#09090b"/>
            <polygon points="46,64 54,64 50,71" fill="#f8fafc"/>
            <polygon points="48,68 52,68 50,72" fill="#18181b"/>
            <!-- Electric lightning sparks on lapel -->
            <polygon points="32,70 35,66 34,71 37,67 33,74" fill="#38bdf8"/>
            <circle cx="34" cy="70" r="1" fill="#ffffff"/>
            <polygon points="68,69 65,65 66,70 63,66 67,73" fill="#facc15"/>
            <!-- Sleek dark side-parted hair -->
            <path d="M28 44 C26 30, 36 22, 50 22 C64 22, 74 30, 72 44 Z" fill="#09090b"/>
            <path d="M28 42 C34 30, 46 26, 49 32 C51 32, 62 28, 72 42 Z" fill="#18181b"/>
            <path d="M38 28 Q48 24 58 28" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" fill="none"/>
            ${H.humanHead("#fed7aa")}
            ${H.eyebrows("#09090b")}
            ${H.eyes("#06b6d4")}
            <!-- Neat mustache -->
            <path d="M42 54 C45 52, 48 52, 50 54 C52 52, 55 52, 58 54 C57 56, 52 56, 50 54.5 C48 56, 43 56, 42 54 Z" fill="#09090b"/>
            <path d="M47 58 Q50 60 53 58" stroke="#b91c1c" stroke-width="1.5" fill="none"/>
        `)
    },
    {
        id: "av_bilim_el_cezeri",
        name: "El-Cezeri",
        category: "bilim",
        url: makeSvgAvatar("av_bilim_el_cezeri", ["#451a03", "#b45309"], `
            <!-- Scholar robe & amber trim -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#78350f"/>
            <polygon points="46,64 54,64 50,75" fill="#fde047"/>
            <!-- Mechanical gear badge on lapel -->
            <circle cx="36" cy="72" r="4.5" fill="none" stroke="#facc15" stroke-width="1.8"/>
            <circle cx="36" cy="72" r="2" fill="#f59e0b"/>
            <line x1="36" y1="66" x2="36" y2="78" stroke="#facc15" stroke-width="1.5"/>
            <line x1="30" y1="72" x2="42" y2="72" stroke="#facc15" stroke-width="1.5"/>
            <!-- Traditional turban with emerald -->
            <ellipse cx="50" cy="28" rx="22" ry="12" fill="#fef08a" stroke="#ca8a04" stroke-width="1.8"/>
            <path d="M32 28 C38 22, 62 22, 68 28" stroke="#b45309" stroke-width="2" fill="none"/>
            <circle cx="50" cy="21" r="3" fill="#059669" stroke="#facc15" stroke-width="1"/>
            ${H.humanHead("#fed7aa")}
            <!-- Trimmed scholar beard -->
            <path d="M35 50 C35 65, 42 70, 50 70 C58 70, 65 65, 65 50 Z" fill="#451a03"/>
            ${H.eyebrows("#451a03")}
            ${H.eyes("#b45309")}
            <path d="M46 54 Q50 56.5 54 54" stroke="#c2410c" stroke-width="1.8" fill="none"/>
        `)
    },
    {
        id: "av_bilim_genc_kadin_arastirmaci",
        name: "Dr. Feryal · Astrofizikçi",
        category: "bilim",
        url: makeSvgAvatar("av_bilim_genc_kadin_arastirmaci", ["#1e1b4b", "#7c3aed"], `
            <!-- White lab coat with indigo inner shirt -->
            <path d="M22 84 C24 67, 36 64, 50 64 C64 64, 76 67, 78 84 Z" fill="#f8fafc"/>
            <polygon points="46,64 54,64 50,73" fill="#4f46e5"/>
            <line x1="64" y1="70" x2="64" y2="76" stroke="#0284c7" stroke-width="1.8" stroke-linecap="round"/>
            <!-- ID badge strap & badge -->
            <path d="M46 64 L48 76 L52 76 L54 64" fill="none" stroke="#6366f1" stroke-width="1.2"/>
            <rect x="47" y="76" width="6" height="8" rx="1" fill="#fde047" stroke="#ca8a04" stroke-width="0.8"/>
            <circle cx="50" cy="80" r="1.5" fill="#312e81"/>
            <!-- Layered sleek black bob hair back -->
            <path d="M26 44 C24 55, 27 68, 30 72 C33 72, 34 62, 33 50 C33 34, 38 24, 50 24 C62 24, 67 34, 67 50 C66 62, 67 72, 70 72 C73 68, 76 55, 74 44 Z" fill="#09090b"/>
            ${H.humanHead("#fed7aa", "rgba(244,63,94,0.25)")}
            ${H.eyebrows("#18181b")}
            ${H.eyes("#8b5cf6")}
            ${H.smile("#e11d48")}
            <!-- Modern wireframe glasses -->
            <rect x="35" y="41" width="13" height="10" rx="3.5" fill="rgba(255,255,255,0.15)" stroke="#38bdf8" stroke-width="1.6"/>
            <rect x="52" y="41" width="13" height="10" rx="3.5" fill="rgba(255,255,255,0.15)" stroke="#38bdf8" stroke-width="1.6"/>
            <line x1="48" y1="45" x2="52" y2="45" stroke="#38bdf8" stroke-width="1.6"/>
            <!-- Sleek styled bangs -->
            <path d="M30 40 C34 32, 44 28, 50 30 C56 28, 66 32, 70 40 C64 35, 56 34, 50 35 C44 34, 36 35, 30 40 Z" fill="#18181b"/>
        `)
    }
];
const kozmikAvatarlar = AVATARS;

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
            if (el.id === 'modal-onboarding-grade' && !document.body.classList.contains('account-admin')) return;
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

async function toggleMasterPause() {
    if(quizState.ranked && !quizState.ranked.state.done && !quizState.locked && quizState.ranked.state.question) {
        try {await quizState.ranked.action(isGlobalPaused?'resume':'pause');applyRankedState();}
        catch(e){showRankedRetry(()=>renderIndividual(),e);return;}
    }
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
    if (activeMode === 'bireysel' && !COMPETITION_BACKEND_READY) {
        content.insertAdjacentHTML('beforeend', '<p class="competition-status" role="status">Yeni liderlik puanı kaydı geçici olarak kapalı. Soruları antrenman için çözebilir, geçmiş puanlarını görüntüleyebilirsin.</p>');
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
        list.forEach((q, idx) => {
            if (!q.id) {
                q.id = `sl-g${gKey}-u${q.unit !== undefined ? q.unit : 'x'}-q${idx + 1}`;
            }
        });
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

// Authoritative competition writes use the trusted Worker; browser role/class
// checks are only UX. Never fall back to direct score writes on server errors.
async function competitionCall(name, data) {
    if (!COMPETITION_BACKEND_READY || !COMPETITION_API_URL) throw Error('Güvenli yarışma sunucusu henüz etkinleştirilmedi.');
    const user=auth.currentUser;
    const headers={'Content-Type':'application/json'};
    if(user)headers.Authorization=`Bearer ${await user.getIdToken()}`;
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),30000);
    let response;try{response=await fetch(COMPETITION_API_URL.replace(/\/$/,'')+'/rpc/'+encodeURIComponent(name),{method:'POST',headers,body:JSON.stringify(data),signal:controller.signal});}finally{clearTimeout(timeout);}
    const body=await response.text();let parsed;try{parsed=JSON.parse(body);}catch{}
    if(!response.ok || !parsed || parsed.error){
        const error=Error(parsed?.error || (/1027/.test(body)?'quota-exceeded':'competition-unavailable'));
        error.quota=response.status===429 || error.message==='quota-exceeded';throw error;
    }
    return parsed.result;
}

function rankedStatus(message='') {
    let node=document.getElementById('competition-save-status');
    if(!node){node=document.createElement('p');node.id='competition-save-status';node.className='competition-status';node.setAttribute('role','status');document.getElementById('quiz-question')?.after(node);}
    node.textContent=message;return node;
}
function applyRankedState() {
    const r=quizState.ranked.state;quizState.index=r.index;quizState.score=r.score;
    if(r.index>=8)quizState.riskAcceptedForCurrent=!!r.question&&!r.needsRisk;
    if(r.question)quizState.set[r.index]=r.question;
    for(const kind of ['hint','fifty','pass']) {
        const button=document.getElementById(`joker-${kind}`);
        if(button&&r.jokers?.[kind]){button.classList.add('is-used');button.style.opacity='0.5';button.style.pointerEvents='none';}
    }
    const pause=document.getElementById('joker-pause');if(pause&&r.jokers?.pause&&!r.paused&&!isTimerPaused){pause.classList.add('is-used');pause.style.pointerEvents='none';}
    const display=document.getElementById('quiz-score');if(display)display.textContent=r.score;
}
function showRankedRetry(retry, error) {
    quizState.locked=true;clearInterval(quizState.timerInterval);
    const node=rankedStatus(error?.quota?'Ücretsiz hizmet kotası doldu. Doğrulanmış kayıtların korunuyor; kota yenilenince yeniden dene. ':'Bağlantı tamamlanamadı. Son doğrulanmış yarışma kaydın korunuyor. ');
    const button=document.createElement('button');button.type='button';button.className='f-btn';button.textContent='Yeniden dene';
    button.onclick=async()=>{button.disabled=true;try{if(quizState.ranked.pending){await quizState.ranked.retry();applyRankedState();}if(quizState.ranked.state.paused&&quizState.ranked.state.question){await quizState.ranked.action('resume',{joker:true});await quizState.ranked.action('resume');}isGlobalPaused=false;pauseOverlay.classList.add('is-hidden');masterPauseBtn.innerHTML='<i class="fas fa-pause"></i>';node.textContent='';await retry();}catch{button.disabled=false;}};
    node.append(button);
}
async function handleRankedAnswer(button) {
    quizState.locked=true;clearInterval(quizState.timerInterval);rankedStatus('Cevabın doğrulanıyor…');
    const index=quizState.index;
    try {
        const r=await quizState.ranked.action('answer',{optionId:button?.dataset.optionId ?? null});
        const evaluation=r.evaluation;
        const answeredQuestion=quizState.set[index];
        if(answeredQuestion&&evaluation){answeredQuestion.answerOptions.forEach(o=>o.isCorrect=o.id===evaluation.correctOptionId);answeredQuestion.hint=evaluation.hint || '';}
        applyRankedState();rankedStatus(r.done?'Puanın hesabına kaydedildi.':'Cevabın doğrulandı.');
        if(!evaluation?.correct)recordSessionMistake(button?.querySelector('.answer-text')?.textContent || 'Süre doldu');
        document.querySelectorAll('.answer-btn').forEach(b=>{
            if(b.dataset.optionId===evaluation?.correctOptionId)b.classList.add('is-correct');
        });
        if(button && !evaluation?.correct)button.classList.add('is-wrong');
        if(r.done){await finishIndividual(r.reason==='complete'?'TEBRİKLER ŞAMPİYON!':r.reason==='timeout'?'SÜRE BİTTİ, ELENDİN!':index>=8?'KARA DELİĞE YUTULDUN!':'YANLIŞ CEVAP, ELENDİN!');}
        else {quizState.riskAcceptedForCurrent=false;setTimeout(()=>renderIndividual(),1500);}
    } catch(e) {
        showRankedRetry(async()=>{if(quizState.ranked.state.done)await finishIndividual('YARIŞMA TAMAMLANDI');else {applyRankedState();quizState.riskAcceptedForCurrent=false;await renderIndividual();}},e);
    }
}
async function rankedJoker(kind,button) {
    if(quizState.locked || isGlobalPaused || button.classList.contains('is-used'))return;
    quizState.locked=true;
    try {
        const result=await quizState.ranked.action(kind);applyRankedState();
        button.classList.add('is-used');button.style.opacity='0.5';button.style.pointerEvents='none';
        if(kind==='hint'){const hint=document.getElementById('quiz-hint');hint.textContent=`💡 İpucu: ${result.hint}`;hint.classList.remove('is-hidden');}
        if(kind==='fifty')document.querySelectorAll('.answer-btn').forEach(b=>{if(result.hiddenOptionIds.includes(b.dataset.optionId))b.classList.add('is-hidden');});
        if(kind==='pass')await renderIndividual();
        quizState.locked=false;
    } catch(e) {showRankedRetry(()=>renderIndividual(),e);}
}

async function startIndividual() {
    quizState.ranked = null;quizState.localResultRecorded=false;
    const user=auth.currentUser;
    if(user&&!loadedProfile){alert('Profilin yükleniyor. Birazdan yeniden başlatabilirsin.');return;}
    const verified=user && (user.emailVerified || (user.providerData||[]).some(p=>p.providerId==='google.com'));
    if(COMPETITION_BACKEND_READY && verified && isStudentProfile(loadedProfile) && normalizeGrade(loadedProfile.sinif)===String(selectedGrade)) {
        const revision=authRevision;
        const run=new CompetitionRun(async(name,data)=>{
            if(revision!==authRevision || auth.currentUser?.uid!==user.uid)throw Error('Hesap değişti.');
            const result=await competitionCall(name,data);
            if(revision!==authRevision)throw Error('Hesap değişti.');
            return result;
        },user.uid);
        try { await run.start(String(selectedGrade),Number(selectedUnit));if(run.state.paused&&run.state.question){await run.action('resume',{joker:true});await run.action('resume');} }
        catch(e) { alert('Yarışma sunucusu başlatılamadı. Yeniden deneyebilirsin.'); return; }
        quizState.ranked=run;quizState.set=[];
    } else {
        quizState.set = await fetchQuestions(selectedGrade, selectedUnit); if(quizState.set.length === 0) return;
    }
    sessionMistakes = [];
    const qeRev = document.getElementById('quiz-end-review-container');
    if (qeRev) { qeRev.innerHTML = ""; qeRev.classList.add('is-hidden'); }
    quizState.index = 0; quizState.score = 0; quizState.totalTimeSpent = 0; quizState.currentTimeLeft = 0; quizState.riskAcceptedForCurrent = false; isTimerPaused = false;
    document.querySelectorAll('.joker-area button').forEach(btn => { btn.classList.remove('is-used', 'joker-spawn-anim'); btn.style.opacity = "1"; btn.style.pointerEvents = "auto"; btn.style.background = ""; });
    const jPause = document.getElementById('joker-pause');
    if(jPause) { jPause.classList.add('is-hidden'); jPause.innerHTML = "Zamanı Durdur"; }
    const qHint = document.getElementById('quiz-hint');
    if(qHint) qHint.classList.add('is-hidden');
    switchScene(scenes.rules, scenes.quiz);
    if(quizState.ranked){applyRankedState();if(quizState.ranked.state.done){await finishIndividual('KAYITLI YARIŞMA SONUCU');return;}}
    rankedStatus(quizState.ranked?'Yarışma puanı sunucuda doğrulanacak.':'Antrenman: bu çalışma liderlik tablosuna puan yazmaz.');
    renderIndividual();
}

async function renderIndividual() {
    if(document.activeElement) document.activeElement.blur(); 

    if (quizState.index >= 8 && !quizState.riskAcceptedForCurrent) { showBlackHoleWarning(); return; }
    if(quizState.ranked && !quizState.ranked.state.question) {
        try { await quizState.ranked.action('open');applyRankedState(); }
        catch(e) { showRankedRetry(()=>renderIndividual(),e);return; }
    }
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
        if(q.answerOptions[i]) {
            if(quizState.ranked){delete btn.dataset.correct;btn.dataset.optionId=q.answerOptions[i].id;}
            else btn.dataset.correct = q.answerOptions[i].isCorrect;
        }
    });
    if(quizState.ranked){
        const r=quizState.ranked.state;
        if(r.hint!==null){const hint=document.getElementById('quiz-hint');hint.textContent=`💡 İpucu: ${r.hint}`;hint.classList.remove('is-hidden');}
        document.querySelectorAll('.answer-btn').forEach(b=>{if(r.hiddenOptionIds?.includes(b.dataset.optionId))b.classList.add('is-hidden');});
    }
    startIndividualTimer(quizState.ranked ? quizState.ranked.state.seconds : settings.time);
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
            if(quizState.ranked){handleRankedAnswer(null);return;}
            recordSessionMistake("Süre Doldu (Boş Bırakıldı)");
            if (quizState.index >= 8) { quizState.score = Math.floor(quizState.score / 2); setTimeout(() => finishIndividual("KARA DELİĞE YUTULDUN!"), 2000); } else { setTimeout(() => finishIndividual("SÜRE BİTTİ, ELENDİN!"), 2000); } 
        }
    }, 1000);
}

document.querySelectorAll('.answer-btn').forEach(btn => btn.onclick = function() {
    if(quizState.locked || isGlobalPaused) return;
    if(quizState.ranked){handleRankedAnswer(this);return;}
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
                // V8.9.1: Hızlı Kafa ve Kusursuz Seri Rozetleri
                const curSettings = getSettings(quizState.index);
                const timeSpent = curSettings.time - (quizState.currentTimeLeft || 0);
                if (timeSpent < 10) {
                    unlockBadge('badge_hizli_kafa');
                }
                if (quizState.index >= 8) {
                    unlockBadge('badge_karadelik');
                }
                if (quizState.score >= 500) {
                    unlockBadge('badge_efsane');
                    unlockBadge('badge_fenup_efsanesi');
                }
                if (quizState.index === 9) {
                    unlockBadge('badge_kusursuz');
                }
                if (typeof checkAndUpdateStreak === 'function') {
                    checkAndUpdateStreak();
                }
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

export const COMPETITION_HISTORY_KEY = 'fenupx_competition_history';

export function getCompetitionHistory() {
    try {
        const raw = localStorage.getItem(COMPETITION_HISTORY_KEY);
        if (raw) {
            const arr = JSON.parse(raw);
            if (Array.isArray(arr)) return arr;
        }
    } catch (_) {}
    return [];
}

export function saveCompetitionMatch(matchRecord) {
    if (!matchRecord || !matchRecord.id) return;
    try {
        let history = getCompetitionHistory();
        const exists = history.some(m => m.id === matchRecord.id);
        if (!exists) {
            history.unshift(matchRecord);
            if (history.length > 30) history = history.slice(0, 30);
            localStorage.setItem(COMPETITION_HISTORY_KEY, JSON.stringify(history));
        }
    } catch (e) {
        console.warn('saveCompetitionMatch hatası:', e);
    }
}

async function finishIndividual(msg) {
    if(document.activeElement) document.activeElement.blur();
    
    
    if(quizState.ranked) {
        try {
            if(!quizState.ranked.state.done)await quizState.ranked.action('finish');
            applyRankedState();
            if(!quizState.ranked.state.settlement?.accepted)throw Error('Kayıt doğrulanamadı.');
            const delta = Number(quizState.ranked.state.settlement.delta) || 0;
            if (loadedProfile && delta > 0) {
                loadedProfile._cohortSeasonScore = (loadedProfile._cohortSeasonScore || 0) + delta;
            }
        } catch(e) { showRankedRetry(()=>finishIndividual(msg),e);return; }
    }

    if(!quizState.localResultRecorded){individualLeaderboard.push({ name: currentActivePlayerName, score: quizState.score, time: quizState.totalTimeSpent });quizState.localResultRecorded=true;}

    // V8.9.9: Yarışma maçını Çalışmalarım geçmişine kaydet
    try {
        const isRankedAccepted = !!(quizState.ranked?.state?.settlement?.accepted);
        const playedGrade = selectedGrade || loadedProfile?.sinif || null;
        let resultLabel = 'Tamamlandı';
        if (msg.includes("ŞAMPİYON")) resultLabel = 'Şampiyon';
        else if (msg.includes("ÇEKİLDİN")) resultLabel = 'Çekildi';

        const matchRecord = {
            id: 'comp_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
            timestamp: Date.now(),
            date: new Date().toLocaleDateString('tr-TR'),
            grade: playedGrade ? `${playedGrade}. Sınıf` : 'Genel',
            score: Number(quizState.score) || 0,
            result: resultLabel,
            isRanked: !!quizState.ranked,
            serverAccepted: isRankedAccepted,
            totalTimeSpent: quizState.totalTimeSpent || 0
        };
        saveCompetitionMatch(matchRecord);
        if (typeof checkAndUpdateStreak === 'function') {
            checkAndUpdateStreak();
        }
    } catch (e) {
        console.warn('Yarışma maç kaydı hatası:', e);
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
    jokerHint.onclick = function() { if(quizState.ranked){rankedJoker('hint',this);return;} if(quizState.locked || isGlobalPaused || this.classList.contains('is-used')) return; this.blur(); this.classList.add('is-used'); this.style.opacity = "0.5"; this.style.pointerEvents = "none"; const qh = document.getElementById('quiz-hint'); if(qh) { qh.classList.remove('is-hidden'); qh.textContent = `💡 İpucu: ${quizState.set[quizState.index].hint}`; } };
}

const jokerFifty = document.getElementById('joker-fifty');
if(jokerFifty) {
    jokerFifty.onclick = function() { if(quizState.ranked){rankedJoker('fifty',this);return;} if(quizState.locked || isGlobalPaused || this.classList.contains('is-used')) return; this.blur(); this.classList.add('is-used'); this.style.opacity = "0.5"; this.style.pointerEvents = "none"; let hidden = 0; document.querySelectorAll('.answer-btn').forEach(btn => { if(btn.dataset.correct === "false" && hidden < 2) { btn.classList.add('is-hidden'); hidden++; } }); };
}

const jokerPause = document.getElementById('joker-pause');
if(jokerPause) {
    jokerPause.onclick = async function() {
        if(quizState.ranked){
            if(quizState.locked || isGlobalPaused)return;
            quizState.locked=true;
            try {await quizState.ranked.action(isTimerPaused?'resume':'pause',{joker:true});applyRankedState();isTimerPaused=!isTimerPaused;this.textContent=isTimerPaused?'Süreyi Başlat ▶':'Kullanıldı';if(!isTimerPaused){this.classList.add('is-used');this.style.pointerEvents='none';startIndividualTimer(quizState.ranked.state.seconds);}quizState.locked=false;}
            catch(e){showRankedRetry(()=>renderIndividual(),e);}return;
        }
        if(quizState.locked || isGlobalPaused) return; this.blur(); if(!isTimerPaused) { isTimerPaused = true; this.innerHTML = "Süreyi Başlat ▶"; this.style.background = "#22c55e"; this.classList.add('is-used'); this.classList.remove('joker-spawn-anim'); stopSound(sfx.bgm); } else { isTimerPaused = false; this.innerHTML = "Kullanıldı"; this.style.background = ""; this.style.opacity = "0.5"; this.style.pointerEvents = "none"; playSound(sfx.bgm); } };
}

const jokerPass = document.getElementById('joker-pass');
if(jokerPass) {
    jokerPass.onclick = function() { 
        if(quizState.ranked){rankedJoker('pass',this);return;}
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

let lastFocusedModalTrigger = null;

function showModal(modal) {
    if (!modal) return;
    lastFocusedModalTrigger = document.activeElement;
    modal.classList.remove('is-hidden');
    modal.classList.add('is-open', 'active');
    modal.style.display = 'flex';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'false');
    const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable) {
        try { focusable.focus(); } catch (_) {}
    }
}

function hideModal(modal) {
    if (!modal) return;
    modal.classList.add('is-hidden');
    modal.classList.remove('is-open', 'active');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocusedModalTrigger && typeof lastFocusedModalTrigger.focus === 'function') {
        try { lastFocusedModalTrigger.focus(); } catch (_) {}
    }
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
            <li style="margin-bottom: 8px;">Yazılı sınav provalarında çözülen sorular ve sanal laboratuvar gözlem defteri notları yalnızca öğrencinin bu cihazdaki tarayıcısında (yerel depolama - <code>localStorage</code>) saklanır; merkezi bir sunucuya aktarılmaz.</li>
            <li style="margin-bottom: 8px;">Kayıtlı üye olarak katıldığınız Şampiyonlar Ligi turnuva puanları ve liderlik dereceleri ise, adil sıralama ve hesap güvenliği için sunucuya güvenli biçimde aktarılır ve hesabınızla senkronize edilir.</li>
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
        const openModals = document.querySelectorAll('.modal-overlay.is-open:not(.is-hidden), .modal-overlay:not(.is-hidden)');
        openModals.forEach(m => {
            if (m.id !== 'modal-onboarding-grade') {
                hideModal(m);
            }
        });
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
    if(!metin || typeof metin !== 'string') return false;
    const trimmed = metin.trim();
    if(trimmed.length === 0) return false;
    // 1 karakterli zararsız harfler/kısaltmalar (örn. "X") küfür filtresi değildir
    if(trimmed.length === 1) return true;

    let normalizedText = trimmed.toLowerCase();
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
        
        const istisnalar = ["sikke", "siklamen", "sokak", "soket", "yara", "yarar", "yarasa", "yaramaz", "yaralandi", "fenup", "fenupx", "fen", "up", "ks"];
        
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

export function isReservedAdminName(metin) {
    if (!metin || typeof metin !== 'string') return false;
    const clean = metin.trim().toLowerCase().replace(/[^a-z0-9]/gi, '');
    return /^(fenup|fenupx|admin|yonetici|yönetici|sistemyoneticisi|sistemyöneticisi)$/i.test(clean);
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
            <div class="auth-field-group">
                <label for="user-grade" class="auth-label">Sınıfın</label>
                <select id="user-grade" class="fenupx-input auth-input reg-grade" name="grade">
                    <option value="" disabled selected>Sınıfını Seçin</option>
                    <option value="5">5. Sınıf</option>
                    <option value="6">6. Sınıf</option>
                    <option value="7">7. Sınıf</option>
                    <option value="8">8. Sınıf</option>
                </select>
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

// ==========================================================================
// V8.9.0: GÜNLÜK SERİ (🔥 STREAK) MOTORU VE 10 KOZMİK BAŞARI ROZETİ
// ==========================================================================

function getStreakData() {
    try {
        const raw = localStorage.getItem('fenupx_streak_data');
        if (raw) {
            const data = JSON.parse(raw);
            if (data && typeof data.count === 'number') {
                return data;
            }
        }
    } catch (_) {}
    return { count: 1, lastDate: null };
}

function getTodayDateStr() {
    try {
        return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Istanbul' }).format(new Date());
    } catch (_) {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }
}

export function checkAndUpdateStreak() {
    if (loadedProfile && loadedProfile.role === 'admin') return { count: 0, lastDate: null };
    try {
        const today = getTodayDateStr();
        const stored = getStreakData();
        let count = stored.count || 1;
        const lastDate = stored.lastDate;

        if (!lastDate) {
            count = 1;
        } else if (lastDate === today) {
            // Bugün zaten kayıt yapıldıysa: Aynı takvim gününde seri artırılmaz, mevcut seri korunur.
        } else {
            const dToday = new Date(today + "T00:00:00");
            const dLast = new Date(lastDate + "T00:00:00");
            const diffTime = dToday.getTime() - dLast.getTime();
            const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Dün kayıt yapılmışsa: Seri +1 artırılır
                count++;
            } else if (diffDays > 1) {
                // 1 günden daha eski ise: Seri 1'e sıfırlanır
                count = 1;
            }
        }

        const updated = { count, lastDate: today };
        localStorage.setItem('fenupx_streak_data', JSON.stringify(updated));
        updateStreakUI(count);

        // Rozet kontrolleri (V8.9.1: Evrensel Rozetler)
        if (count >= 3) {
            unlockBadge('badge_seri_3');
            unlockBadge('badge_ates_serisi');
        }
        if (count >= 7) {
            unlockBadge('badge_seri_7');
            unlockBadge('badge_super_seri');
        }

        return updated;
    } catch (e) {
        console.warn('Streak güncelleme hatası:', e);
        return { count: 1, lastDate: getTodayDateStr() };
    }
}

export function updateStreakUI(count) {
    if (loadedProfile && loadedProfile.role === 'admin') return;
    if (typeof count !== 'number') {
        const data = getStreakData();
        count = data.count || 1;
    }
    const headerStreakCount = document.getElementById('header-streak-count');
    if (headerStreakCount) {
        headerStreakCount.textContent = count.toString();
    }
    const profileStreakCount = document.getElementById('profile-streak-count');
    if (profileStreakCount) {
        profileStreakCount.textContent = count.toString();
    }
    const summaryStreak = document.getElementById('profile-summary-streak');
    if (summaryStreak) {
        summaryStreak.textContent = `${count} Gün`;
    }
}

// ==========================================================================
// V8.9.10: ÜÇ GELİŞEN ROZET AİLESİ (3 AİLE · 3'ER AŞAMA)
// ==========================================================================
export const BADGE_FAMILIES = [
    {
        id: 'family_arastirmaci',
        title: 'Araştırmacı',
        module: 'Sanal Laboratuvar',
        icon: '🔬',
        stages: [
            { stage: 1, title: 'Gözlemci Kâşif', target: 2, unit: 'deney', desc: 'En az 2 farklı deneyi etkileşim ve ölçüm notuyla tamamla.' },
            { stage: 2, title: 'Deney Uzmanı', target: 5, unit: 'deney', desc: 'En az 5 farklı deneyi tamamla.' },
            { stage: 3, title: 'Bilim İnsanı', target: 10, unit: 'deney', desc: 'En az 10 farklı deneyi tamamla.' }
        ]
    },
    {
        id: 'family_kararli_kasif',
        title: 'Kararlı Kâşif',
        module: 'Yazılıya Hazırlık',
        icon: '📖',
        stages: [
            { stage: 1, title: 'Hazırlık Yolcusu', desc: '1 yazılı provasını ve en az 1 tekrar kartını tamamla.' },
            { stage: 2, title: 'Odaklı Çalışan', desc: 'En az 2 yazılı provasını değerlendirip tekrar döngüsünü tamamla.' },
            { stage: 3, title: 'Sınav Ustası', desc: 'En az 3 farklı senaryo provasını ve ilişkili tekrar kartlarını tamamla.' }
        ]
    },
    {
        id: 'family_bilgi_yolcusu',
        title: 'Bilgi Yolcusu',
        module: 'Şampiyonlar Ligi',
        icon: '🏆',
        stages: [
            { stage: 1, title: 'Lig Çırağı', target: 2, desc: 'En az 2 farklı günde ve 2 farklı ünitede yarışma tamamla.' },
            { stage: 2, title: 'Lig Kâşifi', target: 3, desc: 'En az 3 farklı günde ve 3 farklı ünitede yarışma tamamla.' },
            { stage: 3, title: 'Kozmik Şampiyon', target: 5, desc: 'En az 5 farklı günde ve en az 4 farklı ünitede yarışma tamamla.' }
        ]
    }
];

export function getBadgeFamilyProgress() {
    let completedLabCount = 0;
    try {
        const raw = localStorage.getItem('fenupx_lab_progress');
        if (raw) {
            const pMap = JSON.parse(raw);
            Object.entries(pMap).forEach(([expId, item]) => {
                if (item?.status === 'completed' && item.verified !== false) {
                    completedLabCount++;
                }
            });
        }
    } catch (_) {}

    let stageLab = 0;
    let nextLabHint = 'Aşama 1 için 2 deney tamamla';
    if (completedLabCount >= 10) {
        stageLab = 3;
        nextLabHint = 'En yüksek aşamaya ulaştın!';
    } else if (completedLabCount >= 5) {
        stageLab = 2;
        nextLabHint = `Aşama 3 için ${10 - completedLabCount} deney daha tamamla`;
    } else if (completedLabCount >= 2) {
        stageLab = 1;
        nextLabHint = `Aşama 2 için ${5 - completedLabCount} deney daha tamamla`;
    } else {
        nextLabHint = `Aşama 1 için ${2 - completedLabCount} deney daha tamamla`;
    }

    let completedExamsCount = 0;
    const distinctScenarios = new Set();
    let viewedCardsCount = 0;
    let compAttemptsCount = 0;
    const compUnits = new Set();
    try {
        const rawHist = localStorage.getItem('fenupx_exam_attempts_history');
        if (rawHist) {
            const arr = JSON.parse(rawHist);
            if (Array.isArray(arr)) {
                arr.forEach(att => {
                    if (att.status === 'completed' || att.finished) {
                        completedExamsCount++;
                        if (att.scenarioId || att.scenario) distinctScenarios.add(att.scenarioId || att.scenario);
                    }
                });
            }
        }
        const rawCards = localStorage.getItem('fenupx_viewed_cards');
        if (rawCards) {
            const arrC = JSON.parse(rawCards);
            if (Array.isArray(arrC)) viewedCardsCount = arrC.length;
        }
        const rawSpace = localStorage.getItem('fenupx_viewed_space_cards');
        if (rawSpace) {
            const arrS = JSON.parse(rawSpace);
            if (Array.isArray(arrS)) viewedCardsCount = Math.max(viewedCardsCount, arrS.length);
        }
        const rawComp = localStorage.getItem('fenupx_competition_history');
        if (rawComp) {
            const arrComp = JSON.parse(rawComp);
            if (Array.isArray(arrComp)) {
                compAttemptsCount = arrComp.length;
                arrComp.forEach(m => {
                    if (m.unit || m.unitId) compUnits.add(m.unit || m.unitId);
                });
            }
        }
    } catch (_) {}

    // Tam döngü: Yazılı Provası -> Eksik Konu Kartlarını İnceleme -> Yeni Prova
    if (completedExamsCount === 0) {
        try {
            const rawLast = localStorage.getItem('fenupx_last_exam_summary');
            if (rawLast) {
                const lastObj = JSON.parse(rawLast);
                if (lastObj && (lastObj.completed || lastObj.score !== undefined)) {
                    completedExamsCount = 1;
                    if (lastObj.scenarioId) distinctScenarios.add(lastObj.scenarioId);
                }
            }
        } catch (_) {}
    }
    const totalAttempts = Math.max(completedExamsCount, compAttemptsCount);
    const totalUnitsOrScenarios = Math.max(distinctScenarios.size, compUnits.size);
    let stageExam = 0;
    let stepLabel = '';
    let stepProgress = 0;
    let nextExamHint = '🎯 1 yazılı provasını tamamla, eksik konu kartlarını incele ve yeni bir provayla gelişimini göster.';

    if (totalUnitsOrScenarios >= 3 && viewedCardsCount >= 3 && totalAttempts >= 3) {
        stageExam = 3;
        stepProgress = 100;
        nextExamHint = 'En yüksek aşamaya ulaştın!';
    } else if (totalAttempts >= 2 && viewedCardsCount >= 2) {
        stageExam = 2;
        stepProgress = 67;
        nextExamHint = '🎯 Aşama 3 için 3 farklı senaryo provasını ve tekrar kartlarını tamamla.';
    } else if (totalAttempts >= 1 && viewedCardsCount >= 1) {
        stageExam = 1;
        stepProgress = 33;
        nextExamHint = '🎯 Aşama 2 için 2. yazılı provasını tamamla ve tekrar döngüsünü pekiştir.';
    } else if (totalAttempts >= 1) {
        // En az 1 prova tamamlanmış; Kararlı Kâşif 1. adım tamamlandı döngüsüne girer
        stageExam = 0;
        stepLabel = '1. Adım Tamamlandı';
        stepProgress = 17;
        nextExamHint = '🎯 1. Adım Tamamlandı (Yazılı provası yapıldı) → Sırada: Eksik konu kartlarını incele ve yeni bir provayla gelişimini göster.';
    }

    const distinctDays = new Set();
    const distinctUnits = new Set();
    try {
        const rawComp = localStorage.getItem('fenupx_competition_history');
        if (rawComp) {
            const arr = JSON.parse(rawComp);
            if (Array.isArray(arr)) {
                arr.forEach(m => {
                    if (m.date) distinctDays.add(m.date);
                    if (m.unit || m.unitId) distinctUnits.add(m.unit || m.unitId);
                });
            }
        }
    } catch (_) {}

    // Kesin VE koşulu: Hem farklı gün sayısı hem farklı ünite sayısı
    const compActivityCount = Math.min(distinctDays.size, distinctUnits.size);
    let stageComp = 0;
    let nextCompHint = 'Aşama 1 için 2 farklı günde ve 2 farklı ünitede yarışma tamamla';
    if (distinctDays.size >= 5 && distinctUnits.size >= 4) {
        stageComp = 3;
        nextCompHint = 'En yüksek aşamaya ulaştın!';
    } else if (distinctDays.size >= 3 && distinctUnits.size >= 3) {
        stageComp = 2;
        if (distinctDays.size < 5 && distinctUnits.size < 4) {
            nextCompHint = `Aşama 3 için ${5 - distinctDays.size} gün ve ${4 - distinctUnits.size} ünite daha gerekli`;
        } else if (distinctDays.size < 5) {
            nextCompHint = `Aşama 3 için ${5 - distinctDays.size} farklı gün daha yarışma tamamla`;
        } else {
            nextCompHint = `Aşama 3 için ${4 - distinctUnits.size} farklı ünitede daha yarışma tamamla`;
        }
    } else if (distinctDays.size >= 2 && distinctUnits.size >= 2) {
        stageComp = 1;
        nextCompHint = 'Aşama 2 için en az 3 farklı gün ve 3 farklı üniteye ulaş';
    } else {
        nextCompHint = 'Aşama 1 için en az 2 farklı gün ve 2 farklı ünitede yarışma tamamla';
    }

    return {
        family_arastirmaci: { stage: stageLab, current: completedLabCount, nextHint: nextLabHint },
        family_kararli_kasif: { 
            stage: stageExam, 
            current: totalAttempts, 
            stepLabel, 
            stepProgress, 
            nextHint: nextExamHint 
        },
        family_bilgi_yolcusu: { 
            stage: stageComp, 
            current: compActivityCount, 
            distinctDays: distinctDays.size, 
            distinctUnits: distinctUnits.size, 
            nextHint: nextCompHint 
        }
    };
}

// ==========================================================================
// V8.9.1: 10 EVRENSEL KOZMİK BAŞARI ROZETİ TANIMI (Önceki Başarılar Uyumluluğu)
// ==========================================================================
export const KOZMIK_ROZETLER = [
    {
        id: 'badge_ilk_adim',
        title: 'İlk Kâşif',
        icon: '🌟',
        desc: 'Profilini oluşturup ilk avatarını seçen herkese.',
        condition: 'Profilini oluşturup avatar seç'
    },
    {
        id: 'badge_bilim_ustasi',
        title: 'Bilim Ustası',
        icon: '💡',
        desc: 'Yazılı provası öz değerlendirmesinde 85 ve üzeri puan alan kâşiflere.',
        condition: 'Yazılı provasında 85 ve üzeri öz değerlendirme puanı'
    },
    {
        id: 'badge_laboratuvar',
        title: 'Sanal Simyacı',
        icon: '🧪',
        desc: 'Sanal laboratuvarda herhangi 3 deneyi yapıp gözlem defterine kaydedene.',
        condition: 'Laboratuvarda 3 deney gözlemi kaydet'
    },
    {
        id: 'badge_karadelik',
        title: 'Kara Delik Avcısı',
        icon: '🕳️',
        desc: "Şampiyonlar Ligi'nde Kara Delik riskini göze alıp elenmeden doğru yanıtlayana.",
        condition: 'Şampiyonlar Ligi Kara Delik aşamasını başarıyla geç'
    },
    {
        id: 'badge_kart_kasifi',
        title: 'Bilgi Kâşifi',
        icon: '📚',
        desc: 'Yazılıya Hazırlık modülünde en az 10 farklı çalışma kartını inceleyen öğrencilere.',
        condition: 'En az 10 farklı çalışma kartını incele'
    },
    {
        id: 'badge_seri_3',
        title: 'Kozmik Kıvılcım',
        icon: '🔥',
        desc: '3 gün üst üste siteye girip en az bir aktivite tamamlayana.',
        condition: '3 günlük çalışma serisi yakala'
    },
    {
        id: 'badge_seri_7',
        title: 'Sönmeyen Yıldız',
        icon: '⚡',
        desc: '7 günlük kesintisiz günlük seri yakalayana.',
        condition: '7 günlük çalışma serisi yakala'
    },
    {
        id: 'badge_hizli_kafa',
        title: 'Işık Hızı',
        icon: '⏱️',
        desc: "Şampiyonlar Ligi'nde bir soruyu 10 saniyenin altında doğru bilene.",
        condition: 'Bir soruyu 10 saniyenin altında doğru yanıtla'
    },
    {
        id: 'badge_kusursuz',
        title: 'Kusursuz Seri',
        icon: '🎯',
        desc: "Şampiyonlar Ligi'nde tek yarışmada 10'da 10 tam doğru yapana.",
        condition: 'Tek yarışmada 10/10 tam doğru yap'
    },
    {
        id: 'badge_efsane',
        title: 'Kozmik Şampiyon',
        icon: '🏆',
        desc: 'Toplamda 500 kâşif puanına ulaşan her öğrenciye.',
        condition: '500 toplam kâşif puanına ulaş'
    }
];

export function getEarnedBadges() {
    try {
        const raw = localStorage.getItem('fenupx_badges');
        if (raw) {
            const arr = JSON.parse(raw);
            if (Array.isArray(arr)) return arr;
        }
    } catch (_) {}
    return [];
}

const BADGE_ALIASES = {
    'badge_newton': 'badge_bilim_ustasi',
    'badge_prova_ustasi': 'badge_bilim_ustasi',
    'badge_galileo': 'badge_kart_kasifi',
    'badge_modelci': 'badge_kart_kasifi',
    'badge_ates_serisi': 'badge_seri_3',
    'badge_super_seri': 'badge_seri_7',
    'badge_fenup_efsanesi': 'badge_efsane'
};

export function unlockBadge(badgeId) {
    if (loadedProfile && loadedProfile.role === 'admin') return;
    try {
        const targetId = BADGE_ALIASES[badgeId] || badgeId;
        const earned = getEarnedBadges();
        let updated = false;

        if (!earned.includes(targetId)) {
            earned.push(targetId);
            updated = true;
        }
        if (badgeId !== targetId && !earned.includes(badgeId)) {
            earned.push(badgeId);
            updated = true;
        }

        if (updated) {
            localStorage.setItem('fenupx_badges', JSON.stringify(earned));
            renderBadgesShowcase();
            const badge = KOZMIK_ROZETLER.find(b => b.id === targetId) || KOZMIK_ROZETLER.find(b => b.id === badgeId);
            if (badge) {
                showBadgeEarnedToast(badge);
            }
        }
    } catch (e) {
        console.warn('Rozet kazanma hatası:', e);
    }
}

function showBadgeEarnedToast(badge) {
    let toast = document.getElementById('fenupx-badge-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'fenupx-badge-toast';
        toast.className = 'fenupx-badge-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `
        <div class="badge-toast-content">
            <span class="badge-toast-icon">${badge.icon}</span>
            <div class="badge-toast-text">
                <strong class="badge-toast-title">Kozmik Rozet Kazanıldı!</strong>
                <span class="badge-toast-desc">${badge.title} · ${badge.condition}</span>
            </div>
            <span class="badge-toast-sparkle">✨</span>
        </div>
    `;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// V8.9.2: 4 Sınıf Düzeyi Desteği (5, 6, 7, 8)
export const VALID_GRADES = ['5', '6', '7', '8'];
if (typeof window !== 'undefined') {
    window.VALID_GRADES = VALID_GRADES;
}

export const normalizeGrade = value => VALID_GRADES.includes(String(value ?? '').trim()) ? String(value).trim() : '';
export const isTeacherProfile = data => !!data && ['teacher', 'ogretmen', 'öğretmen'].includes(data.role);
export const isStudentProfile = data => !!data && ['student', 'ogrenci', 'öğrenci'].includes(data.role);
export const isAdminProfile = data => !!data && data.role === 'admin';
let loadedProfile = null;
let authRevision = 0;

export function checkMissingGradeOnboarding(user, userData) {
    if (!user || !userData || isAdminProfile(userData) || !isStudentProfile(userData) || normalizeGrade(userData.sinif)) return;
    const modal = document.getElementById('modal-onboarding-grade');
    if (!modal) return;
    showModal(modal);
    modal.setAttribute('aria-hidden', 'false');
    const buttons = [...modal.querySelectorAll('.btn-onboarding-grade')];
    const status = modal.querySelector('[role="status"]');
    const onboardingRevision = authRevision;
    buttons.forEach(b => b.disabled = false);
    status.textContent = '';
    let saving = false;
    buttons.forEach(btn => {
        btn.onclick = async () => {
            const grade = normalizeGrade(btn.dataset.grade);
            if (saving || !grade) return;
            saving = true;
            buttons.forEach(b => b.disabled = true);
            status.textContent = 'Kaydediliyor…';
            try {
                if (onboardingRevision !== authRevision || auth.currentUser?.uid !== user.uid) throw new Error('Oturum değişti. Yeniden giriş yapın.');
                await updateDoc(doc(db, 'users', user.uid), { sinif: grade });
                if (COMPETITION_BACKEND_READY) await competitionCall('initializeCompetition', {});
                if (onboardingRevision !== authRevision || auth.currentUser?.uid !== user.uid) return;
                userData.sinif = grade;
                try {
                    localStorage.setItem('fenupx_user_grade', grade);
                    const cached = JSON.parse(localStorage.getItem('currentUser') || '{}');
                    cached.sinif = grade;
                    localStorage.setItem('currentUser', JSON.stringify(cached));
                } catch (_) { /* Server profile remains authoritative when browser storage is full. */ }
                modal.classList.add('is-hidden');
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                const select = document.getElementById('profile-grade');
                if (select) select.value = grade;
                document.getElementById('btn-uyelik')?.focus();
            } catch (_) {
                status.textContent = 'Sınıf kaydedilemedi. Tekrar deneyebilir veya çıkış yapabilirsiniz.';
            } finally {
                saving = false;
                if (onboardingRevision === authRevision) buttons.forEach(b => b.disabled = false);
            }
        };
    });
    modal.querySelector('[data-onboarding-logout]').onclick = () => signOut(auth);
    modal.onkeydown = event => {
        if (event.key !== 'Tab') return;
        const targets = [...modal.querySelectorAll('button:not(:disabled)')];
        const first = targets[0], last = targets[targets.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    buttons[0]?.focus();
}
if (typeof window !== 'undefined') window.checkMissingGradeOnboarding = checkMissingGradeOnboarding;

// Promotion is suspended until a server transaction and an agreed school-year baseline exist.
// Never infer a missing class or mutate real profiles from the device's calendar.
export function checkAnnualPromotion(user) {
    return normalizeGrade(user?.sinif);
}

export function evaluateBadges() {
    if (loadedProfile && loadedProfile.role === 'admin') return;
    try {
        renderBadgesShowcase();
    } catch (e) {
        console.warn('evaluateBadges hatası:', e);
    }
}

export function renderBadgesShowcase() {
    const grid = document.getElementById('cosmic-badges-grid');
    if (!grid) return;
    const prog = getBadgeFamilyProgress();
    const counter = document.getElementById('profile-badge-counter');
    if (counter) {
        const totalStages = Object.values(prog).reduce((s, p) => s + p.stage, 0);
        const hasStep = Object.values(prog).some(p => !!p.stepLabel);
        counter.textContent = `${totalStages} / 9 Aşama Tamamlandı${(totalStages === 0 && hasStep) ? ' · 1. Adım Başladı' : ''}`;
    }

    let html = `
        <div class="badge-families-container">
            ${BADGE_FAMILIES.map(fam => {
                const fProg = prog[fam.id] || { stage: 0, nextHint: '' };
                const curStageObj = fam.stages.find(s => s.stage === fProg.stage);
                const nextStageObj = fam.stages.find(s => s.stage === (fProg.stage + 1)) || fam.stages[0];
                const stageName = curStageObj ? curStageObj.title : `1. Aşama Hedefi: ${nextStageObj ? nextStageObj.title : 'Kâşif'}`;
                const percent = fProg.stage > 0 ? Math.round((fProg.stage / 3) * 100) : (fProg.stepProgress || 0);

                let tagClass = '';
                let tagText = '0 / 3 Aşama';
                if (fProg.stage > 0) {
                    tagClass = 'active';
                    tagText = `Aşama ${fProg.stage} / 3`;
                } else if (fProg.stepLabel) {
                    tagClass = 'active in-progress';
                    tagText = fProg.stepLabel;
                }

                return `
                    <div class="badge-family-card stage-${fProg.stage}${fProg.stepLabel ? ' has-step' : ''}">
                        <div class="badge-family-top">
                            <span class="badge-family-icon">${fam.icon}</span>
                            <div class="badge-family-header">
                                <h5 class="badge-family-title">${fam.title}</h5>
                                <span class="badge-family-module">${fam.module}</span>
                            </div>
                            <span class="badge-stage-tag ${tagClass}">
                                ${tagText}
                            </span>
                        </div>
                        <div class="badge-family-level-name">${stageName}</div>
                        <div class="badge-family-prog-bar">
                            <div class="badge-family-prog-fill" style="width: ${percent}%;"></div>
                        </div>
                        <div class="badge-family-next-hint">
                            <i class="fas fa-bullseye"></i> ${fProg.nextHint}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    // V8.9.12: 'Önceki Başarılar' dikey sütunu mobil taşmayı önlemek için DOM'dan kaldırıldı; localStorage verisi korundu.
    grid.innerHTML = html;
}

export function renderKarneSummary() {
    try {
        let lastSummary = null;
        try {
            const raw = localStorage.getItem('fenupx_last_exam_summary');
            if (raw) lastSummary = JSON.parse(raw);
        } catch (_) {}

        if (!lastSummary) {
            try {
                const examStateRaw = localStorage.getItem('fenupx_exam_pilot_v1');
                if (examStateRaw) {
                    const es = JSON.parse(examStateRaw);
                    if (es && es.attempt && es.attempt.scores) {
                        const qIds = es.attempt.ids || [];
                        let sc = 0;
                        let maxSc = 0;
                        qIds.forEach(qid => {
                            const pts = es.attempt.questionPoints?.[qid] || 14;
                            sc += (es.attempt.scores[qid] || 0);
                            maxSc += pts;
                        });
                        lastSummary = {
                            score: sc,
                            maxScore: maxSc || 100,
                            percent: Math.round((sc / (maxSc || 100)) * 100),
                            missingOutcomes: [],
                            date: 'Son Prova'
                        };
                    }
                }
            } catch (_) {}
        }

        const scoreEl = document.getElementById('karne-last-score');
        const dateEl = document.getElementById('karne-last-date');
        const summaryExam = document.getElementById('profile-summary-exam');
        if (scoreEl) {
            if (lastSummary) {
                scoreEl.innerHTML = `${lastSummary.score} <small>/ ${lastSummary.maxScore || 100} (Öz Değerlendirme)</small>`;
                if (dateEl) dateEl.textContent = `Öz değerlendirme: ${lastSummary.date || 'Son Prova'}`;
                if (summaryExam) summaryExam.textContent = `${lastSummary.score} / ${lastSummary.maxScore || 100}`;
            } else {
                scoreEl.textContent = '— / 100';
                if (dateEl) dateEl.textContent = 'Henüz prova çözülmedi';
                if (summaryExam) summaryExam.textContent = '— / 100';
            }
        }

        let viewedSpaceCards = [];
        try {
            const rawCards = localStorage.getItem('fenupx_viewed_space_cards');
            if (rawCards) viewedSpaceCards = JSON.parse(rawCards);
        } catch (_) {}
        const spaceCount = Math.min(viewedSpaceCards.length, 6);
        const spacePercent = Math.round((spaceCount / 6) * 100);
        const progSpace = document.getElementById('karne-prog-space');
        const subSpace = document.getElementById('karne-sub-space');
        if (progSpace) progSpace.style.width = `${spacePercent}%`;
        if (subSpace) subSpace.textContent = `İnceleme: ${spaceCount}/6 Kart (${spacePercent}%)`;

        const earned = getEarnedBadges();
        const hasNewton = earned.includes('badge_newton');
        const progForce = document.getElementById('karne-prog-force');
        const subForce = document.getElementById('karne-sub-force');
        if (progForce) progForce.style.width = hasNewton ? '100%' : (lastSummary ? '50%' : '20%');
        if (subForce) subForce.textContent = hasNewton ? 'Tam Puanla Pekiştirildi! 🍎' : (lastSummary ? 'Kısmi Pekiştirildi' : 'Başlangıç Düzeyi');

        const outcomeDetails = document.getElementById('karne-outcome-details');
        if (outcomeDetails) {
            if (lastSummary && Array.isArray(lastSummary.missingOutcomes) && lastSummary.missingOutcomes.length > 0) {
                outcomeDetails.innerHTML = `
                    <div style="font-weight: 700; color: #f59e0b; margin-bottom: 6px;"><i class="fas fa-exclamation-circle"></i> Tekrar Edilmesi Önerilen Kazanımlar:</div>
                    <ul style="margin: 0; padding-left: 18px;">
                        ${lastSummary.missingOutcomes.map(o => `<li>${o}</li>`).join('')}
                    </ul>
                `;
            } else if (lastSummary && lastSummary.score >= 80) {
                outcomeDetails.innerHTML = `<div class="karne-outcome-item"><i class="fas fa-check-circle" style="color: #22c55e;"></i> <span>Harika! Yazılı provasında tüm kazanımları başarıyla tamamladın. 🎯</span></div>`;
            } else {
                outcomeDetails.innerHTML = `<div class="karne-outcome-item"><i class="fas fa-info-circle" style="color: var(--neon-blue);"></i> <span>Yazılı provasını tamamladığında eksik kaldığın kazanımlar ve çalışma önerilerin burada listelenecek.</span></div>`;
            }
        }
    } catch (e) {
        console.warn('Karne özeti render hatası:', e);
    }
}

// Global dışa aktarmalar
window.checkAndUpdateStreak = checkAndUpdateStreak;
window.getStreakData = getStreakData;
window.updateStreakUI = updateStreakUI;
window.KOZMIK_ROZETLER = KOZMIK_ROZETLER;
window.getEarnedBadges = getEarnedBadges;
window.unlockBadge = unlockBadge;
window.evaluateBadges = evaluateBadges;
window.renderBadgesShowcase = renderBadgesShowcase;
window.renderKarneSummary = renderKarneSummary;

// ==========================================================================
// V8.9.9: BÜTÜNLEŞİK “ÇALIŞMALARIM” PROFİLİ VE ÖĞRENCİ GELİŞİM TAKİBİ
// ==========================================================================

export function renderCalismalarim() {
    if (loadedProfile && loadedProfile.role === 'admin') return;

    // 1. Yazılıya Hazırlık Provaları
    let attempts = [];
    if (window.FenUpExam && typeof window.FenUpExam.getExamAttemptsHistory === 'function') {
        attempts = window.FenUpExam.getExamAttemptsHistory();
    } else {
        try {
            const raw = localStorage.getItem('fenupx_exam_attempts_history');
            if (raw) attempts = JSON.parse(raw);
        } catch (_) {}
        if (!attempts || attempts.length === 0) {
            try {
                const rawSum = localStorage.getItem('fenupx_last_exam_summary');
                if (rawSum) {
                    const sum = JSON.parse(rawSum);
                    if (sum && (sum.completed || typeof sum.score === 'number')) {
                        attempts = [{
                            id: 'legacy_last_summary',
                            date: sum.date || 'Son Prova',
                            grade: '7',
                            scenario: 'Senaryo 2',
                            score: sum.score,
                            maxScore: sum.maxScore || 100,
                            missingOutcomes: Array.isArray(sum.missingOutcomes) ? sum.missingOutcomes : []
                        }];
                    }
                }
            } catch (_) {}
        }
    }
    const mockCount = Array.isArray(attempts) ? attempts.length : 0;

    // 2. Şampiyonlar Ligi Yarışmaları
    const compHistory = getCompetitionHistory();
    const compCount = Array.isArray(compHistory) ? compHistory.length : 0;

    // 3. Sanal Laboratuvar Deneyleri
    let labCompleted = 0;
    let labInProgress = 0;
    let labTotal = 30;
    if (window.FenUpLab && typeof window.FenUpLab.getLabProgressSummary === 'function') {
        const labSummary = window.FenUpLab.getLabProgressSummary();
        labCompleted = labSummary.completed || 0;
        labInProgress = labSummary.inProgress || 0;
        labTotal = labSummary.total || 30;
    } else {
        try {
            const raw = localStorage.getItem('fenupx_lab_progress');
            if (raw) {
                const map = JSON.parse(raw);
                Object.values(map).forEach(v => {
                    if (v.status === 'completed') labCompleted++;
                    else if (v.status === 'in_progress') labInProgress++;
                });
            }
        } catch (_) {}
    }

    // B) Sayaç Metnini Güncelle
    const counterEl = document.getElementById('studies-summary-counter-text');
    if (counterEl) {
        counterEl.textContent = `${mockCount} prova · ${compCount} yarışma · ${labCompleted} deney`;
    }

    const hintEl = document.getElementById('studies-summary-hint');
    if (hintEl) {
        const isGuest = !auth?.currentUser;
        if (isGuest) {
            hintEl.innerHTML = `<span style="color:#38bdf8;">💡 Bu cihazdaki yerel çalışma kayıtları gösterilmektedir.</span>`;
        } else if (mockCount === 0 && compCount === 0 && labCompleted === 0) {
            hintEl.textContent = 'Çalışmalarına başladıkça tamamladığın provalar, yarışmalar ve deneyler burada toplanacak.';
        } else {
            hintEl.textContent = 'Yazılı provaları, yarışma katılımı ve laboratuvar etkinlik kayıtların güncel.';
        }
    }

    // C1) Yazılıya Hazırlık Detayları Render Et
    renderYaziliStudiesTab(attempts);

    // C2) Şampiyonlar Ligi Detayları Render Et
    renderCompetitionStudiesTab(compHistory);
    if (auth.currentUser && COMPETITION_BACKEND_READY && loadedProfile && loadedProfile._cohortSeasonScore === undefined) {
        const year = competitionYear();
        const userGrade = normalizeGrade(loadedProfile?.sinif) || selectedGrade || '7';
        getDoc(doc(db, `leaderboards/${year}/grades/${userGrade}/entries/${auth.currentUser.uid}`)).then(snap => {
            if (snap.exists()) {
                const cScore = Number(snap.data()?.score) || 0;
                if (loadedProfile && loadedProfile._cohortSeasonScore !== cScore) {
                    loadedProfile._cohortSeasonScore = cScore;
                    renderCompetitionStudiesTab(compHistory);
                }
            } else if (loadedProfile) {
                loadedProfile._cohortSeasonScore = 0;
            }
        }).catch(() => {});
    }

    // C3) Sanal Laboratuvar Detayları Render Et
    renderLabStudiesTab();
}

function renderYaziliStudiesTab(attempts) {
    const container = document.getElementById('yazili-studies-content');
    if (!container) return;

    if (!Array.isArray(attempts) || attempts.length === 0) {
        container.innerHTML = `
            <div class="studies-empty-state">
                <i class="fas fa-file-signature studies-empty-icon"></i>
                <p class="studies-empty-text">Henüz bir yazılı provası çözmedin. Seviyene uygun bir sınav provası seçip öz değerlendirmeni yapabilirsin.</p>
                <button type="button" class="f-btn f-btn-ana btn-start-yazili-from-prof" style="margin-top:10px; font-size:0.85rem; padding:8px 16px;">
                    <i class="fas fa-play"></i> Yazılıya Hazırlığa Başla
                </button>
            </div>
        `;
        const startBtn = container.querySelector('.btn-start-yazili-from-prof');
        if (startBtn) {
            startBtn.onclick = () => {
                hideModal(profileModal);
                if (window.FenUpExam && typeof window.FenUpExam.openExamView === 'function') {
                    const sceneHome = (window.scenes && window.scenes.home) || document.getElementById('scene-home');
                    const sceneYazili = document.getElementById('scene-yazili');
                    if (typeof window.switchScene === 'function' && sceneYazili && sceneHome) {
                        window.switchScene(sceneHome, sceneYazili);
                    }
                    window.FenUpExam.openExamView({ entry: true });
                }
            };
        }
        return;
    }

    const latest = attempts[0];
    const scoreVal = typeof latest.score === 'number' ? latest.score : '—';
    const missingOutcomes = Array.isArray(latest.missingOutcomes) ? latest.missingOutcomes : [];
    const missedCards = Array.isArray(latest.missedCards) ? latest.missedCards : [];

    let html = `
        <div class="studies-card-group">
            <div class="studies-exam-summary-card">
                <div class="studies-card-header">
                    <span class="studies-card-title"><i class="fas fa-clipboard-check"></i> Son Yazılı Provası</span>
                    <span class="studies-score-tag">Öz Değerlendirme: ${scoreVal} / 100</span>
                </div>
                <div class="studies-card-meta">
                    <span><i class="fas fa-calendar-alt"></i> ${latest.date || 'Son Çözülen'}</span>
                    <span><i class="fas fa-graduation-cap"></i> ${latest.grade || '7'}. Sınıf · ${latest.scenario || 'Senaryo 2'}</span>
                    <span class="studies-status-badge status-completed"><i class="fas fa-check"></i> Tamamlandı</span>
                </div>
                <div style="margin-top:10px;">
                    <button type="button" class="f-btn f-btn-ikinci btn-open-exam-result" style="font-size:0.8rem; padding:6px 14px;">
                        <i class="fas fa-eye"></i> Sonuçları ve Provayı İncele
                    </button>
                </div>
            </div>
    `;

    // Tekrar Önerilen Konular
    if (missingOutcomes.length > 0 || missedCards.length > 0) {
        html += `
            <div class="studies-recommendation-box">
                <div class="studies-rec-header">
                    <i class="fas fa-lightbulb" style="color: #f59e0b;"></i>
                    <strong>Tekrar Önerilen Konular:</strong>
                </div>
                <p class="studies-rec-sub">Son provandaki öz değerlendirmene göre pekiştirmen önerilen konular:</p>
                <div class="studies-rec-list">
        `;
        if (missedCards.length > 0) {
            missedCards.forEach(mc => {
                const code = mc.outcome_id || 'Öğrenme Çıktısı';
                let cardTitle = mc.title || 'Çalışma Kartı';
                if (code === 'FB.7.1.1' || cardTitle === 'İki proje') {
                    cardTitle = 'Uzay Araştırmaları';
                }
                html += `
                    <div class="studies-rec-item">
                        <div class="studies-rec-info">
                            <span class="rec-outcome-code">${code}</span>
                            <span class="rec-card-title">${cardTitle}</span>
                        </div>
                        <button type="button" class="f-btn f-btn-ikinci btn-study-card" data-card-id="${mc.id || ''}" data-outcome-id="${mc.outcome_id || ''}" style="font-size:0.75rem; padding:5px 10px; white-space:nowrap;">
                            <i class="fas fa-book-reader"></i> Konuyu Çalış
                        </button>
                    </div>
                `;
            });
        } else {
            missingOutcomes.forEach((outStr) => {
                const parts = outStr.split(':');
                const code = parts[0]?.trim() || '';
                let title = parts.slice(1).join(':').trim() || outStr;
                if (code === 'FB.7.1.1' || title === 'İki proje') {
                    title = 'Uzay Araştırmaları';
                }
                html += `
                    <div class="studies-rec-item">
                        <div class="studies-rec-info">
                            <span class="rec-outcome-code">${code}</span>
                            <span class="rec-card-title">${title}</span>
                        </div>
                        <button type="button" class="f-btn f-btn-ikinci btn-study-card" data-outcome-id="${code}" style="font-size:0.75rem; padding:5px 10px; white-space:nowrap;">
                            <i class="fas fa-book-reader"></i> Konuyu Çalış
                        </button>
                    </div>
                `;
            });
        }
        html += `
                </div>
            </div>
        `;
    } else {
        html += `
            <div class="studies-rec-success">
                <i class="fas fa-check-circle" style="color: #22c55e;"></i>
                <span>Tebrikler! Son provanda eksik öğrenme çıktısı bulunmuyor. Bilgilerini taze tutmak için çalışma kartlarını düzenli gözden geçirebilirsin.</span>
            </div>
        `;
    }

    if (attempts.length > 1) {
        html += `
            <details class="studies-prev-attempts-details" style="margin-top:12px; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:8px 12px; background:rgba(0,0,0,0.2);">
                <summary style="font-size:0.85rem; color:#94a3b8; cursor:pointer; font-weight:600;"><i class="fas fa-history"></i> Önceki Provalar (${attempts.length})</summary>
                <div class="studies-prev-list" style="margin-top:8px;">
        `;
        attempts.slice(1, 5).forEach(att => {
            html += `
                <div class="studies-prev-item" style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.8rem;">
                    <span>${att.date} · ${att.scenario || 'Senaryo'}</span>
                    <span style="color:#38bdf8; font-weight:600;">Öz değerlendirme: ${att.score}/100</span>
                </div>
            `;
        });
        html += `</div></details>`;
    }

    html += `</div>`;
    container.innerHTML = html;

    const btnOpenResult = container.querySelector('.btn-open-exam-result');
    if (btnOpenResult) {
        btnOpenResult.onclick = () => {
            hideModal(profileModal);
            if (window.FenUpExam && typeof window.FenUpExam.openExamAttemptFromProfile === 'function') {
                window.FenUpExam.openExamAttemptFromProfile(latest.id);
            }
        };
    }

    container.querySelectorAll('.btn-study-card').forEach(btn => {
        btn.onclick = () => {
            const cardId = btn.dataset.cardId;
            const outcomeId = btn.dataset.outcomeId;
            hideModal(profileModal);
            if (window.FenUpExam && typeof window.FenUpExam.openStudyCardFromProfile === 'function') {
                window.FenUpExam.openStudyCardFromProfile(cardId, outcomeId);
            }
        };
    });
}

function renderCompetitionStudiesTab(compHistory) {
    const container = document.getElementById('lig-studies-content');
    if (!container) return;

    const userGrade = normalizeGrade(loadedProfile?.sinif) || selectedGrade || '7';
    const legacySeason = Number(loadedProfile && loadedProfile[`seasonScore_${userGrade}`]) || Number(loadedProfile?.seasonScore) || 0;
    const legacyTotal = Number(loadedProfile && loadedProfile[`totalScore_${userGrade}`]) || Number(loadedProfile?.totalScore) || 0;
    const cohortSeason = Number(loadedProfile?._cohortSeasonScore) || 0;
    const seasonScore = cohortSeason + legacySeason;
    const totalScore = Math.max(legacyTotal, seasonScore);

    let html = `
        <div class="studies-card-group">
            <div class="studies-comp-summary-card">
                <div class="studies-card-header">
                    <span class="studies-card-title"><i class="fas fa-trophy"></i> ${userGrade}. Sınıf Şampiyonlar Ligi</span>
                    <span class="studies-score-tag">Bu Sezon: ${formatScore(seasonScore)} Puan</span>
                </div>
                <div class="studies-comp-stats-row" style="grid-template-columns: repeat(2, 1fr);">
                    <div class="comp-stat-box">
                        <span class="stat-sub-label">Bu Sezon Puanın</span>
                        <strong class="stat-sub-val">${formatScore(seasonScore)}</strong>
                    </div>
                    <div class="comp-stat-box">
                        <span class="stat-sub-label">Tüm Zamanlar Puanın</span>
                        <strong class="stat-sub-val">${formatScore(totalScore)}</strong>
                    </div>
                </div>
                <div style="margin-top: 10px; padding: 8px 12px; background: rgba(56, 189, 248, 0.08); border-radius: 8px; border: 1px solid rgba(56, 189, 248, 0.2); display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem;">
                    <span style="color: #94a3b8;"><i class="fas fa-medal"></i> ${userGrade}. Sınıf Sıralaman:</span>
                    <strong style="color: #38bdf8;">${seasonScore > 0 ? `${userGrade}. Sınıfta Sıralamada` : 'Henüz sıralama oluşmadı'}</strong>
                </div>
                <div style="margin-top:10px; display:flex; gap:8px;">
                    <button type="button" class="f-btn f-btn-ikinci btn-open-lb-from-prof" style="padding:6px 12px; font-size:0.8rem;">
                        <i class="fas fa-list-ol"></i> Liderlik Tablosunu Aç
                    </button>
                    <button type="button" class="f-btn f-btn-ana btn-start-quiz-from-prof" style="padding:6px 12px; font-size:0.8rem;">
                        <i class="fas fa-play"></i> Yeni Yarışma
                    </button>
                </div>
            </div>
    `;

    if (Array.isArray(compHistory) && compHistory.length > 0) {
        html += `
            <details class="studies-match-history-details" style="margin-top:12px; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:8px 12px; background:rgba(0,0,0,0.2);">
                <summary style="font-size:0.85rem; color:#94a3b8; cursor:pointer; font-weight:600;"><i class="fas fa-history"></i> Son Yarışmalar (${compHistory.length})</summary>
                <div class="studies-match-list" style="margin-top:8px;">
        `;
        compHistory.slice(0, 5).forEach(m => {
            const isChamp = m.result === 'Şampiyon';
            const serverTag = m.serverAccepted ? '<span class="status-verified-pill"><i class="fas fa-shield-alt"></i> Onaylı</span>' : '<span class="status-unverified-pill">Antrenman</span>';
            html += `
                <div class="studies-match-item">
                    <div class="match-meta">
                        <span class="match-date">${m.date || 'Tarih belirtilmedi'}</span>
                        <span class="match-grade">${m.grade || `${userGrade}. Sınıf`}</span>
                    </div>
                    <div class="match-result-col">
                        <span class="match-result ${isChamp ? 'result-champ' : ''}">${m.result || 'Tamamlandı'}</span>
                        ${serverTag}
                    </div>
                    <span class="match-score">+${m.score || 0} Puan</span>
                </div>
            `;
        });
        html += `</div></details>`;
    } else {
        html += `
            <div class="studies-empty-state" style="margin-top:10px;">
                <i class="fas fa-info-circle studies-empty-icon" style="color:var(--neon-blue);"></i>
                <p class="studies-empty-text">Detaylı yarışma geçmişi bu sürümden itibaren izlenmektedir. Liderlik puanlarınız hesabınızda korunmaktadır.</p>
                <button type="button" class="f-btn f-btn-ana btn-start-quiz-from-prof" style="margin-top:10px; font-size:0.85rem; padding:8px 16px;">
                    <i class="fas fa-play"></i> Yarışmaya Başla
                </button>
            </div>
        `;
    }

    html += `</div>`;
    container.innerHTML = html;

    const btnLb = container.querySelector('.btn-open-lb-from-prof');
    if (btnLb) {
        btnLb.onclick = () => {
            hideModal(profileModal);
            const lbBtn = document.getElementById('btn-show-leaderboard');
            if (lbBtn) lbBtn.click();
            else {
                const sq = document.getElementById('scene-quiz');
                const sl = document.getElementById('scene-lobby');
                if (sl) {
                    if (sq) sq.classList.add('is-hidden');
                    sl.classList.remove('is-hidden');
                }
            }
        };
    }

    const btnStartQuiz = container.querySelector('.btn-start-quiz-from-prof');
    if (btnStartQuiz) {
        btnStartQuiz.onclick = () => {
            hideModal(profileModal);
            const btnOyun = document.getElementById('btn-oyun-modulu');
            if (btnOyun) btnOyun.click();
        };
    }
}

let currentLabFilterGrade = 'all';

function renderLabStudiesTab() {
    const container = document.getElementById('lab-studies-content');
    if (!container) return;

    let exps = [];
    if (window.FenUpLab && Array.isArray(window.FenUpLab.EXPERIMENTS_DATABASE)) {
        exps = window.FenUpLab.EXPERIMENTS_DATABASE;
    } else if (typeof EXPERIMENTS_DATABASE !== 'undefined' && Array.isArray(EXPERIMENTS_DATABASE)) {
        exps = EXPERIMENTS_DATABASE;
    }

    let progressMap = {};
    let completedCount = 0;
    let inProgressCount = 0;
    let notStartedCount = 0;

    if (window.FenUpLab && typeof window.FenUpLab.getLabProgressSummary === 'function') {
        const sum = window.FenUpLab.getLabProgressSummary();
        progressMap = sum.progressMap || {};
        completedCount = sum.completed || 0;
        inProgressCount = sum.inProgress || 0;
        notStartedCount = sum.notStarted || 0;
    } else {
        try {
            const raw = localStorage.getItem('fenupx_lab_progress');
            if (raw) progressMap = JSON.parse(raw);
        } catch (_) {}
        exps.forEach(e => {
            const p = progressMap[e.id];
            if (p?.status === 'completed') completedCount++;
            else if (p?.status === 'in_progress') inProgressCount++;
            else notStartedCount++;
        });
    }

    const activeExps = exps.filter(e => {
        const p = progressMap[e.id];
        return p?.status === 'in_progress' || p?.status === 'completed';
    });

    let html = `
        <div class="studies-card-group">
            <div class="studies-lab-summary-card">
                <div class="studies-card-header">
                    <span class="studies-card-title"><i class="fas fa-flask"></i> Sanal Laboratuvar Çalışmaların</span>
                    <span class="studies-score-tag">${completedCount} / ${exps.length || 30} Tamamlandı</span>
                </div>
                <div class="studies-lab-pills-row">
                    <span class="lab-summary-pill pill-completed"><i class="fas fa-check-circle"></i> ${completedCount} Tamamlandı</span>
                    <span class="lab-summary-pill pill-in-progress"><i class="fas fa-spinner fa-spin"></i> ${inProgressCount} Devam Ediyor</span>
                    <span class="lab-summary-pill pill-not-started"><i class="fas fa-circle"></i> ${notStartedCount} Başlanmadı</span>
                </div>
                <p class="studies-lab-disclaimer">
                    <i class="fas fa-info-circle"></i> Simülasyonda değişkenleri değiştirip en az 2 gözlem veya ölçüm kaydettiğinde deney tamamlanmış sayılır.
                </p>
                <div style="margin-top:10px;">
                    <button type="button" class="f-btn f-btn-ana btn-open-full-lab-catalog" style="font-size:0.8rem; padding:6px 14px;">
                        <i class="fas fa-flask"></i> Tüm Deney Kataloğunu Aç (30 Deney)
                    </button>
                </div>
            </div>
    `;

    if (activeExps.length > 0) {
        html += `
            <div class="studies-active-labs-box" style="margin-top:12px;">
                <div class="studies-rec-header">
                    <i class="fas fa-microscope" style="color:#38bdf8;"></i>
                    <strong>Üzerinde Çalıştığın Deneyler (${activeExps.length}):</strong>
                </div>
                <div class="studies-lab-grid" style="margin-top:8px;">
        `;
        activeExps.slice(0, 6).forEach(exp => {
            const prog = progressMap[exp.id] || { status: 'not_started', observationsCount: 0 };
            const isCompleted = prog.status === 'completed';
            const statusBadge = isCompleted 
                ? `<span class="study-badge-completed"><i class="fas fa-check"></i> Tamamlandı</span>`
                : `<span class="study-badge-in-progress"><i class="fas fa-spinner"></i> Devam Ediyor</span>`;
            const obsText = prog.observationsCount > 0 ? `<span class="lab-obs-tag"><i class="fas fa-book"></i> ${prog.observationsCount} Gözlem</span>` : '';

            html += `
                <div class="studies-lab-card ${isCompleted ? 'is-completed' : ''}" data-exp-id="${exp.id}">
                    <div class="lab-card-top">
                        <span class="lab-exp-code">${exp.id} · ${exp.grade}. Sınıf</span>
                        ${statusBadge}
                    </div>
                    <h5 class="lab-card-title">${exp.title}</h5>
                    <div class="lab-card-footer">
                        ${obsText}
                        <button type="button" class="f-btn f-btn-ikinci btn-open-experiment" data-exp-id="${exp.id}" style="font-size:0.75rem; padding:4px 10px; margin-left:auto;">
                            <i class="fas fa-flask"></i> ${isCompleted ? 'Tekrar Aç' : 'Devam Et'}
                        </button>
                    </div>
                </div>
            `;
        });
        html += `</div></div>`;
    } else {
        html += `
            <div class="studies-empty-state" style="margin-top:10px;">
                <i class="fas fa-flask studies-empty-icon" style="color:var(--neon-blue);"></i>
                <p class="studies-empty-text">Henüz laboratuvar çalışması kaydınız bulunmuyor. Bir deney açıp ölçüm defterine en az 2 gözlem kaydederek başlayabilirsiniz.</p>
            </div>
        `;
    }

    html += `
        <details class="profile-all-labs-details" style="margin-top:12px; border:1px solid rgba(255,255,255,0.08); border-radius:10px; padding:8px 12px; background:rgba(0,0,0,0.2);">
            <summary style="font-size:0.85rem; color:#94a3b8; cursor:pointer; font-weight:600;"><i class="fas fa-list"></i> Tüm Deney Listesi (${exps.length} Deney)</summary>
            <div class="studies-lab-grid" style="margin-top:8px;">
                ${exps.map(exp => {
                    const prog = progressMap[exp.id] || { status: 'not_started', observationsCount: 0 };
                    const isCompleted = prog.status === 'completed';
                    const isInProgress = prog.status === 'in_progress';
                    const statusBadge = isCompleted 
                        ? `<span class="study-badge-completed"><i class="fas fa-check"></i> Tamamlandı</span>`
                        : (isInProgress 
                            ? `<span class="study-badge-in-progress"><i class="fas fa-spinner"></i> Devam Ediyor</span>` 
                            : `<span class="study-badge-not-started">Başlanmadı</span>`);
                    return `
                        <div class="studies-lab-card ${isCompleted ? 'is-completed' : ''}" data-exp-id="${exp.id}">
                            <div class="lab-card-top">
                                <span class="lab-exp-code">${exp.id} · ${exp.grade}. Sınıf</span>
                                ${statusBadge}
                            </div>
                            <h5 class="lab-card-title">${exp.title}</h5>
                            <div class="lab-card-footer">
                                <button type="button" class="f-btn f-btn-ikinci btn-open-experiment" data-exp-id="${exp.id}" style="font-size:0.75rem; padding:4px 10px; margin-left:auto;">
                                    <i class="fas fa-flask"></i> Aç
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </details>
    `;

    html += `</div>`;
    container.innerHTML = html;

    const btnOpenFullCatalog = container.querySelector('.btn-open-full-lab-catalog');
    if (btnOpenFullCatalog) {
        btnOpenFullCatalog.onclick = () => {
            hideModal(profileModal);
            const btnLab = document.getElementById('btn-lab-modulu');
            if (btnLab) btnLab.click();
        };
    }

    container.querySelectorAll('.btn-open-experiment').forEach(btn => {
        btn.onclick = () => {
            const expId = btn.dataset.expId;
            hideModal(profileModal);
            if (window.FenUpLab && typeof window.FenUpLab.openExperimentWorkspace === 'function') {
                const sceneHome = (window.scenes && window.scenes.home) || document.getElementById('scene-home');
                const labView = document.getElementById('lab-view');
                if (typeof window.switchScene === 'function' && labView && sceneHome) {
                    window.switchScene(sceneHome, labView);
                } else if (labView) {
                    if (sceneHome) sceneHome.classList.add('is-hidden');
                    labView.classList.remove('is-hidden');
                }
                window.FenUpLab.openExperimentWorkspace(expId);
            }
        };
    });
}

window.renderCalismalarim = renderCalismalarim;

const profileModal = document.createElement('div');
profileModal.id = "profile-modal";
profileModal.className = "modal-overlay is-hidden";
profileModal.innerHTML = `
    <div class="modal-content glass-panel" style="max-width: 620px; width: 92%; padding: 24px;">
        <button id="close-profile" class="close-btn" aria-label="Kapat"><i class="fas fa-times"></i></button>

        <!-- A) TEMEL PROFİL VE AVATAR (80x80 Avatar, Seri Rozeti) -->
        <div class="profile-hero-card">
            <div class="profile-level-ring-container">
                <div class="profile-level-ring">
                    <img id="p-current-avatar" src="${kozmikAvatarlar[0].url}" alt="Öğrenci Avatarı" class="profile-hero-img">
                </div>
            </div>
            <div class="profile-hero-meta">
                <h3 id="profile-display-fullname" class="profile-hero-name">Kâşif Öğrenci</h3>
                <div class="profile-hero-sub">
                    <span id="profile-display-role-tag" class="profile-role-badge">🎓 7. Sınıf</span>
                    <span class="profile-streak-badge">🔥 <span id="profile-streak-count">1</span> Günlük Seri</span>
                </div>
                <button id="btn-open-avatar-selector" class="f-btn f-btn-ikinci" style="font-size:0.8rem; padding:5px 12px; margin-top:6px;">
                    <i class="fas fa-user-astronaut"></i> Avatarımı Değiştir
                </button>
            </div>
        </div>

        <!-- Yönetici (Admin) Sade Görünümü (V8.9.1) -->
        <div id="profile-admin-view" class="profile-admin-view is-hidden" style="display:none;">
            <div class="admin-profile-hero">
                <div class="admin-profile-badge-icon">👑</div>
                <h3 id="admin-display-fullname" style="color: #fbbf24; font-size: 1.3rem; margin: 4px 0;">Yönetici</h3>
                <p id="admin-display-email" style="color:#cbd5e1; margin:4px 0; overflow-wrap:anywhere;"></p>
                <p class="admin-title-badge">FenUp X Sistem Yöneticisi</p>
                <div id="admin-ban-alert" class="admin-ban-warning is-hidden" style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; border-radius: 8px; padding: 10px 14px; margin-top: 12px; color: #fca5a5; display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 0.85rem;">
                    <span><i class="fas fa-shield-halved"></i> Hesabınızda bir engel bayrağı görünüyor.</span>
                    <button type="button" id="btn-admin-self-unban" class="f-btn f-btn-ikinci" style="padding: 4px 10px; font-size: 0.8rem; white-space: nowrap;">Engeli Kaldır</button>
                </div>
                <button type="button" id="btn-profile-goto-admin" class="f-btn f-btn-ana" style="margin-top: 15px; width: 100%;">
                    <i class="fas fa-tools"></i> 🛠️ Yönetim Paneline Git
                </button>
            </div>
        </div>

        <!-- Öğrenciye Özel Gelişim, Çalışmalarım ve Rozet Bölümleri (Admin Girişinde Gizlenir) -->
        <div id="profile-student-sections" class="profile-student-sections">

            <!-- B) “ÇALIŞMALARIM” ÖZETİ (Küçük Sayaçlar: "3 prova · 8 yarışma · 4 deney") -->
            <div class="profile-studies-summary-card" id="profile-studies-summary">
                <div class="studies-summary-header">
                    <div class="studies-summary-title">
                        <i class="fas fa-folder-open"></i> <span>Çalışmalarım</span>
                    </div>
                    <div class="studies-summary-counter" id="studies-summary-counter-text">
                        0 prova · 0 yarışma · 0 deney
                    </div>
                </div>
                <div class="studies-summary-hint" id="studies-summary-hint">
                    Tamamlanan yazılı provaları, yarışmalar ve deney kayıtları
                </div>
            </div>

            <!-- C) ÜÇ MODÜLE AİT AYRINTILAR (Sekmeler: Yazılıya Hazırlık, Şampiyonlar Ligi, Sanal Laboratuvar) -->
            <div class="profile-studies-details-box" id="profile-studies-details">
                <div class="studies-nav-tabs" role="tablist" aria-label="Çalışmalarım Modül Sekmeleri">
                    <button type="button" class="studies-tab-btn active" role="tab" id="tab-btn-yazili" aria-selected="true" aria-controls="pane-study-yazili" data-tab="yazili">
                        <i class="fas fa-file-signature"></i> <span>Yazılıya Hazırlık</span>
                    </button>
                    <button type="button" class="studies-tab-btn" role="tab" id="tab-btn-lig" aria-selected="false" aria-controls="pane-study-lig" data-tab="lig">
                        <i class="fas fa-trophy"></i> <span>Şampiyonlar Ligi</span>
                    </button>
                    <button type="button" class="studies-tab-btn" role="tab" id="tab-btn-lab" aria-selected="false" aria-controls="pane-study-lab" data-tab="lab">
                        <i class="fas fa-flask"></i> <span>Sanal Laboratuvar</span>
                    </button>
                </div>

                <div class="studies-tab-panes">
                    <!-- Sekme 1: Yazılıya Hazırlık -->
                    <div class="studies-tab-pane active" id="pane-study-yazili" role="tabpanel" aria-labelledby="tab-btn-yazili">
                        <div id="yazili-studies-content"></div>
                    </div>

                    <!-- Sekme 2: Şampiyonlar Ligi -->
                    <div class="studies-tab-pane is-hidden" id="pane-study-lig" role="tabpanel" aria-labelledby="tab-btn-lig">
                        <div id="lig-studies-content"></div>
                    </div>

                    <!-- Sekme 3: Sanal Laboratuvar -->
                    <div class="studies-tab-pane is-hidden" id="pane-study-lab" role="tabpanel" aria-labelledby="tab-btn-lab">
                        <div id="lab-studies-content"></div>
                    </div>
                </div>
            </div>

            <!-- D) ROZETLER (3 GELİŞEN ROZET AİLESİ VİTRİNİ) -->
            <div class="profile-badges-section">
                <div class="profile-section-title-bar">
                    <h4><i class="fas fa-medal"></i> Gelişen Başarı Rozetleri</h4>
                    <span class="profile-badge-counter" id="profile-badge-counter">0 / 9 Aşama Tamamlandı</span>
                </div>
                <div class="cosmic-badges-grid" id="cosmic-badges-grid">
                    <!-- 3 Rozet Ailesi ve Aşamaları Dinamik Render Edilir -->
                </div>
            </div>
        </div>

        <!-- E) HESAP AYARLARI (Akordiyon / Daraltılabilir Şık Bölüm) -->
        <details class="profile-settings-details">
            <summary class="profile-settings-summary"><i class="fas fa-cog"></i> Hesap ve Kimlik Bilgilerini Düzenle</summary>
            <div class="profile-settings-content">
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
                <div class="auth-field-group profile-student-grade-section" id="profile-student-grade-group">
                    <label for="profile-grade" class="auth-label">Sınıfın</label>
                    <select id="profile-grade" class="fenupx-input auth-input" disabled aria-describedby="grade-correction-help">
                        <option value="5">5. Sınıf</option>
                        <option value="6">6. Sınıf</option>
                        <option value="7">7. Sınıf</option>
                        <option value="8">8. Sınıf</option>
                        <option value="">Belirtilmemiş</option>
                    </select>
                    <p id="grade-correction-help">Kayıtlı sınıfını yalnız yönetici düzeltebilir. Önceki puanlar yeni sınıfa taşınmaz.</p>
                    <label for="grade-correction-choice" class="auth-label">Doğru sınıfın</label>
                    <select id="grade-correction-choice" class="fenupx-input auth-input">
                        <option value="">Sınıf seç</option><option value="5">5. Sınıf</option><option value="6">6. Sınıf</option><option value="7">7. Sınıf</option><option value="8">8. Sınıf</option>
                    </select>
                    <button id="btn-grade-correction" class="f-btn" type="button">Sınıf düzeltme talebi gönder</button>
                    <p id="grade-correction-status" role="status"></p>
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
        </details>
    </div>
`;
document.body.appendChild(profileModal);

// Çalışmalarım sekme geçiş dinleyicileri
const studiesTabBtns = profileModal.querySelectorAll('.studies-tab-btn');
if (studiesTabBtns.length > 0) {
    studiesTabBtns.forEach(btn => {
        btn.onclick = (e) => {
            if (e) e.preventDefault();
            const tabKey = btn.dataset.tab;
            studiesTabBtns.forEach(b => {
                const isTarget = b === btn;
                b.classList.toggle('active', isTarget);
                b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
            });
            profileModal.querySelectorAll('.studies-tab-pane').forEach(p => {
                const isMatch = p.id === `pane-study-${tabKey}`;
                p.classList.toggle('active', isMatch);
                p.classList.toggle('is-hidden', !isMatch);
            });
        };
    });
}

const karneSummaryBar = document.getElementById('profile-karne-summary-bar');
const karneDetails = document.getElementById('profile-karne-details');
if (karneSummaryBar && karneDetails) {
    const toggleKarne = (e) => {
        if (e) e.preventDefault();
        const isCollapsed = karneDetails.classList.toggle('is-collapsed');
        karneSummaryBar.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
        const icon = karneSummaryBar.querySelector('#btn-toggle-karne-details i');
        if (icon) {
            icon.className = isCollapsed ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        }
    };
    karneSummaryBar.onclick = toggleKarne;
}

const btnProfGotoAdmin = document.getElementById('btn-profile-goto-admin');
if (btnProfGotoAdmin) {
    btnProfGotoAdmin.onclick = () => {
        avatarPicker.close();
        resetDeleteAccountBox();
        hideModal(profileModal);
        const adminModal = document.getElementById('admin-modal');
        if (adminModal) {
            showModal(adminModal);
            if (typeof loadAdminUsers === 'function') loadAdminUsers();
        }
    };
}

const btnAdminSelfUnban = document.getElementById('btn-admin-self-unban');
if (btnAdminSelfUnban) {
    btnAdminSelfUnban.onclick = async () => {
        if (!auth.currentUser || loadedProfile?.role !== 'admin') return;
        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), { isBanned: false });
            if (loadedProfile) loadedProfile.isBanned = false;
            document.getElementById('admin-ban-alert')?.classList.add('is-hidden');
            alert("Hesap engel bayrağı başarıyla kaldırıldı.");
        } catch (e) {
            alert("Engel kaldırılamadı: " + e.message);
        }
    };
}

// Avatar changes are drafts until explicitly saved. Legacy values are never migrated in bulk.
function currentAvatarValue(){return auth.currentUser ? (loadedProfile?.avatar || DEFAULT_AVATAR_ID) : (localStorage.getItem('fenupx_user_avatar') || DEFAULT_AVATAR_ID);}
function displayCurrentAvatar(value){
 const src=avatarUrl(value,192);const pca=document.getElementById('p-current-avatar');if(pca)pca.src=src;
 document.querySelectorAll('.profile-img-header').forEach(img=>img.src=src);
}
const avatarPicker=createAvatarPicker({
 getValue:currentAvatarValue,
 save:async id=>{
  const user=auth.currentUser,revision=authRevision;
  if(user){if(!loadedProfile)throw Error('profile-loading');await updateDoc(doc(db,'users',user.uid),{avatar:id});if(revision!==authRevision||auth.currentUser?.uid!==user.uid)throw Error('account-changed');loadedProfile.avatar=id;}
  try{localStorage.setItem('fenupx_user_avatar',id);}catch{}
  try{const cu=JSON.parse(localStorage.getItem('currentUser')||'{}');cu.avatar=id;localStorage.setItem('currentUser',JSON.stringify(cu));}catch{}
 },
 onSaved:id=>{displayCurrentAvatar(id);unlockBadge('badge_ilk_adim');checkAndUpdateStreak();if(auth.currentUser&&COMPETITION_BACKEND_READY)competitionCall('syncCompetitionDisplay',{}).then(()=>{if(selectedGrade)loadGlobalLeaderboard('weekly');}).catch(()=>{});}
});
const btnOpenAvatar=document.getElementById('btn-open-avatar-selector');if(btnOpenAvatar)btnOpenAvatar.onclick=()=>avatarPicker.open(btnOpenAvatar);
// A cached old ID or SVG is resolved without writing to any account.
displayCurrentAvatar(currentAvatarValue());
document.addEventListener('error',event=>{
 const img=event.target;if(!(img instanceof HTMLImageElement)||!img.matches('.profile-img-header,.profile-hero-img,.admin-user-avatar,.global-lb-avatar,.avatar-item img,#avatar-draft-preview')||img.dataset.avatarFallback)return;
 img.dataset.avatarFallback='true';img.removeAttribute('srcset');img.src=avatarUrl(DEFAULT_AVATAR_ID);
},true);

onAuthStateChanged(auth, async (user) => {
    const revision = ++authRevision;
    avatarPicker.close({force:true});
    loadedProfile = null;
    const profileRoleLabel = document.getElementById('profile-display-role-tag');
    if (profileRoleLabel) profileRoleLabel.textContent = user ? 'Yükleniyor…' : '';
    const profileLevel = document.getElementById('profile-level-badge');
    if (profileLevel && user) profileLevel.style.display = 'none';
    document.body.classList.remove('account-admin', 'account-teacher');
    document.getElementById('btn-admin-panel')?.classList.add('is-hidden');
    const onboarding = document.getElementById('modal-onboarding-grade');
    if (onboarding) {
        hideModal(onboarding);
        onboarding.classList.add('is-hidden');
        onboarding.style.display = 'none';
        onboarding.setAttribute('aria-hidden', 'true');
    }
    localStorage.removeItem('currentUser');
    localStorage.removeItem('fenupx_user_grade');
    document.getElementById('profile-student-sections')?.style.setProperty('display', user ? 'none' : 'block');
    document.getElementById('profile-student-grade-group')?.style.setProperty('display', 'none');
    document.getElementById('profile-admin-view')?.style.setProperty('display', 'none');
    const streak = document.getElementById('header-streak-badge');
    if (streak) {
        streak.style.display = 'none';
        streak.innerHTML = '🔥 <span id="header-streak-count">0</span> Gün';
    }
    if (user) {
        const userRef = doc(db, "users", user.uid);
        let userSnap;
        try { userSnap = await getDoc(userRef); }
        catch (_) { if (revision === authRevision) updateEmailVerifyBox(user); return; }
        if (revision !== authRevision || auth.currentUser?.uid !== user.uid) return;
        
        if (userSnap.exists()) {
            const userData = userSnap.data();
            loadedProfile = userData;
            document.body.classList.toggle("account-admin", userData.role === "admin");
            document.body.classList.toggle("account-teacher", isTeacherProfile(userData));
            const userAvatar = avatarUrl(userData.avatar || DEFAULT_AVATAR_ID,192);
            const fullAd = `${userData.name} ${userData.surname}`;
            
            if(btnUyelik) {
                btnUyelik.innerHTML = `<img src="${userAvatar}" class="profile-img-header" alt="Profil avatarı"> ${profileText(userData.name)}`;
                btnUyelik.onclick = (e) => {
                    e.stopPropagation(); 
                    if(profileDropdown) profileDropdown.classList.toggle('is-hidden');
                };
            }
            if(userDisplayName) userDisplayName.textContent = fullAd;
            if(userDisplayRole) userDisplayRole.textContent = userData.role === 'admin' ? 'Sistem Yöneticisi' : (isTeacherProfile(userData) ? 'Öğretmen' : (isStudentProfile(userData) ? 'Öğrenci' : 'Hesap'));
            
            const btnAP = document.getElementById('btn-admin-panel');
            if(userData.role === 'admin' && btnAP) {
                btnAP.classList.remove('is-hidden');
            }

            const pName = document.getElementById('p-name'); if(pName) pName.value = userData.name;
            const pSurname = document.getElementById('p-surname'); if(pSurname) pSurname.value = userData.surname;
            const pNick = document.getElementById('p-nickname'); if(pNick) pNick.value = userData.nickname || '';
            const pca = document.getElementById('p-current-avatar'); if(pca) pca.src = userAvatar;


            // V8.9.1: 1 Eylül Otomatik Sınıf Terfisi ve Sınıf Bilgisini Senkronize Et
            checkAnnualPromotion(userData);
            if (COMPETITION_BACKEND_READY && isStudentProfile(userData) && normalizeGrade(userData.sinif)) competitionCall('initializeCompetition', {}).catch(e => console.warn('Yarışma sınıfı doğrulanamadı:', e.message));
            const userGrade = normalizeGrade(userData.sinif);
            localStorage.setItem('fenupx_user_grade', userGrade);
            try {
                const cu = { name: userData.name, surname: userData.surname, nickname: userData.nickname, email: userData.email, role: userData.role, sinif: userGrade };
                localStorage.setItem('currentUser', JSON.stringify(cu));
            } catch (_) {}

            if (COMPETITION_BACKEND_READY && isStudentProfile(userData) && userGrade) {
                const year = competitionYear();
                getDoc(doc(db, `leaderboards/${year}/grades/${userGrade}/entries/${user.uid}`)).then(snap => {
                    if (snap.exists() && loadedProfile) {
                        loadedProfile._cohortSeasonScore = Number(snap.data()?.score) || 0;
                    }
                }).catch(() => {});
            }

            const pGrade = document.getElementById('profile-grade');
            if (pGrade) pGrade.value = normalizeGrade(userData.sinif);
            const correctionChoice = document.getElementById('grade-correction-choice');
            const correctionStatus = document.getElementById('grade-correction-status');
            const pendingCorrection = userData.gradeCorrectionRequest?.status === 'pending';
            if (correctionChoice) correctionChoice.value = pendingCorrection ? normalizeGrade(userData.gradeCorrectionRequest.requestedGrade) : '';
            if (correctionStatus) correctionStatus.textContent = pendingCorrection ? 'Sınıf düzeltme talebin yönetici incelemesinde.' : '';

            const isAdmin = userData.role === 'admin';

            // V8.9.2: Sınıf bilgisi bulunmayan mevcut öğrenciler için tek seferlik onboarding penceresi
            if (!isAdmin && isStudentProfile(userData) && !userData.middleSchoolGraduated && !normalizeGrade(userData.sinif)) {
                checkMissingGradeOnboarding(user, userData);
            }

            // Gelişim göstergeleri yalnızca profildedir; üst başlıkta gösterilmez.
            const hStreakBadge = document.getElementById('header-streak-badge');
            if (hStreakBadge) {
                hStreakBadge.style.display = 'none';
                if (!isAdmin) {
                    updateStreakUI();
                }
            }

            // V8.9.1: Profil Modalında Yönetici / Öğrenci Görünüm Ayrımı
            const profHeroName = document.getElementById('profile-display-fullname');
            if (profHeroName) profHeroName.textContent = fullAd;
            const adminName = document.getElementById('admin-display-fullname');
            const adminEmail = document.getElementById('admin-display-email');
            if (adminName) adminName.textContent = fullAd;
            if (adminEmail) adminEmail.textContent = user.email || userData.email || '';
            const profHeroRole = document.getElementById('profile-display-role-tag');
            const studentSecs = document.getElementById('profile-student-sections');
            const studentGradeGroup = document.getElementById('profile-student-grade-group');
            const adminView = document.getElementById('profile-admin-view');
            const pStreakBadge = document.querySelector('.profile-streak-badge');
            const pLevelBadge = document.getElementById('profile-level-badge');

            if (isAdmin) {
                if (studentSecs) studentSecs.style.display = 'none';
                if (studentGradeGroup) studentGradeGroup.style.display = 'none';
                if (adminView) {
                    adminView.classList.remove('is-hidden');
                    adminView.style.display = 'block';
                }
                const banAlert = document.getElementById('admin-ban-alert');
                if (banAlert) {
                    banAlert.classList.toggle('is-hidden', userData.isBanned !== true);
                }
                if (pStreakBadge) pStreakBadge.style.display = 'none';
                if (pLevelBadge) pLevelBadge.style.display = 'none';
                if (profHeroRole) profHeroRole.textContent = 'Yönetici';
            } else {
                if (adminView) {
                    adminView.classList.add('is-hidden');
                    adminView.style.display = 'none';
                }
                if (studentSecs) studentSecs.style.display = isStudentProfile(userData) ? 'block' : 'none';
                if (studentGradeGroup) studentGradeGroup.style.display = isStudentProfile(userData) ? '' : 'none';
                if (pLevelBadge) pLevelBadge.style.display = isStudentProfile(userData) ? '' : 'none';
                if (pStreakBadge) pStreakBadge.style.display = isStudentProfile(userData) ? 'inline-flex' : 'none';
                if (profHeroRole) profHeroRole.textContent = isStudentProfile(userData) ? (userGrade ? `🎓 ${userGrade}. Sınıf` : 'Öğrenci') : (isTeacherProfile(userData) ? 'Öğretmen' : 'Hesap');

                const karneTitle = document.getElementById('profile-karne-title') || document.querySelector('.profile-karne-section .profile-section-title-bar h4');
                if (karneTitle) {
                    karneTitle.innerHTML = `<i class="fas fa-graduation-cap"></i> ${userGrade ? `${userGrade}. Sınıf ` : ''}Eksik Kazanım Karnesi`;
                }

                evaluateBadges();
                updateStreakUI();
                renderBadgesShowcase();
                renderKarneSummary();
                renderCalismalarim();
            }

            const lbg = document.getElementById('lb-guest-promo'); if(lbg) lbg.classList.add('is-hidden');
            const lbu = document.getElementById('lb-user-rank'); if(lbu) lbu.classList.remove('is-hidden');
            updateEmailVerifyBox(user);

        } else {
            if (sessionStorage.getItem('google_auth_in_progress') === 'true') {
                return;
            } else {
                // A missing profile must never delete an Auth account.
                return;
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

function prepareProfileModalView() {
    const isAdmin = loadedProfile?.role === 'admin';
    const studentSecs = document.getElementById('profile-student-sections');
    const studentGradeGroup = document.getElementById('profile-student-grade-group');
    const adminView = document.getElementById('profile-admin-view');
    const pStreak = document.querySelector('.profile-streak-badge');
    const pLvl = document.getElementById('profile-level-badge');
    if (isAdmin) {
        if (studentSecs) studentSecs.style.display = 'none';
        if (studentGradeGroup) studentGradeGroup.style.display = 'none';
        if (adminView) { adminView.classList.remove('is-hidden'); adminView.style.display = 'block'; }
        if (pStreak) pStreak.style.display = 'none';
        if (pLvl) pLvl.style.display = 'none';
    } else {
        if (adminView) { adminView.classList.add('is-hidden'); adminView.style.display = 'none'; }
        if (studentSecs) studentSecs.style.display = isStudentProfile(loadedProfile) ? 'block' : 'none';
        if (studentGradeGroup) studentGradeGroup.style.display = isStudentProfile(loadedProfile) ? '' : 'none';
        if (pStreak) pStreak.style.display = isStudentProfile(loadedProfile) ? 'inline-flex' : 'none';
        if (pLvl) pLvl.style.display = isStudentProfile(loadedProfile) ? '' : 'none';
        evaluateBadges();
        updateStreakUI();
        renderBadgesShowcase();
        renderKarneSummary();
        renderCalismalarim();
    }
}

const btnOpenProfile = document.getElementById('btn-open-profile');
if (btnOpenProfile) {
    btnOpenProfile.onclick = (e) => {
        e.stopPropagation();
        resetDeleteAccountBox();
        updateEmailVerifyBox(auth.currentUser);
        if(profileDropdown) profileDropdown.classList.add('is-hidden');
        prepareProfileModalView();
        showModal(profileModal);
    };
}

const headerStreakBadge = document.getElementById('header-streak-badge');
if (headerStreakBadge) {
    headerStreakBadge.onclick = (e) => {
        e.stopPropagation();
        resetDeleteAccountBox();
        updateEmailVerifyBox(auth.currentUser);
        if(profileDropdown) profileDropdown.classList.add('is-hidden');
        prepareProfileModalView();
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
            prepareProfileModalView();
            showModal(profileModal);
        };
    }
});

const clProfile = document.getElementById('close-profile');
if(clProfile) clProfile.onclick = () => {
    avatarPicker.close();
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

const gradeCorrectionButton = document.getElementById('btn-grade-correction');
if (gradeCorrectionButton) gradeCorrectionButton.onclick = async () => {
    const user = auth.currentUser;
    const revision = authRevision;
    const grade = normalizeGrade(document.getElementById('grade-correction-choice')?.value);
    const status = document.getElementById('grade-correction-status');
    if (!user || !isStudentProfile(loadedProfile)) return;
    if (!grade || grade === normalizeGrade(loadedProfile.sinif)) { status.textContent = 'Kayıtlı sınıfından farklı, doğru sınıfı seç.'; return; }
    gradeCorrectionButton.disabled = true;
    try {
        await updateDoc(doc(db, 'users', user.uid), { gradeCorrectionRequest: { requestedGrade: grade, status: 'pending' } });
        if (revision !== authRevision) return;
        loadedProfile.gradeCorrectionRequest = { requestedGrade: grade, status: 'pending' };
        status.textContent = 'Talebin yönetici incelemesine gönderildi. Kayıtlı sınıfın değişmedi.';
    } catch (_) { if (revision === authRevision) status.textContent = 'Talep gönderilemedi. Daha sonra tekrar dene.'; }
    finally { gradeCorrectionButton.disabled = false; }
};

const btnSaveProf = document.getElementById('btn-save-profile');
if(btnSaveProf) {
    btnSaveProf.onclick = async () => {
        const profileRevision = authRevision;
        const user = auth.currentUser;
        const pName = document.getElementById('p-name');
        const pSur = document.getElementById('p-surname');
        const pNick = document.getElementById('p-nickname');
        const pca = document.getElementById('p-current-avatar');
        const pGrade = document.getElementById('profile-grade');
        
        const name = pName ? pName.value.trim() : '';
        const surname = pSur ? pSur.value.trim() : '';
        const nickname = pNick ? pNick.value.trim() : '';
        const avatar = loadedProfile?.avatar || DEFAULT_AVATAR_ID;
        if (!user || !loadedProfile) return;
        const sinif = normalizeGrade(loadedProfile.sinif);
        if (isStudentProfile(loadedProfile) && !sinif) return alert('Lütfen sınıfını seç.');

        const isAdmin = loadedProfile.role === 'admin';
        // Yönetici için ad zorunludur; soyad boş veya kısaltma ("X") olabilir. Öğrenci için ad, soyad ve yarışmacı adı zorunludur.
        if (!name || (!isAdmin && !surname) || (!isAdmin && !nickname)) {
            return alert("Ad, soyad ve yarışmacı adı alanları boş bırakılamaz.");
        }

        // Yönetici taklidi koruması: Sıradan kullanıcılar "FenUp", "FenUp X", "Admin" vb. isimleri alamaz
        if (!isAdmin) {
            if (isReservedAdminName(name) || (surname && isReservedAdminName(surname)) || isReservedAdminName(nickname)) {
                return alert("Bu isim platform yönetimine ayrılmıştır. Lütfen kendi adınızı veya farklı bir yarışmacı adı belirleyin.");
            }
        }
        
        // Küfür/uygunsuz içerik denetimi
        if (!uygunIsimMi(name) || (surname && !uygunIsimMi(surname)) || (!isAdmin && !uygunIsimMi(nickname))) {
            return alert("Girdiğiniz ad, soyad veya yarışmacı adı topluluk kurallarına aykırı kelimeler içeriyor. Lütfen kurallara uygun bir isim belirleyin.");
        }
        
        try {
            if (isStudentProfile(loadedProfile)) { unlockBadge('badge_ilk_adim'); checkAndUpdateStreak(); }
            const profHeroName = document.getElementById('profile-display-fullname');
            if (profHeroName && name) profHeroName.textContent = `${name} ${surname}`;
            await updateDoc(doc(db, "users", user.uid), { name, surname, avatar, ...(loadedProfile.role !== 'admin' ? {nickname} : {}) });
            if(COMPETITION_BACKEND_READY)await competitionCall('syncCompetitionDisplay',{});
            if (profileRevision !== authRevision) return;
            localStorage.setItem('fenupx_user_grade', sinif);
            try {
                const rawCu = localStorage.getItem('currentUser');
                const cu = rawCu ? JSON.parse(rawCu) : {};
                cu.name = name; cu.surname = surname; cu.nickname = loadedProfile.role === 'admin' ? loadedProfile.nickname : nickname; cu.avatar = avatar; cu.sinif = sinif;
                localStorage.setItem('currentUser', JSON.stringify(cu));
            } catch (_) {}

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
            if(COMPETITION_BACKEND_READY){
                let cleanup;do{cleanup=await competitionCall('deleteCompetitionData',{});}while(!cleanup.done);
            }
            {
                const {runTransaction} = await import('https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js');
                await runTransaction(db, async tx => {
                    tx.set(doc(db, 'deletedProfiles', user.uid), {deleted:true});
                    tx.delete(doc(db, 'users', user.uid));
                });
                await deleteUser(user);
            }
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
                if(isReservedAdminName(fName) || isReservedAdminName(lName) || isReservedAdminName(nick)) return alert("Bu isim platform yönetimine ayrılmıştır. Lütfen kendi adınızı veya farklı bir yarışmacı adı belirleyin.");
                if(!uygunIsimMi(fName) || !uygunIsimMi(lName) || !uygunIsimMi(nick)) return alert("Uygunsuz kelime kullanımı tespit edildi. Sistem kuralları gereği üyeliğiniz reddedildi. Lütfen küfür veya argo içermeyen isimler kullanın.");
                
                const uGradeEl = document.getElementById('user-grade') || document.getElementById('reg-grade');
                const userSinif = normalizeGrade(uGradeEl?.value);
                if (!userSinif) return alert('Lütfen sınıfını seç.');

                const cred = await createUserWithEmailAndPassword(auth, email, pass);
                try {
                    await sendEmailVerification(cred.user);
                } catch (verifyErr) {
                    console.warn("Doğrulama e-postası gönderilemedi:", verifyErr);
                }
                await setDoc(doc(db, "users", cred.user.uid), {
                    name: fName, surname: lName, nickname: nick, email: email, role: "student", sinif: userSinif, totalScore: 0, isBanned: false, avatar: DEFAULT_AVATAR_ID, createdAt: new Date()
                });
                localStorage.setItem('fenupx_user_grade', userSinif);
                try {
                    const cu = { name: fName, surname: lName, nickname: nick, email: email, role: "student", sinif: userSinif };
                    localStorage.setItem('currentUser', JSON.stringify(cu));
                } catch (_) {}
                updateEmailVerifyBox(cred.user);
                hideModal(authModal);
                alert(COMPETITION_BACKEND_READY
                    ? 'Hesabın oluşturuldu! E-posta doğrulama bağlantısını gönderdik. Liderlik tablosuna puan kaydetmek için e-postanı doğrula.'
                    : 'Hesabın oluşturuldu! E-posta doğrulama bağlantısını gönderdik. Çalışmalara başlayabilirsin. Yeni liderlik puanı kaydı şu anda geçici olarak kapalı.');
                location.reload();
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
                const gGradeEl = document.getElementById('google-user-grade') || document.getElementById('user-grade');
                // New Google users choose explicitly in persisted onboarding after reload.
                const gSinif = '';
                
                await setDoc(doc(db, "users", result.user.uid), {
                    name: firstName, surname: lastName, nickname: gName, email: result.user.email, role: "student", sinif: gSinif, totalScore: 0, isBanned: false, avatar: DEFAULT_AVATAR_ID, createdAt: new Date()
                });
                localStorage.setItem('fenupx_user_grade', gSinif);
                try {
                    const cu = { name: firstName, surname: lastName, nickname: gName, email: result.user.email, role: "student", sinif: gSinif };
                    localStorage.setItem('currentUser', JSON.stringify(cu));
                } catch (_) {}
                
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
let adminClassFilter = '';
const pendingGradeWrites = new Set();
document.querySelectorAll('[data-user-grade-filter]').forEach(button => {
    button.onclick = () => {
        adminClassFilter = button.dataset.userGradeFilter;
        document.querySelectorAll('[data-user-grade-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        renderAdminUsers(adminSearchInput?.value || '');
    };
});

const btnAdminTabUsers = document.getElementById('btn-admin-tab-users');
const btnAdminTabQuestions = document.getElementById('btn-admin-tab-questions');
const btnAdminTabReports = document.getElementById('btn-admin-tab-reports');
const adminPanelUsers = document.getElementById('admin-panel-users');
const adminPanelQuestions = document.getElementById('admin-panel-questions');
const adminPanelReports = document.getElementById('admin-panel-reports');

function switchAdminTab(tab) {
    const tabConfigs = [
        { id: 'users', btn: btnAdminTabUsers, panel: adminPanelUsers },
        { id: 'questions', btn: btnAdminTabQuestions, panel: adminPanelQuestions },
        { id: 'reports', btn: btnAdminTabReports, panel: adminPanelReports }
    ];

    tabConfigs.forEach(t => {
        const isActive = t.id === tab;
        if (t.panel) t.panel.style.display = isActive ? 'flex' : 'none';
        if (t.btn) {
            t.btn.classList.toggle('active', isActive);
            t.btn.style.background = isActive ? 'rgba(245,158,11,0.2)' : 'rgba(30,41,59,0.8)';
            t.btn.style.color = isActive ? '#f59e0b' : '#cbd5e1';
            t.btn.style.borderColor = isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)';
        }
    });

    if (tab === 'questions') {
        if (window.FenUpExam && typeof window.FenUpExam.renderAdminQuestionReview === 'function') {
            window.FenUpExam.renderAdminQuestionReview();
        }
    } else if (tab === 'reports') {
        loadAdminReports(true);
    }
}

if (btnAdminTabUsers) btnAdminTabUsers.onclick = () => switchAdminTab('users');
if (btnAdminTabQuestions) btnAdminTabQuestions.onclick = () => switchAdminTab('questions');
if (btnAdminTabReports) btnAdminTabReports.onclick = () => switchAdminTab('reports');

if(btnAdminPanel) {
    btnAdminPanel.onclick = (e) => {
        e.stopPropagation();
        if(profileDropdown) profileDropdown.classList.add('is-hidden');
        switchAdminTab('users');
        showModal(adminModal);
        loadAdminUsers();
        loadAdminReports(false);
        window.FenUpExam?.refreshAdminQuestionCount();
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
    if (loadedProfile?.role !== 'admin') return;
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

function profileText(value) {
    return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function renderAdminUsers(filterText = '') {
    if(!adminUserList) return;
    adminUserList.innerHTML = '';
    const lowerFilter = filterText.toLowerCase();
    const sourceList = (window.allAdminUsers && Array.isArray(window.allAdminUsers) && window.allAdminUsers.length > 0) ? window.allAdminUsers : allAdminUsers;
    const filtered = sourceList.filter(u => (!adminClassFilter || (isStudentProfile(u) && normalizeGrade(u.sinif) === adminClassFilter)) && (
        (u.name && String(u.name).toLowerCase().includes(lowerFilter)) ||
        (u.nickname && String(u.nickname).toLowerCase().includes(lowerFilter)) ||
        (u.email && String(u.email).toLowerCase().includes(lowerFilter))
    ));

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
        const gradeText = (u.sinif && VALID_GRADES.includes(String(u.sinif))) ? `${u.sinif}. Sınıf` : 'Belirtilmemiş';
        const row = document.createElement('div');
        row.className = `admin-user-row ${isBanned ? 'banned' : ''}`;
        row.innerHTML = `
            <div class="admin-user-info">
                <img src="${profileText(avatarUrl(u.avatar))}" class="admin-user-avatar" alt="${profileText(u.nickname || 'Avatar')}">
                <div class="admin-user-details">
                    <h4>${profileText(u.nickname || 'İsimsiz Kaptan')}${onlineBadge}</h4>
                    <p>${profileText(u.name || '')} ${profileText(u.surname || '')} | ${profileText(u.email || '')}</p>
                </div>
            </div>
            ${isStudentProfile(u) ? `<div class="admin-user-grade-col">
                <span class="admin-grade-badge" style="display: block; font-size: 0.75rem; color: #94a3b8; margin-bottom: 3px;">
                    <i class="fas fa-graduation-cap"></i> Sınıf: <strong style="color: #38bdf8;">${gradeText}</strong>
                </span>
                ${u.gradeCorrectionRequest?.status === 'pending' && normalizeGrade(u.gradeCorrectionRequest.requestedGrade) ? `<p class="grade-request-notice">Düzeltme talebi: ${normalizeGrade(u.gradeCorrectionRequest.requestedGrade)}. Sınıf · Onay için sınıfı seç. Eski puanlar taşınmaz.</p>` : ''}
                <select class="admin-grade-select" data-uid="${profileText(u.id)}" aria-label="Sınıf Düzenle">
                    <option value="" ${!u.sinif ? 'selected' : ''}>Belirtilmemiş</option>
                    <option value="5" ${String(u.sinif) === '5' ? 'selected' : ''}>5. Sınıf</option>
                    <option value="6" ${String(u.sinif) === '6' ? 'selected' : ''}>6. Sınıf</option>
                    <option value="7" ${String(u.sinif) === '7' ? 'selected' : ''}>7. Sınıf</option>
                    <option value="8" ${String(u.sinif) === '8' ? 'selected' : ''}>8. Sınıf</option>
                </select>
            </div>` : ''}
            <div class="admin-user-stats">
                <i class="fas fa-star" style="color:#f59e0b;"></i> ${formatScore(u.totalScore || 0)} Puan
            </div>
            <div class="admin-actions">
                <button class="btn-edit-nick" data-uid="${profileText(u.id)}" data-nick="${profileText(u.nickname || '')}"><i class="fas fa-edit"></i> İsim Değiştir</button>
                ${isBanned 
                    ? `<button class="btn-unban" data-uid="${profileText(u.id)}"><i class="fas fa-check-circle"></i> Engeli Kaldır</button>`
                    : `<button class="btn-ban" data-uid="${profileText(u.id)}"><i class="fas fa-ban"></i> Blokla</button>`
                }
            </div>
        `;
        adminUserList.appendChild(row);
    });

    document.querySelectorAll('.admin-grade-select').forEach(sel => {
        sel.onchange = async () => {
            const uid = sel.dataset.uid;
            const newGrade = sel.value;
            const row = sel.closest('.admin-user-row');
            row.querySelectorAll('button,select').forEach(el => el.disabled = true);
            await changeUserGrade(uid, newGrade);
            row.querySelectorAll('button,select').forEach(el => el.disabled = false);
        };
    });

    document.querySelectorAll('.btn-edit-nick').forEach(btn => {
        btn.onclick = () => {
            const newNick = prompt("Kullanıcı için yeni bir nickname belirleyin:", btn.dataset.nick);
            if(newNick && newNick.trim() !== "" && newNick !== btn.dataset.nick) {
                if(isReservedAdminName(newNick.trim())) {
                    alert("Öğrencilere yönetim veya platform adı ('FenUp', 'Admin') verilemez.");
                    return;
                }
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
    if (loadedProfile?.role !== 'admin' || pendingGradeWrites.has(uid)) return;
    try {
        await updateDoc(doc(db, "users", uid), { nickname: newNick });
        if(COMPETITION_BACKEND_READY)await competitionCall('syncCompetitionDisplay',{uid});
        const userIndex = allAdminUsers.findIndex(u => u.id === uid);
        if(userIndex > -1) allAdminUsers[userIndex].nickname = newNick;
        const asi = document.getElementById('admin-search-input');
        renderAdminUsers(asi ? asi.value : '');
        alert("Kullanıcı adı başarıyla değiştirildi.");
    } catch(e) {
        alert("İsim değiştirilemedi: " + e.message);
    }
}

export async function changeUserGrade(uid, newGrade) {
    const target = allAdminUsers.find(u => u.id === uid);
    if (loadedProfile?.role !== 'admin' || !isStudentProfile(target) || !normalizeGrade(newGrade) || pendingGradeWrites.has(uid)) return;
    pendingGradeWrites.add(uid);
    try {
        if (COMPETITION_BACKEND_READY) await competitionCall('correctStudentClass', {uid, grade:newGrade});
        else await updateDoc(doc(db, 'users', uid), {sinif:newGrade,gradeCorrectionRequest:{requestedGrade:newGrade,status:'approved'}});
        const userIndex = allAdminUsers.findIndex(u => u.id === uid);
        if(userIndex > -1) {
            allAdminUsers[userIndex].sinif = newGrade;
            allAdminUsers[userIndex].gradeCorrectionRequest = {requestedGrade:newGrade,status:'approved'};
        }
        const asi = document.getElementById('admin-search-input');
        renderAdminUsers(asi ? asi.value : '');
        showBadgeEarnedToast({
            icon: "✅",
            title: "Sınıf Güncellendi",
            desc: newGrade ? `Öğrencinin sınıfı ${newGrade}. Sınıf olarak güncellendi. Eski puanlar yeni sınıfa taşınmadı.` : "Öğrencinin sınıfı sıfırlandı.",
            condition: "Yönetici İşlemi"
        });
    } catch(e) {
        alert("Güvenli sınıf düzeltme servisi işlemi onaylamadı. Önceki sınıf korundu.");
        renderAdminUsers(adminSearchInput?.value || '');
    } finally { pendingGradeWrites.delete(uid); }
}
if (typeof window !== 'undefined') {
    window.changeUserGrade = changeUserGrade;
    window.renderAdminUsers = renderAdminUsers;
    window.loadAdminUsers = loadAdminUsers;
    window.uygunIsimMi = uygunIsimMi;
    window.isReservedAdminName = isReservedAdminName;
}

async function toggleBanStatus(uid, banStatus) {
    if (loadedProfile?.role !== 'admin' || pendingGradeWrites.has(uid)) return;
    const mesaj = banStatus ? "Bu kullanıcıyı tablolardan bloklamak istediğinize emin misiniz?" : "Bu kullanıcının engelini kaldırmak istediğinize emin misiniz?";
    if(!confirm(mesaj)) return;
    
    try {
        await updateDoc(doc(db, "users", uid), { isBanned: banStatus });
        if(COMPETITION_BACKEND_READY)await competitionCall('syncCompetitionDisplay',{uid});
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

// ==========================================================================
// V8.9.8: SORU BİLDİRİMLERİ YÖNETİMİ (Admin Soru İnceleme ve Raporlama)
// ==========================================================================
let allAdminReports = [];
let adminReportStatusFilter = 'all';
let adminReportGradeFilter = 'all';

const reportTypeLabels = {
    'hatali_soru': 'Hatalı Soru Kökü',
    'yanlis_sik': 'Yanlış Şıklar / Cevap',
    'yazim_hatasi': 'Yazım / İmla Hatası',
    'mufredat_disi': 'Müfredat Dışı Konu',
    'diger': 'Diğer'
};

const statusLabels = {
    'yeni': 'Yeni',
    'inceleniyor': 'İnceleniyor',
    'cozuldu': 'Çözüldü'
};

async function loadAdminReports(renderNow = true) {
    if (loadedProfile?.role !== 'admin') return;
    const reportList = document.getElementById('admin-report-list');
    if (renderNow && reportList) {
        reportList.innerHTML = '<p style="color:#aaa; text-align:center; margin-top:20px;">Bildirimler yükleniyor...</p>';
    }
    try {
        let snap;
        try {
            snap = await getDocs(query(collection(db, "reported_questions"), orderBy("reportedAt", "desc"), limit(100)));
        } catch (_) {
            snap = await getDocs(collection(db, "reported_questions"));
        }
        allAdminReports = [];
        if (snap && typeof snap.forEach === 'function') {
            snap.forEach(docSnap => {
                allAdminReports.push({ id: docSnap.id, ...docSnap.data() });
            });
        }
        allAdminReports.sort((a, b) => {
            const tA = new Date(a.reportedAt || 0).getTime();
            const tB = new Date(b.reportedAt || 0).getTime();
            return tB - tA;
        });
        updateAdminReportBadge();
        if (renderNow) renderAdminReports();
    } catch (err) {
        console.error('Soru bildirimleri yüklenirken hata oluştu:', err);
        if (renderNow && reportList) {
            reportList.innerHTML = '<p style="color:#ef4444; text-align:center; margin-top:20px;">Bildirimler yüklenirken hata oluştu. Lütfen bağlantınızı kontrol edin.</p>';
        }
    }
}

function updateAdminReportBadge() {
    const badge = document.getElementById('admin-report-badge');
    if (!badge) return;
    const newCount = allAdminReports.filter(r => (r.status || 'yeni') === 'yeni').length;
    badge.textContent = String(newCount);
    if (newCount > 0) {
        badge.classList.remove('is-hidden');
    } else {
        badge.classList.add('is-hidden');
    }
}

function renderAdminReports() {
    const container = document.getElementById('admin-report-list');
    if (!container) return;

    const filtered = allAdminReports.filter(r => {
        const status = r.status || 'yeni';
        const grade = String(r.grade || '');
        const matchStatus = adminReportStatusFilter === 'all' || status === adminReportStatusFilter;
        const matchGrade = adminReportGradeFilter === 'all' || grade === adminReportGradeFilter;
        return matchStatus && matchGrade;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<div style="color:#aaa; text-align:center; margin-top:30px; padding: 20px;"><i class="fas fa-check-circle" style="color:#10b981; font-size:2rem; display:block; margin-bottom:10px;"></i><p style="margin:0; font-size:1rem; color:#f8fafc;">Bu filtreye uygun soru bildirimi bulunmuyor.</p></div>';
        return;
    }

    container.innerHTML = '';

    filtered.forEach(r => {
        const card = document.createElement('div');
        const status = r.status || 'yeni';
        card.className = `admin-report-card status-${status}`;

        let dateStr = 'Tarih yok';
        if (r.reportedAt) {
            try {
                const d = typeof r.reportedAt.toDate === 'function' ? r.reportedAt.toDate() : new Date(r.reportedAt);
                dateStr = d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            } catch (_) { dateStr = String(r.reportedAt); }
        }

        const typeText = reportTypeLabels[r.reportType] || r.reportType || 'Diğer';
        const statusText = statusLabels[status] || status;
        const gradeText = r.grade ? `${profileText(r.grade)}. Sınıf` : 'Sınıf Belirtilmemiş';
        const unitText = r.unit ? `Ünite ${profileText(r.unit)}` : '';
        const outcomeText = r.learningOutcome ? `Kazanım: ${profileText(r.learningOutcome)}` : '';
        const versionText = r.contentVersion ? `v${profileText(r.contentVersion)}` : 'Sürüm bilinmiyor';
        const qRaw = r.questionText || '';
        const qExcerpt = profileText(qRaw.slice(0, 130)) + (qRaw.length > 130 ? '…' : '');
        const descText = r.description ? profileText(r.description) : '<em>Açıklama girilmedi.</em>';
        const adminNotes = r.adminNotes ? profileText(r.adminNotes) : '';

        card.innerHTML = `
            <div class="admin-rep-card-header">
                <div class="admin-rep-badges">
                    <span class="admin-rep-pill-status ${status}">${statusText}</span>
                    <span class="admin-rep-pill-type">${profileText(typeText)}</span>
                    <span class="admin-rep-pill-meta">${gradeText}${unitText ? ' · ' + unitText : ''}</span>
                    ${outcomeText ? `<span class="admin-rep-pill-outcome">${outcomeText}</span>` : ''}
                    <span class="admin-rep-pill-version" title="İçerik Sürümü">${versionText}</span>
                </div>
                <span class="admin-rep-date"><i class="fas fa-clock"></i> ${dateStr}</span>
            </div>

            <div class="admin-rep-body">
                <div class="admin-rep-q-preview">
                    <strong>Soru:</strong> <span>${qExcerpt || '<em>Metin yok (Eski kayıt)</em>'}</span>
                    <button type="button" class="btn-inspect-q f-btn f-btn-ikinci" data-report-id="${profileText(r.id)}" style="padding: 4px 10px; font-size: 0.78rem; margin-left: 8px;">
                        <i class="fas fa-eye"></i> Soruyu İncele
                    </button>
                </div>
                <div class="admin-rep-desc-box">
                    <strong>Öğrenci Bildirim Açıklaması:</strong>
                    <p class="admin-rep-desc-text">${descText}</p>
                </div>
            </div>

            <div class="admin-rep-footer">
                <div class="admin-rep-status-control">
                    <label style="font-size: 0.8rem; color: #94a3b8; margin-right: 4px;">Durum:</label>
                    <select class="admin-rep-select-status exam-select" data-report-id="${profileText(r.id)}" style="padding: 4px 8px; font-size: 0.8rem; min-height: 32px; background: #1e293b; color: #f8fafc; border-radius: 6px;">
                        <option value="yeni" ${status === 'yeni' ? 'selected' : ''}>Yeni</option>
                        <option value="inceleniyor" ${status === 'inceleniyor' ? 'selected' : ''}>İnceleniyor</option>
                        <option value="cozuldu" ${status === 'cozuldu' ? 'selected' : ''}>Çözüldü</option>
                    </select>
                </div>
                <div class="admin-rep-notes-control">
                    <input type="text" class="admin-rep-note-input fenupx-input" data-report-id="${profileText(r.id)}" placeholder="Yönetici inceleme notu ekle..." value="${adminNotes}" style="margin: 0; padding: 4px 8px; font-size: 0.8rem; height: 32px; flex: 1; min-width: 0; box-sizing: border-box;">
                    <button type="button" class="btn-save-rep-note f-btn f-btn-ana" data-report-id="${profileText(r.id)}" style="padding: 4px 12px; font-size: 0.8rem; height: 32px; white-space: nowrap; flex-shrink: 0; box-sizing: border-box;">
                        <i class="fas fa-check"></i> Notu Kaydet
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    container.querySelectorAll('.btn-inspect-q').forEach(btn => {
        btn.onclick = () => {
            const rId = btn.dataset.reportId;
            const rep = allAdminReports.find(x => x.id === rId);
            if (rep) openReportDetailModal(rep);
        };
    });

    container.querySelectorAll('.admin-rep-select-status').forEach(sel => {
        sel.onchange = async () => {
            const rId = sel.dataset.reportId;
            const newStatus = sel.value;
            await updateReportStatus(rId, newStatus, null);
        };
    });

    container.querySelectorAll('.btn-save-rep-note').forEach(btn => {
        btn.onclick = async () => {
            const rId = btn.dataset.reportId;
            const input = container.querySelector(`.admin-rep-note-input[data-report-id="${rId}"]`);
            const statusSel = container.querySelector(`.admin-rep-select-status[data-report-id="${rId}"]`);
            const note = input ? input.value.trim() : '';
            const status = statusSel ? statusSel.value : 'yeni';
            btn.disabled = true;
            btn.textContent = 'Kaydediliyor…';
            await updateReportStatus(rId, status, note);
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-check"></i> Notu Kaydet';
        };
    });
}

async function updateReportStatus(reportId, newStatus, newNotes) {
    if (loadedProfile?.role !== 'admin') return;
    const target = allAdminReports.find(r => r.id === reportId);
    if (!target) return;
    const updateData = { status: newStatus, updatedAt: new Date().toISOString() };
    if (newNotes !== null) updateData.adminNotes = newNotes;

    try {
        await updateDoc(doc(db, "reported_questions", reportId), updateData);
        target.status = newStatus;
        if (newNotes !== null) target.adminNotes = newNotes;
        updateAdminReportBadge();
        renderAdminReports();
    } catch (e) {
        console.error('Bildirim güncellenemedi:', e);
        alert('Bildirim güncellenirken hata oluştu: ' + (e.message || 'Yetki veya bağlantı hatası'));
        renderAdminReports();
    }
}

function maskPII(text) {
    if (!text || typeof text !== 'string') return '';
    let res = text;
    // E-posta maskeleme
    res = res.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[E-POSTA MASKEYLENDİ]');
    // Telefon maskeleme (+90 5xx xxx xx xx, 05xx xxx xx xx, 5xxxxxxxxx vb.)
    res = res.replace(/(?:\+?90\s*|0)?\s*\(?5\d{2}\)?[\s.-]*\d{3}[\s.-]*\d{2}[\s.-]*\d{2}\b/g, '[TELEFON MASKEYLENDİ]');
    // 11 haneli kimlik numarası (TCKN) maskeleme
    res = res.replace(/\b[1-9]\d{10}\b/g, '[KİMLİK NO MASKEYLENDİ]');
    return res;
}

async function findPoolMatch(report) {
    if (!report) return { status: 'none', match: null };
    const targetText = (report.questionText || report.question || '').trim().toLowerCase().replace(/\s+/g, ' ');
    const targetId = report.questionId ? String(report.questionId) : null;
    if (!targetText && !targetId) return { status: 'none', match: null };

    // Şampiyonlar Ligi soru havuzlarını yükle (belirtilen sınıf varsa önce o sınıf)
    const gradesToCheck = report.grade ? [String(report.grade)] : ['5', '6', '7', '8'];
    const pools = await Promise.all(gradesToCheck.map(g => loadGradePool(g)));

    let exactMatches = [];
    gradesToCheck.forEach((grade, poolIdx) => {
        const list = pools[poolIdx] || [];
        list.forEach((q, idx) => {
            const qStem = (q.question || q.stem || q.prompt || '').trim().toLowerCase().replace(/\s+/g, ' ');
            const qId = q.id ? String(q.id) : null;

            if (targetId && qId && targetId === qId) {
                exactMatches.push({ q, grade, index: idx, matchType: 'id' });
                return;
            }

            if (targetText && qStem === targetText) {
                const unitMatch = !report.unit || String(report.unit) === String(q.unit);
                exactMatches.push({ q, grade, index: idx, matchType: 'exact_stem', unitMatch });
            }
        });
    });

    // Geriye dönük eşleştirme: Havuzdaki soru kökü revize edilmişse çekirdek ifade üzerinden eşleştir
    if (exactMatches.length === 0 && targetText) {
        gradesToCheck.forEach((grade, poolIdx) => {
            const list = pools[poolIdx] || [];
            list.forEach((q, idx) => {
                const qStem = (q.question || q.stem || q.prompt || '').trim().toLowerCase().replace(/\s+/g, ' ');
                const isCoreMatch = (targetText.includes('kırarak veya yansıtarak') && targetText.includes('odaklayan')) &&
                                    (qStem.includes('kırarak veya yansıtarak') && qStem.includes('odaklayan'));
                if (isCoreMatch) {
                    const unitMatch = !report.unit || String(report.unit) === String(q.unit);
                    exactMatches.push({ q, grade, index: idx, matchType: 'core_phrase', unitMatch });
                }
            });
        });
    }

    if (exactMatches.length === 1) {
        const m = exactMatches[0];
        return {
            status: 'found',
            question: m.q,
            grade: m.grade,
            index: m.index,
            source: 'current_pool'
        };
    } else if (exactMatches.length > 1) {
        const unitFiltered = exactMatches.filter(m => m.unitMatch);
        if (unitFiltered.length === 1) {
            const m = unitFiltered[0];
            return {
                status: 'found',
                question: m.q,
                grade: m.grade,
                index: m.index,
                source: 'current_pool'
            };
        }
        return { status: 'multiple', matches: exactMatches };
    }
    return { status: 'not_found', match: null };
}

async function openReportDetailModal(report) {
    const modal = document.getElementById('admin-report-detail-modal');
    const body = document.getElementById('admin-report-detail-body');
    if (!modal || !body) return;

    // Sürüm bilgisi: Bilinmeyen sürüme güncel uygulama sürümünü uydurma
    const versionText = report.contentVersion ? ('v' + profileText(report.contentVersion)) : 'Sürüm bilinmiyor';
    const appVerText = report.appVersion ? `Uygulama: v${profileText(report.appVersion)}` : '';
    const curStatus = report.status || 'yeni';
    const statusText = statusLabels[curStatus] || curStatus;

    let optsHtml = '';
    let poolNoticeHtml = '';
    let questionStemToDisplay = report.questionText || '';
    let hintToDisplay = report.hint || '';
    let displayedQuestionId = report.questionId || '';

    const hasSnapshot = Array.isArray(report.answerOptions) && report.answerOptions.length > 0;

    if (hasSnapshot) {
        poolNoticeHtml = `
            <div style="margin-bottom: 12px; padding: 8px 12px; border-radius: 8px; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #6ee7b7; font-size: 0.8rem; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-camera"></i>
                <span><strong>Anlık Kayıt (Snapshot):</strong> Bu soru bildirim anındaki orijinal seçenekleri ve cevap anahtarıyla kaydedilmiştir.</span>
            </div>
        `;
        optsHtml = '<div style="margin-top: 12px;"><strong style="color:#cbd5e1; display:block; margin-bottom:6px;">Seçenekler ve Cevap Anahtarı:</strong><div style="display:flex; flex-direction:column; gap:6px;">' +
            report.answerOptions.map((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                const isCorrect = opt.isCorrect === true;
                const border = isCorrect ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)';
                const bg = isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(30,41,59,0.6)';
                const icon = isCorrect ? ' <span style="color:#10b981; font-weight:bold; margin-left:auto;"><i class="fas fa-check-circle"></i> Doğru Cevap</span>' : '';
                return `<div style="display:flex; align-items:center; padding:8px 12px; border-radius:8px; border:${border}; background:${bg};">
                    <span style="font-weight:bold; margin-right:10px; color:${isCorrect ? '#10b981' : '#94a3b8'};">[${letter}]</span>
                    <span>${profileText(opt.text || '')}</span>
                    ${icon}
                </div>`;
            }).join('') + '</div></div>';
    } else {
        // Eski kayıt: Seçenek verisi raporda yoksa güncel havuzla eşleştir
        const matchRes = await findPoolMatch(report);
        if (matchRes.status === 'found') {
            const mq = matchRes.question;
            questionStemToDisplay = mq.question || mq.stem || questionStemToDisplay;
            hintToDisplay = mq.hint || hintToDisplay;
            // Soru havuzundaki indekslerin dizi sıralamasına dayalı olduğu ve kalıcı bir veritabanı ID'si oluşturmadığı dikkate alınır
            if (mq.id) {
                displayedQuestionId = mq.id;
            } else if (report.questionId) {
                displayedQuestionId = report.questionId;
            } else {
                displayedQuestionId = `Havuz Konumu: ${profileText(matchRes.grade)}. Sınıf, Ünite ${profileText(mq.unit || '1')} (Sıra: #${matchRes.index + 1} - Yerel ID Yok)`;
            }

            poolNoticeHtml = `
                <div style="margin-bottom: 12px; padding: 10px 14px; border-radius: 8px; background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; color: #fde68a; font-size: 0.82rem; display: flex; align-items: flex-start; gap: 10px;">
                    <i class="fas fa-database" style="color: #f59e0b; font-size: 1.1rem; margin-top: 2px;"></i>
                    <div>
                        <strong>Güncel havuzdaki eşleşme:</strong> Bu soru eski bildirim anında seçenekleriyle kaydedilmediğinden, güncel Şampiyonlar Ligi soru havuzundan (${profileText(matchRes.grade)}. Sınıf, Ünite ${profileText(mq.unit || '1')}) eşleştirilerek getirilmiştir. <em>(Geçmiş anlık kayıt değildir)</em>
                    </div>
                </div>
            `;
            if (Array.isArray(mq.answerOptions) && mq.answerOptions.length > 0) {
                optsHtml = '<div style="margin-top: 12px;"><strong style="color:#cbd5e1; display:block; margin-bottom:6px;">Seçenekler ve Cevap Anahtarı (Güncel Havuz):</strong><div style="display:flex; flex-direction:column; gap:6px;">' +
                    mq.answerOptions.map((opt, i) => {
                        const letter = String.fromCharCode(65 + i);
                        const isCorrect = opt.isCorrect === true;
                        const border = isCorrect ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.1)';
                        const bg = isCorrect ? 'rgba(16,185,129,0.15)' : 'rgba(30,41,59,0.6)';
                        const icon = isCorrect ? ' <span style="color:#10b981; font-weight:bold; margin-left:auto;"><i class="fas fa-check-circle"></i> Doğru Cevap</span>' : '';
                        return `<div style="display:flex; align-items:center; padding:8px 12px; border-radius:8px; border:${border}; background:${bg};">
                            <span style="font-weight:bold; margin-right:10px; color:${isCorrect ? '#10b981' : '#94a3b8'};">[${letter}]</span>
                            <span>${profileText(opt.text || '')}</span>
                            ${icon}
                        </div>`;
                    }).join('') + '</div></div>';
            } else {
                optsHtml = '<p style="color:#94a3b8; font-style:italic; margin-top:8px;">Eşleşen soruda seçenek verisi bulunamadı.</p>';
            }
        } else if (matchRes.status === 'multiple') {
            poolNoticeHtml = `
                <div style="margin-bottom: 12px; padding: 10px 14px; border-radius: 8px; background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; color: #fca5a5; font-size: 0.82rem; display: flex; align-items: flex-start; gap: 10px;">
                    <i class="fas fa-exclamation-triangle" style="color: #ef4444; font-size: 1.1rem; margin-top: 2px;"></i>
                    <div>
                        <strong>Eşleşme Uyarısı:</strong> Güncel havuzda birden fazla olası soru eşleşmesi bulundu; tahminle bağlama yapılmadı.
                    </div>
                </div>
            `;
            optsHtml = '<p style="color:#94a3b8; font-style:italic; margin-top:8px;">Seçenek verisi bulunmuyor (eski kayıt; birden çok olası eşleşme).</p>';
        } else {
            poolNoticeHtml = `
                <div style="margin-bottom: 12px; padding: 8px 12px; border-radius: 8px; background: rgba(148, 163, 184, 0.1); border: 1px solid rgba(148, 163, 184, 0.25); color: #cbd5e1; font-size: 0.8rem; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-info-circle"></i>
                    <span>Bu eski bildirime ait seçenek verisi kaydedilmemiş ve güncel soru havuzunda güvenilir bir eşleşme bulunamadı.</span>
                </div>
            `;
            optsHtml = '<p style="color:#94a3b8; font-style:italic; margin-top:8px;">Seçenek verisi bulunmuyor (eski kayıt).</p>';
        }
    }

    body.innerHTML = `
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px; align-items:center;">
            <span class="admin-rep-pill-status ${curStatus}">${statusText}</span>
            <span class="admin-rep-pill-type">${profileText(report.reportType || 'Diğer')}</span>
            <span class="admin-rep-pill-meta">${report.grade ? profileText(report.grade) + '. Sınıf' : ''} ${report.unit ? '· Ünite ' + profileText(report.unit) : ''}</span>
            <span class="admin-rep-pill-version" title="İçerik Sürümü">${versionText}</span>
            ${appVerText ? `<span style="font-size:0.75rem; color:#94a3b8; padding:2px 8px; border-radius:4px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);">${appVerText}</span>` : ''}
            ${displayedQuestionId ? `<span style="font-size:0.75rem; font-family:monospace; color:#38bdf8; margin-left:auto;">${displayedQuestionId.startsWith('Havuz Konumu') ? profileText(displayedQuestionId) : 'ID: ' + profileText(displayedQuestionId)}</span>` : ''}
        </div>

        ${poolNoticeHtml}

        <div style="background: rgba(15,23,42,0.9); border: 1px solid rgba(148,163,184,0.3); border-radius: 10px; padding: 14px; margin-bottom: 14px;">
            <strong style="color: #38bdf8; display: block; margin-bottom: 6px;"><i class="fas fa-file-lines"></i> Soru Metni:</strong>
            <p style="margin: 0; white-space: pre-wrap; font-size: 1rem; color: #f8fafc;">${profileText(questionStemToDisplay || 'Metin yok')}</p>
            ${(report.questionText && report.questionText.trim() !== questionStemToDisplay.trim()) ? `
            <div style="margin-top:8px; padding-top:6px; border-top:1px dashed rgba(255,255,255,0.15); font-size:0.82rem; color:#94a3b8;">
                <strong style="color:#cbd5e1;"><i class="fas fa-history"></i> Bildirim Anındaki Metin:</strong> <span>${profileText(report.questionText)}</span>
            </div>` : ''}
            ${optsHtml}
            ${hintToDisplay ? `<div style="margin-top:10px; color:#f59e0b; font-size:0.85rem;"><i class="fas fa-lightbulb"></i> <strong>Açıklama / İpucu:</strong> ${profileText(hintToDisplay)}</div>` : ''}
        </div>

        <div style="background: rgba(30,41,59,0.7); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px; margin-bottom: 12px;">
            <strong style="color: #ef4444; display: block; margin-bottom: 4px;"><i class="fas fa-comment-dots"></i> Öğrencinin Bildirdiği Sorun:</strong>
            <p style="margin: 0; color: #e2e8f0;">${report.description ? profileText(report.description) : '<em>Açıklama belirtilmedi.</em>'}</p>
        </div>

        <div style="background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.3); border-radius: 10px; padding: 12px;">
            <strong style="color: #38bdf8; display: block; margin-bottom: 4px;"><i class="fas fa-clipboard-check"></i> Yönetici İnceleme Notu:</strong>
            <p style="margin: 0; color: #e2e8f0;">${report.adminNotes ? profileText(report.adminNotes) : '<em>Henüz bir inceleme notu eklenmedi.</em>'}</p>
        </div>
    `;
    showModal(modal);
}

function getFilteredReportsForExport() {
    return allAdminReports.filter(r => {
        const status = r.status || 'yeni';
        const grade = String(r.grade || '');
        const matchStatus = adminReportStatusFilter === 'all' || status === adminReportStatusFilter;
        const matchGrade = adminReportGradeFilter === 'all' || grade === adminReportGradeFilter;
        return matchStatus && matchGrade;
    });
}

function exportReportsJSON() {
    const list = getFilteredReportsForExport();
    if (list.length === 0) return alert('Dışa aktarılacak bildirim bulunamadı.');

    // KİŞİSEL BİLGİLERDEN (PII: reporterId, reporterName, email, uid) TAMAMEN ARINDIRILMIŞ
    // VE SERBEST METİNLER OTOMATİK PII FİLTRESİNDEN GEÇİRİLMİŞ DIŞA AKTARIM
    const sanitized = list.map(r => ({
        id: r.id,
        grade: r.grade || null,
        unit: r.unit || null,
        learningOutcome: r.learningOutcome || null,
        module: r.module || null,
        contentVersion: r.contentVersion ? String(r.contentVersion) : 'Sürüm bilinmiyor',
        appVersion: r.appVersion || null,
        reportType: r.reportType || null,
        description: maskPII(r.description || ''),
        status: r.status || 'yeni',
        adminNotes: maskPII(r.adminNotes || ''),
        reportedAt: r.reportedAt || null,
        questionSource: (r.answerOptions && r.answerOptions.length > 0) ? 'snapshot' : (r.questionId ? 'pool_or_legacy' : 'unknown'),
        question: {
            id: r.questionId || null,
            stem: r.questionText || '',
            answerOptions: Array.isArray(r.answerOptions) ? r.answerOptions.map(o => ({ text: o.text, isCorrect: !!o.isCorrect })) : [],
            hint: r.hint || '',
            difficulty: r.difficulty || 1
        }
    }));

    const exportPayload = {
        metadata: {
            title: "FenUp X Soru Bildirimleri Dışa Aktarımı",
            exportedAt: new Date().toISOString(),
            totalReports: sanitized.length,
            privacyNotice: "Bu dışa aktarım kişisel kimlik bilgilerinden (PII: öğrenci adı, e-posta, UID) arındırılmıştır. Serbest metin alanları (açıklama ve yönetici notu) otomatik PII maskeleme filtresinden geçirilmiştir."
        },
        reports: sanitized
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fenupx-soru-bildirimleri-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function exportReportsText() {
    const list = getFilteredReportsForExport();
    if (list.length === 0) return alert('Dışa aktarılacak bildirim bulunamadı.');

    let txt = `================================================================================\n`;
    txt += `FENUP X — SORU BİLDİRİM RAPORU (Gizlilik Korumalı / PII Filtreli)\n`;
    txt += `Oluşturulma Tarihi: ${new Date().toLocaleDateString('tr-TR')} ${new Date().toLocaleTimeString('tr-TR')}\n`;
    txt += `Toplam Bildirim Sayısı: ${list.length}\n`;
    txt += `Gizlilik Bildirimi: Bu rapor öğrenci kimlik bilgileri (ad, e-posta, UID) çıkarılarak ve\n`;
    txt += `serbest metin alanları otomatik PII filtresinden geçirilerek üretilmiştir.\n`;
    txt += `================================================================================\n\n`;

    list.forEach((r, idx) => {
        const verStr = r.contentVersion ? ('v' + r.contentVersion) : 'Sürüm bilinmiyor';
        const hasSnapshot = Array.isArray(r.answerOptions) && r.answerOptions.length > 0;
        const sourceNotice = hasSnapshot ? 'Bildirim Anındaki Kayıt (Snapshot)' : 'Eski Kayıt / Güncel Havuz Eşleşmesi';

        txt += `--------------------------------------------------------------------------------\n`;
        txt += `[BİLDİRİM #${idx + 1}] ID: ${r.id}\n`;
        txt += `Durum: ${(r.status || 'yeni').toUpperCase()} | Tür: ${r.reportType || 'Diğer'}\n`;
        txt += `Sınıf: ${r.grade || '—'}. Sınıf | Ünite: ${r.unit || '—'} | Kazanım: ${r.learningOutcome || '—'}\n`;
        txt += `İçerik Sürümü: ${verStr} | Modül: ${r.module || 'Genel'}\n`;
        txt += `Bildirim Tarihi: ${r.reportedAt || '—'}\n`;
        txt += `Kayıt Türü: ${sourceNotice}\n`;
        txt += `Öğrenci Açıklaması:\n  ${maskPII(r.description || 'Açıklama belirtilmedi').replace(/\n/g, '\n  ')}\n`;
        if (r.adminNotes) {
            txt += `Yönetici İnceleme Notu:\n  ${maskPII(r.adminNotes).replace(/\n/g, '\n  ')}\n`;
        }
        txt += `\n--- Soru ve Seçenekler ---\n`;
        txt += `Soru ID: ${r.questionId || 'Belirtilmemiş'}\n`;
        txt += `Soru: ${r.questionText || '—'}\n`;
        if (hasSnapshot) {
            txt += `Seçenekler:\n`;
            r.answerOptions.forEach((opt, i) => {
                const letter = String.fromCharCode(65 + i);
                txt += `  [${letter}] ${opt.text || ''}${opt.isCorrect ? '  <-- [DOĞRU CEVAP]' : ''}\n`;
            });
        } else {
            txt += `Seçenekler: Seçenek verisi raporda kaydedilmemiş (Eski kayıt).\n`;
        }
        if (r.hint) {
            txt += `İpucu / Açıklama: ${r.hint}\n`;
        }
        txt += `\n`;
    });

    txt += `================================================================================\n`;
    txt += `Rapor Sonu — FenUp X Eğitim Platformu\n`;

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fenupx-soru-bildirimleri-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Filtre butonları dinleyicileri
document.querySelectorAll('#admin-rep-status-filters .admin-rep-status-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('#admin-rep-status-filters .admin-rep-status-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        adminReportStatusFilter = btn.dataset.status || 'all';
        renderAdminReports();
    };
});

document.querySelectorAll('#admin-rep-grade-filters .admin-rep-grade-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('#admin-rep-grade-filters .admin-rep-grade-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        adminReportGradeFilter = btn.dataset.grade || 'all';
        renderAdminReports();
    };
});

document.getElementById('btn-export-reports-json')?.addEventListener('click', exportReportsJSON);
document.getElementById('btn-export-reports-txt')?.addEventListener('click', exportReportsText);
document.getElementById('btn-refresh-reports')?.addEventListener('click', () => loadAdminReports(true));

const btnCloseRepDetail = document.getElementById('btn-close-report-detail');
const repDetailModal = document.getElementById('admin-report-detail-modal');
if (btnCloseRepDetail && repDetailModal) {
    btnCloseRepDetail.onclick = () => hideModal(repDetailModal);
    repDetailModal.onclick = (e) => {
        if (e.target === repDetailModal) hideModal(repDetailModal);
    };
}

if (typeof window !== 'undefined') {
    window.loadAdminReports = loadAdminReports;
    window.renderAdminReports = renderAdminReports;
    window.exportReportsJSON = exportReportsJSON;
    window.exportReportsText = exportReportsText;
    window.openReportModal = openReportModal;
    window.openReportDetailModal = openReportDetailModal;
    window.maskPII = maskPII;
    window.findPoolMatch = findPoolMatch;
    Object.defineProperty(window, 'allAdminReports', {
        get() { return allAdminReports; },
        set(val) { allAdminReports = val; },
        configurable: true
    });
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
            seasonNote.innerHTML = "* Puanlar kazanıldığı sınıf ve eğitim yılında korunur; yeni yılın tablosu ayrı tutulur.";
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
    const gradePrefix = selectedGrade ? `${selectedGrade}. Sınıf ` : '';
    if(lbTitle) lbTitle.innerHTML = `<i class="fas fa-trophy"></i> ${gradePrefix}Şampiyonlar Ligi`;

    const userMap = new Map();
    const year = competitionYear();
    const field = type === 'weekly' ? 'weeklyScore' : type === 'monthly' ? 'monthlyScore' : 'score';
    let cohortFailed = false;
    let legacyFailed = false;

    // 1. Güncel cohort liderlik tablosu verilerini getir (Firebase Firestore)
    if (COMPETITION_BACKEND_READY) {
        try {
            const path = `leaderboards/${year}/grades/${selectedGrade}/entries`;
            const snap = await getDocs(query(collection(db, path), orderBy(field, 'desc'), limit(50)));
            const now = new Date();
            const periods = competitionPeriods(now);
            snap.forEach(item => {
                const data = item.data();
                if (data.schoolYear !== year || data.grade !== String(selectedGrade) || data.isBanned) return;
                if (type === 'weekly' && data.weekId !== periods.weekId) return;
                if (type === 'monthly' && data.monthId !== periods.monthId) return;
                const score = Number(data[field]) || 0;
                if (score > 0) {
                    const uidKey = data.uid || item.id;
                    const normNick = (data.nickname || '').trim().toLowerCase();
                    const mapKey = normNick || uidKey;
                    userMap.set(mapKey, {
                        ...data,
                        uid: uidKey,
                        nickname: data.nickname || '',
                        avatar: data.avatar || '',
                        cohortScore: score,
                        legacyScore: 0,
                        displayScore: score
                    });
                }
            });
        } catch (e) {
            console.warn('Cohort verisi yüklenirken uyarı:', e);
            cohortFailed = true;
        }
    }

    // 2. Her 3 sekme için de (weekly, monthly, alltime) legacy skorları çek ve birleştir
    try {
        const legRes = await competitionCall('legacyLeaderboard', { grade: String(selectedGrade || '7'), type }).catch(() => {
            legacyFailed = true;
            return null;
        });
        if (legRes === null) {
            legacyFailed = true;
        } else {
            const legacyUsers = legRes?.users || [];
            legacyUsers.forEach(lu => {
                const legScore = Number(lu.displayScore) || 0;
                if (legScore <= 0) return;
                const normNick = (lu.nickname || '').trim().toLowerCase();
                const mapKey = normNick || lu.uid || lu.id;
                if (mapKey && userMap.has(mapKey)) {
                    const existing = userMap.get(mapKey);
                    existing.legacyScore = legScore;
                    // Haftalık, aylık ve alltime: Geçiş öncesi legacy puanı ile geçiş sonrası cohort puanı ayrı kazanımlardır, toplanır.
                    existing.displayScore = (existing.cohortScore || 0) + legScore;
                    if (!existing.avatar && lu.avatar) existing.avatar = lu.avatar;
                } else if (mapKey) {
                    userMap.set(mapKey, {
                        ...lu,
                        nickname: lu.nickname || '',
                        avatar: lu.avatar || '',
                        cohortScore: 0,
                        legacyScore: legScore,
                        displayScore: legScore
                    });
                }
            });
        }
    } catch (e) {
        console.warn('Geçmiş liderlik verisi yüklenirken uyarı:', e);
        legacyFailed = true;
    }

    const isPartialSync = cohortFailed || legacyFailed;
    const mergedUsers = Array.from(userMap.values());
    mergedUsers.sort((a, b) => b.displayScore - a.displayScore);
    renderGlobalLeaderboard(mergedUsers, type, isPartialSync);

    // Kullanıcının kendi sınıfındaki sırası
    const rankArea = document.getElementById('lb-user-rank');
    const rankText = document.getElementById('lb-user-rank-text');
    if (auth.currentUser) {
        const myUid = auth.currentUser.uid;
        const myNick = (loadedProfile?.nickname || auth.currentUser.displayName || '').trim().toLowerCase();
        const myIndex = mergedUsers.findIndex(u => (u.uid && u.uid === myUid) || (myNick && (u.nickname || '').trim().toLowerCase() === myNick));
        if (isPartialSync && rankArea && rankText) {
            rankArea.classList.remove('is-hidden');
            rankText.innerHTML = `<i class="fas fa-sync fa-spin"></i> ${selectedGrade}. Sınıf Sıran: Sıralama güncelleniyor (Bağlantı bekleniyor)`;
        } else if (myIndex >= 0 && mergedUsers[myIndex].displayScore > 0 && rankArea && rankText) {
            rankArea.classList.remove('is-hidden');
            rankText.innerHTML = `<i class="fas fa-medal"></i> ${selectedGrade}. Sınıf Sıran: ${myIndex + 1}. | Puanın: ${formatScore(mergedUsers[myIndex].displayScore)}`;
        } else if (rankArea && rankText) {
            rankArea.classList.remove('is-hidden');
            rankText.innerHTML = `<i class="fas fa-medal"></i> ${selectedGrade}. Sınıf Sıran: Henüz sıralama oluşmadı`;
        }
    } else if (rankArea) {
        rankArea.classList.add('is-hidden');
    }
}

function renderGlobalLeaderboard(users, type, isPartialSync = false) {
    if(!lbListEl) return;
    lbListEl.innerHTML = '';
    
    if (isPartialSync) {
        const warnEl = document.createElement('div');
        warnEl.className = 'lb-sync-warning';
        warnEl.style.cssText = 'background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 8px; padding: 8px 12px; margin-bottom: 10px; font-size: 0.82rem; color: #f59e0b; display: flex; align-items: center; gap: 8px;';
        warnEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Puan kaynaklarından birine ulaşılamadı. Sıralama geçici olarak eksik görüntülenebilir.</span>';
        lbListEl.appendChild(warnEl);
    }
    
    if (users.length === 0) {
        lbListEl.innerHTML = '<div class="lb-empty-notice" style="color:#aaa; text-align:center; margin-top:20px; padding:12px;"><p style="margin:0 0 6px 0;">Henüz bu kategoride yarışmacı yok.</p></div>';
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
            <img src="${profileText(avatarUrl(u.avatar))}" class="global-lb-avatar" alt="Avatar">
            <div class="global-lb-info">
                <h4 class="${nameClass}">${badgeStr}${profileText(u.nickname || 'Kozmik Kaptan')}</h4>
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
        
        <textarea id="report-desc" class="fenupx-input" placeholder="Eklemek istediğiniz bir detay var mı? (En fazla 500 karakter)" rows="3" maxlength="500" style="resize: none; margin-bottom: 2px;"></textarea>
        <div id="report-char-count" style="text-align: right; font-size: 0.75rem; color: #94a3b8; margin-bottom: 10px;">0 / 500</div>
        
        <button id="btn-submit-report" class="f-btn" style="background: linear-gradient(45deg, #ef4444, #b91c1c); color: #fff; width: 100%; margin-top: 5px; box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);">BİLDİRİMİ GÖNDER</button>
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

const reportDescInput = document.getElementById('report-desc');
const reportCharCount = document.getElementById('report-char-count');
if(reportDescInput && reportCharCount) {
    reportDescInput.oninput = () => {
        reportCharCount.textContent = `${reportDescInput.value.length} / 500`;
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
    if(reportCharCount) reportCharCount.textContent = "0 / 500";
}

const btnSubmitReport = document.getElementById('btn-submit-report');
if(btnSubmitReport) {
    btnSubmitReport.onclick = async () => {
        if(!currentReportedQuestion || btnSubmitReport.disabled) return;
        
        btnSubmitReport.disabled = true;
        btnSubmitReport.textContent = "Gönderiliyor...";
        btnSubmitReport.style.opacity = "0.7";

        const selectedRadio = document.querySelector('input[name="reportType"]:checked');
        const selectedType = selectedRadio ? selectedRadio.value : "diger";
        const descInput = document.getElementById('report-desc');
        const description = descInput ? descInput.value.trim().slice(0, 500) : "";
        
        const user = auth.currentUser;
        const reporterId = user ? user.uid : "Misafir";
        const reporterName = currentActivePlayerName || (user ? (loadedProfile?.nickname || loadedProfile?.name || 'Kozmik Kaptan') : "Misafir");

        const qText = currentReportedQuestion.question || currentReportedQuestion.stem || currentReportedQuestion.prompt || '';
        const qGrade = String(currentReportedQuestion.grade || selectedGrade || '');
        const qUnit = String(currentReportedQuestion.unit !== undefined ? currentReportedQuestion.unit : (selectedUnit || ''));
        const qOutcome = String(currentReportedQuestion.outcome || currentReportedQuestion.kazanim || currentReportedQuestion.outcome_id || currentReportedQuestion.learningOutcome || '');
        const qDiff = currentReportedQuestion.difficulty || 1;
        const qOpts = Array.isArray(currentReportedQuestion.answerOptions) ? currentReportedQuestion.answerOptions : [];
        const qHint = currentReportedQuestion.hint || '';
        function hashString(str) {
            if (!str || typeof str !== 'string') return 0;
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                hash = ((hash << 5) - hash) + str.charCodeAt(i);
                hash |= 0;
            }
            return hash;
        }

        const qId = currentReportedQuestion.id || (qGrade && qUnit ? `sl-g${qGrade}-u${qUnit}-q${Math.abs(hashString(qText)) % 10000 || 'gen'}` : null);
        const qModule = (typeof tState !== 'undefined' && tState && !tState.isSolo) ? 'Şampiyonlar Ligi' : 'Bireysel Çalışma';
        const qContentVersion = currentReportedQuestion.contentVersion || currentReportedQuestion.contentRevision || currentReportedQuestion.version || null;

        try {
            await addDoc(collection(db, "reported_questions"), {
                questionId: qId,
                module: qModule,
                grade: qGrade,
                unit: qUnit,
                learningOutcome: qOutcome,
                contentVersion: qContentVersion || null,
                appVersion: '8.9.8',
                questionText: qText,
                answerOptions: qOpts,
                hint: qHint,
                difficulty: qDiff,
                reportType: selectedType,
                description: description,
                reporterId: reporterId, // STRICTLY EXCLUDED FROM EXPORTS (PII-FREE)
                reporterName: reporterName, // STRICTLY EXCLUDED FROM EXPORTS (PII-FREE)
                reportedAt: new Date().toISOString(),
                status: "yeni",
                adminNotes: ""
            });
            
            alert("Bildiriminiz başarıyla iletildi. Katkınız için teşekkür ederiz!");
            if(descInput) descInput.value = "";
            if(reportCharCount) reportCharCount.textContent = "0 / 500";
            hideModal(reportModal);
            if(isGlobalPaused) toggleMasterPause();
        } catch (e) {
            console.error("Hata bildirimi gönderilemedi:", e);
            alert("Bildirim gönderilemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin.");
            // Modal remains open so user does not lose input
        } finally {
            btnSubmitReport.disabled = false;
            btnSubmitReport.textContent = "BİLDİRİMİ GÖNDER";
            btnSubmitReport.style.opacity = "1";
        }
    };
}

// V8.9.0: İlk yüklemede Günlük Seri ve Rozetleri Senkronize Et
try {
    updateStreakUI();
    evaluateBadges();
    renderBadgesShowcase();
    renderKarneSummary();
    renderCalismalarim();
} catch (_) {}

// ==========================================================================
// V8.9.1: KÜRESEL AKILLI TAHTA (ETAP) TAM EKRAN ÇİZİM TAHTASI MODÜLÜ
// ==========================================================================
let globalSmartboardState = {
    isOpen: false,
    isFullscreen: false,
    mode: 'white',
    color: '#2d3436',
    size: 4,
    isEraser: false,
    isDrawing: false,
    lastX: 0,
    lastY: 0
};

export function toggleGlobalSmartboard(forceOpen) {
    const modal = document.getElementById('smartboard-modal');
    const floatBtn = document.getElementById('floating-smartboard-btn');
    if (!modal) return;

    const shouldOpen = (typeof forceOpen === 'boolean') 
        ? forceOpen 
        : (modal.classList.contains('is-hidden') || modal.style.display === 'none');

    if (shouldOpen) {
        modal.classList.remove('is-hidden');
        modal.style.display = 'flex';
        globalSmartboardState.isOpen = true;
        if (floatBtn) floatBtn.classList.add('active');
        resizeGlobalSmartboardCanvas();
    } else {
        modal.classList.add('is-hidden');
        modal.style.display = 'none';
        globalSmartboardState.isOpen = false;
        if (floatBtn) floatBtn.classList.remove('active');
    }
}

export function openSmartboard() { toggleGlobalSmartboard(true); }
export function closeSmartboard() { toggleGlobalSmartboard(false); }

function resizeGlobalSmartboardCanvas() {
    const canvas = document.getElementById('smartboard-canvas');
    if (!canvas) return;
    const container = document.getElementById('sb-canvas-container');
    if (!container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newWidth = container.clientWidth || 850;
    const newHeight = container.clientHeight || 450;

    let tempCanvas = null;
    if (canvas.width > 0 && canvas.height > 0) {
        tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tCtx = tempCanvas.getContext('2d');
        if (tCtx) tCtx.drawImage(canvas, 0, 0);
    }

    canvas.width = newWidth;
    canvas.height = newHeight;

    const bg = globalSmartboardState.mode === 'dark' ? '#1e293b' : '#ffffff';
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (tempCanvas) {
        ctx.drawImage(tempCanvas, 0, 0);
    }
}

function updateSmartboardPalette() {
    const palette = document.getElementById('sb-color-palette');
    if (!palette) return;

    const isWhite = globalSmartboardState.mode === 'white';
    const colors = isWhite 
        ? [
            { color: '#2d3436', title: 'Siyah' },
            { color: '#e74c3c', title: 'Kırmızı' },
            { color: '#0984e3', title: 'Mavi' },
            { color: 'rgba(253, 203, 110, 0.7)', title: 'Floresan Fosforlu Sarı' }
          ]
        : [
            { color: '#ffffff', title: 'Beyaz' },
            { color: '#facc15', title: 'Neon Sarı' },
            { color: '#38bdf8', title: 'Neon Mavi' },
            { color: 'rgba(74, 222, 128, 0.7)', title: 'Neon Fosforlu Yeşil' }
          ];

    globalSmartboardState.color = colors[0].color;
    globalSmartboardState.isEraser = false;

    palette.innerHTML = `
        <span class="sb-group-label"><i class="fas fa-palette"></i> Renk:</span>
        ${colors.map((c, i) => `
            <button type="button" class="sb-color-btn ${i === 0 ? 'active' : ''}" data-color="${c.color}" style="background:${c.color};" title="${c.title}"></button>
        `).join('')}
    `;

    palette.querySelectorAll('.sb-color-btn').forEach(btn => {
        btn.onclick = () => {
            palette.querySelectorAll('.sb-color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            globalSmartboardState.color = btn.dataset.color;
            globalSmartboardState.isEraser = false;
            const eraserBtn = document.getElementById('sb-btn-eraser');
            if (eraserBtn) eraserBtn.classList.remove('active');
        };
    });
}

export function initGlobalSmartboard() {
    const floatBtn = document.getElementById('floating-smartboard-btn');
    const modal = document.getElementById('smartboard-modal');
    const canvas = document.getElementById('smartboard-canvas');
    if (!modal || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (floatBtn) {
        floatBtn.onclick = (e) => {
            e.preventDefault();
            toggleGlobalSmartboard();
        };
    }

    const closeBtn = document.getElementById('sb-btn-close');
    if (closeBtn) {
        closeBtn.onclick = () => toggleGlobalSmartboard(false);
    }

    modal.onclick = (e) => {
        if (e.target === modal) toggleGlobalSmartboard(false);
    };

    const container = document.getElementById('sb-canvas-container');

    // Tahta Modu Değiştiricileri (Beyaz / Koyu)
    const btnWhite = document.getElementById('sb-mode-white');
    const btnDark = document.getElementById('sb-mode-dark');

    if (btnWhite && btnDark) {
        btnWhite.onclick = () => {
            if (globalSmartboardState.mode === 'white') return;
            globalSmartboardState.mode = 'white';
            btnWhite.classList.add('active');
            btnDark.classList.remove('active');
            if (container) {
                container.classList.remove('mode-dark');
                container.classList.add('mode-white');
            }
            updateSmartboardPalette();
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        btnDark.onclick = () => {
            if (globalSmartboardState.mode === 'dark') return;
            globalSmartboardState.mode = 'dark';
            btnDark.classList.add('active');
            btnWhite.classList.remove('active');
            if (container) {
                container.classList.remove('mode-white');
                container.classList.add('mode-dark');
            }
            updateSmartboardPalette();
            ctx.fillStyle = '#1e293b';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };
    }

    // Tam Ekran Butonu
    const btnFs = document.getElementById('sb-btn-fullscreen');
    const dialog = modal.querySelector('.smartboard-dialog');
    if (btnFs && dialog) {
        btnFs.onclick = () => {
            globalSmartboardState.isFullscreen = !globalSmartboardState.isFullscreen;
            dialog.classList.toggle('is-fullscreen', globalSmartboardState.isFullscreen);
            btnFs.innerHTML = globalSmartboardState.isFullscreen 
                ? '<i class="fas fa-compress"></i> <span>Normal Ekran</span>' 
                : '<i class="fas fa-expand"></i> <span>Tam Ekran</span>';
            setTimeout(resizeGlobalSmartboardCanvas, 50);
        };
    }

    // Kalem Boyutları
    const sizeBtns = modal.querySelectorAll('.sb-size-btn');
    sizeBtns.forEach(btn => {
        btn.onclick = () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            globalSmartboardState.size = parseInt(btn.dataset.size || '4', 10);
            globalSmartboardState.isEraser = false;
            const eraserBtn = document.getElementById('sb-btn-eraser');
            if (eraserBtn) eraserBtn.classList.remove('active');
        };
    });

    // Silgi Butonu
    const eraserBtn = document.getElementById('sb-btn-eraser');
    if (eraserBtn) {
        eraserBtn.onclick = () => {
            globalSmartboardState.isEraser = !globalSmartboardState.isEraser;
            eraserBtn.classList.toggle('active', globalSmartboardState.isEraser);
            if (globalSmartboardState.isEraser) {
                modal.querySelectorAll('.sb-color-btn').forEach(b => b.classList.remove('active'));
            } else {
                updateSmartboardPalette();
            }
        };
    }

    // Temizle Butonu
    const clearBtn = document.getElementById('sb-btn-clear');
    if (clearBtn) {
        clearBtn.onclick = () => {
            const bg = globalSmartboardState.mode === 'dark' ? '#1e293b' : '#ffffff';
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };
    }

    // Çizim Dinleyicileri (Touch & Mouse with e.preventDefault & touch-action: none)
    function getPointerPos(evt) {
        const rect = canvas.getBoundingClientRect();
        let clientX = evt.clientX;
        let clientY = evt.clientY;

        if (evt.touches && evt.touches.length > 0) {
            clientX = evt.touches[0].clientX;
            clientY = evt.touches[0].clientY;
        } else if (evt.changedTouches && evt.changedTouches.length > 0) {
            clientX = evt.changedTouches[0].clientX;
            clientY = evt.changedTouches[0].clientY;
        }

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    function startDraw(e) {
        if (e.cancelable) e.preventDefault();
        globalSmartboardState.isDrawing = true;
        const pos = getPointerPos(e);
        globalSmartboardState.lastX = pos.x;
        globalSmartboardState.lastY = pos.y;
    }

    function moveDraw(e) {
        if (!globalSmartboardState.isDrawing) return;
        if (e.cancelable) e.preventDefault();

        const pos = getPointerPos(e);
        ctx.beginPath();
        ctx.moveTo(globalSmartboardState.lastX, globalSmartboardState.lastY);
        ctx.lineTo(pos.x, pos.y);

        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (globalSmartboardState.isEraser) {
            ctx.strokeStyle = globalSmartboardState.mode === 'dark' ? '#1e293b' : '#ffffff';
            ctx.lineWidth = Math.max(globalSmartboardState.size * 4, 20);
        } else {
            ctx.strokeStyle = globalSmartboardState.color;
            ctx.lineWidth = globalSmartboardState.size;
        }

        ctx.stroke();
        globalSmartboardState.lastX = pos.x;
        globalSmartboardState.lastY = pos.y;
    }

    function endDraw(e) {
        if (!globalSmartboardState.isDrawing) return;
        if (e && e.cancelable) e.preventDefault();
        globalSmartboardState.isDrawing = false;
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', moveDraw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseleave', endDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', moveDraw, { passive: false });
    canvas.addEventListener('touchend', endDraw, { passive: false });
    canvas.addEventListener('touchcancel', endDraw, { passive: false });

    window.addEventListener('resize', () => {
        if (globalSmartboardState.isOpen) {
            resizeGlobalSmartboardCanvas();
        }
    });

    if (container) container.classList.add('mode-white');
    updateSmartboardPalette();
    resizeGlobalSmartboardCanvas();
}

if (typeof window !== 'undefined') {
    window.toggleGlobalSmartboard = toggleGlobalSmartboard;
    window.openSmartboard = openSmartboard;
    window.closeSmartboard = closeSmartboard;
    window.checkAnnualPromotion = checkAnnualPromotion;
    window.renderGlobalLeaderboard = renderGlobalLeaderboard;
    window.loadGlobalLeaderboard = loadGlobalLeaderboard;
    window.BADGE_FAMILIES = BADGE_FAMILIES;
    window.getBadgeFamilyProgress = getBadgeFamilyProgress;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalSmartboard);
} else {
    initGlobalSmartboard();
}

// Close drawing surfaces when entering a compact phone layout; preserve their pixels.
const compactDrawingLayout = window.matchMedia('(max-width: 600px), (max-width: 900px) and (max-height: 520px)');
function syncDrawingLayout() {
    if (!compactDrawingLayout.matches) return;
    toggleGlobalSmartboard(false);
    globalSmartboardState.isDrawing = false;
    window.toggleScratchpad?.(false);
    const focused = document.activeElement;
    if (focused?.closest('#scratchpad-container, #smartboard-modal')) focused.blur();
}
compactDrawingLayout.addEventListener('change', syncDrawingLayout);
syncDrawingLayout();
