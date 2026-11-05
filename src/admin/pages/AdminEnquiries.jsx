import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle,
  X,
  MessageSquare,
  Clock,
  Phone,
  Mail,
  Building,
  User,
  Calendar,
  Save,
} from 'lucide-react';
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from '../../firebase/firestore';
import { formatDate, formatDateTime, getStatusBadgeStyle } from '../../utils/formatters';
import { useSEO } from '../../utils/seo';

const STATUSES = ['All', 'New', 'Contacted', 'In Progress', 'Completed', 'Rejected'];

export const AdminEnquiries = () => {
  useSEO({
    title: 'Enquiry Management | Bharath Enterprises Admin',
  });

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Selected enquiry for inspection / status update
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('New');
  const [adminNotes, setAdminNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getEnquiries(statusFilter === 'All' ? 'all' : statusFilter);
      setEnquiries(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter]);

  const openDetails = (enq) => {
    setSelectedEnquiry(enq);
    setCurrentStatus(enq.status || 'New');
    setAdminNotes(enq.adminNotes || '');
  };

  const handleUpdateStatusAndNotes = async (e) => {
    e.preventDefault();
    if (!selectedEnquiry) return;

    setIsSavingNotes(true);
    try {
      await updateEnquiryStatus(
        selectedEnquiry.enquiryId || selectedEnquiry.id,
        currentStatus,
        adminNotes
      );
      setSelectedEnquiry(null);
      await loadData();
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDelete = async (enq) => {
    if (!window.confirm(`Delete enquiry ${enq.enquiryId || enq.id} permanently?`)) return;
    await deleteEnquiry(enq.enquiryId || enq.id);
    if (selectedEnquiry && (selectedEnquiry.enquiryId || selectedEnquiry.id) === (enq.enquiryId || enq.id)) {
      setSelectedEnquiry(null);
    }
    await loadData();
  };

  const filtered = enquiries.filter((e) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return (
      e.enquiryId?.toLowerCase().includes(term) ||
      e.customerName?.toLowerCase().includes(term) ||
      e.email?.toLowerCase().includes(term) ||
      e.phone?.toLowerCase().includes(term) ||
      e.companyName?.toLowerCase().includes(term) ||
      e.productName?.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider block">
            Client Inquiries
          </span>
          <h1 className="text-2xl font-bold text-primary font-sans mt-0.5">
            Enquiry Management ({filtered.length})
          </h1>
          <p className="text-xs text-slate-500">
            Monitor incoming quote requests, change status, and record internal follow-up notes.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by ID, customer name, phone, or email..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {STATUSES.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                statusFilter === st
                  ? 'bg-primary text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading enquiries...</div>
        ) : paginated.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">No matching enquiry records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3 px-3">Enquiry ID</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Requirement</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginated.map((enq) => (
                  <tr key={enq.enquiryId || enq.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-primary whitespace-nowrap">
                      {enq.enquiryId || enq.id}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-800 block">{enq.customerName}</span>
                      {enq.companyName && (
                        <span className="text-[10px] text-slate-400 block">{enq.companyName}</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-slate-700 block font-mono">{enq.phone}</span>
                      <span className="text-[10px] text-slate-400 block">{enq.email}</span>
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <span className="font-semibold text-slate-800 block truncate">
                        {enq.productName || enq.productOrService || enq.enquiryType}
                      </span>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {enq.message}
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
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => openDetails(enq)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold transition-colors"
                        >
                          View / Status
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(enq)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-2.5 py-1 bg-white border border-slate-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enquiry Detail & Status Update Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 sm:p-8 text-left border border-slate-200 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold text-accent">
                {selectedEnquiry.enquiryId || selectedEnquiry.id}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusBadgeStyle(selectedEnquiry.status)}`}>
                {selectedEnquiry.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-primary font-sans mb-4">
              Enquiry Specification & Client Follow-up
            </h3>

            {/* Client Info Grid */}
            <div className="bg-surface p-4 rounded-xl border border-slate-200/80 mb-5 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Client Name</span>
                  <span className="font-bold text-slate-800">{selectedEnquiry.customerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Company Name</span>
                  <span className="text-slate-800">{selectedEnquiry.companyName || 'Not specified'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Phone</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-primary font-mono font-semibold hover:underline">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Email</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-primary font-mono font-semibold hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Submitted Timestamp</span>
                <span className="text-slate-600">{formatDateTime(selectedEnquiry.createdAt)}</span>
              </div>
            </div>

            {/* Requirement Summary */}
            <div className="mb-5 space-y-2 text-xs">
              <div>
                <span className="text-[11px] font-semibold text-slate-700 block">Category / Target Item:</span>
                <p className="text-slate-800 font-medium">
                  {selectedEnquiry.productName || selectedEnquiry.productOrService || selectedEnquiry.enquiryType}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-700 block">Client Message:</span>
                <p className="p-3 bg-slate-50 rounded-lg text-slate-700 whitespace-pre-line border border-slate-200 leading-relaxed">
                  {selectedEnquiry.message}
                </p>
              </div>
            </div>

            {/* Admin Status & Notes Form */}
            <form onSubmit={handleUpdateStatusAndNotes} className="space-y-4 pt-3 border-t border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Update Enquiry Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white font-semibold text-primary"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Internal Administrative Notes (Private)
                </label>
                <textarea
                  rows="3"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record quote sent, pricing discussed, delivery commitments..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={isSavingNotes}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-primary hover:bg-primary-light disabled:opacity-60 text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  <Save className="w-3.5 h-3.5 text-accent" />
                  <span>{isSavingNotes ? 'Saving...' : 'Update Enquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
