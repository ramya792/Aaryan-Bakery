import React, { useState, useEffect } from 'react';
import { MessageSquare, PhoneCall, ArrowUp, Bot } from 'lucide-react';

export default function FloatingActionWidget() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor mobile menu state on body attribute
  useEffect(() => {
    const checkMobileMenu = () => {
      setIsMobileMenuOpen(document.body.getAttribute('data-mobile-menu') === 'open');
    };
    const observer = new MutationObserver(checkMobileMenu);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-mobile-menu'] });
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBot = () => {
    window.dispatchEvent(new CustomEvent('open-aaryan-chat'));
  };

  // If mobile menu is open, hide all floating widgets completely
  if (isMobileMenuOpen) return null;

  return (
    <>
      {/* ====================================================
          1. MOBILE VIEW (< sm):
          - Scroll-To-Top button neatly placed at BOTTOM-LEFT
          - Sleek Horizontal Quick-Action Dock placed at BOTTOM-RIGHT
          - Height is only 46px! Zero vertical screen clutter!
          ==================================================== */}
      
      {/* Mobile Scroll-to-Top (Bottom-Left) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="sm:hidden fixed bottom-4 left-4 z-40 w-10 h-10 rounded-full bg-bakery-espresso/90 backdrop-blur-sm text-bakery-gold shadow-lg flex items-center justify-center border border-bakery-gold/40 active:scale-95 transition-all"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Mobile Sleek Quick Action Dock (Bottom-Right) */}
      <div
        id="floating-action-widget"
        className="sm:hidden fixed bottom-3 right-3 z-40 bg-white/95 backdrop-blur-md px-2 py-1.5 rounded-full shadow-2xl border-2 border-bakery-border flex items-center gap-2 animate-fade-in"
      >
        {/* Quick Phone Call */}
        <a
          href="tel:9701969499"
          className="w-9 h-9 rounded-full bg-bakery-terracotta active:bg-bakery-cherry text-white flex items-center justify-center shadow-xs cursor-pointer"
          title="Call Bakery (9701969499)"
          aria-label="Call Bakery"
        >
          <PhoneCall className="w-4 h-4" />
        </a>

        {/* WhatsApp Chat */}
        <a
          href="https://wa.me/919701969499?text=Hello%20Aaryan%20Bakery!%20I%20would%20like%20to%20place%20an%20enquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full bg-emerald-600 active:bg-emerald-700 text-white flex items-center justify-center shadow-xs relative cursor-pointer"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-300 rounded-full ring-2 ring-white animate-pulse"></span>
        </a>

        {/* AI Chatbot Trigger */}
        <button
          onClick={handleOpenBot}
          className="w-9 h-9 rounded-full bg-bakery-espresso active:bg-bakery-terracotta text-bakery-gold flex items-center justify-center shadow-xs relative cursor-pointer"
          title="Ask Aaryan Assistant"
          aria-label="Ask Aaryan Assistant"
        >
          <Bot className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse"></span>
        </button>
      </div>

      {/* ====================================================
          2. DESKTOP VIEW (>= sm):
          - Stacked vertically above the Chatbot button on bottom-right
          ==================================================== */}
      <div className="hidden sm:flex fixed bottom-22 right-6 z-40 flex-col items-center gap-2.5">
        {/* Desktop Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full bg-bakery-espresso hover:bg-bakery-terracotta text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-bakery-gold/40 cursor-pointer animate-fade-in group"
            title="Scroll to Top"
            aria-label="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5 text-bakery-gold group-hover:text-white transition-colors" />
          </button>
        )}

        {/* Desktop Phone Call */}
        <a
          href="tel:9701969499"
          className="w-11 h-11 rounded-full bg-bakery-terracotta hover:bg-bakery-cherry text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/40 cursor-pointer group"
          title="Call Aaryan Bakery (9701969499)"
          aria-label="Call Aaryan Bakery"
        >
          <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </a>

        {/* Desktop WhatsApp */}
        <a
          href="https://wa.me/919701969499?text=Hello%20Aaryan%20Bakery!%20I%20would%20like%20to%20place%20an%20enquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/40 cursor-pointer relative group"
          title="Chat on WhatsApp (9701969499)"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-300 rounded-full ring-2 ring-white animate-pulse"></span>
        </a>
      </div>
    </>
  );
}
