import { Message as AIMessage } from "ai";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import Answer from "./Answer";
import getStatusMessage from "@/lib/getStatusMessage";
import { Tools } from "@/types/Tool";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";

const ToolFollowUp = ({ message }: { message: AIMessage }) => {
  const { loading, answer, toolName, context, specificReportParams } =
    useToolCallProvider();
  const { isSearchingTrends, isGettingVideos, isGettingAnalysis } =
    useFunnelReportProvider();
  const content = message.content || answer;
  const isThinking =
    loading ||
    isSearchingTrends ||
    isGettingVideos ||
    isGettingAnalysis ||
    specificReportParams.isGeneratingReport;

  useEffect(() => {
    scrollTo();
    const timeoutId = setTimeout(scrollTo, 1000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, context]);

  return (
    <div>
      {(toolName === Tools.getArtistAnalysis ||
        toolName === Tools.getSegmentsReport ||
        toolName === Tools.getPitchReport ||
        toolName === Tools.getVideosInfo ||
        toolName === Tools.getInstrumentalStyleSuggestions) && (
        <>
          {isThinking && !content ? (
            <div className="flex gap-2 items-center">
              <p className="text-sm">
                {getStatusMessage(isSearchingTrends, isGettingVideos, context)}
              </p>
              <LoaderCircle className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <Answer content={content} role={message.role} />
          )}
        </>
      )}
      {!toolName && <Answer content={content} role={message.role} />}
    </div>
  );
};

export default ToolFollowUp;
