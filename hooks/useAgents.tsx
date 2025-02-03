import getHandles from "@/lib/getHandles";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidV4 } from "uuid";
import { ArtistRecord } from "@/types/Artist";
import callAgentApi from "@/lib/agent/callAgentApi";
import trackAgent from "@/lib/stack/trackAgentRun";
import trackAgentChat from "@/lib/stack/trackAgentChat";
import useConversations from "./useConversations";

const useAgents = () => {
  const {
    handles,
    setHandles,
    setIsCheckingHandles,
    funnelType,
    setAgentId,
    setIsInitializing,
    setAgentsStatus,
    setIsLoading,
  } = useFunnelAnalysisProvider();
  const { analysis_id: analysisId } = useParams();
  const { push } = useRouter();
  const { address, isPrepared } = useUserProvider();
  const { selectedArtist } = useArtistProvider();
  const { addConversations } = useConversations();

  const lookupProfiles = async (
    funnelType: string,
    scrapingArtist: ArtistRecord | null = null,
  ) => {
    if (!isPrepared()) return;
    setHandles({});

    setIsCheckingHandles(true);
    const newAnalysisId = uuidV4();
    push(`/funnels/${funnelType}/${newAnalysisId}`);
    const handle = scrapingArtist?.name || selectedArtist?.name || "";
    const socialHandles: any = await getHandles(handle);
    if (funnelType === "wrapped") {
      setHandles(socialHandles);
      return;
    }
    setHandles({
      [`${funnelType}`]: socialHandles[`${funnelType}`],
    });
  };

  const runAgents = async (agentdata: any = null) => {
    const agentArtistId = agentdata?.artistId || selectedArtist?.account_id;
    const agentAnalysisId = analysisId || uuidV4();
    const agentArtistName = agentdata?.name || selectedArtist?.name || "";
    const agentArtistHandles = agentdata?.handles || handles;

    if (!agentArtistId) return;

    setIsCheckingHandles(false);
    setAgentsStatus([]);
    setIsInitializing(true);
    setIsLoading(true);
    const agentId = await callAgentApi(
      agentArtistHandles,
      funnelType as string,
      agentArtistId,
    );
    if (!agentId) return;
    await trackAgent(agentId, agentAnalysisId as string, address);
    setAgentId(agentId);
    await trackAgentChat(
      address,
      agentArtistName,
      agentArtistId,
      agentAnalysisId as string,
      funnelType as string,
    );
    addConversations({
      conversationId: agentAnalysisId,
      accountId: agentArtistId,
      title: `${funnelType} Analysis: ${agentArtistName}`,
      is_funnel_analysis: true,
      funnel_name: funnelType,
    });
    push(`/funnels/${funnelType}/${agentAnalysisId}`);
  };

  return {
    runAgents,
    lookupProfiles,
  };
};

export default useAgents;
