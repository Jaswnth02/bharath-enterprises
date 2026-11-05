import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSite } from '../../context/SiteContext';
import { useAuth } from '../../context/AuthContext';
import { submitEnquiry } from '../../firebase/firestore';
import { isValidEmail, isValidPhone } from '../../utils/validators';

export const EnquiryModal = () => {
  const { t } = useTranslation();
  const { isEnquiryModalOpen, enquiryModalPrefill, closeEnquiryModal } = useSite();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    companyName: '',
    enquiryType: 'Product Inquiry',
    productOrService: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isEnquiryModalOpen) {
      setSuccess(false);
      setErrorMessage('');
      setErrors({});

      let prefilledName = user?.fullName || '';
      let prefilledEmail = user?.email || '';
      let prefilledPhone = user?.phone || '';

      let targetItem = enquiryModalPrefill.productName || enquiryModalPrefill.serviceTitle || '';
      let targetType = enquiryModalPrefill.enquiryType || 'General Business';

      setFormData({
        customerName: prefilledName,
        email: prefilledEmail,
        phone: prefilledPhone,
        companyName: '',
        enquiryType: targetType,
        productOrService: targetItem,
        message: targetItem ? `We are interested in receiving a detailed quotation and specification sheet for "${targetItem}".` : '',
      });
    }
  }, [isEnquiryModalOpen, enquiryModalPrefill, user]);

  if (!isEnquiryModalOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!isValidEmail(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter a contact phone number.';
    } else if (!isValidPhone(formData.phone)) {
      errs.phone = 'Please provide a valid phone number.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details of your inquiry or required quantities.';
    }
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
      const payload = {
        ...formData,
        customerId: user?.uid || null,
        productId: enquiryModalPrefill.productId || null,
      };

      await submitEnquiry(payload);
      setSuccess(true);
    } catch (err) {
      setErrorMessage(err.message || 'Submission failed. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 text-left transition-all border border-slate-100">
        <button
          onClick={closeEnquiryModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Enquiry Received</h3>
            <p className="text-sm text-slate-600 mb-6">
              Thank you for reaching out to Bharath Enterprises. Our commercial team in Coimbatore will review your requirements and respond promptly.
            </p>
            <button
              type="button"
              onClick={closeEnquiryModal}
              className="px-6 py-2.5 bg-primary hover:bg-primary-light text-white font-medium text-sm rounded-lg transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Bharath Enterprises</span>
              <h3 className="text-xl font-bold text-primary mt-1">Submit Business Enquiry</h3>
              <p className="text-xs text-slate-500 mt-1">
                Direct inquiry to our Coimbatore commercial desk. We provide formal quotations, technical sheets, and wholesale terms.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.customerName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                    placeholder="e.g. Anand R."
                  />
                  {errors.customerName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.customerName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                      errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                    }`}
                    placeholder="name@company.com"
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-0.5">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. Coimbatore Mills Ltd."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Enquiry Category</label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                  >
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Manufacturing">Manufacturing Contract</option>
                    <option value="Wholesale & Distribution">Wholesale & Bulk Order</option>
                    <option value="Retail & Trading">Retail & Trading</option>
                    <option value="Import & Export">Import & Export Facilitation</option>
                    <option value="Industrial Supplies">Industrial Supplies / MRO</option>
                    <option value="General Business">General Business Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Item of Interest</label>
                  <input
                    type="text"
                    value={formData.productOrService}
                    onChange={(e) => setFormData({ ...formData, productOrService: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. High-Tensile Fasteners"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Message / Quantity Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.message ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  }`}
                  placeholder="Specify material grade, quantity required, target delivery date, or specific questions..."
                ></textarea>
                {errors.message && <p className="text-[11px] text-rose-500 mt-0.5">{errors.message}</p>}
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={closeEnquiryModal}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary hover:bg-primary-light disabled:opacity-60 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-accent" />
                      <span>Submit Official Enquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
