"use client";

import { useArtistProvider } from "@/providers/ArtistProvider";
import AnalysisChat from "./AnalysisChat";
import AgentSkeleton from "./AgentSkeleton";

const FunnelAccountAnalysis = () => {
  const { selectedArtist } = useArtistProvider();

  return <>{selectedArtist ? <AnalysisChat /> : <AgentSkeleton />}</>;
};

export default FunnelAccountAnalysis;
