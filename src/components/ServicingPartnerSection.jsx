import React, { useState } from 'react';
import { openWhatsApp } from '@/lib/whatsapp';

export default function ServicingPartnerSection() {
  // A1 Auto Service & Repair phone number from the image
  const whatsappNumber = "61430000314";
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleDetails: '',
    serviceRequired: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*New Service Request*\nRequest from https://dealsonwheelsonthego.com.au/\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Vehicle Details:* ${formData.vehicleDetails}\n*Service Required:* ${formData.serviceRequired}`;
    openWhatsApp(whatsappNumber, text);
  };

  return (
    <section id="servicing" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl">
          {/* Decorative Gradients */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-red-600/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 p-6 sm:p-8 md:p-12 lg:p-20 items-center">
            <div>
              <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-sm block mb-4 md:mb-6">Our Trusted Servicing Partner</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white leading-tight mb-4">
                <span className="text-red-500">A1</span> AUTO
                <span className="block text-2xl md:text-3xl lg:text-4xl text-slate-300 mt-2">SERVICE & REPAIR</span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-12 max-w-md">
                We've partnered with A1 Auto Service & Repair to ensure your vehicle is always in peak condition. Expert mechanics, premium service, and priority handling for Deals on Wheels customers.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-red-500 transition-all duration-300">
                    <span className="material-symbols-outlined text-white text-2xl">phone_in_talk</span>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Direct Contact</p>
                    <a href="tel:+61430000314" className="text-lg sm:text-xl font-display font-bold text-white hover:text-red-500 transition-colors">0430 000 314</a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-red-500 transition-all duration-300">
                    <span className="material-symbols-outlined text-white text-2xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Workshop Location</p>
                    <p className="text-base sm:text-lg font-display font-bold text-white">6/1 Dunmore Drive</p>
                    <p className="text-sm text-slate-400">Truganina Mel, VIC</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <span className="material-symbols-outlined text-red-500 text-3xl">build</span>
                <h3 className="text-2xl font-bold text-white">Book a Service</h3>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors"
                      placeholder="Your Number"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Vehicle Details</label>
                  <input
                    type="text"
                    name="vehicleDetails"
                    required
                    value={formData.vehicleDetails}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-colors"
                    placeholder="Make, Model, Year"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Service Required</label>
                  <textarea
                    name="serviceRequired"
                    required
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-red-500 transition-colors h-24 resize-none"
                    placeholder="Describe the issue or service needed..."
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">send</span>
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
