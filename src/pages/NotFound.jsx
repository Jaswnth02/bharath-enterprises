import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useSEO } from '../utils/seo';

export const NotFound = () => {
  useSEO({
    title: '404 - Page Not Found | Bharath Enterprises',
  });

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-surface text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
        <span className="text-4xl font-extrabold text-primary block mb-2 font-mono">404</span>
        <h1 className="text-xl font-bold text-primary mb-2">Page Not Found</h1>
        <p className="text-xs text-slate-500 mb-6">
          The requested page URL is not available on Bharath Enterprises website.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg transition-colors"
        >
          <Home className="w-4 h-4 text-accent" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
};

