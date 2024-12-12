import saveTikTokReport from "@/lib/saveTikTokReport";
import { useChatProvider } from "@/providers/ChatProvider";
import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import { Tools } from "@/types/Tool";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

const useTikTokToolMessagesTrack = () => {
  const { question, toolName, loading, messages } = useToolCallProvider();
  const { finalCallback } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const { tiktokRawReportContent, tiktokNextSteps, setTikTokSummary } =
    useTikTokReportProvider();

  useEffect(() => {
    const track = async () => {
      setTikTokSummary(messages[1].content);
      const stackUniqueId = uuidV4();
      await saveTikTokReport({
        summary: messages[1].content,
        next_steps: tiktokNextSteps,
        report: tiktokRawReportContent,
        stack_unique_id: stackUniqueId,
      });
      await finalCallback(
        {
          id: stackUniqueId,
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
  }, [loading, tiktokNextSteps, tiktokRawReportContent, toolName]);
};

export default useTikTokToolMessagesTrack;
