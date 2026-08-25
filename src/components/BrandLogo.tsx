import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md'
}) => {
  const isCompact = variant === 'compact';

  const iconSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-11 sm:h-11',
    lg: 'w-12 h-12 sm:w-14 sm:h-14'
  };

  const textSizes = {
    sm: { title: 'text-sm sm:text-base', sub: 'text-[9px] sm:text-[10px]' },
    md: { title: 'text-base sm:text-lg md:text-xl', sub: 'text-[9px] sm:text-[11px] md:text-xs' },
    lg: { title: 'text-xl sm:text-2xl md:text-3xl', sub: 'text-xs sm:text-sm' }
  };

  return (
    <div id="brand-logo-container" className={`flex items-center gap-2 sm:gap-3 select-none min-w-0 ${className}`}>
      {/* Sacred Brand Emblem: Sun Chakra & Yantra in Vedic Saffron & Deep Rust */}
      <div
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] border-2 border-[#F97316] shadow-md shadow-orange-500/20 text-[#F97316] flex-shrink-0 ${iconSizes[size]}`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1 sm:p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Sun Rays */}
          <circle cx="50" cy="50" r="44" stroke="#F97316" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          <circle cx="50" cy="50" r="38" stroke="#EA580C" strokeWidth="1.2" />
          
          {/* 12-Ray Cosmic Star */}
          <g stroke="#F97316" strokeWidth="1.2" opacity="0.7">
            <line x1="50" y1="8" x2="50" y2="92" />
            <line x1="8" y1="50" x2="92" y2="50" />
            <line x1="20" y1="20" x2="80" y2="80" />
            <line x1="20" y1="80" x2="80" y2="20" />
          </g>

          {/* Inner Vedic Yantra / Diamond Matrix */}
          <polygon points="50,18 82,50 50,82 18,50" stroke="#EA580C" strokeWidth="1.8" fill="rgba(249, 115, 22, 0.15)" />
          <polygon points="50,26 74,50 50,74 26,50" stroke="#F97316" strokeWidth="1.2" />
          
          {/* Center Sacred Bindu & Sun Core */}
          <circle cx="50" cy="50" r="8" fill="#F97316" />
          <circle cx="50" cy="50" r="4" fill="#7C2D12" />
        </svg>
      </div>

      {!isCompact && (
        <div className="flex flex-col text-left leading-tight min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-playfair font-extrabold tracking-wider text-[#7C2D12] dark:text-amber-100 whitespace-nowrap transition-colors ${textSizes[size].title}`}
            >
              DR. PREETI SEHGAL
            </span>
          </div>
          <span
            className={`font-semibold tracking-[0.12em] sm:tracking-[0.16em] uppercase text-[#C2410C] dark:text-amber-300/90 whitespace-nowrap transition-colors ${textSizes[size].sub}`}
          >
            Vedic Astrology &bull; Lal Kitab &bull; Vastu
          </span>
        </div>
      )}
    </div>
  );
};

