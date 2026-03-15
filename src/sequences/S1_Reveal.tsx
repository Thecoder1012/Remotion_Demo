import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const COLORS = {
  bg: '#FAFAF7',
  dark: '#2C2C2A',
  teal: '#1D9E75',
  tealDark: '#0F6E56',
  gray: '#5F5E5A',
};

export const S1_Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // "The difference?" springs in at frame 10
  const line1Progress = spring({
    frame: frame - 10,
    fps,
    config: {damping: 12, stiffness: 80},
  });

  // "We watch you draw" word by word starting frame 25
  const words = ['We', 'watch', 'you', 'draw'];
  const wordProgresses = words.map((_, i) =>
    spring({
      frame: frame - (25 + i * 6),
      fps,
      config: {damping: 12, stiffness: 100},
    }),
  );

  // Subtitle fades in at frame 40
  const subtitleOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out over last 30 frames
  const fadeOut = interpolate(frame, [120, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut,
      }}
    >
      {/* "The difference?" */}
      <div
        style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: 64,
          color: COLORS.dark,
          opacity: line1Progress,
          transform: `translateY(${(1 - line1Progress) * 30}px)`,
          marginBottom: 16,
        }}
      >
        The difference?
      </div>

      {/* "We watch you draw" */}
      <div
        style={{
          display: 'flex',
          gap: 18,
          fontFamily: 'DM Serif Display, serif',
          fontSize: 72,
        }}
      >
        {words.map((word, i) => (
          <span
            key={word}
            style={{
              color: COLORS.teal,
              opacity: wordProgresses[i],
              transform: `translateY(${(1 - wordProgresses[i]) * 25}px)`,
              display: 'inline-block',
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Subtitle */}
      <div
        style={{
          maxWidth: 800,
          textAlign: 'center',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 22,
          color: COLORS.gray,
          lineHeight: 1.6,
          opacity: subtitleOpacity,
          marginTop: 40,
        }}
      >
        Existing tools only see the final sketch — a single snapshot with no
        history. We follow every stroke, understanding your intent as it
        unfolds.
      </div>
    </AbsoluteFill>
  );
};
