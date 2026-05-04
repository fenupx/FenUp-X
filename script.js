import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, deleteUser } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, orderBy, limit, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

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
const storage = getStorage(app);
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
        border-radius: 15px; backdrop-filter: blur(10px); z-index: 1000;
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
    .profile-img-header { width: 35px; height: 35px; border-radius: 50%; vertical-align: middle; margin-right: 8px; border: 1px solid #00d2ff; }
    .btn-danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; margin-top: 15px; }
    .btn-danger:hover { background: #ef4444; color: #fff; }
    
    .info-container { position: relative; display: flex; align-items: center; width: 100%; margin-bottom: 15px; }
    .info-icon { position: absolute; right: 15px; color: #f59e0b; font-size: 1.2rem; cursor: help; z-index: 5; }
    .tooltiptext {
        visibility: hidden; width: 250px; background-color: rgba(0,0,0,0.95); color: #f59e0b; text-align: left;
        border-radius: 10px; padding: 12px; position: absolute; z-index: 100; bottom: 120%; right: 0;
        font-size: 0.9rem; border: 1px solid #f59e0b; box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
        opacity: 0; transition: opacity 0.3s; pointer-events: none;
    }
    .info-icon:hover ~ .tooltiptext { visibility: visible; opacity: 1; }
    .tooltiptext.active { visibility: visible !important; opacity: 1 !important; pointer-events: auto; }

    .password-container { position: relative; width: 100%; margin-bottom: 15px; }
    .password-container input { margin-bottom: 0 !important; width: 100%; padding-right: 45px; }
    .toggle-pass-icon { position: absolute; right: 15px; top: 16px; color: #aaa; cursor: pointer; font-size: 1.2rem; transition: 0.3s; z-index: 5;}
    .toggle-pass-icon:hover { color: #00d2ff; }

    #auth-modal .auth-tab-btn[data-target="teacher-auth"] {
        display: none !important;
    }
    
    .btn-edit-nick { background: rgba(0, 210, 255, 0.2); color: #00d2ff; border: 1px solid #00d2ff; padding: 8px 15px; border-radius: 10px; cursor: pointer; transition: 0.3s; font-weight: bold; }
    .btn-edit-nick:hover { background: #00d2ff; color: #000; box-shadow: 0 0 15px #00d2ff; }
    
    .btn-report-bug { position: relative; margin-top: 25px; display: inline-flex; justify-content: center; align-items: center; gap: 8px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.5); color: #ef4444; padding: 8px 20px; border-radius: 20px; font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: 0.3s; z-index: 40; margin-bottom: 10px; }
    .btn-report-bug:hover { background: #ef4444; color: #fff; box-shadow: 0 0 15px rgba(239, 68, 68, 0.6); transform: translateY(-3px);}
    
    .report-options { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; text-align: left; }
    .report-radio-label { display: flex; align-items: center; gap: 10px; color: #ddd; cursor: pointer; font-size: 1.1rem; padding: 10px; background: rgba(0,0,0,0.5); border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); transition: 0.2s;}
    .report-radio-label:hover { background: rgba(255,255,255,0.1); }
    .report-radio-label input[type="radio"] { accent-color: #ef4444; width: 18px; height: 18px; cursor: pointer;}
`;
document.head.appendChild(styleEnjektor);

const kozmikAvatarlar = [
    {id: 'k1', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Efe&baseColor=f9c9b6&hair=mrT&facialHairProbability=0'},
    {id: 'k2', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Ali&baseColor=f9c9b6&hair=dougFunny&glassesProbability=100'},
    {id: 'k3', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Can&baseColor=f9c9b6&hair=dannyPhantom'},
    {id: 'k4', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Mert&baseColor=f9c9b6&hair=fonze'},
    {id: 'k5', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Burak&baseColor=f9c9b6&hair=mrT&glassesProbability=100'},
    {id: 'k6', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Emre&baseColor=f9c9b6&hair=dannyPhantom&glassesProbability=100'},
    {id: 'k7', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Ayse&baseColor=f9c9b6&hair=pigtails'},
    {id: 'k8', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Zeynep&baseColor=f9c9b6&hair=curly'},
    {id: 'k9', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Elif&baseColor=f9c9b6&hair=pixie&glassesProbability=100'},
    {id: 'k10', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Derya&baseColor=f9c9b6&hair=pigtails&glassesProbability=100'},
    {id: 'k11', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Ece&baseColor=f9c9b6&hair=curly&glassesProbability=100'},
    {id: 'k12', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Naz&baseColor=f9c9b6&hair=pixie'},
    {id: 'h1', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056044.png'}, 
    {id: 'h2', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056012.png'},
    {id: 'h3', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056014.png'},
    {id: 'h4', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056003.png'},
    {id: 'h5', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056016.png'},
    {id: 'h6', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056038.png'},
    {id: 'a1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nico&hair=eyepatch'},
    {id: 'a2', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&hair=longHairMiaWallace&accessories=sunglasses'},
    {id: 'a3', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Stella&hair=longHairStraightStrand'},
    {id: 'a4', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo&hair=shortHairSides&accessories=prescription02'},
    {id: 'a5', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nova&hair=longHairCurly'},
    {id: 'a6', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orion&hair=shortHairFrizzle'},
    {id: 'b1', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Mars&colors=blue'},
    {id: 'b2', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Jupiter&colors=red'},
    {id: 'b3', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Saturn&colors=purple'},
    {id: 'b4', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Venus&colors=yellow'},
    {id: 'b5', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Neptune&colors=green'},
    {id: 'b6', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=Pluto&colors=orange'},
    {id: 'b7', url: 'https://cdn-icons-png.flaticon.com/512/4712/4712010.png'}, 
    {id: 'b8', url: 'https://cdn-icons-png.flaticon.com/512/4712/4712109.png'}, 
    {id: 'b9', url: 'https://cdn-icons-png.flaticon.com/512/4711/4711986.png'}, 
    {id: 'b10', url: 'https://cdn-icons-png.flaticon.com/512/4712/4712038.png'},
    {id: 'b11', url: 'https://cdn-icons-png.flaticon.com/512/4712/4712061.png'},
    {id: 'b12', url: 'https://cdn-icons-png.flaticon.com/512/4712/4712005.png'},
    {id: 'u1', url: 'https://cdn-icons-png.flaticon.com/512/2026/2026462.png'}, 
    {id: 'u2', url: 'https://cdn-icons-png.flaticon.com/512/9431/9431189.png'}, 
    {id: 'u3', url: 'https://cdn-icons-png.flaticon.com/512/3590/3590214.png'}, 
    {id: 'u4', url: 'https://cdn-icons-png.flaticon.com/512/1043/1043424.png'}, 
    {id: 'u5', url: 'https://cdn-icons-png.flaticon.com/512/2534/2534041.png'}, 
    {id: 'u6', url: 'https://cdn-icons-png.flaticon.com/512/2534/2534064.png'}, 
    {id: 'u7', url: 'https://cdn-icons-png.flaticon.com/512/2698/2698194.png'}, 
    {id: 'u8', url: 'https://cdn-icons-png.flaticon.com/512/3409/3409565.png'},
    {id: 'u9', url: 'https://cdn-icons-png.flaticon.com/512/2026/2026514.png'},
    {id: 'u10', url: 'https://cdn-icons-png.flaticon.com/512/2026/2026510.png'},
    {id: 'u11', url: 'https://cdn-icons-png.flaticon.com/512/2026/2026500.png'},
    {id: 'u12', url: 'https://cdn-icons-png.flaticon.com/512/2026/2026487.png'}
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

const fullScreenBtn = document.getElementById('fullscreen-btn');
if (fullScreenBtn) {
    fullScreenBtn.onclick = () => {
        let elem = document.documentElement;
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) { elem.requestFullscreen(); }
            else if (elem.msRequestFullscreen) { elem.msRequestFullscreen(); }
            else if (elem.mozRequestFullScreen) { elem.mozRequestFullScreen(); }
            else if (elem.webkitRequestFullscreen) { elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT); }
        } else {
            if (document.exitFullscreen) { document.exitFullscreen(); }
            else if (document.msExitFullscreen) { document.msExitFullscreen(); }
            else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
            else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
        }
    };
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
        stars = Array.from({length: 150}, () => ({
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

function switchScene(from, to) {
    if(!from || !to) return;
    from.classList.add('is-hidden');
    to.classList.remove('is-hidden');
    
    const isHome = (to.id === "scene-home");
    if (btnHakkimizda && btnIletisim) {
        btnHakkimizda.style.display = isHome ? "block" : "none";
        btnIletisim.style.display = isHome ? "block" : "none";
    }
    if(userProfileArea) {
        userProfileArea.style.display = isHome ? "inline-block" : "none";
    }
    if (mainFooter) mainFooter.classList.toggle('hidden-footer', !isHome);

    if (to.id === "scene-quiz" || to.id === "scene-tournament-quiz") {
        if (topControls) topControls.style.display = "flex";
    } else {
        if (topControls) topControls.style.display = "none";
        stopSound(sfx.bgm); 
    }

    if (to.id === "scene-unit") {
        const lbSide = document.getElementById('unit-leaderboard-side');
        if (activeMode === "bireysel") {
            if(lbSide) lbSide.classList.remove('is-hidden');
            loadGlobalLeaderboard('weekly');
        } else {
            if(lbSide) lbSide.classList.add('is-hidden');
        }
    }
}
if (topControls) topControls.style.display = "none"; 

// --- 4. MASTER PAUSE ---
let isGlobalPaused = false;

const pauseOverlay = document.createElement('div');
pauseOverlay.id = "master-pause-overlay";
pauseOverlay.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.95); z-index:10000; display:flex; justify-content:center; align-items:center; flex-direction:column; backdrop-filter:blur(10px);";
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

masterPauseBtn.onclick = toggleMasterPause;
const btnMasterResume = document.getElementById('btn-master-resume');
if(btnMasterResume) btnMasterResume.onclick = toggleMasterPause;

// --- 5. MENÜ YÖNLENDİRMELERİ ---
let activeMode = "", selectedGrade = null, selectedUnit = null;
let usedQuestions = []; 

const logoEl = document.querySelector('.logo');
if(logoEl) logoEl.onclick = () => location.reload();

if(btnHakkimizda) btnHakkimizda.onclick = () => switchScene(scenes.home, scenes.hakkimizda);
if(btnIletisim) btnIletisim.onclick = () => switchScene(scenes.home, scenes.iletisim);

const btnOyunModulu = document.getElementById('btn-oyun-modulu');
if(btnOyunModulu) btnOyunModulu.onclick = () => switchScene(scenes.home, scenes.crossroads);

const btnDeneyModulu = document.getElementById('btn-deney-modulu');
if(btnDeneyModulu) btnDeneyModulu.onclick = () => alert("İnteraktif Deney Modülü Çok Yakında!");

const btnModeBireysel = document.getElementById('btn-mode-bireysel');
if(btnModeBireysel) btnModeBireysel.onclick = () => { activeMode = "bireysel"; switchScene(scenes.crossroads, scenes.lobby); };

const btnModeTurnuva = document.getElementById('btn-mode-turnuva');
if(btnModeTurnuva) btnModeTurnuva.onclick = () => { activeMode = "turnuva"; initTournamentLobby(); switchScene(scenes.crossroads, scenes.tournamentLobby); };

document.querySelectorAll('.btn-back-home').forEach(btn => btn.onclick = () => switchScene(btn.closest('.scene'), scenes.home));
document.querySelectorAll('.btn-back-cross').forEach(btn => btn.onclick = () => switchScene(btn.closest('.scene'), scenes.crossroads));

const btnBackClass = document.getElementById('btn-back-class');
if(btnBackClass) btnBackClass.onclick = () => switchScene(scenes.unit, scenes.class);

const btnBackRules = document.getElementById('btn-back-rules');
if(btnBackRules) btnBackRules.onclick = () => switchScene(scenes.rules, scenes.unit);

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

const btnDirektBaslat = document.getElementById('btn-direkt-baslat');
if(btnDirektBaslat) {
    btnDirektBaslat.onclick = async () => { 
        const user = auth.currentUser;
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            let nick = "";
            if (userSnap.exists() && userSnap.data().nickname) {
                nick = userSnap.data().nickname;
            }
            isimSor(nick, (gelenIsim) => {
                if (!uygunIsimMi(gelenIsim) && gelenIsim !== "Misafir Yarışmacı") {
                    alert("Topluluk kurallarına aykırı bir isim girdiniz!");
                    return;
                }
                currentActivePlayerName = gelenIsim;
                switchScene(scenes.lobby, scenes.class);
            });
        } else {
            isimSor("", (gelenIsim) => {
                if (!uygunIsimMi(gelenIsim) && gelenIsim !== "Misafir Yarışmacı") {
                    alert("Topluluk kurallarına aykırı bir isim girdiniz!");
                    return;
                }
                currentActivePlayerName = gelenIsim;
                switchScene(scenes.lobby, scenes.class);
            });
        }
    };
}

document.querySelectorAll('.class-card').forEach(c => c.onclick = function() { 
    if(this.classList.contains('disabled')) return; 
    selectedGrade = this.dataset.grade; 
    switchScene(scenes.class, scenes.unit); 
});

document.querySelectorAll('.unit-card').forEach(u => u.onclick = function() {
    selectedUnit = this.dataset.unit;
    showRulesScreen();
});

function showRulesScreen() {
    switchScene(scenes.unit, scenes.rules);
    const content = document.getElementById('rules-content');
    if(!content) return;
    
    if (activeMode === "bireysel") {
        content.innerHTML = `
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 15px;"><i class="fas fa-bullseye" style="color:#22c55e; margin-right:10px; width: 25px;"></i> <b>Puanlama ve Süre:</b> Toplam 10 soru seni bekliyor. İlk 4 soru 100 puan (40 sn), 5-8. sorular 200 puan (50 sn), finaldeki son 2 soru ise 400 puan (60 sn) değerindedir.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-stopwatch" style="color:#00d2ff; margin-right:10px; width: 25px;"></i> <b>Hız Eşittir Puan:</b> Sadece doğru bilmek yetmez! Liderlik tablosuna girmek için soruları olabildiğince <b>hızlı</b> cevaplamalısın. Kalan her saniye ekstra 5 puan olarak hanene yazılır! Misafir veya üye fark etmeksizin herkes bu kurala tabidir.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-heart-crack" style="color:#ef4444; margin-right:10px; width: 25px;"></i> <b>Hata Affetmez:</b> Jokerlerin dışında, herhangi bir soruya yanlış cevap verdiğin veya süreyi geçirdiğin anda yarışmaya veda edersin.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-magic" style="color:#9d50bb; margin-right:10px; width: 25px;"></i> <b>Kurtarıcı Jokerler:</b> 50:50, İpucu ve Pas haklarını iyi değerlendir. 4. soruyu geçersen çok özel 'Zamanı Durdur' jokeri de aktifleşir.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-meteor" style="color:#f59e0b; margin-right:10px; width: 25px;"></i> <b>Kara Delik (9. ve 10. Sorular):</b> 8. soruyu başarıyla geçtikten sonra Kara Delik bölgesi başlar! Son iki zorlu soruda istersen o ana kadar topladığın puanı kasaya kilitleyip yarışmadan çekilebilirsin. "Riski alıyorum" deyip devam edersen ve yanlış yaparsan, Kara Delik puanının <b>yarısını</b> yutar ve elenirsin!</li>
            </ul>`;
    } else {
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

async function fetchQuestions(grade, unit) {
    try {
        const res = await fetch(`${grade}_sinif_sorular.json`); 
        const data = await res.json();
        const allPool = data.questions.filter(q => String(q.grade) === String(grade) && String(q.unit) === String(unit));
        
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
        
        let finalSet = [].concat(easy.slice(0, 4), mid.slice(0, 4), hard.slice(0, 2));
        
        if(finalSet.length < 10) { 
            const remaining = availablePool.filter(q => !finalSet.includes(q)).sort(() => Math.random() - 0.5); 
            finalSet = finalSet.concat(remaining.slice(0, 10 - finalSet.length)); 
        }

        finalSet.forEach(q => {
            for (let i = q.answerOptions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [q.answerOptions[i], q.answerOptions[j]] = [q.answerOptions[j], q.answerOptions[i]];
            }
        });

        usedQuestions.push(...finalSet);
        return finalSet;
    } catch(e) { return []; }
}

const quizState = { set: [], index: 0, score: 0, locked: false, timerInterval: null, totalTimeSpent: 0, riskAcceptedForCurrent: false, fullPool: [], currentTimeLeft: 0 };
let isTimerPaused = false;
function getSettings(idx) { return idx < 4 ? { time: 40, points: 100 } : idx < 8 ? { time: 50, points: 200 } : { time: 60, points: 400 }; }

async function startIndividual() {
    quizState.set = await fetchQuestions(selectedGrade, selectedUnit); if(quizState.set.length === 0) return;
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

                let updates = {
                    totalScore: (userData.totalScore || 0) + quizState.score,
                    [`totalScore${gradeSuffix}`]: (userData[`totalScore${gradeSuffix}`] || 0) + quizState.score
                };

                if (userData[`lastWeekId${gradeSuffix}`] === currentWeek) {
                    updates[`weeklyScore${gradeSuffix}`] = (userData[`weeklyScore${gradeSuffix}`] || 0) + quizState.score;
                } else {
                    updates[`weeklyScore${gradeSuffix}`] = quizState.score;
                    updates[`lastWeekId${gradeSuffix}`] = currentWeek;
                }

                if (userData[`lastMonthId${gradeSuffix}`] === currentMonth) {
                    updates[`monthlyScore${gradeSuffix}`] = (userData[`monthlyScore${gradeSuffix}`] || 0) + quizState.score;
                } else {
                    updates[`monthlyScore${gradeSuffix}`] = quizState.score;
                    updates[`lastMonthId${gradeSuffix}`] = currentMonth;
                }

                if (userData[`lastSeasonId${gradeSuffix}`] === currentSeason) {
                    updates[`seasonScore${gradeSuffix}`] = (userData[`seasonScore${gradeSuffix}`] || 0) + quizState.score;
                } else {
                    updates[`seasonScore${gradeSuffix}`] = quizState.score;
                    updates[`lastSeasonId${gradeSuffix}`] = currentSeason;
                }

                await updateDoc(userRef, updates);
            }
        } catch (e) { console.error("Puan kaydedilemedi:", e); }
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
            const newQ = availableSameDiff[Math.floor(Math.random() * availableSameDiff.length)]; 
            quizState.set[quizState.index] = newQ; 
            usedQuestions.push(newQ);
            
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
            card.className = `t-team-card ${t.isEliminated ? 'eliminated' : ''} ${t.isOnFire ? 'on-fire' : ''}`;
            card.id = `t-card-${t.id}`;
            card.innerHTML = `
                <h3>${t.name}</h3>
                <div class="t-score" id="t-score-${t.id}"></div>
                <div class="t-answers active" id="t-ans-group-${t.id}">
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
        btn.onclick = function() {
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
        
        const res = await fetch(`${selectedGrade}_sinif_sorular.json`); 
        const data = await res.json();
        let hardPool = data.questions.filter(q => String(q.grade) === String(selectedGrade) && String(q.unit) === String(selectedUnit) && String(q.difficulty) === "3" && !usedQuestions.some(uq => uq.question === q.question));
        
        if(hardPool.length === 0) {
            hardPool = data.questions.filter(q => String(q.grade) === String(selectedGrade) && String(q.unit) === String(selectedUnit) && String(q.difficulty) === "3");
            const lastQ = tState.questions[tState.index]; 
            hardPool = hardPool.filter(q => q.question !== lastQ.question); 
        }
        
        const duelQ = hardPool.length > 0 ? hardPool[Math.floor(Math.random() * hardPool.length)] : tState.questions[0]; 
        
        for (let i = duelQ.answerOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [duelQ.answerOptions[i], duelQ.answerOptions[j]] = [duelQ.answerOptions[j], duelQ.answerOptions[i]];
        }
        
        usedQuestions.push(duelQ); 
        
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
            card.className = "t-team-card"; card.id = `t-card-${t.id}`;
            card.innerHTML = `
                <h3>${t.name}</h3>
                <div class="t-answers active" id="t-ans-group-${t.id}">
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
        btn.onclick = function() {
            if (tState.locked || isGlobalPaused) return; 
            this.blur(); 
            const tid = parseInt(this.dataset.tid);
            const team = tState.tiedTeams.find(x => x.id === tid);
            if(team) evaluateDuel(team, this.dataset.opt, this);
        };
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

const policyModal = document.getElementById('policy-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const btnCloseModal = document.getElementById('btn-close-modal');

const policies = {
    kvkk: {
        title: "Gizlilik Politikası (KVKK)",
        content: `<p>FenUp X olarak kişisel verilerinizin güvenliğine büyük önem veriyoruz. 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, sitemizi ziyaretiniz sırasında elde edilen veriler aşağıda belirtilen şartlarda işlenmektedir.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">1. Toplanan Veriler</h3>
        <p>Şu aşamada sitemiz doğrudan kişisel veri (ad, soyad, TC kimlik numarası vb.) toplamamaktadır. Yarışma modülünde girilen "Kaptan Adı" veya "Grup İsmi" gibi bilgiler yalnızca o oturum (session) için tarayıcınızın belleğinde tutulur ve veritabanımıza kaydedilmez.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">2. Verilerin Kullanım Amacı</h3>
        <p>Sitemizin genel trafiğini ve kullanım alışkanlıklarını anlamak amacıyla toplanan anonim analitik veriler (sayfa görüntülenme sayısı vb.), platformun performansını ölçmek ve eğitim içeriklerimizi geliştirmek amacıyla kullanılır.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">3. Üçüncü Taraflarla Paylaşım</h3>
        <p>Toplanan hiçbir veri; reklam, pazarlama veya başka bir amaçla üçüncü kurum, kuruluş veya şahıslarla paylaşılmamaktadır.</p>`
    },
    terms: {
        title: "Kullanım Koşulları",
        content: `<p>FenUp X eğitim platformuna hoş geldiniz. Sitemizi kullanarak aşağıda belirtilen koşulları kabul etmiş sayılırsınız:</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">1. Fikri Mülkiyet ve Telif Hakları</h3>
        <p>Sitede yer alan tüm yazılım kodları, görsel tasarımlar, oyun mekanikleri ve özgün soru havuzu FenUp X platformuna ve kurucusuna aittir. İçerikler izinsiz olarak kopyalanamaz, başka bir web sitesinde yayınlanamaz ve ticari amaçla kullanılamaz.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">2. Eğitim Amaçlı Kullanım</h3>
        <p>Sitemiz; okullarda, akıllı tahtalarda ve bireysel cihazlarda eğitim ve pekiştirme amaçlı olarak ücretsiz kullanılmak üzere tasarlanmıştır.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">3. Sorumluluk Reddi</h3>
        <p>Oyun modüllerimiz üzerinden elde edilen puanlar, sıralamalar veya sonuçlar hiçbir şekilde resmi bir eğitim değerlendirme niteliği taşımaz. Uygulamanın amacı öğrencilerin fen bilimlerine olan ilgisini artırmak ve öğrenmeyi eğlenceli hale getirmektir.</p>`
    },
    cookies: {
        title: "Çerez Politikası",
        content: `<p>FenUp X, sizlere daha iyi bir kullanıcı deneyimi sunabilmek ve platformumuzu geliştirebilmek amacıyla çerez (cookie) teknolojilerinden faydalanır.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">1. Çerez Nedir?</h3>
        <p>Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük boyutlu metin dosyalarıdır.</p>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">2. Hangi Çerezleri Kullanıyoruz?</h3>
        <ul style="margin-left: 20px;">
            <li style="margin-bottom: 10px;"><strong>Zorunlu Çerezler:</strong> Sitenin temel fonksiyonlarının eksiksiz çalışması için gereklidir. Örneğin, bu politika onay çubuğunu kapatıp kapatmadığınızın bilgisi tarayıcınızda bu sayede tutulur.</li>
            <li style="margin-bottom: 10px;"><strong>Analitik Çerezler:</strong> Ziyaretçi sayılarını ve site kullanım istatistiklerini anlamamıza yardımcı olur.</li>
        </ul>
        <h3 style="color:var(--neon-blue); margin-top:20px; margin-bottom:10px;">3. Çerez Yönetimi</h3>
        <p>İnternet tarayıcınızın ayarlar bölümünden çerezleri silebilir veya kullanımını engelleyebilirsiniz; ancak bu durumda sitenin bazı özellikleri (örneğin karanlık mod tercihi veya kura çekimi verileri) düzgün çalışmayabilir.</p>`
    }
};

function openModal(policyKey) {
    const sq = document.getElementById('scene-quiz');
    const stq = document.getElementById('scene-tournament-quiz');
    if(isGlobalPaused === false && ((sq && !sq.classList.contains('is-hidden')) || (stq && !stq.classList.contains('is-hidden')))) {
        toggleMasterPause(); 
    }
    
    if(modalTitle) modalTitle.textContent = policies[policyKey].title;
    if(modalBody) modalBody.innerHTML = policies[policyKey].content;
    if(policyModal) policyModal.classList.remove('is-hidden');
}

if(btnCloseModal) btnCloseModal.onclick = () => { if(policyModal) policyModal.classList.add('is-hidden'); };

if(policyModal) {
    policyModal.onclick = (e) => { 
        if (e.target === policyModal) policyModal.classList.add('is-hidden'); 
    };
}

document.querySelectorAll('.btn-kvkk-open').forEach(btn => btn.onclick = () => openModal('kvkk'));
document.querySelectorAll('.btn-terms-open').forEach(btn => btn.onclick = () => openModal('terms'));
document.querySelectorAll('.btn-cookies-open').forEach(btn => btn.onclick = () => openModal('cookies'));

const cookiePolicyLink = document.getElementById('cookie-policy-link');
if(cookiePolicyLink) {
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
const authTabBtns = document.querySelectorAll('.auth-tab-btn');
const authPanes = document.querySelectorAll('.auth-pane');

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

document.addEventListener('touchstart', (e) => {
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
        <h3 id="student-auth-title" style="color: #fff; margin-bottom: 20px; font-weight: 300;">Öğrenci Girişi</h3>
        
        <div id="register-fields" class="is-hidden" style="display:none; flex-direction:column; width:100%;">
            <div style="display:flex; gap:10px; margin-bottom:15px; width:100%;">
                <input type="text" id="student-first-name" class="fenupx-input auth-input" placeholder="Adınız" style="margin-bottom:0; width:50%;">
                <input type="text" id="student-last-name" class="fenupx-input auth-input" placeholder="Soyadınız" style="margin-bottom:0; width:50%;">
            </div>
            <div class="info-container">
                <input type="text" id="student-reg-nickname" class="fenupx-input auth-input" placeholder="Liderlik Tablosu Adı (Örn: Cesur Proton)" style="margin-bottom:0; width:100%; padding-right:45px;">
                <i class="fas fa-info-circle info-icon"></i>
                <span class="tooltiptext"><i class="fas fa-exclamation-triangle" style="margin-right:5px;"></i> Lütfen gerçek adınızı veya bilim temalı bir unvan seçin. Kırıcı veya argo isim kullanan hesaplar tablodan kalıcı olarak silinir.</span>
            </div>
        </div>
        
        <input type="email" id="student-email" class="fenupx-input auth-input" placeholder="E-Posta Adresi">
        <div class="password-container">
            <input type="password" id="student-pass" class="fenupx-input auth-input" placeholder="Şifre">
            <i class="fas fa-eye toggle-pass-icon" id="toggle-pass"></i>
        </div>
        
        <div class="password-container is-hidden" id="confirm-pass-container" style="display:none;">
            <input type="password" id="student-pass-confirm" class="fenupx-input auth-input" placeholder="Şifreyi Tekrar Gir">
            <i class="fas fa-eye toggle-pass-icon" id="toggle-pass-confirm"></i>
        </div>
        
        <button id="btn-student-submit" class="f-btn f-btn-ana" style="width:100%; margin-top:5px;">GİRİŞ YAP</button>
        <p style="color: #aaa; margin-top: 15px; font-size: 0.9rem;">
            <span id="student-toggle-text">Hesabın yok mu?</span> 
            <a href="#" id="student-toggle-link" style="color: var(--neon-blue); text-decoration: none;">Hemen Üye Ol</a>
        </p>
    `;
}

const togglePassBtn = document.getElementById('toggle-pass');
if (togglePassBtn) {
    const handleToggle = (e) => {
        e.preventDefault(); 
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
    togglePassBtn.addEventListener('click', handleToggle);
    togglePassBtn.addEventListener('touchstart', handleToggle, {passive: false});
}

const togglePassConfirmBtn = document.getElementById('toggle-pass-confirm');
if (togglePassConfirmBtn) {
    const handleToggleConfirm = (e) => {
        e.preventDefault(); 
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
    togglePassConfirmBtn.addEventListener('click', handleToggleConfirm);
    togglePassConfirmBtn.addEventListener('touchstart', handleToggleConfirm, {passive: false});
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
        
        <div id="avatar-selector-container" class="is-hidden" style="border: 1px solid rgba(0, 210, 255, 0.3); border-radius:15px; background: rgba(0,0,0,0.5); margin-bottom:20px;">
            <div class="avatar-grid" id="avatar-selector"></div>
        </div>

        <div style="display:flex; gap:10px; margin-bottom:15px;">
            <input type="text" id="p-name" class="fenupx-input" placeholder="Ad" style="margin-bottom:0; width:50%;">
            <input type="text" id="p-surname" class="fenupx-input" placeholder="Soyad" style="margin-bottom:0; width:50%;">
        </div>
        <div class="info-container">
            <input type="text" id="p-nickname" class="fenupx-input" placeholder="Liderlik Tablosu Adı" style="width:100%; margin-bottom:0; padding-right:45px;">
            <i class="fas fa-info-circle info-icon"></i>
            <span class="tooltiptext"><i class="fas fa-exclamation-triangle" style="margin-right:5px;"></i> Kırıcı veya argo isim kullanan hesaplar tablodan kalıcı olarak silinir.</span>
        </div>
        
        <button id="btn-save-profile" class="f-btn f-btn-ana" style="width:100%; margin-top:5px;">GÜNCELLE</button>
        <button id="btn-delete-account" class="f-btn btn-danger" style="width:100%; margin-top:15px; padding: 12px; font-size:1rem;">Hesabımı Kalıcı Olarak Sil</button>
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
    kozmikAvatarlar.forEach(av => {
        const img = document.createElement('img');
        img.src = av.url; img.className = "avatar-item"; img.dataset.url = av.url;
        img.onclick = () => {
            document.querySelectorAll('.avatar-item').forEach(i => i.classList.remove('selected'));
            img.classList.add('selected');
            const pca = document.getElementById('p-current-avatar'); if(pca) pca.src = av.url;
            const asc = document.getElementById('avatar-selector-container'); if(asc) asc.classList.add('is-hidden'); 
        };
        avatarContainer.appendChild(img);
    });
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const userAvatar = userData.avatar || kozmikAvatarlar[0].url;
            const fullAd = `${userData.name} ${userData.surname}`;
            
            if(btnUyelik) {
                btnUyelik.innerHTML = `<img src="${userAvatar}" class="profile-img-header"> ${userData.name}`;
                btnUyelik.onclick = (e) => {
                    e.stopPropagation(); 
                    if(profileDropdown) profileDropdown.classList.toggle('is-hidden');
                };
            }
            if(userDisplayName) userDisplayName.textContent = fullAd;
            if(userDisplayRole) userDisplayRole.textContent = userData.role === 'teacher' ? 'Öğretmen' : (userData.role === 'admin' ? 'Sistem Yöneticisi' : 'Öğrenci');
            
            const btnTT = document.getElementById('btn-teacher-tools');
            if((userData.role === 'teacher' || userData.role === 'admin') && btnTT) {
                btnTT.classList.remove('is-hidden');
            }
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
                        if(authModal) authModal.classList.remove('is-hidden'); 
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
                if(authModal) authModal.classList.remove('is-hidden'); 
            };
        }
        if(profileDropdown) profileDropdown.classList.add('is-hidden');
        const btnAP = document.getElementById('btn-admin-panel'); if(btnAP) btnAP.classList.add('is-hidden');
        
        const lbg = document.getElementById('lb-guest-promo'); if(lbg) lbg.classList.remove('is-hidden');
        const lbu = document.getElementById('lb-user-rank'); if(lbu) lbu.classList.add('is-hidden');
    }
});

document.addEventListener('click', () => {
    if(profileDropdown && !profileDropdown.classList.contains('is-hidden')) {
        profileDropdown.classList.add('is-hidden');
    }
});
if(profileDropdown) {
    profileDropdown.onclick = (e) => e.stopPropagation();
}

const btnLogout = document.getElementById('btn-logout');
if(btnLogout) btnLogout.onclick = () => signOut(auth).then(() => location.reload());

if(btnCloseAuth) {
    btnCloseAuth.onclick = () => { if(authModal) authModal.classList.add('is-hidden'); };
}

if(authModal) {
    authModal.onclick = (e) => { 
        if (e.target === authModal) authModal.classList.add('is-hidden'); 
    };
}

authTabBtns.forEach(btn => {
    btn.onclick = () => {
        authTabBtns.forEach(b => b.classList.remove('active'));
        authPanes.forEach(p => p.classList.add('is-hidden'));
        btn.classList.add('active');
        const t = document.getElementById(btn.dataset.target);
        if(t) t.classList.remove('is-hidden');
    };
});

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
        if (regFields) {
            if (isStudentLoginMode) {
                regFields.classList.add('is-hidden');
                regFields.style.display = 'none';
                if(confirmPassContainer) {
                    confirmPassContainer.classList.add('is-hidden');
                    confirmPassContainer.style.display = 'none';
                }
            } else {
                regFields.classList.remove('is-hidden');
                regFields.style.display = 'flex';
                if(confirmPassContainer) {
                    confirmPassContainer.classList.remove('is-hidden');
                    confirmPassContainer.style.display = 'block';
                }
            }
        }
    };
}

document.querySelectorAll('.dropdown-item').forEach(item => {
    if (item.textContent.includes("Profilim")) {
        item.onclick = (e) => {
            e.stopPropagation();
            if(profileDropdown) profileDropdown.classList.add('is-hidden');
            if(profileModal) profileModal.classList.remove('is-hidden');
        };
    }
});

const clProfile = document.getElementById('close-profile');
if(clProfile) clProfile.onclick = () => { if(profileModal) profileModal.classList.add('is-hidden'); };

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

        if(!name || !surname || !nickname) return alert("Ad, soyad ve kullanıcı adı alanları boş bırakılamaz.");
        
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
    btnDelAcc.onclick = async () => {
        if(confirm("DİKKAT! Hesabın ve tüm puanların kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musun?")) {
            try {
                const user = auth.currentUser;
                await deleteDoc(doc(db, "users", user.uid));
                await deleteUser(user);
                alert("Hesabın başarıyla silindi. Kozmik yolculuğunda başarılar dileriz.");
                location.reload();
            } catch(err) {
                if(err.code === "auth/requires-recent-login") {
                    alert("Güvenlik nedeniyle hesabınızı silebilmek için sistemden çıkış yapıp tekrar giriş yapmanız gerekmektedir.");
                } else {
                    alert("Bir hata oluştu: " + err.message);
                }
            }
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
                if(authModal) authModal.classList.add('is-hidden');
            } else {
                const fn = document.getElementById('student-first-name');
                const ln = document.getElementById('student-last-name');
                const rn = document.getElementById('student-reg-nickname');
                const spc = document.getElementById('student-pass-confirm');
                const fName = fn ? fn.value.trim() : '';
                const lName = ln ? ln.value.trim() : '';
                const nick = rn ? rn.value.trim() : '';
                const passConfirm = spc ? spc.value : '';
                
                if(!fName || !lName || !nick || !passConfirm) return alert("Lütfen Ad, Soyad, Liderlik Tablosu Adı ve Şifre Tekrarı alanlarını doldurun.");
                if(pass !== passConfirm) return alert("Şifreler eşleşmiyor! Lütfen kontrol edin.");
                if(!uygunIsimMi(fName) || !uygunIsimMi(lName) || !uygunIsimMi(nick)) return alert("Uygunsuz kelime kullanımı tespit edildi. Sistem kuralları gereği üyeliğiniz reddedildi. Lütfen küfür veya argo içermeyen isimler kullanın.");
                
                const cred = await createUserWithEmailAndPassword(auth, email, pass);
                await setDoc(doc(db, "users", cred.user.uid), {
                    name: fName, surname: lName, nickname: nick, email: email, role: "student", totalScore: 0, isBanned: false, avatar: kozmikAvatarlar[0].url, createdAt: new Date()
                });
                if(authModal) authModal.classList.add('is-hidden');
                alert(`Hoş geldin ${fName}! Kozmik maceraya hazırsın.`);
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
                if(authModal) authModal.classList.add('is-hidden');
                
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
                if(authModal) authModal.classList.add('is-hidden');
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

if(btnAdminPanel) {
    btnAdminPanel.onclick = (e) => {
        e.stopPropagation();
        if(profileDropdown) profileDropdown.classList.add('is-hidden');
        if(adminModal) adminModal.classList.remove('is-hidden');
        loadAdminUsers();
    };
}

if(btnCloseAdmin) btnCloseAdmin.onclick = () => { if(adminModal) adminModal.classList.add('is-hidden'); };
if(adminModal) adminModal.onclick = (e) => { if (e.target === adminModal) adminModal.classList.add('is-hidden'); };

if(adminSearchInput) adminSearchInput.oninput = (e) => { renderAdminUsers(e.target.value); };

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
        const row = document.createElement('div');
        row.className = `admin-user-row ${isBanned ? 'banned' : ''}`;
        row.innerHTML = `
            <div class="admin-user-info">
                <img src="${u.avatar || kozmikAvatarlar[0].url}" class="admin-user-avatar">
                <div class="admin-user-details">
                    <h4>${u.nickname || 'İsimsiz Kaptan'}</h4>
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

if(lbGuestPromo) lbGuestPromo.onclick = () => { if(authModal) authModal.classList.remove('is-hidden'); };

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
        const row = document.createElement('div');
        row.className = `global-lb-row rank-${i+1}`;
        row.innerHTML = `
            <div class="global-lb-rank">${i+1}</div>
            <img src="${u.avatar || kozmikAvatarlar[0].url}" class="global-lb-avatar">
            <div class="global-lb-info">
                <h4>${u.nickname || 'Kozmik Kaptan'}</h4>
                <p>${u.role === 'teacher' ? 'Öğretmen' : 'Öğrenci'}</p>
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
        if(reportModal) reportModal.classList.add('is-hidden');
        if(isGlobalPaused) toggleMasterPause(); // Bildirim penceresi kapanınca oyunu devam ettir
    };
}

let currentReportedQuestion = null;

function openReportModal(questionData) {
    if(!questionData) return;
    
    // Arka planda oyunu durdur (süre akmasın diye)
    if(!isGlobalPaused) toggleMasterPause();
    
    currentReportedQuestion = questionData;
    if(reportModal) reportModal.classList.remove('is-hidden');
    
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
            
            if(reportModal) reportModal.classList.add('is-hidden');
            if(isGlobalPaused) toggleMasterPause(); // Bildirim gönderilip modal kapanınca oyunu devam ettir
        }
    };
}