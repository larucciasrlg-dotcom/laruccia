/* ==========================================
   LARUCCIA — SCRIPT.JS CLEAN VERSION
========================================== */

document.addEventListener("DOMContentLoaded", async () => {
  await loadNavbar();
  await loadFooter();

  initHeroVideo();
  initMobileMenu();
  initNavbarScroll();
  initSearch();
  initHistorySection();
  initProductCarousels();
  initScrollReveal();
  initHeroParallax();
  initSectionSpy();

  if (document.getElementById("brand-title")) {
    caricaBrand();
  }
});


/* ==========================================
   LOAD COMPONENTS
========================================== */

async function loadNavbar() {
  const navEl = document.getElementById("navbar");
  if (!navEl) return;

  try {
    const response = await fetch("navbar.html");
    if (!response.ok) throw new Error("Errore caricamento navbar");

    navEl.innerHTML = await response.text();

    highlightActiveLink();
  } catch (error) {
    console.error(error);
  }
}

async function loadFooter() {
  const footerEl = document.getElementById("footer-placeholder");
  if (!footerEl) return;

  try {
    const response = await fetch("footer.html");
    if (!response.ok) throw new Error("Errore caricamento footer");

    footerEl.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}


/* ==========================================
   ACTIVE LINK
========================================== */

function highlightActiveLink() {
  const current = location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".menu a, .mobile-links a");

  links.forEach(link => {
    const href = link.getAttribute("href");

    if (href === current) {
      link.classList.add("active");
    }
  });
}


/* ==========================================
   NAVBAR SCROLL
========================================== */

function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const updateNavbar = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  };

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });
}


/* ==========================================
   MOBILE MENU
========================================== */

function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const overlay =
    document.querySelector(".mobile-overlay") ||
    document.querySelector(".mobile-menu");

  if (!toggle || !overlay) return;

  const links = overlay.querySelectorAll("a");

  toggle.addEventListener("click", () => {
    const isOpen = toggle.classList.toggle("active");

    overlay.classList.toggle("active", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}


/* ==========================================
   HERO VIDEO
========================================== */

function initHeroVideo() {
  const heroVideo = document.querySelector(".hero-video");
  if (!heroVideo) return;

  heroVideo.play().catch(() => {
    document.body.addEventListener(
      "click",
      () => {
        heroVideo.play();
      },
      { once: true }
    );
  });
}


/* ==========================================
   HISTORY SECTION
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

    yearEl.textContent = Math.round(
      startYear - (startYear - endYear) * ease
    );

    if (historyImg) {
      historyImg.style.transform = `scale(${1 + (1 - ease) * 0.05})`;
    }

    section.classList.add("phase-1");

    if (progress > 0.45) section.classList.add("phase-3");
    if (progress > 0.8) section.classList.add("phase-2");

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  }

  setTimeout(() => {
    requestAnimationFrame(updateCount);
  }, 500);
}


/* ==========================================
   PRODUCT CAROUSELS
========================================== */

let activeTrackForKeyboard = null;

function initProductCarousels() {
  const wrappers = document.querySelectorAll(".figurine-wrapper");

  wrappers.forEach(wrapper => {
    const track = wrapper.querySelector(".brand-figurine-track");
    const dotsContainer = wrapper.querySelector(".carousel-dots");
    const items = track?.querySelectorAll(".brand-card-mini") || [];

    if (!track || items.length === 0) return;

    const shouldShowControls = items.length > 3;

    wrapper
      .querySelectorAll(".scroll-arrow")
      .forEach(arrow => {
        arrow.style.display = shouldShowControls ? "" : "none";
      });

    if (dotsContainer) {
      dotsContainer.innerHTML = "";

      if (shouldShowControls) {
        items.forEach((_, index) => {
          const dot = document.createElement("button");
          dot.className = "dot";
          dot.type = "button";
          dot.setAttribute("aria-label", `Vai al brand ${index + 1}`);

          if (index === 0) dot.classList.add("active");

          dot.addEventListener("click", () => {
            const step = getCarouselStep(track);
            track.scrollTo({
              left: index * step,
              behavior: "smooth"
            });
          });

          dotsContainer.appendChild(dot);
        });
      }
    }

    function updateArrowVisibility(track) {
  const wrapper = track.closest(".figurine-wrapper");

  if (!wrapper) return;

  const leftArrow =
    wrapper.querySelector(".scroll-arrow.left");

  const rightArrow =
    wrapper.querySelector(".scroll-arrow.right");

  if (!leftArrow || !rightArrow) return;

  const maxScroll =
    track.scrollWidth - track.clientWidth;

  /* LEFT */

  if (track.scrollLeft <= 6) {
    leftArrow.classList.add("is-hidden");
  } else {
    leftArrow.classList.remove("is-hidden");
  }

  /* RIGHT */

  if (track.scrollLeft >= maxScroll - 6) {
    rightArrow.classList.add("is-hidden");
  } else {
    rightArrow.classList.remove("is-hidden");
  }
}

    track.addEventListener(
      "scroll",
      () => {
        updateArrowVisibility(track);
        updateCarouselDots(track, dotsContainer, items);
      },
      { passive: true }
    );

    wrapper.addEventListener("mouseenter", () => {
      activeTrackForKeyboard = track;
    });

    wrapper.addEventListener("mouseleave", () => {
      activeTrackForKeyboard = null;
    });
  });
}

function getCarouselStep(track) {
  const card = track.querySelector(".brand-card-mini");
  if (!card) return 330;

  const styles = window.getComputedStyle(track);
  const gap = parseFloat(styles.columnGap || styles.gap || 24);

  return card.offsetWidth + gap;
}

function updateArrowVisibility(track) {
  const wrapper = track.closest(".figurine-wrapper");
  if (!wrapper) return;

  const leftArrow = wrapper.querySelector(".scroll-arrow.left");
  const rightArrow = wrapper.querySelector(".scroll-arrow.right");

  if (!leftArrow || !rightArrow) return;

  const maxScroll = track.scrollWidth - track.clientWidth;

  leftArrow.classList.toggle("is-hidden", track.scrollLeft <= 5);
  rightArrow.classList.toggle("is-hidden", track.scrollLeft >= maxScroll - 5);
}

function updateCarouselDots(track, dotsContainer, items) {
  if (!dotsContainer) return;

  const dots = dotsContainer.querySelectorAll(".dot");
  if (!dots.length) return;

  const maxScroll = track.scrollWidth - track.clientWidth;
  if (maxScroll <= 0) return;

  const scrollFraction = track.scrollLeft / maxScroll;
  const currentIndex = Math.round(scrollFraction * (items.length - 1));

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function scrollTrack(button, direction) {
  const wrapper = button.closest(".figurine-wrapper");
  const track = wrapper?.querySelector(".brand-figurine-track");

  if (!track) return;

  track.scrollBy({
    left: direction * getCarouselStep(track),
    behavior: "smooth"
  });
}

document.addEventListener("keydown", event => {
  if (!activeTrackForKeyboard) return;

  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

  event.preventDefault();

  const direction = event.key === "ArrowRight" ? 1 : -1;

  activeTrackForKeyboard.scrollBy({
    left: direction * getCarouselStep(activeTrackForKeyboard),
    behavior: "smooth"
  });
});


/* ==========================================
   SEARCH PRODUCTS
========================================== */

function initSearch() {
  const searchInput = document.getElementById("brandSearch");
  const suggestionsBox = document.getElementById("searchSuggestions");

  if (!searchInput) return;

  const allCards = Array.from(document.querySelectorAll(".brand-card-mini"));

  const brands = allCards
    .map(card => {
      const title = card.querySelector("h3")?.innerText.trim();
      const link = card.querySelector("a")?.getAttribute("href");

      return title && link ? { title, link, card } : null;
    })
    .filter(Boolean);

  function normalizeText(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  }

  function getSimilarity(a, b) {
    a = normalizeText(a);
    b = normalizeText(b);

    if (!a || !b) return 0;
    if (b.includes(a)) return 1;

    const matrix = Array.from({ length: a.length + 1 }, () => []);

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;

        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    const distance = matrix[a.length][b.length];
    const maxLength = Math.max(a.length, b.length);

    return 1 - distance / maxLength;
  }

  function getMatches(term) {
    if (!term) return [];

    return brands
      .map(brand => ({
        ...brand,
        score: getSimilarity(term, brand.title)
      }))
      .filter(brand => {
        const normalizedTerm = normalizeText(term);
        const normalizedTitle = normalizeText(brand.title);

        return (
          normalizedTitle.includes(normalizedTerm) ||
          brand.score >= 0.42
        );
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }

  function filterProducts(term) {
    const normalizedTerm = normalizeText(term);
    const sections = document.querySelectorAll(".brand-group");

    sections.forEach(section => {
      const cards = section.querySelectorAll(".brand-card-mini");
      let visibleCount = 0;

      cards.forEach(card => {
        const title = card.querySelector("h3")?.innerText || "";
        const normalizedTitle = normalizeText(title);

        const isVisible =
          normalizedTerm.length === 0 ||
          normalizedTitle.includes(normalizedTerm) ||
          getSimilarity(normalizedTerm, title) >= 0.42;

        card.hidden = !isVisible;

        if (isVisible) visibleCount++;
      });

      section.hidden = normalizedTerm.length > 0 && visibleCount === 0;
    });
  }

  function renderSuggestions(term) {
    if (!suggestionsBox) return;

    suggestionsBox.innerHTML = "";

    if (!term) {
      suggestionsBox.classList.remove("active");
      return;
    }

    const matches = getMatches(term);

    if (!matches.length) {
      suggestionsBox.innerHTML = `
        <div class="search-suggestion empty">
          Nessun brand trovato
        </div>
      `;
      suggestionsBox.classList.add("active");
      return;
    }

    matches.forEach(brand => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "search-suggestion";

      const exactMatch = normalizeText(brand.title).includes(normalizeText(term));

      item.innerHTML = `
        <span>${brand.title}</span>
        ${exactMatch ? "" : "<small>Forse cercavi questo</small>"}
      `;

      item.addEventListener("click", () => {
        searchInput.value = brand.title;
        suggestionsBox.classList.remove("active");

        filterProducts(brand.title);

        brand.card.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      });

      suggestionsBox.appendChild(item);
    });

    suggestionsBox.classList.add("active");
  }

  searchInput.addEventListener("input", event => {
    const term = event.target.value.trim();

    filterProducts(term);
    renderSuggestions(term);
  });

  document.addEventListener("click", event => {
    if (!event.target.closest(".search-wrapper")) {
      suggestionsBox?.classList.remove("active");
    }
  });

  searchInput.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      suggestionsBox?.classList.remove("active");
      searchInput.blur();
    }
  });
}


/* ==========================================
   BRAND DATA
   INCOLLA QUI IL TUO OGGETTO brandData ATTUALE
========================================== */

const brandData = {
    "41zero42": {
        nome: "41zero42",
        descrizione: "Nel nostro showroom selezioniamo solo partner che sanno guardare oltre. 41zero42 rappresenta l'avanguardia del design ceramico italiano: un team creativo che fonde ricerca tecnologica e massima libertà estetica. Dalle texture materiche ai pattern grafici più audaci, le soluzioni di 41zero42 sono pensate per i progettisti che ricercano un linguaggio unico e distintivo. Venite a scoprire come la contaminazione di stili e l'eccellenza del Made in Italy possono ridefinire i vostri spazi abitativi.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_41zero42.webp",
        sito: "https://www.41zero42.com",
        gallery: ["img/41-1.jpg", "img/41-2.jpg"]
    },
    "Abk": { // AGGIUNGI QUESTO
        nome: "Abk",
        descrizione: "Vieni a scoprire ABK, il brand che porta l’eleganza contemporanea nel cuore della tua casa. Ogni collezione ABK è pensata per offrire un’esperienza di arredo completa: pavimenti, rivestimenti e grandi lastre che dialogano tra loro in una perfetta armonia cromatica e materica. Che tu stia cercando il calore del legno, la raffinatezza del marmo o il carattere industriale del gres porcellanato, ABK ti permette di personalizzare ogni spazio con uno stile unico e sofisticato, sempre rigorosamente Made in Italy.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_abk.webp",
        sito: "https://www.abk.it",
        gallery: ["img/abk-1.jpg", "img/abk-2.jpg"]
    },

    "Argenta": {
        nome: "Argenta",
        descrizione: "Argenta Ceramica combina la tradizione ceramica con una visione fresca e contemporanea. È il brand ideale per chi cerca varietà e concretezza: dai grandi formati alle texture più ricercate, Argenta trasforma i pavimenti e i rivestimenti in elementi d'arredo versatili, pensati per rendere ogni spazio armonioso e funzionale. Scopri nel nostro showroom come la qualità e il design accessibile di Argenta possono valorizzare la tua casa.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_argenta.webp",
        sito: "https://www.argentaceramica.com",
        gallery: ["img/argenta-1.jpg", "img/argenta-2.jpg"]
    },

    "Arpa": {
        nome: "Arpa",
        descrizione: "Arpa Ceramiche è il punto di riferimento per chi ricerca un gres porcellanato che unisca estetica contemporanea e massima funzionalità. Con una gamma di prodotti che spazia dal gusto classico al design moderno, Arpa offre soluzioni versatili per ogni esigenza abitativa, garantendo sempre elevati standard di resistenza e facilità di manutenzione. Vieni a scoprire nel nostro showroom la varietà di finiture e formati firmati Arpa, pensati per valorizzare con stile ogni tuo progetto.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_arpa.webp",
        sito: "https://www.arpaceramiche.it",
        gallery: ["img/arpa-1.jpg", "img/arpa-2.jpg"]
    },

    "CeramicheDagostino": {
        nome: "Ceramiche D'Agostino",
        descrizione: "Tradizione e innovazione nella produzione di superfici ceramiche italiane.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_ceramichedagostino.webp",
        sito: "https://www.agostinoceramiche.com/",
        gallery: ["img/cerdag-1.jpg", "img/cerdag-2.jpg"]
    },

    "Cerdisa": {
        nome: "Cerdisa",
        descrizione: "Soluzioni ceramiche per ambienti moderni e contemporanei.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_cerdisa.webp",
        sito: "https://www.ricchetti-group.com/it",
        gallery: ["img/cerdisa-1.jpg", "img/cerdisa-2.jpg"]
    },

    "Cerdomus": {
        nome: "Cerdomus",
        descrizione: "Collezioni in gres porcellanato dal design elegante e ricercato.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_cerdomus.webp",
        sito: "https://www.cerdomus.com",
        gallery: ["img/cerdomus-1.jpg", "img/cerdomus-2.jpg"]
    },

    "Dado": {
        nome: "Dado Ceramica",
        descrizione: "Produzione italiana di gres porcellanato e rivestimenti ceramici.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_dadoceramica.webp",
        sito: "https://www.dadoceramica.it",
        gallery: ["img/dado-1.jpg", "img/dado-2.jpg"]
    },

    "DecoratoriBassanesi": {
        nome: "Decoratori Bassanesi",
        descrizione: "Ceramiche artistiche e decorative dal forte carattere artigianale.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_decoratoribassanesi.webp",
        sito: "https://www.decoratoribassanesi.it",
        gallery: ["img/decoratori-1.jpg", "img/decoratori-2.jpg"]
    },

    "Evoluzioni": {
        nome: "Evoluzioni",
        descrizione: "Superfici ceramiche innovative per interior design contemporaneo.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_evoluzioni.webp",
        sito: "https://www.evoluzioni-ceramiche.it",
        gallery: ["img/evoluzioni-1.jpg", "img/evoluzioni-2.jpg"]
    },

    "Flaviker": {
        nome: "Flaviker",
        descrizione: "Lastre e superfici ceramiche di design per architettura moderna.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_flaviker.webp",
        sito: "https://www.flavikerpisa.it",
        gallery: ["img/flaviker-1.jpg", "img/flaviker-2.jpg"]
    },

    "FloorItalia": {
        nome: "Floor Italia",
        descrizione: "Pavimenti e rivestimenti in gres porcellanato Made in Italy.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_flooritalia.webp",
        sito: "https://www.flooritalia.it",
        gallery: ["img/flooritalia-1.jpg", "img/flooritalia-2.jpg"]
    },

    "Florim": {
        nome: "Florim",
        descrizione: "Leader internazionale nelle superfici ceramiche di alta gamma.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_florim.webp",
        sito: "https://www.florim.com",
        gallery: ["img/florim-1.jpg", "img/florim-2.jpg"]
    },

    "FrancescoDeMaio": {
        nome: "Francesco De Maio",
        descrizione: "Maioliche artistiche artigianali della tradizione vietrese.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_francescodemaio.webp",
        sito: "https://www.francescodemaio.it",
        gallery: ["img/demaio-1.jpg", "img/demaio-2.jpg"]
    },

    "IlCavallino": {
        nome: "Il Cavallino",
        descrizione: "Ceramiche decorative italiane dal gusto classico e contemporaneo.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_ilcavallino.webp",
        sito: "https://www.ilcavallino.it",
        gallery: ["img/cavallino-1.jpg", "img/cavallino-2.jpg"]
    },

    "Imso": {
        nome: "Imso",
        descrizione: "Superfici ceramiche per ambienti residenziali e commerciali.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_imso.webp",
        sito: "https://www.imso.it",
        gallery: ["img/imso-1.jpg", "img/imso-2.jpg"]
    },

    "Kronos": {
        nome: "Kronos",
        descrizione: "Gres porcellanato innovativo per indoor e outdoor.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_kronos.webp",
        sito: "https://kronosceramiche.com",
        gallery: ["img/kronos-1.jpg", "img/kronos-2.jpg"]
    },

    "Ktl": {
        nome: "Ktl",
        descrizione: "Soluzioni ceramiche moderne per architettura e design.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_ktl.webp",
        sito: "https://www.ktlceramiche.it",
        gallery: ["img/ktl-1.jpg", "img/ktl-2.jpg"]
    },

    "Laminam": {
        nome: "Laminam",
        descrizione: "Grandi lastre ceramiche innovative per architettura e arredo.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_laminam.webp",
        sito: "https://www.laminam.com",
        gallery: ["img/laminam-1.jpg", "img/laminam-2.jpg"]
    },

    "Mariner": {
        nome: "Mariner",
        descrizione: "Ceramiche italiane per pavimenti e rivestimenti di qualità.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_mariner.webp",
        sito: "https://www.mariner.it",
        gallery: ["img/mariner-1.jpg", "img/mariner-2.jpg"]
    },

    "Piemme": {
        nome: "Ceramiche Piemme",
        descrizione: "Design italiano e innovazione tecnologica nelle superfici ceramiche.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_piemme.webp",
        sito: "https://www.ceramichepiemme.it",
        gallery: ["img/piemme-1.jpg", "img/piemme-2.jpg"]
    },

    "Provenza": {
        nome: "Provenza",
        descrizione: "Superfici in gres porcellanato dallo stile raffinato e naturale.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_provenza.webp",
        sito: "https://www.provenzafloors.com",
        gallery: ["img/provenza-1.jpg", "img/provenza-2.jpg"]
    },

    "Ricchetti": {
        nome: "Ricchetti",
        descrizione: "Tradizione ceramica italiana con collezioni eleganti e contemporanee.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_ricchetti.webp",
        sito: "https://www.ricchetti-group.com",
        gallery: ["img/ricchetti-1.jpg", "img/ricchetti-2.jpg"]
    },

    "Saime": {
        nome: "Saime",
        descrizione: "Pavimenti e rivestimenti ceramici per ambienti moderni.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_saime.webp",
        sito: "https://www.saimeceramiche.it",
        gallery: ["img/saime-1.jpg", "img/saime-2.jpg"]
    },

    "Settecento": {
        nome: "Settecento",
        descrizione: "Manifattura ceramica italiana dal forte carattere decorativo.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_settecento.webp",
        sito: "https://www.settecento.com",
        gallery: ["img/settecento-1.jpg", "img/settecento-2.jpg"]
    },

    "StudioOneEquipe": {
        nome: "Studio One Equipe",
        descrizione: "Ceramiche decorative e superfici creative Made in Italy.",
        imgPrincipale: "img/prodotti/ceramiche/ceramiche_studiooneequipe.webp",
        sito: "https://www.equipeceramicas.com",
        gallery: ["img/studioone-1.jpg", "img/studioone-2.jpg"]
    },

    "Artesia": {
        nome: "Artesia",
        descrizione: "blabla",
        imgPrincipale: "img/prodotti/pietre/pietre_artesia.webp",
        sito: "https://www.artesia.it",
        gallery: ["img/artesia.jpg", "img/artesia2.jpg"]
    },
    // E così via per tutti gli altri...
};


/* ==========================================
   BRAND DETAIL PAGE
========================================== */

function caricaBrand() {
  const params = new URLSearchParams(window.location.search);
  const brandKey = params.get("name");

  if (!brandKey || !brandData[brandKey]) return;

  const data = brandData[brandKey];

  document.title = `${data.nome} - Laruccia`;

  const title = document.getElementById("brand-title");
  const description = document.getElementById("brand-description");
  const mainImg = document.getElementById("brand-main-img");
  const link = document.getElementById("brand-link");
  const gallery = document.getElementById("brand-gallery");

  if (title) title.innerText = data.nome;
  if (description) description.innerText = data.descrizione;

  if (mainImg) {
    mainImg.src = data.imgPrincipale;
    mainImg.alt = `Ambientazione ${data.nome}`;
  }

  if (link) {
    link.href = data.sito;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  if (gallery && Array.isArray(data.gallery)) {
    gallery.innerHTML = "";

    data.gallery.forEach(imgUrl => {
      const item = document.createElement("div");
      item.className = "gallery-item";

      item.innerHTML = `
        <img 
          src="${imgUrl}" 
          alt="Collezione ${data.nome}" 
          loading="lazy">
      `;

      gallery.appendChild(item);
    });
  }
}

/* ==========================================
   SCROLL REVEAL
========================================== */

function initScrollReveal() {
  const elements = document.querySelectorAll(
    ".fade-up, .fade-in, .scale-in, .image-reveal"
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach(el => observer.observe(el));
}


/* ==========================================
   HERO PARALLAX
========================================== */

function initHeroParallax() {
  const hero = document.querySelector(".hero");
  const video = document.querySelector(".hero-video");

  if (!hero || !video) return;

  window.addEventListener(
    "scroll",
    () => {
      const scroll = window.scrollY;

      video.style.transform =
        `translateY(${scroll * 0.18}px) scale(1.05)`;
    },
    { passive: true }
  );
}


/* ==========================================
   PRODUCT NAV ACTIVE SECTION
========================================== */

function initSectionSpy() {
  const navLinks =
    document.querySelectorAll(".product-nav a");

  const sections =
    document.querySelectorAll(".brand-group");

  if (!navLinks.length || !sections.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      });
    },
    {
      threshold: 0.28,
      rootMargin: "-20% 0px -60% 0px"
    }
  );

  sections.forEach(section => {
    observer.observe(section);
  });
}

/* ==========================================
   GDPR COOKIE SYSTEM
========================================== */

const cookieBanner = document.getElementById("cookieBanner");

const acceptCookies = document.getElementById("acceptCookies");
const rejectCookies = document.getElementById("rejectCookies");

const COOKIE_KEY = "laruccia_cookie_choice";


/* ==========================================
   LOAD ANALYTICS
========================================== */

function loadGoogleAnalytics() {

  if (window.gaLoaded) return;

  window.gaLoaded = true;

  const script = document.createElement("script");

  script.async = true;

  script.src =
    "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";

  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag("js", new Date());

  gtag("config", "G-XXXXXXXXXX", {
    anonymize_ip: true
  });

}


/* ==========================================
   SHOW BANNER
========================================== */

function showCookieBanner() {

  if (!localStorage.getItem(COOKIE_KEY)) {

    setTimeout(() => {
      cookieBanner?.classList.add("active");
    }, 1200);

  }

}


/* ==========================================
   ACCEPT
========================================== */

acceptCookies?.addEventListener("click", () => {

  localStorage.setItem(COOKIE_KEY, "accepted");

  cookieBanner?.classList.remove("active");

  loadGoogleAnalytics();

});


/* ==========================================
   REJECT
========================================== */

rejectCookies?.addEventListener("click", () => {

  localStorage.setItem(COOKIE_KEY, "rejected");

  cookieBanner?.classList.remove("active");

});


/* ==========================================
   INITIALIZE
========================================== */

const savedCookieChoice =
  localStorage.getItem(COOKIE_KEY);

if (savedCookieChoice === "accepted") {

  loadGoogleAnalytics();

} else if (!savedCookieChoice) {

  showCookieBanner();

}