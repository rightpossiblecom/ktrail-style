# Phase 04 — Lead capture

**Depends on:** Phase 03.

**Goal:** `/waitlist`, `/demo`, `/early-access` save leads to `localStorage` key `kts_leads`. Success states. No backend.

---

## What we build

- `lib/leads.ts` — save/list leads
- Shared `LeadForm` + page shell using **Frisor form/field styles** (no new design system)
- Waitlist: name, email, phone, city  
- Demo: + role, company, need  
- Early access: + role, reason  

---

## Files (indicative)

- `lib/leads.ts`
- `components/LeadForm.tsx`, `FormPageShell.tsx`
- `app/.../waitlist|demo|early-access/page.tsx`

---

## Exit criteria

- [x] All three forms persist to `kts_leads`
- [x] Success UI works
- [x] Styling still Frisor-consistent

---

## Handoff to Phase 05

Phase 05 adds fake auth + dashboard shell (hidden from marketing).
