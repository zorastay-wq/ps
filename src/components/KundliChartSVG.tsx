import React, { useState, useRef } from 'react';
import { KundliResult, PlanetaryPosition } from '../types';
import { 
  DIVISIONAL_CHARTS_META, 
  DivisionalChartType, 
  getDivisionalPositions 
} from '../utils/divisionalCharts';
import { 
  Sparkles, 
  Compass, 
  Download, 
  Eye, 
  EyeOff,
  Layers, 
  ShieldCheck, 
  Table,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

interface KundliChartSVGProps {
  result: KundliResult;
  selectedPlanet?: string | null;
  onSelectPlanet?: (planetName: string) => void;
  defaultChartType?: DivisionalChartType;
}

export type DegreeDisplayMode = 'dms' | 'nakshatra' | 'dignity' | 'compact' | 'none';

const RASHIS_REF = [
  { num: 1, name: 'Aries', hindi: 'मेष', sanskrit: 'मेष (Mesh)', lord: 'Mars', element: 'Fire' },
  { num: 2, name: 'Taurus', hindi: 'वृषभ', sanskrit: 'वृषभ (Vrishabh)', lord: 'Venus', element: 'Earth' },
  { num: 3, name: 'Gemini', hindi: 'मिथुन', sanskrit: 'मिथुन (Mithun)', lord: 'Mercury', element: 'Air' },
  { num: 4, name: 'Cancer', hindi: 'कर्क', sanskrit: 'कर्क (Kark)', lord: 'Moon', element: 'Water' },
  { num: 5, name: 'Leo', hindi: 'सिंह', sanskrit: 'सिंह (Simha)', lord: 'Sun', element: 'Fire' },
  { num: 6, name: 'Virgo', hindi: 'कन्या', sanskrit: 'कन्या (Kanya)', lord: 'Mercury', element: 'Earth' },
  { num: 7, name: 'Libra', hindi: 'तुला', sanskrit: 'तुला (Tula)', lord: 'Venus', element: 'Air' },
  { num: 8, name: 'Scorpio', hindi: 'वृश्चिक', sanskrit: 'वृश्चिक (Vrishchik)', lord: 'Mars', element: 'Water' },
  { num: 9, name: 'Sagittarius', hindi: 'धनु', sanskrit: 'धनु (Dhanu)', lord: 'Jupiter', element: 'Fire' },
  { num: 10, name: 'Capricorn', hindi: 'मकर', sanskrit: 'मकर (Makar)', lord: 'Saturn', element: 'Earth' },
  { num: 11, name: 'Aquarius', hindi: 'कुंभ', sanskrit: 'कुंभ (Kumbh)', lord: 'Saturn', element: 'Air' },
  { num: 12, name: 'Pisces', hindi: 'मीन', sanskrit: 'मीन (Meen)', lord: 'Jupiter', element: 'Water' }
];

const HOUSES_META = [
  { num: 1, type: 'Kendra / Trikona', name: '1st House &bull; Lagna Bhava (तनु भाव)', karaka: 'Surya / Tanu', significations: 'Physical self, vitality, innate constitution, ego strength, lifespan and life pathway' },
  { num: 2, type: 'Dhana / Maraka', name: '2nd House &bull; Dhana Bhava (धन भाव)', karaka: 'Guru / Kutumba', significations: 'Liquid wealth, family lineage, speech eloquence, face, food habits, initial savings' },
  { num: 3, type: 'Upachaya / Bhratri', name: '3rd House &bull; Sahaja Bhava (सहज भाव)', karaka: 'Mangal / Parakrama', significations: 'Younger siblings, courage, mental willpower, short journeys, arts and manual skills' },
  { num: 4, type: 'Kendra / Moksha', name: '4th House &bull; Sukha Bhava (सुख भाव)', karaka: 'Chandra / Matru', significations: 'Mother, immovable property, vehicles, domestic bliss, emotional peace, ancestral land' },
  { num: 5, type: 'Trikona / Dharma', name: '5th House &bull; Putra Bhava (पुत्र / पूर्व पुण्य)', karaka: 'Guru / Dhi', significations: 'Past-life merits (Purva Punya), intelligence, children, mantra siddhi, higher education' },
  { num: 6, type: 'Dusthana / Upachaya', name: '6th House &bull; Shatru Bhava (रोग-ऋण-रिपु)', karaka: 'Mangal/Shani', significations: 'Enemies, debts, acute ailments, competitive obstacles, litigation, daily service' },
  { num: 7, type: 'Kendra / Maraka', name: '7th House &bull; Kalatra Bhava (कलत्र भाव)', karaka: 'Shukra / Jaya', significations: 'Spouse, marital harmony, business partnerships, public charisma, foreign trade' },
  { num: 8, type: 'Dusthana / Randhra', name: '8th House &bull; Ayu Bhava (आयु व रन्ध्र भाव)', karaka: 'Shani / Mrityu', significations: 'Longevity, occult secrets, sudden transformations, unearned wealth, chronic illness' },
  { num: 9, type: 'Trikona / Dharma', name: '9th House &bull; Bhagya Bhava (भाग्य भाव)', karaka: 'Guru/Surya', significations: 'Fortune, Guru, Father, dharmic wisdom, pilgrimages, ethical righteousness' },
  { num: 10, type: 'Kendra / Karma', name: '10th House &bull; Karma Bhava (कर्म भाव)', karaka: 'Budha/Surya/Shani', significations: 'Profession, executive leadership, fame, government honors, public accomplishments' },
  { num: 11, type: 'Upachaya / Labha', name: '11th House &bull; Labha Bhava (लाभ भाव)', karaka: 'Guru / Labha', significations: 'Gains, fulfillment of desires, elder siblings, elite network, financial appreciation' },
  { num: 12, type: 'Dusthana / Moksha', name: '12th House &bull; Vyaya Bhava (व्यय व मोक्ष भाव)', karaka: 'Shani/Ketu', significations: 'Expenditures, foreign settlements, spiritual liberation (Moksha), sleep, bed pleasures' }
];

// Helper: Format degrees into DD° MM' (e.g. 12° 24')
function formatDMS(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  return `${d.toString().padStart(2, '0')}° ${m.toString().padStart(2, '0')}'`;
}

// Helper: Get Nakshatra short code + Pada
function getNakShortCode(nakshatra: string, pada: number): string {
  if (!nakshatra) return '';
  const clean = nakshatra.replace(/[^a-zA-Z]/g, '').slice(0, 3);
  return `${clean}-${pada}`;
}

// Helper: Dignity short code
function getDignityCode(dignity: string): string {
  switch (dignity) {
    case 'Exalted': return '↑Ex';
    case 'Own Sign': return '★Sw';
    case 'Moolatrikona': return '★Mt';
    case 'Debilitated': return '↓Db';
    case 'Friendly': return 'Fr';
    case 'Enemy': return 'En';
    default: return 'Neu';
  }
}

export const KundliChartSVG: React.FC<KundliChartSVGProps> = ({ 
  result, 
  selectedPlanet, 
  onSelectPlanet,
  defaultChartType = 'D1'
}) => {
  const [activeChartType, setActiveChartType] = useState<DivisionalChartType>(defaultChartType);
  const [activeHouse, setActiveHouse] = useState<number>(1);
  const [showDegrees, setShowDegrees] = useState<boolean>(true);
  const [degreeMode, setDegreeMode] = useState<DegreeDisplayMode>('dms');
  const [showAspectLines, setShowAspectLines] = useState<boolean>(true);
  const [showHouseTable, setShowHouseTable] = useState<boolean>(true);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const chartSvgRef = useRef<SVGSVGElement>(null);

  const rawPositions: PlanetaryPosition[] = result.planetaryPositions || [];

  // Parse natal ascendant degree or compute from sign
  const ascendantSignStr = result.ascendant.split(' ')[0];
  const RASHI_NAMES = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const foundAscIndex = RASHI_NAMES.findIndex(
    r => ascendantSignStr.toLowerCase().includes(r.toLowerCase())
  );
  const d1AscIndex = foundAscIndex >= 0 ? foundAscIndex : 0;
  const d1AscendantDeg = (result.ascendantDegree !== undefined) 
    ? (d1AscIndex * 30 + result.ascendantDegree) 
    : (d1AscIndex * 30 + 15);

  // Get active divisional chart positions and ascendant sign
  const { chartAscendantSignIndex, positions } = getDivisionalPositions(
    activeChartType,
    d1AscendantDeg,
    rawPositions
  );

  const activeMeta = DIVISIONAL_CHARTS_META.find(m => m.code === activeChartType) || DIVISIONAL_CHARTS_META[0];

  // Group planets by house (1-12)
  const planetsByHouse: Record<number, PlanetaryPosition[]> = {};
  for (let i = 1; i <= 12; i++) {
    planetsByHouse[i] = positions.filter((p) => p.house === i);
  }

  // Calculate Sign Number (1-12) for any House (1-12) counter-clockwise
  const getSignNumForHouse = (houseNum: number): number => {
    return (((chartAscendantSignIndex + (houseNum - 1)) % 12) + 12) % 12 + 1;
  };

  const getSignDataForHouse = (houseNum: number) => {
    const signNum = getSignNumForHouse(houseNum);
    return RASHIS_REF[signNum - 1];
  };

  const currentHouseInfo = HOUSES_META.find((h) => h.num === activeHouse) || HOUSES_META[0];
  const currentSignInfo = getSignDataForHouse(activeHouse);
  const currentPlanetsInHouse = planetsByHouse[activeHouse] || [];

  // Calculate Parashari Drishtis (incoming aspects) for each house
  const getIncomingAspectsForHouse = (hNum: number): { planet: PlanetaryPosition; aspectType: string }[] => {
    const incoming: { planet: PlanetaryPosition; aspectType: string }[] = [];
    positions.forEach((p) => {
      if (p.house === hNum) return; // Not self
      const diff = (((hNum - p.house) % 12) + 12) % 12 + 1; // house distance (1-12)
      
      // All planets cast 7th aspect
      if (diff === 7) {
        incoming.push({ planet: p, aspectType: '7th (Full Drishti)' });
      }
      // Special aspects: Mars (4, 8)
      if (p.name === 'Mars' && (diff === 4 || diff === 8)) {
        incoming.push({ planet: p, aspectType: `${diff}th Special Drishti` });
      }
      // Special aspects: Jupiter & Rahu & Ketu (5, 9)
      if ((p.name === 'Jupiter' || p.name === 'Rahu' || p.name === 'Ketu') && (diff === 5 || diff === 9)) {
        incoming.push({ planet: p, aspectType: `${diff}th Trikona Drishti` });
      }
      // Special aspects: Saturn (3, 10)
      if (p.name === 'Saturn' && (diff === 3 || diff === 10)) {
        incoming.push({ planet: p, aspectType: `${diff}th Special Drishti` });
      }
    });
    return incoming;
  };

  // House Center and Sign Positions in standard 400x400 Vedic Diamond Layout
  const houseLayouts = [
    {
      house: 1,
      polygon: '200,10 295,105 200,200 105,105',
      signPos: { x: 200, y: 48 },
      planetsCenter: { x: 200, y: 122 },
      houseLabel: '1 (Lagna)',
      isLagna: true,
      bhavType: 'Tanu Bhava (Kendra)'
    },
    {
      house: 2,
      polygon: '10,10 200,10 105,105',
      signPos: { x: 105, y: 35 },
      planetsCenter: { x: 92, y: 68 },
      houseLabel: '2 (Dhana)',
      isLagna: false,
      bhavType: 'Dhana Bhava'
    },
    {
      house: 3,
      polygon: '10,10 105,105 10,200',
      signPos: { x: 35, y: 105 },
      planetsCenter: { x: 55, y: 95 },
      houseLabel: '3 (Sahaja)',
      isLagna: false,
      bhavType: 'Bhratri Bhava'
    },
    {
      house: 4,
      polygon: '10,200 105,105 200,200 105,295',
      signPos: { x: 52, y: 200 },
      planetsCenter: { x: 120, y: 200 },
      houseLabel: '4 (Sukha)',
      isLagna: false,
      bhavType: 'Matru Bhava (Kendra)'
    },
    {
      house: 5,
      polygon: '10,200 105,295 10,390',
      signPos: { x: 35, y: 295 },
      planetsCenter: { x: 55, y: 305 },
      houseLabel: '5 (Putra)',
      isLagna: false,
      bhavType: 'Putra Bhava (Trikona)'
    },
    {
      house: 6,
      polygon: '10,390 105,295 200,390',
      signPos: { x: 105, y: 365 },
      planetsCenter: { x: 92, y: 335 },
      houseLabel: '6 (Shatru)',
      isLagna: false,
      bhavType: 'Rin-Rog Bhava'
    },
    {
      house: 7,
      polygon: '200,200 295,295 200,390 105,295',
      signPos: { x: 200, y: 352 },
      planetsCenter: { x: 200, y: 278 },
      houseLabel: '7 (Jaya)',
      isLagna: false,
      bhavType: 'Kalatra Bhava (Kendra)'
    },
    {
      house: 8,
      polygon: '200,390 295,295 390,390',
      signPos: { x: 295, y: 365 },
      planetsCenter: { x: 308, y: 335 },
      houseLabel: '8 (Randhra)',
      isLagna: false,
      bhavType: 'Ayu Bhava'
    },
    {
      house: 9,
      polygon: '390,200 295,295 390,390',
      signPos: { x: 365, y: 295 },
      planetsCenter: { x: 345, y: 305 },
      houseLabel: '9 (Bhagya)',
      isLagna: false,
      bhavType: 'Bhagya Bhava (Trikona)'
    },
    {
      house: 10,
      polygon: '200,200 295,105 390,200 295,295',
      signPos: { x: 348, y: 200 },
      planetsCenter: { x: 280, y: 200 },
      houseLabel: '10 (Karma)',
      isLagna: false,
      bhavType: 'Karma Bhava (Kendra)'
    },
    {
      house: 11,
      polygon: '390,10 295,105 390,200',
      signPos: { x: 365, y: 105 },
      planetsCenter: { x: 345, y: 95 },
      houseLabel: '11 (Labha)',
      isLagna: false,
      bhavType: 'Labha Bhava'
    },
    {
      house: 12,
      polygon: '200,10 295,105 390,10',
      signPos: { x: 295, y: 35 },
      planetsCenter: { x: 308, y: 68 },
      houseLabel: '12 (Vyaya)',
      isLagna: false,
      bhavType: 'Moksha Bhava'
    }
  ];

  // SVG Aspect Ray connections between active selected planet and aspected houses
  const activeSelectedPlanetObj = positions.find(p => p.name === selectedPlanet);
  const aspectHouses = activeSelectedPlanetObj?.aspectHouses || [];

  // Export SVG handler
  const handleExportSVG = () => {
    if (!chartSvgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(chartSvgRef.current);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vedic_${activeChartType}_Kundli_${result.ascendant.split(' ')[0]}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  // Get Lagna degree string
  const ascDegreeDisplay = result.ascendantDegree !== undefined 
    ? formatDMS(result.ascendantDegree) 
    : '15°00\'';

  return (
    <div id="vedic-diamond-chart-container" className="space-y-4">
      {/* 1. Header & Divisional Chart Sub-Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-orange-200">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#EA580C] uppercase tracking-[0.16em]">
            <Compass className="w-4 h-4 text-[#F97316]" />
            <span>Vedic Diamond Chart &bull; पारम्परिक लग्न व वर्ग कुण्डली चक्र</span>
          </div>
          <div className="text-[11px] text-[#9A3412] mt-0.5">
            {activeMeta.name} ({activeMeta.hindi}) &bull; {activeMeta.significance}
          </div>
        </div>

        {/* Action Controls: Aspect Rays, Degree Mode & SVG Download */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setShowAspectLines(!showAspectLines)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] font-semibold tracking-wider uppercase border transition-colors cursor-pointer ${
              showAspectLines 
                ? 'bg-orange-100/90 text-[#EA580C] border-orange-300' 
                : 'bg-white text-[#9A3412] border-orange-200 hover:bg-orange-50'
            }`}
            title="Toggle Vedic Planetary Drishti (Aspect) Rays"
          >
            <Eye className="w-3 h-3 text-[#F97316]" />
            <span>Drishti Rays</span>
          </button>

          <button
            type="button"
            onClick={() => setShowHouseTable(!showHouseTable)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] font-semibold tracking-wider uppercase border transition-colors cursor-pointer ${
              showHouseTable 
                ? 'bg-orange-100/90 text-[#EA580C] border-orange-300' 
                : 'bg-white text-[#9A3412] border-orange-200 hover:bg-orange-50'
            }`}
            title="Toggle Detailed 12 Bhavas Degrees Table"
          >
            <Table className="w-3 h-3 text-[#F97316]" />
            <span>House Degrees</span>
          </button>

          <button
            type="button"
            onClick={handleExportSVG}
            className="inline-flex items-center gap-1 bg-[#F97316] hover:bg-[#EA580C] text-white px-2.5 py-1 rounded-lg text-[10.5px] font-semibold tracking-wider uppercase shadow-xs transition-colors cursor-pointer"
            title="Download Authentic SVG Kundli Vector"
          >
            <Download className="w-3 h-3" />
            <span>{downloadSuccess ? 'Saved!' : 'Export SVG'}</span>
          </button>
        </div>
      </div>

      {/* 2. Divisional Chart Selector Tabs (D1, D9, D10, D7, D12) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {DIVISIONAL_CHARTS_META.map((meta) => {
          const isSelected = activeChartType === meta.code;
          return (
            <button
              key={meta.code}
              type="button"
              onClick={() => setActiveChartType(meta.code)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-md shadow-orange-500/20 border border-orange-400'
                  : 'bg-[#FFF9F2] text-[#7C2D12] hover:bg-orange-100/80 border border-orange-200'
              }`}
            >
              <span className="text-[11px] opacity-90">{meta.icon}</span>
              <span>{meta.code}</span>
              <span className="hidden sm:inline font-normal text-[10.5px] opacity-90">
                ({meta.name.split(' ')[0]})
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Authentic North Indian Diamond Chart SVG Canvas */}
      <div className="relative w-full max-w-lg mx-auto aspect-square bg-[#FFFDF9] p-2.5 sm:p-3.5 rounded-2xl border-2 border-orange-300 shadow-xl overflow-hidden">
        
        {/* Subtle Watermark Authentic Sanskrit Mantra in Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none">
          <div className="text-center font-serif text-[#7C2D12]">
            <div className="text-3xl font-bold">॥ ॐ नमः शिवाय ॥</div>
            <div className="text-lg">सूर्य &bull; चन्द्र &bull; मङ्गल &bull; बुध &bull; गुरु &bull; शुक्र &bull; शनि</div>
          </div>
        </div>

        <svg 
          ref={chartSvgRef}
          viewBox="0 0 400 400" 
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Authentic Vedic Gold Parchment & Metal Gradients */}
            <linearGradient id="chartBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="35%" stopColor="#F97316" />
              <stop offset="65%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>

            <linearGradient id="lagnaGemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFEDD5" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="kendraGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FED7AA" stopOpacity="0.1" />
            </linearGradient>

            {/* Corner Filigree / Floral Saffron Patterns */}
            <pattern id="cornerYantraDot" width="8" height="8" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.2" fill="#F97316" opacity="0.35" />
            </pattern>

            {/* Filter Glow for selected planet */}
            <filter id="vedicGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Authentic Outer Double Border Frame with Corner Lotus Trim */}
          <rect x="6" y="6" width="388" height="388" fill="none" stroke="url(#chartBorderGrad)" strokeWidth="3" rx="4" />
          <rect x="11" y="11" width="378" height="378" fill="none" stroke="#F97316" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />

          {/* Corner Floral Motifs */}
          {/* Top-Left */}
          <path d="M 12 28 Q 28 28 28 12" fill="none" stroke="#EA580C" strokeWidth="1.2" opacity="0.7" />
          <circle cx="20" cy="20" r="2.5" fill="#F97316" opacity="0.8" />
          {/* Top-Right */}
          <path d="M 388 28 Q 372 28 372 12" fill="none" stroke="#EA580C" strokeWidth="1.2" opacity="0.7" />
          <circle cx="380" cy="20" r="2.5" fill="#F97316" opacity="0.8" />
          {/* Bottom-Left */}
          <path d="M 12 372 Q 28 372 28 388" fill="none" stroke="#EA580C" strokeWidth="1.2" opacity="0.7" />
          <circle cx="20" cy="380" r="2.5" fill="#F97316" opacity="0.8" />
          {/* Bottom-Right */}
          <path d="M 388 372 Q 372 372 372 388" fill="none" stroke="#EA580C" strokeWidth="1.2" opacity="0.7" />
          <circle cx="380" cy="380" r="2.5" fill="#F97316" opacity="0.8" />

          {/* Traditional Diagonal Cross Lines */}
          <line x1="12" y1="12" x2="388" y2="388" stroke="#EA580C" strokeWidth="1.6" opacity="0.85" />
          <line x1="388" y1="12" x2="12" y2="388" stroke="#EA580C" strokeWidth="1.6" opacity="0.85" />

          {/* Central Sacred Diamond Yantra Matrix */}
          <polygon points="200,12 388,200 200,388 12,200" fill="none" stroke="#EA580C" strokeWidth="2" opacity="0.9" />

          {/* Inner Kendra Diamond Background Tint (Houses 1, 4, 7, 10) */}
          <polygon points="200,12 294,106 200,200 106,106" fill="url(#kendraGlowGrad)" />
          <polygon points="12,200 106,106 200,200 106,294" fill="url(#kendraGlowGrad)" />
          <polygon points="200,200 294,294 200,388 106,294" fill="url(#kendraGlowGrad)" />
          <polygon points="200,200 294,106 388,200 294,294" fill="url(#kendraGlowGrad)" />

          {/* Drishti (Aspect) Ray Lines from Selected Planet */}
          {showAspectLines && activeSelectedPlanetObj && aspectHouses.length > 0 && (
            <g className="aspect-rays-layer">
              {aspectHouses.map((targetHouseNum) => {
                const sourceLayout = houseLayouts.find(l => l.house === activeSelectedPlanetObj.house);
                const targetLayout = houseLayouts.find(l => l.house === targetHouseNum);
                if (!sourceLayout || !targetLayout) return null;

                return (
                  <g key={`aspect-ray-${targetHouseNum}`}>
                    <line
                      x1={sourceLayout.planetsCenter.x}
                      y1={sourceLayout.planetsCenter.y}
                      x2={targetLayout.planetsCenter.x}
                      y2={targetLayout.planetsCenter.y}
                      stroke="#DC2626"
                      strokeWidth="1.8"
                      strokeDasharray="4 3"
                      opacity="0.75"
                    />
                    <circle
                      cx={targetLayout.planetsCenter.x}
                      cy={targetLayout.planetsCenter.y}
                      r="4"
                      fill="#DC2626"
                      opacity="0.8"
                    />
                  </g>
                );
              })}
            </g>
          )}

          {/* Render All 12 Houses */}
          {houseLayouts.map((layout) => {
            const hNum = layout.house;
            const signNum = getSignNumForHouse(hNum);
            const rashiData = RASHIS_REF[signNum - 1];
            const planets = planetsByHouse[hNum] || [];
            const isActive = activeHouse === hNum;
            const isAspectedBySelected = activeSelectedPlanetObj && aspectHouses.includes(hNum);

            return (
              <g key={`house-${hNum}`} className="cursor-pointer">
                {/* House Interactive Polygon Overlay */}
                <polygon
                  points={layout.polygon}
                  className={`transition-all duration-200 ${
                    isActive 
                      ? 'fill-[#FDBA74]/55 stroke-[#EA580C] stroke-[2.2]' 
                      : isAspectedBySelected
                      ? 'fill-red-100/40 hover:fill-orange-100/60'
                      : 'fill-transparent hover:fill-orange-100/50'
                  }`}
                  onClick={() => setActiveHouse(hNum)}
                />

                {/* Sign Number (1-12) Circle Badge */}
                <circle
                  cx={layout.signPos.x}
                  cy={layout.signPos.y}
                  r="9"
                  fill={isActive ? '#EA580C' : '#FFF7ED'}
                  stroke="#EA580C"
                  strokeWidth="1.2"
                  opacity="0.95"
                />

                {/* Sign Number (1-12) according to Vedic Parashari Placement */}
                <text
                  x={layout.signPos.x}
                  y={layout.signPos.y + 3.8}
                  textAnchor="middle"
                  fill={isActive ? '#FFFFFF' : '#7C2D12'}
                  fontSize="10.5"
                  fontFamily="Playfair Display, serif"
                  fontWeight="800"
                  pointerEvents="none"
                >
                  {signNum}
                </text>

                {/* Special Lagna Header & Exact Ascendant Degree in House 1 */}
                {layout.isLagna && (
                  <g pointerEvents="none">
                    <rect
                      x="145"
                      y="64"
                      width="110"
                      height="18"
                      rx="9"
                      fill="#FFF7ED"
                      stroke="#EA580C"
                      strokeWidth="1"
                    />
                    <text
                      x="200"
                      y="76.5"
                      textAnchor="middle"
                      fill="#EA580C"
                      fontSize="9"
                      fontWeight="800"
                      letterSpacing="0.04em"
                    >
                      {activeChartType === 'D1' 
                        ? (showDegrees ? `LAGNA: ${ascDegreeDisplay}` : 'LAGNA (ASC)') 
                        : (showDegrees ? `${activeChartType} LAGNA: ${ascDegreeDisplay}` : `${activeChartType} LAGNA`)}
                    </text>
                  </g>
                )}

                {/* Rashi Lord Label if active or hovered */}
                {isActive && (
                  <text
                    x={layout.signPos.x}
                    y={layout.signPos.y + (layout.isLagna ? -12 : (hNum === 7 ? 14 : -12))}
                    textAnchor="middle"
                    fill="#C2410C"
                    fontSize="8.5"
                    fontWeight="700"
                    pointerEvents="none"
                  >
                    {rashiData.hindi} ({rashiData.name.slice(0, 3)})
                  </text>
                )}

                {/* Planets occupying this house with Vedic Glyph, Name, Exact Degrees & Minutes (e.g. Sun: 12° 24') */}
                {planets.length > 0 && (
                  <g>
                    {planets.map((pl, pIdx) => {
                      const total = planets.length;
                      const lineSpacing = total > 3 ? 12 : 14.5;
                      const lineOffset = (pIdx - (total - 1) / 2) * lineSpacing;
                      const py = layout.planetsCenter.y + (layout.isLagna ? 10 : 0) + lineOffset;
                      const isPlSelected = selectedPlanet === pl.name;

                      // Degree/Detail suffix string based on degreeMode
                      let degreeStr = '';
                      if (showDegrees) {
                        if (degreeMode === 'dms') {
                          degreeStr = `: ${formatDMS(pl.degreesInSign)}`;
                        } else if (degreeMode === 'nakshatra') {
                          degreeStr = `: ${formatDMS(pl.degreesInSign)} [${getNakShortCode(pl.nakshatra, pl.pada)}]`;
                        } else if (degreeMode === 'dignity') {
                          degreeStr = `: ${formatDMS(pl.degreesInSign)} [${getDignityCode(pl.dignity)}]`;
                        } else if (degreeMode === 'compact') {
                          degreeStr = `: ${pl.degreesInSign.toFixed(0)}°`;
                        }
                      }

                      // Full planet name clearly shown (e.g. "Sun: 12° 24'")
                      const displayText = `${pl.symbol} ${pl.name}${pl.isRetrograde ? ' (R)' : ''}${pl.isCombust ? ' [C]' : ''}${degreeStr}`;

                      return (
                        <g 
                          key={pl.name}
                          className="cursor-pointer group"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHouse(hNum);
                            if (onSelectPlanet) onSelectPlanet(pl.name);
                          }}
                        >
                          {/* Planet Highlighting Badge if selected */}
                          {isPlSelected && (
                            <rect
                              x={layout.planetsCenter.x - 56}
                              y={py - 9}
                              width="112"
                              height="15"
                              rx="7.5"
                              fill="#DC2626"
                              opacity="0.15"
                            />
                          )}

                          <text
                            x={layout.planetsCenter.x}
                            y={py}
                            textAnchor="middle"
                            fill={isPlSelected ? '#DC2626' : pl.color || '#9A3412'}
                            fontSize={total > 4 ? '7.5' : total > 2 ? '8.5' : '9.5'}
                            fontWeight={isPlSelected ? '900' : '700'}
                            className="transition-all hover:scale-105"
                          >
                            {displayText}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}

          {/* Central Watermark Chart Code */}
          <circle cx="200" cy="200" r="18" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.2" opacity="0.9" />
          <text
            x="200"
            y="204"
            textAnchor="middle"
            fill="#EA580C"
            fontSize="10"
            fontWeight="900"
            pointerEvents="none"
          >
            {activeChartType}
          </text>
        </svg>
      </div>

      {/* Toggle Button Below Chart Canvas: Show/Hide Degrees & Format Controls */}
      <div className="p-3 rounded-2xl bg-[#FFF7ED] border border-orange-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            id="toggle-degrees-btn"
            onClick={() => setShowDegrees(!showDegrees)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
              showDegrees
                ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-orange-500/20'
                : 'bg-white text-[#7C2D12] hover:bg-orange-100/80 border border-orange-300'
            }`}
          >
            {showDegrees ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Degrees: Visible (e.g., Sun: 12° 24')</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Degrees: Hidden (Quick Reading)</span>
              </>
            )}
          </button>

          <span className="text-[11px] text-[#9A3412] hidden sm:inline font-medium">
            {showDegrees 
              ? 'Showing degrees & arcminutes next to each planet symbol' 
              : 'Clean view to avoid visual clutter during quick readings'}
          </span>
        </div>

        {/* Degree Format Sub-Options when Degrees are enabled */}
        {showDegrees && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold text-[#7C2D12] mr-0.5">Format:</span>
            <button
              type="button"
              onClick={() => setDegreeMode('dms')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                degreeMode === 'dms' 
                  ? 'bg-[#EA580C] text-white shadow-2xs' 
                  : 'bg-white text-[#9A3412] hover:bg-orange-100 border border-orange-200'
              }`}
            >
              12° 24' (Deg° Min')
            </button>
            <button
              type="button"
              onClick={() => setDegreeMode('nakshatra')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                degreeMode === 'nakshatra' 
                  ? 'bg-[#EA580C] text-white shadow-2xs' 
                  : 'bg-white text-[#9A3412] hover:bg-orange-100 border border-orange-200'
              }`}
            >
              + Nakshatra [Ash-1]
            </button>
            <button
              type="button"
              onClick={() => setDegreeMode('dignity')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                degreeMode === 'dignity' 
                  ? 'bg-[#EA580C] text-white shadow-2xs' 
                  : 'bg-white text-[#9A3412] hover:bg-orange-100 border border-orange-200'
              }`}
            >
              + Dignity [↑Ex]
            </button>
            <button
              type="button"
              onClick={() => setDegreeMode('compact')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                degreeMode === 'compact' 
                  ? 'bg-[#EA580C] text-white shadow-2xs' 
                  : 'bg-white text-[#9A3412] hover:bg-orange-100 border border-orange-200'
              }`}
            >
              Compact (12°)
            </button>
          </div>
        )}
      </div>

      {/* 4. Rich House & Planetary Sign Inspector Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF7ED] via-[#FFF9F2] to-[#FFEDD5]/40 border border-orange-200 text-xs shadow-xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-200/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-orange-100 border border-orange-300 flex items-center justify-center text-[#EA580C] font-bold text-sm">
              {activeHouse}
            </span>
            <div>
              <div className="font-playfair text-sm font-bold text-[#7C2D12] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                <span>{currentHouseInfo.name}</span>
              </div>
              <div className="text-[10.5px] text-[#9A3412] font-medium">
                Classification: <strong className="text-[#EA580C]">{currentHouseInfo.type}</strong> &bull; Karaka: {currentHouseInfo.karaka}
              </div>
            </div>
          </div>

          <div className="text-[11px] font-bold text-[#7C2D12] bg-white px-3 py-1 rounded-xl border border-orange-200 shadow-2xs">
            Sign #{getSignNumForHouse(activeHouse)}: <span className="text-[#EA580C]">{currentSignInfo.name} ({currentSignInfo.hindi})</span> &bull; Lord: {currentSignInfo.lord}
          </div>
        </div>

        <p className="text-[#9A3412] leading-relaxed text-xs">
          <strong className="text-[#7C2D12] font-semibold">House Significations: </strong>
          {currentHouseInfo.significations}
        </p>

        {/* Incoming Aspects on this House */}
        {(() => {
          const aspects = getIncomingAspectsForHouse(activeHouse);
          if (aspects.length === 0) return null;
          return (
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10.5px] text-[#7C2D12]">
              <span className="font-bold text-[#EA580C]">Drishtis Received on House {activeHouse}:</span>
              {aspects.map((asp, aIdx) => (
                <span key={aIdx} className="bg-orange-100/80 px-2 py-0.5 rounded-md border border-orange-200 font-medium">
                  {asp.planet.symbol} {asp.planet.name} ({asp.aspectType})
                </span>
              ))}
            </div>
          );
        })()}

        {/* Planetary occupants and detailed dignity badges */}
        {currentPlanetsInHouse.length > 0 ? (
          <div className="pt-2 border-t border-orange-200/80 space-y-1.5">
            <span className="font-bold text-[#EA580C] text-[11px] uppercase tracking-wider block">
              Planets In {currentHouseInfo.name.split('&bull;')[0]} ({activeChartType} Placements):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentPlanetsInHouse.map((p) => {
                const isSelected = selectedPlanet === p.name;
                return (
                  <div
                    key={p.name}
                    onClick={() => onSelectPlanet && onSelectPlanet(p.name)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected 
                        ? 'bg-orange-100 border-orange-400 shadow-xs' 
                        : 'bg-white hover:bg-orange-50 border-orange-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base" style={{ color: p.color || '#EA580C' }}>{p.symbol}</span>
                      <div>
                        <div className="font-bold text-[#7C2D12] text-xs flex items-center gap-1">
                          <span>{p.hindiName} ({p.name})</span>
                          {p.isRetrograde && <span className="text-red-600 font-bold text-[10px]">(Vakri/R)</span>}
                          {p.isCombust && <span className="text-orange-600 font-bold text-[10px]">(Asta/C)</span>}
                        </div>
                        <div className="text-[10px] text-[#9A3412]">
                          <strong>{formatDMS(p.degreesInSign)}</strong> in {p.rashi} ({p.nakshatra} P{p.pada})
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`inline-block text-[9.5px] font-bold px-1.5 py-0.5 rounded border ${
                        p.dignity === 'Exalted' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                        p.dignity === 'Own Sign' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                        p.dignity === 'Moolatrikona' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        p.dignity === 'Debilitated' ? 'bg-red-100 text-red-800 border-red-300' :
                        'bg-orange-50 text-[#7C2D12] border-orange-200'
                      }`}>
                        {p.dignity}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="pt-1.5 text-[11px] text-[#9A3412] italic">
            No direct planetary occupants in this house in {activeChartType}. Its results are channeled through Lord <strong>{currentSignInfo.lord}</strong> and incoming Parashari Drishtis.
          </div>
        )}
      </div>

      {/* 5. Comprehensive 12 Bhavas (Houses) Degrees & Occupancy Matrix Table */}
      {showHouseTable && (
        <div className="p-3.5 rounded-2xl bg-white border border-orange-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-orange-100 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#7C2D12]">
              <Table className="w-4 h-4 text-[#EA580C]" />
              <span>Complete 12 Bhavas (Houses) Degrees &amp; Occupancy Table ({activeChartType})</span>
            </div>
            <span className="text-[10px] text-[#9A3412]">
              Click any house row to inspect details
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-orange-50/80 text-[#7C2D12] border-b border-orange-200 font-bold">
                  <th className="py-2 px-2.5">House</th>
                  <th className="py-2 px-2.5">Bhava Name</th>
                  <th className="py-2 px-2.5">Rashi (Sign)</th>
                  <th className="py-2 px-2.5">Lord</th>
                  <th className="py-2 px-2.5">Occupying Planets &amp; Degrees</th>
                  <th className="py-2 px-2.5">Aspects Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {HOUSES_META.map((hMeta) => {
                  const hNum = hMeta.num;
                  const signNum = getSignNumForHouse(hNum);
                  const signData = RASHIS_REF[signNum - 1];
                  const occupants = planetsByHouse[hNum] || [];
                  const aspects = getIncomingAspectsForHouse(hNum);
                  const isCurrent = activeHouse === hNum;

                  return (
                    <tr 
                      key={hNum}
                      onClick={() => setActiveHouse(hNum)}
                      className={`cursor-pointer transition-colors ${
                        isCurrent 
                          ? 'bg-orange-100/70 font-semibold' 
                          : 'hover:bg-orange-50/50'
                      }`}
                    >
                      <td className="py-2 px-2.5">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-orange-100 text-[#EA580C] font-bold text-[10px] border border-orange-300">
                          {hNum}
                        </span>
                      </td>
                      <td className="py-2 px-2.5 text-[#7C2D12]">
                        {hMeta.name.split('&bull;')[1] || hMeta.name}
                        {hNum === 1 && (
                          <span className="ml-1 text-[9.5px] text-[#EA580C] font-bold">
                            ({ascDegreeDisplay})
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-2.5 text-[#9A3412]">
                        {signData.name} ({signData.hindi}) #{signNum}
                      </td>
                      <td className="py-2 px-2.5 text-[#7C2D12]">
                        {signData.lord}
                      </td>
                      <td className="py-2 px-2.5">
                        {occupants.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {occupants.map((pl) => (
                              <span
                                key={pl.name}
                                className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-orange-200 text-[10px] font-bold shadow-2xs"
                                style={{ color: pl.color || '#EA580C' }}
                              >
                                <span>{pl.symbol}</span>
                                <span>{pl.name}</span>
                                <span className="text-[#7C2D12] font-normal">{formatDMS(pl.degreesInSign)}</span>
                                {pl.isRetrograde && <span className="text-red-600">(R)</span>}
                                {pl.isCombust && <span className="text-orange-600">[C]</span>}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-[10px]">Empty (Bhav Lord {signData.lord})</span>
                        )}
                      </td>
                      <td className="py-2 px-2.5 text-[#9A3412]">
                        {aspects.length > 0 ? (
                          <div className="flex flex-wrap gap-1 text-[10px]">
                            {aspects.map((asp, aIdx) => (
                              <span key={aIdx} className="bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                                {asp.planet.symbol} {asp.planet.name}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 text-[10px]">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
