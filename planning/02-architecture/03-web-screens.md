# 💻 Web App — Screen-by-Screen Spec (Next.js)

Two surfaces: the public **Landing Page (E)** and the **Admin Dashboard (F)** with RBAC.

---

## Flow E — Public Landing Page

### E1. Marketing Landing
- **UI:** Hero, value prop, "How it works" (Master/Runner), categories, testimonials, app store CTAs, footer.
- **Actions:** Download app, Become a Runner, Contact.
- **Data/State:** Mostly static (SSG). Lead capture → `POST /leads`.

---

## Flow F — Admin Dashboard (RBAC: admin / support / finance)

### F1. Admin Login
- **UI:** Email + password, 2FA.
- **Actions:** `Login`.
- **Data/State:** `POST /auth/admin/login` → admin JWT (httpOnly cookie). Role gating middleware.

### F2. Overview / KPIs
- **UI:** Stat cards (GMV, fees collected, active tasks, online Runners, dispute rate), charts (tasks/day, revenue), live activity feed.
- **Actions:** Date-range filter, drill-down.
- **Data/State:** `GET /admin/metrics`; WebSocket `admin:live` for real-time counters.

### F3. Users Management
- **UI:** Table (search, filter by role/status), user detail drawer (ratings, history, wallet).
- **Actions:** Suspend, ban, reset, view audit.
- **Data/State:** `GET /admin/users`, `PATCH /admin/users/:id`.

### F4. KYC Review Queue
- **UI:** Queue list, side-by-side ID + selfie viewer, checklist.
- **Actions:** `Approve`, `Reject` (+reason).
- **Data/State:** `GET /admin/kyc?status=PENDING`, `POST /admin/kyc/:id/decision`.

### F5. Tasks Monitor
- **UI:** Table of all tasks + status, map heatmap, filters.
- **Actions:** Force-cancel, inspect escrow ledger.
- **Data/State:** `GET /admin/tasks`, `GET /admin/tasks/:id/ledger`.

### F6. Disputes Console (critical)
- **UI:** Dispute detail: task recap, chat transcript, proof images, both parties, escrow amount, **AI evidence summary**.
- **Actions:** `Release to Runner`, `Refund Master`, `Split` (% slider), add resolution note.
- **Data/State:** `GET /admin/disputes`, `POST /admin/disputes/:id/resolve` → triggers corresponding escrow transition.

### F7. Finance / Reconciliation
- **UI:** Ledger table (double-entry), payouts queue, commission report, export CSV.
- **Actions:** Approve payout batch, export.
- **Data/State:** `GET /admin/ledger`, `GET /admin/payouts`, `POST /admin/payouts/:id/approve`.

### F8. Fraud / Risk Queue
- **UI:** AI-flagged items (users/tasks) with risk score + reasons.
- **Actions:** Dismiss, escalate, ban.
- **Data/State:** `GET /admin/fraud-flags`, `PATCH /admin/fraud-flags/:id`.

### F9. Catalog & Config
- **UI:** Manage categories, pricing rules, zones, commission %, auto-release timer.
- **Actions:** CRUD.
- **Data/State:** `GET/POST/PATCH /admin/config/*`.

---

## Screen Count Summary (all clients)
| Client | Flow | Screens |
|--------|------|---------|
| Mobile | Auth (A) | 6 |
| Mobile | Shared/Map (B) | 6 |
| Mobile | Master (C) | 7 |
| Mobile | Runner (D) | 5 |
| Web | Landing (E) | 1 |
| Web | Admin (F) | 9 |
| **Total** | | **34 screens** |
