import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Compass, 
  Truck, 
  Recycle, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { getServices } from '../../firebase/firestore';
import { useSite } from '../../context/SiteContext';

const serviceIcons = [Compass, Truck, Recycle];

const serviceDeliverables = [
  [
    'Customized family holiday & corporate conclave itineraries across Ooty and Coonoor',
    'Mountain-certified private cab & Tempo Traveller fleets with 24/7 route support',
    'Colonial heritage tea estate bungalow reservations & luxury resort bookings'
  ],
  [
    'Direct wholesale supply of Nilgiris tea, authentic Ooty Varkey & packaged snacks',
    'Structural IS:710 Marine BWP & IS:303 BWR commercial plywood and laminates',
    'Fast regional freight corridor dispatching goods within 24–48 hours across Tamil Nadu'
  ],
  [
    'Automotive & industrial nitrile synthetic rubber gasket scrap collection & sorting',
    'Ambient grinding producing high-purity 1.0–4.0mm granules and 40–80 mesh fine powder',
    'Integrated municipal solid waste management Detailed Project Report (DPR) execution'
  ]
];

export const ServicesSection = () => {
  const { openEnquiryModal } = useSite();
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices().then((data) => setServices(data.slice(0, 3)));
  }, []);

  return (
    <section className="py-12 sm:py-20 relative bg-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">
              PROFESSIONAL SERVICES
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
              End-to-End Commercial Supply Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-light">
              Structured commercial execution, reliable sourcing, and dependable regional delivery.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors self-start sm:self-auto glass-button px-4 py-2 rounded-xl"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Alternating Feature Matrix Rows */}
        <div className="space-y-6 sm:space-y-8">
          {services.map((srv, idx) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            const deliverables = serviceDeliverables[idx] || serviceDeliverables[0];
            const isReversed = idx % 2 !== 0;

            return (
              <div
                key={srv.serviceId || srv.id}
                className="glass-white-elevated rounded-3xl p-6 sm:p-8 md:p-10 border border-white/95 shadow-md hover:shadow-lg transition-all"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Visual Preview */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-sm border border-white/80 group">
                      <img
                        src={srv.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'}
                        alt={srv.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-primary font-mono text-xs font-black shadow-2xs border border-white/80">
                        SERVICE 0{idx + 1}
                      </div>
                    </div>
                  </div>

                  {/* Narrative Details */}
                  <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/5 text-accent flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                        Enterprise Capability
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-extrabold text-primary font-sans leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                      {srv.description}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-2 pt-1">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">
                        Key Service Deliverables:
                      </p>
                      {deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="pt-3 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          openEnquiryModal({
                            serviceTitle: srv.title,
                            enquiryType: 'Service Inquiry',
                          })
                        }
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-accent" />
                        <span>Request Service Terms</span>
                      </button>

                      <Link
                        to="/services"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-primary transition-colors px-3 py-2"
                      >
                        <span>Specifications</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
