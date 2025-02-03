import createArtist from "@/lib/createArtist";
import { useAgentsProvider } from "@/providers/AgentsProvider";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { useUserProvider } from "@/providers/UserProvder";

const useRunAgent = () => {
  const { username, funnelType, setIsLoading, setIsInitializing } =
    useFunnelAnalysisProvider();
  const { runAgents, lookupProfiles } = useAgentsProvider();
  const { getArtists } = useArtistProvider();
  const { userData } = useUserProvider();

  const handleAnalyze = async () => {
    setIsInitializing(true);
    setIsLoading(true);
    try {
      if (!userData?.account_id) return;
      const newArtist = await createArtist(username, userData.account_id);
      await getArtists(newArtist.account_id);
      if (funnelType === "wrapped") {
        lookupProfiles("wrapped", newArtist);
        return;
      }
      await runAgents({
        artistId: newArtist.account_id,
        name: newArtist.name,
        handles: {
          [`${funnelType}`]: username,
        },
      });
    } catch (error) {
      console.error("Error during analysis:", error);
      setIsLoading(false);
    }
  };

  return {
    handleAnalyze,
  };
};

export default useRunAgent;
