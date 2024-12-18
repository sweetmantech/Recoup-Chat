"use client";

import TikTokAccountInput from "./Input";
import AnalysisChat from "./AnalysisChat";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const TikTokAccountAnalysis = () => {
  const { isLoading } = useFunnelAnalysisProvider();
  return <>{isLoading ? <AnalysisChat /> : <TikTokAccountInput />}</>;
};

export default TikTokAccountAnalysis;
