import getPdfReport from "@/lib/getPdfReport";
import saveTikTokReport from "@/lib/saveTikTokReport";
import getTikTokReport from "@/lib/tiktok/getTikTokReport";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useChatProvider } from "@/providers/ChatProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import { Tools } from "@/types/Tool";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import getArtist from "@/lib/getArtist";

const useReportToolMessagesTrack = () => {
  const {
    question,
    toolName,
    loading,
    messages,
    message,
    specificReportParams,
  } = useToolCallProvider();
  const { finalCallback } = useMessagesProvider();
  const { clearQuery } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const { artists } = useArtistProvider();
  const funnelReport = useFunnelReportProvider();
  const [tiktokTracking, setTikTokTracking] = useState(true);
  const isReportTool =
    toolName === Tools.getSegmentsReport || toolName === Tools.getPitchReport;
  const messageIndex = messages.findIndex((ele) => ele.id === message.id);

  useEffect(() => {
    const track = async () => {
      funnelReport.setFunnelSummary(message.content);
      const stackUniqueId = uuidV4();
      const nextSteps =
        messageIndex === 1
          ? funnelReport.funnelNextSteps
          : specificReportParams.nextSteps;
      const report =
        messageIndex === 1
          ? funnelReport.funnelRawReportContent
          : specificReportParams.rawReportContent;
      const response = await saveTikTokReport({
        summary: message.content,
        next_steps: nextSteps,
        report,
        stack_unique_id: stackUniqueId,
      });
      await finalCallback(
        {
          id: stackUniqueId,
          content: messageIndex === 1 ? "Funnel Report" : "Specific Report",
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
    if (!loading && isReportTool) track();
  }, [loading, funnelReport, specificReportParams, isReportTool]);

  useEffect(() => {
    const init = async () => {
      setTikTokTracking(true);
      const response = await getTikTokReport(message.metadata.referenceId);
      const artist = await getArtist(message.metadata?.artistId);
      if (messageIndex === 1) {
        funnelReport.setBannerImage(artist?.image || "");
        funnelReport.setBannerArtistName(artist?.name || "");
        funnelReport.setFunnelSummary(response.summary);
        funnelReport.setFunnelRawReportContent(response.report);
        funnelReport.setFunnelReportContent(getPdfReport(response.report));
        funnelReport.setFunnelNextSteps(response.next_steps);
      } else {
        specificReportParams.setRawReportContent(response.report);
        specificReportParams.setReportContent(getPdfReport(response.report));
        specificReportParams.setNextSteps(response.next_steps);
      }
      setTikTokTracking(false);
    };
    if (!message?.metadata?.referenceId) {
      setTikTokTracking(false);
      return;
    }
    init();
  }, [message, artists]);

  return {
    tiktokTracking,
  };
};

export default useReportToolMessagesTrack;
