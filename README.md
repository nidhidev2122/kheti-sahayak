# Kheti Sahayak

Kheti Sahayak is an agricultural GenAI project for farmers and farmland managers. It keeps the original landing and workspace-selection screens and adds a working authentication step after role selection, an agricultural AI copilot, crop-photo analysis, a calendar, live weather, and crop-economics calculators.

## Stack

- Frontend: React, TypeScript, Vite, Lucide
- Authentication: Supabase Auth (email/password)
- API: FastAPI
- GenAI: OpenAI Chat Completions API; vision-enabled model for uploaded crop images
- Weather: Open-Meteo geocoding and forecast API

## Quick start

Read [START_HERE.md](START_HERE.md) for environment configuration and full steps.

## Environment variables

`client/.env` (copy from `client/.env.example`):

- `VITE_SUPABASE_URL`: your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` or `VITE_SUPABASE_ANON_KEY`: browser-safe public key
- `VITE_API_URL`: optional deployed backend URL; local default is `http://localhost:8000`

`backend/.env` (copy from `backend/.env.example`):

- `OPENAI_API_KEY`: your OpenAI API key
- `OPENAI_MODEL`: defaults to `gpt-4o-mini`
- `CORS_ORIGINS`: comma-separated frontend origins

Never commit `.env` files or expose an OpenAI key or Supabase service-role key in the frontend.

## GenAI pipeline

1. **Input and context:** question, user role, crop/land use, location, soil, farm size, optional crop image.
2. **Prompt assembly:** context is placed into an agricultural decision-support prompt.
3. **Model inference:** FastAPI sends the request to the configured OpenAI model.
4. **Safety-aware response:** guidance separates assumptions from facts and flags high-impact decisions for local expert verification.

## Current data boundaries

Supabase is used for authentication. Calendar entries are saved in browser local storage. The crop calculator computes estimates from user-provided assumptions. The landlord/farmer overview still includes some illustrative demo content and does not yet persist farm, tenant, lease, or payment records in a shared database. AI output is advisory and should be verified for high-impact crop, pesticide, legal, and financial decisions.

## Checks

```bash
npm run check
python -m unittest discover -s backend/tests -v
```
