import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";
import { useArtistProvider } from "@/providers/ArtistProvider";
import getConversations from "@/lib/getConversations";
import { Conversation } from "@/types/Chat";

const useConversations = () => {
  const { userData } = useUserProvider();
  const { chat_id: chatId } = useParams();
  const { selectedArtist } = useArtistProvider();
  const [allConverstaions, setAllConverstaions] = useState<Conversation[]>([]);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const addConversation = (conversation: any) => {
    setAllConverstaions([conversation, ...allConverstaions]);
  };

  useEffect(() => {
    if (userData) {
      fetchConversations();
      return;
    }
    return () => setAllConverstaions([]);
  }, [userData]);

  const conversations = useMemo(() => {
    const filtered = allConverstaions.filter((item: Conversation) =>
      item.memories.some(
        (memory: { artist_id: string }) =>
          memory.artist_id === selectedArtist?.account_id,
      ),
    );
    return filtered;
  }, [selectedArtist, allConverstaions]);

  const fetchConversations = async () => {
    const data = await getConversations(userData.id);
    setAllConverstaions(data);
    setIsLoading(false);
  };

  return {
    addConversation,
    fetchConversations,
    conversations,
    chatId,
    setQuotaExceeded,
    quotaExceeded,
    allConverstaions,
    isLoading,
  };
};

export default useConversations;
