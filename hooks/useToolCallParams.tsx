import { Message } from "ai";
import useSpecificReport from "./useSpecificReport";
import { v4 as uuidV4 } from "uuid";
import saveTikTokReport from "@/lib/saveTikTokReport";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import { useParams } from "next/navigation";
import { useChatProvider } from "@/providers/ChatProvider";

const useToolCallParams = (message: Message) => {
  const toolInvocations = [...(message.toolInvocations || [])];
  const toolInvocationResult = toolInvocations?.filter(
    (toolInvocation) => toolInvocation.state === "result",
  )?.[0];
  const question = toolInvocationResult?.result?.question || "";
  const context = toolInvocationResult?.result?.context || "";
  const toolName = toolInvocationResult?.toolName;
  const specificReportParams = useSpecificReport();
  const { finalCallback } = useMessagesProvider();
  const { conversation: conversationId } = useParams();
  const { clearQuery } = useChatProvider();

  const trackReport = async (
    report: string,
    nextSteps: string,
    isSpecific: boolean = false,
  ) => {
    const stackUniqueId = uuidV4();
    const response = await saveTikTokReport({
      summary: message.content,
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
        content: question as string,
        role: "user",
      },
      conversationId as string,
      response?.id,
    );
    clearQuery();
  };

  return {
    question,
    context,
    toolName,
    specificReportParams,
    trackReport,
  };
};

export default useToolCallParams;
