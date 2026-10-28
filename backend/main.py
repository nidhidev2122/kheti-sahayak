
"""Kheti Sahayak API: agricultural GenAI and live Open-Meteo weather."""

import base64
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from typing import Optional

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI(
    title="Kheti Sahayak GenAI API",
    version="2.0.0",
    description="Agricultural GenAI, image analysis and live weather proxy",
)

origins = [
    x.strip()
    for x in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:5173,http://127.0.0.1:5173",
    ).split(",")
    if x.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1"


def get_json(url: str, timeout: int = 12):
    request = urllib.request.Request(
        url,
        headers={"User-Agent": "KhetiSahayak/2.0"},
    )
    with urllib.request.urlopen(request, timeout=timeout) as response:
        return json.loads(response.read().decode("utf-8"))


def nvidia_model():
    return os.getenv(
        "NVIDIA_MODEL",
        "poolside/laguna-xs-2.1",
    ).strip()


@app.get("/")
def root():
    return {
        "service": "Kheti Sahayak GenAI API",
        "docs": "/docs",
        "health": "/api/health",
    }


@app.get("/api/health")
def health():
    key = os.getenv("NVIDIA_API_KEY", "").strip()
    configured = bool(key and not key.startswith("YOUR_"))

    return {
        "status": "ok",
        "provider_configured": configured,
        "provider": "NVIDIA NIM",
        "model": nvidia_model(),
        "weather_provider": "Open-Meteo",
        "version": "2.0.0",
    }


@app.get("/api/weather")
def weather(location: str):
    location = location.strip()

    if not location or len(location) > 120:
        raise HTTPException(
            status_code=422,
            detail="Enter a location under 120 characters.",
        )

    try:
        geo_url = (
            "https://geocoding-api.open-meteo.com/v1/search?"
            + urllib.parse.urlencode({
                "name": location,
                "count": 1,
                "language": "en",
                "format": "json",
            })
        )

        geo = get_json(geo_url)
        results = geo.get("results") or []

        if not results:
            raise HTTPException(
                status_code=404,
                detail=f"Could not find '{location}'. Try a nearby city or district name.",
            )

        place = results[0]

        forecast_url = (
            "https://api.open-meteo.com/v1/forecast?"
            + urllib.parse.urlencode({
                "latitude": place["latitude"],
                "longitude": place["longitude"],
                "current": (
                    "temperature_2m,relative_humidity_2m,"
                    "apparent_temperature,precipitation,"
                    "wind_speed_10m,weather_code"
                ),
                "daily": (
                    "weather_code,temperature_2m_max,"
                    "temperature_2m_min,precipitation_probability_max,"
                    "precipitation_sum"
                ),
                "forecast_days": 5,
                "timezone": "auto",
            })
        )

        forecast = get_json(forecast_url)
        code = (forecast.get("current") or {}).get("weather_code")

        descriptions = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            48: "Depositing rime fog",
            51: "Light drizzle",
            53: "Drizzle",
            55: "Dense drizzle",
            61: "Light rain",
            63: "Moderate rain",
            65: "Heavy rain",
            71: "Light snow",
            80: "Rain showers",
            81: "Rain showers",
            82: "Heavy rain showers",
            95: "Thunderstorm",
        }

        forecast["location"] = {
            "name": ", ".join(
                x for x in [
                    place.get("name"),
                    place.get("admin1"),
                    place.get("country"),
                ] if x
            ),
            "latitude": place["latitude"],
            "longitude": place["longitude"],
        }

        forecast["description"] = descriptions.get(
            code,
            "Current conditions",
        )

        return forecast

    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Weather provider unavailable: {str(exc)[:180]}",
        )


@app.post("/api/ask")
async def ask(
    question: str = Form(...),
    role: str = Form("farmer"),
    location: str = Form(""),
    crop: str = Form(""),
    farm_size: str = Form(""),
    soil: str = Form(""),
    image: Optional[UploadFile] = File(None),
):
    api_key = os.getenv("NVIDIA_API_KEY", "").strip()

    if not api_key or api_key.startswith("YOUR_"):
        raise HTTPException(
            status_code=503,
            detail=(
                "NVIDIA AI is not configured. Add a valid NVIDIA_API_KEY "
                "to backend/.env and restart the backend."
            ),
        )

    question = question.strip()

    if not question:
        raise HTTPException(
            status_code=422,
            detail="Enter a question.",
        )

    if len(question) > 12000:
        raise HTTPException(
            status_code=413,
            detail="Question is too long. Keep it under 12,000 characters.",
        )

    if role not in ("farmer", "landlord"):
        role = "farmer"

    context = (
        f"User role: {role}. "
        f"Location: {location[:160] or 'not provided'}. "
        f"Crop/land use: {crop[:120] or 'not provided'}. "
        f"Farm size: {farm_size[:80] or 'not provided'}. "
        f"Soil: {soil[:120] or 'not provided'}."
    )

    system = (
        "You are Kheti Sahayak, an agricultural decision-support assistant "
        "for Indian farmers and farmland managers. Use simple, practical "
        "language and structure responses as: What this may mean; "
        "Recommended checks/actions; What information is missing; "
        "When to ask a local expert. Distinguish user-provided facts "
        "from assumptions. Do not invent live weather, mandi prices, "
        "government schemes, sources, citations or confidence percentages. "
        "For crop images, report visible features only and give plausible "
        "possibilities, not a definitive diagnosis. Never recommend a "
        "hazardous pesticide dose; advise following the exact product label "
        "and local agricultural officer guidance. For profit estimates, "
        "state the formula and missing costs; never guarantee profits. "
        "For leases, offer general recordkeeping/checklists, not legal advice. "
        "Recommend a local KVK/agronomist for high-impact disease, chemical, "
        "legal or financial decisions. Be concise and avoid fabricated data."
    )

    content = [{
        "type": "text",
        "text": context + "\n\nUser question: " + question,
    }]

    if image is not None:
        if image.content_type not in (
            "image/jpeg",
            "image/png",
            "image/webp",
        ):
            raise HTTPException(
                status_code=415,
                detail="Upload a JPG, PNG, or WEBP image.",
            )

        raw = await image.read()

        if len(raw) > 8 * 1024 * 1024:
            raise HTTPException(
                status_code=413,
                detail="Image must be smaller than 8 MB.",
            )

        if not raw:
            raise HTTPException(
                status_code=400,
                detail="The uploaded image is empty.",
            )

        encoded = base64.b64encode(raw).decode("ascii")

        content.append({
            "type": "image_url",
            "image_url": {
                "url": (
                    f"data:{image.content_type};base64,{encoded}"
                )
            },
        })

    model = nvidia_model()

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": content},
        ],
        "temperature": 0.25,
        "max_tokens": 1200,
        "stream": False,
    }

    req = urllib.request.Request(
        f"{NVIDIA_BASE_URL}/chat/completions",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=75) as response:
            result = json.loads(response.read().decode("utf-8"))

        answer = (
            result.get("choices", [{}])[0]
            .get("message", {})
            .get("content")
        )

        if not answer:
            raise HTTPException(
                status_code=502,
                detail="The AI provider returned an empty response. Try again.",
            )

        return {
            "answer": answer,
            "model": model,
            "pipeline": [
                "validated inputs",
                "assembled agricultural prompt",
                "NVIDIA NIM model inference completed",
                "safety-aware response returned",
            ],
        }

    except urllib.error.HTTPError as exc:
        detail = exc.read().decode(errors="ignore")[:350]

        if exc.code in (401, 403):
            raise HTTPException(
                status_code=502,
                detail=(
                    "NVIDIA rejected the API key or model access. "
                    "Check NVIDIA_API_KEY and NVIDIA_MODEL in backend/.env."
                ),
            )

        if exc.code == 429:
            raise HTTPException(
                status_code=502,
                detail=(
                    "NVIDIA API rate or usage limit reached. "
                    "Check your NVIDIA API account and limits."
                ),
            )

        raise HTTPException(
            status_code=502,
            detail=f"NVIDIA API returned HTTP {exc.code}: {detail}",
        )

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Could not reach NVIDIA AI provider: {str(exc)[:180]}",
        )
