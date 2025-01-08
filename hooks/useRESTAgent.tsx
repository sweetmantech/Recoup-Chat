import callAgents from "@/lib/agent/callAgents";
import getAggregatedArtist from "@/lib/agent/getAggregatedArtist";
import getFunnelAnalysis from "@/lib/getFunnelAnalysis";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { FUNNEL_ANALYSIS } from "@/types/Agent";
import { Funnel_Type } from "@/types/Funnel";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useState } from "react";

const useRestAgent = () => {
  const { setThoughts, username, setUsername, setSegments, setResult } =
    useFunnelAnalysisProvider();
  const [agentType, setAgentType] = useState<string>(Funnel_Type.TWITTER);
  const { setSelectedArtist } = useArtistProvider();
  const [polling, setPolling] = useState(false);

  const pollingAgent = async (pilotId: string) => {
    if (!pilotId) return true;
    const funnel_analyses: any = await getFunnelAnalysis(pilotId as string);
    if (!funnel_analyses) return false;
    const artist: any = getAggregatedArtist(funnel_analyses);
    setSelectedArtist(artist);
    const analytics_segments: any = [];
    const tempThoughts: any = {};
    funnel_analyses.map((funnel_analysis: any) => {
      if (funnel_analysis.status === STEP_OF_ANALYSIS.FINISHED) {
        analytics_segments.push(funnel_analysis.funnel_analytics_segments);
      }
      tempThoughts[`${funnel_analysis.type.toLowerCase()}`] = {
        status: funnel_analysis.status,
      };
      setThoughts(tempThoughts);
    });
    setUsername(artist.handle || "");
    setSegments(analytics_segments.flat());
    setResult({
      segments: analytics_segments.flat(),
      ...artist.profile,
      handle: artist.handle,
    });
    const isFinished = funnel_analyses.every(
      (funnel_analysis: FUNNEL_ANALYSIS) =>
        funnel_analysis.status === STEP_OF_ANALYSIS.ERROR ||
        funnel_analysis.status === STEP_OF_ANALYSIS.FINISHED,
    );
    return isFinished;
  };

  const runRESTAgent = async () => {
    if (agentType === "wrapped") {
      setThoughts({
        twitter: { status: STEP_OF_ANALYSIS.INITITAL },
        spotify: { status: STEP_OF_ANALYSIS.INITITAL },
        tiktok: { status: STEP_OF_ANALYSIS.INITITAL },
        instagram: { status: STEP_OF_ANALYSIS.INITITAL },
      });
    } else {
      setThoughts({
        [`${agentType}`]: {
          status: STEP_OF_ANALYSIS.INITITAL,
        },
      });
    }

    const pilotId = await callAgents(username, agentType);
    setPolling(true);
    while (1) {
      const isFinished = await pollingAgent(pilotId);
      if (isFinished) {
        setPolling(false);
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  };

  return {
    runRESTAgent,
    agentType,
    setAgentType,
    pollingAgent,
    polling,
  };
};

export default useRestAgent;
