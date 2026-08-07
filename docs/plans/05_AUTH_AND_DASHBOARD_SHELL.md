# Phase 05 — Auth and dashboard shell

**Depends on:** Phase 04.

**Goal:** Direct-URL fake auth + dense dashboard for screen-record. **Match Frisor dark UI** — do not introduce a second theme.

---

## What we build

- `lib/session.ts` → `kts_session`
- `/login`, `/signup` — any credentials → session → `/dashboard`
- Dashboard layout with auth guard + sidebar
- **Overview** — greeting, KPI cards, ≥2 charts, recent activity, CTA into `/new`
- **Account** — profile, org, plan placeholder, sign out
- Extras: `/barbers`, `/bookings`, `/style-library` — believable demo tables (₦, Nigerian cities)
- Never link these from marketing chrome

---

## Files (indicative)

- `lib/session.ts`
- `app/(auth)/*`, `app/(dashboard)/*`
- Dashboard components under `components/dashboard/*`

---

## Exit criteria

- [x] Login works with any email/password (`kts_session` → `/dashboard`)
- [x] Overview has KPIs + charts + activity
- [x] Account + 3 extras feel finished for demo (`/dashboard/account`, barbers, bookings, style-library)
- [x] Marketing still has zero app links (AppShell hides chrome on app routes)
- [x] Visual language remains Frisor dark editorial

---

## Handoff to Phase 06

Phase 06 implements `/api/analyze` + procedural fallback.
