# KTrail OS — Revamp Plan

## Product lock

**Brand:** KTrail  
**Product:** KTrail OS  
**Plain sentence:** KTrail helps barbershops turn WhatsApp requests into booked, paid chairs and returning clients.

The first buyer is a 3–10-chair independent barbershop in Lagos. KTrail is the operating system for the shop: client intake, calendar, chairs, staff, services, deposits, revenue, retention, and AI-assisted consultations. The hairstyle preview remains useful, but it is no longer the whole company.

## Seeded case

- **Shop:** Fade District
- **City:** Lekki, Lagos
- **Operator:** Amara Balogun
- **Team:** Four barbers across six chairs
- **Incoming artifact:** A WhatsApp screenshot and selfie from Tunde Adebayo asking for a low taper before a wedding
- **Live result:** Chinedu is matched for Thursday at 4:30 PM; 75 minutes; ₦8,500 service; ₦3,000 deposit
- **Connected effect:** Chair utilization moves from 67% to 75%, projected weekly revenue increases by ₦8,500, the booking enters the calendar, and Tunde receives a client record

## Flagship workflow: Smart Client Inbox

1. The operator pastes a request, uploads a WhatsApp screenshot or selfie, or uses the sample.
2. KTrail reads the request, identifies the service, estimates duration and price, matches a barber, and finds a chair.
3. A staged analysis shows concrete progress and supports leaving the page.
4. The result becomes a reviewable booking packet with service, barber, slot, price, deposit, and notes.
5. Approving the packet opens a real prefilled WhatsApp confirmation.
6. Command, Calendar, Clients, Team, and Insights update from the same persisted state.
7. Reset returns the workspace to an empty intake for a clean recording.

## Product rooms

- `/dashboard` — **Command:** today, projected revenue, occupancy, deposits, risks, and recent activity
- `/new` — **Inbox:** new client request and Smart Intake
- `/bookings` — **Calendar:** bookings across chairs and barbers
- `/clients` — **Clients:** preferences, visit history, spend, and follow-ups
- `/barbers` — **Team:** specialties, schedules, utilization, and revenue
- `/services` — **Services:** price, duration, margin, and demand
- `/insights` — **Insights:** revenue, no-shows, utilization, and returning clients
- `/style-library` — **Preview Studio:** styles and AI consultation tools tied to bookings

## Marketing and visual direction

The Frisor barbershop identity is retired. The new system uses a warm-white product canvas, near-black type, electric cobalt actions, restrained green success states, modern sans-serif typography, subtle depth, and dense operational UI.

The hero leads with the plain sentence and a live-looking Command and Smart Inbox composition. Nigerian people and shops provide customer proof below the product. Stock shop portraits, giant editorial all-caps, copper styling, Lookbook, physical Studio, and shop-floor Journal language do not lead the company.

CAC registration and the Ikole address remain on About, Privacy, Terms, and the footer legal line. They do not dominate Product. Pricing becomes credible monthly naira SaaS tiers for solo operators, multi-chair shops, and multi-location businesses.

## Authentication and demo behavior

- Signup ends on a “check your email” verification state and never opens the workspace.
- Login accepts any non-empty email and password and opens Command.
- Session and workspace survive refresh.
- Missing API, database, payment, or model keys never crash the demo.
- Shared calculations are deterministic. No random totals.

## Camera path

1. Landing hero with KTrail OS and product UI
2. Product page with Command and Smart Inbox proof
3. Sign up and see email verification
4. Log in with any credentials
5. Open the empty Command workspace
6. Use the Fade District sample in Smart Inbox
7. Watch staged analysis
8. Review barber, slot, service, price, and deposit
9. Send the WhatsApp confirmation
10. Return to Command and see utilization and revenue change
11. Open Tunde’s client record and the calendar booking

## Done when

- A stranger can repeat what KTrail does after one breath.
- The primary demo proves that an incoming request becomes revenue.
- Every product room reads the same persisted case.
- Marketing, auth, and app chrome share one KTrail OS visual system.
- Header and footer expose all public product rooms.
- Tests cover workspace transitions, calculations, reset, and WhatsApp composition.
- `pnpm test`, lint/type checks, and `pnpm build` pass without paid keys.
