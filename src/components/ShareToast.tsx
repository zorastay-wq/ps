import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Check, Copy, Sparkles, X } from 'lucide-react';

interface ShareOptions {
  title?: string;
  text?: string;
  url?: string;
}

export const shareApp = async (
  options?: ShareOptions,
  onCopiedFallback?: () => void
): Promise<boolean> => {
  const shareData = {
    title: options?.title || 'Dr. Preeti Sehgal | Vedic Astrology, Lal Kitab & Vastu Authority',
    text: options?.text || 'Consult Dr. Preeti Sehgal - Renowned Astrologer with 28+ years practice in Delhi. Access authentic Lal Kitab Upays, Kundli analysis, Tarot Oracle & Zero-Demolition Vastu.',
    url: options?.url || window.location.href
  };

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (err: any) {
      // If user cancelled, don't show fallback error toast
      if (err?.name === 'AbortError') {
        return false;
      }
      // Otherwise fall through to clipboard copy
    }
  }

  // Fallback: Copy URL to clipboard
  try {
    const urlToCopy = shareData.url || window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(urlToCopy);
    } else {
      const tempInput = document.createElement('input');
      tempInput.value = urlToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    }
    if (onCopiedFallback) {
      onCopiedFallback();
    }
    return true;
  } catch (err) {
    console.error('Failed to copy link:', err);
    return false;
  }
};

interface ShareToastProps {
  show: boolean;
  onClose: () => void;
  message?: string;
}

export const ShareToast: React.FC<ShareToastProps> = ({
  show,
  onClose,
  message = 'App link copied to clipboard! Share with family & friends.'
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="share-toast-notification"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#7C2D12] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-orange-400/40 backdrop-blur-md max-w-sm sm:max-w-md w-auto"
        >
          <div className="w-8 h-8 rounded-full bg-[#F97316] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
            <Check className="w-4 h-4 stroke-[3]" />
          </div>

          <div className="flex-1 text-left">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-200">
              <Sparkles className="w-3 h-3 text-[#F97316]" />
              <span>Link Copied!</span>
            </div>
            <p className="text-[11px] sm:text-xs text-orange-100/90 font-normal mt-0.5 leading-snug">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-orange-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
