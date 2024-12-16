import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import { STEP_OF_ANALYSIS } from "@/types/Twitter";
import Completion from "./Completion";
import Loading from "@/components/Loading";

const ScrapingCaption = () => {
  const { thought, username, initialize } = useTikTokAnalysisProvider();
  const artistHandle = username.replaceAll("@", "");

  return (
    <p className="text-sm">
      {thought === STEP_OF_ANALYSIS.FINISHED && <Completion />}
      {thought === STEP_OF_ANALYSIS.INITITAL &&
        `I’m diving into @${artistHandle}’s account to uncover insights about their content, audience, and fan engagement.`}
      {thought === STEP_OF_ANALYSIS.UNKNOWN_PROFILE && (
        <p>
          TikTok handle invalid.{" "}
          <a
            className="underline text-purple-dark cursor-pointer"
            onClick={initialize}
          >
            Try again
          </a>
        </p>
      )}
      {thought === STEP_OF_ANALYSIS.ERROR && (
        <>
          {`There's too many musicians creating TikTok reports right now.`}
          During peak hours, we are limit TikTok Report generation to paid
          users. Please reach out to{" "}
          <a
            href="mailto:sidney@recoupable.com"
            className="underline text-purple-dark"
          >
            sidney@recoupable.com
          </a>{" "}
          to upgrade your account or{" "}
          <a
            className="underline text-purple-dark cursor-pointer"
            onClick={initialize}
          >
            try again
          </a>{" "}
          later.
        </>
      )}
      {thought > STEP_OF_ANALYSIS.UNKNOWN_PROFILE && (
        <div className="flex gap-2 items-center">
          Scraping @{artistHandle}’s TikTok...
          <Loading />
        </div>
      )}
    </p>
  );
};

export default ScrapingCaption;
