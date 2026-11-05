import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
} from 'lucide-react';
import { useSEO } from '../utils/seo';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';
import { submitEnquiry } from '../firebase/firestore';
import { isValidEmail, isValidPhone } from '../utils/validators';

export const Contact = () => {
  const { t } = useTranslation();
  const { settings } = useSite();
  const { user } = useAuth();

  useSEO({
    title: 'Contact Us | Bharath Enterprises – Coimbatore',
    description: 'Get in touch with Bharath Enterprises in Coimbatore, Tamil Nadu. Submit business quotations, industrial procurement inquiries, or speak directly on WhatsApp.',
    keywords: 'Contact Bharath Enterprises Coimbatore, Coimbatore commercial enquiry, industrial supplies phone email',
  });

  const [formData, setFormData] = useState({
    customerName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    companyName: '',
    enquiryType: 'General Business',
    productOrService: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919876543210';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello Bharath Enterprises, I would like to make an inquiry via your contact page.")}`;

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) errs.customerName = 'Please enter your full name.';
    if (!formData.email.trim()) errs.email = 'Please enter your email.';
    else if (!isValidEmail(formData.email)) errs.email = 'Please provide a valid email format.';
    if (!formData.phone.trim()) errs.phone = 'Please enter your phone number.';
    else if (!isValidPhone(formData.phone)) errs.phone = 'Please enter a valid phone number.';
    if (!formData.message.trim()) errs.message = 'Please provide details of your business inquiry.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitEnquiry({
        ...formData,
        customerId: user?.uid || null,
      });
      setSuccess(true);
      setFormData({
        customerName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        companyName: '',
        enquiryType: 'General Business',
        productOrService: '',
        message: '',
      });
    } catch (err) {
      setErrorMessage(err.message || 'Error submitting enquiry. Please connect via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10">
      {/* Header Banner in White Glass */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8">
        <div className="glass-white-elevated p-8 sm:p-10 rounded-3xl border border-white/90 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-accent/10 to-transparent pointer-events-none" />
          <span className="text-[11px] font-bold text-accent uppercase tracking-widest block mb-2 bg-accent/10 w-fit px-2.5 py-0.5 rounded-md">
            Direct Commercial Desk
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans text-primary">
            {t('contact.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-2 leading-relaxed font-light">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-wider block mb-1">
                Bharath Enterprises
              </span>
              <h2 className="text-2xl font-bold text-primary font-sans">
                Coimbatore Operational Center
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Connect directly with our commercial desk for bulk orders, contract sourcing, technical specifications, and distribution agreements.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-4 glass-white rounded-2xl border border-white/80 shadow-xs">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-primary font-sans">Office & Facility Address</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-light">
                    {settings.address || 'Avinashi Road, Peelamedu, Coimbatore, Tamil Nadu – 641004, India [Placeholder]'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 glass-white rounded-2xl border border-white/80 shadow-xs">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-primary font-sans">Contact Telephones</h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-mono">
                    {settings.phone || '+91 (0) 422 - [Phone Placeholder]'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 glass-white rounded-2xl border border-white/80 shadow-xs">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-primary font-sans">Commercial Email</h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-mono">
                    {settings.email || 'contact@bharathenterprises.com [Placeholder]'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 glass-white rounded-2xl border border-white/80 shadow-xs">
                <Clock className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-primary font-sans">Trading & Support Hours</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {settings.businessHours || 'Monday – Saturday: 9:00 AM – 6:30 PM (IST)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout in Glass */}
            <div className="p-5 glass-white rounded-2xl border border-white/90 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-primary font-sans">Need Immediate Assistance?</h4>
                <p className="text-[11px] text-slate-500">Chat with our Coimbatore representative directly.</p>
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Google Maps Location Preview in White Glass */}
            <div className="glass-white p-2 rounded-2xl border border-white/80 shadow-sm overflow-hidden">
              <div className="p-2.5 flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span>Coimbatore Industrial District Map</span>
                </span>
                <span className="text-[10px] text-slate-400">Avinashi Road</span>
              </div>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  title="Bharath Enterprises Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125322.4417316712!2d76.9010714!3d11.0168445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859af2f971cb5%3A0x2fc1c81e183ed282!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-48 border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Form Column in Elevated White Glass */}
          <div className="lg:col-span-7">
            <div className="glass-white-elevated rounded-3xl p-6 sm:p-8 border border-white/95 shadow-xl">
              <div className="mb-6">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-1 bg-accent/10 w-fit px-2 py-0.5 rounded">
                  Enquiry Submission
                </span>
                <h3 className="text-xl font-bold text-primary font-sans mt-1">
                  {t('contact.formTitle')}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-light">
                  {t('contact.formSubtitle')}
                </p>
              </div>

              {success ? (
                <div className="p-8 text-center glass-white rounded-2xl border border-emerald-200 my-4 shadow-sm">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-emerald-900 mb-1 font-sans">Enquiry Successfully Dispatched</h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto mb-5 leading-relaxed">
                    {t('contact.successMessage')}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-rose-50/90 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('contact.fullName')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className={`w-full px-3.5 py-2 text-xs bg-white/70 backdrop-blur-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.customerName ? 'border-rose-400 bg-rose-50/40' : 'border-white/80 shadow-2xs'
                        }`}
                        placeholder="e.g. Balasubramanian V."
                      />
                      {errors.customerName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.customerName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('contact.phone')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={`w-full px-3.5 py-2 text-xs bg-white/70 backdrop-blur-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-white/80 shadow-2xs'
                        }`}
                        placeholder="+91 94432 10987"
                      />
                      {errors.phone && <p className="text-[11px] text-rose-500 mt-0.5">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('contact.email')} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2 text-xs bg-white/70 backdrop-blur-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.email ? 'border-rose-400 bg-rose-50/40' : 'border-white/80 shadow-2xs'
                        }`}
                        placeholder="bala@industrialmills.com"
                      />
                      {errors.email && <p className="text-[11px] text-rose-500 mt-0.5">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('contact.companyName')}
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-white/70 backdrop-blur-xs border border-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs"
                        placeholder="e.g. Coimbatore Casting Works"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('contact.enquiryType')}
                      </label>
                      <select
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-white/80 backdrop-blur-xs border border-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs font-medium"
                      >
                        <option value="General Business">General Business Enquiry</option>
                        <option value="Product Inquiry">Product Catalogue & Pricing</option>
                        <option value="Manufacturing">Manufacturing Contract Sourcing</option>
                        <option value="Wholesale & Distribution">Wholesale & Regional Distribution</option>
                        <option value="Retail & Trading">Retail & Mercantile Trading</option>
                        <option value="Import & Export">Import & Export Facilitation</option>
                        <option value="Industrial Supplies">Industrial Supplies / MRO Contract</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {t('contact.productOrService')}
                      </label>
                      <input
                        type="text"
                        value={formData.productOrService}
                        onChange={(e) => setFormData({ ...formData, productOrService: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-white/70 backdrop-blur-xs border border-white/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs"
                        placeholder="e.g. M12 Fasteners or Pump Castings"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t('contact.message')} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-xs bg-white/70 backdrop-blur-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                        errors.message ? 'border-rose-400 bg-rose-50/40' : 'border-white/80 shadow-2xs'
                      }`}
                      placeholder="Please specify your required specifications, tentative delivery schedules, estimated volume, or any specific questions..."
                    />
                    {errors.message && <p className="text-[11px] text-rose-500 mt-0.5">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-primary hover:bg-primary-light disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-accent" />
                          <span>{t('common.submit')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
