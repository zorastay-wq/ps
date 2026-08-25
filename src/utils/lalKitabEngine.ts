import { 
  PlanetaryPosition, 
  ManglikDetails, 
  SadeSatiDetails, 
  KaalSarpDetails, 
  LalKitabHouseRemedy, 
  LalKitabDoshaPrescription, 
  LalKitabKarmicDebt, 
  LalKitabPrescriptionProfile 
} from '../types';

// ============================================================================
// 1. LAL KITAB PAKKA GHAR (PERMANENT HOUSES) REFERENCE
// ============================================================================
export const PAKKA_GHAR_MAP: Record<string, number> = {
  Sun: 1,      // 1st House is Pakka Ghar of Sun
  Moon: 4,     // 4th House is Pakka Ghar of Moon
  Mars: 3,     // 3rd & 8th House (3rd is active Pakka Ghar)
  Mercury: 7,  // 6th & 7th House
  Jupiter: 2,  // 2nd, 5th, 9th, 11th (2nd & 9th are primary)
  Venus: 7,    // 7th House
  Saturn: 10,  // 10th & 11th House
  Rahu: 12,    // 12th House
  Ketu: 6      // 6th House
};

interface HouseRemedyEntry {
  upayTitle: string;
  remedy: string;
  issue: string;
  duration: string;
  timeOfDay: string;
  precautions: string[];
  auspiciousDay: string;
  elementOrSubstance: string;
}

// ============================================================================
// 2. AUTHENTIC 9 PLANETS × 12 HOUSES LAL KITAB MATRIX
// ============================================================================
const LAL_KITAB_HOUSE_MATRIX: Record<string, Record<number, HouseRemedyEntry>> = {
  Sun: {
    1: {
      upayTitle: 'Surya Lagna Arghya & Copper Harmony',
      remedy: 'Offer Arghya to Surya Dev in a pure copper vessel at sunrise. Keep brass utensils in the kitchen.',
      issue: 'Protects vitality, self-esteem, and fatherly harmony.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Strictly at Sunrise (within 1 hour of dawn)',
      precautions: ['Never accept free electrical goods, copper items, or charity.', 'Do not construct a dark room at the entrance of your home.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Pure Copper, Brass, Holy Water'
    },
    2: {
      upayTitle: 'Mandir Coconut & Almond Offering',
      remedy: 'Donate dry coconuts, mustard oil, or raw almonds in a sacred temple on Sundays.',
      issue: 'Averts disputes over family property and protects steady inflow of wealth.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning between 8:00 AM and 11:00 AM',
      precautions: ['Never accept charity or free silver from in-laws.', 'Avoid sharing financial secrets with strangers.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Dry Coconut, Raw Almonds'
    },
    3: {
      upayTitle: 'Maternal Blessings & Sweet Speech',
      remedy: 'Serve maternal uncles and elders; speak with warmth and maintain honest dealings.',
      issue: 'Strengthens brotherly support and clears unnecessary career rivalries.',
      duration: 'Ongoing with 43-day morning mindfulness cycles',
      timeOfDay: 'Daylight hours before noon',
      precautions: ['Never insult younger brothers or cousins.', 'Avoid harsh speech and unprovoked aggression.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Jaggery & Wheat'
    },
    4: {
      upayTitle: 'Surya-Chandra Milk & Jaggery Arghya',
      remedy: 'Feed red-faced monkeys or cows with roasted chickpeas and jaggery; drink water in silver glass.',
      issue: 'Calms emotional turbulence and protects maternal peace.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight before 2:00 PM',
      precautions: ['Do not donate jaggery on Sundays (consume or feed to animals only).', 'Never sell ancestral gold.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Jaggery, Roasted Gram, Silver'
    },
    5: {
      upayTitle: 'Silver Water Vessel & Progeny Harmony',
      remedy: 'Keep pure river water or well water in a solid silver container with a tight lid at home.',
      issue: 'Protects children’s progress, intellect, and spiritual blessings.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning after sunrise bath',
      precautions: ['Avoid using foul language with children.', 'Do not consume stale or non-vegetarian food.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Pure River Water, Silver Pot'
    },
    6: {
      upayTitle: 'Gaumata Seva & Jaggery Offering',
      remedy: 'Feed brown cows with wheat dough balls filled with jaggery; offer water to elders.',
      issue: 'Pacifies secret enemies, digestive vulnerabilities, and legal hassles.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before 11:00 AM',
      precautions: ['Do not install an open well or handpump in the exact center of the courtyard.', 'Avoid taking loans on Sundays.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Wheat Dough, Jaggery, Holy Cow'
    },
    7: {
      upayTitle: 'Tandoori Roti & Agni Shanti',
      remedy: 'Bake sweet rotis on fire and distribute to the poor or extinguish a hot iron ladle in fresh milk.',
      issue: 'Protects marital tranquility and prevents sudden partnership disputes.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight before sunset',
      precautions: ['Avoid excessive salt intake after sunset.', 'Maintain unwavering fidelity to your spouse.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Sweet Baked Roti, Milk'
    },
    8: {
      upayTitle: 'Flowing Water Copper Coin Offering',
      remedy: 'Drop 8 pure copper coins into flowing river water; avoid south-facing main entrance.',
      issue: 'Neutralizes hidden life obstacles, accidental hazards, and sudden losses.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Strictly before Sunset (never at night)',
      precautions: ['Never consume meat or alcohol during daytime.', 'Do not accept free iron or scrap metal.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: '8 Pure Copper Coins, Flowing Water'
    },
    9: {
      upayTitle: 'Pitru Dharma & Brass Utensils',
      remedy: 'Use brass utensils at home; touch the feet of your father and gurus every morning.',
      issue: 'Unlocks ancestral fortune, karmic luck, and administrative success.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Sunrise to 10:00 AM',
      precautions: ['Never disrespect traditional spiritual customs or elders.', 'Do not accept donations of brass or gold.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Brass, Turmeric, Saffron'
    },
    10: {
      upayTitle: 'Surya River Coin & White Head Covering',
      remedy: 'Drop a round copper coin into a flowing river; cover your head with a white/light cap during outdoor work.',
      issue: 'Boosts professional stature, government favors, and leadership stability.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Mid-morning (9:00 AM - 1:00 PM)',
      precautions: ['Avoid wearing dark blue or black clothing while attending key interviews/meetings.', 'Never disrespect father.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Copper Coin, White Cap'
    },
    11: {
      upayTitle: 'Temple Almond Prasadam Cycle',
      remedy: 'Offer 12 raw almonds in a temple; bring 6 almonds back and keep them safely inside a clean white cloth at home.',
      issue: 'Multiplies recurring cash flows, business gains, and elder sibling support.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid fraudulent accounting or false promises in trade.', 'Do not sell the kept almonds.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: '12 Raw Almonds, White Cloth'
    },
    12: {
      upayTitle: 'Courtyard Jaggery & Daylight Harmony',
      remedy: 'Keep courtyard clean and well lit; feed jaggery to cattle; avoid sleeping during evening twilight.',
      issue: 'Averts wasteful expenditures, insomnia, and unnecessary legal fines.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Do not construct dark dingy storerooms at the back of the house.', 'Never consume liquor in bed.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Jaggery, Daylight Sun'
    }
  },

  Moon: {
    1: {
      upayTitle: 'Matru Ashirwad & Pure Silver Solid Piece',
      remedy: 'Take blessings and raw milk from your mother; keep a solid square pure silver piece in your wallet.',
      issue: 'Imparts supreme mental tranquility, emotional resilience, and financial abundance.',
      duration: '43 Consecutive Days for blessings',
      timeOfDay: 'Early morning immediately after bath',
      precautions: ['Never sell pure milk or dairy for excessive profit at the cost of household needs.', 'Do not insult women.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Solid Pure Silver Square, Raw Milk'
    },
    2: {
      upayTitle: 'Silver Goblet Milk & Elder Matriarch Honor',
      remedy: 'Drink warm water or milk in a pure silver cup; touch maternal grandmother/mother’s feet.',
      issue: 'Secures savings, eliminates cash leaks, and brings voice sweetness.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Never disrespect mother or elderly women.', 'Do not consume milk directly after sunset.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Silver Cup, Sacred Milk'
    },
    3: {
      upayTitle: 'Chhabeel Drinking Water Daan',
      remedy: 'Provide free drinking water to travelers, birds, and animals; donate water filters.',
      issue: 'Strengthens willpower, clears respiratory allergies, and aids siblings.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight hours',
      precautions: ['Avoid misusing ancestral wealth.', 'Do not waste fresh drinking water.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Fresh Potable Water, White Flowers'
    },
    4: {
      upayTitle: 'Pakka Ghar Chandra Ganga Jal Pot',
      remedy: 'Fill a small silver or brass pitcher with Ganga water or rainwater; seal with silver lid and place at home.',
      issue: 'Activates supreme Moon strength, inner peace, and real estate prosperity.',
      duration: 'Permanent installation with 43-day initial prayer',
      timeOfDay: 'Monday morning',
      precautions: ['Never sell ancestral silver or holy water.', 'Keep the vessel elevated and clean.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Pure Silver Urn, Rainwater / Ganga Jal'
    },
    5: {
      upayTitle: 'Blind Service & Shiva Milk Abhishek',
      remedy: 'Serve 10 visually impaired individuals with sweet kheer; perform raw milk Jal Abhishek on Shivalinga.',
      issue: 'Clears creative blocks, exam anxieties, and emotional swings.',
      duration: '43 Consecutive Days (or 11 Mondays)',
      timeOfDay: 'Morning before 10:00 AM',
      precautions: ['Avoid greedy speculation or unearned money.', 'Do not use abusive speech.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Sweet Kheer, Raw Cow Milk'
    },
    6: {
      upayTitle: 'Water for Travelers & Rabbit Feeding',
      remedy: 'Provide water at public places; feed green vegetables to rabbits or birds.',
      issue: 'Protects health, stops unnecessary hospital expenses, and eases mind.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Sunrise to midday',
      precautions: ['Never donate milk or curd at night after sunset.', 'Do not keep stagnant dirty water containers at home.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Fresh Water, Green Leaves'
    },
    7: {
      upayTitle: 'Silver Square Dipped in Holy Water',
      remedy: 'Keep 4 small square pieces of pure silver in a glass bowl filled with clean water; gift silver to sister.',
      issue: 'Harmonizes relationship with spouse and brings business liquid capital.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid late night journeys near water bodies.', 'Do not enter into verbal spats with spouse.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: '4 Pure Silver Squares, Clean Water'
    },
    8: {
      upayTitle: 'Chandra Goli (Solid Silver Ball) Protection',
      remedy: 'Keep a solid pure silver ball (चांदी की ठोस गोली) in your pocket; offer milk to Shivalinga.',
      issue: 'Protects from deep depressive thoughts, mood swings, and unexpected financial jolts.',
      duration: 'Carry continuously for at least 43 days',
      timeOfDay: 'Morning at sunrise',
      precautions: ['Do not donate milk or white rice to strangers during morning hours.', 'Avoid swimming alone in deep waters.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Solid Pure Silver Ball'
    },
    9: {
      upayTitle: 'Dharma Sthal Raw Milk Offering',
      remedy: 'Offer raw cow milk and white flowers in a Shiva temple on Mondays; respect spiritual teachers.',
      issue: 'Unlocks divine grace, emotional wisdom, and travel luck.',
      duration: '43 Consecutive Days (or 16 Mondays)',
      timeOfDay: 'Morning before 11:00 AM',
      precautions: ['Never speak ill of holy rivers or spiritual mentors.', 'Avoid non-veg on Mondays.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Raw Milk, White Sandalwood'
    },
    10: {
      upayTitle: 'Shiva Dhara & Night Milk Restriction',
      remedy: 'Offer fresh water to Shivalinga daily; avoid drinking liquid milk after 8:00 PM.',
      issue: 'Enhances career public reputation and mental focus under high work pressure.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Never construct water storage or washrooms directly under staircases.', 'Avoid liquid milk late at night.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Fresh Water, Shivalinga'
    },
    11: {
      upayTitle: 'Bargad Tree Milk & Mitti Tilak',
      remedy: 'Pour raw cow milk at the root of a Banyan (Bargad) tree and apply wet soil tilak to your navel and forehead.',
      issue: 'Attracts influential network support, steady business cash, and eliminates inner loneliness.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before 11:00 AM',
      precautions: ['Avoid fraudulent contracts or deceptive partnerships.', 'Do not pluck fresh green leaves needlessly.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Raw Milk, Sacred Earth (Mitti Tilak)'
    },
    12: {
      upayTitle: 'Rooftop Rainwater Jar & Twilight Vigil',
      remedy: 'Collect rainwater in a glass or silver bottle and place it on the roof; stay active during dusk.',
      issue: 'Curbs sleeplessness, mental exhaustion, and unmonitored outflow of funds.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning after sunrise',
      precautions: ['Never sleep during evening twilight (sandhya kaal).', 'Avoid clutter in the bedroom.'],
      auspiciousDay: 'Monday',
      elementOrSubstance: 'Rainwater, Glass Bottle'
    }
  },

  Mars: {
    1: {
      upayTitle: 'Mangal Nek Sindoor & Brother Harmony',
      remedy: 'Apply red sandalwood or saffron tilak on forehead; serve elder brothers; consume a drop of honey in morning.',
      issue: 'Directs fiery martial energy toward leadership, health, and athletic discipline.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning immediately after bath',
      precautions: ['Avoid road rage, unprovoked anger, and rash driving.', 'Do not accept free weapons or knives.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Red Sandalwood, Honey'
    },
    2: {
      upayTitle: 'Meethi Tandoori Roti for Stray Dogs',
      remedy: 'Bake sweet rotis with jaggery in an oven/tandoor and feed to stray dogs or holy cows.',
      issue: 'Stops harsh speech, dissolves family friction, and stabilizes family finances.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight before sunset',
      precautions: ['Never keep rusted knives or broken scissors at home.', 'Avoid speaking harsh words during family meals.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Sweet Jaggery Roti, Stray Dogs'
    },
    3: {
      upayTitle: 'Jointless Silver Ring & Masoor Dal',
      remedy: 'Wear a pure silver ring without a solder joint on the left ring finger; feed birds with split red lentils.',
      issue: 'Protects courage, prevents sibling disputes, and dissolves irrational phobias.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Avoid heated arguments with younger siblings.', 'Do not keep empty iron boxes.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Solid Pure Silver Ring, Red Lentils'
    },
    4: {
      upayTitle: 'Pakka Ghar Milk Offering & Pure Silver Piece',
      remedy: 'Offer sweet milk to the roots of a Banyan tree; keep a square piece of pure silver in your pocket.',
      issue: 'Pacifies domestic turbulence, maternal distress, and property conflicts.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight before noon',
      precautions: ['Never plant thorny cactus or bonsai inside your residential boundary.', 'Avoid anger inside the kitchen.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Sweet Milk, Solid Silver Square'
    },
    5: {
      upayTitle: 'Neem Tree Care & Sweet Water Beside Bed',
      remedy: 'Water a Neem tree daily; keep a copper tumbler of sweet water by your bedside at night and pour it on plants in the morning.',
      issue: 'Protects progeny, cools mental tempers, and aids academic focus.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid losing temper in the presence of children.', 'Do not eat red meat.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Neem Tree, Sweet Water'
    },
    6: {
      upayTitle: 'Jaggery Revadis Flowing Water Offering',
      remedy: 'Feed sweet rotis to street dogs for 43 days; distribute jaggery revadis or batashas in a flowing stream.',
      issue: 'Neutralizes hidden adversaries, litigation worries, and blood-related issues.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Afternoon before sunset',
      precautions: ['Avoid lending money to maternal relations without formal documentation.', 'Never mistreat stray animals.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Jaggery Revadis, Flowing Water'
    },
    7: {
      upayTitle: 'Rose Water Eye Wash & Silver Square Harmony',
      remedy: 'Wash your eyes with pure rose water every morning; keep a pure silver square in your pocket.',
      issue: 'Mitigates 7th house Manglik heat, brings warmth to marriage, and calms partnership stress.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning after bath',
      precautions: ['Avoid wearing torn red garments.', 'Speak with patience and respect toward spouse.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Pure Rose Water, Silver Square'
    },
    8: {
      upayTitle: 'Mangal Badd 8-Sweet Tandoori Roti Upay',
      remedy: 'Bake 8 sweet rotis made with wheat flour and jaggery in an earthen oven and feed to stray dogs.',
      issue: 'Neutralizes severe Mangal Badd, sudden accidents, health hazards, and marriage friction.',
      duration: '43 Consecutive Days strictly without a break',
      timeOfDay: 'Strictly during daylight before sunset',
      precautions: ['Strictly NO non-vegetarian food, alcohol, or tobacco.', 'Do not wear red coral unless advised by a certified expert.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: '8 Sweet Tandoori Rotis, Jaggery'
    },
    9: {
      upayTitle: 'Gaumata Wheat-Jaggery Seva & Elder Honor',
      remedy: 'Feed holy cows with jaggery and whole wheat; respect elders and maternal/paternal uncles.',
      issue: 'Clears obstacles in destiny, foreign journeys, and higher accomplishments.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before 11:00 AM',
      precautions: ['Do not store rusted iron items under the bed.', 'Never disrespect father or teachers.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Whole Wheat, Jaggery, Holy Cow'
    },
    10: {
      upayTitle: 'Cardamom Milk & Ancestral Land Respect',
      remedy: 'Serve holy cows; distribute milk boiled with crushed cardamom; never sell ancestral land in anger.',
      issue: 'Activates exalted Mars strength, professional authority, and land acquisition.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight hours',
      precautions: ['Avoid disrespecting mentors, teachers, and senior officials.', 'Do not commit fraud in property dealings.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Cardamom Milk, Holy Cow'
    },
    11: {
      upayTitle: 'Copper Coin with Hole & Brass Ring',
      remedy: 'Wear a pure round copper coin with a central hole on a red thread, or wear a solid brass ring.',
      issue: 'Stabilizes fluctuating income and shields against deceitful friends.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Avoid giving false promises or taking unearned commissions.', 'Do not keep broken locks at home.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Copper Coin with Central Hole'
    },
    12: {
      upayTitle: 'Daily Morning Jaggery & Sweet Bread Daan',
      remedy: 'Consume a small pinch of jaggery with water before leaving home; feed sweet rotis to the needy.',
      issue: 'Protects from hidden expenses, sleep disturbances, and sudden foreign obstacles.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before leaving home',
      precautions: ['Avoid sleeping during daytime hours.', 'Keep the main entrance free of shoes and garbage.'],
      auspiciousDay: 'Tuesday',
      elementOrSubstance: 'Jaggery, Pure Water'
    }
  },

  Mercury: {
    1: {
      upayTitle: 'Budh Green Abstinence & Silver Harmony',
      remedy: 'Keep green decor away from bedroom; wear pure silver ring without joint.',
      issue: 'Sharpens analytical acumen and shields against erratic nervousness.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight hours',
      precautions: ['Avoid wearing dark green clothes on Wednesdays if Mercury is weak.', 'Do not keep caged birds at home.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Pure Silver Ring, Sacred Water'
    },
    2: {
      upayTitle: 'Silver Wire Nose/Ear Upay & Speculation Ban',
      remedy: 'Pierce nose or ears and wear a thin silver wire for 96 days (or keep a pure silver coin in wallet).',
      issue: 'Protects speech, stabilizes liquid wealth, and prevents impulsive decisions.',
      duration: '96 Days for silver wire / 43 Days for coin',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid gambling, high-risk speculation, and mockingly laughing at disabled individuals.', 'Never break promises.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Pure Silver Wire, Silver Coin'
    },
    3: {
      upayTitle: 'Alum (Fitkari) Dental Cleansing & Brass Bell',
      remedy: 'Clean your teeth with alum (फिटकरी) powder every morning; donate a brass bell in a temple.',
      issue: 'Clears throat, enhances communication diplomacy, and repairs sibling ties.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Early morning during hygiene routine',
      precautions: ['Do not plant broad-leaf indoor plants inside living spaces.', 'Never harbor malice against younger relatives.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Alum (Fitkari), Brass Bell'
    },
    4: {
      upayTitle: 'Soaked Whole Green Moong Dal for Birds',
      remedy: 'Feed soaked whole green moong dal to pigeons, goats, or birds every morning for 43 days.',
      issue: 'Aids family peace, mental clarity, and maternal prosperity.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before 9:30 AM',
      precautions: ['Avoid keeping defective electronic gadgets or empty glass bottles at home.', 'Do not use harsh speech at home.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Whole Green Moong Dal, Birds'
    },
    5: {
      upayTitle: 'Copper Coin on White Thread & Kanya Seva',
      remedy: 'Wear a pure round copper coin around your neck with a clean white thread; seek blessings of young girls (Kanya).',
      issue: 'Unlocks intellect, academic brilliance, and career recognition.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Never speak disrespectfully to young girls.', 'Avoid speculative betting or lotteries.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Copper Coin, White Thread, Kanya Pujan'
    },
    6: {
      upayTitle: 'Silver Ring Nose Piercing & Moong Matka Upay',
      remedy: 'Pierce nose with pure silver ring for 43 days or drop a small earthen pot (matka) filled with green moong into running river.',
      issue: 'Dissolves maternal side friction, nervous debility, and sudden business losses.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Afternoon before sunset',
      precautions: ['Avoid borrowing money from female relatives.', 'Never consume stale fermented foods.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Earthen Pot, Whole Green Moong, River'
    },
    7: {
      upayTitle: 'Kinnar (Eunuch) Blessings & Green Bangle Daan',
      remedy: 'Offer green bangles, green sweets, or clothes to eunuchs (Kinnar) and receive a one-rupee coin from their hand as a blessing.',
      issue: 'Resolves marital discord, business partnership conflicts, and trade blocks.',
      duration: 'Perform on auspicious Wednesdays / 43-day cycle',
      timeOfDay: 'Daylight between 10:00 AM and 4:00 PM',
      precautions: ['Never mock or disrespect transgender individuals.', 'Keep the blessed coin wrapped in green cloth in your cash box.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Green Bangles, Green Sweets, Blessed Coin'
    },
    8: {
      upayTitle: '8 Earthen Pots (Kulhad) Flowing River Upay',
      remedy: 'Drop 8 empty earthen pots (kulhad) with earthen lids into a flowing river for 43 consecutive days.',
      issue: 'Counteracts Budh in 8th house afflictions, anxiety, and unforeseen legal traps.',
      duration: '43 Consecutive Days without interruption',
      timeOfDay: 'Strictly before Sunset (never after dark)',
      precautions: ['Do not keep broken mirrors or cracked glass items at home.', 'Never consume intoxicating substances.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: '8 Earthen Kulhads, Flowing River'
    },
    9: {
      upayTitle: 'Yellow/Green Student Aid & Nose Piercing',
      remedy: 'Donate notebooks and stationery to underprivileged students; wear silver wire in nose for 43 days.',
      issue: 'Restores educational progress, dharmic wisdom, and commercial fortune.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid speaking untruths or exaggerating in business.', 'Do not keep wilted plants on balconies.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Stationery Books, Silver Wire'
    },
    10: {
      upayTitle: 'Tulsi Patra with Ganga Jal & Silver Coin',
      remedy: 'Consume a clean Tulsi leaf with Ganga Jal every morning; keep a pure silver coin in your wallet.',
      issue: 'Protects executive authority, professional focus, and administrative clarity.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning after bath',
      precautions: ['Never consume alcohol or non-vegetarian food in your workstation or office.', 'Do not disrespect business associates.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Holy Tulsi Leaf, Ganga Jal, Silver Coin'
    },
    11: {
      upayTitle: 'Copper Coin & Saree Gift to Sister',
      remedy: 'Wear a pure copper coin; gift green sarees and gifts to your real sisters, daughters, or aunts on festivals.',
      issue: 'Boosts commercial profits, commission business, and multi-channel revenue.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Avoid fraudulent accounting or cheating partners in trade.', 'Never break business ethics.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Pure Copper Coin, Green Saree'
    },
    12: {
      upayTitle: 'Empty Earthen Pitcher (Kaccha Ghada) River Upay',
      remedy: 'Float a new, empty earthen pitcher (kaccha ghada) with its lid into a flowing river.',
      issue: 'Stops mysterious monetary drain, chronic insomnia, and hidden anxieties.',
      duration: '43 Consecutive Days (or 8 Wednesdays)',
      timeOfDay: 'Afternoon before sunset',
      precautions: ['Avoid having a toilet in the north or northeast direction of your home.', 'Do not keep broken watches on walls.'],
      auspiciousDay: 'Wednesday',
      elementOrSubstance: 'Empty Earthen Pitcher, River Water'
    }
  },

  Jupiter: {
    1: {
      upayTitle: 'Saffron & Turmeric Tilak Harmony',
      remedy: 'Apply saffron (kesar) or turmeric (haldi) paste on your forehead, throat, and navel every morning after bath.',
      issue: 'Bestows spiritual wisdom, charismatic respect, and ethical triumphs.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Early morning after bath',
      precautions: ['Never accept religious scripture or books for free (always pay a token coin).', 'Strictly avoid alcohol and non-vegetarian food.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Pure Saffron, Turmeric Paste'
    },
    2: {
      upayTitle: 'Temple Chana Dal & Haldi Daan',
      remedy: 'Donate turmeric powder, yellow chana dal, or gram flour in a temple on Thursdays.',
      issue: 'Solidifies ancestral wealth, pure speech, and auspicious family expansion.',
      duration: '43 Consecutive Days (or 16 Thursdays)',
      timeOfDay: 'Morning between 8:00 AM and 11:30 AM',
      precautions: ['Never disrespect priests, teachers, gurus, or elderly family members.', 'Do not accept free meals from unethical sources.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Yellow Chana Dal, Turmeric Powder'
    },
    3: {
      upayTitle: 'Yellow Sandalwood & Cow Chana Dal Seva',
      remedy: 'Apply yellow sandalwood paste on forehead; feed soaked yellow Bengal gram (chana dal) to holy cows.',
      issue: 'Protects courage, clears creative blocks, and maintains sibling unity.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Never speak disrespectfully of spiritual masters.', 'Do not keep dry yellow flowers in your puja room.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Yellow Sandalwood, Soaked Chana Dal'
    },
    4: {
      upayTitle: 'Elder Guru Milk Seva & Brass Vessels',
      remedy: 'Serve saffron-infused warm milk to elderly teachers or donate pure brass utensils in a temple.',
      issue: 'Brings domestic happiness, real estate stability, and emotional contentment.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Do not store non-veg or liquor in your residential kitchen.', 'Avoid disrespecting mother or maternal elders.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Saffron Milk, Brass Utensil'
    },
    5: {
      upayTitle: 'Temple Seva & Free Book Donation for Children',
      remedy: 'Clean the floors of a temple or religious place with clean water; donate textbooks to needy students.',
      issue: 'Empowers progeny, intellect, higher learning, and auspicious karma.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Never accept unearned alms or financial handouts.', 'Avoid vanity regarding your knowledge.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Educational Books, Temple Water Seva'
    },
    6: {
      upayTitle: 'Peepal Tree Water & Yellow Gram Cow Seva',
      remedy: 'Offer water to the roots of a Peepal tree without touching it on Thursdays; feed holy cows with yellow gram dal.',
      issue: 'Overcomes professional stagnations, debt entanglements, and digestive ailments.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before 10:30 AM',
      precautions: ['Do not accept gifts from maternal uncles without paying a symbolic coin in return.', 'Avoid taking heavy unpayable loans.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Peepal Tree, Yellow Gram Dal'
    },
    7: {
      upayTitle: 'Yellow Cloth Guru Honor & Saffron Tilak',
      remedy: 'Offer yellow clothes or sweets to father-in-law or senior mentors; apply saffron tilak daily.',
      issue: 'Maintains harmonious marital bonds, spouse health, and ethical partnerships.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid arrogance in marital discussions.', 'Never disrespect father-in-law or elders.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Yellow Cloth, Saffron Paste'
    },
    8: {
      upayTitle: 'Gold/Brass Coin in Yellow Cloth & Peepal Seva',
      remedy: 'Keep a pure gold or polished brass coin wrapped in yellow cloth; plant a Peepal tree in a public garden.',
      issue: 'Protects longevity, prevents sudden wealth destruction, and shields from occult influences.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Never consume food in cremation grounds or funeral ceremonies unless strictly obligatory.', 'Avoid liquor completely.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Gold/Brass Coin, Yellow Cloth'
    },
    9: {
      upayTitle: 'Pakka Ghar Brihaspati Vishnu Puja & Gold Seva',
      remedy: 'Visit temple daily; offer chana dal and saffron to Lord Vishnu; wear a gold or brass chain around your neck.',
      issue: 'Activates supreme ninth-house fortune, ancestral luck, and spiritual growth.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Sunrise to 10:00 AM',
      precautions: ['Never break solemn religious oaths or vows.', 'Do not disrespect father, gurus, or holy traditions.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Chana Dal, Saffron, Gold Chain'
    },
    10: {
      upayTitle: 'Yellow Brass Pendant & Curd Head Wash',
      remedy: 'Wear a yellow sapphire or pure brass pendant; wash your head with curd/buttermilk before attending vital events.',
      issue: 'Enhances administrative recognition, public standing, and career promotion.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before leaving for work',
      precautions: ['Avoid building a home directly adjacent to religious shrines or tombs.', 'Do not accept bribes.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Brass Pendant, Curd'
    },
    11: {
      upayTitle: 'Brass Tumbler Water & Yellow Handkerchief',
      remedy: 'Drink water from a clean brass tumbler; keep a clean yellow handkerchief in your pocket.',
      issue: 'Brings steady commercial profits, senior mentor backing, and fulfills desires.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Strictly avoid eating non-vegetarian food or drinking alcohol.', 'Never engage in deceptive business deals.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Brass Tumbler, Yellow Handkerchief'
    },
    12: {
      upayTitle: 'Saffron Cord Neck Protection & Twilight Vigil',
      remedy: 'Wear a pure saffron-dyed cotton thread around your neck; never sleep during evening twilight.',
      issue: 'Controls runaway expenditures, averts judicial fines, and clears mental restlessness.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Avoid keeping rusted brass or unpolished gold items at home.', 'Do not disrespect spiritual gurus.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Saffron Cord, Pure Brass'
    }
  },

  Venus: {
    1: {
      upayTitle: 'Fragrant White Attire & Temple Ghee Daan',
      remedy: 'Wear clean, well-ironed, fragrant white clothes; donate pure cow’s ghee, curd, or camphor in a temple.',
      issue: 'Enriches personal aura, romantic attraction, and artistic excellence.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning after bath',
      precautions: ['Avoid wearing unwashed, torn, or crushed garments.', 'Maintain clean personal hygiene and dental care.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'Cow Ghee, Camphor, White Flowers'
    },
    2: {
      upayTitle: 'White Cow Fodder & Wheat Peda Seva',
      remedy: 'Feed fresh green fodder or wheat dough balls (peda) to a white cow every morning for 43 days.',
      issue: 'Multiplies family wealth, material luxuries, and harmonious relationships.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before 10:30 AM',
      precautions: ['Avoid extramarital affairs, crude language, and deceitful promises.', 'Respect women in family.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'Green Fodder, Wheat Peda, White Cow'
    },
    3: {
      upayTitle: 'Elder Women Blessings & Scented Flowers',
      remedy: 'Touch the feet of elderly women and seek their blessings; keep fresh white fragrant flowers in the living room.',
      issue: 'Protects courage, fosters artistic creativity, and eliminates relationship doubts.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Never disrespect wife, sister, or female colleagues.', 'Do not use foul language in front of family.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'White Fragrant Flowers, White Sweets'
    },
    4: {
      upayTitle: 'White Cow Rice-Mishri Seva & Mustard Upay',
      remedy: 'Feed white cows with boiled rice mixed with milk and sugar candy (mishri); drop 100g white mustard in running stream.',
      issue: 'Restores domestic peace, luxurious vehicle ownership, and maternal joy.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid dark and damp bathrooms.', 'Do not store wet clothes inside the bedroom.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'Rice, Mishri, White Mustard'
    },
    5: {
      upayTitle: 'Milk & White Sweets for Young Girls',
      remedy: 'Donate pure milk and white sweets (rasgulla / peda) to young girls; serve parents-in-law with respect.',
      issue: 'Protects progeny happiness, creative romance, and financial stability.',
      duration: '43 Consecutive Days (or 8 Fridays)',
      timeOfDay: 'Daylight before sunset',
      precautions: ['Avoid deceitful romantic relations.', 'Never adopt children through illicit means.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'White Sweets, Milk, Young Girls'
    },
    6: {
      upayTitle: 'White Flowers Drain Upay & Temple Milk Daan',
      remedy: 'Drop 6 white/blue flowers into flowing water or donate fresh cow milk in a temple on Fridays.',
      issue: 'Pacifies Venus in 6th house afflictions, relationship litigation, and kidney vulnerabilities.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight before sunset',
      precautions: ['Avoid keeping expired cosmetics or broken perfume bottles at home.', 'Never insult female staff.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'White Flowers, Cow Milk'
    },
    7: {
      upayTitle: 'Pakka Ghar Shukra White Cow Daily Feeding',
      remedy: 'Offer a portion of your first meal to a white cow daily; keep a solid square pure silver piece in purse.',
      issue: 'Guarantees marital bliss, business prosperity, and charismatic luxury.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before consuming lunch',
      precautions: ['Maintain pristine personal hygiene and dental cleanliness.', 'Never insult spouse or partner.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'First Roti for Cow, Solid Silver Square'
    },
    8: {
      upayTitle: 'Temple Mawa Sweets & Cow Donation Seva',
      remedy: 'Offer white sweets made of pure mawa in a temple; sponsor fodder for abandoned cows.',
      issue: 'Overcomes sudden marital friction, health shocks, and financial stagnation.',
      duration: '43 Consecutive Days (or 11 Fridays)',
      timeOfDay: 'Morning before noon',
      precautions: ['Never throw blue or black clothes in trash without washing them first.', 'Avoid excessive sensual indulgence.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'Pure Mawa Sweets, Gaumata Fodder'
    },
    9: {
      upayTitle: 'Neem Tree Silver Square Burial & Silver Ball',
      remedy: 'Bury a small square piece of pure silver under the root of a Neem tree or keep a silver ball with you.',
      issue: 'Unlocks fortune through female mentors, spouse luck, and travel abundance.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight before sunset',
      precautions: ['Avoid criticizing or mocking women in public.', 'Never engage in deceptive romantic relations.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'Pure Silver Square, Neem Tree'
    },
    10: {
      upayTitle: 'Temple Cotton, Curd & Camphor Daan',
      remedy: 'Donate raw cotton, fresh curd, and pure camphor in a temple on Fridays for 43 consecutive days.',
      issue: 'Counters Venus in 10th house career obstacles and builds commercial reputation.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before 11:00 AM',
      precautions: ['Strictly avoid illicit romantic engagements in the workplace.', 'Do not use abusive words with female workers.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'Raw Cotton, Curd, Pure Camphor'
    },
    11: {
      upayTitle: 'Mustard Oil & White Mustard Daan',
      remedy: 'Offer mustard oil and white mustard seeds in a temple on Saturdays and feed a white cow on Fridays.',
      issue: 'Attracts affluent social contacts, financial prosperity, and fulfilling friendships.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight hours',
      precautions: ['Avoid accepting free luxury cosmetics or designer clothing.', 'Do not borrow money from female friends.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'White Mustard, Mustard Oil'
    },
    12: {
      upayTitle: 'White Cow Fresh Butter & Mishri Seva',
      remedy: 'Feed holy white cows with fresh white homemade butter (makhan) and crystal sugar (mishri); keep solid silver piece.',
      issue: 'Prevents wasteful luxury spending and fosters profound emotional fulfillment.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Avoid speaking harsh or sarcastic words to your spouse.', 'Do not sleep on messy, unmade beds.'],
      auspiciousDay: 'Friday',
      elementOrSubstance: 'Homemade White Butter, Mishri'
    }
  },

  Saturn: {
    1: {
      upayTitle: 'Saturday Chhaya Daan & Mustard Oil Reflection',
      remedy: 'Gaze at your reflection in a bowl of mustard oil in an iron vessel and donate it on Saturdays; abstain from liquor/meat.',
      issue: 'Protects health, transforms obstacles into enduring patience, and avoids unprovoked controversies.',
      duration: '43 Consecutive Days (or 16 Saturdays)',
      timeOfDay: 'Saturday Dusk / Sunset',
      precautions: ['Never consume alcohol, meat, or fish.', 'Do not accept free iron, scrap, or leather items from anyone.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Mustard Oil, Iron Vessel, Shadow (Chhaya)'
    },
    2: {
      upayTitle: 'Black Dog Sweet Roti & Footwear Donation',
      remedy: 'Feed sweet rotis coated with mustard oil to black dogs for 43 days; donate sturdy leather footwear to poor laborers.',
      issue: 'Stops family property friction, speech harshness, and financial freezes.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Dusk before complete darkness',
      precautions: ['Never accept free oil, iron, or leather.', 'Do not lie or engage in fraudulent speech.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Mustard Oil Roti, Footwear'
    },
    3: {
      upayTitle: 'Black Dog Seva & Outward Horse Shoe Charm',
      remedy: 'Serve street dogs and stray black animals; install a genuine black horse shoe on the outer door facing outside.',
      issue: 'Boosts stamina, destroys fear of enemies, and protects younger siblings.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Saturday Evening',
      precautions: ['Never betray trusted servants or domestic workers.', 'Avoid unnecessary lawsuits.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Black Horse Shoe, Stray Dogs'
    },
    4: {
      upayTitle: 'Peepal Tree Milk/Water & Laborer Tea Seva',
      remedy: 'Offer milk mixed with water to the roots of a Peepal tree on Saturdays; serve hot tea and snacks to hard laborers.',
      issue: 'Pacifies 4th house Kantak Shani, safeguards mother’s health, and protects domestic peace.',
      duration: '43 Consecutive Days (except Sundays for Peepal)',
      timeOfDay: 'Saturday morning before 10:00 AM',
      precautions: ['Strictly avoid consuming liquor or eating meat at home.', 'Do not renovate roof or flooring during peak transit.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Peepal Tree, Raw Milk, Tea for Laborers'
    },
    5: {
      upayTitle: 'Salty Snacks for Poor Children & Roof Vigil',
      remedy: 'Distribute salty snacks (namkeen) to poor children; avoid rebuilding roof during major Shani dasha.',
      issue: 'Protects children’s career, calms academic anxiety, and eliminates speculation losses.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight hours',
      precautions: ['Avoid gambling, lotteries, and betting.', 'Never disrespect your father or mentors.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Salty Snacks, Poor Children'
    },
    6: {
      upayTitle: 'Black Dog Roasted Bread & Scrap Clearance',
      remedy: 'Feed mustard oil coated bread to black stray dogs for 43 days; remove all rusted iron and scrap from terrace.',
      issue: 'Neutralizes court cases, chronic illnesses, and workplace backbiting.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Sunset hours',
      precautions: ['Never store old broken machinery, junk, or scrap on your terrace or roof.', 'Do not mistreat domestic staff.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Mustard Bread, Stray Black Dog'
    },
    7: {
      upayTitle: 'Khand Bansuri Burial in Deserted Ground',
      remedy: 'Fill a bamboo flute (bansuri) with raw brown sugar (khand) and bury it in an uninhabited, deserted place.',
      issue: 'Harmonizes marital relations, overcomes business partnership disputes, and dissolves legal bitterness.',
      duration: 'Single auspicious execution with 43-day peaceful conduct',
      timeOfDay: 'Saturday evening before dark',
      precautions: ['Avoid entering into blind partnerships with strangers.', 'Never speak insultingly to your spouse.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Bamboo Flute, Raw Khand Sugar'
    },
    8: {
      upayTitle: '800g Black Urad / Iron Coins River Offering',
      remedy: 'Drop 800g whole black urad dal or 8 iron square coins into a flowing river for 8 consecutive Saturdays.',
      issue: 'Counters Ashtam Shani, prevents sudden physical shocks, and destroys long-term chronic hurdles.',
      duration: '8 Consecutive Saturdays without a gap',
      timeOfDay: 'Saturday afternoon before sunset',
      precautions: ['Strictly avoid alcohol, buffalo meat, and gambling.', 'Never walk in deserted cremation grounds after dark.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Whole Black Urad Dal, 8 Iron Coins'
    },
    9: {
      upayTitle: 'Flowing Water Lemon Offering & Cow Seva',
      remedy: 'Drop whole yellow lemons or raw rice into flowing river water; serve holy cows with green grass.',
      issue: 'Unblocks religious fortune, father’s health, and long-distance travel success.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight before sunset',
      precautions: ['Avoid hoarding discarded junk or coal in dark rooms.', 'Never disrespect spiritual traditions.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Yellow Lemons, Flowing River'
    },
    10: {
      upayTitle: 'Pakka Ghar Shani Visually Impaired Seva',
      remedy: 'Feed 10 visually impaired persons; donate warm black blankets in winter to homeless laborers.',
      issue: 'Activates supreme 10th house Saturn power, executive discipline, and long-term career triumph.',
      duration: '43 Consecutive Days (or 8 Saturdays)',
      timeOfDay: 'Saturday Evening',
      precautions: ['Never cheat domestic helpers, drivers, or blue-collar workers.', 'Avoid alcohol on Saturdays.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Black Blankets, Food for Blind'
    },
    11: {
      upayTitle: 'Iron Bowl Mustard Oil Daan & Bird Water',
      remedy: 'Donate mustard oil in an iron bowl after looking at your face; keep clean water in an iron bowl for birds.',
      issue: 'Secures high revenues, loyal friendships, and fulfills life aspirations.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Saturday Dusk',
      precautions: ['Avoid giving false witness or cheating in business contracts.', 'Do not borrow money from laborers.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Iron Bowl, Mustard Oil, Bird Water'
    },
    12: {
      upayTitle: '12 Almonds in Iron Box & Black Dog Roti',
      remedy: 'Tie 12 raw almonds in a black cloth and keep inside a dark iron box; feed sweet rotis to black cows/dogs for 43 days.',
      issue: 'Cuts uncontrollable expenditures, eliminates nighttime anxiety, and stabilizes foreign commerce.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Saturday Evening',
      precautions: ['Never sleep with head facing North.', 'Do not leave the bed disorganized in the morning.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: '12 Almonds, Iron Box, Black Dog Roti'
    }
  },

  Rahu: {
    1: {
      upayTitle: 'Silver Neck Chain & River Coconut Upay',
      remedy: 'Wear a pure solid silver chain around your neck; drop a raw brown coconut in flowing river water on Saturdays.',
      issue: 'Shields from confusion, erratic anxieties, toxic influences, and sudden shocks.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Saturday afternoon before sunset',
      precautions: ['Avoid hoarding broken electronic items, dead clocks, or old wiring.', 'Strictly avoid smoking and intoxicants.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Solid Silver Chain, Raw Coconut'
    },
    2: {
      upayTitle: 'Solid Silver Ball & Stray Dog Sweet Bread',
      remedy: 'Keep a solid pure silver ball in your pocket; feed sweet rotis to stray dogs.',
      issue: 'Protects savings from fraud, eliminates toxic speech, and eases in-law friction.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight hours',
      precautions: ['Never take loans or financial favors from in-laws.', 'Avoid tobacco and harsh sarcasm.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Solid Silver Ball, Stray Dogs'
    },
    3: {
      upayTitle: 'Silver Elephant Figurine & Coconut River Upay',
      remedy: 'Keep a small solid silver elephant figurine at home; float 4 raw coconuts in a flowing river.',
      issue: 'Boosts courageous clarity, destroys fear of competitors, and prevents sibling estrangement.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Saturday morning',
      precautions: ['Avoid quarreling with neighbors or colleagues.', 'Do not keep broken furniture.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Solid Silver Elephant, 4 Coconuts'
    },
    4: {
      upayTitle: '400g Coriander Seeds / Almonds River Offering',
      remedy: 'Drop 400g dry coriander seeds (dhaniya) or raw almonds into a flowing river for 43 days.',
      issue: 'Stops domestic chaos, maternal stress, and sudden real estate hurdles.',
      duration: '43 Consecutive Days without break',
      timeOfDay: 'Daylight before sunset',
      precautions: ['Never construct dark dingy toilets directly above the main entrance.', 'Avoid water leakages in kitchen.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: '400g Coriander Seeds / Almonds'
    },
    5: {
      upayTitle: 'Silver Elephant in Sacred Water Bowl',
      remedy: 'Keep a solid pure silver elephant immersed in a pure silver bowl filled with Ganga Jal or river water at home.',
      issue: 'Protects children, stops speculative addiction, and clears creative blockages.',
      duration: 'Permanent placement with 43-day daily viewing',
      timeOfDay: 'Morning hours',
      precautions: ['Avoid gambling, high-risk trading, and late-night screen addiction.', 'Treat children with patience.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Silver Elephant, Silver Bowl, Ganga Jal'
    },
    6: {
      upayTitle: 'Black Dog Bread & Lead (Sikka) Coin Upay',
      remedy: 'Feed black stray dogs with bread; keep a small piece of pure lead (sikka) in your pocket.',
      issue: 'Destroys hidden enemies, eliminates legal worries, and protects physical stamina.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Sunset hours',
      precautions: ['Avoid dark blue curtains or bedsheets in your master bedroom.', 'Never harbor resentment against staff.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Lead Coin (Sikka), Black Dog Bread'
    },
    7: {
      upayTitle: '7 Dry Coir Coconuts River Offering',
      remedy: 'Drop 7 dry coconuts with coir (nariyal) into a flowing river on Saturdays for 7 consecutive weeks.',
      issue: 'Dissolves 7th house Rahu illusions, marital mistrust, and business partner fraud.',
      duration: '7 Consecutive Saturdays',
      timeOfDay: 'Saturday afternoon before sunset',
      precautions: ['Never rush into sudden marriage decisions without matching charts.', 'Avoid deceit in partnerships.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: '7 Dry Coir Coconuts, River'
    },
    8: {
      upayTitle: '800g Raw Coal River Offering for 8 Saturdays',
      remedy: 'Drop 800g raw black coal (koyla) or 8 coconuts with husk into a flowing river on 8 consecutive Saturdays.',
      issue: 'Neutralizes catastrophic 8th house Rahu accidents, chronic illnesses, and psychic disturbances.',
      duration: '8 Consecutive Saturdays without missing',
      timeOfDay: 'Strictly between 2:00 PM and 5:00 PM',
      precautions: ['Strictly NO gambling, alcohol, or illicit dealings.', 'Never wear dark sunglasses after sunset.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: '800g Raw Coal, Flowing River'
    },
    9: {
      upayTitle: 'Saffron Tilak & Solid Silver Ring on Thumb',
      remedy: 'Apply pure saffron tilak on forehead; wear a solid jointless silver ring on your left thumb.',
      issue: 'Restores ancestral fortune, clears misunderstandings with elders, and unblocks destiny.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning after bath',
      precautions: ['Never disrespect your grandfather, father, or spiritual mentors.', 'Do not accept unearned gifts.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Pure Saffron, Solid Silver Ring'
    },
    10: {
      upayTitle: 'White Head Covering & Blind Service Seva',
      remedy: 'Cover your head with a clean white cap/scarf during prayers; feed 10 visually impaired persons.',
      issue: 'Protects professional standing from toxic office politics and sudden demotions.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid consuming alcohol or partying with dishonest coworkers.', 'Do not break company rules.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'White Cap, Food for Visually Impaired'
    },
    11: {
      upayTitle: 'Jointless Silver Ring & Silver Glass Water',
      remedy: 'Wear a pure silver ring without a solder joint; drink fresh water from a pure silver glass.',
      issue: 'Stops sudden losses of major earnings and repels treacherous acquaintances.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Avoid buying second-hand or damaged electronics on Saturdays.', 'Do not engage in deceptive commerce.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: 'Pure Silver Glass, Jointless Silver Ring'
    },
    12: {
      upayTitle: 'Pakka Ghar Rahu Floor Meal & Saunf Pillow Upay',
      remedy: 'Eat meals sitting on the floor inside the kitchen; place 1kg fennel seeds (saunf) in a red pouch under your pillow.',
      issue: 'Clears severe insomnia, nightmares, unwarranted hospital bills, and overseas confusion.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Night before sleeping',
      precautions: ['NEVER eat food while sitting on your bed.', 'Avoid clutter in the bedroom.'],
      auspiciousDay: 'Saturday',
      elementOrSubstance: '1kg Fennel Seeds (Saunf), Red Pouch'
    }
  },

  Ketu: {
    1: {
      upayTitle: 'Two-Tone Dog Sweet Bread & Saffron Tilak',
      remedy: 'Feed a black-and-white (two-tone) stray dog with sweet roti daily; apply saffron tilak on navel and forehead.',
      issue: 'Provides grounding, eliminates spinal/joint stiffness, and clears career disorientation.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before 10:00 AM',
      precautions: ['Never mistreat or beat stray dogs.', 'Avoid wearing multi-colored patchwork clothes.'],
      auspiciousDay: 'Sunday / Thursday',
      elementOrSubstance: 'Sweet Roti, Stray Two-Tone Dog'
    },
    2: {
      upayTitle: 'Saffron Tilak & Sesame Seed Bread Seva',
      remedy: 'Apply saffron tilak on forehead; feed stray dogs with wheat bread mixed with white/black sesame seeds.',
      issue: 'Protects accumulated savings, stops speech misunderstandings, and protects teeth/throat.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Avoid breaking solemn promises or swearing falsely.', 'Do not use abusive language.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Saffron, Sesame Seed Bread'
    },
    3: {
      upayTitle: 'Saffron Bananas River Upay & Yellow Fruits',
      remedy: 'Drop 3 ripe bananas dyed with saffron into a flowing river or donate yellow fruits in a temple.',
      issue: 'Destroys fear, restores sibling cooperation, and prevents travel delays.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight before noon',
      precautions: ['Avoid quarreling with younger relatives.', 'Do not wear damaged garments.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: '3 Bananas, Saffron, River'
    },
    4: {
      upayTitle: 'Yellow Blanket Temple Daan & Dog Seva',
      remedy: 'Donate a two-tone or yellow blanket and chana dal in a religious shrine; feed stray dogs.',
      issue: 'Brings domestic tranquility, heals maternal health worries, and secures real estate.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning hours',
      precautions: ['Avoid cruelty towards pets or stray animals.', 'Do not keep broken furniture in the home.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Yellow/Two-Tone Blanket, Chana Dal'
    },
    5: {
      upayTitle: 'Temple Milk & Banana Daan for Progeny',
      remedy: 'Donate fresh milk and yellow bananas in a religious place on Thursdays; chant spiritual hymns.',
      issue: 'Protects children, relieves exam stress, and opens profound spiritual insights.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid egoistic or cynical behavior with spiritual seekers.', 'Do not neglect children’s education.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Fresh Milk, Ripe Bananas'
    },
    6: {
      upayTitle: 'Pakka Ghar Ketu Gold Ring & Black-White Dog Seva',
      remedy: 'Wear a pure gold ring on the left ring finger; feed a black-and-white stray dog with sweet roti.',
      issue: 'Overcomes maternal side disputes, joint pains, and sudden business obstacles.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before 11:00 AM',
      precautions: ['Never keep damaged or rotten wooden items at home.', 'Do not take loans from maternal relatives.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Gold Ring, Sweet Roti, Stray Dog'
    },
    7: {
      upayTitle: '100 Stray Dogs Feeding & Household Pet Care',
      remedy: 'Feed stray dogs with sweet rotis or adopt and lovingly care for a black-and-white dog.',
      issue: 'Stabilizes marital understanding, protects partner’s health, and ensures fruitful travels.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Daylight hours',
      precautions: ['Avoid excessive pride or arrogance.', 'Never insult your spouse’s family.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Sweet Rotis, Stray Dogs'
    },
    8: {
      upayTitle: 'Black & White Checked Blanket Daan',
      remedy: 'Donate a black-and-white checked blanket to a poor person in a temple on Sundays; feed stray dogs.',
      issue: 'Protects from sudden surgery risks, urinary ailments, and occult hurdles.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Afternoon before sunset',
      precautions: ['Avoid wandering near cremation grounds or isolated ruins after dark.', 'Never consume intoxicants.'],
      auspiciousDay: 'Sunday',
      elementOrSubstance: 'Black & White Blanket, Stray Dogs'
    },
    9: {
      upayTitle: 'Gold Needle in Silver Box & Dog Wheat Seva',
      remedy: 'Keep a pure gold needle inside a pure silver box at home; feed stray dogs with plain wheat bread.',
      issue: 'Unlocks exceptional spiritual fortune, paternal blessings, and higher knowledge.',
      duration: 'Permanent placement with 43-day initial focus',
      timeOfDay: 'Morning hours',
      precautions: ['Never disrespect your son-in-law, nephew, or spiritual teachers.', 'Avoid breaking promises.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Gold Needle, Silver Box'
    },
    10: {
      upayTitle: 'Banyan Tree Sweet Milk & Cow-Dog Seva',
      remedy: 'Offer sweet milk to the roots of a Banyan tree; feed cows and street dogs every day.',
      issue: 'Protects professional longevity, executive respect, and prevents sudden career shifts.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid adultery or deceitful contracts in trade.', 'Never cheat elderly workers.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Sweet Milk, Banyan Tree'
    },
    11: {
      upayTitle: 'Gold Chain & Saffron Throat/Navel Tilak',
      remedy: 'Wear a pure gold chain around your neck; apply saffron tilak on your navel, throat, and forehead daily.',
      issue: 'Ensures continuous financial flow, spiritual mentors, and fulfilling friendships.',
      duration: '43 Consecutive Days',
      timeOfDay: 'Morning after bath',
      precautions: ['Avoid eating sour or excessively spicy foods on Thursdays.', 'Never break commitments.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: 'Gold Chain, Pure Saffron'
    },
    12: {
      upayTitle: 'Elder Saint Seva & 43 Tandoori Rotis for Dogs',
      remedy: 'Serve elderly holy saints or gurus; feed 43 sweet tandoori rotis to stray dogs over 43 consecutive days.',
      issue: 'Bestows spiritual liberation, profound meditation, and stops unwarranted financial drain.',
      duration: '43 Consecutive Days without interruption',
      timeOfDay: 'Morning before noon',
      precautions: ['Avoid sleeping with feet pointing towards the puja room.', 'Never mistreat spiritual seekers.'],
      auspiciousDay: 'Thursday',
      elementOrSubstance: '43 Sweet Tandoori Rotis, Saint Seva'
    }
  }
};

// ============================================================================
// 3. STRICT DOSHA-TO-LAL KITAB SYNCHRONIZATION
// ============================================================================
export function evaluateLalKitabDoshaRemedies(
  manglik: ManglikDetails,
  sadeSati: SadeSatiDetails,
  kaalSarp: KaalSarpDetails
): LalKitabDoshaPrescription[] {
  const prescriptions: LalKitabDoshaPrescription[] = [];

  // A. Manglik Dosha Lal Kitab Specifics
  if (manglik.isManglik) {
    if (manglik.severity === 'High') {
      prescriptions.push({
        doshaType: 'Manglik',
        status: 'High Kuja Affliction (Lagna & Chandra)',
        title: 'Mangal Badd 43-Day Tandoori Meethi Roti Upay',
        hindiTitle: '४३ दिवसीय तंदूरी मीठी रोटी मंगल बद्द उपाय',
        prescribedUpay: 'Bake 43 sweet rotis made with wheat flour and pure jaggery in an earthen tandoor/oven and feed one sweet roti to stray dogs or crows each morning for 43 consecutive days without missing a single sunrise cycle. Keep a square piece of pure solid silver in your wallet.',
        cycleRule: '43 Consecutive Days strictly without breaking the sequence',
        timeOfDayRule: 'Strictly during daylight hours between sunrise and 11:30 AM (never after sunset)',
        precautions: [
          'Strictly abstain from non-vegetarian food, alcohol, and tobacco.',
          'Never store rusty knives, broken scissors, or scrap weapons in your residence.',
          'Do NOT wear a Red Coral (Moonga) without Dr. Preeti Sehgal’s direct verification.'
        ],
        rationale: 'In Lal Kitab, fiery unbridled Mars is converted into Mangal Nek (benefic) by elemental substitution of sweet jaggery (Sun/Mars harmony) fed to street dogs (Ketu/Saturn pacifiers).'
      });
    } else {
      prescriptions.push({
        doshaType: 'Manglik',
        status: 'Partial / Low Manglik Affliction',
        title: 'Jaggery Revadis & Banyan Tree Milk Seva',
        hindiTitle: 'गुड़ रेवड़ी जल प्रवाह एवं बरगद दुग्ध सेवा',
        prescribedUpay: 'Drop 43 jaggery revadis or sweet batashas into flowing river water; offer raw milk mixed with sweet water to the roots of a Banyan (Bargad) tree and apply wet earth tilak on your forehead.',
        cycleRule: '43 Consecutive Days or 7 Tuesdays',
        timeOfDayRule: 'Morning hours before 1:00 PM',
        precautions: [
          'Avoid aggressive arguments with your partner on Tuesdays.',
          'Wash your eyes with pure rose water every morning.'
        ],
        rationale: 'Soothes Martian heat across marriage axes using the cooling lunar properties of milk and sacred soil.'
      });
    }
  } else if (manglik.isCancelled) {
    prescriptions.push({
      doshaType: 'Manglik',
      status: 'Manglik Bhanga (Parashari & Lal Kitab Harmony)',
      title: 'Mangal Nek Surya Arghya & Saffron Tilak',
      hindiTitle: 'मंगल नेक सूर्य अर्घ्य एवं केसर तिलक',
      prescribedUpay: 'Apply saffron or red sandalwood tilak on your forehead daily; offer water to Surya Dev in a copper vessel to sustain the auspicious protective shield of the cancellation.',
      cycleRule: 'Ongoing daily morning practice',
      timeOfDayRule: 'Early morning within 1 hour of sunrise',
      precautions: [
        'Maintain warm and supportive relations with blood brothers and cousins.',
        'Avoid road rage or unnecessary disputes.'
      ],
      rationale: 'The Parashari Bhanga converts Mars from a destructive force to an auspicious guardian (Mangal Nek).'
    });
  }

  // B. Shani Sade Sati / Dhaiya Lal Kitab Specifics
  if (sadeSati.isActive) {
    if (sadeSati.phaseNumber === 2) {
      prescriptions.push({
        doshaType: 'Sade Sati',
        status: 'Peak Phase 2 (Janma Shani Conjunction)',
        title: '43-Day Peepal Raw Milk & Saturday Chhaya Daan',
        hindiTitle: '४३ दिवसीय पीपल दुग्ध अर्पण एवं छाया दान',
        prescribedUpay: 'Offer raw cow milk mixed with water to the roots of a Peepal tree for 43 consecutive days (except Sundays). On Saturdays at dusk, gaze at your face in a bowl filled with mustard oil in an iron vessel and donate it with a token coin (Chhaya Daan).',
        cycleRule: '43 Consecutive Days cycle for tree offering + Saturday Chhaya Daan',
        timeOfDayRule: 'Peepal milk at sunrise before 9:30 AM; Chhaya Daan strictly at Saturday Sunset/Dusk',
        precautions: [
          'Never shave, cut nails, or consume alcohol on Saturdays.',
          'Do not purchase mustard oil, iron scrap, or leather on Saturdays (donate only).',
          'Never cheat or mistreat domestic servants, laborers, or blue-collar workers.'
        ],
        rationale: 'Neutralizes the psychological and structural compression of Saturn conjunct the natal Moon via classical Lal Kitab shadow absorption and Peepal root pacification.'
      });
    } else if (sadeSati.phaseNumber === 1) {
      prescriptions.push({
        doshaType: 'Sade Sati',
        status: 'Phase 1 (Rising / 12th House Transit)',
        title: 'Black Urad & Mustard Coated Bread for Black Dogs',
        hindiTitle: 'काली उड़द एवं सरसों तेल रोटी श्वान सेवा',
        prescribedUpay: 'Feed mustard-oil-coated wheat rotis to stray black dogs and crows for 43 consecutive days; float 800g whole black urad dal in running river water on 8 Saturdays.',
        cycleRule: '43 Consecutive Days for dog feeding + 8 Saturdays for river offering',
        timeOfDayRule: 'Late afternoon / Dusk before complete sunset',
        precautions: [
          'Avoid taking major financial debts from informal private lenders.',
          'Do not accept free leather jackets, shoes, or iron gadgets.'
        ],
        rationale: 'Prevents wasteful expenditure and foreign sleep disturbances by anchoring Saturn’s 12th house transit energy.'
      });
    } else if (sadeSati.phaseNumber === 3) {
      prescriptions.push({
        doshaType: 'Sade Sati',
        status: 'Phase 3 (Setting / 2nd House Departure)',
        title: 'Blind Service & Black Blanket Footwear Daan',
        hindiTitle: 'नेत्रहीन सेवा एवं काले कंबल-जूता दान',
        prescribedUpay: 'Feed 10 visually impaired or underprivileged persons with warm meals; donate black wool blankets and sturdy footwear to elderly poor laborers on Saturdays.',
        cycleRule: '43 Days of mindful speech + 3 Saturday donations',
        timeOfDayRule: 'Saturday evening between 5:00 PM and 7:30 PM',
        precautions: [
          'Practice strict truthfulness and avoid speculative market bets.',
          'Avoid harsh words towards family elders.'
        ],
        rationale: 'Consolidates the permanent karmic lessons of the 7.5-year cycle, turning discipline into enduring wealth.'
      });
    } else if (sadeSati.type === 'Dhaiya') {
      prescriptions.push({
        doshaType: 'Sade Sati',
        status: `${sadeSati.phaseName}`,
        title: 'Fish Wheat Balls & 8 Iron Coins River Offering',
        hindiTitle: 'मत्स्य आहार एवं ८ लोहे के सिक्के जल प्रवाह',
        prescribedUpay: 'Feed 108 small wheat flour balls to fish in a pond/river daily for 43 days; drop 8 iron square pieces or raw coal in a flowing stream on Saturdays.',
        cycleRule: '43 Consecutive Days for fish feeding',
        timeOfDayRule: 'Morning daylight for fish; Saturday afternoon for iron/coal',
        precautions: [
          'Avoid renovating ceilings, roofs, or foundations during active Dhaiya.',
          'Never consume buffalo meat or intoxicating beverages.'
        ],
        rationale: 'Shields domestic peace and deep psychological stability during the 2.5-year 4th or 8th house Dhaiya transit.'
      });
    }
  }

  // C. Kaal Sarp Yoga Lal Kitab Specifics
  if (kaalSarp.isPresent) {
    prescriptions.push({
      doshaType: 'Kaal Sarp',
      status: `Active ${kaalSarp.yogaName} (${kaalSarp.type})`,
      title: 'Solid Silver Snake Ring & Kitchen Floor Meal Upay',
      hindiTitle: 'चांदी का सर्प छल्ला एवं रसोई भूमि भोजन नियम',
      prescribedUpay: `Wear a pure solid silver snake ring (बिना जोड़ का चांदी का छल्ला) on your little finger; take all main meals sitting on the floor inside the kitchen rather than on beds. Float 8 coconuts with coir in a flowing river on Saturday.`,
      cycleRule: '43 Consecutive Days of kitchen floor meals + 8 Saturday coconuts',
      timeOfDayRule: 'Daylight before sunset for river; meals during lunch/dinner',
      precautions: [
        'NEVER eat meals sitting on your bed or mattress.',
        'Avoid keeping broken electronics, dead batteries, or useless junk at home.',
        'Do not accept electronic gifts from unknown individuals.'
      ],
      rationale: 'In Lal Kitab, eating inside the kitchen calms Rahu (House 12 ruler) and honors Mars/Sun (the hearth), preventing the nodal axis from scattering life focus.'
    });
  }

  return prescriptions;
}

// ============================================================================
// 4. KARMIC DEBTS (LAL KITAB RIN KUNDLI) EVALUATION ENGINE
// ============================================================================
export function evaluateLalKitabKarmicDebts(planets: PlanetaryPosition[]): LalKitabKarmicDebt[] {
  const debts: LalKitabKarmicDebt[] = [];
  const getP = (name: string) => planets.find((p) => p.name === name);

  const sun = getP('Sun');
  const moon = getP('Moon');
  const mars = getP('Mars');
  const mercury = getP('Mercury');
  const jupiter = getP('Jupiter');
  const venus = getP('Venus');
  const saturn = getP('Saturn');
  const rahu = getP('Rahu');
  const ketu = getP('Ketu');

  // 1. Pitri Rin (Father’s / Ancestral Debt)
  // Triggered when Sun is in 9th/10th with malefic, or Jupiter/Sun conjunct with Rahu/Ketu/Saturn in 2nd/5th/9th/12th
  if (
    (sun && [9, 10].includes(sun.house) && (saturn?.house === sun.house || rahu?.house === sun.house || ketu?.house === sun.house)) ||
    (jupiter && [2, 5, 9, 12].includes(jupiter.house) && (rahu?.house === jupiter.house || ketu?.house === jupiter.house || saturn?.house === jupiter.house)) ||
    (sun && jupiter && sun.house === 9 && sun.dignity === 'Debilitated')
  ) {
    debts.push({
      id: 'pitri-rin',
      name: "Pitri Rin (Father's & Ancestral Karma)",
      hindiName: 'पितृ ऋण (पूर्वज दोष निवारण)',
      planetaryCause: 'Affliction of 9th/5th house or Sun/Jupiter hemmed with Rahu/Ketu/Saturn',
      detectedReason: 'Ancestral blessings obstructed by planetary affliction on dharma/father house.',
      karmicSymptoms: 'Unexplained delays in career recognition, lack of parental peace, or hurdles in family lineage.',
      collectiveFamilyRemedy: 'Collect equal money (or silver coins) from all living blood family members on the paternal side (all siblings, father, uncles) and donate collectively to build, clean, or renovate a community water well or temple shrine.',
      cycleRule: 'One-time collective family ritual + 43 days of daily Surya Arghya',
      precautions: [
        'Never disrespect father, paternal elders, or family traditions.',
        'Never change religious allegiance for commercial convenience.'
      ]
    });
  }

  // 2. Matri Rin (Mother’s Debt)
  // Triggered when Moon is in 4th/8th with Ketu/Rahu, or Ketu is in the 4th house
  if (
    (moon && ketu && moon.house === ketu.house) ||
    (ketu && ketu.house === 4) ||
    (moon && [4, 8].includes(moon.house) && (rahu?.house === moon.house || ketu?.house === moon.house))
  ) {
    debts.push({
      id: 'matri-rin',
      name: "Matri Rin (Mother's Debt)",
      hindiName: 'मातृ ऋण (मातृ शांति उपाय)',
      planetaryCause: 'Ketu or Rahu afflicting the Moon or the 4th Bhava (Chandra Pakka Ghar)',
      detectedReason: 'Ketu situated in 4th house or conjunct Moon, causing emotional turbulence.',
      karmicSymptoms: 'Persistent mental restlessness, domestic anxieties, financial volatility, or mother’s health distress.',
      collectiveFamilyRemedy: 'Collect equal pure silver coins or equal funds from all living blood family members and float them together into a holy river (such as Ganga or Yamuna) on a full moon (Purnima) day.',
      cycleRule: 'One-time collective river offering + 43 days of drinking water in silver glass',
      precautions: [
        'Never sell ancestral silver or pure river water.',
        'Never insult or speak harshly to your mother or elderly matriarchs.'
      ]
    });
  }

  // 3. Stri Rin (Wife / Female Karma Debt)
  // Triggered when Venus is in 2nd/7th with Rahu/Ketu/Sun, or Venus in 6th/8th afflicted
  if (
    (venus && [2, 7].includes(venus.house) && (rahu?.house === venus.house || ketu?.house === venus.house || sun?.house === venus.house)) ||
    (venus && [6, 8].includes(venus.house) && venus.dignity === 'Debilitated')
  ) {
    debts.push({
      id: 'stri-rin',
      name: "Stri Rin (Debt of Female Lineage & Spouse)",
      hindiName: 'स्त्री ऋण (नारी सम्मान एवं लक्ष्मी कृपा)',
      planetaryCause: 'Affliction to Venus in 2nd/7th house or debilitated Venus in 6th house',
      detectedReason: 'Venus afflicted by malefic conjunction in relationship or family wealth houses.',
      karmicSymptoms: 'Marital friction, delay in childbirth, sudden financial stalls, or domestic discord.',
      collectiveFamilyRemedy: 'Collect equal funds from all living blood family members and feed 100 holy white cows with fresh green fodder and wheat dough balls on a single Friday.',
      cycleRule: 'One-time collective Gaumata seva + 43 days of respectful conduct towards women',
      precautions: [
        'Never mock, demean, or speak insultingly to women in public or private.',
        'Maintain impeccable personal hygiene and avoid extramarital intimacy.'
      ]
    });
  }

  // 4. Bhratri / Rishtedari Rin (Brother & Sibling Debt)
  // Triggered when Mars or Mercury is afflicted by Ketu/Rahu in 3rd or 8th house
  if (
    (mars && [3, 8].includes(mars.house) && (rahu?.house === mars.house || ketu?.house === mars.house)) ||
    (mercury && [3, 8].includes(mercury.house) && (rahu?.house === mercury.house || ketu?.house === mercury.house))
  ) {
    debts.push({
      id: 'bhratri-rin',
      name: "Bhratri Rin (Sibling & Kinship Debt)",
      hindiName: 'भ्रातृ ऋण (भाई-बंधु सद्भाव)',
      planetaryCause: 'Mars or Mercury afflicted in 3rd/8th house by the nodal axis',
      detectedReason: 'Martial or communicative energy afflicted in sibling and courage houses.',
      karmicSymptoms: 'Estrangement from siblings, property disputes among relatives, or feeling unsupported in crises.',
      collectiveFamilyRemedy: 'Collect equal copper items or contributions from all blood brothers/cousins and donate for free medicine or medical relief camps for poor patients.',
      cycleRule: 'One-time family medical contribution + 43 days of feeding birds red lentils',
      precautions: [
        'Never initiate hostile litigation against blood siblings or cousins.',
        'Avoid hoarding rusted iron or broken knives at home.'
      ]
    });
  }

  // 5. Dev / Kudrati Rin (Debt to Nature & Divine Grace)
  // Triggered when Moon or Mars is in 6th house, or Ketu is in 6th/12th afflicted
  if (
    (moon && moon.house === 6) ||
    (mars && mars.house === 6 && mars.dignity === 'Debilitated') ||
    (ketu && [6, 12].includes(ketu.house) && (saturn?.house === ketu.house || rahu?.house === ketu.house))
  ) {
    debts.push({
      id: 'dev-rin',
      name: "Dev / Kudrati Rin (Debt to Nature & Divine Grace)",
      hindiName: 'देव / कुदरती ऋण (प्रकृति एवं जीव सेवा)',
      planetaryCause: 'Moon/Mars placed in the 6th house or Ketu afflicted in Moksha/Rina bhava',
      detectedReason: 'Elemental imbalance triggering sudden unexplained setbacks despite hard work.',
      karmicSymptoms: 'Sudden unexpected roadblocks, unexplained health dips, or recurring financial deadlocks.',
      collectiveFamilyRemedy: 'Feed 100 street dogs with sweet rotis baked in an earthen oven on a single day through collective family contribution.',
      cycleRule: 'One-time mass dog feeding + 43 days of daily bread for stray animals',
      precautions: [
        'Never harm or throw boiling water on stray animals or street dogs.',
        'Never waste clean water or leave kitchen food uncovered.'
      ]
    });
  }

  // 6. Guru / Ajanma Rin (Spiritual & Teacher’s Debt)
  // Triggered when Jupiter is in 2nd/5th/9th/12th and afflicted by Saturn or Rahu
  if (
    jupiter &&
    [2, 5, 9, 12].includes(jupiter.house) &&
    (saturn?.house === jupiter.house || rahu?.house === jupiter.house)
  ) {
    debts.push({
      id: 'guru-rin',
      name: "Guru / Ajanma Rin (Spiritual & Wisdom Debt)",
      hindiName: 'गुरु ऋण (विद्या एवं ज्ञान शुद्धि)',
      planetaryCause: 'Jupiter conjunct Saturn or Rahu in 2nd, 5th, 9th, or 12th house',
      detectedReason: 'Jupiter’s divine wisdom afflicted by shadowy or restrictive planetary influence.',
      karmicSymptoms: 'Difficulty completing education, lack of mentor support, or feeling spiritually disconnected.',
      collectiveFamilyRemedy: 'Collect equal amounts of yellow chana dal or yellow brass items from all family members and donate to a Vedic school, library, or gurukul for poor children.',
      cycleRule: 'One-time collective library/school donation + 43 days of saffron tilak',
      precautions: [
        'Never disrespect teachers, professors, gurus, or educational institutions.',
        'Strictly avoid accepting sacred religious scriptures without paying a fee.'
      ]
    });
  }

  return debts;
}

// ============================================================================
// 5. MASTER LAL KITAB RECOMMENDATION ENGINE
// ============================================================================
export function generateLalKitabPrescription(
  planets: PlanetaryPosition[],
  ascSignIndex: number,
  manglik: ManglikDetails,
  sadeSati: SadeSatiDetails,
  kaalSarp: KaalSarpDetails
): LalKitabPrescriptionProfile {
  // 1. Identify Lagna Lord
  const RASHI_LORDS = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];
  const lagnaLordName = RASHI_LORDS[ascSignIndex] || 'Sun';
  const lagnaLordPlanet = planets.find((p) => p.name === lagnaLordName) || planets[0];
  const lagnaLordHouse = lagnaLordPlanet.house || 1;

  // Retrieve Lagna Lord House-Specific Remedy
  const lagnaLordEntry = (LAL_KITAB_HOUSE_MATRIX[lagnaLordName] && LAL_KITAB_HOUSE_MATRIX[lagnaLordName][lagnaLordHouse]) || LAL_KITAB_HOUSE_MATRIX['Sun'][1];
  const lagnaLordRemedy: LalKitabHouseRemedy = {
    planet: lagnaLordName,
    hindiName: lagnaLordPlanet.hindiName || lagnaLordName,
    house: lagnaLordHouse,
    pakkaGhar: PAKKA_GHAR_MAP[lagnaLordName] || 1,
    isPakkaGhar: PAKKA_GHAR_MAP[lagnaLordName] === lagnaLordHouse,
    significance: `Lagna Lord (लग्न स्वामी) seated in House ${lagnaLordHouse}`,
    issue: lagnaLordEntry.issue,
    upayTitle: lagnaLordEntry.upayTitle,
    remedy: lagnaLordEntry.remedy,
    duration: lagnaLordEntry.duration,
    timeOfDay: lagnaLordEntry.timeOfDay,
    precautions: lagnaLordEntry.precautions,
    auspiciousDay: lagnaLordEntry.auspiciousDay,
    elementOrSubstance: lagnaLordEntry.elementOrSubstance
  };

  // 2. Select Key Focal House Remedies (Moon House, Sun House, Mars/Saturn House based on chart dynamics)
  const keyPlanets = ['Moon', 'Sun', 'Mars', 'Saturn', 'Jupiter'].filter((name) => name !== lagnaLordName);
  const keyHouseRemedies: LalKitabHouseRemedy[] = [];

  for (const pName of keyPlanets) {
    const pObj = planets.find((p) => p.name === pName);
    if (!pObj) continue;
    const hNum = pObj.house || 1;
    const matrixEntry = LAL_KITAB_HOUSE_MATRIX[pName] && LAL_KITAB_HOUSE_MATRIX[pName][hNum];
    if (matrixEntry) {
      keyHouseRemedies.push({
        planet: pName,
        hindiName: pObj.hindiName || pName,
        house: hNum,
        pakkaGhar: PAKKA_GHAR_MAP[pName] || 1,
        isPakkaGhar: PAKKA_GHAR_MAP[pName] === hNum,
        significance: `${pName} in House ${hNum} (${pObj.rashi})`,
        issue: matrixEntry.issue,
        upayTitle: matrixEntry.upayTitle,
        remedy: matrixEntry.remedy,
        duration: matrixEntry.duration,
        timeOfDay: matrixEntry.timeOfDay,
        precautions: matrixEntry.precautions,
        auspiciousDay: matrixEntry.auspiciousDay,
        elementOrSubstance: matrixEntry.elementOrSubstance
      });
    }
  }

  // 3. Evaluate Synchronized Dosha Prescriptions
  const doshaPrescriptions = evaluateLalKitabDoshaRemedies(manglik, sadeSati, kaalSarp);

  // 4. Evaluate Karmic Ancestral Debts (Rin)
  const karmicDebts = evaluateLalKitabKarmicDebts(planets);

  // 5. Consolidated Mandatory Parhez (Rules/Restrictions)
  const parhezSet = new Set<string>();
  lagnaLordRemedy.precautions.forEach((p) => parhezSet.add(p));
  keyHouseRemedies.slice(0, 3).forEach((r) => r.precautions.forEach((p) => parhezSet.add(p)));
  doshaPrescriptions.forEach((d) => d.precautions.forEach((p) => parhezSet.add(p)));
  karmicDebts.forEach((kd) => kd.precautions.forEach((p) => parhezSet.add(p)));

  // Add universal Lal Kitab foundational parhez rules
  parhezSet.add('Lal Kitab Rule: Never perform remedies after sunset unless specifically prescribed for Saturday night / dusk.');
  parhezSet.add('Cycle Rule: If a 43-day remedy cycle is interrupted on any day, you must restart from Day 1 to ensure karmic continuity.');

  const mandatoryParhez = Array.from(parhezSet);

  // 6. Build Summary String for Compact Representation & PDF
  const topDoshaUpay = doshaPrescriptions.length > 0 ? doshaPrescriptions[0].prescribedUpay : '';
  const summaryPrescription = `Strengthen Lagna Lord ${lagnaLordName} (in House ${lagnaLordHouse}): ${lagnaLordRemedy.remedy} (${lagnaLordRemedy.duration}, ${lagnaLordRemedy.timeOfDay}). ${topDoshaUpay ? `Dosha Priority: ${topDoshaUpay}` : ''} Essential Parhez: ${lagnaLordRemedy.precautions[0] || 'Never consume alcohol or unearned food'}.`;

  return {
    lagnaLordRemedy,
    keyHouseRemedies,
    doshaPrescriptions,
    karmicDebts,
    mandatoryParhez,
    summaryPrescription
  };
}
