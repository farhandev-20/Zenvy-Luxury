import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { BEAUTY_PRODUCTS } from '../data';
import ProductQuickView from './ProductQuickView';

interface DepartmentBeautyProps {
  onAddToBag: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

export default function DepartmentBeauty({ onAddToBag, onAddToWishlist }: DepartmentBeautyProps) {
  const [favoriteStates, setFavoriteStates] = useState<{ [id: string]: boolean }>({});
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const toggleFavorite = (id: string, prod: Product) => {
    setFavoriteStates(prev => ({ ...prev, [id]: !prev[id] }));
    onAddToWishlist(prod);
  };

  const categories = [
    { name: 'Best Sellers', tag: 'BEST SELLERS', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400' },
    { name: 'Korean Beauty', tag: 'KOREAN BEAUTY', image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=400' },
    { name: 'Organic Care', tag: 'ORGANIC CARE', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400' }
  ];

  return (
    <div id="beauty-dept-root" className="w-full space-y-16 pb-20 select-none text-stone-900 font-sans border-none">
      
      {/* 1. Golden Cosmetics Banner */}
      <div id="beauty-hero" className="relative w-full rounded-[2rem] overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-[#ebd6bc] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-referrer"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200')` }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-stone-950/20" />

        <div className="relative z-10 px-8 md:px-16 text-stone-900 max-w-lg">
          <span className="text-[10px] tracking-[0.4em] font-mono text-amber-800 uppercase block mb-2 font-bold select-none">
            THE GLOW COLLECTION
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight text-stone-950">
            Glow Beyond Beauty
          </h2>
          <p className="text-xs text-stone-700 font-light mt-4 leading-relaxed max-w-sm">
            Experience the best luxury skincare with our new gold-infused herbal creams. For glowing skin.
          </p>
          <div className="mt-8 flex">
            <button 
              onClick={() => alert('Viewing glowing herbal creams.')}
              className="px-8 py-3.5 bg-[#dca42b] hover:bg-[#c39121] text-white text-xs font-semibold uppercase tracking-[0.25em] rounded-full transition-all shadow-lg"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      {/* 2. Arched Collections Gallery matching Image 2 */}
      <div id="beauty-curated" className="space-y-8">
          <div>
            <h3 className="font-serif text-3xl font-medium tracking-tight text-stone-950 text-center md:text-left">
              Special Collections
            </h3>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div 
              key={i}
              className="group relative flex flex-col justify-end items-center p-6 text-white overflow-hidden aspect-[3/4] rounded-[2.5rem]"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-102 duration-700 transition"
                style={{ backgroundImage: `url('${cat.image}')` }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-955/80 to-transparent" />
              
              <div className="relative z-10 text-center space-y-4">
                <h4 className="font-serif text-2xl font-light uppercase tracking-wide">
                  {cat.name}
                </h4>
                <button 
                  onClick={() => alert(`Showing folders for ${cat.name}`)}
                  className="px-6 py-2 bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-stone-950 border border-white/40 text-[10px] font-semibold tracking-widest uppercase transition-all rounded-full"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Product Catalog Grid */}
      <div id="beauty-grid" className="border-t border-stone-100 pt-16">
        <div className="flex justify-between items-baseline mb-10 text-stone-500 text-xs uppercase tracking-widest border-b border-stone-100 pb-3">
          <span>{BEAUTY_PRODUCTS.length} Premium products</span>
          <span>SORT: FEATURED</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {BEAUTY_PRODUCTS.map(prod => (
            <div 
              key={prod.id} 
              onClick={() => setQuickViewProduct(prod)}
              className="group relative bg-white border border-stone-100 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between cursor-pointer animate-none"
            >
              
              {/* Heart floating click badge */}
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(prod.id, prod); }}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/94 hover:bg-white text-stone-500 hover:text-red-700 shadow-sm flex items-center justify-center transition"
              >
                <Heart size={13} className={favoriteStates[prod.id] ? 'fill-red-700 text-red-700' : ''} />
              </button>

              {/* Tag item */}
              {prod.tag && (
                <span className="absolute top-4 left-4 sm:top-8 sm:left-8 z-10 bg-amber-500 text-white text-[7px] sm:text-[8px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 uppercase rounded-full">
                  {prod.tag}
                </span>
              )}

              {/* Photo frame */}
              <div className="relative aspect-[4/5] bg-stone-50 rounded-xl sm:rounded-2xl overflow-hidden mb-2.5 sm:mb-4">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-101 duration-500 transition-all"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Description Details */}
              <div className="text-center px-1">
                <span className="text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.2em] font-medium text-stone-400 block uppercase mb-0.5 sm:mb-1 font-mono">
                  {prod.category}
                </span>
                <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-900 leading-tight line-clamp-1">
                  {prod.name}
                </h4>

                {/* Stars reviews rating aligned exactly as Image 2 screen */}
                <div className="flex justify-center mt-1 sm:mt-2 gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-amber-500 text-[9px] sm:text-[10px]">★</span>
                  ))}
                  <span className="text-[9px] sm:text-[10px] text-stone-400 font-mono ml-1">
                    ({prod.reviewsCount})
                  </span>
                </div>

                <div className="mt-2 sm:mt-3 flex justify-between items-center bg-stone-50 p-2 sm:p-2.5 rounded-xl">
                  <span className="text-xs font-semibold text-stone-800 font-mono">
                    ${prod.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToBag(prod); }}
                    className="p-1 px-2 sm:px-2.5 bg-stone-900 text-white hover:bg-amber-600 text-[8px] sm:text-[9px] font-bold rounded-lg uppercase tracking-wider transition"
                  >
                    ADD
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div id="beauty-load-more" className="flex justify-center mt-12">
          <button 
            onClick={() => alert("Loading more organic products.")}
            className="px-10 py-3.5 border border-stone-200 hover:border-stone-900 text-stone-500 hover:text-stone-950 text-xs font-semibold tracking-[0.25em] transition-all uppercase font-semibold"
          >
            LOAD MORE PRODUCTS
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
