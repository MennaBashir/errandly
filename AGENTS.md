# AGENTS.md — Errandly Full Reference

> **Read this first.** This file is the single source of truth for agents working on this repo. It summarizes the product, stack, screens, domain rules, design system, and conventions. Deeper detail lives in `../planning/` and `DESIGN.md` (see [Pointers](#11-pointers)).

> **Repo layout:** the workspace root is `errandly-app/` containing three sibling folders: `uber_frontend/` (this app — our responsibility), `uber_backend/` (NestJS API, built by the backend team, pulled from GitHub — **READ-ONLY, never edit**), and `planning/` (historical spec docs).

--- 


## 1. Project Overview

**Errandly** is an "Uber-for-errands" on-demand marketplace:

- **Rentiers** (clients) post real-world physical tasks (queues, pickups, paperwork), fund them into **escrow**, and pick a Rentile.
- **Rentiles** (freelancers) pass KYC, browse nearby tasks on a map, bid/accept, execute on-site, upload proof, and get paid **90%** of the task amount.
- **Platform** takes a **10% commission** deducted from the Rentile's payout on escrow release (configurable flag, never hardcode).
- **Admins** use a separate Next.js web dashboard (NOT part of this repo) for KYC review, disputes, payouts.

One Expo mobile app serves both Rentier and Rentile roles with **role switching**.

> **Terminology note:** legacy docs in `../planning/` and the Stitch designs still say **Master/Runner** — treat them as synonyms (Master = Rentier, Runner = Rentile). All code and UI copy MUST use **Rentier/Rentile**: enums `'RENTIER' | 'RENTILE'`, naming like `rentierHome`, `rentileKyc`. API paths in the spec (e.g. `POST /runners/availability`) are aspirational — the real backend routes win (see §3.1).

### Current status (update as work progresses)

- Scaffold ready: Expo Router route groups created, fonts loaded, Tailwind/NativeWind configured with design tokens.
- Shared UI kit done: `container`, `button`, `input`, `inputController`, `chip`, `otpInput` in `src/components/shared/`.
- Static assets downloaded from Stitch + logos copied: `assets/images/` registered in `src/lib/assets.ts`; app constants in `src/lib/config.ts`.
- Onboarding carousel + 5 auth screens implemented (UI + zod validation; submissions just navigate — no api/store yet). Auth UI aligned with the real backend model: signup = firstName/lastName/email/password (+optional phone, optional bio, terms) → verify-email; login = email+password → `(tabs)` placeholder, with "Forgot password?" link; reset-password uses a 2-state pattern (email form → "Check your inbox" panel); `new-password` (password + confirm) is deep-link-only, reached later via `errandly://reset-password?token=...`. `Input` supports `secureToggle` (show/hide password). Schemas in `src/schema/auth.ts` mirror backend DTOs (`passwordSchema` = min 8, 1 lower, 1 upper, 1 number). **OTP fully removed**: `verify-otp.tsx`, `otpInput.tsx`, `otpSchema`, `verifyEmailSchema`, and `config.otpLength` deleted (backend has no OTP). Shared `CheckInbox` component (mail icon + headline + body + primary button + "Open email app" + resend with 45s cooldown from `config.resendCooldownSeconds` + secondary link) powers both verify-email and the "sent" state of reset-password.
- **Backend exists** at `../uber_backend` (NestJS, backend team). Done so far: **auth** (email+password signup/login, email-verification link, forgot/reset password) + **users** CRUD. See §3.1 for the real endpoint list.
- **Integration policy (agreed with user):** build screens from the Stitch project first (UI-only). When wiring a screen to the API, use the **real backend endpoints** — NO mock API layer. Where the spec and the backend disagree (e.g. spec says phone/OTP, backend does email/password + email link), **adapt the frontend to the backend**.
- **Phase B DONE — auth wired to backend (axios):** `src/lib/api.ts` (axios instance + interceptors), `src/lib/auth-api.ts` (one function per endpoint), `src/store/authStore.ts` (Zustand + SecureStore: token, hasSeenOnboarding, hydrate), `src/lib/queryClient.ts`, `src/hooks/useAuth.ts` (useSignup/useLogin/useForgotPassword/useResetPassword/useResendVerification + `enterAppIfVerified` gate), root-layout route guard + QueryClientProvider; onboarding now calls `markOnboardingSeen()`. **Verification gate:** signup token is discarded; after login we call `GET /users/me` — 401 "User is not verified" → bounce to verify-email; verified → save token → `(tabs)`. Env: `.env.local` `EXPO_PUBLIC_API_URL=http://10.0.2.2:3000/api/v1` (Android emulator), `.env.example` documents alternatives.
- **⚠️ KNOWN BACKEND BUGS (report to backend team, backend is read-only for us):** (1) `POST /auth/login` returns a JWT **without `sub`** — `auth.controller.ts` passes `req.user` (an `IJwtPayload { sub, email, role }` from LocalStrategy) into `localLogin(user: User)` which reads `user.id` (undefined). Result: every protected call with a login token → 500 DATABASE_ERROR (`UNDEFINED_VALUE` in postgres.js from `findById(undefined)`). Signup + reset-password tokens are fine (built from a real User). Fix: `localLogin` should use `req.user.sub`. (2) `GET /users/me` returns the **argon2 password hash** in the response body — should be stripped (UserResponseDto omits it but the service returns the raw entity). Until (1) is fixed, login-then-enter-app will error; signup→verify→(login) flow is testable once (1) lands.
- **Actual backend response envelopes (verified by curl, differs from older notes):** success = `{ message, data: {...} }` (ResponseInterceptor puts payload under `data`); error = `{ success: false, data: null, error: { code, message, details? }, timestamp }` — `details` is the validation-errors array. `src/lib/api.ts` interceptor is written against these shapes.
- Next up: deep linking (Phase C — backend email templates → `errandly://verify-email?token=` / `errandly://reset-password?token=`, app.json scheme, auto-verify screen), then role selection + remaining screens.

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

**SESSION CONTINUITY RULE (automatic, no user request needed):** after completing any task, update this file before finishing — refresh §1 "Current status" and tick §10 roadmap checkboxes. This file is the agent's memory across sessions.

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
| Icons | **lucide-react-native** (+ react-native-svg peer) |
| Images | **expo-image** |
| Animation | react-native-reanimated 4 + react-native-worklets |
| Gestures | react-native-gesture-handler (`GestureHandlerRootView` in root layout) |
| Bottom sheets | **@gorhom/bottom-sheet** (design is sheet-heavy: bids, filters, task detail) |
| Toasts | react-native-toast-message (`<Toast />` mounted in root layout) |
| Class variants | **class-variance-authority + clsx + tailwind-merge** — use `cn()` from `src/lib/utils.ts` and `cva()` for component variants; never manual template-literal class concat |
| Dates | dayjs (relative timestamps) |
| Phone numbers | **libphonenumber-js** — shared `PhoneInput` (country picker modal + as-you-type format, emits E.164); `phoneSchema` uses `isValidPhoneNumber` |
| Fonts | Inter (local TTFs in `assets/fonts/`, loaded in root layout) |

### Planned (install only when the screen needs it)

| Concern | Choice |
| --- | --- |
| Real-time | socket.io-client |
| Maps | react-native-maps |
| Camera (KYC/proof) | expo-camera |
| Push | expo-notifications |
| Monitoring | Sentry |

### Backend (real, at `../uber_backend` — READ-ONLY for us)

Actual stack (differs from planning docs — this list wins): **NestJS 11 + Drizzle ORM (NOT Prisma) + PostgreSQL + Redis cache (Keyv) + Passport (local + JWT) + nodemailer + Swagger**. Backend uses **npm** (frontend stays pnpm). Package name is `hatly` (legacy, ignore).

Reference commands (run in `../uber_backend`, only to inspect/run locally — never modify code): `npm run start:dev` (dev server, port 3000), Swagger UI at `http://localhost:3000/api`. `src/metadata.ts` is auto-generated — never edit.

Shared zod schemas stay in `src/schema/` on our side; keep them shaped to the backend DTOs.

### 3.1 Backend API reality (source of truth when integrating)

Base URL: `http://localhost:3000/api/v1` (global prefix `api` + URI versioning `v1`).

**Implemented endpoints (as of last pull):**

| Method & Path | Body / Query | Notes |
| --- | --- | --- |
| `POST /auth/signup` | `{ email, password, firstName, lastName, ... }` | 201 → `{ message, access_token }`; sends verification email; 409 if email taken |
| `POST /auth/login` | `{ email, password }` | 200 → `{ message, access_token }`; 401 invalid credentials |
| `POST /auth/forgot-password` | `{ email }` | sends reset email |
| `POST /auth/reset-password?token=` | `{ password }` | → `{ message, access_token }` |
| `GET /auth/verify-email?token=` | — | verifies email link token |
| `POST /auth/send-email-verification` | `{ email }` | resend verification mail |
| `GET /users/me` | Bearer JWT | current user profile |
| `GET /users` / `GET /users/:id` | Bearer JWT | permission-guarded (`user:list` / `user:read`) |
| `PUT /users` | Bearer JWT + `UpdateUserDto` | updates current user |
| `DELETE /users` | Bearer JWT | deletes current user |

**Backend facts to respect:**

- **Response envelope:** a global interceptor wraps success responses as `{ message, ...data }`. Errors: NestJS shape from the global exception filter (`statusCode`, `message`, ...). Type the client against this, not the spec's `{ error: {...} }`.
- **Auth:** single `access_token` JWT (default 15m expiry) — **no refresh token yet**. Store in expo-secure-store; re-login on 401 until backend adds refresh.
- **Auth model:** email + password, email-verification **link** (not OTP), forgot/reset password via emailed token. No phone/OTP endpoints exist — the existing OTP screens stay UI-only until backend adds them or we repurpose the flow.
- **Roles today:** `USER | ADMIN` only. No RENTIER/RENTILE, tasks, escrow, bids, KYC, wallet, WS, or payments yet — those screens stay UI-only until the backend ships them.
- **Golden rule:** before wiring any endpoint, read the actual controller/DTO in `../uber_backend/src/modules/` (or Swagger). If spec ≠ backend → **backend wins, adapt the frontend**.

---

## 4. Project Structure

```
errandly/
├── AGENTS.md               ← this file
├── DESIGN.md               ← full design-system spec (colors, type, components)
├── assets/
│   ├── fonts/              ← Inter TTFs (Regular/Light/Medium/SemiBold/Bold/ExtraBold/Black)
│   └── images/             ← static brand/illustration assets (logos, onboarding, role cards)
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
│   ├── lib/
│   │   ├── assets.ts       ← typed static image map (use `images.logo.icon`, never inline require)
│   │   ├── config.ts       ← app constants (platformFeeRate 0.1, otpLength 6, autoReleaseHours 72) — NEVER hardcode these in screens
│   │   └── api.ts          ← real HTTP client (backend §3.1)   [create when needed]
│   └── store/              ← zustand stores (authStore, ...)   [create when needed]
└── tsconfig.json           ← `@/*` → `./src/*` alias — always import via `@/`
```

---

## 5. Mobile Screens (26 total)

Single app, role-aware. Full detail: `../planning/02-architecture/02-mobile-screens.md`. API columns below are the SPEC's wishlist — only wire what actually exists in the backend (§3.1); everything else stays UI-only.

### Flow A — Auth (shared)

| ID | Screen | Purpose / key API |
| --- | --- | --- |
| A1 | Splash/Bootstrap | Read JWT from SecureStore → validate `/auth/me` → route. `authStore` |
| A2 | Onboarding carousel | 3-slide value prop; sets `hasSeenOnboarding` |
| A3 | Sign Up (phone) | phone/name/email → `POST /auth/register` (RHF + zod) |
| A4 | OTP Verification | 6-digit → `POST /auth/verify-otp` → JWT + refresh in SecureStore |
| A5 | Role Selection | Rentier vs Rentile cards → `PATCH /users/me` `activeRole` |
| A6 | Rentile KYC | 3-step: ID upload, selfie (expo-camera), bank → S3 presigned → `POST /kyc/submit` |

### Flow B — Shared / Map & Profile

| ID | Screen | Purpose / key API |
| --- | --- | --- |
| B1 | Home (role-aware) | Rentier: map of own tasks + "Post a Task" FAB. Rentile: nearby pins + Available toggle. `/tasks?owner=me` vs `/tasks/nearby`; WS `tasks:zone:{geohash}` |
| B2 | Live Tracking / Task Room | Live rentile marker, status banner, chat, proof preview. Rentier: Approve/Dispute/Cancel. Rentile: Start/Mark Completed. WS `task:{id}` |
| B3 | Chat | Text + image; WS `task:{id}:chat`; `GET /tasks/:id/messages` |
| B4 | Profile | Avatar, rating, KYC badge, wallet shortcut, role switch, logout |
| B5 | Notifications | Grouped list, deep links; `GET /notifications`; WS `user:{id}:notify` |
| B6 | Settings | Language, notification prefs, payment methods, legal, delete account |

### Flow C — Rentier

| ID | Screen | Purpose / key API |
| --- | --- | --- |
| C1 | Post Step 1 — Describe | Description + photos; debounced `POST /ai/categorize`; wizard state in `createTaskStore` |
| C2 | Post Step 2 — Location | Draggable pin + address autocomplete/geocode |
| C3 | Post Step 3 — Budget | Amount + AI price hint (`POST /ai/suggest-price`); urgency; instant-accept vs bidding |
| C4 | Post Step 4 — Review & Fund | Fee breakdown; `POST /tasks` (DRAFT) → `POST /escrow/lock` → OPEN. **Not visible to Rentiles until `escrowStatus = FUNDS_LOCKED`** |
| C5 | My Tasks | Tabs: Open/Assigned/Pending Approval/Completed/Disputed; infinite scroll |
| C6 | Bids/Applicants | Compare bids (rating, ETA, price); WS `task:{id}:bids`; `POST /tasks/:id/assign` |
| C7 | Approve & Review | Proof gallery; `POST /escrow/:taskId/release` (90/10) → `POST /ratings`; or `POST /disputes` |

### Flow D — Rentile

| ID | Screen | Purpose / key API |
| --- | --- | --- |
| D1 | Task Feed | Map/list toggle, filter chips; AI-ranked `?ranked=true`; `POST /runners/availability` |
| D2 | Task Detail | Shows **net payout = amount × 0.90**; `POST /tasks/:id/accept` or `/bids` |
| D3 | Active Task (=B2) | `PATCH /tasks/:id/status`; proof → S3 → `POST /tasks/:id/proof`; GPS via WS `task:{id}:location` |
| D4 | Earnings/Wallet | Available vs In-Escrow balances; withdraw blocked unless `kycStatus = APPROVED` |
| D5 | Withdraw | `POST /payouts` → PENDING → webhook → PAID |

### Tab bars

- **Rentier:** Home · My Tasks · Post (FAB) · Wallet · Profile
- **Rentile:** Feed · My Jobs · Map · Wallet · Profile

### Route guard (root layout redirect rule — single source of navigation truth)

On app start: `!hasSeenOnboarding` → `(onboarding)`; no valid JWT → `(auth)`; JWT but no `activeRole` → role selection; else → `(tabs)`. Every new screen plugs into this rule — do not add ad-hoc redirects in screens.

### Static images policy

Only images that will NEVER come from the backend live in `assets/images/` (logos, onboarding illustrations, role cards, empty states) — registered in `src/lib/assets.ts`. Dynamic content (task photos, avatars, proofs) comes from the backend/S3; use placeholders in UI-only screens.

### Screen-flow order (build order reference)

Splash → Onboarding → Sign up → Log in → OTP → Role selection → Rentile KYC → Rentile Home/Map → Task feed → Task detail → Place bid → Rentier Home → Post 1–4 → My Tasks → Bids → Task Room → Chat → Approve+rate → Wallet → Withdraw → Notifications → Profile → Settings

---

## 6. Escrow State Machine (NEVER violate)

```
FUNDS_LOCKED ──assign──▶ HELD_IN_ESCROW ──rentile done──▶ PENDING_APPROVAL ──approve──▶ RELEASED (Rentile 90% / Platform 10%)
     │                                                        │
     └──cancel pre-assign──▶ REFUNDED                         └──dispute──▶ IN_DISPUTE ──admin──▶ RELEASED | REFUNDED | SPLIT
```

Hard rules:

1. **No task is LIVE until funds are confirmed locked.**
2. Release only via: explicit Rentier approval, Admin ruling, or **auto-release timer (~72h in PENDING_APPROVAL)**.
3. Every transition = immutable ledger entry with unique **idempotency key** (double-entry accounting, backend concern — but client must send `Idempotency-Key` header on money POSTs).
4. 10% fee deducted from Rentile payout — read from config, never hardcode.
5. Rentile can withdraw only RELEASED balance, and only after `kycStatus = APPROVED`.
6. Money NEVER flows Rentier→Rentile directly.

---

## 7. API Conventions

> **Reality check:** where this section conflicts with the live backend, §3.1 wins. The items below marked *(spec)* are future contract goals, not implemented yet.

- REST for commands/mutations; WebSocket for live updates only — **never mutate money over WS**. *(spec — no WS yet)*
- Base `/api/v1`, JSON, plural nouns, GET/POST/PUT/PATCH/DELETE.
- Auth: `Authorization: Bearer <jwt>` (single `access_token`, no refresh yet); socket handshake also JWT-authenticated *(spec)*.
- All request bodies validated against zod schemas (`src/schema/`) — keep schemas mirroring the backend DTOs (class-validator on their side).
- **Success envelope (real):** `{ message, ...data }` from the backend's global ResponseInterceptor.
- **Error shape (real):** NestJS exception body (`statusCode`, `message`, `error?`) from the GlobalExceptionFilter — NOT the spec's `{ error: { code, ... } }`.
- `Idempotency-Key` header required on `/escrow/lock`, `/escrow/release`, `/payouts`. *(spec)*
- Cursor pagination: `?cursor=&limit=`. *(spec)*
- WS rooms: `tasks:zone:{geohash}`, `task:{id}`, `task:{id}:location`, `task:{id}:bids`, `task:{id}:chat`, `user:{id}:notify`. *(spec)*
- **The contract is the backend's code:** read the controller/DTO in `../uber_backend/src/modules/` (or Swagger at `/api`) before wiring; then write the matching zod schema, then implement.
- **No mock API layer.** `src/lib/api.ts` is a thin typed fetch wrapper over the real backend. Screens without a backend feature yet stay UI-only (no fake data plumbing).

---

## 8. Design System (from DESIGN.md — full spec there)

### Stitch design reference (source of truth for screen designs)

Stitch project ID: **`14817508801437868150`** ("Errandly — Mobile App", ~45 mobile screens matching this design system).

**Workflow rule:** Before implementing any screen, fetch its design from the Stitch project (`stitch_get_screen` → download the `htmlCode` URL) for reference/inspiration. Adapt to our tailwind tokens — do not copy web-only patterns blindly. Screens are implemented ONLY when the user explicitly requests a specific screen.

Observed patterns from Stitch (use in components): primary buttons `h-14` pill, social/ghost buttons `h-12` pill with 1px ink border, underline inputs with uppercase `label-md` labels, canvas chips `px-4 py-1`, bottom sheets with drag handle (`w-12 h-1 bg-canvas rounded-full`), tap feedback `active:scale-[0.98]`.

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

- [x] Shared UI kit: `Container` (safe-area wrapper), `Button` (primary/secondary/ghost), `Input` + `InputController` (RHF, underline style, focus/error), `OtpInput`, `Chip`
- [x] Zod schemas: `src/schema/auth.ts` (signup, login phone/email, otp, verify-email, reset-password)
- [x] `src/lib/api.ts` real HTTP client (axios instance + auth/error interceptors, base URL from env) + `src/lib/auth-api.ts` + `src/store/authStore.ts` (Zustand + SecureStore) + `hasSeenOnboarding` + route guard in root layout
- [x] Align auth screens with real backend model (UI + zod only, no API yet): signup firstName/lastName/email/password(+optional phone), login email+password + "Forgot password?", reset-password (email) → new-password (password+confirm); phone/OTP kept UI-only (verify-otp orphaned)
- [x] QueryClientProvider in root layout (`src/lib/queryClient.ts`)
- [x] Onboarding: 3-slide carousel (`(onboarding)/index.tsx`; `hasSeenOnboarding` flag deferred until authStore exists; auth signup/login are placeholders)
- [x] Auth screens (UI + validation only, no api/store yet): signup (firstName/lastName/email/password/+phone/+bio/terms), login (email+password + "Forgot password?"), verify-email ("Check your inbox"), reset-password (2-state: email form → "Check your inbox"), new-password (deep-link target for reset); shared `authHeader.tsx` + `socialAuth.tsx` (Apple/Google + divider) + `phoneInput.tsx` (libphonenumber-js country picker, E.164) + `checkInbox.tsx` (mail icon + resend cooldown); `Input` supports `prefix` and `secureToggle`; OTP fully removed
- [x] Wire auth screens to backend (signup, login, forgot/reset, resend verification) via `src/hooks/useAuth.ts` — verification gate enforced (`GET /users/me` 401 "User is not verified" → verify-email screen). BLOCKED at runtime by backend login-token bug (missing `sub`) — see §1 known bugs
- [ ] Backend email template change + app deep linking (Phase C): backend team switches Verify/Reset URLs to `errandly://verify-email?token=...` / `errandly://reset-password?token=...` (or universal links `https://errandly.app/...`); frontend adds `"scheme": "errandly"` to `app.json`, `associatedDomains`/`intentFilters`, and extends `verify-email.tsx` to auto-verify when `token` param present (POST /auth/verify-email → store `access_token` → redirect to home)
- [ ] Tabs shell: placeholder role-aware tabs (Home / My Tasks / Wallet / Profile)

### Phase 4+ — Core app (in screen-flow order)

- [ ] Role selection + Rentile KYC
- [ ] Home (role-aware, maps)
- [ ] Post-task wizard (C1–C4) + escrow lock (UI-only until backend ships tasks/escrow)
- [ ] Task feed / detail / bids (Rentile)
- [ ] My Tasks + Bids/Applicants (Rentier)
- [ ] Task Room + chat + tracking
- [ ] Approve/release + ratings
- [ ] Wallet + withdraw
- [ ] Notifications, Profile, Settings

---

## 11. Pointers

Paths are relative to `uber_frontend/` (planning + backend are sibling folders).

| Need | File |
| --- | --- |
| Master index of spec | `../planning/INDEX.md` |
| Business overview, KPIs | `../planning/01-business/01-overview.md` |
| Personas & journeys | `../planning/01-business/02-personas-workflows.md` |
| User stories | `../planning/01-business/03-user-stories.md` |
| AI features | `../planning/01-business/04-ai-use-cases.md` |
| Escrow (business) | `../planning/01-business/05-escrow-logic.md` |
| All 24+ mobile screens (detailed) | `../planning/02-architecture/02-mobile-screens.md` |
| Tech stack rationale | `../planning/03-engineering/03-tech-stack.md` |
| API design & WS channels (spec) | `../planning/03-engineering/04-api-design.md` |
| Escrow (code rules) | `../planning/03-engineering/05-escrow-implementation.md` |
| Git workflow & DoD | `../planning/04-operations/04-workflow-glossary.md` |
| Full design tokens & style | `DESIGN.md` |
| Screen flow + Stitch designs | `../planning/design/screens/SCREEN_FLOW.md` |
| HTML screen mockups | `../planning/design/screens/*.html` + `*-preview.png` |
| Logos | `../planning/design/logo/` |
| **Real auth endpoints/DTOs** | `../uber_backend/src/modules/auth/` (controller, dto/, guards) |
| **Real users endpoints/DTOs** | `../uber_backend/src/modules/users/` |
| Backend DB schema (Drizzle) | `../uber_backend/src/database/schema/` |
| Backend env/config defaults | `../uber_backend/src/config/env.config.ts` |
| Swagger UI (backend running) | `http://localhost:3000/api` |
