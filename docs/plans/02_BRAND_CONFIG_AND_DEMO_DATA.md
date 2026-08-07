# Phase 02 — Brand config and demo data

**Depends on:** Phase 01. [prd.md](../prd.md), [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md)

**Goal:** Put all KTrail strings and ≥2 demo style-preview results in config. **Copy only — no styling changes.**

---

## What we build

- Fill `config/site.ts` from PRD: legal entity, brand, domain, problems, stats (capability only — **no Frisor 78k traction**), how-it-works, pipeline, audiences, features, testimonials (pilot-framed), pricing tiers → lead CTAs, FAQ, team placeholders, demo results
- Fill `config/demo-flow.ts`: pipeline steps, conversion modals, `hardcodeVisionDemo: true`
- Bridge or migrate `lib/site-config.ts` readers toward `config/site.ts` (can finish cutover in Phase 03)
- Storage keys: `kts_session`, `kts_leads`, `kts_assessments`

---

## Files (indicative)

- `config/site.ts`
- `config/demo-flow.ts`
- `lib/site-config.ts` (bridge or map)

---

## Exit criteria

- [x] Opening `config/site.ts` shows KTrail / K-TRAIL HAIRCUT SERVICES / CAC 9200929
- [x] ≥2 `demoResults` match intake contract (`demo-tunde-fade`, `demo-amaka-color`)
- [x] No fake mass traction metrics (capability stats only)
- [x] Zero CSS/token edits; `lib/site-config.ts` still Frisor-shaped with Phase 03 note

---

## Handoff to Phase 03

Phase 03 wires marketing pages to config and expands landing sections.
