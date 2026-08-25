import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html, OrbitControls, Stars, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { TarotCard, TarotDeckTheme } from '../../types';
import { Sparkles, RotateCw, Eye, Check, RefreshCw, Info, HelpCircle, Shield, Compass, BookOpen } from 'lucide-react';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import { isWebGLAvailable } from '../../utils/webglDetect';

interface TarotDeck3DProps {
  cards: TarotCard[];
  flippedState: boolean[];
  onFlipCard: (index: number) => void;
  isShuffling: boolean;
  spreadMode: 'timeline' | 'love' | 'career';
  deckTheme: TarotDeckTheme;
}

// Camera auto-adjuster for responsive framing across mobile, tablet, and desktop
function ResponsiveCameraController() {
  const { size, camera } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      if (size.width < 420) {
        camera.position.z = 7.6;
        camera.position.y = 0.15;
      } else if (size.width < 640) {
        camera.position.z = 6.9;
        camera.position.y = 0.1;
      } else if (size.width < 1024) {
        camera.position.z = 6.3;
        camera.position.y = 0;
      } else {
        camera.position.z = 5.8;
        camera.position.y = 0;
      }
      camera.updateProjectionMatrix();
    }
  }, [size.width, camera]);

  return null;
}

// Tudor Rose & Lily Pattern Component for Rider-Waite Back Face
function TudorRoseLilyBackPattern() {
  return (
    <div className="w-56 h-88 bg-[#0D2346] rounded-xl border-2 border-[#D4AF37]/90 p-3 flex flex-col items-center justify-between text-amber-100 shadow-[0_0_30px_rgba(212,175,55,0.3)] relative overflow-hidden select-none">
      {/* Intricate Blue-and-White Tudor Crosshatch SVG background */}
      <div className="absolute inset-0 opacity-85 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="tudorGrid" width="36" height="36" patternUnits="userSpaceOnUse">
              {/* Crosshatch lattice lines */}
              <line x1="0" y1="0" x2="36" y2="36" stroke="#E2E8F0" strokeWidth="1.2" strokeOpacity="0.4" />
              <line x1="36" y1="0" x2="0" y2="36" stroke="#E2E8F0" strokeWidth="1.2" strokeOpacity="0.4" />
              <line x1="18" y1="0" x2="18" y2="36" stroke="#93C5FD" strokeWidth="0.6" strokeOpacity="0.3" />
              <line x1="0" y1="18" x2="36" y2="18" stroke="#93C5FD" strokeWidth="0.6" strokeOpacity="0.3" />
              
              {/* Tudor Rose Motif at intersections */}
              <circle cx="18" cy="18" r="4.5" fill="#DC2626" fillOpacity="0.7" stroke="#FDE047" strokeWidth="0.8" />
              <circle cx="18" cy="18" r="1.8" fill="#FDE047" />
              
              {/* Lily / Fleur-de-lis points */}
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" fillOpacity="0.6" />
              <circle cx="36" cy="0" r="2" fill="#FFFFFF" fillOpacity="0.6" />
              <circle cx="0" cy="36" r="2" fill="#FFFFFF" fillOpacity="0.6" />
              <circle cx="36" cy="36" r="2" fill="#FFFFFF" fillOpacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tudorGrid)" />
        </svg>
      </div>

      {/* Outer Decorative Antique Frame */}
      <div className="absolute inset-1.5 border border-[#D4AF37]/60 rounded-lg pointer-events-none" />
      <div className="absolute inset-2.5 border border-dashed border-[#E2E8F0]/40 rounded pointer-events-none" />

      {/* Top Banner */}
      <div className="relative z-10 text-[7.5px] tracking-[0.25em] uppercase font-bold text-center text-[#FDE047] drop-shadow-sm">
        RIDER-WAITE-SMITH &bull; 1909
      </div>

      {/* Central Rosicrucian / Golden Dawn Mystic Crest */}
      <div className="relative z-10 w-22 h-22 rounded-full border-2 border-[#D4AF37] bg-[#0A1C38]/90 flex items-center justify-center p-2 shadow-xl">
        <div className="w-16 h-16 rounded-full border border-dashed border-[#FDE047] flex flex-col items-center justify-center text-center">
          <span className="text-xl">🌹</span>
          <span className="text-[6.5px] uppercase font-bold text-[#FDE047] tracking-widest mt-0.5">TUDOR ROSE</span>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 text-center">
        <span className="text-[9px] font-playfair tracking-widest block font-bold text-[#FDE047] drop-shadow-sm">
          TAROT TRADITION
        </span>
        <span className="text-[7.5px] text-blue-200 tracking-wider uppercase font-semibold">
          Pamela Colman Smith
        </span>
      </div>
    </div>
  );
}

// Vedic Sacred Mandala Pattern Component for Vedic Back Face
function VedicMandalaBackPattern() {
  return (
    <div className="w-56 h-88 bg-gradient-to-b from-[#3B1307] via-[#2A0C03] to-[#1F0702] rounded-xl border-2 border-[#F59E0B] p-3.5 flex flex-col items-center justify-between text-[#FCD34D] shadow-[0_0_30px_rgba(245,158,11,0.35)] relative overflow-hidden select-none">
      <div className="absolute inset-0 opacity-20 border border-dashed border-[#FCD34D] m-2 rounded-lg pointer-events-none" />
      
      <div className="text-[8px] tracking-[0.25em] uppercase font-semibold text-center text-[#FCD34D]">
        Dr. Preeti Sehgal &bull; Vedic Oracle
      </div>

      {/* Central Glowing Sacred Seal */}
      <div className="w-20 h-20 rounded-full border-2 border-[#F59E0B] flex items-center justify-center p-2 relative bg-gradient-to-br from-amber-500/15 to-orange-600/20 shadow-inner">
        <div className="w-14 h-14 rounded-full border border-dashed border-[#FCD34D]/70 flex items-center justify-center">
          <Sparkles className="w-7 h-7 text-[#FCD34D]" />
        </div>
      </div>

      <div className="text-center">
        <span className="text-[10px] font-playfair tracking-widest block font-bold text-amber-100">
          SACRED ORACLE
        </span>
        <span className="text-[8px] text-amber-300/80 tracking-widest uppercase font-semibold">
          Click to Flip
        </span>
      </div>
    </div>
  );
}

// Single 3D Floating Tarot Card Component
function FloatingCard3D({
  card,
  index,
  isFlipped,
  onFlip,
  spreadMode,
  deckTheme,
  spacing,
  scale = 1,
}: {
  card?: TarotCard;
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
  spreadMode: 'timeline' | 'love' | 'career';
  deckTheme: TarotDeckTheme;
  spacing: number;
  scale?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const targetX = (index - 1) * spacing;
  const targetY = 0;
  const targetZ = 0;

  // Target rotation for 3D flip
  // Face up = 0, Face down = Math.PI on Y axis
  // Reversed = 180 deg (Math.PI) on Z axis when face up
  const targetRotY = isFlipped ? 0 : Math.PI;
  const targetRotZ = (isFlipped && card?.isReversed) ? Math.PI : 0;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth 3D flip animation on Y axis
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        1.85,
        delta
      );

      // Smooth orientation inversion on Z axis when reversed
      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        targetRotZ,
        1.85,
        delta
      );

      // Responsive hover tilt on X and elevation
      if (hovered) {
        groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, 0.12, 3.5, delta);
        groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, 0.18, 3.5, delta);
      } else {
        groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, 0, 2.5, delta);
        groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, 0, 2.5, delta);
      }
    }
  });

  const getPositionTitle = () => {
    if (spreadMode === 'timeline') {
      return index === 0 ? 'Past Karma / Root' : index === 1 ? 'Present Energy' : 'Future Outcome';
    }
    if (spreadMode === 'love') {
      return index === 0 ? 'Your Heart' : index === 1 ? 'Partner Mind' : 'Union Path';
    }
    return index === 0 ? 'Current Status' : index === 1 ? 'Obstacle' : 'Financial Triumph';
  };

  const isRWS = deckTheme === 'rider-waite';

  return (
    <group position={[targetX, targetY, targetZ]} scale={[scale, scale, scale]}>
      <Float
        speed={hovered ? 0 : 0.9}
        rotationIntensity={0.08}
        floatIntensity={0.22}
        floatingRange={[-0.04, 0.04]}
      >
        <group
          ref={groupRef}
          rotation={[0, Math.PI, 0]} // Initial face down
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onFlip();
          }}
        >
          {/* Main Card Body with Chamfered Edge */}
          <RoundedBox
            args={[1.88, 2.88, 0.065]}
            radius={0.08}
            smoothness={4}
          >
            <meshStandardMaterial
              color={isRWS ? (hovered ? '#E2C37A' : '#C5A059') : (hovered ? '#FCD34D' : '#F59E0B')}
              metalness={isRWS ? 0.85 : 0.92}
              roughness={isRWS ? 0.25 : 0.18}
              emissive={isRWS ? '#92400E' : '#D97706'}
              emissiveIntensity={hovered ? 0.45 : 0.22}
            />
          </RoundedBox>

          {/* FRONT FACE OF CARD (Visible when Y rotation = 0) */}
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[1.74, 2.74]} />
            <meshStandardMaterial
              color={isRWS ? '#FDFBF7' : '#2A0C03'}
              roughness={0.3}
              metalness={0.2}
            />
          </mesh>

          {/* Front Face HTML Overlay */}
          <Html
            position={[0, 0, 0.04]}
            transform
            occlude
            distanceFactor={3.2}
            className="pointer-events-none select-none"
          >
            {isRWS ? (
              /* CLASSIC RIDER-WAITE FRONT DESIGN */
              <div className="w-56 h-88 bg-[#FDFBF7] text-[#1E293B] rounded-xl border-2 border-[#B45309]/80 p-2.5 flex flex-col justify-between shadow-[0_0_25px_rgba(180,83,9,0.3)] relative overflow-hidden">
                {/* Vintage Card Top Header */}
                <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#7C2D12] font-bold border-b border-[#D4AF37]/50 pb-1">
                  <span className="font-playfair font-bold text-[10px] text-[#9A3412]">
                    {card?.number || (card?.arcana === 'Major' ? 'Major' : card?.suit)}
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                    card?.isReversed ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {card?.isReversed ? 'Reversed ↺' : 'Upright ✦'}
                  </span>
                </div>

                {/* Card Artwork / Center illustration */}
                <div className="relative my-auto w-full h-44 rounded-lg overflow-hidden border border-[#D4AF37]/60 bg-[#FEF3C7]/40 flex items-center justify-center shadow-inner">
                  {card?.imageUrl ? (
                    <img
                      src={card.imageUrl}
                      alt={card.name}
                      referrerPolicy="no-referrer"
                      onLoad={() => setImageLoaded(true)}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${
                        imageLoaded ? 'opacity-100' : 'opacity-80 blur-xs'
                      }`}
                    />
                  ) : (
                    <div className="text-center p-3">
                      <div className="w-12 h-12 mx-auto rounded-full bg-[#FEF3C7] border border-[#B45309] flex items-center justify-center mb-1">
                        <Sparkles className="w-6 h-6 text-[#B45309]" />
                      </div>
                      <h4 className="font-playfair text-xs font-bold text-[#431407]">{card?.name}</h4>
                    </div>
                  )}

                  {/* Orientation Indicator Overlay */}
                  {card?.isReversed && (
                    <div className="absolute top-1 right-1 bg-black/75 text-amber-200 text-[8px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                      Rev
                    </div>
                  )}
                </div>

                {/* Bottom Card Title Banner */}
                <div className="text-center bg-[#FEF3C7] border border-[#D4AF37]/70 rounded p-1.5 shadow-xs">
                  <h3 className="font-playfair text-[11px] font-bold text-[#431407] uppercase tracking-wider truncate">
                    {card?.name || 'Rider-Waite Card'}
                  </h3>
                  <div className="text-[8px] text-[#7C2D12] line-clamp-1 italic mt-0.5">
                    {card?.isReversed ? (card?.reversedMeaning || card?.uprightMeaning) : (card?.uprightMeaning || 'Traditional Archetype')}
                  </div>
                </div>

                {/* Spread Sub-label */}
                <div className="text-[7.5px] text-[#9A3412] tracking-[0.2em] uppercase text-center border-t border-[#D4AF37]/40 pt-1 font-semibold">
                  {getPositionTitle()}
                </div>
              </div>
            ) : (
              /* VEDIC GOLDEN HOLOGRAPHIC FRONT DESIGN */
              <div className="w-56 h-88 bg-gradient-to-b from-[#3B1307] via-[#2A0C03] to-[#1F0702] rounded-xl border-2 border-[#F59E0B]/80 p-3.5 flex flex-col justify-between text-amber-100 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                {/* Header */}
                <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#FCD34D] border-b border-[#F59E0B]/30 pb-1 font-semibold">
                  <span>{card?.arcana || 'Major'} Arcana</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                    card?.isReversed ? 'bg-rose-950/80 text-rose-300 border border-rose-500/50' : 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                  }`}>
                    {card?.isReversed ? 'Reversed ↺' : 'Upright ✦'}
                  </span>
                </div>

                {/* Core Archetype Display */}
                <div className="text-center my-auto py-1">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/30 border border-[#F59E0B] flex items-center justify-center mb-2 shadow-lg shadow-orange-950/60">
                    <Sparkles className="w-6 h-6 text-[#FCD34D] animate-pulse" />
                  </div>
                  <h3 className="font-playfair text-base font-bold text-amber-100 mb-1 leading-tight tracking-wide">
                    {card?.name || 'The Oracle'}
                  </h3>
                  <span className="text-[10px] text-amber-300/80 tracking-widest uppercase block font-medium">
                    {card?.astrologicalSign} &bull; {card?.element}
                  </span>
                </div>

                {/* Guidance Excerpt */}
                <div className="bg-[#1F0702]/90 border border-amber-900/60 rounded-lg p-2 text-center text-[10px] text-amber-100/90 line-clamp-2 leading-relaxed">
                  {card?.isReversed ? (card?.reversedMeaning || card?.uprightMeaning) : (card?.uprightMeaning || 'Vedic Archetype Revealed')}
                </div>

                {/* Position Sub-label */}
                <div className="text-[8px] text-[#FCD34D] tracking-[0.2em] uppercase text-center border-t border-[#F59E0B]/30 pt-1 font-semibold">
                  {getPositionTitle()}
                </div>
              </div>
            )}
          </Html>

          {/* BACK FACE OF CARD (Visible when Y rotation = Math.PI) */}
          <mesh position={[0, 0, -0.035]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.74, 2.74]} />
            <meshStandardMaterial
              color={isRWS ? '#0D2346' : '#1F0702'}
              roughness={0.25}
              metalness={0.7}
            />
          </mesh>

          {/* Back Face HTML Texture */}
          <Html
            position={[0, 0, -0.04]}
            rotation={[0, Math.PI, 0]}
            transform
            occlude
            distanceFactor={3.2}
            className="pointer-events-none select-none"
          >
            {isRWS ? <TudorRoseLilyBackPattern /> : <VedicMandalaBackPattern />}
          </Html>
        </group>
      </Float>

      {/* Position HUD Tag Below Each 3D Card */}
      <Html position={[0, -1.95, 0]} center distanceFactor={6.8}>
        <div className="text-center whitespace-nowrap pointer-events-auto">
          <button
            onClick={onFlip}
            className={`px-3 py-1 rounded-full text-[10.5px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 shadow-md ${
              isFlipped
                ? isRWS
                  ? 'bg-gradient-to-r from-[#B45309] to-[#9A3412] text-white border border-[#FDE047]/60 shadow-[0_0_12px_rgba(180,83,9,0.5)] scale-105'
                  : 'bg-gradient-to-r from-[#F97316] to-[#D97706] text-white border border-[#FCD34D]/60 shadow-[0_0_12px_rgba(249,115,22,0.4)] scale-105'
                : isRWS
                  ? 'bg-[#0D2346]/90 backdrop-blur-md text-[#FDE047] border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#163973]'
                  : 'bg-[#2A0C03]/90 backdrop-blur-md text-[#FCD34D] border border-[#F59E0B]/50 hover:border-[#F59E0B] hover:bg-[#3B1307]'
            }`}
          >
            <span>{getPositionTitle()}</span>
            <span className="text-xs font-bold">{isFlipped ? '✓' : '↻'}</span>
          </button>
        </div>
      </Html>
    </group>
  );
}

// 3D Tarot Deck Scene Container
function Tarot3DScene({
  cards,
  flippedState,
  onFlipCard,
  spreadMode,
  deckTheme,
}: {
  cards: TarotCard[];
  flippedState: boolean[];
  onFlipCard: (idx: number) => void;
  spreadMode: 'timeline' | 'love' | 'career';
  deckTheme: TarotDeckTheme;
}) {
  const { size } = useThree();

  const { spacing, cardScale } = useMemo(() => {
    if (size.width < 420) {
      return { spacing: 1.45, cardScale: 0.72 };
    }
    if (size.width < 640) {
      return { spacing: 1.65, cardScale: 0.8 };
    }
    if (size.width < 1024) {
      return { spacing: 2.05, cardScale: 0.9 };
    }
    return { spacing: 2.45, cardScale: 1.0 };
  }, [size.width]);

  const isRWS = deckTheme === 'rider-waite';

  return (
    <>
      <ResponsiveCameraController />

      {/* Atmospheric Lighting tuned per deck theme */}
      <ambientLight intensity={isRWS ? 0.85 : 0.7} color={isRWS ? '#FDF8F0' : '#FFF1E6'} />
      <pointLight position={[0, 4, 3.5]} intensity={2.5} color={isRWS ? '#EAB308' : '#F59E0B'} distance={14} />
      <directionalLight position={[-4, 5, 4]} intensity={1.2} color={isRWS ? '#EFF6FF' : '#FFEDD5'} />
      <pointLight position={[4, -3, 2.5]} intensity={0.9} color={isRWS ? '#3B82F6' : '#F97316'} distance={10} />
      <pointLight position={[0, -2, 3]} intensity={0.6} color={isRWS ? '#CA8A04' : '#D97706'} distance={8} />

      {/* Deep Space Background Atmosphere */}
      <Stars
        radius={30}
        depth={40}
        count={isRWS ? 1800 : 1600}
        factor={2.8}
        saturation={isRWS ? 0.6 : 0.4}
        fade
        speed={0.8}
      />

      {/* 3 Interactive Floating 3D Cards */}
      {cards.slice(0, 3).map((card, idx) => (
        <FloatingCard3D
          key={`${deckTheme}-${card.id || idx}-${idx}`}
          card={card}
          index={idx}
          isFlipped={flippedState[idx]}
          onFlip={() => onFlipCard(idx)}
          spreadMode={spreadMode}
          deckTheme={deckTheme}
          spacing={spacing}
          scale={cardScale}
        />
      ))}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 2 - 0.2}
        maxAzimuthAngle={Math.PI / 8}
        minAzimuthAngle={-Math.PI / 8}
      />
    </>
  );
}

export const TarotDeck3D: React.FC<TarotDeck3DProps> = ({
  cards,
  flippedState,
  onFlipCard,
  isShuffling,
  spreadMode,
  deckTheme,
}) => {
  const isRWS = deckTheme === 'rider-waite';

  return (
    <div className={`relative w-full rounded-3xl border shadow-2xl overflow-hidden mb-8 transition-colors duration-500 ${
      isRWS
        ? 'bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0A0F1D] border-[#B45309]/60 shadow-slate-950/40'
        : 'bg-gradient-to-b from-[#2A0C03] via-[#3B1307] to-[#1F0702] border-[#F59E0B]/50 shadow-orange-950/25'
    }`}>
      {/* 3D Viewport Header */}
      <div className={`flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 backdrop-blur-xl border-b gap-2 z-10 transition-colors duration-300 ${
        isRWS ? 'bg-[#0F172A]/90 border-[#B45309]/40' : 'bg-[#2A0C03]/90 border-[#F59E0B]/30'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full animate-ping ${isRWS ? 'bg-[#FDE047]' : 'bg-[#F59E0B]'}`} />
          <span className="text-xs sm:text-sm font-playfair font-bold text-amber-100 tracking-wider flex items-center gap-1.5">
            <Sparkles className={`w-4 h-4 ${isRWS ? 'text-[#FDE047]' : 'text-[#F59E0B]'}`} />
            {isRWS ? '3D Classic Rider-Waite-Smith Deck (1909)' : '3D Floating Holographic Vedic Oracle Deck'}
          </span>
        </div>

        <span className={`text-[10px] border px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
          isRWS
            ? 'text-[#FDE047] border-[#D4AF37]/50 bg-slate-900/60'
            : 'text-[#FCD34D] border-[#F59E0B]/40 bg-amber-950/40'
        }`}>
          Click any card to flip &bull; Upright & Reversed
        </span>
      </div>

      {/* R3F 3D Canvas / Safe Fallback */}
      <div className={`relative w-full h-[380px] sm:h-[450px] lg:h-[480px] cursor-grab active:cursor-grabbing touch-none transition-colors duration-500 ${
        isRWS ? 'bg-gradient-to-b from-[#0A0F1D] via-[#1E293B] to-[#0A0F1D]' : 'bg-gradient-to-b from-[#1F0702] via-[#2A0C03] to-[#1A0602]'
      }`}>
        <WebGLErrorBoundary
          title={isRWS ? 'Classic Rider-Waite 78-Card Deck' : 'Vedic Holographic Oracle Cards'}
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg w-full">
                {cards.map((card, idx) => {
                  const isFlipped = flippedState[idx];
                  return (
                    <div
                      key={card.id || idx}
                      onClick={() => onFlipCard(idx)}
                      className={`h-48 sm:h-64 rounded-2xl border-2 transition-all duration-500 cursor-pointer p-3 flex flex-col items-center justify-between text-center relative shadow-xl transform hover:-translate-y-1 ${
                        isFlipped
                          ? isRWS
                            ? 'bg-[#FEFCE8] border-[#B45309] text-[#1E293B] shadow-amber-500/20'
                            : 'bg-gradient-to-b from-[#3D1408] to-[#250A03] border-amber-400 text-amber-100 shadow-amber-500/20'
                          : isRWS
                            ? 'bg-[#0D2346] border-[#D4AF37]/70 text-blue-100'
                            : 'bg-gradient-to-b from-[#250A03] to-[#160501] border-orange-600/50 text-orange-200'
                      }`}
                      style={{
                        transform: isFlipped && card.isReversed ? 'rotate(180deg)' : undefined
                      }}
                    >
                      {isFlipped ? (
                        <>
                          <div className="text-[10px] text-[#B45309] font-bold uppercase tracking-widest flex items-center justify-between w-full">
                            <span>{idx === 0 ? 'Past' : idx === 1 ? 'Present' : 'Future'}</span>
                            <span className="text-[8px] text-rose-600">{card.isReversed ? '↺ Rev' : '✦ Up'}</span>
                          </div>
                          {card.imageUrl ? (
                            <img
                              src={card.imageUrl}
                              alt={card.name}
                              referrerPolicy="no-referrer"
                              className="w-16 h-24 object-cover rounded border border-[#D4AF37]/50 my-auto shadow-sm"
                            />
                          ) : (
                            <div className="text-2xl my-auto select-none">
                              {card.suit === 'Cups' ? '🏆' : card.suit === 'Wands' ? '🪄' : card.suit === 'Swords' ? '⚔️' : card.suit === 'Pentacles' ? '🪙' : '✨'}
                            </div>
                          )}
                          <div className="w-full">
                            <div className="font-playfair text-xs font-bold text-[#431407] truncate">{card.name}</div>
                            <div className="text-[9px] text-[#7C2D12] mt-0.5 line-clamp-2">
                              {card.isReversed ? (card.reversedMeaning || card.uprightMeaning) : (card.uprightMeaning || card.guidance)}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center gap-2">
                          <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Tap to Reveal</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          }
        >
          {isWebGLAvailable() ? (
            <Canvas
              camera={{ position: [0, 0, 6.2], fov: 45 }}
              gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
              <Tarot3DScene
                cards={cards}
                flippedState={flippedState}
                onFlipCard={onFlipCard}
                spreadMode={spreadMode}
                deckTheme={deckTheme}
              />
            </Canvas>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg w-full">
                {cards.map((card, idx) => {
                  const isFlipped = flippedState[idx];
                  return (
                    <div
                      key={card.id || idx}
                      onClick={() => onFlipCard(idx)}
                      className={`h-48 sm:h-64 rounded-2xl border-2 transition-all duration-500 cursor-pointer p-3 flex flex-col items-center justify-between text-center relative shadow-xl transform hover:-translate-y-1 ${
                        isFlipped
                          ? isRWS
                            ? 'bg-[#FEFCE8] border-[#B45309] text-[#1E293B] shadow-amber-500/20'
                            : 'bg-gradient-to-b from-[#3D1408] to-[#250A03] border-amber-400 text-amber-100 shadow-amber-500/20'
                          : isRWS
                            ? 'bg-[#0D2346] border-[#D4AF37]/70 text-blue-100'
                            : 'bg-gradient-to-b from-[#250A03] to-[#160501] border-orange-600/50 text-orange-200'
                      }`}
                      style={{
                        transform: isFlipped && card.isReversed ? 'rotate(180deg)' : undefined
                      }}
                    >
                      {isFlipped ? (
                        <>
                          <div className="text-[10px] text-[#B45309] font-bold uppercase tracking-widest flex items-center justify-between w-full">
                            <span>{idx === 0 ? 'Past' : idx === 1 ? 'Present' : 'Future'}</span>
                            <span className="text-[8px] text-rose-600">{card.isReversed ? '↺ Rev' : '✦ Up'}</span>
                          </div>
                          {card.imageUrl ? (
                            <img
                              src={card.imageUrl}
                              alt={card.name}
                              referrerPolicy="no-referrer"
                              className="w-16 h-24 object-cover rounded border border-[#D4AF37]/50 my-auto shadow-sm"
                            />
                          ) : (
                            <div className="text-2xl my-auto select-none">
                              {card.suit === 'Cups' ? '🏆' : card.suit === 'Wands' ? '🪄' : card.suit === 'Swords' ? '⚔️' : card.suit === 'Pentacles' ? '🪙' : '✨'}
                            </div>
                          )}
                          <div className="w-full">
                            <div className="font-playfair text-xs font-bold text-[#431407] truncate">{card.name}</div>
                            <div className="text-[9px] text-[#7C2D12] mt-0.5 line-clamp-2">
                              {card.isReversed ? (card.reversedMeaning || card.uprightMeaning) : (card.uprightMeaning || card.guidance)}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center gap-2">
                          <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Tap to Reveal</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </WebGLErrorBoundary>

        {/* Shuffling Loading Veil */}
        {isShuffling && (
          <div className={`absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-20 animate-in fade-in duration-300 ${
            isRWS ? 'bg-[#0F172A]/85' : 'bg-[#1F0702]/85'
          }`}>
            <RotateCw className={`w-8 h-8 animate-spin ${isRWS ? 'text-[#FDE047]' : 'text-[#F59E0B]'}`} />
            <span className="font-playfair text-sm text-amber-200 tracking-widest font-bold">
              {isRWS ? 'Shuffling 78-Card Rider-Waite Deck & Arcana...' : 'Consulting Cosmic Akashic Records...'}
            </span>
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className={`p-3.5 backdrop-blur-md border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-colors duration-300 ${
        isRWS ? 'bg-[#0F172A]/95 border-[#B45309]/40' : 'bg-[#2A0C03]/95 border-[#F59E0B]/30'
      }`}>
        <span className="text-[11px] text-amber-200/80 font-normal">
          {isRWS
            ? 'Rendered with authentic 1909 Tudor Rose & Lily crosshatch backings, antique brass bevels, and dual upright/reversed physics.'
            : 'Interactive Vedic Tarot cards rendered with golden chamfers, dynamic 3D physics & planetary alignments.'}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              onFlipCard(0);
              onFlipCard(1);
              onFlipCard(2);
            }}
            className={`px-3.5 py-1.5 rounded-xl border text-xs transition-all cursor-pointer font-semibold shadow-xs ${
              isRWS
                ? 'bg-gradient-to-r from-blue-900/30 to-amber-900/30 text-[#FDE047] border-[#D4AF37]/50 hover:bg-slate-800'
                : 'bg-gradient-to-r from-amber-500/20 to-orange-600/20 text-[#FCD34D] border-[#F59E0B]/40 hover:bg-amber-950/50'
            }`}
          >
            Toggle All 3 Cards
          </button>
        </div>
      </div>
    </div>
  );
};
