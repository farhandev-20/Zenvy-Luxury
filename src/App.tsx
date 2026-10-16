import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Heart, User, Search, Menu, X, ArrowRight, 
  Sparkles, Gift, Check, Trash2, BellRing
} from 'lucide-react';

import { Product, CartItem, WishlistItem, UserProfile, Department, ScreenMode } from './types';
import { 
  FASHION_PRODUCTS, ACCESSORIES_PRODUCTS, BEAUTY_PRODUCTS, 
  KIDS_PRODUCTS, SILK_GOLD_PRODUCTS, DEFAULT_CART_ITEMS, 
  SANCTUARY_ITEMS, INITIAL_PROFILE 
} from './data';

// Component Imports
import SplashView from './components/SplashView';
import OnboardingView from './components/OnboardingView';
import LoginView from './components/LoginView';
import ShoppingBagView from './components/ShoppingBagView';
import SanctuaryView from './components/SanctuaryView';
import ProfileView from './components/ProfileView';
import PaymentView from './components/PaymentView';
import Footer from './components/Footer';

// Department Components
import DepartmentFashion from './components/DepartmentFashion';
import DepartmentAccessories from './components/DepartmentAccessories';
import DepartmentBeauty from './components/DepartmentBeauty';
import DepartmentKids from './components/DepartmentKids';
import DepartmentSilkGold from './components/DepartmentSilkGold';

export default function App() {
  // Main states
  const [screenMode, setScreenMode] = useState<ScreenMode>('splash');
  const [activeDepartment, setActiveDepartment] = useState<Department>('fashion');
  
  // Real active state containers pre-populated to represent exactly the original screens!
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_STATE());
  const [wishlistItems, setWishlistItems] = useState<Product[]>(SANCTUARY_ITEMS);
  const [userProfile, setUserProfile] = useState<UserProfile>(INITIAL_PROFILE);
  
  // Alert/Toast notifications
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'info' | 'wish' } | null>(null);
  
  // Auxiliary UI controls
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [curatorName, setCuratorName] = useState<string | null>(null);
  const [checkoutTotals, setCheckoutTotals] = useState<{
    finalTotal: number;
    deliveryCost: number;
    tax: number;
    discount: number;
  } | null>(null);

  function INITIAL_CART_STATE() {
    return [
      {
        product: {
          id: 'cart-1',
          name: 'Ribbed Knit Dress',
          category: 'GOLD',
          price: 240,
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=300',
        },
        quantity: 1,
        selectedSize: 'M'
      },
      {
        product: {
          id: 'cart-2',
          name: 'Croco-Embossed Bag',
          category: 'TAN',
          price: 850,
          image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=300',
        },
        quantity: 1,
        selectedSize: 'One Size'
      }
    ];
  }

  // Toast helper
  const triggerToast = (msg: string, type: 'success' | 'info' | 'wish' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Cart operations
  const handleAddToBag = (product: Product, size: string = 'M') => {
    setCartItems(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        triggerToast(`Increased quantity of ${product.name} in your bag`, 'info');
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      triggerToast(`Added ${product.name} to your Shopping Bag`, 'success');
      return [...prev, { product, quantity: 1, selectedSize: size }];
    });
  };

  const handleUpdateCartQty = (id: string, newQty: number) => {
    setCartItems(prev => prev.map(item => 
      item.product.id === id ? { ...item, quantity: newQty } : item
    ));
  };

  const handleRemoveCartItem = (id: string) => {
    const item = cartItems.find(i => i.product.id === id);
    if (item) {
      triggerToast(`Removed ${item.product.name} from your Shopping Bag`, 'info');
    }
    setCartItems(prev => prev.filter(item => item.product.id !== id));
  };

  const handleSaveForLater = (product: Product) => {
    // Add to wishlist and remove from cart
    handleAddToWishlist(product);
    setCartItems(prev => prev.filter(item => item.product.id !== product.id));
  };

  // Wishlist operations
  const handleAddToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        triggerToast(`${product.name} is already in your Sanctuary`, 'info');
        return prev;
      }
      triggerToast(`Saved ${product.name} to Your Sanctuary`, 'wish');
      return [...prev, product];
    });
  };

  const handleRemoveWishItem = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    triggerToast('Item removed from Sanctuary', 'info');
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToBag(product);
    setWishlistItems(prev => prev.filter(item => item.id !== product.id));
  };

  // Search trigger list
  const allProductsCombined = [
    ...FASHION_PRODUCTS,
    ...ACCESSORIES_PRODUCTS,
    ...BEAUTY_PRODUCTS,
    ...KIDS_PRODUCTS,
    ...SILK_GOLD_PRODUCTS
  ];

  const searchResults = searchQuery.trim() === ''
    ? []
    : allProductsCombined.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sharedString = params.get('shared');
      const curator = params.get('curator');
      
      if (sharedString) {
        const decodedShared = decodeURIComponent(sharedString);
        setCuratorName(curator || 'Curator Elite');
        const ids = decodedShared.split(',');
        
        const matchedProducts = allProductsCombined.filter(p => ids.includes(p.id));
        if (matchedProducts.length > 0) {
          setWishlistItems(prev => {
            const list = [...prev];
            matchedProducts.forEach(prod => {
              if (!list.some(existing => existing.id === prod.id)) {
                list.unshift(prod);
              }
            });
            return list;
          });
          
          triggerToast(`Loaded wishlist from ${curator || 'Shared Link'}!`, 'wish');
          setScreenMode('wishlist');
        }
      }
    }
  }, []);

  return (
    <div id="zenvy-app-root" className="min-h-screen flex flex-col justify-between bg-[#faf8f6] font-sans antialiased text-stone-900 relative">
      
      {/* ⚠️ Premium Alert Toast message popup overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-55%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border text-xs font-semibold uppercase tracking-wider select-none ${
              toast.type === 'success' ? 'bg-amber-900 border-amber-800 text-white' :
              toast.type === 'wish' ? 'bg-[#dca42b] border-[#c39121] text-white' :
              'bg-stone-900 border-stone-800 text-white'
            }`}
          >
            <Sparkles size={14} className="animate-spin text-amber-200" />
            <span>{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary dynamic screen rendering selector */}
      <AnimatePresence mode="wait">
        {screenMode === 'splash' ? (
          <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SplashView onDiscover={() => setScreenMode('onboarding')} />
          </motion.div>
        ) : screenMode === 'onboarding' ? (
          <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <OnboardingView 
              onGetStarted={() => setScreenMode('login')} 
              onLoginClick={() => setScreenMode('login')} 
            />
          </motion.div>
        ) : screenMode === 'login' ? (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoginView 
              onSuccess={() => {
                triggerToast('Ascended as Julianne V. Smith', 'success');
                setScreenMode('store');
              }}
              onBack={() => setScreenMode('onboarding')}
            />
          </motion.div>
        ) : (
          /* Main Retail Storefront mode */
          <motion.div 
            key="store" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex-grow flex flex-col justify-between"
          >

            {/* Main Luxury Header Bar */}
            <header id="store-nav-header" className="relative w-full bg-white border-b border-stone-100 sticky top-0 z-40 px-3 sm:px-6 md:px-12 flex justify-between items-center h-16 sm:h-20 md:h-24 shadow-sm">
              
              {/* Left Elegant Spacer for symmetrical geometry */}
              <div className="w-10 sm:w-20 hidden md:block" />

              {/* Brand Center Display - Absolutely centered ZENVY name */}
              <div 
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center cursor-pointer select-none z-10" 
                onClick={() => { setScreenMode('store'); setActiveDepartment('fashion'); }}
              >
                <span className="text-[7px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.4em] font-light text-[#dca42b] block uppercase">
                  {activeDepartment === 'beauty' ? 'ZENVY BEAUTY' : 
                   activeDepartment === 'kids' ? 'ZENVY KIDS' : 
                   activeDepartment === 'silk-gold' ? 'SILK & GOLD' : 'ZENVY LUXURY'}
                </span>
                <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-[0.12em] sm:tracking-[0.15em] text-stone-900 mt-0.5 leading-none">
                  ZENVY
                </h1>
              </div>

              {/* Interaction Panel Icons - Right margin */}
              <div className="flex gap-2.5 sm:gap-4 md:gap-6 items-center text-stone-600 relative z-20 ml-auto md:ml-0">
                <button 
                  onClick={() => setSearchOpen(true)}
                  className="hover:text-amber-800 transition-colors p-1"
                  aria-label="Search"
                >
                  <Search size={17} className="sm:w-[18px] sm:h-[18px]" />
                </button>
                
                <button 
                  onClick={() => setScreenMode('wishlist')}
                  className="relative hover:text-amber-800 transition-colors p-1"
                  aria-label="Wishlist"
                >
                  <Heart size={17} className={`sm:w-[18px] sm:h-[18px] ${screenMode === 'wishlist' ? 'text-amber-700 fill-amber-700' : ''}`} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-600 text-white text-[7px] font-bold flex items-center justify-center border-2 border-white font-mono leading-none">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>

                <button 
                  onClick={() => setScreenMode('cart')}
                  className="relative hover:text-amber-800 transition-colors p-1"
                  aria-label="Shopping Bag"
                >
                  <ShoppingBag size={17} className={`sm:w-[18px] sm:h-[18px] ${screenMode === 'cart' ? 'text-amber-700' : ''}`} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#dca42b] text-white text-[7px] font-bold flex items-center justify-center border-2 border-white font-mono leading-none">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </button>

                <button 
                  onClick={() => setScreenMode('profile')}
                  className="hover:text-amber-800 transition-colors flex items-center focus:outline-none p-0.5"
                  aria-label="Profile"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-stone-200">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.fullName} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </div>
            </header>

            {/* Department Quick Ribbon Links (Fashion / Beauty / Kids / Accessories / SilkGold) */}
            <div className="w-full bg-[#f6f3ef] border-b border-stone-100/60 py-2.5 sm:py-3.5 flex justify-start md:justify-center items-center gap-2 sm:gap-4 overflow-x-auto px-3 sm:px-4 select-none scrollbar-none">
              {(['fashion', 'accessories', 'beauty', 'kids', 'silk-gold'] as Department[]).map(dept => (
                <button
                  key={dept}
                  onClick={() => {
                    setActiveDepartment(dept);
                    setScreenMode('store');
                    triggerToast(`Entered the ${dept.toUpperCase()} Department`, 'info');
                  }}
                  className={`flex-shrink-0 px-3.5 sm:px-4 py-1.5 text-[8.5px] sm:text-[10px] font-semibold tracking-wider sm:tracking-widest uppercase rounded-full border transition-all ${
                    activeDepartment === dept && screenMode === 'store'
                      ? 'bg-amber-900 border-amber-900 text-white shadow-sm'
                      : 'bg-white border-stone-200 text-stone-400 hover:text-stone-850 hover:border-stone-400'
                  }`}
                >
                  {dept === 'silk-gold' ? 'Silk & Gold 🇮🇳' : dept}
                </button>
              ))}
            </div>

            {/* Render Storefront views dynamic segment based on active tabs */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-6 sm:py-10 pb-24 md:pb-10">
              {screenMode === 'wishlist' ? (
                <SanctuaryView 
                  sanctuaryItems={wishlistItems}
                  onRemoveItem={handleRemoveWishItem}
                  onMoveToCart={handleMoveToCart}
                  onAddRecommendation={(prod) => handleAddToBag(prod)}
                />
              ) : screenMode === 'cart' ? (
                <ShoppingBagView 
                  cartItems={cartItems}
                  onUpdateQuantity={handleUpdateCartQty}
                  onRemoveItem={handleRemoveCartItem}
                  onSaveForLater={handleSaveForLater}
                  onCheckout={(finalTotal, deliveryCost, tax, discount) => {
                    setCheckoutTotals({ finalTotal, deliveryCost, tax, discount });
                    setScreenMode('payment');
                  }}
                  onAddRecommendation={(prod) => handleAddToBag(prod)}
                />
              ) : screenMode === 'profile' ? (
                <ProfileView 
                  userProfile={userProfile}
                  onSaveProfile={(prof) => setUserProfile(prof)}
                  onCancel={() => setScreenMode('store')}
                />
              ) : screenMode === 'payment' ? (
                <PaymentView 
                  cartItems={cartItems}
                  totalPrice={checkoutTotals?.finalTotal || 0}
                  deliveryCost={checkoutTotals?.deliveryCost || 0}
                  tax={checkoutTotals?.tax || 0}
                  discount={checkoutTotals?.discount || 0}
                  userProfile={userProfile}
                  onSuccess={() => {
                    triggerToast('Order completed successfully!', 'success');
                    setCartItems([]);
                    setScreenMode('store');
                  }}
                  onCancel={() => setScreenMode('cart')}
                />
              ) : (
                /* Primary department galleries */
                <>
                  {activeDepartment === 'fashion' && (
                    <DepartmentFashion onAddToBag={handleAddToBag} onAddToWishlist={handleAddToWishlist} />
                  )}
                  {activeDepartment === 'accessories' && (
                    <DepartmentAccessories onAddToBag={handleAddToBag} onAddToWishlist={handleAddToWishlist} />
                  )}
                  {activeDepartment === 'beauty' && (
                    <DepartmentBeauty onAddToBag={handleAddToBag} onAddToWishlist={handleAddToWishlist} />
                  )}
                  {activeDepartment === 'kids' && (
                    <DepartmentKids onAddToBag={handleAddToBag} onAddToWishlist={handleAddToWishlist} />
                  )}
                  {activeDepartment === 'silk-gold' && (
                    <DepartmentSilkGold onAddToBag={handleAddToBag} onAddToWishlist={handleAddToWishlist} />
                  )}
                </>
              )}
            </main>

            {/* Custom Footer */}
            <Footer brandName={
              activeDepartment === 'beauty' ? 'ZENVY BEAUTY' : 
              activeDepartment === 'kids' ? 'ZENVY KIDS' : 
              activeDepartment === 'silk-gold' ? 'SILK & GOLD' : 'ZENVY LUXURY'
            } />

            {/* 📱 Luxury Mobile Bottom Navigation Bar */}
            <nav 
              id="mobile-bottom-nav" 
              className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/80 px-2 py-1.5 flex justify-around items-center shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
              aria-label="Mobile Bottom Navigation"
            >
              {/* 1. Shop / Home */}
              <button 
                onClick={() => { setScreenMode('store'); }}
                className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
                  screenMode === 'store' ? 'text-amber-800' : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <Sparkles size={18} className={screenMode === 'store' ? 'text-amber-700' : ''} />
                <span className="text-[8px] font-bold tracking-wider mt-0.5 uppercase">Shop</span>
              </button>

              {/* 2. Search */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="flex flex-col items-center py-1 px-3 rounded-xl text-stone-400 hover:text-stone-700 transition-colors"
              >
                <Search size={18} />
                <span className="text-[8px] font-bold tracking-wider mt-0.5 uppercase">Search</span>
              </button>

              {/* 3. Wishlist / Sanctuary */}
              <button 
                onClick={() => setScreenMode('wishlist')}
                className={`relative flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
                  screenMode === 'wishlist' ? 'text-amber-800' : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <div className="relative">
                  <Heart size={18} className={screenMode === 'wishlist' ? 'text-amber-700 fill-amber-700' : ''} />
                  {wishlistItems.length > 0 && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-amber-600 text-white text-[7px] font-bold flex items-center justify-center font-mono">
                      {wishlistItems.length}
                    </span>
                  )}
                </div>
                <span className="text-[8px] font-bold tracking-wider mt-0.5 uppercase">Saved</span>
              </button>

              {/* 4. Bag */}
              <button 
                onClick={() => setScreenMode('cart')}
                className={`relative flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
                  screenMode === 'cart' ? 'text-amber-800' : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <div className="relative">
                  <ShoppingBag size={18} className={screenMode === 'cart' ? 'text-amber-700' : ''} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#dca42b] text-white text-[7px] font-bold flex items-center justify-center font-mono">
                      {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </div>
                <span className="text-[8px] font-bold tracking-wider mt-0.5 uppercase">Bag</span>
              </button>

              {/* 5. Profile */}
              <button 
                onClick={() => setScreenMode('profile')}
                className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
                  screenMode === 'profile' ? 'text-amber-800' : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <User size={18} className={screenMode === 'profile' ? 'text-amber-700' : ''} />
                <span className="text-[8px] font-bold tracking-wider mt-0.5 uppercase">Profile</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔍 Search Overlay Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex justify-center items-start pt-8 sm:pt-24 px-4 sm:px-6 select-none"
          >
            <div className="w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-stone-100 shadow-2xl relative max-h-[88vh] flex flex-col">
              <button 
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-stone-400 hover:text-stone-900 p-1"
                aria-label="Close search"
              >
                <X size={18} />
              </button>

              <h3 className="font-serif text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-stone-900 border-b border-stone-100 pb-3">
                Search Curated Collections
              </h3>

              <div className="flex gap-3">
                <input 
                  type="text"
                  autoFocus
                  placeholder="Search (e.g. 'Silk', 'Dress', 'Bag')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow pb-2 bg-transparent border-b border-stone-300 text-stone-800 text-sm focus:outline-none focus:border-amber-600 font-sans"
                />
              </div>

              {/* Quick suggestions tags */}
              <div className="mt-4 sm:mt-6">
                <span className="text-[9px] sm:text-[10px] tracking-wider text-stone-400 font-mono block mb-2">QUICK SUGGESTIONS:</span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['Chronograph', 'Radiance', 'Scarf', 'Linen', 'Blazer'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 sm:px-4 py-1 sm:py-1.5 bg-stone-50 text-[9px] sm:text-[10px] font-semibold text-stone-600 rounded-full hover:bg-amber-500 hover:text-white transition-colors uppercase"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search results catalog */}
              <div className="mt-6 max-h-64 sm:max-h-72 overflow-y-auto space-y-3 sm:space-y-4">
                {searchResults.map(p => (
                  <div 
                    key={p.id}
                    onClick={() => {
                      handleAddToBag(p);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center p-2.5 sm:p-3 border border-stone-100 rounded-xl sm:rounded-2xl hover:bg-stone-50 cursor-pointer transition-colors"
                  >
                    <img src={p.image} className="w-11 h-11 sm:w-12 sm:h-12 object-cover rounded-lg sm:rounded-xl mr-3 sm:mr-4" alt={p.name} />
                    <div>
                      <h4 className="font-serif text-sm font-semibold">{p.name}</h4>
                      <span className="text-[9px] tracking-wider text-stone-400 font-mono uppercase">{p.category} • ${p.price}</span>
                    </div>
                  </div>
                ))}
                {searchQuery.trim() !== '' && searchResults.length === 0 && (
                  <p className="text-xs text-stone-400 italic text-center py-6">No premium weavers match your query.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
