# PRD — KTrail Style

> Cloud Grant Wave 1 demo. Base repo: cloned Frisor (`letsopencals/template-frisor` → local `ktrail-style`).  
> Goal: marketing + product proof + hidden dashboard for screen-record. **Not** a production marketplace or live AI try-on backend.

---

## 1. Identity

| Field | Value |
| ----- | ----- |
| Legal entity | **K-TRAIL HAIRCUT SERVICES** |
| Registration / CAC no. | **9200929** (Business Name, CAMA 2020) |
| Nature of business | Beauty and salon services |
| TIN | *(not on certificate — omit until provided)* |
| Principal address | No 19, Secretariat Near NNPC, Ikole-Ekiti, Ekiti State, Nigeria |
| Registration date | 12 January 2026 |
| Brand / product name | **KTrail Style** |
| Short name / mark | **KTS** |
| Domain (primary) | **ktrail.ai** *(confirm availability; fallback `ktrailstyle.com`)* |
| Support email | hello@ktrail.ai |
| Founded year | 2026 |
| Session storage key | `kts_session` |
| Leads storage key | `kts_leads` |
| Assessments key | `kts_assessments` |
| Log prefix | `[KTrail …]` |

### Naming rules

- Public product brand: **KTrail Style**. Mark: **KTS**.
- Legal / footer company line: **K-TRAIL HAIRCUT SERVICES**.
- Footnote where needed: “A K-TRAIL HAIRCUT SERVICES product”.
- Never market this as a single physical barbershop website. Product = **multi-barber booking + AI style preview platform** for Nigerian barbers and their clients.

### Positioning

- **One-liner:** KTrail Style gives Nigerian barbers a shared booking home and AI hair previews so clients book the right cut with confidence.
- **Mission:** Help independent Nigerian barbers look professional online, fill chairs with clearer appointments, and let clients try styles before they sit down.
- **Audience:** (1) Independent barbers & small shops, (2) Clients booking cuts / trying styles, (3) Salon owners managing multiple chairs.

### Tagline (config primary)

**Book the chair. Preview the cut.**

Alternates: “Nigeria’s barber booking + style AI.” / “Every barber gets a front desk that never sleeps.”

---

## 2. Problems (exactly 3)

1. **Walk-ins and WhatsApp chaos** — Nigerian barbers lose time and revenue to no-shows, double-bookings, and “are you free?” chats with no shared calendar.
2. **Clients fear the wrong cut** — Without a preview, clients hesitate, change their mind mid-chair, or never book premium styles.
3. **One-shop websites don’t scale the trade** — A single-shop brochure site doesn’t help the network of barbers who need a marketplace-style presence under one brand.

---

## 3. Solution (Wave 1 story)

### What it is (marketing truth)

**KTrail Style** is a **multi-barber platform** for Nigeria:

- Barbers / shops list services, hours, and chairs.
- Clients discover barbers, book appointments, and use **AI Hairstyle Changer** to preview cuts/colors on their own photo.
- Legal operator: **K-TRAIL HAIRCUT SERVICES** (CAC 9200929).

### Core demo loop (operator screen-record — 5 bullets)

1. Sign in via direct `/login` (any credentials → fake session).
2. Open Overview — KPIs: bookings today, active barbers, AI previews, no-show rate.
3. Start **New style preview** (`/new`) — upload selfie *or* paste client brief (face shape / style ask).
4. Run pipeline (choreographed demo and/or `/api/analyze` with Gemini + procedural fallback).
5. Open results — recommended styles, booking CTA modal (“Send to barber” / “Request chair”), toast success; return to Overview with new activity row.

### Results fields (intake contract seeds)

See `docs/plans/INTAKE_CONTRACT.md`. Minimum shared JSON:

- `id`, `createdAt`, `clientName`, `city`, `faceShape`, `hairTexture`, `requestedStyle`, `recommendedStyles[]`, `previewNotes`, `suggestedBarberType`, `confidence`, `nextAction`

---

## 4. Base repo decision

| Item | Choice |
| ---- | ------ |
| Source | [template-frisor](https://github.com/letsopencals/template-frisor) (live ref: [template-frisor-sage.vercel.app](https://template-frisor-sage.vercel.app/)) |
| Local path | `CloudGrant/ktrail-style` |
| Visual DNA to keep | **Do not change styling.** Keep Frisor CSS/fonts/components exactly; rebrand copy/CTAs only |
| What we strip / demote | Single-shop “Book Appointment” as primary public CTA; Opencals-live booking as the *hero* story |
| What we add | Full Cloud Grant marketing IA + product media + CAC + team + lead forms + hidden dashboard + AI demo loop |

**Owner override:** Keep Frisor scaffold (do **not** `create-next-app` from zero). Transform in place. Do not paste UI from `joashlink` / `jeoseluis` / other siblings.

---

## 5. Marketing IA (required)

Public nav: **Product · Team · Pricing · About** + CTAs **Join waitlist** · **Request demo** only.  
**Forbidden on marketing:** Login, Signup, Dashboard, “Open app”, primary “Book now” that implies live production booking.

| Route | Required |
| ----- | -------- |
| `/` | Full landing ≥14 content jobs from Cloud Grant `pages-and-sections.md` |
| `/product` | Video → ≥4 screenshots → CAC **embedded image** → how-it-works / capabilities |
| `/team` | ≥2 real people + LinkedIn (owner-supplied) |
| `/about` | Story + mission + legal entity |
| `/pricing` | Early-stage tiers → lead CTAs |
| `/waitlist` `/demo` `/early-access` | Lead forms → `localStorage` |
| `/privacy` `/terms` | Legal name from config |

Frisor routes (`/services`, `/booking/*`, `/account/*` Opencals) may remain for visual density / screenshots but must **not** be primary marketing CTAs. Prefer hiding or relabeling as “preview” once Cloud Grant shell lands.

---

## 6. Hidden app (screen-record)

| Route | Role |
| ----- | ---- |
| `/login` `/signup` | Fake auth |
| `/dashboard` | Overview KPIs + ≥2 charts + recent activity |
| `/new` | Upload + manual style brief |
| `/projects/[id]` | Style preview result + modals |
| `/account` | Profile / org / plan placeholder + sign out |
| Extras (pick 3) | `/barbers`, `/bookings`, `/style-library` |

---

## 7. Team (owner must fill)

| Name | Role | LinkedIn URL |
| ---- | ---- | ------------ |
| *(owner)* | Founder | **REQUIRED** |
| *(owner)* | Co-founder / Lead | **REQUIRED** |

Wave 1 `/team` cannot ship with Frisor fictional barbers as founders.

---

## 8. Money / locale

- Currency: **₦** (en-NG) when prices appear in demo/dashboard.
- Pricing page: early-stage / waitlist framing — no fake live Stripe billing claims.

---

## 9. Assets (owner)

- [ ] CAC certificate PDF → rasterize to `public/product/cac-certificate.jpg`
- [ ] Demo walkthrough `public/product/demo.mp4`
- [ ] ≥4 product screenshots in `public/product/`
- [ ] Logo / mark (or generate KTS wordmark from Frisor logo pattern)
- [ ] Founder names + LinkedIn URLs
- [ ] Confirm domain (`ktrail.ai` vs fallback)

Frisor reference screenshots live in `docs/references/frisor/` (moved from old `docs/*.png`).

---

## 10. Out of scope (Wave 1)

- Real Opencals production store / real payments / real multi-tenant DB
- Production Gemini cost controls beyond single analyze route
- Native mobile apps
- Live marketplace inventory of real Nigerian barbers
- Shipping a working HairFastGAN model in-repo

---

## 11. Success / Phase 09 ship blockers

- [ ] Landing includes all required section jobs
- [ ] `/product`: video + ≥4 shots + CAC embedded image
- [ ] `/team`: ≥2 real people + LinkedIn
- [ ] Lead forms ×3 + privacy/terms
- [ ] Zero marketing → app auth links
- [ ] Dashboard Overview has KPIs + charts
- [ ] `pnpm build` (or `npm run build` if lockfile stays npm) clean
- [ ] Repo pushed to owner GitHub → deployable on Vercel
