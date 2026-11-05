import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare } from 'lucide-react';
import { useSEO } from '../utils/seo';
import { getServices } from '../firebase/firestore';
import { useSite } from '../context/SiteContext';

export const Services = () => {
  const { t } = useTranslation();
  const { openEnquiryModal } = useSite();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Professional Services | Bharath Enterprises',
    description: 'Contract manufacturing sourcing, industrial wholesale distribution, commercial trading procurement, and import-export support by Bharath Enterprises, Coimbatore.',
    keywords: 'Bharath Enterprises services, industrial wholesale distribution Coimbatore, contract manufacturing sourcing Tamil Nadu',
  });

  useEffect(() => {
    getServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen py-6 sm:py-10">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8 sm:mb-10">
        <div className="glass-white-elevated p-5 sm:p-8 md:p-12 rounded-3xl border border-white/95 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
          <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-2 bg-accent/10 w-fit px-2.5 py-0.5 rounded-md">
            Commercial & Supply Chain Solutions
          </span>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-primary">
            {t('services.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed font-light">
            {t('services.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 sm:pb-16">
        {loading ? (
          <div className="space-y-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 glass-white rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {services.map((srv, idx) => (
              <div
                key={srv.serviceId || srv.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center glass-white glass-white-hover rounded-3xl p-4 sm:p-6 md:p-8 border border-white/90 shadow-md"
              >
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="h-48 sm:h-64 lg:h-72 rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                    <img
                      src={srv.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'}
                      alt={srv.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-7 space-y-3 sm:space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/10 text-primary text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                    <span>Service Domain 0{idx + 1}</span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-primary font-sans">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {srv.description}
                  </p>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiryModal({
                          serviceTitle: srv.title,
                          enquiryType: 'Service Inquiry',
                        })
                      }
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5 active:scale-95"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-accent" />
                      <span>{t('services.enquireService')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
