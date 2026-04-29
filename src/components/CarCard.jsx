// src/components/CarCard.jsx
"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { openWhatsApp } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/LanguageContext";

const CarCard = ({ car, mode, onBook }) => {
  const { t } = useLanguage();
  const [showTerms, setShowTerms] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801XXXXXXXXX";

  const handleInquiry = () => {
    const message = `Hi Deals on Wheels! I'm interested in a long-term rental for the ${car.name}. Please share details.`;
    openWhatsApp(whatsappNumber, message);
  };

  const handleBuy = () => {
    const message = `Hi Deals on Wheels! I'm interested in buying the ${car.name} (ID: ${car.id}). Please contact me.`;
    openWhatsApp(whatsappNumber, message);
  };

  return (
    <>
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative w-full bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden hover:border-white/20 transition-colors duration-500 flex flex-col"
    >
      {/* Glow effect behind card */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 z-0 pointer-events-none" />

      {/* Badge */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${car.available ? "bg-primary animate-pulse" : "bg-red-500"}`} />
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/70">
          {car.available ? t.carCard.available : t.carCard.sold}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden z-10 bg-[#050505]">
        <Image
          src={car.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"}
          alt={car.name}
          fill
          className="object-cover object-center transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        {/* Sleek gradient overlay instead of heavy black */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
      </div>

      {/* Info Section */}
      <div className="p-8 z-10 flex-grow flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
        <div>
          <h3 className="text-3xl font-bebas tracking-wide text-white mb-1 uppercase">{car.name}</h3>
          <div className="flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-[0.15em] mb-4 font-medium">
            <span>{car.brand}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{car.year}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{car.model}</span>
          </div>

          {/* New Specs Icons: Horizontal & Gray */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4 mb-8 py-6 border-y border-white/5">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span className="text-[10px] text-white/80 font-mono tracking-tight whitespace-nowrap">{car.seats || 5} Seats</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span className="text-[10px] text-white/80 font-mono tracking-tight whitespace-nowrap">{car.suitcases || 2} Bags</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-[10px] text-white/80 font-mono tracking-tight whitespace-nowrap">{car.transmission || "Auto"}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="text-[10px] text-white/80 font-mono tracking-tight whitespace-nowrap">{car.gps ? "GPS" : "No GPS"}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-10.426A7.29 7.29 0 013 11c0-2.348.966-4.47 2.522-5.978m9.226 13.253a7.29 7.29 0 004.73-3.722C19.82 13.013 20 11.831 20 10.614c0-2.348-.966-4.47-2.522-5.978m-9.226 0a7.29 7.29 0 014.73-3.722C13.82 2.013 14 3.191 14 4.408c0 1.216-.18 2.398-.522 3.516" /></svg>
              <span className="text-[10px] text-white/80 font-mono tracking-tight whitespace-nowrap">Age: {car.minAge || 25}+</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <span className="text-[10px] text-white/80 font-mono tracking-tight whitespace-nowrap">{car.doors || 4} Doors</span>
            </div>
            {car.premium && (
              <div className="flex items-center gap-2 col-span-2">
                <span className="text-[9px] font-bold tracking-[0.2em] text-primary border border-primary/20 px-3 py-1 rounded-none uppercase bg-primary/5">PREMIUM BRAND</span>
              </div>
            )}
          </div>
        </div>

        {mode === "rental" ? (
          <div className="space-y-8 mt-auto">
            {/* Spec Sheet Style Pricing */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/10 pt-6">
              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase tracking-[0.15em] mb-1">{t.carCard.daily}</span>
                <span className="text-lg font-mono text-white">৳{car.rentalDaily}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase tracking-[0.15em] mb-1">{t.carCard.weekly}</span>
                <span className="text-lg font-mono text-white">৳{car.rentalWeekly}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => onBook(car)}
                disabled={!car.available}
                className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {t.carCard.bookBtn}
              </button>
              <button
                onClick={handleInquiry}
                className="w-full py-4 bg-transparent border border-white/10 text-white font-bold text-xs uppercase tracking-widest transition-all hover:border-white/40 active:scale-[0.98]"
              >
                {t.carCard.inquiryBtn}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 mt-auto">
            <div className="border-t border-white/10 pt-6">
              <span className="text-[9px] text-white/40 uppercase tracking-[0.15em] mb-1 block">{t.carCard.priceLabel}</span>
              <span className="text-4xl font-bebas text-white">৳{car.price?.toLocaleString()}</span>
            </div>

            <div className="pt-4 border-t border-white/5">
              <button
                onClick={handleBuy}
                disabled={!car.available}
                className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                <span>{t.carCard.buyBtn}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Terms Link */}
      {mode === "rental" && (
        <button 
          onClick={() => setShowTerms(true)}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] text-white/20 uppercase tracking-widest hover:text-primary transition-colors"
        >
          View Rental Terms
        </button>
      )}
    </motion.div>

    {/* Terms & Conditions Modal - MOVED OUTSIDE to avoid overflow clipping */}
    <AnimatePresence>
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTerms(false)} className="absolute inset-0 bg-[#050505]/95 backdrop-blur-md" />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 p-10 overflow-y-auto max-h-[80vh] no-scrollbar z-50"
          >
            <h3 className="text-3xl font-bebas tracking-widest text-white mb-6 uppercase">Rental Terms & Conditions</h3>
            <div className="space-y-4 text-sm text-white/60 leading-relaxed font-light tracking-wide whitespace-pre-line">
              {car.terms || `01. Minimum Age: Driver must be at least ${car.minAge || 25} years old with a valid driving license.
02. Identification: Passport or National ID required for security verification.
03. Security Deposit: A refundable security deposit of ৳20,000 is required upon delivery.
04. Usage: Vehicle must be driven within national boundaries only.
05. Fuel Policy: Vehicle will be delivered with a full tank and must be returned with a full tank.`}
            </div>
            <button onClick={() => setShowTerms(false)} className="w-full mt-10 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest transition-all hover:bg-white/90">
              UNDERSTOOD
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
};

export default CarCard;
