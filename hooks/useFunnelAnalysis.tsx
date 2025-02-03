import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import useFunnelAnalysisParams from "./useFunnelAnalysisParams";
import getAgentIdFromStack from "@/lib/stack/getAgentIdFromStack";
import getAgent from "@/lib/supabase/getAgent";
import getAgentsStatus from "@/lib/agent/getAgentsStatus";
import isFinishedScraping from "@/lib/agent/isFinishedScraping";
import getAgentsInfoFromStack from "@/lib/stack/getAgentsInfoFromStack";

const useFunnelAnalysis = () => {
  const params = useFunnelAnalysisParams();
  const { analysis_id: analysisId } = useParams();
  const { address } = useUserProvider();
  const { getArtists } = useArtistProvider();

  const getAgentTimer = async (timer: any = null) => {
    if (!params.agentId) {
      clearInterval(timer);
      return;
    }
    params.setIsLoading(true);
    if (!params.agentsStatus.length) params.setIsCheckingAgentStatus(true);
    params.setIsLoadingAgent(true);
    const { agent, comments } = await getAgent(params.agentId);
    if (!agent) {
      params.setIsCheckingAgentStatus(true);
      params.setIsLoadingAgent(false);
      return;
    }
    params.setIsLoadingAgent(false);
    getArtists();
    params.setAgent(agent);
    params.setIsCheckingAgentStatus(false);
    const status = getAgentsStatus(agent);
    params.setAgentsStatus(status);
    params.setIsInitializing(false);
    if (isFinishedScraping(status)) {
      params.setIsLoadingSegments(true);
      const { segments } = await getAgentsInfoFromStack(
        params.agentId,
        comments.slice(0, 500),
        address,
      );
      params.setSegments(segments);
      params.setIsLoadingSegments(false);
      clearInterval(timer);
      return;
    }
  };
  useEffect(() => {
    getAgentTimer();
    const timer = setInterval(async () => {
      getAgentTimer(timer);
    }, 10000);
    return () => clearInterval(timer);
  }, [params.agentId]);

  useEffect(() => {
    params.setSegments([]);
    params.setAgent(null);
    const init = async () => {
      params.setIsCheckingAgentId(true);
      const agentId = await getAgentIdFromStack(analysisId as string, address);
      if (agentId) params.setAgentId(agentId);
      params.setIsCheckingAgentId(false);
    };
    if (!analysisId || !address) {
      params.setAgentId(null);
      return;
    }
    init();
  }, [analysisId, address]);

  return {
    ...params,
  };
};

export default useFunnelAnalysis;
