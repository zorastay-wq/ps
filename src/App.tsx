import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserProfileProvider } from './context/UserProfileContext';
import { ToastProvider } from './context/ToastContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { UserProfileModal } from './components/UserProfileModal';
import { CosmicBackground } from './components/CosmicBackground';
import { LiveMuhuratBar } from './components/LiveMuhuratBar';
import { FeaturedOnBanner } from './components/FeaturedOnBanner';
import { Navbar } from './components/Navbar';
import { ScrollSpy } from './components/ScrollSpy';
import { SectionDivider } from './components/SectionDivider';
import { HeroSection } from './components/HeroSection';
import { DailyHoroscopeSection } from './components/DailyHoroscopeSection';
import { DailyLuckyCharms } from './components/DailyLuckyCharms';
import { AppDownloadMockup } from './components/AppDownloadMockup';
import { AstroMallShop } from './components/AstroMallShop';
import { AstroBlogSection } from './components/AstroBlogSection';
import { AstroCalculatorsModal } from './components/AstroCalculatorsModal';
import { LiveChatSimulatorModal } from './components/LiveChatSimulatorModal';
import { KundliCalculator } from './components/KundliCalculator';
import { ServicesSection } from './components/ServicesSection';
import { LalKitabRemedies } from './components/LalKitabRemedies';
import { TarotReader } from './components/TarotReader';
import { NumerologyTool } from './components/NumerologyTool';
import { VastuGuide } from './components/VastuGuide';
import { GemstoneConsultant } from './components/GemstoneConsultant';
import { InstagramFeed } from './components/InstagramFeed';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AstroQuickWidget } from './components/AstroQuickWidget';
import { NewsletterModal } from './components/NewsletterModal';
import { VedicAISection } from './components/VedicAISection';
import { VedicAIModal } from './components/VedicAIModal';
import { PalmScannerModal } from './components/PalmScannerModal';

// Subtle scale-in & fade entrance animation for major sections
const sectionVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.96,
    y: 28 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const
    }
  }
};

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState<boolean>(false);
  const [isVedicAIOpen, setIsVedicAIOpen] = useState<boolean>(false);
  const [isPalmScannerOpen, setIsPalmScannerOpen] = useState<boolean>(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState<boolean>(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState<boolean>(false);
  const [activeChatAstrologer, setActiveChatAstrologer] = useState<string>('Dr. Preeti Sehgal');
  const [selectedBookingService, setSelectedBookingService] = useState<string>('lal-kitab');
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.hash.includes('admin') || window.location.search.includes('admin');
  });

  // Sync hash changes for #admin route
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('admin') || window.location.search.includes('admin')) {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedBookingService(serviceId);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleOpenNewsletter = () => {
    setIsNewsletterOpen(true);
  };

  const handleCloseNewsletter = () => {
    setIsNewsletterOpen(false);
  };

  const handleOpenVedicAI = () => {
    setIsVedicAIOpen(true);
  };

  const handleCloseVedicAI = () => {
    setIsVedicAIOpen(false);
  };

  const handleOpenPalmScanner = () => {
    setIsPalmScannerOpen(true);
  };

  const handleClosePalmScanner = () => {
    setIsPalmScannerOpen(false);
  };

  const handleStartLiveChat = (astrologerName?: string) => {
    if (astrologerName) {
      setActiveChatAstrologer(astrologerName);
    }
    setIsLiveChatOpen(true);
  };

  const handleOpenCalculators = () => {
    setIsCalculatorsOpen(true);
  };

  // Automatic Scroll-Spy detecting current section in viewport
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'services',
      'kundli-tool',
      'lalkitab',
      'tarot',
      'numerology',
      'horoscope-deck',
      'daily-lucky-charms',
      'astromall',
      'vedic-ai',
      'gemstones',
      'vastu-shastra',
      'reviews',
      'instagram',
      'blog-section',
      'faq',
      'contact'
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 140) {
        setActiveSection('hero');
        return;
      }
      const scrollPosition = scrollY + 140;
      let current = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset;
          if (top <= scrollPosition) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    let targetId = sectionId;
    if (sectionId === 'numerology-tool') targetId = 'numerology';
    if (sectionId === 'vastu') targetId = 'vastu-shastra';
    
    setActiveSection(targetId);
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(targetId) || document.getElementById(sectionId);
    if (elem) {
      const offset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProfileProvider>
          <ToastProvider>
            <AdminAuthProvider>
              {isAdminView ? (
                <ProtectedRoute
                  onExitPortal={() => {
                    setIsAdminView(false);
                    window.location.hash = '';
                  }}
                />
              ) : (
                <div className="min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[#FFF9F2] dark:bg-[#120400] text-[#7C2D12] dark:text-amber-100 font-sans selection:bg-[#EA580C] selection:text-white relative">
                  {/* Background Cosmic Starfield / Sacred Constellation Layer */}
                  <CosmicBackground />

                  {/* Live Cosmic Transit / Daily Panchang Ribbon */}
                  <LiveMuhuratBar onOpenNewsletter={handleOpenNewsletter} />

                  {/* Top Navbar */}
                  <Navbar
                    onOpenBooking={handleOpenBooking}
                    activeSection={activeSection}
                    onNavigate={handleNavigate}
                    onOpenVedicAI={handleOpenVedicAI}
                    onOpenPalmScanner={handleOpenPalmScanner}
                    onOpenCalculators={handleOpenCalculators}
                    onStartChat={() => handleStartLiveChat()}
                    onOpenAdmin={() => {
                      setIsAdminView(true);
                      window.location.hash = '#admin';
                    }}
                  />

                  {/* Floating Side Scroll-Spy Indicator */}
                  <ScrollSpy 
                    activeSection={activeSection}
                    onNavigate={handleNavigate}
                  />

                  {/* Main Content Body */}
                  <main className="flex-grow w-full max-w-full overflow-x-hidden relative z-10 pb-16 sm:pb-20 md:pb-0">
                    {/* 1. Hero Section: Credentials, Trust Badges & Direct Consultation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <HeroSection
                        onOpenBooking={() => handleOpenBooking('lal-kitab')}
                        onStartChat={() => handleStartLiveChat()}
                        onOpenCalculators={handleOpenCalculators}
                        onNavigate={handleNavigate}
                      />
                    </motion.div>

                    {/* Featured On Credibility Banner */}
                    <FeaturedOnBanner />

                    <SectionDivider variant="surya" />

                    {/* 2. About Dr. Preeti Sehgal: 28+ Yrs, Pedigree & Ethics */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <AboutSection onOpenBooking={() => handleOpenBooking('vedic-kundli')} />
                    </motion.div>

                    <SectionDivider variant="lotus" />

                    {/* 3. Core Services Matrix (Lal Kitab, Kundli, Vastu, Tarot) */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <ServicesSection 
                        onOpenBooking={handleOpenBooking} 
                        onOpenPalmScanner={handleOpenPalmScanner}
                      />
                    </motion.div>

                    <SectionDivider variant="mandala" />

                    {/* 4. Practical Lal Kitab Remedies & Interactive Vedic Tools Suite */}
                    {/* 4a. Free Interactive Vedic Kundli & Dosha Checker */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <KundliCalculator onOpenBooking={handleOpenBooking} />
                    </motion.div>

                    <SectionDivider variant="geometric" />

                    {/* 4b. Lal Kitab Remedies Engine */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <LalKitabRemedies onOpenBooking={handleOpenBooking} />
                    </motion.div>

                    <SectionDivider variant="mandala" />

                    {/* 4c. 3-Card Tarot Oracle */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <TarotReader onOpenBooking={handleOpenBooking} />
                    </motion.div>

                    <SectionDivider variant="surya" />

                    {/* 4d. Numerology & Name Correction Tool */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <NumerologyTool onOpenBooking={handleOpenBooking} />
                    </motion.div>

                    <SectionDivider variant="lotus" />

                    {/* 4e. Daily Horoscope & Planetary Transits Deck */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <DailyHoroscopeSection
                        onStartChat={() => handleStartLiveChat()}
                        onOpenBooking={handleOpenBooking}
                      />
                    </motion.div>

                    <SectionDivider variant="mandala" />

                    {/* 4f. Daily Lucky Charms */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <DailyLuckyCharms
                        onOpenBooking={handleOpenBooking}
                        onStartChat={() => handleStartLiveChat()}
                        onNavigateToShop={() => handleNavigate('astromall')}
                      />
                    </motion.div>

                    <SectionDivider variant="geometric" />

                    {/* 4g. AstroMall Spiritual E-Commerce Store */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <AstroMallShop
                        onStartChat={() => handleStartLiveChat()}
                        onOpenBooking={handleOpenBooking}
                      />
                    </motion.div>

                    <SectionDivider variant="lotus" />

                    {/* 4h. Vedic AI Assistant */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <VedicAISection onOpenBooking={handleOpenBooking} />
                    </motion.div>

                    <SectionDivider variant="constellation" />

                    {/* 4i. Scientific Gemstone Guidance */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <GemstoneConsultant onOpenBooking={handleOpenBooking} />
                    </motion.div>

                    <SectionDivider variant="lotus" />

                    {/* 5. Non-Demolition Vastu Guide (16 Energetic Zones / 8 Directions) */}
                    <div id="vastu-shastra-wrapper" className="w-full relative z-30">
                      <VastuGuide onOpenBooking={handleOpenBooking} />
                    </div>

                    <SectionDivider variant="surya" />

                    {/* 6. Social Proof: Verified Testimonials & 5.0 Star Ratings */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <TestimonialsSection />
                    </motion.div>

                    <SectionDivider variant="geometric" />

                    {/* 7. Instagram Video Insights & Astro Tips Feed */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <InstagramFeed />
                    </motion.div>

                    <SectionDivider variant="mandala" />

                    {/* Astrology Knowledge Blog */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <AstroBlogSection
                        onStartChat={() => handleStartLiveChat()}
                        onOpenBooking={handleOpenBooking}
                      />
                    </motion.div>

                    <SectionDivider variant="constellation" />

                    {/* 8. FAQ (Online Zoom / Chamber Visits / Remedies Process) */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <FaqSection />
                    </motion.div>

                    <SectionDivider variant="geometric" />

                    {/* 9. Contact & Clinic Chambers (Roop Nagar & Kamla Nagar) */}
                    <motion.div
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.12 }}
                    >
                      <ContactSection />
                    </motion.div>
                  </main>

                  {/* Floating Interactive Quick Helper Widget */}
                  <AstroQuickWidget
                    onOpenBooking={handleOpenBooking}
                    onNavigate={handleNavigate}
                    onOpenNewsletter={handleOpenNewsletter}
                    onOpenVedicAI={handleOpenVedicAI}
                    onOpenPalmScanner={handleOpenPalmScanner}
                  />

                  {/* Footer */}
                  <Footer
                    onNavigate={handleNavigate}
                    onOpenBooking={handleOpenBooking}
                    onOpenNewsletter={handleOpenNewsletter}
                    onOpenAdmin={() => {
                      setIsAdminView(true);
                      window.location.hash = '#admin';
                    }}
                  />

                  {/* 20+ Niche Calculators Modal */}
                  <AstroCalculatorsModal
                    isOpen={isCalculatorsOpen}
                    onClose={() => setIsCalculatorsOpen(false)}
                    onStartChat={() => {
                      setIsCalculatorsOpen(false);
                      handleStartLiveChat();
                    }}
                  />

                  {/* Interactive Live Chat Simulator Modal */}
                  <LiveChatSimulatorModal
                    isOpen={isLiveChatOpen}
                    onClose={() => setIsLiveChatOpen(false)}
                    astrologerName={activeChatAstrologer}
                  />

                  {/* Live Palm Scanner (Hasta Rekha Biometrics) Modal */}
                  <PalmScannerModal
                    isOpen={isPalmScannerOpen}
                    onClose={handleClosePalmScanner}
                    onOpenBooking={handleOpenBooking}
                  />

                  {/* Vedic AI Assistant Floating Modal */}
                  <VedicAIModal
                    isOpen={isVedicAIOpen}
                    onClose={handleCloseVedicAI}
                    onOpenBooking={handleOpenBooking}
                  />

                  {/* Appointment & Consultation Booking Modal */}
                  <BookingModal
                    isOpen={isBookingOpen}
                    onClose={handleCloseBooking}
                    initialServiceId={selectedBookingService}
                  />

                  {/* Daily Cosmic Transit Newsletter Modal */}
                  <NewsletterModal
                    isOpen={isNewsletterOpen}
                    onClose={handleCloseNewsletter}
                  />

                  {/* User Profile Birth Data Storage Modal */}
                  <UserProfileModal />
                </div>
              )}
            </AdminAuthProvider>
          </ToastProvider>
        </UserProfileProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
