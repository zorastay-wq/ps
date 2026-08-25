import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Home, Compass, Sparkles, CheckCircle2, AlertTriangle, Calendar, ArrowRight, ShieldCheck, Layers, Eye, Wind, Flame, Mountain, Orbit, Box } from 'lucide-react';
import { VASTU_ZONES_DATA } from '../data/brandData';
import { VastuZone } from '../types';
import { VastuCompass3D } from './3d/VastuCompass3D';
import { VastuEntranceGrid } from './VastuEntranceGrid';
import { InteractiveVastuGrid } from './InteractiveVastuGrid';
import { VastuRemedyGallery } from './VastuRemedyGallery';
import { StaggeredHeading, MysticHighlight } from './typography';

interface VastuGuideProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const VastuGuide: React.FC<VastuGuideProps> = ({ onOpenBooking }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Parallax Scroll Tracking for Vastu Section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Cosmic Background Parallax Layers
  const yNebulaGlow = useTransform(scrollYProgress, [0, 1], [-45, 55]);
  const yMagneticVectors = useTransform(scrollYProgress, [0, 1], [-70, 75]);
  const yCardinalConstellations = useTransform(scrollYProgress, [0, 1], [-95, 105]);
  const rotateVastuMandala = useTransform(scrollYProgress, [0, 1], [15, -20]);
  const yFloatingElementalNodes = useTransform(scrollYProgress, [0, 1], [-115, 125]);
  const opacityConstellation = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.15, 0.45, 0.45, 0.15]);

  const [selectedZone, setSelectedZone] = useState<VastuZone>(VASTU_ZONES_DATA[0]);
  const [compassAngle, setCompassAngle] = useState<number>(0);

  const directionAngles: Record<string, number> = {
    'North-East (ईशान कोण)': 45,
    'East (पूर्व)': 90,
    'South-East (आग्नेय कोण)': 135,
    'South (दक्षिण)': 180,
    'South-West (नैऋत्य कोण)': 225,
    'West (पश्चिम)': 270,
    'North-West (वायव्य कोण)': 315,
    'North (उत्तर)': 0,
    'Center (ब्रह्मस्थान - Brahmasthan)': 0
  };

  const handleSelectZone = (zone: VastuZone) => {
    setSelectedZone(zone);
    setCompassAngle(directionAngles[zone.direction] || 0);
  };

  const narrativeVariant = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.75, ease: "easeOut" as const }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="vastu-shastra" 
      className="w-full relative z-30 bg-[#FFFDF9] dark:bg-[#120400] py-16 sm:py-24 text-[#7C2D12] dark:text-amber-100 border-b border-orange-200 dark:border-amber-950/80 transition-colors duration-300"
    >
      
      {/* 1. Deep Cosmic Nebula Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        <div className="absolute top-1/3 -left-10 w-96 h-96 bg-[#F97316]/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 -right-10 w-80 h-80 bg-[#EA580C]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-[#FBBF24]/10 rounded-full blur-[100px]" />
      </div>

      {/* 2. Vastu Purusha Mandala & Sacred Compass Rings (Rotation + Scroll Parallax) */}
      <motion.div
        style={{ y: yMagneticVectors, rotate: rotateVastuMandala, opacity: opacityConstellation }}
        className="absolute -top-20 -right-20 sm:-top-32 sm:-right-32 w-80 h-80 sm:w-[500px] sm:h-[500px] pointer-events-none z-0 will-change-transform text-[#F97316]"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke="currentColor">
          {/* Ashta Dikpala 8-directional compass grid */}
          <circle cx="200" cy="200" r="190" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.6" />
          <circle cx="200" cy="200" r="150" strokeWidth="0.6" opacity="0.7" />
          <circle cx="200" cy="200" r="100" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.75" />
          <circle cx="200" cy="200" r="50" strokeWidth="0.6" opacity="0.6" />
          {/* 8 Cardinal & Diagonal Rays */}
          <line x1="200" y1="10" x2="200" y2="390" strokeWidth="0.7" opacity="0.6" />
          <line x1="10" y1="200" x2="390" y2="200" strokeWidth="0.7" opacity="0.6" />
          <line x1="65" y1="65" x2="335" y2="335" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
          <line x1="65" y1="335" x2="335" y2="65" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.5" />
          {/* Vastu 9-Grid Brahmasthan Matrix */}
          <rect x="100" y="100" width="200" height="200" strokeWidth="0.6" opacity="0.5" />
          <line x1="166" y1="100" x2="166" y2="300" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
          <line x1="233" y1="100" x2="233" y2="300" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
          <line x1="100" y1="166" x2="300" y2="166" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
          <line x1="100" y1="233" x2="300" y2="233" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
        </svg>
      </motion.div>

      {/* 3. Dhruva Tara (North Pole Star) & Ashta Dikpala Constellations (Parallax Layer 1) */}
      <motion.div
        style={{ y: yCardinalConstellations }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <svg className="w-full h-full text-[#F97316] opacity-35" fill="none" stroke="currentColor">
          {/* North Direction Dhruva Tara Constellation Cluster (Top Left) */}
          <polyline points="80,120 140,80 220,100 270,160 210,210 140,80" strokeWidth="0.7" strokeDasharray="3 3" />
          <circle cx="80" cy="120" r="2.5" fill="#FBBF24" />
          <circle cx="140" cy="80" r="3.5" fill="#F59E0B" className="animate-pulse" />
          <circle cx="220" cy="100" r="2.5" fill="#F97316" />
          <circle cx="270" cy="160" r="3" fill="#FBBF24" />
          <circle cx="210" cy="210" r="2" fill="#F97316" />

          {/* South-East Agni Vector Constellation (Bottom Right) */}
          <polyline points="820,720 890,660 970,690 1020,630 1080,670 1050,750 970,690" strokeWidth="0.7" strokeDasharray="3 2" />
          <circle cx="820" cy="720" r="2" fill="#F97316" />
          <circle cx="890" cy="660" r="3" fill="#FBBF24" />
          <circle cx="970" cy="690" r="3.5" fill="#F59E0B" />
          <circle cx="1020" cy="630" r="2" fill="#F97316" />
          <circle cx="1080" cy="670" r="3" fill="#FBBF24" />
          <circle cx="1050" cy="750" r="2.5" fill="#F97316" />
        </svg>
      </motion.div>

      {/* 4. Pancha Mahabhuta (Five Elemental Cosmic Nodes) Floating Parallax */}
      <motion.div
        style={{ y: yFloatingElementalNodes }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <svg className="w-full h-full text-[#F59E0B]" fill="currentColor">
          <circle cx="12%" cy="40%" r="2" opacity="0.6" />
          <circle cx="88%" cy="35%" r="1.8" opacity="0.5" />
          <circle cx="94%" cy="75%" r="2.2" opacity="0.6" />
          <circle cx="6%" cy="85%" r="1.5" opacity="0.4" />
          <circle cx="52%" cy="20%" r="1.8" opacity="0.5" />
          <circle cx="78%" cy="90%" r="2" opacity="0.7" />
        </svg>

        {/* Subtle Sanskrit Directional Glyphs in background */}
        <div className="absolute top-1/3 left-8 text-[#F97316]/15 font-serif text-xl select-none hidden lg:block">
          ईशान &bull; पूर्व &bull; आग्नेय
        </div>
        <div className="absolute bottom-1/4 right-8 text-[#F97316]/15 font-serif text-xl select-none hidden lg:block">
          नैऋत्य &bull; पश्चिम &bull; वायव्य
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* NARRATIVE ACT 1: The Cosmic Spatial Science & Architecture */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 border border-orange-300 dark:border-amber-800 bg-white dark:bg-[#1E0702] px-3.5 py-1 rounded-full text-[11px] font-semibold text-[#EA580C] dark:text-amber-300 tracking-[0.18em] uppercase mb-4 shadow-xs">
            <Home className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Chapter II &bull; Vedic Spatial Harmonization</span>
          </div>
          <StaggeredHeading
            text="Aligning Architecture with Earth's Magnetic Vectors"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-[#7C2D12] dark:text-amber-100 tracking-tight"
            goldAccentWords={['Architecture', 'Magnetic', 'Vectors']}
            staggerDelay={0.04}
          />
          <p className="text-[#9A3412] dark:text-amber-200/90 mt-3 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Every building is a living biological grid. When architectural energy aligns with <MysticHighlight tooltip="Solar energy currents radiating from East to West">solar</MysticHighlight> and <MysticHighlight tooltip="Geomagnetic lines flowing from North to South">geomagnetic currents</MysticHighlight> through the <MysticHighlight tooltip="The sacred five cosmic building blocks: Water, Air, Fire, Earth, and Space">Pancha Tattva</MysticHighlight>, health, prosperity, and peace naturally flourish without structural demolition.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE 8-DIRECTION VASTU MATRIX OVERLAY COMPONENT */}
        {/* ========================================================================= */}
        <InteractiveVastuGrid onOpenBooking={onOpenBooking} />

        {/* Narrative Visual Story Block (Harmonious Sanctuary Image + 3 Non-Demolition Principles) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 bg-white dark:bg-[#1A0501] rounded-3xl border border-orange-200 dark:border-amber-900/80 p-6 sm:p-10 shadow-xl">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-orange-200 dark:border-amber-900/80 group">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
              alt="Harmonious Vedic Living Space with Natural Light" 
              className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700 filter"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7C2D12]/90 via-[#7C2D12]/40 to-transparent flex flex-col justify-end p-6">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#F97316] bg-white dark:bg-[#1E0702] px-2.5 py-1 rounded-full self-start mb-2 border border-orange-300 dark:border-amber-700 shadow-xs">
                100% Zero Demolition
              </span>
              <h4 className="font-playfair text-lg text-white font-bold">
                Vastu Purusha Mandala
              </h4>
              <p className="text-xs text-orange-100 font-normal mt-1">
                Remedies executed via elemental balancing strips, pyramids, and color therapy.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="border-b border-orange-200 dark:border-amber-900/70 pb-3">
              <h3 className="font-playfair text-xl sm:text-2xl text-[#7C2D12] dark:text-amber-100 font-bold">
                Zero-Demolition Remedial Methodology
              </h3>
              <p className="text-xs text-[#9A3412] dark:text-amber-300/80 font-normal mt-1">
                How Dr. Preeti Sehgal corrects severe Vastu Doshas without breaking structural walls:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#FFF7ED] dark:bg-[#250802] p-4 rounded-xl border border-orange-200 dark:border-amber-900/70 space-y-1.5">
                <div className="text-[#EA580C] dark:text-amber-400 font-bold text-xs flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>1. Metal Strips</span>
                </div>
                <p className="text-[11px] text-[#9A3412] dark:text-amber-200/90 font-normal leading-relaxed">
                  Brass, copper, and stainless steel floor cuts to isolate incorrect toilet or kitchen zones.
                </p>
              </div>

              <div className="bg-[#FFF7ED] dark:bg-[#250802] p-4 rounded-xl border border-orange-200 dark:border-amber-900/70 space-y-1.5">
                <div className="text-[#EA580C] dark:text-amber-400 font-bold text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>2. Color Frequencies</span>
                </div>
                <p className="text-[11px] text-[#9A3412] dark:text-amber-200/90 font-normal leading-relaxed">
                  Neutralizing anti-element clashing (e.g. green shades to calm fire in the north zone).
                </p>
              </div>

              <div className="bg-[#FFF7ED] dark:bg-[#250802] p-4 rounded-xl border border-orange-200 dark:border-amber-900/70 space-y-1.5">
                <div className="text-[#EA580C] dark:text-amber-400 font-bold text-xs flex items-center gap-1.5">
                  <Orbit className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>3. Energy Pyramids</span>
                </div>
                <p className="text-[11px] text-[#9A3412] dark:text-amber-200/90 font-normal leading-relaxed">
                  Amplifying cut corners (Khandit Kona) to re-establish the sacred 90° square balance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NARRATIVE ACT 2: The Five Elements (Pancha Tattva) Matrix */}
        {/* ========================================================================= */}
        <div className="mb-14">
          <div className="text-center mb-6">
            <h3 className="font-playfair text-xl sm:text-2xl text-[#7C2D12] dark:text-amber-100 font-bold">
              The 5 Cosmic Elements (पंचतत्व सन्तुलन)
            </h3>
            <p className="text-xs text-[#9A3412] dark:text-amber-300/80 font-normal mt-1">
              Harmonizing the natural cycle of Creation, Destruction, and Control
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#1A0501] p-4 rounded-2xl border border-sky-200 dark:border-sky-900/60 hover:border-sky-400 transition-all shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-300 dark:border-sky-800 flex items-center justify-center mx-auto mb-2 text-sky-700 dark:text-sky-300">
                <Wind className="w-4 h-4" />
              </div>
              <span className="text-xs font-playfair font-bold text-sky-900 dark:text-sky-200 block mb-0.5">Water (जल)</span>
              <span className="text-[10px] text-[#9A3412] dark:text-amber-300/80 font-normal block">North & North-East</span>
              <span className="text-[10px] text-[#EA580C] dark:text-amber-400 mt-1 block font-semibold">Clarity & Opportunities</span>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#1A0501] p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 hover:border-emerald-400 transition-all shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center mx-auto mb-2 text-emerald-700 dark:text-emerald-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-playfair font-bold text-emerald-900 dark:text-emerald-200 block mb-0.5">Air / Wood (वायु)</span>
              <span className="text-[10px] text-[#9A3412] dark:text-amber-300/80 font-normal block">East & North-East</span>
              <span className="text-[10px] text-[#EA580C] dark:text-amber-400 mt-1 block font-semibold">Social Connectivity</span>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#1A0501] p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 hover:border-rose-400 transition-all shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 flex items-center justify-center mx-auto mb-2 text-rose-700 dark:text-rose-300">
                <Flame className="w-4 h-4" />
              </div>
              <span className="text-xs font-playfair font-bold text-rose-900 dark:text-rose-200 block mb-0.5">Fire (अग्नि)</span>
              <span className="text-[10px] text-[#9A3412] dark:text-amber-300/80 font-normal block">South-East (Agneya)</span>
              <span className="text-[10px] text-[#EA580C] dark:text-amber-400 mt-1 block font-semibold">Cash Flow & Vitality</span>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#1A0501] p-4 rounded-2xl border border-amber-200 dark:border-amber-900/60 hover:border-amber-400 transition-all shadow-md"
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 flex items-center justify-center mx-auto mb-2 text-amber-700 dark:text-amber-300">
                <Mountain className="w-4 h-4" />
              </div>
              <span className="text-xs font-playfair font-bold text-amber-900 dark:text-amber-200 block mb-0.5">Earth (पृथ्वी)</span>
              <span className="text-[10px] text-[#9A3412] dark:text-amber-300/80 font-normal block">South-West (Nairutya)</span>
              <span className="text-[10px] text-[#EA580C] dark:text-amber-400 mt-1 block font-semibold">Stability & Relationships</span>
            </motion.div>

            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-[#1A0501] p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 hover:border-indigo-400 transition-all shadow-md col-span-2 sm:col-span-1"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-800 flex items-center justify-center mx-auto mb-2 text-indigo-700 dark:text-indigo-300">
                <Orbit className="w-4 h-4" />
              </div>
              <span className="text-xs font-playfair font-bold text-indigo-900 dark:text-indigo-200 block mb-0.5">Space (आकाश)</span>
              <span className="text-[10px] text-[#9A3412] dark:text-amber-300/80 font-normal block">West & Brahmasthan</span>
              <span className="text-[10px] text-[#EA580C] dark:text-amber-400 mt-1 block font-semibold">Expansion & Gains</span>
            </motion.div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NARRATIVE ACT 3: Interactive Entrance Analyzer & 9-Zone Spatial Grid */}
        {/* ========================================================================= */}
        <div className="w-full">
          <VastuEntranceGrid onBookAudit={() => onOpenBooking('vastu-shastra')} />
        </div>

        {/* ========================================================================= */}
        {/* NARRATIVE ACT 4: Interactive 3D 16-Directional Vastu Compass & AR Audit */}
        {/* ========================================================================= */}
        <div className="w-full">
          {/* 3D AR-Ready Vastu Compass Matrix */}
          <VastuCompass3D
            zones={VASTU_ZONES_DATA}
            selectedZone={selectedZone}
            onSelectZone={handleSelectZone}
            compassAngle={compassAngle}
          />

          {/* Selected Zone Deep Dive Display */}
          <div className="bg-white dark:bg-[#1A0501] rounded-3xl border border-orange-200 dark:border-amber-900/80 p-6 sm:p-10 shadow-xl">
            <div className="space-y-5">
              <div className="border-b border-orange-200 dark:border-amber-900/70 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h3 className="font-playfair text-2xl font-bold text-[#7C2D12] dark:text-amber-100 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-[#F97316]" />
                    <span>{selectedZone.direction}</span>
                  </h3>
                  <span className="text-xs font-bold text-[#EA580C] dark:text-amber-300 bg-orange-50 dark:bg-amber-950/70 border border-orange-200 dark:border-amber-800 px-3 py-0.5 rounded-full">
                    Ruler: {selectedZone.ruler}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#9A3412] dark:text-amber-300/90 font-normal mt-2">
                  <span><strong>Five Element:</strong> <strong className="text-[#7C2D12] dark:text-amber-200">{selectedZone.element}</strong></span>
                  <span>&bull;</span>
                  <span><strong>Harmonious Colors:</strong> {selectedZone.colors}</span>
                  <span>&bull;</span>
                  <span><strong>Bearing:</strong> {directionAngles[selectedZone.direction] || 0}° Magnetic</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Ideal Usage */}
                <div className="bg-[#FFF7ED] dark:bg-[#250802] p-4 rounded-xl border border-orange-200 dark:border-amber-900/70 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-playfair text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Ideal Usage (शुभ स्थान):</span>
                  </div>
                  <p className="text-xs text-[#7C2D12] dark:text-amber-100/90 font-normal leading-relaxed">
                    {selectedZone.idealFor}
                  </p>
                </div>

                {/* Things to Avoid */}
                <div className="bg-[#FFF7ED] dark:bg-[#250802] p-4 rounded-xl border border-orange-200 dark:border-amber-900/70 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-playfair text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Strictly Avoid (वर्जित):</span>
                  </div>
                  <p className="text-xs text-[#7C2D12] dark:text-amber-100/90 font-normal leading-relaxed">
                    {selectedZone.avoid}
                  </p>
                </div>
              </div>

              {/* Zero-Demolition Remedy Box */}
              <div className="p-4 rounded-xl bg-[#FFF7ED] dark:bg-[#250802] border border-orange-300 dark:border-amber-800 space-y-1.5">
                <div className="flex items-center gap-2 font-playfair text-xs font-bold text-[#EA580C] dark:text-amber-400 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                  <span>Dr. Preeti Sehgal's Non-Demolition Upay:</span>
                </div>
                <p className="text-xs text-[#7C2D12] dark:text-amber-100/90 font-normal leading-relaxed">
                  {selectedZone.nonDemolitionRemedy}
                </p>
              </div>

              {/* Consultation Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-orange-200 dark:border-amber-900/70">
                <span className="text-xs text-[#9A3412] dark:text-amber-300/80 font-normal text-center sm:text-left">
                  Need an On-Site or Blueprint Audit for your home or commercial space?
                </span>
                <button
                  onClick={() => onOpenBooking('vastu-shastra')}
                  className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Book Vastu Audit</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NARRATIVE ACT 5: Visual Remedies & Directional Placement Blueprint Gallery */}
        {/* ========================================================================= */}
        <div className="w-full">
          <VastuRemedyGallery onBookConsultation={onOpenBooking} />
        </div>

      </div>
    </section>
  );
};

