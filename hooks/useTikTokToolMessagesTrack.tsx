import getPdfReport from "@/lib/getPdfReport";
import saveTikTokReport from "@/lib/saveTikTokReport";
import getTikTokReport from "@/lib/tiktok/getTikTokReport";
import { useChatProvider } from "@/providers/ChatProvider";
import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import { Tools } from "@/types/Tool";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const useTikTokToolMessagesTrack = () => {
  const { question, toolName, loading, messages, message } =
    useToolCallProvider();
  const { finalCallback, clearQuery } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const {
    tiktokRawReportContent,
    tiktokNextSteps,
    setTikTokSummary,
    setTiktokNextSteps,
    setTiktokRawReportContent,
    setTiktokReportContent,
  } = useTikTokReportProvider();
  const [tiktokTracking, setTikTokTracking] = useState(true);

  useEffect(() => {
    const track = async () => {
      setTikTokSummary(messages[1].content);
      const stackUniqueId = uuidV4();
      const response = await saveTikTokReport({
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
        response?.id,
      );
      clearQuery();
    };
    if (
      !loading &&
      tiktokRawReportContent &&
      tiktokNextSteps &&
      toolName === Tools.getSegmentsReport
    )
      track();
  }, [loading, tiktokNextSteps, tiktokRawReportContent, toolName]);

  useEffect(() => {
    const init = async () => {
      setTikTokTracking(true);
      const response = await getTikTokReport(message.metadata.referenceId);
      setTikTokSummary(response.summary);
      setTiktokRawReportContent(response.report);
      setTiktokReportContent(getPdfReport(response.report));
      setTiktokNextSteps(response.next_steps);
      setTikTokTracking(false);
    };
    if (!message?.metadata?.referenceId) {
      setTikTokTracking(false);
      return;
    }
    init();
  }, [message]);

  return {
    tiktokTracking,
  };
};

export default useTikTokToolMessagesTrack;
