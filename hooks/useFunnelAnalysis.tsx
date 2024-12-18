import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

const useFunnelAnalysis = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thought, setThought] = useState(STEP_OF_ANALYSIS.INITITAL);
  const [result, setResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [segments, setSegments] = useState<Array<any>>([]);
  const artistHandle = username.replaceAll("@", "");
  const { funnel_type: funnelType } = useParams();
  const { push } = useRouter();

  const handleRetry = () => {
    setResult(null);
    setSegments([]);
    setThought(STEP_OF_ANALYSIS.POSTURLS);
    setProgress(0);
    setUsername("");
    setIsLoading(false);
    push(`/funnels/${funnelType}/${uuidV4()}`);
  };

  const initialize = () => {
    setIsLoading(false);
    setThought(STEP_OF_ANALYSIS.INITITAL);
    push(`/funnels/${funnelType}/${uuidV4()}`);
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
  };
};

export default useFunnelAnalysis;
