import React from 'react';
import { MessageSquare, ShoppingBag, Leaf, CheckCircle, AlertCircle } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

const DEFAULT_FALLBACK_IMAGE = "/images/hero-cake.jpg";

export default function ProductCard({ product, onSelectForEnquiry }) {
  const { generateWhatsAppLink } = useBusiness();

  const isAvailable = product.isAvailable !== false;
  const isPriceSet = product.price > 0;

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const url = generateWhatsAppLink({
      productName: product.name,
      category: product.categoryName,
      cakeWeight: (product.unit && product.unit.includes('kg')) ? '1 kg' : '1 piece',
      message: `Enquiring about ${product.name} priced at ${isPriceSet ? `${product.currency || '₹'}${product.price} ${product.unit}` : product.unit}`
    });
    window.open(url, '_blank');
  };

  const handleImageError = (e) => {
    if (e.target.src !== DEFAULT_FALLBACK_IMAGE) {
      e.target.src = DEFAULT_FALLBACK_IMAGE;
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-bakery-border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-bakery-cream">
        <img
          src={product.imageUrl || DEFAULT_FALLBACK_IMAGE}
          alt={product.name}
          onError={handleImageError}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Tag */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-bakery-espresso/90 backdrop-blur-sm text-bakery-cream text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {product.categoryName}
          </span>
          {product.isEggless && (
            <span className="bg-emerald-700/95 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Leaf className="w-3 h-3" /> Eggless
            </span>
          )}
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          {isAvailable ? (
            <span className="bg-emerald-100/95 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1 shadow-sm">
              <CheckCircle className="w-3 h-3" /> Available
            </span>
          ) : (
            <span className="bg-amber-100/95 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1 shadow-sm">
              <AlertCircle className="w-3 h-3" /> Currently unavailable
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-lg font-bold text-bakery-espresso leading-snug mb-2 group-hover:text-bakery-terracotta transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-bakery-softBrown line-clamp-2 mb-4 leading-relaxed flex-1">
          {product.description || 'Freshly prepared at Aaryan Bakery.'}
        </p>

        {/* Price & Unit */}
        <div className="flex items-baseline justify-between mb-4 pt-3 border-t border-bakery-border/60">
          <div>
            {isPriceSet ? (
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-2xl font-bold text-bakery-espresso">
                  {product.currency || '₹'}{product.price}
                </span>
                <span className="text-xs font-medium text-bakery-softBrown">
                  / {product.unit}
                </span>
              </div>
            ) : (
              <span className="text-sm font-semibold text-bakery-terracotta bg-bakery-cream px-3 py-1 rounded-full border border-bakery-border">
                {product.unit}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            onClick={() => onSelectForEnquiry && onSelectForEnquiry(product)}
            disabled={!isAvailable}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
              isAvailable
                ? 'bg-bakery-espresso text-bakery-cream hover:bg-bakery-terracotta shadow-sm'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Enquire Now
          </button>
          
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm"
            title="Enquire on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
