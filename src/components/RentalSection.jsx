"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export default function RentalSection() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchRentalCars = async () => {
      const { data } = await supabase
        .from("cars")
        .select("*")
        .in("type", ["rental", "both"])
        .eq("available", true)
        .order("createdAt", { ascending: false })
        .limit(3);
      setCars(data || []);
    };
    fetchRentalCars();
  }, []);

  if (cars.length === 0) return null;

  return (
    <section className="py-16 md:py-24 max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8 md:mb-12">
        <div className="space-y-2">
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs block">Premium Fleet</span>
          <h2 className="font-display text-3xl md:text-4xl 2xl:text-5xl font-black text-slate-900 leading-tight">Curated Rental Experience</h2>
        </div>
        <Link className="text-primary font-bold flex items-center gap-2 hover:translate-x-2 transition-transform uppercase tracking-widest text-xs" href="/fleet">
          View Full Fleet <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-[0px_4px_30px_rgba(0,0,0,0.05)] border border-slate-100 group hover:shadow-2xl transition-all duration-500">
            <div className="h-64 overflow-hidden relative bg-slate-100">
              {car.images?.[0] ? (
                <Image
                  src={car.images[0]}
                  alt={car.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-[48px]">directions_car</span>
                </div>
              )}
              {car.insuranceIncluded && (
                <div className="absolute top-4 right-4">
                  <span className="bg-green-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">verified_user</span> Insured
                  </span>
                </div>
              )}
              {car.premium && (
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Premium</span>
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-1">{car.name}</h3>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">{car.brand} • {car.year}</p>
                </div>
                <div className="text-right">
                  <span className="text-primary font-display text-xl font-black">${car.rentalWeekly?.toLocaleString()}</span>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">/ Week</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 py-6 border-y border-slate-50 mb-8">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px] font-bold">airline_seat_recline_normal</span>
                  <span className="text-[10px] font-black text-slate-700 uppercase">{car.seats || 5}</span>
                </div>
                <div className="flex items-center gap-2 border-x border-slate-50 px-2 justify-center">
                  <span className="material-symbols-outlined text-primary text-[18px] font-bold">settings</span>
                  <span className="text-[10px] font-black text-slate-700 uppercase">{car.transmission === "Manual" ? "MNL" : "AUTO"}</span>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <span className="material-symbols-outlined text-primary text-[18px] font-bold">local_gas_station</span>
                  <span className="text-[10px] font-black text-slate-700 uppercase">{car.fuelType?.substring(0,3) || "PET"}</span>
                </div>
              </div>

              <Link href="/fleet" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all block text-center shadow-lg shadow-slate-200 hover:shadow-primary/30">
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
