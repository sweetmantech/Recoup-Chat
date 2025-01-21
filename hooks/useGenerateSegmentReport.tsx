import { useUserProvider } from "@/providers/UserProvder";
import { v4 as uuidV4 } from "uuid";
import { useChatProvider } from "@/providers/ChatProvider";
import { usePaymentProvider } from "@/providers/PaymentProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { useParams } from "next/navigation";

const useGenerateSegmentReport = () => {
  const { append } = useChatProvider();
  const { funnelType } = useFunnelAnalysisProvider();
  const { chat_id: chatId } = useParams();
  const { isPrepared } = useUserProvider();
  const {
    toggleModal,
    setSuccessCallbackParams,
    isLoadingCredits,
    creditUsed,
    credits,
    subscriptionActive,
  } = usePaymentProvider();

  const openReportChat = (
    segmentName: string,
    funnel_type: string,
    report_id: string,
  ) => {
    append(
      {
        id: uuidV4(),
        role: "user",
        content: `Please create a ${funnel_type} fan segment report for ${report_id} using this segment ${segmentName}.`,
      },
      true,
    );
  };

  const handleGenerateReport = async (
    segmentName: string,
    funnel_type: string | undefined = undefined,
    report_id: string | undefined = undefined,
  ) => {
    if (!isPrepared()) return;
    if (isLoadingCredits) return;
    const type = funnel_type || funnelType;
    const minimumCredits = type === "wrapped" ? 5 : 1;
    if (credits >= minimumCredits || subscriptionActive) {
      if (!subscriptionActive) await creditUsed(minimumCredits);
      openReportChat(
        segmentName,
        funnel_type as string,
        report_id || (chatId as string),
      );
      return;
    }
    setSuccessCallbackParams(
      new URLSearchParams({
        segmentName,
        reportId: report_id || (chatId as string),
      }).toString(),
    );
    toggleModal(minimumCredits === 5);
  };

  return {
    handleGenerateReport,
  };
};

export default useGenerateSegmentReport;
