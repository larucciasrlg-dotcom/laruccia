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
  initCookieBanner();

  if (typeof initHeroParallax === "function") initHeroParallax();
  if (typeof initSectionSpy === "function") initSectionSpy();

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


function initCookieBanner() {
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptCookies = document.getElementById("acceptCookies");
  const rejectCookies = document.getElementById("rejectCookies");

  if (!cookieBanner) return;

  const COOKIE_KEY = "laruccia_cookie_choice";

  if (!localStorage.getItem(COOKIE_KEY)) {
    setTimeout(() => {
      cookieBanner.classList.add("active");
    }, 1200);
  }

  acceptCookies?.addEventListener("click", () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    cookieBanner.classList.remove("active");
  });

  rejectCookies?.addEventListener("click", () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    cookieBanner.classList.remove("active");
  });
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