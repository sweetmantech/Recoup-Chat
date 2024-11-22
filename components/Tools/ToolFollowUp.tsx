import { Message as AIMessage } from "ai";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import Answer from "./Answer";
import getStatusMessage from "@/lib/getStatusMessage";

const ToolFollowUp = ({ message }: { message: AIMessage }) => {
  const {
    loading,
    answer,
    toolName,
    context,
    isSearchingTrends,
    isGettingVideos,
  } = useToolCallProvider();
  const content = message.content || answer;

  console.log("ZIAD", content)
  
  useEffect(() => {
    scrollTo();
    const timeoutId = setTimeout(scrollTo, 1000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, context]);

  return (
    <div>
      {(toolName === "getScoreInfo" ||
        toolName === "getArtistAnalysis" ||
        toolName === "getVideosInfo") && (
        <>
          {loading && !content ? (
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
