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
  const { fetchConversations } = useConversations();

  const lookupProfiles = async (
    funnelType: string,
    scrapingArtist: ArtistRecord | null = null,
  ) => {
    if (!isPrepared()) return;
    setHandles({});
    setAgentsStatus([]);
    setIsCheckingHandles(true);
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

  const runAgents = async () => {
    if (!selectedArtist?.id) return;
    const newAnalysisId = uuidV4();
    push(`/funnels/${funnelType}/${newAnalysisId}`);
    setIsCheckingHandles(false);
    setIsLoading(true);
    setIsInitializing(true);
    const agentId = await callAgentApi(
      handles,
      funnelType as string,
      selectedArtist?.account_id,
    );
    if (!agentId || !analysisId) return;
    await trackAgent(agentId, analysisId as string, address);
    setAgentId(agentId);
    await trackAgentChat(
      address,
      selectedArtist.name || "",
      selectedArtist?.account_id,
      analysisId as string,
      funnelType as string,
    );
    fetchConversations(address);
  };

  return {
    runAgents,
    lookupProfiles,
  };
};

export default useAgents;
