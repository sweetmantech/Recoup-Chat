import { useRouter } from "next/navigation";
import FunnelCard from "./FunnelCard";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useAgentSocketProvider } from "@/providers/AgentSocketProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const Agents = () => {
  const { push } = useRouter();
  const { selectedArtist } = useArtistProvider();
  const { openAgentSocket } = useAgentSocketProvider();
  const { setIsLoading } = useFunnelAnalysisProvider();

  const handleClick = (funnelName: string) => {
    if (selectedArtist) {
      setIsLoading(true);
      openAgentSocket(funnelName);
      return;
    }
    push(`/funnels/${funnelName}`);
  };
  return (
    <div className="grow py-6 px-2 md:px-10">
      <p className="text-center md:text-left font-plus_jakarta_sans_bold text-[50px]">
        Agents
      </p>
      <p className="text-[19px] md:text-[25px] text-grey-dark text-center md:text-left">
        Unlock the potential of your artist with intelligent, task-focused
        agents.
      </p>
      <div className="pt-8 flex flex-col md:flex-row md:flex-wrap gap-8">
        <button
          type="button"
          className="w-full w-full h-[162px] overflow-hidden rounded-xl"
          onClick={() => handleClick("wrapped")}
        >
          <div className="relative bg-[url('/wrapped.png')] bg-cover bg-center size-full flex flex-col items-start justify-end pb-4 pl-4">
            <p className="text-white text-2xl md:text-[40px] pb-1 md:pb-2 text-left font-plus_jakarta_sans_bold">
              Your Fanbase Wrapped
            </p>
            <p className="text-white text-left text-[13px] md:text-[15px] pr-1 md:pr-0">
              Get a 360° breakdown of your fanbase across all platforms. Analyze{" "}
              <br className="hidden md:block" /> trends, segment audiences, and
              see how your fans evolved in 2024.
            </p>
            <div className="bg-white w-[62px] h-[25px] rounded-full flex items-center justify-center text-green absolute right-4 top-4">
              NEW
            </div>
          </div>
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <FunnelCard
            funnelName="tiktok"
            onClick={() => handleClick("tiktok")}
          />
          <FunnelCard
            funnelName="twitter"
            onClick={() => handleClick("twitter")}
          />
          <button
            type="button"
            className="w-full h-[162px] overflow-hidden rounded-xl"
          >
            <div className="relative bg-[url('/campaign.png')] bg-cover size-full flex flex-col items-start justify-end pb-4 pl-4">
              <p className="text-white text-2xl text-left">Campaign Creator</p>
              <p className="text-white text-left text-[15px]">
                Promote your music and capture <br />{" "}
                {`fan data with Recoup's
                  Webplayer.`}
              </p>
              <div className="bg-white w-[62px] h-[25px] rounded-full flex items-center justify-center text-purple absolute right-4 top-4">
                SOON
              </div>
              <div className="bg-[#00000000] size-full absolute left-0 top-0 backdrop-blur-[1px]" />
            </div>
          </button>
          <FunnelCard
            funnelName="spotify"
            icon="white-spotify"
            onClick={() => handleClick("spotify")}
          />
          <FunnelCard
            funnelName="instagram"
            icon="white-instagram"
            onClick={() => handleClick("instagram")}
          />
        </div>
      </div>
    </div>
  );
};

export default Agents;
