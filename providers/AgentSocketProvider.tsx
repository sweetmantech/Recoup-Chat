"use client";

import useAgentSocket from "@/hooks/useAgentSocket";
import React, { createContext, useContext, useMemo } from "react";

const AgentSocketContext = createContext<ReturnType<typeof useAgentSocket>>(
  {} as ReturnType<typeof useAgentSocket>,
);

const AgentSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const agentSocket = useAgentSocket();

  const value = useMemo(() => ({ ...agentSocket }), [agentSocket]);

  return (
    <AgentSocketContext.Provider value={value}>
      {children}
    </AgentSocketContext.Provider>
  );
};

const useAgentSocketProvider = () => {
  const context = useContext(AgentSocketContext);
  if (!context) {
    throw new Error(
      "useAgentSocketProvider must be used within a AgentSocketProvider",
    );
  }
  return context;
};

export { AgentSocketProvider, useAgentSocketProvider };
