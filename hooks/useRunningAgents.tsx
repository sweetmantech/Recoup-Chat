import getThoughtStatus from "@/lib/agent/getAgentStatus";
import getRunningAgent from "@/lib/getRunningAgent";
import getSocialPlatformByLink from "@/lib/getSocialPlatformByLink";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { STEP_OF_AGENT } from "@/types/Funnel";
import { useCallback, useEffect, useState } from "react";

const useRunningAgents = () => {
  const [curLiveAgent, setCurLiveAgent] = useState<any>(null);
  const { selectedArtist } = useArtistProvider();

  const statusMessages: any = {
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

  const getLiveAgent = useCallback(async () => {
    if (!selectedArtist?.account_id) return;
    const response = await getRunningAgent(selectedArtist?.account_id);
    if (!response) {
      setCurLiveAgent(0);
      return;
    }
    setCurLiveAgent(
      `Running ${getSocialPlatformByLink(response?.social?.profile_url)} Analysis... \n ${statusMessages[`${response?.status}`]} \n Created: ${new Date(response.updated_at).toLocaleString()}`,
    );
  }, [selectedArtist]);

  useEffect(() => {
    getLiveAgent();
    const timer = setInterval(getLiveAgent, 10000);
    return () => clearInterval(timer);
  }, [getLiveAgent]);

  return {
    curLiveAgent,
  };
};

export default useRunningAgents;
