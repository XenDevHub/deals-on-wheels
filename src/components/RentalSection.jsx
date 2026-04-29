// src/components/RentalSection.jsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import CarCard from "./CarCard";
import BookingEngine from "./BookingEngine";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const RentalSection = () => {
  const { t } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .in("type", ["rental", "both"])
          .order("createdAt", { ascending: false });

        if (error) throw error;
        
        setCars(data || []);
      } catch (error) {
        console.error("Error fetching rental cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <section id="rentals" className="relative py-32 md:py-48 bg-[#080c14] overflow-hidden">
      {/* Watermark Text */}
      <div className="absolute top-20 left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.03] select-none">
        <span className="text-[15vw] font-bebas whitespace-nowrap">RENTALS</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center md:items-start mb-24 md:mb-32"
        >
          <div className="w-12 h-[1px] bg-white/30 mb-8" />
          <h2 className="text-5xl md:text-7xl font-bebas tracking-wide text-white uppercase">{t.rentals.title}</h2>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#0a0a0a] h-[600px] animate-pulse border border-white/5 flex flex-col">
                <div className="h-64 bg-white/5 w-full mb-8" />
                <div className="px-8 flex-grow">
                  <div className="h-8 bg-white/5 w-3/4 mb-4" />
                  <div className="h-3 bg-white/5 w-1/2 mb-12" />
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="h-10 bg-white/5" />
                    <div className="h-10 bg-white/5" />
                  </div>
                  <div className="h-12 bg-white/5 w-full mb-4" />
                  <div className="h-12 bg-white/5 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <CarCard 
                  car={car} 
                  mode="rental" 
                  onBook={(car) => setSelectedCar(car)} 
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="w-full py-32 flex justify-center items-center border border-dashed border-white/10">
            <p className="text-sm font-mono text-white/40 uppercase tracking-widest">{t.rentals.noCars}</p>
          </div>
        )}
      </div>

      {selectedCar && (
        <BookingEngine 
          car={selectedCar} 
          isOpen={!!selectedCar} 
          onClose={() => setSelectedCar(null)} 
        />
      )}
    </section>
  );
};

export default RentalSection;
