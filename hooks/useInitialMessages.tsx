import { Address } from "viem";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const init = async () => {
      const initialMessages = await fetchInitialMessages(address);
      if (initialMessages) setInitialMessages(initialMessages);
    };
    if (!address || !conversationId) {
      setInitialMessages([]);
      return;
    }
    init();
  }, [address, conversationId]);

  const fetchInitialMessages = async (walletAddress: Address) => {
    try {
      const convId = conversationId as string;
      if (!convId) return;
      const { messages, titleMessage } = await getInitialMessages(
        walletAddress,
        convId,
      );
      setTitleMessage(titleMessage);
      const sortedMessages = sortMessages(messages);
      const flattenedMessages = flattenMessagePairs(sortedMessages);
      return flattenedMessages;
    } catch (error) {
      console.error("Error fetching initial messages:", error);
      return;
    }
  };

  return {
    initialMessages,
    fetchInitialMessages,
    setInitialMessages,
    titleMessage,
  };
};

export default useInitialMessages;
