# 🗂️ Monorepo Folder Structure

We use a **Turborepo monorepo** with **pnpm workspaces**. This lets Backend, Web, Mobile, and AI teams work concurrently while sharing types, validation schemas, and config — eliminating drift between client and server contracts.

---

## Directory Tree

```
errandly/
├── apps/
│   ├── mobile/                         # Expo / React Native (Masters + Runners)
│   │   ├── app/                        # Expo Router (file-based routing)
│   │   │   ├── (auth)/                 # Auth flow group
│   │   │   │   ├── welcome.tsx
│   │   │   │   ├── sign-up.tsx
│   │   │   │   ├── otp.tsx
│   │   │   │   ├── role-select.tsx
│   │   │   │   └── kyc.tsx
│   │   │   ├── (master)/               # Master tab group
│   │   │   │   ├── home.tsx
│   │   │   │   ├── post-task/          # multi-step wizard
│   │   │   │   ├── my-tasks.tsx
│   │   │   │   └── task/[id]/          # detail, bids, approve
│   │   │   ├── (runner)/               # Runner tab group
│   │   │   │   ├── feed.tsx
│   │   │   │   ├── wallet.tsx
│   │   │   │   └── task/[id]/
│   │   │   ├── (shared)/               # chat, profile, notifications, settings
│   │   │   └── _layout.tsx             # root: auth + role gating
│   │   ├── src/
│   │   │   ├── features/               # FEATURE-BASED architecture
│   │   │   │   ├── auth/               # hooks, components, api, store
│   │   │   │   ├── tasks/
│   │   │   │   ├── escrow/
│   │   │   │   ├── wallet/
│   │   │   │   ├── chat/
│   │   │   │   ├── map/
│   │   │   │   └── ratings/
│   │   │   ├── components/             # shared UI primitives
│   │   │   ├── lib/                    # api client, socket, query client
│   │   │   ├── stores/                 # zustand stores
│   │   │   └── theme/                  # tokens, NativeWind config
│   │   ├── app.json
│   │   └── package.json
│   │
│   ├── web/                            # Next.js — Admin Dashboard + Landing
│   │   ├── src/
│   │   │   ├── app/                    # App Router
│   │   │   │   ├── (marketing)/        # public landing
│   │   │   │   └── (admin)/            # protected dashboard
│   │   │   │       ├── overview/
│   │   │   │       ├── users/
│   │   │   │       ├── kyc/
│   │   │   │       ├── tasks/
│   │   │   │       ├── disputes/
│   │   │   │       ├── finance/
│   │   │   │       ├── fraud/
│   │   │   │       └── config/
│   │   │   ├── features/               # feature modules (mirror domain)
│   │   │   ├── components/ui/          # shadcn/ui + Tailwind
│   │   │   └── lib/
│   │   └── package.json
│   │
│   ├── api/                            # NestJS backend (modular/layered)
│   │   ├── src/
│   │   │   ├── modules/                # DOMAIN MODULES (clean architecture)
│   │   │   │   ├── auth/               # controller, service, repo, dto, guards
│   │   │   │   ├── users/
│   │   │   │   ├── kyc/
│   │   │   │   ├── tasks/
│   │   │   │   ├── bids/
│   │   │   │   ├── escrow/             # CRITICAL: ledger, state machine
│   │   │   │   ├── payments/           # Stripe/processor integration
│   │   │   │   ├── payouts/
│   │   │   │   ├── wallet/
│   │   │   │   ├── chat/               # WebSocket gateway
│   │   │   │   ├── ratings/
│   │   │   │   ├── disputes/
│   │   │   │   ├── notifications/
│   │   │   │   ├── admin/
│   │   │   │   └── ai-gateway/         # proxies to ai-service
│   │   │   ├── common/                 # guards, interceptors, filters, pipes
│   │   │   ├── infra/                  # prisma, redis, s3, queue
│   │   │   ├── config/
│   │   │   └── main.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   └── package.json
│   │
│   └── ai-service/                     # Python / FastAPI
│       ├── app/
│       │   ├── routers/                # categorize, pricing, fraud, match
│       │   ├── services/               # model wrappers
│       │   ├── models/                 # ML artifacts / prompts
│       │   └── main.py
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/                           # SHARED CODE (the contract layer)
│   ├── types/                          # shared TS types (Task, User, Escrow…)
│   ├── schemas/                        # zod schemas (single source of truth)
│   ├── api-contract/                   # API route + DTO definitions, ts-rest/OpenAPI
│   ├── ui/                             # shared design tokens (web ↔ mobile-safe)
│   ├── config-eslint/
│   ├── config-tsconfig/
│   └── utils/                          # money math, geohash, formatters
│
├── infra/                              # DevOps
│   ├── docker/                         # docker-compose.dev.yml (pg, redis, minio)
│   ├── k8s/                            # manifests (prod)
│   └── ci/                             # GitHub Actions workflows
│
├── docs/                               # this Spec-Kit lives here
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Why this structure
- **`packages/schemas` + `packages/types`** are the **contract**: backend validates with the same zod schemas the clients use → no API drift, fully typed end-to-end.
- **API = layered modules** (controller → service → repository) = clean architecture per domain.
- **Clients = feature-based** = each feature owns its UI, hooks, api calls, and state.
- **`escrow` is isolated** as its own module with its own ledger and state machine — auditable and testable in isolation.

---
➡️ Database schema: [`02-database-schema.md`](./02-database-schema.md)
