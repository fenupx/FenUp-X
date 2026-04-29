import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, deleteUser } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
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
    
    /* Profil Menüsü CSS */
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

    /* Profil Modal UI Extralar (KAYDIRILABİLİR AVATAR ALANI) */
    .avatar-grid { 
        display: grid; 
        grid-template-columns: repeat(4, 1fr); 
        gap: 15px; 
        margin: 15px 0; 
        max-height: 300px; 
        overflow-y: auto; 
        padding: 10px;
    }
    .avatar-grid::-webkit-scrollbar { width: 8px; }
    .avatar-grid::-webkit-scrollbar-thumb { background: rgba(0, 210, 255, 0.5); border-radius: 10px; }
    
    .avatar-item { width: 75px; height: 75px; border-radius: 50%; border: 3px solid transparent; cursor: pointer; transition: 0.3s; padding: 5px; background: rgba(255,255,255,0.05); box-shadow: 0 4px 10px rgba(0,0,0,0.5); }
    .avatar-item:hover { transform: scale(1.1); background: rgba(255,255,255,0.1); }
    .avatar-item.selected { border-color: #00d2ff; background: rgba(0,210,255,0.2); box-shadow: 0 0 20px rgba(0, 210, 255, 0.6); transform: scale(1.1); }
    .profile-img-header { width: 35px; height: 35px; border-radius: 50%; vertical-align: middle; margin-right: 8px; border: 1px solid #00d2ff; }
    .btn-danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid #ef4444; margin-top: 15px; }
    .btn-danger:hover { background: #ef4444; color: #fff; }
    
    /* Araç İpucu (Tooltip) CSS - Tıklayınca değil, i ikonuna gelince açılır */
    .info-container { position: relative; display: flex; align-items: center; width: 100%; margin-bottom: 15px; }
    .info-icon { position: absolute; right: 15px; color: #f59e0b; font-size: 1.2rem; cursor: help; z-index: 5; }
    .tooltiptext {
        visibility: hidden; width: 250px; background-color: rgba(0,0,0,0.95); color: #f59e0b; text-align: left;
        border-radius: 10px; padding: 12px; position: absolute; z-index: 100; bottom: 120%; right: 0;
        font-size: 0.9rem; border: 1px solid #f59e0b; box-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
        opacity: 0; transition: opacity 0.3s; pointer-events: none;
    }
    .info-icon:hover ~ .tooltiptext { visibility: visible; opacity: 1; }

    /* Şifre Göster/Gizle Butonu İçin Özel Container */
    .password-container { position: relative; width: 100%; margin-bottom: 15px; }
    .password-container input { margin-bottom: 0 !important; width: 100%; padding-right: 45px; }
    .toggle-pass-icon { position: absolute; right: 15px; top: 16px; color: #aaa; cursor: pointer; font-size: 1.2rem; transition: 0.3s; z-index: 5;}
    .toggle-pass-icon:hover { color: #00d2ff; }

    /* ÖĞRETMEN MODÜLÜNÜ GÜVENLİK SEBEBİYLE ASKIYA ALMA (GİZLEME) */
    #auth-modal .auth-tab-btn[data-target="teacher-auth"] {
        display: none !important;
    }
`;
document.head.appendChild(styleEnjektor);

// 48 Adet Genişletilmiş Sevimli Öğrenci, Süper Kahraman, Robot ve Uzay Avatarları
const kozmikAvatarlar = [
    // Sevimli Erkek Çocuklar (Micah)
    {id: 'k1', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Efe&baseColor=f9c9b6&hair=mrT&facialHairProbability=0'},
    {id: 'k2', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Ali&baseColor=f9c9b6&hair=dougFunny&glassesProbability=100'},
    {id: 'k3', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Can&baseColor=f9c9b6&hair=dannyPhantom'},
    {id: 'k4', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Mert&baseColor=f9c9b6&hair=fonze'},
    {id: 'k5', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Burak&baseColor=f9c9b6&hair=mrT&glassesProbability=100'},
    {id: 'k6', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Emre&baseColor=f9c9b6&hair=dannyPhantom&glassesProbability=100'},
    
    // Sevimli Kız Çocuklar (Micah)
    {id: 'k7', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Ayse&baseColor=f9c9b6&hair=pigtails'},
    {id: 'k8', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Zeynep&baseColor=f9c9b6&hair=curly'},
    {id: 'k9', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Elif&baseColor=f9c9b6&hair=pixie&glassesProbability=100'},
    {id: 'k10', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Derya&baseColor=f9c9b6&hair=pigtails&glassesProbability=100'},
    {id: 'k11', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Ece&baseColor=f9c9b6&hair=curly&glassesProbability=100'},
    {id: 'k12', url: 'https://api.dicebear.com/7.x/micah/svg?seed=Naz&baseColor=f9c9b6&hair=pixie'},

    // Havalı Öğrenciler / Süper Kahramanlar (Flaticon)
    {id: 'h1', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056044.png'}, 
    {id: 'h2', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056012.png'},
    {id: 'h3', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056014.png'},
    {id: 'h4', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056003.png'},
    {id: 'h5', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056016.png'},
    {id: 'h6', url: 'https://cdn-icons-png.flaticon.com/512/1056/1056038.png'},

    // Sevimli Bilim Kurgu Karakterleri
    {id: 'a1', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nico&hair=eyepatch'},
    {id: 'a2', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luna&hair=longHairMiaWallace&accessories=sunglasses'},
    {id: 'a3', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Stella&hair=longHairStraightStrand'},
    {id: 'a4', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo&hair=shortHairSides&accessories=prescription02'},
    {id: 'a5', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nova&hair=longHairCurly'},
    {id: 'a6', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orion&hair=shortHairFrizzle'},

    // Sevimli Robotlar ve Botlar (Bottts)
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

    // Uzay, Bilim ve Gezegen İkonları
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

function isimSor(callback) {
    const overlay = document.createElement('div');
    overlay.className = "fenupx-prompt-overlay";
    overlay.innerHTML = `
        <div class="fenupx-prompt-card">
            <h2>KAPTANIN ADI?</h2>
            <p>Yarışmaya başlamak için ismini yaz.</p>
            <input type="text" id="f-ad-input" class="fenupx-input" placeholder="İsmini buraya yaz..." maxlength="20">
            <div class="fenupx-btn-grup">
                <button id="f-baslat" class="f-btn f-btn-ana">MACERAYI BAŞLAT</button>
                <button id="f-misafir" class="f-btn f-btn-ikinci">MİSAFİR OLARAK GİR</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    const input = document.getElementById('f-ad-input');
    input.focus();
    
    document.getElementById('f-baslat').onclick = () => {
        const val = input.value.trim();
        document.body.removeChild(overlay);
        callback(val !== "" ? val : "Misafir Yarışmacı");
    };
    document.getElementById('f-misafir').onclick = () => {
        document.body.removeChild(overlay);
        callback("Misafir Yarışmacı");
    };
    input.onkeydown = (e) => { if(e.key === "Enter") document.getElementById('f-baslat').click(); };
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

volumeSlider.addEventListener('input', (e) => {
    globalVolume = e.target.value / 100;
    muteBtn.className = globalVolume === 0 ? "fas fa-volume-mute" : "fas fa-volume-up";
    updateVolumes();
});

muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    muteBtn.className = isMuted ? "fas fa-volume-mute" : "fas fa-volume-up";
    updateVolumes();
});

function updateVolumes() {
    for (let key in sfx) {
        sfx[key].muted = isMuted;
        if (key === 'bgm') { sfx[key].volume = isMuted ? 0 : (globalVolume * 0.5); } 
        else { sfx[key].volume = isMuted ? 0 : globalVolume; }
    }
}

document.getElementById('fullscreen-btn').onclick = () => {
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
        topControls.style.display = "flex";
    } else {
        topControls.style.display = "none";
        stopSound(sfx.bgm); 
    }
}
topControls.style.display = "none"; 

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
            const isBlackholeHidden = document.getElementById('blackhole-overlay').classList.contains('is-hidden');
            if (!isTimerPaused && isBlackholeHidden && !quizState.locked) playSound(sfx.bgm);
        } else if (activeMode === "turnuva") {
            if(!tState.isEvaluating && !tState.isDuelFinished) playSound(sfx.bgm);
        }
    }
}

masterPauseBtn.onclick = toggleMasterPause;
document.getElementById('btn-master-resume').onclick = toggleMasterPause;

// --- 5. MENÜ YÖNLENDİRMELERİ ---
let activeMode = "", selectedGrade = null, selectedUnit = null;
let usedQuestions = []; 

document.querySelector('.logo').onclick = () => location.reload();

if(btnHakkimizda) btnHakkimizda.onclick = () => switchScene(scenes.home, scenes.hakkimizda);
if(btnIletisim) btnIletisim.onclick = () => switchScene(scenes.home, scenes.iletisim);

document.getElementById('btn-oyun-modulu').onclick = () => switchScene(scenes.home, scenes.crossroads);
document.getElementById('btn-deney-modulu').onclick = () => alert("İnteraktif Deney Modülü Çok Yakında!");

document.getElementById('btn-mode-bireysel').onclick = () => { activeMode = "bireysel"; switchScene(scenes.crossroads, scenes.lobby); };
document.getElementById('btn-mode-turnuva').onclick = () => { activeMode = "turnuva"; initTournamentLobby(); switchScene(scenes.crossroads, scenes.tournamentLobby); };

document.querySelectorAll('.btn-back-home').forEach(btn => btn.onclick = () => switchScene(btn.closest('.scene'), scenes.home));
document.querySelectorAll('.btn-back-cross').forEach(btn => btn.onclick = () => switchScene(btn.closest('.scene'), scenes.crossroads));
document.getElementById('btn-back-class').onclick = () => switchScene(scenes.unit, scenes.class);
document.getElementById('btn-back-rules').onclick = () => switchScene(scenes.rules, scenes.unit);

let drawBag = []; let currentDrawSize = 0; let currentActivePlayerName = "Misafir"; let individualLeaderboard = [];
document.getElementById('btn-kura-baslat').onclick = () => {
    const size = parseInt(document.getElementById('lobby-size').value);
    if(!size) return alert("Lütfen sınıf mevcudu giriniz.");
    if(size !== currentDrawSize || drawBag.length === 0) { drawBag = Array.from({length: size}, (_, i) => i + 1); currentDrawSize = size; }
    document.getElementById('player-name-input').value = ""; switchScene(scenes.lobby, scenes.draw);
    let count = 0, interval = setInterval(() => {
        document.getElementById('draw-counter').textContent = Math.floor(Math.random() * size) + 1;
        if(++count > 20) { 
            clearInterval(interval); playSound(sfx.correct); 
            const picked = drawBag.splice(Math.floor(Math.random() * drawBag.length), 1)[0];
            document.getElementById('draw-counter').textContent = picked; 
            document.getElementById('draw-remaining').textContent = `Torbadaki Kalan Kişi Sayısı: ${drawBag.length}`; 
            document.getElementById('draw-actions').classList.remove('is-hidden'); 
        }
    }, 50);
};
document.getElementById('btn-new-draw').onclick = () => { 
    if(drawBag.length === 0) { alert("Torbada kimse kalmadı! Torba sıfırlanıyor..."); drawBag = Array.from({length: currentDrawSize}, (_, i) => i + 1); } 
    document.getElementById('draw-actions').classList.add('is-hidden'); 
    document.getElementById('btn-kura-baslat').click(); 
};
document.getElementById('btn-go-class').onclick = () => { 
    currentActivePlayerName = document.getElementById('player-name-input').value.trim() || `${document.getElementById('draw-counter').textContent} Numara`; 
    switchScene(scenes.draw, scenes.class); 
};

document.getElementById('btn-direkt-baslat').onclick = () => { 
    isimSor((gelenIsim) => {
        currentActivePlayerName = gelenIsim;
        switchScene(scenes.lobby, scenes.class);
    });
};

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
    
    if (activeMode === "bireysel") {
        content.innerHTML = `
            <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 15px;"><i class="fas fa-bullseye" style="color:#22c55e; margin-right:10px; width: 25px;"></i> <b>Puanlama ve Süre:</b> Toplam 10 soru seni bekliyor. İlk 4 soru 100 puan (40 sn), 5-8. sorular 200 puan (50 sn), finaldeki son 2 soru ise 400 puan (60 sn) değerindedir.</li>
                <li style="margin-bottom: 15px;"><i class="fas fa-stopwatch" style="color:#00d2ff; margin-right:10px; width: 25px;"></i> <b>Hız Çok Önemli:</b> Sadece doğru bilmek yetmez! Liderlik tablosunda üst sıralara çıkmak için soruları olabildiğince <b>hızlı</b> cevaplamalısın. Eşit puanda hızlı olan kazanır!</li>
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

document.getElementById('btn-start-from-rules').onclick = function() {
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

const quizState = { set: [], index: 0, score: 0, locked: false, timerInterval: null, totalTimeSpent: 0, riskAcceptedForCurrent: false, fullPool: [] };
let isTimerPaused = false;
function getSettings(idx) { return idx < 4 ? { time: 40, points: 100 } : idx < 8 ? { time: 50, points: 200 } : { time: 60, points: 400 }; }

async function startIndividual() {
    quizState.set = await fetchQuestions(selectedGrade, selectedUnit); if(quizState.set.length === 0) return;
    quizState.index = 0; quizState.score = 0; quizState.totalTimeSpent = 0; quizState.riskAcceptedForCurrent = false; isTimerPaused = false;
    document.querySelectorAll('.joker-area button').forEach(btn => { btn.classList.remove('is-used', 'joker-spawn-anim'); btn.style.opacity = "1"; btn.style.pointerEvents = "auto"; btn.style.background = ""; });
    document.getElementById('joker-pause').classList.add('is-hidden'); document.getElementById('joker-pause').innerHTML = "Zamanı Durdur";
    document.getElementById('quiz-hint').classList.add('is-hidden');
    switchScene(scenes.rules, scenes.quiz); renderIndividual();
}

function renderIndividual() {
    if(document.activeElement) document.activeElement.blur(); 

    if (quizState.index >= 8 && !quizState.riskAcceptedForCurrent) { showBlackHoleWarning(); return; }
    const q = quizState.set[quizState.index]; const settings = getSettings(quizState.index);
    quizState.locked = false; isTimerPaused = false; 
    document.getElementById('quiz-timer-display').style.color = "#00d2ff"; document.getElementById('quiz-timer-display').style.textShadow = "none";
    
    playSound(sfx.bgm);
    
    document.getElementById('quiz-progress').textContent = `Soru ${quizState.index + 1}/10 (${settings.points} Puan)`;
    document.getElementById('quiz-score').textContent = quizState.score; document.getElementById('quiz-question').textContent = q.question;
    const pauseBtn = document.getElementById('joker-pause');
    if (pauseBtn.classList.contains('is-used')) { pauseBtn.innerHTML = "Kullanıldı"; pauseBtn.style.background = ""; pauseBtn.style.opacity = "0.5"; pauseBtn.style.pointerEvents = "none"; } else if (quizState.index >= 4) { if (pauseBtn.classList.contains('is-hidden')) { pauseBtn.classList.remove('is-hidden'); pauseBtn.classList.add('joker-spawn-anim'); } }
    document.getElementById('quiz-hint').classList.add('is-hidden');
    document.querySelectorAll('.answer-btn').forEach((btn, i) => { 
        btn.blur(); 
        btn.classList.remove('is-correct', 'is-wrong', 'is-pending', 'is-hidden'); 
        btn.querySelector('.answer-text').textContent = q.answerOptions[i].text; 
        btn.dataset.correct = q.answerOptions[i].isCorrect; 
    });
    startIndividualTimer(settings.time);
}

function showBlackHoleWarning() {
    stopSound(sfx.bgm);
    document.getElementById('bh-current-score').textContent = quizState.score; document.getElementById('bh-risk-score').textContent = Math.floor(quizState.score / 2);
    document.getElementById('blackhole-overlay').classList.remove('is-hidden');
}
document.getElementById('btn-bh-withdraw').onclick = () => { document.getElementById('blackhole-overlay').classList.add('is-hidden'); finishIndividual("YARIŞMADAN ÇEKİLDİN!"); };
document.getElementById('btn-bh-continue').onclick = () => { document.getElementById('blackhole-overlay').classList.add('is-hidden'); quizState.riskAcceptedForCurrent = true; renderIndividual(); };

function startIndividualTimer(time) {
    let timeLeft = time; document.getElementById('quiz-timer-display').textContent = timeLeft;
    clearInterval(quizState.timerInterval);
    quizState.timerInterval = setInterval(() => {
        if(quizState.locked || isTimerPaused || isGlobalPaused) return; 
        quizState.totalTimeSpent++; timeLeft--; document.getElementById('quiz-timer-display').textContent = timeLeft;
        if(timeLeft <= 10 && timeLeft > 0) { document.getElementById('quiz-timer-display').style.color = "#ef4444"; document.getElementById('quiz-timer-display').style.textShadow = "0 0 15px #ef4444"; }
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
            this.classList.replace('is-pending', 'is-correct'); playSound(sfx.correct); quizState.score += getSettings(quizState.index).points; 
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

function finishIndividual(msg) {
    if(document.activeElement) document.activeElement.blur();
    individualLeaderboard.push({ name: currentActivePlayerName, score: quizState.score, time: quizState.totalTimeSpent });
    const quizEndEl = document.getElementById('quiz-end'); document.getElementById('scene-quiz').appendChild(quizEndEl); quizEndEl.classList.remove('is-hidden');
    document.getElementById('btn-show-leaderboard').style.display = "block"; document.getElementById('quiz-end-title').textContent = msg; document.getElementById('quiz-end-score').textContent = `Final Puanın: ${quizState.score}`; document.getElementById('quiz-end-time').textContent = `Çözüm Süresi: ${quizState.totalTimeSpent} Saniye`;
    if(msg.includes("ŞAMPİYON") || msg.includes("ÇEKİLDİN")) playSound(sfx.cheer); else playSound(sfx.wrong);
}

document.getElementById('btn-back-draw').onclick = () => { 
    stopSound(sfx.cheer); stopSound(sfx.wrong); 
    const quizEndEl = document.getElementById('quiz-end'); quizEndEl.classList.add('is-hidden'); 
    document.getElementById('scene-quiz').appendChild(quizEndEl); 
    if (activeMode === "bireysel") { document.getElementById('player-name-input').value = ""; switchScene(scenes.quiz, scenes.lobby); } else { switchScene(scenes.tournamentQuiz, scenes.tournamentLobby); } 
};

document.getElementById('btn-show-leaderboard').onclick = () => { 
    stopSound(sfx.cheer); stopSound(sfx.wrong); document.getElementById('quiz-end').classList.add('is-hidden'); 
    individualLeaderboard.sort((a, b) => { if (b.score !== a.score) return b.score - a.score; return a.time - b.time; }); 
    const list = document.getElementById('leaderboard-list'); list.innerHTML = ''; 
    individualLeaderboard.forEach((p, i) => { 
        let rankColor = i === 0 ? "#f59e0b" : i === 1 ? "#9ca3af" : i === 2 ? "#b45309" : "rgba(255,255,255,0.1)"; 
        let badge = i === 0 ? "🥇 Galaksi Fatihi" : i === 1 ? "🥈 Yıldız Kaşifi" : i === 2 ? "🥉 Cesur Astronot" : "☄️ Uzay Yolcusu"; 
        list.innerHTML += `<div style="display: flex; justify-content: space-between; font-size: 1.6rem; margin: 10px 0; padding: 15px 25px; background: ${rankColor}; border-radius:15px; font-weight: bold; align-items: center;"><div style="display:flex; flex-direction:column;"><span>${i+1}. ${p.name}</span><span style="font-size: 1rem; color: ${i<3 ? '#000' : '#00d2ff'};">${badge}</span></div><div style="text-align: right; font-size: 1.4rem;"><span style="color: ${i<3 ? '#000' : '#fff'};">${p.score} Puan</span><br><span style="font-size: 1rem; color: ${i<3 ? '#333' : '#aaa'};">⏱ ${p.time} sn</span></div></div>`; 
    }); 
    switchScene(scenes.quiz, scenes.leaderboard); 
};

document.getElementById('btn-leaderboard-continue').onclick = () => { switchScene(scenes.leaderboard, scenes.lobby); };

document.getElementById('joker-hint').onclick = function() { if(quizState.locked || isGlobalPaused || this.classList.contains('is-used')) return; this.blur(); this.classList.add('is-used'); this.style.opacity = "0.5"; this.style.pointerEvents = "none"; document.getElementById('quiz-hint').classList.remove('is-hidden'); document.getElementById('quiz-hint').textContent = `💡 İpucu: ${quizState.set[quizState.index].hint}`; };
document.getElementById('joker-fifty').onclick = function() { if(quizState.locked || isGlobalPaused || this.classList.contains('is-used')) return; this.blur(); this.classList.add('is-used'); this.style.opacity = "0.5"; this.style.pointerEvents = "none"; let hidden = 0; document.querySelectorAll('.answer-btn').forEach(btn => { if(btn.dataset.correct === "false" && hidden < 2) { btn.classList.add('is-hidden'); hidden++; } }); };
document.getElementById('joker-pause').onclick = function() { if(quizState.locked || isGlobalPaused) return; this.blur(); if(!isTimerPaused) { isTimerPaused = true; this.innerHTML = "Süreyi Başlat ▶"; this.style.background = "#22c55e"; this.classList.add('is-used'); this.classList.remove('joker-spawn-anim'); stopSound(sfx.bgm); } else { isTimerPaused = false; this.innerHTML = "Kullanıldı"; this.style.background = ""; this.style.opacity = "0.5"; this.style.pointerEvents = "none"; playSound(sfx.bgm); } };

document.getElementById('joker-pass').onclick = function() { 
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

// --- 7. TURNUVA MODU ---
const presetNames = ["Protonlar", "Atom Karıncalar", "Foton Fırtınası", "DNA Şifresi", "Kuantum Gücü", "Elementler", "Dinamolar", "Süpernovalar", "Hücre Muhafızları", "Galaksi Kaşifleri"];
let tTeams = [];
const tState = { questions: [], index: 0, locked: false, skipTimer: false, timerInterval: null, isEvaluating: false, isDuel: false, isDuelFinished: false, tiedTeams: [] };

function initTournamentLobby() {
    const countSelect = document.getElementById('group-count');
    const container = document.getElementById('group-names-container');
    const presetContainer = document.getElementById('preset-names');
    presetContainer.innerHTML = '';
    presetNames.forEach(name => {
        const btn = document.createElement('button'); btn.className = 'preset-btn'; btn.textContent = name;
        btn.onclick = () => { const inputs = container.querySelectorAll('input'); for(let inp of inputs) { if(inp.value.trim() === '') { inp.value = name; break; } } };
        presetContainer.appendChild(btn);
    });
    function renderInputs() {
        let count = parseInt(countSelect.value); container.innerHTML = '';
        for(let i=1; i<=count; i++) container.innerHTML += `<input type="text" id="t-name-${i}" placeholder="${i}. Grup İsmi" class="t-team-input">`;
    }
    countSelect.onchange = renderInputs; renderInputs();
}

document.getElementById('btn-start-tournament').onclick = () => {
    const count = parseInt(document.getElementById('group-count').value); tTeams = [];
    for(let i=1; i<=count; i++) { 
        let name = document.getElementById(`t-name-${i}`).value.trim(); if(!name) name = `${i}. Grup`; 
        tTeams.push({ id: i, name: name, score: 0, answer: null, isEliminated: false, consecutive: 0, isOnFire: false }); 
    }
    switchScene(scenes.tournamentLobby, scenes.class);
};

async function startTournament() {
    const pool = await fetchQuestions(selectedGrade, selectedUnit); if(pool.length === 0) return;
    tState.questions = pool; tState.index = 0; tState.isDuel = false; tState.isDuelFinished = false; tState.tiedTeams = [];
    tTeams.forEach(t => { t.score = 0; t.isEliminated = false; t.answer = null; t.consecutive = 0; t.isOnFire = false; });
    document.getElementById('scene-tournament-quiz').classList.remove('duel-mode-active');
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

    document.getElementById('cards-overlay').classList.add('is-hidden'); 
    document.getElementById('t-teams-container').classList.add('is-hidden');
    document.getElementById('t-teams-container').innerHTML = ''; 
    document.getElementById('btn-t-reveal').classList.add('is-hidden');
    document.getElementById('btn-t-next').classList.add('is-hidden');
    document.getElementById('btn-t-duel-start').classList.add('is-hidden');
    document.getElementById('t-status-text').classList.add('is-hidden');
    document.getElementById('t-timer-label').classList.remove('is-hidden');
    document.getElementById('t-timer-display').classList.remove('is-hidden');

    document.querySelectorAll('.t-main-opt').forEach(opt => opt.classList.remove('highlight-correct'));
    
    document.getElementById('t-question-number').textContent = `${tState.index + 1}/10`;
    document.getElementById('t-question-number').style.color = "var(--neon-purple)";
    document.getElementById('t-question-points').textContent = `(${currentPoints} Puan)`; 
    document.getElementById('t-question-text').textContent = q.question;
    
    const skipBtn = document.getElementById('btn-t-skip-timer');
    skipBtn.classList.remove('is-hidden');
    skipBtn.onclick = () => { tState.skipTimer = true; };
    
    const optsDiv = document.getElementById('t-options-display');
    optsDiv.style.display = "grid";
    document.getElementById('t-opt-A').innerHTML = `A) <span>${q.answerOptions[0].text}</span>`;
    document.getElementById('t-opt-B').innerHTML = `B) <span>${q.answerOptions[1].text}</span>`;
    document.getElementById('t-opt-C').innerHTML = `C) <span>${q.answerOptions[2].text}</span>`;
    document.getElementById('t-opt-D').innerHTML = `D) <span>${q.answerOptions[3].text}</span>`;

    startTournamentTimer(45);
}

document.getElementById('btn-cards-seen').onclick = () => {
    document.getElementById('cards-overlay').classList.add('is-hidden');
    revealTeamsForVoting();
}

function revealTeamsForVoting() {
    const container = document.getElementById('t-teams-container');
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

    document.querySelectorAll('.t-ans-btn').forEach(btn => {
        btn.onclick = function() {
            if (tState.locked) return; 
            this.blur(); 
            const tid = parseInt(this.dataset.tid);
            const team = tTeams.find(x => x.id === tid);
            if (team.isEliminated) return;

            team.answer = this.dataset.opt;
            const parent = this.parentElement;
            parent.querySelectorAll('.t-ans-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');

            if(tState.isDuel && !tState.isDuelFinished) {
                evaluateDuel(team, this.dataset.opt, this);
            }
        };
    });

    document.getElementById('btn-t-reveal').classList.remove('is-hidden');
}

function startTournamentTimer(time) {
    let timeLeft = time;
    const display = document.getElementById('t-timer-display');
    display.textContent = timeLeft;
    display.style.color = "#00d2ff";
    
    clearInterval(tState.timerInterval);
    tState.timerInterval = setInterval(() => {
        if(isGlobalPaused) return; 
        if(tState.skipTimer) timeLeft = 0; 
        else timeLeft--; 
        
        display.textContent = timeLeft;
        if(timeLeft <= 10 && timeLeft > 0) display.style.color = "#ef4444";
        
        if(timeLeft <= 0) { 
            clearInterval(tState.timerInterval); 
            stopSound(sfx.bgm); playSound(sfx.tick);
            
            document.getElementById('btn-t-skip-timer').classList.add('is-hidden');
            tState.locked = false; 
            
            document.getElementById('cards-overlay').classList.remove('is-hidden'); 
        }
    }, 1000);
}

document.getElementById('btn-t-reveal').onclick = () => {
    document.getElementById('btn-t-reveal').classList.add('is-hidden');
    tState.locked = true; 
    tState.isEvaluating = true;
    playSound(sfx.drum);

    setTimeout(() => {
        stopSound(sfx.drum);
        evaluateTournamentAnswers();
    }, 2000);
};

function showFloatingPoint(parentCard, text, color) {
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
    
    document.getElementById(`t-opt-${correctLetter}`).classList.add('highlight-correct');
    
    let anyoneCorrect = false;

    tTeams.forEach(t => {
        const card = document.getElementById(`t-card-${t.id}`);
        const btnGroup = document.getElementById(`t-ans-group-${t.id}`);
        
        if (t.answer === correctLetter) {
            anyoneCorrect = true;
            
            let earnedPoints = basePoints;
            if (t.isOnFire) earnedPoints += 50; 
            
            t.score += earnedPoints;
            t.consecutive++;
            
            if (t.consecutive >= 4) t.isOnFire = true; 
            
            showFloatingPoint(card, `+${earnedPoints}`, "#22c55e");
            card.classList.add('correct-glow');
            btnGroup.querySelector(`[data-opt="${t.answer}"]`).classList.add('correct');
            
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
            btnGroup.querySelector(`[data-opt="${t.answer}"]`).classList.add('wrong');
            btnGroup.querySelector(`[data-opt="${correctLetter}"]`).classList.add('correct');
        }
    });

    if (anyoneCorrect) playSound(sfx.correct); else playSound(sfx.wrong);

    setTimeout(() => {
        if (tState.index === 3 || tState.index === 7 || tState.index === 9) {
            showIntermediateLeaderboard();
        } else if (tState.index < 9) {
            tState.index++;
            document.getElementById('btn-t-next').classList.remove('is-hidden');
        }
    }, 3500); 
}

function showIntermediateLeaderboard() {
    switchScene(scenes.tournamentQuiz, document.getElementById('scene-intermediate-leaderboard'));
    const list = document.getElementById('inter-leaderboard-list');
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

    if (tState.index === 9) {
        document.getElementById('btn-inter-continue').textContent = "ŞAMPİYONU BELİRLE!";
    } else {
        document.getElementById('btn-inter-continue').textContent = "YARIŞMAYA DEVAM ET";
    }
}

document.getElementById('btn-inter-continue').onclick = () => {
    if (tState.index === 9) {
        switchScene(document.getElementById('scene-intermediate-leaderboard'), scenes.tournamentQuiz);
        let maxScore = Math.max(...tTeams.map(t => t.score));
        tState.tiedTeams = tTeams.filter(t => t.score === maxScore);

        if (tState.tiedTeams.length === 1) {
            endTournament(`${tState.tiedTeams[0].name} ŞAMPİYON OLDU!`, tState.tiedTeams[0].score);
        } else if (tState.tiedTeams.length > 1) {
            document.getElementById('t-question-number').textContent = "ŞAMPİYONLUK DÜELLOSU";
            document.getElementById('t-question-number').style.color = "#f59e0b";
            document.getElementById('t-question-points').textContent = "";
            document.getElementById('t-question-text').textContent = "Puanlar Eşit! Şampiyonu belirlemek için Düello Modu'nu başlatın.";
            
            document.getElementById('t-options-display').style.display = "none";
            document.getElementById('t-teams-container').classList.add('is-hidden');
            
            document.getElementById('btn-t-skip-timer').classList.add('is-hidden');
            document.getElementById('t-timer-label').classList.add('is-hidden');
            document.getElementById('t-timer-display').classList.add('is-hidden');
            document.getElementById('t-status-text').classList.add('is-hidden');
            
            document.getElementById('btn-t-duel-start').classList.remove('is-hidden');
        }
    } else {
        tState.index++;
        switchScene(document.getElementById('scene-intermediate-leaderboard'), scenes.tournamentQuiz);
        renderTournamentQuestion();
    }
};

document.getElementById('btn-t-next').onclick = () => { renderTournamentQuestion(); };

// --- BÜYÜK DÜELLO MANTIĞI ---
document.getElementById('btn-t-duel-start').onclick = async () => {
    tState.isDuel = true;
    document.getElementById('scene-tournament-quiz').classList.add('duel-mode-active');
    
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

function renderDuelQuestion() {
    if(document.activeElement) document.activeElement.blur(); 

    const q = tState.questions[0];
    tState.locked = false; 
    tState.isDuelFinished = false;
    
    document.getElementById('t-question-number').textContent = "DÜELLO MODU";
    document.getElementById('t-question-number').style.color = "#f59e0b";
    document.getElementById('t-question-points').textContent = "";
    document.getElementById('t-question-text').textContent = q.question;
    
    document.getElementById('btn-t-skip-timer').classList.add('is-hidden'); 
    document.getElementById('t-timer-label').classList.add('is-hidden');
    document.getElementById('t-timer-display').classList.add('is-hidden');
    document.getElementById('t-status-text').classList.remove('is-hidden');
    
    document.getElementById('btn-t-reveal').classList.add('is-hidden');
    document.getElementById('btn-t-duel-start').classList.add('is-hidden');
    document.getElementById('cards-overlay').classList.add('is-hidden');

    const optsDiv = document.getElementById('t-options-display');
    optsDiv.style.display = "grid";
    document.getElementById('t-opt-A').innerHTML = `A) <span>${q.answerOptions[0].text}</span>`;
    document.getElementById('t-opt-B').innerHTML = `B) <span>${q.answerOptions[1].text}</span>`;
    document.getElementById('t-opt-C').innerHTML = `C) <span>${q.answerOptions[2].text}</span>`;
    document.getElementById('t-opt-D').innerHTML = `D) <span>${q.answerOptions[3].text}</span>`;
    document.querySelectorAll('.t-main-opt').forEach(opt => opt.classList.remove('highlight-correct'));

    const container = document.getElementById('t-teams-container');
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

    document.querySelectorAll('.t-ans-btn').forEach(btn => {
        btn.onclick = function() {
            if (tState.locked || isGlobalPaused) return; 
            this.blur(); 
            const tid = parseInt(this.dataset.tid);
            const team = tState.tiedTeams.find(x => x.id === tid);
            evaluateDuel(team, this.dataset.opt, this);
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
            document.getElementById(`t-opt-${correctLetter}`).classList.add('highlight-correct');
            tState.isDuelFinished = true;
            btnElement.classList.add('correct');
            card.classList.add('correct-glow');
            setTimeout(() => endTournament(`${team.name} DÜELLOYU KAZANDI!`, team.score), 2500);
        } else {
            btnElement.classList.add('wrong');
            card.classList.add('wrong-glow');
            team.isEliminated = true; 
            playSound(sfx.wrong);
            
            setTimeout(() => {
                card.style.opacity = "0.3"; 
                card.style.pointerEvents = "none";
                
                const activeTeams = tState.tiedTeams.filter(t => !t.isEliminated);
                if (activeTeams.length === 1) {
                    document.getElementById(`t-opt-${correctLetter}`).classList.add('highlight-correct');
                    tState.isDuelFinished = true;
                    endTournament(`${activeTeams[0].name} AYAKTA KALDI VE ŞAMPİYON OLDU!`, activeTeams[0].score);
                } else if (activeTeams.length === 0) {
                    document.getElementById(`t-opt-${correctLetter}`).classList.add('highlight-correct');
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
    
    document.getElementById('scene-tournament-quiz').classList.remove('duel-mode-active');
    const quizEndEl = document.getElementById('quiz-end');
    document.getElementById('scene-tournament-quiz').appendChild(quizEndEl);
    
    quizEndEl.classList.remove('is-hidden');
    document.getElementById('quiz-end-title').textContent = msg;
    
    if (scoreStr !== undefined) {
        document.getElementById('quiz-end-score').textContent = `Şampiyonluk Puanı: ${scoreStr}`;
    } else {
        document.getElementById('quiz-end-score').textContent = "";
    }
    
    document.getElementById('quiz-end-time').textContent = "";
    document.getElementById('btn-show-leaderboard').style.display = "none"; 
}

// --- 8. YASAL ZORUNLULUKLAR VE ÇEREZ YÖNETİMİ ---
const cookieBanner = document.getElementById('cookie-consent');
const btnAcceptCookies = document.getElementById('btn-accept-cookies');

if (!localStorage.getItem('fenupx_cookie_consent')) {
    setTimeout(() => {
        cookieBanner.classList.remove('is-hidden');
    }, 1500);
}

btnAcceptCookies.onclick = () => {
    localStorage.setItem('fenupx_cookie_consent', 'accepted');
    cookieBanner.style.opacity = '0';
    setTimeout(() => { cookieBanner.classList.add('is-hidden'); }, 500);
};

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
    if(isGlobalPaused === false && (scenes.quiz.classList.contains('is-hidden') === false || scenes.tournamentQuiz.classList.contains('is-hidden') === false)) {
        toggleMasterPause(); 
    }
    
    modalTitle.textContent = policies[policyKey].title;
    modalBody.innerHTML = policies[policyKey].content;
    policyModal.classList.remove('is-hidden');
}

btnCloseModal.onclick = () => { policyModal.classList.add('is-hidden'); };

policyModal.onclick = (e) => { 
    if (e.target === policyModal) policyModal.classList.add('is-hidden'); 
};

// Hem footer'daki hem menüdeki butonlara bağlamak için class selector kullanıldı
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

// KÜFÜR FİLTRESİ (Demir Yumruk v6 - Kök Kelime ve Tam Engel)
function uygunIsimMi(metin) {
    if(!metin || metin.length < 2) return false;
    
    // AŞAMA 1: Tam eşleşme kontrolü (Kısa kelimeler)
    const kelimeler = metin.toLowerCase().split(/[\s\.\-_,\*!@#\$%\^&\(\)\[\]\{\}\\\/]+/);
    const kisaYasaklilar = ["mal", "it", "oc", "pic", "pij", "sik", "s1k", "amk", "aq", "sg", "göt"];
    for(let k of kelimeler) {
        if(kisaYasaklilar.includes(k)) return false;
    }

    // AŞAMA 2: Harf oyunları (leetspeak), boşluk silme
    let clean = metin.toLowerCase().replace(/[\s\.\-_,\*!@#\$%\^&\(\)\[\]\{\}\\\/]/g, '');
    clean = clean.replace(/[1iı|!]/g, 'i').replace(/[0oö]/g, 'o').replace(/[3e]/g, 'e').replace(/[4a@]/g, 'a').replace(/[5sş$]/g, 's').replace(/[7t]/g, 't').replace(/[cç]/g, 'c').replace(/[gğ]/g, 'g').replace(/[uü]/g, 'u');
    clean = clean.replace(/(.)\1+/g, '$1');

    // AŞAMA 3: Gelişmiş Kök Filtresi (Bu kökler kelimenin neresinde geçerse geçsin engeller)
    const uzunYasaklilar = /siktir|skik|sikik|orosp|orosb|yarrak|yarak|gavat|kahpe|qehpe|ibne|yavsak|amcik|pezevenk|godo|kuzi|kusk|kusbeyin|gerizekal|ahmak|salak|aptal|nigg|whore|slut|pussy|cock|fuck|bitch|shit|asshole|cunt|dick|esek|eshek|kopek|inek|okuz|piclik|pij|pislik|serefsiz|göt|g0t/i;
    
    return !uzunYasaklilar.test(clean);
}

// Firebase Hata Çevirici
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

// Şifre Gizle/Göster Dinleyicisi (Event Delegation)
document.body.addEventListener('click', (e) => {
    if(e.target && e.target.id === 'toggle-pass') {
        const passInput = document.getElementById('student-pass');
        if(passInput) {
            if(passInput.type === "password") {
                passInput.type = "text";
                e.target.classList.replace('fa-eye', 'fa-eye-slash');
                e.target.style.color = '#00d2ff';
            } else {
                passInput.type = "password";
                e.target.classList.replace('fa-eye-slash', 'fa-eye');
                e.target.style.color = '#aaa';
            }
        }
    }
});

// Öğrenci Kayıt HTML Değişikliği (Uyarı İkonlu Nickname ve Şifre Göz İkonu)
const studentPane = document.getElementById('student-auth');
if (studentPane) {
    // Sadece mevcut nickname ve password inputlarını düzenliyoruz
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
        
        <button id="btn-student-submit" class="f-btn f-btn-ana" style="width:100%; margin-top:5px;">GİRİŞ YAP</button>
        <p style="color: #aaa; margin-top: 15px; font-size: 0.9rem;">
            <span id="student-toggle-text">Hesabın yok mu?</span> 
            <a href="#" id="student-toggle-link" style="color: var(--neon-blue); text-decoration: none;">Hemen Üye Ol</a>
        </p>
    `;
}

// --- PROFİL MODALI DİNAMİK OLARAK EKLENİYOR ---
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

// Avatar Seçim Alanını Aç/Kapat
document.getElementById('btn-open-avatar-selector').onclick = () => {
    document.getElementById('avatar-selector-container').classList.toggle('is-hidden');
};

// Avatar Seçimini Doldur
const avatarContainer = document.getElementById('avatar-selector');
kozmikAvatarlar.forEach(av => {
    const img = document.createElement('img');
    img.src = av.url; img.className = "avatar-item"; img.dataset.url = av.url;
    img.onclick = () => {
        document.querySelectorAll('.avatar-item').forEach(i => i.classList.remove('selected'));
        img.classList.add('selected');
        document.getElementById('p-current-avatar').src = av.url;
        document.getElementById('avatar-selector-container').classList.add('is-hidden'); 
    };
    avatarContainer.appendChild(img);
});

// Kullanıcı Oturum Dinleyicisi
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const userAvatar = userData.avatar || kozmikAvatarlar[0].url;
            const fullAd = `${userData.name} ${userData.surname}`;
            
            // SAĞ ÜST İSİM KONTROLÜ (NICKNAME YERİNE AD)
            btnUyelik.innerHTML = `<img src="${userAvatar}" class="profile-img-header"> ${userData.name}`;
            userDisplayName.textContent = fullAd;
            userDisplayRole.textContent = userData.role === 'teacher' ? 'Öğretmen' : (userData.role === 'admin' ? 'Sistem Yöneticisi' : 'Öğrenci');
            
            if(userData.role === 'teacher' || userData.role === 'admin') {
                document.getElementById('btn-teacher-tools').classList.remove('is-hidden');
            }
            if(userData.role === 'admin') {
                document.getElementById('btn-admin-panel').classList.remove('is-hidden');
            }
            
            btnUyelik.onclick = (e) => {
                e.stopPropagation(); 
                profileDropdown.classList.toggle('is-hidden');
            };

            // Profil Modalındaki alanları doldur
            document.getElementById('p-name').value = userData.name;
            document.getElementById('p-surname').value = userData.surname;
            document.getElementById('p-nickname').value = userData.nickname || '';
            document.getElementById('p-current-avatar').src = userAvatar;
            document.querySelectorAll('.avatar-item').forEach(i => i.classList.remove('selected'));
            const aItem = document.querySelector(`.avatar-item[data-url="${userAvatar}"]`);
            if(aItem) aItem.classList.add('selected');

        } else {
            if (sessionStorage.getItem('google_auth_in_progress') === 'true') {
                return;
            } else {
                try { await user.delete(); } catch(e) { await signOut(auth); }
                btnUyelik.innerHTML = `Giriş Yap / Üye Ol`;
                btnUyelik.onclick = () => { 
                    if(isGlobalPaused === false && (!scenes.quiz.classList.contains('is-hidden') || !scenes.tournamentQuiz.classList.contains('is-hidden'))) { toggleMasterPause(); }
                    authModal.classList.remove('is-hidden'); 
                };
            }
        }
    } else {
        btnUyelik.innerHTML = `Giriş Yap / Üye Ol`;
        btnUyelik.onclick = () => { 
            if(isGlobalPaused === false && (!scenes.quiz.classList.contains('is-hidden') || !scenes.tournamentQuiz.classList.contains('is-hidden'))) { toggleMasterPause(); }
            authModal.classList.remove('is-hidden'); 
        };
        profileDropdown.classList.add('is-hidden');
        document.getElementById('btn-admin-panel').classList.add('is-hidden');
    }
});

// Sayfada boş bir yere tıklayınca profil menüsünü kapat
document.addEventListener('click', () => {
    if(profileDropdown && !profileDropdown.classList.contains('is-hidden')) {
        profileDropdown.classList.add('is-hidden');
    }
});
if(profileDropdown) {
    profileDropdown.onclick = (e) => e.stopPropagation();
}

document.getElementById('btn-logout').onclick = () => signOut(auth).then(() => location.reload());

if(btnCloseAuth) {
    btnCloseAuth.onclick = () => { authModal.classList.add('is-hidden'); };
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
        document.getElementById(btn.dataset.target).classList.remove('is-hidden');
    };
});

// Kayıt Ol / Giriş Yap Modu Geçiş Mantığı
let isStudentLoginMode = true; // Varsayılan Giriş Yap ekranı
document.getElementById('student-toggle-link').onclick = (e) => {
    e.preventDefault();
    isStudentLoginMode = !isStudentLoginMode;
    document.getElementById('student-auth-title').textContent = isStudentLoginMode ? "Öğrenci Girişi" : "Öğrenci Kaydı";
    document.getElementById('btn-student-submit').textContent = isStudentLoginMode ? "GİRİŞ YAP" : "KAYIT OL";
    document.getElementById('student-toggle-text').textContent = isStudentLoginMode ? "Hesabın yok mu?" : "Zaten hesabın var mı?";
    document.getElementById('student-toggle-link').textContent = isStudentLoginMode ? "Hemen Üye Ol" : "Giriş Yap";
    
    const regFields = document.getElementById('register-fields');
    if (regFields) {
        if (isStudentLoginMode) {
            regFields.classList.add('is-hidden');
            regFields.style.display = 'none';
        } else {
            regFields.classList.remove('is-hidden');
            regFields.style.display = 'flex';
        }
    }
};

// --- PROFİLİM BUTONU MANTIĞI ---
document.querySelectorAll('.dropdown-item').forEach(item => {
    if (item.textContent.includes("Profilim")) {
        item.onclick = (e) => {
            e.stopPropagation();
            profileDropdown.classList.add('is-hidden');
            profileModal.classList.remove('is-hidden');
        };
    }
});

document.getElementById('close-profile').onclick = () => { profileModal.classList.add('is-hidden'); };

// Profil Güncelleme
document.getElementById('btn-save-profile').onclick = async () => {
    const user = auth.currentUser;
    const name = document.getElementById('p-name').value.trim();
    const surname = document.getElementById('p-surname').value.trim();
    const nickname = document.getElementById('p-nickname').value.trim();
    const avatar = document.getElementById('p-current-avatar').src;

    if(!name || !surname || !nickname) return alert("Ad, soyad ve kullanıcı adı alanları boş bırakılamaz.");
    if(!uygunIsimMi(name) || !uygunIsimMi(surname) || !uygunIsimMi(nickname)) return alert("Uygunsuz kelime kullanımı tespit edildi. Lütfen kırıcı veya argo içermeyen kelimeler kullanın.");
    
    try {
        await updateDoc(doc(db, "users", user.uid), { name, surname, nickname, avatar });
        alert("Profilin başarıyla güncellendi kaptan!");
        location.reload();
    } catch(err) {
        alert("Hata: " + err.message);
    }
};

// Hesabı Silme (KVKK Uyumu)
document.getElementById('btn-delete-account').onclick = async () => {
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

// --- ÖĞRENCİ KAYIT & GİRİŞ ---
document.getElementById('btn-student-submit').onclick = async () => {
    const email = document.getElementById('student-email').value;
    const pass = document.getElementById('student-pass').value;
    
    if(!email || !pass) return alert("Lütfen gerekli alanları doldurun.");

    try {
        if(isStudentLoginMode) {
            await signInWithEmailAndPassword(auth, email, pass);
            authModal.classList.add('is-hidden');
        } else {
            const fName = document.getElementById('student-first-name')?.value.trim();
            const lName = document.getElementById('student-last-name')?.value.trim();
            const nick = document.getElementById('student-reg-nickname')?.value.trim();
            
            if(!fName || !lName || !nick) return alert("Lütfen Ad, Soyad ve Liderlik Tablosu Adı alanlarını doldurun.");
            if(!uygunIsimMi(fName) || !uygunIsimMi(lName) || !uygunIsimMi(nick)) return alert("Uygunsuz kelime kullanımı tespit edildi. Lütfen küfür veya argo içermeyen isimler kullanın.");
            
            const cred = await createUserWithEmailAndPassword(auth, email, pass);
            await setDoc(doc(db, "users", cred.user.uid), {
                name: fName, surname: lName, nickname: nick, email: email, role: "student", totalScore: 0, isBanned: false, avatar: kozmikAvatarlar[0].url, createdAt: new Date()
            });
            authModal.classList.add('is-hidden');
            alert(`Hoş geldin ${fName}! Kozmik maceraya hazırsın.`);
        }
    } catch(err) { 
        alert("İşlem Hatası: " + getAuthErrorMessage(err.code)); 
    }
};

// --- GOOGLE İLE GİRİŞ ---
document.getElementById('btn-google-login').onclick = async () => {
    sessionStorage.setItem('google_auth_in_progress', 'true');
    
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const userRef = doc(db, "users", result.user.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
            document.getElementById('auth-modal').classList.add('is-hidden');
            
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
            document.getElementById('auth-modal').classList.add('is-hidden');
        }
    } catch(err) { 
        sessionStorage.removeItem('google_auth_in_progress'); 
        alert("Google Hatası: Pencereyi erken kapattınız veya bir sorun oluştu."); 
    }
};

// --- ADMIN PANELİ MANTIĞI ---
const btnAdminPanel = document.getElementById('btn-admin-panel');
const adminModal = document.getElementById('admin-modal');
const btnCloseAdmin = document.getElementById('btn-close-admin');
const adminUserList = document.getElementById('admin-user-list');
const adminSearchInput = document.getElementById('admin-search-input');
let allAdminUsers = [];

btnAdminPanel.onclick = (e) => {
    e.stopPropagation();
    profileDropdown.classList.add('is-hidden');
    adminModal.classList.remove('is-hidden');
    loadAdminUsers();
};

btnCloseAdmin.onclick = () => { adminModal.classList.add('is-hidden'); };
adminModal.onclick = (e) => { if (e.target === adminModal) adminModal.classList.add('is-hidden'); };

adminSearchInput.oninput = (e) => { renderAdminUsers(e.target.value); };

async function loadAdminUsers() {
    adminUserList.innerHTML = '<p style="text-align:center; color:#aaa; margin-top:20px;">Kullanıcılar yükleniyor...</p>';
    try {
        const q = collection(db, "users");
        const snap = await getDocs(q);
        allAdminUsers = [];
        snap.forEach(docSnap => {
            const data = docSnap.data();
            // Kendini (admini) listeden gizleyen satır:
            if (data.role !== 'admin') {
                allAdminUsers.push({ id: docSnap.id, ...data });
            }
        });
        
        allAdminUsers.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));
        renderAdminUsers();
    } catch(e) {
        adminUserList.innerHTML = '<p style="color:#ef4444; text-align:center;">Kullanıcılar yüklenirken bir hata oluştu.</p>';
    }
}

function renderAdminUsers(filterText = '') {
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
                <i class="fas fa-star" style="color:#f59e0b;"></i> ${u.totalScore || 0} Puan
            </div>
            <div class="admin-actions">
                ${isBanned 
                    ? `<button class="btn-unban" data-uid="${u.id}"><i class="fas fa-check-circle"></i> Engeli Kaldır</button>`
                    : `<button class="btn-ban" data-uid="${u.id}"><i class="fas fa-ban"></i> Blokla</button>`
                }
            </div>
        `;
        adminUserList.appendChild(row);
    });

    document.querySelectorAll('.btn-ban').forEach(btn => {
        btn.onclick = () => toggleBanStatus(btn.dataset.uid, true);
    });
    document.querySelectorAll('.btn-unban').forEach(btn => {
        btn.onclick = () => toggleBanStatus(btn.dataset.uid, false);
    });
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
        renderAdminUsers(adminSearchInput.value); 
    } catch(e) {
        alert("Hata oluştu: " + e.message);
    }
}