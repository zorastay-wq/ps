import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Gem, 
  Palette, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Compass, 
  Clock, 
  Hash, 
  Flame, 
  ShieldCheck, 
  ShoppingBag, 
  RotateCcw, 
  Calendar, 
  ArrowRight,
  Sun,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export interface LuckyCharmSignData {
  id: string;
  nameEn: string;
  nameHi: string;
  symbol: string;
  elementEn: string;
  elementHi: string;
  rulerEn: string;
  rulerHi: string;
  dateRange: string;
  
  // 1. Lucky Crystal
  crystal: {
    nameEn: string;
    nameHi: string;
    sanskritName: string;
    colorHex: string;
    glowHex: string;
    benefitsEn: string;
    benefitsHi: string;
    wearingGuideEn: string;
    wearingGuideHi: string;
    mallProductId?: string;
  };

  // 2. Lucky Color
  color: {
    nameEn: string;
    nameHi: string;
    hex: string;
    secondaryHex: string;
    auricMeaningEn: string;
    auricMeaningHi: string;
    wardrobeTipEn: string;
    wardrobeTipHi: string;
    chakraEn: string;
    chakraHi: string;
  };

  // 3. Daily Mantra
  mantra: {
    sanskrit: string;
    transliteration: string;
    meaningEn: string;
    meaningHi: string;
    prescribedCount: number;
    bestTimeEn: string;
    bestTimeHi: string;
    frequencyHz: number;
  };

  // 4. Auspicious Extras
  luckyNumber: string;
  angelFrequency: string;
  auspiciousDirectionEn: string;
  auspiciousDirectionHi: string;
  goldenMuhurat: string;
  luckyHerbEn: string;
  luckyHerbHi: string;
}

export const LUCKY_CHARMS_DATA: LuckyCharmSignData[] = [
  {
    id: 'aries',
    nameEn: 'Aries',
    nameHi: 'मेष',
    symbol: '♈',
    elementEn: 'Fire',
    elementHi: 'अग्नि',
    rulerEn: 'Mars (Mangal)',
    rulerHi: 'मंगल',
    dateRange: 'Mar 21 - Apr 19',
    crystal: {
      nameEn: 'Red Jasper & Natural Red Coral',
      nameHi: 'लाल मूंगा एवं रक्तमणि',
      sanskritName: 'रक्त प्रवाल (Rakta Praval)',
      colorHex: '#DC2626',
      glowHex: 'rgba(220, 38, 38, 0.4)',
      benefitsEn: 'Neutralizes Mars doshas, ignites decisive courage, grounds fiery impulses, and shields against evil eye (Nazar).',
      benefitsHi: 'मंगल दोष का शमन करता है, आत्मबल व निर्णय क्षमता बढ़ाता है, तथा नकारात्मक दृष्टि (नज़र) से अचूक रक्षा करता है।',
      wearingGuideEn: 'Wear set in Copper or Gold on the Ring Finger on Tuesday morning at sunrise after Surya Jal Arghya.',
      wearingGuideHi: 'मंगलवार प्रातः सूर्योदय पर तांबे या सोने में अनामिका अंगुली में धारण करें।'
    },
    color: {
      nameEn: 'Fiery Saffron & Radiant Scarlet',
      nameHi: 'केसरिया एवं शोणित लाल',
      hex: '#EA580C',
      secondaryHex: '#DC2626',
      auricMeaningEn: 'Activates Solar Plexus and Root chakras, infusing magnetic leadership and high stamina for conquering obstacles.',
      auricMeaningHi: 'मणिपुर व मूलाधार चक्र को जाग्रत कर नेतृत्व क्षमता, शारीरिक ऊर्जा और बाधाओं को परास्त करने का साहस प्रदान करता है।',
      wardrobeTipEn: 'Incorporate a saffron pocket square, scarf, or copper band into your day.',
      wardrobeTipHi: 'केसरिया रुमाल, वस्त्र या तांबे का कड़ा धारण करना विशेष लाभकारी रहेगा।',
      chakraEn: 'Root & Solar Plexus',
      chakraHi: 'मूलाधार एवं मणिपुर चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ क्रां क्रीं क्रौं सः भौमाय नमः ॥',
      transliteration: 'Om Kraam Kreem Kroum Sah Bhaumaaya Namah',
      meaningEn: 'Salutations to Mars, the divine dispenser of heroic vigor, real estate success, and triumphant will.',
      meaningHi: 'साहस, भूमि-भवन लाभ और विजय प्रदान करने वाले मंगल देव को सादर नमन।',
      prescribedCount: 108,
      bestTimeEn: '06:30 AM - 07:45 AM (Sunrise)',
      bestTimeHi: 'प्रातः 06:30 - 07:45 (सूर्योदय काल)',
      frequencyHz: 639
    },
    luckyNumber: '9 & 18',
    angelFrequency: '639 Hz (Heart Harmony)',
    auspiciousDirectionEn: 'South (Dakshin)',
    auspiciousDirectionHi: 'दक्षिण दिशा',
    goldenMuhurat: '07:15 AM - 08:45 AM',
    luckyHerbEn: 'Red Sandalwood (Rakta Chandan)',
    luckyHerbHi: 'रक्त चन्दन'
  },
  {
    id: 'taurus',
    nameEn: 'Taurus',
    nameHi: 'वृषभ',
    symbol: '♉',
    elementEn: 'Earth',
    elementHi: 'पृथ्वी',
    rulerEn: 'Venus (Shukra)',
    rulerHi: 'शुक्र',
    dateRange: 'Apr 20 - May 20',
    crystal: {
      nameEn: 'Natural White Zircon & Rose Quartz',
      nameHi: 'श्वेत जरकन एवं गुलाबी स्फटिक',
      sanskritName: 'श्वेत स्फटिक / वज्र (Vajra)',
      colorHex: '#FB7185',
      glowHex: 'rgba(251, 113, 133, 0.4)',
      benefitsEn: 'Enhances Venusian magnetism, heals relationship friction, attracts financial luxury, and melts stubborn stress.',
      benefitsHi: 'दांपत्य व प्रेम संबंधों में मिठास लाता है, ऐश्वर्य व धन आकर्षित करता है तथा मानसिक तनाव को शांत करता है।',
      wearingGuideEn: 'Wear in Silver on Middle or Little finger on Friday morning facing East.',
      wearingGuideHi: 'शुक्रवार प्रातः चांदी की अंगूठी में मध्यमा या कनिष्ठिका अंगुली में पूर्व दिशा की ओर मुख करके पहनें।'
    },
    color: {
      nameEn: 'Pastel Lotus Pink & Silk Ivory',
      nameHi: 'कमल गुलाबी एवं रेशमी श्वेत',
      hex: '#FB7185',
      secondaryHex: '#FDF2F8',
      auricMeaningEn: 'Soothes emotional turbulence, attracts cooperative allies, and enhances artistic intuition and grace.',
      auricMeaningHi: 'हृदय चक्र को संतुलित कर कलात्मक अंतर्दृष्टि, सौम्यता और सहयोगियों का स्नेह बढ़ाता है।',
      wardrobeTipEn: 'Wear soft pink hues, silver accessories, or spray natural rose attar.',
      wardrobeTipHi: 'गुलाबी या ऑफ-व्हाइट वस्त्र पहनें और प्राकृतिक गुलाब का इत्र लगाएं।',
      chakraEn: 'Heart (Anahata)',
      chakraHi: 'अनाहत (हृदय) चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ द्रां द्रीं द्रौं सः शुक्राय नमः ॥',
      transliteration: 'Om Draam Dreem Droum Sah Shukraaya Namah',
      meaningEn: 'Salutations to Venus, creator of aesthetic bliss, harmonious partnerships, and material abundance.',
      meaningHi: 'सौंदर्य, भौतिक सुख-समृद्धि और मधुर संबंधों के कारक शुक्र देव को नमन।',
      prescribedCount: 108,
      bestTimeEn: '09:00 AM - 10:30 AM',
      bestTimeHi: 'प्रातः 09:00 - 10:30 बजे',
      frequencyHz: 528
    },
    luckyNumber: '6 & 15',
    angelFrequency: '528 Hz (Miracle Tone)',
    auspiciousDirectionEn: 'South-East (Agneya)',
    auspiciousDirectionHi: 'आग्नेय (दक्षिण-पूर्व) कोण',
    goldenMuhurat: '09:30 AM - 11:00 AM',
    luckyHerbEn: 'White Lotus & Cardamom (Elaichi)',
    luckyHerbHi: 'सफेद कमल व छोटी इलायची'
  },
  {
    id: 'gemini',
    nameEn: 'Gemini',
    nameHi: 'मिथुन',
    symbol: '♊',
    elementEn: 'Air',
    elementHi: 'वायु',
    rulerEn: 'Mercury (Budh)',
    rulerHi: 'बुध',
    dateRange: 'May 21 - Jun 20',
    crystal: {
      nameEn: 'Natural Emerald & Green Aventurine',
      nameHi: 'पन्ना एवं हरित मणि',
      sanskritName: 'मरकत मणि (Marakata Mani)',
      colorHex: '#10B981',
      glowHex: 'rgba(16, 185, 129, 0.4)',
      benefitsEn: 'Unlocks persuasive eloquence, eliminates mental fog, boosts commercial negotiations, and stabilizes overthinking.',
      benefitsHi: 'वाक्पटुता व बुद्धिमत्ता बढ़ाता है, व्यापारिक समझौतों में लाभ देता है और अत्यधिक सोच-विचार से राहत देता है।',
      wearingGuideEn: 'Set in Gold or Bronze, wear on the Little Finger on Wednesday morning during Mercury hora.',
      wearingGuideHi: 'बुधवार प्रातः सोने या अष्टधातु में कनिष्ठिका अंगुली में धारण करें।'
    },
    color: {
      nameEn: 'Vivid Mint Green & Emerald Teal',
      nameHi: 'तोता हरा एवं टकसाली हरित',
      hex: '#10B981',
      secondaryHex: '#059669',
      auricMeaningEn: 'Stimulates the Throat chakra and neural pathways, enhancing quick memory retention and charismatic networking.',
      auricMeaningHi: 'विशुद्ध चक्र को सक्रिय कर त्वरित स्मरण शक्ति और प्रभावशाली संवाद कौशल विकसित करता है।',
      wardrobeTipEn: 'Wear a green jade bracelet or green accent necktie/accessory.',
      wardrobeTipHi: 'हरे रंग का वस्त्र या जेड ब्रेसलेट पहनना अत्यंत शुभ फल देगा।',
      chakraEn: 'Throat & Heart',
      chakraHi: 'विशुद्ध एवं हृदय चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः ॥',
      transliteration: 'Om Braam Breem Broum Sah Budhaaya Namah',
      meaningEn: 'Salutations to Mercury, lord of sharp intellect, trade mastery, and celestial logic.',
      meaningHi: 'तीक्ष्ण बुद्धि, विवेक और व्यापार के अधिपति बुध देव को सादर प्रणाम।',
      prescribedCount: 108,
      bestTimeEn: '10:00 AM - 11:30 AM',
      bestTimeHi: 'प्रातः 10:00 - 11:30 बजे',
      frequencyHz: 432
    },
    luckyNumber: '5 & 14',
    angelFrequency: '432 Hz (Cosmic Clarity)',
    auspiciousDirectionEn: 'North (Uttar)',
    auspiciousDirectionHi: 'उत्तर दिशा',
    goldenMuhurat: '10:15 AM - 11:45 AM',
    luckyHerbEn: 'Holy Basil (Tulsi leaves)',
    luckyHerbHi: 'तुलसी पत्र'
  },
  {
    id: 'cancer',
    nameEn: 'Cancer',
    nameHi: 'कर्क',
    symbol: '♋',
    elementEn: 'Water',
    elementHi: 'जल',
    rulerEn: 'Moon (Chandra)',
    rulerHi: 'चन्द्र',
    dateRange: 'Jun 21 - Jul 22',
    crystal: {
      nameEn: 'South Sea Pearl & Rainbow Moonstone',
      nameHi: 'सच्चा मोती एवं चंद्रकांत मणि',
      sanskritName: 'मुक्ता मणि (Mukta Mani)',
      colorHex: '#E2E8F0',
      glowHex: 'rgba(226, 232, 240, 0.5)',
      benefitsEn: 'Balances erratic mood swings, dissolves deep-seated anxiety, fortifies maternal bonds, and boosts psychic intuition.',
      benefitsHi: 'मानसिक अशांति व तनाव को शांत करता है, अंतर्ज्ञान को जागृत करता है और मन को स्थिर शांति प्रदान करता है।',
      wearingGuideEn: 'Set in pure Silver, wear on Little Finger on Monday evening facing North-West.',
      wearingGuideHi: 'सोमवार सायंकाल शुद्ध चांदी में कनिष्ठिका अंगुली में धारण करें।'
    },
    color: {
      nameEn: 'Luminescent Lunar White & Pearl Silver',
      nameHi: 'चांदी सा श्वेत एवं मोतिया क्रीम',
      hex: '#F8FAFC',
      secondaryHex: '#CBD5E1',
      auricMeaningEn: 'Purifies subconscious auric fields, radiating calming feminine grace and protective emotional sanctuary.',
      auricMeaningHi: 'मन को शीतलता प्रदान करता है, नकारात्मक तरंगों को सोखता है और भावनात्मक सुरक्षा देता है।',
      wardrobeTipEn: 'Wear clean white or silver tones, and drink water from a silver cup.',
      wardrobeTipHi: 'सफेद वस्त्र पहनें और चांदी के पात्र से जल ग्रहण करें।',
      chakraEn: 'Crown & Third Eye',
      chakraHi: 'सहस्रार एवं आज्ञा चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः ॥',
      transliteration: 'Om Shraam Shreem Shroum Sah Chandramaase Namah',
      meaningEn: 'Salutations to the Moon, ruler of emotional peace, serene intuition, and gentle vitality.',
      meaningHi: 'मन की शांति और अमृतमयी ऊर्जा के प्रदाता चंद्र देव को नमन।',
      prescribedCount: 108,
      bestTimeEn: '07:30 PM - 09:00 PM (Moonrise)',
      bestTimeHi: 'सायं 07:30 - 09:00 (चंद्रोदय समय)',
      frequencyHz: 741
    },
    luckyNumber: '2 & 11',
    angelFrequency: '741 Hz (Intuitive Awakening)',
    auspiciousDirectionEn: 'North-West (Vayavya)',
    auspiciousDirectionHi: 'वायव्य (उत्तर-पश्चिम) कोण',
    goldenMuhurat: '07:00 AM - 08:30 AM',
    luckyHerbEn: 'White Sandalwood & Camphor',
    luckyHerbHi: 'श्वेत चन्दन एवं कर्पूर'
  },
  {
    id: 'leo',
    nameEn: 'Leo',
    nameHi: 'सिंह',
    symbol: '♌',
    elementEn: 'Fire',
    elementHi: 'अग्नि',
    rulerEn: 'Sun (Surya)',
    rulerHi: 'सूर्य',
    dateRange: 'Jul 23 - Aug 22',
    crystal: {
      nameEn: 'Natural Burmese Ruby & Sunstone',
      nameHi: 'माणिक्य एवं सूर्यकांत मणि',
      sanskritName: 'माणिक्यम् (Manikyam)',
      colorHex: '#E11D48',
      glowHex: 'rgba(225, 29, 72, 0.4)',
      benefitsEn: 'Commands unyielding authority and respect, boosts executive vitality, attracts royal favor, and clears self-doubt.',
      benefitsHi: 'मान-सम्मान, पद-प्रतिष्ठा और पिता का आशीर्वाद दिलाता है, तथा आत्मबल को असीम ऊंचाई देता है।',
      wearingGuideEn: 'Set in Gold or Copper, wear on Ring Finger on Sunday morning during Sunrise.',
      wearingGuideHi: 'रविवार प्रातः सूर्योदय के समय सोने या तांबे में अनामिका अंगुली में पहनें।'
    },
    color: {
      nameEn: 'Royal Surya Gold & Saffron Ochre',
      nameHi: 'शाही स्वर्ण एवं केसरिया गेरुआ',
      hex: '#F59E0B',
      secondaryHex: '#EA580C',
      auricMeaningEn: 'Magnifies solar aura, commanding instant attention, executive respect, and unshakeable inner certainty.',
      auricMeaningHi: 'सूर्य देव की दिव्य रश्मियों को आकर्षित कर व्यक्तित्व में तेज, प्रभाव और अजेय आत्मविश्वास भरता है।',
      wardrobeTipEn: 'Wear a golden dial watch, amber scarf, or saffron tilak.',
      wardrobeTipHi: 'सुनहरे रंग की घड़ी, केसरिया रुमाल या माथे पर केसर का तिलक लगाएं।',
      chakraEn: 'Solar Plexus (Manipura)',
      chakraHi: 'मणिपुर (नाभि) चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः ॥',
      transliteration: 'Om Hraam Hreem Hroum Sah Sooryaaya Namah',
      meaningEn: 'Salutations to Lord Surya, the supreme cosmic soul, eternal source of health, honor, and radiant sovereignty.',
      meaningHi: 'समस्त जगत के प्राणस्वरूप, तेज और आरोग्यता के प्रदाता सूर्य देव को नमन।',
      prescribedCount: 108,
      bestTimeEn: '06:15 AM - 07:30 AM (Brahma/Surya Hora)',
      bestTimeHi: 'प्रातः 06:15 - 07:30 (सूर्य होरा)',
      frequencyHz: 852
    },
    luckyNumber: '1 & 10',
    angelFrequency: '852 Hz (Spiritual Order)',
    auspiciousDirectionEn: 'East (Purva)',
    auspiciousDirectionHi: 'पूर्व दिशा',
    goldenMuhurat: '06:15 AM - 07:45 AM',
    luckyHerbEn: 'Saffron & Red Lotus (Kesar)',
    luckyHerbHi: 'कश्मीरी केसर व लाल कमल'
  },
  {
    id: 'virgo',
    nameEn: 'Virgo',
    nameHi: 'कन्या',
    symbol: '♍',
    elementEn: 'Earth',
    elementHi: 'पृथ्वी',
    rulerEn: 'Mercury (Budh)',
    rulerHi: 'बुध',
    dateRange: 'Aug 23 - Sep 22',
    crystal: {
      nameEn: 'Green Jade & Natural Peridot',
      nameHi: 'हरिताश्म एवं पेरिडॉट',
      sanskritName: 'हरितोपल (Haritopala)',
      colorHex: '#84CC16',
      glowHex: 'rgba(132, 204, 22, 0.4)',
      benefitsEn: 'Relieves perfectionist burnout, brings precision to financial ledgers, and shields digestive vitality from stress.',
      benefitsHi: 'चिंता और तनाव को दूर कर व्यापार में सूक्ष्म योजना, हिसाब-किताब और उत्तम स्वास्थ्य में सहयोग करता है।',
      wearingGuideEn: 'Set in Silver or Panchdhatu on the Little Finger on Wednesday morning.',
      wearingGuideHi: 'बुधवार प्रातः चांदी या पंचधातु में कनिष्ठिका अंगुली में धारण करें।'
    },
    color: {
      nameEn: 'Earthy Olive & Forest Moss Green',
      nameHi: 'जैतून हरा एवं काईदार हरित',
      hex: '#65A30D',
      secondaryHex: '#15803D',
      auricMeaningEn: 'Grounds turbulent analytical currents, allowing systematic execution with calm mental composure.',
      auricMeaningHi: 'मानसिक भटकाव को रोककर कार्यों में स्थिरता, धैर्य और सूक्ष्म परिशुद्धता प्रदान करता है।',
      wardrobeTipEn: 'Wear olive-green clothing or carry a green jade tumbled stone in your left pocket.',
      wardrobeTipHi: 'जैतून हरे वस्त्र पहनें या बाईं जेब में हरा जेड स्टोन रखें।',
      chakraEn: 'Heart & Solar Plexus',
      chakraHi: 'हृदय एवं मणिपुर चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ ऐं श्रीं श्रीं बुधाय नमः ॥',
      transliteration: 'Om Aim Shreem Shreem Budhaaya Namah',
      meaningEn: 'Auspicious invocation for intellectual discernment, commercial wealth, and effortless accuracy.',
      meaningHi: 'विद्युत बुद्धि, व्यापारिक समृद्धि और सटीक कार्यक्षमता हेतु बुध देव का बीज मंत्र।',
      prescribedCount: 108,
      bestTimeEn: '11:00 AM - 12:30 PM',
      bestTimeHi: 'पूर्वाह्न 11:00 - 12:30 बजे',
      frequencyHz: 528
    },
    luckyNumber: '5 & 23',
    angelFrequency: '528 Hz (Cellular Renewal)',
    auspiciousDirectionEn: 'North-East (Ishan)',
    auspiciousDirectionHi: 'ईशान (उत्तर-पूर्व) कोण',
    goldenMuhurat: '02:30 PM - 04:00 PM',
    luckyHerbEn: 'Fresh Durva Grass & Lemongrass',
    luckyHerbHi: 'हरी दूर्वा घास'
  },
  {
    id: 'libra',
    nameEn: 'Libra',
    nameHi: 'तुला',
    symbol: '♎',
    elementEn: 'Air',
    elementHi: 'वायु',
    rulerEn: 'Venus (Shukra)',
    rulerHi: 'शुक्र',
    dateRange: 'Sep 23 - Oct 22',
    crystal: {
      nameEn: 'Natural White Sapphire & Australian Opal',
      nameHi: 'श्वेत पुखराज एवं ऑस्ट्रेलियन ओपल',
      sanskritName: 'श्वेत पुखराज (Shweta Pukhraj)',
      colorHex: '#06B6D4',
      glowHex: 'rgba(6, 182, 212, 0.4)',
      benefitsEn: 'Restores exquisite equilibrium in partnerships, enhances social diplomacy, and magnetizes lucrative luxury contracts.',
      benefitsHi: 'साझेदारी में संतुलन लाता है, सामाजिक आकर्षण बढ़ाता है और बड़े व्यावसायिक अवसरों को आकर्षित करता है।',
      wearingGuideEn: 'Set in Platinum or Silver, wear on Middle or Ring finger on Friday sunrise.',
      wearingGuideHi: 'शुक्रवार सूर्योदय पर प्लैटिनम या चांदी में मध्यमा अथवा अनामिका में पहनें।'
    },
    color: {
      nameEn: 'Turquoise Breeze & Silk Champagne',
      nameHi: 'फिरोजा नीला एवं शैंपेन श्वेत',
      hex: '#06B6D4',
      secondaryHex: '#F3E8FF',
      auricMeaningEn: 'Envelops your aura in harmonious charm, resolving disputes and opening doors in negotiations.',
      auricMeaningHi: 'आभा मंडल में आकर्षण और संतुलन भरता है, जिससे वाद-विवाद सुलझते हैं और सौदे सफल होते हैं।',
      wardrobeTipEn: 'Wear turquoise or pastel sky blue accessories with natural jasmine fragrance.',
      wardrobeTipHi: 'फिरोजा या आसमानी रंग के वस्त्र पहनें और चमेली का इत्र लगाएं।',
      chakraEn: 'Throat & Heart',
      chakraHi: 'विशुद्ध एवं अनाहत चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ शुं शुक्राय नमः ॥',
      transliteration: 'Om Shum Shukraaya Namah',
      meaningEn: 'Potent seed mantra to Venus for harmonic alignment, marital serenity, and refined luxury.',
      meaningHi: 'शुक्र ग्रह का शक्तिशाली बीज मंत्र जो आकर्षण, दांपत्य सुख और संपन्नता प्रदान करता है।',
      prescribedCount: 108,
      bestTimeEn: '04:15 PM - 05:45 PM',
      bestTimeHi: 'अपराह्न 04:15 - 05:45 बजे',
      frequencyHz: 639
    },
    luckyNumber: '6 & 24',
    angelFrequency: '639 Hz (Relational Alignment)',
    auspiciousDirectionEn: 'West (Pashchim)',
    auspiciousDirectionHi: 'पश्चिम दिशा',
    goldenMuhurat: '04:15 PM - 05:45 PM',
    luckyHerbEn: 'Jasmine Flowers & Rose Water',
    luckyHerbHi: 'चमेली व गुलाब जल'
  },
  {
    id: 'scorpio',
    nameEn: 'Scorpio',
    nameHi: 'वृश्चिक',
    symbol: '♏',
    elementEn: 'Water',
    elementHi: 'जल',
    rulerEn: 'Mars & Ketu (मंगल व केतु)',
    rulerHi: 'मंगल एवं केतु',
    dateRange: 'Oct 23 - Nov 21',
    crystal: {
      nameEn: 'Bloodstone & Red Carnelian',
      nameHi: 'रक्तोपल एवं लाल अकीक',
      sanskritName: 'रक्त अकीक (Rakta Aqeeq)',
      colorHex: '#991B1B',
      glowHex: 'rgba(153, 27, 27, 0.4)',
      benefitsEn: 'Transmutes turbulent emotional pressure into spiritual mastery, builds an auric shield against occult negativity.',
      benefitsHi: 'भीतरी भय व क्रोध को रचनात्मक शक्ति में बदलता है और किसी भी गुप्त नकारात्मक ऊर्जा से ढाल बनाता है।',
      wearingGuideEn: 'Set in Copper on Ring Finger on Tuesday afternoon or during sunset.',
      wearingGuideHi: 'मंगलवार को तांबे में अनामिका अंगुली में धारण करें।'
    },
    color: {
      nameEn: 'Deep Mystic Maroon & Rich Crimson',
      nameHi: 'गहरा महरूम एवं शोणित रक्त वर्ण',
      hex: '#991B1B',
      secondaryHex: '#450A0A',
      auricMeaningEn: 'Fortifies personal boundaries, deepens esoteric perception, and awakens unyielding perseverance.',
      auricMeaningHi: 'सीमाओं को सुरक्षित रखता है, गूढ़ रहस्यों को समझने की दृष्टि और अदम्य साहस देता है।',
      wardrobeTipEn: 'Wear dark maroon, burgundy, or carry a red carnelian pebble in your pocket.',
      wardrobeTipHi: 'गहरे महरूम या वाइन रंग के वस्त्र पहनें और लाल अकीक अपने पास रखें।',
      chakraEn: 'Root & Sacral',
      chakraHi: 'मूलाधार एवं स्वाधिष्ठान चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ क्रां क्रीं क्रौं सः भौमाय नमः ॥',
      transliteration: 'Om Kraam Kreem Kroum Sah Bhaumaaya Namah',
      meaningEn: 'Fierce invocation to Mars to vanquish hidden adversaries, dispel karmic fears, and grant unassailable strength.',
      meaningHi: 'शत्रु बाधा, आंतरिक भय और नकारात्मक प्रभावों को समाप्त करने वाला पराक्रमी मंत्र।',
      prescribedCount: 108,
      bestTimeEn: '08:00 AM - 09:30 AM',
      bestTimeHi: 'प्रातः 08:00 - 09:30 बजे',
      frequencyHz: 417
    },
    luckyNumber: '9 & 27',
    angelFrequency: '417 Hz (Negative Cleansing)',
    auspiciousDirectionEn: 'South (Dakshin)',
    auspiciousDirectionHi: 'दक्षिण दिशा',
    goldenMuhurat: '08:00 AM - 09:30 AM',
    luckyHerbEn: 'Cloves & Nutmeg (Laung & Jaiphal)',
    luckyHerbHi: 'लौंग एवं जायफल'
  },
  {
    id: 'sagittarius',
    nameEn: 'Sagittarius',
    nameHi: 'धनु',
    symbol: '♐',
    elementEn: 'Fire',
    elementHi: 'अग्नि',
    rulerEn: 'Jupiter (Brihaspati)',
    rulerHi: 'बृहस्पति (गुरु)',
    dateRange: 'Nov 22 - Dec 21',
    crystal: {
      nameEn: 'Natural Yellow Sapphire & Citrine',
      nameHi: 'पीला पुखराज एवं सुनेहला',
      sanskritName: 'पुष्पराज / गुरु रत्न (Pushparaga)',
      colorHex: '#EAB308',
      glowHex: 'rgba(234, 179, 8, 0.4)',
      benefitsEn: 'Attracts Guru Kripa, secures breakthrough academic and career growth, dissolves poverty consciousness, and blesses family progeny.',
      benefitsHi: 'गुरु कृपा दिलाता है, उच्च शिक्षा व करियर में बड़ी सफलता देता है, और संतान व धन-धान्य का सुख बढ़ाता है।',
      wearingGuideEn: 'Set in Gold or Brass on the Index Finger (Tarjani) on Thursday morning during Shukla Paksha.',
      wearingGuideHi: 'गुरुवार प्रातः शुक्ल पक्ष में सोने या पीतल में तर्जनी अंगुली में धारण करें।'
    },
    color: {
      nameEn: 'Sacred Turmeric Gold & Basanti Saffron',
      nameHi: 'हल्दी पीला एवं बसंती केसरिया',
      hex: '#EAB308',
      secondaryHex: '#F59E0B',
      auricMeaningEn: 'Radiates noble optimism, expands spiritual intellect, and magnetizes benevolent teachers and mentors.',
      auricMeaningHi: 'सकारात्मक दृष्टिकोण और उच्च ज्ञान को बढ़ाता है तथा समाज में पूज्यनीय स्थान दिलाता है।',
      wardrobeTipEn: 'Wear bright yellow or saffron clothing, or apply a sandalwood-turmeric tilak.',
      wardrobeTipHi: 'पीले या केसरिया वस्त्र पहनें और माथे पर हरि-चन्दन का तिलक लगाएं।',
      chakraEn: 'Crown & Solar Plexus',
      chakraHi: 'सहस्रार एवं मणिपुर चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः ॥',
      transliteration: 'Om Graam Greem Groum Sah Gurave Namah',
      meaningEn: 'Salutations to Brihaspati, supreme preceptor of celestial wisdom, cosmic prosperity, and righteous expansion.',
      meaningHi: 'ज्ञान, विवेक और सौभाग्य के दाता देवगुरु बृहस्पति को सादर नमन।',
      prescribedCount: 108,
      bestTimeEn: '07:30 AM - 09:00 AM (Guru Hora)',
      bestTimeHi: 'प्रातः 07:30 - 09:00 (गुरु होरा)',
      frequencyHz: 963
    },
    luckyNumber: '3 & 12',
    angelFrequency: '963 Hz (Divine Wisdom & Pineal)',
    auspiciousDirectionEn: 'North-East (Ishan)',
    auspiciousDirectionHi: 'ईशान (उत्तर-पूर्व) कोण',
    goldenMuhurat: '07:30 AM - 09:00 AM',
    luckyHerbEn: 'Turmeric Root & Peepal Leaf',
    luckyHerbHi: 'साबुत हल्दी की गांठ व पीपल पत्र'
  },
  {
    id: 'capricorn',
    nameEn: 'Capricorn',
    nameHi: 'मकर',
    symbol: '♑',
    elementEn: 'Earth',
    elementHi: 'पृथ्वी',
    rulerEn: 'Saturn (Shani)',
    rulerHi: 'शनि',
    dateRange: 'Dec 22 - Jan 19',
    crystal: {
      nameEn: 'Blue Sapphire & Black Obsidian',
      nameHi: 'नीलम एवं काला अकीक',
      sanskritName: 'इन्द्रनील मणि (Indraneela Mani)',
      colorHex: '#1E3A8A',
      glowHex: 'rgba(30, 58, 138, 0.4)',
      benefitsEn: 'Unleashes relentless discipline, neutralizes sudden business downfalls, rewards structured perseverance, and dispels Sade Sati dread.',
      benefitsHi: 'कठिन परिश्रम का पूर्ण फल दिलाता है, व्यापारिक संकटों से बचाता है और साढ़ेसाती के कष्टों को शांत करता है।',
      wearingGuideEn: 'Set in Iron or Silver on the Middle Finger (Madhyama) on Saturday twilight.',
      wearingGuideHi: 'शनिवार सायंकाल लोहे या अष्टधातु में मध्यमा अंगुली में धारण करें।'
    },
    color: {
      nameEn: 'Midnight Navy Blue & Steel Charcoal',
      nameHi: 'गहरा नेवी नीला एवं स्लेटी चारकोल',
      hex: '#1E3A8A',
      secondaryHex: '#334155',
      auricMeaningEn: 'Enforces unshakeable focus, builds resilience against setbacks, and anchors long-term empire building.',
      auricMeaningHi: 'कठिन परिस्थितियों में अडिग धैर्य, कार्य के प्रति निष्ठा और दीर्घकालिक सफलता सुनिश्चित करता है।',
      wardrobeTipEn: 'Wear dark navy blue or charcoal steel attire with minimalist metal touches.',
      wardrobeTipHi: 'नेवी ब्लू या चारकोल रंग के वस्त्र पहनें और काले तिल का दान करें।',
      chakraEn: 'Root (Muladhara)',
      chakraHi: 'मूलाधार चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः ॥',
      transliteration: 'Om Praam Preem Proum Sah Shanaishcharaaya Namah',
      meaningEn: 'Salutations to Lord Shani, righteous arbiter of karma, perseverance, justice, and lasting stability.',
      meaningHi: 'कर्मफल दाता, न्यायप्रिय और धैर्य के अधिपति शनि देव को सादर प्रणाम।',
      prescribedCount: 108,
      bestTimeEn: '05:30 PM - 07:00 PM (Twilight)',
      bestTimeHi: 'सायं 05:30 - 07:00 (गोधूलि वेला)',
      frequencyHz: 174
    },
    luckyNumber: '8 & 17',
    angelFrequency: '174 Hz (Deep Grounding)',
    auspiciousDirectionEn: 'West (Pashchim)',
    auspiciousDirectionHi: 'पश्चिम दिशा',
    goldenMuhurat: '05:00 PM - 06:30 PM',
    luckyHerbEn: 'Black Sesame & Mustard Seed',
    luckyHerbHi: 'काला तिल एवं सरसों'
  },
  {
    id: 'aquarius',
    nameEn: 'Aquarius',
    nameHi: 'कुंभ',
    symbol: '♒',
    elementEn: 'Air',
    elementHi: 'वायु',
    rulerEn: 'Saturn & Rahu (शनि व राहु)',
    rulerHi: 'शनि एवं राहु',
    dateRange: 'Jan 20 - Feb 18',
    crystal: {
      nameEn: 'Natural Amethyst & Lapis Lazuli',
      nameHi: 'जामुनिया एवं लाजवर्त',
      sanskritName: 'कटैला / जामुनिया (Katela)',
      colorHex: '#8B5CF6',
      glowHex: 'rgba(139, 92, 246, 0.4)',
      benefitsEn: 'Sparks visionary breakthroughs, shields neural systems from digital exhaustion, clears insomnia, and elevates higher consciousness.',
      benefitsHi: 'क्रांतिकारी विचारों को जन्म देता है, अनिद्रा व तनाव दूर करता है और अंतर्दृष्टि को तेज करता है।',
      wearingGuideEn: 'Set in Silver on Middle Finger on Saturday afternoon or carry an amethyst raw cluster.',
      wearingGuideHi: 'शनिवार को चांदी में मध्यमा अंगुली में पहनें या जामुनिया क्रिस्टल अपने कार्यस्थल पर रखें।'
    },
    color: {
      nameEn: 'Electric Cobalt & Cosmic Violet',
      nameHi: 'विद्युत नीला एवं गहरा बैंगनी',
      hex: '#2563EB',
      secondaryHex: '#7C3AED',
      auricMeaningEn: 'Awakens higher visionary channels, magnetizes forward-thinking innovators, and promotes humanitarian leadership.',
      auricMeaningHi: 'आज्ञा चक्र को खोलकर भविष्यगामी सोच और रचनात्मक अन्वेषण में मार्गदर्शन करता है।',
      wardrobeTipEn: 'Wear cobalt blue or royal violet with silver accents.',
      wardrobeTipHi: 'कोबाल्ट नीला या बैंगनी रंग पहनना आपके आभा मंडल को सशक्त करेगा।',
      chakraEn: 'Third Eye & Crown',
      chakraHi: 'आज्ञा एवं सहस्रार चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ शं शनैश्चराय नमः ॥',
      transliteration: 'Om Sham Shanaishcharaaya Namah',
      meaningEn: 'Potent seed sound to dissolve planetary friction, unlock detached wisdom, and attain steady spiritual growth.',
      meaningHi: 'शनि देव का एकाक्षरी बीज मंत्र जो जीवन की समस्त रुकावटों को समाप्त करता है।',
      prescribedCount: 108,
      bestTimeEn: '11:00 AM - 12:30 PM',
      bestTimeHi: 'पूर्वाह्न 11:00 - 12:30 बजे',
      frequencyHz: 852
    },
    luckyNumber: '8 & 22',
    angelFrequency: '852 Hz (Intuitive Vision)',
    auspiciousDirectionEn: 'West (Pashchim)',
    auspiciousDirectionHi: 'पश्चिम दिशा',
    goldenMuhurat: '11:00 AM - 12:30 PM',
    luckyHerbEn: 'Shami Leaves & Lavender',
    luckyHerbHi: 'शमी पत्र'
  },
  {
    id: 'pisces',
    nameEn: 'Pisces',
    nameHi: 'मीन',
    symbol: '♓',
    elementEn: 'Water',
    elementHi: 'जल',
    rulerEn: 'Jupiter (Brihaspati)',
    rulerHi: 'बृहस्पति (गुरु)',
    dateRange: 'Feb 19 - Mar 20',
    crystal: {
      nameEn: 'Natural Aquamarine & Clear Quartz',
      nameHi: 'एक्वामरीन एवं शुद्ध स्फटिक',
      sanskritName: 'स्फटिक मणि (Sphatika Mani)',
      colorHex: '#0D9488',
      glowHex: 'rgba(13, 148, 136, 0.4)',
      benefitsEn: 'Cleanses psychic emotional debris, deepens meditative stillness, sparks boundless artistic imagination, and promotes restful sleep.',
      benefitsHi: 'मन की नकारात्मकता को शुद्ध करता है, ध्यान व साधना को गहरा करता है तथा रचनात्मक शक्ति बढ़ाता है।',
      wearingGuideEn: 'Set in Silver or Gold on Index or Ring finger on Thursday sunrise.',
      wearingGuideHi: 'गुरुवार प्रातः चांदी या सोने में तर्जनी अथवा अनामिका में धारण करें।'
    },
    color: {
      nameEn: 'Seafoam Aqua & Radiant Sunrise Gold',
      nameHi: 'समुद्री जल हरित एवं स्वर्णिम प्रभात',
      hex: '#0D9488',
      secondaryHex: '#FBBF24',
      auricMeaningEn: 'Connects your spirit to oceanic abundance, dissolving fear and inviting miraculous synchronicities.',
      auricMeaningHi: 'ईश्वरीय कृपा और आध्यात्मिक शांति को आकर्षित कर जीवन में शुभ अवसरों की वर्षा करता है।',
      wardrobeTipEn: 'Wear sea-green, aqua, or light golden silk clothing with fresh sandalwood scent.',
      wardrobeTipHi: 'सी-ग्रीन या हल्के पीले वस्त्र पहनें और चन्दन का उपयोग करें।',
      chakraEn: 'Crown & Heart',
      chakraHi: 'सहस्रार एवं अनाहत चक्र'
    },
    mantra: {
      sanskrit: '॥ ॐ बृं बृहस्पतये नमः ॥',
      transliteration: 'Om Brim Brihaspataye Namah',
      meaningEn: 'Direct seed vibration to Brihaspati for spiritual bliss, boundless divine grace, and compassionate protection.',
      meaningHi: 'देवगुरु बृहस्पति का दिव्य बीज मंत्र जो सुख, शांति और सौभाग्य प्रदान करता है।',
      prescribedCount: 108,
      bestTimeEn: '06:30 AM - 08:00 AM (Morning Sandhya)',
      bestTimeHi: 'प्रातः 06:30 - 08:00 (प्रातः संध्या)',
      frequencyHz: 528
    },
    luckyNumber: '3 & 7',
    angelFrequency: '528 Hz (Universal Transformation)',
    auspiciousDirectionEn: 'North-East (Ishan)',
    auspiciousDirectionHi: 'ईशान (उत्तर-पूर्व) कोण',
    goldenMuhurat: '06:30 AM - 08:00 AM',
    luckyHerbEn: 'Sandalwood & Lotus Seed (Kamal Gatta)',
    luckyHerbHi: 'श्वेत चन्दन एवं कमलगट्टा'
  }
];

interface DailyLuckyCharmsProps {
  onOpenBooking: (serviceId?: string) => void;
  onStartChat: (astrologerName?: string) => void;
  onNavigateToShop?: () => void;
}

export const DailyLuckyCharms: React.FC<DailyLuckyCharmsProps> = ({
  onOpenBooking,
  onStartChat,
  onNavigateToShop
}) => {
  const { isHindi } = useLanguage();
  const { showSuccess, showInfo } = useToast();
  
  const [selectedSignId, setSelectedSignId] = useState<string>('aries');
  const [japaCount, setJapaCount] = useState<number>(0);
  const [isChantingPlaying, setIsChantingPlaying] = useState<boolean>(false);
  const [hasCopiedMantra, setHasCopiedMantra] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'crystal' | 'color' | 'mantra'>('all');

  const currentCharm = LUCKY_CHARMS_DATA.find((c) => c.id === selectedSignId) || LUCKY_CHARMS_DATA[0];

  // Reset japa counter on sign change
  useEffect(() => {
    setJapaCount(0);
    setHasCopiedMantra(false);
  }, [selectedSignId]);

  // Handle Japa Click
  const handleIncrementJapa = () => {
    if (japaCount < currentCharm.mantra.prescribedCount) {
      const nextCount = japaCount + 1;
      setJapaCount(nextCount);
      
      // Play a soft sacred bell chime using Web Audio API
      playBellSound(currentCharm.mantra.frequencyHz);

      if (nextCount === currentCharm.mantra.prescribedCount) {
        showSuccess(
          isHindi ? '108 जप पूर्ण! शुभ आशीर्वाद' : '108 Japa Complete! Divine Blessings',
          isHindi 
            ? `आपने ${currentCharm.nameHi} राशि के लिए संपूर्ण मंत्र साधना पूर्ण कर ली है।`
            : `You have completed the full 108 mantra cycle for ${currentCharm.nameEn}.`
        );
      }
    }
  };

  const handleResetJapa = () => {
    setJapaCount(0);
    showInfo(isHindi ? 'जप माला रीसेट की गई' : 'Mala Counter Reset');
  };

  // Web Audio API pure peaceful harmonic chime
  const playBellSound = (freq: number) => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq || 528, ctx.currentTime);
      
      // Gentle exponential decay like a Tibetan singing bowl
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  // Copy Mantra to Clipboard
  const handleCopyMantra = () => {
    const textToCopy = `${currentCharm.mantra.sanskrit}\n(${currentCharm.mantra.transliteration})\nMeaning: ${currentCharm.mantra.meaningEn}\n- Recommended for ${currentCharm.nameEn} by Dr. Preeti Sehgal`;
    navigator.clipboard.writeText(textToCopy);
    setHasCopiedMantra(true);
    showSuccess(
      isHindi ? 'मंत्र कॉपी कर लिया गया!' : 'Mantra Copied to Clipboard!',
      isHindi ? 'अब आप इसे अपने दैनिक पूजा क्रम में उपयोग कर सकते हैं।' : 'Ready to be used for your daily morning chanting ritual.'
    );
    setTimeout(() => setHasCopiedMantra(false), 3000);
  };

  // Simulated Chant Audio Loop
  const toggleAudioChant = () => {
    if (!isChantingPlaying) {
      setIsChantingPlaying(true);
      playBellSound(currentCharm.mantra.frequencyHz);
      showInfo(
        isHindi ? 'मंत्र उच्चारण स्वर चालू' : 'Sacred Frequency Playing',
        `${currentCharm.mantra.frequencyHz} Hz harmonic vibration`
      );
    } else {
      setIsChantingPlaying(false);
    }
  };

  return (
    <section 
      id="daily-lucky-charms" 
      className="py-16 sm:py-20 px-4 bg-gradient-to-b from-[#FFFDF9] via-[#FFF6EB] to-[#FFF0E0] dark:from-[#140501] dark:via-[#1B0702] dark:to-[#120400] text-[#7C2D12] dark:text-amber-100 border-t border-orange-200/80 dark:border-amber-950 relative overflow-hidden"
    >
      {/* Background Sacred Geometric Vectors */}
      <div className="absolute inset-0 pointer-events-none opacity-5 dark:opacity-10 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 500 500" className="w-[800px] h-[800px] text-[#EA580C] animate-spin-slow">
          <circle cx="250" cy="250" r="220" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
          <circle cx="250" cy="250" r="180" stroke="currentColor" strokeWidth="1" fill="none" />
          <polygon points="250,30 440,360 60,360" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <polygon points="250,470 60,140 440,140" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <circle cx="250" cy="250" r="80" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 border border-orange-300 dark:border-amber-700/80 bg-white/90 dark:bg-[#250903] px-4 py-1.5 rounded-full text-xs font-bold text-[#EA580C] dark:text-amber-300 tracking-[0.16em] uppercase shadow-xs mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#EA580C] animate-pulse" />
            <span>{isHindi ? 'दैनिक भाग्यशाली रक्षा कवच' : 'Daily Cosmic Protection & Charms'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-black text-[#431407] dark:text-amber-100 tracking-tight leading-tight">
            {isHindi ? (
              <>
                अपनी राशि का <span className="text-[#EA580C]">भाग्यशाली रत्न, रंग एवं बीज मंत्र</span> जानें
              </>
            ) : (
              <>
                Daily Lucky Charms: <span className="text-[#EA580C]">Crystal, Color & Mantra</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-[#7C2D12] dark:text-amber-200/90 mt-3.5 leading-relaxed font-normal">
            {isHindi 
              ? 'डॉ. प्रीति सहगल द्वारा वैदिक ग्रह गोचर एवं लाल किताब ऊर्जा सिद्धांतों पर आधारित दैनिक भाग्यशाली संकेत, जो आपके आभा मंडल (Aura) को नकारात्मक प्रभावों से सुरक्षित रखते हैं।'
              : 'Empower your morning routine with planetary aligned crystals, resonant color psychology, and consecrated Vedic mantras curated daily by Dr. Preeti Sehgal.'}
          </p>
        </div>

        {/* 12 Zodiac Sign Animated Selector */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-2.5 mb-10">
          {LUCKY_CHARMS_DATA.map((sign) => {
            const isSelected = selectedSignId === sign.id;
            return (
              <motion.button
                key={sign.id}
                onClick={() => setSelectedSignId(sign.id)}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-lg shadow-orange-500/25 ring-2 ring-amber-300 dark:ring-amber-400 font-bold scale-105'
                    : 'bg-white/90 dark:bg-[#1E0601] text-[#7C2D12] dark:text-amber-200 border-orange-200 dark:border-amber-900/80 hover:border-[#EA580C] hover:bg-orange-50/70'
                }`}
              >
                {/* Floating Zodiac Symbol */}
                <motion.span
                  className="text-xl select-none inline-block"
                  animate={isSelected ? {
                    y: [0, -3, 0],
                    scale: [1, 1.15, 1],
                    transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
                  } : undefined}
                >
                  {sign.symbol}
                </motion.span>
                <span className="font-playfair font-bold text-xs tracking-tight truncate w-full">
                  {isHindi ? sign.nameHi : sign.nameEn}
                </span>
                <span className={`text-[9px] uppercase tracking-wider font-semibold ${isSelected ? 'text-amber-100' : 'text-[#9A3412] dark:text-amber-400/80'}`}>
                  {isHindi ? sign.elementHi : sign.elementEn}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Sign Highlight Header Banner */}
        <div className="bg-white/95 dark:bg-[#1A0501] border border-orange-200/90 dark:border-amber-900/80 rounded-3xl p-6 sm:p-8 shadow-xl mb-8 relative overflow-hidden">
          
          {/* Subtle Color Accent Glow Bar */}
          <div 
            className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#EA580C] to-transparent"
            style={{ backgroundColor: currentCharm.color.hex }}
          />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-orange-100 dark:border-amber-900/50">
            <div className="flex items-center gap-4">
              {/* Dynamic Zodiac Floating Crest */}
              <motion.div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl shadow-md border-2 border-orange-300 dark:border-amber-600 shrink-0 relative overflow-hidden"
                style={{ 
                  background: `linear-gradient(135deg, ${currentCharm.color.hex}22, ${currentCharm.crystal.colorHex}33)`
                }}
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <span className="text-3xl sm:text-4xl text-[#EA580C] dark:text-amber-300 drop-shadow-sm select-none">
                  {currentCharm.symbol}
                </span>
              </motion.div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl sm:text-3xl font-playfair font-black text-[#431407] dark:text-amber-100">
                    {isHindi ? currentCharm.nameHi : currentCharm.nameEn}
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-orange-100 dark:bg-amber-950 text-[#EA580C] dark:text-amber-300 border border-orange-200 dark:border-amber-800">
                    {currentCharm.dateRange}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-[#7C2D12] dark:text-amber-200 font-medium">
                  <span>
                    <strong className="text-[#EA580C]">{isHindi ? 'स्वामी ग्रह:' : 'Ruler:'}</strong> {isHindi ? currentCharm.rulerHi : currentCharm.rulerEn}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-orange-300"></span>
                  <span>
                    <strong className="text-[#EA580C]">{isHindi ? 'तत्व:' : 'Element:'}</strong> {isHindi ? currentCharm.elementHi : currentCharm.elementEn}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-orange-300"></span>
                  <span>
                    <strong className="text-[#EA580C]">{isHindi ? 'दिशा:' : 'Direction:'}</strong> {isHindi ? currentCharm.auspiciousDirectionHi : currentCharm.auspiciousDirectionEn}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full lg:w-auto">
              <div className="bg-[#FFF9F2] dark:bg-[#250903] border border-orange-200 dark:border-amber-900/60 p-2.5 rounded-xl text-center">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#9A3412] dark:text-amber-300/80 block">
                  {isHindi ? 'भाग्यशाली अंक' : 'Lucky Number'}
                </span>
                <span className="text-base sm:text-lg font-black text-[#EA580C] dark:text-amber-200">
                  {currentCharm.luckyNumber}
                </span>
              </div>

              <div className="bg-[#FFF9F2] dark:bg-[#250903] border border-orange-200 dark:border-amber-900/60 p-2.5 rounded-xl text-center">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#9A3412] dark:text-amber-300/80 block">
                  {isHindi ? 'अमृत मुहूर्त' : 'Golden Muhurat'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#431407] dark:text-amber-200 truncate block">
                  {currentCharm.goldenMuhurat}
                </span>
              </div>

              <div className="bg-[#FFF9F2] dark:bg-[#250903] border border-orange-200 dark:border-amber-900/60 p-2.5 rounded-xl text-center">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#9A3412] dark:text-amber-300/80 block">
                  {isHindi ? 'शुभ औषधि' : 'Sacred Herb'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#431407] dark:text-amber-200 truncate block">
                  {isHindi ? currentCharm.luckyHerbHi : currentCharm.luckyHerbEn}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Core Lucky Charms Bento Cards (Crystal, Color, Mantra) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            
            {/* 1. LUCKY CRYSTAL / GEMSTONE CARD */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="relative bg-gradient-to-br from-[#FFFDF9] to-[#FFF7ED] dark:from-[#210702] dark:to-[#190401] rounded-2xl border-2 border-orange-200/90 dark:border-amber-900/80 p-5 sm:p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-amber-950 flex items-center justify-center text-[#EA580C]">
                      <Gem className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C2410C] dark:text-amber-400 block">
                        {isHindi ? 'दैनिक भाग्यशाली रत्न' : 'Lucky Crystal & Gem'}
                      </span>
                      <h4 className="font-playfair font-black text-lg text-[#431407] dark:text-amber-100">
                        {isHindi ? currentCharm.crystal.nameHi : currentCharm.crystal.nameEn}
                      </h4>
                    </div>
                  </div>

                  {/* Gem Visual Dot with Glow */}
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white dark:border-amber-900 shadow-md animate-pulse"
                    style={{ 
                      backgroundColor: currentCharm.crystal.colorHex,
                      boxShadow: `0 0 12px ${currentCharm.crystal.glowHex}`
                    }}
                  />
                </div>

                <div className="bg-white/80 dark:bg-[#2A0A03] border border-orange-100 dark:border-amber-900/50 rounded-xl p-3 mb-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A3412] dark:text-amber-400 block mb-0.5">
                    {isHindi ? 'संस्कृत वैदिक नाम' : 'Sanskrit Designation'}
                  </span>
                  <p className="font-serif font-bold text-sm text-[#EA580C] dark:text-amber-200">
                    {currentCharm.crystal.sanskritName}
                  </p>
                </div>

                <p className="text-xs text-[#7C2D12] dark:text-amber-200/90 leading-relaxed mb-4">
                  {isHindi ? currentCharm.crystal.benefitsHi : currentCharm.crystal.benefitsEn}
                </p>

                <div className="text-[11px] bg-orange-50 dark:bg-[#1C0501] border border-orange-200/70 dark:border-amber-950 p-2.5 rounded-lg text-[#9A3412] dark:text-amber-300">
                  <strong className="text-[#EA580C] block mb-0.5">{isHindi ? 'धारण विधि व अंगुली:' : 'How to Wear / Carry:'}</strong>
                  {isHindi ? currentCharm.crystal.wearingGuideHi : currentCharm.crystal.wearingGuideEn}
                </div>
              </div>

              {/* Shop / Consult CTA */}
              <div className="mt-5 pt-4 border-t border-orange-100 dark:border-amber-900/40 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (onNavigateToShop) {
                      onNavigateToShop();
                    } else {
                      onOpenBooking('gemstone-consultation');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EA580C] hover:text-[#C2410C] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{isHindi ? 'एस्ट्रोमॉल में अभिमंत्रित रत्न देखें' : 'View Energized Crystal in AstroMall'}</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </motion.div>

            {/* 2. LUCKY COLOR OF THE DAY CARD */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="relative bg-gradient-to-br from-[#FFFDF9] to-[#FFF7ED] dark:from-[#210702] dark:to-[#190401] rounded-2xl border-2 border-orange-200/90 dark:border-amber-900/80 p-5 sm:p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-amber-950 flex items-center justify-center text-[#EA580C]">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C2410C] dark:text-amber-400 block">
                        {isHindi ? 'दैनिक शुभ रंग' : 'Lucky Color of Day'}
                      </span>
                      <h4 className="font-playfair font-black text-lg text-[#431407] dark:text-amber-100">
                        {isHindi ? currentCharm.color.nameHi : currentCharm.color.nameEn}
                      </h4>
                    </div>
                  </div>

                  {/* Dual Color Swatch */}
                  <div className="flex items-center -space-x-2">
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white dark:border-amber-900 shadow-md"
                      style={{ backgroundColor: currentCharm.color.hex }}
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-white dark:border-amber-900 shadow-md"
                      style={{ backgroundColor: currentCharm.color.secondaryHex }}
                    />
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-[#2A0A03] border border-orange-100 dark:border-amber-900/50 rounded-xl p-3 mb-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9A3412] dark:text-amber-400">
                      {isHindi ? 'चक्र एवं औरा प्रभाव' : 'Resonant Chakra'}
                    </span>
                    <span className="text-xs font-bold text-[#EA580C] dark:text-amber-200">
                      {isHindi ? currentCharm.color.chakraHi : currentCharm.color.chakraEn}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#7C2D12] dark:text-amber-200/90 leading-relaxed mb-4">
                  {isHindi ? currentCharm.color.auricMeaningHi : currentCharm.color.auricMeaningEn}
                </p>

                <div className="text-[11px] bg-orange-50 dark:bg-[#1C0501] border border-orange-200/70 dark:border-amber-950 p-2.5 rounded-lg text-[#9A3412] dark:text-amber-300">
                  <strong className="text-[#EA580C] block mb-0.5">{isHindi ? 'वस्त्र व आभूषण सुझाव:' : 'Wardrobe & Accessory Tip:'}</strong>
                  {isHindi ? currentCharm.color.wardrobeTipHi : currentCharm.color.wardrobeTipEn}
                </div>
              </div>

              {/* Angel Frequency Badge */}
              <div className="mt-5 pt-4 border-t border-orange-100 dark:border-amber-900/40 flex items-center justify-between text-xs text-[#7C2D12] dark:text-amber-200">
                <span className="font-semibold">{isHindi ? 'एंजेल फ्रीक्वेंसी:' : 'Angel Frequency:'}</span>
                <span className="font-bold text-[#EA580C] dark:text-amber-300">{currentCharm.angelFrequency}</span>
              </div>
            </motion.div>

            {/* 3. DAILY BEEJ & VEDIC MANTRA CARD (WITH JAPA COUNTER) */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="relative bg-gradient-to-br from-[#FFFDF9] to-[#FFF7ED] dark:from-[#210702] dark:to-[#190401] rounded-2xl border-2 border-orange-200/90 dark:border-amber-900/80 p-5 sm:p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-amber-950 flex items-center justify-center text-[#EA580C]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C2410C] dark:text-amber-400 block">
                        {isHindi ? 'दैनिक बीज व सिद्धि मंत्र' : 'Daily Beej & Vedic Mantra'}
                      </span>
                      <h4 className="font-playfair font-black text-lg text-[#431407] dark:text-amber-100">
                        {isHindi ? '108 जप साधना' : '108 Japa Siddhi'}
                      </h4>
                    </div>
                  </div>

                  {/* Copy & Audio Chant Buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={toggleAudioChant}
                      title="Play Mantra Frequency Bell"
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isChantingPlaying 
                          ? 'bg-[#EA580C] text-white border-[#EA580C]' 
                          : 'bg-white dark:bg-[#2A0A03] border-orange-200 dark:border-amber-900 text-[#7C2D12] dark:text-amber-200 hover:text-[#EA580C]'
                      }`}
                    >
                      {isChantingPlaying ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={handleCopyMantra}
                      title="Copy Mantra to Clipboard"
                      className="p-1.5 rounded-lg border bg-white dark:bg-[#2A0A03] border-orange-200 dark:border-amber-900 text-[#7C2D12] dark:text-amber-200 hover:text-[#EA580C] transition-colors cursor-pointer"
                    >
                      {hasCopiedMantra ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Sanskrit Mantra Display Frame */}
                <div className="bg-amber-50/90 dark:bg-[#2E0B04] border-2 border-orange-300/80 dark:border-amber-700/80 rounded-xl p-3.5 mb-3 text-center shadow-inner">
                  <p className="font-serif font-black text-base sm:text-lg text-[#9A3412] dark:text-amber-200 tracking-wide select-all">
                    {currentCharm.mantra.sanskrit}
                  </p>
                  <p className="text-[11px] text-[#7C2D12] dark:text-amber-300/80 italic mt-1 font-medium select-all">
                    {currentCharm.mantra.transliteration}
                  </p>
                </div>

                <p className="text-xs text-[#7C2D12] dark:text-amber-200/90 leading-relaxed mb-3">
                  {isHindi ? currentCharm.mantra.meaningHi : currentCharm.mantra.meaningEn}
                </p>

                {/* Interactive Japa Mala Progress Bar */}
                <div className="bg-white/90 dark:bg-[#250903] border border-orange-200 dark:border-amber-900/60 p-3 rounded-xl">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-bold text-[#7C2D12] dark:text-amber-200">
                      {isHindi ? 'जप प्रगति:' : 'Japa Progress:'}
                    </span>
                    <span className="font-black text-[#EA580C]">
                      {japaCount} / {currentCharm.mantra.prescribedCount}
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-orange-100 dark:bg-amber-950 h-2 rounded-full overflow-hidden mb-3">
                    <motion.div 
                      className="bg-gradient-to-r from-amber-400 to-[#EA580C] h-full rounded-full"
                      style={{ width: `${(japaCount / currentCharm.mantra.prescribedCount) * 100}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  {/* Interactive Japa Tap Button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleIncrementJapa}
                      className="flex-1 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs py-2 px-3 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isHindi ? 'मंत्र जप करें (+1)' : 'Tap to Chant (+1 Bead)'}</span>
                    </button>

                    {japaCount > 0 && (
                      <button
                        onClick={handleResetJapa}
                        title="Reset Mala Counter"
                        className="p-2 rounded-xl border border-orange-200 dark:border-amber-900 bg-white dark:bg-[#1E0601] text-[#9A3412] hover:text-[#EA580C] cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Best Chanting Time */}
              <div className="mt-4 pt-3 border-t border-orange-100 dark:border-amber-900/40 flex items-center justify-between text-[11px] text-[#7C2D12] dark:text-amber-200">
                <span className="font-semibold">{isHindi ? 'सर्वोत्तम जप काल:' : 'Auspicious Time:'}</span>
                <span className="font-bold text-[#EA580C]">{isHindi ? currentCharm.mantra.bestTimeHi : currentCharm.mantra.bestTimeEn}</span>
              </div>
            </motion.div>

          </div>

          {/* 3-Step Morning Activation Ritual by Dr. Preeti Sehgal */}
          <div className="mt-8 pt-6 border-t border-orange-200/80 dark:border-amber-900/60">
            <div className="flex items-center gap-2 mb-4">
              <Sun className="w-4 h-4 text-[#EA580C]" />
              <h4 className="font-playfair font-bold text-base sm:text-lg text-[#431407] dark:text-amber-100">
                {isHindi ? 'डॉ. प्रीति सहगल द्वारा 3-चरणीय दैनिक रक्षा कवच विधि' : 'Dr. Preeti Sehgal’s 3-Step Daily Charm Energization Ritual'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white/80 dark:bg-[#250903] border border-orange-100 dark:border-amber-900/40 p-3.5 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-[#EA580C] text-white text-xs font-bold flex items-center justify-center mb-2">1</span>
                <h5 className="font-bold text-xs text-[#431407] dark:text-amber-100 mb-1">
                  {isHindi ? 'सूर्यार्घ्य एवं जल शोधन' : 'Surya Jal Arghya'}
                </h5>
                <p className="text-[11px] text-[#7C2D12] dark:text-amber-200/90 leading-relaxed">
                  {isHindi ? 'प्रातः तांबे के लोटे में जल, रोली व अक्षत डालकर सूर्य देव को अर्घ्य दें।' : 'Offer fresh water to the morning Sun in a copper vessel with a pinch of red kumkum.'}
                </p>
              </div>

              <div className="bg-white/80 dark:bg-[#250903] border border-orange-100 dark:border-amber-900/40 p-3.5 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-[#EA580C] text-white text-xs font-bold flex items-center justify-center mb-2">2</span>
                <h5 className="font-bold text-xs text-[#431407] dark:text-amber-100 mb-1">
                  {isHindi ? 'बीज मंत्र द्वारा प्राण प्रतिष्ठा' : 'Mantra Aura Activation'}
                </h5>
                <p className="text-[11px] text-[#7C2D12] dark:text-amber-200/90 leading-relaxed">
                  {isHindi ? 'अपने हाथ में क्रिस्टल या रुद्राक्ष रखकर 21 या 108 बार निर्धारित मंत्र का जप करें।' : 'Hold your gemstone in right palm and chant the prescribed seed mantra 21 or 108 times.'}
                </p>
              </div>

              <div className="bg-white/80 dark:bg-[#250903] border border-orange-100 dark:border-amber-900/40 p-3.5 rounded-xl">
                <span className="w-6 h-6 rounded-full bg-[#EA580C] text-white text-xs font-bold flex items-center justify-center mb-2">3</span>
                <h5 className="font-bold text-xs text-[#431407] dark:text-amber-100 mb-1">
                  {isHindi ? 'रंग एवं औरा धारण' : 'Color Aura Integration'}
                </h5>
                <p className="text-[11px] text-[#7C2D12] dark:text-amber-200/90 leading-relaxed">
                  {isHindi ? 'निर्धारित शुभ रंग का वस्त्र या रुमाल अपने साथ रखें व शुभ दिशा में मुख करके दिन शुरू करें।' : 'Wear the day’s lucky color accent and face the auspicious direction for key tasks.'}
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs: Personalized Chart Remedy Consultation */}
          <div className="mt-8 pt-6 border-t border-orange-200/80 dark:border-amber-900/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#EA580C] shrink-0" />
              <p className="text-xs text-[#7C2D12] dark:text-amber-200 font-medium">
                {isHindi 
                  ? 'अपनी संपूर्ण जन्म कुंडली के आधार पर अनुकूलतम रत्न व धातु जानने हेतु व्यक्तिगत परामर्श लें।' 
                  : 'Want a custom-energized Kavach formulated strictly from your Janam Kundli degrees?'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onStartChat('Dr. Preeti Sehgal')}
                className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
              >
                {isHindi ? 'ज्योतिषी से पूछें (निःशुल्क)' : 'Ask Astrologer (Free Chat)'}
              </button>

              <button
                onClick={() => onOpenBooking('gemstone-consultation')}
                className="bg-white dark:bg-[#2A0A03] border border-orange-300 dark:border-amber-700 hover:bg-orange-50 text-[#7C2D12] dark:text-amber-200 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                {isHindi ? 'व्यक्तिगत कवच बुक करें' : 'Book Custom Kavach Session'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
