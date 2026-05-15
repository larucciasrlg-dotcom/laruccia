/* ==========================================
   RENDER PRODUCT SECTIONS
========================================== */

function renderProductSections() {

  const root =
    document.getElementById("productsRoot");

  if (!root || typeof productSections === "undefined") {
    return;
  }

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
                      alt="${brand.alt}"
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
   AUTO INIT
========================================== */

function initProductsRender() {
  renderProductSections();

  if (typeof initSearch === "function") initSearch();
  if (typeof initProductCarousels === "function") initProductCarousels();
  if (typeof initScrollReveal === "function") initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProductsRender);
} else {
  initProductsRender();
}