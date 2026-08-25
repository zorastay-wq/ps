import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';

const MEDIA_OUTLETS = [
  { name: 'Forbes India', tagline: 'Leading Astrological Authority' },
  { name: 'NDTV India', tagline: 'Prime Time Vedic Expert' },
  { name: 'LiveMint', tagline: 'Financial Astrology Insights' },
  { name: 'The Economic Times', tagline: 'Vastu for Corporations' },
  { name: 'Times of India', tagline: 'Gold Medalist Jyotish Acharya' },
  { name: 'Hindustan Times', tagline: 'Lal Kitab Master Guidance' }
];

export const FeaturedOnBanner: React.FC = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="w-full max-w-full bg-[#FFF8F0] dark:bg-[#180501] border-y border-orange-200/80 dark:border-amber-900/40 py-5 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-[#2A0800] border border-orange-300 dark:border-amber-500/40 flex items-center justify-center text-[#EA580C] dark:text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A3412] dark:text-amber-400">
                {isHindi ? 'राष्ट्रीय मीडिया में प्रदर्शित' : 'As Featured & Quoted In'}
              </p>
              <h4 className="font-playfair font-bold text-xs sm:text-sm text-[#431407] dark:text-amber-100">
                {isHindi ? 'भारत के प्रतिष्ठित प्रकाशन एवं समाचार नेटवर्क' : 'Leading National Publications & Media'}
              </h4>
            </div>
          </div>

          {/* Media Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 sm:gap-4">
            {MEDIA_OUTLETS.map((outlet, index) => (
              <div
                key={index}
                className="px-3 py-1.5 rounded-xl bg-white/90 dark:bg-[#240801] border border-orange-200/90 dark:border-amber-900/60 shadow-2xs hover:border-orange-400 dark:hover:border-amber-500 transition-all flex flex-col items-center justify-center group"
              >
                <span className="font-playfair font-black text-xs sm:text-sm tracking-wide text-[#7C2D12] dark:text-amber-200 group-hover:text-[#EA580C] dark:group-hover:text-amber-300">
                  {outlet.name}
                </span>
                <span className="text-[9px] text-[#9A3412]/80 dark:text-amber-300/60 hidden sm:inline">
                  {outlet.tagline}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
