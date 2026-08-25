import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

interface FluidCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number; // Duration in seconds
  className?: string;
  id?: string;
}

export const FluidCounter: React.FC<FluidCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 2.2,
  className = '',
  id,
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const startValue = 0;
    const endValue = value;
    const durationMs = duration * 1000;

    // Smooth cubic bezier easing: easeOutExpo
    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutCubic(progress);

      const currentVal = startValue + (endValue - startValue) * easedProgress;
      setDisplayValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value, duration]);

  const formattedNumber = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.floor(displayValue).toLocaleString('en-IN');

  return (
    <span ref={ref} id={id} className={`inline-block tabular-nums font-cinzel ${className}`}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};
