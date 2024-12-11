import { Conversation } from "@/types/Stack";

const getConverstaionTitle = (conversation: Conversation) => {
  return `${conversation?.title}` || `${conversation?.metadata.content}`;
};

export default getConverstaionTitle;
