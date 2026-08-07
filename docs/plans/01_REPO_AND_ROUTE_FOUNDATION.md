# Phase 01 — Repo and route foundation

**Depends on:** Phase 0. Frisor app already exists (owner override — no fresh `create-next-app`).

**Goal:** Package rename + Cloud Grant route stubs so later phases have URLs to fill. **Do not change styling.**

---

## Why this is now

Frisor ships single-shop booking routes. Cloud Grant needs marketing IA (`/product`, `/team`, leads, legal) and a hidden dashboard. Stubs first, polish later.

---

## What we build

- Rename `package.json` → `"name": "ktrail-style"`
- Add route stubs (minimal pages, **reuse Frisor layout/CSS** — no new theme):
  - Marketing: `/product`, `/team`, `/pricing`, `/waitlist`, `/demo`, `/early-access`, `/privacy`, `/terms` (about may already exist — keep Frisor about until Phase 03 rewrites copy)
  - Auth (hidden): `/login`, `/signup`
  - Dashboard (hidden): `/dashboard`, `/new`, `/projects/[id]`, `/account`, `/barbers`, `/bookings`, `/style-library`
- Keep existing Frisor pages (`/`, `/services`, `/booking/*`, etc.) running
- Empty `config/site.ts` + `config/demo-flow.ts` shells OK if filled in Phase 02
- **Do not** edit color tokens, fonts, or restyle components

---

## Files (indicative)

- `package.json`
- `app/(marketing)/…` or parallel routes matching Next conventions without breaking Frisor root layout
- `app/(auth)/…`, `app/(dashboard)/…`
- `config/site.ts`, `config/demo-flow.ts` (stubs)

---

## Exit criteria

- [x] App still looks like Frisor visually (no CSS/token edits)
- [x] New routes resolve with stub headings (`StubPage` + Frisor CSS vars)
- [x] `npm run build` passes (`.env.local` placeholders for Opencals/AUTH; gitignored)
- [x] No sibling CloudGrant UI pasted
- [x] Cloud Grant account stub at `/dashboard/account` (Frisor `/account` preserved)

---

## Handoff to Phase 02

Phase 02 fills config with KTrail brand/copy/demo seeds.
