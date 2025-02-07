import { useEffect, useMemo, useRef, useState } from "react";
import { Message, useChat as useAiChat } from "ai/react";
import { useCsrfToken } from "./useCsrfToken";
import { useParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useInitialMessagesProvider } from "@/providers/InititalMessagesProvider";
import trackNewMessage from "@/lib/stack/trackNewMessage";
import { Address } from "viem";
import formattedContent from "@/lib/formattedContent";
import useChatContext from "./useChatContext";
import createMemory from "@/lib/createMemory";

const useMessages = () => {
  const csrfToken = useCsrfToken();
  const { initialMessages, fetchInitialMessages } =
    useInitialMessagesProvider();
  const { address } = useUserProvider();
  const [toolCall, setToolCall] = useState<any>(null);
  const { selectedArtist } = useArtistProvider();
  const { chat_id } = useParams();
  const { chatContext } = useChatContext();
  const chatId = useRef(chat_id as string);
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
      roomId: chatId.current,
    },
    initialMessages,
    onToolCall: ({ toolCall }) => {
      setToolCall(toolCall as any);
    },
    onFinish: (message) => {
      if (!chatId.current) return;
      createMemory(message, chatId.current, selectedArtist?.account_id || "");
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
