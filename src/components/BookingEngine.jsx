// src/components/BookingEngine.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { bn, enUS } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { openWhatsApp } from "@/lib/whatsapp";
import { useLanguage } from "@/lib/LanguageContext";

const BookingEngine = ({ car, isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801XXXXXXXXX";

  const bookedDates = car?.bookedDates?.map(date => new Date(date)) || [];
  
  const disabledDays = [
    { before: new Date() },
    ...bookedDates
  ];

  const modifiers = {
    booked: bookedDates,
    available: { after: new Date() }
  };

  const modifiersStyles = {
    booked: { color: "#ef4444", fontWeight: "bold", textDecoration: "line-through" },
    available: { color: "#22c55e" }
  };

  const handleSave = async () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.phone) {
      alert(t.booking.validationAlert);
      return;
    }

    setIsSubmitting(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      
      // Save to bookings collection
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

      // Update car's booked dates
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

    const dateStr = format(selectedDate, "dd MMMM yyyy", { locale: lang === "bn" ? bn : enUS });
    const message = `Hello Deals on Wheels! I would like to book a rental.\n\nName: ${formData.name}\nContact: ${formData.phone}\nCar: ${car.name}\nDate: ${dateStr}\nTime: ${selectedTime}\n\nPlease confirm my booking.`;
    
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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[90vh]"
          >
            {/* Left Side: Car Info */}
            <div className="w-full md:w-1/3 bg-white/5 p-6 border-b md:border-b-0 md:border-r border-white/10">
              <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4">
                <Image
                  src={car.images?.[0] || "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-3xl font-bebas mb-2">{car.name}</h2>
              <p className="text-sm text-text-body">{car.brand} · {car.model} · {car.year}</p>
              
              <div className="mt-8 space-y-4">
                <div>
                  <label className="text-[10px] text-text-body uppercase tracking-widest block mb-2">{t.booking.nameLabel}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                    placeholder={t.booking.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-text-body uppercase tracking-widest block mb-2">{t.booking.phoneLabel}</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                    placeholder={t.booking.phonePlaceholder}
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Date & Time Picker */}
            <div className="w-full md:w-2/3 p-6 overflow-y-auto no-scrollbar">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bebas mb-4">{t.booking.dateTitle}</h3>
                  <div className="glass p-2 scale-90 origin-top-left">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={disabledDays}
                      modifiers={modifiers}
                      modifiersStyles={modifiersStyles}
                      locale={lang === "bn" ? bn : enUS}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bebas mb-4">{t.booking.timeTitle}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-3 px-4 rounded-lg text-xs font-bold transition-all border ${
                          selectedTime === slot 
                          ? "bg-primary border-primary text-white" 
                          : "bg-white/5 border-white/10 text-text-body hover:bg-white/10"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>

                  <div className="mt-12 space-y-4">
                    <button
                      onClick={handleSave}
                      disabled={isSubmitting}
                      className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <span>{t.booking.saveBtn}</span>
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                      <span>{t.booking.whatsappBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingEngine;
