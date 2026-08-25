import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { VastuZone } from '../../types';
import { Compass, Camera, Smartphone, AlertTriangle, Crosshair, Sparkles, RotateCw, Check } from 'lucide-react';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import { isWebGLAvailable } from '../../utils/webglDetect';

interface VastuCompass3DProps {
  zones: VastuZone[];
  selectedZone: VastuZone;
  onSelectZone: (zone: VastuZone) => void;
  compassAngle: number;
}

// 16 Directional Points with Vedic Deities and Harmonized Brand Elements
const ZONES_3D_CONFIG = [
  { name: 'N (North)', short: 'N', angle: 0, ruler: 'Lord Kubera', element: 'Water (जल)', color: '#38BDF8', tag: 'Wealth' },
  { name: 'NNE', short: 'NNE', angle: 22.5, ruler: 'Dhanvantari', element: 'Water (जल)', color: '#38BDF8', tag: 'Healing' },
  { name: 'NE (Ishanya)', short: 'NE', angle: 45, ruler: 'Lord Shiva', element: 'Water (जल)', color: '#67E8F9', tag: 'Clarity' },
  { name: 'ENE', short: 'ENE', angle: 67.5, ruler: 'Surya', element: 'Air (वायु)', color: '#34D399', tag: 'Joy' },
  { name: 'E (East)', short: 'E', angle: 90, ruler: 'Lord Indra', element: 'Air (वायु)', color: '#10B981', tag: 'Social' },
  { name: 'ESE', short: 'ESE', angle: 112.5, ruler: 'Pavitra', element: 'Air (वायु)', color: '#34D399', tag: 'Analysis' },
  { name: 'SE (Agneya)', short: 'SE', angle: 135, ruler: 'Lord Agni', element: 'Fire (अग्नि)', color: '#FB923C', tag: 'Cash Flow' },
  { name: 'SSE', short: 'SSE', angle: 157.5, ruler: 'Pusha', element: 'Fire (अग्नि)', color: '#F97316', tag: 'Power' },
  { name: 'S (South)', short: 'S', angle: 180, ruler: 'Lord Yama', element: 'Fire (अग्नि)', color: '#EA580C', tag: 'Fame' },
  { name: 'SSW', short: 'SSW', angle: 202.5, ruler: 'Dauvarika', element: 'Earth (पृथ्वी)', color: '#FBBF24', tag: 'Expenditure' },
  { name: 'SW (Nairutya)', short: 'SW', angle: 225, ruler: 'Pitris (Nirriti)', element: 'Earth (पृथ्वी)', color: '#F59E0B', tag: 'Stability' },
  { name: 'WSW', short: 'WSW', angle: 247.5, ruler: 'Sugriva', element: 'Earth (पृथ्वी)', color: '#FBBF24', tag: 'Knowledge' },
  { name: 'W (West)', short: 'W', angle: 270, ruler: 'Lord Varuna', element: 'Space (आकाश)', color: '#A78BFA', tag: 'Profits' },
  { name: 'WNW', short: 'WNW', angle: 292.5, ruler: 'Asura', element: 'Space (आकाश)', color: '#C084FC', tag: 'Detox' },
  { name: 'NW (Vayavya)', short: 'NW', angle: 315, ruler: 'Lord Vayu', element: 'Air (वायु)', color: '#34D399', tag: 'Support' },
  { name: 'NNW', short: 'NNW', angle: 337.5, ruler: 'Bhallaat', element: 'Water (जल)', color: '#38BDF8', tag: 'Attraction' },
];

// 3D Rotating Compass Dial Model with Authentic Vedic Brand Colors
function CompassModel3D({
  targetBearing,
  selectedZoneAngle,
  onSelectAngle,
}: {
  targetBearing: number;
  selectedZoneAngle: number;
  onSelectAngle: (angle: number) => void;
}) {
  const needleRef = useRef<THREE.Group>(null);

  // Smooth damp rotation towards target bearing
  useFrame((_state, delta) => {
    if (needleRef.current) {
      const targetRad = THREE.MathUtils.degToRad(-targetBearing);
      needleRef.current.rotation.y = THREE.MathUtils.damp(
        needleRef.current.rotation.y,
        targetRad,
        4.5,
        delta
      );
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Polished Terracotta / Bronze Bezel */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.75, 3.15, 64]} />
        <meshStandardMaterial
          color="#431407"
          metalness={0.85}
          roughness={0.25}
          emissive="#7C2D12"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* 24K Gold Inner Bezel Trim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.6, 2.72, 64]} />
        <meshStandardMaterial
          color="#F59E0B"
          metalness={0.95}
          roughness={0.1}
          emissive="#F59E0B"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Sacred Dial Face Plate in Warm Deep Terracotta */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.6, 64]} />
        <meshStandardMaterial
          color="#2A0800"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Outer Concentric Sacred Geometry Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.35, 2.38, 64]} />
        <meshBasicMaterial color="#F59E0B" opacity={0.6} transparent />
      </mesh>

      {/* Inner Mandala Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 1.53, 64]} />
        <meshBasicMaterial color="#F97316" opacity={0.5} transparent />
      </mesh>

      {/* Center 8-Ray Star / Lotus Geometry */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.72, 32]} />
        <meshBasicMaterial color="#FBBF24" opacity={0.4} transparent />
      </mesh>

      {/* Center 24K Solid Gold Pivot */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.18, 32]} />
        <meshStandardMaterial
          color="#F59E0B"
          metalness={0.95}
          roughness={0.1}
          emissive="#D97706"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#EA580C" emissive="#F97316" emissiveIntensity={0.6} />
      </mesh>

      {/* 16 Directional Node Markers & Interactive Labels */}
      {ZONES_3D_CONFIG.map((z) => {
        const rad = THREE.MathUtils.degToRad(z.angle - 90);
        const radius = 2.05;
        const posX = Math.cos(rad) * radius;
        const posZ = Math.sin(rad) * radius;
        const isSelected = Math.abs(selectedZoneAngle - z.angle) < 6;

        return (
          <group key={z.name} position={[posX, 0.06, posZ]}>
            {/* Clickable Node Gem */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectAngle(z.angle);
              }}
            >
              <sphereGeometry args={[isSelected ? 0.12 : 0.065, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#F59E0B' : z.color}
                emissive={isSelected ? '#F59E0B' : z.color}
                emissiveIntensity={isSelected ? 1.2 : 0.5}
                metalness={0.8}
              />
            </mesh>

            {/* Interactive Direction HTML Tag */}
            <Html position={[0, 0.18, 0]} center distanceFactor={7.5}>
              <button
                onClick={() => onSelectAngle(z.angle)}
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all cursor-pointer whitespace-nowrap shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white scale-125 shadow-lg shadow-orange-500/60 ring-2 ring-amber-300'
                    : 'bg-[#431407]/90 text-orange-200 hover:text-white hover:bg-[#7C2D12] hover:scale-110 border border-orange-500/30'
                }`}
              >
                {z.short}
              </button>
            </Html>
          </group>
        );
      })}

      {/* Dynamic 3D Magnetic Needle */}
      <group ref={needleRef}>
        {/* North Pointer: Radiant Saffron-Red with Gold Edge */}
        <mesh position={[0, 0.09, -1.05]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.16, 1.9, 4]} />
          <meshStandardMaterial
            color="#EA580C"
            emissive="#F97316"
            emissiveIntensity={0.8}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        {/* South Pointer: Antique Brass & Dark Bronze */}
        <mesh position={[0, 0.09, 1.05]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.16, 1.9, 4]} />
          <meshStandardMaterial
            color="#D97706"
            emissive="#7C2D12"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

// 3D Scene Container with Warm Celestial Lighting
function Vastu3DScene({
  targetBearing,
  selectedZoneAngle,
  onSelectAngle,
}: {
  targetBearing: number;
  selectedZoneAngle: number;
  onSelectAngle: (ang: number) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.9} color="#FFEAD5" />
      <directionalLight position={[4, 8, 4]} intensity={1.8} color="#FFF7ED" />
      <pointLight position={[0, 3, 0]} intensity={1.6} color="#F59E0B" distance={9} />
      <pointLight position={[-3, -2, -3]} intensity={0.8} color="#F97316" />

      {/* Floating 3D Vastu Compass */}
      <Float speed={1.8} rotationIntensity={0.06} floatIntensity={0.18}>
        <CompassModel3D
          targetBearing={targetBearing}
          selectedZoneAngle={selectedZoneAngle}
          onSelectAngle={onSelectAngle}
        />
      </Float>

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3.2}
        maxDistance={8.5}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 8}
      />
    </>
  );
}

export const VastuCompass3D: React.FC<VastuCompass3DProps> = ({
  zones,
  selectedZone,
  onSelectZone,
  compassAngle,
}) => {
  const [isSensorActive, setIsSensorActive] = useState(false);
  const [deviceHeading, setDeviceHeading] = useState(compassAngle);
  const [isARCameraActive, setIsARCameraActive] = useState(false);
  const [hasCameraError, setHasCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const directionAnglesMap: Record<string, number> = {
    'North (उत्तर - Kuber)': 0,
    'North-North-East (NNE)': 22.5,
    'North-East (ईशान - Ishanya)': 45,
    'East-North-East (ENE)': 67.5,
    'East (पूर्व - Indra)': 90,
    'East-South-East (ESE)': 112.5,
    'South-East (आग्नेय - Agneya)': 135,
    'South-South-East (SSE)': 157.5,
    'South (दक्षिण - Yama)': 180,
    'South-South-West (SSW)': 202.5,
    'South-West (नैऋत्य - Nairutya)': 225,
    'West-South-West (WSW)': 247.5,
    'West (पश्चिम - Varuna)': 270,
    'West-North-West (WNW)': 292.5,
    'North-West (वायव्य - Vayavya)': 315,
    'North-North-West (NNW)': 337.5,
    'Center (ब्रह्मस्थान - Brahmasthan)': 0
  };

  // Device orientation listener for mobile users moving with phone
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // @ts-ignore
      const heading = e.webkitCompassHeading !== undefined ? e.webkitCompassHeading : (360 - (e.alpha || 0));
      if (heading !== undefined && !isNaN(heading)) {
        setDeviceHeading(Math.round(heading));
        const matched = zones.reduce((prev, curr) => {
          const prevDiff = Math.abs((directionAnglesMap[prev.direction] || 0) - heading);
          const currDiff = Math.abs((directionAnglesMap[curr.direction] || 0) - heading);
          return currDiff < prevDiff ? curr : prev;
        });
        if (matched && matched.id !== selectedZone.id) {
          onSelectZone(matched);
        }
      }
    };

    if (isSensorActive && typeof window !== 'undefined') {
      window.addEventListener('deviceorientation', handleOrientation, true);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation, true);
      }
    };
  }, [isSensorActive, zones, selectedZone, onSelectZone]);

  const handleToggleSensor = async () => {
    if (!isSensorActive) {
      // @ts-ignore
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          // @ts-ignore
          const perm = await DeviceOrientationEvent.requestPermission();
          if (perm === 'granted') {
            setIsSensorActive(true);
          } else {
            alert('Sensor permission denied. You can still tap any zone to rotate the 3D compass.');
          }
        } catch {
          setIsSensorActive(true);
        }
      } else {
        setIsSensorActive(true);
      }
    } else {
      setIsSensorActive(false);
    }
  };

  const handleToggleARCamera = async () => {
    if (!isARCameraActive) {
      setHasCameraError(null);
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setIsARCameraActive(true);
            setIsSensorActive(true);
          }
        } else {
          setHasCameraError('Camera access is not supported on this device/browser.');
        }
      } catch {
        setHasCameraError('Camera permission was denied. Interactive 3D mode is active.');
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsARCameraActive(false);
    }
  };

  const handleSelectAngle = (angle: number) => {
    setDeviceHeading(angle);
    const matched = zones.find((z) => (directionAnglesMap[z.direction] || 0) === angle);
    if (matched) {
      onSelectZone(matched);
    }
  };

  const currentBearing = isSensorActive ? deviceHeading : (directionAnglesMap[selectedZone.direction] || 0);

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#2A0800] via-[#380E02] to-[#1E0600] border border-orange-500/30 shadow-2xl overflow-hidden flex flex-col mb-8 text-white select-none">
      
      {/* Top Header Bar matching Brand Terracotta & Gold */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#431407]/90 backdrop-blur-md border-b border-orange-500/25 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-amber-300">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <h3 className="font-playfair text-sm sm:text-base font-bold text-amber-100 flex items-center gap-1.5 leading-tight">
              3D Vedic Spatial Compass &bull; 16-Zone Grid
            </h3>
            <p className="text-[10px] text-orange-200/80">Interactive Vastu Purusha Alignment</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Gyro Sensor Sync Button */}
          <button
            onClick={handleToggleSensor}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isSensorActive
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/30'
                : 'bg-orange-950/70 border border-orange-500/30 text-orange-200 hover:text-white hover:bg-orange-900/80'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-300" />
            <span>{isSensorActive ? 'Gyro Synced' : 'Sync Phone Gyro'}</span>
          </button>

          {/* AR Camera Mode */}
          <button
            onClick={handleToggleARCamera}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isARCameraActive
                ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-bold shadow-lg shadow-orange-500/30'
                : 'bg-orange-950/70 border border-orange-500/30 text-amber-300 hover:bg-orange-900/80'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{isARCameraActive ? 'Exit AR' : 'AR View'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Stage */}
      <div className="relative w-full h-[380px] sm:h-[440px] bg-gradient-to-b from-[#1F0500] to-[#120300] cursor-grab active:cursor-grabbing overflow-hidden">
        
        {/* AR Live Camera Video Feed (When active) */}
        {isARCameraActive && (
          <video
            ref={videoRef}
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover z-0 filter brightness-90 contrast-105"
          />
        )}

        {/* 3D WebGL Canvas Layer / Safe Fallback */}
        <div className="relative w-full h-full z-10">
          <WebGLErrorBoundary
            title="Vedic Vastu Shastra Compass"
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#1F0500] to-[#120300] text-amber-100">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-amber-500/40 bg-orange-950/40 p-4 shadow-2xl flex items-center justify-center">
                  {/* Rotating Dial */}
                  <div
                    className="w-full h-full rounded-full border-2 border-dashed border-amber-400/50 relative transition-transform duration-500 ease-out flex items-center justify-center"
                    style={{ transform: `rotate(${-currentBearing}deg)` }}
                  >
                    {/* 16 Cardinal Marks */}
                    {ZONES_3D_CONFIG.map((z) => (
                      <button
                        key={z.name}
                        onClick={() => handleSelectAngle(z.angle)}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-amber-300 hover:text-white cursor-pointer"
                        style={{
                          transformOrigin: 'bottom center',
                          transform: `rotate(${z.angle}deg) translateY(-95px)`,
                        }}
                      >
                        {z.short}
                      </button>
                    ))}
                    {/* Central Magnetic Needle */}
                    <div className="w-1.5 h-36 bg-gradient-to-t from-orange-600 via-amber-400 to-red-500 rounded-full shadow-lg relative flex flex-col justify-between items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full ring-2 ring-white shadow" />
                      <div className="w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white shadow" />
                    </div>
                  </div>
                  {/* Center Pivot */}
                  <div className="absolute w-8 h-8 rounded-full bg-amber-400 text-orange-950 flex items-center justify-center font-bold text-xs shadow-md">
                    <Compass className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-300/80">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Bearing: {Math.round(currentBearing)}° &bull; Active: {selectedZone.direction.split('(')[0]}</span>
                </div>
              </div>
            }
          >
            {isWebGLAvailable() ? (
              <Canvas
                camera={{ position: [0, 4.6, 3.6], fov: 48 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              >
                <Vastu3DScene
                  targetBearing={currentBearing}
                  selectedZoneAngle={directionAnglesMap[selectedZone.direction] || 0}
                  onSelectAngle={handleSelectAngle}
                />
              </Canvas>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#1F0500] to-[#120300] text-amber-100">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-amber-500/40 bg-orange-950/40 p-4 shadow-2xl flex items-center justify-center">
                  <div
                    className="w-full h-full rounded-full border-2 border-dashed border-amber-400/50 relative transition-transform duration-500 ease-out flex items-center justify-center"
                    style={{ transform: `rotate(${-currentBearing}deg)` }}
                  >
                    {ZONES_3D_CONFIG.map((z) => (
                      <button
                        key={z.name}
                        onClick={() => handleSelectAngle(z.angle)}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold text-amber-300 hover:text-white cursor-pointer"
                        style={{
                          transformOrigin: 'bottom center',
                          transform: `rotate(${z.angle}deg) translateY(-95px)`,
                        }}
                      >
                        {z.short}
                      </button>
                    ))}
                    <div className="w-1.5 h-36 bg-gradient-to-t from-orange-600 via-amber-400 to-red-500 rounded-full shadow-lg relative flex flex-col justify-between items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full ring-2 ring-white shadow" />
                      <div className="w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white shadow" />
                    </div>
                  </div>
                  <div className="absolute w-8 h-8 rounded-full bg-amber-400 text-orange-950 flex items-center justify-center font-bold text-xs shadow-md">
                    <Compass className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-amber-300/80">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Bearing: {Math.round(currentBearing)}° &bull; Active: {selectedZone.direction.split('(')[0]}</span>
                </div>
              </div>
            )}
          </WebGLErrorBoundary>
        </div>

        {/* AR Reticle / Crosshair HUD */}
        {isARCameraActive && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-15">
            <div className="relative w-36 h-36 border-2 border-dashed border-amber-400/80 rounded-full flex items-center justify-center animate-pulse">
              <Crosshair className="w-8 h-8 text-amber-300" />
              <span className="absolute -bottom-6 text-[9px] font-mono tracking-widest text-amber-200 uppercase bg-black/70 px-2.5 py-0.5 rounded-full border border-orange-500/40">
                Aligning Space Vector
              </span>
            </div>
          </div>
        )}

        {/* Live Direction HUD Floating Card */}
        <div className="absolute top-4 left-4 bg-[#3B0E02]/90 backdrop-blur-xl border border-orange-400/40 rounded-2xl p-3.5 shadow-2xl z-20 pointer-events-auto max-w-[220px]">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-md bg-orange-500/20 flex items-center justify-center text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h4 className="font-playfair text-xs font-bold text-white truncate">
              {selectedZone.direction.split('(')[0]}
            </h4>
          </div>
          <div className="text-[11px] text-orange-200/90 space-y-0.5">
            <p><span className="text-orange-300/70">Ruler:</span> <strong className="text-white">{selectedZone.ruler}</strong></p>
            <p><span className="text-orange-300/70">Bearing:</span> <strong className="text-amber-300">{directionAnglesMap[selectedZone.direction] || 0}°</strong></p>
            <p><span className="text-orange-300/70">Element:</span> <strong className="text-amber-200">{selectedZone.element}</strong></p>
          </div>
        </div>

        {/* Simple Drag Hint Indicator */}
        <div className="absolute bottom-3 right-3 bg-[#3B0E02]/80 backdrop-blur-md border border-orange-500/30 rounded-xl px-2.5 py-1 text-[10px] text-orange-200/80 pointer-events-none z-20 flex items-center gap-1.5">
          <RotateCw className="w-3 h-3 text-amber-300 animate-spin-slow" />
          <span>Drag 3D to rotate • Tap nodes to select</span>
        </div>

        {/* Camera Permission Alert */}
        {hasCameraError && (
          <div className="absolute bottom-4 left-4 right-4 bg-red-950/95 border border-red-500/50 p-3 rounded-xl text-xs text-red-200 z-20 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{hasCameraError}</span>
          </div>
        )}
      </div>

      {/* Bottom Bar: Simplified 16 Cardinal Presets in Brand Color Scheme */}
      <div className="p-3 bg-[#2D0900] border-t border-orange-500/25 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-amber-300 uppercase tracking-widest font-bold pl-1 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Presets:
        </span>
        <div className="flex items-center gap-1.5 min-w-max">
          {zones.map((z) => {
            const isSelected = z.id === selectedZone.id;
            return (
              <button
                key={z.id}
                onClick={() => onSelectZone(z)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-md shadow-orange-500/40 ring-1 ring-amber-300'
                    : 'bg-orange-950/60 border border-orange-500/20 text-orange-200 hover:text-white hover:bg-orange-900/60'
                }`}
              >
                {z.direction.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
