import { STEP_OF_ANALYSIS } from "@/types/Thought";
import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import ThoughtSteps from "./ThoughtSteps";
import AnalysisPlan from "./AnalysisPlan";
import Completion from "./Completion";
import Icon from "@/components/Icon";

const FanSegmentResult = () => {
  const { thought, username } = useTikTokAnalysisProvider();
  const artistHandle = username.replaceAll("@", "");

  return (
    <>
      <div
        className={`flex gap-3 ${thought === STEP_OF_ANALYSIS.FINISHED || thought === STEP_OF_ANALYSIS.INITITAL ? "items-start" : "items-center"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="border border-gray rounded-full p-2">
          <Icon name="logo-xs" />
        </div>
        <p className="text-sm">
          {thought === STEP_OF_ANALYSIS.FINISHED ? (
            <Completion />
          ) : thought === STEP_OF_ANALYSIS.INITITAL ? (
            `I’m diving into @${artistHandle}’s account to uncover insights about their content, audience, and fan engagement.`
          ) : (
            `Scraping @${artistHandle}’s TikTok`
          )}
        </p>
      </div>
      <div className="pl-11 pt-2">
        <ThoughtSteps />
        {thought === STEP_OF_ANALYSIS.INITITAL && <AnalysisPlan />}
      </div>
    </>
  );
};

export default FanSegmentResult;
