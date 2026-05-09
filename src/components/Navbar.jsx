"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-slate-950 docked full-width top-0 sticky z-50 border-b border-slate-100 dark:border-slate-800 shadow-[0px_4px_20px_rgba(30,41,59,0.05)]">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-2 max-w-7xl 2xl:max-w-screen-2xl mx-auto">
        <Link href="/" className="flex items-center gap-2 md:gap-4 group transition-transform hover:scale-[1.02] active:scale-95 duration-200">
          <div className="relative h-10 w-10 md:h-16 md:w-16">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter font-display italic">
            Deals<span className="text-primary">On</span>Wheels
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="font-display font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/fleet">Rent</Link>
          <Link className="font-display font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/sales">Buy</Link>
          <Link className="font-display font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/how-it-works">How it Works</Link>
          <Link className="font-display font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/about">About</Link>
          <Link className="font-display font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/#contact">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="hidden md:inline-flex bg-primary text-on-primary px-6 py-2.5 rounded-lg font-button hover:opacity-80 transition-opacity active:scale-95 duration-200">
            Admin
          </Link>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-slate-900 dark:bg-slate-200 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-slate-900 dark:bg-slate-200 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-slate-900 dark:bg-slate-200 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div >
      {/* Mobile Menu */}
      {
        mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-6 space-y-4 animate-in slide-in-from-top">
            <Link onClick={() => setMobileMenuOpen(false)} className="block font-display font-medium text-slate-600 hover:text-primary transition-colors py-2" href="/fleet">Rent</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="block font-display font-medium text-slate-600 hover:text-primary transition-colors py-2" href="/sales">Buy</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="block font-display font-medium text-slate-600 hover:text-primary transition-colors py-2" href="/how-it-works">How it Works</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="block font-display font-medium text-slate-600 hover:text-primary transition-colors py-2" href="/about">About</Link>
            <Link onClick={() => setMobileMenuOpen(false)} href="/admin" className="block bg-primary text-on-primary px-6 py-2.5 rounded-lg font-button text-center hover:opacity-80 transition-opacity">
              Admin
            </Link>
          </div>
        )
      }
    </header >
  );
}
