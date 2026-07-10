# 🗺️ Errandly — Stitch Screen Order & Navigation Flows

The correct order to follow the screens in the **Stitch project**, separated into the **Master** and **Runner** journeys.

- **Stitch project:** `projects/14817508801437868150`
- **Design system:** `assets/1e7152b9b97b4beb8ffc010a621d7bff`
- Legend: 🟢 in Stitch (canvas) · 🟠 built as HTML in `design/screens/` (Stitch generation timed out — re-run later)

---

## 🔗 SHARED START — every user (before roles split)

Order to arrange left→right in Stitch:

| # | Screen | Stitch ID | Status |
|---|--------|-----------|--------|
| 1 | Splash | `37bff51e57454e0e84dc21afba0dbdc4` (Splash v2) | 🟢 |
| 2 | Onboarding (3 slides) | `5c2b47ac26a748bea3590ad763c619b0` | 🟢 (1 slide in Stitch; 3-slide version in `onboarding.html`) |
| 3 | Sign up | `58d201cf430b42c08b3f4648a01fb5aa` (Create Account) | 🟢 |
| 4 | Log in | `d6a79148c4e14d939a5ee68442e7114d` | 🟢 |
| 5 | OTP verification | `410f79c5f5e04bf3989f909f36746396` | 🟢 |
| 6 | Role selection ◀ **splits here** | `2d5e12f691854a0ea5ed7a8736050ce6` | 🟢 |

At **Role selection** the flow branches:
- Chose **Master** → go to the 🟠🟧 MASTER FLOW below.
- Chose **Runner** → go to the 🟢🟩 RUNNER FLOW below (Runner does KYC first).

---

## 🟧 MASTER FLOW (client who posts tasks)

Arrange this as **Row 1** on the Stitch canvas, in this order:

| Step | Screen | Stitch ID | Status |
|------|--------|-----------|--------|
| M1 | Master Home | `9fe25c3c61fe40c1aaf39fd0d67f33c8` | 🟢 |
| M2 | Post task — Step 1 (Describe) | `73096d241cb34840887fe5d71554830d` | 🟢 |
| M3 | Post task — Step 2 (Location) | `155b047963c741c8b487148eb83443a3` | 🟢 |
| M4 | Post task — Step 3 (Budget & schedule) | `b7124224ab0b423596a72ecc2f5f2a99` | 🟢 |
| M5 | Post task — Step 4 (Review & pay / lock escrow) | `5791c88545834535a3468b115f352812` | 🟢 |
| M6 | My tasks (Master) | — | 🟠 `my-tasks-master.html` |
| M7 | Bids & applicants → pick a Runner | — | 🟠 `bids-applicants.html` |
| M8 | Live task tracking (shared) | `503e5fb904a743c39b72e8ef7d7df93f` | 🟢 |
| M9 | In-task chat (shared) | `a42d7755d1a14faaa878a5067bd0b562` | 🟢 |
| M10 | Review completion → Approve & release + rate | `8d4baee1d4554418a4f03d0944ee5964` | 🟢 |

**Master journey (arrows):**
```
Role: Master → Master Home
  → Post 1 → Post 2 → Post 3 → Post 4 (lock funds in escrow)
  → task goes live → My tasks → Bids & applicants → Accept a Runner
  → Live tracking ⇄ Chat
  → Runner completes → Review completion → Approve & release (90/10) → Rate
```

---

## 🟩 RUNNER FLOW (freelancer who does tasks)

Arrange this as **Row 2** on the Stitch canvas, in this order:

| Step | Screen | Stitch ID | Status |
|------|--------|-----------|--------|
| R1 | Runner KYC (verify identity) | — | 🟠 `kyc-verification.html` |
| R2 | Runner Home — Map view | `10d9b77e751044849b8fd9b99aa12cc5` | 🟢 |
| R3 | Nearby tasks — List view | `d979441399d54f4aac7c2e94e1725d73` | 🟢 |
| R4 | Task detail (Runner) | `94680f78e4b34998a72253e2570e39db` | 🟢 |
| R5 | Place bid | `8eaa09d8a4e5492b82a97b929a071797` | 🟢 |
| R6 | Live task tracking (shared) | `503e5fb904a743c39b72e8ef7d7df93f` | 🟢 |
| R7 | In-task chat (shared) | `a42d7755d1a14faaa878a5067bd0b562` | 🟢 |
| R8 | Runner Wallet | `fb46faf16bbb413aa0854404ebd2dccb` | 🟢 |
| R9 | Withdraw | — | 🟠 `withdraw.html` |

**Runner journey (arrows):**
```
Role: Runner → KYC (verify identity) → approved
  → Runner Home (Map) ⇄ Nearby tasks (List)
  → Task detail → Accept (instant) OR Place bid → assigned
  → Live tracking ⇄ Chat → Start task → Mark complete + upload proof
  → payment released → Wallet → Withdraw → paid
```

---

## ⚪ SHARED / ACCOUNT (reachable from tab bar in both roles)

Arrange as **Row 3** on the Stitch canvas:

| Screen | Stitch ID | Status |
|--------|-----------|--------|
| Notifications | `cee8bb74a9db4b868ccd4582d3c21487` | 🟢 |
| Profile | `f9e9e06353a24c428e5a0f3678bdc342` | 🟢 |
| Settings | `64db7281726846389b2737ca373a4a8a` | 🟢 |

---

## 📌 Suggested Stitch canvas layout (3 rows)

```
ROW 0  (shared start):  Splash → Onboarding → Sign up → Log in → OTP → Role selection
ROW 1  (MASTER):        Master Home → Post 1 → Post 2 → Post 3 → Post 4 → My tasks → Bids → Live → Chat → Approve & rate
ROW 2  (RUNNER):        KYC → Home/Map → List → Task detail → Place bid → Live → Chat → Wallet → Withdraw
ROW 3  (shared/account):Notifications → Profile → Settings
```
Tip: In Stitch, select a row of frames and use **Tidy up / align** to snap them into an even horizontal line, then space rows ~1300px apart vertically.

---

## 🧭 Tab bars (bottom navigation)
- **Master tabs:** Home · My tasks · **Post (amber FAB)** · Wallet · Profile
- **Runner tabs:** Feed (Home/Map) · My jobs · Map · Wallet · Profile
- Active tab = ink icon/label with a small **amber dot** indicator.

---

## ⚠️ Still to add to the Stitch canvas (4 screens)
These exist as HTML but their Stitch generations timed out — re-run in Stitch when the service is stable so the canvas is complete:
1. **Runner KYC** (Runner R1)
2. **My tasks (Master)** (Master M6)
3. **Bids & applicants** (Master M7)
4. **Withdraw** (Runner R9)

Also on the canvas but **not app screens** (brand assets — keep separate or in a side group): Splash v1 (hidden), Errandly Icon Mark, Horizontal Logo, Monogram, Brand Showcase, and the AI illustration/proof tiles.
