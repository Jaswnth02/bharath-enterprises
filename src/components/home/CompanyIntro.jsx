import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Building2, MapPin, CheckCircle } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const CompanyIntro = () => {
  const { t } = useTranslation();
  const { settings } = useSite();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image side */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="Bharath Enterprises Coimbatore Operations"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">
                  Headquarters
                </span>
                <p className="text-sm font-semibold">Coimbatore, Tamil Nadu, India</p>
                <p className="text-xs text-slate-300">Commercial & Industrial Supply Operations</p>
              </div>
            </div>

            {/* Float badge */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 bg-white p-4 rounded-xl shadow-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  BE
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">Established 2025</p>
                  <p className="text-[10px] text-slate-500">Commercial Integrity</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
                {t('home.introTitle')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-sans">
                {t('home.introSubtitle')}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {settings.aboutContent || t('home.introText')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface border border-slate-100">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-primary">B2B & B2C Fulfilment</h4>
                  <p className="text-[11px] text-slate-500">Supplying industrial units, workshops, and commercial trade.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface border border-slate-100">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-primary">Coimbatore Engineering Link</h4>
                  <p className="text-[11px] text-slate-500">Connected with premier casting, tooling, and pump networks.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                <span>{t('common.readMore')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </Link>

              <Link
                to="/contact"
                className="text-xs font-semibold text-slate-700 hover:text-primary transition-colors"
              >
                Reach Our Office &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
