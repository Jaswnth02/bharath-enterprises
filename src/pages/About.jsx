import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../utils/seo';
import { useSite } from '../context/SiteContext';
import {
  Target,
  Compass,
  ShieldCheck,
  Users,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();
  const { settings, openEnquiryModal } = useSite();

  useSEO({
    title: 'About Us | Bharath Enterprises – Coonoor & Coimbatore',
    description: 'Learn about Bharath Enterprises, established in 2025 in Coonoor and Coimbatore, Tamil Nadu. Discover our mission, vision, core disciplines, and community empowerment initiatives.',
    keywords: 'About Bharath Enterprises, Coonoor enterprise, Nilgiris tea wholesale, rubber recycling Coimbatore, plywood trading Tamil Nadu',
  });

  return (
    <div className="min-h-screen py-6 sm:py-10">
      {/* Page Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 sm:mb-10">
        <div className="glass-white-elevated p-5 sm:p-8 md:p-12 rounded-3xl border border-white/95 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
          <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-2 bg-accent/10 w-fit px-2.5 py-0.5 rounded-md">
            {t('about.title')}
          </span>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-primary">
            Committed to Quality, Sustainability & Commercial Trust
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-2 leading-relaxed font-light">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Company Story & Background */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <span className="text-[11px] sm:text-xs font-bold text-accent uppercase tracking-widest block">
              {t('about.backgroundTitle')}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary tracking-tight font-sans">
              Grounded in Nilgiris & Coimbatore's Commercial Heritage
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              {settings.aboutContent}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Operating across Coonoor and Coimbatore, Tamil Nadu, Bharath Enterprises bridges critical supply gaps in Nilgiris Tourism, Wholesale Food Distribution, Plywood Trading, Rubber Recycling, and Community Empowerment. We ensure transparent pricing, consistent stock reserves, and verified quality standards.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
              <div className="glass-white p-3 sm:p-4 rounded-2xl border border-white/80 shadow-xs">
                <p className="text-lg sm:text-xl font-bold text-primary font-sans">2025</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Year Established</p>
              </div>
              <div className="glass-white p-3 sm:p-4 rounded-2xl border border-white/80 shadow-xs">
                <p className="text-lg sm:text-xl font-bold text-primary font-sans leading-tight">Coonoor & Coimbatore</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Tamil Nadu, India</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3.5">
            <div className="glass-white p-1 rounded-2xl shadow-md border border-white/80">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
                alt="Bharath Enterprises Sourcing"
                className="rounded-xl object-cover h-36 sm:h-48 w-full"
              />
            </div>
            <div className="glass-white p-1 rounded-2xl shadow-md border border-white/80 mt-4 sm:mt-6">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
                alt="Bharath Enterprises Warehousing"
                className="rounded-xl object-cover h-36 sm:h-48 w-full"
              />
            </div>
            <div className="glass-white p-1 rounded-2xl shadow-md border border-white/80 -mt-4 sm:-mt-6">
              <img
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=600&q=80"
                alt="Bharath Enterprises Precision"
                className="rounded-xl object-cover h-36 sm:h-48 w-full"
              />
            </div>
            <div className="glass-white p-1 rounded-2xl shadow-md border border-white/80">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
                alt="Bharath Enterprises Distribution"
                className="rounded-xl object-cover h-36 sm:h-48 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision in Elevated Glass */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <div className="glass-white-elevated p-5 sm:p-8 rounded-3xl border border-white/95 shadow-lg relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary text-accent flex items-center justify-center mb-4 sm:mb-5 shadow-xs border border-white/60">
              <Target className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 font-sans">{t('about.missionTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              {settings.mission}
            </p>
          </div>

          <div className="glass-white-elevated p-5 sm:p-8 rounded-3xl border border-white/95 shadow-lg relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-primary text-accent flex items-center justify-center mb-4 sm:mb-5 shadow-xs border border-white/60">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3 font-sans">{t('about.visionTitle')}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              {settings.vision}
            </p>
          </div>
        </div>
      </section>

      {/* Core Company Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-14">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[10px] sm:text-xs font-bold text-accent uppercase tracking-widest block mb-1">
            {t('about.valuesTitle')}
          </span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary tracking-tight font-sans">
            The Tenets of Bharath Enterprises
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="glass-white p-5 sm:p-6 rounded-2xl border border-white/80 shadow-xs">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-accent mb-2.5 sm:mb-3" />
            <h4 className="text-sm font-bold text-primary mb-1 font-sans">Quality Assured Sourcing</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              We ensure all Nilgiris tea, snacks, plywood sheets, and recycled nitrile rubber conform strictly to quality benchmarks.
            </p>
          </div>

          <div className="glass-white p-5 sm:p-6 rounded-2xl border border-white/80 shadow-xs">
            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-accent mb-2.5 sm:mb-3" />
            <h4 className="text-sm font-bold text-primary mb-1 font-sans">Customer-First Transparency</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Clear quotes, truthful delivery timelines, and proactive order updates for our B2B and B2C commercial partners.
            </p>
          </div>

          <div className="glass-white p-5 sm:p-6 rounded-2xl border border-white/80 shadow-xs">
            <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-accent mb-2.5 sm:mb-3" />
            <h4 className="text-sm font-bold text-primary mb-1 font-sans">Regional Distribution Reliability</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Minimizing commercial delays through planned consignments and efficient dispatch protocols from Coonoor and Coimbatore.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Box in Glass */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="glass-white-elevated p-6 sm:p-8 md:p-10 rounded-3xl border border-white/95 text-center space-y-4 shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-primary font-sans">
            Partner With Bharath Enterprises
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-light">
            Discuss your wholesale FMCG, plywood trade, rubber recycling, tour packages, or SHG partnership requirements with our team.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => openEnquiryModal({ enquiryType: 'General Business' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>{t('common.enquireNow')}</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
