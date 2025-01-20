import { useInitialMessagesProvider } from "@/providers/InititalMessagesProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import { usePromptsProvider } from "@/providers/PromptsProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useEffect } from "react";

const useInitialChat = () => {
  const { funnelRawReportContent } = useFunnelReportProvider();
  const { setInitialMessages, initialMessages } = useInitialMessagesProvider();
  const { setMessages, messagesRef, messages, pending } = useMessagesProvider();
  const { getPrompts } = usePromptsProvider();

  const clearMessagesCache = () => {
    setInitialMessages([]);
    setMessages([]);
    messagesRef.current = [];
  };
  useEffect(() => {
    if (messages.length) {
      messagesRef.current = messages;
      if (!pending) getPrompts(messages[messages.length - 1]?.content);
    }
  }, [messages, funnelRawReportContent, pending]);

  useEffect(() => {
    if (initialMessages.length) setMessages(initialMessages);
  }, [initialMessages]);

  return {
    clearMessagesCache,
  };
};

export default useInitialChat;
