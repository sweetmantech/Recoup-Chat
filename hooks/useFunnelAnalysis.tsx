import addArtist from "@/lib/addArtist";
import capitalize from "@/lib/capitalize";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useInitialChatProvider } from "@/providers/InitialChatProvider";
import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { Funnel_Type } from "@/types/Funnel";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useParams, usePathname, useRouter } from "next/navigation";
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
  const { getArtists } = useArtistProvider();
  const { chat_id: chatId } = useParams();
  const { email } = useUserProvider();
  const { clearMessagesCache } = useInitialChatProvider();
  const { clearReportCache, setTiktokAnalysis } = useTikTokReportProvider();

  useEffect(() => {
    if (pathname.includes("tiktok")) setFunnelType(Funnel_Type.TIKTOK);
    if (pathname.includes("twitter")) setFunnelType(Funnel_Type.TWITTER);
  }, [pathname]);

  const funnelName = useMemo(() => {
    if (funnelType === Funnel_Type.TIKTOK) return "TikTok";
    return capitalize(funnelType);
  }, [funnelType]);

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
