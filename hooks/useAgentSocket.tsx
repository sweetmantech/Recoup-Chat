import socketIo from "@/lib/socket/client";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { useUserProvider } from "@/providers/UserProvder";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const useAgentSocket = () => {
  const [socketId, setSocketId] = useState<any>(undefined);
  const { chat_id: chatId } = useParams();
  const { artistHandle, setThought, setIsLoading, getAnalysis, setProgress } =
    useFunnelAnalysisProvider();
  const { push } = useRouter();
  const { userData, address, isPrepared } = useUserProvider();

  useEffect(() => {
    socketIo.on("connect", () => {
      setSocketId(socketIo.id);
    });
  }, []);

  useEffect(() => {
    if (!chatId) return;
    socketIo.removeAllListeners();
    socketIo.on(chatId as string, async (dataGot) => {
      if (typeof dataGot?.status === "number") {
        setIsLoading(true);
        if (dataGot.status === STEP_OF_ANALYSIS.FINISHED) await getAnalysis();
        setThought(dataGot?.status);
        setProgress(dataGot?.progress || 0);
      }
    });
  }, [chatId]);

  const openAgentSocket = (funnelType: string) => {
    if (!isPrepared()) return;
    const newChatId = uuidV4();
    socketIo.emit(`${funnelType.toUpperCase()}_ANALYSIS`, socketId, {
      handle: artistHandle,
      chat_id: newChatId,
      account_id: userData?.id,
      address,
    });
    push(`/funnels/${funnelType}/${newChatId}`);
  };

  return {
    socketId,
    openAgentSocket,
  };
};

export default useAgentSocket;
