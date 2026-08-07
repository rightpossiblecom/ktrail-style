# Phase 09 — Polish, QA, demo ready

**Depends on:** Phases 0–08. [ASSETS.md](./ASSETS.md). Owner supplies CAC, team LinkedIns, media (or waives).

**Goal:** Ship blockers green. Purge Frisor single-shop residue from marketing. Push to owner GitHub for Vercel. **Still do not restyle.**

---

## What we build

- `public/product/demo.mp4` + ≥4 screenshots + `cac-certificate.jpg`
- `/product`: video → screenshots → **embedded CAC image** + legal facts → how-it-works → CTA
- `/team`: ≥2 real people + LinkedIn from owner
- `/privacy`, `/terms` finalized for K-TRAIL HAIRCUT SERVICES
- Grep purge marketing for: Frisor, Berlin, Mulberry, 78k, Book Appointment as primary CTA
- `npm run build` clean
- Retarget git remote to owner GitHub; owner deploys Vercel

---

## Screen-record + pages checklist

- [ ] Landing ≥14 required jobs
- [ ] `/product`: video + ≥4 shots + CAC embedded image
- [ ] `/team`: ≥2 real + LinkedIn
- [ ] Lead forms ×3 + privacy/terms
- [ ] No marketing → `/login` links
- [ ] Dashboard Overview KPIs + charts
- [ ] New → pipeline → results → modals
- [ ] Works without `GEMINI_API_KEY` if choreography/fallback set
- [ ] Styling still Frisor (no accidental theme rewrite)
- [ ] Build passes

---

## Files (indicative)

- `public/product/*`
- Marketing product/team/legal pages
- `config/site.ts` team entries
- README run + deploy notes

---

## Exit criteria

- [ ] All ship blockers checked
- [ ] Repo on owner GitHub
- [ ] Ready for Vercel host + compute-credit demo recording

---

## Handoff

Wave 1 complete. Wave 2 (real multi-tenant / real AI try-on) is a later repo.
