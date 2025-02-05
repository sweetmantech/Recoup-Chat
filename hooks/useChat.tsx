import { Message } from "ai/react";
import { v4 as uuidV4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import { usePromptsProvider } from "@/providers/PromptsProvider";

const useChat = () => {
  const { login, address } = useUserProvider();
  const { push } = useRouter();
  const { chatId, trackGeneralChat, conversationRef } =
    useConversationsProvider();
  const searchParams = useSearchParams();
  const isReportChat = searchParams.get("is_funnel_report");
  const { input, appendAiChat, handleAiChatSubmit } = useMessagesProvider();
  const { setCurrentQuestion } = usePromptsProvider();

  const goToNewConversation = async (
    content: string,
    is_funnel_report: boolean = false,
  ) => {
    if (chatId) return;
    const newId = uuidV4();
    conversationRef.current = newId;
    trackGeneralChat(content, newId, is_funnel_report);
    const urlParmas = new URLSearchParams();
    if (is_funnel_report) urlParmas.set("is_funnel_report", "true");
    push(`/${newId}?${urlParmas}`);
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
    is_funnel_report: boolean = false,
  ) => {
    if (!isPrepared()) return;
    setCurrentQuestion(message);
    appendAiChat(message);
    goToNewConversation(message.content, is_funnel_report);
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
    isReportChat,
  };
};

export default useChat;
