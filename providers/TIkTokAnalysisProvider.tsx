"use client";

import useTikTokAnalysis from "@/hooks/useTikTokAnalysis";
import React, { createContext, useContext, useMemo } from "react";

const TikTokAnalysisContext = createContext<
  ReturnType<typeof useTikTokAnalysis>
>({} as ReturnType<typeof useTikTokAnalysis>);

const TikTokAnalysisProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const funnelAnalysis = useTikTokAnalysis();

  const value = useMemo(() => ({ ...funnelAnalysis }), [funnelAnalysis]);

  return (
    <TikTokAnalysisContext.Provider value={value}>
      {children}
    </TikTokAnalysisContext.Provider>
  );
};

const useTikTokAnalysisProvider = () => {
  const context = useContext(TikTokAnalysisContext);
  if (!context) {
    throw new Error(
      "useTikTokAnalysisProvider must be used within a TikTokAnalysisProvider",
    );
  }
  return context;
};

export { TikTokAnalysisProvider, useTikTokAnalysisProvider };
