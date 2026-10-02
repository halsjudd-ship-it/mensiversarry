// ================================
// 🔐 PASSWORD GATE
// ================================
const CORRECT_PASSWORD = "KAIA";

document.addEventListener('DOMContentLoaded', function() {
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

// Enter untuk submit password
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('passwordInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkPassword();
        });
        input.focus();
    }
});

// ================================
// 🎵 MUSIC TOGGLE
// ================================
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

// ================================
// 📖 SLIDE NAVIGATION SYSTEM
// ================================
let currentSlide = 0;
const totalSlides = 7; // Slide 0 sampai 6

function initSlideDots() {
    const dotsContainer = document.getElementById('slideDots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.dataset.slide = i;
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

function updateSlideUI() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nav = document.getElementById('slideNav');
    const footer = document.querySelector('.mini-footer');
    
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    
    if (nextBtn) {
        if (currentSlide === totalSlides - 1) {
            nextBtn.style.opacity = '0.3';
            nextBtn.disabled = true;
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.disabled = false;
        }
    }
    
    if (nav) {
        if (currentSlide === 0) {
            nav.classList.add('hidden');
        } else {
            nav.classList.remove('hidden');
        }
    }
    
    if (footer) {
        if (currentSlide === 0) {
            footer.classList.remove('hidden');
        } else {
            footer.classList.add('hidden');
        }
    }
}

function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
    updateSlideUI();
    
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide) activeSlide.scrollTop = 0;
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

// ⌨️ Keyboard navigation
document.addEventListener('keydown', function(e) {
    const gate = document.getElementById('passwordGate');
    if (gate && !gate.classList.contains('unlocked')) return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
    }
});

// 👆 Touch swipe untuk mobile
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const gate = document.getElementById('passwordGate');
    if (gate && !gate.classList.contains('unlocked')) return;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
}

// ================================
// 🌸 FALLING PETALS
// ================================
function createPetals() {
    const petals = ['🌸', '🌷', '🌺', '💮', '🌼'];
    const totalPetals = 10;
    
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

// ================================
// 🎯 CUSTOM HEART CURSOR
// ================================
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

// ================================
// ✨ TYPING EFFECT
// ================================
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

// ================================
// 📸 DOWNLOAD SEMUA FOTO
// ================================
function downloadAllPhotos() {
    const photos = [
        { path: 'assets/foto1.jpg', name: 'Bukti-Judd-Sayang-Kaia.jpg' },
        { path: 'assets/foto2.jpg', name: 'K-dan-J.jpg' },
        { path: 'assets/foto3.jpg', name: 'Day-One-Becomes-US.jpg' },
        { path: 'assets/foto4.jpg', name: 'Si-Cantik-Pemakan-Segala.jpg' },
        { path: 'assets/foto5.jpg', name: 'Bocah-Minum-Apaan.jpg' },
        { path: 'assets/foto6.jpg', name: 'Bidadari-Dari-Mana.jpg' }
    ];
    
    const btn = document.querySelector('.download-all-btn');
    const originalText = btn.textContent;
    
    btn.disabled = true;
    btn.textContent = '⏳ Mengunduh...';
    
    let completed = 0;
    
    photos.forEach((photo, index) => {
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = photo.path;
            link.download = photo.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            completed++;
            btn.textContent = `⏳ ${completed}/${photos.length} foto...`;
            
            if (completed === photos.length) {
                setTimeout(() => {
                    btn.disabled = false;
                    btn.textContent = '✅ Semua Terunduh!';
                    
                    setTimeout(() => {
                        btn.textContent = originalText;
                    }, 3000);
                }, 500);
            }
        }, index * 500);
    });
}

// ================================
// 🚀 INIT ALL
// ================================
document.addEventListener('DOMContentLoaded', function() {
    createPetals();
    createHeartCursor();
    typeWriter();
    initSlideDots();
    updateSlideUI();
    
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});