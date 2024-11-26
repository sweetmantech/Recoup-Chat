import useConversations from "@/hooks/useConversations";
import Conversation from "./Conversation";
import SearchInput from "./SearchInput";

const History = () => {
  const { conversations } = useConversations();

  return (
    <div className="grow h-screen overflow-hidden bg-background p-4">
      <div className="size-full bg-white rounded-xl flex flex-col gap-3 items-center pt-6 md:pt-20 px-4 md:px-0">
        <SearchInput />
        <div className="max-w-3xl mx-auto w-full space-y-3">
          {conversations.map((conversation) => (
            <Conversation
              key={conversation.metadata.id}
              name={conversation.metadata.content}
              id={conversation.metadata.conversationId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
