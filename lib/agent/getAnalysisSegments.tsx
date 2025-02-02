import { FUNNEL_ANALYSIS } from "@/types/Agent";
import { STEP_OF_AGENT } from "@/types/Funnel";
import getWrappedAnalysis from "./getWrappedAnalysis";

const getAnalysisSegments = (funnel_analyses: Array<FUNNEL_ANALYSIS>) => {
  const wrappedAnalysis = getWrappedAnalysis(funnel_analyses);
  if (wrappedAnalysis) return wrappedAnalysis.funnel_analytics_segments;

  return funnel_analyses
    .filter(
      (analysis: FUNNEL_ANALYSIS) => analysis.status === STEP_OF_AGENT.FINISHED,
    )
    .map((analysis: FUNNEL_ANALYSIS) => analysis.funnel_analytics_segments)
    .flat();
};

export default getAnalysisSegments;
