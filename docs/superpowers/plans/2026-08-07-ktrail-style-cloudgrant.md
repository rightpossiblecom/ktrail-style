# KTrail Style Cloud Grant Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

> **Canonical execution path:** follow phase docs in `docs/plans/00_OVERVIEW.md` (Phase 0→09). This file is an optional bite-sized checklist only.

**Goal:** Transform the cloned Frisor barbershop template into a Cloud Grant Wave 1 demo for **KTrail Style** — multi-barber booking + AI hairstyle previews for Nigerian barbers — then push to owner GitHub for Vercel.

**Architecture:** Keep Frisor’s Next.js 15 App Router + Tailwind visual shell **unchanged**. Add Cloud Grant marketing routes, config spine (`config/site.ts`), lead capture (localStorage), fake auth, dense hidden dashboard, and one `/api/analyze` AI loop with procedural fallback. Demote Opencals single-shop booking from primary public CTA. **Do not restyle.**

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind 4, Framer Motion, localStorage session/leads, Gemini 2.5 Flash (optional key) + fallback, pnpm preferred (npm lockfile may remain until migrated).

## Global Constraints

- Legal entity string: `K-TRAIL HAIRCUT SERVICES`; CAC: `9200929`; address: `No 19, Secretariat Near NNPC, Ikole-Ekiti, Ekiti State, Nigeria`
- Product brand: `KTrail Style`; short: `KTS`; storage keys: `kts_session`, `kts_leads`, `kts_assessments`
- Marketing CTAs only: Join waitlist, Request demo, Early access — **never** link Login/Signup/Dashboard from public chrome
- Currency when shown: `₦` with `en-NG`
- Do not paste UI from sibling CloudGrant repos (`joashlink`, `jeoseluis`, etc.)
- `/product` media order: video → ≥4 screenshots → CAC **embedded image**
- `/team` requires owner-supplied real LinkedIns before Phase 09 close
- Intake JSON must match `docs/plans/INTAKE_CONTRACT.md`
- Honest early-stage metrics only — strip Frisor fake traction (`78k+`, `80k+ cuts`)
- **STYLING LOCK:** do not change Frisor CSS, fonts, colors, or component chrome — copy/routes/config/dashboard content only

---

## File map (create / migrate)

| Path | Responsibility |
| ---- | -------------- |
| `docs/prd.md` | Product truth (done) |
| `docs/plans/*` | Overview, design, intake, assets (done) |
| `config/site.ts` | Brand, landing sections, team, pricing, demo seeds |
| `config/demo-flow.ts` | Pipeline steps + conversion modals + `hardcodeVisionDemo` |
| `lib/session.ts` `lib/leads.ts` `lib/assessments.ts` | Browser storage |
| `lib/analyze/*` | Types, prompt, procedural fallback |
| `app/(marketing)/*` | Landing, about, product, team, pricing, leads, legal |
| `app/(auth)/login` `signup` | Fake auth |
| `app/(dashboard)/*` | Overview, new, projects, account, extras |
| `app/api/analyze/route.ts` | Sole AI server route |
| `components/MarketingHeader.tsx` `MarketingFooter.tsx` `LeadForm.tsx` | Public chrome + forms |
| `public/product/*` | demo.mp4, screenshots, cac-certificate.jpg |
| `lib/site-config.ts` | Frisor legacy — migrate readers to `config/site.ts`, then delete or thin re-export |

---

### Task 0: Preflight lock

**Files:**
- Modify: none (docs already written)
- Verify: `docs/prd.md`, `docs/plans/00_OVERVIEW.md`

**Interfaces:**
- Consumes: owner answers for gaps
- Produces: go/no-go list for Phase 09 assets

- [ ] **Step 1: Confirm clone state**

```bash
cd C:\Users\mr_right\Desktop\projects\CloudGrant\ktrail-style
git remote -v
git log -1 --oneline
```

Expected: `origin` → `letsopencals/template-frisor.git`, commit present.

- [ ] **Step 2: List open owner gaps in chat**

Required before Phase 09: founder ×2 + LinkedIn, CAC file, domain confirm, GitHub repo name. Demo video/screenshots can be recorded after Task 5–8.

- [ ] **Step 3: Commit docs only (when owner asks to commit)**

```bash
git add docs/
git commit -m "docs: add KTrail Style PRD and Cloud Grant plan"
```

---

### Task 1: Repo hygiene + Cloud Grant route stubs

**Files:**
- Modify: `package.json` (name → `ktrail-style`)
- Create: `app/(marketing)/layout.tsx`, stub pages listed below
- Create: `app/(auth)/login/page.tsx`, `app/(auth)/signup/page.tsx`
- Create: `app/(dashboard)/layout.tsx` + stub pages
- Note: Existing Frisor `app/page.tsx` will move under `(marketing)` or be replaced in Task 3

**Interfaces:**
- Consumes: Frisor Next app boots
- Produces: All required routes resolve (stub copy OK)

- [ ] **Step 1: Rename package**

In `package.json` set `"name": "ktrail-style"`.

- [ ] **Step 2: Create marketing route stubs**

Create these files with minimal page shells exporting a heading:

- `app/(marketing)/product/page.tsx`
- `app/(marketing)/team/page.tsx`
- `app/(marketing)/pricing/page.tsx`
- `app/(marketing)/waitlist/page.tsx`
- `app/(marketing)/demo/page.tsx`
- `app/(marketing)/early-access/page.tsx`
- `app/(marketing)/privacy/page.tsx`
- `app/(marketing)/terms/page.tsx`

Example stub:

```tsx
export default function ProductPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-semibold">Product — KTrail Style</h1>
      <p className="mt-4 opacity-80">Stub — filled in Task 3.</p>
    </main>
  );
}
```

- [ ] **Step 3: Create auth + dashboard stubs**

Routes: `/login`, `/signup`, `/dashboard`, `/new`, `/projects/[id]`, `/account`, `/barbers`, `/bookings`, `/style-library`.

- [ ] **Step 4: Smoke run**

```bash
npm install
npm run build
```

Expected: build succeeds or only known Opencals env warnings — fix hard failures before continuing.

- [ ] **Step 5: Commit**

```bash
git add package.json app
git commit -m "chore: rename package and stub Cloud Grant routes"
```

---

### Task 2: Config spine + demo seeds

**Files:**
- Create: `config/site.ts`
- Create: `config/demo-flow.ts`
- Modify: imports that currently use `@/lib/site-config` (incremental; full cutover by Task 3)

**Interfaces:**
- Consumes: `docs/prd.md` identity + problems
- Produces: `siteConfig` + `demoFlow` typed objects used by all marketing/dashboard

- [ ] **Step 1: Create `config/site.ts`**

Must include at minimum:

```ts
export const siteConfig = {
  legalName: 'K-TRAIL HAIRCUT SERVICES',
  cacNumber: '9200929',
  natureOfBusiness: 'Beauty and salon services',
  address: 'No 19, Secretariat Near NNPC, Ikole-Ekiti, Ekiti State, Nigeria',
  brandName: 'KTrail Style',
  shortName: 'KTS',
  domain: 'ktrail.ai',
  supportEmail: 'hello@ktrail.ai',
  tagline: 'Book the chair. Preview the cut.',
  oneLiner:
    'KTrail Style gives Nigerian barbers a shared booking home and AI hair previews so clients book the right cut with confidence.',
  storageKeys: {
    session: 'kts_session',
    leads: 'kts_leads',
    assessments: 'kts_assessments',
  },
  problems: [
    { title: 'WhatsApp booking chaos', body: '...' },
    { title: 'Fear of the wrong cut', body: '...' },
    { title: 'One-shop sites do not scale the trade', body: '...' },
  ],
  stats: [
    { value: 'Multi-shop', label: 'Barber network model' },
    { value: 'AI preview', label: 'Style before you sit' },
    { value: '₦ pricing', label: 'Built for Nigeria' },
    { value: 'Ekiti → cities', label: 'Launch corridor' },
  ],
  howItWorks: [/* 3 steps */],
  pipeline: [/* multi-stage AI / booking story */],
  audiences: [/* ≥2 */],
  features: [/* ~6 */],
  testimonials: [/* 3 pilot-framed */],
  pricingTiers: [/* early-stage → waitlist/demo/early-access */],
  faq: [/* several */],
  team: [
    /* PLACEHOLDER until owner sends LinkedIns — do not invent fake founders */
  ],
  demoResults: [/* ≥2 StylePreviewResult objects per INTAKE_CONTRACT */],
} as const;
```

Fill every marketing string from PRD. Use capability metrics, not Frisor’s `78k+`.

- [ ] **Step 2: Create `config/demo-flow.ts`**

```ts
export const demoFlow = {
  hardcodeVisionDemo: true,
  pipelineSteps: [
    { id: 'upload', label: 'Read client photo' },
    { id: 'face', label: 'Estimate face shape & texture' },
    { id: 'match', label: 'Match barber-ready styles' },
    { id: 'preview', label: 'Build style preview pack' },
  ],
  modals: {
    bookChair: {
      title: 'Request a chair',
      fields: ['barberCity', 'preferredDay', 'notes'],
      successToast: 'Chair request saved for demo.',
    },
    sendToBarber: {
      title: 'Send preview to barber',
      fields: ['barberName', 'whatsapp', 'notes'],
      successToast: 'Preview queued to barber (demo).',
    },
  },
} as const;
```

- [ ] **Step 3: Add temporary re-export (optional bridge)**

```ts
// lib/site-config.ts — temporary
export { siteConfig as siteConfig } from '../config/site';
// OR keep Frisor shape mapped from new config during transition
```

Prefer updating homepage components to read new keys in Task 3 rather than forever dual-configs.

- [ ] **Step 4: Commit**

```bash
git add config lib/site-config.ts
git commit -m "feat: add KTrail config spine and demo flow"
```

---

### Task 3: Marketing site transform

**Files:**
- Create/Modify: `components/MarketingHeader.tsx`, `components/MarketingFooter.tsx`
- Modify: `app/(marketing)/layout.tsx`, `app/(marketing)/page.tsx` (landing)
- Modify: about/product/team/pricing pages
- Modify: Frisor home sections OR replace with Cloud Grant section components driven by `config/site.ts`

**Interfaces:**
- Consumes: `siteConfig` section arrays
- Produces: Public site with ≥14 landing jobs; zero auth links in chrome

- [ ] **Step 1: Ship header/footer**

Nav links: Product, Team, Pricing, About.  
CTAs: `/waitlist`, `/demo` only (Early access can live in final CTA cards).

Assert no `href="/login"` / `signup` / `dashboard` in these components.

- [ ] **Step 2: Rebuild landing section order**

Map to Cloud Grant jobs (names can match KTrail voice):

1. Hero — brand-forward KTrail Style  
2. Stats / capability bar (4)  
3. Trust / launch strip (Ekiti · Ado · Lagos · Abuja — “launching across”)  
4. Problem (3)  
5. Product showcase (booking network + AI preview mock)  
6. How it works (3)  
7. Pipeline / process (AI + book)  
8. Who it’s for (≥2)  
9. Features grid (~6)  
10. Testimonials (3 pilot-framed)  
11. Pricing preview  
12. Get in early (3 cards)  
13. FAQ  
14. Final CTA banner  

Reuse Frisor visual components where they fit (hero, process, lookbook) after copy swap; add missing blocks as new components under `components/marketing/`.

- [ ] **Step 3: About + Pricing pages from config**

- [ ] **Step 4: Product page shell (media wired in Task 9)**

Sections scaffolded now; media paths point at `public/product/*`.

- [ ] **Step 5: Team page**

Render `siteConfig.team`. If LinkedIns missing, leave explicit owner TODO in docs — do not invent people.

- [ ] **Step 6: Demote Frisor booking CTAs**

Replace primary “Book Appointment” / “Book Now” on marketing with waitlist/demo. Keep `/services` reachable only if useful for screenshots; remove from header.

- [ ] **Step 7: Visual check**

```bash
npm run dev
```

Open `/`, `/about`, `/pricing`, `/product`, `/team`. Confirm brand + multi-barber Nigeria story.

- [ ] **Step 8: Commit**

```bash
git add app components config
git commit -m "feat: transform marketing into KTrail Style Cloud Grant site"
```

---

### Task 4: Lead capture

**Files:**
- Create: `lib/leads.ts`, `components/LeadForm.tsx`, `components/FormPageShell.tsx`
- Modify: waitlist/demo/early-access pages

**Interfaces:**
- Consumes: `siteConfig.storageKeys.leads`
- Produces: `Lead` objects appended in localStorage

- [ ] **Step 1: `lib/leads.ts`**

```ts
export type Lead = {
  id: string;
  type: 'waitlist' | 'demo' | 'early-access';
  name: string;
  email: string;
  phone: string;
  city: string;
  role?: string;
  company?: string;
  need?: string;
  reason?: string;
  createdAt: string;
};

export function saveLead(lead: Omit<Lead, 'id' | 'createdAt'>) { /* append to kts_leads */ }
export function listLeads(): Lead[] { /* read */ }
```

- [ ] **Step 2: Shared `LeadForm` with success state**

Fields per PRD: waitlist (name, email, phone, city); demo (+ role, company, need); early-access (+ role, reason).

- [ ] **Step 3: Wire three pages**

- [ ] **Step 4: Manual test** — submit each form, check `localStorage.kts_leads` in DevTools.

- [ ] **Step 5: Commit**

```bash
git add lib/leads.ts components/LeadForm.tsx components/FormPageShell.tsx app
git commit -m "feat: add waitlist demo and early-access lead forms"
```

---

### Task 5: Fake auth + dashboard shell

**Files:**
- Create: `lib/session.ts`
- Modify: `(auth)/*`, `(dashboard)/layout.tsx`, overview + account + extras

**Interfaces:**
- Consumes: `kts_session`
- Produces: Guarded dashboard; Overview with KPIs + ≥2 charts + recent activity

- [ ] **Step 1: Session helpers**

```ts
export type Session = { email: string; createdAt: string };
export function getSession(): Session | null;
export function setSession(email: string): void;
export function clearSession(): void;
```

- [ ] **Step 2: Login/signup** — any credentials → `setSession` → `/dashboard`

- [ ] **Step 3: Dashboard layout** — redirect to `/login` if no session; sidebar nav: Overview, New preview, Barbers, Bookings, Style library, Account

- [ ] **Step 4: Overview density**

KPI cards (e.g. Bookings today, Active barbers, AI previews, Fill rate).  
≥2 charts (simple SVG or lightweight CSS bars — no new heavy chart dep required).  
Recent activity list seeded from `siteConfig.demoResults`.

- [ ] **Step 5: Account page** — email from session, org `KTrail Style`, plan placeholder, Sign out

- [ ] **Step 6: Extra pages** — `/barbers`, `/bookings`, `/style-library` with believable demo tables (₦ prices, Nigerian cities)

- [ ] **Step 7: Confirm marketing has zero links to these routes**

- [ ] **Step 8: Commit**

```bash
git add lib/session.ts app components
git commit -m "feat: add fake auth and KTrail dashboard shell"
```

---

### Task 6: Analyze route + fallback

**Files:**
- Create: `lib/analyze/types.ts`, `lib/analyze/prompt.ts`, `lib/analyze/procedural.ts`
- Create: `app/api/analyze/route.ts`

**Interfaces:**
- Consumes: manual brief or upload metadata
- Produces: `StylePreviewResult` JSON

- [ ] **Step 1: Types mirror intake contract**

- [ ] **Step 2: Procedural fallback** — deterministic recommendations from faceShape + requestedStyle strings (no API key)

- [ ] **Step 3: Route**

```ts
// POST /api/analyze
// body: { clientName, city, faceShape, hairTexture, requestedStyle, imageMeta? }
// if process.env.GEMINI_API_KEY → Gemini 2.5 Flash structured JSON
// else → procedural()
// always validate shape before return
```

- [ ] **Step 4: Curl/manual test without key**

```bash
curl -X POST http://localhost:3000/api/analyze -H "content-type: application/json" -d "{\"clientName\":\"Tunde\",\"city\":\"Ado-Ekiti\",\"faceShape\":\"oval\",\"hairTexture\":\"curly\",\"requestedStyle\":\"low skin fade\"}"
```

Expected: JSON with `recommendedStyles.length >= 3`.

- [ ] **Step 5: Commit**

```bash
git add lib/analyze app/api/analyze
git commit -m "feat: add style preview analyze route with fallback"
```

---

### Task 7: New preview + pipeline overlay

**Files:**
- Create: `components/demo/PipelineOverlay.tsx`
- Modify: `app/(dashboard)/new/page.tsx`
- Create: `lib/assessments.ts`

**Interfaces:**
- Consumes: `demoFlow.pipelineSteps`, `hardcodeVisionDemo`
- Produces: saved assessment id → navigate `/projects/[id]`

- [ ] **Step 1: `/new` dual mode** — Upload selfie (file input) + Manual brief form

- [ ] **Step 2: Upload path** — if `hardcodeVisionDemo`, run overlay timers, save seeded/choreographed result (no key required)

- [ ] **Step 3: Manual path** — `POST /api/analyze`, save to `kts_assessments`, navigate

- [ ] **Step 4: Commit**

```bash
git add app/(dashboard)/new components/demo lib/assessments.ts
git commit -m "feat: add new style preview flow with pipeline overlay"
```

---

### Task 8: Results + conversion modals

**Files:**
- Modify: `app/(dashboard)/projects/[id]/page.tsx`
- Create: `components/demo/BookChairModal.tsx`, `SendToBarberModal.tsx`, `DemoToast.tsx`

**Interfaces:**
- Consumes: assessment by id; `demoFlow.modals`
- Produces: full field render + working CTAs (toast, no dead ends)

- [ ] **Step 1: Render all intake fields**

- [ ] **Step 2: Primary CTAs open modals** — Book chair / Send to barber

- [ ] **Step 3: Toast on submit; write a row into overview activity (localStorage)** 

- [ ] **Step 4: Manual screen-record dry run** login → new → result → modal → overview

- [ ] **Step 5: Commit**

```bash
git add app/(dashboard)/projects components/demo
git commit -m "feat: add style preview results and conversion modals"
```

---

### Task 9: Product media, CAC, legal, purge, ship

**Files:**
- Create: `public/product/demo.mp4`, screenshots, `cac-certificate.jpg`
- Modify: `/product`, `/team`, `/privacy`, `/terms`
- Purge: Frisor Berlin/NY copy, fake traction, booking-as-primary CTAs
- Git: new GitHub remote under owner account

**Interfaces:**
- Consumes: owner assets + LinkedIns
- Produces: Phase 09 green + Vercel-ready repo

- [ ] **Step 1: Drop media into `public/product/`**

Filenames example: `demo.mp4`, `shot-dashboard.png`, `shot-preview.png`, `shot-barbers.png`, `shot-booking.png`, `cac-certificate.jpg`

- [ ] **Step 2: Wire `/product`** — video → gallery ≥4 → CAC `<Image>` with legal facts → how it works → CTA

- [ ] **Step 3: Fill real team in `config/site.ts`** from owner

- [ ] **Step 4: Privacy/terms** use legal name + honest Wave 1 data handling (leads in browser)

- [ ] **Step 5: Grep purge**

```bash
rg -n "Frisor|Berlin|Mulberry|78k|opencals|Book Appointment" app components config lib --glob '!docs/**'
```

Expected: no public marketing hits (dashboard demo strings OK only if intentional and KTrail-branded).

- [ ] **Step 6: Build**

```bash
npm run build
```

Expected: success.

- [ ] **Step 7: Point git at owner GitHub**

```bash
git remote rename origin frisor-upstream
git remote add origin https://github.com/<OWNER>/ktrail-style.git
git push -u origin main
```

- [ ] **Step 8: Owner deploys on Vercel** — import repo, no Opencals keys required for marketing+dashboard demo paths.

- [ ] **Step 9: Final commit**

```bash
git add public/product app config
git commit -m "feat: wire product media CAC team and ship blockers"
```

---

## Self-review

1. **Spec coverage:** PRD identity, multi-barber Nigeria story, AI preview loop, Cloud Grant pages, CAC embed, team, leads, hidden dashboard, GitHub/Vercel — each maps to Tasks 0–9.  
2. **Placeholder scan:** Team LinkedIns and media files intentionally gated on owner input (called out, not silent TBD in code tasks).  
3. **Type consistency:** `StylePreviewResult` / storage keys `kts_*` used consistently across Tasks 2, 6, 7, 8.

---

## Execution handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-07-ktrail-style-cloudgrant.md`.

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks  
2. **Inline Execution** — execute tasks in this session with checkpoints  

**Which approach?**
