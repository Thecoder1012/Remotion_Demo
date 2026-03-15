# Interactive Presentation — Storyboard

## Overview

A scroll-driven, cinematic single-page interactive presentation built with HTML/CSS/JS.
Runs locally in any browser — no server, no build step. Just open `presentation/index.html`.

Replaces the Remotion pipeline entirely. Same story, but **interactive**.

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--cream` | `#FAFAF7` | Light sections background |
| `--dark` | `#0A0A0A` | Dark sections background |
| `--teal-500` | `#5DCAA5` | Primary accent |
| `--teal-700` | `#0F6E56` | Headings on light bg |
| `--coral-500` | `#F0997B` | Baseline / "bad" accent |
| `--coral-700` | `#D85A30` | Error highlight |
| `--neutral-400` | `#888780` | Captions, muted text |
| `--heading-font` | DM Serif Display | All headings |
| `--body-font` | DM Sans | Body, captions, UI |
| `--radius` | `12px` | Cards, images, buttons |

**Animation rules:**
- All animations: GSAP `power3.out` or `elastic.out(1, 0.5)` easing
- Stagger: `0.12s` between sibling elements
- ScrollTrigger: `start: "top 80%"`, `end: "top 20%"`
- Never linear. Everything eases organically.

---

## Sections (scroll order)

### S0 · Hero (fullscreen, cream)
- Word-by-word heading: *"What if your tool watched every stroke?"*
- Subtitle 0.6s later: *"An interactive look at progressive sketch-to-image generation"*
- Pulsing scroll indicator at bottom
- Parallax grain texture

### S1 · Comparison Grid (cream)
- 4 rows × 3 columns: **Sketch** | **Baseline** | **Ours** (zebra stages)
- Rows stagger in on scroll
- Hover: scale 1.05× + shadow lift
- Click: lightbox overlay (full-size image)
- Verdict badges: coral "Floating parts · artifacts · drift", teal "Clean · coherent · progressive"

### S2 · Text Reveal (cream → teal wash)
- Background shifts to soft teal gradient on scroll
- Lines reveal sequentially: *"The difference?" → "We watch you draw."*
- Words bounce-scale (1.0→1.15→1.0)
- Decorative teal lines slide in from edges

### S3 · Cat Eye Progression (cream)
- Title: *"Every stroke changes the understanding"*
- 4 horizontal stage cards: sketch ↔ output pairs
- Hover: card lifts, shows label
- Stages auto-reveal left→right on scroll with 0.3s stagger
- Caption: *"The image isn't generated at the end — it evolves with you."*

### S4 · Transition (cream → dark)
- Background morphs cream → dark
- Text color adapts: *"Your drawing process / is the message"*
- 4 floating thumbnails below (zebra + eye pairs)

### S5 · Video Chapters (dark)
- Custom chapter bar: 4 pills — **Compare** | **Draw** | **Refine** | **Challenge**
- Click pill → loads that video
- Active pill = white, done = teal, upcoming = dimmed
- Video player: rounded, glowing border
- Title card overlay fades on play

### S6 · Outro (dark → cream)
- *"Drawing is a process, not a snapshot."*
- Animated dot grid background
- *"Thank you for watching"*

---

## Tech Stack
- HTML5 + CSS3 (custom properties, grid, flexbox)
- GSAP 3 + ScrollTrigger (CDN)
- Google Fonts: DM Serif Display + DM Sans (CDN)
- Zero build step. Zero dependencies to install.

---

## Assets (relative to `presentation/`)

```
../assets/sketches/zebra/{0006,0007,0008,0014}.png
../assets/sketches/eye/{0012,0016,0026,0076}.png
../assets/baseline/zebra/{0006,0007,0008,0014}.png
../assets/outputs/zebra/{0006,0007,0008,0014}.png
../assets/outputs/eye/{0012,0016,0026,0076}.png
../assets/videos/{01_comparison,02_progressive,03_finegrained,04_vs_sota}.mp4
```
