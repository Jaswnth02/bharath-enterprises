import React from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const WhatsAppFloat = () => {
  const { settings } = useSite();
  const location = useLocation();

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919876543210';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');

  let defaultMessage = "Hello Bharath Enterprises, I would like to make an inquiry regarding your commercial and industrial supplies.";
  
  if (location.pathname.startsWith('/products')) {
    defaultMessage = "Hello Bharath Enterprises, I am browsing your product catalogue and would like more details and quotation.";
  } else if (location.pathname.startsWith('/services')) {
    defaultMessage = "Hello Bharath Enterprises, I would like to inquire about your professional industrial and supply chain services.";
  }

  const encodedUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={encodedUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bharath Enterprises on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 p-3 sm:px-4 sm:py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 group"
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
      <span className="hidden sm:inline-block text-xs font-semibold tracking-wide">
        WhatsApp Inquiry
      </span>
    </a>
  );
};
