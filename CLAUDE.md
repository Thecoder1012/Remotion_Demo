# CLAUDE.md

This project builds a demo video using Remotion (React video framework).

## First steps
1. Read STORYBOARD.md thoroughly — it has the complete spec
2. Set up the Remotion project: `npx create-video@latest . --template=blank`
3. Install fonts: `npm install @fontsource/dm-serif-display @fontsource/dm-sans`
4. Install skills: `npx skills add remotion-dev/skills`
5. Copy `assets/` contents into `public/` preserving folder structure
6. Build each segment as a separate component in `src/sequences/`
7. Chain them in `src/DemoVideo.tsx` using `<Sequence>` components

## Key constraints
- Anonymous submission: NO paper name, NO author names, NO URLs anywhere
- Non-technical audience: NO jargon (no "diffusion", "ControlNet", "FID", etc.)
- Vibrant palette: cream background (#FAFAF7), teal/coral accents. NOT dark theme for intro.
- Typography: DM Serif Display for headings, DM Sans for body
- All animations: spring physics or eased, never linear. Stagger elements sequentially.

## Video structure (30fps, 1920x1080)
- S0 (0-180f): Comparison grid — zebra baseline vs ours. Cold open, no title card.
- S1 (180-330f): "We watch you draw" text reveal
- S2 (330-510f): Cat eye progression — 4 stages left to right
- S3 (510-630f): "Your process is the message" — transitions bg from cream to dark
- S4 (630-3930f): Chapter bar + 4 video recordings. Adjust durations to video lengths.
- S5 (3930-4080f): Outro fade

## Rendering
```bash
npx remotion render DemoVideo --output demo.mp4
```

## If Chromium is missing for rendering
```bash
npx remotion browser ensure
```
Or install system dependencies:
```bash
apt-get update && apt-get install -y chromium-browser
```
