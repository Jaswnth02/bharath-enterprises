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
  ArrowRight
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const industries = [
  {
    name: 'Power & Boiler',
    desc: 'Boiler spares, steam piping, refractory works, and high-pressure valves.',
    icon: Flame,
    color: 'from-amber-500/10 text-amber-600'
  },
  {
    name: 'Manufacturing',
    desc: 'Process machinery, automated PLC controls, and industrial components.',
    icon: Factory,
    color: 'from-blue-500/10 text-blue-600'
  },
  {
    name: 'Textile & Dyeing',
    desc: 'Steam accessories, processing boilers, and international fabric machinery sourcing.',
    icon: Scroll,
    color: 'from-purple-500/10 text-purple-600'
  },
  {
    name: 'Food Processing',
    desc: 'Hygienic processing lines, bulk packaging equipment, and commercial DPRs.',
    icon: UtensilsCrossed,
    color: 'from-rose-500/10 text-rose-600'
  },
  {
    name: 'Agro & Herbal',
    desc: 'Vanilla, essential oil extraction, organic cultivation, and export trade.',
    icon: Leaf,
    color: 'from-emerald-500/10 text-emerald-600'
  },
  {
    name: 'Construction',
    desc: 'Structural plywood, scaffolding, building materials, and infrastructure supplies.',
    icon: Building2,
    color: 'from-cyan-500/10 text-cyan-600'
  },
  {
    name: 'Chemical',
    desc: 'Specialty polymer compounds, refractory insulation, and tank vessels.',
    icon: FlaskConical,
    color: 'from-indigo-500/10 text-indigo-600'
  },
  {
    name: 'Oil & Gas',
    desc: 'High-temperature gasket spares, flow instrumentation, and pipeline fittings.',
    icon: Fuel,
    color: 'from-amber-500/10 text-amber-700'
  },
  {
    name: 'Education',
    desc: 'Institution licensing, franchise project development, and laboratory equipment.',
    icon: GraduationCap,
    color: 'from-blue-500/10 text-blue-700'
  },
  {
    name: 'Hospitality & Tourism',
    desc: 'Resort turnkey developments, corporate retreats, and tourism logistics.',
    icon: Hotel,
    color: 'from-emerald-500/10 text-emerald-700'
  }
];

export const IndustriesWeServe = () => {
  const { openEnquiryModal } = useSite();

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">
            SECTOR SPECIALIZATION
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
            Key Industries We Serve
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-light leading-relaxed">
            Delivering cross-border sourcing, industrial equipment, DPR consulting, and strategic market expansion across 10 vital economic sectors.
          </p>
        </div>

        {/* 10 Industries 5x2 Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
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
                className="glass-white p-4 sm:p-5 rounded-2xl border border-white/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 hover:border-accent/50"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-accent flex items-center justify-center mb-3 transition-colors duration-300 shadow-2xs border border-white/90">
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-primary font-sans mb-1 group-hover:text-accent transition-colors leading-snug">
                    {ind.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 font-light leading-relaxed line-clamp-2">
                    {ind.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-accent font-semibold transition-colors">
                  <span>Sector 0{idx + 1}</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
