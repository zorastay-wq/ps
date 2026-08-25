import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BrandLogo } from '../BrandLogo';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  KeyRound, 
  UserCheck, 
  AlertCircle,
  ArrowLeft,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface AdminLoginGatewayProps {
  onBackToWebsite?: () => void;
  onLoginSuccess?: () => void;
}

export const AdminLoginGateway: React.FC<AdminLoginGatewayProps> = ({
  onBackToWebsite,
  onLoginSuccess
}) => {
  const { login, isLoading } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both administrator email and password.');
      return;
    }

    try {
      const ok = await login(email, password);
      if (ok && onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid administrator credentials. Please check and try again.');
    }
  };

  const handleFillDemo = (type: 'superadmin' | 'manager') => {
    if (type === 'superadmin') {
      setEmail('admin@preetisehgal.com');
      setPassword('Vedic@2026');
    } else {
      setEmail('manager@preetisehgal.com');
      setPassword('VedicClinic@2026');
    }
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A0E07] via-[#431407] to-[#1C0803] text-white flex flex-col justify-between relative overflow-hidden font-sans select-none">
      {/* Background Sacred Geometric Mandala Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg viewBox="0 0 800 800" className="w-full h-full text-orange-400" fill="none" stroke="currentColor">
          <circle cx="400" cy="400" r="350" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="400" cy="400" r="280" strokeWidth="1.2" />
          <polygon points="400,80 720,400 400,720 80,400" strokeWidth="1.5" />
          <polygon points="400,160 640,400 400,640 160,400" strokeWidth="1.2" />
          <circle cx="400" cy="400" r="100" strokeWidth="2" />
        </svg>
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 p-4 sm:p-6 flex items-center justify-between border-b border-orange-500/20 backdrop-blur-md">
        <BrandLogo variant="light" size="sm" />
        {onBackToWebsite && (
          <button
            type="button"
            onClick={onBackToWebsite}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-orange-200 hover:text-white bg-white/5 hover:bg-white/10 border border-orange-400/20 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Visualizer</span>
          </button>
        )}
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md bg-[#3B1207]/90 backdrop-blur-2xl border-2 border-orange-400/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-6"
        >
          {/* Header Badge & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-[#EA580C] to-[#F97316] text-white shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-200" />
              <span>Admin Portal &bull; Restricted Gateway</span>
            </div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Astrologer Chamber Login
            </h1>
            <p className="text-xs text-orange-200/80 font-normal">
              Secure authentication for Dr. Preeti Sehgal & clinic management staff.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-xs text-red-200 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-snug">{errorMessage}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-orange-200">
                Administrator Email / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-300/70">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@preetisehgal.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-orange-400/30 focus:border-[#F97316] focus:ring-2 focus:ring-orange-500/20 rounded-xl text-sm text-white placeholder-stone-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-orange-200">
                  Secure Password
                </label>
                <span className="text-[10px] text-orange-300/60 font-mono">Vedic Auth 2.0</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-300/70">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-black/40 border border-orange-400/30 focus:border-[#F97316] focus:ring-2 focus:ring-orange-500/20 rounded-xl text-sm text-white placeholder-stone-500 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-orange-300/70 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#EA580C] hover:brightness-110 text-white shadow-lg shadow-orange-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-amber-200" />
                  <span>Authenticate & Enter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Buttons (Development Phase) */}
          <div className="pt-4 border-t border-orange-500/20 space-y-2.5 text-left">
            <div className="flex items-center justify-between text-[11px] text-orange-200/90 font-medium">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Quick Demo Role Fillers:
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('superadmin')}
                className="p-2.5 rounded-xl bg-orange-950/60 hover:bg-orange-900/60 border border-orange-400/30 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[10px] text-amber-300 font-bold uppercase">
                  <span>Dr. Preeti Sehgal</span>
                  <UserCheck className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="text-[10px] text-orange-200/80 truncate">Superadmin</div>
              </button>

              <button
                type="button"
                onClick={() => handleFillDemo('manager')}
                className="p-2.5 rounded-xl bg-orange-950/60 hover:bg-orange-900/60 border border-orange-400/30 text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[10px] text-orange-200 font-bold uppercase">
                  <span>Rajesh Sharma</span>
                  <UserCheck className="w-3 h-3 text-amber-300" />
                </div>
                <div className="text-[10px] text-orange-200/80 truncate">Clinic Manager</div>
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="relative z-10 p-4 text-center text-[11px] text-orange-300/60 border-t border-orange-500/20 backdrop-blur-md">
        <span>Dr. Preeti Sehgal Astro & Vastu Research Centre &bull; Confidential & Proprietary Vedic CMS Portal</span>
      </footer>
    </div>
  );
};
