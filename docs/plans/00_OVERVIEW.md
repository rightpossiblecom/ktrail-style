# KTrail Style — master plan (Wave 1 demo)

**Created:** 7 August 2026  
**Status:** Planning — execute phases **in order**  
**Base:** Frisor template at `ktrail-style`  
**Legal:** K-TRAIL HAIRCUT SERVICES (CAC 9200929)  
**Product:** KTrail Style (KTS)  

**Method:** [PLANNING.md](./PLANNING.md)  
**PRD:** [../prd.md](../prd.md)  
**Design / styling lock:** [DESIGN.md](./DESIGN.md)  
**Intake:** [INTAKE_CONTRACT.md](./INTAKE_CONTRACT.md)  
**Assets:** [ASSETS.md](./ASSETS.md)  
**Optional bite-sized tasks:** [../superpowers/plans/2026-08-07-ktrail-style-cloudgrant.md](../superpowers/plans/2026-08-07-ktrail-style-cloudgrant.md)

---

## 1. What we are building

```
Public marketing (waitlist / demo / early access)
        │
        ▼
/product (video → screenshots → CAC image)
        │
        ▼
Direct /login (hidden) → Dashboard
        │
        ▼
New style preview → AI pipeline → Results + booking modals
```

**Styling:** keep Frisor look. Transform copy, routes, config, dashboard — **do not restyle.**

---

## 2. Why / key insight

K-TRAIL HAIRCUT SERVICES is the CAC entity. The software story is **KTrail Style**: a multi-barber booking home for Nigerian barbers + AI style previews for clients — not a single-shop Berlin barbershop site.

---

## 3. Product principles

1. **Do not change styling** — Frisor CSS/fonts/components stay  
2. **Config spine** — `config/site.ts` + `config/demo-flow.ts`  
3. **Leads only on marketing** — no login in chrome  
4. **Honest early-stage** — no fake Frisor traction numbers  
5. **Fake auth + dense dashboard** for screen-record  
6. **One Gemini route** + fallback + choreographed upload  
7. **Nigeria-first copy** — Ekiti beachhead; ₦ when money shows  

---

## 4. How to use this plan

1. Read [PLANNING.md](./PLANNING.md) + [DESIGN.md](./DESIGN.md)  
2. Keep [prd.md](../prd.md) open  
3. Execute **Phase 0 → 09 in order** (links below)  
4. First useful milestone: after **Phase 03**  
5. First demoable loop: after **Phase 08**  
6. Submission ready: after **Phase 09**  

---

## 5. Phase index (follow these)

| Phase | Document | In one sentence |
| ----- | -------- | --------------- |
| 0 | [00_PHASE0_PREFLIGHT.md](./00_PHASE0_PREFLIGHT.md) | Lock constraints, clone, gaps; no restyle |
| 01 | [01_REPO_AND_ROUTE_FOUNDATION.md](./01_REPO_AND_ROUTE_FOUNDATION.md) | Package rename + Cloud Grant route stubs |
| 02 | [02_BRAND_CONFIG_AND_DEMO_DATA.md](./02_BRAND_CONFIG_AND_DEMO_DATA.md) | Fill `config/site.ts` + `demo-flow.ts` |
| 03 | [03_MARKETING_SITE.md](./03_MARKETING_SITE.md) | Full marketing story; Frisor look kept |
| 04 | [04_LEAD_CAPTURE.md](./04_LEAD_CAPTURE.md) | Waitlist / demo / early-access → `kts_leads` |
| 05 | [05_AUTH_AND_DASHBOARD_SHELL.md](./05_AUTH_AND_DASHBOARD_SHELL.md) | Fake auth + Overview/Account/extras |
| 06 | [06_AI_ANALYZE_ROUTE.md](./06_AI_ANALYZE_ROUTE.md) | `/api/analyze` + procedural fallback |
| 07 | [07_NEW_PREVIEW_AND_PIPELINE.md](./07_NEW_PREVIEW_AND_PIPELINE.md) | `/new` + pipeline overlay |
| 08 | [08_RESULTS_AND_MODALS.md](./08_RESULTS_AND_MODALS.md) | Results + conversion modals/toasts |
| 09 | [09_POLISH_QA_AND_DEMO_READY.md](./09_POLISH_QA_AND_DEMO_READY.md) | CAC/media/team/purge/build/GitHub/Vercel |

---

## 6. Definition of done

Phase 09 checklist green + PRD ship blockers. Owner hosts on Vercel.

---

## 7. Open gaps

| Gap | Owner action |
| --- | ------------ |
| Founder names + LinkedIn ×2 | Before `/team` final |
| CAC PDF/photo | Rasterize to `public/product/cac-certificate.jpg` |
| Demo video + screenshots | After dashboard, or waive |
| Domain confirm | `ktrail.ai` vs fallback |
| GitHub repo name | Under owner account |
