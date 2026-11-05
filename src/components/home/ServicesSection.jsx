import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { getServices } from '../../firebase/firestore';
import { useSite } from '../../context/SiteContext';

export const ServicesSection = () => {
  const { t } = useTranslation();
  const { openEnquiryModal } = useSite();
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then((data) => setServices(data.slice(0, 3)));
  }, []);

  return (
    <section className="py-20 bg-surface border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
              {t('home.servicesTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-sans">
              End-to-End Commercial Supply Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('home.servicesSubtitle')}
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors self-start md:self-auto"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.serviceId || srv.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={srv.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'}
                  alt={srv.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-primary mb-2 leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      openEnquiryModal({
                        serviceTitle: srv.title,
                        enquiryType: 'Service Inquiry',
                      })
                    }
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent transition-colors"
                  >
                    <span>Request Quotation</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to="/services"
                    className="text-[11px] text-slate-400 hover:text-slate-600"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
