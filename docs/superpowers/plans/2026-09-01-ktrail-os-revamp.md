# KTrail OS Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn KTrail Style into a product-led operating system whose Smart Client Inbox converts a WhatsApp request into a booked, paid chair and updates the whole demo workspace.

**Architecture:** A typed, deterministic workspace fixture owns the shop, requests, bookings, clients, and metrics. A small localStorage repository persists that workspace; pages consume selectors and commands rather than maintaining disconnected fake totals. Marketing and product surfaces share a new KTrail OS token system while retaining the existing Next.js App Router.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Vitest, localStorage demo persistence.

## Global Constraints

- Use pnpm only.
- Keep the existing app; do not create a second Next.js app.
- Signup verifies on screen; login with any credentials opens Command.
- Missing paid keys must not crash local or Vercel builds.
- All connected metrics must be deterministic.
- Daily operator interactions use no ornamental motion; press feedback stays under 160ms.

---

### Task 1: Workspace domain and tests

**Files:**
- Create: `lib/workspace/types.ts`
- Create: `lib/workspace/fixture.ts`
- Create: `lib/workspace/operations.ts`
- Create: `lib/workspace/operations.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `KTrailWorkspace`, `createEmptyWorkspace()`, `createSampleWorkspace()`, `approveRequest(workspace, requestId)`, `calculateMetrics(workspace)`, and `composeWhatsAppMessage(workspace, requestId)`.

- [ ] Add Vitest and a `test` script with pnpm.
- [ ] Write failing tests proving that the sample starts at 67% utilization and that approving Tunde’s request creates one booking, one client, a ₦3,000 deposit request, 75% utilization, and an ₦8,500 projected-revenue increase.
- [ ] Run `pnpm test` and confirm the tests fail because the workspace functions do not exist.
- [ ] Implement the minimal typed fixture, calculations, approval transition, and WhatsApp message composer.
- [ ] Run `pnpm test` and confirm all domain tests pass.

### Task 2: Persisted workspace repository

**Files:**
- Create: `lib/workspace/storage.ts`
- Create: `lib/workspace/storage.test.ts`
- Create: `components/workspace/WorkspaceProvider.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: Task 1 workspace factories and operations.
- Produces: `useWorkspace()` with `workspace`, `loadSample`, `approveRequest`, and `resetWorkspace`.

- [ ] Write failing repository tests for save/load, malformed storage fallback, and reset.
- [ ] Run the focused tests and verify the expected failures.
- [ ] Implement versioned localStorage serialization and the client provider.
- [ ] Mount the provider once in the root layout.
- [ ] Run the repository and domain test suites.

### Task 3: Smart Client Inbox and conversion

**Files:**
- Modify: `app/new/page.tsx`
- Modify: `app/projects/[id]/page.tsx`
- Modify: `components/demo/SendToBarberModal.tsx`
- Modify: `components/demo/BookChairModal.tsx`

**Interfaces:**
- Consumes: `useWorkspace()`, sample request, approval command, and WhatsApp composer.
- Produces: intake → staged analysis → booking review → WhatsApp handoff.

- [ ] Replace the disconnected intake state with the workspace request.
- [ ] Add sample fill for the WhatsApp screenshot/selfie brief.
- [ ] Show staged progress: reading request, identifying service, matching barber, finding chair, and preparing price/deposit.
- [ ] Present the matched barber, Thursday 4:30 PM slot, 75-minute duration, ₦8,500 price, and ₦3,000 deposit.
- [ ] Approve the request through the workspace command and open the encoded `wa.me` confirmation.
- [ ] Verify refresh persistence and reset manually.

### Task 4: Command and connected rooms

**Files:**
- Modify: `app/dashboard/page.tsx`
- Modify: `app/bookings/page.tsx`
- Modify: `app/barbers/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/style-library/page.tsx`
- Create: `app/clients/page.tsx`
- Create: `app/insights/page.tsx`
- Modify: `components/dashboard/DashboardShell.tsx`

**Interfaces:**
- Consumes: workspace and deterministic selectors.
- Produces: Command, Calendar, Clients, Team, Services, Insights, and Preview Studio views with no disconnected totals.

- [ ] Replace static overview figures with live workspace metrics.
- [ ] Show empty-state intake before the sample runs.
- [ ] Connect bookings, clients, barbers, services, and insights to the same workspace.
- [ ] Rename navigation in operator language and keep a visible reset control.
- [ ] Confirm approving Tunde changes every dependent screen.

### Task 5: Product-led visual system and marketing

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `config/site.ts`
- Modify: `app/page.tsx`
- Modify: `components/home/*`
- Modify: `components/layout/header.tsx`
- Modify: `components/layout/footer.tsx`

**Interfaces:**
- Produces: shared warm-white, near-black, cobalt, and status-green KTrail OS tokens and product-first marketing.

- [ ] Replace Fraunces/copper/dark-shop tokens with the approved visual system and optimized Next.js fonts.
- [ ] Lead the homepage with the plain sentence and a live Command/Inbox composition.
- [ ] Replace stock barber imagery in primary sections with product UI and operational customer proof.
- [ ] Reframe proof, process, capabilities, customer outcomes, and final CTA around request-to-revenue.
- [ ] Add exact-property transitions, 100–160ms active press feedback, reduced-motion handling, and touch-safe hover effects.
- [ ] Update header and footer to expose Product, Pricing, Team, Command, Inbox, Calendar, Clients, and Insights.

### Task 6: Supporting public pages

**Files:**
- Modify: `app/product/page.tsx`
- Modify: `app/pricing/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/team/page.tsx`
- Modify: `components/auth/AuthForm.tsx`
- Modify: `app/signup/page.tsx`
- Modify: `app/login/page.tsx`

**Interfaces:**
- Produces: consistent product proof, credible naira SaaS tiers, legal trust in the right place, and the required auth journey.

- [ ] Put Command and Smart Inbox before CAC proof on Product.
- [ ] Price Solo, Shop, and Multi-location plans monthly in naira with clear chair/location limits.
- [ ] Keep the CAC and physical address on About/legal surfaces.
- [ ] Add founder photos only when truthful local assets exist; otherwise use polished typographic profiles.
- [ ] Ensure signup stops at verification and login routes to Command.

### Task 7: Verification and product media

**Files:**
- Modify: `public/product/*`
- Verify: `public/robots.txt`
- Verify: `public/llms.txt`

- [ ] Run `pnpm test`.
- [ ] Run the available lint and type-check commands.
- [ ] Run `pnpm build` without paid keys.
- [ ] Test the complete camera path in the browser at desktop and mobile widths.
- [ ] Capture at least four clean product screenshots and replace stale media.
- [ ] Confirm robots and llms files describe KTrail OS and list the current routes without inventing a host.
