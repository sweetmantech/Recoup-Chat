import capitalize from "@/lib/capitalize";
import { Funnel_Type } from "@/types/Funnel";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const useFunnelAnalysisParams = () => {
  const [username, setUsername] = useState("");
  const [thoughts, setThoughts] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const artistHandle = username.replaceAll("@", "");
  const [segments, setSegments] = useState<Array<any>>([]);
  const { funnel_type: funnelType } = useParams();
  const { push } = useRouter();

  const funnelName = useMemo(() => {
    if (!funnelType) return "";
    if (funnelType === Funnel_Type.TIKTOK) return "TikTok";
    return capitalize(funnelType as string);
  }, [funnelType]);

  const isFinished =
    thoughts &&
    Object.values(thoughts).every(
      (value: any) =>
        value.status === STEP_OF_ANALYSIS.FINISHED ||
        value.status === STEP_OF_ANALYSIS.ERROR,
    );
  const scraping =
    thoughts &&
    Object.values(thoughts).some(
      (value: any) => value.status > STEP_OF_ANALYSIS.UNKNOWN_PROFILE,
    );
  const isInitial =
    thoughts &&
    Object.values(thoughts).every(
      (value: any) => value.status === STEP_OF_ANALYSIS.INITITAL,
    );

  const handleRetry = () => {
    setResult(null);
    setSegments([]);
    setThoughts(null);
    setUsername("");
    setIsLoading(false);
    push(`/funnels/${funnelType}/${uuidV4()}`);
  };

  useEffect(() => {
    if (!funnelType) return;
    if (funnelType === "wrapped") {
      setThoughts({
        twitter: { status: STEP_OF_ANALYSIS.INITITAL },
        spotify: { status: STEP_OF_ANALYSIS.INITITAL },
        tiktok: { status: STEP_OF_ANALYSIS.INITITAL },
        instagram: { status: STEP_OF_ANALYSIS.INITITAL },
      });
      return;
    }

    setThoughts({
      [`${funnelType}`]: {
        status: STEP_OF_ANALYSIS.INITITAL,
      },
    });
  }, [funnelType]);
  return {
    isLoading,
    setIsLoading,
    artistHandle,
    segments,
    setSegments,
    isFinished,
    scraping,
    isInitial,
    result,
    setResult,
    setUsername,
    setThoughts,
    funnelName,
    funnelType,
    thoughts,
    handleRetry,
    username,
  };
};

export default useFunnelAnalysisParams;
