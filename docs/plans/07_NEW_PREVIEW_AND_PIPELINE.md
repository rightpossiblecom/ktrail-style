# Phase 07 — New preview and pipeline

**Depends on:** Phase 06. `config/demo-flow.ts`

**Goal:** `/new` supports upload + manual brief; choreographed pipeline when `hardcodeVisionDemo` is true; save to `kts_assessments`; navigate to results.

---

## What we build

- `/new` dual mode UI (Frisor form styles)
- `PipelineOverlay` using `demoFlow.pipelineSteps`
- Upload path: timed choreography → seeded/choreographed result (reliable no-key demo)
- Manual path: `POST /api/analyze` → save → `/projects/[id]`
- `lib/assessments.ts`

---

## Files (indicative)

- `app/(dashboard)/new/page.tsx`
- `components/demo/PipelineOverlay.tsx`
- `lib/assessments.ts`

---

## Exit criteria

- [x] Both modes reach a project result id
- [x] Overlay feels recordable without API key
- [x] No restyle of global theme

---

## Handoff to Phase 08

Phase 08 finishes results page + conversion modals/toasts.
