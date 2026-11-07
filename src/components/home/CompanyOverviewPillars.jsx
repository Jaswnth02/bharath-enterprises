import React from 'react';
import { 
  Handshake, 
  TrendingUp, 
  Globe2, 
  Lightbulb, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const pillars = [
  {
    title: 'GLOBAL BUSINESS DEVELOPMENT',
    desc: 'Connecting Indian manufacturers and enterprises with verified high-demand international markets.',
    icon: Handshake,
    badge: 'Strategic Trade'
  },
  {
    title: 'MARKET EXPANSION SUPPORT',
    desc: 'Assisting overseas companies to establish, license, and expand their commercial presence in India and Asia.',
    icon: TrendingUp,
    badge: 'Growth Advisory'
  },
  {
    title: 'IMPORT & EXPORT FACILITATION',
    desc: 'End-to-end foreign trade management: global sourcing, buyer-seller matching, customs, and freight.',
    icon: Globe2,
    badge: 'Trade Logistics'
  },
  {
    title: 'PROJECT CONSULTING & DPR',
    desc: 'Bankable Detailed Project Reports, financial modeling, industry analysis, and PMEGP/MUDRA guidance.',
    icon: Lightbulb,
    badge: 'Project Advisory'
  },
  {
    title: 'RELIABLE PARTNER NETWORK',
    desc: 'Multi-country vetted network of industrial buyers, manufacturers, port agents, and government liaisons.',
    icon: Users,
    badge: 'Global Ecosystem'
  }
];

export const CompanyOverviewPillars = () => {
  const { openEnquiryModal } = useSite();

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="glass-white-elevated rounded-3xl p-6 sm:p-10 md:p-14 border border-white/95 shadow-xl relative overflow-hidden">
          {/* Subtle amber refraction */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/8 rounded-full blur-3xl pointer-events-none" />

          {/* Section Heading */}
          <div className="max-w-3xl mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-[10px] sm:text-[11px] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMPANY OVERVIEW</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary font-sans tracking-tight">
              Empowering Cross-Border Trade & Industrial Partnerships
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light mt-3 leading-relaxed">
              Bharath Enterprises is a global business development and consulting company, helping businesses grow through import, export, sourcing, project development and strategic partnerships. We connect Indian industries with global markets and support international companies to establish and expand their presence in India and Asia.
            </p>
          </div>

          {/* 5 Strategic Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-white p-5 rounded-2xl border border-white/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-accent flex items-center justify-center mb-4 transition-colors duration-300 shadow-2xs border border-white/90">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>

                    <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mb-1">
                      {item.badge}
                    </span>

                    <h3 className="text-xs sm:text-sm font-extrabold text-primary font-sans mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono text-slate-300 font-bold mt-4 pt-2 border-t border-slate-100 block">
                    PILLAR 0{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Consultation Strip */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Looking to expand your manufacturing business or import industrial equipment into India?
            </p>
            <button
              type="button"
              onClick={() => openEnquiryModal({ enquiryType: 'Strategic Partnership' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
            >
              <span>Schedule Commercial Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-accent" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
