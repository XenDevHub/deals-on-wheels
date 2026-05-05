"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SalesPage() {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="max-w-7xl mx-auto px-8 py-12 flex-grow">
        {/* Search & Filter Bar */}
        <section className="mb-section-gap">
          <div className="flex flex-col gap-stack-lg bg-surface-container rounded-xl p-8 shadow-[0px_4px_20px_rgba(30,41,59,0.05)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="font-h1 text-h1 text-on-surface">Find Your Next Ride</h1>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <span className="material-symbols-outlined">filter_list</span>
                <span className="font-label-lg text-label-lg">Advanced Search</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Brand</label>
                <select className="h-[48px] rounded-lg border border-outline-variant bg-white px-4 focus:ring-2 focus:ring-primary outline-none appearance-none">
                  <option>All Brands</option>
                  <option>Tesla</option>
                  <option>Porsche</option>
                  <option>BMW</option>
                  <option>Mercedes-Benz</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Year Range</label>
                <div className="flex items-center gap-2">
                  <input className="w-full h-[48px] rounded-lg border border-outline-variant bg-white px-4 focus:ring-2 focus:ring-primary outline-none" placeholder="From" type="number" />
                  <input className="w-full h-[48px] rounded-lg border border-outline-variant bg-white px-4 focus:ring-2 focus:ring-primary outline-none" placeholder="To" type="number" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Price Limit</label>
                <input className="accent-primary h-12 w-full" type="range" />
                <div className="flex justify-between text-label-md font-medium text-tertiary">
                  <span>$10k</span>
                  <span>$250k+</span>
                </div>
              </div>
              <div className="flex items-end">
                <button className="w-full h-[48px] bg-primary text-on-primary rounded-lg font-button flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  <span className="material-symbols-outlined">search</span>
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Marketplace Grid */}
        <section className="mb-section-gap">
          <div className="flex justify-between items-center mb-stack-lg">
            <h2 className="font-h2 text-h2 text-on-surface">Available Inventory <span className="text-primary font-normal">(124)</span></h2>
            <div className="flex gap-2">
              <button className="bg-white border border-outline-variant p-2 rounded-lg text-tertiary hover:border-primary transition-colors">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
              </button>
              <button className="bg-white border border-outline-variant p-2 rounded-lg text-tertiary hover:border-primary transition-colors">
                <span className="material-symbols-outlined">view_list</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Vehicle Card 1 */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(30,41,59,0.05)] hover:shadow-[0px_10px_30px_rgba(30,41,59,0.12)] transition-shadow duration-300">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Porsche 911 Carrera"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOlTQD_vWIVSCGqhwQCLi4CsgKtqxQd53iL68bG0Bx8A8DxYk55IH5vuYztGHhO_BHYOhex2M5HwVPTMBnQbL5ZdcRbWegMlmC6QkCiL-PutNPqe5YuOHNUmJaWwW4hCQy5wra5moIIWwL2bbyDzay4BycN8y7bw8EQpFquu4ZTYX6gxsK21dGHx0V2wB1-N-UzAb7_SSWniGgYAgpcjESjCvj2VKrZUD1KOo0iD1VsFc5ou2zMA62tpKx_CVZG7xo4jsnx_rRs4dO"
                />
                <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-md font-bold uppercase tracking-widest">Certified Pre-Owned</div>
              </div>
              <div className="p-stack-lg flex flex-col gap-stack-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-h3 text-h3 text-on-surface">Porsche 911 Carrera</h3>
                    <p className="font-body-sm text-tertiary">2023 • Midnight Silver Metallic</p>
                  </div>
                  <div className="text-right">
                    <p className="text-h3 font-h3 text-primary">$124,900</p>
                    <p className="font-label-md text-tertiary">Est. $2,140/mo</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100">
                  <div className="flex flex-col items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">speed</span>
                    <span className="text-label-md">4,200 mi</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">settings</span>
                    <span className="text-label-md">Automatic</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">ev_station</span>
                    <span className="text-label-md">Gasoline</span>
                  </div>
                </div>
                <button className="w-full py-4 border-2 border-primary text-primary rounded-lg font-button hover:bg-primary hover:text-on-primary transition-all duration-200">
                  View Details
                </button>
              </div>
            </div>

            {/* Vehicle Card 2 */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(30,41,59,0.05)] hover:shadow-[0px_10px_30px_rgba(30,41,59,0.12)] transition-shadow duration-300">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Tesla Model S Plaid"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjIPWJOmAOGV1KYW0HodASGN0Ix7PAzBeB6tLWu0GShM2EQR4CbIZNqDhPXBogAEOV5oy_ucRXtbPKwqujnbfAsjeEom248p9K-v49ay6g5M6c5-kLSVb_CQVOzsP-vfJ8YOjuikpNtonpCBqSLc42iY-sEXKwSJ1i-oBbg-J-0SaF8YymfIIFrgPTGElPvtZ3_DxIxwlIPaFm8q_m8kGJYMeUTWqe5_v1YCIDpHlekHvJflUC_F-3e6n_iKlmm5A0tP18G4aetJNW"
                />
                <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-3 py-1 rounded-full text-label-md font-bold uppercase tracking-widest">New Arrival</div>
              </div>
              <div className="p-stack-lg flex flex-col gap-stack-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-h3 text-h3 text-on-surface">Tesla Model S Plaid</h3>
                    <p className="font-body-sm text-tertiary">2024 • Pearl White Multi-Coat</p>
                  </div>
                  <div className="text-right">
                    <p className="text-h3 font-h3 text-primary">$89,990</p>
                    <p className="font-label-md text-tertiary">Est. $1,450/mo</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100">
                  <div className="flex flex-col items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                    <span className="text-label-md">120 mi</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">settings</span>
                    <span className="text-label-md">Direct Drive</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">electric_car</span>
                    <span className="text-label-md">Electric</span>
                  </div>
                </div>
                <button className="w-full py-4 border-2 border-primary text-primary rounded-lg font-button hover:bg-primary hover:text-on-primary transition-all duration-200">
                  View Details
                </button>
              </div>
            </div>

            {/* Vehicle Card 3 */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(30,41,59,0.05)] hover:shadow-[0px_10px_30px_rgba(30,41,59,0.12)] transition-shadow duration-300">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="BMW M4 Competition"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOkpk3WYj75Cc9aJSzBD7Pg_SqDWKSFHlIqWa9AYQvEML6N9_cGAjC9rZWnh-Jp-UDng-AokGOi1LjyRjrIETFo9pKA87o5i3wKc03m-T3bfUQILSt5EWawGpavXgEbeKSNw7fo-VKsXdgbuH5gR0MlhGP1H3NTSNlOZJLWWJ3lz1iz-10A7mxXdiOLo-20UosODo2SW6QZUQsP_Srxh-sOjtevy6SsRhl7M_cSqLWEJ7ciI8L8gzegp_JeYClpnpb_W-3B2fgwyF1"
                />
                <div className="absolute top-4 left-4 bg-error text-on-error px-3 py-1 rounded-full text-label-md font-bold uppercase tracking-widest">Limited Offer</div>
              </div>
              <div className="p-stack-lg flex flex-col gap-stack-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-h3 text-h3 text-on-surface">BMW M4 Competition</h3>
                    <p className="font-body-sm text-tertiary">2022 • Tanzanite Blue II</p>
                  </div>
                  <div className="text-right">
                    <p className="text-h3 font-h3 text-primary">$72,400</p>
                    <p className="font-label-md text-tertiary">Est. $1,210/mo</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-100">
                  <div className="flex flex-col items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">speed</span>
                    <span className="text-label-md">18,500 mi</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">settings</span>
                    <span className="text-label-md">Automatic</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 text-tertiary">
                    <span className="material-symbols-outlined text-[20px]">ev_station</span>
                    <span className="text-label-md">Gasoline</span>
                  </div>
                </div>
                <button className="w-full py-4 border-2 border-primary text-primary rounded-lg font-button hover:bg-primary hover:text-on-primary transition-all duration-200">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-primary text-tertiary">1</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold">2</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-primary text-tertiary">3</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-primary text-tertiary">...</button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-primary text-tertiary">12</button>
          </div>
        </section>

        {/* Trade-in Calculator CTA */}
        <section className="relative overflow-hidden rounded-2xl bg-slate-900 p-12 text-white">
          <div className="absolute inset-0 opacity-20">
            <img
              className="w-full h-full object-cover"
              alt="Trade-in calculator"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEWVy5s2o9Vc33mJRLBcc1aCu0bDNrjbC66PwAdeAEeMHaoeL-TejiLLJNuE3xbtEB-nWhf-0-P3PummO4Cg4RF8mff1fUP4SL2xFM4D-jydh6hr9su45HBrE15piW_rPdt59DLtVSRWSX3FDesrbWilEn-MIzTXlu3I6BR9xXsJ5VJotlx4JeyC7YeXNhSyjPWDEiLOLoIGIGCzeUZ7_viH-vyyluCouDdf7gxjRQ-aNVTgmd6aoEkY0zrVYGDIinD3j08OUqBLpc"
            />
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-display leading-tight">Ready for an Upgrade? <br/>Trade in with confidence.</h2>
              <p className="font-body-lg text-slate-300">Get an instant, market-accurate valuation for your current vehicle in under 60 seconds. Our data-driven algorithm ensures you get the highest possible value toward your next purchase.</p>
              <div className="flex gap-4">
                <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-button text-body-lg hover:opacity-90 active:scale-95 transition-all">Calculate Your Trade-In</button>
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl font-button text-body-lg hover:bg-white/20 transition-all">Learn More</button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="glass-card p-8 rounded-2xl border border-white/10 flex flex-col gap-6 max-w-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">verified</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Official Appraisal</h4>
                    <p className="text-sm text-slate-300">Market-backed data</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Average Trade-In Bonus</span>
                    <span className="text-primary-fixed-dim font-bold">+$1,500</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
