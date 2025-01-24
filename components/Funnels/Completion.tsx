import { useEffect } from "react";
import { usePromptsProvider } from "@/providers/PromptsProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import CompletedAnalysis from "./CompletedAnalysis";
import isFinishedScraping from "@/lib/agent/isFinishedScraping";

const Completion = () => {
  const { result, handleRetry, artistHandle, thoughts, funnelType } =
    useFunnelAnalysisProvider();
  const { getPrompts } = usePromptsProvider();

  useEffect(() => {
    if (result) getPrompts(JSON.stringify(result), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const isCompletedAnalysis = result?.segments?.length > 0;

  return (
    <div>
      {isCompletedAnalysis && <CompletedAnalysis />}
      {isFinishedScraping(thoughts, result) &&
        !isCompletedAnalysis &&
        thoughts[`${funnelType}`] && (
          <>
            {`The account @${artistHandle || result?.name} does not have any engagement. Please try again with a handle with at least one comment on its videos. `}
            <span onClick={handleRetry} className="underline cursor-pointer">
              Click here to retry.
            </span>
          </>
        )}
    </div>
  );
};

export default Completion;
