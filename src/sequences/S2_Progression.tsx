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

const COLORS = {
  bg: '#FAFAF7',
  dark: '#2C2C2A',
  teal: '#1D9E75',
  tealLight: '#9FE1CB',
  tealBg: '#E1F5EE',
  sketchBorder: '#E8E6DF',
  gray: '#5F5E5A',
};

const STAGES = [
  {id: '0012', label: 'First strokes'},
  {id: '0016', label: 'Adding shape'},
  {id: '0026', label: 'Details emerge'},
  {id: '0076', label: 'Complete'},
] as const;

export const S2_Progression: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Title springs in
  const titleProgress = spring({
    frame: frame - 5,
    fps,
    config: {damping: 14, stiffness: 100},
  });

  // Subtitle at the end
  const subtitleOpacity = interpolate(frame, [130, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out
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
          top: 60,
          width: '100%',
          textAlign: 'center',
          fontFamily: 'DM Serif Display, serif',
          fontSize: 48,
          color: COLORS.dark,
          opacity: titleProgress,
          transform: `translateY(${(1 - titleProgress) * 20}px)`,
        }}
      >
        Every stroke{' '}
        <span style={{color: COLORS.teal}}>changes the understanding</span>
      </div>

      {/* 4 stages */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 30,
        }}
      >
        {STAGES.map((stage, i) => {
          const stageDelay = 20 + i * 28;
          const sketchProgress = spring({
            frame: frame - stageDelay,
            fps,
            config: {damping: 14, stiffness: 100},
          });
          const outputProgress = spring({
            frame: frame - (stageDelay + 12),
            fps,
            config: {damping: 14, stiffness: 100},
          });
          const labelProgress = spring({
            frame: frame - (stageDelay - 5),
            fps,
            config: {damping: 14, stiffness: 100},
          });

          return (
            <React.Fragment key={stage.id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                {/* Label badge */}
                <div
                  style={{
                    padding: '6px 16px',
                    borderRadius: 20,
                    backgroundColor: COLORS.tealBg,
                    color: COLORS.teal,
                    fontSize: 15,
                    fontWeight: 600,
                    opacity: labelProgress,
                    transform: `translateY(${(1 - labelProgress) * 10}px)`,
                  }}
                >
                  {stage.label}
                </div>

                {/* Sketch image */}
                <div
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: 10,
                    border: `2px solid ${COLORS.sketchBorder}`,
                    overflow: 'hidden',
                    opacity: sketchProgress,
                    transform: `scale(${0.8 + 0.2 * sketchProgress})`,
                  }}
                >
                  <Img
                    src={staticFile(`sketches/eye/${stage.id}.png`)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                {/* Arrow down */}
                <div
                  style={{
                    fontSize: 24,
                    color: COLORS.tealLight,
                    opacity: outputProgress,
                  }}
                >
                  ↓
                </div>

                {/* Output image */}
                <div
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: 10,
                    border: `2px solid ${COLORS.tealLight}`,
                    overflow: 'hidden',
                    opacity: outputProgress,
                    transform: `scale(${0.8 + 0.2 * outputProgress})`,
                  }}
                >
                  <Img
                    src={staticFile(`outputs/eye/${stage.id}.png`)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              </div>

              {/* Arrow between stages */}
              {i < 3 && (
                <div
                  style={{
                    fontSize: 32,
                    color: COLORS.tealLight,
                    opacity: sketchProgress,
                    alignSelf: 'center',
                    marginTop: -80,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: 70,
          width: '100%',
          textAlign: 'center',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 22,
          color: COLORS.gray,
          opacity: subtitleOpacity,
          lineHeight: 1.6,
        }}
      >
        The image isn't generated at the end — it grows with your drawing.
      </div>
    </AbsoluteFill>
  );
};
