import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const CtaSection = () => {
  const { t } = useTranslation();
  const { settings, openEnquiryModal } = useSite();

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919600949927';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello Bharath Enterprises, I am contacting you from your website regarding global business development and consulting services.")}`;

  return (
    <section className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex flex-col justify-center py-10 sm:py-16 relative overflow-hidden bg-[#EFECE6] text-[#1A1A1A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center my-auto w-full">
        
        {/* Eyebrow Badge matching FAQ */}
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E67E22] uppercase tracking-wider mb-4 sm:mb-6">
          <span className="text-[10px]">▲</span>
          <span className="text-slate-800 font-sans tracking-widest text-[11px] sm:text-xs">GLOBAL TRADE & CONSULTING DESK</span>
        </div>

        {/* Display Serif Headline scaled to fill viewport */}
        <h2 
          style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
          className="text-3xl sm:text-5xl lg:text-[3.5rem] font-normal text-[#1A1A1A] leading-[1.12] tracking-tight max-w-4xl mx-auto"
        >
          Ready to Expand Your Business Opportunities Globally?
        </h2>

        {/* Lead Description */}
        <p className="text-xs sm:text-sm md:text-base text-[#6B655F] font-light leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-5">
          Connect directly with our advisory desk for industrial equipment sourcing, import-export facilitation, Detailed Project Reports (DPR), and strategic business setup across India and Asia.
        </p>

        {/* Action Buttons matching FAQ Consultation Buttons */}
        <div className="pt-8 sm:pt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-xs sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={() => openEnquiryModal({ formType: 'trade_rfq', enquiryType: 'Direct Trade Desk & RFQ' })}
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 group cursor-pointer"
          >
            <span className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center text-white">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <span>Submit Business Enquiry</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-xl bg-[#1A1A1A] hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <span className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center text-white">
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
            </span>
            <span>Direct WhatsApp Desk</span>
          </a>
        </div>

        {/* Corridor Footer Note */}
        <p className="text-[11px] sm:text-xs text-[#8C857D] font-light mt-8 sm:mt-12">
          Bharath Enterprises • Coimbatore, Tamil Nadu, India • Active Across 14 International Corridors
        </p>

      </div>
    </section>
  );
};
