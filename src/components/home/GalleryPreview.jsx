import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Eye } from 'lucide-react';
import { getGallery } from '../../firebase/firestore';

export const GalleryPreview = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    getGallery().then((data) => setImages(data.slice(0, 4)));
  }, []);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
              {t('home.galleryTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-sans">
              Operations, Logistics & Facilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('home.gallerySubtitle')}
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors self-start md:self-auto glass-button px-4 py-2 rounded-xl"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((item) => (
            <div
              key={item.imageId || item.id}
              className="group relative h-56 rounded-2xl overflow-hidden shadow-xs border border-white/80 glass-white p-1.5"
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-primary/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                  <span className="text-[10px] text-accent uppercase tracking-wider font-bold">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold leading-tight mt-0.5">{item.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
