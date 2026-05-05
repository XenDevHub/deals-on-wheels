import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 full-width py-12 px-8 border-t border-slate-200 dark:border-slate-800">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        <div className="space-y-4">
          <div className="text-xl font-bold text-slate-900 dark:text-white font-display">DealsOnWheels</div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-display">Premium Automotive Solutions for the modern driver. Rent or buy with absolute confidence.</p>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-2">Services</span>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm hover:underline decoration-blue-600 decoration-2 underline-offset-4" href="/fleet">Fleet</Link>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm hover:underline decoration-blue-600 decoration-2 underline-offset-4" href="/sales">Sales</Link>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm hover:underline decoration-blue-600 decoration-2 underline-offset-4" href="/how-it-works">How it Works</Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-2">Company</span>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm hover:underline decoration-blue-600 decoration-2 underline-offset-4" href="/about">About</Link>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm hover:underline decoration-blue-600 decoration-2 underline-offset-4" href="/#faq">FAQ</Link>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm hover:underline decoration-blue-600 decoration-2 underline-offset-4" href="/#contact">Contact Us</Link>
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-2">Legal</span>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm hover:underline decoration-blue-600 decoration-2 underline-offset-4" href="/#privacy">Privacy Policy</Link>
          <Link className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm hover:underline decoration-blue-600 decoration-2 underline-offset-4" href="/#terms">Terms of Service</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-display">© {new Date().getFullYear()} DealsOnWheels. Premium Automotive Solutions.</p>
      </div>
    </footer>
  );
}
