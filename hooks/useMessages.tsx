import { useEffect, useState } from "react";
import { Message, useChat as useAiChat } from "ai/react";
import { useCsrfToken } from "./useCsrfToken";
import { useArtistProvider } from "@/providers/ArtistProvider";
import useChatContext from "./useChatContext";
import { useParams } from "next/navigation";
import createMemory from "@/lib/createMemory";
import { useUserProvider } from "@/providers/UserProvder";
import getInitialMessages from "@/lib/supabase/getInitialMessages";

const useMessages = () => {
  const csrfToken = useCsrfToken();
  const [toolCall, setToolCall] = useState<any>(null);
  const { selectedArtist } = useArtistProvider();
  const { chatContext } = useChatContext();
  const { chat_id: chatId } = useParams();
  const { userData } = useUserProvider();
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!userData?.id) return;
      if (!chatId) return;
      setIsLoading(true);
      const messages = await getInitialMessages(chatId as string);
      setInitialMessages(messages);
      setMessages(initialMessages);
      setIsLoading(false);
    };
    fetch();
  }, [chatId, userData]);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleAiChatSubmit,
    append: appendAiChat,
    isLoading: pending,
    setMessages,
    reload: reloadAiChat,
  } = useAiChat({
    api: `/api/chat`,
    headers: {
      "X-CSRF-Token": csrfToken,
    },
    body: {
      artistId: selectedArtist?.account_id,
      context: chatContext,
      roomId: chatId,
    },
    initialMessages,
    onToolCall: ({ toolCall }) => {
      setToolCall(toolCall as any);
    },
    onFinish: (message) => {
      createMemory(message, chatId as string, selectedArtist?.account_id || "");
    },
  });

  return {
    reloadAiChat,
    appendAiChat,
    handleAiChatSubmit,
    handleInputChange,
    input,
    setMessages,
    messages,
    pending,
    toolCall,
    chatContext,
    isLoading,
  };
};

export default useMessages;
