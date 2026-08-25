import React, { useState } from 'react';
import { Sparkles, MessageCircle, Calendar, Compass, BookOpen, ArrowUp, X, Phone, Mail, User, Camera, MapPin } from 'lucide-react';
import { DOCTOR_INFO } from '../data/brandData';
import { useUserProfile } from '../context/UserProfileContext';
import { ThemeToggle } from './ThemeToggle';

interface AstroQuickWidgetProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenNewsletter?: () => void;
  onOpenVedicAI?: () => void;
  onOpenPalmScanner?: () => void;
}

export const AstroQuickWidget: React.FC<AstroQuickWidgetProps> = ({
  onOpenBooking,
  onNavigate,
  onOpenNewsletter,
  onOpenVedicAI,
  onOpenPalmScanner
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { openProfileModal, hasCustomProfile, profile } = useUserProfile();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAction = (sectionId: string) => {
    setIsOpen(false);
    onNavigate(sectionId);
  };

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end gap-3 max-w-[calc(100vw-1.5rem)]">
      {/* Expanded Quick Drawer */}
      {isOpen && (
        <div className="bg-white/95 backdrop-blur-xl border border-orange-200/90 rounded-2xl p-4 shadow-2xl shadow-orange-950/15 w-72 max-w-[calc(100vw-1.5rem)] text-[#7C2D12] text-xs space-y-2.5 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-orange-100">
            <div className="flex items-center gap-1.5 font-playfair text-xs text-[#F97316] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Astro Quick Desk</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9A3412] hover:text-[#7C2D12] hover:bg-orange-100 p-1 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Quick Access */}
          <button
            onClick={() => {
              setIsOpen(false);
              openProfileModal();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-50/70 hover:bg-orange-100/90 border border-orange-200 text-left transition-all cursor-pointer hover:shadow-xs"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[#F97316]" />
              <div>
                <div className="font-semibold text-[#7C2D12]">
                  {hasCustomProfile ? profile.fullName : 'My Birth Profile'}
                </div>
                <div className="text-[10px] text-[#C2410C]">
                  {hasCustomProfile ? 'Saved in Local Storage' : 'Save Birth Details'}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-[#F97316] font-bold">Manage &rarr;</span>
          </button>

          {/* Theme Quick Switcher */}
          <div className="pt-0.5">
            <ThemeToggle variant="full" />
          </div>

          <div className="space-y-1.5">
            {onOpenVedicAI && (
              <button
                id="quick-desk-vedic-ai-btn"
                onClick={() => {
                  setIsOpen(false);
                  onOpenVedicAI();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-orange-100 to-amber-100/70 hover:from-orange-200 hover:to-amber-200 border border-orange-300 text-left transition-all cursor-pointer shadow-xs hover:scale-[1.01]"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F97316]" />
                  <div>
                    <div className="font-bold text-[#7C2D12] flex items-center gap-1">
                      <span>Vedic AI Assistant</span>
                      <span className="text-[9px] bg-[#F97316] text-white px-1.5 py-0.2 rounded-full">AI</span>
                    </div>
                    <div className="text-[10px] text-[#C2410C]">Ask Vastu & Lal Kitab Queries</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#F97316] font-bold">Chat &rarr;</span>
              </button>
            )}

            {onOpenPalmScanner && (
              <button
                id="quick-desk-palm-scanner-btn"
                onClick={() => {
                  setIsOpen(false);
                  onOpenPalmScanner();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-50/60 hover:bg-orange-100/80 border border-orange-200 text-left transition-all cursor-pointer hover:shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#F97316]" />
                  <div>
                    <div className="font-semibold text-[#7C2D12] flex items-center gap-1">
                      <span>Live Palm Scanner</span>
                      <span className="text-[9px] bg-orange-200 text-[#7C2D12] px-1.5 py-0.2 rounded-full font-bold">CV</span>
                    </div>
                    <div className="text-[10px] text-[#9A3412]">Hasta Rekha Biometrics</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#F97316] font-bold">Scan &rarr;</span>
              </button>
            )}

            <button
              onClick={() => handleAction('vastu-shastra')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-50/70 hover:bg-orange-100/90 border border-orange-300 text-left transition-all cursor-pointer hover:shadow-xs"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F97316]" />
                <div>
                  <div className="font-semibold text-[#7C2D12]">Vastu Shastra Guide</div>
                  <div className="text-[10px] text-[#9A3412]">9-Zone Compass & Remedies</div>
                </div>
              </div>
              <span className="text-[10px] text-[#F97316] font-bold">Guide &rarr;</span>
            </button>

            <button
              onClick={() => handleAction('kundli-tool')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-50/40 hover:bg-orange-100/80 border border-orange-200 text-left transition-all cursor-pointer hover:shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#F97316]" />
                <div>
                  <div className="font-semibold text-[#7C2D12]">Free Janam Kundli</div>
                  <div className="text-[10px] text-[#9A3412]">Ascendant & Doshas</div>
                </div>
              </div>
              <span className="text-[10px] text-[#F97316] font-bold">Instant &rarr;</span>
            </button>

            <button
              onClick={() => handleAction('lalkitab')}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-50/40 hover:bg-orange-100/80 border border-orange-200 text-left transition-all cursor-pointer hover:shadow-xs"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#F97316]" />
                <div>
                  <div className="font-semibold text-[#7C2D12]">Lal Kitab Remedies</div>
                  <div className="text-[10px] text-[#9A3412]">43-Day Upays</div>
                </div>
              </div>
              <span className="text-[10px] text-[#F97316] font-bold">Explore &rarr;</span>
            </button>

            {onOpenNewsletter && (
              <button
                id="quick-desk-newsletter-btn"
                onClick={() => {
                  setIsOpen(false);
                  onOpenNewsletter();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-orange-50/40 hover:bg-orange-100/80 border border-orange-200 text-left transition-all cursor-pointer hover:shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#F97316]" />
                  <div>
                    <div className="font-semibold text-[#7C2D12]">Daily Transit Digest</div>
                    <div className="text-[10px] text-[#C2410C]">Free Morning Email</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#F97316] font-bold">Join &rarr;</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold text-left transition-all cursor-pointer shadow-md shadow-orange-500/20 cta-glow-hover"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white" />
                <div>
                  <div className="font-bold">Book Appointment</div>
                  <div className="text-[10px] text-white/90 font-normal">Chamber & Video Calls</div>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold">&rarr;</span>
            </button>
          </div>

          <div className="pt-2 border-t border-orange-100 flex items-center justify-between gap-2">
            <a
              href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
                'Namaste Dr. Preeti Sehgal ji, I would like to book a direct consultation slot.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-xs text-[#C2410C] transition-all font-semibold whatsapp-glow-hover"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${DOCTOR_INFO.primaryPhone}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-200 text-xs text-[#7C2D12] transition-all font-semibold hover:border-orange-300"
            >
              <Phone className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Call</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Buttons Bar */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to top of page"
          className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-orange-200 hover:border-orange-400 text-[#7C2D12] hover:bg-orange-50 flex items-center justify-center shadow-lg shadow-orange-950/10 transition-all cursor-pointer hover:scale-105"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-3 rounded-full font-semibold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all cursor-pointer group cta-glow-hover"
        >
          <Sparkles className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span>Astro Help</span>
        </button>
      </div>
    </aside>
  );
};
