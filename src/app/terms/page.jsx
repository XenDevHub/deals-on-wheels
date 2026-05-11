"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-24 max-w-4xl mx-auto px-8 w-full">
        <div className="mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm block mb-4 text-center">Legal</span>
          <h1 className="font-display text-5xl font-black text-slate-900 text-center mb-8">Terms of Service</h1>
          <p className="text-slate-500 text-center text-lg italic">Last Updated: May 2026</p>
        </div>

        <div className="bg-white p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-10 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">1. Agreement to Terms</h2>
            <p>
              By accessing or using the DealsOnWheels website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">2. Rental Conditions</h2>
            <p>
              All rental clients must be at least 21 years of age and hold a valid, unrestricted driver's license. Vehicles must be returned in the same condition as received. Late returns will incur additional daily charges as specified in the rental agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">3. Sales and Transactions</h2>
            <p>
              For vehicle sales, all deposits are non-refundable unless otherwise stated. Final payment must be cleared before the vehicle is released. While we strive for accuracy, we reserve the right to correct any errors in pricing or vehicle specifications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">4. Prohibited Use</h2>
            <p>
              Rental vehicles may not be used for illegal activities, racing, towing, or off-road driving. Smoking is strictly prohibited inside all vehicles. Failure to comply will result in immediate termination of the agreement and potential fines.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">5. Limitation of Liability</h2>
            <p>
              DealsOnWheels shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our vehicles or website. Our liability is limited to the amount paid for the specific service provided.
            </p>
          </section>

          <section className="pt-8 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">Governing Law</h2>
            <p>These terms are governed by the laws of Victoria, Australia. Any disputes will be subject to the exclusive jurisdiction of the courts in Melbourne.</p>
            <div className="mt-4 text-slate-900 font-bold">
              <p>Email: sales@dealsonwheelsonthego.com.au</p>
              <p>Email: support@dealsonwheelsonthego.com.au</p>
              <p>Phone: +61 433 178 890</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
