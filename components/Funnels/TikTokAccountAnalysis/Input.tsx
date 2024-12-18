"use client";

import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import AnalysisButton from "../AnalysisButton";
import FunnelMarkUp from "../FunnelMarkUp";
import FunnelBrand from "../FunnelBrand";
import HandleInput from "../HandleInput";

const TikTokAccountInput = () => {
  const { handleAnalyze } = useTikTokAnalysisProvider();

  return (
    <main className="flex-1 md:p-4 bg-background">
      <div className="h-[calc(100vh-64px)] md:h-full flex flex-col items-center justify-center px-4 sm:px-6 text-center bg-white rounded-xl">
        <FunnelMarkUp />
        <FunnelBrand />
        <div className="flex flex-col items-center justify-center gap-4 px-4">
          <div
            className="
              relative 
              w-[340px] 
              sm:w-full 
              max-w-[400px] 
              h-12 
              rounded-full 
              bg-gradient-to-r 
              from-white/[0.06] 
              to-white/[0.01]
              group
              focus-within:from-white/[0.09]
              focus-within:to-white/[0.03]
              transition-all
              duration-200
            "
          >
            <HandleInput funnelType="tiktok" />
            <AnalysisButton
              className="absolute right-2 top-1/2 -translate-y-1/2"
              containerClasses="md:block hidden"
              onClick={handleAnalyze}
            />
          </div>
          <AnalysisButton
            containerClasses="md:hidden block"
            onClick={handleAnalyze}
          />
        </div>
      </div>
    </main>
  );
};

export default TikTokAccountInput;
