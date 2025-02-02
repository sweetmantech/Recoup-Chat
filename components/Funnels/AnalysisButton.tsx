import createArtist from "@/lib/createArtist";
import { useAgentsProvider } from "@/providers/AgentsProvider";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { useUserProvider } from "@/providers/UserProvder";

const AnalysisButton = ({
  className,
  containerClasses,
}: {
  className?: string;
  containerClasses?: string;
}) => {
  const { username, funnelType, setIsLoading, setIsInitializing } =
    useFunnelAnalysisProvider();
  const { runAgents } = useAgentsProvider();
  const { getArtists } = useArtistProvider();
  const { userData } = useUserProvider();

  const handleClick = async () => {
    setIsInitializing(true);
    setIsLoading(true);
    try {
      if (!userData?.account_id) return;
      const newArtist = await createArtist(username, userData.account_id);
      await getArtists(newArtist.account_id);
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

  return (
    <div className={`space-y-3 ${containerClasses}`}>
      <button
        onClick={handleClick}
        disabled={!username}
        className={`bg-black rounded-[10px] pl-5 pr-4 h-9 z-20 flex items-center gap-2 justify-center
        transition-all text-[15px] font-medium text-white hover:bg-black active:bg-white/80
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        Try For Free
      </button>
      <p className="font-inter text-sm text-grey-primary text-center">
        No credit card required.
      </p>
    </div>
  );
};

export default AnalysisButton;
