# 🏃 Errandly — Logo

The Errandly brand mark, built as clean scalable **SVG** in the amber-on-ink system. Two concepts are provided — pick one.

## Concept A (primary) — Pin + Check
A rounded **map location pin** (ink black) with a white inner disc holding a single **amber `#F2A104` checkmark** — "a nearby errand, done." Ties to the app's core loop (location + completion) and matches the splash's amber-dot motif. Amber appears exactly once, paired with black.

## Concept B (alternate) — "E" + motion bar
A bold ink **"E"** whose **middle bar is amber and extends forward as a motion dash** — "errand on the move." Cleaner/typographic, reads instantly at tiny sizes, feels fast and logistics-grade.
- Files: `errandly-icon-b.svg`, `app-icon-b-light.svg`, `app-icon-b-dark.svg`, `errandly-lockup-b-horizontal.svg`, plus `icon-b-1024/512/48.png`.

## Files
| File | Use |
|------|-----|
| `errandly-icon.svg` | Primary icon mark (ink pin + amber check) — transparent |
| `errandly-icon-inverted.svg` | Icon for dark surfaces (white pin + amber check) |
| `app-icon-light.svg` | App icon tile — white squircle |
| `app-icon-dark.svg` | App icon tile — ink squircle |
| `errandly-lockup-horizontal.svg` | Icon + "Errandly" wordmark, side by side |
| `errandly-lockup-stacked.svg` | Icon on top, wordmark below |
| `errandly-monogram.svg` | "E" monogram in an ink squircle with amber dot |
| `preview.html` | Open in a browser to see everything together |
| `icon-1024.png` / `-512` / `-180` / `-48` | Rasterized app-icon exports (from the light tile) |
| `*-preview.png` | Quick raster previews |

## Colors
- Ink `#000000` · White `#FFFFFF` · Amber `#F2A104` (accent only)

## Typography
- Wordmark: **Inter 700**, sentence-case, letter-spacing ≈ -2. The lockup SVGs reference Inter via `font-family`; install/embed Inter for pixel-perfect rendering (fallback previews use a system font).

## Usage rules
- Keep the amber to the single checkmark/accent. Don't recolor the pin amber.
- Minimum clear space around the mark = 25% of its height.
- App icon: use `app-icon-light.svg` on light, `app-icon-dark.svg` on dark. Both keep the amber check.
- Favicon / tiny sizes: use the icon mark alone (legible down to 16px — see preview).

## Export tips
```bash
# PNG at any size (ImageMagick v7)
magick -background none -density 400 errandly-icon.svg -resize 1024x1024 icon.png
# iOS/Android app icon (opaque tile)
magick -background none -density 400 app-icon-light.svg -resize 1024x1024 appicon.png
```
> To convert the wordmark lockups to final assets with exact Inter shapes, open the SVG in a tool with Inter installed (or convert text→outlines) before export.
