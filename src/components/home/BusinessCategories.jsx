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
    <section className="py-20 bg-surface border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
            {t('home.categoriesTitle')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-sans">
            Specialized Commercial Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            {t('home.categoriesSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.categoryId] || Factory;
            return (
              <div
                key={cat.categoryId || cat.id}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden bg-slate-100">
                  <img
                    src={cat.image || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/10 transition-colors" />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs p-2 rounded-lg text-primary shadow-xs">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-primary group-hover:text-secondary transition-colors mb-1.5">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100">
                    <Link
                      to={`/products?category=${cat.categoryId}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-accent transition-colors"
                    >
                      <span>Explore Domain</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
