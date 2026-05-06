// src/components/BookingEngine.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { openWhatsApp } from "@/lib/whatsapp";

const BookingEngine = ({ car, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    notes: "",
  });
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "61433178890";

  const calculateDays = () => {
    if (!formData.pickupDate || !formData.returnDate) return 0;
    const start = new Date(formData.pickupDate);
    const end = new Date(formData.returnDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const totalDays = calculateDays();
  const totalCost = Math.round((totalDays * (car?.rentalWeekly || 0)) / 7);

  const isFormValid = formData.name && formData.phone && formData.pickupDate && formData.returnDate && totalDays > 0;

  const handleSave = async () => {
    if (!isFormValid) {
      alert("Please fill all required fields and ensure return date is after pickup.");
      return;
    }
    if (!hasAgreed) {
      alert("Please read and agree to the Terms & Conditions.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("bookings").insert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        carId: car.id,
        carName: car.name,
        date: formData.pickupDate,
        returnDate: formData.returnDate,
        pickupLocation: formData.pickupLocation,
        notes: formData.notes,
        totalDays,
        totalCost,
        type: "rental",
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Booking submitted successfully! We will contact you shortly.");
      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      alert("Sorry, there was an error. Please try WhatsApp booking instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    if (!isFormValid) {
      alert("Please fill all required fields.");
      return;
    }
    if (!hasAgreed) {
      alert("Please read and agree to the Terms & Conditions.");
      return;
    }

    const message = `Hello Deals on Wheels! I would like to book a rental.\n\nName: ${formData.name}\nContact: ${formData.phone}\nEmail: ${formData.email || "N/A"}\nCar: ${car.name}\nPickup: ${formData.pickupDate}\nReturn: ${formData.returnDate}\nDays: ${totalDays}\nLocation: ${formData.pickupLocation || "N/A"}\nEstimated Cost: $${totalCost.toLocaleString()}\nNotes: ${formData.notes || "None"}\n\nI have agreed to the Terms & Conditions.`;
    openWhatsApp(whatsappNumber, message);
  };

  if (!car) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Left: Car Info */}
            <div className="w-full md:w-2/5 bg-slate-50 p-6 border-b md:border-b-0 md:border-r border-slate-200 overflow-y-auto">
              <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 bg-slate-200">
                <Image
                  src={car.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=75"}
                  alt={car.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{car.name}</h2>
              <p className="text-sm text-slate-500 mb-4">{car.brand} · {car.year} · {car.transmission}</p>

              {car.insuranceIncluded && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-4">
                  <span className="material-symbols-outlined text-green-600 text-[18px]">verified_user</span>
                  <span className="text-sm font-medium text-green-700">Insurance Included</span>
                </div>
              )}

              <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Weekly Rate</span>
                  <span className="font-bold text-primary">${car.rentalWeekly?.toLocaleString()}</span>
                </div>
                {totalDays > 0 && (
                  <div className="flex justify-between text-sm pt-2 border-t border-slate-100">
                    <span className="text-slate-900 font-medium">{totalDays} Day{totalDays > 1 ? "s" : ""} Total</span>
                    <span className="font-bold text-primary text-lg">${totalCost.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full md:w-3/5 p-6 overflow-y-auto">
              <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <h3 className="text-xl font-bold text-slate-900 mb-6">Book This Car</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1.5">Full Name *</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1.5">Phone *</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="017XXXXXXXX" required />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1.5">Email (Optional)</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="your@email.com" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1.5">Pickup Date *</label>
                    <input type="date" value={formData.pickupDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1.5">Return Date *</label>
                    <input type="date" value={formData.returnDate} min={formData.pickupDate || new Date().toISOString().split("T")[0]} onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1.5">Pickup Location</label>
                  <input type="text" value={formData.pickupLocation} onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Address or area" />
                </div>

                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1.5">Special Notes</label>
                  <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none h-20" placeholder="Any special requirements..." />
                </div>

                {/* Terms */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <input id="terms-checkbox" type="checkbox" checked={hasAgreed} onChange={(e) => setHasAgreed(e.target.checked)} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary accent-blue-600 cursor-pointer" />
                    <label htmlFor="terms-checkbox" className="text-sm text-slate-600 cursor-pointer">
                      I agree to the{" "}
                      <button type="button" onClick={() => setShowTermsPopup(true)} className="text-primary hover:underline font-medium">
                        Terms & Conditions
                      </button>
                    </label>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 pt-2">
                  <button onClick={handleWhatsApp} disabled={!hasAgreed || !isFormValid} className={`w-full py-3.5 bg-green-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${!hasAgreed || !isFormValid ? "opacity-40 cursor-not-allowed" : "hover:bg-green-700 active:scale-[0.98]"}`}>
                    💬 Book via WhatsApp
                  </button>
                  <button onClick={handleSave} disabled={isSubmitting || !hasAgreed || !isFormValid} className={`w-full py-3.5 bg-primary text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${!hasAgreed || !isFormValid ? "opacity-40 cursor-not-allowed" : "hover:opacity-90 active:scale-[0.98]"}`}>
                    {isSubmitting ? "Submitting..." : "📋 Save Booking"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Terms Popup */}
      <AnimatePresence>
        {showTermsPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTermsPopup(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-xl bg-white p-8 overflow-y-auto max-h-[80vh] z-[101] rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Rental Terms & Conditions</h3>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed whitespace-pre-line border-t border-slate-200 pt-6">
                {car?.terms || `01. Minimum Age: Driver must be at least ${car?.minAge || 25} years old.
02. Identification: Valid Driving License and Passport/NID required.
03. Security Deposit: A refundable deposit of $1,000 required.
04. Fuel Policy: Vehicle must be returned with same fuel level.
05. Damage Policy: Client is responsible for any minor damages or traffic violations during rental.`}
              </div>
              <button onClick={() => { setShowTermsPopup(false); setHasAgreed(true); }} className="w-full mt-8 bg-primary text-white py-3.5 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
                I AGREE & UNDERSTAND
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default BookingEngine;
