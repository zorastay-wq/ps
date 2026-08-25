import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Briefcase, 
  Heart, 
  Activity, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Calendar, 
  Layers, 
  Info,
  Clock,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { DashaInfluenceReport, DashaTimelineItem, AntardashaDetail } from '../types';

interface DashaInfluenceReportCardProps {
  dashaAnalysis: {
    currentReport: DashaInfluenceReport;
    timeline: DashaTimelineItem[];
  };
  onOpenBooking?: (serviceId?: string) => void;
}

export const DashaInfluenceReportCard: React.FC<DashaInfluenceReportCardProps> = ({
  dashaAnalysis,
  onOpenBooking
}) => {
  const { currentReport, timeline } = dashaAnalysis;

  // Selected Antardasha for dynamic deep-dive analysis (defaults to currently active Antardasha)
  const [selectedReport, setSelectedReport] = useState<DashaInfluenceReport>(currentReport);
  const [expandedMahaIndex, setExpandedMahaIndex] = useState<number>(() => {
    const activeIdx = timeline.findIndex(t => t.isActive);
    return activeIdx >= 0 ? activeIdx : 0;
  });
  const [selectedAntarId, setSelectedAntarId] = useState<string>(() => {
    const activeMaha = timeline.find(t => t.isActive) || timeline[0];
    const activeAntar = activeMaha?.antardashas.find(a => a.isActive) || activeMaha?.antardashas[0];
    return activeAntar?.id || '';
  });

  const handleSelectAntardasha = (antar: AntardashaDetail) => {
    setSelectedAntarId(antar.id);
    setSelectedReport(antar.interpretation);
  };

  const getDignityBadgeColor = (dignity: string) => {
    switch (dignity) {
      case 'Exalted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Own Sign':
      case 'Moolatrikona':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Debilitated':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Enemy':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-orange-50 text-[#7C2D12] border-orange-200';
    }
  };

  const getRelationshipBadgeColor = (rel: string) => {
    switch (rel) {
      case 'Friend':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Enemy':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <div className="space-y-5" id="dasha-influence-engine">
      {/* 1. Header Overview Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA] border-2 border-orange-300 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#EA580C] text-white shadow-2xs">
                <Flame className="w-3 h-3 text-amber-200" />
                <span>Vimshottari Dasha Engine</span>
              </span>
              <span className="text-[11px] font-semibold text-[#7C2D12] bg-white/90 px-2.5 py-0.5 rounded-full border border-orange-300">
                Parashari Chart Synthesis
              </span>
            </div>
            <h3 className="font-playfair text-lg sm:text-xl font-bold text-[#7C2D12]">
              Active Period: {selectedReport.mahadashaLord} ({selectedReport.mahadashaHindi}) Mahadasha &bull; {selectedReport.antardashaLord} Antardasha
            </h3>
            <p className="text-xs text-[#9A3412] leading-relaxed">
              Operating Window: <strong className="text-[#7C2D12]">{selectedReport.startDate} — {selectedReport.endDate}</strong> &bull; Positional Geometry: <strong className="text-[#EA580C]">{selectedReport.positionalAxis}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs px-3 py-1.5 rounded-xl border font-bold ${getRelationshipBadgeColor(selectedReport.naturalRelationship)}`}>
              Natural: {selectedReport.naturalRelationship}
            </span>
            <span className={`text-xs px-3 py-1.5 rounded-xl border font-bold ${
              selectedReport.isSynergistic 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                : 'bg-amber-50 text-amber-900 border-amber-300'
            }`}>
              {selectedReport.positionalAxisType}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Timeline & Sub-Period Selector */}
      <div className="p-4 rounded-2xl bg-white border border-orange-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#F97316]" />
            <h4 className="font-playfair text-sm font-bold text-[#7C2D12] uppercase tracking-wider">
              Vimshottari Lifecycle Timeline & Antardasha Selector
            </h4>
          </div>
          <span className="text-[10px] text-[#9A3412]">
            Click any Antardasha chip to view chart-specific interpretations
          </span>
        </div>

        {/* Mahadasha Accordion Rows */}
        <div className="space-y-2">
          {timeline.map((mahaItem, mIdx) => {
            const isExpanded = expandedMahaIndex === mIdx;
            return (
              <div 
                key={mahaItem.mahadashaLord + mIdx} 
                className={`rounded-xl border transition-all ${
                  mahaItem.isActive 
                    ? 'border-orange-400 bg-orange-50/40' 
                    : 'border-orange-200/80 bg-white'
                }`}
              >
                {/* Mahadasha Header Row */}
                <div 
                  onClick={() => setExpandedMahaIndex(isExpanded ? -1 : mIdx)}
                  className="p-2.5 sm:p-3 flex items-center justify-between cursor-pointer select-none hover:bg-orange-100/40 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      mahaItem.isActive 
                        ? 'bg-[#EA580C] text-white shadow-2xs' 
                        : 'bg-orange-100 text-[#7C2D12]'
                    }`}>
                      {mahaItem.mahadashaLord[0]}
                    </span>
                    <span className="font-playfair font-bold text-xs sm:text-sm text-[#7C2D12]">
                      {mahaItem.mahadashaLord} ({mahaItem.mahadashaHindi}) Mahadasha
                    </span>
                    <span className="text-[11px] text-[#9A3412]">
                      {mahaItem.startDateFormatted} – {mahaItem.endDateFormatted} ({mahaItem.totalYears.toFixed(1)} yrs)
                    </span>
                    {mahaItem.isActive && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.2 rounded-full uppercase tracking-wider">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Currently Active
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#EA580C]">
                      9 Sub-Periods
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-[#EA580C]" /> : <ChevronDown className="w-4 h-4 text-[#9A3412]" />}
                  </div>
                </div>

                {/* Antardasha Horizontal Chips */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden border-t border-orange-100 bg-[#FFFDF9] p-3 rounded-b-xl"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-1.5">
                        {mahaItem.antardashas.map((antar) => {
                          const isSelected = selectedAntarId === antar.id;
                          return (
                            <button
                              key={antar.id}
                              type="button"
                              onClick={() => handleSelectAntardasha(antar)}
                              className={`p-2 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                                isSelected
                                  ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-xs scale-[1.03]'
                                  : antar.isActive
                                  ? 'bg-amber-100/80 text-[#7C2D12] border-amber-300 hover:bg-amber-200'
                                  : 'bg-white text-[#7C2D12] border-orange-200 hover:bg-orange-50'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className={`font-bold text-[11px] truncate ${isSelected ? 'text-white' : 'text-[#7C2D12]'}`}>
                                  {antar.lord}
                                </span>
                                {antar.isActive && !isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                )}
                              </div>
                              <div className={`text-[9px] truncate ${isSelected ? 'text-orange-100' : 'text-[#9A3412]'}`}>
                                {antar.startDateFormatted}
                              </div>
                              <div className={`text-[8px] truncate opacity-90 ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                                to {antar.endDateFormatted}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Deep-Dive Planetary Dynamics (D1 Lagna Intersections) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mahadasha Lord Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-orange-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {selectedReport.mahadashaLord[0]}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] block">
                  Mahadasha Master (महादशा स्वामी)
                </span>
                <h5 className="font-playfair text-base font-bold text-[#7C2D12]">
                  {selectedReport.mahadashaLord} ({selectedReport.mahadashaHindi})
                </h5>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getDignityBadgeColor(selectedReport.mahadashaDignity)}`}>
              {selectedReport.mahadashaDignity}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-[#FFF7ED] p-2.5 rounded-xl border border-orange-200/80">
            <div>
              <span className="text-[10px] text-[#9A3412] block">Occupied Bhava:</span>
              <strong className="text-[#7C2D12]">{selectedReport.mahadashaHouse}th House in {selectedReport.mahadashaSign}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#9A3412] block">Ruled Bhavas:</span>
              <strong className="text-[#7C2D12]">
                {selectedReport.mahadashaRuledHouses.length > 0 
                  ? selectedReport.mahadashaRuledHouses.map(h => `${h}th`).join(' & ') 
                  : 'Nodal Graha'}
              </strong>
            </div>
          </div>

          <p className="text-xs text-[#7C2D12] leading-relaxed font-normal">
            {selectedReport.mahadashaLordSummary}
          </p>
        </div>

        {/* Antardasha Lord Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-orange-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F97316] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                {selectedReport.antardashaLord[0]}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] block">
                  Antardasha Agent (अंतरदशा स्वामी)
                </span>
                <h5 className="font-playfair text-base font-bold text-[#7C2D12]">
                  {selectedReport.antardashaLord} ({selectedReport.antardashaHindi})
                </h5>
              </div>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getDignityBadgeColor(selectedReport.antardashaDignity)}`}>
              {selectedReport.antardashaDignity}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-[#FFF7ED] p-2.5 rounded-xl border border-orange-200/80">
            <div>
              <span className="text-[10px] text-[#9A3412] block">Occupied Bhava:</span>
              <strong className="text-[#7C2D12]">{selectedReport.antardashaHouse}th House in {selectedReport.antardashaSign}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#9A3412] block">Ruled Bhavas:</span>
              <strong className="text-[#7C2D12]">
                {selectedReport.antardashaRuledHouses.length > 0 
                  ? selectedReport.antardashaRuledHouses.map(h => `${h}th`).join(' & ') 
                  : 'Nodal Graha'}
              </strong>
            </div>
          </div>

          <p className="text-xs text-[#7C2D12] leading-relaxed font-normal">
            {selectedReport.antardashaLordSummary}
          </p>
        </div>
      </div>

      {/* 4. Planetary Synergy Synthesis Box */}
      <div className="p-5 rounded-2xl bg-[#FFF9F2] border-2 border-orange-200 shadow-2xs space-y-2.5">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#F97316]" />
          <h4 className="font-playfair text-sm sm:text-base font-bold text-[#7C2D12] uppercase tracking-wider">
            Mahadasha &bull; Antardasha Synergy Synthesis (युति एवं सम्बंध प्रभाव)
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-[#7C2D12] leading-relaxed font-normal">
          {selectedReport.synergyParagraph}
        </p>
      </div>

      {/* 5. Four Thematic Life Areas Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C] uppercase tracking-wider px-1">
          <Sparkles className="w-4 h-4 text-[#F97316]" />
          <span>Thematic Life Impact Breakdown (जीवन के चार प्रमुख स्तंभ)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Career & Wealth */}
          <div className="p-4 rounded-xl bg-white border border-orange-200 shadow-2xs space-y-2 hover:border-orange-300 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#EA580C] flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-[#EA580C] uppercase tracking-wider block">Career, Wealth & Karma</span>
                <h6 className="font-playfair text-xs sm:text-sm font-bold text-[#7C2D12]">Professional Progress & Finances</h6>
              </div>
            </div>
            <p className="text-xs text-[#7C2D12] leading-relaxed">
              {selectedReport.themes.careerWealth}
            </p>
          </div>

          {/* Love & Relationships */}
          <div className="p-4 rounded-xl bg-white border border-orange-200 shadow-2xs space-y-2 hover:border-orange-300 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-rose-700 uppercase tracking-wider block">Love, Marriage & Relations</span>
                <h6 className="font-playfair text-xs sm:text-sm font-bold text-[#7C2D12]">Partnership & Family Harmony</h6>
              </div>
            </div>
            <p className="text-xs text-[#7C2D12] leading-relaxed">
              {selectedReport.themes.loveRelationships}
            </p>
          </div>

          {/* Health & Vitality */}
          <div className="p-4 rounded-xl bg-white border border-orange-200 shadow-2xs space-y-2 hover:border-orange-300 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-emerald-800 uppercase tracking-wider block">Health & Vital Energy</span>
                <h6 className="font-playfair text-xs sm:text-sm font-bold text-[#7C2D12]">Physical Immunity & Resilience</h6>
              </div>
            </div>
            <p className="text-xs text-[#7C2D12] leading-relaxed">
              {selectedReport.themes.healthVitality}
            </p>
          </div>

          {/* Spiritual Mindset */}
          <div className="p-4 rounded-xl bg-white border border-orange-200 shadow-2xs space-y-2 hover:border-orange-300 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] font-bold text-amber-900 uppercase tracking-wider block">Spiritual Growth & Mind</span>
                <h6 className="font-playfair text-xs sm:text-sm font-bold text-[#7C2D12]">Inner Serenity & Wisdom</h6>
              </div>
            </div>
            <p className="text-xs text-[#7C2D12] leading-relaxed">
              {selectedReport.themes.spiritualMindset}
            </p>
          </div>
        </div>
      </div>

      {/* 6. Remedial Alignment Advice */}
      <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-orange-200/90 text-xs text-[#7C2D12] space-y-2">
        <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px] text-[#EA580C]">
          <ShieldCheck className="w-4 h-4 text-[#F97316]" />
          <span>Prescribed Dasha Harmonizer Upay (दशा शांति एवं ग्रह संतुलन विधान):</span>
        </div>
        <p className="text-xs text-[#7C2D12] leading-relaxed font-normal">
          {selectedReport.remedialAdvice}
        </p>
      </div>

      {/* 7. Action Banner */}
      {onOpenBooking && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#7C2D12] to-[#9A3412] text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div className="space-y-0.5 text-center sm:text-left">
            <h5 className="font-playfair text-sm font-bold">
              Need Personal Dasha Timing & Transition Guidance?
            </h5>
            <p className="text-xs text-orange-200 font-normal">
              Book a direct confidential session with Dr. Preeti Sehgal for customized transit & sub-period remediation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenBooking('vedic-kundli')}
            className="inline-flex items-center gap-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-bold transition-all shrink-0 cursor-pointer shadow-xs"
          >
            <span>Consult Dr. Sehgal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
