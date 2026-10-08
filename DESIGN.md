---
name: All-in-One Premiums
description: Cinematic, editorial store for X Premium, Telegram Premium and the X Automation extension
colors:
  ink: "#0D0B0C"
  ink-surface: "#151213"
  ink-raised: "#1C1718"
  window: "#110E0F"
  ivory: "#F4EFE6"
  oxblood: "#4A101C"
  oxblood-2: "#741F32"
  oxblood-hover: "#86283D"
  champagne: "#BFA16A"
  warn: "#D9B57F"
  error: "#E6A9A9"
typography:
  display:
    fontFamily: "'Bodoni Moda', serif"
    fontSize: "clamp(46px, 6.6vw, 120px)"
    fontWeight: 400
    lineHeight: 0.93
  giant:
    fontFamily: "'Bodoni Moda', serif"
    fontSize: "clamp(84px, 16.6vw, 300px)"
    fontWeight: 400
    lineHeight: 0.85
  body:
    fontFamily: "'Schibsted Grotesk', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sharp: "2px"
  window: "12px"
  phone: "50px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 4.4vw, 72px)"
  section: "clamp(120px, 18vh, 210px)"
---

# Design System: All-in-One Premiums

## Idea

The page is one short film in nine scenes: Opening, Promise, X Premium, Telegram, Automation, Plans, Order, Questions, Begin. The products are the visuals. X, Telegram and the extension appear as real interface windows drawn in HTML, placed in CSS 3D space and moved by the scroll, never as stock art, blobs or abstract shapes.

## Colour

Mostly warm near-black (`#0D0B0C`) and warm ivory (`#F4EFE6`). Deep oxblood (`#4A101C`, lighter `#741F32` for buttons on black) is the signature: the Telegram scene, the closing scene, the period at the end of headlines, the main buttons. Muted champagne (`#BFA16A`) appears only in the smallest places: index numbers, the verified mark, a checked box, a selected payment method. No bright or neon red, no blue or purple, no gradient fills on type, no coloured glow.

The room behind the page is one fixed backdrop whose colour is scrubbed between scenes (ink, ivory, oxblood), so scene changes are continuous instead of hard section edges. The change is a short, eased dissolve (the scene top travels from 64% to 47% of the screen), so the muddy midpoint between ink and ivory only flashes by. Each scene sets its own text tone (`tone-dark`, `tone-light`, `tone-ox`); the nav and the film counter follow the tone of the scene under them.

## Type

- Display: Bodoni Moda at optical size 96, weight 400, tight tracking (-0.035em to -0.06em). Headlines end with a period in oxblood (champagne on oxblood).
- Text and interface: Schibsted Grotesk.
- Data, addresses, labels: JetBrains Mono, uppercase labels tracked 0.14em to 0.17em.
- Prices are the largest numerals on the page; the stronger plan is shown by scale and colour, never by a badge. In the X scene the 6 month $8 is larger and oxblood.
- Small serif text (the $ beside a price, prices under 50px) uses a low optical size (opsz 16 to 18) so Bodoni hairlines do not vanish.
- No em dashes anywhere. Headlines stay short; labels above sections are rare.

## Depth and motion

- 3D is CSS 3D only (perspective on a stage, preserve-3d rigs). GSAP ScrollTrigger scrubs it; Lenis smooths the wheel on a desk only. Phones keep native scrolling.
- Opening: a browser window in perspective in front of the giant "All in One." It turns toward the viewer, then opens into its three layers (X, Telegram, extension) like an exploded drawing. Each layer carries only its number and name with a thin leader line, and only from 1200px up. On phones and upright tablets the title sits on top and the window is centred in the measured gap between the title and the text (the script sets --rig-top and --k); the opened stack then settles into the lower part of the frame.
- The film counter (bottom left) shows only while a scene is held on screen, so nothing ever scrolls underneath it. The top bar steps aside when reading down and returns on any upward scroll.
- X: the profile window turns as you scroll and the verified mark draws itself.
- Telegram: a phone turns on a pinned stage while a 3.8 GB file uploads and a voice note becomes text, in step with the scroll.
- Automation: the extension window arrives from deep Z, an agent card crosses the lens, agents switch to Running; the twelve agents then pass sideways (swipe on a phone).
- Interface feedback stays under 300ms; scroll scenes are tied to the scroll, not timed.
- Only transform and opacity animate. `prefers-reduced-motion` turns the film off and shows every scene in its final state; so does a failed script load.

## Components

- Buttons: rectangles with a 2px radius, 52 to 54px tall. Oxblood on dark scenes, ink on ivory, ivory on oxblood.
- Plans: open columns separated by hairlines, not boxed cards. Hover leans the plan slightly in 3D with a faint oxblood light under the pointer (mouse only).
- Order desk: payment rails with monospace addresses and copy buttons, a ledger, a confirm box, then the details form. Labels sit above inputs; inputs are 16px.

## Do and don't

- Do keep every product fact true to the real products. Agent names and descriptions come from the extension itself.
- Do check 360, 390, 768, 1024, 1440 and wider; the page width must equal the screen at every size.
- Don't add particles, spheres, rings or other decoration without a product reason.
- Don't use glassmorphism, gradient text, glow shadows or badges like "best value".
