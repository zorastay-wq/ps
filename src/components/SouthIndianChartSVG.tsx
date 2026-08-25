import React, { useState, useRef } from 'react';
import { KundliResult, PlanetaryPosition } from '../types';
import { 
  DIVISIONAL_CHARTS_META, 
  DivisionalChartType, 
  getDivisionalPositions 
} from '../utils/divisionalCharts';
import { Sparkles, Compass, Download, Table, Eye, EyeOff } from 'lucide-react';
import { DegreeDisplayMode } from './KundliChartSVG';

interface SouthIndianChartSVGProps {
  result: KundliResult;
  selectedPlanet?: string | null;
  onSelectPlanet?: (planetName: string) => void;
  defaultChartType?: DivisionalChartType;
}

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

export const SouthIndianChartSVG: React.FC<SouthIndianChartSVGProps> = ({
  result,
  selectedPlanet,
  onSelectPlanet,
  defaultChartType = 'D1'
}) => {
  const [activeChartType, setActiveChartType] = useState<DivisionalChartType>(defaultChartType);
  const [showDegrees, setShowDegrees] = useState<boolean>(true);
  const [degreeMode, setDegreeMode] = useState<DegreeDisplayMode>('dms');
  const [showHouseTable, setShowHouseTable] = useState<boolean>(true);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const chartSvgRef = useRef<SVGSVGElement>(null);

  // South Indian fixed signs layout (Row 1: Pisces, Aries, Taurus, Gemini; Row 2: Aquarius, center, center, Cancer; Row 3: Capricorn, center, center, Leo; Row 4: Sagittarius, Scorpio, Libra, Virgo)
  const SIGN_GRID = [
    { index: 11, signNum: 12, name: 'Pisces', hindi: 'मीन', r: 0, c: 0, lord: 'Jupiter', element: 'Water' },
    { index: 0, signNum: 1, name: 'Aries', hindi: 'मेष', r: 0, c: 1, lord: 'Mars', element: 'Fire' },
    { index: 1, signNum: 2, name: 'Taurus', hindi: 'वृषभ', r: 0, c: 2, lord: 'Venus', element: 'Earth' },
    { index: 2, signNum: 3, name: 'Gemini', hindi: 'मिथुन', r: 0, c: 3, lord: 'Mercury', element: 'Air' },
    { index: 10, signNum: 11, name: 'Aquarius', hindi: 'कुंभ', r: 1, c: 0, lord: 'Saturn', element: 'Air' },
    { index: 3, signNum: 4, name: 'Cancer', hindi: 'कर्क', r: 1, c: 3, lord: 'Moon', element: 'Water' },
    { index: 9, signNum: 10, name: 'Capricorn', hindi: 'मकर', r: 2, c: 0, lord: 'Saturn', element: 'Earth' },
    { index: 4, signNum: 5, name: 'Leo', hindi: 'सिंह', r: 2, c: 3, lord: 'Sun', element: 'Fire' },
    { index: 8, signNum: 9, name: 'Sagittarius', hindi: 'धनु', r: 3, c: 0, lord: 'Jupiter', element: 'Fire' },
    { index: 7, signNum: 8, name: 'Scorpio', hindi: 'वृश्चिक', r: 3, c: 1, lord: 'Mars', element: 'Water' },
    { index: 6, signNum: 7, name: 'Libra', hindi: 'तुला', r: 3, c: 2, lord: 'Venus', element: 'Air' },
    { index: 5, signNum: 6, name: 'Virgo', hindi: 'कन्या', r: 3, c: 3, lord: 'Mercury', element: 'Earth' },
  ];

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

  const { chartAscendantSignIndex, positions } = getDivisionalPositions(
    activeChartType,
    d1AscendantDeg,
    rawPositions
  );

  const activeMeta = DIVISIONAL_CHARTS_META.find(m => m.code === activeChartType) || DIVISIONAL_CHARTS_META[0];

  const [activeSignIndex, setActiveSignIndex] = useState<number | null>(chartAscendantSignIndex);

  const currentSign = SIGN_GRID.find(s => s.index === (activeSignIndex !== null ? activeSignIndex : chartAscendantSignIndex)) || SIGN_GRID[1];
  const currentPlanetsInActiveSign = positions.filter(p => p.signIndex === currentSign.index);
  const houseOfActiveSign = (((currentSign.index - chartAscendantSignIndex) % 12 + 12) % 12) + 1;

  // Lagna degree text
  const ascDegreeDisplay = result.ascendantDegree !== undefined 
    ? formatDMS(result.ascendantDegree) 
    : '15°00\'';

  // Export SVG handler
  const handleExportSVG = () => {
    if (!chartSvgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(chartSvgRef.current);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vedic_South_${activeChartType}_Kundli.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div id="south-indian-chart-container" className="space-y-4">
      {/* Header & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-orange-200">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#EA580C] uppercase tracking-[0.16em]">
            <Compass className="w-4 h-4 text-[#F97316]" />
            <span>South Indian Chart &bull; स्थिर राशि चक्र (Fixed Zodiac Matrix)</span>
          </div>
          <div className="text-[11px] text-[#9A3412] mt-0.5">
            {activeMeta.name} ({activeMeta.hindi}) &bull; Clockwise from Pisces/Aries &bull; Lagna: {ascDegreeDisplay}
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setShowHouseTable(!showHouseTable)}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] font-semibold tracking-wider uppercase border transition-colors cursor-pointer ${
              showHouseTable 
                ? 'bg-orange-100/90 text-[#EA580C] border-orange-300' 
                : 'bg-white text-[#9A3412] border-orange-200 hover:bg-orange-50'
            }`}
          >
            <Table className="w-3 h-3 text-[#F97316]" />
            <span>House Degrees</span>
          </button>

          <button
            type="button"
            onClick={handleExportSVG}
            className="inline-flex items-center gap-1 bg-[#F97316] hover:bg-[#EA580C] text-white px-2.5 py-1 rounded-lg text-[10.5px] font-semibold tracking-wider uppercase shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span>{downloadSuccess ? 'Saved!' : 'Export SVG'}</span>
          </button>
        </div>
      </div>

      {/* Divisional Chart Switcher */}
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

      {/* South Indian 4x4 Grid SVG */}
      <div className="relative w-full max-w-md mx-auto aspect-square bg-[#FFFDF9] p-2.5 sm:p-3.5 rounded-2xl border-2 border-orange-300 shadow-xl overflow-hidden">
        <svg 
          ref={chartSvgRef}
          viewBox="0 0 400 400" 
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="southBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>
          </defs>

          {/* Outer Border */}
          <rect x="6" y="6" width="388" height="388" fill="none" stroke="url(#southBorderGrad)" strokeWidth="3" rx="4" />
          <rect x="11" y="11" width="378" height="378" fill="none" stroke="#F97316" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />

          {/* Inner Grid Lines */}
          <line x1="105" y1="11" x2="105" y2="389" stroke="#EA580C" strokeWidth="1.5" opacity="0.7" />
          <line x1="200" y1="11" x2="200" y2="389" stroke="#EA580C" strokeWidth="1.5" opacity="0.7" />
          <line x1="295" y1="11" x2="295" y2="389" stroke="#EA580C" strokeWidth="1.5" opacity="0.7" />
          
          <line x1="11" y1="105" x2="389" y2="105" stroke="#EA580C" strokeWidth="1.5" opacity="0.7" />
          <line x1="11" y1="200" x2="389" y2="200" stroke="#EA580C" strokeWidth="1.5" opacity="0.7" />
          <line x1="11" y1="295" x2="389" y2="295" stroke="#EA580C" strokeWidth="1.5" opacity="0.7" />

          {/* Central 2x2 Sacred Box */}
          <rect x="105" y="105" width="190" height="190" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1.8" />
          <circle cx="200" cy="200" r="42" fill="#FED7AA" opacity="0.2" />
          <circle cx="200" cy="200" r="28" fill="#F97316" opacity="0.1" />

          <text x="200" y="160" textAnchor="middle" fill="#7C2D12" fontSize="13" fontFamily="Playfair Display, serif" fontWeight="800">
            {activeMeta.name}
          </text>
          <text x="200" y="178" textAnchor="middle" fill="#EA580C" fontSize="11" fontWeight="700">
            {activeChartType} &bull; {activeMeta.hindi}
          </text>
          <text x="200" y="198" textAnchor="middle" fill="#9A3412" fontSize="9.5" fontWeight="600">
            Lagna: {SIGN_GRID.find(s => s.index === chartAscendantSignIndex)?.name} ({showDegrees ? ascDegreeDisplay : 'ASC'})
          </text>
          <text x="200" y="218" textAnchor="middle" fill="#7C2D12" fontSize="9" fontWeight="600">
            Moon: {result.moonSign.split(' ')[0]} ({result.nakshatra})
          </text>
          <text x="200" y="238" textAnchor="middle" fill="#C2410C" fontSize="8" letterSpacing="0.04em">
            दक्षिण भारतीय स्थिर राशि चक्र
          </text>

          {/* 12 Outer Fixed Zodiac Cells */}
          {SIGN_GRID.map((cell) => {
            const x = 11 + cell.c * 94.5;
            const y = 11 + cell.r * 94.5;
            const isAsc = cell.index === chartAscendantSignIndex;
            const isSelected = activeSignIndex === cell.index;
            const houseFromLagna = (((cell.index - chartAscendantSignIndex) % 12 + 12) % 12) + 1;
            const planetsInSign = positions.filter(p => p.signIndex === cell.index);

            return (
              <g 
                key={`south-cell-${cell.name}`}
                className="cursor-pointer"
                onClick={() => setActiveSignIndex(cell.index)}
              >
                {/* Interactive Cell Background */}
                <rect
                  x={x}
                  y={y}
                  width="94.5"
                  height="94.5"
                  className={`transition-colors ${
                    isSelected 
                      ? 'fill-orange-200/80 stroke-[#EA580C] stroke-[1.8]' 
                      : isAsc 
                      ? 'fill-orange-100/60 hover:fill-orange-100/90' 
                      : 'fill-transparent hover:fill-orange-50/70'
                  }`}
                />

                {/* Lagna Diagonal Cross Hatch in South Indian Tradition */}
                {isAsc && (
                  <g pointerEvents="none" opacity="0.65">
                    <line x1={x + 3} y1={y + 3} x2={x + 91.5} y2={y + 91.5} stroke="#EA580C" strokeWidth="1.8" strokeDasharray="4 2" />
                    <text
                      x={x + 12}
                      y={y + 16}
                      fill="#DC2626"
                      fontSize="9"
                      fontWeight="900"
                    >
                      {showDegrees ? `ASC: ${ascDegreeDisplay}` : 'ASC'}
                    </text>
                  </g>
                )}

                {/* Sign Name & House Number */}
                <text
                  x={x + 6}
                  y={y + 14}
                  fill="#7C2D12"
                  fontSize="9.5"
                  fontWeight="800"
                  fontFamily="Playfair Display, serif"
                  pointerEvents="none"
                >
                  {cell.hindi}
                </text>
                <text
                  x={x + 88}
                  y={y + 14}
                  textAnchor="end"
                  fill="#EA580C"
                  fontSize="8.5"
                  fontWeight="700"
                  pointerEvents="none"
                >
                  H{houseFromLagna}
                </text>

                {/* Planets In Sign with Exact Degrees & Minutes (e.g. Sun: 12° 24') */}
                {planetsInSign.length > 0 && (
                  <g>
                    {planetsInSign.map((pl, pIdx) => {
                      const total = planetsInSign.length;
                      const py = y + 30 + pIdx * (total > 3 ? 12 : 14.5);
                      const isPlSelected = selectedPlanet === pl.name;

                      // Exact Degrees string when enabled (e.g., 'Sun: 12° 24'')
                      let degSuffix = '';
                      if (showDegrees) {
                        if (degreeMode === 'dms') {
                          degSuffix = `: ${formatDMS(pl.degreesInSign)}`;
                        } else if (degreeMode === 'nakshatra') {
                          degSuffix = `: ${formatDMS(pl.degreesInSign)} [${getNakShortCode(pl.nakshatra, pl.pada)}]`;
                        } else if (degreeMode === 'dignity') {
                          degSuffix = `: ${formatDMS(pl.degreesInSign)} [${getDignityCode(pl.dignity)}]`;
                        } else if (degreeMode === 'compact') {
                          degSuffix = `: ${pl.degreesInSign.toFixed(0)}°`;
                        }
                      }

                      // Full planet name clearly shown (e.g. "Sun: 12° 24'")
                      const displayText = `${pl.symbol} ${pl.name}${pl.isRetrograde ? ' (R)' : ''}${pl.isCombust ? ' [C]' : ''}${degSuffix}`;

                      return (
                        <text
                          key={pl.name}
                          x={x + 47}
                          y={py}
                          textAnchor="middle"
                          fill={isPlSelected ? '#DC2626' : pl.color || '#9A3412'}
                          fontSize={total > 3 ? '7.5' : total > 2 ? '8' : '8.5'}
                          fontWeight={isPlSelected ? '900' : '700'}
                          className="hover:opacity-80 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSignIndex(cell.index);
                            if (onSelectPlanet) onSelectPlanet(pl.name);
                          }}
                        >
                          {displayText}
                        </text>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Toggle Button Below Chart Canvas: Show/Hide Degrees & Format Controls */}
      <div className="p-3 rounded-2xl bg-[#FFF7ED] border border-orange-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            id="south-toggle-degrees-btn"
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

      {/* House & Sign Inspector Box */}
      <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-orange-200 text-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-200 pb-2">
          <div className="font-playfair text-sm text-[#EA580C] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Sign: {currentSign.name} ({currentSign.hindi}) &bull; Element: {currentSign.element}</span>
          </div>
          <span className="text-[11px] font-bold text-[#7C2D12] bg-white px-2.5 py-0.5 rounded-lg border border-orange-200">
            House #{houseOfActiveSign} from Lagna &bull; Ruler: {currentSign.lord}
          </span>
        </div>

        {currentPlanetsInActiveSign.length > 0 ? (
          <div className="pt-1 flex flex-wrap items-center gap-2">
            <span className="font-bold text-[#EA580C]">Occupants:</span>
            {currentPlanetsInActiveSign.map((p) => (
              <span
                key={p.name}
                onClick={() => onSelectPlanet && onSelectPlanet(p.name)}
                className="cursor-pointer inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-orange-200 font-semibold hover:border-orange-400 text-xs shadow-2xs"
                style={{ color: p.color || '#EA580C' }}
              >
                <span>{p.symbol}</span>
                <span>{p.hindiName} ({p.name})</span>
                <span className="text-[#9A3412] font-normal">[{formatDMS(p.degreesInSign)} in {p.rashi}]</span>
                {p.isRetrograde && <span className="text-red-600 font-bold text-[9px]">(R)</span>}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-[#9A3412] italic text-[11px]">
            No direct planetary occupants in {currentSign.name} for {activeChartType}.
          </div>
        )}
      </div>

      {/* 12 Signs / Bhavas Comprehensive Table */}
      {showHouseTable && (
        <div className="p-3.5 rounded-2xl bg-white border border-orange-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-orange-100 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#7C2D12]">
              <Table className="w-4 h-4 text-[#EA580C]" />
              <span>South Indian Zodiac Grid &bull; 12 Rashis Degrees Table ({activeChartType})</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-orange-50/80 text-[#7C2D12] border-b border-orange-200 font-bold">
                  <th className="py-2 px-2.5">Sign #</th>
                  <th className="py-2 px-2.5">Rashi</th>
                  <th className="py-2 px-2.5">House from Lagna</th>
                  <th className="py-2 px-2.5">Lord</th>
                  <th className="py-2 px-2.5">Planets &amp; Degrees</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {SIGN_GRID.map((cell) => {
                  const houseFromLagna = (((cell.index - chartAscendantSignIndex) % 12 + 12) % 12) + 1;
                  const occupants = positions.filter(p => p.signIndex === cell.index);
                  const isCurrent = activeSignIndex === cell.index;

                  return (
                    <tr 
                      key={cell.name}
                      onClick={() => setActiveSignIndex(cell.index)}
                      className={`cursor-pointer transition-colors ${
                        isCurrent 
                          ? 'bg-orange-100/70 font-semibold' 
                          : 'hover:bg-orange-50/50'
                      }`}
                    >
                      <td className="py-2 px-2.5">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-orange-100 text-[#EA580C] font-bold text-[10px] border border-orange-300">
                          {cell.signNum}
                        </span>
                      </td>
                      <td className="py-2 px-2.5 text-[#7C2D12]">
                        {cell.name} ({cell.hindi})
                        {cell.index === chartAscendantSignIndex && (
                          <span className="ml-1 text-[9.5px] text-[#EA580C] font-bold">
                            [ASC: {ascDegreeDisplay}]
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-2.5 text-[#9A3412]">
                        House #{houseFromLagna}
                      </td>
                      <td className="py-2 px-2.5 text-[#7C2D12]">
                        {cell.lord}
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
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-[10px]">—</span>
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
