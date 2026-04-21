/* ==========================================
   1. CARICAMENTO NAVBAR & ACTIVE LINK
========================================== */
function loadNavbar() {
    return fetch('navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Errore navbar');
            return response.text();
        })
        .then(data => {
            const container = document.getElementById('navbar');
            if (container) {
                container.innerHTML = data;
                highlightActiveLink();
            }
        });
}

function highlightActiveLink() {
    const links = document.querySelectorAll('.menu a');
    const currentPage = location.pathname.split("/").pop() || 'index.html';
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

/* ==========================================
   2. INIZIALIZZAZIONE GENERALE
========================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Carica navbar e poi esegui il resto
    loadNavbar().catch(err => console.error(err));
    
    // Inizializza sliders (controllano internamente se l'elemento esiste)
    initRestoredSlider();
    initHeroSlider();
    initBrandCarousels();
});

// Avvolgi il codice dei caroselli brand in una funzione nominata
function initBrandCarousels() {
    const carousels = document.querySelectorAll('.brand-carousel');
    // ... (inserisci qui il codice del carosello brand che hai già scritto)
}

// ... restanti funzioni (initRestoredSlider, initHeroSlider)


/* ==========================================
   CARICAMENTO DINAMICO FOOTER
========================================== */
fetch('footer.html')
  .then(response => {
    if (!response.ok) throw new Error('Errore nel caricamento del footer');
    return response.text();
  })
  .then(data => {
    const footerContainer = document.getElementById('footer-placeholder');
    if (footerContainer) {
      footerContainer.innerHTML = data;
    }
  })
  .catch(error => console.error('Errore footer:', error));
  
/* ==========================================
   2. SLIDER "CHI SIAMO" (AGGIORNATO)
========================================== */
function initRestoredSlider() {
    // Cerchiamo le slide dentro il nuovo contenitore
    const slides = document.querySelectorAll(".chi-slide");
    const nextBtn = document.querySelector(".next-modern");
    const prevBtn = document.querySelector(".prev-modern");
    let currentIndex = 0;

    // Se non ci sono slide, esci per evitare errori in console
    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });
    }

    // Facciamolo scorrere da solo ogni 5 secondi
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 5000);
}

// Inizializza al caricamento della pagina
document.addEventListener("DOMContentLoaded", initRestoredSlider);

/* ==========================================
   3. CAROSELLI BRAND (PAGINA PRODOTTI)
========================================== */
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll('.brand-carousel');

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const dotsNav = carousel.querySelector('.carousel-dots');
    let currentIndex = -1; // Partiamo da -1 per forzare il primo aggiornamento

    if (dotsNav) dotsNav.innerHTML = '';

    // A. CREAZIONE PALLINI
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dotsNav.appendChild(dot);
      dot.addEventListener('click', () => moveToSlide(index));
    });

    const dots = Array.from(dotsNav.children);

    // B. FUNZIONE DI SPOSTAMENTO
    function moveToSlide(index) {
      if (index === currentIndex) return; // Evita calcoli inutili se siamo già lì

      // Calcoliamo la distanza della slide rispetto all'inizio del track
      const targetSlide = slides[index];
      const trackCenter = carousel.offsetWidth / 2;
      const slideCenter = targetSlide.offsetLeft + (targetSlide.offsetWidth / 2);
      
      // Lo spostamento è la differenza tra il centro del carousel e il centro della slide
      const amountToMove = slideCenter - trackCenter;

      track.style.transform = `translateX(-${amountToMove}px)`;
      
      // Aggiornamento classi
      slides.forEach(s => s.classList.remove('focused'));
      dots.forEach(d => d.classList.remove('active'));
      
      slides[index].classList.add('focused');
      dots[index].classList.add('active');
      
      currentIndex = index;
    }

    // C. EVENTI
    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => moveToSlide(index));
    });

    window.addEventListener('keydown', (e) => {
      if (carousel.matches(':hover')) {
        if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
        if (e.key === 'ArrowLeft' && currentIndex > 0) moveToSlide(currentIndex - 1);
      }
    });

    // D. INIZIALIZZAZIONE ROBUSTA
    // Usiamo IntersectionObserver per far partire il carosello solo quando è visibile
    // Questo risolve i bug di calcolo quando la pagina non è ancora renderizzata
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            moveToSlide(0);
            // Forza un ricalcolo dopo un attimo per sicurezza
            setTimeout(() => moveToSlide(0), 100);
          }, 100);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(carousel);
  });
});

/* ==========================================================================
   HERO SLIDER AUTOMATICO (HOME PAGE)
   ========================================================================== */
function initHeroSlider() {
    const heroSection = document.querySelector('.modern-hero-slider');
    if (!heroSection) return; // Esci se non sei nella Home

    const slides = heroSection.querySelectorAll('.hero-slide');
    if (slides.length <= 1) return; // Esci se c'è una sola slide

    let currentSlide = 0;
    const slideInterval = 7000; // Tempo tra le slide (7 secondi, leggermente meno dell'animazione CSS)

    function nextSlide() {
        // Rimuovi 'active' dalla slide corrente
        slides[currentSlide].classList.remove('active');
        
        // Calcola l'indice della prossima slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Aggiungi 'active' alla nuova slide
        slides[currentSlide].classList.add('active');
    }

    // Avvia l'intervallo automatico
    setInterval(nextSlide, slideInterval);
}

// Inizializza lo slider al caricamento del DOM
document.addEventListener('DOMContentLoaded', initHeroSlider);