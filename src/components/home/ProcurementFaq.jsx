import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const faqs = [
  {
    q: 'What consulting and global business development services does Bharath Enterprises provide?',
    a: 'Bharath Enterprises helps enterprises scale through import, export, global sourcing, project development, and strategic partnerships. We connect Indian manufacturers with overseas markets across Asia, Europe, and Oceania, and assist international companies to establish and expand their commercial presence in India.'
  },
  {
    q: 'Which countries are included in your active global trade network?',
    a: 'Our international network spans 14 countries: India (Headquarters), Malaysia, Vietnam, Philippines, Singapore, Thailand, Indonesia, Cambodia, Laos, Brunei, Myanmar, Timor-Leste, the United Kingdom (UK), and Australia.'
  },
  {
    q: 'What industrial boilers, spares, and engineering equipment do you supply?',
    a: 'We supply high-efficiency industrial boilers (steam and thermic fluid), replacement boiler spares, steam accessories, instrumentation and automated PLC control systems, refractory insulation materials, and heavy process equipment across power, textiles, chemical, and manufacturing sectors.'
  },
  {
    q: 'How do you support new projects with Detailed Project Reports (DPR) and government schemes?',
    a: 'We prepare comprehensive, bank-approved Detailed Project Reports (DPRs), feasibility studies, financial projections, and industry analyses. Furthermore, we guide eligible entrepreneurs through government subsidy and loan schemes including PMEGP, MUDRA, Stand-Up India, and state industrial incentives.'
  },
  {
    q: 'Can you assist domestic and foreign companies with business setup and licensing?',
    a: 'Yes. We provide complete business setup services including Private Limited and LLP company registration in India and overseas, Import Export Code (IEC) licensing, GST registration, corporate compliance, and strategic market entry advisory.'
  },
  {
    q: 'What end-to-end export-import documentation and logistics coordination do you offer?',
    a: 'Our trade desk handles global supplier identification, buyer-seller matching, proforma invoicing, letter of credit (LC) scrutiny, pre-shipment inspection, export customs documentation, port clearance, and multimodal logistics coordination.'
  }
];

export const ProcurementFaq = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const { openEnquiryModal } = useSite();

  return (
    <section className="py-16 sm:py-24 bg-[#EFECE6] text-[#1A1A1A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (5 cols): Heading & "Still have questions?" Card matching reference UI */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#E67E22] uppercase tracking-wider mb-4">
                <span className="text-[10px]">▲</span>
                <span className="text-slate-800 font-sans tracking-widest text-[11px]">QUESTIONS & ANSWERS</span>
              </div>

              <h2 
                style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
                className="text-3xl sm:text-4xl lg:text-[2.85rem] font-normal text-[#1A1A1A] leading-[1.12] tracking-tight"
              >
                Clear answers for complex operations
              </h2>

              <p className="text-xs sm:text-sm text-[#6B655F] font-light leading-relaxed mt-4 max-w-md">
                Clear answers on timelines, engagement models, reporting and measurable business outcomes.
              </p>
            </div>

            {/* Still have questions? Card matching reference */}
            <div className="bg-[#E5E0D8] rounded-[24px] sm:rounded-[28px] p-6 sm:p-7 space-y-3.5">
              <h3 
                style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
                className="text-xl sm:text-2xl font-normal text-[#1A1A1A]"
              >
                Still have questions?
              </h3>
              <p className="text-xs sm:text-[13px] text-[#6B655F] font-light leading-relaxed">
                Need clarity before moving forward? Speak with our operations team and get direct answers tailored to your business challenges.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openEnquiryModal({ formType: 'consultation', enquiryType: 'Trade & Procurement Consultation' })}
                  className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 group cursor-pointer"
                >
                  <span className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center text-white">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span>Book a consultation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): FAQ Accordion Cards matching reference */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[22px] sm:rounded-[26px] p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-black/[0.03] transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                    className="w-full text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span 
                      style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
                      className="text-base sm:text-lg font-normal text-[#1A1A1A] leading-snug"
                    >
                      {faq.q}
                    </span>

                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isOpen ? 'bg-[#1A1A1A] text-white' : 'bg-[#E5E0D8] text-slate-700'
                    }`}>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 text-xs sm:text-[13px] text-[#6B655F] font-light leading-relaxed animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
