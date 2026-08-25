import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'saffron' | 'midnight' | 'auto';

interface ThemeContextType {
  theme: ThemeMode;
  effectiveTheme: 'saffron' | 'midnight';
  isMidnight: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const THEME_STORAGE_KEY = 'vedic_app_theme_mode';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'midnight' || stored === 'saffron' || stored === 'auto') {
        return stored as ThemeMode;
      }
    } catch {
      // Ignore local storage error
    }
    return 'saffron';
  });

  const [systemDark, setSystemDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      setSystemDark(e.matches);
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const effectiveTheme: 'saffron' | 'midnight' =
    theme === 'auto' ? (systemDark ? 'midnight' : 'saffron') : theme;

  useEffect(() => {
    const root = document.documentElement;
    if (effectiveTheme === 'midnight') {
      root.classList.add('theme-midnight');
      root.setAttribute('data-theme', 'midnight');
      // Update theme-color meta tag for mobile browser address bars
      let metaTheme = document.querySelector('meta[name="theme-color"]');
      if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.setAttribute('name', 'theme-color');
        document.head.appendChild(metaTheme);
      }
      metaTheme.setAttribute('content', '#120400');
    } else {
      root.classList.remove('theme-midnight');
      root.setAttribute('data-theme', 'saffron');
      let metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) {
        metaTheme.setAttribute('content', '#7C2D12');
      }
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme, effectiveTheme]);

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === 'saffron') return 'midnight';
      if (prev === 'midnight') return 'auto';
      return 'saffron';
    });
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        effectiveTheme,
        isMidnight: effectiveTheme === 'midnight',
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
