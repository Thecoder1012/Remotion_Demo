import React from 'react';
import {interpolate, spring, useVideoConfig} from 'remotion';

const COLORS = {
  teal: '#5DCAA5',
  tealDim: 'rgba(93, 202, 165, 0.3)',
  white: '#FFFFFF',
  whiteDim: 'rgba(255, 255, 255, 0.25)',
  dimText: 'rgba(255, 255, 255, 0.35)',
  activeBg: 'rgba(255, 255, 255, 0.12)',
  doneBg: 'rgba(93, 202, 165, 0.15)',
  upcomingBg: 'rgba(255, 255, 255, 0.05)',
};

const CHAPTERS = ['Compare', 'Draw', 'Refine', 'Challenge'];

interface ChapterBarProps {
  activeChapter: number; // 0-indexed
  frame: number;
  visible: boolean;
}

export const ChapterBar: React.FC<ChapterBarProps> = ({
  activeChapter,
  frame,
  visible,
}) => {
  const {fps} = useVideoConfig();

  const slideY = visible
    ? spring({frame, fps, config: {damping: 15, stiffness: 100}}) * 0
    : -80;
  const opacity = visible ? 1 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        top: 30,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 0,
        transform: `translateY(${slideY}px)`,
        opacity,
        zIndex: 10,
      }}
    >
      {CHAPTERS.map((label, i) => {
        const isDone = i < activeChapter;
        const isActive = i === activeChapter;

        const dotColor = isDone
          ? COLORS.teal
          : isActive
            ? COLORS.white
            : COLORS.dimText;
        const textColor = isDone
          ? COLORS.teal
          : isActive
            ? COLORS.white
            : COLORS.dimText;
        const bg = isDone
          ? COLORS.doneBg
          : isActive
            ? COLORS.activeBg
            : COLORS.upcomingBg;
        const borderColor = isDone
          ? COLORS.tealDim
          : isActive
            ? 'rgba(255,255,255,0.3)'
            : 'rgba(255,255,255,0.08)';

        return (
          <React.Fragment key={label}>
            {/* Progress line before this pill (except first) */}
            {i > 0 && (
              <div
                style={{
                  width: 60,
                  height: 2,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  position: 'relative',
                  marginLeft: -1,
                  marginRight: -1,
                }}
              >
                <div
                  style={{
                    width: isDone || isActive ? '100%' : '0%',
                    height: '100%',
                    backgroundColor: isDone ? COLORS.teal : COLORS.whiteDim,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            )}

            {/* Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 20px',
                borderRadius: 30,
                backgroundColor: bg,
                border: `1.5px solid ${borderColor}`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: dotColor,
                }}
              />
              <span
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 16,
                  fontWeight: 600,
                  color: textColor,
                }}
              >
                {label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
