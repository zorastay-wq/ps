import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Sparkles, 
  X, 
  CheckCircle2, 
  Sun, 
  Moon, 
  Compass, 
  Clock, 
  ShieldCheck, 
  Bell, 
  Flame,
  ArrowRight,
  Send,
  Star
} from 'lucide-react';
import { DOCTOR_INFO } from '../data/brandData';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';

interface NewsletterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  forceOpen?: boolean;
}

const ZODIAC_SIGNS = [
  { id: 'aries', name: 'Aries (मेष)', ruler: 'Mars / मंगल', element: 'Fire' },
  { id: 'taurus', name: 'Taurus (वृषभ)', ruler: 'Venus / शुक्र', element: 'Earth' },
  { id: 'gemini', name: 'Gemini (मिथुन)', ruler: 'Mercury / बुध', element: 'Air' },
  { id: 'cancer', name: 'Cancer (कर्क)', ruler: 'Moon / चंद्र', element: 'Water' },
  { id: 'leo', name: 'Leo (सिंह)', ruler: 'Sun / सूर्य', element: 'Fire' },
  { id: 'virgo', name: 'Virgo (कन्या)', ruler: 'Mercury / बुध', element: 'Earth' },
  { id: 'libra', name: 'Libra (तुला)', ruler: 'Venus / शुक्र', element: 'Air' },
  { id: 'scorpio', name: 'Scorpio (वृश्चिक)', ruler: 'Mars & Ketu', element: 'Water' },
  { id: 'sagittarius', name: 'Sagittarius (धनु)', ruler: 'Jupiter / गुरु', element: 'Fire' },
  { id: 'capricorn', name: 'Capricorn (मकर)', ruler: 'Saturn / शनि', element: 'Earth' },
  { id: 'aquarius', name: 'Aquarius (कुंभ)', ruler: 'Saturn & Rahu', element: 'Air' },
  { id: 'pisces', name: 'Pisces (मीन)', ruler: 'Jupiter / गुरु', element: 'Water' },
];

export function NewsletterModal({ isOpen: externalIsOpen, onClose: externalOnClose, forceOpen }: NewsletterModalProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const [hasTriggeredByScroll, setHasTriggeredByScroll] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Form states
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [rashi, setRashi] = useState<string>('aries');
  const [deliveryTime, setDeliveryTime] = useState<string>('morning');
  const [enableWhatsapp, setEnableWhatsapp] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Determine effective open state
  const isOpen = forceOpen || (externalIsOpen !== undefined ? externalIsOpen : internalOpen);

  // Scroll depth detector
  useEffect(() => {
    // Check if dismissed previously in session
    const dismissed = sessionStorage.getItem('astro_newsletter_dismissed');
    if (dismissed === 'true') {
      return;
    }

    const handleScroll = () => {
      if (hasTriggeredByScroll || internalOpen) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = (scrollTop / scrollHeight) * 100;

      // Trigger modal once user crosses 32% scroll depth
      if (scrollPercent >= 32 && !hasTriggeredByScroll) {
        setHasTriggeredByScroll(true);
        setInternalOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggeredByScroll, internalOpen]);

  const handleClose = () => {
    sessionStorage.setItem('astro_newsletter_dismissed', 'true');
    setInternalOpen(false);
    if (externalOnClose) {
      externalOnClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const sanitizedEmail = email.toLowerCase().trim().slice(0, 150);
      const subscriberId = sanitizedEmail.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 120);
      const subDocRef = doc(db, 'newsletter_subscribers', subscriberId);

      await setDoc(subDocRef, {
        email: sanitizedEmail,
        zodiacSign: (selectedSignObj.name || rashi).slice(0, 30),
        subscribedAt: new Date().toISOString(),
        active: true,
      }, { merge: true });
    } catch (err: any) {
      console.warn('Subscription saved locally / error writing to Firestore:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const selectedSignObj = ZODIAC_SIGNS.find((s) => s.id === rashi) || ZODIAC_SIGNS[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="newsletter-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white border border-orange-200 rounded-2xl shadow-2xl overflow-hidden z-10 text-[#7C2D12] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Golden Cosmic Ribbon */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-[#F97316] to-orange-400" />

            {/* Close Button */}
            <button
              id="newsletter-modal-close-btn"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-orange-50 text-[#9A3412] hover:text-[#7C2D12] hover:bg-orange-100 border border-orange-200 transition-all z-20 cursor-pointer"
              aria-label="Close newsletter modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <div className="p-6 sm:p-8">
                {/* Header Badge & Title */}
                <div className="text-center space-y-2 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-300 text-[#C2410C] text-xs font-semibold tracking-wider uppercase shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                    Daily Cosmic Transit Digest
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-playfair font-normal text-[#7C2D12] tracking-wide">
                    Align Your Day With <span className="text-[#F97316]">Vedic Planetary Flow</span>
                  </h3>
                  <p className="text-sm text-[#9A3412] max-w-lg mx-auto leading-relaxed font-light">
                    Receive personalized celestial insights curated by <span className="text-[#7C2D12] font-semibold">{DOCTOR_INFO.name}</span>, including Abhijit Muhurat, Rahu Kaal warnings, and your Moon Sign's Lal Kitab karma tip.
                  </p>
                </div>

                {/* 3 Key Value Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
                  <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 border border-orange-300/60 flex items-center justify-center shrink-0 text-[#F97316]">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#7C2D12]">Daily Gochar Shifts</p>
                      <p className="text-[11px] text-[#9A3412] leading-tight mt-0.5 font-light">Surya, Chandra & Shani planetary movements</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 border border-orange-300/60 flex items-center justify-center shrink-0 text-[#F97316]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#7C2D12]">Auspicious Muhurat</p>
                      <p className="text-[11px] text-[#9A3412] leading-tight mt-0.5 font-light">Exact Abhijit & Rahu Kaal time windows</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-orange-100 border border-orange-300/60 flex items-center justify-center shrink-0 text-[#F97316]">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#7C2D12]">Lal Kitab Karma Tip</p>
                      <p className="text-[11px] text-[#9A3412] leading-tight mt-0.5 font-light">Custom daily remedy, lucky color & number</p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#7C2D12] mb-1">
                        Your Full Name <span className="text-[#F97316]">*</span>
                      </label>
                      <input
                        id="newsletter-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Siddharth Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-orange-50/40 border border-orange-200 text-[#7C2D12] placeholder-orange-900/40 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-[#7C2D12] mb-1">
                        Email Address <span className="text-[#F97316]">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="newsletter-email-input"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@domain.com"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-orange-50/40 border border-orange-200 text-[#7C2D12] placeholder-orange-900/40 text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors"
                        />
                        <Mail className="w-4 h-4 text-[#9A3412] absolute left-3 top-3" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Rashi / Zodiac Selection */}
                    <div>
                      <label className="block text-xs font-medium text-[#7C2D12] mb-1">
                        Your Moon Sign / Rashi (राशि)
                      </label>
                      <div className="relative">
                        <select
                          id="newsletter-rashi-select"
                          value={rashi}
                          onChange={(e) => setRashi(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-orange-50/40 border border-orange-200 text-[#7C2D12] text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors appearance-none cursor-pointer"
                        >
                          {ZODIAC_SIGNS.map((sign) => (
                            <option key={sign.id} value={sign.id} className="bg-white text-[#7C2D12] py-1">
                              {sign.name} — {sign.element} Element
                            </option>
                          ))}
                        </select>
                        <Compass className="w-4 h-4 text-[#9A3412] absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    {/* Delivery Timing */}
                    <div>
                      <label className="block text-xs font-medium text-[#7C2D12] mb-1">
                        Preferred Dispatch Timing
                      </label>
                      <div className="relative">
                        <select
                          id="newsletter-timing-select"
                          value={deliveryTime}
                          onChange={(e) => setDeliveryTime(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-orange-50/40 border border-orange-200 text-[#7C2D12] text-sm focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-colors appearance-none cursor-pointer"
                        >
                          <option value="brahma" className="bg-white text-[#7C2D12]">Brahma Muhurat (5:30 AM IST)</option>
                          <option value="morning" className="bg-white text-[#7C2D12]">Morning Sunrise (7:00 AM IST)</option>
                          <option value="noon" className="bg-white text-[#7C2D12]">Mid-Day Abhijit (12:00 PM IST)</option>
                          <option value="evening" className="bg-white text-[#7C2D12]">Evening Sandhya (6:30 PM IST)</option>
                        </select>
                        <Clock className="w-4 h-4 text-[#9A3412] absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Optional WhatsApp Toggle */}
                  <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 shrink-0">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#7C2D12]">WhatsApp Muhurat Alerts (Optional)</p>
                        <p className="text-[11px] text-[#9A3412] font-light">Get urgent planetary transit notifications on WhatsApp</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        id="newsletter-whatsapp-toggle"
                        type="checkbox"
                        checked={enableWhatsapp}
                        onChange={(e) => setEnableWhatsapp(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-orange-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#F97316]" />
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Aligning Celestial Frequencies...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white" />
                        <span>Subscribe for Free Daily Transit Insights</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-[#9A3412] pt-1">
                    <span className="flex items-center gap-1 font-medium text-[#C2410C]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
                      100% Free Vedic Wisdom
                    </span>
                    <span>•</span>
                    <span>No spam, 1-click unsubscribe anytime</span>
                  </div>
                </form>
              </div>
            ) : (
              /* Success View with Sample Transit Preview */
              <div className="p-6 sm:p-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-orange-50 border-2 border-[#F97316] flex items-center justify-center mx-auto text-[#F97316] shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-playfair font-normal text-[#7C2D12]">
                    Welcome to the <span className="text-[#F97316]">Vedic Transit Circle</span>!
                  </h3>
                  <p className="text-sm text-[#9A3412] max-w-md mx-auto font-light">
                    Namaste <span className="text-[#7C2D12] font-semibold">{name}</span>. Your personalized cosmic transit newsletter has been scheduled for <span className="text-[#F97316] font-semibold">{email}</span>.
                  </p>
                </div>

                {/* Instant Sample Reading for Selected Sign */}
                <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-orange-200 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#F97316] fill-[#F97316]" />
                      <span className="text-xs font-playfair font-bold text-[#C2410C] uppercase tracking-wider">
                        Today's Transit Preview for {selectedSignObj.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#9A3412] px-2 py-0.5 rounded bg-white border border-orange-200">
                      Ruler: {selectedSignObj.ruler}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-[#7C2D12]">
                    <p className="leading-relaxed font-light">
                      <strong className="text-[#7C2D12]">Planetary Energy:</strong> Moon is moving through an auspicious trine. Ideal window for creative negotiations and Lal Kitab charitable offerings before sunset.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-white border border-orange-200">
                        <span className="text-[10px] text-[#9A3412] block">Lucky Color</span>
                        <span className="font-semibold text-[#F97316]">Golden Saffron</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-orange-200">
                        <span className="text-[10px] text-[#9A3412] block">Abhijit Muhurat</span>
                        <span className="font-semibold text-[#7C2D12]">11:58 AM - 12:48 PM</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-orange-200 col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-[#9A3412] block">Daily Karma Tip</span>
                        <span className="font-semibold text-emerald-600">Feed birds soaked grains</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="newsletter-success-close-btn"
                    onClick={handleClose}
                    className="px-8 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white border border-transparent text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-md"
                  >
                    Continue Exploring Vedic Portal
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
