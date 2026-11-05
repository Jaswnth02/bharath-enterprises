import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../utils/seo';
import { useSite } from '../../src/context/SiteContext';
import {
  Building2,
  Target,
  Compass,
  CheckCircle,
  MapPin,
  ShieldCheck,
  Award,
  Users,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();
  const { settings, openEnquiryModal } = useSite();

  useSEO({
    title: 'About Us | Bharath Enterprises – Coimbatore',
    description: 'Learn about Bharath Enterprises, established in 2025 in Coimbatore, Tamil Nadu. Discover our mission, vision, core values, and multi-category commercial capabilities.',
    keywords: 'About Bharath Enterprises, Coimbatore enterprise, industrial supplier Coimbatore, commercial distribution Tamil Nadu',
  });

  return (
    <div className="bg-white">
      {/* Page Header Banner */}
      <div className="bg-primary py-16 sm:py-20 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">
            {t('about.title')}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans">
            Committed to Industrial Excellence & Commercial Trust
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-3 leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Company Story & Background */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold text-accent uppercase tracking-widest block">
                {t('about.backgroundTitle')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                Grounded in Coimbatore's Engineering & Trading Heritage
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {settings.aboutContent}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Operating from the industrial corridor of Coimbatore, Tamil Nadu, Bharath Enterprises bridges critical supply gaps for machine builders, industrial fabricators, commercial contractors, and regional wholesalers. We ensure transparent pricing, consistent stock reserves, and verified quality standards.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3">
                <div className="border-l-2 border-accent pl-3">
                  <p className="text-xl font-bold text-primary">2025</p>
                  <p className="text-xs text-slate-500">Year Established</p>
                </div>
                <div className="border-l-2 border-accent pl-3">
                  <p className="text-xl font-bold text-primary">Coimbatore</p>
                  <p className="text-xs text-slate-500">Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
                alt="Bharath Enterprises Sourcing"
                className="rounded-xl object-cover h-52 w-full shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80"
                alt="Bharath Enterprises Warehousing"
                className="rounded-xl object-cover h-52 w-full shadow-md mt-6"
              />
              <img
                src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80"
                alt="Bharath Enterprises Precision"
                className="rounded-xl object-cover h-52 w-full shadow-md -mt-6"
              />
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80"
                alt="Bharath Enterprises Distribution"
                className="rounded-xl object-cover h-52 w-full shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-surface border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{t('about.missionTitle')}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {settings.mission}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{t('about.visionTitle')}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {settings.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Company Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
              {t('about.valuesTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-sans">
              The Tenets of Bharath Enterprises
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <ShieldCheck className="w-8 h-8 text-accent mb-3" />
              <h4 className="text-sm font-bold text-primary mb-1">Quality Assured Sourcing</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We ensure that industrial supplies, fastener grades, and castings conform rigorously to technical blueprints and industry tolerances.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <Users className="w-8 h-8 text-accent mb-3" />
              <h4 className="text-sm font-bold text-primary mb-1">Customer-First Transparency</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clear quotes, truthful delivery timelines, and proactive order updates for our B2B and B2C commercial partners.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white">
              <Clock className="w-8 h-8 text-accent mb-3" />
              <h4 className="text-sm font-bold text-primary mb-1">Reliable Distribution Timelines</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Minimizing customer downtime through planned consignments and efficient dispatch protocols from Coimbatore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-surface border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-primary">
            Partner With Bharath Enterprises
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Discuss your procurement, manufacturing, wholesale distribution, or import-export requirements with our Coimbatore team.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => openEnquiryModal({ enquiryType: 'General Business' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
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
