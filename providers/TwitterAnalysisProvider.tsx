"use client";

import useTwitterAnalysis from "@/hooks/useTwitterAnalysis";
import React, { createContext, useContext, useMemo } from "react";

const TwitterAnalysisContext = createContext<
  ReturnType<typeof useTwitterAnalysis>
>({} as ReturnType<typeof useTwitterAnalysis>);

const TwitterAnalysisProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const twitterAnalysis = useTwitterAnalysis();

  const value = useMemo(() => ({ ...twitterAnalysis }), [twitterAnalysis]);

  return (
    <TwitterAnalysisContext.Provider value={value}>
      {children}
    </TwitterAnalysisContext.Provider>
  );
};

const useTwitterAnalysisProvider = () => {
  const context = useContext(TwitterAnalysisContext);
  if (!context) {
    throw new Error(
      "useTwitterAnalysisProvider must be used within a TwitterAnalysisProvider",
    );
  }
  return context;
};

export { TwitterAnalysisProvider, useTwitterAnalysisProvider };
