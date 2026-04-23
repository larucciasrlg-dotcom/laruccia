/* ==========================================
   NAVBAR
========================================== */
function loadNavbar() {
    return fetch('navbar.html')
        .then(res => res.text())
        .then(data => {
            const el = document.getElementById('navbar');
            if (el) {
                el.innerHTML = data;
                initMobileMenu(); // Nuova funzione
                highlightActiveLink();
            }
        });
}

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menuLinks = document.querySelector('.menu-links');
    const hasMega = document.querySelector('.has-mega');

    if (toggle) {
        toggle.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
            // Animazione icona hamburger (opzionale)
            toggle.classList.toggle('is-active'); 
        });
    }

    // Gestione click su "Prodotti" per espandere il mega menu su mobile
    if (hasMega) {
        hasMega.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                e.preventDefault(); // Impedisce il cambio pagina immediato
                hasMega.classList.toggle('open');
            }
        });
    }
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

function initNavbarScroll() {
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.85)';
            nav.style.backdropFilter = 'blur(15px)';
            nav.style.height = '70px'; // Si restringe leggermente
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'blur(0px)';
            nav.style.height = '80px';
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
    let lastYear = null;

    /* =========================
       INTERSECTION OBSERVER
    ========================= */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                // Attivazione leggermente anticipata per migliorare il feeling
                if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                    isActive = true;
                } else if (!entry.isIntersecting) {
                    isActive = false;
                }
            });
        },
        { threshold: [0.4] }
    );

    observer.observe(section);

    /* =========================
       INPUT (WHEEL & TOUCH)
    ========================= */
    function onWheel(e) {
        if (!isActive || isCompleted) return;

        // Se l'utente scrolla verso l'alto all'inizio del countdown, 
        // permette lo scroll naturale della pagina verso sopra
        if (e.deltaY < 0 && targetProgress <= 0) return;

        // Blocca lo scroll di sistema solo mentre il countdown è in corso
        e.preventDefault();

        // Incremento velocità (0.001 è più scattante di 0.0005)
        targetProgress += e.deltaY * 0.001;
        targetProgress = Math.min(Math.max(targetProgress, 0), 1);
    }

    let touchStartY = 0;
    function onTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }

    function onTouchMove(e) {
        if (!isActive || isCompleted) return;

        const delta = touchStartY - e.touches[0].clientY;
        
        // Permette di tornare su se siamo all'inizio
        if (delta < 0 && targetProgress <= 0) return;

        e.preventDefault();
        
        targetProgress += delta * 0.0015; // Velocità touch ottimizzata
        targetProgress = Math.min(Math.max(targetProgress, 0), 1);
        touchStartY = e.touches[0].clientY;
    }

    /* =========================
       LOOP DI ANIMAZIONE
    ========================= */
    function animate() {
        if (!isCompleted) {
            // Smoothing più rapido (0.1) per ridurre il senso di ritardo
            progress += (targetProgress - progress) * 0.1;

            // Impedisce al progresso visuale di tornare indietro rispetto al target
            if (targetProgress < progress) progress = targetProgress;

            /* COUNTDOWN */
            // Usiamo un ease-out cubico per un finale più naturale
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start - (start - end) * ease);

            if (current !== lastYear) {
                yearEl.textContent = current;
                lastYear = current;
            }

            /* FASI VISIVE */
            section.classList.toggle("phase-1", progress > 0.05);
            section.classList.toggle("phase-2", progress > 0.25);
            section.classList.toggle("phase-3", progress > 0.55);

            /* COMPLETAMENTO ANTICIPATO */
            // Sblocca al 98% per evitare di restare bloccati nell'ultimo millimetro di scroll
            if (progress > 0.98) {
                progress = 1;
                yearEl.textContent = end;
                isCompleted = true;
                
                // Rilascia eventuali blocchi (se presenti nel CSS)
                document.body.style.overflow = "";
            }
        }

        requestAnimationFrame(animate);
    }

    /* =========================
       LISTENER
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