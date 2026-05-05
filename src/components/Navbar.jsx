import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-slate-950 docked full-width top-0 sticky z-50 border-b border-slate-100 dark:border-slate-800 shadow-[0px_4px_20px_rgba(30,41,59,0.05)]">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter font-display">DealsOnWheels</Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="font-display font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/fleet">Rent</Link>
          <Link className="font-display font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/sales">Buy</Link>
          <Link className="font-display font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/how-it-works">How it Works</Link>
          <Link className="font-display font-medium text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="/about">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/fleet" className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-button hover:opacity-80 transition-opacity active:scale-95 duration-200">
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
