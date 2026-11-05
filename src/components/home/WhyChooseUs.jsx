import React from 'react';
import { 
  Award, 
  Users, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  CheckCircle,
  Building2,
  Sparkles
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const WhyChooseUs = () => {
  const { settings } = useSite();

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Narrative & Foundation */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-white border border-white/90 text-slate-700 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>THE BHARATH ASSURANCE</span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
              Principles Driving Every Commercial Supply Agreement
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              We operate across Coonoor and Coimbatore with a dedication to long-term commercial trust. Rather than single-transaction trading, we build dependable regional ecosystems for food distributors, timber yards, recycling facilities, and local communities.
            </p>

            <div className="glass-white p-4 rounded-2xl border border-white/80 shadow-2xs space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-primary font-bold">
                <Building2 className="w-4 h-4 text-accent shrink-0" />
                <span>Operating Across The Nilgiris & Coimbatore, Tamil Nadu</span>
              </div>
              <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                Licensed commercial trading, standard-compliant warehouse stock, FSSAI-compliant FMCG sorting, and transparent B2B GST invoicing.
              </p>
            </div>
          </div>

          {/* Right Column: Bento Feature Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Bento Card 1: Quality */}
            <div className="glass-white-elevated p-5 sm:p-6 rounded-3xl border border-white/95 shadow-md flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-accent flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-primary font-sans mb-1.5">
                  Quality Commitment
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Every tea batch, plywood board, and recycled rubber granule fraction undergoes strict dimensional and sensory quality checks.
                </p>
              </div>
              <span className="text-[10px] font-mono text-accent font-bold mt-4 pt-3 border-t border-slate-100 block">
                01 • RIGOROUS STANDARD
              </span>
            </div>

            {/* Bento Card 2: Customer Focus */}
            <div className="glass-white-elevated p-5 sm:p-6 rounded-3xl border border-white/95 shadow-md flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-primary flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-primary font-sans mb-1.5">
                  Customer Focus
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Dedicated regional account desk providing transparent pricing, tailored consignment schedules, and fast enquiry turnaround.
                </p>
              </div>
              <span className="text-[10px] font-mono text-primary font-bold mt-4 pt-3 border-t border-slate-100 block">
                02 • TAILORED SERVICE
              </span>
            </div>

            {/* Bento Card 3: Reliability */}
            <div className="glass-white-elevated p-5 sm:p-6 rounded-3xl border border-white/95 shadow-md flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-primary font-sans mb-1.5">
                  Business Reliability
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Steady buffer inventory in Coonoor and Coimbatore, structured dispatch schedules, and 24–48 hr delivery across Tamil Nadu.
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 font-bold mt-4 pt-3 border-t border-slate-100 block">
                03 • STEADY INVENTORY
              </span>
            </div>

            {/* Bento Card 4: Long-Term Relationships */}
            <div className="glass-white-elevated p-5 sm:p-6 rounded-3xl border border-white/95 shadow-md flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-primary font-sans mb-1.5">
                  Long-Term Alliances
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Fostering sustainable commercial partnerships, ethical SHG community linkages, and trusted supplier agreements.
                </p>
              </div>
              <span className="text-[10px] font-mono text-purple-600 font-bold mt-4 pt-3 border-t border-slate-100 block">
                04 • SUSTAINED GROWTH
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
