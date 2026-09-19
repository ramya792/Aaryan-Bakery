import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { Image as ImageIcon, Sparkles } from 'lucide-react';

export default function Gallery() {
  const { gallery } = useBusiness();
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Cakes', 'Pizzas', 'Puffs', 'Ice Creams'];

  const filteredGallery = activeTab === 'All'
    ? gallery
    : gallery.filter(item => item.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold text-bakery-terracotta tracking-widest flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4" /> Bakery Photo Showcase
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-bakery-espresso">
          Our Bakery Creations Gallery
        </h1>
        <p className="text-sm text-bakery-softBrown leading-relaxed">
          Real bakery product photos of customized theme cakes, cool cakes, pizzas, puffs, and Arun Ice Creams crafted at Aaryan Bakery.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
              activeTab === cat
                ? 'bg-bakery-espresso text-bakery-cream shadow-sm'
                : 'bg-white text-bakery-espresso border border-bakery-border hover:bg-bakery-cream'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden border border-bakery-border shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-bakery-cream">
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/cakes/cake-1.jpg';
                }}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-bakery-espresso/90 text-bakery-gold text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {item.category}
              </span>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-serif font-bold text-lg text-bakery-espresso mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-bakery-softBrown leading-relaxed">
                {item.description || 'Prepared fresh at Aaryan Bakery.'}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
