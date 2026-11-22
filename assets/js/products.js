/**
 * RANGREZ STUDIO - Official Product Catalogue
 * Sample 04: Contemporary Indian Luxury Couture & Ethnic Boutique
 */

const RANGREZ_PRODUCTS = [
  {
    id: "rg-01",
    name: "Noorani Zari Chanderi Kurta Set",
    category: "kurtas",
    categoryLabel: "Designer Kurtas",
    collection: "Contemporary Ethnic",
    isNewArrival: true,
    isFestive: false,
    isContemporary: true,
    isFeatured: true,
    price: 18500,
    originalPrice: 22000,
    rating: 4.9,
    reviewsCount: 38,
    primaryColor: "Burnt Terracotta",
    colors: [
      { name: "Burnt Terracotta", hex: "#A34F37" },
      { name: "Deep Maroon", hex: "#572B37" },
      { name: "Warm Sand", hex: "#E9D8C5" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 4, S: 7, M: 5, L: 2, XL: 3 },
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Handwoven Chanderi silk kurta with muted antique gold zari borders and tailored cigarette trousers.",
    description: "The Noorani Kurta Set marries the gossamer lightness of handloom Chanderi silk with structural contemporary tailoring. Featuring an asymmetric front slit, delicate hand-set antique gold zari threads along the neckline, and paired with straight-cut raw silk trousers. Designed for the modern woman who navigates gallery openings and intimate festive soirees with effortless poise.",
    craftStory: "Woven in the historic textile hubs of Madhya Pradesh by generational master weavers. Each panel takes 14 days of dedicated handloom craft, utilizing real twisted zari threads blended with pure mulberry silk.",
    fabric: "70% Pure Handloom Chanderi Silk, 30% Mulberry Silk. Trousers in Pure Raw Silk.",
    care: "Dry clean only. Store wrapped in muslin cloth away from direct sunlight.",
    modelInfo: "Model is 5'9\" (175 cm), bust 33\", wearing size S. Length: 46 inches.",
    tags: ["Handloom", "Chanderi", "Zari", "Festive", "Bestseller"]
  },
  {
    id: "rg-02",
    name: "Miraya Asymmetric Organza Co-Ord",
    category: "coords",
    categoryLabel: "Contemporary Co-ord Sets",
    collection: "Contemporary Ethnic",
    isNewArrival: true,
    isFestive: false,
    isContemporary: true,
    isFeatured: true,
    price: 22000,
    originalPrice: 26000,
    rating: 4.8,
    reviewsCount: 29,
    primaryColor: "Marigold",
    colors: [
      { name: "Marigold", hex: "#D99B35" },
      { name: "Warm Sand", hex: "#E9D8C5" },
      { name: "Warm Ivory", hex: "#F7F0E7" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 3, S: 5, M: 6, L: 4, XL: 2 },
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Sculptural tiered organza jacket shirt paired with high-waisted pleated palazzo trousers.",
    description: "Architectural modernism meets Indian celebratory exuberance. The Miraya Co-Ord features an exaggerated notched collar, delicate hand-rolled organza hems, and mother-of-pearl buttons. The fluid palazzo trousers offer unmatched movement and drape.",
    craftStory: "Crafted from hand-spun kora organza dyed using natural marigold botanical extracts. Hand-finished with tonal resham French knots along the cuff lines.",
    fabric: "100% Kora Silk Organza lined with butter-soft Habotai silk.",
    care: "Dry clean only. Steam iron on lowest silk setting.",
    modelInfo: "Model is 5'10\" (178 cm), waist 26\", wearing size S. Jacket length: 32 inches, Trouser length: 42 inches.",
    tags: ["Co-ord", "Organza", "Marigold", "Sculptural", "Modern Edit"]
  },
  {
    id: "rg-03",
    name: "Sitara Pre-Draped Chanderi Saree Gown",
    category: "sarees",
    categoryLabel: "Saree-Inspired Outfits",
    collection: "Festive Stories",
    isNewArrival: true,
    isFestive: true,
    isContemporary: true,
    isFeatured: true,
    price: 28500,
    originalPrice: 34000,
    rating: 5.0,
    reviewsCount: 52,
    primaryColor: "Deep Maroon",
    colors: [
      { name: "Deep Maroon", hex: "#572B37" },
      { name: "Burnt Terracotta", hex: "#A34F37" },
      { name: "Forest Green", hex: "#354C3D" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 2, S: 4, M: 5, L: 3, XL: 1 },
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Modern pre-stitched pleated saree with an embroidered corset bodice and cascading pallu drape.",
    description: "Reimagining the six yards for the international stage. The Sitara Saree Gown eliminates tedious draping with precision-engineered pleats, an integrated boned corset bodice with micro-zardozi handwork, and a sweeping pallu that flows with regal grace.",
    craftStory: "The pallu borders feature hand-beaten silver bullion thread (nakshi) and micro pearls, handcrafted over 45 hours at our Old Delhi artisan atelier.",
    fabric: "Tissue Chanderi Silk with Raw Silk Corset and Georgette pleated drape.",
    care: "Specialist couture dry clean only. Store flat in bespoke garment bag.",
    modelInfo: "Model is 5'9\" (175 cm), wearing size S. One-minute zip closure with adjustable corset laces.",
    tags: ["Pre-Draped", "Saree Gown", "Maroon", "Zardozi", "Red Carpet"]
  },
  {
    id: "rg-04",
    name: "Gulmohar Brocade Trench Jacket Set",
    category: "festive",
    categoryLabel: "Statement Ethnic Wear",
    collection: "Festive Stories",
    isNewArrival: false,
    isFestive: true,
    isContemporary: true,
    isFeatured: true,
    price: 34500,
    originalPrice: 39000,
    rating: 4.9,
    reviewsCount: 24,
    primaryColor: "Burnt Terracotta",
    colors: [
      { name: "Burnt Terracotta", hex: "#A34F37" },
      { name: "Forest Green", hex: "#354C3D" },
      { name: "Deep Brown", hex: "#382D28" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 3, S: 4, M: 3, L: 2, XL: 2 },
    images: [
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Floor-length Banarasi kadwa brocade trench coat with belted waist and cigarette trousers.",
    description: "An iconoclastic synthesis of British tailoring and royal Banarasi weave. The Gulmohar Trench features double-breasted horn buttons, storm flaps rendered in floral gold zari brocade, and a structured sash belt that clinches the waist.",
    craftStory: "Woven on traditional jacquard pit-looms in Varanasi using the time-honoured 'Kadwa' technique where each motif is individually hand-locked without loose floating threads at the back.",
    fabric: "Pure Banarasi Katan Silk Brocade lined with mulberry silk crepe.",
    care: "Dry clean only. Do not bleach or tumble dry.",
    modelInfo: "Model is 5'11\" (180 cm), wearing size S. Jacket length: 50 inches.",
    tags: ["Brocade", "Trench", "Kadwa", "Couture", "Statement"]
  },
  {
    id: "rg-05",
    name: "Roohi Tiered Raw Silk Anarkali",
    category: "dresses",
    categoryLabel: "Festive Ensembles",
    collection: "Festive Stories",
    isNewArrival: true,
    isFestive: true,
    isContemporary: true,
    isFeatured: true,
    price: 29800,
    originalPrice: 35000,
    rating: 4.9,
    reviewsCount: 41,
    primaryColor: "Forest Green",
    colors: [
      { name: "Forest Green", hex: "#354C3D" },
      { name: "Deep Maroon", hex: "#572B37" },
      { name: "Warm Sand", hex: "#E9D8C5" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 4, S: 6, M: 7, L: 4, XL: 3 },
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Flared 32-kali raw silk gown with gota patti borders and a gossamer tissue dupatta.",
    description: "A masterclass in volume and proportion. The Roohi Anarkali features 32 hand-cut kalis (panels) in heavy Bhagalpur raw silk, accented with authentic Rajasthani gota patti geometric chevrons and paired with an ethereal organza dupatta.",
    craftStory: "The gota ribbon is painstakingly hand-beaten and shaped into miniature floral motifs before being couched onto the border with metallic zari cord.",
    fabric: "Pure Bhagalpur Raw Silk (Tussar) with Organza Dupatta.",
    care: "Dry clean only. Steam press through damp protective cloth.",
    modelInfo: "Model is 5'8\" (173 cm), wearing size S. Flared hem circumference: 6.5 meters.",
    tags: ["Anarkali", "Gota Patti", "Raw Silk", "Forest Green", "Occasion"]
  },
  {
    id: "rg-06",
    name: "Zafira Embroidered Velvet Cape Set",
    category: "festive",
    categoryLabel: "Statement Ethnic Wear",
    collection: "Festive Stories",
    isNewArrival: false,
    isFestive: true,
    isContemporary: true,
    isFeatured: true,
    price: 38000,
    originalPrice: 45000,
    rating: 5.0,
    reviewsCount: 31,
    primaryColor: "Deep Maroon",
    colors: [
      { name: "Deep Maroon", hex: "#572B37" },
      { name: "Deep Brown", hex: "#382D28" },
      { name: "Forest Green", hex: "#354C3D" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 2, S: 3, M: 4, L: 2, XL: 1 },
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Plush silk-velvet cropped bolero cape with hand-carved dabka zardozi over silk bustier and flared sharara.",
    description: "Opulent winter luxury redefined. The Zafira Set showcases royal silk velvet imbued with dense zardozi, dabka, and beaten sequin embroidery inspired by Mughal architectural jalis. Styled over a tailored bustier and cascading sharara trousers.",
    craftStory: "Hand-embroidered on wooden adda frames by our master artisans in Lucknow using 24k gold electroplated metal wires and semi-precious agate stones.",
    fabric: "Micro-velvet silk blend lined with 100% Habotai silk.",
    care: "Dry clean only. Never apply iron directly to velvet pile.",
    modelInfo: "Model is 5'9\" (175 cm), wearing size S. Cape drop: 18 inches, Sharara length: 43 inches.",
    tags: ["Velvet", "Zardozi", "Cape Set", "Winter Festive", "Couture"]
  },
  {
    id: "rg-07",
    name: "Aanya Draped Dhoti & Peplum Set",
    category: "coords",
    categoryLabel: "Contemporary Co-ord Sets",
    collection: "Contemporary Ethnic",
    isNewArrival: true,
    isFestive: false,
    isContemporary: true,
    isFeatured: false,
    price: 21500,
    originalPrice: 25000,
    rating: 4.7,
    reviewsCount: 18,
    primaryColor: "Warm Sand",
    colors: [
      { name: "Warm Sand", hex: "#E9D8C5" },
      { name: "Burnt Terracotta", hex: "#A34F37" },
      { name: "Warm Ivory", hex: "#F7F0E7" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 3, S: 5, M: 4, L: 3, XL: 2 },
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Corseted peplum tunic with hand-pleated dhoti drape pants in textured wild tussar silk.",
    description: "An homage to the classical Indian dhoti re-engineered with razor-sharp modern tailoring. The corseted peplum top shapes the waistline, while the dhoti trousers provide effortless fluid movement with discreet side pockets.",
    craftStory: "Hand-spun tussar silk woven in eastern India with a textured slub finish. Hand-dyed in small batches with low-impact earthen mineral pigments.",
    fabric: "100% Hand-Spun Wild Tussar Silk.",
    care: "Dry clean only. Medium iron on reverse side.",
    modelInfo: "Model is 5'9\" (175 cm), wearing size S. Elasticated back waistband on dhoti.",
    tags: ["Dhoti Set", "Tussar Silk", "Peplum", "Contemporary", "Everyday Luxury"]
  },
  {
    id: "rg-08",
    name: "Parijaat Marigold Handloom Sharara",
    category: "kurtas",
    categoryLabel: "Designer Kurtas",
    collection: "Festive Stories",
    isNewArrival: false,
    isFestive: true,
    isContemporary: true,
    isFeatured: false,
    price: 26500,
    originalPrice: 31000,
    rating: 4.8,
    reviewsCount: 22,
    primaryColor: "Marigold",
    colors: [
      { name: "Marigold", hex: "#D99B35" },
      { name: "Warm Ivory", hex: "#F7F0E7" },
      { name: "Burnt Terracotta", hex: "#A34F37" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 4, S: 4, M: 6, L: 3, XL: 1 },
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Short straight-cut kurta with silver resham embroidery over a tiered flared sharara skirt.",
    description: "Celebrates the auspicious vibrancy of the marigold flower. Features delicate silver resham embroidery across the jewel neckline, matched with a voluminous three-tiered sharara pants and featherlight organza dupatta.",
    craftStory: "Created using age-old aari needlework techniques passed down through generations of craft families in the Kashmir valley and Rajasthan.",
    fabric: "Mulberry Silk Georgette with Pure Silk lining.",
    care: "Dry clean only. Store in breathable cotton covers.",
    modelInfo: "Model is 5'8\" (173 cm), wearing size S. Kurta length: 36 inches.",
    tags: ["Sharara", "Marigold", "Aari Work", "Sangeet", "Festive"]
  },
  {
    id: "rg-09",
    name: "Kasturi Asymmetrical Angrakha Dress",
    category: "dresses",
    categoryLabel: "Elegant Dresses",
    collection: "Contemporary Ethnic",
    isNewArrival: true,
    isFestive: false,
    isContemporary: true,
    isFeatured: false,
    price: 19500,
    originalPrice: 23000,
    rating: 4.9,
    reviewsCount: 35,
    primaryColor: "Forest Green",
    colors: [
      { name: "Forest Green", hex: "#354C3D" },
      { name: "Deep Brown", hex: "#382D28" },
      { name: "Burnt Terracotta", hex: "#A34F37" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 3, S: 5, M: 4, L: 2, XL: 2 },
    images: [
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Reimagined crossover wrap dress with hand-braided tie strings and asymmetrical handkerchief hem.",
    description: "The historical Indian Angrakha transformed into a modern dress for cosmopolitan life. Detailed with hand-braided silken ties, subtle antique metal latkans, and a bias-cut hem that sways with every step.",
    craftStory: "Woven in Maheshwar with alternating silk and cotton threads, yielding a luminous sheen with breathability.",
    fabric: "Handloom Maheshwari Silk Cotton (60% Silk, 40% Cotton).",
    care: "Dry clean or gentle hand wash in cold water using mild silk liquid detergent.",
    modelInfo: "Model is 5'10\" (178 cm), wearing size S. Dress length: 48 inches.",
    tags: ["Angrakha", "Maheshwari", "Wrap Dress", "Artistic", "Desk to Dinner"]
  },
  {
    id: "rg-10",
    name: "Devi Hand-Pleated Tissue Silk Tunic",
    category: "kurtas",
    categoryLabel: "Designer Kurtas",
    collection: "Everyday Tradition",
    isNewArrival: false,
    isFestive: false,
    isContemporary: true,
    isFeatured: false,
    price: 16800,
    originalPrice: 19500,
    rating: 4.8,
    reviewsCount: 19,
    primaryColor: "Warm Sand",
    colors: [
      { name: "Warm Sand", hex: "#E9D8C5" },
      { name: "Warm Ivory", hex: "#F7F0E7" },
      { name: "Burnt Terracotta", hex: "#A34F37" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 5, S: 7, M: 6, L: 4, XL: 2 },
    images: [
      "https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Minimalist metallic-sheen tissue silk tunic with mandarin collar and mother-of-pearl closures.",
    description: "Pure tactile serenity. Crafted from translucent golden tissue silk with micro accordion pleats along the front yoke. Styled effortlessly over wide-leg ivory trousers or draped casually over tailored denim.",
    craftStory: "Crafted on wooden shuttle looms using high-twist filament silk interwoven with micro-fine gold lurex thread.",
    fabric: "Fine Metallic Tissue Silk with lightweight cotton mull lining.",
    care: "Dry clean only. Iron inside out using a pressing cloth.",
    modelInfo: "Model is 5'9\" (175 cm), wearing size S. Relaxed contemporary fit.",
    tags: ["Tissue Silk", "Minimalist", "Everyday Tradition", "Luminous", "Warm Sand"]
  },
  {
    id: "rg-11",
    name: "Sultana Embroidered Organza Lehenga",
    category: "festive",
    categoryLabel: "Festive Ensembles",
    collection: "Festive Stories",
    isNewArrival: true,
    isFestive: true,
    isContemporary: true,
    isFeatured: true,
    price: 48000,
    originalPrice: 56000,
    rating: 5.0,
    reviewsCount: 44,
    primaryColor: "Deep Maroon",
    colors: [
      { name: "Deep Maroon", hex: "#572B37" },
      { name: "Forest Green", hex: "#354C3D" },
      { name: "Burnt Terracotta", hex: "#A34F37" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 2, S: 3, M: 4, L: 2, XL: 1 },
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Heritage lehenga skirt with hand-cut cutwork borders, sculpted sweetheart blouse, and dupatta.",
    description: "The pinnacle of Rangrez celebratory couture. Over 120 hours of master artisan hand embroidery combine cutwork scallops, sitara sequins, and fine resham threads across layers of midnight organza.",
    craftStory: "Embroidered in our Shahpur Jat studio in New Delhi by generational zardozi artisans.",
    fabric: "Pure Silk Organza, Satin Silk lining, Raw Silk Blouse with hand-beaded tassels.",
    care: "Specialist couture cleaning only. Store wrapped in acid-free tissue paper.",
    modelInfo: "Model is 5'10\" (178 cm), wearing size S. Skirt flare: 8 meters.",
    tags: ["Lehenga", "Couture", "Deep Maroon", "Hand Embroidered", "Bridal Edit"]
  },
  {
    id: "rg-12",
    name: "Meera Draped Saree with Belted Kimono",
    category: "sarees",
    categoryLabel: "Saree-Inspired Outfits",
    collection: "Contemporary Ethnic",
    isNewArrival: false,
    isFestive: false,
    isContemporary: true,
    isFeatured: false,
    price: 27500,
    originalPrice: 32000,
    rating: 4.8,
    reviewsCount: 27,
    primaryColor: "Burnt Terracotta",
    colors: [
      { name: "Burnt Terracotta", hex: "#A34F37" },
      { name: "Deep Brown", hex: "#382D28" },
      { name: "Warm Sand", hex: "#E9D8C5" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 3, S: 4, M: 5, L: 2, XL: 2 },
    images: [
      "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85"
    ],
    shortDesc: "Modal satin pre-draped saree with a structured kimono-sleeve jacket and embroidered waist belt.",
    description: "East Asian silhouette meets ancient Indian drape. A pre-stitched modal satin saree styled with a structured kimono-collar jacket and an obi-inspired leather-embossed waist cinch belt with handcrafted brass buckle.",
    craftStory: "Dyed using vegetable madder root for deep terracotta depth, accented with hand-blocked geometric border stamps.",
    fabric: "High-grade Modal Silk Satin with Pure Silk Crepe Jacket.",
    care: "Dry clean only. Iron at moderate heat with cloth barrier.",
    modelInfo: "Model is 5'9\" (175 cm), wearing size S. Easy pull-on waist with hidden hook fastenings.",
    tags: ["Kimono Saree", "Fusion", "Terracotta", "Modal Satin", "Modern Drape"]
  }
];

// Helper functions for currency and queries
function formatINR(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function getProductById(id) {
  return RANGREZ_PRODUCTS.find(p => p.id === id) || RANGREZ_PRODUCTS[0];
}

function getProductsByCategory(category) {
  if (!category || category === "all") return RANGREZ_PRODUCTS;
  return RANGREZ_PRODUCTS.filter(p => p.category === category);
}

function getFeaturedProducts(limit = 6) {
  return RANGREZ_PRODUCTS.filter(p => p.isFeatured).slice(0, limit);
}

function getNewArrivals() {
  return RANGREZ_PRODUCTS.filter(p => p.isNewArrival);
}

function getFestiveProducts() {
  return RANGREZ_PRODUCTS.filter(p => p.isFestive);
}

function getContemporaryEthnic() {
  return RANGREZ_PRODUCTS.filter(p => p.isContemporary);
}
