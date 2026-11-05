import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Compass, 
  Coffee, 
  Layers, 
  Recycle, 
  Sprout, 
  CheckCircle2, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { getCategories } from '../../firebase/firestore';
import { useSite } from '../../context/SiteContext';

const categoryMeta = {
  'nilgiris-tour-travel': {
    icon: Compass,
    hub: 'Coonoor & Ooty Desk',
    badge: 'Tourism & Mobility',
    keyFeatures: [
      'Tailored family holiday itineraries & heritage toy train tours',
      'Verified plantation homestays & luxury tea estate resort stays',
      'Private mountain-certified taxi & cab fleets with 24/7 assistance'
    ]
  },
  'wholesale-snacks-fmcg': {
    icon: Coffee,
    hub: 'Nilgiris & Coimbatore Hub',
    badge: 'Food & Beverages',
    keyFeatures: [
      'Authentic wood-fired crispy Ooty Varkey in wholesale cartons',
      'Garden-fresh Nilgiris CTC and orthodox tea pouches (100g – 5kg)',
      'Handmade chocolates (Dark, Roasted Almond, Fruit & Nut)'
    ]
  },
  'plywood-interior-trade': {
    icon: Layers,
    hub: 'Coimbatore Distribution Yard',
    badge: 'Building Materials',
    keyFeatures: [
      'IS:710 Marine Grade BWP & IS:303 Commercial BWR plywood',
      'Calibrated blockboards, MDF boards & premium laminates',
      'Structural timber supply with high delamination resistance'
    ]
  },
  'rubber-waste-recycling': {
    icon: Recycle,
    hub: 'Coimbatore Recycling Unit',
    badge: 'Sustainable Materials',
    keyFeatures: [
      '100% Nitrile Synthetic Rubber (NBR) gasket scrap intake',
      'Uniform 1.0mm – 4.0mm granules & fine 40–80 mesh rubber powder',
      'Zero metal / fiber-free certified compounding raw materials'
    ]
  },
  'agri-shg-initiatives': {
    icon: Sprout,
    hub: 'Coonoor SHG Rural Desk',
    badge: 'Agro & Community',
    keyFeatures: [
      'Sun-sweat cured Grade-A Nilgiris gourmet vanilla planifolia beans',
      'Steam-distilled eucalyptus oil & multi-floral wild forest honey',
      'Direct fair-trade market access for registered women SHG artisans'
    ]
  }
};

export const BusinessCategories = () => {
  const [categories, setCategories] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { openEnquiryModal } = useSite();

  useEffect(() => {
    getCategories().then((cats) => {
      setCategories(cats);
    });
  }, []);

  if (categories.length === 0) return null;

  const currentCat = categories[selectedIndex] || categories[0];
  const meta = categoryMeta[currentCat.categoryId] || {
    icon: Compass,
    hub: 'Coonoor & Coimbatore',
    badge: 'Commercial Domain',
    keyFeatures: [
      'Verified quality standards and transparent commercial terms',
      'Direct sourcing and dependable regional distribution networks',
      'Custom consignment packaging and dedicated account support'
    ]
  };
  const MainIcon = meta.icon;

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">
            OUR BUSINESS DISCIPLINES
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
            Specialized Commercial Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 sm:mt-2 font-light leading-relaxed">
            Select a commercial discipline to inspect sourcing operations, supply deliverables, and trade solutions.
          </p>
        </div>

        {/* 5-Pill Interactive Navigation Ribbon */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 no-scrollbar">
          {categories.map((cat, idx) => {
            const itemMeta = categoryMeta[cat.categoryId] || { icon: Compass };
            const Icon = itemMeta.icon;
            const isSelected = selectedIndex === idx;

            return (
              <button
                key={cat.categoryId || cat.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  isSelected
                    ? 'bg-primary text-white shadow-md border-2 border-accent/60 scale-102'
                    : 'glass-white hover:bg-white text-slate-700 border border-white/90 hover:border-accent/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-accent' : 'text-slate-500'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Feature Split Showcase */}
        <div className="glass-white-elevated rounded-3xl p-5 sm:p-8 md:p-10 border border-white/95 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
            {/* Visual Column (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border border-white/80 bg-slate-100 group">
                <img
                  src={currentCat.image}
                  alt={currentCat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-primary font-bold text-xs flex items-center gap-1.5 shadow-2xs border border-white/80">
                  <MainIcon className="w-4 h-4 text-accent" />
                  <span>{meta.badge}</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-primary/85 backdrop-blur-md px-3.5 py-2 rounded-xl text-white text-[11px] flex items-center justify-between">
                  <span className="font-medium text-slate-200">Operational Base:</span>
                  <span className="font-bold text-accent">{meta.hub}</span>
                </div>
              </div>
            </div>

            {/* Content Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Discipline {String(selectedIndex + 1).padStart(2, '0')} of {categories.length}</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-primary font-sans">
                  {currentCat.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-light">
                  {currentCat.description}
                </p>
              </div>

              {/* Key Capabilities Checklist */}
              <div className="space-y-2.5 pt-1">
                <p className="text-xs font-bold text-primary uppercase tracking-wider">
                  Key Supply Deliverables & Capabilities:
                </p>
                {meta.keyFeatures.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-3">
                <Link
                  to={`/products?category=${currentCat.categoryId}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
                >
                  <span>Explore {currentCat.name.split(' ')[0]} Products</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal({
                      enquiryType: `${currentCat.name} Inquiry`,
                      productOrService: currentCat.name,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 glass-white hover:bg-white text-slate-800 text-xs font-semibold rounded-xl border border-white/90 shadow-2xs transition-all active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-accent" />
                  <span>Enquire Domain</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
