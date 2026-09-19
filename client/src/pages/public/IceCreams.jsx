import React from 'react';
import { Phone, MessageSquare, IceCream as IceCreamIcon, Sparkles } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export default function IceCreams() {
  const { business, generateWhatsAppLink } = useBusiness();

  const handleWhatsApp = () => {
    const url = generateWhatsAppLink({
      productName: 'Arun Ice Creams',
      category: 'Ice Creams',
      message: 'Hello Aaryan Bakery! What varieties and prices of Arun Ice Creams are currently available in stock?'
    });
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Banner */}
      <div className="bg-bakery-cream rounded-3xl p-8 sm:p-12 border border-bakery-border text-center max-w-3xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-bakery-terracotta text-white flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold text-bakery-terracotta uppercase tracking-wider">Authorized Retailer</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-espresso">
          Arun Ice Creams
        </h1>
        <p className="text-sm sm:text-base text-bakery-softBrown leading-relaxed">
          We stock a wide variety of delicious <span className="font-semibold text-bakery-espresso">Arun Ice Creams</span> including sticks, cones, cups, kulfis, and family tub packs.
        </p>
        <div className="inline-block bg-white px-4 py-2 rounded-full text-xs font-semibold text-bakery-terracotta border border-bakery-border shadow-sm">
          Price: Contact bakery for current price
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl p-8 border border-bakery-border shadow-sm max-w-2xl mx-auto space-y-6">
        <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-bakery-ivory">
          <img
            src="/images/ice-creams/arun-icecream-1.jpg"
            alt="Arun Ice Creams at Aaryan Bakery"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/images/icecreams-category.jpg';
            }}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-3">
          <h3 className="font-serif text-2xl font-bold text-bakery-espresso">
            Arun Ice Cream Selection
          </h3>
          <p className="text-sm text-bakery-softBrown leading-relaxed">
            Due to seasonal stock variations, flavour availability changes daily. Please contact owner <span className="font-semibold text-bakery-espresso">K. Narendra</span> at Aaryan Bakery for current flavor list and pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-bakery-border">
          <a
            href={`tel:${business.phone}`}
            className="py-3 bg-bakery-terracotta hover:bg-bakery-cherry text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Phone className="w-4 h-4" /> Call {business.phone}
          </a>
          <button
            onClick={handleWhatsApp}
            className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <MessageSquare className="w-4 h-4" /> Enquire on WhatsApp
          </button>
        </div>
      </div>

    </div>
  );
}
