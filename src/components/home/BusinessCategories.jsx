import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Factory, Truck, Store, Globe2, Wrench } from 'lucide-react';
import { getCategories } from '../../firebase/firestore';

const categoryIcons = {
  manufacturing: Factory,
  'wholesale-distribution': Truck,
  'retail-trading': Store,
  'import-export': Globe2,
  'industrial-supplies': Wrench,
};

export const BusinessCategories = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">
            {t('home.categoriesTitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-sans">
            Specialized Commercial Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-light">
            {t('home.categoriesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.categoryId] || Factory;
            return (
              <div
                key={cat.categoryId || cat.id}
                className="group glass-white glass-white-hover rounded-2xl p-2.5 flex flex-col justify-between"
              >
                <div className="relative h-36 overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md p-1.5 rounded-lg text-primary shadow-2xs border border-white/80">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-primary mb-1 font-sans">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-light">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-200/50">
                    <Link
                      to={`/products?category=${cat.categoryId}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-primary group-hover:text-accent transition-colors"
                    >
                      <span>Explore Domain</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
