import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { SERVICES_DATA, DOCTOR_INFO } from '../data/brandData';
import { ServiceItem } from '../types';
import { StaggeredHeading } from './typography';
import { 
  BookOpen, 
  Compass, 
  HeartHandshake, 
  Home, 
  Sparkles, 
  Hash, 
  Hand, 
  Gem, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ArrowRight,
  X,
  MessageCircle,
  MoveRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenPalmScanner?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onOpenBooking,
  onOpenPalmScanner
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  // Vertical scroll tracking for desktop horizontal scrollytelling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform vertical scroll progress into horizontal translateX
  // Calculated to glide across all cards smoothly
  const xTranslate = useTransform(smoothProgress, [0, 1], ['2%', '-65%']);
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  const iconMap: Record<string, React.ReactNode> = {
    BookOpen: <BookOpen className="w-5 h-5 text-[#F97316]" />,
    Compass: <Compass className="w-5 h-5 text-[#F97316]" />,
    HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#F97316]" />,
    Home: <Home className="w-5 h-5 text-[#F97316]" />,
    Sparkles: <Sparkles className="w-5 h-5 text-[#F97316]" />,
    Hash: <Hash className="w-5 h-5 text-[#F97316]" />,
    Hand: <Hand className="w-5 h-5 text-[#F97316]" />,
    Gem: <Gem className="w-5 h-5 text-[#F97316]" />
  };

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'lalkitab', label: 'Lal Kitab' },
    { id: 'astrology', label: 'Vedic Kundli & Milan' },
    { id: 'vastu', label: 'Vastu Shastra' },
    { id: 'tarot', label: 'Tarot Reading' },
    { id: 'numerology', label: 'Numerology' },
    { id: 'gemstones', label: 'Gemstones' }
  ];

  const filteredServices = selectedCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory || (selectedCategory === 'astrology' && s.category === 'astrology'));

  const handleWhatsAppInquiry = (serviceTitle: string) => {
    const text = `Namaste Dr. Preeti Sehgal ji, I would like to inquire about your service: "${serviceTitle}". Please share available consultation slots.`;
    window.open(`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const scrollMobile = (direction: 'left' | 'right') => {
    if (mobileScrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      mobileScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative bg-[#FFF9F2] text-[#7C2D12] border-b border-orange-200">
      
      {/* ========================================================================= */}
      {/* DESKTOP VIEW (lg+): Vertical Scroll Driven Horizontal Scrollytelling Track */}
      {/* ========================================================================= */}
      <div ref={containerRef} className="hidden lg:block relative h-[320vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#FFF9F2] py-8 z-10">
          
          {/* Top Header & Cosmic Progress Tracker */}
          <div className="max-w-7xl mx-auto px-6 w-full shrink-0">
            <div className="flex items-end justify-between border-b border-orange-200 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-white px-3.5 py-1 rounded-full text-[11px] font-semibold text-[#EA580C] tracking-[0.18em] uppercase mb-2 shadow-xs">
                  <Sparkles className="w-3 h-3 text-[#F97316]" />
                  <span>Interactive Consultation Portfolio</span>
                </div>
                <StaggeredHeading
                  text="Specialized Astrological & Vastu Services"
                  as="h2"
                  className="text-3xl xl:text-4xl font-playfair font-bold text-[#7C2D12] tracking-tight"
                  goldAccentWords={['Astrological', 'Vastu']}
                  staggerDelay={0.04}
                />
              </div>

              {/* Scroll Guidance & Progress Bar */}
              <div className="text-right space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#9A3412]">
                  <span>Scroll down to navigate</span>
                  <MoveRight className="w-4 h-4 text-[#F97316] animate-pulse" />
                </div>
                <div className="w-48 h-1.5 bg-orange-100 rounded-full overflow-hidden border border-orange-200">
                  <motion.div 
                    style={{ width: progressWidth }}
                    className="h-full bg-gradient-to-r from-[#F97316] via-[#EA580C] to-[#C2410C] rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Category Filter Pills in Sticky Header */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer whitespace-nowrap emoji-bounce-hover ${
                    selectedCategory === cat.id
                      ? 'bg-[#F97316] text-white shadow-md shadow-orange-500/20 ring-2 ring-orange-300'
                      : 'bg-white border border-orange-200 text-[#7C2D12] hover:border-orange-300 hover:text-[#EA580C]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horizontal Scroll Track */}
          <div className="relative w-full flex-grow flex items-center overflow-hidden my-auto py-4">
            <motion.div 
              style={{ x: xTranslate }}
              className="flex gap-6 px-12 will-change-transform"
            >
              {filteredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="group relative w-[360px] xl:w-[400px] shrink-0 bg-white rounded-3xl border border-orange-200/90 hover:border-[#F97316] p-7 shadow-lg shadow-orange-950/5 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20 flex flex-col justify-between"
                >
                  {service.popular && (
                    <div className="absolute -top-3 right-4 bg-[#F97316] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-md shadow-orange-500/20">
                      Most Requested
                    </div>
                  )}

                  <div>
                    {/* Number & Icon Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-full border border-orange-300 flex items-center justify-center text-[10px] text-[#EA580C] font-bold bg-orange-50">
                        0{index + 1}
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 emoji-bounce-hover group-hover:scale-110 transition-transform">
                        {iconMap[service.iconName] || <Sparkles className="w-5 h-5 text-[#F97316]" />}
                      </div>
                    </div>

                    <div className="mb-2.5">
                      <h3 className="font-playfair text-xl font-bold text-[#431407] group-hover:text-[#EA580C] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <span className="text-xs font-playfair text-[#C2410C] font-bold tracking-wide block mt-0.5">
                        {service.hindiTitle}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#431407] leading-relaxed mb-4 line-clamp-3 font-normal">
                      {service.description}
                    </p>

                    {/* Key Benefits List */}
                    <div className="space-y-1.5 mb-4 border-t border-orange-200 pt-3">
                      {service.keyBenefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs sm:text-sm text-[#431407] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
                          <span className="truncate">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-orange-200 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-[#7C2D12]">
                      <span className="flex items-center gap-1 font-bold"><Clock className="w-3.5 h-3.5 text-[#F97316]" /> {service.duration}</span>
                      <span className="font-bold text-[#C2410C]">{service.priceNote}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setActiveModalService(service)}
                        className="w-full text-center text-xs tracking-wider uppercase font-bold py-2.5 px-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#431407] border border-orange-300 transition-colors cursor-pointer"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => onOpenBooking(service.id)}
                        className="w-full text-center text-xs tracking-wider uppercase font-bold py-2.5 px-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs cta-glow-hover"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Session</span>
                      </button>
                    </div>

                    {service.id === 'palmistry' && onOpenPalmScanner && (
                      <button
                        onClick={onOpenPalmScanner}
                        className="w-full text-center text-xs tracking-wider uppercase font-bold py-2.5 px-2 rounded-xl bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 hover:from-orange-200 hover:to-orange-100 text-[#C2410C] border border-orange-300 transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                        <span>⚡ Launch Live Palm Scanner (CV)</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Footnote in Sticky View */}
          <div className="max-w-7xl mx-auto px-6 w-full shrink-0 flex items-center justify-between text-xs text-[#7C2D12] font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" />
              Showing {filteredServices.length} specialized consultation disciplines
            </span>
            <span>Chamber & Global Video Available</span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET VIEW (< lg): Fluid Touch-Optimized Scrollytelling Carousel */}
      {/* ========================================================================= */}
      <div className="lg:hidden py-16 px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-white px-3.5 py-1 rounded-full text-[11px] font-bold text-[#C2410C] tracking-[0.18em] uppercase mb-3 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#F97316]" />
            <span>Consultation Portfolio</span>
          </div>
          <StaggeredHeading
            text="Specialized Astrological & Vastu Services"
            as="h2"
            className="text-2xl sm:text-3xl font-playfair font-bold text-[#431407] tracking-tight"
            goldAccentWords={['Astrological', 'Vastu']}
            staggerDelay={0.04}
          />
          <p className="text-[#7C2D12] mt-2 text-xs sm:text-sm font-normal max-w-xl mx-auto leading-relaxed">
            28+ years of clinical astrological expertise in Delhi. Over 150,000+ consultations conducted. Swipe horizontally to explore all services.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs tracking-wider uppercase font-bold transition-all shrink-0 cursor-pointer emoji-bounce-hover ${
                selectedCategory === cat.id
                  ? 'bg-[#F97316] text-white shadow-md shadow-orange-500/15 ring-2 ring-orange-300'
                  : 'bg-white border border-orange-200 text-[#431407]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Swipeable Carousel */}
        <div className="relative">
          <div 
            ref={mobileScrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 px-1 no-scrollbar"
          >
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className="snap-center w-[85vw] sm:w-[340px] shrink-0 bg-white rounded-3xl border border-orange-200 p-6 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/20 hover:border-orange-400 flex flex-col justify-between"
              >
                {service.popular && (
                  <div className="inline-block self-start mb-2 bg-[#F97316] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-xs">
                    Most Requested
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full border border-orange-300 flex items-center justify-center text-[10px] text-[#EA580C] font-bold bg-orange-50">
                      0{index + 1}
                    </div>
                    <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 emoji-bounce-hover">
                      {iconMap[service.iconName] || <Sparkles className="w-4 h-4 text-[#F97316]" />}
                    </div>
                  </div>

                  <h3 className="font-playfair text-lg font-bold text-[#431407] mb-1">
                    {service.title}
                  </h3>
                  <span className="text-xs font-playfair text-[#C2410C] font-bold block mb-2">
                    {service.hindiTitle}
                  </span>

                  <p className="text-xs sm:text-sm text-[#431407] leading-relaxed mb-4 line-clamp-3 font-normal">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 mb-4 border-t border-orange-200 pt-3">
                    {service.keyBenefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-[#431407] font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] flex-shrink-0" />
                        <span className="truncate">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-orange-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#7C2D12]">
                    <span className="flex items-center gap-1 font-bold"><Clock className="w-3.5 h-3.5 text-[#F97316]" /> {service.duration}</span>
                    <span className="font-bold text-[#C2410C]">{service.priceNote}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setActiveModalService(service)}
                      className="w-full text-center text-xs tracking-wider uppercase font-bold py-2 rounded-xl bg-orange-50 text-[#431407] border border-orange-200 hover:bg-orange-100 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(service.id)}
                      className="w-full text-center text-xs tracking-wider uppercase font-bold py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white flex items-center justify-center gap-1 shadow-xs cta-glow-hover"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Session</span>
                    </button>
                  </div>

                  {service.id === 'palmistry' && onOpenPalmScanner && (
                    <button
                      onClick={onOpenPalmScanner}
                      className="w-full text-center text-[11px] tracking-wider uppercase font-bold py-2 px-2 rounded-xl bg-gradient-to-r from-orange-100 via-orange-50 to-orange-100 text-[#EA580C] border border-orange-300 flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                      <span>⚡ Live Palm Scanner (CV)</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => scrollMobile('left')}
              className="p-2 rounded-full bg-white border border-orange-200 text-[#7C2D12] hover:text-[#EA580C]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-[#9A3412] font-medium">Swipe or Tap Arrows</span>
            <button
              onClick={() => scrollMobile('right')}
              className="p-2 rounded-full bg-white border border-orange-200 text-[#7C2D12] hover:text-[#EA580C]"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-orange-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white text-[#7C2D12] rounded-2xl border border-orange-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#7C2D12] hover:text-[#EA580C] hover:bg-orange-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#EA580C] border border-orange-300 bg-orange-50 px-3 py-0.5 rounded-full">
                  {activeModalService.category.toUpperCase()}
                </span>
                <h3 className="font-playfair text-2xl font-bold text-[#7C2D12] mt-2">
                  {activeModalService.title}
                </h3>
                <p className="font-playfair text-sm text-[#EA580C] font-semibold">
                  {activeModalService.hindiTitle}
                </p>
                <p className="text-sm font-normal text-[#9A3412] italic mt-1">
                  "{activeModalService.tagline}"
                </p>
              </div>

              <div className="bg-[#FFF7ED] p-4 rounded-xl border border-orange-200 text-xs sm:text-sm text-[#7C2D12] leading-relaxed font-normal">
                {activeModalService.description}
              </div>

              <div>
                <h4 className="font-playfair text-xs font-bold text-[#EA580C] uppercase tracking-[0.18em] mb-2">
                  What This Consultation Includes:
                </h4>
                <div className="space-y-2">
                  {activeModalService.fullDetails.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#7C2D12] font-normal">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[#9A3412] bg-[#FFF7ED] p-3 rounded-xl border border-orange-200 font-medium">
                <div>
                  <strong className="text-[#7C2D12]">Session Duration:</strong> {activeModalService.duration}
                </div>
                <div>
                  <strong className="text-[#7C2D12]">Available Modes:</strong> Chambers / Video / Audio
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-end gap-3 border-t border-orange-200">
                {activeModalService.id === 'palmistry' && onOpenPalmScanner && (
                  <button
                    onClick={() => {
                      setActiveModalService(null);
                      onOpenPalmScanner();
                    }}
                    className="inline-flex items-center gap-1.5 border border-orange-300 bg-orange-50 hover:bg-orange-100 text-[#EA580C] px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 text-[#F97316]" />
                    <span>Launch Live Palm Scanner</span>
                  </button>
                )}

                <button
                  onClick={() => handleWhatsAppInquiry(activeModalService.title)}
                  className="inline-flex items-center gap-1.5 border border-orange-300 bg-white hover:bg-orange-50 text-[#EA580C] px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer shadow-xs whatsapp-glow-hover"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquire</span>
                </button>

                <button
                  onClick={() => {
                    const id = activeModalService.id;
                    setActiveModalService(null);
                    onOpenBooking(id);
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase shadow-md transition-colors cursor-pointer cta-glow-hover"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule This Session</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
