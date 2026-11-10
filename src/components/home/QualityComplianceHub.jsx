import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  FileCheck, 
  Leaf, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const assurances = [
  {
    code: 'STANDARD 01',
    title: 'Industrial Boiler & Pressure Vessel Compliance (IBR Standards)',
    domain: 'Industrial Equipment & Spares',
    icon: Award,
    description: 'All boilers, steam accessories, and pressure piping conform to strict Indian Boiler Regulations (IBR) and international safety standards with full hydrostatic pressure certification.'
  },
  {
    code: 'STANDARD 02',
    title: 'Customs, Tariff & Export Documentation Protocols',
    domain: 'Import & Export Services',
    icon: ShieldCheck,
    description: 'Precision HS code classification, DGFT compliance, Certificate of Origin verification, and streamlined bilateral customs documentation across 14 international trade corridors.'
  },
  {
    code: 'STANDARD 03',
    title: 'Bankable DPR & Government Scheme Feasibility (PMEGP/MUDRA)',
    domain: 'Project Consulting & DPR',
    icon: FileCheck,
    description: 'Structured financial modeling, cash flow sensitivity, and technical appraisal vetted against banking guidelines for hassle-free capital sanction and subsidy disbursement.'
  },
  {
    code: 'STANDARD 04',
    title: 'Statutory Corporate Licensing & Cross-Border Registration',
    domain: 'Business Setup & Registration',
    icon: Leaf,
    description: 'Complete Ministry of Corporate Affairs (MCA) incorporation, Import Export Code (IEC) issuance, GST alignment, and overseas market entry statutory protocols.'
  }
];

export const QualityComplianceHub = () => {
  const { openEnquiryModal } = useSite();

  return (
    <section className="py-12 sm:py-20 relative bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="glass-white-elevated rounded-3xl p-6 sm:p-10 md:p-12 border border-white/95 shadow-xl">
          {/* Section Header */}
          <div className="max-w-2xl mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] sm:text-[11px] font-bold border border-emerald-200/60 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>QUALITY & COMPLIANCE CHARTER</span>
            </div>
            <h2 
              style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
              className="font-luxury-headline text-2xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#0A192F] tracking-tight leading-[1.14]"
            >
              Standards, Testing & Trade Certifications
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light mt-1.5 leading-relaxed">
              Every shipment leaving our Coonoor and Coimbatore hubs is backed by verified testing protocols, transparent billing, and standardized batch documentation.
            </p>
          </div>

          {/* 4-Pillar Quality Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {assurances.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-white p-5 rounded-2xl border border-white/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-accent">
                        {item.code}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-accent flex items-center justify-center transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 font-medium block mb-1">
                      {item.domain}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-primary font-sans mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verified Compliance</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Trade Action Strip */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              <span className="font-bold text-primary">Need compliance certificates with your consignment? </span>
              <span>We provide batch test reports and GST e-way bills with all commercial orders.</span>
            </div>

            <button
              type="button"
              onClick={() => openEnquiryModal({ enquiryType: 'Compliance / Lab Certificates' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-xs transition-all shrink-0 active:scale-95"
            >
              <span>Request Lab & Test Certificates</span>
              <ArrowRight className="w-3.5 h-3.5 text-accent" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

