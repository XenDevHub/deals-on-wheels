// src/components/RentalSection.jsx
"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import CarCard from "./CarCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

// Dynamic import for BookingEngine with SSR disabled to boost performance
const BookingEngine = dynamic(() => import("./BookingEngine"), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
});

const RentalSection = () => {
  const { t } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only fetch data when section is close to viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    const section = document.getElementById("rentals");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const fetchCars = async () => {
      try {
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .in("type", ["rental", "both"])
          .limit(12)
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
  }, [isVisible]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        type: "tween",
        ease: "easeOut",
        duration: 0.5
      }
    }
  };

  return (
    <section id="rentals" className="relative py-24 md:py-32 bg-background-secondary overflow-hidden gpu">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col items-center md:items-start mb-16"
        >
          <div className="w-12 h-[1px] bg-accent/30 mb-8" />
          <h2 className="text-4xl md:text-6xl font-bebas tracking-wide text-heading uppercase heading-underline">
            {t.rentals.title}
          </h2>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-96 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : cars.length > 0 ? (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {cars.map((car) => (
              <CarCard 
                key={car.id}
                car={car} 
                mode="rental" 
                onBook={(car) => setSelectedCar(car)} 
              />
            ))}
          </motion.div>
        ) : (
          <div className="w-full py-24 flex justify-center items-center border border-dashed border-accent/10 rounded-xl">
            <p className="text-sm font-mono text-body/40 uppercase tracking-widest">{t.rentals.noCars}</p>
          </div>
        )}
      </div>

      {selectedCar && (
        <Suspense fallback={null}>
          <BookingEngine 
            car={selectedCar} 
            isOpen={!!selectedCar} 
            onClose={() => setSelectedCar(null)} 
          />
        </Suspense>
      )}
    </section>
  );
};

export default RentalSection;
