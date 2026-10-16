import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { ACCESSORIES_PRODUCTS } from '../data';
import ProductQuickView from './ProductQuickView';

interface DepartmentAccessoriesProps {
  onAddToBag: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

export default function DepartmentAccessories({ onAddToBag, onAddToWishlist }: DepartmentAccessoriesProps) {
  const [selectedSub, setSelectedSub] = useState<'all' | 'watches' | 'bags' | 'jewellery'>('all');
  const [visibleCount, setVisibleCount] = useState(4);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filters: { label: string; key: 'all' | 'watches' | 'bags' | 'jewellery' }[] = [
    { label: 'ALL ITEMS', key: 'all' },
    { label: 'WATCHES', key: 'watches' },
    { label: 'BAGS', key: 'bags' },
    { label: 'JEWELRY', key: 'jewellery' }
  ];

  // Client-side filtering
  const filteredProducts = selectedSub === 'all' 
    ? ACCESSORIES_PRODUCTS.filter(p => p.id !== 'a-5') // exclude the series watch
    : ACCESSORIES_PRODUCTS.filter(p => p.subCategory === selectedSub && p.id !== 'a-5');

  return (
    <div id="accessories-dept-root" className="w-full space-y-16 pb-20 select-none text-stone-900 border-none">
      
      {/* 1. Complete Your Look Banner */}
      <div id="accessories-hero" className="relative w-full rounded-[2rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-[#dbe0e4] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-referrer"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1400')` }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-950/20" />

        {/* Minimal display card layered like image 1 */}
        <div className="relative z-10 px-6 md:px-16 w-full max-w-sm md:max-w-md">
          <div className="bg-white/85 backdrop-blur-md p-8 md:p-12 rounded-[2rem] border border-stone-200/40 text-stone-900 shadow-sm">
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-tight">
              Complete Your Look
            </h2>
            <p className="text-xs text-stone-600 font-light mt-4 leading-relaxed font-sans">
              Improve your style with our simple, classic products, made for everyday wear.
            </p>
            <button 
              onClick={() => alert('Launching full collection folder.')}
              className="mt-8 px-8 py-3.5 bg-[#dca42b] hover:bg-[#c39121] text-white text-[11px] font-semibold uppercase tracking-[0.25em] rounded-full transition-all"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      {/* 2. Category Folder Link Filters */}
      <div id="accessories-filters" className="flex justify-center border-b border-stone-100 pb-3 gap-6 md:gap-12 flex-wrap">
        {filters.map(filt => (
          <button
            key={filt.key}
            onClick={() => {
              setSelectedSub(filt.key);
              setVisibleCount(4);
            }}
            className={`text-xs font-semibold tracking-[0.2em] pb-3 relative uppercase transition-colors ${
              selectedSub === filt.key ? 'text-amber-800' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            {filt.label}
            {selectedSub === filt.key && (
              <motion.div 
                layoutId="accessoriesTabLine"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-700"
              />
            )}
          </button>
        ))}
      </div>

      {/* 3. Season Edit: Premium Collections */}
      <div id="accessories-premium-collections" className="space-y-8">
        <div>
          <span className="text-[10px] tracking-[0.35em] text-amber-700 block mb-1 font-mono uppercase">
            NEW SEASON
          </span>
          <h3 className="font-serif text-3xl font-medium tracking-tight text-stone-950">
            Special Collections
          </h3>
        </div>

        {/* Triple grid cards from image 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Big Card - Left: The Gold Standard watch series */}
          <div className="lg:col-span-8 relative aspect-[16/10] bg-stone-100 rounded-[2rem] overflow-hidden group flex items-end p-8 md:p-12">
            <div 
              className="absolute inset-0 bg-cover bg-center group-hover:scale-101 duration-700 transition"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=900')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/15 to-transparent" />
            
            <div className="relative z-10 text-white max-w-sm">
              <h4 className="font-serif text-3xl font-medium tracking-tight leading-none mb-3">
                The Gold Standard
              </h4>
              <p className="text-xs font-light text-stone-200/90 leading-relaxed mb-6 font-sans">
                Classic watches for collectors. Hand-made parts with special designs.
              </p>
              <button 
                onClick={() => onAddToBag(ACCESSORIES_PRODUCTS[4])}
                className="px-6 py-2.5 border border-white hover:bg-white hover:text-stone-900 text-white text-[10px] font-semibold uppercase tracking-widest rounded-sm transition-all"
              >
                VIEW WATCHES
              </button>
            </div>
          </div>

          {/* Right column stacking 2 smaller promotional items */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            
            {/* Bag card */}
            <div className="relative aspect-[16/10] lg:aspect-auto rounded-[2rem] overflow-hidden group flex items-end p-6 bg-stone-300">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=500')` }}
              />
              <div className="absolute inset-0 bg-stone-950/30" />
              <div className="relative z-10 text-white">
                <h4 className="font-serif text-xl font-medium mb-1">Classic Bags</h4>
                <p className="text-[10px] text-stone-100/90 font-light">Made with soft, high-quality leather.</p>
              </div>
            </div>

            {/* Glasses card */}
            <div className="relative aspect-[16/10] lg:aspect-auto rounded-[2rem] overflow-hidden group flex items-end p-6 bg-stone-400">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500')` }}
              />
              <div className="absolute inset-0 bg-stone-950/40" />
              <div className="relative z-10 text-white">
                <h4 className="font-serif text-xl font-medium mb-1">Dark Sunglasses</h4>
                <p className="text-[10px] text-stone-100/90 font-light">Cool shades, made with metal frames.</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Filtered Accessory Product Catalog Grid */}
      <div id="accessories-catalog-grid" className="border-t border-stone-100 pt-16">
        <div className="flex justify-between items-baseline mb-10">
          <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
            {filteredProducts.length} Items found in category
          </span>
          <span className="text-xs uppercase font-semibold tracking-widest text-stone-850 cursor-pointer flex items-center gap-1.5 border-b border-stone-200">
            SORT BY: RECOMMENDED
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, visibleCount).map(prod => (
            <div 
              key={prod.id} 
              onClick={() => setQuickViewProduct(prod)}
              className="group relative flex flex-col justify-between cursor-pointer"
            >
              
              {prod.tag && (
                <span className="absolute top-4 left-4 z-10 bg-amber-500 text-white text-[9px] font-semibold px-3 py-1 uppercase rounded-full">
                  {prod.tag}
                </span>
              )}

              {/* Action photo frame */}
              <div className="relative aspect-[4/5] bg-stone-50 rounded-2xl overflow-hidden mb-4">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-102 transition"
                />
                
                {/* Floating overlay actions */}
                <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 duration-300 transition-opacity flex justify-center items-center gap-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToBag(prod); }}
                    className="p-3 bg-white rounded-full text-stone-800 hover:text-amber-800 transition shadow hover:scale-105"
                  >
                    <ShoppingBag size={14} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToWishlist(prod); }}
                    className="p-3 bg-white rounded-full text-stone-800 hover:text-amber-800 transition shadow hover:scale-105"
                  >
                    <Heart size={14} />
                  </button>
                </div>
              </div>

              {/* Specs */}
              <div className="text-center">
                <span className="text-[9px] tracking-[0.2em] font-medium text-stone-400 block uppercase mb-1">
                  {prod.category}
                </span>
                <h4 className="font-serif text-base font-semibold text-stone-900 leading-tight">
                  {prod.name}
                </h4>
                <span className="text-xs font-mono text-stone-500 block mt-1.5">
                  ${prod.price.toLocaleString()}.00
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Trigger */}
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount(p => p + 4)}
              className="px-10 py-3 border border-stone-300 hover:border-stone-900 text-stone-500 hover:text-stone-905 text-xs font-semibold uppercase tracking-[0.25em] transition-all"
            >
              LOAD MORE ITEMS
            </button>
          </div>
        )}
      </div>

      <ProductQuickView 
        product={quickViewProduct}
        isOpen={quickViewProduct !== null}
        onClose={() => setQuickViewProduct(null)}
        onAddToBag={(prod, size, mat) => {
          const decoratedName = `${prod.name} (${size || 'M'} - ${mat || 'Pure Mulberry Silk'})`;
          onAddToBag({ ...prod, name: decoratedName });
        }}
        onAddToWishlist={onAddToWishlist}
      />

    </div>
  );
}
