import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, PhoneCall, ShoppingBag, ChevronRight, Cake } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { business } = useBusiness();

  // Close mobile menu on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Synchronize mobile menu state with document body so floating widgets auto-hide
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.setAttribute('data-mobile-menu', 'open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.setAttribute('data-mobile-menu', 'closed');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.removeAttribute('data-mobile-menu');
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Custom Cakes', path: '/custom-cakes' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-bakery-ivory/95 backdrop-blur-md border-b border-bakery-border shadow-xs transition-all duration-200">
      
      {/* 1. Top Information Bar (Slim, professional, wraps on mobile without horizontal scroll) */}
      <div className="bg-bakery-espresso text-bakery-cream text-xs py-1.5 px-4 border-b border-bakery-gold/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-[11px] sm:text-xs">Open Today: 9:00 AM – 10:00 PM</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px] sm:text-xs text-bakery-cream/90 ml-auto sm:ml-0">
            <span>Mudinepalle, Eluru District</span>
            <span className="text-bakery-gold/60">•</span>
            <a 
              href="tel:9701969499" 
              className="text-bakery-gold hover:text-white flex items-center gap-1 font-bold tracking-wide transition-colors"
            >
              <PhoneCall className="w-3 h-3" /> 9701969499
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo (Actual Aaryan Bakery Logo) */}
          <RouterLink to="/" className="flex items-center gap-3 py-1 group">
            {!logoError ? (
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo/aaryan-bakery-logo.png"
                  alt="Aaryan Bakery Logo"
                  onError={() => setLogoError(true)}
                  className="h-12 sm:h-14 w-12 sm:w-14 rounded-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-bakery-espresso leading-none">
                    Aaryan Bakery
                  </span>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-bakery-terracotta font-black mt-1">
                    Sweet Studio • Mudinepalle
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-bakery-espresso leading-none">
                  Aaryan Bakery
                </span>
                <span className="text-[10px] uppercase tracking-widest text-bakery-terracotta font-bold">
                  Sweet Studio • Mudinepalle
                </span>
              </div>
            )}
          </RouterLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <RouterLink
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-bakery-terracotta relative py-1 ${
                    isActive ? 'text-bakery-terracotta font-semibold' : 'text-bakery-espresso/85'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-bakery-terracotta rounded-full"></span>
                  )}
                </RouterLink>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-bakery-espresso/75 hover:text-bakery-terracotta hover:bg-bakery-cream/70 rounded-full transition-colors"
              title="Search Bakery Items"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Order Enquiry CTA */}
            <RouterLink
              to="/order-enquiry"
              className="inline-flex items-center gap-2 bg-bakery-terracotta hover:bg-bakery-cherry text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-xs hover:shadow-md transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Enquiry
            </RouterLink>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-bakery-espresso hover:text-bakery-terracotta rounded-full"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-bakery-espresso hover:text-bakery-terracotta rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Input Bar */}
      {searchOpen && (
        <div className="bg-bakery-cream border-t border-bakery-border py-3 px-4 shadow-inner animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
            <Search className="w-4 h-4 text-bakery-softBrown" />
            <input
              type="text"
              placeholder="Search cakes, pizzas, puffs, ice creams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none text-bakery-espresso placeholder-bakery-softBrown/60 text-xs sm:text-sm py-1"
              autoFocus
            />
            <button
              type="submit"
              className="bg-bakery-espresso text-bakery-cream text-xs px-4 py-1.5 rounded-full hover:bg-bakery-terracotta font-semibold transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-xs text-bakery-softBrown hover:underline px-1"
            >
              Close
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu & Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden animate-fade-in"
            style={{ top: '100px' }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div className="md:hidden relative z-50 bg-bakery-ivory border-t border-bakery-border shadow-2xl px-4 pt-3 pb-8 animate-fade-in max-h-[calc(100vh-110px)] overflow-y-auto">
            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <RouterLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-bold transition-all ${
                      isActive ? 'bg-bakery-cream text-bakery-terracotta border-l-4 border-bakery-terracotta pl-3' : 'text-bakery-espresso hover:bg-bakery-cream/60'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-bakery-softBrown/60" />
                  </RouterLink>
                );
              })}

              {/* Action Buttons in Mobile Menu */}
              <div className="pt-3 space-y-2 border-t border-bakery-border/80 mt-2">
                <RouterLink
                  to="/order-enquiry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-bakery-terracotta hover:bg-bakery-cherry text-white py-3.5 rounded-xl font-bold text-sm shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Submit Order Enquiry
                </RouterLink>

                <RouterLink
                  to="/custom-cakes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-bakery-cream text-bakery-espresso border-2 border-bakery-espresso py-3 rounded-xl font-bold text-sm"
                >
                  <Cake className="w-4 h-4 text-bakery-terracotta" />
                  Request Custom Cake
                </RouterLink>

                <a
                  href="tel:9701969499"
                  className="w-full flex items-center justify-center gap-2 bg-bakery-cream/70 text-bakery-espresso hover:text-bakery-terracotta py-2.5 rounded-xl font-bold text-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-bakery-terracotta" />
                  Call Directly: 9701969499
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
