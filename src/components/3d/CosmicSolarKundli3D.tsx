import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Html, Sphere, Ring, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { KundliResult } from '../../types';
import { Sparkles, Compass, Eye, RotateCw, ZoomIn, Info, ShieldCheck, Sun } from 'lucide-react';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import { isWebGLAvailable } from '../../utils/webglDetect';

interface CosmicSolarKundli3DProps {
  result: KundliResult;
  activeHouse: number;
  onSelectHouse: (houseNum: number) => void;
}

// 12 Vedic Houses with geometry coordinates, significations and deities
const HOUSES_CONFIG = [
  { num: 1, name: '1st House (Lagna)', angle: 0, radius: 2.2, deity: 'Sun / Brahma', label: 'Self & Vitality', planet: 'Su • Me' },
  { num: 2, name: '2nd House (Dhana)', angle: Math.PI / 6, radius: 2.3, deity: 'Brihaspati', label: 'Wealth & Speech', planet: 'Ju' },
  { num: 3, name: '3rd House (Bhratri)', angle: (2 * Math.PI) / 6, radius: 2.4, deity: 'Mars', label: 'Courage & Siblings', planet: 'Ma' },
  { num: 4, name: '4th House (Matru)', angle: (3 * Math.PI) / 6, radius: 2.3, deity: 'Chandra', label: 'Mother & Property', planet: 'Ve' },
  { num: 5, name: '5th House (Putra)', angle: (4 * Math.PI) / 6, radius: 2.2, deity: 'Surya', label: 'Past Karma & Mind', planet: 'Mo' },
  { num: 6, name: '6th House (Rin/Rog)', angle: (5 * Math.PI) / 6, radius: 2.4, deity: 'Kartikeya', label: 'Debts & Enemies', planet: 'Sa' },
  { num: 7, name: '7th House (Jaya)', angle: Math.PI, radius: 2.2, deity: 'Shukra', label: 'Spouse & Partners', planet: 'Ra' },
  { num: 8, name: '8th House (Randhra)', angle: (7 * Math.PI) / 6, radius: 2.3, deity: 'Yama', label: 'Occult & Longevity', planet: 'Ke' },
  { num: 9, name: '9th House (Dharma)', angle: (8 * Math.PI) / 6, radius: 2.4, deity: 'Vishnu', label: 'Fortune & Wisdom', planet: 'Ju' },
  { num: 10, name: '10th House (Karma)', angle: (9 * Math.PI) / 6, radius: 2.2, deity: 'Indra', label: 'Career & Authority', planet: 'Su' },
  { num: 11, name: '11th House (Labha)', angle: (10 * Math.PI) / 6, radius: 2.3, deity: 'Kubera', label: 'Gains & Fulfillment', planet: 'Me' },
  { num: 12, name: '12th House (Moksha)', angle: (11 * Math.PI) / 6, radius: 2.4, deity: 'Shiva', label: 'Moksha & Foreign', planet: 'Ke' },
];

// Navagraha planetary orbs orbiting the cosmic center
const NAVAGRAHA_ORBS = [
  { name: 'Surya (Sun)', color: '#FFD700', radius: 1.4, speed: 0.8, size: 0.16, emissive: '#FF8C00' },
  { name: 'Chandra (Moon)', color: '#E0E6ED', radius: 1.8, speed: 1.2, size: 0.12, emissive: '#A0B2C6' },
  { name: 'Mangal (Mars)', color: '#E2583E', radius: 2.6, speed: 0.6, size: 0.13, emissive: '#B22222' },
  { name: 'Budh (Mercury)', color: '#4ADE80', radius: 3.1, speed: 1.0, size: 0.11, emissive: '#22C55E' },
  { name: 'Guru (Jupiter)', color: '#FACC15', radius: 3.6, speed: 0.4, size: 0.22, emissive: '#D4AF37' },
  { name: 'Shukra (Venus)', color: '#F472B6', radius: 4.1, speed: 0.7, size: 0.15, emissive: '#EC4899' },
  { name: 'Shani (Saturn)', color: '#818CF8', radius: 4.7, speed: 0.25, size: 0.2, emissive: '#4F46E5', hasRings: true },
  { name: 'Rahu (North Node)', color: '#94A3B8', radius: 5.2, speed: -0.3, size: 0.13, emissive: '#475569' },
  { name: 'Ketu (South Node)', color: '#FB923C', radius: 5.6, speed: -0.3, size: 0.13, emissive: '#C2410C' },
];

// Rotating Planetary Ring Component
function PlanetaryOrb({ orb }: { orb: typeof NAVAGRAHA_ORBS[0] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * orb.speed + initialAngle;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * orb.radius;
      meshRef.current.position.z = Math.sin(t) * orb.radius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.15;
    }
  });

  return (
    <group>
      {/* Orbital Trail Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orb.radius - 0.015, orb.radius + 0.015, 64]} />
        <meshBasicMaterial color="#C5A059" opacity={0.15} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Orbiting Planet Orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[orb.size, 24, 24]} />
        <meshStandardMaterial
          color={orb.color}
          emissive={orb.emissive}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
        {orb.hasRings && (
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <ringGeometry args={[orb.size * 1.5, orb.size * 2.3, 32]} />
            <meshBasicMaterial color="#C5A059" opacity={0.5} transparent side={THREE.DoubleSide} />
          </mesh>
        )}
      </mesh>
    </group>
  );
}

// 3D Vedic House Pillar / Node
function HouseNode3D({
  house,
  isActive,
  onSelect,
}: {
  house: typeof HOUSES_CONFIG[0];
  isActive: boolean;
  onSelect: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const x = Math.cos(house.angle) * house.radius;
  const z = Math.sin(house.angle) * house.radius;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.rotation.y = t * 0.5;
      if (isActive) {
        meshRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.08);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={[x, 0, z]}>
      {/* House 3D Diamond / Octahedron Marker */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <octahedronGeometry args={[isActive ? 0.28 : 0.2, 0]} />
        <meshStandardMaterial
          color={isActive ? '#C5A059' : '#1E293B'}
          emissive={isActive ? '#C5A059' : '#0F172A'}
          emissiveIntensity={isActive ? 0.8 : 0.2}
          roughness={0.2}
          metalness={0.9}
          wireframe={!isActive}
        />
      </mesh>

      {/* Vertical Light Beam on Active */}
      {isActive && (
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.08, 1.2, 16]} />
          <meshBasicMaterial color="#C5A059" transparent opacity={0.4} />
        </mesh>
      )}

      {/* Floating 3D House Number */}
      <Html position={[0, 0.45, 0]} center distanceFactor={8}>
        <button
          onClick={onSelect}
          className={`px-2 py-0.5 rounded-full text-[10px] font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap ${
            isActive
              ? 'bg-[#C5A059] text-[#0F172A] shadow-lg shadow-[#C5A059]/50 scale-110'
              : 'bg-[#0F172A]/90 text-[#C5A059] border border-[#C5A059]/40 hover:border-[#C5A059] hover:scale-105'
          }`}
        >
          H{house.num}
        </button>
      </Html>
    </group>
  );
}

// 3D Kundli Grid Structure with Concentric Vedic Sacred Geometry
function SacredGeometryGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <group ref={gridRef}>
      {/* Inner Kundli Central Diamond in 3D */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
        <ringGeometry args={[1.5, 1.54, 4]} />
        <meshBasicMaterial color="#C5A059" opacity={0.7} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Outer Square Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.1, 2.14, 4]} />
        <meshBasicMaterial color="#C5A059" opacity={0.5} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Zodiac 12-Spoke Wheel */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.7, 2.73, 64]} />
        <meshBasicMaterial color="#C5A059" opacity={0.3} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Outer Cosmic Boundary Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 5.85, 96]} />
        <meshBasicMaterial color="#C5A059" opacity={0.2} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Golden Core Energy Sphere (Brahmsthan / Lagna Portal) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#C5A059"
          emissive="#C5A059"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

// Main 3D Canvas Scene
function Kundli3DScene({
  result,
  activeHouse,
  onSelectHouse,
}: {
  result: KundliResult;
  activeHouse: number;
  onSelectHouse: (num: number) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 3, 0]} intensity={1.5} color="#C5A059" distance={10} />
      <directionalLight position={[5, 8, 5]} intensity={0.8} color="#FFF" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4A90E2" />

      {/* Deep Space Background Particles */}
      <Stars radius={40} depth={50} count={2500} factor={3} saturation={0} fade speed={1} />

      {/* Sacred Geometry Foundation */}
      <SacredGeometryGrid />

      {/* 12 Vedic Houses */}
      {HOUSES_CONFIG.map((house) => (
        <HouseNode3D
          key={house.num}
          house={house}
          isActive={activeHouse === house.num}
          onSelect={() => onSelectHouse(house.num)}
        />
      ))}

      {/* 9 Navagraha Celestial Orbs */}
      {NAVAGRAHA_ORBS.map((orb) => (
        <PlanetaryOrb key={orb.name} orb={orb} />
      ))}

      {/* Gentle Orbit Controls for User Pan / Zoom */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        minDistance={3.5}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2 + 0.15}
        minPolarAngle={Math.PI / 6}
        autoRotate={false}
        dampingFactor={0.05}
      />
    </>
  );
}

export const CosmicSolarKundli3D: React.FC<CosmicSolarKundli3DProps> = ({
  result,
  activeHouse,
  onSelectHouse,
}) => {
  const [showControlsHint, setShowControlsHint] = useState(true);
  const currentHouse = HOUSES_CONFIG.find((h) => h.num === activeHouse) || HOUSES_CONFIG[0];

  return (
    <div className="relative w-full rounded-3xl bg-[#0F172A] border border-[#C5A059]/40 shadow-2xl overflow-hidden flex flex-col">
      {/* Top Status Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#1E293B]/90 backdrop-blur border-b border-[#334155] z-10">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-ping" />
          <span className="text-xs font-cinzel font-semibold text-white tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            3D Vedic Kundli & Navagraha Solar Matrix
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest hidden sm:inline-block">
            Lagna: <strong className="text-[#C5A059]">{result.ascendant.split(' ')[0]}</strong>
          </span>
          <span className="text-[10px] text-[#0F172A] bg-[#C5A059] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Live 3D WebGL
          </span>
        </div>
      </div>

      {/* Three.js R3F Canvas Container / Safe Fallback */}
      <div className="relative w-full h-[380px] sm:h-[440px] bg-[#0A0F1D] cursor-grab active:cursor-grabbing">
        <WebGLErrorBoundary
          title="3D Vedic Kundli & Navagraha Solar Matrix"
          fallback={
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-[#C5A059]/40 bg-[#0F172A]/80 p-4 flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-dashed border-[#C5A059]/50 relative flex items-center justify-center animate-spin-slow" style={{ animationDuration: '30s' }}>
                  {HOUSES_CONFIG.map((h) => {
                    const isSelected = h.num === activeHouse;
                    return (
                      <button
                        key={h.num}
                        onClick={() => onSelectHouse(h.num)}
                        className={`absolute w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C5A059] text-[#0F172A] scale-125 ring-2 ring-white shadow-lg'
                            : 'bg-[#1E293B] text-amber-200 hover:bg-[#334155]'
                        }`}
                        style={{
                          transform: `rotate(${h.angle}rad) translateY(-100px) rotate(${-h.angle}rad)`,
                        }}
                      >
                        {h.num}
                      </button>
                    );
                  })}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-white shadow-lg font-cinzel font-bold text-xs">
                    Sun
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-[#C5A059]">
                Selected House {activeHouse}: {currentHouse.name} ({currentHouse.label})
              </div>
            </div>
          }
        >
          {isWebGLAvailable() ? (
            <Canvas
              camera={{ position: [0, 6, 6], fov: 45 }}
              gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
              <Kundli3DScene
                result={result}
                activeHouse={activeHouse}
                onSelectHouse={onSelectHouse}
              />
            </Canvas>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-[#C5A059]/40 bg-[#0F172A]/80 p-4 flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-dashed border-[#C5A059]/50 relative flex items-center justify-center animate-spin-slow" style={{ animationDuration: '30s' }}>
                  {HOUSES_CONFIG.map((h) => {
                    const isSelected = h.num === activeHouse;
                    return (
                      <button
                        key={h.num}
                        onClick={() => onSelectHouse(h.num)}
                        className={`absolute w-7 h-7 rounded-full text-[10px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C5A059] text-[#0F172A] scale-125 ring-2 ring-white shadow-lg'
                            : 'bg-[#1E293B] text-amber-200 hover:bg-[#334155]'
                        }`}
                        style={{
                          transform: `rotate(${h.angle}rad) translateY(-100px) rotate(${-h.angle}rad)`,
                        }}
                      >
                        {h.num}
                      </button>
                    );
                  })}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-white shadow-lg font-cinzel font-bold text-xs">
                    Sun
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-[#C5A059]">
                Selected House {activeHouse}: {currentHouse.name} ({currentHouse.label})
              </div>
            </div>
          )}
        </WebGLErrorBoundary>

        {/* Floating User Controls Hint Overlay */}
        {showControlsHint && (
          <div className="absolute top-4 left-4 bg-[#0F172A]/85 backdrop-blur border border-[#334155] rounded-xl px-3 py-2 text-[11px] text-[#94A3B8] flex items-center justify-between gap-3 shadow-lg pointer-events-auto">
            <div className="flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-[#C5A059] animate-spin" style={{ animationDuration: '8s' }} />
              <span>Drag to rotate &bull; Pinch/Scroll to zoom &bull; Click houses to inspect</span>
            </div>
            <button
              onClick={() => setShowControlsHint(false)}
              className="text-[#94A3B8] hover:text-white text-xs ml-1 cursor-pointer"
            >
              &times;
            </button>
          </div>
        )}

        {/* Selected House HUD Badge in 3D Viewport */}
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-[#1E293B]/90 backdrop-blur border border-[#C5A059]/50 rounded-2xl p-3.5 shadow-2xl max-w-sm pointer-events-auto">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#C5A059] text-[#0F172A] font-bold text-[10px] flex items-center justify-center font-cinzel">
                {currentHouse.num}
              </span>
              <h4 className="font-cinzel text-xs font-semibold text-white">
                {currentHouse.name}
              </h4>
            </div>
            <span className="text-[9px] font-mono text-[#C5A059] uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-[#C5A059]/20">
              {currentHouse.planet}
            </span>
          </div>

          <p className="text-[11px] text-[#94A3B8] font-light leading-snug">
            <strong>Key Domain:</strong> {currentHouse.label} &bull; Ruler: {currentHouse.deity}
          </p>
        </div>
      </div>

      {/* House Quick Selector Strip */}
      <div className="p-3 bg-[#0F172A] border-t border-[#334155] flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-[#94A3B8] uppercase tracking-widest pl-1 font-semibold flex-shrink-0">
          Jump to Bhava:
        </span>
        <div className="flex items-center gap-1.5 min-w-max">
          {HOUSES_CONFIG.map((h) => (
            <button
              key={h.num}
              onClick={() => onSelectHouse(h.num)}
              className={`px-2.5 py-1 rounded-lg text-xs font-cinzel transition-all cursor-pointer ${
                activeHouse === h.num
                  ? 'bg-[#C5A059] text-[#0F172A] font-bold shadow'
                  : 'bg-[#1E293B] text-[#94A3B8] hover:text-white hover:border-[#C5A059]/40 border border-[#334155]'
              }`}
            >
              H{h.num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
