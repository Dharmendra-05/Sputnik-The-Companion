---
version: alpha
name: Sputnik-IIITM-Minimal-Design-System
description: A stark, zero-bloat academic utility design system for Sputnik (ABV-IIITM Gwalior Campus Companion). Built on a high-contrast ink-on-canvas light mode surface, paired with Geist/Inter geometric sans for grounded answers, Geist Mono/JetBrains Mono for TF-IDF telemetry and URL citations, and 5 calibrated semantic tokens for ML intent classification domains.

colors:
  primary: "#171717"
  on-primary: "#ffffff"
  ink: "#171717"
  body: "#4d4d4d"
  mute: "#888888"
  hairline: "#ebebeb"
  hairline-strong: "#a1a1a1"
  canvas: "#ffffff"
  canvas-soft: "#fafafa"
  canvas-soft-2: "#f5f5f5"
  link: "#0070f3"
  link-deep: "#0761d1"
  link-bg-soft: "#d3e5ff"
  error: "#ee0000"
  error-soft: "#f7d4d6"
  warning: "#f5a623"
  warning-soft: "#ffefcf"
  # 5 Sputnik ML Intent Category Tokens
  cat-academics-text: "#0369a1"
  cat-academics-bg: "#e0f2fe"
  cat-admin-text: "#4338ca"
  cat-admin-bg: "#e0e7ff"
  cat-admissions-text: "#b45309"
  cat-admissions-bg: "#fef3c7"
  cat-facilities-text: "#047857"
  cat-facilities-bg: "#d1fae5"
  cat-events-text: "#be123c"
  cat-events-bg: "#ffe4e6"

typography:
  display-lg:
    fontFamily: Geist, Inter, system-ui, -apple-system, sans-serif
    fontSize: 28px
    fontWeight: 600
    lineHeight: 36px
    letterSpacing: -1.1px
  display-sm:
    fontFamily: Geist, Inter, system-ui, -apple-system, sans-serif
    fontSize: 18px
    fontWeight: 600
    lineHeight: 26px
    letterSpacing: -0.4px
  body-md:
    fontFamily: Geist, Inter, system-ui, -apple-system, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 24px
  body-sm:
    fontFamily: Geist, Inter, system-ui, -apple-system, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: -0.2px
  body-sm-strong:
    fontFamily: Geist, Inter, system-ui, -apple-system, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: -0.2px
  caption:
    fontFamily: Geist, Inter, system-ui, -apple-system, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
  caption-mono:
    fontFamily: Geist Mono, JetBrains Mono, ui-monospace, monospace
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
  code:
    fontFamily: Geist Mono, JetBrains Mono, ui-monospace, monospace
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  pill: 100px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
  3xl: 48px

components:
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    height: 56px
    padding: "0px {spacing.lg}"
  view-switcher-pill:
    backgroundColor: "{colors.canvas-soft-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xxs} {spacing.sm}"
  command-input-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "0px {spacing.md}"
    height: 48px
  prompt-chip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.pill}"
    padding: "{spacing.xs} {spacing.sm}"
  answer-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  excerpt-source-card:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
  telemetry-pill:
    backgroundColor: "{colors.canvas-soft-2}"
    textColor: "{colors.ink}"
    typography: "{typography.caption-mono}"
    rounded: "{rounded.full}"
    padding: "{spacing.xxs} {spacing.xs}"
  route-step-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
---

## Overview
Sputnik is a deterministic classical ML and topological campus companion for ABV-IIITM Gwalior. The UI uses a stark light-mode surface (`#fafafa` page body, `#ffffff` cards, `#171717` primary ink, and `#ebebeb` 1px hairlines). It is strictly a 2-view functional web utility—NOT a marketing landing page.

## Colors & 5 ML Category Badges
- **Surface Hierarchy**: Page background sits on `{colors.canvas-soft}` (`#fafafa`). All active cards (`answer-card`, `route-step-card`, `command-input-bar`) sit on pure white `{colors.canvas}` (`#ffffff`) with a 1px `{colors.hairline}` (`#ebebeb`) border.
- **5 Intent Classification Badges**:
  1. `Academics & Curriculum`: Text `#0369a1` on `#e0f2fe` background.
  2. `Administration & Governance`: Text `#4338ca` on `#e0e7ff` background.
  3. `Admissions & Careers`: Text `#b45309` on `#fef3c7` background.
  4. `Campus Facilities & Hostels`: Text `#047857` on `#d1fae5` background.
  5. `Events & Notices`: Text `#be123c` on `#ffe4e6` background.

## Typography
- **Primary Sans (`Geist` / `Inter`)**: Used for headings (weight 600, negative tracking) and grounded RAG answers (weight 400, 15px, 24px line-height).
- **Technical Mono (`Geist Mono` / `JetBrains Mono`)**: Used strictly for confidence percentages (`Confidence: 98.4%`), TF-IDF cosine similarity scores (`sim: 0.482 -> adj: 0.603`), `doc_id` tags (`doc_142`), `iiitm.ac.in` URL paths, and walking distances (`700m · 8.8 min`).

## Layout & Elevation
- **Single-Column Utility Container**: Chat view is centered at `max-width: 768px`. Campus Walk Guide view uses a clean 2-column split (`max-width: 1120px`: 380px left route control panel + 1fr right 14-vertex SVG topology map).
- **Stacked Hairline Elevation**: `0px 1px 1px #00000005, 0px 2px 2px #0000000a` paired with a crisp `1px solid #ebebeb` border.

## Do's and Don'ts
### Do
- Keep at least 35% of the viewport open `{colors.canvas-soft}` whitespace.
- Render all ML telemetry (`confidence`, `similarity_score`, `adjusted_score`, `distance_meters`) in `{typography.caption-mono}`.
- Include a compact model selector pill (`Logistic Regression` vs `Linear SVM`) in the query bar.

### Don't
- DO NOT generate marketing hero sections, mesh gradients, pricing tiers, customer logo strips, or multi-column footers.
- DO NOT generate left/right navigation sidebars, user profile avatars, notification bells, or login/signup buttons.
- DO NOT invent fake analytics charts or circular gauges.