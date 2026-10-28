# Sputnik Asset Manifest & Python Backend Integration Guide

## Overview
This standalone web companion for **ABV-IIITM Gwalior** runs completely standalone in the browser using an embedded statistical TF-IDF engine and Dijkstra solver.

To connect this frontend to your Python FastAPI backend (`Dharmendra-05/Sputnik`), configure your environment as outlined below.

---

## 1. Connecting the Python FastAPI Backend

When running the Python repository locally:
1. Start your Sputnik FastAPI service:
   ```bash
   cd Sputnik
   uvicorn api:app --host 0.0.0.0 --port 8000 --reload
   ```

2. In this frontend directory, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Set the backend URL in `.env`:
   ```ini
   VITE_SPUTNIK_API_URL="http://localhost:8000"
   ```

4. Restart Vite (`npm run dev`). Sputnik will automatically detect the backend and route:
   - `POST /api/chat` -> Intent classification and grounded RAG answer synthesis
   - `GET /api/navigate?from={origin}&to={destination}` -> Dijkstra pathfinding
   - `GET /api/landmarks` -> Available campus landmark nodes

If the FastAPI service is unreachable or offline, Sputnik seamlessly falls back to its deterministic in-browser classical engine with zero disruption.

---

## 2. Static Asset Slots

If you wish to drop in official institute graphics or ML evaluation plots after downloading the `.zip`:
- `src/assets/iiitm_logo.svg`: Official Atal Bihari Vajpayee IIITM Gwalior insignia.
- `src/assets/results/kmap_pca_clusters.png`: 2D PCA semantic cluster projection.
- `src/assets/results/confusion_matrix.png`: Normalized confusion matrix across the 5 domains.
