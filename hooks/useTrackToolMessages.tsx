import { useChatProvider } from "@/providers/ChatProvider";
import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import { Tools } from "@/types/Tool";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

const useTrackToolMessages = () => {
  const { question, toolName, loading, messages } = useToolCallProvider();
  const { finalCallback } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const { tiktokRawReportContent, tiktokNextSteps } = useTikTokReportProvider();

  useEffect(() => {
    const track = async () => {
      await finalCallback(
        {
          id: uuidV4(),
          content: "TikTok Report",
          role: "assistant",
        },
        {
          id: uuidV4(),
          content: question as string,
          role: "user",
        },
        conversationId as string,
      );
    };
    if (
      !loading &&
      tiktokRawReportContent &&
      tiktokNextSteps &&
      toolName === Tools.getSegmentsReport
    )
      track();
  }, [loading, messages, tiktokNextSteps, tiktokRawReportContent]);
};

export default useTrackToolMessages;
