import { ArtistToolResponse } from "@/types/Tool";

const isActiveToolCallTrigger = (toolName: string, status: string) => {
  return (
    toolName === "getScoreInfo" ||
    (toolName === "getArtistAnalysis" &&
      status === ArtistToolResponse.TIKTOK_TRENDS) ||
    (toolName === "getVideosInfo" &&
      status === ArtistToolResponse.VIDEO_COMMENTS)
  );
};

export default isActiveToolCallTrigger;
