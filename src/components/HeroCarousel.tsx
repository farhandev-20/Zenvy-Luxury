import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface CarouselSlide {
  id: string;
  subtitle: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  ctaText: string;
  tag: string;
  bgGradient: string;
  tagBg: string;
  tagText: string;
  actionType: 'silk_gold' | 'resort' | 'soiree';
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    subtitle: 'SPRING COLLECTION 2026',
    title: 'SILK & GOLD',
    highlight: 'FLOW',
    description: 'Experience our beautiful silk products made with high-quality gold thread.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'EXPLORE NOW',
    tag: 'NEW EXCLUSIVE',
    bgGradient: 'from-stone-950/60 via-stone-900/40 to-transparent',
    tagBg: 'bg-amber-400 text-stone-950',
    tagText: 'text-[#fcd34d]',
    actionType: 'silk_gold'
  },
  {
    id: 'slide-2',
    subtitle: 'SUMMER SUITE • NEW ARRIVALS',
    title: 'THE RIVIERA',
    highlight: 'ESCAPE',
    description: 'Comfortable suits made for sunny afternoons and warm ocean shores. High-quality lightweight linen.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'VIEW CLOTHES',
    tag: 'LIMITED EDITION',
    bgGradient: 'from-blue-950/60 via-stone-900/40 to-transparent',
    tagBg: 'bg-sky-200 text-sky-950',
    tagText: 'text-sky-300',
    actionType: 'resort'
  },
  {
    id: 'slide-3',
    subtitle: 'MIDNIGHT LOOKS • EVENING WEAR',
    title: 'NOCTURNAL',
    highlight: 'GLAMOUR',
    description: 'Special styles made with beautiful midnight velvet and deep black colors.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1600',
    ctaText: 'SHOP NOW',
    tag: 'EXCLUSIVE DESIGN',
    bgGradient: 'from-purple-950/60 via-stone-900/40 to-transparent',
    tagBg: 'bg-indigo-900/80 text-indigo-100 border border-indigo-500/30',
    tagText: 'text-indigo-300',
    actionType: 'soiree'
  }
];

interface HeroCarouselProps {
  onSelectionAction?: (actionType: 'silk_gold' | 'resort' | 'soiree') => void;
}

export default function HeroCarousel({ onSelectionAction }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto transition every 6 seconds unless hovered
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Slide variants for exquisite transition effects matching our premium branding
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.6, ease: 'easeOut' }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  const activeSlide = CAROUSEL_SLIDES[currentIndex];

  const handleCtaClick = () => {
    if (onSelectionAction) {
      onSelectionAction(activeSlide.actionType);
    } else {
      alert(`Opening: ${activeSlide.title} Collection.`);
    }
  };

  // Touch swipe support for mobile
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      handleNext(); // swipe left -> next
    } else if (diff < -50) {
      handlePrev(); // swipe right -> prev
    }
    setTouchStartX(null);
  };

  return (
    <div 
      id="hero-carousel-container"
      className="relative w-full rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden min-h-[340px] h-[360px] sm:h-[420px] md:h-auto md:aspect-[21/9] bg-stone-950 group/carousel select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          {/* Main Visual Frame */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-referrer filter brightness-90 transition-transform duration-[8000ms] ease-out scale-100 group-hover/carousel:scale-105"
            style={{ backgroundImage: `url('${activeSlide.image}')` }}
            referrerPolicy="no-referrer"
          />
          
          {/* Overlay Soft Matte Shadow Gradients */}
          <div className={`absolute inset-0 bg-gradient-to-r ${activeSlide.bgGradient}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-stone-950/20" />

          {/* Core Content Box Panel */}
          <div className="absolute inset-0 flex items-center px-5 sm:px-12 md:px-20 z-10">
            <div className="max-w-2xl text-white space-y-3 sm:space-y-4 md:space-y-6">
              
              {/* Category Pill Tag */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2"
              >
                <span className={`text-[8px] md:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.25em] px-3 py-1 sm:px-3.5 sm:py-1.5 uppercase rounded-full shadow ${activeSlide.tagBg}`}>
                  {activeSlide.tag}
                </span>
                <span className={`hidden sm:flex items-center gap-1.5 text-[9px] font-mono tracking-widest font-semibold ${activeSlide.tagText}`}>
                  <Sparkles size={11} className="animate-pulse" />
                  AUTHENTIC DESIGN
                </span>
              </motion.div>

              {/* Subtitle Line */}
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.35em] sm:tracking-[0.45em] text-stone-200 block font-mono font-medium uppercase"
              >
                {activeSlide.subtitle}
              </motion.span>

              {/* Magnificent Editorial Display Heading */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-serif text-2xl sm:text-4xl md:text-6xl font-light tracking-wider sm:tracking-widest leading-tight sm:leading-none text-white uppercase"
              >
                {activeSlide.title}<br />
                <span className="font-serif font-semibold italic text-amber-300 drop-shadow-md">
                  {activeSlide.highlight}
                </span>
              </motion.h2>

              {/* Elegant Description paragraph */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xs sm:text-sm text-stone-200/90 tracking-wide font-light max-w-md leading-relaxed line-clamp-2 sm:line-clamp-none"
              >
                {activeSlide.description}
              </motion.p>

              {/* Gorgeous Button Action */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-1 sm:pt-2"
              >
                <button 
                  onClick={handleCtaClick}
                  className="group/btn relative px-6 sm:px-8 py-3 sm:py-3.5 bg-[#f59e0b] hover:bg-[#d97706] text-stone-950 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] rounded-full transition-all duration-300 hover:scale-[1.04] shadow-lg active:translate-y-0.5 flex items-center gap-2"
                >
                  <span>{activeSlide.ctaText}</span>
                  <ArrowRight size={13} className="transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </button>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Sliding Chevrons - Visible on mobile for easy navigation */}
      <button
        onClick={handlePrev}
        aria-label="Previous Featured Slide"
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-stone-900/60 md:bg-stone-900/45 hover:bg-stone-900/80 border border-stone-800/40 text-white rounded-full flex items-center justify-center transition-all opacity-80 md:opacity-0 md:group-hover/carousel:opacity-100 hover:scale-105"
      >
        <ChevronLeft size={16} className="md:w-6 md:h-6" />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Featured Slide"
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-stone-900/60 md:bg-stone-900/45 hover:bg-stone-900/80 border border-stone-800/40 text-white rounded-full flex items-center justify-center transition-all opacity-80 md:opacity-0 md:group-hover/carousel:opacity-100 hover:scale-105"
      >
        <ChevronRight size={16} className="md:w-6 md:h-6" />
      </button>

      {/* Elegant Mini Slide Indicators on Bottom-Right */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-8 md:right-16 z-20 flex items-center gap-2 sm:gap-3 bg-stone-950/60 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-stone-800/25">
        {CAROUSEL_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => handleDotClick(idx)}
            className="group/indicator relative"
            aria-label={`Show slide ${idx + 1}`}
          >
            {/* Elegant horizontal sliding timeline bars */}
            <div className={`h-1 rounded-full transition-all duration-500 relative overflow-hidden ${
              idx === currentIndex ? 'w-6 sm:w-8 bg-amber-400' : 'w-2 sm:w-3 bg-stone-500 hover:bg-stone-400'
            }`}>
              {idx === currentIndex && !isHovered && (
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                  className="absolute inset-0 bg-white"
                />
              )}
            </div>
          </button>
        ))}
        <span className="font-mono text-[8px] sm:text-[9px] font-bold text-stone-300 ml-1 select-none">
          {currentIndex + 1}/{CAROUSEL_SLIDES.length}
        </span>
      </div>

    </div>
  );
}
