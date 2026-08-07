# How we write plans (KTrail Style)

**Status:** Active — canonical method for this repo.  
**Aligned with:** Cloud Grant Wave 1 phased docs + [00_OVERVIEW.md](./00_OVERVIEW.md).

**For agents:** Read this + [00_OVERVIEW.md](./00_OVERVIEW.md), then execute the numbered phase files **in order**. Do not restyle Frisor.

---

## Folder layout

```
ktrail-style/docs/
├── prd.md
├── README.md
├── plans/
│   ├── PLANNING.md          ← this file
│   ├── 00_OVERVIEW.md       ← master + phase index
│   ├── DESIGN.md            ← STYLING LOCKED (Frisor)
│   ├── INTAKE_CONTRACT.md
│   ├── ASSETS.md
│   ├── 00_PHASE0_PREFLIGHT.md
│   ├── 01_REPO_AND_ROUTE_FOUNDATION.md
│   ├── 02_BRAND_CONFIG_AND_DEMO_DATA.md
│   ├── 03_MARKETING_SITE.md
│   ├── 04_LEAD_CAPTURE.md
│   ├── 05_AUTH_AND_DASHBOARD_SHELL.md
│   ├── 06_AI_ANALYZE_ROUTE.md
│   ├── 07_NEW_PREVIEW_AND_PIPELINE.md
│   ├── 08_RESULTS_AND_MODALS.md
│   └── 09_POLISH_QA_AND_DEMO_READY.md
└── superpowers/plans/       ← optional bite-sized task breakdown
```

## Required sections per phase doc

Depends on · Goal · What we build · Files (indicative) · Exit criteria · Handoff

## Hard rules

1. **Do not change styling** — keep Frisor CSS, fonts, colors, component chrome. Copy/routing/IA only unless a bug blocks build.
2. Execute phases **0 → 09 in order**.
3. Product truth lives in [prd.md](../prd.md).
4. Never paste UI from sibling CloudGrant repos.
