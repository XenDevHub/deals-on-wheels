// src/components/Navbar.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

const Navbar = () => {
  const { lang, t, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: t.nav.home, id: "hero" },
    { name: t.nav.rentals, id: "rentals" },
    { name: t.nav.sales, id: "sales" },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        isScrolled ? "nav-blur py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="text-2xl md:text-3xl font-bebas text-white cursor-pointer tracking-[0.1em] hover:opacity-80 transition-opacity"
          onClick={() => scrollTo("hero")}
        >
          DEALS ON WHEELS
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <button
              key={link.id + link.name}
              onClick={() => scrollTo(link.id)}
              className="text-xs uppercase tracking-[0.15em] font-medium text-white/70 hover:text-white transition-colors cursor-pointer relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-white transition-all group-hover:w-full group-hover:left-0"></span>
            </button>
          ))}

          <button
            onClick={() => scrollTo("rentals")}
            className="text-xs uppercase tracking-[0.15em] font-medium text-primary hover:text-white transition-colors cursor-pointer"
          >
            {t.nav.bookNow}
          </button>

          <Link
            href="/admin"
            className="text-xs uppercase tracking-[0.15em] font-medium text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            Admin
          </Link>

          {/* Language Switcher */}
          <div className="w-[1px] h-4 bg-white/20 mx-2"></div>
          <button 
            onClick={toggleLanguage}
            className="text-xs uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors"
          >
            {lang === "bn" ? "EN" : "BN"}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-6">
           <button 
            onClick={toggleLanguage}
            className="text-xs uppercase tracking-widest font-bold text-white/50 hover:text-white"
          >
            {lang === "bn" ? "EN" : "BN"}
          </button>
           <button 
            className="z-[60] p-2 relative w-8 h-8 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-4 relative flex flex-col justify-between">
              <motion.span 
                animate={isMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-full h-[1px] bg-white block origin-center transition-transform"
              />
              <motion.span 
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-[1px] bg-white block transition-opacity"
              />
              <motion.span 
                animate={isMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-full h-[1px] bg-white block origin-center transition-transform"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Fullscreen Minimal Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#050505] z-50 flex flex-col items-center justify-center space-y-12 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                onClick={() => scrollTo(link.id)}
                className="text-5xl font-bebas text-white hover:text-white/50 transition-colors tracking-widest"
              >
                {link.name}
              </motion.button>
            ))}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => scrollTo("rentals")}
                className="text-5xl font-bebas text-primary hover:text-primary/50 transition-colors tracking-widest"
              >
                {t.nav.bookNow}
            </motion.button>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bebas text-white/50 hover:text-white transition-colors tracking-widest mt-8 block"
              >
                ADMIN LOGIN
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
