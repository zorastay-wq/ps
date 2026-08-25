import { ServiceItem, LalKitabRemedy, TarotCard, ReviewItem, InstagramPost, VastuZone, GemstoneInfo } from '../types';

export const DOCTOR_INFO = {
  name: 'Dr. Preeti Sehgal',
  hindiName: 'डॉ. प्रीति सहगल',
  title: 'Vedic Astrologer, Lal Kitab Specialist & Vastu Consultant',
  subtitle: 'Gold Medalist | Jyotish Acharya | 28+ Years Experience | Delhi',
  experienceYears: '28+',
  consultationsCount: '150,000+',
  satisfactionRate: '99.4%',
  rating: 5.0,
  reviewsCount: '850+',
  primaryPhone: '+91 96501 58977',
  secondaryPhone: '+91 98103 90986',
  whatsappNumber: '919650158977',
  email: 'drsehgal_preeti@yahoo.co.in',
  officialWebsite: 'https://drpreetisehgal.com',
  instagramHandle: '@drpreetisehgal1',
  instagramUrl: 'https://www.instagram.com/drpreetisehgal1',
  googleShareUrl: 'https://share.google/R5k9Sj7ugMDuF67S4',
  addresses: [
    {
      title: 'Main Consultation Office (Roop Nagar)',
      line1: 'Near Delhi University North Campus',
      line2: 'Roop Nagar, Delhi - 110007',
      timings: 'Monday - Saturday: 10:30 AM - 7:30 PM (Sunday by Prior Appointment)',
      mapLink: 'https://maps.google.com/?q=Roop+Nagar+Delhi'
    },
    {
      title: 'Kamla Nagar Consultation Chamber',
      line1: 'Bungalow Road / Main Market Circle',
      line2: 'Kamla Nagar, Delhi - 110007',
      timings: 'By Appointment Only',
      mapLink: 'https://maps.google.com/?q=Kamla+Nagar+Delhi'
    }
  ],
  bio: `Dr. Preeti Sehgal is one of North India's most respected and sought-after Vedic Astrologer and Lal Kitab experts with over 28 years of devoted astrological practice. Known for her razor-sharp astrological foresight, compassionate counsel, and practical, non-destructive Lal Kitab remedies, she has guided more than 150,000 individuals, entrepreneurs, celebrities, and corporate leaders across Delhi NCR, Mumbai, London, Dubai, the USA, and Canada.

Her specialized mastery covers Vedic Janam Kundli, Lal Kitab Darpan remedies, Kundli Milan (Matchmaking), Vastu Shastra for homes and commercial establishments, Tarot Card Intuitive Reading, Palmistry (Hasta Rekha), and Scientific Gemology.`,
  coreValues: [
    {
      title: 'Authentic Vedic Roots',
      desc: 'Grounding all forecasts in classical Parashari, Jaimini, and Lal Kitab shastras with mathematical accuracy.'
    },
    {
      title: 'Practical & Pocket-Friendly Remedies',
      desc: 'Simple, powerful Lal Kitab Upays requiring no expensive rituals or endless superstitions.'
    },
    {
      title: '100% Strict Confidentiality',
      desc: 'Your birth data, personal dilemmas, and consultations remain strictly private and protected.'
    },
    {
      title: 'Global Accessibility',
      desc: 'Seamless Video and Tele-consultations for clients across USA, UK, UAE, Europe, and India.'
    }
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'lal-kitab',
    title: 'Lal Kitab Remedies & Darpan',
    hindiTitle: 'लाल किताब अचूक उपाय',
    tagline: 'Instant, logical, and highly potent remedies for lingering life hurdles.',
    description: 'Specialized analysis using the ancient Lal Kitab system to identify debt traps, chronic misfortunes, family discord, and mental agitation with customized effortless remedies.',
    fullDetails: [
      'Comprehensive examination of 12 Houses according to Lal Kitab Farman rules',
      'Identification of sleeping planets (Soye Hue Grah) & activated houses',
      'Remedies using water immersion, donation to specific elements, and metal talismans',
      'Pitra Dosha, Rin-Pitra (ancestral debts), and Evil Eye (Nazar) neutralization',
      'Custom Lal Kitab Varshphal (Annual Forecast) guidance'
    ],
    keyBenefits: ['Fast results', 'No costly yagyas needed', 'Resolves court & business hurdles', 'Calms planetary unrest'],
    iconName: 'BookOpen',
    popular: true,
    category: 'lalkitab',
    duration: '45-60 Mins',
    priceNote: 'Comprehensive Session'
  },
  {
    id: 'vedic-kundli',
    title: 'Vedic Janam Kundli Analysis',
    hindiTitle: 'वैदिक जन्म कुंडली विश्लेषण',
    tagline: 'Deep lifelong planetary roadmap covering career, health, marriage & wealth.',
    description: 'Detailed analysis of your Lagna Chart (D1), Navamsha (D9), Dashamsha (D10), Vimshottari Mahadasha, and current transit (Gochar) to reveal timing of milestones.',
    fullDetails: [
      'Pinpoint timing for career promotions, job switch, and business ventures',
      'Marriage timing, spouse characteristics, and marital harmony forecast',
      'Health vulnerability alerts and preventative astrological precautions',
      'Kaal Sarp, Mangal, and Sade Sati mitigation remedies',
      'Personalized year-by-year 5-year outlook'
    ],
    keyBenefits: ['Clear timeline of opportunities', 'Spouse compatibility insights', 'Dasha period breakdown', 'Custom gemstone blueprint'],
    iconName: 'Compass',
    popular: true,
    category: 'astrology',
    duration: '45-60 Mins',
    priceNote: 'Most Requested'
  },
  {
    id: 'kundli-milan',
    title: 'Kundli Milan & Matchmaking',
    hindiTitle: 'गुण मिलान व विवाह परामर्श',
    tagline: 'Holistic 36 Guna Milan & longevity check for a blissful marital journey.',
    description: 'Beyond basic online points — Dr. Preeti Sehgal checks emotional temperament, health longevity, financial stability, Bhakoot, Nadi Dosha, and Manglik cancellations.',
    fullDetails: [
      'In-depth 36 Guna Milan with Graha Maitri & Nadi Dosha scrutiny',
      'Mutual Manglik Dosha evaluation and genuine cancellation rules',
      'Emotional, temperamental, and sexual harmony assessment',
      'Post-marriage financial prosperity and progeny (Santana) prospects',
      'Pre-wedding remedy recommendations for harmonious bond'
    ],
    keyBenefits: ['Avoid incompatible alliances', 'Neutralize Nadi & Bhakoot dosha', 'Confidence for families', 'Remedies for late marriage'],
    iconName: 'HeartHandshake',
    popular: true,
    category: 'astrology',
    duration: '30-45 Mins',
    priceNote: 'Both Charts Included'
  },
  {
    id: 'vastu-shastra',
    title: 'Vastu Shastra Consultation',
    hindiTitle: 'वास्तु शास्त्र परामर्श (बिना तोड़फोड़)',
    tagline: 'Harmonize residential & commercial spaces without structural demolition.',
    description: 'Balancing the 5 elements (Pancha Mahabhutas) and 16 energetic zones in homes, shops, offices, and factories to invite Lakshmi, peace, and health.',
    fullDetails: [
      'Residential layout audit: Main entrance, Kitchen, Master Bedroom, Pooja Room',
      'Commercial Vastu: Cash box placement, Owner cabin, Staff sitting alignment',
      'Non-destructive remedies using mirrors, colors, copper strips, and brass pyramids',
      'Geopathic stress and stagnant energy removal',
      'Floor plan verification before buying or renting properties'
    ],
    keyBenefits: ['Boost business cash flow', 'Eliminate sleep issues & anxiety', 'Stop repetitive money leaks', 'No demolition required'],
    iconName: 'Home',
    popular: false,
    category: 'vastu',
    duration: '1-2 Hours / Site Audit',
    priceNote: 'Online Floor Plan & On-site'
  },
  {
    id: 'tarot-reading',
    title: 'Tarot Card Intuitive Reading',
    hindiTitle: 'टैरो कार्ड परामर्श',
    tagline: 'Immediate clarity on pressing questions, love dilemmas, and career choices.',
    description: 'Using high-vibrational Tarot wisdom to untangle present confusion, uncover hidden intentions of others, and receive actionable spiritual guidance.',
    fullDetails: [
      'Love, Ex-partner reconciliation & Marriage intent spreads',
      'Career pivot, Job offer comparison & Investment outcomes',
      'Immediate Yes/No queries with timeline estimates',
      'Chakra energy blockages and spiritual guidance',
      '3-Card, Celtic Cross & Relationship Hexagram spreads'
    ],
    keyBenefits: ['Instant clarity within 24 hrs', 'Deep psychological insights', 'Clear next actionable steps', 'Empowering direction'],
    iconName: 'Sparkles',
    popular: false,
    category: 'tarot',
    duration: '30-45 Mins',
    priceNote: 'Express Booking Available'
  },
  {
    id: 'numerology',
    title: 'Numerology & Name Correction',
    hindiTitle: 'अंक ज्योतिष व नाम सुधार',
    tagline: 'Align your name vibrations with your Destiny Number for effortless success.',
    description: 'Chaldean & Pythagorean numerological harmonization for personal names, business brands, baby names, lucky phone numbers, and auspicious wedding dates.',
    fullDetails: [
      'Calculation of Moolank (Life Path) & Bhagyank (Destiny Number)',
      'Scientific Name spelling alteration without legal document change hassles',
      'Brand name & company registration number auspiciousness audit',
      'Lucky colors, favorable dates, and lucky bank account/vehicle numbers',
      'Compatibility between partners based on core numbers'
    ],
    keyBenefits: ['Attract high-frequency luck', 'Enhance business popularity', 'Harmonize personal life', 'Auspicious vehicle & mobile numbers'],
    iconName: 'Hash',
    popular: false,
    category: 'numerology',
    duration: '30-45 Mins',
    priceNote: 'Personal / Business'
  },
  {
    id: 'palmistry',
    title: 'Palmistry (Hasta Rekha)',
    hindiTitle: 'हस्तरेखा विज्ञान',
    tagline: 'Decipher the map of fate etched upon your palms with surgical accuracy.',
    description: 'Analyzing palm mounts, major lines (Life, Heart, Head, Fate, Sun), markings, and signets to validate birth chart timelines and uncover hidden potential.',
    fullDetails: [
      'Fate line & Sun line analysis for wealth & fame timing',
      'Mount of Jupiter, Venus, and Saturn strength checks',
      'Foreign travel lines and permanent relocation indications',
      'Health indicators on life line and nail analysis',
      'Detailed photo review for online global clients'
    ],
    keyBenefits: ['Confirms Kundli birth time accuracy', 'Identifies hidden talents', 'Health alerts', 'Marriage & children signs'],
    iconName: 'Hand',
    popular: false,
    category: 'astrology',
    duration: '30-45 Mins',
    priceNote: 'Photo / In-Person'
  },
  {
    id: 'gemstone-consultation',
    title: 'Gemstone & Rudraksha Guidance',
    hindiTitle: 'रत्न व रुद्राक्ष परामर्श',
    tagline: '100% Certified, energized, and safe astrological gemstones recommendation.',
    description: 'Avoid wearing harmful stones! Dr. Preeti Sehgal prescribes precisely calibrated gemstones and sacred Rudraksha beads with authentic energization rituals (Pran Pratishtha).',
    fullDetails: [
      'Ascendant-based favorable stones (Yoga Karaka planets only)',
      'Metal selection (Gold, Silver, Panchdhatu, Copper)',
      'Precise wearing finger, auspicious day, and planetary mantra',
      'Rudraksha combination recommendation for stress, BP, and focus',
      'Energization procedure (Abhimantrit Vidhi) included'
    ],
    keyBenefits: ['Safe from negative side-effects', 'Amplifies wealth & vitality', 'Government lab certified', 'Complete ritual guidance'],
    iconName: 'Gem',
    popular: false,
    category: 'gemstones',
    duration: '20-30 Mins',
    priceNote: 'Prescription & Testing'
  }
];

export const LAL_KITAB_REMEDIES_DATA: LalKitabRemedy[] = [
  {
    id: 'lk-1',
    title: 'Remedy for Financial Abundance & Debt Clearance',
    hindiTitle: 'आर्थिक तंगी व कर्ज मुक्ति का अचूक उपाय',
    category: 'wealth',
    issue: 'Money drain, business stagnation, inability to repay loans, delayed payments.',
    remedy: 'Feed sweet roti (made with jaggery and wheat) to stray black dogs or cows on Tuesdays and Saturdays. Keep a solid silver square piece in your wallet.',
    planet: 'Moon & Saturn (Chandra & Shani)',
    duration: '43 Consecutive Days',
    precautions: ['Do not consume alcohol or non-vegetarian food during remedy days', 'Avoid buying leather items on Saturdays'],
    auspiciousDay: 'Tuesday or Saturday morning'
  },
  {
    id: 'lk-2',
    title: 'Remedy for Marital Harmony & Delayed Marriage',
    hindiTitle: 'विवाह में बाधा व दांपत्य सुख का उपाय',
    category: 'marriage',
    issue: 'Prospects breaking at the last moment, daily arguments between spouses, Manglik tension.',
    remedy: 'Offer 2 yellow laddoos and 2 pieces of turmeric root at a Vishnu-Lakshmi temple on Thursdays. Sleep with head toward South or East.',
    planet: 'Jupiter & Venus (Guru & Shukra)',
    duration: '7 Consecutive Thursdays',
    precautions: ['Do not wash hair with soap/shampoo on Thursdays', 'Avoid wearing dark black clothing to matchmaking meets'],
    auspiciousDay: 'Thursday morning during Shukla Paksha'
  },
  {
    id: 'lk-3',
    title: 'Remedy for Career Growth & Boss Favor',
    hindiTitle: 'नौकरी में तरक्की व पदोन्नति उपाय',
    category: 'career',
    issue: 'Passed over for promotion, office politics, government job exam clearance hurdles.',
    remedy: 'Offer water mixed with jaggery and red flowers to Lord Surya in a copper vessel within 1 hour of sunrise chanting "Om Suryaya Namah". Keep a small brass sun in your workspace.',
    planet: 'Sun (Surya Grah)',
    duration: 'Continuous Daily Practice',
    precautions: ['Always respect your father and elders', 'Avoid taking free gifts from untrusted colleagues'],
    auspiciousDay: 'Start on a Sunday morning'
  },
  {
    id: 'lk-4',
    title: 'Protection from Evil Eye (Buri Nazar) & Panic',
    hindiTitle: 'बुरी नजर, भय व मानसिक अशांति निवारण',
    category: 'protection',
    issue: 'Sudden health issues in children, restless sleep, unexplained gloom in house, negative energy.',
    remedy: 'Rotate raw alum (Phitkari) or dry red chilies 7 times clockwise over the affected person and burn over camphor on Tuesday/Saturday sunset.',
    planet: 'Rahu & Ketu (Shadow Planets)',
    duration: '3 Consecutive Tuesdays/Saturdays',
    precautions: ['Throw residues outside home compound immediately', 'Do not look back after discarding'],
    auspiciousDay: 'Tuesday or Saturday evening after sunset'
  },
  {
    id: 'lk-5',
    title: 'Remedy for Child Well-being & Academic Focus',
    hindiTitle: 'संतान सुख व एकाग्रता हेतु उपाय',
    category: 'children',
    issue: 'Lack of concentration, exam anxiety, hyper-temper, delayed child birth blessing.',
    remedy: 'Wear a silver chain around the neck and plant a Peepal or Banyan sapling in a public garden or temple ground.',
    planet: 'Mercury & Jupiter (Budh & Brihaspati)',
    duration: 'One-time planting + daily care',
    precautions: ['Keep North-East study corner free of clutter and trash', 'Do not cut green trees'],
    auspiciousDay: 'Wednesday morning'
  },
  {
    id: 'lk-6',
    title: 'Remedy for Chronic Health & Mental Peace',
    hindiTitle: 'दीर्घकालिक रोग व मानसिक शांति उपाय',
    category: 'health',
    issue: 'Insomnia, recurring headaches, joint pain, unknown medical diagnoses.',
    remedy: 'Keep a pot of fresh water near your bedhead at night; pour it into a thorny plant or potted cactus outside in the morning. Donate black sesame seeds and mustard oil.',
    planet: 'Saturn & Rahu',
    duration: '21 Days',
    precautions: ['Never sleep under an exposed structural overhead beam', 'Do not keep broken clocks at home'],
    auspiciousDay: 'Saturday morning'
  }
];

export const TAROT_DECK: TarotCard[] = [
  {
    id: 0,
    name: 'The Fool (शुरुआत)',
    arcana: 'Major',
    uprightMeaning: 'New beginnings, spontaneous adventure, infinite potential, innocence, trusting the universe.',
    reversedMeaning: 'Recklessness, fear of taking a leap, poor risk management, naivety.',
    astrologicalSign: 'Uranus / Air',
    element: 'Air',
    guidance: 'Take that daring leap of faith. The cosmos is protecting your first steps.',
    color: '#d97706'
  },
  {
    id: 1,
    name: 'The Magician (सृजन शक्ति)',
    arcana: 'Major',
    uprightMeaning: 'Manifestation, personal mastery, resourcefulness, will power, turning visions into reality.',
    reversedMeaning: 'Illusion, untapped potential, wasted talent, manipulation.',
    astrologicalSign: 'Mercury (बुध)',
    element: 'Air',
    guidance: 'You have all 4 elemental tools at your disposal. Focus your will and create.',
    color: '#991b1b'
  },
  {
    id: 2,
    name: 'The High Priestess (अंतर्ज्ञान)',
    arcana: 'Major',
    uprightMeaning: 'Intuition, sacred secrets, divine feminine, subconscious wisdom, spiritual stillness.',
    reversedMeaning: 'Ignoring gut feelings, gossip, hidden enemies, emotional blockages.',
    astrologicalSign: 'Moon (चंद्र)',
    element: 'Water',
    guidance: 'Silence external chatter and listen to the whisper of your inner voice.',
    color: '#1e3a8a'
  },
  {
    id: 3,
    name: 'The Empress (समृद्धि व पोषण)',
    arcana: 'Major',
    uprightMeaning: 'Abundance, fertility, maternal warmth, luxury, creative expansion, mother nature.',
    reversedMeaning: 'Creative dry spell, dependence on others, neglect of self-care.',
    astrologicalSign: 'Venus (शुक्र)',
    element: 'Earth',
    guidance: 'Surround yourself with beauty and allow your projects to gestate naturally.',
    color: '#047857'
  },
  {
    id: 4,
    name: 'The Emperor (संरचना व अधिकार)',
    arcana: 'Major',
    uprightMeaning: 'Authority, discipline, strategic leadership, protective father figure, stability.',
    reversedMeaning: 'Tyranny, rigidity, loss of control, disorganized chaos.',
    astrologicalSign: 'Aries / Mars (मंगल)',
    element: 'Fire',
    guidance: 'Establish firm boundaries and enforce organized systems in your daily routine.',
    color: '#b91c1c'
  },
  {
    id: 5,
    name: 'The Hierophant (गुरु व धर्म)',
    arcana: 'Major',
    uprightMeaning: 'Spiritual guidance, tradition, higher education, moral values, sacred mentors.',
    reversedMeaning: 'Rebellion, outdated dogmas, personal non-conformity.',
    astrologicalSign: 'Taurus / Jupiter (गुरु)',
    element: 'Earth',
    guidance: 'Seek the counsel of an authentic spiritual mentor or classical teachings.',
    color: '#b45309'
  },
  {
    id: 6,
    name: 'The Lovers (प्रेम व निर्णय)',
    arcana: 'Major',
    uprightMeaning: 'Soulmate union, deep harmony, vital moral choice, alignment of values, passion.',
    reversedMeaning: 'Misaligned values, conflict, infidelity, indecisiveness.',
    astrologicalSign: 'Gemini',
    element: 'Air',
    guidance: 'Choose from the heart, but make sure your integrity is uncompromised.',
    color: '#be185d'
  },
  {
    id: 7,
    name: 'The Chariot (विजय व संकल्प)',
    arcana: 'Major',
    uprightMeaning: 'Triumph over obstacles, focused willpower, swift travel, self-control, momentum.',
    reversedMeaning: 'Lack of direction, aggression, feeling stuck in traffic/life.',
    astrologicalSign: 'Cancer',
    element: 'Water',
    guidance: 'Harness opposing forces and drive forward with unyielding determination.',
    color: '#4338ca'
  },
  {
    id: 8,
    name: 'Strength (धैर्य व आंतरिक बल)',
    arcana: 'Major',
    uprightMeaning: 'Gentle mastery, inner courage, compassion, taming raw instincts, resilience.',
    reversedMeaning: 'Self-doubt, feeling drained, raw anger taking over.',
    astrologicalSign: 'Leo / Sun (सूर्य)',
    element: 'Fire',
    guidance: 'Tame life’s fierce beasts with patient love, not aggressive force.',
    color: '#ea580c'
  },
  {
    id: 9,
    name: 'The Hermit (आत्मचिंतन)',
    arcana: 'Major',
    uprightMeaning: 'Introspection, solitary search for truth, soul illumination, philosophical calm.',
    reversedMeaning: 'Isolation, loneliness, anti-social withdrawal, ignoring good advice.',
    astrologicalSign: 'Virgo',
    element: 'Earth',
    guidance: 'Take a quiet pause. Your inner lantern shines bright enough for the next step.',
    color: '#65a30d'
  },
  {
    id: 10,
    name: 'Wheel of Fortune (भाग्य चक्र)',
    arcana: 'Major',
    uprightMeaning: 'Good luck, karmic cycles, sudden breakthrough, divine timing, turning point.',
    reversedMeaning: 'Bad streak, resisting inevitable changes, karmic debt reckoning.',
    astrologicalSign: 'Jupiter (बृहस्पति)',
    element: 'Fire',
    guidance: 'Your cycle is turning upward. Prepare to seize the incoming blessings.',
    color: '#d97706'
  },
  {
    id: 11,
    name: 'Justice (न्याय व कर्म)',
    arcana: 'Major',
    uprightMeaning: 'Fairness, karmic law, truth prevailing, legal victory, objective clarity.',
    reversedMeaning: 'Dishonesty, unfair treatment, blame shifting, legal complications.',
    astrologicalSign: 'Libra / Saturn',
    element: 'Air',
    guidance: 'Act with absolute truthfulness. The karmic balance sheet never lies.',
    color: '#0284c7'
  },
  {
    id: 17,
    name: 'The Star (आशा व मार्गदर्शन)',
    arcana: 'Major',
    uprightMeaning: 'Renewed hope, divine inspiration, emotional healing, peace, spiritual blessing.',
    reversedMeaning: 'Hopelessness, pessimism, lack of faith in the future.',
    astrologicalSign: 'Aquarius',
    element: 'Air',
    guidance: 'Have faith. After the darkest storm, your guiding star is now ascending.',
    color: '#38bdf8'
  },
  {
    id: 19,
    name: 'The Sun (सूर्य - यश व आनंद)',
    arcana: 'Major',
    uprightMeaning: 'Radiant success, vitality, joy, clarity, fame, celebration, positive outcome.',
    reversedMeaning: 'Temporary clouds, delayed celebration, mild pessimism.',
    astrologicalSign: 'Sun (सूर्य)',
    element: 'Fire',
    guidance: 'Unconditional victory and joyful warmth are surrounding your situation.',
    color: '#f59e0b'
  }
];

export const INSTAGRAM_REELS: InstagramPost[] = [
  {
    id: 'reel-1',
    type: 'reel',
    title: '5 Super Easy Lal Kitab Tips for Instant Wealth Flow in 2026',
    caption: 'Tired of money slipping through your fingers? Try these 2 timeless Lal Kitab upays from ancient texts! #DrPreetiSehgal #LalKitab #AstroTips #DelhiAstrologer',
    views: '240K',
    likes: '18.4K',
    thumbnailGradient: 'from-[#7F1D1D] to-[#B45309]',
    topic: 'Wealth & Money Flow',
    date: '3 Days Ago',
    bulletPoints: [
      'Keep a solid silver square piece wrapped in red silk in your safe',
      'Never place shoes or slippers near main entrance doorway',
      'Donate yellow food items on Thursday during waxing moon'
    ]
  },
  {
    id: 'reel-2',
    type: 'reel',
    title: 'The Truth About Manglik Dosha: Myths vs Reality',
    caption: 'Are you terrified by high Manglik claims? 80% of Manglik charts have automatic cancellations in Navamsha! Watch full breakdown. #Manglik #KundliMilan #MarriageAstrology',
    views: '380K',
    likes: '31.2K',
    thumbnailGradient: 'from-[#991B1B] to-[#451A03]',
    topic: 'Kundli Milan & Marriage',
    date: '1 Week Ago',
    bulletPoints: [
      'Mars in 1, 4, 7, 8, 12 is checked with Jupiter aspect',
      'Age 28+ significantly softens Mars intensity',
      'Guna Milan above 21 overrides many minor afflictions'
    ]
  },
  {
    id: 'reel-3',
    type: 'reel',
    title: 'North-East (Ishan Kon) Vastu Mistakes Ruining Peace at Home',
    caption: 'Is your Ishan Kon heavy with junk or toilets? Here is how to fix it without breaking a single brick! #VastuShastra #DrPreetiSehgal #HomeVastu',
    views: '195K',
    likes: '14.8K',
    thumbnailGradient: 'from-[#B45309] to-[#047857]',
    topic: 'Vastu Shastra',
    date: '2 Weeks Ago',
    bulletPoints: [
      'Place a bowl of rock salt in North-East corner',
      'Keep water element like a brass bowl with floating fresh flowers',
      'Never keep inverter, shoe rack, or dustbins in this sacred direction'
    ]
  },
  {
    id: 'reel-4',
    type: 'tip',
    title: 'Rahu Mahadasha Survival Guide: 3 Golden Rules',
    caption: 'Going through 18 years of Rahu dasha? Do not panic. Rahu elevates you to international heights if channeled right! #RahuDasha #VedicAstrology #AstrologyRemedies',
    views: '510K',
    likes: '42.6K',
    thumbnailGradient: 'from-[#312E81] to-[#7F1D1D]',
    topic: 'Planetary Dasha',
    date: '3 Weeks Ago',
    bulletPoints: [
      'Avoid blue and black color clothing on important meetings',
      'Feed sweet rotis to stray street dogs regularly',
      'Keep good relations with your in-laws and maternal uncle'
    ]
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Rajesh & Sunita Singhal',
    location: 'Civil Lines, Delhi',
    service: 'Kundli Milan & Marriage Consultation',
    rating: 5,
    date: 'August 2026',
    comment: 'Dr. Preeti Sehgal guided our daughter’s marriage when others scared us with heavy doshas. Her Lal Kitab remedies were so simple and genuine. Today our daughter is happily settled in London. We consider Dr. Preeti ji a divine blessing for our family!',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Vikramaditya Mehta',
    location: 'Director, TechLogix Solutions (Dubai / Delhi)',
    service: 'Business Astrology & Vastu Consultation',
    rating: 5,
    date: 'July 2026',
    comment: 'We consulted Dr. Preeti Sehgal for our new corporate office in Gurgaon. Her non-demolition Vastu modifications and timing predictions for our venture funding were 100% accurate down to the exact month! Highest recommendation for any serious entrepreneur.',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Ananya Sharma',
    location: 'Kamla Nagar, Delhi',
    service: 'Tarot & Career Guidance',
    rating: 5,
    date: 'June 2026',
    comment: 'I visited her Kamla Nagar office feeling completely lost between UPSC prep and a corporate offer. Her tarot spread and birth chart reading gave me crystal clear clarity. She does not sugarcoat, but speaks pure truth with immense kindness.',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Harpreet Kaur',
    location: 'Surrey, Canada (Online Video Consultation)',
    service: 'Lal Kitab Remedies & Janam Kundli',
    rating: 5,
    date: 'May 2026',
    comment: 'Living overseas, getting genuine Indian astrology was tough until a friend recommended drpreetisehgal.com. The Zoom consultation was super punctual. The remedies she gave were easy to execute even in Canada. My chronic stress vanished within 40 days.',
    verified: true
  },
  {
    id: 'rev-5',
    name: 'Amitabh Saxena',
    location: 'Roop Nagar, Delhi',
    service: 'Gemstone & Health Astrological Audit',
    rating: 5,
    date: 'April 2026',
    comment: 'Dr. Preeti Sehgal stopped me from wearing a Blue Sapphire that was completely wrong for my Lagna and causing severe insomnia. She prescribed an energized Yellow Sapphire and my health stabilized immediately. Truly a master of her craft with 28+ years of wisdom.',
    verified: true
  }
];

export const VASTU_ZONES = [
  {
    direction: 'North-East (ईशान कोण)',
    element: 'Water (जल तत्व)',
    deity: 'Lord Shiva & Jupiter',
    idealFor: 'Pooja Mandir, Meditation room, Water body, Study area',
    avoid: 'Toilet, Kitchen, Staircase, Heavy storage, Trash cans',
    remedy: 'Keep crystal pyramid, brass bowl with fresh water & rose petals. Paint in white or light cyan.'
  },
  {
    direction: 'South-East (आग्नेय कोण)',
    element: 'Fire (अग्नि तत्व)',
    deity: 'Lord Agni & Venus',
    idealFor: 'Kitchen, Electrical panel, Boiler, Fireplace, Cash counters',
    avoid: 'Master Bedroom, Water tanks, Borewell, Underground water sump',
    remedy: 'If kitchen is displaced, burn a red or copper oil lamp daily at sunset. Place a green plant.'
  },
  {
    direction: 'South-West (नैऋत्य कोण)',
    element: 'Earth (पृथ्वी तत्व)',
    deity: 'Nirriti & Rahu',
    idealFor: 'Master Bedroom, Owner office cabin, Heavy safe, Stability zone',
    avoid: 'Underground tank, Main entrance, Kitchen, Temple',
    remedy: 'Keep heavy brass statues or earthen pottery. Use warm earthy ochre or beige tones.'
  },
  {
    direction: 'North-West (वायव्य कोण)',
    element: 'Air (वायु तत्व)',
    deity: 'Lord Vayu & Moon',
    idealFor: 'Guest room, Finished goods warehouse, Unmarried daughter room',
    avoid: 'Master Bedroom, Heavy cash locker, Heavy immovable junk',
    remedy: 'Hang a 5-rod metallic wind chime. Ensure active air ventilation and light white/cream shades.'
  },
  {
    direction: 'North (उत्तर दिशा - कुबेर स्थान)',
    element: 'Water / Opportunity',
    deity: 'Lord Kuber & Mercury',
    idealFor: 'Cash locker facing North, Main entrance, Living room, Study',
    avoid: 'Red/pink walls, Heavy clutter, Overhead beam over desk',
    remedy: 'Place green plant or money plant in green pot. Keep North wall light and decorated with Kuber Yantra.'
  },
  {
    direction: 'East (पूर्व दिशा - सूर्य स्थान)',
    element: 'Air / Fire (Surya)',
    deity: 'Lord Indra & Sun',
    idealFor: 'Main entrance, Large windows, Balcony, Living room',
    avoid: 'High solid boundary wall blocking sunlight, Toilets',
    remedy: 'Hang a brass glowing sun icon. Offer morning water to Sun facing this direction.'
  }
];

export const VASTU_ZONES_DATA: VastuZone[] = [
  {
    id: 'ne',
    direction: 'North-East (ईशान कोण)',
    element: 'Water (जल तत्व)',
    ruler: 'Lord Shiva & Jupiter (गुरु)',
    colors: 'Light Cyan, White, Silver',
    idealFor: 'Pooja Mandir, Meditation room, Water fountain, Study desk',
    avoid: 'Toilet, Kitchen, Staircase, Heavy storage, Trash cans',
    nonDemolitionRemedy: 'Keep a pure crystal pyramid or a brass bowl filled with fresh water and rose petals in the North-East corner.'
  },
  {
    id: 'e',
    direction: 'East (पूर्व दिशा - सूर्य स्थान)',
    element: 'Air / Wood (वायु)',
    ruler: 'Lord Indra & Surya (सूर्य)',
    colors: 'Sun Gold, Saffron, Light Green',
    idealFor: 'Main entrance, Large windows, Balcony, Social networking living space',
    avoid: 'Solid opaque boundary walls blocking sunlight, Septic tanks',
    nonDemolitionRemedy: 'Hang an energized glowing brass Sun icon on the East wall at eye level.'
  },
  {
    id: 'se',
    direction: 'South-East (आग्नेय कोण)',
    element: 'Fire (अग्नि तत्व)',
    ruler: 'Lord Agni & Venus (शुक्र)',
    colors: 'Warm Red, Coral, Pastel Pink',
    idealFor: 'Kitchen, Electrical inverter panel, Boiler, Cash sales counter',
    avoid: 'Master Bedroom, Underground water sump, Borewell, Mirror',
    nonDemolitionRemedy: 'If the kitchen is displaced from South-East, burn a copper oil lamp daily at sunset and place a jade or money plant.'
  },
  {
    id: 's',
    direction: 'South (दक्षिण दिशा)',
    element: 'Fire / Earth',
    ruler: 'Lord Yama & Mars (मंगल)',
    colors: 'Crimson Red, Earthy Brown',
    idealFor: 'Restful sleeping zone, Heavy machinery, Office conference room',
    avoid: 'Main entrance without threshold protection, Underground water tank',
    nonDemolitionRemedy: 'Keep heavy dark curtains and place a Red Jasper or Coral gemstone sphere in the South.'
  },
  {
    id: 'sw',
    direction: 'South-West (नैऋत्य कोण)',
    element: 'Earth (पृथ्वी तत्व)',
    ruler: 'Nirriti & Rahu (राहु)',
    colors: 'Earthy Ochre, Sand Beige, Golden Ochre',
    idealFor: 'Master Bedroom, Head of Family bed, Heavy cash vault, Stability center',
    avoid: 'Underground tanks, Main entrance, Kitchen, Pooja room, Balcony',
    nonDemolitionRemedy: 'Keep heavy brass statues, lead pyramids, or earthen pots filled with raw yellow grains.'
  },
  {
    id: 'w',
    direction: 'West (पश्चिम दिशा - लाभ स्थान)',
    element: 'Space (आकाश तत्व)',
    ruler: 'Lord Varuna & Saturn (शनि)',
    colors: 'Royal Navy, Steel Grey, White',
    idealFor: 'Dining room, Study cabin for teenagers, Gains & profit locker',
    avoid: 'Large open slope draining downward to West, Extended balconies',
    nonDemolitionRemedy: 'Hang a 7-rod metallic wind chime or place a brass idol of Lord Shani / Varuna.'
  },
  {
    id: 'nw',
    direction: 'North-West (वायव्य कोण)',
    element: 'Air (वायु तत्व)',
    ruler: 'Lord Vayu & Moon (चंद्र)',
    colors: 'Milk White, Silver, Cream',
    idealFor: 'Guest room, Finished goods dispatch warehouse, Unmarried daughter room',
    avoid: 'Master Bedroom, Heavy immobile storage blockages',
    nonDemolitionRemedy: 'Ensure clean air ventilation. Keep a silver cow with calf figurine (Kamadhenu) in the North-West.'
  },
  {
    id: 'n',
    direction: 'North (उत्तर दिशा - कुबेर स्थान)',
    element: 'Water / Opportunity (जल)',
    ruler: 'Lord Kuber & Mercury (बुध)',
    colors: 'Emerald Green, Light Blue, Mint',
    idealFor: 'Cash locker opening towards North, Main entrance, Executive study',
    avoid: 'Dark red walls, Clutter piles, Heavy overhead structural beams',
    nonDemolitionRemedy: 'Place a lush money plant in a green ceramic pot and install a brass Kuber Yantra on the North wall.'
  }
];

export const GEMSTONES_DATA: GemstoneInfo[] = [
  {
    id: 'ruby',
    name: 'Ruby (माणिक्य - Manikya)',
    hindiName: 'माणिक्य',
    planet: 'Sun (सूर्य)',
    colorHex: '#e11d48',
    metal: '22K Gold / Copper',
    finger: 'Ring Finger (अनामिका)',
    auspiciousDay: 'Sunday Sunrise',
    mantra: 'Om Hram Hreem Hroum Sah Suryaya Namah (ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः)',
    benefits: ['Boosts executive authority & leadership', 'Enhances vitality & heart health', 'Fosters government recognition and fame'],
    suitableFor: ['Aries (मेष)', 'Leo (सिंह)', 'Sagittarius (धनु)']
  },
  {
    id: 'pearl',
    name: 'Natural Pearl (मोती - Moti)',
    hindiName: 'सच्चा मोती',
    planet: 'Moon (चंद्र)',
    colorHex: '#f1f5f9',
    metal: 'Pure Silver (चांदी)',
    finger: 'Little Finger (कनिष्ठिका)',
    auspiciousDay: 'Monday Morning',
    mantra: 'Om Shram Shreem Shroum Sah Chandramase Namah (ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः)',
    benefits: ['Calms hyper-anxiety & mental stress', 'Enhances emotional harmony & maternal bond', 'Improves digestive balance and sleep quality'],
    suitableFor: ['Cancer (कर्क)', 'Scorpio (वृश्चिक)', 'Pisces (मीन)']
  },
  {
    id: 'coral',
    name: 'Red Coral (मूंगा - Moonga)',
    hindiName: 'लाल मूंगा',
    planet: 'Mars (मंगल)',
    colorHex: '#dc2626',
    metal: 'Copper / Gold / Silver',
    finger: 'Ring Finger (अनामिका)',
    auspiciousDay: 'Tuesday Sunrise',
    mantra: 'Om Kram Kreem Kroum Sah Bhaumaya Namah (ॐ क्रां क्रीं क्रौं सः भौमाय नमः)',
    benefits: ['Ignites unstoppable courage & physical stamina', 'Overcomes debt and administrative litigation', 'Mitigates Manglik afflictions when favorable'],
    suitableFor: ['Aries (मेष)', 'Scorpio (वृश्चिक)', 'Leo (सिंह)', 'Sagittarius (धनु)']
  },
  {
    id: 'emerald',
    name: 'Emerald (पन्ना - Panna)',
    hindiName: 'पन्ना',
    planet: 'Mercury (बुध)',
    colorHex: '#059669',
    metal: 'Gold / Bronze / Silver',
    finger: 'Little Finger (कनिष्ठिका)',
    auspiciousDay: 'Wednesday Sunrise',
    mantra: 'Om Bram Breem Broum Sah Budhaya Namah (ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः)',
    benefits: ['Sharpens razor-sharp intellect & eloquence', 'Accelerates trade, commerce & speculative wealth', 'Calms nervous tension and speech impediments'],
    suitableFor: ['Taurus (वृषभ)', 'Gemini (मिथुन)', 'Virgo (कन्या)', 'Libra (तुला)', 'Capricorn (मकर)', 'Aquarius (कुंभ)']
  },
  {
    id: 'yellow-sapphire',
    name: 'Yellow Sapphire (पुखराज - Pukhraj)',
    hindiName: 'बृहस्पति पुखराज',
    planet: 'Jupiter (बृहस्पति / गुरु)',
    colorHex: '#f59e0b',
    metal: 'Pure Gold / Brass',
    finger: 'Index Finger (तर्जनी)',
    auspiciousDay: 'Thursday Sunrise',
    mantra: 'Om Gram Greem Groum Sah Gurave Namah (ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः)',
    benefits: ['Attracts grand wisdom, wealth & spiritual growth', 'Bestows marital bliss for women and progeny blessings', 'Expands judicial, advisory & business success'],
    suitableFor: ['Aries (मेष)', 'Cancer (कर्क)', 'Leo (सिंह)', 'Sagittarius (धनु)', 'Pisces (मीन)']
  },
  {
    id: 'diamond',
    name: 'Diamond / White Zircon (हीरा / जरकन)',
    hindiName: 'हीरा / ओपल',
    planet: 'Venus (शुक्र)',
    colorHex: '#e2e8f0',
    metal: 'Platinum / White Gold / Silver',
    finger: 'Middle or Little Finger',
    auspiciousDay: 'Friday Sunrise',
    mantra: 'Om Dram Dreem Droum Sah Shukraya Namah (ॐ द्रां द्रीं द्रौं सः शुक्राय नमः)',
    benefits: ['Bestows magnetic charisma & luxury lifestyle', 'Harmonizes romantic relationships & artistic talent', 'Elevates creative ventures, fashion & cinematic arts'],
    suitableFor: ['Taurus (वृषभ)', 'Gemini (मिथुन)', 'Virgo (कन्या)', 'Libra (तुला)', 'Capricorn (मकर)', 'Aquarius (कुंभ)']
  },
  {
    id: 'blue-sapphire',
    name: 'Blue Sapphire (नीलम - Neelam)',
    hindiName: 'इंद्रनीलम',
    planet: 'Saturn (शनि)',
    colorHex: '#1e3a8a',
    metal: 'Panchdhatu / Silver / Iron',
    finger: 'Middle Finger (मध्यमा)',
    auspiciousDay: 'Saturday Twilight',
    mantra: 'Om Pram Preem Proum Sah Shanaischaraya Namah (ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः)',
    benefits: ['Provides instantaneous rise in career & political power', 'Protects against sudden accidents & hidden enemies', 'Requires 3-day pillow test before final setting'],
    suitableFor: ['Taurus (वृषभ)', 'Libra (तुला)', 'Capricorn (मकर)', 'Aquarius (कुंभ)']
  },
  {
    id: 'hessonite',
    name: 'Hessonite Garnet (गोमेद - Gomed)',
    hindiName: 'गोमेद',
    planet: 'Rahu (राहु)',
    colorHex: '#78350f',
    metal: 'Silver / Ashtadhatu',
    finger: 'Middle Finger (मध्यमा)',
    auspiciousDay: 'Saturday Night',
    mantra: 'Om Bhram Bhreem Bhroum Sah Rahave Namah (ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः)',
    benefits: ['Dissolves confusion, phobias & sudden legal traps', 'Unlocks unconventional overseas ventures & tech success', 'Neutralizes Kaal Sarp and Rahu Mahadasha affliction'],
    suitableFor: ['Under strict personal Janam Kundli verification only']
  },
  {
    id: 'cat-eye',
    name: 'Cat’s Eye (लहसुनिया - Lehsuniya)',
    hindiName: 'वैदूर्य लहसुनिया',
    planet: 'Ketu (केतु)',
    colorHex: '#84cc16',
    metal: 'Silver / Panchdhatu',
    finger: 'Middle Finger (मध्यमा)',
    auspiciousDay: 'Tuesday or Thursday Midnight',
    mantra: 'Om Stram Streem Stroum Sah Ketave Namah (ॐ स्रां स्रीं स्रौं सः केतवे नमः)',
    benefits: ['Sharpens occult intuition & spiritual liberation (Moksha)', 'Protects against mysterious ailments & financial ruin', 'Aids in overcoming sudden karmic obstacles'],
    suitableFor: ['Under strict personal Janam Kundli verification only']
  }
];

export const FAQ_DATA = [
  {
    q: 'How are Lal Kitab remedies different from traditional Vedic rituals?',
    a: 'Traditional Vedic rituals often involve extensive yagyas, pujas, and expensive mantras. In contrast, Lal Kitab remedies (Lal Kitab Farman) are straightforward, science-based, and practical everyday actions (such as feeding specific birds/animals, copper donations, or specific mental habits) that quickly realign planetary wavelengths without hefty costs.'
  },
  {
    q: 'Can I consult Dr. Preeti Sehgal online if I live outside Delhi or abroad?',
    a: 'Yes, absolutely! Over 60% of Dr. Preeti Sehgal’s consultations happen via high-definition Video Calls (Zoom, Google Meet, WhatsApp Video) for clients across the USA, UK, Canada, Australia, Singapore, Dubai, and all Indian states. Birth charts and Lal Kitab reports are sent via WhatsApp & Email.'
  },
  {
    q: 'What details are needed for an accurate Kundli and Horoscope reading?',
    a: 'You will need: Full Name, Date of Birth (DD/MM/YYYY), Exact Time of Birth (e.g. 06:45 AM/PM), and Place of Birth (City, State, Country). If exact birth time is uncertain, Dr. Preeti Sehgal uses Palmistry (Hasta Rekha), Prashna Kundli (Horary), and Tarot reading to confirm your timelines.'
  },
  {
    q: 'How soon can one expect results from Lal Kitab remedies?',
    a: 'Most Lal Kitab remedies are prescribed for 40 to 43 consecutive days. Many clients start feeling marked shifts in clarity, emotional calmness, and financial blockages within 15 to 21 days, provided the rules and dietary precautions are followed faithfully.'
  },
  {
    q: 'Does Dr. Preeti Sehgal recommend gemstones safely?',
    a: 'Yes. Dr. Preeti Sehgal strictly abides by classical rules — gemstones are only prescribed for beneficial (Yoga Karaka and Lagna-friendly) planets. Inimical or malefic planets are balanced with Lal Kitab items or charity, never with stones that could amplify negativity.'
  },
  {
    q: 'Where are Dr. Preeti Sehgal’s consultation offices located in Delhi?',
    a: 'Her primary consultation chambers are situated in Delhi near Roop Nagar and Kamla Nagar (close to Delhi University North Campus). In-person visits require prior slot confirmation via WhatsApp or phone (+91 96501 58977).'
  }
];

