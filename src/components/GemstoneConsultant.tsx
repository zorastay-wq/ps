import React, { useState } from 'react';
import { GEMSTONES_DATA, DOCTOR_INFO } from '../data/brandData';
import { GemstoneInfo } from '../types';
import { Gem, Sparkles, ShieldCheck, CheckCircle2, Calendar, ArrowRight, RefreshCw, MessageCircle } from 'lucide-react';

interface GemstoneConsultantProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const GemstoneConsultant: React.FC<GemstoneConsultantProps> = ({ onOpenBooking }) => {
  const [selectedGem, setSelectedGem] = useState<GemstoneInfo>(GEMSTONES_DATA[0]);
  const [activeTab, setActiveTab] = useState<'details' | 'ritual' | 'mantra'>('details');

  const handleWhatsAppGemstone = (gemName: string) => {
    const text = `Namaste Dr. Preeti Sehgal ji, I would like to consult on the correct carat weight, metal, and energization ritual for wearing "${gemName}" based on my Janam Kundli.`;
    window.open(`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="gemstones" className="py-16 sm:py-24 bg-[#FFF9F2] dark:bg-[#120300] text-[#7C2D12] dark:text-amber-100 border-b border-orange-200 dark:border-amber-950/80 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 border border-orange-300 dark:border-amber-800 bg-orange-50 dark:bg-amber-950/80 px-3.5 py-1 rounded-full text-[11px] font-bold text-[#EA580C] dark:text-amber-300 tracking-[0.2em] uppercase mb-4 shadow-2xs">
            <Gem className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Navaratna Planetary Science &bull; रत्न परामर्श</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-[#7C2D12] dark:text-amber-100 tracking-tight">
            Certified Vedic Gemstone Recommendation & Energization
          </h2>
          <p className="text-[#9A3412] dark:text-amber-200/90 mt-3 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Wearing the right unheated, untreated gemstone amplifies your functional benefic planets. Learn the exact Vedic ritual (प्राण प्रतिष्ठा) and auspicious day to activate your gemstone.
          </p>
        </div>

        {/* 9 Gemstones Selector Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-10">
          {GEMSTONES_DATA.map((gem) => (
            <button
              key={gem.id}
              onClick={() => setSelectedGem(gem)}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                selectedGem.id === gem.id
                  ? 'bg-[#EA580C] text-white border-amber-300 shadow-md ring-2 ring-amber-400 font-bold'
                  : 'bg-white dark:bg-[#1E0601] border-orange-200 dark:border-amber-900/70 text-[#7C2D12] dark:text-amber-100 hover:border-[#EA580C] hover:bg-orange-50 dark:hover:bg-[#2A0B03]'
              }`}
            >
              <div
                className="w-5 h-5 rounded-full mb-1 shadow-inner border border-black/10 dark:border-white/20"
                style={{ backgroundColor: gem.colorHex }}
              />
              <span className="text-[10px] uppercase font-playfair font-bold tracking-wider block truncate w-full">{gem.name.split(' ')[0]}</span>
              <span className={`text-[9px] font-medium block ${selectedGem.id === gem.id ? 'text-amber-100' : 'text-[#9A3412] dark:text-amber-300/80'}`}>{gem.hindiName}</span>
            </button>
          ))}
        </div>

        {/* Selected Gemstone Deep Dive Card */}
        <div className="bg-white dark:bg-[#1A0501] rounded-2xl border border-orange-200 dark:border-amber-900/80 p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Gemstone Visual Spotlight */}
            <div className="lg:col-span-4 bg-orange-50/80 dark:bg-[#240802] p-6 rounded-2xl border border-orange-200 dark:border-amber-900/70 flex flex-col items-center justify-center text-center">
              <div
                className="w-24 h-24 rounded-2xl shadow-md flex items-center justify-center mb-4 border-2 border-white/60 dark:border-amber-700/60 relative"
                style={{ backgroundColor: selectedGem.colorHex }}
              >
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
                <Gem className="w-10 h-10 text-white drop-shadow-md relative z-10" />
              </div>

              <h3 className="font-playfair text-xl font-bold text-[#7C2D12] dark:text-amber-100">
                {selectedGem.name}
              </h3>
              <div className="font-playfair text-sm text-[#EA580C] dark:text-amber-300 font-bold mb-3">
                {selectedGem.hindiName}
              </div>

              <div className="w-full space-y-2.5 text-xs border-t border-orange-200 dark:border-amber-900/70 pt-4 text-left">
                <div className="flex justify-between items-center text-[#9A3412] dark:text-amber-300/90">
                  <span className="font-medium">Governing Planet:</span>
                  <span className="font-bold text-[#7C2D12] dark:text-amber-100">{selectedGem.planet}</span>
                </div>
                <div className="flex justify-between items-center text-[#9A3412] dark:text-amber-300/90">
                  <span className="font-medium">Favorable Metal:</span>
                  <span className="font-bold text-[#EA580C] dark:text-amber-400">{selectedGem.metal}</span>
                </div>
                <div className="flex justify-between items-center text-[#9A3412] dark:text-amber-300/90">
                  <span className="font-medium">Wearing Finger:</span>
                  <span className="font-bold text-[#7C2D12] dark:text-amber-100">{selectedGem.finger}</span>
                </div>
                <div className="flex justify-between items-center text-[#9A3412] dark:text-amber-300/90">
                  <span className="font-medium">Auspicious Day:</span>
                  <span className="font-bold text-[#7C2D12] dark:text-amber-100">{selectedGem.auspiciousDay}</span>
                </div>
              </div>
            </div>

            {/* Right: Tabbed Deep-Dive Content */}
            <div className="lg:col-span-8 space-y-5">
              {/* Sub-Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-orange-200 dark:border-amber-900/70 pb-3">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-2xs ${
                    activeTab === 'details'
                      ? 'bg-[#EA580C] text-white shadow-md ring-2 ring-amber-300 dark:ring-amber-500'
                      : 'bg-orange-50 dark:bg-[#250802] text-[#7C2D12] dark:text-amber-200 hover:text-[#EA580C] dark:hover:text-amber-100 border border-orange-200 dark:border-amber-900/70 hover:bg-orange-100'
                  }`}
                >
                  Key Astrological Benefits
                </button>

                <button
                  onClick={() => setActiveTab('ritual')}
                  className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-2xs ${
                    activeTab === 'ritual'
                      ? 'bg-[#EA580C] text-white shadow-md ring-2 ring-amber-300 dark:ring-amber-500'
                      : 'bg-orange-50 dark:bg-[#250802] text-[#7C2D12] dark:text-amber-200 hover:text-[#EA580C] dark:hover:text-amber-100 border border-orange-200 dark:border-amber-900/70 hover:bg-orange-100'
                  }`}
                >
                  Pran Pratishtha Ritual (प्राण प्रतिष्ठा)
                </button>

                <button
                  onClick={() => setActiveTab('mantra')}
                  className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all cursor-pointer shadow-2xs ${
                    activeTab === 'mantra'
                      ? 'bg-[#EA580C] text-white shadow-md ring-2 ring-amber-300 dark:ring-amber-500'
                      : 'bg-orange-50 dark:bg-[#250802] text-[#7C2D12] dark:text-amber-200 hover:text-[#EA580C] dark:hover:text-amber-100 border border-orange-200 dark:border-amber-900/70 hover:bg-orange-100'
                  }`}
                >
                  Vedic Beej Mantra
                </button>
              </div>

              {/* Tab 1: Benefits */}
              {activeTab === 'details' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedGem.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 bg-orange-50/70 dark:bg-[#250802] p-3.5 rounded-xl border border-orange-200 dark:border-amber-900/70 text-xs text-[#7C2D12] dark:text-amber-100 font-normal leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#EA580C] dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-orange-50/80 dark:bg-[#250802] border border-orange-200 dark:border-amber-900/70 text-xs text-[#7C2D12] dark:text-amber-100/90 font-normal">
                    <strong className="text-[#EA580C] dark:text-amber-400 uppercase tracking-wider block mb-1 text-[11px] font-bold">Suitable Ascendants (Lagnas):</strong>
                    <span>{selectedGem.suitableFor.join(', ')}</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Ritual */}
              {activeTab === 'ritual' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-5 rounded-xl bg-orange-50/80 dark:bg-[#250802] border border-orange-200 dark:border-amber-900/70 text-xs text-[#7C2D12] dark:text-amber-100 font-normal space-y-2.5 leading-relaxed">
                    <div className="font-playfair text-xs font-bold text-[#EA580C] dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-orange-200 dark:border-amber-900/60">
                      <Sparkles className="w-4 h-4 text-[#EA580C] dark:text-amber-400" />
                      <span>Vedic Energization Steps (शुद्धिकरण एवं प्राण प्रतिष्ठा):</span>
                    </div>
                    <p className="flex items-start gap-2">
                      <strong className="text-[#EA580C] dark:text-amber-400 font-bold shrink-0">1.</strong>
                      <span>Immerse the ring/pendant in raw unboiled cow milk (कच्चा दूध), Gangajal, and honey overnight or 2 hours prior to sunrise.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <strong className="text-[#EA580C] dark:text-amber-400 font-bold shrink-0">2.</strong>
                      <span>Wash gently with pure water on <strong>{selectedGem.auspiciousDay}</strong> during the auspicious Hora of <strong>{selectedGem.planet}</strong>.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <strong className="text-[#EA580C] dark:text-amber-400 font-bold shrink-0">3.</strong>
                      <span>Light an oil lamp and incense. Chant the Beej Mantra 108 times using a Rudraksha or Sphatik mala.</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <strong className="text-[#EA580C] dark:text-amber-400 font-bold shrink-0">4.</strong>
                      <span>Wear the energized gemstone on the <strong>{selectedGem.finger}</strong> while facing East (Surya direction).</span>
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Mantra */}
              {activeTab === 'mantra' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-6 rounded-xl bg-orange-50/90 dark:bg-[#250802] border border-orange-200 dark:border-amber-900/70 text-center space-y-3">
                    <span className="text-[11px] uppercase tracking-widest text-[#EA580C] dark:text-amber-400 font-bold block">Sacred Beej Mantra (१०८ बार जपें)</span>
                    <div className="font-playfair text-lg sm:text-xl text-[#7C2D12] dark:text-amber-100 font-bold leading-relaxed px-2 py-1 bg-white dark:bg-[#1E0601] rounded-xl border border-orange-200 dark:border-amber-900/60 shadow-xs">
                      "{selectedGem.mantra}"
                    </div>
                    <span className="text-xs text-[#9A3412] dark:text-amber-300/90 font-normal block leading-relaxed">
                      Recite 108 times at sunrise on <strong>{selectedGem.auspiciousDay}</strong> before wearing for maximum planetary absorption.
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-orange-200 dark:border-amber-900/70 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => handleWhatsAppGemstone(selectedGem.name)}
                  className="inline-flex items-center gap-1.5 border border-orange-300 dark:border-amber-800 hover:bg-orange-100 dark:hover:bg-[#2D0D04] text-[#C2410C] dark:text-amber-300 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer bg-white dark:bg-[#1E0601] shadow-2xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>WhatsApp Astrologer About {selectedGem.name}</span>
                </button>

                <button
                  onClick={() => onOpenBooking('gemstone-consult')}
                  className="inline-flex items-center gap-1.5 bg-[#EA580C] hover:bg-[#C2410C] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  <span>Book Gemstone Prescription</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
