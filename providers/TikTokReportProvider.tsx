"use client";

import useTikTokReport from "@/hooks/useTikTokReport";
import React, { createContext, useContext, useMemo } from "react";

const TikTokReportContext = createContext<ReturnType<typeof useTikTokReport>>(
  {} as ReturnType<typeof useTikTokReport>,
);

const TikTokReportProvider = ({ children }: { children: React.ReactNode }) => {
  const tiktokReport = useTikTokReport();

  const value = useMemo(() => ({ ...tiktokReport }), [tiktokReport]);

  return (
    <TikTokReportContext.Provider value={value}>
      {children}
    </TikTokReportContext.Provider>
  );
};

const useTikTokReportProvider = () => {
  const context = useContext(TikTokReportContext);
  if (!context) {
    throw new Error(
      "useTikTokReportProvider must be used within a TikTokReportProvider",
    );
  }
  return context;
};

export { TikTokReportProvider, useTikTokReportProvider };
