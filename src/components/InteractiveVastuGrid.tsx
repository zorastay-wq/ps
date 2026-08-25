import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Flame, 
  Wind, 
  Mountain, 
  Orbit, 
  Layers, 
  Droplets,
  Calendar,
  Eye,
  Info,
  ChevronRight,
  Sun,
  Moon,
  Home,
  Check,
  RotateCcw
} from 'lucide-react';

export interface VastuDirectionInfo {
  id: string;
  key: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'CENTER';
  name: string;
  hindiName: string;
  sanskritKona: string;
  ruler: string;
  deity: string;
  element: 'Water' | 'Air' | 'Fire' | 'Earth' | 'Space';
  elementHindi: string;
  degree: number;
  gridRow: number;
  gridCol: number;
  tagline: string;
  colors: string[];
  colorDesc: string;
  idealFor: string[];
  strictlyAvoid: string[];
  remedyTip: string;
  metalRemedy: string;
  impactArea: string;
  category: 'wealth' | 'peace' | 'vitality' | 'stability' | 'expansion' | 'support';
}

export const VASTU_8_DIRECTIONS: VastuDirectionInfo[] = [
  {
    id: 'vastu-nw',
    key: 'NW',
    name: 'North-West',
    hindiName: 'उत्तर-पश्चिम दिशा',
    sanskritKona: 'वायव्य कोण (Vayavya)',
    ruler: 'Moon (चंद्र)',
    deity: 'Lord Vayu (पवन देव)',
    element: 'Air',
    elementHindi: 'वायु तत्व',
    degree: 315,
    gridRow: 1,
    gridCol: 1,
    tagline: 'Movement, Supportive Relations, Dynamic Travel & Quick Sales',
    colors: ['#F1F5F9', '#CBD5E1', '#FFFFFF'],
    colorDesc: 'Pearl White, Cream, Silver',
    idealFor: [
      'Guest Bedroom & visitor lounge',
      'Finished goods dispatch & warehouse inventory',
      'Unmarried daughters’ bedroom for timely alliances',
      'Travel, passport desk & international visa documents'
    ],
    strictlyAvoid: [
      'Master bedroom for the main breadwinner',
      'Heavy immovable scrap or dead concrete piles',
      'Underground septic sumps directly touching the corner'
    ],
    remedyTip: 'Hang a 5-rod silver/metallic wind chime. Place a Kamadhenu cow with calf statue to ensure supportive networking.',
    metalRemedy: 'White Pearl / Brass-Aluminium strips for energy containment',
    impactArea: 'Social Support & Swift Sales',
    category: 'support'
  },
  {
    id: 'vastu-n',
    key: 'N',
    name: 'North',
    hindiName: 'उत्तर दिशा (कुबेर द्वार)',
    sanskritKona: 'कुबेर स्थान (Kuber Sthan)',
    ruler: 'Mercury (बुध)',
    deity: 'Lord Kuber (कुबेर देव)',
    element: 'Water',
    elementHindi: 'जल तत्व',
    degree: 0,
    gridRow: 1,
    gridCol: 2,
    tagline: 'Perennial Financial Inflows, Business Growth & Career Prominence',
    colors: ['#0284C7', '#10B981', '#38BDF8'],
    colorDesc: 'Emerald Green, Light Blue, Seafoam Cyan',
    idealFor: [
      'Main Entrance gate (Auspicious Kuber Dwar)',
      'Cash locker / financial safe opening towards North',
      'Executive home office desk facing North',
      'Lush indoor plants and fresh water fountains'
    ],
    strictlyAvoid: [
      'Toilets, septic sumps, or dirty trash bins',
      'Dark red, deep crimson, or bright pink wall paints',
      'Heavy monolithic walls with no window openings'
    ],
    remedyTip: 'Install an energized Brass Kuber Yantra on the North wall. Keep a vibrant money plant or green jade plant in a green ceramic pot.',
    metalRemedy: 'Stainless steel / Copper boundary frequency strips for door harmonization',
    impactArea: 'Wealth Inflow & Career Expansion',
    category: 'wealth'
  },
  {
    id: 'vastu-ne',
    key: 'NE',
    name: 'North-East',
    hindiName: 'उत्तर-पूर्व दिशा (ईशान कोण)',
    sanskritKona: 'ईशान कोण (Ishan Kona)',
    ruler: 'Jupiter (बृहस्पति / गुरु)',
    deity: 'Lord Shiva & Mahadev',
    element: 'Water',
    elementHindi: 'पवित्र जल तत्व',
    degree: 45,
    gridRow: 1,
    gridCol: 3,
    tagline: 'Spiritual Enlightenment, Divine Blessings, Clarity & Mental Peace',
    colors: ['#E0F2FE', '#FFFFFF', '#FEF08A'],
    colorDesc: 'Pure White, Light Cyan, Soft Butter Yellow',
    idealFor: [
      'Pooja Mandir, prayer altar & meditation corner',
      'Underground freshwater borewell or clean water sump',
      'Quiet study table for children & researchers',
      'Open veranda, balcony, or low boundary wall'
    ],
    strictlyAvoid: [
      'Toilets, septic tanks, or drainage outlets',
      'Kitchen cooktop, electrical generator, or boiler',
      'Heavy overhead concrete staircases or clutter'
    ],
    remedyTip: 'Place a pure crystal Shree Yantra or a brass water bowl with fresh marigold petals. Paint with sacred off-white or soft celestial yellow.',
    metalRemedy: 'Pure Quartz / Zinc Pyramids & Copper Sacred Wire for structural dosha cut',
    impactArea: 'Mind Clarity & Spiritual Harmony',
    category: 'peace'
  },
  {
    id: 'vastu-w',
    key: 'W',
    name: 'West',
    hindiName: 'पश्चिम दिशा (लाभ स्थान)',
    sanskritKona: 'वरुण स्थान (Varuna Sthan)',
    ruler: 'Saturn (शनि)',
    deity: 'Lord Varuna (वरुण देव)',
    element: 'Space',
    elementHindi: 'आकाश / धातु तत्व',
    degree: 270,
    gridRow: 2,
    gridCol: 1,
    tagline: 'Realization of Profits, Material Gains, Stability & Academic Focus',
    colors: ['#1E3A8A', '#64748B', '#FFFFFF'],
    colorDesc: 'Royal Navy Blue, Steel Grey, Pure White',
    idealFor: [
      'Family Dining Room for joyful shared meals',
      'Study room for high school & competitive exam students',
      'Overhead water storage tank placed at the top roof',
      'Secondary financial locker for holding retained profits'
    ],
    strictlyAvoid: [
      'Downward floor slope draining water to the West',
      'Large unshaded terrace openings facing direct sunset',
      'Main entry without threshold energy locks'
    ],
    remedyTip: 'Hang a 7-rod hollow metal wind chime or install a brass Lord Varuna yantra to convert continuous efforts into solid financial returns.',
    metalRemedy: 'Iron / Lead energy grounding rods to contain wealth leakage',
    impactArea: 'Profit Realization & Retained Gains',
    category: 'expansion'
  },
  {
    id: 'vastu-center',
    key: 'CENTER',
    name: 'Brahmasthan (Center)',
    hindiName: 'ब्रह्मस्थान (केंद्रीय नाभि)',
    sanskritKona: 'ब्रह्मस्थान (Brahmasthan)',
    ruler: 'Cosmic Prana (ब्रह्म)',
    deity: 'Lord Brahma (सृष्टिकर्ता)',
    element: 'Space',
    elementHindi: 'सर्वव्यापक आकाश तत्व',
    degree: 0,
    gridRow: 2,
    gridCol: 2,
    tagline: 'The Cosmic Centroid of the Home: Distributes Vital Life Force (Prana)',
    colors: ['#FFFBEB', '#FEF3C7', '#FAF5FF'],
    colorDesc: 'Warm Ivory, Soft Golden Cream, Pure Off-White',
    idealFor: [
      'Open courtyard (Aangan) or central illuminated hall',
      'Spacious living space with minimal central furniture',
      'Even, spotless, unobstructed light-toned flooring',
      'Quiet family gathering and meditation circle'
    ],
    strictlyAvoid: [
      'Heavy structural load-bearing pillars or concrete walls',
      'Staircases winding through the center',
      'Toilets, septic pits, or heavy machines located in center'
    ],
    remedyTip: 'Keep the exact geometric center 100% clean, light, and airy. Ensure soft ambient illumination without drilling central holes.',
    metalRemedy: 'Concealed Brass/Copper Helix strips placed along perimeter lines',
    impactArea: 'Whole-House Health & Pranic Vitality',
    category: 'vitality'
  },
  {
    id: 'vastu-e',
    key: 'E',
    name: 'East',
    hindiName: 'पूर्व दिशा (सूर्य स्थान)',
    sanskritKona: 'इंद्र स्थान (Indra Sthan)',
    ruler: 'Sun (सूर्य देव)',
    deity: 'Lord Indra (देवराज इंद्र)',
    element: 'Air',
    elementHindi: 'वायु / काष्ठ तत्व',
    degree: 90,
    gridRow: 2,
    gridCol: 3,
    tagline: 'Vitality, Social Status, Leadership, Immunity & Government Favor',
    colors: ['#F59E0B', '#10B981', '#EA580C'],
    colorDesc: 'Sun Gold, Saffron Orange, Fresh Leaf Green',
    idealFor: [
      'Main entrance gate to receive morning ultraviolet rays',
      'Large glass windows, sunrise balcony & open verandas',
      'Living room for hosting dignitaries, leaders, and friends',
      'Study desk facing East for concentration'
    ],
    strictlyAvoid: [
      'High, tall boundary walls blocking sunlight from entering',
      'Toilets, septic tanks, or tall trash bins',
      'Heavy dark curtains blocking morning dawn sunlight'
    ],
    remedyTip: 'Mount a glowing energized brass Sun emblem at 6 feet height on the East wall. Water green leafy plants facing the morning sun.',
    metalRemedy: 'Copper Sun Plate & Green Aventurine stones along threshold',
    impactArea: 'Social Fame, Honor & Vitality',
    category: 'vitality'
  },
  {
    id: 'vastu-sw',
    key: 'SW',
    name: 'South-West',
    hindiName: 'दक्षिण-पश्चिम (नैऋत्य कोण)',
    sanskritKona: 'नैऋत्य कोण (Nairutya)',
    ruler: 'Rahu (राहु)',
    deity: 'Nirriti Dev (स्थिरता देव)',
    element: 'Earth',
    elementHindi: 'पृथ्वी तत्व (स्थिरता)',
    degree: 225,
    gridRow: 3,
    gridCol: 1,
    tagline: 'Master Stability, Relationship Harmony, Leadership & Wealth Retention',
    colors: ['#D97706', '#92400E', '#78350F'],
    colorDesc: 'Golden Ochre, Terracotta Earth, Sand Beige',
    idealFor: [
      'Master Bedroom for the head of family / CEO cabin',
      'Heavy iron safe or primary jewelry vault opening North/East',
      'Heaviest wardrobes, solid furniture, and tall solid walls',
      'Highest and heaviest zone of the entire house'
    ],
    strictlyAvoid: [
      'Underground water tanks, borewells, or swimming pools',
      'Main entrance doorway (causes unexpected financial drain)',
      'Kitchen cooktop, pooja mandir, or low cut corners (Khandit)'
    ],
    remedyTip: 'Keep heavy solid brass artifacts, lead pyramids, or earthen pots filled with raw yellow grains. Paint with warm earthy tones.',
    metalRemedy: 'Heavy Lead Pyramids & Yellow Jasper crystal grids under floor',
    impactArea: 'Family Stability & Relationship Bond',
    category: 'stability'
  },
  {
    id: 'vastu-s',
    key: 'S',
    name: 'South',
    hindiName: 'दक्षिण दिशा (यम स्थान)',
    sanskritKona: 'यम स्थान (Yama Sthan)',
    ruler: 'Mars (मंगल)',
    deity: 'Lord Yama (यमराज)',
    element: 'Fire',
    elementHindi: 'अग्नि व पृथ्वी तत्व',
    degree: 180,
    gridRow: 3,
    gridCol: 2,
    tagline: 'Deep Restful Sleep, Courage, Fame, Vitality & Legal Protection',
    colors: ['#DC2626', '#991B1B', '#B45309'],
    colorDesc: 'Crimson Red, Deep Terracotta, Warm Mahogany',
    idealFor: [
      'Bedroom (sleeping with head toward South for grounding)',
      'Heavy storage units and machinery room',
      'High boundary walls and dense boundary plantations',
      'Administrative executive desk for disciplined teams'
    ],
    strictlyAvoid: [
      'Unprotected main entrances with low thresholds',
      'Underground freshwater tanks or borewells',
      'Open downhill slopes sloping downwards to South'
    ],
    remedyTip: 'Sleep with head strictly pointing to the South for optimal geomagnetic alignment. Place a red coral or red jasper crystal sphere on the South desk.',
    metalRemedy: 'Copper strips & Red Jasper crystal anchors to nullify entry defects',
    impactArea: 'Restful Sleep & Legal Resilience',
    category: 'vitality'
  },
  {
    id: 'vastu-se',
    key: 'SE',
    name: 'South-East',
    hindiName: 'दक्षिण-पूर्व (आग्नेय कोण)',
    sanskritKona: 'आग्नेय कोण (Agneya)',
    ruler: 'Venus (शुक्र)',
    deity: 'Lord Agni (अग्नि देव)',
    element: 'Fire',
    elementHindi: 'अग्नि तत्व',
    degree: 135,
    gridRow: 3,
    gridCol: 3,
    tagline: 'Cash Flow Liquidity, Kitchen Energy, Metabolism & Feminine Grace',
    colors: ['#EF4444', '#F97316', '#FDA4AF'],
    colorDesc: 'Warm Coral, Rose Peach, Fire Orange',
    idealFor: [
      'Kitchen cooktop (cook facing East towards morning sun)',
      'Electrical main panel, solar inverter, boiler & generator',
      'Cash register / retail billing counter for daily transactions',
      'Warm lighting and gym / workout equipment area'
    ],
    strictlyAvoid: [
      'Master bedroom (causes hyper-temper & insomnia)',
      'Underground water tank or borewell (Fire-Water clash)',
      'Mirrors reflecting the cooktop burner directly'
    ],
    remedyTip: 'If kitchen is displaced to North or NE, burn a pure brass sesame oil lamp daily at sunset in the SE corner and place a green jade plant.',
    metalRemedy: 'Copper pyramid coils & Green marble base under gas burners',
    impactArea: 'Cash Flow Liquidity & Digestive Health',
    category: 'wealth'
  }
];

const GRID_COORDINATES: Record<string, { x: number; y: number }> = {
  NW: { x: 16.67, y: 16.67 },
  N: { x: 50, y: 16.67 },
  NE: { x: 83.33, y: 16.67 },
  W: { x: 16.67, y: 50 },
  CENTER: { x: 50, y: 50 },
  E: { x: 83.33, y: 50 },
  SW: { x: 16.67, y: 83.33 },
  S: { x: 50, y: 83.33 },
  SE: { x: 83.33, y: 83.33 },
};

interface InteractiveVastuGridProps {
  onOpenBooking?: (serviceId?: string) => void;
}

export const InteractiveVastuGrid: React.FC<InteractiveVastuGridProps> = ({ onOpenBooking }) => {
  const [activeDirectionKey, setActiveDirectionKey] = useState<string>('N');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Staggered animation variants for the 3x3 grid when entering viewport
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.15
      }
    }
  };

  const gridCellVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.82, 
      y: 18 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 260, 
        damping: 20 
      } 
    }
  };

  const handleResetView = () => {
    setActiveDirectionKey('N');
    setFilterCategory('all');
    setHoveredKey(null);
  };

  // Active or hovered direction info
  const currentKey = hoveredKey || activeDirectionKey;
  const currentZone = VASTU_8_DIRECTIONS.find(z => z.key === currentKey) || VASTU_8_DIRECTIONS[1];
  const targetCoord = (currentZone && currentZone.key && GRID_COORDINATES[currentZone.key]) 
    ? GRID_COORDINATES[currentZone.key] 
    : { x: 50, y: 16.67 };

  const getElementIcon = (elem: VastuDirectionInfo['element']) => {
    switch (elem) {
      case 'Water': return <Droplets className="w-3.5 h-3.5 text-sky-500" />;
      case 'Air': return <Wind className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Fire': return <Flame className="w-3.5 h-3.5 text-rose-500" />;
      case 'Earth': return <Mountain className="w-3.5 h-3.5 text-amber-600" />;
      case 'Space': return <Orbit className="w-3.5 h-3.5 text-indigo-500" />;
    }
  };

  const getElementBadgeColor = (elem: VastuDirectionInfo['element']) => {
    switch (elem) {
      case 'Water': return 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800';
      case 'Air': return 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Fire': return 'bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Earth': return 'bg-amber-50 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'Space': return 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    }
  };

  return (
    <div id="interactive-vastu-8grid" className="w-full mb-16">
      
      {/* Header & Section Lead */}
      <div className="bg-gradient-to-br from-[#FFF7ED] via-white to-orange-50/60 dark:from-[#1E0702] dark:via-[#160401] dark:to-[#120300] rounded-3xl border border-orange-200 dark:border-amber-900/80 p-6 sm:p-10 shadow-xl relative overflow-hidden">
        
        {/* Subtle background sacred geometric watermarks */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-orange-200/20 dark:bg-amber-500/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-amber-200/20 dark:bg-orange-500/5 blur-2xl pointer-events-none" />
        
        {/* Top Badges & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100 dark:bg-amber-950/80 border border-orange-300 dark:border-amber-800 text-[#EA580C] dark:text-amber-300 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Compass className="w-4 h-4 text-[#F97316] animate-spin" style={{ animationDuration: '18s' }} />
            <span>Interactive 8-Direction Spatial Grid</span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Reset View Button */}
            <button
              id="reset-vastu-grid-btn"
              onClick={handleResetView}
              title="Reset grid selection to default North orientation and clear filters"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#2A0A03] hover:bg-orange-50 dark:hover:bg-[#380E05] border border-orange-200 dark:border-amber-800/80 text-[#9A3412] dark:text-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:border-[#EA580C]"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>Reset View</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#9A3412] dark:text-amber-300/90">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Hover or Tap any cardinal zone for live Vastu Upay</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="max-w-3xl mb-8">
          <h3 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7C2D12] dark:text-amber-100 leading-tight">
            Ashta-Dikpala Vastu Matrix & Directional Harmony
          </h3>
          <p className="text-[#9A3412] dark:text-amber-200/90 text-sm sm:text-base font-normal mt-2 leading-relaxed">
            Every directional vector in your home channels distinct geomagnetic and solar frequencies governed by the <strong className="text-[#EA580C] dark:text-amber-300">Pancha Tattva</strong>. Explore each zone to discover ideal placements, forbidden activities, and Dr. Preeti Sehgal’s authentic zero-demolition remedies.
          </p>
        </div>

        {/* Quick Filter Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          <span className="text-xs font-bold text-[#9A3412] dark:text-amber-300/80 uppercase tracking-wider shrink-0 mr-1">
            Focus Filter:
          </span>
          {[
            { key: 'all', label: 'All 8 Zones + Center' },
            { key: 'wealth', label: '💰 Wealth & Cash Flow (N, SE)' },
            { key: 'peace', label: '🕊️ Peace & Mind (NE)' },
            { key: 'stability', label: '🏰 Stability & Lead (SW)' },
            { key: 'expansion', label: '📈 Profits & Gains (W)' },
            { key: 'support', label: '✈️ Travel & Sales (NW)' }
          ].map((flt) => (
            <button
              key={flt.key}
              onClick={() => setFilterCategory(flt.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shadow-2xs ${
                filterCategory === flt.key
                  ? 'bg-[#EA580C] text-white ring-2 ring-amber-300 dark:ring-amber-500 shadow-md font-bold'
                  : 'bg-white dark:bg-[#250802] text-[#7C2D12] dark:text-amber-200 border border-orange-200 dark:border-amber-900/80 hover:bg-orange-50 dark:hover:bg-[#300a03]'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>

        {/* Main 2-Column Interactive Workspace: 3x3 Spatial Grid (Left) + Rich Live Dossier (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: 3x3 Ashta-Dikpala Geometric Vastu Mandala Grid */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center">
            
            {/* Grid Outer Frame */}
            <div className="w-full max-w-md bg-white dark:bg-[#1A0501] p-3 sm:p-4 rounded-3xl border-2 border-orange-300 dark:border-amber-800 shadow-2xl relative">
              
              {/* Compass Cardinal Indicators on Outer Frame */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#EA580C] text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md z-20 flex items-center gap-1">
                <span>NORTH (उत्तर) 0°</span>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#7C2D12] text-amber-200 text-[10px] font-extrabold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-md z-20">
                <span>SOUTH (दक्षिण) 180°</span>
              </div>
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 -rotate-90 bg-[#7C2D12] text-amber-200 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md z-20 origin-center">
                <span>WEST 270°</span>
              </div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 rotate-90 bg-[#7C2D12] text-amber-200 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md z-20 origin-center">
                <span>EAST 90°</span>
              </div>

              {/* 3x3 Matrix Grid Wrapper with Relative Positioning */}
              <div className="relative my-2 aspect-square">
                
                {/* SVG Energy Flow Path Overlay */}
                <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
                  viewBox="0 0 100 100"
                  aria-hidden="true"
                >
                  <defs>
                    <filter id="vastu-pranic-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    
                    <linearGradient id="energy-beam-gradient" x1="50%" y1="50%" x2={`${targetCoord.x}%`} y2={`${targetCoord.y}%`}>
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#EA580C" stopOpacity="0.8" />
                      <stop offset="100%" stopColor={
                        currentZone?.element === 'Water' ? '#0284C7' :
                        currentZone?.element === 'Air' ? '#10B981' :
                        currentZone?.element === 'Fire' ? '#EF4444' :
                        currentZone?.element === 'Earth' ? '#D97706' : '#8B5CF6'
                      } stopOpacity="0.95" />
                    </linearGradient>

                    {/* Radial glow for Brahmasthan central vortex */}
                    <radialGradient id="brahmasthan-core-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
                      <stop offset="60%" stopColor="#F97316" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* 1. Brahmasthan Central Prana Source Vortex */}
                  <circle
                    cx="50"
                    cy="50"
                    r="4.5"
                    fill="url(#brahmasthan-core-glow)"
                    className="animate-pulse"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="2"
                    fill="#F59E0B"
                    stroke="#FFFFFF"
                    strokeWidth="0.6"
                  />

                  {/* If Center is selected: Radiate multidirectional prana pulses to all 8 cardinal nodes */}
                  {currentZone?.key === 'CENTER' ? (
                    Object.entries(GRID_COORDINATES)
                      .filter(([key]) => key !== 'CENTER')
                      .map(([key, coord]) => (
                        <g key={`all-flow-${key}`}>
                          {/* Radiating baseline beam */}
                          <line
                            x1="50"
                            y1="50"
                            x2={coord.x}
                            y2={coord.y}
                            stroke="#F59E0B"
                            strokeWidth="0.8"
                            strokeDasharray="2 2"
                            strokeOpacity="0.5"
                          />
                          {/* Flowing animated dash beam */}
                          <line
                            x1="50"
                            y1="50"
                            x2={coord.x}
                            y2={coord.y}
                            stroke="#EA580C"
                            strokeWidth="1.2"
                            strokeDasharray="3 3"
                            filter="url(#vastu-pranic-glow)"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              values="0; -12"
                              dur="1.2s"
                              repeatCount="indefinite"
                            />
                          </line>
                        </g>
                      ))
                  ) : (
                    /* Specific Direction Selected / Hovered: Dynamic Focused Energy Flow Path */
                    <g key={`flow-to-${currentZone?.key || 'dir'}`}>
                      {/* Broad Pranic Aura Beam */}
                      <line
                        x1="50"
                        y1="50"
                        x2={targetCoord.x}
                        y2={targetCoord.y}
                        stroke="url(#energy-beam-gradient)"
                        strokeWidth="3.5"
                        strokeOpacity="0.25"
                        strokeLinecap="round"
                        filter="url(#vastu-pranic-glow)"
                      />

                      {/* Focused Golden Energy Vector Line */}
                      <line
                        x1="50"
                        y1="50"
                        x2={targetCoord.x}
                        y2={targetCoord.y}
                        stroke="url(#energy-beam-gradient)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />

                      {/* Animated Flowing Dashed Current (Traversing from Center to Target) */}
                      <line
                        x1="50"
                        y1="50"
                        x2={targetCoord.x}
                        y2={targetCoord.y}
                        stroke="#FFFFFF"
                        strokeWidth="1.4"
                        strokeDasharray="3 4"
                        strokeLinecap="round"
                        filter="url(#vastu-pranic-glow)"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="0; -14"
                          dur="0.8s"
                          repeatCount="indefinite"
                        />
                      </line>

                      {/* Animated Traveling Photon / Prana Particle */}
                      <circle
                        r="1.8"
                        fill="#FFFFFF"
                        stroke="#F59E0B"
                        strokeWidth="0.6"
                        filter="url(#vastu-pranic-glow)"
                      >
                        <animate
                          attributeName="cx"
                          values={`50; ${targetCoord.x}`}
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="cy"
                          values={`50; ${targetCoord.y}`}
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.3; 1; 0.9"
                          dur="0.9s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Secondary Staggered Traveling Spark */}
                      <circle
                        r="1.2"
                        fill="#FEF08A"
                        filter="url(#vastu-pranic-glow)"
                      >
                        <animate
                          attributeName="cx"
                          values={`50; ${targetCoord.x}`}
                          dur="0.9s"
                          begin="0.45s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="cy"
                          values={`50; ${targetCoord.y}`}
                          dur="0.9s"
                          begin="0.45s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0; 0.9; 0"
                          dur="0.9s"
                          begin="0.45s"
                          repeatCount="indefinite"
                        />
                      </circle>

                      {/* Target Direction Impact Ripple */}
                      <circle
                        cx={targetCoord.x}
                        cy={targetCoord.y}
                        r="4"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="0.8"
                        opacity="0.8"
                        filter="url(#vastu-pranic-glow)"
                      >
                        <animate
                          attributeName="r"
                          values="2; 6"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="1; 0"
                          dur="1.2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  )}
                </svg>

                {/* 3x3 Matrix Grid Layout with Staggered Entrance Animation */}
                <motion.div 
                  variants={gridContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-3 gap-2 sm:gap-2.5 w-full h-full"
                >
                {VASTU_8_DIRECTIONS.map((dir) => {
                  const isSelected = currentKey === dir.key;
                  const isFiltered = filterCategory === 'all' || dir.category === filterCategory;

                  return (
                    <motion.div
                      key={dir.key}
                      id={`vastu-grid-cell-${dir.key.toLowerCase()}`}
                      variants={gridCellVariants}
                      onMouseEnter={() => setHoveredKey(dir.key)}
                      onMouseLeave={() => setHoveredKey(null)}
                      onClick={() => setActiveDirectionKey(dir.key)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className={`relative rounded-2xl p-2 sm:p-2.5 flex flex-col justify-between transition-all duration-200 cursor-pointer text-left border ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#EA580C] to-[#C2410C] text-white border-amber-300 shadow-lg ring-2 ring-amber-400 z-10'
                          : isFiltered
                            ? 'bg-[#FFF9F2] dark:bg-[#250802] text-[#7C2D12] dark:text-amber-100 border-orange-200 dark:border-amber-900/70 hover:border-[#EA580C] hover:bg-orange-50 dark:hover:bg-[#340c04]'
                            : 'bg-stone-50 dark:bg-stone-900/40 text-stone-400 dark:text-stone-600 border-stone-200 dark:border-stone-800 opacity-60'
                      }`}
                    >
                      {/* Top Row in Cell: Direction Code & Icon */}
                      <div className="flex items-center justify-between w-full">
                        <span className={`font-mono text-xs sm:text-sm font-extrabold px-1.5 py-0.5 rounded-md ${
                          isSelected 
                            ? 'bg-white/20 text-white font-black' 
                            : 'bg-orange-100 dark:bg-amber-950 text-[#EA580C] dark:text-amber-300'
                        }`}>
                          {dir.key}
                        </span>

                        <div className={`p-1 rounded-full ${isSelected ? 'bg-white/20 text-white' : ''}`}>
                          {getElementIcon(dir.element)}
                        </div>
                      </div>

                      {/* Middle: Zone Sanskrit / Common Name */}
                      <div className="my-1">
                        <span className={`text-[11px] sm:text-xs font-bold line-clamp-1 block ${
                          isSelected ? 'text-white' : 'text-[#7C2D12] dark:text-amber-100'
                        }`}>
                          {dir.name}
                        </span>
                        <span className={`text-[9px] sm:text-[10px] font-bold block truncate ${
                          isSelected ? 'text-amber-100' : 'text-[#9A3412] dark:text-amber-300'
                        }`}>
                          {dir.hindiName.split(' ')[0]}
                        </span>
                      </div>

                      {/* Bottom Tag / Ruler */}
                      <div className="flex items-center justify-between text-[9px] font-bold">
                        <span className={`truncate ${
                          isSelected ? 'text-orange-100' : 'text-[#7C2D12] dark:text-amber-300'
                        }`}>
                          {dir.ruler.split(' ')[0]}
                        </span>
                        
                        {dir.key === 'N' && (
                          <span className={`text-[8px] px-1 py-0.2 rounded font-extrabold ${
                            isSelected ? 'bg-white text-[#EA580C]' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                          }`}>
                            Kuber
                          </span>
                        )}
                        {dir.key === 'NE' && (
                          <span className={`text-[8px] px-1 py-0.2 rounded font-extrabold ${
                            isSelected ? 'bg-white text-[#EA580C]' : 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-700'
                          }`}>
                            Ishan
                          </span>
                        )}
                      </div>

                      {/* Active Indicator Pulse Ring */}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-300 border-2 border-white animate-ping" />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

              {/* Bottom Quick Compass Needle Status Bar */}
              <div className="mt-3 pt-3 border-t border-orange-200 dark:border-amber-900/60 flex items-center justify-between text-xs text-[#7C2D12] dark:text-amber-200">
                <div className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#EA580C]" />
                  <span className="font-bold">Active Vector:</span>
                  <span className="font-mono font-bold text-[#EA580C] dark:text-amber-300">
                    {currentZone.name} ({currentZone.degree}°)
                  </span>
                </div>
                <span className="text-[11px] font-bold bg-orange-100 dark:bg-amber-950 px-2 py-0.5 rounded-full border border-orange-300 dark:border-amber-800 text-[#7C2D12] dark:text-amber-200">
                  {currentZone.elementHindi}
                </span>
              </div>
            </div>

            {/* Hint for mobile / desktop */}
            <p className="text-[11px] text-[#7C2D12] dark:text-amber-200 font-medium mt-3 text-center">
              💡 Tip: Click any box to lock the detailed Vastu guide below.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: High-Contrast Dynamic Vastu Dossier Card */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentZone.key}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-[#1A0501] rounded-3xl border-2 border-orange-200 dark:border-amber-900/80 p-6 sm:p-8 shadow-xl space-y-6"
              >
                {/* Dossier Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-orange-200 dark:border-amber-900/70 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-black bg-[#EA580C] text-white px-2 py-0.5 rounded-md">
                        {currentZone.key} &bull; {currentZone.degree}°
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getElementBadgeColor(currentZone.element)}`}>
                        {currentZone.elementHindi} ({currentZone.element})
                      </span>
                    </div>

                    <h4 className="font-playfair text-2xl sm:text-3xl font-bold text-[#7C2D12] dark:text-amber-100">
                      {currentZone.name} ({currentZone.hindiName})
                    </h4>
                    <p className="text-xs font-semibold text-[#EA580C] dark:text-amber-400 mt-0.5">
                      {currentZone.sanskritKona}
                    </p>
                  </div>

                  {/* Ruler & Deity Badge */}
                  <div className="text-right bg-orange-50 dark:bg-amber-950/70 p-2.5 rounded-xl border border-orange-200 dark:border-amber-900/60">
                    <span className="text-[10px] uppercase font-bold text-[#9A3412] dark:text-amber-400 block">
                      Presiding Deity & Planet
                    </span>
                    <span className="text-xs font-bold text-[#7C2D12] dark:text-amber-100 block">
                      {currentZone.deity}
                    </span>
                    <span className="text-[11px] text-[#EA580C] dark:text-amber-300 font-semibold block">
                      Ruler: {currentZone.ruler}
                    </span>
                  </div>
                </div>

                {/* Tagline / Core Impact */}
                <div className="bg-[#FFF7ED] dark:bg-[#250802] p-3.5 rounded-xl border-l-4 border-[#EA580C] dark:border-amber-500">
                  <p className="text-xs sm:text-sm font-semibold text-[#7C2D12] dark:text-amber-100">
                    🎯 <strong className="text-[#EA580C] dark:text-amber-300">{currentZone.impactArea}:</strong> {currentZone.tagline}
                  </p>
                </div>

                {/* 2-Column Ideal vs Strictly Prohibited Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Ideal Placements (शुभ निर्माण) */}
                  <div className="bg-emerald-50/70 dark:bg-[#062010] p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-playfair text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>Ideal Placements (शुभ निर्माण):</span>
                    </div>
                    <ul className="space-y-1.5 pt-1">
                      {currentZone.idealFor.map((item, idx) => (
                        <li key={idx} className="text-xs text-emerald-950 dark:text-emerald-100/90 flex items-start gap-1.5 font-normal leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Strictly Prohibited (वर्जित कार्य) */}
                  <div className="bg-rose-50/70 dark:bg-[#240608] p-4 rounded-2xl border border-rose-200 dark:border-rose-900/60 space-y-2">
                    <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300 font-playfair text-xs font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>Strictly Avoid (वर्जित कार्य):</span>
                    </div>
                    <ul className="space-y-1.5 pt-1">
                      {currentZone.strictlyAvoid.map((item, idx) => (
                        <li key={idx} className="text-xs text-rose-950 dark:text-rose-100/90 flex items-start gap-1.5 font-normal leading-relaxed">
                          <span className="text-rose-500 font-bold shrink-0">✕</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Non-Demolition Upay & Metal Balancing Strips */}
                <div className="bg-gradient-to-r from-orange-50 via-[#FFF7ED] to-amber-50 dark:from-[#250802] dark:via-[#1E0702] dark:to-[#280B03] p-4 sm:p-5 rounded-2xl border border-orange-300 dark:border-amber-800 space-y-3">
                  <div className="flex items-center gap-2 text-[#EA580C] dark:text-amber-400 font-playfair text-xs sm:text-sm font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-[#F97316] shrink-0" />
                    <span>Dr. Preeti Sehgal's Zero-Demolition Remedy (अचूक उपाय):</span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-[#7C2D12] dark:text-amber-100 font-normal leading-relaxed">
                    {currentZone.remedyTip}
                  </p>

                  <div className="pt-2 border-t border-orange-200/80 dark:border-amber-900/60 flex flex-wrap items-center justify-between gap-2 text-xs text-[#9A3412] dark:text-amber-300/90">
                    <div>
                      <strong>Auspicious Color Frequency:</strong> <span className="text-[#7C2D12] dark:text-amber-200 font-semibold">{currentZone.colorDesc}</span>
                    </div>
                    <div>
                      <strong>Metal Correction:</strong> <span className="text-[#EA580C] dark:text-amber-300 font-semibold">{currentZone.metalRemedy}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Consultation CTA for this Specific Zone */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-[#9A3412] dark:text-amber-300/80 text-center sm:text-left">
                    Have a defect in your <strong>{currentZone.name}</strong> zone? Get an exact CAD/Blueprint remedy.
                  </span>
                  
                  <button
                    id={`book-vastu-${currentZone.key.toLowerCase()}`}
                    onClick={() => onOpenBooking && onOpenBooking('vastu-shastra')}
                    className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg shrink-0"
                  >
                    <Calendar className="w-4 h-4 text-white" />
                    <span>Consult on {currentZone.key} Zone</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-200" />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

    </div>
  );
};
