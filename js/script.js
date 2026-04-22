/* ==========================================
   NAVBAR
========================================== */
function loadNavbar() {
    return fetch('navbar.html')
        .then(res => res.text())
        .then(data => {
            const el = document.getElementById('navbar');
            if (el) el.innerHTML = data;
            highlightActiveLink();
        });
}

function highlightActiveLink() {
    const links = document.querySelectorAll('.menu a');
    const current = location.pathname.split("/").pop() || 'index.html';

    links.forEach(link => {
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

/* ==========================================
   HERO SLIDER
========================================== */
function initHeroSlider() {
    const hero = document.querySelector('.modern-hero-slider');
    if (!hero) return;

    const slides = hero.querySelectorAll('.hero-slide');
    if (slides.length <= 1) return;

    let current = 0;

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 7000);
}


/* ==========================================
   HISTORY SECTION
========================================== */
function initHistorySection() {
    const section = document.querySelector(".history-section");
    const yearEl = document.getElementById("year");

    if (!section || !yearEl) return;

    const start = 2026;
    const end = 1939;

    let progress = 0;
    let targetProgress = 0;

    let isActive = false;
    let isCompleted = false;

    /* =========================
       ATTIVAZIONE AL CENTRO
    ========================= */
    function checkActivation() {
        const rect = section.getBoundingClientRect();
        const center = window.innerHeight / 2;

        if (!isActive && rect.top <= center && rect.bottom >= center) {
            isActive = true;
        }
    }

    /* =========================
       INPUT NORMALIZZATO
    ========================= */
    function onWheel(e) {
        if (!isActive || isCompleted) return;

        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;

        e.preventDefault();

        const speed = 0.0008; // più lento e stabile
        targetProgress += e.deltaY * speed;

        targetProgress = Math.min(Math.max(targetProgress, 0), 1);
    }

    let touchStartY = 0;

    function onTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e) {
        if (!isActive || isCompleted) return;

        const rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;

        const currentY = e.touches[0].clientY;
        const delta = touchStartY - currentY;

        const speed = 0.0012;
        targetProgress += delta * speed;

        targetProgress = Math.min(Math.max(targetProgress, 0), 1);

        touchStartY = currentY;

        e.preventDefault();
    }

    /* =========================
       LOOP FLUIDO (KEY!)
    ========================= */
    function animate() {
        // interpolazione smooth (elimina glitch)
        progress += (targetProgress - progress) * 0.08;

        /* COUNTDOWN */
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start - (start - end) * ease);
        yearEl.textContent = current;

        /* FASI */
        section.classList.toggle("phase-1", progress > 0.05);
        section.classList.toggle("phase-2", progress > 0.25);
        section.classList.toggle("phase-3", progress > 0.55);

        if (progress >= 0.999) {
            yearEl.textContent = end;
            isCompleted = true;
        }

        requestAnimationFrame(animate);
    }

    /* =========================
       LISTENERS
    ========================= */
    window.addEventListener("scroll", checkActivation);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    animate();
}

document.addEventListener("DOMContentLoaded", initHistorySection);
/* ==========================================
   FOOTER
========================================== */
function loadFooter() {
    fetch('footer.html')
        .then(res => res.text())
        .then(data => {
            const el = document.getElementById('footer-placeholder');
            if (el) el.innerHTML = data;
        });
}

/* ==========================================
   INIT GENERALE (UNA SOLA VOLTA!)
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    loadFooter();
    initHeroSlider();
    initHistorySection();
});