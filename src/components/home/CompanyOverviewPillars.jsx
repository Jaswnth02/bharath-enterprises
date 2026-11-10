import React from 'react';
import { 
  Handshake, 
  TrendingUp, 
  Globe2, 
  Lightbulb, 
  Users, 
  ArrowRight
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const pillars = [
  {
    title: 'Global Business Development',
    desc: 'Connecting Indian manufacturers and enterprises with verified high-demand international markets.',
    icon: Handshake,
    badge: 'Strategic Trade'
  },
  {
    title: 'Market Expansion Support',
    desc: 'Assisting overseas companies to establish, license, and expand their commercial presence in India and Asia.',
    icon: TrendingUp,
    badge: 'Growth Advisory'
  },
  {
    title: 'Import & Export Facilitation',
    desc: 'End-to-end foreign trade management: global sourcing, buyer-seller matching, customs, and freight.',
    icon: Globe2,
    badge: 'Trade Logistics'
  },
  {
    title: 'Project Consulting & DPR',
    desc: 'Bankable Detailed Project Reports, financial modeling, industry analysis, and PMEGP/MUDRA guidance.',
    icon: Lightbulb,
    badge: 'Project Advisory'
  },
  {
    title: 'Reliable Partner Network',
    desc: 'Multi-country vetted network of industrial buyers, manufacturers, port agents, and government liaisons.',
    icon: Users,
    badge: 'Global Ecosystem'
  }
];

export const CompanyOverviewPillars = () => {
  const { openEnquiryModal } = useSite();

  return (
    <section className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex flex-col justify-center py-8 sm:py-10 lg:py-12 bg-[#EFECE6] text-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full my-auto">
        
        {/* Section Heading with tightened top margin */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E67E22] uppercase tracking-wider mb-2.5">
            <span className="text-[10px]">▲</span>
            <span className="text-slate-800 font-sans tracking-widest text-[11px]">COMPANY OVERVIEW</span>
          </div>

          <h2 
            style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
            className="text-2xl sm:text-3xl lg:text-[2.65rem] font-normal text-[#1A1A1A] leading-[1.14] tracking-tight"
          >
            Empowering Cross-Border Trade & Industrial Partnerships
          </h2>

          <p className="text-xs sm:text-sm text-[#6B655F] font-light leading-relaxed mt-2.5 max-w-2xl">
            Bharath Enterprises is a global business development and consulting company, helping businesses grow through import, export, sourcing, project development and strategic partnerships. We connect Indian industries with global markets and support international companies to establish and expand their presence in India and Asia.
          </p>
        </div>

        {/* 5 Strategic Pillars Grid in matching White Rounded Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => openEnquiryModal({ enquiryType: `Pillar: ${item.title}` })}
                className="bg-white rounded-[22px] sm:rounded-[24px] p-5 sm:p-5.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  {/* Circular icon badge */}
                  <div className="w-10 h-10 rounded-full bg-[#E5E0D8] text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white flex items-center justify-center mb-3.5 transition-colors duration-200">
                    <Icon className="w-4.5 h-4.5 stroke-[2]" />
                  </div>

                  <span className="text-[10px] font-bold text-[#E67E22] uppercase tracking-wider block mb-1.5">
                    {item.badge}
                  </span>

                  <h3 
                    style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
                    className="text-sm sm:text-base font-normal text-[#1A1A1A] leading-snug mb-2"
                  >
                    {item.title}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#6B655F] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3.5 mt-4 border-t border-black/[0.04] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#8C857D] font-medium tracking-wider">
                    PILLAR 0{idx + 1}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#E5E0D8] group-hover:bg-[#1A1A1A] text-slate-700 group-hover:text-white flex items-center justify-center transition-colors duration-200">
                    <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
