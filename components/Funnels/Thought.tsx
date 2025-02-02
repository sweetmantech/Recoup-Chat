import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { STEP_OF_AGENT } from "@/types/Funnel";
import StreamingThought from "./StreamThought";
import isFinishedScraping from "@/lib/agent/isFinishedScraping";
import getThoughtStatus from "@/lib/agent/getAgentStatus";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Thought = ({ thought }: { thought: any }) => {
  const { funnelType, funnelName, agentsStatus } = useFunnelAnalysisProvider();
  const { selectedArtist, toggleSettingModal } = useArtistProvider();

  const isError = thought.status === STEP_OF_AGENT.ERROR;
  const isComplete = thought.status === STEP_OF_AGENT.FINISHED;
  const socialPlatform = agentsStatus?.length ? "Wrapped" : thought.type;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusMessages: any = {
    [STEP_OF_AGENT.INITIAL]: `Looking at ${selectedArtist?.name}'s profile.`,
    [STEP_OF_AGENT.PROFILE]: `Looking at ${selectedArtist?.name}'s profile.`,
    [STEP_OF_AGENT.TRACKS]: `Looking at ${selectedArtist?.name}'s tracks.`,
    [STEP_OF_AGENT.POST_COMMENTS]: getThoughtStatus(thought.progress),
    [STEP_OF_AGENT.ALBUMS]: `Looking at ${selectedArtist?.name}'s albums.`,
    [STEP_OF_AGENT.POSTURLS]: `Reviewing ${selectedArtist?.name}'s top-performing videos.`,
    [STEP_OF_AGENT.SEGMENTS]: `Grouping all of the @${selectedArtist?.name}'s ${funnelName} Fans into the segments.`,
    [STEP_OF_AGENT.SAVING_ANALYSIS]: `Saving video comments scrapped data.`,
    [STEP_OF_AGENT.CREATED_ARTIST]: `Setting up artist mode.`,
  };

  return (
    <>
      <span>
        {funnelType === "wrapped" &&
          !isFinishedScraping(agentsStatus) &&
          `${socialPlatform}: `}
      </span>
      <StreamingThought text={statusMessages[thought.status] || ""} />
      {isError && !isFinishedScraping(agentsStatus) && (
        <span onClick={toggleSettingModal} className="underline cursor-pointer">
          Click here to retry.
        </span>
      )}
      {isComplete && !isFinishedScraping(agentsStatus) && (
        <StreamingThought
          text={`${socialPlatform} analysis complete ✅`}
        ></StreamingThought>
      )}
    </>
  );
};

export default Thought;
