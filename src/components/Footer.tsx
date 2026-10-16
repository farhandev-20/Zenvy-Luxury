import React from 'react';
import { Globe, Share2, ShieldCheck, HelpCircle, LockKeyhole } from 'lucide-react';

interface FooterProps {
  brandName?: string;
}

export default function Footer({ brandName = 'ZENVY' }: FooterProps) {
  return (
    <footer id="global-zenvy-footer" className="w-full bg-[#faf8f6] border-t border-stone-200/60 pt-20 pb-10 text-stone-700 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          
          {/* Logo Brand Statement Column */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="font-serif text-3xl md:text-4xl tracking-[0.1em] text-stone-900 font-bold">
              {brandName}
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed max-w-sm">
              Crafting a new narrative in minimal luxury through curated design, sustainable craftsmanship, and timeless elegance. We believe in the power of refined simplicity.
            </p>
            {/* Round share links */}
            <div className="flex gap-3">
              <button className="w-9 h-9 rounded-full border border-stone-250 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-stone-900 hover:bg-stone-50 transition-all">
                <Globe size={14} />
              </button>
              <button className="w-9 h-9 rounded-full border border-stone-250 flex items-center justify-center text-stone-600 hover:text-stone-900 hover:border-stone-900 hover:bg-stone-50 transition-all">
                <Share2 size={13} />
              </button>
            </div>
          </div>

          {/* Directory Column 1: Collections */}
          <div className="md:col-span-2.5 space-y-4">
            <h4 className="text-[10px] tracking-[0.3em] font-semibold text-stone-900 uppercase">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-xs text-stone-500 font-light">
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Clothing</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Bags & Clutches</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Private Archive Sale</a></li>
            </ul>
          </div>

          {/* Directory Column 2: Philosophy */}
          <div className="md:col-span-2.5 space-y-4">
            <h4 className="text-[10px] tracking-[0.3em] font-semibold text-stone-900 uppercase">
              PHILOSOPHY
            </h4>
            <ul className="space-y-2 text-xs text-stone-500 font-light">
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Brand Story</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Our Craftsmanship</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Press & Media</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Directory Column 3: Assistance */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] tracking-[0.3em] font-semibold text-stone-900 uppercase">
              ASSISTANCE
            </h4>
            <ul className="space-y-2 text-xs text-stone-500 font-light">
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Free Shipping</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">FAQ & Support</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-[#dca42b] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright margin bar */}
        <div className="border-t border-stone-200/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest text-stone-400 font-mono uppercase">
          <span>
            © 2026 {brandName} LUXURY. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1"><LockKeyhole size={11} className="text-[#dca42b]" /> SECURE CHECKOUT</span>
            <span className="flex items-center gap-1"><ShieldCheck size={11} className="text-[#dca42b]" /> INSURED SHIPMENT</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
