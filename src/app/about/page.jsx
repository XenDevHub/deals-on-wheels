"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 font-body-md text-slate-600 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-24 max-w-7xl mx-auto px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-bold uppercase tracking-widest text-sm block mb-4">Our Story</span>
          <h1 className="font-display text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
            Driven by Excellence.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            At DealsOnWheels, we believe that the journey is just as important as the destination. 
            Founded with a passion for automotive perfection, we provide an unparalleled experience 
            in premium car rentals and certified sales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square relative">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhTyPpskRU3MpfqOaIdIbeOurkVoMMuXEOuN1qZ35viqVl466yyRY78Gx_AEV0poj5RUpmwymZL1MZ6xTtRuRcp8Z40398Dp3QDELVTDZ2bQPrXivbswXt13j19vmqaw4xzLP3cisdv0NjfEswoqktfNPrPIiha7mnt3UOWCrVYvPDCNK953CdD5bgZgZoIAPjD9BnX5vbmu5jk_84GtUfXpTyuYKshote29A6GMkCoSN08lnHimLQsgvSOlhuLtxxPqGazBvBPWhH" 
              alt="Concierge Service" 
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </div>
          <div className="space-y-8">
            <h2 className="font-display text-4xl font-bold text-slate-900 leading-tight">
              Redefining Automotive Luxury
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We hand-select every vehicle in our fleet to ensure it meets our rigorous standards for performance, safety, and style. From the moment you book to the moment you return the keys, our dedicated concierge team is available to guarantee your complete satisfaction.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
              <div>
                <p className="text-5xl lg:text-6xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-2">5k+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Happy Clients</p>
              </div>
              <div>
                <p className="text-5xl lg:text-6xl font-display font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-2">150+</p>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Premium Vehicles</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
