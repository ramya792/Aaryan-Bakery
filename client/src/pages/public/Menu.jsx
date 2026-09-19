import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Leaf, RefreshCw, AlertCircle } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import ProductCard from '../../components/common/ProductCard';
import EnquiryModal from '../../components/common/EnquiryModal';

export default function Menu() {
  const { products, loading } = useBusiness();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'All';
  const searchQueryParam = searchParams.get('search') || '';
  const isEgglessOnly = searchParams.get('eggless') === 'true';

  const [searchTerm, setSearchTerm] = useState(searchQueryParam);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Cakes', 'Pizzas', 'Puffs', 'Ice Creams'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (currentCategory !== 'All' && p.categoryName.toLowerCase() !== currentCategory.toLowerCase()) {
        return false;
      }
      // Eggless filter
      if (isEgglessOnly && !p.isEggless) {
        return false;
      }
      // Search term filter
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = (p.description || '').toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesCat;
      }
      return true;
    });
  }, [products, currentCategory, isEgglessOnly, searchTerm]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

  const handleEgglessToggle = () => {
    const params = new URLSearchParams(searchParams);
    if (isEgglessOnly) {
      params.delete('eggless');
    } else {
      params.set('eggless', 'true');
    }
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold text-bakery-terracotta tracking-widest">Database Driven</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-bakery-espresso">
          Aaryan Bakery Menu
        </h1>
        <p className="text-sm text-bakery-softBrown leading-relaxed">
          Browse verified prices for fresh cakes, oven pizzas, crispy puffs, and Arun Ice Creams.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-bakery-border shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const active = currentCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-bakery-espresso text-bakery-cream shadow-sm'
                      : 'bg-bakery-cream text-bakery-espresso hover:bg-bakery-border'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-bakery-softBrown absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-bakery-ivory border border-bakery-border rounded-full text-xs text-bakery-espresso focus:outline-none focus:border-bakery-terracotta"
            />
          </div>

        </div>

        {/* Second Row Filters */}
        <div className="flex items-center justify-between pt-3 border-t border-bakery-border text-xs text-bakery-softBrown">
          <button
            onClick={handleEgglessToggle}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
              isEgglessOnly
                ? 'bg-emerald-700 text-white border-emerald-700 font-semibold'
                : 'bg-bakery-ivory text-bakery-espresso border-bakery-border hover:bg-bakery-cream'
            }`}
          >
            <Leaf className="w-3.5 h-3.5" /> 100% Eggless Only
          </button>

          <span>Showing {filteredProducts.length} items</span>
        </div>

      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-16 text-bakery-softBrown space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-bakery-terracotta" />
          <p className="text-sm">Loading bakery products from database...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-bakery-border max-w-md mx-auto space-y-4">
          <AlertCircle className="w-10 h-10 text-bakery-terracotta mx-auto" />
          <h3 className="font-serif text-lg font-bold text-bakery-espresso">No Products Found</h3>
          <p className="text-xs text-bakery-softBrown">
            No products match your selected category or search query.
          </p>
          <button
            onClick={() => {
              setSearchParams({});
              setSearchTerm('');
            }}
            className="px-4 py-2 bg-bakery-espresso text-bakery-cream text-xs font-semibold rounded-xl hover:bg-bakery-terracotta"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectForEnquiry={setSelectedProduct}
            />
          ))}
        </div>
      )}

      {/* Enquiry Modal */}
      {selectedProduct && (
        <EnquiryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

    </div>
  );
}
