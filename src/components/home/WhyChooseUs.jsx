import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Award, Users, ShieldCheck, Clock, HeartHandshake } from 'lucide-react';
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
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
            {t('home.whyTitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-sans">
            Principles Driving Our Commercial Service
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {t('home.whySubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {values.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="glass-white glass-white-hover p-6 rounded-2xl text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary text-accent flex items-center justify-center mb-4 shadow-sm border border-white/60">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-primary mb-2 font-sans">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
