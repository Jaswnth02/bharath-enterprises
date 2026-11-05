import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, Sparkles, Check, ArrowRight, Sprout, ShieldCheck } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const ShgCommunityImpact = () => {
  const { openEnquiryModal } = useSite();

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="glass-white-elevated rounded-3xl p-6 sm:p-10 md:p-14 border border-white/95 shadow-xl relative overflow-hidden">
          {/* Subtle warm refraction */}
          <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual / Image Column (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/90 glass-white p-1.5">
                <img
                  src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80"
                  alt="Nilgiris Women Self Help Group Community"
                  className="w-full h-72 sm:h-96 object-cover rounded-xl"
                />
                {/* Floating Impact Card */}
                <div className="absolute bottom-4 left-4 right-4 glass-white-elevated p-3.5 sm:p-4 rounded-xl border border-white/95 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-primary font-sans">
                        Community First Initiative
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Coonoor & Rural Nilgiris Registered SHGs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-[10px] sm:text-[11px] font-bold border border-amber-200/60">
                <Sprout className="w-3.5 h-3.5 text-amber-600" />
                <span>COMMUNITY & AGRI EMPOWERMENT</span>
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
                Empowering Nilgiris Self-Help Groups Through Direct Market Linkages
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                Bharath Enterprises is actively dedicated to uplifting registered rural women’s Self-Help Groups (SHGs) across Coonoor and the Nilgiris district. By providing branding assistance, quality standardization, and direct wholesale trade channels, we help hill artisans earn sustainable, dignified livelihoods.
              </p>

              {/* 3 Impact Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="glass-white p-3.5 rounded-2xl border border-white/80 shadow-2xs">
                  <p className="text-xl font-black text-primary font-sans">50+</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Artisans Supported</p>
                </div>
                <div className="glass-white p-3.5 rounded-2xl border border-white/80 shadow-2xs">
                  <p className="text-xl font-black text-accent font-sans">100%</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Fair Trade Margins</p>
                </div>
                <div className="glass-white p-3.5 rounded-2xl border border-white/80 shadow-2xs">
                  <p className="text-xl font-black text-emerald-600 font-sans">Zero</p>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">Middlemen Extraction</p>
                </div>
              </div>

              {/* Bullet Features */}
              <div className="space-y-2 text-xs text-slate-700 pt-1">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Pure steam-distilled eucalyptus oil & multi-floral forest honey</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Vanilla planifolia cultivation guidance and premium sun-sweat curing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Eco-conscious packaging with verified hygienic laboratory testing</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>Explore SHG Program</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal({
                      enquiryType: 'SHG / Agri Partnership',
                      productOrService: 'Nilgiris SHG Natural Products',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 glass-white hover:bg-white text-primary text-xs font-semibold rounded-xl border border-white/90 shadow-2xs transition-all active:scale-95"
                >
                  <span>Partner With Our SHG Desk</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
