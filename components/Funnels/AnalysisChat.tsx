import ChatInput from "@/components/Chat/ChatInput";
import Messages from "@/components/Chat/Messages";
import { ScrollTo } from "react-scroll-to";
import FanSegmentResult from "./FanSegmentResult";

const AnalysisChat = () => {
  return (
    <main className="w-full flex-1 flex md:p-4 bg-grey-light-3">
      <div className="h-[calc(100vh-64px)] md:h-full bg-white rounded-xl w-full pb-20">
        <div className="px-4 md:max-w-3xl md:mx-auto md:w-full h-full md:pt-4 flex flex-col bg-white">
          <div className="md:grow flex flex-col pb-4 h-full">
            <ScrollTo>
              {({ scroll }) => (
                <>
                  <Messages scroll={scroll} className="!grow">
                    <FanSegmentResult />
                  </Messages>
                </>
              )}
            </ScrollTo>
            <div className="space-y-2">
              <ChatInput />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnalysisChat;
