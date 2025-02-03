import getThoughtStatus from "@/lib/agent/getAgentStatus";
import getSocialPlatformByLink from "@/lib/getSocialPlatformByLink";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useAutopilotProvider } from "@/providers/AutopilotProvider";
import { STEP_OF_AGENT } from "@/types/Funnel";
import { useRouter } from "next/navigation";

const useClickCurrentState = () => {
  const { selectedArtist } = useArtistProvider();
  const { curLiveAgent } = useAutopilotProvider();
  const { push } = useRouter();

  const statusMessages: any = {
    [STEP_OF_AGENT.INITIAL]: `Looking at ${selectedArtist?.name}'s profile.`,
    [STEP_OF_AGENT.PROFILE]: `Looking at ${selectedArtist?.name}'s profile.`,
    [STEP_OF_AGENT.TRACKS]: `Looking at ${selectedArtist?.name}'s tracks.`,
    [STEP_OF_AGENT.POST_COMMENTS]: getThoughtStatus(curLiveAgent?.progress),
    [STEP_OF_AGENT.ALBUMS]: `Looking at ${selectedArtist?.name}'s albums.`,
    [STEP_OF_AGENT.POSTURLS]: `Reviewing ${selectedArtist?.name}'s top-performing videos.`,
    [STEP_OF_AGENT.SAVING_ANALYSIS]: `Saving video comments scrapped data.`,
    [STEP_OF_AGENT.CREATED_ARTIST]: `Setting up artist mode.`,
    [STEP_OF_AGENT.FINISHED]: "",
    [STEP_OF_AGENT.SETTING_UP_ARTIST]: `Setting up artist mode.`,
  };

  const runningAgentType = getSocialPlatformByLink(
    curLiveAgent?.social?.profile_url,
  );
  const runningAgentState = `Running ${runningAgentType} Analysis... \n ${statusMessages[`${curLiveAgent?.status}`] || `Looking at ${selectedArtist?.name}'s profile.`} \n Updated At: ${new Date(curLiveAgent?.updated_at).toLocaleString()}`;

  const handleClickState = () => {
    if (curLiveAgent) {
      push(
        `/funnels/${runningAgentType.toLowerCase()}/${curLiveAgent.agent.id}`,
      );
      return;
    }
  };

  return {
    statusMessages,
    handleClickState,
    runningAgentState,
  };
};

export default useClickCurrentState;
