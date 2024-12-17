import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useInitialMessagesProvider } from "@/providers/InititalMessagesProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import { useTikTokReportProvider } from "@/providers/TikTokReportProvider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const useInitialChat = () => {
  const { tiktokRawReportContent } = useTikTokReportProvider();
  const pathname = usePathname();
  const isNewChat = pathname === "/";
  const { setInitialMessages, initialMessages } = useInitialMessagesProvider();
  const { setMessages, messagesRef, messages, pending, getPrompts } =
    useMessagesProvider();
  const { conversationRef } = useConversationsProvider();

  const clearMessagesCache = () => {
    setInitialMessages([]);
    setMessages([]);
    messagesRef.current = [];
  };
  useEffect(() => {
    if (messages.length) {
      messagesRef.current = messages;
      if (!pending) getPrompts(messages[messages.length - 1]);
    }
  }, [messages, tiktokRawReportContent, pending]);
  useEffect(() => {
    if (initialMessages.length) setMessages(initialMessages);
  }, [initialMessages]);
  useEffect(() => {
    if (isNewChat) {
      conversationRef.current = "";
      setMessages([]);
    }
  }, [isNewChat]);

  return {
    clearMessagesCache,
  };
};

export default useInitialChat;
