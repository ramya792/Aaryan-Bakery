import React from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { Cake, User, MapPin, Clock, Phone, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function AboutUs() {
  const { business } = useBusiness();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Banner */}
      <div className="bg-bakery-cream rounded-3xl p-8 sm:p-12 border border-bakery-border text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold text-bakery-terracotta tracking-widest flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4" /> About Our Bakery
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-bakery-espresso">
          Welcome to Sweet Studio — Aaryan Bakery
        </h1>
        <p className="text-base text-bakery-softBrown leading-relaxed">
          Owned and operated by <span className="font-semibold text-bakery-espresso font-serif text-lg">K. Narendra</span>, serving Mudinepalle and surrounding areas in Eluru District with fresh cakes, pizzas, puffs, and ice creams.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <h2 className="font-serif text-3xl font-bold text-bakery-espresso">
            Our Business Commitment
          </h2>
          <p className="text-sm text-bakery-softBrown leading-relaxed">
            At <span className="font-semibold text-bakery-espresso">Aaryan Bakery</span>, we take pride in baking fresh cakes, hot pizzas, savory puffs, and offering delicious Arun Ice Creams. Whether you need a simple birthday cake or a grand customized theme cake, we prepare every item with care.
          </p>
          
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-bakery-border">
              <div className="w-10 h-10 rounded-xl bg-bakery-ivory text-bakery-terracotta flex items-center justify-center shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-bakery-espresso text-sm">Bakery Owner: K. Narendra</h4>
                <p className="text-xs text-bakery-softBrown">Direct personal oversight on quality and customer orders.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-bakery-border">
              <div className="w-10 h-10 rounded-xl bg-bakery-ivory text-bakery-terracotta flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-bakery-espresso text-sm">Prime Location</h4>
                <p className="text-xs text-bakery-softBrown">{business.address}, {business.district}, {business.state} - {business.pinCode}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-bakery-border">
              <div className="w-10 h-10 rounded-xl bg-bakery-ivory text-bakery-terracotta flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-bakery-espresso text-sm">Everyday Availability</h4>
                <p className="text-xs text-bakery-softBrown">Open 7 days a week from 09:00 AM to 10:00 PM.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white aspect-[4/3]">
            <img
              src="/images/hero-bg-bakery.jpg"
              alt="Aaryan Bakery Store"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = '/images/hero-cake.jpg';
              }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
