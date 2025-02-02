import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import AgentSkeleton from "./AgentSkeleton";
import FunnelAccountAnalysis from "./FunnelAccountAnalysis";

const Agents = () => {
  const { isCheckingAgentId } = useFunnelAnalysisProvider();

  return (
    <div>
      {isCheckingAgentId ? <AgentSkeleton /> : <FunnelAccountAnalysis />}
    </div>
  );
};

export default Agents;
