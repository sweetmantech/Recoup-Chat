import capitalize from "@/lib/capitalize";
import { Funnel_Type, STEP_OF_AGENT } from "@/types/Funnel";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const useFunnelAnalysisParams = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [segments, setSegments] = useState<Array<any>>([]);
  const { funnel_type: funnelType } = useParams();
  const { push } = useRouter();
  const [handles, setHandles] = useState<any>({});
  const [isCheckingHandles, setIsCheckingHandles] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isCheckingAgentStatus, setIsCheckingAgentStatus] = useState(false);
  const [isLoadingAgent, setIsLoadingAgent] = useState(false);
  const [isLoadingSegments, setIsLoadingSegments] = useState(false);
  const [agent, setAgent] = useState<any>(null);
  const [agentsStatus, setAgentsStatus] = useState<any>([]);

  const hasError =
    agentsStatus.some(
      (agentStatus: any) =>
        agentStatus.status === STEP_OF_AGENT.ERROR ||
        agentStatus.status === STEP_OF_AGENT.UNKNOWN_PROFILE,
    ) &&
    !agentsStatus.some(
      (agentStatus: any) => agentStatus.status === STEP_OF_AGENT.FINISHED,
    );

  const funnelName = useMemo(() => {
    if (!funnelType) return "";
    if (funnelType === Funnel_Type.TIKTOK) return "TikTok";
    return capitalize(funnelType as string);
  }, [funnelType]);

  const handleRetry = () => {
    setSegments([]);
    setUsername("");
    setIsLoading(false);
    push(`/funnels/${funnelType}/${uuidV4()}`);
  };

  return {
    isInitializing,
    setIsInitializing,
    isLoading,
    setIsLoading,
    segments,
    setSegments,
    setUsername,
    funnelName,
    funnelType,
    handleRetry,
    username,
    handles,
    setHandles,
    isCheckingHandles,
    setIsCheckingHandles,
    setIsCheckingAgentStatus,
    isCheckingAgentStatus,
    setIsLoadingSegments,
    isLoadingSegments,
    setAgent,
    setAgentsStatus,
    agentsStatus,
    agent,
    setIsLoadingAgent,
    isLoadingAgent,
    hasError,
  };
};

export default useFunnelAnalysisParams;
