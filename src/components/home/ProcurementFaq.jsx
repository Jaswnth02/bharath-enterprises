import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const faqs = [
  {
    q: 'What are the Minimum Order Quantities (MOQs) for wholesale snacks and tea?',
    a: 'For commercial wholesale, our standard MOQ for packaged Nilgiris CTC and orthodox tea is 50 kg (assorted pouch/carton sizes). For traditional Ooty Varkey and bakery snacks, standard orders start at 20 bulk retail cartons. Custom trial sample batches are available for registered distributors upon request.'
  },
  {
    q: 'What specifications and mesh sizes are available for recycled nitrile rubber?',
    a: 'We process industrial-grade Nitrile Butadiene Rubber (NBR) gasket scrap into two primary forms: uniform granules (1.0 mm to 4.0 mm) and fine ambient powder (40 to 80 mesh). Every consignment is certified metal-free and fiber-free, packed in 25kg or 50kg moisture-resistant HDPE sacks or jumbo bulk bags.'
  },
  {
    q: 'Can you customize Nilgiris corporate trips, cab rentals, and resort stays?',
    a: 'Yes. Our Nilgiris Tourism Desk coordinates complete itineraries across Ooty, Coonoor, and Kotagiri. Services include mountain-certified cab pickups from Coimbatore Airport/Railway Station, heritage plantation resort stays, corporate retreat arrangements, and Nilgiris Mountain Railway (Toy Train) booking facilitation.'
  },
  {
    q: 'What quality grades of plywood and interior boards do you supply?',
    a: 'We supply certified IS:710 Marine Grade BWP (Boiling Water Proof) plywood and IS:303 Commercial BWR/MR plywood boards in standard sheet sizes (8x4 ft, 7x4 ft) and various thicknesses (6mm to 25mm), along with calibrated blockboards and decorative laminates for modular interiors and construction trade.'
  },
  {
    q: 'What are the standard delivery lead times across Tamil Nadu?',
    a: 'Consignments for Coimbatore, Tiruppur, and Erode are dispatched within 24 hours. Statewide deliveries across Tamil Nadu (Chennai, Salem, Madurai, Trichy) typically arrive within 24 to 48 hours. Interstate dispatches to Kerala and Karnataka follow planned freight corridors.'
  },
  {
    q: 'How does Bharath Enterprises support Nilgiris Self-Help Groups (SHGs)?',
    a: 'We directly collaborate with registered women-led Self-Help Groups in Coonoor and rural Nilgiris. We provide hygienic packaging, quality standardization, and fair-trade market access for steam-distilled eucalyptus oils, forest honey, and sun-cured vanilla, with 100% transparent pricing and no intermediary deductions.'
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

