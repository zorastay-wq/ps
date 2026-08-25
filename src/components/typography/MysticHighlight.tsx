import React from 'react';
import { motion } from 'motion/react';

interface MysticHighlightProps {
  children: React.ReactNode;
  className?: string;
  tooltip?: string;
  glow?: boolean;
}

export const MysticHighlight: React.FC<MysticHighlightProps> = ({
  children,
  className = '',
  tooltip,
  glow = true
}) => {
  return (
    <motion.span
      initial={{
        color: '#7C2D12',
        textShadow: '0 0 0px rgba(249, 115, 22, 0)',
      }}
      whileInView={{
        color: '#EA580C',
        textShadow: glow 
          ? [
              '0 0 4px rgba(249, 115, 22, 0.25)',
              '0 0 12px rgba(249, 115, 22, 0.4)',
              '0 0 6px rgba(249, 115, 22, 0.25)',
            ]
          : 'none',
      }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{
        color: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        textShadow: { duration: 2.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
      }}
      title={tooltip}
      className={`font-normal tracking-wide relative inline-block transition-colors cursor-help border-b border-dashed border-[#F97316]/50 hover:border-[#EA580C] ${className}`}
    >
      {children}
    </motion.span>
  );
};
