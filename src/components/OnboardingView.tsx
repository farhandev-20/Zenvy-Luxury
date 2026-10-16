import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface OnboardingViewProps {
  onGetStarted: () => void;
  onLoginClick: () => void;
}

export default function OnboardingView({ onGetStarted, onLoginClick }: OnboardingViewProps) {
  const [activeSlide, setActiveSlide] = useState(1);

  const slides = [
    {
      id: 1,
      tag: 'COLLECTION I',
      title: 'Elegant Styles',
      description: "Handpicked fashion from the world's finest boutiques.",
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 2,
      tag: 'COLLECTION II',
      title: 'Easy Shopping',
      description: 'Designed to make shopping simple and fast when you are on the move.',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 3,
      tag: 'COLLECTION III',
      title: 'Special Access',
      description: 'Get priority invites to private sales and custom shopping help.',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div id="onboarding-container" className="w-full min-h-screen bg-[#faf8f6] relative flex flex-col justify-between items-center py-8 px-6 md:px-12 select-none overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Bar Navigation */}
      <div id="onboarding-top-bar" className="w-full max-w-7xl flex justify-between items-center h-12 z-10">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#dca42b]" />
          <span className="font-serif text-xl tracking-[0.25em] font-bold text-stone-900">
            ZENVY
          </span>
        </div>
        <button 
          onClick={onGetStarted}
          className="text-[10px] font-bold tracking-[0.25em] text-stone-400 hover:text-[#dca42b] uppercase transition-colors"
        >
          SKIP
        </button>
      </div>

      {/* Main Slides visual comparison */}
      <div id="onboarding-slides-layout" className="w-full max-w-6xl my-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center px-4 z-10 py-10">
        
        {/* Left Card - Slide 1 */}
        <motion.div 
          onClick={() => setActiveSlide(1)}
          whileHover={{ y: -4 }}
          className={`cursor-pointer transition-all duration-500 relative rounded-[2.5rem] overflow-hidden bg-white p-8 shadow-md border flex flex-col justify-between aspect-[4/5] ${
            activeSlide === 1 
              ? 'scale-105 border-[#dca42b]/40 ring-1 ring-[#dca42b]/20 shadow-lg shadow-amber-900/5' 
              : 'opacity-50 hover:opacity-80 scale-95 border-stone-200/60'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-transparent z-10" />
          <img 
            src={slides[0].image} 
            alt={slides[0].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="z-20 text-white mt-auto">
            <span className="text-[9px] tracking-[0.35em] text-amber-400 font-mono uppercase block mb-2 font-bold">
              {slides[0].tag}
            </span>
            <h3 className="font-serif text-3xl font-light tracking-wide mb-3 leading-tight uppercase">
              {slides[0].title}
            </h3>
            <p className="text-xs font-light text-stone-200/90 leading-relaxed font-sans">
              {slides[0].description}
            </p>
          </div>
        </motion.div>

        {/* Center Card - Slide 2 Mobile Simulator Mock */}
        <div 
          onClick={() => setActiveSlide(2)}
          className={`cursor-pointer transition-all duration-500 relative flex justify-center items-center ${
            activeSlide === 2 ? 'scale-105 opacity-100 z-10' : 'opacity-50 hover:opacity-80 scale-95'
          }`}
        >
          {/* Mock Smartphone enclosure */}
          <div className="relative w-[300px] h-[520px] rounded-[3.5rem] border-[10px] border-stone-950 bg-stone-950 shadow-2xl ring-2 ring-white/10 overflow-hidden flex flex-col justify-between p-3.5 flex-shrink-0">
            {/* Camera speaker notch */}
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-28 h-5.5 bg-stone-950 rounded-b-2xl z-30 flex justify-center items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900" />
            </div>

            {/* In-phone home view */}
            <div className="relative w-full h-full rounded-[2.5rem] bg-stone-200 overflow-hidden flex flex-col justify-end p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent z-10" />
              <img 
                src={slides[1].image} 
                alt={slides[1].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="z-20 text-white mt-auto">
                <span className="text-[8px] tracking-[0.3em] text-amber-400 font-mono uppercase block mb-1 font-bold">
                  {slides[1].tag}
                </span>
                <h3 className="font-serif text-2xl font-light tracking-wide mb-2 leading-tight uppercase text-white">
                  {slides[1].title}
                </h3>
                <p className="text-[10px] font-light text-stone-200/90 leading-relaxed font-sans">
                  {slides[1].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card - Slide 3 */}
        <motion.div 
          onClick={() => setActiveSlide(3)}
          whileHover={{ y: -4 }}
          className={`cursor-pointer transition-all duration-500 relative rounded-[2.5rem] overflow-hidden bg-white p-8 shadow-md border flex flex-col justify-between aspect-[4/5] ${
            activeSlide === 3 
              ? 'scale-105 border-[#dca42b]/40 ring-1 ring-[#dca42b]/20 shadow-lg shadow-amber-900/5' 
              : 'opacity-50 hover:opacity-80 scale-95 border-stone-200/60'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-stone-955/80 via-stone-900/30 to-transparent z-10" />
          <img 
            src={slides[2].image} 
            alt={slides[2].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="z-20 text-white mt-auto">
            <span className="text-[9px] tracking-[0.35em] text-amber-400 font-mono uppercase block mb-2 font-bold">
              {slides[2].tag}
            </span>
            <h3 className="font-serif text-3xl font-light tracking-wide mb-3 leading-tight uppercase">
              {slides[2].title}
            </h3>
            <p className="text-xs font-light text-stone-200/90 leading-relaxed font-sans">
              {slides[2].description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Button and Dot navigation */}
      <div id="onboarding-controls-block" className="w-full max-w-md flex flex-col items-center gap-6 z-10">
        {/* Scroll Indicators */}
        <div className="flex gap-3">
          {slides.map(slide => (
            <button
              key={slide.id}
              onClick={() => setActiveSlide(slide.id)}
              className={`h-[4px] rounded-full transition-all duration-500 ${
                activeSlide === slide.id ? 'w-10 bg-[#dca42b]' : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>

        {/* Primary CTA */}
        <button
          onClick={onGetStarted}
          className="w-full py-4.5 bg-[#dca42b] hover:bg-[#c39121] text-white text-xs font-bold uppercase tracking-[0.25em] rounded-full transition-all shadow-lg hover:shadow-amber-500/15 active:translate-y-0 hover:translate-y-[-2px] flex justify-center items-center gap-2 group"
        >
          GET STARTED
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </button>

        {/* Secondary redirect */}
        <div className="text-xs text-stone-500 font-medium">
          Already have an account?{' '}
          <button 
            onClick={onLoginClick}
            className="font-bold text-amber-700 hover:text-amber-900 underline transition-all"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
