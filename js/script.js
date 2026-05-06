/* ==========================================
   NAVBAR
========================================== */
function loadNavbar() {
    // Carica navbar.html dalla stessa cartella della pagina corrente
    fetch('navbar.html') 
        .then(response => {
            if (!response.ok) throw new Error("Errore nel caricamento della navbar");
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            
            // Re-inizializza le funzioni dopo aver inserito l'HTML nel DOM
            highlightActiveLink();
            initMobileMenu(); // Questo attiva il menu a scomparsa[cite: 9]
            setupMegaMenu();  // Questo attiva il menu "Apple style"[cite: 9]
        })
        .catch(error => console.error('Errore:', error));
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
                                                                        PROVA DI MODIFICHE SPERIAMO TUTTO OK 
                                                                        ========================================== */

/* ==========================================
   INIZIALIZZAZIONE GLOBALE
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    console.log("Script inizializzato correttamente.");

    // script.js - Aggiungi questo nel DOMContentLoaded
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    heroVideo.play().catch(error => {
        console.log("L'autoplay è stato bloccato dal browser, provo il riavvio al primo click.");
        // Se il browser lo blocca, appena l'utente clicca ovunque, il video parte
        document.body.addEventListener('click', () => {
            heroVideo.play();
        }, { once: true });
    });
}
    
    // Carichiamo i componenti (Navbar e Footer)
    loadNavbar();
    loadFooter();

    // Avviamo la storia (Priorità Chi Siamo)
    initHistorySection();

    // Avviamo le altre funzioni solo se esistono
    if (typeof initHeroSlider === "function") initHeroSlider();
    if (typeof initProductCarousels === "function") initProductCarousels();
    
    // Avviamo il database brand (se siamo in brand-detail.html)
    if (document.getElementById('brand-title')) caricaBrand();
});

/* ==========================================
   NAVBAR & FOOTER (VERSIONI COMPLETE)
========================================== */
function loadNavbar() {
    fetch('navbar.html') 
        .then(response => {
            if (!response.ok) throw new Error("Errore navbar");
            return response.text();
        })
        .then(data => {
            const navEl = document.getElementById('navbar');
            if (navEl) {
                navEl.innerHTML = data;
                highlightActiveLink();
                initMobileMenu(); // Attiva menu mobile[cite: 9]
                if (typeof setupMegaMenu === "function") setupMegaMenu(); // Attiva Mega Menu[cite: 9]
            }
        })
        .catch(error => console.error('Errore:', error));
}

function loadFooter() {
    fetch('footer.html')
        .then(res => res.text())
        .then(data => {
            const el = document.getElementById('footer-placeholder');
            if (el) el.innerHTML = data;
        });
}

function highlightActiveLink() {
    const links = document.querySelectorAll('.menu a');
    const current = location.pathname.split("/").pop() || 'index.html';
    links.forEach(link => {
        if (link.getAttribute('href') === current) link.classList.add('active');
    });
}

/* ==========================================
   HISTORY SECTION (ANIMAZIONE ANNO)
========================================== */
function initHistorySection() {
    const section = document.querySelector(".history-section");
    const yearEl = document.getElementById("year");
    const historyImg = document.querySelector(".history-image");

    if (!section || !yearEl) return;

    const startYear = 2026;
    const endYear = 1939;
    const duration = 4000;
    let startTime = null;

    function updateCount(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        
        yearEl.textContent = Math.round(startYear - (startYear - endYear) * ease);

        if (historyImg) {
            historyImg.style.transform = `scale(${1 + (1 - ease) * 0.05})`;
        }

        section.classList.add("phase-1");
        if (progress > 0.45) section.classList.add("phase-2");
        if (progress > 0.8) section.classList.add("phase-3");

        if (progress < 1) requestAnimationFrame(updateCount);
    }
    setTimeout(() => requestAnimationFrame(updateCount), 500);
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


// Database dei brand (puoi spostarlo in un file .json esterno in futuro)
const brandData = {
    "41zero42": {
        nome: "41zero42",
        descrizione: "Descrizione dettagliata...",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_41zero42.webp",
        sito: "https://www.41zero42.com",
        gallery: ["img/41-1.jpg", "img/41-2.jpg"]
    },
    "Abk": { // AGGIUNGI QUESTO
        nome: "Abk",
        descrizione: "Leader nella produzione di grandi lastre ceramiche...",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_abk.webp",
        sito: "https://www.abk.it",
        gallery: ["img/abk-1.jpg", "img/abk-2.jpg"]
    }
    // E così via per tutti gli altri...
};

function caricaBrand() {
    const params = new URLSearchParams(window.location.search);
    const brandKey = params.get('name');
    const data = brandData[brandKey];

    if (data) {
        // Aggiorna Meta dati e testi principali
        document.title = `${data.nome} - NomeTuoShowroom`; 
        document.getElementById('brand-title').innerText = data.nome;
        document.getElementById('brand-description').innerText = data.descrizione;
        
        // Gestione Immagine Principale
        const mainImg = document.getElementById('brand-main-img');
        mainImg.src = data.imgPrincipale;
        mainImg.alt = `Ambientazione ${data.nome}`;

        // Gestione Link
        document.getElementById('brand-link').href = data.sito;

        // Genera Galleria con struttura ottimizzata per il CSS
        const galleryContainer = document.getElementById('brand-gallery');
        galleryContainer.innerHTML = ''; // Pulisce il contenitore prima di caricarne di nuovi

        data.gallery.forEach(imgUrl => {
            galleryContainer.innerHTML += `
                <div class="col-12 col-md-4 mb-4">
                    <div class="gallery-item">
                        <img src="${imgUrl}" 
                             alt="Collezione ${data.nome}" 
                             class="img-fluid" 
                             loading="lazy">
                    </div>
                </div>`;
        });
    } else {
        // Opzionale: reindirizza alla pagina prodotti se il brand non esiste
        // window.location.href = 'prodotti.html';
    }
}

// Esegui la funzione quando la pagina è pronta
document.addEventListener('DOMContentLoaded', caricaBrand);


function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.mobile-overlay');
    const body = document.body;

    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        overlay.classList.toggle('active');
        // Impedisce lo scroll della pagina quando il menu è aperto
        body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });

    // Chiudi il menu se si clicca su un link
    const mobileLinks = overlay.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

// Chiamala dopo che la navbar è stata caricata
// Modifica la tua funzione loadNavbar esistente:
function loadNavbar() {
    return fetch('navbar.html')
        .then(res => res.text())
        .then(data => {
            const el = document.getElementById('navbar');
            if (el) el.innerHTML = data;
            highlightActiveLink();
            initMobileMenu(); // <--- AGGIUNGI QUESTA
        });
}

// 3. FIX: Se initHeroSlider non è ancora pronta, commentala o crea una funzione vuota
    if (typeof initHeroSlider === "function") {
        initHeroSlider();
    } else {
        console.warn("initHeroSlider non è definita, ma non bloccherò più il resto.");
    }