"""
Hasta Rekha Live Palm Scanner - FastAPI Production Backend
Exposes /v1/scan-palm endpoint accepting image uploads, validates payloads,
and invokes the MediaPipe & OpenCV Hasta Rekha machine learning module.
"""

from fastapi import FastAPI, File, UploadFile, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import base64
import re
import logging
from palm_cv import analyze_palm_lines

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("HastaRekhaAPI")

app = FastAPI(
    title="Vedic Hasta Rekha (Palm Scanner) API",
    description="Production-ready FastAPI backend for live palmar crease biometrics and Vedic astrology analysis.",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "*"  # Adjust for specific production domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Schema Definitions ---
class PalmScanBase64Request(BaseModel):
    image: str = Field(..., description="Base64-encoded image string (with or without data:image/jpeg;base64, header)")
    hand_preference: Optional[str] = Field("right", description="'right' or 'left'")
    user_context: Optional[Dict[str, Any]] = None

class LineAnalysis(BaseModel):
    name: str
    hindi_name: Optional[str] = None
    trajectory: str
    vitality_score: Optional[int] = None
    longevity_indicator: Optional[str] = None
    emotional_stability: Optional[str] = None
    relationship_guidance: Optional[str] = None
    intellect_type: Optional[str] = None
    focus_clarity: Optional[str] = None
    career_trajectory: Optional[str] = None
    financial_breakthroughs: Optional[str] = None
    key_milestones: Optional[str] = None
    vedic_significance: str

class MountAnalysis(BaseModel):
    name: str
    strength: str
    attribute: str

class PalmScanResponse(BaseModel):
    success: bool
    confidence_score: float
    clarity_score: float
    palm_type: str
    hand_analyzed: str
    biometrics: Dict[str, Any]
    life_line: LineAnalysis
    heart_line: LineAnalysis
    head_line: LineAnalysis
    fate_line: LineAnalysis
    mounts: List[MountAnalysis]
    lal_kitab_upays: List[str]
    consultation_recommendation: str

ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/webp", "image/bmp"}
MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024  # 15 MB

@app.get("/health", tags=["System"])
def health_check():
    return {"status": "healthy", "service": "Hasta Rekha Computer Vision API"}

@app.post(
    "/v1/scan-palm",
    response_model=PalmScanResponse,
    status_code=status.HTTP_200_OK,
    tags=["Palmistry"]
)
async def scan_palm_base64(payload: PalmScanBase64Request):
    """
    Analyzes palmar flexion creases and Vedic lines from a base64 encoded image string.
    """
    raw_b64 = payload.image
    if not raw_b64:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image payload cannot be empty."
        )

    # Strip Data URL header if present (e.g. data:image/jpeg;base64,...)
    if "base64," in raw_b64:
        raw_b64 = raw_b64.split("base64,")[1]

    try:
        image_bytes = base64.b64decode(raw_b64)
    except Exception as e:
        logger.error(f"Base64 decoding failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid base64 encoded image data."
        )

    if len(image_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"Image size exceeds the maximum limit of {MAX_FILE_SIZE_BYTES // (1024*1024)}MB."
        )

    try:
        reading = analyze_palm_lines(image_bytes)
        return reading
    except Exception as e:
        logger.error(f"Computer vision analysis error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Biometric line extraction failed: {str(e)}"
        )

@app.post(
    "/v1/scan-palm/upload",
    response_model=PalmScanResponse,
    status_code=status.HTTP_200_OK,
    tags=["Palmistry"]
)
async def scan_palm_file(file: UploadFile = File(...)):
    """
    Alternative multipart/form-data endpoint for direct binary image file uploads.
    """
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file format '{file.content_type}'. Allowed: {', '.join(ALLOWED_MIME_TYPES)}"
        )

    image_bytes = await file.read()
    if len(image_bytes) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum allowed size of {MAX_FILE_SIZE_BYTES // (1024*1024)}MB."
        )

    try:
        reading = analyze_palm_lines(image_bytes)
        return reading
    except Exception as e:
        logger.error(f"File analysis error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Palm processing failed: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
