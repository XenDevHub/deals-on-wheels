import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-20 px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14">
                <Image
                  src="/logo.png"
                  alt="DealsOnWheels"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div className="text-3xl font-black text-white tracking-tighter font-display italic">
                Deals<span className="text-primary">On</span>Wheels
              </div>
            </div>
            <p className="text-lg leading-relaxed max-w-sm">
              Redefining automotive excellence in Melbourne. Experience the ultimate in premium car rentals and certified pre-owned sales.
            </p>
           
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Experience</h4>
            <div className="flex flex-col gap-4">
              <Link className="hover:text-primary transition-colors text-sm" href="/fleet">The Fleet</Link>
              <Link className="hover:text-primary transition-colors text-sm" href="/sales">Sales Gallery</Link>
              <Link className="hover:text-primary transition-colors text-sm" href="/how-it-works">How it Works</Link>
              <Link className="hover:text-primary transition-colors text-sm" href="/about">Our Story</Link>
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-6 space-y-8">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm">Get In Touch</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <span className="material-symbols-outlined text-primary">phone_iphone</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm uppercase tracking-wider mb-1">Call Us</p>
                  <a href="tel:+61433178890" className="text-lg hover:text-primary transition-colors font-display tracking-tight">+61 433 178 890</a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <span className="material-symbols-outlined text-primary">alternate_email</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm uppercase tracking-wider mb-1">Our Email</p>
                  <a href="mailto:dealsonwheelsonthego@gmail.com" className="text-[15px] hover:text-primary transition-colors break-all">dealsonwheelsonthego@gmail.com</a>
                </div>
              </div>
              <div className="flex gap-4 md:col-span-2">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                </div>
                <div>
                  <p className="text-white font-bold text-sm uppercase tracking-wider mb-1">Our Address</p>
                  <p className="text-lg font-display tracking-tight uppercase">Melbourne, Victoria</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">© {new Date().getFullYear()} DealsOnWheels. All Rights Reserved.</p>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-bold">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
