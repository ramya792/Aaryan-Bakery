const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Initial Verified Business Seed Data
const initialSeedData = {
  businessSettings: {
    businessName: "Aaryan Bakery",
    brandName: "Sweet Studio — Aaryan Bakery",
    ownerName: "K. Narendra",
    phone: "9701969499",
    whatsapp: "919701969499",
    email: "contact@aaryanbakery.com",
    instagram: "@aaryanbakery_official",
    address: "Guraja Center, Mudinepalle / Mudinapalli Area",
    district: "Eluru District",
    state: "Andhra Pradesh",
    pinCode: "521325",
    openingTime: "09:00 AM",
    closingTime: "10:00 PM",
    weeklyHoliday: "No weekly holiday (Open all 7 days)",
    deliveryAvailable: true,
    deliveryNotice: "Local delivery is available. Please contact the bakery at 9701969499 to confirm delivery availability for your specific location.",
    pickupAvailable: true,
    aboutText: "Welcome to Sweet Studio — Aaryan Bakery, owned by K. Narendra. Located at Mudinepalle, Eluru District, we take pride in crafting fresh cakes, delicious pizzas, savory puffs, premium Arun Ice Creams, and handcrafted customized theme cakes for all your special celebrations.",
    logoUrl: "/images/logo/aaryan-bakery-logo.png",
    updatedAt: new Date().toISOString()
  },
  categories: [
    {
      id: "cat-cakes",
      name: "Cakes",
      slug: "cakes",
      description: "Freshly baked normal, cool, and eggless cakes in vanilla, butterscotch, chocolate and custom flavours.",
      imageUrl: "/images/cakes/cake-1.jpg",
      published: true,
      displayOrder: 1
    },
    {
      id: "cat-pizzas",
      name: "Pizzas",
      slug: "pizzas",
      description: "Hot oven-baked pizzas including Chicken, Vegetable, and Sweet Corn.",
      imageUrl: "/images/products/pizza.jpg",
      published: true,
      displayOrder: 2
    },
    {
      id: "cat-puffs",
      name: "Puffs",
      slug: "puffs",
      description: "Crispy layered hot bakery puffs: Chicken, Egg, and Curry puff.",
      imageUrl: "/images/products/puffs.jpg",
      published: true,
      displayOrder: 3
    },
    {
      id: "cat-ice-creams",
      name: "Ice Creams",
      slug: "ice-creams",
      description: "Delicious varieties of Arun Ice Creams available in various flavors.",
      imageUrl: "/images/ice-creams/arun-icecream-1.jpg",
      published: true,
      displayOrder: 4
    }
  ],
  products: [
    // Cakes
    {
      id: "prod-vanilla-normal",
      name: "Vennela / Vanilla Normal Cake",
      slug: "vanilla-normal-cake",
      categoryId: "cat-cakes",
      categoryName: "Cakes",
      description: "Classic soft and fluffy vanilla sponge cake topped with delicate cream icing.",
      price: 270,
      currency: "₹",
      unit: "per kg",
      imageUrl: "/images/cakes/vanilla-normal.jpg",
      cloudinaryPublicId: "bakery/vanilla_normal",
      isEggless: false,
      isCustomizable: true,
      isAvailable: true,
      isPublished: true,
      displayOrder: 1,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-vanilla-cool",
      name: "Vennela / Vanilla Cool Cake",
      slug: "vanilla-cool-cake",
      categoryId: "cat-cakes",
      categoryName: "Cakes",
      description: "Moist chilled vanilla cool cake with rich layers of fresh whipping cream.",
      price: 450,
      currency: "₹",
      unit: "per kg",
      imageUrl: "/images/cakes/vanilla-cool.jpg",
      cloudinaryPublicId: "bakery/vanilla_cool",
      isEggless: false,
      isCustomizable: true,
      isAvailable: true,
      isPublished: true,
      displayOrder: 2,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-butterscotch-normal",
      name: "Butterscotch Normal Cake",
      slug: "butterscotch-normal-cake",
      categoryId: "cat-cakes",
      categoryName: "Cakes",
      description: "Delectable butterscotch cake layered with golden praline crunch and butterscotch cream.",
      price: 300,
      currency: "₹",
      unit: "per kg",
      imageUrl: "/images/cakes/butterscotch-normal.jpg",
      cloudinaryPublicId: "bakery/butterscotch_normal",
      isEggless: false,
      isCustomizable: true,
      isAvailable: true,
      isPublished: true,
      displayOrder: 3,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-butterscotch-cool",
      name: "Butterscotch Cool Cake",
      slug: "butterscotch-cool-cake",
      categoryId: "cat-cakes",
      categoryName: "Cakes",
      description: "Premium chilled butterscotch cool cake loaded with butterscotch nuggets and rich cream frosting.",
      price: 500,
      currency: "₹",
      unit: "per kg",
      imageUrl: "/images/cakes/butterscotch-cool.jpg",
      cloudinaryPublicId: "bakery/butterscotch_cool",
      isEggless: false,
      isCustomizable: true,
      isAvailable: true,
      isPublished: true,
      displayOrder: 4,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-chocolate-normal",
      name: "Chocolate Normal Cake",
      slug: "chocolate-normal-cake",
      categoryId: "cat-cakes",
      categoryName: "Cakes",
      description: "Rich dark cocoa sponge cake covered with creamy chocolate frosting.",
      price: 320,
      currency: "₹",
      unit: "per kg",
      imageUrl: "/images/cakes/chocolate-normal.jpg",
      cloudinaryPublicId: "bakery/chocolate_normal",
      isEggless: false,
      isCustomizable: true,
      isAvailable: true,
      isPublished: true,
      displayOrder: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-chocolate-cool",
      name: "Chocolate Cool Cake",
      slug: "chocolate-cool-cake",
      categoryId: "cat-cakes",
      categoryName: "Cakes",
      description: "Decadent chilled chocolate cool cake enriched with dark chocolate ganache glaze.",
      price: 500,
      currency: "₹",
      unit: "per kg",
      imageUrl: "/images/cakes/chocolate-cool.jpg",
      cloudinaryPublicId: "bakery/chocolate_cool",
      isEggless: false,
      isCustomizable: true,
      isAvailable: true,
      isPublished: true,
      displayOrder: 6,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-eggless-normal",
      name: "Eggless Normal Cake",
      slug: "eggless-normal-cake",
      categoryId: "cat-cakes",
      categoryName: "Cakes",
      description: "100% vegetarian soft eggless cake baked fresh for pure vegetarian celebrations.",
      price: 350,
      currency: "₹",
      unit: "per kg",
      imageUrl: "/images/cakes/eggless-normal.jpg",
      cloudinaryPublicId: "bakery/eggless_normal",
      isEggless: true,
      isCustomizable: true,
      isAvailable: true,
      isPublished: true,
      displayOrder: 7,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-eggless-cool",
      name: "Eggless Cool Cake",
      slug: "eggless-cool-cake",
      categoryId: "cat-cakes",
      categoryName: "Cakes",
      description: "Delicious chilled 100% vegetarian eggless cool cake with smooth whipped cream layer.",
      price: 550,
      currency: "₹",
      unit: "per kg",
      imageUrl: "/images/cakes/eggless-cool.jpg",
      cloudinaryPublicId: "bakery/eggless_cool",
      isEggless: true,
      isCustomizable: true,
      isAvailable: true,
      isPublished: true,
      displayOrder: 8,
      createdAt: new Date().toISOString()
    },
    // Pizzas
    {
      id: "prod-chicken-pizza",
      name: "Chicken Pizza",
      slug: "chicken-pizza",
      categoryId: "cat-pizzas",
      categoryName: "Pizzas",
      description: "Oven-baked hot pizza crust topped with seasoned spiced chicken chunks, mozzarella cheese, and bell peppers.",
      price: 150,
      currency: "₹",
      unit: "per piece",
      imageUrl: "/images/products/chicken-pizza.jpg",
      cloudinaryPublicId: "bakery/chicken_pizza",
      isEggless: false,
      isCustomizable: false,
      isAvailable: true,
      isPublished: true,
      displayOrder: 9,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-vegetable-pizza",
      name: "Vegetable Pizza",
      slug: "vegetable-pizza",
      categoryId: "cat-pizzas",
      categoryName: "Pizzas",
      description: "Freshly baked pizza loaded with crispy onions, tomatoes, capsicum, olives and melted mozzarella.",
      price: 120,
      currency: "₹",
      unit: "per piece",
      imageUrl: "/images/products/vegetable-pizza.jpg",
      cloudinaryPublicId: "bakery/vegetable_pizza",
      isEggless: true,
      isCustomizable: false,
      isAvailable: true,
      isPublished: true,
      displayOrder: 10,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-sweetcorn-pizza",
      name: "Sweet Corn Pizza",
      slug: "sweet-corn-pizza",
      categoryId: "cat-pizzas",
      categoryName: "Pizzas",
      description: "Golden sweet corn kernels baked over soft herb pizza base with melted cheese.",
      price: 130,
      currency: "₹",
      unit: "per piece",
      imageUrl: "/images/products/sweetcorn-pizza.jpg",
      cloudinaryPublicId: "bakery/sweetcorn_pizza",
      isEggless: true,
      isCustomizable: false,
      isAvailable: true,
      isPublished: true,
      displayOrder: 11,
      createdAt: new Date().toISOString()
    },
    // Puffs
    {
      id: "prod-chicken-puff",
      name: "Chicken Puff",
      slug: "chicken-puff",
      categoryId: "cat-puffs",
      categoryName: "Puffs",
      description: "Flaky golden bakery puff pastry filled with flavorful spiced minced chicken masala.",
      price: 30,
      currency: "₹",
      unit: "per piece",
      imageUrl: "/images/products/chicken-puff.jpg",
      cloudinaryPublicId: "bakery/chicken_puff",
      isEggless: false,
      isCustomizable: false,
      isAvailable: true,
      isPublished: true,
      displayOrder: 12,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-egg-puff",
      name: "Egg Puff",
      slug: "egg-puff",
      categoryId: "cat-puffs",
      categoryName: "Puffs",
      description: "Crispy puff pastry encasing hard-boiled egg half coated in onion-tomato spice gravy.",
      price: 20,
      currency: "₹",
      unit: "per piece",
      imageUrl: "/images/products/egg-puff.jpg",
      cloudinaryPublicId: "bakery/egg_puff",
      isEggless: false,
      isCustomizable: false,
      isAvailable: true,
      isPublished: true,
      displayOrder: 13,
      createdAt: new Date().toISOString()
    },
    {
      id: "prod-curry-puff",
      name: "Curry Puff",
      slug: "curry-puff",
      categoryId: "cat-puffs",
      categoryName: "Puffs",
      description: "Vegetarian puff pastry stuffed with spiced potato and vegetable curry.",
      price: 15,
      currency: "₹",
      unit: "per piece",
      imageUrl: "/images/products/curry-puff.jpg",
      cloudinaryPublicId: "bakery/curry_puff",
      isEggless: true,
      isCustomizable: false,
      isAvailable: true,
      isPublished: true,
      displayOrder: 14,
      createdAt: new Date().toISOString()
    },
    // Ice Creams
    {
      id: "prod-arun-ice-cream",
      name: "Arun Ice Creams (Various Flavours)",
      slug: "arun-ice-creams",
      categoryId: "cat-ice-creams",
      categoryName: "Ice Creams",
      description: "Official retailer of Arun Ice Creams. Wide variety of sticks, cones, cups, and family packs available.",
      price: 0,
      currency: "₹",
      unit: "Contact bakery for current price",
      imageUrl: "/images/ice-creams/arun-icecream-1.jpg",
      cloudinaryPublicId: "bakery/arun_icecreams",
      isEggless: true,
      isCustomizable: false,
      isAvailable: true,
      isPublished: true,
      displayOrder: 15,
      createdAt: new Date().toISOString()
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Parisian Butterfly & Fashion Theme Cake",
      description: "Chic light blue designer cake with pink butterflies, balloons and elegant fashion silhouette.",
      category: "Cakes",
      imageUrl: "/images/cakes/cake-1.jpg",
      cloudinaryPublicId: "gallery/butterfly_cake",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
      createdAt: new Date().toISOString()
    },
    {
      id: "gal-2",
      title: "Fresh Fruit Celebration Cake",
      description: "Fresh cream sponge loaded with dragon fruit, apple slices, orange, grapes, cherries and almond flakes.",
      category: "Cakes",
      imageUrl: "/images/cakes/cake-2.jpg",
      cloudinaryPublicId: "gallery/fruit_cake",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
      createdAt: new Date().toISOString()
    },
    {
      id: "gal-3",
      title: "Minnie Mouse 2-Tier Birthday Cake",
      description: "Two-tiered pink and white celebration cake adorned with Minnie Mouse, pink butterflies, golden bow and accents.",
      category: "Cakes",
      imageUrl: "/images/cakes/cake-3.jpg",
      cloudinaryPublicId: "gallery/pink_cake",
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
      createdAt: new Date().toISOString()
    },
    {
      id: "gal-4",
      title: "1st Birthday Blue Car & Clouds 2-Tier Cake",
      description: "Two-tiered milestone cake featuring golden number 1, blue car, fondant clouds, stars and spheres.",
      category: "Cakes",
      imageUrl: "/images/cakes/cake-4.jpg",
      cloudinaryPublicId: "gallery/blue_cake",
      isFeatured: true,
      isPublished: true,
      displayOrder: 4,
      createdAt: new Date().toISOString()
    },
    {
      id: "gal-5",
      title: "Cocomelon & Butterflies 2-Tier Theme Cake",
      description: "Vibrant purple and pink ombre two-tiered birthday cake with Cocomelon characters, rainbow butterflies and glitter number 1.",
      category: "Cakes",
      imageUrl: "/images/cakes/cake-5.jpg",
      cloudinaryPublicId: "gallery/cartoon_cake",
      isFeatured: true,
      isPublished: true,
      displayOrder: 5,
      createdAt: new Date().toISOString()
    },
    {
      id: "gal-6",
      title: "Custom Wedding Celebration Cake",
      description: "Multi-tiered masterpiece crafted for weddings and engagement celebrations.",
      category: "Cakes",
      imageUrl: "/images/cakes/cake-6.jpg",
      cloudinaryPublicId: "gallery/wedding_cake",
      isFeatured: true,
      isPublished: true,
      displayOrder: 6,
      createdAt: new Date().toISOString()
    },
    {
      id: "gal-7",
      title: "Fresh Baked Savory Puffs",
      description: "Crispy flaky golden bakery puffs filled with spiced chicken, egg and curry.",
      category: "Puffs",
      imageUrl: "/images/products/puffs.jpg",
      cloudinaryPublicId: "gallery/puffs_fresh",
      isFeatured: true,
      isPublished: true,
      displayOrder: 7,
      createdAt: new Date().toISOString()
    },
    {
      id: "gal-8",
      title: "Hot Oven-Baked Pizzas",
      description: "Freshly prepared chicken, vegetable, and sweet corn oven pizzas.",
      category: "Pizzas",
      imageUrl: "/images/products/pizza.jpg",
      cloudinaryPublicId: "gallery/pizza_fresh",
      isFeatured: true,
      isPublished: true,
      displayOrder: 8,
      createdAt: new Date().toISOString()
    },
    {
      id: "gal-9",
      title: "Arun Ice Cream Selection",
      description: "Refreshing assortment of branded Arun Ice Cream sticks, cups, and cones.",
      category: "Ice Creams",
      imageUrl: "/images/ice-creams/arun-icecream-1.jpg",
      cloudinaryPublicId: "gallery/arun_icecreams",
      isFeatured: true,
      isPublished: true,
      displayOrder: 9,
      createdAt: new Date().toISOString()
    }
  ],
  customCakeRequests: [],
  orderEnquiries: [],
  chatbotKnowledge: [
    {
      id: "faq-1",
      question: "What are your opening hours?",
      answer: "Aaryan Bakery is open every day from 09:00 AM to 10:00 PM with no weekly holiday.",
      category: "Timing",
      keywords: ["opening", "hours", "time", "close", "timing", "open", "holiday", "sunday"],
      isPublished: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "faq-2",
      question: "Where is Aaryan Bakery located?",
      answer: "Aaryan Bakery is located at Guraja Center, Mudinepalle / Mudinapalli Area, Eluru District, Andhra Pradesh - 521325. Owner: K. Narendra.",
      category: "Location",
      keywords: ["location", "address", "where", "mudinepalle", "mudinapalli", "eluru", "guraja"],
      isPublished: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "faq-3",
      question: "What cake flavours and prices do you offer?",
      answer: "Our verified cake prices per kg are: Vanilla/Vennela Normal Cake (₹270/kg), Vanilla Cool Cake (₹450/kg), Butterscotch Normal Cake (₹300/kg), Butterscotch Cool Cake (₹500/kg), Chocolate Normal Cake (₹320/kg), Chocolate Cool Cake (₹500/kg), Eggless Normal Cake (₹350/kg), and Eggless Cool Cake (₹550/kg).",
      category: "Cakes",
      keywords: ["cake", "cakes", "price", "flavour", "flavor", "vanilla", "vennela", "butterscotch", "chocolate", "cost"],
      isPublished: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "faq-4",
      question: "Do you have eggless cakes?",
      answer: "Yes! We offer 100% vegetarian Eggless Normal Cake at ₹350 per kg and Eggless Cool Cake at ₹550 per kg.",
      category: "Cakes",
      keywords: ["eggless", "veg", "vegetarian", "no egg", "eggless cake"],
      isPublished: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "faq-5",
      question: "What pizzas do you serve and what are their prices?",
      answer: "We serve Chicken Pizza (₹150 per piece), Vegetable Pizza (₹120 per piece), and Sweet Corn Pizza (₹130 per piece).",
      category: "Pizzas",
      keywords: ["pizza", "pizzas", "chicken pizza", "veg pizza", "sweet corn pizza", "pizza price"],
      isPublished: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "faq-6",
      question: "What puffs do you have and what are their prices?",
      answer: "We offer Chicken Puff (₹30 per piece), Egg Puff (₹20 per piece), and Curry Puff (₹15 per piece).",
      category: "Puffs",
      keywords: ["puff", "puffs", "chicken puff", "egg puff", "curry puff", "puff price"],
      isPublished: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "faq-7",
      question: "Do you sell ice creams?",
      answer: "Yes, we are an authorized seller of Arun Ice Creams with multiple varieties available. Please contact the bakery at 9701969499 for current flavor pricing.",
      category: "Ice Creams",
      keywords: ["ice cream", "icecream", "arun ice cream", "arun", "flavours"],
      isPublished: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "faq-8",
      question: "Do you offer custom cakes?",
      answer: "Yes! We specialize in custom cakes for Birthdays, Weddings, Engagements, Anniversaries, Kids Themes, and Photo Cakes. You can request a custom cake on our website or contact us directly on WhatsApp at 9701969499.",
      category: "Custom Cakes",
      keywords: ["custom", "customized", "wedding", "birthday", "photo cake", "theme cake", "design"],
      isPublished: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "faq-9",
      question: "Do you provide delivery?",
      answer: "Local delivery is available in Mudinepalle area. Please contact the bakery at 9701969499 to confirm delivery availability for your specific location.",
      category: "Delivery",
      keywords: ["delivery", "home delivery", "deliver", "shipping", "local delivery"],
      isPublished: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "faq-10",
      question: "How can I contact Aaryan Bakery or place an order?",
      answer: "You can submit an order enquiry on our website, call us directly at 9701969499, or send a WhatsApp message to 9701969499.",
      category: "Contact",
      keywords: ["contact", "phone", "whatsapp", "call", "order", "number", "narendra"],
      isPublished: true,
      createdAt: new Date().toISOString()
    }
  ]
};

// Data persistence helper
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadData() {
  ensureDataDir();
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialSeedData, null, 2));
    return initialSeedData;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error loading JSON store, falling back to initial data:", err);
    return initialSeedData;
  }
}

function saveData(data) {
  try {
    ensureDataDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.warn("[Notice] Filesystem write skipped in serverless environment:", err.message);
  }
}

let store = loadData();

module.exports = {
  getStore: () => store,
  updateStore: (updater) => {
    store = updater(store);
    saveData(store);
    return store;
  },
  resetStore: () => {
    store = JSON.parse(JSON.stringify(initialSeedData));
    saveData(store);
    return store;
  }
};
