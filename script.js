// 🔐 Password Gate
const CORRECT_PASSWORD = "KAIA";

// Kunci body saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('locked');
    
    // Cek apakah sudah pernah unlock (session)
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
        
        // Hapus pesan error setelah 3 detik
        setTimeout(() => error.classList.remove('show'), 3000);
    }
}

function unlockGate(silent = false) {
    const gate = document.getElementById('passwordGate');
    gate.classList.add('unlocked');
    document.body.classList.remove('locked');
    sessionStorage.setItem('unlocked', 'true');
    
    // Fokus ke konten utama setelah transisi selesai
    setTimeout(() => {
        gate.style.display = 'none';
        if (!silent) {
            // Auto play musik setelah unlock (opsional)
            const music = document.getElementById('bgMusic');
            if (music) {
                music.volume = 0.5;
                music.play().then(() => {
                    document.getElementById('musicBtn').textContent = '❚❚';
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
    if (isPlaying) {
        music.pause();
        musicBtn.textContent = '▶';
    } else {
        music.play().catch(err => console.log('Autoplay diblokir:', err));
        musicBtn.textContent = '❚❚';
    }
    isPlaying = !isPlaying;
}

// Auto-play saat user pertama kali klik di halaman (bypass autoplay policy)
document.addEventListener('click', function startOnce() {
    if (!isPlaying) {
        music.volume = 0.5;
        music.play().then(() => {
            isPlaying = true;
            musicBtn.textContent = '❚❚';
        }).catch(() => {});
    }
    document.removeEventListener('click', startOnce);
}, { once: true });

// 🎬 Animasi scroll sederhana (fade-in)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('section:not(.hero)').forEach(sec => {
    sec.style.opacity = '0';
    sec.style.transform = 'translateY(40px)';
    sec.style.transition = 'all 1s ease';
    observer.observe(sec);
});

// 📅 Tahun otomatis di footer
document.getElementById('year').textContent = new Date().getFullYear();