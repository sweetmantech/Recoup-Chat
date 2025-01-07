import ThoughtSteps from "./ThoughtSteps";
import AnalysisPlan from "./AnalysisPlan";
import Icon from "@/components/Icon";
import ScrapingCaption from "./ScrapingCaption";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const FanSegmentResult = () => {
  const { scrapping, isInitial } = useFunnelAnalysisProvider();

  return (
    <>
      <div
        className={`flex gap-3 ${!scrapping ? "items-start" : "items-center"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="border border-gray rounded-full p-2">
          <Icon name="logo-xs" />
        </div>
        <ScrapingCaption />
      </div>
      <div className="pl-11 pt-2">
        {isInitial ? <AnalysisPlan /> : <ThoughtSteps />}
      </div>
    </>
  );
};

export default FanSegmentResult;
