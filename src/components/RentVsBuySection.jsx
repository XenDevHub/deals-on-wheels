import Link from "next/link";

const comparisonData = [
  { label: "Initial Outlay", rent: "Minimal Deposit", rentCheck: true, buy: "Heavy Capital Investment", buyCheck: false },
  { label: "Coverage", rent: "Fully Provided", rentCheck: true, buy: "Separate Premium", buyCheck: false },
  { label: "Maintenance", rent: "Covered by us", rentCheck: true, buy: "Out-of-pocket", buyCheck: false },
  { label: "Emergency Support", rent: "24/7 Included", rentCheck: true, buy: "Subscription Required", buyCheck: false },
  { label: "Commitment", rent: "Return Whenever", rentCheck: true, buy: "Multi-year Financing", buyCheck: false },
  { label: "Value Loss", rent: "We absorb it", rentCheck: true, buy: "You lose equity", buyCheck: false },
  { label: "Regular Payments", rent: "From $240/wk", rentCheck: true, buy: "Upwards of $400/wk", buyCheck: false },
];

export default function RentVsBuySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl 2xl:max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-slate-900 mb-4 md:mb-6">
            Renting a Hybrid vs. Buying New
          </h2>
          <p className="text-slate-600 text-lg">
            For high-mileage drivers, subscribing preserves your savings and turns unpredictable maintenance into a flat, manageable fee.
          </p>
        </div>

        {/* Premium Comparison Table */}
        <div className="relative">
          {/* Header Row */}
          <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 items-end px-2 md:px-6">
            <div className="col-span-1"></div>
            <div className="col-span-1 text-center pb-2 md:pb-4">
              <h3 className="font-display text-sm sm:text-base md:text-2xl font-bold text-primary">Renting with DealsOnWheels</h3>
            </div>
            <div className="col-span-1 text-center pb-2 md:pb-4">
              <h3 className="font-display text-xs sm:text-sm md:text-xl font-semibold text-slate-500">Buying New</h3>
            </div>
          </div>

          {/* Table Body */}
          <div className="relative z-10 bg-slate-50 rounded-[2rem] p-4 md:p-6 shadow-xl border border-slate-100">
            {/* Renting Highlight Backdrop */}
            <div className="absolute top-0 left-1/3 w-1/3 h-full bg-white rounded-2xl md:rounded-[2rem] shadow-xl md:scale-105 border border-primary/20 z-0"></div>

            <div className="relative z-10 divide-y divide-slate-200">
              {comparisonData.map((row, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 md:gap-4 py-4 md:py-6 items-center hover:bg-slate-100/50 transition-colors rounded-xl px-2 md:px-4">
                  {/* Label */}
                  <div className="col-span-1">
                    <p className="font-semibold text-slate-900 text-xs sm:text-sm md:text-base">{row.label}</p>
                  </div>
                  
                  {/* Rent Column (Highlighted) */}
                  <div className="col-span-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
                    <p className="font-bold text-slate-900 text-center text-xs sm:text-sm md:text-base">{row.rent}</p>
                    {row.rentCheck ? (
                      <span className="material-symbols-outlined text-green-600 font-bold bg-green-50 rounded-full p-1 text-sm">check</span>
                    ) : (
                      <span className="material-symbols-outlined text-red-600 font-bold bg-red-50 rounded-full p-1 text-sm">close</span>
                    )}
                  </div>

                  {/* Buy Column (Muted) */}
                  <div className="col-span-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 opacity-60">
                    <p className="text-slate-600 font-medium text-center text-xs sm:text-sm md:text-base">{row.buy}</p>
                    {row.buyCheck ? (
                      <span className="material-symbols-outlined text-green-600 font-bold text-sm">check</span>
                    ) : (
                      <span className="material-symbols-outlined text-red-500 font-bold text-sm">close</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 italic mb-10">
            *Ownership costs include loan interest, separate insurance policies, registration, and routine maintenance.
          </p>
          <Link href="/how-it-works" className="inline-flex items-center justify-center px-10 py-4 bg-slate-900 text-white rounded-xl font-button text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-primary/30">
            Learn More About Subscriptions <span className="material-symbols-outlined ml-2">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
