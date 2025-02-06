import { Message } from "ai/react";
import { v4 as uuidV4 } from "uuid";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import { usePromptsProvider } from "@/providers/PromptsProvider";
import createRoom from "@/lib/createRoom";
import useConversations from "./useConversations";

const useChat = () => {
  const { login, address, userData } = useUserProvider();
  const { push } = useRouter();
  const { chatId, } =
    useConversationsProvider();
  const searchParams = useSearchParams();
  const isReportChat = searchParams.get("is_funnel_report");
  const { input, appendAiChat, handleAiChatSubmit } = useMessagesProvider();
  const { setCurrentQuestion } = usePromptsProvider();
  const { addConversation } = useConversations()

  const createNewRoom = async (content: string) => {
    if (chatId) return;
    const room = await createRoom(userData.account_id, content)
    addConversation(room);
    push(`/${room.id}`);
  };

  const isPrepared = () => {
    if (!address) {
      login();
      return false;
    }
    return true;
  };

  const append = async (message: Message) => {
    if (!isPrepared()) return;
    setCurrentQuestion(message);
    appendAiChat(message);
    createNewRoom(message.content);
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
    createNewRoom(input);
  };

  return {
    handleSubmit,
    append,
    isReportChat,
  };
};

export default useChat;
