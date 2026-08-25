import React, { useState, useEffect } from 'react';
import { useUserProfile, DEFAULT_PROFILE } from '../context/UserProfileContext';
import { LocationAutocomplete } from './LocationAutocomplete';
import { X, User, Sparkles, CheckCircle2, RefreshCw, Calendar, Clock, MapPin, Trash2, ShieldCheck, Hash, Compass, ArrowRight, LogIn, LogOut, Cloud } from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const { 
    profile, 
    hasCustomProfile, 
    isProfileModalOpen, 
    closeProfileModal, 
    saveProfile, 
    clearProfile,
    currentUser,
    signInWithGoogle,
    signOutUser,
    isAuthenticating 
  } = useUserProfile();

  const [formData, setFormData] = useState(profile);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync internal state with context profile whenever modal opens or profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile, isProfileModalOpen]);

  if (!isProfileModalOpen) return null;

  // Helper to compute quick numeric vibrations from date of birth
  const computeNumerology = (dobString: string) => {
    if (!dobString) return { moolank: 1, bhagyank: 1 };
    const parts = dobString.split('-');
    if (parts.length < 3) return { moolank: 1, bhagyank: 1 };
    const day = parseInt(parts[2], 10) || 1;
    const month = parseInt(parts[1], 10) || 1;
    const year = parseInt(parts[0], 10) || 1995;

    const reduceNum = (n: number) => {
      let sum = n;
      while (sum > 9) {
        sum = sum.toString().split('').reduce((a, b) => a + parseInt(b, 10), 0);
      }
      return sum;
    };

    return {
      moolank: reduceNum(day),
      bhagyank: reduceNum(day + month + year)
    };
  };

  const getSunSign = (dobString: string) => {
    if (!dobString) return 'Cancer (कर्क)';
    const parts = dobString.split('-');
    let m = 7;
    let d = 15;
    if (parts.length >= 3) {
      m = parseInt(parts[1], 10) || 7;
      d = parseInt(parts[2], 10) || 15;
    }

    if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return 'Aries (मेष)';
    if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return 'Taurus (वृषभ)';
    if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return 'Gemini (मिथुन)';
    if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return 'Cancer (कर्क)';
    if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return 'Leo (सिंह)';
    if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return 'Virgo (कन्या)';
    if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return 'Libra (तुला)';
    if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return 'Scorpio (वृश्चिक)';
    if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return 'Sagittarius (धनु)';
    if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return 'Capricorn (मकर)';
    if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return 'Aquarius (कुंभ)';
    return 'Pisces (मीन)';
  };

  const { moolank, bhagyank } = computeNumerology(formData.dob);
  const sunSign = getSunSign(formData.dob);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      closeProfileModal();
    }, 1200);
  };

  const handleResetToDemo = () => {
    setFormData(DEFAULT_PROFILE);
    saveProfile(DEFAULT_PROFILE);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 1500);
  };

  const handleClear = () => {
    clearProfile();
    setFormData({
      fullName: '',
      dob: '',
      tob: '',
      pob: '',
      gender: 'male',
      phone: '',
      email: '',
      gotra: ''
    });
    setSaveSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FFF9F2]/95 backdrop-blur-2xl text-[#7C2D12] rounded-3xl border border-orange-200/90 max-w-2xl w-full p-6 sm:p-8 shadow-2xl shadow-orange-950/20 relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={closeProfileModal}
          className="absolute top-4 right-4 p-2 rounded-full text-[#9A3412] hover:text-[#7C2D12] hover:bg-orange-100 transition-colors cursor-pointer"
          aria-label="Close Profile Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-orange-50 px-3.5 py-1 rounded-full text-[11px] font-medium text-[#C2410C] tracking-[0.2em] uppercase shadow-sm">
              <User className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Vedic Seeker Profile &bull; जातक प्रोफ़ाइल</span>
            </div>

            {/* Cloud Auth Status Pill */}
            {currentUser ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs">
                <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate max-w-[140px] font-medium">{currentUser.email || 'Cloud Synced'}</span>
                <button
                  type="button"
                  onClick={signOutUser}
                  title="Sign Out"
                  className="text-emerald-700 hover:text-emerald-900 ml-1 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={signInWithGoogle}
                disabled={isAuthenticating}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 hover:bg-orange-200 border border-orange-300 text-[#7C2D12] text-xs transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#F97316]" />
                <span>{isAuthenticating ? 'Signing in...' : 'Sign in with Google'}</span>
              </button>
            )}
          </div>

          <h3 className="font-playfair text-2xl font-normal text-[#7C2D12]">
            Personal Birth Details & Cloud Sync
          </h3>
          <p className="text-xs text-[#9A3412] font-light mt-1">
            Store your birth credentials securely. All planetary tools (Janam Kundli, Numerology Lo Shu grid, Consultation Desk) automatically synchronize in the cloud.
          </p>
        </div>

        {/* Dynamic Real-time Calculation Badge Ribbon */}
        {formData.dob && (
          <div className="grid grid-cols-3 gap-2.5 mb-6 p-3.5 rounded-xl bg-orange-50/70 border border-orange-200">
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-widest text-[#9A3412] block mb-0.5 font-medium">Sun Sign (सूर्य)</span>
              <span className="font-playfair text-xs sm:text-sm text-[#F97316] font-semibold">{sunSign}</span>
            </div>
            <div className="text-center border-x border-orange-200">
              <span className="text-[9px] uppercase tracking-widest text-[#9A3412] block mb-0.5 font-medium">Driver (मूलांक)</span>
              <span className="font-playfair text-xs sm:text-sm text-[#7C2D12] font-semibold">Number {moolank}</span>
            </div>
            <div className="text-center">
              <span className="text-[9px] uppercase tracking-widest text-[#9A3412] block mb-0.5 font-medium">Destiny (भाग्यांक)</span>
              <span className="font-playfair text-xs sm:text-sm text-[#F97316] font-semibold">Number {bhagyank}</span>
            </div>
          </div>
        )}

        {/* Success Banner */}
        {saveSuccess && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <span>
              <strong>Profile Saved!</strong> Your birth credentials have been saved to local storage and synchronized across all tools.
            </span>
          </div>
        )}

        {/* Profile Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7C2D12] mb-1.5">
                Full Name / जातक का नाम *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Vikram Sharma"
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3.5 py-2.5 text-sm text-[#7C2D12] placeholder-orange-900/40 focus:outline-none focus:border-[#F97316] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7C2D12] mb-1.5">
                Gender
              </label>
              <select
                value={formData.gender || 'male'}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2.5 text-sm text-[#7C2D12] focus:outline-none focus:border-[#F97316]"
              >
                <option value="male">Male (पुरुष)</option>
                <option value="female">Female (स्त्री)</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Date & Time of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7C2D12] mb-1.5">
                Date of Birth (जन्म तिथि) *
              </label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2.5 text-sm text-[#7C2D12] focus:outline-none focus:border-[#F97316]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7C2D12] mb-1.5">
                Time of Birth (जन्म समय) *
              </label>
              <input
                type="time"
                required
                value={formData.tob}
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3 py-2.5 text-sm text-[#7C2D12] focus:outline-none focus:border-[#F97316]"
              />
            </div>
          </div>

          {/* Place of Birth & Gotra */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <LocationAutocomplete
                id="user-profile-pob"
                value={formData.pob}
                onChange={(val, loc) => {
                  setFormData(prev => ({
                    ...prev,
                    pob: val,
                    lat: loc ? loc.lat : prev.lat,
                    lng: loc ? loc.lng : prev.lng,
                    timezone: loc ? loc.timezone : prev.timezone
                  }));
                }}
                onSelectLocation={(loc) => {
                  setFormData(prev => ({
                    ...prev,
                    lat: loc.lat,
                    lng: loc.lng,
                    timezone: loc.timezone
                  }));
                }}
                label="Place of Birth (जन्म स्थान)"
                required
                showCoordinatesBadge={true}
                placeholder="Search city of birth..."
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7C2D12] mb-1.5">
                Gotra / गोत्र (Optional)
              </label>
              <input
                type="text"
                value={formData.gotra || ''}
                onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                placeholder="e.g. Kashyap, Vashistha"
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3.5 py-2.5 text-sm text-[#7C2D12] placeholder-orange-900/40 focus:outline-none focus:border-[#F97316]"
              />
            </div>
          </div>

          {/* Optional Contact Fields for Consultation Autofill */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7C2D12] mb-1.5">
                WhatsApp Phone (For Instant Booking Auto-fill)
              </label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98100 XXXXX"
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3.5 py-2.5 text-sm text-[#7C2D12] placeholder-orange-900/40 focus:outline-none focus:border-[#F97316]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#7C2D12] mb-1.5">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="yourname@gmail.com"
                className="w-full bg-orange-50/40 border border-orange-200 rounded-xl px-3.5 py-2.5 text-sm text-[#7C2D12] placeholder-orange-900/40 focus:outline-none focus:border-[#F97316]"
              />
            </div>
          </div>

          {/* Privacy & Auto-sync Note */}
          <div className="flex items-start gap-2 text-[11px] text-[#9A3412] bg-orange-50/70 p-3 rounded-xl border border-orange-200 font-light">
            <ShieldCheck className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
            <span>
              <strong className="text-[#7C2D12]">100% Client-Side Privacy:</strong> Your birth credentials remain strictly inside your browser's local storage. You can edit or clear them at any time.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleResetToDemo}
                className="text-xs text-[#9A3412] hover:text-[#7C2D12] px-3 py-2 rounded-lg hover:bg-orange-100 bg-orange-50 border border-orange-200 transition-colors cursor-pointer"
              >
                Sample Profile
              </button>
              {hasCustomProfile && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-100 bg-red-50 border border-red-200 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={closeProfileModal}
                className="px-4 py-2.5 rounded-xl border border-orange-200 text-xs text-[#9A3412] hover:text-[#7C2D12] hover:bg-orange-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Save & Sync All Tools</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
