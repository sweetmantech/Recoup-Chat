"use client";

import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import TikTokAccountInput from "./Input";
import ChainOfThought from "./ChainOfThought";

const TikTokAccountAnalysis = () => {
  const { isLoading } = useTikTokAnalysisProvider();

  return <>{isLoading ? <ChainOfThought /> : <TikTokAccountInput />}</>;
};

export default TikTokAccountAnalysis;
