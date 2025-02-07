import { useEffect, useState } from "react";
import { useChat as useAiChat } from "ai/react";
import { useCsrfToken } from "./useCsrfToken";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useInitialMessagesProvider } from "@/providers/InititalMessagesProvider";
import useChatContext from "./useChatContext";
import { useParams } from "next/navigation";
import createMemory from "@/lib/createMemory";

const useMessages = () => {
  const csrfToken = useCsrfToken();
  const { initialMessages } = useInitialMessagesProvider();
  const [toolCall, setToolCall] = useState<any>(null);
  const { selectedArtist } = useArtistProvider();
  const { chatContext } = useChatContext();
  const { chat_id: chatId } = useParams();

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

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

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
  };
};

export default useMessages;
