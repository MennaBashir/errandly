# 💰 Escrow System Logic (Critical Path)

This is the financial heart of the platform. Money must **never** flow directly Master→Runner; it always passes through a platform-controlled escrow ledger.

> 🔗 For the **implementation contract** (transactions, idempotency, code rules), see [`../03-engineering/05-escrow-implementation.md`](../03-engineering/05-escrow-implementation.md).

---

## State Machine
```
                 ┌─────────────────────────────────────────────────┐
                 │                  ESCROW LEDGER                   │
                 └─────────────────────────────────────────────────┘

  POST TASK                                            CANCEL (pre-assign)
     │                                                        │
     ▼                                                        ▼
[FUNDS_LOCKED] ──assign──> [HELD_IN_ESCROW] ──runner done──> [PENDING_APPROVAL]
     │                                                        │
     │ (refund full to Master)                                ├── approve ──> [RELEASED]
     ▼                                                        │                   │
[REFUNDED]                                                    │            split: Runner = 90%
                                                              │                   Platform = 10%
                                              dispute ──> [IN_DISPUTE] ──admin──> RELEASED / REFUNDED / SPLIT
```

## Transaction Sequence (Money Flow)
| Step | Trigger | Ledger Action | Master Balance | Runner Balance | Platform |
|------|---------|---------------|----------------|----------------|----------|
| 1 | Master posts & confirms | Charge `Task Cost` to escrow* | − (TaskCost) | — | — |
| 2 | Task assigned to Runner | Move to `HELD_IN_ESCROW` | locked | — | — |
| 3 | Runner marks complete | Move to `PENDING_APPROVAL` | locked | — | — |
| 4 | Master approves | **Release**: Runner gets 90%, Platform gets 10% | settled | + (TaskCost × 0.90) | + (TaskCost × 0.10) |
| 5a | Master cancels pre-assign | Full refund | + (TaskCost) | — | — |
| 5b | Dispute → Admin decision | Custom split | per ruling | per ruling | fee per ruling |

> *Fee model decision: the **10% commission is deducted from the Runner's payout** on release (Runner posts $10 task → Runner receives $9, platform keeps $1). Configurable to "fee-on-top" charged to Master if business prefers. This must be a single config flag, not hardcoded.

## Hard Rules (Non-negotiable)
1. **No task goes LIVE until funds are confirmed locked.** (Prevents fake tasks.)
2. **Funds are released ONLY on explicit Master approval OR Admin dispute ruling OR auto-release timer.**
3. **Auto-release safeguard:** if Master doesn't approve/dispute within `N` hours (e.g., 72h) of `PENDING_APPROVAL`, system auto-releases to Runner (prevents Masters trapping payouts).
4. **Idempotent ledger:** every escrow transition writes an immutable `ledger_entry` row with a unique `idempotency_key`.
5. **Double-entry accounting:** every movement has a debit and a credit; platform balance must always reconcile.
6. **Payout gating:** Runner cannot withdraw escrowed funds — only `RELEASED` balance is withdrawable, and only after KYC = approved.

---
➡️ Next: [`06-nfr.md`](./06-nfr.md)
