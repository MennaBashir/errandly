# 👷 Team Task Assignments (per stack)

Who owns what. Four squads working concurrently against the shared `packages/` contract.

---

## 🟦 Backend Squad — NestJS (`apps/api`)
**Owns:** Auth, business logic, escrow, payments, WebSocket gateway, AI gateway, DB schema.
- Auth & RBAC (phone OTP, JWT + refresh, admin login + 2FA).
- Domain modules: `tasks`, `bids`, `escrow`, `payments`, `payouts`, `wallet`, `chat`, `ratings`, `disputes`, `notifications`, `admin`.
- **Escrow state machine + double-entry ledger** (the crown jewel — fully tested).
- WebSocket gateway with Redis adapter (live tasks, bids, location, chat).
- Prisma schema, migrations, seed.

## 📱 Mobile Squad — Expo / React Native (`apps/mobile`)
**Owns:** The Master + Runner app (single app, role switch).
- Expo Router navigation; auth + KYC flows; map + live tracking; post-task wizard; bidding/accepting; task room + chat; wallet + withdraw; ratings; push notifications.
- Consume REST via React Query; real-time via socket.io-client; forms via react-hook-form + zod.

## 💻 Web Squad — Next.js (`apps/web`)
**Owns:** Admin Dashboard + public Landing Page.
- Admin: overview/KPIs, users, KYC review, tasks monitor, **disputes console**, finance/reconciliation, fraud queue, config.
- Marketing landing page (SSG).

## 🤖 AI Squad — FastAPI (`apps/ai-service`)
**Owns:** Intelligence endpoints consumed *only* by the backend `ai-gateway` module.
- `/categorize`, `/suggest-price`, `/match`, `/fraud`, `/moderate`.
- Returns scores/suggestions; **never** makes money decisions — backend enforces all rules.

---
➡️ Roadmap: [`02-roadmap.md`](./02-roadmap.md)
