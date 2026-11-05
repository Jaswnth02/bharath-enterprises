import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ChevronRight } from 'lucide-react';
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
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">
              PROFESSIONAL SERVICES
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary tracking-tight font-sans">
              End-to-End Commercial Supply Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-light">
              End-to-end commercial solutions from sourcing to logistics execution.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors self-start sm:self-auto glass-button px-3.5 sm:px-4 py-2 rounded-xl"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((srv) => (
            <div
              key={srv.serviceId || srv.id}
              className="group glass-white glass-white-hover rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={srv.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-primary mb-1.5 leading-snug font-sans group-hover:text-secondary transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/50 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      openEnquiryModal({
                        serviceTitle: srv.title,
                        enquiryType: 'Service Inquiry',
                      })
                    }
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-accent transition-colors active:scale-95"
                  >
                    <span>Request Quotation</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to="/services"
                    className="text-[11px] text-slate-400 hover:text-slate-600 font-medium"
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
