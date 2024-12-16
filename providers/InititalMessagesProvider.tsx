"use client";

import useInitialMessages from "@/hooks/useInitialMessages";
import React, { createContext, useContext, useMemo } from "react";

const InitialMessagesContext = createContext<
  ReturnType<typeof useInitialMessages>
>({} as ReturnType<typeof useInitialMessages>);

const InitialMessagesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const inititalMessages = useInitialMessages();

  const value = useMemo(() => ({ ...inititalMessages }), [inititalMessages]);

  return (
    <InitialMessagesContext.Provider value={value}>
      {children}
    </InitialMessagesContext.Provider>
  );
};

const useInitialMessagesProvider = () => {
  const context = useContext(InitialMessagesContext);
  if (!context) {
    throw new Error(
      "useInitialMessagesProvider must be used within a MessagesProvider",
    );
  }
  return context;
};

export { InitialMessagesProvider, useInitialMessagesProvider };
