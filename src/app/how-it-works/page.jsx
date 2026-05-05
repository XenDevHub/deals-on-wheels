"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="bg-slate-50 font-body-md text-slate-600 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-display text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6">Seamlessly Moving You Forward.</h1>
              <p className="text-lg text-slate-600 max-w-xl mb-10">Whether you're looking for a weekend escape or a permanent upgrade, our streamlined processes for renting and buying ensure you're on the road faster with total confidence.</p>
              <div className="flex gap-4">
                <a className="bg-primary text-white px-8 py-4 rounded-xl font-button shadow-md hover:bg-blue-700 transition-colors" href="#renting">Explore Rentals</a>
                <a className="bg-white border border-slate-300 text-slate-900 px-8 py-4 rounded-xl font-button hover:bg-slate-50 transition-colors shadow-sm" href="#buying">View Sales Inventory</a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-200 rounded-[2rem] w-full aspect-square overflow-hidden shadow-2xl rotate-3">
                <img
                  className="w-full h-full object-cover"
                  alt="High-end luxury vehicle"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcSyWxFnVJuZwixDfb_lucvD6tr5NefHMWNxsgVFieuMsg7Os8oUIcagXbfHELgkTxBg_WBb0XM2MWcOEiDpb0t1aQrStmSX9ikOlKr6ZiYIpWDAvPq8LbM5cpujG43_WE3bOPE1dsfptCvV9DYHCb7mUmcARSSGM0DUNaZGQWcKvEMiW0R1ic0h9Y05rAph3D2vgx6177ltC8K0uRqxJ0SF31osihQF1Ib-Bq-prqUjBS7tQ_PoHRP3GHssluf8C7d-HW2hQDBkF_"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 -rotate-3 border border-slate-100">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-primary">verified</span>
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900 leading-none mb-1">100%</p>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Quality Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section: Split View */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            {/* Renting Process */}
            <div className="mb-32" id="renting">
              <div className="flex items-center gap-4 mb-12">
                <span className="px-4 py-1 bg-slate-100 text-slate-700 rounded-full font-semibold uppercase tracking-widest text-xs border border-slate-200">For Short-Term</span>
                <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="space-y-6">
                  <h2 className="font-display text-4xl font-bold text-slate-900">Renting a Vehicle</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">Our rental process is designed for high-velocity efficiency. No paperwork friction, just premium vehicles ready when you are.</p>
                </div>
                <div className="md:col-span-2 grid md:grid-cols-3 gap-8">
                  {/* Step 1 */}
                  <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 flex items-center justify-center rounded-xl shrink-0">
                        <span className="material-symbols-outlined text-primary text-3xl">search</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">1. Choose</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">Browse our curated fleet of premium sedans and SUVs tailored to your style.</p>
                  </div>
                  {/* Step 2 */}
                  <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 flex items-center justify-center rounded-xl shrink-0">
                        <span className="material-symbols-outlined text-primary text-3xl">event_available</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">2. Book</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">Select your dates and complete our 2-minute digital verification process.</p>
                  </div>
                  {/* Step 3 */}
                  <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 flex items-center justify-center rounded-xl shrink-0">
                        <span className="material-symbols-outlined text-primary text-3xl">directions_car</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">3. Drive</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">Pick up your car or have it delivered directly to your doorstep. Enjoy.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buying Process */}
            <div className="mb-12" id="buying">
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px flex-1 bg-slate-200"></div>
                <span className="px-4 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full font-semibold uppercase tracking-widest text-xs">For Long-Term</span>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 grid md:grid-cols-3 gap-8 order-2 md:order-1">
                  {/* Step 1 */}
                  <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 flex items-center justify-center rounded-xl shrink-0">
                        <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>directions_car</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">1. Inspect</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">View detailed 150-point inspection reports and high-res imagery online.</p>
                  </div>
                  {/* Step 2 */}
                  <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 flex items-center justify-center rounded-xl shrink-0">
                        <span className="material-symbols-outlined text-primary text-3xl">payments</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">2. Finance</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">Get instant credit approval and choose from flexible payment plans.</p>
                  </div>
                  {/* Step 3 */}
                  <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 flex items-center justify-center rounded-xl shrink-0">
                        <span className="material-symbols-outlined text-primary text-3xl">assignment_turned_in</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">3. Own</h3>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">Sign documents digitally and take ownership. Registration is on us.</p>
                  </div>
                </div>
                <div className="space-y-6 order-1 md:order-2 text-right">
                  <h2 className="font-display text-4xl font-bold text-slate-900">Buying a Vehicle</h2>
                  <p className="text-slate-600 text-lg leading-relaxed">Owning your dream car has never been simpler. We handle the bureaucracy so you can enjoy the purchase.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-4xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600 text-lg">Everything you need to know about the DealsOnWheels experience.</p>
            </div>
            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="text-lg font-bold text-slate-900">What insurance coverage is included in rentals?</span>
                  <span className="material-symbols-outlined text-primary">expand_more</span>
                </button>
                <div className="mt-4 text-slate-600 border-t border-slate-100 pt-4 leading-relaxed">
                  All rentals include standard third-party liability coverage. You can upgrade to our Premium Protection plan for zero deductible and complete peace of mind.
                </div>
              </div>
              {/* FAQ 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="text-lg font-bold text-slate-900">Can I test drive a car before buying?</span>
                  <span className="material-symbols-outlined text-primary">expand_more</span>
                </button>
              </div>
              {/* FAQ 3 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="text-lg font-bold text-slate-900">How long does the finance approval take?</span>
                  <span className="material-symbols-outlined text-primary">expand_more</span>
                </button>
              </div>
              {/* FAQ 4 */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <button className="flex items-center justify-between w-full text-left">
                  <span className="text-lg font-bold text-slate-900">Is delivery available for all locations?</span>
                  <span className="material-symbols-outlined text-primary">expand_more</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="bg-slate-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-20 blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-20 blur-[100px] -ml-48 -mb-48 pointer-events-none"></div>
              
              <h2 className="font-display text-5xl font-bold mb-8 relative z-10">Ready to Get Started?</h2>
              <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">Join thousands of drivers who have simplified their automotive journey with our modern platform.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link href="/fleet" className="bg-primary text-white px-10 py-5 rounded-xl font-button text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-primary/30">Start Your Rental</Link>
                <Link href="/sales" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-xl font-button text-lg hover:bg-white/20 transition-colors">Contact Sales Team</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
