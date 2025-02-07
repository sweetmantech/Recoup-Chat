import { Message } from "ai/react";
import { useParams, useRouter } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import createRoom from "@/lib/createRoom";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { usePromptsProvider } from "@/providers/PromptsProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useEffect, useState } from "react";
import createMemory from "@/lib/createMemory";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { v4 as uuidV4 } from "uuid";

const useChat = () => {
  const { userData, isPrepared } = useUserProvider();
  const { push } = useRouter();
  const { chat_id: chatId, agent_id: agentId } = useParams();
  const { input, appendAiChat } = useMessagesProvider();
  const { addConversation } = useConversationsProvider();
  const { funnelRawReportContent, isLoadingReport } = useFunnelReportProvider();
  const { messages, pending } = useMessagesProvider();
  const { getPrompts } = usePromptsProvider();
  const { selectedArtist } = useArtistProvider();
  const [triggerAppend, setTriggerAppend] = useState<any>(null);

  const createNewRoom = async (content: string) => {
    if (chatId) return;
    const room = await createRoom(userData.id, content);
    addConversation(room);
    createMemory(
      {
        role: "user",
        content,
      },
      room.id,
      selectedArtist?.account_id || "",
    );
    push(`/${room.id}`);
  };

  const append = async (message: Message) => {
    if (!isPrepared()) return;
    createNewRoom(message.content);
    setTriggerAppend(message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPrepared()) return;
    append({
      id: uuidV4(),
      content: input,
      role: "user",
    });
  };

  useEffect(() => {
    if (triggerAppend && chatId) {
      appendAiChat(triggerAppend);
      setTriggerAppend(null);
      return;
    }
  }, [triggerAppend, chatId]);

  useEffect(() => {
    if (messages.length && (chatId || agentId)) {
      if (!pending && !isLoadingReport)
        getPrompts(messages[messages.length - 1]?.content);
    }
  }, [messages, funnelRawReportContent, pending, isLoadingReport, agentId]);

  return {
    handleSubmit,
    append,
  };
};

export default useChat;
