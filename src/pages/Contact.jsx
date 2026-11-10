import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useSEO } from '../utils/seo';
import { useSite } from '../context/SiteContext';
import { useAuth } from '../context/AuthContext';
import { submitEnquiry } from '../firebase/firestore';
import { isValidEmail, isValidPhone } from '../utils/validators';

export const Contact = () => {
  const { settings } = useSite();
  const { user } = useAuth();

  useSEO({
    title: 'Contact Us | Bharath Enterprises – Global Trade & Industrial Desk',
    description: 'Get in touch with Bharath Enterprises in Coimbatore & Coonoor, Tamil Nadu. Submit commercial quotations, industrial trade inquiries, or speak directly with our team.',
    keywords: 'Contact Bharath Enterprises Coimbatore, Industrial Boilers India, Spares, Global Trade Facilitation',
  });

  const [formData, setFormData] = useState({
    customerName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const companyEmail = 'contact@bharatok.com';
  const companyPhone = '+91 96009 49927';
  const companyAddress = 'Bharath Enterprises, Coimbatore, Tamil Nadu, India';

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) errs.customerName = 'Please enter your full name.';
    if (!formData.email.trim()) errs.email = 'Please enter your email address.';
    else if (!isValidEmail(formData.email)) errs.email = 'Please enter a valid email address.';
    if (!formData.phone.trim()) errs.phone = 'Please enter your phone number.';
    else if (!isValidPhone(formData.phone)) errs.phone = 'Please enter a valid phone number.';
    if (!formData.message.trim()) errs.message = 'Please write your message.';
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
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        enquiryType: 'Direct Support & Contact',
        customerId: user?.uid || null,
      });
      setSuccess(true);
      setFormData({
        customerName: user?.fullName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        message: '',
      });
    } catch (err) {
      setErrorMessage(err.message || 'Error sending message. Please try again or reach out directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-white py-10 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-stretch">
          
          {/* Left Column: Heading, Subtitle & Direct Contact Info */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 sm:py-4">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-neutral-900 tracking-tight leading-[1.12]">
                Talk to our<br />
                support team
              </h1>
              <p className="text-sm sm:text-base text-neutral-500 mt-4 sm:mt-6 leading-relaxed max-w-md font-normal">
                Feel free to reach out for help with your order or any questions you may have regarding your purchase.
              </p>
            </div>

            {/* Contact Pills / Details Stack */}
            <div className="space-y-4 pt-10 sm:pt-14">
              {/* 1. Email */}
              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] flex items-center justify-center shrink-0 text-neutral-800 transition-colors group-hover:bg-neutral-200">
                  <Mail className="w-4 h-4 stroke-[2]" />
                </div>
                <a
                  href={`mailto:${companyEmail}`}
                  className="text-sm font-medium text-neutral-800 hover:text-black transition-colors"
                >
                  {companyEmail}
                </a>
              </div>

              {/* 2. Phone Number */}
              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] flex items-center justify-center shrink-0 text-neutral-800 transition-colors group-hover:bg-neutral-200">
                  <Phone className="w-4 h-4 stroke-[2]" />
                </div>
                <a
                  href={`tel:${companyPhone.replace(/\s+/g, '')}`}
                  className="text-sm font-medium text-neutral-800 hover:text-black transition-colors"
                >
                  {companyPhone}
                </a>
              </div>

              {/* 3. Location */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F4F4F5] flex items-center justify-center shrink-0 text-neutral-800">
                  <MapPin className="w-4 h-4 stroke-[2]" />
                </div>
                <span className="text-sm font-medium text-neutral-800">
                  {companyAddress}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Card */}
          <div className="lg:col-span-6 flex items-center">
            <div className="w-full bg-[#F4F4F5] rounded-[28px] p-6 sm:p-9 md:p-10 border border-neutral-200/50 shadow-xs">
              {success ? (
                <div className="py-12 px-4 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xs">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">Message Sent</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto mb-6 leading-relaxed">
                    Thank you for reaching out! Our team has received your message and an auto-reply confirmation has been dispatched to your email.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="inline-flex items-center gap-2 bg-[#18181B] hover:bg-black text-white text-xs font-semibold px-5 py-3 rounded-xl transition-all cursor-pointer"
                  >
                    <span>Send Another Message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="Enter Your Full Name"
                      className={`w-full bg-white rounded-xl px-4 py-3 sm:py-3.5 text-sm text-neutral-900 placeholder-neutral-400 border focus:outline-none transition-all shadow-xs ${
                        errors.customerName
                          ? 'border-rose-400 bg-rose-50/20'
                          : 'border-transparent focus:border-neutral-300'
                      }`}
                    />
                    {errors.customerName && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.customerName}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter Your Email Address"
                      className={`w-full bg-white rounded-xl px-4 py-3 sm:py-3.5 text-sm text-neutral-900 placeholder-neutral-400 border focus:outline-none transition-all shadow-xs ${
                        errors.email
                          ? 'border-rose-400 bg-rose-50/20'
                          : 'border-transparent focus:border-neutral-300'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter Your Phone Number"
                      className={`w-full bg-white rounded-xl px-4 py-3 sm:py-3.5 text-sm text-neutral-900 placeholder-neutral-400 border focus:outline-none transition-all shadow-xs ${
                        errors.phone
                          ? 'border-rose-400 bg-rose-50/20'
                          : 'border-transparent focus:border-neutral-300'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write Your Message Here"
                      className={`w-full bg-white rounded-xl px-4 py-3 sm:py-3.5 text-sm text-neutral-900 placeholder-neutral-400 border focus:outline-none transition-all shadow-xs resize-none ${
                        errors.message
                          ? 'border-rose-400 bg-rose-50/20'
                          : 'border-transparent focus:border-neutral-300'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 bg-[#18181B] hover:bg-black text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-all active:scale-98 shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight className="w-4 h-4" />
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
