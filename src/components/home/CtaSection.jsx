import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, MessageCircle, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const CtaSection = () => {
  const { t } = useTranslation();
  const { settings, openEnquiryModal } = useSite();

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919600949927';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello Bharath Enterprises, I am contacting you from your website regarding global business development and consulting services.")}`;

  return (
    <section className="py-12 sm:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="glass-white-elevated p-6 sm:p-10 md:p-14 rounded-3xl border border-white/95 shadow-xl text-center relative overflow-hidden">
          {/* Subtle decorative background refractions */}
          <div className="absolute top-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-60 sm:w-80 h-60 sm:h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-white border border-white/90 text-slate-700 text-[11px] sm:text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Coimbatore Global Trade & Consulting Desk</span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tight font-sans">
              Ready to Expand Your Business Opportunities Globally?
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              Connect directly with our advisory desk for industrial equipment sourcing, import-export facilitation, Detailed Project Reports (DPR), and strategic business setup across India and Asia.
            </p>

            {/* Quick Contact Badges from Poster */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs">
              <a
                href="tel:+919600949927"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-white border border-white/90 text-primary font-bold shadow-2xs hover:text-accent transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>+91 96009 49927</span>
              </a>
              <a
                href="mailto:cncmurthi37@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-white border border-white/90 text-primary font-bold shadow-2xs hover:text-accent transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span>cncmurthi37@gmail.com</span>
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-white border border-white/90 text-slate-700 font-bold shadow-2xs">
                <Globe className="w-3.5 h-3.5 text-accent" />
                <span>www.bharath11.com</span>
              </span>
            </div>

            <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mx-auto">
              <button
                type="button"
                onClick={() => openEnquiryModal({ enquiryType: 'Global Business Development' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-98"
              >
                <MessageSquare className="w-4 h-4 text-accent" />
                <span>Submit Business Enquiry</span>
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Direct WhatsApp Desk</span>
              </a>
            </div>

            <p className="text-[10px] sm:text-[11px] text-slate-400 pt-1 font-medium">
              Bharath Enterprises • Coimbatore, Tamil Nadu, India • Active Across 14 International Corridors
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
