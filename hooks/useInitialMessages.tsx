import { useCallback, useEffect, useState } from "react";
import getInitialMessages from "@/lib/stack/getInitialMessages";
import { sortMessages, flattenMessagePairs } from "@/lib/sortMessages";
import { StackMessage } from "@/types/Stack";
import { useParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";

const useInitialMessages = () => {
  const [initialMessages, setInitialMessages] = useState<StackMessage[]>([]);
  const { address } = useUserProvider();
  const { conversation: conversationId } = useParams();
  const [titleMessage, setTitleMessage] = useState<any>(null);

  const fetchInitialMessages = useCallback(async () => {
    try {
      setInitialMessages([]);
      if (!address) return;
      if (!conversationId) return;
      const { messages, titleMessage } = await getInitialMessages(
        address,
        conversationId as string,
      );
      setTitleMessage(titleMessage);
      const sortedMessages = sortMessages(messages);
      const flattenedMessages = flattenMessagePairs(sortedMessages);
      setInitialMessages(flattenedMessages);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
      return;
    }
  }, [address, conversationId]);

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
