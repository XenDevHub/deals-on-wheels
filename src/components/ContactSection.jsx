import React, { useState } from 'react';
import { openWhatsApp } from '@/lib/whatsapp';

export default function ContactSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "61433178890";
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
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
    
    const text = `*New Inquiry from Deals on Wheels*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`;
    openWhatsApp(whatsappNumber, text);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl">
          {/* Decorative Gradients */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 p-6 sm:p-8 md:p-12 lg:p-20">
            <div>
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-sm block mb-4 md:mb-6">Contact Us</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-black text-white leading-tight mb-6 md:mb-8">
                Ready to Start Your <span className="text-primary italic">Journey?</span>
              </h2>
              <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-12 max-w-md">
                Our team is standing by to provide you with the ultimate automotive experience. Reach out via any of the channels below.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-white text-2xl">phone_iphone</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Call Us 24/7</p>
                    <a href="tel:+61433178890" className="text-xl font-display font-bold text-white hover:text-primary transition-colors">+61 433 178 890</a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-white text-2xl">alternate_email</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Email Support</p>
                    <a href="mailto:dealsonwheelsonthego@gmail.com" className="text-lg font-display font-bold text-white hover:text-primary transition-colors break-all">dealsonwheelsonthego@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary transition-all duration-300">
                    <span className="material-symbols-outlined text-white text-2xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Our Location</p>
                    <p className="text-xl font-display font-bold text-white uppercase tracking-tight">Melbourne, Victoria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 md:mb-8">Send a Message</h3>
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors" 
                      placeholder="John Doe" 
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
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary transition-colors" 
                      placeholder="+61..." 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">Message</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-primary transition-colors h-32 resize-none" 
                    placeholder="How can we help you?" 
                  />
                </div>
                <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

