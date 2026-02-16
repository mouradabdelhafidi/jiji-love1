/* ═══════════════════════════════════════════════════
   💕 LOVE MESSAGE - INTERACTIVE MAGIC
   For Jiji ❤️
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initFloatingElements();
    initScrollReveal();
    initScrollToTop();
    initCursorHearts();
    initSmoothScroll();
    initLanguageToggle();
});

/* ─── GLOWING PARTICLES ──────────────────────── */
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 8 + 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 5) + 's';

        const colors = [
            'rgba(233,30,99,0.25)',
            'rgba(244,143,177,0.3)',
            'rgba(252,228,236,0.4)',
            'rgba(248,187,208,0.35)',
            'rgba(183,110,121,0.2)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = `radial-gradient(circle, ${color}, transparent)`;

        container.appendChild(particle);
    }
}

/* ─── FLOATING HEARTS & ROSES ────────────────── */
function initFloatingElements() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    const emojis = ['❤️', '💕', '🌹', '💗', '🩷', '🎀', '❤️', '💕', '🌹', '💗'];

    function createFloatingItem() {
        const item = document.createElement('div');
        item.classList.add('float-item');
        item.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        item.style.left = Math.random() * 100 + '%';
        item.style.fontSize = (Math.random() * 18 + 14) + 'px';

        const duration = Math.random() * 8 + 8;
        item.style.animationDuration = duration + 's';
        item.style.opacity = Math.random() * 0.4 + 0.2;

        container.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, duration * 1000);
    }

    // Create initial batch
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createFloatingItem(), Math.random() * 3000);
    }

    // Continue creating
    setInterval(createFloatingItem, 2000);
}

/* ─── CURSOR HEART TRAIL ─────────────────────── */
function initCursorHearts() {
    const hearts = ['❤️', '💕', '💗', '🩷', '🌹'];
    let lastTime = 0;
    const throttle = 120;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTime < throttle) return;
        lastTime = now;

        const heart = document.createElement('div');
        heart.classList.add('cursor-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1000);
    });
}

/* ─── SCROLL REVEAL ANIMATION ────────────────── */
function initScrollReveal() {
    const elements = document.querySelectorAll('[data-aos], .memory-card, .reason-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = Array.from(el.parentElement.children).indexOf(el) * 100;
                setTimeout(() => {
                    el.classList.add('visible');
                }, delay);
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ─── SCROLL TO TOP BUTTON ───────────────────── */
function initScrollToTop() {
    const btn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ─── SMOOTH SCROLL FOR ANCHOR LINKS ─────────── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ─── LANGUAGE TOGGLE (EN ↔ AR) ──────────────── */
function initLanguageToggle() {
    const langBtn = document.getElementById('lang-toggle');
    const langLabel = document.getElementById('lang-label');
    let currentLang = 'en';

    langBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';

        // Update HTML dir and lang attributes
        document.documentElement.lang = currentLang === 'ar' ? 'ar' : 'en';
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        // Update toggle button label
        langLabel.textContent = currentLang === 'ar' ? 'English' : 'عربي';

        // Switch all translatable text
        document.querySelectorAll('[data-en][data-ar]').forEach(el => {
            const text = el.getAttribute(`data-${currentLang}`);
            if (text) {
                el.innerHTML = text;
            }
        });

        // Add/remove Arabic body class for font adjustments
        document.body.classList.toggle('arabic-mode', currentLang === 'ar');
    });
}

/* ─── WELCOME OVERLAY & MUSIC ────────────────── */
(function initWelcomeAndMusic() {
    const overlay = document.getElementById('welcome-overlay');
    const enterBtn = document.getElementById('enter-btn');
    const musicBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');

    let musicPlaying = false;

    // Lock scrolling while welcome overlay is visible
    if (overlay) {
        document.body.style.overflow = 'hidden';
    }

    function playMusic() {
        if (audio && !musicPlaying) {
            audio.volume = 0.5;
            audio.play().then(() => {
                musicPlaying = true;
                musicBtn.classList.add('playing');
            }).catch(err => {
                console.log('Music autoplay blocked:', err);
            });
        }
    }

    function toggleMusic() {
        if (!audio) return;
        if (musicPlaying) {
            audio.pause();
            musicPlaying = false;
            musicBtn.classList.remove('playing');
        } else {
            audio.play().then(() => {
                musicPlaying = true;
                musicBtn.classList.add('playing');
            }).catch(err => {
                console.log('Music play failed:', err);
            });
        }
    }

    // Enter button — start music & hide overlay, unlock scroll
    if (enterBtn && overlay) {
        enterBtn.addEventListener('click', function () {
            playMusic();
            overlay.classList.add('fade-out');
            // Restore scrolling
            document.body.style.overflow = '';
            setTimeout(() => overlay.remove(), 900);
        });
    }

    // Music toggle button
    if (musicBtn) {
        musicBtn.addEventListener('click', toggleMusic);
    }
})();

/* ─── PARALLAX-LIKE EFFECT ON HERO ───────────── */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    const scrollY = window.scrollY;

    if (hero && scrollY < window.innerHeight) {
        const moveY = scrollY * 0.3;
        const opacity = 1 - scrollY / window.innerHeight;
        hero.style.transform = `translateY(${moveY}px)`;
        hero.style.opacity = Math.max(opacity, 0);
    }
});

/* ─── LETTER CARD TILT EFFECT ────────────────── */
const letterCard = document.querySelector('.letter-card');
if (letterCard) {
    letterCard.addEventListener('mousemove', (e) => {
        const rect = letterCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        letterCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    letterCard.addEventListener('mouseleave', () => {
        letterCard.style.transform = 'rotate(-1deg)';
    });
}
