import { Message as AIMessage } from "ai";
import ToolContent from "../Tools/ToolContent";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import ToolFollowUp from "../Tools/ToolFollowUp";
import { useChatProvider } from "@/providers/ChatProvider";
import Icon from "../Icon";
import ReportSummaryNote from "./ReportSummaryNote";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import Report from "./Report";
import Loading from "@/components/Loading";

const Message = ({ message, index }: { message: AIMessage; index: number }) => {
  const { context, specificReportParams } = useToolCallProvider();
  const { rawReportContent, nextSteps, reportContent } = specificReportParams;
  const { funnelNextSteps, funnelRawReportContent } = useFunnelReportProvider();
  const { reportEnabled } = useChatProvider();
  const isReportMessage =
    reportEnabled && ((funnelNextSteps && index === 0) || nextSteps);

  return (
    <div className="p-3 rounded-lg flex w-full gap-2">
      {message.role === "assistant" && (
        <div className="border border-grey w-7 h-7 rounded-full flex items-center justify-center">
          <Icon name="logo-xs" />
        </div>
      )}
      <div
        className={`grow ${message.role === "user" && "flex justify-end"} max-w-[90%]`}
      >
        {context && <ToolContent />}
        {specificReportParams?.reportTracking ? (
          <div className="h-7 flex items-center">
            <Loading />
          </div>
        ) : (
          <>
            {isReportMessage ? (
              <Report rawContent={rawReportContent || funnelRawReportContent} />
            ) : (
              <ToolFollowUp message={message} />
            )}
          </>
        )}
        {isReportMessage && (
          <ReportSummaryNote
            reportContent={reportContent || funnelRawReportContent}
            nextSteps={nextSteps || funnelNextSteps}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
