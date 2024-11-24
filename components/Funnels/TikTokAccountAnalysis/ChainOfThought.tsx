import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import { THOUGHT_OF_ANALYSIS } from "@/types/Thought";

const ChainOfThought = () => {
  const { thought, username, progress } = useTikTokAnalysisProvider();

  return (
    <main className="flex-1 flex">
      <div className="max-w-[900px] w-full mx-auto pt-10">
        <div className="flex gap-2 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={"/logo-light.png"}
            alt="not found logo"
            className="!w-6 !h-6"
          />
          <p className="text-sm">{`Scraping @${username}’s TikTok`}</p>
        </div>
        <div className="pl-8 pt-2">
          <p className="font-bold">
            {thought === THOUGHT_OF_ANALYSIS.PROFILE &&
              `I'm looking at the TikTok artist profile...`}
            {thought === THOUGHT_OF_ANALYSIS.POSTURLS &&
              `I'm looking at the TikTok videos...`}
            {thought === THOUGHT_OF_ANALYSIS.VIDEO_COMMENTS &&
              `I'm looking at the TikTok video comments... ${Number(progress).toFixed(0)}%`}
          </p>
        </div>
      </div>
    </main>
  );
};

export default ChainOfThought;
