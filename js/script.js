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

function scrollTrack(button, direction) {
  // Trova la traccia (track) vicina al bottone cliccato
  const track = button.parentElement.querySelector('.brand-figurine-track');
  // Calcola quanto scorrere (320px è la somma di card + gap)
  const scrollAmount = 320; 
  
  track.scrollBy({
    left: scrollAmount * direction,
    behavior: 'smooth'
  });
}


// Variabile per tenere traccia dell'ultima sezione interagita
let activeTrack = null;

function initProductCarousels() {
    const wrappers = document.querySelectorAll('.figurine-wrapper');

    wrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.brand-figurine-track');
        
        // Quando il mouse entra in una sezione, questa diventa quella "attiva" per la tastiera
        wrapper.addEventListener('mouseenter', () => {
            activeTrack = track;
        });

        // Opzionale: se l'utente clicca dentro la sezione
        wrapper.addEventListener('click', () => {
            activeTrack = track;
        });
    });
}

// ASCOLTATORE TASTIERA (Globale)
document.addEventListener('keydown', (e) => {
    // Se non abbiamo una sezione attiva, non facciamo nulla
    if (!activeTrack) return;

    const step = activeTrack.querySelector('.brand-card-mini').offsetWidth + 20;

    if (e.key === 'ArrowRight') {
        activeTrack.scrollBy({ left: step, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
        activeTrack.scrollBy({ left: -step, behavior: 'smooth' });
    }
});

// Chiamata all'inizializzazione (dentro il tuo DOMContentLoaded esistente)
document.addEventListener("DOMContentLoaded", () => {
    initProductCarousels();
    // ... altre funzioni ...
});
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
// 1. Funzione per le Frecce (Desktop)
function scrollTrack(button, direction) {
    const track = button.parentElement.querySelector('.brand-figurine-track, .carousel-track');
    if (!track) return;
    
    // Scorre di una porzione della larghezza visibile
    const scrollAmount = track.clientWidth * 0.8; 
    
    track.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

// 2. Inizializzazione Caroselli e Pallini
// Variabile globale per sapere quale track scorrere con la tastiera
let activeTrackForKeyboard = null;

function initProductCarousels() {
    const wrappers = document.querySelectorAll('.figurine-wrapper');

    wrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.brand-figurine-track');
        const dotsContainer = wrapper.querySelector('.carousel-dots');
        const items = track.querySelectorAll('.brand-card-mini');

        if (!track || items.length === 0) return;

        // 1. Creazione Pallini
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            items.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    const step = items[0].offsetWidth + 20;
                    track.scrollTo({ left: i * step, behavior: 'smooth' });
                });
                dotsContainer.appendChild(dot);
            });

            const dots = dotsContainer.querySelectorAll('.dot');

            // 2. LOGICA AGGIORNATA: Proporzione lineare per i pallini
            track.addEventListener('scroll', () => {
                const maxScrollLeft = track.scrollWidth - track.offsetWidth;
                const scrollFraction = track.scrollLeft / maxScrollLeft;
                
                // Calcoliamo l'indice in base a quanto abbiamo scorso in percentuale
                // Questo assicura che tutti i pallini vengano toccati proporzionalmente
                let currentIndex = Math.round(scrollFraction * (items.length - 1));
                
                // Sicurezza per i limiti estremi
                if (track.scrollLeft <= 5) currentIndex = 0;
                if (track.scrollLeft >= maxScrollLeft - 5) currentIndex = items.length - 1;

                dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
            });
        }

        // 3. Gestione mouse per tastiera
        wrapper.addEventListener('mouseenter', () => { activeTrackForKeyboard = track; });
        wrapper.addEventListener('mouseleave', () => { activeTrackForKeyboard = null; });
    });
}

// 4. Integrazione Frecce Tastiera (senza wheel)
document.addEventListener('keydown', (e) => {
    if (!activeTrackForKeyboard) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault(); 
        const card = activeTrackForKeyboard.querySelector('.brand-card-mini');
        const step = card.offsetWidth + 20;
        const direction = (e.key === 'ArrowRight') ? 1 : -1;
        
        activeTrackForKeyboard.scrollBy({
            left: direction * step,
            behavior: 'smooth'
        });
    }
});

// Assicurati che initProductCarousels() sia chiamata nel DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    initProductCarousels();
    // ... le tue altre funzioni (loadNavbar, ecc)
});
/* ==========================================
   INIT GENERALE
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    loadFooter();
    initHeroSlider();
    initHistorySection();
    initProductCarousels(); // Avvia la logica prodotti
});