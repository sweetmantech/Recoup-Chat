import getFanSegments from "@/lib/getFanSegments";
import getTikTokProfile from "@/lib/getTiktokProfile";
import getVideoComments from "@/lib/getVideoComments";
import saveAnalysis from "@/lib/saveAnalysis";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { SETTING_MODE } from "@/types/Setting";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { STEP_OF_ANALYSIS } from "@/types/Thought";

const useTikTokAnalysis = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thought, setThought] = useState(STEP_OF_ANALYSIS.PROFILE);
  const [result, setResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [segments, setSegments] = useState<Array<any>>([]);
  const { setSettingMode, saveSetting, setSelectedArtist, setArtistActive } =
    useArtistProvider();
  const { email, isPrepared } = useUserProvider();
  const { conversation: conversationId } = useParams();
  const { push } = useRouter();

  useEffect(() => {
    const init = async () => {
      const response = await fetch(
        `/api/tiktok_analysis?chatId=${conversationId}`,
      );
      const data = await response.json();
      if (data?.data) {
        setResult(data);
        setSegments(data.data.segments);
        setIsLoading(true);
        setThought(STEP_OF_ANALYSIS.FINISHED);
      }
    };
    if (!conversationId) return;
    init();
  }, [conversationId]);

  const handleAnalyze = async () => {
    if (!isPrepared()) return;
    if (!username || isLoading) return;
    let newId = "";
    if (!conversationId) {
      newId = uuidV4();
      push(`/funnels/tiktok-account-analysis/${newId}`);
    }
    try {
      setIsLoading(true);
      setThought(STEP_OF_ANALYSIS.PROFILE);
      const profile = await getTikTokProfile(username.replaceAll("@", ""));
      setThought(STEP_OF_ANALYSIS.VIDEO_COMMENTS);
      const videoComments = await getVideoComments(
        encodeURIComponent(JSON.stringify(profile?.videos)),
        setThought,
        setProgress,
      );
      const profileWithComments = {
        ...profile,
        videos: videoComments.videos,
        total_video_comments_count: videoComments.total_video_comments_count,
      };
      setResult(profileWithComments);
      let fanSegments = [];
      if (videoComments.videos.length > 0) {
        setThought(STEP_OF_ANALYSIS.SEGMENTS);
        fanSegments = await getFanSegments(profileWithComments);
        setSegments(segments);
      }
      setThought(STEP_OF_ANALYSIS.SAVING_ANALYSIS);
      await saveAnalysis({
        ...profileWithComments,
        segments: fanSegments,
        chat_id: newId,
      });
      if (email) {
        setSettingMode(SETTING_MODE.CREATE);
        setThought(STEP_OF_ANALYSIS.CREATING_ARTIST);
        const artistInfo = await saveSetting(
          profileWithComments.nickname,
          profileWithComments.avatar,
          SETTING_MODE.CREATE,
        );
        setSelectedArtist({ ...artistInfo });
        setArtistActive(true);
      }
      setThought(STEP_OF_ANALYSIS.FINISHED);
    } catch (error) {
      console.error("Analysis failed:", error);
    }
  };

  return {
    username,
    setUsername,
    handleAnalyze,
    isLoading,
    setIsLoading,
    thought,
    result,
    setResult,
    progress,
    setProgress,
    segments,
  };
};

export default useTikTokAnalysis;
