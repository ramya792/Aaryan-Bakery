import React, { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Cake, Sparkles, ChevronRight, ChevronLeft, Truck, Clock, Phone, MessageSquare, 
  ArrowRight, ShieldCheck, Heart, Eye, X, Send, CheckCircle2, AlertCircle, 
  Calendar, User, PhoneCall, Image as ImageIcon, Play, Pause 
} from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import ProductCard from '../../components/common/ProductCard';
import EnquiryModal from '../../components/common/EnquiryModal';

export default function Home() {
  const { business, products, submitCustomCakeRequest } = useBusiness();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [previewImage, setPreviewImage] = useState(null);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const marqueeScrollRef = useRef(null);

  // Custom cake form state
  const [customForm, setCustomForm] = useState({
    customerName: '',
    phone: '',
    occasion: 'Birthday',
    flavour: 'Vanilla / Vennela',
    cakeType: 'Cool Cake',
    weight: '1 kg',
    requiredDate: '',
    message: '',
    referencePhotoNote: ''
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // 4 Category Cards with distinct real images
  const categoriesList = [
    {
      id: 'cakes',
      name: 'Cakes',
      description: 'Fresh normal, cool, eggless and customized cakes.',
      image: '/images/cakes/vanilla-cool.jpg'
    },
    {
      id: 'pizzas',
      name: 'Pizzas',
      description: 'Freshly prepared chicken, vegetable and sweet corn pizzas.',
      image: '/images/products/chicken-pizza.jpg'
    },
    {
      id: 'puffs',
      name: 'Puffs',
      description: 'Chicken, egg and curry puffs.',
      image: '/images/products/chicken-puff.jpg'
    },
    {
      id: 'ice-creams',
      name: 'Ice Creams',
      description: 'A variety of Arun ice cream products.',
      image: '/images/ice-creams/arun-icecream-1.jpg'
    }
  ];

  // 6 Popular Cakes with unique distinct cake photos
  const popularCakes = [
    {
      id: 'pop-1',
      name: 'Vanilla / Vennela Cake',
      image: '/images/cakes/vanilla-normal.jpg',
      description: 'Classic soft vanilla sponge crafted with delicate buttercream icing.',
      variants: 'Normal: ₹270/kg • Cool: ₹450/kg'
    },
    {
      id: 'pop-2',
      name: 'Butterscotch Cake',
      image: '/images/cakes/butterscotch-normal.jpg',
      description: 'Rich butterscotch layered with golden praline crunch and caramel.',
      variants: 'Normal: ₹300/kg • Cool: ₹500/kg'
    },
    {
      id: 'pop-3',
      name: 'Chocolate Cake',
      image: '/images/cakes/chocolate-normal.jpg',
      description: 'Decadent dark cocoa sponge enriched with creamy chocolate ganache.',
      variants: 'Normal: ₹320/kg • Cool: ₹500/kg'
    },
    {
      id: 'pop-4',
      name: '100% Eggless Cake',
      image: '/images/cakes/eggless-normal.jpg',
      description: 'Pure vegetarian sponge baked fresh for traditional celebrations.',
      variants: 'Normal: ₹350/kg • Cool: ₹550/kg',
      isEggless: true
    },
    {
      id: 'pop-5',
      name: 'Customized Birthday Cake',
      image: '/images/cakes/vanilla-cool.jpg',
      description: 'Chilled cool cake with vibrant theme decorations and name icing.',
      variants: 'Normal & Cool cake designs available'
    },
    {
      id: 'pop-6',
      name: 'Celebration Theme Cake',
      image: '/images/cakes/chocolate-cool.jpg',
      description: 'Multi-tiered centerpiece cake designed for weddings & engagements.',
      variants: 'Customized as per your occasion'
    }
  ];

  // 14+ Handcrafted Cake Showcase Items for Right-to-Left Moving Cards
  const cakeShowcaseItems = [
    { id: 'sc-1', title: 'Parisian Butterfly Designer Cake', image: '/images/cakes/cake-1.jpg', tag: 'Birthday Special', price: 'From ₹450', desc: 'Pastel blue with delicate pink butterflies and gold pearls' },
    { id: 'sc-2', title: 'Grand Floral Multi-Tier Wedding Cake', image: '/images/cakes/cake-6.jpg', tag: 'Wedding Tier', price: 'Custom Quote', desc: '3-tier royal white cream cake with edible gold leaves and roses' },
    { id: 'sc-3', title: 'Blue Car 1st Birthday Theme Cake', image: '/images/cakes/blue-car-birthday-cake.jpg', tag: '1st Birthday Special', price: 'From ₹550', desc: 'Cute 3D blue car topper with fluffy cloud accents' },
    { id: 'sc-4', title: 'Pink Minnie Mouse 2-Tier Cake', image: '/images/cakes/minnie-mouse-cake.jpg', tag: 'Cartoon Theme', price: 'From ₹650', desc: 'Delicate pink rosettes, edible pearls and golden ribbon bow' },
    { id: 'sc-5', title: 'Cocomelon Theme Celebration Cake', image: '/images/cakes/cocomelon-theme-cake.jpg', tag: 'Kids Favorite', price: 'From ₹550', desc: 'Colorful balloons, rainbow toppers and festive edible designs' },
    { id: 'sc-6', title: 'Fresh Fruit Celebration Cake', image: '/images/cakes/cake-2.jpg', tag: 'Fresh Fruits', price: 'From ₹500', desc: 'Loaded with fresh dragon fruit, kiwi slices, grapes and cherries' },
    { id: 'sc-7', title: 'Belgian Truffle Chocolate Cool Cake', image: '/images/cakes/chocolate-cool.jpg', tag: 'Chocolate Truffle', price: 'From ₹500', desc: 'Silky smooth dark chocolate truffle ganache with cocoa shavings' },
    { id: 'sc-8', title: 'Butterscotch Praline Crunch Cake', image: '/images/cakes/butterscotch-cool.jpg', tag: 'Butterscotch', price: 'From ₹450', desc: 'Caramelized butterscotch praline crunch with rich golden cream' },
    { id: 'sc-9', title: 'Pink Celebration Rose Gold Cake', image: '/images/cakes/cake-3.jpg', tag: 'Celebration Special', price: 'From ₹550', desc: 'Chic two-tier pink cake with crown topper and decorative butterflies' },
    { id: 'sc-10', title: 'Blue Milestone 2-Tier Cake', image: '/images/cakes/cake-4.jpg', tag: 'Milestone Theme', price: 'From ₹650', desc: 'Grand two-tiered blue celebration cake with macarons & gold accents' },
    { id: 'sc-11', title: 'Parisian Chic Fashion Silhouette Cake', image: '/images/cakes/butterfly-fashion-cake.jpg', tag: 'Designer Special', price: 'From ₹550', desc: 'Glamorous silhouette artwork with 3D flying butterflies' },
    { id: 'sc-12', title: 'Cartoon Bheem & Friends Party Cake', image: '/images/cakes/cake-5.jpg', tag: 'Kids Cartoon', price: 'From ₹500', desc: 'Vibrant party colors with kids favorite animated characters' },
    { id: 'sc-13', title: '100% Pure Vegetarian Eggless Cool Cake', image: '/images/cakes/eggless-cool.jpg', tag: '100% Eggless', price: 'From ₹550', desc: 'Ultra-soft vegetarian sponge with chilled fresh whipping cream' },
    { id: 'sc-14', title: 'Classic Vennela Whipped Cream Cake', image: '/images/cakes/vanilla-cool.jpg', tag: 'Vennela Special', price: 'From ₹450', desc: 'Traditional light vanilla sponge layered with fluffy whipping cream' }
  ];

  const handleScrollMarquee = (direction) => {
    if (marqueeScrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      marqueeScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Gallery items for lower reference
  const galleryItems = cakeShowcaseItems.slice(0, 8);

  // Filtered menu products
  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.categoryName.toLowerCase() === activeCategory.toLowerCase());

  const handleCustomFormSubmit = async (e) => {
    e.preventDefault();
    if (!customForm.customerName || !customForm.phone || !customForm.requiredDate) {
      setFormError('Please fill in your name, phone number, and preferred date.');
      return;
    }
    setFormSubmitting(true);
    setFormError('');

    try {
      const res = await submitCustomCakeRequest({
        ...customForm,
        designDescription: `${customForm.occasion} cake (${customForm.flavour}, ${customForm.cakeType}, ${customForm.weight}). Note: ${customForm.referencePhotoNote || 'None'}`
      });

      if (res && res.success) {
        setFormSuccess(true);
        setCustomForm({
          customerName: '',
          phone: '',
          occasion: 'Birthday',
          flavour: 'Vanilla / Vennela',
          cakeType: 'Cool Cake',
          weight: '1 kg',
          requiredDate: '',
          message: '',
          referencePhotoNote: ''
        });
      } else {
        setFormError(res?.message || 'Could not submit request. Please call 9701969499 directly.');
      }
    } catch (err) {
      setFormError('Connection issue. Please contact 9701969499 on WhatsApp or call.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16 bg-bakery-ivory text-bakery-espresso">
      
      {/* ==================================================
          3. HERO SECTION — Multiple Light Background Bakery Images + BOLD High-Contrast Text
          ================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f2] via-bakery-ivory to-bakery-ivory pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-bakery-border/80">
        
        {/* === MULTIPLE LIGHT WATERMARK BACKGROUND IMAGES (Light, Soft & Seamless) === */}
        {/* 1. Broad Bakery Texture Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: "url('/images/hero-bg-bakery.jpg')" }}
        ></div>

        {/* 2. Flour & Baking Board vignette (Top Right) */}
        <div 
          className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-cover bg-center opacity-[0.09] pointer-events-none blur-sm mix-blend-multiply"
          style={{ backgroundImage: "url('/images/hero-bg-flour.jpg')" }}
        ></div>

        {/* 3. Light Background Vignette: Celebration Cake (Top Left) */}
        <div 
          className="hidden sm:block absolute -top-8 -left-8 w-60 h-60 lg:w-72 lg:h-72 rounded-full bg-cover bg-center opacity-[0.08] pointer-events-none blur-[1px] mix-blend-multiply"
          style={{ backgroundImage: "url('/images/cakes/vanilla-cool.jpg')" }}
        ></div>

        {/* 4. Light Background Vignette: Fresh Chicken Puff (Bottom Left) */}
        <div 
          className="hidden sm:block absolute -bottom-10 left-12 w-48 h-48 rounded-full bg-cover bg-center opacity-[0.08] pointer-events-none blur-[1px] mix-blend-multiply"
          style={{ backgroundImage: "url('/images/products/chicken-puff.jpg')" }}
        ></div>

        {/* 5. Light Background Vignette: Stone Oven Pizza (Top Center) */}
        <div 
          className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full bg-cover bg-center opacity-[0.07] pointer-events-none blur-[1px] mix-blend-multiply"
          style={{ backgroundImage: "url('/images/products/chicken-pizza.jpg')" }}
        ></div>

        {/* 6. Light Background Vignette: Butterscotch Cake (Center Bottom) */}
        <div 
          className="hidden lg:block absolute -bottom-10 left-1/3 w-48 h-48 rounded-full bg-cover bg-center opacity-[0.07] pointer-events-none blur-[1px] mix-blend-multiply"
          style={{ backgroundImage: "url('/images/cakes/butterscotch-normal.jpg')" }}
        ></div>

        {/* 7. Light Background Vignette: Arun Ice Cream (Bottom Right) */}
        <div 
          className="hidden lg:block absolute bottom-0 right-16 w-52 h-52 rounded-full bg-cover bg-center opacity-[0.08] pointer-events-none blur-[1px] mix-blend-multiply"
          style={{ backgroundImage: "url('/images/ice-creams/arun-icecream-1.jpg')" }}
        ></div>

        {/* Luminous Warm Wash directly behind text area for maximum contrast */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-2/3 bg-gradient-to-r from-[#fbf8f2]/90 via-[#fbf8f2]/75 to-transparent pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: BOLD High-Contrast Text and Buttons */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge with Bold High Contrast */}
              <div className="inline-flex items-center gap-2 bg-white text-bakery-terracotta px-4 py-2 rounded-full text-xs sm:text-sm font-black shadow-xs border-2 border-bakery-terracotta/30 uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-bakery-terracotta animate-pulse"></span>
                FRESHLY BAKED • CUSTOM CAKES • LOCAL DELIVERY
              </div>
              
              {/* Main Heading — EXTRA BOLD */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-bakery-espresso leading-[1.12] tracking-tight">
                Beautiful Cakes. <br />
                <span className="text-bakery-terracotta italic font-black">Memorable Moments.</span>
              </h1>
              
              {/* Description — EXTRA BOLD & HIGH CONTRAST */}
              <p className="text-base sm:text-lg lg:text-xl font-bold text-bakery-espresso leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover freshly prepared cakes, pizzas, puffs and ice creams for birthdays, weddings, engagements and everyday celebrations.
              </p>

              {/* Action Buttons with Bold Text */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => handleScrollTo('menu-section')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-bakery-terracotta hover:bg-bakery-cherry text-white px-8 py-4 rounded-2xl text-base font-black shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer tracking-wide"
                >
                  Explore Menu <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>

                <button
                  onClick={() => handleScrollTo('custom-cake-section')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-bakery-cream text-bakery-espresso border-2 border-bakery-espresso px-8 py-4 rounded-2xl text-base font-black shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer tracking-wide"
                >
                  <Cake className="w-5 h-5 text-bakery-terracotta stroke-[2.5]" /> Request Custom Cake
                </button>
              </div>

              {/* Trust Badge Bar — Extra Bold */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 bg-white/90 border border-bakery-border px-4 py-1.5 rounded-xl text-xs font-black text-bakery-espresso shadow-2xs">
                  <span className="text-bakery-gold text-sm font-black">★ 4.9</span>
                  <span className="text-bakery-espresso/80 font-bold">• 1,000+ Celebrations</span>
                  <span className="text-bakery-espresso/80 font-bold">• 100% Fresh Daily in Mudinepalle</span>
                </div>
              </div>

              {/* Service Highlights Grid — Extra Bold */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t-2 border-bakery-border/90 text-left">
                <div className="bg-white p-3 rounded-xl border-2 border-bakery-border shadow-xs">
                  <span className="font-black text-xs sm:text-sm text-bakery-espresso flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-bakery-gold shrink-0 stroke-[2.5]" /> Freshly Prepared
                  </span>
                  <p className="text-xs font-bold text-bakery-espresso/80 mt-1">Daily fresh quality</p>
                </div>

                <div className="bg-white p-3 rounded-xl border-2 border-bakery-border shadow-xs">
                  <span className="font-black text-xs sm:text-sm text-bakery-espresso flex items-center gap-1.5">
                    <Cake className="w-4 h-4 text-bakery-gold shrink-0 stroke-[2.5]" /> Custom Designs
                  </span>
                  <p className="text-xs font-bold text-bakery-espresso/80 mt-1">Photo & theme cakes</p>
                </div>

                <div className="bg-white p-3 rounded-xl border-2 border-bakery-border shadow-xs">
                  <span className="font-black text-xs sm:text-sm text-bakery-espresso flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-bakery-gold shrink-0 stroke-[2.5]" /> Local Delivery
                  </span>
                  <p className="text-xs font-bold text-bakery-espresso/80 mt-1">Mudinepalle area</p>
                </div>

                <div className="bg-white p-3 rounded-xl border-2 border-bakery-border shadow-xs">
                  <span className="font-black text-xs sm:text-sm text-bakery-espresso flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-bakery-gold shrink-0 stroke-[2.5]" /> 9 AM – 10 PM
                  </span>
                  <p className="text-xs font-bold text-bakery-espresso/80 mt-1">Open every day</p>
                </div>
              </div>

            </div>

            {/* Right Column: Actual Celebration Cake Photo with Responsive Proportions */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-bakery-gold/40 via-bakery-terracotta/25 to-bakery-espresso/30 blur-xl opacity-80"></div>
                <div className="relative rounded-3xl overflow-hidden border-2 sm:border-4 border-white shadow-2xl bg-white aspect-[4/3] sm:aspect-square group">
                  <img
                    src="/images/cakes/cake-6.jpg"
                    alt="Aaryan Bakery Fresh Custom Celebration Cake"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/hero-cake.jpg';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating Overlay Badge with Bold Typography */}
                  <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-bakery-border shadow-lg flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] sm:text-[11px] font-black text-bakery-terracotta uppercase tracking-wider block">AARYAN BAKERY</span>
                      <h4 className="font-serif font-black text-bakery-espresso text-sm sm:text-base truncate">Custom Celebration Cake</h4>
                      <p className="text-[11px] sm:text-xs font-bold text-bakery-espresso/85 mt-0.5 truncate">Freshly baked in Mudinepalle</p>
                    </div>
                    <button
                      onClick={() => handleScrollTo('custom-cake-section')}
                      className="bg-bakery-espresso hover:bg-bakery-terracotta text-white text-xs font-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-colors shrink-0 cursor-pointer shadow-sm tracking-wide"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          3.5 CELEBRATION CAKES SHOWCASE (Infinite Right-to-Left Moving Cards)
          "this cakes and put more bueatiful cakes put up side i want to appear incards and the cards are move right to left i wnat more than 10 pics"
          ================================================== */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-bakery-ivory via-white to-bakery-ivory border-y border-bakery-border/90 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white text-bakery-terracotta px-3.5 py-1.5 rounded-full text-xs font-black shadow-xs border border-bakery-border uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-bakery-gold" />
                <span>14+ Handcrafted Cake Creations • Continuous Showcase</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-black text-bakery-espresso tracking-tight">
                Our Signature Celebration Cakes
              </h2>
              <p className="text-xs sm:text-sm font-medium text-bakery-softBrown mt-1">
                Custom birthday, wedding, kids cartoon, and fresh cream cool cakes prepared daily in Mudinepalle
              </p>
            </div>

            {/* Interactive Controls (Pause/Play, Manual Arrow Scroll) */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-bakery-cream text-bakery-espresso border border-bakery-border rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
                title={isMarqueePaused ? "Resume auto-scroll" : "Pause auto-scroll"}
              >
                {isMarqueePaused ? <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> : <Pause className="w-3.5 h-3.5 text-bakery-terracotta fill-bakery-terracotta" />}
                <span>{isMarqueePaused ? "Resume" : "Pause"}</span>
              </button>

              <button
                onClick={() => handleScrollMarquee('left')}
                className="w-8 h-8 rounded-xl bg-white hover:bg-bakery-cream text-bakery-espresso border border-bakery-border flex items-center justify-center shadow-2xs transition-all cursor-pointer"
                title="Scroll Left"
                aria-label="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleScrollMarquee('right')}
                className="w-8 h-8 rounded-xl bg-white hover:bg-bakery-cream text-bakery-espresso border border-bakery-border flex items-center justify-center shadow-2xs transition-all cursor-pointer"
                title="Scroll Right"
                aria-label="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Continuous Infinite Moving Cards Ribbon (Right to Left) */}
        <div
          ref={marqueeScrollRef}
          className="relative overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing py-2"
          onMouseEnter={() => setIsMarqueePaused(true)}
          onMouseLeave={() => setIsMarqueePaused(false)}
          onTouchStart={() => setIsMarqueePaused(true)}
          onTouchEnd={() => setIsMarqueePaused(false)}
        >
          {/* Edge gradients for smooth infinity fade on desktop */}
          <div className="hidden md:block pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
          <div className="hidden md:block pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>

          <div className={`animate-cake-marquee flex gap-4 sm:gap-6 px-4 ${isMarqueePaused ? 'is-paused' : ''}`}>
            {/* Render 2 sets for endless right-to-left seamless flow */}
            {[...cakeShowcaseItems, ...cakeShowcaseItems].map((cake, idx) => (
              <div
                key={`${cake.id}-${idx}`}
                onClick={() => setPreviewImage(cake)}
                className="w-64 sm:w-76 shrink-0 bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-bakery-border shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col hover:-translate-y-1.5"
              >
                {/* Cake Photo */}
                <div className="relative aspect-[4/3] overflow-hidden bg-bakery-cream">
                  <img
                    src={cake.image}
                    alt={cake.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/images/hero-cake.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  {/* Category / Occasion Tag */}
                  <span className="absolute top-2.5 left-2.5 bg-bakery-espresso/90 backdrop-blur-xs text-bakery-gold text-[10px] sm:text-[11px] font-black px-2.5 py-1 rounded-full shadow-xs border border-bakery-gold/20">
                    {cake.tag}
                  </span>

                  {/* Starting Price badge */}
                  <span className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-bakery-terracotta text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-lg shadow-xs">
                    {cake.price}
                  </span>

                  {/* Hover Quick Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-xs font-bold flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-bakery-gold" /> Tap to view design & enquire
                    </span>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <h4 className="font-serif font-black text-bakery-espresso text-sm sm:text-base group-hover:text-bakery-terracotta transition-colors line-clamp-1">
                      {cake.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-bakery-softBrown line-clamp-2 mt-1">
                      {cake.desc}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-bakery-border/60 flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-black text-bakery-terracotta uppercase tracking-wide">
                      Mudinepalle Fresh
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewImage(cake);
                      }}
                      className="bg-bakery-cream group-hover:bg-bakery-terracotta group-hover:text-white text-bakery-espresso text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          4. SHOP BY CATEGORY ("Explore Our Menu")
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-bakery-terracotta uppercase tracking-widest">Handcrafted Delights</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-bakery-espresso mt-1">
            Explore Our Menu
          </h2>
          <p className="text-sm font-medium text-bakery-softBrown mt-1.5">
            Choose from freshly prepared cakes, savory bakery snacks, and Arun Ice Creams
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl overflow-hidden border border-bakery-border shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-bakery-cream">
                <img
                  src={cat.image}
                  alt={cat.name}
                  onError={(e) => { e.target.src = '/images/hero-cake.jpg'; }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85"></div>
                <span className="absolute bottom-3 left-4 text-white font-serif text-xl font-bold">
                  {cat.name}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1 bg-white">
                <p className="text-xs text-bakery-softBrown leading-relaxed mb-4 flex-1 font-medium">
                  {cat.description}
                </p>
                <button
                  onClick={() => {
                    setActiveCategory(cat.name);
                    handleScrollTo('menu-section');
                  }}
                  className="inline-flex items-center justify-between w-full text-xs font-bold text-bakery-espresso bg-bakery-cream group-hover:bg-bakery-terracotta group-hover:text-white p-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <span>View Items</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          5. POPULAR CAKES ("Made for Every Celebration") — Each with distinct real cake photo
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black text-bakery-terracotta uppercase tracking-wider">Verified Rates</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-bakery-espresso mt-1">
              Made for Every Celebration
            </h2>
            <p className="text-xs sm:text-sm font-medium text-bakery-softBrown mt-1">
              Popular normal and cool cake varieties prepared fresh per kg
            </p>
          </div>
          <button
            onClick={() => handleScrollTo('custom-cake-section')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-bakery-terracotta hover:text-bakery-cherry self-start sm:self-auto cursor-pointer"
          >
            Request Custom Flavour <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCakes.map((cake) => (
            <div
              key={cake.id}
              className="bg-white rounded-2xl overflow-hidden border border-bakery-border shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-bakery-cream">
                <img
                  src={cake.image}
                  alt={cake.name}
                  onError={(e) => { e.target.src = '/images/hero-cake.jpg'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {cake.isEggless && (
                  <span className="absolute top-3 left-3 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    100% Eggless
                  </span>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-serif text-lg font-bold text-bakery-espresso mb-1.5 group-hover:text-bakery-terracotta transition-colors">
                  {cake.name}
                </h3>
                <p className="text-xs text-bakery-softBrown leading-relaxed mb-4 flex-1">
                  {cake.description}
                </p>

                {/* Variant Rates */}
                <div className="bg-bakery-ivory p-3 rounded-xl border border-bakery-border mb-4 text-xs">
                  <span className="font-bold text-bakery-softBrown block text-[11px] mb-0.5">
                    Verified Pricing:
                  </span>
                  <span className="font-extrabold text-bakery-espresso">
                    {cake.variants}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <button
                    onClick={() => handleScrollTo('custom-cake-section')}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-bakery-espresso text-bakery-cream hover:bg-bakery-terracotta transition-colors shadow-2xs cursor-pointer text-center"
                  >
                    Enquire
                  </button>
                  <a
                    href={`https://wa.me/919701969499?text=${encodeURIComponent(`Hello Aaryan Bakery! I would like to enquire about ${cake.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          6. COMPLETE BAKERY MENU ("Complete Bakery Menu") — Every item has its own distinct photo
          ================================================== */}
      <section id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-black text-bakery-terracotta uppercase tracking-wider">All Offerings</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-bakery-espresso mt-1">
            Complete Bakery Menu
          </h2>
          <p className="text-xs sm:text-sm font-medium text-bakery-softBrown mt-1.5">
            Verified prices for cakes, oven pizzas, savory puffs, and Arun Ice Creams
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-white p-2.5 rounded-2xl border border-bakery-border shadow-2xs max-w-xl mx-auto">
          {['All', 'Cakes', 'Pizzas', 'Puffs', 'Ice Creams'].map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-bakery-espresso text-bakery-cream shadow-xs'
                    : 'text-bakery-espresso hover:bg-bakery-cream/70'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid with Unique Photos for Each Item */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectForEnquiry={setSelectedProduct}
            />
          ))}
        </div>
      </section>

      {/* ==================================================
          7. CUSTOM CAKE SECTION ("Your Idea, Our Cake")
          ================================================== */}
      <section id="custom-cake-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="bg-white rounded-3xl border border-bakery-border shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12">
            
            {/* Left Description & Image */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block bg-bakery-cream text-bakery-terracotta text-xs font-bold uppercase px-3 py-1 rounded-full border border-bakery-border">
                Customized Creations
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-bakery-espresso leading-tight">
                Your Idea, Our Cake
              </h2>
              <p className="text-sm font-medium text-bakery-softBrown leading-relaxed">
                Celebrate birthdays, weddings, engagements, anniversaries and special moments with a cake designed around your occasion.
              </p>

              <div className="rounded-2xl overflow-hidden border border-bakery-border shadow-xs aspect-[4/3] bg-bakery-cream">
                <img
                  src="/images/cakes/cake-3.jpg"
                  alt="Custom celebration cake creation"
                  onError={(e) => { e.target.src = '/images/hero-cake.jpg'; }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://wa.me/919701969499?text=Hello%20Aaryan%20Bakery!%20I%20would%20like%20to%20request%20a%20customized%20cake."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Owner Directly
                </a>
              </div>
            </div>

            {/* Right: Interactive Custom Cake Form */}
            <div className="lg:col-span-7 bg-bakery-ivory p-6 sm:p-8 rounded-2xl border border-bakery-border">
              <h3 className="font-serif text-xl font-bold text-bakery-espresso mb-1">
                Custom Cake Order Enquiry
              </h3>
              <p className="text-xs text-bakery-softBrown mb-5">
                Submit your request and our bakery team will contact you to confirm availability and design details.
              </p>

              {formSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-serif font-bold text-lg">Enquiry Received!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you! Owner K. Narendra will review your custom cake request and contact you at the provided phone number.
                  </p>
                  <button
                    onClick={() => setFormSuccess(false)}
                    className="text-xs font-bold text-emerald-700 underline pt-2 cursor-pointer"
                  >
                    Submit another custom enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCustomFormSubmit} className="space-y-4">
                  {formError && (
                    <div className="bg-rose-50 text-rose-800 text-xs p-3 rounded-xl border border-rose-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-bakery-espresso mb-1">Customer Name *</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={customForm.customerName}
                        onChange={(e) => setCustomForm({ ...customForm, customerName: e.target.value })}
                        required
                        className="w-full bg-white border border-bakery-border rounded-xl px-3 py-2 text-xs text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-bakery-espresso mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={customForm.phone}
                        onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                        required
                        className="w-full bg-white border border-bakery-border rounded-xl px-3 py-2 text-xs text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-bakery-espresso mb-1">Occasion</label>
                      <select
                        value={customForm.occasion}
                        onChange={(e) => setCustomForm({ ...customForm, occasion: e.target.value })}
                        className="w-full bg-white border border-bakery-border rounded-xl px-3 py-2 text-xs text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                      >
                        <option value="Birthday">Birthday</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Kids Theme">Kids Cartoon Theme</option>
                        <option value="Other">Other Celebration</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-bakery-espresso mb-1">Cake Flavour</label>
                      <select
                        value={customForm.flavour}
                        onChange={(e) => setCustomForm({ ...customForm, flavour: e.target.value })}
                        className="w-full bg-white border border-bakery-border rounded-xl px-3 py-2 text-xs text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                      >
                        <option value="Vanilla / Vennela">Vanilla / Vennela</option>
                        <option value="Butterscotch">Butterscotch</option>
                        <option value="Chocolate">Chocolate</option>
                        <option value="Fruit Flavour">Fruit Mix</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-bakery-espresso mb-1">Cake Type</label>
                      <select
                        value={customForm.cakeType}
                        onChange={(e) => setCustomForm({ ...customForm, cakeType: e.target.value })}
                        className="w-full bg-white border border-bakery-border rounded-xl px-3 py-2 text-xs text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                      >
                        <option value="Cool Cake">Cool Cake</option>
                        <option value="Normal Cake">Normal Cake</option>
                        <option value="100% Eggless Cool Cake">100% Eggless Cool Cake</option>
                        <option value="100% Eggless Normal Cake">100% Eggless Normal Cake</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-bakery-espresso mb-1">Weight in kg</label>
                      <select
                        value={customForm.weight}
                        onChange={(e) => setCustomForm({ ...customForm, weight: e.target.value })}
                        className="w-full bg-white border border-bakery-border rounded-xl px-3 py-2 text-xs text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                      >
                        <option value="1 kg">1 kg</option>
                        <option value="1.5 kg">1.5 kg</option>
                        <option value="2 kg">2 kg</option>
                        <option value="3 kg">3 kg</option>
                        <option value="4+ kg">4+ kg (Tier cake)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-bakery-espresso mb-1">Preferred Date *</label>
                      <input
                        type="date"
                        value={customForm.requiredDate}
                        onChange={(e) => setCustomForm({ ...customForm, requiredDate: e.target.value })}
                        required
                        className="w-full bg-white border border-bakery-border rounded-xl px-3 py-2 text-xs text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-bakery-espresso mb-1">Design / Theme Notes & Reference Photo Details</label>
                    <textarea
                      rows="2"
                      placeholder="Describe the design, text on cake, colors, or specify if you will share a photo on WhatsApp"
                      value={customForm.referencePhotoNote}
                      onChange={(e) => setCustomForm({ ...customForm, referencePhotoNote: e.target.value })}
                      className="w-full bg-white border border-bakery-border rounded-xl px-3 py-2 text-xs text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full bg-bakery-terracotta hover:bg-bakery-cherry text-white text-xs font-bold py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {formSubmitting ? 'Sending Request...' : 'Send Custom Cake Enquiry'}
                  </button>
                  <p className="text-[10px] text-center text-bakery-softBrown">
                    Note: Submissions are enquiries. All orders are confirmed after phone/WhatsApp contact.
                  </p>
                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          8. COMPLETE PHOTO GALLERY SHOWCASE BANNER
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-bakery-espresso via-[#3d2419] to-bakery-espresso text-white rounded-3xl p-8 sm:p-12 border-2 border-bakery-gold/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4 text-center sm:text-left">
            <span className="inline-flex items-center gap-2 bg-bakery-gold/20 text-bakery-gold px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-bakery-gold/30">
              <Sparkles className="w-3.5 h-3.5 text-bakery-gold" /> Dedicated Photo Showcase
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Explore Our Full Bakery Creations Gallery
            </h2>
            <p className="text-xs sm:text-sm text-bakery-cream/80 leading-relaxed">
              Explore our full categorized gallery featuring high-resolution photos of wedding cakes, theme cakes, anniversary cakes, pizzas, puffs, and Arun Ice Creams.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <RouterLink
                to="/gallery"
                className="inline-flex items-center justify-center gap-2 bg-bakery-terracotta hover:bg-bakery-cherry text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all duration-200"
              >
                <ImageIcon className="w-4 h-4" /> View Complete Gallery
              </RouterLink>
              <RouterLink
                to="/custom-cakes"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200"
              >
                <Cake className="w-4 h-4 text-bakery-gold" /> Request Custom Cake Design
              </RouterLink>
            </div>
          </div>

          {/* Decorative Background Glow and Preview Images */}
          <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 gap-3 opacity-90 pointer-events-none">
            <img src="/images/cakes/cake-1.jpg" alt="Cake Preview 1" className="w-28 h-36 object-cover rounded-2xl border-2 border-white/20 shadow-xl -rotate-6" />
            <img src="/images/cakes/cake-6.jpg" alt="Cake Preview 2" className="w-32 h-40 object-cover rounded-2xl border-2 border-white/30 shadow-2xl scale-105" />
            <img src="/images/cakes/blue-car-birthday-cake.jpg" alt="Cake Preview 3" className="w-28 h-36 object-cover rounded-2xl border-2 border-white/20 shadow-xl rotate-6" />
          </div>
        </div>
      </section>

      {/* ==================================================
          9. WHY CHOOSE AARYAN BAKERY
          ================================================== */}
      <section className="bg-bakery-cream/80 py-14 border-y border-bakery-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-bakery-terracotta uppercase tracking-wider">Our Commitment</span>
            <h2 className="font-serif text-3xl font-extrabold text-bakery-espresso mt-1">
              Why Choose Aaryan Bakery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-bakery-border shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-bakery-ivory text-bakery-terracotta flex items-center justify-center font-bold mb-3.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-bakery-espresso mb-1.5">
                Freshly Prepared
              </h3>
              <p className="text-xs text-bakery-softBrown leading-relaxed">
                Fresh bakery products prepared for customers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-bakery-border shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-bakery-ivory text-bakery-terracotta flex items-center justify-center font-bold mb-3.5">
                <Cake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-bakery-espresso mb-1.5">
                Custom Cakes
              </h3>
              <p className="text-xs text-bakery-softBrown leading-relaxed">
                Cake designs for birthdays, weddings, engagements and other occasions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-bakery-border shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-bakery-ivory text-bakery-terracotta flex items-center justify-center font-bold mb-3.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-bakery-espresso mb-1.5">
                Eggless Options
              </h3>
              <p className="text-xs text-bakery-softBrown leading-relaxed">
                Eggless normal and cool cakes are available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-bakery-border shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-bakery-ivory text-bakery-terracotta flex items-center justify-center font-bold mb-3.5">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-bakery-espresso mb-1.5">
                Local Delivery
              </h3>
              <p className="text-xs text-bakery-softBrown leading-relaxed">
                Delivery is available in local areas. Customers should contact the bakery for delivery details.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          10. ORDER ENQUIRY SECTION ("Planning Something Special?")
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-bakery-espresso to-bakery-darkBrown text-bakery-cream rounded-3xl p-8 sm:p-12 border-2 border-bakery-gold/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs uppercase font-bold text-bakery-gold tracking-widest">Celebrations & Orders</span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              Planning Something Special?
            </h3>
            <p className="text-sm text-bakery-cream/80 leading-relaxed">
              Tell us what you need and our bakery team can help you with your cake or bakery enquiry.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <RouterLink
              to="/order-enquiry"
              className="bg-bakery-terracotta hover:bg-bakery-cherry text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl shadow-xs transition-colors"
            >
              Send an Enquiry
            </RouterLink>
            <a
              href="https://wa.me/919701969499?text=Hello%20Aaryan%20Bakery!%20I%20would%20like%20to%20place%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp the Bakery
            </a>
          </div>
        </div>
      </section>

      {/* ==================================================
          11. CONTACT SECTION
          ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-bakery-border shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="space-y-4">
              <span className="text-xs font-bold text-bakery-terracotta uppercase tracking-wider">Direct Information</span>
              <h3 className="font-serif text-3xl font-bold text-bakery-espresso">
                Aaryan Bakery
              </h3>
              
              <div className="space-y-2.5 text-xs sm:text-sm text-bakery-softBrown">
                <p><strong className="text-bakery-espresso font-semibold">Owner:</strong> K. Narendra</p>
                <p><strong className="text-bakery-espresso font-semibold">Phone:</strong> <a href="tel:9701969499" className="text-bakery-terracotta font-bold hover:underline">9701969499</a></p>
                <p><strong className="text-bakery-espresso font-semibold">Opening Hours:</strong> 9:00 AM – 10:00 PM</p>
                <p><strong className="text-bakery-espresso font-semibold">Location:</strong> Mudinepalle, Eluru District, Andhra Pradesh</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:9701969499"
                  className="bg-bakery-espresso hover:bg-bakery-terracotta text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" /> Call Now
                </a>
                <a
                  href="https://wa.me/919701969499"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-bakery-ivory p-6 rounded-2xl border border-bakery-border space-y-3">
              <h4 className="font-serif text-lg font-bold text-bakery-espresso">
                Store Location Details
              </h4>
              <p className="text-xs text-bakery-softBrown leading-relaxed">
                Aaryan Bakery is located at Guraja Center in Mudinepalle, Eluru District. You can visit during store hours from 9:00 AM to 10:00 PM for fresh cake pickup, hot pizzas, savory puffs, and ice creams.
              </p>
              <div className="pt-2 text-xs text-bakery-terracotta font-semibold">
                📍 Guraja Center, Mudinepalle, Eluru District - 521325
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Image Preview Modal for Gallery */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-square sm:aspect-[4/3] bg-black">
              <img
                src={previewImage.image}
                alt={previewImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-5 bg-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-bakery-terracotta tracking-wider">{previewImage.tag}</span>
                <h3 className="font-serif text-lg font-bold text-bakery-espresso">{previewImage.title}</h3>
              </div>
              <a
                href={`https://wa.me/919701969499?text=${encodeURIComponent(`Hello Aaryan Bakery! I saw your ${previewImage.title} in the gallery and would like to enquire.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Product Enquiry Modal */}
      {selectedProduct && (
        <EnquiryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}
