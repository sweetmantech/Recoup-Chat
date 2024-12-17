import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import ThoughtSteps from "./ThoughtSteps";
import AnalysisPlan from "./AnalysisPlan";
import Icon from "@/components/Icon";
import ScrapingCaption from "./ScrapingCaption";

const FanSegmentResult = () => {
  const { thought } = useTikTokAnalysisProvider();

  return (
    <>
      <div
        className={`flex gap-3 ${thought < STEP_OF_ANALYSIS.UNKNOWN_PROFILE ? "items-start" : "items-center"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="border border-gray rounded-full p-2">
          <Icon name="logo-xs" />
        </div>
        <ScrapingCaption />
      </div>
      <div className="pl-11 pt-2">
        <ThoughtSteps />
        {thought === STEP_OF_ANALYSIS.INITITAL && <AnalysisPlan />}
      </div>
    </>
  );
};

export default FanSegmentResult;
