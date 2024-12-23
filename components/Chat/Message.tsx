import { Message as AIMessage } from "ai";
import ToolContent from "../Tools/ToolContent";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import ToolFollowUp from "../Tools/ToolFollowUp";
import { useChatProvider } from "@/providers/ChatProvider";
import Icon from "../Icon";
import ReportSummaryNote from "./ReportSummaryNote";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import { useTrackToolMessageProvider } from "@/providers/TrackToolMessageProvider";
import { useMessagesProvider } from "@/providers/MessagesProvider";
import Report from "./Report";

const Message = ({ message, index }: { message: AIMessage; index: number }) => {
  const { context, loading } = useToolCallProvider();
  const { funnelNextSteps, funnelRawReportContent } = useFunnelReportProvider();
  const { reportEnabled } = useChatProvider();
  const { pending, messages } = useMessagesProvider();
  const { tiktokTracking } = useTrackToolMessageProvider();
  const summaryShown =
    reportEnabled &&
    index === 0 &&
    (messages.length >= 2 || (messages.length === 0 && !pending && !loading)) &&
    funnelNextSteps;

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
            {funnelRawReportContent && index === 0 ? (
              <Report />
            ) : (
              <ToolFollowUp message={message} />
            )}
          </>
        )}
        {summaryShown && <ReportSummaryNote />}
      </div>
    </div>
  );
};

export default Message;
