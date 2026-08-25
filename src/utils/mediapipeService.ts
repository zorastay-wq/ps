import { HandLandmark, HandValidationResult, validateOpenPalm } from './handDetection';

declare global {
  interface Window {
    Hands?: any;
  }
}

let handsInstance: any = null;
let scriptLoadingPromise: Promise<void> | null = null;

/**
 * Loads the MediaPipe Hands library via CDN script tag to ensure 100% reliable
 * browser WASM loading without Vite bundler resolution conflicts.
 */
export function loadMediaPipeHandsScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Hands) return Promise.resolve();
  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise<void>((resolve, reject) => {
    // Check if already in DOM
    const existing = document.querySelector('script[src*="@mediapipe/hands"]');
    if (existing && window.Hands) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.js';
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      if (window.Hands) {
        resolve();
      } else {
        reject(new Error('MediaPipe Hands script loaded but window.Hands is undefined.'));
      }
    };
    script.onerror = (err) => {
      reject(new Error('Failed to load MediaPipe Hands script from CDN.'));
    };
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
}

/**
 * Initializes or returns the singleton MediaPipe Hands detector instance.
 */
export async function getHandsDetector(): Promise<any> {
  if (handsInstance) return handsInstance;

  await loadMediaPipeHandsScript();

  if (!window.Hands) {
    throw new Error('window.Hands constructor is unavailable.');
  }

  const hands = new window.Hands({
    locateFile: (file: string) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`;
    }
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.55,
    minTrackingConfidence: 0.5
  });

  await hands.initialize();
  handsInstance = hands;
  return handsInstance;
}

/**
 * Processes a single frame (video, canvas, or image) through MediaPipe Hands
 * and validates if an open palm is presented.
 */
export async function analyzeHandFrame(
  source: HTMLVideoElement | HTMLCanvasElement | HTMLImageElement
): Promise<HandValidationResult> {
  try {
    const detector = await getHandsDetector();

    return new Promise<HandValidationResult>((resolve) => {
      let resolved = false;

      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve({
            isHandDetected: false,
            isOpenPalm: false,
            status: 'no_hand',
            extendedFingers: { thumb: false, index: false, middle: false, ring: false, pinky: false },
            extendedCount: 0,
            message: '⚠️ Invalid Scan: Please show a clear, open palm to the camera.',
            confidence: 0
          });
        }
      }, 1500);

      detector.onResults((results: any) => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timeout);

        if (!results || !results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
          resolve({
            isHandDetected: false,
            isOpenPalm: false,
            status: 'no_hand',
            extendedFingers: { thumb: false, index: false, middle: false, ring: false, pinky: false },
            extendedCount: 0,
            message: '⚠️ Invalid Scan: Please show a clear, open palm to the camera.',
            confidence: 0
          });
          return;
        }

        const rawLandmarks = results.multiHandLandmarks[0] as HandLandmark[];
        let handednessLabel: 'Right' | 'Left' = 'Right';
        if (results.multiHandedness && results.multiHandedness[0]) {
          handednessLabel = results.multiHandedness[0].label as 'Right' | 'Left';
        }

        const validation = validateOpenPalm(rawLandmarks);
        validation.handedness = handednessLabel;
        resolve(validation);
      });

      detector.send({ image: source }).catch((err: any) => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          console.warn('Error sending image to MediaPipe:', err);
          resolve({
            isHandDetected: false,
            isOpenPalm: false,
            status: 'no_hand',
            extendedFingers: { thumb: false, index: false, middle: false, ring: false, pinky: false },
            extendedCount: 0,
            message: '⚠️ Invalid Scan: Please show a clear, open palm to the camera.',
            confidence: 0
          });
        }
      });
    });
  } catch (error) {
    console.warn('MediaPipe detection initialization failure:', error);
    return {
      isHandDetected: false,
      isOpenPalm: false,
      status: 'no_hand',
      extendedFingers: { thumb: false, index: false, middle: false, ring: false, pinky: false },
      extendedCount: 0,
      message: '⚠️ Invalid Scan: Please show a clear, open palm to the camera.',
      confidence: 0
    };
  }
}
