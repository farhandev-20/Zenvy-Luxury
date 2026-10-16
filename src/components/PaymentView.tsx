import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, ShieldCheck, ChevronLeft, Calendar, Lock, CheckCircle2, 
  Sparkles, Download, Receipt, ShoppingBag, Eye, EyeOff, Building, User
} from 'lucide-react';
import { CartItem, Product, UserProfile } from '../types';

interface PaymentViewProps {
  cartItems: CartItem[];
  totalPrice: number;
  deliveryCost: number;
  tax: number;
  discount: number;
  userProfile: UserProfile;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentView({
  cartItems,
  totalPrice,
  deliveryCost,
  tax,
  discount,
  userProfile,
  onSuccess,
  onCancel
}: PaymentViewProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(userProfile.fullName);
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Auto-format card number as 0000 0000 0000 0000
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const matches = value.match(/\d{1,4}/g);
    const formatted = matches ? matches.join(' ').slice(0, 19) : '';
    setCardNumber(formatted);
  };

  // Auto-format expiry as MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setExpiry(formatted.slice(0, 5));
  };

  // Auto-format CVV (max 3-4 digits)
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCvv(value.slice(0, 4));
  };

  // Card Network Detection
  const getCardNetwork = () => {
    const rawNum = cardNumber.replace(/\s/g, '');
    if (rawNum.startsWith('4')) return 'Visa';
    if (rawNum.startsWith('5')) return 'Mastercard';
    if (rawNum.startsWith('3')) return 'Amex';
    return 'Generic';
  };

  // Generate unique order ID
  useEffect(() => {
    const randomHex = Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase();
    setOrderId(`ZV-${new Date().getFullYear()}-${randomHex}`);
  }, []);

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate secure payment processing stages
    const stages = [
      'Connecting to secure network...',
      'Checking payment details...',
      'Securing transaction...',
      'Processing payment...'
    ];

    let currentStageIndex = 0;
    setProcessingStage(stages[0]);

    const interval = setInterval(() => {
      currentStageIndex += 1;
      if (currentStageIndex < stages.length) {
        setProcessingStage(stages[currentStageIndex]);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setShowSuccess(true);
      }
    }, 900);
  };

  const handleSuccessClose = () => {
    onSuccess(); // Triggers cart clearing and return to store
  };

  // Mock Invoice download trigger
  const handleDownloadInvoice = () => {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const content = `
      ZENVY LUXURY SHOP - INVOICE
      ===================================
      Order Reference: ${orderId}
      Date: ${date}
      Client: ${userProfile.fullName}
      Email: ${userProfile.email}
      
      PURCHASED ITEMS:
      ${cartItems.map(item => `- ${item.product.name} (Qty: ${item.quantity}) - $${(item.product.price * item.quantity).toLocaleString()}`).join('\n')}
      
      Subtotal: $${(totalPrice - deliveryCost - tax + discount).toLocaleString()}.00
      Discount applied: -$${discount.toLocaleString()}.00
      Free Shipping: $${deliveryCost === 0 ? '0.00' : deliveryCost + '.00'}
      Sales Tax (8%): $${tax.toLocaleString()}.00
      -----------------------------------
      TOTAL PAID AMOUNT: $${totalPrice.toLocaleString()}.00
      
      Thank you for shopping with Zenvy.
    `;
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Zenvy_Invoice_${orderId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="payment-view-root" className="w-full min-h-screen bg-[#faf8f6] py-12 px-4 md:px-8 select-none text-stone-900 relative">
      
      {/* ⚠️ Processing Overlay Screen */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex flex-col justify-center items-center text-white"
          >
            <div className="flex flex-col items-center gap-6 max-w-sm text-center px-6">
              <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-bold font-mono tracking-[0.3em] uppercase text-amber-400 animate-pulse">
                SECURE TRANSACTION
              </span>
              <p className="text-sm font-serif italic text-stone-200">
                {processingStage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💳 Primary Payment Dashboard */}
      {!showSuccess ? (
        <div className="max-w-4xl mx-auto">
          {/* Back to Shopping Bag Nav link */}
          <button 
            onClick={onCancel}
            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors mb-8"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>RETURN TO BAG</span>
          </button>

          {/* Heading */}
          <div className="border-b border-stone-200 pb-6 mb-10">
            <h2 className="font-serif text-3xl font-light text-stone-900 tracking-wide uppercase">
              Secure Checkout
            </h2>
            <p className="text-xs text-stone-400 font-light mt-1 tracking-wider uppercase font-mono">
              Order Reference: {orderId}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form & Mock Card */}
            <div className="lg:col-span-7 space-y-6">
              {/* Payment Methods Tabs */}
              <div className="flex bg-stone-100/60 p-1.5 rounded-full border border-stone-200/50">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase rounded-full transition-all ${
                    paymentMethod === 'card' 
                      ? 'bg-amber-900 text-white shadow-sm' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase rounded-full transition-all ${
                    paymentMethod === 'paypal' 
                      ? 'bg-amber-900 text-white shadow-sm' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  PayPal
                </button>
                <button
                  onClick={() => setPaymentMethod('apple')}
                  className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase rounded-full transition-all ${
                    paymentMethod === 'apple' 
                      ? 'bg-amber-900 text-white shadow-sm' 
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Apple Pay
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <form onSubmit={handlePaySubmit} className="space-y-6">
                  {/* Visual Premium Credit Card Mockup */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full aspect-[1.586/1] bg-gradient-to-br from-amber-950 via-amber-900 to-amber-950 rounded-3xl p-6 text-white shadow-xl overflow-hidden border border-amber-800/40 select-none flex flex-col justify-between"
                  >
                    {/* Glowing gold grain background overlay */}
                    <div className="absolute inset-0 bg-radial-gradient-overlay opacity-30 mix-blend-overlay pointer-events-none" />
                    
                    {/* Card Top Branding Row */}
                    <div className="flex justify-between items-start z-10">
                      <div>
                        <span className="text-[7px] tracking-[0.4em] text-amber-200 block uppercase font-mono">
                          ZENVY CARD
                        </span>
                        <span className="font-serif text-lg tracking-widest font-light block mt-0.5 text-white/95">
                          GOLD CARD
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono tracking-widest bg-amber-400/20 px-2.5 py-1 rounded-full text-amber-300 font-bold uppercase border border-amber-400/30">
                          {getCardNetwork()}
                        </span>
                      </div>
                    </div>

                    {/* Chip & NFC symbol */}
                    <div className="flex items-center gap-4 z-10">
                      <div className="w-10 h-8 bg-gradient-to-tr from-amber-200 to-yellow-500 rounded-lg shadow-inner opacity-80" />
                      <div className="flex flex-col gap-0.5 opacity-60">
                        <div className="w-4 h-[1px] bg-white" />
                        <div className="w-5 h-[1px] bg-white" />
                        <div className="w-4 h-[1px] bg-white" />
                      </div>
                    </div>

                    {/* Card Number display */}
                    <div className="z-10 font-mono text-lg md:text-xl tracking-[0.2em] text-amber-100/90 text-center my-3">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    {/* Holder & Expiry Row */}
                    <div className="flex justify-between items-end z-10">
                      <div>
                        <span className="text-[7px] tracking-widest text-amber-400 block mb-0.5 font-mono">
                          CARDHOLDER NAME
                        </span>
                        <span className="text-xs uppercase font-mono font-semibold tracking-wider truncate max-w-[160px] block">
                          {cardName || 'Julianne V. Smith'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[7px] tracking-widest text-amber-400 block mb-0.5 font-mono">
                          EXPIRES
                        </span>
                        <span className="text-xs font-mono font-semibold">
                          {expiry || 'MM/YY'}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Form Fields */}
                  <div className="space-y-4 bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                    {/* Cardholder name */}
                    <div>
                      <label className="block text-[10px] tracking-wider uppercase font-bold text-stone-400 mb-1.5 font-mono">
                        CARDHOLDER NAME
                      </label>
                      <div className="relative flex items-center">
                        <User size={14} className="absolute left-3 text-stone-400" />
                        <input
                          type="text"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Name on card"
                          className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-250 text-stone-800 text-xs rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white transition-all font-sans font-semibold"
                        />
                      </div>
                    </div>

                    {/* Card number */}
                    <div>
                      <label className="block text-[10px] tracking-wider uppercase font-bold text-stone-400 mb-1.5 font-mono">
                        CARD NUMBER
                      </label>
                      <div className="relative flex items-center">
                        <CreditCard size={14} className="absolute left-3 text-stone-400" />
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="0000 0000 0000 0000"
                          className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-250 text-stone-855 text-xs rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white transition-all font-mono font-bold"
                        />
                      </div>
                    </div>

                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] tracking-wider uppercase font-bold text-stone-400 mb-1.5 font-mono">
                          EXPIRY DATE
                        </label>
                        <div className="relative flex items-center">
                          <Calendar size={14} className="absolute left-3 text-stone-400" />
                          <input
                            type="text"
                            required
                            value={expiry}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-250 text-stone-855 text-xs rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white transition-all font-mono font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] tracking-wider uppercase font-bold text-stone-400 mb-1.5 font-mono">
                          CVV SECURITY CODE
                        </label>
                        <div className="relative flex items-center">
                          <Lock size={14} className="absolute left-3 text-stone-400" />
                          <input
                            type={showCvv ? 'text' : 'password'}
                            required
                            value={cvv}
                            onChange={handleCvvChange}
                            placeholder="•••"
                            className="w-full pl-9 pr-10 py-2.5 bg-stone-50 border border-stone-250 text-stone-855 text-xs rounded-xl focus:outline-none focus:border-amber-600 focus:bg-white transition-all font-mono font-bold"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCvv(!showCvv)}
                            className="absolute right-3 text-stone-400 hover:text-stone-700"
                          >
                            {showCvv ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Security Insurance Badge */}
                    <div className="pt-2 flex items-center gap-2 text-[10px] text-stone-400 font-mono uppercase tracking-wider">
                      <ShieldCheck size={14} className="text-emerald-600" />
                      <span>256-bit Secure Encryption • Insured Delivery Gateway</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#dca42b] hover:bg-[#c39121] text-white text-xs font-semibold uppercase tracking-[0.25em] rounded-full shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg active:translate-y-0.5"
                  >
                    AUTHORIZE PAYMENT OF ${totalPrice.toLocaleString()}.00
                  </button>
                </form>
              ) : paymentMethod === 'paypal' ? (
                /* Paypal Layout mock */
                <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm text-center space-y-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-600 font-serif text-3xl font-extrabold italic">P</span>
                  </div>
                  <div className="max-w-xs mx-auto">
                    <h3 className="font-serif text-xl font-medium">Log into PayPal</h3>
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                      Complete your transaction seamlessly through your secure PayPal wallet.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsProcessing(true);
                      setProcessingStage('Connecting with PayPal secure portal...');
                      setTimeout(() => {
                        setIsProcessing(false);
                        setShowSuccess(true);
                      }, 2000);
                    }}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold tracking-[0.2em] rounded-full uppercase transition-all"
                  >
                    CONTINUE WITH PAYPAL
                  </button>
                </div>
              ) : (
                /* Apple Pay Layout mock */
                <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm text-center space-y-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-stone-900 flex items-center justify-center text-white">
                    <span className="text-xl font-bold"></span>
                  </div>
                  <div className="max-w-xs mx-auto">
                    <h3 className="font-serif text-xl font-medium">Apple Pay Gateway</h3>
                    <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                      Confirm credentials instantly with Touch ID or Face ID verification.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsProcessing(true);
                      setProcessingStage('Awaiting FaceID security lock confirmation...');
                      setTimeout(() => {
                        setIsProcessing(false);
                        setShowSuccess(true);
                      }, 2000);
                    }}
                    className="w-full py-3.5 bg-stone-900 hover:bg-stone-950 text-white text-xs font-bold tracking-[0.2em] rounded-full uppercase transition-all"
                  >
                    PAY WITH APPLE PAY
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Mini Invoice receipt overview */}
            <div className="lg:col-span-5 bg-white border border-stone-100 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-medium border-b border-stone-100 pb-3">
                Order Invoice Summary
              </h3>

              {/* Items row */}
              <div className="max-h-52 overflow-y-auto space-y-4 pr-1">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-10 h-10 object-cover rounded-lg border border-stone-100"
                    />
                    <div className="flex-grow min-w-0">
                      <h4 className="font-serif text-xs font-semibold truncate leading-none mb-1">
                        {item.product.name}
                      </h4>
                      <span className="text-[9px] font-mono text-stone-400 block uppercase">
                        Qty: {item.quantity} • {item.selectedSize || 'M'}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-stone-700 font-semibold flex-shrink-0">
                      ${(item.product.price * item.quantity).toLocaleString()}.00
                    </span>
                  </div>
                ))}
              </div>

              {/* Technical Billing Shipping overview */}
              <div className="border-t border-stone-100 pt-4 space-y-2">
                <span className="text-[9px] tracking-wider uppercase font-bold text-stone-400 block font-mono">
                  DELIVERY DESTINATION
                </span>
                <div className="text-xs font-medium text-stone-700 leading-relaxed">
                  <div>{userProfile.fullName}</div>
                  <div className="text-stone-400 font-light truncate">{userProfile.address.street}</div>
                  <div className="text-stone-400 font-light">{userProfile.address.city}, {userProfile.address.state} {userProfile.address.postalCode}</div>
                </div>
              </div>

              {/* Sum totals */}
              <div className="border-t border-stone-100 pt-4 space-y-2.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal</span>
                  <span className="font-mono">${(totalPrice - tax - (deliveryCost) + discount).toLocaleString()}.00</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-amber-800 font-medium">
                    <span>Promo Applied</span>
                    <span className="font-mono">-${discount.toLocaleString()}.00</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span>Free Shipping</span>
                  <span className="font-mono uppercase text-[10px] tracking-widest text-[#dca42b] font-semibold">
                    {deliveryCost === 0 ? 'FREE' : `$${deliveryCost}.00`}
                  </span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Luxury Tax</span>
                  <span className="font-mono">${tax.toLocaleString()}.00</span>
                </div>
                <div className="border-t border-stone-100 pt-3 flex justify-between items-baseline">
                  <span className="font-serif text-base font-semibold">Total Paid</span>
                  <span className="font-serif text-xl font-bold text-[#dca42b]">
                    ${totalPrice.toLocaleString()}.00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 🏆 Order Success Screen */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl bg-white border border-stone-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl mx-auto text-center space-y-8 select-none"
        >
          {/* Animated Success Icon check */}
          <div className="flex justify-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shadow-inner"
            >
              <CheckCircle2 size={40} />
            </motion.div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.4em] text-amber-700 font-mono block uppercase font-bold">
              PAYMENT SUCCESSFUL
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-stone-900 uppercase">
              Order Placed Successfully
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto font-light">
              Your payment details have been verified and your order is confirmed. Your package will ship soon.
            </p>
          </div>

          {/* Order info card details */}
          <div className="bg-stone-50/70 border border-stone-200/50 rounded-3xl p-6 text-left space-y-4 max-w-md mx-auto">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-stone-400">ORDER ID:</span>
              <span className="text-stone-900 font-bold">{orderId}</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-stone-400">TRANSACTION TYPE:</span>
              <span className="text-stone-900 font-bold uppercase">{paymentMethod === 'card' ? 'Credit Card' : paymentMethod === 'paypal' ? 'PayPal Wallet' : 'Apple Pay'}</span>
            </div>
            <div className="flex justify-between text-xs font-mono border-t border-stone-200/50 pt-3">
              <span className="text-stone-400">TOTAL AMOUNT:</span>
              <span className="text-stone-900 font-bold">${totalPrice.toLocaleString()}.00</span>
            </div>
          </div>

          {/* Buttons row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto pt-4">
            <button
              onClick={handleDownloadInvoice}
              className="w-full py-3.5 bg-white border border-stone-250 text-stone-800 text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-stone-50 flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <Download size={14} /> DOWNLOAD INVOICE
            </button>
            <button
              onClick={handleSuccessClose}
              className="w-full py-3.5 bg-[#dca42b] hover:bg-[#c39121] text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-all shadow-md hover:shadow-lg"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
