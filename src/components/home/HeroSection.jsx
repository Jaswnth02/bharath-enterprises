import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, MessageCircle } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const HeroSection = () => {
  const { t } = useTranslation();
  const { settings, openEnquiryModal } = useSite();

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919876543210';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello Bharath Enterprises, I would like to inquire about your products and commercial supply capabilities.")}`;

  return (
    <section className="relative text-white overflow-hidden py-20 lg:py-28 bg-[#0E1E35]">
      {/* Background industrial image with deep overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80"
          alt="Industrial Manufacturing Background"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1E35] via-[#0E1E35]/90 to-[#0E1E35]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-accent text-xs font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>{t('hero.badge')} • Est. {settings.establishedYear || '2025'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
              Building Business Connections Through <span className="text-accent underline decoration-accent/40 decoration-wavy">Quality & Reliability</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-light">
              Bharath Enterprises is an established commercial entity in Coimbatore, Tamil Nadu, supplying high-grade solutions across Manufacturing, Wholesale Distribution, Retail & Trading, Import-Export, and Industrial Supplies.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-primary font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span>{t('hero.exploreProducts')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => openEnquiryModal({ enquiryType: 'General Business' })}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-md shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>{t('common.enquireNow')}</span>
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Quick WhatsApp</span>
              </a>
            </div>

            {/* Credibility metric badges in translucent glass */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-4 text-left">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">10–50+</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 uppercase tracking-wider font-medium">Catalogue Items</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                <p className="text-xl sm:text-2xl font-bold text-accent tracking-tight">5 Core</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 uppercase tracking-wider font-medium">Business Domains</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-xs">
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">100%</p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 uppercase tracking-wider font-medium">Coimbatore Based</p>
              </div>
            </div>
          </div>

          {/* Right Column: Luminous White Glass Card */}
          <div className="lg:col-span-5">
            <div className="glass-white-elevated rounded-3xl p-7 sm:p-9 text-slate-800 shadow-2xl relative">
              <div className="absolute -top-3 -right-3 bg-accent text-primary text-[10px] font-extrabold uppercase px-3.5 py-1 rounded-full shadow-md tracking-wider">
                Industrial Standard
              </div>

              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm p-1.5 border border-white flex items-center justify-center">
                  <img
                    src={settings.logo || '/logo-mark.svg'}
                    alt="Bharath Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary leading-tight font-sans">
                    Bharath Enterprises
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Coimbatore Commercial Desk</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                Direct procurement, transparent pricing, and structured batch testing for all industrial and commercial requirements across Tamil Nadu and international trade lanes.
              </p>

              <div className="space-y-3 border-t border-slate-200/80 pt-5 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>Verified B2B wholesale supply agreements</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>Multi-category industrial fastener & casting supply</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>Direct import-export coordination & cargo logistics</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">Operating from Coimbatore, TN</span>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:underline"
                >
                  <span>Company Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
