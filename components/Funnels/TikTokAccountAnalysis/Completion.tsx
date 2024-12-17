import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import Segments from "./Segments";

const Completion = () => {
  const { username, result, segments, handleRetry } =
    useTikTokAnalysisProvider();
  const artistHandle = username.replaceAll("@", "");

  return (
    <div>
      {result?.videos?.length ? (
        <>
          <p className="text-xl font-bold pb-4">TikTok Analysis complete✅</p>
          {`${result?.nickname} has ${result?.fans} followers. \nPlease select a fan segmentation below to generate a report for brand partnership deals.`}
          <p className="text-xl font-bold py-4"> Fan Segments</p>
          {`We categorized ${result?.name}'s fans into ${Object.keys(segments).length} different segments - click any to explore. The agent is running in the background and will notify you of new insights!`}
          {segments?.length > 0 && <Segments />}
        </>
      ) : (
        <>
          {`The account @${artistHandle || result?.name} does not have any engagement. Please try again with a TikTok handle with at least one comment on its videos. `}
          <span onClick={handleRetry} className="underline cursor-pointer">
            Click here to retry.
          </span>
        </>
      )}
    </div>
  );
};

export default Completion;
