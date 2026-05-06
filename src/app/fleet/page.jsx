"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingEngine from "@/components/BookingEngine";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function FleetPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Filter state
  const [brandFilter, setBrandFilter] = useState("all");
  const [transmissionFilter, setTransmissionFilter] = useState("all");
  const [fuelFilter, setFuelFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const uniqueBrands = useMemo(() => {
    return [...new Set(cars.map((c) => c.brand).filter(Boolean))].sort();
  }, [cars]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .in("type", ["rental", "both"])
      .eq("available", true)
      .order("createdAt", { ascending: false });

    if (!error) setCars(data || []);
    setLoading(false);
  };

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (brandFilter !== "all" && car.brand !== brandFilter) return false;
      if (transmissionFilter !== "all" && car.transmission !== transmissionFilter) return false;
      if (fuelFilter !== "all" && car.fuelType !== fuelFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!car.name?.toLowerCase().includes(q) && !car.brand?.toLowerCase().includes(q) && !car.model?.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [cars, brandFilter, transmissionFilter, fuelFilter, searchQuery]);

  const resetFilters = () => {
    setBrandFilter("all");
    setTransmissionFilter("all");
    setFuelFilter("all");
    setSearchQuery("");
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [brandFilter, transmissionFilter, fuelFilter, searchQuery]);

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  
  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCars.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCars, currentPage]);

  const handleBook = (car) => {
    setSelectedCar(car);
    setIsBookingOpen(true);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col">
      <Navbar />
      
      {/* Premium Header Section */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#3b82f6,transparent_70%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-sm block mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">Premium Fleet</span>
          <h1 className="font-display text-5xl lg:text-7xl font-black text-white leading-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Our Rental <span className="text-primary italic">Fleet</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000">
            High-performance vehicles for every journey. Discover the perfect match for your lifestyle and driving needs.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-8 py-16 flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-2">
            <span className="w-12 h-0.5 bg-primary" />
            <span className="font-display font-bold text-slate-900 tracking-wider uppercase text-sm">Refine your search</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-xl">search</span>
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-[52px] rounded-xl border border-slate-200 bg-white pl-12 pr-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm w-full md:w-64 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(30,41,59,0.05)] border border-slate-100">
              <h3 className="font-h3 text-h3 mb-6">Filters</h3>

              {/* Brand */}
              <div className="mb-8">
                <p className="font-label-lg text-label-lg text-tertiary uppercase tracking-wider mb-4">Brand</p>
                <div className="flex flex-wrap gap-2">
                  {["all", ...uniqueBrands].map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrandFilter(b)}
                      className={`px-4 py-2 rounded-full border font-label-md text-label-md transition-colors ${
                        brandFilter === b
                          ? "border-primary bg-primary/10 text-primary font-bold"
                          : "border-outline-variant hover:border-primary text-on-surface-variant"
                      }`}
                    >
                      {b === "all" ? "All" : b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transmission */}
              <div className="mb-8">
                <p className="font-label-lg text-label-lg text-tertiary uppercase tracking-wider mb-4">Transmission</p>
                <div className="flex flex-wrap gap-2">
                  {["all", "Automatic", "Manual"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTransmissionFilter(t)}
                      className={`px-4 py-2 rounded-full border font-label-md text-label-md transition-colors ${
                        transmissionFilter === t
                          ? "border-primary bg-primary/10 text-primary font-bold"
                          : "border-outline-variant hover:border-primary text-on-surface-variant"
                      }`}
                    >
                      {t === "all" ? "All" : t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fuel Type */}
              <div className="mb-8">
                <p className="font-label-lg text-label-lg text-tertiary uppercase tracking-wider mb-4">Fuel Type</p>
                <div className="flex flex-wrap gap-2">
                  {["all", "Petrol", "Diesel", "Electric", "Hybrid", "CNG"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFuelFilter(f)}
                      className={`px-4 py-2 rounded-full border font-label-md text-label-md transition-colors ${
                        fuelFilter === f
                          ? "border-primary bg-primary/10 text-primary font-bold"
                          : "border-outline-variant hover:border-primary text-on-surface-variant"
                      }`}
                    >
                      {f === "all" ? "All" : f}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="w-full py-3 bg-secondary-container text-on-secondary-container rounded-lg font-button text-button hover:opacity-90 transition-opacity"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Fleet Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="text-center py-20 text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px] mb-4 block opacity-40">directions_car</span>
                <p className="font-h3 text-h3 mb-2">No cars found</p>
                <p className="text-sm">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedCars.map((car) => (
                  <div key={car.id} className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(30,41,59,0.05)] border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      {car.images?.[0] ? (
                        <Image src={car.images[0]} alt={car.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <span className="material-symbols-outlined text-[48px]">directions_car</span>
                        </div>
                      )}
                      {car.premium && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-md text-primary font-label-md text-label-md px-3 py-1 rounded-full shadow-sm">Premium</span>
                        </div>
                      )}
                      {car.insuranceIncluded && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-green-500/90 backdrop-blur-md text-white font-label-md text-label-md px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">verified_user</span> Insured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-h3 text-h3 mb-1">{car.name}</h3>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">{car.brand} • {car.year}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-h3 text-h3 text-primary">৳{car.rentalDaily?.toLocaleString()}</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-y-3 gap-x-4 mb-6">
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[20px]">airline_seat_recline_extra</span>
                          <span className="font-body-sm text-body-sm">{car.seats || 5} Seats</span>
                        </div>
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[20px]">settings</span>
                          <span className="font-body-sm text-body-sm">{car.transmission || "Auto"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-on-surface-variant">
                          <span className="material-symbols-outlined text-[20px]">local_gas_station</span>
                          <span className="font-body-sm text-body-sm">{car.fuelType || "Petrol"}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleBook(car)}
                        className="w-full py-4 bg-primary text-on-primary rounded-xl font-button text-button hover:opacity-90 active:scale-[0.98] transition-all"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && !loading && filteredCars.length > 0 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-full font-label-md text-label-md transition-colors ${
                        currentPage === page
                          ? "bg-primary text-on-primary"
                          : "text-on-surface-variant hover:bg-surface-container"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant text-on-surface-variant hover:bg-surface-container disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />

      {selectedCar && (
        <BookingEngine car={selectedCar} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      )}
    </div>
  );
}
