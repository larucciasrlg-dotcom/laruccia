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
    let isLocked = false;

    let lastYear = null;

    /* =========================
       INTERSECTION OBSERVER (SUPER SMOOTH)
    ========================= */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                // attiva SOLO quando è ben dentro viewport
                if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                    isActive = true;
                }
            });
        },
        {
            threshold: [0.6]
        }
    );

    observer.observe(section);

    /* =========================
       LOCK SCROLL
    ========================= */
    function lockScroll() {
        if (isLocked) return;
        document.body.style.overflow = "hidden";
        isLocked = true;
    }

    function unlockScroll() {
        document.body.style.overflow = "";
        isLocked = false;
    }

    /* =========================
       INPUT
    ========================= */
    function onWheel(e) {
        if (!isActive || isCompleted) return;

        lockScroll();
        e.preventDefault();

  // 👉 IGNORA SCROLL VERSO L'ALTO
if (e.deltaY < 0) return;

targetProgress += e.deltaY * 0.0005;
        targetProgress = Math.min(Math.max(targetProgress, 0), 1);
    }

    let touchStartY = 0;

    function onTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e) {
        if (!isActive || isCompleted) return;

        lockScroll();

        const delta = touchStartY - e.touches[0].clientY;
        // 👉 IGNORA SCROLL VERSO L'ALTO
if (delta < 0) return;

targetProgress += delta * 0.0009;

        targetProgress = Math.min(Math.max(targetProgress, 0), 1);

        touchStartY = e.touches[0].clientY;

        e.preventDefault();
    }

    /* =========================
       LOOP OTTIMIZZATO
    ========================= */
    function animate() {

        if (!isCompleted) {
            // smoothing più preciso
            progress += (targetProgress - progress) * 0.05;
        }

        // NON PERMETTE MAI DI TORNARE INDIETRO
if (targetProgress < progress) {
    targetProgress = progress;
}

        /* COUNTDOWN */
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start - (start - end) * ease);

        // 👉 aggiorna DOM SOLO se cambia
        if (current !== lastYear) {
            yearEl.textContent = current;
            lastYear = current;
        }

        /* FASI */
        section.classList.toggle("phase-1", progress > 0.05);
        section.classList.toggle("phase-2", progress > 0.25);
        section.classList.toggle("phase-3", progress > 0.55);

        /* COMPLETAMENTO */
        if (progress >= 0.999 && !isCompleted) {
            progress = 1;
            yearEl.textContent = end;
            isCompleted = true;

            unlockScroll();

            window.scrollBy({
                top: 60,
                behavior: "smooth"
            });
        }

        requestAnimationFrame(animate);
    }

    /* =========================
       EVENTI PASSIVI OTTIMI
    ========================= */
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