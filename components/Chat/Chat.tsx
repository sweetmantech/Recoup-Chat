import { useChatProvider } from "@/providers/ChatProvider";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { ScrollTo } from "react-scroll-to";

const Chat = () => {
  const { messages } = useChatProvider();
  return (
    <div
      className={`grow h-[calc(100vh-56px)] md:h-screen overflow-hidden flex flex-col ${messages.length ? "px-4 pb-5 md:pt-20" : "items-center justify-center"}`}
    >
      <ScrollTo>{({ scroll }) => <Messages scroll={scroll} />}</ScrollTo>
      <ChatInput />
    </div>
  );
};

export default Chat;
