import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useFunnelAnalysisParams from "./useFunnelAnalysisParams";
import getAnalysisSegments from "@/lib/agent/getAnalysisSegments";
import getAgentIdFromStack from "@/lib/stack/getAgentIdFromStack";
import getAgent from "@/lib/supabase/getAgent";
import getAgentsStatus from "@/lib/agent/getAgentsStatus";
import isFinishedScraping from "@/lib/agent/isFinishedScraping";

const useFunnelAnalysis = () => {
  const params = useFunnelAnalysisParams();
  const { analysis_id: analysisId } = useParams();
  const { address } = useUserProvider();
  const { getArtists } = useArtistProvider();
  const [agentId, setAgentId] = useState<string | null>(null);
  const [agent, setAgent] = useState<any>(null);
  const [agentsStatus, setAgentsStatus] = useState<any>([]);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isCheckingAgentId, setIsCheckingAgentId] = useState(false);

  const getAgentTimer = async (timer: any = null) => {
    if (!agentId) {
      clearInterval(timer);
      return;
    }
    params.setIsLoading(true);
    const agent = await getAgent(agentId);
    if (!agent) return;
    getArtists();
    setAgent(agent);
    const status = getAgentsStatus(agent);
    setAgentsStatus(status);
    setIsInitializing(false);
    if (isFinishedScraping(status)) {
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
  }, [agentId]);

  useEffect(() => {
    const init = async () => {
      setIsCheckingAgentId(true);
      const agentId = await getAgentIdFromStack(analysisId as string, address);
      if (agentId) setAgentId(agentId);
      setIsCheckingAgentId(false);
    };
    if (!analysisId || !address) {
      setAgentId(null);
      return;
    }
    init();
  }, [analysisId, address]);

  return {
    ...params,
    setAgentId,
    agent,
    agentsStatus,
    isInitializing,
    setIsInitializing,
    setAgentsStatus,
    isCheckingAgentId,
  };
};

export default useFunnelAnalysis;
