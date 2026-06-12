# Lex Design System

A complete reference for building screens in the **Lex** design language. Lex is a calm, dense **analytics / review surface** — think an internal instrument panel for reviewing pipelines, intake, and history, not a marketing site. The aesthetic is cool, deep-purple, low-contrast, and deliberately quiet: a deep-purple accent (`--plum`) does the load-bearing work, board-deck pastels handle surface accents, and a Geist Mono "structural voice" labels everything like an instrument readout.

This folder is the materialized source of truth: tokens, fonts, component CSS, an icon set, preview cards for the Design System tab, and a UI kit recreating core Lex screens.

> **Tagline of the system:** *calm, not loud.* Every hex is intentionally desaturated; the system should never feel noisy.

---

## Sources

This design system was built from a **single written specification** (the "Lex Design System" guide) supplied directly in the project brief. There was:

- **No codebase** attached (the spec references `user-experience/lex.css`, `lex-atoms.jsx`, `lex-pages.jsx` as the original home of the system, but those files were not provided).
- **No Figma file** attached.
- **No slide deck or screenshots** attached.

Everything here is faithfully derived from that written spec. Where the spec named a file or asset that did not ship (the custom icon glyphs, the page layouts in `lex-pages.jsx`), this build recreates them in the spec's stated style and **flags the recreation** in-line. If you have the original `lex.css` / `lex-atoms.jsx` / `lex-pages.jsx`, treat those as authoritative and reconcile.

---

## Content fundamentals

How Lex writes copy. The voice is **professional, terse, and structural** — it reads like a well-run instrument panel, never chatty.

- **Tone:** calm and matter-of-fact. The system "doesn't shout when something is wrong; it tells you with a calm color and clear copy." Even errors are stated plainly, never alarmed.
- **Person:** largely **impersonal / system-voice**. Labels and status read as nouns and states ("In review", "Synced", "3 pending"), not sentences. When addressing the user it leans to imperative ("Add source", "Approve") rather than "you should…".
- **Casing — the defining rule:** Lex runs **two casing registers** simultaneously:
  - **Display copy** (headings, hero titles, body) uses normal **sentence case**. Titles are short noun phrases: "Pipeline review", "Intake queue".
  - **Structural copy** (labels, eyebrows, breadcrumbs, badges, status spills, version strings, card titles) is **UPPERCASE mono** with wide tracking. If a label is uppercase, it's mono; if it's mono, it's typically uppercase.
- **Length:** extremely economical. Card titles are 1–3 words. Metric labels are 1–2 words. Microcopy is a fragment, not a sentence.
- **Numbers & metadata:** surfaced as compact readouts — counts, deltas, timestamps, version strings (`v2.4.1`). Mono is the carrier for anything "structural" or numeric-adjacent.
- **Emoji:** **none.** Emoji are not part of the Lex voice. Status is communicated with the spill dot + a calm semantic color, never an emoji.
- **Vibe:** "considered" (the tight, negative-tracked display voice) doing the talking, with the mono "instrument panel" voice doing orientation. The interplay is the whole point.

**Example phrasings (in the Lex voice):**
- Eyebrow: `LIVE · PIPELINE` · `INTAKE QUEUE` · `LAST SYNC 2M AGO`
- Title: "Pipeline review" · "Intake queue" · "Source library"
- Badge: `IN REVIEW` · `APPROVED` · `3 FLAGGED`
- Spill: `● SYNCED` · `● PENDING` · `● BLOCKED`
- Button: "Add source", "Approve", "Request changes", "Export"
- Version chip: `LEX · v2.4.1`

---

## Visual foundations

The motifs and rules that make a screen read as Lex.

**Overall feel.** Cool, low-contrast, layered paper. Backgrounds are a near-white tinted blue (`--bg #FBFCFD`), surfaces are pure white, and depth comes from a **four-layer surface stack** (`bg → bg-2 → surface → elevated`) plus barely-there shadows — never a fifth surface layer.

**Color.**
- One deep-purple accent (`--plum #7C4E93`) carries all primary emphasis. **At most one `--plum` element per visible region** — it's load-bearing precisely because it's rare.
- Seven **board-deck pastels**, each locked to a saturated paired ink (e.g. `--past-blue` + `--past-blue-ink`). Pastels are *surface accents only* — category cues, badge fills, sidebar active states — and never carry signal meaning. Always pair a pastel with its own ink.
- **Grape** (`--grape`) — the system’s deepest purple — for chart contrast / dark chrome; **amber** (a muted teal-mint, `--amber`) as the rare third leg.
- **Semantic** colors (`--success`, `--danger`, `--warning`) are dialled down and used *only* for meaning, each with a `*-soft` companion.
- The **brand gradient** `linear-gradient(135deg, --plum → --amber)` is reserved for identity surfaces (avatars, the rail glyph) — never ambient UI.
- Imagery vibe (when present): cool, calm, desaturated — consistent with the palette. No warm/grainy/high-contrast photography.

**Type.**
- **Inter** for display + body, **Geist Mono** for structural labels, **Newsreader** for rare editorial moments.
- Body is a deliberate **13px** with `-0.011em` tracking and Inter alternates (`ss01`, `cv11`) — dense, designed, tightened.
- Headings tighten tracking as they grow (-0.012em at H6 → -0.032em at H1); hero titles override to a *lighter* weight 500 at 36px / -0.035em — display moments feel quieter than content headings.
- Mono labels: uppercase, 9.5–12px, tracking 0.04em–0.18em, weight 500–600.

**Spacing.** 4px base. Stacks/rows default to **12px**, grids to **16px**, page gutter is **40px**. Card padding is an intentional asymmetric **28px / 30px** (slightly more horizontal). 18px appears in exactly one place: under a card's mono title.

**Radius.** Three values only — **12px** (cards/popovers/modals), **8px** (buttons/inputs/badges/tabs), **999px** (pills/chips). Plus two signatures: the **avatar squircle** (10–14px at large sizes, round when small) and the **4px spill radius** (the one sanctioned exception, sitting between badge-pill and input-radius).

**Backgrounds.** Flat tinted-paper surfaces. **No** gradient backgrounds (gradient is identity-only), no hand-drawn illustration, no repeating texture/pattern, no full-bleed imagery in chrome. Recessed sections use `--bg-2`.

**Borders & shadows.** Borders are **always 1px hairlines** (`--hairline`, stronger `--hairline-2` for emphasis/focus). Shadows are **dialled way back** — four levels from a near-invisible resting `--shadow-1` to `--shadow-pop` (popovers only). Shadow color is a **grape-tinted black** `rgba(15,27,46,…)`, never pure black (pure black reads grey on cool surfaces). No inner-shadow system beyond the subtle inset highlight on the primary button.

**Cards.** White surface, 1px hairline, 12px radius, `--shadow-1` at rest, asymmetric 28/30 padding, mono uppercase title with 18px breathing room. `.card--hover` lifts `translateY(-2px)` with `--shadow-hover`, a `--hairline-2` border, over 360ms.

**Transparency & blur.** Used in exactly one structural place: the **topbar** is `rgba(255,255,255,0.85)` with `backdrop-filter: saturate(1.4) blur(16px)`. The blur is non-negotiable — without it the topbar looks pasted on. Otherwise the system is opaque.

**Motion.** Three speeds (140ms focus rings, 220–240ms hover/color, 360ms card lift), three easings (`--ease`, `--ease-out`, `--ease-soft`). A bounded keyframe set: `fade-up`, `fade-in`, `pulse-dot`, `ring`, `shimmer`, `skel`, `spin`. No decorative infinite loops on content. Every keyframe respects `prefers-reduced-motion`.

**States.**
- **Hover:** subtle background/border shift, sometimes `translateY(-1px)`.
- **Focus:** *always* the 3px `--plum-soft` glow + `--plum` border (the system focus ring — never removed without replacement).
- **Press/active:** buttons `transform: scale(0.97)` — the Lex signature press; inputs don't transform.
- **Disabled:** `opacity: 0.5` + `not-allowed`; opacity does all the work, no color change.
- **Loading:** `.skel` shimmer when layout is known, `.spin` when it isn't.

**Layout rules.** Fixed 232px sidebar + fluid main (`.app` grid). Sticky rail (full-height white, hairline right border) and sticky blurred topbar (64px). Content lives in `.canvas` (40px gutter). No third column at the shell level — use page-level grids inside the canvas.

---

## Iconography

- **Format:** icons are **always inline SVG**, `currentColor`, **stroke-based** with round caps — never an icon font, never a raster/PNG, never emoji, never Unicode glyphs-as-icons.
- **Sizing:** 14–15px in body contexts, 18–20px in headers, 24–32px in hero stats.
- **Color:** inherit text color. Inactive icons sit at `--muted`; active/hovered upgrade to `--ink`.
- **The set:** the spec describes a **custom 21+ glyph set** (pipe, history, book, pulse, …) originally in `lex-atoms.jsx`.

> **⚠️ Substitution flag.** The original custom glyph SVGs were **not shipped** with the spec. `lex-atoms.jsx` here recreates the named set (24 glyphs) in a clean, geometric structural style — **1.6px round-cap strokes on a 24 grid**, consistent with Lex's "instrument panel" voice (visually in the family of Lucide). These are authored inline SVG, not copied from a source. **If you have the real Lex glyph set, drop it in and keep the `<Icon name=…>` API + stroke discipline.** A CDN set (Lucide) is the closest off-the-shelf match if you'd rather link than author.

- **Emoji:** never used anywhere in the system.

---

## Index — what's in this folder

| File | What it is |
|------|------------|
| `README.md` | This document — context, content + visual foundations, iconography, manifest. |
| `colors_and_type.css` | **Token layer** — every color, type, spacing, radius, shadow, motion token + semantic element type (`.lex` scope, headings, mono helpers). |
| `lex.css` | **Component + layout layer** — card, button, input, badge, spill, hero, rail, topbar, popover, tabs, avatar, skeleton, keyframes. References tokens only. |
| `fonts.css` | Google Fonts loader for Inter / Geist Mono / Newsreader. |
| `lex-atoms.jsx` | Inline-SVG icon set (`<Icon>`) + tiny React atoms (`Badge`, `Spill`, `Btn`, `IconBtn`, `Avatar`). |
| `preview/` | Design System tab cards — color, type, spacing, radius, shadow, component specimens. |
| `ui_kits/lex-app/` | High-fidelity recreation of the Lex analytics app (rail + topbar + review/intake/dashboard screens, interactive). See its own README. |
| `SKILL.md` | Agent Skill manifest so this system can be used in Claude Code. |
| `assets/` | Logos / shared visual assets (the rail glyph + wordmark lockup). |

**Quick start:** load `fonts.css`, `colors_and_type.css`, then `lex.css`, and add `class="lex"` to `<body>`. Everything else references the tokens.
