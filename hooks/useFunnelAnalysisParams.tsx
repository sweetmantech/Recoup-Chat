import capitalize from "@/lib/capitalize";
import { Funnel_Type } from "@/types/Funnel";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const useFunnelAnalysisParams = () => {
  const [username, setUsername] = useState("");
  const [thoughts, setThoughts] = useState<any>({});
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const artistHandle = username.replaceAll("@", "");
  const [segments, setSegments] = useState<Array<any>>([]);
  const { funnel_type: funnelType } = useParams();
  const { push } = useRouter();
  const [handles, setHandles] = useState<any>({});
  const [isCheckingHandles, setIsCheckingHandles] = useState(false);

  const funnelName = useMemo(() => {
    if (!funnelType) return "";
    if (funnelType === Funnel_Type.TIKTOK) return "TikTok";
    return capitalize(funnelType as string);
  }, [funnelType]);

  const handleRetry = () => {
    setResult(null);
    setSegments([]);
    setThoughts({});
    setUsername("");
    setIsLoading(false);
    push(`/funnels/${funnelType}/${uuidV4()}`);
  };

  return {
    isLoading,
    setIsLoading,
    artistHandle,
    segments,
    setSegments,
    result,
    setResult,
    setUsername,
    setThoughts,
    funnelName,
    funnelType,
    thoughts,
    handleRetry,
    username,
    handles,
    setHandles,
    isCheckingHandles,
    setIsCheckingHandles,
  };
};

export default useFunnelAnalysisParams;
