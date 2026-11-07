import React from 'react';
import { Sparkles, ArrowRight, MessageSquare, PhoneCall } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const corePillars = [
  'IDEAS',
  'PARTNERSHIPS',
  'PROJECTS',
  'PROFITS',
  'A BRIGHTER TOMORROW'
];

export const SustainableGrowthBanner = () => {
  const { openEnquiryModal, settings } = useSite();

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919600949927';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello Bharath Enterprises, I am contacting you to explore global business development and strategic partnerships.")}`;

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#142D4E] via-[#1E3F68] to-[#0D1E35] text-white p-8 sm:p-12 md:p-16 shadow-2xl border border-white/20">
          {/* Subtle decorative background city light refractions */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Vision Statement */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXECUTIVE STRATEGIC VISION</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight leading-tight">
                Your Partner for <span className="text-accent underline decoration-accent/40 decoration-wavy">Sustainable Growth</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-xl">
                We believe in enduring business relationships that create shared economic value. From developing bankable projects to facilitating cross-border industrial sourcing, we stand alongside you at every step of your commercial expansion.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => openEnquiryModal({ enquiryType: 'Strategic Partnership Inquiry' })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-primary font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span>Initiate Partnership</span>
                </button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/30 backdrop-blur-md transition-all active:scale-95"
                >
                  <PhoneCall className="w-4 h-4 text-accent" />
                  <span>Direct Trade WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Column: 5 Values from Poster */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 space-y-3.5 shadow-xl">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest block border-b border-white/15 pb-2">
                DRIVING SUSTAINED ENTERPRISE
              </span>

              <div className="space-y-2.5">
                {corePillars.map((pillar, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs sm:text-sm font-extrabold tracking-wider text-slate-100 hover:text-accent transition-colors">
                    <span>{pillar}</span>
                    <span className="text-accent font-mono text-xs">0{idx + 1}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/15 text-[11px] text-slate-300 font-light">
                * Coimbatore, Tamil Nadu, India • Active Across 14 Global Corridors
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

