import Image from 'next/image';
import Link from "next/link";
export default function HeroSection() {
  return (
    <section className="relative min-h-[870px] flex flex-col overflow-hidden">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          className="object-cover"
          alt="A black Yaris, a dark minivan, and a white Tesla Model 3 driving on a highway"
          src="/hero-cars.png"
          fill
          priority
        />
        {/* Adjusted gradient: dark on the left/bottom to read text, fading smoothly */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
      </div>

      {/* Top Content: Text (Centered in available space above the search box) */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full flex-grow flex flex-col justify-center pt-32 pb-16">
        <div className="max-w-full text-white">
          <h1 className="font-display text-5xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
            Drive Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Ambition.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl font-medium">
            Experience the pinnacle of automotive engineering with our curated fleet of premium rentals and certified sales inventory.
          </p>
        </div>
      </div>

      {/* Bottom Content: Search Box (Pushed to the very bottom) */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pb-10">
        {/* Search/Toggle Component - Premium Glassmorphism */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 md:p-8 rounded-[2rem] shadow-2xl max-w-5xl relative overflow-hidden group">
          {/* Subtle animated glow inside the glass panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

          <div className="flex gap-2 mb-8 p-1.5 bg-slate-900/50 rounded-2xl w-fit border border-white/10 backdrop-blur-md">
            <button className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Rent a Car
            </button>
            <button className="px-8 py-3 rounded-xl text-slate-300 font-bold hover:text-white hover:bg-white/10 transition-colors cursor-pointer" >
              <Link href="/sales">Buy a Car</Link>
            </button>
          </div>

          {/* Rental Form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end relative z-10">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-300 ml-1">Pickup Location</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10">
                  location_on
                </span>
                <input
                  className="w-full h-14 pl-12 pr-4 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white placeholder:text-slate-400 backdrop-blur-sm"
                  placeholder="City or Airport"
                  type="text"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-300 ml-1">Pickup Date</label>
              <input
                className="w-full h-14 px-4 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white backdrop-blur-sm [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
                type="date"
              />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-300 ml-1">Return Date</label>
              <input
                className="w-full h-14 px-4 rounded-xl border border-white/20 bg-white/5 focus:bg-white/10 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-white backdrop-blur-sm [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]"
                type="date"
              />
            </div>
            <button className="h-14 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-800 active:scale-95 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] border border-blue-400/30">
              Search Fleet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
