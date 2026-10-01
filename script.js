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
    const petals = ['🌸', '🌷', '🌺', '💮', '🌼'];
    const totalPetals = 12;
    
    for (let i = 0; i < totalPetals; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 8 + 10) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
        petal.style.opacity = Math.random() * 0.5 + 0.4;
        document.body.appendChild(petal);
    }
}

// 🎯 Custom Heart Cursor
function createHeartCursor() {
    if (window.innerWidth < 768) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'heart-cursor';
    cursor.textContent = '💕';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('click', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        setTimeout(() => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 150);
    });
}

// ✨ Typing Effect for Hero
function typeWriter() {
    const text = "Untuk Kaia,\nSelamanya";
    const element = document.getElementById('heroTitle');
    if (!element) return;
    
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(type, 80);
        } else {
            element.innerHTML += '<span class="cursor">|</span>';
        }
    }
    setTimeout(type, 500);
}

// 💫 Parallax Hero
function initParallax() {
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-content');
        if (!hero) return;
        
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight);
        }
    });
}

// 🎬 Animasi scroll (fade-in)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.15 });

// 🚀 Inisialisasi semua efek saat halaman siap
document.addEventListener('DOMContentLoaded', function() {
    createPetals();
    createHeartCursor();
    typeWriter();
    initParallax();
    
    // Fade-in sections
    document.querySelectorAll('section:not(.hero)').forEach(sec => {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(40px)';
        sec.style.transition = 'all 1s ease';
        observer.observe(sec);
    });
    
    // Tahun otomatis di footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});