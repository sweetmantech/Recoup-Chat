import { useCallback, useEffect, useState } from "react";
import getInitialMessages from "@/lib/stack/getInitialMessages";
import { sortMessages, flattenMessagePairs } from "@/lib/sortMessages";
import { StackMessage } from "@/types/Stack";
import { useParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";

const useInitialMessages = () => {
  const [initialMessages, setInitialMessages] = useState<StackMessage[]>([]);
  const { address } = useUserProvider();
  const { chat_id: chatId } = useParams();
  const [titleMessage, setTitleMessage] = useState<any>(null);

  const fetchInitialMessages = useCallback(async () => {
    try {
      if (!address) return;
      if (!chatId) {
        setInitialMessages([]);
        return;
      }
      const { messages, titleMessage } = await getInitialMessages(
        address,
        chatId as string,
      );
      setTitleMessage(titleMessage);
      const sortedMessages = sortMessages(messages);
      const flattenedMessages = flattenMessagePairs(sortedMessages);
      setInitialMessages(flattenedMessages);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
      return;
    }
  }, [address, chatId]);

  useEffect(() => {
    fetchInitialMessages();
  }, [fetchInitialMessages]);

  return {
    initialMessages,
    fetchInitialMessages,
    setInitialMessages,
    titleMessage,
  };
};

export default useInitialMessages;
