# Phase 0 — Preflight

**Depends on:** [prd.md](../prd.md), [DESIGN.md](./DESIGN.md), [PLANNING.md](./PLANNING.md)

**Goal:** Lock constraints, confirm Frisor clone, list owner gaps — no product code changes required.

---

## What we build

- Confirm `ktrail-style` is a working Frisor clone (`git remote`, `npm install` / build smoke optional).
- Confirm docs index exists (overview + phases + PRD).
- Record open gaps: founders + LinkedIn ×2, CAC file, domain, GitHub repo name, demo media.
- Restate styling lock: **do not change Frisor styling**.

---

## Files (indicative)

- `docs/prd.md`, `docs/plans/*` (already present)
- No app code required

---

## Exit criteria

- [x] Clone present at `CloudGrant/ktrail-style` (`origin` → letsopencals/template-frisor @ 7a5a2d9)
- [x] PRD + phase docs readable (`docs/prd.md`, `docs/plans/` Phase 0–09)
- [x] Owner gaps listed in [00_OVERVIEW.md](./00_OVERVIEW.md) §7 (founders/LinkedIn, CAC, domain, GitHub, media)
- [x] Team agrees: copy/routes/config only — **no restyle** (see [DESIGN.md](./DESIGN.md))

---

## Handoff to Phase 01

Phase 01 adds Cloud Grant route stubs and package rename without touching visual tokens.
