import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { WhatsAppFloat } from '../common/WhatsAppFloat';
import { EnquiryModal } from '../common/EnquiryModal';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <EnquiryModal />
    </div>
  );
};
