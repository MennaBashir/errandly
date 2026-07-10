# AGENTS.md — Errandly Full Reference

> **Read this first.** This file is the single source of truth for agents working on this repo. It summarizes the product, stack, screens, domain rules, design system, and conventions. Deeper detail lives in `planning/` and `DESIGN.md` (see [Pointers](#11-pointers)).

---

## 1. Project Overview

**Errandly** is an "Uber-for-errands" on-demand marketplace:

- **Masters** (clients) post real-world physical tasks (queues, pickups, paperwork), fund them into **escrow**, and pick a Runner.
- **Runners** (freelancers) pass KYC, browse nearby tasks on a map, bid/accept, execute on-site, upload proof, and get paid **90%** of the task amount.
- **Platform** takes a **10% commission** deducted from the Runner's payout on escrow release (configurable flag, never hardcode).
- **Admins** use a separate Next.js web dashboard (NOT part of this repo) for KYC review, disputes, payouts.

One Expo mobile app serves both Master and Runner roles with **role switching**.

### Current status (update as work progresses)

- Scaffold ready: Expo Router route groups created, fonts loaded, Tailwind/NativeWind configured with design tokens.
- **All screen files are empty** (`(auth)`, `(onboarding)`, `(tabs)`, `src/schema/auth.ts`, shared components are stubs).
- **No backend exists yet** — all API calls must be mocked behind `src/lib/api.ts` (swappable later).

---

## 2. Commands

Package manager: **pnpm** (v10). Never use npm/yarn.

| Command | Purpose |
| --- | --- |
| `pnpm start` | Start Expo dev server |
| `pnpm android` / `pnpm ios` / `pnpm web` | Start on platform |
| `pnpm lint` | ESLint + Prettier check |
| `pnpm format` | ESLint fix + Prettier write |
| `npx tsc --noEmit` | Typecheck |
| `npx expo install <pkg>` | Add dependency (SDK-compatible versions) |

**ALWAYS run `pnpm lint && npx tsc --noEmit` after completing any task.**

---

## 3. Locked Tech Stack

Decisions, not suggestions. Do not substitute.

### Installed

| Concern | Choice |
| --- | --- |
| Framework | Expo SDK 56, React Native 0.85, React 19 |
| Navigation | **Expo Router** (file-based, typed routes enabled) |
| Styling | **NativeWind** (Tailwind for RN) — `className`, never `StyleSheet` unless unavoidable |
| Forms | **react-hook-form + zod** (`@hookform/resolvers`) |
| Global state | **Zustand** (auth, role, online status) |
| Server cache | **TanStack Query (React Query)** |
| Secure tokens | **expo-secure-store** (JWT access + refresh) |
| Icons | **lucide-react-native** |
| Images | **expo-image** |
| Animation | react-native-reanimated 4 + react-native-worklets |
| Fonts | Inter (local TTFs in `assets/fonts/`, loaded in root layout) |

### Planned (install only when the screen needs it)

| Concern | Choice |
| --- | --- |
| Real-time | socket.io-client |
| Maps | react-native-maps |
| Camera (KYC/proof) | expo-camera |
| Push | expo-notifications |
| Monitoring | Sentry |

### Backend (context, not in this repo)

NestJS + PostgreSQL + Prisma + Redis/BullMQ + Stripe Connect + S3; AI service = FastAPI. Shared zod schemas will eventually live in a monorepo `packages/schemas` — for now keep them in `src/schema/`.

---

## 4. Project Structure

```
errandly/
├── AGENTS.md               ← this file
├── DESIGN.md               ← full design-system spec (colors, type, components)
├── planning/               ← full product spec-kit (business, architecture, engineering, ops)
├── assets/
│   └── fonts/              ← Inter TTFs (Regular/Light/Medium/SemiBold/Bold/ExtraBold/Black)
├── global.css              ← tailwind directives
├── tailwind.config.js      ← design tokens (colors, fonts, radius)
├── src/
│   ├── app/                ← Expo Router routes
│   │   ├── _layout.tsx     ← root: fonts, SafeAreaProvider, StatusBar, Stack
│   │   ├── (onboarding)/   ← carousel (first launch)
│   │   ├── (auth)/         ← login, signup, verify-email, reset-password
│   │   └── (tabs)/         ← main app shell (role-aware tabs)
│   ├── components/
│   │   └── shared/         ← Container, InputController, Button, etc.
│   ├── schema/             ← zod schemas (auth.ts, ...)
│   ├── lib/                ← api client (mocked), utils        [create when needed]
│   └── store/              ← zustand stores (authStore, ...)   [create when needed]
└── tsconfig.json           ← `@/*` → `./src/*` alias — always import via `@/`
```

---

## 5. Mobile Screens (26 total)

Single app, role-aware. Full detail: `planning/02-architecture/02-mobile-screens.md`.

### Flow A — Auth (shared)

| ID | Screen | Purpose / key API |
| --- | --- | --- |
| A1 | Splash/Bootstrap | Read JWT from SecureStore → validate `/auth/me` → route. `authStore` |
| A2 | Onboarding carousel | 3-slide value prop; sets `hasSeenOnboarding` |
| A3 | Sign Up (phone) | phone/name/email → `POST /auth/register` (RHF + zod) |
| A4 | OTP Verification | 6-digit → `POST /auth/verify-otp` → JWT + refresh in SecureStore |
| A5 | Role Selection | Master vs Runner cards → `PATCH /users/me` `activeRole` |
| A6 | Runner KYC | 3-step: ID upload, selfie (expo-camera), bank → S3 presigned → `POST /kyc/submit` |

### Flow B — Shared / Map & Profile

| ID | Screen | Purpose / key API |
| --- | --- | --- |
| B1 | Home (role-aware) | Master: map of own tasks + "Post a Task" FAB. Runner: nearby pins + Available toggle. `/tasks?owner=me` vs `/tasks/nearby`; WS `tasks:zone:{geohash}` |
| B2 | Live Tracking / Task Room | Live runner marker, status banner, chat, proof preview. Master: Approve/Dispute/Cancel. Runner: Start/Mark Completed. WS `task:{id}` |
| B3 | Chat | Text + image; WS `task:{id}:chat`; `GET /tasks/:id/messages` |
| B4 | Profile | Avatar, rating, KYC badge, wallet shortcut, role switch, logout |
| B5 | Notifications | Grouped list, deep links; `GET /notifications`; WS `user:{id}:notify` |
| B6 | Settings | Language, notification prefs, payment methods, legal, delete account |

### Flow C — Master

| ID | Screen | Purpose / key API |
| --- | --- | --- |
| C1 | Post Step 1 — Describe | Description + photos; debounced `POST /ai/categorize`; wizard state in `createTaskStore` |
| C2 | Post Step 2 — Location | Draggable pin + address autocomplete/geocode |
| C3 | Post Step 3 — Budget | Amount + AI price hint (`POST /ai/suggest-price`); urgency; instant-accept vs bidding |
| C4 | Post Step 4 — Review & Fund | Fee breakdown; `POST /tasks` (DRAFT) → `POST /escrow/lock` → OPEN. **Not visible to Runners until `escrowStatus = FUNDS_LOCKED`** |
| C5 | My Tasks | Tabs: Open/Assigned/Pending Approval/Completed/Disputed; infinite scroll |
| C6 | Bids/Applicants | Compare bids (rating, ETA, price); WS `task:{id}:bids`; `POST /tasks/:id/assign` |
| C7 | Approve & Review | Proof gallery; `POST /escrow/:taskId/release` (90/10) → `POST /ratings`; or `POST /disputes` |

### Flow D — Runner

| ID | Screen | Purpose / key API |
| --- | --- | --- |
| D1 | Task Feed | Map/list toggle, filter chips; AI-ranked `?ranked=true`; `POST /runners/availability` |
| D2 | Task Detail | Shows **net payout = amount × 0.90**; `POST /tasks/:id/accept` or `/bids` |
| D3 | Active Task (=B2) | `PATCH /tasks/:id/status`; proof → S3 → `POST /tasks/:id/proof`; GPS via WS `task:{id}:location` |
| D4 | Earnings/Wallet | Available vs In-Escrow balances; withdraw blocked unless `kycStatus = APPROVED` |
| D5 | Withdraw | `POST /payouts` → PENDING → webhook → PAID |

### Tab bars

- **Master:** Home · My Tasks · Post (FAB) · Wallet · Profile
- **Runner:** Feed · My Jobs · Map · Wallet · Profile

### Screen-flow order (build order reference)

Splash → Onboarding → Sign up → Log in → OTP → Role selection → Runner KYC → Runner Home/Map → Task feed → Task detail → Place bid → Master Home → Post 1–4 → My Tasks → Bids → Task Room → Chat → Approve+rate → Wallet → Withdraw → Notifications → Profile → Settings

---

## 6. Escrow State Machine (NEVER violate)

```
FUNDS_LOCKED ──assign──▶ HELD_IN_ESCROW ──runner done──▶ PENDING_APPROVAL ──approve──▶ RELEASED (Runner 90% / Platform 10%)
     │                                                        │
     └──cancel pre-assign──▶ REFUNDED                         └──dispute──▶ IN_DISPUTE ──admin──▶ RELEASED | REFUNDED | SPLIT
```

Hard rules:

1. **No task is LIVE until funds are confirmed locked.**
2. Release only via: explicit Master approval, Admin ruling, or **auto-release timer (~72h in PENDING_APPROVAL)**.
3. Every transition = immutable ledger entry with unique **idempotency key** (double-entry accounting, backend concern — but client must send `Idempotency-Key` header on money POSTs).
4. 10% fee deducted from Runner payout — read from config, never hardcode.
5. Runner can withdraw only RELEASED balance, and only after `kycStatus = APPROVED`.
6. Money NEVER flows Master→Runner directly.

---

## 7. API Conventions

- REST for commands/mutations; WebSocket for live updates only — **never mutate money over WS**.
- Base `/api/v1`, JSON, plural nouns, GET/POST/PATCH/DELETE.
- Auth: `Authorization: Bearer <jwt>`; socket handshake also JWT-authenticated.
- All request bodies validated against zod schemas (`src/schema/`).
- Error shape: `{ error: { code, message, details? } }`; 400 on validation.
- `Idempotency-Key` header required on `/escrow/lock`, `/escrow/release`, `/payouts`.
- Cursor pagination: `?cursor=&limit=`.
- WS rooms: `tasks:zone:{geohash}`, `task:{id}`, `task:{id}:location`, `task:{id}:bids`, `task:{id}:chat`, `user:{id}:notify`.
- **The contract is code:** define/change the zod schema first, then implement.
- Until the backend exists: mock everything in `src/lib/api.ts` with realistic latency and typed responses.

---

## 8. Design System (from DESIGN.md — full spec there)

Aesthetic: **"Utility-Premium"** — high-contrast minimalism, no gradients, no drop shadows, generous whitespace, effortless control.

### Colors (tailwind classes configured in `tailwind.config.js`)

| Token | Hex | Class | Usage |
| --- | --- | --- | --- |
| Ink | `#000000` | `ink` | Branding, headlines, secondary buttons, active states |
| Amber | `#F2A104` | `amber` | ONLY action-intent: primary CTAs, active pins, "In Progress" status. **Always pair amber bg with ink text/icons** |
| Body | `#5E5E5E` | `body` | Body/secondary text |
| Mute | `#AFAFAF` | `mute` | Placeholders, disabled, decorative borders |
| Canvas | `#EFEFEF` | `canvas` | Background surfaces, ghost outlines, chips |
| Error | `#BA1A1A` | `error` | Errors |

### Typography — Inter only, one class per weight

React Native has **no synthetic font weights** — `font-bold` does NOT work with custom fonts. Use the per-weight classes:

```tsx
<Text className="font-inter">Regular 400</Text>
<Text className="font-inter-medium">Medium 500</Text>
<Text className="font-inter-semibold">SemiBold 600</Text>
<Text className="font-inter-bold">Bold 700</Text>
```

`font-sans` = Inter Regular (default). Also available: `font-inter-light`, `font-inter-extrabold`, `font-inter-black`.

Scale: headline-xl 40/48 · headline-lg 32/40 (28/36 mobile) · headline-md 24/32 · headline-sm 20/28 · body-lg 18/28 · body-md 16/24 · body-sm 14/20 (weight 500) · label-md 12/16 (weight 600). Headlines: **sentence-case, never all-caps**, Bold 700. Daily screens lead with headline-md/sm; headline-xl only for empty states/marketing.

### Shape & radius (configured: `rounded-sm` 8px, `rounded` 16px, `rounded-md` 24px, `rounded-lg` 32px, `rounded-xl` 48px, `rounded-full` pill)

- **Buttons & chips:** `rounded-full` pills.
- **Cards & bottom sheets:** `rounded` (16px).
- **Map markers & avatars:** circles.

### Spacing

8px linear scale. Screen margins 20px (`px-5`), gutters 16px (`gap-4`), section spacing 24px (`gap-6`), component padding 16px (`p-4`).

### Elevation — NO drop shadows

- Tonal layering: white (`#FFFFFF`) = action layer (cards/sheets), canvas (`#EFEFEF`) = background layer.
- Ghost outlines: 1px `border-canvas` on white cards.
- Active states: amber fill or ink border — never elevation.

### Component recipes

- **Primary button:** amber pill, ink text — `bg-amber rounded-full` + `text-ink font-inter-semibold`.
- **Secondary button:** ink pill, white text — `bg-ink rounded-full` + `text-white`.
- **Chips:** `bg-canvas rounded-full`; active: `bg-ink text-white`.
- **Cards:** `bg-white rounded border border-canvas` — no shadow.
- **Bottom sheets:** white, 16px top radius.
- **Inputs:** NO box border. 1px `#AFAFAF` bottom border → 2px `#000000` on focus. Placeholder `mute`.
- **Task pins:** circular amber, ink icon, 2px white stroke.
- **Lists:** rows with 1px `border-canvas` dividers; title `body-md`, subtitle `body-sm text-body`.

---

## 9. Code Conventions

- Functional components, arrow or function declarations matching existing files; default exports for screens (Expo Router requirement).
- Styling via NativeWind `className` only.
- Imports via `@/` alias (e.g. `import Container from '@/components/shared/container'`).
- Forms: `react-hook-form` + `zodResolver` + schema from `src/schema/`; reusable `InputController` wraps `Controller`.
- Components: PascalCase component names, camelCase filenames (existing convention: `container.tsx`, `inputController.tsx`).
- Prettier: 100 cols, single quotes, trailing comma es5, tailwind class sorting — run `pnpm format` before finishing.
- Conventional commits: `feat:`, `fix:`, `chore:`, etc. Never commit unless asked.
- Screens live in `src/app/` route groups; keep them thin — extract logic to hooks/stores and UI to components.

---

## 10. Implementation Roadmap (check off as completed)

### Phase 3 — Foundation + Auth

- [ ] Shared UI kit: `Container` (safe-area wrapper), `Button` (primary/secondary/ghost), `Input` + `InputController` (RHF, underline style, focus/error), `OtpInput`
- [ ] Zod schemas: `src/schema/auth.ts` (signup, login, otp, reset-password)
- [ ] `src/lib/api.ts` mock client + `src/store/authStore.ts` (Zustand + SecureStore) + `hasSeenOnboarding`
- [ ] QueryClientProvider in root layout
- [ ] Onboarding: 3-slide carousel
- [ ] Auth screens: signup, login, verify-email (OTP), reset-password
- [ ] Tabs shell: placeholder role-aware tabs (Home / My Tasks / Wallet / Profile)

### Phase 4+ — Core app (in screen-flow order)

- [ ] Role selection + Runner KYC
- [ ] Home (role-aware, maps)
- [ ] Post-task wizard (C1–C4) + escrow lock (mock)
- [ ] Task feed / detail / bids (Runner)
- [ ] My Tasks + Bids/Applicants (Master)
- [ ] Task Room + chat + tracking
- [ ] Approve/release + ratings
- [ ] Wallet + withdraw
- [ ] Notifications, Profile, Settings

---

## 11. Pointers

| Need | File |
| --- | --- |
| Master index of spec | `planning/INDEX.md` |
| Business overview, KPIs | `planning/01-business/01-overview.md` |
| Personas & journeys | `planning/01-business/02-personas-workflows.md` |
| User stories | `planning/01-business/03-user-stories.md` |
| AI features | `planning/01-business/04-ai-use-cases.md` |
| Escrow (business) | `planning/01-business/05-escrow-logic.md` |
| All 24+ mobile screens (detailed) | `planning/02-architecture/02-mobile-screens.md` |
| Tech stack rationale | `planning/03-engineering/03-tech-stack.md` |
| API design & WS channels | `planning/03-engineering/04-api-design.md` |
| Escrow (code rules) | `planning/03-engineering/05-escrow-implementation.md` |
| Git workflow & DoD | `planning/04-operations/04-workflow-glossary.md` |
| Full design tokens & style | `DESIGN.md` |
| Screen flow + Stitch designs | `planning/design/screens/SCREEN_FLOW.md` |
| HTML screen mockups | `planning/design/screens/*.html` + `*-preview.png` |
| Logos | `planning/design/logo/` |
