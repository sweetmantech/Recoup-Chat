import { useArtistProvider } from "@/providers/ArtistProvider";
import { useInitialChatProvider } from "@/providers/InitialChatProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useParams } from "next/navigation";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useCallback, useEffect } from "react";
import getFunnelAnalysis from "@/lib/getFunnelAnalysis";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import useFunnelAnalysisParams from "./useFunnelAnalysisParams";

const useFunnelAnalysis = () => {
  const params = useFunnelAnalysisParams();
  const { setSelectedArtist } = useArtistProvider();
  const { chat_id: chatId } = useParams();
  const { clearMessagesCache } = useInitialChatProvider();
  const { clearReportCache, setBannerArtistName, setBannerImage } =
    useFunnelReportProvider();
  const { fetchConversations } = useConversationsProvider();
  const { address } = useUserProvider();

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
    let id = null;
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
        id = funnel_analysis.id;
      }
      params.setUsername(funnel_analysis.handle || "");
      tempThoughts[`${funnel_analysis.type.toLowerCase()}`] = {
        status: funnel_analysis.status,
      };
      params.setThoughts(tempThoughts);
      tempProfile = {
        ...tempProfile,
        ...funnel_analysis.funnel_analytics_profile?.[0],
      };
      tempHandles = funnel_analysis.handle;
    });

    params.setSegments(analytics_segments.flat());
    params.setResult({
      segments: analytics_segments.flat(),
      ...tempProfile,
      handle: tempHandles,
      id,
    });
    params.setIsLoading(true);
    fetchConversations(address);
  }, [chatId]);

  useEffect(() => {
    getAnalysis();
  }, [getAnalysis]);

  return {
    getAnalysis,
    ...params,
  };
};

export default useFunnelAnalysis;
