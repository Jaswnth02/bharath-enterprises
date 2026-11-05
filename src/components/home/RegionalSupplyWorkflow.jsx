import React, { useState } from 'react';
import { 
  CheckCircle, 
  Leaf, 
  FlaskConical, 
  PackageCheck, 
  Truck, 
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const steps = [
  {
    step: '01',
    title: 'Ethical Intake & Sourcing',
    subtitle: 'Highland Estates & Industrial Facilities',
    icon: Leaf,
    details: 'Direct tea leaf collection from high-elevation Nilgiris gardens, cured vanilla pods from shade canopy farms, and sorted nitrile rubber gasket scraps from verified Coimbatore automotive manufacturers.',
    highlight: 'Zero Middlemen'
  },
  {
    step: '02',
    title: 'Testing & Specialized Processing',
    subtitle: 'Standards-Compliant Refining',
    icon: FlaskConical,
    details: 'Traditional wood-fired baking for authentic Ooty Varkey, magnetic metal separation and ambient shredding for NBR rubber granules, and boiling water resistance testing for commercial plywood.',
    highlight: 'Rigorous Verification'
  },
  {
    step: '03',
    title: 'Hygienic Packing & Warehousing',
    subtitle: 'Coonoor & Coimbatore Hubs',
    icon: PackageCheck,
    details: 'Vacuum-sealed food-grade pouches preserving tea and spices aroma, 25kg/50kg moisture-resistant HDPE polymer sacks, and indoor climate-controlled plywood stockyards.',
    highlight: 'Moisture Controlled'
  },
  {
    step: '04',
    title: 'Statewide Express Logistics',
    subtitle: '24–48 Hour Commercial Delivery',
    icon: Truck,
    details: 'Dedicated transport routing across Tamil Nadu (Coimbatore, Tiruppur, Erode, Salem, Madurai, Chennai) and Southern commercial corridors with end-to-end dispatch tracking.',
    highlight: 'Dependable Dispatch'
  }
];

export const RegionalSupplyWorkflow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { openEnquiryModal } = useSite();

  return (
    <section className="py-12 sm:py-20 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">
            HOW WE OPERATE
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
            Our Quality & Fulfillment Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light leading-relaxed">
            From Nilgiris hillside gardens and manufacturing facilities to wholesale distribution across South India.
          </p>
        </div>

        {/* Desktop Pipeline Steps (Interactive Horizontal Ribbon) */}
        <div className="hidden lg:grid grid-cols-4 gap-4 relative mb-10">
          {/* Subtle connecting line */}
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-8 z-0 pointer-events-none" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 relative z-10 flex flex-col justify-between ${
                  isActive
                    ? 'glass-white-elevated border-2 border-accent/70 shadow-lg -translate-y-1'
                    : 'glass-white hover:bg-white/90 border border-white/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${
                      isActive ? 'bg-primary text-accent' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.step}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {item.highlight}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                    isActive ? 'bg-accent text-white shadow-md' : 'bg-primary/5 text-primary'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-sm font-bold text-primary font-sans mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-500 mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {item.details}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/50 flex items-center justify-between text-[11px]">
                  <span className={`font-semibold ${isActive ? 'text-accent' : 'text-slate-400'}`}>
                    {isActive ? 'Selected Phase' : 'Click to inspect'}
                  </span>
                  <CheckCircle className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-slate-300'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / Tablet Accordion View */}
        <div className="lg:hidden space-y-3.5 mb-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`glass-white rounded-2xl p-4 transition-all border ${
                  isActive ? 'border-accent shadow-md bg-white' : 'border-white/90'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-primary text-accent' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                        Phase {item.step}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold text-primary font-sans">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                    {item.highlight}
                  </span>
                </div>

                {isActive && (
                  <div className="pt-3 mt-3 border-t border-slate-100 text-xs text-slate-600 font-light leading-relaxed animate-in fade-in">
                    <p className="font-medium text-slate-800 mb-1">{item.subtitle}</p>
                    <p>{item.details}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live SLA & Assurance Strip */}
        <div className="glass-white-elevated rounded-2xl p-4 sm:p-6 border border-white/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-primary font-sans">
                Commercial Dispatch Commitments
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-light">
                Standard order processing: 24–48 hours for Tamil Nadu consignments • Custom packaging for bulk buyers
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openEnquiryModal({ enquiryType: 'Logistics / Supply' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
          >
            <span>Inquire for Distribution</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>
      </div>
    </section>
  );
};

