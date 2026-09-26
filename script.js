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