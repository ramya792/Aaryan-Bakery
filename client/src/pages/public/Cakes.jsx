import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import ProductCard from '../../components/common/ProductCard';
import EnquiryModal from '../../components/common/EnquiryModal';
import { Cake, Sparkles } from 'lucide-react';

export default function Cakes() {
  const { products } = useBusiness();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const cakeProducts = products.filter(p => p.categoryName === 'Cakes');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-bakery-cream rounded-3xl p-8 border border-bakery-border text-center max-w-3xl mx-auto space-y-3">
        <div className="w-12 h-12 rounded-full bg-bakery-terracotta text-white flex items-center justify-center mx-auto shadow-sm">
          <Cake className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-espresso">
          Fresh Cakes Selection
        </h1>
        <p className="text-sm text-bakery-softBrown leading-relaxed">
          Delicious Vennela / Vanilla, Butterscotch, Chocolate, and 100% Eggless normal and cool cakes for birthdays, anniversaries, and parties.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cakeProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelectForEnquiry={setSelectedProduct}
          />
        ))}
      </div>

      {selectedProduct && (
        <EnquiryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
