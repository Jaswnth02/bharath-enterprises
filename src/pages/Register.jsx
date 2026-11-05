import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import { useSEO } from '../utils/seo';
import { isValidEmail, isValidPhone, isValidPassword } from '../utils/validators';

export const Register = () => {
  const { t } = useTranslation();
  const { register, user } = useAuth();
  const { settings } = useSite();
  const navigate = useNavigate();

  useSEO({
    title: 'Customer Registration | Bharath Enterprises',
    description: 'Create an official Bharath Enterprises customer account to track trade enquiries and manage quotation requests.',
  });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (user) {
      navigate('/customer-dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
      setError('Please provide a valid contact phone number.');
      return;
    }
    if (!isValidPassword(formData.password)) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify both fields.');
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
      navigate('/customer-dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass-white-elevated rounded-3xl p-8 sm:p-10 border border-white/95 shadow-2xl space-y-6">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 p-1 rounded-xl bg-white/80 shadow-xs border border-white/80">
              <img
                src={settings.logo || '/logo-mark.svg'}
                alt="Bharath Enterprises"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-bold text-primary font-sans">
              BHARATH ENTERPRISES
            </span>
          </Link>
          <h2 className="text-xl font-bold text-primary font-sans">
            {t('auth.registerTitle')}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Create a direct customer account for formal quotes and inquiry history.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50/90 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('auth.fullNameLabel')} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full pl-10 pr-3 py-2 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs"
                placeholder="e.g. Senthil Kumar"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('auth.emailLabel')} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-3 py-2 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs"
                placeholder="senthil@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t('auth.phoneLabel')} <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-3 py-2 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs"
                placeholder="+91 98421 23456"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('auth.passwordLabel')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs"
                  placeholder="Min 6 chars"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t('auth.confirmPasswordLabel')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-8 py-2 text-xs bg-white/70 backdrop-blur-xs border border-white/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-2xs"
                  placeholder="Repeat pass"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-light disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering Profile...</span>
                </>
              ) : (
                <>
                  <span>{t('auth.registerButton')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-200/60">
          <p>
            {t('auth.haveAccount')}{' '}
            <Link to="/login" className="font-bold text-primary hover:text-accent">
              {t('auth.signInButton')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
