"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function FleetPage() {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-8 py-10 flex-grow">
        {/* Page Header & Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="font-h1 text-h1 text-on-surface mb-2">Our Rental Fleet</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">High-performance vehicles for every journey. Filter by type, transmission, or fuel to find your perfect match.</p>
          </div>
          <div className="flex items-center bg-surface-container-high p-1 rounded-xl w-fit">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white shadow-sm font-button text-button text-primary">
              <span className="material-symbols-outlined text-[20px]">grid_view</span> Grid
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-button text-button text-on-surface-variant hover:text-on-surface">
              <span className="material-symbols-outlined text-[20px]">map</span> Map View
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-[0px_4px_20px_rgba(30,41,59,0.05)] border border-slate-100">
              <h3 className="font-h3 text-h3 mb-6">Filters</h3>
              
              {/* Filter Group: Car Type */}
              <div className="mb-8">
                <p className="font-label-lg text-label-lg text-tertiary uppercase tracking-wider mb-4">Car Type</p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">SUV</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Sedan</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Hatchback</span>
                  </label>
                </div>
              </div>
              
              {/* Filter Group: Transmission */}
              <div className="mb-8">
                <p className="font-label-lg text-label-lg text-tertiary uppercase tracking-wider mb-4">Transmission</p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 rounded-full border border-primary bg-primary-fixed text-on-primary-fixed font-label-md text-label-md">Auto</button>
                  <button className="px-4 py-2 rounded-full border border-outline-variant hover:border-primary transition-colors font-label-md text-label-md text-on-surface-variant">Manual</button>
                </div>
              </div>

              {/* Filter Group: Fuel Type */}
              <div className="mb-8">
                <p className="font-label-lg text-label-lg text-tertiary uppercase tracking-wider mb-4">Fuel Type</p>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 border-outline text-primary focus:ring-primary" name="fuel" type="radio" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Electric</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 border-outline text-primary focus:ring-primary" name="fuel" type="radio" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Hybrid</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 border-outline text-primary focus:ring-primary" name="fuel" type="radio" />
                    <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Petrol</span>
                  </label>
                </div>
              </div>
              
              <button className="w-full py-3 bg-secondary-container text-on-secondary-container rounded-lg font-button text-button hover:opacity-90 transition-opacity">
                Reset Filters
              </button>
            </div>

            {/* Promo Card */}
            <div className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary-container">
              <h4 className="font-h3 text-h3 mb-2">Weekend Special</h4>
              <p className="font-body-sm text-body-sm mb-4 opacity-90">Get 20% off on all SUV rentals for 3+ days.</p>
              <button className="font-label-lg text-label-lg underline underline-offset-4 decoration-2">Claim Offer</button>
              <div className="absolute -right-4 -bottom-4 opacity-20 transform -rotate-12">
                <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>electric_car</span>
              </div>
            </div>
          </aside>

          {/* Main Fleet Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Car Card 1 */}
              <div className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(30,41,59,0.05)] border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt="Tesla Model Y"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwFeWMZX-_cUdw8Vh-hSZaQHDIpSgYsvHIBi0Jap4bmOypcMxWMR43dwff6iC6QOdPnUNW5ZuDB5QhLNEjbaE97EqfhYxBCK1pZ-gJrRHlQvEQojwSOmyAjrikyokVZL7xEFP868tSve7ScjkF09BnS3AJ-JC4z8PuHvOgg-VmALM40IDna11SbAToVjntVGNN8wqcmfxdtnHi9upZML3tATJ-6pyXwl9wJin3AbJFbNrzXf-rhvpB9f0lwAIcDoXvXDuA75oizqaw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-primary font-label-md text-label-md px-3 py-1 rounded-full shadow-sm">Premium</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-h3 text-h3 mb-1">Tesla Model Y</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Electric • Long Range</p>
                    </div>
                    <div className="text-right">
                      <span className="font-h3 text-h3 text-primary">$120</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">airline_seat_recline_extra</span>
                      <span className="font-body-sm text-body-sm">5 Seats</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">settings</span>
                      <span className="font-body-sm text-body-sm">Automatic</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">bolt</span>
                      <span className="font-body-sm text-body-sm">Full EV</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">luggage</span>
                      <span className="font-body-sm text-body-sm">3 Large Bags</span>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-button text-button hover:opacity-90 active:scale-[0.98] transition-all">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Car Card 2 */}
              <div className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(30,41,59,0.05)] border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt="Audi A6"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzG3mzGVkmmn_eCUpuO2EQTWknjOndHojDB4M1SXUPbEhy1mL_PjJ4OdMdXTI2S9UogE88TmyHMeCge9ITAR8gBxhcG-9XzKKsSV9UnEYab7T953f3MuRlWZVy2ptcqoOusGs-2V4PF0w56zUE-R_yfXnK4a_emop_FHGERbGkaFhvzD3sQZC2LOfdRFBYtiXQuE0Z7ya--1oyDM5WwZ5v1HrYfzf6QEbsu1kg6iv_3fZbpW061nvGeMir7ZQMYZJy7Fn9usOI32VX"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-primary font-label-md text-label-md px-3 py-1 rounded-full shadow-sm">Business</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-h3 text-h3 mb-1">Audi A6</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Hybrid • Quattro</p>
                    </div>
                    <div className="text-right">
                      <span className="font-h3 text-h3 text-primary">$95</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">airline_seat_recline_extra</span>
                      <span className="font-body-sm text-body-sm">5 Seats</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">settings</span>
                      <span className="font-body-sm text-body-sm">Automatic</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">ev_station</span>
                      <span className="font-body-sm text-body-sm">Plug-in Hybrid</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">luggage</span>
                      <span className="font-body-sm text-body-sm">2 Large Bags</span>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-button text-button hover:opacity-90 active:scale-[0.98] transition-all">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Car Card 3 */}
              <div className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(30,41,59,0.05)] border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt="VW Golf GTI"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHJw8TYqJnl7WtC9dRqyq0fzaDgaHG-cg-1Usx560ed1pn7DEeehS76ILoKXgwt70VjRQ13XiJn0TRQmaxKigyfP9_BnSw5wMN_EtQnXnqNxT0ban2x9LCAt3ilsUjI4x1EsS0r-pDHpHx2w9M3zztbXLJIkEfc3SkR_67qNVVWGoNO-L08E8AI9k26yfFlbl1PWqZfRivzh_fuXKY-Ehz2pCXmCdYV7SZwq4BFoa-5SlF_CZwWZkc1NkAV5KHTsY5hllQ7WuJUODQ"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-h3 text-h3 mb-1">VW Golf GTI</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Petrol • Performance</p>
                    </div>
                    <div className="text-right">
                      <span className="font-h3 text-h3 text-primary">$65</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">airline_seat_recline_extra</span>
                      <span className="font-body-sm text-body-sm">5 Seats</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">settings</span>
                      <span className="font-body-sm text-body-sm">Manual</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">local_gas_station</span>
                      <span className="font-body-sm text-body-sm">Petrol</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">luggage</span>
                      <span className="font-body-sm text-body-sm">2 Medium Bags</span>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-button text-button hover:opacity-90 active:scale-[0.98] transition-all">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Car Card 4 */}
              <div className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(30,41,59,0.05)] border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt="Land Rover Defender"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIjei4bG5tajUvIih_m5vfBHg4kSAko7cKP3HEV-x_Ookkk9rVCfQCwer82aZkd_ynqD_b3LYKF2Ui-p6W5Veqnq9HKQnZjPjp7tVwstvEM8F52Ezcoduzwe3YMWQDUr-HFsusSKcA1j5RjDgZsU7KWYMjCFNrCABeW8z58faUVRIAWhBENcxHrTLYJe4YGZotVFdz09WXCyaCIxf7D5LoNMoagGad-laa0I-4jtqMUV7LacPvYWr-CCvrUJY-6aR6eJbF-wsgJf5W"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-primary font-label-md text-label-md px-3 py-1 rounded-full shadow-sm">Popular</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-h3 text-h3 mb-1">Land Rover Defender</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Diesel • 4x4 Off-road</p>
                    </div>
                    <div className="text-right">
                      <span className="font-h3 text-h3 text-primary">$150</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">/day</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">airline_seat_recline_extra</span>
                      <span className="font-body-sm text-body-sm">7 Seats</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">settings</span>
                      <span className="font-body-sm text-body-sm">Automatic</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">local_gas_station</span>
                      <span className="font-body-sm text-body-sm">Diesel</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span className="material-symbols-outlined text-[20px]">luggage</span>
                      <span className="font-body-sm text-body-sm">4 Large Bags</span>
                    </div>
                  </div>
                  <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-button text-button hover:opacity-90 active:scale-[0.98] transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-lg">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary transition-colors font-label-lg">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary transition-colors font-label-lg">3</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:border-primary transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
