"use client";

import useInitialChat from "@/hooks/useInitialChat";
import React, { createContext, useContext, useMemo } from "react";

const InitialChatContext = createContext<ReturnType<typeof useInitialChat>>(
  {} as ReturnType<typeof useInitialChat>,
);

const InitialChatProvider = ({ children }: { children: React.ReactNode }) => {
  const initialChat = useInitialChat();

  const value = useMemo(() => ({ ...initialChat }), [initialChat]);

  return (
    <InitialChatContext.Provider value={value}>
      {children}
    </InitialChatContext.Provider>
  );
};

const useInitialChatProvider = () => {
  const context = useContext(InitialChatContext);
  if (!context) {
    throw new Error(
      "useInitialChatProvider must be used within a InitialChatProvider",
    );
  }
  return context;
};

export { InitialChatProvider, useInitialChatProvider };
