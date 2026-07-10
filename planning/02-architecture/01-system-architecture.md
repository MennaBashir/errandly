# 🏗️ High-Level System Architecture
### Project: **Errandly**

How the clients, backend, data stores, and external services connect.

---

```
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│   MOBILE APP          │      │   WEB APP             │      │   LANDING PAGE        │
│   Expo / RN           │      │   Next.js (Admin)     │      │   Next.js (public)    │
│   Masters + Runners   │      │   RBAC dashboard      │      │   Marketing           │
└───────────┬──────────┘      └───────────┬──────────┘      └──────────┬───────────┘
            │   REST (HTTPS)              │   REST (HTTPS)              │
            │   WebSocket (live)          │   WebSocket (live KPIs)     │
            └──────────────┬──────────────┴────────────────────────────┘
                           ▼
            ┌──────────────────────────────────────┐
            │   API GATEWAY  (NestJS)               │
            │   Auth · Tasks · Bids · Escrow ·      │
            │   Payments · Chat · Ratings · Admin   │
            └───────┬───────────────┬───────────────┘
                    │               │
        ┌───────────▼───┐   ┌───────▼────────┐   ┌───────────────┐
        │  PostgreSQL    │   │  Redis          │   │  AI Service   │
        │  (Prisma ORM)  │   │  (cache/pub-sub │   │  FastAPI      │
        │  source of     │   │   /WS adapter)  │   │  match/fraud/ │
        │  truth + ledger│   │                 │   │  pricing/cat. │
        └────────────────┘   └─────────────────┘   └───────────────┘
                    │
        ┌───────────▼─────────────┐   ┌──────────────────┐
        │ Payment Processor        │   │ Object Storage   │
        │ (Stripe Connect / local) │   │ (S3 — proofs/KYC)│
        └──────────────────────────┘   └──────────────────┘
```

## Key Principles
- **Clients never talk to PostgreSQL, the payment processor, or the AI service directly.** Everything routes through the NestJS API.
- **PostgreSQL is the single source of truth** for money. Redis is cache/transport only.
- **Navigation model (mobile):** Expo Router (file-based). The root layout decides the stack by `auth state` + `active role`. The bottom tab bar swaps based on role (Master tabs vs Runner tabs).

## Two Clients
| Client | Tech | Users |
|--------|------|-------|
| **Mobile App** | Expo / React Native (single app, role switch) | Masters + Runners |
| **Web App** | Next.js | Admin Dashboard + public Landing Page |

---
➡️ Mobile screens: [`02-mobile-screens.md`](./02-mobile-screens.md) · Web screens: [`03-web-screens.md`](./03-web-screens.md)
