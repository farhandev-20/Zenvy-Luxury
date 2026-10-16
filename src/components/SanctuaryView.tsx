import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Compass, Share2, Copy, Check, Mail, Send, Sparkles, ExternalLink } from 'lucide-react';
import { Product } from '../types';

interface SanctuaryViewProps {
  sanctuaryItems: Product[];
  onRemoveItem: (id: string) => void;
  onMoveToCart: (product: Product) => void;
  onAddRecommendation: (product: Product) => void;
}

export default function SanctuaryView({
  sanctuaryItems,
  onRemoveItem,
  onMoveToCart,
  onAddRecommendation,
}: SanctuaryViewProps) {

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [curatorName, setCuratorName] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ids = sanctuaryItems.map(item => item.id).join(',');
      const curatorQuery = curatorName ? `&curator=${encodeURIComponent(curatorName)}` : '';
      const url = `${window.location.origin}${window.location.pathname}?shared=${encodeURIComponent(ids)}${curatorQuery}#sanctuary`;
      setShareUrl(url);
    }
  }, [sanctuaryItems, curatorName]);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      // Fallback
      alert("Sharing link generated: " + shareUrl);
    }
  };

  const handleSimulatedShare = (platform: string) => {
    setSelectedChannel(platform);
    setTimeout(() => {
      setSelectedChannel(null);
      alert(`Successfully shared your curated Sanctuary collection via ${platform}!`);
    }, 1800);
  };

  const recommendations = [
    {
      id: 'rec-1',
      name: 'Cashmere Wrap',
      category: 'ACCESSORY',
      price: 295,
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'rec-2',
      name: 'Essence of ZENVY',
      category: 'FRAGRANCE',
      price: 180,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'rec-3',
      name: 'Pearl Rivage Necklace',
      category: 'JEWELRY',
      price: 550,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=300'
    }
  ];

  const recentlyViewed = [
    {
      id: 'rv-1',
      name: 'Essential Tee',
      price: 120,
      category: 'ESSENTIAL TEE',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'rv-2',
      name: 'Solaris Frames',
      price: 340,
      category: 'SOLARIS FRAMES',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=300'
    }
  ];

  return (
    <div id="sanctuary-view-outer" className="w-full min-h-screen bg-[#faf8f6] py-8 sm:py-16 px-4 sm:px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Wishlist Editorial Heading */}
        <div id="sanctuary-header-block" className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <span className="text-[9px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.45em] text-[#dca42b] font-mono block mb-2 sm:mb-3 uppercase font-bold">
            saved selection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 tracking-wide uppercase">
            Your Wishlist
          </h2>
          <p className="text-xs text-stone-500 font-light leading-relaxed mt-2 sm:mt-4">
            Items you have saved for later. A collection of your favorite styles.
          </p>
          
          {sanctuaryItems.length > 0 && (
            <div className="mt-5 sm:mt-8 flex justify-center">
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="px-5 sm:px-6 py-2 sm:py-2.5 bg-stone-900 text-white hover:bg-amber-700 text-[8px] sm:text-[9px] font-bold tracking-[0.2em] uppercase transition flex items-center gap-2 rounded-full shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                <PartyPopper size={12} className="animate-bounce" />
                <span>SHARE WISHLIST</span>
              </button>
            </div>
          )}
        </div>

        {sanctuaryItems.length === 0 ? (
          /* Empty sanctuary state */
          <div className="py-16 sm:py-24 text-center border border-dashed border-stone-250 rounded-2xl sm:rounded-[2.5rem] bg-white max-w-xl mx-auto px-6">
            <Sparkles className="mx-auto text-amber-600/20 mb-4 animate-spin" size={36} />
            <h3 className="font-serif text-lg sm:text-xl font-light text-stone-800">Your wishlist is empty</h3>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed max-w-xs mx-auto">
              Fill it with clothes and accessories that you like.
            </p>
          </div>
        ) : (
          /* Grid list exactly styled as Image 10 */
          <div id="sanctuary-items-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-16 sm:mb-20 animate-fade-in">
            {sanctuaryItems.map((prod) => (
              <div 
                key={prod.id} 
                className="group relative bg-white border border-stone-100 rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Specific removal X badge in corner */}
                <button
                  onClick={() => onRemoveItem(prod.id)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                  aria-label="Remove from wishlist"
                >
                  <X size={13} />
                </button>

                {/* Tag items if present */}
                {prod.originalPrice && (
                  <span className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-500 text-[8px] sm:text-[9px] font-semibold text-white uppercase tracking-wider rounded-full">
                    -{Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}%
                  </span>
                )}
                {!prod.originalPrice && prod.id === 'sanct-4' && (
                  <span className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 px-2 sm:px-3 py-0.5 sm:py-1 bg-stone-900 text-[8px] sm:text-[9px] font-semibold text-white uppercase tracking-wider rounded-full">
                    LIMITED
                  </span>
                )}

                {/* Photo frame */}
                <div className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 mb-2.5 sm:mb-4">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="w-full h-full object-cover group-hover:scale-102 duration-700 transition-transform"
                  />
                </div>

                {/* Item Details */}
                <div className="text-center flex-grow flex flex-col justify-between items-center px-1">
                  <div className="mb-2 sm:mb-4">
                    <span className="text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] text-stone-400 font-mono block uppercase mb-0.5 sm:mb-1">
                      {prod.category}
                    </span>
                    <h3 className="font-serif text-sm sm:text-base font-medium tracking-tight text-stone-900 max-w-[180px] leading-tight line-clamp-1">
                      {prod.name}
                    </h3>
                    
                    {/* Star feedback aligned with Image 10 screen */}
                    <div className="flex gap-0.5 justify-center mt-1.5 sm:mt-2.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className="text-amber-500 text-[9px] sm:text-[10px]">★</span>
                      ))}
                    </div>

                    <div className="mt-1.5 sm:mt-2.5">
                      <span className="font-serif text-xs sm:text-sm font-semibold text-stone-850">
                        ${prod.price.toLocaleString()}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-stone-400 font-serif line-through text-[10px] sm:text-xs ml-1.5 sm:ml-2">
                          ${prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Golden MOVE TO CART button */}
                  <button
                    onClick={() => onMoveToCart(prod)}
                    className="w-full py-2 sm:py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded-full transition-colors active:translate-y-0.5 inline-block"
                  >
                    MOVE TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommended For You Section */}
        <div id="sanctuary-recommendations" className="border-t border-stone-200/60 pt-16 mb-20">
          <div className="flex justify-between items-baseline mb-8">
            <h3 className="font-serif text-2.5xl font-medium tracking-tight text-stone-900">
              Recommended For You
            </h3>
            <span className="text-[10px] tracking-widest font-semibold uppercase text-stone-400 border-b border-transparent hover:border-stone-400 cursor-pointer">
              Explore All Suggestions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center p-4 bg-white border border-stone-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-stone-50 flex-shrink-0 mr-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] tracking-widest text-[#dca42b] uppercase font-semibold">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-base font-semibold tracking-tight text-stone-900 leading-none mt-1">
                      {item.name}
                    </h4>
                    <span className="text-xs font-mono text-stone-500 block mt-1.5">
                      ${item.price}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => onAddRecommendation(item)}
                    className="text-[9px] tracking-widest font-bold text-stone-900 hover:text-amber-800 transition-colors uppercase self-start mt-3 flex items-center gap-1 border-b border-stone-800 pb-0.5"
                  >
                    QUICK ADD +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed horizontal gallery block */}
        <div id="recently-viewed" className="border-t border-stone-100 pt-16">
          <h3 className="font-serif text-2xl font-medium tracking-tight text-stone-900 mb-8 text-center md:text-left">
            Recently Viewed
          </h3>

          <div className="flex flex-col sm:flex-row gap-8 justify-center md:justify-start items-center">
            {recentlyViewed.map((item) => (
              <div key={item.id} className="text-center group cursor-pointer max-w-[200px]">
                <div className="w-40 h-40 rounded-full overflow-hidden bg-stone-150 border border-stone-100 shadow-sm group-hover:shadow-md duration-500 transition-all mb-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 duration-750 transition-all"
                  />
                </div>
                <span className="text-[9px] tracking-[0.25em] text-stone-400 font-mono block uppercase mb-1">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-stone-700 block text-center">
                  ${item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Social Sharing Modal Backdrop */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Matte Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShareModalOpen(false)}
              className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
            />

            {/* Modal Body Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden border border-stone-200/80 shadow-2xl z-10 flex flex-col p-6 sm:p-10 select-none text-stone-950"
            >
              {/* Close Button top corner */}
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center transition"
              >
                <X size={14} />
              </button>

              {/* Title Header area */}
              <div className="text-center mb-6">
                <span className="text-[9px] tracking-[0.3em] text-[#dca42b] font-mono block mb-2 uppercase font-bold">
                  COUTURE EXCLUSIVE
                </span>
                <h3 className="font-serif text-2xl font-light text-stone-900">
                  Share Your Wishlist
                </h3>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Share your saved wishlist items with a custom sender name.
                </p>
              </div>

              {/* Input for Curator Name */}
              <div className="space-y-2 mb-6">
                <label className="block text-[10px] font-bold text-stone-400 uppercase font-mono tracking-wider">
                  YOUR SENDER NAME (OPTIONAL):
                </label>
                <div className="relative">
                  <input 
                    type="text"
                    value={curatorName}
                    onChange={(e) => setCuratorName(e.target.value)}
                    placeholder="Enter your name... (e.g., Lady Farhan)"
                    className="w-full px-5 py-3 rounded-full bg-stone-50 border border-stone-200 focus:border-stone-400 focus:bg-white text-xs text-stone-850 font-medium placeholder-stone-400 outline-none transition-all font-mono"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-[#dca42b]">
                    <Sparkles size={13} className="animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Unique copy path block */}
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] tracking-wider uppercase font-bold text-stone-400 font-mono">YOUR UNIQUE INVITE LINK:</span>
                  {copied && <span className="text-amber-700 text-[8px] tracking-widest font-mono font-bold animate-pulse">COPIED TO CLIPBOARD</span>}
                </div>
                <div className="flex gap-2">
                  <div className="flex-grow px-5 py-3 rounded-full bg-stone-50 border border-stone-150 text-[10px] text-stone-600 font-mono truncate select-all flex items-center">
                    {shareUrl || 'Generating secret ink invite...'}
                  </div>
                  <button 
                    onClick={handleCopyLink}
                    className="flex-shrink-0 w-11 h-11 rounded-full bg-[#dca42b] hover:bg-[#c39121] text-white flex items-center justify-center transition shadow-md hover:scale-105 active:scale-95"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Included list items scroll area (small thumbnail list) */}
              <div className="mb-6">
                <span className="text-[9px] tracking-wider uppercase font-bold text-stone-400 font-mono block mb-2">
                  ITEMS INCLUDED ({sanctuaryItems.length}):
                </span>
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                  {sanctuaryItems.map(item => (
                    <div key={item.id} className="flex-shrink-0 flex items-center gap-2 bg-stone-50 border border-stone-100 rounded-full pl-2 pr-4 py-1.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-stone-200">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="max-w-[100px]">
                        <p className="text-[9px] text-stone-855 font-bold truncate leading-none uppercase">{item.name}</p>
                        <p className="text-[8px] text-stone-400 font-mono leading-none mt-0.5">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulation social media options layout */}
              <div>
                <span className="text-[9px] tracking-wider uppercase font-bold text-stone-400 font-mono block mb-3 text-center">
                  OR SELECT ATELIER CHANNEL DIRECT:
                </span>
                
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSimulatedShare('pinterest')}
                    disabled={selectedChannel !== null}
                    className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-stone-100 bg-stone-50 hover:bg-stone-100 transition group hover:scale-102"
                  >
                    <span className="text-stone-700 bg-amber-100 p-1.5 rounded-full mb-1 text-xs group-hover:scale-110 duration-200 transition">📌</span>
                    <span className="text-[9px] font-bold text-stone-700 font-mono tracking-wider">PINTEREST</span>
                  </button>

                  <button
                    onClick={() => handleSimulatedShare('vogue_ledg')}
                    disabled={selectedChannel !== null}
                    className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-stone-100 bg-stone-50 hover:bg-neutral-100 transition group hover:scale-102"
                  >
                    <span className="text-stone-750 bg-stone-200 p-1.5 rounded-full mb-1 text-xs group-hover:scale-110 duration-200 transition">📖</span>
                    <span className="text-[9px] font-bold text-stone-700 font-mono tracking-wider">VOGUE</span>
                  </button>

                  <button
                    onClick={() => handleSimulatedShare('whatsapp')}
                    disabled={selectedChannel !== null}
                    className="flex flex-col items-center justify-center p-3.5 rounded-2xl border border-stone-100 bg-stone-50 hover:bg-emerald-50 transition group hover:scale-102"
                  >
                    <span className="text-emerald-600 bg-emerald-100 p-1.5 rounded-full mb-1 text-xs group-hover:scale-110 duration-150 transition">💬</span>
                    <span className="text-[9px] font-bold text-stone-700 font-mono tracking-wider">WHATSAPP</span>
                  </button>
                </div>
                
                {/* Simulated message sending indicator */}
                <AnimatePresence>
                  {selectedChannel && (
                    <motion.div 
                      key="transmitting-toast"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="mt-4 p-3 bg-amber-50/50 rounded-xl border border-amber-200/40 text-center flex items-center justify-center gap-2.5 text-[10px] text-amber-900 font-mono"
                    >
                      <div className="w-3.5 h-3.5 border-2 border-[#dca42b] border-t-transparent rounded-full animate-spin" />
                      <span>SHARING YOUR WISHLIST...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
