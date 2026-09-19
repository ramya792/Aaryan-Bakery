import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import ProductCard from '../../components/common/ProductCard';
import EnquiryModal from '../../components/common/EnquiryModal';
import { Sparkles } from 'lucide-react';

export default function Pizzas() {
  const { products } = useBusiness();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const pizzaProducts = products.filter(p => p.categoryName === 'Pizzas');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-bakery-cream rounded-3xl p-8 border border-bakery-border text-center max-w-3xl mx-auto space-y-3">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-bakery-espresso">
          Oven Fresh Pizzas
        </h1>
        <p className="text-sm text-bakery-softBrown leading-relaxed">
          Hot oven-baked pizzas loaded with mozzarella cheese and fresh toppings: Chicken Pizza (₹150), Vegetable Pizza (₹120), and Sweet Corn Pizza (₹130).
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzaProducts.map((product) => (
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
