import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { useSite } from '../../context/SiteContext';

export const Footer = () => {
  const { t } = useTranslation();
  const { settings } = useSite();
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null

  return (
    <footer className="bg-primary text-slate-300 pt-12 sm:pt-16 pb-8 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-8 sm:pb-12 border-b border-slate-700/60">
          {/* Column 1: Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 p-1 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                <img
                  src={settings.logo || '/logo.png'}
                  alt="Bharath Enterprises"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white block">
                  BHARATH
                </span>
                <span className="text-[10px] font-bold tracking-widest text-accent uppercase block -mt-0.5">
                  ENTERPRISES
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Bharath Enterprises is a global business development and consulting company headquartered in Coimbatore, Tamil Nadu, India. Connecting opportunities globally across import, export, sourcing, project development, and strategic partnerships.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socialLinks?.linkedin || '#'}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-accent hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.95 0-1.72-.77-1.72-1.72s.77-1.72 1.72-1.72 1.72.77 1.72 1.72-.77 1.72-1.72 1.72m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
              </a>
              <a
                href={settings.socialLinks?.facebook || '#'}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-accent hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a
                href={settings.socialLinks?.twitter || '#'}
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-accent hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href={settings.socialLinks?.instagram || '#'}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-accent hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-accent pl-2">
              {t('common.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  <span>{t('nav.home')}</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  <span>{t('nav.about')}</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  <span>{t('nav.products')}</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  <span>{t('nav.services')}</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  <span>{t('nav.projects')}</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  <span>{t('nav.gallery')}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-accent" />
                  <span>{t('nav.contact')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-accent pl-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-200 transition-colors">Industrial Equipment & Spares</li>
              <li className="hover:text-slate-200 transition-colors">Import & Export Services</li>
              <li className="hover:text-slate-200 transition-colors">Project Consulting & DPR</li>
              <li className="hover:text-slate-200 transition-colors">Business Setup & Registration</li>
              <li className="hover:text-slate-200 transition-colors">Special Projects & Sectors</li>
              <li className="pt-2">
                <Link
                  to="/services"
                  className="text-accent hover:underline text-xs inline-flex items-center gap-1"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operational Center */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-accent pl-2">
              {t('common.contactInfo')}
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Bharath Enterprises, Coimbatore, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href="tel:+919600949927" className="hover:text-white transition-colors">+91 96009 49927</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <a href="mailto:contact@bharatok.com" className="hover:text-white transition-colors">contact@bharatok.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>
            &copy; 2025 Bharath Enterprises, Coimbatore, Tamil Nadu, India. All Rights Reserved. Connecting Opportunities Globally.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              {t('common.privacy')}
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              {t('common.terms')}
            </button>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-accent transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Dialog Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 rounded-xl max-w-lg w-full p-6 text-left shadow-2xl relative">
            <h3 className="text-base font-bold text-primary mb-2">
              {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {legalModal === 'privacy'
                ? 'Bharath Enterprises respects client and commercial privacy. Customer and inquiry details submitted through this portal are processed strictly for business quotation, supply verification, and authorized communication under Indian data protection practices.'
                : 'All product specifications, sample quotations, and trade orders provided by Bharath Enterprises are governed by commercial sales terms and applicable trade guidelines in Coimbatore, Tamil Nadu, India.'}
            </p>
            <div className="text-right">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
