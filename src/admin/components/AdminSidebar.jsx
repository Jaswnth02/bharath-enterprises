import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Wrench,
  MessageSquare,
  Briefcase,
  Image as ImageIcon,
  Users,
  FileEdit,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';

export const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const { logout } = useAuth();
  const { settings } = useSite();
  const navigate = useNavigate();

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/categories', icon: Layers, label: 'Categories' },
    { to: '/admin/services', icon: Wrench, label: 'Services' },
    { to: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
    { to: '/admin/projects', icon: Briefcase, label: 'Projects' },
    { to: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
    { to: '/admin/customers', icon: Users, label: 'Customers' },
    { to: '/admin/content', icon: FileEdit, label: 'Website Content' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-primary text-slate-300 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-primary-light">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 p-0.5 rounded-lg bg-white flex items-center justify-center shrink-0">
                <img
                  src={settings.logo || '/logo.png'}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-sm font-bold text-white block leading-tight">
                  BHARATH
                </span>
                <span className="text-[9px] font-semibold tracking-wider text-accent uppercase block">
                  Admin Console
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin/dashboard'}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-colors ${
                      isActive
                        ? 'bg-accent text-primary font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-primary-light'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-primary-light space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-primary-light transition-colors"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
};

