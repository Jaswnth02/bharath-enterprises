import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Send, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Globe2, 
  Building2, 
  FileText, 
  ShieldCheck, 
  Handshake, 
  MessageSquare,
  MessageCircle,
  PhoneCall
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSite } from '../../context/SiteContext';
import { useAuth } from '../../context/AuthContext';
import { submitEnquiry } from '../../firebase/firestore';
import { isValidEmail, isValidPhone } from '../../utils/validators';

const FORM_MODES = [
  { id: 'general', label: 'Commercial Enquiry', icon: MessageSquare, badge: 'General Commercial' },
  { id: 'consultation', label: 'Book Consultation', icon: Calendar, badge: 'Operations Advisory' },
  { id: 'partnership', label: 'Initiate Partnership', icon: Handshake, badge: 'Strategic Alliance' },
  { id: 'trade_rfq', label: 'Trade RFQ & Sourcing', icon: FileText, badge: 'Procurement Desk' },
];

export const EnquiryModal = () => {
  const { t } = useTranslation();
  const { isEnquiryModalOpen, enquiryModalPrefill, closeEnquiryModal, settings } = useSite();
  const { user } = useAuth();

  const [activeMode, setActiveMode] = useState('general');

  // Form states per type
  const [formData, setFormData] = useState({
    // Shared common fields
    customerName: '',
    email: '',
    phone: '',
    companyName: '',
    message: '',

    // 1. General Enquiry specific
    designation: '',
    location: '',
    primaryCategory: 'Industrial Boilers & Engineering Spares',
    timeline: 'Within 1 Month',

    // 2. Consultation specific
    consultationSector: 'Power & Boiler Engineering',
    turnover: '₹1 Crore – ₹10 Crores (Small)',
    consultationDomain: 'Boiler Spares & Steam Equipment Audit',
    meetingMedium: 'Google Meet / Video Call',
    preferredDate: '',
    preferredTimeSlot: 'Morning (10:00 AM – 01:00 PM)',
    operationalChallenge: '',

    // 3. Partnership specific
    executiveDesignation: 'Founder / CEO',
    websiteUrl: '',
    hqLocation: '',
    trackRecord: '5 – 10 Years',
    partnershipModel: 'Bilateral Trade Desk / Cross-Border Sourcing',
    tradeVolume: '₹50L – ₹2 Crores (~$250K USD)',
    strategicVision: '',

    // 4. Trade RFQ specific
    gstinIec: '',
    deliveryLocation: '',
    serviceScope: 'Boiler Spares & Steam Accessories',
    orderFrequency: 'One-time Purchase Order',
    targetDeliveryDate: '',
    budgetRange: '₹5 Lakhs – ₹25 Lakhs',
    technicalSpecs: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync mode and prefilled values when modal opens
  useEffect(() => {
    if (isEnquiryModalOpen) {
      setSubmittedData(null);
      setErrorMessage('');
      setErrors({});

      const initialMode = enquiryModalPrefill.formType || 'general';
      setActiveMode(initialMode);

      setFormData(prev => ({
        ...prev,
        customerName: user?.fullName || prev.customerName || '',
        email: user?.email || prev.email || '',
        phone: user?.phone || prev.phone || '',
        companyName: prev.companyName || '',
        serviceScope: enquiryModalPrefill.productName || enquiryModalPrefill.serviceTitle || prev.serviceScope,
        primaryCategory: enquiryModalPrefill.productName ? 'Industrial Boilers & Engineering Spares' : prev.primaryCategory,
        message: enquiryModalPrefill.productName 
          ? `We are requesting an official price quotation and technical specification sheet for "${enquiryModalPrefill.productName}".`
          : prev.message,
      }));
    }
  }, [isEnquiryModalOpen, enquiryModalPrefill, user]);

  if (!isEnquiryModalOpen) return null;

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Dedicated validation logic per form mode
  const validate = () => {
    const errs = {};

    // Common baseline validation
    if (!formData.customerName.trim()) {
      errs.customerName = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!isValidEmail(formData.email)) {
      errs.email = 'Please provide a valid corporate email.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter a contact phone/WhatsApp number.';
    } else if (!isValidPhone(formData.phone)) {
      errs.phone = 'Please provide a valid phone number with dial code.';
    }
    if (!formData.companyName.trim()) {
      errs.companyName = 'Please specify your company or organization name.';
    }

    // Mode-specific required validation
    if (activeMode === 'general') {
      if (!formData.designation.trim()) errs.designation = 'Please enter your designation or role.';
      if (!formData.location.trim()) errs.location = 'Please specify city, state & country.';
      if (!formData.message.trim()) errs.message = 'Please provide an overview of your requirement.';
    } else if (activeMode === 'consultation') {
      if (!formData.designation.trim()) errs.designation = 'Please provide your corporate designation.';
      if (!formData.operationalChallenge.trim()) errs.operationalChallenge = 'Please describe your operational challenge or goal.';
      if (!formData.preferredDate.trim()) errs.preferredDate = 'Please select a preferred meeting date.';
    } else if (activeMode === 'partnership') {
      if (!formData.hqLocation.trim()) errs.hqLocation = 'Please provide headquarters city and country.';
      if (!formData.websiteUrl.trim()) errs.websiteUrl = 'Please provide corporate website or LinkedIn link.';
      if (!formData.strategicVision.trim()) errs.strategicVision = 'Please provide an outline of your partnership proposal.';
    } else if (activeMode === 'trade_rfq') {
      if (!formData.designation.trim()) errs.designation = 'Please enter your designation or department.';
      if (!formData.deliveryLocation.trim()) errs.deliveryLocation = 'Please provide delivery port, plant, or destination.';
      if (!formData.gstinIec.trim()) errs.gstinIec = 'Please enter GSTIN, IEC, or "Overseas Entity".';
      if (!formData.targetDeliveryDate.trim()) errs.targetDeliveryDate = 'Please specify target delivery/deadline.';
      if (!formData.technicalSpecs.trim()) errs.technicalSpecs = 'Please specify part numbers, capacities, or quantities.';
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
      const modeMeta = FORM_MODES.find(m => m.id === activeMode);
      const payload = {
        ...formData,
        formMode: activeMode,
        formTitle: modeMeta?.label || 'Commercial Enquiry',
        enquiryType: activeMode === 'consultation'
          ? `Consultation: ${formData.consultationDomain}`
          : activeMode === 'partnership'
          ? `Partnership: ${formData.partnershipModel}`
          : activeMode === 'trade_rfq'
          ? `Trade RFQ: ${formData.serviceScope}`
          : `General: ${formData.primaryCategory}`,
        customerId: user?.uid || null,
        productId: enquiryModalPrefill.productId || null,
        productName: enquiryModalPrefill.productName || null,
      };

      const result = await submitEnquiry(payload);
      setSubmittedData(result);
    } catch (err) {
      setErrorMessage(err.message || 'Submission failed. Please verify your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentModeMeta = FORM_MODES.find(m => m.id === activeMode) || FORM_MODES[0];
  const rawNumber = settings.whatsappNumber || import.meta.env.VITE_COMPANY_WHATSAPP || '919600949927';
  const cleanNumber = String(rawNumber).replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-[26px] sm:rounded-[32px] shadow-2xl max-w-2xl w-full p-5 sm:p-7 md:p-9 text-left border border-black/[0.06] max-h-[92vh] overflow-y-auto my-auto">
        
        {/* Close Button */}
        <button
          onClick={closeEnquiryModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#1A1A1A] p-2 rounded-full hover:bg-slate-100 transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          /* Success Screen */
          <div className="text-center py-6 sm:py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E67E22] bg-[#E67E22]/10 px-3 py-1 rounded-full">
                Reference ID: {submittedData.enquiryId || submittedData.id}
              </span>
              <h3 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-normal text-[#1A1A1A] pt-1"
              >
                Submission Received Successfully
              </h3>
              <p className="text-xs sm:text-sm text-[#6B655F] max-w-md mx-auto font-light leading-relaxed">
                Thank you, <span className="font-semibold text-slate-800">{formData.customerName}</span>. Your requirements have been logged at our commercial desk in Coimbatore. An authorized representative will contact you shortly.
              </p>
            </div>

            {/* Quick Action Buttons on Success */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md mx-auto">
              <a
                href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Hello Bharath Enterprises, I just submitted an inquiry (${submittedData.enquiryId || submittedData.id}) regarding ${submittedData.enquiryType}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={closeEnquiryModal}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="mb-6 pr-8">
              <div className="flex items-center gap-2 text-xs font-bold text-[#E67E22] uppercase tracking-wider mb-2">
                <span className="text-[10px]">▲</span>
                <span className="text-slate-800 font-sans tracking-widest text-[11px]">{currentModeMeta.badge}</span>
              </div>
              <h3 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-normal text-[#1A1A1A] leading-tight"
              >
                {activeMode === 'general' && 'Corporate Commercial Enquiry'}
                {activeMode === 'consultation' && 'Book an Expert Consultation'}
                {activeMode === 'partnership' && 'Initiate Strategic Partnership'}
                {activeMode === 'trade_rfq' && 'Commercial RFQ & Direct Sourcing'}
              </h3>
              <p className="text-xs sm:text-[13px] text-[#6B655F] font-light leading-relaxed mt-1.5">
                {activeMode === 'general' && 'Direct submission to our corporate trade desk. Request formal quotations, technical catalogues, and supply logistics.'}
                {activeMode === 'consultation' && 'Schedule a dedicated advisory session covering boiler spares, DPR preparation, government subsidies, and compliance.'}
                {activeMode === 'partnership' && 'Connect with senior management for bilateral trade corridors, exclusive distribution, and industrial joint ventures.'}
                {activeMode === 'trade_rfq' && 'Submit technical equipment specs, boiler spare part numbers, project DPR scope, or corporate licensing dispatch.'}
              </p>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Dynamic Form Body */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Row 1: Contact Person & Designation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {activeMode === 'partnership' ? 'Executive Name' : 'Full Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => updateField('customerName', e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                      errors.customerName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                    }`}
                    placeholder="e.g. R. Sundaram"
                  />
                  {errors.customerName && <p className="text-[11px] text-rose-500 mt-1">{errors.customerName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    {activeMode === 'partnership' ? 'Executive Designation' : 'Job Title / Designation'} <span className="text-rose-500">*</span>
                  </label>
                  {activeMode === 'partnership' ? (
                    <select
                      value={formData.executiveDesignation}
                      onChange={(e) => updateField('executiveDesignation', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                    >
                      <option value="Founder / CEO">Founder / CEO</option>
                      <option value="Managing Director">Managing Director</option>
                      <option value="Commercial Director">Commercial Director</option>
                      <option value="Head of Global Sourcing">Head of Global Sourcing</option>
                      <option value="Authorized Trade Representative">Authorized Trade Representative</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => updateField('designation', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.designation ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                      placeholder={activeMode === 'trade_rfq' ? 'e.g. Procurement Manager' : 'e.g. Managing Partner'}
                    />
                  )}
                  {errors.designation && <p className="text-[11px] text-rose-500 mt-1">{errors.designation}</p>}
                </div>
              </div>

              {/* Row 2: Email & Phone/WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Corporate Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                      errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                    }`}
                    placeholder="name@company.com"
                  />
                  {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Phone / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                      errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                    }`}
                    placeholder="+91 96009 49927"
                  />
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 3: Company Name & Location / Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Registered Enterprise Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                      errors.companyName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                    }`}
                    placeholder="e.g. Southern Boilers & Engineering Ltd."
                  />
                  {errors.companyName && <p className="text-[11px] text-rose-500 mt-1">{errors.companyName}</p>}
                </div>

                {/* Second column varies per mode */}
                {activeMode === 'general' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      City, State & Country <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateField('location', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.location ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                      placeholder="e.g. Coimbatore, Tamil Nadu, India"
                    />
                    {errors.location && <p className="text-[11px] text-rose-500 mt-1">{errors.location}</p>}
                  </div>
                )}

                {activeMode === 'consultation' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Industry Sector <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.consultationSector}
                      onChange={(e) => updateField('consultationSector', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                    >
                      <option value="Power & Boiler Engineering">Power & Boiler Engineering</option>
                      <option value="Manufacturing & Industrial Automation">Manufacturing & Heavy Machinery</option>
                      <option value="Textile & Garment Processing">Textile & Dyeing</option>
                      <option value="Food Processing & Packaging">Food Processing & Agriculture</option>
                      <option value="Chemical & Petrochemical">Chemical & Polymer</option>
                      <option value="Construction & Infrastructure">Construction & Building Materials</option>
                      <option value="Other Commercial Sector">Other Commercial Sector</option>
                    </select>
                  </div>
                )}

                {activeMode === 'partnership' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Corporate Website / LinkedIn <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.websiteUrl}
                      onChange={(e) => updateField('websiteUrl', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.websiteUrl ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                      placeholder="https://company.com"
                    />
                    {errors.websiteUrl && <p className="text-[11px] text-rose-500 mt-1">{errors.websiteUrl}</p>}
                  </div>
                )}

                {activeMode === 'trade_rfq' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      GSTIN / Import-Export Code (IEC) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.gstinIec}
                      onChange={(e) => updateField('gstinIec', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.gstinIec ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 focus:border-[#E67E22]'
                      }`}
                      placeholder="GSTIN (India) or 'Overseas Importer'"
                    />
                    {errors.gstinIec && <p className="text-[11px] text-rose-500 mt-1">{errors.gstinIec}</p>}
                  </div>
                )}
              </div>

              {/* MODE-SPECIFIC SECTION ROWS */}

              {/* Mode 1: General Enquiry */}
              {activeMode === 'general' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Primary Category of Interest <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.primaryCategory}
                      onChange={(e) => updateField('primaryCategory', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                    >
                      <option value="Industrial Boilers & Engineering Spares">Industrial Boilers & Engineering Spares</option>
                      <option value="Import / Export & Sourcing Logistics">Import / Export & Sourcing Logistics</option>
                      <option value="Project Consulting & Bankable DPR">Project Consulting & Bankable DPR</option>
                      <option value="Corporate Licensing, IEC & Business Setup">Corporate Licensing, IEC & Business Setup</option>
                      <option value="Bulk Agro & Nilgiris Special Commodities">Bulk Agro & Nilgiris Special Commodities</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Procurement Timeline <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => updateField('timeline', e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                    >
                      <option value="Immediate (< 2 Weeks)">Immediate (&lt; 2 Weeks)</option>
                      <option value="Within 1 Month">Within 1 Month</option>
                      <option value="1 to 3 Months">1 to 3 Months</option>
                      <option value="Budgeting / Exploratory Phase">Budgeting / Exploratory Phase</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Mode 2: Consultation */}
              {activeMode === 'consultation' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Consultation Focus Domain <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.consultationDomain}
                        onChange={(e) => updateField('consultationDomain', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                      >
                        <option value="Boiler Spares & Steam Equipment Audit">Boiler Spares & Steam Equipment Audit</option>
                        <option value="Export/Import Customs & Tariff Clearance">Export/Import Customs & Tariff Clearance</option>
                        <option value="Bankable DPR Preparation (PMEGP / MUDRA)">Bankable DPR Preparation (PMEGP / MUDRA)</option>
                        <option value="Multi-Country Entity Setup & IEC Licensing">Multi-Country Entity Setup & IEC Licensing</option>
                        <option value="Workflow & Supply Chain Optimization">Workflow & Supply Chain Optimization</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Annual Business Turnover <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.turnover}
                        onChange={(e) => updateField('turnover', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                      >
                        <option value="Pre-revenue / Planning Stage">Pre-revenue / Planning Stage</option>
                        <option value="Under ₹1 Crore (Micro)">Under ₹1 Crore (Micro)</option>
                        <option value="₹1 Crore – ₹10 Crores (Small)">₹1 Crore – ₹10 Crores (Small)</option>
                        <option value="₹10 Crores – ₹50 Crores (Medium)">₹10 Crores – ₹50 Crores (Medium)</option>
                        <option value="₹50 Crores+ (Enterprise)">₹50 Crores+ (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Preferred Meeting Medium <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.meetingMedium}
                        onChange={(e) => updateField('meetingMedium', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                      >
                        <option value="Google Meet / Video Call">Google Meet / Video Call</option>
                        <option value="Direct Phone Call">Direct Phone Call</option>
                        <option value="In-Person (Coimbatore/Coonoor Office)">In-Person (Coimbatore/Coonoor Office)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Preferred Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => updateField('preferredDate', e.target.value)}
                        className={`w-full px-3 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 ${
                          errors.preferredDate ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.preferredDate && <p className="text-[11px] text-rose-500 mt-1">{errors.preferredDate}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Time Slot <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.preferredTimeSlot}
                        onChange={(e) => updateField('preferredTimeSlot', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                      >
                        <option value="Morning (10:00 AM – 01:00 PM)">Morning (10 AM – 1 PM)</option>
                        <option value="Afternoon (02:00 PM – 05:00 PM)">Afternoon (2 PM – 5 PM)</option>
                        <option value="Evening (05:00 PM – 07:00 PM)">Evening (5 PM – 7 PM)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Mode 3: Partnership */}
              {activeMode === 'partnership' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Headquarters & Country <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.hqLocation}
                      onChange={(e) => updateField('hqLocation', e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                        errors.hqLocation ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                      }`}
                      placeholder="e.g. London, UK or Kuala Lumpur, MY"
                    />
                    {errors.hqLocation && <p className="text-[11px] text-rose-500 mt-1">{errors.hqLocation}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Partnership Model <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.partnershipModel}
                      onChange={(e) => updateField('partnershipModel', e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                    >
                      <option value="Bilateral Trade Desk / Cross-Border Sourcing">Bilateral Trade Desk / Sourcing</option>
                      <option value="Overseas Distribution & Authorized Agency">Overseas Distribution Network</option>
                      <option value="Technology Transfer & Manufacturing JV">Technology Transfer & JV</option>
                      <option value="Government Scheme & DPR Joint Development">Government Scheme & DPR</option>
                      <option value="Exclusive Supply Chain Agreement">Exclusive Supply Agreement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Target Trade Volume <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.tradeVolume}
                      onChange={(e) => updateField('tradeVolume', e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                    >
                      <option value="Under ₹50 Lakhs (~$60K USD)">Under ₹50 Lakhs (~$60K)</option>
                      <option value="₹50L – ₹2 Crores (~$250K USD)">₹50L – ₹2 Crores (~$250K)</option>
                      <option value="₹2 Cr – ₹10 Crores (~$1.2M USD)">₹2 Cr – ₹10 Crores (~$1.2M)</option>
                      <option value="₹10 Crores+ (Multi-Million USD)">₹10 Crores+ (Multi-Million)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Mode 4: Trade RFQ */}
              {activeMode === 'trade_rfq' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Service / Product Scope <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.serviceScope}
                        onChange={(e) => updateField('serviceScope', e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                      >
                        <option value="Boiler Spares & Steam Accessories">Boiler Spares & Steam Accessories</option>
                        <option value="Turnkey Process Equipment & PLC Controls">Turnkey Process Equipment & PLC Controls</option>
                        <option value="Bankable DPR Report for Bank Loan/Subsidy">Bankable DPR Report for Bank Loan/Subsidy</option>
                        <option value="Import-Export Customs & Port Handling">Import-Export Customs & Port Handling</option>
                        <option value="Private Limited / LLP Incorporation & IEC">Private Limited / LLP Setup & IEC</option>
                        <option value="Bulk Commodity / Agricultural Sourcing">Bulk Commodity / Agricultural Sourcing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Delivery Port / Factory Destination <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.deliveryLocation}
                        onChange={(e) => updateField('deliveryLocation', e.target.value)}
                        className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                          errors.deliveryLocation ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                        placeholder="e.g. Tuticorin Port or Coimbatore Factory"
                      />
                      {errors.deliveryLocation && <p className="text-[11px] text-rose-500 mt-1">{errors.deliveryLocation}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Sourcing Frequency <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.orderFrequency}
                        onChange={(e) => updateField('orderFrequency', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                      >
                        <option value="One-time Purchase Order">One-time Purchase Order</option>
                        <option value="Recurring Monthly Sourcing">Recurring Monthly Sourcing</option>
                        <option value="Annual Rate Contract (ARC)">Annual Rate Contract (ARC)</option>
                        <option value="Complete Turnkey Project">Complete Turnkey Project</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Target Delivery Date <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.targetDeliveryDate}
                        onChange={(e) => updateField('targetDeliveryDate', e.target.value)}
                        className={`w-full px-3 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 ${
                          errors.targetDeliveryDate ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                        }`}
                      />
                      {errors.targetDeliveryDate && <p className="text-[11px] text-rose-500 mt-1">{errors.targetDeliveryDate}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Estimated Budget <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => updateField('budgetRange', e.target.value)}
                        className="w-full px-3 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20"
                      >
                        <option value="Under ₹5 Lakhs">Under ₹5 Lakhs</option>
                        <option value="₹5 Lakhs – ₹25 Lakhs">₹5 Lakhs – ₹25 Lakhs</option>
                        <option value="₹25 Lakhs – ₹1 Crore">₹25 Lakhs – ₹1 Crore</option>
                        <option value="₹1 Crore+ (Large Scale)">₹1 Crore+ (Large Scale)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Textarea: Requirement Overview / Problem / Vision / Specs */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {activeMode === 'general' && 'Requirement Overview & Inquiries'}
                  {activeMode === 'consultation' && 'Current Operational Challenge / Advisory Scope'}
                  {activeMode === 'partnership' && 'Strategic Objectives & Partnership Scope'}
                  {activeMode === 'trade_rfq' && 'Technical Specifications, BOQ & Part Numbers'}
                  {' '}<span className="text-rose-500">*</span>
                </label>

                {activeMode === 'general' && (
                  <textarea
                    rows="3"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                      errors.message ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    }`}
                    placeholder="Provide details on required materials, capacity requirements, or questions..."
                  />
                )}
                {activeMode === 'general' && errors.message && <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>}

                {activeMode === 'consultation' && (
                  <textarea
                    rows="3"
                    value={formData.operationalChallenge}
                    onChange={(e) => updateField('operationalChallenge', e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                      errors.operationalChallenge ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    }`}
                    placeholder="Describe specific workflow bottlenecks, boiler compliance audits, or DPR requirements..."
                  />
                )}
                {activeMode === 'consultation' && errors.operationalChallenge && <p className="text-[11px] text-rose-500 mt-1">{errors.operationalChallenge}</p>}

                {activeMode === 'partnership' && (
                  <textarea
                    rows="3"
                    value={formData.strategicVision}
                    onChange={(e) => updateField('strategicVision', e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                      errors.strategicVision ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    }`}
                    placeholder="Outline proposed bilateral trade corridor, target territories, technology sharing, or joint investment..."
                  />
                )}
                {activeMode === 'partnership' && errors.strategicVision && <p className="text-[11px] text-rose-500 mt-1">{errors.strategicVision}</p>}

                {activeMode === 'trade_rfq' && (
                  <textarea
                    rows="3"
                    value={formData.technicalSpecs}
                    onChange={(e) => updateField('technicalSpecs', e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs bg-[#F8F9FA] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#E67E22]/20 transition-all ${
                      errors.technicalSpecs ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    }`}
                    placeholder="Include operating steam pressure (kg/cm²), boiler make/model, valve dimensions, or DPR capital outlay..."
                  />
                )}
                {activeMode === 'trade_rfq' && errors.technicalSpecs && <p className="text-[11px] text-rose-500 mt-1">{errors.technicalSpecs}</p>}
              </div>

              {/* Form Action Controls */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 font-light hidden sm:inline">
                  <span className="text-rose-500 font-bold">*</span> All marked fields are mandatory for corporate verification
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={closeEnquiryModal}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-xl bg-[#E67E22] hover:bg-[#D35400] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all active:scale-95 disabled:opacity-60 cursor-pointer w-full sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center text-white">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <span>
                          {activeMode === 'general' && 'Submit Commercial Enquiry'}
                          {activeMode === 'consultation' && 'Schedule Consultation'}
                          {activeMode === 'partnership' && 'Propose Strategic Partnership'}
                          {activeMode === 'trade_rfq' && 'Submit Procurement RFQ'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
