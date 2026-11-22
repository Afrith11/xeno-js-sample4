/**
 * RANGREZ STUDIO - Main Application Logic
 * Navigation, sticky header, mobile drawer, search modal, animations, and form validation.
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initMobileNav();
  initSearchModal();
  initNewsletter();
  initBackToTop();
  highlightActiveNav();
  initGlobalModals();
});

/* ==========================================================================
   1. STICKY HEADER & SCROLL BEHAVIOUR
   ========================================================================== */
function initHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
    lastScrollY = currentScrollY;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-nav-drawer");
  const backdrop = document.getElementById("mobile-nav-backdrop");
  const closeBtn = document.getElementById("mobile-nav-close");

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    if (backdrop) backdrop.classList.add("is-visible");
    document.body.classList.add("mobile-nav-open");
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    if (backdrop) backdrop.classList.remove("is-visible");
    document.body.classList.remove("mobile-nav-open");
  };

  if (toggleBtn) toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });

  // Mobile accordion submenus
  drawer.querySelectorAll(".mobile-submenu-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".mobile-nav-item");
      if (parent) {
        parent.classList.toggle("is-expanded");
      }
    });
  });
}

/* ==========================================================================
   3. GLOBAL SEARCH MODAL
   ========================================================================== */
function initSearchModal() {
  const triggers = document.querySelectorAll(".open-search-trigger, [data-trigger='search']");
  let modal = document.getElementById("rangrez-search-modal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "rangrez-search-modal";
    modal.className = "search-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
      <div class="search-modal-backdrop" id="search-backdrop"></div>
      <div class="search-modal-dialog">
        <header class="search-modal-header">
          <div class="search-input-wrapper">
            <svg class="search-input-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="search" id="global-search-input" class="search-modal-input" placeholder="Search kurtas, sarees, raw silk, zardozi..." autocomplete="off">
            <button type="button" id="search-clear-input" class="search-input-clear" aria-label="Clear query">&times;</button>
          </div>
          <button type="button" id="search-close-btn" class="search-modal-close" aria-label="Close search">&times;</button>
        </header>

        <div class="search-modal-body">
          <div class="search-suggestions" id="search-quick-tags">
            <span class="suggestions-label">POPULAR ATELIER SEARCHES:</span>
            <div class="suggestion-pills">
              <button type="button" class="sugg-pill" data-search-term="Chanderi">Chanderi Silk</button>
              <button type="button" class="sugg-pill" data-search-term="Co-ord">Modern Co-ords</button>
              <button type="button" class="sugg-pill" data-search-term="Zardozi">Zardozi Velvet</button>
              <button type="button" class="sugg-pill" data-search-term="Saree">Pre-Draped Sarees</button>
              <button type="button" class="sugg-pill" data-search-term="Terracotta">Burnt Terracotta</button>
              <button type="button" class="sugg-pill" data-search-term="Raw Silk">Raw Silk</button>
            </div>
          </div>

          <div id="search-results-container" class="search-results-grid"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const input = document.getElementById("global-search-input");
  const clearBtn = document.getElementById("search-clear-input");
  const closeBtn = document.getElementById("search-close-btn");
  const backdrop = document.getElementById("search-backdrop");
  const resultsContainer = document.getElementById("search-results-container");

  const openSearch = () => {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    setTimeout(() => input?.focus(), 150);
  };

  const closeSearch = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (input) input.value = "";
    if (resultsContainer) resultsContainer.innerHTML = "";
  };

  triggers.forEach(t => t.addEventListener("click", (e) => {
    e.preventDefault();
    openSearch();
  }));

  if (closeBtn) closeBtn.addEventListener("click", closeSearch);
  if (backdrop) backdrop.addEventListener("click", closeSearch);

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (input) {
        input.value = "";
        input.focus();
        resultsContainer.innerHTML = "";
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeSearch();
    }
  });

  // Suggestion tags click
  modal.querySelectorAll(".sugg-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      const term = pill.getAttribute("data-search-term");
      if (input) {
        input.value = term;
        performSearch(term);
      }
    });
  });

  // Live Debounced Search
  let debounceTimer;
  if (input) {
    input.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.trim();
      debounceTimer = setTimeout(() => {
        performSearch(query);
      }, 200);
    });
  }

  function performSearch(query) {
    if (!resultsContainer) return;
    if (!query) {
      resultsContainer.innerHTML = "";
      return;
    }

    if (typeof RANGREZ_PRODUCTS === "undefined") {
      resultsContainer.innerHTML = "<p class='search-empty-text'>Catalogue loading...</p>";
      return;
    }

    const q = query.toLowerCase();
    const matches = RANGREZ_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p class="search-no-res-title">No silhouettes found matching "${query}"</p>
          <p class="search-no-res-hint">Try searching for fabrics (Chanderi, Raw Silk), silhouettes (Kurta, Saree, Co-ord), or festive colours.</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="search-count-label">Found ${matches.length} artisanal silhouette${matches.length > 1 ? "s" : ""}</div>
      <div class="search-items-row">
        ${matches.map(p => `
          <a href="product.html?id=${p.id}" class="search-result-card" onclick="document.getElementById('search-close-btn').click()">
            <div class="search-card-img">
              <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
            </div>
            <div class="search-card-info">
              <span class="search-card-cat">${p.categoryLabel}</span>
              <h4 class="search-card-name">${p.name}</h4>
              <span class="search-card-price">${formatINR(p.price)}</span>
            </div>
          </a>
        `).join("")}
      </div>
    `;
  }
}

/* ==========================================================================
   4. ACTIVE NAVIGATION LINK HIGHLIGHTING
   ========================================================================== */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPath = href.split("/").pop().split("?")[0];

    if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
      link.classList.add("is-active");
    } else {
      link.classList.remove("is-active");
    }
  });
}

/* ==========================================================================
   5. NEWSLETTER FORM
   ========================================================================== */
function initNewsletter() {
  const forms = document.querySelectorAll(".newsletter-form, #atelier-newsletter-form");

  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      const status = form.querySelector(".newsletter-feedback");
      const email = input?.value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        if (status) {
          status.textContent = "Please enter a valid email address.";
          status.className = "newsletter-feedback feedback-error";
          status.style.display = "block";
        }
        return;
      }

      // Successful fictional subscription
      form.classList.add("is-submitted");
      if (input) input.disabled = true;
      const submitBtn = form.querySelector("button[type='submit']");
      if (submitBtn) submitBtn.disabled = true;

      if (status) {
        status.innerHTML = `
          <strong>Welcome to Rangrez Atelier Dispatch.</strong><br>
          We look forward to sharing our upcoming textile stories and seasonal private previews with you.
        `;
        status.className = "newsletter-feedback feedback-success";
        status.style.display = "block";
      }

      if (window.rangrezCart) {
        window.rangrezCart.showToast("Thank you for joining the Rangrez Atelier circle.");
      }
    });
  });
}

/* ==========================================================================
   6. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  let btn = document.getElementById("back-to-top-btn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "back-to-top-btn";
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  }, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   7. GLOBAL MODALS & HELPERS
   ========================================================================== */
function initGlobalModals() {
  // ESC listener for any open overlay
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const qvModal = document.getElementById("rangrez-quick-view-modal");
      if (qvModal && qvModal.classList.contains("is-open")) {
        qvModal.classList.remove("is-open");
        document.body.classList.remove("modal-open");
      }
    }
  });
}
