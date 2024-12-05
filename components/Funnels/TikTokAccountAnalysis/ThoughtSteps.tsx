import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import { STEP_OF_ANALYSIS } from "@/types/Thought";

const ThoughtSteps = () => {
  const { thought, progress } = useTikTokAnalysisProvider();

  return (
    <p className="font-bold">
      {thought === STEP_OF_ANALYSIS.PROFILE &&
        `I'm looking at the TikTok artist profile...`}
      {thought === STEP_OF_ANALYSIS.POSTURLS &&
        `I'm looking at the TikTok videos...`}
      {thought === STEP_OF_ANALYSIS.VIDEO_COMMENTS &&
        `I'm looking at the TikTok video comments... ${Number(progress).toFixed(0)}%`}
      {thought === STEP_OF_ANALYSIS.SEGMENTS &&
        `I'm grouping all of the Artist's TikTok Fans into the segments…`}
      {thought === STEP_OF_ANALYSIS.SAVING_ANALYSIS &&
        `I'm saving video comments scrapped data...`}
      {thought === STEP_OF_ANALYSIS.CREATING_ARTIST &&
        `I'm setting up artist mode…`}
    </p>
  );
};

export default ThoughtSteps;
