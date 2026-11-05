import React from 'react';
import { useTranslation } from 'react-i18next';
import { Award, Users, ShieldCheck, Clock, HeartHandshake } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const icons = [Award, Users, ShieldCheck, Clock, HeartHandshake];

export const WhyChooseUs = () => {
  const { t } = useTranslation();
  const { settings } = useSite();

  const values = settings.whyChooseUs || [
    {
      title: "Quality Commitment",
      desc: "Every product and batch undergoes structured dimensional, material, and performance checks."
    },
    {
      title: "Customer Focus",
      desc: "Dedicated account representatives ensuring clear communication and tailored procurement schedules."
    },
    {
      title: "Business Reliability",
      desc: "Dependable dispatch protocols and steady reserve stocks minimizing operational disruptions."
    },
    {
      title: "Professional Service",
      desc: "Honest trade practices, transparent pricing, and comprehensive technical documentation."
    },
    {
      title: "Long-Term Relationships",
      desc: "We focus on sustainable business partnerships rather than single-transaction commercial deals."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">
            {t('home.whyTitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-sans">
            Principles Driving Our Commercial Service
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
            {t('home.whySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {values.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="group glass-white glass-white-hover p-6 rounded-2xl text-center flex flex-col items-center justify-between border border-white/80"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-accent flex items-center justify-center mb-4 transition-all duration-300 border border-white/90 shadow-2xs">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-primary mb-2 font-sans">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
