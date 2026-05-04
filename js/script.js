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


/*highlightactivelink serve a far capire all'utente in che pagina si trova*/

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
    const hero = document.querySelector('.hero-slides')
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
    const yearEl = document.getElementById("year"); // Punta solo al numero
    if (!section || !yearEl) return;

    section.classList.add("phase-1");

    let startYear = 2026;
    const endYear = 1939;
    const duration = 5000; 
    let startTime = null;

function updateCount(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const ease = 1 - Math.pow(1 - progress, 3);
        const currentYear = Math.round(startYear - (startYear - endYear) * ease);
        const imageMove = (1 - ease) * 20; // Calcola un piccolo spostamento
document.querySelector(".history-image").style.transform = `scale(${1 + (1-ease)*0.1}) translateY(${imageMove}px)`;
        
        // Cambia solo il numero, lasciando intatto "Insieme con voi dal"
        yearEl.textContent = currentYear;

        if (progress > 0.3) section.classList.add("phase-2");
        if (progress > 0.7) section.classList.add("phase-3");

        if (progress < 1) {
            requestAnimationFrame(updateCount);
        }
    }

    setTimeout(() => {
        requestAnimationFrame(updateCount);
    }, 1000);
}

    window.addEventListener("wheel", (e) => {
        if (e.deltaY > 0) handleStepScroll(e.deltaY);
    }, { passive: true });

    // Supporto Touch
    let touchStartY = 0;
    window.addEventListener("touchstart", (e) => { touchStartY = e.touches[0].clientY; }, { passive: true });
    window.addEventListener("touchmove", (e) => {
        const delta = touchStartY - e.touches[0].clientY;
        if (delta > 10) { // Piccolo threshold per evitare tocchi involontari
            handleStepScroll(delta);
            touchStartY = e.touches[0].clientY;
        }
    }, { passive: true });

function animate() {
        if (isCompleted) return;

        // Velocità dell'animazione: più alto è il numero, più è veloce
        progress += 0.005; 

        // Calcolo dell'anno basato sul progresso automatico
        const ease = 1 - Math.pow(1 - progress, 3); // Effetto rallentamento finale
        const currentYear = Math.round(start - (start - end) * ease);

        yearEl.textContent = currentYear;

        // Attivazione AUTOMATICA delle fasi basata sul tempo/progresso
        section.classList.toggle("phase-1", progress > 0.05);
        section.classList.toggle("phase-2", progress > 0.45); // Appare il testo
        section.classList.toggle("phase-3", progress > 0.80); // Appare l'immagine

        if (progress >= 1) {
            progress = 1;
            yearEl.textContent = end;
            isCompleted = true;
            section.classList.add("phase-1", "phase-2", "phase-3");
        } else {
            requestAnimationFrame(animate);
        }
    }

/* ==========================================
   CAROSELLI PRODOTTI: FRECCE E PALLINI
========================================== */

// 1. Gestione Visibilità Frecce
function updateArrowVisibility(track) {
    const wrapper = track.closest('.figurine-wrapper');
    if (!wrapper) return;

    const leftArrow = wrapper.querySelector('.scroll-arrow.left');
    const rightArrow = wrapper.querySelector('.scroll-arrow.right');
    
    if (!leftArrow || !rightArrow) return;

    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;

    // Nascondi sinistra se all'inizio
    leftArrow.classList.toggle('is-hidden', scrollLeft <= 5);
    
    // Nascondi destra se alla fine
    rightArrow.classList.toggle('is-hidden', scrollLeft >= maxScroll - 5);
}

// 2. Funzione di Scroll (per i click sulle frecce)
function scrollTrack(btn, direction) {
    const wrapper = btn.closest('.figurine-wrapper');
    const track = wrapper.querySelector('.brand-figurine-track');
    if (!track) return;

    const scrollAmount = 320; // Larghezza card + gap
    track.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
    
    // La visibilità si aggiornerà tramite l'evento 'scroll' registrato sotto
}

// 3. Inizializzazione Totale (Pallini + Eventi)
let activeTrackForKeyboard = null;

function initProductCarousels() {
    const wrappers = document.querySelectorAll('.figurine-wrapper');

    wrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.brand-figurine-track');
        const dotsContainer = wrapper.querySelector('.carousel-dots');
        const items = track.querySelectorAll('.brand-card-mini');

        if (!track || items.length === 0) return;

        // --- Creazione Pallini ---
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
        }

        // --- Evento Scroll Unificato (Frecce + Pallini) ---
        track.addEventListener('scroll', () => {
            // Aggiorna Frecce
            updateArrowVisibility(track);

            // Aggiorna Pallini
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.dot');
                const maxScrollLeft = track.scrollWidth - track.offsetWidth;
                if (maxScrollLeft <= 0) return;

                const scrollFraction = track.scrollLeft / maxScrollLeft;
                let currentIndex = Math.round(scrollFraction * (items.length - 1));
                
                dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
            }
        });

        // Esegui un primo controllo immediato
        updateArrowVisibility(track);

        // --- Tastiera ---
        wrapper.addEventListener('mouseenter', () => { activeTrackForKeyboard = track; });
        wrapper.addEventListener('mouseleave', () => { activeTrackForKeyboard = null; });
    });
}

// 4. Keyboard Listener
document.addEventListener('keydown', (e) => {
    if (!activeTrackForKeyboard) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const step = 320;
        const direction = (e.key === 'ArrowRight') ? 1 : -1;
        activeTrackForKeyboard.scrollBy({ left: direction * step, behavior: 'smooth' });
    }
});

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


/* ==========================================
RENDE IL SITO INTERATTIVO
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    loadFooter();
    initHeroSlider();
    initHistorySection();
    initProductCarousels(); // Avvia la logica prodotti
});


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('brandSearch');
    if (!searchInput) return;


/* ==========================================
BARRA DI RICERCA SUI PRODOTTI
========================================== */

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const brandCards = document.querySelectorAll('.brand-card-mini');
        const sections = document.querySelectorAll('.brand-group');
        
        brandCards.forEach(card => {
            const brandName = card.querySelector('h3').innerText.toLowerCase();
            if (brandName.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Nascondi le sezioni intere se non hanno brand visibili
        sections.forEach(section => {
            const visibleCards = section.querySelectorAll('.brand-card-mini[style="display: block;"]').length;
            const hasTerm = term.length > 0;
            
            if (hasTerm && visibleCards === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    });
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