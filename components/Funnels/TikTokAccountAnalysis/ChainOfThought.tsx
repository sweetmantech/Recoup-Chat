import ChatInput from "@/components/Chat/ChatInput";
import Messages from "@/components/Chat/Messages";
import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import { STEP_OF_ANALYSIS } from "@/types/Thought";
import { ScrollTo } from "react-scroll-to";
import Segments from "./Segments";

const ChainOfThought = () => {
  const { thought, username, progress, result, segments } =
    useTikTokAnalysisProvider();

  return (
    <main className="flex-1 flex">
      <div className="max-w-3xl mx-auto w-full h-screen mx-auto pt-10 flex flex-col">
        <div
          className={`flex gap-2 ${thought === STEP_OF_ANALYSIS.FINISHED ? "items-start" : "items-center"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={"/logo-light.png"}
            alt="not found logo"
            className="!w-6 !h-6"
          />
          <p className="text-sm">
            {thought === STEP_OF_ANALYSIS.FINISHED
              ? result?.videos?.length
                ? `Analysis complete! @${username.replaceAll("@", "")}’s is ${result?.nickname} and makes content in ${result?.region}. They have ${result?.fans} followers. \nPlease select a fan segmentation below to generate a report for brand partnership deals.`
                : `The account @${username} does not have any engagement. Please try again with a TikTok handle with at least one comment on its videos.`
              : `Scraping @${username.replaceAll("@", "")}’s TikTok`}
          </p>
        </div>
        <div className="pl-8 pt-2">
          <p className="font-bold">
            {thought === STEP_OF_ANALYSIS.PROFILE &&
              `I'm looking at the TikTok artist profile...`}
            {thought === STEP_OF_ANALYSIS.POSTURLS &&
              `I'm looking at the TikTok videos...`}
            {thought === STEP_OF_ANALYSIS.VIDEO_COMMENTS &&
              `I'm looking at the TikTok video comments... ${Number(progress).toFixed(0)}%`}
            {thought === STEP_OF_ANALYSIS.SEGMENTS &&
              `I'm grouping all of the Artist's TikTok Fans into the segments…`}
          </p>
        </div>
        <div className="grow flex flex-col pb-8">
          <ScrollTo>
            {({ scroll }) => <Messages scroll={scroll} className="!grow" />}
          </ScrollTo>
          <div className="space-y-2">
            {segments?.length > 0 && <Segments />}
            <ChatInput />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChainOfThought;
