import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const ZEBRA_STAGES = ['0006', '0007', '0008', '0014'] as const;
const ROW_LABELS = ['Early', '', '', 'Complete'] as const;

const COLORS = {
  bg: '#FAFAF7',
  gray: '#888780',
  coral: '#D85A30',
  coralLight: '#F5C4B3',
  coralBg: '#FAECE7',
  teal: '#1D9E75',
  tealLight: '#9FE1CB',
  tealBg: '#E1F5EE',
  sketchBorder: '#E8E6DF',
  dark: '#2C2C2A',
};

export const S0_Comparison: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Title: "Same sketch. Two very different results."
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Fade out over last 30 frames
  const fadeOut = interpolate(frame, [150, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: 'DM Sans, sans-serif',
        opacity: fadeOut,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
          fontFamily: 'DM Serif Display, serif',
          fontSize: 44,
          color: COLORS.dark,
        }}
      >
        Same sketch. Two very different results.
      </div>

      {/* Column headers */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        {['Your sketch', 'Existing approach', 'Ours'].map((header, i) => {
          const headerProgress = spring({
            frame: frame - 15,
            fps,
            config: {damping: 15, stiffness: 120},
          });
          return (
            <div
              key={header}
              style={{
                width: 300,
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 600,
                color:
                  i === 1
                    ? COLORS.coral
                    : i === 2
                      ? COLORS.teal
                      : COLORS.gray,
                opacity: headerProgress,
                transform: `translateY(${(1 - headerProgress) * 10}px)`,
              }}
            >
              {header}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div
        style={{
          position: 'absolute',
          top: 155,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {ZEBRA_STAGES.map((stage, rowIdx) => {
          const rowDelay = 30 + rowIdx * 18;

          return (
            <div
              key={stage}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 40,
              }}
            >
              {/* Row label */}
              <div
                style={{
                  width: 80,
                  fontSize: 14,
                  color: COLORS.gray,
                  textAlign: 'right',
                  fontStyle: 'italic',
                }}
              >
                {ROW_LABELS[rowIdx]}
              </div>

              {/* Sketch */}
              <GridImage
                src={staticFile(`sketches/zebra/${stage}.png`)}
                borderColor={COLORS.sketchBorder}
                frame={frame}
                fps={fps}
                delay={rowDelay}
              />

              {/* Baseline */}
              <GridImage
                src={staticFile(`baseline/zebra/${stage}.png`)}
                borderColor={COLORS.coralLight}
                frame={frame}
                fps={fps}
                delay={rowDelay + 8}
              />

              {/* Ours */}
              <GridImage
                src={staticFile(`outputs/zebra/${stage}.png`)}
                borderColor={COLORS.tealLight}
                frame={frame}
                fps={fps}
                delay={rowDelay + 16}
              />
            </div>
          );
        })}
      </div>

      {/* Badges */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        <Badge
          text="Floating parts \u00b7 artifacts \u00b7 drift"
          bgColor={COLORS.coralBg}
          textColor={COLORS.coral}
          frame={frame}
          fps={fps}
          delay={100}
        />
        <Badge
          text="Clean \u00b7 coherent \u00b7 progressive"
          bgColor={COLORS.tealBg}
          textColor={COLORS.teal}
          frame={frame}
          fps={fps}
          delay={108}
        />
      </div>
    </AbsoluteFill>
  );
};

const GridImage: React.FC<{
  src: string;
  borderColor: string;
  frame: number;
  fps: number;
  delay: number;
}> = ({src, borderColor, frame, fps, delay}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: {damping: 14, stiffness: 100},
  });

  return (
    <div
      style={{
        width: 200,
        height: 200,
        borderRadius: 10,
        border: `2px solid ${borderColor}`,
        overflow: 'hidden',
        opacity: progress,
        transform: `scale(${0.85 + 0.15 * progress}) translateX(${(1 - progress) * 20}px)`,
      }}
    >
      <Img
        src={src}
        style={{width: '100%', height: '100%', objectFit: 'cover'}}
      />
    </div>
  );
};

const Badge: React.FC<{
  text: string;
  bgColor: string;
  textColor: string;
  frame: number;
  fps: number;
  delay: number;
}> = ({text, bgColor, textColor, frame, fps, delay}) => {
  const progress = spring({
    frame: frame - delay,
    fps,
    config: {damping: 15, stiffness: 100},
  });

  return (
    <div
      style={{
        padding: '12px 28px',
        borderRadius: 30,
        backgroundColor: bgColor,
        color: textColor,
        fontSize: 18,
        fontWeight: 600,
        opacity: progress,
        transform: `translateY(${(1 - progress) * 15}px)`,
      }}
    >
      {text}
    </div>
  );
};
