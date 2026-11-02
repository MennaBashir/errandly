# 🧱 Tech Stack Agreements (Locked)

The agreed technology choices for every layer. These are decisions, not suggestions.

---

| Layer | Decision | Rationale |
|-------|----------|-----------|
| **Monorepo** | Turborepo + pnpm workspaces | Shared types, parallel builds, caching |
| **Mobile** | Expo (RN) + **Expo Router** | File-based routing, OTA updates, fast iteration |
| **Mobile styling** | **NativeWind** (Tailwind for RN) | Shared design language with web |
| **Web** | **Next.js (App Router)** + **TailwindCSS** + **shadcn/ui** | SSR/SSG, modern DX |
| **Backend** | **NestJS** (over plain Express) | Modular DI, guards, gateways, scalable structure |
| **Database** | **PostgreSQL** (NOT Mongo) | ACID transactions are mandatory for escrow/ledger |
| **ORM** | **Prisma** | Type-safe, migrations, great DX |
| **Cache / PubSub / Queue** | **Redis** (+ BullMQ for jobs) | WS scaling, auto-release timers |
| **Real-time** | **socket.io** (Redis adapter) | Rooms, reconnection, fallback |
| **Payments** | **Stripe Connect** (escrow via separate charges/transfers) | PCI offload, marketplace payouts |
| **Storage** | **S3** (MinIO in dev) | KYC docs, task proofs |
| **AI** | **FastAPI** (Python) | ML/LLM ecosystem |
| **Client data fetching** | **TanStack Query** | Caching, retries, optimistic updates |
| **Client state** | **Zustand** | Lightweight global state |
| **Validation (shared)** | **zod** in `packages/schemas` | One contract, both sides |
| **Auth tokens** | JWT access (short) + refresh; `expo-secure-store` / httpOnly cookie (web) | Standard secure pattern |
| **Errors/Monitoring** | Sentry + structured logs (pino) | Observability |

> ⚠️ **Database decision is final: PostgreSQL.** A financial escrow ledger needs transactional integrity and relational constraints. Do not propose MongoDB for the ledger.

---
➡️ API design: [`04-api-design.md`](./04-api-design.md)
