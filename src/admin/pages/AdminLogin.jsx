import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSite } from '../../context/SiteContext';
import { useSEO } from '../../utils/seo';

export const AdminLogin = () => {
  const { login, user, isAdmin } = useAuth();
  const { settings } = useSite();
  const navigate = useNavigate();
  const location = useLocation();

  useSEO({
    title: 'Admin Authentication | Bharath Enterprises',
  });

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const [email, setEmail] = useState('admin@bharathenterprises.com');
  const [password, setPassword] = useState('Admin@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide administrative credentials.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const logged = await login(email, password);
      if (logged.role !== 'admin') {
        setError('Access denied: Account does not possess administrative privileges.');
        return;
      }
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid administrative credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1E35] p-4 text-slate-100">
      <div className="max-w-md w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-white rounded-xl p-1.5 mx-auto mb-3 shadow-md border border-slate-700">
            <img
              src={settings.logo || '/logo.png'}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest block">
            Administrative Gate
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            Bharath Enterprises Console
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Secure administrative control portal for products, enquiries and site settings.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="admin@bharathenterprises.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/80 text-[11px] text-slate-400">
            <span className="font-semibold text-accent block mb-0.5">Development Admin Credentials:</span>
            <span>User: <strong className="text-white">admin@bharathenterprises.com</strong> | Pass: <strong className="text-white">Admin@2025</strong></span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-accent hover:bg-accent-hover disabled:opacity-60 text-primary font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating Console...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Access Management Console</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-4 text-center text-[11px] text-slate-500 border-t border-slate-700 mt-6">
          <Link to="/" className="text-slate-400 hover:text-white transition-colors">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

