import { useInitialMessagesProvider } from "@/providers/InititalMessagesProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import { usePromptsProvider } from "@/providers/PromptsProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const useInitialChat = () => {
  const { funnelRawReportContent, isLoadingReport } = useFunnelReportProvider();
  const { setInitialMessages } = useInitialMessagesProvider();
  const { setMessages, messagesRef, messages, pending } = useMessagesProvider();
  const { getPrompts } = usePromptsProvider();
  const { chat_id: chatId, agent_id: agentId } = useParams();

  const clearMessagesCache = () => {
    setInitialMessages([]);
    setMessages([]);
    messagesRef.current = [];
  };
  useEffect(() => {
    if (messages.length && (chatId || agentId)) {
      messagesRef.current = messages;
      if (!pending && !isLoadingReport)
        getPrompts(messages[messages.length - 1]?.content);
    }
  }, [messages, funnelRawReportContent, pending, isLoadingReport, agentId]);

  return {
    clearMessagesCache,
  };
};

export default useInitialChat;
