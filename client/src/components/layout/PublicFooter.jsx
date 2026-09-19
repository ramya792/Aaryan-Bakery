import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, Clock, Truck } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export default function PublicFooter() {
  const { business } = useBusiness();
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-bakery-espresso text-bakery-cream border-t-4 border-bakery-gold pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info with Actual Aaryan Bakery Logo */}
          <div>
            <div className="mb-4">
              {!logoError ? (
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="/images/logo/aaryan-bakery-logo.png"
                    alt="Aaryan Bakery"
                    onError={() => setLogoError(true)}
                    className="h-14 w-14 rounded-full object-contain drop-shadow-md"
                  />
                  <div>
                    <h3 className="font-serif text-2xl font-black text-white tracking-tight leading-none">Aaryan Bakery</h3>
                    <p className="text-[11px] uppercase tracking-widest text-bakery-gold font-bold mt-1">Sweet Studio • Mudinepalle</p>
                  </div>
                </div>
              ) : (
                <div className="mb-3">
                  <h3 className="font-serif text-2xl font-bold text-white tracking-tight">Aaryan Bakery</h3>
                  <p className="text-xs uppercase tracking-widest text-bakery-gold font-semibold">Sweet Studio • Mudinepalle</p>
                </div>
              )}
            </div>
            <p className="text-sm text-bakery-cream/80 leading-relaxed mb-5">
              Freshly prepared cakes, pizzas, puffs and Arun Ice Creams. Owned and operated by <span className="text-white font-medium">K. Narendra</span> for all your birthdays, weddings, and celebrations.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919701969499"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-sm"
                title="WhatsApp Bakery"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="tel:9701969499"
                className="w-10 h-10 rounded-full bg-bakery-terracotta hover:bg-bakery-cherry text-white flex items-center justify-center transition-colors shadow-sm"
                title="Call Bakery"
                aria-label="Call Bakery"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-bakery-gold mb-4 border-b border-bakery-softBrown/40 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-bakery-cream/80">
              <li><RouterLink to="/" className="hover:text-bakery-gold transition-colors">Home Page</RouterLink></li>
              <li><RouterLink to="/menu" className="hover:text-bakery-gold transition-colors">Bakery Menu</RouterLink></li>
              <li><RouterLink to="/custom-cakes" className="hover:text-bakery-gold transition-colors">Custom Cakes</RouterLink></li>
              <li><RouterLink to="/gallery" className="hover:text-bakery-gold transition-colors">Photo Gallery</RouterLink></li>
              <li><RouterLink to="/about" className="hover:text-bakery-gold transition-colors">About K. Narendra</RouterLink></li>
              <li><RouterLink to="/contact" className="hover:text-bakery-gold transition-colors">Contact & Location</RouterLink></li>
              <li><RouterLink to="/order-enquiry" className="hover:text-bakery-gold transition-colors">Submit Order Enquiry</RouterLink></li>
            </ul>
          </div>

          {/* Col 3: Business Information */}
          <div>
            <h4 className="font-serif text-lg font-bold text-bakery-gold mb-4 border-b border-bakery-softBrown/40 pb-2">
              Bakery Details
            </h4>
            <ul className="space-y-3 text-sm text-bakery-cream/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bakery-gold shrink-0 mt-1" />
                <span>Mudinepalle, Eluru District, Andhra Pradesh - 521325</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-bakery-gold shrink-0" />
                <a href="tel:9701969499" className="hover:text-white font-semibold">9701969499</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-bakery-gold shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Opening Hours:</p>
                  <p>9:00 AM – 10:00 PM</p>
                  <p className="text-xs text-bakery-cream/60">Open Every Day (No weekly holiday)</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-bakery-gold shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">Local Delivery:</p>
                  <p className="text-xs">Available in Mudinepalle area. Contact bakery for delivery details.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Categories */}
          <div>
            <h4 className="font-serif text-lg font-bold text-bakery-gold mb-4 border-b border-bakery-softBrown/40 pb-2">
              Product Categories
            </h4>
            <ul className="space-y-2 text-sm text-bakery-cream/80">
              <li><RouterLink to="/menu?category=Cakes" className="hover:text-bakery-gold transition-colors">Fresh Normal & Cool Cakes</RouterLink></li>
              <li><RouterLink to="/menu?category=Cakes&eggless=true" className="hover:text-bakery-gold transition-colors">100% Eggless Cakes</RouterLink></li>
              <li><RouterLink to="/menu?category=Pizzas" className="hover:text-bakery-gold transition-colors">Oven Fresh Pizzas</RouterLink></li>
              <li><RouterLink to="/menu?category=Puffs" className="hover:text-bakery-gold transition-colors">Crispy Bakery Puffs</RouterLink></li>
              <li><RouterLink to="/menu?category=Ice Creams" className="hover:text-bakery-gold transition-colors">Arun Ice Creams</RouterLink></li>
              <li><RouterLink to="/custom-cakes" className="hover:text-bakery-gold transition-colors">Custom Celebration Cakes</RouterLink></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar — No Admin Login link */}
        <div className="border-t border-bakery-softBrown/40 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-bakery-cream/60 gap-4">
          <p>© {new Date().getFullYear()} Aaryan Bakery (Owner: K. Narendra). All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <RouterLink to="/privacy-policy" className="hover:text-bakery-gold transition-colors">Privacy Policy</RouterLink>
            <RouterLink to="/terms-and-conditions" className="hover:text-bakery-gold transition-colors">Terms & Conditions</RouterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
