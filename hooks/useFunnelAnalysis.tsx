import capitalize from "@/lib/capitalize";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useInitialChatProvider } from "@/providers/InitialChatProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useParams, useRouter } from "next/navigation";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Funnel_Type } from "@/types/Funnel";
import getFunnelAnalysis from "@/lib/getFunnelAnalysis";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";

const useFunnelAnalysis = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thoughts, setThoughts] = useState<any>(null);
  const [result, setResult] = useState<any>(null);
  const [segments, setSegments] = useState<Array<any>>([]);
  const artistHandle = username.replaceAll("@", "");
  const { funnel_type: funnelType } = useParams();
  const { push } = useRouter();
  const { setSelectedArtist } = useArtistProvider();
  const { chat_id: chatId } = useParams();
  const { clearMessagesCache } = useInitialChatProvider();
  const { clearReportCache, setBannerArtistName, setBannerImage } =
    useFunnelReportProvider();
  const { fetchConversations } = useConversationsProvider();
  const { address } = useUserProvider();

  const isFinished =
    thoughts &&
    Object.values(thoughts).every(
      (value: any) =>
        value.status === STEP_OF_ANALYSIS.FINISHED ||
        value.status === STEP_OF_ANALYSIS.ERROR,
    );
  const scrapping =
    thoughts &&
    Object.values(thoughts).some(
      (value: any) => value.status > STEP_OF_ANALYSIS.UNKNOWN_PROFILE,
    );
  const isInitial =
    thoughts &&
    Object.values(thoughts).every(
      (value: any) => value.status === STEP_OF_ANALYSIS.INITITAL,
    );

  const funnelName = useMemo(() => {
    if (!funnelType) return "";
    if (funnelType === Funnel_Type.TIKTOK) return "TikTok";
    return capitalize(funnelType as string);
  }, [funnelType]);

  const getAnalysis = useCallback(async () => {
    if (!chatId) return;
    clearReportCache();
    clearMessagesCache();
    const funnel_analysises: any = await getFunnelAnalysis(chatId as string);
    if (!funnel_analysises) return;
    const analytics_segments: any = [];
    const tempThoughts: any = {};
    let tempHandles = "";
    let tempProfile: any = {};
    funnel_analysises.map((funnel_analysis: any) => {
      if (funnel_analysis.status === STEP_OF_ANALYSIS.FINISHED) {
        setBannerImage(funnel_analysis.funnel_analytics_profile?.[0]?.avatar);
        setBannerArtistName(
          funnel_analysis.funnel_analytics_profile?.[0]?.nickname,
        );
        analytics_segments.push(funnel_analysis.funnel_analytics_segments);
        setSelectedArtist(
          funnel_analysis.funnel_analytics_profile?.[0]?.artists,
        );
      }
      setUsername(funnel_analysis.handle || "");
      tempThoughts[`${funnel_analysis.type.toLowerCase()}`] = {
        status: funnel_analysis.status,
      };
      setThoughts(tempThoughts);
      tempProfile = {
        ...tempProfile,
        ...funnel_analysis.funnel_analytics_profile?.[0],
      };
      tempHandles = funnel_analysis.handle;
    });

    setSegments(analytics_segments.flat());
    setResult({
      segments: analytics_segments.flat(),
      ...tempProfile,
      handle: tempHandles,
    });
    setIsLoading(true);
    fetchConversations(address);
  }, [chatId]);

  useEffect(() => {
    getAnalysis();
  }, [getAnalysis]);

  const handleRetry = () => {
    setResult(null);
    setSegments([]);
    setThoughts(null);
    setUsername("");
    setIsLoading(false);
    push(`/funnels/${funnelType}/${uuidV4()}`);
  };

  const initialize = () => {
    setIsLoading(false);
    setThoughts(null);
    push(`/funnels/${funnelType}/${uuidV4()}`);
  };

  return {
    username,
    setUsername,
    isLoading,
    setIsLoading,
    result,
    setResult,
    segments,
    setSegments,
    artistHandle,
    funnelType,
    handleRetry,
    initialize,
    funnelName,
    getAnalysis,
    thoughts,
    setThoughts,
    isFinished,
    scrapping,
    isInitial,
  };
};

export default useFunnelAnalysis;
