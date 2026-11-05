import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ZoomIn } from 'lucide-react';
import { useSEO } from '../utils/seo';
import { getGallery } from '../firebase/firestore';

export const Gallery = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useSEO({
    title: 'Enterprise Gallery | Bharath Enterprises',
    description: 'Explore photographs of Bharath Enterprises Coimbatore: warehousing facilities, precision hardware, manufacturing partners, and logistics operations.',
    keywords: 'Bharath Enterprises gallery, Coimbatore industrial facility, hardware photos Coimbatore',
  });

  useEffect(() => {
    getGallery()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(items.map((i) => i.category).filter(Boolean))];

  const filtered = activeCategory === 'All'
    ? items
    : items.filter((i) => i.category === activeCategory);

  return (
    <div className="min-h-screen py-6 sm:py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-6 sm:mb-8">
        <div className="glass-white-elevated p-5 sm:p-8 md:p-12 rounded-3xl border border-white/95 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
          <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-widest block mb-2 bg-accent/10 w-fit px-2.5 py-0.5 rounded-md">
            Visual Portfolio
          </span>
          <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-sans text-primary">
            {t('gallery.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed font-light">
            {t('gallery.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 sm:pb-16">
        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 sm:mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl shrink-0 transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'glass-pill text-slate-700 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 glass-white rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((item) => (
              <div
                key={item.imageId || item.id}
                onClick={() => setLightboxImage(item)}
                className="group relative h-56 sm:h-64 rounded-3xl overflow-hidden shadow-xs border border-white/90 cursor-pointer glass-white p-1.5"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 text-white">
                    <span className="text-[10px] text-accent uppercase font-bold tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold mt-1 leading-snug">{item.title}</h4>
                    {item.description && (
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2 font-light">{item.description}</p>
                    )}
                    <div className="mt-3 flex items-center gap-1 text-[11px] text-accent font-semibold">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Click to view full photo</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative glass-white-elevated max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/95"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-all active:scale-95"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] sm:max-h-[75vh] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 bg-white/95">
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                {lightboxImage.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-primary mt-0.5 font-sans">
                {lightboxImage.title}
              </h3>
              {lightboxImage.description && (
                <p className="text-xs sm:text-sm text-slate-600 mt-1 font-light">
                  {lightboxImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
