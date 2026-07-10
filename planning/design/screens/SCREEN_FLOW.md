# 📱 Errandly — All App Screens (in flow order)

Every screen is generated in **Google Stitch** using the **Errandly design system** (amber `#F2A104` on ink/white, Inter, pill/16px shapes) for full visual consistency.

- **Stitch project:** `projects/14817508801437868150`
- **Design system asset:** `assets/1e7152b9b97b4beb8ffc010a621d7bff`
- Open the Stitch project to view/export each screen's HTML/CSS + screenshot.

Status: ✅ **All 26 screens generated & confirmed in Stitch.**

---

## 🔵 FLOW 1 — Launch & Auth
The very first screens a new/returning user sees.

| # | Screen | Purpose | Status | Screen ID |
|---|--------|---------|--------|-----------|
| 1 | **Splash** | App boot, logo + amber loading | ✅ | `b07cf3551280453aae4977cf21249739` |
| 2 | **Onboarding** | 3-slide value prop → Get started | ✅ | `5c2b47ac26a748bea3590ad763c619b0` |
| 3 | **Sign up (phone)** | Name, email, phone + socials | ✅ | `47e1cc3a7ea144ecbfafe225cd90a2f8` |
| 4 | **Log in** | Returning user, phone/email + socials | ✅ | `d6a79148c4e14d939a5ee68442e7114d` |
| 5 | **OTP verification** | 6-digit code, amber active box | ✅ | `410f79c5f5e04bf3989f909f36746396` |
| 6 | **Role selection** | Choose Master or Runner | ✅ | `2d5e12f691854a0ea5ed7a8736050ce6` |
| 7 | **Runner KYC** | ID + selfie + payout, 3-step stepper | ✅ | `c1b1d587d7cd47289e662ba29b7ea82a` |

**Flow:** Splash → (first time) Onboarding → Sign up → OTP → Role selection → (Runner) KYC → Home. Returning users: Splash → Log in → OTP → Home.

---

## 🟢 FLOW 2 — Runner: Discover & Claim
How a Runner finds and takes work.

| # | Screen | Purpose | Status | Screen ID |
|---|--------|---------|--------|-----------|
| 8 | **Runner Home / Map** | Map with amber task-pins + bottom sheet feed | ✅ | `10d9b77e751044849b8fd9b99aa12cc5` |
| 9 | **Task feed (list)** | List view + filter chips + search | ✅ | `d979441399d54f4aac7c2e94e1725d73` |
| 10 | **Task detail (Runner)** | Full task, net payout, Accept / Bid | ✅ | `94680f78e4b34998a72253e2570e39db` |
| 11 | **Place bid** | Amount + ETA + note bottom sheet | ✅ | `8eaa09d8a4e5492b82a97b929a071797` |

**Flow:** Home/Map ⇄ List → Task detail → Accept (instant) OR Place bid → assigned → Task room (Flow 4).

---

## 🟠 FLOW 3 — Master: Post & Manage
How a Master creates a task and picks a Runner.

| # | Screen | Purpose | Status | Screen ID |
|---|--------|---------|--------|-----------|
| 12 | **Master Home** | Greeting, big Post button, active tasks | ✅ | `9fe25c3c61fe40c1aaf39fd0d67f33c8` |
| 13 | **Post — Step 1 Describe** | Description + AI category + photos | ✅ | `73096d241cb34840887fe5d71554830d` |
| 14 | **Post — Step 2 Location** | Map pin + address | ✅ | `155b047963c741c8b487148eb83443a3` |
| 15 | **Post — Step 3 Budget** | Amount + AI price hint + mode/urgency | ✅ | `b7124224ab0b423596a72ecc2f5f2a99` |
| 16 | **Post — Step 4 Review & pay** | Fee breakdown + lock funds (escrow) | ✅ | `5791c88545834535a3468b115f352812` |
| 17 | **My tasks (Master)** | Tabs/filters + task cards + FAB | ✅ | `5cba8b4151a84cff9a263675c96df6be` |
| 18 | **Bids / applicants** | Compare runner bids, Accept | ✅ | `5a74b0230b1c46bcba16c20777d54080` |

**Flow:** Master Home → Post 1→2→3→4 (lock escrow) → task goes live → Bids → Accept → Task room (Flow 4).

---

## 🟣 FLOW 4 — Execution & Completion
The shared live experience once a task is assigned.

| # | Screen | Purpose | Status | Screen ID |
|---|--------|---------|--------|-----------|
| 19 | **Live task tracking / Task room** | Live map + status + runner controls | ✅ | `503e5fb904a743c39b72e8ef7d7df93f` |
| 20 | **Chat** | In-task messaging (ink/gray bubbles) | ✅ | `a42d7755d1a14faaa878a5067bd0b562` |
| 21 | **Approve & release + rating** | Review proof, release escrow, rate | ✅ | `8d4baee1d4554418a4f03d0944ee5964` |

**Flow:** Task room (track + chat) → Runner marks complete + proof → Master reviews → Approve & release (90/10 split) → rate.

---

## 🟡 FLOW 5 — Money
Runner earnings & payout.

| # | Screen | Purpose | Status | Screen ID |
|---|--------|---------|--------|-----------|
| 22 | **Wallet (Runner)** | Ink balance card + transactions | ✅ | `fb46faf16bbb413aa0854404ebd2dccb` |
| 23 | **Withdraw** | Amount + destination + confirm | ✅ | `b3193860dbeb483788a7b5368775cfa1` |

**Flow:** Wallet → Withdraw → confirm → payout pending → paid.

---

## ⚪ FLOW 6 — Account & System
Cross-cutting screens reachable from the tab bar / profile.

| # | Screen | Purpose | Status | Screen ID |
|---|--------|---------|--------|-----------|
| 24 | **Notifications** | Grouped alerts, amber unread dots | ✅ | `cee8bb74a9db4b868ccd4582d3c21487` |
| 25 | **Profile** | Avatar, rating, stats, KYC, menu | ✅ | `f9e9e06353a24c428e5a0f3678bdc342` |
| 26 | **Settings** | Account, preferences, toggles, legal | ✅ | `64db7281726846389b2737ca373a4a8a` |

---

## Navigation map (tab bars)
- **Master tabs:** Home · My Tasks · **Post (amber FAB)** · Wallet · Profile
- **Runner tabs:** Feed · My Jobs · Map · Wallet · Profile
- Active tab = ink icon/label with a small **amber dot** indicator.

## Notes
- **All 26 screens are complete.** The earlier client-side timeouts still persisted server-side after a wait; they are all now confirmed in the Stitch project.
- Every screen follows the amber-on-ink system: one amber primary action per screen, ink payouts, Inter type, pill/16px shapes.
- A few duplicate "Create Account" screens exist in the project from retries (`58d201cf...`, `cec1c2f4...`, `74a6cfb2...`) — the canonical Sign up is `47e1cc3a...`; the extras can be deleted in Stitch.
- The `1024x1024` / `1200x896` entries ("laundry bag", "receipt", "courier illustration", etc.) are AI proof/illustration images embedded inside screens — not standalone app screens.
