import { 
  PlanetaryPosition, 
  DashaInfluenceReport, 
  DashaTimelineItem, 
  AntardashaDetail 
} from '../types';

// Natural Relationships in Parashari Jyotish (Naisargika Sambandha)
// Friends (Mitra), Enemies (Shatru), Neutral (Sama)
export const NAISARGIKA_RELATIONSHIPS: Record<string, { friends: string[]; enemies: string[]; neutrals: string[] }> = {
  Sun: {
    friends: ['Moon', 'Mars', 'Jupiter'],
    enemies: ['Venus', 'Saturn', 'Rahu', 'Ketu'],
    neutrals: ['Mercury']
  },
  Moon: {
    friends: ['Sun', 'Mercury'],
    enemies: ['Rahu', 'Ketu'],
    neutrals: ['Mars', 'Jupiter', 'Venus', 'Saturn']
  },
  Mars: {
    friends: ['Sun', 'Moon', 'Jupiter'],
    enemies: ['Mercury', 'Rahu'],
    neutrals: ['Venus', 'Saturn', 'Ketu']
  },
  Mercury: {
    friends: ['Sun', 'Venus', 'Rahu'],
    enemies: ['Moon'],
    neutrals: ['Mars', 'Jupiter', 'Saturn', 'Ketu']
  },
  Jupiter: {
    friends: ['Sun', 'Moon', 'Mars', 'Rahu'],
    enemies: ['Mercury', 'Venus'],
    neutrals: ['Saturn', 'Ketu']
  },
  Venus: {
    friends: ['Mercury', 'Saturn', 'Rahu', 'Ketu'],
    enemies: ['Sun', 'Moon', 'Mars'],
    neutrals: ['Jupiter']
  },
  Saturn: {
    friends: ['Mercury', 'Venus', 'Rahu'],
    enemies: ['Sun', 'Moon', 'Mars'],
    neutrals: ['Jupiter', 'Ketu']
  },
  Rahu: {
    friends: ['Mercury', 'Venus', 'Saturn'],
    enemies: ['Sun', 'Moon', 'Mars'],
    neutrals: ['Jupiter', 'Ketu']
  },
  Ketu: {
    friends: ['Mars', 'Venus', 'Saturn'],
    enemies: ['Sun', 'Moon'],
    neutrals: ['Mercury', 'Jupiter', 'Rahu']
  }
};

// House Portfolios & Significance in Parashari Jyotish
export const HOUSE_PORTFOLIOS: Record<number, { name: string; themes: string; sanskrit: string }> = {
  1: { name: 'Tanu Bhava (1st House)', sanskrit: 'तनु भाव', themes: 'Self, vitality, physical constitution, mindset, new beginnings & personal identity' },
  2: { name: 'Dhana Bhava (2nd House)', sanskrit: 'धन भाव', themes: 'Accumulated wealth, speech, family lineage, liquid assets & oral nourishment' },
  3: { name: 'Sahaja Bhava (3rd House)', sanskrit: 'सहज भाव', themes: 'Courage (Parakrama), siblings, short travels, communication, enterprise & manual skills' },
  4: { name: 'Sukha Bhava (4th House)', sanskrit: 'सुख भाव', themes: 'Mother, real estate, vehicles, inner peace, emotional stability & domestic foundations' },
  5: { name: 'Putra Bhava (5th House)', sanskrit: 'पुत्र भाव', themes: 'Intellect (Dhi), progeny, speculative gains, creative genius, mantra siddhi & Purva Punya' },
  6: { name: 'Ari Bhava (6th House)', sanskrit: 'अरि भाव', themes: 'Overcoming obstacles, daily routine, competitive edges, debts, service & immune defense' },
  7: { name: 'Yuvati Bhava (7th House)', sanskrit: 'युवति भाव', themes: 'Spouse, marriage, business partnerships, legal pacts, public dealings & foreign trade' },
  8: { name: 'Randhra Bhava (8th House)', sanskrit: 'रन्ध्र भाव', themes: 'Transformation, longevity, unearned wealth, research, occult insight & secret transitions' },
  9: { name: 'Dharma Bhava (9th House)', sanskrit: 'धर्म भाव', themes: 'Fortune (Bhagya), father, higher wisdom, pilgrimages, ethical expansion & guru grace' },
  10: { name: 'Karma Bhava (10th House)', sanskrit: 'कर्म भाव', themes: 'Profession, authority, social status, executive decisions, government recognition & public legacy' },
  11: { name: 'Labha Bhava (11th House)', sanskrit: 'लाभ भाव', themes: 'Gains, elder siblings, network circles, realization of desires, windfalls & strategic alliances' },
  12: { name: 'Vyaya Bhava (12th House)', sanskrit: 'व्यय भाव', themes: 'Expenditures, foreign shores, spiritual liberation (Moksha), sleep, ashrams & meditative retreats' }
};

// Zodiac Sign Lordships in Parashari
export const RASHI_LORDS = [
  'Mars',    // 0 Aries
  'Venus',   // 1 Taurus
  'Mercury', // 2 Gemini
  'Moon',    // 3 Cancer
  'Sun',     // 4 Leo
  'Mercury', // 5 Virgo
  'Venus',   // 6 Libra
  'Mars',    // 7 Scorpio
  'Jupiter', // 8 Sagittarius
  'Saturn',  // 9 Capricorn
  'Saturn',  // 10 Aquarius
  'Jupiter'  // 11 Pisces
];

// Helper to determine houses ruled by a planet based on Lagna sign index
export function getHousesRuledByPlanet(planetName: string, lagnaSignIndex: number): number[] {
  const ruledHouses: number[] = [];
  
  if (planetName === 'Rahu' || planetName === 'Ketu') {
    // Shadow planets do not rule standard rashis in classical Parashari, they inherit dispositor
    return [];
  }

  for (let rashiIdx = 0; rashiIdx < 12; rashiIdx++) {
    if (RASHI_LORDS[rashiIdx] === planetName) {
      // Calculate house number from Lagna (1-indexed)
      const houseNumber = ((rashiIdx - lagnaSignIndex + 12) % 12) + 1;
      ruledHouses.push(houseNumber);
    }
  }

  return ruledHouses.sort((a, b) => a - b);
}

// Compute the House Offset from Maha Lord to Antar Lord (Positional Axis)
export function calculatePositionalAxis(mahaHouse: number, antarHouse: number): {
  axisName: string;
  axisType: 'Harmonious (Trikona 5/9)' | 'Kendra (1/4/7/10)' | 'Growth (Upachaya 3/11)' | 'Challenging (Shadashtaka 6/8)' | 'Transition (Dvidwadasa 2/12)' | 'Conjunctive (1/1)' | 'Oppositional (1/7)';
  isFavorable: boolean;
  explanation: string;
} {
  const offset = ((antarHouse - mahaHouse + 12) % 12) + 1;
  const reverseOffset = ((mahaHouse - antarHouse + 12) % 12) + 1;

  if (offset === 1) {
    return {
      axisName: '1/1 Axis (Conjunctive / Same House Alignment)',
      axisType: 'Conjunctive (1/1)',
      isFavorable: true,
      explanation: 'Both the Mahadasha and Antardasha lords operate from the same Bhava, concentrating psychic and material focus intensely into that single life domain.'
    };
  }

  if (offset === 7) {
    return {
      axisName: '1/7 Axis (Direct Mutual Drishti / Polarity)',
      axisType: 'Oppositional (1/7)',
      isFavorable: true,
      explanation: 'The sub-lord directly aspects the major lord across a 180° polarity, creating high interactive dynamism, partnership visibility, and external negotiation.'
    };
  }

  if ((offset === 5 && reverseOffset === 9) || (offset === 9 && reverseOffset === 5)) {
    return {
      axisName: '5/9 Trikona Axis (Nava-Panchama Yoga)',
      axisType: 'Harmonious (Trikona 5/9)',
      isFavorable: true,
      explanation: 'A supremely auspicious Dharma-Trikona geometry where the sub-period acts as a natural catalyst for grace, creative intelligence, and fortunate developments.'
    };
  }

  if ((offset === 6 && reverseOffset === 8) || (offset === 8 && reverseOffset === 6)) {
    return {
      axisName: '6/8 Shadashtaka Axis (षडाष्टक संबंध)',
      axisType: 'Challenging (Shadashtaka 6/8)',
      isFavorable: false,
      explanation: 'A classic Shadashtaka frictional axis indicating sudden adjustments, inner tension, litigation or health vigilance, requiring patient navigation and mindful remedies.'
    };
  }

  if ((offset === 2 && reverseOffset === 12) || (offset === 12 && reverseOffset === 2)) {
    return {
      axisName: '2/12 Dvi-Dwadasha Axis (द्वि-द्वादश संबंध)',
      axisType: 'Transition (Dvidwadasa 2/12)',
      isFavorable: false,
      explanation: 'A Dvi-Dwadasha axis representing reallocation of financial assets, foreign or distant connections, expenditure control, and personal emotional restructuring.'
    };
  }

  if ([4, 10].includes(offset)) {
    return {
      axisName: '4/10 Kendra Axis (Vishnu Sthana Alignment)',
      axisType: 'Kendra (1/4/7/10)',
      isFavorable: true,
      explanation: 'A powerful Kendra quadrant alignment driving decisive professional milestones, domestic restructuring, and tangible worldly manifestation.'
    };
  }

  if ([3, 11].includes(offset)) {
    return {
      axisName: '3/11 Upachaya Axis (Continuous Expansion)',
      axisType: 'Growth (Upachaya 3/11)',
      isFavorable: true,
      explanation: 'An Upachaya growth alignment where active initiatives, social networks, enterprise, and sibling/peer collaborations steadily yield cumulative material profits.'
    };
  }

  return {
    axisName: `${offset}/${reverseOffset} Positional Geometry`,
    axisType: 'Kendra (1/4/7/10)',
    isFavorable: true,
    explanation: 'The positional relationship between the two Grahas channels their combined energetic currents through the native’s natal matrix.'
  };
}

// Compute Natural Friendship Level
export function getNaturalRelationship(planetA: string, planetB: string): 'Friend' | 'Enemy' | 'Neutral' {
  if (planetA === planetB) return 'Friend';
  const rel = NAISARGIKA_RELATIONSHIPS[planetA];
  if (!rel) return 'Neutral';

  if (rel.friends.includes(planetB)) return 'Friend';
  if (rel.enemies.includes(planetB)) return 'Enemy';
  return 'Neutral';
}

// Format house list nicely
function formatHouseList(houses: number[]): string {
  if (houses.length === 0) return 'No primary house rulership (Shadow Graha / Node)';
  if (houses.length === 1) return `${houses[0]}th House`;
  return `${houses.map(h => `${h}th`).join(' & ')} Houses`;
}

// Dignity quality descriptor
function describeDignity(dignity: string): string {
  switch (dignity) {
    case 'Exalted':
      return 'in peak exaltation (Uccha), expressing its highest virtues with effortless authority';
    case 'Moolatrikona':
      return 'in its potent Moolatrikona office, executing administrative duties with high precision';
    case 'Own Sign':
      return 'in its own domain (Swakshetra), radiating stability, self-reliance, and protective power';
    case 'Friendly':
      return 'in a hospitable and supportive sign, providing smooth and cooperative outcomes';
    case 'Neutral':
      return 'in a balanced, neutral environment, delivering steady results in proportion to effort';
    case 'Enemy':
      return 'in an uncomfortable enemy sign (Shatru Kshetra), encountering resistance that demands conscious effort';
    case 'Debilitated':
      return 'in debilitation (Neecha), requiring active conscious redirection and remedial discipline';
    default:
      return `situated in ${dignity} status`;
  }
}

// Generate Chart-Specific Interpretation for any given Mahadasha + Antardasha Pair
export function generateDashaAnalysisReport(
  mahaLordName: string,
  antarLordName: string,
  planetaryPositions: PlanetaryPosition[],
  lagnaSignIndex: number,
  ascendantName: string,
  startDateStr?: string,
  endDateStr?: string
): DashaInfluenceReport {
  const mahaPlanet = planetaryPositions.find(p => p.name === mahaLordName) || planetaryPositions[0];
  const antarPlanet = planetaryPositions.find(p => p.name === antarLordName) || planetaryPositions[1];

  const mahaRuledHouses = getHousesRuledByPlanet(mahaPlanet.name, lagnaSignIndex);
  const antarRuledHouses = getHousesRuledByPlanet(antarPlanet.name, lagnaSignIndex);

  const naturalRelation = getNaturalRelationship(mahaPlanet.name, antarPlanet.name);
  const positionalAxis = calculatePositionalAxis(mahaPlanet.house, antarPlanet.house);

  const mahaHouseData = HOUSE_PORTFOLIOS[mahaPlanet.house] || HOUSE_PORTFOLIOS[1];
  const antarHouseData = HOUSE_PORTFOLIOS[antarPlanet.house] || HOUSE_PORTFOLIOS[1];

  // 1. Detailed Mahadasha Lord Narrative
  const mahadashaLordSummary = `As the presiding Mahadasha ruler, ${mahaPlanet.name} (${mahaPlanet.hindiName}) anchors your overall life trajectory. In your ${ascendantName} Lagna chart, ${mahaPlanet.name} rules the ${formatHouseList(mahaRuledHouses)} and is posited in the ${mahaPlanet.house}th House (${mahaHouseData.sanskrit}) in ${mahaPlanet.rashi} at ${mahaPlanet.degreeFormatted} ${describeDignity(mahaPlanet.dignity)}. Because it operates from the ${mahaPlanet.house}th House (${mahaHouseData.themes}), this major cycle sets a dominant backdrop centered around ${mahaHouseData.themes.toLowerCase()}. ${
    mahaRuledHouses.length > 0 
      ? `Its lordship over the ${formatHouseList(mahaRuledHouses)} ensures that affairs of these departments will be continually activated, restructured, and evaluated.`
      : `As a karmic nodal graha, it delivers fated shifts and accelerated life lessons.`
  }`;

  // 2. Detailed Antardasha Lord Narrative
  const antardashaLordSummary = `The sub-period is directed by ${antarPlanet.name} (${antarPlanet.hindiName}), acting as the active operational instrument. In your chart, ${antarPlanet.name} governs the ${formatHouseList(antarRuledHouses)} and occupies the ${antarPlanet.house}th House (${antarHouseData.sanskrit}) in ${antarPlanet.rashi} (${antarPlanet.dignity} dignity, ${antarPlanet.degreeFormatted}). This sub-cycle focuses immediate daily events and attention onto ${antarHouseData.themes.toLowerCase()}. ${
    antarPlanet.isRetrograde ? `Being in retrograde motion (Vakri), ${antarPlanet.name} compels deep introspection, review of past commitments, and internal recalibration before forward progress.` : ''
  }`;

  // 3. Synergy Synthesis (Maha + Antar relationship + house geometry)
  let synergyParagraph = '';
  if (mahaPlanet.name === antarPlanet.name) {
    synergyParagraph = `Under the Svabhukti (Self-Antardasha) of ${mahaPlanet.name}-${antarPlanet.name}, the pure undiluted energy of ${mahaPlanet.name} takes center stage. Since the major and sub-lords are identical, there is no conflicting planetary agenda. The themes of the ${mahaPlanet.house}th House (${mahaHouseData.themes}) are vividly magnified, inaugurating a brand new karmic chapter. Any dormant potential connected with ${formatHouseList(mahaRuledHouses)} comes to the forefront with striking clarity.`;
  } else {
    synergyParagraph = `The relationship between Mahadasha Lord ${mahaPlanet.name} and Antardasha Lord ${antarPlanet.name} is classified as ${naturalRelation.toUpperCase()} in Parashari Jyotish, and they form a ${positionalAxis.axisName}. ${positionalAxis.explanation} Because ${antarPlanet.name} operates from the ${antarPlanet.house}th House while ${mahaPlanet.name} oversees the ${mahaPlanet.house}th House, this sub-period filters the broader ${mahaPlanet.name} themes through the functional lens of ${antarPlanet.name}'s house rulership (${formatHouseList(antarRuledHouses)}). ${
      positionalAxis.isFavorable 
        ? `This synergistic geometry facilitates constructive collaboration, helping you convert broad aspirational plans into concrete milestone achievements.`
        : `This requires careful conscious balancing so that competing priorities between the ${mahaPlanet.house}th and ${antarPlanet.house}th house domains do not create unnecessary friction.`
    }`;
  }

  // 4. Four Thematic Breakdown Categories
  const careerInterpretation = generateCareerTheme(mahaPlanet, antarPlanet, mahaRuledHouses, antarRuledHouses, positionalAxis);
  const relationshipInterpretation = generateRelationshipTheme(mahaPlanet, antarPlanet, mahaRuledHouses, antarRuledHouses, positionalAxis);
  const healthInterpretation = generateHealthTheme(mahaPlanet, antarPlanet, mahaRuledHouses, antarRuledHouses, positionalAxis);
  const spiritualInterpretation = generateSpiritualTheme(mahaPlanet, antarPlanet, mahaRuledHouses, antarRuledHouses, positionalAxis);

  // 5. Prescribed Dasha Harmonizer Upay
  const remedialAdvice = generateDashaRemedy(mahaPlanet, antarPlanet, naturalRelation, positionalAxis);

  return {
    mahadashaLord: mahaPlanet.name,
    mahadashaHindi: mahaPlanet.hindiName,
    mahadashaHouse: mahaPlanet.house,
    mahadashaSign: mahaPlanet.rashi,
    mahadashaDignity: mahaPlanet.dignity,
    mahadashaRuledHouses: mahaRuledHouses,

    antardashaLord: antarPlanet.name,
    antardashaHindi: antarPlanet.hindiName,
    antardashaHouse: antarPlanet.house,
    antardashaSign: antarPlanet.rashi,
    antardashaDignity: antarPlanet.dignity,
    antardashaRuledHouses: antarRuledHouses,

    startDate: startDateStr || 'Active Period',
    endDate: endDateStr || 'Next Cycle',
    naturalRelationship: naturalRelation,
    positionalAxis: positionalAxis.axisName,
    positionalAxisType: positionalAxis.axisType,
    isSynergistic: positionalAxis.isFavorable,

    mahadashaLordSummary,
    antardashaLordSummary,
    synergyParagraph,

    themes: {
      careerWealth: careerInterpretation,
      loveRelationships: relationshipInterpretation,
      healthVitality: healthInterpretation,
      spiritualMindset: spiritualInterpretation
    },

    remedialAdvice
  };
}

// -------------------------------------------------------------
// Thematic Generator Helpers
// -------------------------------------------------------------

function generateCareerTheme(
  maha: PlanetaryPosition, 
  antar: PlanetaryPosition, 
  mahaRuled: number[], 
  antarRuled: number[],
  axis: { isFavorable: boolean; axisName: string }
): string {
  const touchesCareer = maha.house === 10 || antar.house === 10 || mahaRuled.includes(10) || antarRuled.includes(10);
  const touchesWealth = maha.house === 2 || antar.house === 2 || maha.house === 11 || antar.house === 11 || mahaRuled.includes(2) || mahaRuled.includes(11) || antarRuled.includes(2) || antarRuled.includes(11);
  const touchesService = maha.house === 6 || antar.house === 6 || mahaRuled.includes(6) || antarRuled.includes(6);

  if (touchesCareer || touchesWealth) {
    return `Professional and financial affairs receive powerful propulsion during this phase. With planetary activation linking the ${maha.house}th and ${antar.house}th Houses, your karmic labor gains distinct recognition. ${
      touchesWealth ? 'Liquid revenues and strategic wealth accumulation are highlighted through professional associations.' : 'Decisive career restructuring, promotions, and expanded responsibilities come into focus.'
    } ${axis.isFavorable ? 'Collaborative ventures and leadership initiatives yield tangible financial growth.' : 'Exercise diligence in contract negotiations and avoid speculative overextensions.'}`;
  }

  if (touchesService) {
    return `Daily professional routines, organizational management, and competitive projects demand consistent tactical discipline. Operating through the ${antar.house}th House, this period favors resolving backlog tasks, mastering workplace complexities, and establishing an undeniable reputation through rigorous service.`;
  }

  return `Work life maintains steady momentum anchored by the ${maha.house}th House foundations. You are encouraged to align your current professional output with long-term security. ${
    axis.isFavorable ? 'New opportunities for skill diversification and resourceful collaboration emerge naturally.' : 'Maintain a measured pace in professional negotiations, prioritizing stability over impulsive career leaps.'
  }`;
}

function generateRelationshipTheme(
  maha: PlanetaryPosition, 
  antar: PlanetaryPosition, 
  mahaRuled: number[], 
  antarRuled: number[],
  axis: { isFavorable: boolean; axisName: string }
): string {
  const touches7 = maha.house === 7 || antar.house === 7 || mahaRuled.includes(7) || antarRuled.includes(7);
  const touchesVenus = maha.name === 'Venus' || antar.name === 'Venus';
  const touches4 = maha.house === 4 || antar.house === 4 || mahaRuled.includes(4) || antarRuled.includes(4);

  if (touches7 || touchesVenus) {
    return `Partnership dynamics and marital harmony become pivotal life themes. Operating through the ${antar.house}th House with ${antar.name} energy, this window fosters heartfelt dialogue, mutual commitments, and significant relational milestones. ${
      axis.isFavorable 
        ? 'Mutual understanding, shared social celebrations, and emotional reciprocity flourish with ease.' 
        : 'Transparent communication is essential to ensure that differences in expectations are resolved with mutual empathy.'
    }`;
  }

  if (touches4) {
    return `Domestic bliss, family bonds, and maternal wellness take center stage. You will feel drawn to invest quality time in home life and domestic tranquility, creating an emotionally nurturing atmosphere for loved ones.`;
  }

  return `Social and interpersonal connections remain grounded and supportive. While your primary psychic focus is drawn toward ${HOUSE_PORTFOLIOS[maha.house]?.themes.toLowerCase() || 'personal ambitions'}, maintaining attentive presence with family and close confidants ensures sustained warmth and harmony.`;
}

function generateHealthTheme(
  maha: PlanetaryPosition, 
  antar: PlanetaryPosition, 
  mahaRuled: number[], 
  antarRuled: number[],
  axis: { isFavorable: boolean; axisName: string }
): string {
  const touchesTrik = [6, 8, 12].includes(maha.house) || [6, 8, 12].includes(antar.house) || mahaRuled.some(h => [6, 8, 12].includes(h)) || antarRuled.some(h => [6, 8, 12].includes(h));
  const isAfflicted = maha.dignity === 'Debilitated' || antar.dignity === 'Debilitated' || !axis.isFavorable;

  if (touchesTrik || isAfflicted) {
    return `Physical vitality requires conscious lifestyle pacing and preventive self-care. Because planetary energies engage the ${[maha.house, antar.house].filter(h => [6, 8, 12].includes(h)).join('th & ')} Trik House axis, pay close attention to restorative sleep, digestive balance, and stress management. Incorporating daily pranayama, balanced hydration, and routine health checks ensures robust physical resilience.`;
  }

  return `Vital energy, stamina, and physical endurance remain balanced and resilient throughout this period. Supported by the harmonious ${axis.axisName}, your body responds effectively to structured fitness routines, healthy nutrition, and outdoor rejuvenations.`;
}

function generateSpiritualTheme(
  maha: PlanetaryPosition, 
  antar: PlanetaryPosition, 
  mahaRuled: number[], 
  antarRuled: number[],
  axis: { isFavorable: boolean; axisName: string }
): string {
  const touchesDharma = [1, 5, 9].includes(maha.house) || [1, 5, 9].includes(antar.house) || [9, 12].includes(maha.house) || [9, 12].includes(antar.house);
  const touchesGuruKetu = ['Jupiter', 'Ketu', 'Sun'].includes(maha.name) || ['Jupiter', 'Ketu', 'Sun'].includes(antar.name);

  if (touchesDharma || touchesGuruKetu) {
    return `A deeply enriching cycle for spiritual evolution, philosophical insight, and higher learning. With the grace of ${maha.name} and ${antar.name} activating the ${[maha.house, antar.house].join('th & ')} Houses, this phase strengthens moral clarity, intuition, and pilgrimage inclinations. Engaging in regular mantra japa, temple visits, and altruistic charity (Daan) yields profound inner serenity.`;
  }

  return `The state of mind leans toward pragmatic contemplation and constructive self-reflection. Cultivating brief moments of silent meditation and reflective journaling will help you stay centered amidst outer worldly activities.`;
}

function generateDashaRemedy(
  maha: PlanetaryPosition, 
  antar: PlanetaryPosition, 
  rel: string,
  axis: { isFavorable: boolean; axisName: string }
): string {
  const remedies: string[] = [];

  // Maha Lord Remedy
  if (maha.name === 'Jupiter') remedies.push('Offer water to a Peepal tree without touching it on Thursdays and recite the Guru Beej Mantra.');
  else if (maha.name === 'Saturn') remedies.push('Light a mustard oil lamp (Diya) under a Peepal tree on Saturday dusk and sponsor seva for the elderly.');
  else if (maha.name === 'Sun') remedies.push('Offer Arghya (fresh water in a copper vessel with a pinch of kumkum) to the rising morning Sun daily.');
  else if (maha.name === 'Moon') remedies.push('Practice gratitude toward maternal figures and offer white flowers or milk at a Shiva temple on Mondays.');
  else if (maha.name === 'Mars') remedies.push('Recite the Hanuman Chalisa on Tuesdays and avoid unnecessary aggressive debates.');
  else if (maha.name === 'Mercury') remedies.push('Feed green fodder/spinach to cows on Wednesdays and maintain clear, honest speech.');
  else if (maha.name === 'Venus') remedies.push('Offer white sweets or rice to young girls on Fridays and uphold neat, fragrant personal aesthetics.');
  else if (maha.name === 'Rahu') remedies.push('Feed street dogs with barley or dry chapatis and maintain spotless cleanliness in living spaces.');
  else if (maha.name === 'Ketu') remedies.push('Feed multi-colored or black-and-white dogs and donate warm blankets to needy souls.');

  // Antar Lord Remedy
  if (maha.name !== antar.name) {
    if (antar.name === 'Jupiter') remedies.push('Apply yellow sandalwood or saffron tilak on your forehead after your morning bath.');
    else if (antar.name === 'Saturn') remedies.push('Chant "Om Sham Shanaishcharaya Namah" 108 times on Saturdays.');
    else if (antar.name === 'Sun') remedies.push('Chant the Gayatri Mantra 24 times during the morning sandhya window.');
    else if (antar.name === 'Moon') remedies.push('Keep a silver square coin or wear a natural pearl only after expert consultation.');
    else if (antar.name === 'Mars') remedies.push('Donate red lentils (Masoor Dal) to temple kitchens on Tuesdays.');
    else if (antar.name === 'Mercury') remedies.push('Chant "Om Budhaya Namah" 108 times on Wednesdays.');
    else if (antar.name === 'Venus') remedies.push('Donate white milk or curd on Friday mornings.');
    else if (antar.name === 'Rahu') remedies.push('Avoid wearing dark blue or black on important occasions.');
    else if (antar.name === 'Ketu') remedies.push('Visit Lord Ganesha temples on Wednesdays and offer fresh Durva grass.');
  }

  return remedies.join(' Additionally, ');
}

// -------------------------------------------------------------
// Calculate Full Timeline with Dynamic Antardashas
// -------------------------------------------------------------
export function calculateFullDashaTimeline(
  moonSiderealDeg: number,
  birthUtcDate: Date,
  planetaryPositions: PlanetaryPosition[],
  lagnaSignIndex: number,
  ascendantName: string,
  targetDate: Date = new Date()
): {
  currentCycle: DashaInfluenceReport;
  timeline: DashaTimelineItem[];
} {
  const NAKSHATRA_SPAN = 360 / 27; // 13°20' = 13.333333°
  const nakIndex = Math.floor(moonSiderealDeg / NAKSHATRA_SPAN);
  const degInNak = moonSiderealDeg % NAKSHATRA_SPAN;
  const elapsedFraction = degInNak / NAKSHATRA_SPAN;

  // Master 9 Dasha Sequence
  const DASHA_SEQUENCE = [
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

  // Map 27 nakshatras to starting dasha lord
  const NAK_LORD_MAP = [
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
    'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'
  ];

  const birthLordName = NAK_LORD_MAP[nakIndex % 27];
  let startSeqIdx = DASHA_SEQUENCE.findIndex(d => d.lord === birthLordName);
  if (startSeqIdx === -1) startSeqIdx = 0;

  const startLord = DASHA_SEQUENCE[startSeqIdx];
  const balanceYears = (1 - elapsedFraction) * startLord.years;

  const birthTimeMs = birthUtcDate.getTime();
  const MS_PER_YEAR = 365.2425 * 86400 * 1000;
  const targetTimeMs = targetDate.getTime();

  let accumulatedMs = birthTimeMs;
  const timeline: DashaTimelineItem[] = [];

  let activeReport: DashaInfluenceReport | null = null;

  for (let cycle = 0; cycle < 9; cycle++) {
    const seqIdx = (startSeqIdx + cycle) % 9;
    const mahaLordData = DASHA_SEQUENCE[seqIdx];
    const durationYears = cycle === 0 ? balanceYears : mahaLordData.years;
    const startMs = accumulatedMs;
    const endMs = startMs + (durationYears * MS_PER_YEAR);
    accumulatedMs = endMs;

    const startDate = new Date(startMs);
    const endDate = new Date(endMs);

    const isMahaActive = targetTimeMs >= startMs && targetTimeMs <= endMs;

    // Generate 9 Antardashas inside this Mahadasha
    const antardashas: AntardashaDetail[] = [];
    let antarAccumMs = startMs;

    // Antardashas always start with the Mahadasha lord itself and follow the 9-lord order
    const mahaLordInternalIdx = DASHA_SEQUENCE.findIndex(d => d.lord === mahaLordData.lord);

    for (let aIdx = 0; aIdx < 9; aIdx++) {
      const antarLordData = DASHA_SEQUENCE[(mahaLordInternalIdx + aIdx) % 9];
      // Proportion of Antardasha in a full Mahadasha: (MahaYears * AntarYears) / 120
      const standardAntarYears = (mahaLordData.years * antarLordData.years) / 120;
      
      // If first dasha with partial balance, scale proportionally
      const effectiveAntarYears = cycle === 0 
        ? (standardAntarYears * (balanceYears / mahaLordData.years))
        : standardAntarYears;

      const aStartMs = antarAccumMs;
      const aEndMs = aStartMs + (effectiveAntarYears * MS_PER_YEAR);
      antarAccumMs = aEndMs;

      const aStartDate = new Date(aStartMs);
      const aEndDate = new Date(aEndMs);
      const isAntarActive = isMahaActive && (targetTimeMs >= aStartMs && targetTimeMs <= aEndMs);

      const startFormatted = aStartDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
      const endFormatted = aEndDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

      // Generate dynamic report for this pair
      const interpretation = generateDashaAnalysisReport(
        mahaLordData.lord,
        antarLordData.lord,
        planetaryPositions,
        lagnaSignIndex,
        ascendantName,
        startFormatted,
        endFormatted
      );

      if (isAntarActive) {
        activeReport = interpretation;
      }

      antardashas.push({
        id: `${mahaLordData.lord}-${antarLordData.lord}-${cycle}-${aIdx}`,
        lord: antarLordData.lord,
        hindi: antarLordData.hindi,
        startDateFormatted: startFormatted,
        endDateFormatted: endFormatted,
        isActive: isAntarActive,
        durationYears: effectiveAntarYears,
        interpretation
      });
    }

    const mStartFormatted = startDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    const mEndFormatted = endDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });

    timeline.push({
      mahadashaLord: mahaLordData.lord,
      mahadashaHindi: mahaLordData.hindi,
      startDateFormatted: mStartFormatted,
      endDateFormatted: mEndFormatted,
      totalYears: durationYears,
      isActive: isMahaActive,
      antardashas
    });
  }

  // Fallback for active report if outside timeline bounds
  if (!activeReport && timeline.length > 0) {
    const fallbackMaha = timeline.find(t => t.isActive) || timeline[0];
    const fallbackAntar = fallbackMaha.antardashas.find(a => a.isActive) || fallbackMaha.antardashas[0];
    activeReport = fallbackAntar.interpretation;
  }

  return {
    currentCycle: activeReport || generateDashaAnalysisReport(
      'Jupiter', 'Jupiter', planetaryPositions, lagnaSignIndex, ascendantName
    ),
    timeline
  };
}
