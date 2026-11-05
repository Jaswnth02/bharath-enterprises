import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mountain, 
  Factory, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const CorridorSpotlight = () => {
  const { openEnquiryModal } = useSite();
  const [activeTab, setActiveTab] = useState('both'); // 'nilgiris' | 'coimbatore' | 'both'

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-white border border-white/90 text-slate-700 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Dual-Hub Strategic Advantage</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
            The Nilgiris & Coimbatore Commercial Corridor
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light leading-relaxed">
            Bridging highland plantation sourcing in Coonoor with industrial processing and high-velocity trade logistics in Coimbatore.
          </p>

          {/* Quick Filter Pill for Mobile / Desktop */}
          <div className="inline-flex p-1 bg-white/70 backdrop-blur-md rounded-2xl border border-white/90 shadow-2xs mt-4">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'both' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-primary'
              }`}
            >
              Full Corridor
            </button>
            <button
              onClick={() => setActiveTab('nilgiris')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'nilgiris' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-primary'
              }`}
            >
              The Nilgiris Hub
            </button>
            <button
              onClick={() => setActiveTab('coimbatore')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'coimbatore' ? 'bg-primary text-white shadow-xs' : 'text-slate-600 hover:text-primary'
              }`}
            >
              Coimbatore Hub
            </button>
          </div>
        </div>

        {/* Dual Corridor Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Nilgiris Hub */}
          {(activeTab === 'both' || activeTab === 'nilgiris') && (
            <div className="glass-white-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-lg relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200/60">
                    <Mountain className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Elevation 1,850m • Coonoor</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">HIGHLAND BASE</span>
                </div>

                <h3 className="text-lg sm:text-2xl font-extrabold text-primary font-sans mb-2">
                  The Nilgiris Sourcing & Tourism Hub
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Direct agricultural estates, heritage artisan bakeries, certified mountain tourism guides, and rural Self-Help Group (SHG) cooperatives.
                </p>

                {/* Capabilities list */}
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Garden-Fresh Nilgiris Tea:</strong> Direct CTC & orthodox estate harvest packing</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Heritage Ooty Varkey:</strong> Wood-fired bakery batches and handmade chocolates</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Hill Tourism Logistics:</strong> Ooty/Coonoor stays, certified cabs & tailored itineraries</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Agro & SHG Products:</strong> Sun-cured vanilla beans, pure eucalyptus oil & wild honey</span>
                  </div>
                </div>
              </div>

              {/* Bottom stats & action */}
              <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Door No: 43D, Ottupattarai, Coonoor</span>
                </div>
                <Link
                  to="/products?category=wholesale-snacks-fmcg"
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-accent transition-colors"
                >
                  <span>Explore Nilgiris Produce</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Coimbatore Hub */}
          {(activeTab === 'both' || activeTab === 'coimbatore') && (
            <div className="glass-white-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-lg relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-[11px] font-bold border border-blue-200/60">
                    <Factory className="w-3.5 h-3.5 text-accent" />
                    <span>Industrial Crossroads • Coimbatore</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">COMMERCIAL GATEWAY</span>
                </div>

                <h3 className="text-lg sm:text-2xl font-extrabold text-primary font-sans mb-2">
                  Coimbatore Processing & Logistics Gateway
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-6">
                  Industrial rubber recycling equipment, calibrated timber storage depots, and high-velocity distribution connecting Tamil Nadu and South India.
                </p>

                {/* Capabilities list */}
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span><strong>Synthetic Rubber Recycling:</strong> Nitrile gasket scrap converted to 40-80 mesh powder</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span><strong>Plywood & Boards Trade:</strong> IS:710 Marine BWP & IS:303 BWR commercial sheets</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span><strong>Statewide Transport Hub:</strong> Express 24-48 hr cargo routing across South India</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span><strong>Trade Verification Desk:</strong> Structured B2B billing, bulk contracts & quality testing</span>
                  </div>
                </div>
              </div>

              {/* Bottom stats & action */}
              <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <Truck className="w-4 h-4 text-accent" />
                  <span>Distribution Fleet: Tamil Nadu & South India</span>
                </div>
                <button
                  type="button"
                  onClick={() => openEnquiryModal({ enquiryType: 'Bulk Wholesale' })}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-accent transition-colors"
                >
                  <span>Request Trade Terms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

