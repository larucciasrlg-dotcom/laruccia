/* ==========================================
   LARUCCIA — SCRIPT.JS CLEAN VERSION
========================================== */

document.addEventListener("DOMContentLoaded", async () => {
  await loadNavbar();
  await loadFooter();

  renderProductSections();

  initHeroVideo();
  initMobileMenu();
  initNavbarScroll();
  initSearch();
  initHistorySection();
  initProductCarousels();
  initScrollReveal();
  initCookieBanner();

  if (typeof initHeroParallax === "function") {
    initHeroParallax();
  }

  if (typeof initSectionSpy === "function") {
    initSectionSpy();
  }

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

    if (!response.ok) {
      throw new Error("Errore caricamento navbar");
    }

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

    if (!response.ok) {
      throw new Error("Errore caricamento footer");
    }

    footerEl.innerHTML = await response.text();

  } catch (error) {
    console.error(error);
  }
}


/* ==========================================
   ACTIVE LINK
========================================== */

function highlightActiveLink() {
  const current =
    location.pathname.split("/").pop() || "index.html";

  const links =
    document.querySelectorAll(".menu a, .mobile-links a");

  links.forEach(link => {
    const href = link.getAttribute("href");

    if (href === current) {
      link.classList.add("active");
    }
  });
}


/* ==========================================
   COOKIE BANNER
========================================== */

function initCookieBanner() {
  const cookieBanner =
    document.getElementById("cookieBanner");

  const acceptCookies =
    document.getElementById("acceptCookies");

  const rejectCookies =
    document.getElementById("rejectCookies");

  if (!cookieBanner) return;

  const COOKIE_KEY =
    "laruccia_cookie_choice";

  if (!localStorage.getItem(COOKIE_KEY)) {

    setTimeout(() => {
      cookieBanner.classList.add("active");
    }, 1200);

  }

  acceptCookies?.addEventListener("click", () => {

    localStorage.setItem(
      COOKIE_KEY,
      "accepted"
    );

    cookieBanner.classList.remove("active");

  });

  rejectCookies?.addEventListener("click", () => {

    localStorage.setItem(
      COOKIE_KEY,
      "rejected"
    );

    cookieBanner.classList.remove("active");

  });
}


/* ==========================================
   NAVBAR SCROLL
========================================== */

function initNavbarScroll() {
  const navbar =
    document.querySelector(".navbar");

  if (!navbar) return;

  const updateNavbar = () => {
    navbar.classList.toggle(
      "scrolled",
      window.scrollY > 20
    );
  };

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );
}


/* ==========================================
   MOBILE MENU
========================================== */

function initMobileMenu() {
  const toggle =
    document.querySelector(".menu-toggle");

  const overlay =
    document.querySelector(".mobile-overlay");

  if (!toggle || !overlay) return;

  const links =
    overlay.querySelectorAll("a");

  toggle.addEventListener("click", () => {

    const isOpen =
      toggle.classList.toggle("active");

    overlay.classList.toggle(
      "active",
      isOpen
    );

    document.body.style.overflow =
      isOpen ? "hidden" : "";

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
  const heroVideo =
    document.querySelector(".hero-video");

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
  const section =
    document.querySelector(".history-section");

  const yearEl =
    document.getElementById("year");

  const historyImg =
    document.querySelector(".history-image");

  if (!section || !yearEl) return;

  const startYear = 2026;
  const endYear = 1939;
  const duration = 4000;

  let startTime = null;

  function updateCount(timestamp) {

    if (!startTime) {
      startTime = timestamp;
    }

    const elapsed =
      timestamp - startTime;

    const progress =
      Math.min(elapsed / duration, 1);

    const ease =
      1 - Math.pow(1 - progress, 3);

    yearEl.textContent =
      Math.round(
        startYear -
        (startYear - endYear) * ease
      );

    if (historyImg) {

      historyImg.style.transform =
        `scale(${1 + (1 - ease) * 0.05})`;

    }

    section.classList.add("phase-1");

    if (progress > 0.45) {
      section.classList.add("phase-3");
    }

    if (progress > 0.8) {
      section.classList.add("phase-2");
    }

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  }

  setTimeout(() => {
    requestAnimationFrame(updateCount);
  }, 500);
}


/* ==========================================
   PRODUCT SECTIONS
========================================== */

const productSections = [
  {
    id: "ceramiche",
    title: "Ceramiche",
    subtitle: "Collezioni d’eccellenza",
    description:
      "Superfici contemporanee selezionate per progetti di interior dal carattere distintivo.",

    brands: [
      {
        name: "41zero42",
        slug: "41zero42",
        image:
          "img/prodotti/ceramiche/ceramiche_41zero42.webp"
      },

      {
        name: "Abk",
        slug: "Abk",
        image:
          "img/prodotti/ceramiche/ceramiche_abk.webp"
      }
    ]
  }
];


/* ==========================================
   RENDER PRODUCTS
========================================== */

function renderProductSections() {

  const root =
    document.getElementById("productsRoot");

  if (!root) return;

  root.innerHTML =
    productSections.map(section => `

      <section
        id="${section.id}"
        class="brand-group"
      >

        <div class="container">

          <header class="group-header">

            <h2 class="section-title fade-up">
              ${section.title}
            </h2>

            <p class="section-subtitle fade-up stagger-1">
              ${section.subtitle}
            </p>

            <p class="group-description fade-up stagger-2">
              ${section.description}
            </p>

          </header>

          <div class="figurine-wrapper">

            <button
              class="scroll-arrow left"
              onclick="scrollTrack(this, -1)"
              aria-label="Scorri a sinistra"
            >
              <span class="arrow"></span>
            </button>

            <button
              class="scroll-arrow right"
              onclick="scrollTrack(this, 1)"
              aria-label="Scorri a destra"
            >
              <span class="arrow right-arrow"></span>
            </button>

            <div class="brand-figurine-track">

              ${section.brands.map(brand => `

                <div class="brand-card-mini fade-up">

                  <a
                    href="brand.html?name=${brand.slug}"
                    class="text-decoration-none"
                  >

                    <img
                      src="${brand.image}"
                      alt="${brand.name}"
                      loading="lazy"
                    >

                    <div class="brand-card-overlay">
                      <h3>${brand.name}</h3>
                    </div>

                  </a>

                </div>

              `).join("")}

            </div>

            <div class="carousel-dots"></div>

          </div>

        </div>

      </section>

    `).join("");
}


/* ==========================================
   PLACEHOLDER
========================================== */

function initSearch() {}
function initProductCarousels() {}
function initScrollReveal() {}
function scrollTrack() {}
function caricaBrand() {}