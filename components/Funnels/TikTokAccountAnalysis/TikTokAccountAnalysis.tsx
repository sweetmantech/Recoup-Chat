"use client";

import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import TikTokAccountInput from "./Input";
import AnalysisChat from "./AnalysisChat";

const TikTokAccountAnalysis = () => {
  const { isLoading } = useTikTokAnalysisProvider();

  return <>{isLoading ? <AnalysisChat /> : <TikTokAccountInput />}</>;
};

export default TikTokAccountAnalysis;
