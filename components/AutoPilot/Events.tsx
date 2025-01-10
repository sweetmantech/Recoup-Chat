import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { Conversation } from "@/types/Stack";

const Events = () => {
  const { conversations } = useConversationsProvider();

  return (
    <div className="bg-black/50 p-2 md:p-4 rounded border border-green-900 md:max-h-[400px] md:overflow-y-auto">
      <h2 className="text-sm font-bold mb-1 md:mb-2">EVENT_LOG</h2>
      <div className="flex flex-col max-h-[100px] overflow-y-auto md:max-h-full">
        {conversations.map((conversation: Conversation) => (
          <p className="text-xs md:text-sm" key={conversation.metadata.id}>
            <span className="text-xs text-green-600">
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
