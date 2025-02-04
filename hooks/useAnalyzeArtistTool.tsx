import { useAgentsProvider } from "@/providers/AgentsProvider";
import { Tools } from "@/types/Tool";
import { useEffect } from "react";

const useAnalyzeArtistTool = (toolName: string | null, toolArgs: any) => {
  const { lookupProfiles } = useAgentsProvider();

  useEffect(() => {
    if (toolName === Tools.analyzeArtist && toolArgs) {
      const socialPlatform = toolArgs?.social_platform;
      const agentType = socialPlatform
        ? socialPlatform.toLowerCase()
        : "wrapped";
      lookupProfiles(agentType);
    }
  }, [toolName, toolArgs]);
};

export default useAnalyzeArtistTool;
