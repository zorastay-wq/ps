import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Compass, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  DoorOpen, 
  Flame, 
  Wind, 
  Mountain, 
  Orbit, 
  Search, 
  Info, 
  Maximize2, 
  X, 
  Calendar, 
  ArrowRight,
  Filter,
  Check,
  Zap,
  Tag
} from 'lucide-react';

export type VastuRemedyCategory = 'all' | 'metal_strips' | 'pyramids' | 'yantras' | 'crystals' | 'water_plants';
export type DirectionFilter = 'ALL' | 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'CENTER';

export interface VastuRemedyItem {
  id: string;
  title: string;
  sanskritName: string;
  direction: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'CENTER';
  directionLabel: string;
  element: 'Water' | 'Air' | 'Fire' | 'Earth' | 'Space';
  category: 'metal_strips' | 'pyramids' | 'yantras' | 'crystals' | 'water_plants';
  categoryLabel: string;
  placementType: 'Threshold Floor Embed' | 'Wall Mount (Eye Level)' | 'Corner Energy Node' | 'Under Skirting' | 'Window / Balcony' | 'Centroid Space';
  doshaTarget: string;
  doshaDescription: string;
  materialSpec: string;
  exactPlacement: string;
  heightAndFacing: string;
  installationDay: string;
  sankalpaMantra: string;
  efficacyRating: number; // e.g. 9.8 / 10
  keyBenefits: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  visualDiagramType: 'threshold_strip' | 'wall_yantra' | 'corner_pyramid' | 'water_urn' | 'crystal_grid' | 'helix_anchor' | 'chime_air' | 'lead_block' | 'brahmasthan_crystal';
}

export const VASTU_REMEDIES_DATA: VastuRemedyItem[] = [
  {
    id: 'rem-n-kuber-yantra',
    title: 'Energized Brass Kuber Yantra & Silver Coin Altar',
    sanskritName: 'श्री कुबेर यन्त्र एवं धन आकर्षण पट्टिका',
    direction: 'N',
    directionLabel: 'North (उत्तर दिशा)',
    element: 'Water',
    category: 'yantras',
    categoryLabel: 'Sacred Yantra Plate',
    placementType: 'Wall Mount (Eye Level)',
    doshaTarget: 'North Cut, Blocked North Wall, Career Stagnation & Cash Inflow Blockage',
    doshaDescription: 'Corrects heavy solid walls or missing North quadrants that obstruct Kuber magnetic inflow.',
    materialSpec: 'Hand-etched 24K Gold-gilded Brass (99.2% copper-zinc formulation, 6x6 inches)',
    exactPlacement: 'Mount on the inner North wall or above the North treasury safe.',
    heightAndFacing: 'Height: 4.5 to 5.5 ft above finished floor level. Yantra surface facing South.',
    installationDay: 'Wednesday or Friday during Mercury / Venus Hora (Shuklapaksha morning 6:00 - 8:00 AM)',
    sankalpaMantra: 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा ॥',
    efficacyRating: 9.8,
    keyBenefits: [
      'Unblocks stalled cash flow and accelerates client retainers',
      'Attracts fresh business ventures and career promotions',
      'Harmonizes Mercury intellect with Kuber treasury'
    ],
    dosAndDonts: {
      dos: [
        'Clean weekly with pure rose water and light organic sandalwood incense',
        'Keep a small bowl of unbroken raw rice (Akshat) below the plate'
      ],
      donts: [
        'Never place inside or sharing a common wall with a bathroom',
        'Avoid red or pink framing behind North Kuber yantras'
      ]
    },
    visualDiagramType: 'wall_yantra'
  },
  {
    id: 'rem-n-brass-pyramids',
    title: 'Brass 9-Grid Vastu Pyramids Set',
    sanskritName: 'नव-धातु पीतल वास्तु पिरामिड समुच्चय',
    direction: 'N',
    directionLabel: 'North (उत्तर दिशा)',
    element: 'Water',
    category: 'pyramids',
    categoryLabel: 'Pyramids & Helixes',
    placementType: 'Corner Energy Node',
    doshaTarget: 'North-West to North Energy Deficit & Extended Southern Mass',
    doshaDescription: 'Magnifies cosmic bio-frequencies in low-energy North rooms and work cabins.',
    materialSpec: 'Solid Cast Virgin Brass (Triple-stepped 81-chamber micro pyramid matrix)',
    exactPlacement: 'Concealed or displayed in North-North-East corner of home office or living room.',
    heightAndFacing: 'On an elevated shelf (2.5 to 4 ft) or embedded under wooden floor tiles.',
    installationDay: 'Wednesday morning during Moon / Mercury conjunction',
    sankalpaMantra: 'ॐ बुं बुधाय नमः ॥ ॐ कुबेराय नमः ॥',
    efficacyRating: 9.6,
    keyBenefits: [
      'Multiplies positive geomagnetic attraction by 108x',
      'Neutralizes structural angular cuts in North direction',
      'Sharpens analytical decision making for investments'
    ],
    dosAndDonts: {
      dos: [
        'Orient apex pointing directly upwards to ceiling',
        'Keep surrounding area decluttered and dust-free'
      ],
      donts: [
        'Do not place directly on bare cold floor without a wooden coaster',
        'Do not touch with unwashed hands during Rahu Kaal'
      ]
    },
    visualDiagramType: 'corner_pyramid'
  },
  {
    id: 'rem-ne-crystal-water-bowl',
    title: 'Pure Brass Water Urn with Marigold & Sphatik Lotus',
    sanskritName: 'ईशान जल पात्र एवं स्फटिक कमल चक्र',
    direction: 'NE',
    directionLabel: 'North-East (ईशान कोण)',
    element: 'Water',
    category: 'water_plants',
    categoryLabel: 'Sacred Water & Elements',
    placementType: 'Corner Energy Node',
    doshaTarget: 'NE Toilet, Heavy NE Staircase, Blocked Ishan Corner, Stress & Mental Fog',
    doshaDescription: 'Cools severe heat defects and purifies mental vibrations in defective Ishan sectors.',
    materialSpec: 'Hand-hammered Heavy Pure Brass Urn (Kansa alloy rim) + 100% Natural Himalayan Quartz Lotus',
    exactPlacement: 'Extreme North-East corner of the living area, pooja room, or reception lobby.',
    heightAndFacing: 'On a raised teakwood pedestal at 1.5 to 2.5 ft above floor level.',
    installationDay: 'Thursday morning (Guru Pushya Yoga or Shukla Ekadashi at sunrise)',
    sankalpaMantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः ॥ ॐ ईशानाय नमः ॥',
    efficacyRating: 9.9,
    keyBenefits: [
      'Restores Ishanya divine grace and dissolves mental tension',
      'Corrects energetic toxicity from misplaced toilets or heavy overhead tanks',
      'Promotes deep sleep, meditative focus, and family health'
    ],
    dosAndDonts: {
      dos: [
        'Change water every 24 to 48 hours and add a pinch of Gangajal and raw camphor',
        'Float fresh yellow marigold or white jasmine blossoms'
      ],
      donts: [
        'Never let water become stagnant, cloudy, or dry up',
        'Do not use synthetic glass or cracked ceramic vessels'
      ]
    },
    visualDiagramType: 'water_urn'
  },
  {
    id: 'rem-ne-zinc-strip',
    title: 'Zinc Metal Floor Strip Energy Insulator',
    sanskritName: 'ईशान जस्ता (जिंक) ऊर्जा रोधक पट्टिका',
    direction: 'NE',
    directionLabel: 'North-East (ईशान कोण)',
    element: 'Water',
    category: 'metal_strips',
    categoryLabel: 'Metal Strips & Energy Cutters',
    placementType: 'Under Skirting',
    doshaTarget: 'Misplaced Toilet / Sewage Pipe in North-East quadrant',
    doshaDescription: 'Cuts negative drainage energy lines without physical demolition of bathroom.',
    materialSpec: 'High-purity 99.5% Electrolytic Zinc Strip (3mm thickness x 25mm width)',
    exactPlacement: 'Chiseled 10mm into tile joints or fitted flush under threshold silicone lining along the toilet frame.',
    heightAndFacing: 'Floor Level. Must encircle all 3 or 4 boundary sides of the defective zone.',
    installationDay: 'Thursday or Monday at Sunrise after Vedic Energization',
    sankalpaMantra: 'ॐ नमः शिवाय ॥ ॐ ईशान्यै नमः ॥',
    efficacyRating: 9.7,
    keyBenefits: [
      'Seals negative drain vortex and prevents wealth drainage',
      'Zero demolition required — 100% non-invasive installation',
      'Insulates adjoining bedrooms and study spaces from psychic stress'
    ],
    dosAndDonts: {
      dos: [
        'Ensure continuous strip contact across the threshold without gaps',
        'Seal with waterproof white/clear resin grout'
      ],
      donts: [
        'Do not use copper or lead strips in North-East (elemental mismatch)',
        'Do not leave exposed sharp metal edges'
      ]
    },
    visualDiagramType: 'threshold_strip'
  },
  {
    id: 'rem-e-brass-surya-plate',
    title: 'Radiant Brass Surya Dev Mandala Plaque',
    sanskritName: 'तेजोमय अष्टधातु सूर्य मण्डल फलक',
    direction: 'E',
    directionLabel: 'East (पूर्व दिशा)',
    element: 'Fire',
    category: 'yantras',
    categoryLabel: 'Sacred Yantra Plate',
    placementType: 'Wall Mount (Eye Level)',
    doshaTarget: 'East Cut, Windowless East Wall, Lack of Social Respect, Bone / Eye Ailments',
    doshaDescription: 'Infuses missing morning solar prana into dark, closed, or suppressed East sectors.',
    materialSpec: 'Heavy Cast Antiqued Brass with 12 Sun Rays representing the 12 Adityas (9 inch dia)',
    exactPlacement: 'Center of East wall in drawing room, main entrance foyer, or executive office.',
    heightAndFacing: 'Eye Level: 5.0 to 6.0 ft from floor level, facing West.',
    installationDay: 'Sunday morning at Sunrise (Brahma Muhurat 6:00 - 7:30 AM)',
    sankalpaMantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः ॥ ॐ घृणिः सूर्याय नमः ॥',
    efficacyRating: 9.5,
    keyBenefits: [
      'Amplifies authority, leadership presence, and government relations',
      'Elevates bone density, ocular health, and vital cellular immunity',
      'Brings fame, public recognition, and broad societal goodwill'
    ],
    dosAndDonts: {
      dos: [
        'Apply a small dot of Kumkum / Sandalwood paste on Surya Dev’s forehead on Sundays',
        'Keep East curtains open during morning hours to receive direct photons'
      ],
      donts: [
        'Never hang on dirty storage walls or inside bedroom behind bed headboards',
        'Do not hang near dark black/charcoal paint'
      ]
    },
    visualDiagramType: 'wall_yantra'
  },
  {
    id: 'rem-se-copper-strip',
    title: 'Pure Electrolytic Copper Threshold Strip',
    sanskritName: 'अग्नि तत्व शुद्ध तांबा देहरी पट्टी',
    direction: 'SE',
    directionLabel: 'South-East (आग्नेय कोण)',
    element: 'Fire',
    category: 'metal_strips',
    categoryLabel: 'Metal Strips & Energy Cutters',
    placementType: 'Threshold Floor Embed',
    doshaTarget: 'Main Door in South-East, Water Sink near Stove, Agni Dosha, Kitchen Defect',
    doshaDescription: 'Regulates volatile Agni fire energy and shields the home from sudden expenses.',
    materialSpec: '99.9% Pure Electrolytic Oxygen-Free Copper Strip (4mm thickness x 30mm width)',
    exactPlacement: 'Embedded across the floor threshold of the South-East doorway or kitchen sill.',
    heightAndFacing: 'Flush with floor tile level across entire doorway opening span.',
    installationDay: 'Tuesday or Friday morning during Mars / Venus Hora',
    sankalpaMantra: 'ॐ शुं शुक्राय नमः ॥ ॐ अग्नये नमः स्वाहा ॥',
    efficacyRating: 9.8,
    keyBenefits: [
      'Prevents domestic temper flares, high BP, and sudden hospital bills',
      'Stabilizes feminine health and reproductive vitality for women',
      'Guards liquid cash reserves against unexpected cash outflows'
    ],
    dosAndDonts: {
      dos: [
        'Ensure copper metal is completely clean and untarnished before embedding',
        'Pair with a small Copper Agni Swastika above the door frame'
      ],
      donts: [
        'Do not clean with harsh chemical acids that corrode pure copper',
        'Never use aluminum or iron strips in South-East Agni corner'
      ]
    },
    visualDiagramType: 'threshold_strip'
  },
  {
    id: 'rem-se-copper-pyramid',
    title: 'Energized Copper Agni Helix & Pyramid Cluster',
    sanskritName: 'आग्नेय तांबा हेलिक्स एवं अग्नि पिरामिड',
    direction: 'SE',
    directionLabel: 'South-East (आग्नेय कोण)',
    element: 'Fire',
    category: 'pyramids',
    categoryLabel: 'Pyramids & Helixes',
    placementType: 'Corner Energy Node',
    doshaTarget: 'Missing South-East Corner, Extended East-North, Electric Tripping & Low Cash',
    doshaDescription: 'Synthesizes artificial fire vibrations to reactivate sluggish cash generation.',
    materialSpec: 'Solid Pure Copper Spiral Helix (3 rounds) + Tri-tier Copper Pyramid Block',
    exactPlacement: 'South-East corner ceiling joint or concealed above false ceiling corner.',
    heightAndFacing: 'Mounted near ceiling (7 to 8 ft) or placed on top of kitchen upper cabinets.',
    installationDay: 'Tuesday or Friday during Shukla Paksha',
    sankalpaMantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः ॥ ॐ वैश्वानराय नमः ॥',
    efficacyRating: 9.4,
    keyBenefits: [
      'Restores active entrepreneurial drive and swift sales closures',
      'Balances fire and electricity dynamics in modern corporate kitchens',
      'Remedies structural cut or extension in Agneya zone'
    ],
    dosAndDonts: {
      dos: [
        'Place alongside warm terracotta, coral, or salmon peach accent colors',
        'Ensure spiral faces clockwise downward to disperse grounded fire'
      ],
      donts: [
        'Keep at least 6 feet away from water purifiers or wash basins',
        'Avoid blue and black objects in the immediate 3-foot radius'
      ]
    },
    visualDiagramType: 'helix_anchor'
  },
  {
    id: 'rem-s-red-jasper-pyramids',
    title: 'Red Jasper & Carnelian Grounding Crystal Grid',
    sanskritName: 'दक्षिण मंगल रक्तमणि एवं कार्नेलियन ग्रिड',
    direction: 'S',
    directionLabel: 'South (दक्षिण दिशा)',
    element: 'Fire',
    category: 'crystals',
    categoryLabel: 'Crystals & Minerals',
    placementType: 'Corner Energy Node',
    doshaTarget: 'Low South Wall, South-facing Balcony Depressions, Legal Hassles & Insomnia',
    doshaDescription: 'Provides dense mineral grounding to strengthen Mars protection against disputes.',
    materialSpec: 'Natural Grade-A Red Jasper Polished Spheres + Carnelian Pyramid Center (500g)',
    exactPlacement: 'South wall credenza, bedroom side console, or legal archives desk.',
    heightAndFacing: 'Tabletop height (2.5 to 3.5 ft) placed in South or South-South-East sector.',
    installationDay: 'Tuesday morning during Mars Hora (6:00 - 7:30 AM)',
    sankalpaMantra: 'ॐ धरणीगर्भसंभूतं विद्युत्कान्तिसमप्रभम् । कुमारं शक्तिहस्तं च मङ्गलं प्रणमाम्यहम् ॥',
    efficacyRating: 9.3,
    keyBenefits: [
      'Builds unwavering physical stamina and legal courtroom resilience',
      'Grounds restless thoughts for deep restorative delta sleep',
      'Protects property titles and real estate land investments'
    ],
    dosAndDonts: {
      dos: [
        'Recharge monthly under the warmth of midday Tuesday sunlight',
        'Cleanse gently with sea salt water and dry thoroughly'
      ],
      donts: [
        'Do not drop on hard tile surfaces to prevent mineral cleavage',
        'Avoid pairing with cool blue aquamarine or water elements'
      ]
    },
    visualDiagramType: 'crystal_grid'
  },
  {
    id: 'rem-sw-lead-pyramids',
    title: 'Solid Lead Pyramids & Brass Earth Helixes',
    sanskritName: 'नैऋत्य शुद्ध सीसा (लेड) पिरामिड एवं पीतल कुण्डली',
    direction: 'SW',
    directionLabel: 'South-West (नैऋत्य कोण)',
    element: 'Earth',
    category: 'pyramids',
    categoryLabel: 'Pyramids & Helixes',
    placementType: 'Threshold Floor Embed',
    doshaTarget: 'SW Main Door, SW Cut, SW Underground Water Tank/Borewell, Relationship Rift',
    doshaDescription: 'The supreme non-demolition cure for severe South-West stability leaks and Rahu defects.',
    materialSpec: '99.9% High-Density Virgin Cast Lead Pyramids (3 pieces) + Heavy Brass Helixes (3 pieces)',
    exactPlacement: 'Embedded 2 inches below SW threshold or placed in heavy corners of master bedroom.',
    heightAndFacing: 'Sub-floor level or lowermost shelf/bottom of wardrobe in South-West.',
    installationDay: 'Saturday morning during Saturn Hora (7:00 - 8:30 AM) or Amavasya evening',
    sankalpaMantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः ॥ ॐ कूर्माय नमः ॥',
    efficacyRating: 9.9,
    keyBenefits: [
      'Anchors master of the house authority and prevents sudden relationship divorce/splits',
      'Acts as an impenetrable earth shield against chronic financial drain',
      'Neutralizes fatal underground water sumps in South-West corner'
    ],
    dosAndDonts: {
      dos: [
        'Embed lead inside waterproof sealant so lead does not contact skin during cleaning',
        'Pair with heavy yellow Jaisalmer marble or solid teak furniture'
      ],
      donts: [
        'Never place lead in North or North-East quadrants (causes severe head heaviness)',
        'Never drill or burn lead inside living quarters'
      ]
    },
    visualDiagramType: 'lead_block'
  },
  {
    id: 'rem-sw-brass-elephants',
    title: 'Solid Brass Royal Elephant Pair (Gaja Yugma)',
    sanskritName: 'अष्टधातु ठोस गज-युग्म (स्थिरता रक्षक)',
    direction: 'SW',
    directionLabel: 'South-West (नैऋत्य कोण)',
    element: 'Earth',
    category: 'yantras',
    categoryLabel: 'Sacred Yantra & Idols',
    placementType: 'Corner Energy Node',
    doshaTarget: 'Low SW Boundary, Unstable Career, Lack of Patriarch Authority',
    doshaDescription: 'Provides symbolic and gravitational mass to stabilize patriarch decision power.',
    materialSpec: 'Solid Cast Heavy Brass (Trunks raised upward in triumph, 2.5 kg weight pair)',
    exactPlacement: 'South-West corner console in master bedroom or CEO executive cabin.',
    heightAndFacing: 'Height: 3.0 to 4.5 ft. Elephants facing into the room towards North-East.',
    installationDay: 'Thursday or Saturday morning',
    sankalpaMantra: 'ॐ श्रीं ह्रीं क्लीं ग्लौं गं गणपतये वर वरद सर्वजनं मे वशमानय स्वाहा ॥',
    efficacyRating: 9.6,
    keyBenefits: [
      'Fortifies family unity and prevents impulsive destructive decisions',
      'Attracts institutional funding and long-term corporate stability',
      'Grounds fluctuating emotions and mitigates Rahu restlessness'
    ],
    dosAndDonts: {
      dos: [
        'Keep trunks pointed upward to signify continuous accumulation of wisdom',
        'Wipe with soft cotton cloth and natural brass polish once a month'
      ],
      donts: [
        'Never face elephants directly towards an exit door or bathroom',
        'Avoid lightweight hollow plastic or resin replicas'
      ]
    },
    visualDiagramType: 'corner_pyramid'
  },
  {
    id: 'rem-w-brass-tortoise',
    title: 'Heavy Brass Kurma (Tortoise) in Plate',
    sanskritName: 'वरुण देव पीतल कूर्म चक्र एवं जल आधार',
    direction: 'W',
    directionLabel: 'West (पश्चिम दिशा)',
    element: 'Space',
    category: 'yantras',
    categoryLabel: 'Sacred Yantra & Idols',
    placementType: 'Wall Mount (Eye Level)',
    doshaTarget: 'West Cut, Downward Slope to West, Business Profit Losses, Saturn Pitra Affliction',
    doshaDescription: 'Captures and retains profit margins from hard labor, converting work into solid equity.',
    materialSpec: 'Solid Brass Engraved Kurma with Sri Yantra on Back + Brass Plate (1 kg)',
    exactPlacement: 'West zone dining table, accounts cabin, or children’s study library desk.',
    heightAndFacing: 'Tabletop height (2.5 to 3.5 ft). Tortoise head facing East inside the house.',
    installationDay: 'Saturday morning during Saturn Hora or Pushya Nakshatra',
    sankalpaMantra: 'ॐ शं शनैश्चराय नमः ॥ ॐ वरुणाय नमः ॥',
    efficacyRating: 9.7,
    keyBenefits: [
      'Ensures steady retained business profits, dividends, and royalties',
      'Enhances children’s academic discipline and concentration endurance',
      'Provides lifelong physical longevity and spinal joint health'
    ],
    dosAndDonts: {
      dos: [
        'Add a small amount of clean water to the plate so the tortoise feet are immersed',
        'Face the head inwards to invite wealth into the core of the dwelling'
      ],
      donts: [
        'Never point the tortoise head towards the outside entrance or windows',
        'Do not place in kitchen or directly inside master bedroom'
      ]
    },
    visualDiagramType: 'water_urn'
  },
  {
    id: 'rem-nw-wind-chime',
    title: '5-Rod Tuned Metallic Wind Chime & Selenite Lamp',
    sanskritName: 'वायव्य पञ्च-धातु मन्द मारुत घण्टा एवं चन्द्र शिला',
    direction: 'NW',
    directionLabel: 'North-West (वायव्य कोण)',
    element: 'Air',
    category: 'crystals',
    categoryLabel: 'Crystals & Minerals',
    placementType: 'Window / Balcony',
    doshaTarget: 'NW Cut, Heavy Storage in NW, Stagnant Inventory, Delayed Marriage for Youth',
    doshaDescription: 'Stimulates healthy dynamic air vectors to move stalled deals and marriage alliances.',
    materialSpec: '5 Hollow Brass/Aluminium Alloy Acoustic Tubes (tuned to 432Hz) + Pure Moroccan Selenite Tower',
    exactPlacement: 'Hung near the North-West window, balcony breeze path, or guest room entrance.',
    heightAndFacing: 'Hung from ceiling so bottom clapper is at 6.0 to 6.5 ft height.',
    installationDay: 'Monday evening during Moon Hora at sunset (Shuklapaksha)',
    sankalpaMantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः ॥ ॐ वायवे नमः ॥',
    efficacyRating: 9.5,
    keyBenefits: [
      'Accelerates sales of slow-moving inventory and real estate listings',
      'Resolves delays in marriage proposals for eligible daughters/sons',
      'Improves international business travel, visa approvals, and support from friends'
    ],
    dosAndDonts: {
      dos: [
        'Ensure natural air breeze catches the wooden clapper to create resonant chimes',
        'Turn on the warm Selenite crystal lamp in the evening to soothe mental anxiety'
      ],
      donts: [
        'Never hang directly above where people sit or sleep for long hours',
        'Avoid 4 or 6 rod chimes (always use 5 metal rods in NW Vayu zone)'
      ]
    },
    visualDiagramType: 'chime_air'
  },
  {
    id: 'rem-center-brahmasthan-crystals',
    title: 'Sacred Brahmasthan Natural Quartz Geo-Cluster',
    sanskritName: 'ब्रह्मस्थान स्फटिक एवं प्राकृतिक ऊर्जा चक्र',
    direction: 'CENTER',
    directionLabel: 'Brahmasthan (ब्रह्मस्थान)',
    element: 'Space',
    category: 'crystals',
    categoryLabel: 'Crystals & Minerals',
    placementType: 'Centroid Space',
    doshaTarget: 'Pillars/Beams in Center of House, Heavy Staircase, Dark Depressed Brahmasthan',
    doshaDescription: 'Disperses heavy overhead load pressure and illuminates the cosmic centroid axis.',
    materialSpec: 'Multi-faceted Natural Himalayan Clear Quartz Geode with Brass Energy Stand',
    exactPlacement: 'Central living lobby or mounted in ceiling soffit directly below central beam.',
    heightAndFacing: 'Center point of the house, placed on a central decorative table or ceiling cove.',
    installationDay: 'Thursday or Full Moon (Purnima) evening at Twilight',
    sankalpaMantra: 'ॐ ब्रह्मणे नमः ॥ ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि तन्नो रुद्रः प्रचोदयात् ॥',
    efficacyRating: 9.8,
    keyBenefits: [
      'Balances Pranic pressure across all 8 cardinal & diagonal zones simultaneously',
      'Mitigates severe health issues caused by load-bearing pillars in the center',
      'Instills radiant peaceful atmosphere and heart chakra harmony for family'
    ],
    dosAndDonts: {
      dos: [
        'Keep the central floor area around the crystal spotless and brightly illuminated',
        'Smudge monthly with natural Frankincense (Guggul/Loban) resin'
      ],
      donts: [
        'Never place heavy iron safes or concrete flower planters on the exact center point',
        'Avoid drilling deep holes into the central matrix'
      ]
    },
    visualDiagramType: 'brahmasthan_crystal'
  }
];

interface VastuRemedyGalleryProps {
  onBookConsultation?: (serviceId?: string) => void;
}

export const VastuRemedyGallery: React.FC<VastuRemedyGalleryProps> = ({ onBookConsultation }) => {
  const [selectedDirection, setSelectedDirection] = useState<DirectionFilter>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<VastuRemedyCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRemedyModal, setActiveRemedyModal] = useState<VastuRemedyItem | null>(null);

  const directionTabs: { key: DirectionFilter; label: string; hindi: string }[] = [
    { key: 'ALL', label: 'All Directions', hindi: 'सभी दिशाएं' },
    { key: 'N', label: 'North', hindi: 'उत्तर' },
    { key: 'NE', label: 'North-East', hindi: 'ईशान' },
    { key: 'E', label: 'East', hindi: 'पूर्व' },
    { key: 'SE', label: 'South-East', hindi: 'आग्नेय' },
    { key: 'S', label: 'South', hindi: 'दक्षिण' },
    { key: 'SW', label: 'South-West', hindi: 'नैऋत्य' },
    { key: 'W', label: 'West', hindi: 'पश्चिम' },
    { key: 'NW', label: 'North-West', hindi: 'वायव्य' },
    { key: 'CENTER', label: 'Brahmasthan', hindi: 'ब्रह्मस्थान' }
  ];

  const categoryPills: { key: VastuRemedyCategory; label: string }[] = [
    { key: 'all', label: 'All Remedies' },
    { key: 'metal_strips', label: 'Metal Strips & Energy Cutters' },
    { key: 'pyramids', label: 'Pyramids & Helixes' },
    { key: 'yantras', label: 'Sacred Yantras & Idols' },
    { key: 'crystals', label: 'Crystals & Natural Elements' },
    { key: 'water_plants', label: 'Sacred Water & Elements' }
  ];

  const filteredRemedies = useMemo(() => {
    return VASTU_REMEDIES_DATA.filter((item) => {
      // Direction match
      const dirMatch = selectedDirection === 'ALL' || item.direction === selectedDirection;
      // Category match
      const catMatch = selectedCategory === 'all' || item.category === selectedCategory;
      // Search query match
      const searchMatch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sanskritName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.doshaTarget.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.directionLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materialSpec.toLowerCase().includes(searchQuery.toLowerCase());

      return dirMatch && catMatch && searchMatch;
    });
  }, [selectedDirection, selectedCategory, searchQuery]);

  // Helper to render stylized SVG architectural diagram for each remedy
  const renderVisualSchematic = (remedy: VastuRemedyItem) => {
    switch (remedy.visualDiagramType) {
      case 'threshold_strip':
        return (
          <div className="relative w-full h-44 bg-[#FFF9F2] dark:bg-[#1E0601] rounded-2xl border border-orange-200 dark:border-amber-900/70 overflow-hidden flex flex-col items-center justify-center p-3 shadow-inner">
            {/* Top Room Wall & Frame */}
            <div className="w-full max-w-[220px] bg-stone-200 dark:bg-stone-800 h-7 rounded-t-lg border-b-2 border-stone-300 dark:border-stone-700 flex items-center justify-center text-[10px] font-bold text-stone-700 dark:text-stone-300">
              Outer Frame / Door Jamb
            </div>
            {/* Door Threshold with Embedded Strip */}
            <div className="w-full max-w-[220px] h-12 bg-amber-100 dark:bg-[#2A0C03] border-x-2 border-stone-400 dark:border-stone-600 relative flex items-center justify-center shadow-xs">
              <div className="absolute inset-x-2 h-4 bg-gradient-to-r from-[#EA580C] via-[#F97316] to-[#EA580C] rounded-xs shadow-md flex items-center justify-center text-white text-[9px] font-bold tracking-wider uppercase border border-amber-600">
                <span>{remedy.materialSpec.split('(')[0].trim()}</span>
              </div>
              <span className="text-[8px] text-stone-600 dark:text-amber-300 font-bold absolute -top-3">
                &darr; 3mm Flush Tile Embed &darr;
              </span>
            </div>
            {/* Inner Room Floor */}
            <div className="w-full max-w-[220px] bg-[#FFF7ED] dark:bg-[#250802] h-10 rounded-b-lg border-t-2 border-amber-300 dark:border-amber-700 flex items-center justify-center text-[10px] text-[#7C2D12] dark:text-amber-100 font-bold">
              Interior Room Space &bull; Negative Flow Blocked
            </div>
            <div className="absolute bottom-1 right-2 text-[9px] text-[#EA580C] dark:text-amber-400 font-bold">
              100% Zero-Demolition
            </div>
          </div>
        );

      case 'wall_yantra':
        return (
          <div className="relative w-full h-44 bg-[#FFF9F2] dark:bg-[#1E0601] rounded-2xl border border-orange-200 dark:border-amber-900/70 overflow-hidden flex items-center justify-center p-3 shadow-inner">
            <div className="relative w-28 h-28 bg-[#FFF7ED] dark:bg-[#250802] rounded-xl border-2 border-orange-300 dark:border-amber-800 shadow-md flex flex-col items-center justify-center text-center p-2">
              <div className="w-16 h-16 rounded-full border-2 border-[#EA580C] flex items-center justify-center bg-gradient-to-tr from-amber-100 to-orange-50 dark:from-[#350E04] dark:to-[#220701] shadow-inner">
                <Sparkles className="w-8 h-8 text-[#EA580C] dark:text-amber-400 animate-pulse" />
              </div>
              <span className="text-[9px] font-bold text-[#7C2D12] dark:text-amber-100 mt-1 line-clamp-1">
                {remedy.sanskritName.split(' ')[1] || 'Yantra'}
              </span>
            </div>
            <div className="absolute left-3 top-3 text-[9px] bg-white dark:bg-[#1A0501] border border-orange-200 dark:border-amber-800 px-2 py-0.5 rounded-md text-[#7C2D12] dark:text-amber-200 font-bold shadow-xs">
              Eye Level (5.0 - 5.5 ft)
            </div>
            <div className="absolute right-3 bottom-3 text-[9px] bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 px-2 py-0.5 rounded-md text-emerald-900 dark:text-emerald-300 font-bold">
              Facing South / West
            </div>
          </div>
        );

      case 'corner_pyramid':
      case 'lead_block':
        return (
          <div className="relative w-full h-44 bg-[#FFF9F2] dark:bg-[#1E0601] rounded-2xl border border-orange-200 dark:border-amber-900/70 overflow-hidden flex items-center justify-center p-3 shadow-inner">
            {/* 90-degree Corner Blueprint */}
            <div className="relative w-36 h-32 border-l-4 border-b-4 border-stone-400 dark:border-stone-600 bg-white/80 dark:bg-[#250802]/80 rounded-bl-xl p-3 flex flex-col justify-end">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg shadow-lg flex items-center justify-center text-white text-[10px] font-bold text-center border-2 border-amber-200">
                <Mountain className="w-6 h-6 text-white" />
              </div>
              <span className="text-[9px] text-[#7C2D12] dark:text-amber-100 font-bold mt-1">
                {remedy.directionLabel.split(' ')[0]} Corner Anchor
              </span>
            </div>
            <div className="absolute top-2 right-2 text-[9px] bg-[#FFF7ED] dark:bg-[#250802] border border-orange-200 dark:border-amber-800 px-2 py-0.5 rounded-md text-[#EA580C] dark:text-amber-300 font-bold">
              Gravitational Stabilizer
            </div>
          </div>
        );

      case 'water_urn':
        return (
          <div className="relative w-full h-44 bg-[#FFF9F2] dark:bg-[#1E0601] rounded-2xl border border-orange-200 dark:border-amber-900/70 overflow-hidden flex items-center justify-center p-3 shadow-inner">
            <div className="relative w-28 h-28 bg-gradient-to-b from-sky-50 to-amber-50 dark:from-sky-950/60 dark:to-amber-950/60 rounded-full border-2 border-sky-300 dark:border-sky-700 shadow-md flex flex-col items-center justify-center p-2">
              <div className="w-12 h-12 rounded-full bg-sky-200/60 dark:bg-sky-900/60 border border-sky-400 flex items-center justify-center text-sky-800 dark:text-sky-300 animate-pulse">
                <Sparkles className="w-6 h-6 text-sky-700 dark:text-sky-300" />
              </div>
              <span className="text-[9px] font-bold text-sky-900 dark:text-sky-200 mt-1">
                Pure Water & Quartz
              </span>
            </div>
            <div className="absolute top-3 left-3 text-[9px] bg-white dark:bg-[#1A0501] border border-sky-200 dark:border-sky-800 px-2 py-0.5 rounded-md text-sky-800 dark:text-sky-300 font-bold">
              North-East Ishan Node
            </div>
            <div className="absolute bottom-3 right-3 text-[9px] bg-amber-50 dark:bg-amber-950 border border-amber-300 dark:border-amber-700 px-2 py-0.5 rounded-md text-[#7C2D12] dark:text-amber-200 font-bold">
              Daily Water Refresh
            </div>
          </div>
        );

      case 'helix_anchor':
        return (
          <div className="relative w-full h-44 bg-[#FFF9F2] dark:bg-[#1E0601] rounded-2xl border border-orange-200 dark:border-amber-900/70 overflow-hidden flex items-center justify-center p-3 shadow-inner">
            <div className="relative w-28 h-28 bg-rose-50 dark:bg-rose-950/60 rounded-2xl border-2 border-rose-300 dark:border-rose-700 shadow-md flex flex-col items-center justify-center p-2">
              <Orbit className="w-10 h-10 text-[#EA580C] dark:text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
              <span className="text-[9px] font-bold text-rose-950 dark:text-rose-200 mt-1">
                Clockwise Agni Spiral
              </span>
            </div>
            <div className="absolute top-3 right-3 text-[9px] bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-700 px-2 py-0.5 rounded-md text-rose-900 dark:text-rose-200 font-bold">
              Ceiling / Upper Cabinet
            </div>
          </div>
        );

      case 'chime_air':
        return (
          <div className="relative w-full h-44 bg-[#FFF9F2] dark:bg-[#1E0601] rounded-2xl border border-orange-200 dark:border-amber-900/70 overflow-hidden flex items-center justify-center p-3 shadow-inner">
            <div className="flex items-center gap-1.5 bg-white dark:bg-[#1A0501] border border-orange-200 dark:border-amber-800 p-3 rounded-2xl shadow-md">
              <div className="w-2 h-16 bg-amber-300 rounded-full" />
              <div className="w-2 h-20 bg-amber-400 rounded-full" />
              <div className="w-2 h-24 bg-[#EA580C] rounded-full" />
              <div className="w-2 h-18 bg-amber-400 rounded-full" />
              <div className="w-2 h-14 bg-amber-300 rounded-full" />
            </div>
            <div className="absolute top-3 left-3 text-[9px] bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded-md text-indigo-900 dark:text-indigo-200 font-bold">
              5-Rod 432Hz Harmonic
            </div>
            <div className="absolute bottom-3 right-3 text-[9px] bg-white dark:bg-[#1A0501] border border-orange-200 dark:border-amber-800 px-2 py-0.5 rounded-md text-[#7C2D12] dark:text-amber-200 font-bold">
              Breeze Window Path
            </div>
          </div>
        );

      default:
        return (
          <div className="relative w-full h-44 bg-[#FFF9F2] dark:bg-[#1E0601] rounded-2xl border border-orange-200 dark:border-amber-900/70 overflow-hidden flex items-center justify-center p-3 shadow-inner">
            <div className="w-24 h-24 rounded-2xl bg-amber-100 dark:bg-amber-950 border-2 border-[#EA580C] flex flex-col items-center justify-center text-center p-2 shadow-md">
              <Sparkles className="w-8 h-8 text-[#EA580C] dark:text-amber-400 mb-1" />
              <span className="text-[9px] font-bold text-[#7C2D12] dark:text-amber-100">
                Vedic Harmonizer
              </span>
            </div>
            <div className="absolute bottom-2 right-2 text-[9px] text-[#EA580C] dark:text-amber-400 font-bold">
              Canonical Placement
            </div>
          </div>
        );
    }
  };

  return (
    <div id="vastu-remedy-gallery" className="my-16 bg-white dark:bg-[#1A0501] rounded-3xl border border-orange-200 dark:border-amber-900/80 p-5 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EA580C]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
        <div className="inline-flex items-center gap-1.5 border border-orange-300 dark:border-amber-800 bg-[#FFF9F2] dark:bg-[#250802] px-3.5 py-1 rounded-full text-[11px] font-bold text-[#EA580C] dark:text-amber-300 tracking-[0.16em] uppercase mb-3 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Non-Demolition Vastu Remedy Visual Gallery</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[#7C2D12] dark:text-amber-100">
          Directional Remedies & Placement Guides
        </h3>
        <p className="text-[#9A3412] dark:text-amber-200/90 mt-2 text-xs sm:text-sm font-normal max-w-2xl mx-auto leading-relaxed">
          Explore Dr. Preeti Sehgal's classical Vedic non-demolition remedies. Select your specific home direction or remedy type to inspect high-resolution placement schematics, height requirements, orientation rules, and installation mantras.
        </p>
      </div>

      {/* Filter Section 1: Direction Filter Carousel */}
      <div className="mb-6 relative z-10">
        <div className="flex items-center justify-between gap-2 mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#7C2D12] dark:text-amber-200 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Filter by Target Direction:</span>
          </label>
          <span className="text-[11px] text-[#9A3412] dark:text-amber-300/80 font-bold">
            Showing {filteredRemedies.length} Prescriptions
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {directionTabs.map((tab) => {
            const isSelected = selectedDirection === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                id={`btn-filter-dir-${tab.key.toLowerCase()}`}
                onClick={() => setSelectedDirection(tab.key)}
                className={`py-2 px-3.5 rounded-xl border text-xs whitespace-nowrap font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-md ring-2 ring-amber-300'
                    : 'bg-[#FFF9F2] dark:bg-[#250802] text-[#7C2D12] dark:text-amber-200 border-orange-200 dark:border-amber-900/70 hover:border-[#EA580C] hover:bg-[#FFF2E2] dark:hover:bg-[#340c04]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-[#9A3412] dark:text-amber-300/80'}`}>
                  ({tab.hindi})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Section 2: Remedy Type & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-[#FFF7ED] dark:bg-[#250802] p-3.5 rounded-2xl border border-orange-200 dark:border-amber-900/70 relative z-10">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-[#EA580C] shrink-0 ml-1 mr-0.5" />
          {categoryPills.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`py-1 px-3 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer font-semibold ${
                  isSelected
                    ? 'bg-[#EA580C] text-white font-bold shadow-xs ring-2 ring-amber-300'
                    : 'bg-white dark:bg-[#1E0601] text-[#7C2D12] dark:text-amber-200 border border-orange-200 dark:border-amber-900/60 hover:bg-orange-50 dark:hover:bg-[#2c0b03]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[220px] sm:min-w-[260px]">
          <Search className="w-3.5 h-3.5 text-[#EA580C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by defect or remedy..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#1E0601] border border-orange-200 dark:border-amber-900/70 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#7C2D12] dark:text-amber-100 placeholder:text-stone-400 dark:placeholder:text-amber-400/50 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {filteredRemedies.length === 0 ? (
        <div className="text-center py-16 bg-[#FFF9F2] dark:bg-[#200601] rounded-2xl border border-orange-200 dark:border-amber-900/70">
          <Compass className="w-10 h-10 text-orange-300 dark:text-amber-700 mx-auto mb-2" />
          <h4 className="font-playfair font-bold text-lg text-[#7C2D12] dark:text-amber-100">No Specific Remedies Found</h4>
          <p className="text-xs text-[#9A3412] dark:text-amber-300/80 mt-1 max-w-sm mx-auto">
            Try resetting your search query or direction filter to view universal Vastu rectifiers.
          </p>
          <button
            onClick={() => {
              setSelectedDirection('ALL');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 inline-flex items-center gap-1.5 bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer shadow-md"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredRemedies.map((remedy) => (
            <motion.div
              key={remedy.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-[#FFFDF9] dark:bg-[#200601] rounded-2xl border border-orange-200 dark:border-amber-900/70 hover:border-[#EA580C] dark:hover:border-amber-600 transition-all shadow-md hover:shadow-xl flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Blueprint Diagram Area */}
                <div className="p-3 pb-0 relative">
                  {renderVisualSchematic(remedy)}

                  {/* Top Badges */}
                  <div className="absolute top-5 left-5 flex items-center gap-1.5">
                    <span className="bg-[#7C2D12] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {remedy.directionLabel.split(' ')[0]}
                    </span>
                    <span className="bg-white/95 dark:bg-[#1A0501]/95 backdrop-blur-xs text-[#EA580C] dark:text-amber-300 border border-orange-300 dark:border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {remedy.placementType}
                    </span>
                  </div>

                  <div className="absolute top-5 right-5">
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {remedy.efficacyRating}/10
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5">
                  <div className="mb-2">
                    <span className="text-[10px] font-bold text-[#EA580C] dark:text-amber-400 uppercase tracking-wider block">
                      {remedy.sanskritName}
                    </span>
                    <h4 className="font-playfair font-bold text-base sm:text-lg text-[#7C2D12] dark:text-amber-100 group-hover:text-[#EA580C] dark:group-hover:text-amber-300 transition-colors line-clamp-1">
                      {remedy.title}
                    </h4>
                  </div>

                  {/* Targeted Defect Pill */}
                  <div className="bg-[#FFF7ED] dark:bg-[#250802] p-2.5 rounded-xl border border-orange-200 dark:border-amber-900/70 mb-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 text-[11px] font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span className="line-clamp-1">Target: {remedy.doshaTarget}</span>
                    </div>
                    <p className="text-[11px] text-[#7C2D12] dark:text-amber-100/90 font-normal line-clamp-2 leading-relaxed">
                      {remedy.doshaDescription}
                    </p>
                  </div>

                  {/* Placement Specs Quick Summary */}
                  <div className="space-y-1 text-xs text-[#9A3412] dark:text-amber-300/80 mb-3">
                    <div className="flex items-start gap-1.5">
                      <strong className="text-[#7C2D12] dark:text-amber-200 shrink-0 text-[11px]">Material:</strong>
                      <span className="line-clamp-1 text-[11px] font-normal">{remedy.materialSpec}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <strong className="text-[#7C2D12] dark:text-amber-200 shrink-0 text-[11px]">Position:</strong>
                      <span className="line-clamp-1 text-[11px] font-normal">{remedy.heightAndFacing}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 pt-0 border-t border-orange-100 dark:border-amber-900/50 flex items-center justify-between gap-2 mt-auto">
                <button
                  type="button"
                  id={`btn-inspect-remedy-${remedy.id}`}
                  onClick={() => setActiveRemedyModal(remedy)}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-[#FFF9F2] dark:bg-[#250802] hover:bg-[#EA580C] text-[#7C2D12] dark:text-amber-200 hover:text-white border border-orange-200 dark:border-amber-900/70 hover:border-[#EA580C] py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Full Placement Blueprint</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Interactive Modal / Detailed Blueprint Inspector */}
      <AnimatePresence>
        {activeRemedyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#1A0501] rounded-3xl border border-orange-200 dark:border-amber-900/80 shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 relative text-[#7C2D12] dark:text-amber-100"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveRemedyModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#FFF9F2] dark:bg-[#250802] hover:bg-orange-100 dark:hover:bg-[#340C04] text-[#7C2D12] dark:text-amber-100 border border-orange-200 dark:border-amber-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 pr-8">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="bg-[#7C2D12] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {activeRemedyModal.directionLabel}
                  </span>
                  <span className="bg-[#FFF7ED] dark:bg-[#250802] text-[#EA580C] dark:text-amber-300 border border-orange-300 dark:border-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {activeRemedyModal.placementType}
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    Efficacy: {activeRemedyModal.efficacyRating}/10
                  </span>
                </div>
                <h3 className="font-playfair font-bold text-xl sm:text-2xl text-[#7C2D12] dark:text-amber-100">
                  {activeRemedyModal.title}
                </h3>
                <span className="text-xs text-[#EA580C] dark:text-amber-400 font-bold block mt-0.5">
                  {activeRemedyModal.sanskritName}
                </span>
              </div>

              {/* Large Visual Blueprint Schematic */}
              <div className="mb-6">
                <label className="text-xs font-bold uppercase tracking-wider text-[#9A3412] dark:text-amber-300 block mb-2">
                  Architectural Placement Diagram & Alignment
                </label>
                {renderVisualSchematic(activeRemedyModal)}
              </div>

              {/* Blueprint Detailed Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#FFF7ED] dark:bg-[#250802] p-4 rounded-2xl border border-orange-200 dark:border-amber-900/70 space-y-1.5">
                  <span className="text-[11px] uppercase font-bold text-[#EA580C] dark:text-amber-400 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Exact Spatial Coordinates</span>
                  </span>
                  <p className="text-xs text-[#7C2D12] dark:text-amber-100 font-normal leading-relaxed">
                    {activeRemedyModal.exactPlacement}
                  </p>
                </div>

                <div className="bg-[#FFF7ED] dark:bg-[#250802] p-4 rounded-2xl border border-orange-200 dark:border-amber-900/70 space-y-1.5">
                  <span className="text-[11px] uppercase font-bold text-[#EA580C] dark:text-amber-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Height & Orientation Facing</span>
                  </span>
                  <p className="text-xs text-[#7C2D12] dark:text-amber-100 font-normal leading-relaxed">
                    {activeRemedyModal.heightAndFacing}
                  </p>
                </div>

                <div className="bg-[#FFF7ED] dark:bg-[#250802] p-4 rounded-2xl border border-orange-200 dark:border-amber-900/70 space-y-1.5">
                  <span className="text-[11px] uppercase font-bold text-[#EA580C] dark:text-amber-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Auspicious Muhurat & Day</span>
                  </span>
                  <p className="text-xs text-[#7C2D12] dark:text-amber-100 font-normal leading-relaxed">
                    {activeRemedyModal.installationDay}
                  </p>
                </div>

                <div className="bg-[#FFF7ED] dark:bg-[#250802] p-4 rounded-2xl border border-orange-200 dark:border-amber-900/70 space-y-1.5">
                  <span className="text-[11px] uppercase font-bold text-[#EA580C] dark:text-amber-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Material Specification</span>
                  </span>
                  <p className="text-xs text-[#7C2D12] dark:text-amber-100 font-normal leading-relaxed">
                    {activeRemedyModal.materialSpec}
                  </p>
                </div>
              </div>

              {/* Installation Sankalpa Mantra Box */}
              <div className="bg-[#FFF9F2] dark:bg-[#250802] p-4 rounded-2xl border border-orange-300 dark:border-amber-800 mb-6 text-center space-y-1.5">
                <span className="text-[11px] uppercase font-bold text-[#EA580C] dark:text-amber-400 tracking-wider block">
                  Vedic Consecration (प्राण प्रतिष्ठा संकल्प मन्त्र)
                </span>
                <p className="font-playfair font-bold text-sm text-[#7C2D12] dark:text-amber-100 leading-relaxed">
                  {activeRemedyModal.sankalpaMantra}
                </p>
                <span className="text-[10px] text-[#9A3412] dark:text-amber-300/80 italic block">
                  Chant 11 or 21 times while holding or consecrating the remedy in position.
                </span>
              </div>

              {/* Do's and Don'ts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-50/80 dark:bg-[#062010] p-4 rounded-2xl border border-emerald-300 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Mandatory Best Practices (शुभ नियम)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-100">
                    {activeRemedyModal.dosAndDonts.dos.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/80 dark:bg-[#25080a] p-4 rounded-2xl border border-rose-300 dark:border-rose-800 space-y-2">
                  <div className="flex items-center gap-1.5 text-rose-900 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>Strict Prohibitions (निषेध)</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-rose-950 dark:text-rose-100">
                    {activeRemedyModal.dosAndDonts.donts.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold mr-1">&times;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Bottom CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-orange-200 dark:border-amber-900/70">
                <div className="text-xs text-[#9A3412] dark:text-amber-300/80 text-center sm:text-left">
                  Need customized energy mapping or on-site consecrated remedy delivery?
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveRemedyModal(null);
                    if (onBookConsultation) onBookConsultation('vastu-shastra');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs tracking-wider uppercase px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Consult Dr. Preeti Sehgal</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
