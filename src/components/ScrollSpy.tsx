import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Compass, 
  BookOpen, 
  Eye, 
  Star, 
  MapPin, 
  Grid3X3, 
  ShieldCheck, 
  Gem, 
  Instagram, 
  HelpCircle,
  PhoneCall,
  ChevronUp,
  ChevronDown,
  ShoppingBag,
  List,
  ArrowUp
} from 'lucide-react';

export interface SectionItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  category: 'core' | 'tools' | 'info';
}

const SECTIONS: SectionItem[] = [
  { id: 'hero', label: '1. Home & Credentials', shortLabel: 'Home', icon: <Sparkles className="w-3.5 h-3.5" />, category: 'core' },
  { id: 'about', label: '2. About Dr. Preeti Sehgal', shortLabel: 'About', icon: <ShieldCheck className="w-3.5 h-3.5" />, category: 'core' },
  { id: 'services', label: '3. Core Services Matrix', shortLabel: 'Services', icon: <Star className="w-3.5 h-3.5" />, category: 'core' },
  { id: 'kundli-tool', label: '4. Vedic Kundli & Lal Kitab', shortLabel: 'Kundli', icon: <Compass className="w-3.5 h-3.5" />, category: 'tools' },
  { id: 'lalkitab', label: 'Lal Kitab Remedies', shortLabel: 'Lal Kitab', icon: <BookOpen className="w-3.5 h-3.5" />, category: 'tools' },
  { id: 'tarot', label: '3-Card Tarot Oracle', shortLabel: 'Tarot', icon: <Eye className="w-3.5 h-3.5" />, category: 'tools' },
  { id: 'numerology', label: 'Numerology Grid', shortLabel: 'Numerology', icon: <Grid3X3 className="w-3.5 h-3.5" />, category: 'tools' },
  { id: 'horoscope-deck', label: 'Daily Horoscope', shortLabel: 'Horoscope', icon: <Sparkles className="w-3.5 h-3.5" />, category: 'tools' },
  { id: 'vastu-shastra', label: '5. Non-Demolition Vastu Guide', shortLabel: 'Vastu', icon: <MapPin className="w-3.5 h-3.5" />, category: 'tools' },
  { id: 'reviews', label: '6. Verified Reviews (5.0★)', shortLabel: 'Reviews', icon: <Star className="w-3.5 h-3.5" />, category: 'info' },
  { id: 'instagram', label: '7. Instagram Video Tips', shortLabel: 'Instagram', icon: <Instagram className="w-3.5 h-3.5" />, category: 'info' },
  { id: 'faq', label: '8. Consultation FAQ', shortLabel: 'FAQ', icon: <HelpCircle className="w-3.5 h-3.5" />, category: 'info' },
  { id: 'contact', label: '9. Chambers & Contact', shortLabel: 'Chambers', icon: <PhoneCall className="w-3.5 h-3.5" />, category: 'info' },
];

interface ScrollSpyProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const ScrollSpy: React.FC<ScrollSpyProps> = ({
  activeSection,
  onNavigate
}) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
      setIsVisible(scrollY > 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const normalizedIndex = activeIndex >= 0 ? activeIndex : 0;
  const currentSection = SECTIONS[normalizedIndex] || SECTIONS[0];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const handleMobileNavigate = (id: string) => {
    setMobileDrawerOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* 1. Desktop & Tablet Floating Capsule */}
            <motion.aside
              id="scroll-spy-indicator"
              aria-label="Page Sections Navigation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed right-2.5 sm:right-4 lg:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end select-none"
            >
              {/* Frosted Glass Floating Capsule */}
              <motion.div 
                layout
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className={`relative bg-[#431407]/94 hover:bg-[#431407]/98 backdrop-blur-xl border border-orange-500/35 shadow-2xl shadow-orange-950/50 flex flex-col transition-all duration-300 ${
                  isExpanded 
                    ? 'rounded-2xl p-3 min-w-[240px] max-h-[68vh] overflow-y-auto no-scrollbar' 
                    : 'rounded-full py-2.5 px-2 items-center'
                }`}
              >
                {/* Top Expand/Collapse & Quick Action Bar */}
                <div className={`flex items-center justify-between w-full pb-2 mb-1.5 border-b border-orange-500/25 ${isExpanded ? 'px-1' : 'justify-center'}`}>
                  {isExpanded ? (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-4 h-4 rounded bg-orange-500/25 flex items-center justify-center text-amber-300">
                          <Sparkles className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 truncate">
                          Quick Index ({SECTIONS.length})
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={scrollToTop}
                          title="Scroll to Top"
                          className="p-1 rounded bg-orange-950/80 text-amber-300 hover:text-white hover:bg-orange-800 transition-all cursor-pointer"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setIsExpanded(false)}
                          title="Collapse to Dots"
                          className="p-1 rounded bg-orange-950/80 text-amber-300 hover:text-white hover:bg-orange-800 transition-all cursor-pointer"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      id="scrollspy-expand-toggle"
                      onClick={() => setIsExpanded(true)}
                      aria-label="Expand page index labels"
                      title="Click to view all section labels"
                      className="relative flex items-center justify-center w-5 h-5 rounded-full bg-orange-950/90 text-amber-300 hover:text-white hover:bg-orange-800 border border-orange-400/30 cursor-pointer transition-all hover:scale-110 shadow-xs focus:outline-none"
                    >
                      <List className="w-3 h-3 text-amber-300" />
                    </button>
                  )}
                </div>
                
                {/* Background Vertical Progress Track (Visible when collapsed) */}
                {!isExpanded && (
                  <div className="absolute top-10 bottom-8 left-1/2 -translate-x-1/2 w-[2px] bg-orange-950/80 rounded-full overflow-hidden pointer-events-none">
                    <div 
                      className="w-full bg-gradient-to-b from-amber-400 via-[#F97316] to-[#EA580C] transition-all duration-150 ease-out"
                      style={{ height: `${scrollProgress}%` }}
                    />
                  </div>
                )}

                {/* Section Indicator Items */}
                <div className={`relative z-10 flex flex-col gap-1 ${isExpanded ? 'w-full' : 'items-center'}`}>
                  {SECTIONS.map((section, idx) => {
                    const isActive = activeSection === section.id || (activeIndex === -1 && idx === 0);
                    const isHovered = hoveredSection === section.id;

                    if (isExpanded) {
                      return (
                        <motion.button
                          key={section.id}
                          onClick={() => onNavigate(section.id)}
                          className={`w-full text-left px-2 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2 group ${
                            isActive
                              ? 'bg-gradient-to-r from-orange-500/40 to-amber-500/25 text-amber-200 font-bold border border-orange-400/50 shadow-xs'
                              : 'text-orange-100/80 hover:bg-orange-900/40 hover:text-white border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 text-xs transition-all ${
                              isActive
                                ? 'bg-gradient-to-br from-amber-300 to-[#F97316] text-[#431407] font-bold shadow-xs'
                                : 'bg-orange-950/80 text-orange-300 group-hover:text-amber-200 border border-orange-500/20'
                            }`}>
                              {section.icon}
                            </div>
                            <span className="text-[11px] truncate tracking-wide font-medium group-hover:text-amber-100">
                              {section.label}
                            </span>
                          </div>

                          {isActive && (
                            <span className="text-[8px] bg-amber-400/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded border border-amber-400/30 tracking-wider uppercase shrink-0">
                              Active
                            </span>
                          )}
                        </motion.button>
                      );
                    }

                    return (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, scale: 0.4, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: idx * 0.02,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative flex items-center"
                        onMouseEnter={() => setHoveredSection(section.id)}
                        onMouseLeave={() => setHoveredSection(null)}
                      >
                        <button
                          id={`scrollspy-dot-${section.id}`}
                          onClick={() => onNavigate(section.id)}
                          aria-label={`Scroll to ${section.label}`}
                          aria-current={isActive ? 'true' : undefined}
                          className={`relative flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                            isActive
                              ? 'w-6 h-6 bg-gradient-to-br from-amber-300 to-[#F97316] text-[#431407] shadow-lg shadow-orange-500/60 scale-110'
                              : 'w-4 h-4 bg-orange-950/90 text-orange-400/80 hover:bg-orange-800 hover:text-amber-200 hover:scale-110 border border-orange-500/20'
                          }`}
                        >
                          {isActive ? (
                            <span className="shrink-0 scale-90 text-[#431407]">
                              {section.icon}
                            </span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400/60 group-hover:bg-orange-300" />
                          )}
                        </button>

                        {/* Interactive Floating Tooltip on Hover or Focus */}
                        <AnimatePresence>
                          {isHovered && !isExpanded && (
                            <motion.div
                              id={`scrollspy-tooltip-${section.id}`}
                              role="tooltip"
                              initial={{ opacity: 0, x: 10, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{ opacity: 0, x: 10, scale: 0.9 }}
                              transition={{ duration: 0.18, ease: "easeOut" }}
                              className="absolute right-full mr-3.5 z-50 whitespace-nowrap pointer-events-none drop-shadow-2xl"
                            >
                              <div className="flex items-center gap-2.5 bg-gradient-to-l from-[#431407]/98 to-[#2A0800]/98 backdrop-blur-2xl border border-orange-400/50 text-white px-3.5 py-2 rounded-xl shadow-2xl shadow-black/60 flex-row-reverse relative">
                                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#431407] border-t border-r border-orange-400/50 rotate-45 pointer-events-none" />
                                
                                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-500/30 to-amber-500/20 border border-orange-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
                                  {section.icon}
                                </div>
                                <div className="flex flex-col text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {isActive && (
                                      <span className="text-[9px] bg-amber-400/25 text-amber-300 font-extrabold px-1.5 py-0.5 rounded-full border border-amber-400/40 tracking-wider uppercase">
                                        Current
                                      </span>
                                    )}
                                    <span className="text-xs font-black text-amber-100 tracking-wide">
                                      {section.label}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-orange-200/80 font-medium capitalize mt-0.5">
                                    Section {idx + 1} of {SECTIONS.length} • {section.shortLabel}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Current Active Section Badge & Scroll Percentage */}
                <div className={`mt-2 pt-2 border-t border-orange-500/25 flex items-center ${isExpanded ? 'justify-between px-1' : 'flex-col justify-center'} text-center`}>
                  {isExpanded ? (
                    <>
                      <span className="text-[9px] text-orange-300/80 font-medium">
                        {normalizedIndex + 1} / {SECTIONS.length} Active
                      </span>
                      <button
                        onClick={scrollToBottom}
                        title="Jump to Bottom"
                        className="text-[8px] font-extrabold tracking-widest text-amber-300/90 uppercase hover:text-white cursor-pointer"
                      >
                        {Math.round(scrollProgress)}% &darr;
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={scrollToTop}
                      title="Click to Scroll to Top"
                      className="text-[8px] font-extrabold tracking-widest text-amber-300/90 hover:text-white uppercase cursor-pointer"
                    >
                      {Math.round(scrollProgress)}%
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.aside>

            {/* 2. Mobile Floating Capsule Mini-Indicator (Guarantees Full Accessibility on Small Screens) */}
            <motion.div
              id="mobile-floating-capsule"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed right-2.5 top-1/2 -translate-y-1/2 z-40 md:hidden select-none"
            >
              <button
                onClick={() => setMobileDrawerOpen(true)}
                aria-label="Open page index"
                className="flex flex-col items-center justify-center p-1.5 rounded-full bg-[#431407]/95 backdrop-blur-xl border border-orange-500/40 shadow-xl shadow-orange-950/60 text-amber-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-300 to-[#F97316] text-[#431407] font-black flex items-center justify-center text-[10px] shadow-sm">
                  {normalizedIndex + 1}
                </div>
                <span className="text-[8px] font-extrabold mt-1 text-orange-200">
                  {Math.round(scrollProgress)}%
                </span>
              </button>
            </motion.div>

            {/* Mobile Index Sheet Modal */}
            {mobileDrawerOpen && (
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Quick Page Index"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 md:hidden"
                onClick={() => setMobileDrawerOpen(false)}
              >
                <div
                  className="bg-[#2A0800] border border-orange-500/30 rounded-2xl p-4 w-full max-w-sm max-h-[80vh] overflow-y-auto shadow-2xl text-orange-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-orange-500/20 mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span className="font-bold text-amber-200 text-sm">Vedic Page Index</span>
                    </div>
                    <button
                      onClick={() => setMobileDrawerOpen(false)}
                      className="p-1 rounded-lg bg-orange-950 text-orange-300 hover:text-white"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1">
                    {SECTIONS.map((s, i) => {
                      const isActive = activeSection === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleMobileNavigate(s.id)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                            isActive
                              ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold'
                              : 'hover:bg-orange-900/50 text-orange-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded bg-orange-950 flex items-center justify-center text-amber-300 text-[10px] font-bold">
                              {i + 1}
                            </span>
                            <span>{s.label}</span>
                          </div>
                          {isActive && <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};
