// src/components/SalesSection.jsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import CarCard from "./CarCard";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const SalesSection = () => {
  const { t } = useLanguage();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    const section = document.getElementById("sales");
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
          .in("type", ["sale", "both"])
          .limit(12)
          .order("createdAt", { ascending: false });

        if (error) throw error;
        setCars(data || []);
      } catch (error) {
        console.error("Error fetching sales cars:", error);
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
    <section id="sales" className="relative py-24 md:py-32 bg-background-darkest overflow-hidden gpu">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="flex flex-col items-center md:items-end mb-16 text-center md:text-right"
        >
          <div className="w-12 h-[1px] bg-accent/30 mb-8" />
          <h2 className="text-4xl md:text-6xl font-bebas tracking-wide text-heading uppercase heading-underline">
            {t.sales.title}
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
                mode="sale" 
              />
            ))}
          </motion.div>
        ) : (
          <div className="w-full py-24 flex justify-center items-center border border-dashed border-accent/10 rounded-xl">
            <p className="text-sm font-mono text-body/40 uppercase tracking-widest">{t.sales.noCars}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SalesSection;
