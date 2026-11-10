import React from 'react';
import { 
  Flame, 
  Factory, 
  Scroll, 
  UtensilsCrossed, 
  Leaf, 
  Building2, 
  FlaskConical, 
  Fuel, 
  GraduationCap, 
  Hotel,
  ChevronRight
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const industries = [
  {
    name: 'Power & Boiler',
    desc: 'Boiler spares, steam piping, refractory works, and high-pressure process valves.',
    icon: Flame,
  },
  {
    name: 'Manufacturing',
    desc: 'Process machinery, automated PLC controls, and heavy industrial components.',
    icon: Factory,
  },
  {
    name: 'Textile & Dyeing',
    desc: 'Steam accessories, processing boilers, and international fabric machinery sourcing.',
    icon: Scroll,
  },
  {
    name: 'Food Processing',
    desc: 'Hygienic processing lines, bulk packaging equipment, and commercial DPR execution.',
    icon: UtensilsCrossed,
  },
  {
    name: 'Agro & Herbal',
    desc: 'Vanilla beans, essential oil extraction, organic cultivation, and export trade.',
    icon: Leaf,
  },
  {
    name: 'Construction',
    desc: 'Structural plywood, scaffolding, building materials, and infrastructure supplies.',
    icon: Building2,
  },
  {
    name: 'Chemical',
    desc: 'Specialty polymer compounds, refractory insulation, and storage vessel tanks.',
    icon: FlaskConical,
  },
  {
    name: 'Oil & Gas',
    desc: 'High-temperature gasket spares, flow instrumentation, and pipeline fittings.',
    icon: Fuel,
  },
  {
    name: 'Education',
    desc: 'Institution licensing, franchise project development, and laboratory supplies.',
    icon: GraduationCap,
  },
  {
    name: 'Hospitality & Tourism',
    desc: 'Resort turnkey developments, corporate retreats, and Nilgiris tourism logistics.',
    icon: Hotel,
  },
];

export const IndustriesWeServe = () => {
  const { openEnquiryModal } = useSite();

  return (
    <section className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex flex-col justify-center py-8 sm:py-10 lg:py-12 bg-[#EFECE6] text-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        
        {/* Centered Section Header with balanced prominent typography */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E67E22] uppercase tracking-wider mb-2">
            <span className="text-[10px]">▲</span>
            <span className="text-slate-800 font-sans tracking-widest text-[11px]">SECTOR SPECIALIZATION</span>
          </div>

          <h2 
            style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-normal text-[#1A1A1A] leading-[1.14] tracking-tight"
          >
            Key Industries We Serve
          </h2>

          <p className="text-xs sm:text-sm text-[#6B655F] mt-2 font-light leading-relaxed max-w-2xl mx-auto">
            Delivering cross-border sourcing, industrial equipment, DPR consulting, and strategic market expansion across 10 vital economic sectors.
          </p>
        </div>

        {/* 10 Industries in White Rounded Cards with calibrated scale */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-4.5">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                onClick={() =>
                  openEnquiryModal({
                    enquiryType: `Industry Consultation: ${ind.name}`,
                    productOrService: ind.name,
                  })
                }
                className="bg-white rounded-[20px] sm:rounded-[24px] p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  {/* Circular icon badge matching FAQ circular toggle style */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#E5E0D8] text-[#1A1A1A] group-hover:bg-[#1A1A1A] group-hover:text-white flex items-center justify-center mb-3 transition-colors duration-200">
                    <Icon className="w-4.5 h-4.5 stroke-[2]" />
                  </div>

                  {/* Title in matching serif typography */}
                  <h3 
                    style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
                    className="text-sm sm:text-base font-normal text-[#1A1A1A] leading-snug group-hover:text-[#E67E22] transition-colors"
                  >
                    {ind.name}
                  </h3>

                  {/* Description in subtle grey font */}
                  <p className="text-[11px] sm:text-xs text-[#6B655F] font-light leading-relaxed mt-1.5 line-clamp-2 min-h-[30px] sm:min-h-[34px]">
                    {ind.desc}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="pt-2.5 mt-3 border-t border-black/[0.04] flex items-center justify-between">
                  <span className="text-[9.5px] font-mono text-[#8C857D] font-medium tracking-wider">
                    SECTOR {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="w-6 h-6 rounded-full bg-[#E5E0D8] group-hover:bg-[#1A1A1A] text-slate-700 group-hover:text-white flex items-center justify-center transition-colors duration-200">
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
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
