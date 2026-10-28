# Kheti Sahayak — Start Here

**The original Home/landing screen and “Choose your workspace” screen are preserved.** Authentication appears only after the user chooses Farmer or Landlord. The existing workspace/dashboard styling is retained; functional calendar, weather, and calculator tools are added inside it.

## 1. Configure Supabase authentication

From the project root:

```bash
cp client/.env.example client/.env
```

Open `client/.env` and set your Supabase Project URL and browser-safe **publishable/anon key**. Never put a Supabase service-role key in the frontend. In Supabase Dashboard → Authentication → URL Configuration, allow `http://localhost:5173`. If email confirmation is enabled, verify the sign-up email before signing in.

## 2. Start the frontend (Terminal 1)

From the project root:

```bash
npm install
npm run check
npm run dev
```

Open the Vite URL shown (normally `http://localhost:5173`).

## 3. Start the AI + weather backend (Terminal 2)

From the project root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Open `backend/.env`, set your own OpenAI API key, then run:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Check `http://localhost:8000/api/health`. The API returns `provider_configured: true` only when a key is set. AI needs a valid OpenAI key and provider billing/access; live weather needs backend internet access.

## Functional tools

- **AI Farm/Land Guide:** sends question and context to FastAPI; supports JPG/PNG/WEBP crop images under 8 MB; shows the four-stage GenAI pipeline.
- **Crop Calendar:** month navigation, day selection, add/remove reminders; events persist in the browser's local storage.
- **Weather:** queries Open-Meteo geocoding, current conditions, and five-day forecast through the backend.
- **Season planner / Profit Tracker:** calculates revenue, total costs, net result, and margin from editable assumptions; can prefill a review question for the AI Copilot.
- Other original overview and landlord/farmer sections remain visually present, but some cards still contain illustrative demo data rather than records from a shared database.

## Tests

Frontend TypeScript check:

```bash
npm run check
```

Backend tests (from project root, after installing backend requirements):

```bash
python -m unittest discover -s backend/tests -v
```

Calendar events and calculator inputs are currently browser-local, not synced between devices or users. Authentication is Supabase-backed; farm records and landlord portfolio data are not yet backed by a persistent application database.
