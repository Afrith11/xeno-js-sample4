/**
 * RANGREZ STUDIO - Shopping Cart & Wishlist State Engine
 * Manages localStorage persistence, calculations, promo vouchers, and global drawers.
 */

const STORAGE_KEYS = {
  CART: "rangrez_cart_v1",
  WISHLIST: "rangrez_wishlist_v1",
  PROMO: "rangrez_promo_v1"
};

// Available Demo Promo Codes
const VALID_PROMOS = {
  "RANGREZ10": { type: "percentage", value: 10, description: "10% off your entire atelier order" },
  "FESTIVE": { type: "flat", value: 2500, description: "₹2,500 festive celebratory privilege" },
  "FIRSTEDIT": { type: "percentage", value: 15, description: "15% off for your debut Rangrez wardrobe" }
};

class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.promo = this.loadPromo();
    this.init();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(this.cart));
      this.updateBadges();
      this.renderMiniCart();
      window.dispatchEvent(new CustomEvent("rangrez:cart-updated", { detail: { cart: this.cart } }));
    } catch (e) {
      console.error("Could not save cart", e);
    }
  }

  loadWishlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(this.wishlist));
      this.updateBadges();
      this.renderWishlistDrawer();
      window.dispatchEvent(new CustomEvent("rangrez:wishlist-updated", { detail: { wishlist: this.wishlist } }));
    } catch (e) {
      console.error("Could not save wishlist", e);
    }
  }

  loadPromo() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROMO);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  savePromo(promo) {
    this.promo = promo;
    if (promo) {
      localStorage.setItem(STORAGE_KEYS.PROMO, JSON.stringify(promo));
    } else {
      localStorage.removeItem(STORAGE_KEYS.PROMO);
    }
    window.dispatchEvent(new CustomEvent("rangrez:promo-updated", { detail: { promo: this.promo } }));
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.updateBadges();
      this.setupGlobalEvents();
      this.injectDrawers();
    });
  }

  // Cart operations
  addItem(product, size = "S", color = null, quantity = 1) {
    const selectedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : "Standard");
    const existingIndex = this.cart.findIndex(
      item => item.id === product.id && item.size === size && item.color === selectedColor
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: (product.images && product.images.length > 0) ? product.images[0] : "",
        color: selectedColor,
        size: size,
        quantity: quantity,
        category: product.categoryLabel || "Couture"
      });
    }

    this.saveCart();
    this.showToast(`Added "${product.name}" (${size}) to your Shopping Bag.`);
    this.openMiniCart();
  }

  removeItem(index) {
    if (index >= 0 && index < this.cart.length) {
      const removed = this.cart.splice(index, 1)[0];
      this.saveCart();
      this.showToast(`Removed "${removed.name}" from your Shopping Bag.`);
    }
  }

  updateQuantity(index, newQty) {
    if (index >= 0 && index < this.cart.length) {
      if (newQty <= 0) {
        this.removeItem(index);
      } else {
        this.cart[index].quantity = Math.min(10, Math.max(1, newQty));
        this.saveCart();
      }
    }
  }

  clear() {
    this.cart = [];
    this.promo = null;
    localStorage.removeItem(STORAGE_KEYS.PROMO);
    this.saveCart();
  }

  getTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discount = 0;

    if (this.promo && subtotal > 0) {
      if (this.promo.type === "percentage") {
        discount = Math.round(subtotal * (this.promo.value / 100));
      } else if (this.promo.type === "flat") {
        discount = Math.min(subtotal, this.promo.value);
      }
    }

    const shipping = 0; // Complimentary express delivery
    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      shipping,
      total,
      itemCount: this.cart.reduce((sum, item) => sum + item.quantity, 0)
    };
  }

  applyPromoCode(code) {
    const cleanCode = code ? code.trim().toUpperCase() : "";
    if (!cleanCode) {
      return { success: false, message: "Please enter an atelier privilege code." };
    }
    const matched = VALID_PROMOS[cleanCode];
    if (matched) {
      this.savePromo({ code: cleanCode, ...matched });
      this.saveCart();
      return { success: true, message: `Privilege code "${cleanCode}" applied: ${matched.description}` };
    } else {
      return { success: false, message: "Invalid code. Try RANGREZ10, FESTIVE, or FIRSTEDIT." };
    }
  }

  removePromoCode() {
    this.savePromo(null);
    this.saveCart();
    return { success: true, message: "Privilege code removed." };
  }

  // Wishlist operations
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    let added = false;
    if (index > -1) {
      this.wishlist.splice(index, 1);
      added = false;
    } else {
      this.wishlist.push(productId);
      added = true;
    }
    this.saveWishlist();

    const product = typeof getProductById === "function" ? getProductById(productId) : null;
    const name = product ? product.name : "Silhouette";
    this.showToast(added ? `Saved "${name}" to Wishlist.` : `Removed "${name}" from Wishlist.`);
    this.updateWishlistButtons();
    return added;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  // Badges update
  updateBadges() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const wishlistCount = this.wishlist.length;

    document.querySelectorAll(".cart-count-badge").forEach(el => {
      el.textContent = totalCount;
      el.style.display = totalCount > 0 ? "inline-flex" : "none";
    });

    document.querySelectorAll(".wishlist-count-badge").forEach(el => {
      el.textContent = wishlistCount;
      el.style.display = wishlistCount > 0 ? "inline-flex" : "none";
    });
  }

  updateWishlistButtons() {
    document.querySelectorAll("[data-wishlist-id]").forEach(btn => {
      const pid = btn.getAttribute("data-wishlist-id");
      const active = this.isInWishlist(pid);
      btn.classList.toggle("is-active", active);
      const icon = btn.querySelector("svg, i");
      if (icon) {
        if (active) {
          btn.setAttribute("aria-label", "Remove from Wishlist");
        } else {
          btn.setAttribute("aria-label", "Add to Wishlist");
        }
      }
    });
  }

  // Toast notifications
  showToast(message, type = "info") {
    let container = document.getElementById("rangrez-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "rangrez-toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `rangrez-toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-indicator"></div>
      <div class="toast-content">${message}</div>
      <button class="toast-close" aria-label="Close notification">&times;</button>
    `;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    const removeToast = () => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector(".toast-close").addEventListener("click", removeToast);
    setTimeout(removeToast, 4000);
  }

  // Global Drawers Injection
  injectDrawers() {
    if (document.getElementById("rangrez-mini-cart")) return;

    const drawerHTML = `
      <!-- Backdrop -->
      <div id="rangrez-drawer-backdrop" class="drawer-backdrop" aria-hidden="true"></div>

      <!-- Mini Cart Drawer -->
      <aside id="rangrez-mini-cart" class="editorial-drawer" aria-labelledby="mini-cart-heading" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="drawer-inner">
          <header class="drawer-header">
            <div>
              <span class="drawer-eyebrow">YOUR ATELIER SELECTION</span>
              <h2 id="mini-cart-heading" class="drawer-title">Shopping Bag</h2>
            </div>
            <button id="close-mini-cart-btn" class="drawer-close-btn" aria-label="Close Shopping Bag">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </header>

          <div id="mini-cart-items-container" class="drawer-body">
            <!-- Dynamically Rendered -->
          </div>

          <footer id="mini-cart-footer" class="drawer-footer">
            <!-- Dynamically Rendered Totals & Checkout -->
          </footer>
        </div>
      </aside>

      <!-- Wishlist Drawer -->
      <aside id="rangrez-wishlist-drawer" class="editorial-drawer" aria-labelledby="wishlist-heading" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="drawer-inner">
          <header class="drawer-header">
            <div>
              <span class="drawer-eyebrow">CURATED FAVOURITES</span>
              <h2 id="wishlist-heading" class="drawer-title">Your Wishlist</h2>
            </div>
            <button id="close-wishlist-btn" class="drawer-close-btn" aria-label="Close Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </header>

          <div id="wishlist-items-container" class="drawer-body">
            <!-- Dynamically Rendered -->
          </div>

          <footer class="drawer-footer">
            <a href="shop.html" class="btn btn-outline btn-full">EXPLORE FULL CATALOGUE</a>
          </footer>
        </div>
      </aside>
    `;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = drawerHTML;
    document.body.appendChild(wrapper);

    // Drawer triggers & listeners
    const backdrop = document.getElementById("rangrez-drawer-backdrop");
    const closeCart = document.getElementById("close-mini-cart-btn");
    const closeWish = document.getElementById("close-wishlist-btn");

    if (backdrop) backdrop.addEventListener("click", () => this.closeAllDrawers());
    if (closeCart) closeCart.addEventListener("click", () => this.closeMiniCart());
    if (closeWish) closeWish.addEventListener("click", () => this.closeWishlistDrawer());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeAllDrawers();
    });

    this.renderMiniCart();
    this.renderWishlistDrawer();
  }

  setupGlobalEvents() {
    // Open bag drawer on bag triggers
    document.querySelectorAll(".open-cart-trigger, [data-trigger='cart']").forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        // If user is already on cart.html, let link navigate or open drawer
        if (window.location.pathname.endsWith("cart.html")) return;
        e.preventDefault();
        this.openMiniCart();
      });
    });

    // Open wishlist drawer on wishlist triggers
    document.querySelectorAll(".open-wishlist-trigger, [data-trigger='wishlist']").forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        this.openWishlistDrawer();
      });
    });

    // Wishlist clicks
    document.addEventListener("click", (e) => {
      const wishBtn = e.target.closest("[data-wishlist-id]");
      if (wishBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = wishBtn.getAttribute("data-wishlist-id");
        this.toggleWishlist(id);
      }
    });

    // Quick Add clicks
    document.addEventListener("click", (e) => {
      const quickAddBtn = e.target.closest("[data-quick-add-id]");
      if (quickAddBtn) {
        e.preventDefault();
        e.stopPropagation();
        const id = quickAddBtn.getAttribute("data-quick-add-id");
        const product = typeof getProductById === "function" ? getProductById(id) : null;
        if (product) {
          this.addItem(product, product.sizes[0] || "S", product.colors[0]?.name || "Standard", 1);
        }
      }
    });
  }

  openMiniCart() {
    this.renderMiniCart();
    const drawer = document.getElementById("rangrez-mini-cart");
    const backdrop = document.getElementById("rangrez-drawer-backdrop");
    if (drawer && backdrop) {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      backdrop.classList.add("is-visible");
      document.body.classList.add("drawer-open");
    }
  }

  closeMiniCart() {
    const drawer = document.getElementById("rangrez-mini-cart");
    const backdrop = document.getElementById("rangrez-drawer-backdrop");
    if (drawer) {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
    }
    if (backdrop) backdrop.classList.remove("is-visible");
    document.body.classList.remove("drawer-open");
  }

  openWishlistDrawer() {
    this.renderWishlistDrawer();
    const drawer = document.getElementById("rangrez-wishlist-drawer");
    const backdrop = document.getElementById("rangrez-drawer-backdrop");
    if (drawer && backdrop) {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      backdrop.classList.add("is-visible");
      document.body.classList.add("drawer-open");
    }
  }

  closeWishlistDrawer() {
    const drawer = document.getElementById("rangrez-wishlist-drawer");
    const backdrop = document.getElementById("rangrez-drawer-backdrop");
    if (drawer) {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
    }
    if (backdrop) backdrop.classList.remove("is-visible");
    document.body.classList.remove("drawer-open");
  }

  closeAllDrawers() {
    this.closeMiniCart();
    this.closeWishlistDrawer();
  }

  renderMiniCart() {
    const container = document.getElementById("mini-cart-items-container");
    const footer = document.getElementById("mini-cart-footer");
    if (!container || !footer) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="drawer-empty-state">
          <div class="empty-icon-wrap">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </div>
          <p class="empty-title">Your shopping bag is currently unfilled.</p>
          <p class="empty-subtitle">Explore our contemporary couture edits and invite art into your wardrobe.</p>
          <a href="shop.html" class="btn btn-primary" onclick="rangrezCart.closeMiniCart()">EXPLORE CATALOGUE</a>
        </div>
      `;
      footer.innerHTML = "";
      return;
    }

    const totals = this.getTotals();

    container.innerHTML = `
      <div class="drawer-item-list">
        ${this.cart.map((item, index) => `
          <article class="drawer-item" data-cart-index="${index}">
            <div class="drawer-item-img">
              <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="drawer-item-details">
              <span class="item-cat">${item.category}</span>
              <h3 class="item-name"><a href="product.html?id=${item.id}">${item.name}</a></h3>
              <div class="item-meta">
                <span class="item-variant">Size: <strong>${item.size}</strong></span>
                <span class="item-variant-sep">|</span>
                <span class="item-variant">Colour: <strong>${item.color}</strong></span>
              </div>
              <div class="item-price-row">
                <div class="item-stepper">
                  <button type="button" class="stepper-btn" onclick="rangrezCart.updateQuantity(${index}, ${item.quantity - 1})" aria-label="Decrease quantity">&minus;</button>
                  <span class="stepper-value">${item.quantity}</span>
                  <button type="button" class="stepper-btn" onclick="rangrezCart.updateQuantity(${index}, ${item.quantity + 1})" aria-label="Increase quantity">&plus;</button>
                </div>
                <div class="item-cost">
                  <span class="item-total-price">${formatINR(item.price * item.quantity)}</span>
                  ${item.quantity > 1 ? `<span class="item-unit-price">(${formatINR(item.price)} each)</span>` : ""}
                </div>
              </div>
              <button type="button" class="item-remove-link" onclick="rangrezCart.removeItem(${index})">Remove</button>
            </div>
          </article>
        `).join("")}
      </div>
    `;

    footer.innerHTML = `
      <div class="drawer-summary">
        <div class="summary-line">
          <span>Subtotal (${totals.itemCount} items)</span>
          <span class="summary-val">${formatINR(totals.subtotal)}</span>
        </div>
        ${totals.discount > 0 ? `
          <div class="summary-line summary-discount">
            <span>Privilege Discount (${this.promo.code})</span>
            <span class="summary-val">&minus;${formatINR(totals.discount)}</span>
          </div>
        ` : ""}
        <div class="summary-line">
          <span>Express Delivery</span>
          <span class="summary-val text-success">Complimentary</span>
        </div>
        <div class="summary-line summary-grand-total">
          <span>Estimated Total</span>
          <span class="summary-val grand-val">${formatINR(totals.total)}</span>
        </div>
      </div>
      <div class="drawer-actions">
        <a href="cart.html" class="btn btn-primary btn-full">VIEW FULL SHOPPING BAG</a>
        <a href="shop.html" class="btn btn-outline btn-full" onclick="rangrezCart.closeMiniCart()">CONTINUE EXPLORING</a>
      </div>
      <p class="drawer-notice">Taxes included. Handcrafted packaging with bespoke ribboning.</p>
    `;
  }

  renderWishlistDrawer() {
    const container = document.getElementById("wishlist-items-container");
    if (!container) return;

    if (this.wishlist.length === 0) {
      container.innerHTML = `
        <div class="drawer-empty-state">
          <div class="empty-icon-wrap">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>
          <p class="empty-title">Your wishlist is currently empty.</p>
          <p class="empty-subtitle">Save silhouettes as you discover them and curate your personal luxury edit.</p>
          <a href="shop.html" class="btn btn-primary" onclick="rangrezCart.closeWishlistDrawer()">DISCOVER SILHOUETTES</a>
        </div>
      `;
      return;
    }

    const items = this.wishlist.map(id => typeof getProductById === "function" ? getProductById(id) : null).filter(Boolean);

    container.innerHTML = `
      <div class="drawer-item-list">
        ${items.map(product => `
          <article class="drawer-item">
            <div class="drawer-item-img">
              <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            </div>
            <div class="drawer-item-details">
              <span class="item-cat">${product.categoryLabel}</span>
              <h3 class="item-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
              <div class="item-cost">
                <span class="item-total-price">${formatINR(product.price)}</span>
                ${product.originalPrice ? `<span class="item-original-price">${formatINR(product.originalPrice)}</span>` : ""}
              </div>
              <div class="drawer-wishlist-actions">
                <button type="button" class="btn btn-sm btn-primary" onclick="rangrezCart.addItem(getProductById('${product.id}'), '${product.sizes[0]}', '${product.colors[0].name}', 1); rangrezCart.toggleWishlist('${product.id}');">MOVE TO BAG</button>
                <button type="button" class="item-remove-link" onclick="rangrezCart.toggleWishlist('${product.id}')">Remove</button>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }
}

// Global Singleton Instance
const rangrezCart = new CartManager();
window.rangrezCart = rangrezCart;
