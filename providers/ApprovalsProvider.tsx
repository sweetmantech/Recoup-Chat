"use client";

import useApprovals from "@/hooks/useApprovals";
import React, { createContext, useContext, useMemo } from "react";

const ApprovalsContext = createContext<ReturnType<typeof useApprovals>>(
  {} as ReturnType<typeof useApprovals>,
);

const ApprovalsProvider = ({ children }: { children: React.ReactNode }) => {
  const approvals = useApprovals();

  const value = useMemo(() => ({ ...approvals }), [approvals]);

  return (
    <ApprovalsContext.Provider value={value}>
      {children}
    </ApprovalsContext.Provider>
  );
};

const useApprovalsProvider = () => {
  const context = useContext(ApprovalsContext);
  if (!context) {
    throw new Error(
      "useApprovalsProvider must be used within a ApprovalsProvider",
    );
  }
  return context;
};

export { ApprovalsProvider, useApprovalsProvider };
