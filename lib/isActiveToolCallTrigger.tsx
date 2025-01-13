import { ArtistToolResponse, Tools } from "@/types/Tool";

const isActiveToolCallTrigger = (toolName: string, status: string) => {
  return (
    toolName === Tools.getScoreInfo ||
    (toolName === Tools.getInstrumentalStyleSuggestions &&
      status === ArtistToolResponse.INSTRUMENTAL_STYLE_SUGGESTION) ||
    (toolName === Tools.getArtistAnalysis &&
      status === ArtistToolResponse.TIKTOK_TRENDS) ||
    (toolName === Tools.getVideosInfo &&
      status === ArtistToolResponse.VIDEO_COMMENTS) ||
    (toolName === Tools.getPitchReport &&
      status === ArtistToolResponse.FUNNEL_PITCH_REPORT) ||
    (toolName === Tools.getSegmentsReport &&
      status === ArtistToolResponse.FUNNEL_SEGMENT_REPORT)
  );
};

export default isActiveToolCallTrigger;
