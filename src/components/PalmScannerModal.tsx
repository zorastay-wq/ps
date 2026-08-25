import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Camera, 
  Upload, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Heart, 
  Brain, 
  Compass, 
  Flame, 
  Calendar, 
  Download, 
  Lock,
  Hand,
  ArrowRight,
  User,
  Clock,
  Sliders,
  ChevronRight,
  Star,
  Activity,
  Layers,
  Award,
  BookOpen
} from 'lucide-react';
import { DOCTOR_INFO } from '../data/brandData';
import { useUserProfile } from '../context/UserProfileContext';
import { useToast } from '../context/ToastContext';
import { db, auth } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { HandLandmark, HandValidationResult, validateOpenPalm } from '../utils/handDetection';
import { analyzeHandFrame, getHandsDetector, loadMediaPipeHandsScript } from '../utils/mediapipeService';
import { calculateAstroNumerology, AstroNumerologyProfile } from '../utils/astroNumerology';

export interface PalmLineDetail {
  name: string;
  hindi_name?: string;
  trajectory: string;
  vitality_score?: number;
  longevity_indicator?: string;
  emotional_stability?: string;
  relationship_guidance?: string;
  intellect_type?: string;
  focus_clarity?: string;
  career_trajectory?: string;
  financial_breakthroughs?: string;
  key_milestones?: string;
  vedic_significance: string;
}

export interface MountDetail {
  name: string;
  strength: string;
  attribute: string;
}

export interface AstroNumerologyData {
  dob?: string;
  mulank: number;
  bhagyank: number;
  ruling_planet: string;
  element: string;
  karmic_vibration: string;
}

export interface VedicSynthesisData {
  headline: string;
  core_narrative: string;
  current_chapter_advice: string;
}

export interface PalmScanReading {
  success: boolean;
  confidence_score: number;
  clarity_score: number;
  palm_type: string;
  hand_analyzed: string;
  astro_numerology?: AstroNumerologyData;
  biometrics?: {
    aspect_ratio?: number;
    crease_density?: number;
    primary_crease_depth?: number;
  };
  life_line: PalmLineDetail;
  heart_line: PalmLineDetail;
  head_line: PalmLineDetail;
  fate_line: PalmLineDetail;
  vedic_synthesis?: VedicSynthesisData;
  mounts: MountDetail[];
  lal_kitab_upays: string[];
  consultation_recommendation: string;
}

interface PalmScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (serviceId?: string) => void;
}

const SCAN_MICRO_STEPS = [
  'Extracting Life Path topology & Palmar creases...',
  'Analyzing Mount of Jupiter & Venus elevations...',
  'Calculating DOB Numerological resonance...',
  'Synthesizing Karmic intersections & Lal Kitab Upays...'
];

// Landmark connections for MediaPipe Hand Skeleton Rendering
const SKELETON_CONNECTIONS: [number, number][] = [
  // Thumb
  [0, 1], [1, 2], [2, 3], [3, 4],
  // Index finger
  [0, 5], [5, 6], [6, 7], [7, 8],
  // Middle finger
  [0, 9], [9, 10], [10, 11], [11, 12],
  // Ring finger
  [0, 13], [13, 14], [14, 15], [15, 16],
  // Pinky
  [0, 17], [17, 18], [18, 19], [19, 20],
  // Palm base connection
  [5, 9], [9, 13], [13, 17]
];

export const PalmScannerModal: React.FC<PalmScannerModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const { profile, hasCustomProfile } = useUserProfile();
  const { showPalmSuccess, showReadingComplete, showError } = useToast();
  
  // High-Level Step: 'calibration' -> 'scanner' -> 'results'
  const [currentStep, setCurrentStep] = useState<'calibration' | 'scanner' | 'results'>('calibration');
  
  // Demographics / Calibration State
  const [name, setName] = useState<string>(profile?.fullName || '');
  const [dob, setDob] = useState<string>(profile?.dob || '1995-06-18');
  const [timeOfBirth, setTimeOfBirth] = useState<string>(profile?.tob || '10:30');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(profile?.gender || 'male');
  const [selectedHand, setSelectedHand] = useState<'right' | 'left'>('right');

  // Live Computed Numerology Profile during calibration
  const [liveNumerology, setLiveNumerology] = useState<AstroNumerologyProfile>(() => calculateAstroNumerology(profile?.dob || '1995-06-18'));

  useEffect(() => {
    setLiveNumerology(calculateAstroNumerology(dob));
  }, [dob]);

  // Sync profile when opened
  useEffect(() => {
    if (isOpen) {
      if (profile?.dob) setDob(profile.dob);
      if (profile?.fullName) setName(profile.fullName);
      if (profile?.gender) setGender(profile.gender);
      if (profile?.tob) setTimeOfBirth(profile.tob);
    }
  }, [isOpen, profile]);

  const [mode, setMode] = useState<'camera' | 'upload'>('camera');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStepIndex, setScanStepIndex] = useState<number>(0);
  const [reading, setReading] = useState<PalmScanReading | null>(null);
  const [activeTab, setActiveTab] = useState<'lines' | 'synthesis' | 'mounts' | 'upays'>('synthesis');

  // Real Biometric Validation & 3-Second Stability State
  const [validationResult, setValidationResult] = useState<HandValidationResult>({
    isHandDetected: false,
    isOpenPalm: false,
    status: 'no_hand',
    extendedFingers: { thumb: false, index: false, middle: false, ring: false, pinky: false },
    extendedCount: 0,
    message: '⚠️ Invalid Scan: Please show a clear, open palm to the camera.',
    confidence: 0
  });

  const [holdProgressMs, setHoldProgressMs] = useState<number>(0);
  const [isCvReady, setIsCvReady] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isCheckingUpload, setIsCheckingUpload] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hudCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const captureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const selectedHandRef = useRef<'right' | 'left'>('right');
  const latestValidationRef = useRef<HandValidationResult>(validationResult);
  const consecutiveOpenPalmMsRef = useRef<number>(0);
  const lastDetectionTimeRef = useRef<number>(0);
  const isProcessingFrameRef = useRef<boolean>(false);
  const hasTriggeredCaptureRef = useRef<boolean>(false);

  // Keep selectedHandRef in sync with state
  useEffect(() => {
    selectedHandRef.current = selectedHand;
  }, [selectedHand]);

  // Pre-load MediaPipe script when modal opens
  useEffect(() => {
    if (isOpen) {
      loadMediaPipeHandsScript()
        .then(() => getHandsDetector())
        .then(() => setIsCvReady(true))
        .catch((err) => {
          console.warn('MediaPipe preloading notice:', err);
          setIsCvReady(true);
        });
    }
  }, [isOpen]);

  // Stop Camera cleanly
  const stopCamera = useCallback(() => {
    if (animFrameIdRef.current !== null) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    consecutiveOpenPalmMsRef.current = 0;
    setHoldProgressMs(0);
    hasTriggeredCaptureRef.current = false;
  }, []);

  // Frame processing and HUD animation loop
  const startHudAnimation = useCallback(() => {
    if (animFrameIdRef.current !== null) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }

    const startTime = performance.now();
    let lastRenderTime = startTime;
    hasTriggeredCaptureRef.current = false;
    consecutiveOpenPalmMsRef.current = 0;

    const renderLoop = async (now: number) => {
      lastRenderTime = now;

      const video = videoRef.current;
      const canvas = hudCanvasRef.current;

      // Real CV Video Frame Detection (Throttled to ~15-20 fps to preserve device performance)
      if (
        video &&
        video.readyState >= 2 &&
        !isProcessingFrameRef.current &&
        now - lastDetectionTimeRef.current > 65
      ) {
        isProcessingFrameRef.current = true;
        lastDetectionTimeRef.current = now;

        analyzeHandFrame(video)
          .then((res) => {
            latestValidationRef.current = res;
            setValidationResult(res);

            // ============================================================
            // 3-SECOND CONSECUTIVE HOLD BIOMETRIC LOCK
            // ============================================================
            if (res.isOpenPalm) {
              const newMs = Math.min(consecutiveOpenPalmMsRef.current + 85, 3000);
              consecutiveOpenPalmMsRef.current = newMs;
              setHoldProgressMs(newMs);

              if (newMs >= 3000 && !hasTriggeredCaptureRef.current) {
                hasTriggeredCaptureRef.current = true;
                setTimeout(() => {
                  handleCapture();
                }, 150);
              }
            } else {
              consecutiveOpenPalmMsRef.current = 0;
              setHoldProgressMs(0);
              hasTriggeredCaptureRef.current = false;
            }
          })
          .catch((err) => {
            console.warn('Frame validation error:', err);
          })
          .finally(() => {
            isProcessingFrameRef.current = false;
          });
      }

      if (!canvas) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;

      if (width > 0 && height > 0) {
        const targetW = Math.floor(width * dpr);
        const targetH = Math.floor(height * dpr);
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
        }
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const elapsed = (now - startTime) / 1000;
      const isLeftHand = selectedHandRef.current === 'left';
      const currentValidation = latestValidationRef.current;
      const detectedLandmarks = currentValidation.landmarks;
      const isOpen = currentValidation.isOpenPalm;
      const isHand = currentValidation.isHandDetected;

      const mapX = (x: number) => (isLeftHand ? 400 - x : x);

      // Center Coordinate transformation
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width / 400, height / 520) * 0.94;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);
      ctx.translate(-200, -255);

      // ================================================================
      // 1. ANATOMICALLY ACCURATE VEDIC GUIDE CONTOUR
      // ================================================================
      ctx.save();
      ctx.beginPath();
      
      if (isOpen) {
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.95)'; // Amber/Gold Glowing
        ctx.shadowColor = '#F59E0B';
        ctx.shadowBlur = 12;
      } else if (isHand) {
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.9)';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 8;
      } else {
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
        ctx.shadowColor = '#D97706';
        ctx.shadowBlur = 4;
      }

      ctx.lineWidth = 2.2;
      ctx.setLineDash([8, 5]);

      if (!isLeftHand) {
        ctx.moveTo(150, 445);
        ctx.bezierCurveTo(105, 410, 80, 360, 80, 355);
        ctx.bezierCurveTo(60, 305, 45, 255, 45, 250);
        ctx.bezierCurveTo(40, 215, 62, 205, 78, 220);
        ctx.bezierCurveTo(95, 245, 112, 272, 118, 275);
        ctx.bezierCurveTo(122, 275, 125, 245, 125, 235);
        ctx.lineTo(122, 140);
        ctx.bezierCurveTo(122, 95, 154, 95, 154, 140);
        ctx.lineTo(154, 195);
        ctx.bezierCurveTo(156, 205, 160, 205, 162, 195);
        ctx.lineTo(165, 115);
        ctx.bezierCurveTo(165, 55, 205, 55, 205, 115);
        ctx.lineTo(208, 195);
        ctx.bezierCurveTo(210, 205, 214, 205, 216, 195);
        ctx.lineTo(218, 125);
        ctx.bezierCurveTo(218, 75, 254, 75, 254, 125);
        ctx.lineTo(256, 200);
        ctx.bezierCurveTo(258, 210, 262, 210, 264, 205);
        ctx.lineTo(268, 160);
        ctx.bezierCurveTo(268, 120, 298, 120, 298, 160);
        ctx.lineTo(305, 230);
        ctx.bezierCurveTo(318, 280, 318, 345, 305, 400);
        ctx.bezierCurveTo(295, 430, 270, 442, 250, 445);
      } else {
        ctx.moveTo(mapX(150), 445);
        ctx.bezierCurveTo(mapX(105), 410, mapX(80), 360, mapX(80), 355);
        ctx.bezierCurveTo(mapX(60), 305, mapX(45), 255, mapX(45), 250);
        ctx.bezierCurveTo(mapX(40), 215, mapX(62), 205, mapX(78), 220);
        ctx.bezierCurveTo(mapX(95), 245, mapX(112), 272, mapX(118), 275);
        ctx.bezierCurveTo(mapX(122), 275, mapX(125), 245, mapX(125), 235);
        ctx.lineTo(mapX(122), 140);
        ctx.bezierCurveTo(mapX(122), 95, mapX(154), 95, mapX(154), 140);
        ctx.lineTo(mapX(154), 195);
        ctx.bezierCurveTo(mapX(156), 205, mapX(160), 205, mapX(162), 195);
        ctx.lineTo(mapX(165), 115);
        ctx.bezierCurveTo(mapX(165), 55, mapX(205), 55, mapX(205), 115);
        ctx.lineTo(mapX(208), 195);
        ctx.bezierCurveTo(mapX(210), 205, mapX(214), 205, mapX(216), 195);
        ctx.lineTo(mapX(218), 125);
        ctx.bezierCurveTo(mapX(218), 75, mapX(254), 75, mapX(254), 125);
        ctx.lineTo(mapX(256), 200);
        ctx.bezierCurveTo(mapX(258), 210, mapX(262), 210, mapX(264), 205);
        ctx.lineTo(mapX(268), 160);
        ctx.bezierCurveTo(mapX(268), 120, mapX(298), 120, mapX(298), 160);
        ctx.lineTo(mapX(305), 230);
        ctx.bezierCurveTo(mapX(318), 280, mapX(318), 345, mapX(305), 400);
        ctx.bezierCurveTo(mapX(295), 430, mapX(270), 442, mapX(250), 445);
      }
      ctx.stroke();
      ctx.restore();

      // ================================================================
      // 2. MANIBANDHA BRACELET LINES (Wrist Alignment)
      // ================================================================
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = isOpen ? '#FDE68A' : '#F59E0B';
      ctx.lineWidth = 1.8;
      [450, 460, 470].forEach((y, i) => {
        ctx.beginPath();
        ctx.moveTo(mapX(145 + i * 4), y);
        ctx.quadraticCurveTo(mapX(200), y + 6, mapX(255 - i * 4), y);
        ctx.stroke();
      });
      ctx.restore();

      // ================================================================
      // 3. REAL-TIME MEDIAPIPE BIOMETRIC SKELETON RENDER
      // ================================================================
      if (detectedLandmarks && detectedLandmarks.length >= 21) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = isOpen ? 'rgba(245, 158, 11, 0.9)' : 'rgba(239, 68, 68, 0.85)';
        ctx.shadowColor = isOpen ? '#F59E0B' : '#EF4444';
        ctx.shadowBlur = 8;

        SKELETON_CONNECTIONS.forEach(([i1, i2]) => {
          const p1 = detectedLandmarks[i1];
          const p2 = detectedLandmarks[i2];
          if (p1 && p2) {
            const x1 = p1.x * 400;
            const y1 = p1.y * 510;
            const x2 = p2.x * 400;
            const y2 = p2.y * 510;

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
        });
        ctx.stroke();

        // Draw Landmark Nodes
        detectedLandmarks.forEach((pt, idx) => {
          const px = pt.x * 400;
          const py = pt.y * 510;
          const isFingertip = [4, 8, 12, 16, 20].includes(idx);
          const isWrist = idx === 0;

          ctx.beginPath();
          ctx.arc(px, py, isFingertip ? 4.5 : isWrist ? 5.5 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isOpen ? '#FCD34D' : '#F87171';
          ctx.fill();

          if (isFingertip || isWrist) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        });
        ctx.restore();
      }

      // ================================================================
      // 4. AUTHENTIC VEDIC PALM LINES & NODAL TRACKING (HASTA REKHA)
      // ================================================================
      const drawLineLabel = (text: string, x: number, y: number, color: string, align: CanvasTextAlign = 'center') => {
        ctx.save();
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = align;
        ctx.fillStyle = color;
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = 4;
        ctx.fillText(text, x, y);
        ctx.restore();
      };

      // 4.1 Heart Line (Hridaya Rekha) - Cyan/Teal
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.lineWidth = 2.4;
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 8;
      ctx.moveTo(mapX(295), 260);
      ctx.bezierCurveTo(mapX(240), 255, mapX(180), 245, mapX(145), 215);
      ctx.stroke();
      drawLineLabel('Hridaya (Heart)', mapX(280), 248, '#7DD3FC', isLeftHand ? 'left' : 'right');
      ctx.restore();

      // 4.2 Head Line (Mastishka Rekha) - Emerald/Amber
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.88)';
      ctx.lineWidth = 2.4;
      ctx.shadowColor = '#FBBF24';
      ctx.shadowBlur = 8;
      ctx.moveTo(mapX(118), 275);
      ctx.bezierCurveTo(mapX(160), 280, mapX(230), 305, mapX(285), 340);
      ctx.stroke();
      drawLineLabel('Mastishka (Head)', mapX(210), 302, '#FDE68A');
      ctx.restore();

      // 4.3 Life Line (Jeevan Rekha) - Rose/Saffron
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.88)';
      ctx.lineWidth = 2.4;
      ctx.shadowColor = '#F43F5E';
      ctx.shadowBlur = 8;
      ctx.moveTo(mapX(118), 275);
      ctx.bezierCurveTo(mapX(135), 320, mapX(155), 380, mapX(195), 445);
      ctx.stroke();
      drawLineLabel('Jeevan (Life)', mapX(140), 370, '#FDA4AF', isLeftHand ? 'right' : 'left');
      ctx.restore();

      // 4.4 Fate Line (Bhagya Rekha) - Purple/Gold
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.85)';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#A855F7';
      ctx.shadowBlur = 8;
      ctx.moveTo(mapX(200), 445);
      ctx.bezierCurveTo(mapX(202), 370, mapX(200), 300, mapX(195), 215);
      ctx.stroke();
      drawLineLabel('Bhagya (Fate)', mapX(200), 345, '#D8B4FE');
      ctx.restore();

      // Mount Focal Crosshairs (Jupiter, Saturn, Sun, Mercury, Venus, Moon)
      const mounts = [
        { name: 'Guru (Jupiter)', x: mapX(145), y: 195, color: '#FCD34D' },
        { name: 'Shani (Saturn)', x: mapX(185), y: 185, color: '#C084FC' },
        { name: 'Surya (Sun)', x: mapX(235), y: 190, color: '#FDBA74' },
        { name: 'Budh (Mercury)', x: mapX(280), y: 215, color: '#6EE7B7' },
        { name: 'Shukra (Venus)', x: mapX(125), y: 350, color: '#F472B6' },
        { name: 'Chandra (Moon)', x: mapX(275), y: 390, color: '#93C5FD' }
      ];

      mounts.forEach(m => {
        ctx.save();
        ctx.strokeStyle = m.color;
        ctx.fillStyle = m.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(m.x, m.y, 4, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.restore(); // Restore center scale

      // ================================================================
      // 5. SWEEPING GLOWING SAFFRON/GOLD LASER BEAM OVERLAY
      // ================================================================
      const scanPeriod = 2.8; // seconds
      const scanPhase = (elapsed % scanPeriod) / scanPeriod;
      // Oscillate up and down smoothly
      const laserY = (Math.sin(scanPhase * Math.PI * 2 - Math.PI / 2) + 1) / 2 * height;

      ctx.save();
      const laserGrad = ctx.createLinearGradient(0, laserY - 14, 0, laserY + 14);
      laserGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
      laserGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.35)');
      laserGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
      laserGrad.addColorStop(0.65, 'rgba(234, 88, 12, 0.35)');
      laserGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');

      ctx.fillStyle = laserGrad;
      ctx.fillRect(0, laserY - 14, width, 28);

      // Core Laser Line
      ctx.beginPath();
      ctx.moveTo(0, laserY);
      ctx.lineTo(width, laserY);
      ctx.strokeStyle = '#FDE68A';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#F59E0B';
      ctx.shadowBlur = 14;
      ctx.stroke();

      // Cyber Coordinates & Telemetry Label
      ctx.font = '10px monospace';
      ctx.fillStyle = '#FDE68A';
      ctx.shadowBlur = 0;
      ctx.fillText(`CV_Y: ${Math.round(laserY)}px | TOPOLOGY: ACTIVE | STABILITY: ${((holdProgressMs / 3000) * 100).toFixed(0)}%`, 14, laserY > 24 ? laserY - 6 : laserY + 16);
      ctx.restore();

      // ================================================================
      // 6. HUD CORNER BRACKETS
      // ================================================================
      ctx.save();
      ctx.strokeStyle = isOpen ? '#F59E0B' : '#78350F';
      ctx.lineWidth = 3;
      const pad = 12;
      const len = 22;

      // Top Left
      ctx.beginPath();
      ctx.moveTo(pad, pad + len);
      ctx.lineTo(pad, pad);
      ctx.lineTo(pad + len, pad);
      ctx.stroke();

      // Top Right
      ctx.beginPath();
      ctx.moveTo(width - pad - len, pad);
      ctx.lineTo(width - pad, pad);
      ctx.lineTo(width - pad, pad + len);
      ctx.stroke();

      // Bottom Left
      ctx.beginPath();
      ctx.moveTo(pad, height - pad - len);
      ctx.lineTo(pad, height - pad);
      ctx.lineTo(pad + len, height - pad);
      ctx.stroke();

      // Bottom Right
      ctx.beginPath();
      ctx.moveTo(width - pad - len, height - pad);
      ctx.lineTo(width - pad, height - pad);
      ctx.lineTo(width - pad, height - pad - len);
      ctx.stroke();
      ctx.restore();

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);
  }, [holdProgressMs]);

  // Initialize Camera cleanly
  const startCamera = useCallback(async () => {
    setCameraError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by your browser.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(() => {});
        };
      }
      startHudAnimation();
    } catch (err: any) {
      console.warn('Camera initialization error:', err);
      let msg = 'Unable to access camera. Please allow camera permissions or upload a palm photo.';
      if (err.name === 'NotAllowedError') {
        msg = 'Camera permission was denied. Please enable camera access in your browser settings, or use the photo upload option below.';
      } else if (err.name === 'NotFoundError') {
        msg = 'No camera device found on this system. Please upload a photo of your palm.';
      }
      setCameraError(msg);
      setMode('upload');
    }
  }, [facingMode, stopCamera, startHudAnimation]);

  // Modal Open/Close & Step Lifecycle
  useEffect(() => {
    if (isOpen && currentStep === 'scanner' && mode === 'camera' && !capturedImage && !reading) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, currentStep, mode, facingMode, capturedImage, reading, startCamera, stopCamera]);

  // Scanning Step progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      setScanStepIndex(0);
      interval = setInterval(() => {
        setScanStepIndex(prev => (prev < SCAN_MICRO_STEPS.length - 1 ? prev + 1 : prev));
      }, 950);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  // Capture Frame from Video
  const handleCapture = () => {
    if (!latestValidationRef.current.isOpenPalm && consecutiveOpenPalmMsRef.current < 2500) {
      setValidationResult({
        ...latestValidationRef.current,
        isOpenPalm: false,
        message: '⚠️ Invalid Scan: Please show a clear, open palm to the camera.'
      });
      return;
    }

    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = captureCanvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setCapturedImage(dataUrl);
    stopCamera();
    submitScan(dataUrl);
  };

  // Handle File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    setUploadError(null);
    setIsCheckingUpload(true);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const img = new Image();
      img.onload = async () => {
        try {
          const detector = await getHandsDetector();
          if (detector) {
            const validation = await analyzeHandFrame(img);
            if (!validation.isHandDetected || !validation.isOpenPalm) {
              setUploadError('⚠️ Invalid Palm Photo: No clear open palm detected. Please upload an open palm photo facing the camera.');
              setIsCheckingUpload(false);
              return;
            }
          }
        } catch (cvErr) {
          console.warn('Image pre-check notice:', cvErr);
        }

        setIsCheckingUpload(false);
        setCapturedImage(result);
        submitScan(result);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  // Submit scan to backend with merged DOB Demographics Context
  const submitScan = async (base64Img: string) => {
    setIsScanning(true);
    setUploadError(null);

    try {
      const response = await fetch('/v1/scan-palm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Img,
          hand_preference: selectedHand,
          dob: dob,
          gender: gender,
          timeOfBirth: timeOfBirth,
          user_context: {
            name: name,
            dob: dob,
            gender: gender,
            timeOfBirth: timeOfBirth
          }
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || '⚠️ Invalid Scan: Unable to extract palmar lines.');
      }

      const data: PalmScanReading = await response.json();
      if (!data.success) {
        throw new Error('⚠️ Invalid Scan: Please show a clear, open palm.');
      }

      setReading(data);
      setCurrentStep('results');
      setActiveTab('synthesis');
      showPalmSuccess('Palm Lines & DOB Numerology Harmonized', 'Deep Vedic Biometric report generated.');

      // Save reading to Firebase Firestore if logged in
      if (auth.currentUser) {
        try {
          const scanRef = doc(db, 'users', auth.currentUser.uid, 'palm_scans', `scan_${Date.now()}`);
          await setDoc(scanRef, {
            ...data,
            timestamp: new Date().toISOString(),
            dobUsed: dob,
            genderUsed: gender
          });
        } catch (saveErr) {
          console.warn('Firestore palm scan save notice:', saveErr);
        }
      }
    } catch (err: any) {
      console.error('Scan submission error:', err);
      const errMsg = err.message || '⚠️ Invalid Scan: Please show a clear, open palm to the camera.';
      setUploadError(errMsg);
      showError('Palm Analysis Incomplete', errMsg);
      setCapturedImage(null);
      if (mode === 'camera') {
        startCamera();
      }
    } finally {
      setIsScanning(false);
    }
  };

  const handleReset = () => {
    setCapturedImage(null);
    setReading(null);
    setIsScanning(false);
    setUploadError(null);
    consecutiveOpenPalmMsRef.current = 0;
    setHoldProgressMs(0);
    hasTriggeredCaptureRef.current = false;
    setCurrentStep('calibration');
  };

  const handleToggleCamera = () => {
    setFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  const handleDownloadReport = () => {
    if (!reading) return;
    const reportText = `=====================================================
VEDIC HASTA REKHA SHASTRA - ASTRO-BIOMETRIC REPORT
CONSULTANCY OF DR. PREETI SEHGAL
Delhi Chambers | WhatsApp: +91 ${DOCTOR_INFO.whatsappNumber}
=====================================================
Analyzed Hand: ${reading.hand_analyzed}
Palm Type: ${reading.palm_type}
Date of Birth: ${dob} (Root / Mulank: ${liveNumerology.mulank}, Destiny / Bhagyank: ${liveNumerology.bhagyank})
Ruling Planet: ${liveNumerology.rulingPlanet} | Element: ${liveNumerology.element}
Biometric Accuracy Confidence: ${(reading.confidence_score * 100).toFixed(0)}%
Scan Generated: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}

VEDIC SYNTHESIS (DOB + PALMISTRY FUSION):
${reading.vedic_synthesis?.core_narrative || 'Harmonized analysis of palmar creases and numerological vibrations.'}
Chapter Guidance: ${reading.vedic_synthesis?.current_chapter_advice || 'Continue disciplined focus.'}

1. JEEVAN REKHA (LIFE LINE)
- Trajectory: ${reading.life_line.trajectory}
- Vitality Score: ${reading.life_line.vitality_score || 92}/100
- Longevity Indicator: ${reading.life_line.longevity_indicator || 'Strong physical stamina'}
- Milestones: ${reading.life_line.key_milestones || 'Steady progression'}
- Vedic Significance: ${reading.life_line.vedic_significance}

2. HRIDAYA REKHA (HEART LINE)
- Trajectory: ${reading.heart_line.trajectory}
- Emotional Nature: ${reading.heart_line.emotional_stability || 'Deeply empathetic & loyal'}
- Relationships: ${reading.heart_line.relationship_guidance || 'Harmonious'}
- Vedic Significance: ${reading.heart_line.vedic_significance}

3. MASTISHKA REKHA (HEAD LINE)
- Trajectory: ${reading.head_line.trajectory}
- Intellect: ${reading.head_line.intellect_type || 'Analytical & intuitive'}
- Mental Focus: ${reading.head_line.focus_clarity || 'Sharp decision-making'}
- Vedic Significance: ${reading.head_line.vedic_significance}

4. BHAGYA REKHA (FATE / SATURN LINE)
- Trajectory: ${reading.fate_line.trajectory}
- Career Path: ${reading.fate_line.career_trajectory || 'Self-earned success'}
- Financial Growth: ${reading.fate_line.financial_breakthroughs || 'Strong compounding'}
- Vedic Significance: ${reading.fate_line.vedic_significance}

PLANETARY MOUNTS:
${reading.mounts.map(m => `- ${m.name}: ${m.strength} (${m.attribute})`).join('\n')}

LAL KITAB REMEDIES & UPAYS:
${reading.lal_kitab_upays.map((u, i) => `${i + 1}. ${u}`).join('\n')}

CONSULTATION RECOMMENDATION:
${reading.consultation_recommendation}
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Hasta_Rekha_Dossier_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  const holdSeconds = (holdProgressMs / 1000).toFixed(1);
  const holdPercent = Math.min(100, Math.round((holdProgressMs / 3000) * 100));

  return (
    <div id="palm-scanner-modal-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        id="palm-scanner-modal-container" 
        className="bg-neutral-950 text-stone-100 rounded-3xl border border-amber-600/30 max-w-4xl w-full shadow-2xl overflow-hidden relative my-auto flex flex-col max-h-[94vh] ring-1 ring-amber-500/20"
      >
        
        {/* Hidden Canvas for High-Resolution Capture */}
        <canvas ref={captureCanvasRef} className="hidden" />

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-neutral-900 via-amber-950/60 to-neutral-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-amber-600/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-playfair text-lg sm:text-xl font-bold tracking-tight text-amber-200">
                  Live Hasta Rekha (Palm Scanner CV)
                </h2>
                <span className="text-[10px] uppercase font-extrabold tracking-widest bg-gradient-to-r from-amber-500 to-orange-600 text-neutral-950 px-2 py-0.5 rounded-full shadow-xs">
                  Vedic CV v2.4
                </span>
              </div>
              <p className="text-xs text-amber-300/80 font-normal">
                {currentStep === 'calibration' && 'Step 1: Astro-Biometric Calibration & Numerology Setup'}
                {currentStep === 'scanner' && 'Step 2: Real-Time Hand Landmark Tracking & Open Palm Verification'}
                {currentStep === 'results' && 'Step 3: Harmonized Astro-Biometric Synthesis & Prescriptions'}
              </p>
            </div>
          </div>

          <button
            id="palm-modal-close-btn"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close Palm Scanner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow space-y-6 custom-scrollbar">

          {/* ============================================================ */}
          {/* STEP 1: ASTRO-BIOMETRIC CALIBRATION ENGINE */}
          {/* ============================================================ */}
          {currentStep === 'calibration' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Header Box */}
              <div className="bg-gradient-to-br from-neutral-900/90 to-amber-950/40 p-5 rounded-2xl border border-amber-600/30 shadow-md">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-amber-200 mb-1">
                      Astro-Biometric Calibration
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed font-normal">
                      By harmonizing your exact birth numerology with the unique topological map of your palm lines, our engine generates hyper-personalized, mathematically precise astrological forecasts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Date of Birth */}
                <div className="bg-neutral-900/70 p-4 rounded-2xl border border-neutral-800 focus-within:border-amber-500/50 space-y-1.5 transition-colors">
                  <label className="block text-xs font-semibold text-amber-300/90 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Date of Birth (DOB) *</span>
                  </label>
                  <input
                    id="palm-dob-input"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-stone-100 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <span className="text-[10px] text-stone-400 block">
                    Harmonizes Root Number (Mulank) & Destiny Number (Bhagyank).
                  </span>
                </div>

                {/* Time of Birth (Optional) */}
                <div className="bg-neutral-900/70 p-4 rounded-2xl border border-neutral-800 focus-within:border-amber-500/50 space-y-1.5 transition-colors">
                  <label className="block text-xs font-semibold text-amber-300/90 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Time of Birth (Optional)</span>
                  </label>
                  <input
                    id="palm-tob-input"
                    type="time"
                    value={timeOfBirth}
                    onChange={(e) => setTimeOfBirth(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 text-stone-100 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <span className="text-[10px] text-stone-400 block">
                    Used to calculate planetary hora during palmar crease extraction.
                  </span>
                </div>

                {/* Gender (Dominant Hand Rule) */}
                <div className="bg-neutral-900/70 p-4 rounded-2xl border border-neutral-800 space-y-2">
                  <label className="block text-xs font-semibold text-amber-300/90 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Gender Demographics</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['male', 'female', 'other'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                          gender === g
                            ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm font-bold'
                            : 'bg-neutral-950 text-stone-400 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 block">
                    Palmistry traditionally reads the active manifestation hand based on gender and age.
                  </span>
                </div>

                {/* Analyzed Hand Selection */}
                <div className="bg-neutral-900/70 p-4 rounded-2xl border border-neutral-800 space-y-2">
                  <label className="block text-xs font-semibold text-amber-300/90 flex items-center gap-1.5">
                    <Hand className="w-3.5 h-3.5 text-amber-400" />
                    <span>Select Palm to Scan</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedHand('right')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center justify-center gap-1.5 ${
                        selectedHand === 'right'
                          ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm font-bold'
                          : 'bg-neutral-950 text-stone-400 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <span>Right Hand</span>
                      <span className="text-[10px] opacity-75">(Active Karma)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedHand('left')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer border flex items-center justify-center gap-1.5 ${
                        selectedHand === 'left'
                          ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-sm font-bold'
                          : 'bg-neutral-950 text-stone-400 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <span>Left Hand</span>
                      <span className="text-[10px] opacity-75">(Innate Soul)</span>
                    </button>
                  </div>
                  <span className="text-[10px] text-stone-400 block">
                    {selectedHand === 'right' ? 'Reads career, wealth manifest, and conscious actions.' : 'Reads spiritual blueprint, emotional memory, and latent karma.'}
                  </span>
                </div>

              </div>

              {/* Real-Time Live Numerology Engine Preview Badge */}
              <div className="bg-neutral-900/90 p-4 rounded-2xl border border-amber-700/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-neutral-950 flex flex-col items-center justify-center font-bold shadow-md shrink-0">
                    <span className="text-[9px] uppercase leading-none font-bold">Mulank</span>
                    <span className="text-xl leading-none">{liveNumerology.mulank}</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
                      <span>Governing Deity: {liveNumerology.rulingPlanet}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-normal">
                        {liveNumerology.element}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 italic">
                      Destiny Number (Bhagyank): <strong className="text-amber-200">{liveNumerology.bhagyank}</strong> • Archetype: <strong className="text-amber-200">{liveNumerology.archetype}</strong>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Karmic Resonance</span>
                  <span className="text-xs font-semibold text-amber-400">99.4% Calibrated</span>
                </div>
              </div>

              {/* Action Button: Proceed to Live Camera Viewport */}
              <div className="pt-2">
                <button
                  id="palm-proceed-to-scanner-btn"
                  onClick={() => {
                    setCurrentStep('scanner');
                    if (mode === 'camera') {
                      startCamera();
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 font-bold text-sm tracking-wider uppercase px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-neutral-950 hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/30"
                >
                  <Camera className="w-4 h-4" />
                  <span>Proceed to Live Palm Scanner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          )}

          {/* ============================================================ */}
          {/* STEP 2: ADVANCED COMPUTER VISION SCANNER VIEWPORT */}
          {/* ============================================================ */}
          {currentStep === 'scanner' && !reading && !isScanning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-5"
            >
              {/* Header Bar with Mode and Recalibrate */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-900 p-3 rounded-2xl border border-neutral-800 shadow-xs">
                
                {/* Mode Switcher */}
                <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                  <button
                    onClick={() => {
                      setMode('camera');
                      setUploadError(null);
                      startCamera();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      mode === 'camera'
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                        : 'text-stone-400 hover:text-amber-400'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Live Camera</span>
                  </button>

                  <button
                    onClick={() => {
                      setMode('upload');
                      stopCamera();
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                      mode === 'upload'
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                        : 'text-stone-400 hover:text-amber-400'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                  </button>
                </div>

                {/* Hand and Demographics Summary Chip */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400">
                    Hand: <strong className="text-amber-400">{selectedHand === 'right' ? 'Right (Active)' : 'Left (Innate)'}</strong>
                  </span>
                  <button
                    onClick={() => {
                      stopCamera();
                      setCurrentStep('calibration');
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 underline font-medium px-2 py-1"
                  >
                    Edit Demographics
                  </button>
                </div>
              </div>

              {/* ============================================================ */}
              {/* CAMERA / UPLOAD VIEWFINDER CONTAINER */}
              {/* ============================================================ */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-w-xl mx-auto rounded-3xl overflow-hidden bg-neutral-950 border border-amber-500/30 shadow-2xl">
                
                {mode === 'camera' ? (
                  <>
                    {/* Live Video Feed */}
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                    />

                    {/* HUD Canvas for Computer Vision Overlay */}
                    <canvas
                      ref={hudCanvasRef}
                      className="absolute inset-0 w-full h-full pointer-events-none z-10"
                    />

                    {/* Camera Control Overlays */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                      <button
                        onClick={handleToggleCamera}
                        className="p-2.5 rounded-full bg-neutral-900/80 backdrop-blur-md border border-neutral-700 text-stone-200 hover:text-white transition-all cursor-pointer shadow-md"
                        title="Switch Front/Rear Camera"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Live 3-Second Stability Progress Bar Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 z-20 bg-neutral-900/90 backdrop-blur-md p-3 rounded-2xl border border-neutral-700 shadow-xl space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                            validationResult.isOpenPalm ? 'bg-amber-400' : 'bg-red-500'
                          }`} />
                          <span className="font-bold text-stone-200">
                            {validationResult.isOpenPalm ? 'Biometric Palm Locked' : 'Align Clear Open Palm'}
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-amber-400 font-bold">
                          {holdSeconds}s / 3.0s ({holdPercent}%)
                        </span>
                      </div>

                      <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-100 ease-linear rounded-full"
                          style={{ width: `${holdPercent}%` }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  /* Photo Upload Interface */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-neutral-900/60">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                      <Upload className="w-8 h-8" />
                    </div>

                    <div>
                      <h4 className="font-playfair text-lg font-bold text-stone-100 mb-1">
                        Upload Clear Palm Photo
                      </h4>
                      <p className="text-xs text-stone-400 max-w-sm">
                        Please upload a well-lit photo of your open palm with clear palmar flexion lines visible.
                      </p>
                    </div>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isCheckingUpload}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                    >
                      {isCheckingUpload ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Validating Biometrics...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Select Photo</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

              </div>

              {/* Upload or Camera Error Display */}
              {(cameraError || uploadError) && (
                <div className="bg-red-950/40 p-4 rounded-2xl border border-red-500/30 text-red-200 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">
                    {cameraError || uploadError}
                  </p>
                </div>
              )}

              {/* Live Digit Extension Breakdown */}
              {mode === 'camera' && (
                <div className="bg-neutral-900/80 p-3.5 rounded-2xl border border-neutral-800 space-y-2 max-w-xl mx-auto">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-300">
                      Biometric Digit Extension Checks:
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      validationResult.isOpenPalm ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30' : 'bg-red-950/80 text-red-300 border border-red-500/30'
                    }`}>
                      {validationResult.isOpenPalm ? '✓ Open Palm Ready' : '✕ Align Open Hand'}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                    {[
                      { name: 'Thumb', ext: validationResult.extendedFingers?.thumb },
                      { name: 'Index', ext: validationResult.extendedFingers?.index },
                      { name: 'Middle', ext: validationResult.extendedFingers?.middle },
                      { name: 'Ring', ext: validationResult.extendedFingers?.ring },
                      { name: 'Pinky', ext: validationResult.extendedFingers?.pinky }
                    ].map((f, i) => (
                      <div 
                        key={i} 
                        className={`p-1.5 rounded-xl border transition-colors ${
                          f.ext ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-neutral-950 border-neutral-800 text-stone-500'
                        }`}
                      >
                        <div>{f.name}</div>
                        <div className="text-xs">{f.ext ? '✓' : '—'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Trigger Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto pt-1">
                <div className="text-xs text-amber-300/80 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Hold your open palm steady for 3 seconds to auto-lock and scan.</span>
                </div>

                {mode === 'camera' && (
                  <button
                    id="palm-start-scan-btn"
                    onClick={handleCapture}
                    disabled={!validationResult.isOpenPalm}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-2xl transition-all cursor-pointer shadow-lg shrink-0 ${
                      validationResult.isOpenPalm
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 hover:brightness-110 shadow-amber-500/20'
                        : 'bg-neutral-800 text-stone-500 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {validationResult.isOpenPalm ? (
                      <>
                        <Camera className="w-4 h-4" />
                        <span>Lock & Scan ({holdSeconds}s)</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Open Palm Required</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </motion.div>
          )}

          {/* ============================================================ */}
          {/* PROCESSING STATE: CYBER-VEDIC SACRED YANTRA ENGINE */}
          {/* ============================================================ */}
          {isScanning && (
            <div className="py-14 sm:py-18 px-4 text-center max-w-lg mx-auto space-y-6 animate-in fade-in duration-300">
              
              {/* Spinning Sacred Mandala HUD */}
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-amber-500/30 border-t-amber-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-dashed border-orange-500/60"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                />
                <div className="w-18 h-18 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-neutral-950 shadow-xl shadow-amber-500/30">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
              </div>

              <div>
                <h3 className="font-playfair text-xl font-bold text-amber-200 mb-2">
                  Harmonizing Biometrics & DOB Numerology...
                </h3>
                <p className="text-xs text-amber-400 font-mono font-semibold min-h-[24px] transition-all">
                  {SCAN_MICRO_STEPS[scanStepIndex]}
                </p>
              </div>

              {/* Micro-step indicators */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {SCAN_MICRO_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i <= scanStepIndex
                        ? 'w-10 bg-amber-400'
                        : 'w-2.5 bg-neutral-800'
                    }`}
                  />
                ))}
              </div>

              <p className="text-[11px] text-stone-400 italic">
                Applying Canny Edge Filtering, MediaPipe Landmarks, and Lal Kitab Farman Syntheses...
              </p>
            </div>
          )}

          {/* ============================================================ */}
          {/* STEP 3: COMPREHENSIVE DARK VEDIC RESULTS DASHBOARD */}
          {/* ============================================================ */}
          {reading && !isScanning && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Result Top Banner: Palm Archetype, Accuracy & DOB Profile */}
              <div className="bg-gradient-to-br from-neutral-900 via-amber-950/40 to-neutral-900 p-5 rounded-2xl border border-amber-600/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 px-3 py-0.5 rounded-full text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Astro-Biometrics Verified & Harmonized</span>
                  </div>
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-amber-200">
                    {reading.palm_type}
                  </h3>
                  <p className="text-xs text-stone-300 flex flex-wrap items-center gap-2">
                    <span>Analyzed: <strong className="text-amber-400">{reading.hand_analyzed}</strong></span>
                    <span>•</span>
                    <span>DOB: <strong className="text-amber-400">{dob}</strong> (Root {liveNumerology.mulank} / Destiny {liveNumerology.bhagyank})</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Confidence</span>
                    <span className="text-xl font-bold text-amber-400 font-mono">
                      {(reading.confidence_score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-8 w-px bg-neutral-800"></div>
                  <button
                    id="palm-recalibrate-btn"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 text-xs font-semibold transition-colors cursor-pointer border border-neutral-700 shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>New Scan</span>
                  </button>
                </div>
              </div>

              {/* Navigation Tabs for Analysis View */}
              <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 pb-3">
                <button
                  onClick={() => setActiveTab('synthesis')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'synthesis'
                      ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-sm'
                      : 'bg-neutral-900 text-stone-400 border border-neutral-800 hover:text-amber-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Vedic Synthesis</span>
                </button>

                <button
                  onClick={() => setActiveTab('lines')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'lines'
                      ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-sm'
                      : 'bg-neutral-900 text-stone-400 border border-neutral-800 hover:text-amber-300'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>4 Major Lines</span>
                </button>

                <button
                  onClick={() => setActiveTab('mounts')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'mounts'
                      ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-sm'
                      : 'bg-neutral-900 text-stone-400 border border-neutral-800 hover:text-amber-300'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Planetary Mounts</span>
                </button>

                <button
                  onClick={() => setActiveTab('upays')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'upays'
                      ? 'bg-amber-500 text-neutral-950 font-extrabold shadow-sm'
                      : 'bg-neutral-900 text-stone-400 border border-neutral-800 hover:text-amber-300'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Lal Kitab Upays</span>
                </button>
              </div>

              {/* ============================================================ */}
              {/* TAB 1: THE VEDIC SYNTHESIS (DOB + PALM FUSION) */}
              {/* ============================================================ */}
              {activeTab === 'synthesis' && (
                <div className="space-y-4">
                  {/* Synthesis Highlight Card */}
                  <div className="bg-gradient-to-br from-neutral-900 via-amber-950/50 to-neutral-900 p-6 rounded-2xl border border-amber-600/40 shadow-xl space-y-4">
                    <div className="flex items-center gap-2.5 text-amber-400">
                      <Award className="w-5 h-5" />
                      <h4 className="font-playfair text-lg font-bold text-amber-200">
                        {reading.vedic_synthesis?.headline || 'Vedic Biometric & DOB Numerology Synthesis'}
                      </h4>
                    </div>

                    <p className="text-sm text-stone-200 leading-relaxed font-normal">
                      {reading.vedic_synthesis?.core_narrative || 
                        `Your scanned Life Line shows a distinct curve around the Mount of Venus. Combined with your Root Number ${liveNumerology.mulank} (ruled by ${liveNumerology.rulingPlanet}) and Destiny Number ${liveNumerology.bhagyank}, this indicates a strong pull towards creative entrepreneurship, self-made authority, and deep family bonds in your current life chapter.`
                      }
                    </p>

                    <div className="bg-neutral-950/80 p-4 rounded-xl border border-amber-500/20 space-y-1.5 text-xs">
                      <strong className="text-amber-300 block">Current Life Chapter Actionable Guidance:</strong>
                      <p className="text-stone-300 leading-relaxed font-normal">
                        {reading.vedic_synthesis?.current_chapter_advice || 
                          `Harness the sovereign momentum of your ${liveNumerology.rulingPlanet} ruler. Prioritize strategic long-term ventures, practice morning Surya Arghya, and align major contracts on favorable days (${liveNumerology.favorableDays.join(', ')}).`
                        }
                      </p>
                    </div>
                  </div>

                  {/* Astro-Demographic Quick Specs Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-neutral-900/80 p-3.5 rounded-xl border border-neutral-800 text-center">
                      <span className="text-[10px] uppercase text-stone-400 font-semibold block">Root Planet</span>
                      <span className="text-xs font-bold text-amber-300">{liveNumerology.rulingPlanet}</span>
                    </div>
                    <div className="bg-neutral-900/80 p-3.5 rounded-xl border border-neutral-800 text-center">
                      <span className="text-[10px] uppercase text-stone-400 font-semibold block">Elemental Force</span>
                      <span className="text-xs font-bold text-amber-300">{liveNumerology.element}</span>
                    </div>
                    <div className="bg-neutral-900/80 p-3.5 rounded-xl border border-neutral-800 text-center">
                      <span className="text-[10px] uppercase text-stone-400 font-semibold block">Ideal Gemstone</span>
                      <span className="text-xs font-bold text-amber-300">{liveNumerology.gemstone.split(' ')[0]}</span>
                    </div>
                    <div className="bg-neutral-900/80 p-3.5 rounded-xl border border-neutral-800 text-center">
                      <span className="text-[10px] uppercase text-stone-400 font-semibold block">Crease Density</span>
                      <span className="text-xs font-bold text-amber-300">{reading.biometrics?.crease_density ? (reading.biometrics.crease_density * 100).toFixed(1) + '%' : '0.049 High'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================ */}
              {/* TAB 2: 4 MAJOR PALMAR LINES */}
              {/* ============================================================ */}
              {activeTab === 'lines' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* 1. Life Line (Jeevan Rekha) */}
                  <div className="bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
                          <Flame className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-playfair text-base font-bold text-amber-200">
                            {reading.life_line.name}
                          </h4>
                          <span className="text-[11px] text-amber-400 font-semibold">
                            {reading.life_line.hindi_name}
                          </span>
                        </div>
                      </div>
                      {reading.life_line.vitality_score && (
                        <span className="text-xs font-bold bg-neutral-950 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded-full">
                          Vitality: {reading.life_line.vitality_score}/100
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed font-normal">
                      <strong>Trajectory:</strong> {reading.life_line.trajectory}
                    </p>

                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 space-y-1.5 text-xs text-stone-300">
                      <div><strong>Longevity & Stamina:</strong> {reading.life_line.longevity_indicator}</div>
                      <div><strong>Key Life Milestones:</strong> {reading.life_line.key_milestones}</div>
                      <div className="pt-1 text-amber-300 border-t border-neutral-800 font-medium">
                        <strong>Vedic Insight:</strong> {reading.life_line.vedic_significance}
                      </div>
                    </div>
                  </div>

                  {/* 2. Heart Line (Hridaya Rekha) */}
                  <div className="bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center">
                          <Heart className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-playfair text-base font-bold text-amber-200">
                            {reading.heart_line.name}
                          </h4>
                          <span className="text-[11px] text-amber-400 font-semibold">
                            {reading.heart_line.hindi_name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed font-normal">
                      <strong>Trajectory:</strong> {reading.heart_line.trajectory}
                    </p>

                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 space-y-1.5 text-xs text-stone-300">
                      <div><strong>Emotional Nature:</strong> {reading.heart_line.emotional_stability}</div>
                      <div><strong>Relationship Dynamic:</strong> {reading.heart_line.relationship_guidance}</div>
                      <div className="pt-1 text-amber-300 border-t border-neutral-800 font-medium">
                        <strong>Vedic Insight:</strong> {reading.heart_line.vedic_significance}
                      </div>
                    </div>
                  </div>

                  {/* 3. Head Line (Mastishka Rekha) */}
                  <div className="bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                          <Brain className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-playfair text-base font-bold text-amber-200">
                            {reading.head_line.name}
                          </h4>
                          <span className="text-[11px] text-amber-400 font-semibold">
                            {reading.head_line.hindi_name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed font-normal">
                      <strong>Trajectory:</strong> {reading.head_line.trajectory}
                    </p>

                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 space-y-1.5 text-xs text-stone-300">
                      <div><strong>Intellect Type:</strong> {reading.head_line.intellect_type}</div>
                      <div><strong>Cognitive Focus:</strong> {reading.head_line.focus_clarity}</div>
                      <div className="pt-1 text-amber-300 border-t border-neutral-800 font-medium">
                        <strong>Vedic Insight:</strong> {reading.head_line.vedic_significance}
                      </div>
                    </div>
                  </div>

                  {/* 4. Fate Line (Bhagya Rekha) */}
                  <div className="bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-playfair text-base font-bold text-amber-200">
                            {reading.fate_line.name}
                          </h4>
                          <span className="text-[11px] text-amber-400 font-semibold">
                            {reading.fate_line.hindi_name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed font-normal">
                      <strong>Trajectory:</strong> {reading.fate_line.trajectory}
                    </p>

                    <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 space-y-1.5 text-xs text-stone-300">
                      <div><strong>Career Trajectory:</strong> {reading.fate_line.career_trajectory}</div>
                      <div><strong>Financial Breakthroughs:</strong> {reading.fate_line.financial_breakthroughs}</div>
                      <div className="pt-1 text-amber-300 border-t border-neutral-800 font-medium">
                        <strong>Vedic Insight:</strong> {reading.fate_line.vedic_significance}
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* ============================================================ */}
              {/* TAB 3: PLANETARY MOUNTS */}
              {/* ============================================================ */}
              {activeTab === 'mounts' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {reading.mounts.map((mount, idx) => (
                    <div key={idx} className="bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-playfair text-base font-bold text-amber-200">
                          {mount.name}
                        </h4>
                        <span className="text-xs font-bold text-amber-400 bg-neutral-950 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                          {mount.strength}
                        </span>
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed font-normal">
                        {mount.attribute}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ============================================================ */}
              {/* TAB 4: LAL KITAB UPAYS */}
              {/* ============================================================ */}
              {activeTab === 'upays' && (
                <div className="bg-neutral-900/90 p-6 rounded-2xl border border-neutral-800 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-amber-400">
                    <Sparkles className="w-5 h-5" />
                    <h4 className="font-playfair text-lg font-bold text-amber-200">
                      Prescribed Lal Kitab Upays for Your Palm Lines & DOB
                    </h4>
                  </div>
                  <p className="text-xs text-stone-300">
                    Perform these practical, safe Vedic remedies regularly to strengthen your Bhagya Rekha and harmonize Prana energy:
                  </p>
                  <div className="space-y-3">
                    {reading.lal_kitab_upays.map((upay, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-xs text-stone-200 font-normal">
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{upay}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ============================================================ */}
              {/* FOOTER CALL-TO-ACTION CARD */}
              {/* ============================================================ */}
              <div className="bg-gradient-to-r from-neutral-900 via-amber-950/60 to-neutral-900 p-5 rounded-2xl border border-amber-600/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-playfair text-base font-bold text-amber-200">
                    Want Dr. Preeti Sehgal to examine your palm in detail?
                  </h4>
                  <p className="text-xs text-stone-300 max-w-xl font-normal">
                    {reading.consultation_recommendation}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    id="palm-download-report-btn"
                    onClick={handleDownloadReport}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Report</span>
                  </button>

                  <button
                    id="palm-book-chamber-btn"
                    onClick={() => {
                      onClose();
                      onOpenBooking('palmistry');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-neutral-950 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-md shadow-amber-500/20"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Chamber Session</span>
                  </button>
                </div>
              </div>

            </motion.div>
          )}

        </div>

      </div>
    </div>
  );
};
