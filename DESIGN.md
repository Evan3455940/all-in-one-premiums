---
name: All-in-One Premiums
description: High-craft, anti-slop digital subscription store and automation showcase
colors:
  bg: "#08080A"
  bg-surface: "#151015"
  bg-elevated: "#1D161F"
  plum-accent: "#55162D"
  burgundy: "#8A2346"
  border-subtle: "rgba(255, 255, 255, 0.08)"
  border-active: "rgba(213, 195, 160, 0.22)"
  text-primary: "#F4F0E8"
  text-secondary: "#ADA49F"
  text-muted: "#918A88"
  accent-gold: "#D5C3A0"
  accent-gold-bright: "#EFE5D1"
  success: "#25D366"
  error: "#8A2346"
typography:
  display:
    fontFamily: "'Cinzel', serif"
    fontSize: "clamp(2.5rem, 5vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "'Cinzel', serif"
    fontSize: "clamp(1.75rem, 3.8vw, 3.2rem)"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.5
rounded:
  sm: "6px"
  md: "12px"
  lg: "18px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.text-primary}"
    textColor: "{colors.bg}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-secondary:
    backgroundColor: "{colors.bg-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
---

# Design System: All-in-One Premiums

## Overview

**Creative North Star: "Machined Precision Vault"**

All-in-One Premiums is an elevated, high-trust digital storefront designed to feel like precision hardware rather than disposable SaaS. It merges deep Obsidian/Graphite surfaces with tactile micro-physics, typographic hierarchy, and gold telemetry accents. 

### Key Characteristics:
- **Calibrated Darkness**: Deep graphite and charcoal (`#0B0C0E`, `#121418`) instead of washed-out grays or harsh unstyled `#000000`.
- **Typographic Rigor**: High-contrast pairing of structural Grotesk display (`Cabinet Grotesk`) with ultra-readable body text (`Geist`) and monospace data figures (`JetBrains Mono`). No generic Inter defaults.
- **Machined Tactility**: Concentric double-bezel nesting, 1px inner hairline borders (`rgba(255,255,255,0.08)`), and subtle ambient shadows tinted to surface tones.
- **Purposeful Motion**: Every transition is under 300ms, GPU-accelerated (`transform` & `opacity`), uses custom cubic-bezier easing (`cubic-bezier(0.23, 1, 0.32, 1)`), and strictly respects `prefers-reduced-motion`.

---

## Colors

The palette is anchored by the locked luxury atelier color system: Obsidian Black foundation, Deep Plum / Oxblood and Burgundy atmospheric warmth, and Champagne Silver metallic highlights.

### Foundational Ground & Surfaces
- **Obsidian Ground** (`#08080A`): Foundational page canvas. Deep, optical OLED-friendly tone without dead clipping.
- **Warm Black Surface** (`#100E13` / `#151015`): Cards, module containers, and interactive trays.
- **Elevated Obsidian** (`#18141D`): Floating inputs, hovered elements, and active drawer states.

### Atmospheric Warmth & Accents
- **Deep Plum / Oxblood** (`#55162D` / `#3E1220`): Atmospheric glow, subtle depth accents.
- **Deep Burgundy / Cherry** (`#8A2346` / `#A82C56`): Featured tier highlights, verified status badges.

### Metallic Sheen & Typography
- **Champagne Silver / Gold** (`#D5C3A0` / `#EFE5D1`): Metallic borders, specular reflections, primary action buttons.
- **Warm White Text** (`#FBF9F5` / `#EDE8E1`): Pristine contrast (16:1 against obsidian).
- **Muted Taupe / Slate** (`#918A88` / `#ADA49F`): Subheadings, descriptions, metadata.
- **Deep Muted** (`#726A66` / `#636A78`): Secondary indicators, footnotes.

### Named Rules
**The Locked Palette Rule.** Never introduce generic AI purple or neon cyan glows. All warmth is strictly anchored in deep oxblood, cherry burgundy, and champagne silver.
**The No-Dead-Black Rule.** Pure `#000000` is banned for broad background fills. Always use tuned obsidian (`#08080A`).

---

## Typography

- **Display & Headline Font:** `Cinzel`
- **Body Font:** `Manrope`
- **Data & Telemetry Font:** `JetBrains Mono`

### Type Ramp
- **Hero Display:** `clamp(2.5rem, 5.5vw, 4.4rem)` (weight 600-700)
- **Section Headline:** `clamp(1.75rem, 3.8vw, 3.2rem)` (weight 600-700)
- **Display Big:** `54px`, `44px`, `42px`, `38px`
- **Card Titles:** `28px`, `26px`, `24px`, `22px`, `20px`
- **Subheads & Lead:** `17px`, `16.5px`, `16px`
- **Body Text:** `15.5px`, `14.5px`, `14px`
- **Metadata & Data:** `13.5px`, `13px`, `12.5px`, `12px`, `11.5px`, `11px`

### Named Rules
**The Descender Clearance Rule.** Display headings with negative line-height must reserve `padding-bottom: 0.15em` to prevent clipping descenders (`g`, `y`, `p`, `q`).
**The Zero Em-Dash Rule.** Em-dashes (`—`) are completely banned across all headlines, body copy, and pills. Use precise sentences, commas, or clean hyphens (`-`).

---

## Layout & Spatial System

- **Container Constraint:** `max-width: 1240px; margin: 0 auto; padding: 0 32px;`
- **Vertical Rhythm:**
  - Hero: `padding-top: clamp(60px, 10vw, 96px); padding-bottom: clamp(48px, 8vw, 80px);`
  - Sections: `padding: clamp(64px, 8vw, 112px) 0;`
  - Component gaps: 16px (tight), 24px (standard), 32px (module separation).
- **Grid Discipline:**
  - Pricing cards: Responsive 2-column or 4-column CSS Grid.
  - Payment options: 3-column equal distribution with mobile vertical stack.
  - No complex fractional percentage math (`calc(33% - 10px)`). Always CSS Grid.

---

## Elevation & Depth

Surfaces communicate elevation through inner hairline borders and tonal shifts rather than blurry drop shadows.

### Depth Vocabulary
- **Card Default:** Surface background (`#121418`), border `1px solid rgba(255, 255, 255, 0.07)`, subtle inner shadow `inset 0 1px 0 rgba(255, 255, 255, 0.06)`.
- **Card Hover:** Subtle elevation `translateY(-3px)`, border `1px solid rgba(255, 255, 255, 0.15)`, shadow `0 16px 36px rgba(0, 0, 0, 0.35)`.
- **Active / Selected:** Border `1.5px solid var(--accent-gold)`, shadow `0 0 24px rgba(229, 192, 123, 0.12)`.

### Named Rules
**The Single-Light-Source Rule.** Shadows must have vertical offset (`Y: 8px to 24px`) and never appear as centered decorative glow-halos.

---

## Shapes & Form Language

- **Corner Scale:**
  - Controls & Buttons: `rounded-pill` (`9999px`)
  - Modals & Cards: `16px` (`--radius-lg`)
  - Inner Inputs & Trays: `10px` (`--radius-md`)
  - Badges & Chips: `6px` (`--radius-sm`)
- **Nested Bezel Rule:** Inner element radius must be mathematically smaller than the container radius (`radius_inner = radius_outer - padding`) to preserve concentric curves.

---

## Components

### Buttons
- **Primary Action:** Solid white/light surface (`#F5F7FA`) with black text (`#0B0C0E`), pill-shaped, `font-weight: 600`. Hover lifts `translateY(-1.5px)`, press active `scale(0.98)`.
- **Secondary Action:** Obsidian elevated (`#181B20`), 1px subtle border, white text.
- **Copy Address Button:** Integrated in monospace code tray with instant visual state feedback ("Copied!" with check icon).

### Cards
- No generic AI "white-box-with-drop-shadow".
- High-contrast featured cards use micro-gold borders or elevated status ribbons.
- Equal height and baseline alignment for CTAs across sibling cards.

### Forms & Inputs
- Explicit `<label>` positioned directly above the input.
- Input height min `48px`, font-size min `16px` on mobile (prevents iOS auto-zoom).
- High-contrast placeholder text (at least 4.5:1 against input background).
- Clear inline error messages directly beneath the invalid input.

---

## Motion & Interaction (Emil Kowalski Craft Standards)

### Timing & Easings
- **Standard UI Interaction:** `160ms - 220ms`
- **Modal / Panel Transitions:** `240ms - 300ms`
- **Custom Easing Curve:** `cubic-bezier(0.23, 1, 0.32, 1)` (snappy ease-out, zero sluggishness)
- **Banned:** `linear` transitions on UI; `ease-in` on entry elements; any UI animation exceeding 300ms.

### Interaction Protocols
- **Tactile Feedback:** Buttons scale to `0.97` - `0.98` on `:active` with `120ms` transition.
- **Origin-Aware:** Menus, dropdowns, and copy confirmations expand from their trigger origin.
- **Entrance Animations:** Never scale from `scale(0)`. Always enter from `scale(0.96)` with opacity fade.
- **Hardware Acceleration:** Animate exclusively `transform` and `opacity`. Never animate `height`, `width`, or `margin`.
- **Accessibility Guarantee:** Every movement is gated behind `@media (prefers-reduced-motion: no-preference)`. When reduced motion is preferred, transitions degrade to gentle opacity changes.

---

## Do's and Don'ts

### Do:
- **Do** test every form and CTA in both desktop and 390px mobile viewports.
- **Do** ensure all interactive touch targets meet or exceed 44x44px.
- **Do** keep crypto addresses readable in monospace with single-tap copy and immediate feedback.
- **Do** keep copy clear, direct, and active ("Activate X Premium", "Copy Address").

### Don't:
- **Don't** use generic AI purple/blue gradients or cyan neon glow effects.
- **Don't** allow button text to wrap into multiple lines on desktop.
- **Don't** add decorative kickers/eyebrows to every section header (maximum 1 per 3 sections).
- **Don't** animate elements during high-frequency tasks.
- **Don't** ship without running Impeccable design detector audits (`impeccable detect index.html`).
