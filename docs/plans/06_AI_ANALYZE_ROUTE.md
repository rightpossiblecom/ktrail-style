# Phase 06 — AI analyze route

**Depends on:** Phase 05. [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md)

**Goal:** `POST /api/analyze` returns `StylePreviewResult`. Gemini if key present; else procedural fallback. No styling work.

---

## What we build

- `lib/analyze/types.ts` — intake contract types
- `lib/analyze/prompt.ts` — Gemini prompt for style preview pack
- `lib/analyze/procedural.ts` — deterministic fallback
- `app/api/analyze/route.ts` — sole AI server route
- Validate JSON shape before response

---

## Files (indicative)

- `lib/analyze/*`
- `app/api/analyze/route.ts`
- Optional `.env.example` note for `GEMINI_API_KEY`

---

## Exit criteria

- [x] Works without API key (fallback)
- [x] Response matches intake contract
- [x] No Frisor/Berlin language in generated objects

---

## Handoff to Phase 07

Phase 07 builds `/new` upload + manual + pipeline overlay.
