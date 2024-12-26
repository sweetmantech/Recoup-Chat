"use client";

import useFunnelAnalysis from "@/hooks/useFunnelAnalysis";
import React, { createContext, useContext, useMemo } from "react";
import { AgentSocketProvider } from "./AgentSocketProvider";

const FunnelAnalysisContext = createContext<
  ReturnType<typeof useFunnelAnalysis>
>({} as ReturnType<typeof useFunnelAnalysis>);

const FunnelAnalysisProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const funnelAnalysis = useFunnelAnalysis();

  const value = useMemo(() => ({ ...funnelAnalysis }), [funnelAnalysis]);

  return (
    <FunnelAnalysisContext.Provider value={value}>
      <AgentSocketProvider>{children}</AgentSocketProvider>
    </FunnelAnalysisContext.Provider>
  );
};

const useFunnelAnalysisProvider = () => {
  const context = useContext(FunnelAnalysisContext);
  if (!context) {
    throw new Error(
      "useFunnelAnalysisProvider must be used within a FunnelAnalysisProvider",
    );
  }
  return context;
};

export { FunnelAnalysisProvider, useFunnelAnalysisProvider };
