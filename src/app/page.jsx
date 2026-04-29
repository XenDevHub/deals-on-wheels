// src/app/page.jsx
"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RentalSection from "@/components/RentalSection";
import SalesSection from "@/components/SalesSection";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen bg-[#080c14] selection:bg-white/20 selection:text-white">
      <Navbar />
      <HeroSection />
      <RentalSection />
      <SalesSection />
      
      {/* Monumental Luxury Footer */}
      <footer className="relative py-24 md:py-32 bg-[#080c14] border-t border-white/5 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="container mx-auto px-6 z-10 flex flex-col items-center">
          
          <div className="mb-16 md:mb-24 flex flex-col items-center">
            <h2 className="text-[12vw] md:text-[8vw] font-bebas text-white leading-none tracking-tighter hover:tracking-normal transition-all duration-700 select-none">
              DEALS ON WHEELS
            </h2>
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8 mb-8" />
            <p className="text-xs md:text-sm text-white/40 uppercase tracking-[0.3em] font-medium max-w-xl">
              {t.footer.slogan}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 text-xs uppercase tracking-[0.2em] font-bold text-white/50">
            <a href="#" className="hover:text-white transition-colors relative group">
              Facebook
              <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white transition-all group-hover:w-full group-hover:left-0"></span>
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Instagram
              <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white transition-all group-hover:w-full group-hover:left-0"></span>
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              WhatsApp
              <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white transition-all group-hover:w-full group-hover:left-0"></span>
            </a>
          </div>

          <p className="text-[9px] text-white/20 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Deals on Wheels. {t.footer.rights}
          </p>
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />
      </footer>
    </main>
  );
}
