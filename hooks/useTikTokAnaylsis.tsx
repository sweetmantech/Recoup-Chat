import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { STEP_OF_ANALYSIS } from "@/types/Thought";
import addArtist from "@/lib/addArtist";
import useChainOfThought from "./useChainOfThought";

const useTikTokAnalysis = () => {
  const chainOfThought = useChainOfThought();
  const { getArtists } = useArtistProvider();
  const { chat_id: chatId } = useParams();
  const { push } = useRouter();
  const { email } = useUserProvider();

  useEffect(() => {
    const init = async () => {
      const response = await fetch(`/api/tiktok_analysis?chatId=${chatId}`);
      const data = await response.json();
      if (data?.data) {
        if (email) {
          await addArtist(email || "", data.data.artistId);
          await getArtists();
        }
        chainOfThought.setResult(data.data);
        chainOfThought.setSegments(data.data.segments);
        chainOfThought.setIsLoading(true);
        chainOfThought.setThought(STEP_OF_ANALYSIS.FINISHED);
      }
    };
    if (!chatId) return;
    init();
  }, [chatId, email]);

  const handleRetry = () => {
    chainOfThought.setResult(null);
    chainOfThought.setSegments([]);
    chainOfThought.setThought(STEP_OF_ANALYSIS.POSTURLS);
    chainOfThought.setProgress(0);
    chainOfThought.setUsername("");
    chainOfThought.setIsLoading(false);
    push("/funnels/tiktok-account-analysis");
  };

  return {
    ...chainOfThought,
    handleRetry,
  };
};

export default useTikTokAnalysis;
