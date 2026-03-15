# Demo Video Project

## What this is

Assets and instructions for building a demo video using Remotion.
The video showcases progressive sketch-to-image generation for a non-technical audience.

## For Claude Code

**Read `STORYBOARD.md` first.** It contains the complete build instructions,
visual design system, segment-by-segment animation specs, and technical setup.

Your job:
1. Set up a Remotion project in this directory
2. Copy assets from `assets/` to the Remotion `public/` directory
3. Build all video segments as described in `STORYBOARD.md`
4. Render to MP4

## Asset inventory

| Folder | Contents | Count |
|--------|----------|-------|
| `assets/sketches/zebra/` | Zebra sketch stages | 4 images |
| `assets/sketches/eye/` | Cat eye sketch stages | 4 images |
| `assets/baseline/zebra/` | Baseline outputs (broken, artifact-heavy) | 4 images |
| `assets/outputs/zebra/` | Our outputs (clean, coherent) | 4 images |
| `assets/outputs/eye/` | Our outputs for cat eye progression | 4 images |
| `assets/videos/` | Screen recordings (trimmed MP4s) | 4 videos |

## Rendering

```bash
npx remotion render DemoVideo --output demo.mp4
```
