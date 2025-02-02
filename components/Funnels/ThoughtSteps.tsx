import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import Thought from "./Thought";
import StreamingThought from "./StreamThought";
import { useArtistProvider } from "@/providers/ArtistProvider";

const ThoughtSteps = () => {
  const { agentsStatus, funnelType } = useFunnelAnalysisProvider();
  const { selectedArtist } = useArtistProvider();

  return (
    <div
      className={`font-bold ${funnelType === "wrapped" ? "text-sm" : "text-md"}`}
    >
      {agentsStatus.length ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        agentsStatus?.map((agentStatus: any) => (
          <div key={agentStatus.id} className="flex gap-2">
            <Thought thought={agentStatus} />
          </div>
        ))
      ) : (
        <StreamingThought
          text={`Reviewing ${selectedArtist?.name}'s top-performing videos.`}
        />
      )}
    </div>
  );
};

export default ThoughtSteps;
