import React from 'react';

interface SectionDividerProps {
  variant?: 'mandala' | 'surya' | 'lotus' | 'constellation' | 'geometric';
  className?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'mandala',
  className = ''
}) => {
  return (
    <div 
      className={`relative w-full flex items-center justify-center py-2 sm:py-3 overflow-hidden select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Left Hairline Gradient */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-orange-300/40 to-orange-400/80 max-w-xl" />

      {/* Central Vedic SVG Motif */}
      <div className="px-4 sm:px-6 flex items-center justify-center shrink-0">
        {variant === 'mandala' && (
          <div className="relative flex items-center justify-center">
            {/* Outer Subtle Halo */}
            <div className="absolute w-8 h-8 rounded-full bg-orange-400/10 blur-sm animate-pulse" />
            <svg 
              viewBox="0 0 48 48" 
              className="w-6 h-6 sm:w-7 sm:h-7 text-[#EA580C] drop-shadow-xs"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Ring */}
              <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              {/* Inner Diamond */}
              <rect x="12" y="12" width="24" height="24" stroke="currentColor" strokeWidth="1.2" transform="rotate(45 24 24)" />
              {/* Inner Circle */}
              <circle cx="24" cy="24" r="7" stroke="#F97316" strokeWidth="1.2" fill="#FFF9F2" />
              {/* Bindu Point */}
              <circle cx="24" cy="24" r="2.5" fill="#7C2D12" />
              {/* 4 Cardinal Marks */}
              <circle cx="24" cy="4" r="1.5" fill="#EA580C" />
              <circle cx="24" cy="44" r="1.5" fill="#EA580C" />
              <circle cx="4" cy="24" r="1.5" fill="#EA580C" />
              <circle cx="44" cy="24" r="1.5" fill="#EA580C" />
            </svg>
          </div>
        )}

        {variant === 'surya' && (
          <div className="relative flex items-center justify-center">
            <div className="absolute w-8 h-8 rounded-full bg-amber-400/15 blur-sm" />
            <svg 
              viewBox="0 0 52 52" 
              className="w-7 h-7 text-[#F97316] drop-shadow-xs" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sun Core */}
              <circle cx="26" cy="26" r="8" fill="#FFF9F2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="26" cy="26" r="3.5" fill="#7C2D12" />
              {/* Solar Rays */}
              <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.8">
                <line x1="26" y1="6" x2="26" y2="12" />
                <line x1="26" y1="40" x2="26" y2="46" />
                <line x1="6" y1="26" x2="12" y2="26" />
                <line x1="40" y1="26" x2="46" y2="26" />
                <line x1="12" y1="12" x2="16" y2="16" />
                <line x1="36" y1="36" x2="40" y2="40" />
                <line x1="12" y1="40" x2="16" y2="36" />
                <line x1="36" y1="12" x2="40" y2="16" />
              </g>
              {/* Surrounding dotted orbit */}
              <circle cx="26" cy="26" r="23" stroke="#EA580C" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.5" />
            </svg>
          </div>
        )}

        {variant === 'lotus' && (
          <div className="relative flex items-center justify-center">
            <svg 
              viewBox="0 0 48 36" 
              className="w-7 h-6 sm:w-8 sm:h-7 text-[#EA580C]" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Central Petal */}
              <path 
                d="M24 4C24 4 19 14 19 22C19 26.5 21.2 29 24 29C26.8 29 29 26.5 29 22C29 14 24 4 24 4Z" 
                fill="#FFF9F2" 
                stroke="currentColor" 
                strokeWidth="1.2" 
              />
              {/* Left Petal */}
              <path 
                d="M22 14C22 14 12 18 10 24C8.8 27.5 11 29 14 29C18 29 21 24 22 18" 
                stroke="#F97316" 
                strokeWidth="1.2" 
              />
              {/* Right Petal */}
              <path 
                d="M26 14C26 14 36 18 38 24C39.2 27.5 37 29 34 29C30 29 27 24 26 18" 
                stroke="#F97316" 
                strokeWidth="1.2" 
              />
              {/* Base Leaf Line */}
              <path 
                d="M8 30C16 33 32 33 40 30" 
                stroke="#7C2D12" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
              />
              <circle cx="24" cy="20" r="1.5" fill="#7C2D12" />
            </svg>
          </div>
        )}

        {variant === 'constellation' && (
          <div className="relative flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#EA580C] opacity-60" />
            <div className="w-2 h-2 rounded-full bg-[#F97316] opacity-80" />
            <div className="w-5 h-5 flex items-center justify-center text-[#7C2D12]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#EA580C]">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
              </svg>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#F97316] opacity-80" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#EA580C] opacity-60" />
          </div>
        )}

        {variant === 'geometric' && (
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rotate-45 border border-[#EA580C]" />
            <div className="w-2.5 h-2.5 rotate-45 bg-[#F97316]/20 border border-[#F97316]" />
            <div className="w-3.5 h-3.5 rotate-45 bg-[#7C2D12] flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#FFF9F2] rounded-full" />
            </div>
            <div className="w-2.5 h-2.5 rotate-45 bg-[#F97316]/20 border border-[#F97316]" />
            <div className="w-1.5 h-1.5 rotate-45 border border-[#EA580C]" />
          </div>
        )}
      </div>

      {/* Right Hairline Gradient */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-orange-300/40 to-orange-400/80 max-w-xl" />
    </div>
  );
};
