/**
 * Authentic Chaldean & Lo Shu Numerology Engine
 * Dr. Preeti Sehgal Vedic Astrology Chambers
 */

// Authentic Chaldean alphabet-to-number mapping (Number 9 has no letter assigned)
export const CHALDEAN_LETTER_VALUES: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

export interface LetterBreakdown {
  char: string;
  val: number;
}

export interface PlanetaryInfo {
  planet: string;
  hindiPlanet: string;
  element: string;
  deity: string;
  favorableColors: string;
  favorableDays: string;
  favorableGemstones: string;
  coreTraits: string[];
}

export const PLANET_ATTRIBUTES: Record<number, PlanetaryInfo> = {
  1: {
    planet: 'Sun (Surya)',
    hindiPlanet: 'सूर्य',
    element: 'Fire (अग्नि)',
    deity: 'Lord Shiva & Gayatri',
    favorableColors: 'Gold, Orange, Ruby Red, Saffron',
    favorableDays: 'Sunday',
    favorableGemstones: 'Ruby (Manikya), Sunstone',
    coreTraits: ['Executive Leadership', 'Pioneering Vision', 'Unyielding Will', 'Noble Authority']
  },
  2: {
    planet: 'Moon (Chandra)',
    hindiPlanet: 'चंद्र',
    element: 'Water (जल)',
    deity: 'Lord Shiva & Parvati',
    favorableColors: 'Pearl White, Silver, Cream, Sea Green',
    favorableDays: 'Monday',
    favorableGemstones: 'Natural Pearl (Moti), Moonstone',
    coreTraits: ['Intuitive Empathy', 'Creative Imagination', 'Diplomatic Grace', 'Emotional Resonance']
  },
  3: {
    planet: 'Jupiter (Brihaspati / Guru)',
    hindiPlanet: 'बृहस्पति (गुरु)',
    element: 'Ether / Space (आकाश)',
    deity: 'Lord Vishnu & Dakshinamurthy',
    favorableColors: 'Vedic Yellow, Saffron, Golden Amber',
    favorableDays: 'Thursday',
    favorableGemstones: 'Yellow Sapphire (Pukhraj), Citrine',
    coreTraits: ['Spiritual Wisdom', 'Mentorship & Advisory', 'Expansive Abundance', 'Philosophical Depth']
  },
  4: {
    planet: 'Rahu (North Lunar Node)',
    hindiPlanet: 'राहु',
    element: 'Air / Shadow (वायु/छाया)',
    deity: 'Maa Durga & Bhairav',
    favorableColors: 'Electric Blue, Smoky Grey, Metallic Khaki',
    favorableDays: 'Saturday',
    favorableGemstones: 'Hessonite Garnet (Gomed)',
    coreTraits: ['Unconventional Genius', 'Sudden Breakthroughs', 'Architectural Mastery', 'High Strategy']
  },
  5: {
    planet: 'Mercury (Budh)',
    hindiPlanet: 'बुध',
    element: 'Earth (पृथ्वी)',
    deity: 'Lord Ganesha & Vishnu',
    favorableColors: 'Emerald Green, Mint, Light Turquoise',
    favorableDays: 'Wednesday',
    favorableGemstones: 'Emerald (Panna), Peridot',
    coreTraits: ['Commercial Acumen', 'Quick Wit & Eloquence', 'Analytical Agility', 'Networking Power']
  },
  6: {
    planet: 'Venus (Shukra)',
    hindiPlanet: 'शुक्र',
    element: 'Water (जल)',
    deity: 'Maa Lakshmi & Kuber',
    favorableColors: 'Silk White, Pastel Blue, Pink, Cream',
    favorableDays: 'Friday',
    favorableGemstones: 'Diamond (Heera), White Zircon, Opal',
    coreTraits: ['Aesthetic Elegance', 'Harmonious Relationships', 'Luxury & Magnetism', 'Artistic Refinement']
  },
  7: {
    planet: 'Ketu (South Lunar Node)',
    hindiPlanet: 'केतु',
    element: 'Fire / Shadow (अग्नि/छाया)',
    deity: 'Lord Ganesha & Matsya Avatar',
    favorableColors: 'Smoky Grey, Pale Yellow, Sea Green',
    favorableDays: 'Tuesday & Thursday',
    favorableGemstones: 'Cat’s Eye (Lehsunia)',
    coreTraits: ['Mystic Intuition', 'Deep Investigative Research', 'Spiritual Liberation', 'Philosophical Insight']
  },
  8: {
    planet: 'Saturn (Shani)',
    hindiPlanet: 'शनि',
    element: 'Air (वायु)',
    deity: 'Lord Hanuman & Shani Dev',
    favorableColors: 'Dark Navy, Steel Grey, Black, Royal Purple',
    favorableDays: 'Saturday',
    favorableGemstones: 'Blue Sapphire (Neelam), Amethyst',
    coreTraits: ['Stoic Perseverance', 'Structural Empire Building', 'Karmic Mastery', 'Enduring Wealth']
  },
  9: {
    planet: 'Mars (Mangal)',
    hindiPlanet: 'मंगल',
    element: 'Fire (अग्नि)',
    deity: 'Lord Hanuman & Kartikeya',
    favorableColors: 'Crimson Red, Saffron Orange, Coral Rose',
    favorableDays: 'Tuesday',
    favorableGemstones: 'Red Coral (Moonga), Carnelian',
    coreTraits: ['Fearless Courage', 'Pioneering Dynamic Force', 'Protective Drive', 'High Physical Stamina']
  }
};

// Vedic Chaldean Number Relationship Grid (Friends, Neutrals, Enemies)
export const NUMBER_RELATIONSHIPS: Record<number, { friends: number[]; neutrals: number[]; enemies: number[] }> = {
  1: { friends: [1, 2, 3, 5, 9], neutrals: [4, 7], enemies: [6, 8] },
  2: { friends: [1, 5], neutrals: [2, 3, 7, 8, 9], enemies: [4, 6] },
  3: { friends: [1, 2, 3, 9], neutrals: [5, 7, 8], enemies: [4, 6] },
  4: { friends: [5, 6, 7, 8], neutrals: [1, 3], enemies: [2, 4, 9] },
  5: { friends: [1, 2, 3, 5, 6], neutrals: [7, 8, 9], enemies: [4] },
  6: { friends: [5, 6, 8], neutrals: [7, 9], enemies: [1, 2, 3, 4] },
  7: { friends: [1, 4, 5, 6], neutrals: [2, 3, 8], enemies: [7, 9] },
  8: { friends: [4, 5, 6, 7], neutrals: [3], enemies: [1, 2, 8, 9] },
  9: { friends: [1, 2, 3], neutrals: [5, 7], enemies: [4, 6, 8, 9] }
};

// Chaldean Compound Number Meanings
export const CHALDEAN_COMPOUND_MEANINGS: Record<number, { title: string; summary: string; vibration: 'Auspicious' | 'Favorable' | 'Challenging' | 'Potent' }> = {
  10: { title: 'The Wheel of Fortune', summary: 'Symbolizes honor, faith, and rising above obstacles. High confidence and favorable karma.', vibration: 'Auspicious' },
  11: { title: 'The Clenched Hand', summary: 'A warning of hidden trials, deception from others, and tests of courage.', vibration: 'Challenging' },
  12: { title: 'The Sacrifice', summary: 'Represents mental anxiety, sacrifice of self-interest for others, and spiritual evolution through patience.', vibration: 'Challenging' },
  13: { title: 'The Phoenix / Power', summary: 'A number of sudden change, transformation, and unexpected shifts in authority.', vibration: 'Potent' },
  14: { title: 'Movement & Magnetism', summary: 'Combines mental agility and commercial success through travel and public communications.', vibration: 'Favorable' },
  15: { title: 'The Magician / Charisma', summary: 'Blessed with artistic eloquence, magnetic attraction, and ability to obtain favors from high ranks.', vibration: 'Auspicious' },
  16: { title: 'The Shattered Citadel', summary: 'Warning of sudden loss of position or pride. Requires humble mindfulness and ethical grounding.', vibration: 'Challenging' },
  17: { title: 'The Star of the Magi', summary: 'Immense spiritual light, peace of mind, and triumph over difficulties. Very lucky for legacy.', vibration: 'Auspicious' },
  18: { title: 'Spiritual Conflict', summary: 'Represents internal storms, conflict with near ones, and danger from deception. Requires strong remedies.', vibration: 'Challenging' },
  19: { title: 'The Prince of Heaven', summary: 'One of the luckiest numbers in numerology. Assures success, esteem, and fulfillment of deep desires.', vibration: 'Auspicious' },
  20: { title: 'The Awakening', summary: 'Awakens higher purpose, spiritual duty, and great reforms, though material progress may feel delayed.', vibration: 'Favorable' },
  21: { title: 'The Crown of the Magi', summary: 'Guarantees advancement, elevated status, and long-term victory in difficult undertakings.', vibration: 'Auspicious' },
  22: { title: 'The Master Builder', summary: 'Tremendous practical vision and world impact, though warns against false dreamers and illusions.', vibration: 'Potent' },
  23: { title: 'Royal Star of the Lion', summary: 'A promise of protection, success from higher authorities, and smooth career elevation.', vibration: 'Auspicious' },
  24: { title: 'Love, Money & Harmony', summary: 'Assures assistance from influential superiors, harmonious romance, and steady financial gain.', vibration: 'Auspicious' },
  25: { title: 'Wisdom Through Trial', summary: 'Acquires wisdom through early life experience and research. Success arrives through perseverance.', vibration: 'Favorable' },
  26: { title: 'Partnership Warnings', summary: 'Warns against trusting unstable business associates and speculation. Focus on disciplined solo work.', vibration: 'Challenging' },
  27: { title: 'The Sceptre of Command', summary: 'A potent number of intellect, executive command, and high authority in creative or state fields.', vibration: 'Auspicious' },
  28: { title: 'The Contradiction', summary: 'Promise of great talent, but warns of loss through over-trust in legal affairs.', vibration: 'Challenging' },
  29: { title: 'Grace Under Uncertainty', summary: 'Severe tests in relationships and friendships. Requires continuous spiritual devotion.', vibration: 'Challenging' },
  30: { title: 'The Solitary Thinker', summary: 'A number of mental brilliance, contemplation, and literature. Material gains depend on active enterprise.', vibration: 'Favorable' },
  31: { title: 'The Isolated Visionary', summary: 'Brilliant mind but prone to loneliness or stubborn isolation. Benefits from shared teamwork.', vibration: 'Favorable' },
  32: { title: 'The Magnetic Communicator', summary: 'Gives immense popularity, political appeal, and financial prosperity when working with groups.', vibration: 'Auspicious' },
  33: { title: 'The Master Teacher', summary: 'Supreme compassion, healing power, and spiritual mentorship. Highly revered vibration.', vibration: 'Auspicious' },
  34: { title: 'Steady Construction', summary: 'Hard work brings reliable wealth and stability in mid-to-late life.', vibration: 'Favorable' },
  35: { title: 'Commercial Travel', summary: 'Brings sudden changes of residence and trade prosperity through dynamic mobility.', vibration: 'Favorable' },
  36: { title: 'Artistic Mastery', summary: 'Exceptional artistic expression, design authority, and romantic idealism.', vibration: 'Auspicious' },
  37: { title: 'Fortunate Alliances', summary: 'Great harmony in love and business partnerships. Very fortunate combination for business ventures.', vibration: 'Auspicious' },
  38: { title: 'Intuitive Friendship', summary: 'Gentle magnetism and support from women, but warns of sudden betrayal from envious peers.', vibration: 'Favorable' },
  39: { title: 'The Warrior Poet', summary: 'Dynamic humanitarian drive, courageous leadership, and resilience against slander.', vibration: 'Auspicious' },
  40: { title: 'Contemplative Closure', summary: 'Focuses energy on structural reorganization, legacy institutions, and philosophical depth.', vibration: 'Favorable' },
  41: { title: 'Brilliant Breakthrough', summary: 'Swift intellect, commercial mastery, and leadership in technology or communication.', vibration: 'Auspicious' },
  42: { title: 'Venusian Harmony', summary: 'Brings domestic joy, popularity in public circles, and high aesthetic satisfaction.', vibration: 'Auspicious' },
  45: { title: 'Rapid Expansion', summary: 'Speedy rise to leadership, high vitality, and commercial victory in competitive sectors.', vibration: 'Auspicious' },
  46: { title: 'Public Renown', summary: 'Brings social fame, luxury assets, and widespread respect in professional life.', vibration: 'Auspicious' },
  51: { title: 'The Conqueror', summary: 'Warrior spirit with tremendous drive to lead enterprises and pioneer untouched territories.', vibration: 'Auspicious' }
};

// Practical Lal Kitab & Elemental Remedies for Missing Lo Shu Digits
export const LO_SHU_MISSING_REMEDIES: Record<number, { element: string; zone: string; remedy: string; hindiRemedy: string }> = {
  1: {
    element: 'Water (जल)',
    zone: 'North (उत्तर)',
    remedy: 'Offer water (Arghya) to Surya Dev in a copper vessel every morning; place a small water fountain or brass vessel filled with water in the North zone.',
    hindiRemedy: 'प्रतिदिन प्रातः तांबे के लोटे से सूर्य को जल अर्पित करें और उत्तर दिशा में जल का कलश रखें।'
  },
  2: {
    element: 'Earth (पृथ्वी)',
    zone: 'South-West (दक्षिण-पश्चिम)',
    remedy: 'Keep a square silver piece in your wallet, respect your mother, and offer raw milk with water to Shivling on Mondays to ground emotional stability.',
    hindiRemedy: 'पर्स में चौकोर चांदी का टुकड़ा रखें तथा सोमवार को शिवलिंग पर कच्चा दूध व जल चढ़ाएं।'
  },
  3: {
    element: 'Wood (काष्ठ)',
    zone: 'East (पूर्व)',
    remedy: 'Apply yellow saffron or turmeric tilak on your forehead daily; wear a 5-Mukhi Indonesian/Nepali Rudraksha and respect gurus & elders.',
    hindiRemedy: 'माथे पर प्रतिदिन केसर या हल्दी का तिलक लगाएं और गुरुवार को बड़ों का आशीर्वाद लें।'
  },
  4: {
    element: 'Wood (काष्ठ)',
    zone: 'South-East (दक्षिण-पूर्व)',
    remedy: 'Wear a Tulsi mala or green aventurine bracelet; keep the SE corner orderly and feed green fodder or spinach to cows on Wednesdays.',
    hindiRemedy: 'तुलसी की माला धारण करें और बुधवार को गाय को हरा चारा अथवा पालक खिलाएं।'
  },
  5: {
    element: 'Earth (पृथ्वी / ब्रह्मस्थान)',
    zone: 'Center (ब्रह्मस्थान)',
    remedy: 'Keep the central area of your home open, clean, and well-lit; carry a green handkerchief and feed soaked green moong dal to birds.',
    hindiRemedy: 'घर के मध्य (ब्रह्मस्थान) को साफ़ और हल्का रखें तथा पक्षियों को भीगा हुआ हरा मूंग डालें।'
  },
  6: {
    element: 'Metal (धातु)',
    zone: 'North-West (उत्तर-पश्चिम)',
    remedy: 'Wear silver jewelry or watch, apply natural sandalwood or rose attar (fragrance), and donate sweet curd or white sweets to young girls on Fridays.',
    hindiRemedy: 'चांदी का कड़ा या अंगूठी पहनें, इत्र का उपयोग करें और शुक्रवार को कन्याओं को खीर खिलाएं।'
  },
  7: {
    element: 'Metal (धातु)',
    zone: 'West (पश्चिम)',
    remedy: 'Feed stray dogs with roti lightly greased with mustard oil, practice meditation, and keep a metallic wind chime in the West zone.',
    hindiRemedy: 'काले या चितकबरे कुत्ते को सरसों के तेल लगी रोटी खिलाएं और पश्चिम में 6-रॉड विंड चाइम लगाएं।'
  },
  8: {
    element: 'Earth (पृथ्वी)',
    zone: 'North-East (उत्तर-पूर्व)',
    remedy: 'Light a mustard oil diya under a Peepal tree on Saturday evenings, avoid laziness, and help laborers or physically challenged individuals.',
    hindiRemedy: 'शनिवार शाम को पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाएं और निर्धनों की सहायता करें।'
  },
  9: {
    element: 'Fire (अग्नि)',
    zone: 'South (दक्षिण)',
    remedy: 'Recite Hanuman Chalisa daily, wear a copper bracelet, keep a red coral or carnelian, and maintain warm relationships with younger siblings.',
    hindiRemedy: 'प्रतिदिन हनुमान चालीसा का पाठ करें, तांबे का कड़ा पहनें और दक्षिण दिशा में लाल रंग का बल्ब जलाएं।'
  }
};

/**
 * Reduce any integer to a single digit (1 to 9)
 */
export function reduceToSingleDigit(num: number): number {
  if (num === 0) return 0;
  while (num > 9) {
    num = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + (parseInt(digit, 10) || 0), 0);
  }
  return num;
}

/**
 * Calculate Mulank (Driver Number): Birth Date Day reduced to single digit (1-9)
 */
export function calculateMulank(dobString: string): number {
  if (!dobString) return 1;
  const parts = dobString.split('-');
  if (parts.length < 3) return 1;
  const day = parseInt(parts[2], 10) || 1;
  return reduceToSingleDigit(day);
}

/**
 * Calculate Bhagyank (Conductor / Destiny Number): Total DOB (DD + MM + YYYY) reduced to single digit (1-9)
 */
export function calculateBhagyank(dobString: string): number {
  if (!dobString) return 1;
  const parts = dobString.split('-');
  if (parts.length < 3) return 1;
  const year = parseInt(parts[0], 10) || 1990;
  const month = parseInt(parts[1], 10) || 1;
  const day = parseInt(parts[2], 10) || 1;
  
  // Sum all digits of day + month + year
  const allDigitsStr = `${day}${month}${year}`;
  let sum = 0;
  for (const ch of allDigitsStr) {
    sum += parseInt(ch, 10) || 0;
  }
  return reduceToSingleDigit(sum);
}

/**
 * Calculate Chaldean Name Number (Compound & Single Digit Root)
 */
export function calculateChaldeanName(name: string): {
  compound: number;
  root: number;
  breakdown: LetterBreakdown[];
  meaning?: { title: string; summary: string; vibration: string };
} {
  const cleanName = (name || '').toUpperCase();
  const breakdown: LetterBreakdown[] = [];
  let compoundSum = 0;

  for (const ch of cleanName) {
    if (CHALDEAN_LETTER_VALUES[ch] !== undefined) {
      const val = CHALDEAN_LETTER_VALUES[ch];
      compoundSum += val;
      breakdown.push({ char: ch, val });
    }
  }

  // Fallback if empty
  if (compoundSum === 0) {
    compoundSum = 10;
  }

  const root = reduceToSingleDigit(compoundSum);
  const meaning = CHALDEAN_COMPOUND_MEANINGS[compoundSum] || {
    title: `Vibration of Number ${compoundSum}`,
    summary: `Reduces to Root ${root} (${PLANET_ATTRIBUTES[root]?.planet || 'Cosmic Harmonic'}). Represents focused creative potential.`,
    vibration: 'Favorable'
  };

  return {
    compound: compoundSum,
    root,
    breakdown,
    meaning
  };
}

/**
 * Check vibrational harmony between Name Root and (Mulank & Bhagyank)
 */
export function checkVibrationalHarmony(nameRoot: number, mulank: number, bhagyank: number): {
  score: 'Harmonious' | 'Neutral' | 'Friction';
  mulankRel: 'Friend' | 'Neutral' | 'Enemy';
  bhagyankRel: 'Friend' | 'Neutral' | 'Enemy';
  summary: string;
  advice: string;
} {
  const getRel = (source: number, target: number): 'Friend' | 'Neutral' | 'Enemy' => {
    const rel = NUMBER_RELATIONSHIPS[source] || { friends: [], neutrals: [], enemies: [] };
    if (rel.friends.includes(target) || source === target) return 'Friend';
    if (rel.enemies.includes(target)) return 'Enemy';
    return 'Neutral';
  };

  const mulankRel = getRel(nameRoot, mulank);
  const bhagyankRel = getRel(nameRoot, bhagyank);

  let score: 'Harmonious' | 'Neutral' | 'Friction' = 'Neutral';
  let summary = '';
  let advice = '';

  if (mulankRel === 'Friend' && bhagyankRel === 'Friend') {
    score = 'Harmonious';
    summary = `Exceptional Golden Resonance: Your name vibration (Root ${nameRoot}) harmonizes perfectly with both your Driver (Mulank ${mulank}) and Destiny (Bhagyank ${bhagyank}).`;
    advice = 'Your current name frequency amplifies planetary auspiciousness, boosting career traction, social reputation, and mental clarity without friction.';
  } else if (mulankRel === 'Enemy' || bhagyankRel === 'Enemy') {
    score = 'Friction';
    const enemyWith = mulankRel === 'Enemy' && bhagyankRel === 'Enemy' 
      ? 'both Mulank & Bhagyank' 
      : mulankRel === 'Enemy' 
        ? `Driver Number (${mulank})` 
        : `Destiny Number (${bhagyank})`;
    summary = `Vibrational Friction Detected: Your name frequency (Root ${nameRoot}) is in a conflicting relationship with your ${enemyWith}.`;
    advice = `A micro-adjustment in your casual or business name (adding or adjusting a vowel/consonant) by Dr. Preeti Sehgal can eliminate stagnation and unlock rapid financial breakthroughs.`;
  } else {
    score = 'Neutral';
    summary = `Moderate Supportive Vibration: Your name frequency (Root ${nameRoot}) provides steady, stable support to your core birth charts with no severe planetary conflict.`;
    advice = 'Aligning your name to a specialized high-wealth compound number (such as 19, 23, 37, or 45) can provide a competitive edge in business and public leadership.';
  }

  return {
    score,
    mulankRel,
    bhagyankRel,
    summary,
    advice
  };
}

/**
 * Generate Lo Shu 3x3 Grid counts exclusively from Date of Birth digits
 */
export function generateLoShuGrid(dobString: string): {
  digitCounts: Record<number, number>;
  presentNumbers: number[];
  missingNumbers: number[];
  planes: Array<{ name: string; type: string; numbers: number[]; status: 'Complete' | 'Partial' | 'Missing'; meaning: string }>;
} {
  const digitCounts: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
  };

  if (dobString) {
    // Only extract digits from YYYY-MM-DD
    const digitsOnly = dobString.replace(/[^0-9]/g, '');
    for (const char of digitsOnly) {
      const d = parseInt(char, 10);
      if (d >= 1 && d <= 9) {
        digitCounts[d] = (digitCounts[d] || 0) + 1;
      }
    }
  }

  const presentNumbers = Object.keys(digitCounts)
    .map(Number)
    .filter((n) => digitCounts[n] > 0);

  const missingNumbers = Object.keys(digitCounts)
    .map(Number)
    .filter((n) => digitCounts[n] === 0);

  // Analyze standard Lo Shu Planes
  const planeDefinitions = [
    { name: 'Mental Plane (मानसिक तल)', type: 'Horizontal Row 1', numbers: [4, 9, 2], meaning: 'Intellectual capability, analytical clarity, and sharp memory retention.' },
    { name: 'Emotional Plane (भावनात्मक तल)', type: 'Horizontal Row 2', numbers: [3, 5, 7], meaning: 'Deep intuition, spiritual devotion, empathy, and emotional fortitude.' },
    { name: 'Practical Plane (व्यावहारिक तल)', type: 'Horizontal Row 3', numbers: [8, 1, 6], meaning: 'Material execution, financial enterprise, and physical endurance.' },
    { name: 'Thought Plane (विचार तल)', type: 'Vertical Col 1', numbers: [4, 3, 8], meaning: 'Conceptual planning, structured strategy, and systemic order.' },
    { name: 'Willpower Plane (इच्छाशक्ति तल)', type: 'Vertical Col 2', numbers: [9, 5, 1], meaning: 'Indomitable willpower, perseverance, and determination to conquer goals.' },
    { name: 'Action Plane (कर्म तल)', type: 'Vertical Col 3', numbers: [2, 7, 6], meaning: 'Dynamic execution, swift decisiveness, and social charisma.' },
    { name: 'Golden Raj Yoga (स्वर्ण राजयोग)', type: 'Diagonal 1', numbers: [4, 5, 6], meaning: 'Supreme prosperity, luxury vehicles, high authority, and continuous fortune.' },
    { name: 'Silver Raj Yoga (रजत राजयोग)', type: 'Diagonal 2', numbers: [2, 5, 8], meaning: 'Real estate empire, land ownership, deep wisdom, and generational stability.' }
  ];

  const planes = planeDefinitions.map((p) => {
    const presentCount = p.numbers.filter((num) => digitCounts[num] > 0).length;
    let status: 'Complete' | 'Partial' | 'Missing' = 'Missing';
    if (presentCount === p.numbers.length) status = 'Complete';
    else if (presentCount > 0) status = 'Partial';
    return {
      name: p.name,
      type: p.type,
      numbers: p.numbers,
      status,
      meaning: p.meaning
    };
  });

  return {
    digitCounts,
    presentNumbers,
    missingNumbers,
    planes
  };
}
