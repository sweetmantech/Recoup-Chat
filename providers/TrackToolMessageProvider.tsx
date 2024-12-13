"use client";

import useTikTokToolMessagesTrack from "@/hooks/useTikTokToolMessagesTrack";
import React, { createContext, useContext, useMemo } from "react";

const TrackToolMessageContext = createContext<
  ReturnType<typeof useTikTokToolMessagesTrack>
>({} as ReturnType<typeof useTikTokToolMessagesTrack>);

const TrackToolMessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const tiktokToolMessagesTrack = useTikTokToolMessagesTrack();
  const value = useMemo(
    () => ({ ...tiktokToolMessagesTrack }),
    [tiktokToolMessagesTrack],
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
