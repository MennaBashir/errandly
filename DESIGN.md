---
name: Errandly
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#835500'
  on-secondary: '#ffffff'
  secondary-container: '#fdaa18'
  on-secondary-container: '#694300'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1c'
  on-tertiary-container: '#848483'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffddb4'
  secondary-fixed-dim: '#ffb953'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#633f00'
  tertiary-fixed: '#e4e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style
The design system is built on a "Utility-Premium" aesthetic, prioritizing extreme clarity and operational efficiency. The brand personality is dependable, swift, and sophisticated, mirroring the precision of high-end logistics services. 

The style utilizes **high-contrast minimalism** with a focus on spaciousness and functional elegance. By stripping away non-essential decorations like gradients and complex shadows, the interface directs total focus toward task completion and map-based navigation. The emotional response should be one of "effortless control"—transforming the chaos of daily errands into an orderly, premium service experience.

## Colors
The palette is restricted to a high-contrast triad to ensure visual hierarchy is unmistakable. 

- **Ink Black (#000000):** The primary driver for branding, typography, and high-priority UI elements.
- **Amber (#F2A104):** The tactical accent. Used exclusively for "action-intent" elements: primary CTAs, active task pins on maps, and status indicators for "In Progress" states. **Constraint:** Always pair Amber backgrounds with Ink Black text or icons for maximum legibility.
- **Grayscale:** 
    - **Body Text (#5E5E5E):** Used for standard reading and secondary information to reduce eye strain against the pure white background.
    - **Mute (#AFAFAF):** Reserved for placeholder text, disabled states, and decorative borders.
    - **Canvas-soft (#EFEFEF):** Used for large background surfaces behind cards to create subtle depth without shadows.

## Typography
The system uses **Inter** exclusively to maintain a systematic, neutral, and highly readable environment. 

- **Headlines:** Must always be in sentence-case. Never use all-caps for headlines. The 700-weight (Bold) provides the necessary "punch" against the white space.
- **Body:** Standardized on 400-weight for long-form reading and 500-weight for interactive elements or emphasized metadata.
- **Hierarchy:** Use `headline-xl` only for top-level marketing or empty-state moments. Daily app interactions should lead with `headline-md` and `headline-sm`.

## Layout & Spacing
The layout follows a **fluid grid** model with generous safe areas to evoke a premium feel. 

- **Mobile:** Uses a 4-column grid with 20px outside margins and 16px gutters.
- **Desktop:** Transitions to a 12-column fixed-width centered layout (max-width 1280px).
- **Rhythm:** Spacing follows an 8px linear scale. Use `lg (24px)` for vertical section spacing and `md (16px)` for internal component padding. 
- **Map Interaction:** In the marketplace view, the map is the "Base Layer," with UI elements like search bars and bottom sheets floating as "Overlays" with consistent 16px margins from the screen edge.

## Elevation & Depth
This design system avoids traditional drop shadows to maintain a clean, flat, and modern aesthetic. 

- **Tonal Layering:** Depth is communicated through color rather than light. The `#FFFFFF` (White) surfaces represent the "Action Layer" (cards, sheets), while `#EFEFEF` (Canvas) represents the "Background Layer."
- **Ghost Outlines:** Use a 1px solid border of `#EFEFEF` for cards and containers on a white background to provide subtle definition.
- **Active State Elevation:** No physical elevation is added; instead, active states are indicated by the Amber (#F2A104) fill or high-contrast Ink Black borders.

## Shapes
The shape language is a hybrid of "Organic Circular" and "Structured Rounded."

- **Pill Shapes (Full Round):** Used for all interactive triggers including Buttons and Chips. This communicates a modern, friendly, and mobile-first approach.
- **Soft Rectangles (16px):** Used for structural containers such as Cards and Bottom Sheets. This radius is large enough to feel premium and friendly but maintains enough structure for dense information.
- **Map Elements:** Map markers and avatars are strictly circular.

## Components
- **Buttons:** Primary buttons are 999px pill-shaped, filled with Amber (#F2A104) and Ink Black text. Secondary buttons are Ink Black with White text.
- **Chips:** Small 999px pills with a `#EFEFEF` background for filters, or `#000000` background for active selection.
- **Cards:** White background, 16px border-radius, 1px `#EFEFEF` border. No shadow.
- **Bottom Sheets:** 16px top-radius, pure white background. These should contain the primary task details and errand options.
- **Input Fields:** Minimalist design with a 1px `#AFAFAF` bottom border that turns 2px `#000000` on focus. No full box-border.
- **Task Pins:** Circular Amber (#F2A104) markers with a small Ink Black icon in the center. Use a white 2px stroke around the pin to ensure it pops against map textures.
- **Lists:** Clean rows with 1px `#EFEFEF` dividers. Use `body-md` for the title and `body-sm` in `#5E5E5E` for the subtitle.