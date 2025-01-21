import { useAutopilotProvider } from "@/providers/AutopilotProvide";
import { Conversation } from "@/types/Stack";

const Events = () => {
  const { analyses } = useAutopilotProvider();

  return (
    <div className="p-2 md:p-4 rounded border md:max-h-[400px] md:overflow-y-auto">
      <h2 className="text-sm font-bold mb-1 md:mb-2 font-inter_bold">
        EVENT_LOG
      </h2>
      <div className="flex flex-col max-h-[100px] overflow-y-auto md:max-h-full font-inter">
        {analyses.map((conversation: Conversation) => (
          <p className="text-xs md:text-sm" key={conversation.metadata.id}>
            <span className="text-xs">
              {new Date(conversation.timestamp).toLocaleString()}
            </span>{" "}
            &nbsp;
            {conversation.metadata.title}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Events;
