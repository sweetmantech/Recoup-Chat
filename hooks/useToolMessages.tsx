import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { Message, useChat } from "ai/react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { Tools } from "@/types/Tool";
import { useMessagesProvider } from "@/providers/MessagesProvider";

const useToolMessages = (question?: string, toolName?: any) => {
  const { finalCallback } = useMessagesProvider();
  const { chat_id: chatId } = useParams();
  const { funnelRawReportContent } = useFunnelReportProvider();

  const toolCallContext = useMemo(() => {
    if (funnelRawReportContent) return funnelRawReportContent;
    return null;
  }, [funnelRawReportContent]);

  const {
    messages,
    append,
    isLoading: loading,
  } = useChat({
    api: "/api/tool_call",
    body: {
      question,
      context: toolCallContext,
      toolName,
    },
    onError: console.error,
    onFinish: async (message) => {
      if (
        toolName === Tools.getSegmentsReport ||
        toolName == Tools.getPitchReport
      )
        return;
      await finalCallback(
        message,
        {
          id: uuidV4(),
          content: question as string,
          role: "user",
        },
        chatId as string,
      );
    },
  });

  const answer = messages.filter(
    (message: Message) => message.role === "assistant",
  )?.[0]?.content;

  return {
    messages,
    append,
    loading: loading,
    answer,
  };
};

export default useToolMessages;
