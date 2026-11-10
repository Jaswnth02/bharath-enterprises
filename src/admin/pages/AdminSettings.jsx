import React, { useState } from 'react';
import { ShieldCheck, Key, Globe, Database, Server, Info, RefreshCw, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';
import { isFirebaseConfigured } from '../../firebase/config';
import { seedCloudFirestore } from '../../firebase/firestore';
import { useSEO } from '../../utils/seo';

export const AdminSettings = () => {
  useSEO({
    title: 'Admin Settings | Bharath Enterprises',
  });

  const { user } = useAuth();
  const { settings, refreshSettings } = useSite();
  const [seeding, setSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState(null);
  const [seedError, setSeedError] = useState(null);

  const handleSeedDatabase = async () => {
    if (!window.confirm('Populate Cloud Firestore with the complete Bharath Enterprises business catalogue, services, and corporate settings?')) {
      return;
    }
    setSeeding(true);
    setSeedError(null);
    setSeedStatus('Starting Firestore sync...');

    try {
      const res = await seedCloudFirestore((msg) => setSeedStatus(msg));
      setSeedStatus(`Successfully populated Cloud Firestore: ${res.services} services, ${res.categories} categories, ${res.products} products, ${res.projects} projects, ${res.gallery} gallery items, and corporate website settings!`);
      if (refreshSettings) refreshSettings();
    } catch (err) {
      console.error('Seeding error:', err);
      setSeedError(err.message || 'Failed to populate database.');
      setSeedStatus(null);
    } finally {
      setSeeding(false);
    }
  };

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

      {/* Cloud Firestore Database Sync Banner */}
      <div className="bg-linear-to-r from-primary to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cloud Firestore Database Manager</span>
            </div>
            <h2 className="text-lg font-bold">Populate Live Firebase Database</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sync all official poster data (5 core services, 10 industry classifications, business development catalogue, and global footprint) directly to your live Firestore cloud collections.
            </p>
            {seedStatus && (
              <div className="mt-3 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{seedStatus}</span>
              </div>
            )}
            {seedError && (
              <div className="mt-3 p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{seedError}</span>
              </div>
            )}
          </div>
          <button
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="self-start md:self-center px-5 py-3 rounded-xl bg-accent hover:bg-amber-500 text-primary font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
            <span>{seeding ? 'Syncing to Firestore...' : 'Sync Data to Firestore'}</span>
          </button>
        </div>
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

