# Antigravity Design & Engineering Rules: All-in-One Premiums

These rules are persistent and govern all UI/UX, styling, layout, motion, and frontend implementation across this project. Every AI agent, subagent, and model session (Gemini, Claude Sonnet, Claude Opus, GPT) must strictly adhere to these guidelines.

---

## 1. Design Philosophy & Anti-AI-Slop Directives

1. **Anti-Default Aesthetic**:
   - Strictly BANNED: generic AI purple gradients, cyan-on-dark neon glow, washed-out low-contrast grays, three identical symmetrical cards with generic icons, and floating decorative blobs.
   - Banned default fonts: Do NOT default to standard unstyled `Inter`, `Roboto`, `Arial`, or generic serif fonts like `Fraunces` or `Instrument Serif`.
   - Type system (see DESIGN.md): `Bodoni Moda` (optical size 96, weight 400) for display/headlines; `Schibsted Grotesk` for body and interface; `JetBrains Mono` for crypto addresses, numbers and labels.

2. **The Zero Em-Dash Rule**:
   - Never use em-dashes (`—`) in headlines, eyebrows, buttons, body copy, or attribution. Use periods, colons, or clean hyphens (`-`).

3. **Eyebrow Restraint**:
   - Do NOT place a small uppercase tracked label above every section. Maximum 1 eyebrow per 3 sections across the whole page. Let headlines speak for themselves.

4. **Copy Authenticity**:
   - No AI buzzwords: "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize", "Tapestry". Use clear, concrete, functional language.

---

## 2. UI & Component Architecture

1. **Color & Palette Lock**:
   - Foundational Ground: warm near-black (`#0D0B0C`), surface (`#151213`), raised (`#1C1718`); light scenes use warm ivory (`#F4EFE6`).
   - Signature: deep oxblood (`#4A101C`, secondary burgundy `#741F32`); muted champagne (`#BFA16A`) only as a micro accent. No bright or neon red, no blue or purple, never mix competing saturated accents.
   - All text must exceed WCAG AA contrast (minimum 4.5:1 for body text, 3:1 for large display text).

2. **Buttons & Controls**:
   - Single-line guarantee: Button text must never wrap to multiple lines on desktop.
   - Distinct `:hover` and `:active` states: Scale down slightly (`scale(0.97)` to `scale(0.98)`) on press with 120ms-160ms transition.
   - Minimum touch target: 44px x 44px for all mobile interactive elements.

3. **Forms & Data Input**:
   - Labels must sit explicitly ABOVE inputs. Placeholders are never labels.
   - Input font size must be at least `16px` to prevent automatic iOS Safari viewport zoom.
   - Crypto addresses must use `tabular-nums` and monospace styling with immediate "Copied!" feedback.

---

## 3. Motion Engineering (Emil Kowalski Craft Bar)

1. **Motion Justification & Frequency**:
   - Every animation must have a purpose: spatial consistency, state feedback, or transition continuity.
   - UI animations must NEVER exceed `300ms`.
   - Never use `linear` easing for UI elements. Never use `ease-in` on entering UI (it delays initial movement).
   - Standard custom curve: `cubic-bezier(0.23, 1, 0.32, 1)` or `cubic-bezier(0.32, 0.72, 0, 1)`.

2. **Hardware Acceleration**:
   - Animate exclusively `transform` and `opacity`.
   - NEVER animate layout properties: `height`, `width`, `margin`, `padding`, `top`, or `left`.
   - Never animate from `scale(0)`. Always enter from `scale(0.95)` to `scale(0.97)` with opacity.

3. **Accessibility**:
   - All animations must be wrapped in `@media (prefers-reduced-motion: no-preference)`.
   - Under reduced motion, degrade to instantaneous state or subtle opacity fade.

---

## 4. Mobile & Responsive Standards

1. **Viewport Stability**:
   - Never use `height: 100vh` on full-screen containers. Always use `min-height: 100dvh` (or `100svh` on heroes) to prevent iOS address-bar jumping.
   - Set meta viewport: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.
   - Use `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` for fixed and edge-to-edge chrome.

2. **Touch Mechanics**:
   - Apply `-webkit-tap-highlight-color: transparent` globally to eliminate mobile gray flash.
   - Gate hover styles with `@media (hover: hover) and (pointer: fine)`.
   - Use `touch-action: manipulation` on all buttons to remove the 300ms click delay.

---

## 5. Visual QA & Audit Protocol

1. **Impeccable Design Audit**:
   - After implementing UI changes, run `.agents\skills\impeccable\scripts\impeccable.cmd detect index.html`.
   - Address all identified anti-patterns (contrast failures, layout transitions, overused fonts, clipped containers).
2. **Dual-Viewport Inspection**:
   - Verify layout on Desktop (1440px) and Mobile (390px). Check for horizontal scroll leaks and touch usability.
3. **Finish Gate**:
   - "Technically working" is not finished. Visual polish, typography alignment, and responsive flow must meet $150k agency craft.
