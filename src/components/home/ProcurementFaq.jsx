import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
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
    <section className="py-12 sm:py-20 relative bg-slate-50/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-white border border-white/90 text-slate-700 text-[10px] sm:text-[11px] font-bold tracking-wide uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-accent" />
            <span>TRADE FAQ</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-primary font-sans tracking-tight">
            Frequently Asked Procurement Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
            Clear guidelines on order dispatch, packaging standards, MOQs, and trade terms.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="glass-white rounded-2xl border border-white/90 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-bold text-primary font-sans">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-accent shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs text-slate-600 font-light leading-relaxed border-t border-slate-100 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Callout */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Have a specific commercial inquiry not answered above? </span>
          <button
            type="button"
            onClick={() => openEnquiryModal({ enquiryType: 'Trade Question' })}
            className="text-primary font-bold hover:text-accent underline transition-colors ml-1"
          >
            Speak with our commercial desk
          </button>
        </div>
      </div>
    </section>
  );
};

