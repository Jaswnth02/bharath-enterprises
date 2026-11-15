import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';

export const Navbar = () => {
  const { t } = useTranslation();
  const { user, isAdmin } = useAuth();
  const { settings, openEnquiryModal } = useSite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/team', label: t('nav.team') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-2 sm:top-3.5 z-40 w-full px-3 sm:px-6 pointer-events-none transition-all">
      <div className="max-w-7xl mx-auto h-14 sm:h-16 flex items-center justify-between bg-white rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-200/80 px-3.5 sm:px-5 pointer-events-auto">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0 pr-1 sm:pr-2">
          <div className="h-9 sm:h-10 w-9 sm:w-10 flex items-center justify-center shrink-0">
            <img
              src={settings.logo || '/logo.png'}
              alt="Bharath Enterprises Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black tracking-tight text-[#0A192F] leading-none font-sans">
              BHARATH
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] text-accent uppercase mt-0.5">
              ENTERPRISES
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 sm:gap-1.5">
          {navLinks.map((link) => (
            link.disabled ? (
              <span
                key={link.to || link.label}
                className="inline-flex items-center text-xs tracking-wide px-3.5 py-1.5 rounded-full text-slate-400/80 cursor-default select-none pointer-events-none font-normal"
                aria-disabled="true"
              >
                {link.label}
              </span>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `inline-flex items-center text-xs tracking-wide transition-all px-3.5 py-1.5 rounded-full ${
                    isActive
                      ? 'text-[#0A192F] bg-slate-100 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-[#0A192F] hover:bg-slate-50 font-medium'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            )
          ))}
        </nav>

        {/* Desktop Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-2 sm:gap-2.5">
          <LanguageSelector variant="dark" />

          {/* Customer Portal temporarily hidden - uncomment to restore
          {user ? (
            <Link
              to={isAdmin ? '/admin/dashboard' : '/customer-dashboard'}
              className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0A192F] rounded-full hover:bg-slate-100 transition-all"
            >
              <span>{user.fullName ? user.fullName.split(' ')[0] : 'Customer Portal'}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0A192F] rounded-full hover:bg-slate-100 transition-all"
            >
              <span>Customer Portal</span>
            </Link>
          )}
          */}

          <button
            type="button"
            onClick={() => openEnquiryModal({ formType: 'general', enquiryType: 'Corporate Commercial Enquiry' })}
            className="inline-flex items-center gap-1.5 px-4 sm:px-4.5 py-2 text-xs font-bold text-white bg-[#0E1F38] hover:bg-[#142D4E] active:scale-95 rounded-full shadow-xs transition-all cursor-pointer"
          >
            <span>{t('nav.enquireNow')}</span>
            <ChevronRight className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>

        {/* Mobile & Tablet Header Controls (below lg) */}
        <div className="flex lg:hidden items-center gap-1.5">
          <button
            type="button"
            onClick={() => openEnquiryModal({ formType: 'general', enquiryType: 'Corporate Commercial Enquiry' })}
            className="px-3 py-1.5 text-[11px] font-bold text-white bg-[#0E1F38] hover:bg-[#142D4E] rounded-full shadow-xs"
          >
            {t('nav.enquireNow')}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-primary rounded-full hover:bg-slate-100 focus:outline-none active:scale-95 transition-transform cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Floating Card */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto max-w-7xl mx-auto mt-2 bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-2xl border border-black/[0.05] animate-in slide-in-from-top duration-200 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              link.disabled ? (
                <div
                  key={link.to || link.label}
                  className="text-xs font-medium py-2.5 px-3 rounded-xl text-slate-400/80 cursor-default select-none flex items-center justify-between"
                  aria-disabled="true"
                >
                  <span>{link.label}</span>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-between ${
                      isActive ? 'bg-slate-100 text-[#0A192F] font-bold' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </NavLink>
              )
            ))}

            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <div className="flex items-center justify-between py-1 px-1">
                <span className="text-xs font-medium text-slate-500">Language:</span>
                <LanguageSelector variant="dark" />
              </div>

              {/* Customer Portal temporarily hidden in mobile menu - uncomment to restore
              {user ? (
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/customer-dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 text-center text-xs font-semibold text-primary bg-slate-50 rounded-xl flex items-center justify-center"
                >
                  <span>My Portal ({user.fullName ? user.fullName.split(' ')[0] : 'Profile'})</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 text-center text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl flex items-center justify-center"
                >
                  <span>{t('nav.customerLogin')}</span>
                </Link>
              )}
              */}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal({ formType: 'general', enquiryType: 'Corporate Commercial Enquiry' });
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-[#0E1F38] rounded-xl shadow-md active:scale-98 transition-transform cursor-pointer"
              >
                {t('nav.enquireNow')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
