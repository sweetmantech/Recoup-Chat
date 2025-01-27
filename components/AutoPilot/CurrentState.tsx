import { useAutopilotProvider } from "@/providers/AutopilotProvider";

const CurrentState = () => {
  const { eventsLogs, curLiveAgent } = useAutopilotProvider();

  return (
    <div className="p-2 md:p-4 rounded border">
      <h2 className="text-sm font-bold pb-1 flex gap-2 font-inter_bold">
        CURRENT_STATE
      </h2>
      <div className="flex items-end gap-2 font-inter">
        <span>{">"}</span>
        <p className="text-xs md:text-sm whitespace-pre-line">
          {eventsLogs?.length > 0 || curLiveAgent ? (
            <button type="button">
              {curLiveAgent || eventsLogs[0].metadata.title}
            </button>
          ) : (
            <>
              {`Awaiting new events...`}
              <span className="animate-pulse">_</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default CurrentState;
