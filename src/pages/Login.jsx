import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import { useSEO } from '../utils/seo';

export const Login = () => {
  const { t } = useTranslation();
  const { login, user } = useAuth();
  const { settings } = useSite();
  const navigate = useNavigate();
  const location = useLocation();

  useSEO({
    title: 'Customer Sign In | Bharath Enterprises',
    description: 'Sign in to Bharath Enterprises customer portal to track product quotes and submitted enquiries.',
  });

  const from = location.state?.from?.pathname || '/customer-dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  React.useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const loggedUser = await login(email, password);
      if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate(from);
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Please enter your email address to receive password reset instructions.');
      return;
    }
    setForgotSent(true);
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-white-elevated rounded-3xl p-5 sm:p-8 md:p-10 border border-white/95 shadow-2xl space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-12 h-12 p-1 rounded-xl bg-white shadow-xs border border-white/80">
              <img
                src={settings.logo || '/logo.png'}
                alt="Bharath Enterprises"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-bold text-primary font-sans">
              BHARATH ENTERPRISES
            </span>
          </Link>
          <h2 className="text-xl font-bold text-primary font-sans">
            {t('auth.loginTitle')}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {t('auth.customerPortalDesc')}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50/90 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {forgotSent && (
          <div className="p-3 bg-emerald-50/90 border border-emerald-200 text-emerald-700 text-xs rounded-xl">
            Password reset link dispatched to {email}. Please inspect your inbox.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('auth.emailLabel')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                {t('auth.passwordLabel')}
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] font-semibold text-accent hover:underline"
              >
                {t('auth.forgotPassword')}
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-primary hover:bg-primary-light disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>{t('auth.signInButton')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-200/60">
          <p className="text-[11px]">
            Looking for administration?{' '}
            <Link to="/admin/login" className="text-slate-700 hover:underline">
              Admin Login &rarr;
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
