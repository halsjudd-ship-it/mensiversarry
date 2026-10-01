// 🔐 Password Gate
const CORRECT_PASSWORD = "KAIA";

// Kunci body saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('locked');
    
    if (sessionStorage.getItem('unlocked') === 'true') {
        unlockGate(true);
    }
});

function checkPassword() {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('gateError');
    const entered = input.value.trim().toUpperCase();

    if (entered === CORRECT_PASSWORD) {
        error.classList.remove('show');
        unlockGate();
    } else {
        error.textContent = "Sandi salah. Coba lagi!";
        error.classList.add('show');
        input.value = '';
        input.focus();
        setTimeout(() => error.classList.remove('show'), 3000);
    }
}

function unlockGate(silent = false) {
    const gate = document.getElementById('passwordGate');
    gate.classList.add('unlocked');
    document.body.classList.remove('locked');
    sessionStorage.setItem('unlocked', 'true');
    
    setTimeout(() => {
        gate.style.display = 'none';
        if (!silent) {
            const music = document.getElementById('bgMusic');
            if (music) {
                music.volume = 0.5;
                music.play().then(() => {
                    document.getElementById('musicBtn').textContent = '❚❚';
                    const bars = document.getElementById('musicBars');
                    if (bars) bars.classList.add('active');
                    isPlaying = true;
                }).catch(() => {});
            }
        }
    }, 800);
}

// Enter untuk submit
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('passwordInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkPassword();
        });
        input.focus();
    }
});

// 🎵 Toggle Musik Background
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

function toggleMusic() {
    const bars = document.getElementById('musicBars');
    if (isPlaying) {
        music.pause();
        musicBtn.textContent = '▶';
        if (bars) bars.classList.remove('active');
    } else {
        music.play().catch(err => console.log('Autoplay diblokir:', err));
        musicBtn.textContent = '❚❚';
        if (bars) bars.classList.add('active');
    }
    isPlaying = !isPlaying;
}

// Auto-play saat user pertama kali klik di halaman
document.addEventListener('click', function startOnce() {
    if (!isPlaying) {
        music.volume = 0.5;
        music.play().then(() => {
            isPlaying = true;
            musicBtn.textContent = '❚❚';
            const bars = document.getElementById('musicBars');
            if (bars) bars.classList.add('active');
        }).catch(() => {});
    }
    document.removeEventListener('click', startOnce);
}, { once: true });

// 🌸 Falling Petals
function createPetals() {