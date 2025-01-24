import { Conversation } from "@/types/Stack";
import { useRouter } from "next/navigation";
import useIsMobile from "./useIsMobile";

const useClickChat = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();

  const handleClick = (conversation: Conversation, toggleModal: () => void) => {
    const isFunnelAnalysis = conversation.metadata.is_funnel_analysis;
    const funnelName = isFunnelAnalysis
      ? conversation.metadata.funnel_name.toLowerCase()
      : null;
    const conversationId = conversation.metadata.conversationId;
    const isFunnelReport = conversation.metadata.is_funnel_report;
    const activeAnalysisId = conversation.metadata.active_analaysis_id;

    const urlParams = new URLSearchParams();
    if (isFunnelReport) urlParams.set("is_funnel_report", "true");
    if (activeAnalysisId) urlParams.set("active_analysis_id", activeAnalysisId);
    const url = isFunnelAnalysis
      ? `/funnels/${funnelName}/${conversationId}`
      : `/${conversationId}?${urlParams.toString()}`;

    if (isMobile) toggleModal();
    push(url);
  };

  return {
    handleClick,
  };
};

export default useClickChat;
