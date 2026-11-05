import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const CtaSection = () => {
  const { t } = useTranslation();
  const { settings, openEnquiryModal } = useSite();

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919876543210';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello Bharath Enterprises, I am contacting you from your website to discuss business requirements.")}`;

  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary-light/30 skew-x-12 transform origin-top pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold tracking-wider uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Coimbatore Commercial Desk</span>
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans max-w-3xl mx-auto">
          {t('home.ctaTitle')}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('home.ctaText')}
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => openEnquiryModal({ enquiryType: 'General Business' })}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-primary font-bold text-xs sm:text-sm rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t('home.ctaButton')}</span>
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{t('home.ctaWhatsApp')}</span>
          </a>
        </div>

        <p className="text-[11px] text-slate-400 pt-2">
          Responses typically delivered within 24 working hours • Confidential commercial quotations
        </p>
      </div>
    </section>
  );
};
