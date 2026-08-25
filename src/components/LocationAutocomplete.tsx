import React, { useState, useEffect, useRef, useId, useCallback } from 'react';
import { MapPin, Search, Check, Globe, X, Compass, Clock } from 'lucide-react';
import { LocationData } from '../types';
import { searchLocations, findLocationByName, formatUtcOffset, getDefaultLocation } from '../utils/locationService';

export interface LocationAutocompleteProps {
  id?: string;
  value: string;
  onChange: (value: string, locationData?: LocationData) => void;
  onSelectLocation?: (location: LocationData) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
  showCoordinatesBadge?: boolean;
  showIcon?: boolean;
  autoFocus?: boolean;
  compact?: boolean;
  defaultLocationIfEmpty?: boolean;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  id,
  value,
  onChange,
  onSelectLocation,
  placeholder = 'Search City of Birth (e.g. Delhi, London, New York)...',
  className = '',
  inputClassName = '',
  required = false,
  disabled = false,
  label,
  showCoordinatesBadge = false,
  showIcon = true,
  autoFocus = false,
  compact = false,
}) => {
  const generatedId = useId();
  const inputId = id || `location-autocomplete-${generatedId}`;
  
  const [inputValue, setInputValue] = useState(value || '');
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronize internal input text when external `value` prop changes
  useEffect(() => {
    setInputValue(value || '');
    if (value && (!selectedLocation || selectedLocation.displayName !== value && selectedLocation.city !== value)) {
      const matched = findLocationByName(value);
      if (matched) {
        setSelectedLocation(matched);
      }
    } else if (!value) {
      setSelectedLocation(null);
    }
  }, [value]);

  // Debounced search logic (150ms debounce)
  const handleQueryChange = (query: string) => {
    setInputValue(query);
    onChange(query); // propagate direct string typing to parent form

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const results = searchLocations(query, 12);
      setSuggestions(results);
      setHighlightedIndex(results.length > 0 ? 0 : -1);
      setIsOpen(true);
    }, 150);
  };

  // When input is focused, show initial suggestions
  const handleFocus = () => {
    if (disabled) return;
    const results = searchLocations(inputValue, 12);
    setSuggestions(results);
    setHighlightedIndex(results.length > 0 ? 0 : -1);
    setIsOpen(true);
  };

  // Selection handler
  const handleSelect = (loc: LocationData) => {
    const formattedCity = loc.state 
      ? `${loc.city}, ${loc.state}, ${loc.country}`
      : `${loc.city}, ${loc.country}`;

    setInputValue(formattedCity);
    setSelectedLocation(loc);
    setIsOpen(false);
    setHighlightedIndex(-1);

    // Notify parent with text and rich ephemeris location metadata
    onChange(formattedCity, loc);
    if (onSelectLocation) {
      onSelectLocation(loc);
    }
  };

  // Clear field
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setInputValue('');
    setSelectedLocation(null);
    onChange('');
    setSuggestions(searchLocations('', 12));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        handleFocus();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} id={`${inputId}-container`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#7C2D12] mb-1.5"
        >
          {label} {required && <span className="text-[#F97316]">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {showIcon && (
          <div className="absolute left-3 pointer-events-none text-[#F97316] flex items-center">
            <MapPin className="w-4 h-4 text-[#F97316]" />
          </div>
        )}

        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={`${inputId}-listbox`}
          aria-haspopup="listbox"
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          autoComplete="off"
          value={inputValue}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full bg-[#FFF9F2] border border-orange-200 rounded-xl ${
            showIcon ? 'pl-9 pr-8' : 'px-3.5 pr-8'
          } ${compact ? 'py-1.5 text-xs' : 'py-2 sm:py-2.5 text-xs sm:text-sm'} text-[#7C2D12] placeholder-[#9A3412]/50 font-medium transition-all focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-orange-500/20 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed ${inputClassName}`}
        />

        {inputValue && (
          <button
            type="button"
            id={`${inputId}-clear-btn`}
            onClick={handleClear}
            className="absolute right-2.5 p-1 text-[#9A3412]/60 hover:text-[#7C2D12] hover:bg-orange-100 rounded-full transition-colors cursor-pointer"
            aria-label="Clear location"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Selected Coordinates & Timezone Astro Badge */}
      {showCoordinatesBadge && selectedLocation && (
        <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px] text-[#9A3412] bg-orange-50/80 border border-orange-200/80 rounded-lg px-2.5 py-1 animate-in fade-in duration-200">
          <span className="font-semibold text-[#7C2D12] flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#F97316]" />
            <span>
              {Math.abs(selectedLocation.lat).toFixed(2)}°{selectedLocation.lat >= 0 ? 'N' : 'S'},{' '}
              {Math.abs(selectedLocation.lng).toFixed(2)}°{selectedLocation.lng >= 0 ? 'E' : 'W'}
            </span>
          </span>
          <span className="text-orange-300">&bull;</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#EA580C]" />
            <span>{formatUtcOffset(selectedLocation.utcOffsetHours)}</span>
            <span className="text-[#9A3412]/70 font-mono text-[9px]">({selectedLocation.timezone})</span>
          </span>
        </div>
      )}

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div
          id={`${inputId}-listbox`}
          role="listbox"
          className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white/98 backdrop-blur-md border border-orange-200 rounded-xl shadow-xl shadow-orange-950/15 divide-y divide-orange-50 py-1 text-xs text-[#7C2D12] animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {suggestions.length > 0 ? (
            suggestions.map((loc, idx) => {
              const isHighlighted = idx === highlightedIndex;
              const isSelected = selectedLocation?.city === loc.city && selectedLocation?.countryCode === loc.countryCode;

              return (
                <div
                  key={`${loc.city}-${loc.state}-${loc.countryCode}-${idx}`}
                  id={`${inputId}-option-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onClick={() => handleSelect(loc)}
                  className={`px-3 py-2 sm:py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                    isHighlighted ? 'bg-orange-100/90 text-[#7C2D12]' : 'hover:bg-orange-50/80'
                  } ${isSelected ? 'font-semibold bg-orange-50' : ''}`}
                >
                  <div className="flex items-start gap-2.5 min-w-0 pr-2">
                    <div className="mt-0.5 shrink-0 text-[#F97316]">
                      {loc.countryCode === 'IN' ? (
                        <span className="inline-block px-1 py-0.2 bg-orange-100 text-[#C2410C] font-bold rounded text-[9px]">IN</span>
                      ) : (
                        <Globe className="w-3.5 h-3.5 text-orange-400" />
                      )}
                    </div>
                    <div className="min-w-0 truncate">
                      <div className="font-semibold text-[#7C2D12] truncate flex items-center gap-1.5">
                        <span>{loc.city}</span>
                        {loc.countryCode === 'IN' && (
                          <span className="text-[10px] text-[#9A3412]/80 font-normal">
                            ({loc.state})
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#9A3412]/75 truncate">
                        {loc.state ? `${loc.state}, ` : ''}{loc.country}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 text-right space-y-0.5">
                    <div className="text-[10px] font-medium text-[#EA580C] bg-orange-50 px-1.5 py-0.5 rounded border border-orange-100 inline-block font-mono">
                      {formatUtcOffset(loc.utcOffsetHours)}
                    </div>
                    <div className="text-[9px] text-[#9A3412]/60 font-mono">
                      {loc.lat.toFixed(1)}°, {loc.lng.toFixed(1)}°
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-3.5 py-3 text-center text-xs text-[#9A3412]/80">
              <p className="font-medium">No matching city found in local index.</p>
              <p className="text-[10px] text-[#9A3412]/60 mt-0.5">You can keep typing your custom city name.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
