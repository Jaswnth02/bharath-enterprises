import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  X,
  User,
  ShieldCheck,
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
    { to: '/about', label: t('nav.about') },
    { to: '/products', label: t('nav.products') },
    { to: '/services', label: t('nav.services') },
    { to: '/projects', label: t('nav.projects') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 p-1 rounded-xl bg-white/90 shadow-2xs border border-white/80 flex items-center justify-center">
            <img
              src={settings.logo || '/logo-mark.svg'}
              alt="Bharath Enterprises Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-primary leading-tight font-sans">
              BHARATH
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-secondary uppercase -mt-0.5">
              ENTERPRISES
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/80 shadow-2xs">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-xs font-semibold tracking-wide transition-all px-3.5 py-1.5 rounded-full ${
                  isActive
                    ? 'text-primary bg-white shadow-2xs font-bold border border-white/90'
                    : 'text-slate-600 hover:text-primary hover:bg-white/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Language Switcher */}
          <LanguageSelector variant="dark" />

          {/* Customer Portal / Admin Link */}
          {user ? (
            <Link
              to={isAdmin ? '/admin/dashboard' : '/customer-dashboard'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary glass-button rounded-xl transition-all"
            >
              <User className="w-3.5 h-3.5 text-accent" />
              <span>{user.fullName ? user.fullName.split(' ')[0] : 'Portal'}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-primary glass-button rounded-xl transition-all"
            >
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>{t('nav.customerLogin')}</span>
            </Link>
          )}

          {/* Enquire Now CTA Button */}
          <button
            type="button"
            onClick={() => openEnquiryModal()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary-light active:scale-95 rounded-xl shadow-xs transition-all"
          >
            <span>{t('nav.enquireNow')}</span>
            <ChevronRight className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-primary glass-button rounded-lg focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-white-elevated border-t border-white/60 px-5 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-xs font-semibold py-2 px-3 rounded-xl transition-colors ${
                    isActive ? 'glass-white text-primary font-bold shadow-xs' : 'text-slate-700 hover:bg-white/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-3 border-t border-slate-200/60 flex flex-col gap-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-slate-500">Language:</span>
                <LanguageSelector variant="dark" />
              </div>

              {user ? (
                <Link
                  to={isAdmin ? '/admin/dashboard' : '/customer-dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 text-center text-xs font-semibold text-primary glass-button rounded-xl"
                >
                  My Portal ({user.fullName})
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 text-center text-xs font-semibold text-slate-700 glass-button rounded-xl"
                >
                  {t('nav.customerLogin')}
                </Link>
              )}

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal();
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-primary rounded-xl shadow-md"
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
