import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const CompanyIntro = () => {
  const { t } = useTranslation();
  const { settings } = useSite();

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="glass-white-elevated p-5 sm:p-8 md:p-12 rounded-3xl border border-white/95 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5">
              <div className="h-52 sm:h-72 lg:h-80 rounded-2xl overflow-hidden relative shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                  alt="Bharath Enterprises Operations"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                    Established 2025
                  </span>
                  <p className="text-xs font-semibold">Coimbatore, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
              <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block bg-accent/10 w-fit px-2.5 py-0.5 rounded-md">
                {t('home.introTitle')}
              </span>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary tracking-tight font-sans">
                {t('home.introSubtitle')}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                {settings.aboutContent || t('home.introText')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>Verified B2B & B2C supply chain delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>Coimbatore engineering & foundry networks</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
                >
                  <span>{t('common.readMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
