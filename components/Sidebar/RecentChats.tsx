import useClickChat from "@/hooks/useClickChat";
import getConversationTitle from "@/lib/getConversationTitle";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { Conversation } from "@/types/Stack";

const RecentChats = ({ toggleModal }: { toggleModal: () => void }) => {
  const { conversations, streamingTitle, streaming } =
    useConversationsProvider();
  const { handleClick } = useClickChat();

  return (
    <div>
      <div className="h-[1px] bg-grey-light w-full mt-1 mb-2 md:mt-2 md:mb-3" />
      <p className="text-sm mb-1 md:mb-2 font-inter text-grey-dark md:px-4">
        Recent Chats
      </p>
      <div className="max-h-[75px] md:max-h-[140px] overflow-y-auto space-y-1 md:space-y-2 md:px-4">
        {streamingTitle && streaming && (
          <button className="flex gap-2 items-center" type="button">
            <p className="text-sm truncate max-w-[200px]">{streamingTitle}</p>
          </button>
        )}
        {conversations.map((conversation: Conversation, index: number) => (
          <button
            className="flex gap-2 items-center"
            key={index}
            type="button"
            onClick={() => handleClick(conversation, toggleModal)}
          >
            <p className="text-sm truncate max-w-[200px]">
              {getConversationTitle(conversation)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentChats;
