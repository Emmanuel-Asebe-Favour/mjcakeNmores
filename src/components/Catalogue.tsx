import React, { useState, useMemo } from 'react';
import { Product, CategoryType } from '../types';
import { useBakery } from '../context/BakeryContext';
import { Search, ShoppingBag, Sparkles, AlertCircle, Info, Lock } from 'lucide-react';
import { ProductDetailModal } from './ProductDetailModal';

interface CatalogueProps {
  openCart: () => void;
  openAdmin: () => void;
}

const CATEGORIES: CategoryType[] = [
  'All',
  'Pastries & Pies',
  'Small Chops & Snacks',
  'Cakes & Cupcakes',
  'Dessert Boxes',
];

export const Catalogue: React.FC<CatalogueProps> = ({ openCart, openAdmin }) => {
  const { products, seedSamplePrices } = useBakery();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.packSize.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const allUnpriced = products.every((p) => p.price === null || p.price <= 0);

  return (
    <section id="catalogue" className="py-16 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FCEEF1] text-[#3D2314] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Handcrafted Bakery Treats</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2314] tracking-tight">
            Our Freshly Baked Catalogue
          </h2>
          <p className="mt-3 text-base text-[#614231]">
            Explore our mouthwatering selection of Nigerian pastries, party small chops, celebration cakes, and dessert boxes in Otukpo.
          </p>

          {/* Admin Demo Helper Banner if all products are unpriced */}
          {allUnpriced && (
            <div className="mt-6 p-4 rounded-xl bg-[#FFF9E6] border border-[#F5E6CC] text-left sm:text-center text-xs text-[#8A621C] shadow-2xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0 text-[#C59B27]" />
                  <span>
                    <strong>Initial Catalogue Notice:</strong> Products currently show <em>&ldquo;Price to be added&rdquo;</em> (items cannot be ordered until prices are added by admin).
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={seedSamplePrices}
                    className="px-3 py-1.5 bg-[#D4AF37] hover:bg-[#C59B27] text-[#3D2314] font-bold rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    Load Sample Prices (₦)
                  </button>
                  <button
                    onClick={openAdmin}
                    className="px-3 py-1.5 bg-white border border-[#D9CBBF] text-[#3D2314] font-medium rounded-lg hover:bg-[#FAF5EC] transition-colors cursor-pointer"
                  >
                    Open Admin
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#3D2314] text-[#FDFBF7] shadow-xs'
                      : 'bg-[#F4EBE1] text-[#614231] hover:bg-[#EAE0D3] hover:text-[#3D2314]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A5843]" />
            <input
              type="text"
              placeholder="Search meat pie, puff puff, cakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white rounded-xl border border-[#D9CBBF] text-[#3D2314] placeholder-[#9E8373] focus:outline-none focus:ring-2 focus:ring-[#F2AAB8]"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white/60 rounded-2xl border border-[#E8DFD4]">
            <p className="text-base text-[#7A5843]">No products match your search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-bold text-[#C59B27] underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const hasValidPrice =
                typeof product.price === 'number' && product.price > 0;
              const canOrder = hasValidPrice && product.isAvailable;

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="group bg-white rounded-2xl border border-[#EAE0D3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Card Media */}
                  <div
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#FAF5EC] cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-[#3D2314]/85 text-white backdrop-blur-xs">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2 py-0.5 text-[11px] font-bold rounded-full ${
                          product.isAvailable
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {product.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </div>

                    {!hasValidPrice && (
                      <div className="absolute inset-0 bg-black/35 flex items-center justify-center p-3 text-center">
                        <span className="px-3 py-1.5 rounded-lg bg-white/95 text-[#3D2314] text-xs font-bold shadow-md">
                          Coming Soon &bull; Price to be added
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h3
                          onClick={() => setSelectedProduct(product)}
                          className="font-serif font-bold text-lg text-[#3D2314] hover:text-[#C59B27] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-xs text-[#7A5843] font-medium mt-0.5">
                        Pack: {product.packSize}
                      </p>
                      <p className="text-xs text-[#523B2D] mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {product.availableFlavours && product.availableFlavours.length > 0 && (
                        <div className="mt-2 flex items-center gap-1 flex-wrap">
                          <span className="text-[10px] text-[#7A5843] font-semibold">Flavours:</span>
                          {product.availableFlavours.slice(0, 2).map((f) => (
                            <span
                              key={f}
                              className="text-[10px] bg-[#FAF5EC] text-[#523B2D] px-1.5 py-0.5 rounded"
                            >
                              {f}
                            </span>
                          ))}
                          {product.availableFlavours.length > 2 && (
                            <span className="text-[10px] text-[#7A5843]">
                              +{product.availableFlavours.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-3 border-t border-[#F2EBE1] flex items-center justify-between gap-2">
                      <div>
                        {hasValidPrice ? (
                          <div>
                            <span className="text-[10px] text-[#7A5843] uppercase block font-semibold">Price</span>
                            <span className="font-serif font-bold text-base text-[#3D2314]">
                              ₦{product.price?.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span className="inline-block text-xs font-bold text-[#8A621C] bg-[#FFF9E6] px-2 py-1 rounded border border-[#F5E6CC]">
                              Price to be added
                            </span>
                          </div>
                        )}
                      </div>

                      {canOrder ? (
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-3.5 py-2 rounded-xl bg-[#F2AAB8] hover:bg-[#E892A2] text-[#3D2314] text-xs font-bold shadow-2xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Order</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-3 py-1.5 rounded-xl bg-[#F4EBE1] hover:bg-[#EAE0D3] text-[#7A5843] text-xs font-semibold border border-[#D9CBBF] transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          openCart={openCart}
        />
      )}
    </section>
  );
};
