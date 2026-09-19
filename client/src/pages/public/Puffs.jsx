import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import ProductCard from '../../components/common/ProductCard';
import EnquiryModal from '../../components/common/EnquiryModal';

export default function Puffs() {
  const { products } = useBusiness();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const puffProducts = products.filter(p => p.categoryName === 'Puffs');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-bakery-cream rounded-3xl p-8 border border-bakery-border text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-espresso">
          Crispy Bakery Puffs
        </h1>
        <p className="text-sm text-bakery-softBrown leading-relaxed">
          Golden layered hot bakery puffs baked fresh throughout the day: Chicken Puff (₹30), Egg Puff (₹20), and Curry Puff (₹15).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {puffProducts.map((product) => (
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
