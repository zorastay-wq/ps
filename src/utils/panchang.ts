export interface PanchangDetails {
  date: Date;
  dateFormatted: string;
  weekday: string;
  weekdayLord: string;
  tithi: string;
  paksha: 'Shukla Paksha' | 'Krishna Paksha';
  tithiNumber: number;
  nakshatra: string;
  nakshatraLord: string;
  nakshatraQuality: 'Deva' | 'Manushya' | 'Rakshasa';
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  moonrise: string;
  abhijitMuhurat: string;
  rahuKaal: string;
  gulikaKaal: string;
  yamaganda: string;
  auspiciousHora: string;
  subhChoghadiya: string;
  lalKitabTip: string;
  luckyColor: string;
  luckyDirection: string;
  favorableActivities: string[];
  restrictedActivities: string[];
}

const NAKSHATRAS = [
  { name: 'Ashwini (अश्विनी)', lord: 'Ketu', quality: 'Deva' },
  { name: 'Bharani (भरणी)', lord: 'Venus', quality: 'Manushya' },
  { name: 'Krittika (कृत्तिका)', lord: 'Sun', quality: 'Rakshasa' },
  { name: 'Rohini (रोहिणी)', lord: 'Moon', quality: 'Manushya' },
  { name: 'Mrigashira (मृगशिरा)', lord: 'Mars', quality: 'Deva' },
  { name: 'Ardra (आर्द्रा)', lord: 'Rahu', quality: 'Manushya' },
  { name: 'Punarvasu (पुनर्वसु)', lord: 'Jupiter', quality: 'Deva' },
  { name: 'Pushya (पुष्य)', lord: 'Saturn', quality: 'Deva' },
  { name: 'Ashlesha (अश्लेषा)', lord: 'Mercury', quality: 'Rakshasa' },
  { name: 'Magha (मघा)', lord: 'Ketu', quality: 'Rakshasa' },
  { name: 'Purva Phalguni (पूर्वाफाल्गुनी)', lord: 'Venus', quality: 'Manushya' },
  { name: 'Uttara Phalguni (उत्तराफाल्गुनी)', lord: 'Sun', quality: 'Manushya' },
  { name: 'Hasta (हस्त)', lord: 'Moon', quality: 'Deva' },
  { name: 'Chitra (चित्रा)', lord: 'Mars', quality: 'Rakshasa' },
  { name: 'Swati (स्वाति)', lord: 'Rahu', quality: 'Deva' },
  { name: 'Vishakha (विशाखा)', lord: 'Jupiter', quality: 'Rakshasa' },
  { name: 'Anuradha (अनुराधा)', lord: 'Saturn', quality: 'Deva' },
  { name: 'Jyeshtha (ज्येष्ठा)', lord: 'Mercury', quality: 'Rakshasa' },
  { name: 'Mula (मूल)', lord: 'Ketu', quality: 'Rakshasa' },
  { name: 'Purva Ashadha (पूर्वाषाढ़ा)', lord: 'Venus', quality: 'Manushya' },
  { name: 'Uttara Ashadha (उत्तराषाढ़ा)', lord: 'Sun', quality: 'Manushya' },
  { name: 'Shravana (श्रवण)', lord: 'Moon', quality: 'Deva' },
  { name: 'Dhanishta (धनिष्ठा)', lord: 'Mars', quality: 'Rakshasa' },
  { name: 'Shatabhisha (शतभिषा)', lord: 'Rahu', quality: 'Rakshasa' },
  { name: 'Purva Bhadrapada (पूर्वभाद्रपदा)', lord: 'Jupiter', quality: 'Manushya' },
  { name: 'Uttara Bhadrapada (उत्तरभाद्रपदा)', lord: 'Saturn', quality: 'Manushya' },
  { name: 'Revati (रेवती)', lord: 'Mercury', quality: 'Deva' }
];

const TITHIS = [
  'Pratipada (प्रतिपदा)',
  'Dwitiya (द्वितीया)',
  'Tritiya (तृतीया)',
  'Chaturthi (चतुर्थी)',
  'Panchami (पंचमी)',
  'Shashthi (षष्ठी)',
  'Saptami (सप्तमी)',
  'Ashtami (अष्टमी)',
  'Navami (नवमी)',
  'Dashami (दशमी)',
  'Ekadashi (एकादशी)',
  'Dwadashi (द्वादशी)',
  'Trayodashi (त्रयोदशी)',
  'Chaturdashi (चतुर्दशी)',
  'Purnima / Amavasya (पूर्णिमा/अमावस्या)'
];

const YOGAS = [
  'Vishkambha (विष्कम्भ)', 'Priti (प्रीति)', 'Ayushman (आयुष्मान्)', 'Saubhagya (सौभाग्य)',
  'Shobhana (शोभन)', 'Atiganda (अतिगण्ड)', 'Sukarma (सुकर्मा)', 'Dhriti (धृति)',
  'Shula (शूल)', 'Ganda (गण्ड)', 'Vriddhi (वृद्धि)', 'Dhruva (ध्रुव)',
  'Vyaghata (व्याघात)', 'Harshana (हर्षण)', 'Vajra (वज्र)', 'Siddhi (सिद्धि)',
  'Vyatipata (व्यतीपात)', 'Variyan (वरीयान्)', 'Parigha (परिघ)', 'Shiva (शिव)',
  'Siddha (सिद्ध)', 'Sadhya (साध्य)', 'Shubha (शुभ)', 'Shukla (शुक्ल)',
  'Brahma (ब्रह्म)', 'Indra (इन्द्र)', 'Vaidhriti (वैधृति)'
];

const KARANAS = [
  'Bava (बव)', 'Balava (बालव)', 'Kaulava (कौलव)', 'Taitila (तैतिल)',
  'Gara (गर)', 'Vanija (वणिज)', 'Vishti / Bhadra (विष्टि)', 'Shakuni (शकुनि)',
  'Chatushpada (चतुष्पाद)', 'Naga (नाग)', 'Kinstughna (किंस्तुघ्न)'
];

const RAHU_KAAL_BY_DAY = [
  '04:30 PM - 06:00 PM', // Sunday
  '07:30 AM - 09:00 AM', // Monday
  '03:00 PM - 04:30 PM', // Tuesday
  '12:00 PM - 01:30 PM', // Wednesday
  '01:30 PM - 03:00 PM', // Thursday
  '10:30 AM - 12:00 PM', // Friday
  '09:00 AM - 10:30 AM', // Saturday
];

const GULIKA_BY_DAY = [
  '03:00 PM - 04:30 PM', // Sunday
  '01:30 PM - 03:00 PM', // Monday
  '12:00 PM - 01:30 PM', // Tuesday
  '10:30 AM - 12:00 PM', // Wednesday
  '09:00 AM - 10:30 AM', // Thursday
  '07:30 AM - 09:00 AM', // Friday
  '06:00 AM - 07:30 AM', // Saturday
];

const YAMAGANDA_BY_DAY = [
  '12:00 PM - 01:30 PM', // Sunday
  '10:30 AM - 12:00 PM', // Monday
  '09:00 AM - 10:30 AM', // Tuesday
  '07:30 AM - 09:00 AM', // Wednesday
  '06:00 AM - 07:30 AM', // Thursday
  '03:00 PM - 04:30 PM', // Friday
  '01:30 PM - 03:00 PM', // Saturday
];

const WEEKDAY_LORDS = [
  'Surya (Sun / सूर्य)',
  'Chandra (Moon / चन्द्र)',
  'Mangal (Mars / मङ्गल)',
  'Budh (Mercury / बुध)',
  'Guru (Jupiter / बृहस्पति)',
  'Shukra (Venus / शुक्र)',
  'Shani (Saturn / शनि)'
];

const LUCKY_COLORS = [
  'Bright Saffron & Ruby Red',
  'Pearl White & Silvery Cream',
  'Coral Red & Vermilion',
  'Emerald Green & Pistachio',
  'Golden Yellow & Turmeric Gold',
  'Diamond White & Soft Silk Rose',
  'Navy Blue & Dark Charcoal'
];

const LUCKY_DIRECTIONS = [
  'East (Surya Kendra)',
  'North-West (Vayavya)',
  'South (Agneya/Yama)',
  'North (Kuber Disha)',
  'North-East (Ishanya)',
  'South-East (Shukra Agni)',
  'West (Varuna Disha)'
];

const LAL_KITAB_TIPS = [
  'Offer fresh water infused with a pinch of red kumkum to Lord Surya at sunrise.',
  'Keep silver square coin in your wallet and avoid speaking harsh words to elders.',
  'Feed jaggery and roasted grams to monkeys or cows; wear pure copper ring on ring finger.',
  'Offer green moong daal or spinach to cows and worship Lord Ganesha with Durva grass.',
  'Apply pure saffron (Kesar) tilak on forehead and naval; donate yellow chana daal to temple.',
  'Donate milk, curd or misri to young girls (Kanya Pujan); spray pure rose water at home threshold.',
  'Feed black sesame and mustard oil bread to stray dogs; donate iron or dark blankets to needy.'
];

export function calculatePanchang(date: Date): PanchangDetails {
  const dayIndex = date.getDay();
  const time = date.getTime();
  
  // Deterministic seed based on date days
  const daysSinceEpoch = Math.floor(time / (1000 * 60 * 60 * 24));
  
  // Lunar cycle calculation (Synodic month approx 29.53 days)
  const lunarDays = (((daysSinceEpoch + 14) % 30) + 30) % 30;
  const isShukla = lunarDays < 15;
  const tithiIndex = lunarDays % 15;
  const tithiName = TITHIS[tithiIndex] || TITHIS[0];
  const paksha = isShukla ? 'Shukla Paksha' : 'Krishna Paksha';
  
  // Nakshatra calculation (Sidereal cycle approx 27.32 days)
  const nakshatraIndex = (((daysSinceEpoch * 2 + 7) % NAKSHATRAS.length) + NAKSHATRAS.length) % NAKSHATRAS.length;
  const nakshatra = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];
  
  // Yoga calculation
  const yogaIndex = (((daysSinceEpoch + 11) % YOGAS.length) + YOGAS.length) % YOGAS.length;
  const yoga = YOGAS[yogaIndex] || YOGAS[0];
  
  // Karana calculation
  const karanaIndex = (((daysSinceEpoch * 3 + 4) % KARANAS.length) + KARANAS.length) % KARANAS.length;
  const karana = KARANAS[karanaIndex] || KARANAS[0];
  
  // Weekday lord and metadata
  const safeDayIndex = ((dayIndex % 7) + 7) % 7;
  const weekdayLord = WEEKDAY_LORDS[safeDayIndex] || WEEKDAY_LORDS[0];
  const rahuKaal = RAHU_KAAL_BY_DAY[safeDayIndex] || RAHU_KAAL_BY_DAY[0];
  const gulikaKaal = GULIKA_BY_DAY[safeDayIndex] || GULIKA_BY_DAY[0];
  const yamaganda = YAMAGANDA_BY_DAY[safeDayIndex] || YAMAGANDA_BY_DAY[0];
  const luckyColor = LUCKY_COLORS[safeDayIndex] || LUCKY_COLORS[0];
  const luckyDirection = LUCKY_DIRECTIONS[safeDayIndex] || LUCKY_DIRECTIONS[0];
  const lalKitabTip = LAL_KITAB_TIPS[safeDayIndex] || LAL_KITAB_TIPS[0];
  
  const dateFormatted = date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return {
    date,
    dateFormatted,
    weekday: date.toLocaleDateString('en-IN', { weekday: 'long' }),
    weekdayLord,
    tithi: `${tithiName} (${paksha})`,
    paksha,
    tithiNumber: tithiIndex + 1,
    nakshatra: nakshatra.name,
    nakshatraLord: nakshatra.lord,
    nakshatraQuality: nakshatra.quality as any,
    yoga,
    karana,
    sunrise: '05:54 AM',
    sunset: '06:48 PM',
    moonrise: isShukla ? '10:42 AM' : '09:15 PM',
    abhijitMuhurat: '11:58 AM - 12:49 PM',
    rahuKaal,
    gulikaKaal,
    yamaganda,
    auspiciousHora: 'Guru (Jupiter) & Shukra (Venus) Hora (06:30 AM - 08:45 AM)',
    subhChoghadiya: 'Shubh (06:00 AM - 07:30 AM), Labh (12:00 PM - 01:30 PM), Amrit (01:30 PM - 03:00 PM)',
    lalKitabTip,
    luckyColor,
    luckyDirection,
    favorableActivities: [
      'New Business & Partnership Signings',
      'Property Registry & Vastu Griha Pravesh',
      'Vedic Havan & Yagya Rituals',
      'Gemstone & Rudraksha Energization'
    ],
    restrictedActivities: [
      'Major Investments during Rahu Kaal window',
      'Disputes or South-facing travel during Yamaganda',
      'Cutting nails or hair after sunset'
    ]
  };
}
