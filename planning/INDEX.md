# 🏃 Errandly — Product Specification Kit (Spec-Kit)
### On-Site Physical Freelancing Marketplace

> **One-liner:** Uber-for-errands. Masters post real-world physical tasks, fund them into escrow, and Runners execute on-site for a payout (platform takes 10%).

This is the **master index** of the entire spec. Documentation is split into four folders by audience/concern. Start here, then jump to whatever you need.

---

## 📁 How this Spec-Kit is organized

```
planning/
├── INDEX.md                ← you are here (master index)
├── 01-business/            ← WHAT we're building & WHY  (Product/CTO)
├── 02-architecture/        ← system design & every screen (Architects/Designers)
├── 03-engineering/         ← HOW to build it (Engineers)
└── 04-operations/          ← WHO builds what & WHEN (Team leads/PM)
```

---

## 📂 01-business/ — Product & Requirements
*Audience: founders, product, stakeholders. The "what" and "why".*

| File | What's inside |
|------|---------------|
| [`01-overview.md`](./01-business/01-overview.md) | Executive summary, value proposition, revenue model, business objectives (KPIs), out-of-scope |
| [`02-personas-workflows.md`](./01-business/02-personas-workflows.md) | The 3 roles (Master, Runner, Admin) + step-by-step user journeys |
| [`03-user-stories.md`](./01-business/03-user-stories.md) | All MVP user stories grouped by epic |
| [`04-ai-use-cases.md`](./01-business/04-ai-use-cases.md) | The 6 AI features (categorization, pricing, matching, fraud, moderation, dispute-assist) |
| [`05-escrow-logic.md`](./01-business/05-escrow-logic.md) | Escrow state machine + money-flow tables + hard rules (business view) |
| [`06-nfr.md`](./01-business/06-nfr.md) | Non-functional requirements (performance, security, scale, compliance) |

## 📂 02-architecture/ — System Design & Screens
*Audience: architects, designers, frontend leads. The "shape" of the product.*

| File | What's inside |
|------|---------------|
| [`01-system-architecture.md`](./02-architecture/01-system-architecture.md) | High-level architecture diagram + key principles + the two clients |
| [`02-mobile-screens.md`](./02-architecture/02-mobile-screens.md) | All 24 mobile screens (Auth/Shared/Master/Runner) — UI, actions, data/state |
| [`03-web-screens.md`](./02-architecture/03-web-screens.md) | The 10 web screens (Landing + Admin Dashboard) + full screen-count summary |

## 📂 03-engineering/ — How To Build It
*Audience: backend & frontend engineers. The technical contract.*

| File | What's inside |
|------|---------------|
| [`01-folder-structure.md`](./03-engineering/01-folder-structure.md) | Turborepo monorepo directory tree + why it's structured that way |
| [`02-database-schema.md`](./03-engineering/02-database-schema.md) | Core Prisma entities (User, Task, EscrowAccount, LedgerEntry, etc.) |
| [`03-tech-stack.md`](./03-engineering/03-tech-stack.md) | Locked tech-stack decisions per layer + rationale |
| [`04-api-design.md`](./03-engineering/04-api-design.md) | REST conventions, key endpoints, WebSocket channels |
| [`05-escrow-implementation.md`](./03-engineering/05-escrow-implementation.md) | **Critical:** escrow transitions, idempotency, transaction rules (code view) |
| [`06-security-trust-safety.md`](./03-engineering/06-security-trust-safety.md) | Platform security + Master↔Runner risk mitigation + dispute flow |

## 📂 04-operations/ — Who, When & Workflow
*Audience: team leads, project managers. Execution.*

| File | What's inside |
|------|---------------|
| [`01-team-responsibilities.md`](./04-operations/01-team-responsibilities.md) | Task assignments per squad (Backend / Mobile / Web / AI) |
| [`02-roadmap.md`](./04-operations/02-roadmap.md) | Pre-Sprint 0 + 6-sprint parallel roadmap + cross-squad dependencies |
| [`03-dev-setup.md`](./04-operations/03-dev-setup.md) | Local development quickstart + quality gates |
| [`04-workflow-glossary.md`](./04-operations/04-workflow-glossary.md) | Branch/PR workflow, Definition of Done, glossary |

---

## 🚀 Quick start by role
- **Founder / stakeholder?** → Read `01-business/01-overview.md` then `02-personas-workflows.md`.
- **Designer?** → `02-architecture/02-mobile-screens.md` + `03-web-screens.md`.
- **Backend engineer?** → `03-engineering/` (especially `05-escrow-implementation.md`).
- **Mobile/Web engineer?** → `03-engineering/04-api-design.md` + `02-architecture/` screens.
- **Team lead / PM?** → `04-operations/`.

---

## 🔑 The 3 non-negotiables
1. **Escrow first:** no task goes live until funds are locked; funds release only on approval, dispute ruling, or auto-release timer. (See `01-business/05-escrow-logic.md` + `03-engineering/05-escrow-implementation.md`.)
2. **The contract is code:** shared zod schemas in `packages/schemas` keep clients and backend in sync.
3. **PostgreSQL is the source of truth for money** with an immutable double-entry ledger.
