import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Briefcase, Activity, Coins, Star, Clock, Palette, Hash, Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface ZodiacSignInfo {
  id: string;
  nameEn: string;
  nameHi: string;
  symbol: string;
  element: string;
  dateRange: string;
  ruler: string;
}

const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  { id: 'aries', nameEn: 'Aries', nameHi: 'मेष', symbol: '♈', element: 'Fire', dateRange: 'Mar 21 - Apr 19', ruler: 'Mars' },
  { id: 'taurus', nameEn: 'Taurus', nameHi: 'वृषभ', symbol: '♉', element: 'Earth', dateRange: 'Apr 20 - May 20', ruler: 'Venus' },
  { id: 'gemini', nameEn: 'Gemini', nameHi: 'मिथुन', symbol: '♊', element: 'Air', dateRange: 'May 21 - Jun 20', ruler: 'Mercury' },
  { id: 'cancer', nameEn: 'Cancer', nameHi: 'कर्क', symbol: '♋', element: 'Water', dateRange: 'Jun 21 - Jul 22', ruler: 'Moon' },
  { id: 'leo', nameEn: 'Leo', nameHi: 'सिंह', symbol: '♌', element: 'Fire', dateRange: 'Jul 23 - Aug 22', ruler: 'Sun' },
  { id: 'virgo', nameEn: 'Virgo', nameHi: 'कन्या', symbol: '♍', element: 'Earth', dateRange: 'Aug 23 - Sep 22', ruler: 'Mercury' },
  { id: 'libra', nameEn: 'Libra', nameHi: 'तुला', symbol: '♎', element: 'Air', dateRange: 'Sep 23 - Oct 22', ruler: 'Venus' },
  { id: 'scorpio', nameEn: 'Scorpio', nameHi: 'वृश्चिक', symbol: '♏', element: 'Water', dateRange: 'Oct 23 - Nov 21', ruler: 'Mars' },
  { id: 'sagittarius', nameEn: 'Sagittarius', nameHi: 'धनु', symbol: '♐', element: 'Fire', dateRange: 'Nov 22 - Dec 21', ruler: 'Jupiter' },
  { id: 'capricorn', nameEn: 'Capricorn', nameHi: 'मकर', symbol: '♑', element: 'Earth', dateRange: 'Dec 22 - Jan 19', ruler: 'Saturn' },
  { id: 'aquarius', nameEn: 'Aquarius', nameHi: 'कुंभ', symbol: '♒', element: 'Air', dateRange: 'Jan 20 - Feb 18', ruler: 'Saturn' },
  { id: 'pisces', nameEn: 'Pisces', nameHi: 'मीन', symbol: '♓', element: 'Water', dateRange: 'Feb 19 - Mar 20', ruler: 'Jupiter' }
];

type TimelineTab = 'yesterday' | 'today' | 'tomorrow' | 'weekly' | 'monthly' | 'yearly';

interface DailyHoroscopeSectionProps {
  onStartChat: () => void;
  onOpenBooking: () => void;
}

export const DailyHoroscopeSection: React.FC<DailyHoroscopeSectionProps> = ({
  onStartChat,
  onOpenBooking,
}) => {
  const { isHindi } = useLanguage();
  const [selectedSign, setSelectedSign] = useState<string>('aries');
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineTab>('today');
  const [activeAspect, setActiveAspect] = useState<'love' | 'career' | 'health' | 'money'>('love');

  const currentZodiac = ZODIAC_SIGNS.find((z) => z.id === selectedSign) || ZODIAC_SIGNS[0];

  const timelineTabs: { id: TimelineTab; labelEn: string; labelHi: string }[] = [
    { id: 'yesterday', labelEn: 'Yesterday', labelHi: 'कल (बीता)' },
    { id: 'today', labelEn: 'Today', labelHi: 'आज' },
    { id: 'tomorrow', labelEn: 'Tomorrow', labelHi: 'कल (आने वाला)' },
    { id: 'weekly', labelEn: 'Weekly', labelHi: 'साप्ताहिक' },
    { id: 'monthly', labelEn: 'Monthly', labelHi: 'मासिक' },
    { id: 'yearly', labelEn: '2026 Yearly', labelHi: 'वार्षिक 2026' }
  ];

  // Dynamic forecast generator for chosen sign and timeline
  const getForecastDetails = () => {
    return {
      loveEn: `Venus creates a harmonious aspect with your natal ruler today. Meaningful conversations with your partner will resolve lingering misunderstandings. Single natives may encounter someone with strong intellectual resonance.`,
      loveHi: `आज शुक्र ग्रह आपके राशि स्वामी के साथ अत्यंत अनुकूल युति बना रहा है। जीवनसाथी या प्रेमी के साथ संवाद से पुरानी गलतफहमियां दूर होंगी। अविवाहित जातकों को शुभ प्रस्ताव मिल सकते हैं।`,
      careerEn: `Jupiter’s transit in an auspicious trine enhances your leadership clarity. Colleagues will seek your decision-making insights. Favorable time to pitch projects or negotiate terms.`,
      careerHi: `बृहस्पति का त्रिकोण भाव में गोचर आपके कार्यक्षेत्र में प्रभाव और नेतृत्व क्षमता को बढ़ावा देगा। सहकर्मियों का पूरा सहयोग मिलेगा। नई परियोजनाओं की शुरुआत के लिए उत्तम समय है।`,
      healthEn: `Prana energy remains robust, though slight strain in shoulder or eyes may arise due to screen fatigue. Practice 10 minutes of Pranayama and stay hydrated.`,
      healthHi: `स्वास्थ्य सामान्यतः उत्तम रहेगा, हालांकि स्क्रीन के अधिक प्रयोग से आंखों व कंधों में हल्का तनाव हो सकता है। 10 मिनट अनुलोम-विलोम प्राणायाम अत्यंत लाभकारी रहेगा।`,
      moneyEn: `Mercury ensures steady speculative gains and recovery of delayed dues. Avoid impulsive luxury expenses during twilight hours.`,
      moneyHi: `बुध के प्रभाव से व्यापारिक लाभ और रुका हुआ धन प्राप्त होने के अच्छे योग हैं। शाम के समय अनावश्यक विलासिता के खर्चों से बचें।`,
      luckyNumber: '7 & 9',
      luckyColorEn: 'Saffron & Warm Gold',
      luckyColorHi: 'केसरिया एवं सुनहरा पीला',
      luckyTime: '10:30 AM - 12:15 PM',
      compatibilityEn: 'Leo & Sagittarius',
      compatibilityHi: 'सिंह एवं धनु'
    };
  };

  const forecast = getForecastDetails();

  return (
    <section id="horoscope-deck" className="py-14 px-4 bg-gradient-to-b from-[#FFFDF9] to-[#FFF6EB] dark:from-[#150400] dark:to-[#100300] border-t border-orange-200/70 dark:border-amber-950">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-amber-950/80 border border-orange-300 dark:border-amber-700/60 text-[#EA580C] dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHindi ? 'दैनिक राशिफल एवं ग्रह गोचर' : 'Daily Horoscope & Planetary Transits'}</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-extrabold text-[#431407] dark:text-amber-100">
            {isHindi ? 'अपनी राशि चुनें एवं तत्काल भविष्यफल जानें' : 'Select Your Zodiac Sign for Precise Vedic Insights'}
          </h2>
          <p className="text-xs sm:text-sm text-[#7C2D12] dark:text-amber-200/80">
            {isHindi
              ? 'प्रेम, करियर, स्वास्थ्य एवं धन के लिए 12 राशियों का सटीक वैदिक ज्योतिषीय विश्लेषण।'
              : 'Accurate daily planetary movements calculated using genuine Chitra Paksha Ayanamsha.'}
          </p>
        </div>

        {/* 12 Zodiac Sign Selector Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
          {ZODIAC_SIGNS.map((sign) => {
            const isSelected = selectedSign === sign.id;
            return (
              <motion.button
                key={sign.id}
                onClick={() => setSelectedSign(sign.id)}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
                className={`group relative p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-md ring-2 ring-amber-300 scale-105 font-bold'
                    : 'bg-white dark:bg-[#1E0601] text-[#7C2D12] dark:text-amber-200 border-orange-200 dark:border-amber-900/80 hover:border-[#EA580C] hover:bg-orange-50'
                }`}
              >
                {/* Floating & Pulsing Zodiac Sign Icon */}
                <motion.span
                  className="text-xl select-none inline-block origin-center"
                  variants={{
                    initial: { 
                      y: 0, 
                      scale: 1,
                      filter: 'drop-shadow(0 0 0px rgba(234, 88, 12, 0))'
                    },
                    hover: {
                      y: [-2, -6, -2],
                      scale: [1, 1.22, 1.08],
                      filter: [
                        'drop-shadow(0 2px 4px rgba(249, 115, 22, 0.25))',
                        'drop-shadow(0 4px 10px rgba(249, 115, 22, 0.5))',
                        'drop-shadow(0 2px 4px rgba(249, 115, 22, 0.25))'
                      ],
                      transition: {
                        y: {
                          repeat: Infinity,
                          duration: 1.8,
                          ease: 'easeInOut'
                        },
                        scale: {
                          repeat: Infinity,
                          duration: 1.8,
                          ease: 'easeInOut'
                        },
                        filter: {
                          repeat: Infinity,
                          duration: 1.8,
                          ease: 'easeInOut'
                        }
                      }
                    }
                  }}
                  animate={isSelected ? {
                    y: [0, -3, 0],
                    scale: [1, 1.08, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 2.4,
                      ease: 'easeInOut'
                    }
                  } : undefined}
                >
                  {sign.symbol}
                </motion.span>
                <span className="font-playfair font-bold text-xs tracking-tight">
                  {isHindi ? sign.nameHi : sign.nameEn}
                </span>
                <span className={`text-[9px] ${isSelected ? 'text-amber-100' : 'text-stone-400'}`}>
                  {sign.element}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Main Horoscope Card */}
        <motion.div 
          initial="initial"
          whileHover="hover"
          className="bg-white dark:bg-[#1E0601] rounded-3xl border border-orange-200/90 dark:border-amber-900/80 p-6 sm:p-8 shadow-md transition-shadow hover:shadow-lg"
        >
          
          {/* Top Bar inside Card: Zodiac Info & Timeline Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-orange-100 dark:border-amber-900/50">
            <div className="flex items-center gap-3.5">
              {/* Floating and pulsing animated zodiac badge */}
              <motion.div 
                className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-[#2E0A02] border-2 border-orange-300 dark:border-amber-500/60 flex items-center justify-center text-3xl text-[#EA580C] dark:text-amber-300 shadow-inner overflow-hidden"
                variants={{
                  initial: { scale: 1 },
                  hover: {
                    scale: 1.06,
                    borderColor: '#EA580C',
                    transition: { duration: 0.3 }
                  }
                }}
              >
                <motion.span
                  className="inline-block select-none origin-center"
                  variants={{
                    initial: {
                      y: 0,
                      scale: 1
                    },
                    hover: {
                      y: [-1, -5, -1],
                      scale: [1, 1.18, 1],
                      filter: [
                        'drop-shadow(0 2px 5px rgba(234, 88, 12, 0.3))',
                        'drop-shadow(0 6px 12px rgba(234, 88, 12, 0.6))',
                        'drop-shadow(0 2px 5px rgba(234, 88, 12, 0.3))'
                      ],
                      transition: {
                        repeat: Infinity,
                        duration: 1.8,
                        ease: 'easeInOut'
                      }
                    }
                  }}
                  animate={{
                    y: [0, -2.5, 0],
                    scale: [1, 1.05, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 3,
                      ease: 'easeInOut'
                    }
                  }}
                >
                  {currentZodiac.symbol}
                </motion.span>
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-playfair font-black text-xl text-[#431407] dark:text-amber-100">
                    {isHindi ? currentZodiac.nameHi : currentZodiac.nameEn} Horoscope
                  </h3>
                  <span className="text-xs bg-orange-100 dark:bg-amber-950 text-[#EA580C] dark:text-amber-300 px-2 py-0.5 rounded-full font-bold">
                    {currentZodiac.element} Element
                  </span>
                </div>
                <p className="text-xs text-[#9A3412] dark:text-amber-300/80 mt-0.5">
                  {currentZodiac.dateRange} • Ruler: <strong>{currentZodiac.ruler}</strong>
                </p>
              </div>
            </div>

            {/* Timeline selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {timelineTabs.map((tab) => {
                const isTabSelected = selectedTimeline === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTimeline(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isTabSelected
                        ? 'bg-[#EA580C] text-white shadow-xs'
                        : 'bg-orange-50 dark:bg-[#2A0800] text-[#7C2D12] dark:text-amber-200 hover:bg-orange-100'
                    }`}
                  >
                    {isHindi ? tab.labelHi : tab.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Forecast Aspects Tabs (Love, Career, Health, Money) */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'love', labelEn: 'Love & Romance', labelHi: 'प्रेम एवं संबंध', icon: Heart, color: 'text-rose-500' },
              { id: 'career', labelEn: 'Career & Business', labelHi: 'करियर एवं व्यापार', icon: Briefcase, color: 'text-blue-600' },
              { id: 'health', labelEn: 'Health & Vitality', labelHi: 'स्वास्थ्य एवं ऊर्जा', icon: Activity, color: 'text-emerald-600' },
              { id: 'money', labelEn: 'Wealth & Finance', labelHi: 'धन एवं वित्त', icon: Coins, color: 'text-amber-600' }
            ].map((aspect) => {
              const Icon = aspect.icon;
              const isAspectActive = activeAspect === aspect.id;
              return (
                <button
                  key={aspect.id}
                  onClick={() => setActiveAspect(aspect.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    isAspectActive
                      ? 'bg-amber-50/90 dark:bg-[#2B0A02] border-[#EA580C] dark:border-amber-500 shadow-xs ring-1 ring-orange-300'
                      : 'bg-[#FFFDF9] dark:bg-[#180501] border-orange-200/80 dark:border-amber-900/60 hover:bg-orange-50/60'
                  }`}
                >
                  <div className={`p-2 rounded-xl bg-white dark:bg-[#1F0702] border border-orange-200 dark:border-amber-900 shadow-2xs ${aspect.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-500 uppercase font-bold">Aspect</p>
                    <p className="font-playfair font-bold text-xs text-[#431407] dark:text-amber-100">
                      {isHindi ? aspect.labelHi : aspect.labelEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Reading Content Box */}
          <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#FFF9F2] dark:bg-[#150400] border border-orange-200/80 dark:border-amber-900/60">
            <h4 className="font-playfair font-bold text-sm sm:text-base text-[#431407] dark:text-amber-100 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#EA580C]" />
              <span>
                {activeAspect === 'love' && (isHindi ? 'प्रेम एवं वैवाहिक संबंध राशिफल' : 'Love & Matrimony Prediction')}
                {activeAspect === 'career' && (isHindi ? 'करियर, व्यापार एवं पदोन्नति' : 'Career, Job & Business Horizon')}
                {activeAspect === 'health' && (isHindi ? 'स्वास्थ्य, स्फूर्ति एवं आहार मार्गदर्शन' : 'Health, Vitality & Wellness')}
                {activeAspect === 'money' && (isHindi ? 'आर्थिक लाभ एवं निवेश योग' : 'Financial Gains & Investment Outlook')}
              </span>
            </h4>
            <p className="text-xs sm:text-sm text-[#7C2D12] dark:text-amber-200/90 leading-relaxed">
              {activeAspect === 'love' && (isHindi ? forecast.loveHi : forecast.loveEn)}
              {activeAspect === 'career' && (isHindi ? forecast.careerHi : forecast.careerEn)}
              {activeAspect === 'health' && (isHindi ? forecast.healthHi : forecast.healthEn)}
              {activeAspect === 'money' && (isHindi ? forecast.moneyHi : forecast.moneyEn)}
            </p>
          </div>

          {/* Daily Lucky Metrics */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-white dark:bg-[#200701] rounded-2xl border border-orange-200 dark:border-amber-900 flex items-center gap-2.5">
              <Hash className="w-4 h-4 text-[#EA580C] shrink-0" />
              <div>
                <p className="text-[10px] text-stone-500 uppercase font-bold">{isHindi ? 'शुभ अंक' : 'Lucky Number'}</p>
                <p className="font-bold text-xs text-[#431407] dark:text-amber-100">{forecast.luckyNumber}</p>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-[#200701] rounded-2xl border border-orange-200 dark:border-amber-900 flex items-center gap-2.5">
              <Palette className="w-4 h-4 text-[#EA580C] shrink-0" />
              <div>
                <p className="text-[10px] text-stone-500 uppercase font-bold">{isHindi ? 'शुभ रंग' : 'Lucky Color'}</p>
                <p className="font-bold text-xs text-[#431407] dark:text-amber-100">
                  {isHindi ? forecast.luckyColorHi : forecast.luckyColorEn}
                </p>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-[#200701] rounded-2xl border border-orange-200 dark:border-amber-900 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#EA580C] shrink-0" />
              <div>
                <p className="text-[10px] text-stone-500 uppercase font-bold">{isHindi ? 'शुभ मुहूर्त काल' : 'Lucky Time'}</p>
                <p className="font-bold text-xs text-[#431407] dark:text-amber-100">{forecast.luckyTime}</p>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-[#200701] rounded-2xl border border-orange-200 dark:border-amber-900 flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-rose-500 shrink-0" />
              <div>
                <p className="text-[10px] text-stone-500 uppercase font-bold">{isHindi ? 'मित्र राशियां' : 'Cosmic Match'}</p>
                <p className="font-bold text-xs text-[#431407] dark:text-amber-100">
                  {isHindi ? forecast.compatibilityHi : forecast.compatibilityEn}
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="mt-6 pt-5 border-t border-orange-100 dark:border-amber-900/50 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#7C2D12] dark:text-amber-200">
              {isHindi
                ? 'अधिक व्यक्तिगत मार्गदर्शन हेतु अपनी जन्म कुंडली की स्थिति पर ज्योतिषी से परामर्श लें।'
                : 'Need personalized dates according to your exact time and place of birth?'}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={onStartChat}
                className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isHindi ? 'ज्योतिषी से पूछें (निःशुल्क)' : 'Ask Astrologer (Free Chat)'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
