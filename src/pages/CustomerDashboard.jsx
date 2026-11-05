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
    <div className="bg-surface min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xl shadow-xs">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'C'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-primary font-sans">
                  {t('dashboard.welcome')}, {user.fullName || 'Customer'}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800">
                  Customer Account
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Registered account for quotation tracking and commercial inquiries with Bharath Enterprises.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openEnquiryModal({ enquiryType: 'General Business' })}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-accent" />
              <span>New Quotation Request</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
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
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-primary flex items-center gap-2">
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
                <div className="mb-4 p-2.5 bg-emerald-50 text-emerald-700 text-xs rounded-lg flex items-center gap-2">
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
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-lg"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Name</span>
                    <span className="font-semibold text-slate-800">{user.fullName || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Email Address</span>
                    <span className="font-mono text-slate-800">{user.email}</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Contact Phone</span>
                    <span className="text-slate-800">{user.phone || 'Not provided'}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Security Notice</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Customer accounts are granted read-only access to their own submitted quotation requests.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Box */}
            <div className="bg-primary text-white rounded-2xl p-6 shadow-xs space-y-3">
              <h4 className="text-sm font-bold">Need Commercial Pricing?</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Browse our product catalogue for industrial fasteners, flanges, pump parts, and bulk supplies.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent hover:bg-accent-hover text-primary text-xs font-bold rounded-lg transition-colors"
              >
                <span>{t('dashboard.browseProducts')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Submitted Enquiries Table */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-primary flex items-center gap-2 font-sans">
                  <FileText className="w-4 h-4 text-accent" />
                  <span>{t('dashboard.myEnquiries')}</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {enquiries.length} {enquiries.length === 1 ? 'Record' : 'Records'}
                </span>
              </div>

              {loading ? (
                <div className="space-y-3 py-6 animate-pulse">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-16 bg-slate-100 rounded-lg" />
                  ))}
                </div>
              ) : enquiries.length === 0 ? (
                <div className="text-center py-14 bg-surface rounded-xl border border-dashed border-slate-300 p-6">
                  <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-primary mb-1">
                    {t('dashboard.noEnquiries')}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                    When you request quotations or product details from our catalogue, your records and live status will appear here.
                  </p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg"
                  >
                    <span>Explore Products</span>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 px-3">Ref ID</th>
                        <th className="py-2.5 px-3">Category / Item</th>
                        <th className="py-2.5 px-3">Submitted On</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Message Summary</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries.map((enq) => (
                        <tr key={enq.enquiryId || enq.id} className="hover:bg-slate-50/70 transition-colors">
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
