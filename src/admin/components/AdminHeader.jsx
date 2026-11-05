import React from 'react';
import { Menu, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminHeader = ({ setMobileOpen }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 text-slate-600 hover:text-primary focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <span className="text-xs font-bold text-primary font-sans">
            Bharath Enterprises Enterprise Management System
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400 ml-2">
            Coimbatore, Tamil Nadu
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
            {user?.fullName?.charAt(0) || 'A'}
          </div>
          <div className="hidden sm:block text-left text-xs">
            <span className="font-semibold text-slate-800 block leading-tight">
              {user?.fullName || 'Administrator'}
            </span>
            <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">
              Super Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
