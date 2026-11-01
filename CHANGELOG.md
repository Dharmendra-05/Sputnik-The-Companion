# Changelog

All notable changes to the **Sputnik — The Companion** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Offline IndexedDB caching for campus landmark coordinates and user routing presets.
- Real-time campus weather overlay and precipitation-sensitive routing paths.
- Multi-modal image attachment support for student mess and facility maintenance reports.

---

## [0.3.0] - 2026-11-01

### Added
- **3-Tab Segmented Application Navigation**: Upgraded the top utility header navigation (`src/components/Header.tsx`) to support three dedicated operational tabs: `Ask Sputnik` (`chat`), `Campus Walk Guide` (`navigation`), and `Feedback & Corpus` (`feedback`).
- **Community Feedback & Corpus Contribution Portal (`src/components/FeedbackCorpusView.tsx`)**:
  - Implemented structured issue reporting across 4 operational categories: `wrong_badge` (*Wrong ML Category Badge*), `missing_link` (*Missing / Broken Official Link*), `grassroot_update` (*Grassroot Information Update*), and `route_correction` (*Walking Route / Landmark Correction*).
  - Added academic domain tagging aligned with Sputnik's 5 institutional ML categories.
  - Implemented one-click formatted plain-text clipboard generation for seamless copy-pasting to administrative committees and repository issue trackers.
  - Added client-side mock submission queue with initial campus community contributions.
- **System Initialization Telemetry Modal (`src/components/SystemInitModal.tsx`)**:
  - Added diagnostic boot dialog displaying real-time telemetry of the client-side TF-IDF vectorizer, 14-landmark graph solver, and verified institutional corpus status.
  - Embedded trigger within brand lockup and engine badge in `Header.tsx`.
  - Added URL parameter support (`?init=1`) for immediate programmatic inspection on boot.
- **Institutional Mess & Warden Grounded Corpus Entries (`src/data/groundedCorpusMirror.ts`)**:
  - Added `doc_088`: *Hostel Mess Constitution & Rotating Dietary Schedule* (`https://iiitm.ac.in/mess-regulations`).
  - Added `doc_112`: *Administrative Directory: Hostel Supervisors & Rebate Rules* (`https://iiitm.ac.in/hostel-wardens`).
- **Dynamic Dining Query Interception (`src/services/sputnikApi.ts`)**:
  - Added heuristic routing to immediately retrieve grounded meal timings and mess council contacts for dynamic queries containing `menu`, `dinner`, `today`, or `lunch`.
  - Tuned probability distribution and confidence values for colloquial dynamic queries (confidence calibrated to 38.2%).
- **Deep Walk Route Cross-Linking**:
  - Added one-click route execution in `ChatView.tsx` when user queries request navigational walks (e.g., *"Walk from Main Gate to Sports Complex"*).
  - Connected low-confidence fallback warning cards directly to the Feedback & Corpus contribution portal.
- **Stitch Design Specifications & Handoff Sync (`design_handoff/`)**:
  - Added `design_handoff/design.md`: Master companion design specification.
  - Added `design_handoff/sputnik_iiitm_minimal_design_system/DESIGN.md`: Academic design tokens and typography rules.
  - Added `design_handoff/sputnik_feedback_corpus_contribution/code.html`: Design handoff markup for feedback view.
  - Added `design_handoff/sputnik_system_initialization/`: Code markup and screen capture reference for initialization modal.

### Changed
- **Header Brand Identity**: Replaced generic icon with calibrated geometric satellite SVG vector icon conforming to ABV-IIITM Sputnik master design specification.
- **Chat View Fallback UI**: Redesigned low-confidence fallback drawers with direct hotline numbers, administrative contacts, and guidance for dynamic unindexed information.
- **Path Resolution Configuration**: Standardized alias resolution in `vite.config.ts` to `__dirname`.
- **Repository Documentation (`README.md`)**: Updated overview, architectural diagrams, file trees, and test execution instructions (`npx tsx`) to document the 3-tab layout, feedback portal, and telemetry modal.

---

## [0.2.0] - 2026-10-29

### Added
- **FastAPI Microservice Integration Client (`src/services/sputnikApi.ts`)**:
  - Added proxy communication capabilities to interface with external Python backend (`Dharmendra-05/Sputnik`) via `VITE_SPUTNIK_API_URL`.
  - Implemented backend health check probing (`/api/health`) and seamless offline fallback to the client-side mirror.
- **Vercel Deployment Configuration (`vercel.json`)**: Configured single-page application routing rewrites and build definitions for cloud hosting.
- **Package Dependency Locking**: Added `deno.lock` and unified project dependency resolutions across runtimes.
- **Algorithmic Graph Unit Tests (`src/data/campusGraphData.test.ts`)**:
  - Added Node.js test runner suite verifying landmark uniqueness (14 nodes).
  - Verified 20 bidirectional edges and Dijkstra pathfinding edge cases (same origin/dest, multi-hop traversals).

---

## [0.1.0] - 2026-10-29

### Added
- **Ask Sputnik Grounded RAG Utility**:
  - Dual-model classical ML intent classifier mirror: Multinomial Logistic Regression (~8ms) and Calibrated Linear SVM (~14ms).
  - 5 canonical classification domains: `Academics & Curriculum`, `Administration & Governance`, `Admissions & Careers`, `Campus Facilities & Hostels`, `Events & Notices`.
  - Domain score boosting (+25% / 1.25x) for category-aligned grounded excerpts.
  - In-browser TF-IDF vector space model scoring institutional documents against verified `iiitm.ac.in` sources.
  - Full confidence telemetry badges, latency tracking, and probability breakdown inspection tables.
- **Campus Walk Guide Shortest-Path Navigation**:
  - 14 canonical campus landmarks spanning 160 acres mapped as graph vertices.
  - 20 bidirectional walkway edges with classified surface types (`Paved walkway`, `Perimeter avenue`, `Garden path`, `Athletic promenade`, `Connecting corridor`).
  - Client-side Dijkstra shortest-path pathfinding algorithm ($O((|V| + |E|) \log |V|)$).
  - Turn-by-turn navigation engine estimating duration at standard campus walking velocity (80 m/min / 4.8 km/h), surface paved ratio, and shade factors.
  - Interactive SVG map (`src/components/TopologyMapSVG.tsx`) with 800×520 planar projection, compass heading, active route pulsing, and node inspection.
- **Master Design System (`DESIGN.md`)**:
  - High-contrast ink-on-canvas aesthetic (`#171717` ink on `#FAFAFA` background).
  - Hairline border system (`#EBEBEB` dividers, `#A1A1A1` focus borders).
  - Typography scale combining Geist/Inter sans-serif for answers and Geist Mono/JetBrains Mono for telemetry and code.

---

## [0.0.1] - 2026-10-28

### Added
- Initial project creation and repository initialization.
- Base project documentation, badges, and academic scope definition for ABV-IIITM Gwalior.

