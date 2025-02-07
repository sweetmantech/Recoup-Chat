import { useCallback, useEffect, useState } from "react";
import getInitialMessages from "@/lib/supabase/getInitialMessages";
import { StackMessage } from "@/types/Stack";
import { useParams } from "next/navigation";
import { useUserProvider } from "@/providers/UserProvder";

const useInitialMessages = () => {
  const [initialMessages, setInitialMessages] = useState<StackMessage[]>([]);
  const { userData } = useUserProvider();
  const { chat_id: chatId } = useParams();

  useEffect(() => {
    if (!chatId) setInitialMessages([]);
  }, [chatId]);

  const fetchInitialMessages = useCallback(async () => {
    try {
      if (!userData.id) return;
      if (!chatId) return;
      const messages = await getInitialMessages(chatId as string);
      setInitialMessages(messages);
    } catch (error) {
      console.error("Error fetching initial messages:", error);
      return;
    }
  }, [chatId, userData]);

  useEffect(() => {
    fetchInitialMessages();
  }, [fetchInitialMessages]);

  return {
    initialMessages,
    fetchInitialMessages,
    setInitialMessages,
  };
};

export default useInitialMessages;
