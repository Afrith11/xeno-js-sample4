/**
 * RANGREZ STUDIO - Catalogue Filter & Search Controller
 * Powers dynamic product filtering, sorting, price range, and reactive card rendering.
 */

class CatalogueController {
  constructor(options = {}) {
    this.containerId = options.containerId || "catalogue-products-grid";
    this.counterId = options.counterId || "catalogue-count";
    this.emptyStateId = options.emptyStateId || "catalogue-empty-state";
    this.initialCategory = options.initialCategory || "all";
    this.initialCollection = options.initialCollection || null;

    this.filters = {
      category: this.initialCategory,
      collection: this.initialCollection,
      maxPrice: 60000,
      color: "all",
      size: "all",
      sortBy: "featured",
      searchQuery: ""
    };

    this.products = typeof RANGREZ_PRODUCTS !== "undefined" ? [...RANGREZ_PRODUCTS] : [];
    this.init();
  }

  init() {
    // Check URL parameters for preset filters (e.g. ?category=kurtas or ?search=chanderi)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("category")) this.filters.category = urlParams.get("category");
    if (urlParams.has("collection")) this.filters.collection = urlParams.get("collection");
    if (urlParams.has("color")) this.filters.color = urlParams.get("color");
    if (urlParams.has("search")) this.filters.searchQuery = urlParams.get("search");

    const setup = () => {
      this.bindFilterControls();
      this.applyFiltersAndRender();
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setup);
    } else {
      setup();
    }
  }

  bindFilterControls() {
    // Category pills/buttons
    document.querySelectorAll("[data-filter-category]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelectorAll("[data-filter-category]").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        this.filters.category = btn.getAttribute("data-filter-category");
        this.applyFiltersAndRender();
      });

      if (btn.getAttribute("data-filter-category") === this.filters.category) {
        btn.classList.add("is-active");
      }
    });

    // Sort select
    const sortSelect = document.getElementById("catalogue-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.filters.sortBy = e.target.value;
        this.applyFiltersAndRender();
      });
    }

    // Price range slider
    const priceSlider = document.getElementById("price-range-slider");
    const priceDisplay = document.getElementById("price-range-display");
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener("input", (e) => {
        const val = Number(e.target.value);
        this.filters.maxPrice = val;
        priceDisplay.textContent = formatINR(val);
        this.applyFiltersAndRender();
      });
    }

    // Color filter swatches
    document.querySelectorAll("[data-filter-color]").forEach(swatch => {
      swatch.addEventListener("click", () => {
        const colorVal = swatch.getAttribute("data-filter-color");
        if (this.filters.color === colorVal) {
          this.filters.color = "all";
          swatch.classList.remove("is-active");
        } else {
          document.querySelectorAll("[data-filter-color]").forEach(s => s.classList.remove("is-active"));
          swatch.classList.add("is-active");
          this.filters.color = colorVal;
        }
        this.applyFiltersAndRender();
      });
    });

    // Size filter buttons
    document.querySelectorAll("[data-filter-size]").forEach(btn => {
      btn.addEventListener("click", () => {
        const sizeVal = btn.getAttribute("data-filter-size");
        if (this.filters.size === sizeVal) {
          this.filters.size = "all";
          btn.classList.remove("is-active");
        } else {
          document.querySelectorAll("[data-filter-size]").forEach(b => b.classList.remove("is-active"));
          btn.classList.add("is-active");
          this.filters.size = sizeVal;
        }
        this.applyFiltersAndRender();
      });
    });

    // In-catalogue search input
    const searchInput = document.getElementById("catalogue-search-input");
    if (searchInput) {
      if (this.filters.searchQuery) {
        searchInput.value = this.filters.searchQuery;
      }
      searchInput.addEventListener("input", (e) => {
        this.filters.searchQuery = e.target.value.trim().toLowerCase();
        this.applyFiltersAndRender();
      });
    }

    // Reset button
    const resetBtn = document.getElementById("catalogue-reset-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        this.resetAllFilters();
      });
    }
  }

  resetAllFilters() {
    this.filters.category = "all";
    this.filters.collection = null;
    this.filters.maxPrice = 60000;
    this.filters.color = "all";
    this.filters.size = "all";
    this.filters.sortBy = "featured";
    this.filters.searchQuery = "";

    // Reset UI controls
    document.querySelectorAll("[data-filter-category]").forEach(b => {
      b.classList.toggle("is-active", b.getAttribute("data-filter-category") === "all");
    });
    document.querySelectorAll("[data-filter-color]").forEach(s => s.classList.remove("is-active"));
    document.querySelectorAll("[data-filter-size]").forEach(b => b.classList.remove("is-active"));

    const sortSelect = document.getElementById("catalogue-sort-select");
    if (sortSelect) sortSelect.value = "featured";

    const priceSlider = document.getElementById("price-range-slider");
    const priceDisplay = document.getElementById("price-range-display");
    if (priceSlider && priceDisplay) {
      priceSlider.value = 60000;
      priceDisplay.textContent = formatINR(60000);
    }

    const searchInput = document.getElementById("catalogue-search-input");
    if (searchInput) searchInput.value = "";

    this.applyFiltersAndRender();
  }

  applyFiltersAndRender() {
    let list = [...this.products];

    // Category
    if (this.filters.category && this.filters.category !== "all") {
      list = list.filter(p => p.category === this.filters.category);
    }

    // Collection (e.g. New Arrivals or Festive)
    if (this.filters.collection) {
      if (this.filters.collection === "new") list = list.filter(p => p.isNewArrival);
      else if (this.filters.collection === "festive") list = list.filter(p => p.isFestive);
      else if (this.filters.collection === "contemporary") list = list.filter(p => p.isContemporary);
    }

    // Price
    list = list.filter(p => p.price <= this.filters.maxPrice);

    // Color
    if (this.filters.color && this.filters.color !== "all") {
      list = list.filter(p => p.colors.some(c => c.name.toLowerCase().includes(this.filters.color.toLowerCase())));
    }

    // Size
    if (this.filters.size && this.filters.size !== "all") {
      list = list.filter(p => p.sizes.includes(this.filters.size));
    }

    // Search
    if (this.filters.searchQuery) {
      const q = this.filters.searchQuery;
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (this.filters.sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (this.filters.sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (this.filters.sortBy === "newest") {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (this.filters.sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // featured default
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    this.renderProducts(list);
    this.updateCounter(list.length, this.products.length);
  }

  updateCounter(shown, total) {
    const counter = document.getElementById(this.counterId);
    if (counter) {
      counter.innerHTML = `Showing <strong>${shown}</strong> of ${total} Silhouettes`;
    }
  }

  renderProducts(list) {
    const grid = document.getElementById(this.containerId);
    const emptyState = document.getElementById(this.emptyStateId);
    if (!grid) return;

    if (list.length === 0) {
      grid.innerHTML = "";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    if (emptyState) emptyState.style.display = "none";

    grid.innerHTML = list.map(product => this.createProductCardHTML(product)).join("");

    // Synchronize wishlist states on newly rendered buttons
    if (window.rangrezCart) {
      window.rangrezCart.updateWishlistButtons();
    }
  }

  createProductCardHTML(p) {
    const isInWish = window.rangrezCart ? window.rangrezCart.isInWishlist(p.id) : false;
    const secondImg = p.images[1] || p.images[0];

    return `
      <article class="rangrez-card" data-product-id="${p.id}">
        <div class="card-visual">
          <a href="product.html?id=${p.id}" class="visual-link" aria-label="${p.name}">
            <img src="${p.images[0]}" alt="${p.name}" class="img-primary" loading="lazy">
            <img src="${secondImg}" alt="${p.name} alternate view" class="img-secondary" loading="lazy">
          </a>

          ${p.isNewArrival ? `<span class="card-badge badge-editorial">NEW INDIA EDIT</span>` : ""}
          ${p.isFestive ? `<span class="card-badge badge-festive">FESTIVE COUTURE</span>` : ""}

          <button type="button" class="card-wishlist-btn ${isInWish ? "is-active" : ""}" data-wishlist-id="${p.id}" aria-label="Toggle Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isInWish ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <div class="card-quick-actions">
            <button type="button" class="btn-quick-add" data-quick-add-id="${p.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line></svg>
              QUICK ADD
            </button>
            <button type="button" class="btn-quick-view" onclick="openQuickView('${p.id}')">
              QUICK VIEW
            </button>
          </div>
        </div>

        <div class="card-content">
          <div class="card-category-row">
            <span class="card-category">${p.categoryLabel}</span>
            <span class="card-rating">★ ${p.rating}</span>
          </div>

          <h3 class="card-title">
            <a href="product.html?id=${p.id}">${p.name}</a>
          </h3>

          <div class="card-price-row">
            <span class="card-price">${formatINR(p.price)}</span>
            ${p.originalPrice && p.originalPrice > p.price ? `<span class="card-original-price">${formatINR(p.originalPrice)}</span>` : ""}
          </div>

          <div class="card-swatches">
            ${p.colors.map(c => `
              <span class="color-swatch-dot" style="background-color: ${c.hex};" title="${c.name}"></span>
            `).join("")}
            <span class="card-sizes-hint">${p.sizes.join(" · ")}</span>
          </div>
        </div>
      </article>
    `;
  }
}

// Auto-initialize on catalogue pages if element is present
const autoInitCatalogue = () => {
  if (document.getElementById("catalogue-products-grid") && !window.catalogueCtrl) {
    window.catalogueCtrl = new CatalogueController();
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", autoInitCatalogue);
} else {
  autoInitCatalogue();
}

// Global Quick View Modal Handler
function openQuickView(productId) {
  const product = typeof getProductById === "function" ? getProductById(productId) : null;
  if (!product) return;

  let modal = document.getElementById("rangrez-quick-view-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "rangrez-quick-view-modal";
    modal.className = "quick-view-modal";
    modal.innerHTML = `
      <div class="qv-backdrop" onclick="closeQuickView()"></div>
      <div class="qv-dialog" role="dialog" aria-modal="true">
        <button type="button" class="qv-close-btn" onclick="closeQuickView()" aria-label="Close modal">&times;</button>
        <div id="qv-modal-content" class="qv-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const content = document.getElementById("qv-modal-content");
  content.innerHTML = `
    <div class="qv-grid">
      <div class="qv-gallery">
        <img src="${product.images[0]}" alt="${product.name}" class="qv-main-img" id="qv-active-img">
        <div class="qv-thumbs">
          ${product.images.map((img, i) => `
            <button type="button" class="qv-thumb-btn ${i === 0 ? "is-active" : ""}" onclick="document.getElementById('qv-active-img').src='${img}'; document.querySelectorAll('.qv-thumb-btn').forEach(b => b.classList.remove('is-active')); this.classList.add('is-active');">
              <img src="${img}" alt="Thumbnail ${i + 1}">
            </button>
          `).join("")}
        </div>
      </div>
      <div class="qv-details">
        <span class="qv-category">${product.categoryLabel} · ${product.collection}</span>
        <h2 class="qv-title">${product.name}</h2>
        <div class="qv-price-wrap">
          <span class="qv-price">${formatINR(product.price)}</span>
          ${product.originalPrice ? `<span class="qv-orig-price">${formatINR(product.originalPrice)}</span>` : ""}
          <span class="qv-tax-note">Inclusive of all taxes</span>
        </div>
        <p class="qv-desc">${product.description}</p>
        
        <div class="qv-selector-block">
          <label class="qv-label">SELECT COLOUR: <strong id="qv-color-val">${product.colors[0].name}</strong></label>
          <div class="qv-color-options">
            ${product.colors.map((c, i) => `
              <button type="button" class="qv-color-dot ${i === 0 ? "is-active" : ""}" style="background-color: ${c.hex};" onclick="document.getElementById('qv-color-val').textContent='${c.name}'; document.querySelectorAll('.qv-color-dot').forEach(d => d.classList.remove('is-active')); this.classList.add('is-active');" title="${c.name}"></button>
            `).join("")}
          </div>
        </div>

        <div class="qv-selector-block">
          <div class="qv-size-header">
            <label class="qv-label">SELECT SIZE</label>
            <a href="product.html?id=${product.id}#size-guide" class="qv-guide-link">Atelier Fit Guide</a>
          </div>
          <div class="qv-size-options" id="qv-size-group">
            ${product.sizes.map((s, i) => `
              <button type="button" class="qv-size-btn ${i === 0 ? "is-active" : ""}" onclick="document.querySelectorAll('.qv-size-btn').forEach(b => b.classList.remove('is-active')); this.classList.add('is-active');" data-size="${s}">${s}</button>
            `).join("")}
          </div>
        </div>

        <div class="qv-actions-row">
          <button type="button" class="btn btn-primary btn-full" onclick="
            const activeSize = document.querySelector('#qv-size-group .qv-size-btn.is-active')?.getAttribute('data-size') || 'S';
            const activeColor = document.getElementById('qv-color-val')?.textContent || '${product.colors[0].name}';
            rangrezCart.addItem(getProductById('${product.id}'), activeSize, activeColor, 1);
            closeQuickView();
          ">ADD TO SHOPPING BAG</button>
          <a href="product.html?id=${product.id}" class="btn btn-outline btn-full">VIEW COMPLETE DETAILS</a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("is-open");
  document.body.classList.add("modal-open");
}

function closeQuickView() {
  const modal = document.getElementById("rangrez-quick-view-modal");
  if (modal) {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  }
}
