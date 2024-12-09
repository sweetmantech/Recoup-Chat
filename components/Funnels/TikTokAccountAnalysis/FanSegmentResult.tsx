import { STEP_OF_ANALYSIS } from "@/types/Thought";
import { useTikTokAnalysisProvider } from "@/providers/TIkTokAnalysisProvider";
import ThoughtSteps from "./ThoughtSteps";
import AnalysisPlan from "./AnalysisPlan";
import Completion from "./Completion";
import Icon from "@/components/Icon";
import { useRouter } from "next/navigation";

const FanSegmentResult = () => {
  const { thought, username, setIsLoading } = useTikTokAnalysisProvider();
  const artistHandle = username.replaceAll("@", "");
  const { push } = useRouter();

  return (
    <>
      <div
        className={`flex gap-3 ${thought <= STEP_OF_ANALYSIS.FINISHED ? "items-start" : "items-center"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="border border-gray rounded-full p-2">
          <Icon name="logo-xs" />
        </div>
        <p className="text-sm">
          {thought === STEP_OF_ANALYSIS.FINISHED && <Completion />}
          {thought === STEP_OF_ANALYSIS.INITITAL &&
            `I’m diving into @${artistHandle}’s account to uncover insights about their content, audience, and fan engagement.`}
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
                onClick={() => {
                  setIsLoading(false);
                  push("/funnels/tiktok-account-analysis/");
                }}
              >
                try again
              </a>{" "}
              later.
            </>
          )}
          {thought > STEP_OF_ANALYSIS.FINISHED &&
            `Scraping @${artistHandle}’s TikTok...`}
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
