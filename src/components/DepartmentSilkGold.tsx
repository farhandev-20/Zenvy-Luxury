import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { SILK_GOLD_PRODUCTS } from '../data';
import ProductQuickView from './ProductQuickView';

interface DepartmentSilkGoldProps {
  onAddToBag: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

export default function DepartmentSilkGold({ onAddToBag, onAddToWishlist }: DepartmentSilkGoldProps) {
  const [selectedStyle, setSelectedStyle] = useState<'all' | 'ethnic' | 'dresses' | 'bags' | 'beauty'>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    { label: 'ALL', key: 'all' },
    { label: 'ETHNIC', key: 'ethnic' },
    { label: 'DRESSES', key: 'dresses' },
    { label: 'BEAUTY', key: 'beauty' },
    { label: 'BAGS', key: 'bags' }
  ];

  const subStyles = [
    { label: 'Kurti Sets', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300' },
    { label: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300' },
    { label: 'Heels', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=300' },
    { label: 'Handbags', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=300' }
  ];

  const filteredProducts = selectedStyle === 'all' 
    ? SILK_GOLD_PRODUCTS 
    : SILK_GOLD_PRODUCTS.filter(p => p.subCategory === selectedStyle);

  return (
    <div id="silk-gold-dept-root" className="w-full space-y-16 pb-20 select-none text-stone-900 border-none">
      
      {/* 1. Indian pillar ethnic Banner */}
      <div id="silk-gold-hero" className="relative w-full rounded-[2rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-[#e7dbcb] flex items-center p-8 md:p-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-referrer filter brightness-95 opacity-85"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200')` }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-950/20" />

        <div className="relative z-10 max-w-md text-white">
          <span className="text-[10px] tracking-[0.45em] text-amber-300 block mb-3 font-mono font-bold uppercase">
            NEW COLLECTION 2024
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light tracking-wide leading-tight text-white uppercase">
            SILK & GOLD
          </h2>
          <div className="mt-8 flex">
            <button 
              onClick={() => alert('Opening Silk & Gold detailed catalog lookbook.')}
              className="px-8 py-3.5 bg-[#dca42b] hover:bg-[#c39121] text-white text-xs font-semibold uppercase tracking-[0.25em] rounded-full transition-all"
            >
              EXPLORE NOW
            </button>
          </div>
        </div>
      </div>

      {/* 2. Trending Styles Columns */}
      <div id="styles-column-section" className="space-y-8">
        <div>
          <span className="text-[10px] tracking-[0.35em] text-amber-700 block mb-1 font-mono uppercase">
            STYLING
          </span>
          <h3 className="font-serif text-3xl font-medium tracking-tight text-stone-950">
            Trending Styles
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {subStyles.map((item, index) => (
            <div 
              key={index}
              onClick={() => alert(`Reviewing details for ${item.label}.`)}
              className="group cursor-pointer flex flex-col items-center bg-white border border-stone-100 rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-stone-50">
                <img 
                  src={item.image} 
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-103 duration-500 transition-transform"
                />
              </div>
              <h4 className="font-serif text-base font-semibold tracking-tight text-stone-900 group-hover:text-amber-800 transition">
                {item.label}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Product grid with filter categories */}
      <div id="silk-gold-grid" className="border-t border-stone-105 pt-16">
        
        {/* Category triggers */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-4 justify-start md:justify-center border-b border-stone-100">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedStyle(cat.key as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all border whitespace-nowrap ${
                selectedStyle === cat.key 
                  ? 'bg-amber-800 text-white border-amber-850 shadow-sm' 
                  : 'bg-white text-stone-400 border-stone-200 hover:text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-baseline mb-10 text-stone-500 text-xs uppercase tracking-widest font-mono">
          <span>{filteredProducts.length} Premium weaves found</span>
          <span>SORT: RECOMMENDED</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {filteredProducts.map(prod => (
            <div 
              key={prod.id} 
              onClick={() => setQuickViewProduct(prod)}
              className="group relative flex flex-col justify-between cursor-pointer"
            >
              
              {prod.tag && (
                <span className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-10 bg-amber-500 text-white text-[7px] sm:text-[8px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 uppercase rounded-full">
                  {prod.tag}
                </span>
              )}

              {/* Action photo frame */}
              <div className="relative aspect-[4/5] bg-stone-50 rounded-[1.2rem] sm:rounded-2xl overflow-hidden mb-2.5 sm:mb-4">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-101 transition-all duration-300"
                />

                {/* Mobile direct buttons */}
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToWishlist(prod); }}
                  className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 p-1.5 sm:p-2 bg-white/95 rounded-full text-stone-700 hover:text-red-500 transition shadow-sm hover:scale-105"
                >
                  <Heart size={13} className="sm:w-3.5 sm:h-3.5" />
                </button>

                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToBag(prod); }}
                  className="md:hidden absolute bottom-2.5 right-2.5 z-20 p-2 bg-amber-500 text-stone-950 rounded-full shadow-md active:scale-95 transition-transform"
                >
                  <ShoppingBag size={12} />
                </button>
                
                <div className="hidden md:flex absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 duration-300 transition-opacity justify-center items-center gap-3">
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
              <div className="text-center px-1">
                <span className="text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.2em] font-medium text-stone-400 block uppercase mb-0.5 sm:mb-1 font-mono">
                  {prod.category}
                </span>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-900 leading-tight line-clamp-1">
                  {prod.name}
                </h4>
                <span className="text-xs font-mono text-stone-600 font-bold block mt-1 sm:mt-1.5">
                  ${prod.price.toLocaleString()}.00
                </span>
              </div>
            </div>
          ))}
        </div>
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
