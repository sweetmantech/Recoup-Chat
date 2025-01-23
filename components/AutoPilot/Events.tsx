import { useAutopilotProvider } from "@/providers/AutopilotProvider";

const Events = () => {
  const { eventsLogs } = useAutopilotProvider();
  return (
    <div className="p-2 md:p-4 rounded border md:max-h-[400px] md:overflow-y-auto">
      <h2 className="text-sm font-bold mb-1 md:mb-2 font-inter_bold">
        EVENT_LOG
      </h2>
      <div className="flex flex-col max-h-[100px] overflow-y-auto md:max-h-full font-inter">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {eventsLogs.map((action: any) => (
          <p className="text-xs md:text-sm" key={action.metadata.id}>
            <span className="text-xs">
              {new Date(action.timestamp).toLocaleString()}
            </span>{" "}
            &nbsp;
            {action.metadata.title || action.metadata.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Events;
