import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  MessageSquare,
  MessageCircle,
  ShieldCheck,
  Tag,
  CheckCircle2,
  FileText,
  Truck,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { useSEO } from '../utils/seo';
import { getProductById, getProducts } from '../firebase/firestore';
import { useSite } from '../context/SiteContext';

export const ProductDetails = () => {
  const { productId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { settings, openEnquiryModal } = useSite();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProductById(productId)
      .then((data) => {
        setProduct(data);
        if (data?.images?.length) {
          setActiveImage(data.images[0]);
        }
        if (data?.categoryId) {
          getProducts({ categoryId: data.categoryId, status: 'published' }).then((rel) => {
            setRelated(rel.filter((r) => (r.productId || r.id) !== (data.productId || data.id)).slice(0, 3));
          });
        }
      })
      .finally(() => setLoading(false));
  }, [productId]);

  useSEO({
    title: product ? `${product.name} | Bharath Enterprises` : 'Product Details | Bharath Enterprises',
    description: product?.shortDescription || 'Commercial product specifications from Bharath Enterprises, Coimbatore.',
    keywords: product ? `${product.name}, ${product.sku}, Coimbatore industrial supplies` : '',
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 animate-pulse space-y-6">
        <div className="h-6 w-32 bg-white/60 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-96 glass-white rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 glass-white rounded-xl w-3/4" />
            <div className="h-4 glass-white rounded-xl w-1/2" />
            <div className="h-32 glass-white rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="glass-white p-8 rounded-3xl border border-white/80 shadow-md">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-primary mb-2 font-sans">Product Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">
            The requested product item may have been moved or updated.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-semibold rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919876543210';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');
  const waProductUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    `Hello Bharath Enterprises, I am inquiring about product "${product.name}" (SKU: ${product.sku || 'N/A'}). Please share price quote and availability.`
  )}`;

  const imagesList = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'];

  return (
    <div className="min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary transition-colors glass-pill px-3 py-1.5 rounded-xl self-start"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products Catalogue</span>
          </button>

          <span className="text-xs font-mono text-slate-500 glass-pill px-3 py-1 rounded-lg self-start sm:self-auto">
            SKU: {product.sku || 'BE-GEN-00'}
          </span>
        </div>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          {/* Images Gallery in White Glass */}
          <div className="lg:col-span-6 space-y-3">
            <div className="glass-white p-2.5 rounded-3xl border border-white/90 shadow-lg">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-slate-50">
                <img
                  src={activeImage || imagesList[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all"
                />
                <span className="absolute top-3 left-3 bg-primary/85 backdrop-blur-md text-accent text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border border-white/20">
                  {product.categoryId?.replace('-', ' ')}
                </span>
              </div>
            </div>

            {imagesList.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all p-0.5 glass-white ${
                      (activeImage || imagesList[0]) === img ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-white/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info & Actions in White Glass */}
          <div className="lg:col-span-6">
            <div className="glass-white-elevated p-5 sm:p-8 rounded-3xl border border-white/95 shadow-xl space-y-4 sm:space-y-5">
              <div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1 bg-accent/10 w-fit px-2 py-0.5 rounded">
                  Bharath Enterprises Specification
                </span>
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-primary tracking-tight font-sans">
                  {product.name}
                </h1>
                {product.sku && (
                  <p className="text-xs font-mono text-slate-500 mt-1">Item Code: {product.sku}</p>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                {product.shortDescription}
              </p>

              <div className="p-3.5 sm:p-4 glass-white-subtle rounded-2xl border border-white/80 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                  <span>Batch inspection with material test documentation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-accent shrink-0" />
                  <span>Direct wholesale distribution from Coimbatore facility</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    openEnquiryModal({
                      productId: product.productId || product.id,
                      productName: product.name,
                      enquiryType: 'Product Inquiry',
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:scale-98"
                >
                  <MessageSquare className="w-4 h-4 text-accent" />
                  <span>Request Price Quotation</span>
                </button>

                <a
                  href={waProductUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Inquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Specifications */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          <div className="lg:col-span-7">
            <div className="glass-white p-5 sm:p-7 md:p-8 rounded-3xl border border-white/90 shadow-md space-y-5 sm:space-y-6">
              <div>
                <h3 className="text-base font-bold text-primary mb-3 font-sans">Product Overview & Scope</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line font-light">
                  {product.description || product.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <h3 className="text-base font-bold text-primary mb-3 font-sans">{t('products.keyFeatures')}</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Manufactured / sourced in compliance with recognized engineering benchmarks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Designed to withstand industrial wear, pressure, and demanding workloads.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>Available in customized batch volumes, sizes, and protective finishes upon request.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-white p-7 sm:p-8 rounded-3xl border border-white/90 shadow-md">
              <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2 font-sans">
                <FileText className="w-4 h-4 text-accent" />
                <span>{t('products.specifications')}</span>
              </h3>

              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <dl className="divide-y divide-slate-200/70 text-xs">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="py-2.5 flex justify-between gap-3">
                      <dt className="font-semibold text-slate-700">{key}</dt>
                      <dd className="text-slate-600 text-right font-mono font-medium">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-xs text-slate-500">
                  Standard specifications applicable. Please submit an enquiry for exact tolerance drawings and batch reports.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-14 pt-8">
            <h3 className="text-lg font-bold text-primary mb-6 font-sans">
              {t('products.relatedProducts')} in {product.categoryId?.replace('-', ' ')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <div
                  key={item.productId || item.id}
                  className="glass-white glass-white-hover rounded-2xl p-3 flex flex-col justify-between"
                >
                  <img
                    src={item.images?.[0] || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'}
                    alt={item.name}
                    className="w-full h-36 object-cover rounded-xl mb-3"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-primary line-clamp-1 mb-1 font-sans">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">{item.shortDescription}</p>
                  </div>
                  <Link
                    to={`/products/${item.productId || item.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
