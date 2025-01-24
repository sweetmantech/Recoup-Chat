import { FUNNEL_ANALYSIS } from "@/types/Agent";

const getAnalysisComments = (funnel_analyses: Array<FUNNEL_ANALYSIS>) => {
  return funnel_analyses
    .map((analysis: FUNNEL_ANALYSIS) => analysis.funnel_analytics_comments)
    .flat();
};

export default getAnalysisComments;
