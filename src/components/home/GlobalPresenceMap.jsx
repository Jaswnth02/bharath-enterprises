import React, { useState } from 'react';
import { 
  Globe2, 
  MapPin, 
  Plane, 
  Ship, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const countries = [
  { name: 'India', region: 'South Asia (HQ)', role: 'Headquarters, Sourcing & Manufacturing Hub', flag: '🇮🇳' },
  { name: 'Malaysia', region: 'Southeast Asia', role: 'Commercial Distribution & ASEAN Gateway', flag: '🇲🇾' },
  { name: 'Vietnam', region: 'Southeast Asia', role: 'Industrial Manufacturing & Trade Channel', flag: '🇻🇳' },
  { name: 'Philippines', region: 'Southeast Asia', role: 'Wholesale Procurement & Food Processing', flag: '🇵🇭' },
  { name: 'Singapore', region: 'Southeast Asia', role: 'International Financial & Trade Hub', flag: '🇸🇬' },
  { name: 'Thailand', region: 'Southeast Asia', role: 'Agro-Industrial & Machinery Network', flag: '🇹🇭' },
  { name: 'Indonesia', region: 'Southeast Asia', role: 'Resource Sourcing & Market Expansion', flag: '🇮🇩' },
  { name: 'Cambodia', region: 'Southeast Asia', role: 'Emerging Market Trade Facilitation', flag: '🇰🇭' },
  { name: 'Laos', region: 'Southeast Asia', role: 'Regional Cross-Border Logistics', flag: '🇱🇦' },
  { name: 'Brunei', region: 'Southeast Asia', role: 'Specialized Enterprise Projects', flag: '🇧🇳' },
  { name: 'Myanmar', region: 'Southeast Asia', role: 'Cross-Border Commodity Exchange', flag: '🇲🇲' },
  { name: 'Timor-Leste', region: 'Southeast Asia', role: 'Infrastructure & Sourcing Liaison', flag: '🇹🇱' },
  { name: 'UK', region: 'Europe', role: 'European Trade & Technology Advisory', flag: '🇬🇧' },
  { name: 'Australia', region: 'Oceania', role: 'Asia-Pacific Minerals & Agro Export Desk', flag: '🇦🇺' }
];

export const GlobalPresenceMap = () => {
  const { openEnquiryModal } = useSite();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  return (
    <section className="py-12 sm:py-20 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Subtle world mesh background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Heading */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-[10px] sm:text-[11px] uppercase tracking-wider mb-2">
            <Globe2 className="w-3.5 h-3.5" />
            <span>OUR GLOBAL PRESENCE</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-normal text-primary tracking-tight font-luxury-headline"
            style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
          >
            Bridging India with 14 Strategic International Markets
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light mt-2 leading-relaxed">
            We connect Indian manufacturing and product strengths with established commercial channels across Southeast Asia (ASEAN), the United Kingdom, and Australia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 14 Countries Grid (7 Cols) */}
          <div className="lg:col-span-7">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
              Active International Corridors (Click to inspect):
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {countries.map((c) => {
                const isSelected = selectedCountry.name === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedCountry(c)}
                    className={`text-left p-3 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-md scale-102'
                        : 'bg-white/90 hover:bg-white text-slate-700 border-slate-200/80 hover:border-accent/50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{c.flag}</span>
                      <span>{c.name}</span>
                    </div>
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-accent' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Country Dossier Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-lg space-y-5 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedCountry.flag}</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-primary font-sans">
                        {selectedCountry.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
                        {selectedCountry.region}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Active Desk
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block text-[10px] uppercase tracking-wider">
                      Strategic Role & Mandate:
                    </span>
                    <p className="text-slate-800 font-semibold text-xs mt-0.5 leading-relaxed">
                      {selectedCountry.role}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2 text-slate-600 text-[11px]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Direct bilateral trade agreements & buyer-seller matching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Export-import licensing, customs clearance & documentation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Cross-border enterprise setup & statutory advisory</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal({
                      enquiryType: `International Trade: ${selectedCountry.name}`,
                      productOrService: `Trade Desk for ${selectedCountry.name}`,
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98"
                >
                  <span>Connect with {selectedCountry.name} Desk</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

