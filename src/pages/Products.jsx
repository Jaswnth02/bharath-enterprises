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
    <div className="bg-white min-h-screen">
      {/* Catalogue Header */}
      <div className="bg-primary py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">
            Bharath Enterprises Catalogue
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
            {t('products.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
            {t('products.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Search & Filter Bar */}
        <div className="bg-surface p-4 rounded-xl border border-slate-200/80 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('products.searchPlaceholder')}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800"
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
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.categoryId || cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.categoryId)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                  selectedCategory === cat.categoryId
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
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
              <div key={n} className="h-80 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-2xl border border-dashed border-slate-300 max-w-lg mx-auto p-6">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-primary mb-1">{t('products.noProductsFound')}</h3>
            <p className="text-xs text-slate-500 mb-4">
              Try adjusting your search query or selecting a different business category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('all');
              }}
              className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg"
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
                  className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-50">
                    <img
                      src={primaryImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.sku && (
                      <span className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                        {product.sku}
                      </span>
                    )}
                    <span className="absolute bottom-2.5 left-2.5 bg-primary/90 text-accent text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                      {product.categoryId?.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-primary group-hover:text-secondary line-clamp-2 transition-colors mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-3 leading-relaxed mb-4">
                        {product.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
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
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
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
