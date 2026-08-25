import React from 'react';
import { motion, useInView } from 'motion/react';

interface StaggeredHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  className?: string;
  id?: string;
  mode?: 'words' | 'characters';
  delay?: number;
  staggerDelay?: number;
  goldAccentWords?: string[];
}

export const StaggeredHeading: React.FC<StaggeredHeadingProps> = ({
  text,
  as: Component = 'h2',
  className = '',
  id,
  mode = 'words',
  delay = 0,
  staggerDelay = 0.035,
  goldAccentWords = []
}) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      }
    }
  };

  if (mode === 'characters') {
    const characters = Array.from(text);

    return (
      <Component id={id} className={`${className} inline-block overflow-hidden`}>
        <motion.span
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="inline-block"
        >
          {characters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={itemVariants}
              className={`inline-block ${char === ' ' ? 'mr-[0.3em]' : ''}`}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    );
  }

  // Word-by-word reveal (avoids unnatural breaking and ensures 100% fluid mobile typography)
  const words = text.split(' ');

  return (
    <Component id={id} className={`${className} overflow-hidden`}>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="inline"
      >
        {words.map((word, index) => {
          const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
          const isGold = goldAccentWords.some(gw => 
            cleanWord.toLowerCase().includes(gw.toLowerCase()) || 
            word.toLowerCase().includes(gw.toLowerCase())
          );

          return (
            <span key={`${word}-${index}`} className="inline-block mr-[0.28em] last:mr-0">
              <motion.span
                variants={itemVariants}
                className={`inline-block ${isGold ? 'text-[#EA580C] italic font-normal drop-shadow-[0_0_12px_rgba(249,115,22,0.25)]' : ''}`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
};
