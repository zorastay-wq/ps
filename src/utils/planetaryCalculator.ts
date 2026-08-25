import * as Astronomy from 'astronomy-engine';
import { 
  PlanetaryPosition, 
  KundliResult, 
  LocationData, 
  ManglikDetails, 
  SadeSatiDetails, 
  KaalSarpDetails, 
  DoshaDiagnostics 
} from '../types';
import { generateLalKitabPrescription } from './lalKitabEngine';
import { calculateFullDashaTimeline } from './dashaEngine';

export const RASHIS = [
  { name: 'Aries', hindi: 'मेष', sanskrit: 'मेष (Mesh)', symbol: '♈', element: 'Fire', lord: 'Mars', luckyNum: 9, luckyColor: 'Coral Red & Saffron' },
  { name: 'Taurus', hindi: 'वृषभ', sanskrit: 'वृषभ (Vrishabh)', symbol: '♉', element: 'Earth', lord: 'Venus', luckyNum: 6, luckyColor: 'Silk White & Cream' },
  { name: 'Gemini', hindi: 'मिथुन', sanskrit: 'मिथुन (Mithun)', symbol: '♊', element: 'Air', lord: 'Mercury', luckyNum: 5, luckyColor: 'Emerald Green' },
  { name: 'Cancer', hindi: 'कर्क', sanskrit: 'कर्क (Kark)', symbol: '♋', element: 'Water', lord: 'Moon', luckyNum: 2, luckyColor: 'Pearl White & Silver' },
  { name: 'Leo', hindi: 'सिंह', sanskrit: 'सिंह (Simha)', symbol: '♌', element: 'Fire', lord: 'Sun', luckyNum: 1, luckyColor: 'Golden Yellow & Orange' },
  { name: 'Virgo', hindi: 'कन्या', sanskrit: 'कन्या (Kanya)', symbol: '♍', element: 'Earth', lord: 'Mercury', luckyNum: 5, luckyColor: 'Dark Green & Beige' },
  { name: 'Libra', hindi: 'तुला', sanskrit: 'तुला (Tula)', symbol: '♎', element: 'Air', lord: 'Venus', luckyNum: 6, luckyColor: 'Sky Blue & Pink' },
  { name: 'Scorpio', hindi: 'वृश्चिक', sanskrit: 'वृश्चिक (Vrishchik)', symbol: '♏', element: 'Water', lord: 'Mars', luckyNum: 9, luckyColor: 'Crimson Red & Maroon' },
  { name: 'Sagittarius', hindi: 'धनु', sanskrit: 'धनु (Dhanu)', symbol: '♐', element: 'Fire', lord: 'Jupiter', luckyNum: 3, luckyColor: 'Bright Yellow & Gold' },
  { name: 'Capricorn', hindi: 'मकर', sanskrit: 'मकर (Makar)', symbol: '♑', element: 'Earth', lord: 'Saturn', luckyNum: 8, luckyColor: 'Royal Blue & Black' },
  { name: 'Aquarius', hindi: 'कुंभ', sanskrit: 'कुंभ (Kumbh)', symbol: '♒', element: 'Air', lord: 'Saturn', luckyNum: 8, luckyColor: 'Electric Blue & Navy' },
  { name: 'Pisces', hindi: 'मीन', sanskrit: 'मीन (Meen)', symbol: '♓', element: 'Water', lord: 'Jupiter', luckyNum: 3, luckyColor: 'Turquoise & Saffron' }
];

export const NAKSHATRAS = [
  { name: 'Ashwini', hindi: 'अश्विनी', lord: 'Ketu', deity: 'Ashwini Kumaras' },
  { name: 'Bharani', hindi: 'भरणी', lord: 'Venus', deity: 'Yama' },
  { name: 'Krittika', hindi: 'कृत्तिका', lord: 'Sun', deity: 'Agni' },
  { name: 'Rohini', hindi: 'रोहिणी', lord: 'Moon', deity: 'Brahma' },
  { name: 'Mrigashira', hindi: 'मृगशिरा', lord: 'Mars', deity: 'Soma' },
  { name: 'Ardra', hindi: 'आर्द्रा', lord: 'Rahu', deity: 'Rudra' },
  { name: 'Punarvasu', hindi: 'पुनर्वसु', lord: 'Jupiter', deity: 'Aditi' },
  { name: 'Pushya', hindi: 'पुष्य', lord: 'Saturn', deity: 'Brihaspati' },
  { name: 'Ashlesha', hindi: 'अश्लेषा', lord: 'Mercury', deity: 'Nagas' },
  { name: 'Magha', hindi: 'मघा', lord: 'Ketu', deity: 'Pitris' },
  { name: 'Purva Phalguni', hindi: 'पूर्वाफाल्गुनी', lord: 'Venus', deity: 'Bhaga' },
  { name: 'Uttara Phalguni', hindi: 'उत्तराफाल्गुनी', lord: 'Sun', deity: 'Aryaman' },
  { name: 'Hasta', hindi: 'हस्त', lord: 'Moon', deity: 'Savitr' },
  { name: 'Chitra', hindi: 'चित्रा', lord: 'Mars', deity: 'Tvashtar' },
  { name: 'Swati', hindi: 'स्वाति', lord: 'Rahu', deity: 'Vayu' },
  { name: 'Vishakha', hindi: 'विशाखा', lord: 'Jupiter', deity: 'Indra-Agni' },
  { name: 'Anuradha', hindi: 'अनुराधा', lord: 'Saturn', deity: 'Mitra' },
  { name: 'Jyeshtha', hindi: 'ज्येष्ठा', lord: 'Mercury', deity: 'Indra' },
  { name: 'Mula', hindi: 'मूल', lord: 'Ketu', deity: 'Nirriti' },
  { name: 'Purva Ashadha', hindi: 'पूर्वाषाढ़ा', lord: 'Venus', deity: 'Apas' },
  { name: 'Uttara Ashadha', hindi: 'उत्तराषाढ़ा', lord: 'Sun', deity: 'Vishvadevas' },
  { name: 'Shravana', hindi: 'श्रवण', lord: 'Moon', deity: 'Vishnu' },
  { name: 'Dhanishta', hindi: 'धनिष्ठा', lord: 'Mars', deity: 'Vasus' },
  { name: 'Shatabhisha', hindi: 'शतभिषा', lord: 'Rahu', deity: 'Varuna' },
  { name: 'Purva Bhadrapada', hindi: 'पूर्वभाद्रपदा', lord: 'Jupiter', deity: 'Aja Ekapada' },
  { name: 'Uttara Bhadrapada', hindi: 'उत्तरभाद्रपदा', lord: 'Saturn', deity: 'Ahirbudhnya' },
  { name: 'Revati', hindi: 'रेवती', lord: 'Mercury', deity: 'Pushan' }
];

export const VIMSHOTTARI_DASHA_LORDS = [
  { lord: 'Ketu', hindi: 'केतु', years: 7 },
  { lord: 'Venus', hindi: 'शुक्र', years: 20 },
  { lord: 'Sun', hindi: 'सूर्य', years: 6 },
  { lord: 'Moon', hindi: 'चन्द्र', years: 10 },
  { lord: 'Mars', hindi: 'मंगल', years: 7 },
  { lord: 'Rahu', hindi: 'राहु', years: 18 },
  { lord: 'Jupiter', hindi: 'बृहस्पति', years: 16 },
  { lord: 'Saturn', hindi: 'शनि', years: 19 },
  { lord: 'Mercury', hindi: 'बुध', years: 17 }
];

export const GEMSTONES_BY_SIGN = [
  'Natural Red Coral (Moonga)', 'White Zircon / Diamond (Heera)', 'Natural Emerald (Panna)',
  'Natural Pearl (Moti)', 'Ruby (Manikya)', 'Natural Emerald (Panna)',
  'Opal / White Sapphire', 'Red Coral (Moonga)', 'Yellow Sapphire (Pukhraj)',
  'Blue Sapphire (Neelam)', 'Blue Sapphire / Amethyst', 'Yellow Sapphire (Pukhraj)'
];

// Helper: Normalize degree to [0, 360)
export function normalize360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

// Helper: Convert Local Time & Date to UTC Date
export function getUtcDate(dob: string, tob: string, utcOffsetHours = 5.5): Date {
  let year = 1995;
  let month = 7;
  let day = 15;

  if (dob) {
    const parts = dob.split('-').map(Number);
    if (parts.length === 3) {
      year = parts[0] || 1995;
      month = parts[1] || 7;
      day = parts[2] || 15;
    }
  }

  const [hourStr, minStr] = (tob || '12:00').split(':');
  const hour = parseInt(hourStr, 10) || 12;
  const min = parseInt(minStr, 10) || 0;

  const totalMinutes = hour * 60 + min - Math.round(utcOffsetHours * 60);
  return new Date(Date.UTC(year, month - 1, day, 0, totalMinutes, 0));
}

// 1. Lahiri (Chitra Paksha) Ayanamsha calculation
// Standard Indian Astronomical Ephemeris formula relative to J2000.0 (JD 2451545.0)
export function getLahiriAyanamsha(time: Astronomy.AstroTime): number {
  const T = time.tt / 36525; // Julian centuries from J2000.0
  // Official Lahiri constant at J2000.0 = 23° 51' 25.53" = 23.8570922°
  // Precession rate = 50.290966" / year = 1.39604167° / century
  return 23.8570922 + 1.39604167 * T + 0.000308 * T * T;
}

// 2. High-precision Sidereal Ascendant (Lagna) Calculation
export function calculateAscendant(
  utcDate: Date,
  lat: number,
  lng: number
): { siderealDeg: number; signIndex: number; degInSign: number; tropicalDeg: number; ayanamsha: number } {
  const time = new Astronomy.AstroTime(utcDate);
  const ayanamsha = getLahiriAyanamsha(time);
  const T = time.tt / 36525;

  // Greenwich Apparent Sidereal Time in hours
  const gastHours = Astronomy.SiderealTime(time);
  // Local Sidereal Time (LST) in hours and degrees
  const lstHours = ((gastHours + lng / 15) % 24 + 24) % 24;
  const ramcRad = (lstHours * 15 * Math.PI) / 180;

  // Geographic latitude in radians
  const phiRad = (lat * Math.PI) / 180;

  // True Obliquity of the Ecliptic (eps)
  const epsDeg = 23.43929111 - 0.013004167 * T;
  const epsRad = (epsDeg * Math.PI) / 180;

  // Rigorous Geocentric Ascendant Formula (Eastern Horizon intersection with Ecliptic):
  // tan(lambda_asc) = cos(RAMC) / (-sin(RAMC) * cos(eps) - tan(phi) * sin(eps))
  const y = Math.cos(ramcRad);
  const x = -(Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(phiRad) * Math.sin(epsRad));
  let tropicalDeg = normalize360((Math.atan2(y, x) * 180) / Math.PI);

  // Convert Tropical to Sidereal via Lahiri Ayanamsha
  const siderealDeg = normalize360(tropicalDeg - ayanamsha);
  const signIndex = Math.floor(siderealDeg / 30);
  const degInSign = siderealDeg % 30;

  return {
    siderealDeg,
    signIndex,
    degInSign,
    tropicalDeg,
    ayanamsha
  };
}

// 3. Planetary Dignity Calculator according to Parashari Jyotish rules
export function getPlanetaryDignity(
  planetName: string,
  signIndex: number,
  degInSign: number
): 'Exalted' | 'Own Sign' | 'Moolatrikona' | 'Friendly' | 'Neutral' | 'Enemy' | 'Debilitated' {
  switch (planetName) {
    case 'Sun':
      if (signIndex === 0) return 'Exalted'; // Aries (Deep exaltation at 10°)
      if (signIndex === 6) return 'Debilitated'; // Libra (Deep debilitation at 10°)
      if (signIndex === 4) {
        return degInSign <= 20 ? 'Moolatrikona' : 'Own Sign'; // Leo
      }
      if (signIndex === 8 || signIndex === 11 || signIndex === 7 || signIndex === 3) return 'Friendly';
      if (signIndex === 2 || signIndex === 5) return 'Neutral';
      return 'Enemy';

    case 'Moon':
      if (signIndex === 1) {
        return degInSign <= 3 ? 'Exalted' : 'Moolatrikona'; // Taurus
      }
      if (signIndex === 7) return 'Debilitated'; // Scorpio
      if (signIndex === 3) return 'Own Sign'; // Cancer
      if (signIndex === 0 || signIndex === 2 || signIndex === 4 || signIndex === 5) return 'Friendly';
      return 'Neutral';

    case 'Mars':
      if (signIndex === 9) return 'Exalted'; // Capricorn (Deep exaltation at 28°)
      if (signIndex === 3) return 'Debilitated'; // Cancer
      if (signIndex === 0) {
        return degInSign <= 12 ? 'Moolatrikona' : 'Own Sign'; // Aries
      }
      if (signIndex === 7) return 'Own Sign'; // Scorpio
      if (signIndex === 4 || signIndex === 8 || signIndex === 11) return 'Friendly';
      if (signIndex === 1 || signIndex === 6) return 'Neutral';
      return 'Enemy';

    case 'Mercury':
      if (signIndex === 5) {
        if (degInSign <= 15) return 'Exalted'; // Virgo 0-15°
        if (degInSign <= 20) return 'Moolatrikona'; // Virgo 16-20°
        return 'Own Sign'; // Virgo 21-30°
      }
      if (signIndex === 11) return 'Debilitated'; // Pisces
      if (signIndex === 2) return 'Own Sign'; // Gemini
      if (signIndex === 4 || signIndex === 1 || signIndex === 6) return 'Friendly';
      if (signIndex === 0 || signIndex === 7 || signIndex === 8 || signIndex === 10) return 'Neutral';
      return 'Enemy';

    case 'Jupiter':
      if (signIndex === 3) return 'Exalted'; // Cancer (Deep exaltation at 5°)
      if (signIndex === 9) return 'Debilitated'; // Capricorn
      if (signIndex === 8) {
        return degInSign <= 10 ? 'Moolatrikona' : 'Own Sign'; // Sagittarius
      }
      if (signIndex === 11) return 'Own Sign'; // Pisces
      if (signIndex === 0 || signIndex === 4 || signIndex === 7) return 'Friendly';
      if (signIndex === 10) return 'Neutral';
      return 'Enemy';

    case 'Venus':
      if (signIndex === 11) return 'Exalted'; // Pisces (Deep exaltation at 27°)
      if (signIndex === 5) return 'Debilitated'; // Virgo
      if (signIndex === 6) {
        return degInSign <= 15 ? 'Moolatrikona' : 'Own Sign'; // Libra
      }
      if (signIndex === 1) return 'Own Sign'; // Taurus
      if (signIndex === 2 || signIndex === 10 || signIndex === 9) return 'Friendly';
      if (signIndex === 3 || signIndex === 4) return 'Enemy';
      return 'Neutral';

    case 'Saturn':
      if (signIndex === 6) return 'Exalted'; // Libra (Deep exaltation at 20°)
      if (signIndex === 0) return 'Debilitated'; // Aries
      if (signIndex === 10) {
        return degInSign <= 20 ? 'Moolatrikona' : 'Own Sign'; // Aquarius
      }
      if (signIndex === 9) return 'Own Sign'; // Capricorn
      if (signIndex === 2 || signIndex === 5 || signIndex === 1) return 'Friendly';
      if (signIndex === 11) return 'Neutral';
      return 'Enemy';

    case 'Rahu':
      if (signIndex === 1 || signIndex === 2) return 'Exalted'; // Taurus / Gemini
      if (signIndex === 7 || signIndex === 8) return 'Debilitated'; // Scorpio / Sagittarius
      if (signIndex === 10) return 'Own Sign'; // Aquarius
      return 'Neutral';

    case 'Ketu':
      if (signIndex === 7 || signIndex === 8) return 'Exalted'; // Scorpio / Sagittarius
      if (signIndex === 1 || signIndex === 2) return 'Debilitated'; // Taurus / Gemini
      if (signIndex === 11) return 'Own Sign'; // Pisces
      return 'Neutral';

    default:
      return 'Neutral';
  }
}

// 4. Format degree to Deg° Min' Sec" string
export function formatDegree(deg: number): string {
  const safeDeg = normalize360(deg) % 30;
  const d = Math.floor(safeDeg);
  const m = Math.floor((safeDeg - d) * 60);
  const s = Math.floor(((safeDeg - d) * 60 - m) * 60);
  return `${String(d).padStart(2, '0')}° ${String(m).padStart(2, '0')}' ${String(s).padStart(2, '0')}"`;
}

// 5. Nakshatra calculation from absolute sidereal longitude
export function getNakshatraInfo(absSiderealDeg: number): {
  name: string;
  hindi: string;
  lord: string;
  deity: string;
  index: number;
  pada: number;
  elapsedFraction: number;
} {
  const normDeg = normalize360(absSiderealDeg);
  const nakSpan = 360 / 27; // 13° 20' = 13.333333°
  const index = Math.floor(normDeg / nakSpan);
  const elapsedInNak = normDeg - index * nakSpan;
  const pada = Math.min(4, Math.floor(elapsedInNak / (nakSpan / 4)) + 1);
  const elapsedFraction = elapsedInNak / nakSpan;
  const nak = NAKSHATRAS[index % 27] || NAKSHATRAS[0];

  return {
    name: nak.name,
    hindi: nak.hindi,
    lord: nak.lord,
    deity: nak.deity,
    index,
    pada,
    elapsedFraction
  };
}

// 6. Calculate Full Planetary Positions with Astronomy Engine
export function calculatePlanetaryPositions(
  dob: string,
  tob: string,
  ascendantIndex: number,
  coordinates?: { lat?: number; lng?: number; utcOffsetHours?: number }
): PlanetaryPosition[] {
  const lat = coordinates?.lat ?? 28.6139; // Default Delhi
  const lng = coordinates?.lng ?? 77.2090;
  const utcOffset = coordinates?.utcOffsetHours ?? 5.5;

  const utcDate = getUtcDate(dob, tob, utcOffset);
  const time = new Astronomy.AstroTime(utcDate);
  const ayanamsha = getLahiriAyanamsha(time);
  const T = time.tt / 36525;

  // 1-hour delta for retrograde detection
  const utcDateNextHour = new Date(utcDate.getTime() + 3600 * 1000);

  const bodies = [
    { name: 'Sun', hindi: 'सूर्य (Surya)', sym: '☉', body: Astronomy.Body.Sun, color: '#EA580C', karaka: 'Atmakaraka (Soul & Father)', aspectOffsets: [7], combustOrb: 0 },
    { name: 'Moon', hindi: 'चन्द्र (Chandra)', sym: '☽', body: Astronomy.Body.Moon, color: '#0284C7', karaka: 'Matrikaraka (Mind & Mother)', aspectOffsets: [7], combustOrb: 12 },
    { name: 'Mars', hindi: 'मंगल (Mangal)', sym: '♂', body: Astronomy.Body.Mars, color: '#DC2626', karaka: 'Bhratrikaraka (Courage & Siblings)', aspectOffsets: [4, 7, 8], combustOrb: 17 },
    { name: 'Mercury', hindi: 'बुध (Budha)', sym: '☿', body: Astronomy.Body.Mercury, color: '#16A34A', karaka: 'Gnatikaraka (Intellect & Commerce)', aspectOffsets: [7], combustOrb: 14 },
    { name: 'Jupiter', hindi: 'बृहस्पति (Guru)', sym: '♃', body: Astronomy.Body.Jupiter, color: '#D97706', karaka: 'Putrakaraka (Wisdom & Fortune)', aspectOffsets: [5, 7, 9], combustOrb: 11 },
    { name: 'Venus', hindi: 'शुक्र (Shukra)', sym: '♀', body: Astronomy.Body.Venus, color: '#EC4899', karaka: 'Darakaraka (Spouse & Luxury)', aspectOffsets: [7], combustOrb: 10 },
    { name: 'Saturn', hindi: 'शनि (Shani)', sym: '♄', body: Astronomy.Body.Saturn, color: '#475569', karaka: 'Ayushkaraka (Discipline & Karma)', aspectOffsets: [3, 7, 10], combustOrb: 15 }
  ];

  // 1. Calculate Sun first to determine combustion
  const sunVec = Astronomy.GeoVector(Astronomy.Body.Sun, utcDate, true);
  const sunEcl = Astronomy.Ecliptic(sunVec);
  const sunSidereal = normalize360(sunEcl.elon - ayanamsha);

  const results: PlanetaryPosition[] = [];

  // Calculate standard 7 classical Grahas
  for (const b of bodies) {
    const v1 = Astronomy.GeoVector(b.body, utcDate, true);
    const e1 = Astronomy.Ecliptic(v1);

    // Retrograde check via 1-hour forward position
    const v2 = Astronomy.GeoVector(b.body, utcDateNextHour, true);
    const e2 = Astronomy.Ecliptic(v2);
    let dElon = e2.elon - e1.elon;
    if (dElon < -180) dElon += 360;
    if (dElon > 180) dElon -= 360;
    const isRetrograde = dElon < 0;

    const siderealDeg = normalize360(e1.elon - ayanamsha);
    const signIndex = Math.floor(siderealDeg / 30);
    const degInSign = siderealDeg % 30;

    // Whole Sign House System (Rasi Chakra):
    // House 1 is ascendantIndex.
    const house = (((signIndex - ascendantIndex) % 12) + 12) % 12 + 1;

    const rashiData = RASHIS[signIndex] || RASHIS[0];
    const nak = getNakshatraInfo(siderealDeg);
    const dignity = getPlanetaryDignity(b.name, signIndex, degInSign);

    // Combustion check (angular distance to Sun)
    let distToSun = Math.abs(siderealDeg - sunSidereal);
    if (distToSun > 180) distToSun = 360 - distToSun;
    const isCombust = b.name !== 'Sun' && b.combustOrb > 0 && distToSun <= b.combustOrb;

    // Parashari Aspect Houses (Drishti)
    const aspectHouses = b.aspectOffsets.map((offset) => (((house - 1 + offset - 1) % 12) + 12) % 12 + 1);

    results.push({
      name: b.name,
      hindiName: b.hindi,
      symbol: b.sym,
      rashi: rashiData.name,
      rashiSanskrit: rashiData.hindi,
      signIndex,
      degreesInSign: parseFloat(degInSign.toFixed(2)),
      absoluteDegree: parseFloat(siderealDeg.toFixed(2)),
      degreeFormatted: formatDegree(degInSign),
      house,
      nakshatra: nak.name,
      pada: nak.pada,
      dignity,
      isRetrograde,
      isCombust,
      element: rashiData.element as any,
      color: b.color,
      karaka: b.karaka,
      aspectHouses
    });
  }

  // 2. Lunar Nodes (Rahu & Ketu) using Meeus Astronomical Mean Node Formula
  // Omega = 125.04452 - 1934.136261 * T + 0.0020708 * T^2 + T^3 / 450000
  const rahuMeanTropical = normalize360(125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000);
  const rahuSidereal = normalize360(rahuMeanTropical - ayanamsha);
  const ketuSidereal = normalize360(rahuSidereal + 180);

  // Rahu
  const rahuSign = Math.floor(rahuSidereal / 30);
  const rahuDeg = rahuSidereal % 30;
  const rahuHouse = (((rahuSign - ascendantIndex) % 12) + 12) % 12 + 1;
  const rahuRashi = RASHIS[rahuSign] || RASHIS[0];
  const rahuNak = getNakshatraInfo(rahuSidereal);
  const rahuDignity = getPlanetaryDignity('Rahu', rahuSign, rahuDeg);
  const rahuAspects = [5, 7, 9].map((offset) => (((rahuHouse - 1 + offset - 1) % 12) + 12) % 12 + 1);

  results.push({
    name: 'Rahu',
    hindiName: 'राहु (Rahu)',
    symbol: '☊',
    rashi: rahuRashi.name,
    rashiSanskrit: rahuRashi.hindi,
    signIndex: rahuSign,
    degreesInSign: parseFloat(rahuDeg.toFixed(2)),
    absoluteDegree: parseFloat(rahuSidereal.toFixed(2)),
    degreeFormatted: formatDegree(rahuDeg),
    house: rahuHouse,
    nakshatra: rahuNak.name,
    pada: rahuNak.pada,
    dignity: rahuDignity,
    isRetrograde: true, // Lunar nodes are always in retrograde motion in Vedic astrology
    isCombust: false,
    element: rahuRashi.element as any,
    color: '#7E22CE',
    karaka: 'Chhaya Graha (Desire & Illusions)',
    aspectHouses: rahuAspects
  });

  // Ketu
  const ketuSign = Math.floor(ketuSidereal / 30);
  const ketuDeg = ketuSidereal % 30;
  const ketuHouse = (((ketuSign - ascendantIndex) % 12) + 12) % 12 + 1;
  const ketuRashi = RASHIS[ketuSign] || RASHIS[0];
  const ketuNak = getNakshatraInfo(ketuSidereal);
  const ketuDignity = getPlanetaryDignity('Ketu', ketuSign, ketuDeg);
  const ketuAspects = [5, 7, 9].map((offset) => (((ketuHouse - 1 + offset - 1) % 12) + 12) % 12 + 1);

  results.push({
    name: 'Ketu',
    hindiName: 'केतु (Ketu)',
    symbol: '☋',
    rashi: ketuRashi.name,
    rashiSanskrit: ketuRashi.hindi,
    signIndex: ketuSign,
    degreesInSign: parseFloat(ketuDeg.toFixed(2)),
    absoluteDegree: parseFloat(ketuSidereal.toFixed(2)),
    degreeFormatted: formatDegree(ketuDeg),
    house: ketuHouse,
    nakshatra: ketuNak.name,
    pada: ketuNak.pada,
    dignity: ketuDignity,
    isRetrograde: true,
    isCombust: false,
    element: ketuRashi.element as any,
    color: '#92400E',
    karaka: 'Moksha Karaka (Liberation & Spirituality)',
    aspectHouses: ketuAspects
  });

  return results;
}

// 7. Manglik Dosha (Kuja Dosha) Analyzer with Rigorous Parashari Cancellation (Bhanga) Rules
export function calculateManglikDosha(
  ascSign: number,
  moonSign: number,
  marsPlanet: PlanetaryPosition,
  allPlanets?: PlanetaryPosition[]
): ManglikDetails {
  // Mars positions relative to Lagna: House 1, 4, 7, 8, 12 cause Kuja Dosha
  const marsHouseFromLagna = marsPlanet.house;
  const marsHouseFromMoon = (((marsPlanet.signIndex - moonSign) % 12) + 12) % 12 + 1;

  const isLagnaManglik = [1, 4, 7, 8, 12].includes(marsHouseFromLagna);
  const isMoonManglik = [1, 4, 7, 8, 12].includes(marsHouseFromMoon);

  if (!isLagnaManglik && !isMoonManglik) {
    return {
      status: 'Non-Manglik',
      isManglik: false,
      isCancelled: false,
      severity: 'None',
      lagnaHouse: marsHouseFromLagna,
      moonHouse: marsHouseFromMoon,
      isLagnaManglik: false,
      isMoonManglik: false,
      cancellationReasons: [],
      explanation: `Mars is placed in house ${marsHouseFromLagna} from Lagna and house ${marsHouseFromMoon} from Chandra (Moon), safely outside the classical Kuja affliction houses (1, 4, 7, 8, 12).`
    };
  }

  // Evaluate Parashari Mangal Dosha Bhanga (Cancellation) Rules
  const cancellationReasons: string[] = [];

  // Check 1: Mars in own sign (Aries / Scorpio) or Exalted sign (Capricorn)
  if (marsPlanet.signIndex === 0 || marsPlanet.signIndex === 7) {
    cancellationReasons.push(
      `Mars is in its own sign (${RASHIS[marsPlanet.signIndex].name}) — Parashari Swakshetra exemption nullifies Kuja Dosha.`
    );
  } else if (marsPlanet.signIndex === 9) {
    cancellationReasons.push(
      `Mars is exalted in Capricorn (Uccha Mangal) — forms Ruchaka Mahapurusha Yoga rather than Kuja Dosha.`
    );
  }

  // Check 2: Conjunction or direct Parashari aspect from Jupiter (Guru) or Venus (Shukra)
  if (allPlanets && allPlanets.length > 0) {
    const jupiter = allPlanets.find((p) => p.name === 'Jupiter');
    const venus = allPlanets.find((p) => p.name === 'Venus');

    if (jupiter) {
      // Conjunction
      if (jupiter.signIndex === marsPlanet.signIndex) {
        cancellationReasons.push(
          `Mars is conjunct auspicious Jupiter (Guru-Mangal Yoga), neutralizing Kuja Dosha through divine benefic association.`
        );
      }
      // Jupiter Parashari Aspects: 5th, 7th, 9th houses from Jupiter
      const houseOfMarsFromJupiter = (((marsPlanet.signIndex - jupiter.signIndex) % 12) + 12) % 12 + 1;
      if ([5, 7, 9].includes(houseOfMarsFromJupiter)) {
        cancellationReasons.push(
          `Mars receives direct Drishti (aspect) from Jupiter (${houseOfMarsFromJupiter}th house aspect), fully dissolving Kuja Dosha (Guru Drishti Bhanga).`
        );
      }
      // Jupiter in Kendra (1st or 7th house)
      if (jupiter.house === 1 || jupiter.house === 7) {
        cancellationReasons.push(
          `Benefic Jupiter in ${jupiter.house === 1 ? 'Ascendant (Lagna)' : '7th House'} provides powerful Kendra shielding across marriage houses.`
        );
      }
    }

    if (venus) {
      // Conjunction
      if (venus.signIndex === marsPlanet.signIndex) {
        cancellationReasons.push(
          `Mars is conjunct benefic Venus in ${RASHIS[marsPlanet.signIndex].name}, pacifying martial intensity.`
        );
      }
      // Venus 7th House Aspect
      const houseOfMarsFromVenus = (((marsPlanet.signIndex - venus.signIndex) % 12) + 12) % 12 + 1;
      if (houseOfMarsFromVenus === 7) {
        cancellationReasons.push(
          `Mars receives direct 7th house mutual aspect from Venus, neutralizing negative Kuja afflictions.`
        );
      }
    }
  }

  // Check 3: Classical Parashari House + Sign specific Bhanga Shlokas
  // 4th house in Scorpio (7) or Taurus (1)
  if ((marsHouseFromLagna === 4 || marsHouseFromMoon === 4) && (marsPlanet.signIndex === 7 || marsPlanet.signIndex === 1)) {
    cancellationReasons.push(
      `Mars in 4th house in ${RASHIS[marsPlanet.signIndex].name} is a designated Parashari exception that cancels Kuja Dosha.`
    );
  }

  // 7th house in Cancer (3 - debilitated) or Capricorn (9 - exalted)
  if ((marsHouseFromLagna === 7 || marsHouseFromMoon === 7) && (marsPlanet.signIndex === 3 || marsPlanet.signIndex === 9)) {
    cancellationReasons.push(
      `Mars in 7th house in ${RASHIS[marsPlanet.signIndex].name} qualifies for 7th-house Kuja Bhanga per Brihat Parashara Hora Shastra.`
    );
  }

  // 8th house in Sagittarius (8) or Pisces (11) (Jupiter's signs)
  if ((marsHouseFromLagna === 8 || marsHouseFromMoon === 8) && (marsPlanet.signIndex === 8 || marsPlanet.signIndex === 11)) {
    cancellationReasons.push(
      `Mars in 8th house in Jupiter's sign (${RASHIS[marsPlanet.signIndex].name}) dissolves adverse Manglik afflictions.`
    );
  }

  // 12th house in Taurus (1) or Libra (6) (Venus signs) or Aries (0) / Gemini (2)
  if ((marsHouseFromLagna === 12 || marsHouseFromMoon === 12) && [1, 6, 0, 2].includes(marsPlanet.signIndex)) {
    cancellationReasons.push(
      `Mars in 12th house in ${RASHIS[marsPlanet.signIndex].name} is exempted from Kuja Dosha.`
    );
  }

  // 1st house in Aries (0), Leo (4), or Aquarius (10)
  if ((marsHouseFromLagna === 1 || marsHouseFromMoon === 1) && [0, 4, 10].includes(marsPlanet.signIndex)) {
    cancellationReasons.push(
      `Mars in 1st house in ${RASHIS[marsPlanet.signIndex].name} carries natural fortitude and is exempted from Kuja Dosha.`
    );
  }

  // Chandra-Mangal Yoga in Kendra or Trikona
  if (marsPlanet.signIndex === moonSign && [1, 4, 5, 7, 9, 10].includes(marsHouseFromLagna)) {
    cancellationReasons.push(
      `Mars is conjunct the Moon in an auspicious house, forming Chandra-Mangala Yoga which overrides Kuja Dosha.`
    );
  }

  // Deduplicate cancellation reasons
  const uniqueReasons = Array.from(new Set(cancellationReasons));

  if (uniqueReasons.length > 0) {
    return {
      status: 'Cancelled Manglik (Bhanga)',
      isManglik: false,
      isCancelled: true,
      severity: 'Cancelled',
      lagnaHouse: marsHouseFromLagna,
      moonHouse: marsHouseFromMoon,
      isLagnaManglik,
      isMoonManglik,
      cancellationReasons: uniqueReasons,
      explanation: `Kuja Dosha was indicated (Mars in ${isLagnaManglik ? `House ${marsHouseFromLagna} from Lagna` : ''}${isLagnaManglik && isMoonManglik ? ' & ' : ''}${isMoonManglik ? `House ${marsHouseFromMoon} from Moon` : ''}), but is mathematically cancelled (Bhanga) per classical Parashari rules: ${uniqueReasons.join(' • ')}`
    };
  }

  if (isLagnaManglik && isMoonManglik) {
    return {
      status: 'High Manglik',
      isManglik: true,
      isCancelled: false,
      severity: 'High',
      lagnaHouse: marsHouseFromLagna,
      moonHouse: marsHouseFromMoon,
      isLagnaManglik: true,
      isMoonManglik: true,
      cancellationReasons: [],
      explanation: `High Manglik Dosha active: Mars is placed in house ${marsHouseFromLagna} from Lagna and house ${marsHouseFromMoon} from Chandra (Moon) with no qualifying Parashari cancellations.`
    };
  }

  return {
    status: 'Low / Partial Manglik',
    isManglik: true,
    isCancelled: false,
    severity: 'Low',
    lagnaHouse: marsHouseFromLagna,
    moonHouse: marsHouseFromMoon,
    isLagnaManglik,
    isMoonManglik,
    cancellationReasons: [],
    explanation: isLagnaManglik
      ? `Low / Partial Manglik Dosha: Mars is in house ${marsHouseFromLagna} from Lagna, but clear from Moon sign (house ${marsHouseFromMoon}).`
      : `Low / Partial Chandra Manglik: Mars is in house ${marsHouseFromMoon} from Moon, but clear from Lagna (house ${marsHouseFromLagna}).`
  };
}

// 8. Kaal Sarp Yoga / Dosha Verification with Strict Parashari Axis Hemming
export function calculateKaalSarpDosha(planets: PlanetaryPosition[], ascendantIndex?: number): KaalSarpDetails {
  const rahu = planets.find((p) => p.name === 'Rahu');
  const ketu = planets.find((p) => p.name === 'Ketu');

  if (!rahu || !ketu) {
    return {
      status: 'Clear (No Kaal Sarp Yoga)',
      isPresent: false,
      yogaName: 'None',
      rahuHouse: 1,
      ketuHouse: 7,
      axis: '1st - 7th Axis',
      type: 'None',
      hemmedPlanetsCount: 0,
      unhemmedPlanets: [],
      planetsInRahuKetuArc: [],
      planetsInKetuRahuArc: [],
      explanation: 'Planetary coordinates do not establish a Rahu-Ketu nodal axis.'
    };
  }

  const primary7 = planets.filter((p) =>
    ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'].includes(p.name)
  );

  const rahuDeg = rahu.absoluteDegree;
  const ketuDeg = ketu.absoluteDegree;

  // Exact 180° boundary containment helper
  const isBetweenAngles = (deg: number, start: number, end: number): boolean => {
    const d = normalize360(deg);
    const s = normalize360(start);
    const e = normalize360(end);
    if (s < e) {
      return d >= s && d <= e;
    } else {
      return d >= s || d <= e;
    }
  };

  const planetsInRahuKetuArc: string[] = [];
  const planetsInKetuRahuArc: string[] = [];

  for (const pl of primary7) {
    if (isBetweenAngles(pl.absoluteDegree, rahuDeg, ketuDeg)) {
      planetsInRahuKetuArc.push(pl.name);
    }
    if (isBetweenAngles(pl.absoluteDegree, ketuDeg, rahuDeg)) {
      planetsInKetuRahuArc.push(pl.name);
    }
  }

  // Strict Exclusion: All 7 classical planets must be fully hemmed on ONE side of the axis
  const isRahuToKetuHemmed = planetsInRahuKetuArc.length === 7;
  const isKetuToRahuHemmed = planetsInKetuRahuArc.length === 7;
  const isFullyHemmed = isRahuToKetuHemmed || isKetuToRahuHemmed;

  // 12 Classical Kaal Sarp Yoga Classifications based on Rahu House
  const KAAL_SARP_DEFINITIONS: Record<number, { name: string; axis: string; desc: string }> = {
    1: { name: 'Anant Kaal Sarp Yoga', axis: '1st - 7th House Axis', desc: 'Rahu in Lagna and Ketu in 7th house; influences self-identity, partnerships, and personal vitality.' },
    2: { name: 'Kulik Kaal Sarp Yoga', axis: '2nd - 8th House Axis', desc: 'Rahu in 2nd house and Ketu in 8th house; influences financial accumulation, family lineage, and speech.' },
    3: { name: 'Vasuki Kaal Sarp Yoga', axis: '3rd - 9th House Axis', desc: 'Rahu in 3rd house and Ketu in 9th house; influences courage, sibling relations, and higher fortune.' },
    4: { name: 'Shankhpal Kaal Sarp Yoga', axis: '4th - 10th House Axis', desc: 'Rahu in 4th house and Ketu in 10th house; influences domestic tranquility, real estate, and professional stature.' },
    5: { name: 'Padma Kaal Sarp Yoga', axis: '5th - 11th House Axis', desc: 'Rahu in 5th house and Ketu in 11th house; influences intellectual pursuits, progeny, and long-term income networks.' },
    6: { name: 'Maha Padma Kaal Sarp Yoga', axis: '6th - 12th House Axis', desc: 'Rahu in 6th house and Ketu in 12th house; influences health vigilance, overcoming adversaries, and foreign connections.' },
    7: { name: 'Takshak Kaal Sarp Yoga', axis: '7th - 1st House Axis', desc: 'Rahu in 7th house and Ketu in 1st house; influences marital dynamics, business contracts, and public reputation.' },
    8: { name: 'Karkotak Kaal Sarp Yoga', axis: '8th - 2nd House Axis', desc: 'Rahu in 8th house and Ketu in 2nd house; influences sudden transformations, occult wisdom, and ancestral inheritances.' },
    9: { name: 'Shankhachud Kaal Sarp Yoga', axis: '9th - 3rd House Axis', desc: 'Rahu in 9th house and Ketu in 3rd house; influences spiritual fortune, paternal blessings, and dharmic endeavors.' },
    10: { name: 'Ghatak Kaal Sarp Yoga', axis: '10th - 4th House Axis', desc: 'Rahu in 10th house and Ketu in 4th house; influences career leadership, executive prestige, and public recognition.' },
    11: { name: 'Vishdhar Kaal Sarp Yoga', axis: '11th - 5th House Axis', desc: 'Rahu in 11th house and Ketu in 5th house; influences high ambitions, elder siblings, and financial gains.' },
    12: { name: 'Sheshnag Kaal Sarp Yoga', axis: '12th - 6th House Axis', desc: 'Rahu in 12th house and Ketu in 6th house; influences spiritual liberation, foreign settlements, and meditative isolation.' }
  };

  const yogaInfo = KAAL_SARP_DEFINITIONS[rahu.house] || KAAL_SARP_DEFINITIONS[1];

  if (!isFullyHemmed) {
    const unhemmedList = primary7
      .map((p) => p.name)
      .filter((name) => !planetsInRahuKetuArc.includes(name) || !planetsInKetuRahuArc.includes(name));

    return {
      status: 'Clear (No Kaal Sarp Yoga)',
      isPresent: false,
      yogaName: 'None (Planets Unhemmed)',
      rahuHouse: rahu.house,
      ketuHouse: ketu.house,
      axis: yogaInfo.axis,
      type: 'None',
      hemmedPlanetsCount: Math.max(planetsInRahuKetuArc.length, planetsInKetuRahuArc.length),
      unhemmedPlanets: unhemmedList,
      planetsInRahuKetuArc,
      planetsInKetuRahuArc,
      explanation: `Under strict Parashari rules, Kaal Sarp Yoga requires ALL 7 classical planets to be hemmed within the 180° Rahu-Ketu nodal axis. Here, planets are distributed across both hemispheres (${planetsInRahuKetuArc.length} in Rahu-Ketu arc, ${planetsInKetuRahuArc.length} in Ketu-Rahu arc). The Dosha is completely nullified.`
    };
  }

  const yogaType = isRahuToKetuHemmed ? 'Udit (Rahu to Ketu)' : 'Anudit (Ketu to Rahu)';

  return {
    status: `${yogaInfo.name} (${yogaInfo.axis})`,
    isPresent: true,
    yogaName: yogaInfo.name,
    rahuHouse: rahu.house,
    ketuHouse: ketu.house,
    axis: yogaInfo.axis,
    type: yogaType,
    hemmedPlanetsCount: 7,
    unhemmedPlanets: [],
    planetsInRahuKetuArc,
    planetsInKetuRahuArc,
    explanation: `All 7 classical planets are strictly hemmed in the ${yogaType} direction along the ${yogaInfo.axis} (${yogaInfo.name}). ${yogaInfo.desc}`
  };
}

// 9. Real-Time Transit Saturn vs Natal Moon Sign Engine (Sade Sati & Dhaiya)
export function calculateSadeSati(natalMoonSignIndex: number, targetDate: Date = new Date()): SadeSatiDetails {
  // Calculate current transit Saturn position in Sidereal Lahiri
  const timeNow = new Astronomy.AstroTime(targetDate);
  const ayanamshaNow = getLahiriAyanamsha(timeNow);
  const satVecNow = Astronomy.GeoVector(Astronomy.Body.Saturn, targetDate, true);
  const satEclNow = Astronomy.Ecliptic(satVecNow);
  const transitSatSidereal = normalize360(satEclNow.elon - ayanamshaNow);
  const transitSatSign = Math.floor(transitSatSidereal / 30);
  const transitSatDegInSign = transitSatSidereal % 30;
  const transitSatDegFormatted = formatDegree(transitSatDegInSign);

  const transitSatSignName = RASHIS[transitSatSign]?.name || 'Aquarius';
  const natalMoonSignName = RASHIS[natalMoonSignIndex]?.name || 'Aries';

  // Difference in signs from Natal Moon to Transit Saturn
  const diffFromMoon = (((transitSatSign - natalMoonSignIndex) % 12) + 12) % 12;
  const houseFromMoon = diffFromMoon + 1;

  // Phase 1 (12th House from Natal Moon - Rising / Setting Phase)
  if (diffFromMoon === 11) {
    return {
      status: `Active Sade Sati (Phase 1 • 12th House)`,
      isActive: true,
      type: 'Sade Sati',
      phaseName: 'Phase 1: 12th House from Moon (Rising / Entry Phase)',
      phaseNumber: 1,
      transitSaturnSign: transitSatSignName,
      transitSaturnDegree: transitSatDegFormatted,
      transitSaturnSignIndex: transitSatSign,
      natalMoonSign: natalMoonSignName,
      natalMoonSignIndex,
      houseFromMoon: 12,
      description: `Transit Saturn is transiting ${transitSatSignName} (${transitSatDegFormatted}), occupying the 12th house relative to your natal Moon sign (${natalMoonSignName}). This initial phase highlights financial discipline, restructuring expenditure, foreign opportunities, and spiritual introspection.`,
      remedyAdvice: 'Recite Hanuman Chalisa on Tuesdays and Saturdays, and light a mustard/sesame oil lamp under a Peepal tree on Saturday evenings.'
    };
  }

  // Phase 2 (1st House from Natal Moon - Janma Shani / Peak Phase)
  if (diffFromMoon === 0) {
    return {
      status: `Active Sade Sati (Phase 2 • Peak / Janma Shani)`,
      isActive: true,
      type: 'Sade Sati',
      phaseName: 'Phase 2: Janma Shani (Peak Phase • Saturn Conjunct Natal Moon)',
      phaseNumber: 2,
      transitSaturnSign: transitSatSignName,
      transitSaturnDegree: transitSatDegFormatted,
      transitSaturnSignIndex: transitSatSign,
      natalMoonSign: natalMoonSignName,
      natalMoonSignIndex,
      houseFromMoon: 1,
      description: `Transit Saturn is transiting ${transitSatSignName} (${transitSatDegFormatted}), directly conjunct your natal Moon sign. This is the central, most transformative phase emphasizing patience, mental resilience, ethical discipline, and professional restructuring.`,
      remedyAdvice: 'Perform Saturday Chhaya Daan (gaze at your shadow in a bowl of mustard oil in an iron vessel before donating) and chant the Shani Gayatri Mantra 108 times.'
    };
  }

  // Phase 3 (2nd House from Natal Moon - Setting / Departure Phase)
  if (diffFromMoon === 1) {
    return {
      status: `Active Sade Sati (Phase 3 • Setting / 2nd House)`,
      isActive: true,
      type: 'Sade Sati',
      phaseName: 'Phase 3: 2nd House from Moon (Setting / Departure Phase)',
      phaseNumber: 3,
      transitSaturnSign: transitSatSignName,
      transitSaturnDegree: transitSatDegFormatted,
      transitSaturnSignIndex: transitSatSign,
      natalMoonSign: natalMoonSignName,
      natalMoonSignIndex,
      houseFromMoon: 2,
      description: `Transit Saturn is transiting ${transitSatSignName} (${transitSatDegFormatted}), occupying the 2nd house from your natal Moon (${natalMoonSignName}). As the 7.5-year cycle nears completion, family stabilization, financial consolidation, and enduring gains emerge.`,
      remedyAdvice: 'Feed black dogs or crows on Saturdays, maintain speech diplomacy, and donate black blankets or footwear to the underprivileged.'
    };
  }

  // Kantak Shani (4th House Dhaiya / Chhoti Panoti)
  if (diffFromMoon === 3) {
    return {
      status: `Active Dhaiya (Kantak Shani • 4th House)`,
      isActive: true,
      type: 'Dhaiya',
      phaseName: 'Kantak Shani (4th House Dhaiya / Chhoti Panoti)',
      transitSaturnSign: transitSatSignName,
      transitSaturnDegree: transitSatDegFormatted,
      transitSaturnSignIndex: transitSatSign,
      natalMoonSign: natalMoonSignName,
      natalMoonSignIndex,
      houseFromMoon: 4,
      description: `Transit Saturn is transiting ${transitSatSignName} (${transitSatDegFormatted}) in the 4th house from your natal Moon (${natalMoonSignName}). Known as Kantak Shani, this 2.5-year transit calls for patience in real estate, domestic harmony, and maternal well-being.`,
      remedyAdvice: 'Offer blue flowers or holy water to Lord Shiva on Saturdays and avoid hasty property commitments.'
    };
  }

  // Ashtam Shani (8th House Dhaiya / Badi Panoti)
  if (diffFromMoon === 7) {
    return {
      status: `Active Dhaiya (Ashtam Shani • 8th House)`,
      isActive: true,
      type: 'Dhaiya',
      phaseName: 'Ashtam Shani (8th House Dhaiya / Badi Panoti)',
      transitSaturnSign: transitSatSignName,
      transitSaturnDegree: transitSatDegFormatted,
      transitSaturnSignIndex: transitSatSign,
      natalMoonSign: natalMoonSignName,
      natalMoonSignIndex,
      houseFromMoon: 8,
      description: `Transit Saturn is transiting ${transitSatSignName} (${transitSatDegFormatted}) in the 8th house from your natal Moon (${natalMoonSignName}). Known as Ashtam Shani, this 2.5-year transit fosters deep spiritual transformation, health diligence, and careful travel planning.`,
      remedyAdvice: 'Chant the Maha Mrityunjaya Mantra daily and sponsor Shani Shanti rituals on Amavasya Saturdays.'
    };
  }

  // Inactive / No Sade Sati or Dhaiya
  return {
    status: 'No Active Sade Sati / Dhaiya',
    isActive: false,
    type: 'None',
    phaseName: 'Inactive (No Sade Sati or Dhaiya)',
    transitSaturnSign: transitSatSignName,
    transitSaturnDegree: transitSatDegFormatted,
    transitSaturnSignIndex: transitSatSign,
    natalMoonSign: natalMoonSignName,
    natalMoonSignIndex,
    houseFromMoon,
    description: `Transit Saturn is transiting ${transitSatSignName} (${transitSatDegFormatted}), sitting harmoniously in the ${houseFromMoon}th house from your natal Moon (${natalMoonSignName}). No Sade Sati or Dhaiya obstruction is currently operating in your chart.`,
    remedyAdvice: 'Maintain regular dharmic habits and gratitude practices to support continuous auspicious flow.'
  };
}

// 10. Diagnostic Testing & Verification Logger
export function logDoshaDiagnostics(diagnostics: DoshaDiagnostics): void {
  try {
    console.groupCollapsed('🕉️ [Vedic Dosha Engine Parashari Audit & Diagnostics]');
    console.log('📌 Sidereal Lahiri Ayanamsha:', diagnostics.ayanamsa.toFixed(4) + '°');
    console.log('Timestamp:', diagnostics.timestamp);
    console.log('Mars Coordinates & Houses:', diagnostics.marsData);
    console.log('Parashari Bhanga Checks:', diagnostics.manglikBhangaChecks);
    console.log('Real-Time Saturn Transit:', diagnostics.saturnTransitData);
    console.log('Kaal Sarp 180° Axis Hemming Test:', diagnostics.kaalSarpHemmingData);
    console.groupEnd();
  } catch (err) {
    // Silent fail in environments without console group
  }
}

// 11. Vimshottari Dasha Engine
export function calculateVimshottariDasha(
  moonSiderealDeg: number,
  birthUtcDate: Date,
  targetDate: Date = new Date()
): { currentDasha: string; mahadashaLord: string; antardashaLord: string; balanceAtBirthYears: number } {
  const nak = getNakshatraInfo(moonSiderealDeg);
  const lordIndex = VIMSHOTTARI_DASHA_LORDS.findIndex((l) => l.lord === nak.lord);
  const startLordIndex = lordIndex >= 0 ? lordIndex : 0;
  const startLord = VIMSHOTTARI_DASHA_LORDS[startLordIndex];

  // Fraction of nakshatra elapsed determines the balance of the first Dasha at birth
  const remainingFraction = 1 - nak.elapsedFraction;
  const balanceAtBirthYears = remainingFraction * startLord.years;

  // Calculate age in tropical years
  const ageYears = (targetDate.getTime() - birthUtcDate.getTime()) / (365.2425 * 86400 * 1000);

  let accumulatedYears = balanceAtBirthYears;
  let currentLordIdx = startLordIndex;

  if (ageYears <= accumulatedYears) {
    currentLordIdx = startLordIndex;
  } else {
    while (accumulatedYears < ageYears) {
      currentLordIdx = (currentLordIdx + 1) % 9;
      accumulatedYears += VIMSHOTTARI_DASHA_LORDS[currentLordIdx].years;
    }
  }

  const currMahadasha = VIMSHOTTARI_DASHA_LORDS[currentLordIdx];

  // Compute Antardasha inside current Mahadasha
  const dashaStartAge = accumulatedYears - currMahadasha.years;
  const elapsedInMahadasha = Math.max(0, ageYears - dashaStartAge);

  let subAccum = 0;
  let subLordIdx = currentLordIdx;
  for (let i = 0; i < 9; i++) {
    const subLord = VIMSHOTTARI_DASHA_LORDS[(currentLordIdx + i) % 9];
    const subDuration = (currMahadasha.years * subLord.years) / 120;
    subAccum += subDuration;
    if (elapsedInMahadasha <= subAccum) {
      subLordIdx = (currentLordIdx + i) % 9;
      break;
    }
  }

  const currAntardasha = VIMSHOTTARI_DASHA_LORDS[subLordIdx];

  return {
    currentDasha: `${currMahadasha.lord} (${currMahadasha.hindi}) Mahadasha &bull; ${currAntardasha.lord} Antardasha`,
    mahadashaLord: currMahadasha.lord,
    antardashaLord: currAntardasha.lord,
    balanceAtBirthYears
  };
}

// 12. Master Vedic Kundli Calculation Entrypoint
export function calculateVedicKundliFull(
  fullName: string,
  dob: string,
  tob: string,
  pob: string,
  locData?: LocationData | null
): KundliResult {
  const lat = locData?.lat ?? 28.6139; // Default Delhi (28.6139° N, 77.2090° E, UTC+5.5)
  const lng = locData?.lng ?? 77.2090;
  const utcOffset = locData?.utcOffsetHours ?? 5.5;

  const utcDate = getUtcDate(dob, tob, utcOffset);

  // 1. Calculate Exact Sidereal Ascendant
  const asc = calculateAscendant(utcDate, lat, lng);
  const ascSignData = RASHIS[asc.signIndex] || RASHIS[0];
  const ascNak = getNakshatraInfo(asc.siderealDeg);
  const ayanamsa = asc.ayanamsha;

  // 2. Calculate Exact 9 Planetary Positions in Sidereal Nirayana Lahiri coordinates
  const planetaryPositions = calculatePlanetaryPositions(dob, tob, asc.signIndex, {
    lat,
    lng,
    utcOffsetHours: utcOffset
  });

  const sunPlanet = planetaryPositions.find((p) => p.name === 'Sun') || planetaryPositions[0];
  const moonPlanet = planetaryPositions.find((p) => p.name === 'Moon') || planetaryPositions[1];
  const marsPlanet = planetaryPositions.find((p) => p.name === 'Mars') || planetaryPositions[2];
  const rahuPlanet = planetaryPositions.find((p) => p.name === 'Rahu') || planetaryPositions[7];
  const ketuPlanet = planetaryPositions.find((p) => p.name === 'Ketu') || planetaryPositions[8];

  const moonSignData = RASHIS[moonPlanet.signIndex] || RASHIS[0];
  const sunSignData = RASHIS[sunPlanet.signIndex] || RASHIS[0];

  // 3. Nakshatra of Moon
  const nak = getNakshatraInfo(moonPlanet.absoluteDegree);

  // 4. Rigorous Vedic Dosha Calculations
  const manglikDetails = calculateManglikDosha(asc.signIndex, moonPlanet.signIndex, marsPlanet, planetaryPositions);
  const sadeSatiDetails = calculateSadeSati(moonPlanet.signIndex, new Date());
  const kaalSarpDetails = calculateKaalSarpDosha(planetaryPositions, asc.signIndex);

  // 5. Build Diagnostic Testing Block
  const doshaDiagnostics: DoshaDiagnostics = {
    ayanamsa,
    timestamp: new Date().toISOString(),
    marsData: {
      sign: marsPlanet.rashi,
      signIndex: marsPlanet.signIndex,
      degreeFormatted: marsPlanet.degreeFormatted,
      houseFromLagna: manglikDetails.lagnaHouse,
      houseFromMoon: manglikDetails.moonHouse,
      dignity: marsPlanet.dignity
    },
    manglikBhangaChecks: {
      ownOrExaltedSign: marsPlanet.signIndex === 0 || marsPlanet.signIndex === 7 || marsPlanet.signIndex === 9,
      jupiterConjunctionOrAspect: manglikDetails.cancellationReasons.some((r) => r.includes('Jupiter') || r.includes('Guru')),
      venusConjunctionOrAspect: manglikDetails.cancellationReasons.some((r) => r.includes('Venus')),
      specificHouseSignAlignment: manglikDetails.cancellationReasons.some((r) => r.includes('exception') || r.includes('shlokas')),
      chandraMangalYoga: manglikDetails.cancellationReasons.some((r) => r.includes('Chandra-Mangala')),
      cancellationSummary: manglikDetails.cancellationReasons
    },
    saturnTransitData: {
      transitSign: sadeSatiDetails.transitSaturnSign,
      transitDegree: sadeSatiDetails.transitSaturnDegree,
      natalMoonSign: moonSignData.name,
      houseOffsetFromMoon: sadeSatiDetails.houseFromMoon,
      detectedPhase: sadeSatiDetails.phaseName
    },
    kaalSarpHemmingData: {
      rahuDegree: rahuPlanet.absoluteDegree,
      ketuDegree: ketuPlanet.absoluteDegree,
      planetsInRahuKetuArc: kaalSarpDetails.planetsInRahuKetuArc,
      planetsInKetuRahuArc: kaalSarpDetails.planetsInKetuRahuArc,
      isFullyHemmed: kaalSarpDetails.isPresent
    }
  };

  // Log diagnostics for mathematical verification
  logDoshaDiagnostics(doshaDiagnostics);

  // 6. Vimshottari Dasha & Dynamic Analysis Engine
  const dashaInfo = calculateVimshottariDasha(moonPlanet.absoluteDegree, utcDate, new Date());
  const dashaTimelineFull = calculateFullDashaTimeline(
    moonPlanet.absoluteDegree,
    utcDate,
    planetaryPositions,
    asc.signIndex,
    ascSignData.name,
    new Date()
  );
  const dashaAnalysis = {
    currentReport: dashaTimelineFull.currentCycle,
    timeline: dashaTimelineFull.timeline
  };

  // 7. Gemstone, Lucky Number, Lucky Color
  const favorableGemstone = GEMSTONES_BY_SIGN[asc.signIndex] || GEMSTONES_BY_SIGN[0];
  const luckyNumber = ascSignData.luckyNum;
  const luckyColor = ascSignData.luckyColor;

  // 8. Dynamic Lal Kitab Prescription Profile
  const lalKitabProfile = generateLalKitabPrescription(
    planetaryPositions,
    asc.signIndex,
    manglikDetails,
    sadeSatiDetails,
    kaalSarpDetails
  );

  const corePrediction = `Your ${ascSignData.name} (${ascSignData.hindi}) Ascendant with Moon in ${moonSignData.name} (${moonSignData.hindi}) [${nak.name} Nakshatra, Pada ${nak.pada}] bestows exceptional mental fortitude, pragmatic leadership charisma, and auspicious planetary strength under Lord ${ascSignData.lord}. Currently navigating your ${dashaInfo.currentDasha}, balancing your Lagna Lord through authentic Lal Kitab house-based remedies ensures profound milestone success.`;

  const lalKitabRemedy = lalKitabProfile.summaryPrescription;

  return {
    ascendant: `${ascSignData.name} (${ascSignData.hindi})`,
    ascendantDegree: asc.degInSign,
    ascendantDegreeFormatted: formatDegree(asc.degInSign),
    ascendantNakshatra: ascNak.name,
    ascendantPada: ascNak.pada,
    ayanamsa,
    moonSign: `${moonSignData.name} (${moonSignData.hindi})`,
    sunSign: `${sunSignData.name} (${sunSignData.hindi})`,
    nakshatra: `${nak.name} (Pada ${nak.pada})`,
    manglikStatus: manglikDetails.status,
    manglikDetails,
    sadeSatiStatus: sadeSatiDetails.status,
    sadeSatiDetails,
    kaalSarpStatus: kaalSarpDetails.status,
    kaalSarpDetails,
    doshaDiagnostics,
    favorableGemstone,
    luckyNumber,
    luckyColor,
    currentDasha: dashaInfo.currentDasha,
    corePrediction,
    lalKitabRemedy,
    lalKitabProfile,
    dashaAnalysis,
    planetaryPositions,
    locationDetails: {
      city: locData?.city || pob || 'Delhi',
      country: locData?.country || 'India',
      lat,
      lng,
      timezone: locData?.timezone || 'Asia/Kolkata',
      utcOffsetHours: utcOffset
    }
  };
}
