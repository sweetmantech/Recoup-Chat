import { Message as AIMessage } from "ai";
import ToolContent from "../Tools/ToolContent";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import ToolFollowUp from "../Tools/ToolFollowUp";
import { useChatProvider } from "@/providers/ChatProvider";
import Icon from "../Icon";
import ReportSummaryNote from "./ReportSummaryNote";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useTrackToolMessageProvider } from "@/providers/TrackToolMessageProvider";
import Report from "./Report";

const Message = ({ message, index }: { message: AIMessage; index: number }) => {
  const { context, specificReportParams } = useToolCallProvider();
  const { rawReportContent, nextSteps } = specificReportParams;
  const { funnelNextSteps, funnelRawReportContent } = useFunnelReportProvider();
  const { reportEnabled } = useChatProvider();
  const { tiktokTracking } = useTrackToolMessageProvider();
  const summaryShown =
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
        {tiktokTracking ? (
          <p> ...</p>
        ) : (
          <>
            {(funnelRawReportContent && index === 0) || nextSteps ? (
              <Report rawContent={funnelRawReportContent || rawReportContent} />
            ) : (
              <ToolFollowUp message={message} />
            )}
          </>
        )}
        {summaryShown && (
          <ReportSummaryNote
            reportContent={funnelRawReportContent || rawReportContent}
            nextSteps={funnelNextSteps || nextSteps}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
