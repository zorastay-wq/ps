import { PlanetaryPosition } from '../types';
import { RASHIS } from './planetaryCalculator';

export type DivisionalChartType = 'D1' | 'D9' | 'D10' | 'D7' | 'D12';

export interface DivisionalInfo {
  code: DivisionalChartType;
  name: string;
  hindi: string;
  sanskrit: string;
  significance: string;
  icon: string;
}

export const DIVISIONAL_CHARTS_META: DivisionalInfo[] = [
  {
    code: 'D1',
    name: 'Rashi Chart',
    hindi: 'लग्न कुण्डली (D1)',
    sanskrit: 'Rashi Chakra (तनु व सर्व भाव)',
    significance: 'Primary Birth Blueprint, Physical Reality, Core Character & General Life Journey',
    icon: '☉'
  },
  {
    code: 'D9',
    name: 'Navamsha Chart',
    hindi: 'नवांश कुण्डली (D9)',
    sanskrit: 'Navamsha Chakra (भाग्य व दांपत्य)',
    significance: 'Soul Destiny, Marriage Harmony, Life Partner, Spiritual Merit & Second Half of Life',
    icon: '♀'
  },
  {
    code: 'D10',
    name: 'Dashamsha Chart',
    hindi: 'दशांश कुण्डली (D10)',
    sanskrit: 'Dashamsha Chakra (कर्म व प्रतिष्ठा)',
    significance: 'Career Milestones, Social Status, Executive Leadership, Fame & Profession',
    icon: '♄'
  },
  {
    code: 'D7',
    name: 'Saptamsha Chart',
    hindi: 'सप्तांश कुण्डली (D7)',
    sanskrit: 'Saptamsha Chakra (संतान व रचनात्मकता)',
    significance: 'Children, Progeny Welfare, Creative Fruitfulness & Generational Lineage',
    icon: '♃'
  },
  {
    code: 'D12',
    name: 'Dwadashamsha Chart',
    hindi: 'द्वादशांश कुण्डली (D12)',
    sanskrit: 'Dwadashamsha Chakra (माता-पिता व पैतृक)',
    significance: 'Parents, Ancestral Karma, Lineage Line & Inherited Spiritual Sanskaras',
    icon: '☽'
  }
];

// Helper: Normalize degrees [0, 360)
function norm360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

/**
 * 1. Compute D9 (Navamsha) Sign Index (0-11)
 * Standard Parashari Rule:
 * - Movable Signs (Aries, Cancer, Libra, Capricorn): Starts from same sign
 * - Fixed Signs (Taurus, Leo, Scorpio, Aquarius): Starts from 9th sign from itself
 * - Dual Signs (Gemini, Virgo, Sagittarius, Pisces): Starts from 5th sign from itself
 * Each Navamsha span = 3° 20' = 3.333333°
 */
export function calculateNavamshaSign(absDeg: number): { signIndex: number; degInNavamsha: number } {
  const norm = norm360(absDeg);
  const natalSign = Math.floor(norm / 30);
  const degInSign = norm % 30;
  const navamshaPart = Math.min(8, Math.floor(degInSign / (30 / 9))); // 0 to 8

  let startSign = natalSign;
  // Element-based starting sign for Navamsha
  const signType = natalSign % 3; // 0 = Movable (Aries, Cancer, Libra, Capricorn), 1 = Fixed, 2 = Dual
  if (signType === 0) {
    startSign = natalSign;
  } else if (signType === 1) {
    startSign = (natalSign + 8) % 12; // 9th from itself (index + 8)
  } else {
    startSign = (natalSign + 4) % 12; // 5th from itself (index + 4)
  }

  const d9Sign = (startSign + navamshaPart) % 12;
  const degInD9 = (degInSign % (30 / 9)) * 9; // Scaled to 0-30°

  return { signIndex: d9Sign, degInNavamsha: degInD9 };
}

/**
 * 2. Compute D10 (Dashamsha) Sign Index (0-11)
 * Standard Parashari Rule:
 * - Odd signs (1, 3, 5, 7, 9, 11 -> indices 0, 2, 4, 6, 8, 10): Starts from the sign itself
 * - Even signs (2, 4, 6, 8, 10, 12 -> indices 1, 3, 5, 7, 9, 11): Starts from the 9th sign from itself
 * Each Dashamsha span = 3° 00' = 3.0°
 */
export function calculateDashamshaSign(absDeg: number): { signIndex: number; degInDashamsha: number } {
  const norm = norm360(absDeg);
  const natalSign = Math.floor(norm / 30);
  const degInSign = norm % 30;
  const part = Math.min(9, Math.floor(degInSign / 3.0)); // 0 to 9

  const isOddSign = natalSign % 2 === 0; // Aries=0 (odd in 1-based), Taurus=1 (even)
  const startSign = isOddSign ? natalSign : (natalSign + 8) % 12;

  const d10Sign = (startSign + part) % 12;
  const degInD10 = (degInSign % 3.0) * 10;

  return { signIndex: d10Sign, degInDashamsha: degInD10 };
}

/**
 * 3. Compute D7 (Saptamsha) Sign Index (0-11)
 * Standard Parashari Rule:
 * - Odd signs: Starts from the sign itself
 * - Even signs: Starts from the 7th sign from itself
 * Each Saptamsha span = 30 / 7 = 4.285714°
 */
export function calculateSaptamshaSign(absDeg: number): { signIndex: number } {
  const norm = norm360(absDeg);
  const natalSign = Math.floor(norm / 30);
  const degInSign = norm % 30;
  const span = 30 / 7;
  const part = Math.min(6, Math.floor(degInSign / span));

  const isOddSign = natalSign % 2 === 0;
  const startSign = isOddSign ? natalSign : (natalSign + 6) % 12;

  const d7Sign = (startSign + part) % 12;
  return { signIndex: d7Sign };
}

/**
 * 4. Compute D12 (Dwadashamsha) Sign Index (0-11)
 * Standard Parashari Rule:
 * - Starts from the natal sign itself and moves sequentially 1 sign per 2° 30' (2.5°)
 */
export function calculateDwadashamshaSign(absDeg: number): { signIndex: number } {
  const norm = norm360(absDeg);
  const natalSign = Math.floor(norm / 30);
  const degInSign = norm % 30;
  const part = Math.min(11, Math.floor(degInSign / 2.5));

  const d12Sign = (natalSign + part) % 12;
  return { signIndex: d12Sign };
}

/**
 * Build Full Divisional Chart Planet Placements
 */
export function getDivisionalPositions(
  divisionalType: DivisionalChartType,
  d1AscendantDeg: number,
  positions: PlanetaryPosition[]
): {
  chartAscendantSignIndex: number;
  positions: PlanetaryPosition[];
} {
  // Compute chart ascendant
  let chartAscSign = Math.floor(d1AscendantDeg / 30);

  if (divisionalType === 'D9') {
    chartAscSign = calculateNavamshaSign(d1AscendantDeg).signIndex;
  } else if (divisionalType === 'D10') {
    chartAscSign = calculateDashamshaSign(d1AscendantDeg).signIndex;
  } else if (divisionalType === 'D7') {
    chartAscSign = calculateSaptamshaSign(d1AscendantDeg).signIndex;
  } else if (divisionalType === 'D12') {
    chartAscSign = calculateDwadashamshaSign(d1AscendantDeg).signIndex;
  }

  const mappedPositions: PlanetaryPosition[] = positions.map((p) => {
    let targetSign = p.signIndex;
    let degInChart = p.degreesInSign;

    if (divisionalType === 'D9') {
      const d9 = calculateNavamshaSign(p.absoluteDegree);
      targetSign = d9.signIndex;
      degInChart = d9.degInNavamsha;
    } else if (divisionalType === 'D10') {
      const d10 = calculateDashamshaSign(p.absoluteDegree);
      targetSign = d10.signIndex;
      degInChart = d10.degInDashamsha;
    } else if (divisionalType === 'D7') {
      targetSign = calculateSaptamshaSign(p.absoluteDegree).signIndex;
      degInChart = (p.degreesInSign % (30 / 7)) * 7;
    } else if (divisionalType === 'D12') {
      targetSign = calculateDwadashamshaSign(p.absoluteDegree).signIndex;
      degInChart = (p.degreesInSign % 2.5) * 12;
    }

    const houseInChart = (((targetSign - chartAscSign) % 12) + 12) % 12 + 1;
    const rashiData = RASHIS[targetSign] || RASHIS[0];

    return {
      ...p,
      signIndex: targetSign,
      rashi: rashiData.name,
      rashiSanskrit: rashiData.hindi,
      house: houseInChart,
      degreesInSign: parseFloat(degInChart.toFixed(2))
    };
  });

  return {
    chartAscendantSignIndex: chartAscSign,
    positions: mappedPositions
  };
}
