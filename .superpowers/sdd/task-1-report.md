# Task 1 report

## Changed files

- `lib/workspace/types.ts`
- `lib/workspace/fixture.ts`
- `lib/workspace/operations.ts`
- `lib/workspace/operations.test.ts`
- `package.json`
- `pnpm-lock.yaml`
- Removed `package-lock.json`

## Red / green

- RED: `pnpm test -- lib/workspace/operations.test.ts` — failed as expected because `./fixture` did not exist.
- GREEN: `pnpm test -- lib/workspace/operations.test.ts` — 1 file passed, 6 tests passed.
- FULL: `pnpm test` — 1 file passed, 6 tests passed.
- DOMAIN TYPES: `pnpm exec tsc --noEmit --strict --noUncheckedIndexedAccess --target ES2017 --module esnext --moduleResolution bundler --skipLibCheck lib/workspace/types.ts lib/workspace/fixture.ts lib/workspace/operations.ts lib/workspace/operations.test.ts` — passed.
- INITIAL REPOSITORY TYPES: `pnpm exec tsc --noEmit` — failed because the first pnpm migration resolved `@opencals/storefront-sdk` 0.3.13 instead of the package-lock's compatible 0.3.1. This was introduced by Task 1 and was not pre-existing.

## Review fix

Fix files:

- `package.json`
- `pnpm-lock.yaml`
- `.superpowers/sdd/task-1-report.md`

The OpenCals dependency is now pinned as `"@opencals/storefront-sdk": "0.3.1"`. The pnpm lockfile was rebuilt by importing the original package-lock graph before adding the current Task 1 dependency state. `pnpm install --frozen-lockfile` confirmed the installed SDK changed from 0.3.13 to 0.3.1.

Exact review verification:

- `pnpm test -- lib/workspace/operations.test.ts` — exit 0; 1 test file passed and 6 tests passed.
- `pnpm test` — exit 0; 1 test file passed and 6 tests passed.
- `pnpm exec tsc --noEmit` — exit 0 with no diagnostics.
- `pnpm list @opencals/storefront-sdk --depth 0` — reports `@opencals/storefront-sdk 0.3.1`.

## Commit hash

Implementation commit: `fec2494`
Dependency compatibility fix commit: `7671ec7`

## Self-review

- The fixtures use every required sample value verbatim and keep all calculations deterministic.
- Approval returns a new workspace and new collections without mutating its input.
- Re-approval is idempotent and cannot duplicate the booking, client, deposit, or activity event.
- Metrics derive revenue, deposits, clients, bookings, and utilization from workspace data.
- Domain modules use no browser APIs or runtime dependencies.

## Concerns

- None. The focused tests, complete test command, and full repository TypeScript check all pass after restoring OpenCals 0.3.1.
