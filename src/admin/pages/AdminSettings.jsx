import React from 'react';
import { ShieldCheck, Key, Globe, Database, Server, Info } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';
import { isFirebaseConfigured } from '../../firebase/config';
import { useSEO } from '../../utils/seo';

export const AdminSettings = () => {
  useSEO({
    title: 'Admin Settings | Bharath Enterprises',
  });

  const { user } = useAuth();
  const { settings } = useSite();

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold text-accent uppercase tracking-wider block">
          Configuration & Security
        </span>
        <h1 className="text-2xl font-bold text-primary font-sans mt-0.5">
          System Settings & Deployment Guide
        </h1>
        <p className="text-xs text-slate-500">
          Environment status, security provisioning protocols, and multilingual configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Firebase Environment Status */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Database className="w-5 h-5 text-accent" />
            <h3 className="text-sm font-bold text-primary">Firebase Integration Status</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-slate-200">
              <span className="text-slate-600 font-medium">Connection Mode:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                isFirebaseConfigured
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {isFirebaseConfigured ? 'Live Firebase Cloud' : 'Resilient Client Mock Engine'}
              </span>
            </div>

            <p className="text-slate-500 leading-relaxed text-[11px]">
              When live credentials are provided in <code className="bg-slate-100 px-1 py-0.5 rounded">.env</code> (such as <code className="bg-slate-100 px-1 py-0.5 rounded">VITE_FIREBASE_API_KEY</code>), the application securely routes to Cloud Firestore, Firebase Auth, and Storage.
            </p>
          </div>
        </div>

        {/* Admin Account Security */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-accent" />
            <h3 className="text-sm font-bold text-primary">Active Administrator Session</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-surface rounded-lg border border-slate-200 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Authenticated As:</span>
                <span className="font-bold text-slate-800">{user?.fullName || 'Super Administrator'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <span className="font-mono text-slate-800">{user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Role:</span>
                <span className="font-bold text-emerald-600 uppercase">admin</span>
              </div>
            </div>

            <p className="text-slate-500 text-[11px] leading-relaxed">
              Administrative permissions are strictly verified at the database security level in <code className="bg-slate-100 px-1 py-0.5 rounded">firestore.rules</code>. Customers can never elevate their own role.
            </p>
          </div>
        </div>

        {/* Internationalization Settings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Globe className="w-5 h-5 text-accent" />
            <h3 className="text-sm font-bold text-primary">Multi-Language Support (i18n)</h3>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <p className="text-[11px] leading-relaxed">
              The website supports 3 distinct localized interfaces with instant switching and state preservation:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700">
              <li><strong>English (Default)</strong> — Primary commercial interface.</li>
              <li><strong>தமிழ் (Tamil)</strong> — Tailored for Tamil Nadu & Coimbatore industrial clients.</li>
              <li><strong>हिन्दी (Hindi)</strong> — Structured for national trade partners and North Indian commercial distribution.</li>
            </ul>
          </div>
        </div>

        {/* Secure Admin Provisioning Protocol */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Key className="w-5 h-5 text-accent" />
            <h3 className="text-sm font-bold text-primary">Initial Admin Provisioning Procedure</h3>
          </div>

          <div className="space-y-2 text-xs text-slate-600 leading-relaxed text-[11px]">
            <p className="font-semibold text-slate-800">
              To provision an official production administrator on Firebase:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-slate-600">
              <li>Create the user account in Firebase Authentication console.</li>
              <li>In Cloud Firestore, navigate to the <code className="bg-slate-100 px-1 py-0.5 rounded">users</code> collection.</li>
              <li>Create or edit the document matching the UID with field <code className="bg-slate-100 px-1 py-0.5 rounded">role: "admin"</code>.</li>
              <li>Alternatively, set the custom claim <code className="bg-slate-100 px-1 py-0.5 rounded">role: 'admin'</code> via Firebase Admin SDK.</li>
            </ol>
            <p className="text-slate-400 italic mt-2">
              Note: Public registration forms are permanently constrained to assigning role "customer" only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

