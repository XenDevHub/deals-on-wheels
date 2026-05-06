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
    <section className="py-section-gap max-w-7xl mx-auto px-8">
      <div className="flex justify-between items-end mb-stack-lg">
        <div className="space-y-stack-sm">
          <span className="text-primary font-label-lg uppercase tracking-widest">Premium Fleet</span>
          <h2 className="font-h2 text-h2">Curated Rental Experience</h2>
        </div>
        <Link className="text-primary font-button flex items-center gap-2 hover:underline" href="/fleet">
          View All Fleet <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(30,41,59,0.05)] overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="h-64 overflow-hidden relative bg-slate-100">
              {car.images?.[0] ? (
                <Image
                  src={car.images[0]}
                  alt={car.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-[48px]">directions_car</span>
                </div>
              )}
              {car.insuranceIncluded && (
                <div className="absolute top-4 right-4 bg-green-500/90 text-white px-3 py-1 rounded text-label-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified_user</span> Insured
                </div>
              )}
              {car.premium && (
                <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded text-label-md">PREMIUM</div>
              )}
            </div>
            <div className="p-stack-lg">
              <div className="flex justify-between items-start mb-stack-md">
                <div>
                  <h3 className="font-h3 text-h3">{car.name}</h3>
                  <p className="text-on-surface-variant text-body-sm">{car.brand} • {car.year}</p>
                </div>
                <div className="text-right">
                  <span className="text-primary font-h3">৳{car.rentalDaily?.toLocaleString()}</span>
                  <p className="text-label-md text-on-surface-variant uppercase">/ Day</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 py-stack-md border-y border-outline-variant/30 mb-stack-md">
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-outline">airline_seat_recline_normal</span>
                  <span className="text-label-md">{car.seats || 5} Seats</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-outline">settings</span>
                  <span className="text-label-md">{car.transmission === "Manual" ? "Manual" : "Auto"}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-outline">local_gas_station</span>
                  <span className="text-label-md">{car.fuelType || "Petrol"}</span>
                </div>
              </div>
              <Link href="/fleet" className="w-full py-3 border-2 border-primary text-primary rounded-lg font-button hover:bg-primary hover:text-on-primary transition-all block text-center">
                Rent Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
