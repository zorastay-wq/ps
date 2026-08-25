import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { KundliResult, LocationData } from '../types';
import { useUserProfile } from '../context/UserProfileContext';
import { useToast } from '../context/ToastContext';
import { KundliChartSVG } from './KundliChartSVG';
import { SouthIndianChartSVG } from './SouthIndianChartSVG';
import { PlanetaryPositionDrawing } from './PlanetaryPositionDrawing';
import { LocationAutocomplete } from './LocationAutocomplete';
import { DashaInfluenceReportCard } from './DashaInfluenceReportCard';
import { findLocationByName, formatUtcOffset } from '../utils/locationService';
import { calculateVedicKundliFull, calculatePlanetaryPositions } from '../utils/planetaryCalculator';
import { generateKundliPDF } from '../utils/kundliReportGenerator';
import { adminService } from '../services/adminService';
import { StaggeredHeading, MysticHighlight } from './typography';
import { Compass, Sparkles, AlertCircle, CheckCircle2, ShieldCheck, Gem, Calendar, RefreshCw, ArrowRight, Share2, Layers, Eye, BookOpen, MessageCircle, User, Save, CircleDot, Grid, Globe, MapPin, Clock, ChevronDown, ChevronUp, ShieldAlert, AlertTriangle, Terminal, Check, X, FileDown, Download, Loader2 } from 'lucide-react';
import { DOCTOR_INFO } from '../data/brandData';

interface KundliCalculatorProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const KundliCalculator: React.FC<KundliCalculatorProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax Scroll Tracking for Kundli Section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Cosmic Background Parallax Layers
  const yNebulaGlow = useTransform(scrollYProgress, [0, 1], [-40, 50]);
  const yConstellationLayer1 = useTransform(scrollYProgress, [0, 1], [-70, 80]);
  const yConstellationLayer2 = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const rotateAstrolabe = useTransform(scrollYProgress, [0, 1], [-15, 25]);
  const yFloatingStars = useTransform(scrollYProgress, [0, 1], [-100, 110]);
  const opacityConstellation = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.15, 0.45, 0.45, 0.15]);

  const { profile, hasCustomProfile, openProfileModal, saveProfile } = useUserProfile();
  const { showReadingComplete, showSuccess } = useToast();

  const [fullName, setFullName] = useState(profile.fullName || 'Vikram Sharma');
  const [gender, setGender] = useState(profile.gender || 'male');
  const [dob, setDob] = useState(profile.dob || '1995-07-15');
  const [tob, setTob] = useState(profile.tob || '10:30');
  const [pob, setPob] = useState(profile.pob || 'Delhi, India');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<KundliResult | null>(null);
  const [activeTab, setActiveTab] = useState<'chart' | 'planets' | 'dashas' | 'doshas' | 'remedies'>('chart');
  const [chartStyle, setChartStyle] = useState<'north' | 'south' | 'planetary_drawing'>('north');
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>('Jupiter');
  const [profileSavedFeedback, setProfileSavedFeedback] = useState(false);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadReport = () => {
    if (!result) return;
    setIsGeneratingPDF(true);
    try {
      generateKundliPDF({
        result,
        fullName: fullName.trim() || 'Native Profile',
        dob,
        tob,
        pob
      });
      showSuccess(
        'Kundli PDF Report Generated',
        `Complete Vedic Janam Kundli report has been downloaded for ${fullName || 'Native'}.`
      );
    } catch (error) {
      console.error('Error generating Kundli PDF report:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Automatically synchronize when stored profile changes in context/local storage
  useEffect(() => {
    if (profile) {
      if (profile.fullName) setFullName(profile.fullName);
      if (profile.gender) setGender(profile.gender);
      if (profile.dob) setDob(profile.dob);
      if (profile.tob) setTob(profile.tob);
      if (profile.pob) {
        setPob(profile.pob);
        const resolved = findLocationByName(profile.pob);
        if (resolved) setLocationData(resolved);
      }
    }
  }, [profile]);

  const handleSaveToProfile = () => {
    saveProfile({
      fullName,
      gender: gender as any,
      dob,
      tob,
      pob,
      lat: locationData?.lat,
      lng: locationData?.lng,
      timezone: locationData?.timezone
    });
    setProfileSavedFeedback(true);
    setTimeout(() => setProfileSavedFeedback(false), 2000);
  };

  // Automatically calculate initial chart on mount
  useEffect(() => {
    if (fullName && dob && tob && pob && !result) {
      const initialLoc = locationData || findLocationByName(pob);
      if (initialLoc && !locationData) {
        setLocationData(initialLoc);
      }
      calculateKundliDirect(fullName, dob, tob, pob, initialLoc);
    }
  }, []);

  const calculateKundliDirect = (
    name: string,
    bDate: string,
    bTime: string,
    bPlace: string,
    locData?: LocationData | null
  ) => {
    const activeLoc = locData || locationData || findLocationByName(bPlace);
    const kundliRes = calculateVedicKundliFull(name, bDate, bTime, bPlace, activeLoc);
    setResult(kundliRes);

    // Telemetry log to Admin Portal
    try {
      adminService.logKundliCalculation({
        fullName: name || 'Native',
        gender: gender || 'male',
        dob: bDate,
        tob: bTime,
        pob: bPlace,
        ascendant: kundliRes.ascendant,
        moonSign: kundliRes.moonSign,
        sunSign: kundliRes.sunSign,
        nakshatra: kundliRes.nakshatra,
        manglikStatus: kundliRes.manglikStatus,
        sadeSatiStatus: kundliRes.sadeSatiStatus,
        kaalSarpStatus: kundliRes.kaalSarpStatus
      });
    } catch (e) {
      console.warn('Silent admin log error:', e);
    }
  };

  const calculateKundli = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !dob || !tob || !pob) return;

    setIsCalculating(true);
    const currentLoc = locationData || findLocationByName(pob);
    setTimeout(() => {
      calculateKundliDirect(fullName, dob, tob, pob, currentLoc);
      showReadingComplete(
        'Kundli Reading Complete',
        `Planetary Drawing & Lagna Chart generated successfully.`
      );
      setIsCalculating(false);
    }, 450);
  };

  const handleShareWhatsApp = () => {
    if (!result) return;
    const msg = `*Vedic Janam Kundli Report for ${fullName}:*
• Ascendant (लग्न): ${result.ascendant}
• Moon Sign (राशि): ${result.moonSign}
• Nakshatra: ${result.nakshatra}
• Manglik Status: ${result.manglikStatus}
• Sade Sati: ${result.sadeSatiStatus}
• Recommended Gemstone: ${result.favorableGemstone}

Generated via Dr. Preeti Sehgal's Vedic Portal.
Consultation: ${DOCTOR_INFO.officialWebsite}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section 
      ref={sectionRef}
      id="kundli-tool" 
      className="py-8 sm:py-12 lg:py-16 bg-[#FFF9F2] text-[#7C2D12] border-b border-orange-200 relative overflow-hidden"
    >
      
      {/* 1. Deep Cosmic Nebula Parallax Glows */}
      <motion.div 
        style={{ y: yNebulaGlow }}
        className="absolute inset-0 pointer-events-none opacity-40 z-0 will-change-transform"
      >
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-[#F97316]/15 blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-[#EA580C]/10 blur-3xl" />
        <div className="absolute top-2/3 right-1/3 w-64 h-64 rounded-full bg-[#FBBF24]/10 blur-3xl" />
      </motion.div>

      {/* 2. Sacred Kundli Astrolabe / Navamsha Geometries (Subtle Rotation + Scroll Parallax) */}
      <motion.div
        style={{ y: yConstellationLayer2, rotate: rotateAstrolabe, opacity: opacityConstellation }}
        className="absolute -top-16 -left-16 sm:-top-24 sm:-left-24 w-80 h-80 sm:w-[480px] sm:h-[480px] pointer-events-none z-0 will-change-transform text-[#F97316]"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Concentric Vedic Coordinates */}
          <circle cx="200" cy="200" r="190" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="200" cy="200" r="150" strokeWidth="0.6" opacity="0.7" />
          <circle cx="200" cy="200" r="110" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.8" />
          <circle cx="200" cy="200" r="70" strokeWidth="0.6" opacity="0.6" />
          {/* Diamond Kundli Sacred Layout */}
          <polygon points="200,20 380,200 200,380 20,200" strokeWidth="0.8" opacity="0.7" />
          <line x1="20" y1="20" x2="380" y2="380" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
          <line x1="380" y1="20" x2="20" y2="380" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
          <polygon points="200,50 350,200 200,350 50,200" strokeWidth="0.5" opacity="0.4" transform="rotate(45 200 200)" />
        </svg>
      </motion.div>

      {/* 3. Saptarishi & Nakshatra Constellation Stars (Parallax Layer 1) */}
      <motion.div
        style={{ y: yConstellationLayer1 }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <svg className="w-full h-full text-[#F97316] opacity-35" fill="none" stroke="currentColor">
          {/* Saptarishi / Ursa Major Star Group (Top Right) */}
          <polyline points="780,70 850,90 910,140 980,135 1040,190 1010,240 940,225 980,135" strokeWidth="0.7" strokeDasharray="3 3" />
          <circle cx="780" cy="70" r="3" fill="#F97316" className="animate-pulse" />
          <circle cx="850" cy="90" r="2.5" fill="#FBBF24" />
          <circle cx="910" cy="140" r="3" fill="#F97316" />
          <circle cx="980" cy="135" r="3.5" fill="#F59E0B" className="animate-ping" style={{ animationDuration: '4s' }} />
          <circle cx="1040" cy="190" r="2.5" fill="#F97316" />
          <circle cx="1010" cy="240" r="3" fill="#FBBF24" />
          <circle cx="940" cy="225" r="2.5" fill="#F97316" />

          {/* Mrigashira / Orion & Ashwini Alignment (Bottom Left) */}
          <polyline points="60,600 130,550 200,580 270,510 240,440 170,470 130,550" strokeWidth="0.7" strokeDasharray="2 3" />
          <polyline points="200,580 220,660 170,720" strokeWidth="0.6" strokeDasharray="3 2" />
          <circle cx="60" cy="600" r="2.5" fill="#FBBF24" />
          <circle cx="130" cy="550" r="3" fill="#F97316" />
          <circle cx="200" cy="580" r="3.5" fill="#F59E0B" />
          <circle cx="270" cy="510" r="2" fill="#F97316" />
          <circle cx="240" cy="440" r="3" fill="#FBBF24" />
          <circle cx="170" cy="470" r="2.5" fill="#F97316" />
          <circle cx="220" cy="660" r="2" fill="#F97316" />
          <circle cx="170" cy="720" r="3" fill="#FBBF24" />
        </svg>
      </motion.div>

      {/* 4. Floating Celestial Dust & Vedic Coordinate Markers (High-Speed Parallax) */}
      <motion.div
        style={{ y: yFloatingStars }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <svg className="w-full h-full text-[#F59E0B]" fill="currentColor">
          <circle cx="15%" cy="30%" r="1.5" opacity="0.6" />
          <circle cx="85%" cy="25%" r="2" opacity="0.7" />
          <circle cx="92%" cy="65%" r="1.5" opacity="0.5" />
          <circle cx="8%" cy="75%" r="2" opacity="0.6" />
          <circle cx="48%" cy="15%" r="1" opacity="0.4" />
          <circle cx="75%" cy="85%" r="1.8" opacity="0.6" />
        </svg>
        
        {/* Subtle Sanskrit Zodiac Glyphs floating in background */}
        <div className="absolute top-1/4 right-8 text-[#F97316]/15 font-serif text-2xl select-none hidden lg:block">
          मेष &bull; वृषभ &bull; मिथुन
        </div>
        <div className="absolute bottom-1/3 left-6 text-[#F97316]/15 font-serif text-2xl select-none hidden lg:block">
          कर्क &bull; सिंह &bull; कन्या
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-white px-3.5 py-1 rounded-full text-[11px] font-semibold text-[#EA580C] tracking-[0.18em] uppercase mb-2.5 sm:mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Interactive Vedic Astrological Engine</span>
          </div>
          <StaggeredHeading
            text="Free Vedic Janam Kundli & Dosha Visualizer"
            as="h2"
            className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-[#7C2D12] tracking-tight"
            goldAccentWords={['Vedic', 'Janam', 'Kundli']}
            staggerDelay={0.04}
          />
          <p className="text-[#9A3412] mt-2 text-xs sm:text-sm font-normal max-w-2xl mx-auto">
            Generate an interactive North Indian Diamond Chart (लग्न चक्र), analyze major planetary doshas (<MysticHighlight tooltip="Mars planetary placement affliction causing relationship friction">Manglik Dosha</MysticHighlight>, <MysticHighlight tooltip="7.5-year Saturn transit through 12th, 1st, and 2nd houses from natal Moon">Shani Sade Sati</MysticHighlight>, <MysticHighlight tooltip="Planetary axis trapped between nodal shadow planets Rahu and Ketu">Kaal Sarp</MysticHighlight>), and uncover custom Lal Kitab remedies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* Input Form Card */}
          <div className="lg:col-span-5 bg-white p-4 sm:p-6 rounded-2xl border border-orange-200 shadow-lg shadow-orange-950/5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-playfair text-base sm:text-lg font-bold text-[#7C2D12] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F97316]" />
                <span>Enter Birth Details &bull; जन्म विवरण</span>
              </h3>
              <button
                type="button"
                onClick={openProfileModal}
                className="text-[11px] text-[#EA580C] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                title="Manage Saved Birth Profile"
              >
                <User className="w-3.5 h-3.5" />
                <span>{hasCustomProfile ? 'Edit Profile' : 'Save Profile'}</span>
              </button>
            </div>

            {/* Profile Sync Active Banner */}
            <div className="mb-3.5 p-2 sm:p-2.5 rounded-xl bg-[#FFF7ED] border border-orange-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[#9A3412] text-[11px] font-normal">
                  {hasCustomProfile ? (
                    <>Using Saved Profile: <strong className="text-[#7C2D12] font-semibold">{profile.fullName}</strong></>
                  ) : (
                    <>Default Demo Profile Active</>
                  )}
                </span>
              </div>
              <button
                type="button"
                onClick={openProfileModal}
                className="text-[10px] text-[#EA580C] hover:text-[#C2410C] uppercase tracking-wider font-bold cursor-pointer"
              >
                Switch
              </button>
            </div>

            {profileSavedFeedback && (
              <div className="mb-3 p-2 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Profile updated & saved to local storage!</span>
              </div>
            )}

            <form onSubmit={calculateKundli} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#9A3412] mb-1 font-normal">
                  Full Name / जातक का नाम *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Vikram Sharma"
                  className="w-full bg-[#FFF9F2] border border-orange-200 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-[#7C2D12] placeholder-[#9A3412]/50 focus:outline-none focus:border-[#F97316] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#9A3412] mb-1 font-normal">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                    className="w-full bg-[#FFF9F2] border border-orange-200 rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-[#7C2D12] focus:outline-none focus:border-[#F97316]"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#9A3412] mb-1 font-normal">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-[#FFF9F2] border border-orange-200 rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-[#7C2D12] focus:outline-none focus:border-[#F97316]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#9A3412] mb-1 font-normal">
                    Time of Birth *
                  </label>
                  <input
                    type="time"
                    required
                    value={tob}
                    onChange={(e) => setTob(e.target.value)}
                    className="w-full bg-[#FFF9F2] border border-orange-200 rounded-xl px-2.5 py-2 sm:px-3 sm:py-2.5 text-xs sm:text-sm text-[#7C2D12] focus:outline-none focus:border-[#F97316]"
                  />
                </div>

                <div>
                  <LocationAutocomplete
                    id="kundli-pob-autocomplete"
                    value={pob}
                    onChange={(val, loc) => {
                      setPob(val);
                      if (loc) setLocationData(loc);
                    }}
                    onSelectLocation={(loc) => setLocationData(loc)}
                    showCoordinatesBadge={true}
                    label="Place of Birth (City)"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <button
                  type="button"
                  onClick={handleSaveToProfile}
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#9A3412] hover:text-[#EA580C] font-medium transition-colors cursor-pointer"
                  title="Save this name and birth time to your device profile"
                >
                  <Save className="w-3 h-3 text-[#F97316]" />
                  <span>Save to My Profile</span>
                </button>

                <span className="text-[10px] text-[#9A3412] font-normal">Auto-synced</span>
              </div>

              <button
                type="submit"
                disabled={isCalculating}
                className="w-full mt-1 inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-xs tracking-wider uppercase py-3 rounded-xl shadow-md shadow-orange-500/20 transition-all cursor-pointer"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Calculating Planetary Ephemeris...</span>
                  </>
                ) : (
                  <>
                    <Compass className="w-4 h-4 text-white" />
                    <span>Generate Complete Vedic Kundli</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[10px] text-[#9A3412] pt-0.5 font-normal">
                <span>Vedic Lahiri Ayanamsha</span>
                <span>100% Free & Confidential</span>
              </div>
            </form>
          </div>

          {/* Results Output Section with Interactive Tabs */}
          <div className="lg:col-span-7">
            {isCalculating ? (
              /* Mystic Skeleton Loader for Planetary Calculation */
              <div className="bg-white rounded-2xl border border-orange-200 p-5 sm:p-7 shadow-lg shadow-orange-950/5 space-y-5 animate-in fade-in duration-300">
                {/* Header Skeleton */}
                <div className="flex flex-wrap items-center justify-between border-b border-orange-100 pb-3.5 gap-3">
                  <div className="space-y-1.5">
                    <div className="h-6 w-56 rounded-lg skeleton-shimmer" />
                    <div className="h-3.5 w-40 rounded-lg skeleton-shimmer" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-20 rounded-lg skeleton-shimmer" />
                    <div className="h-8 w-28 rounded-lg skeleton-shimmer" />
                  </div>
                </div>

                {/* Pulsing Sacred Planetary Mandala Center */}
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#F97316]/50 animate-spin" />
                    <div className="w-12 h-12 rounded-full bg-orange-100/80 border border-orange-300 flex items-center justify-center text-[#F97316] shadow-sm pulse-mandala-anim">
                      <Compass className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-playfair text-base font-bold text-[#7C2D12]">
                      Computing Vedic Planetary Ephemeris...
                    </h4>
                    <p className="text-xs text-[#9A3412] max-w-sm">
                      Aligning Lahiri Ayanamsha, Bhav Madhyas, Lagna Chart & Lal Kitab Karma Upays
                    </p>
                  </div>
                </div>

                {/* Shimmering Tabs & Grid Placeholder */}
                <div className="grid grid-cols-4 gap-2 border-b border-orange-100 pb-3">
                  <div className="h-8 rounded-xl skeleton-shimmer" />
                  <div className="h-8 rounded-xl skeleton-shimmer" />
                  <div className="h-8 rounded-xl skeleton-shimmer" />
                  <div className="h-8 rounded-xl skeleton-shimmer" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="h-16 rounded-xl skeleton-shimmer" />
                  <div className="h-16 rounded-xl skeleton-shimmer" />
                  <div className="h-16 rounded-xl skeleton-shimmer" />
                  <div className="h-16 rounded-xl skeleton-shimmer" />
                </div>
              </div>
            ) : result ? (
              <motion.div 
                initial={{ opacity: 0, y: 16, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl border border-orange-200 p-4 sm:p-6 shadow-lg shadow-orange-950/5 space-y-4"
              >
                
                {/* Result Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-orange-200 pb-3.5 gap-3">
                  <div>
                    <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#7C2D12]">
                      Kundli Blueprint for {fullName}
                    </h3>
                    <div className="text-xs text-[#9A3412] font-normal mt-0.5 flex flex-wrap items-center gap-1.5">
                      <span>Born {dob} at {tob} &bull; {pob}</span>
                      {result.locationDetails && (
                        <span className="inline-flex items-center gap-1 bg-orange-100/90 text-[#9A3412] font-mono text-[10px] px-2 py-0.5 rounded-md border border-orange-200">
                          <Compass className="w-2.5 h-2.5 text-[#F97316]" />
                          <span>{result.locationDetails.lat.toFixed(2)}°, {result.locationDetails.lng.toFixed(2)}°</span>
                          <span>&bull;</span>
                          <span>{formatUtcOffset(result.locationDetails.utcOffsetHours)}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
                    <button
                      onClick={handleDownloadReport}
                      disabled={isGeneratingPDF}
                      className="inline-flex items-center gap-1.5 bg-[#FFF7ED] hover:bg-orange-100 text-[#EA580C] border border-orange-300 hover:border-orange-400 px-2.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all shadow-xs disabled:opacity-60"
                      title="Download complete Janam Kundli PDF report"
                    >
                      {isGeneratingPDF ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#EA580C]" />
                      ) : (
                        <FileDown className="w-3.5 h-3.5 text-[#EA580C]" />
                      )}
                      <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
                    </button>

                    <button
                      onClick={handleShareWhatsApp}
                      className="inline-flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-[#EA580C] border border-orange-200 px-2.5 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold cursor-pointer transition-colors"
                      title="Share Kundli on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    <button
                      onClick={() => onOpenBooking('vedic-kundli')}
                      className="inline-flex items-center gap-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold cursor-pointer transition-colors shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Result Sub-Tabs */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 border-b border-orange-200 pb-2.5">
                  <button
                    onClick={() => setActiveTab('chart')}
                    className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                      activeTab === 'chart'
                        ? 'bg-[#F97316] text-white shadow-xs'
                        : 'bg-[#FFF9F2] text-[#7C2D12] hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    Vedic Diamond Chart
                  </button>

                  <button
                    onClick={() => setActiveTab('planets')}
                    className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                      activeTab === 'planets'
                        ? 'bg-[#F97316] text-white shadow-xs'
                        : 'bg-[#FFF9F2] text-[#7C2D12] hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    Planetary Positions
                  </button>

                  <button
                    onClick={() => setActiveTab('dashas')}
                    className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                      activeTab === 'dashas'
                        ? 'bg-[#F97316] text-white shadow-xs'
                        : 'bg-[#FFF9F2] text-[#7C2D12] hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    Dasha & Sub-Periods
                  </button>

                  <button
                    onClick={() => setActiveTab('doshas')}
                    className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                      activeTab === 'doshas'
                        ? 'bg-[#F97316] text-white shadow-xs'
                        : 'bg-[#FFF9F2] text-[#7C2D12] hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    Dosha Meter
                  </button>

                  <button
                    onClick={() => setActiveTab('remedies')}
                    className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                      activeTab === 'remedies'
                        ? 'bg-[#F97316] text-white shadow-xs'
                        : 'bg-[#FFF9F2] text-[#7C2D12] hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    Lal Kitab Prescription
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {/* Tab 1: Interactive Chart Visualizer */}
                  {activeTab === 'chart' && (
                    <motion.div 
                      key="chart-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="space-y-4"
                    >
                      <motion.div 
                        initial="hidden"
                        animate="show"
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.06 }
                          }
                        }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
                      >
                        <motion.div 
                          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                          className="bg-[#FFF7ED] p-3 rounded-xl border border-orange-200"
                        >
                          <span className="text-[9px] uppercase tracking-widest text-[#9A3412] font-semibold block mb-0.5">Ascendant (Lagna)</span>
                          <div className="font-playfair text-sm text-[#EA580C] font-bold">{result.ascendant}</div>
                          {result.ascendantDegreeFormatted && (
                            <div className="text-[10px] text-[#9A3412] font-medium mt-0.5">{result.ascendantDegreeFormatted}</div>
                          )}
                        </motion.div>
                        <motion.div 
                          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                          className="bg-[#FFF7ED] p-3 rounded-xl border border-orange-200"
                        >
                          <span className="text-[9px] uppercase tracking-widest text-[#9A3412] font-semibold block mb-0.5">Moon Sign (Rashi)</span>
                          <span className="font-playfair text-sm text-[#EA580C] font-bold">{result.moonSign}</span>
                        </motion.div>
                        <motion.div 
                          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                          className="bg-[#FFF7ED] p-3 rounded-xl border border-orange-200"
                        >
                          <span className="text-[9px] uppercase tracking-widest text-[#9A3412] font-semibold block mb-0.5">Sun Sign (Surya)</span>
                          <span className="font-playfair text-sm text-[#7C2D12] font-bold">{result.sunSign}</span>
                        </motion.div>
                        <motion.div 
                          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                          className="bg-[#FFF7ED] p-3 rounded-xl border border-orange-200"
                        >
                          <span className="text-[9px] uppercase tracking-widest text-[#9A3412] font-semibold block mb-0.5">Birth Nakshatra</span>
                          <span className="font-playfair text-sm text-[#7C2D12] font-bold">{result.nakshatra}</span>
                        </motion.div>
                      </motion.div>

                      {/* Chart Drawing Style Switcher */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-2 bg-[#FFF7ED] rounded-xl border border-orange-200 text-xs">
                        <span className="text-[11px] font-bold text-[#7C2D12] uppercase tracking-wider pl-1">
                          Chart Drawing Style:
                        </span>
                        <div className="flex items-center gap-1.5 w-full sm:w-auto">
                          <button
                            onClick={() => setChartStyle('north')}
                            className={`flex-1 sm:flex-initial px-3 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                              chartStyle === 'north'
                                ? 'bg-[#F97316] text-white shadow-xs'
                                : 'bg-white text-[#7C2D12] hover:bg-orange-100 border border-orange-200'
                            }`}
                          >
                            North Indian (लग्न)
                          </button>
                          <button
                            onClick={() => setChartStyle('south')}
                            className={`flex-1 sm:flex-initial px-3 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                              chartStyle === 'south'
                                ? 'bg-[#F97316] text-white shadow-xs'
                                : 'bg-white text-[#7C2D12] hover:bg-orange-100 border border-orange-200'
                            }`}
                          >
                            South Indian (दक्षिण)
                          </button>
                          <button
                            onClick={() => setChartStyle('planetary_drawing')}
                            className={`flex-1 sm:flex-initial px-3 py-1 rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                              chartStyle === 'planetary_drawing'
                                ? 'bg-[#F97316] text-white shadow-xs'
                                : 'bg-white text-[#7C2D12] hover:bg-orange-100 border border-orange-200'
                            }`}
                          >
                            360° Planetary Drawing (ग्रह चक्र)
                          </button>
                        </div>
                      </div>

                      {/* Selected Chart Rendering */}
                      <div className="pt-1">
                        <AnimatePresence mode="wait">
                          {chartStyle === 'north' && (
                            <motion.div
                              key="north-chart"
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              transition={{ duration: 0.28, ease: 'easeOut' }}
                            >
                              <KundliChartSVG 
                                result={result} 
                                selectedPlanet={selectedPlanet} 
                                onSelectPlanet={(p) => setSelectedPlanet(p)} 
                              />
                            </motion.div>
                          )}
                          {chartStyle === 'south' && (
                            <motion.div
                              key="south-chart"
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              transition={{ duration: 0.28, ease: 'easeOut' }}
                            >
                              <SouthIndianChartSVG 
                                result={result} 
                                selectedPlanet={selectedPlanet} 
                                onSelectPlanet={(p) => setSelectedPlanet(p)} 
                              />
                            </motion.div>
                          )}
                          {chartStyle === 'planetary_drawing' && (
                            <motion.div
                              key="drawing-chart"
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              transition={{ duration: 0.28, ease: 'easeOut' }}
                            >
                              <PlanetaryPositionDrawing 
                                result={result} 
                                selectedPlanet={selectedPlanet} 
                                onSelectPlanet={(p) => setSelectedPlanet(p)} 
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab 2: Planetary Degrees & Visual Drawing */}
                  {activeTab === 'planets' && (
                    <motion.div 
                      key="planets-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="space-y-3.5 sm:space-y-4"
                    >
                      {/* Visual 360° Planetary Position Drawing Canvas */}
                      <PlanetaryPositionDrawing 
                        result={result} 
                        selectedPlanet={selectedPlanet} 
                        onSelectPlanet={(p) => setSelectedPlanet(p)} 
                      />

                      {/* Detailed Planetary Positions Table - Compressed Padding */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between px-0.5">
                          <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-[0.16em]">
                            Graha Sthiti & Degrees Breakdown (ग्रह स्थिति एवं अंश)
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-[#9A3412]">
                            Click row to highlight planet
                          </span>
                        </div>

                        <div className="overflow-x-auto rounded-xl border border-orange-200 bg-white shadow-xs">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead className="bg-orange-100 text-[#7C2D12] font-playfair text-[10px] sm:text-[11px] uppercase tracking-wider font-bold">
                              <tr>
                                <th className="py-1.5 px-2 sm:py-2 sm:px-2.5">Planet (ग्रह)</th>
                                <th className="py-1.5 px-2 sm:py-2 sm:px-2.5">Rashi</th>
                                <th className="py-1.5 px-2 sm:py-2 sm:px-2.5">Degrees</th>
                                <th className="py-1.5 px-2 sm:py-2 sm:px-2.5 hidden sm:table-cell">Nakshatra & Pada</th>
                                <th className="py-1.5 px-2 sm:py-2 sm:px-2.5">Dignity / Status</th>
                                <th className="py-1.5 px-2 sm:py-2 sm:px-2.5">House</th>
                                <th className="py-1.5 px-2 sm:py-2 sm:px-2.5 hidden md:table-cell">Drishti (दृष्टि)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-orange-100 font-normal text-[#7C2D12]">
                              {(result.planetaryPositions || []).map((pl) => {
                                const isSelected = selectedPlanet === pl.name;
                                return (
                                  <tr 
                                    key={pl.name}
                                    onClick={() => setSelectedPlanet(pl.name)}
                                    className={`cursor-pointer transition-colors ${
                                      isSelected ? 'bg-orange-100/70 font-semibold' : 'hover:bg-orange-50/60'
                                    }`}
                                  >
                                    <td className="py-1.5 px-2 sm:py-2 sm:px-2.5 font-bold text-[#7C2D12] flex items-center gap-1.5 whitespace-nowrap">
                                      <span 
                                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full inline-block shrink-0" 
                                        style={{ backgroundColor: pl.color || '#EA580C' }} 
                                      />
                                      <span>{pl.name} ({pl.hindiName})</span>
                                      {pl.isRetrograde && (
                                        <span className="text-[8px] sm:text-[9px] bg-red-100 text-red-700 px-1 py-0.2 rounded font-bold">
                                          (R)
                                        </span>
                                      )}
                                    </td>
                                    <td className="py-1.5 px-2 sm:py-2 sm:px-2.5 whitespace-nowrap">
                                      {pl.rashi} <span className="text-[9px] text-[#9A3412]">({pl.element})</span>
                                    </td>
                                    <td className="py-1.5 px-2 sm:py-2 sm:px-2.5 font-bold text-[#EA580C] whitespace-nowrap">{pl.degreeFormatted}</td>
                                    <td className="py-1.5 px-2 sm:py-2 sm:px-2.5 hidden sm:table-cell whitespace-nowrap">{pl.nakshatra} (P{pl.pada})</td>
                                    <td className="py-1.5 px-2 sm:py-2 sm:px-2.5 whitespace-nowrap">
                                      <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold ${
                                        pl.dignity === 'Exalted'
                                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                          : pl.dignity === 'Own Sign'
                                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                          : pl.dignity === 'Debilitated'
                                          ? 'bg-red-100 text-red-800 border border-red-200'
                                          : 'bg-orange-50 text-[#7C2D12] border border-orange-200'
                                      }`}>
                                        {pl.dignity}
                                      </span>
                                    </td>
                                    <td className="py-1.5 px-2 sm:py-2 sm:px-2.5 text-[#EA580C] font-bold whitespace-nowrap">{pl.house}th House</td>
                                    <td className="py-1.5 px-2 sm:py-2 sm:px-2.5 text-[#9A3412] font-semibold hidden md:table-cell whitespace-nowrap">Houses {pl.aspectHouses.join(', ')}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="p-2.5 sm:p-3.5 bg-[#FFF7ED] rounded-xl border border-orange-200 text-xs text-[#7C2D12] font-normal flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <strong className="text-[#EA580C] block font-bold uppercase tracking-wider text-[10px] mb-0.5">Active Vimshottari Mahadasha:</strong>
                          Currently under <strong className="text-[#7C2D12] font-bold">{result.currentDasha}</strong>.
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab('dashas')}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#EA580C] hover:underline cursor-pointer uppercase tracking-wider shrink-0"
                        >
                          <span>Full Dasha Analysis</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Tab: Planetary Dasha & Influences */}
                  {activeTab === 'dashas' && (
                    <motion.div 
                      key="dashas-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="space-y-4"
                    >
                      {result.dashaAnalysis ? (
                        <DashaInfluenceReportCard 
                          dashaAnalysis={result.dashaAnalysis}
                          onOpenBooking={onOpenBooking}
                        />
                      ) : (
                        <div className="p-4 bg-orange-50 text-xs text-[#7C2D12] rounded-xl border border-orange-200">
                          Calculating your personalized Vimshottari Dasha analysis...
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Tab 4: Dosha Breakdown */}
                  {activeTab === 'doshas' && (
                    <motion.div 
                      key="doshas-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="space-y-4"
                    >
                      {/* Dosha Overview Notice */}
                      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#FFF7ED] rounded-xl border border-orange-200/80 text-xs">
                        <div className="flex items-center gap-2 text-[#7C2D12]">
                          <ShieldCheck className="w-4 h-4 text-[#EA580C] shrink-0" />
                          <span className="font-medium">
                            Rigorous Vedic Parashari Dosha Audit with Bhanga (Cancellation) Principles
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowDiagnostics(!showDiagnostics)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#EA580C] hover:text-[#C2410C] transition-colors cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-orange-200 shadow-xs"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>{showDiagnostics ? 'Hide Audit Log' : 'Parashari Audit Trail'}</span>
                          {showDiagnostics ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>

                      {/* 3 Core Dosha Cards */}
                      <motion.div 
                        initial="hidden"
                        animate="show"
                        variants={{
                          hidden: { opacity: 0 },
                          show: { opacity: 1, transition: { staggerChildren: 0.08 } }
                        }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-3"
                      >
                        {/* 1. Manglik Dosha Card */}
                        <motion.div 
                          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                          className="bg-[#FFF7ED] p-4 rounded-xl border border-orange-200 space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-[#9A3412] uppercase tracking-widest block">Manglik (Kuja) Dosha</span>
                              {result.manglikDetails?.status === 'Cancelled Manglik (Bhanga)' ? (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                                  <Check className="w-2.5 h-2.5" /> Bhanga (Cancelled)
                                </span>
                              ) : result.manglikDetails?.status === 'High Manglik' ? (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-300 px-2 py-0.5 rounded-full">
                                  <ShieldAlert className="w-2.5 h-2.5" /> High Kuja
                                </span>
                              ) : result.manglikDetails?.status === 'Low / Partial Manglik' ? (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                                  <AlertTriangle className="w-2.5 h-2.5" /> Partial
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Clear
                                </span>
                              )}
                            </div>

                            <div className={`font-playfair text-base font-bold ${
                              result.manglikDetails?.isManglik ? (result.manglikDetails.isCancelled ? 'text-emerald-700' : 'text-[#EA580C]') : 'text-emerald-700'
                            }`}>
                              {result.manglikStatus}
                            </div>

                            <p className="text-[11px] text-[#7C2D12] leading-relaxed font-normal">
                              {result.manglikDetails?.explanation || (
                                result.manglikStatus.includes('Non')
                                  ? 'No adverse Manglik affliction detected on 1st, 4th, 7th, 8th or 12th house.'
                                  : 'Mars alignment evaluated under Parashari Kuja principles.'
                              )}
                            </p>

                            {/* Show Bhanga Cancellation Rules if applicable */}
                            {result.manglikDetails?.cancellationReasons && result.manglikDetails.cancellationReasons.length > 0 && (
                              <div className="pt-2 border-t border-orange-200/70 space-y-1">
                                <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block">Parashari Bhanga Factors:</span>
                                <ul className="space-y-1">
                                  {result.manglikDetails.cancellationReasons.map((reason, idx) => (
                                    <li key={idx} className="text-[10px] text-emerald-900 bg-emerald-50/80 p-1.5 rounded border border-emerald-200/80 flex items-start gap-1.5 leading-tight">
                                      <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                                      <span>{reason}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          <div className="pt-2 border-t border-orange-200/60 text-[10px] text-[#9A3412] flex items-center justify-between">
                            <span>Lagna: House {result.manglikDetails?.lagnaHouse ?? '-'}</span>
                            <span>Moon: House {result.manglikDetails?.moonHouse ?? '-'}</span>
                          </div>
                        </motion.div>

                        {/* 2. Shani Sade Sati Card */}
                        <motion.div 
                          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                          className="bg-[#FFF7ED] p-4 rounded-xl border border-orange-200 space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-[#9A3412] uppercase tracking-widest block">Shani Sade Sati & Dhaiya</span>
                              {result.sadeSatiDetails?.isActive ? (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                                  <AlertTriangle className="w-2.5 h-2.5" /> {result.sadeSatiDetails.type}
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Inactive
                                </span>
                              )}
                            </div>

                            <div className="font-playfair text-base font-bold text-amber-800">
                              {result.sadeSatiDetails?.phaseName || result.sadeSatiStatus}
                            </div>

                            <p className="text-[11px] text-[#7C2D12] leading-relaxed font-normal">
                              {result.sadeSatiDetails?.description || 'Real-time transit Saturn evaluated against natal Moon rashi.'}
                            </p>

                            {result.sadeSatiDetails?.remedyAdvice && (
                              <div className="pt-2 border-t border-orange-200/70 space-y-1">
                                <span className="text-[9px] font-bold text-[#9A3412] uppercase tracking-wider block">Recommended Practice:</span>
                                <p className="text-[10px] text-[#7C2D12] bg-amber-50/70 p-1.5 rounded border border-amber-200/70 leading-snug">
                                  {result.sadeSatiDetails.remedyAdvice}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="pt-2 border-t border-orange-200/60 text-[10px] text-[#9A3412] flex items-center justify-between">
                            <span>Transit Shani: {result.sadeSatiDetails?.transitSaturnSign || 'Current'}</span>
                            <span>{result.sadeSatiDetails?.houseFromMoon}th from Moon</span>
                          </div>
                        </motion.div>

                        {/* 3. Kaal Sarp Yoga Card */}
                        <motion.div 
                          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                          className="bg-[#FFF7ED] p-4 rounded-xl border border-orange-200 space-y-3 flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-[#9A3412] uppercase tracking-widest block">Kaal Sarp Yoga</span>
                              {result.kaalSarpDetails?.isPresent ? (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-orange-100 text-orange-900 border border-orange-300 px-2 py-0.5 rounded-full">
                                  <ShieldAlert className="w-2.5 h-2.5" /> Active
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Clear
                                </span>
                              )}
                            </div>

                            <div className="font-playfair text-base font-bold text-[#7C2D12]">
                              {result.kaalSarpDetails?.yogaName || result.kaalSarpStatus}
                            </div>

                            <p className="text-[11px] text-[#7C2D12] leading-relaxed font-normal">
                              {result.kaalSarpDetails?.explanation || (
                                'All major planets situated naturally; no continuous obstruction yoga found.'
                              )}
                            </p>

                            <div className="pt-2 border-t border-orange-200/70 space-y-1">
                              <span className="text-[9px] font-bold text-[#9A3412] uppercase tracking-wider block">7-Planet Hemming Verification:</span>
                              <div className="text-[10px] text-[#7C2D12] bg-white/80 p-1.5 rounded border border-orange-200/80">
                                {result.kaalSarpDetails?.isPresent ? (
                                  <span className="text-amber-900 font-medium">All 7 classical grahas hemmed in {result.kaalSarpDetails.type} formation</span>
                                ) : (
                                  <span className="text-emerald-800 font-medium">Clear: Grahas distributed naturally on both sides of the nodal axis</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-orange-200/60 text-[10px] text-[#9A3412] flex items-center justify-between">
                            <span>Axis: {result.kaalSarpDetails?.axis || '1st - 7th Axis'}</span>
                            <span>Rahu H{result.kaalSarpDetails?.rahuHouse ?? '-'} / Ketu H{result.kaalSarpDetails?.ketuHouse ?? '-'}</span>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* Parashari Mathematical Diagnostic Audit Box */}
                      <AnimatePresence>
                        {showDiagnostics && result.doshaDiagnostics && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-orange-950 text-orange-100 rounded-xl border border-orange-800/80 font-mono text-xs space-y-3 shadow-inner">
                              <div className="flex items-center justify-between border-b border-orange-800/60 pb-2">
                                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                                  <Terminal className="w-3.5 h-3.5" /> Vedic Calculation Diagnostics & Mathematical Audit
                                </span>
                                <span className="text-[10px] text-orange-300">Lahiri Ayanamsha: {result.doshaDiagnostics.ayanamsa.toFixed(4)}°</span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                                {/* Mars Audit */}
                                <div className="p-2.5 bg-orange-900/40 rounded-lg border border-orange-800/60 space-y-1">
                                  <span className="text-amber-300 font-semibold block text-[10px] uppercase">Mars (Mangal) Parameters</span>
                                  <div>Sign: {result.doshaDiagnostics.marsData.sign} ({result.doshaDiagnostics.marsData.degreeFormatted})</div>
                                  <div>House from Lagna: H{result.doshaDiagnostics.marsData.houseFromLagna}</div>
                                  <div>House from Chandra: H{result.doshaDiagnostics.marsData.houseFromMoon}</div>
                                  <div>Dignity: {result.doshaDiagnostics.marsData.dignity}</div>
                                </div>

                                {/* Saturn Transit Audit */}
                                <div className="p-2.5 bg-orange-900/40 rounded-lg border border-orange-800/60 space-y-1">
                                  <span className="text-amber-300 font-semibold block text-[10px] uppercase">Real-Time Saturn Transit</span>
                                  <div>Transit Sign: {result.doshaDiagnostics.saturnTransitData.transitSign} ({result.doshaDiagnostics.saturnTransitData.transitDegree})</div>
                                  <div>Natal Moon Rashi: {result.doshaDiagnostics.saturnTransitData.natalMoonSign}</div>
                                  <div>House Offset: {result.doshaDiagnostics.saturnTransitData.houseOffsetFromMoon}th House</div>
                                  <div>Phase: {result.doshaDiagnostics.saturnTransitData.detectedPhase}</div>
                                </div>

                                {/* Rahu-Ketu Axis Audit */}
                                <div className="p-2.5 bg-orange-900/40 rounded-lg border border-orange-800/60 space-y-1">
                                  <span className="text-amber-300 font-semibold block text-[10px] uppercase">Kaal Sarp 180° Hemming</span>
                                  <div>Rahu Longitude: {result.doshaDiagnostics.kaalSarpHemmingData.rahuDegree.toFixed(2)}°</div>
                                  <div>Ketu Longitude: {result.doshaDiagnostics.kaalSarpHemmingData.ketuDegree.toFixed(2)}°</div>
                                  <div>Rahu-Ketu Arc: [{result.doshaDiagnostics.kaalSarpHemmingData.planetsInRahuKetuArc.join(', ') || 'None'}]</div>
                                  <div>Ketu-Rahu Arc: [{result.doshaDiagnostics.kaalSarpHemmingData.planetsInKetuRahuArc.join(', ') || 'None'}]</div>
                                </div>
                              </div>

                              {/* Parashari Bhanga Verification Checklist */}
                              <div className="pt-2 border-t border-orange-800/60 space-y-1 text-[11px]">
                                <span className="text-amber-300 font-semibold block text-[10px] uppercase">Parashari Mangal Bhanga Audit Checks</span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                  <div className="flex items-center gap-1.5">
                                    {result.doshaDiagnostics.manglikBhangaChecks.ownOrExaltedSign ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-orange-400" />}
                                    <span>Mars Swakshetra / Uccha (Own/Exalted): {result.doshaDiagnostics.manglikBhangaChecks.ownOrExaltedSign ? 'True (Bhanga active)' : 'False'}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    {result.doshaDiagnostics.manglikBhangaChecks.jupiterConjunctionOrAspect ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-orange-400" />}
                                    <span>Guru Conjunction / Drishti: {result.doshaDiagnostics.manglikBhangaChecks.jupiterConjunctionOrAspect ? 'True (Bhanga active)' : 'False'}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    {result.doshaDiagnostics.manglikBhangaChecks.venusConjunctionOrAspect ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-orange-400" />}
                                    <span>Venus Conjunction / Drishti: {result.doshaDiagnostics.manglikBhangaChecks.venusConjunctionOrAspect ? 'True (Bhanga active)' : 'False'}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    {result.doshaDiagnostics.manglikBhangaChecks.specificHouseSignAlignment ? <Check className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3 text-orange-400" />}
                                    <span>Classical House-Sign Exceptions: {result.doshaDiagnostics.manglikBhangaChecks.specificHouseSignAlignment ? 'True (Exempted)' : 'False'}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="p-4 rounded-xl bg-[#FFF7ED] border border-orange-200 text-xs text-[#7C2D12] leading-relaxed font-normal">
                        <strong className="text-[#7C2D12] font-bold uppercase tracking-wider text-[10px] block mb-1">Dr. Preeti Sehgal's Professional Assessment:</strong>
                        {result.corePrediction}
                      </div>
                    </motion.div>
                  )}

                  {/* Tab 4: Lal Kitab Remedies */}
                  {activeTab === 'remedies' && (
                    <motion.div 
                      key="remedies-tab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="space-y-5"
                    >
                      {/* 1. Lagna Lord Primary House-Based Upay */}
                      {result.lalKitabProfile && (
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FFF7ED] to-[#FFEDD5] border-2 border-orange-300 text-[#7C2D12] space-y-4 shadow-sm">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                                ☉
                              </div>
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#EA580C] block">
                                  Primary Lagna Lord Upay (लग्न स्वामी अचूक उपाय)
                                </span>
                                <h4 className="font-playfair text-base sm:text-lg font-bold text-[#7C2D12]">
                                  {result.lalKitabProfile.lagnaLordRemedy.planet} ({result.lalKitabProfile.lagnaLordRemedy.hindiName}) in House {result.lalKitabProfile.lagnaLordRemedy.house}
                                </h4>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold bg-white px-3 py-1 rounded-full border border-orange-300 text-[#EA580C] shadow-2xs">
                              <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                              <span>{result.lalKitabProfile.lagnaLordRemedy.duration}</span>
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-white border border-orange-200/80 space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#EA580C]">
                              <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                              <span>{result.lalKitabProfile.lagnaLordRemedy.upayTitle}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-[#7C2D12] leading-relaxed font-normal">
                              {result.lalKitabProfile.lagnaLordRemedy.remedy}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 bg-white/80 rounded-xl border border-orange-200">
                              <span className="text-[9px] uppercase tracking-widest text-[#EA580C] font-bold block mb-1">
                                Strict Timing & Auspicious Day
                              </span>
                              <span className="font-medium text-[#7C2D12] block">
                                {result.lalKitabProfile.lagnaLordRemedy.timeOfDay} ({result.lalKitabProfile.lagnaLordRemedy.auspiciousDay})
                              </span>
                            </div>
                            <div className="p-3 bg-white/80 rounded-xl border border-orange-200">
                              <span className="text-[9px] uppercase tracking-widest text-[#EA580C] font-bold block mb-1">
                                Sacred Substance / Element
                              </span>
                              <span className="font-medium text-[#7C2D12] block">
                                {result.lalKitabProfile.lagnaLordRemedy.elementOrSubstance}
                              </span>
                            </div>
                          </div>

                          {/* Specific Parhez for Lagna Lord */}
                          <div className="p-3.5 bg-[#FEF2F2] rounded-xl border border-red-200 text-xs text-[#991B1B]">
                            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-red-700 mb-1.5">
                              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                              <span>Mandatory Parhez for {result.lalKitabProfile.lagnaLordRemedy.planet} (अनिवार्य परहेज):</span>
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-xs text-[#7F1D1D]">
                              {result.lalKitabProfile.lagnaLordRemedy.precautions.map((p, idx) => (
                                <li key={idx}>{p}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      {/* 2. Synchronized Dosha Prescriptions (Manglik, Sade Sati, Kaal Sarp) */}
                      {result.lalKitabProfile && result.lalKitabProfile.doshaPrescriptions.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                            <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                            <span>Synchronized Dosha Prescriptions (दोष शांति लाल किताब विधान)</span>
                          </div>

                          <div className="grid grid-cols-1 gap-3">
                            {result.lalKitabProfile.doshaPrescriptions.map((dp, idx) => (
                              <div key={idx} className="p-4 rounded-xl bg-white border border-orange-200 shadow-2xs space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-orange-100 text-[#EA580C] border border-orange-300">
                                      {dp.doshaType}
                                    </span>
                                    <h5 className="font-playfair text-sm font-bold text-[#7C2D12]">
                                      {dp.title} <span className="text-xs font-normal text-[#9A3412]">({dp.hindiTitle})</span>
                                    </h5>
                                  </div>
                                  <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-semibold">
                                    {dp.status}
                                  </span>
                                </div>

                                <p className="text-xs text-[#7C2D12] leading-relaxed">
                                  {dp.prescribedUpay}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] bg-[#FFF7ED] p-2.5 rounded-lg border border-orange-100">
                                  <div>
                                    <span className="font-bold text-[#EA580C]">Cycle Rule:</span> {dp.cycleRule}
                                  </div>
                                  <div>
                                    <span className="font-bold text-[#EA580C]">Timing:</span> {dp.timeOfDayRule}
                                  </div>
                                </div>

                                <div className="text-[11px] text-[#991B1B] bg-red-50/60 p-2 rounded-lg border border-red-100">
                                  <span className="font-bold text-red-800">Parhez (Restrictions): </span>
                                  {dp.precautions.join(' ')}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Karmic Debts (Lal Kitab Rin Kundli) */}
                      {result.lalKitabProfile && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                            <BookOpen className="w-4 h-4 text-[#F97316]" />
                            <span>Karmic Debt Evaluation (ऋण कुंडली विश्लेषण)</span>
                          </div>

                          {result.lalKitabProfile.karmicDebts.length > 0 ? (
                            <div className="space-y-3">
                              {result.lalKitabProfile.karmicDebts.map((kd) => (
                                <div key={kd.id} className="p-4 rounded-xl bg-amber-50/80 border border-amber-300 text-[#7C2D12] space-y-2.5">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                                      <h5 className="font-playfair text-sm font-bold text-[#7C2D12]">
                                        {kd.name} <span className="text-xs font-normal text-[#9A3412]">({kd.hindiName})</span>
                                      </h5>
                                    </div>
                                    <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                                      Active Ancestral Rin
                                    </span>
                                  </div>

                                  <p className="text-xs text-[#7C2D12] leading-relaxed">
                                    <span className="font-bold text-[#9A3412]">Astrological Cause:</span> {kd.detectedReason} ({kd.planetaryCause})
                                  </p>

                                  <div className="p-3 bg-white rounded-lg border border-amber-200 text-xs">
                                    <span className="font-bold text-[#EA580C] block mb-1">
                                      Collective Family Upay (सामूहिक परिवार उपाय):
                                    </span>
                                    <p className="text-[#7C2D12]">{kd.collectiveFamilyRemedy}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>
                                <strong>No Severe Rin Kundli Debt Detected:</strong> The planetary houses governing ancestral dharma and maternal lineage are unobstructed.
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 4. Key Natal Planetary House Upays */}
                      {result.lalKitabProfile && result.lalKitabProfile.keyHouseRemedies.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 text-[#F97316]" />
                            <span>Key Planetary House Alignments (भाव अनुसार उपाय)</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {result.lalKitabProfile.keyHouseRemedies.slice(0, 4).map((hr, idx) => (
                              <div key={idx} className="p-3.5 rounded-xl bg-white border border-orange-200 shadow-2xs space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-xs text-[#EA580C]">
                                    {hr.planet} ({hr.hindiName}) in H{hr.house}
                                  </span>
                                  <span className="text-[10px] text-[#9A3412] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                                    {hr.auspiciousDay}
                                  </span>
                                </div>
                                <h6 className="text-xs font-bold text-[#7C2D12] font-playfair">{hr.upayTitle}</h6>
                                <p className="text-[11px] text-[#7C2D12] leading-relaxed line-clamp-3">
                                  {hr.remedy}
                                </p>
                                <div className="text-[10px] text-red-700 pt-1 border-t border-orange-100">
                                  <strong>Parhez:</strong> {hr.precautions[0]}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 5. Master Cosmic Parhez (Mandatory Life Restrictions) */}
                      {result.lalKitabProfile && (
                        <div className="p-4 rounded-xl bg-[#FEF2F2] border border-red-300 text-xs text-[#991B1B] space-y-2.5">
                          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs text-red-800">
                            <ShieldAlert className="w-4 h-4 text-red-600" />
                            <span>Universal Lal Kitab Parhez (परहेज - नियम एवं सावधानियां):</span>
                          </div>
                          <ul className="space-y-1.5 text-xs text-[#7F1D1D]">
                            {result.lalKitabProfile.mandatoryParhez.slice(0, 5).map((rule, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-red-500 font-bold">•</span>
                                <span>{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* 6. Auspicious Gemstone & Vibrations */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3.5 bg-[#FFF7ED] rounded-xl border border-orange-200">
                          <span className="text-[9px] uppercase tracking-widest text-[#EA580C] font-bold block mb-1">Favorable Gemstone</span>
                          <span className="font-semibold text-[#7C2D12]">{result.favorableGemstone}</span>
                        </div>
                        <div className="p-3.5 bg-[#FFF7ED] rounded-xl border border-orange-200">
                          <span className="text-[9px] uppercase tracking-widest text-[#EA580C] font-bold block mb-1">Auspicious Colors</span>
                          <span className="font-semibold text-[#7C2D12]">{result.luckyColor}</span>
                        </div>
                        <div className="p-3.5 bg-[#FFF7ED] rounded-xl border border-orange-200">
                          <span className="text-[9px] uppercase tracking-widest text-[#EA580C] font-bold block mb-1">Lucky Number Vibration</span>
                          <span className="font-semibold text-[#7C2D12]">{result.luckyNumber}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Action Footer */}
                <div className="pt-4 border-t border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadReport}
                      disabled={isGeneratingPDF}
                      className="inline-flex items-center gap-2 bg-[#FFF7ED] hover:bg-orange-100 text-[#EA580C] border border-orange-300 hover:border-orange-400 font-semibold uppercase tracking-wider px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-60"
                    >
                      {isGeneratingPDF ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#EA580C]" />
                      ) : (
                        <FileDown className="w-4 h-4 text-[#EA580C]" />
                      )}
                      <span>{isGeneratingPDF ? 'Preparing PDF...' : 'Download Full PDF Report'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenBooking('vedic-kundli')}
                    className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-white" />
                    <span>Book Chamber / Video Session</span>
                  </button>
                </div>

              </motion.div>
            ) : (
              <div className="h-full min-h-[380px] flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-orange-300 p-8 text-center text-[#9A3412]">
                <div className="w-16 h-16 rounded-full border border-orange-300 bg-orange-50 flex items-center justify-center text-[#F97316] mb-4 shadow-sm">
                  <Compass className="w-8 h-8" />
                </div>
                <h4 className="font-playfair text-lg font-bold text-[#7C2D12] mb-1.5 tracking-wide">
                  Ready to Unveil Your Planetary Blueprint
                </h4>
                <p className="text-xs max-w-md text-[#9A3412] font-normal leading-relaxed mb-6">
                  Fill in your Name, Date of Birth, Time, and Place of Birth to generate your interactive North Indian Kundli chart, planetary house placements, and Lal Kitab remedies.
                </p>
                <button
                  onClick={() => {
                    setFullName('Vikram Sharma');
                    setDob('1995-07-15');
                    setTob('10:30');
                    setPob('Delhi, India');
                    calculateKundliDirect('Vikram Sharma', '1995-07-15', '10:30', 'Delhi, India');
                  }}
                  className="text-xs text-[#EA580C] hover:underline uppercase tracking-wider font-bold cursor-pointer"
                >
                  Load Sample Profile &rarr;
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
