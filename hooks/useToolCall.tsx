import { Message } from "ai";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useToolMessages from "./useToolMessages";
import { useParams } from "next/navigation";
import getToolCallMessage from "@/lib/getToolCallMessage";
import useToolCallParams from "./useToolCallParams";
import isActiveToolCallTrigger from "@/lib/isActiveToolCallTrigger";
import { Tools } from "@/types/Tool";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";

const useToolCall = (message: Message) => {
  const { finalCallback } = useMessagesProvider();
  const { conversation: conversationId } = useParams();
  const [isCalled, setIsCalled] = useState(false);
  const { toolName, context, question, specificReportParams, trackReport } =
    useToolCallParams(message);
  const { setBeginCall, answer, loading, messages } = useToolMessages(
    question,
    toolName,
  );
  const funnelReport = useFunnelReportProvider();

  useEffect(() => {
    const init = async () => {
      const newToolCallMessage: any = getToolCallMessage(toolName, context);
      if (newToolCallMessage) {
        finalCallback(
          newToolCallMessage,
          { id: uuidV4(), content: question, role: "user" },
          conversationId as string,
        );
        return;
      }
      const isAssistant = message.role === "assistant";
      if (!isAssistant || isCalled) return;
      setIsCalled(true);
      if (isActiveToolCallTrigger(toolName, context?.status)) {
        if (
          toolName === Tools.getSegmentsReport &&
          !funnelReport.isLoadingReport &&
          conversationId
        ) {
          funnelReport.setIsLoadingReport(true);
          const { rawContent, nextSteps } = await funnelReport.setFunnelReport(
            context?.agentId,
            context?.segmentName,
          );
          await trackReport(
            conversationId as string,
            rawContent,
            nextSteps,
            false,
          );
          funnelReport.setIsLoadingReport(false);
        }
        if (toolName === Tools.getPitchReport && conversationId) {
          const { rawContent, nextSteps } =
            await specificReportParams.setSpecificReport(context?.pitch_name);
          await trackReport(
            conversationId as string,
            rawContent,
            nextSteps,
            true,
          );
        }
        setBeginCall(true);
      }
    };
    if (!context || !question) return;
    init();
  }, [question, context, toolName, conversationId]);

  return {
    loading,
    answer,
    toolName,
    question,
    context,
    messages,
    specificReportParams,
  };
};

export default useToolCall;
