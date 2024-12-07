import getThoughtStatus from "@/lib/getThoughtStatus";
import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import { STEP_OF_ANALYSIS } from "@/types/Thought";

const ThoughtSteps = () => {
  const { thought, progress, username } = useTikTokAnalysisProvider();
  const artistHandle = username.replaceAll("@", "");

  return (
    <p className="font-bold">
      {thought === STEP_OF_ANALYSIS.PROFILE &&
        `Looking at ${artistHandle}’s profile.`}
      {thought === STEP_OF_ANALYSIS.POSTURLS &&
        `Reviewing ${artistHandle}’s top-performing videos.`}
      {thought === STEP_OF_ANALYSIS.VIDEO_COMMENTS &&
        getThoughtStatus(progress)}
      {thought === STEP_OF_ANALYSIS.SEGMENTS &&
        `Grouping all of the @${username}'s TikTok Fans into the segments.`}
      {thought === STEP_OF_ANALYSIS.SAVING_ANALYSIS &&
        `Saving video comments scrapped data.`}
      {thought === STEP_OF_ANALYSIS.CREATING_ARTIST &&
        `Setting up artist mode.`}
    </p>
  );
};

export default ThoughtSteps;
