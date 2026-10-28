<h1 align="center">Sputnik — The Companion</h1>
<p align="center">
  <b>High-Precision Classical ML Intent Routing, Grounded Corpus Retrieval, and 14-Landmark Dijkstra Navigation for ABV-IIITM Gwalior.</b>
</p>

<p align="center">
  <a href="https://github.com/Dharmendra-05/Sputnik-The-Companion">
    <img src="https://img.shields.io/github/languages/top/Dharmendra-05/Sputnik-The-Companion?style=for-the-badge" alt="Top Language">
  </a>
  <a href="https://github.com/Dharmendra-05/Sputnik-The-Companion/stargazers">
    <img src="https://img.shields.io/github/stars/Dharmendra-05/Sputnik-The-Companion?style=for-the-badge" alt="GitHub Stars">
  </a>
  <img src="https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite" alt="Vite 8">
  <img src="https://img.shields.io/badge/TailwindCSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS v4">
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
</p>

---

## 🛰️ Overview

**Sputnik — The Companion** is the official web companion interface for **Atal Bihari Vajpayee Indian Institute of Information Technology and Management (ABV-IIITM), Gwalior**.

Engineered according to a zero-bloat, stark academic utility design system ([DESIGN.md](DESIGN.md)), Sputnik provides students, faculty, staff, and campus visitors with two specialized operational utilities:
1. **Ask Sputnik**: A grounded Q&A utility that classifies queries into 5 canonical institutional domains using classical machine learning (Logistic Regression and Calibrated Linear SVM) and retrieves grounded institutional facts with official `iiitm.ac.in` citations.
2. **Campus Walk Guide**: A topological shortest-path navigation system across the 160-acre campus grid, mapping 14 landmark vertices and 20 walkway edges using a client-side Dijkstra algorithm.

Sputnik is designed with a **zero-GPU, offline-first client mirror**: it executes fully in-browser using embedded statistical TF-IDF cosine matching and Dijkstra pathfinding, while seamlessly proxying to the external Python FastAPI backend (`Dharmendra-05/Sputnik`) whenever available.

---

## ⚡ Key Capabilities

### 1. Classical ML Intent Routing & Grounded Retrieval
- **5 Intent Categories**:
  - `Academics & Curriculum` (Code `0`): Course credits, SGPA/CGPA, semester schedules, syllabi.
  - `Administration & Governance` (Code `1`): Deans, Director office, bonafide certificates, fee concessions.
  - `Admissions & Careers` (Code `2`): JoSAA/CSAB cut-offs, GATE/CCMT, placement packages, recruiters.
  - `Campus Facilities & Hostels` (Code `3`): Gangotri GH, Aravali/Nilgiri/Shivalik BH, dining mess, health center.
  - `Events & Notices` (Code `4`): Aurora cultural fest, Infotsav tech fest, Urja sports fest, circulars.
- **Dual Model Inference**: Switch between **Multinomial Logistic Regression** (~8ms) and **Calibrated Linear SVM** (~14ms).
- **Domain Score Boosting**: Incorporates a +25% (1.25x) category boost for grounded domain alignment.
- **Low-Confidence Fallback Drawer**: Queries falling below threshold confidence (<45%) or colloquial unindexed queries automatically expose urgent hotline contacts and direct administrative hotspots.
- **Smart Cross-Linking**: Query answers referencing physical landmarks automatically offer one-click routing directly into the Campus Walk Guide.

### 2. Topological Dijkstra Navigation (160-Acre Campus)
- **14 Canonical Landmarks**:
  - `main_gate` (NODE_01), `admin_block` (NODE_02), `academic_block` (NODE_03), `library` (NODE_04), `computer_center` (NODE_05), `health_center` (NODE_06), `gh` (NODE_07), `bh1` (NODE_08), `bh2` (NODE_09), `bh3` (NODE_10), `central_mess` (NODE_11), `sports_complex` (NODE_12), `guest_house` (NODE_13), `open_air_theatre` (NODE_14).
- **20 Bidirectional Walkway Edges**: Detailed with path classifications (`Perimeter avenue`, `Paved walkway`, `Garden path`, `Athletic promenade`, `Connecting corridor`) and distances in meters.
- **Turn-by-Turn Instruction Engine**: Generates ordered navigation steps, estimated walk durations, paved surface ratios, and shade factor percentages.
- **Interactive SVG Canvas**: Visualizes campus topology on an 800×520 planar projection with animated active-path highlighting, compass heading (NORTH 000°), click-to-route selection, and one-click clipboard export.

---

## 🏗️ Architecture & Tech Stack

```
                                  ┌───────────────────────────────┐
                                  │   index.html / src/main.tsx   │
                                  └───────────────┬───────────────┘
                                                  │
                                          ┌───────▼───────┐
                                          │  src/App.tsx  │
                                          └───────┬───────┘
                                                  │
                         ┌────────────────────────┴────────────────────────┐
                         ▼                                                 ▼
          ┌─────────────────────────────┐                   ┌─────────────────────────────┐
          │     Ask Sputnik View        │                   │    Campus Walk Guide        │
          │    (src/components/Chat)    │                   │   (src/components/Walk)     │
          └──────────────┬──────────────┘                   └──────────────┬──────────────┘
                         │                                                 │
          ┌──────────────┴──────────────┐                   ┌──────────────┴──────────────┐
          ▼                             ▼                   ▼                             ▼
  Browser TF-IDF / SVM          FastAPI Proxy       14-Landmark Graph        Dijkstra Shortest Path
  (groundedCorpusMirror)        (sputnikApi.ts)     (campusGraphData.ts)      (computeShortestPath)
```

- **Frontend Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) with custom typography scale and hairline borders
- **Icons & Motion**: [Lucide React](https://lucide.dev/) + [Motion](https://motion.dev/)
- **Zero-Dependency Core**: Client-side graph traversal and TF-IDF statistical scoring require 0 external runtime servers.

---

## 🗄️ Core Data Models & Schemas

All schemas and contracts are strongly typed in [`src/types/sputnik.ts`](src/types/sputnik.ts):

| Interface / Type | Purpose | Key Attributes |
| :--- | :--- | :--- |
| `ChatRequest` | Chat query payload | `query: string`, `use_svm: boolean` |
| `ChatResponse` | Grounded RAG output | `answer`, `category`, `confidence`, `model_type`, `sources`, `retrieved_excerpts`, `probabilities`, `latency_ms` |
| `RetrievedExcerpt` | Grounded corpus match | `doc_id`, `category`, `url`, `similarity_score`, `adjusted_score`, `text` |
| `LandmarkNode` | Campus vertex (14 nodes) | `id`, `name`, `shortLabel`, `category`, `x`, `y`, `nodeCode`, `description` |
| `WalkwayEdge` | Campus edge (20 edges) | `from`, `to`, `distance` (meters), `pathType` |
| `NavigationResponse` | Shortest-path route | `origin`, `destination`, `distance_meters`, `estimated_minutes`, `path_nodes`, `instructions`, `paved_percentage`, `shade_factor_percentage` |
| `TurnInstruction` | Turn-by-turn routing step| `step`, `fromName`, `toName`, `instructionText`, `distanceMeters`, `estimatedMinutes`, `pathTypeNote` |

---

## 📁 Repository Directory Structure

```
Sputnik-The-Companion/
├── .env.example              # Environment variables template
├── .gitignore                # Git exclusions (build artifacts, node_modules, envs)
├── DESIGN.md                 # Design system specification (ink, hairline, typography)
├── index.html                # Single-page application entry HTML
├── metadata.json             # Application capabilities metadata
├── package.json              # NPM dependencies and scripts
├── tsconfig.json             # Strict TypeScript compiler configuration
├── vite.config.ts            # Vite bundler with Tailwind CSS v4 plugin
├── public/
│   └── assets/               # Exported UI mockups and architectural documentation
├── design_handoff/           # Stitch-exported reference screens and HTML mockups
└── src/
    ├── App.tsx               # Root tab manager (Ask Sputnik vs Campus Walk Guide)
    ├── main.tsx              # React 19 bootstrap entrypoint
    ├── index.css             # Tailwind CSS v4 import and JetBrains Mono styles
    ├── assets/
    │   └── ASSET_MANIFEST.md # Asset slot documentation and backend integration guide
    ├── components/
    │   ├── Header.tsx        # 56px utility header, view switcher, and backend status
    │   ├── ChatView.tsx      # Command query bar, model toggle, answer & fallback card
    │   ├── WalkGuideView.tsx # Landmark selectors, route metadata, turn-by-turn stepper
    │   └── TopologyMapSVG.tsx# 160-acre interactive SVG canvas with active route pulses
    ├── data/
    │   ├── campusGraphData.ts# 14 landmarks, 20 walkway edges, and Dijkstra solver
    │   ├── campusGraphData.test.ts # Algorithmic tests for pathfinding and nodes
    │   └── groundedCorpusMirror.ts # Verified institutional corpus & 5 intent themes
    ├── services/
    │   └── sputnikApi.ts     # Offline statistical ML mirror & FastAPI proxy client
    └── types/
        └── sputnik.ts        # TypeScript data contracts and API types
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or later recommended)
- `npm` or `pnpm`

### Installation & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dharmendra-05/Sputnik-The-Companion.git
   cd Sputnik-The-Companion
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local Vite development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Run TypeScript check & tests**:
   ```bash
   npm run lint
   node --test src/data/campusGraphData.test.ts
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🔗 Connecting the Python FastAPI Microservice

By default, Sputnik operates 100% offline in the browser. To connect with the full Python backend pipeline (`Dharmendra-05/Sputnik`):

1. Start your Sputnik FastAPI backend on port 8000:
   ```bash
   uvicorn api:app --host 0.0.0.0 --port 8000 --reload
   ```

2. Create a `.env` file in this repository:
   ```bash
   cp .env.example .env
   ```

3. Configure `VITE_SPUTNIK_API_URL`:
   ```ini
   VITE_SPUTNIK_API_URL="http://localhost:8000"
   ```

4. Restart the Vite server. Sputnik will automatically detect the backend and route live chat and navigation queries through FastAPI.

---

## 📄 License & Attribution

Developed for academic and campus utility at **Atal Bihari Vajpayee Indian Institute of Information Technology and Management (ABV-IIITM), Gwalior**. Reference datasets, landmarks, and citations correspond to official IIITM Gwalior curriculum, guidelines, and campus layout.

