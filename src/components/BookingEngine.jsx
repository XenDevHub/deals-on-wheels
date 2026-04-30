// src/components/BookingEngine.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { openWhatsApp } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/LanguageContext";

const BookingEngine = ({ car, isOpen, onClose }) => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801XXXXXXXXX";

  const bookedDates = car?.bookedDates?.map(date => new Date(date)) || [];
  
  const disabledDays = [
    { before: new Date() },
    ...bookedDates
  ];

  const handleSave = async () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.phone) {
      alert(t.booking.validationAlert);
      return;
    }

    if (!hasAgreed) {
      alert("Please read and agree to the Terms & Conditions.");
      return;
    }

    setIsSubmitting(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      
      const { error: bookingError } = await supabase.from("bookings").insert({
        ...formData,
        carId: car.id,
        carName: car.name,
        date: dateStr,
        timeSlot: selectedTime,
        type: "rental",
        status: "pending",
        createdAt: new Date().toISOString()
      });
      if (bookingError) throw bookingError;

      const newBookedDates = [...(car.bookedDates || []), dateStr];
      const { error: carError } = await supabase.from("cars").update({
        bookedDates: newBookedDates
      }).eq('id', car.id);
      if (carError) throw carError;

      alert(t.booking.successAlert);
      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      alert(t.booking.errorAlert);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.phone) {
      alert(t.booking.validationAlert);
      return;
    }

    if (!hasAgreed) {
      alert("Please read and agree to the Terms & Conditions.");
      return;
    }

    const dateStr = format(selectedDate, "dd MMMM yyyy", { locale: enUS });
    const message = `Hello Deals on Wheels! I would like to book a rental.\n\nName: ${formData.name}\nContact: ${formData.phone}\nCar: ${car.name}\nDate: ${dateStr}\nTime: ${selectedTime}\n\nI have read and agreed to the Terms & Conditions.`;
    
    openWhatsApp(whatsappNumber, message);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background-darkest/95 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl glass-card rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[90vh] gpu"
          >
            {/* Left Side: Car Info & User Details */}
            <div className="w-full md:w-1/3 bg-background-secondary/50 p-6 border-b md:border-b-0 md:border-r border-accent/10 overflow-y-auto no-scrollbar">
              <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4 bg-background">
                <Image
                  src={car.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=75"}
                  alt={car.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <h2 className="text-3xl font-bebas mb-2 text-heading">{car.name}</h2>
              <p className="text-sm text-body mb-8">{car.brand} · {car.model} · {car.year}</p>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] text-body uppercase tracking-widest block mb-2">{t.booking.nameLabel}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-background/50 border border-accent/10 rounded-lg px-4 py-3 text-sm text-heading focus:border-accent outline-none transition-colors"
                    placeholder={t.booking.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-body uppercase tracking-widest block mb-2">{t.booking.phoneLabel}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-background/50 border border-accent/10 rounded-lg px-4 py-3 text-sm text-heading focus:border-accent outline-none transition-colors"
                    placeholder={t.booking.phonePlaceholder}
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Date, Time & Agreement */}
            <div className="w-full md:w-2/3 p-8 overflow-y-auto no-scrollbar">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-body hover:text-heading transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-xl font-bebas mb-6 text-heading tracking-widest uppercase">{t.booking.dateTitle}</h3>
                  <div className="p-2 text-heading bg-background-secondary/30 rounded-2xl border border-accent/5">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={disabledDays}
                      locale={enUS}
                    />
                  </div>
                </div>

                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bebas mb-6 text-heading tracking-widest uppercase">{t.booking.timeTitle}</h3>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3.5 px-4 rounded-xl text-[10px] font-bold transition-all border uppercase tracking-widest ${
                          selectedTime === slot 
                          ? "bg-accent border-accent text-white shadow-lg shadow-accent/20" 
                          : "bg-background/50 border-accent/10 text-body/70 hover:bg-accent/10 hover:border-accent/30"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  {/* Terms Agreement Section - Moved below slots */}
                  <div className="pt-6 border-t border-accent/5 mb-8">
                    <div className="flex items-center gap-3">
                      <input 
                        id="terms-checkbox"
                        type="checkbox" 
                        checked={hasAgreed}
                        onChange={(e) => setHasAgreed(e.target.checked)}
                        className="w-5 h-5 rounded border-accent/20 bg-background/50 checked:bg-accent focus:ring-accent transition-all cursor-pointer accent-blue-500"
                      />
                      <label htmlFor="terms-checkbox" className="text-[11px] text-body leading-tight cursor-pointer">
                        I agree to the <button 
                          type="button"
                          onClick={() => setShowTermsPopup(true)}
                          className="text-accent hover:underline font-bold cursor-pointer"
                        >
                          Terms & Conditions
                        </button>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4 mt-auto">
                    <button
                      onClick={handleWhatsApp}
                      disabled={!hasAgreed}
                      className={`w-full btn-primary py-4 transition-all ${!hasAgreed ? "opacity-30 grayscale cursor-not-allowed" : "hover:scale-[1.02]"}`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {t.booking.whatsappBtn}
                      </span>
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSubmitting || !hasAgreed}
                      className={`w-full btn-secondary py-4 transition-all ${!hasAgreed ? "opacity-30 grayscale cursor-not-allowed" : "hover:scale-[1.02]"}`}
                    >
                      <span>{t.booking.saveBtn}</span>
                    </button>
                  </div>
                  
                  {!hasAgreed && (
                    <p className="text-[9px] text-red-500/70 mt-4 text-center uppercase tracking-widest italic font-bold">
                      * Please check Terms & Conditions first
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Terms & Conditions Popup */}
      <AnimatePresence>
        {showTermsPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setShowTermsPopup(false)} 
              className="absolute inset-0 bg-background-darkest/98 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xl glass-card p-10 overflow-y-auto max-h-[80vh] no-scrollbar z-[101] rounded-3xl border border-accent/20 shadow-2xl"
            >
              <h3 className="text-4xl font-bebas tracking-widest text-heading mb-8 uppercase text-center">Rental Terms</h3>
              <div className="space-y-6 text-sm text-body leading-relaxed tracking-wide whitespace-pre-line border-t border-accent/10 pt-8">
                {car.terms || `01. Minimum Age: Driver must be at least ${car.minAge || 25} years old.
02. Identification: Valid Driving License and Passport/NID required.
03. Security Deposit: A refundable deposit of ৳20,000 required.
04. Fuel Policy: Vehicle must be returned with same fuel level.
05. Damage Policy: Client is responsible for any minor damages or traffic violations during rental.`}
              </div>
              <button 
                onClick={() => {
                  setShowTermsPopup(false);
                  setHasAgreed(true);
                }} 
                className="w-full mt-10 btn-primary py-4 rounded-xl shadow-gold/10 cursor-pointer"
              >
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
