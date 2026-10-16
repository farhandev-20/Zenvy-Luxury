import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Eye, Star, Sliders, ChevronDown } from 'lucide-react';
import { Product } from '../types';
import { FASHION_PRODUCTS, SILK_GOLD_PRODUCTS } from '../data';
import HeroCarousel from './HeroCarousel';
import ProductQuickView from './ProductQuickView';

interface DepartmentFashionProps {
  onAddToBag: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
}

export default function DepartmentFashion({ onAddToBag, onAddToWishlist }: DepartmentFashionProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // States of Silk & Gold boutique section
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('recommended');
  const [showSortDropdown, setShowSortDropdown] = useState<boolean>(false);
  const [activeSizeFilter, setActiveSizeFilter] = useState<string | null>(null);
  const [activeColorFilter, setActiveColorFilter] = useState<string | null>(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState<number>(4);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  
  // Real active countdown timer logic matching the image "04 : 22 : 59"
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 59 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 4, minutes: 22, seconds: 59 }; // reset loop for preview consistency
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  // Secondary sub-navigation matching image
  const subCategories = [
    { label: 'ETHNIC', key: 'ethnic' },
    { label: 'WESTERN', key: 'western' },
    { label: 'DRESSES', key: 'dresses' },
    { label: 'BEAUTY', key: 'beauty' },
    { label: 'BAGS', key: 'bags' }
  ];

  // Trending custom curation types matching image 3
  const trendSubStyles = [
    { label: 'Kurti Sets', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300' },
    { label: 'Sarees', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=300' },
    { label: 'Heels', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=300' },
    { label: 'Handbags', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=300' }
  ];

  // Combine standard silk products + optional fashion ones for loaded states
  const baseCatalog = [...SILK_GOLD_PRODUCTS];
  const extendedCatalog = [
    ...SILK_GOLD_PRODUCTS,
    {
      id: 's-ext-1',
      name: 'Resort Slide',
      category: 'ZENVY ESSENTIALS',
      price: 320,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600',
      tag: 'NEW ARRIVAL',
      subCategory: 'western'
    },
    {
      id: 's-ext-2',
      name: 'Ambre Noir EDP',
      category: 'BEAUTY',
      price: 195,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600',
      subCategory: 'beauty'
    },
    {
      id: 's-ext-3',
      name: 'Oversized Silk Shell Frame',
      category: 'LIMITED',
      price: 450,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
      tag: 'LIMITED EDITION',
      subCategory: 'western'
    },
    {
      id: 's-ext-4',
      name: 'Champagne Linen Trench',
      category: 'ZENVY OUTWEAR',
      price: 720,
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600',
      tag: 'EXCLUSIVE',
      subCategory: 'western'
    }
  ];

  // Dynamic Filtering based on active subcategories & state
  const getFilteredProducts = () => {
    let list = [...extendedCatalog];
    
    if (activeSubCategory !== 'all') {
      list = list.filter(p => p.subCategory === activeSubCategory);
    }

    if (activeColorFilter) {
      // simulated color filter
    }

    // Sort options
    if (sortOption === 'low-to-high') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-to-low') {
      list.sort((a, b) => b.price - a.price);
    }
    
    return list;
  };

  const processedProducts = getFilteredProducts();

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleItemsCount(prev => prev + 4);
      setIsLoadingMore(false);
    }, 800);
  };

  const circleItems = [
    { name: 'Resort Slide', price: 320, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=300' },
    { name: 'Ambre Noir EDP', price: 195, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300' },
    { name: 'Oversized Frame', price: 450, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=300' },
    { name: 'Supima Tee', price: 85, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300' },
  ];

  return (
    <div id="fashion-dept-root" className="w-full space-y-16 pb-20 text-stone-900">
      
      {/* 1. SECONDARY CATEGORY ROW - MATCHING IMAGE 3 */}
      <div id="fashion-secondary-categories" className="w-full border-b border-stone-200/60 pb-4 pt-1">
        <div className="flex justify-center items-center gap-6 md:gap-12 overflow-x-auto px-4 select-none scrollbar-none">
          <button
            onClick={() => {
              setActiveSubCategory('all');
              setVisibleItemsCount(4);
            }}
            className={`text-xs font-semibold tracking-[0.2em] transition-all relative py-2 ${
              activeSubCategory === 'all' 
                ? 'text-[#dca42b]' 
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            ALL IN STORE
            {activeSubCategory === 'all' && (
              <motion.div layoutId="subcat-active-line" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#dca42b]" />
            )}
          </button>
          {subCategories.map(cat => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveSubCategory(cat.key);
                setVisibleItemsCount(4);
              }}
              className={`text-xs font-semibold tracking-[0.2em] transition-all relative py-2 uppercase ${
                activeSubCategory === cat.key 
                  ? 'text-[#dca42b]' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              {cat.label}
              {activeSubCategory === cat.key && (
                <motion.div layoutId="subcat-active-line" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#dca42b]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. PREMIUM FULL-WIDTH HERO CAROUSEL FOR FEATURED ARCHIVES */}
      <HeroCarousel 
        onSelectionAction={(actionType) => {
          if (actionType === 'silk_gold') {
            setActiveSubCategory('all');
            setVisibleItemsCount(8);
            const anchor = document.getElementById('styles-curation-section');
            if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
          } else if (actionType === 'resort') {
            setActiveSubCategory('western');
            setVisibleItemsCount(8);
            const anchor = document.getElementById('boutique-curated-filter-row');
            if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
          } else if (actionType === 'soiree') {
            setActiveSubCategory('ethnic');
            setVisibleItemsCount(8);
            const anchor = document.getElementById('boutique-curated-filter-row');
            if (anchor) anchor.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 3. TRENDING STYLES / CURATION BLOCK - MATCHING IMAGE 3 */}
      <div id="styles-curation-section" className="space-y-8">
        <div className="flex justify-between items-end border-b border-stone-100 pb-3">
          <div>
            <span className="text-[10px] tracking-[0.35em] text-[#b45309] block mb-1 font-mono font-bold uppercase">
              STYLING
            </span>
            <h3 className="font-serif text-3xl font-medium tracking-tight text-stone-950">
              Trending Styles
            </h3>
          </div>
          <button 
            onClick={() => alert("Showing all high curlies.")}
            className="text-xs font-mono font-bold text-stone-600 hover:text-[#b45309] transition underline uppercase tracking-wider"
          >
            VIEW ALL
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trendSubStyles.map((item, index) => (
            <div 
              key={index}
              onClick={() => {
                setActiveSubCategory(item.label.toLowerCase().includes('kurti') ? 'ethnic' : item.label.toLowerCase().includes('saree') ? 'ethnic' : item.label.toLowerCase().includes('heel') ? 'western' : 'bags');
                alert(`Filters updated. Exploring ${item.label} trend!`);
              }}
              className="group cursor-pointer flex flex-col items-center bg-white border border-stone-100 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-stone-50">
                <img 
                  src={item.image} 
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                />
              </div>
              <h4 className="font-serif text-base font-semibold tracking-tight text-stone-900 group-hover:text-[#b45309] transition-colors">
                {item.label}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* 4. EXQUISITE INTERACTIVE FILTER ROW - MATCHING IMAGE 3 */}
      <div id="boutique-curated-filter-row" className="border-t border-stone-200/80 pt-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          
          {/* Leftside action filters */}
          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => alert("Tailor your visual fit details.")}
              className="flex items-center gap-2 px-5 py-2.5 bg-stone-50 border border-stone-200 rounded-full text-xs font-semibold uppercase tracking-wider text-stone-800 hover:bg-stone-100/80 transition-all select-none"
            >
              <Sliders size={13} className="text-stone-500" />
              <span>FILTER</span>
            </button>

            {/* Size pill selection */}
            <div className="relative">
              <button 
                onClick={() => {
                  setActiveSizeFilter(activeSizeFilter ? null : 'M');
                  alert("Size constraint applied (M).");
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                  activeSizeFilter ? 'bg-[#b45309] text-white border-[#b45309]' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                }`}
              >
                SIZE {activeSizeFilter && ': M'}
              </button>
            </div>

            {/* Simulated brand options */}
            <button 
              onClick={() => alert("Brand selection dialog Opened.")}
              className="px-5 py-2.5 bg-white border border-stone-200 rounded-full text-xs font-semibold tracking-wider text-stone-600 hover:border-stone-400 transition"
            >
              BRAND
            </button>
            
            <button 
              onClick={() => alert("Price filtering overlay Opened.")}
              className="px-5 py-2.5 bg-white border border-stone-200 rounded-full text-[#dca42b] border-[#e7dbcb] text-xs font-semibold tracking-wider hover:bg-amber-50/50 transition"
            >
              PRICE
            </button>

            <button 
              onClick={() => {
                setActiveColorFilter(activeColorFilter ? null : 'gold');
                alert("Gold palette selected!");
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                activeColorFilter ? 'bg-amber-800 text-white border-amber-800' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              }`}
            >
              COLOR {activeColorFilter && ': GOLD'}
            </button>
          </div>

          {/* Right side custom sort dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 duration-200 text-xs font-semibold tracking-widest uppercase border border-stone-200 rounded-full px-5 py-2.5 bg-white shadow-sm"
            >
              <span>SORT BY: {sortOption === 'recommended' ? 'RECOMMENDED' : sortOption === 'low-to-high' ? 'PRICE: LOW TO HIGH' : 'PRICE: HIGH TO LOW'}</span>
              <ChevronDown size={14} className={`transform transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {showSortDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 top-12 z-20 w-56 bg-white border border-stone-200 rounded-xl overflow-hidden shadow-lg"
                >
                  <button 
                    onClick={() => { setSortOption('recommended'); setShowSortDropdown(false); }}
                    className="w-full text-left px-4 py-3 text-xs tracking-wider uppercase text-stone-600 hover:bg-amber-50/60 font-semibold"
                  >
                    Recommended
                  </button>
                  <button 
                    onClick={() => { setSortOption('low-to-high'); setShowSortDropdown(false); }}
                    className="w-full text-left px-4 py-3 text-xs tracking-wider uppercase text-stone-600 hover:bg-amber-50/60 font-semibold"
                  >
                    Price: Low to High
                  </button>
                  <button 
                    onClick={() => { setSortOption('high-to-low'); setShowSortDropdown(false); }}
                    className="w-full text-left px-4 py-3 text-xs tracking-wider uppercase text-stone-600 hover:bg-amber-50/60 font-semibold"
                  >
                    Price: High to Low
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 5. GORGEOUS PREMIUM CATALOUGE GRID - MATCHING IMAGE 3 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {processedProducts.slice(0, visibleItemsCount).map((prod, idx) => (
            <motion.div 
              key={prod.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ 
                duration: 0.7, 
                ease: [0.16, 1, 0.3, 1], 
                delay: (idx % 4) * 0.08 
              }}
              onClick={() => setQuickViewProduct(prod)}
              className="group relative flex flex-col justify-between cursor-pointer"
            >
              
              {/* Overlay labels at bottom-left corner of visual frame */}
              {prod.tag && (
                <span className={`absolute bottom-24 left-3 z-10 text-[8px] font-bold tracking-widest px-3 py-1.5 uppercase rounded-full shadow-sm text-stone-900 ${
                  prod.tag.includes('LIMITED') 
                    ? 'bg-[#fed7aa]' 
                    : 'bg-amber-400'
                }`}>
                  {prod.tag}
                </span>
              )}

              {/* Action photo frame */}
              <div className="relative aspect-[4/5] bg-stone-50 rounded-[1.5rem] overflow-hidden mb-4 border border-stone-100 shadow-sm">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-[1.03] duration-500 transition-transform"
                />
                
                {/* Heart Button Overlay - TOP RIGHT - White round circle layout with fine shadow */}
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToWishlist(prod); }}
                  className="absolute top-3.5 right-3.5 z-20 p-2 bg-white rounded-full text-stone-700 hover:text-red-500 transition shadow-sm hover:scale-105"
                >
                  <Heart size={14} />
                </button>

                {/* Shopping additions drawer bar on hover */}
                <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 duration-300 transition-opacity flex justify-center items-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToBag(prod); }}
                    className="px-6 py-2.5 bg-white text-stone-950 font-bold text-xs tracking-wide uppercase rounded-full shadow hover:scale-103 hover:bg-stone-50 z-20"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>

              {/* Sub-label information details */}
              <div className="text-center">
                <span className="text-[9px] tracking-[0.2em] font-medium text-stone-400 block uppercase mb-1 font-mono">
                  {prod.category}
                </span>
                <h4 className="font-serif text-base font-semibold text-stone-900 leading-tight">
                  {prod.name}
                </h4>
                <span className="text-xs font-mono text-stone-700 block mt-1.5 font-bold">
                  ${prod.price.toLocaleString()}.00
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic LOAD MORE button - MATCHING IMAGE 3 */}
        {visibleItemsCount < processedProducts.length && (
          <div className="flex justify-center mt-12 pb-6">
            <button 
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="relative px-12 py-3.5 bg-transparent border-t border-b hover:bg-stone-50 border-stone-300 text-stone-850 hover:text-stone-950 font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center gap-3"
            >
              {isLoadingMore ? (
                <>
                  <div className="w-3 h-3 border-2 border-[#dca42b] border-t-transparent rounded-full animate-spin" />
                  <span>LOADING...</span>
                </>
              ) : (
                'LOAD MORE'
              )}
            </button>
          </div>
        )}
      </div>

      {/* 5. GENTLE TRANSITION TO EXISTING FLASH SALE */}
      <div id="fashion-flash-sale" className="bg-[#fdfcfb] border border-stone-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-stone-100 pb-8 mb-10">
          <div>
            <h3 className="font-serif text-3xl font-medium text-stone-950">
              Flash Sale
            </h3>
            <p className="text-xs text-stone-500 font-light mt-1.5">
              Limited time luxury offers on curated pieces.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-amber-500 text-stone-950 px-6 py-3 rounded-full shadow-sm text-xs font-bold tracking-[0.2em]">
            <span className="uppercase text-[9px]">ENDS IN:</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span>{formatNum(timeLeft.hours)}</span>
              <span className="animate-pulse">:</span>
              <span>{formatNum(timeLeft.minutes)}</span>
              <span className="animate-pulse">:</span>
              <span>{formatNum(timeLeft.seconds)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {FASHION_PRODUCTS.slice(0, 4).map((prod, idx) => (
            <motion.div 
              key={prod.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              onClick={() => setQuickViewProduct(prod)}
              className="group relative flex flex-col justify-between cursor-pointer"
            >
              
              <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-800 text-[9px] font-semibold text-white tracking-widest rounded-full font-mono">
                {prod.tag}
              </span>

              <div className="relative aspect-[4/5] bg-stone-50 rounded-2xl overflow-hidden mb-4">
                <img 
                  src={prod.image} 
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-103 duration-700 transition"
                  referrerPolicy="no-referrer"
                />
                
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

              <div className="text-center">
                <span className="text-[9px] tracking-[0.2em] font-medium text-stone-400 block uppercase mb-1">
                  {prod.category}
                </span>
                <h4 className="font-serif text-base font-medium tracking-tight text-stone-900 leading-tight">
                  {prod.name}
                </h4>
                <div className="mt-2.5 flex items-center justify-center gap-2">
                  <span className="text-xs font-semibold font-mono text-stone-800">
                    ${prod.price.toLocaleString()}
                  </span>
                  {prod.originalPrice && (
                    <span className="text-xs font-mono line-through text-stone-400">
                      ${prod.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. "Trending Now" item series */}
      <div id="fashion-trending">
        <div className="flex justify-between items-baseline border-b border-stone-100 pb-4 mb-10">
          <h3 className="font-serif text-3xl font-medium tracking-tight text-stone-950">
            Trending Now
          </h3>
          <span className="text-[10px] tracking-widest font-semibold uppercase text-stone-400 hover:text-stone-820 cursor-pointer">
            VIEW ALL
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {FASHION_PRODUCTS.slice(4).map((prod, idx) => (
            <motion.div 
              key={prod.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
              onClick={() => setQuickViewProduct(prod)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              
              <div className="relative aspect-[3/4] bg-stone-50 rounded-2xl overflow-hidden mb-4">
                <img 
                  src={prod.image} 
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-103 duration-500 transition-transform"
                  referrerPolicy="no-referrer"
                />
                
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

              <div>
                <h4 className="font-serif text-base font-semibold tracking-tight text-stone-900 leading-tight">
                  {prod.name}
                </h4>
                <div className="flex justify-between items-center mt-1 text-xs">
                  <span className="font-mono text-stone-500">
                    ${prod.price.toLocaleString()}.05
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 7. "Curated For You" circular row */}
      <div id="fashion-curated" className="border-t border-stone-100 pt-16">
        <h3 className="font-serif text-3xl font-medium tracking-tight text-stone-950 mb-10 text-center">
          Selected for You
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {circleItems.map((prod, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
              onClick={() => onAddToBag({ id: `fc-c-${index}`, name: prod.name, price: prod.price, image: prod.image, category: 'SELECTED' })}
              className="flex flex-col items-center text-center cursor-pointer group"
            >
              <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden bg-stone-100 border border-stone-200 shadow-sm group-hover:shadow-md duration-500 transition-all mb-4 flex-shrink-0">
                <img 
                  src={prod.image} 
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 duration-750 transition"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="font-serif text-sm font-semibold tracking-tight text-stone-900">
                {prod.name}
              </h4>
              <span className="text-xs font-mono text-amber-700 block mt-1">
                ${prod.price}.00
              </span>
            </motion.div>
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
