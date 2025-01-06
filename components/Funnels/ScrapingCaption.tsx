import Completion from "./Completion";
import Loading from "@/components/Loading";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const ScrapingCaption = () => {
  const { artistHandle, funnelName, isFinished, scrapping } =
    useFunnelAnalysisProvider();

  return (
    <p className="text-sm">
      {isFinished && <Completion />}
      {scrapping && (
        <div className="flex gap-2 items-center">
          Scraping @{artistHandle}’s {funnelName}...
          <Loading />
        </div>
      )}
    </p>
  );
};

export default ScrapingCaption;
