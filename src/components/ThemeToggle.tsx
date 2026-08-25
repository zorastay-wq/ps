import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, RotateCcw, Sparkles } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'compact' | 'full' | 'pill' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'compact',
  className = ''
}) => {
  const { theme, isMidnight, setTheme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (variant === 'segmented') {
    return (
      <div className={`inline-flex items-center p-1 bg-orange-100/70 dark:bg-[#200701] rounded-xl border border-orange-200/80 dark:border-amber-500/30 text-xs ${className}`}>
        <button
          onClick={() => setTheme('saffron')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
            theme === 'saffron'
              ? 'bg-white text-[#EA580C] shadow-xs'
              : 'text-[#7C2D12] dark:text-amber-200/80 hover:text-[#EA580C]'
          }`}
          title="Light (Divine Saffron) Theme"
        >
          <Sun className="w-3.5 h-3.5 text-[#F97316]" />
          <span>Light</span>
        </button>

        <button
          onClick={() => setTheme('midnight')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
            theme === 'midnight'
              ? 'bg-[#2A0800] text-amber-300 shadow-xs border border-amber-500/40'
              : 'text-[#7C2D12] dark:text-amber-200/80 hover:text-amber-300'
          }`}
          title="Night (Midnight Vedic) Theme"
        >
          <Moon className="w-3.5 h-3.5 text-amber-400" />
          <span>Night</span>
        </button>

        <button
          onClick={() => setTheme('auto')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
            theme === 'auto'
              ? 'bg-[#EA580C] text-white shadow-xs'
              : 'text-[#7C2D12] dark:text-amber-200/80 hover:text-[#EA580C]'
          }`}
          title="Auto System Mode"
        >
          <RotateCcw className="w-3 h-3 text-amber-300" />
          <span>Auto</span>
        </button>
      </div>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        id="theme-toggle-pill"
        onClick={toggleTheme}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
          isMidnight
            ? 'bg-[#2A0800] text-amber-300 border-amber-500/40 shadow-sm hover:border-amber-400 hover:bg-[#380B00]'
            : 'bg-white text-[#7C2D12] border-orange-200 shadow-xs hover:border-orange-400 hover:bg-orange-50'
        } ${className}`}
        title={
          theme === 'auto'
            ? 'Auto Mode Active (Click to toggle)'
            : isMidnight
            ? 'Night Theme Active (Click for Auto/Day)'
            : 'Day Theme Active (Click for Night)'
        }
        aria-label="Toggle Theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'auto' ? (
            <motion.span
              key="auto-icon"
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center text-amber-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </motion.span>
          ) : isMidnight ? (
            <motion.span
              key="moon-icon"
              initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center text-amber-400"
            >
              <Moon className="w-3.5 h-3.5" />
            </motion.span>
          ) : (
            <motion.span
              key="sun-icon"
              initial={{ rotate: 90, scale: 0.6, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center text-[#F97316]"
            >
              <Sun className="w-3.5 h-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="text-[11px] whitespace-nowrap">
          {theme === 'auto' ? 'Auto Mode' : isMidnight ? '🌙 Night Mode' : '☀️ Light Mode'}
        </span>
      </button>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`space-y-1.5 ${className}`}>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#9A3412] dark:text-amber-300/80 mb-1">
          Theme Display Mode
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            onClick={() => setTheme('saffron')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              theme === 'saffron'
                ? 'bg-orange-100 border-[#EA580C] text-[#EA580C] ring-2 ring-orange-300'
                : 'bg-white/80 border-orange-200 text-[#7C2D12] hover:bg-orange-50'
            }`}
          >
            <Sun className="w-4 h-4 text-[#F97316] mb-1" />
            <span>☀️ Light</span>
          </button>

          <button
            onClick={() => setTheme('midnight')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              theme === 'midnight'
                ? 'bg-[#2A0800] border-amber-400 text-amber-300 ring-2 ring-amber-400/50'
                : 'bg-white/80 dark:bg-[#1E0601] border-orange-200 dark:border-amber-900 text-[#7C2D12] dark:text-amber-200 hover:bg-orange-50'
            }`}
          >
            <Moon className="w-4 h-4 text-amber-400 mb-1" />
            <span>🌙 Night</span>
          </button>

          <button
            onClick={() => setTheme('auto')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              theme === 'auto'
                ? 'bg-[#EA580C] border-[#EA580C] text-white ring-2 ring-amber-300'
                : 'bg-white/80 dark:bg-[#1E0601] border-orange-200 dark:border-amber-900 text-[#7C2D12] dark:text-amber-200 hover:bg-orange-50'
            }`}
          >
            <RotateCcw className="w-4 h-4 text-amber-300 mb-1" />
            <span>🔄 Auto</span>
          </button>
        </div>
      </div>
    );
  }

  // Compact variant for Navbar with 3-mode cycler
  return (
    <button
      id="theme-toggle-compact-btn"
      onClick={toggleTheme}
      className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer relative group flex items-center justify-center ${
        isMidnight
          ? 'bg-[#2A0800] border-amber-500/40 text-amber-300 hover:bg-[#380B00] hover:border-amber-400 hover:text-amber-200 shadow-sm shadow-amber-950/50'
          : 'bg-white/95 border-orange-200 text-[#7C2D12] hover:bg-orange-50 hover:border-orange-300 hover:text-[#EA580C] shadow-xs'
      } ${className}`}
      title={
        theme === 'auto'
          ? 'Current: Auto Mode (Click to switch to Light)'
          : theme === 'midnight'
          ? 'Current: Night Mode (Click to switch to Auto)'
          : 'Current: Light Mode (Click to switch to Night)'
      }
      aria-label="Toggle Theme Mode (☀️ Light / 🌙 Night / 🔄 Auto)"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'auto' ? (
          <motion.div
            key="auto-icon"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center text-amber-400"
          >
            <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.div>
        ) : isMidnight ? (
          <motion.div
            key="moon-icon"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center text-amber-300"
          >
            <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.div>
        ) : (
          <motion.div
            key="sun-icon"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center text-[#F97316]"
          >
            <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle indicator tag */}
      <span
        className={`absolute -top-1 -right-1 text-[8px] font-extrabold px-1 rounded-full uppercase ${
          theme === 'auto'
            ? 'bg-amber-500 text-white'
            : isMidnight
            ? 'bg-amber-400 text-black shadow-[0_0_6px_#F59E0B]'
            : 'bg-[#F97316] text-white'
        }`}
      >
        {theme === 'auto' ? 'A' : isMidnight ? '🌙' : '☀️'}
      </span>
    </button>
  );
};
