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
  const { question, toolName, loading, message } = useToolCallProvider();
  const { finalCallback } = useMessagesProvider();
  const { clearQuery } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const { artists } = useArtistProvider();
  const {
    funnelRawReportContent,
    funnelNextSteps,
    setFunnelSummary,
    setFunnelNextSteps,
    setFunnelRawReportContent,
    setFunnelReportContent,
    setBannerArtistName,
    setBannerImage,
  } = useFunnelReportProvider();
  const [tiktokTracking, setTikTokTracking] = useState(true);

  useEffect(() => {
    const track = async () => {
      setFunnelSummary(message.content);
      const stackUniqueId = uuidV4();
      const response = await saveTikTokReport({
        summary: message.content,
        next_steps: funnelNextSteps,
        report: funnelRawReportContent,
        stack_unique_id: stackUniqueId,
      });
      await finalCallback(
        {
          id: stackUniqueId,
          content: "Funnel Report",
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
      funnelRawReportContent &&
      funnelNextSteps &&
      (toolName === Tools.getSegmentsReport ||
        toolName === Tools.getPitchReport)
    )
      track();
  }, [loading, funnelNextSteps, funnelRawReportContent, toolName]);

  useEffect(() => {
    const init = async () => {
      setTikTokTracking(true);
      const response = await getTikTokReport(message.metadata.referenceId);
      const artist = await getArtist(message.metadata?.artistId);
      setBannerImage(artist?.image || "");
      setBannerArtistName(artist?.name || "");
      setFunnelSummary(response.summary);
      setFunnelRawReportContent(response.report);
      setFunnelReportContent(getPdfReport(response.report));
      setFunnelNextSteps(response.next_steps);
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
