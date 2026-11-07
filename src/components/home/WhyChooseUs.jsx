import React from 'react';
import { 
  Globe2, 
  Handshake, 
  Briefcase, 
  Settings2, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const strengths = [
  {
    title: 'Wide Global Network',
    desc: 'Established commercial and diplomatic trade channels across India, ASEAN, the United Kingdom, and Australia.',
    icon: Globe2,
    badge: '14+ Countries'
  },
  {
    title: 'End-to-End Support',
    desc: 'Complete lifecycle handholding from global sourcing and buyer-seller matchmaking to customs clearance and logistics.',
    icon: Handshake,
    badge: 'Turnkey Service'
  },
  {
    title: 'Industry Expertise',
    desc: 'Multi-disciplinary technical experience across boilers, manufacturing, textiles, food processing, chemicals, and energy.',
    icon: Briefcase,
    badge: 'Multi-Sector'
  },
  {
    title: 'Customized Solutions',
    desc: 'Tailored Detailed Project Reports (DPR), bankable feasibility studies, statutory registrations, and market roadmaps.',
    icon: Settings2,
    badge: 'Bespoke Advisory'
  },
  {
    title: 'Trusted & Reliable',
    desc: 'Unwavering commitment to trade compliance, transparent pricing, verified partner networks, and ethical stewardship.',
    icon: ShieldCheck,
    badge: 'Verified Integrity'
  },
  {
    title: 'Growth Focused Approach',
    desc: 'Empowering enterprises to achieve measurable profitability, scale production capacity, and secure sustainable market share.',
    icon: TrendingUp,
    badge: 'Sustainable Returns'
  }
];

export const WhyChooseUs = () => {
  const { openEnquiryModal } = useSite();

  return (
    <section className="py-12 sm:py-20 relative bg-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-white border border-white/90 text-slate-700 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>OUR COMPETITIVE ADVANTAGE</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
            Why Choose Bharath Enterprises?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light leading-relaxed">
            Six pillars of operational excellence that make us your trusted business development partner.
          </p>
        </div>

        {/* 6 Core Strengths Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {strengths.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-white-elevated p-6 rounded-3xl border border-white/95 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-accent flex items-center justify-center transition-colors duration-300 shadow-2xs border border-white/90">
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-primary font-sans mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Advantage 0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
