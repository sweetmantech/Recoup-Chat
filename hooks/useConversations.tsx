import { Address } from "viem";
import { useEffect, useRef, useState } from "react";
import { Conversation } from "@/types/Stack";
import getConversations from "@/lib/stack/getConversations";
import { useParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import trackChatTitle from "@/lib/stack/trackChatTitle";

let timer: any = null;
let streamedIndex = 1;

const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { address } = useUserProvider();
  const { conversation } = useParams();
  const conversationRef = useRef(conversation as string);
  const [streamingTitle, setStreamingTitle] = useState("");

  useEffect(() => {
    if (address) {
      fetchConversations(address);
    }
  }, [address]);

  const trackNewTitle = async (title: any, conversationId: string) => {
    await trackChatTitle(address, title, conversationId);
    fetchConversations(address);
  };

  const fetchConversations = async (walletAddress: Address) => {
    try {
      const data = await getConversations(walletAddress);
      setConversations(data);
      const streamedEvent = data?.[0];
      if (!streamedEvent?.title) {
        setStreamingTitle(streamedEvent?.metadata?.content);
        return;
      }
      clearInterval(timer);
      streamedIndex = 1;
      setInterval(() => {
        if (streamedIndex === streamedEvent.title.length + 1) {
          clearInterval(timer);
          return;
        }
        setStreamingTitle(streamedEvent.title.slice(0, streamedIndex));
        streamedIndex++;
      }, 50);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
      return [];
    }
  };

  return {
    fetchConversations,
    conversations,
    conversationRef,
    conversationId: conversation,
    streamingTitle,
    trackNewTitle,
  };
};

export default useConversations;
