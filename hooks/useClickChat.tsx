import { useRouter } from "next/navigation";
import useIsMobile from "./useIsMobile";
import { Conversation } from "@/types/Chat";

const useClickChat = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();

  const handleClick = (conversation: Conversation, toggleModal: () => void) => {
    if (isMobile) toggleModal();
    push(`/${conversation.id}`);
  };

  return {
    handleClick,
  };
};

export default useClickChat;
