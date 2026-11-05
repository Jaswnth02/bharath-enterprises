import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronRight, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const HeroSection = () => {
  const { t } = useTranslation();
  const { settings, openEnquiryModal } = useSite();

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Subtle ambient lighting for white glass refraction */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-primary/5 via-accent/8 to-secondary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-8">
        {/* Minimal Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-white border border-white/90 shadow-2xs text-xs font-semibold text-slate-700 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Coimbatore, Tamil Nadu • Est. {settings.establishedYear || '2025'}</span>
        </div>

        {/* Crisp Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight font-sans max-w-4xl mx-auto">
          Building Business Connections Through <span className="text-accent underline decoration-accent/30 decoration-wavy">Quality & Reliability</span>
        </h1>

        {/* Short, Clean Subtitle */}
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
          Your established commercial partner in Manufacturing, Wholesale Distribution, Trading, Import & Export, and Industrial Supplies across South India.
        </p>

        {/* Two Clear, Refined Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <span>{t('hero.exploreProducts')}</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>

          <button
            type="button"
            onClick={() => openEnquiryModal({ enquiryType: 'General Business' })}
            className="inline-flex items-center gap-2 px-6 py-3 glass-white hover:bg-white text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-white/90 shadow-2xs hover:shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4 h-4 text-accent" />
            <span>{t('common.enquireNow')}</span>
          </button>
        </div>

        {/* Clean, Floating Frosted Showcase Card */}
        <div className="pt-8">
          <div className="glass-white-elevated p-3 sm:p-4 rounded-3xl border border-white/95 shadow-xl max-w-4xl mx-auto relative group">
            <div className="h-64 sm:h-96 rounded-2xl overflow-hidden relative bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80"
                alt="Bharath Enterprises Commercial Facility"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/20 to-transparent" />

              {/* Floating Frosted Pill in Image Corner */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto glass-white px-4 py-2.5 rounded-2xl shadow-lg border border-white/90 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-primary text-accent flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  BE
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary font-sans leading-tight">
                    Industrial & Commercial Supply Hub
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Verified B2B & B2C Distribution • Coimbatore Facility
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Minimal Metrics in White Glass */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-center">
          <div className="glass-white p-3 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <p className="text-xl sm:text-2xl font-bold text-primary font-sans">10–50+</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">Catalogue Products</p>
          </div>
          <div className="glass-white p-3 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <p className="text-xl sm:text-2xl font-bold text-accent font-sans">5 Core</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">Business Disciplines</p>
          </div>
          <div className="glass-white p-3 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <p className="text-xl sm:text-2xl font-bold text-primary font-sans">100%</p>
            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">Coimbatore Based</p>
          </div>
        </div>
      </div>
    </section>
  );
};
