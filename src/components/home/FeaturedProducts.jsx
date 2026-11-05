import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, MessageSquare, ExternalLink, Tag } from 'lucide-react';
import { getProducts } from '../../firebase/firestore';
import { useSite } from '../../context/SiteContext';

export const FeaturedProducts = () => {
  const { t } = useTranslation();
  const { openEnquiryModal } = useSite();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts({ featured: true, status: 'published' })
      .then((items) => {
        setProducts(items.slice(0, 4));
      })
      .catch((e) => console.warn(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
              {t('home.featuredProductsTitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight font-sans">
              Precision Supplies & Industrial Hardware
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('home.featuredProductsSubtitle')}
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors self-start md:self-auto glass-button px-4 py-2 rounded-xl"
          >
            <span>Browse Full Catalogue (10–50 Products)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 glass-white rounded-2xl" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 glass-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-sm text-slate-500">Products currently being catalogued.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
              return (
                <div
                  key={product.productId || product.id}
                  className="group glass-white glass-white-hover rounded-2xl p-2.5 flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden rounded-xl bg-slate-50">
                    <img
                      src={primaryImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.sku && (
                      <span className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/20">
                        {product.sku}
                      </span>
                    )}
                    <span className="absolute bottom-2.5 left-2.5 bg-primary/85 backdrop-blur-md text-accent text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider border border-white/20">
                      {product.categoryId?.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-primary group-hover:text-secondary line-clamp-2 transition-colors mb-2 font-sans">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed mb-4">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between gap-2">
                      <Link
                        to={`/products/${product.productId || product.id}`}
                        className="text-xs font-semibold text-slate-700 hover:text-primary transition-colors"
                      >
                        {t('common.viewDetails')}
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          openEnquiryModal({
                            productId: product.productId || product.id,
                            productName: product.name,
                            enquiryType: 'Product Inquiry',
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
                      >
                        <MessageSquare className="w-3 h-3 text-accent" />
                        <span>{t('common.enquireNow')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
