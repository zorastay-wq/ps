export interface AstroNumerologyProfile {
  dob: string;
  mulank: number;
  bhagyank: number;
  rulingPlanet: string;
  hindiPlanet: string;
  element: string;
  vibration: string;
  archetype: string;
  favorableColors: string[];
  favorableDays: string[];
  gemstone: string;
  karmicLesson: string;
}

export function calculateAstroNumerology(dobStr: string): AstroNumerologyProfile {
  if (!dobStr) {
    return {
      dob: '1995-06-18',
      mulank: 9,
      bhagyank: 3,
      rulingPlanet: 'Mars (Mangal)',
      hindiPlanet: 'मंगल देव',
      element: 'Agni (Fire)',
      vibration: 'Transformative Willpower, Courage & Executive Decisiveness',
      archetype: 'The Visionary Trailblazer',
      favorableColors: ['Crimson Red', 'Saffron Coral', 'Golden Amber'],
      favorableDays: ['Tuesday', 'Thursday'],
      gemstone: 'Red Coral (Moonga) or Yellow Sapphire (Pukhraj)',
      karmicLesson: 'Channel intense vital energy into constructive, patient institutional building.'
    };
  }

  const clean = dobStr.replace(/\D/g, '');
  let day = 18;

  if (dobStr.includes('-')) {
    const parts = dobStr.split('-');
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      day = parseInt(parts[2], 10) || 18;
    } else {
      // DD-MM-YYYY
      day = parseInt(parts[0], 10) || 18;
    }
  } else if (clean.length >= 2) {
    day = parseInt(clean.slice(0, 2), 10) || 18;
  }

  // Reduce day to 1-9 (Mulank / Root Number)
  let m = day;
  while (m > 9) {
    m = m.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }

  // Calculate Bhagyank / Destiny Number (sum of all digits)
  const fullSum = (clean || '19950618').split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  let b = fullSum;
  while (b > 9) {
    b = b.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
  }

  const NUMEROLOGY_MAP: Record<number, {
    planet: string;
    hindiPlanet: string;
    element: string;
    vibration: string;
    archetype: string;
    colors: string[];
    days: string[];
    gemstone: string;
    lesson: string;
  }> = {
    1: {
      planet: 'Sun (Surya)',
      hindiPlanet: 'सूर्य देव',
      element: 'Agni (Fire)',
      vibration: 'Sovereign leadership, executive authority & creative vitality',
      archetype: 'The Sovereign Pioneer',
      colors: ['Saffron', 'Gold', 'Ruby Red'],
      days: ['Sunday'],
      gemstone: 'Ruby (Manikya)',
      lesson: 'Cultivate humility while commanding leadership with generosity.'
    },
    2: {
      planet: 'Moon (Chandra)',
      hindiPlanet: 'चंद्र देव',
      element: 'Jala (Water)',
      vibration: 'Intuitive empathy, emotional wisdom & artistic diplomacy',
      archetype: 'The Intuitive Alchemist',
      colors: ['Pearl White', 'Silver', 'Sea Green'],
      days: ['Monday'],
      gemstone: 'Natural Pearl (Moti) or Moonstone',
      lesson: 'Anchor emotional sensitivity in steadfast inner boundaries.'
    },
    3: {
      planet: 'Jupiter (Brihaspati / Guru)',
      hindiPlanet: 'बृहस्पति (गुरु देव)',
      element: 'Akasha (Space)',
      vibration: 'Expansive intellect, mentorship & spiritual prosperity',
      archetype: 'The Dharmic Sage',
      colors: ['Haldi Yellow', 'Golden Saffron', 'Amber'],
      days: ['Thursday'],
      gemstone: 'Yellow Sapphire (Pukhraj) or Topaz',
      lesson: 'Translate abstract philosophical wisdom into grounded service.'
    },
    4: {
      planet: 'Rahu (North Node)',
      hindiPlanet: 'राहु देव',
      element: 'Vayu (Air)',
      vibration: 'Unconventional innovation, strategic brilliance & global foresight',
      archetype: 'The Maverick Strategist',
      colors: ['Electric Blue', 'Smoky Gray', 'Indigo'],
      days: ['Saturday'],
      gemstone: 'Hessonite Garnet (Gomed)',
      lesson: 'Ground swift unconventional insights with ethical integrity.'
    },
    5: {
      planet: 'Mercury (Budha)',
      hindiPlanet: 'बुध देव',
      element: 'Prithvi (Earth)',
      vibration: 'Commercial brilliance, rapid adaptability & communicative eloquence',
      archetype: 'The Master Communicator',
      colors: ['Emerald Green', 'Pistachio', 'Turquoise'],
      days: ['Wednesday'],
      gemstone: 'Emerald (Panna)',
      lesson: 'Harness rapid intellectual multi-tasking into singular mastery.'
    },
    6: {
      planet: 'Venus (Shukra)',
      hindiPlanet: 'शुक्र देव',
      element: 'Jala (Water)',
      vibration: 'Aesthetic elegance, emotional charm & creative entrepreneurship',
      archetype: 'The Creative Luminary',
      colors: ['Diamond White', 'Rose Pink', 'Silk Cream'],
      days: ['Friday'],
      gemstone: 'Diamond (Heera) or White Zircon',
      lesson: 'Elevate material luxury and aesthetic appreciation into spiritual devotion.'
    },
    7: {
      planet: 'Ketu (South Node)',
      hindiPlanet: 'केतु देव',
      element: 'Agni (Fire)',
      vibration: 'Mystical research, analytical depth & spiritual transcendence',
      archetype: 'The Mystic Seeker',
      colors: ['Cat’s Eye Green', 'Smoky Taupe', 'Ochre'],
      days: ['Tuesday'],
      gemstone: 'Cat’s Eye (Lehsuniya)',
      lesson: 'Bridge solitary esoteric insight with everyday worldly compassion.'
    },
    8: {
      planet: 'Saturn (Shani)',
      hindiPlanet: 'शनि देव',
      element: 'Vayu (Air)',
      vibration: 'Disciplined perseverance, structural compounding & karmic mastery',
      archetype: 'The Pillar of Destiny',
      colors: ['Midnight Blue', 'Charcoal Black', 'Dark Violet'],
      days: ['Saturday'],
      gemstone: 'Blue Sapphire (Neelam) or Amethyst',
      lesson: 'Embrace slow, patient compounding; karmic justice always yields compounding wealth.'
    },
    9: {
      planet: 'Mars (Mangal)',
      hindiPlanet: 'मंगल देव',
      element: 'Agni (Fire)',
      vibration: 'Courageous drive, transformative willpower & decisive execution',
      archetype: 'The Fearless Champion',
      colors: ['Blood Red', 'Coral Orange', 'Deep Saffron'],
      days: ['Tuesday'],
      gemstone: 'Red Coral (Moonga)',
      lesson: 'Direct warrior passion with strategic patience and empathetic restraint.'
    }
  };

  const info = NUMEROLOGY_MAP[m] || NUMEROLOGY_MAP[1];

  return {
    dob: dobStr,
    mulank: m,
    bhagyank: b,
    rulingPlanet: info.planet,
    hindiPlanet: info.hindiPlanet,
    element: info.element,
    vibration: info.vibration,
    archetype: info.archetype,
    favorableColors: info.colors,
    favorableDays: info.days,
    gemstone: info.gemstone,
    karmicLesson: info.lesson
  };
}
