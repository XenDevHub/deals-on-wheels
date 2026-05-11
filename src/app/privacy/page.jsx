"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-24 max-w-4xl mx-auto px-8 w-full">
        <div className="mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-sm block mb-4 text-center">Legal</span>
          <h1 className="font-display text-5xl font-black text-slate-900 text-center mb-8">Privacy Policy</h1>
          <p className="text-slate-500 text-center text-lg italic">Last Updated: May 2026</p>
        </div>

        <div className="bg-white p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 space-y-10 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">1. Information We Collect</h2>
            <p>
              At DealsOnWheels, we collect information that is necessary to provide you with our premium automotive services. This includes personal identification information (Name, email address, phone number), driver's license details for rentals, and payment information for transactions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">2. How We Use Your Information</h2>
            <p>
              Your information is used to facilitate car rentals, process sales, verify identity, and provide customer support. We may also use your contact details to send you updates about our services or promotional offers that might interest you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">3. Data Protection</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. Your sensitive data (like credit card information) is encrypted and transmitted via Secure Socket Layer (SSL) technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">4. Third-Party Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except for trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">5. Your Consent</h2>
            <p>
              By using our site, you consent to our website's privacy policy. If we decide to change our privacy policy, we will post those changes on this page.
            </p>
          </section>

          <section className="pt-8 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display italic">Contact Us</h2>
            <p>If there are any questions regarding this privacy policy, you may contact us at:</p>
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
