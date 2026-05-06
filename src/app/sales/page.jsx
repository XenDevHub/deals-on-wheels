"use client";

import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { openWhatsApp } from "@/lib/whatsapp";
import Image from "next/image";

export default function SalesPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [brandFilter, setBrandFilter] = useState("All Brands");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .in("type", ["sale", "both"])
      .eq("available", true)
      .order("createdAt", { ascending: false });

    if (!error) setCars(data || []);
    setLoading(false);
  };

  const uniqueBrands = useMemo(() => {
    const brands = [...new Set(cars.map((c) => c.brand).filter(Boolean))];
    return ["All Brands", ...brands.sort()];
  }, [cars]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (brandFilter !== "All Brands" && car.brand !== brandFilter) return false;
      if (yearFrom && car.year < parseInt(yearFrom)) return false;
      if (yearTo && car.year > parseInt(yearTo)) return false;
      if (car.price > maxPrice) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!car.name?.toLowerCase().includes(q) && !car.brand?.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [cars, brandFilter, yearFrom, yearTo, maxPrice, searchQuery]);

  const resetFilters = () => {
    setBrandFilter("All Brands");
    setYearFrom("");
    setYearTo("");
    setMaxPrice(50000000);
    setSearchQuery("");
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [brandFilter, yearFrom, yearTo, maxPrice, searchQuery]);

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);

  const paginatedCars = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCars.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCars, currentPage]);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801XXXXXXXXX";

  const handleBuy = (car) => {
    const message = `Hi Deals on Wheels! I'm interested in buying the ${car.name} (${car.year}). Price: ৳${car.price?.toLocaleString()}. Please contact me.`;
    openWhatsApp(whatsappNumber, message);
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-8 py-12 flex-grow">
        {/* Search & Filter Bar */}
        <section className="mb-12">
          <div className="flex flex-col gap-6 bg-surface-container rounded-xl p-8 shadow-[0px_4px_20px_rgba(30,41,59,0.05)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="font-h1 text-h1 text-on-surface">Find Your Next Ride</h1>
              <button onClick={resetFilters} className="flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition-opacity">
                <span className="material-symbols-outlined">refresh</span>
                <span className="font-label-lg text-label-lg">Reset Filters</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Brand</label>
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="h-[48px] rounded-lg border border-outline-variant bg-white px-4 focus:ring-2 focus:ring-primary outline-none appearance-none"
                >
                  {uniqueBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Year Range</label>
                <div className="flex items-center gap-2">
                  <input
                    className="w-full h-[48px] rounded-lg border border-outline-variant bg-white px-4 focus:ring-2 focus:ring-primary outline-none"
                    placeholder="From"
                    type="number"
                    value={yearFrom}
                    onChange={(e) => setYearFrom(e.target.value)}
                  />
                  <input
                    className="w-full h-[48px] rounded-lg border border-outline-variant bg-white px-4 focus:ring-2 focus:ring-primary outline-none"
                    placeholder="To"
                    type="number"
                    value={yearTo}
                    onChange={(e) => setYearTo(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  Max Price: ৳{(maxPrice / 100000).toFixed(0)} Lakh
                </label>
                <input
                  className="accent-primary h-12 w-full"
                  type="range"
                  min={500000}
                  max={50000000}
                  step={500000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-label-md font-medium text-tertiary">
                  <span>৳5L</span>
                  <span>৳5Cr+</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Search</label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-[48px] rounded-lg border border-outline-variant bg-white px-4 focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Grid */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-h2 text-h2 text-on-surface">
              Available Inventory <span className="text-primary font-normal">({filteredCars.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 block opacity-40">storefront</span>
              <p className="font-h3 text-h3 mb-2">No cars found for sale</p>
              <p className="text-sm">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paginatedCars.map((car) => (
                <div key={car.id} className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(30,41,59,0.05)] hover:shadow-[0px_10px_30px_rgba(30,41,59,0.12)] transition-shadow duration-300">
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    {car.images?.[0] ? (
                      <Image src={car.images[0]} alt={car.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <span className="material-symbols-outlined text-[48px]">directions_car</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-h3 text-h3 text-on-surface">{car.name}</h3>
                        <p className="font-body-sm text-tertiary">{car.year} • {car.color || car.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-h3 font-h3 text-primary">৳{car.price?.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100">
                      <div className="flex flex-col items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-[20px]">speed</span>
                        <span className="text-label-md">{car.mileage || "N/A"}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                        <span className="text-label-md">{car.transmission || "Auto"}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 text-tertiary">
                        <span className="material-symbols-outlined text-[20px]">local_gas_station</span>
                        <span className="text-label-md">{car.fuelType || "Petrol"}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBuy(car)}
                      className="w-full py-4 border-2 border-primary text-primary rounded-lg font-button hover:bg-primary hover:text-on-primary transition-all duration-200"
                    >
                      Buy via WhatsApp
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
          </section>
      </main>
      <Footer />
    </div>
  );
}
