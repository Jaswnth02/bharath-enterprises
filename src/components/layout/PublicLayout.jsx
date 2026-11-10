import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { WhatsAppFloat } from '../common/WhatsAppFloat';
import { EnquiryModal } from '../common/EnquiryModal';

export const PublicLayout = () => {
  const location = useLocation();
  const isContactPage = location.pathname === '/contact';

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 relative selection:bg-primary selection:text-white">
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      {!isContactPage && <Footer />}
      {!isContactPage && <WhatsAppFloat />}
      <EnquiryModal />
    </div>
  );
};
