import { useArtistProvider } from "@/providers/ArtistProvider";
import { STEP_OF_AGENT } from "@/types/Funnel";
import { useCallback, useEffect, useState } from "react";

const useRunningAgents = () => {
  const [curLiveAgent, setCurLiveAgent] = useState<string | null>(null);
  const { selectedArtist } = useArtistProvider();

  const statusMessages: any = (handle: string) => ({
    [STEP_OF_AGENT.PROFILE]: `Looking at ${handle}'s profile.`,
    [STEP_OF_AGENT.TRACKS]: `Looking at ${handle}'s tracks.`,
    [STEP_OF_AGENT.ALBUMS]: `Looking at ${handle}'s albums.`,
    [STEP_OF_AGENT.POSTURLS]: `Reviewing ${handle}'s top-performing videos.`,
    [STEP_OF_AGENT.POST_COMMENTS]: `Looking at overlays and captions.`,
    [STEP_OF_AGENT.SEGMENTS]: `Grouping all of the @${handle}'s Fans into the segments.`,
    [STEP_OF_AGENT.SAVING_ANALYSIS]: `Saving video comments scrapped data.`,
    [STEP_OF_AGENT.CREATED_ARTIST]: `Setting up artist mode.`,
  });

  const getLiveAgent = useCallback(async () => {
    if (!selectedArtist?.account_id) return;
    const response = await fetch(
      `/api/get_running_agents?artistId=${selectedArtist?.account_id || ""}`,
    );

    const data = await response.json();
    if (data?.data?.length === 0) {
      setCurLiveAgent(null);
      return;
    }
    setCurLiveAgent(
      null,
      // `Running ${data?.data?.[0]?.type?.toLowerCase()} Analysis... \n ${statusMessages(selectedArtist?.name)[`${data.data[0].status}`]}`,
    );
  }, [selectedArtist]);

  useEffect(() => {
    const timer = setInterval(getLiveAgent, 2000);
    return () => clearInterval(timer);
  }, [getLiveAgent]);

  return {
    curLiveAgent,
  };
};

export default useRunningAgents;
