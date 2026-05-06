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

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801XXXXXXXXX";

  const handleBuy = (car) => {
    const message = `Hi Deals on Wheels! I'm interested in buying the ${car.name} (${car.year}). Price: ৳${car.price?.toLocaleString()}. Please contact me.`;
    openWhatsApp(whatsappNumber, message);
  };

  if (cars.length === 0) return null;

  return (
    <section className="py-section-gap max-w-7xl mx-auto px-8">
      <div className="flex justify-between items-end mb-stack-lg">
        <div className="space-y-stack-sm">
          <span className="text-primary font-label-lg uppercase tracking-widest">Certified Sales</span>
          <h2 className="font-h2 text-h2">Find Your Permanent Drive</h2>
        </div>
        <Link className="text-primary font-button flex items-center gap-2 hover:underline" href="/sales">
          View All Sales <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all group">
            <div className="h-48 relative overflow-hidden bg-slate-100">
              {car.images?.[0] ? (
                <Image
                  src={car.images[0]}
                  alt={car.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <span className="material-symbols-outlined text-[48px]">directions_car</span>
                </div>
              )}
            </div>
            <div className="p-stack-md">
              <h4 className="font-h3 text-[18px]">{car.name}</h4>
              <p className="text-on-surface-variant text-body-sm mb-stack-md">
                {car.mileage ? `${car.mileage} km` : car.brand} • {car.year}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-h3 font-display">৳{car.price?.toLocaleString()}</span>
                <button
                  onClick={() => handleBuy(car)}
                  className="bg-surface-container text-primary p-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
