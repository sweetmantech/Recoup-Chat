import capitalize from "@/lib/capitalize";
import { Funnel_Type } from "@/types/Funnel";
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
  const [isCheckingAgentId, setIsCheckingAgentId] = useState(false);
  const [isCheckingAgentStatus, setIsCheckingAgentStatus] = useState(false);

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
    setIsCheckingAgentId,
    isCheckingAgentId,
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
  };
};

export default useFunnelAnalysisParams;
