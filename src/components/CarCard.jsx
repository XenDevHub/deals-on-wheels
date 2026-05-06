// src/components/CarCard.jsx
"use client";

import Image from "next/image";
import { openWhatsApp } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/LanguageContext";

const CarCard = ({ car, mode, onBook }) => {
  const { t } = useLanguage();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "61433178890";

  const handleInquiry = () => {
    const message = `Hi Deals on Wheels! I'm interested in a long-term rental for the ${car.name}. Please share details.`;
    openWhatsApp(whatsappNumber, message);
  };

  const handleBuy = () => {
    const message = `Hi Deals on Wheels! I'm interested in buying the ${car.name} (ID: ${car.id}). Please contact me.`;
    openWhatsApp(whatsappNumber, message);
  };

  return (
    <div className="glass-card group relative w-full h-full rounded-2xl overflow-hidden flex flex-col gpu">
      {/* Badge Overlay */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2">
        <div className="flex items-center gap-2 bg-background/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/5">
          <div className={`w-1.5 h-1.5 rounded-full ${car.available ? "bg-accent" : "bg-red-500"}`} />
          <span className="text-[8px] font-bold tracking-[0.1em] uppercase text-heading">
            {car.available ? t.carCard.available : t.carCard.sold}
          </span>
        </div>
      </div>

      {/* Premium Badge */}
      {car.premium && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-gold text-background text-[8px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-sm uppercase">
            PREMIUM
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background-secondary">
        <Image
          src={car.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=75"}
          alt={car.name}
          fill
          loading="lazy"
          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/90 via-transparent to-transparent opacity-60" />
      </div>

      {/* Info Section */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="min-w-0">
            <h3 className="text-xl font-bebas tracking-wide text-heading uppercase truncate">{car.name}</h3>
            <p className="text-[9px] text-body uppercase tracking-[0.15em] opacity-60">{car.brand} • {car.year}</p>
          </div>
          <div className="text-right">
            {mode === "rental" ? (
              <div className="flex flex-col">
                <span className="text-base font-mono price-highlight">৳{car.rentalDaily}</span>
                <span className="text-[8px] text-body/50 uppercase tracking-tighter">/ Day</span>
              </div>
            ) : (
              <span className="text-lg font-bebas price-highlight">৳{car.price?.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Essential Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-accent/5 mb-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] text-body/40 uppercase tracking-tighter">Seats</span>
            <span className="text-[10px] text-heading font-mono">{car.seats || 5}</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-accent/5">
            <span className="text-[8px] text-body/40 uppercase tracking-tighter">Bags</span>
            <span className="text-[10px] text-heading font-mono">{car.suitcases || 2}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[8px] text-body/40 uppercase tracking-tighter">Trans</span>
            <span className="text-[10px] text-heading font-mono">{car.transmission === "Automatic" ? "AUTO" : "MAN"}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-auto pt-2">
          {mode === "rental" ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onBook(car)}
                disabled={!car.available}
                className="btn-primary py-2.5 px-0 text-[9px] rounded-lg"
              >
                {t.carCard.bookBtn}
              </button>
              <button
                onClick={handleInquiry}
                className="btn-secondary py-2.5 px-0 text-[9px] rounded-lg"
              >
                {t.carCard.inquiryBtn}
              </button>
            </div>
          ) : (
            <button
              onClick={handleBuy}
              disabled={!car.available}
              className="w-full btn-primary py-3 text-[9px] rounded-lg"
            >
              {t.carCard.buyBtn}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
