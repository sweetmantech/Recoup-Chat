"use client";

import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import AgentSkeleton from "./AgentSkeleton";
import FunnelAccountAnalysis from "./FunnelAccountAnalysis";

const Agents = () => {
  const { isCheckingAgentId } = useFunnelAnalysisProvider();

  return (
    <>{isCheckingAgentId ? <AgentSkeleton /> : <FunnelAccountAnalysis />}</>
  );
};

export default Agents;
