import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LAL_KITAB_REMEDIES_DATA, DOCTOR_INFO } from '../data/brandData';
import { StaggeredHeading, MysticHighlight } from './typography';
import { BookOpen, ShieldAlert, Sparkles, Clock, AlertTriangle, Calendar, CheckCircle2, ArrowRight, MessageCircle, Copy, Check, Filter, Compass, Flame, ShieldCheck, Search, X } from 'lucide-react';

interface LalKitabRemediesProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const LalKitabRemedies: React.FC<LalKitabRemediesProps> = ({ onOpenBooking }) => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCycleTracker, setShowCycleTracker] = useState<boolean>(false);
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  const categories = [
    { id: 'all', label: 'All Remedies' },
    { id: 'wealth', label: 'Wealth & Debt' },
    { id: 'marriage', label: 'Marriage & Love' },
    { id: 'career', label: 'Job & Business' },
    { id: 'protection', label: 'Nazar & Evil Eye' },
    { id: 'children', label: 'Children & Studies' },
    { id: 'health', label: 'Health & Stress' }
  ];

  const planets = [
    { id: 'all', symbol: '✦', name: 'All Grahas' },
    { id: 'Sun', symbol: '☉', name: 'Sun (सूर्य)' },
    { id: 'Moon', symbol: '☽', name: 'Moon (चंद्र)' },
    { id: 'Mars', symbol: '♂', name: 'Mars (मंगल)' },
    { id: 'Mercury', symbol: '☿', name: 'Mercury (बुध)' },
    { id: 'Jupiter', symbol: '♃', name: 'Jupiter (बृहस्पति)' },
    { id: 'Venus', symbol: '♀', name: 'Venus (शुक्र)' },
    { id: 'Saturn', symbol: '♄', name: 'Saturn (शनि)' },
    { id: 'Rahu', symbol: '☊', name: 'Rahu (राहु)' },
    { id: 'Ketu', symbol: '☋', name: 'Ketu (केतु)' },
  ];

  const filteredRemedies = LAL_KITAB_REMEDIES_DATA.filter((item) => {
    const matchCategory = selectedTab === 'all' || item.category === selectedTab;
    const matchPlanet = selectedPlanet === 'all' || item.planet.toLowerCase().includes(selectedPlanet.toLowerCase());
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.remedy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.planet.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchPlanet && matchSearch;
  });

  const handleCopyRemedy = (item: typeof LAL_KITAB_REMEDIES_DATA[0]) => {
    const text = `*Lal Kitab Remedy: ${item.title} (${item.hindiTitle})*
• Planet: ${item.planet}
• When: ${item.issue}
• Prescription: ${item.remedy}
• Duration: ${item.duration}
• Precautions: ${item.precautions.join(', ')}

Prescribed by Dr. Preeti Sehgal (drpreetisehgal.com)`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleWhatsAppRemedyHelp = (remedyTitle: string) => {
    const msg = `Namaste Dr. Preeti Sehgal ji, I read about the Lal Kitab remedy for "${remedyTitle}". Could you please guide me on how to perform it accurately for my birth chart?`;
    window.open(`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const toggleDay = (day: number) => {
    if (checkedDays.includes(day)) {
      setCheckedDays(checkedDays.filter((d) => d !== day));
    } else {
      setCheckedDays([...checkedDays, day]);
    }
  };

  // Smooth story fade & slide-up animation variant
  const narrativeVariant = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.75, ease: "easeOut" as const }
    }
  };

  return (
    <section id="lalkitab" className="py-16 sm:py-24 bg-[#FFF9F2] text-[#7C2D12] border-b border-orange-200/80 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* NARRATIVE ACT 1: The Cosmic Origins & Diagnostic Science */}
        {/* ========================================================================= */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={narrativeVariant}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-orange-50 px-3.5 py-1 rounded-full text-[11px] font-medium text-[#C2410C] tracking-[0.2em] uppercase mb-4 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Chapter I &bull; The Science of Lal Kitab Farman</span>
          </div>
          <StaggeredHeading
            text="The Ancient Art of Karmic Reprogramming"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-normal text-[#7C2D12] tracking-tight"
            goldAccentWords={['Karmic', 'Reprogramming']}
            staggerDelay={0.04}
          />
          <p className="text-[#9A3412] mt-3 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Unlike classical Vedic rituals that require extensive hawans, <MysticHighlight tooltip="Ancient 1939-1952 Farman principles of cosmic remedies">Lal Kitab</MysticHighlight> operates through the laws of <MysticHighlight tooltip="Substituting planetary elemental vibrations via natural offerings">elemental substitution</MysticHighlight> and <MysticHighlight tooltip="Conscious action aligning with planetary energies">behavioral karma</MysticHighlight>. Prescribed with clinical precision by Dr. Preeti Sehgal.
          </p>
        </motion.div>

        {/* Narrative Visual Story Block (Image + Flow Cards) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={narrativeVariant}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 bg-white rounded-3xl border border-orange-200 p-6 sm:p-10 shadow-lg"
        >
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-orange-200 group shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800" 
              alt="Sacred Lal Kitab Scripture & Cosmic Glyphs" 
              className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#431407] via-[#431407]/75 to-transparent flex flex-col justify-end p-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFEDD5] bg-[#7C2D12]/90 backdrop-blur px-2.5 py-1 rounded-full self-start mb-2 border border-orange-300/40 shadow-xs">
                1939-1952 Farman Texts
              </span>
              <h4 className="font-playfair text-xl text-white font-bold drop-shadow-md text-shadow-contrast">
                "Kismat Ka Lekha Badal Sakta Hai"
              </h4>
              <p className="text-xs text-orange-100 font-medium mt-1 drop-shadow-sm leading-relaxed">
                Planetary remedies that transform unalterable fate into pliable destiny.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="border-b border-orange-200 pb-3">
              <h3 className="font-playfair text-xl sm:text-2xl text-[#431407] font-bold">
                The Three Pillars of Lal Kitab Diagnosis
              </h3>
              <p className="text-xs sm:text-sm text-[#7C2D12] font-medium mt-1">
                How Dr. Preeti Sehgal identifies root cause rather than treating symptoms:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-orange-50/80 p-4 rounded-xl border border-orange-200 space-y-1.5 shadow-xs">
                <div className="text-[#C2410C] font-bold text-xs flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>1. Pakka Ghar</span>
                </div>
                <p className="text-xs text-[#431407] font-normal leading-relaxed">
                  Analyzing the permanent planetary ruler of each house to detect natural allies and enemies.
                </p>
              </div>

              <div className="bg-orange-50/80 p-4 rounded-xl border border-orange-200 space-y-1.5 shadow-xs">
                <div className="text-[#C2410C] font-bold text-xs flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>2. Rin Kundli (Debts)</span>
                </div>
                <p className="text-xs text-[#431407] font-normal leading-relaxed">
                  Pinpointing ancestral karmic debts (Pitri Rin, Matri Rin, Stri Rin) that block growth.
                </p>
              </div>

              <div className="bg-orange-50/80 p-4 rounded-xl border border-orange-200 space-y-1.5 shadow-xs">
                <div className="text-[#C2410C] font-bold text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>3. Varshphal Upays</span>
                </div>
                <p className="text-xs text-[#431407] font-normal leading-relaxed">
                  Calculating active annual transit remedies triggered on each exact solar return birthday.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* NARRATIVE ACT 2: The 43-Day Reprogramming Cycle Tracker */}
        {/* ========================================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={narrativeVariant}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12"
        >
          <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-md">
            <div className="font-playfair text-sm font-semibold text-[#7C2D12] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F97316]" />
              <span>Logic-Based Action (Karma)</span>
            </div>
            <p className="text-xs text-[#9A3412] leading-relaxed font-light">
              Lal Kitab remedies adjust planetary frequencies through daily elements, donations, and behavioral shifts rather than fear.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-md flex flex-col justify-between">
            <div>
              <div className="font-playfair text-sm font-semibold text-[#7C2D12] mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F97316]" />
                <span>The 43-Day Cycle (चक्र)</span>
              </div>
              <p className="text-xs text-[#9A3412] leading-relaxed font-light mb-3">
                Standard Lal Kitab upays run for 40 to 43 consecutive sunrise cycles to completely reprogram stagnant house vibrations.
              </p>
            </div>
            <button
              onClick={() => setShowCycleTracker(!showCycleTracker)}
              className="inline-flex items-center gap-1.5 text-xs text-[#F97316] hover:text-[#EA580C] uppercase tracking-wider font-semibold cursor-pointer"
            >
              <span>{showCycleTracker ? 'Close 43-Day Tracker' : 'Open 43-Day Tracker Tool'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-md">
            <div className="font-playfair text-sm font-semibold text-[#7C2D12] mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#F97316]" />
              <span>Custom Varshphal Analysis</span>
            </div>
            <p className="text-xs text-[#9A3412] leading-relaxed font-light">
              Every birthday triggers a new Lal Kitab annual chart. What worked last year may need replacement in the new annual cycle.
            </p>
          </div>
        </motion.div>

        {/* 43-Day Interactive Cycle Tracker Modal / Box */}
        {showCycleTracker && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-14 bg-white border border-orange-300 rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-orange-200">
              <div>
                <h3 className="font-playfair text-lg font-semibold text-[#7C2D12] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#F97316]" />
                  <span>43-Day Consecutive Remedy Tracker (४३ दिवसीय नियम चक्र)</span>
                </h3>
                <p className="text-xs text-[#9A3412] font-light mt-0.5">
                  Lal Kitab rule: The cycle must not break. Check off each completed sunrise remedy day.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#C2410C] bg-orange-50 px-3 py-1 rounded-full border border-orange-300">
                  Completed: {checkedDays.length} / 43 Days
                </span>
                <button
                  onClick={() => setCheckedDays([])}
                  className="text-[10px] text-[#9A3412] hover:text-[#7C2D12] uppercase tracking-wider underline cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Grid of 43 Days */}
            <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2">
              {Array.from({ length: 43 }, (_, i) => i + 1).map((day) => {
                const isChecked = checkedDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`h-9 rounded-lg border text-xs font-medium transition-all flex items-center justify-center cursor-pointer ${
                      isChecked
                        ? 'bg-[#F97316] text-white border-[#F97316] shadow-sm font-bold'
                        : 'bg-orange-50/50 border-orange-200 text-[#7C2D12] hover:border-orange-400 hover:bg-orange-100/60'
                    }`}
                  >
                    {isChecked ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : `D${day}`}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* NARRATIVE ACT 3: Interactive Remedy Directory & Filters */}
        {/* ========================================================================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={narrativeVariant}
        >
          {/* Navagraha Planetary Filter Strip */}
          <div className="mb-6 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-[10px] uppercase tracking-widest text-[#9A3412] flex items-center gap-1 mr-1">
                <Filter className="w-3 h-3 text-[#F97316]" /> Filter By Graha:
              </span>
              {planets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlanet(p.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer group emoji-bounce-hover ${
                    selectedPlanet === p.id
                      ? 'bg-[#F97316] text-white font-semibold shadow-md ring-2 ring-orange-300'
                      : 'bg-white border border-orange-200 text-[#7C2D12] hover:border-orange-400 hover:bg-orange-50'
                  }`}
                >
                  <span className="text-[#F97316] font-bold group-hover:text-white emoji-bounce-child transition-transform">{p.symbol}</span>
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category Selector & Search with Expanding Animated Glow Bar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTab(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs tracking-wider uppercase font-medium transition-all cursor-pointer ${
                    selectedTab === cat.id
                      ? 'bg-[#F97316] text-white font-semibold shadow-md ring-2 ring-orange-300'
                      : 'bg-white border border-orange-200 text-[#7C2D12] hover:border-orange-400 hover:bg-orange-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Animated Search Bar: Expands on Focus + Glowing Border */}
            <div className="relative w-full sm:w-72 sm:focus-within:w-96 transition-all duration-300 ease-out search-glow-focused">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#F97316] absolute left-3.5 pointer-events-none transition-transform group-focus-within:scale-110" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search remedy, planet, or issue..."
                  className="w-full bg-white border border-orange-300 focus:border-[#F97316] rounded-xl pl-9 pr-8 py-2.5 text-xs text-[#7C2D12] placeholder-orange-900/40 focus:outline-none transition-all duration-300 shadow-xs"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 text-orange-400 hover:text-[#7C2D12] p-1 rounded-full hover:bg-orange-100 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Remedy Cards Grid with Slide-up Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRemedies.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-white rounded-2xl border border-orange-200 p-6 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20 hover:border-orange-400 flex flex-col justify-between group"
              >
                <div>
                  {/* Header Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#C2410C] border border-orange-300 bg-orange-50 px-2.5 py-0.5 rounded-full">
                      {item.planet}
                    </span>
                    <span className="text-[11px] text-[#9A3412] font-light flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F97316]" /> {item.duration}
                    </span>
                  </div>

                  <h3 className="font-playfair text-lg font-bold text-[#431407] mb-1 group-hover:text-[#EA580C] transition-colors">
                    {item.title}
                  </h3>
                  <h4 className="font-marcellus text-xs text-[#C2410C] font-bold mb-3">
                    {item.hindiTitle}
                  </h4>

                  {/* The Issue Box */}
                  <div className="p-3.5 rounded-xl bg-orange-50/80 border border-orange-200 text-xs sm:text-sm text-[#431407] font-normal mb-3 shadow-xs">
                    <strong className="text-[#7C2D12] block mb-1 font-bold uppercase tracking-wider text-[10px]">When to perform:</strong>
                    {item.issue}
                  </div>

                  {/* The Remedy Itself */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-50/80 border border-orange-200 text-xs sm:text-sm text-[#431407] leading-relaxed mb-3 shadow-xs">
                    <div className="font-bold text-[#C2410C] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                      <span>Lal Kitab Prescription:</span>
                    </div>
                    <p className="font-normal">{item.remedy}</p>
                  </div>

                  {/* Precautions */}
                  <div className="space-y-1.5 text-xs text-[#7C2D12] mb-4">
                    <span className="font-bold text-[#C2410C] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#F97316]" /> Essential Rules (परहेज):
                    </span>
                    {item.precautions.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 pl-1 text-[#431407] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3.5 border-t border-orange-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopyRemedy(item)}
                      className="p-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#431407] border border-orange-300 transition-colors cursor-pointer"
                      title="Copy Remedy"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-[#7C2D12]" />
                      )}
                    </button>

                    <button
                      onClick={() => handleWhatsAppRemedyHelp(item.title)}
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#C2410C] hover:text-[#431407] bg-orange-50 hover:bg-orange-100 px-3 py-2 rounded-xl border border-orange-300 cursor-pointer transition-colors font-bold whatsapp-glow-hover"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#F97316]" />
                      <span>Ask Astrologer</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onOpenBooking('lal-kitab')}
                    className="text-xs uppercase tracking-wider font-bold py-2.5 px-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white transition-colors cursor-pointer flex items-center gap-1 shadow-xs cta-glow-hover"
                  >
                    <span>Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Warning Callout Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-orange-100/90 via-amber-50 to-orange-100/90 border border-orange-300 text-[#7C2D12] text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md">
            <div className="flex items-center gap-3.5">
              <AlertTriangle className="w-6 h-6 text-[#F97316] flex-shrink-0" />
              <div>
                <strong className="text-[#C2410C] block font-playfair text-sm font-semibold uppercase tracking-wider mb-0.5">Important Astrological Warning:</strong>
                <span className="text-[#9A3412] font-light leading-relaxed">Never perform Lal Kitab remedies blindly from online hearsay. A remedy suited for Aries Lagna can backfire if your Mars is seated in the 8th House. Always consult Dr. Preeti Sehgal for a customized chart verification before initiating 43-day remedies.</span>
              </div>
            </div>
            <button
              onClick={() => onOpenBooking('lal-kitab')}
              className="flex-shrink-0 bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase shadow transition-colors cursor-pointer cta-glow-hover"
            >
              Consult Dr. Preeti Sehgal
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

