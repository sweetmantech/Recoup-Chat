import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import addArtist from "@/lib/addArtist";
import useTikTokAnalysisChain from "./useTikTokAnalysisChain";
import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { useInitialChatProvider } from "@/providers/InitialChatProvider";

const useTikTokAnalysis = () => {
  const tiktokAnalysisChain = useTikTokAnalysisChain();
  const { getArtists } = useArtistProvider();
  const { chat_id: chatId } = useParams();
  const { push } = useRouter();
  const { email } = useUserProvider();
  const { clearMessagesCache } = useInitialChatProvider();
  const { clearReportCache } = useTikTokReportProvider();

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
        tiktokAnalysisChain.setResult(data.data);
        tiktokAnalysisChain.setSegments(data.data.segments);
        tiktokAnalysisChain.setIsLoading(true);
        tiktokAnalysisChain.setThought(STEP_OF_ANALYSIS.FINISHED);
      }
    };
    if (!chatId) return;
    init();
  }, [chatId, email]);

  const handleRetry = () => {
    tiktokAnalysisChain.setResult(null);
    tiktokAnalysisChain.setSegments([]);
    tiktokAnalysisChain.setThought(STEP_OF_ANALYSIS.POSTURLS);
    tiktokAnalysisChain.setProgress(0);
    tiktokAnalysisChain.setUsername("");
    tiktokAnalysisChain.setIsLoading(false);
    push("/funnels/tiktok-account-analysis");
  };

  return {
    ...tiktokAnalysisChain,
    handleRetry,
  };
};

export default useTikTokAnalysis;
