import { Address } from "viem";
import { useEffect, useRef, useState } from "react";
import { Conversation } from "@/types/Stack";
import getConversations from "@/lib/stack/getConversations";
import { useParams, useRouter } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import trackNewChatEvent from "@/lib/stack/trackNewChatEvent";
import { useArtistProvider } from "@/providers/ArtistProvider";
import getAiTitle from "@/lib/getAiTitle";

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
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const { push } = useRouter();

  const addConversations = (newmetadata: any) => {
    setAllConverstaions([
      { metadata: newmetadata } as any,
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

  const trackGeneralChat = async (
    content: string,
    chatId: string,
    is_funnel_report: boolean,
    active_analaysis_id: string,
  ) => {
    const response = await getAiTitle(content);
    if (response?.error) {
      setQuotaExceeded(true);
      push("/");
      return;
    }
    setQuotaExceeded(false);
    await trackChat({
      title: response.replaceAll(`\"`, ""),
      is_funnel_report,
      active_analaysis_id,
      conversationId: chatId,
      accountId: selectedArtist?.account_id,
    });
  };

  const trackChat = async (titlemetadata: any) => {
    await trackNewChatEvent(address, titlemetadata);
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
    addConversations(titlemetadata);
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
    addConversations,
    fetchConversations,
    conversations,
    conversationRef,
    conversationId: conversation,
    streamingTitle,
    streaming,
    setQuotaExceeded,
    quotaExceeded,
    trackGeneralChat,
    allConverstaions,
  };
};

export default useConversations;
