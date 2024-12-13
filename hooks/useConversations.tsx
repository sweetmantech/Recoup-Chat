import { Address } from "viem";
import { useEffect, useRef, useState } from "react";
import { Conversation } from "@/types/Stack";
import getConversations from "@/lib/stack/getConversations";
import { useParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import trackChatTitle from "@/lib/stack/trackChatTitle";
import { useArtistProvider } from "@/providers/ArtistProvider";

let timer: any = null;
let streamedIndex = 1;

const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { address } = useUserProvider();
  const { conversation } = useParams();
  const conversationRef = useRef(conversation as string);
  const [streamingTitle, setStreamingTitle] = useState("");
  const [streaming, setStreaming] = useState(false);
  const { selectedArtist } = useArtistProvider();
  const [allConverstaions, setAllConverstaions] = useState<Conversation[]>([]);

  useEffect(() => {
    if (address) {
      fetchConversations(address);
    }
  }, [address]);

  useEffect(() => {
    if (!selectedArtist?.id) {
      setConversations(allConverstaions);
      return;
    }
    const filtered = allConverstaions.filter(
      (item: any) => item.metadata.artistId === selectedArtist?.id,
    );
    setConversations(filtered);
  }, [selectedArtist, allConverstaions]);

  const trackTikTokAnalysisChat = async (
    username: string,
    artistId: string,
    chatId: string,
  ) => {
    await trackNewTitle(
      {
        title: `TikTok Analysis: ${username}`,
        is_tiktok_analysis: true,
        cached_id: null,
        artistId,
      },
      chatId,
    );
  };

  const trackNewTitle = async (titlemetadata: any, conversationId: string) => {
    await trackChatTitle(
      address,
      titlemetadata,
      conversationId,
      selectedArtist?.id || "",
    );
    clearInterval(timer);
    streamedIndex = 1;
    timer = setInterval(() => {
      if (streamedIndex === titlemetadata.title.length + 1) {
        clearInterval(timer);
        return;
      }
      setStreamingTitle(titlemetadata.title.slice(0, streamedIndex));
      streamedIndex++;
    }, 50);
    setStreaming(true);
    await fetchConversations(address);
    setStreaming(false);
  };

  const fetchConversations = async (walletAddress: Address) => {
    try {
      const data = await getConversations(walletAddress);
      setAllConverstaions(data);
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
    streaming,
    trackTikTokAnalysisChat,
  };
};

export default useConversations;
