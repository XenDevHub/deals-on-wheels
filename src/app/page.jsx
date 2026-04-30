// src/app/page.jsx
"use client";

import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// Lazy load sections to improve initial performance and scroll fluidity
const RentalSection = lazy(() => import("@/components/RentalSection"));
const SalesSection = lazy(() => import("@/components/SalesSection"));

const SectionLoader = () => (
  <div className="w-full py-24 flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background selection:bg-accent selection:text-white overflow-x-hidden">
      <Navbar />
      
      {/* Hero is above the fold, so we load it immediately */}
      <HeroSection />
      
      <div className="relative">
        <Suspense fallback={<SectionLoader />}>
          <RentalSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <SalesSection />
        </Suspense>
      </div>
      
      {/* Footer */}
      <footer className="relative py-20 bg-background-darkest border-t border-accent/5 flex flex-col items-center justify-center text-center">
        <div className="container mx-auto px-6 z-10 flex flex-col items-center">
          <h2 className="text-[10vw] font-bebas text-heading/10 leading-none tracking-tighter select-none mb-12">
            DEALS ON WHEELS
          </h2>
          <div className="flex gap-8 mb-8 text-[10px] uppercase tracking-widest font-bold text-body/40">
            <a href="#" className="hover:text-accent transition-colors">Facebook</a>
            <a href="#" className="hover:text-accent transition-colors">Instagram</a>
            <a href="#" className="hover:text-accent transition-colors">WhatsApp</a>
          </div>
          <p className="text-[8px] text-body/20 uppercase tracking-widest">
            © {new Date().getFullYear()} Deals on Wheels. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
