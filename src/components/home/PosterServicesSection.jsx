import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Wrench, 
  Ship, 
  FileSpreadsheet, 
  Building, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const services = [
  {
    id: 'industrial-equipment-spares',
    title: 'INDUSTRIAL EQUIPMENT & SPARES',
    category: 'Engineering & Spares',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Boilers & Spares',
      'Steam Accessories',
      'Instrumentation & PLC',
      'Refractory Works',
      'Process Equipment'
    ]
  },
  {
    id: 'import-export-services',
    title: 'IMPORT & EXPORT SERVICES',
    category: 'Cross-Border Logistics',
    icon: Ship,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Global Sourcing',
      'Buyer-Seller Connect',
      'Export Documentation',
      'Customs Support',
      'Logistics Coordination'
    ]
  },
  {
    id: 'project-consulting-dpr',
    title: 'PROJECT CONSULTING & DPR',
    category: 'Financial & Advisory',
    icon: FileSpreadsheet,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Detailed Project Reports (DPR)',
      'Feasibility Studies',
      'Industry Analysis',
      'Financial Projections',
      'Government Scheme Guidance (PMEGP, MUDRA, etc.)'
    ]
  },
  {
    id: 'business-setup-registration',
    title: 'BUSINESS SETUP & REGISTRATION',
    category: 'Corporate Legal & Licensing',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Company Registration (India & Overseas)',
      'Import Export License (IEC)',
      'GST Registration',
      'Business Advisory',
      'Market Entry Support'
    ]
  },
  {
    id: 'special-projects-sectors',
    title: 'SPECIAL PROJECTS & SECTORS',
    category: 'Turnkey Incubations',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    bullets: [
      'Food Processing',
      'Agro & Herbal Products',
      'Renewable Energy',
      'Real Estate & Hospitality',
      'Education & Franchise',
      'Many more...'
    ]
  }
];

export const PosterServicesSection = () => {
  const { openEnquiryModal } = useSite();

  return (
    <section className="py-12 sm:py-20 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">
              OUR SERVICES
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
              Comprehensive Trade & Business Solutions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-light">
              From heavy industrial equipment to international licensing, DPR advisory, and turnkey sectors.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openEnquiryModal({ enquiryType: 'Comprehensive Services Inquiry' })}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors self-start sm:self-auto glass-button px-4 py-2.5 rounded-xl shrink-0"
          >
            <span>Request Service Proposal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Service Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="glass-white-elevated rounded-3xl p-3 sm:p-3.5 border border-white/95 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Header */}
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 mb-3.5">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                    <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-primary text-[10px] font-bold shadow-2xs border border-white/80">
                      0{idx + 1}
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                      <span className="text-[9px] font-bold text-accent uppercase tracking-wider block">
                        {srv.category}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-black text-primary font-sans mb-3 leading-snug px-1 uppercase tracking-tight">
                    {srv.title}
                  </h3>

                  {/* Bullets List Exactly from Poster */}
                  <div className="space-y-2 px-1 mb-4 text-xs">
                    {srv.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                        <span className="font-medium text-[11px] leading-tight">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-slate-200/50 px-1">
                  <button
                    type="button"
                    onClick={() =>
                      openEnquiryModal({
                        enquiryType: srv.title,
                        productOrService: srv.title,
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-primary hover:bg-primary-light text-white text-[11px] font-bold rounded-xl shadow-2xs transition-all active:scale-95"
                  >
                    <MessageSquare className="w-3 h-3 text-accent" />
                    <span>Inquire Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
