import React, { useState, useRef } from 'react';
import { KundliResult, PlanetaryPosition } from '../types';
import { 
  Compass, 
  Download, 
  Check, 
  Sparkles,
  Layers,
  Eye,
  Info
} from 'lucide-react';

interface PlanetaryPositionDrawingProps {
  result: KundliResult;
  selectedPlanet?: string | null;
  onSelectPlanet?: (planetName: string | null) => void;
  showControls?: boolean;
}

export const PlanetaryPositionDrawing: React.FC<PlanetaryPositionDrawingProps> = ({
  result,
  selectedPlanet: externalSelectedPlanet,
  onSelectPlanet,
  showControls = true
}) => {
  const [internalSelectedPlanet, setInternalSelectedPlanet] = useState<string | null>('Jupiter');
  const [showAspectRays, setShowAspectRays] = useState(true);
  const [showDegrees, setShowDegrees] = useState(true);
  const [showZodiacSymbols, setShowZodiacSymbols] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const selectedPlanet = externalSelectedPlanet !== undefined ? externalSelectedPlanet : internalSelectedPlanet;
  const setSelectedPlanet = (p: string | null) => {
    if (onSelectPlanet) onSelectPlanet(p);
    else setInternalSelectedPlanet(p);
  };

  const positions: PlanetaryPosition[] = result.planetaryPositions || [];
  const activePlanet = positions.find((p) => p.name === selectedPlanet) || positions[0] || null;

  // Determine Ascendant longitude on 360° wheel
  const ascendantSignStr = result.ascendant.split(' ')[0];
  const RASHI_NAMES = [
    'Aries', 'Taurus', 'Gemini', 'Cancer',
    'Leo', 'Virgo', 'Libra', 'Scorpio',
    'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];
  const foundAscIndex = RASHI_NAMES.findIndex(
    r => ascendantSignStr.toLowerCase().includes(r.toLowerCase())
  );
  const safeAscIndex = foundAscIndex >= 0 ? foundAscIndex : 0;
  const ascendantAbsDeg = result.ascendantDegree !== undefined 
    ? ((safeAscIndex * 30 + result.ascendantDegree) % 360) 
    : ((safeAscIndex * 30 + 15) % 360);
  const isAscSelected = selectedPlanet === 'Ascendant' || selectedPlanet === 'Lagna';

  // 12 Zodiac signs in order (0 = Aries ... 11 = Pisces)
  // Element Color Schemes:
  // Fire = Red/Orange gradients
  // Earth = Brown/Green gradients
  // Air = Yellow/Cyan/Sky gradients
  // Water = Blue/Sapphire gradients
  const ZODIAC_SIGNS = [
    { 
      index: 0, 
      name: 'Aries', 
      hindi: 'मेष', 
      symbol: '♈', 
      element: 'Fire', 
      lord: 'Mars',
      gradId: 'grad-fire-aries',
      textColor: '#FED7AA',
      accentColor: '#EF4444'
    },
    { 
      index: 1, 
      name: 'Taurus', 
      hindi: 'वृषभ', 
      symbol: '♉', 
      element: 'Earth', 
      lord: 'Venus',
      gradId: 'grad-earth-taurus',
      textColor: '#BBF7D0',
      accentColor: '#22C55E'
    },
    { 
      index: 2, 
      name: 'Gemini', 
      hindi: 'मिथुन', 
      symbol: '♊', 
      element: 'Air', 
      lord: 'Mercury',
      gradId: 'grad-air-gemini',
      textColor: '#BAE6FD',
      accentColor: '#38BDF8'
    },
    { 
      index: 3, 
      name: 'Cancer', 
      hindi: 'कर्क', 
      symbol: '♋', 
      element: 'Water', 
      lord: 'Moon',
      gradId: 'grad-water-cancer',
      textColor: '#BFDBFE',
      accentColor: '#60A5FA'
    },
    { 
      index: 4, 
      name: 'Leo', 
      hindi: 'सिंह', 
      symbol: '♌', 
      element: 'Fire', 
      lord: 'Sun',
      gradId: 'grad-fire-leo',
      textColor: '#FFEDD5',
      accentColor: '#F97316'
    },
    { 
      index: 5, 
      name: 'Virgo', 
      hindi: 'कन्या', 
      symbol: '♍', 
      element: 'Earth', 
      lord: 'Mercury',
      gradId: 'grad-earth-virgo',
      textColor: '#CCFBF1',
      accentColor: '#14B8A6'
    },
    { 
      index: 6, 
      name: 'Libra', 
      hindi: 'तुला', 
      symbol: '♎', 
      element: 'Air', 
      lord: 'Venus',
      gradId: 'grad-air-libra',
      textColor: '#FDE68A',
      accentColor: '#FBBF24'
    },
    { 
      index: 7, 
      name: 'Scorpio', 
      hindi: 'वृश्चिक', 
      symbol: '♏', 
      element: 'Water', 
      lord: 'Mars',
      gradId: 'grad-water-scorpio',
      textColor: '#DDD6FE',
      accentColor: '#818CF8'
    },
    { 
      index: 8, 
      name: 'Sagittarius', 
      hindi: 'धनु', 
      symbol: '♐', 
      element: 'Fire', 
      lord: 'Jupiter',
      gradId: 'grad-fire-sag',
      textColor: '#FEF08A',
      accentColor: '#F59E0B'
    },
    { 
      index: 9, 
      name: 'Capricorn', 
      hindi: 'मकर', 
      symbol: '♑', 
      element: 'Earth', 
      lord: 'Saturn',
      gradId: 'grad-earth-capri',
      textColor: '#D1D5DB',
      accentColor: '#94A3B8'
    },
    { 
      index: 10, 
      name: 'Aquarius', 
      hindi: 'कुंभ', 
      symbol: '♒', 
      element: 'Air', 
      lord: 'Saturn',
      gradId: 'grad-air-aqua',
      textColor: '#A5F3FC',
      accentColor: '#22D3EE'
    },
    { 
      index: 11, 
      name: 'Pisces', 
      hindi: 'मीन', 
      symbol: '♓', 
      element: 'Water', 
      lord: 'Jupiter',
      gradId: 'grad-water-pisces',
      textColor: '#C7D2FE',
      accentColor: '#6366F1'
    }
  ];

  // SVG Geometry constants (Astrolabe scale)
  const CX = 250;
  const CY = 250;
  const R_ASTROLABE_BEZEL = 244;
  const R_OUTER = 232;
  const R_ZODIAC_INNER = 184;
  const R_ORBIT = 142;
  const R_INNER_CORE = 80;

  // Convert degrees to SVG coordinates (0° is top, clockwise)
  const degToCoord = (deg: number, radius: number) => {
    // 0 deg at top = -90 deg standard math angle
    const angleRad = ((deg - 90) * Math.PI) / 180;
    return {
      x: CX + radius * Math.cos(angleRad),
      y: CY + radius * Math.sin(angleRad)
    };
  };

  // Helper to generate SVG Arc Path for a sign segment (30 degrees each)
  const getSectorPath = (startDeg: number, endDeg: number, rIn: number, rOut: number) => {
    const p1 = degToCoord(startDeg, rOut);
    const p2 = degToCoord(endDeg, rOut);
    const p3 = degToCoord(endDeg, rIn);
    const p4 = degToCoord(startDeg, rIn);

    return `M ${p1.x} ${p1.y} A ${rOut} ${rOut} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rIn} ${rIn} 0 0 0 ${p4.x} ${p4.y} Z`;
  };

  // Get planet gradient ID
  const getPlanetGradId = (planetName: string) => {
    switch (planetName.toLowerCase()) {
      case 'sun': return 'grad-planet-sun';
      case 'moon': return 'grad-planet-moon';
      case 'mars': return 'grad-planet-mars';
      case 'mercury': return 'grad-planet-mercury';
      case 'jupiter': return 'grad-planet-jupiter';
      case 'venus': return 'grad-planet-venus';
      case 'saturn': return 'grad-planet-saturn';
      case 'rahu': return 'grad-planet-rahu';
      case 'ketu': return 'grad-planet-ketu';
      default: return 'grad-planet-sun';
    }
  };

  const getPlanetGlowColor = (planetName: string) => {
    switch (planetName.toLowerCase()) {
      case 'sun': return 'rgba(245, 158, 11, 0.85)';
      case 'moon': return 'rgba(226, 232, 240, 0.85)';
      case 'mars': return 'rgba(239, 68, 68, 0.85)';
      case 'mercury': return 'rgba(16, 185, 129, 0.85)';
      case 'jupiter': return 'rgba(251, 191, 36, 0.9)';
      case 'venus': return 'rgba(244, 114, 182, 0.85)';
      case 'saturn': return 'rgba(99, 102, 241, 0.85)';
      case 'rahu': return 'rgba(139, 92, 246, 0.85)';
      case 'ketu': return 'rgba(249, 115, 22, 0.85)';
      default: return 'rgba(245, 158, 11, 0.85)';
    }
  };

  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `Vedic_Astrolabe_Planetary_Drawing_${result.ascendant.split(' ')[0]}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Title & Filter Options */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="text-[11px] font-bold text-[#EA580C] uppercase tracking-[0.18em] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#F97316]" />
            360° Vedic Astrolabe Drawing &bull; ग्रह स्थिति चक्र
          </span>
          <p className="text-[11px] text-[#9A3412]">
            Mystical celestial astrolabe rendering planetary coordinates, element rings, and radiant aspect rays
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {showControls && (
            <button
              onClick={() => setShowAspectRays(!showAspectRays)}
              className={`px-2.5 py-1 rounded-lg text-[10.5px] font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                showAspectRays
                  ? 'bg-amber-600 text-white border-amber-500 shadow-sm shadow-amber-500/30'
                  : 'bg-white text-[#7C2D12] hover:bg-orange-50 border-orange-300'
              }`}
              title="Toggle Planetary Aspect Rays"
            >
              Aspect Rays ({showAspectRays ? 'ON' : 'OFF'})
            </button>
          )}

          <button
            onClick={() => setShowDegrees(!showDegrees)}
            className={`px-2.5 py-1 rounded-lg text-[10.5px] font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
              showDegrees
                ? 'bg-orange-500 text-white border-orange-600 shadow-xs'
                : 'bg-white text-[#7C2D12] hover:bg-orange-50 border-orange-300'
            }`}
            title="Toggle Degree Numbers"
          >
            Degrees ({showDegrees ? 'ON' : 'OFF'})
          </button>

          <button
            onClick={handleDownloadSVG}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-semibold uppercase tracking-wider bg-white hover:bg-orange-50 text-[#7C2D12] border border-orange-300 transition-colors shadow-xs cursor-pointer"
            title="Download Vector Astrolabe SVG"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-3 h-3 text-[#EA580C]" />
                <span>Save Astrolabe</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Drawing Visual Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* SVG Drawing Canvas wrapped in Dark Frosted Glass Container */}
        <div className="lg:col-span-7 bg-[#2A0800]/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-amber-500/30 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          
          {/* Subtle Ambient Cosmic Gold Glow in Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />

          {/* SVG Astrolabe Canvas */}
          <div className="relative w-full max-w-[420px] aspect-square z-10">
            <svg
              ref={svgRef}
              viewBox="0 0 500 500"
              className="w-full h-full select-none drop-shadow-2xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 1. Element-Based Rich Gradients for 12 Zodiac Segments */}
                {/* Fire Signs: Rich Ruby Red & Solar Orange */}
                <linearGradient id="grad-fire-aries" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="50%" stopColor="#991B1B" />
                  <stop offset="100%" stopColor="#450A0A" />
                </linearGradient>
                <linearGradient id="grad-fire-leo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="50%" stopColor="#C2410C" />
                  <stop offset="100%" stopColor="#7C2D12" />
                </linearGradient>
                <linearGradient id="grad-fire-sag" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EA580C" />
                  <stop offset="50%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>

                {/* Earth Signs: Deep Rich Emerald & Terracotta Earthen Brown */}
                <linearGradient id="grad-earth-taurus" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#15803D" />
                  <stop offset="60%" stopColor="#14532D" />
                  <stop offset="100%" stopColor="#052E16" />
                </linearGradient>
                <linearGradient id="grad-earth-virgo" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0D9488" />
                  <stop offset="60%" stopColor="#115E59" />
                  <stop offset="100%" stopColor="#042F2E" />
                </linearGradient>
                <linearGradient id="grad-earth-capri" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#65A30D" />
                  <stop offset="50%" stopColor="#3F6212" />
                  <stop offset="100%" stopColor="#1A2E05" />
                </linearGradient>

                {/* Air Signs: Luminous Golden Yellow, Sky Blue & Cyan */}
                <linearGradient id="grad-air-gemini" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="60%" stopColor="#0369A1" />
                  <stop offset="100%" stopColor="#082F49" />
                </linearGradient>
                <linearGradient id="grad-air-libra" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="60%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#451A03" />
                </linearGradient>
                <linearGradient id="grad-air-aqua" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0891B2" />
                  <stop offset="60%" stopColor="#0E7490" />
                  <stop offset="100%" stopColor="#164E63" />
                </linearGradient>

                {/* Water Signs: Deep Ocean Sapphire, Indigo & Mystic Violet Blue */}
                <linearGradient id="grad-water-cancer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="60%" stopColor="#1D4ED8" />
                  <stop offset="100%" stopColor="#172554" />
                </linearGradient>
                <linearGradient id="grad-water-scorpio" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4338CA" />
                  <stop offset="60%" stopColor="#3730A3" />
                  <stop offset="100%" stopColor="#1E1B4B" />
                </linearGradient>
                <linearGradient id="grad-water-pisces" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="60%" stopColor="#1E40AF" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>

                {/* 2. Planetary Node Radial Gradients (Radiant Celestial Orbs) */}
                <radialGradient id="grad-planet-sun" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="45%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </radialGradient>

                <radialGradient id="grad-planet-moon" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#64748B" />
                </radialGradient>

                <radialGradient id="grad-planet-mars" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FCA5A5" />
                  <stop offset="45%" stopColor="#EF4444" />
                  <stop offset="100%" stopColor="#991B1B" />
                </radialGradient>

                <radialGradient id="grad-planet-mercury" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#A7F3D0" />
                  <stop offset="45%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#065F46" />
                </radialGradient>

                <radialGradient id="grad-planet-jupiter" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="45%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#D97706" />
                </radialGradient>

                <radialGradient id="grad-planet-venus" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FCE7F3" />
                  <stop offset="45%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#9D174D" />
                </radialGradient>

                <radialGradient id="grad-planet-saturn" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#E0E7FF" />
                  <stop offset="45%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#312E81" />
                </radialGradient>

                <radialGradient id="grad-planet-rahu" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#DDD6FE" />
                  <stop offset="45%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#4C1D95" />
                </radialGradient>

                <radialGradient id="grad-planet-ketu" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FED7AA" />
                  <stop offset="45%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#7C2D12" />
                </radialGradient>

                {/* 3. Center Astrolabe Core Hub */}
                <radialGradient id="astrolabeCore" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FEF3C7" />
                  <stop offset="40%" stopColor="#F59E0B" />
                  <stop offset="85%" stopColor="#78350F" />
                  <stop offset="100%" stopColor="#2A0800" />
                </radialGradient>

                <radialGradient id="astrolabeCenterVoid" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3F1003" />
                  <stop offset="80%" stopColor="#1A0500" />
                  <stop offset="100%" stopColor="#0B0200" />
                </radialGradient>

                {/* 4. Astrolabe Bezel Gold Gradient */}
                <linearGradient id="astrolabeGoldBezel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="25%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#B45309" />
                  <stop offset="75%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#FDE68A" />
                </linearGradient>

                {/* 5. Radiant Graha Node Glow Filter */}
                <filter id="radiantGlow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
                  <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* 6. Subtle Gold Line Glow */}
                <filter id="faintGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Astrolabe Base Plate Background */}
              <circle cx={CX} cy={CY} r={R_ASTROLABE_BEZEL} fill="#140400" />

              {/* Outer Astrolabe Engraved Brass Bezel Ring */}
              <circle 
                cx={CX} 
                cy={CY} 
                r={R_ASTROLABE_BEZEL} 
                fill="none" 
                stroke="url(#astrolabeGoldBezel)" 
                strokeWidth="4" 
              />
              <circle 
                cx={CX} 
                cy={CY} 
                r={R_ASTROLABE_BEZEL - 4} 
                fill="none" 
                stroke="#78350F" 
                strokeWidth="1" 
              />

              {/* 360 Degree Outer Bezel Ticks (every 2.5° and 10°) */}
              {Array.from({ length: 144 }).map((_, i) => {
                const deg = i * 2.5;
                const isMajor = deg % 30 === 0;
                const isMid = deg % 10 === 0;
                const r1 = R_ASTROLABE_BEZEL - 4;
                const r2 = R_ASTROLABE_BEZEL - (isMajor ? 11 : isMid ? 8 : 5);
                const p1 = degToCoord(deg, r1);
                const p2 = degToCoord(deg, r2);
                return (
                  <line
                    key={`tick-${i}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={isMajor ? '#FDE68A' : isMid ? '#F59E0B' : '#B45309'}
                    strokeWidth={isMajor ? 1.4 : isMid ? 1 : 0.6}
                    opacity={isMajor ? 0.95 : isMid ? 0.75 : 0.45}
                  />
                );
              })}

              {/* 12 Zodiac Sign Outer Segments with Element-based Rich Gradients */}
              {ZODIAC_SIGNS.map((sign) => {
                const startAngle = sign.index * 30;
                const endAngle = startAngle + 30;
                const midAngle = startAngle + 15;
                const isSignSelected = activePlanet && activePlanet.signIndex === sign.index;

                const textCoord = degToCoord(midAngle, (R_OUTER + R_ZODIAC_INNER) / 2);
                const symCoord = degToCoord(midAngle, R_OUTER - 15);
                const borderLine = degToCoord(startAngle, R_OUTER);
                const innerBorderLine = degToCoord(startAngle, R_ZODIAC_INNER);

                return (
                  <g key={sign.index} className="transition-all duration-300">
                    {/* Element-Gradient Arc Segment */}
                    <path
                      d={getSectorPath(startAngle, endAngle, R_ZODIAC_INNER, R_OUTER)}
                      fill={`url(#${sign.gradId})`}
                      stroke={isSignSelected ? '#FDE68A' : '#F59E0B'}
                      strokeWidth={isSignSelected ? '2' : '0.8'}
                      opacity={isSignSelected ? 1 : 0.88}
                      className="cursor-pointer hover:opacity-100 transition-opacity"
                    />

                    {/* Outer Gold Arc Border */}
                    <path
                      d={`M ${degToCoord(startAngle, R_OUTER).x} ${degToCoord(startAngle, R_OUTER).y} A ${R_OUTER} ${R_OUTER} 0 0 1 ${degToCoord(endAngle, R_OUTER).x} ${degToCoord(endAngle, R_OUTER).y}`}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="1.2"
                      opacity="0.8"
                    />

                    {/* Sector Divider Ray with Astrolabe Rivet Marker */}
                    <line
                      x1={innerBorderLine.x}
                      y1={innerBorderLine.y}
                      x2={borderLine.x}
                      y2={borderLine.y}
                      stroke="url(#astrolabeGoldBezel)"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={borderLine.x}
                      cy={borderLine.y}
                      r="2"
                      fill="#FDE68A"
                      stroke="#78350F"
                      strokeWidth="0.5"
                    />

                    {/* Zodiac Symbol & Hindi Glyph */}
                    {showZodiacSymbols && (
                      <>
                        <text
                          x={symCoord.x}
                          y={symCoord.y + 4}
                          textAnchor="middle"
                          fill={sign.textColor}
                          fontSize="13"
                          fontWeight="800"
                          filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.8))"
                        >
                          {sign.symbol}
                        </text>
                        <text
                          x={textCoord.x}
                          y={textCoord.y + 11}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="8.5"
                          fontWeight="700"
                          letterSpacing="0.05em"
                          filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.9))"
                        >
                          {sign.hindi}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

              {/* Inner Zodiac Brass Border Ring */}
              <circle
                cx={CX}
                cy={CY}
                r={R_ZODIAC_INNER}
                fill="none"
                stroke="url(#astrolabeGoldBezel)"
                strokeWidth="2"
              />

              {/* Inner Cosmic Celestial Field */}
              <circle
                cx={CX}
                cy={CY}
                r={R_ZODIAC_INNER - 1}
                fill="url(#astrolabeCenterVoid)"
              />

              {/* SUBTLE DASHED CONCENTRIC ORBITAL RINGS in FAINT GOLD (stroke-amber-500/20) */}
              {/* Ring 1 (Outer Zodiac Sub-Ring) */}
              <circle
                cx={CX}
                cy={CY}
                r={170}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.2"
              />

              {/* Ring 2 (Graha Main Orbit Ring) */}
              <circle
                cx={CX}
                cy={CY}
                r={R_ORBIT + 14}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.2"
                strokeDasharray="6 4"
                opacity="0.25"
              />

              {/* Ring 3 (Graha Primary Track) */}
              <circle
                cx={CX}
                cy={CY}
                r={R_ORBIT}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeDasharray="5 3"
                opacity="0.35"
              />

              {/* Ring 4 (Inner Graha Track) */}
              <circle
                cx={CX}
                cy={CY}
                r={R_ORBIT - 14}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.2"
              />

              {/* Ring 5 (Nakshatra & Core Orbit) */}
              <circle
                cx={CX}
                cy={CY}
                r={108}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1"
                strokeDasharray="3 5"
                opacity="0.2"
              />

              {/* Ring 6 (Inner Pre-Hub Orbit) */}
              <circle
                cx={CX}
                cy={CY}
                r={92}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.15"
              />

              {/* Astrolabe Coordinate Crosshairs & Cardinal Spoke Rays in Faint Gold */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                const isCardinal = angle % 90 === 0;
                const p1 = degToCoord(angle, R_INNER_CORE + 2);
                const p2 = degToCoord(angle, R_ZODIAC_INNER - 2);
                return (
                  <line
                    key={`crosshair-${angle}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="#F59E0B"
                    strokeWidth={isCardinal ? 1 : 0.6}
                    strokeDasharray={isCardinal ? '4 3' : '2 4'}
                    opacity={isCardinal ? 0.35 : 0.18}
                  />
                );
              })}

              {/* 72 Degree Ticks along the Inner Zodiac Border */}
              {Array.from({ length: 72 }).map((_, i) => {
                const deg = i * 5;
                const isMajor = deg % 30 === 0;
                const isMid = deg % 10 === 0;
                const r1 = R_ZODIAC_INNER;
                const r2 = R_ZODIAC_INNER - (isMajor ? 9 : isMid ? 6 : 3);
                const p1 = degToCoord(deg, r1);
                const p2 = degToCoord(deg, r2);
                return (
                  <line
                    key={`inner-tick-${i}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke="#F59E0B"
                    strokeWidth={isMajor ? 1.2 : 0.7}
                    opacity={isMajor ? 0.7 : isMid ? 0.4 : 0.25}
                  />
                );
              })}

              {/* Active Planet Aspect Rays (Drishti Lines) */}
              {showAspectRays && activePlanet && (
                <g filter="url(#radiantGlow)">
                  {activePlanet.aspectHouses.map((houseNum) => {
                    const targetSignIndex = (activePlanet.signIndex + (houseNum - activePlanet.house) + 12) % 12;
                    const targetDeg = targetSignIndex * 30 + 15;
                    const fromCoord = degToCoord(activePlanet.absoluteDegree, R_ORBIT);
                    const toCoord = degToCoord(targetDeg, R_ZODIAC_INNER);

                    return (
                      <g key={`aspect-${houseNum}`}>
                        {/* Luminous Aspect Beam */}
                        <line
                          x1={fromCoord.x}
                          y1={fromCoord.y}
                          x2={toCoord.x}
                          y2={toCoord.y}
                          stroke="#F59E0B"
                          strokeWidth="2.5"
                          strokeDasharray="6 3"
                          opacity="0.95"
                        />
                        {/* Target Node Aura */}
                        <circle 
                          cx={toCoord.x} 
                          cy={toCoord.y} 
                          r="6" 
                          fill="#F59E0B" 
                          opacity="0.9" 
                        />
                        <circle 
                          cx={toCoord.x} 
                          cy={toCoord.y} 
                          r="2.5" 
                          fill="#FFFBEB" 
                        />
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Center Astrolabe Hub & Golden Sunburst Reticle */}
              {/* Outer Golden Reticle Ring */}
              <circle
                cx={CX}
                cy={CY}
                r={R_INNER_CORE}
                fill="url(#astrolabeCore)"
                stroke="url(#astrolabeGoldBezel)"
                strokeWidth="2.5"
                filter="drop-shadow(0px 0px 8px rgba(245,158,11,0.4))"
              />
              
              {/* Center Sunburst Lotus Petals (8-fold symmetry) */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = i * 45;
                const tip = degToCoord(angle, R_INNER_CORE - 4);
                const left = degToCoord(angle - 22.5, R_INNER_CORE - 24);
                const right = degToCoord(angle + 22.5, R_INNER_CORE - 24);
                return (
                  <polygon
                    key={`petal-${i}`}
                    points={`${CX},${CY} ${left.x},${left.y} ${tip.x},${tip.y} ${right.x},${right.y}`}
                    fill="#F59E0B"
                    opacity="0.18"
                  />
                );
              })}

              {/* Inner Concentric Bezel of Hub */}
              <circle
                cx={CX}
                cy={CY}
                r={R_INNER_CORE - 14}
                fill="#2A0800"
                stroke="#FDE68A"
                strokeWidth="1"
                opacity="0.9"
              />

              {/* Center Hub Sacred Text & Ascendant Data */}
              <text
                x={CX}
                y={CY - 22}
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontFamily="Playfair Display"
                fontWeight="800"
                letterSpacing="0.08em"
                filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.8))"
              >
                ग्रह स्थिति चक्र
              </text>

              <text
                x={CX}
                y={CY - 5}
                textAnchor="middle"
                fill="#F97316"
                fontSize="9.5"
                fontWeight="700"
                letterSpacing="0.04em"
              >
                Lagna: {result.ascendant.split(' ')[0]}
              </text>

              <text
                x={CX}
                y={CY + 12}
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="9"
                fontWeight="600"
              >
                Moon: {result.moonSign.split(' ')[0]}
              </text>

              <text
                x={CX}
                y={CY + 27}
                textAnchor="middle"
                fill="#FED7AA"
                fontSize="8"
                opacity="0.85"
              >
                {positions.length} Radiant Grahas
              </text>

              {/* Ascendant (Lagna) Longitude Pointer & Radial Axis */}
              {(() => {
                const ascPos = degToCoord(ascendantAbsDeg, R_ORBIT + 6);
                const ascSpokeInner = degToCoord(ascendantAbsDeg, R_INNER_CORE);
                const ascSpokeOuter = degToCoord(ascendantAbsDeg, R_ZODIAC_INNER);
                return (
                  <g 
                    className="cursor-pointer transition-all"
                    onClick={() => setSelectedPlanet('Lagna')}
                  >
                    {/* Golden Lagna Cardinal Ray */}
                    <line
                      x1={ascSpokeInner.x}
                      y1={ascSpokeInner.y}
                      x2={ascSpokeOuter.x}
                      y2={ascSpokeOuter.y}
                      stroke="#EA580C"
                      strokeWidth={isAscSelected ? 2.5 : 1.8}
                      strokeDasharray="4 2"
                      opacity="0.9"
                    />

                    {/* Lagna Outer Aura */}
                    <circle
                      cx={ascPos.x}
                      cy={ascPos.y}
                      r={isAscSelected ? 22 : 16}
                      fill="rgba(234, 88, 12, 0.7)"
                      filter="url(#radiantGlow)"
                    />

                    {/* Lagna Diamond Badge */}
                    <rect
                      x={ascPos.x - 11}
                      y={ascPos.y - 11}
                      width={22}
                      height={22}
                      rx={4}
                      transform={`rotate(45 ${ascPos.x} ${ascPos.y})`}
                      fill="#EA580C"
                      stroke="#FED7AA"
                      strokeWidth={isAscSelected ? 2.5 : 1.5}
                      className="shadow-md"
                    />

                    {/* Lagna Sanskrit Symbol / Text */}
                    <text
                      x={ascPos.x}
                      y={ascPos.y + 3.5}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9.5"
                      fontWeight="900"
                    >
                      ल
                    </text>

                    {/* Lagna Title Label */}
                    <text
                      x={ascPos.x}
                      y={ascPos.y + (isAscSelected ? 24 : 20)}
                      textAnchor="middle"
                      fill="#FDBA74"
                      fontSize="9"
                      fontWeight="800"
                      filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.95))"
                    >
                      LAGNA
                    </text>

                    {showDegrees && (
                      <text
                        x={ascPos.x}
                        y={ascPos.y - (isAscSelected ? 17 : 14)}
                        textAnchor="middle"
                        fill="#FED7AA"
                        fontSize="8"
                        fontWeight="800"
                        filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.9))"
                      >
                        15° {result.ascendant.split(' ')[0]}
                      </text>
                    )}
                  </g>
                );
              })()}

              {/* RADIANT PLANETARY NODES (Graha Circles with glowing drop shadows & radial gradients) */}
              {positions.map((pl, idx) => {
                // Alternating radius offset to prevent overlap in tightly clustered signs
                const clusterOffset = (idx % 2 === 0 ? -4 : 8);
                const planetRadius = R_ORBIT + clusterOffset;
                const pos = degToCoord(pl.absoluteDegree, planetRadius);
                const isSelected = selectedPlanet === pl.name;
                const gradId = getPlanetGradId(pl.name);
                const glowColor = getPlanetGlowColor(pl.name);

                return (
                  <g
                    key={pl.name}
                    className="cursor-pointer transition-transform"
                    onClick={() => setSelectedPlanet(pl.name)}
                  >
                    {/* 1. Radiant Outer Aura / Glow Halo */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '22' : '16'}
                      fill={glowColor}
                      opacity={isSelected ? '0.6' : '0.35'}
                      filter="url(#radiantGlow)"
                    />

                    {/* 2. Pulsing Ring for Selected Planet */}
                    {isSelected && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="20"
                        fill="none"
                        stroke="#FDE68A"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        className="animate-spin origin-center"
                        style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                      />
                    )}

                    {/* 3. Golden Astrolabe Bezel for Graha Node */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '14' : '11.5'}
                      fill="none"
                      stroke={isSelected ? '#FDE68A' : '#D97706'}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                    />

                    {/* 4. Radiant Planet Gradient Sphere (Gemstone Node) */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '12.5' : '10'}
                      fill={`url(#${gradId})`}
                    />

                    {/* 5. Graha Symbol Icon */}
                    <text
                      x={pos.x}
                      y={pos.y + 3.5}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize={isSelected ? '11' : '9.5'}
                      fontWeight="900"
                      filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.9))"
                    >
                      {pl.symbol}
                    </text>

                    {/* 6. Full Name Label & Retrograde Indicator */}
                    <text
                      x={pos.x}
                      y={pos.y + (isSelected ? 24 : 19)}
                      textAnchor="middle"
                      fill={isSelected ? '#FDE68A' : '#FED7AA'}
                      fontSize={isSelected ? '9.5' : '8.5'}
                      fontWeight="800"
                      filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.95))"
                    >
                      {pl.name}{pl.isRetrograde ? ' (R)' : ''}
                    </text>

                    {/* 7. Degree Tag in Sign (e.g. 12° 24') */}
                    {showDegrees && (() => {
                      const d = Math.floor(pl.degreesInSign);
                      const m = Math.floor((pl.degreesInSign - d) * 60);
                      const dmsText = `${d}° ${m.toString().padStart(2, '0')}'`;
                      return (
                        <text
                          x={pos.x}
                          y={pos.y - (isSelected ? 16 : 13)}
                          textAnchor="middle"
                          fill={isSelected ? '#FFFFFF' : '#FEF08A'}
                          fontSize={isSelected ? '8.5' : '7.5'}
                          fontWeight="700"
                          filter="drop-shadow(0px 1px 2px rgba(0,0,0,0.9))"
                        >
                          {dmsText}
                        </text>
                      );
                    })()}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Bottom Astrolabe Legend */}
          <div className="mt-3 text-[10.5px] text-amber-200/90 text-center flex flex-wrap items-center justify-center gap-x-4 gap-y-1 relative z-10">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block shadow-[0_0_6px_rgba(239,68,68,0.8)]" /> Fire
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shadow-[0_0_6px_rgba(16,185,129,0.8)]" /> Earth
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shadow-[0_0_6px_rgba(251,191,36,0.8)]" /> Air
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block shadow-[0_0_6px_rgba(59,130,246,0.8)]" /> Water
            </span>
            <span className="text-amber-400 font-medium">&bull; (R) = Retrograde</span>
          </div>
        </div>

        {/* Planet Inspector & Quick Graha Grid */}
        <div className="lg:col-span-5 space-y-3">
          
          {/* Active Selected Planet Card in Premium Warm Astrolabe Card */}
          {activePlanet ? (
            <div className="p-4 rounded-2xl bg-[#2A0800]/95 text-amber-50 border border-amber-500/40 shadow-xl text-xs space-y-3 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_100%_0%,rgba(245,158,11,0.18),transparent_70%)] pointer-events-none" />

              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg border border-amber-300/30"
                    style={{ 
                      backgroundColor: activePlanet.color || '#EA580C',
                      boxShadow: `0 0 14px ${getPlanetGlowColor(activePlanet.name)}`
                    }}
                  >
                    {activePlanet.symbol}
                  </div>
                  <div>
                    <h4 className="font-playfair text-base font-bold text-amber-100">
                      {activePlanet.hindiName} ({activePlanet.name})
                    </h4>
                    <span className="text-[10px] text-amber-300/90 font-semibold">
                      {activePlanet.rashi} ({activePlanet.rashiSanskrit}) &bull; House {activePlanet.house}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    activePlanet.dignity === 'Exalted'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                      : activePlanet.dignity === 'Own Sign'
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                      : activePlanet.dignity === 'Debilitated'
                      ? 'bg-red-950 text-red-300 border border-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.3)]'
                      : 'bg-orange-950 text-orange-200 border border-orange-500/40'
                  }`}>
                    {activePlanet.dignity}
                  </span>
                  {activePlanet.isRetrograde && (
                    <span className="block text-[9.5px] font-bold text-red-400 mt-0.5">
                      Retrograde (वक्री)
                    </span>
                  )}
                </div>
              </div>

              {/* Coordinate Metrics */}
              <div className="grid grid-cols-2 gap-2 text-[11px] relative z-10">
                <div className="bg-[#190500]/80 p-2 rounded-xl border border-amber-500/20">
                  <span className="text-[9px] uppercase tracking-wider text-amber-300/70 block font-semibold">Degrees in Sign</span>
                  <strong className="font-bold text-amber-300">{activePlanet.degreeFormatted}</strong>
                </div>
                <div className="bg-[#190500]/80 p-2 rounded-xl border border-amber-500/20">
                  <span className="text-[9px] uppercase tracking-wider text-amber-300/70 block font-semibold">Nakshatra & Pada</span>
                  <strong className="font-bold text-amber-100">{activePlanet.nakshatra} (Pada {activePlanet.pada})</strong>
                </div>
                <div className="bg-[#190500]/80 p-2 rounded-xl border border-amber-500/20">
                  <span className="text-[9px] uppercase tracking-wider text-amber-300/70 block font-semibold">Karakatva (Role)</span>
                  <span className="font-medium text-amber-200">{activePlanet.karaka.split(' ')[0]}</span>
                </div>
                <div className="bg-[#190500]/80 p-2 rounded-xl border border-amber-500/20">
                  <span className="text-[9px] uppercase tracking-wider text-amber-300/70 block font-semibold">Casts Drishti On</span>
                  <strong className="font-bold text-orange-400">Houses {activePlanet.aspectHouses.join(', ')}</strong>
                </div>
              </div>

              {/* Planetary Insight */}
              <p className="text-[11px] text-amber-200/90 leading-relaxed bg-[#190500]/70 p-2.5 rounded-xl border border-amber-500/20 relative z-10">
                {activePlanet.name === 'Jupiter' && 'Guru blesses the 5th and 9th houses with wisdom, expansion, and spiritual merit.'}
                {activePlanet.name === 'Sun' && 'Surya in this sector provides administrative authority, vitality, and high social recognition.'}
                {activePlanet.name === 'Moon' && 'Chandra placement governs mental tranquility, emotional intelligence, and mother blessings.'}
                {activePlanet.name === 'Mars' && 'Mangal generates executive drive, property gains, and fearless initiative.'}
                {activePlanet.name === 'Mercury' && 'Budha enhances rapid analytical acumen, commercial communication, and mathematical wit.'}
                {activePlanet.name === 'Venus' && 'Shukra radiates aesthetic luxury, relationship harmony, and creative brilliance.'}
                {activePlanet.name === 'Saturn' && 'Shani teaches disciplined patience, karmic justice, and long-term enduring wealth.'}
                {activePlanet.name === 'Rahu' && 'Rahu fuels out-of-the-box unconventional ambition, international horizons, and sharp intuition.'}
                {activePlanet.name === 'Ketu' && 'Ketu unlocks deep spiritual detachment, research breakthrough, and intuitive occult mastery.'}
              </p>
            </div>
          ) : null}

          {/* Quick Graha Selector Buttons */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-[#9A3412] uppercase tracking-wider block">
              Select Planetary Node to Inspect:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {positions.map((pl) => {
                const isSelected = selectedPlanet === pl.name;
                const glow = getPlanetGlowColor(pl.name);
                return (
                  <button
                    key={pl.name}
                    onClick={() => setSelectedPlanet(pl.name)}
                    className={`p-1.5 rounded-xl text-left border text-[10.5px] font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#2A0800] text-amber-200 border-amber-400 shadow-md'
                        : 'bg-white hover:bg-orange-50 text-[#7C2D12] border-orange-200'
                    }`}
                    style={isSelected ? { boxShadow: `0 0 10px ${glow}` } : {}}
                  >
                    <span className="truncate">{pl.symbol} {pl.name}</span>
                    <span className={`text-[9px] font-bold ${isSelected ? 'text-amber-300' : 'text-[#EA580C]'}`}>
                      {pl.degreesInSign.toFixed(0)}°
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
