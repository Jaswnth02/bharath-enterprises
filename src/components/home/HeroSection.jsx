import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const HeroSection = () => {
  const { t } = useTranslation();
  const { settings, openEnquiryModal } = useSite();

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
      {/* Subtle ambient lighting for white glass refraction */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-primary/5 via-accent/8 to-secondary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6 sm:space-y-8">
        {/* Minimal Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full glass-white border border-white/90 shadow-2xs text-[11px] sm:text-xs font-semibold text-slate-700 animate-in fade-in">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Coimbatore, Tamil Nadu • Est. {settings.establishedYear || '2025'}</span>
        </div>

        {/* Crisp Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-primary leading-tight font-sans max-w-3xl mx-auto">
          Building Business Connections Through <span className="text-accent underline decoration-accent/30 decoration-wavy">Quality & Reliability</span>
        </h1>

        {/* Short, Clean Subtitle */}
        <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
          Your established commercial partner in Manufacturing, Wholesale Distribution, Trading, Import & Export, and Industrial Supplies across South India.
        </p>

        {/* Two Clear, Refined Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-1 w-full max-w-xs sm:max-w-none mx-auto">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-98"
          >
            <span>{t('hero.exploreProducts')}</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>

          <button
            type="button"
            onClick={() => openEnquiryModal({ enquiryType: 'General Business' })}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 glass-white hover:bg-white text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-white/90 shadow-2xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:scale-98"
          >
            <MessageSquare className="w-4 h-4 text-accent" />
            <span>{t('common.enquireNow')}</span>
          </button>
        </div>

        {/* 3 Minimal Metrics in White Glass */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-2xl mx-auto pt-4 sm:pt-6 text-center">
          <div className="glass-white p-2.5 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <p className="text-lg sm:text-2xl font-bold text-primary font-sans">10–50+</p>
            <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">Catalogue Items</p>
          </div>
          <div className="glass-white p-2.5 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <p className="text-lg sm:text-2xl font-bold text-accent font-sans">5 Core</p>
            <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">Disciplines</p>
          </div>
          <div className="glass-white p-2.5 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <p className="text-lg sm:text-2xl font-bold text-primary font-sans">100%</p>
            <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">Coimbatore Based</p>
          </div>
        </div>
      </div>
    </section>
  );
};
