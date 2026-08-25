# Hasta Rekha (Live Palm Scanner) - FastAPI & Computer Vision Backend

This directory contains the production-grade Python FastAPI backend and MediaPipe + OpenCV computer vision pipeline for palmar biometric analysis.

## Setup & Running the FastAPI Service

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
# Or using uvicorn directly:
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

## Endpoints

1. **`POST /v1/scan-palm`** (Base64 JSON Payload):
   - Accepts: `{ "image": "data:image/jpeg;base64,..." }`
   - Returns: Detailed astrological breakdown for `life_line`, `heart_line`, `head_line`, `fate_line`, `mounts`, and `lal_kitab_upays`.

2. **`POST /v1/scan-palm/upload`** (Multipart File Upload):
   - Accepts binary `multipart/form-data` with `file` field.

3. **`GET /health`**:
   - System health check.
