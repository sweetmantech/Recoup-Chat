import { useEffect, useMemo, useRef, useState } from "react";
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

  const aiChatConfig = useMemo(
    () => ({
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
      onToolCall: ({ toolCall }: any) => {
        setToolCall(toolCall as any);
      },
      onFinish: (message: any) => {
        console.log("ZIAD", chatId);
        // createMemory(message, chatId.current, selectedArtist?.account_id || "");
      },
    }),
    [chatId, chatContext, selectedArtist],
  );

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: handleAiChatSubmit,
    append: appendAiChat,
    isLoading: pending,
    setMessages,
    reload: reloadAiChat,
  } = useAiChat(aiChatConfig);

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
