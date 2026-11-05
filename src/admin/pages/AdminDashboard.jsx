import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Wrench,
  Briefcase,
  Users,
  MessageSquare,
  Clock,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Eye,
  RefreshCw,
} from 'lucide-react';
import {
  getProducts,
  getServices,
  getProjects,
  getCustomers,
  getEnquiries,
  updateEnquiryStatus,
} from '../../firebase/firestore';
import { formatDate, getStatusBadgeStyle } from '../../utils/formatters';
import { useSEO } from '../../utils/seo';

export const AdminDashboard = () => {
  useSEO({
    title: 'Admin Dashboard | Bharath Enterprises',
  });

  const [stats, setStats] = useState({
    productsCount: 0,
    servicesCount: 0,
    projectsCount: 0,
    customersCount: 0,
    enquiriesCount: 0,
    pendingEnquiries: 0,
  });

  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, srvs, projs, custs, enqs] = await Promise.all([
        getProducts(),
        getServices(),
        getProjects(),
        getCustomers(),
        getEnquiries(),
      ]);

      const pending = enqs.filter((e) => e.status === 'New' || e.status === 'In Progress').length;

      setStats({
        productsCount: prods.length,
        servicesCount: srvs.length,
        projectsCount: projs.length,
        customersCount: custs.length,
        enquiriesCount: enqs.length,
        pendingEnquiries: pending,
      });

      setRecentEnquiries(enqs.slice(0, 5));
    } catch (e) {
      console.warn('Dashboard data fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuickStatus = async (enquiryId, newStatus) => {
    await updateEnquiryStatus(enquiryId, newStatus);
    loadData();
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider block">
            Bharath Enterprises Administration
          </span>
          <h1 className="text-2xl font-bold text-primary font-sans mt-0.5">
            Operational Overview
          </h1>
          <p className="text-xs text-slate-500">
            Real-time status of commercial catalogue, customer interactions, and trade inquiries.
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-primary rounded-lg shadow-2xs transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Products</span>
            <Package className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-extrabold text-primary font-sans">{stats.productsCount}</p>
          <Link to="/admin/products" className="text-[10px] text-accent font-semibold hover:underline mt-1 block">
            Manage catalogue &rarr;
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Services</span>
            <Wrench className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-extrabold text-primary font-sans">{stats.servicesCount}</p>
          <Link to="/admin/services" className="text-[10px] text-accent font-semibold hover:underline mt-1 block">
            Manage services &rarr;
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Projects</span>
            <Briefcase className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-extrabold text-primary font-sans">{stats.projectsCount}</p>
          <Link to="/admin/projects" className="text-[10px] text-accent font-semibold hover:underline mt-1 block">
            View portfolio &rarr;
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Customers</span>
            <Users className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-extrabold text-primary font-sans">{stats.customersCount}</p>
          <Link to="/admin/customers" className="text-[10px] text-accent font-semibold hover:underline mt-1 block">
            Customer directory &rarr;
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Enquiries</span>
            <MessageSquare className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-extrabold text-primary font-sans">{stats.enquiriesCount}</p>
          <Link to="/admin/enquiries" className="text-[10px] text-accent font-semibold hover:underline mt-1 block">
            All records &rarr;
          </Link>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Pending Action</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 font-sans">{stats.pendingEnquiries}</p>
          <span className="text-[10px] text-slate-400 block mt-1">Requires follow-up</span>
        </div>
      </div>

      {/* Main Section: Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-primary font-sans">Recent Inquiries & Quote Requests</h3>
              <p className="text-[11px] text-slate-400">Incoming commercial communications requiring response.</p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">No enquiries recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Enquiry ID</th>
                    <th className="py-2.5 px-3">Client</th>
                    <th className="py-2.5 px-3">Requirement</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentEnquiries.map((enq) => (
                    <tr key={enq.enquiryId || enq.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-3 font-mono font-bold text-primary">
                        {enq.enquiryId || enq.id}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-800 block">{enq.customerName}</span>
                        <span className="text-[10px] text-slate-400 block">{enq.phone}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-slate-700 block max-w-xs truncate">
                          {enq.productName || enq.productOrService || enq.enquiryType}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                        {formatDate(enq.createdAt)}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadgeStyle(enq.status)}`}>
                          {enq.status || 'New'}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <Link
                          to="/admin/enquiries"
                          className="text-xs font-semibold text-primary hover:text-accent"
                        >
                          Details &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Quick Status & Activity Feed */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-primary font-sans mb-3 pb-2 border-b border-slate-100">
              System Operations
            </h3>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-center justify-between">
                <span>Database Engine:</span>
                <span className="font-semibold text-emerald-600 font-mono">Cloud Firestore</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Storage System:</span>
                <span className="font-semibold text-emerald-600 font-mono">Firebase Storage</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Enterprise Base:</span>
                <span className="font-semibold text-slate-800">Coimbatore, Tamil Nadu</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Security Rules:</span>
                <span className="font-semibold text-emerald-600">Active (Admin Protected)</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary text-white rounded-2xl p-6 shadow-xs space-y-3">
            <h4 className="text-sm font-bold">Catalogue Maintenance</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Add new precision parts, adjust specifications, or manage product categories without writing code.
            </p>
            <div className="pt-1 flex gap-2">
              <Link
                to="/admin/products"
                className="px-3.5 py-2 bg-accent hover:bg-accent-hover text-primary text-xs font-bold rounded-lg transition-colors"
              >
                Add New Product
              </Link>
              <Link
                to="/admin/content"
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Edit Content
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

