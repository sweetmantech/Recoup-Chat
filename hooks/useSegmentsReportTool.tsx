import saveFunnelReport from "@/lib/saveFunnelReport";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import { Tools } from "@/types/Tool";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

const useSegmentReportTool = (toolName: string | null, toolArgs: any) => {
  const { chat_id: chatId } = useParams();
  const funnelReport = useFunnelReportProvider();
  const { finalCallback } = useMessagesProvider();

  const saveReport = async (
    conversationId: string,
    report: string,
    nextSteps: string,
    isSpecific: boolean = false,
  ) => {
    const stackUniqueId = uuidV4();
    const response = await saveFunnelReport({
      next_steps: nextSteps,
      report,
      stack_unique_id: stackUniqueId,
    });
    await finalCallback(
      {
        id: stackUniqueId,
        content: isSpecific ? "Specific Report" : "Funnel Report",
        role: "assistant",
      },
      {
        id: uuidV4(),
        content: `Please create a fan segment report for ${toolArgs?.agentId} using this segment ${toolArgs?.segmentName}.`,
        role: "user",
      },
      conversationId as string,
      response?.id,
    );
  };

  useEffect(() => {
    const init = async () => {
      if (funnelReport.isLoadingReport) funnelReport.setIsLoadingReport(true);
      const { rawContent, nextSteps } = await funnelReport.setFunnelReport(
        toolArgs?.agentId,
        toolArgs?.segmentName,
      );
      await saveReport(chatId as string, rawContent, nextSteps, false);
      funnelReport.setIsLoadingReport(false);
    };
    if (toolName === Tools.getSegmentsReport && toolArgs && chatId) init();
  }, [toolArgs, toolName, chatId]);
};

export default useSegmentReportTool;
