"use client";

import useChat from "@/hooks/useChat";
import React, { createContext, useContext, useMemo } from "react";
import { MessagesProvider } from "./MessagesProvider";
import { InitialMessagesProvider } from "./InititalMessagesProvider";

const ChatContext = createContext<ReturnType<typeof useChat>>(
  {} as ReturnType<typeof useChat>,
);

const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const chat = useChat();

  const value = useMemo(() => ({ ...chat }), [chat]);

  return (
    <InitialMessagesProvider>
      <MessagesProvider>
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
      </MessagesProvider>
    </InitialMessagesProvider>
  );
};

const useChatProvider = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatProvider must be used within a ChatProvider");
  }
  return context;
};

export { ChatProvider, useChatProvider };
