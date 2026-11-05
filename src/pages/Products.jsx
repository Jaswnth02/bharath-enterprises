import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Filter, MessageSquare, ArrowRight, X, AlertCircle } from 'lucide-react';
import { useSEO } from '../utils/seo';
import { getProducts, getCategories } from '../firebase/firestore';
import { useSite } from '../context/SiteContext';

export const Products = () => {
  const { t } = useTranslation();
  const { openEnquiryModal } = useSite();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useSEO({
    title: 'Product Catalogue | Bharath Enterprises',
    description: 'Explore the full product catalogue of Bharath Enterprises Coimbatore: industrial fasteners, cast flanges, pump parts, woven packaging, and warehouse supplies.',
    keywords: 'Bharath Enterprises products, Coimbatore fasteners, industrial flanges, commercial pump castings, wholesale supplies Tamil Nadu',
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts({
      categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
      status: 'published',
    })
      .then((items) => {
        setProducts(items);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const term = searchQuery.toLowerCase();
    return (
      p.name?.toLowerCase().includes(term) ||
      p.sku?.toLowerCase().includes(term) ||
      p.shortDescription?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen py-10">
      {/* Catalogue Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8">
        <div className="glass-white-elevated p-8 sm:p-10 rounded-3xl border border-white/90 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
          <span className="text-[11px] font-bold text-accent uppercase tracking-widest block mb-2 bg-accent/10 w-fit px-2.5 py-0.5 rounded-md">
            Bharath Enterprises Catalogue
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-primary">
            {t('products.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed">
            {t('products.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Search & Filter Bar in White Glass */}
        <div className="glass-white p-4 rounded-2xl border border-white/80 shadow-md mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('products.searchPlaceholder')}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Quick Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl shrink-0 transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-sm font-bold'
                  : 'glass-pill text-slate-700 hover:bg-white'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.categoryId || cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.categoryId)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl shrink-0 transition-all ${
                  selectedCategory === cat.categoryId
                    ? 'bg-primary text-white shadow-sm font-bold'
                    : 'glass-pill text-slate-700 hover:bg-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-80 glass-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 glass-white rounded-3xl border border-white/80 max-w-lg mx-auto p-8 shadow-md">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-primary mb-1 font-sans">{t('products.noProductsFound')}</h3>
            <p className="text-xs text-slate-500 mb-5">
              Try adjusting your search query or selecting a different business category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('all');
              }}
              className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
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
                        className="text-xs font-semibold text-slate-700 hover:text-primary transition-colors inline-flex items-center gap-1"
                      >
                        <span>{t('common.viewDetails')}</span>
                        <ArrowRight className="w-3 h-3 text-accent" />
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
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
    </div>
  );
};
