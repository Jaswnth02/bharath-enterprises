import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  User,
  Mail,
  Phone,
  FileText,
  Clock,
  LogOut,
  Edit2,
  Check,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import { getCustomerEnquiries } from '../firebase/firestore';
import { formatDate, getStatusBadgeStyle } from '../utils/formatters';
import { useSEO } from '../utils/seo';

export const CustomerDashboard = () => {
  const { t } = useTranslation();
  const { user, logout, updateProfile } = useAuth();
  const { openEnquiryModal } = useSite();
  const navigate = useNavigate();

  useSEO({
    title: 'Customer Dashboard | Bharath Enterprises',
    description: 'Manage profile and monitor product quote inquiries with Bharath Enterprises.',
  });

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.fullName || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEditName(user.fullName || '');
    setEditPhone(user.phone || '');

    setLoading(true);
    getCustomerEnquiries(user.uid, user.email)
      .then(setEnquiries)
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile({
      fullName: editName,
      phone: editPhone,
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Welcome Banner in White Glass */}
        <div className="glass-white-elevated rounded-3xl p-5 sm:p-8 border border-white/95 shadow-xl mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-sm border border-white/40 shrink-0">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-bold text-primary font-sans">
                  {t('dashboard.welcome')}, {user.fullName || 'Customer'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-100/80 text-blue-800 border border-blue-200">
                  Customer Account
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-light">
                Registered account for quotation tracking and commercial inquiries with Bharath Enterprises.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => openEnquiryModal({ enquiryType: 'General Business' })}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98"
            >
              <PlusCircle className="w-4 h-4 text-accent" />
              <span>New Quotation Request</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 glass-button text-slate-700 text-xs font-semibold rounded-xl transition-all active:scale-98"
            >
              <LogOut className="w-4 h-4 text-slate-500" />
              <span>{t('dashboard.logout')}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-white rounded-3xl p-6 border border-white/90 shadow-md">
              <div className="flex items-center justify-between mb-4 border-b border-slate-200/60 pb-3">
                <h3 className="text-sm font-bold text-primary flex items-center gap-2 font-sans">
                  <User className="w-4 h-4 text-accent" />
                  <span>{t('dashboard.profileSettings')}</span>
                </h3>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-accent font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              {saveSuccess && (
                <div className="mb-4 p-2.5 bg-emerald-50 text-emerald-700 text-xs rounded-xl flex items-center gap-2 border border-emerald-200">
                  <Check className="w-4 h-4" />
                  <span>Profile updated successfully.</span>
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white/80 border border-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white/80 border border-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-primary text-white text-xs font-semibold rounded-xl shadow-xs"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3.5 py-1.5 glass-button text-slate-600 text-xs font-semibold rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Name</span>
                    <span className="font-semibold text-slate-800">{user.fullName || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Email Address</span>
                    <span className="font-mono text-slate-800">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Contact Phone</span>
                    <span className="text-slate-800">{user.phone || 'Not provided'}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">Security Notice</span>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-light">
                      Customer accounts are granted read-only access to their own submitted quotation requests.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Box */}
            <div className="glass-white p-6 rounded-3xl border border-white/90 shadow-md space-y-3">
              <h4 className="text-sm font-bold text-primary font-sans">Need Commercial Pricing?</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light">
                Browse our product catalogue for industrial fasteners, flanges, pump parts, and bulk supplies.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                <span>{t('dashboard.browseProducts')}</span>
                <ExternalLink className="w-3.5 h-3.5 text-accent" />
              </Link>
            </div>
          </div>

          {/* Right Column: Submitted Enquiries Table */}
          <div className="lg:col-span-8">
            <div className="glass-white rounded-3xl p-6 sm:p-7 border border-white/90 shadow-md">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/60">
                <h3 className="text-base font-bold text-primary flex items-center gap-2 font-sans">
                  <FileText className="w-4 h-4 text-accent" />
                  <span>{t('dashboard.myEnquiries')}</span>
                </h3>
                <span className="text-xs text-slate-500 font-semibold glass-pill px-2.5 py-0.5 rounded-lg">
                  {enquiries.length} {enquiries.length === 1 ? 'Record' : 'Records'}
                </span>
              </div>

              {loading ? (
                <div className="space-y-3 py-6 animate-pulse">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-16 glass-white rounded-xl" />
                  ))}
                </div>
              ) : enquiries.length === 0 ? (
                <div className="text-center py-14 glass-white-subtle rounded-2xl border border-dashed border-slate-300 p-6">
                  <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-primary mb-1 font-sans">
                    {t('dashboard.noEnquiries')}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4 font-light">
                    When you request quotations or product details from our catalogue, your records and live status will appear here.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl shadow-xs"
                  >
                    <span>Explore Products</span>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200/70 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 px-3">Ref ID</th>
                        <th className="py-2.5 px-3">Category / Item</th>
                        <th className="py-2.5 px-3">Submitted On</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Message Summary</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries.map((enq) => (
                        <tr key={enq.enquiryId || enq.id} className="hover:bg-white/60 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-primary">
                            {enq.enquiryId || enq.id}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-semibold text-slate-800 block">
                              {enq.productName || enq.productOrService || enq.enquiryType}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {enq.enquiryType}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            {formatDate(enq.createdAt)}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(enq.status)}`}>
                              {enq.status || 'New'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-500 max-w-xs truncate">
                            {enq.message}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
