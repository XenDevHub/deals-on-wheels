export default function WhyChooseHybridSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Premium Background Effects - Light Theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-slate-900 mb-4 md:mb-6">
            Why Drivers Prefer Our Hybrid Fleet
          </h2>
          <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">
            Engineered for heavy city traffic and demanding shifts, the incredible fuel economy of our hybrids essentially pays for a massive chunk of your rental.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Stat 1 */}
          <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-3xl text-center hover:border-primary/50 hover:shadow-lg transition-all">
            <p className="font-display text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-3 md:mb-4">4.2L</p>
            <p className="text-slate-900 font-bold text-base md:text-lg mb-1">Average Efficiency</p>
            <p className="text-slate-500 text-xs md:text-sm">vs 7–9L for standard combustion engines</p>
          </div>
          {/* Stat 2 */}
          <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-3xl text-center hover:border-primary/50 transition-all transform md:-translate-y-4 shadow-xl shadow-primary/5">
            <p className="font-display text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-600 mb-3 md:mb-4">$150–$200</p>
            <p className="text-slate-900 font-bold text-base md:text-lg mb-1">Weekly Savings</p>
            <p className="text-slate-500 text-xs md:text-sm">on gas compared to traditional vehicles</p>
          </div>
          {/* Stat 3 */}
          <div className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-3xl text-center hover:border-primary/50 hover:shadow-lg transition-all">
            <p className="font-display text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 mb-3 md:mb-4">#1</p>
            <p className="text-slate-900 font-bold text-base md:text-lg mb-1">Trusted Platform</p>
            <p className="text-slate-500 text-xs md:text-sm">Delivering the most dependable fleet nationwide</p>
          </div>
        </div>

        {/* Details Row */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Detail 1 */}
          <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-yellow-500">bolt</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Halve Your Fuel Expenses</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Consuming just 4.2–6.0L/100km, our fleet radically reduces gas station visits. If you drive heavily, the savings go directly to your bottom line.
            </p>
          </div>
          {/* Detail 2 */}
          <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-amber-500">build</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Unmatched Durability, Maximum Uptime</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Hybrid powertrains suffer far less wear and tear than traditional engines. Fewer mechanical issues mean more time driving and earning.
            </p>
          </div>
          {/* Detail 3 */}
          <div className="bg-white border border-slate-200 shadow-sm p-8 rounded-3xl hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-green-500">check_circle</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">Instantly Ready for All Platforms</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-sm">
              Every car is pre-certified for Uber, DiDi, and delivery apps. Start accepting rides from day one without bureaucratic delays.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
