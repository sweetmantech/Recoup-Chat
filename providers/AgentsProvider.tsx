"use client";

import useAgents from "@/hooks/useAgents";
import React, { createContext, useContext, useMemo } from "react";

const AgentsContext = createContext<ReturnType<typeof useAgents>>(
  {} as ReturnType<typeof useAgents>,
);

const AgentsProvider = ({ children }: { children: React.ReactNode }) => {
  const agents = useAgents();

  const value = useMemo(() => ({ ...agents }), [agents]);

  return (
    <AgentsContext.Provider value={value}>{children}</AgentsContext.Provider>
  );
};

const useAgentsProvider = () => {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error("useAgentsProvider must be used within a AgentProvider");
  }
  return context;
};

export { AgentsProvider, useAgentsProvider };
