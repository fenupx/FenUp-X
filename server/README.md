# FenUp X competition security rollout

Production project: `fenup-x`. The root `firebase.json` deploys **Firestore rules only**. Functions have a separate example configuration; do not enable them by publishing Pages.

## Staged production behavior

- Students may register/select a missing class once (5–8). Existing string or numeric classes are locked. Profile saves cannot write class or role.
- A pending correction request does not change class. Stored administrators may approve a valid class through the narrow rules-authorized update. Existing score fields are untouched.
- Client writes to role, score, competition cohorts and year-qualified leaderboard entries are denied, including writes made with forged client role claims. Administrator class approval is allowed only for a stored administrator, only for valid student grades, and cannot touch scores.
- Deleting a profile requires an atomic immutable deletion marker. The same identity cannot delete/recreate its profile to bypass the class lock.
- `COMPETITION_BACKEND_READY=false`: new competition score persistence is paused, with an explicit message. Practice, exams and existing historical leaderboard reads remain available. A class correction works without Functions in this stage.
- The existing public user-read contract is preserved for legacy leaderboard compatibility. This rollout does not claim to redesign public profile privacy.

## Functions infrastructure (not deployed until billing is enabled)

Firebase production Functions require the Blaze plan: https://firebase.google.com/docs/functions/get-started . The project currently reports billing disabled. No billing activation is part of this change.

`functions/policy.mjs` and `service.mjs` provide canonical server-owned class/year profiles, transaction-based corrections, server-time September rollover, year+grade scoreboard paths, per-unit daily top-three accounting and idempotent submission IDs. The callable wrapper checks authentication and email verification. Class, role and school year are checked against stored records and server time. Old point fields are never copied or overwritten. Graduated profiles cannot submit new middle-school scores or be silently reactivated by an ordinary class correction.

Annual promotion runs September 1 at midnight Europe/Istanbul, paginates only initialized competition profiles, and uses a transaction per account. Repeats and concurrent calls cannot promote twice. New registrations baseline to the current school year. Unbaselined existing profiles are skipped; missing classes are never guessed. Catch-up is capped at graduation (never grade 9).

Score magnitude is capped at the current game's theoretical 4400 maximum and daily top-three totals are calculated on the server. **The prototype callable still receives the game result from the client; it is not a server-verified answer/anti-cheat engine.** This change protects class/role/year boundaries; it does not claim complete answer-level anti-cheat protection. The feature flag remains false while Functions deployment is unavailable.

Before activation: deploy verified Functions on Blaze, validate callable behavior with test accounts, evaluate answer-level anti-cheat separately, synchronize public entry ban/name/avatar changes, verify year/week/month display boundaries, validate deletion cleanup, then enable the flag in a separately tested release. Keep the initial rules protections active throughout.

## Read-only preview and rollback

No production profile migration is performed. A narrow production aggregate counted roles without retrieving individual student documents. The previous production rules are backed up in the private review area, outside this repository. No student record export was made.

For a future migration, first produce an authenticated aggregate of valid/missing classes and initialized/uninitialized cohorts. Any necessary per-account preview/export must have separately approved privacy scope and a private destination. Do not guess legacy registration years or move legacy scores. Per-account baselining should use an explicitly approved current-year baseline; record each before/after image privately before writing. Rollback restores only the specific affected cohort/profile documents from those before-images; never merge old points into new cohorts. Stop the scheduler and keep score writes disabled during rollback. The previous permissive rule policy is not a safe default rollback target; fix only the narrow incompatible rule after emulator tests.

## Verification

`npm ci --prefix server`, then `npm test --prefix server` with Java 21+ on PATH. Tests use only `demo-fenupx` and the local Firestore emulator. They verify real rule rejections, numeric legacy class locking, correction approvals, missing-class initialization, score isolation/idempotency, timezone boundaries, concurrent annual promotion, new registration, graduation and atomic deletion. The service transactions run against the real Firestore emulator, not an in-memory policy mock. Callable authentication wrappers, Cloud Scheduler delivery and production deployment are separate checks, not implied by these tests.
