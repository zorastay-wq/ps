import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { ThemeToggle } from './ThemeToggle';
import { DOCTOR_INFO } from '../data/brandData';
import { useUserProfile } from '../context/UserProfileContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  Menu, 
  X, 
  Sparkles, 
  MapPin, 
  Instagram, 
  User, 
  ScanLine, 
  ChevronDown,
  Compass,
  Star,
  BookOpen,
  Eye,
  ShieldCheck,
  Calculator,
  ShoppingBag,
  Languages,
  Hash
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenVedicAI?: () => void;
  onOpenPalmScanner?: () => void;
  onOpenAdmin?: () => void;
  onOpenCalculators?: () => void;
  onStartChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  activeSection,
  onNavigate,
  onOpenVedicAI,
  onOpenPalmScanner,
  onOpenAdmin,
  onOpenCalculators,
  onStartChat
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const { openProfileModal, hasCustomProfile, profile } = useUserProfile();
  const { language, setLanguage, isHindi } = useLanguage();

  // Scroll direction & position detection for smart compact / hide / reveal behavior
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const prevScrollY = lastScrollYRef.current;
          const delta = currentScrollY - prevScrollY;

          // At top of page: restore full expanded header
          if (currentScrollY <= 40) {
            setIsVisible(true);
            setIsScrolled(false);
            setIsCompact(false);
          } else {
            setIsScrolled(true);
            setIsCompact(true);

            // Scrolling down past threshold: smoothly slide header up out of way
            if (delta > 6 && currentScrollY > 80 && !mobileMenuOpen) {
              setIsVisible(false);
              setMoreDropdownOpen(false);
            }
            // Scrolling up: reveal header immediately with slim, compact height
            else if (delta < -4 || mobileMenuOpen) {
              setIsVisible(true);
            }
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMoreDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const primaryNavLinks = [
    { id: 'about', label: isHindi ? 'डॉ. प्रीति सहगल' : 'About', icon: <ShieldCheck className="w-4 h-4 text-[#EA580C]" /> },
    { id: 'services', label: isHindi ? 'सेवाएं' : 'Services', icon: <Star className="w-4 h-4 text-[#EA580C]" /> },
    { id: 'kundli-tool', label: isHindi ? 'कुंडली व उपाय' : 'Kundli & Remedies', icon: <Sparkles className="w-4 h-4 text-[#EA580C]" /> },
    { id: 'vastu-shastra', label: isHindi ? 'वास्तु शास्त्र' : 'Vastu Guide', icon: <MapPin className="w-4 h-4 text-[#EA580C]" /> },
  ];

  const secondaryNavLinks = [
    { id: 'lalkitab', label: isHindi ? 'लाल किताब उपाय' : 'Lal Kitab Upay', icon: <BookOpen className="w-4 h-4 text-[#EA580C]" /> },
    { id: 'tarot', label: isHindi ? 'टैरो कार्ड' : 'Tarot Reading', icon: <Eye className="w-4 h-4 text-[#EA580C]" /> },
    { id: 'numerology', label: isHindi ? 'अंकशास्त्र' : 'Numerology Tool', icon: <Compass className="w-4 h-4 text-[#EA580C]" /> },
    { id: 'daily-lucky-charms', label: isHindi ? 'लकी चार्म्स' : 'Lucky Charms', icon: <Sparkles className="w-4 h-4 text-[#EA580C]" /> },
    { id: 'reviews', label: isHindi ? 'समीक्षाएं' : 'Client Reviews', icon: <Star className="w-4 h-4 text-[#EA580C]" /> },
    { id: 'blog-section', label: isHindi ? 'ज्ञान लेख' : 'Astrology Blog', icon: <BookOpen className="w-4 h-4 text-[#EA580C]" /> },
    { id: 'contact', label: isHindi ? 'संपर्क एवं केंद्र' : 'Chambers & Clinic', icon: <MapPin className="w-4 h-4 text-[#EA580C]" /> },
  ];

  const allDrawerLinks = [
    { id: 'about', label: isHindi ? 'डॉ. प्रीति सहगल' : 'About Dr. Preeti', desc: isHindi ? '28+ वर्षों का अनुभव' : '28+ Years Gold Medalist', icon: <ShieldCheck className="w-4 h-4 text-amber-300" /> },
    { id: 'services', label: isHindi ? 'परामर्श सेवाएं' : 'Consultation Services', desc: isHindi ? 'वैदिक एवं लाल किताब परामर्श' : 'Vedic & Lal Kitab Counsel', icon: <Star className="w-4 h-4 text-amber-300" /> },
    { id: 'kundli-tool', label: isHindi ? 'निःशुल्क कुंडली' : 'Free Kundli Checker', desc: isHindi ? 'दोष व ग्रह स्थिति जांचें' : 'Dosha & Planetary Positions', icon: <Compass className="w-4 h-4 text-amber-300" /> },
    { id: 'vastu-shastra', label: isHindi ? 'वास्तु शास्त्र' : 'Vastu Shastra Guide', desc: isHindi ? '8 दिशाओं का ऊर्जा संतुलन' : '8 Directions Energy Harmonizer', icon: <MapPin className="w-4 h-4 text-amber-300" /> },
    { id: 'lalkitab', label: isHindi ? 'लाल किताब उपाय' : 'Lal Kitab Remedies', desc: isHindi ? 'अचूक व त्वरित समाधान' : 'Potent 1952 Remedial Rules', icon: <BookOpen className="w-4 h-4 text-amber-300" /> },
    { id: 'tarot', label: isHindi ? 'टैरो कार्ड परामर्श' : 'Tarot Oracle', desc: isHindi ? '3-कार्ड अंतर्ज्ञान फलादेश' : '3-Card Past, Present, Future', icon: <Eye className="w-4 h-4 text-amber-300" /> },
    { id: 'numerology', label: isHindi ? 'अंकशास्त्र एवं लो-शू' : 'Chaldean Numerology', desc: isHindi ? 'मूलांक, भाग्यांक एवं 3x3 चक्र' : 'Lo Shu Grid & Name Frequency', icon: <Compass className="w-4 h-4 text-amber-300" /> },
    { id: 'daily-lucky-charms', label: isHindi ? 'दैनिक लकी चार्म्स' : 'Daily Lucky Charms', desc: isHindi ? 'राशि अनुसार रत्न, रंग व मंत्र' : 'Personalized Crystal, Color & Mantra', icon: <Sparkles className="w-4 h-4 text-amber-300" /> },
    { id: 'reviews', label: isHindi ? 'अनुभव व रेटिंग्स' : 'Client Reviews (5.0★)', desc: isHindi ? 'सत्यापित परामर्श अनुभव' : 'Verified Consultations', icon: <Star className="w-4 h-4 text-amber-300" /> },
    { id: 'blog-section', label: isHindi ? 'ज्योतिष लेख एवं ब्लॉग' : 'Astrology Blog', desc: isHindi ? 'ज्ञानवर्धक आध्यात्मिक लेख' : 'Cosmic Guidance & Wisdom', icon: <BookOpen className="w-4 h-4 text-amber-300" /> },
    { id: 'contact', label: isHindi ? 'संपर्क एवं केंद्र' : 'Chambers & Contact', desc: isHindi ? 'रूप नगर व कमला नगर, दिल्ली' : 'Roop Nagar & Kamla Nagar', icon: <MapPin className="w-4 h-4 text-amber-300" /> },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    onNavigate(id);
  };

  const whatsappUrl = `https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Namaste Dr. Preeti Sehgal ji, I would like to inquire about an astrology consultation.'
  )}`;

  return (
    <header
      id="main-navigation-header"
      className={`sticky top-0 z-50 w-full max-w-full transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full pointer-events-none'
      }`}
    >
      {/* Single-Row Clean Minimalist Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF9F2]/95 dark:bg-[#150400]/95 backdrop-blur-xl border-b border-orange-200/80 dark:border-amber-900/60 shadow-md shadow-orange-950/5'
            : 'bg-[#FFF9F2]/95 dark:bg-[#150400]/90 backdrop-blur-md border-b border-orange-200/60 dark:border-amber-900/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleLinkClick('hero')}
            className="text-left focus:outline-none cursor-pointer shrink-0 min-w-0 transition-transform duration-300 hover:scale-[1.01]"
          >
            <BrandLogo size="sm" />
          </button>

          {/* Desktop Navigation Links Container (Clean, Minimal Single-Row Layout) */}
          <nav 
            id="desktop-nav"
            className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-7 text-xs tracking-wider uppercase font-bold text-[#431407] dark:text-amber-100"
          >
            {primaryNavLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors duration-200 py-1.5 px-1 cursor-pointer relative group whitespace-nowrap ${
                  activeSection === link.id
                    ? 'text-[#EA580C] dark:text-amber-400 font-extrabold'
                    : 'text-[#431407] dark:text-amber-100 hover:text-[#EA580C] dark:hover:text-amber-400'
                }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 via-[#F97316] to-[#EA580C] rounded-full transition-all duration-300 ${
                    activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}

            {/* More Dropdown for Secondary Links */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-more-dropdown-btn"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`inline-flex items-center gap-1 py-1.5 px-1 transition-colors cursor-pointer ${
                  secondaryNavLinks.some((l) => l.id === activeSection)
                    ? 'text-[#EA580C] dark:text-amber-400 font-extrabold'
                    : 'text-[#431407] dark:text-amber-100 hover:text-[#EA580C] dark:hover:text-amber-400'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180 text-[#EA580C]' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 bg-white dark:bg-[#1E0601] border border-orange-200 dark:border-amber-900 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150">
                  {secondaryNavLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full text-left px-3 py-2 text-xs rounded-lg uppercase tracking-wider font-bold transition-colors cursor-pointer flex items-center gap-2.5 ${
                        activeSection === link.id
                          ? 'bg-orange-100 dark:bg-amber-950 text-[#EA580C] dark:text-amber-300'
                          : 'text-[#431407] dark:text-amber-100 hover:bg-orange-50 dark:hover:bg-amber-950/60 hover:text-[#EA580C]'
                      }`}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </button>
                  ))}
                  <div className="my-1 border-t border-orange-100 dark:border-amber-900/60" />
                  {onOpenCalculators && (
                    <button
                      onClick={() => {
                        setMoreDropdownOpen(false);
                        onOpenCalculators();
                      }}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg uppercase tracking-wider font-bold text-[#EA580C] dark:text-amber-400 hover:bg-orange-50 dark:hover:bg-amber-950/60 transition-colors cursor-pointer flex items-center gap-2.5"
                    >
                      <Calculator className="w-4 h-4 text-[#EA580C]" />
                      <span>20+ Vedic Calculators</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setMoreDropdownOpen(false);
                      if (onOpenAdmin) onOpenAdmin();
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg uppercase tracking-wider font-bold text-[#7C2D12] dark:text-amber-300 hover:bg-orange-100 dark:hover:bg-amber-950 transition-colors cursor-pointer flex items-center gap-2.5"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
                    <span>Admin Portal & CMS</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action CTA Controls (Minimal & Sleek) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Theme Toggle (Sun/Moon Switch) */}
            <ThemeToggle variant="compact" />

            {/* Mobile / Tablet Hamburger Menu Toggle Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#431407] dark:text-amber-100 hover:bg-orange-100/80 active:bg-orange-200 focus:outline-none cursor-pointer transition-colors border border-orange-200/60 dark:border-amber-900"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#EA580C]" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (State-toggled, animated using Framer Motion) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Semi-transparent dark overlay with backdrop-blur */}
            <motion.div
              id="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#2A0800]/75 sm:bg-black/70 backdrop-blur-md z-40 xl:hidden"
            />

            {/* Drawer Container with glass-panel-dark and backdrop-filter */}
            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -16, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`xl:hidden fixed ${
                isCompact ? 'top-[54px] sm:top-[58px]' : 'top-[68px] sm:top-[76px]'
              } left-0 right-0 max-h-[calc(100vh-60px)] overflow-y-auto glass-panel-dark backdrop-blur-xl border-b border-orange-500/30 shadow-2xl z-50 px-4 pt-3 pb-8 text-orange-50`}
            >
              {/* Quick Access Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openProfileModal();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-orange-950/70 border border-orange-400/30 text-xs text-orange-100 shadow-sm cursor-pointer hover:border-orange-400/60 hover:bg-orange-950/90 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-[#F97316]">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white">{hasCustomProfile ? profile.fullName : 'Vedic Birth Profile'}</p>
                      <p className="text-[10px] text-orange-200/80">{hasCustomProfile ? 'Kundli saved' : 'Save birth data'}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-300 uppercase font-bold bg-orange-900/60 border border-orange-500/30 px-2 py-1 rounded">
                    Manage &rarr;
                  </span>
                </button>

                {onOpenPalmScanner && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenPalmScanner();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-orange-900/90 to-amber-950/90 border border-orange-400/40 text-xs text-white font-bold shadow-sm cursor-pointer hover:border-amber-400/70 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                        <ScanLine className="w-4 h-4 animate-pulse text-amber-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-amber-100">Live Palm Scanner</p>
                        <p className="text-[10px] text-amber-200/70">Computer Vision Scan</p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white px-2.5 py-1 rounded-full font-bold shadow-xs">
                      Scan
                    </span>
                  </button>
                )}
              </div>

              {/* Theme Mode Switcher in Mobile Drawer */}
              <div className="mb-4">
                <ThemeToggle variant="full" />
              </div>

              {/* Navigation Links in Mobile Drawer with icons and subtle dividers */}
              <div className="mb-4 bg-orange-950/60 rounded-2xl border border-orange-500/25 p-2 overflow-hidden shadow-inner">
                <div className="px-2 py-1.5 flex items-center justify-between border-b border-orange-500/20 mb-1">
                  <p className="text-[11px] uppercase tracking-wider font-bold text-amber-300">
                    Vedic Consultations & Tools
                  </p>
                  <span className="text-[10px] text-orange-300/80 font-medium">8 Key Portals</span>
                </div>
                
                <div className="divide-y divide-orange-500/15">
                  {allDrawerLinks.map((link) => (
                    <button
                      key={link.id}
                      id={`mobile-nav-${link.id}`}
                      onClick={() => handleLinkClick(link.id)}
                      className={`w-full text-left py-2.5 px-2.5 transition-all cursor-pointer flex items-center justify-between group ${
                        activeSection === link.id
                          ? 'bg-orange-500/20 text-amber-200 font-bold rounded-xl'
                          : 'text-orange-100 hover:bg-orange-900/40 hover:text-white rounded-xl'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-orange-900/70 border border-orange-500/30 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 group-hover:border-amber-400/50 transition-all">
                          {link.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                            {link.label}
                          </p>
                          <p className="text-[10px] text-orange-200/70 truncate">
                            {link.desc}
                          </p>
                        </div>
                      </div>
                      <span className="text-orange-400 group-hover:text-amber-300 group-hover:translate-x-0.5 transition-all text-xs font-bold pl-2 shrink-0">
                        &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Booking CTA in Drawer */}
              <div className="space-y-2 pt-2 border-t border-orange-500/30">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:brightness-110 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with Dr. Preeti Sehgal</span>
                </button>

                {/* Delhi Chambers & Helpline Footer in Drawer */}
                <div className="flex items-center justify-between text-xs text-orange-200 px-3 py-1.5 bg-orange-950/60 rounded-lg border border-orange-500/20">
                  <span className="flex items-center gap-1 font-medium text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" /> Delhi: Roop & Kamla Nagar
                  </span>
                  <a href={`tel:${DOCTOR_INFO.primaryPhone}`} className="text-amber-300 font-bold text-[11px] hover:text-white">
                    {DOCTOR_INFO.primaryPhone}
                  </a>
                </div>

                {/* Admin Portal Gateway Trigger in Drawer */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAdmin) onOpenAdmin();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-amber-200 hover:text-white bg-orange-950/40 hover:bg-orange-900/60 border border-orange-400/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                  <span>Admin Portal & CMS Gateway</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

