# RANGREZ STUDIO
### Contemporary Indian Fashion & Luxury Ethnic Boutique Website
> **Rooted in Culture. Made for Now.**  
> Sample Website 04 in a 5-part luxury fashion boutique collection.

---

## 1. Brand & Creative Identity

**RANGREZ STUDIO** is an award-winning fictional Indian luxury couture house blending generational handloom textile craft with bold international architectural tailoring. 

Unlike conventional traditional ethnic templates, RANGREZ STUDIO presents an editorial, magazine-grade visual aesthetic characterized by:
- **Asymmetrical Editorial Compositions** with dynamic grid-breaking visual layouts.
- **Rich Earth & Heritage Palette**:
  - Burnt Terracotta (`#A34F37`)
  - Deep Maroon (`#572B37`)
  - Warm Sand (`#E9D8C5`)
  - Marigold (`#D99B35`)
  - Forest Green (`#354C3D`)
  - Warm Ivory (`#F7F0E7`)
  - Deep Brown (`#382D28`)
  - Antique Gold & Brass accents (`#C5A059`)
- **Editorial Typography**: Cormorant Garamond & Cinzel serif wordmark paired with Plus Jakarta Sans for refined legibility.
- **Narrative Textile Craft**: In-depth tributes to Banarasi kadwa brocade, Chanderi weaving, wild tussar silk, and royal zardozi bullion needlework.

---

## 2. Technology & Architecture

- **HTML5**: Semantic, accessible markup with ARIA landmarks.
- **CSS3**: Native CSS Variables, 3-column CSS Grid navigation (`1fr auto 1fr`), Flexbox, responsive typography clamp, and hardware-accelerated animations.
- **Vanilla JavaScript (ES6+)**: Zero external frameworks, zero dependencies. Fully modular architecture:
  - `products.js`: High-fidelity product catalogue with 12 authentic silhouettes, prices in INR, sizes, swatches, and craft stories.
  - `cart.js`: `localStorage` persistence engine, mini cart slide-over drawer, wishlist drawer, discount promo vouchers, and toast notification system.
  - `filters.js`: Dynamic catalogue filtering by category, colour, size, price range slider, search query, and sorting algorithms.
  - `main.js`: Sticky header transition, mobile drawer with scroll lock, live global debounced search modal, newsletter validation, and back-to-top button.
- **Vercel Deployment Ready**: 100% static architecture deployable immediately with zero build step.

---

## 3. Included Pages

1. **`index.html`** — Editorial Homepage (Campaign Hero, Category Discovery, New Collection, Textile Stories, Festive Edit, Style Journal, Brand Philosophy, Customer Testimonials, Newsletter, Footer).
2. **`shop.html`** — Shop All Silhouettes (Active filters bar, price slider, color swatches, size buttons, sort selector, in-catalogue search, and reactive cards).
3. **`new-arrivals.html`** — The New India Edit / 2026 (Curated seasonal debuts, curator's statement, and lookbook showcase).
4. **`contemporary-ethnic.html`** — Contemporary Ethnic (Modern silhouettes, asymmetric cuts, tailored co-ord sets, and runway styling notes).
5. **`festive-collection.html`** — Festive Stories (Royal maroon & terracotta occasion wear, velvet capes, brocade trench coats, and bespoke bridal concierge banner).
6. **`product.html`** — Comprehensive Product Details (URL parameter parsing `?id=rg-01`, zoomable gallery with thumbnail switcher, color picker, size selector, interactive Size Guide Modal, stock urgency indicator, luxury accordion specs, and "Pairs Beautifully With" cross-sell).
7. **`about.html`** — Our Story & Atelier (Manifesto, 3 Craft Chapters: The Loom, The Palette, The Cut, Interactive Milestones Timeline 2019-2026, and Flagship Salon locations).
8. **`journal.html`** — Style Journal (Lead cover essay, 6 full articles including "The New Language of Indian Fashion", "A Modern Take on Traditional Dressing", and "Colours That Tell Stories", featuring an interactive full-article modal reader).
9. **`contact.html`** — Client Concierge & Atelier Visits (Dual Flagship Ateliers in New Delhi & Mumbai, interactive Bespoke Appointment Request form with validation, and FAQ accordion).
10. **`cart.html`** — Dedicated Shopping Bag (Full cart table with quantity steppers, promo voucher discount validation e.g. `RANGREZ10`, complimentary packaging & shipping calculation, and multi-step interactive Checkout Flow with unique order reference generation).

---

## 4. Quality Assurance & Testing

- **Navigation Center Alignment**: Desktop wordmark is mathematically centered via `1fr auto 1fr` CSS grid across all 10 pages.
- **Mobile Usability**: Mobile navigation drawer locks background scrolling, supports touch interactions, close button, and keyboard `Escape` dismissal.
- **Responsive Breakpoints Verified**:
  - `1440px` & `1366px` Desktop / Wide Screens
  - `1280px` & `1024px` Compact Laptops & Tablets
  - `768px` Tablets & Large Phones
  - `430px`, `390px`, & `360px` Mobile Viewports (strictly zero horizontal overflow).
- **Cart & Wishlist Engine**: Real-time synchronization across all pages using custom events and `localStorage`.
- **Image Integrity**: Verified high-resolution Unsplash photography with responsive aspect ratios and lazy loading.
- **Reduced Motion**: Respects `prefers-reduced-motion` media queries.

---

## 5. Deployment Instructions (Vercel)

1. Deploy directly to Vercel via CLI or Git repository:
   ```bash
   vercel
   ```
2. Build Settings:
   - Framework Preset: **Other**
   - Root Directory: `./` (or leave default)
   - Output Directory: `./` (or leave default)
3. The website is immediately live as a fast static site.

---
&copy; 2026 RANGREZ STUDIO. All rights reserved. Sample 04 Contemporary Indian Luxury Boutique.
