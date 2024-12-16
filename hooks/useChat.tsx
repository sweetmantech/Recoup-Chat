import { Message } from "ai/react";
import { v4 as uuidV4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import { useInitialMessagesProvider } from "@/providers/InititalMessagesProvider";

const useChat = () => {
  const { login, address } = useUserProvider();
  const { push } = useRouter();
  const { conversationId, trackGeneralChat } = useConversationsProvider();
  const searchParams = useSearchParams();
  const reportEnabled = searchParams.get("report");
  const {
    conversationRef,
    input,
    appendAiChat,
    handleAiChatSubmit,
    setCurrentQuestion,
  } = useMessagesProvider();
  const { fetchInitialMessages } = useInitialMessagesProvider();

  const goToNewConversation = async (
    content: string,
    is_tiktok_report: boolean = false,
  ) => {
    if (conversationId) return;
    const newId = uuidV4();
    conversationRef.current = newId;
    trackGeneralChat(content, newId, is_tiktok_report);
    push(`/${newId}${is_tiktok_report ? "?report=enabled" : ""}`);
  };

  const clearQuery = async () => {
    await fetchInitialMessages(address);
  };

  const isPrepared = () => {
    if (!address) {
      login();
      return false;
    }
    return true;
  };

  const append = async (
    message: Message,
    is_tiktok_report: boolean = false,
  ) => {
    if (!isPrepared()) return;
    setCurrentQuestion(message);
    appendAiChat(message);
    goToNewConversation(message.content, is_tiktok_report);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
    setCurrentQuestion({
      content: input,
      role: "user",
      id: uuidV4(),
    });
    handleAiChatSubmit(e);
    goToNewConversation(input);
  };

  return {
    handleSubmit,
    append,
    clearQuery,
    reportEnabled,
  };
};

export default useChat;
