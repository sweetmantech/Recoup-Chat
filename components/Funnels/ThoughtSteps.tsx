import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import Thought from "./Thought";
import isScraping from "@/lib/agent/isScraping";

const ThoughtSteps = () => {
  const { agentsStatus, funnelType, isCheckingAgentStatus } =
    useFunnelAnalysisProvider();

  return (
    <div
      className={`font-bold ${funnelType === "wrapped" ? "text-sm" : "text-md"}`}
    >
      {agentsStatus.length > 0 &&
        isScraping(agentsStatus) &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        agentsStatus?.map((agentStatus: any) => (
          <div key={agentStatus.id} className="flex gap-2">
            <Thought thought={agentStatus} />
          </div>
        ))}
      {isCheckingAgentStatus &&
        agentsStatus.length === 0 &&
        `Looking at Agent Status...`}
    </div>
  );
};

export default ThoughtSteps;
