// src/components/CarCard.jsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { openWhatsApp } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/LanguageContext";

const CarCard = ({ car, mode, onBook }) => {
  const { t } = useLanguage();
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
          <div className="flex items-center gap-3 text-[10px] text-white/40 uppercase tracking-[0.15em] mb-8 font-medium">
            <span>{car.brand}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{car.year}</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{car.model}</span>
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
    </motion.div>
  );
};

export default CarCard;
