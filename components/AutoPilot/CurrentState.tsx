import useConversations from "@/hooks/useConversations";
import { Conversation } from "@/types/Stack";

const CurrentState = () => {
  const { conversations } = useConversations();
  const latestTimestamp = new Date().toLocaleTimeString();

  const handleClickState = (conversation: Conversation) => {
    const chatId = conversation.metadata.conversationId;
    if (conversation.metadata.is_funnel_analysis) {
      const funnelType = conversation.metadata.funnel_name.toLowerCase();
      window.open(
        `${window.location.origin}/funnels/${funnelType}/${chatId}`,
        "_blank",
      );
      return;
    }
    window.open(`${window.location.origin}/${chatId}`, "_blank");
  };

  return (
    <div className="bg-black/50 p-4 rounded border border-green-900">
      <h2 className="text-sm font-bold mb-2 flex gap-2">
        <span>CURRENT_STATE</span>
        {latestTimestamp && (
          <span className="text-green-600">@{latestTimestamp}</span>
        )}
      </h2>
      <div className="flex items-end gap-2">
        <span className="text-blue-400">{">"}</span>
        <p className="text-sm whitespace-pre-line">
          {conversations?.length > 0 ? (
            <button
              type="button"
              onClick={() => handleClickState(conversations[0])}
            >
              {conversations[0].metadata.title}
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
