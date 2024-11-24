import ChatInput from "@/components/Chat/ChatInput";
import Messages from "@/components/Chat/Messages";
import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import { THOUGHT_OF_ANALYSIS } from "@/types/Thought";
import { ScrollTo } from "react-scroll-to";

const ChainOfThought = () => {
  const { thought, username, progress, result, segments } =
    useTikTokAnalysisProvider();

  return (
    <main className="flex-1 flex">
      <div className="max-w-3xl mx-auto w-full h-screen mx-auto pt-10 flex flex-col">
        <div
          className={`flex gap-2 ${thought === THOUGHT_OF_ANALYSIS.FINISHED ? "items-start" : "items-center"}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={"/logo-light.png"}
            alt="not found logo"
            className="!w-6 !h-6"
          />
          <p className="text-sm">
            {thought === THOUGHT_OF_ANALYSIS.FINISHED
              ? `Analysis complete! @breland’s is ${result?.nickname} and makes content in ${result?.region}. He has ${result?.fans} followers. \nPlease select a fan segmentation below to generate a report for brand partnership deals.`
              : `Scraping @${username}’s TikTok`}
          </p>
        </div>
        <div className="pl-8 pt-2">
          <p className="font-bold">
            {thought === THOUGHT_OF_ANALYSIS.PROFILE &&
              `I'm looking at the TikTok artist profile...`}
            {thought === THOUGHT_OF_ANALYSIS.POSTURLS &&
              `I'm looking at the TikTok videos...`}
            {thought === THOUGHT_OF_ANALYSIS.VIDEO_COMMENTS &&
              `I'm looking at the TikTok video comments... ${Number(progress).toFixed(0)}%`}
            {thought === THOUGHT_OF_ANALYSIS.SEGMENTS &&
              `I'm grouping all of the Artist's TikTok Fans into the segments…`}
            {thought === THOUGHT_OF_ANALYSIS.CREATING_ARTIST &&
              `I'm setting up artist mode…`}
          </p>
          {segments?.length > 0 && (
            <div className="pt-6">
              <p className="text-md font-bold">Fan Segments</p>
              <div className="flex gap-2 flex-wrap mt-4">
                {segments
                  .map((obj) => Object.keys(obj))
                  .flat()
                  .slice(0, 10)
                  .map((segment: string) => (
                    <button
                      className="flex flex-col items-center gap-1 max-w-[100px]"
                      type="button"
                      key={segment}
                    >
                      <div className="border-[grey] border-[1px] rounded-md p-1">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={"/segment.svg"}
                          alt="not found logo"
                          className="!w-5 !h-5"
                        />
                      </div>
                      <p className="font-bold text-xs text-center">{segment}</p>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="grow flex flex-col pb-8">
          <ScrollTo>
            {({ scroll }) => <Messages scroll={scroll} className="!grow" />}
          </ScrollTo>
          <ChatInput />
        </div>
      </div>
    </main>
  );
};

export default ChainOfThought;
