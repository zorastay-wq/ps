import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Sparkles, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  X, 
  Hand,
  ShieldCheck
} from 'lucide-react';

export type ToastType = 'success' | 'reading_complete' | 'palm_success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type?: ToastType;
  duration?: number;
  icon?: React.ReactNode;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  showSuccess: (title: string, message?: string, duration?: number) => string;
  showReadingComplete: (title?: string, message?: string, duration?: number) => string;
  showPalmSuccess: (title?: string, message?: string, duration?: number) => string;
  showInfo: (title: string, message?: string, duration?: number) => string;
  showWarning: (title: string, message?: string, duration?: number) => string;
  showError: (title: string, message?: string, duration?: number) => string;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message, type = 'info', duration = 4500, icon }: Omit<ToastItem, 'id'>) => {
      const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const newToast: ToastItem = { id, title, message, type, duration, icon };

      setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts at a time

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }

      return id;
    },
    [dismissToast]
  );

  const showSuccess = useCallback(
    (title: string, message?: string, duration = 4500) => {
      return showToast({ title, message, type: 'success', duration });
    },
    [showToast]
  );

  const showReadingComplete = useCallback(
    (title = 'Reading Complete', message = 'Your Vedic astrological analysis is ready.', duration = 5000) => {
      return showToast({ title, message, type: 'reading_complete', duration });
    },
    [showToast]
  );

  const showPalmSuccess = useCallback(
    (
      title = 'Palm Analysis Successful',
      message = 'Hasta Rekha biometric lines & planetary mounts decoded successfully.',
      duration = 5000
    ) => {
      return showToast({ title, message, type: 'palm_success', duration });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (title: string, message?: string, duration = 4500) => {
      return showToast({ title, message, type: 'info', duration });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (title: string, message?: string, duration = 5000) => {
      return showToast({ title, message, type: 'warning', duration });
    },
    [showToast]
  );

  const showError = useCallback(
    (title: string, message?: string, duration = 5000) => {
      return showToast({ title, message, type: 'error', duration });
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccess,
        showReadingComplete,
        showPalmSuccess,
        showInfo,
        showWarning,
        showError,
        dismissToast,
      }}
    >
      {children}

      {/* Floating Toast Portal / Container with Framer Motion animations */}
      <div 
        id="toast-container" 
        className="fixed top-5 right-5 sm:top-6 sm:right-6 z-[9999] flex flex-col gap-2.5 max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] pointer-events-none"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const isPalmOrReading = toast.type === 'palm_success' || toast.type === 'reading_complete';
            const isSuccess = toast.type === 'success';
            const isWarning = toast.type === 'warning';
            const isError = toast.type === 'error';

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: -24, scale: 0.92, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.9, y: -16, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                className={`pointer-events-auto relative overflow-hidden rounded-2xl shadow-2xl border backdrop-blur-md p-4 flex items-start gap-3.5 transition-all ${
                  isPalmOrReading
                    ? 'bg-[#431407]/95 border-orange-400 text-white shadow-[0_10px_35px_rgba(249,115,22,0.35)] ring-1 ring-orange-400/50'
                    : isSuccess
                    ? 'bg-stone-900/95 border-emerald-500/60 text-white shadow-emerald-900/30'
                    : isWarning
                    ? 'bg-amber-950/95 border-amber-500/60 text-white shadow-amber-950/40'
                    : isError
                    ? 'bg-red-950/95 border-red-500/60 text-white shadow-red-950/40'
                    : 'bg-[#7C2D12]/95 border-orange-300/40 text-white shadow-orange-950/40'
                }`}
              >
                {/* Visual Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                    isPalmOrReading
                      ? 'bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white shadow-orange-500/40 animate-pulse'
                      : isSuccess
                      ? 'bg-gradient-to-br from-emerald-500 to-green-600 text-white'
                      : isWarning
                      ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white'
                      : isError
                      ? 'bg-gradient-to-br from-rose-500 to-red-600 text-white'
                      : 'bg-gradient-to-br from-orange-400 to-[#F97316] text-white'
                  }`}
                >
                  {toast.icon ? (
                    toast.icon
                  ) : toast.type === 'palm_success' ? (
                    <Hand className="w-5 h-5" />
                  ) : toast.type === 'reading_complete' ? (
                    <Sparkles className="w-5 h-5" />
                  ) : isSuccess ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isWarning ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : isError ? (
                    <AlertCircle className="w-5 h-5" />
                  ) : (
                    <Info className="w-5 h-5" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-1.5">
                    {isPalmOrReading && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#F97316]/30 text-orange-200 border border-orange-400/30">
                        Hasta Rekha
                      </span>
                    )}
                    <h4 className="font-playfair font-bold text-sm text-white tracking-tight leading-snug">
                      {toast.title}
                    </h4>
                  </div>
                  {toast.message && (
                    <p className="text-xs text-orange-100/90 font-normal mt-1 leading-relaxed">
                      {toast.message}
                    </p>
                  )}
                  {isPalmOrReading && (
                    <div className="flex items-center gap-1 text-[11px] text-green-300 font-semibold mt-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                      <span>Biometric Validation Verified</span>
                    </div>
                  )}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => dismissToast(toast.id)}
                  className="text-orange-200/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                  aria-label="Dismiss notification"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Subtle animated progress bar at bottom */}
                {toast.duration && toast.duration > 0 && (
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                    className={`absolute bottom-0 left-0 h-1 ${
                      isPalmOrReading
                        ? 'bg-gradient-to-r from-green-400 via-amber-300 to-[#F97316]'
                        : isSuccess
                        ? 'bg-emerald-400'
                        : isWarning
                        ? 'bg-amber-400'
                        : isError
                        ? 'bg-rose-400'
                        : 'bg-orange-400'
                    }`}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
