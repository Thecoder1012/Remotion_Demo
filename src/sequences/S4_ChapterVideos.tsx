import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import {ChapterBar} from '../components/ChapterBar';

const COLORS = {
  bg: '#111111',
  white: '#FFFFFF',
  teal: '#5DCAA5',
};

const CHAPTER_TITLES = [
  'Side-by-side comparison',
  'Progressive generation',
  'Fine-grained control',
  'Ours vs. existing methods',
];

const VIDEO_FILES = [
  'videos/01_comparison.mp4',
  'videos/02_progressive.mp4',
  'videos/03_finegrained.mp4',
  'videos/04_vs_sota.mp4',
];

const TITLE_DUR = 60;
const TRANSITION_DUR = 30;

interface Props {
  chapterFrames: number[];
}

const ChapterTitle: React.FC<{title: string}> = ({title}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 100},
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg,
      }}
    >
      <div
        style={{
          fontFamily: 'DM Serif Display, serif',
          fontSize: 52,
          color: COLORS.white,
          opacity: progress,
          transform: `translateY(${(1 - progress) * 20}px)`,
          textAlign: 'center',
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};

const ChapterVideo: React.FC<{videoFile: string; videoFrames: number}> = ({
  videoFile,
  videoFrames,
}) => {
  const frame = useCurrentFrame();

  // Zoom: start at 0.92, expand to 1.0 in first 20 frames, back to 0.92 in last 20
  const zoomIn = interpolate(frame, [0, 20], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const zoomOut = interpolate(
    frame,
    [videoFrames - 20, videoFrames],
    [1, 0.92],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const scale = frame < 20 ? zoomIn : frame > videoFrames - 20 ? zoomOut : 1;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.bg,
      }}
    >
      <div
        style={{
          width: 1920,
          height: 1080,
          transform: `scale(${scale})`,
          borderRadius: scale < 1 ? 12 : 0,
          overflow: 'hidden',
        }}
      >
        <OffthreadVideo
          src={staticFile(videoFile)}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </div>
    </AbsoluteFill>
  );
};

export const S4_ChapterVideos: React.FC<Props> = ({chapterFrames}) => {
  const frame = useCurrentFrame();

  // Calculate chapter start frames
  const chapterStarts: number[] = [];
  let offset = 0;
  for (let i = 0; i < 4; i++) {
    chapterStarts.push(offset);
    offset += TITLE_DUR + chapterFrames[i] + TRANSITION_DUR;
  }
  const totalDuration = offset;

  // Determine active chapter for the chapter bar
  let activeChapter = 0;
  for (let i = 0; i < 4; i++) {
    if (frame >= chapterStarts[i]) {
      activeChapter = i;
    }
  }

  // Is the chapter bar visible? Only during title and transition phases
  const chapterLocalFrame = frame - chapterStarts[activeChapter];
  const inVideo =
    chapterLocalFrame >= TITLE_DUR &&
    chapterLocalFrame < TITLE_DUR + chapterFrames[activeChapter];
  const barVisible = !inVideo;

  return (
    <AbsoluteFill style={{backgroundColor: COLORS.bg}}>
      {/* Render each chapter as a proper Sequence */}
      {chapterFrames.map((vFrames, i) => {
        const chapterStart = chapterStarts[i];
        const chapterDur = TITLE_DUR + vFrames + TRANSITION_DUR;

        return (
          <React.Fragment key={i}>
            {/* Title card */}
            <Sequence
              from={chapterStart}
              durationInFrames={TITLE_DUR}
              layout="none"
            >
              <ChapterTitle title={CHAPTER_TITLES[i]} />
            </Sequence>

            {/* Video playback */}
            <Sequence
              from={chapterStart + TITLE_DUR}
              durationInFrames={vFrames}
              layout="none"
            >
              <ChapterVideo videoFile={VIDEO_FILES[i]} videoFrames={vFrames} />
            </Sequence>
          </React.Fragment>
        );
      })}

      {/* Chapter bar overlay */}
      <ChapterBar
        activeChapter={activeChapter}
        frame={frame}
        visible={barVisible}
      />
    </AbsoluteFill>
  );
};
