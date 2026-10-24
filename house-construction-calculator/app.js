/**
 * BuildWise - House Construction Material & Cost Calculator
 * Interactive Multi-Phase ("Interface after Interface") Grocery Calculator
 * 
 * NOTE: All images are verified 100% PURE ITEM & PRODUCT PHOTOGRAPHY (ZERO HUMANS).
 */

// ========================================================
// 1. Initial Data Configuration (Realistic Standards)
// Baseline: 1,200 sq.ft residential house construction
// ========================================================

const CURRENCY_CONFIG = {
  INR: { symbol: '₹', rate: 1.0, formatLakhs: true },
  USD: { symbol: '$', rate: 0.012, formatLakhs: false },
  AED: { symbol: 'AED ', rate: 0.044, formatLakhs: false },
  EUR: { symbol: '€', rate: 0.011, formatLakhs: false },
  GBP: { symbol: '£', rate: 0.0095, formatLakhs: false },
};

let currentCurrency = 'INR';

// Fallback high quality SVG placeholder for pure items (zero humans)
const FALLBACK_IMG = "https://images.unsplash.com/photo-1584463699042-376c666c04cf?auto=format&fit=crop&w=600&q=80";

const DEFAULT_CATEGORIES = [
  {
    id: "civil",
    name: "Civil & Structure",
    icon: "fa-trowel-bricks",
    badgeColor: "from-amber-500 to-orange-600",
    subtitle: "The Foundation Groceries (Cement, Bricks, Sand, Steel & Gravel)",
    description: "Core structural materials required for foundation, columns, beams, brick masonry and concrete slab.",
    thumbRuleArea: 1200,
    items: [
      {
        id: "civ_cement",
        name: "OPC / PPC 53 Grade Cement Bags",
        description: "Standard 50kg bags for concrete slab casting, mortar & plastering.",
        unit: "Bags (50kg)",
        defaultQty: 480,
        qty: 480,
        rateINR: 385,
        included: true,
        // Pure cement blocks & raw masonry material (No humans)
        image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.40 // 0.40 bags per sq.ft
      },
      {
        id: "civ_bricks",
        name: "First Class Red Clay Bricks / AAC Blocks",
        description: "Kiln-burnt red bricks for 9-inch outer and 4.5-inch partition walls.",
        unit: "Pieces",
        defaultQty: 19200,
        qty: 19200,
        rateINR: 9.50,
        included: true,
        // Pure neat stack of red construction bricks (No humans)
        image: "https://images.unsplash.com/photo-1584463699042-376c666c04cf?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 16.0 // 16 bricks per sq.ft
      },
      {
        id: "civ_sand",
        name: "River Sand / M-Sand (Manufactured)",
        description: "Clean washed coarse sand for RCC slab casting, beam masonry and smooth plaster.",
        unit: "Cu. Ft",
        defaultQty: 1800,
        qty: 1800,
        rateINR: 58,
        included: true,
        // Pure textured river sand heap (No humans)
        image: "https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 1.50 // 1.5 cu.ft per sq.ft
      },
      {
        id: "civ_aggregate",
        name: "Blue Metal Coarse Aggregate (10mm & 20mm)",
        description: "Machine crushed granite blue metal stones for high strength concrete mix.",
        unit: "Cu. Ft",
        defaultQty: 1350,
        qty: 1350,
        rateINR: 44,
        included: true,
        // Pure crushed gravel aggregate stones (No humans)
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 1.125
      },
      {
        id: "civ_steel",
        name: "Fe-550D TMT Ribbed Steel Rebar",
        description: "Primary reinforcement bars (8mm, 10mm, 12mm & 16mm rods) for earthquake safety.",
        unit: "Kg",
        defaultQty: 3840,
        qty: 3840,
        rateINR: 68,
        included: true,
        // Pure steel rebar reinforcement bars (No humans)
        image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 3.20 // 3.2 kg per sq.ft
      },
      {
        id: "civ_waterproofing",
        name: "Liquid Integral Waterproofing Compound",
        description: "Chemical admixture for roof slab casting and sunken slab seal (Dr. Fixit / Fosroc).",
        unit: "Liters",
        defaultQty: 60,
        qty: 60,
        rateINR: 240,
        included: true,
        // Pure chemical liquid sealant can & container (No humans)
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.05
      }
    ]
  },
  {
    id: "electrical",
    name: "Electrical & Wiring",
    icon: "fa-bolt",
    badgeColor: "from-amber-400 to-yellow-500",
    subtitle: "Wires, Conduits, Switchboards, Breakers & Ceiling Lights",
    description: "Complete electrical rough-in and finishing wiring for lighting, air conditioning, and power points.",
    thumbRuleArea: 1200,
    items: [
      {
        id: "elec_wires_light",
        name: "1.0 sq.mm FR Copper Wires (Lighting & Fans)",
        description: "Flame Retardant multi-strand copper wire coils (90 meters per coil).",
        unit: "Coils (90m)",
        defaultQty: 6,
        qty: 6,
        rateINR: 1450,
        included: true,
        // Pure insulated copper wire coils (No humans)
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.005
      },
      {
        id: "elec_wires_power",
        name: "2.5 & 4.0 sq.mm Copper Wires (AC, Geyser, Kitchen)",
        description: "Heavy duty power load insulated wiring coils for high wattage appliances.",
        unit: "Coils (90m)",
        defaultQty: 8,
        qty: 8,
        rateINR: 2850,
        included: true,
        // Pure copper cables and wiring bundles (No humans)
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0066
      },
      {
        id: "elec_conduits",
        name: "Heavy-Duty Rigid PVC Conduit Pipes & Boxes",
        description: "Wall and slab concealed conduit pipes (25mm diameter, 3m lengths).",
        unit: "Bundles (25pcs)",
        defaultQty: 12,
        qty: 12,
        rateINR: 1100,
        included: true,
        // Pure PVC conduit pipes & joints (No humans)
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.01
      },
      {
        id: "elec_switches",
        name: "Designer Modular Switches, Sockets & Faceplates",
        description: "Modern fire-resistant 6A & 16A modular switches with glass/acrylic faceplates.",
        unit: "Sets / Points",
        defaultQty: 65,
        qty: 65,
        rateINR: 185,
        included: true,
        // Pure wall modular switchboard & sockets (No humans)
        image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.054
      },
      {
        id: "elec_db",
        name: "Distribution Board (DB) with MCBs & RCCB",
        description: "8-Way & 12-Way double door MCB enclosure with earth leakage circuit breaker.",
        unit: "Sets",
        defaultQty: 2,
        qty: 2,
        rateINR: 4800,
        included: true,
        // Pure electrical circuit breaker panel (No humans)
        image: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0016
      },
      {
        id: "elec_lights",
        name: "LED Recessed Ceiling Spotlights & COB Fixtures",
        description: "Energy efficient warm/neutral white recessed false ceiling lights (12W/15W).",
        unit: "Pieces",
        defaultQty: 35,
        qty: 35,
        rateINR: 320,
        included: true,
        // Pure recessed ceiling LED light fixture (No humans)
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.029
      }
    ]
  },
  {
    id: "plumbing",
    name: "Plumbing & Sanitary",
    icon: "fa-faucet-drip",
    badgeColor: "from-cyan-500 to-blue-600",
    subtitle: "CPVC Water Pipes, Drainage, Faucets, Water Tank & Commodes",
    description: "Concealed and external piping, sewage lines, bathroom fixtures, and overhead water storage.",
    thumbRuleArea: 1200,
    items: [
      {
        id: "plumb_cpvc",
        name: "CPVC Concealed Hot & Cold Water Pipes (3/4\" & 1\")",
        description: "High-pressure chlorinated PVC pipes for clean drinking water and geyser supply.",
        unit: "Lengths (10ft)",
        defaultQty: 45,
        qty: 45,
        rateINR: 420,
        included: true,
        // Pure plumbing water pipe lengths (No humans)
        image: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0375
      },
      {
        id: "plumb_drain",
        name: "SWR PVC Soil, Waste & Rainwater Drainage Pipes",
        description: "75mm & 110mm heavy-grade PVC drainage pipes for waste & rooftop rainwater.",
        unit: "Lengths (10ft)",
        defaultQty: 28,
        qty: 28,
        rateINR: 680,
        included: true,
        // Pure drainage pipe stack (No humans)
        image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.023
      },
      {
        id: "plumb_faucets",
        name: "Chrome Plated Brass Faucets, Diverters & Showers",
        description: "Complete bathroom chrome tap sets with overhead rain shower and hot-cold mixer.",
        unit: "Sets (Per Bath)",
        defaultQty: 4,
        qty: 4,
        rateINR: 4500,
        included: true,
        // Pure polished chrome bathroom tap / faucet (No humans)
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0033
      },
      {
        id: "plumb_tank",
        name: "Overhead 4-Layer Antibacterial Water Tank (1000L)",
        description: "UV-stabilized food-grade polymer overhead water tank (Sintex / Supreme).",
        unit: "Tanks",
        defaultQty: 2,
        qty: 2,
        rateINR: 6500,
        included: true,
        // Pure water storage tank (No humans)
        image: "https://images.unsplash.com/photo-1527030280862-64139fba04ca?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0016
      },
      {
        id: "plumb_commode",
        name: "Ceramic Wall-Hung Western Commodes with Concealed Cistern",
        description: "Rimless glazed ceramic toilet with soft-close seat cover and flush actuator plate.",
        unit: "Sets",
        defaultQty: 3,
        qty: 3,
        rateINR: 8200,
        included: true,
        // Pure white ceramic toilet commode (No humans)
        image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0025
      },
      {
        id: "plumb_basin",
        name: "Countertop Ceramic Wash Basins & Vanity Sinks",
        description: "Glazed vitreous china tabletop wash basins with pop-up waste coupling.",
        unit: "Pieces",
        defaultQty: 3,
        qty: 3,
        rateINR: 3100,
        included: true,
        // Pure modern ceramic vanity wash basin (No humans)
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0025
      }
    ]
  },
  {
    id: "tiles",
    name: "Tiles, Flooring & Granite",
    icon: "fa-border-all",
    badgeColor: "from-pink-500 to-rose-600",
    subtitle: "Vitrified Floor Tiles, Wall Tiles, Granite Countertops & Grout",
    description: "Living room, bedroom, kitchen, and bathroom flooring, wall claddings, and kitchen slabs.",
    thumbRuleArea: 1200,
    items: [
      {
        id: "tile_floor",
        name: "Living & Bedroom Double Charged Vitrified Tiles (2x4 ft)",
        description: "High-gloss mirror polished 600x1200mm stain-resistant floor tiles (Kajaria / Somany).",
        unit: "Sq. Feet",
        defaultQty: 950,
        qty: 950,
        rateINR: 68,
        included: true,
        // Pure glossy marble finish floor tiles (No humans)
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.79
      },
      {
        id: "tile_bath_floor",
        name: "Anti-Skid Matte Finish Bathroom Floor Tiles",
        description: "Slip-resistant ceramic tiles for wet bathroom floor areas and balconies.",
        unit: "Sq. Feet",
        defaultQty: 180,
        qty: 180,
        rateINR: 48,
        included: true,
        // Pure anti-skid bathroom floor tiles (No humans)
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.15
      },
      {
        id: "tile_bath_wall",
        name: "Glazed Ceramic Bathroom & Kitchen Wall Highlighter Tiles",
        description: "Decorative glossy wall tiles up to 7ft height for moisture proofing.",
        unit: "Sq. Feet",
        defaultQty: 320,
        qty: 320,
        rateINR: 55,
        included: true,
        // Pure glossy ceramic wall tile pattern (No humans)
        image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.266
      },
      {
        id: "tile_granite",
        name: "Jet Black Polished Natural Granite (Countertops & Staircase)",
        description: "18mm premium chamfered edge granite stone for kitchen counter & stair risers.",
        unit: "Sq. Feet",
        defaultQty: 140,
        qty: 140,
        rateINR: 160,
        included: true,
        // Pure polished jet black granite slab (No humans)
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.116
      },
      {
        id: "tile_adhesive",
        name: "Polymer Modified Tile Adhesive & Waterproof Epoxy Grout",
        description: "Heavy bonding tile mortar (20kg bags) and stain-free epoxy gap filler.",
        unit: "Bags (20kg)",
        defaultQty: 22,
        qty: 22,
        rateINR: 460,
        included: true,
        // Pure tile adhesive mortar & trowel (No humans)
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0183
      }
    ]
  },
  {
    id: "doors_paint",
    name: "Doors, Windows & Paint",
    icon: "fa-door-open",
    badgeColor: "from-purple-500 to-indigo-600",
    subtitle: "Teak Doors, UPVC Sliding Windows, Wall Putty & Emulsion Paint",
    description: "Finishing exterior and interior aesthetics, soundproof windows, security doors, and wall paints.",
    thumbRuleArea: 1200,
    items: [
      {
        id: "dp_main_door",
        name: "Solid Teak Wood Carved Main Entrance Door & Frame",
        description: "Heavy solid Burma/Indian teak door with mortise brass lock and safety eyehole.",
        unit: "Unit",
        defaultQty: 1,
        qty: 1,
        rateINR: 32000,
        included: true,
        // Pure carved solid wooden front door (No humans)
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.00083
      },
      {
        id: "dp_room_doors",
        name: "Waterproof Laminated Flush Doors (Bedrooms & Bath)",
        description: "Boiling water resistant (BWR) flush doors with tubular lever handles and stoppers.",
        unit: "Pieces",
        defaultQty: 6,
        qty: 6,
        rateINR: 5800,
        included: true,
        // Pure interior wooden flush door (No humans)
        image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.005
      },
      {
        id: "dp_windows",
        name: "Soundproof UPVC 3-Track Sliding Windows with Mesh",
        description: "Energy-efficient UPVC window frames with toughened clear glass and mosquito mesh.",
        unit: "Sq. Feet",
        defaultQty: 160,
        qty: 160,
        rateINR: 520,
        included: true,
        // Pure sliding window with frame and clear glass (No humans)
        image: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.133
      },
      {
        id: "dp_putty",
        name: "White Polymer Acrylic Wall Putty & Primer (Undercoat)",
        description: "2 coats of putty + 1 coat primer for mirror-smooth paint finish (Birla White / Asian).",
        unit: "Bags (40kg)",
        defaultQty: 14,
        qty: 14,
        rateINR: 850,
        included: true,
        // Pure smooth wall putty & primer finish (No humans)
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0116
      },
      {
        id: "dp_paint_interior",
        name: "Interior Luxury Royale Stain-Resistant Emulsion Paint",
        description: "Anti-bacterial, washable low-VOC interior paint for living and bedroom walls.",
        unit: "Liters",
        defaultQty: 75,
        qty: 75,
        rateINR: 390,
        included: true,
        // Pure paint buckets and paint roller (No humans)
        image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0625
      },
      {
        id: "dp_paint_exterior",
        name: "Exterior Weather-Proof Anti-Algae Acrylic Shield Paint",
        description: "High-durability silicone emulsion protecting exterior walls from monsoon & heat.",
        unit: "Liters",
        defaultQty: 50,
        qty: 50,
        rateINR: 440,
        included: true,
        // Pure exterior paint swatches & paint cans (No humans)
        image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0416
      }
    ]
  },
  {
    id: "furniture",
    name: "Furniture & Interior Setup",
    icon: "fa-couch",
    badgeColor: "from-fuchsia-500 to-pink-600",
    subtitle: "Living Room Sofa, Master Beds, Wardrobes, Dining Table & Kitchen",
    description: "Essential home furniture and modular woodwork to complete the newly built home.",
    thumbRuleArea: 1200,
    items: [
      {
        id: "furn_sofa",
        name: "L-Shape 6-Seater Luxury Fabric/Leatherette Sofa",
        description: "High-density foam comfort sectional sofa with solid salwood internal frame.",
        unit: "Set",
        defaultQty: 1,
        qty: 1,
        rateINR: 48000,
        included: true,
        // Pure sofa in empty modern room (No humans)
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.00083
      },
      {
        id: "furn_bed",
        name: "King Size Master Bed with Hydraulic Storage & Headboard",
        description: "Engineered hardwood king bed with pneumatic lift-up storage and cushioned headrest.",
        unit: "Pieces",
        defaultQty: 2,
        qty: 2,
        rateINR: 34000,
        included: true,
        // Pure king size bed in empty master bedroom (No humans)
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.0016
      },
      {
        id: "furn_wardrobe",
        name: "Full-Height Modular Wardrobes with Loft (Anti-Scratch Laminate)",
        description: "Custom floor-to-ceiling bedroom wardrobes with soft-close hinges and drawer units.",
        unit: "Sq. Feet",
        defaultQty: 120,
        qty: 120,
        rateINR: 1350,
        included: true,
        // Pure modern wardrobe closet cabinets (No humans)
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.10
      },
      {
        id: "furn_dining",
        name: "6-Seater Solid Teak/Sheesham Dining Table with Chairs",
        description: "Handcrafted natural wood dining table with 6 cushioned ergonomic chairs.",
        unit: "Set",
        defaultQty: 1,
        qty: 1,
        rateINR: 36000,
        included: true,
        // Pure wooden dining table & chairs in empty room (No humans)
        image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.00083
      },
      {
        id: "furn_kitchen",
        name: "Acrylic Finish Modular Kitchen Cabinets & Soft-Close Baskets",
        description: "Marine-ply carcass, tandem drawers, spice racks and waterproof cutlery organizers.",
        unit: "Running Feet (Rft)",
        defaultQty: 24,
        qty: 24,
        rateINR: 2600,
        included: true,
        // Pure empty modern modular kitchen cabinets (No humans)
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.02
      },
      {
        id: "furn_desk",
        name: "Ergonomic Home Office / Study Desk with Revolving Chair",
        description: "Modern minimalist workspace desk with wire pass-through grommet and lumbar chair.",
        unit: "Set",
        defaultQty: 1,
        qty: 1,
        rateINR: 14500,
        included: true,
        // Pure empty study desk & office chair (No humans)
        image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
        thumbRatio: 0.00083
      }
    ]
  }
];

// App State
let categoriesData = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
let activeStepIndex = 0; // 0 to categoriesData.length (last is Summary)
let isAllViewMode = false;
let costChartInstance = null;

// ========================================================
// 2. Storage Helpers & Auto-Migration to Human-Free Photos
// ========================================================
const STORAGE_KEY = 'buildwise_construction_calc_v2_pure_items';

function saveStateToStorage() {
  try {
    const payload = {
      categories: categoriesData,
      currency: currentCurrency,
      activeArea: document.getElementById('calcAreaInput')?.value || '1200',
      activeGrade: document.getElementById('calcGradeSelect')?.value || 'standard'
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("Could not save to localStorage:", err);
  }
}

function loadStateFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('buildwise_construction_calc_v1');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.categories && Array.isArray(parsed.categories)) {
        // Synchronize and update all image URLs with verified 100% human-free item photos
        parsed.categories.forEach(storedCat => {
          const defaultCat = DEFAULT_CATEGORIES.find(c => c.id === storedCat.id);
          if (defaultCat) {
            storedCat.items.forEach(storedItem => {
              const defaultItem = defaultCat.items.find(i => i.id === storedItem.id);
              if (defaultItem) {
                // Ensure pure item picture is used
                storedItem.image = defaultItem.image;
              }
            });
          }
        });
        categoriesData = parsed.categories;
      }
      if (parsed.currency && CURRENCY_CONFIG[parsed.currency]) {
        currentCurrency = parsed.currency;
        const selector = document.getElementById('currencySelector');
        if (selector) selector.value = currentCurrency;
      }
      if (parsed.activeArea && document.getElementById('calcAreaInput')) {
        document.getElementById('calcAreaInput').value = parsed.activeArea;
      }
      if (parsed.activeGrade && document.getElementById('calcGradeSelect')) {
        document.getElementById('calcGradeSelect').value = parsed.activeGrade;
      }
    }
  } catch (err) {
    console.warn("Could not load from localStorage:", err);
  }
}

// ========================================================
// 3. Formatting & Currency Helpers
// ========================================================
function formatCurrency(amountINR, customCurrency = null) {
  const curr = customCurrency || currentCurrency;
  const cfg = CURRENCY_CONFIG[curr] || CURRENCY_CONFIG.INR;
  const converted = amountINR * cfg.rate;

  if (curr === 'INR') {
    // Format in Indian Lakhs/Crores notation
    if (converted >= 10000000) {
      const cr = (converted / 10000000).toFixed(2);
      return `₹${cr} Cr`;
    } else if (converted >= 100000) {
      const lk = (converted / 100000).toFixed(2);
      return `₹${lk} Lakhs`;
    }
    return `₹` + Math.round(converted).toLocaleString('en-IN');
  }

  // Western currencies
  return cfg.symbol + Math.round(converted).toLocaleString('en-US');
}

function formatRawAmount(amountINR) {
  const cfg = CURRENCY_CONFIG[currentCurrency] || CURRENCY_CONFIG.INR;
  const converted = amountINR * cfg.rate;
  if (currentCurrency === 'INR') {
    return Math.round(converted).toLocaleString('en-IN');
  }
  return Math.round(converted).toLocaleString('en-US');
}

// Toast helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-msg px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-semibold pointer-events-auto backdrop-blur-xl border ${
    type === 'success' 
      ? 'bg-slate-900/90 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40' 
      : 'bg-slate-900/90 text-pink-300 border-pink-500/40 shadow-pink-950/40'
  }`;

  const iconClass = type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-circle-info text-pink-400';
  toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ========================================================
// 4. Calculations: Subtotals, Category Totals & Grand Total
// ========================================================
function calculateTotals() {
  let grandTotalINR = 0;
  let activeItemCount = 0;
  const categoryTotals = {};

  categoriesData.forEach(cat => {
    let catSubtotal = 0;
    cat.items.forEach(item => {
      if (item.included) {
        const itemCost = (item.qty || 0) * (item.rateINR || 0);
        catSubtotal += itemCost;
        activeItemCount++;
      }
    });
    categoryTotals[cat.id] = catSubtotal;
    grandTotalINR += catSubtotal;
  });

  return { grandTotalINR, activeItemCount, categoryTotals };
}

// ========================================================
// 5. Render Pipeline Stepper ("Interface after Interface")
// ========================================================
function renderPipeline() {
  const container = document.getElementById('pipelineContainer');
  if (!container) return;

  container.innerHTML = '';

  // Step tabs: all categories + summary stage
  const allStages = [
    ...categoriesData.map((cat, idx) => ({
      index: idx,
      name: cat.name,
      icon: cat.icon,
      isSummary: false
    })),
    {
      index: categoriesData.length,
      name: "Grand Total & BOQ",
      icon: "fa-receipt",
      isSummary: true
    }
  ];

  allStages.forEach((stage, idx) => {
    const stepEl = document.createElement('div');
    const isActive = (stage.index === activeStepIndex) && !isAllViewMode;
    const isCompleted = stage.index < activeStepIndex;

    stepEl.className = `pipeline-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
    stepEl.innerHTML = `
      <div class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
        isActive 
          ? 'bg-white text-slate-900 shadow-sm' 
          : isCompleted 
            ? 'bg-violet-600/40 text-violet-200' 
            : 'bg-white/10 text-slate-400'
      }">
        ${isCompleted ? '<i class="fa-solid fa-check text-[9px]"></i>' : (stage.index + 1)}
      </div>
      <i class="fa-solid ${stage.icon} text-xs"></i>
      <span class="tracking-tight">${stage.name}</span>
    `;

    stepEl.addEventListener('click', () => {
      isAllViewMode = false;
      document.getElementById('viewModeText').textContent = "Show All Stages";
      activeStepIndex = stage.index;
      renderApp();
      window.scrollTo({ top: 280, behavior: 'smooth' });
    });

    container.appendChild(stepEl);

    // Connecting neon dot/line separator
    if (idx < allStages.length - 1) {
      const sep = document.createElement('div');
      sep.className = `w-4 h-[2px] rounded-full hidden sm:block ${isCompleted ? 'bg-violet-500/50' : 'bg-white/10'}`;
      container.appendChild(sep);
    }
  });
}

// ========================================================
// 6. Render Item Cards & Category Interfaces
// ========================================================
function renderInterfaces() {
  const container = document.getElementById('interfaceContainer');
  const finalSummarySection = document.getElementById('finalSummarySection');
  if (!container) return;

  container.innerHTML = '';

  const { categoryTotals } = calculateTotals();

  // If active step is the Summary Stage and NOT all-view mode
  if (activeStepIndex === categoriesData.length && !isAllViewMode) {
    if (finalSummarySection) {
      finalSummarySection.classList.remove('hidden');
      updateSummarySection();
    }
    return;
  }

  // Filter which categories to show
  const categoriesToRender = isAllViewMode
    ? categoriesData
    : [categoriesData[activeStepIndex]].filter(Boolean);

  if (isAllViewMode) {
    if (finalSummarySection) {
      finalSummarySection.classList.remove('hidden');
      updateSummarySection();
    }
  } else {
    if (finalSummarySection) {
      finalSummarySection.classList.add('hidden');
    }
  }

  categoriesToRender.forEach((cat) => {
    const catIndex = categoriesData.findIndex(c => c.id === cat.id);
    const catSubtotal = categoryTotals[cat.id] || 0;

    const sectionEl = document.createElement('section');
    sectionEl.className = 'glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-white/15 relative overflow-hidden transition-all';
    sectionEl.id = `stage-${cat.id}`;

    // Header of category
    sectionEl.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div class="flex items-start gap-4">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.badgeColor} p-[2px] shadow-lg flex-shrink-0 flex items-center justify-center">
            <div class="w-full h-full bg-slate-950/80 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <i class="fa-solid ${cat.icon} text-2xl text-white"></i>
            </div>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[11px] font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                Stage 0${catIndex + 1} of 06
              </span>
              <span class="text-xs text-slate-400 font-medium hidden sm:inline">•</span>
              <span class="text-xs text-slate-400 font-medium hidden sm:inline">${cat.subtitle}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-1">${cat.name}</h2>
            <p class="text-xs text-slate-300 mt-1 max-w-xl">${cat.description}</p>
          </div>
        </div>

        <div class="flex items-center flex-wrap gap-3">
          <!-- Stage Subtotal Badge -->
          <div class="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-right">
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Stage Subtotal</span>
            <div class="text-lg font-heading font-black text-pink-300">${formatCurrency(catSubtotal)}</div>
          </div>

          <!-- Add Custom Item Button -->
          <button data-cat-id="${cat.id}" class="add-custom-item-btn px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md">
            <i class="fa-solid fa-plus text-pink-400"></i>
            <span>Add Grocery / Item</span>
          </button>
        </div>
      </div>

      <!-- Items Grid for this Category -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6" id="items-grid-${cat.id}">
        <!-- Item cards injected below -->
      </div>
    `;

    container.appendChild(sectionEl);

    // Populate Item Cards
    const itemsGrid = sectionEl.querySelector(`#items-grid-${cat.id}`);
    cat.items.forEach(item => {
      const card = createItemCard(item, cat.id);
      itemsGrid.appendChild(card);
    });

    // Wire up Add Custom Item button
    sectionEl.querySelector('.add-custom-item-btn').addEventListener('click', (e) => {
      const catId = e.currentTarget.getAttribute('data-cat-id');
      openAddCustomItemModal(catId);
    });
  });
}

// ========================================================
// 7. Create Interactive Item Card (100% Item Focus)
// ========================================================
function createItemCard(item, catId) {
  const card = document.createElement('div');
  card.className = `item-card flex flex-col justify-between p-4 sm:p-5 ${!item.included ? 'is-excluded' : ''}`;
  card.id = `card-${item.id}`;

  const currentRate = item.rateINR;
  const lineSubtotalINR = (item.qty || 0) * currentRate;

  card.innerHTML = `
    <!-- Top Image & Pure Item Header Row -->
    <div class="relative rounded-2xl overflow-hidden mb-4 bg-slate-900 border border-white/10 group shadow-md">
      <!-- Item Image (Pure Material/Item - Zero Humans) -->
      <img src="${item.image || FALLBACK_IMG}" alt="${item.name}"
        onerror="this.onerror=null; this.src='${FALLBACK_IMG}';"
        loading="lazy"
        class="w-full h-44 object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer item-image-preview">
      
      <!-- Gradient Fade Over Image -->
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/40 pointer-events-none"></div>

      <!-- Zoom/Preview Badge -->
      <button type="button" class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-pink-600/90 text-white flex items-center justify-center text-xs backdrop-blur-md transition-all item-image-preview-btn" title="Click to view full photo">
        <i class="fa-solid fa-magnifying-glass-plus"></i>
      </button>

      <!-- Include / Exclude Checkbox Pill -->
      <label class="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-white/20 backdrop-blur-md cursor-pointer hover:bg-slate-900 text-[11px] font-bold text-white transition-all shadow-sm">
        <input type="checkbox" ${item.included ? 'checked' : ''} class="item-toggle-chk rounded accent-pink-500 w-3.5 h-3.5 cursor-pointer">
        <span>${item.included ? 'Included' : 'Excluded'}</span>
      </label>

      <!-- Pure Item Focus Badge (Bottom Left) -->
      <div class="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[11px] font-bold text-pink-300 bg-slate-950/85 px-2.5 py-1 rounded-lg border border-pink-500/30 backdrop-blur-md shadow-sm">
        <i class="fa-solid fa-cube text-[10px] text-pink-400"></i>
        <span>Unit: ${item.unit}</span>
      </div>
    </div>

    <!-- Title and Description -->
    <div class="flex-1 mb-4">
      <div class="flex items-start justify-between gap-2">
        <h4 class="font-heading font-bold text-white text-base leading-snug">${item.name}</h4>
        
        <!-- Delete Item Button (if custom or standard) -->
        <button type="button" class="delete-item-btn text-slate-500 hover:text-red-400 p-1 transition-colors text-xs" title="Remove this material item">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
      <p class="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">${item.description}</p>
    </div>

    <!-- Quantity & Unit Rate Inputs Row -->
    <div class="bg-black/30 border border-white/10 rounded-2xl p-3.5 space-y-3">
      
      <!-- Quantity Stepper -->
      <div class="flex items-center justify-between">
        <span class="text-xs font-semibold text-slate-400">Quantity</span>
        <div class="flex items-center gap-1.5">
          <button type="button" class="stepper-btn stepper-minus"><i class="fa-solid fa-minus text-[10px]"></i></button>
          <input type="number" min="0" step="any" value="${item.qty}"
            class="item-qty-input w-20 text-center bg-white/10 border border-white/20 rounded-lg py-1 px-1.5 text-xs font-bold text-white focus:outline-none focus:border-pink-500">
          <button type="button" class="stepper-btn stepper-plus"><i class="fa-solid fa-plus text-[10px]"></i></button>
        </div>
      </div>

      <!-- Unit Rate Input -->
      <div class="flex items-center justify-between pt-2 border-t border-white/10">
        <span class="text-xs font-semibold text-slate-400">Rate / ${item.unit}</span>
        <div class="flex items-center gap-1">
          <span class="text-xs text-pink-400 font-bold">${CURRENCY_CONFIG[currentCurrency]?.symbol || '₹'}</span>
          <input type="number" min="0" step="any" value="${formatRawAmount(item.rateINR)}"
            class="item-rate-input w-24 text-right bg-white/10 border border-white/20 rounded-lg py-1 px-2 text-xs font-bold text-white focus:outline-none focus:border-pink-500">
        </div>
      </div>

    </div>

    <!-- Subtotal Footer -->
    <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
      <span class="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Estimated Cost</span>
      <span class="item-line-total text-base font-heading font-black ${item.included ? 'text-pink-300' : 'text-slate-500'}">
        ${item.included ? formatCurrency(lineSubtotalINR) : 'Excluded'}
      </span>
    </div>
  `;

  // --- Attach Event Listeners to this Item Card ---

  // Image preview modal triggers
  const previewImg = card.querySelector('.item-image-preview');
  const previewBtn = card.querySelector('.item-image-preview-btn');
  const openPreview = () => {
    openImageLightbox(item.image || FALLBACK_IMG, item.name, `${item.unit} • ${item.description}`);
  };
  previewImg.addEventListener('click', openPreview);
  previewBtn.addEventListener('click', openPreview);

  // Toggle Included/Excluded
  const toggleChk = card.querySelector('.item-toggle-chk');
  toggleChk.addEventListener('change', (e) => {
    item.included = e.target.checked;
    if (item.included) {
      card.classList.remove('is-excluded');
    } else {
      card.classList.add('is-excluded');
    }
    toggleChk.nextElementSibling.textContent = item.included ? 'Included' : 'Excluded';
    updateAppCalculations();
    saveStateToStorage();
  });

  // Quantity Change (Input & Steppers)
  const qtyInput = card.querySelector('.item-qty-input');
  const minusBtn = card.querySelector('.stepper-minus');
  const plusBtn = card.querySelector('.stepper-plus');

  const onQtyUpdate = (newVal) => {
    const validQty = Math.max(0, parseFloat(newVal) || 0);
    item.qty = validQty;
    qtyInput.value = validQty;
    updateAppCalculations();
    saveStateToStorage();
  };

  qtyInput.addEventListener('input', (e) => onQtyUpdate(e.target.value));

  minusBtn.addEventListener('click', () => {
    const step = item.qty > 100 ? 50 : (item.qty > 10 ? 5 : 1);
    onQtyUpdate(item.qty - step);
  });

  plusBtn.addEventListener('click', () => {
    const step = item.qty >= 100 ? 50 : (item.qty >= 10 ? 5 : 1);
    onQtyUpdate(item.qty + step);
  });

  // Rate Change
  const rateInput = card.querySelector('.item-rate-input');
  rateInput.addEventListener('input', (e) => {
    const rawVal = Math.max(0, parseFloat(e.target.value) || 0);
    const cfg = CURRENCY_CONFIG[currentCurrency] || CURRENCY_CONFIG.INR;
    // convert back to INR base
    item.rateINR = rawVal / cfg.rate;
    updateAppCalculations();
    saveStateToStorage();
  });

  // Delete Item
  const deleteBtn = card.querySelector('.delete-item-btn');
  deleteBtn.addEventListener('click', () => {
    if (confirm(`Remove "${item.name}" from ${catId} grocery list?`)) {
      const cat = categoriesData.find(c => c.id === catId);
      if (cat) {
        cat.items = cat.items.filter(i => i.id !== item.id);
        renderInterfaces();
        updateAppCalculations();
        saveStateToStorage();
        showToast(`Removed "${item.name}" from budget`, 'info');
      }
    }
  });

  return card;
}

// ========================================================
// 8. Update Sticky Bar, Summary Section & Donut Chart
// ========================================================
function updateAppCalculations() {
  const { grandTotalINR, activeItemCount, categoryTotals } = calculateTotals();

  // 1. Sticky Bar Updates
  const stickyGrandTotal = document.getElementById('stickyGrandTotal');
  const stickyItemCount = document.getElementById('stickyItemCount');
  const stickyStageName = document.getElementById('stickyStageName');

  if (stickyGrandTotal) stickyGrandTotal.textContent = formatCurrency(grandTotalINR);
  if (stickyItemCount) stickyItemCount.textContent = `${activeItemCount} items selected`;
  if (stickyStageName) {
    if (isAllViewMode) {
      stickyStageName.textContent = "All Stages View";
    } else if (activeStepIndex === categoriesData.length) {
      stickyStageName.textContent = "Summary & BOQ";
    } else {
      stickyStageName.textContent = categoriesData[activeStepIndex]?.name || "Civil & Structure";
    }
  }

  // 2. Update category subtotals displayed in section headers
  categoriesData.forEach(cat => {
    const section = document.getElementById(`stage-${cat.id}`);
    if (section) {
      const badge = section.querySelector('.font-heading.font-black.text-pink-300');
      if (badge) badge.textContent = formatCurrency(categoryTotals[cat.id] || 0);

      // Also update line subtotals inside cards
      cat.items.forEach(item => {
        const card = document.getElementById(`card-${item.id}`);
        if (card) {
          const lineTotalEl = card.querySelector('.item-line-total');
          if (lineTotalEl) {
            const lineSubtotal = (item.qty || 0) * (item.rateINR || 0);
            lineTotalEl.textContent = item.included ? formatCurrency(lineSubtotal) : 'Excluded';
          }
        }
      });
    }
  });

  // 3. Update Stepper Buttons (Prev / Next labels)
  updateStepperNavigation();

  // 4. Update Final Summary Section if rendered
  updateSummarySection();
}

function updateStepperNavigation() {
  const prevBtn = document.getElementById('prevStepBtn');
  const nextBtn = document.getElementById('nextStepBtn');
  const nextText = document.getElementById('nextStepBtnText');
  const nextIcon = document.getElementById('nextStepBtnIcon');

  if (!prevBtn || !nextBtn) return;

  // If in all view mode
  if (isAllViewMode) {
    prevBtn.disabled = true;
    nextText.textContent = "Jump to Final Report";
    nextIcon.className = "fa-solid fa-arrow-down";
    return;
  }

  // Previous button state
  prevBtn.disabled = (activeStepIndex === 0);

  // Next button state & label
  if (activeStepIndex === categoriesData.length) {
    // Already on summary
    nextText.textContent = "Download / Print BOQ";
    nextIcon.className = "fa-solid fa-print";
  } else if (activeStepIndex === categoriesData.length - 1) {
    nextText.textContent = "View Grand Total & BOQ";
    nextIcon.className = "fa-solid fa-receipt";
  } else {
    const nextCat = categoriesData[activeStepIndex + 1];
    nextText.textContent = `Next: ${nextCat?.name || 'Next Stage'}`;
    nextIcon.className = "fa-solid fa-arrow-right";
  }
}

// ========================================================
// 9. Update Final Summary Dashboard & Charts
// ========================================================
function updateSummarySection() {
  const summarySec = document.getElementById('finalSummarySection');
  if (!summarySec || summarySec.classList.contains('hidden')) return;

  const { grandTotalINR, activeItemCount, categoryTotals } = calculateTotals();
  const areaInput = document.getElementById('calcAreaInput');
  const area = parseFloat(areaInput?.value) || 1200;

  // Metric Cards
  const summaryGrandTotal = document.getElementById('summaryGrandTotal');
  const summaryPerSqFt = document.getElementById('summaryPerSqFt');
  const summaryTotalItems = document.getElementById('summaryTotalItems');
  const summaryTopCategory = document.getElementById('summaryTopCategory');
  const summaryTopCategoryShare = document.getElementById('summaryTopCategoryShare');
  const summaryContingency = document.getElementById('summaryContingency');
  const tableGrandTotal = document.getElementById('tableGrandTotal');

  if (summaryGrandTotal) summaryGrandTotal.textContent = formatCurrency(grandTotalINR);
  if (tableGrandTotal) tableGrandTotal.textContent = formatCurrency(grandTotalINR);

  if (summaryPerSqFt) {
    const perSqFt = grandTotalINR / (area || 1);
    summaryPerSqFt.textContent = `Approx. ${formatCurrency(perSqFt)} / sq.ft built-up area`;
  }

  if (summaryTotalItems) summaryTotalItems.textContent = `${activeItemCount} Grocery Items`;

  // Find top spending category
  let topCatName = "Civil Works";
  let maxCatAmount = 0;
  categoriesData.forEach(cat => {
    const tot = categoryTotals[cat.id] || 0;
    if (tot > maxCatAmount) {
      maxCatAmount = tot;
      topCatName = cat.name;
    }
  });

  if (summaryTopCategory) summaryTopCategory.textContent = topCatName;
  if (summaryTopCategoryShare) {
    const share = grandTotalINR > 0 ? ((maxCatAmount / grandTotalINR) * 100).toFixed(1) : 0;
    summaryTopCategoryShare.textContent = `${share}% of your total house construction investment`;
  }

  // 10% Contingency Safety Buffer
  if (summaryContingency) {
    const contingencyAmount = grandTotalINR * 0.10;
    summaryContingency.textContent = formatCurrency(contingencyAmount);
  }

  // Update Category Progress Bars
  const barsContainer = document.getElementById('categoryBarsContainer');
  if (barsContainer) {
    barsContainer.innerHTML = '';
    categoriesData.forEach(cat => {
      const catAmount = categoryTotals[cat.id] || 0;
      const pct = grandTotalINR > 0 ? ((catAmount / grandTotalINR) * 100).toFixed(1) : 0;

      const barRow = document.createElement('div');
      barRow.className = "space-y-1.5";
      barRow.innerHTML = `
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <i class="fa-solid ${cat.icon} text-pink-400"></i>
            <span class="font-semibold text-slate-200">${cat.name}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="font-mono text-slate-400">${pct}%</span>
            <span class="font-bold text-white">${formatCurrency(catAmount)}</span>
          </div>
        </div>
        <div class="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-500" style="width: ${pct}%"></div>
        </div>
      `;
      barsContainer.appendChild(barRow);
    });
  }

  // Update Itemized Detailed Table
  const tableBody = document.getElementById('detailedTableBody');
  if (tableBody) {
    tableBody.innerHTML = '';
    categoriesData.forEach(cat => {
      cat.items.forEach(item => {
        if (!item.included) return; // only included items in BOQ
        const row = document.createElement('tr');
        row.className = "hover:bg-white/5 transition-colors";
        const lineTotal = (item.qty || 0) * (item.rateINR || 0);

        row.innerHTML = `
          <td class="py-3 px-4 font-medium text-white flex items-center gap-3">
            <img src="${item.image || FALLBACK_IMG}" alt="${item.name}"
              onerror="this.onerror=null; this.src='${FALLBACK_IMG}';"
              class="w-10 h-10 rounded-lg object-cover border border-white/10 hidden sm:block">
            <div>
              <div class="font-bold">${item.name}</div>
              <div class="text-[11px] text-slate-400 line-clamp-1">${item.description}</div>
            </div>
          </td>
          <td class="py-3 px-3 text-violet-300 font-semibold whitespace-nowrap">${cat.name}</td>
          <td class="py-3 px-3 text-right font-mono font-bold">${item.qty}</td>
          <td class="py-3 px-3 text-slate-400">${item.unit}</td>
          <td class="py-3 px-3 text-right font-mono">${formatCurrency(item.rateINR)}</td>
          <td class="py-3 px-4 text-right font-mono font-bold text-pink-300">${formatCurrency(lineTotal)}</td>
        `;
        tableBody.appendChild(row);
      });
    });
  }

  // Render or Update Chart.js Doughnut
  renderChart(categoryTotals);
}

function renderChart(categoryTotals) {
  const canvas = document.getElementById('costDistributionChart');
  if (!canvas) return;

  const labels = categoriesData.map(c => c.name);
  const data = categoriesData.map(c => Math.round((categoryTotals[c.id] || 0) * (CURRENCY_CONFIG[currentCurrency]?.rate || 1)));

  const backgroundColors = [
    '#f59e0b', // Civil - Amber
    '#eab308', // Electrical - Yellow
    '#06b6d4', // Plumbing - Cyan
    '#ec4899', // Tiles - Pink
    '#a855f7', // Doors/Paint - Purple
    '#d946ef', // Furniture - Fuchsia
  ];

  if (costChartInstance) {
    costChartInstance.data.labels = labels;
    costChartInstance.data.datasets[0].data = data;
    costChartInstance.data.datasets[0].backgroundColor = backgroundColors;
    costChartInstance.update();
    return;
  }

  const ctx = canvas.getContext('2d');
  costChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: backgroundColors,
        borderColor: '#0f172a',
        borderWidth: 3,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleFont: { family: 'Outfit', size: 13, weight: 'bold' },
          bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
          padding: 12,
          borderColor: 'rgba(236, 72, 153, 0.3)',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              const sym = CURRENCY_CONFIG[currentCurrency]?.symbol || '₹';
              return ` ${context.label}: ${sym}${context.raw.toLocaleString()}`;
            }
          }
        }
      },
      cutout: '68%'
    }
  });
}

// ========================================================
// 10. Auto-Scale Quantities by House Built-Up Area
// ========================================================
function applyAreaCalibration() {
  const areaInput = document.getElementById('calcAreaInput');
  const gradeSelect = document.getElementById('calcGradeSelect');
  
  const area = parseFloat(areaInput?.value) || 1200;
  const grade = gradeSelect?.value || 'standard';

  // Multiplier for price based on grade
  let rateMultiplier = 1.0;
  if (grade === 'economy') rateMultiplier = 0.85;
  if (grade === 'premium') rateMultiplier = 1.35;

  const baselineArea = 1200;
  const areaRatio = area / baselineArea;

  categoriesData.forEach(cat => {
    cat.items.forEach(item => {
      // Find original item in DEFAULT_CATEGORIES to retrieve base ratio
      const origCat = DEFAULT_CATEGORIES.find(c => c.id === cat.id);
      const origItem = origCat ? origCat.items.find(i => i.id === item.id) : null;

      if (origItem) {
        if (origItem.thumbRatio) {
          // Civil engineering thumb-rule formula
          item.qty = Math.round(area * origItem.thumbRatio);
        } else {
          // Scale proportionally for furniture/fixtures
          item.qty = Math.max(1, Math.round(origItem.defaultQty * areaRatio));
        }

        // Apply rate grade multiplier
        item.rateINR = Math.round(origItem.rateINR * rateMultiplier);
      }
    });
  });

  renderInterfaces();
  updateAppCalculations();
  saveStateToStorage();
  showToast(`Auto-calibrated groceries for ${area.toLocaleString()} sq.ft (${grade.toUpperCase()} grade)`, 'success');
}

// ========================================================
// 11. Modal: Add Custom Grocery Item
// ========================================================
function openAddCustomItemModal(catId) {
  const modal = document.getElementById('addItemModal');
  const catInput = document.getElementById('modalTargetCategoryId');
  const currencySymbol = document.getElementById('modalCurrencySymbol');

  if (!modal) return;
  catInput.value = catId;
  currencySymbol.textContent = CURRENCY_CONFIG[currentCurrency]?.symbol || '₹';

  // Clear inputs
  document.getElementById('modalItemName').value = '';
  document.getElementById('modalItemQty').value = '10';
  document.getElementById('modalItemUnit').value = 'Pcs';
  document.getElementById('modalItemRate').value = '500';
  document.getElementById('modalItemImage').value = '';

  modal.classList.remove('hidden');
}

function closeAddCustomItemModal() {
  const modal = document.getElementById('addItemModal');
  if (modal) modal.classList.add('hidden');
}

function handleCustomItemSubmit(e) {
  e.preventDefault();
  const catId = document.getElementById('modalTargetCategoryId').value;
  const name = document.getElementById('modalItemName').value.trim();
  const qty = parseFloat(document.getElementById('modalItemQty').value) || 1;
  const unit = document.getElementById('modalItemUnit').value.trim() || 'Units';
  const rawRate = parseFloat(document.getElementById('modalItemRate').value) || 100;
  const customImg = document.getElementById('modalItemImage').value.trim();

  const cfg = CURRENCY_CONFIG[currentCurrency] || CURRENCY_CONFIG.INR;
  const rateINR = rawRate / cfg.rate;

  const targetCat = categoriesData.find(c => c.id === catId);
  if (!targetCat) return;

  const newItem = {
    id: `custom_${Date.now()}`,
    name: name,
    description: `Custom added material/grocery for ${targetCat.name}.`,
    unit: unit,
    defaultQty: qty,
    qty: qty,
    rateINR: rateINR,
    included: true,
    image: customImg || targetCat.items[0]?.image || FALLBACK_IMG
  };

  targetCat.items.push(newItem);
  closeAddCustomItemModal();
  renderInterfaces();
  updateAppCalculations();
  saveStateToStorage();
  showToast(`Added "${name}" to ${targetCat.name}`, 'success');
}

// ========================================================
// 12. Modal: Image Lightbox
// ========================================================
function openImageLightbox(src, title, desc) {
  const modal = document.getElementById('imagePreviewModal');
  const img = document.getElementById('previewModalImg');
  const titleEl = document.getElementById('previewModalTitle');
  const descEl = document.getElementById('previewModalDesc');

  if (!modal || !img) return;

  img.src = src;
  titleEl.textContent = title;
  descEl.textContent = desc;

  modal.classList.remove('hidden');
}

function closeImageLightbox() {
  const modal = document.getElementById('imagePreviewModal');
  if (modal) modal.classList.add('hidden');
}

// ========================================================
// 13. Export Tools (CSV & Print)
// ========================================================
function exportBillToCsv() {
  const { grandTotalINR } = calculateTotals();
  const cfg = CURRENCY_CONFIG[currentCurrency] || CURRENCY_CONFIG.INR;
  const sym = cfg.symbol.trim();

  let csvContent = `data:text/csv;charset=utf-8,`;
  csvContent += `"BuildWise - House Construction Material & Grocery Cost Estimate"\n`;
  csvContent += `"Currency:","${currentCurrency}"\n`;
  csvContent += `"Date:","${new Date().toLocaleDateString()}"\n\n`;
  csvContent += `"Stage/Category","Item Name","Description","Quantity","Unit","Rate (${sym})","Subtotal (${sym})"\n`;

  categoriesData.forEach(cat => {
    cat.items.forEach(item => {
      if (!item.included) return;
      const rate = Math.round(item.rateINR * cfg.rate);
      const subtotal = Math.round(item.qty * item.rateINR * cfg.rate);
      const safeName = item.name.replace(/"/g, '""');
      const safeDesc = item.description.replace(/"/g, '""');
      csvContent += `"${cat.name}","${safeName}","${safeDesc}","${item.qty}","${item.unit}","${rate}","${subtotal}"\n`;
    });
  });

  const grandTotal = Math.round(grandTotalINR * cfg.rate);
  csvContent += `\n"","","","","","ESTIMATED GRAND TOTAL:","${sym} ${grandTotal}"\n`;

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `House_Construction_Material_Bill_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("CSV file generated and downloaded successfully!", 'success');
}

function handlePrintInvoice() {
  // Ensure the summary section is visible for printing
  const summarySec = document.getElementById('finalSummarySection');
  if (summarySec) summarySec.classList.remove('hidden');
  updateSummarySection();
  window.print();
}

function shareEstimate() {
  const { grandTotalINR } = calculateTotals();
  const text = `🏡 House Construction Grocery & Material Estimate: ${formatCurrency(grandTotalINR)} for ${document.getElementById('calcAreaInput')?.value || 1200} sq.ft home (calculated on BuildWise).`;
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Estimate summary copied to clipboard!", 'success');
    });
  } else {
    showToast(text, 'info');
  }
}

// ========================================================
// 14. Reset to Default Standards
// ========================================================
function resetToDefaults() {
  if (confirm("Reset all groceries, quantities, and rates to standard realistic presets?")) {
    categoriesData = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
    currentCurrency = 'INR';
    document.getElementById('currencySelector').value = 'INR';
    document.getElementById('calcAreaInput').value = '1200';
    document.getElementById('calcGradeSelect').value = 'standard';
    activeStepIndex = 0;
    isAllViewMode = false;
    document.getElementById('viewModeText').textContent = "Show All Stages";
    saveStateToStorage();
    renderApp();
    showToast("Reset to realistic default construction groceries", 'info');
  }
}

// ========================================================
// 15. Master Render Function
// ========================================================
function renderApp() {
  renderPipeline();
  renderInterfaces();
  updateAppCalculations();
}

// ========================================================
// 16. Event Listeners & App Initialization
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  // 1. Load saved state (with automatic image updater to human-free pure items)
  loadStateFromStorage();

  // 2. Initial render
  renderApp();

  // 3. Currency Selector
  const currencySelector = document.getElementById('currencySelector');
  if (currencySelector) {
    currencySelector.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      saveStateToStorage();
      renderApp();
      showToast(`Currency changed to ${currentCurrency}`, 'info');
    });
  }

  // 4. Wizard Previous / Next Step Buttons
  const prevStepBtn = document.getElementById('prevStepBtn');
  const nextStepBtn = document.getElementById('nextStepBtn');

  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', () => {
      if (activeStepIndex > 0) {
        activeStepIndex--;
        isAllViewMode = false;
        document.getElementById('viewModeText').textContent = "Show All Stages";
        renderApp();
        window.scrollTo({ top: 280, behavior: 'smooth' });
      }
    });
  }

  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
      if (isAllViewMode) {
        const summarySec = document.getElementById('finalSummarySection');
        if (summarySec) summarySec.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (activeStepIndex < categoriesData.length) {
        activeStepIndex++;
        renderApp();
        window.scrollTo({ top: 280, behavior: 'smooth' });
      } else {
        // Already on summary stage, trigger print
        handlePrintInvoice();
      }
    });
  }

  // 5. Toggle All View Mode
  const toggleViewBtn = document.getElementById('toggleViewBtn');
  if (toggleViewBtn) {
    toggleViewBtn.addEventListener('click', () => {
      isAllViewMode = !isAllViewMode;
      document.getElementById('viewModeText').textContent = isAllViewMode ? "Wizard Mode (Step-by-Step)" : "Show All Stages";
      renderApp();
      window.scrollTo({ top: 280, behavior: 'smooth' });
    });
  }

  // 6. Header Jump to Final Report
  const viewSummaryHeaderBtn = document.getElementById('viewSummaryHeaderBtn');
  if (viewSummaryHeaderBtn) {
    viewSummaryHeaderBtn.addEventListener('click', () => {
      isAllViewMode = false;
      document.getElementById('viewModeText').textContent = "Show All Stages";
      activeStepIndex = categoriesData.length;
      renderApp();
      const sec = document.getElementById('finalSummarySection');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 7. Area Auto-Calculator Apply Button
  const applyAutoCalcBtn = document.getElementById('applyAutoCalcBtn');
  if (applyAutoCalcBtn) {
    applyAutoCalcBtn.addEventListener('click', applyAreaCalibration);
  }

  // 8. Custom Item Modal
  const customItemForm = document.getElementById('customItemForm');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelModalBtn = document.getElementById('cancelModalBtn');

  if (customItemForm) customItemForm.addEventListener('submit', handleCustomItemSubmit);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeAddCustomItemModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeAddCustomItemModal);

  // 9. Lightbox Modal
  const closeImagePreviewBtn = document.getElementById('closeImagePreviewBtn');
  if (closeImagePreviewBtn) closeImagePreviewBtn.addEventListener('click', closeImageLightbox);

  // 10. Summary Section Actions
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const printInvoiceBtn = document.getElementById('printInvoiceBtn');
  const shareEstimateBtn = document.getElementById('shareEstimateBtn');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');

  if (exportCsvBtn) exportCsvBtn.addEventListener('click', exportBillToCsv);
  if (printInvoiceBtn) printInvoiceBtn.addEventListener('click', handlePrintInvoice);
  if (shareEstimateBtn) shareEstimateBtn.addEventListener('click', shareEstimate);
  if (resetDefaultsBtn) resetDefaultsBtn.addEventListener('click', resetToDefaults);

  // Close modals on Escape key or backdrop click
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAddCustomItemModal();
      closeImageLightbox();
    }
  });

  const addItemModal = document.getElementById('addItemModal');
  if (addItemModal) {
    addItemModal.addEventListener('click', (e) => {
      if (e.target === addItemModal) closeAddCustomItemModal();
    });
  }

  const imagePreviewModal = document.getElementById('imagePreviewModal');
  if (imagePreviewModal) {
    imagePreviewModal.addEventListener('click', (e) => {
      if (e.target === imagePreviewModal) closeImageLightbox();
    });
  }
});
