import {AbsoluteFill, Sequence} from 'remotion';
import {S0_Comparison} from './sequences/S0_Comparison';
import {S1_Reveal} from './sequences/S1_Reveal';
import {S2_Progression} from './sequences/S2_Progression';
import {S3_Promise} from './sequences/S3_Promise';
import {S4_ChapterVideos} from './sequences/S4_ChapterVideos';
import {S5_Outro} from './sequences/S5_Outro';

const CH1_FRAMES = 1304;
const CH2_FRAMES = 2154;
const CH3_FRAMES = 1767;
const CH4_FRAMES = 3855;
const CHAPTER_OVERHEAD = 90;

const S0_DUR = 180;
const S1_DUR = 150;
const S2_DUR = 180;
const S3_DUR = 120;
const S4_DUR =
  CH1_FRAMES + CH2_FRAMES + CH3_FRAMES + CH4_FRAMES + 4 * CHAPTER_OVERHEAD;
const S5_DUR = 150;

const S0_START = 0;
const S1_START = S0_START + S0_DUR;
const S2_START = S1_START + S1_DUR;
const S3_START = S2_START + S2_DUR;
const S4_START = S3_START + S3_DUR;
const S5_START = S4_START + S4_DUR;

export const DemoVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={S0_START} durationInFrames={S0_DUR} name="S0-Comparison">
        <S0_Comparison />
      </Sequence>
      <Sequence from={S1_START} durationInFrames={S1_DUR} name="S1-Reveal">
        <S1_Reveal />
      </Sequence>
      <Sequence
        from={S2_START}
        durationInFrames={S2_DUR}
        name="S2-Progression"
      >
        <S2_Progression />
      </Sequence>
      <Sequence from={S3_START} durationInFrames={S3_DUR} name="S3-Promise">
        <S3_Promise />
      </Sequence>
      <Sequence
        from={S4_START}
        durationInFrames={S4_DUR}
        name="S4-ChapterVideos"
      >
        <S4_ChapterVideos
          chapterFrames={[CH1_FRAMES, CH2_FRAMES, CH3_FRAMES, CH4_FRAMES]}
        />
      </Sequence>
      <Sequence from={S5_START} durationInFrames={S5_DUR} name="S5-Outro">
        <S5_Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
