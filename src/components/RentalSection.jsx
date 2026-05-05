export default function RentalSection() {
  return (
    <section className="py-section-gap max-w-7xl mx-auto px-8">
      <div className="flex justify-between items-end mb-stack-lg">
        <div className="space-y-stack-sm">
          <span className="text-primary font-label-lg uppercase tracking-widest">Premium Fleet</span>
          <h2 className="font-h2 text-h2">Curated Rental Experience</h2>
        </div>
        <a className="text-primary font-button flex items-center gap-2 hover:underline" href="/fleet">
          View All Fleet <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(30,41,59,0.05)] overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="h-64 overflow-hidden relative">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt="BMW 5 Series"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtgjJdClPdCIQVW-GPt6HyfYjev-F6IVH5to1H7dpIpxRP3d9lC1OL-zlf_DDqdJlBjGe7l88MUr2cn2G88upYxQmaU7Jg-QuLT4LYI9RS8pV8TLWyyojTNO6wKzra6L_RxfCC0q753cfc9w5Wvh8v-XKHXTihdEvGnjCUn57uvwqtSuOl8pyz8vsQvuG9TUzNqSNyTciA4jLOisiLp9zsGlXPMX-vPNCZyHvszUAu-12zPi-UurOumjUU95X84gS-iuHaGaMUTWpU"
            />
            <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded text-label-md">NEW ARRIVAL</div>
          </div>
          <div className="p-stack-lg">
            <div className="flex justify-between items-start mb-stack-md">
              <div>
                <h3 className="font-h3 text-h3">BMW 5 Series</h3>
                <p className="text-on-surface-variant text-body-sm">Executive Sedan • 2024</p>
              </div>
              <div className="text-right">
                <span className="text-primary font-h3">$120</span>
                <p className="text-label-md text-on-surface-variant uppercase">/ Day</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 py-stack-md border-y border-outline-variant/30 mb-stack-md">
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-outline">airline_seat_recline_normal</span>
                <span className="text-label-md">5 Seats</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-outline">settings</span>
                <span className="text-label-md">Auto</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-outline">local_gas_station</span>
                <span className="text-label-md">Hybrid</span>
              </div>
            </div>
            <button className="w-full py-3 border-2 border-primary text-primary rounded-lg font-button hover:bg-primary hover:text-on-primary transition-all">Rent Now</button>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(30,41,59,0.05)] overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="h-64 overflow-hidden relative">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt="Range Rover Sport"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcc9qJd5cwDRoVgLUZZR3RtO53_0W3haaZJ9GIRE6xib5ztQ-wzMKWskogUkCYtr30C-0JE8Z0fLF5x0j_hbezeJ4JVkyxd8tHYnsXiz0Nd0man4qOiParhixuW2_HsKCthicg5tfhK_x44ImjHVARXVix9hDcAHBbIZTe8polGhcpaP94Z_kXtX3kjS7hZVO17qDDZte1NZHwRINZfhz2zG5qtTB7pAgTt2PP9apl7GSDdui79VmW8C2uGgj7UuGQmVTdj4zaEwip"
            />
          </div>
          <div className="p-stack-lg">
            <div className="flex justify-between items-start mb-stack-md">
              <div>
                <h3 className="font-h3 text-h3">Range Rover Sport</h3>
                <p className="text-on-surface-variant text-body-sm">Luxury SUV • 2023</p>
              </div>
              <div className="text-right">
                <span className="text-primary font-h3">$185</span>
                <p className="text-label-md text-on-surface-variant uppercase">/ Day</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 py-stack-md border-y border-outline-variant/30 mb-stack-md">
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-outline">airline_seat_recline_normal</span>
                <span className="text-label-md">7 Seats</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-outline">settings</span>
                <span className="text-label-md">4x4</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-outline">local_gas_station</span>
                <span className="text-label-md">Diesel</span>
              </div>
            </div>
            <button className="w-full py-3 border-2 border-primary text-primary rounded-lg font-button hover:bg-primary hover:text-on-primary transition-all">Rent Now</button>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-[0px_4px_20px_rgba(30,41,59,0.05)] overflow-hidden group hover:shadow-xl transition-all duration-300">
          <div className="h-64 overflow-hidden relative">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              alt="Ferrari 488 GTB"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOC1OHQHs3hVmxQ5xfUbHJVkNJulEeinH0M5jnNzIvLsZ1cQNS1z-nfTTMrDY7trX9wL9rpEc-v-N7LqLIEnUFxUiffMMeQVqle6gXFGu_mMJT6WmUq7YRy4Lr1mIkC1AEZanzAToJp6qsaRj2Z7kmNEv5ZZW2DsY_LhNBcKiqZXe588TwxHuucxZgg51lw9rYjgfSErJ3ZpsOr7665HNUHIhXvDHCIV6k9u2EcipGFnT9dNrideJlfsSYMCxdr-ka0h_iHXSxw-1_"
            />
          </div>
          <div className="p-stack-lg">
            <div className="flex justify-between items-start mb-stack-md">
              <div>
                <h3 className="font-h3 text-h3">Ferrari 488 GTB</h3>
                <p className="text-on-surface-variant text-body-sm">Supercar • 2022</p>
              </div>
              <div className="text-right">
                <span className="text-primary font-h3">$450</span>
                <p className="text-label-md text-on-surface-variant uppercase">/ Day</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 py-stack-md border-y border-outline-variant/30 mb-stack-md">
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-outline">airline_seat_recline_normal</span>
                <span className="text-label-md">2 Seats</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-outline">speed</span>
                <span className="text-label-md">F1-Shift</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-outline">local_gas_station</span>
                <span className="text-label-md">Petrol</span>
              </div>
            </div>
            <button className="w-full py-3 border-2 border-primary text-primary rounded-lg font-button hover:bg-primary hover:text-on-primary transition-all">Rent Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
