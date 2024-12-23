import socketIo from "@/lib/socket/client";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const useAgentSocket = () => {
  const [socketId, setSocketId] = useState<any>(undefined);
  const { chat_id: chatId } = useParams();
  const { artistHandle } = useFunnelAnalysisProvider();
  const { push } = useRouter();
  const { userData } = useUserProvider();

  useEffect(() => {
    socketIo.on("connect", () => {
      setSocketId(socketIo.id);
    });
  }, []);

  useEffect(() => {
    if (!chatId) return;
    socketIo.removeAllListeners(chatId as string);
    socketIo.on(chatId as string, (dataGot) => {
      console.log("ZIAD", dataGot);
    });
  }, [chatId]);

  const openTikTokAgent = () => {
    const newChatId = uuidV4();
    socketIo.emit("TiktokAnalysis", socketId, {
      handle: artistHandle,
      chat_id: newChatId,
      account_id: userData?.id,
    });
    push(`/funnels/tiktok/${newChatId}`);
  };

  return {
    socketId,
    openTikTokAgent,
  };
};

export default useAgentSocket;
