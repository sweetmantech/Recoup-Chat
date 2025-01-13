import { useChatProvider } from "@/providers/ChatProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { Message, useChat } from "ai/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { Tools } from "@/types/Tool";
import { useMessagesProvider } from "@/providers/MessagesProvider";

const useToolMessages = (question?: string, toolName?: any) => {
  const { clearQuery } = useChatProvider();
  const { finalCallback } = useMessagesProvider();
  const { conversation: conversationId } = useParams();
  const {
    funnelTrends,
    funnelVideos,
    initReport,
    isSearchingTrends,
    funnelRawReportContent,
    funnelAnalysis,
  } = useFunnelReportProvider();

  const toolCallContext = useMemo(() => {
    if (funnelTrends) return funnelTrends;
    if (funnelVideos) return funnelVideos;
    if (funnelAnalysis) return funnelAnalysis;
    if (funnelRawReportContent) return funnelRawReportContent;
    return null;
  }, [funnelTrends, funnelVideos, funnelRawReportContent]);

  const [beginCall, setBeginCall] = useState(false);
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
        conversationId as string,
      );
      await clearQuery();
    },
  });

  const answer = messages.filter(
    (message: Message) => message.role === "assistant",
  )?.[0]?.content;

  useEffect(() => {
    const init = async () => {
      await append({
        id: uuidV4(),
        content: question as string,
        role: "user",
      });
      initReport();
      setBeginCall(false);
    };
    if (!beginCall || !question || !toolCallContext) return;
    init();
  }, [beginCall, question, toolCallContext]);

  return {
    messages,
    append,
    loading: loading || isSearchingTrends,
    answer,
    setBeginCall,
  };
};

export default useToolMessages;
