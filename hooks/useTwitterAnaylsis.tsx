import { useUserProvider } from "@/providers/UserProvder";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useInitialChatProvider } from "@/providers/InitialChatProvider";
import useTwitterAnalysisChain from "./useTwitterAnalysisChain";

const useTwitterAnalysis = () => {
  const twitterAnalysisChain = useTwitterAnalysisChain();
  const { chat_id: chatId } = useParams();
  const { email } = useUserProvider();
  const { clearMessagesCache } = useInitialChatProvider();

  useEffect(() => {
    const init = async () => {
      clearMessagesCache();
    };
    if (!chatId) return;
    init();
  }, [chatId, email]);

  return {
    ...twitterAnalysisChain,
  };
};

export default useTwitterAnalysis;
