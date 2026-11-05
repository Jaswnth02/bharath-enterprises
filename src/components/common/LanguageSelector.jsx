import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ta', label: 'தமிழ் (Tamil)', short: 'தமிழ்' },
  { code: 'hi', label: 'हिन्दी (Hindi)', short: 'हिन्दी' },
];

export const LanguageSelector = ({ variant = 'light' }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const isLight = variant === 'light';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors ${
          isLight
            ? 'text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700'
            : 'text-slate-700 hover:text-primary bg-slate-100 hover:bg-slate-200 border border-slate-200'
        }`}
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-accent" />
        <span>{currentLang.short}</span>
        <ChevronDown className="w-3 h-3 opacity-70" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-md shadow-lg bg-white ring-1 ring-black/5 divide-y divide-slate-100 focus:outline-none z-50 py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                i18n.language === lang.code ? 'font-semibold text-primary bg-slate-50' : 'text-slate-700'
              }`}
            >
              <span>{lang.label}</span>
              {i18n.language === lang.code && <Check className="w-3.5 h-3.5 text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

