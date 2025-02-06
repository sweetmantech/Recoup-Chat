import { Message as AIMessage } from "ai";
import { useToolCallProvider } from "@/providers/ToolCallProvider";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import Answer from "./Answer";
import getStatusMessage from "@/lib/getStatusMessage";
import { useFunnelReportProvider } from "@/providers/FunnelReportProvider";
import isAnalysisTool from "@/lib/isAnalysisTool";

const ToolFollowUp = ({ message }: { message: AIMessage }) => {
  const { toolName, context } = useToolCallProvider();
  const { isLoadingReport } = useFunnelReportProvider();
  const content = message.content;

  useEffect(() => {
    scrollTo();
    const timeoutId = setTimeout(scrollTo, 1000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, context]);

  return (
    <div>
      {isAnalysisTool(toolName) && (
        <>
          {isLoadingReport && !content ? (
            <div className="flex gap-2 items-center">
              <p className="text-sm">{getStatusMessage(context)}</p>
              <LoaderCircle className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <Answer content={content} role={message.role} />
          )}
        </>
      )}
      {!toolName && <Answer content={content} role={message.role} />}
    </div>
  );
};

export default ToolFollowUp;
