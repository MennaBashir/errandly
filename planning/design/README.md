# 🎨 Errandly — Design Kit

This folder holds the visual design system and generated screen designs for the Errandly mobile app.

## Design language
An **Uber-inspired** system re-tuned with ONE signature accent:
- **Ink black `#000000` + white `#FFFFFF`** carry all structure.
- **Amber `#F2A104`** is the ONLY accent — reserved for the primary CTA, the active tab dot, the live "in progress" state, the map task-pin, and the rating star. Amber always uses **black** text, never white.
- Grays: body `#5E5E5E`, mute `#AFAFAF`, canvas-soft `#EFEFEF`.
- **Type:** Inter — 700 sentence-case headlines, 400/500 body & buttons.
- **Shape:** 999px pill on every interactive element; 16px radius on cards/sheets; 36px segmented toggles; circular map markers & avatars.
- **No** second accent, **no** gradients, **no** all-caps headlines. Decoration = editorial 4:3 illustrations of runners/errands only.

## Files
- **`DESIGN.md`** — the full machine-readable design system (Google Labs DESIGN.md spec): colors, typography, spacing, radii, and 30+ component tokens. Feed this to Cursor / Claude / Copilot to generate matching React Native components.
- **`screens/`** — exported screen references (screenshots / notes).

## Stitch project
Screens were generated in **Google Stitch** (MCP), all pinned to the auto-derived Errandly design system so they stay consistent.

- **Project:** `projects/14817508801437868150` — "Errandly — Mobile App"
- **Design system asset:** `assets/1e7152b9b97b4beb8ffc010a621d7bff` — "Errandly" (primary `#000000`, secondary/accent `#F2A104`, tertiary `#5E5E5E`, neutral `#EFEFEF`, Inter, round-full)

### Generated screens
| # | Screen | Flow | Stitch screen ID |
|---|--------|------|------------------|
| 1 | Runner Home / Map feed | Runner | (first generation — see project thumbnail) |
| 2 | Post a task — Review & fund escrow | Master | `5791c88545834535a3468b115f352812` |
| 3 | My tasks (Master, segmented + filters + FAB) | Master | `5cba8b4151a84cff9a263675c96df6be` |
| 4 | Onboarding / Welcome | Auth | submitted (generating) |
| 5 | OTP verification | Auth | submitted (generating) |
| 6 | Task detail (Runner, Accept / Bid) | Runner | submitted (generating) |
| 7 | Wallet (dark balance card + transactions) | Runner | submitted (generating) |
| 8 | Live task tracking / Task room | Shared | submitted (generating) |
| 9 | Approve & release payment + rating | Master | submitted (generating) |

> Note: In this environment Stitch's `list_screens` was unreliable and several `generate_screen` calls timed out on the client while succeeding server-side. Open the Stitch project to view/confirm all screens and export HTML/screenshots. The design system asset guarantees visual consistency across every screen.

## How to use with the dev team
1. Hand `DESIGN.md` to the Mobile squad — it maps 1:1 to NativeWind/Tailwind tokens.
2. Each Stitch screen exports HTML/CSS that can be referenced when building the Expo/React Native components in `apps/mobile/src/features/*`.
3. Keep the amber rule sacred: one amber action per screen, payouts stay ink.
