import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Send, 
  ArrowRight, 
  Globe2, 
  Building2, 
  FileText, 
  Handshake, 
  MessageSquare,
  Package,
  Ship,
  Briefcase,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSite } from '../../context/SiteContext';
import { useAuth } from '../../context/AuthContext';
import { submitEnquiry } from '../../firebase/firestore';
import { trackEnquirySubmit, trackWhatsAppClick } from '../../utils/analytics';
import { isValidEmail, isValidPhone } from '../../utils/validators';

const FORM_MODES = [
  { 
    id: 'project_distribution', 
    label: 'Project & Distribution', 
    icon: Package, 
    badge: 'Dealership & Sourcing',
    tagline: 'Inquire for distribution rights, dealership, bulk product supply, or project partnerships.' 
  },
  { 
    id: 'trade_sourcing', 
    label: 'Trade & Procurement', 
    icon: Ship, 
    badge: 'Import / Export RFQ',
    tagline: 'Request custom quotations for bulk commodities, equipment procurement, and cross-border logistics.' 
  },
  { 
    id: 'consultation', 
    label: 'Business Advisory', 
    icon: Briefcase, 
    badge: 'Strategic Consulting',
    tagline: 'Connect for Bankable DPR preparation, joint ventures, licensing, and business setup.' 
  },
];

export const EnquiryModal = () => {
  const { t } = useTranslation();
  const { isEnquiryModalOpen, enquiryModalPrefill, closeEnquiryModal, settings } = useSite();
  const { user } = useAuth();

  const [activeMode, setActiveMode] = useState('project_distribution');

  // Detailed typing fields for rich information collection
  const [formData, setFormData] = useState({
    // Contact Information
    customerName: '',
    email: '',
    phone: '',
    designation: '',

    // Organization Details
    companyName: '',
    facilityLocation: '', // City, State, Country
    gstinIec: '',
    websiteUrl: '',

    // Specific Requirements (all free-typed)
    productOrService: '', // Project/Product title or subject
    estimatedQuantity: '', // Volume, order size, quantity
    investmentScope: '', // Target budget or capital outlay
    targetTimeline: '', // Expected timeline / delivery date
    deliveryPort: '', // Target delivery location / territory
    natureOfAssistance: '', // Specific area of help/scope

    // Detailed notes
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize modal state and prefilled context on open
  useEffect(() => {
    if (isEnquiryModalOpen) {
      setSubmittedData(null);
      setErrorMessage('');
      setErrors({});

      const prefilledType = (enquiryModalPrefill.enquiryType || '').toLowerCase();
      let detectedMode = 'project_distribution';

      if (prefilledType.includes('rfq') || prefilledType.includes('procurement') || prefilledType.includes('supply') || prefilledType.includes('logistics') || prefilledType.includes('wholesale')) {
        detectedMode = 'trade_sourcing';
      } else if (prefilledType.includes('consult') || prefilledType.includes('advisory') || prefilledType.includes('partnership')) {
        detectedMode = 'consultation';
      } else if (enquiryModalPrefill.formType === 'trade_rfq') {
        detectedMode = 'trade_sourcing';
      } else if (enquiryModalPrefill.formType === 'consultation' || enquiryModalPrefill.formType === 'partnership') {
        detectedMode = 'consultation';
      }

      setActiveMode(detectedMode);

      setFormData(prev => ({
        ...prev,
        customerName: user?.fullName || prev.customerName || '',
        email: user?.email || prev.email || '',
        phone: user?.phone || prev.phone || '',
        productOrService: enquiryModalPrefill.productOrService || enquiryModalPrefill.productName || (enquiryModalPrefill.enquiryType && !enquiryModalPrefill.enquiryType.includes('General') ? enquiryModalPrefill.enquiryType : '') || prev.productOrService || '',
      }));
    }
  }, [isEnquiryModalOpen, enquiryModalPrefill, user]);

  if (!isEnquiryModalOpen) return null;

  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) errs.customerName = 'Please enter your full name.';
    if (!formData.email.trim()) errs.email = 'Please provide an email address.';
    else if (!isValidEmail(formData.email)) errs.email = 'Please enter a valid email address.';
    if (!formData.phone.trim()) errs.phone = 'Please provide a contact phone / WhatsApp.';
    else if (!isValidPhone(formData.phone)) errs.phone = 'Please provide a valid phone number.';
    if (!formData.companyName.trim()) errs.companyName = 'Please enter your company or business name.';
    if (!formData.facilityLocation.trim()) errs.facilityLocation = 'Please specify your location (City & Country).';
    if (!formData.productOrService.trim()) errs.productOrService = 'Please specify the project or product of interest.';
    if (!formData.message.trim()) errs.message = 'Please provide detailed notes or specific requirements.';

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
      const modeMeta = FORM_MODES.find(m => m.id === activeMode);
      const payload = {
        ...formData,
        formMode: activeMode,
        formTitle: modeMeta?.label || 'Commercial Enquiry',
        enquiryType: `${modeMeta?.label || 'Commercial'}: ${formData.productOrService}`,
        interestCategory: modeMeta?.label,
        customerId: user?.uid || null,
        productId: enquiryModalPrefill.productId || null,
        productName: enquiryModalPrefill.productName || formData.productOrService,
      };

      const result = await submitEnquiry(payload);
      setSubmittedData(result);

      // Track lead in Google Analytics
      trackEnquirySubmit({
        enquiryId: result?.enquiryId || result?.id || 'lead',
        mode: activeMode,
        productOrService: payload.productOrService,
        companyName: payload.companyName,
      });
    } catch (err) {
      setErrorMessage(err.message || 'Submission failed. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentMode = FORM_MODES.find(m => m.id === activeMode) || FORM_MODES[0];
  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919600949927';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl sm:rounded-[32px] shadow-2xl max-w-2xl w-full p-5 sm:p-7 md:p-9 text-left border border-slate-200/80 max-h-[92vh] overflow-y-auto my-auto">
        
        {/* Close Button */}
        <button
          onClick={closeEnquiryModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          /* Success Screen */
          <div className="text-center py-6 sm:py-8">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
              <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-accent uppercase tracking-widest block mb-1">
              Ticket #{submittedData.enquiryId || submittedData.id}
            </span>
            <h3 className="text-2xl font-bold text-[#0A192F] mb-2 font-sans tracking-tight">
              Inquiry Successfully Submitted
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-slate-900">{submittedData.customerName}</strong>. Our commercial and technical trade desk has received your details and queued them for review.
            </p>

            <div className="bg-[#FAF8F5] border border-[#E7E3DC] rounded-2xl p-4 sm:p-5 max-w-md mx-auto mb-6 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Subject / Project:</span>
                <span className="font-semibold text-slate-900 text-right">{submittedData.productOrService || 'Commercial Trade'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500 font-medium">Enterprise:</span>
                <span className="font-semibold text-slate-900 text-right">{submittedData.companyName}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-medium">Desk Response Window:</span>
                <span className="font-bold text-emerald-600">Within 24 Business Hours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Hello Bharath Enterprises, I have just submitted commercial inquiry #${submittedData.enquiryId || submittedData.id} regarding "${submittedData.productOrService}".`)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick({ source: 'enquiry_success_followup', prefillMessage: submittedData.productOrService })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-xl shadow-sm hover:brightness-105 active:scale-95 transition-all"
              >
                <span>Follow Up via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={closeEnquiryModal}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <>
            {/* Context Badge if arriving from a specific Project */}
            {enquiryModalPrefill.productOrService && (
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-[11px] font-semibold text-amber-900">
                <Package className="w-3.5 h-3.5 text-amber-700" />
                <span>Inquiring Regarding: <strong>{enquiryModalPrefill.productOrService}</strong></span>
              </div>
            )}

            {/* Header */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest px-2 py-0.5 rounded bg-accent/10">
                  {currentMode.badge}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#0A192F] tracking-tight font-sans">
                Commercial Requirement & Proposal
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {currentMode.tagline}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100/90 rounded-2xl mb-6">
              {FORM_MODES.map((m) => {
                const Icon = m.icon;
                const isActive = activeMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveMode(m.id)}
                    className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#0A192F] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-accent' : 'text-slate-400'}`} />
                    <span className="truncate">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* SECTION 1: Contact Information */}
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                  1. Contact & Executive Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => updateField('customerName', e.target.value)}
                      placeholder="e.g. Rajesh Sundaram"
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.customerName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                    />
                    {errors.customerName && <p className="text-[11px] text-rose-500 mt-1">{errors.customerName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Job Title / Designation
                    </label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => updateField('designation', e.target.value)}
                      placeholder="e.g. Managing Director / Procurement Head"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:border-[#E67E22] focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Corporate Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Phone / WhatsApp Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Organization & Location */}
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2 pt-1">
                  2. Enterprise & Operating Location
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Company / Organization Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => updateField('companyName', e.target.value)}
                      placeholder="e.g. Apex Global Trade Ltd."
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.companyName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                    />
                    {errors.companyName && <p className="text-[11px] text-rose-500 mt-1">{errors.companyName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      City, State & Country <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.facilityLocation}
                      onChange={(e) => updateField('facilityLocation', e.target.value)}
                      placeholder="e.g. Coimbatore, Tamil Nadu, India"
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.facilityLocation ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                    />
                    {errors.facilityLocation && <p className="text-[11px] text-rose-500 mt-1">{errors.facilityLocation}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {activeMode === 'trade_sourcing' ? 'GSTIN / Import-Export Code (IEC)' : 'Website / Corporate Profile (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={activeMode === 'trade_sourcing' ? formData.gstinIec : formData.websiteUrl}
                      onChange={(e) => updateField(activeMode === 'trade_sourcing' ? 'gstinIec' : 'websiteUrl', e.target.value)}
                      placeholder={activeMode === 'trade_sourcing' ? 'e.g. 33AAAAA0000A1Z5 or Overseas' : 'https://yourcompany.com'}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:border-[#E67E22] focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {activeMode === 'trade_sourcing' ? 'Target Destination Port / Plant' : activeMode === 'project_distribution' ? 'Target Territory / Region' : 'Meeting Channel / Location Preference'}
                    </label>
                    <input
                      type="text"
                      value={formData.deliveryPort}
                      onChange={(e) => updateField('deliveryPort', e.target.value)}
                      placeholder={
                        activeMode === 'trade_sourcing' 
                          ? 'e.g. Tuticorin Port / Chennai Plant' 
                          : activeMode === 'project_distribution' 
                          ? 'e.g. South India / GCC Region / Pan-India' 
                          : 'e.g. Google Meet or In-Person (Coimbatore)'
                      }
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:border-[#E67E22] focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Detailed Requirement Specifications (Typed) */}
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-2 pt-1">
                  3. Requirement Specifications (Typed)
                </span>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {activeMode === 'project_distribution' 
                        ? 'Project or Product of Interest' 
                        : activeMode === 'trade_sourcing' 
                        ? 'Material, Product or Commodity Required' 
                        : 'Area of Business Advisory / Assistance'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.productOrService}
                      onChange={(e) => updateField('productOrService', e.target.value)}
                      placeholder={
                        activeMode === 'project_distribution'
                          ? 'e.g. USANA Nutrition / Herbal Tea Distribution / Nilgiris Tourism'
                          : activeMode === 'trade_sourcing'
                          ? 'e.g. Industrial Rubber / Plywood / Bulk Agro Commodities'
                          : 'e.g. Bankable DPR for Factory Setup / Import Licensing / Joint Venture'
                      }
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.productOrService ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                    />
                    {errors.productOrService && <p className="text-[11px] text-rose-500 mt-1">{errors.productOrService}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {activeMode === 'trade_sourcing' ? 'Estimated Volume / Quantity' : 'Scale / Order Volume'}
                      </label>
                      <input
                        type="text"
                        value={formData.estimatedQuantity}
                        onChange={(e) => updateField('estimatedQuantity', e.target.value)}
                        placeholder="e.g. 1000 units / 20 Tons / Monthly"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:border-[#E67E22] focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        {activeMode === 'consultation' ? 'Project Investment Scope' : 'Target Budget / Outlay'}
                      </label>
                      <input
                        type="text"
                        value={formData.investmentScope}
                        onChange={(e) => updateField('investmentScope', e.target.value)}
                        placeholder="e.g. ₹10 Lakhs – ₹25 Lakhs or Open"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:border-[#E67E22] focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Target Timeline
                      </label>
                      <input
                        type="text"
                        value={formData.targetTimeline}
                        onChange={(e) => updateField('targetTimeline', e.target.value)}
                        placeholder="e.g. Immediate / Next 30 days"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:border-[#E67E22] focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Detailed Specifications, Proposal Notes or Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder={
                        activeMode === 'project_distribution'
                          ? 'Describe your distribution experience, target customer profile, existing retail/wholesale network, and specific questions regarding this project...'
                          : activeMode === 'trade_sourcing'
                          ? 'Provide technical specifications, quality standards, certification requirements, preferred packaging, and delivery schedule...'
                          : 'Outline your business objectives, current challenges, desired scope of work, and key milestones you wish to accomplish...'
                      }
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all resize-none ${
                        errors.message ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 bg-[#0E1F38] hover:bg-[#142D4E] active:scale-[0.99] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-accent" />
                      <span>Submitting Commercial Dossier...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-accent" />
                      <span>Submit Inquiry to Trade Desk</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2.5">
                  An automatic acknowledgment and reference ticket will be dispatched to your email immediately upon submission.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
