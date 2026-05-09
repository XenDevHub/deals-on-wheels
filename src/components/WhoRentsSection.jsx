export default function WhoRentsSection() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-slate-900 mb-4 md:mb-6">Who Chooses Our Premium Hybrids?</h2>
          <p className="text-slate-600 font-body-lg max-w-2xl mx-auto text-base sm:text-lg">
            From full-time rideshare professionals to daily commuters, we provide the perfect efficient vehicle for your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl 2xl:max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">local_taxi</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">Rideshare Professionals</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 mb-6 md:mb-8 flex-grow">
              Drive rideshare-ready hybrids starting at $240 weekly. Hit the road immediately and keep up to $200 extra in your pocket each week thanks to unmatched fuel efficiency.
            </p>
            <button className="w-full py-3 px-4 border border-slate-300 rounded-lg font-button text-sm sm:text-base text-slate-700 hover:border-primary hover:text-primary transition-colors flex justify-center items-center gap-2">
              Explore Rideshare Rentals <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">inventory_2</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">Delivery Drivers</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 mb-6 md:mb-8 flex-grow">
              Maximize your delivery margins with ultra-efficient engines. Complete more orders with significantly fewer trips to the gas station.
            </p>
            <button className="w-full py-3 px-4 border border-slate-300 rounded-lg font-button text-sm sm:text-base text-slate-700 hover:border-primary hover:text-primary transition-colors flex justify-center items-center gap-2">
              Explore Delivery Rentals <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">key</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">Personal & Family Use</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 mb-6 md:mb-8 flex-grow">
              Skip the commercial requirements. Perfect for your daily commute, weekend getaways, or as a reliable temporary vehicle.
            </p>
            <button className="w-full py-3 px-4 border border-slate-300 rounded-lg font-button text-sm sm:text-base text-slate-700 hover:border-primary hover:text-primary transition-colors flex justify-center items-center gap-2">
              Explore Personal Rentals <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">smartphone</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">Temporary Replacements</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 mb-6 md:mb-8 flex-grow">
              Waiting on repairs or looking for a stopgap between cars? Get the keys today with zero long-term lock-in.
            </p>
            <button className="w-full py-3 px-4 border border-slate-300 rounded-lg font-button text-sm sm:text-base text-slate-700 hover:border-primary hover:text-primary transition-colors flex justify-center items-center gap-2">
              Explore Temporary Rentals <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
