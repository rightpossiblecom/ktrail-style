# Phase 03 — Marketing site

**Depends on:** Phase 02. [DESIGN.md](./DESIGN.md) (**styling locked**), Cloud Grant `pages-and-sections.md` jobs, [prd.md](../prd.md)

**Goal:** Public site tells the **multi-barber Nigeria + AI hairstyle preview** story. Keep Frisor look. Change copy, CTAs, and add missing section jobs / pages.

---

## What we build

### Styling rule

Reuse Frisor components, classes, and layout patterns. **Do not redesign.** New sections should visually match existing strips/ledgers/heroes.

### Landing — required content jobs (≥14)

Order may adapt slightly to Frisor section components; **do not drop jobs**:

1. Hero — **KTrail Style** brand-forward; one headline; waitlist + demo CTAs (not Book Appointment)
2. Stats / capability bar — 4 honest metrics from config
3. Trust / launch strip — Ekiti → Nigerian cities (“launching across…”)
4. Problem — 3 pains from PRD
5. Product showcase — multi-barber booking + AI preview
6. How it works — 3 steps
7. Pipeline / process — AI + book flow
8. Who it’s for — barbers + clients (+ shop owners OK)
9. Features grid — ~6
10. Testimonials — 3 pilot-framed
11. Pricing preview — early-stage → lead forms
12. Get in early — waitlist / demo / early-access cards
13. FAQ
14. Final CTA banner

### Supporting pages

- `/product` — structure now; media finalize Phase 09  
- `/about` — K-TRAIL HAIRCUT SERVICES → KTrail Style product  
- `/team` — from config (real people when owner sends LinkedIns)  
- `/pricing` — early-stage tiers  

### Chrome

- Header/footer: Product, Team, Pricing, About  
- CTAs: Join waitlist + Request demo only  
- **No** login / signup / dashboard / primary live “Book now”  
- Demote Frisor `/services` booking from main nav

---

## Files (indicative)

- Frisor home components under `components/home/*` (copy swap)
- `components/MarketingHeader.tsx` / footer (or adapt Frisor header)
- `app/(marketing)/page.tsx` and supporting pages
- New section components only if a required job is missing — styled like Frisor

---

## Exit criteria

- [x] Looks like Frisor visually; reads like KTrail marketplace
- [x] Landing covers all required jobs (14 sections in `app/page.tsx`)
- [x] No auth links in public chrome (waitlist + demo CTAs only)
- [x] No Berlin / Mulberry / “78k clients” marketing copy (purged from header/footer/home/about/product/team/pricing/config)
- [x] First useful milestone: credible startup story site (`npm run build` passes)

---

## Handoff to Phase 04

Phase 04 makes waitlist / demo / early-access forms write to `kts_leads`.
