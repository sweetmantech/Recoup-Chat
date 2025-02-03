"use client";

import AnalysisChat from "./AnalysisChat";
import FunnelAccountInput from "./FunnelAccountInput";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const FunnelAccountAnalysis = () => {
  const { isLoading } = useFunnelAnalysisProvider();

  return <>{isLoading ? <AnalysisChat /> : <FunnelAccountInput />}</>;
};

export default FunnelAccountAnalysis;
