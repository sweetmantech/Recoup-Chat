import getFanSegments from "@/lib/getFanSegments";
import getTikTokProfile from "@/lib/getTiktokProfile";
import getVideoComments from "@/lib/getVideoComments";
import { THOUGHT_OF_ANALYSIS } from "@/types/Thought";
import { useState } from "react";

const useTikTokAnalysis = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thought, setThought] = useState(THOUGHT_OF_ANALYSIS.PROFILE);
  const [result, setResult] = useState<any>(null);
  const [progress, setProgress] = useState(0);

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
      setIsLoading(false);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
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
  };
};

export default useTikTokAnalysis;
