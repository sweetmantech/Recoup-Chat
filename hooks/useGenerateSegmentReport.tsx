import { useUserProvider } from "@/providers/UserProvder";
import { v4 as uuidV4 } from "uuid";
import { useChatProvider } from "@/providers/ChatProvider";
import { usePaymentProvider } from "@/providers/PaymentProvider";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";

const useGenerateSegmentReport = () => {
  const { append } = useChatProvider();
  const { isPrepared } = useUserProvider();
  const {
    toggleModal,
    setSuccessCallbackParams,
    isLoadingCredits,
    creditUsed,
    credits,
    subscriptionActive,
  } = usePaymentProvider();
  const { setIsLoadingReport } = useFunnelReportProvider();

  const openReportChat = (
    agentId: string,
    segmentName: string,
    funnelType: string,
  ) => {
    setIsLoadingReport(true);
    append(
      {
        id: uuidV4(),
        role: "user",
        content: `Please create a ${funnelType || ""} fan segment report for ${agentId} using this segment ${segmentName}.`,
      },
      true,
    );
  };

  const handleGenerateReport = async (
    agentId: string,
    segmentName: string,
    funnelType: string,
  ) => {
    if (!isPrepared()) return;
    if (isLoadingCredits) return;
    const minimumCredits = funnelType === "wrapped" ? 5 : 1;
    if (credits >= minimumCredits || subscriptionActive) {
      if (!subscriptionActive) await creditUsed(minimumCredits);
      openReportChat(agentId, segmentName, funnelType);
      return;
    }
    setSuccessCallbackParams(
      new URLSearchParams({
        segmentName,
        agentId,
      }).toString(),
    );
    toggleModal(minimumCredits === 5);
  };

  return {
    handleGenerateReport,
  };
};

export default useGenerateSegmentReport;
