# 🌱 Kheti Sahayak — AI-Powered Agriculture Assistant

**Your AI-Powered Farming Companion**

An AI-powered agriculture platform designed to make farming information and digital agricultural tools more accessible.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![NVIDIA](https://img.shields.io/badge/NVIDIA_API-76B900?style=for-the-badge&logo=nvidia&logoColor=white)
---

## 🚀 Live Demo

Try it now: https://kheti-sahayak.netlify.app/

## 📌 Overview

Kheti Sahayak is an AI-powered agriculture assistant designed to help farmers access agricultural guidance, crop-related insights, weather information, and farming tools through a unified platform.

Farmers often need to rely on multiple sources for crop guidance, weather updates, and agricultural information. Accessing reliable, understandable information can be challenging, particularly when decisions about crop health, cultivation, and farm expenses directly affect their livelihoods.

Kheti Sahayak aims to simplify this process by bringing AI-assisted agricultural guidance and useful farming utilities into one accessible application.

## 🚨 Problem Statement

Farmers face several challenges when accessing and using agricultural information:

- **Scattered Information:** Farming guidance, weather updates, and crop-related resources are often spread across different platforms.
- **Crop-Related Challenges:** Identifying crop issues and finding relevant guidance can be difficult without accessible digital tools.
- **Decision-Making Difficulties:** Farmers need understandable information to support decisions about cultivation and farm management.
- **Technology Accessibility:** Complex interfaces and technical terminology can make digital agricultural tools harder to use.

Kheti Sahayak addresses these challenges through a unified platform that combines an AI chatbot with crop-related tools and agricultural information.

## ✨ Features

### 1. AI-Powered Agriculture Chatbot

- Provides a conversational interface for agricultural questions.
- Uses NVIDIA API integration to enable AI-generated responses.
- Helps users access farming guidance through natural-language interactions.

### 2. Crop Image Analysis

- Provides a crop-image analysis feature for exploring crop-related issues.
- Helps users investigate potential crop health concerns through image-based input.

*Note: Confirm the exact analysis capabilities supported by your current implementation before describing this as disease detection.*

### 3. Weather Information

- Integrates weather information to support farming decisions.
- Uses Open-Meteo for weather data, if configured in the application.

### 4. Crop Economics Tools

- Includes tools related to crop costs and agricultural economics.
- Helps bring relevant farming information into one platform.

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React, TypeScript | Interactive user interface |
| Styling | CSS | Layout and visual design |
| Backend API | FastAPI, Python | Backend logic and API endpoints |
| Database / Backend Services | Supabase | Data storage and backend services, where implemented |
| AI Integration | NVIDIA API | AI-powered chatbot functionality |
| Weather Data | Open-Meteo | Weather information, where integrated |
| Development Tools | Git, GitHub, VS Code | Development and version control |

## 🏗 Architecture

The application follows a frontend-backend architecture:

1. **Frontend:** React and TypeScript provide the user interface and interactive features.
2. **Backend:** FastAPI handles supported backend operations and API requests.
3. **AI Integration:** NVIDIA API enables AI-powered chatbot responses.
4. **Data Services:** Supabase supports the database or backend functionality used by the application.
5. **External Data:** Open-Meteo provides weather information if enabled in the current build.

## 🚀 Local Setup Guide

### Prerequisites

- Python 3.10+
- Node.js and npm
- Git
- NVIDIA API key for AI features
- Supabase credentials if required by your configuration

### 1. Clone the Repository

```bash
git clone https://github.com/nidhidev2122/kheti-sahayak.git
cd kheti-sahayak
```

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**Windows:**
```bash
venv\Scripts\activate
```

**macOS / Linux:**
```bash
source venv/bin/activate
```

Install dependencies if a `requirements.txt` file is present:

```bash
pip install -r requirements.txt
```

Configure the environment variables required by your backend, using the variable names expected by your code. For example:

```env
NVIDIA_API_KEY=your_api_key_here
```

Start the server using the entry point configured in your project. If the application uses `main.py` with a FastAPI instance named `app`, the command may be:

```bash
uvicorn main:app --reload
```

### 3. Set Up the Frontend

Open a new terminal and navigate to the frontend directory containing `package.json`:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

**Important:** The directory names, environment variable names, and startup commands above are examples. Check your repository structure and source code to confirm the exact commands before publishing this guide.

## 🔮 Future Enhancements

Potential improvements for future versions include:

- **Regional Language Support:** Add interfaces and agricultural guidance in Indian regional languages.
- **Smart Notifications:** Provide relevant weather alerts and reminders for farming activities.
- **Crop Planning Tools:** Add features to help farmers compare crop options and plan cultivation.
- **Expanded Agricultural Knowledge Base:** Incorporate reliable agricultural resources to improve the relevance of AI responses.

These are potential future enhancements, not claims about existing functionality.

## ⚖️ Disclaimer

Kheti Sahayak is an informational tool intended to support agricultural learning and decision-making. AI-generated responses and image-based insights may be inaccurate or incomplete. Users should verify important agricultural recommendations with qualified agricultural experts or trusted local resources before acting on them.

