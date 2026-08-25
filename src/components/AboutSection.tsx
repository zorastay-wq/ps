import React from 'react';
import { DOCTOR_INFO } from '../data/brandData';
import { StaggeredHeading, MysticHighlight, FluidCounter } from './typography';
import { Award, ShieldCheck, HeartHandshake, CheckCircle2, Sparkles, MapPin, Phone, Calendar, ArrowRight, Star, Quote } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#FFF9F2] text-[#7C2D12] border-b border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Column */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl p-8 text-[#7C2D12] shadow-xl border border-orange-200 text-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-400 group">
              
              {/* Doctor Visual Avatar with Smooth Zoom */}
              <div className="relative w-28 h-28 mx-auto rounded-full p-1 shadow-md mb-5 border-2 border-[#F97316]/60 bg-orange-50 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                  alt="Dr. Preeti Sehgal"
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 ease-in-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C2410C] block mb-1">
                Jyotish Ratna &bull; Gold Medalist
              </span>

              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#431407] mb-1 tracking-tight">
                Dr. Preeti Sehgal
              </h3>
              <p className="text-xs sm:text-sm text-[#7C2D12] font-medium mb-6 leading-relaxed">
                Vedic Astrologer, Lal Kitab Expert & Vastu Shastra Consultant
              </p>

              <div className="grid grid-cols-2 gap-3 text-left bg-[#FFF7ED] p-4 rounded-xl border border-orange-200 text-xs mb-6 font-normal shadow-xs">
                <div>
                  <div className="text-[10px] text-[#C2410C] font-bold uppercase tracking-wider">Experience</div>
                  <div className="font-bold text-sm sm:text-base text-[#431407]">
                    <FluidCounter value={28} suffix="+ Years" duration={1.8} />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[#C2410C] font-bold uppercase tracking-wider">Astrologies Done</div>
                  <div className="font-bold text-sm sm:text-base text-[#431407]">
                    <FluidCounter value={150000} suffix="+" duration={2.2} />
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-[#C2410C] font-bold uppercase tracking-wider">Chamber 1</div>
                  <div className="font-bold text-xs sm:text-sm text-[#431407]">Roop Nagar, Delhi</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#C2410C] font-bold uppercase tracking-wider">Chamber 2</div>
                  <div className="font-bold text-xs sm:text-sm text-[#431407]">Kamla Nagar, Delhi</div>
                </div>
              </div>

              {/* Astro Quote Line */}
              <div className="text-xs sm:text-sm italic text-[#431407] bg-[#FFEDD5]/80 p-4 rounded-xl border border-orange-300/80 leading-relaxed font-medium font-playfair shadow-xs">
                “Dedicated to transforming planetary obstacles into conscious spiritual and financial evolution through authentic Vedic discipline.”
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-white px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#C2410C] tracking-[0.18em] uppercase shadow-xs">
              <Award className="w-3.5 h-3.5 text-[#F97316]" />
              <span>28+ Years in Delhi</span>
            </div>

            <StaggeredHeading
              text="Compassionate Vedic Foresight & Honest Guidance"
              as="h2"
              className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-[#431407] tracking-tight leading-tight"
              goldAccentWords={['Vedic', 'Foresight', 'Honest']}
              staggerDelay={0.04}
            />

            <p className="text-[#431407] text-base sm:text-lg leading-relaxed font-normal">
              Dr. Preeti Sehgal is a celebrated Jyotish authority based in Delhi, renowned for her meticulous mathematical chart interpretations and non-alarmist approach. With extensive mastery in both traditional <MysticHighlight tooltip="Classical Vedic astrological calculation system">Parashari Vedic Astrology</MysticHighlight> and the ancient <MysticHighlight tooltip="Potent Urdu-Persian remedial texts">Lal Kitab treatise</MysticHighlight>, she bridges cosmic laws with modern life dilemmas.
            </p>

            <p className="text-[#7C2D12] text-sm sm:text-base leading-relaxed font-normal">
              Unlike commercial astrological outlets that instill anxiety or push exorbitant rituals, Dr. Preeti Sehgal focuses on clear diagnosis, emotional empowerment, and simple, cost-effective remedies that work naturally in day-to-day life.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {DOCTOR_INFO.coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-white border border-orange-200 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-lg hover:shadow-orange-500/15 hover:border-orange-300"
                >
                  <div className="flex items-center gap-2 font-playfair text-sm sm:text-base font-bold text-[#431407] mb-1.5 tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-[#F97316] flex-shrink-0" />
                    <span>{val.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#7C2D12] leading-relaxed pl-6 font-normal">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                id="about-book-btn"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer cta-glow-hover"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Book Consultation</span>
              </button>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#7C2D12]">
                <MapPin className="w-4 h-4 text-[#F97316]" />
                <span>Kamla Nagar & Roop Nagar Chambers</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
