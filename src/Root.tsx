import {Composition} from 'remotion';
import {DemoVideo} from './DemoVideo';

import '@fontsource/dm-serif-display';
import '@fontsource/dm-sans';

// Video durations at 30fps
const CH1_FRAMES = 1304;
const CH2_FRAMES = 2154;
const CH3_FRAMES = 1767;
const CH4_FRAMES = 3855;
const CHAPTER_OVERHEAD = 90; // 60f title + 30f transition per chapter

const S0 = 180;
const S1 = 150;
const S2 = 180;
const S3 = 120;
const S4 =
  CH1_FRAMES +
  CH2_FRAMES +
  CH3_FRAMES +
  CH4_FRAMES +
  4 * CHAPTER_OVERHEAD;
const S5 = 150;

const TOTAL = S0 + S1 + S2 + S3 + S4 + S5;

export const Root: React.FC = () => {
  return (
    <Composition
      id="DemoVideo"
      component={DemoVideo}
      durationInFrames={TOTAL}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
