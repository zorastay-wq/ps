import React from 'react';
import { BrandLogo } from './BrandLogo';
import { DOCTOR_INFO } from '../data/brandData';
import { Phone, Mail, MapPin, Instagram, Globe, MessageCircle, ExternalLink, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: (serviceId?: string) => void;
  onOpenNewsletter?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking, onOpenNewsletter, onOpenAdmin }) => {
  const whatsappUrl = `https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Namaste Dr. Preeti Sehgal ji, I would like to inquire about a consultation.'
  )}`;

  return (
    <footer className="bg-[#FFF9F2] text-[#7C2D12] pt-16 sm:pt-20 pb-28 md:pb-16 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Shloka Banner */}
        <div className="text-center pb-10 border-b border-orange-200 max-w-2xl mx-auto">
          <p className="font-playfair text-base sm:text-lg text-[#7C2D12] tracking-widest font-normal">
            ॥ असतो मा सद्गमय तमसो मा ज्योतिर्गमय मृत्योर्मा अमृतं गमय ॥
          </p>
          <p className="text-xs text-[#C2410C] mt-1.5 italic font-light">
            "Lead us from the unreal to the real, from darkness to light, from mortality to immortality."
          </p>
        </div>

        {/* 4-Column Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 py-12">
          
          {/* Col 1: Brand & Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="dark" size="lg" />
            
            <p className="text-xs text-[#9A3412] leading-relaxed max-w-sm font-light">
              Official web platform for <strong className="text-[#7C2D12] font-semibold">Dr. Preeti Sehgal</strong> — Delhi’s celebrated Vedic Astrologer, Lal Kitab scholar, and Vastu Consultant with 28+ years of clinical astrological expertise.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={DOCTOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 flex items-center justify-center text-[#F97316] hover:text-[#EA580C] transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 shadow-xs hover:shadow-orange-500/20"
                title="Instagram @drpreetisehgal1"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 flex items-center justify-center text-[#F97316] hover:text-[#EA580C] transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 shadow-xs hover:shadow-orange-500/20"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={DOCTOR_INFO.googleShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 flex items-center justify-center text-[#F97316] hover:text-[#EA580C] transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 shadow-xs hover:shadow-orange-500/20"
                title="Google Business Profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={DOCTOR_INFO.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 flex items-center justify-center text-[#F97316] hover:text-[#EA580C] transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-110 shadow-xs hover:shadow-orange-500/20"
                title="Official Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Services Quick Access (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-playfair text-xs font-semibold text-[#F97316] tracking-[0.2em] uppercase">
              Specialized Services
            </h4>
            <ul className="space-y-2 text-xs text-[#9A3412] font-light">
              <li>
                <button
                  onClick={() => { onNavigate('lalkitab'); }}
                  className="hover:text-[#F97316] transition-colors cursor-pointer text-left link-gold-underline"
                >
                  Lal Kitab Remedies & Darpan
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('kundli-tool'); }}
                  className="hover:text-[#F97316] transition-colors cursor-pointer text-left link-gold-underline"
                >
                  Vedic Janam Kundli Analysis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking('kundli-milan')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer text-left link-gold-underline"
                >
                  36 Guna Milan & Matchmaking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vastu-shastra')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer text-left link-gold-underline"
                >
                  Vastu Shastra (Without Demolition)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tarot')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer text-left link-gold-underline"
                >
                  3-Card Tarot Oracle Reading
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gemstones')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer text-left link-gold-underline"
                >
                  Scientific Gemstone & Rudraksha
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-playfair text-xs font-semibold text-[#F97316] tracking-[0.2em] uppercase">
              Free Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#9A3412] font-light">
              <li>
                <button
                  onClick={() => onNavigate('kundli-tool')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer link-gold-underline"
                >
                  Free Kundli Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lalkitab')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer link-gold-underline"
                >
                  Lal Kitab Remedy Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tarot')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer link-gold-underline"
                >
                  Tarot Oracle Deck
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('numerology')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer link-gold-underline"
                >
                  Moolank & Name Sum
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vastu-shastra')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer link-gold-underline"
                >
                  8-Zone Vastu Compass
                </button>
              </li>
              {onOpenNewsletter && (
                <li>
                  <button
                    id="footer-newsletter-btn"
                    onClick={onOpenNewsletter}
                    className="text-[#F97316] hover:text-[#EA580C] transition-colors cursor-pointer flex items-center gap-1 font-semibold link-gold-underline"
                  >
                    <Sparkles className="w-3 h-3 text-[#F97316]" />
                    <span>Daily Transit Digest (Free)</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Clinic Info & Phone (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-playfair text-xs font-semibold text-[#F97316] tracking-[0.2em] uppercase">
              Delhi Chambers
            </h4>
            <div className="space-y-2 text-xs text-[#9A3412] font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span className="link-gold-underline">Roop Nagar & Kamla Nagar, Delhi - 110007</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                <a href={`tel:${DOCTOR_INFO.primaryPhone}`} className="hover:text-[#F97316] text-[#7C2D12] font-medium link-gold-underline">
                  {DOCTOR_INFO.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                <a href={`tel:${DOCTOR_INFO.secondaryPhone}`} className="hover:text-[#F97316] link-gold-underline">
                  {DOCTOR_INFO.secondaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                <a href={`mailto:${DOCTOR_INFO.email}`} className="hover:text-[#F97316] link-gold-underline">
                  {DOCTOR_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 border-t border-orange-200 text-center space-y-3">
          <p className="text-[11px] text-[#9A3412]/80 max-w-4xl mx-auto leading-relaxed font-light">
            <strong>Astrological Disclaimer:</strong> Astrological forecasts, Lal Kitab remedies, Tarot readings, and Vastu consultations are spiritual advisory tools grounded in ancient Vedic science. Individual outcomes depend upon personal karma, effort, and free will. Consultations are confidential.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#9A3412] font-light">
            <span>&copy; {new Date().getFullYear()} Dr. Preeti Sehgal ({DOCTOR_INFO.officialWebsite.replace('https://', '')}). All Rights Reserved.</span>
            <span className="hidden sm:inline">&bull;</span>
            <button
              type="button"
              onClick={() => {
                if (onOpenAdmin) {
                  onOpenAdmin();
                } else {
                  window.location.hash = '#admin';
                }
              }}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#EA580C] hover:text-[#C2410C] transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Admin Portal & CMS</span>
            </button>
          </div>
        </div>

      </div>

      {/* Floating Bottom Quick Contact Bar (Mobile & Desktop) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-orange-200 py-1.5 px-3 sm:py-2 sm:px-4 shadow-2xl flex items-center justify-around md:justify-end gap-2 sm:gap-3 max-w-lg md:max-w-none mx-auto md:right-6 md:left-auto md:bottom-6 md:rounded-2xl md:border md:border-orange-200">
        <a
          href={`tel:${DOCTOR_INFO.primaryPhone}`}
          className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-[#7C2D12] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors border border-orange-200"
        >
          <Phone className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-[#7C2D12] px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors border border-orange-200"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#F97316]" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => onOpenBooking()}
          className="flex items-center gap-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-white" />
          <span>Book Session</span>
        </button>
      </div>
    </footer>
  );
};
