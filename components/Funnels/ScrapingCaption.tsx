import Completion from "./Completion";
import Loading from "@/components/Loading";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const ScrapingCaption = () => {
  const { artistHandle, funnelName, isFinished, scraping, funnelType } =
    useFunnelAnalysisProvider();
  const { selectedArtist } = useArtistProvider();

  return (
    <div className="text-sm !w-[calc(100vw-95px)] md:w-full">
      {isFinished && <Completion />}
      {scraping && (
        <div className="flex gap-2 items-center">
          Scraping @
          {funnelType === "wrapped"
            ? selectedArtist?.name || artistHandle
            : artistHandle}
          ’s {funnelName}...
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ScrapingCaption;
