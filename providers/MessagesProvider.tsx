"use client";

import useMessages from "@/hooks/useMessages";
import React, { createContext, useContext, useMemo } from "react";

const MessagesContext = createContext<ReturnType<typeof useMessages>>(
  {} as ReturnType<typeof useMessages>,
);

const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
  const messages = useMessages();

  const value = useMemo(() => ({ ...messages }), [messages]);

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
};

const useMessagesProvider = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error(
      "useMessagesProvider must be used within a MessagesProvider",
    );
  }
  return context;
};

export { MessagesProvider, useMessagesProvider };
