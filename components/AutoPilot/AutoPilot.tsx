import { Funnel_Type } from "@/types/Funnel";
import HandleInput from "../Funnels/HandleInput";
import useRestAgent from "@/hooks/useRESTAgent";
import ThoughtSteps from "../Funnels/ThoughtSteps";
import Segments from "../Funnels/Segments";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const AutoPilot = () => {
  const { setAgentType, runRESTAgent, polling } = useRestAgent();
  const { result } = useFunnelAnalysisProvider();

  return (
    <div className="grow h-screen overflow-hidden md:bg-background md:p-4">
      <div className="size-full bg-white overflow-y-auto pb-20 md:pb-0 rounded-xl flex flex-col justify-center gap-3 pt-6 md:pt-10 px-4 md:px-10">
        <div className="mx-auto space-y-2">
          <select
            className="h-10 bg-transparent px-5 text-md rounded-md !outline-none border w-full"
            onChange={(e) => setAgentType(e.target.value)}
          >
            <option value={Funnel_Type.TWITTER}>Twitter</option>
            <option value={Funnel_Type.TIKTOK}>TikTok</option>
            <option value={Funnel_Type.INSTAGRAM}>Instagram</option>
            <option value={Funnel_Type.SPOTIFY}>Spotify</option>
            <option value={Funnel_Type.WRAPPED}>Wrapped</option>
          </select>
          <div className="h-10">
            <HandleInput />
          </div>
          <button
            className="w-full bg-black rounded-[10px] pl-5 pr-4 h-9 z-20 flex items-center gap-2 justify-center
            transition-all text-[15px] font-medium text-white hover:bg-black active:bg-white/80
            disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={runRESTAgent}
            disabled={polling}
          >
            {polling ? "Running..." : "Run Agent"}
          </button>
          {polling && <ThoughtSteps />}
          {result?.segments?.length > 0 && !polling && <Segments />}
        </div>
      </div>
    </div>
  );
};

export default AutoPilot;
