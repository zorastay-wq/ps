import React from 'react';
import { Sparkles, Bot, Compass, BookOpen, ShieldCheck, Flame } from 'lucide-react';
import { VedicAIAssistant } from './VedicAIAssistant';
import { StaggeredHeading } from './typography/StaggeredHeading';

interface VedicAISectionProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const VedicAISection: React.FC<VedicAISectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="vedic-ai" className="py-16 md:py-24 bg-[#FFF9F2] relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200 text-[#EA580C] px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>AI Vedic Consultation</span>
          </div>

          <StaggeredHeading
            text="Vedic AI Assistant: Instant Vastu & Lal Kitab Guidance"
            className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-[#7C2D12] leading-tight"
          />

          <p className="text-sm sm:text-base text-[#7C2D12]/80 leading-relaxed">
            Get immediate answers to your specific Vastu Shastra directional defects and practical 43-day Lal Kitab remedies, synthesized with traditional Vedic principles.
          </p>

          {/* Value proposition badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-semibold text-[#7C2D12]">
            <span className="flex items-center gap-1.5 bg-white border border-orange-200 px-3 py-1 rounded-full shadow-xs">
              <Compass className="w-3.5 h-3.5 text-[#F97316]" /> Zero-Demolition Vastu
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-orange-200 px-3 py-1 rounded-full shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#F97316]" /> 43-Day Lal Kitab Upays
            </span>
            <span className="flex items-center gap-1.5 bg-white border border-orange-200 px-3 py-1 rounded-full shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" /> Safe, Non-Superstitious
            </span>
          </div>
        </div>

        {/* Embedded Interactive Assistant */}
        <div className="max-w-4xl mx-auto">
          <VedicAIAssistant onOpenBooking={onOpenBooking} />
        </div>
      </div>
    </section>
  );
};
