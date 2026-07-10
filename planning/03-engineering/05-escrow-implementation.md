# 💸 Escrow Implementation Contract

**Read before touching any money code.** The escrow flow is the most important code in the system. **Every transition must be atomic and produce immutable ledger entries.**

> 🔗 For the business-level state machine and money-flow tables, see [`../01-business/05-escrow-logic.md`](../01-business/05-escrow-logic.md).

---

## Transition Flow (code-level)
```
LOCK     POST /escrow/lock        → PaymentIntent succeeds → EscrowAccount=FUNDS_LOCKED → task becomes OPEN
ASSIGN   POST /tasks/:id/assign   → EscrowAccount=HELD
DONE     PATCH /tasks/:id/status  → PENDING_APPROVAL (runner uploaded proof)
RELEASE  POST /escrow/:id/release → DB transaction:
             - ledger: DEBIT escrow, CREDIT runner (90%), CREDIT platform (10%)
             - Stripe transfer to Runner connected account
             - EscrowAccount=RELEASED, Task=COMPLETED
REFUND   POST /escrow/:id/refund  → only if task OPEN/cancelled → full refund to Master
DISPUTE  admin resolve            → RELEASED | REFUNDED | SPLIT(custom %)
AUTO     BullMQ job (72h)         → if PENDING_APPROVAL untouched → auto-release to Runner
```

## Implementation Rules (Non-negotiable)
1. Wrap every transition in a **Prisma `$transaction`** — DB ledger write and status update succeed or fail together.
2. Compute the 10% **server-side only** (`packages/utils/money.ts`, integer cents — never floats).
3. Enforce **idempotency** via `LedgerEntry.idempotencyKey` unique constraint.
4. Reconciliation invariant tested in CI: `SUM(platform) + SUM(runner_released) + SUM(held) == SUM(master_locked)`.
5. Commission % and auto-release window are **config values**, not constants.

## Definition of Done (escrow features)
- Unit tests for the service + an **integration test for every money path**.
- Each money path asserts the expected **immutable ledger entries** were written.
- The reconciliation invariant passes in CI.
