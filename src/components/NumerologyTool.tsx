import React, { useState, useEffect } from 'react';
import { useUserProfile } from '../context/UserProfileContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Hash, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  User, 
  Save, 
  ShieldCheck, 
  Star, 
  Compass, 
  Zap, 
  ArrowRight,
  Info,
  Layers,
  HelpCircle,
  Award
} from 'lucide-react';
import {
  CHALDEAN_LETTER_VALUES,
  PLANET_ATTRIBUTES,
  LO_SHU_MISSING_REMEDIES,
  calculateMulank,
  calculateBhagyank,
  calculateChaldeanName,
  checkVibrationalHarmony,
  generateLoShuGrid,
  LetterBreakdown
} from '../utils/numerology';

interface NumerologyToolProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const NumerologyTool: React.FC<NumerologyToolProps> = ({ onOpenBooking }) => {
  const { profile, hasCustomProfile, openProfileModal, saveProfile } = useUserProfile();
  const { showReadingComplete } = useToast();
  const { isHindi } = useLanguage();

  const [name, setName] = useState<string>(profile.fullName || 'Vikram Sehgal');
  const [dob, setDob] = useState<string>(profile.dob || '1994-08-18');
  const [profileSavedFeedback, setProfileSavedFeedback] = useState(false);
  const [activeTab, setActiveTab] = useState<'grid' | 'planes' | 'remedies'>('grid');

  // Compute live calculations
  const mulank = calculateMulank(dob);
  const bhagyank = calculateBhagyank(dob);
  const nameCalc = calculateChaldeanName(name);
  const harmony = checkVibrationalHarmony(nameCalc.root, mulank, bhagyank);
  const loShu = generateLoShuGrid(dob);

  const mulankPlanet = PLANET_ATTRIBUTES[mulank] || PLANET_ATTRIBUTES[1];
  const bhagyankPlanet = PLANET_ATTRIBUTES[bhagyank] || PLANET_ATTRIBUTES[1];
  const namePlanet = PLANET_ATTRIBUTES[nameCalc.root] || PLANET_ATTRIBUTES[1];

  // Keep synced with profile changes from user context
  useEffect(() => {
    if (profile.fullName && profile.fullName !== name) {
      setName(profile.fullName);
    }
    if (profile.dob && profile.dob !== dob) {
      setDob(profile.dob);
    }
  }, [profile.fullName, profile.dob]);

  const handleSaveToProfile = () => {
    saveProfile({
      fullName: name,
      dob
    });
    setProfileSavedFeedback(true);
    setTimeout(() => setProfileSavedFeedback(false), 2200);
  };

  const handleRecalculate = (e: React.FormEvent) => {
    e.preventDefault();
    showReadingComplete(
      isHindi ? 'अंक ज्योतिष विश्लेषण संपन्न' : 'Chaldean Numerology Blueprint Generated',
      `Mulank: ${mulank} (${mulankPlanet.planet}) | Bhagyank: ${bhagyank} | Name Vibration: ${nameCalc.compound} -> ${nameCalc.root}`
    );
  };

  // Standard Lo Shu 3x3 grid layout:
  // 4 9 2 (SE, S, SW)
  // 3 5 7 (E, Center, W)
  // 8 1 6 (NE, N, NW)
  const loShuLayout = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ];

  return (
    <section 
      id="numerology" 
      data-id="numerology-tool"
      className="py-10 sm:py-14 lg:py-18 bg-[#FFF9F2] dark:bg-[#140501] text-[#7C2D12] dark:text-amber-100 border-b border-orange-200/90 dark:border-amber-900/60 relative transition-colors"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 border border-orange-300 dark:border-amber-800 bg-white/95 dark:bg-[#1F0802] px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#EA580C] dark:text-amber-300 tracking-[0.18em] uppercase mb-3 sm:mb-4 shadow-2xs">
            <Hash className="w-3.5 h-3.5 text-[#F97316]" />
            <span>{isHindi ? 'प्रामाणिक कील्डियन एवं लो-शू चक्र' : 'Authentic Chaldean & Lo Shu Numerology'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-playfair font-black text-[#431407] dark:text-amber-100 tracking-tight leading-tight">
            {isHindi ? 'मूलांक, भाग्यांक, नाम तरंग एवं 3x3 लो-शू चक्र' : 'Destiny, Lo Shu Grid & Name Vibration Engine'}
          </h2>

          <p className="text-[#9A3412] dark:text-amber-300/80 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            {isHindi 
              ? 'सटीक कील्डियन अंक प्रणाली, जन्म तिथि से निर्मित 3x3 लो-शू ऊर्जा चक्र, और नाम-अंक सामंजस्य का वैज्ञानिक विश्लेषण प्राप्त करें।'
              : 'Calculate your Driver (Mulank), Destiny (Bhagyank), 3x3 Lo Shu Energy Matrix from your DOB, and single-digit Chaldean name frequency.'}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Input Form & Profile Sync */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white dark:bg-[#1C0702] p-5 sm:p-6 rounded-3xl border border-orange-200 dark:border-amber-900/80 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-orange-100 dark:border-amber-900/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-amber-950 flex items-center justify-center text-[#F97316]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-base font-bold text-[#431407] dark:text-amber-100">
                      {isHindi ? 'अंक कुंडली डेटा' : 'Birth & Name Input'}
                    </h3>
                    <p className="text-[10.5px] text-[#9A3412] dark:text-amber-300/70">
                      {isHindi ? '100% सटीक कील्डियन गणना' : 'Real-time Chaldean calculation'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openProfileModal}
                  className="text-[11px] text-[#EA580C] dark:text-amber-400 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                  title="Manage Saved Profile"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{hasCustomProfile ? (isHindi ? 'प्रोफ़ाइल बदलें' : 'Edit Profile') : (isHindi ? 'प्रोफ़ाइल' : 'Profile')}</span>
                </button>
              </div>

              {/* Profile Sync Notice */}
              <div className="mb-4 p-2.5 rounded-2xl bg-[#FFF7ED] dark:bg-[#2A0B03] border border-orange-200 dark:border-amber-900/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span className="text-[#9A3412] dark:text-amber-200 text-[11px] truncate">
                    {hasCustomProfile ? (
                      <>Synced: <strong className="text-[#7C2D12] dark:text-white font-bold">{profile.fullName}</strong></>
                    ) : (
                      <>{isHindi ? 'सक्रिय डेमो प्रोफ़ाइल' : 'Loaded Profile: Vikram Sehgal'}</>
                    )}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={openProfileModal}
                  className="text-[10px] text-[#EA580C] dark:text-amber-400 hover:text-[#C2410C] uppercase tracking-wider font-extrabold cursor-pointer shrink-0 ml-2"
                >
                  {isHindi ? 'बदलें' : 'Switch'}
                </button>
              </div>

              {profileSavedFeedback && (
                <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{isHindi ? 'विवरण सुरक्षित कर लिया गया है!' : 'Saved to browser profile successfully!'}</span>
                </div>
              )}

              <form onSubmit={handleRecalculate} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9A3412] dark:text-amber-300 font-bold mb-1.5">
                    {isHindi ? 'पूरा नाम (दैनिक उपयोग वर्तनी) *' : 'Full Name (Everyday Casual/Legal Spelling) *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikram Sehgal"
                      className="w-full bg-[#FFF9F2] dark:bg-[#120401] border border-orange-200 dark:border-amber-900/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#7C2D12] dark:text-amber-100 placeholder-[#9A3412]/40 focus:outline-none focus:border-[#F97316] font-semibold"
                    />
                  </div>
                  <span className="text-[10px] text-[#9A3412]/80 dark:text-amber-300/60 block mt-1">
                    {isHindi ? 'कील्डियन पद्धति में 9 का अंक किसी अक्षर को नहीं दिया जाता है।' : 'Chaldean mapping: Letters mapped 1-8. Sacred 9 has no letter assigned.'}
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#9A3412] dark:text-amber-300 font-bold mb-1.5">
                    {isHindi ? 'जन्म तिथि (Date of Birth) *' : 'Date of Birth (YYYY-MM-DD) *'}
                  </label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-[#FFF9F2] dark:bg-[#120401] border border-orange-200 dark:border-amber-900/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#7C2D12] dark:text-amber-100 placeholder-[#9A3412]/40 focus:outline-none focus:border-[#F97316] font-semibold"
                  />
                  <span className="text-[10px] text-[#9A3412]/80 dark:text-amber-300/60 block mt-1">
                    {isHindi ? 'लो-शू चक्र में केवल जन्म तिथि के अंकों का प्रयोग होता है।' : 'Digits 1-9 from your birthdate populate the 3x3 Lo Shu Matrix.'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleSaveToProfile}
                    className="inline-flex items-center gap-1.5 text-xs text-[#9A3412] dark:text-amber-300 hover:text-[#EA580C] font-semibold transition-colors cursor-pointer"
                    title="Save this name and date to your device profile"
                  >
                    <Save className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>{isHindi ? 'प्रोफ़ाइल में सेव करें' : 'Save to Profile'}</span>
                  </button>

                  <span className="text-[10.5px] text-[#9A3412]/70 dark:text-amber-400/60 font-medium">
                    Auto-Calculated
                  </span>
                </div>

                {/* Primary Action Button: #F97316 (Vibrant Saffron) */}
                <button
                  type="submit"
                  id="numerology-calculate-btn"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer hover:scale-[1.01]"
                >
                  <Hash className="w-4 h-4 text-white" />
                  <span>{isHindi ? 'लो-शू व नाम तरंग पुनर्गणना' : 'Calculate Lo Shu Grid & Vibration'}</span>
                </button>
              </form>
            </div>

            {/* Chaldean Authentic Alphabet Guide Card */}
            <div className="bg-white/90 dark:bg-[#1C0702] p-4 sm:p-5 rounded-3xl border border-orange-200/90 dark:border-amber-900/70 text-xs shadow-md">
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-orange-100 dark:border-amber-900/60">
                <span className="font-playfair font-bold text-xs text-[#431407] dark:text-amber-100 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>Chaldean Alphabet Value Chart</span>
                </span>
                <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-[#7C2D12] dark:text-amber-300 font-bold px-2 py-0.5 rounded-md">
                  No 9 Value
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div className="p-1.5 rounded-lg bg-[#FFF7ED] dark:bg-[#250802] border border-orange-200/60 dark:border-amber-900/40">
                  <span className="font-bold text-[#EA580C] dark:text-amber-400 block text-xs">1</span>
                  <span className="text-[10px] text-[#7C2D12] dark:text-amber-200 font-medium">A, I, J, Q, Y</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FFF7ED] dark:bg-[#250802] border border-orange-200/60 dark:border-amber-900/40">
                  <span className="font-bold text-[#EA580C] dark:text-amber-400 block text-xs">2</span>
                  <span className="text-[10px] text-[#7C2D12] dark:text-amber-200 font-medium">B, K, R</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FFF7ED] dark:bg-[#250802] border border-orange-200/60 dark:border-amber-900/40">
                  <span className="font-bold text-[#EA580C] dark:text-amber-400 block text-xs">3</span>
                  <span className="text-[10px] text-[#7C2D12] dark:text-amber-200 font-medium">C, G, L, S</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FFF7ED] dark:bg-[#250802] border border-orange-200/60 dark:border-amber-900/40">
                  <span className="font-bold text-[#EA580C] dark:text-amber-400 block text-xs">4</span>
                  <span className="text-[10px] text-[#7C2D12] dark:text-amber-200 font-medium">D, M, T</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FFF7ED] dark:bg-[#250802] border border-orange-200/60 dark:border-amber-900/40">
                  <span className="font-bold text-[#EA580C] dark:text-amber-400 block text-xs">5</span>
                  <span className="text-[10px] text-[#7C2D12] dark:text-amber-200 font-medium">E, H, N, X</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FFF7ED] dark:bg-[#250802] border border-orange-200/60 dark:border-amber-900/40">
                  <span className="font-bold text-[#EA580C] dark:text-amber-400 block text-xs">6</span>
                  <span className="text-[10px] text-[#7C2D12] dark:text-amber-200 font-medium">U, V, W</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FFF7ED] dark:bg-[#250802] border border-orange-200/60 dark:border-amber-900/40">
                  <span className="font-bold text-[#EA580C] dark:text-amber-400 block text-xs">7</span>
                  <span className="text-[10px] text-[#7C2D12] dark:text-amber-200 font-medium">O, Z</span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#FFF7ED] dark:bg-[#250802] border border-orange-200/60 dark:border-amber-900/40">
                  <span className="font-bold text-[#EA580C] dark:text-amber-400 block text-xs">8</span>
                  <span className="text-[10px] text-[#7C2D12] dark:text-amber-200 font-medium">F, P</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Computed Blueprint & 3x3 Lo Shu Energy Grid */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white dark:bg-[#1C0702] rounded-3xl border border-orange-200 dark:border-amber-900/80 p-5 sm:p-7 shadow-xl space-y-6 animate-in fade-in duration-300">
              
              {/* Header Title for Report */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-orange-100 dark:border-amber-900/60 pb-4">
                <div>
                  <h3 className="font-playfair text-xl sm:text-2xl font-black text-[#431407] dark:text-amber-100">
                    {name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-[#9A3412] dark:text-amber-300/80">
                    <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>DOB: <strong className="text-[#7C2D12] dark:text-amber-200">{dob}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] uppercase tracking-wider font-extrabold text-[#EA580C] dark:text-amber-300 bg-orange-50 dark:bg-amber-950/80 px-3 py-1.5 rounded-xl border border-orange-200 dark:border-amber-800 flex items-center gap-1.5 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-[#F97316]" />
                    <span>{mulankPlanet.planet}</span>
                  </span>
                </div>
              </div>

              {/* 3 Core Pillar Numbers: Mulank, Bhagyank, Name Compound/Root */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                {/* Mulank (Driver) */}
                <div className="bg-gradient-to-b from-[#FFF7ED] to-white dark:from-[#250802] dark:to-[#1C0702] p-4 rounded-2xl border border-orange-200 dark:border-amber-900/80 text-center shadow-2xs relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#ECC94B] text-[#7C2D12] uppercase tracking-wider shadow-2xs">
                      Driver
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#9A3412] dark:text-amber-400 uppercase tracking-wider block mb-1">
                    {isHindi ? 'मूलांक (Driver)' : 'Mulank (Driver)'}
                  </span>
                  <div className="font-playfair text-4xl font-black text-[#EA580C] dark:text-amber-300 my-0.5">
                    {mulank}
                  </div>
                  <span className="text-[11px] font-bold text-[#7C2D12] dark:text-amber-200 block">
                    {mulankPlanet.planet.split(' ')[0]}
                  </span>
                  <span className="text-[9.5px] text-[#9A3412] dark:text-amber-400/80 block mt-0.5">
                    Birth Day Sum
                  </span>
                </div>

                {/* Bhagyank (Conductor / Destiny) */}
                <div className="bg-gradient-to-b from-[#FFF7ED] to-white dark:from-[#250802] dark:to-[#1C0702] p-4 rounded-2xl border border-orange-200 dark:border-amber-900/80 text-center shadow-2xs relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#ECC94B] text-[#7C2D12] uppercase tracking-wider shadow-2xs">
                      Destiny
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#9A3412] dark:text-amber-400 uppercase tracking-wider block mb-1">
                    {isHindi ? 'भाग्यांक (Destiny)' : 'Bhagyank (Destiny)'}
                  </span>
                  <div className="font-playfair text-4xl font-black text-[#EA580C] dark:text-amber-300 my-0.5">
                    {bhagyank}
                  </div>
                  <span className="text-[11px] font-bold text-[#7C2D12] dark:text-amber-200 block">
                    {bhagyankPlanet.planet.split(' ')[0]}
                  </span>
                  <span className="text-[9.5px] text-[#9A3412] dark:text-amber-400/80 block mt-0.5">
                    Total DOB Sum
                  </span>
                </div>

                {/* Name Vibration (Compound & Single Digit Root) */}
                <div className="bg-gradient-to-b from-[#FFF7ED] to-white dark:from-[#250802] dark:to-[#1C0702] p-4 rounded-2xl border border-orange-200 dark:border-amber-900/80 text-center shadow-2xs relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-orange-200 dark:bg-amber-900 text-[#7C2D12] dark:text-amber-200 uppercase tracking-wider shadow-2xs">
                      Chaldean
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#9A3412] dark:text-amber-400 uppercase tracking-wider block mb-1">
                    {isHindi ? 'नाम तरंग (Name Vibration)' : 'Name Vibration'}
                  </span>
                  <div className="font-playfair text-3xl sm:text-4xl font-black text-[#EA580C] dark:text-amber-300 my-0.5 flex items-center justify-center gap-1.5">
                    <span>{nameCalc.compound}</span>
                    <span className="text-sm font-sans text-[#9A3412] dark:text-amber-400 font-bold">&rarr;</span>
                    <span className="text-[#431407] dark:text-white">{nameCalc.root}</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#7C2D12] dark:text-amber-200 block">
                    Compound {nameCalc.compound} (Root {nameCalc.root})
                  </span>
                  <span className="text-[9.5px] text-[#9A3412] dark:text-amber-400/80 block mt-0.5">
                    {namePlanet.planet.split(' ')[0]} Lord
                  </span>
                </div>

              </div>

              {/* Harmonic / Enemy Vibration Status Banner */}
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
                harmony.score === 'Harmonious'
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : harmony.score === 'Friction'
                    ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                    : 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              }`}>
                {harmony.score === 'Harmonious' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : harmony.score === 'Friction' ? (
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="font-extrabold uppercase tracking-wider text-[11px]">
                      {harmony.score === 'Harmonious' ? 'Harmonious Alignment (शुभ सामंजस्य)' : harmony.score === 'Friction' ? 'Vibrational Friction (नाम दोष/विरोध)' : 'Supportive Vibration (तटस्थ/संतुलित)'}
                    </strong>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/80 dark:bg-black/40 border border-current/20">
                      Mulank: {harmony.mulankRel} | Bhagyank: {harmony.bhagyankRel}
                    </span>
                  </div>
                  <p className="font-normal text-xs">{harmony.summary}</p>
                  <p className="text-[11px] opacity-90">{harmony.advice}</p>
                </div>
              </div>

              {/* View Switcher Tabs: 3x3 Lo Shu Grid / 8 Planes / Missing Remedies */}
              <div className="flex items-center justify-between border-b border-orange-200 dark:border-amber-900/60 pb-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('grid')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'grid'
                        ? 'bg-[#EA580C] text-white shadow-xs'
                        : 'bg-orange-50 dark:bg-amber-950 text-[#7C2D12] dark:text-amber-300 hover:bg-orange-100'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Lo Shu 3x3 Grid</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('planes')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'planes'
                        ? 'bg-[#EA580C] text-white shadow-xs'
                        : 'bg-orange-50 dark:bg-amber-950 text-[#7C2D12] dark:text-amber-300 hover:bg-orange-100'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>8 Planes & Yogas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('remedies')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'remedies'
                        ? 'bg-[#EA580C] text-white shadow-xs'
                        : 'bg-orange-50 dark:bg-amber-950 text-[#7C2D12] dark:text-amber-300 hover:bg-orange-100'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Missing Remedies ({loShu.missingNumbers.length})</span>
                  </button>
                </div>

                <span className="text-[10px] text-[#9A3412] dark:text-amber-400 font-bold hidden sm:inline">
                  3x3 Cosmic Matrix
                </span>
              </div>

              {/* TAB 1: Lo Shu 3x3 Grid Container (Exact Requested Palette) */}
              {activeTab === 'grid' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#EA580C] dark:text-amber-400">
                      Standard 3x3 Lo Shu Energy Chart (लो शू चक्र)
                    </span>
                    <span className="text-[10.5px] text-[#9A3412] dark:text-amber-300/80">
                      Populated from DOB digits exclusively
                    </span>
                  </div>

                  {/* 
                    Exact Requested Style Specification:
                    Outer Grid Border: #C05621 (Deep Terracotta) - 2px solid border
                    Inner Cell Borders: #FBD38D (Soft Amber) - 1px solid border
                    Grid Background: #FFF8F1 (Cosmic Cream)
                  */}
                  <div 
                    id="lo-shu-energy-grid"
                    className="border-2 border-[#C05621] bg-[#FFF8F1] dark:bg-[#2D241E] rounded-2xl p-2.5 sm:p-3.5 shadow-lg max-w-sm mx-auto"
                  >
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {loShuLayout.map((row, rIdx) =>
                        row.map((num) => {
                          const count = loShu.digitCounts[num] || 0;
                          const isPresent = count > 0;
                          const isSacred = num === mulank || num === bhagyank;

                          return (
                            <div
                              key={num}
                              className={`relative rounded-xl border border-[#FBD38D] dark:border-[#7C2D12] p-3 sm:p-4 flex flex-col items-center justify-center transition-all min-h-[80px] sm:min-h-[96px] ${
                                isPresent
                                  ? 'bg-[#FFEDD5] dark:bg-[#431407] shadow-xs'
                                  : 'bg-[#FAF5F0] dark:bg-[#1E1712]'
                              }`}
                            >
                              {/* Sacred Number Badge (#ECC94B Vedic Gold) */}
                              {isSacred && isPresent && (
                                <div className="absolute top-1 right-1">
                                  <span 
                                    className="text-[8.5px] font-extrabold px-1.5 py-0.2 rounded-md bg-[#ECC94B] text-[#7C2D12] uppercase tracking-wider shadow-xs"
                                    title={num === mulank ? 'Mulank (Driver)' : 'Bhagyank (Destiny)'}
                                  >
                                    {num === mulank ? 'M' : 'B'}
                                  </span>
                                </div>
                              )}

                              {isPresent ? (
                                <>
                                  {/* Populated Number: #7B341E (Dark Clay) */}
                                  <div className="font-playfair text-2xl sm:text-3xl font-black text-[#7B341E] dark:text-[#FBD38D] tracking-wider">
                                    {Array.from({ length: count }).map((_, i) => (
                                      <span key={i} className="inline-block mx-0.5">{num}</span>
                                    ))}
                                  </div>
                                  <span className="text-[10px] font-sans font-bold text-[#7B341E] dark:text-[#FBD38D]/90 mt-1">
                                    {count}x in DOB
                                  </span>
                                </>
                              ) : (
                                <>
                                  {/* Missing Number: #D6BCB3 (Faded Clay) */}
                                  <span className="font-playfair text-2xl sm:text-3xl font-bold text-[#D6BCB3] dark:text-[#5C4538]">
                                    {num}
                                  </span>
                                  <span className="text-[9.5px] font-sans text-[#D6BCB3] dark:text-[#5C4538] mt-1 font-medium">
                                    Missing
                                  </span>
                                </>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Grid Axis Descriptions */}
                    <div className="mt-3 pt-2.5 border-t border-[#FBD38D] dark:border-[#7C2D12] flex items-center justify-between text-[9.5px] text-[#7B341E] dark:text-[#FBD38D] font-bold px-1">
                      <span>Row 1: Mental (4-9-2)</span>
                      <span>Row 2: Emotional (3-5-7)</span>
                      <span>Row 3: Practical (8-1-6)</span>
                    </div>
                  </div>

                  {/* Summary of Present vs Missing */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-800 dark:text-emerald-300 block mb-1">
                        Active Cosmic Energies ({loShu.presentNumbers.length}/9)
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {loShu.presentNumbers.map((n) => (
                          <span key={n} className="px-2 py-0.5 rounded-md bg-white dark:bg-emerald-900 border border-emerald-300 font-bold text-emerald-900 dark:text-emerald-100 text-xs">
                            {n} ({loShu.digitCounts[n]}x)
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-orange-50 dark:bg-amber-950/40 border border-orange-200 dark:border-amber-800">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#EA580C] dark:text-amber-300 block mb-1">
                        Missing Grid Energies ({loShu.missingNumbers.length}/9)
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {loShu.missingNumbers.map((n) => (
                          <span key={n} className="px-2 py-0.5 rounded-md bg-white dark:bg-orange-950 border border-orange-300 font-bold text-[#EA580C] dark:text-amber-300 text-xs">
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: 8 Planes & Yogas Analysis */}
              {activeTab === 'planes' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="text-xs text-[#9A3412] dark:text-amber-300/80 mb-2">
                    Lo Shu 3x3 alignments indicate complete lines of energy (Planes of Intellect, Willpower, Action, and Raj Yogas):
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {loShu.planes.map((plane, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-2xl border text-xs space-y-1 ${
                          plane.status === 'Complete'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100 shadow-2xs'
                            : plane.status === 'Partial'
                              ? 'bg-[#FFF7ED] dark:bg-[#250802] border-orange-200 dark:border-amber-900/60 text-[#7C2D12] dark:text-amber-200'
                              : 'bg-stone-50 dark:bg-[#1A0905] border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 opacity-80'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-playfair font-bold text-xs">
                            {plane.name}
                          </span>
                          <span className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            plane.status === 'Complete'
                              ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100'
                              : plane.status === 'Partial'
                                ? 'bg-orange-200 dark:bg-amber-900 text-[#7C2D12] dark:text-amber-200'
                                : 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                          }`}>
                            {plane.status} ({plane.numbers.join('-')})
                          </span>
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-90">{plane.meaning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Missing Numbers & Practical Lal Kitab Remedies */}
              {activeTab === 'remedies' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="text-xs text-[#9A3412] dark:text-amber-300/80 mb-1">
                    Authentic Lal Kitab and elemental remedies to activate missing numeric vibrations in your living space and daily routine:
                  </div>

                  {loShu.missingNumbers.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 text-center text-xs text-emerald-800 font-bold">
                      Full Balanced Lo Shu Matrix: No missing numbers in your birth date!
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {loShu.missingNumbers.map((num) => {
                        const rem = LO_SHU_MISSING_REMEDIES[num];
                        if (!rem) return null;
                        return (
                          <div
                            key={num}
                            className="p-3.5 rounded-2xl bg-[#FFF8F1] dark:bg-[#250802] border border-orange-200 dark:border-amber-900/80 text-xs text-[#7C2D12] dark:text-amber-100 flex items-start gap-3 shadow-2xs"
                          >
                            <div className="w-8 h-8 rounded-xl bg-[#F97316] text-white flex items-center justify-center font-playfair font-black text-base shrink-0 shadow-2xs">
                              {num}
                            </div>
                            <div className="space-y-1 flex-1">
                              <div className="flex flex-wrap items-center justify-between gap-1">
                                <span className="font-bold text-[#EA580C] dark:text-amber-300">
                                  Missing Number {num} &bull; {rem.element} ({rem.zone})
                                </span>
                                <span className="text-[10px] text-[#9A3412] dark:text-amber-400 font-medium">
                                  Lal Kitab Farman Remedy
                                </span>
                              </div>
                              <p className="text-[11.5px] leading-relaxed text-[#431407] dark:text-amber-100/90 font-normal">
                                {isHindi ? rem.hindiRemedy : rem.remedy}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Chaldean Letter-by-Letter Breakdown Cards */}
              <div className="p-4 rounded-2xl bg-[#FFF7ED] dark:bg-[#250802] border border-orange-200 dark:border-amber-900/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-extrabold text-[#9A3412] dark:text-amber-300 uppercase tracking-widest block">
                    Letter-by-Letter Chaldean Frequency ({nameCalc.breakdown.length} Letters):
                  </span>
                  <span className="text-[10.5px] font-bold text-[#EA580C] dark:text-amber-400">
                    Compound: {nameCalc.compound}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {nameCalc.breakdown.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-[#180501] px-2.5 py-1.5 rounded-xl text-xs border border-orange-200 dark:border-amber-900 text-center shadow-2xs min-w-[36px]"
                    >
                      <span className="text-[#431407] dark:text-amber-100 font-bold block">{item.char}</span>
                      <span className="text-[11px] text-[#EA580C] dark:text-amber-400 font-extrabold">{item.val}</span>
                    </div>
                  ))}
                </div>

                {nameCalc.meaning && (
                  <div className="pt-2 border-t border-orange-200/70 dark:border-amber-900/60 text-xs">
                    <span className="font-extrabold text-[#7C2D12] dark:text-amber-200">
                      Compound {nameCalc.compound} - {nameCalc.meaning.title}:
                    </span>{' '}
                    <span className="text-[#9A3412] dark:text-amber-300/90 font-normal">
                      {nameCalc.meaning.summary}
                    </span>
                  </div>
                )}
              </div>

              {/* Pre-Consultation CTA with Dr. Preeti Sehgal */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-orange-200 dark:border-amber-900/80">
                <div className="text-xs text-[#9A3412] dark:text-amber-300/90">
                  <span className="font-bold text-[#7C2D12] dark:text-amber-200 block">
                    {isHindi ? 'व्यापारिक या नवजात शिशु नाम संशोधन की आवश्यकता है?' : 'Need Professional Name Correction or Business Alignment?'}
                  </span>
                  <span className="text-[11px]">
                    {isHindi ? 'डॉ. प्रीति सहगल द्वारा व्यक्तिगत अंकशास्त्र परामर्श प्राप्त करें।' : 'Dr. Preeti Sehgal provides tailored Chaldean compound corrections.'}
                  </span>
                </div>

                <button
                  type="button"
                  id="numerology-book-cta-btn"
                  onClick={() => onOpenBooking('numerology')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer shadow-md shadow-orange-500/20 hover:scale-105 shrink-0"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>{isHindi ? 'नाम संशोधन बुक करें' : 'Book Name Correction'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
