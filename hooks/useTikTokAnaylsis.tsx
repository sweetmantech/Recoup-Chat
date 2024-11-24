import getTikTokProfile from "@/lib/getTiktokProfile";
import getVideoComments from "@/lib/getVideoComments";
import { useState } from "react";

const useTikTokAnalysis = () => {
    const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!username || isLoading) return;

    try {
      setIsLoading(true);

      const profile = await getTikTokProfile(username);
      const videoComments = await getVideoComments(
        encodeURIComponent(JSON.stringify(profile?.videos)),
      );
      const profileWithComments = {
        ...profile,
        videos: videoComments.videos,
        total_video_comments_count:
          videoComments.total_video_comments_count,
      }
      setIsLoading(false)
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    handleAnalyze
  }
}

export default useTikTokAnalysis