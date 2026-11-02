# 🗃️ Database Schema (Core Entities — Prisma)

PostgreSQL via Prisma. This is the source of truth for all data, especially money.

---

```prisma
model User        { id  role(MASTER|RUNNER|BOTH)  phone  email  kycStatus  rating  ... }
model KycSubmission { id  userId  idDocUrl  selfieUrl  status  reviewedBy ... }
model Task        { id  ownerId  category  description  lat  lng  amount  mode(INSTANT|BIDDING)
                    status(DRAFT|OPEN|ASSIGNED|IN_PROGRESS|PENDING_APPROVAL|COMPLETED|DISPUTED|CANCELLED)
                    escrowStatus  assignedRunnerId  proofUrls[] ... }
model Bid         { id  taskId  runnerId  amount  etaMinutes  message  status ... }
model EscrowAccount { id  taskId  amount  status(FUNDS_LOCKED|HELD|PENDING_APPROVAL|RELEASED|REFUNDED|SPLIT) }
model LedgerEntry { id  escrowId  type(DEBIT|CREDIT)  account(MASTER|RUNNER|PLATFORM)  amount
                    idempotencyKey(unique)  createdAt }   // immutable, double-entry
model Wallet      { id  userId  availableBalance  pendingBalance }
model Payout      { id  userId  amount  destination  status(PENDING|PAID|FAILED) }
model Dispute     { id  taskId  openedBy  reason  status  resolution  resolvedBy }
model Rating      { id  taskId  raterId  rateeId  stars  comment }
model Message     { id  taskId  senderId  body  imageUrl  createdAt }
model FraudFlag   { id  subjectType  subjectId  score  reasons[]  status }
```

## Notes
- **`LedgerEntry` is append-only and immutable** — never updated or deleted. It is the audit trail for all money movement.
- **`EscrowAccount.status`** mirrors the escrow state machine (see [`05-escrow-implementation.md`](./05-escrow-implementation.md)).
- All monetary fields are stored as **integer cents**, never floats.

---
➡️ Tech stack: [`03-tech-stack.md`](./03-tech-stack.md)
