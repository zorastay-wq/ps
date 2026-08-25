import React, { useState } from 'react';
import { FAQ_DATA, DOCTOR_INFO } from '../data/brandData';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#FFF9F2] text-[#7C2D12] border-b border-orange-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 border border-orange-300 bg-orange-50 px-3.5 py-1 rounded-full text-[11px] font-bold text-[#C2410C] tracking-[0.2em] uppercase mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Clarity & Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-[#431407] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[#431407] mt-3 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed">
            Everything you need to know about preparing for your astrological consultation with Dr. Preeti Sehgal.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-orange-200 overflow-hidden shadow-sm hover:border-orange-300 transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-playfair text-base sm:text-lg font-bold text-[#431407] hover:text-[#F97316] transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#F97316] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#7C2D12] flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#431407] leading-relaxed border-t border-orange-100 font-normal">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* More Questions Helper */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-white border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal shadow-sm">
          <span className="text-[#431407] text-center sm:text-left text-xs sm:text-sm font-semibold">
            Have a custom query not covered here? Reach out directly via WhatsApp.
          </span>
          <a
            href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
              'Namaste Dr. Preeti Sehgal ji, I have a quick question before booking a consultation.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex-shrink-0 transition-colors shadow-sm cursor-pointer cta-glow-hover"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
