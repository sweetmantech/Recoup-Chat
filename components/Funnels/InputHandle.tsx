import { useAgentsProvider } from "@/providers/AgentsProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const InputHandles = () => {
  const { handles, setHandles } = useFunnelAnalysisProvider();
  const { runAgents } = useAgentsProvider();

  const handleContinue = () => {
    runAgents();
  };

  // eslint-disable-next-line
  const handleChange = (e: any, id: string) => {
    const temp = { ...handles };
    temp[`${id}`] = e.target.value;
    setHandles(temp);
  };

  return (
    <div className="space-y-2 text-sm">
      {/* eslint-disable-next-line */}
      {Object.entries(handles).map(([id, value]: any) => (
        <div className="flex gap-2 items-center" key={id}>
          <p>{id.toUpperCase()}: </p>
          <input
            value={value}
            className="border rounded-md border-grey-700 px-4 py-1 !outline-none"
            onChange={(e) => handleChange(e, id)}
          />
        </div>
      ))}
      <button
        onClick={handleContinue}
        type="button"
        className="bg-black px-4 py-2 text-white rounded-md mt-1 hover:bg-white hover:text-black border-grey-700 border transition-all duration-[200ms]"
      >
        Continue
      </button>
    </div>
  );
};

export default InputHandles;
