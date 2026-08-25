import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { DOCTOR_INFO } from '../data/brandData';
import { StaggeredHeading, MysticHighlight, FluidCounter } from './typography';
import { DoctorPhotoCarousel } from './DoctorPhotoCarousel';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Star, 
  Calendar, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Calculator, 
  Compass, 
  MapPin,
  ArrowRight, 
  Users, 
  Globe2, 
  Zap, 
  Lock 
} from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onStartChat?: () => void;
  onOpenCalculators?: () => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onStartChat,
  onOpenCalculators,
  onNavigate
}) => {
  const { isHindi, t } = useLanguage();
  const heroRef = useRef<HTMLElement | null>(null);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Cosmic Background Parallax Layers
  const yDeepGlow = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const ySacredMandala = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const rotateMandala = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const yConstellations = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const yFloatingGlyph1 = useTransform(scrollYProgress, [0, 1], ['0%', '90%']);
  const yFloatingGlyph2 = useTransform(scrollYProgress, [0, 1], ['0%', '110%']);
  
  // Foreground Content Parallax
  const yForegroundText = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const yForegroundCard = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  const whatsappUrl = `https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Namaste Dr. Preeti Sehgal ji, I would like to schedule an astrology consultation with you.'
  )}`;

  return (
    <section 
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] w-full max-w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF9F2] via-[#FFF3E6] to-[#FFF9F2] dark:from-[#140501] dark:via-[#1E0802] dark:to-[#140501] px-4 sm:px-6 lg:px-8 py-8 sm:py-14"
    >
      {/* Dynamic Cosmic Starfield / Mandala Parallax Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          style={{ y: yDeepGlow }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gradient-to-tr from-amber-400/20 via-orange-500/20 to-amber-600/10 dark:from-amber-600/15 dark:via-orange-700/15 dark:to-transparent rounded-full blur-3xl opacity-70 will-change-transform"
        />

        <motion.div 
          style={{ y: ySacredMandala, rotate: rotateMandala }}
          className="absolute -top-20 -right-24 w-[480px] h-[480px] sm:w-[680px] sm:h-[680px] opacity-[0.06] dark:opacity-[0.09] will-change-transform"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#7C2D12] dark:text-amber-300" fill="currentColor">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <polygon points="50,5 63,38 98,38 70,59 81,93 50,72 19,93 30,59 2,38 37,38" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <polygon points="50,95 37,62 2,62 30,41 19,7 50,28 81,7 70,41 98,62 63,62" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="0.7" />
          </svg>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Trust Badges, CTAs */}
          <motion.div 
            style={{ y: yForegroundText }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-left will-change-transform"
          >
            {/* Top Pill: Live Status & Authority */}
            <div className="inline-flex items-center gap-2 bg-orange-100/90 dark:bg-amber-950/80 border border-orange-300/80 dark:border-amber-800/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#EA580C] dark:text-amber-300 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t("India's Most Accurate Astrology & Remedial Platform", "भारत का सबसे सटीक ज्योतिष एवं उपाय मंच")}</span>
              <span className="hidden xs:inline-block w-1.5 h-1.5 rounded-full bg-[#EA580C]"></span>
              <span className="text-[#7C2D12] dark:text-amber-200 font-extrabold tracking-wider">
                {t("28+ Yrs Authority", "28+ वर्षों का अनुभव")}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <span className="text-[#EA580C] dark:text-amber-400 text-xs sm:text-sm uppercase tracking-[0.2em] font-extrabold block">
                {t("Vedic Precision • Lal Kitab Remedies • Live Guidance", "वैदिक परिशुद्धता • लाल किताब उपाय • प्रत्यक्ष मार्गदर्शन")}
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-playfair font-black text-[#431407] dark:text-amber-100 tracking-tight leading-[1.12]">
                {t(
                  "Empower Your Destiny with Authentic Vedic Astrology",
                  "प्रामाणिक वैदिक ज्योतिष से अपने भाग्य को संवारें"
                )}
              </h1>
              <p className="font-playfair text-lg sm:text-xl text-[#7C2D12] dark:text-amber-300 font-bold tracking-wide">
                {DOCTOR_INFO.name} ({DOCTOR_INFO.hindiName}) &bull; <span className="text-[#EA580C] dark:text-amber-400">{t("Gold Medalist Astrologer", "स्वर्ण पदक विजेता ज्योतिषी")}</span>
              </p>
            </div>

            {/* Trust Metrics Row (28+ Years Practice, 150,000+ Astrologies Done, 13+ Languages, 4.8★) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-1">
              <div className="bg-white/95 dark:bg-[#1C0702] border border-orange-200 dark:border-amber-900/80 rounded-xl p-2.5 text-center shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-[#EA580C] dark:text-amber-400 font-black text-lg sm:text-xl">
                  <Award className="w-4 h-4" />
                  <span>28+</span>
                </div>
                <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#7C2D12] dark:text-amber-200">
                  {t("Years Practice", "वर्षों का अनुभव")}
                </span>
              </div>

              <div className="bg-white/95 dark:bg-[#1C0702] border border-orange-200 dark:border-amber-900/80 rounded-xl p-2.5 text-center shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-[#EA580C] dark:text-amber-400 font-black text-lg sm:text-xl">
                  <Users className="w-4 h-4" />
                  <span>150,000+</span>
                </div>
                <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#7C2D12] dark:text-amber-200">
                  {t("Astrologies Done", "परामर्श संपन्न")}
                </span>
              </div>

              <div className="bg-white/95 dark:bg-[#1C0702] border border-orange-200 dark:border-amber-900/80 rounded-xl p-2.5 text-center shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-[#EA580C] dark:text-amber-400 font-black text-lg sm:text-xl">
                  <Globe2 className="w-4 h-4" />
                  <span>13+</span>
                </div>
                <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#7C2D12] dark:text-amber-200">
                  {t("Languages", "भाषाएं")}
                </span>
              </div>

              <div className="bg-white/95 dark:bg-[#1C0702] border border-orange-200 dark:border-amber-900/80 rounded-xl p-2.5 text-center shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-[#EA580C] dark:text-amber-400 font-black text-lg sm:text-xl">
                  <Star className="w-4 h-4 fill-current text-amber-500" />
                  <span>4.8/5</span>
                </div>
                <span className="text-[10.5px] uppercase font-bold tracking-wider text-[#7C2D12] dark:text-amber-200">
                  {t("Rating (2.5M+)", "रेटिंग (25 लाख+)")}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[#431407] dark:text-amber-100 text-sm sm:text-base font-normal leading-relaxed max-w-2xl">
              {t(
                "Transform lingering planetary obstacles into lasting prosperity, emotional peace, and marital harmony. Experience mathematical Janam Kundli diagnostics, zero-demolition Vastu Shastra remedies, and time-tested Lal Kitab Farman solutions.",
                "ग्रह बाधाओं को स्थायी समृद्धि, मानसिक शांति और वैवाहिक सुख में बदलें। जन्म कुंडली विश्लेषण, बिना तोड़-फोड़ वास्तु समाधान और अचूक लाल किताब उपायों का प्रत्यक्ष अनुभव प्राप्त करें।"
              )}
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Start Free Chat (First Chat Free) */}
              <button
                id="hero-free-chat-btn"
                onClick={onStartChat}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#C2410C] hover:to-[#9A3412] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-6 sm:px-8 py-3.5 rounded-xl transition-all cursor-pointer shadow-md shadow-orange-500/30 hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t("Start Free Chat", "मुफ़्त चैट शुरू करें")}</span>
                <span className="bg-amber-300 text-[#7C2D12] font-black text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {t("FREE 1st MIN", "प्रथम चैट मुफ़्त")}
                </span>
              </button>

              {/* Schedule 1-on-1 Consultation */}
              <button
                id="hero-book-consult-btn"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 border-2 border-orange-300 dark:border-amber-800 bg-white dark:bg-[#1E0601] hover:bg-orange-50 dark:hover:bg-amber-950 text-[#7C2D12] dark:text-amber-200 font-bold text-xs sm:text-sm tracking-wider uppercase px-5 py-3.5 rounded-xl transition-all cursor-pointer shadow-xs hover:scale-105"
              >
                <Calendar className="w-4 h-4 text-[#EA580C]" />
                <span>{t("Book Consultation", "परामर्श बुक करें")}</span>
              </button>

              {/* 20+ Niche Calculators Trigger */}
              {onOpenCalculators && (
                <button
                  id="hero-calculators-btn"
                  onClick={onOpenCalculators}
                  className="inline-flex items-center justify-center gap-1.5 border border-orange-200 dark:border-amber-900 bg-orange-50/80 dark:bg-amber-950/60 hover:bg-orange-100 text-[#7C2D12] dark:text-amber-200 font-bold text-xs sm:text-sm tracking-wider uppercase px-4 py-3.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <Calculator className="w-4 h-4 text-[#EA580C]" />
                  <span>{t("20+ Calculators", "20+ कैलकुलेटर")}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              )}

              {/* Free Kundli Check Link */}
              <button
                id="hero-free-kundli-btn"
                onClick={() => onNavigate('kundli-tool')}
                className="inline-flex items-center justify-center gap-1.5 border border-orange-200 dark:border-amber-900 bg-white dark:bg-[#1E0601] hover:bg-orange-50 text-[#431407] dark:text-amber-100 hover:text-[#EA580C] font-bold text-xs sm:text-sm tracking-wider uppercase px-4 py-3.5 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <Compass className="w-4 h-4 text-[#EA580C]" />
                <span>{t("Free Kundli", "मुफ़्त जन्म कुंडली")}</span>
              </button>

              {/* Vastu Shastra Guide Link */}
              <button
                id="hero-vastu-shastra-btn"
                onClick={() => onNavigate('vastu-shastra')}
                className="inline-flex items-center justify-center gap-1.5 border border-orange-300 dark:border-amber-800 bg-orange-50/90 dark:bg-amber-950/80 hover:bg-orange-100 text-[#EA580C] dark:text-amber-300 font-bold text-xs sm:text-sm tracking-wider uppercase px-4 py-3.5 rounded-xl transition-all cursor-pointer shadow-xs hover:scale-105"
              >
                <MapPin className="w-4 h-4 text-[#EA580C]" />
                <span>{t("Vastu Shastra", "वास्तु शास्त्र")}</span>
                <span className="text-[9px] bg-[#EA580C] text-white px-1.5 py-0.2 rounded-full font-extrabold uppercase">
                  9-Zone
                </span>
              </button>
            </div>

            {/* Assurance Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#7C2D12] dark:text-amber-300/90 pt-1">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                {t("100% Privacy Guaranteed", "100% गोपनीयता सुरक्षित")}
              </span>
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                {t("Instant Connect in < 15s", "15 सेकंड में तुरंत संपर्क")}
              </span>
              <span className="inline-flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                {t("Verified Astrologer Only", "केवल सत्यापित ज्योतिषी")}
              </span>
            </div>

          </motion.div>

          {/* Right Column: Doctor Profile Showcase Card & Photo Carousel */}
          <motion.div 
            style={{ y: yForegroundCard }}
            className="lg:col-span-5 will-change-transform w-full"
          >
            <div className="relative mx-auto w-full max-w-md bg-white dark:bg-[#1C0702] rounded-2xl border border-orange-200 dark:border-amber-900/80 p-5 sm:p-6 shadow-xl">
              
              {/* Top Vedic Badge */}
              <div className="flex items-center justify-between border-b border-orange-200 dark:border-amber-900 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-[11px] font-bold text-[#EA580C] dark:text-amber-300 uppercase tracking-wider">
                    {t("Online & Video Slots Open", "ऑनलाइन व वीडियो स्लॉट उपलब्ध")}
                  </span>
                </div>
                <span className="text-[10px] font-playfair tracking-widest uppercase text-[#7C2D12] dark:text-amber-200 border border-orange-200 dark:border-amber-800 bg-orange-50 dark:bg-[#2A0B03] px-2 py-0.5 rounded-full font-semibold">
                  Delhi & Global
                </span>
              </div>

              {/* Doctor Visual Feature Box with Large Auto-Swiping Framed Carousel */}
              <div className="relative rounded-2xl overflow-hidden bg-[#FFF7ED] dark:bg-[#200801] text-[#7C2D12] dark:text-amber-100 p-3 sm:p-4 text-center border border-orange-200 dark:border-amber-900 shadow-sm">
                
                <DoctorPhotoCarousel autoSwipeInterval={3800} className="mb-3" />

                <p className="text-xs text-[#7C2D12] dark:text-amber-200 leading-relaxed italic bg-white dark:bg-[#160400] p-2.5 rounded-xl border border-orange-200 dark:border-amber-900 mb-3 font-normal shadow-xs">
                  {t(
                    '"Astrology is not about fear; it is the divine GPS that illuminates the smoothest route through life\'s karmic terrain."',
                    '"ज्योतिष भय का विषय नहीं है; यह परमात्मा का वह जीपीएस है जो कर्म पथ पर सबसे सुरक्षित मार्ग दिखाता है।"'
                  )}
                </p>

                {/* Quick Consultation Mode Tags */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px] uppercase tracking-wider font-semibold">
                  <div className="bg-white dark:bg-[#160400] rounded-lg py-1.5 px-2 border border-orange-200 dark:border-amber-900 text-[#7C2D12] dark:text-amber-200">
                    Roop Nagar Chamber
                  </div>
                  <div className="bg-white dark:bg-[#160400] rounded-lg py-1.5 px-2 border border-orange-200 dark:border-amber-900 text-[#7C2D12] dark:text-amber-200">
                    Kamla Nagar Chamber
                  </div>
                  <div className="bg-white dark:bg-[#160400] rounded-lg py-1.5 px-2 border border-orange-200 dark:border-amber-900 text-[#7C2D12] dark:text-amber-200">
                    Zoom / Video Call
                  </div>
                  <div className="bg-white dark:bg-[#160400] rounded-lg py-1.5 px-2 border border-orange-200 dark:border-amber-900 text-[#7C2D12] dark:text-amber-200">
                    Live Chat & Audio
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

