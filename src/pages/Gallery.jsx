import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ZoomIn, Eye, Image as ImageIcon } from 'lucide-react';
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
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-primary py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">
            Visual Portfolio
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
            {t('gallery.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
            {t('gallery.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-surface text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-64 bg-slate-100 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.imageId || item.id}
                onClick={() => setLightboxImage(item)}
                className="group relative h-64 rounded-xl overflow-hidden shadow-xs border border-slate-200 cursor-pointer bg-slate-100"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[10px] text-accent uppercase font-semibold tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold mt-1 leading-snug">{item.title}</h4>
                  {item.description && (
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.description}</p>
                  )}
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-accent font-semibold">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to enlarge view</span>
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white">
              <span className="text-[10px] text-accent font-bold uppercase tracking-wider block mb-1">
                {lightboxImage.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold">{lightboxImage.title}</h3>
              {lightboxImage.description && (
                <p className="text-xs text-slate-300 mt-1">{lightboxImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

