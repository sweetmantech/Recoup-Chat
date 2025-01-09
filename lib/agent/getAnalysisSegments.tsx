import { FUNNEL_ANALYSIS } from "@/types/Agent";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";

const getAnalysisSegments = (funnel_analyses: Array<FUNNEL_ANALYSIS>) => {
  return funnel_analyses
    .filter(
      (analysis: FUNNEL_ANALYSIS) =>
        analysis.status === STEP_OF_ANALYSIS.FINISHED,
    )
    .map((analysis: FUNNEL_ANALYSIS) => analysis.funnel_analytics_segments)
    .flat();
};

export default getAnalysisSegments;
