import { useArtistProvider } from "@/providers/ArtistProvider";
import { useInitialChatProvider } from "@/providers/InitialChatProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import getFunnelAnalysis from "@/lib/getFunnelAnalysis";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import useFunnelAnalysisParams from "./useFunnelAnalysisParams";
import getAggregatedArtist from "@/lib/agent/getAggregatedArtist";
import getAggregatedProfile from "@/lib/agent/getAggregatedProfile";
import getAnalysisSegments from "@/lib/agent/getAnalysisSegments";
import getAnalysisThoughts from "@/lib/agent/getAnalaysisThoughts";

const useFunnelAnalysis = () => {
  const params = useFunnelAnalysisParams();
  const { setSelectedArtist, selectedArtist } = useArtistProvider();
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
    const funnel_analyses: any = await getFunnelAnalysis(chatId as string);
    if (!funnel_analyses) return;
    const artist: any = getAggregatedArtist(funnel_analyses);
    const aggregatedArtistProfile: any = getAggregatedProfile(
      params.funnelType as string,
      artist,
      selectedArtist,
    );
    setSelectedArtist(aggregatedArtistProfile);
    setBannerImage(aggregatedArtistProfile.image);
    setBannerArtistName(aggregatedArtistProfile.name);
    const analyticsSegments = getAnalysisSegments(funnel_analyses);
    const aggregatedThoughts = getAnalysisThoughts(funnel_analyses);
    params.setThoughts({
      ...params.thoughts,
      ...aggregatedThoughts,
    });
    params.setUsername(aggregatedArtistProfile.handle || "");
    params.setSegments(analyticsSegments);
    params.setResult({
      segments: analyticsSegments,
      ...aggregatedArtistProfile,
      handle: artist.handle,
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
