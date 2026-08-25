export interface HandLandmark {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

export interface HandValidationResult {
  isHandDetected: boolean;
  isOpenPalm: boolean;
  status: 'no_hand' | 'closed_fist' | 'partial_hand' | 'too_far' | 'open_palm';
  extendedFingers: {
    thumb: boolean;
    index: boolean;
    middle: boolean;
    ring: boolean;
    pinky: boolean;
  };
  extendedCount: number;
  message: string;
  landmarks?: HandLandmark[];
  handedness?: 'Right' | 'Left';
  confidence: number;
}

/**
 * Calculates Euclidean distance between two 2D points
 */
export function euclideanDist(p1: HandLandmark, p2: HandLandmark): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Validates whether a detected hand has an OPEN PALM using landmark geometry:
 * - Landmark 0: Wrist
 * - Landmarks 1-4: Thumb (CMC, MCP, IP, TIP)
 * - Landmarks 5-8: Index (MCP, PIP, DIP, TIP)
 * - Landmarks 9-12: Middle (MCP, PIP, DIP, TIP)
 * - Landmarks 13-16: Ring (MCP, PIP, DIP, TIP)
 * - Landmarks 17-20: Pinky (MCP, PIP, DIP, TIP)
 */
export function validateOpenPalm(landmarks: HandLandmark[]): HandValidationResult {
  if (!landmarks || landmarks.length < 21) {
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

  const wrist = landmarks[0];
  const thumbTip = landmarks[4];
  const thumbMcp = landmarks[2];
  const thumbCmc = landmarks[1];

  const indexMcp = landmarks[5];
  const indexPip = landmarks[6];
  const indexTip = landmarks[8];

  const middleMcp = landmarks[9];
  const middlePip = landmarks[10];
  const middleTip = landmarks[12];

  const ringMcp = landmarks[13];
  const ringPip = landmarks[14];
  const ringTip = landmarks[16];

  const pinkyMcp = landmarks[17];
  const pinkyPip = landmarks[18];
  const pinkyTip = landmarks[20];

  // Palm base scale (Wrist to Middle MCP & Palm Width)
  const palmHeight = euclideanDist(wrist, middleMcp);
  const palmWidth = euclideanDist(indexMcp, pinkyMcp);

  if (palmHeight < 0.06 || palmWidth < 0.05) {
    return {
      isHandDetected: true,
      isOpenPalm: false,
      status: 'too_far',
      extendedFingers: { thumb: false, index: false, middle: false, ring: false, pinky: false },
      extendedCount: 0,
      message: '⚠️ Hand is too far. Please bring your open palm closer to the camera frame.',
      landmarks,
      confidence: 0.3
    };
  }

  // Helper to check if a regular finger (index, middle, ring, pinky) is extended
  const isFingerExtended = (mcp: HandLandmark, pip: HandLandmark, tip: HandLandmark): boolean => {
    const tipToWrist = euclideanDist(tip, wrist);
    const mcpToWrist = euclideanDist(mcp, wrist);
    const pipToWrist = euclideanDist(pip, wrist);
    const tipToMcp = euclideanDist(tip, mcp);
    const pipToMcp = euclideanDist(pip, mcp);

    // In an open hand:
    // 1. Tip is significantly further from the wrist than MCP and PIP
    // 2. Tip to MCP distance is extended relative to pipToMcp
    const ratioToWrist = tipToWrist / Math.max(mcpToWrist, 0.001);
    const isTipBeyondPip = tipToWrist > pipToWrist;
    const isTipFarFromMcp = tipToMcp > pipToMcp * 1.15;

    return ratioToWrist > 1.25 && isTipBeyondPip && isTipFarFromMcp;
  };

  // Helper to check if thumb is extended away from palm
  const isThumbExtended = (): boolean => {
    const tipToPinkyMcp = euclideanDist(thumbTip, pinkyMcp);
    const mcpToPinkyMcp = euclideanDist(thumbMcp, pinkyMcp);
    const tipToWrist = euclideanDist(thumbTip, wrist);
    const cmcToWrist = euclideanDist(thumbCmc, wrist);
    return (tipToPinkyMcp > mcpToPinkyMcp * 1.1) && (tipToWrist > cmcToWrist * 1.2);
  };

  const indexExt = isFingerExtended(indexMcp, indexPip, indexTip);
  const middleExt = isFingerExtended(middleMcp, middlePip, middleTip);
  const ringExt = isFingerExtended(ringMcp, ringPip, ringTip);
  const pinkyExt = isFingerExtended(pinkyMcp, pinkyPip, pinkyTip);
  const thumbExt = isThumbExtended();

  const extendedFingers = {
    thumb: thumbExt,
    index: indexExt,
    middle: middleExt,
    ring: ringExt,
    pinky: pinkyExt
  };

  const mainFingersExtendedCount = (indexExt ? 1 : 0) + (middleExt ? 1 : 0) + (ringExt ? 1 : 0) + (pinkyExt ? 1 : 0);
  const totalExtendedCount = mainFingersExtendedCount + (thumbExt ? 1 : 0);

  // Closed fist or fist-like object detection:
  // If fewer than 3 main fingers are extended, it's definitely a closed fist or gesture
  if (mainFingersExtendedCount < 3) {
    return {
      isHandDetected: true,
      isOpenPalm: false,
      status: 'closed_fist',
      extendedFingers,
      extendedCount: totalExtendedCount,
      message: '⚠️ Invalid Scan: Please show a clear, open palm to the camera.',
      landmarks,
      confidence: 0.2
    };
  }

  // If 3 main fingers extended but not fully open, check if it's partially closed
  if (mainFingersExtendedCount === 3 && !thumbExt) {
    return {
      isHandDetected: true,
      isOpenPalm: false,
      status: 'partial_hand',
      extendedFingers,
      extendedCount: totalExtendedCount,
      message: '⚠️ Please open all 5 fingers and stretch your palm flat.',
      landmarks,
      confidence: 0.6
    };
  }

  // Open Palm Validated!
  return {
    isHandDetected: true,
    isOpenPalm: true,
    status: 'open_palm',
    extendedFingers,
    extendedCount: totalExtendedCount,
    message: '✨ Open Palm Validated! Hold steady...',
    landmarks,
    confidence: Math.min(0.85 + (totalExtendedCount === 5 ? 0.15 : 0.05), 1.0)
  };
}
