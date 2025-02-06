import { Address } from "viem";
import { useEffect, useState } from "react";
import { Conversation } from "@/types/Stack";
import getConversations from "@/lib/stack/getConversations";
import { useParams, useRouter } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import { useArtistProvider } from "@/providers/ArtistProvider";

const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { address } = useUserProvider();
  const { chat_id: chatId } = useParams();
  const [streamingTitle, setStreamingTitle] = useState("");
  const [streaming, setStreaming] = useState(false);
  const { selectedArtist } = useArtistProvider();
  const [allConverstaions, setAllConverstaions] = useState<Conversation[]>([]);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const addConversation = (newmetadata: any) => {
    setAllConverstaions([
      { metadata: newmetadata, timestamp: new Date().getTime() } as any,
      ...allConverstaions,
    ]);
  };

  useEffect(() => {
    if (address) {
      fetchConversations(address);
      return;
    }
    setAllConverstaions([]);
  }, [address]);

  useEffect(() => {
    const filtered = allConverstaions.filter(
      (item: any) => item.metadata.accountId === selectedArtist?.account_id,
    );
    setConversations([...filtered]);
  }, [selectedArtist, allConverstaions]);

  const fetchConversations = async (walletAddress: Address) => {
    try {
      const data = await getConversations(walletAddress);
      setAllConverstaions(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
      return [];
    }
  };

  return {
    addConversation,
    fetchConversations,
    conversations,
    chatId,
    streamingTitle,
    streaming,
    setQuotaExceeded,
    quotaExceeded,
    allConverstaions,
    isLoading,
  };
};

export default useConversations;
