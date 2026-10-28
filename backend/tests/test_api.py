"""Small API smoke tests. Run from the project root: python -m unittest discover -s backend/tests."""
import json
import os
import unittest
from unittest.mock import MagicMock, patch
from fastapi.testclient import TestClient
from backend.main import app


class KhetiApiTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health_is_public_and_reports_configuration(self):
        with patch.dict(os.environ, {"OPENAI_API_KEY": "your_api_key_here"}):
            response = self.client.get("/api/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")
        self.assertFalse(response.json()["provider_configured"])

    def test_ai_returns_clear_error_without_key(self):
        with patch.dict(os.environ, {"OPENAI_API_KEY": "your_api_key_here"}):
            response = self.client.post("/api/ask", data={"question": "How should I care for tomato?"})
        self.assertEqual(response.status_code, 503)
        self.assertIn("OPENAI_API_KEY", response.json()["detail"])

    def test_ai_returns_model_answer_when_provider_succeeds(self):
        response = MagicMock()
        response.__enter__.return_value.read.return_value = json.dumps({"choices": [{"message": {"content": "Check soil moisture before watering."}}]}).encode()
        with patch.dict(os.environ, {"OPENAI_API_KEY": "test-key", "OPENAI_MODEL": "gpt-4o-mini"}), patch("backend.main.urllib.request.urlopen", return_value=response):
            result = self.client.post("/api/ask", data={"question": "How should I water tomatoes?", "role": "farmer", "crop": "tomato"})
        self.assertEqual(result.status_code, 200)
        self.assertEqual(result.json()["answer"], "Check soil moisture before watering.")
        self.assertEqual(len(result.json()["pipeline"]), 4)

    def test_weather_uses_geocoding_and_forecast_provider(self):
        geo = {"results": [{"name": "Bengaluru", "admin1": "Karnataka", "country": "India", "latitude": 12.97, "longitude": 77.59}]}
        forecast = {"current": {"temperature_2m": 27, "relative_humidity_2m": 60, "apparent_temperature": 28, "precipitation": 0, "wind_speed_10m": 8, "weather_code": 1}, "daily": {"time": ["2026-10-27"], "temperature_2m_max": [29], "temperature_2m_min": [20], "precipitation_probability_max": [10], "precipitation_sum": [0]}, "timezone": "Asia/Kolkata"}
        with patch("backend.main.get_json", side_effect=[geo, forecast]):
            response = self.client.get("/api/weather", params={"location": "Bengaluru"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["location"]["name"], "Bengaluru, Karnataka, India")
        self.assertEqual(response.json()["current"]["temperature_2m"], 27)
        self.assertEqual(response.json()["description"], "Mainly clear")


if __name__ == "__main__":
    unittest.main()
