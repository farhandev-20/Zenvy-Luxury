import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface SplashViewProps {
  onDiscover: () => void;
}

export default function SplashView({ onDiscover }: SplashViewProps) {
  const [loadingText, setLoadingText] = useState('LOADING...');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingText('READY TO START');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="splash-view-container" className="relative w-full min-h-screen min-h-[100dvh] overflow-hidden flex flex-col items-center justify-between bg-white text-stone-900 select-none py-2 sm:py-0">
      {/* Background Image with elegant side gradients / spotlight overlay */}
      <div 
        id="splash-bg-image"
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1200')` }}
      />
      
      {/* Diagonal light spotlight effect */}
      <div 
        id="splash-spotlight-overlay"
        className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-stone-100/30 to-transparent mix-blend-overlay rotate-12 scale-150"
      />

      {/* Vertical luxury accents on side screen margins */}
      <div 
        id="splash-left-accent"
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-16"
      >
        <span className="text-[10px] tracking-[0.3em] font-light text-stone-400 rotate-270 uppercase origin-center whitespace-nowrap">
          EST. 2024
        </span>
      </div>

      <div 
        id="splash-right-accent"
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-16"
      >
        <span className="text-[10px] tracking-[0.3em] font-light text-stone-400 rotate-90 uppercase origin-center whitespace-nowrap">
          QUALITY & STYLE
        </span>
      </div>

      {/* Header element */}
      <header id="splash-header" className="w-full max-w-7xl px-6 sm:px-8 h-16 sm:h-20 flex items-center justify-between z-10">
        <span className="font-serif text-lg sm:text-xl tracking-[0.2em] font-medium uppercase text-stone-800">
          ZENVY
        </span>
        <button 
          onClick={onDiscover}
          className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-stone-400 hover:text-stone-900 transition-colors pointer-events-auto p-2"
        >
          SKIP
        </button>
      </header>

      {/* Center Brand Identity block */}
      <main id="splash-brand-block" className="flex flex-col items-center text-center z-10 max-w-xl px-6 my-auto">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          {/* Main Logo Styled */}
          <div className="relative pb-3 flex flex-col items-center">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-[0.12em] sm:tracking-[0.15em] font-light text-amber-800/90 leading-none">
              ZENVY
            </h1>
            <div className="w-32 sm:w-48 h-[1px] bg-amber-800/60 mt-3" />
          </div>

          <p className="text-[10px] sm:text-xs tracking-[0.35em] sm:tracking-[0.4em] text-stone-500 uppercase mt-4 font-mono">
            S I M P L E  L U X U R Y
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 sm:mt-16 w-full sm:w-auto"
        >
          <button
            id="splash-cta-btn"
            onClick={onDiscover}
            className="w-full sm:w-auto group relative px-10 sm:px-12 py-3.5 sm:py-4 bg-[#dca42b] hover:bg-[#c39121] text-white text-xs font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-0 flex items-center justify-center gap-3"
          >
            SHOP NOW
            <span className="group-hover:translate-x-1 duration-200 transition-transform">→</span>
          </button>
        </motion.div>
      </main>

      {/* Footer loading indication */}
      <footer id="splash-footer" className="w-full max-w-7xl px-6 sm:px-8 h-16 sm:h-24 flex items-center justify-center z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] sm:text-[10px] tracking-[0.3em] text-stone-400 uppercase font-mono animate-pulse">
            {loadingText}
          </span>
          <div className="w-16 h-[2px] bg-stone-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="h-full bg-amber-600"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}
