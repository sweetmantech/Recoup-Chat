import isFinishedScraping from "@/lib/agent/isFinishedScraping";
import Completion from "./Completion";
import Loading from "@/components/Loading";
import isScraping from "@/lib/agent/isScraping";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const ScrapingCaption = () => {
  const { funnelName, agentsStatus, isCheckingHandles, isInitializing } =
    useFunnelAnalysisProvider();
  const { selectedArtist } = useArtistProvider();

  return (
    <div className="text-sm !w-[calc(100vw-95px)] md:w-full">
      {isCheckingHandles ? (
        <div className="flex gap-2 items-center">
          Verifying @{selectedArtist?.name}
          ’s Social Handles...
          <Loading />
        </div>
      ) : (
        <>
          {!isInitializing && (
            <>
              {isScraping(agentsStatus) && (
                <div className="flex gap-2 items-center">
                  Scraping @{selectedArtist?.name}
                  ’s {funnelName}...
                  <Loading />
                </div>
              )}
              {isFinishedScraping(agentsStatus) && <Completion />}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ScrapingCaption;
