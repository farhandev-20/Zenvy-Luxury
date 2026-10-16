import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Minus, X, Heart, ShieldAlert, BadgeCheck, PartyPopper } from 'lucide-react';
import { CartItem, Product } from '../types';
import { WISH_RECOMMENDATIONS } from '../data';

interface ShoppingBagViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onSaveForLater: (product: Product) => void;
  onCheckout: (finalTotal: number, deliveryCost: number, tax: number, discount: number) => void;
  onAddRecommendation: (product: Product) => void;
}

export default function ShoppingBagView({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onSaveForLater,
  onCheckout,
  onAddRecommendation,
}: ShoppingBagViewProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Calculate costs dynamically based on the active state
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free shipping cap rule set to $1200
  const shippingThreshold = 1200;
  const deliveryCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 45;
  const calculatedTax = Math.round(subtotal * 0.08); // 8% luxury sales tax
  
  const finalTotal = subtotal + deliveryCost + calculatedTax - discount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ZENVY20') {
      const reduction = Math.round(subtotal * 0.2); // 20% discount
      setDiscount(reduction);
      setPromoMessage('Promo code applied and saved! 20% discount subtracted.');
    } else if (promoCode.trim() !== '') {
      setPromoMessage('Invalid luxury promo credentials. Try "ZENVY20"');
      setDiscount(0);
    }
  };

  const shippingRatio = Math.min((subtotal / shippingThreshold) * 100, 100);

  return (
    <div id="shopping-bag-container" className="w-full min-h-screen bg-[#fcfbfa] text-stone-900 py-6 sm:py-12 px-4 sm:px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Dynamic Cart Heading */}
        <div id="shopping-bag-title-section" className="border-b border-stone-200 pb-5 sm:pb-8 mb-6 sm:mb-10 text-center md:text-left">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-tight text-stone-900">
            Shopping Bag ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items)
          </h2>
          <p className="text-xs font-light text-stone-500 tracking-wider mt-1.5 sm:mt-2">
            Luxury is in each detail. Review your selected pieces.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart state */
          <div className="py-16 sm:py-20 text-center border border-dashed border-stone-200 rounded-2xl sm:rounded-3xl bg-white max-w-xl mx-auto px-6">
            <Heart className="mx-auto text-amber-600/30 mb-4 animate-pulse" size={40} />
            <h3 className="font-serif text-xl sm:text-2xl font-light text-stone-800">Your bag is empty</h3>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed">
              Explore our collections to choose your perfect style.
            </p>
          </div>
        ) : (
          <div id="shopping-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-start">
            
            {/* Left Column: Cart items */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-6">
              {cartItems.map((item) => (
                <div 
                  key={item.product.id}
                  id={`cart-item-${item.product.id}`}
                  className="flex flex-row gap-3 sm:gap-6 p-3.5 sm:p-6 bg-white border border-stone-100 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-shadow relative"
                >
                  {/* Photo frame */}
                  <div className="w-24 h-28 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Descriptions block */}
                  <div className="flex-grow flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <span className="text-[8px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] font-medium text-stone-400 uppercase block mb-0.5">
                            {item.product.category}
                          </span>
                          <h3 className="font-serif text-sm sm:text-lg md:text-xl font-medium tracking-tight text-stone-900 truncate">
                            {item.product.name}
                          </h3>
                        </div>
                        <span className="font-serif text-sm sm:text-lg font-medium text-stone-800 whitespace-nowrap">
                          ${item.product.price.toLocaleString()}.00
                        </span>
                      </div>
                      
                      {/* Technical specifications */}
                      <div className="flex gap-3 text-[9px] sm:text-[10px] tracking-wider text-stone-400 uppercase font-mono mt-1.5 sm:mt-3">
                        {item.selectedSize && <span>SIZE: <strong className="text-stone-700">{item.selectedSize}</strong></span>}
                        <span>COLOR: <strong className="text-stone-700">GOLD</strong></span>
                      </div>
                    </div>

                    {/* Quantity Adjustment + Actions Line */}
                    <div className="flex flex-wrap justify-between items-center mt-3 sm:mt-6 gap-2">
                      {/* Counter */}
                      <div className="flex items-center border border-stone-200 rounded-full py-1 px-2.5 sm:py-1.5 sm:px-3 bg-stone-50 gap-2 sm:gap-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="text-stone-400 hover:text-stone-955 p-0.5 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-xs font-semibold text-stone-800 font-mono w-4 sm:w-5 text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-stone-400 hover:text-stone-955 p-0.5 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Action linkages */}
                      <div className="flex gap-4 sm:gap-6 text-[9px] sm:text-[10px] tracking-wider font-semibold uppercase">
                        <button 
                          onClick={() => onSaveForLater(item.product)}
                          className="text-stone-400 hover:text-amber-800 transition-colors flex items-center gap-1"
                        >
                          <Heart size={11} /> <span className="hidden sm:inline">SAVE FOR LATER</span><span className="sm:hidden">SAVE</span>
                        </button>
                        <button 
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-red-400 hover:text-red-700 transition-colors"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Order summary & Promos */}
            <div className="lg:col-span-4 space-y-4 sm:space-y-6">
              
              {/* Checkout breakdown card */}
              <div id="checkout-summary-card" className="bg-white border border-stone-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm">
                
                {/* Visual Free Shipping progress bar */}
                <div className="border-b border-stone-100 pb-5 mb-5">
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs font-semibold tracking-wider text-amber-800/90 uppercase flex items-center gap-1.5">
                      🚚 Free Shipping Unlocked
                    </span>
                    <span className="text-[10px] tracking-wide font-mono text-stone-400">
                      {subtotal >= shippingThreshold ? 'Unlocked' : `$${(shippingThreshold - subtotal).toLocaleString()} left`}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${shippingRatio}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-500 leading-relaxed mt-2.5">
                    Your order qualifies for free signature packaging and fast shipping.
                  </p>
                </div>

                {/* Promo application segment */}
                <div className="border-b border-stone-100 pb-5 mb-5">
                  <label className="block text-[10px] tracking-[0.2em] font-medium text-stone-400 uppercase mb-2">
                    PROMO CODE
                  </label>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      placeholder="Enter code (Try ZENVY20)" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-grow text-xs pb-1 bg-transparent border-b border-stone-200 focus:outline-none focus:border-amber-600 transition-colors font-mono uppercase"
                    />
                    <button 
                      onClick={handleApplyPromo}
                      className="text-[10px] tracking-[0.2em] font-semibold text-stone-700 hover:text-[#dca42b] uppercase"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoMessage && (
                    <span className="text-[9px] text-amber-800 font-medium block mt-2 font-mono uppercase">
                      {promoMessage}
                    </span>
                  )}
                </div>

                {/* Mathematical items breakdown */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span className="font-mono">${subtotal.toLocaleString()}.00</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-amber-800 font-medium">
                      <span>Promo Discount (20%)</span>
                      <span className="font-mono">-${discount.toLocaleString()}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-500">
                    <span>Shipping</span>
                    <span className="font-mono uppercase text-[10px] tracking-widest text-[#dca42b] font-semibold">
                      {deliveryCost === 0 ? 'FREE' : `$${deliveryCost}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Tax</span>
                    <span className="font-mono">${calculatedTax.toLocaleString()}.00</span>
                  </div>
                  <div className="border-t border-stone-100 pt-4 flex justify-between items-baseline">
                    <span className="font-serif text-lg font-medium text-stone-900">Total</span>
                    <span className="font-serif text-2xl font-bold text-[#dca42b]">
                      ${finalTotal.toLocaleString()}.00
                    </span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => onCheckout(finalTotal, deliveryCost, calculatedTax, discount)}
                  className="w-full mt-6 py-4 bg-[#dca42b] hover:bg-[#c39121] text-white text-xs font-semibold uppercase tracking-[0.25em] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  PROCEED TO CHECKOUT
                </button>

                {/* Secure Badge */}
                <div className="mt-4 flex justify-center items-center gap-1.5 text-[9px] tracking-widest text-stone-400 uppercase font-mono">
                  <BadgeCheck size={11} className="text-amber-600" /> SECURE CHECKOUT & INSURANCE
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended For You list dynamic container matching Image 7 layout */}
        <div id="shopping-recommendation-section" className="mt-20">
          <div className="flex justify-between items-baseline border-b border-stone-100 pb-4 mb-8">
            <h3 className="font-serif text-2xl font-medium tracking-tight text-stone-900">
              Recommended For You
            </h3>
            <span className="text-[10px] tracking-widest font-semibold uppercase text-stone-400 hover:text-stone-800 cursor-pointer">
              VIEW ALL
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {WISH_RECOMMENDATIONS.map((prod) => (
              <div 
                key={prod.id} 
                className="group cursor-pointer flex flex-col justify-between"
              >
                {/* Card frame */}
                <div className="relative aspect-[4/5] rounded-[1.5rem] bg-stone-100 overflow-hidden mb-3">
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform"
                  />
                  {/* Invisible premium overlay add block */}
                  <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 duration-300 transition-opacity flex justify-center items-center">
                    <button 
                      onClick={() => onAddRecommendation(prod)}
                      className="px-4 py-2 bg-white text-[10px] font-semibold uppercase tracking-wider text-stone-900 rounded-full transition-transform hover:scale-105"
                    >
                      + ADD TO BAG
                    </button>
                  </div>
                </div>

                {/* Specs */}
                <div className="text-center mt-1">
                  <span className="text-[9px] tracking-[0.2em] font-medium text-stone-400 block uppercase mb-0.5">
                    {prod.category}
                  </span>
                  <h4 className="font-serif text-sm font-medium tracking-tight text-stone-900 leading-tight">
                    {prod.name}
                  </h4>
                  <span className="text-xs font-mono text-stone-700 block mt-1">
                    ${prod.price.toLocaleString()}.00
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join circle form banner */}
        <div id="shopping-bag-footer-hero" className="mt-24 p-12 bg-stone-100 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-md text-center md:text-left">
            <h4 className="font-serif text-2xl font-medium tracking-tight text-stone-900">
              Join the Circle
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed mt-2">
              Be the first to experience our new collections and receive exclusive invitation keys to seasonal luxury events.
            </p>
          </div>
          <div className="flex gap-4 w-full max-w-sm">
            <input 
              type="email" 
              placeholder="Your Email Address"
              className="flex-grow pb-1 pt-1 bg-transparent border-b border-stone-300 focus:outline-none focus:border-stone-900 text-xs text-stone-800"
            />
            <button 
              onClick={() => alert("Welcome to the exclusive circle details.")}
              className="text-[10px] tracking-[0.25em] font-semibold text-stone-990 uppercase border-b border-stone-900 pb-1"
            >
              SUBSCRIBE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
