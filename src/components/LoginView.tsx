import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onSuccess: () => void;
  onBack: () => void;
}

export default function LoginView({ onSuccess, onBack }: LoginViewProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'create'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('julianne.smith@zenvy.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess();
  };

  return (
    <div id="login-screen-outer" className="w-full min-h-screen bg-stone-50 flex flex-col md:grid md:grid-cols-12 overflow-hidden select-none">
      
      {/* Column 1: Left brand quote spotlight */}
      <div 
        id="login-spotlight-column" 
        className="hidden md:flex md:col-span-5 relative bg-stone-950 text-white p-12 flex-col justify-between"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center -z-10 opacity-60 filter brightness-[0.4]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800')` }}
        />
        
        {/* Top brand header */}
        <div className="z-10 flex items-center gap-2">
          <Sparkles size={16} className="text-[#dca42b]" />
          <span className="font-serif text-lg tracking-[0.25em] font-medium uppercase text-white/95">
            ZENVY
          </span>
        </div>

        {/* Dynamic center text/quote */}
        <div className="z-10 mb-8 max-w-sm">
          <span className="text-[9px] tracking-[0.4em] text-amber-400 font-mono block mb-4 uppercase font-bold">
            THE ESSENCE OF STYLE
          </span>
          <blockquote className="font-serif italic text-3xl md:text-4xl font-light tracking-tight leading-tight text-white mb-6">
            "Elegance is not standing out, but being remembered."
          </blockquote>
          <p className="text-[10px] tracking-widest uppercase font-semibold text-stone-300">
            CREATIVE ATELIER & DESIGN
          </p>
        </div>

        {/* Footer brand standard */}
        <div className="z-10 text-[9px] tracking-widest text-[#dca42b]/80 font-mono">
          © 2026 ZENVY BEAUTY & LUXURY SYSTEM
        </div>
      </div>

      {/* Column 2: Sign-In workspace */}
      <div 
        id="login-form-column" 
        className="md:col-span-7 bg-white flex flex-col justify-center px-8 py-16 md:p-20 lg:p-28 relative"
      >
        {/* Small top back link */}
        <button
          onClick={onBack}
          className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-stone-900 transition-all flex items-center gap-1.5"
        >
          <span>←</span> <span>BACK TO ATELIER</span>
        </button>

        {/* Logo elements */}
        <div className="text-center md:text-left mb-10">
          <span className="font-serif text-[10px] tracking-[0.45em] text-stone-300 block mb-1 uppercase font-bold">
            WELCOME TO
          </span>
          <h2 className="font-serif text-4xl tracking-[0.1em] font-light text-stone-900 uppercase leading-none">
            Z E N V Y
          </h2>
          <p className="text-[9px] tracking-[0.3em] font-mono text-stone-400 mt-2 uppercase block">
            SIMPLE LUXURY FOR EVERYONE
          </p>
        </div>

        {/* Tabs switcher segment */}
        <div className="flex border-b border-stone-100 mb-8">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 pb-4 text-[10px] font-semibold uppercase tracking-[0.2em] relative text-center transition-all ${
              activeTab === 'login' 
                ? 'text-amber-800' 
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            LOGIN
            {activeTab === 'login' && (
              <motion.div 
                layoutId="activeTabUnderline" 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-700" 
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 pb-4 text-[10px] font-semibold uppercase tracking-[0.2em] relative text-center transition-all ${
              activeTab === 'create' 
                ? 'text-amber-800' 
                : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            CREATE ACCOUNT
            {activeTab === 'create' && (
              <motion.div 
                layoutId="activeTabUnderline" 
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-700" 
              />
            )}
          </button>
        </div>

        {/* Form area with smooth fade transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Address */}
              <div className="group">
                <label className="block text-[9px] tracking-[0.2em] font-bold text-stone-400 uppercase mb-2 group-focus-within:text-amber-700 transition-colors">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pb-3 pt-1 border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 transition-colors bg-transparent placeholder-stone-300 font-sans"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[9px] tracking-[0.2em] font-bold text-stone-400 uppercase group-focus-within:text-amber-700 transition-colors">
                    PASSWORD
                  </label>
                  {activeTab === 'login' && (
                    <button
                      type="button"
                      className="text-[9px] tracking-[0.15em] font-bold text-amber-700 hover:text-amber-900 uppercase"
                    >
                      FORGOT PASSWORD?
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pb-3 pt-1 border-b border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-amber-600 transition-colors bg-transparent placeholder-stone-300 font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-3 text-stone-450 hover:text-stone-800 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-4.5 bg-[#dca42b] hover:bg-[#c39121] text-white text-xs font-bold uppercase tracking-[0.25em] transition-all shadow-md hover:shadow-amber-500/10 active:translate-y-0 hover:translate-y-[-1px] rounded-sm"
              >
                {activeTab === 'login' ? 'SIGN IN' : 'REGISTER'}
              </button>
            </form>
          </motion.div>
        </AnimatePresence>

        {/* Divider text */}
        <div className="relative flex py-5 items-center my-6">
          <div className="flex-grow border-t border-stone-100"></div>
          <span className="flex-shrink mx-4 text-[9px] tracking-[0.25em] text-stone-400 uppercase font-mono">
            OR CONTINUE WITH
          </span>
          <div className="flex-grow border-t border-stone-100"></div>
        </div>

        {/* Social Platforms connectors */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onSuccess}
            className="py-3 border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-[0.15em] flex justify-center items-center gap-2 hover:bg-stone-50 hover:border-stone-400 transition-all rounded-sm shadow-sm"
          >
            {/* Apple Logo SVG */}
            <svg className="w-4 h-4 fill-stone-800" viewBox="0 0 24 24">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.029-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.067 1.002 1.45 2.188 3.072 3.758 3.014 1.517-.063 2.09-.982 3.924-.982 1.829 0 2.348.982 3.93.95 1.614-.028 2.652-1.458 3.637-2.893 1.144-1.673 1.614-3.291 1.643-3.378-.035-.015-3.149-1.207-3.183-4.783-.028-2.983 2.446-4.417 2.559-4.483-1.401-2.046-3.557-2.279-4.322-2.336-1.92-.153-3.538 1.074-4.535 1.074zm1.942-4.636c.846-1.026 1.411-2.455 1.253-3.876-1.218.047-2.695.812-3.57 1.838-.767.892-1.438 2.342-1.259 3.743 1.357.105 2.73-.779 3.576-1.705z" />
            </svg>
            APPLE
          </button>
          <button
            onClick={onSuccess}
            className="py-3 border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-[0.15em] flex justify-center items-center gap-2 hover:bg-stone-50 hover:border-stone-400 transition-all rounded-sm shadow-sm"
          >
            {/* Google Logo SVG */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            GOOGLE
          </button>
        </div>

        {/* Terms text */}
        <p className="text-[10px] text-stone-400 text-center leading-relaxed mt-10 max-w-sm mx-auto font-sans">
          By continuing, you agree to our{' '}
          <a href="#" className="underline hover:text-stone-700">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:text-stone-700">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
