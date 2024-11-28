import { ArtistToolResponse, Tools } from "@/types/Tool";

const isActiveToolCallTrigger = (toolName: string, status: string) => {
  return (
    toolName === Tools.getScoreInfo ||
    (toolName === Tools.getArtistAnalysis &&
      status === ArtistToolResponse.TIKTOK_TRENDS) ||
    (toolName === Tools.getVideosInfo &&
      status === ArtistToolResponse.VIDEO_COMMENTS) ||
    (toolName === Tools.getSegmentsReport &&
      status === ArtistToolResponse.TIKTOK_SEGMENT_REPORT)
  );
};

export default isActiveToolCallTrigger;
