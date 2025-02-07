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
  const { chat_id: chatId } = useParams();
  const { chatContext } = useChatContext();

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
      console.log("ZIAD HERE", chatId);
      createMemory(message, chatId as string, selectedArtist?.account_id || "");
    },
  });

  const messagesRef = useRef(messages);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const finalCallback = async (
    message: Message,
    lastQuestion?: Message,
    newChatId?: string,
    referenceId?: string,
  ) => {
    const uniqueChatId = newChatId || (chatId as string);
    const question = lastQuestion;
    if (!message.content || !question) return;
    await trackNewMessage(
      address as Address,
      question,
      selectedArtist?.account_id || "",
      uniqueChatId,
    );

    await trackNewMessage(
      address as Address,
      {
        ...message,
        content: formattedContent(message.content),
        questionId: question.id,
      },
      selectedArtist?.account_id || "",
      uniqueChatId,
      referenceId,
    );
    fetchInitialMessages();
  };

  return {
    reloadAiChat,
    appendAiChat,
    handleAiChatSubmit,
    handleInputChange,
    input,
    setMessages,
    messages,
    messagesRef,
    pending,
    toolCall,
    finalCallback,
    chatContext,
  };
};

export default useMessages;
