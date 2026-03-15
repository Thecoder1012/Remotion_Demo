# Demo Video — Build Instructions for Claude Code

## Overview

Build a ~2:15 minute demo video using Remotion (React-based video framework).
The video showcases a progressive sketch-to-image generation system for a
non-technical audience. No paper names, no author names, no technical terms.
The tone is vibrant, artistic, and editorial — NOT a typical ML demo.

**Output:** 1920x1080 MP4 at 30fps.

---

## Assets

All assets are in the `/assets/` directory:

```
assets/
  sketches/
    zebra/
      0006.png    — earliest stage (just head outline + mountain)
      0007.png    — head + neck + mountain
      0008.png    — head + neck + legs starting
      0014.png    — complete zebra sketch with body, legs, mountain
    eye/
      0012.png    — bare oval outline
      0016.png    — oval with inner circle
      0026.png    — eye shape with iris details
      0076.png    — complete eye with lashes and detail marks

  baseline/
    zebra/
      0006.png    — baseline output at stage 0006 (has artifacts)
      0007.png    — floating zebra head, broken body (very bad)
      0008.png    — disconnected parts, rope-like artifacts
      0014.png    — rope artifacts overlaid on zebra, background drift

  outputs/
    zebra/
      0006.png    — our output at stage 0006 (clean, natural)
      0007.png    — clean zebra forming progressively
      0008.png    — coherent body taking shape
      0014.png    — beautiful complete zebra, clean background
    eye/
      0012.png    — generated from bare oval (already looks like eye)
      0016.png    — refining with more structure
      0026.png    — detailed cat eye forming
      0076.png    — stunning photorealistic cat eye

  videos/
    01_comparison.mp4     — side-by-side comparison demo (screen recording)
    02_progressive.mp4    — full progressive generation demo
    03_finegrained.mp4    — fine-grained control with imperfect sketch
    04_vs_sota.mp4        — our method vs SOTA single-shot methods
```

---

## Visual Design System

### Palette
- Background: `#FAFAF7` (warm cream) for intro/text slides
- Background: `#111111` (near-black) for video playback segments
- Primary accent: Teal ramp — `#E1F5EE`, `#9FE1CB`, `#5DCAA5`, `#1D9E75`, `#0F6E56`
- Danger/baseline: Coral ramp — `#FAECE7`, `#F5C4B3`, `#F0997B`, `#D85A30`, `#993C1D`
- Neutral: `#F1EFE8`, `#D3D1C7`, `#888780`, `#5F5E5A`, `#2C2C2A`
- Amber (accent): `#FAEEDA`, `#FAC775`, `#EF9F27`, `#854F0B`

### Typography
- Headings: `DM Serif Display` (serif, elegant, editorial feel)
- Body/labels: `DM Sans` (clean sans-serif)
- Install via Google Fonts: `@fontsource/dm-serif-display` and `@fontsource/dm-sans`

### Style Rules
- Vibrant, NOT dark. Cream backgrounds for intro segments.
- No gradients on backgrounds. Flat, clean surfaces.
- Rounded corners on images: 10-12px
- Sketch images get light gray border: `2px solid #E8E6DF`
- Baseline images get coral border: `2px solid #F5C4B3`
- Our output images get teal border: `2px solid #9FE1CB`
- All animations use spring physics or eased interpolation, never linear
- Stagger animations: elements appear sequentially, not all at once

---

## Video Segments (in order)

### Segment 0: Cold Open — Comparison Grid
**Duration:** 6 seconds (frames 0–180)
**Background:** `#FAFAF7`

Three-column grid showing the zebra sequence at 4 progressive stages.

Layout:
```
         Your sketch    |  Existing approach  |     Ours
         ─────────────────────────────────────────────────
Early    zebra 0006 sk  |  zebra 0006 base    |  zebra 0006 ours
         zebra 0007 sk  |  zebra 0007 base    |  zebra 0007 ours
         zebra 0008 sk  |  zebra 0008 base    |  zebra 0008 ours
Complete zebra 0014 sk  |  zebra 0014 base    |  zebra 0014 ours
```

**Animation sequence:**
1. Title fades in: "Same sketch. Two very different results." (frames 0–20)
2. Column headers appear (frames 15–30)
3. Row 1 appears: sketch first, then baseline slides in from right, then ours slides in (stagger 8 frames between columns)
4. Rows 2, 3, 4 follow with 18-frame stagger between rows
5. After all rows visible, badges fade in at bottom (frame ~100):
   - Coral badge: "Floating parts · artifacts · drift"
   - Teal badge: "Clean · coherent · progressive"
6. Hold for ~60 frames, then crossfade to next segment

**No title card before this. No text intro. Open cold with the comparison.**

---

### Segment 1: The Reveal
**Duration:** 5 seconds (frames 180–330)
**Background:** `#FAFAF7`

Centered text animation:

```
The difference?
We watch you draw
```

- "The difference?" springs in first (frame 190)
- "watch you draw" springs in word-by-word (frame 205+), teal gradient text
- Subtitle fades in below (frame 220): "Existing tools only see the final sketch — a single snapshot with no history. We follow every stroke, understanding your intent as it unfolds."
- Entire slide fades out over last 30 frames

---

### Segment 2: Progression — Cat Eye
**Duration:** 6 seconds (frames 330–510)
**Background:** `#FAFAF7`

Title: "Every stroke **changes the understanding**" (teal on "changes the understanding")

Below title: 4 stage pairs arranged horizontally, connected by → arrows:

```
[First strokes]     →    [Adding shape]    →    [Details emerge]   →    [Complete]
  eye 0012 sk              eye 0016 sk           eye 0026 sk            eye 0076 sk
      ↓                        ↓                     ↓                      ↓
  eye 0012 out             eye 0016 out          eye 0026 out           eye 0076 out
```

**Animation:** Stages reveal left-to-right, one at a time:
- Stage 1 appears alone (frame 350), sketch scales in, then output fades in below
- After 28 frames, stage 2 appears the same way
- Continue for stages 3 and 4
- Subtitle fades in last: "The image isn't generated at the end — it grows with your drawing."

Each sketch image: ~160x160px, rounded corners, gray border
Each output image: ~160x160px, rounded corners, teal border
Teal gradient badges above each pair with the label

---

### Segment 3: The Promise
**Duration:** 4 seconds (frames 510–630)
**Background:** Starts `#FAFAF7`, transitions to `#111111` at the end

Centered text:
```
Your drawing process
is the message
```

- "message" in teal
- Lines spring in sequentially
- Subtitle: "Not just what you drew — but how, when, and in what order."
- Small preview strip below: 4 thumbnail images (zebra sketch, zebra output, eye sketch, eye output)
- Everything fades out over last 30 frames
- Background color transitions from cream to dark for the chapter bar segment

---

### Segment 4: Chapter Bar + Demo Videos
**Duration:** ~110 seconds (frames 630–3930, adjust to actual video lengths)
**Background:** `#111111`

This is the main body of the video. A chapter progress bar at the top with 4 chapters,
and the screen recordings playing below.

#### Chapter Bar Design
Horizontal bar at the top of the frame with 4 pill-shaped chapter labels:
```
[● Compare]  ———  [○ Draw]  ———  [○ Refine]  ———  [○ Challenge]
```

- Active chapter: white text, white dot, semi-transparent white background, white border
- Done chapter: teal text, teal dot, semi-transparent teal background, teal border
- Upcoming: dimmed text, dimmed dot, very faint background
- Progress lines between pills fill with teal as chapters complete

#### Per-chapter animation flow:
1. Chapter bar visible, active chapter highlighted
2. Chapter title appears centered on dark background (2 seconds)
3. Video area scales from 85% to 100% (zoom in effect)
4. Chapter bar slides up and fades out
5. Screen recording plays at full size
6. When video ends: zoom back out to 85%, bar slides back in
7. Previous chapter pill turns teal (done), progress line fills
8. Next chapter activates
9. Repeat

#### Chapter details:
| Chapter | Label | Video file | Description |
|---------|-------|------------|-------------|
| 1 | Compare | 01_comparison.mp4 | Side-by-side comparison |
| 2 | Draw | 02_progressive.mp4 | Full progressive generation |
| 3 | Refine | 03_finegrained.mp4 | Fine-grained control |
| 4 | Challenge | 04_vs_sota.mp4 | Ours vs SOTA methods |

**IMPORTANT:** Adjust the duration of each chapter to match the actual video file length.
Use `getVideoMetadata()` from `@remotion/media-utils` if possible, or manually set
frame counts based on video duration × 30fps.

---

### Segment 5: Outro
**Duration:** 5 seconds (frames 3930–4080)
**Background:** Transitions from `#111111` to `#FAFAF7`

Clean fade. Optionally show a final line of text or just fade to cream/white.
No paper name. No author names. No URLs. Keep it clean.

---

## Technical Setup Instructions

### 1. Create Remotion project
```bash
npx create-video@latest demo-video
cd demo-video
```

Choose blank template, TypeScript.

### 2. Install dependencies
```bash
npm install @fontsource/dm-serif-display @fontsource/dm-sans
npm install @remotion/media-utils
```

### 3. Install Agent Skills (optional, improves code quality)
```bash
npx skills add remotion-dev/skills
```

### 4. Copy assets
Copy everything from `/assets/` into the Remotion project's `public/` directory,
preserving the folder structure.

### 5. Project structure to create
```
src/
  Root.tsx                    — Register the composition
  DemoVideo.tsx               — Master sequence chaining all segments
  sequences/
    S0_Comparison.tsx         — Cold open comparison grid
    S1_Reveal.tsx             — "We watch you draw" text
    S2_Progression.tsx        — Cat eye progressive stages
    S3_Promise.tsx            — Closing text + transition to dark
    S4_ChapterVideos.tsx      — Chapter bar + 4 embedded videos
    S5_Outro.tsx              — Fade out
  components/
    ChapterBar.tsx            — Reusable chapter progress bar
```

### 6. Key Remotion APIs to use
- `useCurrentFrame()` — get current frame number
- `useVideoConfig()` — get fps, width, height
- `interpolate(frame, inputRange, outputRange)` — map frame to any value
- `spring({ frame, fps, config })` — spring animation
- `<Sequence from={f} durationInFrames={d}>` — segment timing
- `<Video src={staticFile('videos/01.mp4')} />` — embed video
- `<Img src={staticFile('sketches/zebra/0006.png')} />` — static images
- `<AbsoluteFill>` — full-frame layer
- `staticFile()` — reference files in public/

### 7. Render
```bash
npx remotion render DemoVideo --output demo.mp4
```

For quick preview at lower quality:
```bash
npx remotion render DemoVideo --output preview.mp4 --quality=50
```

---

## Important Notes

- **No paper name anywhere in the video.** This is under anonymous review.
- **No author names, no affiliations, no URLs.**
- **No technical jargon.** No "diffusion model", "ControlNet", "FID score", etc.
- **The audience is non-technical.** Some may be artists. Keep everything visual.
- **The core message is one idea:** "The way you draw matters. Drawing is a process, not a snapshot."
- **The comparison (segment 0) is the hook.** The baseline's broken zebras vs our clean results — this contrast sells the entire video in the first 6 seconds.
- **The progression (segment 2) is the mechanism.** The cat eye evolving with each stroke — this is where the viewer understands HOW it works.
- **The chapter videos (segment 4) are the proof.** Real demos showing it in action.
