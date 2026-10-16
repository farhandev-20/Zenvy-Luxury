import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Star, Check, Sparkles, AlertCircle, Shield, Truck } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToBag: (product: Product, selectedSize?: string, selectedMaterial?: string) => void;
  onAddToWishlist: (product: Product) => void;
}

const PREMIUM_MATERIALS = [
  { name: 'Pure Mulberry Silk', description: '6A Grade, 22 Momme natural protein weave', bonusPrice: 0 },
  { name: 'Hand-loomed Gold Brocade', description: 'Gilded metallic thread craftsmanship', bonusPrice: 45 },
  { name: 'Belgian Fine Linen', description: 'Long-staple breathable resort fibers', bonusPrice: -15 },
  { name: 'Organic Cashmere Blend', description: 'Combed soft undercoat luxury mix', bonusPrice: 60 }
];

const POPULAR_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
  onAddToBag,
  onAddToWishlist,
}: ProductQuickViewProps) {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedMatIdx, setSelectedMatIdx] = useState<number>(0);
  const [activeImageTab, setActiveImageTab] = useState<number>(0);
  const [wishlisted, setWishlisted] = useState<boolean>(false);
  const [addedMessage, setAddedMessage] = useState<boolean>(false);

  if (!product) return null;

  // Romanticized generated product descriptions if not present
  const resolvedDescription = product.description || 
    `Handmade in our clothing studio. Each thread represents traditional weaving techniques refined for modern style. Features breathable fibers and a comfortable fit.`;

  const finalPrice = product.price + PREMIUM_MATERIALS[selectedMatIdx].bonusPrice;

  // Alternate simulated premium detail views for different angles
  const alternateImages = [
    product.image,
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600', // detail face / style close-up
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600'  // lookbook styling
  ];

  const handleBagSubmit = () => {
    onAddToBag(product, selectedSize, PREMIUM_MATERIALS[selectedMatIdx].name);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      onClose();
    }, 1500);
  };

  const handleWishlistSubmit = () => {
    onAddToWishlist(product);
    setWishlisted(true);
    setTimeout(() => setWishlisted(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          
          {/* Backdrop blur overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative w-full max-w-5xl bg-[#fdfcfb] rounded-[2.5rem] overflow-y-auto md:overflow-hidden border border-stone-200 shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 max-h-[90vh] md:max-h-[85vh]"
          >
            {/* Elegant Floating Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 rounded-full bg-white/95 hover:bg-stone-100 text-stone-800 hover:text-stone-950 flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
              aria-label="Close detail modal"
            >
              <X size={18} />
            </button>

            {/* Left Side: Custom Gorgeous Gallery Split */}
            <div className="md:col-span-6 relative bg-stone-50 h-[260px] sm:h-[350px] md:h-full flex flex-col justify-between p-4 sm:p-6">
              
              {/* Product Badge / Promo Tag Overlay */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                <span className="text-[9px] tracking-[0.25em] bg-stone-900 text-stone-100 px-3 py-1.5 sm:px-4 sm:py-2 uppercase rounded-full font-bold shadow-md flex items-center gap-1">
                  <Sparkles size={11} className="text-amber-400 animate-pulse" />
                  FASHION STUDIO
                </span>
              </div>

              {/* Main Pristine Image Display */}
              <div className="w-full h-full relative flex items-center justify-center overflow-hidden rounded-[1.8rem] bg-[#f9f8f6] border border-stone-200/50 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImageTab}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    src={alternateImages[activeImageTab]} 
                    alt={product.name}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnail Selectors Row at Bottom (Visual Angles) */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex justify-center items-center gap-3">
                {alternateImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageTab(i)}
                    className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 bg-white transition-all shadow-sm ${
                      activeImageTab === i ? 'border-[#dca42b] scale-105 shadow-md' : 'border-transparent hover:border-stone-300'
                    }`}
                  >
                    <img src={img} alt="Angle review" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

            </div>

            {/* Right Side: Exquisite Craftsmanship Specifications & Options */}
            <div className="md:col-span-6 flex flex-col justify-between p-5 sm:p-10 md:overflow-y-auto h-auto md:h-full md:max-h-[85vh] bg-[#fdfcfb]">
              
              {/* Header Title Information */}
              <div>
                <span className="text-[10px] tracking-[0.35em] text-[#b45309] font-mono block mb-1 uppercase font-bold">
                  {product.category}
                </span>
                
                <h3 className="font-serif text-3xl font-light text-stone-900 leading-tight tracking-wide mb-2">
                  {product.name}
                </h3>

                {/* Stars / Premium Review Counter */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-500">
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" />
                    <Star size={13} fill="currentColor" className="opacity-80" />
                  </div>
                  <span className="font-mono text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                    {product.reviewsCount || 48} Customer Reviews
                  </span>
                </div>

                {/* Elegant Pricing block */}
                <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-stone-200/60">
                  <span className="text-2xl font-mono text-stone-900 font-semibold">
                    ${finalPrice.toLocaleString()}.00
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm font-mono text-stone-400 line-through">
                      ${product.originalPrice.toLocaleString()}.00
                    </span>
                  )}
                  {PREMIUM_MATERIALS[selectedMatIdx].bonusPrice > 0 && (
                    <span className="text-[10px] font-mono bg-amber-150 text-amber-800 px-2 py-0.5 rounded uppercase font-bold">
                      +${PREMIUM_MATERIALS[selectedMatIdx].bonusPrice} premium fabric
                    </span>
                  )}
                </div>

                {/* Description Narrative / Storytelling */}
                <div className="space-y-4 mb-6">
                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {resolvedDescription}
                  </p>
                </div>

                {/* Available Material Options Selection (MATCHING THE USER REQUEST FOR "MATERIAL OPTIONS") */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] tracking-wider uppercase font-bold text-stone-400 font-mono">
                      CHOOSE PREMIUM FABRIC:
                    </span>
                    <span className="text-[10px] text-stone-500 font-medium">
                      {PREMIUM_MATERIALS[selectedMatIdx].name}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PREMIUM_MATERIALS.map((mat, idx) => (
                      <button
                        key={mat.name}
                        onClick={() => setSelectedMatIdx(idx)}
                        className={`text-left p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                          selectedMatIdx === idx 
                            ? 'bg-amber-50/40 border-[#dca42b] shadow-sm' 
                            : 'bg-stone-50/50 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="text-[11px] font-bold text-stone-850 truncate leading-none">
                            {mat.name}
                          </span>
                          {selectedMatIdx === idx && (
                            <Check size={12} className="text-[#dca42b]" />
                          )}
                        </div>
                        <span className="text-[9px] text-stone-400 font-light mt-1 truncate">
                          {mat.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing selection */}
                <div className="space-y-2.5 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] tracking-wider uppercase font-bold text-stone-400 font-mono">
                      SELECT SIZE:
                    </span>
                    <button 
                      onClick={() => alert('Standard sizing: Fits true to size.')}
                      className="text-[9px] font-bold text-[#b45309] underline tracking-widest uppercase font-mono"
                    >
                      SIZE GUIDE
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {POPULAR_SIZES.map(sz => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-11 h-11 rounded-full text-xs font-mono font-bold transition-all border flex items-center justify-center ${
                          selectedSize === sz 
                            ? 'bg-stone-900 border-stone-900 text-stone-100 shadow' 
                            : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* CTAs at Bottom */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <div className="flex gap-3">
                  
                  {/* Main addition flow */}
                  <button
                    onClick={handleBagSubmit}
                    disabled={addedMessage}
                    className="flex-grow flex items-center justify-center gap-2 px-6 py-4 bg-[#f59e0b] hover:bg-[#d97706] disabled:bg-emerald-600 text-stone-950 disabled:text-white text-xs font-bold uppercase tracking-[0.25em] rounded-full transition-all duration-300 hover:scale-[1.02] active:translate-y-0.5 shadow-md"
                  >
                    {addedMessage ? (
                      <>
                        <Check size={14} />
                        <span>ADDED TO BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>ADD TO BAG</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist addition */}
                  <button
                    onClick={handleWishlistSubmit}
                    disabled={wishlisted}
                    className="flex-shrink-0 w-12 h-12 rounded-full border border-stone-200 hover:border-stone-400 text-stone-700 hover:text-red-500 hover:bg-stone-50 flex items-center justify-center transition-all hover:scale-105"
                    aria-label="Add to wishlist sanctuary"
                  >
                    <Heart size={16} fill={wishlisted ? "currentColor" : "none"} className={wishlisted ? "text-red-500" : ""} />
                  </button>

                </div>

                {/* Small Shipping note */}
                <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 font-mono uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Truck size={12} /> Free Shipping
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="flex items-center gap-1">
                    <Shield size={12} /> Secure Payment Guaranteed
                  </span>
                </div>
              </div>

            </div>

          </motion.div>

          {/* Direct feedback inline Toast */}
          <AnimatePresence>
            {wishlisted && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed bottom-10 z-50 text-[10px] font-bold text-white bg-slate-900 tracking-wider px-6 py-3 rounded-full shadow-lg border border-slate-800 uppercase"
              >
                Saved to wishlist.
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </AnimatePresence>
  );
}
