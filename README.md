# 📈 Yield Visualizer

**A Real-Time US Treasury Yield Curve & Inversion Dashboard**

![React 19](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=flat-square&logo=fastapi)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)

The **Yield Visualizer** is a full-stack financial dashboard designed to track the US Treasury yield curve in real-time. By connecting directly to live market data, it visualizes term structures and actively monitors critical economic indicators, such as the 10Y-2Y spread (a historical predictor of economic recessions).

## ✨ Features

- **Live Data Ingestion**: A robust Python backend that fetches real-time Treasury yields using Yahoo Finance, utilizing linear interpolation to estimate delisted maturities (e.g., the 2Y Treasury).
- **Real-Time WebSockets**: Data is streamed seamlessly to the frontend via WebSockets, creating a live tick-feed experience with engineered micro-jitter for high-frequency dashboard simulations.
- **Dynamic Yield Curve**: A high-performance, canvas-based area chart (powered by lightweight-charts) that morphs as market conditions shift.
- **Inversion & Spread Monitoring**: An active watcher on the 10Y-2Y spread that triggers UI warnings when the yield curve inverts.
- **FinUI Design System**: A custom, internally-built component library featuring dense data tables, sparklines, and unified design tokens via Tailwind CSS.

---

## 🏗️ Architecture

This repository is structured as a monorepo containing three core interconnected modules:

| Module | Description | Tech Stack |
|---|---|---|
| **backend** | The data pipeline and WebSocket server. Scrapes market data, cleans it, calculates spreads, and broadcasts payloads. | Python, FastAPI, yfinance, Uvicorn |
| **finui** | The foundational design system. Exposes styled, reusable React components and centralized Tailwind design tokens. | React, Tailwind CSS |
| **yield-visualizer** | The client-facing dashboard. Establishes the WebSocket connection and orchestrates the layout and charts. | React, Vite, TypeScript |

---

## 🚀 Getting Started

To run this project locally, you will need to start both the Python backend and the Vite frontend. 

### Prerequisites
- Node.js (v18+) and pnpm
- Python (3.10+)

### 1. Start the Backend Server

Navigate to the backend directory, set up your virtual environment, and run the FastAPI server:

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
*The WebSocket server will now be listening on ws://localhost:8000/ws.*

### 2. Start the Frontend Dashboard

In a new terminal window, navigate to the frontend directory, install dependencies, and spin up the Vite development server:

```bash
cd yield-visualizer
pnpm install
pnpm dev
```
*The dashboard is now available at http://localhost:5173.*

---

## 📜 License

Distributed under the MIT License.
