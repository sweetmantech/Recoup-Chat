import { Funnel_Type } from "@/types/Funnel";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const useFunnelAnalysis = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thought, setThought] = useState(STEP_OF_ANALYSIS.INITITAL);
  const [result, setResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [segments, setSegments] = useState<Array<any>>([]);
  const artistHandle = username.replaceAll("@", "");
  const [funnelType, setFunnelType] = useState(Funnel_Type.NONE);
  const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    if (pathname.includes("tiktok")) setFunnelType(Funnel_Type.TIKTOK);
    if (pathname.includes("twitter")) setFunnelType(Funnel_Type.TWITTER);
  }, [pathname]);

  const funnelName = useMemo(() => {
    if (funnelType === Funnel_Type.TIKTOK) return "TikTok";
    return funnelType;
  }, [funnelType]);

  const handleRetry = () => {
    setResult(null);
    setSegments([]);
    setThought(STEP_OF_ANALYSIS.POSTURLS);
    setProgress(0);
    setUsername("");
    setIsLoading(false);
    push(`/funnels/${uuidV4()}/${funnelType}-account-analysis`);
  };

  const initialize = () => {
    setIsLoading(false);
    setThought(STEP_OF_ANALYSIS.INITITAL);
    push(`/funnels/${uuidV4()}/${funnelType}-account-analysis`);
  };

  return {
    username,
    setUsername,
    isLoading,
    setIsLoading,
    thought,
    result,
    setResult,
    progress,
    setProgress,
    segments,
    setThought,
    setSegments,
    artistHandle,
    funnelType,
    handleRetry,
    initialize,
    funnelName,
  };
};

export default useFunnelAnalysis;
