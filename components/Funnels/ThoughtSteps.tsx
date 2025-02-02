import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import Thought from "./Thought";

const ThoughtSteps = () => {
  const { agentsStatus, funnelType } = useFunnelAnalysisProvider();

  return (
    <div
      className={`font-bold ${funnelType === "wrapped" ? "text-sm" : "text-md"}`}
    >
      {agentsStatus.length &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        agentsStatus?.map((agentStatus: any) => (
          <div key={agentStatus.id} className="flex gap-2">
            <Thought thought={agentStatus} />
          </div>
        ))}
    </div>
  );
};

export default ThoughtSteps;
