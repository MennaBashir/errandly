# 🗓️ Parallel Execution Roadmap

> **3 squads run concurrently.** The `packages/` contract layer is built FIRST so all squads code against agreed types from day one. Each sprint = 1 week (adjust to 2 if needed).

---

## 🔑 Pre-Sprint 0 (Shared, 2–3 days — BLOCKING)
Owned by Tech Lead + 1 dev from each squad. **Must finish before Sprint 1.**
- [ ] Monorepo scaffold (Turborepo + pnpm), CI pipeline, `docker-compose.dev` (Postgres + Redis + MinIO).
- [ ] **Define `packages/schemas` + `packages/types` + `packages/api-contract`** — agree on Task/User/Escrow/Bid DTOs.
- [ ] Prisma schema v1 + first migration + seed.
- [ ] Decide processor (Stripe Connect for MVP), env conventions, branch strategy.

---

## 🟦 Sprint 1–2 — Core Infrastructure

| Squad | Sprint 1 | Sprint 2 |
|-------|----------|----------|
| **Backend (NestJS)** | Auth module (phone+OTP, JWT, refresh), Users module, RBAC guards | KYC module + S3 presigned uploads; Prisma repos; health/observability |
| **Mobile (Expo)** | Navigation shell (Expo Router), theme/NativeWind, api+socket clients, auth screens (A1–A5) | KYC onboarding (A6), Profile/Settings shells, role switch logic |
| **Web (Next.js)** | Admin auth + RBAC layout, Landing page (E1) | Users management (F3), KYC review queue (F4) |
| **AI** | Stand up FastAPI service skeleton + Docker; `/categorize` stub returning rules-based result | `/suggest-price` endpoint (heuristic from seed data) |

**Exit Criteria:** A user can sign up, verify OTP, pick a role, submit KYC; admin can log in and approve KYC.

---

## 🟩 Sprint 3–4 — Core Task Loop

| Squad | Sprint 3 | Sprint 4 |
|-------|----------|----------|
| **Backend** | Tasks module (CRUD, `/nearby` geo query), Bids module | **WebSocket gateway** (Redis adapter): `task:{id}`, `tasks:zone:{geohash}`, live bids + location; Chat module |
| **Mobile** | Post-Task wizard (C1–C4 w/o real escrow), Map Home (B1), Task Feed (D1), Task Detail (D2) | Bids/Accept (C6/D2), Task Room + live tracking (B2), Chat (B3) |
| **Web** | Tasks Monitor (F5), heatmap | Live KPI Overview (F2) wired to WebSocket |
| **AI** | Wire `/categorize` into task-create flow (real model/LLM) | `/match` ranking endpoint + `/fraud` scoring stub on task post |

**Exit Criteria:** Master posts a task → appears on Runner map in real time → Runner accepts/bids → both enter live Task Room with chat and live location. (Money still mocked.)

---

## 🟥 Sprint 5–6 — Billing, Escrow, AI, Admin & Testing

| Squad | Sprint 5 | Sprint 6 |
|-------|----------|----------|
| **Backend** | **Escrow module**: state machine + double-entry ledger; Payments (lock funds via PaymentIntent); release 90/10 split; auto-release timer (queue/cron) | Payouts + Wallet; Disputes module; Ratings; idempotency + reconciliation; full e2e tests on escrow |
| **Mobile** | Fund escrow on post (C4 real), net payout display (D2), Approve & Release (C7), Wallet (D4) | Withdraw (D5), Ratings UI, Notifications (B5/push), polish + bug bash |
| **Web** | Disputes Console (F6), Finance/Reconciliation (F7) | Fraud Queue (F8), Catalog/Config (F9), final admin polish |
| **AI** | Harden `/fraud` (velocity, device, anomalies) → write to FraudFlag | Dispute-assist summary (Phase-2 stub) + tuning |

**Exit Criteria (MVP DONE):** Full money loop — Master funds escrow → Runner completes + proof → Master approves → Runner paid 90%, platform keeps 10% → Runner withdraws. Admin can resolve a dispute and reconcile the ledger.

---

## Critical Cross-Squad Dependencies (watch these)
| Dependency | Blocks | Mitigation |
|-----------|--------|------------|
| `packages/schemas` contract | Everything | Build in Pre-Sprint 0; freeze before Sprint 1 |
| WebSocket gateway (Backend) | Mobile live tracking, Web live KPIs | Deliver by end of Sprint 3 |
| Escrow ledger (Backend) | Mobile fund/approve, Web finance/disputes | Highest risk — start Sprint 5 day 1, integration-test continuously |
| AI `/categorize` & `/suggest-price` | Post-Task wizard UX | Ship rules-based stubs early (Sprint 2) so Mobile isn't blocked |
| Payment processor sandbox keys | Escrow, payouts | Procure during Pre-Sprint 0 |

---
➡️ Dev setup: [`03-dev-setup.md`](./03-dev-setup.md) · Workflow: [`04-workflow-glossary.md`](./04-workflow-glossary.md)
