import { useEffect, useRef, useState } from "react";
import { useChat as useAiChat } from "ai/react";
import { useCsrfToken } from "./useCsrfToken";
import { useParams } from "next/navigation";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useInitialMessagesProvider } from "@/providers/InititalMessagesProvider";
import useChatContext from "./useChatContext";
import createMemory from "@/lib/createMemory";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { useQueryClient } from "@tanstack/react-query";

const useMessages = () => {
  const csrfToken = useCsrfToken();
  const { initialMessages } = useInitialMessagesProvider();
  const [toolCall, setToolCall] = useState<any>(null);
  const { selectedArtist } = useArtistProvider();
  const { chatContext } = useChatContext();
  const { chatId } = useConversationsProvider();
  const queryClient = useQueryClient();

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
      console.log("ZIAD", chatId)
      // createMemory(message, chatId.current, selectedArtist?.account_id || "");

      void queryClient.invalidateQueries({
        queryKey: ["credits", chatId],
      });
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
