"use client";

import useFunnelReport from "@/hooks/useFunnelReport";
import React, { createContext, useContext, useMemo } from "react";

const FunnelReportContext = createContext<ReturnType<typeof useFunnelReport>>(
  {} as ReturnType<typeof useFunnelReport>,
);

const FunnelReportProvider = ({ children }: { children: React.ReactNode }) => {
  const funnelReport = useFunnelReport();

  const value = useMemo(() => ({ ...funnelReport }), [funnelReport]);

  return (
    <FunnelReportContext.Provider value={value}>
      {children}
    </FunnelReportContext.Provider>
  );
};

const useFunnelReportProvider = () => {
  const context = useContext(FunnelReportContext);
  if (!context) {
    throw new Error(
      "useFunnelReportProvider must be used within a FunnelReportProvider",
    );
  }
  return context;
};

export { FunnelReportProvider, useFunnelReportProvider };
