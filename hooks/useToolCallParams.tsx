import { Message } from "ai";
import useSpecificReport from "./useSpecificReport";

const useToolCallParams = (message: Message) => {
  const toolInvocations = [...(message.toolInvocations || [])];
  const toolInvocationResult = toolInvocations?.filter(
    (toolInvocation) => toolInvocation.state === "result",
  )?.[0];
  const question = toolInvocationResult?.result?.question || "";
  const context = toolInvocationResult?.result?.context || "";
  const toolName = toolInvocationResult?.toolName;
  const specificReportParams = useSpecificReport();

  return {
    question,
    context,
    toolName,
    specificReportParams,
  };
};

export default useToolCallParams;
