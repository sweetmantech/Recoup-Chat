"use client";

import useReportToolMessagesTrack from "@/hooks/useReportToolMessagesTrack";
import React, { createContext, useContext, useMemo } from "react";

const TrackToolMessageContext = createContext<
  ReturnType<typeof useReportToolMessagesTrack>
>({} as ReturnType<typeof useReportToolMessagesTrack>);

const TrackToolMessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const reportToolMessagesTrack = useReportToolMessagesTrack();
  const value = useMemo(
    () => ({ ...reportToolMessagesTrack }),
    [reportToolMessagesTrack],
  );
  return (
    <TrackToolMessageContext.Provider value={value}>
      {children}
    </TrackToolMessageContext.Provider>
  );
};

const useTrackToolMessageProvider = () => {
  const context = useContext(TrackToolMessageContext);
  if (!context) {
    throw new Error(
      "useTrackToolMessageProvider must be used within a TrackToolMessageProvider",
    );
  }
  return context;
};

export { TrackToolMessageProvider, useTrackToolMessageProvider };
