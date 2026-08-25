import React, { useState } from 'react';
import { TAROT_DECK } from '../data/brandData';
import { RIDER_WAITE_DECK, VEDIC_HOLOGRAM_DECK, RIDER_WAITE_HISTORICAL_INFO } from '../data/riderWaiteData';
import { TarotCard, TarotDeckTheme } from '../types';
import { useToast } from '../context/ToastContext';
import { TarotDeck3D } from './3d/TarotDeck3D';
import { StaggeredHeading, MysticHighlight } from './typography';
import {
  Sparkles,
  RefreshCw,
  Eye,
  Calendar,
  RotateCcw,
  Info,
  X,
  BookOpen,
  Compass,
  Layers,
  Check,
  Search,
  ExternalLink,
  Flame,
  Droplets,
  Wind,
  Mountain
} from 'lucide-react';

interface TarotReaderProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const TarotReader: React.FC<TarotReaderProps> = ({ onOpenBooking }) => {
  const { showReadingComplete } = useToast();
  const [deckTheme, setDeckTheme] = useState<TarotDeckTheme>('rider-waite');
  const [spreadMode, setSpreadMode] = useState<'timeline' | 'love' | 'career'>('timeline');
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showDeckInfoModal, setShowDeckInfoModal] = useState(false);
  const [showDeckExplorer, setShowDeckExplorer] = useState(false);
  const [explorerSearch, setExplorerSearch] = useState('');
  const [explorerFilter, setExplorerFilter] = useState<'all' | 'Major' | 'Wands' | 'Cups' | 'Swords' | 'Pentacles'>('all');

  const activeDeckSource = deckTheme === 'rider-waite' ? RIDER_WAITE_DECK : VEDIC_HOLOGRAM_DECK;

  const drawCards = () => {
    setIsShuffling(true);
    setFlippedCards([false, false, false]);
    setTimeout(() => {
      // Draw 3 distinct cards and assign 50% probability for upright vs reversed orientation
      const shuffled = [...activeDeckSource].sort(() => 0.5 - Math.random());
      const drawnWithOrientation: TarotCard[] = shuffled.slice(0, 3).map((card) => {
        const isReversed = Math.random() < 0.5;
        return {
          ...card,
          isReversed
        };
      });

      setSelectedCards(drawnWithOrientation);
      setIsShuffling(false);
      setHasDrawn(true);

      // Staggered cinematic auto-flip
      setTimeout(() => setFlippedCards([true, false, false]), 600);
      setTimeout(() => setFlippedCards([true, true, false]), 1900);
      setTimeout(() => {
        setFlippedCards([true, true, true]);
        showReadingComplete(
          deckTheme === 'rider-waite' ? 'Rider-Waite Tarot Spread Revealed' : 'Vedic Holographic Spread Revealed',
          'All 3 cards positioned with archetypal upright/reversed interpretations.'
        );
      }, 3200);
    }, 1000);
  };

  const getPositionLabel = (index: number) => {
    if (spreadMode === 'timeline') {
      return index === 0 ? '1. Past Karma & Roots (भूतकाल)' : index === 1 ? '2. Present Circumstance (वर्तमान)' : '3. Outcome & Divine Advice (भविष्य)';
    }
    if (spreadMode === 'love') {
      return index === 0 ? '1. Your Heart & Desires' : index === 1 ? '2. Partner Energy & Truth' : '3. Relationship Trajectory';
    }
    return index === 0 ? '1. Current Career Position' : index === 1 ? '2. Hidden Obstacles / Competitors' : '3. Financial Growth & Success';
  };

  const getSpreadAdviceText = (card: TarotCard, index: number) => {
    if (!card.spreadAdvice) {
      return card.isReversed ? card.reversedMeaning : card.uprightMeaning;
    }
    if (index === 0) return card.spreadAdvice.past || card.uprightMeaning;
    if (index === 1) return card.spreadAdvice.present || card.uprightMeaning;
    return card.spreadAdvice.future || card.uprightMeaning;
  };

  const toggleCardOrientation = (index: number) => {
    setSelectedCards((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          isReversed: !updated[index].isReversed
        };
      }
      return updated;
    });
  };

  // Filtered cards for the 78-Card Deck Encyclopedia modal
  const filteredExplorerCards = RIDER_WAITE_DECK.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(explorerSearch.toLowerCase()) ||
      c.uprightMeaning.toLowerCase().includes(explorerSearch.toLowerCase()) ||
      (c.suit && c.suit.toLowerCase().includes(explorerSearch.toLowerCase()));
    
    if (explorerFilter === 'all') return matchesSearch;
    if (explorerFilter === 'Major') return matchesSearch && c.arcana === 'Major';
    return matchesSearch && c.suit === explorerFilter;
  });

  const isRWS = deckTheme === 'rider-waite';

  return (
    <section id="tarot" className="py-16 sm:py-24 bg-[#FFF9F2] text-[#7C2D12] border-b border-orange-200 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 border border-orange-300 bg-white px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#C2410C] tracking-[0.18em] uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Dual Archetypal Oracle &bull; टैरो ऑरेकल</span>
          </div>
          
          <StaggeredHeading
            text="Interactive 3-Card Tarot Oracle"
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-[#431407] tracking-tight"
            goldAccentWords={['Tarot', 'Oracle']}
            staggerDelay={0.04}
          />
          
          <p className="text-[#431407] mt-3 text-sm sm:text-base font-normal max-w-2xl mx-auto px-2 leading-relaxed">
            Consult the world-renowned <strong className="font-semibold text-[#C2410C]">1909 Classic Rider-Waite-Smith 78-card deck</strong> or our <strong className="font-semibold text-[#C2410C]">Holographic Vedic Oracle</strong> to uncover karmic lessons, subconscious blocks, and future outcomes with realistic 3D orientation physics.
          </p>
        </div>

        {/* DECK THEME SELECTOR & HISTORICAL INFO BUTTON */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <div className="bg-white p-1.5 rounded-2xl border-2 border-orange-200 shadow-md flex items-center gap-1.5 max-w-md w-full sm:w-auto">
            <button
              onClick={() => {
                setDeckTheme('rider-waite');
                setHasDrawn(false);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                deckTheme === 'rider-waite'
                  ? 'bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-[#FDE047] shadow-md border border-[#D4AF37]/50'
                  : 'text-[#431407] hover:bg-orange-50'
              }`}
            >
              <span className="text-base">🎴</span>
              <span>Classic Rider-Waite (78 Cards)</span>
            </button>

            <button
              onClick={() => {
                setDeckTheme('vedic');
                setHasDrawn(false);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                deckTheme === 'vedic'
                  ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-md'
                  : 'text-[#431407] hover:bg-orange-50'
              }`}
            >
              <span className="text-base">🕉️</span>
              <span>Vedic Hologram Oracle</span>
            </button>
          </div>

          {/* Educational Info Modal Trigger & Deck Browser */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeckInfoModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-orange-200 text-[#C2410C] hover:border-orange-400 hover:bg-orange-50 text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
              title="About the 1909 Rider-Waite-Smith Deck"
            >
              <Info className="w-4 h-4 text-[#F97316]" />
              <span>Deck History</span>
            </button>

            <button
              onClick={() => setShowDeckExplorer(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-orange-200 text-[#431407] hover:border-orange-400 hover:bg-orange-50 text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
              title="Browse all 78 Rider-Waite Cards"
            >
              <BookOpen className="w-4 h-4 text-[#B45309]" />
              <span>78 Cards Encyclopedia</span>
            </button>
          </div>
        </div>

        {/* Spread Mode Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 px-1">
          <button
            onClick={() => { setSpreadMode('timeline'); setHasDrawn(false); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold transition-all cursor-pointer group emoji-bounce-hover ${
              spreadMode === 'timeline'
                ? isRWS ? 'bg-[#1E293B] text-[#FDE047] shadow-md ring-2 ring-[#D4AF37]/60' : 'bg-[#F97316] text-white shadow-md ring-2 ring-orange-300'
                : 'bg-white border border-orange-200 text-[#431407] hover:border-[#F97316] hover:bg-orange-50'
            }`}
          >
            <span className="text-sm emoji-bounce-child transition-transform">⏳</span>
            <span>Past &bull; Present &bull; Future</span>
          </button>

          <button
            onClick={() => { setSpreadMode('love'); setHasDrawn(false); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold transition-all cursor-pointer group emoji-bounce-hover ${
              spreadMode === 'love'
                ? isRWS ? 'bg-[#1E293B] text-[#FDE047] shadow-md ring-2 ring-[#D4AF37]/60' : 'bg-[#F97316] text-white shadow-md ring-2 ring-orange-300'
                : 'bg-white border border-orange-200 text-[#431407] hover:border-[#F97316] hover:bg-orange-50'
            }`}
          >
            <span className="text-sm emoji-bounce-child transition-transform">💖</span>
            <span>Love & Harmony</span>
          </button>

          <button
            onClick={() => { setSpreadMode('career'); setHasDrawn(false); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs tracking-wider uppercase font-bold transition-all cursor-pointer group emoji-bounce-hover ${
              spreadMode === 'career'
                ? isRWS ? 'bg-[#1E293B] text-[#FDE047] shadow-md ring-2 ring-[#D4AF37]/60' : 'bg-[#F97316] text-white shadow-md ring-2 ring-orange-300'
                : 'bg-white border border-orange-200 text-[#431407] hover:border-[#F97316] hover:bg-orange-50'
            }`}
          >
            <span className="text-sm emoji-bounce-child transition-transform">💼</span>
            <span>Career & Wealth</span>
          </button>
        </div>

        {/* Card Draw Action Area */}
        {!hasDrawn ? (
          <div className="space-y-6 sm:space-y-8">
            {/* 3D Floating Interactive Deck Preview */}
            <TarotDeck3D
              cards={activeDeckSource.slice(0, 3)}
              flippedState={[false, false, false]}
              onFlipCard={() => drawCards()}
              isShuffling={isShuffling}
              spreadMode={spreadMode}
              deckTheme={deckTheme}
            />

            <div className={`max-w-xl mx-auto bg-white rounded-3xl border border-dashed p-6 sm:p-10 text-center shadow-xl transition-colors duration-300 ${
              isRWS ? 'border-[#B45309]/50 shadow-slate-900/5' : 'border-orange-300 shadow-orange-950/5'
            }`}>
              <h3 className="font-playfair text-xl font-bold text-[#431407] mb-2">
                {isRWS ? 'Draw from the 78 Classic Rider-Waite Archetypes' : 'Focus Deeply On Your Central Question'}
              </h3>
              <p className="text-xs sm:text-sm text-[#7C2D12] mb-6 max-w-md mx-auto font-normal leading-relaxed">
                Take a deep breath and keep your inquiry in mind. Cards are drawn with full 78-card probability and realistic upright vs. reversed orientations.
              </p>

              <button
                onClick={drawCards}
                disabled={isShuffling}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-xs tracking-wider uppercase px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer ${
                  isRWS
                    ? 'bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-[#FDE047] border border-[#D4AF37]/70 hover:bg-slate-800 shadow-slate-900/30'
                    : 'bg-[#F97316] hover:bg-[#EA580C] text-white shadow-orange-500/20 cta-glow-hover'
                }`}
              >
                {isShuffling ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#FDE047]" />
                    <span>Shuffling {isRWS ? '78-Card Rider-Waite Deck' : 'Sacred Oracle'}...</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Draw & Reveal 3 Oracle Cards</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            {/* 3D Floating Interactive Cards Canvas */}
            <TarotDeck3D
              cards={selectedCards}
              flippedState={flippedCards}
              onFlipCard={(idx) => {
                setFlippedCards((prev) => {
                  const updated = [...prev];
                  updated[idx] = !updated[idx];
                  return updated;
                });
              }}
              isShuffling={isShuffling}
              spreadMode={spreadMode}
              deckTheme={deckTheme}
            />

            {/* Detailed Archetype Breakdown Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {selectedCards.map((card, idx) => {
                const isCardReversed = !!card.isReversed;
                return (
                  <div
                    key={`${card.id}-${idx}`}
                    className={`rounded-3xl border p-5 sm:p-6 shadow-lg hover:shadow-2xl flex flex-col justify-between transition-all duration-300 group premium-card-lift ${
                      isRWS
                        ? 'bg-[#FEFCE8]/80 border-[#D4AF37]/60 hover:border-[#B45309] shadow-amber-900/5'
                        : 'bg-white border-orange-200 hover:border-[#F97316] shadow-orange-950/5'
                    }`}
                  >
                    <div>
                      {/* Position & Orientation Badge */}
                      <div className={`text-xs font-bold uppercase tracking-[0.18em] mb-4 px-3 py-1.5 rounded-full border flex items-center justify-between ${
                        isRWS
                          ? 'bg-amber-100/90 border-[#D4AF37]/60 text-[#7C2D12]'
                          : 'bg-orange-50 border-orange-200 text-[#C2410C]'
                      }`}>
                        <span className="truncate pr-1 font-semibold">{getPositionLabel(idx)}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleCardOrientation(idx)}
                            className="text-[10px] hover:underline flex items-center gap-0.5 cursor-pointer font-bold px-1.5 py-0.5 rounded bg-white border border-amber-300"
                            title="Toggle Upright/Reversed"
                          >
                            <RotateCcw className="w-3 h-3 text-[#B45309]" />
                            <span>{isCardReversed ? 'Reversed ↺' : 'Upright ✦'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Card Visual Graphic */}
                      {isRWS ? (
                        /* Rider-Waite Visual Presentation */
                        <div className="rounded-2xl bg-gradient-to-b from-[#FDFBF7] to-[#FEF3C7] border-2 border-[#D4AF37] p-3 text-[#1E293B] flex flex-col items-center mb-4 shadow-md relative overflow-hidden">
                          <div className="w-full flex items-center justify-between text-[10px] uppercase font-bold text-[#7C2D12] pb-1 border-b border-[#D4AF37]/40 mb-2">
                            <span>{card.number || card.arcana}</span>
                            <span className="text-[#B45309]">{card.astrologicalSign}</span>
                          </div>

                          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-[#D4AF37]/60 bg-amber-50 mb-2 flex items-center justify-center">
                            {card.imageUrl ? (
                              <img
                                src={card.imageUrl}
                                alt={card.name}
                                referrerPolicy="no-referrer"
                                className={`w-full h-full object-cover transition-transform duration-500 ${
                                  isCardReversed ? 'rotate-180 scale-95' : 'scale-100'
                                }`}
                              />
                            ) : (
                              <div className="text-center p-2">
                                <Sparkles className="w-8 h-8 text-[#B45309] mx-auto mb-1" />
                                <span className="font-playfair text-xs font-bold text-[#431407]">{card.name}</span>
                              </div>
                            )}

                            {isCardReversed && (
                              <div className="absolute top-1.5 right-1.5 bg-rose-900/90 text-rose-100 text-[9px] font-bold px-2 py-0.5 rounded-full border border-rose-400/50 backdrop-blur-xs">
                                Reversed (उल्टा)
                              </div>
                            )}
                          </div>

                          <h4 className="font-playfair text-lg font-bold text-[#431407] text-center uppercase tracking-wide">
                            {card.name}
                          </h4>
                          <span className="text-[10px] text-[#7C2D12] tracking-widest uppercase font-bold text-center">
                            {card.element} Element &bull; {card.astrologicalSign}
                          </span>
                        </div>
                      ) : (
                        /* Vedic Holographic Visual Presentation */
                        <div className="h-44 sm:h-48 rounded-2xl bg-gradient-to-b from-[#3B1307] via-[#2A0C03] to-[#1F0702] border border-[#F59E0B]/60 p-4 text-amber-100 flex flex-col justify-between mb-4 shadow-md relative overflow-hidden">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#FCD34D] font-bold">
                            <span>{card.arcana} Arcana</span>
                            <span className="text-[#F97316]">{card.astrologicalSign}</span>
                          </div>

                          <div className="text-center my-auto">
                            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-[#F59E0B] flex items-center justify-center mb-1.5 shadow-md group-hover:scale-110 transition-transform">
                              <Sparkles className="w-5 h-5 text-[#FCD34D]" />
                            </div>
                            <h4 className="font-playfair text-xl font-bold text-amber-100 drop-shadow-md">
                              {card.name}
                            </h4>
                            <span className="text-[10px] text-amber-200 tracking-widest uppercase font-bold">
                              Element: {card.element}
                            </span>
                          </div>

                          <div className="text-[10px] text-[#FCD34D] font-bold uppercase tracking-widest text-center border-t border-[#F59E0B]/30 pt-1">
                            Vedic Key: {card.astrologicalSign}
                          </div>
                        </div>
                      )}

                      {/* Meaning & Guidance */}
                      <div className="space-y-3 text-xs sm:text-sm text-[#431407] font-normal leading-relaxed mb-4">
                        {/* Orientation Meaning */}
                        <div>
                          <strong className="text-[#7C2D12] block font-bold uppercase tracking-wider text-[10px] mb-1 flex items-center justify-between">
                            <span>{isCardReversed ? 'Reversed Archetype (उल्टा अर्थ):' : 'Upright Archetype (सीधा अर्थ):'}</span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                              isCardReversed ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {isCardReversed ? 'Shadow/Inverted' : 'Direct Manifestation'}
                            </span>
                          </strong>
                          <p className="text-[#431407]">
                            {isCardReversed ? card.reversedMeaning : card.uprightMeaning}
                          </p>
                        </div>

                        {/* Position Specific Spread Advice */}
                        <div className={`p-3.5 rounded-2xl border ${
                          isRWS ? 'bg-[#FEF3C7]/70 border-[#D4AF37]/50' : 'bg-[#FFF7ED] border-orange-200'
                        }`}>
                          <strong className="text-[#C2410C] block font-bold uppercase tracking-wider text-[10px] mb-1">
                            {idx === 0 ? 'Past Karma / Root Influence:' : idx === 1 ? 'Current Energetic Truth:' : 'Outcome & Actionable Guidance:'}
                          </strong>
                          <p className="text-[#431407]">
                            {getSpreadAdviceText(card, idx)}
                          </p>
                        </div>

                        {/* Psychological & Spiritual Depths for RWS */}
                        {isRWS && card.psychologicalMeaning && (
                          <div className="text-[11px] text-[#7C2D12] bg-white/80 p-2.5 rounded-xl border border-[#D4AF37]/40 space-y-1">
                            <div>
                              <span className="font-bold text-[#9A3412]">Psychological Dimension: </span>
                              <span>{card.psychologicalMeaning}</span>
                            </div>
                            {card.spiritualMeaning && (
                              <div>
                                <span className="font-bold text-[#9A3412]">Esoteric Truth: </span>
                                <span>{card.spiritualMeaning}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-orange-200/80 flex items-center justify-between text-xs text-[#7C2D12] uppercase tracking-widest font-bold">
                      <span>Ruler: {card.astrologicalSign}</span>
                      <span className="text-[#C2410C] font-bold">{card.element} Energy</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Post-reading Action Bar */}
            <div className="bg-white border border-orange-300 rounded-3xl p-5 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl shadow-orange-950/5">
              <div className="text-center md:text-left">
                <h4 className="font-playfair text-base sm:text-lg font-bold text-[#431407] flex items-center justify-center md:justify-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#F97316]" />
                  <span>Need an In-Depth 10-Card Celtic Cross Spread with Dr. Preeti Sehgal?</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#7C2D12] mt-1 max-w-xl font-normal leading-relaxed">
                  Combine 45 minutes of detailed Rider-Waite or Vedic Tarot spreads with your personal Janam Kundli dasha periods for unquestionable certainty.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={drawCards}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-orange-200 hover:border-orange-300 bg-orange-50 text-[#431407] text-xs tracking-wider uppercase font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reshuffle & Draw</span>
                </button>

                <button
                  onClick={() => onOpenBooking('tarot-reading')}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold tracking-wider uppercase shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 cta-glow-hover whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5 text-white" />
                  <span>Book Private Session</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* EDUCATIONAL MODAL: HISTORICAL SIGNIFICANCE OF RIDER-WAITE-SMITH DECK */}
      {showDeckInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#FEFCE8] text-[#1E293B] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#D4AF37] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setShowDeckInfoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-[#431407] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0D2346] text-[#FDE047] flex items-center justify-center border border-[#D4AF37] shadow-md">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B45309] tracking-widest block">
                  Tarot Hermetic History &bull; 1909 London
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#431407]">
                  {RIDER_WAITE_HISTORICAL_INFO.deckTitle}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#431407] leading-relaxed border-t border-[#D4AF37]/40 pt-4">
              <div className="bg-white/80 p-3.5 rounded-2xl border border-amber-300/80">
                <strong className="text-[#9A3412] block text-xs uppercase tracking-wider mb-1 font-bold">
                  Historical Provenance & Origin:
                </strong>
                <p>{RIDER_WAITE_HISTORICAL_INFO.originYear}</p>
                <p className="mt-1 font-medium">{RIDER_WAITE_HISTORICAL_INFO.creators}</p>
              </div>

              <div>
                <strong className="text-[#9A3412] block text-xs uppercase tracking-wider mb-1.5 font-bold">
                  The Pictorial Revolution in Tarot:
                </strong>
                <p>{RIDER_WAITE_HISTORICAL_INFO.description}</p>
              </div>

              <div>
                <strong className="text-[#9A3412] block text-xs uppercase tracking-wider mb-2 font-bold">
                  Key Distinctive Architectural Features:
                </strong>
                <ul className="space-y-2">
                  {RIDER_WAITE_HISTORICAL_INFO.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#B45309] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0D2346] text-amber-100 p-4 rounded-2xl border border-[#D4AF37] shadow-md">
                <h4 className="font-playfair text-sm font-bold text-[#FDE047] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#FDE047]" />
                  <span>Integration with Dr. Preeti Sehgal\'s Vedic Astrology</span>
                </h4>
                <p className="text-xs text-blue-100 leading-relaxed font-normal">
                  In Dr. Preeti\'s practice, the 78 Western archetypes are mapped directly onto the 9 Navagrahas (planets), 12 Rashis (zodiac signs), and 4 Purusharthas (Dharma, Artha, Kama, Moksha), creating a unified synthesis of Western psychological depth and Eastern Karmic destiny.
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowDeckInfoModal(false)}
                className="px-6 py-2.5 bg-[#B45309] hover:bg-[#9A3412] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Close & Return to Oracle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 78-CARD FULL DECK ENCYCLOPEDIA EXPLORER MODAL */}
      {showDeckExplorer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#FEFCE8] text-[#1E293B] rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col border-2 border-[#D4AF37] shadow-2xl p-4 sm:p-6 relative overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/50 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#B45309] tracking-widest block">
                  Complete 78-Card Pamela Colman Smith Archive
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#431407]">
                  Rider-Waite Tarot Encyclopedia (1909)
                </h3>
              </div>
              <button
                onClick={() => setShowDeckExplorer(false)}
                className="p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-[#431407] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-amber-700 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search cards, meanings, or symbols..."
                  value={explorerSearch}
                  onChange={(e) => setExplorerSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-amber-300 text-xs text-[#431407] focus:outline-none focus:ring-2 focus:ring-[#B45309]"
                />
              </div>

              {/* Suit / Arcana Filter Pills */}
              <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
                {(['all', 'Major', 'Wands', 'Cups', 'Swords', 'Pentacles'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setExplorerFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      explorerFilter === filter
                        ? 'bg-[#B45309] text-white shadow-xs'
                        : 'bg-white border border-amber-200 text-[#431407] hover:bg-amber-100'
                    }`}
                  >
                    {filter === 'all' ? 'All 78' : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Scrollable Grid */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filteredExplorerCards.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white rounded-2xl border border-amber-200 p-2.5 flex flex-col justify-between hover:shadow-md hover:border-[#B45309] transition-all group"
                  >
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-[#D4AF37]/50 bg-amber-50 mb-2">
                      {card.imageUrl ? (
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-amber-800">
                          {card.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#B45309] block truncate">
                        {card.arcana === 'Major' ? 'Major Arcana' : card.suit}
                      </span>
                      <h4 className="font-playfair text-xs font-bold text-[#431407] leading-tight truncate">
                        {card.name}
                      </h4>
                      <p className="text-[9px] text-[#7C2D12] line-clamp-2 mt-1 leading-normal">
                        {card.uprightMeaning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[#D4AF37]/40 flex items-center justify-between text-xs text-[#7C2D12]">
              <span>Showing {filteredExplorerCards.length} of 78 Rider-Waite Cards</span>
              <button
                onClick={() => setShowDeckExplorer(false)}
                className="px-4 py-1.5 bg-[#B45309] text-white font-bold text-xs uppercase tracking-wider rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
