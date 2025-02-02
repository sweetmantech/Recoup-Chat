import ThoughtSteps from "./ThoughtSteps";
import AnalysisPlan from "./AnalysisPlan";
import Icon from "@/components/Icon";
import ScrapingCaption from "./ScrapingCaption";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import isScraping from "@/lib/agent/isScraping";
import InputHandles from "./InputHandle";
import isFinishedScraping from "@/lib/agent/isFinishedScraping";

const FanSegmentResult = () => {
  const { isCheckingHandles, handles, agentsStatus, isInitializing } =
    useFunnelAnalysisProvider();

  return (
    <>
      <div
        className={`flex gap-3 ${isScraping(agentsStatus) || isCheckingHandles ? "items-center" : "items-start"}`}
      >
        <div className="border border-gray rounded-full p-2">
          <Icon name="logo-xs" />
        </div>
        <ScrapingCaption />
      </div>
      <div className="pl-11 pt-2">
        {isCheckingHandles ? (
          <>{Object.keys(handles).length > 0 && <InputHandles />}</>
        ) : (
          <>
            {isInitializing ? (
              <AnalysisPlan />
            ) : (
              !isFinishedScraping(agentsStatus) && <ThoughtSteps />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FanSegmentResult;
