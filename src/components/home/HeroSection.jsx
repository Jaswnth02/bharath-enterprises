import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const HeroSection = () => {
  const { t } = useTranslation();
  const { openEnquiryModal } = useSite();

  return (
    <section className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex flex-col justify-center py-6 sm:py-8 lg:py-10 relative overflow-hidden bg-white">
      {/* Subtle luxury ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[300px] sm:h-[450px] bg-gradient-to-tr from-[#CCA038]/5 via-[#CCA038]/3 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto w-full">
        {/* Top Gold Divider & Category Tag */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6 md:mb-8 animate-in fade-in duration-700">
          <span className="w-8 sm:w-16 md:w-20 h-[1.5px] bg-[#CCA038]" />
          <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.22em] sm:tracking-[0.28em] text-[#0F1E36] uppercase font-sans">
            GLOBAL BUSINESS DEVELOPMENT
          </span>
          <span className="w-8 sm:w-16 md:w-20 h-[1.5px] bg-[#CCA038]" />
        </div>

        {/* Grand Editorial Serif Display Headline calibrated to fit viewport */}
        <h1 
          style={{ fontFamily: "'Playfair Display', 'Bodoni Moda', 'Cormorant Garamond', 'Cinzel', Georgia, serif" }}
          className="font-editorial-serif leading-[1.03] text-center select-none uppercase"
        >
          <span className="block text-[#0A192F] font-semibold tracking-wide text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.85rem]">
            CONNECTING
          </span>
          <span className="block text-[#0A192F] font-semibold tracking-wide text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.85rem] mt-0.5 sm:mt-1">
            OPPORTUNITIES
          </span>
          <span className="block text-[#CCA038] font-semibold tracking-wide text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.85rem] mt-0.5 sm:mt-1">
            GLOBALLY
          </span>
        </h1>

        {/* Centered Gold Accent Rule */}
        <div className="w-20 sm:w-28 md:w-32 h-[2px] bg-[#CCA038] mx-auto mt-4 sm:mt-6 md:mt-7 mb-6 sm:mb-8 md:mb-9" />

        {/* Two Polished Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-xs sm:max-w-none mx-auto">
          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 bg-[#0E1F38] hover:bg-[#142D4E] text-white text-xs sm:text-sm font-bold rounded-full shadow-md hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>Explore Our Services</span>
            <span className="text-[#CCA038] font-bold text-base sm:text-lg leading-none">→</span>
          </Link>

          <button
            type="button"
            onClick={() => openEnquiryModal({ enquiryType: 'Global Business Development' })}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-[#0E1F38] text-xs sm:text-sm font-bold rounded-full border border-[#CCA038] shadow-2xs hover:shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#CCA038]" />
            <span>Connect With Us</span>
          </button>
        </div>
      </div>
    </section>
  );
};
