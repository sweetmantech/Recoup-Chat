"use client";

import usePrompts from "@/hooks/usePrompts";
import React, { createContext, useContext, useMemo } from "react";

const PromptsContext = createContext<ReturnType<typeof usePrompts>>(
  {} as ReturnType<typeof usePrompts>,
);

const PromptsProvider = ({ children }: { children: React.ReactNode }) => {
  const prompts = usePrompts();

  const value = useMemo(() => ({ ...prompts }), [prompts]);

  return (
    <PromptsContext.Provider value={value}>{children}</PromptsContext.Provider>
  );
};

const usePromptsProvider = () => {
  const context = useContext(PromptsContext);
  if (!context) {
    throw new Error("usePromptsProvider must be used within a PromptsProvider");
  }
  return context;
};

export { PromptsProvider, usePromptsProvider };
