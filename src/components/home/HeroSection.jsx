import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MessageSquare, Globe2, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const HeroSection = () => {
  const { t } = useTranslation();
  const { settings, openEnquiryModal } = useSite();

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24">
      {/* Subtle ambient lighting for white glass refraction */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[750px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-primary/5 via-accent/10 to-secondary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6 sm:space-y-8">
        {/* Minimal Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full glass-white border border-white/90 shadow-2xs text-[11px] sm:text-xs font-semibold text-slate-700 animate-in fade-in">
          <Globe2 className="w-3.5 h-3.5 text-accent animate-pulse" />
          <span>Coimbatore, Tamil Nadu, India • Global Business Development</span>
        </div>

        {/* Crisp Poster Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-primary leading-tight font-sans max-w-3xl mx-auto uppercase">
          Connecting Opportunities <span className="text-accent underline decoration-accent/30 decoration-wavy">Globally</span>
        </h1>

        {/* Domain Tags Sub-Ribbon from Poster */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto text-[11px] sm:text-xs font-bold text-slate-600">
          <span className="px-2.5 py-1 rounded-lg glass-white border border-white/80 shadow-2xs">Import</span>
          <span className="text-accent font-black">•</span>
          <span className="px-2.5 py-1 rounded-lg glass-white border border-white/80 shadow-2xs">Export</span>
          <span className="text-accent font-black">•</span>
          <span className="px-2.5 py-1 rounded-lg glass-white border border-white/80 shadow-2xs">Sourcing</span>
          <span className="text-accent font-black">•</span>
          <span className="px-2.5 py-1 rounded-lg glass-white border border-white/80 shadow-2xs">Consulting</span>
          <span className="text-accent font-black">•</span>
          <span className="px-2.5 py-1 rounded-lg glass-white border border-white/80 shadow-2xs">Projects</span>
          <span className="text-accent font-black">•</span>
          <span className="px-2.5 py-1 rounded-lg glass-white border border-white/80 shadow-2xs">Business Development</span>
        </div>

        {/* Overview Paragraph */}
        <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
          Bharath Enterprises is a global business development and consulting company, helping businesses grow through import, export, sourcing, project development, and strategic partnerships. We connect Indian industries with global markets and support international companies to expand their presence in India and Asia.
        </p>

        {/* Two Clear, Refined Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-1 w-full max-w-xs sm:max-w-none mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-98"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4 text-accent" />
          </Link>

          <button
            type="button"
            onClick={() => openEnquiryModal({ enquiryType: 'Global Business Development' })}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 glass-white hover:bg-white text-slate-800 text-xs sm:text-sm font-semibold rounded-xl border border-white/90 shadow-2xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:scale-98"
          >
            <MessageSquare className="w-4 h-4 text-accent" />
            <span>Connect With Us</span>
          </button>
        </div>

        {/* 3 Metrics in White Glass */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-2xl mx-auto pt-4 sm:pt-6 text-center">
          <div className="glass-white p-2.5 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <p className="text-lg sm:text-2xl font-bold text-primary font-sans">14+ Countries</p>
            <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">Global Presence</p>
          </div>
          <div className="glass-white p-2.5 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <p className="text-lg sm:text-2xl font-bold text-accent font-sans">5 Core</p>
            <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">Service Verticals</p>
          </div>
          <div className="glass-white p-2.5 sm:p-4 rounded-2xl border border-white/80 shadow-2xs">
            <p className="text-lg sm:text-2xl font-bold text-primary font-sans">10+ Sectors</p>
            <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">Industries Served</p>
          </div>
        </div>
      </div>
    </section>
  );
};
