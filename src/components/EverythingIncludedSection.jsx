"use client";
import { useState } from "react";
import Link from "next/link";

const inclusions = [
  { icon: "shield", title: "Premium Coverage", description: "Fully insured for both commercial and personal use—no secondary policies needed." },
  { icon: "build", title: "Routine Maintenance", description: "All standard upkeep and mechanical servicing are handled by us to keep you moving securely." },
  { icon: "support_agent", title: "Emergency Roadside Aid", description: "24/7 priority support ensures you're never stranded if the unexpected happens." },
  { icon: "speed", title: "Uncapped Mileage", description: "Drive without boundaries. We don't charge penalties for driving extra miles." },
  { icon: "verified", title: "Rideshare Compliant", description: "Pre-registered and fully certified for immediate use across all major driver platforms." },
  { icon: "contract_delete", title: "Flexible Agreements", description: "Enjoy the freedom to return your vehicle when you want, without binding long-term commitments." },
  { icon: "money_off", title: "Transparent Billing", description: "What we quote is exactly what you pay. Zero surprise fees or hidden charges." },
  { icon: "calendar_month", title: "Adaptable Timeframes", description: "Whether you need a car for a few weeks or several months, we adapt to your schedule." },
  { icon: "location_on", title: "On-Ground Assistance", description: "Access our dedicated local experts who are always ready to help you in person." }
];

export default function EverythingIncludedSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
          
          {/* Left Column - Content & Active Feature */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-slate-900 leading-tight mb-6 md:mb-8">
              What's Covered in Your <span className="text-primary block md:inline">Weekly Subscription</span>
            </h2>
            
            {/* Highlight Box */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 mb-10 transition-all duration-500">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">{inclusions[activeIndex].icon}</span>
              </div>
              <h3 className="font-h3 text-xl sm:text-2xl text-slate-900 mb-2 sm:mb-4 font-bold">{inclusions[activeIndex].title}</h3>
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                {inclusions[activeIndex].description}
              </p>
            </div>

            <Link href="/fleet" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-button text-lg hover:scale-105 transition-transform shadow-lg group">
              Explore Our Fleet
              <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
            
            <p className="text-xs sm:text-sm text-slate-500 mt-6">
              *Features may vary by specific model. <Link href="/#contact" className="underline hover:text-primary">Contact us</Link> for details.
            </p>
          </div>

          {/* Right Column - Interactive Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
              {inclusions.map((item, index) => (
                <button
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl text-center transition-all duration-300 border ${
                    activeIndex === index 
                      ? "bg-primary text-white border-primary shadow-lg scale-105" 
                      : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <span className={`material-symbols-outlined text-3xl mb-3 sm:mb-4 ${activeIndex === index ? "text-white" : "text-primary"}`}>
                    {item.icon}
                  </span>
                  <span className={`font-semibold text-xs sm:text-sm ${activeIndex === index ? "text-white" : "text-slate-900"}`}>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
