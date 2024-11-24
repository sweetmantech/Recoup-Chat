import getFanSegments from "@/lib/getFanSegments";
import getTikTokProfile from "@/lib/getTiktokProfile";
import getVideoComments from "@/lib/getVideoComments";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { SETTING_MODE } from "@/types/Setting";
import { THOUGHT_OF_ANALYSIS } from "@/types/Thought";
import { useState } from "react";

const useTikTokAnalysis = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thought, setThought] = useState(THOUGHT_OF_ANALYSIS.PROFILE);
  const [result, setResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [segments, setSegments] = useState<Array<any>>([]);
  const {
    setSettingMode,
    setImage,
    setName,
    saveSetting,
    setSelectedArtist,
    setArtistActive,
  } = useArtistProvider();
  const { email } = useUserProvider();

  const handleAnalyze = async () => {
    if (!username || isLoading) return;

    try {
      setIsLoading(true);
      setThought(THOUGHT_OF_ANALYSIS.PROFILE);
      const profile = await getTikTokProfile(username);
      setThought(THOUGHT_OF_ANALYSIS.VIDEO_COMMENTS);
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
      setThought(THOUGHT_OF_ANALYSIS.SEGMENTS);
      const segments = await getFanSegments(profileWithComments);
      setSegments(segments);
      if (email) {
        setSettingMode(SETTING_MODE.CREATE);
        setThought(THOUGHT_OF_ANALYSIS.CREATING_ARTIST);
        setName(profileWithComments.nickname);
        setImage(encodeURIComponent(profileWithComments.avatar));
        const artistInfo = await saveSetting();
        setSelectedArtist(artistInfo);
        setArtistActive(true);
      }
      setThought(THOUGHT_OF_ANALYSIS.FINISHED);
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
