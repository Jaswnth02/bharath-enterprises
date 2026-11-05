import React, { useState, useEffect } from 'react';
import { Search, User, Mail, Phone, Calendar, ShieldCheck, X, FileText } from 'lucide-react';
import { getCustomers, getCustomerEnquiries } from '../../firebase/firestore';
import { formatDate } from '../../utils/formatters';
import { useSEO } from '../../utils/seo';

export const AdminCustomers = () => {
  useSEO({
    title: 'Customer Directory | Bharath Enterprises Admin',
  });

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerEnquiries, setCustomerEnquiries] = useState([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  useEffect(() => {
    getCustomers()
      .then(setCustomers)
      .finally(() => setLoading(false));
  }, []);

  const handleInspectCustomer = async (cust) => {
    setSelectedCustomer(cust);
    setLoadingEnquiries(true);
    try {
      const enqs = await getCustomerEnquiries(cust.uid, cust.email);
      setCustomerEnquiries(enqs);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const filtered = customers.filter((c) => {
    const term = search.toLowerCase();
    return (
      !term ||
      c.fullName?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.phone?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider block">
            Client Base
          </span>
          <h1 className="text-2xl font-bold text-primary font-sans mt-0.5">
            Registered Customers ({customers.length})
          </h1>
          <p className="text-xs text-slate-500">
            Accounts created for commercial quotation requests and ongoing business engagement.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, email or phone..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400">Loading customer profiles...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">No matching customer records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Registered Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((c) => (
                  <tr key={c.uid || c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                          {c.fullName?.charAt(0) || 'C'}
                        </div>
                        <span className="font-bold text-slate-800">{c.fullName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">{c.email}</td>
                    <td className="py-3 px-4 text-slate-700">{c.phone || 'N/A'}</td>
                    <td className="py-3 px-4 text-slate-500">{formatDate(c.createdAt)}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                        {c.accountStatus || 'Active'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleInspectCustomer(c)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-primary font-semibold text-xs rounded transition-colors"
                      >
                        Enquiries History &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Customer Enquiry History Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-xl max-w-xl w-full p-6 text-left border border-slate-200 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                {selectedCustomer.fullName?.charAt(0) || 'C'}
              </div>
              <div>
                <h3 className="text-base font-bold text-primary">{selectedCustomer.fullName}</h3>
                <p className="text-xs text-slate-500 font-mono">{selectedCustomer.email} • {selectedCustomer.phone}</p>
              </div>
            </div>

            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-100 pb-2">
              Submitted Enquiry History
            </h4>

            {loadingEnquiries ? (
              <p className="text-xs text-slate-400 py-6 text-center">Loading customer enquiries...</p>
            ) : customerEnquiries.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">This customer has not submitted any inquiries yet.</p>
            ) : (
              <div className="space-y-3">
                {customerEnquiries.map((enq) => (
                  <div key={enq.enquiryId || enq.id} className="p-3 bg-surface rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-primary">{enq.enquiryId || enq.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {enq.status}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800">{enq.productName || enq.productOrService || enq.enquiryType}</p>
                    <p className="text-slate-500 text-[11px] mt-1">{enq.message}</p>
                    <span className="text-[10px] text-slate-400 mt-2 block">{formatDate(enq.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
