import getRunningAgent from "@/lib/getRunningAgent";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useCallback, useEffect, useState } from "react";

const useRunningAgents = () => {
  const [curLiveAgent, setCurLiveAgent] = useState<any>(null);
  const { selectedArtist } = useArtistProvider();

  const getLiveAgent = useCallback(async () => {
    if (!selectedArtist?.account_id) return;
    const response = await getRunningAgent(selectedArtist?.account_id);
    if (!response) {
      setCurLiveAgent(0);
      return;
    }
    setCurLiveAgent(response);
  }, [selectedArtist]);

  useEffect(() => {
    getLiveAgent();
    const timer = setInterval(getLiveAgent, 3000);
    return () => clearInterval(timer);
  }, [getLiveAgent]);

  return {
    curLiveAgent,
  };
};

export default useRunningAgents;
