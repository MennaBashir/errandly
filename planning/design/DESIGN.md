---
version: alpha
name: Errandly
website: "https://errandly.app"
description: An Uber-inspired design language re-tuned for an on-site physical freelancing marketplace. It keeps Uber's disciplined ink-on-canvas duet and the single signature pill shape (radius 999px), but introduces one signature accent — Amber #F2A104 — reserved exclusively for primary conversion CTAs, active states, and the live "task in progress" pulse. Decoration is limited to editorial 4:3 illustrations of runners, errands, and city objects.

seo:
  title: "Errandly Design System for React Native — Amber #F2A104, Ink Black #000000, Inter, 40+ components"
  metaDescription: "Errandly's mobile design system as a DESIGN.md file. Ink Black #000000 + a single Amber #F2A104 accent, Inter type, pill geometry. For React Native, Expo, and AI tools."
  highlights:
    - "Ink-and-canvas duet plus ONE accent — pure black #000000 and white #ffffff carry the system; Amber #F2A104 is the only chromatic voltage, reserved for primary CTAs and live states"
    - "Pill is the signature shape — 999px radius on every interactive element except cards (rounded.xl 16px) and the off-shape 36px segmented toggle"
    - "Inter family in two roles — Inter 700 for 20-52px headlines, Inter 400/500 for body, button, and link"
    - "Amber carries conversion; black carries structure — the amber pill is the single most important pixel on every screen"
    - "Editorial 4:3 illustrations of runners and errands are the only decoration — no gradients, no atmospheric backdrops"
  tags:
    - "Marketplaces"
    - "On-Demand Services"
  lastUpdated: "2026-07-01"
  author:
    name: "Errandly Product"
    url: "https://errandly.app"

colors:
  primary: "#F2A104"
  on-primary: "#000000"
  primary-pressed: "#D98E00"
  primary-soft: "#FDF0D5"
  ink: "#000000"
  body: "#5e5e5e"
  mute: "#afafaf"
  hairline-mid: "#4b4b4b"
  canvas: "#ffffff"
  canvas-soft: "#efefef"
  canvas-softer: "#f3f3f3"
  surface-pressed: "#e2e2e2"
  link: "#0000ee"
  on-dark: "#ffffff"
  black-elevated: "#282828"
  success: "#0F8A50"
  danger: "#D63A2F"
  live: "#F2A104"

typography:
  display-xxl:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 52px
    fontWeight: 700
    lineHeight: 64px
  display-xl:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 36px
    fontWeight: 700
    lineHeight: 44px
  display-lg:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 32px
    fontWeight: 700
    lineHeight: 40px
  display-md:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 24px
    fontWeight: 700
    lineHeight: 32px
  display-sm:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 20px
    fontWeight: 700
    lineHeight: 28px
  body-lg:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 18px
    fontWeight: 500
    lineHeight: 24px
  body-md:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
  body-md-strong:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 16px
    fontWeight: 500
    lineHeight: 20px
  body-sm:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  body-sm-strong:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 16px
  caption:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 12px
    fontWeight: 400
    lineHeight: 20px
  button-large:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 18px
    fontWeight: 500
    lineHeight: 24px
  button-md:
    fontFamily: Inter, system-ui, Helvetica Neue, Arial, sans-serif
    fontSize: 16px
    fontWeight: 500
    lineHeight: 20px

rounded:
  none: 0px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 999px
  pill-tab: 36px
  full: 9999px

spacing:
  xxs: 4px
  xs: 6px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 32px

components:
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md-strong}"
    padding: "{spacing.lg} {spacing.2xl}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.md} {spacing.2xl}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.md} {spacing.2xl}"
  button-subtle:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.md} {spacing.lg}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.md} {spacing.2xl}"
  button-floating:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.pill}"
    padding: "{spacing.md}"
  button-large-rounded:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-large}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg} {spacing.xl}"
  segmented-toggle:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    activeBackground: "{colors.canvas}"
    typography: "{typography.body-md-strong}"
    rounded: "{rounded.pill-tab}"
  text-input:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  otp-input-box:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    activeBorder: "{colors.primary}"
    typography: "{typography.display-md}"
    rounded: "{rounded.md}"
  card-content:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.2xl}"
  card-elevated:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.2xl}"
  card-soft-tinted:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.2xl}"
  task-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    payoutColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  promo-card-on-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.2xl}"
  fee-breakdown-card:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    totalColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.2xl}"
  bottom-sheet:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    handleColor: "{colors.surface-pressed}"
    rounded: "{rounded.xl}"
    padding: "{spacing.2xl}"
  status-pill-open:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-pressed}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.pill}"
    padding: "{spacing.xxs} {spacing.md}"
  status-pill-live:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.pill}"
    padding: "{spacing.xxs} {spacing.md}"
  status-pill-done:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.success}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.pill}"
    padding: "{spacing.xxs} {spacing.md}"
  category-chip:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    activeBackground: "{colors.ink}"
    activeText: "{colors.on-dark}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.pill}"
    padding: "{spacing.sm} {spacing.lg}"
  bottom-tab-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.mute}"
    activeColor: "{colors.ink}"
    typography: "{typography.caption}"
    padding: "{spacing.sm} {spacing.lg}"
  map-marker-task:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  map-marker-runner:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.full}"
  avatar:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  rating-star:
    activeColor: "{colors.primary}"
    inactiveColor: "{colors.surface-pressed}"
  chat-bubble-self:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.md} {spacing.lg}"
  chat-bubble-other:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.md} {spacing.lg}"
  wallet-balance-card:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    accentColor: "{colors.primary}"
    typography: "{typography.display-lg}"
    rounded: "{rounded.xl}"
    padding: "{spacing.2xl}"
  icon-button-circular:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
  faq-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md-strong}"
    padding: "{spacing.lg} 0"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
    typography: "{typography.body-sm}"
    padding: "{spacing.md} {spacing.lg}"
  empty-state-card:
    backgroundColor: "{colors.canvas-soft}"
    textColor: "{colors.body}"
    rounded: "{rounded.xl}"
    padding: "{spacing.3xl}"
    captionTypography: "{typography.body-md}"
  link-blue:
    textColor: "{colors.link}"
    typography: "{typography.body-md}"
  link-mute:
    textColor: "{colors.hairline-mid}"
    typography: "{typography.body-md}"

---

## Overview

Errandly is an on-site physical freelancing marketplace — Masters post real-world errands, Runners execute them, and an escrow system protects both sides. The interface borrows Uber's discipline: a black-and-white duet where ink `{colors.ink}` (`#000000`) carries structure (headlines, body, the dark wallet/promo surfaces, map runner markers) and canvas `{colors.canvas}` (`#ffffff`) carries everything else. Where Uber stops at two colors, Errandly adds exactly **one** chromatic voltage: **Amber `{colors.primary}` (`#F2A104`)**. Amber is the single conversion color — the "Post a Task" pill, the "Accept Task" pill, the active tab dot, the live "task in progress" pulse, the map task-pin, and the active rating star. Nothing else is colored. This restraint makes the amber pill the single most important pixel on every screen.

Type carries the second voice. The system runs the **Inter** family in two roles: Inter 700 for headlines (`display-sm` 20px up to `display-xxl` 52px) and Inter 400/500 for body, button, and link (`UberMove`/`UberMoveText` are proprietary; Inter is the documented substitute, with `font-feature-settings: "ss01"` enabled on display sizes). Headlines are sentence-case; eyebrows are the only uppercase; buttons are sentence-case.

The single shape signature is the pill. Every interactive element rounds to `{rounded.pill}` 999px — primary amber CTA, secondary outline pill, subtle gray pill, category chip, status pill, app-download pill, circular icon button. Cards and surfaces round to `{rounded.xl}` 16px. The Master/Runner role switch and the Map/List toggle use the off-shape `{rounded.pill-tab}` 36px segmented control.

**Key Characteristics:**
- A three-tier CTA hierarchy: **amber `{colors.primary}` (`#F2A104`)** pill for the single primary conversion target per screen; **ink `{colors.ink}`** pill (`button-dark`) for strong-but-secondary actions; white outline pill (`button-secondary`) and gray pill (`button-subtle`) for tertiary.
- The pill is the single signature shape — `{rounded.pill}` 999px everywhere interactive, except the segmented toggle (`{rounded.pill-tab}` 36px) and the larger flow buttons (`{rounded.xl}` 16px).
- Amber is sacred: it never decorates. It marks the primary action, the active/live state, the task map-pin, and the rating star — nothing else.
- Cards are `{rounded.xl}` 16px on white; the wallet balance and dark promo bands flip to ink fill with white text and an amber accent figure.
- Editorial 4:3 illustrations of runners, errands, and city objects are the only decorative system; no gradients, no atmospheric backdrops.
- The dark polarity-flip (ink surface, white text, amber accent) is the depth cue for the wallet, live-task banner, and promo callouts.

## Colors

### Brand & Accent
- **Amber** (`{colors.primary}` — `#F2A104`): The brand's only conversion and live-state color. The "Post a Task" / "Accept Task" / "Confirm & Lock Funds" pill, the active tab indicator, the live task pulse, the map task-pin, the active rating star. One amber element per visible viewport is the conversion story.
- **Amber Pressed** (`{colors.primary-pressed}` — `#D98E00`): The pressed/active state for amber pills.
- **Amber Soft** (`{colors.primary-soft}` — `#FDF0D5`): The tint behind "Open" status pills and amber callout backgrounds. Used sparingly.
- **On Primary** (`{colors.on-primary}` — `#000000`): Black text/icon on the amber pill — amber + black is the signature combo, never amber + white (fails contrast).

### Surface
- **Canvas** (`{colors.canvas}` — `#ffffff`): Default screen background.
- **Canvas Soft** (`{colors.canvas-soft}` — `#efefef`): Input fills, chips, subtle pills, segmented-toggle track.
- **Canvas Softer** (`{colors.canvas-softer}` — `#f3f3f3`): Nested input fill on white cards.
- **Surface Pressed** (`{colors.surface-pressed}` — `#e2e2e2`): Pressed state for white surfaces; bottom-sheet drag handle; inactive star.
- **Black Elevated** (`{colors.black-elevated}` — `#282828`): Hover/pressed on dark surfaces.

### Text
- **Ink** (`{colors.ink}` — `#000000`): Headings and body on light surfaces.
- **Body** (`{colors.body}` — `#5e5e5e`): Secondary text, captions, supporting copy.
- **Hairline Mid** (`{colors.hairline-mid}` — `#4b4b4b`): Muted links.
- **Mute** (`{colors.mute}` — `#afafaf`): Placeholders, fine print, inactive tab labels.
- **On Dark** (`{colors.on-dark}` — `#ffffff`): Text on ink surfaces (wallet, dark bands, chat-self bubble).

### Semantic
Unlike Uber, Errandly handles money and disputes, so a minimal semantic set exists — used only for status, never for decoration:
- **Success** (`{colors.success}` — `#0F8A50`): Completed/Paid status text, escrow-released confirmation.
- **Danger** (`{colors.danger}` — `#D63A2F`): Disputes, destructive actions (cancel, ban), error validation.
- **Live** (`{colors.live}` — `#F2A104` = amber): The in-progress/tracking state. Live intentionally equals the brand amber so "active" always reads as the brand voltage.
- **Link** (`{colors.link}` — `#0000ee`): Browser-default blue inside legal fine print only.

## Typography

### Font Family
The **Inter** family carries the entire system in two non-overlapping roles:
1. **Inter 700** for every headline (`display-sm` 20px → `display-xxl` 52px). No italic, no tracking variation. Enable `font-feature-settings: "ss01"` to approximate the UberMove geometric look.
2. **Inter 400 / 500** for body, button, link, and small headings (12–18px). Neutral tracking always.

### Hierarchy

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `{typography.display-xxl}` | 52px | 700 | 64px | Onboarding hero ("Get anything done"). |
| `{typography.display-xl}` | 36px | 700 | 44px | Screen headlines ("Post a task", "Your wallet"). |
| `{typography.display-lg}` | 32px | 700 | 40px | Wallet balance figure, big numbers. |
| `{typography.display-md}` | 24px | 700 | 32px | Card titles, sheet titles, OTP digits. |
| `{typography.display-sm}` | 20px | 700 | 28px | Sub-card headings, list section titles. |
| `{typography.body-lg}` | 18px | 500 | 24px | Lead paragraphs, large body. |
| `{typography.body-md}` | 16px | 400 | 24px | Default paragraph body, chat. |
| `{typography.body-md-strong}` | 16px | 500 | 20px | Emphasis, most button labels, nav. |
| `{typography.body-sm}` | 14px | 400 | 20px | Captions, metadata, task distance/ETA. |
| `{typography.body-sm-strong}` | 14px | 500 | 16px | Chip labels, status pills. |
| `{typography.caption}` | 12px | 400 | 20px | Fine print, tab-bar labels. |
| `{typography.button-large}` | 18px | 500 | 24px | Large flow buttons (Confirm & Lock Funds). |
| `{typography.button-md}` | 16px | 500 | 20px | Default button label. |

### Principles
- Sentence-case is the voice. No all-caps headlines except rare eyebrow tags.
- Weight 700 for headlines; weight 500 for buttons and emphasis. Never promote button labels to 700.
- No tracking flourish on display sizes.
- Two roles, one family — Inter 700 display never carries body; Inter 400/500 never carries a hero.

### Note on Font Substitutes
UberMove/UberMoveText are proprietary. **Inter** (700 with ss01; 400/500 for text) is the chosen substitute. *Geist* 700 is a viable display fallback.

## Layout

### Spacing System
- **Base unit**: 4px. Tokens: `{spacing.xxs}` 4 · `{spacing.xs}` 6 · `{spacing.sm}` 8 · `{spacing.md}` 12 · `{spacing.lg}` 16 · `{spacing.xl}` 20 · `{spacing.2xl}` 24 · `{spacing.3xl}` 32.
- **Screen padding**: 16px (`{spacing.lg}`) horizontal gutters on mobile; 24px (`{spacing.2xl}`) top of scroll content under the header.
- **Card interior**: content cards at 24px (`{spacing.2xl}`); compact task cards at 16px (`{spacing.lg}`).
- **Inline gap**: 12px (`{spacing.md}`) between sibling chips, buttons, list rows.
- **List row rhythm**: 12px between stacked task cards; 8px (`{spacing.sm}`) between a title and its caption inside a card.

### Grid & Container
- **Mobile-first single column.** Full-width cards with 16px gutters.
- **Bottom sheets** snap to ~40% / ~90% of viewport height over the map.
- **Tab bar** fixed at bottom, 5 items max; safe-area inset respected.

### Whitespace Philosophy
Card-to-card spacing carries the rhythm (12px gutter between task cards); inside a card the title/caption/CTA stack is tight (8px). Dark surfaces (wallet, live banner) have no internal hairlines — content sits flat on ink with white text and a single amber figure.

### Responsive Strategy

#### Breakpoints (mobile app)

| Name | Width | Key Changes |
|---|---|---|
| Compact phone | < 360px | Single column; chip rows scroll horizontally; reduce display-xxl to display-xl. |
| Standard phone | 360–430px | Default target. Full layouts as specified. |
| Large phone | 430–600px | Same layout; more breathing room; map bottom-sheet peek taller. |
| Tablet | ≥ 600px | Content max-width ~520px centered; two-column task list optional. |

#### Touch Targets
The amber `button-primary` renders ~48px tall; `button-large-rounded` ~56px. Category chips and status pills inflate to ≥44px tall on touch. The bottom-tab items are ≥48px. All meet WCAG AAA.

#### Image Behavior
- Editorial illustrations: 4:3 hard-edge rectangles inside `{rounded.xl}` cards; never circle-cropped, never tilted.
- Proof photos / task photos: square or 4:3 thumbnails in `{rounded.md}` 8px frames.
- Maps: full-bleed behind bottom sheets; monochrome map style with amber task-pins and ink runner-marker.
- Avatars: `{rounded.full}` circles.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | No shadow, no border. | Default — most cards lean on canvas-soft contrast. |
| Level 1 — Subtle Drop | `rgba(0,0,0,0.12) 0 4px 16px 0` | Task cards in the feed; profile cards. |
| Level 2 — Sheet/Form Drop | `rgba(0,0,0,0.16) 0 -4px 24px 0` | Bottom sheets over the map; the post-task review card. |
| Level 3 — Pill Float | `rgba(0,0,0,0.16) 0 2px 8px 0` | Floating "Recenter" / "Post a Task" FAB over the map. |

### Decorative Depth
- **Dark polarity-flip** (ink surface + white text + amber accent) is the primary depth cue: wallet balance card, live-task banner, dark promo bands.
- **Amber as focus depth**: the single amber element pulls the eye forward; everything else recedes to grayscale.
- **Pill geometry** at varying heights creates nested-pill hierarchy.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed map, status bar, raw image edges. |
| `{rounded.md}` | 8px | Text inputs, OTP boxes, proof-photo thumbnails. |
| `{rounded.lg}` | 12px | Smaller secondary chrome. |
| `{rounded.xl}` | 16px | Canonical card radius — task cards, content cards, sheets, wallet card. |
| `{rounded.pill}` | 999px | Signature interactive shape — every pill button, chip, status pill, icon button. |
| `{rounded.pill-tab}` | 36px | Segmented toggle (Master/Runner, Map/List). |
| `{rounded.full}` | 9999px | Avatars, map markers, circular icon buttons. |

## Components

### Buttons
- **`button-primary`** — the amber conversion pill. Background `{colors.primary}` `#F2A104`, **black** text `{colors.on-primary}`, `{typography.button-md}`, `{rounded.pill}`, padding `{spacing.md} {spacing.2xl}`. One per screen.
- **`button-dark`** — strong secondary in ink. Background `{colors.ink}`, white text, same shape. For "Place Bid", "Start Task".
- **`button-secondary`** — white outline pill. Background `{colors.canvas}`, ink text, 1px ink border, `{rounded.pill}`. Tertiary.
- **`button-subtle`** — gray pill. Background `{colors.canvas-soft}`, ink text. Quiet actions inside cards.
- **`button-large-rounded`** — bigger amber CTA inside money flows ("Confirm & Lock Funds", "Approve & Release"). `{typography.button-large}`, `{rounded.xl}` 16px — the documented exception to the pill rule.
- **`button-floating`** — white FAB with Level 3 shadow, floats over the map.

### Inputs & Forms
- **`text-input`** — canvas-soft fill, ink text, `{rounded.md}` 8px, 16px padding.
- **`otp-input-box`** — 6 individual boxes; active box gets a 2px **amber** border; digit in `display-md`.
- **`segmented-toggle`** — track canvas-soft, active segment canvas white with subtle shadow; `{rounded.pill-tab}` 36px. Master/Runner switch and Map/List toggle.

### Cards & Containers
- **`task-card`** — the core feed unit. White, `{rounded.xl}` 16px, 16px padding, Level 1 shadow. Layout: category chip + status pill (top row), title (`display-sm`), description (`body-sm` body color), then a bottom row of payout (`display-sm` ink), distance + ETA (`body-sm`), avatar. Payout is ink — amber is reserved for the action button, not the price.
- **`fee-breakdown-card`** — canvas-soft, lists Task Cost, 10% platform fee, and **Total / Net payout** (total in ink `display-sm`). Used in Post-Task review and Task detail.
- **`wallet-balance-card`** — ink fill, white text, the balance figure in `display-lg`, and the "Withdraw" affordance + available/pending split. The amber accent appears as a small "+$X this week" figure or the Withdraw pill.
- **`bottom-sheet`** — white, top corners `{rounded.xl}`, drag handle in surface-pressed, Level 2 shadow. Hosts the task feed list / task preview over the map.
- **`promo-card-on-dark`** — ink fill, white text, amber accent word/figure, `{rounded.xl}`.
- **`empty-state-card`** — canvas-soft, body-color caption, generous 32px padding, holds a 4:3 illustration.

### Status & Chips
- **`status-pill-open`** — amber-soft fill `#FDF0D5`, amber-pressed text. "Open / Awaiting".
- **`status-pill-live`** — solid amber fill, black text, with a pulsing dot. "In progress / Live".
- **`status-pill-done`** — canvas-soft fill, success-green text. "Completed / Paid".
- **`category-chip`** — canvas-soft pill; active = ink fill + white text. Filters & category selection.

### Navigation
- **`nav-bar`** — white top bar, ink title in `body-md-strong`, optional back/close circular icon button.
- **`bottom-tab-bar`** — white, 5 items, inactive labels `{colors.mute}`, active label/icon `{colors.ink}` with a small **amber** dot/indicator under the active item. Master tabs: Home · My Tasks · Post (center amber FAB) · Wallet · Profile. Runner tabs: Feed · My Jobs · Map · Wallet · Profile.

### Live & Map
- **`map-marker-task`** — amber circle with black icon (a task pin). The only amber on the map.
- **`map-marker-runner`** — ink circle with white icon (the runner's live position).
- **`status-pill-live`** + a thin amber progress banner communicate the active task.

### Social & Money
- **`chat-bubble-self`** — ink bubble, white text, `{rounded.xl}`. **`chat-bubble-other`** — canvas-soft bubble, ink text.
- **`avatar`** — canvas-soft circle, `{rounded.full}`.
- **`rating-star`** — active amber, inactive surface-pressed. The rating star is one of the few places amber appears outside CTAs (it represents earned value).
- **`toast`** — ink pill, white text, Level 2 shadow.

### Links
- **`link-blue`** — `#0000ee`, legal fine print only.
- **`link-mute`** — hairline-mid gray, secondary links.

## Do's and Don'ts

### Do
- Reserve `{colors.primary}` amber `#F2A104` for the single primary action, the live/active state, the task map-pin, and the rating star. One amber moment per viewport.
- Always pair amber with **black** text/icons (`{colors.on-primary}`) — never amber with white.
- Use `{rounded.pill}` 999px on every interactive element; `{rounded.xl}` 16px on every card and sheet.
- Set headlines in `{typography.display-*}` weight 700, sentence-case.
- Use the ink polarity-flip (dark surface + white text + amber accent) for the wallet, live banner, and promo bands as the depth cue.
- Keep the task-card payout in **ink**, not amber — amber belongs to the action, not the price.

### Don't
- Don't introduce a second accent color. Amber is the only voltage; everything else is black/white/gray plus minimal semantic status colors.
- Don't color the payout, the whole card, or icons amber decoratively — it dilutes the conversion signal.
- Don't render amber text on white at small sizes (contrast). Amber is a fill behind black, or a large figure on ink.
- Don't use all-caps display headlines (eyebrows excepted).
- Don't drop shadows on every card — Level 0 flat is default; reserve shadow for feed cards, sheets, and the FAB.
- Don't tighten/loosen tracking on Inter display.

## Known Gaps
- **Hover/focus rings**: native press states use `{colors.primary-pressed}` / `{colors.surface-pressed}`; full focus-ring combos not fully specified.
- **Loading skeletons**: skeleton tint = `{colors.canvas-soft}` shimmer to `{colors.canvas-softer}`; detailed timing not captured.
- **Live map tile style**: monochrome map theme intended but tile palette not enumerated here.
- **Dark mode**: the app ships light-first; a full dark theme (ink canvas + amber accent) is a planned phase-2 token set.
