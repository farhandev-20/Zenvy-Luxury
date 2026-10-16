import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Heart } from 'lucide-react';
import { Product } from '../types';
import { KIDS_PRODUCTS } from '../data';
import ProductQuickView from './ProductQuickView';

interface DepartmentKidsProps {
  onAddToBag: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

export default function DepartmentKids({ onAddToBag, onAddToWishlist }: DepartmentKidsProps) {
  const [activeGender, setActiveGender] = useState<'boys' | 'girls' | 'baby' | 'school'>('girls');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const genders: { label: string; key: 'boys' | 'girls' | 'baby' | 'school' }[] = [
    { label: 'BOYS', key: 'boys' },
    { label: 'GIRLS', key: 'girls' },
    { label: 'BABY', key: 'baby' },
    { label: 'SCHOOL', key: 'school' }
  ];

  const essentials = [
    { label: 'T-SHIRTS', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=260' },
    { label: 'SHOES', image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=260' },
    { label: 'TOYS', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=260' },
    { label: 'BACKPACKS', image: 'https://images.unsplash.com/photo-1519242220831-09410926fbff?auto=format&fit=crop&q=80&w=260' },
  ];

  const filteredProducts = KIDS_PRODUCTS.filter(p => p.subCategory === activeGender || activeGender === 'girls');

  return (
    <div id="kids-dept-root" className="w-full space-y-16 pb-20 select-none text-stone-900 border-none">
      
      {/* 1. Playful Fashion Gradient Banner */}
      <div id="kids-hero" className="relative w-full rounded-[2rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-gradient-to-r from-amber-500/25 via-[#ebdcd3] to-amber-700/25 flex items-center p-8 md:p-16">
        <div className="max-w-md z-10 text-stone-900">
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight text-amber-950">
            Playful Fashion Collection
          </h2>
          <p className="text-xs text-stone-600 font-light mt-4 leading-relaxed max-w-xs">
            Making childhood better with classic clothes and high quality. Cozy knitted sweaters to withstand little adventures.
          </p>
          <div className="mt-8 flex">
            <button 
              onClick={() => alert('Opening the Kids SS24 collection.')}
              className="px-8 py-3.5 bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold uppercase tracking-[0.25em] rounded-full transition-all"
            >
              EXPLORE NOW
            </button>
          </div>
        </div>
      </div>

      {/* 2. Trending Essentials Circular Gallery */}
      <div id="kids-trending-circles" className="text-center">
        <h3 className="font-serif text-3xl font-medium tracking-tight text-stone-950 mb-10">
          Trending Essentials
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {essentials.map((item, index) => (
            <div 
              key={index}
              onClick={() => alert(`Redirecting to kids ${item.label} collection.`)}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-stone-100 border border-stone-250 shadow-sm group-hover:shadow-md duration-500 transition-all mb-4 flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-103 duration-700 transition"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-mono text-xs font-semibold tracking-widest text-stone-600 group-hover:text-amber-800 transition">
                {item.label}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Filter Category pill buttons */}
      <div id="kids-gender-filters" className="flex justify-center border-b border-stone-100 pb-3 gap-4 md:gap-8 flex-wrap">
        {genders.map(g => (
          <button
            key={g.key}
            onClick={() => setActiveGender(g.key)}
            className={`px-6 py-2 rounded-full text-xs font-semibold tracking-wider transition-all border ${
              activeGender === g.key 
                ? 'bg-amber-800 text-white border-amber-800' 
                : 'bg-white text-stone-400 border-stone-200 hover:text-stone-600 hover:border-stone-400'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* 4. Product catalog grid */}
      <div id="kids-grid" className="pt-8">
        <div className="flex justify-between items-baseline mb-10 text-stone-500 text-xs uppercase tracking-widest border-b border-stone-100 pb-3 font-mono">
          <span>{filteredProducts.length} Items found</span>
          <span>SORT: NEWEST</span>
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
                  className="w-full h-full object-cover group-hover:scale-102 transition"
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

        <div className="flex justify-center mt-12">
          <button 
            onClick={() => alert("Loading more organic items.")}
            className="px-10 py-3 border border-stone-200 hover:border-stone-900 text-stone-500 hover:text-stone-990 text-xs font-semibold uppercase tracking-[0.25em] transition-all"
          >
            LOAD MORE ITEMS
          </button>
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
