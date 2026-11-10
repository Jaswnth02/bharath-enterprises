import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const SustainableGrowthBanner = () => {
  const { openEnquiryModal, settings } = useSite();

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919600949927';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello Bharath Enterprises, I am contacting you to explore global business development and strategic partnerships.")}`;

  return (
    <section className="min-h-[calc(100vh-5rem)] flex flex-col justify-center py-16 sm:py-24 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Subtle luxury ambient glow matching Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[900px] h-[350px] sm:h-[550px] bg-gradient-to-tr from-primary/3 via-accent/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center my-auto">
        {/* Category Tag with Gold Dividers matching Hero */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8 animate-in fade-in duration-700">
          <span className="w-8 sm:w-16 h-[1.5px] bg-[#CCA038]" />
          <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.24em] text-[#0A192F] uppercase font-sans">
            EXECUTIVE STRATEGIC VISION
          </span>
          <span className="w-8 sm:w-16 h-[1.5px] bg-[#CCA038]" />
        </div>

        {/* Grand Display Headline fitting top-to-bottom viewport scale */}
        <h2 
          style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
          className="font-luxury-headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#0A192F] tracking-tight leading-[1.12] mb-6 sm:mb-8"
        >
          Your Partner for{' '}
          <span className="text-accent italic font-normal">Sustainable Growth</span>
        </h2>

        {/* Centered Gold Accent Rule */}
        <div className="w-20 sm:w-28 md:w-32 h-[2px] bg-[#CCA038] mx-auto mb-6 sm:mb-8" />

        {/* Enlarged Editorial Paragraph */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12">
          We believe in enduring business relationships that create shared economic value. From developing bankable projects to facilitating cross-border industrial sourcing, we stand alongside you at every step of your commercial expansion.
        </p>

        {/* Centered Dual Action Buttons matching Hero */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={() => openEnquiryModal({ formType: 'partnership', enquiryType: 'Executive Strategic Partnership' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 bg-[#0E1F38] hover:bg-[#142D4E] text-white text-xs sm:text-sm font-bold rounded-full shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
          >
            <span>Initiate Partnership</span>
            <ArrowRight className="w-4 h-4 text-[#CCA038] transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-[#0E1F38] text-xs sm:text-sm font-bold rounded-full border border-[#CCA038] shadow-2xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-[#CCA038]" />
            <span>Direct Trade WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
