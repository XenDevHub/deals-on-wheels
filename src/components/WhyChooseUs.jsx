export default function WhyChooseUs() {
  return (
    <section className="bg-surface-container py-section-gap">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-stack-lg">
            <span className="text-primary text-xs sm:text-sm font-label-lg uppercase tracking-widest">Why Choose Us</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl leading-tight font-black text-slate-900">Elevating the Standard of Automotive Luxury.</h2>
            <div className="space-y-gutter">
              <div className="flex gap-stack-lg">
                <div className="bg-primary-container p-3 rounded-lg h-fit text-on-primary-container">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <h4 className="font-h3 text-lg sm:text-xl font-bold mb-2">Unwavering Trust</h4>
                  <p className="text-on-surface-variant text-sm sm:text-base">Every vehicle undergoes a rigorous 200-point inspection and sanitization process before delivery.</p>
                </div>
              </div>
              <div className="flex gap-stack-lg">
                <div className="bg-primary-container p-3 rounded-lg h-fit text-on-primary-container">
                  <span className="material-symbols-outlined">electric_bolt</span>
                </div>
                <div>
                  <h4 className="font-h3 text-lg sm:text-xl font-bold mb-2">High-Velocity Efficiency</h4>
                  <p className="text-on-surface-variant text-sm sm:text-base">Our digital-first booking system allows you to secure your dream car in under 60 seconds.</p>
                </div>
              </div>
              <div className="flex gap-stack-lg">
                <div className="bg-primary-container p-3 rounded-lg h-fit text-on-primary-container">
                  <span className="material-symbols-outlined">support_agent</span>
                </div>
                <div>
                  <h4 className="font-h3 text-lg sm:text-xl font-bold mb-2">24/7 Concierge</h4>
                  <p className="text-on-surface-variant text-sm sm:text-base">Dedicated support specialists are available around the clock to assist with any request.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover"
                alt="Concierge handing over key"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhTyPpskRU3MpfqOaIdIbeOurkVoMMuXEOuN1qZ35viqVl466yyRY78Gx_AEV0poj5RUpmwymZL1MZ6xTtRuRcp8Z40398Dp3QDELVTDZ2bQPrXivbswXt13j19vmqaw4xzLP3cisdv0NjfEswoqktfNPrPIiha7mnt3UOWCrVYvPDCNK953CdD5bgZgZoIAPjD9BnX5vbmu5jk_84GtUfXpTyuYKshote29A6GMkCoSN08lnHimLQsgvSOlhuLtxxPqGazBvBPWhH"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white p-4 md:p-6 rounded-xl shadow-xl max-w-[250px] md:max-w-xs border border-slate-100">
              <p className="text-2xl md:text-4xl font-black font-display mb-1 text-primary">5000+</p>
              <p className="text-xs md:text-sm text-on-surface-variant uppercase tracking-wider font-bold">Premium Deliveries This Year</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
