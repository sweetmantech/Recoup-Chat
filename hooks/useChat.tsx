import { Message } from "ai/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import createRoom from "@/lib/createRoom";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";

const useChat = () => {
  const { login, address, userData } = useUserProvider();
  const { push } = useRouter();
  const { chat_id: chatId } = useParams();
  const searchParams = useSearchParams();
  const isReportChat = searchParams.get("is_funnel_report");
  const { input, appendAiChat, handleAiChatSubmit } = useMessagesProvider();
  const { addConversation } = useConversationsProvider();

  const createNewRoom = async (content: string) => {
    if (chatId) return;
    const room = await createRoom(userData.id, content);
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
    appendAiChat(message);
    createNewRoom(message.content);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
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
