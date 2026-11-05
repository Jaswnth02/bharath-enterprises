import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Truck, Factory, Layers } from 'lucide-react';
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
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <div className="bg-primary py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">
            Commercial & Supply Chain Solutions
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
            {t('services.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        {loading ? (
          <div className="space-y-8 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-64 bg-slate-100 rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {services.map((srv, idx) => (
              <div
                key={srv.serviceId || srv.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:shadow-md transition-all ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="h-64 sm:h-72 rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                    <img
                      src={srv.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'}
                      alt={srv.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-primary text-[11px] font-bold uppercase tracking-wider">
                    <span>Service Domain {idx + 1}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-primary font-sans">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        openEnquiryModal({
                          serviceTitle: srv.title,
                          enquiryType: 'Service Inquiry',
                        })
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
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

