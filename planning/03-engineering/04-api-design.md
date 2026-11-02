# 🔌 API Design Guidelines (REST + WebSocket)

How clients and the backend communicate. **REST for commands/mutations, WebSocket for live updates.**

---

## 1. REST Conventions
- Base: `/api/v1`. Versioned. JSON only.
- Resource-oriented, plural nouns: `/tasks`, `/tasks/:id/bids`, `/escrow/:taskId/release`.
- Standard verbs: `GET` (read), `POST` (create/action), `PATCH` (partial update), `DELETE`.
- **Auth:** `Authorization: Bearer <jwt>`. Admin routes under `/admin/*` require admin role.
- **Validation:** every request body validated by the shared zod schema; reject with `400` + structured error.
- **Idempotency:** money-mutating POSTs (`/escrow/lock`, `/escrow/release`, `/payouts`) require an `Idempotency-Key` header.
- **Pagination:** cursor-based (`?cursor=&limit=`).
- **Errors:** consistent envelope `{ error: { code, message, details? } }`.

### Key REST Endpoints (excerpt)
```
POST   /auth/register            POST /auth/verify-otp        GET  /auth/me
POST   /kyc/submit               POST /admin/kyc/:id/decision
POST   /tasks                    GET  /tasks/nearby           GET  /tasks/:id
POST   /tasks/:id/bids           POST /tasks/:id/assign       POST /tasks/:id/accept
PATCH  /tasks/:id/status         POST /tasks/:id/proof
POST   /escrow/lock              POST /escrow/:taskId/release POST /escrow/:taskId/refund
GET    /wallet                   POST /payouts
POST   /disputes                 POST /admin/disputes/:id/resolve
POST   /ratings
POST   /ai/categorize  /ai/suggest-price            (backend → ai-service internal)
```

## 2. WebSocket (socket.io) Channels
Use **REST for commands/mutations, WebSocket for live updates** (don't mutate money over WS).

| Channel / Room | Direction | Purpose |
|----------------|-----------|---------|
| `tasks:zone:{geohash}` | server → runners | New task appeared nearby |
| `task:{id}` | bidirectional | Status changes, live updates for that task |
| `task:{id}:location` | runner → master | Live Runner GPS during active task |
| `task:{id}:bids` | server → master | New bids in real time |
| `task:{id}:chat` | bidirectional | In-task chat messages |
| `user:{id}:notify` | server → user | Push-style notifications |
| `admin:live` | server → admins | Live KPI counters |

- Authenticate the socket handshake with the JWT.
- Scope rooms strictly — a user may only join rooms for tasks they're party to (enforced server-side).

## 3. The Contract is Code
Request/response shapes live in `packages/schemas` (zod) and `packages/types`. Backend and clients import the **same** definitions. If you change an endpoint, you change the schema first.

---
➡️ Escrow implementation: [`05-escrow-implementation.md`](./05-escrow-implementation.md)
