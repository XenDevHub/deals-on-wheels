"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { openWhatsApp } from "@/lib/whatsapp";
import Image from "next/image";
import Link from "next/link";

export default function SalesSection() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchSaleCars = async () => {
      const { data } = await supabase
        .from("cars")
        .select("*")
        .in("type", ["sale", "both"])
        .eq("available", true)
        .order("createdAt", { ascending: false })
        .limit(4);
      setCars(data || []);
    };
    fetchSaleCars();
  }, []);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "61433178890";

  const handleBuy = (car) => {
    const message = `Hi Deals on Wheels! I'm interested in buying the ${car.name} (${car.year}). Price: $${car.price?.toLocaleString()}. Please contact me.`;
    openWhatsApp(whatsappNumber, message);
  };

  if (cars.length === 0) return null;

  return (
    <section className="py-16 md:py-24 max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 md:mb-12">
        <div className="space-y-2">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs block">Certified Sales</span>
          <h2 className="font-display text-3xl md:text-4xl 2xl:text-5xl font-black text-slate-900 leading-tight">Find Your Permanent Drive</h2>
        </div>
        <Link className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform uppercase tracking-widest text-xs" href="/sales">
          Explore Inventory <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
            <div className="h-48 relative overflow-hidden bg-slate-100">
              {car.images?.[0] ? (
                <Image
                  src={car.images[0]}
                  alt={car.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-[48px]">directions_car</span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full text-slate-900 uppercase tracking-widest border border-slate-100 shadow-sm">Certified</span>
              </div>
            </div>
            <div className="p-6">
              <h4 className="font-display text-lg font-bold text-slate-900 mb-1 truncate">{car.name}</h4>
              <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-4">
                {car.brand} • {car.year}
              </p>

              <div className="flex items-center gap-4 py-3 border-y border-slate-50 mb-6">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[16px] font-bold">airline_seat_recline_normal</span>
                  <span className="text-[10px] font-black text-slate-700">{car.seats || 5}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[16px] font-bold">settings</span>
                  <span className="text-[10px] font-black text-slate-700">{car.transmission === "Manual" ? "MNL" : "AUTO"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[16px] font-bold">local_gas_station</span>
                  <span className="text-[10px] font-black text-slate-700">{car.fuelType?.substring(0, 3) || "PET"}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">Fixed Price</span>
                  <span className="font-display text-xl font-black text-slate-900">${car.price?.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => handleBuy(car)}
                  className="w-10 h-10 rounded-xl bg-slate-50 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all group/btn"
                >
                  <span className="material-symbols-outlined text-lg group-hover/btn:scale-110 transition-transform">shopping_bag</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
