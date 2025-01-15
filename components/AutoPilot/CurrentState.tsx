import useConversations from "@/hooks/useConversations";
import { Conversation } from "@/types/Stack";

const CurrentState = () => {
  const { conversations } = useConversations();

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
    <div className="p-2 md:p-4 rounded border">
      <h2 className="text-sm font-bold pb-1 flex gap-2 font-inter_bold">
        CURRENT_STATE
      </h2>
      <div className="flex items-end gap-2 font-inter">
        <span>{">"}</span>
        <p className="text-xs md:text-sm whitespace-pre-line">
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
