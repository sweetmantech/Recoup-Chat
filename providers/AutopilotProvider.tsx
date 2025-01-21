"use client";

import useAutopilot from "@/hooks/useAutopilot";
import React, { createContext, useContext, useMemo } from "react";

const AutopilotContext = createContext<ReturnType<typeof useAutopilot>>(
  {} as ReturnType<typeof useAutopilot>,
);

const AutopilotProvider = ({ children }: { children: React.ReactNode }) => {
  const autopilot = useAutopilot();

  const value = useMemo(() => ({ ...autopilot }), [autopilot]);

  return (
    <AutopilotContext.Provider value={value}>
      {children}
    </AutopilotContext.Provider>
  );
};

const useAutopilotProvider = () => {
  const context = useContext(AutopilotContext);
  if (!context) {
    throw new Error(
      "useAutopilotProvider must be used within a AutopilotProvider",
    );
  }
  return context;
};

export { AutopilotProvider, useAutopilotProvider };
