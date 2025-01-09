import Completion from "./Completion";
import Loading from "@/components/Loading";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";

const ScrapingCaption = () => {
  const {
    artistHandle,
    funnelName,
    isFinished,
    scraping,
    funnelType,
    isInitial,
  } = useFunnelAnalysisProvider();
  const { selectedArtist } = useArtistProvider();

  return (
    <p className="text-sm">
      {isFinished && !isInitial && <Completion />}
      {scraping && (
        <div className="flex gap-2 items-center">
          Scraping @
          {funnelType === "wrapped" ? selectedArtist?.name : artistHandle}’s{" "}
          {funnelName}...
          <Loading />
        </div>
      )}
    </p>
  );
};

export default ScrapingCaption;
