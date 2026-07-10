# 📱 Mobile App — Screen-by-Screen Spec (Expo / React Native)

Single app for **Masters + Runners** with role switching. For each screen: **UI Components** · **User Actions/Buttons** · **Data / State requirements**.

Screens are grouped by flow: **Auth (A)** · **Shared/Map (B)** · **Master (C)** · **Runner (D)**.

---

## Flow A — Auth Flow (Shared)

### A1. Splash / Bootstrap
- **UI:** Logo, loading spinner.
- **Actions:** none (auto).
- **Data/State:** Read persisted JWT from `SecureStore` → validate `/auth/me` → route to Home or Onboarding. Global `authStore` (Zustand).

### A2. Welcome / Onboarding Carousel
- **UI:** 3-slide carousel (value prop), pagination dots.
- **Actions:** `Get Started`, `I already have an account`.
- **Data/State:** Local only; sets `hasSeenOnboarding` flag.

### A3. Sign Up (Phone)
- **UI:** Phone input (country code picker), `name`, email, terms checkbox.
- **Actions:** `Send OTP`.
- **Data/State:** `POST /auth/register` → triggers OTP. Local form state (react-hook-form + zod).

### A4. OTP Verification
- **UI:** 6-digit OTP boxes, resend timer.
- **Actions:** `Verify`, `Resend code`.
- **Data/State:** `POST /auth/verify-otp` → returns JWT + refresh token → store in `SecureStore`.

### A5. Role Selection
- **UI:** Two large cards: "I want to get tasks done (Master)" / "I want to earn (Runner)".
- **Actions:** `Continue as Master`, `Continue as Runner`, "You can switch later".
- **Data/State:** `PATCH /users/me` set `activeRole`. Updates `authStore.activeRole`.

### A6. Runner KYC Onboarding (Runner only)
- **UI:** Stepper: (1) ID upload, (2) selfie capture, (3) bank/wallet details.
- **Actions:** `Upload ID`, `Take Selfie`, `Submit for review`.
- **Data/State:** Upload to S3 via presigned URL → `POST /kyc/submit`. State: `kycStatus = PENDING`. Camera via `expo-camera`.

---

## Flow B — Shared / Map & Profile

### B1. Home (role-aware shell)
- **Master view:** Map with own active tasks + big `+ Post a Task` FAB.
- **Runner view:** Map with nearby available tasks (pins) + `Available` toggle.
- **UI:** `MapView` (react-native-maps), task pins, bottom sheet list, header with role switch.
- **Actions:** Tap pin → detail; toggle online; switch role; recenter.
- **Data/State:**
  - Master: `GET /tasks?owner=me&status=active` (React Query).
  - Runner: `GET /tasks/nearby?lat=&lng=&radius=` (React Query, refetch on region change, debounced).
  - WebSocket subscribe `tasks:zone:{geohash}` for live new tasks.

### B2. Live Tracking / Task Room (shared during active task)
- **UI:** Map with Runner's live marker + route, status banner, in-app chat panel, proof preview.
- **Actions (Master):** Chat, Approve, Dispute, Cancel.
- **Actions (Runner):** Chat, `Start Task`, `Mark Completed` + upload proof.
- **Data/State:** `GET /tasks/:id`; WebSocket `task:{id}` channel for status + location + messages. Optimistic chat send.

### B3. Chat (modal/panel)
- **UI:** Message list, input bar, image attach, system messages (status changes).
- **Actions:** Send text, send image.
- **Data/State:** WebSocket `task:{id}:chat`; history via `GET /tasks/:id/messages`.

### B4. Profile (shared)
- **UI:** Avatar, name, rating, completed count, KYC badge, wallet shortcut.
- **Actions:** Edit profile, Switch role, KYC status, Logout.
- **Data/State:** `GET /users/me`, `GET /ratings/summary`.

### B5. Notifications
- **UI:** List grouped by day (new bid, task accepted, payout released, dispute update).
- **Actions:** Tap → deep link to relevant screen.
- **Data/State:** `GET /notifications`; push via `expo-notifications`; WebSocket `user:{id}:notify`.

### B6. Settings
- **UI:** Language, notifications prefs, payment methods, legal links, delete account.
- **Actions:** Toggle prefs, manage cards.
- **Data/State:** `GET/PATCH /users/me/settings`.

---

## Flow C — Master Flow

### C1. Post Task — Step 1: Category & Description
- **UI:** Description textarea, photo picker, AI-suggested category chip.
- **Actions:** `Next`; tap AI suggestion to accept.
- **Data/State:** As user types, debounced `POST /ai/categorize` → returns category + tags. Wizard state in `createTaskStore`.

### C2. Post Task — Step 2: Location
- **UI:** Map with draggable pin, address autocomplete, "task on-site here" note.
- **Actions:** Confirm location, `Next`.
- **Data/State:** Geocode via places API; store `lat/lng/address`.

### C3. Post Task — Step 3: Budget & Schedule
- **UI:** Amount input, AI price-range hint banner, urgency toggle (Now / Scheduled), datetime picker, task mode (Instant-accept vs Bidding).
- **Actions:** `Next`.
- **Data/State:** `POST /ai/suggest-price` (category, zone, urgency) → range. Store amount + mode.

### C4. Post Task — Step 4: Review & Fund Escrow
- **UI:** Summary card, **fee breakdown** (Task Cost, 10% platform fee, total/payout), payment method selector.
- **Actions:** `Confirm & Lock Funds`.
- **Data/State:** `POST /tasks` → creates task `DRAFT`; then `POST /escrow/lock` (PaymentIntent). On success task → `OPEN`. Critical: task is **not** visible to Runners until escrow confirmed (`escrowStatus = FUNDS_LOCKED`).

### C5. My Tasks (Master)
- **UI:** Tabs: Open / Assigned / Pending Approval / Completed / Disputed. Task cards with status pills.
- **Actions:** Open detail, cancel (if Open).
- **Data/State:** `GET /tasks?owner=me&status=` per tab (React Query, infinite scroll).

### C6. Bids / Applicants (Master, bidding mode)
- **UI:** List of Runner bids — avatar, rating, ETA, price, message.
- **Actions:** `Accept` a bid, view Runner profile.
- **Data/State:** `GET /tasks/:id/bids`; WebSocket `task:{id}:bids` live append; `POST /tasks/:id/assign`.

### C7. Approve & Review Completion (Master)
- **UI:** Proof gallery (photos/receipts), task recap, Approve / Dispute buttons, rating form.
- **Actions:** `Approve & Release Funds`, `Open Dispute`, submit rating.
- **Data/State:** `POST /escrow/:taskId/release` (triggers 90/10 split) → then `POST /ratings`. `POST /disputes` if disputing.

---

## Flow D — Runner Flow

### D1. Task Feed (Runner)
- **UI:** Toggle Map/List, filter chips (category, distance, min payout), task cards (payout, distance, ETA).
- **Actions:** Toggle online, open task, apply filters.
- **Data/State:** `GET /tasks/nearby`; AI-ranked order from backend (`?ranked=true`). WebSocket new-task injection. Online toggle → `POST /runners/availability`.

### D2. Task Detail (Runner)
- **UI:** Description, photos, map location, payout (after 10%), Master rating, distance/ETA.
- **Actions:** `Accept Task` (instant mode) OR `Place Bid` (+amount, message, ETA) (bidding mode).
- **Data/State:** `GET /tasks/:id`; `POST /tasks/:id/accept` or `POST /tasks/:id/bids`. Shows **net payout** = amount × 0.90.

### D3. Active Task (Runner) — uses B2 Task Room
- **UI:** Navigation CTA, status stepper, proof upload zone.
- **Actions:** `Start Task`, `Mark Completed` (+ upload proof), chat.
- **Data/State:** `PATCH /tasks/:id/status` (`IN_PROGRESS` → `PENDING_APPROVAL`); proof upload to S3 → attach via `POST /tasks/:id/proof`. Live location emitted over WebSocket `task:{id}:location`.

### D4. Earnings / Wallet (Runner)
- **UI:** Balance card (Available vs In-Escrow/Pending), transaction list, `Withdraw` button.
- **Actions:** `Withdraw`, view payout detail.
- **Data/State:** `GET /wallet`, `GET /wallet/transactions`. Withdraw → `POST /payouts` (blocked if `kycStatus != APPROVED`).

### D5. Withdraw (Runner)
- **UI:** Amount, destination (bank/wallet), fee/ETA note, confirm.
- **Actions:** `Confirm Withdrawal`.
- **Data/State:** `POST /payouts` → status `PENDING` → webhook updates to `PAID`.

---

## Mobile State Management Summary
| Concern | Tool |
|---------|------|
| Server cache / data fetching | **TanStack Query (React Query)** |
| Global app state (auth, role, online) | **Zustand** |
| Real-time | **socket.io-client** over WebSocket |
| Forms + validation | **react-hook-form + zod** |
| Secure tokens | **expo-secure-store** |
| Navigation | **Expo Router** |

---
➡️ Next: [`03-web-screens.md`](./03-web-screens.md)
