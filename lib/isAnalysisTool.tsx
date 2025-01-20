import { Tools } from "@/types/Tool";

const isAnalysisTool = (toolName: string) => {
  return (
    toolName === Tools.getArtistAnalysis ||
    toolName === Tools.getSegmentsReport ||
    toolName === Tools.getPitchReport ||
    toolName === Tools.getVideosInfo ||
    toolName === Tools.getInstrumentalStyleSuggestions
  );
};

export default isAnalysisTool;
