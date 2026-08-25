import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { VedicAIAssistant } from './VedicAIAssistant';

interface VedicAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (serviceId?: string) => void;
}

export const VedicAIModal: React.FC<VedicAIModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#FFF9F2]/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-orange-950/20 overflow-hidden border border-orange-200/90"
        >
          {/* Close button at top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close assistant modal"
          >
            <X className="w-4 h-4" />
          </button>

          <VedicAIAssistant
            isDrawer={true}
            onClose={onClose}
            onOpenBooking={(serviceId) => {
              onClose();
              onOpenBooking(serviceId);
            }}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
