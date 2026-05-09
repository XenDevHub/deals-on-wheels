export default function Testimonials() {
  return (
    <section className="py-section-gap bg-slate-950 text-white">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-primary font-label-lg uppercase tracking-widest">Client Testimonials</span>
          <h2 className="font-display text-display mt-4">Voices of Excellence</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Testimonial 1 */}
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <div className="flex gap-1 text-primary mb-stack-lg">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="font-body-lg mb-8 italic">"The rental experience was seamless. From the digital booking to the vehicle handover, DealsOnWheels sets a new benchmark for automotive services."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="James Kensington"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkyVbCOfKGZ23NpaLIfPrat-hF5OoBMK-dDQFYOpeUehOzSrxtlxv8H7NvIsf68KwHhjJxQ2MmOp94ttZIEW4JEaipO7xFnFqhUwqSlJAXq9GR8h7g9sR68pRnJxYsbGbe5fH_HulUGn2xp4Zw1ECoJklQzyLZTyRPUryiysaGZ0Ywg03vtPTphPF2bcwiJMSUmVJUFT-ievab1TrQV775J9pnwMiU7krXyos0iyxxnbMNx0VDz6XSq9_GVW-Myd9tPUX5Q-0wP-HY"
                />
              </div>
              <div>
                <p className="font-button">James Kensington</p>
                <p className="text-label-md text-slate-400">Tech Entrepreneur</p>
              </div>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <div className="flex gap-1 text-primary mb-stack-lg">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="font-body-lg mb-8 italic">"I purchased my certified pre-owned BMW through them. The transparency and level of inspection gave me total peace of mind. Highly recommended."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Sarah Chen"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAianXJISiFOWsQSR9MMGSfJczHIQ4ly98mpYg8vjiiiDYzK242sj0sRItuRT1G5brJ-EPtR3wFarpnf_p1tnAsajV_CcDI0-39gBNRkAxwe9os3-QW-rg3jXiUbJQ3yyn4qZQ_L0560vO2docYcpSYGHabHKXIw4RPBoVzcdi_yqwRqSPkW2Ik6BNsKdpIEf0rf8iu0BUCyqaeJnWRvfpX4_Qp0FVFHh8xckAdgqctR-SSrrVjBO1eCyuMRqnbI_IULV4jIQTefX42"
                />
              </div>
              <div>
                <p className="font-button">Sarah Chen</p>
                <p className="text-label-md text-slate-400">Investment Banker</p>
              </div>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
            <div className="flex gap-1 text-primary mb-stack-lg">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="font-body-lg mb-8 italic">"Their fleet variety is unmatched. Whether I need a rugged SUV for a weekend trip or a sleek sedan for business meetings, they always deliver."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Michael Russo"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsSYTLu_XtwrM7iZViWLGtIU2M1wlqqb2NofS-iHD1fcdow3_xNj4yIGVzzLffUUNLt4J9uc8TuxRdrDFGKb2y7QLWvX_tdgVE0iKRjy5cmEuB01xBdnr2ubW6OCJ6bQEVppHw0QdtDM_6yP31mx_Jzm5fKT09CQ5RajIFWyUGVEfHNvykQnE4nhmgwBIvWD1m4vnNDLmVqvmtOr3Wl8p7qg6sT0SLF2-4licYkZxXi__-uemYpypDyQeUxUEBp0eyspLBTCxejyIv"
                />
              </div>
              <div>
                <p className="font-button">Michael Russo</p>
                <p className="text-label-md text-slate-400">Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
