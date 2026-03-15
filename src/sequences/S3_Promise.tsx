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
  bgLight: '#FAFAF7',
  bgDark: '#111111',
  white: '#FFFFFF',
  teal: '#5DCAA5',
  gray: '#D3D1C7',
  grayDark: '#888780',
};

const THUMBNAILS = [
  staticFile('sketches/zebra/0014.png'),
  staticFile('outputs/zebra/0014.png'),
  staticFile('sketches/eye/0076.png'),
  staticFile('outputs/eye/0076.png'),
];

export const S3_Promise: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Background transitions from cream to dark over last 40 frames
  const bgProgress = interpolate(frame, [80, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bgColor = bgProgress < 0.5 ? COLORS.bgLight : COLORS.bgDark;
  const bgOpacity = bgProgress < 0.5 ? 1 : 1;

  // Text color transitions
  const textColor = interpolate(bgProgress, [0, 1], [0, 1]);

  // Line 1: "Your drawing process"
  const line1 = spring({
    frame: frame - 10,
    fps,
    config: {damping: 12, stiffness: 80},
  });

  // Line 2: "is the message"
  const line2 = spring({
    frame: frame - 20,
    fps,
    config: {damping: 12, stiffness: 80},
  });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Thumbnail strip
  const thumbProgress = spring({
    frame: frame - 45,
    fps,
    config: {damping: 14, stiffness: 100},
  });

  // Fade out
  const fadeOut = interpolate(frame, [90, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mainTextColor =
    bgProgress > 0.5 ? COLORS.white : '#2C2C2A';
  const subTextColor =
    bgProgress > 0.5 ? COLORS.gray : '#5F5E5A';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgLight,
      }}
    >
      {/* Dark overlay for transition */}
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.bgDark,
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
        {/* "Your drawing process" */}
        <div
          style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 64,
            color: mainTextColor,
            opacity: line1,
            transform: `translateY(${(1 - line1) * 25}px)`,
          }}
        >
          Your drawing process
        </div>

        {/* "is the message" */}
        <div
          style={{
            fontFamily: 'DM Serif Display, serif',
            fontSize: 64,
            opacity: line2,
            transform: `translateY(${(1 - line2) * 25}px)`,
          }}
        >
          <span style={{color: mainTextColor}}>is the </span>
          <span style={{color: COLORS.teal}}>message</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 20,
            color: subTextColor,
            opacity: subtitleOpacity,
            marginTop: 30,
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          Not just what you drew — but how, when, and in what order.
        </div>

        {/* Thumbnail strip */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 50,
            opacity: thumbProgress,
            transform: `translateY(${(1 - thumbProgress) * 15}px)`,
          }}
        >
          {THUMBNAILS.map((src, i) => (
            <div
              key={i}
              style={{
                width: 100,
                height: 100,
                borderRadius: 8,
                overflow: 'hidden',
                border: `2px solid ${bgProgress > 0.5 ? '#333' : '#E8E6DF'}`,
              }}
            >
              <Img
                src={src}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
