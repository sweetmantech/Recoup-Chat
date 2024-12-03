import getFullReport from "@/lib/getFullReport";
import { useChatProvider } from "@/providers/ChatProvider";
import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { Message, useChat } from "ai/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const useToolChat = (question?: string, toolName?: any) => {
  const { finalCallback, clearQuery } = useChatProvider();
  const { conversation: conversationId } = useParams();
  const {
    tiktokTrends,
    tiktokVideos,
    tiktokAnalysis,
    initReport,
    isSearchingTrends,
    setTiktokReportContent,
  } = useTikTokReportProvider();

  const toolCallContext = {
    ...(tiktokTrends !== null && { ...tiktokTrends }),
    ...tiktokVideos,
    ...(tiktokAnalysis !== null && { ...tiktokAnalysis }),
  };

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
      const reportContent = await getFullReport(tiktokAnalysis);
      setTiktokReportContent(reportContent);
      initReport();
      setBeginCall(false);
    };
    if (!beginCall || !question) return;
    init();
  }, [beginCall, question]);

  return {
    messages,
    append,
    loading: loading || isSearchingTrends,
    answer,
    setBeginCall,
  };
};

export default useToolChat;
