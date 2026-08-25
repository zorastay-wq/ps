import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Moon, 
  Sun, 
  Clock, 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  Eye, 
  Mail, 
  AlertTriangle, 
  Compass, 
  ShieldCheck, 
  X, 
  Check,
  CalendarDays
} from 'lucide-react';
import { DOCTOR_INFO } from '../data/brandData';
import { calculatePanchang, PanchangDetails } from '../utils/panchang';

interface LiveMuhuratBarProps {
  onOpenNewsletter?: () => void;
}

export const LiveMuhuratBar: React.FC<LiveMuhuratBarProps> = ({ onOpenNewsletter }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showDetailedPanchang, setShowDetailedPanchang] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate Panchang dynamically for selected date
  const panchang: PanchangDetails = calculatePanchang(selectedDate);

  // Close calendar popover on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCalendarDropdown(false);
      }
    };
    if (showCalendarDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendarDropdown]);

  // Date Navigation Helpers
  const handlePrevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handleSetToday = () => {
    setSelectedDate(new Date());
    setShowCalendarDropdown(false);
  };

  const handleAddDays = (days: number) => {
    const target = new Date();
    target.setDate(target.getDate() + days);
    setSelectedDate(target);
    setShowCalendarDropdown(false);
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const parts = e.target.value.split('-');
      if (parts.length === 3) {
        const newDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        if (!isNaN(newDate.getTime())) {
          setSelectedDate(newDate);
          setShowCalendarDropdown(false);
        }
      }
    }
  };

  // Convert Date object to YYYY-MM-DD for standard date input
  const dateInputFormat = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;

  const isToday = new Date().toDateString() === selectedDate.toDateString();

  return (
    <div className="w-full max-w-full overflow-hidden bg-gradient-to-r from-[#FFEDD5] via-[#FFF7ED] to-[#FFEDD5] border-b border-orange-200 text-xs text-[#7C2D12] py-1.5 px-2.5 sm:py-2 sm:px-4 relative z-30 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5">
        
        {/* Left: Live Status Badge & Interactive Panchang Date Picker Trigger */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="inline-flex items-center gap-1 bg-white border border-orange-300 px-2.5 py-1 rounded-full text-[9.5px] sm:text-[10.5px] font-bold text-[#EA580C] uppercase tracking-wider shadow-xs flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse"></span>
            <span>Vedic Panchang</span>
          </div>

          {/* Quick Date Stepper & Dropdown Trigger */}
          <div className="relative flex items-center gap-1 min-w-0" ref={dropdownRef}>
            {/* Prev Day Arrow */}
            <button
              id="panchang-prev-day-btn"
              onClick={handlePrevDay}
              title="Previous Day"
              aria-label="Previous Day"
              className="w-6 h-6 rounded-md bg-white hover:bg-orange-100 border border-orange-300 text-[#7C2D12] flex items-center justify-center cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Main Date Picker Pill Button */}
            <button
              id="panchang-date-dropdown-btn"
              onClick={() => setShowCalendarDropdown(!showCalendarDropdown)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-xs truncate max-w-[200px] sm:max-w-none ${
                showCalendarDropdown || !isToday
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white border-orange-600 shadow-orange-500/20'
                  : 'bg-white hover:bg-orange-50 text-[#7C2D12] border-orange-300'
              }`}
            >
              <CalendarDays className={`w-3.5 h-3.5 ${showCalendarDropdown || !isToday ? 'text-white' : 'text-[#EA580C]'}`} />
              <span className="truncate">{panchang.dateFormatted}</span>
              {!isToday && (
                <span className="hidden xs:inline bg-white/20 text-[9px] uppercase px-1 rounded font-extrabold text-amber-100">
                  Custom
                </span>
              )}
              <ChevronDown className={`w-3 h-3 transition-transform ${showCalendarDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Next Day Arrow */}
            <button
              id="panchang-next-day-btn"
              onClick={handleNextDay}
              title="Next Day"
              aria-label="Next Day"
              className="w-6 h-6 rounded-md bg-white hover:bg-orange-100 border border-orange-300 text-[#7C2D12] flex items-center justify-center cursor-pointer transition-colors shrink-0 shadow-xs"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown Calendar & Quick Presets Popover */}
            {showCalendarDropdown && (
              <div 
                id="panchang-calendar-dropdown-menu"
                className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white/98 backdrop-blur-xl border border-orange-300 rounded-2xl shadow-2xl p-4 text-[#431407] z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-orange-200">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-[#EA580C]" />
                    <span className="text-xs font-bold text-[#7C2D12] uppercase tracking-wider">
                      Select Panchang Date
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowCalendarDropdown(false)}
                    className="w-5 h-5 rounded-full hover:bg-orange-100 text-orange-900 flex items-center justify-center"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Native Date Input Picker */}
                <div className="mb-3">
                  <label className="block text-[10px] font-bold text-[#9A3412] uppercase tracking-wider mb-1">
                    Choose Specific Date:
                  </label>
                  <input
                    id="panchang-native-datepicker-input"
                    type="date"
                    value={dateInputFormat}
                    onChange={handleDateInputChange}
                    className="w-full bg-[#FFF9F2] border border-orange-300 rounded-xl px-3 py-2 text-xs font-semibold text-[#431407] focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all cursor-pointer shadow-inner"
                  />
                </div>

                {/* Quick Selection Presets */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-bold text-[#9A3412] uppercase tracking-wider">
                    Quick Panchang Presets:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={handleSetToday}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-left flex items-center justify-between border cursor-pointer transition-all ${
                        isToday 
                          ? 'bg-[#EA580C] text-white border-[#C2410C]' 
                          : 'bg-[#FFF9F2] hover:bg-orange-100 text-[#7C2D12] border-orange-200'
                      }`}
                    >
                      <span>Today</span>
                      {isToday && <Check className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => handleAddDays(1)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-left bg-[#FFF9F2] hover:bg-orange-100 text-[#7C2D12] border border-orange-200 cursor-pointer transition-all"
                    >
                      Tomorrow
                    </button>
                    <button
                      onClick={() => handleAddDays(7)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-left bg-[#FFF9F2] hover:bg-orange-100 text-[#7C2D12] border border-orange-200 cursor-pointer transition-all"
                    >
                      Next Week (+7d)
                    </button>
                    <button
                      onClick={() => handleAddDays(30)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-left bg-[#FFF9F2] hover:bg-orange-100 text-[#7C2D12] border border-orange-200 cursor-pointer transition-all"
                    >
                      Next Month (+30d)
                    </button>
                  </div>
                </div>

                {/* Quick Info Box in Popover */}
                <div className="mt-3 p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-[10.5px] text-[#7C2D12] leading-tight">
                  <div className="flex items-center gap-1 font-bold text-[#EA580C] mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{panchang.tithi}</span>
                  </div>
                  <p>Nakshatra: <strong>{panchang.nakshatra}</strong></p>
                  <p>Abhijit: <strong className="text-emerald-700">{panchang.abhijitMuhurat}</strong></p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Snapshot in Header Bar */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-medium text-[#9A3412] truncate min-w-0 pl-1">
            <span className="text-orange-300">&bull;</span>
            <span className="flex items-center gap-1">
              <Sun className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Abhijit: <strong className="text-emerald-800 font-bold">{panchang.abhijitMuhurat}</strong></span>
            </span>
            <span className="text-orange-300">&bull;</span>
            <span className="flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-[#F97316]" />
              <span className="truncate">{panchang.tithi}</span>
            </span>
          </div>
        </div>

        {/* Right: Detailed Panchang Toggle & Contact Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {onOpenNewsletter && (
            <button
              id="header-newsletter-trigger-btn"
              onClick={onOpenNewsletter}
              className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#7C2D12] hover:text-[#EA580C] bg-white hover:bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-300 transition-colors cursor-pointer font-bold shadow-xs"
            >
              <Mail className="w-3 h-3 text-[#F97316]" />
              <span>Transit Email</span>
            </button>
          )}

          {/* Full Detailed Panchang Dropdown Toggle */}
          <button
            id="panchang-details-toggle-btn"
            onClick={() => setShowDetailedPanchang(!showDetailedPanchang)}
            className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-bold shadow-xs flex-shrink-0 ${
              showDetailedPanchang
                ? 'bg-[#EA580C] text-white border-[#C2410C]'
                : 'text-[#EA580C] hover:text-[#7C2D12] bg-white hover:bg-orange-50 border-orange-300'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showDetailedPanchang ? 'Close Panchang' : 'Full Panchang'}</span>
          </button>

          <a
            href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
              `Namaste Dr. Preeti Sehgal ji, please guide me on the auspicious muhurat for ${panchang.dateFormatted}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10.5px] uppercase tracking-wider text-[#9A3412] hover:text-[#EA580C] font-extrabold transition-colors hidden md:inline bg-orange-100/80 hover:bg-orange-200/80 px-2.5 py-1 rounded-lg border border-orange-300/60 shadow-xs"
          >
            Ask Muhurat &rarr;
          </a>
        </div>

      </div>

      {/* Expandable Comprehensive Panchang Card for the Selected Date */}
      {showDetailedPanchang && (
        <div 
          id="detailed-panchang-panel"
          className="max-w-7xl mx-auto mt-3 pt-3 border-t border-orange-300/80 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Header Summary for the chosen date */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 bg-[#431407] text-white p-3 rounded-2xl border border-orange-500/30 shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-[#431407] font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-playfair text-sm font-bold text-amber-200">
                  Drik Panchang Details for {panchang.dateFormatted}
                </h4>
                <p className="text-[10px] text-orange-200">
                  Day Lord: <strong className="text-white">{panchang.weekdayLord}</strong> &bull; {panchang.paksha}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSetToday}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-orange-500/20 hover:bg-orange-500/30 text-amber-300 border border-orange-400/40 cursor-pointer"
              >
                Reset to Today
              </button>
            </div>
          </div>

          {/* 4-Column Grid with Panchang Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Column 1: Tithi, Nakshatra & Yoga */}
            <div className="bg-white p-3.5 rounded-2xl border border-orange-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#EA580C] font-bold flex items-center gap-1 mb-1.5">
                  <Moon className="w-3.5 h-3.5 text-[#F97316]" /> 1. Tithi & Nakshatra
                </span>
                <div className="space-y-1 text-[#431407]">
                  <p><span className="text-orange-900/70 font-medium">Tithi:</span> <strong className="font-bold">{panchang.tithi}</strong></p>
                  <p><span className="text-orange-900/70 font-medium">Nakshatra:</span> <strong>{panchang.nakshatra}</strong> ({panchang.nakshatraLord} Lord)</p>
                  <p><span className="text-orange-900/70 font-medium">Yoga:</span> <strong>{panchang.yoga}</strong></p>
                  <p><span className="text-orange-900/70 font-medium">Karana:</span> <strong>{panchang.karana}</strong></p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-orange-100 text-[10px] text-emerald-800 font-semibold">
                Nakshatra Gana: {panchang.nakshatraQuality}
              </div>
            </div>

            {/* Column 2: Auspicious Timings & Abhijit */}
            <div className="bg-white p-3.5 rounded-2xl border border-orange-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold flex items-center gap-1 mb-1.5">
                  <Sun className="w-3.5 h-3.5 text-emerald-600" /> 2. Auspicious Muhurat
                </span>
                <div className="space-y-1 text-[#431407]">
                  <p><span className="text-orange-900/70 font-medium">Abhijit Muhurat:</span> <strong className="text-emerald-700 font-extrabold">{panchang.abhijitMuhurat}</strong></p>
                  <p><span className="text-orange-900/70 font-medium">Auspicious Hora:</span> <strong>{panchang.auspiciousHora}</strong></p>
                  <p><span className="text-orange-900/70 font-medium">Sunrise / Sunset:</span> <strong>{panchang.sunrise} / {panchang.sunset}</strong></p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-orange-100 text-[10px] text-emerald-800 font-medium leading-tight">
                Best for property deeds, deal signings & starts.
              </div>
            </div>

            {/* Column 3: Inauspicious Periods (Rahu Kaal / Yamaganda) */}
            <div className="bg-white p-3.5 rounded-2xl border border-orange-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-red-600 font-bold flex items-center gap-1 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> 3. Inauspicious Windows
                </span>
                <div className="space-y-1 text-[#431407]">
                  <p><span className="text-red-700 font-medium">Rahu Kaal (राहुकाल):</span> <strong className="text-red-700 font-bold">{panchang.rahuKaal}</strong></p>
                  <p><span className="text-orange-900/70 font-medium">Yamaganda:</span> <strong>{panchang.yamaganda}</strong></p>
                  <p><span className="text-orange-900/70 font-medium">Gulika Kaal:</span> <strong>{panchang.gulikaKaal}</strong></p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-orange-100 text-[10px] text-red-700 font-medium">
                Avoid inaugurations or money lending during Rahu Kaal.
              </div>
            </div>

            {/* Column 4: Lal Kitab Remedy & Planetary Guidance */}
            <div className="bg-white p-3.5 rounded-2xl border border-orange-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#EA580C] font-bold flex items-center gap-1 mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" /> 4. Lal Kitab Day Upay
                </span>
                <p className="text-[#431407] text-[11px] font-normal leading-relaxed mb-2">
                  {panchang.lalKitabTip}
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-orange-100 text-[10px] text-[#7C2D12]">
                <p><span className="text-orange-900/70">Lucky Color:</span> <strong className="text-[#EA580C]">{panchang.luckyColor}</strong></p>
                <p><span className="text-orange-900/70">Lucky Disha:</span> <strong>{panchang.luckyDirection}</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
