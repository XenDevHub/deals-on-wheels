export default function SalesSection() {
  return (
    <section className="py-section-gap max-w-7xl mx-auto px-8">
      <div className="flex justify-between items-end mb-stack-lg">
        <div className="space-y-stack-sm">
          <span className="text-primary font-label-lg uppercase tracking-widest">Certified Sales</span>
          <h2 className="font-h2 text-h2">Find Your Permanent Drive</h2>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-outline hover:border-primary hover:text-primary transition-all">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant text-outline hover:border-primary hover:text-primary transition-all">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        {/* Sales Card 1 */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all group">
          <div className="h-48 relative overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              alt="Mercedes-Benz E 450"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9VJKkrszsODLJv8pMG3YK55Bju-_Kf92JVNvtXd8qlOnTiT8mFagOujVv5KfxYJ2Px6cCjInNGON7VkzdSqWJ9hd3iHOvVw4ERcQxcko3Kpc9f-Dd9Twrgk6zo0maC4TdjSPk9WrkKlGrG7IvMAPgysGCq4t1Azw1NEbb14KAk0Cw9_fMnv-LTx5hNr6vOyhsYHEMDCLHiKg6cXi2HCbxNMmu8Bn-Nxi4hnzVMbTirbJY_SBylQymtEQV2VwcdXMirJSkVSOhn4Ei"
            />
          </div>
          <div className="p-stack-md">
            <h4 className="font-h3 text-[18px]">Mercedes-Benz E 450</h4>
            <p className="text-on-surface-variant text-body-sm mb-stack-md">12,400 miles • 2023</p>
            <div className="flex justify-between items-center">
              <span className="text-h3 font-display">$68,500</span>
              <button className="bg-surface-container text-primary p-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
        {/* Sales Card 2 */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all group">
          <div className="h-48 relative overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              alt="Tesla Model S Plaid"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBr8OfExu_extERu8y03_lVjU6zcH-QNFIp6oudvSIKxbfvf0Isak-TKlbzlf35N-281In9v3Hae8iQ4tBzFUwlF7LzOBMtiidxtNrfmK897tHqZrLb309VJ7sdrVojnNi86QaRUN70L_yGN7Hmb6HdOm9YxAdBIYTJXVA9fEpVIoy5D9sqYeSXyPADGHATxLSFKUfLaElUc1aNV3TVLrfpo9aVrYx9ygUoi8BQqTcUZzH2AMmoEp9-hv479DSIPOI0zmf0lEWBd1L"
            />
          </div>
          <div className="p-stack-md">
            <h4 className="font-h3 text-[18px]">Tesla Model S Plaid</h4>
            <p className="text-on-surface-variant text-body-sm mb-stack-md">8,200 miles • 2022</p>
            <div className="flex justify-between items-center">
              <span className="text-h3 font-display">$84,900</span>
              <button className="bg-surface-container text-primary p-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
        {/* Sales Card 3 */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all group">
          <div className="h-48 relative overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              alt="Audi Q8 Premium"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSvbNIxuicFNfzhvCIM07tKBGvAXIIb0wNTenB1ixXqVX2CvzbkibgKCqiYGSbPiwnIO3X0w4zIUTgzrHAauNM2dXDDq3hyWD9Ai1ofZ6YGwDuNtt8_rb7OS1-lA0ESeU6-svhcYBKACv_aE_cFbOT4CUeXecZjgzjWZ7IQz-iCx4YiEtopSw909w5HEU4-hhWMFbcH5kbNr7j8c-XmxD9SH6hlsvVA3u8kN0lENQKzKZ89C2bx4UOjjytpKJ2t5TEA35gGFMaPtJn"
            />
          </div>
          <div className="p-stack-md">
            <h4 className="font-h3 text-[18px]">Audi Q8 Premium</h4>
            <p className="text-on-surface-variant text-body-sm mb-stack-md">15,000 miles • 2023</p>
            <div className="flex justify-between items-center">
              <span className="text-h3 font-display">$72,300</span>
              <button className="bg-surface-container text-primary p-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
        {/* Sales Card 4 */}
        <div className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all group">
          <div className="h-48 relative overflow-hidden">
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              alt="Lexus LS 500h"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsTcse7oBg4VCQmzQKLKYFzvyNCV69jeMY-sAKv5zPrbhNQSS_zQbgIXLDDBMsebit1E0uFAH9kPazOqD6WqDo4i91Gb642A8orqo9cagk_9QLev4nm3s0zZa55Xkymu6geL_CP-SiO9a3HbQLcA__SsTmuCTNsN_jHa1JcbebyTNqiqKNS9267p99mA4KEGMyxVwbUbMj9VYpkJMwtBQGnmTZwW9sRtpPEkFQNU2NzWb9cY17pTzuovePI2rhxj6pCebJiSYx_x_2"
            />
          </div>
          <div className="p-stack-md">
            <h4 className="font-h3 text-[18px]">Lexus LS 500h</h4>
            <p className="text-on-surface-variant text-body-sm mb-stack-md">5,400 miles • 2024</p>
            <div className="flex justify-between items-center">
              <span className="text-h3 font-display">$91,000</span>
              <button className="bg-surface-container text-primary p-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
