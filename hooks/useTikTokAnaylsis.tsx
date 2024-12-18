import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import addArtist from "@/lib/addArtist";
import useTikTokAnalysisChain from "./useTikTokAnalysisChain";
import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { useInitialChatProvider } from "@/providers/InitialChatProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const useTikTokAnalysis = () => {
  const tiktokAnalysisChain = useTikTokAnalysisChain();
  const { setResult, setSegments, setIsLoading, setThought } =
    useFunnelAnalysisProvider();
  const { getArtists } = useArtistProvider();
  const { chat_id: chatId } = useParams();
  const { email } = useUserProvider();
  const { clearMessagesCache } = useInitialChatProvider();
  const { clearReportCache, setTiktokAnalysis } = useTikTokReportProvider();

  useEffect(() => {
    const init = async () => {
      clearReportCache();
      clearMessagesCache();
      const response = await fetch(`/api/tiktok_analysis?chatId=${chatId}`);
      const data = await response.json();
      if (data?.data) {
        if (email) {
          await addArtist(email || "", data.data.artistId);
          await getArtists();
        }
        setTiktokAnalysis(data.data);
        setResult(data.data);
        setSegments(data.data.segments);
        setIsLoading(true);
        setThought(STEP_OF_ANALYSIS.FINISHED);
      }
    };
    if (!chatId) return;
    init();
  }, [chatId, email]);

  return {
    ...tiktokAnalysisChain,
  };
};

export default useTikTokAnalysis;
