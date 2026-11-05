import React, { useState, useEffect } from 'react';
import { Save, Check, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { updateWebsiteSettings } from '../../firebase/firestore';
import { uploadFile } from '../../firebase/storage';
import { useSEO } from '../../utils/seo';

export const AdminContent = () => {
  useSEO({
    title: 'Website Content Management | Bharath Enterprises Admin',
  });

  const { settings, refreshSettings } = useSite();
  const [form, setForm] = useState({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (settings) {
      setForm({
        companyName: settings.companyName || 'Bharath Enterprises',
        establishedYear: settings.establishedYear || '2025',
        logo: settings.logo || '/logo-mark.svg',
        address: settings.address || '',
        phone: settings.phone || '',
        email: settings.email || '',
        whatsappNumber: settings.whatsappNumber || '',
        businessHours: settings.businessHours || '',
        mission: settings.mission || '',
        vision: settings.vision || '',
        aboutContent: settings.aboutContent || '',
        footerContent: settings.footerContent || '',
        socialLinks: {
          linkedin: settings.socialLinks?.linkedin || '',
          facebook: settings.socialLinks?.facebook || '',
          twitter: settings.socialLinks?.twitter || '',
          instagram: settings.socialLinks?.instagram || '',
        },
      });
    }
  }, [settings]);

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadFile(file, 'branding');
      setForm((prev) => ({ ...prev, logo: url }));
    } catch (err) {
      setError('Failed to upload logo: ' + err.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSaveSuccess(false);

    try {
      await updateWebsiteSettings(form);
      await refreshSettings();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      setError('Error saving website content: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider block">
            Live Site Control
          </span>
          <h1 className="text-2xl font-bold text-primary font-sans mt-0.5">
            Website Content & Copy
          </h1>
          <p className="text-xs text-slate-500">
            Updates saved here reflect immediately on the public website without redeploying code.
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-lg animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Website content updated live!</span>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Company Profile & Logo */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-primary border-b border-slate-100 pb-2">
            Company Identity & Branding
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Established Year</label>
              <input
                type="text"
                value={form.establishedYear}
                onChange={(e) => setForm({ ...form, establishedYear: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Logo</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={form.logo}
                  onChange={(e) => setForm({ ...form, logo: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none font-mono"
                />
                <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer inline-flex items-center gap-1 border border-slate-300">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Contact Details */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-primary border-b border-slate-100 pb-2">
            Contact Information & Coordinates
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Office & Facility Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Phone Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Commercial Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Official WhatsApp Number (No spaces)</label>
              <input
                type="text"
                value={form.whatsappNumber}
                onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none font-mono"
                placeholder="e.g. 919876543210"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Operational Hours</label>
            <input
              type="text"
              value={form.businessHours}
              onChange={(e) => setForm({ ...form, businessHours: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        {/* Section 3: About, Mission & Vision Copy */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-primary border-b border-slate-100 pb-2">
            Corporate Story, Mission & Vision
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">About Us Description</label>
            <textarea
              rows="4"
              value={form.aboutContent}
              onChange={(e) => setForm({ ...form, aboutContent: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mission Statement</label>
              <textarea
                rows="3"
                value={form.mission}
                onChange={(e) => setForm({ ...form, mission: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Vision Statement</label>
              <textarea
                rows="3"
                value={form.vision}
                onChange={(e) => setForm({ ...form, vision: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Footer Statement</label>
            <textarea
              rows="2"
              value={form.footerContent}
              onChange={(e) => setForm({ ...form, footerContent: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light disabled:opacity-60 text-white text-xs font-bold rounded-lg shadow-md transition-all"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-accent" />
                <span>Writing to Database...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-accent" />
                <span>Save & Publish Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

