import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DoorOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  Info, 
  ArrowRight,
  Flame,
  Wind,
  Mountain,
  Compass,
  Zap,
  HelpCircle
} from 'lucide-react';

export type EntranceDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export interface ZoneEvaluation {
  id: string;
  name: string;
  hindiName: string;
  directionKey: string;
  gridRow: number; // 1, 2, 3
  gridCol: number; // 1, 2, 3
  element: 'Water' | 'Air' | 'Fire' | 'Earth' | 'Space';
  status: 'best' | 'favorable' | 'challenging' | 'sacred_center';
  idealFor: string;
  avoid: string;
  remedyTip: string;
  explanation: string;
}

interface EntranceProfile {
  key: EntranceDirection;
  label: string;
  hindiLabel: string;
  ruler: string;
  element: string;
  score: number; // out of 10
  ratingLabel: string;
  archetype: string;
  description: string;
  thresholdRemedy: string;
  bestZonesList: string[];
  challengingZonesList: string[];
  zoneEvaluations: Record<string, Omit<ZoneEvaluation, 'id' | 'name' | 'hindiName' | 'directionKey' | 'gridRow' | 'gridCol' | 'element'>>;
}

export const ENTRANCE_PROFILES: Record<EntranceDirection, EntranceProfile> = {
  N: {
    key: 'N',
    label: 'North',
    hindiLabel: 'उत्तर दिशा (कुबेर द्वार)',
    ruler: 'Lord Kuber & Mercury (बुध)',
    element: 'Water (जल तत्व)',
    score: 9.6,
    ratingLabel: 'Highly Auspicious (अति शुभ)',
    archetype: 'Abundance, Career Inflow & Financial Liquidity',
    description: 'North entrance is ruled by Lord Kuber and brings perennial wealth opportunities, business expansion, and high client flow. Energy enters with smooth, cooling geomagnetic currents.',
    thresholdRemedy: 'Keep the threshold clean and uncluttered. Mount a Brass Kuber Yantra inside above the door frame and place a green leafy plant (or jade plant) in a green pot nearby.',
    bestZonesList: ['North (Wealth & Entry)', 'North-East (Wisdom & Mandir)', 'East (Social Networks)', 'West (Gains Realization)'],
    challengingZonesList: ['South-West (Keep Heavy & Closed)', 'South-East (Kitchen only, avoid water)'],
    zoneEvaluations: {
      NW: {
        status: 'favorable',
        idealFor: 'Guest Bedroom, Finished Goods, Dynamic Travel Desk',
        avoid: 'Master Bedroom for head of family, heavy immovable clutter',
        remedyTip: 'Hang a 5-rod metal wind chime to harmonize air vectors.',
        explanation: 'Favorable air circulation zone. Encourages healthy movement of visitors and quick sales turnaround.'
      },
      N: {
        status: 'best',
        idealFor: 'Main Entrance Door, Living Room, Financial Treasury Desk',
        avoid: 'Toilets, Heavy concrete storage walls, Red/pink wall paint',
        remedyTip: 'Place a brass Kuber Yantra or lush money plant in green pot.',
        explanation: 'Prime inflow gateway. Maximizes Kuber wealth frequencies and career promotions.'
      },
      NE: {
        status: 'best',
        idealFor: 'Pooja Mandir, Meditation Altar, Underground Water Sump',
        avoid: 'Toilets, Kitchen/Stove, Heavy staircases, Clutter',
        remedyTip: 'Keep a clean brass bowl filled with fresh water and flowers.',
        explanation: 'Sacred Ishan zone. Channels divine wisdom, intellectual clarity, and holistic tranquility.'
      },
      W: {
        status: 'best',
        idealFor: 'Dining Room, Children Study Space, Profit & Gains Safe',
        avoid: 'Downhill water slope to West, large exposed balconies',
        remedyTip: 'Use pearl white or royal navy tones with metallic art.',
        explanation: 'Zone of Saturn (Lord Varuna). Solidifies long-term profits and academic concentration.'
      },
      CENTER: {
        status: 'sacred_center',
        idealFor: 'Open Courtyard, Light Flooring, Family Gathering Space',
        avoid: 'Heavy pillars, Staircases, Toilets, Beams, Underground tanks',
        remedyTip: 'Keep central floor unobstructed and well illuminated.',
        explanation: 'Brahmasthan (Cosmic Centroid). Distributes Prana energy evenly throughout the home.'
      },
      E: {
        status: 'best',
        idealFor: 'Living Room, Main Balcony, Social Networking Area, Study',
        avoid: 'High boundary wall blocking morning sunlight, Septic tanks',
        remedyTip: 'Mount an energized glowing brass Sun emblem on East wall.',
        explanation: 'Indra & Surya zone. Fosters social respect, government alliances, and radiant health.'
      },
      SW: {
        status: 'challenging',
        idealFor: 'Master Bedroom (Head to South), Heavy Wardrobes, Iron Safe',
        avoid: 'Main Entrance, Underground water sump, Borewell, Mandir',
        remedyTip: 'Place heavy solid brass statues, lead pyramids, or yellow marble.',
        explanation: 'Earth & Stability zone. Must remain heavy and enclosed to retain incoming North wealth.'
      },
      S: {
        status: 'favorable',
        idealFor: 'Elder Bedroom, Restful Sleep Chamber, Heavy Storage',
        avoid: 'Open slopes, underground water storage',
        remedyTip: 'Use terracotta or warm crimson accents with heavy drapes.',
        explanation: 'Mars energy zone. Best kept grounded for stamina and deep undisturbed sleep.'
      },
      SE: {
        status: 'challenging',
        idealFor: 'Kitchen (Cook facing East), Inverter, Electrical Panel',
        avoid: 'Underground water tanks, Borewell, Master bedroom, Mirrors',
        remedyTip: 'Burn a pure copper diya at sunset; place carnelian crystals.',
        explanation: 'Agni Fire zone. Ensure kitchen is placed here so water inflow from North is not clashed.'
      }
    }
  },
  NE: {
    key: 'NE',
    label: 'North-East',
    hindiLabel: 'ईशान कोण (देव द्वार)',
    ruler: 'Lord Shiva & Jupiter (गुरु)',
    element: 'Water / Divine (ईशान तत्व)',
    score: 9.8,
    ratingLabel: 'Supreme Auspicious (परम शुभ)',
    archetype: 'Spiritual Enlightenment, High Intellect & Cosmic Grace',
    description: 'The highest vibration entrance in classical Vedic Vastu. It welcomes Ishanya cosmic frequencies, bestowing pure mental clarity, spiritual upliftment, health, and progeny prosperity.',
    thresholdRemedy: 'Adorn threshold with sacred Swastika or Om in pure brass/sandalwood. Keep a copper vessel with sacred water at the entrance and ensure zero footwear clutter around the door.',
    bestZonesList: ['North-East (Entrance & Mandir)', 'North (Treasury)', 'East (Morning Sunlight)', 'South-West (Master Suite)'],
    challengingZonesList: ['South-West (Never keep light/open)', 'South-East (Strictly kitchen only)'],
    zoneEvaluations: {
      NW: {
        status: 'favorable',
        idealFor: 'Guest Room, Fast-moving goods, Reading lounge',
        avoid: 'Heavy immovable junk, Master suite',
        remedyTip: 'Use light pearl white or silver color schemes.',
        explanation: 'Harmonious air flow. Supports pleasant social guests and travel opportunities.'
      },
      N: {
        status: 'best',
        idealFor: 'Living Room, Accounts desk, Open green lawn',
        avoid: 'Red accent walls, Heavy dark storage',
        remedyTip: 'Keep North wall light with a decorative water feature or plant.',
        explanation: 'Amplifies Kuber blessings in synergy with adjacent Ishan entrance.'
      },
      NE: {
        status: 'best',
        idealFor: 'Main Door, Sacred Pooja Room, Meditation & Yoga',
        avoid: 'Toilets, Kitchen stove, Heavy shoe rack, Dark colors',
        remedyTip: 'Keep energized crystal pyramid & brass water bowl.',
        explanation: 'The supreme portal. Welcomes divine solar and magnetic energy into the core of the dwelling.'
      },
      W: {
        status: 'favorable',
        idealFor: 'Dining Hall, Study Room, Regular Bedroom',
        avoid: 'Large downward drainage slopes',
        remedyTip: 'Keep heavy walnut wooden furniture or slate blue decor.',
        explanation: 'Varuna space. Facilitates regular income realization and academic discipline.'
      },
      CENTER: {
        status: 'sacred_center',
        idealFor: 'Open Living, Skylight, Peaceful Brahmasthan',
        avoid: 'Toilets, Overhead beams, Kitchen, Clutter',
        remedyTip: 'Keep central matrix spotlessly clean and fragrant.',
        explanation: 'Allows direct transmission of Ishan energies across all other 8 quadrants.'
      },
      E: {
        status: 'best',
        idealFor: 'Drawing Room, Large Glass Windows, Study Desk',
        avoid: 'Tall opaque boundary walls blocking morning light',
        remedyTip: 'Mount a shining brass Surya idol at eye level.',
        explanation: 'Integrates high morning solar radiation for vitality and public recognition.'
      },
      SW: {
        status: 'challenging',
        idealFor: 'Master Bedroom, Patriarch Cabin, Heavy Cash Safe',
        avoid: 'Balconies, Open doors, Underground water tanks, Cut corners',
        remedyTip: 'Keep solid Jaisalmer stone or heavy brass elephant pairs.',
        explanation: 'Must be the highest and heaviest sector to ground the massive high energy entering from NE.'
      },
      S: {
        status: 'favorable',
        idealFor: 'Family Wardrobes, Restful Bed, Staircase',
        avoid: 'Water bodies or underground sumps',
        remedyTip: 'Decorate with earthy ochre or deep terracotta tones.',
        explanation: 'Mars zone. Enhances discipline, physical vitality, and deep recovery.'
      },
      SE: {
        status: 'challenging',
        idealFor: 'Kitchen Cooktop (Facing East), Inverter, Geyser',
        avoid: 'Underground water sump, Borewell, Blue/black colors',
        remedyTip: 'Install a Copper Swastika above the kitchen entrance.',
        explanation: 'Agni Fire zone. Balancing fire prevents financial burnout while safeguarding feminine health.'
      }
    }
  },
  E: {
    key: 'E',
    label: 'East',
    hindiLabel: 'पूर्व दिशा (सूर्य / इन्द्र द्वार)',
    ruler: 'Lord Indra & Sun (सूर्य देव)',
    element: 'Air / Wood / Fire (सूर्य ऊर्जा)',
    score: 9.4,
    ratingLabel: 'Highly Auspicious (अति शुभ)',
    archetype: 'Social Influence, Leadership, Vitality & Government Honor',
    description: 'East entrance harnesses the pristine morning ultraviolet rays of the rising Sun. It infuses occupants with dynamic leadership, administrative success, strong bone health, and broad networking.',
    thresholdRemedy: 'Hang a radiant Brass Surya plate above the door. Offer daily morning Arghya (water in a copper lota) to the Sun while standing at the threshold.',
    bestZonesList: ['East (Entrance & Living)', 'North-East (Meditation & Mandir)', 'North (Wealth Desk)', 'South-West (Master Suite)'],
    challengingZonesList: ['South-West (Needs heavy stabilization)', 'North-West (Guard against erratic mind)'],
    zoneEvaluations: {
      NW: {
        status: 'favorable',
        idealFor: 'Guest Room, Pantry, Marketing/Dispatch Desk',
        avoid: 'Master bedroom, Heavy clutter piles',
        remedyTip: 'Keep a natural Selenite crystal lamp or air chime.',
        explanation: 'Promotes rapid communicative speed and positive trade partnerships.'
      },
      N: {
        status: 'best',
        idealFor: 'Treasury, Study, Accounts & Planning Station',
        avoid: 'Heavy opaque blockage on North wall',
        remedyTip: 'Keep money plant in emerald green ceramic container.',
        explanation: 'Channels smooth cash flow and intellectual sharpness.'
      },
      NE: {
        status: 'best',
        idealFor: 'Pooja Room, Water fountain, Calm study corner',
        avoid: 'Kitchen, Toilets, Staircase, Inverter',
        remedyTip: 'Place a brass bowl of fresh water with fragrant petals.',
        explanation: 'Unites solar energy with pure water element for elevated consciousness.'
      },
      W: {
        status: 'favorable',
        idealFor: 'Dining Room, Study Table, Evening Sitting Area',
        avoid: 'Water sloped drainage to West',
        remedyTip: 'Use navy or silver grey cushions and steel accents.',
        explanation: 'Allows structured assimilation of day’s hard work into solid financial gains.'
      },
      CENTER: {
        status: 'sacred_center',
        idealFor: 'Open Space, Central Hall, Family Gathering',
        avoid: 'Staircase pillars, Beams, Toilets',
        remedyTip: 'Ensure bright warm white illumination.',
        explanation: 'Sacred hub distributing solar vitality throughout the residential layout.'
      },
      E: {
        status: 'best',
        idealFor: 'Main Door, Living Room, Sunlit Balcony',
        avoid: 'Septic tanks, garbage bins, opaque obstructions',
        remedyTip: 'Keep threshold wide, bright, and adorned with auspicious toran.',
        explanation: 'Sun gateway. Direct inflow of vitality, social authority, and vibrant immunity.'
      },
      SW: {
        status: 'challenging',
        idealFor: 'Master Bedroom (Head to South), Heavy Safe Vault',
        avoid: 'Open glass walls, underground water tanks, Toilets',
        remedyTip: 'Keep heavy wooden furniture and warm earth tones.',
        explanation: 'Crucial grounding zone. Stabilizes patriarch authority against external fluctuations.'
      },
      S: {
        status: 'favorable',
        idealFor: 'Bedroom, Heavy Linen Storage, Closed Wardrobes',
        avoid: 'Underground tanks or low depressions',
        remedyTip: 'Use warm rust or deep saffron accent colors.',
        explanation: 'Maintains healthy physical energy and restful deep sleep.'
      },
      SE: {
        status: 'challenging',
        idealFor: 'Kitchen (Cook facing East), Electric Meters',
        avoid: 'Water bodies, Toilets, Blue wall colors',
        remedyTip: 'Place copper strips along floor joints if displaced.',
        explanation: 'Natural kitchen zone. Maintains digestive fire and uninterrupted cash liquidity.'
      }
    }
  },
  SE: {
    key: 'SE',
    label: 'South-East',
    hindiLabel: 'आग्नेय कोण (अग्नि द्वार)',
    ruler: 'Lord Agni & Venus (शुक्र)',
    element: 'Fire (अग्नि तत्व)',
    score: 6.8,
    ratingLabel: 'Needs Balancing (सावधानी व उपाय)',
    archetype: 'Intense Fire Power, High Drive, Needs Temper & Heat Control',
    description: 'South-East entrance introduces intense Agni energy. If correctly remedied with copper strips and balancing elements, it yields fierce entrepreneurship; unharmonized, it can provoke anger or sudden expenses.',
    thresholdRemedy: 'Embed a 3-inch pure Copper Strip along the door threshold floor. Hang an energized Copper Agni Swastika on the outer door frame and keep red coral or carnelian crystals nearby.',
    bestZonesList: ['South-East (Entrance/Kitchen)', 'East (Morning Sunlight Balance)', 'South-West (Heavy Grounding Suite)'],
    challengingZonesList: ['South-East Door (Requires Copper Remedy)', 'North-East (Keep ultra-clean & watery to calm fire)', 'North (Guard against cash volatility)'],
    zoneEvaluations: {
      NW: {
        status: 'favorable',
        idealFor: 'Guest Room, Air Cooler, Dispatch Area',
        avoid: 'Heavy junk, Master Bedroom',
        remedyTip: 'Use white and cream finishes with light ventilation.',
        explanation: 'Helps channel excess fire into constructive movement and trade.'
      },
      N: {
        status: 'challenging',
        idealFor: 'Open Living Space, Mild Green Accents',
        avoid: 'Red/Orange colors on North wall (anti-element clash)',
        remedyTip: 'Place water plants in green pots to balance Agni with Mercury.',
        explanation: 'Needs calm green water balance so excess fire does not evaporate wealth opportunities.'
      },
      NE: {
        status: 'best',
        idealFor: 'Pooja Room, Water fountain, Crystal Lotus',
        avoid: 'Kitchen, Toilets, Heavy storage',
        remedyTip: 'Keep a pure brass bowl of water with white flowers to cool the home.',
        explanation: 'Essential cooling sanctuary. Counterbalances the active fire entering from South-East.'
      },
      W: {
        status: 'favorable',
        idealFor: 'Dining Room, Bookshelf, Teenagers Study',
        avoid: 'Uncovered open pits or down-slopes',
        remedyTip: 'Use metallic wall hangings and slate grey shades.',
        explanation: 'Provides solid grounding and ensures work translates into retained profits.'
      },
      CENTER: {
        status: 'sacred_center',
        idealFor: 'Open Living Space, Peaceful Heart of Home',
        avoid: 'Cooking equipment, Inverters, Heavy structures',
        remedyTip: 'Maintain neutral cream tones and pleasant aroma.',
        explanation: 'Prevents fire energy from overwhelming the central axis of the house.'
      },
      E: {
        status: 'best',
        idealFor: 'Living Room, Balcony, Social Lounge',
        avoid: 'Heavy garbage or dump area',
        remedyTip: 'Decorate with green plants and wooden accents.',
        explanation: 'Air/Wood element in East smoothly feeds Agni without explosive volatility.'
      },
      SW: {
        status: 'challenging',
        idealFor: 'Master Bedroom, Heavy Solid Wardrobes, Strongbox',
        avoid: 'Entrances, Underground tanks, Toilets',
        remedyTip: 'Place yellow Jaisalmer marble or brass idol of elephant pair.',
        explanation: 'Earth element must stay rock-solid to absorb and ground the fiery entry energy.'
      },
      S: {
        status: 'favorable',
        idealFor: 'Resting Bedroom, Heavy Furniture, Staircase',
        avoid: 'Water sumps or blue tiles',
        remedyTip: 'Use terracotta or maroon accents.',
        explanation: 'Shares Mars fire affinity. Excellent when structured with heavy drapes and furniture.'
      },
      SE: {
        status: 'challenging',
        idealFor: 'Kitchen (Cook facing East), Electrical Inverter',
        avoid: 'Underground water tank, Mirror facing door, Blue paint',
        remedyTip: 'Install Copper Strip threshold & Copper Swastika above door.',
        explanation: 'Primary entrance sits in fire corner. Must be insulated with copper remedies to prevent temper flares.'
      }
    }
  },
  S: {
    key: 'S',
    label: 'South',
    hindiLabel: 'दक्षिण दिशा (यम / मंगल द्वार)',
    ruler: 'Lord Yama & Mars (मंगल)',
    element: 'Earth / Fire (मंगल ऊर्जा)',
    score: 7.4,
    ratingLabel: 'Auspicious on 3rd/4th Pada (मध्यम व सुधारात्मक)',
    archetype: 'Courage, Stamina, Authority & Deep Physical Grounding',
    description: 'Classical texts note that 3rd & 4th Padas (Vitatha & Gruhakshata) in the South are highly prosperous for business leaders, lawyers, and surgeons. Requires a heavy solid threshold to anchor positive Prana.',
    thresholdRemedy: 'Fix a heavy polished red stone or brass threshold plate. Mount an energized Brass Hanuman Ji plaque or Gayatri Mantra plate above the entrance and avoid any mirror directly facing the entrance.',
    bestZonesList: ['South-West (Master Suite & Safe)', 'West (Dining & Profit Lockers)', 'North-East (Keep Light & Sacred)'],
    challengingZonesList: ['South Entrance (Needs threshold stone/brass strip)', 'North & North-East (Must remain lower and open)'],
    zoneEvaluations: {
      NW: {
        status: 'favorable',
        idealFor: 'Guest Bedroom, Storage of finished goods, Utility',
        avoid: 'Master bedroom, Clutter',
        remedyTip: 'Hang a silver wind chime near window.',
        explanation: 'Maintains healthy dynamic movement for non-core household members.'
      },
      N: {
        status: 'best',
        idealFor: 'Living Room, Financial Books Desk, Light Wall Decor',
        avoid: 'Heavy solid concrete walls without windows',
        remedyTip: 'Keep North wall light, low, and decorated with green foliage.',
        explanation: 'Maintains the sacred South-to-North elevation gradient required for energy flow.'
      },
      NE: {
        status: 'best',
        idealFor: 'Pooja Altar, Water Urn, Yoga & Meditation Area',
        avoid: 'Toilets, Kitchen, Heavy clutter, Staircase',
        remedyTip: 'Keep fresh water in crystal bowl with marigold petals.',
        explanation: 'Must be kept pristine and light to balance the heavier mass of the South entrance.'
      },
      W: {
        status: 'best',
        idealFor: 'Dining Hall, Accounting Safe, Teenager Study Room',
        avoid: 'Downward slope to West',
        remedyTip: 'Use navy, dark charcoal, or pearl grey finishes.',
        explanation: 'Varuna quadrant. Secures financial returns from professional hard work.'
      },
      CENTER: {
        status: 'sacred_center',
        idealFor: 'Open Space, Well-lit Centroid',
        avoid: 'Heavy concrete pillars, Toilets, Beams',
        remedyTip: 'Keep completely decluttered and lit with warm ambient lights.',
        explanation: 'Ensures even circulation of protective Mars vitality across the structure.'
      },
      E: {
        status: 'favorable',
        idealFor: 'Living Room, Balcony, Reading Nook',
        avoid: 'Heavy opaque barricades',
        remedyTip: 'Keep green plants and open curtains for morning light.',
        explanation: 'Allows natural solar replenishment to maintain cheerful family morale.'
      },
      SW: {
        status: 'challenging',
        idealFor: 'Master Bedroom (Head to South), Heavy Safe, Owner Cabin',
        avoid: 'Water bodies, Toilets, Balcony, Main Entrance',
        remedyTip: 'Keep heavy wooden furniture and earth yellow/ochre decor.',
        explanation: 'Earth anchor. Essential to keep heavier and higher than South entrance.'
      },
      S: {
        status: 'challenging',
        idealFor: 'Entrance with threshold protection, Restful Bedroom',
        avoid: 'Water fountain, Blue color, Low sunken entrance',
        remedyTip: 'Install heavy red granite or brass threshold with Hanuman Yantra.',
        explanation: 'Protects against sudden disputes and channels Mars energy into courageous execution.'
      },
      SE: {
        status: 'favorable',
        idealFor: 'Kitchen (Cook facing East), Electrical Boiler',
        avoid: 'Underground sump, Toilets',
        remedyTip: 'Use rose pink, terracotta or peach wall shades.',
        explanation: 'Naturally coordinates with Southern fire element for domestic stability.'
      }
    }
  },
  SW: {
    key: 'SW',
    label: 'South-West',
    hindiLabel: 'नैऋत्य कोण (नैऋति द्वार)',
    ruler: 'Nirriti & Rahu (राहु)',
    element: 'Earth (पृथ्वी तत्व)',
    score: 5.4,
    ratingLabel: 'High Remedial Priority (विशेष उपाय आवश्यक)',
    archetype: 'Heavy Earth Mass, Prone to Energy Leaks if Opened as Entrance',
    description: 'Classical Vastu Shastra considers South-West as the heavy stability pocket of the home. When used as main entrance, it creates Rahu-related energy leaks that require dedicated non-demolition threshold stabilization.',
    thresholdRemedy: 'Embed 3 Lead Pyramids & 1 Brass Helix beneath/inside the threshold. Install a Yellow Jaisalmer Marble threshold plate and hang an energized Rahu Shanti / Gayatri Yantra at eye level.',
    bestZonesList: ['North-East (Keep Supreme Clean & Watery)', 'North (Keep Open for Opportunities)', 'East (Morning Sunlight Intake)'],
    challengingZonesList: ['South-West Entrance (Immediate Lead/Brass Remedy Required)', 'South-East (Avoid fire-water clash)'],
    zoneEvaluations: {
      NW: {
        status: 'favorable',
        idealFor: 'Guest Room, Pantry, Travel Planning Station',
        avoid: 'Master bedroom, Clutter piles',
        remedyTip: 'Use white/cream decor with natural ventilation.',
        explanation: 'Provides a safe escape valve for dynamic air movement.'
      },
      N: {
        status: 'best',
        idealFor: 'Treasury, Executive Desk, Open Green Foliage',
        avoid: 'Heavy opaque concrete barriers',
        remedyTip: 'Place emerald money plant and brass Kuber idol.',
        explanation: 'Must be energized to keep income opportunities flowing despite SW entrance.'
      },
      NE: {
        status: 'best',
        idealFor: 'Pooja Altar, Meditation Corner, Pure Water Bowl',
        avoid: 'Toilets, Kitchen, Heavy junk, Shoes',
        remedyTip: 'Keep crystal pyramid and fresh water bowl with daily flowers.',
        explanation: 'Top priority: Must stay 100% pure to counteract heavy disturbances from SW.'
      },
      W: {
        status: 'favorable',
        idealFor: 'Dining Room, Study Table, Senior Family Bedroom',
        avoid: 'Water sloped drainage to West',
        remedyTip: 'Use heavy teakwood furniture and steel accents.',
        explanation: 'Helps capture profits and maintain academic focus for youth.'
      },
      CENTER: {
        status: 'sacred_center',
        idealFor: 'Open Space, Peaceful Matrix',
        avoid: 'Toilets, Beams, Heavy machinery',
        remedyTip: 'Keep fully illuminated with warm golden light.',
        explanation: 'Acts as cosmic buffer preserving internal family harmony.'
      },
      E: {
        status: 'best',
        idealFor: 'Living Room, Balcony, Social Sitting Area',
        avoid: 'Heavy trash bins or septic tanks',
        remedyTip: 'Mount glowing brass Sun symbol on East wall.',
        explanation: 'Infuses vital solar energy to offset heavy Rahu vibrations.'
      },
      SW: {
        status: 'challenging',
        idealFor: 'Entrance with strict non-demolition lead/brass remedies',
        avoid: 'Underground tanks, Mirror facing door, Water elements',
        remedyTip: 'Install Yellow Jaisalmer threshold, 3 Lead Pyramids & Brass Helix.',
        explanation: 'Major stability leak. Correcting with lead and brass seals financial drains and relationship stress.'
      },
      S: {
        status: 'favorable',
        idealFor: 'Heavy Wardrobes, Bedroom, Dark Drapes',
        avoid: 'Underground water tanks',
        remedyTip: 'Use terracotta or warm ochre color schemes.',
        explanation: 'Aids in grounding family health and maintaining emotional endurance.'
      },
      SE: {
        status: 'challenging',
        idealFor: 'Kitchen (Cook facing East), Inverter Room',
        avoid: 'Toilets, Underground water sumps',
        remedyTip: 'Install Copper Swastika above kitchen doorway.',
        explanation: 'Must maintain strict fire discipline to prevent financial and health instability.'
      }
    }
  },
  W: {
    key: 'W',
    label: 'West',
    hindiLabel: 'पश्चिम दिशा (वरुण द्वार)',
    ruler: 'Lord Varuna & Saturn (शनि)',
    element: 'Space / Metal (आकाश व धातु)',
    score: 8.7,
    ratingLabel: 'Auspicious for Business & Profits (अति शुभ)',
    archetype: 'Material Gains, Networking, Business Profits & Steady Growth',
    description: 'West entrance is ruled by Lord Varuna and Lord Shani. It is exceptionally beneficial for traders, lawyers, politicians, business owners, and corporate executives, attracting steady retained wealth.',
    thresholdRemedy: 'Fix a polished Stainless Steel or Brass strip along the threshold. Place a Brass Tortoise or 7-rod metallic wind chime near the doorway to accelerate business conversion.',
    bestZonesList: ['West (Entrance & Dining)', 'North (Treasury & Work)', 'North-East (Pooja & Meditation)', 'South-West (Master Suite)'],
    challengingZonesList: ['South-East (Ensure Kitchen is insulated)', 'North-West (Keep guest room, avoid patriarch bed)'],
    zoneEvaluations: {
      NW: {
        status: 'favorable',
        idealFor: 'Guest Room, Dispatch warehouse, Marketing Hub',
        avoid: 'Master bedroom for patriarch',
        remedyTip: 'Use milk white or light silver palette.',
        explanation: 'Air zone. Accelerates business communication and client visits.'
      },
      N: {
        status: 'best',
        idealFor: 'Living Room, Cash Safe, Financial Advisory Station',
        avoid: 'Dark red/pink paint, Heavy clutter',
        remedyTip: 'Place a money plant in green ceramic container.',
        explanation: 'Works in synergy with West entrance to turn new leads into bank balances.'
      },
      NE: {
        status: 'best',
        idealFor: 'Pooja Mandir, Sacred Water Fountain, Library',
        avoid: 'Toilets, Kitchen, Staircase, Heavy junk',
        remedyTip: 'Keep crystal pyramid and brass bowl with fresh petals.',
        explanation: 'Divine receptor. Ensures financial gains are paired with spiritual peace.'
      },
      W: {
        status: 'best',
        idealFor: 'Main Door, Dining Room, Profit & Gains Safe',
        avoid: 'Large downward drainage slopes to West',
        remedyTip: 'Install stainless steel/brass threshold strip and 7-rod chime.',
        explanation: 'Varuna portal. Maximizes return on investments and client retainers.'
      },
      CENTER: {
        status: 'sacred_center',
        idealFor: 'Open Space, Peaceful Brahmasthan',
        avoid: 'Heavy pillars, Beams, Toilets',
        remedyTip: 'Maintain clutter-free floor and soft lighting.',
        explanation: 'Central cosmic axis allowing free flow of Space element.'
      },
      E: {
        status: 'favorable',
        idealFor: 'Drawing Room, Morning Sun Balcony, Study Desk',
        avoid: 'Solid boundary walls blocking morning sun',
        remedyTip: 'Hang a shining brass Sun idol on East wall.',
        explanation: 'Balances West entrance with vitalizing morning solar energy.'
      },
      SW: {
        status: 'challenging',
        idealFor: 'Master Bedroom (Head to South), Heavy Safe Vault',
        avoid: 'Open balconies, Toilets, Underground water sumps',
        remedyTip: 'Use heavy teakwood furniture and earth ochre decor.',
        explanation: 'Stability anchor. Keeps the earned profits anchored in the household.'
      },
      S: {
        status: 'favorable',
        idealFor: 'Bedroom, Heavy Storage, Closed Wardrobes',
        avoid: 'Underground sumps or blue wall paint',
        remedyTip: 'Decorate with terracotta or deep maroon accents.',
        explanation: 'Provides solid physical endurance and peaceful sleep cycles.'
      },
      SE: {
        status: 'challenging',
        idealFor: 'Kitchen (Cook facing East), Electrical Geyser',
        avoid: 'Underground water tanks, Toilets, Blue colors',
        remedyTip: 'Place copper strips along kitchen floor joints.',
        explanation: 'Fire zone. Keeps cooking energy hygienic and maintains cash liquidity.'
      }
    }
  },
  NW: {
    key: 'NW',
    label: 'North-West',
    hindiLabel: 'वायव्य कोण (वायु / चन्द्र द्वार)',
    ruler: 'Lord Vayu & Moon (चन्द्र देव)',
    element: 'Air / Mind (वायु व मन)',
    score: 8.3,
    ratingLabel: 'Auspicious for Trade & Mobility (शुभ व गतिशील)',
    archetype: 'Dynamic Movement, Fast Trade, Travel, Networking & Relocation',
    description: 'North-West entrance is charged with Vayu air energy. It promotes vibrant mobility, international connections, tourism, sales cycles, and timely marriage for daughters.',
    thresholdRemedy: 'Hang a 5-pipe tuned Brass or Aluminium wind chime near the doorway. Place a pair of White Marble Elephants or a Kamadhenu Cow & Calf figurine inside near the entrance.',
    bestZonesList: ['North-West (Entrance & Guest)', 'North (Treasury & Career)', 'North-East (Pooja & Yoga)', 'West (Gains & Dining)'],
    challengingZonesList: ['South-West (Must remain super heavy & grounded)', 'South-East (Fire kitchen balance)'],
    zoneEvaluations: {
      NW: {
        status: 'best',
        idealFor: 'Main Door, Guest Room, Finished Goods Dispatch',
        avoid: 'Master bedroom for patriarch, heavy immobile clutter',
        remedyTip: 'Hang 5-pipe metallic air chime and Selenite crystal lamp.',
        explanation: 'Vayu portal. Brings fast-paced customer orders and positive social connections.'
      },
      N: {
        status: 'best',
        idealFor: 'Treasury Safe, Living Room, Work Desk',
        avoid: 'Dark red/pink walls, Heavy debris',
        remedyTip: 'Decorate with green foliage and brass Kuber Yantra.',
        explanation: 'Converts rapid air mobility into concrete financial liquidity.'
      },
      NE: {
        status: 'best',
        idealFor: 'Pooja Altar, Water fountain, Sacred Library',
        avoid: 'Toilets, Kitchen, Heavy junk, Shoes',
        remedyTip: 'Keep clean brass bowl with fresh water and flowers.',
        explanation: 'Calms and elevates the mind, balancing the dynamic Vayu winds.'
      },
      W: {
        status: 'favorable',
        idealFor: 'Dining Room, Study Table, Profit Safe',
        avoid: 'Downhill water sloped drainage to West',
        remedyTip: 'Use navy or silver grey upholstery.',
        explanation: 'Ensures moving sales turn into permanent long-term business savings.'
      },
      CENTER: {
        status: 'sacred_center',
        idealFor: 'Open Space, Central Corridor, Family Gathering',
        avoid: 'Heavy pillars, Staircase, Toilets',
        remedyTip: 'Ensure clean floor and pleasant natural fragrance.',
        explanation: 'Preserves balanced air flow across all 8 cardinal quadrants.'
      },
      E: {
        status: 'favorable',
        idealFor: 'Living Room, Balcony, Social Networking Area',
        avoid: 'Septic tanks, Opaque barricades',
        remedyTip: 'Mount energized brass Surya plate on East wall.',
        explanation: 'Provides solar vitality to fuel active business negotiations.'
      },
      SW: {
        status: 'challenging',
        idealFor: 'Master Bedroom (Head to South), Heavy Safe',
        avoid: 'Balconies, Open doors, Underground tanks',
        remedyTip: 'Keep heavy wooden furniture and solid brass elephant pair.',
        explanation: 'Critical stabilizer. Prevents excessive restlessness or ungrounded decisions.'
      },
      S: {
        status: 'favorable',
        idealFor: 'Bedroom, Heavy Storage, Closed Wardrobes',
        avoid: 'Underground sumps',
        remedyTip: 'Use terracotta and warm earth tones.',
        explanation: 'Mars zone. Provides physical stamina to keep up with dynamic schedule.'
      },
      SE: {
        status: 'challenging',
        idealFor: 'Kitchen (Cook facing East), Inverter & Geyser',
        avoid: 'Underground water tanks, Toilets, Blue colors',
        remedyTip: 'Install Copper Swastika above kitchen entrance.',
        explanation: 'Agni Fire zone. Ensures kitchen operates safely without air gusts disturbing food harmony.'
      }
    }
  }
};

const GRID_CELLS = [
  { key: 'NW', name: 'North-West', hindi: 'वायव्य कोण', row: 1, col: 1, element: 'Air (वायु)' },
  { key: 'N', name: 'North', hindi: 'उत्तर दिशा', row: 1, col: 2, element: 'Water (जल)' },
  { key: 'NE', name: 'North-East', hindi: 'ईशान कोण', row: 1, col: 3, element: 'Water (ईशान)' },
  { key: 'W', name: 'West', hindi: 'पश्चिम दिशा', row: 2, col: 1, element: 'Space (आकाश)' },
  { key: 'CENTER', name: 'Brahmasthan', hindi: 'ब्रह्मस्थान (केंद्र)', row: 2, col: 2, element: 'Space (आकाश)' },
  { key: 'E', name: 'East', hindi: 'पूर्व दिशा', row: 2, col: 3, element: 'Air/Wood (वायु)' },
  { key: 'SW', name: 'South-West', hindi: 'नैऋत्य कोण', row: 3, col: 1, element: 'Earth (पृथ्वी)' },
  { key: 'S', name: 'South', hindi: 'दक्षिण दिशा', row: 3, col: 2, element: 'Fire/Earth' },
  { key: 'SE', name: 'South-East', hindi: 'आग्नेय कोण', row: 3, col: 3, element: 'Fire (अग्नि)' }
];

interface VastuEntranceGridProps {
  onBookAudit?: () => void;
}

export const VastuEntranceGrid: React.FC<VastuEntranceGridProps> = ({ onBookAudit }) => {
  const [selectedEntrance, setSelectedEntrance] = useState<EntranceDirection>('N');
  const [activeCellKey, setActiveCellKey] = useState<string>('NE');
  const [showRemedyModal, setShowRemedyModal] = useState<boolean>(false);

  const currentProfile = ENTRANCE_PROFILES[selectedEntrance];
  const activeEval = currentProfile.zoneEvaluations[activeCellKey] || currentProfile.zoneEvaluations['N'];
  const activeCellMeta = GRID_CELLS.find((c) => c.key === activeCellKey) || GRID_CELLS[0];

  const getStatusBadge = (status: ZoneEvaluation['status'], isEntrance: boolean) => {
    if (isEntrance) {
      return (
        <span className="inline-flex items-center gap-1 bg-[#EA580C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
          <DoorOpen className="w-3 h-3 text-white" />
          <span>Doorway</span>
        </span>
      );
    }

    switch (status) {
      case 'best':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/90 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Best Zone</span>
          </span>
        );
      case 'favorable':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-950/90 text-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            <span>Favorable</span>
          </span>
        );
      case 'challenging':
        return (
          <span className="inline-flex items-center gap-1 bg-rose-100 dark:bg-rose-950/90 text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
            <span>Challenging</span>
          </span>
        );
      case 'sacred_center':
        return (
          <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-amber-950/90 text-[#7C2D12] dark:text-amber-200 border border-orange-300 dark:border-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Compass className="w-3 h-3 text-[#EA580C]" />
            <span>Sacred Center</span>
          </span>
        );
    }
  };

  const getCellBorderClass = (cellKey: string, status: ZoneEvaluation['status']) => {
    const isSelected = activeCellKey === cellKey;
    const isEntrance = selectedEntrance === cellKey;

    if (isSelected) {
      return 'border-2 border-[#EA580C] ring-2 ring-[#EA580C]/40 bg-white dark:bg-[#2A0A03] shadow-lg';
    }

    if (isEntrance) {
      return 'border-2 border-[#F97316] bg-[#FFF7ED] dark:bg-[#340C04] shadow-md';
    }

    switch (status) {
      case 'best':
        return 'border border-emerald-300 dark:border-emerald-800/80 bg-[#F0FDF4] dark:bg-[#062010] hover:bg-emerald-50 dark:hover:bg-[#0a3018] hover:border-emerald-500';
      case 'challenging':
        return 'border border-rose-300 dark:border-rose-800/80 bg-[#FFF1F2] dark:bg-[#25080a] hover:bg-rose-50 dark:hover:bg-[#380e12] hover:border-rose-500';
      case 'sacred_center':
        return 'border border-orange-300 dark:border-amber-800 bg-[#FFFBEB] dark:bg-[#2a1002] hover:bg-[#FEF3C7] dark:hover:bg-[#351503] hover:border-orange-500';
      default:
        return 'border border-amber-200 dark:border-amber-900/70 bg-white dark:bg-[#1A0501] hover:bg-orange-50/70 dark:hover:bg-[#280a03] hover:border-amber-400';
    }
  };

  const directionsList: { key: EntranceDirection; label: string; hindi: string }[] = [
    { key: 'N', label: 'North', hindi: 'उत्तर' },
    { key: 'NE', label: 'North-East', hindi: 'ईशान' },
    { key: 'E', label: 'East', hindi: 'पूर्व' },
    { key: 'SE', label: 'South-East', hindi: 'आग्नेय' },
    { key: 'S', label: 'South', hindi: 'दक्षिण' },
    { key: 'SW', label: 'South-West', hindi: 'नैऋत्य' },
    { key: 'W', label: 'West', hindi: 'पश्चिम' },
    { key: 'NW', label: 'North-West', hindi: 'वायव्य' }
  ];

  return (
    <div id="vastu-entrance-grid" className="bg-white dark:bg-[#1A0501] rounded-3xl border border-orange-200 dark:border-amber-900/80 p-5 sm:p-8 lg:p-10 shadow-xl my-14">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 border border-orange-300 dark:border-amber-800 bg-[#FFF9F2] dark:bg-[#1E0702] px-3.5 py-1 rounded-full text-[11px] font-semibold text-[#EA580C] dark:text-amber-300 tracking-[0.16em] uppercase mb-3 shadow-xs">
          <DoorOpen className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Interactive Entrance Analyzer &bull; 9-Zone Spatial Grid</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-[#7C2D12] dark:text-amber-100">
          What Direction is Your Main Entrance?
        </h3>
        <p className="text-[#9A3412] dark:text-amber-300/90 mt-2 text-xs sm:text-sm font-normal max-w-xl mx-auto leading-relaxed">
          Select your home or office's primary entrance doorway. Our classical Vedic grid immediately maps your dwelling's <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">Best Auspicious Zones</strong> and <strong className="text-rose-700 dark:text-rose-400 font-semibold">Challenging Dosha Pockets</strong>.
        </p>
      </div>

      {/* 1. Entrance Direction Selection Bar */}
      <div className="mb-8">
        <label className="block text-center text-xs font-bold uppercase tracking-wider text-[#7C2D12] dark:text-amber-200 mb-3">
          Step 1: Choose Primary Entrance Doorway
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 max-w-5xl mx-auto">
          {directionsList.map((dir) => {
            const isSelected = selectedEntrance === dir.key;
            return (
              <button
                key={dir.key}
                type="button"
                id={`btn-entrance-${dir.key.toLowerCase()}`}
                onClick={() => {
                  setSelectedEntrance(dir.key);
                  setActiveCellKey(dir.key);
                }}
                className={`py-2.5 px-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                  isSelected
                    ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-md ring-2 ring-amber-300 scale-102 font-bold'
                    : 'bg-[#FFF9F2] dark:bg-[#250802] text-[#7C2D12] dark:text-amber-200 border-orange-200 dark:border-amber-900/70 hover:border-[#EA580C] hover:bg-[#FFF2E2] dark:hover:bg-[#350C03]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <DoorOpen className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-200' : 'text-[#EA580C]'}`} />
                  <span className="font-playfair font-bold text-xs sm:text-sm">{dir.label}</span>
                </div>
                <span className={`text-[10px] font-normal ${isSelected ? 'text-amber-100' : 'text-[#9A3412] dark:text-amber-300/80'}`}>
                  {dir.hindi}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Entrance Diagnostic Headline Strip */}
      <div className="bg-[#FFF7ED] dark:bg-[#250802] rounded-2xl border border-orange-200 dark:border-amber-900/70 p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#1A0501] border border-orange-300 dark:border-amber-800 flex items-center justify-center text-[#EA580C] shrink-0 shadow-xs">
            <Compass className="w-6 h-6 text-[#F97316]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="font-playfair font-bold text-base sm:text-lg text-[#7C2D12] dark:text-amber-100">
                {currentProfile.hindiLabel} &bull; {currentProfile.label} Doorway
              </h4>
              <span className="text-[11px] font-bold bg-[#EA580C] text-white px-2.5 py-0.5 rounded-full">
                Vedic Score: {currentProfile.score}/10
              </span>
            </div>
            <p className="text-xs text-[#9A3412] dark:text-amber-300/80 mt-0.5 font-normal">
              <strong>Archetype:</strong> {currentProfile.archetype} &bull; <strong>Ruler:</strong> {currentProfile.ruler}
            </p>
          </div>
        </div>

        {/* Legend Key */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] bg-white dark:bg-[#1A0501] border border-orange-200 dark:border-amber-900/70 px-3 py-1.5 rounded-xl self-stretch md:self-auto justify-center">
          <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-300 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Best (शुभ)
          </span>
          <span className="text-stone-300 dark:text-stone-600">|</span>
          <span className="flex items-center gap-1 text-amber-900 dark:text-amber-300 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Favorable (अनुकूल)
          </span>
          <span className="text-stone-300 dark:text-stone-600">|</span>
          <span className="flex items-center gap-1 text-rose-800 dark:text-rose-300 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Challenging (सावधानी)
          </span>
        </div>
      </div>

      {/* 3. Main Split View: 3x3 Visual Grid (Left) + Detailed Zone Audit Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: 3x3 Vastu Purusha Classical Matrix */}
        <div className="lg:col-span-7">
          <div className="bg-[#FFF9F2] dark:bg-[#200601] p-4 sm:p-5 rounded-3xl border border-orange-200 dark:border-amber-900/70">
            <div className="flex items-center justify-between mb-3 text-xs text-[#9A3412] dark:text-amber-300/80">
              <span className="font-semibold uppercase tracking-wider text-[#7C2D12] dark:text-amber-200">
                Vastu 9-Grid Spatial Matrix
              </span>
              <span className="text-[11px] italic">
                (Click any zone to inspect guidelines)
              </span>
            </div>

            {/* Classical 3x3 Grid Matrix */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 aspect-square sm:aspect-auto">
              {GRID_CELLS.map((cell) => {
                const evalData = currentProfile.zoneEvaluations[cell.key] || {
                  status: 'favorable',
                  idealFor: '',
                  avoid: '',
                  remedyTip: '',
                  explanation: ''
                };
                const isSelected = activeCellKey === cell.key;
                const isEntrance = selectedEntrance === cell.key;
                const borderClass = getCellBorderClass(cell.key, evalData.status);

                return (
                  <motion.button
                    key={cell.key}
                    type="button"
                    id={`grid-cell-${cell.key.toLowerCase()}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveCellKey(cell.key)}
                    className={`rounded-2xl p-3 sm:p-4 text-left transition-all cursor-pointer relative flex flex-col justify-between min-h-[100px] sm:min-h-[125px] ${borderClass}`}
                  >
                    {/* Top: Direction name + Status Badge */}
                    <div className="w-full">
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <div>
                          <span className="font-playfair font-bold text-xs sm:text-sm text-[#7C2D12] dark:text-amber-100 block">
                            {cell.name}
                          </span>
                          <span className="text-[10px] font-bold text-[#9A3412] dark:text-amber-300 block">
                            {cell.hindi}
                          </span>
                        </div>
                        {cell.key === 'CENTER' && (
                          <Compass className="w-4 h-4 text-[#EA580C] shrink-0" />
                        )}
                      </div>
                    </div>

                    {/* Middle: Key Recommended Usage Preview */}
                    <div className="my-1">
                      <p className="text-[10px] sm:text-[11px] text-[#7C2D12] dark:text-amber-100 font-bold line-clamp-2 leading-tight">
                        {evalData.idealFor.split(',')[0]}
                      </p>
                    </div>

                    {/* Bottom: Status Pill Badge */}
                    <div className="pt-1 border-t border-orange-200/80 dark:border-amber-900/60 flex items-center justify-between">
                      {getStatusBadge(evalData.status, isEntrance)}
                      <span className="text-[9px] text-[#7C2D12] dark:text-amber-300 uppercase font-extrabold">
                        {cell.element.split(' ')[0]}
                      </span>
                    </div>

                    {/* Active Cell Indicator Corner Dot */}
                    {isSelected && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#EA580C] border-2 border-white flex items-center justify-center text-white text-[8px] font-bold shadow-xs">
                        ✓
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Grid Helper Footer */}
            <div className="mt-3 text-center text-[11px] text-[#7C2D12] dark:text-amber-200 font-medium">
              Compass Alignment: Top row represents North quadrant; Bottom row represents South quadrant.
            </div>
          </div>
        </div>

        {/* RIGHT: Detailed Zone Dossier & Remedial Action Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#FFFDF9] dark:bg-[#1E0702] rounded-3xl border border-orange-200 dark:border-amber-900/80 p-5 sm:p-6 shadow-md space-y-4">
            
            {/* Active Cell Header */}
            <div className="border-b border-orange-200 dark:border-amber-900/70 pb-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-amber-950/80 border border-orange-300 dark:border-amber-800 flex items-center justify-center text-[#EA580C] dark:text-amber-400">
                    <Compass className="w-4 h-4 text-[#EA580C] dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-playfair font-bold text-lg text-[#7C2D12] dark:text-amber-100">
                      {activeCellMeta.name} ({activeCellMeta.hindi})
                    </h4>
                    <span className="text-[10px] text-[#9A3412] dark:text-amber-300/80">
                      Element: <strong>{activeCellMeta.element}</strong>
                    </span>
                  </div>
                </div>
                {getStatusBadge(activeEval.status, selectedEntrance === activeCellKey)}
              </div>
            </div>

            {/* Explanatory Narrative */}
            <p className="text-xs text-[#7C2D12] dark:text-amber-100/90 font-normal leading-relaxed bg-[#FFF7ED] dark:bg-[#250802] p-3 rounded-xl border border-orange-200 dark:border-amber-900/70">
              {activeEval.explanation}
            </p>

            {/* Best For */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Ideal Auspicious Usage:</span>
              </div>
              <p className="text-xs text-[#7C2D12] dark:text-amber-100/90 bg-white dark:bg-[#1A0501] p-3 rounded-xl border border-emerald-200 dark:border-emerald-900/60 leading-relaxed font-normal">
                {activeEval.idealFor}
              </p>
            </div>

            {/* Avoid In This Zone */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-400 uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Strictly Avoid In This Zone:</span>
              </div>
              <p className="text-xs text-[#7C2D12] dark:text-amber-100/90 bg-white dark:bg-[#1A0501] p-3 rounded-xl border border-rose-200 dark:border-rose-900/60 leading-relaxed font-normal">
                {activeEval.avoid}
              </p>
            </div>

            {/* Dr. Preeti Sehgal Zero-Demolition Remedy Box */}
            <div className="bg-[#FFF7ED] dark:bg-[#250802] p-3.5 rounded-2xl border border-orange-300 dark:border-amber-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#EA580C] dark:text-amber-400 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                <span>Dr. Preeti Sehgal's Non-Demolition Upay:</span>
              </div>
              <p className="text-xs text-[#7C2D12] dark:text-amber-100/90 font-normal leading-relaxed">
                {activeEval.remedyTip}
              </p>
            </div>

            {/* Doorway Specific Threshold Upay Banner */}
            <div className="p-3 bg-[#FEF3C7] dark:bg-[#2A1002] rounded-xl border border-amber-300 dark:border-amber-800 text-[11px] text-[#7C2D12] dark:text-amber-100 space-y-1">
              <span className="font-bold flex items-center gap-1 text-[#EA580C] dark:text-amber-400">
                <DoorOpen className="w-3.5 h-3.5" />
                <span>Threshold Remedy for {currentProfile.label} Entrance:</span>
              </span>
              <p className="leading-relaxed font-normal">
                {currentProfile.thresholdRemedy}
              </p>
            </div>

            {/* CTA to Consultation & Remedies Gallery */}
            <div className="space-y-2 mt-2">
              <a
                href="#vastu-remedy-gallery"
                className="w-full py-2.5 bg-[#FFF9F2] dark:bg-[#250802] hover:bg-[#EA580C] text-[#7C2D12] dark:text-amber-200 hover:text-white border border-orange-300 dark:border-amber-800 hover:border-[#EA580C] font-semibold text-xs tracking-wider uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>View {currentProfile.label} Placement Remedies Gallery</span>
              </a>

              {onBookAudit && (
                <button
                  type="button"
                  id="btn-book-vastu-audit"
                  onClick={onBookAudit}
                  className="w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Request Custom Floorplan Blueprint Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* 4. Quick Summary Checklist Footer: Best vs Challenging zones for selected Entrance */}
      <div className="mt-8 pt-6 border-t border-orange-200 dark:border-amber-900/70 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#F0FDF4] dark:bg-[#062010] p-4 rounded-2xl border border-emerald-300 dark:border-emerald-800">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-playfair font-bold text-sm mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Top Auspicious Zones for {currentProfile.label} Entrance:</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#7C2D12] dark:text-amber-100">
            {currentProfile.bestZonesList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#FFF1F2] dark:bg-[#25080a] p-4 rounded-2xl border border-rose-300 dark:border-rose-800">
          <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-playfair font-bold text-sm mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Vulnerable / High Care Zones for {currentProfile.label} Entrance:</span>
          </div>
          <ul className="space-y-1.5 text-xs text-[#7C2D12] dark:text-amber-100">
            {currentProfile.challengingZonesList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-rose-600 dark:text-rose-400 font-bold">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};
