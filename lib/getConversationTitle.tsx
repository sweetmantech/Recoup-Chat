import { Conversation } from "@/types/Stack";

const getConversationTitle = (conversation: Conversation) => {
  return `${conversation?.metadata?.title}`;
};

export default getConversationTitle;
