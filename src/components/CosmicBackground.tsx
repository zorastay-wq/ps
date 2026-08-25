import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CosmicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isMidnight } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
      angle: number;
      pulseSpeed: number;
      isGold: boolean;
    }

    const stars: Star[] = [];
    const starCount = Math.min(Math.floor((width * height) / 13000), isMidnight ? 110 : 85);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.7 + 0.25,
        speed: Math.random() * 0.16 + 0.04,
        angle: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        isGold: Math.random() > 0.4,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint constellation connections
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * (isMidnight ? 0.25 : 0.14);
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = isMidnight
              ? `rgba(251, 191, 36, ${lineAlpha})`
              : `rgba(249, 115, 22, ${lineAlpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // Draw warm saffron & celestial gold stars
      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        s.angle += s.pulseSpeed;
        const currentAlpha = Math.max(0.12, s.alpha + Math.sin(s.angle) * 0.35);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        
        if (isMidnight) {
          ctx.fillStyle = s.isGold
            ? `rgba(254, 240, 138, ${currentAlpha * 0.85})`
            : `rgba(249, 115, 22, ${currentAlpha * 0.75})`;
          ctx.shadowBlur = s.radius > 1.2 ? 6 : 2;
          ctx.shadowColor = s.isGold ? 'rgba(245, 158, 11, 0.6)' : 'rgba(234, 88, 12, 0.5)';
        } else {
          ctx.fillStyle = `rgba(249, 115, 22, ${currentAlpha * 0.6})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(234, 88, 12, 0.3)';
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMidnight]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${
        isMidnight ? 'opacity-70' : 'opacity-40'
      }`}
      aria-hidden="true"
    />
  );
};

