import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const COLORS = {
  bgDark: '#111111',
  bgLight: '#FAFAF7',
  teal: '#5DCAA5',
  white: '#FFFFFF',
  gray: '#888780',
};

export const S5_Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Transition from dark to cream
  const bgProgress = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Text spring in
  const textProgress = spring({
    frame: frame - 20,
    fps,
    config: {damping: 14, stiffness: 80},
  });

  // Final fade out
  const fadeOut = interpolate(frame, [120, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textColor =
    bgProgress < 0.5 ? COLORS.white : '#2C2C2A';

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bgDark}}>
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.bgLight,
          opacity: bgProgress,
        }}
      />
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fadeOut,
        }}
      >
        <div
          style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 56,
            color: textColor,
            opacity: textProgress,
            transform: `translateY(${(1 - textProgress) * 20}px)`,
            textAlign: 'center',
          }}
        >
          Drawing is a <span style={{color: COLORS.teal}}>process</span>,
          <br />
          not a snapshot.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
